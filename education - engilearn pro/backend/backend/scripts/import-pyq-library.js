const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config({ path: path.join(__dirname, "..", "..", ".env") });
const { connectDB, isMongoReady } = require("../config/db");
const AppData = require("../models/AppData");
const { importPyqDataset } = require("../services/pyq-library");

const dataDir = path.join(__dirname, "..", "data");
const dbFile = path.join(dataDir, "db.json");
const datasetDir = path.resolve(process.env.PYQ_LIBRARY_DIR || "");

async function run() {
    if (!datasetDir || !fs.existsSync(datasetDir)) {
        throw new Error(`PYQ_LIBRARY_DIR does not exist: ${datasetDir}`);
    }
    const db = JSON.parse(fs.readFileSync(dbFile, "utf8"));
    const nonPyq = (db.content || []).filter((item) => !String(item.type || "").toLowerCase().includes("pyq"));
    const removed = (db.content || []).length - nonPyq.length;
    const nextId = nonPyq.length ? Math.max(...nonPyq.map((item) => Number(item.id) || 0)) + 1 : 1;
    const result = importPyqDataset(datasetDir, nextId, "Content Admin Dataset Import");
    db.content = [...nonPyq, ...result.records];
    db.adminLogs = [{
        id: Math.max(0, ...(db.adminLogs || []).map((item) => Number(item.id) || 0)) + 1,
        adminId: null,
        adminName: "System",
        action: "RGPV PYQ dataset imported",
        detail: `Removed ${removed} old PYQ records and imported ${result.records.length} structured papers`,
        createdAt: new Date().toISOString()
    }, ...(db.adminLogs || [])].slice(0, 150);
    fs.writeFileSync(dbFile, JSON.stringify(db, null, 2));

    if (await connectDB()) {
        await AppData.findOneAndUpdate(
            { key: "engilearn-main-db" },
            { key: "engilearn-main-db", data: db },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );
        const content = mongoose.connection.db.collection("content");
        const documents = db.content.map((item) => ({ ...item, appId: item.id }));
        await content.deleteMany({});
        const batchSize = 1000;
        for (let index = 0; index < documents.length; index += batchSize) {
            await content.insertMany(documents.slice(index, index + batchSize), { ordered: false });
        }
    }

    console.log(JSON.stringify({ removed, mongo: isMongoReady(), ...result.summary }));
    await mongoose.disconnect().catch(() => {});
}

run().catch(async (error) => {
    console.error(error.message);
    await mongoose.disconnect().catch(() => {});
    process.exitCode = 1;
});
