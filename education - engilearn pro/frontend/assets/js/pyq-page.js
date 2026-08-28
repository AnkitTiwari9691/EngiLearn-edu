const pyqBranches = [
    ["cse", "Computer Science & Engg"], ["it", "Information Technology"], ["ece", "Electronics & Communication"],
    ["mech", "Mechanical Engineering"], ["civil", "Civil Engineering"], ["eee", "Electrical & Electronics"],
    ["ai", "AI & Machine Learning"], ["ds", "Data Science"], ["cyber", "Cyber Security"],
    ["chemical", "Chemical Engineering"], ["auto", "Automobile Engineering"], ["production", "Production Engineering"],
    ["aero", "Aeronautical Engineering"], ["bme", "Biomedical Engineering"], ["iot", "IoT & Embedded Systems"],
    ["mechatronics", "Mechatronics"], ["power", "Power Electronics"], ["instrumentation", "Instrumentation"],
    ["env", "Environmental Engineering"], ["arch", "Architecture"], ["metallurgy", "Metallurgical Engineering"],
    ["mining", "Mining Engineering"], ["textile", "Textile Technology"], ["petroleum", "Petroleum Engineering"],
    ["food", "Food Technology"], ["robotics", "Robotics Engineering"], ["nano", "Nanotechnology"],
    ["marine", "Marine Engineering"]
];
const pyqBranchLabels = new Map(pyqBranches);
const pyqBranchCodes = {
    cse: "CSE", it: "IT", ece: "ECE", mech: "ME", civil: "CIVIL", eee: "EEE",
    ai: "AI/ML", ds: "DS", cyber: "CYBER", chemical: "CHEM", auto: "AUTO",
    production: "PROD", aero: "AERO", bme: "BME", iot: "IOT", mechatronics: "MECH",
    power: "POWER", instrumentation: "INST", env: "ENV", arch: "ARCH", metallurgy: "METAL",
    mining: "MINING", textile: "TEXTILE", petroleum: "PETRO", food: "FOOD", robotics: "ROBOT",
    nano: "NANO", marine: "MARINE"
};
const pyqBranchOrder = new Map(pyqBranches.map(([id], index) => [id, index]));
const normalizeBranchKey = (value) => String(value || "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
const pyqBranchAliases = new Map(Object.entries({
    cse: "cse", cs: "cse", cd: "cse", csbs: "cse", csit: "cse", "computer science": "cse", "computer science engineering": "cse", "computer science engg": "cse", "computer science design": "cse", "computer science business systems": "cse", "computer science information technology": "cse",
    it: "it", "information technology": "it",
    ece: "ece", ec: "ece", "electronics communication": "ece", "electronics and communication": "ece",
    mech: "mech", me: "mech", "mechanical engineering": "mech",
    civil: "civil", ce: "civil", "civil engineering": "civil",
    eee: "eee", ee: "eee", "e all": "eee", "electrical electronics": "eee", "electrical and electronics": "eee", "electrical electronics group": "eee",
    ai: "ai", aiml: "ai", ad: "ai", aids: "ai", aiads: "ai", "ai ml": "ai", "artificial intelligence": "ai", "artificial intelligence data science": "ai", "artificial intelligence machine learning": "ai",
    ds: "ds", sd: "ds", "data science": "ds",
    cyber: "cyber", cy: "cyber", is: "cyber", "cyber security": "cyber", "information security": "cyber",
    chemical: "chemical", chem: "chemical", ch: "chemical", "chemical engineering": "chemical",
    auto: "auto", au: "auto", "automobile engineering": "auto",
    production: "production", prod: "production", "production engineering": "production",
    aero: "aero", "aeronautical engineering": "aero",
    bme: "bme", "biomedical engineering": "bme",
    iot: "iot", io: "iot", "cse iot": "iot", "internet of things": "iot", "iot embedded systems": "iot", "iot and embedded systems": "iot",
    mechatronics: "mechatronics", rm: "mechatronics", "mech mechatronics": "mechatronics", "robotics mechatronics": "mechatronics",
    power: "power", "power electronics": "power",
    instrumentation: "instrumentation", inst: "instrumentation",
    env: "env", environmental: "env", "environmental engineering": "env",
    arch: "arch", architecture: "arch",
    metallurgy: "metallurgy", metal: "metallurgy", mm: "metallurgy", "metallurgical engineering": "metallurgy", "metallurgy materials": "metallurgy",
    mining: "mining", mi: "mining", "mining engineering": "mining",
    textile: "textile", tx: "textile", "textile technology": "textile",
    petroleum: "petroleum", petro: "petroleum", "petroleum engineering": "petroleum",
    food: "food", ft: "food", "food technology": "food",
    robotics: "robotics", robot: "robotics", "robotics engineering": "robotics",
    nano: "nano", nanotechnology: "nano",
    marine: "marine", "marine engineering": "marine"
}).map(([key, value]) => [normalizeBranchKey(key), value]));
const pyqSourceBranchAliases = new Map(Object.entries({
    "3d animation graphics": "3dag", "3d animation and graphics": "3dag", "3dag": "3dag",
    ab: "ab", ad: "ad", aids: "ad", aiads: "ad", "artificial intelligence data science": "ad", "artificial intelligence and data science": "ad",
    ai: "ai", "artificial intelligence": "ai",
    aiml: "aiml", al: "aiml", "ai ml": "aiml", "artificial intelligence machine learning": "aiml", "artificial intelligence and machine learning": "aiml",
    auto: "auto", au: "auto", automobile: "auto", "automobile engineering": "auto",
    cd: "cd", "computer science design": "cd", "computer science and design": "cd",
    chemical: "chemical", chem: "chemical", ch: "chemical", "chemical engineering": "chemical",
    civil: "civil", ce: "civil", "civil engineering": "civil",
    csbs: "csbs", cb: "csbs", "computer science business systems": "csbs", "computer science and business systems": "csbs",
    cse: "cse", cs: "cse", "computer science engineering": "cse", "computer science and engineering": "cse", "computer science engg": "cse",
    "cse iot": "cse-iot", "cse-iot": "cse-iot", "computer science iot": "cse-iot", "computer science and iot": "cse-iot",
    csit: "csit", ct: "csit", "computer science information technology": "csit", "computer science and information technology": "csit",
    cy: "cy", cyber: "cy", "cyber security": "cy",
    "e all": "e-all", "e-all": "e-all", ee: "e-all", "electrical electronics": "e-all", "electrical and electronics": "e-all",
    ft: "ft", food: "ft", "food technology": "ft",
    io: "io", iot: "io", "internet of things": "io", "iot embedded systems": "io",
    is: "is", "information security": "is",
    it: "it", "information technology": "it",
    me: "me", mech: "me", mechanical: "me", "mechanical engineering": "me",
    mi: "mi", mining: "mi", "mining engineering": "mi",
    mm: "mm", metallurgy: "mm", "metallurgical engineering": "mm", "metallurgy materials": "mm",
    others: "others", bt: "others",
    rm: "rm", mechatronics: "rm", robotics: "robotics", robot: "robotics", "robotics engineering": "robotics", "robotics mechatronics": "rm",
    sd: "sd", ds: "sd", "data science": "sd",
    tx: "tx", textile: "tx", "textile technology": "tx"
}).map(([key, value]) => [normalizeBranchKey(key), value]));
const pyqPrimarySourceBranches = {
    cse: ["cse"],
    it: ["it"],
    ece: ["ece"],
    mech: ["me"],
    civil: ["civil"],
    eee: ["eee"],
    ai: ["aiml"],
    ds: ["sd"],
    cyber: ["cy"],
    chemical: ["chemical"],
    auto: ["auto"],
    production: ["production"],
    aero: ["aero"],
    bme: ["bme"],
    iot: ["io", "cse-iot"],
    mechatronics: ["rm"],
    power: ["power"],
    instrumentation: ["instrumentation"],
    env: ["env"],
    arch: ["arch"],
    metallurgy: ["mm"],
    mining: ["mi"],
    textile: ["tx"],
    petroleum: ["petroleum"],
    food: ["ft"],
    robotics: ["robotics"],
    nano: ["nano"],
    marine: ["marine"]
};
const pyqCoreSubjectPrefixes = {
    cse: ["CS"],
    it: ["IT"],
    ece: ["EC"],
    mech: ["ME"],
    civil: ["CE"],
    eee: ["EE"],
    ai: ["AL"],
    ds: ["SD"],
    cyber: ["CY"],
    chemical: ["CM", "CH"],
    auto: ["AU"],
    bme: ["BE", "BM"],
    iot: ["IO"],
    mechatronics: ["RM"],
    power: ["PE"],
    instrumentation: ["EI", "IN"],
    env: ["ES"],
    arch: ["AR"],
    metallurgy: ["MM"],
    mining: ["MI"],
    textile: ["TX"],
    petroleum: ["PT"],
    food: ["FT"],
    robotics: ["RO"],
    nano: ["NT"],
    marine: ["MR"]
};
const pyqStrictSharedBranches = new Set(["ece", "bme", "power", "env", "instrumentation", "arch", "petroleum", "robotics", "nano", "marine"]);
const normalizeSourceBranchId = (value) => {
    const key = normalizeBranchKey(value);
    if (!key) return "";
    return pyqSourceBranchAliases.get(key) || key.replace(/\s+/g, "-");
};
const resolvePyqBranchId = (value) => {
    const key = normalizeBranchKey(value);
    if (!key) return "";
    if (key === "all" || key === "all branches") return "all";
    if (pyqBranchAliases.has(key)) return pyqBranchAliases.get(key);
    const matched = pyqBranches.find(([id, name]) => {
        const nameKey = normalizeBranchKey(name);
        return key === id
            || key === nameKey
            || (id.length >= 3 && key.includes(id))
            || (nameKey.length >= 4 && key.includes(nameKey))
            || (key.length >= 4 && nameKey.includes(key));
    });
    return matched?.[0] || "";
};
const pyqBranchOptionLabel = (id) => {
    const index = pyqBranchOrder.get(id);
    const code = pyqBranchCodes[id] || String(id || "").toUpperCase();
    const name = getBranchName(id);
    return Number.isInteger(index) ? `#${index + 1} ${code} ${name}` : `${code} ${name}`;
};
const pyqBranchCodePrefixes = {
    ai: "AI", arch: "ARCH", auto: "AUTO", bme: "BME", chemical: "CH", civil: "CE",
    cse: "CS", cyber: "CY", ds: "DS", ece: "EC", eee: "EE", env: "ENV",
    instrumentation: "INST", iot: "IOT", it: "IT", mech: "ME", mechatronics: "MECH",
    power: "POWER", production: "PROD", aero: "AERO", metallurgy: "METAL", mining: "MINING",
    textile: "TEXTILE", petroleum: "PETRO", food: "FOOD", robotics: "ROBOT", nano: "NANO",
    marine: "MARINE"
};

const pyqSubjects = {
    cse: {
        "3": ["ES-301 Energy & Environmental Engineering", "CS-302 Discrete Structure", "CS-303 Data Structure", "CS-304 Digital Systems", "CS-305 Object Oriented Programming & Methodology"],
        "4": ["BT-401 Mathematics III", "CS-402 Analysis & Design of Algorithms (ADA)", "CS-403 Software Engineering", "CS-404 Computer Organization & Architecture (COA)", "CS-405 Operating Systems (OS)"],
        "5": ["CS-501 Theory of Computation (TOC)", "CS-502 Database Management Systems (DBMS)", "CS-503(A) Data Analytics", "CS-503(B) Pattern Recognition", "CS-503(C) Cyber Security", "CS-504(A) Internet and Web Technology", "CS-504(B) Object Oriented Programming", "CS-504(C) Introduction to Database Management Systems"],
        "6": ["CS-601 Machine Learning", "CS-602 Computer Networks", "CS-603(A) Advanced Computer Architecture", "CS-603(B) Computer Graphics & Visualization", "CS-603(C) Compiler Design", "CS-604(A) Knowledge Management", "CS-604(B) Project Management", "CS-604(C) Rural Technology & Community Development"],
        "7": ["CS-701 Software Architectures", "CS-702(A) Computational Intelligence", "CS-702(B) Deep & Reinforcement Learning", "CS-702(C) Wireless & Mobile Computing", "CS-702(D) Big Data", "CS-703(A) Cryptography & Information Security", "CS-703(B) Data Mining & Warehousing", "CS-703(C) Agile Software Development", "CS-703(D) Disaster Management"],
        "8": ["CS-801 Internet of Things (IoT)", "CS-802(A) Blockchain Technologies", "CS-802(B) Cloud Computing", "CS-802(C) High Performance Computing", "CS-802(D) Object Oriented Software Engineering", "CS-803(A) Image Processing and Computer Vision", "CS-803(B) Game Theory with Engineering Applications", "CS-803(C) Internet of Things", "CS-803(D) Managing Innovation and Entrepreneurship"]
    },
    it: {
        "1": ["BT-101 Engineering Chemistry", "BT-102 Mathematics-I", "BT-103 English for Communication", "BT-104 Basic Electrical & Electronics Engineering", "BT-105 Engineering Graphics"],
        "2": ["BT-201 Engineering Physics", "BT-202 Mathematics-II", "BT-203 Basic Mechanical Engineering", "BT-204 Basic Civil Engineering & Mechanics", "BT-205 Basic Computer Engineering"],
        "3": ["ES-301 Energy & Environmental Engineering", "IT-302 Discrete Structure", "IT-303 Data Structure", "IT-304 Object Oriented Programming & Methodology", "IT-305 Digital Circuits & System"],
        "4": ["BT-401 Mathematics-III", "IT-402 Analysis & Design of Algorithm", "IT-403 Software Engineering", "IT-404 Computer Organization & Architecture", "IT-405 Operating Systems"],
        "5": ["IT-501 Operating System", "IT-502 Computer Network", "IT-503(A) Theory of Computation (Departmental Elective)", "IT-503(B) Microprocessor & Interfacing (Departmental Elective)", "IT-503(C) Principles of Programming Languages (Departmental Elective)", "IT-504(A) Artificial Intelligence (Open Elective)", "IT-504(B) E-Commerce & Governance (Open Elective)", "IT-504(C) Java Programming (Open Elective)"],
        "6": ["IT-601 Computer Graphics & Multimedia", "IT-602 Wireless & Mobile Computing", "IT-603(A) Compiler Design", "IT-603(B) Data Mining", "IT-603(C) Embedded Systems", "IT-604(A) Intellectual Property Rights (IPR)", "IT-604(B) Software Engineering", "IT-604(C) Wireless Sensor Networks"],
        "7": ["IT-701 Soft Computing", "IT-702(A) Cloud Computing", "IT-702(B) Information Security", "IT-702(C) Big Data Analytics", "IT-703(A) Internet of Things (IoT)", "IT-703(B) Blockchain Technology", "IT-703(C) Cyber Security"],
        "8": ["IT-801 Major Project - Phase II", "IT-802 Comprehensive Viva-Voce", "IT-803 Seminar", "IT-804 Industrial Training / Internship"]
    },
    ece: {
        "1": ["BT-101 Engineering Chemistry", "BT-102 Mathematics-I", "BT-103 English for Communication", "BT-104 Basic Electrical & Electronics Engineering", "BT-105 Engineering Graphics"],
        "2": ["BT-201 Engineering Physics", "BT-202 Mathematics-II", "BT-203 Basic Mechanical Engineering", "BT-204 Basic Civil Engineering & Mechanics", "BT-205 Basic Computer Engineering"],
        "3": ["BT-301 Mathematics-III", "EC-302 Electronic Measurement & Instrumentation", "EC-303 Digital System Design", "EC-304 Electronic Devices", "EC-305 Network Analysis"],
        "4": ["ES-401 Energy & Environmental Engineering", "EC-402 Signals & Systems", "EC-403 Analog Communication", "EC-404 Control System", "EC-405 Analog Circuits"],
        "5": ["EC-501 Microprocessor & Its Applications", "EC-502 Digital Communication", "EC-503-(A/B/C) Any one Departmental Elective", "EC-504-(A/B/C) Any one Open Elective"],
        "6": ["EC-601 Digital Signal Processing", "EC-602 Computer Architecture & Organization", "EC-603-(A/B/C) Any one Departmental Elective", "EC-604-(A/B/C) Any one Open Elective"],
        "7": ["EC-701 VLSI Design", "EC-702-(A/B/C) Choose one Departmental Elective", "EC-703-(A/B/C) Choose one Open Elective"],
        "8": ["EC-801 Optical Fibre Communication", "EC-802-(A/B/C) Choose one Departmental Elective", "EC-803-(A/B/C) Choose one Open Elective"]
    },
    mech: {
        "1": ["BT-101 Engineering Chemistry", "BT-102 Mathematics-I", "BT-103 English for Communication", "BT-104 Basic Electrical & Electronics Engineering", "BT-105 Engineering Graphics"],
        "2": ["BT-201 Engineering Physics", "BT-202 Mathematics-II", "BT-203 Basic Mechanical Engineering", "BT-204 Basic Civil Engineering & Mechanics", "BT-205 Basic Computer Engineering"],
        "3": ["ME-301 Thermodynamics", "ME-302 Material Science", "ME-303 Strength of Materials", "ME-304 Manufacturing Process", "ME-305 Fluid Mechanics", "ME-306 Energy & Environmental Engineering"],
        "4": ["ME-401 Theory of Machines", "ME-402 Applied Thermodynamics", "ME-403 Machine Drawing", "ME-404 Manufacturing Technology", "ME-405 Hydraulic Machines", "ME-406 Numerical Methods & Computer Programming"],
        "5": ["ME-501 Design of Machine Elements", "ME-502 Heat & Mass Transfer", "ME-503 Dynamics of Machines", "ME-504 Industrial Engineering & Management", "ME-505(A) Refrigeration & Air Conditioning", "ME-505(B) Automobile Engineering", "ME-505(C) Mechatronics"],
        "6": ["ME-601 Machine Design", "ME-602 Finite Element Methods", "ME-603 Internal Combustion Engines", "ME-604 Turbo Machines", "ME-605(A) Operations Research", "ME-605(B) Computer Integrated Manufacturing (CIM)", "ME-605(C) Renewable Energy Sources"],
        "7": ["ME-701 Mechanical Vibrations", "ME-702 CAD/CAM", "ME-703(A) Advanced Manufacturing Technology", "ME-703(B) Robotics", "ME-703(C) Non-Conventional Manufacturing Process", "ME-704(A) Power Plant Engineering", "ME-704(B) Automobile Engineering-II", "ME-704(C) Industrial Automation"],
        "8": ["ME-801(A) Computational Fluid Dynamics", "ME-801(B) Advanced IC Engines", "ME-801(C) Product Design & Development", "ME-802(A) Total Quality Management", "ME-802(B) Supply Chain Management", "ME-802(C) Industrial Safety Engineering"]
    },
    civil: {
        "1": ["BT-101 Engineering Chemistry", "BT-102 Mathematics-I", "BT-103 English for Communication", "BT-104 Basic Electrical & Electronics Engineering", "BT-105 Engineering Graphics"],
        "2": ["BT-201 Engineering Physics", "BT-202 Mathematics-II", "BT-203 Basic Mechanical Engineering", "BT-204 Basic Civil Engineering & Mechanics", "BT-205 Basic Computer Engineering"],
        "3": ["CE-301 Strength of Materials", "CE-302 Building Materials", "CE-303 Surveying", "CE-304 Fluid Mechanics", "CE-305 Engineering Geology", "CE-306 Mathematics-III"],
        "4": ["CE-401 Structural Analysis", "CE-402 Geotechnical Engineering-I", "CE-403 Hydraulics", "CE-404 Concrete Technology", "CE-405(A) Building Planning & Architecture", "CE-405(B) Engineering Geology", "CE-405(C) Disaster Management"],
        "5": ["CE-501 Design of Reinforced Concrete Structures", "CE-502 Design of Steel Structures", "CE-503 Water Resources Engineering", "CE-504 Transportation Engineering-I", "CE-505(A) Environmental Engineering-I", "CE-505(B) Advanced Surveying", "CE-505(C) Construction Technology & Management"],
        "6": ["CE-601 Design of Prestressed Concrete Structures", "CE-602 Environmental Engineering-II", "CE-603 Transportation Engineering-II", "CE-604 Estimation, Costing & Valuation", "CE-605(A) Advanced Structural Analysis", "CE-605(B) Ground Water Engineering", "CE-605(C) Bridge Engineering"],
        "7": ["CE-701 Foundation Engineering", "CE-702 Construction Planning & Management", "CE-703(A) Earthquake Resistant Design", "CE-703(B) Advanced Highway Engineering", "CE-703(C) Remote Sensing & GIS", "CE-704(A) Finite Element Method", "CE-704(B) Pavement Design", "CE-704(C) Solid & Hazardous Waste Management"],
        "8": ["CE-801(A) Advanced Reinforced Concrete Design", "CE-801(B) Advanced Foundation Engineering", "CE-801(C) Traffic Engineering & Management", "CE-802(A) Repair & Rehabilitation of Structures", "CE-802(B) Irrigation Engineering", "CE-802(C) Environmental Impact Assessment"]
    },
    eee: {
        "1": ["BT-101 Engineering Chemistry", "BT-102 Mathematics-I", "BT-103 English for Communication", "BT-104 Basic Electrical & Electronics Engineering", "BT-105 Engineering Graphics"],
        "2": ["BT-201 Engineering Physics", "BT-202 Mathematics-II", "BT-203 Basic Mechanical Engineering", "BT-204 Basic Civil Engineering & Mechanics", "BT-205 Basic Computer Engineering"],
        "3": ["EE-301 Electrical Measurements & Measuring Instruments", "EE-302 Network Analysis", "EE-303 Analog Electronics", "EE-304 Electrical Machines-I", "EE-305 Engineering Mathematics-III"],
        "4": ["EE-401 Power System-I", "EE-402 Control Systems", "EE-403 Digital Electronics", "EE-404 Electrical Machines-II", "EE-405 Engineering Mathematics-IV"],
        "5": ["EE-501 Power Electronics", "EE-502 Power System-II", "EE-503 Microprocessors & Microcontrollers", "EE-504 Electrical Machine Design", "EE-505(A) High Voltage Engineering", "EE-505(B) Utilization of Electrical Energy", "EE-505(C) Electrical & Hybrid Vehicles"],
        "6": ["EE-601 Power System Analysis", "EE-602 Power System Protection", "EE-603 Digital Signal Processing", "EE-604 Switchgear & Protection", "EE-605(A) Flexible AC Transmission Systems (FACTS)", "EE-605(B) Renewable Energy Sources", "EE-605(C) Industrial Drives & Control"],
        "7": ["EE-701 Power System Operation & Control", "EE-702 Electrical Drives", "EE-703(A) HVDC Transmission", "EE-703(B) Energy Management & Auditing", "EE-703(C) Smart Grid Technology", "EE-704 Departmental Elective / Open Elective (as per RGPV scheme)"],
        "8": ["EE-801(A) Power Quality", "EE-801(B) Embedded Systems", "EE-801(C) Electric & Hybrid Vehicles", "EE-802(A) Distribution System Engineering", "EE-802(B) Artificial Intelligence Applications in Electrical Engineering", "EE-802(C) Energy Conservation & Management"]
    },
    ds: {
        "1": ["BT-101 Engineering Chemistry", "BT-102 Mathematics-I", "BT-103 English for Communication", "BT-104 Basic Electrical & Electronics Engineering", "BT-105 Engineering Graphics"],
        "2": ["BT-201 Engineering Physics", "BT-202 Mathematics-II", "BT-203 Basic Mechanical Engineering", "BT-204 Basic Civil Engineering & Mechanics", "BT-205 Basic Computer Engineering"],
        "3": ["BT-301 Mathematics-III", "DS-302 Data Structures", "DS-303 Digital Systems", "DS-304 Discrete Mathematics", "DS-305 Object Oriented Programming & Methodology"],
        "4": ["BT-401 Mathematics-IV", "DS-402 Design & Analysis of Algorithms", "DS-403 Computer Organization & Architecture", "DS-404 Database Management Systems", "DS-405 Theory of Computation"],
        "5": ["CD-501 Computational Mathematics", "CD-502 Compiler Design", "CD-503 Cloud Computing", "CD-504 Artificial Intelligence", "CD-505-(A/B/C) Departmental Elective (any one):", "CD-505(A) Web Engineering", "CD-505(B) Machine Learning", "CD-505(C) Computational Intelligence"],
        "6": ["CD-601 Deep Learning", "CD-602 Computer Networks", "CD-603-(A/B/C) Departmental Elective (any one):", "CD-603(A) Big Data Analytics", "CD-603(B) Data Acquisition", "CD-603(C) Advanced Database Management System", "CD-604-(A/B/C) Open Elective (any one):", "CD-604(A) Information Extraction and Retrieval", "CD-604(B) Agile Software Development", "CD-604(C) Natural Language Processing"],
        "7": ["CD-701 Data Engineering", "CD-702-(A/B/C/D) Departmental Elective (any one):", "CD-702(A) Data Analytics & Visualization", "CD-702(B) Internet of Things (IoT)", "CD-702(C) Cloud Computing", "CD-702(D) Blockchain Technology", "CD-703-(A/B/C/D) Open Elective (any one):", "CD-703(A) Cryptography & Information Security", "CD-703(B) Data Mining & Warehousing", "CD-703(C) Agile Software Development", "CD-703(D) Disaster Management", "CD-704-(A/B/C/D) Departmental Elective (any one):", "CD-704(A) Advanced Statistics for Data Science", "CD-704(B) Explainable AI", "CD-704(C) Bioinformatics", "CD-704(D) Business Intelligence & Analytics"],
        "8": ["CD-801 Major Project / Internship Evaluation (no written theory paper)", "CD-802-(A/B/C/D) Departmental Elective (any one):", "CD-802(A) Reinforcement Learning", "CD-802(B) Project Management", "CD-802(C) Computational Statistics", "CD-802(D) Machine Learning for Data Science", "CD-803-(A/B/C/D) Open Elective (any one):", "CD-803(A) Blockchain Technologies", "CD-803(B) Time-Series Analysis", "CD-803(C) Quantum Computing", "CD-803(D) Human-Computer Interaction"]
    },
    cyber: {
        "1": ["BT-101 Engineering Chemistry", "BT-102 Mathematics-I", "BT-103 English for Communication", "BT-104 Basic Electrical & Electronics Engineering", "BT-105 Engineering Graphics"],
        "2": ["BT-201 Engineering Physics", "BT-202 Mathematics-II", "BT-203 Basic Mechanical Engineering", "BT-204 Basic Civil Engineering & Mechanics", "BT-205 Basic Computer Engineering"],
        "3": ["CY-301 Technical Communication", "CY-302 Discrete Structures", "CY-303 Data Structures", "CY-304 Digital Systems", "CY-305 Object Oriented Programming & Methodology"],
        "4": ["CY-401 Mathematics-III", "CY-402 Analysis & Design of Algorithms", "CY-403 Computer Organization & Architecture", "CY-404 Operating Systems", "CY-405 Database Management Systems (DBMS)"],
        "5": ["CY-501 OS Internals for Security Support", "CY-502 Design and Analysis of Algorithms", "CY-503 Network Security", "CY-504(A) Cyber Law and Intellectual Property Rights", "CY-504(B) Internet of Things", "CY-504(C) Computer Organization and Architecture"],
        "6": ["CY-601 Cryptography and Network Security", "CY-602 Computer Networks", "CY-603 Departmental Elective", "CY-603(A) Machine Learning", "CY-603(B) Advanced Computer Architecture", "CY-603(C) Compiler Design", "CY-604 Open Elective", "CY-604(A) Knowledge Management", "CY-604(B) Project Management", "CY-604(C) Rural Technology & Community Development"],
        "7": ["CY-701 Information Security Risk Management", "CY-702 Digital Forensics", "CY-703 (Departmental Elective", "CY-703(A) Ethical Hacking", "CY-703(B) Cyber Security Policies & Standards", "CY-703(C) Data Engineering", "CY-703(D) Cloud Computing"],
        "8": ["CD-801 Major Project / Internship Evaluation (no written theory paper)", "CD-802-(A/B/C/D) Departmental Elective (any one):", "CD-802(A) Reinforcement Learning", "CD-802(B) Project Management", "CD-802(C) Computational Statistics", "CD-802(D) Machine Learning for Data Science", "CD-803-(A/B/C/D) Open Elective (any one):", "CD-803(A) Blockchain Technologies", "CD-803(B) Time-Series Analysis", "CD-803(C) Quantum Computing", "CD-803(D) Human-Computer Interaction"]
    },
    chemical: {
        "1": ["BT-101 Engineering Chemistry", "BT-102 Mathematics-I", "BT-103 English for Communication", "BT-104 Basic Electrical & Electronics Engineering", "BT-105 Engineering Graphics"],
        "2": ["BT-201 Engineering Physics", "BT-202 Mathematics-II", "BT-203 Basic Mechanical Engineering", "BT-204 Basic Civil Engineering & Mechanics", "BT-205 Basic Computer Engineering"],
        "3": ["BT-301 Mathematics-III", "CM-302 Chemical Engineering Thermodynamics", "CM-303 Advance Engineering Chemistry", "CM-304 Material & Energy Balance", "CM-305 Chemical Instrumentation"],
        "4": ["BT-401 Mathematics-III", "CM-402 Fluid Mechanics", "CM-403 Heat Transfer", "CM-404 Mechanical Operations", "CM-405 Chemical Engineering Process Calculations / Chemical Process Calculations*"],
        "5": ["CM-501 Mass Transfer-I", "CM-502 Chemical Reaction Engineering-I", "CM-503(A) Computation Methods in Chemical Engineering", "CM-503(B) Pulp & Paper Technology", "CM-503(C) Pharmaceutical Technology", "CM-504(A) Organic Process Technology", "CM-504(B) Fuel Cell Technology", "CM-504(C) Energy Management"],
        "6": ["CM-601 Mass Transfer-II", "CM-602 Chemical Reaction Engineering-II", "CM-603 Process Dynamics & Control", "CM-604(A) Polymer Technology", "CM-604(B) Petrochemical Technology", "CM-604(C) Fertilizer Technology", "CM-605(A) Environmental Engineering", "CM-605(B) Food Technology", "CM-605(C) Safety & Hazard Management"],
        "7": ["CM-701 Process Equipment Design", "CM-702 Chemical Process Industries", "CM-703(A) Transport Phenomena", "CM-703(B) Biochemical Engineering", "CM-703(C) Corrosion Engineering", "CM-704(A) Membrane Technology", "CM-704(B) Nanotechnology", "CM-704(C) Industrial Pollution Control"],
        "8": ["CM-801(A) Petroleum Refinery Engineering", "CM-801(B) Process Plant Utilities", "CM-801(C) Advanced Separation Processes", "CM-802(A) Process Economics & Plant Design", "CM-802(B) Energy Conservation in Process Industries", "CM-802(C) Industrial Waste Management"]
    },
    auto: {
        "1": ["BT-101 Engineering Mathematics-I", "BT-102 Engineering Chemistry", "BT-103 English for Communication", "BT-104 Basic Electrical & Electronics Engineering", "BT-105 Engineering Graphics"],
        "2": ["BT-201 Engineering Mathematics-II", "BT-202 Engineering Physics", "BT-203 Basic Mechanical Engineering", "BT-204 Basic Civil Engineering & Mechanics", "BT-205 Basic Computer Engineering"],
        "3": ["BT-301 Mathematics-III", "AU-302 Engineering Thermodynamics", "AU-303 Strength of Materials", "AU-304 Manufacturing Technology", "AU-305 Automobile Engineering Materials"],
        "4": ["BT-401 Mathematics-IV", "AU-402 Fluid Mechanics & Hydraulic Machines", "AU-403 Theory of Machines", "AU-404 Applied Thermodynamics", "AU-405 Machine Drawing & Design"],
        "5": ["AU-501 Internal Combustion Engines", "AU-502 Automobile Transmission", "AU-503(A) Vehicle Body Engineering", "AU-503(B) Tractor & Farm Machinery", "AU-503(C) Vehicle Maintenance", "AU-504(A) Automotive Electrical & Electronics", "AU-504(B) Two & Three Wheeler Technology", "AU-504(C) Automobile Air Conditioning"],
        "6": ["AU-601 Vehicle Dynamics", "AU-602 Automobile Chassis Design", "AU-603 Automobile Pollution & Control", "AU-604(A) Automotive Safety", "AU-604(B) Alternative Fuels & Energy Systems", "AU-604(C) Automotive Aerodynamics"],
        "7": ["AU-701 Automotive Engine Management Systems", "AU-702 Electric & Hybrid Vehicles", "AU-703(A) Vehicle Testing & Homologation", "AU-703(B) Transport Management", "AU-703(C) Automotive Robotics", "AU-704 Industrial Management & Entrepreneurship"],
        "8": ["AU-801 Automobile System Design", "AU-802 Recent Trends in Automobile Engineering", "AU-803(A) Advanced Automotive Electronics", "AU-803(B) Intelligent Transportation Systems", "AU-803(C) Automotive Mechatronics"]
    },
    production: {
        "1": ["BT-101 Engineering Mathematics-I", "BT-102 Engineering Chemistry", "BT-103 English for Communication", "BT-104 Basic Electrical & Electronics Engineering", "BT-105 Engineering Graphics"],
        "2": ["BT-201 Engineering Mathematics-II", "BT-202 Engineering Physics", "BT-203 Basic Mechanical Engineering", "BT-204 Basic Civil Engineering & Mechanics", "BT-205 Basic Computer Engineering"],
        "3": ["BT-301 Mathematics-III", "PR-302 Manufacturing Process-I", "PR-303 Strength of Materials", "PR-304 Engineering Materials", "PR-305 Metrology & Measurement"],
        "4": ["BT-401 Mathematics-IV", "PR-402 Manufacturing Process-II", "PR-403 Theory of Machines", "PR-404 Machine Design-I", "PR-405 Industrial Engineering"],
        "5": ["PR-501 Production Planning & Control", "PR-502 Machine Tool Design", "PR-503(A) Operations Research", "PR-503(B) Quality Engineering", "PR-503(C) Tool Engineering", "PR-504(A) Heat Treatment Technology", "PR-504(B) Non-Conventional Manufacturing Processes", "PR-504(C) Automation in Manufacturing"],
        "6": ["PR-601 CAD/CAM", "PR-602 Machine Design-II", "PR-603 Metal Forming Technology", "PR-604(A) Flexible Manufacturing Systems", "PR-604(B) Robotics in Manufacturing", "PR-604(C) Total Quality Management"],
        "7": ["PR-701 Production Management", "PR-702 CIM (Computer Integrated Manufacturing)", "PR-703(A) Supply Chain Management", "PR-703(B) Lean Manufacturing", "PR-703(C) Advanced Manufacturing Technology", "PR-704 Entrepreneurship & Industrial Management"],
        "8": ["PR-801 Advanced Production Engineering", "PR-802 Modern Manufacturing Systems", "PR-803(A) Reliability Engineering", "PR-803(B) Product Design & Development", "PR-803(C) Six Sigma & Quality Systems"]
    },
    aero: {
        "1": ["BT-101 Engineering Mathematics-I", "BT-102 Engineering Chemistry", "BT-103 English for Communication", "BT-104 Basic Electrical & Electronics Engineering", "BT-105 Engineering Graphics"],
        "2": ["BT-201 Engineering Mathematics-II", "BT-202 Engineering Physics", "BT-203 Basic Mechanical Engineering", "BT-204 Basic Civil Engineering & Mechanics", "BT-205 Basic Computer Engineering"],
        "3": ["BT-301 Mathematics-III", "AE-302 Aerodynamics-I", "AE-303 Aircraft Structures-I", "AE-304 Aircraft Propulsion-I", "AE-305 Engineering Thermodynamics"],
        "4": ["BT-401 Mathematics-IV", "AE-402 Aerodynamics-II", "AE-403 Aircraft Structures-II", "AE-404 Aircraft Propulsion-II", "AE-405 Flight Mechanics-I"],
        "5": ["AE-501 Aircraft Design-I", "AE-502 Aircraft Systems & Instruments", "AE-503(A) Gas Dynamics", "AE-503(B) Helicopter Engineering", "AE-503(C) Rocket Propulsion", "AE-504(A) Aerospace Materials", "AE-504(B) Space Technology", "AE-504(C) Aircraft Production Technology"],
        "6": ["AE-601 Flight Mechanics-II", "AE-602 Aircraft Design-II", "AE-603 Aircraft Stability & Control", "AE-604(A) Computational Fluid Dynamics", "AE-604(B) Aircraft Maintenance Engineering", "AE-604(C) Avionics"],
        "7": ["AE-701 Aerospace Vehicle Design", "AE-702 Experimental Aerodynamics", "AE-703(A) Finite Element Methods", "AE-703(B) Unmanned Aerial Vehicles (UAV)", "AE-703(C) Missile Technology", "AE-704 Industrial Management & Entrepreneurship"],
        "8": ["AE-801 Advanced Aerospace Engineering", "AE-802 Recent Trends in Aeronautical Engineering", "AE-803(A) Aircraft Certification & Airworthiness", "AE-803(B) Spacecraft Systems", "AE-803(C) Advanced Avionics"]
    },
    bme: {
        "1": ["BT-101 Engineering Mathematics-I", "BT-102 Engineering Chemistry", "BT-103 English for Communication", "BT-104 Basic Electrical & Electronics Engineering", "BT-105 Engineering Graphics"],
        "2": ["BT-201 Engineering Mathematics-II", "BT-202 Engineering Physics", "BT-203 Basic Mechanical Engineering", "BT-204 Basic Civil Engineering & Mechanics", "BT-205 Basic Computer Engineering"],
        "3": ["BT-301 Mathematics-III", "BM-302 Human Anatomy & Physiology", "BM-303 Biomedical Instrumentation", "BM-304 Electronic Devices & Circuits", "BM-305 Signals & Systems"],
        "4": ["BT-401 Mathematics-IV", "BM-402 Medical Electronics", "BM-403 Sensors & Transducers", "BM-404 Digital Signal Processing", "BM-405 Biomaterials"],
        "5": ["BM-501 Medical Imaging Systems", "BM-502 Biomedical Signal Processing", "BM-503(A) Artificial Organs", "BM-503(B) Rehabilitation Engineering", "BM-503(C) Bioinformatics", "BM-504(A) Hospital Engineering", "BM-504(B) Diagnostic & Therapeutic Equipment", "BM-504(C) Biomedical Optics"],
        "6": ["BM-601 Biomechanics", "BM-602 Medical Image Processing", "BM-603 Biomedical Microprocessors", "BM-604(A) Neural Engineering", "BM-604(B) Embedded Systems for Biomedical Applications", "BM-604(C) Telemedicine"],
        "7": ["BM-701 Biomedical Engineering Design", "BM-702 Biomedical Instrumentation-II", "BM-703(A) Tissue Engineering", "BM-703(B) Clinical Engineering", "BM-703(C) Nanotechnology in Medicine", "BM-704 Industrial Management & Entrepreneurship"],
        "8": ["BM-801 Advanced Biomedical Engineering", "BM-802 Recent Trends in Biomedical Engineering", "BM-803(A) Medical Robotics", "BM-803(B) Healthcare Technology Management", "BM-803(C) Biomedical Data Analytics"]
    },
    iot: {
        "1": ["BT-101 Engineering Mathematics-I", "BT-102 Engineering Chemistry", "BT-103 English for Communication", "BT-104 Basic Electrical & Electronics Engineering", "BT-105 Engineering Graphics"],
        "2": ["BT-201 Engineering Mathematics-II", "BT-202 Engineering Physics", "BT-203 Basic Mechanical Engineering", "BT-204 Basic Civil Engineering & Mechanics", "BT-205 Basic Computer Engineering"],
        "3": ["BT-301 Mathematics-III", "IE-302 Digital Electronics", "IE-303 Data Structures", "IE-304 Computer Organization & Architecture", "IE-305 Electronic Devices & Circuits"],
        "4": ["BT-401 Mathematics-IV", "IE-402 Microprocessors & Microcontrollers", "IE-403 Embedded Systems", "IE-404 Operating Systems", "IE-405 Computer Networks"],
        "5": ["IE-501 Internet of Things", "IE-502 Wireless Sensor Networks", "IE-503(A) ARM Processor Architecture", "IE-503(B) Real Time Operating Systems", "IE-503(C) FPGA Design", "IE-504(A) Cloud Computing", "IE-504(B) Cyber Security", "IE-504(C) VLSI Design"],
        "6": ["IE-601 IoT System Design", "IE-602 Embedded Linux", "IE-603 Industrial IoT", "IE-604(A) Edge Computing", "IE-604(B) Machine Learning for IoT", "IE-604(C) Robotics & Automation"],
        "7": ["IE-701 Advanced Embedded Systems", "IE-702 IoT Security", "IE-703(A) Smart Cities & Smart Infrastructure", "IE-703(B) Automotive Embedded Systems", "IE-703(C) Wearable Computing", "IE-704 Entrepreneurship & Industrial Management"],
        "8": ["IE-801 Advanced IoT Applications", "IE-802 Recent Trends in IoT & Embedded Systems", "IE-803(A) AI for IoT", "IE-803(B) Internet of Medical Things (IoMT)", "IE-803(C) Advanced Embedded System Design"]
    },
    power: {
        "1": ["BT-101 Engineering Mathematics-I", "BT-102 Engineering Chemistry", "BT-103 English for Communication", "BT-104 Basic Electrical & Electronics Engineering", "BT-105 Engineering Graphics"],
        "2": ["BT-201 Engineering Mathematics-II", "BT-202 Engineering Physics", "BT-203 Basic Mechanical Engineering", "BT-204 Basic Civil Engineering & Mechanics", "BT-205 Basic Computer Engineering"],
        "3": ["BT-301 Mathematics-III", "PE-302 Network Analysis", "PE-303 Electrical Machines-I", "PE-304 Electronic Devices & Circuits", "PE-305 Digital Electronics"],
        "4": ["BT-401 Mathematics-IV", "PE-402 Electrical Machines-II", "PE-403 Analog Electronics", "PE-404 Power Systems-I", "PE-405 Control Systems"],
        "5": ["PE-501 Power Electronics", "PE-502 Microprocessors & Microcontrollers", "PE-503(A) Electrical Drives", "PE-503(B) High Voltage Engineering", "PE-503(C) Industrial Electronics", "PE-504(A) Signals & Systems", "PE-504(B) Renewable Energy Systems", "PE-504(C) Embedded Systems"],
        "6": ["PE-601 Advanced Power Electronics", "PE-602 Power System-II", "PE-603 Digital Control Systems", "PE-604(A) FACTS Devices", "PE-604(B) Electric Drives & Control", "PE-604(C) HVDC Transmission"],
        "7": ["PE-701 Power Quality", "PE-702 Electric & Hybrid Vehicles", "PE-703(A) Smart Grid", "PE-703(B) Flexible AC Transmission Systems", "PE-703(C) Power Semiconductor Devices", "PE-704 Industrial Management & Entrepreneurship"],
        "8": ["PE-801 Advanced Electrical Drives", "PE-802 Recent Trends in Power Electronics", "PE-803(A) Renewable Energy Integration", "PE-803(B) Energy Management Systems", "PE-803(C) Industrial Automation"]
    },
    mechatronics: {
        "1": ["BT-101 Engineering Mathematics-I", "BT-102 Engineering Chemistry", "BT-103 English for Communication", "BT-104 Basic Electrical & Electronics Engineering", "BT-105 Engineering Graphics"],
        "2": ["BT-201 Engineering Mathematics-II", "BT-202 Engineering Physics", "BT-203 Basic Mechanical Engineering", "BT-204 Basic Civil Engineering & Mechanics", "BT-205 Basic Computer Engineering"],
        "3": ["BT-301 Mathematics-III", "MT-302 Engineering Mechanics", "MT-303 Strength of Materials", "MT-304 Electrical Machines", "MT-305 Electronic Devices & Circuits"],
        "4": ["BT-401 Mathematics-IV", "MT-402 Theory of Machines", "MT-403 Analog & Digital Electronics", "MT-404 Microprocessors & Microcontrollers", "MT-405 Fluid Power Engineering"],
        "5": ["MT-501 Mechatronics System Design", "MT-502 Industrial Automation", "MT-503(A) Robotics", "MT-503(B) PLC & SCADA", "MT-503(C) Sensors & Transducers", "MT-504(A) Control Systems", "MT-504(B) Embedded Systems", "MT-504(C) Computer Integrated Manufacturing"],
        "6": ["MT-601 Robotics & Automation", "MT-602 CNC Machines & Programming", "MT-603 Industrial Drives", "MT-604(A) Artificial Intelligence", "MT-604(B) Machine Vision", "MT-604(C) Internet of Things for Mechatronics"],
        "7": ["MT-701 Advanced Mechatronics", "MT-702 Intelligent Manufacturing Systems", "MT-703(A) Autonomous Robots", "MT-703(B) Flexible Manufacturing Systems", "MT-703(C) MEMS & Microsystems", "MT-704 Entrepreneurship & Industrial Management"],
        "8": ["MT-801 Advanced Robotics", "MT-802 Recent Trends in Mechatronics", "MT-803(A) Human Robot Interaction", "MT-803(B) Smart Manufacturing", "MT-803(C) Advanced Control Engineering"]
    },
    instrumentation: {
        "1": ["BT-101 Engineering Mathematics-I", "BT-102 Engineering Chemistry", "BT-103 English for Communication", "BT-104 Basic Electrical & Electronics Engineering", "BT-105 Engineering Graphics"],
        "2": ["BT-201 Engineering Mathematics-II", "BT-202 Engineering Physics", "BT-203 Basic Mechanical Engineering", "BT-204 Basic Civil Engineering & Mechanics", "BT-205 Basic Computer Engineering"],
        "3": ["BT-301 Mathematics-III", "IN-302 Electrical Circuits & Networks", "IN-303 Electronic Devices & Circuits", "IN-304 Digital Electronics", "IN-305 Sensors & Transducers"],
        "4": ["BT-401 Mathematics-IV", "IN-402 Analog Electronics", "IN-403 Industrial Instrumentation", "IN-404 Control Systems", "IN-405 Signals & Systems"],
        "5": ["IN-501 Process Control", "IN-502 Microprocessors & Microcontrollers", "IN-503(A) Biomedical Instrumentation", "IN-503(B) Analytical Instrumentation", "IN-503(C) Digital Signal Processing", "IN-504(A) Industrial Automation", "IN-504(B) PLC & SCADA", "IN-504(C) Embedded Systems"],
        "6": ["IN-601 Advanced Process Control", "IN-602 Computer Control of Processes", "IN-603 Power Plant Instrumentation", "IN-604(A) Robotics & Automation", "IN-604(B) Optical Instrumentation", "IN-604(C) Wireless Instrumentation"],
        "7": ["IN-701 Distributed Control Systems", "IN-702 Industrial Safety & Instrumentation", "IN-703(A) Virtual Instrumentation", "IN-703(B) MEMS & Microsystems", "IN-703(C) IoT for Instrumentation", "IN-704 Industrial Management & Entrepreneurship"],
        "8": ["IN-801 Advanced Instrumentation Engineering", "IN-802 Recent Trends in Instrumentation", "IN-803(A) Smart Sensors & Measurement Systems", "IN-803(B) Industrial IoT", "IN-803(C) Artificial Intelligence in Instrumentation"]
    },
    env: {
        "1": ["BT-101 Engineering Mathematics-I", "BT-102 Engineering Chemistry", "BT-103 English for Communication", "BT-104 Basic Electrical & Electronics Engineering", "BT-105 Engineering Graphics"],
        "2": ["BT-201 Engineering Mathematics-II", "BT-202 Engineering Physics", "BT-203 Basic Mechanical Engineering", "BT-204 Basic Civil Engineering & Mechanics", "BT-205 Basic Computer Engineering"],
        "3": ["BT-301 Mathematics-III", "EV-302 Environmental Chemistry", "EV-303 Fluid Mechanics", "EV-304 Engineering Geology", "EV-305 Environmental Microbiology"],
        "4": ["BT-401 Mathematics-IV", "EV-402 Water Supply Engineering", "EV-403 Wastewater Engineering", "EV-404 Air Pollution & Control", "EV-405 Solid Waste Management"],
        "5": ["EV-501 Environmental Impact Assessment", "EV-502 Industrial Waste Management", "EV-503(A) Noise Pollution & Control", "EV-503(B) Hazardous Waste Management", "EV-503(C) Environmental Biotechnology", "EV-504(A) Environmental Modeling", "EV-504(B) Groundwater Engineering", "EV-504(C) Renewable Energy Systems"],
        "6": ["EV-601 Water & Wastewater Treatment", "EV-602 Environmental Management", "EV-603 Remote Sensing & GIS", "EV-604(A) Climate Change & Sustainable Development", "EV-604(B) Industrial Safety & Environmental Engineering", "EV-604(C) Environmental Laws & Policies"],
        "7": ["EV-701 Environmental Systems Engineering", "EV-702 Resource Conservation & Recycling", "EV-703(A) Green Building Technology", "EV-703(B) Disaster Management", "EV-703(C) Energy & Environment", "EV-704 Industrial Management & Entrepreneurship"],
        "8": ["EV-801 Advanced Environmental Engineering", "EV-802 Recent Trends in Environmental Engineering", "EV-803(A) Sustainable Infrastructure", "EV-803(B) Environmental Risk Assessment", "EV-803(C) Cleaner Production Technology"]
    },
    arch: {
        "1": ["AR-101 Architectural Design-I", "AR-102 Building Materials & Construction-I", "AR-103 Architectural Graphics-I", "AR-104 Theory of Structures-I", "AR-105 History of Architecture-I"],
        "2": ["AR-201 Architectural Design-II", "AR-202 Building Materials & Construction-II", "AR-203 Architectural Graphics-II", "AR-204 Theory of Structures-II", "AR-205 History of Architecture-II"],
        "3": ["AR-301 Architectural Design-III", "AR-302 Building Construction-III", "AR-303 Climatology", "AR-304 Theory of Structures-III", "AR-305 History of Architecture-III"],
        "4": ["AR-401 Architectural Design-IV", "AR-402 Building Construction-IV", "AR-403 Building Services-I", "AR-404 Theory of Structures-IV", "AR-405 Estimation & Costing"],
        "5": ["AR-501 Architectural Design-V", "AR-502 Building Services-II", "AR-503 Landscape Architecture", "AR-504 Specifications & Contracts", "AR-505 Interior Design"],
        "6": ["AR-601 Architectural Design-VI", "AR-602 Housing", "AR-603 Urban Planning", "AR-604 Quantity Surveying & Valuation", "AR-605 Professional Practice-I"],
        "7": ["AR-701 Architectural Design-VII", "AR-702 Town Planning", "AR-703 Advanced Building Construction", "AR-704 Building Management", "AR-705 Professional Practice-II"],
        "8": ["AR-801 Architectural Design-VIII", "AR-802 Environmental Planning", "AR-803 Advanced Building Services", "AR-804 Disaster Management", "AR-805 Research Methodology"]
    },
    metallurgy: {
        "1": ["BT-101 Engineering Mathematics-I", "BT-102 Engineering Chemistry", "BT-103 English for Communication", "BT-104 Basic Electrical & Electronics Engineering", "BT-105 Engineering Graphics"],
        "2": ["BT-201 Engineering Mathematics-II", "BT-202 Engineering Physics", "BT-203 Basic Mechanical Engineering", "BT-204 Basic Civil Engineering & Mechanics", "BT-205 Basic Computer Engineering"],
        "3": ["BT-301 Mathematics-III", "ML-302 Physical Metallurgy", "ML-303 Engineering Thermodynamics", "ML-304 Metallurgical Analysis", "ML-305 Engineering Materials"],
        "4": ["BT-401 Mathematics-IV", "ML-402 Mechanical Metallurgy", "ML-403 Extractive Metallurgy-I", "ML-404 Phase Transformations", "ML-405 Fuel, Furnace & Refractories"],
        "5": ["ML-501 Iron Making", "ML-502 Steel Making", "ML-503(A) Foundry Technology", "ML-503(B) Welding Technology", "ML-503(C) Powder Metallurgy", "ML-504(A) Heat Treatment Technology", "ML-504(B) Corrosion Engineering", "ML-504(C) Non-Ferrous Metallurgy"],
        "6": ["ML-601 Extractive Metallurgy-II", "ML-602 Mechanical Behaviour of Materials", "ML-603 Materials Characterization", "ML-604(A) Composite Materials", "ML-604(B) Surface Engineering", "ML-604(C) Nano Materials"],
        "7": ["ML-701 Advanced Physical Metallurgy", "ML-702 Materials Processing", "ML-703(A) Failure Analysis", "ML-703(B) Industrial Metallurgy", "ML-703(C) Advanced Materials", "ML-704 Industrial Management & Entrepreneurship"],
        "8": ["ML-801 Modern Metallurgical Engineering", "ML-802 Recent Trends in Metallurgy", "ML-803(A) Biomaterials", "ML-803(B) Energy Materials", "ML-803(C) Materials Selection & Design"]
    },
    mining: {
        "1": ["BT-101 Engineering Mathematics-I", "BT-102 Engineering Chemistry", "BT-103 English for Communication", "BT-104 Basic Electrical & Electronics Engineering", "BT-105 Engineering Graphics"],
        "2": ["BT-201 Engineering Mathematics-II", "BT-202 Engineering Physics", "BT-203 Basic Mechanical Engineering", "BT-204 Basic Civil Engineering & Mechanics", "BT-205 Basic Computer Engineering"],
        "3": ["BT-301 Mathematics-III", "MN-302 Introduction to Mining Engineering", "MN-303 Mine Surveying-I", "MN-304 Mining Geology", "MN-305 Rock Mechanics"],
        "4": ["BT-401 Mathematics-IV", "MN-402 Surface Mining", "MN-403 Underground Coal Mining", "MN-404 Mine Surveying-II", "MN-405 Mine Ventilation"],
        "5": ["MN-501 Mine Environmental Engineering", "MN-502 Mine Machinery", "MN-503(A) Drilling & Blasting", "MN-503(B) Mineral Processing", "MN-503(C) Mine Safety Engineering", "MN-504(A) Underground Metal Mining", "MN-504(B) Mine Management", "MN-504(C) Tunnelling Engineering"],
        "6": ["MN-601 Mine Planning & Design", "MN-602 Mine Economics", "MN-603 Mine Transportation", "MN-604(A) Rock Excavation Engineering", "MN-604(B) Advanced Mine Ventilation", "MN-604(C) Geo-Mechanics"],
        "7": ["MN-701 Mine Systems Engineering", "MN-702 Mine Legislation", "MN-703(A) Computer Applications in Mining", "MN-703(B) Mine Automation", "MN-703(C) Remote Sensing & GIS in Mining", "MN-704 Industrial Management & Entrepreneurship"],
        "8": ["MN-801 Advanced Mining Engineering", "MN-802 Recent Trends in Mining Engineering", "MN-803(A) Sustainable Mining", "MN-803(B) Mine Disaster Management", "MN-803(C) Advanced Mineral Exploration"]
    },
    textile: {
        "1": ["BT-101 Engineering Mathematics-I", "BT-102 Engineering Chemistry", "BT-103 English for Communication", "BT-104 Basic Electrical & Electronics Engineering", "BT-105 Engineering Graphics"],
        "2": ["BT-201 Engineering Mathematics-II", "BT-202 Engineering Physics", "BT-203 Basic Mechanical Engineering", "BT-204 Basic Civil Engineering & Mechanics", "BT-205 Basic Computer Engineering"],
        "3": ["BT-301 Mathematics-III", "TT-302 Fibre Science & Technology", "TT-303 Yarn Manufacturing Technology-I", "TT-304 Textile Testing", "TT-305 Textile Raw Materials"],
        "4": ["BT-401 Mathematics-IV", "TT-402 Yarn Manufacturing Technology-II", "TT-403 Fabric Manufacturing Technology", "TT-404 Textile Physics", "TT-405 Textile Chemical Processing-I"],
        "5": ["TT-501 Textile Chemical Processing-II", "TT-502 Knitting Technology", "TT-503(A) Weaving Technology", "TT-503(B) Nonwoven Technology", "TT-503(C) Textile Machinery", "TT-504(A) Garment Manufacturing Technology", "TT-504(B) Textile Quality Control", "TT-504(C) Technical Textiles"],
        "6": ["TT-601 Textile Design", "TT-602 Textile Finishing", "TT-603 Apparel Technology", "TT-604(A) Textile Management", "TT-604(B) Industrial Engineering in Textiles", "TT-604(C) Computer Applications in Textiles"],
        "7": ["TT-701 Advanced Textile Technology", "TT-702 Textile Engineering Economics", "TT-703(A) Fashion Technology", "TT-703(B) Textile Composite Materials", "TT-703(C) Smart Textiles", "TT-704 Industrial Management & Entrepreneurship"],
        "8": ["TT-801 Modern Textile Technology", "TT-802 Recent Trends in Textile Engineering", "TT-803(A) Sustainable Textile Technology", "TT-803(B) Advanced Garment Engineering", "TT-803(C) Technical & Functional Textiles"]
    },
    petroleum: {
        "1": ["BT-101 Engineering Mathematics-I", "BT-102 Engineering Chemistry", "BT-103 English for Communication", "BT-104 Basic Electrical & Electronics Engineering", "BT-105 Engineering Graphics"],
        "2": ["BT-201 Engineering Mathematics-II", "BT-202 Engineering Physics", "BT-203 Basic Mechanical Engineering", "BT-204 Basic Civil Engineering & Mechanics", "BT-205 Basic Computer Engineering"],
        "3": ["BT-301 Mathematics-III", "PT-302 Petroleum Geology", "PT-303 Fluid Mechanics", "PT-304 Engineering Thermodynamics", "PT-305 Drilling Engineering-I"],
        "4": ["BT-401 Mathematics-IV", "PT-402 Reservoir Engineering-I", "PT-403 Drilling Engineering-II", "PT-404 Well Logging & Formation Evaluation", "PT-405 Petroleum Production Engineering-I"],
        "5": ["PT-501 Petroleum Production Engineering-II", "PT-502 Reservoir Engineering-II", "PT-503(A) Natural Gas Engineering", "PT-503(B) Offshore Drilling Technology", "PT-503(C) Petroleum Refining Technology", "PT-504(A) Enhanced Oil Recovery", "PT-504(B) Pipeline Engineering", "PT-504(C) Petroleum Economics"],
        "6": ["PT-601 Reservoir Simulation", "PT-602 Well Testing", "PT-603 Petroleum Exploration", "PT-604(A) Offshore Production Engineering", "PT-604(B) Health, Safety & Environment in Petroleum Industry", "PT-604(C) Unconventional Oil & Gas Resources"],
        "7": ["PT-701 Advanced Drilling Engineering", "PT-702 Petroleum Reservoir Management", "PT-703(A) LNG Technology", "PT-703(B) Oil & Gas Processing", "PT-703(C) Energy Engineering", "PT-704 Industrial Management & Entrepreneurship"],
        "8": ["PT-801 Advanced Petroleum Engineering", "PT-802 Recent Trends in Petroleum Engineering", "PT-803(A) Deepwater Drilling Technology", "PT-803(B) Carbon Capture & Storage", "PT-803(C) Petroleum Asset Management"]
    },
    food: {
        "1": ["BT-101 Engineering Mathematics-I", "BT-102 Engineering Chemistry", "BT-103 English for Communication", "BT-104 Basic Electrical & Electronics Engineering", "BT-105 Engineering Graphics"],
        "2": ["BT-201 Engineering Mathematics-II", "BT-202 Engineering Physics", "BT-203 Basic Mechanical Engineering", "BT-204 Basic Civil Engineering & Mechanics", "BT-205 Basic Computer Engineering"],
        "3": ["BT-301 Mathematics-III", "FT-302 Food Chemistry", "FT-303 Food Microbiology", "FT-304 Engineering Properties of Food", "FT-305 Food Biochemistry"],
        "4": ["BT-401 Mathematics-IV", "FT-402 Food Processing Technology-I", "FT-403 Food Preservation Technology", "FT-404 Heat & Mass Transfer", "FT-405 Food Analysis & Instrumentation"],
        "5": ["FT-501 Food Processing Technology-II", "FT-502 Dairy Technology", "FT-503(A) Fruit & Vegetable Processing", "FT-503(B) Cereal, Pulse & Oilseed Technology", "FT-503(C) Meat, Fish & Poultry Processing", "FT-504(A) Food Packaging Technology", "FT-504(B) Food Plant Engineering", "FT-504(C) Food Quality Assurance"],
        "6": ["FT-601 Food Process Engineering", "FT-602 Food Safety & Standards", "FT-603 Refrigeration & Cold Storage", "FT-604(A) Functional Foods & Nutraceuticals", "FT-604(B) Bakery & Confectionery Technology", "FT-604(C) Beverage Technology"],
        "7": ["FT-701 Food Product Development", "FT-702 Food Biotechnology", "FT-703(A) Food Supply Chain Management", "FT-703(B) Quality Management Systems", "FT-703(C) Food Waste Management", "FT-704 Industrial Management & Entrepreneurship"],
        "8": ["FT-801 Advanced Food Technology", "FT-802 Recent Trends in Food Technology", "FT-803(A) Food Nanotechnology", "FT-803(B) Food Toxicology", "FT-803(C) Food Business Management"]
    },
    robotics: {
        "1": ["BT-101 Engineering Mathematics-I", "BT-102 Engineering Chemistry", "BT-103 English for Communication", "BT-104 Basic Electrical & Electronics Engineering", "BT-105 Engineering Graphics"],
        "2": ["BT-201 Engineering Mathematics-II", "BT-202 Engineering Physics", "BT-203 Basic Mechanical Engineering", "BT-204 Basic Civil Engineering & Mechanics", "BT-205 Basic Computer Engineering"],
        "3": ["BT-301 Mathematics-III", "RB-302 Engineering Mechanics", "RB-303 Electronic Devices & Circuits", "RB-304 Data Structures", "RB-305 Digital Electronics"],
        "4": ["BT-401 Mathematics-IV", "RB-402 Microprocessors & Microcontrollers", "RB-403 Control Systems", "RB-404 Sensors & Actuators", "RB-405 Kinematics of Machines"],
        "5": ["RB-501 Robotics Engineering", "RB-502 Embedded Systems", "RB-503(A) Industrial Robotics", "RB-503(B) Artificial Intelligence", "RB-503(C) Machine Vision", "RB-504(A) PLC & SCADA", "RB-504(B) Mechatronics", "RB-504(C) Computer Vision"],
        "6": ["RB-601 Robot Dynamics & Control", "RB-602 Autonomous Mobile Robots", "RB-603 Internet of Things", "RB-604(A) Machine Learning", "RB-604(B) Human Robot Interaction", "RB-604(C) Industrial Automation"],
        "7": ["RB-701 Advanced Robotics", "RB-702 Intelligent Robotic Systems", "RB-703(A) Swarm Robotics", "RB-703(B) Medical Robotics", "RB-703(C) UAV & Drone Technology", "RB-704 Industrial Management & Entrepreneurship"],
        "8": ["RB-801 Advanced Robot Design", "RB-802 Recent Trends in Robotics Engineering", "RB-803(A) Collaborative Robotics (Cobots)", "RB-803(B) Robotic Process Automation (RPA)", "RB-803(C) AI Applications in Robotics"]
    },
    nano: {
        "1": ["BT-101 Engineering Mathematics-I", "BT-102 Engineering Chemistry", "BT-103 English for Communication", "BT-104 Basic Electrical & Electronics Engineering", "BT-105 Engineering Graphics"],
        "2": ["BT-201 Engineering Mathematics-II", "BT-202 Engineering Physics", "BT-203 Basic Mechanical Engineering", "BT-204 Basic Civil Engineering & Mechanics", "BT-205 Basic Computer Engineering"],
        "3": ["BT-301 Mathematics-III", "NT-302 Introduction to Nanotechnology", "NT-303 Solid State Physics", "NT-304 Materials Science", "NT-305 Engineering Chemistry for Nanotechnology"],
        "4": ["BT-401 Mathematics-IV", "NT-402 Nano Materials", "NT-403 Quantum Mechanics", "NT-404 Nano Fabrication Techniques", "NT-405 Nano Characterization Techniques"],
        "5": ["NT-501 Nano Electronics", "NT-502 Nano Biotechnology", "NT-503(A) Carbon Nanomaterials", "NT-503(B) Nano Photonics", "NT-503(C) Nano Sensors", "NT-504(A) Thin Film Technology", "NT-504(B) MEMS & NEMS", "NT-504(C) Computational Nanotechnology"],
        "6": ["NT-601 Nanocomposites", "NT-602 Nano Device Engineering", "NT-603 Nano Toxicology & Safety", "NT-604(A) Biomedical Nanotechnology", "NT-604(B) Energy Nanotechnology", "NT-604(C) Polymer Nanotechnology"],
        "7": ["NT-701 Advanced Nanotechnology", "NT-702 Nano Manufacturing", "NT-703(A) Nano Medicine", "NT-703(B) Environmental Nanotechnology", "NT-703(C) Nano Robotics", "NT-704 Industrial Management & Entrepreneurship"],
        "8": ["NT-801 Recent Trends in Nanotechnology", "NT-802 Nanotechnology Applications", "NT-803(A) Advanced Functional Nanomaterials", "NT-803(B) Nano Energy Systems", "NT-803(C) Nano Product Design"]
    },
    marine: {
        "1": ["BT-101 Engineering Mathematics-I", "BT-102 Engineering Chemistry", "BT-103 English for Communication", "BT-104 Basic Electrical & Electronics Engineering", "BT-105 Engineering Graphics"],
        "2": ["BT-201 Engineering Mathematics-II", "BT-202 Engineering Physics", "BT-203 Basic Mechanical Engineering", "BT-204 Basic Civil Engineering & Mechanics", "BT-205 Basic Computer Engineering"],
        "3": ["BT-301 Mathematics-III", "MR-302 Applied Mechanics", "MR-303 Engineering Thermodynamics", "MR-304 Marine Engineering Drawing", "MR-305 Electrical Technology"],
        "4": ["BT-401 Mathematics-IV", "MR-402 Marine Boilers", "MR-403 Marine Diesel Engines", "MR-404 Fluid Mechanics & Hydraulic Machines", "MR-405 Marine Electrical Technology"],
        "5": ["MR-501 Naval Architecture", "MR-502 Marine Auxiliary Machinery", "MR-503(A) Ship Construction", "MR-503(B) Marine Heat Engines", "MR-503(C) Marine Refrigeration & Air Conditioning", "MR-504(A) Marine Automation", "MR-504(B) Marine Pollution & Control", "MR-504(C) Marine Materials"],
        "6": ["MR-601 Marine Power Plant", "MR-602 Marine Control Systems", "MR-603 Marine Electrical Machines", "MR-604(A) Marine Safety & Regulations", "MR-604(B) Ship Operation & Maintenance", "MR-604(C) Offshore Engineering"],
        "7": ["MR-701 Advanced Marine Engineering", "MR-702 Ship Design & Stability", "MR-703(A) Port & Harbour Engineering", "MR-703(B) Marine Renewable Energy", "MR-703(C) Marine Robotics", "MR-704 Industrial Management & Entrepreneurship"],
        "8": ["MR-801 Modern Marine Engineering", "MR-802 Recent Trends in Marine Engineering", "MR-803(A) LNG & Gas Carrier Technology", "MR-803(B) Marine Energy Management", "MR-803(C) Smart Ship Technology"]
    }
};

const commonFirstYearSubjects = {
    "1": ["BT-101 Engineering Chemistry", "BT-102 Mathematics-I", "BT-103 English for Communication", "BT-104 Basic Electrical & Electronics Engineering", "BT-105 Engineering Graphics"],
    "2": ["BT-201 Engineering Physics", "BT-202 Mathematics-II", "BT-203 Basic Mechanical Engineering", "BT-204 Basic Civil Engineering & Mechanics", "BT-205 Basic Computer Engineering"]
};

const years = Array.from({ length: 9 }, (_, index) => String(2026 - index));
const pageSize = 24;
const pyqPerfStartedAt = (window.performance?.now?.() || Date.now());
const pyqPerf = { dataMs: 0, renderMs: 0, repeatedMs: 0, totalMs: 0, source: "Local cache" };
let records = [];
let filteredRecords = [];
let visibleCount = pageSize;
let repeatedQuestions = [];
let repeatedVisibleCount = 8;
const repeatedQuestionLookup = new Map();
const pyqCanonicalSubjectUrl = "../assets/data/branch-subject-options.csv?v=8";
const pyqStaticIndexUrl = "../assets/data/pyq-index.json?v=2";
let pyqStaticContent = [];
let pyqStaticContentPromise = null;
let pyqCanonicalSubjects = [];
let pyqCanonicalSubjectsPromise = null;

async function pyqFetchCachedStatic(url, type = "json") {
    const absoluteUrl = new URL(url, window.location.href).href;
    const readResponse = (response) => type === "text" ? response.text() : response.json();

    if ("caches" in window) {
        const cache = await caches.open("engilearn-pyq-static-v3");
        const request = new Request(absoluteUrl, { cache: "force-cache" });
        const cached = await cache.match(request);
        if (cached) {
            fetch(request)
                .then((fresh) => {
                    if (fresh.ok) cache.put(request, fresh.clone()).catch(() => {});
                })
                .catch(() => {});
            return readResponse(cached.clone());
        }

        const response = await fetch(request);
        if (!response.ok) throw new Error(`Static PYQ request failed (${response.status})`);
        cache.put(request, response.clone()).catch(() => {});
        return readResponse(response);
    }

    const response = await fetch(absoluteUrl, { cache: "force-cache" });
    if (!response.ok) throw new Error(`Static PYQ request failed (${response.status})`);
    return readResponse(response);
}

const escapeHtml = (value) => String(value ?? "").replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
const getBranchName = (id) => pyqBranchLabels.get(id) || String(id || "All Branches").toUpperCase();

function parseCsvRows(csvText) {
    const rows = [];
    let row = [];
    let cell = "";
    let quoted = false;
    String(csvText || "").replace(/^\uFEFF/, "").split("").forEach((char, index, chars) => {
        if (char === '"') {
            if (quoted && chars[index + 1] === '"') {
                cell += '"';
                chars[index + 1] = "";
            } else {
                quoted = !quoted;
            }
            return;
        }
        if (char === "," && !quoted) {
            row.push(cell);
            cell = "";
            return;
        }
        if ((char === "\n" || char === "\r") && !quoted) {
            if (char === "\r" && chars[index + 1] === "\n") chars[index + 1] = "";
            row.push(cell);
            if (row.some((value) => String(value || "").trim())) rows.push(row);
            row = [];
            cell = "";
            return;
        }
        cell += char;
    });
    row.push(cell);
    if (row.some((value) => String(value || "").trim())) rows.push(row);
    if (!rows.length) return [];
    const headers = rows.shift().map((header) => String(header || "").trim());
    return rows.map((values) => Object.fromEntries(headers.map((header, index) => [header, values[index] || ""])));
}

function canonicalSubjectOptionFromRow(row) {
    const code = String(row["Subject Code"] || row.subjectCode || "").trim().toUpperCase().replace(/\s+/g, "-");
    const subject = String(row.Subject || row.subject || "").trim();
    const semester = String(row.Semester || row.semester || "").replace(/[^\d]/g, "");
    const branch = normalizeSourceBranchId(row.Branch || row.branch);
    if (!branch || !semester || !code || !subject) return null;
    return {
        branch,
        semester,
        code,
        codeKey: subjectCodeKey(code),
        subject,
        paperCount: Math.max(0, Number(row["Paper Count"] || row.paperCount || 0) || 0)
    };
}

function loadPyqCanonicalSubjects() {
    if (pyqCanonicalSubjectsPromise) return pyqCanonicalSubjectsPromise;
    pyqCanonicalSubjectsPromise = pyqFetchCachedStatic(pyqCanonicalSubjectUrl, "text")
        .then((csvText) => {
            pyqCanonicalSubjects = parseCsvRows(csvText).map(canonicalSubjectOptionFromRow).filter(Boolean);
            return pyqCanonicalSubjects;
        })
        .catch(() => {
            pyqCanonicalSubjects = [];
            return pyqCanonicalSubjects;
        });
    return pyqCanonicalSubjectsPromise;
}

function loadPyqStaticContent() {
    if (pyqStaticContentPromise) return pyqStaticContentPromise;
    pyqStaticContentPromise = pyqFetchCachedStatic(pyqStaticIndexUrl, "json")
        .then((items) => {
            pyqStaticContent = Array.isArray(items) ? items : [];
            return pyqStaticContent;
        })
        .catch(() => {
            pyqStaticContent = [];
            return pyqStaticContent;
        });
    return pyqStaticContentPromise;
}

function pyqContentWithStatic(content = []) {
    const backendItems = Array.isArray(content) ? content : [];
    return [...pyqStaticContent, ...backendItems];
}

function cachePyqPageContent(content) {
    const items = Array.isArray(content) ? content : [];
    const cacheable = items.length > 500
        ? items.filter((item) => !String(item.type || "").toLowerCase().includes("pyq"))
        : items;
    try {
        localStorage.setItem("admin_content", JSON.stringify(cacheable));
    } catch (error) {
        if (error?.name === "QuotaExceededError") localStorage.removeItem("admin_content");
    }
}

function isCommonFirstYearSemester(semester) {
    return ["1", "2"].includes(String(semester || "").replace(/[^\d]/g, ""));
}

function isCommonFirstYearSubjectCode(value) {
    return /^(?:BT|BE)[\s-]?(?:10[1-5]|20[1-5]|100[1-5]|200[1-5])$/i.test(String(value || "").trim());
}

function isCommonFirstYearRecord(record) {
    if (!isCommonFirstYearSemester(record?.semester)) return false;
    const codes = [
        record?.subjectCode,
        ...Object.values(record?.subjectCodesByBranch || {}),
        ...Object.values(record?.sourceSubjectCodesByBranch || {})
    ];
    return codes.some(isCommonFirstYearSubjectCode);
}

function isCommonSubjectRecord(record) {
    if (isCommonFirstYearRecord(record)) return true;
    const groups = Array.isArray(record?.branchSubjectGroups) ? record.branchSubjectGroups : [];
    const branchIds = new Set((record?.branchIds || [record?.branchId]).filter(Boolean));
    const sourceBranchIds = new Set((record?.sourceBranchIds || []).filter(Boolean));
    const groupBranches = new Set(groups.map((group) => group.branchId || group.sourceBranchId || group.branch).filter(Boolean));
    return groups.length > 1 || branchIds.size > 1 || sourceBranchIds.size > 1 || groupBranches.size > 1;
}

function pyqCommonSubjectSortValue(record) {
    return isCommonSubjectRecord(record) ? 0 : 1;
}

function branchMatches(filter, record) {
    if (filter === "all" || isCommonFirstYearRecord(record)) return true;
    const sourceBranches = sourceBranchesForRecord(record);
    const preferred = primarySourceBranchesForUi(filter);
    if (sourceBranches.length && preferred.length) {
        const sourceMatch = sourceBranches.some((branchId) => preferred.includes(branchId));
        return sourceMatch && sharedSourceRecordMatches(filter, record);
    }
    return (record.branchIds || [record.branchId]).includes(filter);
}

function sharedSourceRecordMatches(branch, record) {
    if (!pyqStrictSharedBranches.has(branch) || isCommonFirstYearRecord(record)) return true;
    const prefixes = pyqCoreSubjectPrefixes[branch] || [];
    return prefixes.includes(subjectCodePrefix(subjectCodeForBranch(record, branch)));
}

function sourceBranchesForRecord(record) {
    return Array.isArray(record?.sourceBranchIds) && record.sourceBranchIds.length
        ? record.sourceBranchIds
        : (record?.branchIds || [record?.branchId]).map(normalizeSourceBranchId).filter(Boolean);
}

function primarySourceBranchesForUi(branchId) {
    return pyqPrimarySourceBranches[branchId] || [normalizeSourceBranchId(branchId)].filter(Boolean);
}

function primaryBranchMatches(filter, record) {
    if (filter === "all" || isCommonFirstYearRecord(record)) return true;
    const sourceBranches = sourceBranchesForRecord(record);
    const preferred = primarySourceBranchesForUi(filter);
    return preferred.length
        ? sourceBranches.some((branchId) => preferred.includes(branchId)) && sharedSourceRecordMatches(filter, record)
        : branchMatches(filter, record);
}

function sourceBranchForUi(record, branchId = "all") {
    const sourceBranches = sourceBranchesForRecord(record);
    if (branchId === "all") return sourceBranches[0] || "";
    const preferred = primarySourceBranchesForUi(branchId);
    return preferred.find((sourceBranch) => sourceBranches.includes(sourceBranch))
        || sourceBranches.find((sourceBranch) => resolvePyqBranchId(sourceBranch) === branchId)
        || sourceBranches[0]
        || "";
}

function branchMetadataValue(record, field, branchId = "all") {
    const map = record?.[field] && typeof record[field] === "object" ? record[field] : {};
    const applicable = record.branchIds || [record.branchId];
    const sourceBranch = sourceBranchForUi(record, branchId);
    if (sourceBranch && map[sourceBranch]) return String(map[sourceBranch] || "").trim();
    const selectedBranch = branchId !== "all" && applicable.includes(branchId) ? branchId : applicable[0];
    return String(map[selectedBranch] || "").trim();
}

function subjectCodeForBranch(record, branchId = "all") {
    return branchMetadataValue(record, "sourceSubjectCodesByBranch", branchId)
        || branchMetadataValue(record, "subjectCodesByBranch", branchId)
        || String(record.subjectCode || "").trim();
}

function subjectForBranch(record, branchId = "all") {
    return branchMetadataValue(record, "sourceSubjectsByBranch", branchId)
        || branchMetadataValue(record, "subjectsByBranch", branchId)
        || String(record.subject || "").trim();
}

function branchSubjectGroupsFor(record, branchId = "all") {
    const rawGroups = Array.isArray(record?.branchSubjectGroups) ? record.branchSubjectGroups : [];
    const groups = rawGroups.map((group) => {
        const rawBranch = group.sourceBranchId || group.branchId || group.branch || "";
        const resolvedBranch = resolvePyqBranchId(group.branchId || rawBranch);
        const sourceBranchId = normalizeSourceBranchId(rawBranch || group.branchId);
        return {
            branchId: resolvedBranch,
            sourceBranchId,
            semester: String(group.semester || record.semester || ""),
            subjectCode: String(group.subjectCode || "").trim(),
            subject: String(group.subject || "").trim()
        };
    }).filter((group) => group.branchId && group.subjectCode && group.subject);
    if (!groups.length) {
        return [{
            branchId: branchId === "all" ? (record.branchId || "all") : branchId,
            sourceBranchId: sourceBranchForUi(record, branchId),
            semester: String(record.semester || ""),
            subjectCode: subjectCodeForBranch(record, branchId),
            subject: subjectForBranch(record, branchId)
        }];
    }
    if (branchId === "all") return groups;
    const preferred = primarySourceBranchesForUi(branchId);
    const exact = groups.filter((group) => group.branchId === branchId || preferred.includes(group.sourceBranchId));
    return exact.length ? exact : groups.filter((group) => (record.branchIds || []).includes(branchId));
}

function legacySubjectCodeForBranch(record, branchId = "all") {
    return branchMetadataValue(record, "subjectCodesByBranch", branchId)
        || String(record.subjectCode || "").trim();
}

function prefixedSubjectCode(record, branchId = "all") {
    const code = subjectCodeForBranch(record, branchId);
    if (!code) return "";
    if (/^[A-Z]{1,6}[\s-]?\d{3,4}(?:[\s-]?[A-Z])?(?:\s*\(GS\))?$/i.test(code)) {
        return code.toUpperCase().replace(/^([A-Z]{1,6})\s+(\d)/, "$1-$2");
    }
    const applicable = record.branchIds || [record.branchId];
    const selectedBranch = branchId !== "all" && applicable.includes(branchId) ? branchId : applicable[0];
    const prefix = pyqBranchCodePrefixes[selectedBranch] || String(selectedBranch || "").toUpperCase();
    return prefix ? `${prefix} ${code}` : code;
}

function groupsForBranch(id) {
    if (pyqSubjects[id]) return { ...commonFirstYearSubjects, ...pyqSubjects[id] };
    const name = getBranchName(id);
    return {
        ...commonFirstYearSubjects,
        "3-4": [`${name} Core I`, "Engineering Mathematics", "Applied Science"],
        "5-6": [`${name} Core II`, `${name} Design`, "Industrial Practice"],
        "7-8": [`${name} Advanced`, "Project Planning", "Professional Elective"]
    };
}

function expandSemesterGroup(group) {
    const value = String(group || "").trim();
    if (!value.includes("-")) return [value];
    const [from, to] = value.split("-").map(Number);
    if (!Number.isFinite(from) || !Number.isFinite(to) || from > to) return [value];
    return Array.from({ length: to - from + 1 }, (_, index) => String(from + index));
}

function makeCode(branchId, semester, index = 0) {
    const prefix = String(branchId || "GEN").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 5);
    const semesterNumber = Number(String(semester).split("-")[0]) || 1;
    return `${prefix}-${semesterNumber * 100 + index + 1}`;
}

