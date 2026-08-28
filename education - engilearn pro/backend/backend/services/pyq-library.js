const fs = require("fs");
const path = require("path");

function parseCsvLine(line) {
    const values = [];
    let value = "";
    let quoted = false;

    for (let index = 0; index < line.length; index += 1) {
        const char = line[index];
        if (char === '"') {
            if (quoted && line[index + 1] === '"') {
                value += '"';
                index += 1;
            } else {
                quoted = !quoted;
            }
        } else if (char === "," && !quoted) {
            values.push(value);
            value = "";
        } else {
            value += char;
        }
    }
    values.push(value);
    return values;
}

function readCsv(csvPath) {
    const lines = fs.readFileSync(csvPath, "utf8")
        .replace(/^\uFEFF/, "")
        .split(/\r?\n/)
        .filter((line) => line.trim());
    const headers = parseCsvLine(lines.shift());
    return lines.map((line) => {
        const values = parseCsvLine(line);
        return Object.fromEntries(headers.map((header, index) => [header, values[index] || ""]));
    });
}

function safeDatasetFile(datasetDir, relativePath) {
    const root = path.resolve(datasetDir);
    const resolved = path.resolve(root, String(relativePath || "").replace(/[\\/]+/g, path.sep));
    if (resolved !== root && !resolved.startsWith(`${root}${path.sep}`)) {
        throw new Error(`Unsafe PYQ dataset path: ${relativePath}`);
    }
    return resolved;
}

function pyqFileUrl(relativePath) {
    return `/pyq-files/${String(relativePath || "")
        .split(/[\\/]+/)
        .map((part) => encodeURIComponent(part))
        .join("/")}`;
}

const BRANCH_NAMES = {
    "3dag": "3D Animation & Graphics",
    ab: "AB",
    ad: "Artificial Intelligence & Data Science",
    ai: "Artificial Intelligence",
    aiml: "Artificial Intelligence & Machine Learning",
    auto: "Automobile Engineering",
    cd: "Computer Science & Design",
    chemical: "Chemical Engineering",
    civil: "Civil Engineering",
    csbs: "Computer Science & Business Systems",
    cse: "Computer Science & Engineering",
    "cse-iot": "Computer Science & IoT",
    csit: "Computer Science & Information Technology",
    cy: "Cyber Security",
    "e-all": "Electrical & Electronics Group",
    ft: "Food Technology",
    io: "Internet of Things",
    is: "Information Security",
    it: "Information Technology",
    me: "Mechanical Engineering",
    mi: "Mining Engineering",
    mm: "Metallurgy & Materials",
    others: "Other B.Tech Branches",
    rm: "Robotics & Mechatronics",
    sd: "Data Science",
    tx: "Textile Technology"
};

function normalizeBranchIds(row) {
    const value = String(row.Branches || row.Branch || row.branchId || "cse");
    return [...new Set(value.split(";").map((branch) => branch.trim().toLowerCase()).filter(Boolean))].sort();
}

function datasetRelativePath(datasetDir, row) {
    const candidates = [
        String(row.Path || "").trim(),
        row.Filename ? path.join("all-files", String(row.Filename).trim()) : "",
        String(row.Filename || "").trim()
    ].filter(Boolean);
    return candidates.find((candidate) => fs.existsSync(safeDatasetFile(datasetDir, candidate))) || candidates[0] || "";
}

function academicDuplicateKey(row, branchIds) {
    return [
        branchIds.join(","),
        String(row.Semester || "").replace(/[^\d]/g, ""),
        String(row["Subject Code"] || "").trim().toLowerCase(),
        String(row.Subject || "").trim().toLowerCase(),
        String(row.Year || "").trim(),
        String(row.Session || "").trim().toLowerCase()
    ].join("|");
}

function branchMetadataIndex(datasetDir) {
    const indexPath = path.join(datasetDir, "branch-subject-index.csv");
    if (!fs.existsSync(indexPath)) return new Map();
    const index = new Map();
    for (const row of readCsv(indexPath)) {
        const filename = String(row.Filename || "").trim().toLowerCase();
        const branchId = String(row.Branch || "").trim().toLowerCase();
        if (!filename || !branchId) continue;
        index.set(`${filename}|${branchId}`, {
            subject: String(row.Subject || "").trim(),
            subjectCode: String(row["Subject Code"] || "").trim()
        });
    }
    return index;
}

