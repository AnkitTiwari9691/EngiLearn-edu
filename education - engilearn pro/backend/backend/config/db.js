const mongoose = require("mongoose");

let mongoReady = false;
const globalMongoCache = global.__engilearnMongoCache || { conn: null, promise: null, indexesReady: false, indexesPromise: null };
global.__engilearnMongoCache = globalMongoCache;
const MONGO_CONNECT_TIMEOUT_MS = Number(process.env.MONGO_CONNECT_TIMEOUT_MS || (process.env.VERCEL === "1" ? 5000 : 10000));
const MONGO_MAX_RETRIES = Number(process.env.MONGO_MAX_RETRIES || (process.env.VERCEL === "1" ? 1 : 5));
const MONGO_RETRY_DELAY_MS = Number(process.env.MONGO_RETRY_DELAY_MS || (process.env.VERCEL === "1" ? 500 : 3000));
const REQUIRE_MONGO = String(process.env.REQUIRE_MONGO || "").toLowerCase() === "true"
    || process.env.VERCEL === "1"
    || process.env.NODE_ENV === "production";
const ATLAS_PROJECT_NAME = process.env.ATLAS_PROJECT_NAME || "engilearn";
const ATLAS_PROJECT_ID = process.env.ATLAS_PROJECT_ID || "69fb0e9198b0925d2c9130b8";
const ATLAS_REQUIRED_IP = process.env.ATLAS_REQUIRED_IP || "152.59.49.218/32";

function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function ensureMongoIndexes() {
    const db = mongoose.connection.db;
    if (!db) return;

    const mirroredCollections = [
        "users",
        "students",
        "teachers",
        "admins",
        "content",
        "syllabus",
        "notes",
        "subjects",
        "lectures",
        "assignments",
        "submissions",
        "live_classes",
        "watch_history",
        "bookmarks",
        "attendance",
        "marks",
        "sessions",
        "token_blacklist",
        "signup_requests",
        "password_reset_requests",
        "admin_logs",
        "courses",
        "exams",
        "payments",
        "notifications",
        "ai_tools",
        "contacts",
        "visits"
    ];

    await Promise.allSettled([
        ...mirroredCollections.map((name) => db.collection(name).createIndex(
            { appId: 1 },
            {
                unique: true,
                partialFilterExpression: { appId: { $exists: true } },
                name: "unique_app_id"
            }
        )),
        db.collection("users").createIndex({ email: 1 }, { sparse: true }),
        db.collection("users").createIndex({ mobile: 1 }, { sparse: true }),
        db.collection("users").createIndex({ role: 1 }),
        db.collection("users").createIndex({ status: 1 }),
        db.collection("users").createIndex({ isVerified: 1 }),
        db.collection("students").createIndex({ email: 1 }, { sparse: true }),
        db.collection("students").createIndex({ mobile: 1 }, { sparse: true }),
        db.collection("students").createIndex({ status: 1 }),
        db.collection("teachers").createIndex({ email: 1 }, { sparse: true }),
        db.collection("teachers").createIndex({ mobile: 1 }, { sparse: true }),
        db.collection("teachers").createIndex({ status: 1 }),
        db.collection("admins").createIndex({ email: 1 }, { sparse: true }),
        db.collection("admins").createIndex({ adminId: 1 }, { sparse: true }),
        db.collection("signup_requests").createIndex({ email: 1 }, { sparse: true }),
        db.collection("signup_requests").createIndex({ mobile: 1 }, { sparse: true }),
        db.collection("lectures").createIndex({ subject: 1, branch: 1, semester: 1 }),
        db.collection("content").createIndex({ type: 1, branch: 1, semester: 1 }),
        db.collection("content").createIndex({ branch: 1, semester: 1, subjectCode: 1, year: -1 }),
        db.collection("content").createIndex({ type: 1, isActive: 1, createdAt: -1 }),
        db.collection("payments").createIndex({ userId: 1, createdAt: -1 }),
        db.collection("payments").createIndex({ providerOrderId: 1 }, { sparse: true }),
        db.collection("payments").createIndex({ status: 1, createdAt: -1 }),
        db.collection("contacts").createIndex({ status: 1, createdAt: -1 }),
        db.collection("visits").createIndex({ createdAt: -1 }),
        db.collection("visits").createIndex({ visitorId: 1, createdAt: -1 }),
        db.collection("visits").createIndex({ sessionId: 1, createdAt: -1 }),
        db.collection("visits").createIndex({ page: 1, createdAt: -1 }),
        db.collection("admin_logs").createIndex({ createdAt: -1 }),
        db.collection("admin_logs").createIndex({ adminEmail: 1, createdAt: -1 }),
        db.collection("submissions").createIndex({ studentId: 1, createdAt: -1 }),
        db.collection("notifications").createIndex({ targetUserId: 1, createdAt: -1 }),
        db.collection("watch_history").createIndex({ userId: 1, updatedAt: -1 }),
        db.collection("bookmarks").createIndex({ userId: 1, createdAt: -1 }),
        db.collection("password_reset_requests").createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 })
    ]);
}