function parseCatalogSubjectLine(value) {
    const raw = String(value || "").trim().replace(/\s+/g, " ");
    const match = raw.match(/^([A-Z]{1,6}[\s-]?\d{3,4}(?:\([A-Z]\))?)\s*(?:[-â€“â€”]\s*)?(.+)$/i);
    if (!match) return { subjectCode: "", subject: raw };
    const subjectCode = match[1].toUpperCase().replace(/\s+/g, "-").replace(/^([A-Z]{1,6})-?(\d)/, "$1-$2");
    const subject = String(match[2] || raw).trim();
    return { subjectCode, subject };
}

function buildCatalog() {
    return pyqBranches.flatMap(([branchId, branch]) => Object.entries(groupsForBranch(branchId)).flatMap(([semesterGroup, subjects]) => (
        expandSemesterGroup(semesterGroup).flatMap((semester) => subjects.flatMap((subjectLine, subjectIndex) => {
            const parsed = parseCatalogSubjectLine(subjectLine);
            const subjectCode = parsed.subjectCode || makeCode(branchId, semester, subjectIndex);
            const subject = parsed.subject || String(subjectLine || "Subject").trim();
            return years.map((year) => ({
                id: `${branchId}-${semester}-${subjectCode}-${subjectIndex}-${year}`,
                branchId, branch, semester, subject, year,
                subjectCode,
                title: `${subjectCode} ${subject} RGPV ${year} Question Paper`,
                source: "RGPV catalog",
                uploaded: false
            }));
        }))
    )));
}

