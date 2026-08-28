const aiTools = [
    ["ChatGPT", "Instant doubt solving, concept explanation, and code debugging.", "fab fa-openai", "", "#2563eb", "https://chatgpt.com/"],
    ["Gemini", "Research, diagram explanation, and homework help.", "fas fa-gem", "", "#4285f4", "https://gemini.google.com/"],
    ["Grok", "Technical problem solving and engineering concepts.", "fas fa-robot", "", "#ff6b35", "https://grok.x.ai/"],
    ["DeepSeek", "Coding and technical reasoning support.", "fas fa-brain", "", "#10b981", "https://chat.deepseek.com/"],
    ["Claude", "Long context reasoning and coding help.", "fas fa-user-astronaut", "", "#ff6b6b", "https://claude.ai/new"],
    ["Perplexity", "Real-time web research and fact checking.", "fas fa-search", "", "#6366f1", "https://www.perplexity.ai/"],
    ["GitHub Copilot", "AI code completion and generation.", "fab fa-github", "", "#24292e", "https://github.com/copilot"],
    ["Codeium", "Code completion for many languages.", "fas fa-code", "", "#00a886", "https://codeium.com/"],
    ["Replit AI", "Online compiler with AI assistance.", "fas fa-terminal", "", "#0d1117", "https://replit.com/"],
    ["LeetCode", "Coding interview practice and hints.", "fas fa-puzzle-piece", "", "#f0932b", "https://leetcode.com/"],
    ["Java Compiler", "Run and test Java programs online.", "fas fa-play-circle", "", "#667eea", "https://www.programiz.com/java-programming/online-compiler/"],
    ["Tabnine", "AI autocomplete for IDE workflows.", "fas fa-magic", "", "#fe7c5a", "https://www.tabnine.com/"],
    ["QuillBot", "Writing, paraphrasing, and study support.", "fas fa-pen-nib", "", "#0f766e", "https://quillbot.com/"],
    ["Ollama", "Run local models for offline AI work.", "fas fa-download", "", "#6b7280", "https://ollama.com/"],
    ["Phind", "Developer-focused AI search.", "fas fa-compass", "", "#3b82f6", "https://www.phind.com/"],
    ["All Compiler", "Multi-language coding practice IDE.", "fas fa-check-circle", "", "#059669", "https://www.codechef.com/ide"],
    ["Overleaf", "Write lab reports, resumes, and project PDFs.", "fas fa-file-pen", "", "#047857", "https://www.overleaf.com/"],
    ["Draw.io", "Make flowcharts, ER diagrams, and architecture maps.", "fas fa-diagram-project", "", "#f97316", "https://app.diagrams.net/"],
    ["Wolfram Alpha", "Solve math, circuits, and engineering formulas.", "fas fa-square-root-variable", "", "#dc2626", "https://www.wolframalpha.com/"],
    ["Google Colab", "Run Python, ML notebooks, and data analysis.", "fab fa-python", "", "#f59e0b", "https://colab.research.google.com/"],
    ["Canva", "Create seminar posters and presentation visuals.", "fas fa-palette", "", "#06b6d4", "https://www.canva.com/"],
    ["Notion", "Organize notes, projects, and study plans.", "fas fa-list-check", "", "#111827", "https://www.notion.so/"]
];

const aiToolOrder = [
    "ChatGPT",
    "Gemini",
    "Grok",
    "DeepSeek",
    "Claude",
    "Perplexity",
    "GitHub Copilot",
    "Codeium",
    "Replit AI",
    "LeetCode",
    "Java Compiler",
    "Tabnine",
    "QuillBot",
    "Ollama",
    "Phind",
    "All Compiler",
    "Overleaf",
    "Draw.io",
    "Wolfram Alpha",
    "Google Colab",
    "Canva",
    "Notion",
    "AI Video Studio"
];

const branches = [
    ["cse", "#1 CSE", "Computer Science & Engg", "fas fa-laptop-code", "linear-gradient(135deg, #667eea, #764ba2)", ["Sem 3-4: ES-301, CS-302, BT-401, CS-402", "Sem 5-6: CS-501, CS-502, CS-601, CS-602", "Sem 7-8: CS-701, CS-702(A), CS-801, CS-802(A)"]],
    ["it", "#2 IT", "Information Technology", "fas fa-server", "linear-gradient(135deg, #a8edea, #fed6e3)", ["Sem 1-2: BT-101, BT-102, BT-201, BT-202", "Sem 3-4: ES-301, IT-302, BT-401, IT-402", "Sem 5-6: IT-501, IT-502, IT-601, IT-602", "Sem 7-8: IT-701, IT-702(A), IT-801, IT-802"]],
    ["ece", "#3 ECE", "Electronics & Communication", "fas fa-broadcast-tower", "linear-gradient(135deg, #f093fb, #f5576c)", ["Sem 1-2: BT-101, BT-102, BT-201, BT-202", "Sem 3-4: BT-301, EC-302, ES-401, EC-402", "Sem 5-6: EC-501, EC-502, EC-601, EC-602", "Sem 7-8: EC-701, EC-702-(A/B/C), EC-801, EC-802-(A/B/C)"]],
    ["mech", "#4 ME", "Mechanical Engineering", "fas fa-cogs", "linear-gradient(135deg, #ff6b6b, #ee5a24)", ["Sem 1-2: BT-101, BT-102, BT-201, BT-202", "Sem 3-4: ME-301, ME-302, ME-401, ME-402", "Sem 5-6: ME-501, ME-502, ME-601, ME-602", "Sem 7-8: ME-701, ME-702, ME-801(A), ME-801(B)"]],
    ["civil", "#5 CIVIL", "Civil Engineering", "fas fa-hard-hat", "linear-gradient(135deg, #4ecdc4, #44a08d)", ["Sem 1-2: BT-101, BT-102, BT-201, BT-202", "Sem 3-4: CE-301, CE-302, CE-401, CE-402", "Sem 5-6: CE-501, CE-502, CE-601, CE-602", "Sem 7-8: CE-701, CE-702, CE-801(A), CE-801(B)"]],
    ["eee", "#6 EEE", "Electrical & Electronics", "fas fa-plug", "linear-gradient(135deg, #ffeaa7, #fab1a0)", ["Sem 1-2: BT-101, BT-102, BT-201, BT-202", "Sem 3-4: EE-301, EE-302, EE-401, EE-402", "Sem 5-6: EE-501, EE-502, EE-601, EE-602", "Sem 7-8: EE-701, EE-702, EE-801(A), EE-801(B)"]],
    ["ai", "#7 AI/ML", "AI & Machine Learning", "fas fa-brain", "linear-gradient(135deg, #ff6b9d, #c44569)", ["Sem 3-4: Python, DSA, DBMS", "Sem 5-6: ML, DL, NLP", "Sem 7-8: Computer Vision, Reinforcement Learning"]],
    ["ds", "#8 DS", "Data Science", "fas fa-chart-line", "linear-gradient(135deg, #4facfe, #00f2fe)", ["Sem 1-2: BT-101, BT-102, BT-201, BT-202", "Sem 3-4: BT-301, DS-302, BT-401, DS-402", "Sem 5-6: CD-501, CD-502, CD-601, CD-602", "Sem 7-8: CD-701, CD-702-(A/B/C/D), CD-801, CD-802-(A/B/C/D)"]],
    ["cyber", "#9 CYBER", "Cyber Security", "fas fa-shield-alt", "linear-gradient(135deg, #ff416c, #ff4b2b)", ["Sem 1-2: BT-101, BT-102, BT-201, BT-202", "Sem 3-4: CY-301, CY-302, CY-401, CY-402", "Sem 5-6: CY-501, CY-502, CY-601, CY-602", "Sem 7-8: CY-701, CY-702, CD-801, CD-802-(A/B/C/D)"]],
    ["chemical", "#10 CHEM", "Chemical Engineering", "fas fa-flask", "linear-gradient(135deg, #ff9a9e, #fecfef)", ["Sem 1-2: BT-101, BT-102, BT-201, BT-202", "Sem 3-4: BT-301, CM-302, BT-401, CM-402", "Sem 5-6: CM-501, CM-502, CM-601, CM-602", "Sem 7-8: CM-701, CM-702, CM-801(A), CM-801(B)"]],
    ["auto", "#11 AUTO", "Automobile Engineering", "fas fa-car", "linear-gradient(135deg, #fa709a, #fee140)", ["Sem 1-2: BT-101, BT-102, BT-201, BT-202", "Sem 3-4: BT-301, AU-302, BT-401, AU-402", "Sem 5-6: AU-501, AU-502, AU-601, AU-602", "Sem 7-8: AU-701, AU-702, AU-801, AU-802"]],
    ["production", "#12 PROD", "Production Engineering", "fas fa-industry", "linear-gradient(135deg, #ffecd2, #fcb69f)", ["Sem 1-2: BT-101, BT-102, BT-201, BT-202", "Sem 3-4: BT-301, PR-302, BT-401, PR-402", "Sem 5-6: PR-501, PR-502, PR-601, PR-602", "Sem 7-8: PR-701, PR-702, PR-801, PR-802"]],
    ["aero", "#13 AERO", "Aeronautical Engineering", "fas fa-plane", "linear-gradient(135deg, #667db6, #0082c8)", ["Sem 1-2: BT-101, BT-102, BT-201, BT-202", "Sem 3-4: BT-301, AE-302, BT-401, AE-402", "Sem 5-6: AE-501, AE-502, AE-601, AE-602", "Sem 7-8: AE-701, AE-702, AE-801, AE-802"]],
    ["bme", "#14 BME", "Biomedical Engineering", "fas fa-heartbeat", "linear-gradient(135deg, #a8edea, #fed6e3)", ["Sem 1-2: BT-101, BT-102, BT-201, BT-202", "Sem 3-4: BT-301, BM-302, BT-401, BM-402", "Sem 5-6: BM-501, BM-502, BM-601, BM-602", "Sem 7-8: BM-701, BM-702, BM-801, BM-802"]],
    ["iot", "#15 IOT", "IoT & Embedded Systems", "fas fa-network-wired", "linear-gradient(135deg, #11998e, #38ef7d)", ["Sem 1-2: BT-101, BT-102, BT-201, BT-202", "Sem 3-4: BT-301, IE-302, BT-401, IE-402", "Sem 5-6: IE-501, IE-502, IE-601, IE-602", "Sem 7-8: IE-701, IE-702, IE-801, IE-802"]],
    ["mechatronics", "#16 MECH", "Mechatronics", "fas fa-robot", "linear-gradient(135deg, #667eea, #764ba2)", ["Sem 1-2: BT-101, BT-102, BT-201, BT-202", "Sem 3-4: BT-301, MT-302, BT-401, MT-402", "Sem 5-6: MT-501, MT-502, MT-601, MT-602", "Sem 7-8: MT-701, MT-702, MT-801, MT-802"]],
    ["power", "#17 POWER", "Power Electronics", "fas fa-bolt", "linear-gradient(135deg, #f093fb, #f5576c)", ["Sem 1-2: BT-101, BT-102, BT-201, BT-202", "Sem 3-4: BT-301, PE-302, BT-401, PE-402", "Sem 5-6: PE-501, PE-502, PE-601, PE-602", "Sem 7-8: PE-701, PE-702, PE-801, PE-802"]],
    ["instrumentation", "#18 INST", "Instrumentation", "fas fa-tachometer-alt", "linear-gradient(135deg, #4ecdc4, #44a08d)", ["Sem 1-2: BT-101, BT-102, BT-201, BT-202", "Sem 3-4: BT-301, IN-302, BT-401, IN-402", "Sem 5-6: IN-501, IN-502, IN-601, IN-602", "Sem 7-8: IN-701, IN-702, IN-801, IN-802"]],
    ["env", "#19 ENV", "Environmental Engineering", "fas fa-leaf", "linear-gradient(135deg, #56ab2f, #a8e6cf)", ["Sem 1-2: BT-101, BT-102, BT-201, BT-202", "Sem 3-4: BT-301, EV-302, BT-401, EV-402", "Sem 5-6: EV-501, EV-502, EV-601, EV-602", "Sem 7-8: EV-701, EV-702, EV-801, EV-802"]],
    ["arch", "#20 ARCH", "Architecture", "fas fa-drafting-compass", "linear-gradient(135deg, #d299c2, #fef9d7)", ["Sem 1-2: AR-101, AR-102, AR-201, AR-202", "Sem 3-4: AR-301, AR-302, AR-401, AR-402", "Sem 5-6: AR-501, AR-502, AR-601, AR-602", "Sem 7-8: AR-701, AR-702, AR-801, AR-802"]],
    ["metallurgy", "#21 METAL", "Metallurgical Engineering", "fas fa-fire", "linear-gradient(135deg, #b8cbb8, #e2f0cb)", ["Sem 1-2: BT-101, BT-102, BT-201, BT-202", "Sem 3-4: BT-301, ML-302, BT-401, ML-402", "Sem 5-6: ML-501, ML-502, ML-601, ML-602", "Sem 7-8: ML-701, ML-702, ML-801, ML-802"]],
    ["mining", "#22 MINING", "Mining Engineering", "fas fa-mountain", "linear-gradient(135deg, #c21500, #ffc500)", ["Sem 1-2: BT-101, BT-102, BT-201, BT-202", "Sem 3-4: BT-301, MN-302, BT-401, MN-402", "Sem 5-6: MN-501, MN-502, MN-601, MN-602", "Sem 7-8: MN-701, MN-702, MN-801, MN-802"]],
    ["textile", "#23 TEXTILE", "Textile Technology", "fas fa-tshirt", "linear-gradient(135deg, #ffecd2, #fcb69f)", ["Sem 1-2: BT-101, BT-102, BT-201, BT-202", "Sem 3-4: BT-301, TT-302, BT-401, TT-402", "Sem 5-6: TT-501, TT-502, TT-601, TT-602", "Sem 7-8: TT-701, TT-702, TT-801, TT-802"]],
    ["petroleum", "#24 PETRO", "Petroleum Engineering", "fas fa-oil-can", "linear-gradient(135deg, #000000, #434343)", ["Sem 1-2: BT-101, BT-102, BT-201, BT-202", "Sem 3-4: BT-301, PT-302, BT-401, PT-402", "Sem 5-6: PT-501, PT-502, PT-601, PT-602", "Sem 7-8: PT-701, PT-702, PT-801, PT-802"]],
    ["food", "#25 FOOD", "Food Technology", "fas fa-utensils", "linear-gradient(135deg, #ff9a56, #ff6b35)", ["Sem 1-2: BT-101, BT-102, BT-201, BT-202", "Sem 3-4: BT-301, FT-302, BT-401, FT-402", "Sem 5-6: FT-501, FT-502, FT-601, FT-602", "Sem 7-8: FT-701, FT-702, FT-801, FT-802"]],
    ["robotics", "#26 ROBOT", "Robotics Engineering", "fas fa-robot", "linear-gradient(135deg, #ff006e, #8338ec)", ["Sem 1-2: BT-101, BT-102, BT-201, BT-202", "Sem 3-4: BT-301, RB-302, BT-401, RB-402", "Sem 5-6: RB-501, RB-502, RB-601, RB-602", "Sem 7-8: RB-701, RB-702, RB-801, RB-802"]],
    ["nano", "#27 NANO", "Nanotechnology", "fas fa-microscope", "linear-gradient(135deg, #00c6ff, #0072ff)", ["Sem 1-2: BT-101, BT-102, BT-201, BT-202", "Sem 3-4: BT-301, NT-302, BT-401, NT-402", "Sem 5-6: NT-501, NT-502, NT-601, NT-602", "Sem 7-8: NT-701, NT-702, NT-801, NT-802"]],
    ["marine", "#28 MARINE", "Marine Engineering", "fas fa-ship", "linear-gradient(135deg, #0077be, #00b4d8)", ["Sem 1-2: BT-101, BT-102, BT-201, BT-202", "Sem 3-4: BT-301, MR-302, BT-401, MR-402", "Sem 5-6: MR-501, MR-502, MR-601, MR-602", "Sem 7-8: MR-701, MR-702, MR-801, MR-802"]]
];

const pyqBase = "https://www.rgpvonline.com/btech";
const PYQ_PAGE_SIZE = 8;
const PUBLIC_CONTENT_TIMEOUT_MS = 3500;

function readLocalJson(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
        localStorage.removeItem(key);
        return fallback;
    }
}

function writeLocalJson(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        if (error?.name === "QuotaExceededError") localStorage.removeItem(key);
        return false;
    }
}

function cachePublicContent(content) {
    const items = Array.isArray(content) ? content : [];
    const cacheable = items.length > 500
        ? items.filter((item) => !String(item.type || "").toLowerCase().includes("pyq"))
        : items;
    writeLocalJson("admin_content", cacheable);
}

function loadStaticPyqContent() {
    if (staticPyqContentPromise) return staticPyqContentPromise;
    staticPyqContentPromise = fetch("assets/data/pyq-index.json?v=2", { cache: "force-cache" })
        .then((response) => response.ok ? response.json() : [])
        .then((items) => {
            staticPyqContent = Array.isArray(items) ? items : [];
            return staticPyqContent;
        })
        .catch(() => {
            staticPyqContent = [];
            return staticPyqContent;
        });
    return staticPyqContentPromise;
}

let pyqVisibleCount = PYQ_PAGE_SIZE;
let pyqRepeatUnit = "all";
let pyqRepeatSort = "priority";
let pyqExportRecords = [];
let publicContentLoading = false;
let publicContentReady = false;
let publicContentRetryCount = 0;
let publicContentRetryTimer = null;
let backendContent = readLocalJson("admin_content", []);
let staticPyqContent = [];
let staticPyqContentPromise = null;
let backendLectures = readLocalJson("backend_lectures", []);
let backendAiTools = readLocalJson("engilearn_ai_tools", []) || [];
let platformSettings = {
    sections: { videos: true, pyq: true, tools: true, prompts: false },
    visibility: { videos: true, pyq: true, tools: true, prompts: false },
    subscription: { videos: true, title: "Subscriber Video Library" },
    toolHub: { visible: true, accessMode: "paid", price: 100, qrImage: "", upiId: "", payeeName: "EngiLearn", instructions: "Payment is required before Tool Hub access is unlocked." }
};
window.engilearnPlatformSettingsFresh = false;
let activeVideoCards = [];
let activeVideoIndex = 0;
let videoPlayerSize = "wide";
let videoPlayerMuted = false;

const subjectByBranchSemester = {
    cse: {
        "1-2": ["M1", "M2", "Physics", "Chemistry", "BCP"],
        "3-4": ["DSA", "OOP", "DBMS"],
        "5-6": ["OS", "CN", "Compiler"],
        "7-8": ["Software Engg", "Web Tech", "AI"]
    },
    it: {
        "3-4": ["Web Tech", "DBMS", "Java"],
        "5-6": ["Cloud", "Mobile App", "Software Engg"],
        "7-8": ["Cyber Security", "Big Data"]
    },
    ece: {
        "3-4": ["EDC", "Digital", "Microprocessor"],
        "5-6": ["DSP", "VLSI", "Signals"],
        "7-8": ["Antenna", "Optical", "Embedded"]
    },
    mech: {
        "3-4": ["SOM", "TOM", "Fluid Mechanics"],
        "5-6": ["Thermo", "Heat Transfer", "Machine Design"],
        "7-8": ["RAC", "Industrial Engg", "Automobile"]
    },
    civil: {
        "3-4": ["SOM", "Surveying", "Fluid Mechanics"],
        "5-6": ["RCC", "Geotech", "Steel Structure"],
        "7-8": ["Transportation", "Irrigation", "Estimation"]
    },
    eee: {
        "3-4": ["Network", "EMFT", "EDC"],
        "5-6": ["Machines", "Power System", "Control System"],
        "7-8": ["Switchgear", "Microprocessor", "Renewable"]
    },
    ai: {
        "3-4": ["Python", "DSA", "DBMS"],
        "5-6": ["ML", "DL", "NLP"],
        "7-8": ["Computer Vision", "Reinforcement Learning"]
    },
    ai: {
        "3": ["AL-301 - Technical Communication", "AL-302 - Introduction to Probability and Statistics", "AL-303 - Data Structures", "AL-304 - Artificial Intelligence", "AL-305 - Object Oriented Programming and Methodology"],
        "4": ["AL-401 - Introduction to Discrete Structure and Linear Algebra", "AL-402 - Analysis and Design of Algorithms", "AL-403 - Software Engineering", "AL-404 - Computer Organization and Architecture", "AL-405 - Machine Learning"]
    },
    ds: {
        "3-4": ["Statistics", "Python", "SQL"],
        "5-6": ["Big Data", "ML", "Data Mining"],
        "7-8": ["Business Analytics", "Visualization"]
    },
    cyber: {
        "3-4": ["Network", "Cryptography", "OS"],
        "5-6": ["Ethical Hacking", "Forensics"],
        "7-8": ["Blockchain", "Cloud Security"]
    }
};

function engiSubjectHasCode(value) {
    return /^[A-Z]{1,6}[\s-]?\d{3,4}(?:\s*-?\s*\([A-Z](?:\/[A-Z])*\)|\([A-Z]\))?\b/i.test(String(value || "").trim());
}

function engiCodedSubjectList(list) {
    return [...new Set((Array.isArray(list) ? list : [])
        .map((subject) => String(subject || "").trim())
        .filter((subject) => subject && engiSubjectHasCode(subject)))];
}