function maskedMongoUri(uri) {
    return String(uri).replace(/:\/\/([^:]+):([^@]+)@/, "://$1:****@");
}

function printAuthHelp() {
    console.error("");
    console.error("MongoDB Atlas authentication failed. Fix these settings in Atlas:");
    console.error(`1. Project: ${ATLAS_PROJECT_NAME}`);
    console.error(`2. Project ID: ${ATLAS_PROJECT_ID}`);
    console.error("3. Security > Database Access > Add New Database User");
    console.error("4. Create/reset the exact username and password from backend/.env");
    console.error("5. Give role: Atlas admin or readWriteAnyDatabase");
    console.error(`6. Security > Network Access must include: ${ATLAS_REQUIRED_IP}`);
    console.error("7. Wait about 30 seconds after saving, then restart backend");
    console.error("");
}

async function connectDB() {
    const uri = process.env.MONGO_URI;

    if (!uri) {
        mongoReady = false;
        globalMongoCache.conn = null;
        globalMongoCache.promise = null;
        console.log(REQUIRE_MONGO
            ? "MongoDB required but MONGO_URI is not set."
            : "MongoDB disabled: MONGO_URI is not set. Using local JSON fallback.");
        return false;
    }

    if (mongoose.connection.readyState === 1 && globalMongoCache.conn) {
        mongoReady = true;
        return true;
    }

    if (globalMongoCache.promise) {
        try {
            await globalMongoCache.promise;
            globalMongoCache.conn = mongoose.connection;
            mongoReady = mongoose.connection.readyState === 1;
            if (mongoReady && !globalMongoCache.indexesReady) {
                globalMongoCache.indexesPromise = globalMongoCache.indexesPromise || ensureMongoIndexes();
                await globalMongoCache.indexesPromise;
                globalMongoCache.indexesReady = true;
            }
            return mongoReady;
        } catch (error) {
            globalMongoCache.promise = null;
            globalMongoCache.conn = null;
            globalMongoCache.indexesPromise = null;
            globalMongoCache.indexesReady = false;
            mongoReady = false;
        }
    }

    console.log("MongoDB URI configured. Connecting...");

    for (let attempt = 1; attempt <= MONGO_MAX_RETRIES; attempt += 1) {
        try {
            console.log(`MongoDB connecting (${attempt}/${MONGO_MAX_RETRIES})...`);
            const connectionAttempt = mongoose.connect(uri, {
                connectTimeoutMS: MONGO_CONNECT_TIMEOUT_MS,
                serverSelectionTimeoutMS: MONGO_CONNECT_TIMEOUT_MS,
                maxPoolSize: Number(process.env.MONGO_MAX_POOL_SIZE || (process.env.VERCEL === "1" ? 10 : 100)),
                minPoolSize: Number(process.env.MONGO_MIN_POOL_SIZE || (process.env.VERCEL === "1" ? 0 : 5)),
                maxIdleTimeMS: Number(process.env.MONGO_MAX_IDLE_TIME_MS || 60000),
                retryWrites: true,
                bufferCommands: false
            });
            globalMongoCache.promise = Promise.race([
                connectionAttempt,
                new Promise((_, reject) => {
                    setTimeout(() => reject(new Error("MongoDB connection timed out")), MONGO_CONNECT_TIMEOUT_MS);
                })
            ]);
            connectionAttempt.catch(() => {});

            await globalMongoCache.promise;

            mongoReady = true;
            globalMongoCache.conn = mongoose.connection;
            globalMongoCache.indexesPromise = globalMongoCache.indexesPromise || ensureMongoIndexes();
            await globalMongoCache.indexesPromise;
            globalMongoCache.indexesReady = true;
            console.log(`MongoDB connected: ${mongoose.connection.host}/${mongoose.connection.name}`);
            return true;
        } catch (error) {
            mongoReady = false;
            globalMongoCache.promise = null;
            globalMongoCache.conn = null;
            globalMongoCache.indexesPromise = null;
            globalMongoCache.indexesReady = false;
            console.error(`MongoDB connection failed (${attempt}/${MONGO_MAX_RETRIES}):`, error.message);

            if (/bad auth|authentication failed/i.test(error.message)) {
                printAuthHelp();
                break;
            }

            if (attempt < MONGO_MAX_RETRIES) {
                await wait(MONGO_RETRY_DELAY_MS);
            }
        }
    }

    console.log(REQUIRE_MONGO
        ? "MongoDB required. Local JSON fallback is disabled."
        : "Using local JSON fallback.");
    return false;
}

function isMongoReady() {
    return mongoReady && mongoose.connection.readyState === 1;
}

mongoose.connection.on("disconnected", () => {
    mongoReady = false;
    globalMongoCache.conn = null;
    console.warn("MongoDB disconnected");
});

mongoose.connection.on("reconnected", () => {
    mongoReady = true;
    console.log("MongoDB reconnected");
});

mongoose.connection.on("error", (error) => {
    mongoReady = false;
    globalMongoCache.conn = null;
    console.error("MongoDB error:", error.message);
});

module.exports = { connectDB, isMongoReady };
