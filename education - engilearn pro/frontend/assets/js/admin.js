const adminState = {
    editingUserId: null,
    editingContentId: null,
    users: JSON.parse(localStorage.getItem("admin_users") || "null") || [],
    content: JSON.parse(localStorage.getItem("admin_content") || "null") || [],
    modules: JSON.parse(localStorage.getItem("admin_modules") || "null") || {
        courses: [],
        exams: [],
        payments: [],
        notifications: [],
        aiTools: []
    },
    moduleEditing: {},
    activity: JSON.parse(localStorage.getItem("admin_activity") || "[]"),
    filters: {
        userSearch: "",
        userRole: "all",
        userStatus: "all",
        contentSearch: "",
        contentType: "all",
        contentBranch: "all"
    },
    settings: JSON.parse(localStorage.getItem("admin_settings") || "null") || {
        defaultPassword: ""
    }
};

function getLoggedInUser() {
    return JSON.parse(localStorage.getItem("mini_currentUser") || "null");
}

function seedAdminLoginUser() {
    const users = JSON.parse(localStorage.getItem("mini_users") || "[]");
    const adminEmail = "admin@engilearn.com";

    if (!users.some((user) => user.email === adminEmail)) {
        users.push({
            id: 1,
            email: adminEmail,
            password: "",
            name: "Admin",
            role: "Admin",
            status: "Active",
            joined: new Date().toISOString()
        });
        localStorage.setItem("mini_users", JSON.stringify(users));
    }
}