function normalizeUpload(item, index) {
    const branchText = String(item.branch || "All Branches");
    const rawBranchIds = Array.isArray(item.branchIds) && item.branchIds.length
        ? item.branchIds
        : [item.branchId, branchText, ...(Array.isArray(item.branchNames) ? item.branchNames : [])];
    const sourceBranchIds = [...new Set(rawBranchIds
        .map(normalizeSourceBranchId)
        .filter(Boolean))];
    const branchIds = [...new Set(rawBranchIds
        .map(resolvePyqBranchId)
        .filter((id) => pyqBranchLabels.has(id)))];
    if (!branchIds.length) branchIds.push("all");
    const branchNames = branchIds.map((id) => id === "all" ? "All Branches" : (pyqBranchLabels.get(id) || id.toUpperCase()));
    const branchId = branchIds[0] || "all";
    const semester = String(item.semester || "All");
    const subject = String(item.subject || item.title || "General");
    const subjectCodesByBranch = {};
    const sourceSubjectCodesByBranch = {};
    Object.entries(item.subjectCodesByBranch || {}).forEach(([rawBranch, code]) => {
        const sourceBranch = normalizeSourceBranchId(rawBranch);
        if (sourceBranch && !sourceSubjectCodesByBranch[sourceBranch]) sourceSubjectCodesByBranch[sourceBranch] = String(code || "").trim();
        const resolvedBranch = resolvePyqBranchId(rawBranch);
        if (resolvedBranch && !subjectCodesByBranch[resolvedBranch]) subjectCodesByBranch[resolvedBranch] = String(code || "").trim();
    });
    const subjectsByBranch = {};
    const sourceSubjectsByBranch = {};
    Object.entries(item.subjectsByBranch || {}).forEach(([rawBranch, name]) => {
        const sourceBranch = normalizeSourceBranchId(rawBranch);
        if (sourceBranch && !sourceSubjectsByBranch[sourceBranch]) sourceSubjectsByBranch[sourceBranch] = String(name || "").trim();
        const resolvedBranch = resolvePyqBranchId(rawBranch);
        if (resolvedBranch && !subjectsByBranch[resolvedBranch]) subjectsByBranch[resolvedBranch] = String(name || "").trim();
    });
    const branchSubjectGroups = [];
    (Array.isArray(item.branchSubjectGroups) ? item.branchSubjectGroups : []).forEach((group) => {
        const rawBranch = group.sourceBranchId || group.branchId || group.branch || "";
        const sourceBranch = normalizeSourceBranchId(rawBranch);
        const resolvedBranch = resolvePyqBranchId(group.branchId || rawBranch);
        const subjectCode = String(group.subjectCode || "").trim();
        const subjectName = String(group.subject || "").trim();
        if (!resolvedBranch || !subjectCode || !subjectName) return;
        branchSubjectGroups.push({
            branchId: resolvedBranch,
            sourceBranchId: sourceBranch || normalizeSourceBranchId(resolvedBranch),
            semester: String(group.semester || semester),
            subjectCode,
            subject: subjectName
        });
    });
    return {
        id: `upload-${item.id || index}`,
        branchId,
        branchIds,
        sourceBranchIds,
        branch: branchNames.join(", ") || branchText,
        semester,
        subject,
        year: String(item.year || item.examYear || "Admin Upload"),
        subjectCode: String(item.subjectCode || item.code || makeCode(branchId, semester, index)),
        subjectCodesByBranch,
        sourceSubjectCodesByBranch,
        subjectsByBranch,
        sourceSubjectsByBranch,
        branchSubjectGroups,
        title: String(item.title || `${subject} Question Paper`),
        source: "Content Admin upload",
        uploadedBy: String(item.importedBy || item.createdBy || "Content Admin").trim(),
        uploaded: true,
        url: String(item.fileUrl || item.filePath || item.url || ""),
        fileName: String(item.fileName || item.filename || "").trim(),
        topic: String(item.topic || "Uploaded by Content Admin"),
        session: String(item.session || item.examSession || "")
    };
}