function engiCodedSubjectMap(map) {
    return Object.fromEntries(Object.entries(map || {})
        .map(([semester, subjects]) => [semester, engiCodedSubjectList(subjects)])
        .filter(([, subjects]) => subjects.length));
}
function getBranchSubjects(branchId) {
    if (subjectByBranchSemester[branchId]) {
        return engiCodedSubjectMap(subjectByBranchSemester[branchId]);
    }

    const branch = branches.find(([id]) => id === branchId);
    const subjects = branch ? branch[5].flatMap((row) => {
        const details = row.includes(":") ? row.slice(row.indexOf(":") + 1) : row;
        return details.split(",").map((subject) => subject.trim()).filter(engiSubjectHasCode);
    }) : [];

    return engiCodedSubjectMap({
        "3-4": subjects.slice(0, 3),
        "5-6": subjects.slice(3, 6),
        "7-8": subjects.slice(6, 9)
    });
}

function getTeacherVideos(branchId, semester, subject) {
    const branch = branches.find(([id]) => id === branchId);
    const branchName = branch ? branch[2] : "Engineering";
    const encodedSearch = encodeURIComponent(`${branchName} ${subject} RGPV semester ${semester} lecture`);

    return [
        {
            teacher: "Teacher 1",
            title: `${subject} Complete Lecture`,
            description: `${branchName} Sem ${semester} lecture by Teacher 1.`,
            embed: "https://www.youtube.com/embed/videoseries?list=PL9ooVrP1hQOG6DQnOD6ujdCEchaqADfCU",
            open: `https://www.youtube.com/results?search_query=${encodedSearch}+teacher+1`
        },
        {
            teacher: "Teacher 2",
            title: `${subject} Problem Solving`,
            description: `${branchName} Sem ${semester} practice session by Teacher 2.`,
            embed: "https://www.youtube.com/embed/videoseries?list=PLWPirh4EWFpF_2T13UeEgZWZHc8nHBuXp",
            open: `https://www.youtube.com/results?search_query=${encodedSearch}+teacher+2`
        }
    ];
}

async function loadPublicContent() {
    publicContentLoading = true;
    platformSettings = {
        ...platformSettings,
        ...(readLocalJson("engilearn_public_settings", null) || {})
    };
    backendContent = readLocalJson("admin_content", backendContent) || backendContent;
    backendLectures = readLocalJson("backend_lectures", backendLectures) || backendLectures;
    backendAiTools = readLocalJson("engilearn_ai_tools", backendAiTools) || backendAiTools;
    await loadStaticPyqContent();
    window.engilearnPlatformSettings = platformSettings;
    window.dispatchEvent(new CustomEvent("engilearn:settings", { detail: platformSettings }));

    if (!window.EngiLearnAPI) {
        publicContentLoading = false;
        publicContentReady = true;
        return;
    }

    const [settingsResult, contentResult, lecturesResult, toolsResult] = await Promise.allSettled([
        withFastTimeout(EngiLearnAPI.getPublicSettings(), 1200, "Public settings refresh timed out."),
        withFastTimeout(EngiLearnAPI.getContent(false), PUBLIC_CONTENT_TIMEOUT_MS, "Content Admin PYQ refresh timed out."),
        withFastTimeout(EngiLearnAPI.getLectures(), 1200, "Lecture refresh timed out."),
        withFastTimeout(EngiLearnAPI.getAiTools(), 1200, "AI tools refresh timed out.")
    ]);

    if (settingsResult.status === "fulfilled") {
        const data = settingsResult.value;
        platformSettings = {
            ...platformSettings,
            ...(data.settings || {}),
            sections: { ...platformSettings.sections, ...(data.settings?.sections || {}) },
            visibility: { ...platformSettings.visibility, ...(data.settings?.visibility || {}) },
            subscription: { ...platformSettings.subscription, ...(data.settings?.subscription || {}) },
            toolHub: { ...platformSettings.toolHub, ...(data.settings?.toolHub || {}) }
        };
        localStorage.setItem("engilearn_public_settings", JSON.stringify(platformSettings));
        window.engilearnPlatformSettings = platformSettings;
        window.engilearnPlatformSettingsFresh = true;
        window.dispatchEvent(new CustomEvent("engilearn:settings", { detail: platformSettings }));
    } else {
        window.engilearnPlatformSettingsFresh = false;
        console.warn("Using local section settings:", settingsResult.reason?.message || settingsResult.reason);
    }

    if (contentResult.status === "fulfilled") {
        backendContent = contentResult.value.content || [];
        cachePublicContent(backendContent);
        publicContentRetryCount = 0;
        if (publicContentRetryTimer) window.clearTimeout(publicContentRetryTimer);
        publicContentRetryTimer = null;
    } else {
        console.warn("Using local content only:", contentResult.reason?.message || contentResult.reason);
        const hasLocalPyq = backendContent.some((item) => String(item.type || "").toLowerCase().includes("pyq"));
        if (!hasLocalPyq && publicContentRetryCount < 6 && !publicContentRetryTimer) {
            publicContentRetryCount += 1;
            publicContentRetryTimer = window.setTimeout(() => {
                publicContentRetryTimer = null;
                loadPublicContent().then(() => {
                    applySectionVisibility();
                    renderVideoLectures();
                    renderPyq();
                });
            }, 4000);
        }
    }
    publicContentLoading = false;
    publicContentReady = contentResult.status === "fulfilled"
        || backendContent.some((item) => String(item.type || "").toLowerCase().includes("pyq"));

    if (lecturesResult.status === "fulfilled") {
        backendLectures = lecturesResult.value.lectures || [];
        localStorage.setItem("backend_lectures", JSON.stringify(backendLectures));
    } else {
        console.warn("Using local lectures only:", lecturesResult.reason?.message || lecturesResult.reason);
    }

    if (toolsResult.status === "fulfilled") {
        const incomingTools = Array.isArray(toolsResult.value.tools) ? toolsResult.value.tools : [];
        backendAiTools = incomingTools.length ? incomingTools : [];
        localStorage.setItem("engilearn_ai_tools", JSON.stringify(backendAiTools));
    } else {
        console.warn("Using default AI tools only:", toolsResult.reason?.message || toolsResult.reason);
    }
}
function currentUserIsAdmin() {
    try {
        const user = JSON.parse(localStorage.getItem("mini_currentUser") || "null");
        return String(user?.role || "").toLowerCase() === "admin";
    } catch (error) {
        return false;
    }
}

function applySectionVisibility() {
    const admin = currentUserIsAdmin();
    const sections = platformSettings.sections || {};
    const visibility = platformSettings.visibility || {};
    const map = [
        ["ai-tools", sections.tools !== false && visibility.tools !== false],
        ["videos", sections.videos !== false && visibility.videos !== false],
        ["pyq", sections.pyq !== false && visibility.pyq !== false]
    ];

    map.forEach(([id, enabled]) => {
        const section = document.getElementById(id);
        const navLink = document.querySelector(`.nav-menu a[href="#${id}"]`);
        if (section) section.hidden = !enabled && !admin;
        if (navLink?.parentElement) navLink.parentElement.hidden = !enabled && !admin;
    });

    const promptSection = document.getElementById("prompts");
    if (promptSection) promptSection.hidden = true;
    document.querySelectorAll('a[href="#prompts"]').forEach((link) => {
        if (link.parentElement) link.parentElement.hidden = true;
        link.hidden = true;
    });
    // Prompts removed by admin request; keep it hidden even if older settings still contain prompts:true.

    document.querySelectorAll('a[href*="pages/lecture.html"], a[href*="/lecture.html"]').forEach((link) => {
        link.hidden = sections.videos === false || visibility.videos === false ? !admin : false;
    });
}

function normalizeText(value) {
    return String(value || "")
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/engg/g, "engineering")
        .replace(/[^a-z0-9]+/g, " ")
        .trim();
}

function semesterMatches(filterSemester, itemSemester) {
    const filter = String(filterSemester || "");
    const item = String(itemSemester || "");
    if (!filter || !item) return true;
    if (filter === item) return true;
    if (filter.includes("-")) {
        const [from, to] = filter.split("-").map(Number);
        const numeric = Number(item);
        return Number.isFinite(numeric) && numeric >= from && numeric <= to;
    }
    return false;
}

function getBackendVideos(branchId, semester, subject) {
    const branch = branches.find(([id]) => id === branchId);
    const branchName = branchId === "all" ? "" : normalizeText(branch ? branch[2] : branchId);
    const subjectValue = normalizeText(subject);
    const teacherFilter = document.getElementById("videoTeacherSelect")?.value || "all";
    const search = normalizeText(document.getElementById("videoSearchInput")?.value || "");

    return backendLectures
        .filter((lecture) => {
            const itemBranch = normalizeText(lecture.branch);
            const itemSubject = normalizeText(lecture.subject);
            const itemTeacher = String(lecture.teacherName || "Teacher");
            const haystack = normalizeText(`${lecture.title} ${lecture.subject} ${lecture.chapter} ${lecture.teacherName} ${lecture.description}`);
            return (
                (branchId === "all" || !itemBranch || itemBranch.includes(branchName) || branchName.includes(itemBranch)) &&
                semesterMatches(semester, lecture.semester) &&
                (!subjectValue || itemSubject === subjectValue || itemSubject.includes(subjectValue) || subjectValue.includes(itemSubject)) &&
                (teacherFilter === "all" || itemTeacher === teacherFilter) &&
                (!search || haystack.includes(search))
            );
        })
        .map((lecture) => ({
            id: lecture.id,
            source: "backend",
            teacher: lecture.teacherName || "Teacher",
            title: lecture.title,
            subject: lecture.subject,
            chapter: lecture.chapter || "Lecture",
            description: lecture.description || `${lecture.subject} lecture for ${lecture.branch}, semester ${lecture.semester}.`,
            embed: toEmbedUrl(lecture.videoUrl),
            open: lecture.videoUrl || lecture.videoMeta?.url || "#",
            notes: lecture.notesUrl || lecture.resourceMeta?.url || "",
            views: lecture.views || 0,
            type: lecture.sourceType || "video"
        }));
}

function toEmbedUrl(url) {
    if (!url || !/^https?:\/\//i.test(url)) return "";
    if (url.includes("youtube.com/watch?v=")) {
        return url.replace("watch?v=", "embed/");
    }
    if (url.includes("youtu.be/")) {
        return url.replace("youtu.be/", "www.youtube.com/embed/");
    }
    return url;
}

function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>'"]/g, (char) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;"
    }[char]));
}

function safeExternalUrl(value) {
    const url = String(value || "").trim();
    if (/^https?:\/\//i.test(url) || /^\/?(uploads|pyq-files)\//i.test(url)) {
        return escapeHtml(url);
    }
    return "#";
}

function isHostedPyqDeploy() {
    const host = String(window.location.hostname || "").toLowerCase();
    return host.endsWith(".vercel.app") || host.includes("devtunnels.ms");
}

