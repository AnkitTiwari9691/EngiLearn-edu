const repeatBranches = [
    ["3dag", "3D Animation & Graphics", "fa-cube", "#111827", "#8b5cf6"],
    ["ab", "AB", "fa-diagram-project", "#111827", "#e11d48"],
    ["cse", "Computer Science Engineering", "fa-laptop-code", "#111827", "#d71920"],
    ["it", "Information Technology", "fa-network-wired", "#0f172a", "#2563eb"],
    ["ad", "Artificial Intelligence & Data Science", "fa-brain", "#111827", "#7c3aed"],
    ["ai", "Artificial Intelligence", "fa-robot", "#111827", "#ef4444"],
    ["aiml", "Artificial Intelligence & Machine Learning", "fa-microchip", "#111827", "#06b6d4"],
    ["ece", "Electronics & Communication", "fa-satellite-dish", "#1f2937", "#f59e0b"],
    ["e-all", "Electrical & Electronics Group", "fa-bolt", "#111827", "#22c55e"],
    ["me", "Mechanical Engineering", "fa-gears", "#111827", "#64748b"],
    ["civil", "Civil Engineering", "fa-building-columns", "#111827", "#a16207"],
    ["cd", "Computer Science & Design", "fa-pen-nib", "#111827", "#ec4899"],
    ["csbs", "Computer Science & Business Systems", "fa-briefcase", "#111827", "#475569"],
    ["csit", "Computer Science & Information Technology", "fa-code", "#111827", "#14b8a6"],
    ["cse-iot", "Computer Science & IoT", "fa-wifi", "#111827", "#0ea5e9"],
    ["cy", "Cyber Security", "fa-shield-halved", "#111827", "#dc2626"],
    ["auto", "Automobile Engineering", "fa-car", "#111827", "#f97316"],
    ["chemical", "Chemical Engineering", "fa-flask", "#111827", "#10b981"],
    ["production", "Production Engineering", "fa-industry", "#111827", "#ea580c"],
    ["aero", "Aeronautical Engineering", "fa-plane", "#111827", "#2563eb"],
    ["bme", "Biomedical Engineering", "fa-heart-pulse", "#111827", "#e11d48"],
    ["ft", "Food Technology", "fa-seedling", "#111827", "#65a30d"],
    ["env", "Environmental Engineering", "fa-leaf", "#111827", "#16a34a"],
    ["arch", "Architecture", "fa-drafting-compass", "#111827", "#9333ea"],
    ["petroleum", "Petroleum Engineering", "fa-oil-well", "#111827", "#44403c"],
    ["power", "Power Electronics", "fa-bolt", "#111827", "#f59e0b"],
    ["instrumentation", "Instrumentation", "fa-gauge-high", "#111827", "#0891b2"],
    ["io", "Internet of Things", "fa-tower-broadcast", "#111827", "#0284c7"],
    ["is", "Information Security", "fa-lock", "#111827", "#be123c"],
    ["nano", "Nanotechnology", "fa-microscope", "#111827", "#7c3aed"],
    ["marine", "Marine Engineering", "fa-ship", "#111827", "#0ea5e9"],
    ["mi", "Mining Engineering", "fa-mountain", "#111827", "#78716c"],
    ["mm", "Metallurgy & Materials", "fa-cubes", "#111827", "#9333ea"],
    ["rm", "Robotics & Mechatronics", "fa-robot", "#111827", "#0891b2"],
    ["sd", "Data Science", "fa-chart-line", "#111827", "#4f46e5"],
    ["tx", "Textile Technology", "fa-shirt", "#111827", "#db2777"],
    ["others", "Other B.Tech Branches", "fa-layer-group", "#111827", "#525252"]
];

const repeatOfficialBranches = [
    ["cse", "Computer Science & Engg"],
    ["it", "Information Technology"],
    ["ece", "Electronics & Communication"],
    ["me", "Mechanical Engineering"],
    ["civil", "Civil Engineering"],
    ["e-all", "Electrical & Electronics"],
    ["aiml", "AI & Machine Learning"],
    ["sd", "Data Science"],
    ["cy", "Cyber Security"],
    ["chemical", "Chemical Engineering"],
    ["auto", "Automobile Engineering"],
    ["production", "Production Engineering"],
    ["aero", "Aeronautical Engineering"],
    ["bme", "Biomedical Engineering"],
    ["io", "IoT & Embedded Systems"],
    ["mechatronics", "Mechatronics"],
    ["power", "Power Electronics"],
    ["instrumentation", "Instrumentation"],
    ["env", "Environmental Engineering"],
    ["arch", "Architecture"],
    ["mm", "Metallurgical Engineering"],
    ["mi", "Mining Engineering"],
    ["tx", "Textile Technology"],
    ["petroleum", "Petroleum Engineering"],
    ["ft", "Food Technology"],
    ["robotics", "Robotics Engineering"],
    ["nano", "Nanotechnology"],
    ["marine", "Marine Engineering"]
];

const repeatBranchLabels = new Map(repeatBranches.map(([id, label]) => [id, label]));
const repeatBranchMeta = new Map(repeatBranches.map(([id, label, icon, a, b]) => [id, { label, icon, a, b }]));
repeatOfficialBranches.forEach(([id, label]) => {
    repeatBranchLabels.set(id, label);
    if (!repeatBranchMeta.has(id)) repeatBranchMeta.set(id, { label, icon: "fa-building-columns", a: "#111827", b: "#d71920" });
});
const repeatCodePrefixes = {
    "3dag": "3DAG", ab: "AB", ad: "AD", ai: "AI", aiml: "AIML", auto: "AU", cd: "CD",
    chemical: "CH", civil: "CE", csbs: "CSBS", cse: "CS", "cse-iot": "CS-IOT", csit: "CSIT",
    cy: "CY", ece: "EC", "e-all": "EE", ft: "FT", io: "IO", is: "IS", it: "IT", me: "ME",
    mi: "MI", mm: "MM", others: "BT", rm: "RM", sd: "DS", tx: "TX"
};

const repeatBranchAliases = {
    "3dag": "3dag",
    ab: "ab",
    ad: "ad",
    ai: "ai",
    aids: "ad",
    aiads: "ad",
    aiml: "aiml",
    "ai-ml": "aiml",
    al: "aiml",
    ce: "civil",
    civil: "civil",
    cse: "cse",
    cs: "cse",
    csbs: "csbs",
    csit: "csit",
    ec: "ece",
    ece: "ece",
    ex: "e-all",
    ee: "e-all",
    eee: "e-all",
    electrical: "e-all",
    io: "io",
    iot: "io",
    is: "is",
    aero: "aero",
    architecture: "arch",
    arch: "arch",
    bme: "bme",
    biomedical: "bme",
    cyber: "cy",
    ds: "sd",
    data: "sd",
    eall: "e-all",
    env: "env",
    environmental: "env",
    food: "ft",
    instrumentation: "instrumentation",
    inst: "instrumentation",
    marine: "marine",
    mech: "me",
    mechatronics: "rm",
    metallurgy: "mm",
    mining: "mi",
    nano: "nano",
    petroleum: "petroleum",
    power: "power",
    production: "production",
    robotics: "robotics",
    robot: "robotics",
    textile: "tx",
    "important-questions-civil": "civil",
    me: "me",
    mechanical: "me"
};

const repeatCommonSubjects = {
    "1": ["BT-101 Engineering Chemistry", "BT-102 Mathematics-I", "BT-103 English for Communication", "BT-104 Basic Electrical & Electronics Engineering", "BT-105 Engineering Graphics"],
    "2": ["BT-201 Engineering Physics", "BT-202 Mathematics-II", "BT-203 Basic Mechanical Engineering", "BT-204 Basic Civil Engineering & Mechanics", "BT-205 Basic Computer Engineering"]
};