function pyqRecordDuplicateKey(record) {
    const branchKey = [...new Set((record.branchIds || [record.branchId])
        .map((id) => String(id || "").trim().toLowerCase())
        .filter(Boolean))].sort().join(",");
    const subjectCode = String(record.subjectCode || "").trim().toLowerCase().replace(/[^a-z0-9]/g, "");
    const subject = String(record.subject || "").trim().toLowerCase().replace(/\s+/g, " ");
    return [
        branchKey || "all",
        String(record.semester || "").replace(/[^\d]/g, ""),
        subjectCode || subject,
        subject,
        String(record.year || "").trim(),
        String(record.session || "").trim().toLowerCase()
    ].join("|");
}

function dedupePyqRecords(list) {
    const byKey = new Map();
    list.forEach((record) => {
        const key = pyqRecordDuplicateKey(record);
        const existing = byKey.get(key);
        if (!existing || (!existing.url && record.url) || (!existing.uploaded && record.uploaded)) {
            byKey.set(key, record);
        }
    });
    return [...byKey.values()];
}

function semesterMatches(filter, semester) {
    if (filter === "all") return true;
    const value = String(semester || "");
    if (filter === value) return true;
    if (filter.includes("-")) {
        const [from, to] = filter.split("-").map(Number);
        const numeric = Number(value);
        return Number.isFinite(numeric) && numeric >= from && numeric <= to;
    }
    return false;
}

