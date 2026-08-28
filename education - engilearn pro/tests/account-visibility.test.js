const assert = require("assert");
const fs = require("fs");
const os = require("os");
const path = require("path");
const vm = require("vm");
const jwt = require("jsonwebtoken");
const { spawn } = require("child_process");

const projectRoot = path.join(__dirname, "..");
const serverPath = path.join(projectRoot, "backend", "backend", "server.js");
const tempDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "engilearn-accounts-"));
const testSecret = "engilearn-account-visibility-test-secret";
let server = null;

function startServer(port) {
    const output = [];
    server = spawn(process.execPath, [serverPath], {
        cwd: projectRoot,
        env: {
            ...process.env,
            PORT: String(port),
            NODE_ENV: "test",
            VERCEL: "",
            REQUIRE_MONGO: "false",
            MONGO_URI: "",
            SUPABASE_URL: "",
            SUPABASE_SECRET_KEY: "",
            UPSTASH_REDIS_REST_URL: "",
            UPSTASH_REDIS_REST_TOKEN: "",
            JWT_SECRET: testSecret,
            REFRESH_TOKEN_SECRET: `${testSecret}-refresh`,
            ENGILEARN_DATA_DIR: tempDataDir,
            EMAIL_PROVIDER: "mock",
            SMS_PROVIDER: "mock"
        },
        stdio: ["ignore", "pipe", "pipe"]
    });
    server.stdout.on("data", (chunk) => output.push(String(chunk)));
    server.stderr.on("data", (chunk) => output.push(String(chunk)));
    server.testOutput = output;
    return server;
}

async function waitForHealth(baseUrl) {
    for (let attempt = 0; attempt < 80; attempt += 1) {
        if (server?.exitCode !== null) {
            throw new Error(`Test server exited early. ${server.testOutput.join("").slice(-2000)}`);
        }
        try {
            const response = await fetch(`${baseUrl}/api/health`);
            if (response.ok) return;
        } catch (error) {
            // The server may still be binding its port.
        }
        await new Promise((resolve) => setTimeout(resolve, 100));
    }
    throw new Error(`Test server did not become healthy. ${server.testOutput.join("").slice(-2000)}`);
}

async function stopServer() {
    if (!server || server.exitCode !== null) return;
    const exited = new Promise((resolve) => server.once("exit", resolve));
    server.kill("SIGTERM");
    await Promise.race([exited, new Promise((resolve) => setTimeout(resolve, 3000))]);
    if (server.exitCode === null) server.kill("SIGKILL");
}

async function api(baseUrl, route, token, options = {}) {
    const response = await fetch(`${baseUrl}${route}`, {
        ...options,
        headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            "Content-Type": "application/json",
            ...(options.headers || {})
        },
        body: options.body && typeof options.body !== "string" ? JSON.stringify(options.body) : options.body
    });
    const body = await response.json().catch(() => ({}));
    assert.ok(response.ok, `${route} failed (${response.status}): ${body.message || "unknown error"}`);
    return body;
}

function verifyAccountsRender(users) {
    const elements = {
        studentSearch: { value: "" },
        studentRows: { innerHTML: "" }
    };
    const context = {
        console,
        localStorage: { getItem() { return null; }, setItem() {}, removeItem() {} },
        window: { addEventListener() {} },
        document: {
            addEventListener() {},
            getElementById(id) { return elements[id] || { value: "", innerHTML: "" }; }
        },
        confirm() { return false; },
        EngiLearnAPI: {}
    };
    vm.createContext(context);
    vm.runInContext(fs.readFileSync(path.join(projectRoot, "frontend", "assets", "js", "lms-admin.js"), "utf8"), context);
    context.__users = users;
    vm.runInContext("adminLms.data = { users: __users, admins: [], watchHistory: [], bookmarks: [], submissions: [], attendance: [], marks: [] }; adminLms.isMainAdmin = () => true;", context);

    vm.runInContext("adminLms.accountRoleFilter = 'Student'; adminLms.renderStudents();", context);
    assert.match(elements.studentRows.innerHTML, /Visibility Student/);
    assert.doesNotMatch(elements.studentRows.innerHTML, /Visibility Teacher/);

    vm.runInContext("adminLms.accountRoleFilter = 'Teacher'; adminLms.renderStudents();", context);
    assert.match(elements.studentRows.innerHTML, /Visibility Teacher/);
    assert.doesNotMatch(elements.studentRows.innerHTML, /Visibility Student/);
}

(async () => {
    try {
        const firstPort = 5137;
        const firstBaseUrl = `http://127.0.0.1:${firstPort}`;
        startServer(firstPort);
        await waitForHealth(firstBaseUrl);

        const dbPath = path.join(tempDataDir, "db.json");
        const initialDb = JSON.parse(fs.readFileSync(dbPath, "utf8"));
        const mainAdmin = initialDb.users.find((user) => String(user.adminId).toUpperCase() === "ADMIN001");
        assert.ok(mainAdmin, "Main admin fixture was not created");
        const token = jwt.sign({ id: mainAdmin.id, email: mainAdmin.email, role: "Admin" }, testSecret, { expiresIn: "5m" });

        await api(firstBaseUrl, "/api/admin/users", token, {
            method: "POST",
            body: { name: "Visibility Student", email: "visibility.student@example.invalid", role: "student", branch: "CSE", semester: "3" }
        });
        await api(firstBaseUrl, "/api/admin/users", token, {
            method: "POST",
            body: { name: "Visibility Teacher", email: "visibility.teacher@example.invalid", role: "TEACHER", branch: "CSE" }
        });

        await stopServer();

        const secondPort = 5138;
        const secondBaseUrl = `http://127.0.0.1:${secondPort}`;
        startServer(secondPort);
        await waitForHealth(secondBaseUrl);
        const result = await api(secondBaseUrl, "/api/admin/users", token);
        const student = result.users.find((user) => user.email === "visibility.student@example.invalid");
        const teacher = result.users.find((user) => user.email === "visibility.teacher@example.invalid");

        assert.equal(student?.role, "Student");
        assert.equal(teacher?.role, "Teacher");
        assert.equal("passwordHash" in student, false);
        assert.equal("passwordHash" in teacher, false);
        verifyAccountsRender(result.users);

        console.log("Account visibility regression passed: Student and Teacher accounts survive restart, remain distinct, and render in Accounts.");
    } finally {
        await stopServer();
        fs.rmSync(tempDataDir, { recursive: true, force: true });
    }
})().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