const repeatSubjectCatalog = {
    "cse": {
        "3": ["ES-301 Energy & Environmental Engineering", "CS-302 Discrete Structure", "CS-303 Data Structure", "CS-304 Digital Systems", "CS-305 Object Oriented Programming & Methodology"],
        "4": ["BT-401 Mathematics III", "CS-402 Analysis & Design of Algorithms (ADA)", "CS-403 Software Engineering", "CS-404 Computer Organization & Architecture (COA)", "CS-405 Operating Systems (OS)"],
        "5": ["CS-501 Theory of Computation (TOC)", "CS-502 Database Management Systems (DBMS)", "CS-503(A) Data Analytics", "CS-503(B) Pattern Recognition", "CS-503(C) Cyber Security", "CS-504(A) Internet and Web Technology", "CS-504(B) Object Oriented Programming", "CS-504(C) Introduction to Database Management Systems"],
        "6": ["CS-601 Machine Learning", "CS-602 Computer Networks", "CS-603(A) Advanced Computer Architecture", "CS-603(B) Computer Graphics & Visualization", "CS-603(C) Compiler Design", "CS-604(A) Knowledge Management", "CS-604(B) Project Management", "CS-604(C) Rural Technology & Community Development"],
        "7": ["CS-701 Software Architectures", "CS-702(A) Computational Intelligence", "CS-702(B) Deep & Reinforcement Learning", "CS-702(C) Wireless & Mobile Computing", "CS-702(D) Big Data", "CS-703(A) Cryptography & Information Security", "CS-703(B) Data Mining & Warehousing", "CS-703(C) Agile Software Development", "CS-703(D) Disaster Management"],
        "8": ["CS-801 Internet of Things (IoT)", "CS-802(A) Blockchain Technologies", "CS-802(B) Cloud Computing", "CS-802(C) High Performance Computing", "CS-802(D) Object Oriented Software Engineering", "CS-803(A) Image Processing and Computer Vision", "CS-803(B) Game Theory with Engineering Applications", "CS-803(C) Internet of Things", "CS-803(D) Managing Innovation and Entrepreneurship"]
    },
    "it": {
        "1": ["BT-101 Engineering Chemistry", "BT-102 Mathematics-I", "BT-103 English for Communication", "BT-104 Basic Electrical & Electronics Engineering", "BT-105 Engineering Graphics"],
        "2": ["BT-201 Engineering Physics", "BT-202 Mathematics-II", "BT-203 Basic Mechanical Engineering", "BT-204 Basic Civil Engineering & Mechanics", "BT-205 Basic Computer Engineering"],
        "3": ["ES-301 Energy & Environmental Engineering", "IT-302 Discrete Structure", "IT-303 Data Structure", "IT-304 Object Oriented Programming & Methodology", "IT-305 Digital Circuits & System"],
        "4": ["BT-401 Mathematics-III", "IT-402 Analysis & Design of Algorithm", "IT-403 Software Engineering", "IT-404 Computer Organization & Architecture", "IT-405 Operating Systems"],
        "5": ["IT-501 Operating System", "IT-502 Computer Network", "IT-503(A) Theory of Computation (Departmental Elective)", "IT-503(B) Microprocessor & Interfacing (Departmental Elective)", "IT-503(C) Principles of Programming Languages (Departmental Elective)", "IT-504(A) Artificial Intelligence (Open Elective)", "IT-504(B) E-Commerce & Governance (Open Elective)", "IT-504(C) Java Programming (Open Elective)"],
        "6": ["IT-601 Computer Graphics & Multimedia", "IT-602 Wireless & Mobile Computing", "IT-603(A) Compiler Design", "IT-603(B) Data Mining", "IT-603(C) Embedded Systems", "IT-604(A) Intellectual Property Rights (IPR)", "IT-604(B) Software Engineering", "IT-604(C) Wireless Sensor Networks"],
        "7": ["IT-701 Soft Computing", "IT-702(A) Cloud Computing", "IT-702(B) Information Security", "IT-702(C) Big Data Analytics", "IT-703(A) Internet of Things (IoT)", "IT-703(B) Blockchain Technology", "IT-703(C) Cyber Security"],
        "8": ["IT-801 Major Project - Phase II", "IT-802 Comprehensive Viva-Voce", "IT-803 Seminar", "IT-804 Industrial Training / Internship"]
    },
    "ece": {
        "1": ["BT-101 Engineering Chemistry", "BT-102 Mathematics-I", "BT-103 English for Communication", "BT-104 Basic Electrical & Electronics Engineering", "BT-105 Engineering Graphics"],
        "2": ["BT-201 Engineering Physics", "BT-202 Mathematics-II", "BT-203 Basic Mechanical Engineering", "BT-204 Basic Civil Engineering & Mechanics", "BT-205 Basic Computer Engineering"],
        "3": ["BT-301 Mathematics-III", "EC-302 Electronic Measurement & Instrumentation", "EC-303 Digital System Design", "EC-304 Electronic Devices", "EC-305 Network Analysis"],
        "4": ["ES-401 Energy & Environmental Engineering", "EC-402 Signals & Systems", "EC-403 Analog Communication", "EC-404 Control System", "EC-405 Analog Circuits"],
        "5": ["EC-501 Microprocessor & Its Applications", "EC-502 Digital Communication", "EC-503-(A/B/C) Any one Departmental Elective", "EC-504-(A/B/C) Any one Open Elective"],
        "6": ["EC-601 Digital Signal Processing", "EC-602 Computer Architecture & Organization", "EC-603-(A/B/C) Any one Departmental Elective", "EC-604-(A/B/C) Any one Open Elective"],
        "7": ["EC-701 VLSI Design", "EC-702-(A/B/C) Choose one Departmental Elective", "EC-703-(A/B/C) Choose one Open Elective"],
        "8": ["EC-801 Optical Fibre Communication", "EC-802-(A/B/C) Choose one Departmental Elective", "EC-803-(A/B/C) Choose one Open Elective"]
    },
    "me": {
        "1": ["BT-101 Engineering Chemistry", "BT-102 Mathematics-I", "BT-103 English for Communication", "BT-104 Basic Electrical & Electronics Engineering", "BT-105 Engineering Graphics"],
        "2": ["BT-201 Engineering Physics", "BT-202 Mathematics-II", "BT-203 Basic Mechanical Engineering", "BT-204 Basic Civil Engineering & Mechanics", "BT-205 Basic Computer Engineering"],
        "3": ["ME-301 Thermodynamics", "ME-302 Material Science", "ME-303 Strength of Materials", "ME-304 Manufacturing Process", "ME-305 Fluid Mechanics", "ME-306 Energy & Environmental Engineering"],
        "4": ["ME-401 Theory of Machines", "ME-402 Applied Thermodynamics", "ME-403 Machine Drawing", "ME-404 Manufacturing Technology", "ME-405 Hydraulic Machines", "ME-406 Numerical Methods & Computer Programming"],
        "5": ["ME-501 Design of Machine Elements", "ME-502 Heat & Mass Transfer", "ME-503 Dynamics of Machines", "ME-504 Industrial Engineering & Management", "ME-505(A) Refrigeration & Air Conditioning", "ME-505(B) Automobile Engineering", "ME-505(C) Mechatronics"],
        "6": ["ME-601 Machine Design", "ME-602 Finite Element Methods", "ME-603 Internal Combustion Engines", "ME-604 Turbo Machines", "ME-605(A) Operations Research", "ME-605(B) Computer Integrated Manufacturing (CIM)", "ME-605(C) Renewable Energy Sources"],
        "7": ["ME-701 Mechanical Vibrations", "ME-702 CAD/CAM", "ME-703(A) Advanced Manufacturing Technology", "ME-703(B) Robotics", "ME-703(C) Non-Conventional Manufacturing Process", "ME-704(A) Power Plant Engineering", "ME-704(B) Automobile Engineering-II", "ME-704(C) Industrial Automation"],
        "8": ["ME-801(A) Computational Fluid Dynamics", "ME-801(B) Advanced IC Engines", "ME-801(C) Product Design & Development", "ME-802(A) Total Quality Management", "ME-802(B) Supply Chain Management", "ME-802(C) Industrial Safety Engineering"]
    },
    "civil": {
        "1": ["BT-101 Engineering Chemistry", "BT-102 Mathematics-I", "BT-103 English for Communication", "BT-104 Basic Electrical & Electronics Engineering", "BT-105 Engineering Graphics"],
        "2": ["BT-201 Engineering Physics", "BT-202 Mathematics-II", "BT-203 Basic Mechanical Engineering", "BT-204 Basic Civil Engineering & Mechanics", "BT-205 Basic Computer Engineering"],
        "3": ["CE-301 Strength of Materials", "CE-302 Building Materials", "CE-303 Surveying", "CE-304 Fluid Mechanics", "CE-305 Engineering Geology", "CE-306 Mathematics-III"],
        "4": ["CE-401 Structural Analysis", "CE-402 Geotechnical Engineering-I", "CE-403 Hydraulics", "CE-404 Concrete Technology", "CE-405(A) Building Planning & Architecture", "CE-405(B) Engineering Geology", "CE-405(C) Disaster Management"],
        "5": ["CE-501 Design of Reinforced Concrete Structures", "CE-502 Design of Steel Structures", "CE-503 Water Resources Engineering", "CE-504 Transportation Engineering-I", "CE-505(A) Environmental Engineering-I", "CE-505(B) Advanced Surveying", "CE-505(C) Construction Technology & Management"],
        "6": ["CE-601 Design of Prestressed Concrete Structures", "CE-602 Environmental Engineering-II", "CE-603 Transportation Engineering-II", "CE-604 Estimation, Costing & Valuation", "CE-605(A) Advanced Structural Analysis", "CE-605(B) Ground Water Engineering", "CE-605(C) Bridge Engineering"],
        "7": ["CE-701 Foundation Engineering", "CE-702 Construction Planning & Management", "CE-703(A) Earthquake Resistant Design", "CE-703(B) Advanced Highway Engineering", "CE-703(C) Remote Sensing & GIS", "CE-704(A) Finite Element Method", "CE-704(B) Pavement Design", "CE-704(C) Solid & Hazardous Waste Management"],
        "8": ["CE-801(A) Advanced Reinforced Concrete Design", "CE-801(B) Advanced Foundation Engineering", "CE-801(C) Traffic Engineering & Management", "CE-802(A) Repair & Rehabilitation of Structures", "CE-802(B) Irrigation Engineering", "CE-802(C) Environmental Impact Assessment"]
    },
    "e-all": {
        "1": ["BT-101 Engineering Chemistry", "BT-102 Mathematics-I", "BT-103 English for Communication", "BT-104 Basic Electrical & Electronics Engineering", "BT-105 Engineering Graphics"],
        "2": ["BT-201 Engineering Physics", "BT-202 Mathematics-II", "BT-203 Basic Mechanical Engineering", "BT-204 Basic Civil Engineering & Mechanics", "BT-205 Basic Computer Engineering"],
        "3": ["EE-301 Electrical Measurements & Measuring Instruments", "EE-302 Network Analysis", "EE-303 Analog Electronics", "EE-304 Electrical Machines-I", "EE-305 Engineering Mathematics-III"],
        "4": ["EE-401 Power System-I", "EE-402 Control Systems", "EE-403 Digital Electronics", "EE-404 Electrical Machines-II", "EE-405 Engineering Mathematics-IV"],
        "5": ["EE-501 Power Electronics", "EE-502 Power System-II", "EE-503 Microprocessors & Microcontrollers", "EE-504 Electrical Machine Design", "EE-505(A) High Voltage Engineering", "EE-505(B) Utilization of Electrical Energy", "EE-505(C) Electrical & Hybrid Vehicles"],
        "6": ["EE-601 Power System Analysis", "EE-602 Power System Protection", "EE-603 Digital Signal Processing", "EE-604 Switchgear & Protection", "EE-605(A) Flexible AC Transmission Systems (FACTS)", "EE-605(B) Renewable Energy Sources", "EE-605(C) Industrial Drives & Control"],
        "7": ["EE-701 Power System Operation & Control", "EE-702 Electrical Drives", "EE-703(A) HVDC Transmission", "EE-703(B) Energy Management & Auditing", "EE-703(C) Smart Grid Technology", "EE-704 Departmental Elective / Open Elective (as per RGPV scheme)"],
        "8": ["EE-801(A) Power Quality", "EE-801(B) Embedded Systems", "EE-801(C) Electric & Hybrid Vehicles", "EE-802(A) Distribution System Engineering", "EE-802(B) Artificial Intelligence Applications in Electrical Engineering", "EE-802(C) Energy Conservation & Management"]
    },
    "sd": {
        "1": ["BT-101 Engineering Chemistry", "BT-102 Mathematics-I", "BT-103 English for Communication", "BT-104 Basic Electrical & Electronics Engineering", "BT-105 Engineering Graphics"],
        "2": ["BT-201 Engineering Physics", "BT-202 Mathematics-II", "BT-203 Basic Mechanical Engineering", "BT-204 Basic Civil Engineering & Mechanics", "BT-205 Basic Computer Engineering"],
        "3": ["BT-301 Mathematics-III", "DS-302 Data Structures", "DS-303 Digital Systems", "DS-304 Discrete Mathematics", "DS-305 Object Oriented Programming & Methodology"],
        "4": ["BT-401 Mathematics-IV", "DS-402 Design & Analysis of Algorithms", "DS-403 Computer Organization & Architecture", "DS-404 Database Management Systems", "DS-405 Theory of Computation"],
        "5": ["CD-501 Computational Mathematics", "CD-502 Compiler Design", "CD-503 Cloud Computing", "CD-504 Artificial Intelligence", "CD-505-(A/B/C) Departmental Elective (any one):", "CD-505(A) Web Engineering", "CD-505(B) Machine Learning", "CD-505(C) Computational Intelligence"],
        "6": ["CD-601 Deep Learning", "CD-602 Computer Networks", "CD-603-(A/B/C) Departmental Elective (any one):", "CD-603(A) Big Data Analytics", "CD-603(B) Data Acquisition", "CD-603(C) Advanced Database Management System", "CD-604-(A/B/C) Open Elective (any one):", "CD-604(A) Information Extraction and Retrieval", "CD-604(B) Agile Software Development", "CD-604(C) Natural Language Processing"],
        "7": ["CD-701 Data Engineering", "CD-702-(A/B/C/D) Departmental Elective (any one):", "CD-702(A) Data Analytics & Visualization", "CD-702(B) Internet of Things (IoT)", "CD-702(C) Cloud Computing", "CD-702(D) Blockchain Technology", "CD-703-(A/B/C/D) Open Elective (any one):", "CD-703(A) Cryptography & Information Security", "CD-703(B) Data Mining & Warehousing", "CD-703(C) Agile Software Development", "CD-703(D) Disaster Management", "CD-704-(A/B/C/D) Departmental Elective (any one):", "CD-704(A) Advanced Statistics for Data Science", "CD-704(B) Explainable AI", "CD-704(C) Bioinformatics", "CD-704(D) Business Intelligence & Analytics"],
        "8": ["CD-801 Major Project / Internship Evaluation (no written theory paper)", "CD-802-(A/B/C/D) Departmental Elective (any one):", "CD-802(A) Reinforcement Learning", "CD-802(B) Project Management", "CD-802(C) Computational Statistics", "CD-802(D) Machine Learning for Data Science", "CD-803-(A/B/C/D) Open Elective (any one):", "CD-803(A) Blockchain Technologies", "CD-803(B) Time-Series Analysis", "CD-803(C) Quantum Computing", "CD-803(D) Human-Computer Interaction"]
    },
    "cy": {
        "1": ["BT-101 Engineering Chemistry", "BT-102 Mathematics-I", "BT-103 English for Communication", "BT-104 Basic Electrical & Electronics Engineering", "BT-105 Engineering Graphics"],
        "2": ["BT-201 Engineering Physics", "BT-202 Mathematics-II", "BT-203 Basic Mechanical Engineering", "BT-204 Basic Civil Engineering & Mechanics", "BT-205 Basic Computer Engineering"],
        "3": ["CY-301 Technical Communication", "CY-302 Discrete Structures", "CY-303 Data Structures", "CY-304 Digital Systems", "CY-305 Object Oriented Programming & Methodology"],
        "4": ["CY-401 Mathematics-III", "CY-402 Analysis & Design of Algorithms", "CY-403 Computer Organization & Architecture", "CY-404 Operating Systems", "CY-405 Database Management Systems (DBMS)"],
        "5": ["CY-501 OS Internals for Security Support", "CY-502 Design and Analysis of Algorithms", "CY-503 Network Security", "CY-504 (Elective)", "CY-504(A) Cyber Law and Intellectual Property Rights", "CY-504(B) Internet of Things", "CY-504(C) Computer Organization and Architecture"],
        "6": ["CY-601 Cryptography and Network Security", "CY-602 Computer Networks", "CY-603 Departmental Elective", "CY-603(A) Machine Learning", "CY-603(B) Advanced Computer Architecture", "CY-603(C) Compiler Design", "CY-604 Open Elective", "CY-604(A) Knowledge Management", "CY-604(B) Project Management", "CY-604(C) Rural Technology & Community Development"],
        "7": ["CY-701 Information Security Risk Management", "CY-702 Digital Forensics", "CY-703 (Departmental Elective", "CY-703(A) Ethical Hacking", "CY-703(B) Cyber Security Policies & Standards", "CY-703(C) Data Engineering", "CY-703(D) Cloud Computing"],
        "8": ["CD-801 Major Project / Internship Evaluation (no written theory paper)", "CD-802-(A/B/C/D) Departmental Elective (any one):", "CD-802(A) Reinforcement Learning", "CD-802(B) Project Management", "CD-802(C) Computational Statistics", "CD-802(D) Machine Learning for Data Science", "CD-803-(A/B/C/D) Open Elective (any one):", "CD-803(A) Blockchain Technologies", "CD-803(B) Time-Series Analysis", "CD-803(C) Quantum Computing", "CD-803(D) Human-Computer Interaction"]
    },
    "chemical": {
        "1": ["BT-101 Engineering Chemistry", "BT-102 Mathematics-I", "BT-103 English for Communication", "BT-104 Basic Electrical & Electronics Engineering", "BT-105 Engineering Graphics"],
        "2": ["BT-201 Engineering Physics", "BT-202 Mathematics-II", "BT-203 Basic Mechanical Engineering", "BT-204 Basic Civil Engineering & Mechanics", "BT-205 Basic Computer Engineering"],
        "3": ["BT-301 Mathematics-III", "CM-302 Chemical Engineering Thermodynamics", "CM-303 Advance Engineering Chemistry", "CM-304 Material & Energy Balance", "CM-305 Chemical Instrumentation"],
        "4": ["BT-401 Mathematics-III", "CM-402 Fluid Mechanics", "CM-403 Heat Transfer", "CM-404 Mechanical Operations", "CM-405 Chemical Engineering Process Calculations / Chemical Process Calculations*"],
        "5": ["CM-501 Mass Transfer-I", "CM-502 Chemical Reaction Engineering-I", "CM-503(A) Computation Methods in Chemical Engineering", "CM-503(B) Pulp & Paper Technology", "CM-503(C) Pharmaceutical Technology", "CM-504(A) Organic Process Technology", "CM-504(B) Fuel Cell Technology", "CM-504(C) Energy Management"],
        "6": ["CM-601 Mass Transfer-II", "CM-602 Chemical Reaction Engineering-II", "CM-603 Process Dynamics & Control", "CM-604(A) Polymer Technology", "CM-604(B) Petrochemical Technology", "CM-604(C) Fertilizer Technology", "CM-605(A) Environmental Engineering", "CM-605(B) Food Technology", "CM-605(C) Safety & Hazard Management"],
        "7": ["CM-701 Process Equipment Design", "CM-702 Chemical Process Industries", "CM-703(A) Transport Phenomena", "CM-703(B) Biochemical Engineering", "CM-703(C) Corrosion Engineering", "CM-704(A) Membrane Technology", "CM-704(B) Nanotechnology", "CM-704(C) Industrial Pollution Control"],
        "8": ["CM-801(A) Petroleum Refinery Engineering", "CM-801(B) Process Plant Utilities", "CM-801(C) Advanced Separation Processes", "CM-802(A) Process Economics & Plant Design", "CM-802(B) Energy Conservation in Process Industries", "CM-802(C) Industrial Waste Management"]
    },
    "auto": {
        "1": ["BT-101 Engineering Mathematics-I", "BT-102 Engineering Chemistry", "BT-103 English for Communication", "BT-104 Basic Electrical & Electronics Engineering", "BT-105 Engineering Graphics"],
        "2": ["BT-201 Engineering Mathematics-II", "BT-202 Engineering Physics", "BT-203 Basic Mechanical Engineering", "BT-204 Basic Civil Engineering & Mechanics", "BT-205 Basic Computer Engineering"],
        "3": ["BT-301 Mathematics-III", "AU-302 Engineering Thermodynamics", "AU-303 Strength of Materials", "AU-304 Manufacturing Technology", "AU-305 Automobile Engineering Materials"],
        "4": ["BT-401 Mathematics-IV", "AU-402 Fluid Mechanics & Hydraulic Machines", "AU-403 Theory of Machines", "AU-404 Applied Thermodynamics", "AU-405 Machine Drawing & Design"],
        "5": ["AU-501 Internal Combustion Engines", "AU-502 Automobile Transmission", "AU-503(A) Vehicle Body Engineering", "AU-503(B) Tractor & Farm Machinery", "AU-503(C) Vehicle Maintenance", "AU-504(A) Automotive Electrical & Electronics", "AU-504(B) Two & Three Wheeler Technology", "AU-504(C) Automobile Air Conditioning"],
        "6": ["AU-601 Vehicle Dynamics", "AU-602 Automobile Chassis Design", "AU-603 Automobile Pollution & Control", "AU-604(A) Automotive Safety", "AU-604(B) Alternative Fuels & Energy Systems", "AU-604(C) Automotive Aerodynamics"],
        "7": ["AU-701 Automotive Engine Management Systems", "AU-702 Electric & Hybrid Vehicles", "AU-703(A) Vehicle Testing & Homologation", "AU-703(B) Transport Management", "AU-703(C) Automotive Robotics", "AU-704 Industrial Management & Entrepreneurship"],
        "8": ["AU-801 Automobile System Design", "AU-802 Recent Trends in Automobile Engineering", "AU-803(A) Advanced Automotive Electronics", "AU-803(B) Intelligent Transportation Systems", "AU-803(C) Automotive Mechatronics"]
    },
    "production": {
        "1": ["BT-101 Engineering Mathematics-I", "BT-102 Engineering Chemistry", "BT-103 English for Communication", "BT-104 Basic Electrical & Electronics Engineering", "BT-105 Engineering Graphics"],
        "2": ["BT-201 Engineering Mathematics-II", "BT-202 Engineering Physics", "BT-203 Basic Mechanical Engineering", "BT-204 Basic Civil Engineering & Mechanics", "BT-205 Basic Computer Engineering"],
        "3": ["BT-301 Mathematics-III", "PR-302 Manufacturing Process-I", "PR-303 Strength of Materials", "PR-304 Engineering Materials", "PR-305 Metrology & Measurement"],
        "4": ["BT-401 Mathematics-IV", "PR-402 Manufacturing Process-II", "PR-403 Theory of Machines", "PR-404 Machine Design-I", "PR-405 Industrial Engineering"],
        "5": ["PR-501 Production Planning & Control", "PR-502 Machine Tool Design", "PR-503(A) Operations Research", "PR-503(B) Quality Engineering", "PR-503(C) Tool Engineering", "PR-504(A) Heat Treatment Technology", "PR-504(B) Non-Conventional Manufacturing Processes", "PR-504(C) Automation in Manufacturing"],
        "6": ["PR-601 CAD/CAM", "PR-602 Machine Design-II", "PR-603 Metal Forming Technology", "PR-604(A) Flexible Manufacturing Systems", "PR-604(B) Robotics in Manufacturing", "PR-604(C) Total Quality Management"],
        "7": ["PR-701 Production Management", "PR-702 CIM (Computer Integrated Manufacturing)", "PR-703(A) Supply Chain Management", "PR-703(B) Lean Manufacturing", "PR-703(C) Advanced Manufacturing Technology", "PR-704 Entrepreneurship & Industrial Management"],
        "8": ["PR-801 Advanced Production Engineering", "PR-802 Modern Manufacturing Systems", "PR-803(A) Reliability Engineering", "PR-803(B) Product Design & Development", "PR-803(C) Six Sigma & Quality Systems"]
    },
    "aero": {
        "1": ["BT-101 Engineering Mathematics-I", "BT-102 Engineering Chemistry", "BT-103 English for Communication", "BT-104 Basic Electrical & Electronics Engineering", "BT-105 Engineering Graphics"],
        "2": ["BT-201 Engineering Mathematics-II", "BT-202 Engineering Physics", "BT-203 Basic Mechanical Engineering", "BT-204 Basic Civil Engineering & Mechanics", "BT-205 Basic Computer Engineering"],
        "3": ["BT-301 Mathematics-III", "AE-302 Aerodynamics-I", "AE-303 Aircraft Structures-I", "AE-304 Aircraft Propulsion-I", "AE-305 Engineering Thermodynamics"],
        "4": ["BT-401 Mathematics-IV", "AE-402 Aerodynamics-II", "AE-403 Aircraft Structures-II", "AE-404 Aircraft Propulsion-II", "AE-405 Flight Mechanics-I"],
        "5": ["AE-501 Aircraft Design-I", "AE-502 Aircraft Systems & Instruments", "AE-503(A) Gas Dynamics", "AE-503(B) Helicopter Engineering", "AE-503(C) Rocket Propulsion", "AE-504(A) Aerospace Materials", "AE-504(B) Space Technology", "AE-504(C) Aircraft Production Technology"],
        "6": ["AE-601 Flight Mechanics-II", "AE-602 Aircraft Design-II", "AE-603 Aircraft Stability & Control", "AE-604(A) Computational Fluid Dynamics", "AE-604(B) Aircraft Maintenance Engineering", "AE-604(C) Avionics"],
        "7": ["AE-701 Aerospace Vehicle Design", "AE-702 Experimental Aerodynamics", "AE-703(A) Finite Element Methods", "AE-703(B) Unmanned Aerial Vehicles (UAV)", "AE-703(C) Missile Technology", "AE-704 Industrial Management & Entrepreneurship"],
        "8": ["AE-801 Advanced Aerospace Engineering", "AE-802 Recent Trends in Aeronautical Engineering", "AE-803(A) Aircraft Certification & Airworthiness", "AE-803(B) Spacecraft Systems", "AE-803(C) Advanced Avionics"]
    },
    "bme": {
        "1": ["BT-101 Engineering Mathematics-I", "BT-102 Engineering Chemistry", "BT-103 English for Communication", "BT-104 Basic Electrical & Electronics Engineering", "BT-105 Engineering Graphics"],
        "2": ["BT-201 Engineering Mathematics-II", "BT-202 Engineering Physics", "BT-203 Basic Mechanical Engineering", "BT-204 Basic Civil Engineering & Mechanics", "BT-205 Basic Computer Engineering"],
        "3": ["BT-301 Mathematics-III", "BM-302 Human Anatomy & Physiology", "BM-303 Biomedical Instrumentation", "BM-304 Electronic Devices & Circuits", "BM-305 Signals & Systems"],
        "4": ["BT-401 Mathematics-IV", "BM-402 Medical Electronics", "BM-403 Sensors & Transducers", "BM-404 Digital Signal Processing", "BM-405 Biomaterials"],
        "5": ["BM-501 Medical Imaging Systems", "BM-502 Biomedical Signal Processing", "BM-503(A) Artificial Organs", "BM-503(B) Rehabilitation Engineering", "BM-503(C) Bioinformatics", "BM-504(A) Hospital Engineering", "BM-504(B) Diagnostic & Therapeutic Equipment", "BM-504(C) Biomedical Optics"],
        "6": ["BM-601 Biomechanics", "BM-602 Medical Image Processing", "BM-603 Biomedical Microprocessors", "BM-604(A) Neural Engineering", "BM-604(B) Embedded Systems for Biomedical Applications", "BM-604(C) Telemedicine"],
        "7": ["BM-701 Biomedical Engineering Design", "BM-702 Biomedical Instrumentation-II", "BM-703(A) Tissue Engineering", "BM-703(B) Clinical Engineering", "BM-703(C) Nanotechnology in Medicine", "BM-704 Industrial Management & Entrepreneurship"],
        "8": ["BM-801 Advanced Biomedical Engineering", "BM-802 Recent Trends in Biomedical Engineering", "BM-803(A) Medical Robotics", "BM-803(B) Healthcare Technology Management", "BM-803(C) Biomedical Data Analytics"]
    },
    "io": {
        "1": ["BT-101 Engineering Mathematics-I", "BT-102 Engineering Chemistry", "BT-103 English for Communication", "BT-104 Basic Electrical & Electronics Engineering", "BT-105 Engineering Graphics"],
        "2": ["BT-201 Engineering Mathematics-II", "BT-202 Engineering Physics", "BT-203 Basic Mechanical Engineering", "BT-204 Basic Civil Engineering & Mechanics", "BT-205 Basic Computer Engineering"],
        "3": ["BT-301 Mathematics-III", "IE-302 Digital Electronics", "IE-303 Data Structures", "IE-304 Computer Organization & Architecture", "IE-305 Electronic Devices & Circuits"],
        "4": ["BT-401 Mathematics-IV", "IE-402 Microprocessors & Microcontrollers", "IE-403 Embedded Systems", "IE-404 Operating Systems", "IE-405 Computer Networks"],
        "5": ["IE-501 Internet of Things", "IE-502 Wireless Sensor Networks", "IE-503(A) ARM Processor Architecture", "IE-503(B) Real Time Operating Systems", "IE-503(C) FPGA Design", "IE-504(A) Cloud Computing", "IE-504(B) Cyber Security", "IE-504(C) VLSI Design"],
        "6": ["IE-601 IoT System Design", "IE-602 Embedded Linux", "IE-603 Industrial IoT", "IE-604(A) Edge Computing", "IE-604(B) Machine Learning for IoT", "IE-604(C) Robotics & Automation"],
        "7": ["IE-701 Advanced Embedded Systems", "IE-702 IoT Security", "IE-703(A) Smart Cities & Smart Infrastructure", "IE-703(B) Automotive Embedded Systems", "IE-703(C) Wearable Computing", "IE-704 Entrepreneurship & Industrial Management"],
        "8": ["IE-801 Advanced IoT Applications", "IE-802 Recent Trends in IoT & Embedded Systems", "IE-803(A) AI for IoT", "IE-803(B) Internet of Medical Things (IoMT)", "IE-803(C) Advanced Embedded System Design"]
    },
    "power": {
        "1": ["BT-101 Engineering Mathematics-I", "BT-102 Engineering Chemistry", "BT-103 English for Communication", "BT-104 Basic Electrical & Electronics Engineering", "BT-105 Engineering Graphics"],
        "2": ["BT-201 Engineering Mathematics-II", "BT-202 Engineering Physics", "BT-203 Basic Mechanical Engineering", "BT-204 Basic Civil Engineering & Mechanics", "BT-205 Basic Computer Engineering"],
        "3": ["BT-301 Mathematics-III", "PE-302 Network Analysis", "PE-303 Electrical Machines-I", "PE-304 Electronic Devices & Circuits", "PE-305 Digital Electronics"],
        "4": ["BT-401 Mathematics-IV", "PE-402 Electrical Machines-II", "PE-403 Analog Electronics", "PE-404 Power Systems-I", "PE-405 Control Systems"],
        "5": ["PE-501 Power Electronics", "PE-502 Microprocessors & Microcontrollers", "PE-503(A) Electrical Drives", "PE-503(B) High Voltage Engineering", "PE-503(C) Industrial Electronics", "PE-504(A) Signals & Systems", "PE-504(B) Renewable Energy Systems", "PE-504(C) Embedded Systems"],
        "6": ["PE-601 Advanced Power Electronics", "PE-602 Power System-II", "PE-603 Digital Control Systems", "PE-604(A) FACTS Devices", "PE-604(B) Electric Drives & Control", "PE-604(C) HVDC Transmission"],
        "7": ["PE-701 Power Quality", "PE-702 Electric & Hybrid Vehicles", "PE-703(A) Smart Grid", "PE-703(B) Flexible AC Transmission Systems", "PE-703(C) Power Semiconductor Devices", "PE-704 Industrial Management & Entrepreneurship"],
        "8": ["PE-801 Advanced Electrical Drives", "PE-802 Recent Trends in Power Electronics", "PE-803(A) Renewable Energy Integration", "PE-803(B) Energy Management Systems", "PE-803(C) Industrial Automation"]
    },
    "rm": {
        "1": ["BT-101 Engineering Mathematics-I", "BT-102 Engineering Chemistry", "BT-103 English for Communication", "BT-104 Basic Electrical & Electronics Engineering", "BT-105 Engineering Graphics"],
        "2": ["BT-201 Engineering Mathematics-II", "BT-202 Engineering Physics", "BT-203 Basic Mechanical Engineering", "BT-204 Basic Civil Engineering & Mechanics", "BT-205 Basic Computer Engineering"],
        "3": ["BT-301 Mathematics-III", "MT-302 Engineering Mechanics", "MT-303 Strength of Materials", "MT-304 Electrical Machines", "MT-305 Electronic Devices & Circuits"],
        "4": ["BT-401 Mathematics-IV", "MT-402 Theory of Machines", "MT-403 Analog & Digital Electronics", "MT-404 Microprocessors & Microcontrollers", "MT-405 Fluid Power Engineering"],
        "5": ["MT-501 Mechatronics System Design", "MT-502 Industrial Automation", "MT-503(A) Robotics", "MT-503(B) PLC & SCADA", "MT-503(C) Sensors & Transducers", "MT-504(A) Control Systems", "MT-504(B) Embedded Systems", "MT-504(C) Computer Integrated Manufacturing"],
        "6": ["MT-601 Robotics & Automation", "MT-602 CNC Machines & Programming", "MT-603 Industrial Drives", "MT-604(A) Artificial Intelligence", "MT-604(B) Machine Vision", "MT-604(C) Internet of Things for Mechatronics"],
        "7": ["MT-701 Advanced Mechatronics", "MT-702 Intelligent Manufacturing Systems", "MT-703(A) Autonomous Robots", "MT-703(B) Flexible Manufacturing Systems", "MT-703(C) MEMS & Microsystems", "MT-704 Entrepreneurship & Industrial Management"],
        "8": ["MT-801 Advanced Robotics", "MT-802 Recent Trends in Mechatronics", "MT-803(A) Human Robot Interaction", "MT-803(B) Smart Manufacturing", "MT-803(C) Advanced Control Engineering"]
    },
    "instrumentation": {
        "1": ["BT-101 Engineering Mathematics-I", "BT-102 Engineering Chemistry", "BT-103 English for Communication", "BT-104 Basic Electrical & Electronics Engineering", "BT-105 Engineering Graphics"],
        "2": ["BT-201 Engineering Mathematics-II", "BT-202 Engineering Physics", "BT-203 Basic Mechanical Engineering", "BT-204 Basic Civil Engineering & Mechanics", "BT-205 Basic Computer Engineering"],
        "3": ["BT-301 Mathematics-III", "IN-302 Electrical Circuits & Networks", "IN-303 Electronic Devices & Circuits", "IN-304 Digital Electronics", "IN-305 Sensors & Transducers"],
        "4": ["BT-401 Mathematics-IV", "IN-402 Analog Electronics", "IN-403 Industrial Instrumentation", "IN-404 Control Systems", "IN-405 Signals & Systems"],
        "5": ["IN-501 Process Control", "IN-502 Microprocessors & Microcontrollers", "IN-503(A) Biomedical Instrumentation", "IN-503(B) Analytical Instrumentation", "IN-503(C) Digital Signal Processing", "IN-504(A) Industrial Automation", "IN-504(B) PLC & SCADA", "IN-504(C) Embedded Systems"],
        "6": ["IN-601 Advanced Process Control", "IN-602 Computer Control of Processes", "IN-603 Power Plant Instrumentation", "IN-604(A) Robotics & Automation", "IN-604(B) Optical Instrumentation", "IN-604(C) Wireless Instrumentation"],
        "7": ["IN-701 Distributed Control Systems", "IN-702 Industrial Safety & Instrumentation", "IN-703(A) Virtual Instrumentation", "IN-703(B) MEMS & Microsystems", "IN-703(C) IoT for Instrumentation", "IN-704 Industrial Management & Entrepreneurship"],
        "8": ["IN-801 Advanced Instrumentation Engineering", "IN-802 Recent Trends in Instrumentation", "IN-803(A) Smart Sensors & Measurement Systems", "IN-803(B) Industrial IoT", "IN-803(C) Artificial Intelligence in Instrumentation"]
    },
    "env": {
        "1": ["BT-101 Engineering Mathematics-I", "BT-102 Engineering Chemistry", "BT-103 English for Communication", "BT-104 Basic Electrical & Electronics Engineering", "BT-105 Engineering Graphics"],
        "2": ["BT-201 Engineering Mathematics-II", "BT-202 Engineering Physics", "BT-203 Basic Mechanical Engineering", "BT-204 Basic Civil Engineering & Mechanics", "BT-205 Basic Computer Engineering"],
        "3": ["BT-301 Mathematics-III", "EV-302 Environmental Chemistry", "EV-303 Fluid Mechanics", "EV-304 Engineering Geology", "EV-305 Environmental Microbiology"],
        "4": ["BT-401 Mathematics-IV", "EV-402 Water Supply Engineering", "EV-403 Wastewater Engineering", "EV-404 Air Pollution & Control", "EV-405 Solid Waste Management"],
        "5": ["EV-501 Environmental Impact Assessment", "EV-502 Industrial Waste Management", "EV-503(A) Noise Pollution & Control", "EV-503(B) Hazardous Waste Management", "EV-503(C) Environmental Biotechnology", "EV-504(A) Environmental Modeling", "EV-504(B) Groundwater Engineering", "EV-504(C) Renewable Energy Systems"],
        "6": ["EV-601 Water & Wastewater Treatment", "EV-602 Environmental Management", "EV-603 Remote Sensing & GIS", "EV-604(A) Climate Change & Sustainable Development", "EV-604(B) Industrial Safety & Environmental Engineering", "EV-604(C) Environmental Laws & Policies"],
        "7": ["EV-701 Environmental Systems Engineering", "EV-702 Resource Conservation & Recycling", "EV-703(A) Green Building Technology", "EV-703(B) Disaster Management", "EV-703(C) Energy & Environment", "EV-704 Industrial Management & Entrepreneurship"],
        "8": ["EV-801 Advanced Environmental Engineering", "EV-802 Recent Trends in Environmental Engineering", "EV-803(A) Sustainable Infrastructure", "EV-803(B) Environmental Risk Assessment", "EV-803(C) Cleaner Production Technology"]
    },
    "arch": {
        "1": ["AR-101 Architectural Design-I", "AR-102 Building Materials & Construction-I", "AR-103 Architectural Graphics-I", "AR-104 Theory of Structures-I", "AR-105 History of Architecture-I"],
        "2": ["AR-201 Architectural Design-II", "AR-202 Building Materials & Construction-II", "AR-203 Architectural Graphics-II", "AR-204 Theory of Structures-II", "AR-205 History of Architecture-II"],
        "3": ["AR-301 Architectural Design-III", "AR-302 Building Construction-III", "AR-303 Climatology", "AR-304 Theory of Structures-III", "AR-305 History of Architecture-III"],
        "4": ["AR-401 Architectural Design-IV", "AR-402 Building Construction-IV", "AR-403 Building Services-I", "AR-404 Theory of Structures-IV", "AR-405 Estimation & Costing"],
        "5": ["AR-501 Architectural Design-V", "AR-502 Building Services-II", "AR-503 Landscape Architecture", "AR-504 Specifications & Contracts", "AR-505 Interior Design"],
        "6": ["AR-601 Architectural Design-VI", "AR-602 Housing", "AR-603 Urban Planning", "AR-604 Quantity Surveying & Valuation", "AR-605 Professional Practice-I"],
        "7": ["AR-701 Architectural Design-VII", "AR-702 Town Planning", "AR-703 Advanced Building Construction", "AR-704 Building Management", "AR-705 Professional Practice-II"],
        "8": ["AR-801 Architectural Design-VIII", "AR-802 Environmental Planning", "AR-803 Advanced Building Services", "AR-804 Disaster Management", "AR-805 Research Methodology"]
    },
    "mm": {
        "1": ["BT-101 Engineering Mathematics-I", "BT-102 Engineering Chemistry", "BT-103 English for Communication", "BT-104 Basic Electrical & Electronics Engineering", "BT-105 Engineering Graphics"],
        "2": ["BT-201 Engineering Mathematics-II", "BT-202 Engineering Physics", "BT-203 Basic Mechanical Engineering", "BT-204 Basic Civil Engineering & Mechanics", "BT-205 Basic Computer Engineering"],
        "3": ["BT-301 Mathematics-III", "ML-302 Physical Metallurgy", "ML-303 Engineering Thermodynamics", "ML-304 Metallurgical Analysis", "ML-305 Engineering Materials"],
        "4": ["BT-401 Mathematics-IV", "ML-402 Mechanical Metallurgy", "ML-403 Extractive Metallurgy-I", "ML-404 Phase Transformations", "ML-405 Fuel, Furnace & Refractories"],
        "5": ["ML-501 Iron Making", "ML-502 Steel Making", "ML-503(A) Foundry Technology", "ML-503(B) Welding Technology", "ML-503(C) Powder Metallurgy", "ML-504(A) Heat Treatment Technology", "ML-504(B) Corrosion Engineering", "ML-504(C) Non-Ferrous Metallurgy"],
        "6": ["ML-601 Extractive Metallurgy-II", "ML-602 Mechanical Behaviour of Materials", "ML-603 Materials Characterization", "ML-604(A) Composite Materials", "ML-604(B) Surface Engineering", "ML-604(C) Nano Materials"],
        "7": ["ML-701 Advanced Physical Metallurgy", "ML-702 Materials Processing", "ML-703(A) Failure Analysis", "ML-703(B) Industrial Metallurgy", "ML-703(C) Advanced Materials", "ML-704 Industrial Management & Entrepreneurship"],
        "8": ["ML-801 Modern Metallurgical Engineering", "ML-802 Recent Trends in Metallurgy", "ML-803(A) Biomaterials", "ML-803(B) Energy Materials", "ML-803(C) Materials Selection & Design"]
    },
    "mi": {
        "1": ["BT-101 Engineering Mathematics-I", "BT-102 Engineering Chemistry", "BT-103 English for Communication", "BT-104 Basic Electrical & Electronics Engineering", "BT-105 Engineering Graphics"],
        "2": ["BT-201 Engineering Mathematics-II", "BT-202 Engineering Physics", "BT-203 Basic Mechanical Engineering", "BT-204 Basic Civil Engineering & Mechanics", "BT-205 Basic Computer Engineering"],
        "3": ["BT-301 Mathematics-III", "MN-302 Introduction to Mining Engineering", "MN-303 Mine Surveying-I", "MN-304 Mining Geology", "MN-305 Rock Mechanics"],
        "4": ["BT-401 Mathematics-IV", "MN-402 Surface Mining", "MN-403 Underground Coal Mining", "MN-404 Mine Surveying-II", "MN-405 Mine Ventilation"],
        "5": ["MN-501 Mine Environmental Engineering", "MN-502 Mine Machinery", "MN-503(A) Drilling & Blasting", "MN-503(B) Mineral Processing", "MN-503(C) Mine Safety Engineering", "MN-504(A) Underground Metal Mining", "MN-504(B) Mine Management", "MN-504(C) Tunnelling Engineering"],
        "6": ["MN-601 Mine Planning & Design", "MN-602 Mine Economics", "MN-603 Mine Transportation", "MN-604(A) Rock Excavation Engineering", "MN-604(B) Advanced Mine Ventilation", "MN-604(C) Geo-Mechanics"],
        "7": ["MN-701 Mine Systems Engineering", "MN-702 Mine Legislation", "MN-703(A) Computer Applications in Mining", "MN-703(B) Mine Automation", "MN-703(C) Remote Sensing & GIS in Mining", "MN-704 Industrial Management & Entrepreneurship"],
        "8": ["MN-801 Advanced Mining Engineering", "MN-802 Recent Trends in Mining Engineering", "MN-803(A) Sustainable Mining", "MN-803(B) Mine Disaster Management", "MN-803(C) Advanced Mineral Exploration"]
    },
    "tx": {
        "1": ["BT-101 Engineering Mathematics-I", "BT-102 Engineering Chemistry", "BT-103 English for Communication", "BT-104 Basic Electrical & Electronics Engineering", "BT-105 Engineering Graphics"],
        "2": ["BT-201 Engineering Mathematics-II", "BT-202 Engineering Physics", "BT-203 Basic Mechanical Engineering", "BT-204 Basic Civil Engineering & Mechanics", "BT-205 Basic Computer Engineering"],
        "3": ["BT-301 Mathematics-III", "TT-302 Fibre Science & Technology", "TT-303 Yarn Manufacturing Technology-I", "TT-304 Textile Testing", "TT-305 Textile Raw Materials"],
        "4": ["BT-401 Mathematics-IV", "TT-402 Yarn Manufacturing Technology-II", "TT-403 Fabric Manufacturing Technology", "TT-404 Textile Physics", "TT-405 Textile Chemical Processing-I"],
        "5": ["TT-501 Textile Chemical Processing-II", "TT-502 Knitting Technology", "TT-503(A) Weaving Technology", "TT-503(B) Nonwoven Technology", "TT-503(C) Textile Machinery", "TT-504(A) Garment Manufacturing Technology", "TT-504(B) Textile Quality Control", "TT-504(C) Technical Textiles"],
        "6": ["TT-601 Textile Design", "TT-602 Textile Finishing", "TT-603 Apparel Technology", "TT-604(A) Textile Management", "TT-604(B) Industrial Engineering in Textiles", "TT-604(C) Computer Applications in Textiles"],
        "7": ["TT-701 Advanced Textile Technology", "TT-702 Textile Engineering Economics", "TT-703(A) Fashion Technology", "TT-703(B) Textile Composite Materials", "TT-703(C) Smart Textiles", "TT-704 Industrial Management & Entrepreneurship"],
        "8": ["TT-801 Modern Textile Technology", "TT-802 Recent Trends in Textile Engineering", "TT-803(A) Sustainable Textile Technology", "TT-803(B) Advanced Garment Engineering", "TT-803(C) Technical & Functional Textiles"]
    },
    "petroleum": {
        "1": ["BT-101 Engineering Mathematics-I", "BT-102 Engineering Chemistry", "BT-103 English for Communication", "BT-104 Basic Electrical & Electronics Engineering", "BT-105 Engineering Graphics"],
        "2": ["BT-201 Engineering Mathematics-II", "BT-202 Engineering Physics", "BT-203 Basic Mechanical Engineering", "BT-204 Basic Civil Engineering & Mechanics", "BT-205 Basic Computer Engineering"],
        "3": ["BT-301 Mathematics-III", "PT-302 Petroleum Geology", "PT-303 Fluid Mechanics", "PT-304 Engineering Thermodynamics", "PT-305 Drilling Engineering-I"],
        "4": ["BT-401 Mathematics-IV", "PT-402 Reservoir Engineering-I", "PT-403 Drilling Engineering-II", "PT-404 Well Logging & Formation Evaluation", "PT-405 Petroleum Production Engineering-I"],
        "5": ["PT-501 Petroleum Production Engineering-II", "PT-502 Reservoir Engineering-II", "PT-503(A) Natural Gas Engineering", "PT-503(B) Offshore Drilling Technology", "PT-503(C) Petroleum Refining Technology", "PT-504(A) Enhanced Oil Recovery", "PT-504(B) Pipeline Engineering", "PT-504(C) Petroleum Economics"],
        "6": ["PT-601 Reservoir Simulation", "PT-602 Well Testing", "PT-603 Petroleum Exploration", "PT-604(A) Offshore Production Engineering", "PT-604(B) Health, Safety & Environment in Petroleum Industry", "PT-604(C) Unconventional Oil & Gas Resources"],
        "7": ["PT-701 Advanced Drilling Engineering", "PT-702 Petroleum Reservoir Management", "PT-703(A) LNG Technology", "PT-703(B) Oil & Gas Processing", "PT-703(C) Energy Engineering", "PT-704 Industrial Management & Entrepreneurship"],
        "8": ["PT-801 Advanced Petroleum Engineering", "PT-802 Recent Trends in Petroleum Engineering", "PT-803(A) Deepwater Drilling Technology", "PT-803(B) Carbon Capture & Storage", "PT-803(C) Petroleum Asset Management"]
    },
    "ft": {
        "1": ["BT-101 Engineering Mathematics-I", "BT-102 Engineering Chemistry", "BT-103 English for Communication", "BT-104 Basic Electrical & Electronics Engineering", "BT-105 Engineering Graphics"],
        "2": ["BT-201 Engineering Mathematics-II", "BT-202 Engineering Physics", "BT-203 Basic Mechanical Engineering", "BT-204 Basic Civil Engineering & Mechanics", "BT-205 Basic Computer Engineering"],
        "3": ["BT-301 Mathematics-III", "FT-302 Food Chemistry", "FT-303 Food Microbiology", "FT-304 Engineering Properties of Food", "FT-305 Food Biochemistry"],
        "4": ["BT-401 Mathematics-IV", "FT-402 Food Processing Technology-I", "FT-403 Food Preservation Technology", "FT-404 Heat & Mass Transfer", "FT-405 Food Analysis & Instrumentation"],
        "5": ["FT-501 Food Processing Technology-II", "FT-502 Dairy Technology", "FT-503(A) Fruit & Vegetable Processing", "FT-503(B) Cereal, Pulse & Oilseed Technology", "FT-503(C) Meat, Fish & Poultry Processing", "FT-504(A) Food Packaging Technology", "FT-504(B) Food Plant Engineering", "FT-504(C) Food Quality Assurance"],
        "6": ["FT-601 Food Process Engineering", "FT-602 Food Safety & Standards", "FT-603 Refrigeration & Cold Storage", "FT-604(A) Functional Foods & Nutraceuticals", "FT-604(B) Bakery & Confectionery Technology", "FT-604(C) Beverage Technology"],
        "7": ["FT-701 Food Product Development", "FT-702 Food Biotechnology", "FT-703(A) Food Supply Chain Management", "FT-703(B) Quality Management Systems", "FT-703(C) Food Waste Management", "FT-704 Industrial Management & Entrepreneurship"],
        "8": ["FT-801 Advanced Food Technology", "FT-802 Recent Trends in Food Technology", "FT-803(A) Food Nanotechnology", "FT-803(B) Food Toxicology", "FT-803(C) Food Business Management"]
    },
    "robotics": {
        "1": ["BT-101 Engineering Mathematics-I", "BT-102 Engineering Chemistry", "BT-103 English for Communication", "BT-104 Basic Electrical & Electronics Engineering", "BT-105 Engineering Graphics"],
        "2": ["BT-201 Engineering Mathematics-II", "BT-202 Engineering Physics", "BT-203 Basic Mechanical Engineering", "BT-204 Basic Civil Engineering & Mechanics", "BT-205 Basic Computer Engineering"],
        "3": ["BT-301 Mathematics-III", "RB-302 Engineering Mechanics", "RB-303 Electronic Devices & Circuits", "RB-304 Data Structures", "RB-305 Digital Electronics"],
        "4": ["BT-401 Mathematics-IV", "RB-402 Microprocessors & Microcontrollers", "RB-403 Control Systems", "RB-404 Sensors & Actuators", "RB-405 Kinematics of Machines"],
        "5": ["RB-501 Robotics Engineering", "RB-502 Embedded Systems", "RB-503(A) Industrial Robotics", "RB-503(B) Artificial Intelligence", "RB-503(C) Machine Vision", "RB-504(A) PLC & SCADA", "RB-504(B) Mechatronics", "RB-504(C) Computer Vision"],
        "6": ["RB-601 Robot Dynamics & Control", "RB-602 Autonomous Mobile Robots", "RB-603 Internet of Things", "RB-604(A) Machine Learning", "RB-604(B) Human Robot Interaction", "RB-604(C) Industrial Automation"],
        "7": ["RB-701 Advanced Robotics", "RB-702 Intelligent Robotic Systems", "RB-703(A) Swarm Robotics", "RB-703(B) Medical Robotics", "RB-703(C) UAV & Drone Technology", "RB-704 Industrial Management & Entrepreneurship"],
        "8": ["RB-801 Advanced Robot Design", "RB-802 Recent Trends in Robotics Engineering", "RB-803(A) Collaborative Robotics (Cobots)", "RB-803(B) Robotic Process Automation (RPA)", "RB-803(C) AI Applications in Robotics"]
    },
    "nano": {
        "1": ["BT-101 Engineering Mathematics-I", "BT-102 Engineering Chemistry", "BT-103 English for Communication", "BT-104 Basic Electrical & Electronics Engineering", "BT-105 Engineering Graphics"],
        "2": ["BT-201 Engineering Mathematics-II", "BT-202 Engineering Physics", "BT-203 Basic Mechanical Engineering", "BT-204 Basic Civil Engineering & Mechanics", "BT-205 Basic Computer Engineering"],
        "3": ["BT-301 Mathematics-III", "NT-302 Introduction to Nanotechnology", "NT-303 Solid State Physics", "NT-304 Materials Science", "NT-305 Engineering Chemistry for Nanotechnology"],
        "4": ["BT-401 Mathematics-IV", "NT-402 Nano Materials", "NT-403 Quantum Mechanics", "NT-404 Nano Fabrication Techniques", "NT-405 Nano Characterization Techniques"],
        "5": ["NT-501 Nano Electronics", "NT-502 Nano Biotechnology", "NT-503(A) Carbon Nanomaterials", "NT-503(B) Nano Photonics", "NT-503(C) Nano Sensors", "NT-504(A) Thin Film Technology", "NT-504(B) MEMS & NEMS", "NT-504(C) Computational Nanotechnology"],
        "6": ["NT-601 Nanocomposites", "NT-602 Nano Device Engineering", "NT-603 Nano Toxicology & Safety", "NT-604(A) Biomedical Nanotechnology", "NT-604(B) Energy Nanotechnology", "NT-604(C) Polymer Nanotechnology"],
        "7": ["NT-701 Advanced Nanotechnology", "NT-702 Nano Manufacturing", "NT-703(A) Nano Medicine", "NT-703(B) Environmental Nanotechnology", "NT-703(C) Nano Robotics", "NT-704 Industrial Management & Entrepreneurship"],
        "8": ["NT-801 Recent Trends in Nanotechnology", "NT-802 Nanotechnology Applications", "NT-803(A) Advanced Functional Nanomaterials", "NT-803(B) Nano Energy Systems", "NT-803(C) Nano Product Design"]
    },
    "marine": {
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

const repeatYears = Array.from({ length: 9 }, (_, index) => String(2026 - index));
let repeatRecords = [];
let repeatQuestionRows = [];
let repeatManagedQuestionRows = [];
let repeatState = { step: "branches", branch: "", semester: "", subjectKey: "", search: "", sort: "name", unit: "all", questionSort: "frequency", questionId: "" };
const repeatBookmarkKey = "engilearn_repeated_question_bookmarks_v1";
const repeatCsvUrl = "../assets/data/repeated-questions.csv?v=8-pyq-year-branch-metadata";
const repeatCompactJsonUrl = "../assets/data/repeated-questions.compact.json?v=1-fast-cache";
const repeatPublicSummaryUrl = "../assets/data/repeated-questions.summary.json?v=1-public-counts";
const repeatSubjectOptionsUrl = "../assets/data/branch-subject-options.csv?v=8";
const repeatPerfStartedAt = window.performance?.now?.() || Date.now();
const repeatPerf = { dataMs: 0, csvMs: 0, renderMs: 0, totalMs: 0 };
let repeatCatalogCache = null;
const repeatQuestionLookup = new Map();
let repeatAccessSettings = { visible: true, accessMode: "paid", price: 100 };
let repeatSubjectOptionRecords = [];
let repeatVerifiedUser = null;
let repeatLatestSettings = { repeatedQuestions: { visible: true, accessMode: "paid", price: 100 } };
let repeatLatestContent = [];
let repeatQuestionRowsLoaded = false;
let repeatQuestionRowsLoading = null;
let repeatPublicSummary = { totals: { questions: 0, years: 0 }, branches: {} };

async function repeatFetchCachedStatic(url, type = "text") {
    const absoluteUrl = new URL(url, window.location.href).href;
    const readResponse = (response) => type === "json" ? response.json() : response.text();

    if ("caches" in window) {
        const cache = await caches.open("engilearn-repeated-static-v3");
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
        if (!response.ok) throw new Error(`Static repeated-question request failed (${response.status})`);
        cache.put(request, response.clone()).catch(() => {});
        return readResponse(response);
    }

    const response = await fetch(absoluteUrl, { cache: "force-cache" });
    if (!response.ok) throw new Error(`Static repeated-question request failed (${response.status})`);
    return readResponse(response);
}

async function repeatLoadPublicSummary() {
    try {
        const summary = await repeatFetchCachedStatic(repeatPublicSummaryUrl, "json");
        if (summary && typeof summary === "object") repeatPublicSummary = summary;
    } catch (error) {
        console.warn("Repeated-question public counts unavailable:", error.message);
    }
    return repeatPublicSummary;
}

function repeatCurrentUser() {
    return repeatVerifiedUser || {};
}

async function repeatSyncAuthenticatedUser() {
    repeatVerifiedUser = null;
    if (!window.EngiLearnAPI?.token) return null;
    try {
        const data = await EngiLearnAPI.verifyToken();
        repeatVerifiedUser = data?.user || null;
        if (repeatVerifiedUser) localStorage.setItem("mini_currentUser", JSON.stringify(repeatVerifiedUser));
        return repeatVerifiedUser;
    } catch (error) {
        EngiLearnAPI.token = "";
        localStorage.removeItem("mini_currentUser");
        return null;
    }
}

function repeatIsAdmin() {
    return String(repeatCurrentUser().role || "").toLowerCase() === "admin";
}

function repeatPremiumScopeKey(branch = repeatState.branch, semester = repeatState.semester) {
    const branchKey = String(branch || "all").toLowerCase().replace(/[^a-z0-9-]/g, "") || "all";
    const semesterKey = String(semester || "all").toLowerCase().replace(/[^a-z0-9-]/g, "") || "all";
    return `${branchKey}::sem-${semesterKey}`;
}

function repeatPremiumStorageKey(user = repeatCurrentUser()) {
    const userKey = String(user.id || user.email || user.mobile || "guest").toLowerCase().replace(/[^a-z0-9@._-]/g, "");
    return `engilearn_repeated_questions_semester_access_${userKey || "guest"}`;
}

function repeatStoredSemesterAccess(user = repeatCurrentUser()) {
    // Paid authorization comes from the signed-in account returned by the
    // backend. Browser storage is only a cache and must never grant access.
    return { ...(user.repeatedQuestionsSemesterAccess || {}) };
}

function repeatHasSemesterPremiumAccess(branch = repeatState.branch, semester = repeatState.semester) {
    if (!branch || String(branch).toLowerCase() === "all" || !/^[1-8]$/.test(String(semester || ""))) return false;
    const user = repeatCurrentUser();
    const access = repeatStoredSemesterAccess(user);
    const key = repeatPremiumScopeKey(branch, semester);
    return Boolean(access[key]);
}

function repeatHasGlobalPremiumAccess() {
    const user = repeatCurrentUser();
    const role = String(user.role || "").toLowerCase();
    if (role === "admin") return true;
    // "Free for students" still requires a verified student account. Guests
    // must never receive the question catalog merely because pricing is free.
    if (repeatAccessSettings.accessMode !== "paid") return role === "student" && Boolean(user.id);
    return false;
}

function repeatHasPremiumAccess() {
    return repeatHasGlobalPremiumAccess() || repeatHasSemesterPremiumAccess();
}

function repeatCanLoadQuestionCatalog() {
    if (repeatIsAdmin()) return true;
    const branch = String(repeatState.branch || "").toLowerCase();
    const semester = String(repeatState.semester || "");
    return Boolean(branch && branch !== "all" && /^[1-8]$/.test(semester) && repeatHasPremiumAccess());
}

function repeatEnsureQuestionCatalogLoaded() {
    if (repeatQuestionRowsLoaded || repeatQuestionRowsLoading || !repeatCanLoadQuestionCatalog()) return;
    repeatQuestionRowsLoading = repeatLoadQuestionRows()
        .then((rows) => {
            repeatQuestionRows = rows;
            repeatQuestionRowsLoaded = true;
            repeatApplyData(repeatLatestSettings, repeatLatestContent);
        })
        .catch((error) => console.warn("Protected repeated-question catalog unavailable:", error.message))
        .finally(() => {
            repeatQuestionRowsLoading = null;
        });
}

function repeatEnforceStudentPrerequisites() {
    if (repeatIsAdmin()) return;

    const branch = String(repeatState.branch || "").toLowerCase();
    const semester = String(repeatState.semester || "");
    const protectedSteps = ["subjects", "questions", "unitQuestions"];

    // A deep link must never skip the branch -> semester prerequisite chain.
    // In particular, subject=all previously opened every unit for anonymous users.
    if (!branch || branch === "all") {
        repeatState = {
            ...repeatState,
            step: "branches",
            branch: "",
            semester: "",
            subjectKey: "",
            unit: "all",
            questionId: ""
        };
        return;
    }

    if (!/^[1-8]$/.test(semester)) {
        repeatState = {
            ...repeatState,
            step: "semesters",
            semester: "",
            subjectKey: "",
            unit: "all",
            questionId: ""
        };
        return;
    }

    if (protectedSteps.includes(repeatState.step)
        && ["questions", "unitQuestions"].includes(repeatState.step)
        && !repeatState.subjectKey) {
        repeatState = { ...repeatState, step: "subjects", unit: "all", questionId: "" };
    }
}

function repeatPaymentUrl(next = {}) {
    const params = new URLSearchParams({
        branch: next.branch ?? repeatState.branch ?? "all",
        semester: next.semester ?? repeatState.semester ?? "all",
        subject: next.subject ?? "all"
    });
    const unit = next.unit ?? repeatState.unit;
    if (unit && unit !== "all") params.set("unit", unit);
    const returnUrl = encodeURIComponent(`pages/${location.pathname.split("/").pop()}?${params.toString()}`);
    return `../tools.html?premium=semester&return=${returnUrl}#toolhub`;
}

function repeatLoginUrlForPayment() {
    const returnTo = `${window.location.origin}${window.location.pathname}${window.location.search || ""}`;
    return `../login.html?returnTo=${encodeURIComponent(returnTo)}`;
}

function repeatEnsureRazorpayCheckout() {
    if (window.Razorpay) return Promise.resolve();
    return new Promise((resolve, reject) => {
        const existing = document.querySelector('script[src*="checkout.razorpay.com/v1/checkout.js"]');
        if (existing) {
            existing.addEventListener("load", () => resolve(), { once: true });
            existing.addEventListener("error", () => reject(new Error("Secure checkout could not load. Check internet connection.")), { once: true });
            window.setTimeout(() => window.Razorpay ? resolve() : reject(new Error("Secure checkout is still loading. Please click Pay again.")), 7000);
            return;
        }
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Secure checkout could not load. Check internet connection."));
        document.head.appendChild(script);
    });
}

function repeatSetPremiumStatus(message, success = false) {
    const status = document.getElementById("repeatPremiumStatus");
    if (!status) return;
    status.textContent = message;
    status.classList.toggle("success", success);
}

async function repeatStartPremiumPayment() {
    const user = repeatCurrentUser();
    if (!window.EngiLearnAPI?.token || !user.id) {
        sessionStorage.setItem("engilearn_resume_semester_premium", "true");
        sessionStorage.setItem("engilearn_resume_semester_premium_state", JSON.stringify({
            branch: repeatState.branch,
            semester: repeatState.semester,
            subject: repeatState.subjectKey,
            unit: repeatState.unit
        }));
        window.location.href = repeatLoginUrlForPayment();
        return;
    }
    if (!repeatState.branch || repeatState.branch === "all" || !/^[1-8]$/.test(String(repeatState.semester || ""))) {
        repeatSetPremiumStatus("Select one specific branch and one semester (1-8) before buying premium access.");
        return;
    }
    const button = document.querySelector("[data-repeat-premium-checkout]");
    if (button) button.disabled = true;
    repeatSetPremiumStatus("Creating secure payment order...");
    try {
        await repeatEnsureRazorpayCheckout();
        const scopeKey = repeatPremiumScopeKey();
        const order = await EngiLearnAPI.createToolHubOrder({
            product: "repeatedQuestions",
            branch: repeatState.branch,
            semester: repeatState.semester,
            accessKey: scopeKey,
            name: user.name || "",
            email: user.email || "",
            mobile: user.mobile || user.phone || ""
        });
        const checkout = new Razorpay({
            key: order.keyId,
            amount: order.amount,
            currency: order.currency,
            name: order.payeeName || "EngiLearn",
            description: order.description || "Semester Premium Access",
            order_id: order.orderId,
            prefill: { name: user.name || "", email: user.email || "", contact: user.mobile || user.phone || "" },
            theme: { color: "#111111" },
            handler: async (payment) => {
                repeatSetPremiumStatus("Verifying payment...");
                try {
                    const result = await EngiLearnAPI.verifyToolHubPayment({
                        ...payment,
                        product: "repeatedQuestions",
                        branch: repeatState.branch,
                        semester: repeatState.semester,
                        accessKey: scopeKey
                    });
                    if (!result.verified) throw new Error("Payment verification failed.");
                    try {
                        await EngiLearnAPI.downloadPaymentReceipt(result.receiptKey || result.paymentId);
                    } catch (receiptError) {
                        console.warn("PDF receipt download unavailable:", receiptError.message);
                    }
                    const savedUser = { ...user, ...(result.user || {}) };
                    if (!savedUser.repeatedQuestionsSemesterAccess?.[scopeKey]) {
                        throw new Error("Payment was verified, but this branch/semester entitlement was not returned. Please contact support with your receipt.");
                    }
                    localStorage.setItem(repeatPremiumStorageKey(savedUser), JSON.stringify(savedUser.repeatedQuestionsSemesterAccess));
                    localStorage.setItem("mini_currentUser", JSON.stringify(savedUser));
                    sessionStorage.setItem("engilearn_semester_premium_access_v1", scopeKey);
                    const semesterLabel = String(repeatState.semester).toLowerCase() === "all" ? "All Semesters" : `Semester ${repeatState.semester}`;
                    repeatSetPremiumStatus(`Payment verified. ${semesterLabel} repeated questions unlocked only for this selection. PDF receipt generated.`, true);
                    repeatState = { ...repeatState, step: "subjects" };
                    repeatRender();
                } catch (error) {
                    repeatSetPremiumStatus(error.message || "Payment verification failed.");
                }
            },
            modal: { ondismiss: () => repeatSetPremiumStatus("Payment was cancelled.") }
        });
        checkout.on("payment.failed", (response) => {
            repeatSetPremiumStatus(response.error?.description || "Payment failed. Please try again.");
        });
        checkout.open();
    } catch (error) {
        repeatSetPremiumStatus(error.message || "Secure payment is not configured yet.");
    } finally {
        if (button) button.disabled = false;
    }
}

function repeatResumePremiumPaymentIfNeeded() {
    if (sessionStorage.getItem("engilearn_resume_semester_premium") !== "true") return;
    sessionStorage.removeItem("engilearn_resume_semester_premium");
    try {
        const state = JSON.parse(sessionStorage.getItem("engilearn_resume_semester_premium_state") || "{}");
        repeatState = { ...repeatState, ...state, step: state.semester ? "subjects" : repeatState.step };
        repeatRender();
        if (!repeatHasPremiumAccess()) {
            repeatSetPremiumStatus("Login complete. Click Upgrade / Pay when you are ready to unlock premium questions.");
        }
    } catch (error) {
        // Keep current state when stored resume data is not valid.
    }
}

function repeatPremiumRequiredForStep() {
    return Boolean(repeatState.branch && repeatState.semester)
        && ["subjects", "questions", "unitQuestions"].includes(repeatState.step)
        && !repeatHasPremiumAccess();
}

function repeatRenderPremiumGate() {
    const semesterLabel = String(repeatState.semester).toLowerCase() === "all" ? "All Semesters" : `Semester ${repeatState.semester}`;
    return `<div class="repeat-crumbs"><span>${repeatEscape(repeatBranchName(repeatState.branch))}</span><span>${repeatEscape(semesterLabel)}</span></div>
    <div class="repeat-premium-gate">
        <span class="repeat-kicker"><i class="fas fa-crown"></i> Paid Access</span>
        <h2>Pay Rs. ${repeatEscape(repeatAccessSettings.price || 100)} to unlock ${repeatEscape(semesterLabel)}</h2>
        <p>Complete a secure payment to open repeated questions only for ${repeatEscape(repeatBranchName(repeatState.branch))}, ${repeatEscape(semesterLabel)}. Other semesters stay locked until paid separately.</p>
        <p class="repeat-premium-status" id="repeatPremiumStatus" aria-live="polite"></p>
        <div class="repeat-actions">
            <button class="repeat-btn" type="button" data-repeat-premium-checkout><i class="fas fa-lock-open"></i> Upgrade / Pay</button>
            <button class="repeat-btn secondary" type="button" data-repeat-step="semesters"><i class="fas fa-arrow-left"></i> Back to Semesters</button>
        </div>
    </div>`;
}

const repeatEscape = (value) => String(value ?? "").replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
const repeatSlug = (value) => String(value || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "item";

function repeatCleanText(value) {
    return String(value ?? "")
        .replace(/Ã¢â‚¬â„¢/g, "'")
        .replace(/Ã¢â‚¬Ëœ/g, "'")
        .replace(/Ã¢â‚¬Å“|Ã¢â‚¬Â/g, "\"")
        .replace(/Ã¢â‚¬â€œ|Ã¢â‚¬â€/g, "-")
        .replace(/Ã¢â‚¬Â¦/g, "...")
        .replace(/Ã¢â€°Â¥/g, ">=")
        .replace(/Ã¢â€°Â¤/g, "<=")
        .replace(/Ã¢â€ â€™/g, "->")
        .replace(/Ã¢Ë†Å¾/g, "infinity")
        .replace(/Ã‚Â²/g, "^2")
        .replace(/Ã‚Â°/g, " deg")
        .replace(/Ã‚/g, "")
        .replace(/\s+/g, " ")
        .trim();
}

function repeatParseCsv(text) {
    const rows = [];
    let row = [];
    let field = "";
    let quoted = false;
    for (let index = 0; index < text.length; index += 1) {
        const char = text[index];
        const next = text[index + 1];
        if (char === "\"") {
            if (quoted && next === "\"") {
                field += "\"";
                index += 1;
            } else {
                quoted = !quoted;
            }
        } else if (char === "," && !quoted) {
            row.push(field);
            field = "";
        } else if ((char === "\n" || char === "\r") && !quoted) {
            if (char === "\r" && next === "\n") index += 1;
            row.push(field);
            if (row.some((cell) => String(cell).trim())) rows.push(row);
            row = [];
            field = "";
        } else {
            field += char;
        }
    }
    row.push(field);
    if (row.some((cell) => String(cell).trim())) rows.push(row);
    const headers = (rows.shift() || []).map(repeatCleanText);
    return rows.map((cells) => Object.fromEntries(headers.map((header, index) => [header, cells[index] || ""])));
}

function repeatNormalizeBranchToken(value) {
    const token = repeatCleanText(value).toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    return repeatBranchAliases[token] || token || "others";
}

function repeatBranchIdsFromText(value) {
    const raw = repeatCleanText(value || "others");
    const ids = raw.split(/\s*[;,/]\s*/).map(repeatNormalizeBranchToken).filter(Boolean);
    const unique = [...new Set(ids.length ? ids : [repeatNormalizeBranchToken(raw)])];
    return unique.length ? unique : ["others"];
}

function repeatNormalizeSemester(value) {
    const match = repeatCleanText(value).match(/[1-8]/);
    return match ? match[0] : "All";
}

function repeatNormalizeSubjectCode(value) {
    return repeatCleanText(value).toUpperCase().replace(/\s*-\s*/g, "-").replace(/\s+/g, " ");
}

function repeatSubjectCodeNumber(value) {
    const match = repeatNormalizeSubjectCode(value).match(/\d{3,4}(?:-[A-Z])?$/);
    return match?.[0] || repeatNormalizeSubjectCode(value).replace(/[^A-Z0-9-]/g, "");
}

function repeatNormalizedSubjectName(value) {
    return repeatCleanText(value)
        .toLowerCase()
        .replace(/&/g, " and ")
        .replace(/[^a-z0-9\s]/g, " ")
        .replace(/\balgorithms\b/g, "algorithm")
        .replace(/\bstructures\b/g, "structure")
        .replace(/\bsystems\b/g, "system")
        .replace(/\biii\b/g, "3")
        .replace(/\bii\b/g, "2")
        .replace(/\bi\b/g, "1")
        .replace(/\s+/g, " ")
        .trim();
}

function repeatSubjectNamesMatch(left, right) {
    const smart = window.EngiLearnSubjectSimilarity;
    if (smart?.isSimilar?.(left, right)) return true;
    const a = repeatNormalizedSubjectName(left);
    const b = repeatNormalizedSubjectName(right);
    if (!a || !b) return false;
    if (a === b) return true;
    const shorter = a.length <= b.length ? a : b;
    const longer = a.length > b.length ? a : b;
    return shorter.length >= 12 && longer.includes(shorter);
}

function repeatParseYears(value, question = "") {
    const text = `${repeatCleanText(value)} ${repeatCleanText(question)}`;
    return [...new Set([...text.matchAll(/\b(19\d{2}|20\d{2})\b/g)].map((match) => Number(match[1])))]
        .filter(Number.isFinite)
        .sort((a, b) => b - a);
}

function repeatUnitKey(value) {
    const text = repeatCleanText(value || "Extra Questions");
    const numberMatch = text.match(/unit\s*[-:]?\s*(\d+)/i);
    if (numberMatch) return numberMatch[1];
    const romanMatch = text.match(/unit\s*[-:]?\s*(i{1,3}|iv|v)\b/i);
    if (romanMatch) {
        const romanUnits = { i: "1", ii: "2", iii: "3", iv: "4", v: "5" };
        return romanUnits[String(romanMatch[1]).toLowerCase()] || "extra";
    }
    if (/extra/i.test(text)) return "extra";
    return repeatSlug(text).slice(0, 28) || "extra";
}

function repeatUnitLabel(key, fallback = "") {
    if (/^\d+$/.test(String(key))) return `Unit ${key}`;
    return repeatCleanText(fallback) || String(key || "Extra").replace(/-/g, " ");
}

function repeatUnitSortValue(key) {
    if (/^\d+$/.test(String(key))) return Number(key);
    if (key === "extra") return 99;
    return 120;
}

function repeatBranchName(id) {
    if (String(id || "").toLowerCase() === "all") return "All Branches";
    if (!id) return "Branch";
    return repeatBranchLabels.get(id) || String(id || "Branch").toUpperCase();
}

function repeatBranchIds(record) {
    const raw = Array.isArray(record.branchIds) && record.branchIds.length ? record.branchIds : [record.branchId || "others"];
    return [...new Set(raw.map(repeatNormalizeBranchToken).filter(Boolean))];
}

function repeatRelatedBranchIds(branchId) {
    const selected = repeatNormalizeBranchToken(branchId);
    const related = new Set([selected]);
    if (["ai", "aiml"].includes(selected)) ["ai", "aiml"].forEach((id) => related.add(id));
    return related;
}

function repeatMatchesBranch(branchId, record) {
    if (!branchId || String(branchId).toLowerCase() === "all") return true;
    const selectedBranchIds = repeatRelatedBranchIds(branchId);
    const branchIds = repeatBranchIds(record);
    return branchIds.includes("all") || branchIds.some((id) => selectedBranchIds.has(id));
}

function repeatSubjectKey(record) {
    return `${String(record.subjectCode || "").trim()}::${String(record.subject || "").trim()}`;
}

function repeatSubjectCodeKey(value) {
    return repeatNormalizeSubjectCode(value).toLowerCase().replace(/[^a-z0-9]/g, "");
}

function repeatSubjectCodePrefix(value) {
    const normalized = repeatNormalizeSubjectCode(value).replace(/[^A-Z0-9-]/g, "");
    const match = normalized.match(/^([A-Z]+)(?=[-]?\d)/);
    return match?.[1] || normalized.replace(/[^A-Z]/g, "");
}

function repeatIsCommonSubjectCode(value) {
    const prefix = repeatSubjectCodePrefix(value);
    return !prefix || ["BT", "ES", "VERIFY", "VERIFYFROMRGPV"].includes(prefix);
}

function repeatSubjectCodesMatch(left, right) {
    const leftKey = repeatSubjectCodeKey(left);
    const rightKey = repeatSubjectCodeKey(right);
    if (leftKey && rightKey && leftKey === rightKey) return true;
    const leftNumber = repeatSubjectCodeNumber(left).toLowerCase().replace(/[^a-z0-9]/g, "");
    const rightNumber = repeatSubjectCodeNumber(right).toLowerCase().replace(/[^a-z0-9]/g, "");
    return Boolean(leftNumber && rightNumber && leftNumber === rightNumber);
}

function repeatSubjectMatches(subjectKey, record) {
    if (!subjectKey || String(subjectKey).toLowerCase() === "all") return true;
    if (String(subjectKey || "").startsWith("code:")) {
        const payload = String(subjectKey).slice(5);
        const [codePart, subjectPart = ""] = payload.split("::subject:");
        const codeMatches = repeatSubjectCodesMatch(codePart, record.subjectCode);
        if (!codeMatches) return false;
        if (!subjectPart || repeatSubjectNamesMatch(subjectPart, record.subject)) return true;
        return Boolean(repeatState.branch && repeatState.semester && String(repeatState.semester).toLowerCase() !== "all");
    }
    if (repeatSubjectKey(record) === subjectKey) return true;
    const [codePart, ...subjectParts] = String(subjectKey || "").split("::");
    const subjectPart = subjectParts.join("::");
    const codeMatches = repeatSubjectCodesMatch(codePart, record.subjectCode);
    if (!codeMatches) return false;
    if (!subjectPart || repeatSubjectNamesMatch(subjectPart, record.subject)) return true;
    return Boolean(repeatState.branch && repeatState.semester && String(repeatState.semester).toLowerCase() !== "all");
}

function repeatPrettyCode(record, branchId) {
    const raw = String(record.subjectCode || "").trim();
    if (!raw) return repeatCodePrefixes[branchId] || String(branchId || "").toUpperCase();
    if (/^[a-z]+\s*-?\s*\d+/i.test(raw)) return raw.toUpperCase().replace(/\s+/g, " ");
    const prefix = repeatCodePrefixes[branchId] || repeatCodePrefixes[record.branchId] || String(branchId || record.branchId || "").toUpperCase();
    return prefix ? `${prefix} ${raw}` : raw;
}

function repeatMakeCode(branchId, semester, index = 0) {
    const prefix = repeatCodePrefixes[branchId] || String(branchId || "BT").toUpperCase();
    const sem = Number(semester) || 1;
    return `${prefix}-${sem * 100 + index + 1}`;
}

function repeatSubjectsForBranch(branchId) {
    const catalog = repeatSubjectCatalog[branchId] || {};
    return { ...repeatCommonSubjects, ...catalog };
}

function repeatParseCatalogSubjectLine(value) {
    const raw = String(value || "").trim().replace(/\s+/g, " ");
    const match = raw.match(/^([A-Z]{1,6}[\s-]?\d{3,4}(?:\s*-?\s*\([A-Z](?:\/[A-Z])*\))?)\s*(?:[-â€“â€”]\s*)?(.+)$/i);
    if (!match) return { subjectCode: "", subject: raw };
    const subjectCode = repeatNormalizeSubjectCode(match[1]).replace(/\s+(?=\()/g, "-");
    const subject = String(match[2] || raw).trim();
    return { subjectCode, subject };
}

function repeatBuildCatalog() {
    if (repeatCatalogCache) return repeatCatalogCache;
    repeatCatalogCache = repeatBranches.flatMap(([branchId, branch]) => Object.entries(repeatSubjectsForBranch(branchId)).flatMap(([semester, subjects]) => (
        subjects.flatMap((subjectLine, subjectIndex) => {
            const parsed = repeatParseCatalogSubjectLine(subjectLine);
            if (!parsed.subjectCode) return [];
            const subjectCode = parsed.subjectCode;
            const subject = parsed.subject || String(subjectLine || "Subject").trim();
            return repeatYears.map((year) => ({
                id: `catalog-${branchId}-${semester}-${repeatSlug(subjectCode)}-${subjectIndex}-${year}`,
                branchId,
                branchIds: [branchId],
                branch,
                semester: String(semester),
                subject,
                subjectCode,
                year,
                title: `${subjectCode} ${subject} ${year} Question Paper`,
                source: "RGPV catalog",
                uploaded: false,
                url: ""
            }));
        })
    )));
    return repeatCatalogCache;
}

function repeatNormalizeUpload(item, index) {
    const branchIds = [...new Set((Array.isArray(item.branchIds) && item.branchIds.length ? item.branchIds : [item.branchId || "others"])
        .map(repeatNormalizeBranchToken).filter(Boolean))];
    const branchText = String(item.branch || "");
    const branchParts = branchText.split(/\s*,\s*/).filter(Boolean);
    branchIds.forEach((id, branchIndex) => {
        if (!repeatBranchLabels.has(id)) repeatBranchLabels.set(id, branchParts[branchIndex] || id.toUpperCase());
    });
    const branchId = branchIds[0] || "others";
    const subject = String(item.subject || item.title || "General");
    const semester = String(item.semester || "All");
    const subjectCode = repeatNormalizeSubjectCode(item.subjectCode || item.code);
    if (!subjectCode) return null;
    return {
        id: `upload-${item.id || item._id || index}`,
        rawId: String(item.id || item._id || index),
        branchId,
        branchIds,
        branch: branchIds.map(repeatBranchName).join(", "),
        semester,
        subject,
        subjectCode,
        year: String(item.year || item.examYear || "All"),
        session: String(item.session || item.examSession || ""),
        fileName: String(item.fileName || item.filename || ""),
        title: String(item.title || `${subject} Question Paper`),
        source: String(item.source || "Admin upload"),
        uploaded: true,
        url: String(item.fileUrl || item.filePath || item.url || ""),
        topic: String(item.topic || "")
    };
}

function repeatNormalizeQuestionRow(item, index) {
    const branchIds = repeatBranchIdsFromText(item.Branch || item.branch);
    const semester = repeatNormalizeSemester(item.Semester || item.semester);
    const subjectCode = repeatNormalizeSubjectCode(item["Subject Code"] || item.subjectCode || item.code);
    const subject = repeatCleanText(item.Subject || item.subject || "General");
    const unitRaw = repeatCleanText(item.Unit || item.unit || "Extra Questions");
    const unit = repeatUnitKey(unitRaw);
    const question = repeatCleanText(item.Question || item.question);
    if (!question || !subjectCode || !subject) return null;
    const years = repeatParseYears(item.Years || item.years, question);
    const repeatCount = Math.max(Number(String(item["Repeat Count"] || item.repeatCount || "").replace(/[^\d]/g, "")) || 0, years.length, 1);
    const source = repeatCleanText(item.Source || item.source || "");
    return {
        id: `rq-${index}-${repeatSlug(branchIds.join("-"))}-${semester}-${repeatSlug(subjectCode)}-${repeatSlug(question).slice(0, 54)}`,
        branchId: branchIds[0] || "others",
        branchIds,
        branch: branchIds.map(repeatBranchName).join(", "),
        semester,
        subject,
        subjectCode,
        year: years[0] ? String(years[0]) : "All",
        years,
        repeatCount,
        title: `${subject} repeated question`,
        source: source || "Repeated-question CSV",
        uploaded: Boolean(source),
        url: source,
        unit,
        unitLabel: repeatUnitLabel(unit, unitRaw),
        question,
        topic: question
    };
}

function repeatNormalizeManagedQuestion(item, index) {
    const branchIds = repeatBranchIds(item);
    const semester = repeatNormalizeSemester(item.semester);
    const subjectCode = repeatNormalizeSubjectCode(item.subjectCode || item.code);
    const subject = repeatCleanText(item.subject || item.title || "General");
    const question = repeatCleanText(item.question || item.topic);
    if (!branchIds.length || !semester || !subjectCode || !subject || !question) return null;
    const unitRaw = repeatCleanText(item.unitLabel || item.unit || "Extra Questions");
    const unit = repeatUnitKey(item.unit || unitRaw);
    const years = repeatParseYears(item.years || item.year, question);
    return {
        id: `admin-rq-${item.id || item._id || index}`,
        rawId: String(item.id || item._id || index),
        branchId: branchIds[0],
        branchIds,
        branch: branchIds.map(repeatBranchName).join(", "),
        semester,
        subject,
        subjectCode,
        year: years[0] ? String(years[0]) : String(item.year || "All"),
        years,
        repeatCount: Math.max(1, Number(item.repeatCount || years.length || 1)),
        title: String(item.title || `${subject} repeated question`),
        source: String(item.source || "Admin managed"),
        uploaded: true,
        url: String(item.url || item.fileUrl || item.filePath || ""),
        unit,
        unitLabel: repeatUnitLabel(unit, unitRaw),
        question,
        topic: question,
        adminManaged: true
    };
}

function repeatNormalizeSubjectOptionRow(item, index) {
    const branchIds = repeatBranchIdsFromText(item.Branch || item.branch);
    const semester = repeatNormalizeSemester(item.Semester || item.semester);
    const subjectCode = repeatNormalizeSubjectCode(item["Subject Code"] || item.subjectCode || item.code);
    const subject = repeatCleanText(item.Subject || item.subject);
    if (!branchIds.length || !subjectCode || !subject) return null;
    const paperCount = Math.max(0, Number(String(item["Paper Count"] || item.paperCount || "").replace(/[^\d]/g, "")) || 0);
    return {
        id: `subject-option-${index}-${repeatSlug(branchIds.join("-"))}-${semester}-${repeatSlug(subjectCode)}-${repeatSlug(subject)}`,
        branchId: branchIds[0] || "others",
        branchIds,
        branch: branchIds.map(repeatBranchName).join(", "),
        semester,
        subject,
        subjectCode,
        year: "All",
        title: `${subject} subject option`,
        source: "Branch subject options",
        uploaded: false,
        url: "",
        topic: "",
        paperCount,
        subjectOptionOnly: true
    };
}

function repeatDedupeQuestionRows(rows) {
    const map = new Map();
    rows.filter(Boolean).forEach((row) => {
        repeatBranchIds(row).forEach((branchId) => {
            const key = [
                branchId,
                row.semester,
                String(row.subjectCode).toLowerCase(),
                String(row.subject).toLowerCase(),
                row.unit,
                repeatSlug(row.question)
            ].join("|");
            const next = { ...row, branchId, branchIds: [branchId], branch: repeatBranchName(branchId), id: `${row.id}-${branchId}` };
            const previous = map.get(key);
            if (!previous || next.repeatCount > previous.repeatCount) {
                map.set(key, previous ? {
                    ...next,
                    years: [...new Set([...(previous.years || []), ...(next.years || [])])].sort((a, b) => b - a),
                    repeatCount: Math.max(previous.repeatCount || 1, next.repeatCount || 1)
                } : next);
            }
        });
    });
    return [...map.values()];
}

function repeatDedupeSubjectOptionRows(rows) {
    const map = new Map();
    rows.filter(Boolean).forEach((row) => {
        repeatBranchIds(row).forEach((branchId) => {
            const key = [
                branchId,
                row.semester,
                repeatSubjectCodeKey(row.subjectCode),
                repeatNormalizedSubjectName(row.subject)
            ].join("|");
            const next = { ...row, branchId, branchIds: [branchId], branch: repeatBranchName(branchId), id: `${row.id}-${branchId}` };
            const previous = map.get(key);
            if (!previous || (next.paperCount || 0) > (previous.paperCount || 0)) map.set(key, next);
        });
    });
    return [...map.values()];
}

function repeatNormalizeCompactQuestionRow(item, index) {
    if (!Array.isArray(item)) return null;
    const [branch, semesterRaw, subjectCodeRaw, subjectRaw, unitRaw, questionRaw, yearsRaw, repeatCountRaw, sourceRaw] = item;
    const branchIds = repeatBranchIdsFromText(branch);
    const semester = repeatNormalizeSemester(semesterRaw);
    const subjectCode = repeatNormalizeSubjectCode(subjectCodeRaw);
    const subject = repeatCleanText(subjectRaw);
    const question = repeatCleanText(questionRaw);
    if (!branchIds.length || !semester || !subjectCode || !subject || !question) return null;
    const years = Array.isArray(yearsRaw) ? yearsRaw.map(Number).filter(Number.isFinite).sort((a, b) => b - a) : repeatParseYears(yearsRaw, question);
    const repeatCount = Math.max(Number(repeatCountRaw) || 0, years.length, 1);
    const source = repeatCleanText(sourceRaw);
    const unit = repeatUnitKey(unitRaw);
    return {
        id: `csv-rq-compact-${index}`,
        rawId: String(index),
        branchId: branchIds[0],
        branchIds,
        branch: branchIds.map(repeatBranchName).join(", "),
        semester,
        subject,
        subjectCode,
        year: years[0] ? String(years[0]) : "All",
        years,
        repeatCount,
        title: `${subject} repeated question`,
        source: source || "Repeated-question cache",
        uploaded: Boolean(source),
        url: source,
        unit,
        unitLabel: repeatUnitLabel(unit, unitRaw),
        question,
        topic: question
    };
}

async function repeatLoadQuestionRows() {
    const startedAt = window.performance?.now?.() || Date.now();
    try {
        const compactRows = await repeatFetchCachedStatic(repeatCompactJsonUrl, "json");
        const rows = repeatDedupeQuestionRows(compactRows.map(repeatNormalizeCompactQuestionRow));
        repeatPerf.csvMs = Math.max(1, Math.round((window.performance?.now?.() || Date.now()) - startedAt));
        repeatUpdateSpeedBadge();
        return rows;
    } catch (compactError) {
        try {
            const text = await repeatFetchCachedStatic(repeatCsvUrl, "text");
            const rows = repeatDedupeQuestionRows(repeatParseCsv(text).map(repeatNormalizeQuestionRow));
            repeatPerf.csvMs = Math.max(1, Math.round((window.performance?.now?.() || Date.now()) - startedAt));
            repeatUpdateSpeedBadge();
            return rows;
        } catch (error) {
            console.warn("Repeated-question data unavailable:", error.message || compactError.message);
            repeatPerf.csvMs = Math.max(1, Math.round((window.performance?.now?.() || Date.now()) - startedAt));
            repeatUpdateSpeedBadge();
            return [];
        }
    }
}

async function repeatLoadSubjectOptionRows() {
    try {
        const text = await repeatFetchCachedStatic(repeatSubjectOptionsUrl, "text");
        return repeatDedupeSubjectOptionRows(repeatParseCsv(text).map(repeatNormalizeSubjectOptionRow));
    } catch (error) {
        console.warn("Branch subject options unavailable:", error.message);
        return [];
    }
}

function repeatDedupe(records) {
    const map = new Map();
    records.forEach((record) => {
        repeatBranchIds(record).forEach((branchId) => {
            const questionKey = repeatSlug(record.question || record.topic || record.title || "");
            const key = `${branchId}|${record.semester}|${String(record.subjectCode).toLowerCase()}|${String(record.subject).toLowerCase()}|${record.year}|${questionKey}`;
            const next = { ...record, branchId, branchIds: [branchId], branch: repeatBranchName(branchId), id: `${record.id}-${branchId}` };
            const previous = map.get(key);
            if (!previous || next.uploaded) map.set(key, next);
        });
    });
    return [...map.values()];
}


function repeatCatalogSubjectOptionRecords() {
    const rows = [];
    repeatOfficialBranches.forEach(([branchId]) => {
        const subjectsBySemester = repeatSubjectsForBranch(branchId);
        Object.entries(subjectsBySemester).forEach(([semester, subjects]) => {
            subjects.forEach((subjectLine, subjectIndex) => {
                const parsed = repeatParseCatalogSubjectLine(subjectLine);
                if (!parsed.subjectCode) return;
                const subjectCode = parsed.subjectCode;
                const subject = parsed.subject || String(subjectLine || "Subject").trim();
                rows.push({
                    id: `catalog-subject-option-${branchId}-${semester}-${repeatSlug(subjectCode)}-${repeatSlug(subject)}`,
                    branchId,
                    branchIds: [branchId],
                    branch: repeatBranchName(branchId),
                    semester: String(semester),
                    subject,
                    subjectCode,
                    year: "All",
                    title: `${subject} subject option`,
                    source: "Book1.xlsx subject catalog",
                    uploaded: false,
                    url: "",
                    topic: "",
                    paperCount: 0,
                    subjectOptionOnly: true
                });
            });
        });
    });
    return repeatDedupeSubjectOptionRows(rows);
}

function repeatAllSubjectOptions() {
    return repeatDedupeSubjectOptionRows(repeatCatalogSubjectOptionRecords().concat(repeatSubjectOptionRecords));
}

function repeatCatalogSubjects(branchId, semester = "all") {
    const selectedSemester = String(semester || "all").toLowerCase();
    return repeatUniqueSubjects(repeatAllSubjectOptions().filter((record) => repeatMatchesBranch(branchId, record)
        && (selectedSemester === "all" || String(record.semester) === String(semester))));
}

function repeatQuestionRowsForSemester(branchId, semester = "all") {
    const selectedSemester = String(semester || "all").toLowerCase();
    return repeatQuestionRows.concat(repeatManagedQuestionRows).filter((row) => repeatMatchesBranch(branchId, row)
        && (selectedSemester === "all" || String(row.semester) === String(semester)));
}

function repeatPublicQuestionCount(branchId = "all", semester = "all") {
    if (repeatQuestionRowsLoaded) return repeatQuestionRowsForSemester(branchId, semester).length;
    const selectedSemester = String(semester || "all").toLowerCase();
    const rawBranchId = String(branchId || "all").toLowerCase();
    const normalizedBranchId = repeatNormalizeBranchToken(rawBranchId);
    const summary = repeatPublicSummary.branches?.[rawBranchId]
        || repeatPublicSummary.branches?.[normalizedBranchId];
    let baseCount = 0;
    if (rawBranchId === "all") baseCount = Number(repeatPublicSummary.totals?.questions || 0);
    else if (selectedSemester === "all") baseCount = Number(summary?.questions || 0);
    else baseCount = Number(summary?.semesters?.[selectedSemester] || 0);
    const managedCount = repeatManagedQuestionRows.filter((row) => repeatMatchesBranch(branchId, row)
        && (selectedSemester === "all" || String(row.semester) === String(semester))).length;
    return baseCount + managedCount;
}

function repeatQuestionSubjects(branchId, semester = "all") {
    return repeatUniqueSubjects(repeatQuestionRowsForSemester(branchId, semester));
}

function repeatSelectedSubjectOption(subjectKey = repeatState.subjectKey) {
    const selectedKey = String(subjectKey || "");
    if (!selectedKey || selectedKey.toLowerCase() === "all") return null;
    const fromCatalog = repeatCatalogSubjects(repeatState.branch, repeatState.semester)
        .find((item) => String(item.key) === selectedKey || item.records.some((record) => repeatSubjectMatches(selectedKey, record)));
    if (fromCatalog) return fromCatalog;
    return repeatQuestionSubjects(repeatState.branch, repeatState.semester)
        .find((item) => String(item.key) === selectedKey || item.records.some((record) => repeatSubjectMatches(selectedKey, record))) || null;
}

function repeatMissingSubjectOptions(questionRecords) {
    const exactKeys = new Set();
    const codeKeys = new Set();
    const allowedPrefixesByBase = new Map();
    questionRecords.forEach((record) => {
        repeatBranchIds(record).forEach((branchId) => {
            const base = `${branchId}|${record.semester}`;
            const codeKey = repeatSubjectCodeKey(record.subjectCode);
            const subjectKey = repeatNormalizedSubjectName(record.subject);
            const prefix = repeatSubjectCodePrefix(record.subjectCode);
            if (prefix && !repeatIsCommonSubjectCode(record.subjectCode)) {
                if (!allowedPrefixesByBase.has(base)) allowedPrefixesByBase.set(base, new Set());
                allowedPrefixesByBase.get(base).add(prefix);
            }
            if (codeKey) codeKeys.add(`${base}|${codeKey}`);
            exactKeys.add(`${base}|${codeKey}|${subjectKey}`);
        });
    });
    return repeatSubjectOptionRecords.filter((record) => {
        const codeKey = repeatSubjectCodeKey(record.subjectCode);
        const subjectKey = repeatNormalizedSubjectName(record.subject);
        const prefix = repeatSubjectCodePrefix(record.subjectCode);
        if (repeatIsCommonSubjectCode(record.subjectCode)) return false;
        return repeatBranchIds(record).some((branchId) => {
            const base = `${branchId}|${record.semester}`;
            const allowedPrefixes = allowedPrefixesByBase.get(base);
            if (!allowedPrefixes || !allowedPrefixes.has(prefix)) return false;
            if (codeKey && codeKeys.has(`${base}|${codeKey}`)) return false;
            return !exactKeys.has(`${base}|${codeKey}|${subjectKey}`);
        });
    });
}

function repeatQuestionBank(subject) {
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
        [["software engineering"], [
            "Explain software-process models and compare their applications.",
            "Prepare requirements and a suitable system model for a given problem.",
            "Explain software design principles, architecture, and testing strategies.",
            "Discuss project estimation, risk management, and quality assurance.",
            "Explain maintenance, configuration management, and modern development practices."
        ]],
        [["machine learning", "artificial intelligence", "deep learning"], [
            "Explain intelligent agents, problem formulation, and search strategies.",
            "Compare supervised, unsupervised, and reinforcement learning.",
            "Explain model training, evaluation metrics, overfitting, and regularization.",
            "Describe neural-network architecture and the backpropagation algorithm.",
            "Discuss practical AI applications, limitations, and ethical concerns."
        ]],
        [["mathematics", "calculus", "algebra"], [
            "Solve a representative problem using the fundamental method from this unit.",
            "Derive the principal theorem or formula and state its conditions.",
            "Apply the unit method to an engineering numerical problem.",
            "Compare alternative solution methods with a worked example.",
            "Solve a previous-year style long-answer numerical problem."
        ]],
        [["electronic", "circuit", "electrical", "power"], [
            "Explain the fundamental circuit or device characteristics with diagrams.",
            "Analyze the principal network or system using standard methods.",
            "Derive the important operating relation and solve a numerical problem.",
            "Compare major devices, configurations, or control techniques.",
            "Explain practical applications, protection, and performance considerations."
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

function repeatRecordsForBranch(branchId) {
    return repeatRecords.filter((record) => repeatMatchesBranch(branchId, record));
}

function repeatRecordsForSemester(branchId, semester) {
    if (!semester || String(semester).toLowerCase() === "all") return repeatRecordsForBranch(branchId);
    return repeatRecordsForBranch(branchId).filter((record) => String(record.semester) === String(semester));
}

function repeatRecordsForSubject() {
    return repeatRecordsForSemester(repeatState.branch, repeatState.semester).filter((record) => repeatSubjectMatches(repeatState.subjectKey, record));
}

function repeatQuestionRowsForSelection(subjectKey = repeatState.subjectKey) {
    const selectedSemester = repeatNormalizeSemester(repeatState.semester || "all");
    const isAllSubjects = !subjectKey || String(subjectKey).toLowerCase() === "all";
    return repeatQuestionRows.concat(repeatManagedQuestionRows).filter((row) => repeatMatchesBranch(repeatState.branch, row)
        && (!repeatState.semester || String(repeatState.semester).toLowerCase() === "all" || repeatNormalizeSemester(row.semester) === selectedSemester)
        && (isAllSubjects || repeatSubjectMatches(subjectKey, row)));
}

function repeatQuestionRowsForSubject(subjectKey = repeatState.subjectKey) {
    return repeatQuestionRowsForSelection(subjectKey);
}

function repeatFallbackQuestionRowsForSubject(selectedSubject = null, sample = {}, existingRows = []) {
    const existingUnits = new Set((existingRows || []).map((row) => String(row.unit || "extra")));
    const subject = repeatCleanText(selectedSubject?.subject || sample.subject || "Selected Subject") || "Selected Subject";
    const code = repeatCleanText(selectedSubject?.code || sample.subjectCode || sample.code || "") || "SUB";
    const branchId = repeatState.branch || sample.branchId || sample.branch || "all";
    const semester = repeatState.semester || sample.semester || "all";
    const bank = repeatQuestionBank(subject);
    return ["1", "2", "3", "4", "5"].flatMap((unitKey) => {
        if (existingUnits.has(unitKey)) return [];
        return bank.map((question, questionIndex) => ({
            id: `fallback-${branchId}-${semester}-${repeatSubjectCodeKey(code) || "subject"}-unit-${unitKey}-${questionIndex + 1}`,
            question,
            branch: repeatBranchName(branchId),
            branchId,
            semester,
            unit: unitKey,
            unitLabel: repeatUnitLabel(unitKey),
            repeatCount: 1,
            years: [],
            subject,
            subjectCode: code,
            url: ""
        }));
    });
}

function repeatEnsureCoreUnits(units) {
    ["1", "2", "3", "4", "5"].forEach((key) => {
        if (!units.has(key)) units.set(key, repeatUnitLabel(key));
    });
    return units;
}

function repeatUnitOptionsForRows(rows) {
    const units = repeatEnsureCoreUnits(new Map());
    rows.forEach((row) => {
        const key = row.unit || "extra";
        if (!units.has(key)) units.set(key, row.unitLabel || repeatUnitLabel(key));
    });
    return [...units.entries()].sort((a, b) => repeatUnitSortValue(a[0]) - repeatUnitSortValue(b[0]) || a[1].localeCompare(b[1]));
}

function repeatUnitOptionsHtml(rows, selected = repeatState.unit) {
    return `<option value="all" ${selected === "all" ? "selected" : ""}>All Units</option>`
        + repeatUnitOptionsForRows(rows).map(([value, label]) => `<option value="${repeatEscape(value)}" ${selected === String(value) ? "selected" : ""}>${repeatEscape(label)}</option>`).join("");
}

function repeatOption(value, label, selectedValue) {
    const selected = String(value) === String(selectedValue) ? "selected" : "";
    return `<option value="${repeatEscape(value)}" ${selected}>${repeatEscape(label)}</option>`;
}

function repeatBranchIdsForUi() {
    return repeatOfficialBranches.map(([id]) => id);
}

function repeatProgressBranchOptions() {
    return repeatOption("", "Select Branch", repeatState.branch)
        + (repeatIsAdmin() ? repeatOption("all", "All Branches", repeatState.branch) : "")
        + repeatBranchIdsForUi().map((branchId, index) => repeatOption(branchId, `#${index + 1} ${repeatBranchName(branchId)}`, repeatState.branch)).join("");
}

function repeatProgressSemesterOptions() {
    if (!repeatState.branch) return repeatOption("", "Select Branch First", "");
    return repeatOption("", "Select Semester", repeatState.semester)
        + (repeatIsAdmin() ? repeatOption("all", "All Semesters", repeatState.semester) : "")
        + ["1", "2", "3", "4", "5", "6", "7", "8"].map((semester) => {
            const count = repeatCatalogSubjects(repeatState.branch, semester).length;
            const suffix = count ? ` (${count} subjects)` : "";
            return repeatOption(semester, `Semester ${semester}${suffix}`, repeatState.semester);
        }).join("");
}

function repeatProgressSubjectOptions() {
    if (!repeatState.branch || !repeatState.semester) return repeatOption("", "Select Semester First", "");
    const subjects = repeatCatalogSubjects(repeatState.branch, repeatState.semester)
        .sort((a, b) => String(a.code).localeCompare(String(b.code), undefined, { numeric: true }) || String(a.subject).localeCompare(String(b.subject)));
    return repeatOption("", "Select Subject", repeatState.subjectKey)
        + repeatOption("all", `All Subjects (${subjects.length})`, repeatState.subjectKey)
        + subjects.map((item) => {
            const sample = item.records[0] || item;
            const code = repeatPrettyCode(sample, repeatState.branch);
            const extra = item.subjectCount > 1 ? ` (+${item.subjectCount - 1} more)` : "";
            return repeatOption(item.key, `${code} - ${item.subject}${extra}`, repeatState.subjectKey);
        }).join("");
}

function repeatProgressUnitOptions() {
    if (!repeatState.branch || !repeatState.semester || !repeatState.subjectKey) return repeatOption("all", "Select Subject First", "all");
    const rows = repeatQuestionRowsForSubject();
    const questions = repeatBuildQuestionsForUnit("all");
    return repeatUnitOptionsHtml(rows.length ? rows : questions, repeatState.unit || "all");
}

function repeatUniqueSubjects(records) {
    const subjects = new Map();
    records.forEach((record) => {
        const codeKey = repeatSubjectCodeKey(record.subjectCode);
        if (!codeKey) return;
        const subjectNameKey = repeatNormalizedSubjectName(record.subject);
        const key = `${codeKey}::${subjectNameKey}`;
        if (!subjects.has(key)) {
            subjects.set(key, {
                key,
                subject: record.subject,
                code: record.subjectCode,
                records: [],
                subjectCounts: new Map()
            });
        }
        const group = subjects.get(key);
        group.records.push(record);
        group.subjectCounts.set(record.subject, (group.subjectCounts.get(record.subject) || 0) + 1);
    });
    return [...subjects.values()].map((group) => {
        const names = [...group.subjectCounts.entries()]
            .sort((a, b) => b[1] - a[1] || b[0].length - a[0].length || a[0].localeCompare(b[0]));
        const primary = names[0]?.[0] || group.subject || "Subject";
        return {
            ...group,
            subject: primary,
            subjectCount: names.length,
            subjectPreview: names.slice(0, 4).map(([name]) => name)
        };
    });
}

function repeatBuildQuestions() {
    const subjectRecords = repeatRecordsForSubject();
    const selectedSubject = repeatSelectedSubjectOption();
    const sample = subjectRecords[0] || selectedSubject?.records?.[0] || {};
    const isAllSubjects = !repeatState.subjectKey || String(repeatState.subjectKey).toLowerCase() === "all";
    const csvRows = repeatQuestionRowsForSelection(isAllSubjects ? "all" : repeatState.subjectKey);
    const fallbackRows = isAllSubjects ? [] : repeatFallbackQuestionRowsForSubject(selectedSubject, sample, csvRows);
    const rowsForQuestions = csvRows.concat(fallbackRows);
    // If a subject exists in the catalog but no repeated-question CSV rows are available yet,
    // use the unit-wise fallback bank so users do not see five empty unit cards.
    if (rowsForQuestions.length) {
        return rowsForQuestions
            .filter((row) => repeatState.unit === "all" || repeatUnitKey(row.unit) === repeatUnitKey(repeatState.unit))
            .map((row) => {
                const years = [...new Set(row.years || [])].sort((a, b) => b - a);
                return {
                    id: row.id,
                    question: row.question,
                    branch: row.branch,
                    branchId: row.branchId,
                    semester: row.semester,
                    unit: row.unit,
                    unitLabel: row.unitLabel || repeatUnitLabel(row.unit),
                    frequency: Math.max(row.repeatCount || 1, years.length || 1),
                    years,
                    newestYear: years[0] || "",
                    oldestYear: years[years.length - 1] || "",
                    subject: row.subject,
                    code: repeatPrettyCode(row, repeatState.branch),
                    papers: years.length || Math.max(row.repeatCount || 1, 1),
                    url: row.url || ""
                };
            })
            .sort((a, b) => {
                if (repeatState.questionSort === "latest") return Number(b.newestYear || 0) - Number(a.newestYear || 0);
                if (repeatState.questionSort === "oldest") return Number(a.oldestYear || 9999) - Number(b.oldestYear || 9999);
                if (repeatState.questionSort === "unit") return repeatUnitSortValue(a.unit) - repeatUnitSortValue(b.unit);
                return b.frequency - a.frequency;
            });
    }

    return [];

}

function repeatBookmarks() {
    try {
        return JSON.parse(localStorage.getItem(repeatBookmarkKey) || "[]");
    } catch (error) {
        return [];
    }
}

function repeatSaveBookmarks(ids) {
    localStorage.setItem(repeatBookmarkKey, JSON.stringify([...new Set(ids)]));
}

function repeatQuestionPageUrl(item = {}) {
    const params = new URLSearchParams({
        branch: repeatState.branch || "all",
        semester: repeatState.semester || "all",
        subject: repeatState.subjectKey || "all",
        unit: String(item.unit || repeatState.unit || "all"),
        mode: "unit-questions"
    });
    const questionId = item.id || repeatState.questionId;
    if (questionId) params.set("question", questionId);
    return `repeated-questions.html?${params.toString()}`;
}

function repeatBuildQuestionsForUnit(unit = "all") {
    const previousUnit = repeatState.unit;
    repeatState.unit = unit || "all";
    try {
        return repeatBuildQuestions();
    } finally {
        repeatState.unit = previousUnit;
    }
}

function repeatQuestionDialog() {
    let dialog = document.getElementById("repeatQuestionDialog");
    if (dialog) return dialog;
    dialog = document.createElement("dialog");
    dialog.id = "repeatQuestionDialog";
    dialog.className = "repeat-question-dialog";
    document.body.appendChild(dialog);
    return dialog;
}

function repeatShowQuestion(id) {
    const item = repeatQuestionLookup.get(id);
    if (!item) return;
    const yearsText = item.years?.length ? item.years.slice(0, 12).join(", ") : "Not listed";
    const unitLabel = item.unitLabel || repeatUnitLabel(item.unit);
    const dialog = repeatQuestionDialog();
    dialog.innerHTML = `<div class="repeat-question-detail">
        <button class="repeat-dialog-close" type="button" data-repeat-close-question aria-label="Close">&times;</button>
        <span class="repeat-kicker">Full Question</span>
        <h2>${repeatEscape(item.question)}</h2>
        <div class="repeat-question-meta">
            <span><small>Subject Code</small><strong>${repeatEscape(item.code)}</strong></span>
            <span><small>Repeated</small><strong>${item.frequency} Times</strong></span>
            <span><small>Total Papers</small><strong>${item.papers}</strong></span>
            <span><small>Unit</small><strong>${repeatEscape(unitLabel)}</strong></span>
            <span><small>Years</small><strong>${repeatEscape(yearsText)}</strong></span>
            <span><small>Branch</small><strong>${repeatEscape(repeatBranchName(repeatState.branch))}</strong></span>
        </div>
        <div class="repeat-actions">
            <button class="repeat-btn secondary" type="button" data-repeat-close-question><i class="fas fa-check"></i> Done</button>
        </div>
    </div>`;
    dialog.showModal();
}

function repeatStatsHtml(items) {
    return items.map(([value, label]) => `<span><strong>${repeatEscape(value)}</strong>${repeatEscape(label)}</span>`).join("");
}

function repeatUnitQuestionGroups(items) {
    const groups = new Map();
    repeatEnsureCoreUnits(new Map()).forEach((label, key) => {
        groups.set(key, { key, label: label || repeatUnitLabel(key), items: [] });
    });
    items.forEach((item) => {
        const key = String(item.unit || "extra");
        if (!groups.has(key)) groups.set(key, { key, label: item.unitLabel || repeatUnitLabel(key), items: [] });
        groups.get(key).items.push(item);
    });
    return [...groups.values()]
        .map((value) => ({
            key: value.key,
            label: value.label || repeatUnitLabel(value.key),
            items: Array.isArray(value.items) ? value.items : []
        }))
        .sort((a, b) => repeatUnitSortValue(a.key) - repeatUnitSortValue(b.key) || a.label.localeCompare(b.label));
}

function repeatUnitPageTabs(items) {
    const options = [["all", "All Units"], ...repeatUnitQuestionGroups(items).map((group) => [group.key, group.label])];
    return `<div class="repeat-unit-tabs" role="tablist" aria-label="Question units">${options.map(([value, label]) => `
        <button class="repeat-unit-tab ${String(repeatState.unit || "all") === String(value) ? "active" : ""}" type="button" data-repeat-unit-page="${repeatEscape(value)}">${repeatEscape(label)}</button>
    `).join("")}</div>`;
}

function repeatStructuredQuestionHtml(question) {
    const questionStarters = "Explain|Write|Draw|What|Define|Describe|Give|Show|Discuss|Compare|Differentiate|How|Illustrate|State|List|Find|Solve|Implement|Why|Indicate";
    const normalizedQuestion = String(question || "").replace(
        new RegExp(`(\\d)Or\\s+(?=(?:${questionStarters})\\b)`, "gi"),
        "$1 Or ",
    );
    const parts = normalizedQuestion
        .split(new RegExp(`\\s+or\\s+(?=(?:${questionStarters})\\b)`, "i"))
        .map((part) => part.trim())
        .filter(Boolean);
    if (!parts.length) return `<p class="repeat-sheet-question-copy">Question text is not available.</p>`;
    return `<p class="repeat-sheet-question-copy">${repeatEscape(parts[0])}</p>${parts.slice(1).map((part) => `
        <div class="repeat-sheet-alternative">
            <span>OR</span>
            <p>${repeatEscape(part)}</p>
        </div>`).join("")}`;
}

function repeatRenderUnitQuestionsPage() {
    const allQuestions = repeatBuildQuestionsForUnit("all");
    repeatQuestionLookup.clear();
    allQuestions.forEach((item) => repeatQuestionLookup.set(item.id, item));
    const selectedUnit = repeatState.unit || "all";
    let visibleQuestions = selectedUnit === "all" ? allQuestions : allQuestions.filter((item) => repeatUnitKey(item.unit) === repeatUnitKey(selectedUnit));
    const effectiveUnit = visibleQuestions.length || selectedUnit === "all" ? selectedUnit : "all";
    if (!visibleQuestions.length && allQuestions.length) visibleQuestions = allQuestions;
    const subjectRecords = repeatRecordsForSubject();
    const selectedSubject = repeatSelectedSubjectOption();
    const sample = subjectRecords[0] || selectedSubject?.records?.[0] || allQuestions[0] || {};
    const years = [...new Set(visibleQuestions.flatMap((item) => item.years || []).map(Number).filter(Number.isFinite))].sort((a, b) => b - a);
    const groups = repeatUnitQuestionGroups(visibleQuestions);
    const unitLabel = effectiveUnit === "all" ? "All Units" : (groups[0]?.label || repeatUnitLabel(effectiveUnit));
    const bookmarks = repeatBookmarks();
    const semesterLabel = String(repeatState.semester).toLowerCase() === "all" ? "All Semesters" : `Semester ${repeatState.semester}`;
    const subjectLabel = String(repeatState.subjectKey).toLowerCase() === "all" ? "All Subjects" : (selectedSubject?.subject || sample.subject || "Subject");
    const title = String(repeatState.subjectKey).toLowerCase() === "all" ? "All Repeated Questions" : subjectLabel;
    const stats = [[visibleQuestions.length, "Questions"], [groups.length, "Units"], [years.length || "All", "Years"], [repeatBranchName(repeatState.branch), "Branch"]];
    return `<div class="repeat-crumbs"><span>${repeatEscape(repeatBranchName(repeatState.branch))}</span><span>${repeatEscape(semesterLabel)}</span><span>${repeatEscape(subjectLabel)}</span><span>${repeatEscape(unitLabel)}</span></div>
    <div class="repeat-view-head repeat-unit-page-head">
        <div>
            <span class="repeat-kicker">Unit-wise Question Sheet</span>
            <h2>${repeatEscape(title)}</h2>
            <p>All repeated questions are shown in one clean sheet according to the selected unit.</p>
        </div>
        <div class="repeat-head-actions">
            <button class="repeat-btn secondary" type="button" data-repeat-step="questions"><i class="fas fa-arrow-left"></i> Unit Cards</button>
        </div>
    </div>
    <div class="repeat-hero-stats repeat-unit-stats">${repeatStatsHtml(stats)}</div>
    ${repeatUnitPageTabs(allQuestions)}
    <div class="repeat-question-list">
        ${visibleQuestions.map((item, index) => {
            const yearsText = item.years?.length ? item.years.slice(0, 16).join(", ") : "Not listed";
            const isBookmarked = bookmarks.includes(item.id);
            const branchLabel = item.branch || repeatBranchName(item.branchId || repeatState.branch);
            const itemSemester = item.semester ? `Semester ${item.semester}` : semesterLabel;
            return `<article class="repeat-sheet-card" id="repeat-question-${repeatEscape(item.id)}">
                <header class="repeat-sheet-card-head">
                    <div class="repeat-sheet-number"><small>Question</small><strong>${String(index + 1).padStart(2, "0")}</strong></div>
                    <div class="repeat-sheet-badges">
                        <span class="repeat-unit-pill">${repeatEscape(item.unitLabel || repeatUnitLabel(item.unit))}</span>
                        <span class="repeat-card-code">${repeatEscape(item.code)}</span>
                    </div>
                    <button class="repeat-sheet-bookmark ${isBookmarked ? "bookmarked" : ""}" type="button" data-repeat-bookmark="${repeatEscape(item.id)}" aria-label="${isBookmarked ? "Remove bookmark" : "Save question"}"><i class="fas fa-bookmark"></i></button>
                </header>
                <div class="repeat-sheet-card-body">${repeatStructuredQuestionHtml(item.question)}</div>
                <footer class="repeat-sheet-card-meta">
                    <span><small>Repeated</small><strong>${item.frequency} Times</strong></span>
                    <span><small>Exam years</small><strong>${repeatEscape(yearsText)}</strong></span>
                    <span><small>Branch</small><strong>${repeatEscape(branchLabel)}</strong></span>
                    <span><small>Semester</small><strong>${repeatEscape(itemSemester)}</strong></span>
                </footer>
            </article>`;
        }).join("") || `<div class="repeat-empty">No repeated questions are available for this unit.</div>`}
    </div>`;
}

function repeatRenderHeroStats() {
    const branchCount = new Set(repeatRecords.map((record) => record.branchId)).size;
    const subjectCount = repeatCatalogSubjects("all", "all").length || repeatUniqueSubjects(repeatRecords).length;
    const questionCount = repeatPublicQuestionCount("all", "all");
    const liveYearCount = new Set(repeatQuestionRows.flatMap((record) => record.years || []).map(String)
        .concat(repeatRecords.map((record) => record.year).filter((year) => /^\d{4}$/.test(year)))).size;
    const yearCount = repeatQuestionRowsLoaded ? liveYearCount : Number(repeatPublicSummary.totals?.years || liveYearCount);
    document.getElementById("repeatHeroStats").innerHTML = repeatStatsHtml([[branchCount, "Branches"], [subjectCount, "Subjects"], [questionCount, "Questions"], [yearCount, "Years"]])
        + `<span class="repeat-speed-stat" id="repeatSpeedBadge"><strong>...</strong>Loading speed</span>`;
    repeatUpdateSpeedBadge();
}

function repeatUpdateSpeedBadge() {
    const badge = document.getElementById("repeatSpeedBadge");
    if (!badge) return;
    const total = repeatPerf.totalMs || Math.max(1, Math.round((window.performance?.now?.() || Date.now()) - repeatPerfStartedAt));
    badge.innerHTML = `<strong>${total} ms</strong>Data ${repeatPerf.dataMs || 0} ms | CSV ${repeatPerf.csvMs || 0} ms | render ${repeatPerf.renderMs || 0} ms`;
}

function repeatRenderProgress() {
    const steps = [
        ["branches", "01", "Branch", "branch", repeatProgressBranchOptions],
        ["semesters", "02", "Semester", "semester", repeatProgressSemesterOptions],
        ["subjects", "03", "Subject", "subject", repeatProgressSubjectOptions],
        ["questions", "04", "Unit", "unit", repeatProgressUnitOptions]
    ];
    const activeStep = repeatState.step === "unitQuestions" ? "questions" : repeatState.step;
    document.getElementById("repeatFlowProgress").innerHTML = steps.map(([step, number, label, selectType, optionsFactory]) => {
        const canGo = repeatCanGo(step);
        const canSelect = selectType === "branch" || canGo;
        return `<div class="repeat-step-chip ${activeStep === step ? "active" : ""} ${canGo ? "" : "disabled"}">
            <button class="repeat-step-main" type="button" data-repeat-step="${step}" ${canGo ? "" : "disabled"}>
                <strong>${number}</strong><span>${label}</span>
            </button>
            <select class="repeat-step-select" data-repeat-progress-select="${selectType}" aria-label="${label} picklist" ${canSelect ? "" : "disabled"}>
                ${optionsFactory()}
            </select>
        </div>`;
    }).join("");
}

function repeatCanGo(step) {
    if (step === "branches") return true;
    if (step === "semesters") return Boolean(repeatState.branch);
    if (step === "subjects") return Boolean(repeatState.branch && repeatState.semester);
    return Boolean(repeatState.branch && repeatState.semester && repeatState.subjectKey);
}

function repeatSetStep(step) {
    if (!repeatCanGo(step)) return;
    repeatState.step = step;
    repeatRender();
    document.getElementById("repeatFlowShell").scrollIntoView({ behavior: "smooth", block: "start" });
}

function repeatBranchCard(branchId) {
    const subjects = repeatCatalogSubjects(branchId, "all").length;
    const questions = repeatPublicQuestionCount(branchId, "all");
    const meta = repeatBranchMeta.get(branchId) || { label: repeatBranchName(branchId), icon: "fa-building-columns", a: "#111827", b: "#d71920" };
    return `<button class="repeat-card repeat-branch-card" type="button" data-repeat-branch="${repeatEscape(branchId)}" style="--repeat-grad-a:${meta.a};--repeat-grad-b:${meta.b}">
        <span class="repeat-icon"><i class="fas ${repeatEscape(meta.icon)}"></i></span>
        <h3>${repeatEscape(repeatBranchName(branchId))}</h3>
        <p>Select this branch to view semester-wise repeated-question data.</p>
        <div class="repeat-card-metrics">
            <span>${subjects} subjects</span>
            <span>${questions} questions</span>
        </div>
    </button>`;
}

function repeatRenderBranches() {
    const branchIds = [...(repeatIsAdmin() ? ["all"] : []), ...repeatOfficialBranches.map(([id]) => id)];
    return `<div class="repeat-view-head">
        <div>
            <span class="repeat-kicker">Page 1</span>
            <h2>Select Branch</h2>
            <p>Choose your B.Tech branch. Each card shows available subjects and repeated-question count.</p>
        </div>
    </div>
    <div class="repeat-grid repeat-branch-grid">${branchIds.map(repeatBranchCard).join("")}</div>`;
}

function repeatRenderSemesters() {
    const records = repeatRecordsForBranch(repeatState.branch);
    const semesters = [...(repeatIsAdmin() ? ["all"] : []), "1", "2", "3", "4", "5", "6", "7", "8"];
    return `<div class="repeat-crumbs"><span>${repeatEscape(repeatBranchName(repeatState.branch))}</span></div>
    <div class="repeat-view-head">
        <div>
            <span class="repeat-kicker">Page 2</span>
            <h2>${repeatEscape(repeatBranchName(repeatState.branch))}</h2>
            <p>Select semester to see subject-wise repeated questions.</p>
        </div>
        <button class="repeat-btn secondary" type="button" data-repeat-step="branches"><i class="fas fa-arrow-left"></i> Branches</button>
    </div>
    <div class="repeat-grid repeat-semester-grid">${semesters.map((semester) => {
        const semesterRecords = semester === "all" ? records : records.filter((record) => String(record.semester) === semester);
        const subjectCount = repeatCatalogSubjects(repeatState.branch, semester).length;
        const semesterPremiumActive = repeatHasGlobalPremiumAccess() || repeatHasSemesterPremiumAccess(repeatState.branch, semester);
        return `<article class="repeat-card repeat-semester-card" role="button" tabindex="0" data-repeat-semester="${semester}">
            <div class="repeat-card-top"><span class="repeat-card-code">${semester === "all" ? "ALL" : `SEM ${String(semester).padStart(2, "0")}`}</span><span class="repeat-premium-badge ${semesterPremiumActive ? "active" : ""}">${semesterPremiumActive ? "Access active" : "Premium access"}</span></div>
            <div class="repeat-semester-copy">
                <span class="repeat-semester-eyebrow">Question archive</span>
                <h3>${semester === "all" ? "All Semesters" : `Semester ${semester}`}</h3>
                <p>${semester === "all" ? "Browse the complete subject directory." : `Browse subjects available in Semester ${semester}.`}</p>
            </div>
            <div class="repeat-card-metrics">
                <span><strong>${subjectCount}</strong><small>Subjects</small></span>
                <span><strong>${repeatPublicQuestionCount(repeatState.branch, semester)}</strong><small>Questions</small></span>
            </div>
            <button class="repeat-premium-link ${semesterPremiumActive ? "active" : ""}" type="button" ${semesterPremiumActive ? "" : "data-repeat-premium-pay"}><span>${semesterPremiumActive ? "Open subjects" : "Unlock premium"}</span><i class="fas ${semesterPremiumActive ? "fa-arrow-right" : "fa-lock"}"></i></button>
        </article>`;
    }).join("")}</div>`;
}

function repeatRenderSubjects() {
    const allSubjects = repeatCatalogSubjects(repeatState.branch, repeatState.semester);
    const semesterRows = repeatQuestionRowsForSemester(repeatState.branch, repeatState.semester);
    const search = repeatState.search.toLowerCase();
    let subjects = allSubjects.filter((item) => `${item.subject} ${item.code}`.toLowerCase().includes(search));
    subjects.sort((a, b) => {
        if (repeatState.sort === "code") return String(a.code).localeCompare(String(b.code), undefined, { numeric: true });
        if (repeatState.sort === "repeated") return repeatQuestionRowsForSubject(b.key).length - repeatQuestionRowsForSubject(a.key).length || b.records.length - a.records.length;
        return String(a.subject).localeCompare(String(b.subject));
    });
    const semesterLabel = String(repeatState.semester).toLowerCase() === "all" ? "All Semesters" : `Semester ${repeatState.semester}`;
    const allSubjectCard = subjects.length ? `<button class="repeat-card repeat-subject-card" type="button" data-repeat-subject="all">
        <div class="repeat-card-top"><span class="repeat-card-code">All</span><i class="fas fa-book-open"></i></div>
        <h3>All Subjects</h3>
        <p>${repeatEscape(repeatBranchName(repeatState.branch))} / ${repeatEscape(semesterLabel)}</p>
        <div class="repeat-card-metrics">
            <span>${subjects.length} subjects</span>
            <span>${semesterRows.length} repeated questions</span>
        </div>
    </button>` : "";
    return `<div class="repeat-crumbs"><span>${repeatEscape(repeatBranchName(repeatState.branch))}</span><span>${repeatEscape(semesterLabel)}</span></div>
    <div class="repeat-view-head">
        <div>
            <span class="repeat-kicker">Page 3</span>
            <h2>Choose Subject</h2>
            <p>Search by subject name or subject code. Cards show papers and repeated-question count.</p>
        </div>
        <button class="repeat-btn secondary" type="button" data-repeat-step="semesters"><i class="fas fa-arrow-left"></i> Semesters</button>
    </div>
    <div class="repeat-toolbar">
        <input id="repeatSubjectSearch" type="search" placeholder="Search subject or code" value="${repeatEscape(repeatState.search)}">
        <select id="repeatSubjectSort">
            <option value="name" ${repeatState.sort === "name" ? "selected" : ""}>Sort by Subject Name</option>
            <option value="code" ${repeatState.sort === "code" ? "selected" : ""}>Sort by Subject Code</option>
            <option value="repeated" ${repeatState.sort === "repeated" ? "selected" : ""}>Sort by Most Repeated</option>
        </select>

    </div>
    <div class="repeat-grid repeat-subject-grid">${allSubjectCard}${subjects.map((item) => {
        const sample = item.records[0] || item;
        const repeatedCount = repeatQuestionRowsForSubject(item.key).length;
        const paperCount = item.records.reduce((total, record) => total + (Number(record.paperCount) || 0), 0)
            || item.records.filter((record) => !record.subjectOptionOnly).length
            || item.records.length;
        const extra = item.subjectCount > 1 ? ` +${item.subjectCount - 1} more aliases` : "";
        return `<button class="repeat-card repeat-subject-card" type="button" data-repeat-subject="${repeatEscape(item.key)}">
            <div class="repeat-card-top"><span class="repeat-card-code">${repeatEscape(repeatPrettyCode(sample, repeatState.branch))}</span><i class="fas fa-book"></i></div>
            <h3>${repeatEscape(item.subject)}</h3>
            <p>${repeatEscape(repeatBranchName(repeatState.branch))} / ${repeatEscape(semesterLabel)}${repeatEscape(extra)}</p>
            <div class="repeat-card-metrics">
                <span>${paperCount} papers</span>
                <span>${repeatedCount} repeated questions</span>
            </div>
        </button>`;
    }).join("") || `<div class="repeat-empty">No subjects match this search.</div>`}</div>`;
}

function repeatUnitCardGroups(questions) {
    return repeatUnitQuestionGroups(questions);
}
function repeatRenderQuestions() {
    const questions = repeatBuildQuestionsForUnit("all");
    repeatQuestionLookup.clear();
    questions.forEach((item) => repeatQuestionLookup.set(item.id, item));
    const subjectRecords = repeatRecordsForSubject();
    const selectedSubject = repeatSelectedSubjectOption();
    const sample = subjectRecords[0] || selectedSubject?.records?.[0] || {};
    const semesterLabel = String(repeatState.semester).toLowerCase() === "all" ? "All Semesters" : `Semester ${repeatState.semester}`;
    const subjectLabel = String(repeatState.subjectKey).toLowerCase() === "all" ? "All Subjects" : (selectedSubject?.subject || sample.subject || "Subject");
    const years = [...new Set(questions.flatMap((item) => item.years || []).map(Number).filter(Number.isFinite)
        .concat(subjectRecords.map((record) => Number(record.year)).filter(Number.isFinite)))].sort((a, b) => b - a);
    const stats = [[questions.length, "Total Questions"], [questions.filter((item) => item.frequency > 1).length, "Most Repeated"], [years.length, "Available Years"], [new Set(questions.map((item) => item.unit)).size, "Unit Coverage"]];
    const unitCardsHtml = repeatUnitCardGroups(questions).map((group) => {
        const unit = String(group.key);
        const unitQuestions = group.items || [];
        const unitYears = [...new Set(unitQuestions.flatMap((item) => item.years || []).map(Number).filter(Number.isFinite))].sort((a, b) => a - b);
        const yearLabel = unitYears.length ? `${unitYears[0]}-${unitYears[unitYears.length - 1]}` : "No years";
        const isEmpty = unitQuestions.length === 0;
        const unitLabel = group.label || repeatUnitLabel(unit);
        return `<button class="repeat-card repeat-unit-result-card${isEmpty ? " empty" : ""}" type="button" data-repeat-unit-card="${repeatEscape(unit)}" ${isEmpty ? "disabled" : ""} aria-label="Open ${repeatEscape(unitLabel)} questions">
            <div class="repeat-card-top">
                <span class="repeat-unit-pill">${repeatEscape(unitLabel)}</span>
                <i class="fas fa-arrow-right"></i>
            </div>
            <h3>${repeatEscape(unitLabel)}</h3>
            <p>${isEmpty ? "No repeated questions are available for this unit." : "Open all repeated questions from this unit."}</p>
            <div class="repeat-card-metrics">
                <span>${unitQuestions.length} questions</span>
                <span>${unitYears.length} exam years</span>
            </div>
            <div class="repeat-unit-result-footer"><span>${repeatEscape(yearLabel)}</span><strong>${isEmpty ? "Unavailable" : "View all questions"}</strong></div>
        </button>`;
    }).join("");
    return `<div class="repeat-crumbs"><span>${repeatEscape(repeatBranchName(repeatState.branch))}</span><span>${repeatEscape(semesterLabel)}</span><span>${repeatEscape(subjectLabel)}</span></div>
    <div class="repeat-view-head">
        <div>
            <span class="repeat-kicker">Page 4 / Unit Picklist</span>
            <h2>Select Unit</h2>
            <p>Choose one unit to view all repeated questions for ${repeatEscape(subjectLabel)}.</p>
        </div>
        <button class="repeat-btn secondary" type="button" data-repeat-step="subjects"><i class="fas fa-arrow-left"></i> Subjects</button>
    </div>
    <div class="repeat-hero-stats">${repeatStatsHtml(stats)}</div>
    <div class="repeat-grid repeat-unit-result-grid">${unitCardsHtml || `<div class="repeat-empty">No repeated questions are available for this subject yet.</div>`}</div>`;
}

function repeatRender() {
    const startedAt = window.performance?.now?.() || Date.now();
    repeatEnforceStudentPrerequisites();
    repeatRenderProgress();
    const content = document.getElementById("repeatFlowContent");
    if (repeatPremiumRequiredForStep()) content.innerHTML = repeatRenderPremiumGate();
    else if (repeatState.step === "semesters") content.innerHTML = repeatRenderSemesters();
    else if (repeatState.step === "subjects") content.innerHTML = repeatRenderSubjects();
    else if (repeatState.step === "questions") content.innerHTML = repeatRenderQuestions();
    else if (repeatState.step === "unitQuestions") content.innerHTML = repeatRenderUnitQuestionsPage();
    else content.innerHTML = repeatRenderBranches();
    repeatPerf.renderMs = Math.max(1, Math.round((window.performance?.now?.() || Date.now()) - startedAt));
    repeatPerf.totalMs = Math.max(1, Math.round((window.performance?.now?.() || Date.now()) - repeatPerfStartedAt));
    repeatUpdateSpeedBadge();
}

function repeatApplyData(settings, content) {
    const startedAt = window.performance?.now?.() || Date.now();
    repeatLatestSettings = settings;
    repeatLatestContent = content;
    const user = repeatCurrentUser();
    repeatAccessSettings = {
        visible: settings.repeatedQuestions?.visible !== false,
        accessMode: settings.repeatedQuestions?.accessMode === "free" ? "free" : "paid",
        price: Math.max(0, Number(settings.repeatedQuestions?.price ?? 100))
    };
    if (String(user.role || "").toLowerCase() !== "admin" && (repeatAccessSettings.visible === false || settings.sections?.pyq === false || settings.visibility?.pyq === false)) {
        document.getElementById("repeatFlowProgress").innerHTML = "";
        document.getElementById("repeatFlowContent").innerHTML = `<div class="repeat-empty">Most Repeated Questions are currently hidden by Admin.</div>`;
        return;
    }
    repeatManagedQuestionRows = (content || [])
        .filter((item) => String(item.type || "").toLowerCase() === "repeated question" && item.isActive !== false)
        .map(repeatNormalizeManagedQuestion)
        .filter(Boolean);
    const allQuestionRows = repeatQuestionRows.concat(repeatManagedQuestionRows);
    const questionRecords = allQuestionRows.map((row) => ({
        ...row,
        id: `question-${row.id}`,
        title: row.title || `${row.subject} repeated question`,
        topic: row.question,
        uploaded: Boolean(row.url)
    }));
    // Question rows stay real; subject picklists/cards stay aligned with the Book1 catalog.
    repeatRecords = repeatDedupe(questionRecords);
    repeatPerf.dataMs = Math.max(1, Math.round((window.performance?.now?.() || Date.now()) - startedAt));
    repeatRenderHeroStats();
    const query = new URLSearchParams(location.search);
    const branch = query.get("branch");
    const semester = query.get("semester");
    const subject = query.get("subject");
    const unit = query.get("unit");
    const mode = query.get("mode");
    const question = query.get("question");
    if (branch) {
        repeatState.branch = !repeatIsAdmin() && branch === "all" ? "" : branch;
        repeatState.step = repeatState.branch ? "semesters" : "branches";
    }
    if (semester) {
        repeatState.semester = !repeatIsAdmin() && semester === "all" ? "" : semester;
        repeatState.step = repeatState.semester ? "subjects" : "semesters";
    }
    if (subject) {
        repeatState.subjectKey = subject;
        repeatState.step = "questions";
    }
    if (unit) repeatState.unit = unit;
    if (question) repeatState.questionId = question;
    if (mode === "unit-questions" && repeatState.branch && repeatState.semester && repeatState.subjectKey) {
        repeatState.step = "unitQuestions";
    }
    repeatEnforceStudentPrerequisites();
    repeatRender();
    repeatEnsureQuestionCatalogLoaded();
}

async function repeatLoadData() {
    let content = [];
    // Premium access fails closed until the live server setting is loaded.
    // Never authorize from a stale browser cache.
    let settings = { repeatedQuestions: { visible: true, accessMode: "paid", price: 100 } };
    try {
        content = JSON.parse(localStorage.getItem("admin_content") || "[]");
    } catch (error) {
        content = [];
    }

    await Promise.all([repeatSyncAuthenticatedUser(), repeatLoadPublicSummary()]);

    if (window.EngiLearnAPI) {
        try {
            const [settingsData, contentData] = await Promise.all([
                EngiLearnAPI.getPublicSettings(),
                EngiLearnAPI.getContent(false)
            ]);
            settings = settingsData.settings || settings;
            content = contentData.content || content;
        } catch (error) {
            console.warn("Using protected repeated-question fallback:", error.message);
        }
    }

    repeatApplyData(settings, content);

    repeatLoadSubjectOptionRows().then((rows) => {
        repeatSubjectOptionRecords = rows;
        repeatApplyData(settings, content);
    });

}
document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("click", (event) => {
        const step = event.target.closest("[data-repeat-step]")?.dataset.repeatStep;
        if (step) {
            repeatSetStep(step);
            return;
        }
        const branch = event.target.closest("[data-repeat-branch]")?.dataset.repeatBranch;
        if (branch) {
            repeatState = { ...repeatState, step: "semesters", branch, semester: "", subjectKey: "", search: "", sort: "name", unit: "all", questionId: "" };
            repeatRender();
            return;
        }
        const premiumPay = event.target.closest("[data-repeat-premium-pay]");
        if (premiumPay) {
            const semesterCard = premiumPay.closest("[data-repeat-semester]");
            const semesterValue = semesterCard?.dataset.repeatSemester || repeatState.semester || "all";
            repeatState = { ...repeatState, step: "subjects", semester: semesterValue, subjectKey: "", search: "", sort: "name", unit: "all", questionId: "" };
            repeatRender();
            repeatStartPremiumPayment();
            return;
        }
        if (event.target.closest("[data-repeat-premium-checkout]")) {
            repeatStartPremiumPayment();
            return;
        }
        const semester = event.target.closest("[data-repeat-semester]")?.dataset.repeatSemester;
        if (semester) {
            if (!repeatHasPremiumAccess()) {
                repeatState = { ...repeatState, step: "subjects", semester, subjectKey: "", search: "", sort: "name", unit: "all", questionId: "" };
                repeatRender();
                return;
            }
            repeatState = { ...repeatState, step: "subjects", semester, subjectKey: "", search: "", sort: "name", unit: "all", questionId: "" };
            repeatRender();
            return;
        }
        const subject = event.target.closest("[data-repeat-subject]")?.dataset.repeatSubject;
        if (subject) {
            repeatState = { ...repeatState, step: "questions", subjectKey: subject, unit: "all", questionSort: "frequency", questionId: "" };
            repeatRender();
            return;
        }
        const unitCard = event.target.closest("[data-repeat-unit-card]")?.dataset.repeatUnitCard;
        if (unitCard) {
            repeatState = { ...repeatState, step: "unitQuestions", unit: unitCard, questionId: "" };
            history.replaceState(null, "", repeatQuestionPageUrl({ unit: unitCard }));
            repeatRender();
            return;
        }
        const unitPage = event.target.closest("[data-repeat-unit-page]")?.dataset.repeatUnitPage;
        if (unitPage) {
            repeatState = { ...repeatState, unit: unitPage, questionId: "" };
            if (repeatState.step === "unitQuestions") history.replaceState(null, "", repeatQuestionPageUrl({ unit: unitPage }));
            repeatRender();
            return;
        }
        if (event.target.closest("[data-repeat-close-question]")) {
            document.getElementById("repeatQuestionDialog")?.close();
            return;
        }
        const bookmark = event.target.closest("[data-repeat-bookmark]")?.dataset.repeatBookmark;
        if (bookmark) {
            const ids = repeatBookmarks();
            const next = ids.includes(bookmark) ? ids.filter((id) => id !== bookmark) : [...ids, bookmark];
            repeatSaveBookmarks(next);
            repeatRender();
            return;
        }
        const questionButton = event.target.closest("[data-repeat-question-open]")?.dataset.repeatQuestionOpen;
        if (questionButton) {
            event.preventDefault();
            const item = repeatQuestionLookup.get(questionButton);
            if (item) window.location.href = repeatQuestionPageUrl(item);
            return;
        }
        if (event.target.closest("a")) return;
        const questionCard = event.target.closest("[data-repeat-question]")?.dataset.repeatQuestion;
        if (questionCard) {
            const item = repeatQuestionLookup.get(questionCard);
            if (item) window.location.href = repeatQuestionPageUrl(item);
        }
    });
    document.addEventListener("keydown", (event) => {
        if (!["Enter", " "].includes(event.key)) return;
        const semesterCard = event.target.closest?.("[data-repeat-semester]");
        if (semesterCard) {
            event.preventDefault();
            const semester = semesterCard.dataset.repeatSemester;
            repeatState = { ...repeatState, step: "subjects", semester, subjectKey: "", search: "", sort: "name", unit: "all", questionId: "" };
            repeatRender();
            return;
        }
        const questionCard = event.target.closest?.("[data-repeat-question]")?.dataset.repeatQuestion;
        if (!questionCard) return;
        event.preventDefault();
        const item = repeatQuestionLookup.get(questionCard);
        if (item) window.location.href = repeatQuestionPageUrl(item);
    });
    document.addEventListener("input", (event) => {
        if (event.target.id === "repeatSubjectSearch") {
            const cursor = event.target.selectionStart;
            repeatState.search = event.target.value;
            repeatRender();
            const field = document.getElementById("repeatSubjectSearch");
            if (field) {
                field.focus();
                field.setSelectionRange(cursor, cursor);
            }
        }
    });
    document.addEventListener("change", (event) => {
        const progressSelect = event.target.closest?.("[data-repeat-progress-select]");
        if (progressSelect) {
            const type = progressSelect.dataset.repeatProgressSelect;
            const value = progressSelect.value;
            if (type === "branch") {
                repeatState = { ...repeatState, step: value ? "semesters" : "branches", branch: value, semester: "", subjectKey: "", search: "", sort: "name", unit: "all", questionId: "" };
            } else if (type === "semester" && repeatState.branch) {
                repeatState = { ...repeatState, step: value ? "subjects" : "semesters", semester: value, subjectKey: "", search: "", sort: "name", unit: "all", questionId: "" };
            } else if (type === "subject" && repeatState.branch && repeatState.semester) {
                repeatState = { ...repeatState, step: value ? "questions" : "subjects", subjectKey: value, unit: "all", questionSort: "frequency", questionId: "" };
            } else if (type === "unit" && repeatState.branch && repeatState.semester && repeatState.subjectKey) {
                repeatState = { ...repeatState, step: "unitQuestions", unit: value || "all", questionId: "" };
                history.replaceState(null, "", repeatQuestionPageUrl({ unit: repeatState.unit }));
            }
            repeatRender();
            return;
        }
        if (event.target.id === "repeatSubjectSort") {
            repeatState.sort = event.target.value;
            repeatRender();
        }
        if (event.target.id === "repeatUnitFilter") {
            repeatState.unit = event.target.value;
            repeatRender();
        }
        if (event.target.id === "repeatQuestionUnit") {
            repeatState = { ...repeatState, step: "unitQuestions", unit: event.target.value || "all", questionId: "" };
            history.replaceState(null, "", repeatQuestionPageUrl({ unit: repeatState.unit }));
            repeatRender();
        }
        if (event.target.id === "repeatQuestionSort") {
            repeatState.questionSort = event.target.value;
            repeatRender();
        }
    });
    repeatLoadData();
    window.setTimeout(() => repeatResumePremiumPaymentIfNeeded(), 800);
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