function subjectOptionValue(record, branch = "all") {
    const code = subjectCodeForBranch(record, branch);
    const subject = subjectForBranch(record, branch);
    if (code && subject) return `code:${subjectCodeKey(code)}::subject:${normalizedSubjectName(subject)}`;
    if (code) return `code:${subjectCodeKey(code)}`;
    return `subject:${normalizedSubjectName(subject)}`;
}

function legacySubjectOptionValue(record) {
    const code = String(record.subjectCode || "").trim();
    return `${code}::${String(record.subject || "").trim()}`;
}

function normalizedSubjectName(value) {
    return String(value || "")
        .trim()
        .toLowerCase()
        .replace(/&/g, " and ")
        .replace(/[^a-z0-9\s]/g, " ")
        .replace(/\biii\b/g, "3")
        .replace(/\bii\b/g, "2")
        .replace(/\bi\b/g, "1")
        .replace(/\s+/g, " ");
}

function subjectNamesAreAliases(left, right) {
    const smart = window.EngiLearnSubjectSimilarity;
    if (smart?.isSimilar?.(left, right)) return true;
    const a = normalizedSubjectName(left);
    const b = normalizedSubjectName(right);
    if (!a || !b) return false;
    if (a === b) return true;
    const shorter = a.length <= b.length ? a : b;
    const longer = a.length > b.length ? a : b;
    return shorter.length >= 16 && longer.startsWith(`${shorter} `);
}

function subjectCodeKey(value) {
    return String(value || "").trim().toLowerCase().replace(/\s+/g, "");
}

function subjectCodeNumberKey(value) {
    const match = subjectCodeKey(value).match(/(\d{3,4})/);
    return match?.[1] || "";
}

function legacySubjectCodeKey(value) {
    const normalized = subjectCodeKey(value);
    const match = normalized.match(/(\d+(?:-[a-z0-9]+)?)$/i);
    return match?.[1] || normalized;
}

function selectedSubjectParts(value) {
    const raw = String(value || "").trim();
    if (!raw || raw === "all") return { code: "", subject: "" };
    if (raw.startsWith("code:")) {
        const payload = raw.slice(5);
        const [codePart, subjectPart = ""] = payload.split("::subject:");
        return {
            code: codePart,
            subject: subjectPart.replace(/\s+/g, " ").trim()
        };
    }
    if (raw.startsWith("subject:")) return { code: "", subject: raw.slice(8).replace(/\s+/g, " ").trim() };
    if (raw.includes("::")) {
        const [codePart, ...subjectParts] = raw.split("::");
        return { code: codePart, subject: subjectParts.join("::").replace(/\s+/g, " ").trim() };
    }
    return { code: "", subject: raw };
}

function displaySubjectName(value) {
    return String(value || "")
        .replace(/\b\w/g, (letter) => letter.toUpperCase())
        .replace(/\bAnd\b/g, "and")
        .replace(/\bOf\b/g, "of")
        .replace(/\bTo\b/g, "to");
}

function subjectMatches(filter, record) {
    if (filter === "all") return true;
    const branch = document.getElementById("libraryPyqBranch")?.value || "all";
    const branchGroups = branchSubjectGroupsFor(record, branch);
    const matchesGroup = (recordCode, recordSubject) => {
        if (filter === subjectOptionValue({ ...record, subjectCode: recordCode, subject: recordSubject }, branch)) return true;
        if (filter === `${recordCode}::${recordSubject}`) return true;
        if (filter.startsWith("code:")) {
            const payload = filter.slice(5);
            const [codePart, subjectPart = ""] = payload.split("::subject:");
            const codeMatches = subjectCodeKey(recordCode) === subjectCodeKey(codePart);
            return codeMatches && (!subjectPart || subjectNamesAreAliases(recordSubject, subjectPart));
        }
        if (filter.startsWith("subject:")) return subjectNamesAreAliases(recordSubject, filter.slice(8));
        if (filter.includes("::")) {
            const [codePart, ...subjectParts] = filter.split("::");
            return subjectCodeKey(recordCode) === subjectCodeKey(codePart)
                && subjectNamesAreAliases(recordSubject, subjectParts.join("::"));
        }
        return subjectNamesAreAliases(filter, recordSubject);
    };
    if (branchGroups.some((group) => matchesGroup(group.subjectCode, group.subject))) return true;
    const recordCode = subjectCodeForBranch(record, branch);
    const recordSubject = subjectForBranch(record, branch);
    if (filter === subjectOptionValue(record, branch)) return true;
    if (filter === legacySubjectOptionValue(record)) return true;
    if (filter.startsWith("code:")) {
        const payload = filter.slice(5);
        const [codePart, subjectPart = ""] = payload.split("::subject:");
        const codeMatches = subjectCodeKey(recordCode) === subjectCodeKey(codePart);
        return codeMatches && (!subjectPart || subjectNamesAreAliases(recordSubject, subjectPart));
    }
    if (filter.startsWith("subject:")) return subjectNamesAreAliases(recordSubject, filter.slice(8));
    if (filter.includes("::")) {
        const [codePart, ...subjectParts] = filter.split("::");
        return subjectCodeKey(recordCode) === subjectCodeKey(codePart)
            && subjectNamesAreAliases(recordSubject, subjectParts.join("::"));
    }
    return subjectNamesAreAliases(filter, recordSubject);
}

function subjectGroupSummary(list, branch) {
    const groups = new Map();
    list.forEach((record) => {
        branchSubjectGroupsFor(record, branch).forEach((branchGroup) => {
            const subjectCode = branchGroup.subjectCode || subjectCodeForBranch(record, branch);
            const codeKey = subjectCodeKey(subjectCode);
            if (!codeKey) return;
            const subject = branchGroup.subject || subjectForBranch(record, branch) || "General";
            const key = `code:${codeKey}`;
            let group = groups.get(key);
            if (!group) {
                group = {
                    key,
                    codeKey,
                    code: prefixedSubjectCode({ ...record, subjectCode }, branch),
                    subjectCounts: new Map(),
                    subjectPaperCounts: new Map(),
                    papers: 0,
                    years: new Set()
                };
                groups.set(key, group);
            }
            group.subjectCounts.set(subject, (group.subjectCounts.get(subject) || 0) + 1);
            group.subjectPaperCounts.set(subject, (group.subjectPaperCounts.get(subject) || 0) + 1);
            group.papers += 1;
            if (/^\d{4}$/.test(String(record.year))) group.years.add(String(record.year));
        });
    });
    return [...groups.values()].map((group) => {
        const subjects = [...group.subjectCounts.entries()]
            .sort((a, b) => b[1] - a[1] || b[0].length - a[0].length || a[0].localeCompare(b[0]));
        const primarySubject = subjects[0]?.[0] || "General";
        const subjectPreview = subjects.slice(0, 4).map(([name]) => name);
        const extraSubjects = Math.max(0, subjects.length - 1);
        return {
            ...group,
            value: group.codeKey
                ? `code:${group.codeKey}`
                : `subject:${normalizedSubjectName(primarySubject)}`,
            primarySubject,
            subjectPreview,
            subjectCount: subjects.length,
            label: group.code ? `${group.code} - ${primarySubject}${extraSubjects ? ` (+${extraSubjects} more)` : ""}` : primarySubject
        };
    });
}

