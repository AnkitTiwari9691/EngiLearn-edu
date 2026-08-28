const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: path.join(__dirname, "..", "backend", ".env") });

const baseUrl = process.env.ENGILEARN_AUDIT_URL || "http://localhost:5021";
const serverSource = fs.readFileSync(path.join(__dirname, "..", "backend", "backend", "server.js"), "utf8");
const routePattern = /app\.(get|post|put|patch|delete)\(\s*["']([^"']+)/g;
const routes = [...serverSource.matchAll(routePattern)].map((match) => {
    const lineEnd = serverSource.indexOf("\n", match.index);
    const declaration = serverSource.slice(match.index, lineEnd === -1 ? undefined : lineEnd);
    return {
        method: match[1].toUpperCase(),
        path: match[2],
        protected: declaration.includes("requireAuth")
    };
});

function materializeRoute(route, studentId) {
    return route
        .replace(/:userId\b/g, String(studentId || 1))
        .replace(/:branch\b/g, "cse")
        .replace(/:semester\b/g, "3")
        .replace(/:type\b/g, "content")
        .replace(/:id\b/g, "1")
        .replace(/:key\b/g, "missing-audit-key")
        .replace(/:[A-Za-z][A-Za-z0-9_]*/g, "1");
}

async function request(route, { token = "", method = "GET", body } = {}) {
    const headers = {};
    if (token) headers.authorization = `Bearer ${token}`;
    if (body !== undefined) headers["content-type"] = "application/json";
    const startedAt = Date.now();
    try {
        const response = await fetch(`${baseUrl}${route}`, {
            method,
            headers,
            body: body === undefined ? undefined : JSON.stringify(body)
        });
        await response.arrayBuffer();
        return { status: response.status, ms: Date.now() - startedAt };
    } catch (error) {
        return { status: 0, ms: Date.now() - startedAt, error: error.message };
    }
}

async function loginAdmin() {
    if (process.env.ENGILEARN_AUDIT_ADMIN_TOKEN) {
        return process.env.ENGILEARN_AUDIT_ADMIN_TOKEN;
    }

    if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(baseUrl)) {
        const localDbPath = path.join(__dirname, "..", "backend", "backend", "data", "db.json");
        if (fs.existsSync(localDbPath)) {
            const localDb = JSON.parse(fs.readFileSync(localDbPath, "utf8"));
            const mainAdmin = (localDb.users || []).find((user) => (
                String(user.adminId || "").toUpperCase() === "ADMIN001"
                || String(user.adminType || "").toLowerCase() === "main"
            ));
            if (mainAdmin?.id && String(mainAdmin.role || "").toLowerCase() === "admin") {
                const token = jwt.sign(
                    { id: mainAdmin.id, email: mainAdmin.email, role: mainAdmin.role },
                    process.env.JWT_SECRET || "engilearn-development-secret",
                    { expiresIn: "15m" }
                );
                const verifyResponse = await fetch(`${baseUrl}/api/auth/verify`, {
                    headers: { authorization: `Bearer ${token}` }
                });
                if (verifyResponse.ok) return token;
            }
        }
    }

    const response = await fetch(`${baseUrl}/api/auth/login`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
            identifier: process.env.ADMIN001_EMAIL || "admin001",
            password: process.env.ADMIN001_PASSWORD || "Ankit@123",
            role: "Admin"
        })
    });
    const data = await response.json();
    if (!response.ok || !(data.accessToken || data.token)) {
        throw new Error(`Admin login failed (${response.status}): ${data.message || "unknown error"}`);
    }
    return data.accessToken || data.token;
}