function guardAdminAccess() {
    seedAdminLoginUser();
    const user = getLoggedInUser();

    if (user && user.role === "Admin") {
        return true;
    }

    document.querySelector(".admin-shell").innerHTML = `
        <main class="admin-main admin-denied">
            <section class="admin-hero">
                <h1>Admin Access Only</h1>
                <p>This panel is only for Admin users. Students can use the main learning platform and cannot upload videos.</p>
            </section>
            <div class="admin-card">
                <h2>Login Required</h2>
                <p class="admin-help">Please login with an Admin account from the home page, then open the Admin Dashboard again.</p>
                <div class="admin-actions">
                    <a class="admin-btn" href="../index.html"><i class="fas fa-home"></i> Back to Home</a>
                </div>
            </div>
        </main>
    `;
    return false;
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

const branchSubjects = {
    cse: {
        name: "Computer Science & Engg",
        semesters: {
            "3": ["ES-301 - Energy & Environmental Engineering", "CS-302 - Discrete Structure", "CS-303 - Data Structure", "CS-304 - Digital Systems", "CS-305 - Object Oriented Programming & Methodology"],
            "4": ["BT-401 - Mathematics III", "CS-402 - Analysis & Design of Algorithms (ADA)", "CS-403 - Software Engineering", "CS-404 - Computer Organization & Architecture (COA)", "CS-405 - Operating Systems (OS)"],
            "5": ["CS-501 - Theory of Computation (TOC)", "CS-502 - Database Management Systems (DBMS)", "CS-503(A) - Data Analytics", "CS-503(B) - Pattern Recognition", "CS-503(C) - Cyber Security", "CS-504(A) - Internet and Web Technology", "CS-504(B) - Object Oriented Programming", "CS-504(C) - Introduction to Database Management Systems"],
            "6": ["CS-601 - Machine Learning", "CS-602 - Computer Networks", "CS-603(A) - Advanced Computer Architecture", "CS-603(B) - Computer Graphics & Visualization", "CS-603(C) - Compiler Design", "CS-604(A) - Knowledge Management", "CS-604(B) - Project Management", "CS-604(C) - Rural Technology & Community Development"],
            "7": ["CS-701 - Software Architectures", "CS-702(A) - Computational Intelligence", "CS-702(B) - Deep & Reinforcement Learning", "CS-702(C) - Wireless & Mobile Computing", "CS-702(D) - Big Data", "CS-703(A) - Cryptography & Information Security", "CS-703(B) - Data Mining & Warehousing", "CS-703(C) - Agile Software Development", "CS-703(D) - Disaster Management"],
            "8": ["CS-801 - Internet of Things (IoT)", "CS-802(A) - Blockchain Technologies", "CS-802(B) - Cloud Computing", "CS-802(C) - High Performance Computing", "CS-802(D) - Object Oriented Software Engineering", "CS-803(A) - Image Processing and Computer Vision", "CS-803(B) - Game Theory with Engineering Applications", "CS-803(C) - Internet of Things", "CS-803(D) - Managing Innovation and Entrepreneurship"]
        }
    },
    it: {
        name: "Information Technology",
        semesters: {
            "1": ["BT-101 - Engineering Chemistry", "BT-102 - Mathematics-I", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics"],
            "2": ["BT-201 - Engineering Physics", "BT-202 - Mathematics-II", "BT-203 - Basic Mechanical Engineering", "BT-204 - Basic Civil Engineering & Mechanics", "BT-205 - Basic Computer Engineering"],
            "3": ["ES-301 - Energy & Environmental Engineering", "IT-302 - Discrete Structure", "IT-303 - Data Structure", "IT-304 - Object Oriented Programming & Methodology", "IT-305 - Digital Circuits & System"],
            "4": ["BT-401 - Mathematics-III", "IT-402 - Analysis & Design of Algorithm", "IT-403 - Software Engineering", "IT-404 - Computer Organization & Architecture", "IT-405 - Operating Systems"],
            "5": ["IT-501 - Operating System", "IT-502 - Computer Network", "IT-503(A) - Theory of Computation (Departmental Elective)", "IT-503(B) - Microprocessor & Interfacing (Departmental Elective)", "IT-503(C) - Principles of Programming Languages (Departmental Elective)", "IT-504(A) - Artificial Intelligence (Open Elective)", "IT-504(B) - E-Commerce & Governance (Open Elective)", "IT-504(C) - Java Programming (Open Elective)"],
            "6": ["IT-601 - Computer Graphics & Multimedia", "IT-602 - Wireless & Mobile Computing", "IT-603(A) - Compiler Design", "IT-603(B) - Data Mining", "IT-603(C) - Embedded Systems", "IT-604(A) - Intellectual Property Rights (IPR)", "IT-604(B) - Software Engineering", "IT-604(C) - Wireless Sensor Networks"],
            "7": ["IT-701 - Soft Computing", "IT-702(A) - Cloud Computing", "IT-702(B) - Information Security", "IT-702(C) - Big Data Analytics", "IT-703(A) - Internet of Things (IoT)", "IT-703(B) - Blockchain Technology", "IT-703(C) - Cyber Security"],
            "8": ["IT-801 - Major Project - Phase II", "IT-802 - Comprehensive Viva-Voce", "IT-803 - Seminar", "IT-804 - Industrial Training / Internship"]
        }
    },
    ece: {
        name: "Electronics & Communication",
        semesters: {
            "1": ["BT-101 - Engineering Chemistry", "BT-102 - Mathematics-I", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics"],
            "2": ["BT-201 - Engineering Physics", "BT-202 - Mathematics-II", "BT-203 - Basic Mechanical Engineering", "BT-204 - Basic Civil Engineering & Mechanics", "BT-205 - Basic Computer Engineering"],
            "3": ["BT-301 - Mathematics-III", "EC-302 - Electronic Measurement & Instrumentation", "EC-303 - Digital System Design", "EC-304 - Electronic Devices", "EC-305 - Network Analysis"],
            "4": ["ES-401 - Energy & Environmental Engineering", "EC-402 - Signals & Systems", "EC-403 - Analog Communication", "EC-404 - Control System", "EC-405 - Analog Circuits"],
            "5": ["EC-501 - Microprocessor & Its Applications", "EC-502 - Digital Communication", "EC-503-(A/B/C) - Any one Departmental Elective", "EC-504-(A/B/C) - Any one Open Elective"],
            "6": ["EC-601 - Digital Signal Processing", "EC-602 - Computer Architecture & Organization", "EC-603-(A/B/C) - Any one Departmental Elective", "EC-604-(A/B/C) - Any one Open Elective"],
            "7": ["EC-701 - VLSI Design", "EC-702-(A/B/C) - Choose one Departmental Elective", "EC-703-(A/B/C) - Choose one Open Elective"],
            "8": ["EC-801 - Optical Fibre Communication", "EC-802-(A/B/C) - Choose one Departmental Elective", "EC-803-(A/B/C) - Choose one Open Elective"]
        }
    },
    mech: {
        name: "Mechanical Engineering",
        semesters: {
            "1": ["BT-101 - Engineering Chemistry", "BT-102 - Mathematics-I", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics"],
            "2": ["BT-201 - Engineering Physics", "BT-202 - Mathematics-II", "BT-203 - Basic Mechanical Engineering", "BT-204 - Basic Civil Engineering & Mechanics", "BT-205 - Basic Computer Engineering"],
            "3": ["ME-301 - Thermodynamics", "ME-302 - Material Science", "ME-303 - Strength of Materials", "ME-304 - Manufacturing Process", "ME-305 - Fluid Mechanics", "ME-306 - Energy & Environmental Engineering"],
            "4": ["ME-401 - Theory of Machines", "ME-402 - Applied Thermodynamics", "ME-403 - Machine Drawing", "ME-404 - Manufacturing Technology", "ME-405 - Hydraulic Machines", "ME-406 - Numerical Methods & Computer Programming"],
            "5": ["ME-501 - Design of Machine Elements", "ME-502 - Heat & Mass Transfer", "ME-503 - Dynamics of Machines", "ME-504 - Industrial Engineering & Management", "ME-505(A) - Refrigeration & Air Conditioning", "ME-505(B) - Automobile Engineering", "ME-505(C) - Mechatronics"],
            "6": ["ME-601 - Machine Design", "ME-602 - Finite Element Methods", "ME-603 - Internal Combustion Engines", "ME-604 - Turbo Machines", "ME-605(A) - Operations Research", "ME-605(B) - Computer Integrated Manufacturing (CIM)", "ME-605(C) - Renewable Energy Sources"],
            "7": ["ME-701 - Mechanical Vibrations", "ME-702 - CAD/CAM", "ME-703(A) - Advanced Manufacturing Technology", "ME-703(B) - Robotics", "ME-703(C) - Non-Conventional Manufacturing Process", "ME-704(A) - Power Plant Engineering", "ME-704(B) - Automobile Engineering-II", "ME-704(C) - Industrial Automation"],
            "8": ["ME-801(A) - Computational Fluid Dynamics", "ME-801(B) - Advanced IC Engines", "ME-801(C) - Product Design & Development", "ME-802(A) - Total Quality Management", "ME-802(B) - Supply Chain Management", "ME-802(C) - Industrial Safety Engineering"]
        }
    },
    civil: {
        name: "Civil Engineering",
        semesters: {
            "1": ["BT-101 - Engineering Chemistry", "BT-102 - Mathematics-I", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics"],
            "2": ["BT-201 - Engineering Physics", "BT-202 - Mathematics-II", "BT-203 - Basic Mechanical Engineering", "BT-204 - Basic Civil Engineering & Mechanics", "BT-205 - Basic Computer Engineering"],
            "3": ["CE-301 - Strength of Materials", "CE-302 - Building Materials", "CE-303 - Surveying", "CE-304 - Fluid Mechanics", "CE-305 - Engineering Geology", "CE-306 - Mathematics-III"],
            "4": ["CE-401 - Structural Analysis", "CE-402 - Geotechnical Engineering-I", "CE-403 - Hydraulics", "CE-404 - Concrete Technology", "CE-405(A) - Building Planning & Architecture", "CE-405(B) - Engineering Geology", "CE-405(C) - Disaster Management"],
            "5": ["CE-501 - Design of Reinforced Concrete Structures", "CE-502 - Design of Steel Structures", "CE-503 - Water Resources Engineering", "CE-504 - Transportation Engineering-I", "CE-505(A) - Environmental Engineering-I", "CE-505(B) - Advanced Surveying", "CE-505(C) - Construction Technology & Management"],
            "6": ["CE-601 - Design of Prestressed Concrete Structures", "CE-602 - Environmental Engineering-II", "CE-603 - Transportation Engineering-II", "CE-604 - Estimation, Costing & Valuation", "CE-605(A) - Advanced Structural Analysis", "CE-605(B) - Ground Water Engineering", "CE-605(C) - Bridge Engineering"],
            "7": ["CE-701 - Foundation Engineering", "CE-702 - Construction Planning & Management", "CE-703(A) - Earthquake Resistant Design", "CE-703(B) - Advanced Highway Engineering", "CE-703(C) - Remote Sensing & GIS", "CE-704(A) - Finite Element Method", "CE-704(B) - Pavement Design", "CE-704(C) - Solid & Hazardous Waste Management"],
            "8": ["CE-801(A) - Advanced Reinforced Concrete Design", "CE-801(B) - Advanced Foundation Engineering", "CE-801(C) - Traffic Engineering & Management", "CE-802(A) - Repair & Rehabilitation of Structures", "CE-802(B) - Irrigation Engineering", "CE-802(C) - Environmental Impact Assessment"]
        }
    },
    eee: {
        name: "Electrical & Electronics",
        semesters: {
            "1": ["BT-101 - Engineering Chemistry", "BT-102 - Mathematics-I", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics"],
            "2": ["BT-201 - Engineering Physics", "BT-202 - Mathematics-II", "BT-203 - Basic Mechanical Engineering", "BT-204 - Basic Civil Engineering & Mechanics", "BT-205 - Basic Computer Engineering"],
            "3": ["EE-301 - Electrical Measurements & Measuring Instruments", "EE-302 - Network Analysis", "EE-303 - Analog Electronics", "EE-304 - Electrical Machines-I", "EE-305 - Engineering Mathematics-III"],
            "4": ["EE-401 - Power System-I", "EE-402 - Control Systems", "EE-403 - Digital Electronics", "EE-404 - Electrical Machines-II", "EE-405 - Engineering Mathematics-IV"],
            "5": ["EE-501 - Power Electronics", "EE-502 - Power System-II", "EE-503 - Microprocessors & Microcontrollers", "EE-504 - Electrical Machine Design", "EE-505(A) - High Voltage Engineering", "EE-505(B) - Utilization of Electrical Energy", "EE-505(C) - Electrical & Hybrid Vehicles"],
            "6": ["EE-601 - Power System Analysis", "EE-602 - Power System Protection", "EE-603 - Digital Signal Processing", "EE-604 - Switchgear & Protection", "EE-605(A) - Flexible AC Transmission Systems (FACTS)", "EE-605(B) - Renewable Energy Sources", "EE-605(C) - Industrial Drives & Control"],
            "7": ["EE-701 - Power System Operation & Control", "EE-702 - Electrical Drives", "EE-703(A) - HVDC Transmission", "EE-703(B) - Energy Management & Auditing", "EE-703(C) - Smart Grid Technology", "EE-704 - Departmental Elective / Open Elective (as per RGPV scheme)"],
            "8": ["EE-801(A) - Power Quality", "EE-801(B) - Embedded Systems", "EE-801(C) - Electric & Hybrid Vehicles", "EE-802(A) - Distribution System Engineering", "EE-802(B) - Artificial Intelligence Applications in Electrical Engineering", "EE-802(C) - Energy Conservation & Management"]
        }
    },
    ds: {
        name: "Data Science",
        semesters: {
            "1": ["BT-101 - Engineering Chemistry", "BT-102 - Mathematics-I", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics"],
            "2": ["BT-201 - Engineering Physics", "BT-202 - Mathematics-II", "BT-203 - Basic Mechanical Engineering", "BT-204 - Basic Civil Engineering & Mechanics", "BT-205 - Basic Computer Engineering"],
            "3": ["BT-301 - Mathematics-III", "DS-302 - Data Structures", "DS-303 - Digital Systems", "DS-304 - Discrete Mathematics", "DS-305 - Object Oriented Programming & Methodology"],
            "4": ["BT-401 - Mathematics-IV", "DS-402 - Design & Analysis of Algorithms", "DS-403 - Computer Organization & Architecture", "DS-404 - Database Management Systems", "DS-405 - Theory of Computation"],
            "5": ["CD-501 - Computational Mathematics", "CD-502 - Compiler Design", "CD-503 - Cloud Computing", "CD-504 - Artificial Intelligence", "CD-505-(A/B/C) - Departmental Elective (any one):", "CD-505(A) - Web Engineering", "CD-505(B) - Machine Learning", "CD-505(C) - Computational Intelligence"],
            "6": ["CD-601 - Deep Learning", "CD-602 - Computer Networks", "CD-603-(A/B/C) - Departmental Elective (any one):", "CD-603(A) - Big Data Analytics", "CD-603(B) - Data Acquisition", "CD-603(C) - Advanced Database Management System", "CD-604-(A/B/C) - Open Elective (any one):", "CD-604(A) - Information Extraction and Retrieval", "CD-604(B) - Agile Software Development", "CD-604(C) - Natural Language Processing"],
            "7": ["CD-701 - Data Engineering", "CD-702-(A/B/C/D) - Departmental Elective (any one):", "CD-702(A) - Data Analytics & Visualization", "CD-702(B) - Internet of Things (IoT)", "CD-702(C) - Cloud Computing", "CD-702(D) - Blockchain Technology", "CD-703-(A/B/C/D) - Open Elective (any one):", "CD-703(A) - Cryptography & Information Security", "CD-703(B) - Data Mining & Warehousing", "CD-703(C) - Agile Software Development", "CD-703(D) - Disaster Management", "CD-704-(A/B/C/D) - Departmental Elective (any one):", "CD-704(A) - Advanced Statistics for Data Science", "CD-704(B) - Explainable AI", "CD-704(C) - Bioinformatics", "CD-704(D) - Business Intelligence & Analytics"],
            "8": ["CD-801 - Major Project / Internship Evaluation (no written theory paper)", "CD-802-(A/B/C/D) - Departmental Elective (any one):", "CD-802(A) - Reinforcement Learning", "CD-802(B) - Project Management", "CD-802(C) - Computational Statistics", "CD-802(D) - Machine Learning for Data Science", "CD-803-(A/B/C/D) - Open Elective (any one):", "CD-803(A) - Blockchain Technologies", "CD-803(B) - Time-Series Analysis", "CD-803(C) - Quantum Computing", "CD-803(D) - Human-Computer Interaction"]
        }
    },
    cyber: {
        name: "Cyber Security",
        semesters: {
            "1": ["BT-101 - Engineering Chemistry", "BT-102 - Mathematics-I", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics"],
            "2": ["BT-201 - Engineering Physics", "BT-202 - Mathematics-II", "BT-203 - Basic Mechanical Engineering", "BT-204 - Basic Civil Engineering & Mechanics", "BT-205 - Basic Computer Engineering"],
            "3": ["CY-301 - Technical Communication", "CY-302 - Discrete Structures", "CY-303 - Data Structures", "CY-304 - Digital Systems", "CY-305 - Object Oriented Programming & Methodology"],
            "4": ["CY-401 - Mathematics-III", "CY-402 - Analysis & Design of Algorithms", "CY-403 - Computer Organization & Architecture", "CY-404 - Operating Systems", "CY-405 - Database Management Systems (DBMS)"],
            "5": ["CY-501 - OS Internals for Security Support", "CY-502 - Design and Analysis of Algorithms", "CY-503 - Network Security", "CY-504(A) - Cyber Law and Intellectual Property Rights", "CY-504(B) - Internet of Things", "CY-504(C) - Computer Organization and Architecture"],
            "6": ["CY-601 - Cryptography and Network Security", "CY-602 - Computer Networks", "CY-603 - Departmental Elective", "CY-603(A) - Machine Learning", "CY-603(B) - Advanced Computer Architecture", "CY-603(C) - Compiler Design", "CY-604 - Open Elective", "CY-604(A) - Knowledge Management", "CY-604(B) - Project Management", "CY-604(C) - Rural Technology & Community Development"],
            "7": ["CY-701 - Information Security Risk Management", "CY-702 - Digital Forensics", "CY-703 - (Departmental Elective", "CY-703(A) - Ethical Hacking", "CY-703(B) - Cyber Security Policies & Standards", "CY-703(C) - Data Engineering", "CY-703(D) - Cloud Computing"],
            "8": ["CD-801 - Major Project / Internship Evaluation (no written theory paper)", "CD-802-(A/B/C/D) - Departmental Elective (any one):", "CD-802(A) - Reinforcement Learning", "CD-802(B) - Project Management", "CD-802(C) - Computational Statistics", "CD-802(D) - Machine Learning for Data Science", "CD-803-(A/B/C/D) - Open Elective (any one):", "CD-803(A) - Blockchain Technologies", "CD-803(B) - Time-Series Analysis", "CD-803(C) - Quantum Computing", "CD-803(D) - Human-Computer Interaction"]
        }
    },
    chemical: {
        name: "Chemical Engineering",
        semesters: {
            "1": ["BT-101 - Engineering Chemistry", "BT-102 - Mathematics-I", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics"],
            "2": ["BT-201 - Engineering Physics", "BT-202 - Mathematics-II", "BT-203 - Basic Mechanical Engineering", "BT-204 - Basic Civil Engineering & Mechanics", "BT-205 - Basic Computer Engineering"],
            "3": ["BT-301 - Mathematics-III", "CM-302 - Chemical Engineering Thermodynamics", "CM-303 - Advance Engineering Chemistry", "CM-304 - Material & Energy Balance", "CM-305 - Chemical Instrumentation"],
            "4": ["BT-401 - Mathematics-III", "CM-402 - Fluid Mechanics", "CM-403 - Heat Transfer", "CM-404 - Mechanical Operations", "CM-405 - Chemical Engineering Process Calculations / Chemical Process Calculations*"],
            "5": ["CM-501 - Mass Transfer-I", "CM-502 - Chemical Reaction Engineering-I", "CM-503(A) - Computation Methods in Chemical Engineering", "CM-503(B) - Pulp & Paper Technology", "CM-503(C) - Pharmaceutical Technology", "CM-504(A) - Organic Process Technology", "CM-504(B) - Fuel Cell Technology", "CM-504(C) - Energy Management"],
            "6": ["CM-601 - Mass Transfer-II", "CM-602 - Chemical Reaction Engineering-II", "CM-603 - Process Dynamics & Control", "CM-604(A) - Polymer Technology", "CM-604(B) - Petrochemical Technology", "CM-604(C) - Fertilizer Technology", "CM-605(A) - Environmental Engineering", "CM-605(B) - Food Technology", "CM-605(C) - Safety & Hazard Management"],
            "7": ["CM-701 - Process Equipment Design", "CM-702 - Chemical Process Industries", "CM-703(A) - Transport Phenomena", "CM-703(B) - Biochemical Engineering", "CM-703(C) - Corrosion Engineering", "CM-704(A) - Membrane Technology", "CM-704(B) - Nanotechnology", "CM-704(C) - Industrial Pollution Control"],
            "8": ["CM-801(A) - Petroleum Refinery Engineering", "CM-801(B) - Process Plant Utilities", "CM-801(C) - Advanced Separation Processes", "CM-802(A) - Process Economics & Plant Design", "CM-802(B) - Energy Conservation in Process Industries", "CM-802(C) - Industrial Waste Management"]
        }
    },
    auto: {
        name: "Automobile Engineering",
        semesters: {
            "1": ["BT-101 - Engineering Mathematics-I", "BT-102 - Engineering Chemistry", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics"],
            "2": ["BT-201 - Engineering Mathematics-II", "BT-202 - Engineering Physics", "BT-203 - Basic Mechanical Engineering", "BT-204 - Basic Civil Engineering & Mechanics", "BT-205 - Basic Computer Engineering"],
            "3": ["BT-301 - Mathematics-III", "AU-302 - Engineering Thermodynamics", "AU-303 - Strength of Materials", "AU-304 - Manufacturing Technology", "AU-305 - Automobile Engineering Materials"],
            "4": ["BT-401 - Mathematics-IV", "AU-402 - Fluid Mechanics & Hydraulic Machines", "AU-403 - Theory of Machines", "AU-404 - Applied Thermodynamics", "AU-405 - Machine Drawing & Design"],
            "5": ["AU-501 - Internal Combustion Engines", "AU-502 - Automobile Transmission", "AU-503(A) - Vehicle Body Engineering", "AU-503(B) - Tractor & Farm Machinery", "AU-503(C) - Vehicle Maintenance", "AU-504(A) - Automotive Electrical & Electronics", "AU-504(B) - Two & Three Wheeler Technology", "AU-504(C) - Automobile Air Conditioning"],
            "6": ["AU-601 - Vehicle Dynamics", "AU-602 - Automobile Chassis Design", "AU-603 - Automobile Pollution & Control", "AU-604(A) - Automotive Safety", "AU-604(B) - Alternative Fuels & Energy Systems", "AU-604(C) - Automotive Aerodynamics"],
            "7": ["AU-701 - Automotive Engine Management Systems", "AU-702 - Electric & Hybrid Vehicles", "AU-703(A) - Vehicle Testing & Homologation", "AU-703(B) - Transport Management", "AU-703(C) - Automotive Robotics", "AU-704 - Industrial Management & Entrepreneurship"],
            "8": ["AU-801 - Automobile System Design", "AU-802 - Recent Trends in Automobile Engineering", "AU-803(A) - Advanced Automotive Electronics", "AU-803(B) - Intelligent Transportation Systems", "AU-803(C) - Automotive Mechatronics"]
        }
    },
    production: {
        name: "Production Engineering",
        semesters: {
            "1": ["BT-101 - Engineering Mathematics-I", "BT-102 - Engineering Chemistry", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics"],
            "2": ["BT-201 - Engineering Mathematics-II", "BT-202 - Engineering Physics", "BT-203 - Basic Mechanical Engineering", "BT-204 - Basic Civil Engineering & Mechanics", "BT-205 - Basic Computer Engineering"],
            "3": ["BT-301 - Mathematics-III", "PR-302 - Manufacturing Process-I", "PR-303 - Strength of Materials", "PR-304 - Engineering Materials", "PR-305 - Metrology & Measurement"],
            "4": ["BT-401 - Mathematics-IV", "PR-402 - Manufacturing Process-II", "PR-403 - Theory of Machines", "PR-404 - Machine Design-I", "PR-405 - Industrial Engineering"],
            "5": ["PR-501 - Production Planning & Control", "PR-502 - Machine Tool Design", "PR-503(A) - Operations Research", "PR-503(B) - Quality Engineering", "PR-503(C) - Tool Engineering", "PR-504(A) - Heat Treatment Technology", "PR-504(B) - Non-Conventional Manufacturing Processes", "PR-504(C) - Automation in Manufacturing"],
            "6": ["PR-601 - CAD/CAM", "PR-602 - Machine Design-II", "PR-603 - Metal Forming Technology", "PR-604(A) - Flexible Manufacturing Systems", "PR-604(B) - Robotics in Manufacturing", "PR-604(C) - Total Quality Management"],
            "7": ["PR-701 - Production Management", "PR-702 - CIM (Computer Integrated Manufacturing)", "PR-703(A) - Supply Chain Management", "PR-703(B) - Lean Manufacturing", "PR-703(C) - Advanced Manufacturing Technology", "PR-704 - Entrepreneurship & Industrial Management"],
            "8": ["PR-801 - Advanced Production Engineering", "PR-802 - Modern Manufacturing Systems", "PR-803(A) - Reliability Engineering", "PR-803(B) - Product Design & Development", "PR-803(C) - Six Sigma & Quality Systems"]
        }
    },
    aero: {
        name: "Aeronautical Engineering",
        semesters: {
            "1": ["BT-101 - Engineering Mathematics-I", "BT-102 - Engineering Chemistry", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics"],
            "2": ["BT-201 - Engineering Mathematics-II", "BT-202 - Engineering Physics", "BT-203 - Basic Mechanical Engineering", "BT-204 - Basic Civil Engineering & Mechanics", "BT-205 - Basic Computer Engineering"],
            "3": ["BT-301 - Mathematics-III", "AE-302 - Aerodynamics-I", "AE-303 - Aircraft Structures-I", "AE-304 - Aircraft Propulsion-I", "AE-305 - Engineering Thermodynamics"],
            "4": ["BT-401 - Mathematics-IV", "AE-402 - Aerodynamics-II", "AE-403 - Aircraft Structures-II", "AE-404 - Aircraft Propulsion-II", "AE-405 - Flight Mechanics-I"],
            "5": ["AE-501 - Aircraft Design-I", "AE-502 - Aircraft Systems & Instruments", "AE-503(A) - Gas Dynamics", "AE-503(B) - Helicopter Engineering", "AE-503(C) - Rocket Propulsion", "AE-504(A) - Aerospace Materials", "AE-504(B) - Space Technology", "AE-504(C) - Aircraft Production Technology"],
            "6": ["AE-601 - Flight Mechanics-II", "AE-602 - Aircraft Design-II", "AE-603 - Aircraft Stability & Control", "AE-604(A) - Computational Fluid Dynamics", "AE-604(B) - Aircraft Maintenance Engineering", "AE-604(C) - Avionics"],
            "7": ["AE-701 - Aerospace Vehicle Design", "AE-702 - Experimental Aerodynamics", "AE-703(A) - Finite Element Methods", "AE-703(B) - Unmanned Aerial Vehicles (UAV)", "AE-703(C) - Missile Technology", "AE-704 - Industrial Management & Entrepreneurship"],
            "8": ["AE-801 - Advanced Aerospace Engineering", "AE-802 - Recent Trends in Aeronautical Engineering", "AE-803(A) - Aircraft Certification & Airworthiness", "AE-803(B) - Spacecraft Systems", "AE-803(C) - Advanced Avionics"]
        }
    },
    bme: {
        name: "Biomedical Engineering",
        semesters: {
            "1": ["BT-101 - Engineering Mathematics-I", "BT-102 - Engineering Chemistry", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics"],
            "2": ["BT-201 - Engineering Mathematics-II", "BT-202 - Engineering Physics", "BT-203 - Basic Mechanical Engineering", "BT-204 - Basic Civil Engineering & Mechanics", "BT-205 - Basic Computer Engineering"],
            "3": ["BT-301 - Mathematics-III", "BM-302 - Human Anatomy & Physiology", "BM-303 - Biomedical Instrumentation", "BM-304 - Electronic Devices & Circuits", "BM-305 - Signals & Systems"],
            "4": ["BT-401 - Mathematics-IV", "BM-402 - Medical Electronics", "BM-403 - Sensors & Transducers", "BM-404 - Digital Signal Processing", "BM-405 - Biomaterials"],
            "5": ["BM-501 - Medical Imaging Systems", "BM-502 - Biomedical Signal Processing", "BM-503(A) - Artificial Organs", "BM-503(B) - Rehabilitation Engineering", "BM-503(C) - Bioinformatics", "BM-504(A) - Hospital Engineering", "BM-504(B) - Diagnostic & Therapeutic Equipment", "BM-504(C) - Biomedical Optics"],
            "6": ["BM-601 - Biomechanics", "BM-602 - Medical Image Processing", "BM-603 - Biomedical Microprocessors", "BM-604(A) - Neural Engineering", "BM-604(B) - Embedded Systems for Biomedical Applications", "BM-604(C) - Telemedicine"],
            "7": ["BM-701 - Biomedical Engineering Design", "BM-702 - Biomedical Instrumentation-II", "BM-703(A) - Tissue Engineering", "BM-703(B) - Clinical Engineering", "BM-703(C) - Nanotechnology in Medicine", "BM-704 - Industrial Management & Entrepreneurship"],
            "8": ["BM-801 - Advanced Biomedical Engineering", "BM-802 - Recent Trends in Biomedical Engineering", "BM-803(A) - Medical Robotics", "BM-803(B) - Healthcare Technology Management", "BM-803(C) - Biomedical Data Analytics"]
        }
    },
    iot: {
        name: "IoT & Embedded Systems",
        semesters: {
            "1": ["BT-101 - Engineering Mathematics-I", "BT-102 - Engineering Chemistry", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics"],
            "2": ["BT-201 - Engineering Mathematics-II", "BT-202 - Engineering Physics", "BT-203 - Basic Mechanical Engineering", "BT-204 - Basic Civil Engineering & Mechanics", "BT-205 - Basic Computer Engineering"],
            "3": ["BT-301 - Mathematics-III", "IE-302 - Digital Electronics", "IE-303 - Data Structures", "IE-304 - Computer Organization & Architecture", "IE-305 - Electronic Devices & Circuits"],
            "4": ["BT-401 - Mathematics-IV", "IE-402 - Microprocessors & Microcontrollers", "IE-403 - Embedded Systems", "IE-404 - Operating Systems", "IE-405 - Computer Networks"],
            "5": ["IE-501 - Internet of Things", "IE-502 - Wireless Sensor Networks", "IE-503(A) - ARM Processor Architecture", "IE-503(B) - Real Time Operating Systems", "IE-503(C) - FPGA Design", "IE-504(A) - Cloud Computing", "IE-504(B) - Cyber Security", "IE-504(C) - VLSI Design"],
            "6": ["IE-601 - IoT System Design", "IE-602 - Embedded Linux", "IE-603 - Industrial IoT", "IE-604(A) - Edge Computing", "IE-604(B) - Machine Learning for IoT", "IE-604(C) - Robotics & Automation"],
            "7": ["IE-701 - Advanced Embedded Systems", "IE-702 - IoT Security", "IE-703(A) - Smart Cities & Smart Infrastructure", "IE-703(B) - Automotive Embedded Systems", "IE-703(C) - Wearable Computing", "IE-704 - Entrepreneurship & Industrial Management"],
            "8": ["IE-801 - Advanced IoT Applications", "IE-802 - Recent Trends in IoT & Embedded Systems", "IE-803(A) - AI for IoT", "IE-803(B) - Internet of Medical Things (IoMT)", "IE-803(C) - Advanced Embedded System Design"]
        }
    },
    power: {
        name: "Power Electronics",
        semesters: {
            "1": ["BT-101 - Engineering Mathematics-I", "BT-102 - Engineering Chemistry", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics"],
            "2": ["BT-201 - Engineering Mathematics-II", "BT-202 - Engineering Physics", "BT-203 - Basic Mechanical Engineering", "BT-204 - Basic Civil Engineering & Mechanics", "BT-205 - Basic Computer Engineering"],
            "3": ["BT-301 - Mathematics-III", "PE-302 - Network Analysis", "PE-303 - Electrical Machines-I", "PE-304 - Electronic Devices & Circuits", "PE-305 - Digital Electronics"],
            "4": ["BT-401 - Mathematics-IV", "PE-402 - Electrical Machines-II", "PE-403 - Analog Electronics", "PE-404 - Power Systems-I", "PE-405 - Control Systems"],
            "5": ["PE-501 - Power Electronics", "PE-502 - Microprocessors & Microcontrollers", "PE-503(A) - Electrical Drives", "PE-503(B) - High Voltage Engineering", "PE-503(C) - Industrial Electronics", "PE-504(A) - Signals & Systems", "PE-504(B) - Renewable Energy Systems", "PE-504(C) - Embedded Systems"],
            "6": ["PE-601 - Advanced Power Electronics", "PE-602 - Power System-II", "PE-603 - Digital Control Systems", "PE-604(A) - FACTS Devices", "PE-604(B) - Electric Drives & Control", "PE-604(C) - HVDC Transmission"],
            "7": ["PE-701 - Power Quality", "PE-702 - Electric & Hybrid Vehicles", "PE-703(A) - Smart Grid", "PE-703(B) - Flexible AC Transmission Systems", "PE-703(C) - Power Semiconductor Devices", "PE-704 - Industrial Management & Entrepreneurship"],
            "8": ["PE-801 - Advanced Electrical Drives", "PE-802 - Recent Trends in Power Electronics", "PE-803(A) - Renewable Energy Integration", "PE-803(B) - Energy Management Systems", "PE-803(C) - Industrial Automation"]
        }
    },
    mechatronics: {
        name: "Mechatronics",
        semesters: {
            "1": ["BT-101 - Engineering Mathematics-I", "BT-102 - Engineering Chemistry", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics"],
            "2": ["BT-201 - Engineering Mathematics-II", "BT-202 - Engineering Physics", "BT-203 - Basic Mechanical Engineering", "BT-204 - Basic Civil Engineering & Mechanics", "BT-205 - Basic Computer Engineering"],
            "3": ["BT-301 - Mathematics-III", "MT-302 - Engineering Mechanics", "MT-303 - Strength of Materials", "MT-304 - Electrical Machines", "MT-305 - Electronic Devices & Circuits"],
            "4": ["BT-401 - Mathematics-IV", "MT-402 - Theory of Machines", "MT-403 - Analog & Digital Electronics", "MT-404 - Microprocessors & Microcontrollers", "MT-405 - Fluid Power Engineering"],
            "5": ["MT-501 - Mechatronics System Design", "MT-502 - Industrial Automation", "MT-503(A) - Robotics", "MT-503(B) - PLC & SCADA", "MT-503(C) - Sensors & Transducers", "MT-504(A) - Control Systems", "MT-504(B) - Embedded Systems", "MT-504(C) - Computer Integrated Manufacturing"],
            "6": ["MT-601 - Robotics & Automation", "MT-602 - CNC Machines & Programming", "MT-603 - Industrial Drives", "MT-604(A) - Artificial Intelligence", "MT-604(B) - Machine Vision", "MT-604(C) - Internet of Things for Mechatronics"],
            "7": ["MT-701 - Advanced Mechatronics", "MT-702 - Intelligent Manufacturing Systems", "MT-703(A) - Autonomous Robots", "MT-703(B) - Flexible Manufacturing Systems", "MT-703(C) - MEMS & Microsystems", "MT-704 - Entrepreneurship & Industrial Management"],
            "8": ["MT-801 - Advanced Robotics", "MT-802 - Recent Trends in Mechatronics", "MT-803(A) - Human Robot Interaction", "MT-803(B) - Smart Manufacturing", "MT-803(C) - Advanced Control Engineering"]
        }
    },
    instrumentation: {
        name: "Instrumentation",
        semesters: {
            "1": ["BT-101 - Engineering Mathematics-I", "BT-102 - Engineering Chemistry", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics"],
            "2": ["BT-201 - Engineering Mathematics-II", "BT-202 - Engineering Physics", "BT-203 - Basic Mechanical Engineering", "BT-204 - Basic Civil Engineering & Mechanics", "BT-205 - Basic Computer Engineering"],
            "3": ["BT-301 - Mathematics-III", "IN-302 - Electrical Circuits & Networks", "IN-303 - Electronic Devices & Circuits", "IN-304 - Digital Electronics", "IN-305 - Sensors & Transducers"],
            "4": ["BT-401 - Mathematics-IV", "IN-402 - Analog Electronics", "IN-403 - Industrial Instrumentation", "IN-404 - Control Systems", "IN-405 - Signals & Systems"],
            "5": ["IN-501 - Process Control", "IN-502 - Microprocessors & Microcontrollers", "IN-503(A) - Biomedical Instrumentation", "IN-503(B) - Analytical Instrumentation", "IN-503(C) - Digital Signal Processing", "IN-504(A) - Industrial Automation", "IN-504(B) - PLC & SCADA", "IN-504(C) - Embedded Systems"],
            "6": ["IN-601 - Advanced Process Control", "IN-602 - Computer Control of Processes", "IN-603 - Power Plant Instrumentation", "IN-604(A) - Robotics & Automation", "IN-604(B) - Optical Instrumentation", "IN-604(C) - Wireless Instrumentation"],
            "7": ["IN-701 - Distributed Control Systems", "IN-702 - Industrial Safety & Instrumentation", "IN-703(A) - Virtual Instrumentation", "IN-703(B) - MEMS & Microsystems", "IN-703(C) - IoT for Instrumentation", "IN-704 - Industrial Management & Entrepreneurship"],
            "8": ["IN-801 - Advanced Instrumentation Engineering", "IN-802 - Recent Trends in Instrumentation", "IN-803(A) - Smart Sensors & Measurement Systems", "IN-803(B) - Industrial IoT", "IN-803(C) - Artificial Intelligence in Instrumentation"]
        }
    },
    env: {
        name: "Environmental Engineering",
        semesters: {
            "1": ["BT-101 - Engineering Mathematics-I", "BT-102 - Engineering Chemistry", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics"],
            "2": ["BT-201 - Engineering Mathematics-II", "BT-202 - Engineering Physics", "BT-203 - Basic Mechanical Engineering", "BT-204 - Basic Civil Engineering & Mechanics", "BT-205 - Basic Computer Engineering"],
            "3": ["BT-301 - Mathematics-III", "EV-302 - Environmental Chemistry", "EV-303 - Fluid Mechanics", "EV-304 - Engineering Geology", "EV-305 - Environmental Microbiology"],
            "4": ["BT-401 - Mathematics-IV", "EV-402 - Water Supply Engineering", "EV-403 - Wastewater Engineering", "EV-404 - Air Pollution & Control", "EV-405 - Solid Waste Management"],
            "5": ["EV-501 - Environmental Impact Assessment", "EV-502 - Industrial Waste Management", "EV-503(A) - Noise Pollution & Control", "EV-503(B) - Hazardous Waste Management", "EV-503(C) - Environmental Biotechnology", "EV-504(A) - Environmental Modeling", "EV-504(B) - Groundwater Engineering", "EV-504(C) - Renewable Energy Systems"],
            "6": ["EV-601 - Water & Wastewater Treatment", "EV-602 - Environmental Management", "EV-603 - Remote Sensing & GIS", "EV-604(A) - Climate Change & Sustainable Development", "EV-604(B) - Industrial Safety & Environmental Engineering", "EV-604(C) - Environmental Laws & Policies"],
            "7": ["EV-701 - Environmental Systems Engineering", "EV-702 - Resource Conservation & Recycling", "EV-703(A) - Green Building Technology", "EV-703(B) - Disaster Management", "EV-703(C) - Energy & Environment", "EV-704 - Industrial Management & Entrepreneurship"],
            "8": ["EV-801 - Advanced Environmental Engineering", "EV-802 - Recent Trends in Environmental Engineering", "EV-803(A) - Sustainable Infrastructure", "EV-803(B) - Environmental Risk Assessment", "EV-803(C) - Cleaner Production Technology"]
        }
    },
    arch: {
        name: "Architecture",
        semesters: {
            "1": ["AR-101 - Architectural Design-I", "AR-102 - Building Materials & Construction-I", "AR-103 - Architectural Graphics-I", "AR-104 - Theory of Structures-I", "AR-105 - History of Architecture-I"],
            "2": ["AR-201 - Architectural Design-II", "AR-202 - Building Materials & Construction-II", "AR-203 - Architectural Graphics-II", "AR-204 - Theory of Structures-II", "AR-205 - History of Architecture-II"],
            "3": ["AR-301 - Architectural Design-III", "AR-302 - Building Construction-III", "AR-303 - Climatology", "AR-304 - Theory of Structures-III", "AR-305 - History of Architecture-III"],
            "4": ["AR-401 - Architectural Design-IV", "AR-402 - Building Construction-IV", "AR-403 - Building Services-I", "AR-404 - Theory of Structures-IV", "AR-405 - Estimation & Costing"],
            "5": ["AR-501 - Architectural Design-V", "AR-502 - Building Services-II", "AR-503 - Landscape Architecture", "AR-504 - Specifications & Contracts", "AR-505 - Interior Design"],
            "6": ["AR-601 - Architectural Design-VI", "AR-602 - Housing", "AR-603 - Urban Planning", "AR-604 - Quantity Surveying & Valuation", "AR-605 - Professional Practice-I"],
            "7": ["AR-701 - Architectural Design-VII", "AR-702 - Town Planning", "AR-703 - Advanced Building Construction", "AR-704 - Building Management", "AR-705 - Professional Practice-II"],
            "8": ["AR-801 - Architectural Design-VIII", "AR-802 - Environmental Planning", "AR-803 - Advanced Building Services", "AR-804 - Disaster Management", "AR-805 - Research Methodology"]
        }
    },
    metallurgy: {
        name: "Metallurgical Engineering",
        semesters: {
            "1": ["BT-101 - Engineering Mathematics-I", "BT-102 - Engineering Chemistry", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics"],
            "2": ["BT-201 - Engineering Mathematics-II", "BT-202 - Engineering Physics", "BT-203 - Basic Mechanical Engineering", "BT-204 - Basic Civil Engineering & Mechanics", "BT-205 - Basic Computer Engineering"],
            "3": ["BT-301 - Mathematics-III", "ML-302 - Physical Metallurgy", "ML-303 - Engineering Thermodynamics", "ML-304 - Metallurgical Analysis", "ML-305 - Engineering Materials"],
            "4": ["BT-401 - Mathematics-IV", "ML-402 - Mechanical Metallurgy", "ML-403 - Extractive Metallurgy-I", "ML-404 - Phase Transformations", "ML-405 - Fuel, Furnace & Refractories"],
            "5": ["ML-501 - Iron Making", "ML-502 - Steel Making", "ML-503(A) - Foundry Technology", "ML-503(B) - Welding Technology", "ML-503(C) - Powder Metallurgy", "ML-504(A) - Heat Treatment Technology", "ML-504(B) - Corrosion Engineering", "ML-504(C) - Non-Ferrous Metallurgy"],
            "6": ["ML-601 - Extractive Metallurgy-II", "ML-602 - Mechanical Behaviour of Materials", "ML-603 - Materials Characterization", "ML-604(A) - Composite Materials", "ML-604(B) - Surface Engineering", "ML-604(C) - Nano Materials"],
            "7": ["ML-701 - Advanced Physical Metallurgy", "ML-702 - Materials Processing", "ML-703(A) - Failure Analysis", "ML-703(B) - Industrial Metallurgy", "ML-703(C) - Advanced Materials", "ML-704 - Industrial Management & Entrepreneurship"],
            "8": ["ML-801 - Modern Metallurgical Engineering", "ML-802 - Recent Trends in Metallurgy", "ML-803(A) - Biomaterials", "ML-803(B) - Energy Materials", "ML-803(C) - Materials Selection & Design"]
        }
    },
    mining: {
        name: "Mining Engineering",
        semesters: {
            "1": ["BT-101 - Engineering Mathematics-I", "BT-102 - Engineering Chemistry", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics"],
            "2": ["BT-201 - Engineering Mathematics-II", "BT-202 - Engineering Physics", "BT-203 - Basic Mechanical Engineering", "BT-204 - Basic Civil Engineering & Mechanics", "BT-205 - Basic Computer Engineering"],
            "3": ["BT-301 - Mathematics-III", "MN-302 - Introduction to Mining Engineering", "MN-303 - Mine Surveying-I", "MN-304 - Mining Geology", "MN-305 - Rock Mechanics"],
            "4": ["BT-401 - Mathematics-IV", "MN-402 - Surface Mining", "MN-403 - Underground Coal Mining", "MN-404 - Mine Surveying-II", "MN-405 - Mine Ventilation"],
            "5": ["MN-501 - Mine Environmental Engineering", "MN-502 - Mine Machinery", "MN-503(A) - Drilling & Blasting", "MN-503(B) - Mineral Processing", "MN-503(C) - Mine Safety Engineering", "MN-504(A) - Underground Metal Mining", "MN-504(B) - Mine Management", "MN-504(C) - Tunnelling Engineering"],
            "6": ["MN-601 - Mine Planning & Design", "MN-602 - Mine Economics", "MN-603 - Mine Transportation", "MN-604(A) - Rock Excavation Engineering", "MN-604(B) - Advanced Mine Ventilation", "MN-604(C) - Geo-Mechanics"],
            "7": ["MN-701 - Mine Systems Engineering", "MN-702 - Mine Legislation", "MN-703(A) - Computer Applications in Mining", "MN-703(B) - Mine Automation", "MN-703(C) - Remote Sensing & GIS in Mining", "MN-704 - Industrial Management & Entrepreneurship"],
            "8": ["MN-801 - Advanced Mining Engineering", "MN-802 - Recent Trends in Mining Engineering", "MN-803(A) - Sustainable Mining", "MN-803(B) - Mine Disaster Management", "MN-803(C) - Advanced Mineral Exploration"]
        }
    },
    textile: {
        name: "Textile Technology",
        semesters: {
            "1": ["BT-101 - Engineering Mathematics-I", "BT-102 - Engineering Chemistry", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics"],
            "2": ["BT-201 - Engineering Mathematics-II", "BT-202 - Engineering Physics", "BT-203 - Basic Mechanical Engineering", "BT-204 - Basic Civil Engineering & Mechanics", "BT-205 - Basic Computer Engineering"],
            "3": ["BT-301 - Mathematics-III", "TT-302 - Fibre Science & Technology", "TT-303 - Yarn Manufacturing Technology-I", "TT-304 - Textile Testing", "TT-305 - Textile Raw Materials"],
            "4": ["BT-401 - Mathematics-IV", "TT-402 - Yarn Manufacturing Technology-II", "TT-403 - Fabric Manufacturing Technology", "TT-404 - Textile Physics", "TT-405 - Textile Chemical Processing-I"],
            "5": ["TT-501 - Textile Chemical Processing-II", "TT-502 - Knitting Technology", "TT-503(A) - Weaving Technology", "TT-503(B) - Nonwoven Technology", "TT-503(C) - Textile Machinery", "TT-504(A) - Garment Manufacturing Technology", "TT-504(B) - Textile Quality Control", "TT-504(C) - Technical Textiles"],
            "6": ["TT-601 - Textile Design", "TT-602 - Textile Finishing", "TT-603 - Apparel Technology", "TT-604(A) - Textile Management", "TT-604(B) - Industrial Engineering in Textiles", "TT-604(C) - Computer Applications in Textiles"],
            "7": ["TT-701 - Advanced Textile Technology", "TT-702 - Textile Engineering Economics", "TT-703(A) - Fashion Technology", "TT-703(B) - Textile Composite Materials", "TT-703(C) - Smart Textiles", "TT-704 - Industrial Management & Entrepreneurship"],
            "8": ["TT-801 - Modern Textile Technology", "TT-802 - Recent Trends in Textile Engineering", "TT-803(A) - Sustainable Textile Technology", "TT-803(B) - Advanced Garment Engineering", "TT-803(C) - Technical & Functional Textiles"]
        }
    },
    petroleum: {
        name: "Petroleum Engineering",
        semesters: {
            "1": ["BT-101 - Engineering Mathematics-I", "BT-102 - Engineering Chemistry", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics"],
            "2": ["BT-201 - Engineering Mathematics-II", "BT-202 - Engineering Physics", "BT-203 - Basic Mechanical Engineering", "BT-204 - Basic Civil Engineering & Mechanics", "BT-205 - Basic Computer Engineering"],
            "3": ["BT-301 - Mathematics-III", "PT-302 - Petroleum Geology", "PT-303 - Fluid Mechanics", "PT-304 - Engineering Thermodynamics", "PT-305 - Drilling Engineering-I"],
            "4": ["BT-401 - Mathematics-IV", "PT-402 - Reservoir Engineering-I", "PT-403 - Drilling Engineering-II", "PT-404 - Well Logging & Formation Evaluation", "PT-405 - Petroleum Production Engineering-I"],
            "5": ["PT-501 - Petroleum Production Engineering-II", "PT-502 - Reservoir Engineering-II", "PT-503(A) - Natural Gas Engineering", "PT-503(B) - Offshore Drilling Technology", "PT-503(C) - Petroleum Refining Technology", "PT-504(A) - Enhanced Oil Recovery", "PT-504(B) - Pipeline Engineering", "PT-504(C) - Petroleum Economics"],
            "6": ["PT-601 - Reservoir Simulation", "PT-602 - Well Testing", "PT-603 - Petroleum Exploration", "PT-604(A) - Offshore Production Engineering", "PT-604(B) - Health, Safety & Environment in Petroleum Industry", "PT-604(C) - Unconventional Oil & Gas Resources"],
            "7": ["PT-701 - Advanced Drilling Engineering", "PT-702 - Petroleum Reservoir Management", "PT-703(A) - LNG Technology", "PT-703(B) - Oil & Gas Processing", "PT-703(C) - Energy Engineering", "PT-704 - Industrial Management & Entrepreneurship"],
            "8": ["PT-801 - Advanced Petroleum Engineering", "PT-802 - Recent Trends in Petroleum Engineering", "PT-803(A) - Deepwater Drilling Technology", "PT-803(B) - Carbon Capture & Storage", "PT-803(C) - Petroleum Asset Management"]
        }
    },
    food: {
        name: "Food Technology",
        semesters: {
            "1": ["BT-101 - Engineering Mathematics-I", "BT-102 - Engineering Chemistry", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics"],
            "2": ["BT-201 - Engineering Mathematics-II", "BT-202 - Engineering Physics", "BT-203 - Basic Mechanical Engineering", "BT-204 - Basic Civil Engineering & Mechanics", "BT-205 - Basic Computer Engineering"],
            "3": ["BT-301 - Mathematics-III", "FT-302 - Food Chemistry", "FT-303 - Food Microbiology", "FT-304 - Engineering Properties of Food", "FT-305 - Food Biochemistry"],
            "4": ["BT-401 - Mathematics-IV", "FT-402 - Food Processing Technology-I", "FT-403 - Food Preservation Technology", "FT-404 - Heat & Mass Transfer", "FT-405 - Food Analysis & Instrumentation"],
            "5": ["FT-501 - Food Processing Technology-II", "FT-502 - Dairy Technology", "FT-503(A) - Fruit & Vegetable Processing", "FT-503(B) - Cereal, Pulse & Oilseed Technology", "FT-503(C) - Meat, Fish & Poultry Processing", "FT-504(A) - Food Packaging Technology", "FT-504(B) - Food Plant Engineering", "FT-504(C) - Food Quality Assurance"],
            "6": ["FT-601 - Food Process Engineering", "FT-602 - Food Safety & Standards", "FT-603 - Refrigeration & Cold Storage", "FT-604(A) - Functional Foods & Nutraceuticals", "FT-604(B) - Bakery & Confectionery Technology", "FT-604(C) - Beverage Technology"],
            "7": ["FT-701 - Food Product Development", "FT-702 - Food Biotechnology", "FT-703(A) - Food Supply Chain Management", "FT-703(B) - Quality Management Systems", "FT-703(C) - Food Waste Management", "FT-704 - Industrial Management & Entrepreneurship"],
            "8": ["FT-801 - Advanced Food Technology", "FT-802 - Recent Trends in Food Technology", "FT-803(A) - Food Nanotechnology", "FT-803(B) - Food Toxicology", "FT-803(C) - Food Business Management"]
        }
    },
    robotics: {
        name: "Robotics Engineering",
        semesters: {
            "1": ["BT-101 - Engineering Mathematics-I", "BT-102 - Engineering Chemistry", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics"],
            "2": ["BT-201 - Engineering Mathematics-II", "BT-202 - Engineering Physics", "BT-203 - Basic Mechanical Engineering", "BT-204 - Basic Civil Engineering & Mechanics", "BT-205 - Basic Computer Engineering"],
            "3": ["BT-301 - Mathematics-III", "RB-302 - Engineering Mechanics", "RB-303 - Electronic Devices & Circuits", "RB-304 - Data Structures", "RB-305 - Digital Electronics"],
            "4": ["BT-401 - Mathematics-IV", "RB-402 - Microprocessors & Microcontrollers", "RB-403 - Control Systems", "RB-404 - Sensors & Actuators", "RB-405 - Kinematics of Machines"],
            "5": ["RB-501 - Robotics Engineering", "RB-502 - Embedded Systems", "RB-503(A) - Industrial Robotics", "RB-503(B) - Artificial Intelligence", "RB-503(C) - Machine Vision", "RB-504(A) - PLC & SCADA", "RB-504(B) - Mechatronics", "RB-504(C) - Computer Vision"],
            "6": ["RB-601 - Robot Dynamics & Control", "RB-602 - Autonomous Mobile Robots", "RB-603 - Internet of Things", "RB-604(A) - Machine Learning", "RB-604(B) - Human Robot Interaction", "RB-604(C) - Industrial Automation"],
            "7": ["RB-701 - Advanced Robotics", "RB-702 - Intelligent Robotic Systems", "RB-703(A) - Swarm Robotics", "RB-703(B) - Medical Robotics", "RB-703(C) - UAV & Drone Technology", "RB-704 - Industrial Management & Entrepreneurship"],
            "8": ["RB-801 - Advanced Robot Design", "RB-802 - Recent Trends in Robotics Engineering", "RB-803(A) - Collaborative Robotics (Cobots)", "RB-803(B) - Robotic Process Automation (RPA)", "RB-803(C) - AI Applications in Robotics"]
        }
    },
    nano: {
        name: "Nanotechnology",
        semesters: {
            "1": ["BT-101 - Engineering Mathematics-I", "BT-102 - Engineering Chemistry", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics"],
            "2": ["BT-201 - Engineering Mathematics-II", "BT-202 - Engineering Physics", "BT-203 - Basic Mechanical Engineering", "BT-204 - Basic Civil Engineering & Mechanics", "BT-205 - Basic Computer Engineering"],
            "3": ["BT-301 - Mathematics-III", "NT-302 - Introduction to Nanotechnology", "NT-303 - Solid State Physics", "NT-304 - Materials Science", "NT-305 - Engineering Chemistry for Nanotechnology"],
            "4": ["BT-401 - Mathematics-IV", "NT-402 - Nano Materials", "NT-403 - Quantum Mechanics", "NT-404 - Nano Fabrication Techniques", "NT-405 - Nano Characterization Techniques"],
            "5": ["NT-501 - Nano Electronics", "NT-502 - Nano Biotechnology", "NT-503(A) - Carbon Nanomaterials", "NT-503(B) - Nano Photonics", "NT-503(C) - Nano Sensors", "NT-504(A) - Thin Film Technology", "NT-504(B) - MEMS & NEMS", "NT-504(C) - Computational Nanotechnology"],
            "6": ["NT-601 - Nanocomposites", "NT-602 - Nano Device Engineering", "NT-603 - Nano Toxicology & Safety", "NT-604(A) - Biomedical Nanotechnology", "NT-604(B) - Energy Nanotechnology", "NT-604(C) - Polymer Nanotechnology"],
            "7": ["NT-701 - Advanced Nanotechnology", "NT-702 - Nano Manufacturing", "NT-703(A) - Nano Medicine", "NT-703(B) - Environmental Nanotechnology", "NT-703(C) - Nano Robotics", "NT-704 - Industrial Management & Entrepreneurship"],
            "8": ["NT-801 - Recent Trends in Nanotechnology", "NT-802 - Nanotechnology Applications", "NT-803(A) - Advanced Functional Nanomaterials", "NT-803(B) - Nano Energy Systems", "NT-803(C) - Nano Product Design"]
        }
    },
    marine: {
        name: "Marine Engineering",
        semesters: {
            "1": ["BT-101 - Engineering Mathematics-I", "BT-102 - Engineering Chemistry", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics"],
            "2": ["BT-201 - Engineering Mathematics-II", "BT-202 - Engineering Physics", "BT-203 - Basic Mechanical Engineering", "BT-204 - Basic Civil Engineering & Mechanics", "BT-205 - Basic Computer Engineering"],
            "3": ["BT-301 - Mathematics-III", "MR-302 - Applied Mechanics", "MR-303 - Engineering Thermodynamics", "MR-304 - Marine Engineering Drawing", "MR-305 - Electrical Technology"],
            "4": ["BT-401 - Mathematics-IV", "MR-402 - Marine Boilers", "MR-403 - Marine Diesel Engines", "MR-404 - Fluid Mechanics & Hydraulic Machines", "MR-405 - Marine Electrical Technology"],
            "5": ["MR-501 - Naval Architecture", "MR-502 - Marine Auxiliary Machinery", "MR-503(A) - Ship Construction", "MR-503(B) - Marine Heat Engines", "MR-503(C) - Marine Refrigeration & Air Conditioning", "MR-504(A) - Marine Automation", "MR-504(B) - Marine Pollution & Control", "MR-504(C) - Marine Materials"],
            "6": ["MR-601 - Marine Power Plant", "MR-602 - Marine Control Systems", "MR-603 - Marine Electrical Machines", "MR-604(A) - Marine Safety & Regulations", "MR-604(B) - Ship Operation & Maintenance", "MR-604(C) - Offshore Engineering"],
            "7": ["MR-701 - Advanced Marine Engineering", "MR-702 - Ship Design & Stability", "MR-703(A) - Port & Harbour Engineering", "MR-703(B) - Marine Renewable Energy", "MR-703(C) - Marine Robotics", "MR-704 - Industrial Management & Entrepreneurship"],
            "8": ["MR-801 - Modern Marine Engineering", "MR-802 - Recent Trends in Marine Engineering", "MR-803(A) - LNG & Gas Carrier Technology", "MR-803(B) - Marine Energy Management", "MR-803(C) - Smart Ship Technology"]
        }
    }
};

const fallbackBranchSubjects = {
    cse: ["ES-301 - Energy & Environmental Engineering", "CS-302 - Discrete Structure", "CS-303 - Data Structure", "CS-304 - Digital Systems", "CS-305 - Object Oriented Programming & Methodology", "BT-401 - Mathematics III"],
    it: ["BT-101 - Engineering Chemistry", "BT-102 - Mathematics-I", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics", "BT-201 - Engineering Physics"],
    ece: ["BT-101 - Engineering Chemistry", "BT-102 - Mathematics-I", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics", "BT-201 - Engineering Physics"],
    mech: ["BT-101 - Engineering Chemistry", "BT-102 - Mathematics-I", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics", "BT-201 - Engineering Physics"],
    civil: ["BT-101 - Engineering Chemistry", "BT-102 - Mathematics-I", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics", "BT-201 - Engineering Physics"],
    eee: ["BT-101 - Engineering Chemistry", "BT-102 - Mathematics-I", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics", "BT-201 - Engineering Physics"],
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

function buildFallbackSemesters(subjects) {
    return {
        "3": ["Mathematics-III", subjects[0], subjects[1], "Engineering Mechanics", "Material Science", `${subjects[0]} Lab`, `${subjects[1]} Lab`, "Workshop / Practice Lab"],
        "4": [subjects[2], subjects[3], "Fluid Mechanics", "Electrical & Electronics Systems", "Numerical Methods", `${subjects[2]} Lab`, `${subjects[3]} Lab`, "Simulation Lab"],
        "5": [subjects[4], subjects[5], "Design & Analysis", "Instrumentation", "Management Science", `${subjects[4]} Lab`, `${subjects[5]} Lab`, "Design Lab"],
        "6": ["Advanced " + subjects[0], "CAD / Modeling", "Quality & Reliability", "Open Elective-I", "Industrial Economics", "CAD Lab", "Advanced Lab", "Mini Project"],
        "7": ["Professional Elective-I", "Professional Elective-II", "Open Elective-II", "Seminar", "Major Project-I", "Industrial Training", "Comprehensive Viva-I"],
        "8": ["Professional Elective-III", "Professional Elective-IV", "Entrepreneurship", "Major Project-II", "Comprehensive Viva-II"]
    };
}

const branchNames = {
    aero: "Aeronautical Engineering",
    bme: "Biomedical Engineering",
    iot: "IoT & Embedded Systems",
    mechatronics: "Mechatronics",
    power: "Power Electronics",
    instrumentation: "Instrumentation",
    env: "Environmental Engineering",
    arch: "Architecture",
    metallurgy: "Metallurgical Engineering",
    mining: "Mining Engineering",
    textile: "Textile Technology",
    petroleum: "Petroleum Engineering",
    food: "Food Technology",
    robotics: "Robotics Engineering",
    nano: "Nanotechnology",
    marine: "Marine Engineering"
};

const rgpvSyllabus = Object.entries({
    ...branchSubjects,
    ...Object.fromEntries(Object.entries(fallbackBranchSubjects).map(([id, subjects]) => [
        id,
        { name: branchNames[id], semesters: buildFallbackSemesters(subjects) }
    ]))
}).map(([id, branch]) => ({
    id,
    name: branch.name,
    semesters: {
        ...(setBBranches.has(id) ? firstYearSetB : firstYearSetA),
        ...branch.semesters
    }
}));

let customSyllabus = JSON.parse(localStorage.getItem("admin_custom_syllabus") || "{}");

const moduleConfigs = {
    students: {
        source: "users",
        role: "Student",
        titleField: "name",
        fields: [
            ["name", "Student Name", "text"],
            ["email", "Email", "email"],
            ["status", "Status", "select", ["Active", "Blocked"]],
            ["activity", "Activity", "textarea"]
        ]
    },
    teachers: {
        source: "users",
        role: "Teacher",
        titleField: "name",
        fields: [
            ["name", "Teacher Name", "text"],
            ["email", "Email", "email"],
            ["status", "Status", "select", ["Active", "Blocked"]],
            ["activity", "Activity", "textarea"]
        ]
    },
    notes: {
        source: "content",
        type: "Notes",
        titleField: "title",
        fields: [
            ["title", "Note Title", "text"],
            ["branch", "Branch", "text"],
            ["semester", "Semester", "text"],
            ["subject", "Subject", "text"],
            ["topic", "Topic", "text"],
            ["fileName", "File or URL", "text"]
        ]
    },
    videos: {
        source: "content",
        type: "Video",
        titleField: "title",
        fields: [
            ["title", "Video Title", "text"],
            ["branch", "Branch", "text"],
            ["semester", "Semester", "text"],
            ["subject", "Subject", "text"],
            ["topic", "Topic", "text"],
            ["fileName", "Video URL", "text"]
        ]
    },
    courses: {
        source: "records",
        titleField: "title",
        fields: [
            ["title", "Course Title", "text"],
            ["teacher", "Teacher", "text"],
            ["category", "Category", "text"],
            ["price", "Price", "number"],
            ["students", "Students", "number"],
            ["status", "Status", "select", ["Active", "Draft", "Archived"]]
        ]
    },
    exams: {
        source: "records",
        titleField: "title",
        fields: [
            ["title", "Exam Title", "text"],
            ["course", "Course", "text"],
            ["date", "Date", "date"],
            ["questions", "Questions", "number"],
            ["status", "Status", "select", ["Scheduled", "Live", "Completed"]]
        ]
    },
    payments: {
        source: "records",
        titleField: "student",
        fields: [
            ["student", "Student", "text"],
            ["course", "Course", "text"],
            ["amount", "Amount", "number"],
            ["date", "Date", "date"],
            ["status", "Status", "select", ["Paid", "Pending", "Failed", "Refunded"]]
        ]
    },
    notifications: {
        source: "records",
        titleField: "title",
        fields: [
            ["title", "Title", "text"],
            ["audience", "Audience", "select", ["All Students", "Teachers", "Paid Students", "Admins"]],
            ["status", "Status", "select", ["Draft", "Sent", "Scheduled"]],
            ["message", "Message", "textarea"]
        ]
    },
    aiTools: {
        source: "records",
        titleField: "name",
        fields: [
            ["name", "Tool Name", "text"],
            ["category", "Category", "text"],
            ["url", "URL", "url"],
            ["status", "Status", "select", ["Active", "Disabled"]]
        ]
    }
};

function applyCustomSyllabus() {
    Object.entries(customSyllabus).forEach(([branchName, semesters]) => {
        const branch = rgpvSyllabus.find((item) => item.name === branchName);
        if (!branch) return;

        Object.entries(semesters).forEach(([semester, subjects]) => {
            branch.semesters[semester] = branch.semesters[semester] || [];
            subjects.forEach((subject) => addUniqueSubject(branch.semesters[semester], subject));
        });
    });
}

function addUniqueSubject(subjects, subject) {
    if (!subjects.some((item) => item.toLowerCase() === subject.toLowerCase())) {
        subjects.push(subject);
    }
}

function saveAdminData() {
    localStorage.setItem("admin_users", JSON.stringify(adminState.users));
    localStorage.setItem("admin_content", JSON.stringify(adminState.content));
    localStorage.setItem("admin_modules", JSON.stringify(adminState.modules));
    localStorage.setItem("admin_activity", JSON.stringify(adminState.activity));
    localStorage.setItem("admin_settings", JSON.stringify(adminState.settings));
    syncLoginUsers();
}

function addActivity(message, type = "info") {
    adminState.activity.unshift({
        id: Date.now(),
        message,
        type,
        at: new Date().toISOString()
    });
    adminState.activity = adminState.activity.slice(0, 80);
    localStorage.setItem("admin_activity", JSON.stringify(adminState.activity));
}

function formatDateTime(value) {
    if (!value) return "Just now";
    return new Date(value).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit"
    });
}

function normalizeText(value) {
    return String(value || "").toLowerCase();
}

function downloadJson(filename, data) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
}

async function loadAdminData() {
    if (!window.EngiLearnAPI || !EngiLearnAPI.token) return;

    try {
        const [usersData, contentData] = await Promise.all([
            EngiLearnAPI.getUsers(),
            EngiLearnAPI.getContent(true)
        ]);

        adminState.users = usersData.users || adminState.users;
        adminState.content = contentData.content || adminState.content;
        await Promise.all(["courses", "exams", "payments", "notifications", "aiTools"].map(async (type) => {
            const data = await EngiLearnAPI.getRecords(type);
            adminState.modules[type] = data.records || adminState.modules[type] || [];
        }));
        saveAdminData();
    } catch (error) {
        console.warn("Using local admin data:", error.message);
    }
}

function syncLoginUsers() {
    const loginUsers = JSON.parse(localStorage.getItem("mini_users") || "[]");

    adminState.users.forEach((adminUser) => {
        const existing = loginUsers.find((user) => user.email === adminUser.email);
        if (existing) {
            existing.name = adminUser.name;
            existing.role = adminUser.role;
            existing.status = adminUser.status;
        } else {
            loginUsers.push({
                id: adminUser.id,
                email: adminUser.email,
                password: adminState.settings.defaultPassword || "",
                name: adminUser.name,
                role: adminUser.role,
                status: adminUser.status,
                joined: new Date().toISOString()
            });
        }
    });

    localStorage.setItem("mini_users", JSON.stringify(loginUsers));

    const currentUser = JSON.parse(localStorage.getItem("mini_currentUser") || "null");
    const updatedCurrent = currentUser && loginUsers.find((user) => user.email === currentUser.email);
    if (updatedCurrent) {
        localStorage.setItem("mini_currentUser", JSON.stringify(updatedCurrent));
    }
}

function renderStats() {
    const activeUsers = adminState.users.filter((user) => user.status !== "Blocked").length;
    const activeRate = adminState.users.length ? Math.round((activeUsers / adminState.users.length) * 100) : 0;
    const paidRevenue = (adminState.modules.payments || [])
        .filter((payment) => payment.status === "Paid")
        .reduce((sum, payment) => sum + Number(payment.amount || 0), 0);
    document.getElementById("adminUserCount").textContent = adminState.users.length;
    document.getElementById("adminStudentCount").textContent = adminState.users.filter((user) => user.role === "Student").length;
    document.getElementById("adminTeacherCount").textContent = adminState.users.filter((user) => user.role === "Teacher").length;
    document.getElementById("adminCourseCount").textContent = (adminState.modules.courses || []).length;
    document.getElementById("adminActiveUsers").textContent = activeUsers;
    document.getElementById("adminRevenue").textContent = `₹${paidRevenue.toLocaleString("en-IN")}`;
    document.getElementById("adminBlockedCount").textContent = adminState.users.filter((user) => user.status === "Blocked").length;
    document.getElementById("adminContentCount").textContent = adminState.content.length;
    document.getElementById("adminVideoCount").textContent = adminState.content.filter((item) => item.type === "Video").length;
    document.getElementById("adminActiveRate").textContent = `${activeRate}%`;
}

function getFilteredUsers() {
    return adminState.users.filter((user) => {
        const haystack = normalizeText(`${user.name} ${user.email} ${user.role} ${user.status} ${user.activity}`);
        const matchesSearch = !adminState.filters.userSearch || haystack.includes(adminState.filters.userSearch);
        const matchesRole = adminState.filters.userRole === "all" || user.role === adminState.filters.userRole;
        const matchesStatus = adminState.filters.userStatus === "all" || user.status === adminState.filters.userStatus;
        return matchesSearch && matchesRole && matchesStatus;
    });
}

function getFilteredContent() {
    return adminState.content.filter((item) => {
        const haystack = normalizeText(`${item.title} ${item.type} ${item.branch} ${item.subject} ${item.topic} ${(item.tags || []).join(" ")} ${item.fileName}`);
        const matchesSearch = !adminState.filters.contentSearch || haystack.includes(adminState.filters.contentSearch);
        const matchesType = adminState.filters.contentType === "all" || item.type === adminState.filters.contentType;
        const matchesBranch = adminState.filters.contentBranch === "all" || item.branch === adminState.filters.contentBranch;
        return matchesSearch && matchesType && matchesBranch;
    });
}

function renderUsers() {
    const tbody = document.getElementById("usersTableBody");
    const users = getFilteredUsers();
    tbody.innerHTML = users.length ? users.map((user) => `
        <tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td><span class="status-pill ${user.status === "Blocked" ? "status-blocked" : "status-active"}">${user.status}</span></td>
            <td>${user.activity || "No activity yet"}</td>
            <td>
                <button class="admin-btn" data-user-edit="${user.id}" type="button"><i class="fas fa-pen"></i> Edit</button>
                <button class="admin-btn ${user.status === "Blocked" ? "success" : "secondary"}" data-user-block="${user.id}" type="button">
                    <i class="fas ${user.status === "Blocked" ? "fa-unlock" : "fa-ban"}"></i> ${user.status === "Blocked" ? "Unblock" : "Block"}
                </button>
                <button class="admin-btn danger" data-user-delete="${user.id}" type="button"><i class="fas fa-trash"></i> Delete</button>
            </td>
        </tr>
    `).join("") : `<tr><td colspan="6"><div class="empty-state">No users match the current filters.</div></td></tr>`;
}

function renderContent() {
    const tbody = document.getElementById("contentTableBody");
    const content = getFilteredContent();
    tbody.innerHTML = content.length ? content.map((item) => `
        <tr>
            <td>${item.title}</td>
            <td>${item.type}</td>
            <td>${item.branch}</td>
            <td>${item.semester || "-"}</td>
            <td>${item.subject}</td>
            <td>${item.topic}</td>
            <td><div class="tag-list">${(item.tags || []).map((tag) => `<span class="tag-pill">${tag}</span>`).join("")}</div></td>
            <td>${item.fileName || "Link only"}</td>
            <td>
                <button class="admin-btn" data-content-edit="${item.id}" type="button"><i class="fas fa-pen"></i> Edit</button>
                <button class="admin-btn danger" data-content-delete="${item.id}" type="button"><i class="fas fa-trash"></i> Delete</button>
            </td>
        </tr>
    `).join("") : `<tr><td colspan="9"><div class="empty-state">No content matches the current filters.</div></td></tr>`;
}

function renderOverview() {
    const latestUser = adminState.users[adminState.users.length - 1];
    const latestContent = adminState.content[adminState.content.length - 1];
    const metrics = [
        ["Latest user", latestUser ? `${latestUser.name} (${latestUser.role})` : "No users yet"],
        ["Latest content", latestContent ? `${latestContent.title} (${latestContent.type})` : "No content yet"],
        ["Branches with content", new Set(adminState.content.map((item) => item.branch)).size],
        ["Activity records", adminState.activity.length]
    ];

    document.getElementById("overviewMetrics").innerHTML = metrics.map(([label, value]) => `
        <div class="metric-item"><span>${label}</span><strong>${value}</strong></div>
    `).join("");
}

function countBy(items, field) {
    return items.reduce((acc, item) => {
        const key = item[field] || "Unknown";
        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, {});
}

function renderBarChart(targetId, counts) {
    const entries = Object.entries(counts);
    const max = Math.max(1, ...entries.map(([, count]) => count));
    document.getElementById(targetId).innerHTML = entries.length ? entries.map(([label, count]) => `
        <div class="bar-row">
            <div class="bar-label"><strong>${label}</strong><span>${count}</span></div>
            <div class="bar-track"><div class="bar-fill" style="width:${Math.max(8, (count / max) * 100)}%"></div></div>
        </div>
    `).join("") : `<div class="empty-state">No data available.</div>`;
}

function renderAnalytics() {
    renderBarChart("roleChart", countBy(adminState.users, "role"));
    renderBarChart("contentChart", {
        ...countBy(adminState.content, "type"),
        Courses: (adminState.modules.courses || []).length,
        Exams: (adminState.modules.exams || []).length,
        Payments: (adminState.modules.payments || []).length,
        "AI Tools": (adminState.modules.aiTools || []).length
    });

    const byBranch = countBy(adminState.content, "branch");
    const topBranches = Object.entries(byBranch)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 12);

    document.getElementById("branchCoverage").innerHTML = topBranches.length ? topBranches.map(([branch, count]) => `
        <article class="coverage-card">
            <strong>${branch}</strong>
            <span>${count} content item${count === 1 ? "" : "s"}</span>
        </article>
    `).join("") : `<div class="empty-state">Add content to see branch coverage.</div>`;
}

function renderActivity() {
    const feed = document.getElementById("activityFeed");
    feed.innerHTML = adminState.activity.length ? adminState.activity.map((item) => `
        <div class="activity-item">
            <div>
                <strong>${item.message}</strong>
                <span>${formatDateTime(item.at)}</span>
            </div>
            <span>${item.type}</span>
        </div>
    `).join("") : `<div class="empty-state">No activity recorded yet.</div>`;
}

function populateContentFilters() {
    const select = document.getElementById("contentBranchFilter");
    const current = select.value || "all";
    const branches = [...new Set(adminState.content.map((item) => item.branch).filter(Boolean))].sort();
    select.innerHTML = `<option value="all">All branches</option>${branches.map((branch) => `<option value="${branch}">${branch}</option>`).join("")}`;
    select.value = branches.includes(current) ? current : "all";
}

function renderSettings() {
    document.getElementById("apiUrlInput").value = localStorage.getItem("engilearn_api_url") || "http://localhost:5000/api";
    document.getElementById("defaultPasswordInput").value = adminState.settings.defaultPassword || "";
}

function getModuleRecords(type) {
    const config = moduleConfigs[type];
    if (config.source === "users") {
        return adminState.users.filter((user) => user.role === config.role);
    }
    if (config.source === "content") {
        return adminState.content.filter((item) => item.type === config.type);
    }
    return adminState.modules[type] || [];
}

function getModuleStorage(type) {
    const config = moduleConfigs[type];
    if (config.source === "users") return adminState.users;
    if (config.source === "content") return adminState.content;
    return adminState.modules[type] || [];
}

function renderModule(type) {
    const config = moduleConfigs[type];
    const mount = document.getElementById(`${type}Module`);
    if (!mount) return;

    const editingId = adminState.moduleEditing[type];
    const editing = editingId ? getModuleStorage(type).find((item) => item.id === editingId) : null;
    const records = getModuleRecords(type);

    mount.innerHTML = `
        <form class="module-form" data-module-form="${type}">
            ${config.fields.map(([name, label, fieldType, options]) => renderModuleField(name, label, fieldType, options, editing)).join("")}
            <div class="admin-actions wide">
                <button class="admin-btn" type="submit"><i class="fas fa-save"></i> ${editing ? "Update" : "Add"} ${type}</button>
                <button class="admin-btn secondary" data-module-reset="${type}" type="button"><i class="fas fa-rotate-left"></i> Reset</button>
            </div>
        </form>
        <div class="admin-toolbar">
            <input type="search" data-module-search="${type}" placeholder="Search ${type}">
            <button class="admin-btn secondary" data-module-export="${type}" type="button"><i class="fas fa-file-export"></i> Export</button>
        </div>
        <div class="module-table" id="${type}Rows">
            ${renderModuleRows(type, records)}
        </div>
    `;
}

function renderModuleField(name, label, fieldType, options, editing) {
    const value = editing ? (editing[name] || "") : "";
    if (fieldType === "select") {
        return `<label>${label}<select name="${name}">${options.map((option) => `<option value="${option}" ${value === option ? "selected" : ""}>${option}</option>`).join("")}</select></label>`;
    }
    if (fieldType === "textarea") {
        return `<label class="wide">${label}<textarea name="${name}" placeholder="${label}">${value}</textarea></label>`;
    }
    return `<label>${label}<input type="${fieldType}" name="${name}" value="${value}" placeholder="${label}" required></label>`;
}

function renderModuleRows(type, records) {
    const config = moduleConfigs[type];
    if (!records.length) {
        return `<div class="empty-state">No ${type} records yet.</div>`;
    }

    return records.map((record) => {
        const title = record[config.titleField] || record.title || record.name || "Untitled";
        const details = config.fields
            .filter(([name]) => name !== config.titleField)
            .slice(0, 5)
            .map(([name, label]) => `${label}: ${record[name] || "-"}`)
            .join(" | ");

        return `
            <article class="module-row">
                <div>
                    <h3>${title}</h3>
                    <p>${details}</p>
                </div>
                <div class="admin-actions">
                    <button class="admin-btn" data-module-edit="${type}" data-record-id="${record.id}" type="button"><i class="fas fa-pen"></i> Edit</button>
                    <button class="admin-btn danger" data-module-delete="${type}" data-record-id="${record.id}" type="button"><i class="fas fa-trash"></i> Delete</button>
                </div>
            </article>
        `;
    }).join("");
}

function renderModules() {
    Object.keys(moduleConfigs).forEach(renderModule);
}

async function saveModuleRecord(type, record) {
    const config = moduleConfigs[type];
    const editingId = adminState.moduleEditing[type];
    let saved = { ...record, id: editingId || Date.now() };

    if (config.source === "users") {
        saved = { ...saved, role: config.role, password: adminState.settings.defaultPassword || "" };
        if (window.EngiLearnAPI && EngiLearnAPI.token) {
            const response = await EngiLearnAPI.saveUser(saved, editingId);
            saved = response.user || saved;
        }
        adminState.users = editingId
            ? adminState.users.map((item) => item.id === editingId ? { ...item, ...saved } : item)
            : [...adminState.users, saved];
    } else if (config.source === "content") {
        saved = { ...saved, type: config.type, tags: [] };
        if (window.EngiLearnAPI && EngiLearnAPI.token) {
            const response = await EngiLearnAPI.saveContent(saved, editingId);
            saved = response.item || saved;
        }
        adminState.content = editingId
            ? adminState.content.map((item) => item.id === editingId ? { ...item, ...saved } : item)
            : [...adminState.content, saved];
    } else {
        if (window.EngiLearnAPI && EngiLearnAPI.token) {
            const response = await EngiLearnAPI.saveRecord(type, saved, editingId);
            saved = response.record || saved;
        }
        adminState.modules[type] = editingId
            ? (adminState.modules[type] || []).map((item) => item.id === editingId ? { ...item, ...saved } : item)
            : [...(adminState.modules[type] || []), saved];
    }

    adminState.moduleEditing[type] = null;
    addActivity(`${editingId ? "Updated" : "Added"} ${type} record`, type);
    saveAdminData();
    renderAll();
}

async function deleteModuleRecord(type, id) {
    const config = moduleConfigs[type];
    if (config.source === "users") {
        if (window.EngiLearnAPI && EngiLearnAPI.token) await EngiLearnAPI.deleteUser(id);
        adminState.users = adminState.users.filter((item) => item.id !== id);
    } else if (config.source === "content") {
        if (window.EngiLearnAPI && EngiLearnAPI.token) await EngiLearnAPI.deleteContent(id);
        adminState.content = adminState.content.filter((item) => item.id !== id);
    } else {
        if (window.EngiLearnAPI && EngiLearnAPI.token) await EngiLearnAPI.deleteRecord(type, id);
        adminState.modules[type] = (adminState.modules[type] || []).filter((item) => item.id !== id);
    }
    addActivity(`Deleted ${type} record`, type);
    saveAdminData();
    renderAll();
}

function initModuleManager() {
    document.addEventListener("submit", async (event) => {
        const form = event.target.closest("[data-module-form]");
        if (!form) return;
        event.preventDefault();
        const type = form.dataset.moduleForm;
        const data = Object.fromEntries(new FormData(form).entries());
        await saveModuleRecord(type, data);
    });

    document.addEventListener("click", async (event) => {
        const edit = event.target.closest("[data-module-edit]");
        const del = event.target.closest("[data-module-delete]");
        const reset = event.target.closest("[data-module-reset]");
        const exp = event.target.closest("[data-module-export]");
        if (edit) {
            adminState.moduleEditing[edit.dataset.moduleEdit] = Number(edit.dataset.recordId);
            renderModule(edit.dataset.moduleEdit);
        }
        if (del) {
            await deleteModuleRecord(del.dataset.moduleDelete, Number(del.dataset.recordId));
        }
        if (reset) {
            adminState.moduleEditing[reset.dataset.moduleReset] = null;
            renderModule(reset.dataset.moduleReset);
        }
        if (exp) {
            downloadJson(`engilearn-${exp.dataset.moduleExport}.json`, getModuleRecords(exp.dataset.moduleExport));
        }
    });

    document.addEventListener("input", (event) => {
        const input = event.target.closest("[data-module-search]");
        if (!input) return;
        const type = input.dataset.moduleSearch;
        const query = normalizeText(input.value);
        const records = getModuleRecords(type).filter((record) => normalizeText(JSON.stringify(record)).includes(query));
        document.getElementById(`${type}Rows`).innerHTML = renderModuleRows(type, records);
    });
}

function resetUserForm() {
    adminState.editingUserId = null;
    document.getElementById("userForm").reset();
    document.getElementById("userSubmitBtn").innerHTML = '<i class="fas fa-user-plus"></i> Add User';
}

function resetContentForm() {
    adminState.editingContentId = null;
    document.getElementById("contentForm").reset();
    populateContentSemesters();
    document.getElementById("contentSubmitBtn").innerHTML = '<i class="fas fa-upload"></i> Add Content';
}

async function handleUserSubmit(event) {
    event.preventDefault();
    const user = {
        id: adminState.editingUserId || Date.now(),
        name: document.getElementById("userName").value.trim(),
        email: document.getElementById("userEmail").value.trim(),
        password: adminState.settings.defaultPassword || "",
        role: document.getElementById("userRole").value,
        status: document.getElementById("userStatus").value,
        activity: document.getElementById("userActivity").value.trim()
    };

    if (window.EngiLearnAPI && EngiLearnAPI.token) {
        try {
            const saved = await EngiLearnAPI.saveUser(user, adminState.editingUserId);
            Object.assign(user, saved.user || {});
        } catch (error) {
            console.warn("User saved locally only:", error.message);
        }
    }

    adminState.users = adminState.editingUserId
        ? adminState.users.map((item) => item.id === adminState.editingUserId ? user : item)
        : [...adminState.users, user];

    saveAdminData();
    addActivity(`${adminState.editingUserId ? "Updated" : "Added"} user ${user.name}`, "user");
    resetUserForm();
    renderAll();
}

async function handleContentSubmit(event) {
    event.preventDefault();
    const file = document.getElementById("contentFile").files[0];
    const item = {
        id: adminState.editingContentId || Date.now(),
        title: document.getElementById("contentTitle").value.trim(),
        type: document.getElementById("contentType").value,
        branch: document.getElementById("contentBranch").value,
        semester: document.getElementById("contentSemester").value,
        subject: document.getElementById("contentSubject").value,
        topic: document.getElementById("contentTopic").value.trim(),
        tags: document.getElementById("contentTags").value.split(",").map((tag) => tag.trim()).filter(Boolean),
        fileName: file ? file.name : document.getElementById("contentFileName").value
    };

    if (window.EngiLearnAPI && EngiLearnAPI.token) {
        try {
            const saved = await EngiLearnAPI.saveContent(item, adminState.editingContentId);
            Object.assign(item, saved.item || {});
        } catch (error) {
            console.warn("Content saved locally only:", error.message);
        }
    }

    adminState.content = adminState.editingContentId
        ? adminState.content.map((content) => content.id === adminState.editingContentId ? item : content)
        : [...adminState.content, item];

    saveAdminData();
    addActivity(`${adminState.editingContentId ? "Updated" : "Added"} ${item.type.toLowerCase()} ${item.title}`, "content");
    resetContentForm();
    renderAll();
}

function fillUserForm(id) {
    const user = adminState.users.find((item) => item.id === id);
    if (!user) return;

    adminState.editingUserId = id;
    document.getElementById("userName").value = user.name;
    document.getElementById("userEmail").value = user.email;
    document.getElementById("userRole").value = user.role;
    document.getElementById("userStatus").value = user.status;
    document.getElementById("userActivity").value = user.activity;
    document.getElementById("userSubmitBtn").innerHTML = '<i class="fas fa-save"></i> Update User';
}

function fillContentForm(id) {
    const item = adminState.content.find((content) => content.id === id);
    if (!item) return;

    adminState.editingContentId = id;
    document.getElementById("contentTitle").value = item.title;
    document.getElementById("contentType").value = item.type;
    setContentBranchValue(item.branch);
    populateContentSemesters();
    setSelectValueOrFirst(document.getElementById("contentSemester"), item.semester);
    populateContentSubjects();
    setSelectValueOrFirst(document.getElementById("contentSubject"), item.subject);
    document.getElementById("contentTopic").value = item.topic;
    document.getElementById("contentTags").value = (item.tags || []).join(", ");
    document.getElementById("contentFileName").value = item.fileName;
    document.getElementById("contentSubmitBtn").innerHTML = '<i class="fas fa-save"></i> Update Content';
}

async function handleAdminClick(event) {
    const userEdit = event.target.closest("[data-user-edit]");
    const userBlock = event.target.closest("[data-user-block]");
    const userDelete = event.target.closest("[data-user-delete]");
    const contentEdit = event.target.closest("[data-content-edit]");
    const contentDelete = event.target.closest("[data-content-delete]");

    if (userEdit) fillUserForm(Number(userEdit.dataset.userEdit));
    if (userBlock) {
        const id = Number(userBlock.dataset.userBlock);
        if (window.EngiLearnAPI && EngiLearnAPI.token) {
            try {
                await EngiLearnAPI.toggleUserStatus(id);
            } catch (error) {
                console.warn("User status changed locally only:", error.message);
            }
        }
        adminState.users = adminState.users.map((user) => user.id === id ? {
            ...user,
            status: user.status === "Blocked" ? "Active" : "Blocked",
            activity: user.status === "Blocked" ? "User unblocked" : "User blocked"
        } : user);
        saveAdminData();
        addActivity("Changed user status", "user");
        renderAll();
    }
    if (userDelete) {
        const id = Number(userDelete.dataset.userDelete);
        if (window.EngiLearnAPI && EngiLearnAPI.token) {
            try {
                await EngiLearnAPI.deleteUser(id);
            } catch (error) {
                console.warn("User deleted locally only:", error.message);
            }
        }
        adminState.users = adminState.users.filter((user) => user.id !== id);
        saveAdminData();
        addActivity("Deleted user", "user");
        renderAll();
    }
    if (contentEdit) fillContentForm(Number(contentEdit.dataset.contentEdit));
    if (contentDelete) {
        const id = Number(contentDelete.dataset.contentDelete);
        if (window.EngiLearnAPI && EngiLearnAPI.token) {
            try {
                await EngiLearnAPI.deleteContent(id);
            } catch (error) {
                console.warn("Content deleted locally only:", error.message);
            }
        }
        adminState.content = adminState.content.filter((item) => item.id !== id);
        saveAdminData();
        addActivity("Deleted content item", "content");
        renderAll();
    }
}

function initTabs() {
    document.querySelectorAll(".admin-tab").forEach((tab) => {
        tab.addEventListener("click", () => {
            activateAdminTab(tab.dataset.adminTab);
        });
    });

    document.querySelectorAll("[data-admin-tab-target]").forEach((button) => {
        button.addEventListener("click", () => activateAdminTab(button.dataset.adminTabTarget));
    });
}

function activateAdminTab(sectionId) {
    document.querySelectorAll(".admin-tab").forEach((item) => {
        item.classList.toggle("active", item.dataset.adminTab === sectionId);
    });
    document.querySelectorAll(".admin-section").forEach((section) => {
        section.classList.toggle("active", section.id === sectionId);
    });
}

function initFilters() {
    document.getElementById("userSearch").addEventListener("input", (event) => {
        adminState.filters.userSearch = normalizeText(event.target.value);
        renderUsers();
    });
    document.getElementById("userRoleFilter").addEventListener("change", (event) => {
        adminState.filters.userRole = event.target.value;
        renderUsers();
    });
    document.getElementById("userStatusFilter").addEventListener("change", (event) => {
        adminState.filters.userStatus = event.target.value;
        renderUsers();
    });
    document.getElementById("contentSearch").addEventListener("input", (event) => {
        adminState.filters.contentSearch = normalizeText(event.target.value);
        renderContent();
    });
    document.getElementById("contentTypeFilter").addEventListener("change", (event) => {
        adminState.filters.contentType = event.target.value;
        renderContent();
    });
    document.getElementById("contentBranchFilter").addEventListener("change", (event) => {
        adminState.filters.contentBranch = event.target.value;
        renderContent();
    });
}

function populateContentBranches() {
    const branchSelect = document.getElementById("contentBranch");
    const syllabusBranch = document.getElementById("syllabusBranch");
    const options = rgpvSyllabus.map((branch) => `<option value="${branch.name}">${branch.name}</option>`).join("");

    branchSelect.innerHTML = options;
    syllabusBranch.innerHTML = options;
    populateContentSemesters();
    populateSyllabusSemesters();
    renderSyllabus();
}

function setContentBranchValue(branchValue) {
    const branchSelect = document.getElementById("contentBranch");
    const normalized = String(branchValue || "").toLowerCase();
    const branch = rgpvSyllabus.find((item) => (
        item.name.toLowerCase() === normalized ||
        item.id.toLowerCase() === normalized ||
        item.name.toLowerCase().includes(normalized)
    ));

    branchSelect.value = branch ? branch.name : rgpvSyllabus[0].name;
}

function setSelectValueOrFirst(select, value) {
    const exists = Array.from(select.options).some((option) => option.value === value);
    select.value = exists ? value : select.value;
}

function getSelectedBranch(selectId = "contentBranch") {
    const selectedName = document.getElementById(selectId).value;
    return rgpvSyllabus.find((branch) => branch.name === selectedName) || rgpvSyllabus[0];
}

function populateContentSemesters() {
    const branch = getSelectedBranch();
    const semesterSelect = document.getElementById("contentSemester");

    semesterSelect.innerHTML = Object.keys(branch.semesters).map((semester) => (
        `<option value="${semester}">Sem ${semester}</option>`
    )).join("");
    populateContentSubjects();
}

function populateContentSubjects() {
    const branch = getSelectedBranch();
    const semester = document.getElementById("contentSemester").value;
    const subjectSelect = document.getElementById("contentSubject");

    subjectSelect.innerHTML = (branch.semesters[semester] || []).map((subject) => (
        `<option value="${subject}">${subject}</option>`
    )).join("");
}

function renderSyllabus() {
    const branch = getSelectedBranch("syllabusBranch");
    const grid = document.getElementById("syllabusGrid");

    grid.innerHTML = Object.entries(branch.semesters).map(([semester, subjects]) => `
        <article class="syllabus-card">
            <h3>Sem ${semester}</h3>
            <div class="subject-list">
                ${subjects.map((subject) => `<div class="subject-item"><i class="fas fa-check-circle"></i>${subject}</div>`).join("")}
            </div>
        </article>
    `).join("");
}

function populateSyllabusSemesters() {
    const branch = getSelectedBranch("syllabusBranch");
    const semesterSelect = document.getElementById("syllabusSemester");

    semesterSelect.innerHTML = Object.keys(branch.semesters).map((semester) => (
        `<option value="${semester}">Sem ${semester}</option>`
    )).join("");
}

function addMissingSyllabusSubject() {
    const branch = getSelectedBranch("syllabusBranch");
    const semester = document.getElementById("syllabusSemester").value;
    const input = document.getElementById("syllabusSubjectInput");
    const subject = input.value.trim();

    if (!subject) return;

    branch.semesters[semester] = branch.semesters[semester] || [];
    addUniqueSubject(branch.semesters[semester], subject);
    customSyllabus[branch.name] = customSyllabus[branch.name] || {};
    customSyllabus[branch.name][semester] = customSyllabus[branch.name][semester] || [];
    addUniqueSubject(customSyllabus[branch.name][semester], subject);
    localStorage.setItem("admin_custom_syllabus", JSON.stringify(customSyllabus));
    input.value = "";
    renderSyllabus();

    if (document.getElementById("contentBranch").value === branch.name) {
        populateContentSemesters();
    }
}

function initSyllabusControls() {
    applyCustomSyllabus();
    populateContentBranches();
    document.getElementById("contentBranch").addEventListener("change", populateContentSemesters);
    document.getElementById("contentSemester").addEventListener("change", populateContentSubjects);
    document.getElementById("syllabusBranch").addEventListener("change", () => {
        populateSyllabusSemesters();
        renderSyllabus();
    });
    document.getElementById("addSyllabusSubjectBtn").addEventListener("click", addMissingSyllabusSubject);
}

function getBackupPayload() {
    return {
        exportedAt: new Date().toISOString(),
        users: adminState.users,
        content: adminState.content,
        modules: adminState.modules,
        customSyllabus,
        activity: adminState.activity,
        settings: adminState.settings
    };
}

function initDashboardActions() {
    if (window.EngiLearnThemeEngine) {
        window.EngiLearnThemeEngine.setMode(window.EngiLearnThemeEngine.currentMode());
        window.EngiLearnThemeEngine.bindModeToggles();
    } else {
        const savedTheme = localStorage.getItem("engilearn_color_mode") || localStorage.getItem("theme") || "light";
        document.body.dataset.theme = savedTheme;
        document.getElementById("themeModeBtn")?.addEventListener("click", () => {
            document.body.dataset.theme = document.body.dataset.theme === "dark" ? "light" : "dark";
            localStorage.setItem("engilearn_color_mode", document.body.dataset.theme);
            localStorage.setItem("theme", document.body.dataset.theme);
            localStorage.setItem("lms_theme", document.body.dataset.theme);
        });
    }

    document.getElementById("refreshDataBtn").addEventListener("click", async () => {
        await loadAdminData();
        addActivity("Synced dashboard data", "system");
        renderAll();
    });

    document.getElementById("exportUsersBtn").addEventListener("click", () => {
        downloadJson("engilearn-users.json", getFilteredUsers());
        addActivity("Exported users", "backup");
        renderAll();
    });

    document.getElementById("exportContentBtn").addEventListener("click", () => {
        downloadJson("engilearn-content.json", getFilteredContent());
        addActivity("Exported content", "backup");
        renderAll();
    });

    document.getElementById("exportAllBtn").addEventListener("click", () => {
        downloadJson("engilearn-dashboard-backup.json", getBackupPayload());
        addActivity("Downloaded full backup", "backup");
        renderAll();
    });

    document.getElementById("importBackupBtn").addEventListener("click", async () => {
        const file = document.getElementById("importBackupInput").files[0];
        if (!file) return;

        try {
            const backup = JSON.parse(await file.text());
            adminState.users = Array.isArray(backup.users) ? backup.users : adminState.users;
            adminState.content = Array.isArray(backup.content) ? backup.content : adminState.content;
            adminState.modules = backup.modules || adminState.modules;
            adminState.activity = Array.isArray(backup.activity) ? backup.activity : adminState.activity;
            adminState.settings = backup.settings || adminState.settings;
            customSyllabus = backup.customSyllabus || customSyllabus;
            localStorage.setItem("admin_custom_syllabus", JSON.stringify(customSyllabus));
            addActivity("Imported dashboard backup", "backup");
            saveAdminData();
            renderAll();
        } catch (error) {
            alert("Backup file is not valid JSON.");
        }
    });

    document.getElementById("clearActivityBtn").addEventListener("click", () => {
        adminState.activity = [];
        saveAdminData();
        renderAll();
    });

    document.getElementById("settingsForm").addEventListener("submit", (event) => {
        event.preventDefault();
        const apiUrl = document.getElementById("apiUrlInput").value.trim();
        adminState.settings.defaultPassword = document.getElementById("defaultPasswordInput").value.trim();
        localStorage.setItem("engilearn_api_url", apiUrl);
        if (window.EngiLearnAPI) {
            EngiLearnAPI.baseURL = apiUrl;
        }
        addActivity("Updated dashboard settings", "settings");
        saveAdminData();
        renderAll();
    });

    document.getElementById("clearLocalBtn").addEventListener("click", clearLocalDashboardData);
}

function clearLocalDashboardData() {
    const confirmed = confirm("Clear local dashboard users, content, activity, and settings from this browser?");
    if (!confirmed) return;

    ["admin_users", "admin_content", "admin_modules", "admin_activity", "admin_settings", "admin_custom_syllabus"].forEach((key) => {
        localStorage.removeItem(key);
    });
    location.reload();
}

function renderAll() {
    renderStats();
    populateContentFilters();
    renderOverview();
    renderUsers();
    renderContent();
    renderAnalytics();
    renderActivity();
    renderSettings();
    renderModules();
}

document.addEventListener("DOMContentLoaded", async () => {
    if (!guardAdminAccess()) return;

    await loadAdminData();
    initTabs();
    initSyllabusControls();
    initFilters();
    initDashboardActions();
    initModuleManager();
    document.getElementById("userForm").addEventListener("submit", handleUserSubmit);
    document.getElementById("contentForm").addEventListener("submit", handleContentSubmit);
    document.getElementById("resetUserBtn").addEventListener("click", resetUserForm);
    document.getElementById("resetContentBtn").addEventListener("click", resetContentForm);
    document.addEventListener("click", handleAdminClick);
    renderAll();
});