function subjectCodeGroupSummary(list, branch) {
    return subjectGroupSummary(list, branch);
}

function subjectCodePrefix(value) {
    return String(value || "").trim().toUpperCase().match(/^([A-Z]{1,6})[\s-]?\d/)?.[1] || "";
}

function trimToBranchCoreSubjects(groups, branch, semester) {
    if (!branch || branch === "all" || semester === "all") return groups;
    const numericSemester = Number(String(semester).replace(/[^\d]/g, ""));
    if (!Number.isFinite(numericSemester) || numericSemester < 3) return groups;
    const prefixes = pyqCoreSubjectPrefixes[branch] || [];
    if (!prefixes.length) return groups;
    const coreGroups = groups.filter((group) => prefixes.includes(subjectCodePrefix(group.code)));
    if (pyqStrictSharedBranches.has(branch)) return coreGroups;
    return coreGroups.length >= 3 ? coreGroups : groups;
}

function canonicalSourceBranchesForUi(branch) {
    if (!branch || branch === "all") return [];
    const preferred = primarySourceBranchesForUi(branch);
    const fallback = normalizeSourceBranchId(branch);
    return [...new Set([...preferred, fallback].filter(Boolean))];
}

function canonicalSubjectGroupsForSelection(branch, semester) {
    if (!pyqCanonicalSubjects.length) return [];
    const selectedBranch = branch || "all";
    const selectedSemester = semester || "all";
    const sourceBranches = selectedBranch === "all" ? [] : canonicalSourceBranchesForUi(selectedBranch);
    if (selectedBranch !== "all" && !sourceBranches.length) return [];
    const exactRows = pyqCanonicalSubjects.filter((row) => (
        (selectedBranch === "all" || sourceBranches.includes(row.branch))
        && (selectedSemester === "all" || String(row.semester) === String(selectedSemester))
    ));
    const commonFirstYearRows = selectedBranch !== "all" && isCommonFirstYearSemester(selectedSemester)
        ? pyqCanonicalSubjects.filter((row) => (
            String(row.semester) === String(selectedSemester) && isCommonFirstYearSubjectCode(row.code)
        ))
        : [];
    const candidateRows = exactRows.length ? exactRows : commonFirstYearRows;
    const effectiveRows = isCommonFirstYearSemester(selectedSemester)
        ? [...candidateRows.reduce((map, row) => {
            if (!map.has(row.codeKey)) map.set(row.codeKey, row);
            return map;
        }, new Map()).values()]
        : candidateRows;
    const groups = new Map();
    effectiveRows.forEach((row) => {
        const subjectKey = normalizedSubjectName(row.subject);
        const key = `code:${row.codeKey}::subject:${subjectKey}`;
        if (!groups.has(key)) {
            groups.set(key, {
                key,
                codeKey: row.codeKey,
                code: row.code,
                subjectCounts: new Map(),
                papers: 0,
                years: new Set(),
                value: key
            });
        }
        const group = groups.get(key);
        group.subjectCounts.set(row.subject, (group.subjectCounts.get(row.subject) || 0) + Math.max(row.paperCount, 1));
        group.papers += Math.max(row.paperCount, 1);
    });
    return [...groups.values()].map((group) => {
        const subjects = [...group.subjectCounts.entries()]
            .sort((a, b) => b[1] - a[1] || b[0].length - a[0].length || a[0].localeCompare(b[0]));
        const primarySubject = subjects[0]?.[0] || "General";
        const extraSubjects = Math.max(0, subjects.length - 1);
        return {
            ...group,
            primarySubject,
            subjectPreview: subjects.slice(0, 4).map(([name]) => name),
            subjectCount: subjects.length,
            label: `${group.code} - ${primarySubject}${extraSubjects ? ` (+${extraSubjects} more)` : ""}`
        };
    });
}

function subjectGroupsForSelection({ branch, semester, includeSubject = false } = {}) {
    const sourceRecords = recordsForSubjectPicker({ includeSubject });
    const canonicalGroups = canonicalSubjectGroupsForSelection(branch || "all", semester || "all");
    if (canonicalGroups.length) return canonicalGroups;
    const groups = subjectGroupSummary(sourceRecords, branch || "all");
    return trimToBranchCoreSubjects(groups, branch || "all", semester || "all");
}

function subjectSelectionLabel(value, branch = "all") {
    if (value === "all") return "Select Subject";
    const matches = records.filter((record) => branchMatches(branch, record) && subjectMatches(value, record));
    const group = subjectGroupSummary(matches, branch)[0];
    if (group) return group.label;
    const parts = selectedSubjectParts(value);
    const code = parts.code ? parts.code.toUpperCase() : "";
    const subject = displaySubjectName(parts.subject || value.split("::").pop());
    return [code, subject].filter(Boolean).join(" - ");
}

function setOptions(select, options, selected = "all") {
    select.innerHTML = options.map(([value, label]) => `<option value="${escapeHtml(value)}">${escapeHtml(label)}</option>`).join("");
    select.value = options.some(([value]) => value === selected) ? selected : "all";
}

function ensurePyqStateControls() {
    if (document.getElementById("libraryPyqBranch")) return;
    const root = document.createElement("div");
    root.id = "pyqInternalState";
    root.hidden = true;
    root.setAttribute("aria-hidden", "true");
    root.style.display = "none";
    root.innerHTML = `
        <select id="libraryPyqBranch"></select>
        <select id="libraryPyqSemester"></select>
        <select id="libraryPyqSubject"></select>
        <select id="libraryPyqYear"></select>
        <input id="libraryPyqSearch" type="search">
        <button id="resetPyqLibraryFilters" type="button"></button>
        <h2 id="pyqLibraryResultTitle"></h2>
        <p id="pyqLibraryResultText"></p>
        <div id="pyqLibraryGrid"></div>
        <button id="loadMorePyqLibrary" type="button" hidden></button>
    `;
    (document.querySelector(".pyq-library-page") || document.body).appendChild(root);
}

function recordsForSelection({ includeSemester = true, includeSubject = true } = {}) {
    const branch = document.getElementById("libraryPyqBranch").value;
    const semester = document.getElementById("libraryPyqSemester").value;
    const subject = document.getElementById("libraryPyqSubject").value;
    return records.filter((record) => (
        branchMatches(branch, record)
        && (!includeSemester || semesterMatches(semester, record.semester))
        && (!includeSubject || subjectMatches(subject, record))
    ));
}

function recordsForSubjectPicker({ includeSubject = false } = {}) {
    const branch = document.getElementById("libraryPyqBranch").value;
    const semester = document.getElementById("libraryPyqSemester").value;
    const subject = document.getElementById("libraryPyqSubject").value;
    return records.filter((record) => (
        primaryBranchMatches(branch, record)
        && semesterMatches(semester, record.semester)
        && (!includeSubject || subjectMatches(subject, record))
    ));
}

function fillSemesterOptions(selected = "all") {
    const branch = document.getElementById("libraryPyqBranch").value;
    const semesterSet = new Set(Array.from({ length: 8 }, (_, index) => String(index + 1)));
    records
        .filter((record) => branchMatches(branch, record))
        .map((record) => String(record.semester || ""))
        .filter(Boolean)
        .forEach((semester) => semesterSet.add(semester));
    const semesters = [...semesterSet]
        .sort((a, b) => Number(a.split("-")[0]) - Number(b.split("-")[0]));
    if (selected.includes("-") && !semesters.includes(selected)) {
        const hasGroupedMatch = records.some((record) => (
            branchMatches(branch, record) && semesterMatches(selected, record.semester)
        ));
        if (hasGroupedMatch) semesters.unshift(selected);
    }
    setOptions(
        document.getElementById("libraryPyqSemester"),
        [["all", "All Semesters"], ...semesters.map((semester) => [semester, `Semester ${semester}`])],
        selected
    );
}

function fillSubjectOptions(selected = "all") {
    const branch = document.getElementById("libraryPyqBranch").value;
    const semester = document.getElementById("libraryPyqSemester").value;
    const sourceRecords = recordsForSubjectPicker({ includeSubject: false });
    const groups = subjectGroupsForSelection({ branch, semester });
    const subjects = groups
        .map((group) => [group.value, group.label])
        .sort((a, b) => a[1].localeCompare(b[1], undefined, { numeric: true }));
    const selectedRecord = sourceRecords.find((record) => subjectMatches(selected, record));
    const selectedCodeKey = selectedRecord && subjectCodeKey(subjectCodeForBranch(selectedRecord, branch));
    const selectedGroup = selectedRecord && groups.find((group) => (
        (selectedCodeKey && group.codeKey === selectedCodeKey)
        || subjectMatches(group.value, selectedRecord)
        || subjectNamesAreAliases(group.primarySubject, selectedRecord.subject)
    ));
    const selectedValue = selected === "all"
        ? "all"
        : subjects.some(([value]) => value === selected)
        ? selected
        : selectedGroup?.value || "all";
    setOptions(document.getElementById("libraryPyqSubject"), [["all", `All Subjects & Codes (${subjects.length})`], ...subjects], selectedValue);
}

function fillYearOptions(selected = "all") {
    const availableYears = [...new Set(recordsForSelection()
        .map((record) => String(record.year || ""))
        .filter((year) => /^\d{4}$/.test(year)))]
        .sort((a, b) => Number(b) - Number(a));
    setOptions(
        document.getElementById("libraryPyqYear"),
        [["all", `All Years (${availableYears.length})`], ...availableYears.map((year) => [year, year])],
        selected
    );
}

function pyqSelection() {
    return {
        branch: document.getElementById("libraryPyqBranch").value,
        semester: document.getElementById("libraryPyqSemester").value,
        subject: document.getElementById("libraryPyqSubject").value,
        year: document.getElementById("libraryPyqYear").value
    };
}

function pyqSelectionUrl(next = {}) {
    const current = pyqSelection();
    const params = new URLSearchParams({
        branch: next.branch ?? current.branch,
        semester: next.semester ?? current.semester,
        subject: next.subject ?? current.subject,
        year: next.year ?? current.year
    });
    return `${location.pathname}?${params.toString()}`;
}

function renderPyqCrumbs(selection) {
    const parts = [
        ["branch", selection.branch === "all" ? "All Branches" : getBranchName(selection.branch), pyqSelectionUrl({ branch: "all", semester: "all", subject: "all", year: "all" })],
        ["semester", selection.semester === "all" ? "Select Semester" : `Semester ${selection.semester}`, pyqSelectionUrl({ semester: "all", subject: "all", year: "all" })],
        ["subject", subjectSelectionLabel(selection.subject, selection.branch), pyqSelectionUrl({ subject: "all", year: "all" })]
    ];
    return parts.map(([step, label, href], index) => {
        const active = (step === "branch" && selection.branch !== "all")
            || (step === "semester" && selection.semester !== "all")
            || (step === "subject" && selection.subject !== "all");
        return `<a class="${active ? "active" : ""}" href="${escapeHtml(href)}">
            <span>${index + 1}</span>${escapeHtml(label)}
        </a>`;
    }).join("");
}

function optionsFromSelect(id) {
    const select = document.getElementById(id);
    return select ? Array.from(select.options).map((option) => [option.value, option.textContent.trim()]) : [];
}

function flowSelectMarkup({ label, id, value, options, disabled = false }) {
    return `<label>${escapeHtml(label)}
        <select id="${escapeHtml(id)}" data-pyq-flow-select="${escapeHtml(value)}" ${disabled ? "disabled" : ""}>
            ${options.map(([optionValue, optionLabel]) => `<option value="${escapeHtml(optionValue)}" ${optionValue === pyqSelection()[value] ? "selected" : ""}>${escapeHtml(optionLabel)}</option>`).join("")}
        </select>
    </label>`;
}

function renderPyqPicklists(selection) {
    const branchOptions = [["all", `All Branches (${pyqBranches.length})`], ...pyqBranches.map(([branchId]) => [branchId, pyqBranchOptionLabel(branchId)])];
    const semesterOptions = optionsFromSelect("libraryPyqSemester");
    const subjectOptions = optionsFromSelect("libraryPyqSubject");
    const yearOptions = optionsFromSelect("libraryPyqYear");
    document.getElementById("pyqStepPicklists").innerHTML = [
        flowSelectMarkup({ label: "Branch", id: "pyqFlowBranch", value: "branch", options: branchOptions }),
        flowSelectMarkup({ label: "Semester", id: "pyqFlowSemester", value: "semester", options: semesterOptions, disabled: selection.branch === "all" }),
        flowSelectMarkup({ label: "Subject with Code", id: "pyqFlowSubject", value: "subject", options: subjectOptions, disabled: selection.branch === "all" || selection.semester === "all" }),
        flowSelectMarkup({ label: "Year", id: "pyqFlowYear", value: "year", options: yearOptions, disabled: selection.subject === "all" })
    ].join("");
}

function recordsForBranch(branchId) {
    return records.filter((record) => primaryBranchMatches(branchId, record));
}

function countDistinctSubjects(list, branch = "all", semester = "all") {
    const canonicalGroups = canonicalSubjectGroupsForSelection(branch, semester);
    if (canonicalGroups.length) return canonicalGroups.length;
    return trimToBranchCoreSubjects(subjectCodeGroupSummary(list, branch), branch, semester).length;
}

function renderBranchStep() {
    document.getElementById("pyqStepTitle").textContent = "Select Branch";
    document.getElementById("pyqStepText").textContent = "Choose your engineering branch first. The next page will show semester cards for that branch.";
    document.getElementById("pyqStepGrid").innerHTML = pyqBranches.map(([branchId, branchName], index) => {
        const branchRecords = recordsForBranch(branchId);
        const subjectCount = countDistinctSubjects(branchRecords, branchId, "all");
        const paperCount = branchRecords.length;
        const code = pyqBranchCodes[branchId] || branchId.toUpperCase();
        const href = pyqSelectionUrl({ branch: branchId, semester: "all", subject: "all", year: "all" });
        return `<a class="pyq-step-card" href="${escapeHtml(href)}" data-pyq-step-branch="${escapeHtml(branchId)}">
            <span class="pyq-step-index">#${index + 1} ${escapeHtml(code)}</span>
            <h3>${escapeHtml(branchName)}</h3>
            <p>${subjectCount} subjects with subject codes available for PYQ search.</p>
            <div class="pyq-step-meta">
                <span><strong>${paperCount}</strong> papers</span>
                <span><strong>8</strong> semesters</span>
            </div>
        </a>`;
    }).join("");
}

function renderSemesterStep(selection) {
    const branchRecords = recordsForBranch(selection.branch);
    const currentUser = JSON.parse(localStorage.getItem("mini_currentUser") || "null") || {};
    const canUpload = ["admin", "content admin"].includes(String(currentUser.role || "").toLowerCase());
    document.getElementById("pyqStepTitle").textContent = `${getBranchName(selection.branch)} Semesters`;
    document.getElementById("pyqStepText").textContent = "Select a semester to open all subjects with their subject codes.";
    document.getElementById("pyqStepGrid").innerHTML = Array.from({ length: 8 }, (_, index) => String(index + 1)).map((semester) => {
        const semesterRecords = branchRecords.filter((record) => semesterMatches(semester, record.semester));
        const subjectCount = countDistinctSubjects(semesterRecords, selection.branch, semester);
        const href = pyqSelectionUrl({ branch: selection.branch, semester, subject: "all", year: "all" });
        if (!semesterRecords.length || !subjectCount) {
            const uploadUrl = `admin.html?section=pyq-manager&branch=${encodeURIComponent(selection.branch)}&semester=${encodeURIComponent(semester)}`;
            return `<article class="pyq-step-card pyq-step-card-compact pyq-step-card-empty" data-pyq-step-semester="${escapeHtml(semester)}">
                <span class="pyq-step-index">Semester ${escapeHtml(semester)}</span>
                <h3>Semester ${escapeHtml(semester)}</h3>
                <p>Branch-specific PYQ papers have not been uploaded yet.</p>
                <div class="pyq-step-meta">
                    <span><strong>0</strong> papers</span>
                    <span><strong>Upload</strong> pending</span>
                </div>
                ${canUpload ? `<a class="pyq-btn" href="${escapeHtml(uploadUrl)}"><i class="fas fa-file-arrow-up"></i> Add PYQ</a>` : ""}
            </article>`;
        }
        return `<a class="pyq-step-card pyq-step-card-compact" href="${escapeHtml(href)}" data-pyq-step-semester="${escapeHtml(semester)}">
            <span class="pyq-step-index">Semester ${escapeHtml(semester)}</span>
            <h3>Semester ${escapeHtml(semester)}</h3>
            <p>${subjectCount} subjects found for ${escapeHtml(getBranchName(selection.branch))}.</p>
            <div class="pyq-step-meta">
                <span><strong>${semesterRecords.length}</strong> papers</span>
                <span><strong>${subjectCount}</strong> subjects</span>
            </div>
        </a>`;
    }).join("");
}

function renderSubjectStep(selection) {
    const branch = selection.branch;
    const subjects = subjectGroupsForSelection({ branch, semester: selection.semester })
        .sort((a, b) => a.label.localeCompare(b.label, undefined, { numeric: true }));
    document.getElementById("pyqStepTitle").textContent = `${getBranchName(branch)} Semester ${selection.semester} Subjects`;
    document.getElementById("pyqStepText").textContent = "Select one subject with its code.";
    document.getElementById("pyqStepGrid").innerHTML = subjects.map((subject) => `<a class="pyq-step-card pyq-step-card-subject" href="${escapeHtml(pyqSelectionUrl({ branch, semester: selection.semester, subject: subject.value, year: "all" }))}" data-pyq-step-subject="${escapeHtml(subject.value)}">
        <span class="pyq-step-index">${escapeHtml(subject.code || "CODE")}</span>
        <h3>${escapeHtml(subject.label)}</h3>
        <p>${subject.papers} PYQ papers across ${subject.years.size || "all"} year groups for ${escapeHtml(subject.primarySubject)}.</p>
        <div class="pyq-step-meta">
            <span><strong>${subject.papers}</strong> papers</span>
            <span><strong>${subject.years.size || "All"}</strong> years</span>
        </div>
    </a>`).join("") || `<div class="lms-empty">No subjects found for this branch and semester.</div>`;
}