async function main() {
    const report = {
        baseUrl,
        generatedAt: new Date().toISOString(),
        registeredRoutes: routes.length,
        routeMethods: {},
        checks: [],
        getRoutes: [],
        protectedMutations: [],
        failures: []
    };
    routes.forEach((route) => {
        report.routeMethods[route.method] = (report.routeMethods[route.method] || 0) + 1;
    });

    const adminToken = await loginAdmin();
    const usersResponse = await fetch(`${baseUrl}/api/admin/users`, {
        headers: { authorization: `Bearer ${adminToken}` }
    });
    const usersData = await usersResponse.json();
    const users = Array.isArray(usersData) ? usersData : usersData.users || [];
    const student = users.find((user) => String(user.role || "").toLowerCase() === "student");
    if (!student) throw new Error("No student account is available for role-boundary verification");
    const studentToken = jwt.sign(
        { id: student.id, email: student.email, role: student.role },
        process.env.JWT_SECRET || "engilearn-development-secret",
        { expiresIn: "15m" }
    );
    const auditTeacherEmail = "codex-predeploy-teacher@example.invalid";
    const staleAuditTeacher = users.find((user) => String(user.email || "").toLowerCase() === auditTeacherEmail);
    if (staleAuditTeacher) {
        await request(`/api/admin/users/${staleAuditTeacher.id}`, { method: "DELETE", token: adminToken });
    }
    const createTeacherResponse = await fetch(`${baseUrl}/api/admin/users`, {
        method: "POST",
        headers: { "content-type": "application/json", authorization: `Bearer ${adminToken}` },
        body: JSON.stringify({
            name: "Codex Predeploy Teacher",
            email: auditTeacherEmail,
            role: "Teacher",
            teacherId: "AUDIT-TEACHER",
            branch: "Computer Science & Engineering",
            semester: "3",
            course: "B.Tech"
        })
    });
    const createTeacherData = await createTeacherResponse.json();
    if (!createTeacherResponse.ok || !createTeacherData.user?.id) {
        throw new Error(`Temporary teacher creation failed (${createTeacherResponse.status}): ${createTeacherData.message || "unknown error"}`);
    }
    const auditTeacher = createTeacherData.user;
    const teacherToken = jwt.sign(
        { id: auditTeacher.id, email: auditTeacher.email, role: auditTeacher.role },
        process.env.JWT_SECRET || "engilearn-development-secret",
        { expiresIn: "15m" }
    );

    const focusedChecks = [
        ["health", "/api/health", {}, 200],
        ["public-settings", "/api/public/settings", {}, 200],
        ["admin-users-protected", "/api/admin/users", {}, 401],
        ["student-blocked-from-admin", "/api/admin/users", { token: studentToken }, 403],
        ["student-token-valid", "/api/auth/verify", { token: studentToken }, 200],
        ["teacher-token-valid", "/api/auth/verify", { token: teacherToken }, 200],
        ["teacher-dashboard", "/api/teacher/dashboard", { token: teacherToken }, 200],
        ["unknown-account-rejected", "/api/auth/login", { method: "POST", body: { identifier: "missing-audit-account@example.invalid", password: "Invalid@123", role: "Student" } }, 401],
        ["all-branches-payment-rejected", "/api/toolhub/checkout/order", { method: "POST", token: studentToken, body: { product: "repeatedQuestions", branch: "all", semester: "3" } }, 400],
        ["all-semesters-payment-rejected", "/api/toolhub/checkout/order", { method: "POST", token: studentToken, body: { product: "repeatedQuestions", branch: "cse", semester: "all" } }, 400]
    ];
    for (const [name, route, options, expected] of focusedChecks) {
        const result = await request(route, options);
        const check = { name, route, expected, ...result, passed: result.status === expected };
        report.checks.push(check);
        if (!check.passed) report.failures.push(check);
    }

    const uniqueGetRoutes = [...new Set(routes.filter((route) => route.method === "GET").map((route) => route.path))];
    for (const routeTemplate of uniqueGetRoutes) {
        const route = materializeRoute(routeTemplate, student.id);
        let result = await request(route, { token: adminToken });
        let identity = "admin";
        if ([401, 403].includes(result.status)) {
            const studentResult = await request(route, { token: studentToken });
            if (![401, 403].includes(studentResult.status)) {
                result = studentResult;
                identity = "student";
            } else {
                const teacherResult = await request(route, { token: teacherToken });
                if (![401, 403].includes(teacherResult.status)) {
                    result = teacherResult;
                    identity = "teacher";
                }
            }
        }
        const passed = result.status > 0 && result.status < 500;
        const check = { template: routeTemplate, route, identity, ...result, passed };
        report.getRoutes.push(check);
        if (!passed) report.failures.push(check);
    }

    // Exercise every protected write route without credentials. Authentication must
    // stop the request before validation, file upload, payment, or data mutation.
    const protectedMutations = routes.filter((route) => route.method !== "GET" && route.protected);
    for (const routeDefinition of protectedMutations) {
        const route = materializeRoute(routeDefinition.path, student.id);
        const result = await request(route, { method: routeDefinition.method, body: {} });
        const passed = result.status === 401;
        const check = { template: routeDefinition.path, route, method: routeDefinition.method, expected: 401, ...result, passed };
        report.protectedMutations.push(check);
        if (!passed) report.failures.push(check);
    }

    const settingsResponse = await fetch(`${baseUrl}/api/public/settings`);
    const settingsData = await settingsResponse.json();
    report.repeatedQuestions = settingsData.settings?.repeatedQuestions || null;
    if (report.repeatedQuestions?.accessMode !== "paid" || report.repeatedQuestions?.visible !== true) {
        report.failures.push({ name: "repeated-question-production-setting", expected: { visible: true, accessMode: "paid" }, actual: report.repeatedQuestions });
    }
    const cleanupResult = await request(`/api/admin/users/${auditTeacher.id}`, { method: "DELETE", token: adminToken });
    report.checks.push({
        name: "temporary-teacher-cleanup",
        route: `/api/admin/users/${auditTeacher.id}`,
        expected: 200,
        ...cleanupResult,
        passed: cleanupResult.status === 200
    });
    if (cleanupResult.status !== 200) report.failures.push(report.checks[report.checks.length - 1]);
    report.summary = {
        focusedChecks: report.checks.length,
        focusedPassed: report.checks.filter((check) => check.passed).length,
        getRoutesChecked: report.getRoutes.length,
        getRoutesPassed: report.getRoutes.filter((check) => check.passed).length,
        protectedMutationsChecked: report.protectedMutations.length,
        protectedMutationsPassed: report.protectedMutations.filter((check) => check.passed).length,
        failures: report.failures.length
    };
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
    if (report.failures.length) process.exitCode = 1;
}

main().catch((error) => {
    process.stderr.write(`${error.stack || error.message}\n`);
    process.exit(1);
});