function resolvePyqAssetUrl(value, record = null) {
    const url = String(value || "").trim();

    if (!/^\/?(uploads|pyq-files)\//i.test(url)) return url;
    const path = url.startsWith("/") ? url : `/${url}`;
    return `${window.location.origin}${path}`;
}

function isLocalPyqAssetUrl(value) {
    const url = String(value || "").trim();
    return /^\/?(uploads|pyq-files)\//i.test(url)
        || url.startsWith(`${window.location.origin}/uploads/`)
        || url.startsWith(`${window.location.origin}/pyq-files/`);
}

function resolvePyqViewerUrl(id, fallbackUrl) {
    const directUrl = resolvePyqAssetUrl(fallbackUrl);
    if (isLocalPyqAssetUrl(fallbackUrl) || isLocalPyqAssetUrl(directUrl)) return directUrl;
    if (id) return `${window.location.origin}/api/pyq/${encodeURIComponent(id)}/download`;
    const record = staticPyqContent.find((item) => String(item.id) === String(id));
    return resolvePyqAssetUrl(fallbackUrl, record);
}

function resolvePyqDownloadUrl(id, fallbackUrl) {
    const directUrl = resolvePyqAssetUrl(fallbackUrl);
    if (isLocalPyqAssetUrl(fallbackUrl) || isLocalPyqAssetUrl(directUrl)) return directUrl;
    if (id) return `${window.location.origin}/api/pyq/${encodeURIComponent(id)}/download?download=1`;
    const record = staticPyqContent.find((item) => String(item.id) === String(id));
    return resolvePyqAssetUrl(fallbackUrl, record);
}

function debounce(callback, delay = 120) {
    let timer = 0;
    return (...args) => {
        window.clearTimeout(timer);
        timer = window.setTimeout(() => callback(...args), delay);
    };
}

function withFastTimeout(promise, timeoutMs, message) {
    let timer = 0;
    const timeout = new Promise((_, reject) => {
        timer = window.setTimeout(() => reject(new Error(message)), timeoutMs);
    });
    return Promise.race([promise, timeout]).finally(() => window.clearTimeout(timer));
}

function normalizeAiToolRecord(tool, index = 0) {
    if (Array.isArray(tool)) {
        const [name, description, icon, embedUrl, color, toolUrl] = tool;
        return {
            id: `default-${index}`,
            name,
            description,
            icon,
            embedUrl,
            toolUrl: toolUrl || embedUrl || "",
            color,
            category: "Study Assistant",
            isActive: true,
            isVisible: true,
            toolType: "workspace",
            promptPlaceholder: `Ask ${name} inside EngiLearn...`
        };
    }

    return {
        id: tool.id ?? `tool-${index}`,
        name: tool.name || "AI Tool",
        description: tool.description || "Use this AI tool inside EngiLearn.",
        icon: tool.icon || "fas fa-robot",
        embedUrl: tool.embedUrl || "",
        toolUrl: tool.toolUrl || tool.url || tool.embedUrl || "",
        color: tool.color || "#2563eb",
        category: tool.category || "Study Assistant",
        isActive: tool.isActive !== false && tool.status !== "Inactive",
        isVisible: tool.isVisible !== false,
        toolType: tool.toolType || "workspace",
        promptPlaceholder: tool.promptPlaceholder || `Ask ${tool.name || "this tool"} inside EngiLearn...`
    };
}

function getVisibleAiTools() {
    const source = aiTools;
    const normalized = source
        .map((tool, index) => normalizeAiToolRecord(tool, index))
        .filter((tool) => tool.name && tool.name !== "AI Tool");

    return normalized
        .sort((a, b) => {
            const aIndex = aiToolOrder.indexOf(a.name);
            const bIndex = aiToolOrder.indexOf(b.name);
            const aRank = aIndex === -1 ? Number.MAX_SAFE_INTEGER : aIndex;
            const bRank = bIndex === -1 ? Number.MAX_SAFE_INTEGER : bIndex;
            return aRank - bRank || String(a.name).localeCompare(String(b.name));
        });
}

function renderAiTools() {
    const grid = document.getElementById("aiToolsGrid");
    if (!grid) return;
    const tools = getVisibleAiTools();
    if (!tools.length) {
        grid.innerHTML = `
            <article class="ai-card ai-empty-card fade-in">
                <div class="ai-icon"><i class="fas fa-robot"></i></div>
                <span class="ai-tool-status">AI Tools</span>
                <h3>No AI tools available</h3>
                <p>Ask Main Admin to activate AI tools from AI Tool Management.</p>
            </article>
        `;
        window.engilearnVisibleAiTools = [];
        return;
    }

    grid.innerHTML = [
        ...tools.map((tool, index) => `
        <article class="ai-card ${normalizeText(tool.name).replace(/[^a-z0-9]+/g, "-")} fade-in">
            <div class="ai-icon"><i class="${escapeHtml(tool.icon)}"></i></div>
            <span class="ai-tool-status">${escapeHtml(tool.category)}${currentUserIsAdmin() && (!tool.isActive || !tool.isVisible) ? " / Admin only" : ""}</span>
            <h3>${escapeHtml(tool.name)}</h3>
            <p>${escapeHtml(tool.description)}</p>
            <a class="login-btn" href="${safeExternalUrl(getAiToolProviderUrl(tool))}" target="_blank" rel="noopener noreferrer"><i class="fas fa-up-right-from-square"></i> Open Tool</a>
        </article>
    `)
    ].join("");
    window.engilearnVisibleAiTools = tools;
}

function downloadNotepadText() {
    const text = document.getElementById("toolNotepad")?.value || "";
    const content = text.trim() || "EngiLearn quick notes";
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `engilearn-notes-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
}

function getAiToolFrameUrl(tool) {
    const url = String(tool?.embedUrl || "").trim();
    if (!/^https?:\/\//i.test(url)) return "";
    try {
        const frameUrl = new URL(url, window.location.origin);
        const sameSite = frameUrl.origin === window.location.origin;
        const trustedEmbeds = ["youtube.com", "www.youtube.com", "player.vimeo.com"];
        return sameSite || trustedEmbeds.some((host) => frameUrl.hostname.endsWith(host)) ? frameUrl.toString() : "";
    } catch (error) {
        return "";
    }
}

function getAiToolProviderUrl(tool) {
    const url = String(tool?.toolUrl || tool?.url || tool?.embedUrl || "").trim();
    if (!/^https?:\/\//i.test(url)) return "";
    return url;
}

function buildAiToolResponse(tool, prompt) {
    const text = String(prompt || "").trim();
    const category = String(tool?.category || "").toLowerCase();
    const toolName = tool?.name || "AI Tool";
    const topic = escapeHtml(text || "your study task");

    if (!text) {
        return `
            <strong>${escapeHtml(toolName)} is ready inside EngiLearn.</strong>
            <p>Type your question, code, formula, paragraph, or project idea, then click Run inside website.</p>
        `;
    }

    if (category.includes("coding") || category.includes("compiler")) {
        return `
            <strong>${escapeHtml(toolName)} coding workspace result</strong>
            <ol>
                <li>Understand the task: ${topic}</li>
                <li>Break it into input, process, output, and edge cases.</li>
                <li>Write or paste code in the prompt box, then use this panel to prepare debugging notes.</li>
                <li>Check syntax, sample input/output, time complexity, and common mistakes.</li>
            </ol>
            <p><strong>Next prompt:</strong> Explain the bug, give corrected code, and show a dry run.</p>
        `;
    }

    if (category.includes("math")) {
        return `
            <strong>${escapeHtml(toolName)} math workspace result</strong>
            <ol>
                <li>Given problem: ${topic}</li>
                <li>List known values, required value, and formula.</li>
                <li>Substitute values carefully with units.</li>
                <li>Write the final answer with one verification step.</li>
            </ol>
        `;
    }

    if (category.includes("writing")) {
        return `
            <strong>${escapeHtml(toolName)} writing workspace result</strong>
            <p><strong>Draft focus:</strong> ${topic}</p>
            <ol>
                <li>Make the sentence simpler and exam-ready.</li>
                <li>Keep the meaning unchanged.</li>
                <li>Use clear headings, short paragraphs, and keywords.</li>
            </ol>
        `;
    }

    if (category.includes("design")) {
        return `
            <strong>${escapeHtml(toolName)} design workspace result</strong>
            <ol>
                <li>Goal: ${topic}</li>
                <li>Use one clear title, 3 key points, and one visual focus.</li>
                <li>Keep colors readable and export as presentation/poster size.</li>
            </ol>
        `;
    }

    if (category.includes("research")) {
        return `
            <strong>${escapeHtml(toolName)} research workspace result</strong>
            <ol>
                <li>Research question: ${topic}</li>
                <li>Search for definitions, current examples, advantages, limitations, and applications.</li>
                <li>Compare at least 2 sources before writing final notes.</li>
                <li>Finish with a short summary and references list.</li>
            </ol>
        `;
    }

    return `
        <strong>${escapeHtml(toolName)} study workspace result</strong>
        <ol>
            <li>Question: ${topic}</li>
            <li>Explain the concept in simple words.</li>
            <li>Add one engineering example.</li>
            <li>Make 5 exam points and 3 viva questions.</li>
        </ol>
    `;
}

function openAiTool(index) {
    const tools = window.engilearnVisibleAiTools || getVisibleAiTools();
    const safeIndex = Number.isFinite(Number(index)) ? Number(index) : 0;
    const tool = tools[safeIndex] || tools[0];
    if (!tool) return;

    let modal = document.getElementById("aiToolModal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "aiToolModal";
        modal.className = "ai-tool-modal";
        modal.setAttribute("aria-hidden", "true");
        document.body.appendChild(modal);
    }

    const frameUrl = getAiToolFrameUrl(tool);
    const frame = frameUrl
        ? `<iframe src="${safeExternalUrl(frameUrl)}" title="${escapeHtml(tool.name)} inside EngiLearn" allow="clipboard-write; microphone; camera"></iframe>`
        : `<div class="ai-tool-fallback">
                <i class="${escapeHtml(tool.icon)}"></i>
                <strong>${escapeHtml(tool.name)}</strong>
                <span>Internal workspace mode is active. Type your prompt below and run it here without leaving EngiLearn.</span>
                <small>Some AI providers block direct website embedding, so EngiLearn keeps the prompt and output inside this secure panel.</small>
            </div>`;

    modal.innerHTML = `
        <div class="ai-tool-dialog" role="dialog" aria-modal="true" aria-label="${escapeHtml(tool.name)}">
            <div class="ai-tool-top">
                <div>
                    <span class="ai-tool-status">${escapeHtml(tool.category)}</span>
                    <h3>${escapeHtml(tool.name)}</h3>
                </div>
                <button class="video-icon-btn" id="aiToolCloseBtn" type="button" aria-label="Close AI tool"><i class="fas fa-xmark"></i></button>
            </div>
            <div class="ai-tool-frame">${frame}</div>
            <div class="ai-tool-prompt">
                <textarea id="aiToolPromptText" placeholder="${escapeHtml(tool.promptPlaceholder)}"></textarea>
                <button class="video-btn" id="runAiPromptBtn" type="button" data-ai-index="${safeIndex}"><i class="fas fa-wand-magic-sparkles"></i> Run inside website</button>
                <button class="video-btn secondary" id="copyAiPromptBtn" type="button"><i class="fas fa-copy"></i> Copy Prompt</button>
            </div>
            <div class="ai-tool-result" id="aiToolResult" aria-live="polite">${buildAiToolResponse(tool, "")}</div>
            <p class="video-meta">This workspace stays on EngiLearn. It does not redirect to any external website.</p>
        </div>
    `;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
}

function closeAiTool() {
    const modal = document.getElementById("aiToolModal");
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    modal.innerHTML = "";
    document.body.classList.remove("modal-open");
}

async function copyAiPrompt() {
    const text = document.getElementById("aiToolPromptText")?.value || "";
    if (!text.trim()) return;
    await navigator.clipboard?.writeText(text).catch(() => {});
}

function runAiPromptInsideWebsite() {
    const tools = window.engilearnVisibleAiTools || getVisibleAiTools();
    const index = Number(document.getElementById("runAiPromptBtn")?.dataset.aiIndex || 0);
    const tool = tools[index] || tools[0];
    const prompt = document.getElementById("aiToolPromptText")?.value || "";
    const result = document.getElementById("aiToolResult");
    if (!result || !tool) return;
    result.innerHTML = buildAiToolResponse(tool, prompt);
}

function initToolActions() {
    document.addEventListener("click", (event) => {
        const aiButton = event.target.closest(".ai-open-btn");
        if (aiButton) {
            openAiTool(aiButton.dataset.aiIndex);
            return;
        }

        if (event.target.closest("#aiToolCloseBtn") || event.target.id === "aiToolModal") {
            closeAiTool();
            return;
        }

        if (event.target.closest("#copyAiPromptBtn")) {
            copyAiPrompt();
            return;
        }

        if (event.target.closest("#runAiPromptBtn")) {
            runAiPromptInsideWebsite();
            return;
        }

        const promptButton = event.target.closest(".copy-prompt-template");
        if (promptButton) {
            navigator.clipboard?.writeText(promptButton.dataset.prompt || "").catch(() => {});
            promptButton.textContent = "Copied";
            setTimeout(() => {
                promptButton.innerHTML = `<i class="fas fa-copy"></i> Copy`;
            }, 1200);
            return;
        }

        if (event.target.closest("#downloadNotepadBtn")) {
            downloadNotepadText();
        }
    });
}

function renderBranches() {
    const grid = document.getElementById("branchesGrid");
    grid.innerHTML = branches.map(([id, rank, title, icon, bg]) => `
        <a class="branch-card branch-book-card fade-in" data-branch="${id}" href="pages/branch.html?branch=${encodeURIComponent(id)}" aria-label="Open ${escapeHtml(title)} branch page">
            <div class="branch-image" style="background:${bg}">
                <i class="${icon}"></i>
                <span class="rank">${rank}</span>
            </div>
            <div class="branch-content">
                <h3>${escapeHtml(title)}</h3>
                ${formatBranchBookSyllabus(id)}
            </div>
        </a>
    `).join("");
}

function getSortedBranchSemesterEntries(branchId) {
    return Object.entries(getBranchSubjects(branchId)).sort(([a], [b]) => {
        const left = Number(a);
        const right = Number(b);
        if (Number.isFinite(left) && Number.isFinite(right)) return left - right;
        return String(a).localeCompare(String(b), undefined, { numeric: true });
    });
}

function formatBranchBookSyllabus(branchId) {
    const entries = getSortedBranchSemesterEntries(branchId);
    const total = Math.max(entries.length, 1);
    const pages = entries.map(([semester, subjects], index) => {
        const safeSubjects = (Array.isArray(subjects) ? subjects : []).map((subject) => `
            <li>${escapeHtml(subject)}</li>
        `).join("");
        return `
            <section class="branch-book-page${index === 0 ? " active" : ""}" data-branch-book-page="${index}" ${index === 0 ? "" : "hidden"}>
                <div class="branch-book-page-head">
                    <span>Semester ${escapeHtml(semester)}</span>
                    <small>${subjects.length} subjects</small>
                </div>
                <ul class="branch-book-subjects">
                    ${safeSubjects || `<li>No subjects listed.</li>`}
                </ul>
                <div class="branch-book-page-foot">
                    <span>Page ${index + 1}</span>
                    <span>${total}</span>
                </div>
            </section>
        `;
    }).join("");

    const dots = entries.map(([, ,], index) => `
        <span class="branch-book-dot${index === 0 ? " active" : ""}" role="button" tabindex="0" aria-label="Open semester page ${index + 1}" data-branch-book-dot="${index}"></span>
    `).join("");

    return `
        <div class="branch-book" data-branch-book data-page="0" data-total="${total}">
            <div class="branch-book-pages">
                ${pages}
            </div>
            <div class="branch-book-controls" aria-label="Semester page controls">
                <span class="branch-book-turn" role="button" tabindex="0" aria-label="Previous semester page" data-branch-book-control="prev">
                    <i class="fas fa-chevron-left"></i>
                </span>
                <span class="branch-book-count"><b class="branch-book-current">1</b> / ${total}</span>
                <span class="branch-book-dots">${dots}</span>
                <span class="branch-book-turn" role="button" tabindex="0" aria-label="Next semester page" data-branch-book-control="next">
                    <i class="fas fa-chevron-right"></i>
                </span>
            </div>
        </div>
    `;
}

function setBranchBookPage(book, nextPage) {
    if (!book) return;
    const pages = Array.from(book.querySelectorAll("[data-branch-book-page]"));
    if (!pages.length) return;
    const total = pages.length;
    const normalized = ((Number(nextPage) % total) + total) % total;
    book.dataset.page = String(normalized);

    pages.forEach((page, index) => {
        const active = index === normalized;
        page.classList.toggle("active", active);
        page.hidden = !active;
    });

    book.querySelectorAll("[data-branch-book-dot]").forEach((dot) => {
        const active = Number(dot.dataset.branchBookDot) === normalized;
        dot.classList.toggle("active", active);
        dot.setAttribute("aria-pressed", active ? "true" : "false");
    });

    const current = book.querySelector(".branch-book-current");
    if (current) current.textContent = String(normalized + 1);
}

function activateBranchBookControl(target) {
    const book = target.closest("[data-branch-book]");
    if (!book) return;
    const current = Number(book.dataset.page || "0");
    const dot = target.closest("[data-branch-book-dot]");
    if (dot) {
        setBranchBookPage(book, Number(dot.dataset.branchBookDot || "0"));
        return;
    }

    const control = target.closest("[data-branch-book-control]");
    const direction = control?.dataset.branchBookControl === "prev" ? -1 : 1;
    setBranchBookPage(book, current + direction);
}

function initBranchBookCards() {
    const grid = document.getElementById("branchesGrid");
    if (!grid) return;
    grid.querySelectorAll("[data-branch-book]").forEach((book) => setBranchBookPage(book, Number(book.dataset.page || "0")));
    if (grid.dataset.branchBookReady === "true") return;
    grid.dataset.branchBookReady = "true";

    grid.addEventListener("click", (event) => {
        const target = event.target.closest("[data-branch-book-control], [data-branch-book-dot]");
        if (!target) return;
        event.preventDefault();
        event.stopPropagation();
        activateBranchBookControl(target);
    });

    grid.addEventListener("keydown", (event) => {
        if (!["Enter", " "].includes(event.key)) return;
        const target = event.target.closest("[data-branch-book-control], [data-branch-book-dot]");
        if (!target) return;
        event.preventDefault();
        event.stopPropagation();
        activateBranchBookControl(target);
    });
}


const promptTemplates = [
    ["Code Debug", "Act as my engineering coding mentor. Find the bug, explain the cause, and show the corrected code with comments."],
    ["Exam Notes", "Create concise exam notes for this topic with definitions, formulas, diagrams to draw, and likely 5-mark questions."],
    ["Project Idea", "Suggest a practical mini project for this branch and semester with modules, tools, database design, and demo flow."],
    ["Video Script", "Write a clear 5-minute lecture script with hook, concept explanation, example, recap, and quiz questions."],
    ["Diagram Help", "Explain this diagram step by step and list what I should label if I draw it in an exam."],
    ["Interview Prep", "Ask me 10 viva/interview questions on this topic, then check my answers one by one."]
];

function renderPrompts() {
    const grid = document.getElementById("promptGrid");
    if (!grid) return;
    const admin = currentUserIsAdmin();
    const sections = platformSettings.sections || {};
    const visibility = platformSettings.visibility || {};
    const promptSection = grid.closest("section");
    if ((sections.prompts === false || visibility.prompts === false) && !admin) {
        if (promptSection) promptSection.hidden = true;
        return;
    }
    if (promptSection) promptSection.hidden = false;
    grid.innerHTML = promptTemplates.map(([title, prompt]) => `
        <article class="prompt-card">
            <span class="ai-tool-status">Prompt</span>
            <h3>${escapeHtml(title)}</h3>
            <p>${escapeHtml(prompt)}</p>
            <button class="video-btn copy-prompt-template" type="button" data-prompt="${escapeHtml(prompt)}"><i class="fas fa-copy"></i> Copy</button>
        </article>
    `).join("");
}

const firstYearSetA = {
    "1": ["BT-101 - Engineering Chemistry", "BT-102 - Mathematics-I", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics"],
    "2": ["BT-201 - Engineering Physics", "BT-202 - Mathematics-II", "BT-203 - Basic Mechanical Engineering", "BT-204 - Basic Civil Engineering & Mechanics", "BT-205 - Basic Computer Engineering"]
};

const firstYearSetB = {
    "1": firstYearSetA["2"],
    "2": firstYearSetA["1"]
};

const setBBranches = new Set(["ece", "mech", "civil", "ai", "cyber", "auto", "production"]);

const rgpvBranchSyllabus = {
    "aero": {
        "1": [
            "BT-101 - Engineering Mathematics-I",
            "BT-102 - Engineering Chemistry",
            "BT-103 - English for Communication",
            "BT-104 - Basic Electrical & Electronics Engineering",
            "BT-105 - Engineering Graphics"
        ],
        "2": [
            "BT-201 - Engineering Mathematics-II",
            "BT-202 - Engineering Physics",
            "BT-203 - Basic Mechanical Engineering",
            "BT-204 - Basic Civil Engineering & Mechanics",
            "BT-205 - Basic Computer Engineering"
        ],
        "3": [
            "BT-301 - Mathematics-III",
            "AE-302 - Aerodynamics-I",
            "AE-303 - Aircraft Structures-I",
            "AE-304 - Aircraft Propulsion-I",
            "AE-305 - Engineering Thermodynamics"
        ],
        "4": [
            "BT-401 - Mathematics-IV",
            "AE-402 - Aerodynamics-II",
            "AE-403 - Aircraft Structures-II",
            "AE-404 - Aircraft Propulsion-II",
            "AE-405 - Flight Mechanics-I"
        ],
        "5": [
            "AE-501 - Aircraft Design-I",
            "AE-502 - Aircraft Systems & Instruments",
            "AE-503(A) - Gas Dynamics",
            "AE-503(B) - Helicopter Engineering",
            "AE-503(C) - Rocket Propulsion",
            "AE-504(A) - Aerospace Materials",
            "AE-504(B) - Space Technology",
            "AE-504(C) - Aircraft Production Technology"
        ],
        "6": [
            "AE-601 - Flight Mechanics-II",
            "AE-602 - Aircraft Design-II",
            "AE-603 - Aircraft Stability & Control",
            "AE-604(A) - Computational Fluid Dynamics",
            "AE-604(B) - Aircraft Maintenance Engineering",
            "AE-604(C) - Avionics"
        ],
        "7": [
            "AE-701 - Aerospace Vehicle Design",
            "AE-702 - Experimental Aerodynamics",
            "AE-703(A) - Finite Element Methods",
            "AE-703(B) - Unmanned Aerial Vehicles (UAV)",
            "AE-703(C) - Missile Technology",
            "AE-704 - Industrial Management & Entrepreneurship"
        ],
        "8": [
            "AE-801 - Advanced Aerospace Engineering",
            "AE-802 - Recent Trends in Aeronautical Engineering",
            "AE-803(A) - Aircraft Certification & Airworthiness",
            "AE-803(B) - Spacecraft Systems",
            "AE-803(C) - Advanced Avionics"
        ]
    },
    "ai": {
        "3": [
            "AL-301 - Technical Communication",
            "AL-302 - Introduction to Probability and Statistics",
            "AL-303 - Data Structures",
            "AL-304 - Artificial Intelligence",
            "AL-305 - Object Oriented Programming and Methodology"
        ],
        "4": [
            "AL-401 - Introduction to Discrete Structure and Linear Algebra",
            "AL-402 - Analysis and Design of Algorithms",
            "AL-403 - Software Engineering",
            "AL-404 - Computer Organization and Architecture",
            "AL-405 - Machine Learning"
        ]
    },
    "arch": {
        "1": [
            "AR-101 - Architectural Design-I",
            "AR-102 - Building Materials & Construction-I",
            "AR-103 - Architectural Graphics-I",
            "AR-104 - Theory of Structures-I",
            "AR-105 - History of Architecture-I"
        ],
        "2": [
            "AR-201 - Architectural Design-II",
            "AR-202 - Building Materials & Construction-II",
            "AR-203 - Architectural Graphics-II",
            "AR-204 - Theory of Structures-II",
            "AR-205 - History of Architecture-II"
        ],
        "3": [
            "AR-301 - Architectural Design-III",
            "AR-302 - Building Construction-III",
            "AR-303 - Climatology",
            "AR-304 - Theory of Structures-III",
            "AR-305 - History of Architecture-III"
        ],
        "4": [
            "AR-401 - Architectural Design-IV",
            "AR-402 - Building Construction-IV",
            "AR-403 - Building Services-I",
            "AR-404 - Theory of Structures-IV",
            "AR-405 - Estimation & Costing"
        ],
        "5": [
            "AR-501 - Architectural Design-V",
            "AR-502 - Building Services-II",
            "AR-503 - Landscape Architecture",
            "AR-504 - Specifications & Contracts",
            "AR-505 - Interior Design"
        ],
        "6": [
            "AR-601 - Architectural Design-VI",
            "AR-602 - Housing",
            "AR-603 - Urban Planning",
            "AR-604 - Quantity Surveying & Valuation",
            "AR-605 - Professional Practice-I"
        ],
        "7": [
            "AR-701 - Architectural Design-VII",
            "AR-702 - Town Planning",
            "AR-703 - Advanced Building Construction",
            "AR-704 - Building Management",
            "AR-705 - Professional Practice-II"
        ],
        "8": [
            "AR-801 - Architectural Design-VIII",
            "AR-802 - Environmental Planning",
            "AR-803 - Advanced Building Services",
            "AR-804 - Disaster Management",
            "AR-805 - Research Methodology"
        ]
    },
    "auto": {
        "1": [
            "BT-101 - Engineering Mathematics-I",
            "BT-102 - Engineering Chemistry",
            "BT-103 - English for Communication",
            "BT-104 - Basic Electrical & Electronics Engineering",
            "BT-105 - Engineering Graphics"
        ],
        "2": [
            "BT-201 - Engineering Mathematics-II",
            "BT-202 - Engineering Physics",
            "BT-203 - Basic Mechanical Engineering",
            "BT-204 - Basic Civil Engineering & Mechanics",
            "BT-205 - Basic Computer Engineering"
        ],
        "3": [
            "BT-301 - Mathematics-III",
            "AU-302 - Engineering Thermodynamics",
            "AU-303 - Strength of Materials",
            "AU-304 - Manufacturing Technology",
            "AU-305 - Automobile Engineering Materials"
        ],
        "4": [
            "BT-401 - Mathematics-IV",
            "AU-402 - Fluid Mechanics & Hydraulic Machines",
            "AU-403 - Theory of Machines",
            "AU-404 - Applied Thermodynamics",
            "AU-405 - Machine Drawing & Design"
        ],
        "5": [
            "AU-501 - Internal Combustion Engines",
            "AU-502 - Automobile Transmission",
            "AU-503(A) - Vehicle Body Engineering",
            "AU-503(B) - Tractor & Farm Machinery",
            "AU-503(C) - Vehicle Maintenance",
            "AU-504(A) - Automotive Electrical & Electronics",
            "AU-504(B) - Two & Three Wheeler Technology",
            "AU-504(C) - Automobile Air Conditioning"
        ],
        "6": [
            "AU-601 - Vehicle Dynamics",
            "AU-602 - Automobile Chassis Design",
            "AU-603 - Automobile Pollution & Control",
            "AU-604(A) - Automotive Safety",
            "AU-604(B) - Alternative Fuels & Energy Systems",
            "AU-604(C) - Automotive Aerodynamics"
        ],
        "7": [
            "AU-701 - Automotive Engine Management Systems",
            "AU-702 - Electric & Hybrid Vehicles",
            "AU-703(A) - Vehicle Testing & Homologation",
            "AU-703(B) - Transport Management",
            "AU-703(C) - Automotive Robotics",
            "AU-704 - Industrial Management & Entrepreneurship"
        ],
        "8": [
            "AU-801 - Automobile System Design",
            "AU-802 - Recent Trends in Automobile Engineering",
            "AU-803(A) - Advanced Automotive Electronics",
            "AU-803(B) - Intelligent Transportation Systems",
            "AU-803(C) - Automotive Mechatronics"
        ]
    },
    "bme": {
        "1": [
            "BT-101 - Engineering Mathematics-I",
            "BT-102 - Engineering Chemistry",
            "BT-103 - English for Communication",
            "BT-104 - Basic Electrical & Electronics Engineering",
            "BT-105 - Engineering Graphics"
        ],
        "2": [
            "BT-201 - Engineering Mathematics-II",
            "BT-202 - Engineering Physics",
            "BT-203 - Basic Mechanical Engineering",
            "BT-204 - Basic Civil Engineering & Mechanics",
            "BT-205 - Basic Computer Engineering"
        ],
        "3": [
            "BT-301 - Mathematics-III",
            "BM-302 - Human Anatomy & Physiology",
            "BM-303 - Biomedical Instrumentation",
            "BM-304 - Electronic Devices & Circuits",
            "BM-305 - Signals & Systems"
        ],
        "4": [
            "BT-401 - Mathematics-IV",
            "BM-402 - Medical Electronics",
            "BM-403 - Sensors & Transducers",
            "BM-404 - Digital Signal Processing",
            "BM-405 - Biomaterials"
        ],
        "5": [
            "BM-501 - Medical Imaging Systems",
            "BM-502 - Biomedical Signal Processing",
            "BM-503(A) - Artificial Organs",
            "BM-503(B) - Rehabilitation Engineering",
            "BM-503(C) - Bioinformatics",
            "BM-504(A) - Hospital Engineering",
            "BM-504(B) - Diagnostic & Therapeutic Equipment",
            "BM-504(C) - Biomedical Optics"
        ],
        "6": [
            "BM-601 - Biomechanics",
            "BM-602 - Medical Image Processing",
            "BM-603 - Biomedical Microprocessors",
            "BM-604(A) - Neural Engineering",
            "BM-604(B) - Embedded Systems for Biomedical Applications",
            "BM-604(C) - Telemedicine"
        ],
        "7": [
            "BM-701 - Biomedical Engineering Design",
            "BM-702 - Biomedical Instrumentation-II",
            "BM-703(A) - Tissue Engineering",
            "BM-703(B) - Clinical Engineering",
            "BM-703(C) - Nanotechnology in Medicine",
            "BM-704 - Industrial Management & Entrepreneurship"
        ],
        "8": [
            "BM-801 - Advanced Biomedical Engineering",
            "BM-802 - Recent Trends in Biomedical Engineering",
            "BM-803(A) - Medical Robotics",
            "BM-803(B) - Healthcare Technology Management",
            "BM-803(C) - Biomedical Data Analytics"
        ]
    },
    "chemical": {
        "1": [
            "BT-101 - Engineering Chemistry",
            "BT-102 - Mathematics-I",
            "BT-103 - English for Communication",
            "BT-104 - Basic Electrical & Electronics Engineering",
            "BT-105 - Engineering Graphics"
        ],
        "2": [
            "BT-201 - Engineering Physics",
            "BT-202 - Mathematics-II",
            "BT-203 - Basic Mechanical Engineering",
            "BT-204 - Basic Civil Engineering & Mechanics",
            "BT-205 - Basic Computer Engineering"
        ],
        "3": [
            "BT-301 - Mathematics-III",
            "CM-302 - Chemical Engineering Thermodynamics",
            "CM-303 - Advance Engineering Chemistry",
            "CM-304 - Material & Energy Balance",
            "CM-305 - Chemical Instrumentation"
        ],
        "4": [
            "BT-401 - Mathematics-III",
            "CM-402 - Fluid Mechanics",
            "CM-403 - Heat Transfer",
            "CM-404 - Mechanical Operations",
            "CM-405 - Chemical Engineering Process Calculations / Chemical Process Calculations*"
        ],
        "5": [
            "CM-501 - Mass Transfer-I",
            "CM-502 - Chemical Reaction Engineering-I",
            "CM-503(A) - Computation Methods in Chemical Engineering",
            "CM-503(B) - Pulp & Paper Technology",
            "CM-503(C) - Pharmaceutical Technology",
            "CM-504(A) - Organic Process Technology",
            "CM-504(B) - Fuel Cell Technology",
            "CM-504(C) - Energy Management"
        ],
        "6": [
            "CM-601 - Mass Transfer-II",
            "CM-602 - Chemical Reaction Engineering-II",
            "CM-603 - Process Dynamics & Control",
            "CM-604(A) - Polymer Technology",
            "CM-604(B) - Petrochemical Technology",
            "CM-604(C) - Fertilizer Technology",
            "CM-605(A) - Environmental Engineering",
            "CM-605(B) - Food Technology",
            "CM-605(C) - Safety & Hazard Management"
        ],
        "7": [
            "CM-701 - Process Equipment Design",
            "CM-702 - Chemical Process Industries",
            "CM-703(A) - Transport Phenomena",
            "CM-703(B) - Biochemical Engineering",
            "CM-703(C) - Corrosion Engineering",
            "CM-704(A) - Membrane Technology",
            "CM-704(B) - Nanotechnology",
            "CM-704(C) - Industrial Pollution Control"
        ],
        "8": [
            "CM-801(A) - Petroleum Refinery Engineering",
            "CM-801(B) - Process Plant Utilities",
            "CM-801(C) - Advanced Separation Processes",
            "CM-802(A) - Process Economics & Plant Design",
            "CM-802(B) - Energy Conservation in Process Industries",
            "CM-802(C) - Industrial Waste Management"
        ]
    },
    "civil": {
        "1": [
            "BT-101 - Engineering Chemistry",
            "BT-102 - Mathematics-I",
            "BT-103 - English for Communication",
            "BT-104 - Basic Electrical & Electronics Engineering",
            "BT-105 - Engineering Graphics"
        ],
        "2": [
            "BT-201 - Engineering Physics",
            "BT-202 - Mathematics-II",
            "BT-203 - Basic Mechanical Engineering",
            "BT-204 - Basic Civil Engineering & Mechanics",
            "BT-205 - Basic Computer Engineering"
        ],
        "3": [
            "CE-301 - Strength of Materials",
            "CE-302 - Building Materials",
            "CE-303 - Surveying",
            "CE-304 - Fluid Mechanics",
            "CE-305 - Engineering Geology",
            "CE-306 - Mathematics-III"
        ],
        "4": [
            "CE-401 - Structural Analysis",
            "CE-402 - Geotechnical Engineering-I",
            "CE-403 - Hydraulics",
            "CE-404 - Concrete Technology",
            "CE-405(A) - Building Planning & Architecture",
            "CE-405(B) - Engineering Geology",
            "CE-405(C) - Disaster Management"
        ],
        "5": [
            "CE-501 - Design of Reinforced Concrete Structures",
            "CE-502 - Design of Steel Structures",
            "CE-503 - Water Resources Engineering",
            "CE-504 - Transportation Engineering-I",
            "CE-505(A) - Environmental Engineering-I",
            "CE-505(B) - Advanced Surveying",
            "CE-505(C) - Construction Technology & Management"
        ],
        "6": [
            "CE-601 - Design of Prestressed Concrete Structures",
            "CE-602 - Environmental Engineering-II",
            "CE-603 - Transportation Engineering-II",
            "CE-604 - Estimation, Costing & Valuation",
            "CE-605(A) - Advanced Structural Analysis",
            "CE-605(B) - Ground Water Engineering",
            "CE-605(C) - Bridge Engineering"
        ],
        "7": [
            "CE-701 - Foundation Engineering",
            "CE-702 - Construction Planning & Management",
            "CE-703(A) - Earthquake Resistant Design",
            "CE-703(B) - Advanced Highway Engineering",
            "CE-703(C) - Remote Sensing & GIS",
            "CE-704(A) - Finite Element Method",
            "CE-704(B) - Pavement Design",
            "CE-704(C) - Solid & Hazardous Waste Management"
        ],
        "8": [
            "CE-801(A) - Advanced Reinforced Concrete Design",
            "CE-801(B) - Advanced Foundation Engineering",
            "CE-801(C) - Traffic Engineering & Management",
            "CE-802(A) - Repair & Rehabilitation of Structures",
            "CE-802(B) - Irrigation Engineering",
            "CE-802(C) - Environmental Impact Assessment"
        ]
    },
    "cse": {
        "3": [
            "ES-301 - Energy & Environmental Engineering",
            "CS-302 - Discrete Structure",
            "CS-303 - Data Structure",
            "CS-304 - Digital Systems",
            "CS-305 - Object Oriented Programming & Methodology"
        ],
        "4": [
            "BT-401 - Mathematics III",
            "CS-402 - Analysis & Design of Algorithms (ADA)",
            "CS-403 - Software Engineering",
            "CS-404 - Computer Organization & Architecture (COA)",
            "CS-405 - Operating Systems (OS)"
        ],
        "5": [
            "CS-501 - Theory of Computation (TOC)",
            "CS-502 - Database Management Systems (DBMS)",
            "CS-503(A) - Data Analytics",
            "CS-503(B) - Pattern Recognition",
            "CS-503(C) - Cyber Security",
            "CS-504(A) - Internet and Web Technology",
            "CS-504(B) - Object Oriented Programming",
            "CS-504(C) - Introduction to Database Management Systems"
        ],
        "6": [
            "CS-601 - Machine Learning",
            "CS-602 - Computer Networks",
            "CS-603(A) - Advanced Computer Architecture",
            "CS-603(B) - Computer Graphics & Visualization",
            "CS-603(C) - Compiler Design",
            "CS-604(A) - Knowledge Management",
            "CS-604(B) - Project Management",
            "CS-604(C) - Rural Technology & Community Development"
        ],
        "7": [
            "CS-701 - Software Architectures",
            "CS-702(A) - Computational Intelligence",
            "CS-702(B) - Deep & Reinforcement Learning",
            "CS-702(C) - Wireless & Mobile Computing",
            "CS-702(D) - Big Data",
            "CS-703(A) - Cryptography & Information Security",
            "CS-703(B) - Data Mining & Warehousing",
            "CS-703(C) - Agile Software Development",
            "CS-703(D) - Disaster Management"
        ],
        "8": [
            "CS-801 - Internet of Things (IoT)",
            "CS-802(A) - Blockchain Technologies",
            "CS-802(B) - Cloud Computing",
            "CS-802(C) - High Performance Computing",
            "CS-802(D) - Object Oriented Software Engineering",
            "CS-803(A) - Image Processing and Computer Vision",
            "CS-803(B) - Game Theory with Engineering Applications",
            "CS-803(C) - Internet of Things",
            "CS-803(D) - Managing Innovation and Entrepreneurship"
        ]
    },
    "cyber": {
        "1": [
            "BT-101 - Engineering Chemistry",
            "BT-102 - Mathematics-I",
            "BT-103 - English for Communication",
            "BT-104 - Basic Electrical & Electronics Engineering",
            "BT-105 - Engineering Graphics"
        ],
        "2": [
            "BT-201 - Engineering Physics",
            "BT-202 - Mathematics-II",
            "BT-203 - Basic Mechanical Engineering",
            "BT-204 - Basic Civil Engineering & Mechanics",
            "BT-205 - Basic Computer Engineering"
        ],
        "3": [
            "CY-301 - Technical Communication",
            "CY-302 - Discrete Structures",
            "CY-303 - Data Structures",
            "CY-304 - Digital Systems",
            "CY-305 - Object Oriented Programming & Methodology"
        ],
        "4": [
            "CY-401 - Mathematics - III",
            "CY-402 - Analysis & Design of Algorithms",
            "CY-403 - Computer Organization & Architecture",
            "CY-404 - Operating Systems",
            "CY-405 - Database Management Systems (DBMS)"
        ],
        "5": [
            "CY-501 - OS Internals for Security Support",
            "CY-502 - Design and Analysis of Algorithms",
            "CY-503 - Network Security",
            "CY-504 - (Elective)",
            "CY-504(A) - Cyber Law and Intellectual Property Rights",
            "CY-504(B) - Internet of Things",
            "CY-504(C) - Computer Organization and Architecture"
        ],
        "6": [
            "CY-601 - Cryptography and Network Security",
            "CY-602 - Computer Networks",
            "CY-603 - Departmental Elective",
            "CY-603(A) - Machine Learning",
            "CY-603(B) - Advanced Computer Architecture",
            "CY-603(C) - Compiler Design",
            "CY-604 - Open Elective",
            "CY-604(A) - Knowledge Management",
            "CY-604(B) - Project Management",
            "CY-604(C) - Rural Technology & Community Development"
        ],
        "7": [
            "CY-701 - Information Security Risk Management",
            "CY-702 - Digital Forensics",
            "CY-703 - (Departmental Elective",
            "CY-703(A) - Ethical Hacking",
            "CY-703(B) - Cyber Security Policies & Standards",
            "CY-703(C) - Data Engineering",
            "CY-703(D) - Cloud Computing"
        ],
        "8": [
            "CD-801 - Major Project / Internship Evaluation (no written theory paper)",
            "CD-802(A/B/C/D) - Departmental Elective (any one):",
            "CD-802(A) - Reinforcement Learning",
            "CD-802(B) - Project Management",
            "CD-802(C) - Computational Statistics",
            "CD-802(D) - Machine Learning for Data Science",
            "CD-803(A/B/C/D) - Open Elective (any one):",
            "CD-803(A) - Blockchain Technologies",
            "CD-803(B) - Time-Series Analysis",
            "CD-803(C) - Quantum Computing",
            "CD-803(D) - Human-Computer Interaction"
        ]
    },
    "ds": {
        "1": [
            "BT-101 - Engineering Chemistry",
            "BT-102 - Mathematics-I",
            "BT-103 - English for Communication",
            "BT-104 - Basic Electrical & Electronics Engineering",
            "BT-105 - Engineering Graphics"
        ],
        "2": [
            "BT-201 - Engineering Physics",
            "BT-202 - Mathematics-II",
            "BT-203 - Basic Mechanical Engineering",
            "BT-204 - Basic Civil Engineering & Mechanics",
            "BT-205 - Basic Computer Engineering"
        ],
        "3": [
            "BT-301 - Mathematics-III",
            "DS-302 - Data Structures",
            "DS-303 - Digital Systems",
            "DS-304 - Discrete Mathematics",
            "DS-305 - Object Oriented Programming & Methodology"
        ],
        "4": [
            "BT-401 - Mathematics-IV",
            "DS-402 - Design & Analysis of Algorithms",
            "DS-403 - Computer Organization & Architecture",
            "DS-404 - Database Management Systems",
            "DS-405 - Theory of Computation"
        ],
        "5": [
            "CD-501 - Computational Mathematics",
            "CD-502 - Compiler Design",
            "CD-503 - Cloud Computing",
            "CD-504 - Artificial Intelligence",
            "CD-505(A/B/C) - Departmental Elective (any one):",
            "CD-505(A) - Web Engineering",
            "CD-505(B) - Machine Learning",
            "CD-505(C) - Computational Intelligence"
        ],
        "6": [
            "CD-601 - Deep Learning",
            "CD-602 - Computer Networks",
            "CD-603(A/B/C) - Departmental Elective (any one):",
            "CD-603(A) - Big Data Analytics",
            "CD-603(B) - Data Acquisition",
            "CD-603(C) - Advanced Database Management System",
            "CD-604(A/B/C) - Open Elective (any one):",
            "CD-604(A) - Information Extraction and Retrieval",
            "CD-604(B) - Agile Software Development",
            "CD-604(C) - Natural Language Processing"
        ],
        "7": [
            "CD-701 - Data Engineering",
            "CD-702(A/B/C/D) - Departmental Elective (any one):",
            "CD-702(A) - Data Analytics & Visualization",
            "CD-702(B) - Internet of Things (IoT)",
            "CD-702(C) - Cloud Computing",
            "CD-702(D) - Blockchain Technology",
            "CD-703(A/B/C/D) - Open Elective (any one):",
            "CD-703(A) - Cryptography & Information Security",
            "CD-703(B) - Data Mining & Warehousing",
            "CD-703(C) - Agile Software Development",
            "CD-703(D) - Disaster Management",
            "CD-704(A/B/C/D) - Departmental Elective (any one):",
            "CD-704(A) - Advanced Statistics for Data Science",
            "CD-704(B) - Explainable AI",
            "CD-704(C) - Bioinformatics",
            "CD-704(D) - Business Intelligence & Analytics"
        ],
        "8": [
            "CD-801 - Major Project / Internship Evaluation (no written theory paper)",
            "CD-802(A/B/C/D) - Departmental Elective (any one):",
            "CD-802(A) - Reinforcement Learning",
            "CD-802(B) - Project Management",
            "CD-802(C) - Computational Statistics",
            "CD-802(D) - Machine Learning for Data Science",
            "CD-803(A/B/C/D) - Open Elective (any one):",
            "CD-803(A) - Blockchain Technologies",
            "CD-803(B) - Time-Series Analysis",
            "CD-803(C) - Quantum Computing",
            "CD-803(D) - Human-Computer Interaction"
        ]
    },
    "ece": {
        "1": [
            "BT-101 - Engineering Chemistry",
            "BT-102 - Mathematics-I",
            "BT-103 - English for Communication",
            "BT-104 - Basic Electrical & Electronics Engineering",
            "BT-105 - Engineering Graphics"
        ],
        "2": [
            "BT-201 - Engineering Physics",
            "BT-202 - Mathematics-II",
            "BT-203 - Basic Mechanical Engineering",
            "BT-204 - Basic Civil Engineering & Mechanics",
            "BT-205 - Basic Computer Engineering"
        ],
        "3": [
            "BT-301 - Mathematics-III",
            "EC-302 - Electronic Measurement & Instrumentation",
            "EC-303 - Digital System Design",
            "EC-304 - Electronic Devices",
            "EC-305 - Network Analysis"
        ],
        "4": [
            "ES-401 - Energy & Environmental Engineering",
            "EC-402 - Signals & Systems",
            "EC-403 - Analog Communication",
            "EC-404 - Control System",
            "EC-405 - Analog Circuits"
        ],
        "5": [
            "EC-501 - Microprocessor & Its Applications",
            "EC-502 - Digital Communication",
            "EC-503(A/B/C) - Any one Departmental Elective",
            "EC-504(A/B/C) - Any one Open Elective"
        ],
        "6": [
            "EC-601 - Digital Signal Processing",
            "EC-602 - Computer Architecture & Organization",
            "EC-603(A/B/C) - Any one Departmental Elective",
            "EC-604(A/B/C) - Any one Open Elective"
        ],
        "7": [
            "EC-701 - VLSI Design",
            "EC-702(A/B/C) - Choose one Departmental Elective",
            "EC-703(A/B/C) - Choose one Open Elective"
        ],
        "8": [
            "EC-801 - Optical Fibre Communication",
            "EC-802(A/B/C) - Choose one Departmental Elective",
            "EC-803(A/B/C) - Choose one Open Elective"
        ]
    },
    "eee": {
        "1": [
            "BT-101 - Engineering Chemistry",
            "BT-102 - Mathematics-I",
            "BT-103 - English for Communication",
            "BT-104 - Basic Electrical & Electronics Engineering",
            "BT-105 - Engineering Graphics"
        ],
        "2": [
            "BT-201 - Engineering Physics",
            "BT-202 - Mathematics-II",
            "BT-203 - Basic Mechanical Engineering",
            "BT-204 - Basic Civil Engineering & Mechanics",
            "BT-205 - Basic Computer Engineering"
        ],
        "3": [
            "EE-301 - Electrical Measurements & Measuring Instruments",
            "EE-302 - Network Analysis",
            "EE-303 - Analog Electronics",
            "EE-304 - Electrical Machines - I",
            "EE-305 - Engineering Mathematics - III"
        ],
        "4": [
            "EE-401 - Power System - I",
            "EE-402 - Control Systems",
            "EE-403 - Digital Electronics",
            "EE-404 - Electrical Machines - II",
            "EE-405 - Engineering Mathematics - IV"
        ],
        "5": [
            "EE-501 - Power Electronics",
            "EE-502 - Power System - II",
            "EE-503 - Microprocessors & Microcontrollers",
            "EE-504 - Electrical Machine Design",
            "EE-505(A) - High Voltage Engineering",
            "EE-505(B) - Utilization of Electrical Energy",
            "EE-505(C) - Electrical & Hybrid Vehicles"
        ],
        "6": [
            "EE-601 - Power System Analysis",
            "EE-602 - Power System Protection",
            "EE-603 - Digital Signal Processing",
            "EE-604 - Switchgear & Protection",
            "EE-605(A) - Flexible AC Transmission Systems (FACTS)",
            "EE-605(B) - Renewable Energy Sources",
            "EE-605(C) - Industrial Drives & Control"
        ],
        "7": [
            "EE-701 - Power System Operation & Control",
            "EE-702 - Electrical Drives",
            "EE-703(A) - HVDC Transmission",
            "EE-703(B) - Energy Management & Auditing",
            "EE-703(C) - Smart Grid Technology",
            "EE-704 - Departmental Elective / Open Elective (as per RGPV scheme)"
        ],
        "8": [
            "EE-801(A) - Power Quality",
            "EE-801(B) - Embedded Systems",
            "EE-801(C) - Electric & Hybrid Vehicles",
            "EE-802(A) - Distribution System Engineering",
            "EE-802(B) - Artificial Intelligence Applications in Electrical Engineering",
            "EE-802(C) - Energy Conservation & Management"
        ]
    },
    "env": {
        "1": [
            "BT-101 - Engineering Mathematics-I",
            "BT-102 - Engineering Chemistry",
            "BT-103 - English for Communication",
            "BT-104 - Basic Electrical & Electronics Engineering",
            "BT-105 - Engineering Graphics"
        ],
        "2": [
            "BT-201 - Engineering Mathematics-II",
            "BT-202 - Engineering Physics",
            "BT-203 - Basic Mechanical Engineering",
            "BT-204 - Basic Civil Engineering & Mechanics",
            "BT-205 - Basic Computer Engineering"
        ],
        "3": [
            "BT-301 - Mathematics-III",
            "EV-302 - Environmental Chemistry",
            "EV-303 - Fluid Mechanics",
            "EV-304 - Engineering Geology",
            "EV-305 - Environmental Microbiology"
        ],
        "4": [
            "BT-401 - Mathematics-IV",
            "EV-402 - Water Supply Engineering",
            "EV-403 - Wastewater Engineering",
            "EV-404 - Air Pollution & Control",
            "EV-405 - Solid Waste Management"
        ],
        "5": [
            "EV-501 - Environmental Impact Assessment",
            "EV-502 - Industrial Waste Management",
            "EV-503(A) - Noise Pollution & Control",
            "EV-503(B) - Hazardous Waste Management",
            "EV-503(C) - Environmental Biotechnology",
            "EV-504(A) - Environmental Modeling",
            "EV-504(B) - Groundwater Engineering",
            "EV-504(C) - Renewable Energy Systems"
        ],
        "6": [
            "EV-601 - Water & Wastewater Treatment",
            "EV-602 - Environmental Management",
            "EV-603 - Remote Sensing & GIS",
            "EV-604(A) - Climate Change & Sustainable Development",
            "EV-604(B) - Industrial Safety & Environmental Engineering",
            "EV-604(C) - Environmental Laws & Policies"
        ],
        "7": [
            "EV-701 - Environmental Systems Engineering",
            "EV-702 - Resource Conservation & Recycling",
            "EV-703(A) - Green Building Technology",
            "EV-703(B) - Disaster Management",
            "EV-703(C) - Energy & Environment",
            "EV-704 - Industrial Management & Entrepreneurship"
        ],
        "8": [
            "EV-801 - Advanced Environmental Engineering",
            "EV-802 - Recent Trends in Environmental Engineering",
            "EV-803(A) - Sustainable Infrastructure",
            "EV-803(B) - Environmental Risk Assessment",
            "EV-803(C) - Cleaner Production Technology"
        ]
    },
    "food": {
        "1": [
            "BT-101 - Engineering Mathematics-I",
            "BT-102 - Engineering Chemistry",
            "BT-103 - English for Communication",
            "BT-104 - Basic Electrical & Electronics Engineering",
            "BT-105 - Engineering Graphics"
        ],
        "2": [
            "BT-201 - Engineering Mathematics-II",
            "BT-202 - Engineering Physics",
            "BT-203 - Basic Mechanical Engineering",
            "BT-204 - Basic Civil Engineering & Mechanics",
            "BT-205 - Basic Computer Engineering"
        ],
        "3": [
            "BT-301 - Mathematics-III",
            "FT-302 - Food Chemistry",
            "FT-303 - Food Microbiology",
            "FT-304 - Engineering Properties of Food",
            "FT-305 - Food Biochemistry"
        ],
        "4": [
            "BT-401 - Mathematics-IV",
            "FT-402 - Food Processing Technology-I",
            "FT-403 - Food Preservation Technology",
            "FT-404 - Heat & Mass Transfer",
            "FT-405 - Food Analysis & Instrumentation"
        ],
        "5": [
            "FT-501 - Food Processing Technology-II",
            "FT-502 - Dairy Technology",
            "FT-503(A) - Fruit & Vegetable Processing",
            "FT-503(B) - Cereal, Pulse & Oilseed Technology",
            "FT-503(C) - Meat, Fish & Poultry Processing",
            "FT-504(A) - Food Packaging Technology",
            "FT-504(B) - Food Plant Engineering",
            "FT-504(C) - Food Quality Assurance"
        ],
        "6": [
            "FT-601 - Food Process Engineering",
            "FT-602 - Food Safety & Standards",
            "FT-603 - Refrigeration & Cold Storage",
            "FT-604(A) - Functional Foods & Nutraceuticals",
            "FT-604(B) - Bakery & Confectionery Technology",
            "FT-604(C) - Beverage Technology"
        ],
        "7": [
            "FT-701 - Food Product Development",
            "FT-702 - Food Biotechnology",
            "FT-703(A) - Food Supply Chain Management",
            "FT-703(B) - Quality Management Systems",
            "FT-703(C) - Food Waste Management",
            "FT-704 - Industrial Management & Entrepreneurship"
        ],
        "8": [
            "FT-801 - Advanced Food Technology",
            "FT-802 - Recent Trends in Food Technology",
            "FT-803(A) - Food Nanotechnology",
            "FT-803(B) - Food Toxicology",
            "FT-803(C) - Food Business Management"
        ]
    },
    "instrumentation": {
        "1": [
            "BT-101 - Engineering Mathematics-I",
            "BT-102 - Engineering Chemistry",
            "BT-103 - English for Communication",
            "BT-104 - Basic Electrical & Electronics Engineering",
            "BT-105 - Engineering Graphics"
        ],
        "2": [
            "BT-201 - Engineering Mathematics-II",
            "BT-202 - Engineering Physics",
            "BT-203 - Basic Mechanical Engineering",
            "BT-204 - Basic Civil Engineering & Mechanics",
            "BT-205 - Basic Computer Engineering"
        ],
        "3": [
            "BT-301 - Mathematics-III",
            "IN-302 - Electrical Circuits & Networks",
            "IN-303 - Electronic Devices & Circuits",
            "IN-304 - Digital Electronics",
            "IN-305 - Sensors & Transducers"
        ],
        "4": [
            "BT-401 - Mathematics-IV",
            "IN-402 - Analog Electronics",
            "IN-403 - Industrial Instrumentation",
            "IN-404 - Control Systems",
            "IN-405 - Signals & Systems"
        ],
        "5": [
            "IN-501 - Process Control",
            "IN-502 - Microprocessors & Microcontrollers",
            "IN-503(A) - Biomedical Instrumentation",
            "IN-503(B) - Analytical Instrumentation",
            "IN-503(C) - Digital Signal Processing",
            "IN-504(A) - Industrial Automation",
            "IN-504(B) - PLC & SCADA",
            "IN-504(C) - Embedded Systems"
        ],
        "6": [
            "IN-601 - Advanced Process Control",
            "IN-602 - Computer Control of Processes",
            "IN-603 - Power Plant Instrumentation",
            "IN-604(A) - Robotics & Automation",
            "IN-604(B) - Optical Instrumentation",
            "IN-604(C) - Wireless Instrumentation"
        ],
        "7": [
            "IN-701 - Distributed Control Systems",
            "IN-702 - Industrial Safety & Instrumentation",
            "IN-703(A) - Virtual Instrumentation",
            "IN-703(B) - MEMS & Microsystems",
            "IN-703(C) - IoT for Instrumentation",
            "IN-704 - Industrial Management & Entrepreneurship"
        ],
        "8": [
            "IN-801 - Advanced Instrumentation Engineering",
            "IN-802 - Recent Trends in Instrumentation",
            "IN-803(A) - Smart Sensors & Measurement Systems",
            "IN-803(B) - Industrial IoT",
            "IN-803(C) - Artificial Intelligence in Instrumentation"
        ]
    },
    "iot": {
        "1": [
            "BT-101 - Engineering Mathematics-I",
            "BT-102 - Engineering Chemistry",
            "BT-103 - English for Communication",
            "BT-104 - Basic Electrical & Electronics Engineering",
            "BT-105 - Engineering Graphics"
        ],
        "2": [
            "BT-201 - Engineering Mathematics-II",
            "BT-202 - Engineering Physics",
            "BT-203 - Basic Mechanical Engineering",
            "BT-204 - Basic Civil Engineering & Mechanics",
            "BT-205 - Basic Computer Engineering"
        ],
        "3": [
            "BT-301 - Mathematics-III",
            "IE-302 - Digital Electronics",
            "IE-303 - Data Structures",
            "IE-304 - Computer Organization & Architecture",
            "IE-305 - Electronic Devices & Circuits"
        ],
        "4": [
            "BT-401 - Mathematics-IV",
            "IE-402 - Microprocessors & Microcontrollers",
            "IE-403 - Embedded Systems",
            "IE-404 - Operating Systems",
            "IE-405 - Computer Networks"
        ],
        "5": [
            "IE-501 - Internet of Things",
            "IE-502 - Wireless Sensor Networks",
            "IE-503(A) - ARM Processor Architecture",
            "IE-503(B) - Real Time Operating Systems",
            "IE-503(C) - FPGA Design",
            "IE-504(A) - Cloud Computing",
            "IE-504(B) - Cyber Security",
            "IE-504(C) - VLSI Design"
        ],
        "6": [
            "IE-601 - IoT System Design",
            "IE-602 - Embedded Linux",
            "IE-603 - Industrial IoT",
            "IE-604(A) - Edge Computing",
            "IE-604(B) - Machine Learning for IoT",
            "IE-604(C) - Robotics & Automation"
        ],
        "7": [
            "IE-701 - Advanced Embedded Systems",
            "IE-702 - IoT Security",
            "IE-703(A) - Smart Cities & Smart Infrastructure",
            "IE-703(B) - Automotive Embedded Systems",
            "IE-703(C) - Wearable Computing",
            "IE-704 - Entrepreneurship & Industrial Management"
        ],
        "8": [
            "IE-801 - Advanced IoT Applications",
            "IE-802 - Recent Trends in IoT & Embedded Systems",
            "IE-803(A) - AI for IoT",
            "IE-803(B) - Internet of Medical Things (IoMT)",
            "IE-803(C) - Advanced Embedded System Design"
        ]
    },
    "it": {
        "1": [
            "BT-101 - Engineering Chemistry",
            "BT-102 - Mathematics-I",
            "BT-103 - English for Communication",
            "BT-104 - Basic Electrical & Electronics Engineering",
            "BT-105 - Engineering Graphics"
        ],
        "2": [
            "BT-201 - Engineering Physics",
            "BT-202 - Mathematics-II",
            "BT-203 - Basic Mechanical Engineering",
            "BT-204 - Basic Civil Engineering & Mechanics",
            "BT-205 - Basic Computer Engineering"
        ],
        "3": [
            "ES-301 - Energy & Environmental Engineering",
            "IT-302 - Discrete Structure",
            "IT-303 - Data Structure",
            "IT-304 - Object Oriented Programming & Methodology",
            "IT-305 - Digital Circuits & System"
        ],
        "4": [
            "BT-401 - Mathematics-III",
            "IT-402 - Analysis & Design of Algorithm",
            "IT-403 - Software Engineering",
            "IT-404 - Computer Organization & Architecture",
            "IT-405 - Operating Systems"
        ],
        "5": [
            "IT-501 - Operating System",
            "IT-502 - Computer Network",
            "IT-503(A) - Theory of Computation (Departmental Elective)",
            "IT-503(B) - Microprocessor & Interfacing (Departmental Elective)",
            "IT-503(C) - Principles of Programming Languages (Departmental Elective)",
            "IT-504(A) - Artificial Intelligence (Open Elective)",
            "IT-504(B) - E-Commerce & Governance (Open Elective)",
            "IT-504(C) - Java Programming (Open Elective)"
        ],
        "6": [
            "IT-601 - Computer Graphics & Multimedia",
            "IT-602 - Wireless & Mobile Computing",
            "IT-603(A) - Compiler Design",
            "IT-603(B) - Data Mining",
            "IT-603(C) - Embedded Systems",
            "IT-604(A) - Intellectual Property Rights (IPR)",
            "IT-604(B) - Software Engineering",
            "IT-604(C) - Wireless Sensor Networks"
        ],
        "7": [
            "IT-701 - Soft Computing",
            "IT-702(A) - Cloud Computing",
            "IT-702(B) - Information Security",
            "IT-702(C) - Big Data Analytics",
            "IT-703(A) - Internet of Things (IoT)",
            "IT-703(B) - Blockchain Technology",
            "IT-703(C) - Cyber Security"
        ],
        "8": [
            "IT-801 - Major Project - Phase II",
            "IT-802 - Comprehensive Viva-Voce",
            "IT-803 - Seminar",
            "IT-804 - Industrial Training / Internship"
        ]
    },
    "marine": {
        "1": [
            "BT-101 - Engineering Mathematics-I",
            "BT-102 - Engineering Chemistry",
            "BT-103 - English for Communication",
            "BT-104 - Basic Electrical & Electronics Engineering",
            "BT-105 - Engineering Graphics"
        ],
        "2": [
            "BT-201 - Engineering Mathematics-II",
            "BT-202 - Engineering Physics",
            "BT-203 - Basic Mechanical Engineering",
            "BT-204 - Basic Civil Engineering & Mechanics",
            "BT-205 - Basic Computer Engineering"
        ],
        "3": [
            "BT-301 - Mathematics-III",
            "MR-302 - Applied Mechanics",
            "MR-303 - Engineering Thermodynamics",
            "MR-304 - Marine Engineering Drawing",
            "MR-305 - Electrical Technology"
        ],
        "4": [
            "BT-401 - Mathematics-IV",
            "MR-402 - Marine Boilers",
            "MR-403 - Marine Diesel Engines",
            "MR-404 - Fluid Mechanics & Hydraulic Machines",
            "MR-405 - Marine Electrical Technology"
        ],
        "5": [
            "MR-501 - Naval Architecture",
            "MR-502 - Marine Auxiliary Machinery",
            "MR-503(A) - Ship Construction",
            "MR-503(B) - Marine Heat Engines",
            "MR-503(C) - Marine Refrigeration & Air Conditioning",
            "MR-504(A) - Marine Automation",
            "MR-504(B) - Marine Pollution & Control",
            "MR-504(C) - Marine Materials"
        ],
        "6": [
            "MR-601 - Marine Power Plant",
            "MR-602 - Marine Control Systems",
            "MR-603 - Marine Electrical Machines",
            "MR-604(A) - Marine Safety & Regulations",
            "MR-604(B) - Ship Operation & Maintenance",
            "MR-604(C) - Offshore Engineering"
        ],
        "7": [
            "MR-701 - Advanced Marine Engineering",
            "MR-702 - Ship Design & Stability",
            "MR-703(A) - Port & Harbour Engineering",
            "MR-703(B) - Marine Renewable Energy",
            "MR-703(C) - Marine Robotics",
            "MR-704 - Industrial Management & Entrepreneurship"
        ],
        "8": [
            "MR-801 - Modern Marine Engineering",
            "MR-802 - Recent Trends in Marine Engineering",
            "MR-803(A) - LNG & Gas Carrier Technology",
            "MR-803(B) - Marine Energy Management",
            "MR-803(C) - Smart Ship Technology"
        ]
    },
    "mech": {
        "1": [
            "BT-101 - Engineering Chemistry",
            "BT-102 - Mathematics-I",
            "BT-103 - English for Communication",
            "BT-104 - Basic Electrical & Electronics Engineering",
            "BT-105 - Engineering Graphics"
        ],
        "2": [
            "BT-201 - Engineering Physics",
            "BT-202 - Mathematics-II",
            "BT-203 - Basic Mechanical Engineering",
            "BT-204 - Basic Civil Engineering & Mechanics",
            "BT-205 - Basic Computer Engineering"
        ],
        "3": [
            "ME-301 - Thermodynamics",
            "ME-302 - Material Science",
            "ME-303 - Strength of Materials",
            "ME-304 - Manufacturing Process",
            "ME-305 - Fluid Mechanics",
            "ME-306 - Energy & Environmental Engineering"
        ],
        "4": [
            "ME-401 - Theory of Machines",
            "ME-402 - Applied Thermodynamics",
            "ME-403 - Machine Drawing",
            "ME-404 - Manufacturing Technology",
            "ME-405 - Hydraulic Machines",
            "ME-406 - Numerical Methods & Computer Programming"
        ],
        "5": [
            "ME-501 - Design of Machine Elements",
            "ME-502 - Heat & Mass Transfer",
            "ME-503 - Dynamics of Machines",
            "ME-504 - Industrial Engineering & Management",
            "ME-505(A) - Refrigeration & Air Conditioning",
            "ME-505(B) - Automobile Engineering",
            "ME-505(C) - Mechatronics"
        ],
        "6": [
            "ME-601 - Machine Design",
            "ME-602 - Finite Element Methods",
            "ME-603 - Internal Combustion Engines",
            "ME-604 - Turbo Machines",
            "ME-605(A) - Operations Research",
            "ME-605(B) - Computer Integrated Manufacturing (CIM)",
            "ME-605(C) - Renewable Energy Sources"
        ],
        "7": [
            "ME-701 - Mechanical Vibrations",
            "ME-702 - CAD/CAM",
            "ME-703(A) - Advanced Manufacturing Technology",
            "ME-703(B) - Robotics",
            "ME-703(C) - Non-Conventional Manufacturing Process",
            "ME-704(A) - Power Plant Engineering",
            "ME-704(B) - Automobile Engineering-II",
            "ME-704(C) - Industrial Automation"
        ],
        "8": [
            "ME-801(A) - Computational Fluid Dynamics",
            "ME-801(B) - Advanced IC Engines",
            "ME-801(C) - Product Design & Development",
            "ME-802(A) - Total Quality Management",
            "ME-802(B) - Supply Chain Management",
            "ME-802(C) - Industrial Safety Engineering"
        ]
    },
    "mechatronics": {
        "1": [
            "BT-101 - Engineering Mathematics-I",
            "BT-102 - Engineering Chemistry",
            "BT-103 - English for Communication",
            "BT-104 - Basic Electrical & Electronics Engineering",
            "BT-105 - Engineering Graphics"
        ],
        "2": [
            "BT-201 - Engineering Mathematics-II",
            "BT-202 - Engineering Physics",
            "BT-203 - Basic Mechanical Engineering",
            "BT-204 - Basic Civil Engineering & Mechanics",
            "BT-205 - Basic Computer Engineering"
        ],
        "3": [
            "BT-301 - Mathematics-III",
            "MT-302 - Engineering Mechanics",
            "MT-303 - Strength of Materials",
            "MT-304 - Electrical Machines",
            "MT-305 - Electronic Devices & Circuits"
        ],
        "4": [
            "BT-401 - Mathematics-IV",
            "MT-402 - Theory of Machines",
            "MT-403 - Analog & Digital Electronics",
            "MT-404 - Microprocessors & Microcontrollers",
            "MT-405 - Fluid Power Engineering"
        ],
        "5": [
            "MT-501 - Mechatronics System Design",
            "MT-502 - Industrial Automation",
            "MT-503(A) - Robotics",
            "MT-503(B) - PLC & SCADA",
            "MT-503(C) - Sensors & Transducers",
            "MT-504(A) - Control Systems",
            "MT-504(B) - Embedded Systems",
            "MT-504(C) - Computer Integrated Manufacturing"
        ],
        "6": [
            "MT-601 - Robotics & Automation",
            "MT-602 - CNC Machines & Programming",
            "MT-603 - Industrial Drives",
            "MT-604(A) - Artificial Intelligence",
            "MT-604(B) - Machine Vision",
            "MT-604(C) - Internet of Things for Mechatronics"
        ],
        "7": [
            "MT-701 - Advanced Mechatronics",
            "MT-702 - Intelligent Manufacturing Systems",
            "MT-703(A) - Autonomous Robots",
            "MT-703(B) - Flexible Manufacturing Systems",
            "MT-703(C) - MEMS & Microsystems",
            "MT-704 - Entrepreneurship & Industrial Management"
        ],
        "8": [
            "MT-801 - Advanced Robotics",
            "MT-802 - Recent Trends in Mechatronics",
            "MT-803(A) - Human Robot Interaction",
            "MT-803(B) - Smart Manufacturing",
            "MT-803(C) - Advanced Control Engineering"
        ]
    },
    "metallurgy": {
        "1": [
            "BT-101 - Engineering Mathematics-I",
            "BT-102 - Engineering Chemistry",
            "BT-103 - English for Communication",
            "BT-104 - Basic Electrical & Electronics Engineering",
            "BT-105 - Engineering Graphics"
        ],
        "2": [
            "BT-201 - Engineering Mathematics-II",
            "BT-202 - Engineering Physics",
            "BT-203 - Basic Mechanical Engineering",
            "BT-204 - Basic Civil Engineering & Mechanics",
            "BT-205 - Basic Computer Engineering"
        ],
        "3": [
            "BT-301 - Mathematics-III",
            "ML-302 - Physical Metallurgy",
            "ML-303 - Engineering Thermodynamics",
            "ML-304 - Metallurgical Analysis",
            "ML-305 - Engineering Materials"
        ],
        "4": [
            "BT-401 - Mathematics-IV",
            "ML-402 - Mechanical Metallurgy",
            "ML-403 - Extractive Metallurgy-I",
            "ML-404 - Phase Transformations",
            "ML-405 - Fuel, Furnace & Refractories"
        ],
        "5": [
            "ML-501 - Iron Making",
            "ML-502 - Steel Making",
            "ML-503(A) - Foundry Technology",
            "ML-503(B) - Welding Technology",
            "ML-503(C) - Powder Metallurgy",
            "ML-504(A) - Heat Treatment Technology",
            "ML-504(B) - Corrosion Engineering",
            "ML-504(C) - Non-Ferrous Metallurgy"
        ],
        "6": [
            "ML-601 - Extractive Metallurgy-II",
            "ML-602 - Mechanical Behaviour of Materials",
            "ML-603 - Materials Characterization",
            "ML-604(A) - Composite Materials",
            "ML-604(B) - Surface Engineering",
            "ML-604(C) - Nano Materials"
        ],
        "7": [
            "ML-701 - Advanced Physical Metallurgy",
            "ML-702 - Materials Processing",
            "ML-703(A) - Failure Analysis",
            "ML-703(B) - Industrial Metallurgy",
            "ML-703(C) - Advanced Materials",
            "ML-704 - Industrial Management & Entrepreneurship"
        ],
        "8": [
            "ML-801 - Modern Metallurgical Engineering",
            "ML-802 - Recent Trends in Metallurgy",
            "ML-803(A) - Biomaterials",
            "ML-803(B) - Energy Materials",
            "ML-803(C) - Materials Selection & Design"
        ]
    },
    "mining": {
        "1": [
            "BT-101 - Engineering Mathematics-I",
            "BT-102 - Engineering Chemistry",
            "BT-103 - English for Communication",
            "BT-104 - Basic Electrical & Electronics Engineering",
            "BT-105 - Engineering Graphics"
        ],
        "2": [
            "BT-201 - Engineering Mathematics-II",
            "BT-202 - Engineering Physics",
            "BT-203 - Basic Mechanical Engineering",
            "BT-204 - Basic Civil Engineering & Mechanics",
            "BT-205 - Basic Computer Engineering"
        ],
        "3": [
            "BT-301 - Mathematics-III",
            "MN-302 - Introduction to Mining Engineering",
            "MN-303 - Mine Surveying-I",
            "MN-304 - Mining Geology",
            "MN-305 - Rock Mechanics"
        ],
        "4": [
            "BT-401 - Mathematics-IV",
            "MN-402 - Surface Mining",
            "MN-403 - Underground Coal Mining",
            "MN-404 - Mine Surveying-II",
            "MN-405 - Mine Ventilation"
        ],
        "5": [
            "MN-501 - Mine Environmental Engineering",
            "MN-502 - Mine Machinery",
            "MN-503(A) - Drilling & Blasting",
            "MN-503(B) - Mineral Processing",
            "MN-503(C) - Mine Safety Engineering",
            "MN-504(A) - Underground Metal Mining",
            "MN-504(B) - Mine Management",
            "MN-504(C) - Tunnelling Engineering"
        ],
        "6": [
            "MN-601 - Mine Planning & Design",
            "MN-602 - Mine Economics",
            "MN-603 - Mine Transportation",
            "MN-604(A) - Rock Excavation Engineering",
            "MN-604(B) - Advanced Mine Ventilation",
            "MN-604(C) - Geo-Mechanics"
        ],
        "7": [
            "MN-701 - Mine Systems Engineering",
            "MN-702 - Mine Legislation",
            "MN-703(A) - Computer Applications in Mining",
            "MN-703(B) - Mine Automation",
            "MN-703(C) - Remote Sensing & GIS in Mining",
            "MN-704 - Industrial Management & Entrepreneurship"
        ],
        "8": [
            "MN-801 - Advanced Mining Engineering",
            "MN-802 - Recent Trends in Mining Engineering",
            "MN-803(A) - Sustainable Mining",
            "MN-803(B) - Mine Disaster Management",
            "MN-803(C) - Advanced Mineral Exploration"
        ]
    },
    "nano": {
        "1": [
            "BT-101 - Engineering Mathematics-I",
            "BT-102 - Engineering Chemistry",
            "BT-103 - English for Communication",
            "BT-104 - Basic Electrical & Electronics Engineering",
            "BT-105 - Engineering Graphics"
        ],
        "2": [
            "BT-201 - Engineering Mathematics-II",
            "BT-202 - Engineering Physics",
            "BT-203 - Basic Mechanical Engineering",
            "BT-204 - Basic Civil Engineering & Mechanics",
            "BT-205 - Basic Computer Engineering"
        ],
        "3": [
            "BT-301 - Mathematics-III",
            "NT-302 - Introduction to Nanotechnology",
            "NT-303 - Solid State Physics",
            "NT-304 - Materials Science",
            "NT-305 - Engineering Chemistry for Nanotechnology"
        ],
        "4": [
            "BT-401 - Mathematics-IV",
            "NT-402 - Nano Materials",
            "NT-403 - Quantum Mechanics",
            "NT-404 - Nano Fabrication Techniques",
            "NT-405 - Nano Characterization Techniques"
        ],
        "5": [
            "NT-501 - Nano Electronics",
            "NT-502 - Nano Biotechnology",
            "NT-503(A) - Carbon Nanomaterials",
            "NT-503(B) - Nano Photonics",
            "NT-503(C) - Nano Sensors",
            "NT-504(A) - Thin Film Technology",
            "NT-504(B) - MEMS & NEMS",
            "NT-504(C) - Computational Nanotechnology"
        ],
        "6": [
            "NT-601 - Nanocomposites",
            "NT-602 - Nano Device Engineering",
            "NT-603 - Nano Toxicology & Safety",
            "NT-604(A) - Biomedical Nanotechnology",
            "NT-604(B) - Energy Nanotechnology",
            "NT-604(C) - Polymer Nanotechnology"
        ],
        "7": [
            "NT-701 - Advanced Nanotechnology",
            "NT-702 - Nano Manufacturing",
            "NT-703(A) - Nano Medicine",
            "NT-703(B) - Environmental Nanotechnology",
            "NT-703(C) - Nano Robotics",
            "NT-704 - Industrial Management & Entrepreneurship"
        ],
        "8": [
            "NT-801 - Recent Trends in Nanotechnology",
            "NT-802 - Nanotechnology Applications",
            "NT-803(A) - Advanced Functional Nanomaterials",
            "NT-803(B) - Nano Energy Systems",
            "NT-803(C) - Nano Product Design"
        ]
    },
    "petroleum": {
        "1": [
            "BT-101 - Engineering Mathematics-I",
            "BT-102 - Engineering Chemistry",
            "BT-103 - English for Communication",
            "BT-104 - Basic Electrical & Electronics Engineering",
            "BT-105 - Engineering Graphics"
        ],
        "2": [
            "BT-201 - Engineering Mathematics-II",
            "BT-202 - Engineering Physics",
            "BT-203 - Basic Mechanical Engineering",
            "BT-204 - Basic Civil Engineering & Mechanics",
            "BT-205 - Basic Computer Engineering"
        ],
        "3": [
            "BT-301 - Mathematics-III",
            "PT-302 - Petroleum Geology",
            "PT-303 - Fluid Mechanics",
            "PT-304 - Engineering Thermodynamics",
            "PT-305 - Drilling Engineering-I"
        ],
        "4": [
            "BT-401 - Mathematics-IV",
            "PT-402 - Reservoir Engineering-I",
            "PT-403 - Drilling Engineering-II",
            "PT-404 - Well Logging & Formation Evaluation",
            "PT-405 - Petroleum Production Engineering-I"
        ],
        "5": [
            "PT-501 - Petroleum Production Engineering-II",
            "PT-502 - Reservoir Engineering-II",
            "PT-503(A) - Natural Gas Engineering",
            "PT-503(B) - Offshore Drilling Technology",
            "PT-503(C) - Petroleum Refining Technology",
            "PT-504(A) - Enhanced Oil Recovery",
            "PT-504(B) - Pipeline Engineering",
            "PT-504(C) - Petroleum Economics"
        ],
        "6": [
            "PT-601 - Reservoir Simulation",
            "PT-602 - Well Testing",
            "PT-603 - Petroleum Exploration",
            "PT-604(A) - Offshore Production Engineering",
            "PT-604(B) - Health, Safety & Environment in Petroleum Industry",
            "PT-604(C) - Unconventional Oil & Gas Resources"
        ],
        "7": [
            "PT-701 - Advanced Drilling Engineering",
            "PT-702 - Petroleum Reservoir Management",
            "PT-703(A) - LNG Technology",
            "PT-703(B) - Oil & Gas Processing",
            "PT-703(C) - Energy Engineering",
            "PT-704 - Industrial Management & Entrepreneurship"
        ],
        "8": [
            "PT-801 - Advanced Petroleum Engineering",
            "PT-802 - Recent Trends in Petroleum Engineering",
            "PT-803(A) - Deepwater Drilling Technology",
            "PT-803(B) - Carbon Capture & Storage",
            "PT-803(C) - Petroleum Asset Management"
        ]
    },
    "power": {
        "1": [
            "BT-101 - Engineering Mathematics-I",
            "BT-102 - Engineering Chemistry",
            "BT-103 - English for Communication",
            "BT-104 - Basic Electrical & Electronics Engineering",
            "BT-105 - Engineering Graphics"
        ],
        "2": [
            "BT-201 - Engineering Mathematics-II",
            "BT-202 - Engineering Physics",
            "BT-203 - Basic Mechanical Engineering",
            "BT-204 - Basic Civil Engineering & Mechanics",
            "BT-205 - Basic Computer Engineering"
        ],
        "3": [
            "BT-301 - Mathematics-III",
            "PE-302 - Network Analysis",
            "PE-303 - Electrical Machines-I",
            "PE-304 - Electronic Devices & Circuits",
            "PE-305 - Digital Electronics"
        ],
        "4": [
            "BT-401 - Mathematics-IV",
            "PE-402 - Electrical Machines-II",
            "PE-403 - Analog Electronics",
            "PE-404 - Power Systems-I",
            "PE-405 - Control Systems"
        ],
        "5": [
            "PE-501 - Power Electronics",
            "PE-502 - Microprocessors & Microcontrollers",
            "PE-503(A) - Electrical Drives",
            "PE-503(B) - High Voltage Engineering",
            "PE-503(C) - Industrial Electronics",
            "PE-504(A) - Signals & Systems",
            "PE-504(B) - Renewable Energy Systems",
            "PE-504(C) - Embedded Systems"
        ],
        "6": [
            "PE-601 - Advanced Power Electronics",
            "PE-602 - Power System-II",
            "PE-603 - Digital Control Systems",
            "PE-604(A) - FACTS Devices",
            "PE-604(B) - Electric Drives & Control",
            "PE-604(C) - HVDC Transmission"
        ],
        "7": [
            "PE-701 - Power Quality",
            "PE-702 - Electric & Hybrid Vehicles",
            "PE-703(A) - Smart Grid",
            "PE-703(B) - Flexible AC Transmission Systems",
            "PE-703(C) - Power Semiconductor Devices",
            "PE-704 - Industrial Management & Entrepreneurship"
        ],
        "8": [
            "PE-801 - Advanced Electrical Drives",
            "PE-802 - Recent Trends in Power Electronics",
            "PE-803(A) - Renewable Energy Integration",
            "PE-803(B) - Energy Management Systems",
            "PE-803(C) - Industrial Automation"
        ]
    },
    "production": {
        "1": [
            "BT-101 - Engineering Mathematics-I",
            "BT-102 - Engineering Chemistry",
            "BT-103 - English for Communication",
            "BT-104 - Basic Electrical & Electronics Engineering",
            "BT-105 - Engineering Graphics"
        ],
        "2": [
            "BT-201 - Engineering Mathematics-II",
            "BT-202 - Engineering Physics",
            "BT-203 - Basic Mechanical Engineering",
            "BT-204 - Basic Civil Engineering & Mechanics",
            "BT-205 - Basic Computer Engineering"
        ],
        "3": [
            "BT-301 - Mathematics-III",
            "PR-302 - Manufacturing Process-I",
            "PR-303 - Strength of Materials",
            "PR-304 - Engineering Materials",
            "PR-305 - Metrology & Measurement"
        ],
        "4": [
            "BT-401 - Mathematics-IV",
            "PR-402 - Manufacturing Process-II",
            "PR-403 - Theory of Machines",
            "PR-404 - Machine Design-I",
            "PR-405 - Industrial Engineering"
        ],
        "5": [
            "PR-501 - Production Planning & Control",
            "PR-502 - Machine Tool Design",
            "PR-503(A) - Operations Research",
            "PR-503(B) - Quality Engineering",
            "PR-503(C) - Tool Engineering",
            "PR-504(A) - Heat Treatment Technology",
            "PR-504(B) - Non-Conventional Manufacturing Processes",
            "PR-504(C) - Automation in Manufacturing"
        ],
        "6": [
            "PR-601 - CAD/CAM",
            "PR-602 - Machine Design-II",
            "PR-603 - Metal Forming Technology",
            "PR-604(A) - Flexible Manufacturing Systems",
            "PR-604(B) - Robotics in Manufacturing",
            "PR-604(C) - Total Quality Management"
        ],
        "7": [
            "PR-701 - Production Management",
            "PR-702 - CIM (Computer Integrated Manufacturing)",
            "PR-703(A) - Supply Chain Management",
            "PR-703(B) - Lean Manufacturing",
            "PR-703(C) - Advanced Manufacturing Technology",
            "PR-704 - Entrepreneurship & Industrial Management"
        ],
        "8": [
            "PR-801 - Advanced Production Engineering",
            "PR-802 - Modern Manufacturing Systems",
            "PR-803(A) - Reliability Engineering",
            "PR-803(B) - Product Design & Development",
            "PR-803(C) - Six Sigma & Quality Systems"
        ]
    },
    "robotics": {
        "1": [
            "BT-101 - Engineering Mathematics-I",
            "BT-102 - Engineering Chemistry",
            "BT-103 - English for Communication",
            "BT-104 - Basic Electrical & Electronics Engineering",
            "BT-105 - Engineering Graphics"
        ],
        "2": [
            "BT-201 - Engineering Mathematics-II",
            "BT-202 - Engineering Physics",
            "BT-203 - Basic Mechanical Engineering",
            "BT-204 - Basic Civil Engineering & Mechanics",
            "BT-205 - Basic Computer Engineering"
        ],
        "3": [
            "BT-301 - Mathematics-III",
            "RB-302 - Engineering Mechanics",
            "RB-303 - Electronic Devices & Circuits",
            "RB-304 - Data Structures",
            "RB-305 - Digital Electronics"
        ],
        "4": [
            "BT-401 - Mathematics-IV",
            "RB-402 - Microprocessors & Microcontrollers",
            "RB-403 - Control Systems",
            "RB-404 - Sensors & Actuators",
            "RB-405 - Kinematics of Machines"
        ],
        "5": [
            "RB-501 - Robotics Engineering",
            "RB-502 - Embedded Systems",
            "RB-503(A) - Industrial Robotics",
            "RB-503(B) - Artificial Intelligence",
            "RB-503(C) - Machine Vision",
            "RB-504(A) - PLC & SCADA",
            "RB-504(B) - Mechatronics",
            "RB-504(C) - Computer Vision"
        ],
        "6": [
            "RB-601 - Robot Dynamics & Control",
            "RB-602 - Autonomous Mobile Robots",
            "RB-603 - Internet of Things",
            "RB-604(A) - Machine Learning",
            "RB-604(B) - Human Robot Interaction",
            "RB-604(C) - Industrial Automation"
        ],
        "7": [
            "RB-701 - Advanced Robotics",
            "RB-702 - Intelligent Robotic Systems",
            "RB-703(A) - Swarm Robotics",
            "RB-703(B) - Medical Robotics",
            "RB-703(C) - UAV & Drone Technology",
            "RB-704 - Industrial Management & Entrepreneurship"
        ],
        "8": [
            "RB-801 - Advanced Robot Design",
            "RB-802 - Recent Trends in Robotics Engineering",
            "RB-803(A) - Collaborative Robotics (Cobots)",
            "RB-803(B) - Robotic Process Automation (RPA)",
            "RB-803(C) - AI Applications in Robotics"
        ]
    },
    "textile": {
        "1": [
            "BT-101 - Engineering Mathematics-I",
            "BT-102 - Engineering Chemistry",
            "BT-103 - English for Communication",
            "BT-104 - Basic Electrical & Electronics Engineering",
            "BT-105 - Engineering Graphics"
        ],
        "2": [
            "BT-201 - Engineering Mathematics-II",
            "BT-202 - Engineering Physics",
            "BT-203 - Basic Mechanical Engineering",
            "BT-204 - Basic Civil Engineering & Mechanics",
            "BT-205 - Basic Computer Engineering"
        ],
        "3": [
            "BT-301 - Mathematics-III",
            "TT-302 - Fibre Science & Technology",
            "TT-303 - Yarn Manufacturing Technology-I",
            "TT-304 - Textile Testing",
            "TT-305 - Textile Raw Materials"
        ],
        "4": [
            "BT-401 - Mathematics-IV",
            "TT-402 - Yarn Manufacturing Technology-II",
            "TT-403 - Fabric Manufacturing Technology",
            "TT-404 - Textile Physics",
            "TT-405 - Textile Chemical Processing-I"
        ],
        "5": [
            "TT-501 - Textile Chemical Processing-II",
            "TT-502 - Knitting Technology",
            "TT-503(A) - Weaving Technology",
            "TT-503(B) - Nonwoven Technology",
            "TT-503(C) - Textile Machinery",
            "TT-504(A) - Garment Manufacturing Technology",
            "TT-504(B) - Textile Quality Control",
            "TT-504(C) - Technical Textiles"
        ],
        "6": [
            "TT-601 - Textile Design",
            "TT-602 - Textile Finishing",
            "TT-603 - Apparel Technology",
            "TT-604(A) - Textile Management",
            "TT-604(B) - Industrial Engineering in Textiles",
            "TT-604(C) - Computer Applications in Textiles"
        ],
        "7": [
            "TT-701 - Advanced Textile Technology",
            "TT-702 - Textile Engineering Economics",
            "TT-703(A) - Fashion Technology",
            "TT-703(B) - Textile Composite Materials",
            "TT-703(C) - Smart Textiles",
            "TT-704 - Industrial Management & Entrepreneurship"
        ],
        "8": [
            "TT-801 - Modern Textile Technology",
            "TT-802 - Recent Trends in Textile Engineering",
            "TT-803(A) - Sustainable Textile Technology",
            "TT-803(B) - Advanced Garment Engineering",
            "TT-803(C) - Technical & Functional Textiles"
        ]
    }
};

const genericBranchSubjects = {
    cse: ["ES-301 - Energy & Environmental Engineering", "CS-302 - Discrete Structure", "CS-303 - Data Structure", "CS-304 - Digital Systems", "CS-305 - Object Oriented Programming & Methodology", "BT-401 - Mathematics III"],
    it: ["BT-101 - Engineering Chemistry", "BT-102 - Mathematics-I", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics", "BT-201 - Engineering Physics"],
    ece: ["BT-101 - Engineering Chemistry", "BT-102 - Mathematics-I", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics", "BT-201 - Engineering Physics"],
    mech: ["BT-101 - Engineering Chemistry", "BT-102 - Mathematics-I", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics", "BT-201 - Engineering Physics"],
    civil: ["BT-101 - Engineering Chemistry", "BT-102 - Mathematics-I", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics", "BT-201 - Engineering Physics"],
    eee: ["BT-101 - Engineering Chemistry", "BT-102 - Mathematics-I", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics", "BT-201 - Engineering Physics"],
    ai: ["AL-401 - Introduction to Discrete Structure and Linear Algebra", "AL-402 - Analysis and Design of Algorithms", "AL-403 - Software Engineering", "AL-404 - Computer Organization and Architecture", "AL-405 - Machine Learning", "AL-304 - Artificial Intelligence"],
    ds: ["BT-101 - Engineering Chemistry", "BT-102 - Mathematics-I", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics", "BT-201 - Engineering Physics"],
    cyber: ["BT-101 - Engineering Chemistry", "BT-102 - Mathematics-I", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics", "BT-201 - Engineering Physics"],
    chemical: ["BT-101 - Engineering Chemistry", "BT-102 - Mathematics-I", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics", "BT-201 - Engineering Physics"],
    auto: ["BT-101 - Engineering Mathematics-I", "BT-102 - Engineering Chemistry", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics", "BT-201 - Engineering Mathematics-II"],
    production: ["BT-101 - Engineering Mathematics-I", "BT-102 - Engineering Chemistry", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics", "BT-201 - Engineering Mathematics-II"],
    aero: ["BT-101 - Engineering Mathematics-I", "BT-102 - Engineering Chemistry", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics", "BT-201 - Engineering Mathematics-II"],
    bme: ["BT-101 - Engineering Mathematics-I", "BT-102 - Engineering Chemistry", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics", "BT-201 - Engineering Mathematics-II"],
    iot: ["BT-101 - Engineering Mathematics-I", "BT-102 - Engineering Chemistry", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics", "BT-201 - Engineering Mathematics-II"],
    power: ["BT-101 - Engineering Mathematics-I", "BT-102 - Engineering Chemistry", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics", "BT-201 - Engineering Mathematics-II"],
    mechatronics: ["BT-101 - Engineering Mathematics-I", "BT-102 - Engineering Chemistry", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics", "BT-201 - Engineering Mathematics-II"],
    instrumentation: ["BT-101 - Engineering Mathematics-I", "BT-102 - Engineering Chemistry", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics", "BT-201 - Engineering Mathematics-II"],
    env: ["BT-101 - Engineering Mathematics-I", "BT-102 - Engineering Chemistry", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics", "BT-201 - Engineering Mathematics-II"],
    arch: ["AR-101 - Architectural Design-I", "AR-102 - Building Materials & Construction-I", "AR-103 - Architectural Graphics-I", "AR-104 - Theory of Structures-I", "AR-105 - History of Architecture-I", "AR-201 - Architectural Design-II"],
    metallurgy: ["BT-101 - Engineering Mathematics-I", "BT-102 - Engineering Chemistry", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics", "BT-201 - Engineering Mathematics-II"],
    mining: ["BT-101 - Engineering Mathematics-I", "BT-102 - Engineering Chemistry", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics", "BT-201 - Engineering Mathematics-II"],
    textile: ["BT-101 - Engineering Mathematics-I", "BT-102 - Engineering Chemistry", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics", "BT-201 - Engineering Mathematics-II"],
    petroleum: ["BT-101 - Engineering Mathematics-I", "BT-102 - Engineering Chemistry", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics", "BT-201 - Engineering Mathematics-II"],
    food: ["BT-101 - Engineering Mathematics-I", "BT-102 - Engineering Chemistry", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics", "BT-201 - Engineering Mathematics-II"],
    robotics: ["BT-101 - Engineering Mathematics-I", "BT-102 - Engineering Chemistry", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics", "BT-201 - Engineering Mathematics-II"],
    nano: ["BT-101 - Engineering Mathematics-I", "BT-102 - Engineering Chemistry", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics", "BT-201 - Engineering Mathematics-II"],
    marine: ["BT-101 - Engineering Mathematics-I", "BT-102 - Engineering Chemistry", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics", "BT-201 - Engineering Mathematics-II"]
};

function buildGenericSyllabus(subjects) {
    return {
        "3": ["Mathematics-III", subjects[0], subjects[1], "Engineering Mechanics", "Material Science", `${subjects[0]} Lab`, `${subjects[1]} Lab`, "Workshop / Practice Lab"],
        "4": [subjects[2], subjects[3], "Fluid Mechanics", "Electrical & Electronics Systems", "Numerical Methods", `${subjects[2]} Lab`, `${subjects[3]} Lab`, "Simulation Lab"],
        "5": [subjects[4], subjects[5], "Design & Analysis", "Instrumentation", "Management Science", `${subjects[4]} Lab`, `${subjects[5]} Lab`, "Design Lab"],
        "6": [`Advanced ${subjects[0]}`, "CAD / Modeling", "Quality & Reliability", "Open Elective-I", "Industrial Economics", "CAD Lab", "Advanced Lab", "Mini Project"],
        "7": ["Professional Elective-I", "Professional Elective-II", "Open Elective-II", "Seminar", "Major Project-I", "Industrial Training", "Comprehensive Viva-I"],
        "8": ["Professional Elective-III", "Professional Elective-IV", "Entrepreneurship", "Major Project-II", "Comprehensive Viva-II"]
    };
}

function getBranchSubjects(branchId) {
    const firstYear = setBBranches.has(branchId) ? firstYearSetB : firstYearSetA;
    const branchSyllabus = rgpvBranchSyllabus[branchId] || {};
    return engiCodedSubjectMap({ ...firstYear, ...branchSyllabus });
}

function getPyqBranchSlug(branchId) {
    return {
        mech: "me",
        civil: "ce",
        eee: "ee",
        ece: "ec"
    }[branchId] || branchId;
}

function getPyqSemesters(subjectGroups, selectedSemester) {
    if (selectedSemester !== "all") {
        return subjectGroups[selectedSemester] ? [selectedSemester] : [];
    }

    return Object.keys(subjectGroups).sort((a, b) => Number(a) - Number(b));
}

function getPyqBranchMatches(selectedBranch) {
    return branches.filter(([id]) => selectedBranch === "all" || id === selectedBranch);
}

function getVideoBranchOptions() {
    return [
        ["all", "", "All Branches (28)"],
        ...branches.map(([id, rank, title]) => [id, rank, `${rank} ${title}`])
    ];
}

function getVideoSemesters(branchId) {
    if (branchId !== "all") return Object.keys(getBranchSubjects(branchId));
    return ["1", "2", "3", "4", "5", "6", "7", "8"];
}

function getVideoSubjects(branchId, semester) {
    if (branchId !== "all") return getBranchSubjects(branchId)[semester] || [];
    const subjects = new Set();
    branches.forEach(([id]) => {
        (getBranchSubjects(id)[semester] || []).forEach((subject) => subjects.add(subject));
    });
    return Array.from(subjects).sort((a, b) => a.localeCompare(b));
}

function getPyqSubjectOptions(branchMatches, selectedSemester) {
    const subjects = new Set();

    branchMatches.forEach(([id]) => {
        const groups = getBranchSubjects(id);
        let semesters = getPyqSemesters(groups, selectedSemester);
        if (!semesters.length && selectedSemester !== "all") {
            semesters = Object.keys(groups).filter((semester) => semester.split("-").includes(String(selectedSemester)));
        }
        if (!semesters.length && selectedSemester !== "all") {
            semesters = Object.keys(groups);
        }
        semesters.forEach((semester) => {
            (groups[semester] || []).forEach((subject) => subjects.add(subject));
        });
    });

    return Array.from(subjects).sort((a, b) => a.localeCompare(b));
}

function fillPyqBranches() {
    const branchSelect = document.getElementById("pyqBranch");
    if (!branchSelect) return;

    branchSelect.innerHTML = [
        `<option value="all">All Branches</option>`,
        ...branches.map(([id, rank, title]) => `<option value="${escapeHtml(id)}">${escapeHtml(rank)} ${escapeHtml(title)}</option>`)
    ].join("");
}

function fillPyqSubjects() {
    const subjectSelect = document.getElementById("pyqSubject");
    if (!subjectSelect) return;

    const previous = subjectSelect.value || "all";
    const selectedBranch = document.getElementById("pyqBranch")?.value || "all";
    const semester = document.getElementById("pyqSemester")?.value || "all";
    const options = getPyqSubjectOptions(getPyqBranchMatches(selectedBranch), semester);

    subjectSelect.innerHTML = [
        `<option value="all">All Subjects & Codes (${options.length})</option>`,
        ...options.map((subject) => `<option value="${escapeHtml(subject)}">${escapeHtml(subject)}</option>`)
    ].join("");
    subjectSelect.value = options.includes(previous) ? previous : "all";
}

function buildPyqLinks(branchId, branchTitle, semester, subject, year) {
    const slug = getPyqBranchSlug(branchId);
    const branchUrl = `${pyqBase}-${slug}-question-papers.html`;
    const yearText = year === "all" ? "previous year" : year;
    const query = `RGPV ${branchTitle} semester ${semester} ${subject} ${yearText} question paper pdf download`;

    return {
        source: branchUrl,
        download: `https://www.google.com/search?q=${encodeURIComponent(query)}`
    };
}