function importPyqDataset(datasetDir, startId = 1, importedBy = "Content Admin") {
    const csvPath = path.join(datasetDir, "pyq-index.csv");
    if (!fs.existsSync(csvPath)) {
        throw new Error(`PYQ index not found: ${csvPath}`);
    }

    const rows = readCsv(csvPath);
    const branchMetadata = branchMetadataIndex(datasetDir);
    const importedAt = new Date().toISOString();
    let missingFiles = 0;
    let duplicatesSkipped = 0;
    let nextRecordId = startId;
    const seen = new Set();
    const records = rows.flatMap((row) => {
        const branchIds = normalizeBranchIds(row);
        const duplicateKey = academicDuplicateKey(row, branchIds);
        if (seen.has(duplicateKey)) {
            duplicatesSkipped += 1;
            return [];
        }
        seen.add(duplicateKey);

        const relativePath = datasetRelativePath(datasetDir, row);
        const absolutePath = safeDatasetFile(datasetDir, relativePath);
        if (!relativePath || !fs.existsSync(absolutePath)) {
            missingFiles += 1;
            return [];
        }

        const semester = String(row.Semester || "").replace(/[^\d]/g, "");
        const indexedSubject = String(row.Subject || "RGPV Subject").trim();
        const indexedSubjectCode = String(row["Subject Code"] || "").trim();
        const year = String(row.Year || "").trim();
        const session = String(row.Session || "").trim();
        const filename = String(row.Filename || path.basename(absolutePath)).trim();
        const fileUrl = pyqFileUrl(relativePath);
        const downloadUrl = String(row["Download URL"] || row.downloadUrl || "").trim();
        const pageUrl = String(row["Page URL"] || row.pageUrl || "").trim();
        const branchNames = branchIds.map((branchId) => BRANCH_NAMES[branchId] || branchId.toUpperCase());
        const subjectCodesByBranch = Object.fromEntries(branchIds.map((branchId) => {
            const metadata = branchMetadata.get(`${filename.toLowerCase()}|${branchId}`);
            return [branchId, metadata?.subjectCode || indexedSubjectCode];
        }));
        const subjectsByBranch = Object.fromEntries(branchIds.map((branchId) => {
            const metadata = branchMetadata.get(`${filename.toLowerCase()}|${branchId}`);
            return [branchId, metadata?.subject || indexedSubject];
        }));
        const subjectCode = subjectCodesByBranch[branchIds[0]] || indexedSubjectCode;
        const subject = subjectsByBranch[branchIds[0]] || indexedSubject;

        return [{
            id: nextRecordId++,
            title: `${subject} ${session} ${year}`.trim(),
            type: "PYQ",
            branch: branchNames.join(", "),
            branchId: branchIds[0] || "cse",
            branchIds,
            branchNames,
            semester,
            subject,
            subjectCode,
            subjectsByBranch,
            subjectCodesByBranch,
            year,
            session,
            topic: `RGPV ${subject} (${subjectCode}) Semester ${semester} ${session} ${year} question paper`,
            tags: ["rgpv", "pyq", ...branchIds, `semester-${semester}`, subjectCode, year, session].filter(Boolean),
            fileName: filename,
            filePath: fileUrl,
            fileUrl,
            downloadUrl,
            sourceUrl: downloadUrl,
            pageUrl,
            datasetRelativePath: relativePath,
            source: "RGPV B.Tech All Branches PYQ Dataset",
            isActive: true,
            importedBy,
            importedAt,
            createdAt: importedAt
        }];
    });

    const uniqueSubjects = new Set(records.map((record) => record.subject));
    const uniqueCodes = new Set(records.map((record) => record.subjectCode));
    const uniqueBranches = new Set(records.flatMap((record) => record.branchIds || []));
    const semesters = [...new Set(records.map((record) => record.semester))].sort((a, b) => Number(a) - Number(b));
    const years = [...new Set(records.map((record) => record.year))].sort((a, b) => Number(b) - Number(a));

    return {
        records,
        summary: {
            imported: records.length,
            missingFiles,
            duplicatesSkipped,
            branches: uniqueBranches.size,
            subjects: uniqueSubjects.size,
            subjectCodes: uniqueCodes.size,
            semesters,
            years
        }
    };
}

function datasetStatus(datasetDir) {
    const csvPath = path.join(datasetDir, "pyq-index.csv");
    if (!fs.existsSync(csvPath)) {
        return { available: false, datasetDir, message: "pyq-index.csv not found" };
    }
    const rows = readCsv(csvPath);
    const branchIds = new Set(rows.flatMap((row) => normalizeBranchIds(row)));
    const uniqueKeys = new Set(rows.map((row) => academicDuplicateKey(row, normalizeBranchIds(row))));
    return {
        available: true,
        datasetDir,
        indexedPapers: rows.length,
        uniquePapers: uniqueKeys.size,
        duplicates: rows.length - uniqueKeys.size,
        branches: branchIds.size,
        subjects: new Set(rows.map((row) => row.Subject)).size,
        subjectCodes: new Set(rows.map((row) => row["Subject Code"])).size,
        semesters: [...new Set(rows.map((row) => row.Semester))].sort(),
        years: [...new Set(rows.map((row) => row.Year))].sort((a, b) => Number(b) - Number(a))
    };
}

module.exports = { datasetStatus, importPyqDataset };