function renderSelectedSubjectStep(selection) {
    let matchingRecords = [...recordsForSelection()].sort((a, b) => Number(b.year) - Number(a.year) || a.title.localeCompare(b.title));
    let usedRelatedFallback = false;
    if (!matchingRecords.length && selection.subject !== "all") {
        const parts = selectedSubjectParts(selection.subject);
        const selectedNumber = subjectCodeNumberKey(parts.code);
        if (selectedNumber) {
            matchingRecords = records.filter((record) => (
                branchMatches(selection.branch, record)
                && semesterMatches(selection.semester, record.semester)
                && branchSubjectGroupsFor(record, selection.branch).some((group) => subjectCodeNumberKey(group.subjectCode) === selectedNumber)
            )).sort((a, b) => Number(b.year) - Number(a.year) || a.title.localeCompare(b.title));
            usedRelatedFallback = matchingRecords.length > 0;
        }
    }
    const first = matchingRecords[0];
    const selectedParts = selectedSubjectParts(selection.subject);
    const group = subjectGroupSummary(matchingRecords, selection.branch)[0];
    const selectedSubjectLabel = subjectSelectionLabel(selection.subject, selection.branch);
    const selectedCodeKey = subjectCodeKey(selectedParts.code);
    const selectedNumber = subjectCodeNumberKey(selectedParts.code);
    const firstCode = first ? subjectCodeForBranch(first, selection.branch) : "";
    const firstCodeKey = subjectCodeKey(firstCode);
    const firstNumber = subjectCodeNumberKey(firstCode);
    const preserveSelectedSubject = Boolean(
        selectedCodeKey
        && firstCodeKey
        && selectedCodeKey !== firstCodeKey
        && selectedNumber
        && selectedNumber === firstNumber
    );
    const showSelectedSubject = usedRelatedFallback || preserveSelectedSubject;
    const code = showSelectedSubject ? selectedParts.code.toUpperCase() : first ? prefixedSubjectCode(first, selection.branch) : selectedParts.code.toUpperCase();
    const subjectLabel = showSelectedSubject ? selectedSubjectLabel : group?.label || selectedSubjectLabel;
    const resultText = showSelectedSubject
        ? `Showing ${matchingRecords.length} related uploaded PYQ papers for ${escapeHtml(getBranchName(selection.branch))}, Semester ${escapeHtml(selection.semester)}.`
        : `Showing ${matchingRecords.length} Content Admin uploaded PYQ papers for this subject only.`;
    document.getElementById("pyqStepTitle").textContent = subjectLabel;
    document.getElementById("pyqStepText").textContent = "Selected subject is ready. Only matching PYQ papers are shown below.";
    document.getElementById("pyqStepGrid").innerHTML = `<article class="pyq-step-card pyq-step-card-selected">
        <span class="pyq-step-index">${escapeHtml(code || "Selected Subject")}</span>
        <h3>${escapeHtml(subjectLabel)}</h3>
        <p>${matchingRecords.length} matching PYQ papers are available for ${escapeHtml(getBranchName(selection.branch))}, Semester ${escapeHtml(selection.semester)}.</p>
        <div class="pyq-step-actions">
            <a class="pyq-btn secondary" href="${escapeHtml(pyqSelectionUrl({ subject: "all", year: "all" }))}"><i class="fas fa-list"></i> Change Subject</a>
            <a class="pyq-btn" href="#pyqStepPapers"><i class="fas fa-file-pdf"></i> View Papers</a>
        </div>
    </article>
    <section class="pyq-step-papers" id="pyqStepPapers">
        <div class="pyq-step-papers-head">
            <span class="pyq-kicker">All Year PYQ</span>
            <h3>${escapeHtml(code || subjectLabel)} Papers</h3>
            <p>${resultText}</p>
        </div>
        <div class="pyq-step-paper-grid">
            ${matchingRecords.map(card).join("") || `<div class="lms-empty">No PYQ papers found for this subject.</div>`}
        </div>
    </section>`;
}

function renderPyqStepFlow() {
    const flow = document.getElementById("pyqStepFlow");
    if (!flow) return;
    const selection = pyqSelection();
    document.getElementById("pyqStepCrumbs").innerHTML = renderPyqCrumbs(selection);
    renderPyqPicklists(selection);
    if (selection.branch === "all") {
        renderBranchStep();
    } else if (selection.semester === "all") {
        renderSemesterStep(selection);
    } else if (selection.subject === "all") {
        renderSubjectStep(selection);
    } else {
        renderSelectedSubjectStep(selection);
    }
}

function renderPyqLoadingState(message = "Loading Content Admin uploaded PYQ papers...") {
    const title = document.getElementById("pyqStepTitle");
    const text = document.getElementById("pyqStepText");
    const crumbs = document.getElementById("pyqStepCrumbs");
    const picklists = document.getElementById("pyqStepPicklists");
    const grid = document.getElementById("pyqStepGrid");
    if (title) title.textContent = "Loading PYQ Library";
    if (text) text.textContent = message;
    if (crumbs) crumbs.innerHTML = "";
    if (picklists) picklists.innerHTML = "";
    if (grid) grid.innerHTML = `<div class="lms-empty">${escapeHtml(message)}</div>`;
}

function questionBank(subject) {
    const name = String(subject || "the subject").trim();
    const key = name.toLowerCase();
    const banks = [
        [["data structure", "algorithm"], [
            "Explain arrays, linked lists, stacks, and queues with suitable applications.",
            "Construct and explain binary trees, tree traversals, and binary search trees.",
            "Explain graph traversal using BFS and DFS with an example.",
            "Compare major sorting techniques and analyze their time complexity.",
            "Explain algorithm design strategies and asymptotic complexity analysis."
        ]],
        [["object oriented", "oop"], [
            "Explain classes, objects, constructors, and object-oriented design principles.",
            "Differentiate inheritance, polymorphism, abstraction, and encapsulation with examples.",
            "Explain exception handling and its role in reliable software design.",
            "Discuss interfaces, packages, and reusable component design.",
            "Design an object-oriented solution for a real-world problem."
        ]],
        [["database", "dbms"], [
            "Explain the ER model and convert an ER diagram into relational tables.",
            "Explain normalization up to BCNF with a suitable example.",
            "Write SQL queries using joins, subqueries, grouping, and aggregate functions.",
            "Explain transactions, concurrency control, and recovery techniques.",
            "Compare indexing, hashing, and query-processing techniques."
        ]],
        [["operating system"], [
            "Explain operating-system services, structures, and system calls.",
            "Compare CPU scheduling algorithms with a suitable example.",
            "Explain process synchronization, semaphores, and the critical-section problem.",
            "Explain deadlock prevention, avoidance, detection, and recovery.",
            "Compare paging, segmentation, virtual memory, and page-replacement algorithms."
        ]],
        [["computer network", "data communication"], [
            "Explain the OSI and TCP/IP models with protocol responsibilities.",
            "Compare switching, routing, and addressing techniques.",
            "Explain error detection, flow control, and data-link protocols.",
            "Explain transport-layer services, TCP congestion control, and UDP.",
            "Discuss common application-layer protocols and network security mechanisms."
        ]],
        [["mathematics", "calculus", "algebra"], [
            "Solve a representative problem using the fundamental method from this unit.",
            "Derive the principal theorem or formula and state its conditions.",
            "Apply the unit method to an engineering numerical problem.",
            "Compare alternative solution methods with a worked example.",
            "Solve a previous-year style long-answer numerical problem."
        ]],
        [["machine learning", "artificial intelligence", "deep learning"], [
            "Explain intelligent agents, problem formulation, and search strategies.",
            "Compare supervised, unsupervised, and reinforcement learning.",
            "Explain model training, evaluation metrics, overfitting, and regularization.",
            "Describe neural-network architecture and the backpropagation algorithm.",
            "Discuss practical AI applications, limitations, and ethical concerns."
        ]],
        [["thermodynamic", "heat transfer"], [
            "State and explain the fundamental laws with engineering applications.",
            "Derive the governing relation for the unit and solve a numerical problem.",
            "Explain the important cycle or process with a neat diagram.",
            "Compare major heat-transfer modes and calculate a representative case.",
            "Analyze the performance and efficiency of a practical system."
        ]],
        [["electronic", "circuit", "electrical", "power system"], [
            "Explain the fundamental circuit or device characteristics with diagrams.",
            "Analyze the principal network or system using standard methods.",
            "Derive the important operating relation and solve a numerical problem.",
            "Compare major devices, configurations, or control techniques.",
            "Explain practical applications, protection, and performance considerations."
        ]],
        [["software engineering"], [
            "Explain software-process models and compare their applications.",
            "Prepare requirements and a suitable system model for a given problem.",
            "Explain software design principles, architecture, and testing strategies.",
            "Discuss project estimation, risk management, and quality assurance.",
            "Explain maintenance, configuration management, and modern development practices."
        ]]
    ];
    const matched = banks.find(([keywords]) => keywords.some((keyword) => key.includes(keyword)));
    return matched?.[1] || [
        `Explain the fundamental concepts, terminology, and scope of ${name}.`,
        `Discuss the principal methods and techniques used in ${name}.`,
        `Solve a representative problem based on the core applications of ${name}.`,
        `Compare the important models, processes, or approaches in ${name}.`,
        `Explain advanced applications, limitations, and recent developments in ${name}.`
    ];
}

function repeatedSelectionRecords({ includeSemester = true, includeSubject = true } = {}) {
    const branch = document.getElementById("repeatPyqBranch").value;
    const semester = document.getElementById("repeatPyqSemester").value;
    const subject = document.getElementById("repeatPyqSubject").value;
    return records.filter((record) => (
        branchMatches(branch, record)
        && (!includeSemester || semesterMatches(semester, record.semester))
        && (!includeSubject || subjectMatches(subject, record))
    ));
}

function fillRepeatedSemesterOptions(selected = "all") {
    const branch = document.getElementById("repeatPyqBranch").value;
    const semesters = [...new Set(records
        .filter((record) => branchMatches(branch, record))
        .map((record) => String(record.semester || ""))
        .filter(Boolean))]
        .sort((a, b) => Number(a) - Number(b));
    setOptions(
        document.getElementById("repeatPyqSemester"),
        [["all", "All Semesters"], ...semesters.map((semester) => [semester, `Semester ${semester}`])],
        selected
    );
}

function fillRepeatedSubjectOptions(selected = "all") {
    const branch = document.getElementById("repeatPyqBranch").value;
    const subjects = new Map();
    repeatedSelectionRecords({ includeSubject: false }).forEach((record) => {
        const value = subjectOptionValue(record);
        const code = prefixedSubjectCode(record, branch);
        if (!subjectCodeKey(code)) return;
        if (!subjects.has(value)) subjects.set(value, `${code} - ${record.subject}`);
    });
    setOptions(
        document.getElementById("repeatPyqSubject"),
        [["all", `All Subjects (${subjects.size})`], ...[...subjects.entries()].sort((a, b) => a[1].localeCompare(b[1], undefined, { numeric: true }))],
        selected
    );
}

function buildRepeatedQuestions() {
    const branch = document.getElementById("repeatPyqBranch").value;
    const unit = document.getElementById("repeatPyqUnit").value;
    const groups = new Map();
    repeatedSelectionRecords().forEach((record) => {
        const key = `${record.semester}|${record.subjectCode}|${record.subject}`;
        if (!groups.has(key)) groups.set(key, { records: [], branches: new Set(), subject: record.subject, subjectCode: record.subjectCode, semester: record.semester });
        const group = groups.get(key);
        group.records.push(record);
        (record.branchIds || [record.branchId]).forEach((id) => group.branches.add(id));
    });

    repeatedQuestionLookup.clear();
    repeatedQuestions = [...groups.values()].flatMap((group) => {
        const uniquePapers = [...new Map(group.records.map((record) => [record.id, record])).values()];
        const numericYears = uniquePapers.map((record) => Number(record.year)).filter(Number.isFinite);
        const newestYear = numericYears.length ? Math.max(...numericYears) : 0;
        const oldestYear = numericYears.length ? Math.min(...numericYears) : 0;
        const branchIds = [...group.branches];
        const questions = questionBank(group.subject);
        return questions.map((question, index) => {
            const unitNumber = index + 1;
            const frequency = Math.max(1, Math.min(uniquePapers.length, Math.round(uniquePapers.length * (1 - index * 0.06))));
            const priority = frequency * 10 + Math.max(0, newestYear - 2015) - index;
            const id = `${group.semester}-${group.subjectCode}-${group.subject}-${unitNumber}`;
            const item = {
                id, question, unit: unitNumber, frequency, priority, papers: uniquePapers.length,
                newestYear, oldestYear, subject: group.subject, subjectCode: group.subjectCode,
                semester: group.semester, branch: branch !== "all" ? branch : (branchIds.length === 1 ? branchIds[0] : "all"),
                branchCount: branchIds.length
            };
            repeatedQuestionLookup.set(id, item);
            return item;
        });
    }).filter((item) => unit === "all" || String(item.unit) === unit);

    const sort = document.getElementById("repeatPyqSort").value;
    repeatedQuestions.sort((a, b) => {
        if (sort === "recent") return b.newestYear - a.newestYear || b.priority - a.priority;
        if (sort === "papers") return b.papers - a.papers || b.priority - a.priority;
        return b.priority - a.priority || b.papers - a.papers;
    });
}

function repeatedQuestionCard(item, rank) {
    const code = item.branch === "all"
        ? item.subjectCode
        : prefixedSubjectCode({ subjectCode: item.subjectCode, branchIds: [item.branch] }, item.branch);
    const yearsLabel = item.newestYear ? `${item.oldestYear}-${item.newestYear}` : "All time";
    return `<article class="pyq-repeat-card">
        <div class="pyq-repeat-card-top">
            <span class="pyq-repeat-rank">#${rank}</span>
            <span class="pyq-repeat-unit">Unit ${item.unit}</span>
        </div>
        <h3>${escapeHtml(item.question)}</h3>
        <p>${escapeHtml(code)} Â· ${escapeHtml(item.subject)}</p>
        <div class="pyq-repeat-metrics">
            <span><strong>${item.frequency}</strong> priority papers</span>
            <span><strong>${item.papers}</strong> available papers</span>
            <span><strong>${escapeHtml(yearsLabel)}</strong> year range</span>
        </div>
        <button class="pyq-btn" type="button" data-repeat-papers="${escapeHtml(item.id)}"><i class="fas fa-file-lines"></i> View related papers</button>
    </article>`;
}

function renderRepeatedQuestions() {
    const startedAt = window.performance?.now?.() || Date.now();
    buildRepeatedQuestions();
    const visible = repeatedQuestions.slice(0, repeatedVisibleCount);
    const branch = document.getElementById("repeatPyqBranch").value;
    const semester = document.getElementById("repeatPyqSemester").value;
    const subject = document.getElementById("repeatPyqSubject").value;
    document.getElementById("repeatedQuestionGrid").innerHTML = visible.map((item, index) => repeatedQuestionCard(item, index + 1)).join("")
        || `<div class="lms-empty">No repeated-question analysis matches these filters.</div>`;
    document.getElementById("repeatResultTitle").textContent = subject !== "all"
        ? subjectSelectionLabel(subject, branch)
        : branch !== "all" ? getBranchName(branch) : "All branches";
    document.getElementById("repeatResultText").textContent = `${repeatedQuestions.length} unit-wise exam priorities${semester === "all" ? "" : ` for Semester ${semester}`}, ranked from available all-time papers.`;
    const more = document.getElementById("loadMoreRepeatedQuestions");
    more.hidden = visible.length >= repeatedQuestions.length;
    more.textContent = `Show more (${Math.min(8, repeatedQuestions.length - visible.length)})`;
    pyqPerf.repeatedMs = Math.max(1, Math.round((window.performance?.now?.() || Date.now()) - startedAt));
    updatePyqSpeedBadge();
}

function showRelatedPapers(id) {
    const item = repeatedQuestionLookup.get(id);
    if (!item) return;
    document.getElementById("libraryPyqBranch").value = [...document.getElementById("libraryPyqBranch").options].some((option) => option.value === item.branch) ? item.branch : "all";
    fillSemesterOptions(item.semester);
    fillSubjectOptions(subjectOptionValue(item));
    fillYearOptions();
    visibleCount = pageSize;
    render();
    document.querySelector(".pyq-library-toolbar").scrollIntoView({ behavior: "smooth", block: "start" });
}

function syncUrl() {
    const params = new URLSearchParams({
        branch: document.getElementById("libraryPyqBranch").value,
        semester: document.getElementById("libraryPyqSemester").value,
        subject: document.getElementById("libraryPyqSubject").value,
        year: document.getElementById("libraryPyqYear").value
    });
    history.replaceState(null, "", `${location.pathname}?${params}`);
}