function buildPyqLibraryUrl({ branch = "all", semester = "all", subject = "all", year = "all" } = {}) {
    const params = new URLSearchParams({ branch, semester, subject, year });
    return `pages/pyq.html?${params.toString()}`;
}

function getBackendPyqPapers() {
    return [...staticPyqContent, ...backendContent]
        .filter((item) => String(item.type || "").toLowerCase().includes("pyq"))
        .map((item) => ({
            id: item.id || "",
            title: item.title || item.subject || "Admin PYQ",
            branch: item.branch || "All Branches",
            branchId: item.branchId || "",
            branchIds: Array.isArray(item.branchIds) ? item.branchIds : [],
            semester: item.semester || "All",
            subject: item.subject || "General",
            subjectCode: item.subjectCode || "",
            year: item.year || "",
            session: item.session || "",
            topic: item.topic || "Uploaded by Content Admin",
            uploadedBy: item.importedBy || item.createdBy || "Content Admin",
            url: item.fileUrl || item.filePath || item.url || "#",
            tags: item.tags || []
        }));
}

function backendPyqMatchesBranch(paper, selectedBranch) {
    if (selectedBranch === "all") return true;
    const ids = Array.isArray(paper.branchIds) ? paper.branchIds.map((id) => String(id).trim().toLowerCase()) : [];
    if (ids.includes(selectedBranch)) return true;
    const branch = branches.find(([id]) => id === selectedBranch);
    const haystack = `${paper.branch} ${paper.branchId} ${ids.join(" ")}`.toLowerCase();
    return haystack.includes("all b.tech branches")
        || haystack.includes("all branches")
        || haystack.includes(selectedBranch)
        || (branch && haystack.includes(branch[2].toLowerCase()));
}

