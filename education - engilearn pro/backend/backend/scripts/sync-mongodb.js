const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

require("dotenv").config({ path: path.join(__dirname, "..", "..", ".env") });
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const DATA_FILE = path.join(__dirname, "..", "data", "db.json");
const SNAPSHOT_KEY = "engilearn-main-db";

const DATA_COLLECTIONS = [
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
    "liveClasses",
    "watchHistory",
    "bookmarks",
    "attendance",
    "marks",
    "sessions",
    "tokenBlacklist",
    "signupRequests",
    "passwordResetRequests",
    "adminLogs",
    "courses",
    "exams",
    "payments",
    "notifications",
    "aiTools",
    "contacts"
];

function normalizeRole(role) {
    const value = String(role || "").trim().toLowerCase();
    if (value === "admin" || value === "administrator") return "Admin";
    if (value === "teacher") return "Teacher";
    return "Student";
}

function collectionName(name) {
    return name.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`).toLowerCase();
}

function clone(value) {
    return JSON.parse(JSON.stringify(value || {}));
}

function prepareDb(db) {
    const prepared = clone(db);
    const users = Array.isArray(prepared.users) ? prepared.users : [];

    prepared.students = users.filter((user) => normalizeRole(user.role) === "Student");
    prepared.teachers = users.filter((user) => normalizeRole(user.role) === "Teacher");
    prepared.admins = users.filter((user) => normalizeRole(user.role) === "Admin");

    for (const name of DATA_COLLECTIONS) {
        if (!Array.isArray(prepared[name])) prepared[name] = [];
    }

    return prepared;
}

function documentForMongo(record) {
    const document = { ...record };
    document.appId = record.id ?? record.key ?? record.email ?? record.mobile ?? record.title ?? String(Date.now());
    document.syncedAt = new Date().toISOString();
    return document;
}

async function replaceCollection(name, records) {
    const collection = mongoose.connection.db.collection(collectionName(name));
    const documents = records.map(documentForMongo);
    const appIds = documents.map((document) => document.appId);

    const batchSize = 500;
    for (let index = 0; index < documents.length; index += batchSize) {
        const batch = documents.slice(index, index + batchSize);
        if (!batch.length) continue;
        await collection.bulkWrite(batch.map((document) => ({
            replaceOne: {
                filter: { appId: document.appId },
                replacement: document,
                upsert: true
            }
        })), { ordered: false });
    }

    await collection.deleteMany(appIds.length ? { appId: { $nin: appIds } } : {});
    return documents.length;
}

async function main() {
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI is not set in backend/.env");
    if (!fs.existsSync(DATA_FILE)) throw new Error(`Data file not found: ${DATA_FILE}`);

    const localDb = prepareDb(JSON.parse(fs.readFileSync(DATA_FILE, "utf8")));

    await mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 15000,
        connectTimeoutMS: 15000,
        maxPoolSize: Number(process.env.MONGO_MAX_POOL_SIZE || 10),
        retryWrites: true
    });

    await mongoose.connection.db.collection("appdatas").replaceOne(
        { key: SNAPSHOT_KEY },
        { key: SNAPSHOT_KEY, data: localDb, updatedAt: new Date() },
        { upsert: true }
    );

    const report = {};
    for (const name of DATA_COLLECTIONS) {
        report[collectionName(name)] = await replaceCollection(name, localDb[name]);
    }

    await mongoose.connection.db.collection("settings").replaceOne(
        { key: "main" },
        { key: "main", ...(localDb.settings || {}), syncedAt: new Date().toISOString() },
        { upsert: true }
    );

    console.log("MongoDB sync complete");
    console.log(JSON.stringify(report, null, 2));
}

main()
    .catch((error) => {
        console.error("MongoDB sync failed:", error.message);
        process.exitCode = 1;
    })
    .finally(async () => {
        await mongoose.disconnect().catch(() => {});
    });
