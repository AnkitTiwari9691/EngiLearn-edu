const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const source = fs.readFileSync(
    path.join(__dirname, "..", "frontend", "assets", "js", "repeated-questions.js"),
    "utf8"
);

const context = {
    console,
    window: {},
    document: { addEventListener() {} },
    localStorage: { getItem() { return null; }, setItem() {}, removeItem() {} },
    sessionStorage: { getItem() { return null; }, setItem() {}, removeItem() {} },
    location: { pathname: "/pages/repeated-questions.html", search: "", origin: "http://test" },
    history: { replaceState() {} },
    URL,
    URLSearchParams,
    setTimeout,
    clearTimeout,
    fetch: async () => { throw new Error("Unexpected network request"); }
};

vm.createContext(context);
vm.runInContext(source, context);
const run = (code) => vm.runInContext(code, context);

const anonymousDeepLink = JSON.parse(run(`
    repeatVerifiedUser = null;
    repeatState = { ...repeatState, step: "questions", branch: "all", semester: "all", subjectKey: "all", unit: "1" };
    repeatEnforceStudentPrerequisites();
    JSON.stringify(repeatState);
`));
assert.equal(anonymousDeepLink.step, "branches");
assert.equal(anonymousDeepLink.branch, "");
assert.equal(anonymousDeepLink.semester, "");
assert.equal(anonymousDeepLink.subjectKey, "");

const anonymousPaidScope = run(`
    repeatState = { ...repeatState, step: "questions", branch: "cse", semester: "3", subjectKey: "all" };
    repeatEnforceStudentPrerequisites();
    repeatPremiumRequiredForStep();
`);
assert.equal(anonymousPaidScope, true);
assert.equal(run("repeatCanLoadQuestionCatalog()"), false);

const publicCountsWithoutCatalog = JSON.parse(run(`
    repeatVerifiedUser = null;
    repeatQuestionRows = [];
    repeatManagedQuestionRows = [];
    repeatQuestionRowsLoaded = false;
    repeatPublicSummary = {
        totals: { questions: 90233, years: 33 },
        branches: { cse: { questions: 9311, semesters: { "3": 1158 } } }
    };
    JSON.stringify({
        branchQuestions: repeatPublicQuestionCount("cse", "all"),
        semesterQuestions: repeatPublicQuestionCount("cse", "3"),
        protectedRows: repeatQuestionRows.length,
        canLoadCatalog: repeatCanLoadQuestionCatalog()
    });
`));
assert.equal(publicCountsWithoutCatalog.branchQuestions, 9311);
assert.equal(publicCountsWithoutCatalog.semesterQuestions, 1158);
assert.equal(publicCountsWithoutCatalog.protectedRows, 0);
assert.equal(publicCountsWithoutCatalog.canLoadCatalog, false);

const entitledScope = run(`
    repeatVerifiedUser = {
        id: 7,
        role: "Student",
        repeatedQuestionsSemesterAccess: { "cse::sem-3": "verified" }
    };
    repeatState = { ...repeatState, step: "questions", branch: "cse", semester: "3", subjectKey: "all" };
    repeatHasPremiumAccess() && repeatCanLoadQuestionCatalog();
`);
assert.equal(entitledScope, true);

run("repeatState = { ...repeatState, semester: '4' }");
assert.equal(run("repeatHasPremiumAccess()"), false);
assert.equal(run("repeatCanLoadQuestionCatalog()"), false);

const freeGuest = run(`
    repeatVerifiedUser = null;
    repeatAccessSettings = { ...repeatAccessSettings, accessMode: "free" };
    repeatHasGlobalPremiumAccess();
`);
assert.equal(freeGuest, false);

const freeStudent = run(`
    repeatVerifiedUser = { id: 8, role: "Student" };
    repeatHasGlobalPremiumAccess();
`);
assert.equal(freeStudent, true);

const adminAll = JSON.parse(run(`
    repeatVerifiedUser = { id: 1, role: "Admin" };
    repeatAccessSettings = { ...repeatAccessSettings, accessMode: "paid" };
    repeatState = { ...repeatState, step: "questions", branch: "all", semester: "all", subjectKey: "all" };
    repeatEnforceStudentPrerequisites();
    JSON.stringify(repeatState);
`));
assert.equal(adminAll.step, "questions");
assert.equal(adminAll.branch, "all");
assert.equal(adminAll.semester, "all");

console.log("Repeated Questions access guard regression tests passed.");