function buildPyqExportHtml(records) {
    const rows = records.map((record, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${escapeHtml(record.branch)}</td>
            <td>${escapeHtml(record.semester)}</td>
            <td>${escapeHtml(record.subject)}</td>
            <td>${escapeHtml(record.year)}</td>
            <td><a href="${safeExternalUrl(record.viewUrl)}" target="_blank" rel="noopener">View</a></td>
            <td><a href="${safeExternalUrl(record.downloadUrl)}" target="_blank" rel="noopener">Download</a></td>
        </tr>
    `).join("");

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EngiLearn PYQ Results</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 24px; color: #0f172a; }
        h1 { margin-bottom: 6px; }
        p { color: #64748b; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #e2e8f0; padding: 10px; text-align: left; }
        th { background: #f8fafc; }
        a { color: #2563eb; font-weight: 700; }
    </style>
</head>
<body>
    <h1>EngiLearn PYQ Results</h1>
    <p>${records.length} matching PYQ records. Use View or Download links to open papers.</p>
    <table>
        <thead>
            <tr><th>#</th><th>Branch</th><th>Semester</th><th>Subject</th><th>Year</th><th>View</th><th>Download</th></tr>
        </thead>
        <tbody>${rows}</tbody>
    </table>
</body>
</html>`;
}

function openPyqResultsPage() {
    if (!pyqExportRecords.length) return;
    const url = buildPyqLibraryUrl({
        branch: document.getElementById("pyqBranch")?.value || "all",
        semester: document.getElementById("pyqSemester")?.value || "all",
        subject: document.getElementById("pyqSubject")?.value || "all",
        year: document.getElementById("pyqYear")?.value || "all"
    });
    window.open(url, "_blank", "noopener,noreferrer");
}

function downloadPyqResults() {
    if (!pyqExportRecords.length) return;

    const html = buildPyqExportHtml(pyqExportRecords);
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const stamp = new Date().toISOString().slice(0, 10);

    link.href = url;
    link.download = `engilearn-pyq-results-${stamp}.html`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
}

function pyqRepeatedQuestionBank(subject) {
    const name = String(subject || "this subject").trim();
    const key = name.toLowerCase();
    const banks = [
        [["data structure", "algorithm", "dsa"], [
            "Explain arrays, linked lists, stacks, and queues with suitable applications.",
            "Construct and explain binary trees, traversal methods, and binary search trees.",
            "Explain graph representation, BFS, and DFS with an example.",
            "Compare sorting techniques and analyze their time complexity.",
            "Explain asymptotic notation and algorithm design strategies."
        ]],
        [["object oriented", "oop"], [
            "Explain classes, objects, constructors, and object-oriented principles.",
            "Differentiate inheritance, polymorphism, abstraction, and encapsulation.",
            "Explain exception handling with a suitable program example.",
            "Discuss interfaces, packages, and reusable component design.",
            "Design an object-oriented solution for a real-world problem."
        ]],
        [["database", "dbms"], [
            "Explain ER model and convert an ER diagram into relational tables.",
            "Explain normalization up to BCNF with a suitable example.",
            "Write SQL queries using joins, subqueries, grouping, and aggregate functions.",
            "Explain transactions, concurrency control, and recovery techniques.",
            "Compare indexing, hashing, and query optimization techniques."
        ]],
        [["operating system", " os"], [
            "Explain operating-system services, structure, and system calls.",
            "Compare CPU scheduling algorithms with an example.",
            "Explain process synchronization, semaphores, and critical-section problem.",
            "Explain deadlock prevention, avoidance, detection, and recovery.",
            "Compare paging, segmentation, virtual memory, and page replacement."
        ]],
        [["computer network", " cn", "communication"], [
            "Explain OSI and TCP/IP models with protocol responsibilities.",
            "Compare switching, routing, and addressing techniques.",
            "Explain error detection, flow control, and data-link protocols.",
            "Explain TCP, UDP, congestion control, and transport-layer services.",
            "Discuss application-layer protocols and network security basics."
        ]],
        [["mathematics", "math"], [
            "Solve a representative numerical problem from this unit.",
            "Derive the main theorem or formula and state its conditions.",
            "Apply the unit method to an engineering problem.",
            "Compare alternative solution methods with a worked example.",
            "Solve a previous-year style long-answer numerical problem."
        ]],
        [["electronic", "circuit", "electrical", "power"], [
            "Explain the main circuit or device characteristics with diagrams.",
            "Analyze the principal network using standard methods.",
            "Derive the important operating relation and solve a numerical problem.",
            "Compare major devices, configurations, or control techniques.",
            "Explain practical applications, protection, and performance considerations."
        ]]
    ];
    const match = banks.find(([keywords]) => keywords.some((keyword) => key.includes(keyword)));
    return match?.[1] || [
        `Explain the fundamental concepts and scope of ${name}.`,
        `Discuss the principal methods and techniques used in ${name}.`,
        `Solve a representative problem based on ${name}.`,
        `Compare important models, processes, or approaches in ${name}.`,
        `Explain applications, limitations, and recent developments in ${name}.`
    ];
}

function buildHomepageRepeatedQuestions(records, selectedBranch, semester, subject) {
    const groups = new Map();
    records.forEach((record) => {
        const sem = String(record.semester || "").replace(/^Sem\s*/i, "") || "All";
        const recordSubject = String(record.subject || record.title || "General").trim();
        const branch = String(record.branch || "All Branches").trim();
        if (semester !== "all" && sem !== semester) return;
        if (subject !== "all" && recordSubject !== subject) return;
        if (selectedBranch !== "all") {
            const branchInfo = branches.find(([id]) => id === selectedBranch);
            const branchText = `${branchInfo?.[2] || selectedBranch} ${selectedBranch}`.toLowerCase();
            const haystack = `${branch} ${recordSubject}`.toLowerCase();
            const branchMatch = haystack.includes(selectedBranch) || branchText.split(" ").some((part) => part.length > 3 && haystack.includes(part));
            if (!branchMatch) return;
        }
        const key = `${sem}|${recordSubject}`;
        if (!groups.has(key)) groups.set(key, { semester: sem, subject: recordSubject, branches: new Set(), years: new Set(), count: 0 });
        const group = groups.get(key);
        group.count += 1;
        group.branches.add(branch);
        if (record.year) group.years.add(String(record.year).replace(/[^\d]/g, ""));
    });

    const items = [...groups.values()].flatMap((group) => pyqRepeatedQuestionBank(group.subject).map((question, index) => {
        const unit = index + 1;
        const asked = Math.max(1, Math.round(group.count * (1 - index * 0.07)));
        const newest = [...group.years].filter(Boolean).sort((a, b) => Number(b) - Number(a))[0] || "All";
        return {
            question,
            unit,
            asked,
            subject: group.subject,
            semester: group.semester,
            branch: group.branches.size > 1 ? "All Branches" : [...group.branches][0],
            newest,
            score: asked * 10 + Number(newest === "All" ? 0 : newest) - index
        };
    })).filter((item) => pyqRepeatUnit === "all" || String(item.unit) === pyqRepeatUnit);

    items.sort((a, b) => {
        if (pyqRepeatSort === "papers") return b.asked - a.asked || b.score - a.score;
        if (pyqRepeatSort === "recent") return Number(b.newest || 0) - Number(a.newest || 0) || b.score - a.score;
        return b.score - a.score;
    });
    return items.slice(0, 6);
}

function buildHomepageRepeatedQuestionCard(records, selectedBranch, semester, subject) {
    const params = new URLSearchParams({ branch: selectedBranch, semester, subject });
    const url = `pages/repeated-questions.html?${params.toString()}`;
    const questions = buildHomepageRepeatedQuestions(records, selectedBranch, semester, subject).slice(0, 3);
    const selectedBranchName = selectedBranch === "all" ? "All Branches" : (branches.find(([id]) => id === selectedBranch)?.[2] || selectedBranch.toUpperCase());
    const selectedSemester = semester === "all" ? "All Semesters" : `Semester ${semester}`;
    const selectedSubject = subject === "all" ? "All Subjects" : subject;
    return `
        <article class="pyq-card pyq-repeat-home-card pyq-repeat-cta-card fade-in">
            <div class="pyq-repeat-cta-top">
                <span class="pyq-repeat-mini-icon"><i class="fas fa-bullseye"></i></span>
                <div>
                    <span class="pyq-kicker">Exam Focus</span>
                    <h3>Most Repeated Questions</h3>
                    <p>Unit-wise important questions from saved PYQ papers.</p>
                </div>
            </div>
            <div class="pyq-repeat-cta-stats">
                <span><strong>${escapeHtml(selectedBranchName)}</strong>Branch</span>
                <span><strong>${escapeHtml(selectedSemester)}</strong>Semester</span>
                <span><strong>${questions.length || records.length}</strong>Priorities</span>
            </div>
            <div class="pyq-repeat-cta-list">
                ${(questions.length ? questions : [{ question: `Open full repeated-question flow for ${selectedSubject}.`, asked: records.length || 0, unit: "All" }]).map((item) => `
                    <span><i class="fas fa-star"></i><strong>${escapeHtml(item.question)}</strong><small>Unit ${escapeHtml(item.unit)} - ${escapeHtml(item.asked)} papers</small></span>
                `).join("")}
            </div>
            <a class="pyq-btn pyq-repeat-all-btn" href="${escapeHtml(url)}" aria-label="Open all most repeated questions page"><i class="fas fa-bullseye"></i> Get All Repeated Questions</a>
        </article>
    `;
}

function getRepeatedQuestionCardIndex(grid, cardCount) {
    const columns = getComputedStyle(grid).gridTemplateColumns
        .split(" ")
        .filter(Boolean).length || 1;
    const secondRowSecondSlot = columns > 1 ? columns + 1 : 1;
    return Math.min(cardCount, secondRowSecondSlot);
}

function renderPyq() {
    const grid = document.getElementById("pyqGrid");
    if (!grid) return;

    const resultCount = document.getElementById("pyqResultCount");
    const loadMore = document.getElementById("pyqLoadMore");
    const openResults = document.getElementById("pyqOpenResults");
    const downloadResults = document.getElementById("pyqDownloadResults");
    const selectedBranch = document.getElementById("pyqBranch")?.value || "all";
    const semester = document.getElementById("pyqSemester")?.value || "all";
    const subject = document.getElementById("pyqSubject")?.value || "all";
    const year = document.getElementById("pyqYear")?.value || "all";
    const yearLabel = year === "all" ? "All Years" : year;
    const filtered = getPyqBranchMatches(selectedBranch);
    const catalogRecords = [];
    const catalogCards = filtered.flatMap(([id, rank, title, icon, bg], branchIndex) => {
        const subjectGroups = getBranchSubjects(id);
        const semesters = getPyqSemesters(subjectGroups, semester);

        return semesters.flatMap((sem) => {
            const subjects = (subjectGroups[sem] || []).filter((item) => subject === "all" || item === subject);

            return subjects.map((paperSubject, subjectIndex) => {
                const paperCount = Math.max(8, 72 - branchIndex * 2 - subjectIndex);
                const links = buildPyqLinks(id, title, sem, paperSubject, year);
                catalogRecords.push({
                    branch: title,
                    semester: `Sem ${sem}`,
                    subject: paperSubject,
                    year: yearLabel,
                    viewUrl: links.source,
                    downloadUrl: links.download
                });

                return `
            <article class="pyq-card pyq-paper-card fade-in" data-branch="${escapeHtml(id)}">
                <div class="pyq-paper-top">
                    <div class="pyq-image" style="background:${escapeHtml(bg)}">
                        <i class="${escapeHtml(icon)}"></i>
                    </div>
                    <div>
                        <span class="pyq-badge">${escapeHtml(rank)} â€¢ Sem ${escapeHtml(sem)}</span>
                        <h4>${escapeHtml(paperSubject)}</h4>
                        <p class="pyq-sems">${escapeHtml(title)} â€¢ ${escapeHtml(yearLabel)}</p>
                    </div>
                </div>
                <div class="pyq-subjects">RGPV ${escapeHtml(title)} Sem ${escapeHtml(sem)} previous year papers and solution references.</div>
                <div class="pyq-score-row">
                    <span><strong>${paperCount}+</strong> papers</span>
                    <span><strong>PDF</strong> ready</span>
                    <span><strong>RGPV</strong> source</span>
                </div>
                <div class="pyq-meta-list">
                    <span><i class="fas fa-building-columns"></i> ${escapeHtml(title)}</span>
                    <span><i class="fas fa-layer-group"></i> Semester ${escapeHtml(sem)}</span>
                    <span><i class="fas fa-calendar"></i> ${escapeHtml(yearLabel)}</span>
                </div>
                <div class="pyq-actions">
                    <a href="${escapeHtml(buildPyqLibraryUrl({ branch: id, semester: sem, subject: paperSubject, year }))}" target="_blank" rel="noopener noreferrer" class="pyq-btn"><i class="fas fa-eye"></i> Open</a>
                    <a href="${escapeHtml(buildPyqLibraryUrl({ branch: id, semester: sem, subject: paperSubject, year }))}" target="_blank" rel="noopener noreferrer" class="pyq-btn secondary"><i class="fas fa-table-list"></i> Library</a>
                </div>
            </article>
        `;
            });
        });
    });

    const backendRecords = [];
    const backendPapers = getBackendPyqPapers();
    const backendCards = backendPapers
        .filter((paper) => {
            const haystack = `${paper.branch} ${paper.title} ${paper.subject} ${paper.topic}`.toLowerCase();
            const branchMatch = backendPyqMatchesBranch(paper, selectedBranch);
            const semesterMatch = semester === "all" || String(paper.semester) === semester;
            const subjectMatch = subject === "all" || String(paper.subject) === subject;
            const yearMatch = year === "all" || String(paper.year) === year;
            return branchMatch && semesterMatch && subjectMatch && yearMatch;
        })
        .map((paper) => {
            const viewUrl = resolvePyqViewerUrl(paper.id, paper.url);
            const downloadUrl = resolvePyqDownloadUrl(paper.id, paper.url);
            backendRecords.push({
                branch: paper.branch,
                semester: `Sem ${paper.semester}`,
                subject: paper.subject,
                year: paper.year || yearLabel,
                viewUrl,
                downloadUrl
            });

            return `
            <article class="pyq-card pyq-paper-card uploaded fade-in">
                <div class="pyq-paper-top">
                    <div class="pyq-image" style="background:linear-gradient(135deg, #10b981, #2563eb)">
                        <i class="fas fa-file-pdf"></i>
                    </div>
                    <div>
                        <span class="pyq-badge">Content Admin Upload</span>
                        <h4>${escapeHtml(paper.title)}</h4>
                        <p class="pyq-sems">Sem ${escapeHtml(paper.semester)} â€¢ ${escapeHtml(paper.subject)}</p>
                    </div>
                </div>
                <div class="pyq-subjects">${escapeHtml(paper.topic)}</div>
                <div class="pyq-score-row">
                    <span><strong>Saved</strong> backend</span>
                    <span><strong>PDF</strong> resource</span>
                    <span><strong>${paper.tags.length || 0}</strong> tags</span>
                </div>
                <div class="pyq-meta-list">
                    <span><i class="fas fa-building-columns"></i> ${escapeHtml(paper.branch)}</span>
                    ${paper.tags.slice(0, 2).map((tag) => `<span><i class="fas fa-tag"></i> ${escapeHtml(tag)}</span>`).join("")}
                </div>
                <div class="pyq-actions">
                    <a href="${safeExternalUrl(viewUrl)}" target="_blank" rel="noopener noreferrer" data-raw-pdf="true" class="pyq-btn"><i class="fas fa-file-pdf"></i> Open PDF</a>
                    <a href="${safeExternalUrl(downloadUrl)}" download class="pyq-btn secondary"><i class="fas fa-download"></i> Download</a>
                </div>
            </article>
        `;
        });

    const usingBackendUploads = backendCards.length > 0;
    const allCards = usingBackendUploads ? backendCards : catalogCards;
    pyqExportRecords = usingBackendUploads ? backendRecords : catalogRecords;
    if (!allCards.length) {
        grid.innerHTML = `<div class="lms-empty">No PYQ papers match these filters.</div>`;
        if (resultCount) resultCount.textContent = "No PYQ records found";
        if (loadMore) loadMore.hidden = true;
        [openResults, downloadResults].forEach((button) => {
            if (button) button.hidden = true;
        });
        return;
    }
    const visibleCards = allCards.slice(0, pyqVisibleCount);
    const repeatedCard = buildHomepageRepeatedQuestionCard(pyqExportRecords, selectedBranch, semester, subject);
    const cardsWithRepeated = [...visibleCards];
    cardsWithRepeated.push(repeatedCard);

    grid.innerHTML = cardsWithRepeated.join("") || repeatedCard;
    const repeatBranch = grid.querySelector('[data-repeat-control="branch"]');
    const repeatSemester = grid.querySelector('[data-repeat-control="semester"]');
    const repeatSubject = grid.querySelector('[data-repeat-control="subject"]');
    const repeatUnit = grid.querySelector('[data-repeat-control="unit"]');
    const repeatSort = grid.querySelector('[data-repeat-control="sort"]');
    if (repeatBranch) repeatBranch.value = selectedBranch;
    if (repeatSemester) repeatSemester.value = semester;
    if (repeatSubject) repeatSubject.value = subject;
    if (repeatUnit) repeatUnit.value = pyqRepeatUnit;
    if (repeatSort) repeatSort.value = pyqRepeatSort;

    if (resultCount) {
        const shown = Math.min(pyqVisibleCount, allCards.length);
        resultCount.textContent = allCards.length
            ? `Showing ${shown} of ${allCards.length} PYQ records`
            : "No PYQ records found";
    }

    if (loadMore) {
        loadMore.hidden = pyqVisibleCount >= allCards.length;
        loadMore.textContent = `Load More (${Math.min(PYQ_PAGE_SIZE, Math.max(allCards.length - pyqVisibleCount, 0))})`;
    }

    [openResults, downloadResults].forEach((button) => {
        if (!button) return;
        button.hidden = !pyqExportRecords.length;
    });
}

function initPyqFilters() {
    fillPyqBranches();
    fillPyqSubjects();
    const debouncedPyqRender = debounce(() => {
        pyqVisibleCount = PYQ_PAGE_SIZE;
        renderPyq();
    }, 140);
    ["pyqBranch", "pyqSemester"].forEach((id) => {
        const control = document.getElementById(id);
        if (!control) return;
        control.addEventListener("input", () => {
            pyqVisibleCount = PYQ_PAGE_SIZE;
            fillPyqSubjects();
            renderPyq();
        });
        control.addEventListener("change", () => {
            pyqVisibleCount = PYQ_PAGE_SIZE;
            fillPyqSubjects();
            renderPyq();
        });
    });
    ["pyqSubject", "pyqYear"].forEach((id) => {
        const control = document.getElementById(id);
        if (!control) return;
        control.addEventListener("input", debouncedPyqRender);
        control.addEventListener("change", () => {
            pyqVisibleCount = PYQ_PAGE_SIZE;
            renderPyq();
        });
    });

    document.addEventListener("click", (event) => {
        if (event.target?.id === "pyqOpenResults") {
            openPyqResultsPage();
            return;
        }

        if (event.target?.id === "pyqDownloadResults") {
            downloadPyqResults();
            return;
        }

        if (event.target?.id !== "pyqLoadMore") return;
        pyqVisibleCount += PYQ_PAGE_SIZE;
        renderPyq();
    });
    document.addEventListener("change", (event) => {
        const control = event.target?.closest?.(".pyq-repeat-control");
        if (!control) return;
        const type = control.dataset.repeatControl;
        if (type === "unit") {
            pyqRepeatUnit = control.value;
            renderPyq();
            return;
        }
        if (type === "sort") {
            pyqRepeatSort = control.value;
            renderPyq();
            return;
        }
        if (type === "branch") {
            document.getElementById("pyqBranch").value = control.value;
            fillPyqSubjects();
        }
        if (type === "semester") {
            document.getElementById("pyqSemester").value = control.value;
            fillPyqSubjects();
        }
        if (type === "subject") document.getElementById("pyqSubject").value = control.value;
        pyqVisibleCount = PYQ_PAGE_SIZE;
        renderPyq();
    });
}
function initVideoLectures() {
    const branchSelect = document.getElementById("videoBranchSelect");
    const semesterSelect = document.getElementById("videoSemesterSelect");
    const subjectSelect = document.getElementById("videoSubjectSelect");
    const teacherSelect = document.getElementById("videoTeacherSelect");
    const searchInput = document.getElementById("videoSearchInput");

    if (!branchSelect || !semesterSelect || !subjectSelect) return;

    branchSelect.innerHTML = getVideoBranchOptions().map(([id, , title]) => (
        `<option value="${id}">${escapeHtml(title)}</option>`
    )).join("");

    branchSelect.addEventListener("change", () => {
        fillSemesters();
        if (teacherSelect) teacherSelect.value = "all";
        activeVideoIndex = 0;
        renderVideoLectures();
    });
    semesterSelect.addEventListener("change", () => {
        fillSubjects();
        if (teacherSelect) teacherSelect.value = "all";
        activeVideoIndex = 0;
        renderVideoLectures();
    });
    subjectSelect.addEventListener("change", () => {
        if (teacherSelect) teacherSelect.value = "all";
        activeVideoIndex = 0;
        renderVideoLectures();
    });
    teacherSelect?.addEventListener("change", () => {
        activeVideoIndex = 0;
        renderVideoLectures();
    });
    searchInput?.addEventListener("input", debounce(() => {
        activeVideoIndex = 0;
        renderVideoLectures();
    }, 140));
    document.addEventListener("click", (event) => {
        const watchButton = event.target.closest(".video-watch-btn");
        if (watchButton) {
            playVideoInPage(watchButton.dataset.videoIndex);
            return;
        }

        const sizeButton = event.target.closest("[data-video-size]");
        if (sizeButton) {
            setVideoPlayerSize(sizeButton.dataset.videoSize);
            return;
        }

        if (event.target.closest("#videoMuteBtn")) {
            toggleVideoMute();
            return;
        }

        if (event.target.closest("#videoCloseBtn") || event.target.id === "videoWatchModal") {
            closeVideoPlayer();
        }
    });

    fillSemesters();
    selectFirstUploadedLecture();
    renderVideoLectures();
}

function fillSemesters() {
    const branchId = document.getElementById("videoBranchSelect").value;
    const semesterSelect = document.getElementById("videoSemesterSelect");
    const semesters = getVideoSemesters(branchId);

    semesterSelect.innerHTML = semesters.map((semester) => (
        `<option value="${semester}">Sem ${semester}</option>`
    )).join("");
    fillSubjects();
}

function fillSubjects() {
    const branchId = document.getElementById("videoBranchSelect").value;
    const semester = document.getElementById("videoSemesterSelect").value;
    const subjectSelect = document.getElementById("videoSubjectSelect");
    const subjects = getVideoSubjects(branchId, semester);

    subjectSelect.innerHTML = subjects.map((subject) => (
        `<option value="${escapeHtml(subject)}">${escapeHtml(subject)}</option>`
    )).join("");
}

function findBranchIdByName(branchName) {
    const normalized = normalizeText(branchName);
    const match = branches.find(([id, , title]) => {
        const branchText = normalizeText(`${id} ${title}`);
        return normalized.includes(branchText) || branchText.includes(normalized) || branchText.split(" ").some((part) => normalized.includes(part) && part.length > 3);
    });
    return match?.[0] || "cse";
}

function selectFirstUploadedLecture() {
    if (!backendLectures.length) return;
    const lecture = backendLectures[0];
    const branchSelect = document.getElementById("videoBranchSelect");
    const semesterSelect = document.getElementById("videoSemesterSelect");
    const subjectSelect = document.getElementById("videoSubjectSelect");
    const branchId = findBranchIdByName(lecture.branch);

    if (branchSelect.querySelector(`option[value="${branchId}"]`)) {
        branchSelect.value = branchId;
        fillSemesters();
    }

    const semesterOption = [...semesterSelect.options].find((option) => semesterMatches(option.value, lecture.semester));
    if (semesterOption) {
        semesterSelect.value = semesterOption.value;
        fillSubjects();
    }

    const subjectOption = [...subjectSelect.options].find((option) => normalizeText(option.value) === normalizeText(lecture.subject));
    if (subjectOption) {
        subjectSelect.value = subjectOption.value;
    }
}

function renderVideoLectures() {
    const branchId = document.getElementById("videoBranchSelect").value;
    const semester = document.getElementById("videoSemesterSelect").value;
    const subject = document.getElementById("videoSubjectSelect").value;
    const grid = document.getElementById("videoGrid");
    const summary = document.getElementById("videoSummary");
    const teacherSelect = document.getElementById("videoTeacherSelect");
    const backendVideos = getBackendVideos(branchId, semester, subject);
    const fallbackVideos = getTeacherVideos(branchId, semester, subject);
    activeVideoCards = [...backendVideos, ...fallbackVideos];
    activeVideoIndex = Math.min(activeVideoIndex, Math.max(activeVideoCards.length - 1, 0));
    const cards = activeVideoCards.map((video, index) => renderTeacherVideoCard(video, index));
    const teachers = [...new Set(backendVideos.map((video) => video.teacher).filter(Boolean))];

    if (teacherSelect && teacherSelect.value === "all") {
        teacherSelect.innerHTML = `<option value="all">All Teachers</option>${teachers.map((teacher) => `<option value="${escapeHtml(teacher)}">${escapeHtml(teacher)}</option>`).join("")}`;
    }

    const subscription = platformSettings.subscription || {};
    const subscriptionCard = subscription.videos !== false ? `
        <article class="video-card video-subscription-card" role="link" tabindex="0" aria-label="Open Subscriber Video Library" onclick="window.location.href='pages/subscriber-videos.html'" onkeydown="if(event.key==='Enter'||event.key===' ') window.location.href='pages/subscriber-videos.html'">
            <span class="video-badge">Subscription</span>
            <div class="video-card-preview">
                <i class="fas fa-crown"></i>
                <strong>${escapeHtml(subscription.title || "Subscriber Video Library")}</strong>
                <span>All subscriber-ready lectures in one page</span>
            </div>
            <div class="video-content">
                <h3>${escapeHtml(subscription.title || "Subscriber Video Library")}</h3>
                <p>${escapeHtml(subscription.description || "Open premium and subscriber videos in the learning player.")}</p>
                <div class="video-actions">
                    <a class="video-btn" href="pages/subscriber-videos.html" onclick="event.stopPropagation()"><i class="fas fa-lock-open"></i> Open Subscriber Videos</a>
                </div>
            </div>
        </article>
    ` : "";
    grid.innerHTML = [subscriptionCard, ...cards].join("");
    if (summary) {
        summary.innerHTML = `
            <span><i class="fas fa-database"></i> ${backendVideos.length} uploaded lectures</span>
            <span><i class="fas fa-user-tie"></i> ${teachers.length || "Suggested"} teachers</span>
            <span><i class="fas fa-display"></i> Opens in website player</span>
            <span><i class="fas fa-file-lines"></i> Notes shown when uploaded by admin</span>
        `;
    }
}

function getVideoPlayerUrl(video) {
    const rawUrl = video?.embed || video?.open || "";
    if (!rawUrl) return "";

    try {
        const url = new URL(rawUrl, window.location.origin);
        if (url.hostname.includes("youtube.com") || url.hostname.includes("youtu.be")) {
            url.searchParams.set("rel", "0");
            url.searchParams.set("modestbranding", "1");
            url.searchParams.set("autoplay", "1");
            if (videoPlayerMuted) {
                url.searchParams.set("mute", "1");
            } else {
                url.searchParams.delete("mute");
            }
        }
        return url.toString();
    } catch (error) {
        return rawUrl;
    }
}

function isNativeVideoUrl(url) {
    return /\.(mp4|webm|ogg|mov)(\?|#|$)/i.test(String(url || ""));
}

function renderVideoModal(video) {
    const modal = document.getElementById("videoWatchModal");
    if (!modal || !video) return;

    const playerUrl = getVideoPlayerUrl(video);
    const player = isNativeVideoUrl(playerUrl)
        ? `<video src="${safeExternalUrl(playerUrl)}" controls autoplay playsinline ${videoPlayerMuted ? "muted" : ""}></video>`
        : playerUrl
            ? `<iframe src="${safeExternalUrl(playerUrl)}" title="${escapeHtml(video.title)}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`
            : `<div class="video-placeholder"><i class="fas fa-play-circle"></i><span>Video link not available</span></div>`;
    const notes = video.notes
        ? `<a class="video-btn secondary" href="${safeExternalUrl(video.notes)}" target="_blank" rel="noopener"><i class="fas fa-file-arrow-down"></i> Notes</a>`
        : "";

    modal.innerHTML = `
        <div class="video-watch-dialog ${escapeHtml(videoPlayerSize)}" role="dialog" aria-modal="true" aria-label="${escapeHtml(video.title)}">
            <div class="video-watch-top">
                <div>
                    <span class="video-badge inline">${video.source === "backend" ? "Admin Uploaded" : "Suggested Lecture"}</span>
                    <h3>${escapeHtml(video.title)}</h3>
                    <p class="video-meta">${escapeHtml(video.subject || "Subject")} | ${escapeHtml(video.chapter || "Lecture")} | ${escapeHtml(video.teacher)}</p>
                </div>
                <button class="video-icon-btn" id="videoCloseBtn" type="button" aria-label="Close video"><i class="fas fa-xmark"></i></button>
            </div>
            <div class="video-player-shell">${player}</div>
            <div class="video-watch-controls">
                <button class="video-btn ghost ${videoPlayerSize === "compact" ? "active" : ""}" type="button" data-video-size="compact"><i class="fas fa-compress"></i> Small</button>
                <button class="video-btn ghost ${videoPlayerSize === "wide" ? "active" : ""}" type="button" data-video-size="wide"><i class="fas fa-expand"></i> Large</button>
                <button class="video-btn ghost" id="videoMuteBtn" type="button"><i class="fas ${videoPlayerMuted ? "fa-volume-xmark" : "fa-volume-high"}"></i> ${videoPlayerMuted ? "Unmute" : "Mute"}</button>
                ${notes}
            </div>
            <p class="video-watch-description">${escapeHtml(video.description)}</p>
            <div class="video-lesson-stats">
                <span><strong>${Number(video.views || 0)}</strong> views</span>
                <span><strong>${escapeHtml(video.type || "video")}</strong> type</span>
                <span><strong>${video.notes ? "Yes" : "No"}</strong> notes</span>
            </div>
        </div>
    `;
}

function playVideoInPage(index) {
    activeVideoIndex = Number(index) || 0;
    renderVideoModal(activeVideoCards[activeVideoIndex]);
    document.querySelectorAll(".video-card").forEach((card, cardIndex) => {
        card.classList.toggle("active", cardIndex === activeVideoIndex);
    });
    const modal = document.getElementById("videoWatchModal");
    modal?.classList.add("open");
    modal?.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
}

function closeVideoPlayer() {
    const modal = document.getElementById("videoWatchModal");
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    modal.innerHTML = "";
    document.body.classList.remove("modal-open");
}

function setVideoPlayerSize(size) {
    videoPlayerSize = size === "compact" ? "compact" : "wide";
    renderVideoModal(activeVideoCards[activeVideoIndex]);
    document.getElementById("videoWatchModal")?.classList.add("open");
}

function toggleVideoMute() {
    videoPlayerMuted = !videoPlayerMuted;
    renderVideoModal(activeVideoCards[activeVideoIndex]);
    document.getElementById("videoWatchModal")?.classList.add("open");
}

function renderTeacherVideoCard(video, index) {
    const isUploaded = video.source === "backend";
    const notesButton = video.notes
        ? `<a class="video-btn secondary" href="${safeExternalUrl(video.notes)}" target="_blank" rel="noopener"><i class="fas fa-file-arrow-down"></i> Notes</a>`
        : "";
    const branchId = document.getElementById("videoBranchSelect")?.value || "cse";
    const semester = document.getElementById("videoSemesterSelect")?.value || "";
    const pageUrl = `pages/lecture.html?branch=${encodeURIComponent(branchId)}&semester=${encodeURIComponent(semester)}&subject=${encodeURIComponent(video.subject || "")}&video=${encodeURIComponent(index)}`;
    return `
        <article class="video-card ${index === activeVideoIndex ? "active" : ""}">
            <span class="video-badge">${isUploaded ? "Uploaded Lecture" : "Suggested Video"}</span>
            <div class="video-frame">
                <div class="video-card-preview">
                    <i class="fas fa-play-circle"></i>
                    <strong>Watch in website</strong>
                    <span>${escapeHtml(video.subject || "Lecture")}</span>
                </div>
            </div>
            <div class="video-content">
                <h3>${escapeHtml(video.title)}</h3>
                <p class="video-meta">${escapeHtml(video.subject || "Subject")} | ${escapeHtml(video.chapter || "Lecture")} | ${escapeHtml(video.teacher)}</p>
                <p>${escapeHtml(video.description)}</p>
                ${isUploaded ? `<p class="video-meta">${Number(video.views || 0)} views | ${escapeHtml(video.type || "video")}</p>` : ""}
                <div class="video-actions">
                    <button class="video-btn video-watch-btn" type="button" data-video-index="${index}"><i class="fas fa-play"></i> Watch Here</button>
                    <a class="video-btn" href="${pageUrl}"><i class="fas fa-up-right-from-square"></i> Open Lecture Page</a>
                    ${notesButton}
                </div>
            </div>
        </article>
    `;
}

function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
}

function initTheme() {
    const body = document.body;
    const toggle = document.getElementById("themeToggle");
    if (window.EngiLearnThemeEngine) {
        window.EngiLearnThemeEngine.bindModeToggles?.();
        return;
    }
    if (!toggle) return;
    const savedTheme = localStorage.getItem("engilearn_color_mode") || localStorage.getItem("theme") || "light";

    body.dataset.theme = savedTheme;
    if (savedTheme === "dark") {
        toggle.querySelector("i").classList.replace("fa-moon", "fa-sun");
    }

    toggle.addEventListener("click", () => {
        body.dataset.theme = body.dataset.theme === "dark" ? "light" : "dark";
        localStorage.setItem("theme", body.dataset.theme);
        localStorage.setItem("engilearn_color_mode", body.dataset.theme);
        localStorage.setItem("lms_theme", body.dataset.theme);
        toggle.querySelector("i").classList.toggle("fa-moon");
        toggle.querySelector("i").classList.toggle("fa-sun");
    });
}

function initPwa() {
    if ("serviceWorker" in navigator && location.protocol !== "file:") {
        const isLocal = ["localhost", "127.0.0.1", "::1"].includes(location.hostname);
        if (isLocal) {
            navigator.serviceWorker.getRegistrations?.()
                .then((registrations) => registrations.forEach((registration) => registration.unregister()))
                .catch(() => {});
            window.caches?.keys?.()
                .then((keys) => Promise.all(keys.filter((key) => key.startsWith("engilearn-")).map((key) => caches.delete(key))))
                .catch(() => {});
            return;
        }
        navigator.serviceWorker.register("sw.js").catch(() => {});
    }
}

function initContactForm() {
    const form = document.getElementById("contactForm");
    const status = document.getElementById("contactStatus");
    if (!form || !status) return;

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const payload = Object.fromEntries(new FormData(form));
        status.className = "contact-status wide";
        status.textContent = "Sending message...";

        try {
            if (window.EngiLearnAPI?.sendContact) {
                await EngiLearnAPI.sendContact(payload);
            } else {
                const host = window.location.hostname || "localhost";
                const isLocalHost = ["localhost", "127.0.0.1", "::1"].includes(host);
                const isDevTunnel = /\.devtunnels\.ms$/i.test(host);
                const tunnelBackendHost = isDevTunnel
                    ? host
                        .replace(/-5500(\.|$)/i, "-5021$1")
                        .replace(/-5501(\.|$)/i, "-5021$1")
                        .replace(/-5173(\.|$)/i, "-5021$1")
                        .replace(/-3000(\.|$)/i, "-5021$1")
                    : "";
                const tunnelBackendOrigin = tunnelBackendHost && (tunnelBackendHost !== host || /-5021(\.|$)/i.test(host))
                    ? `${window.location.protocol}//${tunnelBackendHost}`
                    : "";
                const apiBase = window.EngiLearnAPI?.baseURL
                    || (window.location.port === "5021"
                        ? `${window.location.origin}/api`
                        : tunnelBackendOrigin
                            ? `${tunnelBackendOrigin}/api`
                            : isLocalHost
                                ? `http://${host}:5021/api`
                                : `${window.location.origin}/api`);
                const response = await fetch(`${apiBase}/contact`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                });
                if (!response.ok) {
                    const data = await response.json().catch(() => ({}));
                    throw new Error(data.message || "Backend contact save failed");
                }
            }
            status.classList.add("success");
            status.textContent = "Message sent successfully. Our support team will reply from engilearn.edu@gmail.com.";
            form.reset();
        } catch (error) {
            const saved = JSON.parse(localStorage.getItem("contact_messages") || "[]");
            saved.push({ ...payload, id: Date.now(), createdAt: new Date().toISOString(), status: "Retry needed" });
            localStorage.setItem("contact_messages", JSON.stringify(saved));
            status.classList.add("error");
            status.textContent = "Message could not be sent right now. Please try again or email engilearn.edu@gmail.com.";
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    renderBranches();
    initBranchBookCards();
    renderAiTools();
    renderPrompts();
    applySectionVisibility();
    initVideoLectures();
    initPyqFilters();
    renderPyq();
    initContactForm();
    initTheme();
    initPwa();
    initToolActions();

    loadPublicContent().then(() => {
        renderAiTools();
        renderPrompts();
        applySectionVisibility();
        renderVideoLectures();
        renderPyq();
    }).catch((error) => console.warn("Public content refresh skipped:", error.message));
});