function ensurePyqViewerDialog() {
    let dialog = document.getElementById("pyqViewerDialog");
    if (dialog) return dialog;
    dialog = document.createElement("dialog");
    dialog.id = "pyqViewerDialog";
    dialog.className = "pyq-viewer-dialog";
    document.body.appendChild(dialog);
    return dialog;
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

function resolvePyqViewerUrl(record) {
    const directUrl = resolvePyqAssetUrl(record?.url || record?.fileUrl || record?.filePath || record?.downloadUrl || record?.sourceUrl, record);
    if (directUrl && directUrl !== "#") return directUrl;
    if (record?.id) return `${window.location.origin}/api/pyq/${encodeURIComponent(record.id)}/download`;
    return "";
}

function resolvePyqDownloadUrl(record) {
    const directUrl = resolvePyqAssetUrl(record?.url || record?.fileUrl || record?.filePath || record?.downloadUrl || record?.sourceUrl, record);
    if (directUrl && directUrl !== "#") return directUrl;
    if (record?.id) return `${window.location.origin}/api/pyq/${encodeURIComponent(record.id)}/download?download=1`;
    return "";
}

function openPyqViewer(id) {
    const record = records.find((item) => item.id === id);
    if (!record || !record.url || record.url === "#") {
        showDetails(id);
        return;
    }
    if (document.getElementById("pyqDetailDialog")?.open) {
        document.getElementById("pyqDetailDialog").close();
    }
    const dialog = ensurePyqViewerDialog();
    dialog.innerHTML = `<div class="pyq-viewer-shell">
        <div class="pyq-viewer-top">
            <div>
                <span class="pyq-kicker">PYQ Library</span>
                <h2>${escapeHtml(record.title)}</h2>
                <p>${escapeHtml(prefixedSubjectCode(record, document.getElementById("libraryPyqBranch").value))} - Semester ${escapeHtml(record.semester)} - ${escapeHtml(record.year)}</p>
            </div>
            <button class="tool-close" id="closePyqViewer" type="button" aria-label="Close">&times;</button>
        </div>
        <div class="pyq-viewer-frame-wrap">
            <iframe class="pyq-viewer-frame" src="${escapeHtml(resolvePyqViewerUrl(record))}" title="${escapeHtml(record.title)}"></iframe>
        </div>
    </div>`;
    dialog.showModal();
}

function pyqDownloadFileName(record) {
    const fromRecord = String(record?.fileName || "").trim();
    const fromUrl = String(record?.url || "").split("?")[0].split("/").pop() || "";
    const fallback = `${record?.subject || "rgpv-pyq"}-${record?.year || "paper"}.pdf`;
    const rawName = fromRecord || fromUrl || fallback;
    const decoded = (() => {
        try {
            return decodeURIComponent(rawName);
        } catch (error) {
            return rawName;
        }
    })();
    const safeName = decoded.replace(/[<>:"/\\|?*\x00-\x1F]+/g, "-").replace(/\s+/g, " ").trim();
    return /\.pdf$/i.test(safeName) ? safeName : `${safeName || "rgpv-pyq"}.pdf`;
}

function triggerPyqDeviceDownload(url, fileName) {
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    link.remove();
}

async function downloadPyqFile(id, button = null) {
    const record = records.find((item) => item.id === id);
    if (!record || !record.url || record.url === "#") {
        showDetails(id);
        return;
    }
    const fileName = pyqDownloadFileName(record);
    const downloadUrl = resolvePyqDownloadUrl(record);
    const oldHtml = button?.innerHTML;
    if (button) {
        button.disabled = true;
        button.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Starting`;
    }
    triggerPyqDeviceDownload(downloadUrl, fileName);
    if (button) {
        setTimeout(() => {
            button.disabled = false;
            button.innerHTML = oldHtml;
        }, 1200);
    }
}

function card(record) {
    const selectedBranch = document.getElementById("libraryPyqBranch").value;
    const selectedSubject = document.getElementById("libraryPyqSubject")?.value || "all";
    const selectedParts = selectedSubjectParts(selectedSubject);
    const highlightNeedle = selectedSubject !== "all" ? (selectedParts.subject || selectedParts.code || selectedSubject) : "";
    const subjectHtml = highlightNeedle && window.EngiLearnSubjectSimilarity?.highlightSubjectHtml
        ? window.EngiLearnSubjectSimilarity.highlightSubjectHtml(record.subject, highlightNeedle)
        : escapeHtml(record.subject);
    const branchLabel = isCommonSubjectRecord(record) ? "Common Subject" : record.branch;
    const hasPdf = record.uploaded && record.url && record.url !== "#";
    const actions = hasPdf
        ? `<div class="pyq-actions pyq-library-actions">
            <button class="pyq-btn" type="button" data-pyq-open="${escapeHtml(record.id)}"><i class="fas fa-book-open"></i> Open PYQ</button>
            <button class="pyq-btn secondary" type="button" data-pyq-download="${escapeHtml(record.id)}"><i class="fas fa-download"></i> Download PDF</button>
            <button class="pyq-btn secondary" type="button" data-pyq-details="${escapeHtml(record.id)}"><i class="fas fa-table-list"></i> PYQ Library</button>
        </div>`
        : `<button class="pyq-btn" type="button" data-pyq-details="${escapeHtml(record.id)}"><i class="fas fa-eye"></i> View Details</button>`;
    return `<article class="pyq-library-card">
        <div class="pyq-library-card-top"><span class="pyq-code">${escapeHtml(prefixedSubjectCode(record, selectedBranch))}</span><span class="pyq-year">${escapeHtml(record.year)}</span></div>
        <h3>${subjectHtml}</h3>
        <p>${escapeHtml(record.title)}</p>
        <div class="pyq-library-meta">
            <span><i class="fas fa-building-columns"></i>${escapeHtml(branchLabel)}</span>
            <span><i class="fas fa-layer-group"></i>Semester ${escapeHtml(record.semester)}</span>
            <span><i class="fas fa-user-shield"></i>Content Admin upload</span>
        </div>
        ${actions}
    </article>`;
}

function render() {
    const startedAt = window.performance?.now?.() || Date.now();
    const branch = document.getElementById("libraryPyqBranch").value;
    const semester = document.getElementById("libraryPyqSemester").value;
    const subject = document.getElementById("libraryPyqSubject").value;
    const year = document.getElementById("libraryPyqYear").value;
    const search = document.getElementById("libraryPyqSearch").value.trim().toLowerCase();
    filteredRecords = records.filter((record) => {
        const groupSearch = branchSubjectGroupsFor(record, branch)
            .map((group) => `${group.branchId} ${group.semester} ${group.subjectCode} ${group.subject}`)
            .join(" ");
        const searchable = `${record.branch} ${record.semester} ${record.subject} ${record.subjectCode} ${record.year} ${record.title} ${groupSearch}`.toLowerCase();
        return branchMatches(branch, record)
            && semesterMatches(semester, record.semester)
            && subjectMatches(subject, record)
            && (year === "all" || record.year === year)
            && (!search || searchable.includes(search));
    });
    if (!filteredRecords.length && subject !== "all") {
        const selectedNumber = subjectCodeNumberKey(selectedSubjectParts(subject).code);
        if (selectedNumber) {
            filteredRecords = records.filter((record) => {
                const groupSearch = branchSubjectGroupsFor(record, branch)
                    .map((group) => `${group.branchId} ${group.semester} ${group.subjectCode} ${group.subject}`)
                    .join(" ");
                const searchable = `${record.branch} ${record.semester} ${record.subject} ${record.subjectCode} ${record.year} ${record.title} ${groupSearch}`.toLowerCase();
                const relatedCode = branchSubjectGroupsFor(record, branch).some((group) => subjectCodeNumberKey(group.subjectCode) === selectedNumber);
                return branchMatches(branch, record)
                    && semesterMatches(semester, record.semester)
                    && relatedCode
                    && (year === "all" || record.year === year)
                    && (!search || searchable.includes(search));
            });
        }
    }
    filteredRecords.sort((a, b) => pyqCommonSubjectSortValue(a) - pyqCommonSubjectSortValue(b)
        || Number(b.year || 0) - Number(a.year || 0)
        || String(a.subject || "").localeCompare(String(b.subject || ""), undefined, { numeric: true })
        || String(a.title || "").localeCompare(String(b.title || ""), undefined, { numeric: true }));
    const visible = filteredRecords.slice(0, visibleCount);
    document.getElementById("pyqLibraryGrid").innerHTML = visible.map(card).join("") || `<div class="lms-empty">No PYQ papers match these filters.</div>`;
    document.getElementById("pyqLibraryResultText").textContent = `Showing ${visible.length} of ${filteredRecords.length} papers`;
    document.getElementById("pyqLibraryResultTitle").textContent = branch === "all" ? "All PYQ papers" : `${getBranchName(branch)} PYQ`;
    const loadMore = document.getElementById("loadMorePyqLibrary");
    loadMore.hidden = visible.length >= filteredRecords.length;
    loadMore.textContent = `Load more (${Math.min(pageSize, filteredRecords.length - visible.length)})`;
    renderPyqStepFlow();
    pyqPerf.renderMs = Math.max(1, Math.round((window.performance?.now?.() || Date.now()) - startedAt));
    pyqPerf.totalMs = Math.max(1, Math.round((window.performance?.now?.() || Date.now()) - pyqPerfStartedAt));
    updatePyqSpeedBadge();
    syncUrl();
}

function renderStats() {
    const branches = pyqBranches.length;
    const subjects = new Set(records.flatMap((record) => {
        const groups = branchSubjectGroupsFor(record, "all");
        return groups.length
            ? groups.map((group) => `${group.branchId}-${subjectCodeKey(group.subjectCode)}`)
            : (record.branchIds || [record.branchId]).map((id) => `${id}-${subjectCodeKey(record.subjectCode)}`);
    })).size;
    const uploads = records.filter((record) => record.uploaded).length;
    const availableYears = new Set(records.map((record) => record.year).filter((year) => /^\d{4}$/.test(year))).size;
    document.getElementById("pyqLibraryStats").innerHTML = [[branches, "Branches"], [subjects, "Subjects"], [availableYears, "Years"], [uploads, "Uploaded papers"]]
        .map(([value, label]) => `<span><strong>${value}</strong>${label}</span>`).join("")
        + `<span class="pyq-speed-stat" id="pyqSpeedBadge"><strong>...</strong>Loading speed</span>`;
    updatePyqSpeedBadge();
}

function updatePyqSpeedBadge() {
    const badge = document.getElementById("pyqSpeedBadge");
    if (!badge) return;
    const total = pyqPerf.totalMs || Math.max(1, Math.round((window.performance?.now?.() || Date.now()) - pyqPerfStartedAt));
    badge.innerHTML = `<strong>${total} ms</strong>Load ${pyqPerf.dataMs || total} ms | render ${pyqPerf.renderMs || 0} ms | repeated ${pyqPerf.repeatedMs || 0} ms`;
}

function showDetails(id) {
    const record = records.find((item) => item.id === id);
    if (!record) return;
    const selectedBranch = document.getElementById("libraryPyqBranch").value;
    const branchLabel = isCommonSubjectRecord(record) ? "Common Subject" : record.branch;
    const action = record.uploaded && record.url && record.url !== "#"
        ? `<div class="pyq-actions pyq-library-actions">
                <button class="pyq-btn" type="button" data-pyq-open="${escapeHtml(record.id)}"><i class="fas fa-book-open"></i> Open PYQ</button>
                <button class="pyq-btn secondary" type="button" data-pyq-download="${escapeHtml(record.id)}"><i class="fas fa-download"></i> Download PDF</button>
            </div>`
        : "";
    document.getElementById("pyqDetailContent").innerHTML = `<span class="pyq-kicker">${escapeHtml(prefixedSubjectCode(record, selectedBranch))}</span>
        <h2>${escapeHtml(record.title)}</h2>
        <div class="pyq-detail-grid">
            <span><small>Branch</small><strong>${escapeHtml(branchLabel)}</strong></span>
            <span><small>Semester</small><strong>${escapeHtml(record.semester)}</strong></span>
            <span><small>Subject</small><strong>${escapeHtml(record.subject)}</strong></span>
            <span><small>Year</small><strong>${escapeHtml(record.year)}</strong></span>
        </div>${record.topic ? `<p>${escapeHtml(record.topic)}</p>` : ""}${action}`;
    document.getElementById("pyqDetailDialog").showModal();
}

function applyPyqLibraryData(settings, content, query) {
    const startedAt = window.performance?.now?.() || Date.now();
    const user = JSON.parse(localStorage.getItem("mini_currentUser") || "null") || {};
    if (String(user.role || "").toLowerCase() !== "admin" && (settings.sections?.pyq === false || settings.visibility?.pyq === false)) {
        document.querySelector(".pyq-library-page").innerHTML = `<section class="pyq-library-hero"><div><span class="pyq-kicker">PYQ Library</span><h1>PYQ section unavailable</h1><p>This section is currently disabled or hidden by Admin.</p></div></section>`;
        return;
    }
    const uploads = content.filter((item) => String(item.type || "").toLowerCase().includes("pyq")).map(normalizeUpload);
    records = dedupePyqRecords(uploads);
    pyqPerf.dataMs = Math.max(1, Math.round((window.performance?.now?.() || Date.now()) - startedAt));
    pyqPerf.source = uploads.length ? "Content Admin PYQ" : "Local cache";
    const availableBranches = pyqBranches.map(([branchId]) => [branchId, pyqBranchOptionLabel(branchId)]);
    const requestedBranch = resolvePyqBranchId(query.get("branch")) || query.get("branch") || "all";
    setOptions(document.getElementById("libraryPyqBranch"), [["all", `All Branches (${availableBranches.length})`], ...availableBranches], requestedBranch);
    fillSemesterOptions(query.get("semester") || "all");
    fillSubjectOptions(query.get("subject") || "all");
    fillYearOptions(query.get("year") || "all");
    if (document.getElementById("repeatPyqBranch")) {
        setOptions(document.getElementById("repeatPyqBranch"), [["all", `All Branches (${availableBranches.length})`], ...availableBranches], "all");
        fillRepeatedSemesterOptions();
        fillRepeatedSubjectOptions();
        renderRepeatedQuestions();
    }
    renderStats();
    render();
}

async function loadLibrary(attempt = 0) {
    ensurePyqStateControls();
    const query = new URLSearchParams(location.search);
    let settings = JSON.parse(localStorage.getItem("engilearn_public_settings") || "null") || {};
    let content = JSON.parse(localStorage.getItem("admin_content") || "[]");
    const cachedPyq = content.filter((item) => String(item.type || "").toLowerCase().includes("pyq"));
    const canonicalPromise = loadPyqCanonicalSubjects();
    const staticPromise = loadPyqStaticContent();
    const renderLocalPyq = () => applyPyqLibraryData(settings, pyqContentWithStatic(content), query);

    if (cachedPyq.length) {
        Promise.allSettled([canonicalPromise, staticPromise]).then(renderLocalPyq);
    } else {
        renderPyqLoadingState("Loading PYQ metadata from local CSV import...");
        Promise.allSettled([canonicalPromise, staticPromise]).then(() => {
            if (pyqStaticContent.length) renderLocalPyq();
        });
    }

    if (window.EngiLearnAPI) {
        Promise.all([EngiLearnAPI.getPublicSettings(), EngiLearnAPI.getContent(false), canonicalPromise, staticPromise])
            .then(([settingsData, contentData]) => {
                settings = settingsData.settings || settings;
                content = contentData.content || content;
                applyPyqLibraryData(settings, pyqContentWithStatic(content), query);
                localStorage.setItem("engilearn_public_settings", JSON.stringify(settings));
                cachePyqPageContent(content);
            })
            .catch((error) => {
                console.warn("Using locally saved PYQ data:", error.message);
                if (pyqStaticContent.length || cachedPyq.length) {
                    renderLocalPyq();
                } else {
                    renderPyqLoadingState("PYQ server is starting. Refresh this page in a few seconds.");
                    if (attempt < 6) {
                        window.setTimeout(() => loadLibrary(attempt + 1), 4000);
                    }
                }
            });
    }
}
document.addEventListener("DOMContentLoaded", () => {
    ensurePyqStateControls();
    document.getElementById("libraryPyqBranch").addEventListener("change", () => {
        visibleCount = pageSize;
        fillSemesterOptions();
        fillSubjectOptions();
        fillYearOptions();
        render();
    });
    document.getElementById("libraryPyqSemester").addEventListener("change", () => {
        visibleCount = pageSize;
        fillSubjectOptions();
        fillYearOptions();
        render();
    });
    document.getElementById("libraryPyqSubject").addEventListener("change", () => {
        visibleCount = pageSize;
        fillYearOptions();
        render();
    });
    document.getElementById("libraryPyqYear").addEventListener("change", () => {
        visibleCount = pageSize;
        render();
    });
    document.getElementById("libraryPyqSearch").addEventListener("input", () => {
        visibleCount = pageSize;
        render();
    });
    document.getElementById("resetPyqLibraryFilters").addEventListener("click", () => {
        document.getElementById("libraryPyqBranch").value = "all";
        document.getElementById("libraryPyqSearch").value = "";
        fillSemesterOptions();
        fillSubjectOptions();
        fillYearOptions();
        visibleCount = pageSize;
        render();
    });
    document.getElementById("loadMorePyqLibrary").addEventListener("click", () => {
        visibleCount += pageSize;
        render();
    });
    document.addEventListener("change", (event) => {
        const flowSelect = event.target.closest("[data-pyq-flow-select]");
        if (!flowSelect) return;
        const type = flowSelect.dataset.pyqFlowSelect;
        if (type === "branch") {
            window.location.href = pyqSelectionUrl({ branch: flowSelect.value, semester: "all", subject: "all", year: "all" });
        }
        if (type === "semester") {
            window.location.href = pyqSelectionUrl({ semester: flowSelect.value, subject: "all", year: "all" });
        }
        if (type === "subject") {
            window.location.href = pyqSelectionUrl({ subject: flowSelect.value, year: "all" });
        }
        if (type === "year") {
            window.location.href = pyqSelectionUrl({ year: flowSelect.value });
        }
    });
    if (document.getElementById("repeatPyqBranch")) {
        document.getElementById("repeatPyqBranch").addEventListener("change", () => {
            repeatedVisibleCount = 8;
            fillRepeatedSemesterOptions();
            fillRepeatedSubjectOptions();
            renderRepeatedQuestions();
        });
        document.getElementById("repeatPyqSemester").addEventListener("change", () => {
            repeatedVisibleCount = 8;
            fillRepeatedSubjectOptions();
            renderRepeatedQuestions();
        });
        ["repeatPyqSubject", "repeatPyqUnit", "repeatPyqSort"].forEach((id) => {
            document.getElementById(id).addEventListener("change", () => {
                repeatedVisibleCount = 8;
                renderRepeatedQuestions();
            });
        });
        document.getElementById("resetRepeatedFilters").addEventListener("click", () => {
            document.getElementById("repeatPyqBranch").value = "all";
            document.getElementById("repeatPyqUnit").value = "all";
            document.getElementById("repeatPyqSort").value = "priority";
            fillRepeatedSemesterOptions();
            fillRepeatedSubjectOptions();
            repeatedVisibleCount = 8;
            renderRepeatedQuestions();
        });
        document.getElementById("loadMoreRepeatedQuestions").addEventListener("click", () => {
            repeatedVisibleCount += 8;
            renderRepeatedQuestions();
        });
    }
    document.addEventListener("click", (event) => {
        const openButton = event.target.closest("[data-pyq-open]");
        if (openButton) {
            openPyqViewer(openButton.dataset.pyqOpen);
            return;
        }
        const downloadButton = event.target.closest("[data-pyq-download]");
        if (downloadButton) {
            downloadPyqFile(downloadButton.dataset.pyqDownload, downloadButton);
            return;
        }
        if (event.target.closest("#closePyqViewer")) {
            document.getElementById("pyqViewerDialog")?.close();
            return;
        }
        const button = event.target.closest("[data-pyq-details]");
        if (button) showDetails(button.dataset.pyqDetails);
        const relatedButton = event.target.closest("[data-repeat-papers]");
        if (relatedButton) showRelatedPapers(relatedButton.dataset.repeatPapers);
    });
    document.getElementById("closePyqDetails").addEventListener("click", () => document.getElementById("pyqDetailDialog").close());
    loadLibrary();
});
(function engilearnProtectedStudySurface() {
    if (window.__engilearnProtectedStudySurface) return;
    window.__engilearnProtectedStudySurface = true;
    const isEditable = (target) => Boolean(target?.closest?.('input, textarea, select, [contenteditable="true"]'));
    const warn = () => {
        const message = "This study content is protected inside EngiLearn. Please use the in-website viewer and allowed buttons.";
        if (window.showToast) window.showToast(message, "warning");
    };
    document.addEventListener("contextmenu", (event) => {
        if (isEditable(event.target)) return;
        event.preventDefault();
        warn();
    });
    document.addEventListener("keydown", (event) => {
        const key = String(event.key || "").toLowerCase();
        const blocked = (event.ctrlKey || event.metaKey) && ["s", "p", "u"].includes(key);
        if (!blocked) return;
        event.preventDefault();
        warn();
    });
    document.addEventListener("copy", (event) => {
        if (isEditable(event.target)) return;
        if (!location.pathname.includes("repeated-questions")) return;
        event.preventDefault();
        warn();
    });
    document.addEventListener("dragstart", (event) => {
        if (isEditable(event.target)) return;
        event.preventDefault();
    });
})();
