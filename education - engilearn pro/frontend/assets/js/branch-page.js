const branchDirectory = [
    ["cse", "#1 CSE", "Computer Science & Engineering", "fas fa-laptop-code", ["M1", "M2", "Physics", "Chemistry", "BCP", "DSA", "OOP", "DBMS", "OS", "CN", "Compiler", "Software Engg", "Web Tech", "AI"]],
    ["it", "#2 IT", "Information Technology", "fas fa-server", ["Web Tech", "DBMS", "Java", "Cloud", "Mobile App", "Software Engg", "Cyber Security", "Big Data"]],
    ["ece", "#3 ECE", "Electronics & Communication", "fas fa-broadcast-tower", ["EDC", "Digital", "Microprocessor", "DSP", "VLSI", "Signals", "Antenna", "Optical", "Embedded"]],
    ["mech", "#4 ME", "Mechanical Engineering", "fas fa-cogs", ["SOM", "TOM", "Fluid Mechanics", "Thermodynamics", "Heat Transfer", "Machine Design", "RAC", "Industrial Engg", "Automobile"]],
    ["civil", "#5 CIVIL", "Civil Engineering", "fas fa-hard-hat", ["SOM", "Surveying", "Fluid Mechanics", "RCC", "Geotech", "Steel Structure", "Transportation", "Irrigation", "Estimation"]],
    ["eee", "#6 EEE", "Electrical & Electronics", "fas fa-plug", ["Network", "EMFT", "EDC", "Machines", "Power System", "Control System", "Switchgear", "Microprocessor", "Renewable"]],
    ["ai", "#7 AI/ML", "AI & Machine Learning", "fas fa-brain", ["Python", "DSA", "DBMS", "ML", "DL", "NLP", "Computer Vision", "Reinforcement Learning"]],
    ["ds", "#8 DS", "Data Science", "fas fa-chart-line", ["Statistics", "Python", "SQL", "Big Data", "ML", "Data Mining", "Business Analytics", "Visualization"]],
    ["cyber", "#9 CYBER", "Cyber Security", "fas fa-shield-alt", ["Network", "Cryptography", "OS", "Ethical Hacking", "Forensics", "Blockchain", "Cloud Security"]],
    ["chemical", "#10 CHEM", "Chemical Engineering", "fas fa-flask", ["Fluid Mechanics", "Heat Transfer", "Mass Transfer", "Process Control", "Chemical Reaction Engg", "Plant Design"]],
    ["auto", "#11 AUTO", "Automobile Engineering", "fas fa-car", ["IC Engines", "Automotive Design", "Chassis", "Vehicle Dynamics", "Auto Electricals"]],
    ["production", "#12 PROD", "Production Engineering", "fas fa-industry", ["Manufacturing", "CAD/CAM", "Industrial Engg", "Quality Control", "Operations Research"]],
    ["aero", "#13 AERO", "Aeronautical Engineering", "fas fa-plane", ["Aerodynamics", "Flight Mechanics", "Aircraft Structures", "Propulsion", "Avionics"]],
    ["bme", "#14 BME", "Biomedical Engineering", "fas fa-heartbeat", ["Bio Signals", "Medical Imaging", "Biomechanics", "Biomaterials", "Instrumentation"]],
    ["iot", "#15 IOT", "IoT & Embedded Systems", "fas fa-network-wired", ["Embedded C", "Sensors", "IoT Protocols", "Microcontrollers", "Cloud IoT"]],
    ["mechatronics", "#16 MECH", "Mechatronics", "fas fa-robot", ["PLC", "Robotics", "Automation", "Control Systems", "Sensors"]],
    ["power", "#17 POWER", "Power Electronics", "fas fa-bolt", ["Converters", "Inverters", "Drives", "Power Devices", "Renewable Energy"]],
    ["instrumentation", "#18 INST", "Instrumentation", "fas fa-tachometer-alt", ["Transducers", "Process Control", "PLC", "Measurements", "Industrial Instrumentation"]],
    ["env", "#19 ENV", "Environmental Engineering", "fas fa-leaf", ["Wastewater", "Air Pollution", "Solid Waste", "Water Treatment", "Environmental Chemistry"]],
    ["arch", "#20 ARCH", "Architecture", "fas fa-drafting-compass", ["Design", "Building Construction", "Structures", "Planning", "Materials"]],
    ["metallurgy", "#21 METAL", "Metallurgical Engineering", "fas fa-fire", ["Physical Metallurgy", "Extractive Metallurgy", "Heat Treatment", "Materials Testing"]],
    ["mining", "#22 MINING", "Mining Engineering", "fas fa-mountain", ["Mine Survey", "Ventilation", "Rock Mechanics", "Mining Methods", "Safety"]],
    ["textile", "#23 TEXTILE", "Textile Technology", "fas fa-tshirt", ["Yarn Manufacturing", "Fabric Manufacturing", "Textile Testing", "Dyeing", "Processing"]],
    ["petroleum", "#24 PETRO", "Petroleum Engineering", "fas fa-oil-can", ["Reservoir Engg", "Drilling", "Production", "Petroleum Geology", "Well Testing"]],
    ["food", "#25 FOOD", "Food Technology", "fas fa-utensils", ["Food Processing", "Quality Control", "Preservation", "Food Chemistry", "Packaging"]],
    ["robotics", "#26 ROBOT", "Robotics Engineering", "fas fa-robot", ["Kinematics", "Dynamics", "Control Systems", "Machine Vision", "Automation"]],
    ["nano", "#27 NANO", "Nanotechnology", "fas fa-microscope", ["Nano Materials", "Synthesis", "Applications", "Characterization", "Nano Electronics"]],
    ["marine", "#28 MARINE", "Marine Engineering", "fas fa-ship", ["Naval Architecture", "Marine Engines", "Ship Design", "Marine Boilers", "Safety"]]
];

const firstYearSubjects = {
    "1": ["BT-101 - Engineering Chemistry", "BT-102 - Mathematics-I", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics"],
    "2": ["BT-201 - Engineering Physics", "BT-202 - Mathematics-II", "BT-203 - Basic Mechanical Engineering", "BT-204 - Basic Civil Engineering & Mechanics", "BT-205 - Basic Computer Engineering"]
};

const branchSemesterSubjects = {
    cse: {
        "3": ["ES-301 - Energy & Environmental Engineering", "CS-302 - Discrete Structure", "CS-303 - Data Structure", "CS-304 - Digital Systems", "CS-305 - Object Oriented Programming & Methodology"],
        "4": ["BT-401 - Mathematics III", "CS-402 - Analysis & Design of Algorithms (ADA)", "CS-403 - Software Engineering", "CS-404 - Computer Organization & Architecture (COA)", "CS-405 - Operating Systems (OS)"],
        "5": ["CS-501 - Theory of Computation (TOC)", "CS-502 - Database Management Systems (DBMS)", "CS-503(A) - Data Analytics", "CS-503(B) - Pattern Recognition", "CS-503(C) - Cyber Security", "CS-504(A) - Internet and Web Technology", "CS-504(B) - Object Oriented Programming", "CS-504(C) - Introduction to Database Management Systems"],
        "6": ["CS-601 - Machine Learning", "CS-602 - Computer Networks", "CS-603(A) - Advanced Computer Architecture", "CS-603(B) - Computer Graphics & Visualization", "CS-603(C) - Compiler Design", "CS-604(A) - Knowledge Management", "CS-604(B) - Project Management", "CS-604(C) - Rural Technology & Community Development"],
        "7": ["CS-701 - Software Architectures", "CS-702(A) - Computational Intelligence", "CS-702(B) - Deep & Reinforcement Learning", "CS-702(C) - Wireless & Mobile Computing", "CS-702(D) - Big Data", "CS-703(A) - Cryptography & Information Security", "CS-703(B) - Data Mining & Warehousing", "CS-703(C) - Agile Software Development", "CS-703(D) - Disaster Management"],
        "8": ["CS-801 - Internet of Things (IoT)", "CS-802(A) - Blockchain Technologies", "CS-802(B) - Cloud Computing", "CS-802(C) - High Performance Computing", "CS-802(D) - Object Oriented Software Engineering", "CS-803(A) - Image Processing and Computer Vision", "CS-803(B) - Game Theory with Engineering Applications", "CS-803(C) - Internet of Things", "CS-803(D) - Managing Innovation and Entrepreneurship"]
    },
    it: {
        "1": ["BT-101 - Engineering Chemistry", "BT-102 - Mathematics-I", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics"],
        "2": ["BT-201 - Engineering Physics", "BT-202 - Mathematics-II", "BT-203 - Basic Mechanical Engineering", "BT-204 - Basic Civil Engineering & Mechanics", "BT-205 - Basic Computer Engineering"],
        "3": ["ES-301 - Energy & Environmental Engineering", "IT-302 - Discrete Structure", "IT-303 - Data Structure", "IT-304 - Object Oriented Programming & Methodology", "IT-305 - Digital Circuits & System"],
        "4": ["BT-401 - Mathematics-III", "IT-402 - Analysis & Design of Algorithm", "IT-403 - Software Engineering", "IT-404 - Computer Organization & Architecture", "IT-405 - Operating Systems"],
        "5": ["IT-501 - Operating System", "IT-502 - Computer Network", "IT-503(A) - Theory of Computation (Departmental Elective)", "IT-503(B) - Microprocessor & Interfacing (Departmental Elective)", "IT-503(C) - Principles of Programming Languages (Departmental Elective)", "IT-504(A) - Artificial Intelligence (Open Elective)", "IT-504(B) - E-Commerce & Governance (Open Elective)", "IT-504(C) - Java Programming (Open Elective)"],
        "6": ["IT-601 - Computer Graphics & Multimedia", "IT-602 - Wireless & Mobile Computing", "IT-603(A) - Compiler Design", "IT-603(B) - Data Mining", "IT-603(C) - Embedded Systems", "IT-604(A) - Intellectual Property Rights (IPR)", "IT-604(B) - Software Engineering", "IT-604(C) - Wireless Sensor Networks"],
        "7": ["IT-701 - Soft Computing", "IT-702(A) - Cloud Computing", "IT-702(B) - Information Security", "IT-702(C) - Big Data Analytics", "IT-703(A) - Internet of Things (IoT)", "IT-703(B) - Blockchain Technology", "IT-703(C) - Cyber Security"],
        "8": ["IT-801 - Major Project - Phase II", "IT-802 - Comprehensive Viva-Voce", "IT-803 - Seminar", "IT-804 - Industrial Training / Internship"]
    },
    ece: {
        "1": ["BT-101 - Engineering Chemistry", "BT-102 - Mathematics-I", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics"],
        "2": ["BT-201 - Engineering Physics", "BT-202 - Mathematics-II", "BT-203 - Basic Mechanical Engineering", "BT-204 - Basic Civil Engineering & Mechanics", "BT-205 - Basic Computer Engineering"],
        "3": ["BT-301 - Mathematics-III", "EC-302 - Electronic Measurement & Instrumentation", "EC-303 - Digital System Design", "EC-304 - Electronic Devices", "EC-305 - Network Analysis"],
        "4": ["ES-401 - Energy & Environmental Engineering", "EC-402 - Signals & Systems", "EC-403 - Analog Communication", "EC-404 - Control System", "EC-405 - Analog Circuits"],
        "5": ["EC-501 - Microprocessor & Its Applications", "EC-502 - Digital Communication", "EC-503-(A/B/C) - Any one Departmental Elective", "EC-504-(A/B/C) - Any one Open Elective"],
        "6": ["EC-601 - Digital Signal Processing", "EC-602 - Computer Architecture & Organization", "EC-603-(A/B/C) - Any one Departmental Elective", "EC-604-(A/B/C) - Any one Open Elective"],
        "7": ["EC-701 - VLSI Design", "EC-702-(A/B/C) - Choose one Departmental Elective", "EC-703-(A/B/C) - Choose one Open Elective"],
        "8": ["EC-801 - Optical Fibre Communication", "EC-802-(A/B/C) - Choose one Departmental Elective", "EC-803-(A/B/C) - Choose one Open Elective"]
    },
    mech: {
        "1": ["BT-101 - Engineering Chemistry", "BT-102 - Mathematics-I", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics"],
        "2": ["BT-201 - Engineering Physics", "BT-202 - Mathematics-II", "BT-203 - Basic Mechanical Engineering", "BT-204 - Basic Civil Engineering & Mechanics", "BT-205 - Basic Computer Engineering"],
        "3": ["ME-301 - Thermodynamics", "ME-302 - Material Science", "ME-303 - Strength of Materials", "ME-304 - Manufacturing Process", "ME-305 - Fluid Mechanics", "ME-306 - Energy & Environmental Engineering"],
        "4": ["ME-401 - Theory of Machines", "ME-402 - Applied Thermodynamics", "ME-403 - Machine Drawing", "ME-404 - Manufacturing Technology", "ME-405 - Hydraulic Machines", "ME-406 - Numerical Methods & Computer Programming"],
        "5": ["ME-501 - Design of Machine Elements", "ME-502 - Heat & Mass Transfer", "ME-503 - Dynamics of Machines", "ME-504 - Industrial Engineering & Management", "ME-505(A) - Refrigeration & Air Conditioning", "ME-505(B) - Automobile Engineering", "ME-505(C) - Mechatronics"],
        "6": ["ME-601 - Machine Design", "ME-602 - Finite Element Methods", "ME-603 - Internal Combustion Engines", "ME-604 - Turbo Machines", "ME-605(A) - Operations Research", "ME-605(B) - Computer Integrated Manufacturing (CIM)", "ME-605(C) - Renewable Energy Sources"],
        "7": ["ME-701 - Mechanical Vibrations", "ME-702 - CAD/CAM", "ME-703(A) - Advanced Manufacturing Technology", "ME-703(B) - Robotics", "ME-703(C) - Non-Conventional Manufacturing Process", "ME-704(A) - Power Plant Engineering", "ME-704(B) - Automobile Engineering-II", "ME-704(C) - Industrial Automation"],
        "8": ["ME-801(A) - Computational Fluid Dynamics", "ME-801(B) - Advanced IC Engines", "ME-801(C) - Product Design & Development", "ME-802(A) - Total Quality Management", "ME-802(B) - Supply Chain Management", "ME-802(C) - Industrial Safety Engineering"]
    },
    civil: {
        "1": ["BT-101 - Engineering Chemistry", "BT-102 - Mathematics-I", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics"],
        "2": ["BT-201 - Engineering Physics", "BT-202 - Mathematics-II", "BT-203 - Basic Mechanical Engineering", "BT-204 - Basic Civil Engineering & Mechanics", "BT-205 - Basic Computer Engineering"],
        "3": ["CE-301 - Strength of Materials", "CE-302 - Building Materials", "CE-303 - Surveying", "CE-304 - Fluid Mechanics", "CE-305 - Engineering Geology", "CE-306 - Mathematics-III"],
        "4": ["CE-401 - Structural Analysis", "CE-402 - Geotechnical Engineering-I", "CE-403 - Hydraulics", "CE-404 - Concrete Technology", "CE-405(A) - Building Planning & Architecture", "CE-405(B) - Engineering Geology", "CE-405(C) - Disaster Management"],
        "5": ["CE-501 - Design of Reinforced Concrete Structures", "CE-502 - Design of Steel Structures", "CE-503 - Water Resources Engineering", "CE-504 - Transportation Engineering-I", "CE-505(A) - Environmental Engineering-I", "CE-505(B) - Advanced Surveying", "CE-505(C) - Construction Technology & Management"],
        "6": ["CE-601 - Design of Prestressed Concrete Structures", "CE-602 - Environmental Engineering-II", "CE-603 - Transportation Engineering-II", "CE-604 - Estimation, Costing & Valuation", "CE-605(A) - Advanced Structural Analysis", "CE-605(B) - Ground Water Engineering", "CE-605(C) - Bridge Engineering"],
        "7": ["CE-701 - Foundation Engineering", "CE-702 - Construction Planning & Management", "CE-703(A) - Earthquake Resistant Design", "CE-703(B) - Advanced Highway Engineering", "CE-703(C) - Remote Sensing & GIS", "CE-704(A) - Finite Element Method", "CE-704(B) - Pavement Design", "CE-704(C) - Solid & Hazardous Waste Management"],
        "8": ["CE-801(A) - Advanced Reinforced Concrete Design", "CE-801(B) - Advanced Foundation Engineering", "CE-801(C) - Traffic Engineering & Management", "CE-802(A) - Repair & Rehabilitation of Structures", "CE-802(B) - Irrigation Engineering", "CE-802(C) - Environmental Impact Assessment"]
    },
    eee: {
        "1": ["BT-101 - Engineering Chemistry", "BT-102 - Mathematics-I", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics"],
        "2": ["BT-201 - Engineering Physics", "BT-202 - Mathematics-II", "BT-203 - Basic Mechanical Engineering", "BT-204 - Basic Civil Engineering & Mechanics", "BT-205 - Basic Computer Engineering"],
        "3": ["EE-301 - Electrical Measurements & Measuring Instruments", "EE-302 - Network Analysis", "EE-303 - Analog Electronics", "EE-304 - Electrical Machines-I", "EE-305 - Engineering Mathematics-III"],
        "4": ["EE-401 - Power System-I", "EE-402 - Control Systems", "EE-403 - Digital Electronics", "EE-404 - Electrical Machines-II", "EE-405 - Engineering Mathematics-IV"],
        "5": ["EE-501 - Power Electronics", "EE-502 - Power System-II", "EE-503 - Microprocessors & Microcontrollers", "EE-504 - Electrical Machine Design", "EE-505(A) - High Voltage Engineering", "EE-505(B) - Utilization of Electrical Energy", "EE-505(C) - Electrical & Hybrid Vehicles"],
        "6": ["EE-601 - Power System Analysis", "EE-602 - Power System Protection", "EE-603 - Digital Signal Processing", "EE-604 - Switchgear & Protection", "EE-605(A) - Flexible AC Transmission Systems (FACTS)", "EE-605(B) - Renewable Energy Sources", "EE-605(C) - Industrial Drives & Control"],
        "7": ["EE-701 - Power System Operation & Control", "EE-702 - Electrical Drives", "EE-703(A) - HVDC Transmission", "EE-703(B) - Energy Management & Auditing", "EE-703(C) - Smart Grid Technology", "EE-704 - Departmental Elective / Open Elective (as per RGPV scheme)"],
        "8": ["EE-801(A) - Power Quality", "EE-801(B) - Embedded Systems", "EE-801(C) - Electric & Hybrid Vehicles", "EE-802(A) - Distribution System Engineering", "EE-802(B) - Artificial Intelligence Applications in Electrical Engineering", "EE-802(C) - Energy Conservation & Management"]
    },
    ds: {
        "1": ["BT-101 - Engineering Chemistry", "BT-102 - Mathematics-I", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics"],
        "2": ["BT-201 - Engineering Physics", "BT-202 - Mathematics-II", "BT-203 - Basic Mechanical Engineering", "BT-204 - Basic Civil Engineering & Mechanics", "BT-205 - Basic Computer Engineering"],
        "3": ["BT-301 - Mathematics-III", "DS-302 - Data Structures", "DS-303 - Digital Systems", "DS-304 - Discrete Mathematics", "DS-305 - Object Oriented Programming & Methodology"],
        "4": ["BT-401 - Mathematics-IV", "DS-402 - Design & Analysis of Algorithms", "DS-403 - Computer Organization & Architecture", "DS-404 - Database Management Systems", "DS-405 - Theory of Computation"],
        "5": ["CD-501 - Computational Mathematics", "CD-502 - Compiler Design", "CD-503 - Cloud Computing", "CD-504 - Artificial Intelligence", "CD-505-(A/B/C) - Departmental Elective (any one):", "CD-505(A) - Web Engineering", "CD-505(B) - Machine Learning", "CD-505(C) - Computational Intelligence"],
        "6": ["CD-601 - Deep Learning", "CD-602 - Computer Networks", "CD-603-(A/B/C) - Departmental Elective (any one):", "CD-603(A) - Big Data Analytics", "CD-603(B) - Data Acquisition", "CD-603(C) - Advanced Database Management System", "CD-604-(A/B/C) - Open Elective (any one):", "CD-604(A) - Information Extraction and Retrieval", "CD-604(B) - Agile Software Development", "CD-604(C) - Natural Language Processing"],
        "7": ["CD-701 - Data Engineering", "CD-702-(A/B/C/D) - Departmental Elective (any one):", "CD-702(A) - Data Analytics & Visualization", "CD-702(B) - Internet of Things (IoT)", "CD-702(C) - Cloud Computing", "CD-702(D) - Blockchain Technology", "CD-703-(A/B/C/D) - Open Elective (any one):", "CD-703(A) - Cryptography & Information Security", "CD-703(B) - Data Mining & Warehousing", "CD-703(C) - Agile Software Development", "CD-703(D) - Disaster Management", "CD-704-(A/B/C/D) - Departmental Elective (any one):", "CD-704(A) - Advanced Statistics for Data Science", "CD-704(B) - Explainable AI", "CD-704(C) - Bioinformatics", "CD-704(D) - Business Intelligence & Analytics"],
        "8": ["CD-801 - Major Project / Internship Evaluation (no written theory paper)", "CD-802-(A/B/C/D) - Departmental Elective (any one):", "CD-802(A) - Reinforcement Learning", "CD-802(B) - Project Management", "CD-802(C) - Computational Statistics", "CD-802(D) - Machine Learning for Data Science", "CD-803-(A/B/C/D) - Open Elective (any one):", "CD-803(A) - Blockchain Technologies", "CD-803(B) - Time-Series Analysis", "CD-803(C) - Quantum Computing", "CD-803(D) - Human-Computer Interaction"]
    },
    cyber: {
        "1": ["BT-101 - Engineering Chemistry", "BT-102 - Mathematics-I", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics"],
        "2": ["BT-201 - Engineering Physics", "BT-202 - Mathematics-II", "BT-203 - Basic Mechanical Engineering", "BT-204 - Basic Civil Engineering & Mechanics", "BT-205 - Basic Computer Engineering"],
        "3": ["CY-301 - Technical Communication", "CY-302 - Discrete Structures", "CY-303 - Data Structures", "CY-304 - Digital Systems", "CY-305 - Object Oriented Programming & Methodology"],
        "4": ["CY-401 - Mathematics-III", "CY-402 - Analysis & Design of Algorithms", "CY-403 - Computer Organization & Architecture", "CY-404 - Operating Systems", "CY-405 - Database Management Systems (DBMS)"],
        "5": ["CY-501 - OS Internals for Security Support", "CY-502 - Design and Analysis of Algorithms", "CY-503 - Network Security", "CY-504(A) - Cyber Law and Intellectual Property Rights", "CY-504(B) - Internet of Things", "CY-504(C) - Computer Organization and Architecture"],
        "6": ["CY-601 - Cryptography and Network Security", "CY-602 - Computer Networks", "CY-603 - Departmental Elective", "CY-603(A) - Machine Learning", "CY-603(B) - Advanced Computer Architecture", "CY-603(C) - Compiler Design", "CY-604 - Open Elective", "CY-604(A) - Knowledge Management", "CY-604(B) - Project Management", "CY-604(C) - Rural Technology & Community Development"],
        "7": ["CY-701 - Information Security Risk Management", "CY-702 - Digital Forensics", "CY-703 - (Departmental Elective", "CY-703(A) - Ethical Hacking", "CY-703(B) - Cyber Security Policies & Standards", "CY-703(C) - Data Engineering", "CY-703(D) - Cloud Computing"],
        "8": ["CD-801 - Major Project / Internship Evaluation (no written theory paper)", "CD-802-(A/B/C/D) - Departmental Elective (any one):", "CD-802(A) - Reinforcement Learning", "CD-802(B) - Project Management", "CD-802(C) - Computational Statistics", "CD-802(D) - Machine Learning for Data Science", "CD-803-(A/B/C/D) - Open Elective (any one):", "CD-803(A) - Blockchain Technologies", "CD-803(B) - Time-Series Analysis", "CD-803(C) - Quantum Computing", "CD-803(D) - Human-Computer Interaction"]
    },
    chemical: {
        "1": ["BT-101 - Engineering Chemistry", "BT-102 - Mathematics-I", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics"],
        "2": ["BT-201 - Engineering Physics", "BT-202 - Mathematics-II", "BT-203 - Basic Mechanical Engineering", "BT-204 - Basic Civil Engineering & Mechanics", "BT-205 - Basic Computer Engineering"],
        "3": ["BT-301 - Mathematics-III", "CM-302 - Chemical Engineering Thermodynamics", "CM-303 - Advance Engineering Chemistry", "CM-304 - Material & Energy Balance", "CM-305 - Chemical Instrumentation"],
        "4": ["BT-401 - Mathematics-III", "CM-402 - Fluid Mechanics", "CM-403 - Heat Transfer", "CM-404 - Mechanical Operations", "CM-405 - Chemical Engineering Process Calculations / Chemical Process Calculations*"],
        "5": ["CM-501 - Mass Transfer-I", "CM-502 - Chemical Reaction Engineering-I", "CM-503(A) - Computation Methods in Chemical Engineering", "CM-503(B) - Pulp & Paper Technology", "CM-503(C) - Pharmaceutical Technology", "CM-504(A) - Organic Process Technology", "CM-504(B) - Fuel Cell Technology", "CM-504(C) - Energy Management"],
        "6": ["CM-601 - Mass Transfer-II", "CM-602 - Chemical Reaction Engineering-II", "CM-603 - Process Dynamics & Control", "CM-604(A) - Polymer Technology", "CM-604(B) - Petrochemical Technology", "CM-604(C) - Fertilizer Technology", "CM-605(A) - Environmental Engineering", "CM-605(B) - Food Technology", "CM-605(C) - Safety & Hazard Management"],
        "7": ["CM-701 - Process Equipment Design", "CM-702 - Chemical Process Industries", "CM-703(A) - Transport Phenomena", "CM-703(B) - Biochemical Engineering", "CM-703(C) - Corrosion Engineering", "CM-704(A) - Membrane Technology", "CM-704(B) - Nanotechnology", "CM-704(C) - Industrial Pollution Control"],
        "8": ["CM-801(A) - Petroleum Refinery Engineering", "CM-801(B) - Process Plant Utilities", "CM-801(C) - Advanced Separation Processes", "CM-802(A) - Process Economics & Plant Design", "CM-802(B) - Energy Conservation in Process Industries", "CM-802(C) - Industrial Waste Management"]
    },
    auto: {
        "1": ["BT-101 - Engineering Mathematics-I", "BT-102 - Engineering Chemistry", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics"],
        "2": ["BT-201 - Engineering Mathematics-II", "BT-202 - Engineering Physics", "BT-203 - Basic Mechanical Engineering", "BT-204 - Basic Civil Engineering & Mechanics", "BT-205 - Basic Computer Engineering"],
        "3": ["BT-301 - Mathematics-III", "AU-302 - Engineering Thermodynamics", "AU-303 - Strength of Materials", "AU-304 - Manufacturing Technology", "AU-305 - Automobile Engineering Materials"],
        "4": ["BT-401 - Mathematics-IV", "AU-402 - Fluid Mechanics & Hydraulic Machines", "AU-403 - Theory of Machines", "AU-404 - Applied Thermodynamics", "AU-405 - Machine Drawing & Design"],
        "5": ["AU-501 - Internal Combustion Engines", "AU-502 - Automobile Transmission", "AU-503(A) - Vehicle Body Engineering", "AU-503(B) - Tractor & Farm Machinery", "AU-503(C) - Vehicle Maintenance", "AU-504(A) - Automotive Electrical & Electronics", "AU-504(B) - Two & Three Wheeler Technology", "AU-504(C) - Automobile Air Conditioning"],
        "6": ["AU-601 - Vehicle Dynamics", "AU-602 - Automobile Chassis Design", "AU-603 - Automobile Pollution & Control", "AU-604(A) - Automotive Safety", "AU-604(B) - Alternative Fuels & Energy Systems", "AU-604(C) - Automotive Aerodynamics"],
        "7": ["AU-701 - Automotive Engine Management Systems", "AU-702 - Electric & Hybrid Vehicles", "AU-703(A) - Vehicle Testing & Homologation", "AU-703(B) - Transport Management", "AU-703(C) - Automotive Robotics", "AU-704 - Industrial Management & Entrepreneurship"],
        "8": ["AU-801 - Automobile System Design", "AU-802 - Recent Trends in Automobile Engineering", "AU-803(A) - Advanced Automotive Electronics", "AU-803(B) - Intelligent Transportation Systems", "AU-803(C) - Automotive Mechatronics"]
    },
    production: {
        "1": ["BT-101 - Engineering Mathematics-I", "BT-102 - Engineering Chemistry", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics"],
        "2": ["BT-201 - Engineering Mathematics-II", "BT-202 - Engineering Physics", "BT-203 - Basic Mechanical Engineering", "BT-204 - Basic Civil Engineering & Mechanics", "BT-205 - Basic Computer Engineering"],
        "3": ["BT-301 - Mathematics-III", "PR-302 - Manufacturing Process-I", "PR-303 - Strength of Materials", "PR-304 - Engineering Materials", "PR-305 - Metrology & Measurement"],
        "4": ["BT-401 - Mathematics-IV", "PR-402 - Manufacturing Process-II", "PR-403 - Theory of Machines", "PR-404 - Machine Design-I", "PR-405 - Industrial Engineering"],
        "5": ["PR-501 - Production Planning & Control", "PR-502 - Machine Tool Design", "PR-503(A) - Operations Research", "PR-503(B) - Quality Engineering", "PR-503(C) - Tool Engineering", "PR-504(A) - Heat Treatment Technology", "PR-504(B) - Non-Conventional Manufacturing Processes", "PR-504(C) - Automation in Manufacturing"],
        "6": ["PR-601 - CAD/CAM", "PR-602 - Machine Design-II", "PR-603 - Metal Forming Technology", "PR-604(A) - Flexible Manufacturing Systems", "PR-604(B) - Robotics in Manufacturing", "PR-604(C) - Total Quality Management"],
        "7": ["PR-701 - Production Management", "PR-702 - CIM (Computer Integrated Manufacturing)", "PR-703(A) - Supply Chain Management", "PR-703(B) - Lean Manufacturing", "PR-703(C) - Advanced Manufacturing Technology", "PR-704 - Entrepreneurship & Industrial Management"],
        "8": ["PR-801 - Advanced Production Engineering", "PR-802 - Modern Manufacturing Systems", "PR-803(A) - Reliability Engineering", "PR-803(B) - Product Design & Development", "PR-803(C) - Six Sigma & Quality Systems"]
    },
    aero: {
        "1": ["BT-101 - Engineering Mathematics-I", "BT-102 - Engineering Chemistry", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics"],
        "2": ["BT-201 - Engineering Mathematics-II", "BT-202 - Engineering Physics", "BT-203 - Basic Mechanical Engineering", "BT-204 - Basic Civil Engineering & Mechanics", "BT-205 - Basic Computer Engineering"],
        "3": ["BT-301 - Mathematics-III", "AE-302 - Aerodynamics-I", "AE-303 - Aircraft Structures-I", "AE-304 - Aircraft Propulsion-I", "AE-305 - Engineering Thermodynamics"],
        "4": ["BT-401 - Mathematics-IV", "AE-402 - Aerodynamics-II", "AE-403 - Aircraft Structures-II", "AE-404 - Aircraft Propulsion-II", "AE-405 - Flight Mechanics-I"],
        "5": ["AE-501 - Aircraft Design-I", "AE-502 - Aircraft Systems & Instruments", "AE-503(A) - Gas Dynamics", "AE-503(B) - Helicopter Engineering", "AE-503(C) - Rocket Propulsion", "AE-504(A) - Aerospace Materials", "AE-504(B) - Space Technology", "AE-504(C) - Aircraft Production Technology"],
        "6": ["AE-601 - Flight Mechanics-II", "AE-602 - Aircraft Design-II", "AE-603 - Aircraft Stability & Control", "AE-604(A) - Computational Fluid Dynamics", "AE-604(B) - Aircraft Maintenance Engineering", "AE-604(C) - Avionics"],
        "7": ["AE-701 - Aerospace Vehicle Design", "AE-702 - Experimental Aerodynamics", "AE-703(A) - Finite Element Methods", "AE-703(B) - Unmanned Aerial Vehicles (UAV)", "AE-703(C) - Missile Technology", "AE-704 - Industrial Management & Entrepreneurship"],
        "8": ["AE-801 - Advanced Aerospace Engineering", "AE-802 - Recent Trends in Aeronautical Engineering", "AE-803(A) - Aircraft Certification & Airworthiness", "AE-803(B) - Spacecraft Systems", "AE-803(C) - Advanced Avionics"]
    },
    bme: {
        "1": ["BT-101 - Engineering Mathematics-I", "BT-102 - Engineering Chemistry", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics"],
        "2": ["BT-201 - Engineering Mathematics-II", "BT-202 - Engineering Physics", "BT-203 - Basic Mechanical Engineering", "BT-204 - Basic Civil Engineering & Mechanics", "BT-205 - Basic Computer Engineering"],
        "3": ["BT-301 - Mathematics-III", "BM-302 - Human Anatomy & Physiology", "BM-303 - Biomedical Instrumentation", "BM-304 - Electronic Devices & Circuits", "BM-305 - Signals & Systems"],
        "4": ["BT-401 - Mathematics-IV", "BM-402 - Medical Electronics", "BM-403 - Sensors & Transducers", "BM-404 - Digital Signal Processing", "BM-405 - Biomaterials"],
        "5": ["BM-501 - Medical Imaging Systems", "BM-502 - Biomedical Signal Processing", "BM-503(A) - Artificial Organs", "BM-503(B) - Rehabilitation Engineering", "BM-503(C) - Bioinformatics", "BM-504(A) - Hospital Engineering", "BM-504(B) - Diagnostic & Therapeutic Equipment", "BM-504(C) - Biomedical Optics"],
        "6": ["BM-601 - Biomechanics", "BM-602 - Medical Image Processing", "BM-603 - Biomedical Microprocessors", "BM-604(A) - Neural Engineering", "BM-604(B) - Embedded Systems for Biomedical Applications", "BM-604(C) - Telemedicine"],
        "7": ["BM-701 - Biomedical Engineering Design", "BM-702 - Biomedical Instrumentation-II", "BM-703(A) - Tissue Engineering", "BM-703(B) - Clinical Engineering", "BM-703(C) - Nanotechnology in Medicine", "BM-704 - Industrial Management & Entrepreneurship"],
        "8": ["BM-801 - Advanced Biomedical Engineering", "BM-802 - Recent Trends in Biomedical Engineering", "BM-803(A) - Medical Robotics", "BM-803(B) - Healthcare Technology Management", "BM-803(C) - Biomedical Data Analytics"]
    },
    iot: {
        "1": ["BT-101 - Engineering Mathematics-I", "BT-102 - Engineering Chemistry", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics"],
        "2": ["BT-201 - Engineering Mathematics-II", "BT-202 - Engineering Physics", "BT-203 - Basic Mechanical Engineering", "BT-204 - Basic Civil Engineering & Mechanics", "BT-205 - Basic Computer Engineering"],
        "3": ["BT-301 - Mathematics-III", "IE-302 - Digital Electronics", "IE-303 - Data Structures", "IE-304 - Computer Organization & Architecture", "IE-305 - Electronic Devices & Circuits"],
        "4": ["BT-401 - Mathematics-IV", "IE-402 - Microprocessors & Microcontrollers", "IE-403 - Embedded Systems", "IE-404 - Operating Systems", "IE-405 - Computer Networks"],
        "5": ["IE-501 - Internet of Things", "IE-502 - Wireless Sensor Networks", "IE-503(A) - ARM Processor Architecture", "IE-503(B) - Real Time Operating Systems", "IE-503(C) - FPGA Design", "IE-504(A) - Cloud Computing", "IE-504(B) - Cyber Security", "IE-504(C) - VLSI Design"],
        "6": ["IE-601 - IoT System Design", "IE-602 - Embedded Linux", "IE-603 - Industrial IoT", "IE-604(A) - Edge Computing", "IE-604(B) - Machine Learning for IoT", "IE-604(C) - Robotics & Automation"],
        "7": ["IE-701 - Advanced Embedded Systems", "IE-702 - IoT Security", "IE-703(A) - Smart Cities & Smart Infrastructure", "IE-703(B) - Automotive Embedded Systems", "IE-703(C) - Wearable Computing", "IE-704 - Entrepreneurship & Industrial Management"],
        "8": ["IE-801 - Advanced IoT Applications", "IE-802 - Recent Trends in IoT & Embedded Systems", "IE-803(A) - AI for IoT", "IE-803(B) - Internet of Medical Things (IoMT)", "IE-803(C) - Advanced Embedded System Design"]
    },
    power: {
        "1": ["BT-101 - Engineering Mathematics-I", "BT-102 - Engineering Chemistry", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics"],
        "2": ["BT-201 - Engineering Mathematics-II", "BT-202 - Engineering Physics", "BT-203 - Basic Mechanical Engineering", "BT-204 - Basic Civil Engineering & Mechanics", "BT-205 - Basic Computer Engineering"],
        "3": ["BT-301 - Mathematics-III", "PE-302 - Network Analysis", "PE-303 - Electrical Machines-I", "PE-304 - Electronic Devices & Circuits", "PE-305 - Digital Electronics"],
        "4": ["BT-401 - Mathematics-IV", "PE-402 - Electrical Machines-II", "PE-403 - Analog Electronics", "PE-404 - Power Systems-I", "PE-405 - Control Systems"],
        "5": ["PE-501 - Power Electronics", "PE-502 - Microprocessors & Microcontrollers", "PE-503(A) - Electrical Drives", "PE-503(B) - High Voltage Engineering", "PE-503(C) - Industrial Electronics", "PE-504(A) - Signals & Systems", "PE-504(B) - Renewable Energy Systems", "PE-504(C) - Embedded Systems"],
        "6": ["PE-601 - Advanced Power Electronics", "PE-602 - Power System-II", "PE-603 - Digital Control Systems", "PE-604(A) - FACTS Devices", "PE-604(B) - Electric Drives & Control", "PE-604(C) - HVDC Transmission"],
        "7": ["PE-701 - Power Quality", "PE-702 - Electric & Hybrid Vehicles", "PE-703(A) - Smart Grid", "PE-703(B) - Flexible AC Transmission Systems", "PE-703(C) - Power Semiconductor Devices", "PE-704 - Industrial Management & Entrepreneurship"],
        "8": ["PE-801 - Advanced Electrical Drives", "PE-802 - Recent Trends in Power Electronics", "PE-803(A) - Renewable Energy Integration", "PE-803(B) - Energy Management Systems", "PE-803(C) - Industrial Automation"]
    },
    mechatronics: {
        "1": ["BT-101 - Engineering Mathematics-I", "BT-102 - Engineering Chemistry", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics"],
        "2": ["BT-201 - Engineering Mathematics-II", "BT-202 - Engineering Physics", "BT-203 - Basic Mechanical Engineering", "BT-204 - Basic Civil Engineering & Mechanics", "BT-205 - Basic Computer Engineering"],
        "3": ["BT-301 - Mathematics-III", "MT-302 - Engineering Mechanics", "MT-303 - Strength of Materials", "MT-304 - Electrical Machines", "MT-305 - Electronic Devices & Circuits"],
        "4": ["BT-401 - Mathematics-IV", "MT-402 - Theory of Machines", "MT-403 - Analog & Digital Electronics", "MT-404 - Microprocessors & Microcontrollers", "MT-405 - Fluid Power Engineering"],
        "5": ["MT-501 - Mechatronics System Design", "MT-502 - Industrial Automation", "MT-503(A) - Robotics", "MT-503(B) - PLC & SCADA", "MT-503(C) - Sensors & Transducers", "MT-504(A) - Control Systems", "MT-504(B) - Embedded Systems", "MT-504(C) - Computer Integrated Manufacturing"],
        "6": ["MT-601 - Robotics & Automation", "MT-602 - CNC Machines & Programming", "MT-603 - Industrial Drives", "MT-604(A) - Artificial Intelligence", "MT-604(B) - Machine Vision", "MT-604(C) - Internet of Things for Mechatronics"],
        "7": ["MT-701 - Advanced Mechatronics", "MT-702 - Intelligent Manufacturing Systems", "MT-703(A) - Autonomous Robots", "MT-703(B) - Flexible Manufacturing Systems", "MT-703(C) - MEMS & Microsystems", "MT-704 - Entrepreneurship & Industrial Management"],
        "8": ["MT-801 - Advanced Robotics", "MT-802 - Recent Trends in Mechatronics", "MT-803(A) - Human Robot Interaction", "MT-803(B) - Smart Manufacturing", "MT-803(C) - Advanced Control Engineering"]
    },
    instrumentation: {
        "1": ["BT-101 - Engineering Mathematics-I", "BT-102 - Engineering Chemistry", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics"],
        "2": ["BT-201 - Engineering Mathematics-II", "BT-202 - Engineering Physics", "BT-203 - Basic Mechanical Engineering", "BT-204 - Basic Civil Engineering & Mechanics", "BT-205 - Basic Computer Engineering"],
        "3": ["BT-301 - Mathematics-III", "IN-302 - Electrical Circuits & Networks", "IN-303 - Electronic Devices & Circuits", "IN-304 - Digital Electronics", "IN-305 - Sensors & Transducers"],
        "4": ["BT-401 - Mathematics-IV", "IN-402 - Analog Electronics", "IN-403 - Industrial Instrumentation", "IN-404 - Control Systems", "IN-405 - Signals & Systems"],
        "5": ["IN-501 - Process Control", "IN-502 - Microprocessors & Microcontrollers", "IN-503(A) - Biomedical Instrumentation", "IN-503(B) - Analytical Instrumentation", "IN-503(C) - Digital Signal Processing", "IN-504(A) - Industrial Automation", "IN-504(B) - PLC & SCADA", "IN-504(C) - Embedded Systems"],
        "6": ["IN-601 - Advanced Process Control", "IN-602 - Computer Control of Processes", "IN-603 - Power Plant Instrumentation", "IN-604(A) - Robotics & Automation", "IN-604(B) - Optical Instrumentation", "IN-604(C) - Wireless Instrumentation"],
        "7": ["IN-701 - Distributed Control Systems", "IN-702 - Industrial Safety & Instrumentation", "IN-703(A) - Virtual Instrumentation", "IN-703(B) - MEMS & Microsystems", "IN-703(C) - IoT for Instrumentation", "IN-704 - Industrial Management & Entrepreneurship"],
        "8": ["IN-801 - Advanced Instrumentation Engineering", "IN-802 - Recent Trends in Instrumentation", "IN-803(A) - Smart Sensors & Measurement Systems", "IN-803(B) - Industrial IoT", "IN-803(C) - Artificial Intelligence in Instrumentation"]
    },
    env: {
        "1": ["BT-101 - Engineering Mathematics-I", "BT-102 - Engineering Chemistry", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics"],
        "2": ["BT-201 - Engineering Mathematics-II", "BT-202 - Engineering Physics", "BT-203 - Basic Mechanical Engineering", "BT-204 - Basic Civil Engineering & Mechanics", "BT-205 - Basic Computer Engineering"],
        "3": ["BT-301 - Mathematics-III", "EV-302 - Environmental Chemistry", "EV-303 - Fluid Mechanics", "EV-304 - Engineering Geology", "EV-305 - Environmental Microbiology"],
        "4": ["BT-401 - Mathematics-IV", "EV-402 - Water Supply Engineering", "EV-403 - Wastewater Engineering", "EV-404 - Air Pollution & Control", "EV-405 - Solid Waste Management"],
        "5": ["EV-501 - Environmental Impact Assessment", "EV-502 - Industrial Waste Management", "EV-503(A) - Noise Pollution & Control", "EV-503(B) - Hazardous Waste Management", "EV-503(C) - Environmental Biotechnology", "EV-504(A) - Environmental Modeling", "EV-504(B) - Groundwater Engineering", "EV-504(C) - Renewable Energy Systems"],
        "6": ["EV-601 - Water & Wastewater Treatment", "EV-602 - Environmental Management", "EV-603 - Remote Sensing & GIS", "EV-604(A) - Climate Change & Sustainable Development", "EV-604(B) - Industrial Safety & Environmental Engineering", "EV-604(C) - Environmental Laws & Policies"],
        "7": ["EV-701 - Environmental Systems Engineering", "EV-702 - Resource Conservation & Recycling", "EV-703(A) - Green Building Technology", "EV-703(B) - Disaster Management", "EV-703(C) - Energy & Environment", "EV-704 - Industrial Management & Entrepreneurship"],
        "8": ["EV-801 - Advanced Environmental Engineering", "EV-802 - Recent Trends in Environmental Engineering", "EV-803(A) - Sustainable Infrastructure", "EV-803(B) - Environmental Risk Assessment", "EV-803(C) - Cleaner Production Technology"]
    },
    arch: {
        "1": ["AR-101 - Architectural Design-I", "AR-102 - Building Materials & Construction-I", "AR-103 - Architectural Graphics-I", "AR-104 - Theory of Structures-I", "AR-105 - History of Architecture-I"],
        "2": ["AR-201 - Architectural Design-II", "AR-202 - Building Materials & Construction-II", "AR-203 - Architectural Graphics-II", "AR-204 - Theory of Structures-II", "AR-205 - History of Architecture-II"],
        "3": ["AR-301 - Architectural Design-III", "AR-302 - Building Construction-III", "AR-303 - Climatology", "AR-304 - Theory of Structures-III", "AR-305 - History of Architecture-III"],
        "4": ["AR-401 - Architectural Design-IV", "AR-402 - Building Construction-IV", "AR-403 - Building Services-I", "AR-404 - Theory of Structures-IV", "AR-405 - Estimation & Costing"],
        "5": ["AR-501 - Architectural Design-V", "AR-502 - Building Services-II", "AR-503 - Landscape Architecture", "AR-504 - Specifications & Contracts", "AR-505 - Interior Design"],
        "6": ["AR-601 - Architectural Design-VI", "AR-602 - Housing", "AR-603 - Urban Planning", "AR-604 - Quantity Surveying & Valuation", "AR-605 - Professional Practice-I"],
        "7": ["AR-701 - Architectural Design-VII", "AR-702 - Town Planning", "AR-703 - Advanced Building Construction", "AR-704 - Building Management", "AR-705 - Professional Practice-II"],
        "8": ["AR-801 - Architectural Design-VIII", "AR-802 - Environmental Planning", "AR-803 - Advanced Building Services", "AR-804 - Disaster Management", "AR-805 - Research Methodology"]
    },
    metallurgy: {
        "1": ["BT-101 - Engineering Mathematics-I", "BT-102 - Engineering Chemistry", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics"],
        "2": ["BT-201 - Engineering Mathematics-II", "BT-202 - Engineering Physics", "BT-203 - Basic Mechanical Engineering", "BT-204 - Basic Civil Engineering & Mechanics", "BT-205 - Basic Computer Engineering"],
        "3": ["BT-301 - Mathematics-III", "ML-302 - Physical Metallurgy", "ML-303 - Engineering Thermodynamics", "ML-304 - Metallurgical Analysis", "ML-305 - Engineering Materials"],
        "4": ["BT-401 - Mathematics-IV", "ML-402 - Mechanical Metallurgy", "ML-403 - Extractive Metallurgy-I", "ML-404 - Phase Transformations", "ML-405 - Fuel, Furnace & Refractories"],
        "5": ["ML-501 - Iron Making", "ML-502 - Steel Making", "ML-503(A) - Foundry Technology", "ML-503(B) - Welding Technology", "ML-503(C) - Powder Metallurgy", "ML-504(A) - Heat Treatment Technology", "ML-504(B) - Corrosion Engineering", "ML-504(C) - Non-Ferrous Metallurgy"],
        "6": ["ML-601 - Extractive Metallurgy-II", "ML-602 - Mechanical Behaviour of Materials", "ML-603 - Materials Characterization", "ML-604(A) - Composite Materials", "ML-604(B) - Surface Engineering", "ML-604(C) - Nano Materials"],
        "7": ["ML-701 - Advanced Physical Metallurgy", "ML-702 - Materials Processing", "ML-703(A) - Failure Analysis", "ML-703(B) - Industrial Metallurgy", "ML-703(C) - Advanced Materials", "ML-704 - Industrial Management & Entrepreneurship"],
        "8": ["ML-801 - Modern Metallurgical Engineering", "ML-802 - Recent Trends in Metallurgy", "ML-803(A) - Biomaterials", "ML-803(B) - Energy Materials", "ML-803(C) - Materials Selection & Design"]
    },
    mining: {
        "1": ["BT-101 - Engineering Mathematics-I", "BT-102 - Engineering Chemistry", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics"],
        "2": ["BT-201 - Engineering Mathematics-II", "BT-202 - Engineering Physics", "BT-203 - Basic Mechanical Engineering", "BT-204 - Basic Civil Engineering & Mechanics", "BT-205 - Basic Computer Engineering"],
        "3": ["BT-301 - Mathematics-III", "MN-302 - Introduction to Mining Engineering", "MN-303 - Mine Surveying-I", "MN-304 - Mining Geology", "MN-305 - Rock Mechanics"],
        "4": ["BT-401 - Mathematics-IV", "MN-402 - Surface Mining", "MN-403 - Underground Coal Mining", "MN-404 - Mine Surveying-II", "MN-405 - Mine Ventilation"],
        "5": ["MN-501 - Mine Environmental Engineering", "MN-502 - Mine Machinery", "MN-503(A) - Drilling & Blasting", "MN-503(B) - Mineral Processing", "MN-503(C) - Mine Safety Engineering", "MN-504(A) - Underground Metal Mining", "MN-504(B) - Mine Management", "MN-504(C) - Tunnelling Engineering"],
        "6": ["MN-601 - Mine Planning & Design", "MN-602 - Mine Economics", "MN-603 - Mine Transportation", "MN-604(A) - Rock Excavation Engineering", "MN-604(B) - Advanced Mine Ventilation", "MN-604(C) - Geo-Mechanics"],
        "7": ["MN-701 - Mine Systems Engineering", "MN-702 - Mine Legislation", "MN-703(A) - Computer Applications in Mining", "MN-703(B) - Mine Automation", "MN-703(C) - Remote Sensing & GIS in Mining", "MN-704 - Industrial Management & Entrepreneurship"],
        "8": ["MN-801 - Advanced Mining Engineering", "MN-802 - Recent Trends in Mining Engineering", "MN-803(A) - Sustainable Mining", "MN-803(B) - Mine Disaster Management", "MN-803(C) - Advanced Mineral Exploration"]
    },
    textile: {
        "1": ["BT-101 - Engineering Mathematics-I", "BT-102 - Engineering Chemistry", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics"],
        "2": ["BT-201 - Engineering Mathematics-II", "BT-202 - Engineering Physics", "BT-203 - Basic Mechanical Engineering", "BT-204 - Basic Civil Engineering & Mechanics", "BT-205 - Basic Computer Engineering"],
        "3": ["BT-301 - Mathematics-III", "TT-302 - Fibre Science & Technology", "TT-303 - Yarn Manufacturing Technology-I", "TT-304 - Textile Testing", "TT-305 - Textile Raw Materials"],
        "4": ["BT-401 - Mathematics-IV", "TT-402 - Yarn Manufacturing Technology-II", "TT-403 - Fabric Manufacturing Technology", "TT-404 - Textile Physics", "TT-405 - Textile Chemical Processing-I"],
        "5": ["TT-501 - Textile Chemical Processing-II", "TT-502 - Knitting Technology", "TT-503(A) - Weaving Technology", "TT-503(B) - Nonwoven Technology", "TT-503(C) - Textile Machinery", "TT-504(A) - Garment Manufacturing Technology", "TT-504(B) - Textile Quality Control", "TT-504(C) - Technical Textiles"],
        "6": ["TT-601 - Textile Design", "TT-602 - Textile Finishing", "TT-603 - Apparel Technology", "TT-604(A) - Textile Management", "TT-604(B) - Industrial Engineering in Textiles", "TT-604(C) - Computer Applications in Textiles"],
        "7": ["TT-701 - Advanced Textile Technology", "TT-702 - Textile Engineering Economics", "TT-703(A) - Fashion Technology", "TT-703(B) - Textile Composite Materials", "TT-703(C) - Smart Textiles", "TT-704 - Industrial Management & Entrepreneurship"],
        "8": ["TT-801 - Modern Textile Technology", "TT-802 - Recent Trends in Textile Engineering", "TT-803(A) - Sustainable Textile Technology", "TT-803(B) - Advanced Garment Engineering", "TT-803(C) - Technical & Functional Textiles"]
    },
    petroleum: {
        "1": ["BT-101 - Engineering Mathematics-I", "BT-102 - Engineering Chemistry", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics"],
        "2": ["BT-201 - Engineering Mathematics-II", "BT-202 - Engineering Physics", "BT-203 - Basic Mechanical Engineering", "BT-204 - Basic Civil Engineering & Mechanics", "BT-205 - Basic Computer Engineering"],
        "3": ["BT-301 - Mathematics-III", "PT-302 - Petroleum Geology", "PT-303 - Fluid Mechanics", "PT-304 - Engineering Thermodynamics", "PT-305 - Drilling Engineering-I"],
        "4": ["BT-401 - Mathematics-IV", "PT-402 - Reservoir Engineering-I", "PT-403 - Drilling Engineering-II", "PT-404 - Well Logging & Formation Evaluation", "PT-405 - Petroleum Production Engineering-I"],
        "5": ["PT-501 - Petroleum Production Engineering-II", "PT-502 - Reservoir Engineering-II", "PT-503(A) - Natural Gas Engineering", "PT-503(B) - Offshore Drilling Technology", "PT-503(C) - Petroleum Refining Technology", "PT-504(A) - Enhanced Oil Recovery", "PT-504(B) - Pipeline Engineering", "PT-504(C) - Petroleum Economics"],
        "6": ["PT-601 - Reservoir Simulation", "PT-602 - Well Testing", "PT-603 - Petroleum Exploration", "PT-604(A) - Offshore Production Engineering", "PT-604(B) - Health, Safety & Environment in Petroleum Industry", "PT-604(C) - Unconventional Oil & Gas Resources"],
        "7": ["PT-701 - Advanced Drilling Engineering", "PT-702 - Petroleum Reservoir Management", "PT-703(A) - LNG Technology", "PT-703(B) - Oil & Gas Processing", "PT-703(C) - Energy Engineering", "PT-704 - Industrial Management & Entrepreneurship"],
        "8": ["PT-801 - Advanced Petroleum Engineering", "PT-802 - Recent Trends in Petroleum Engineering", "PT-803(A) - Deepwater Drilling Technology", "PT-803(B) - Carbon Capture & Storage", "PT-803(C) - Petroleum Asset Management"]
    },
    food: {
        "1": ["BT-101 - Engineering Mathematics-I", "BT-102 - Engineering Chemistry", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics"],
        "2": ["BT-201 - Engineering Mathematics-II", "BT-202 - Engineering Physics", "BT-203 - Basic Mechanical Engineering", "BT-204 - Basic Civil Engineering & Mechanics", "BT-205 - Basic Computer Engineering"],
        "3": ["BT-301 - Mathematics-III", "FT-302 - Food Chemistry", "FT-303 - Food Microbiology", "FT-304 - Engineering Properties of Food", "FT-305 - Food Biochemistry"],
        "4": ["BT-401 - Mathematics-IV", "FT-402 - Food Processing Technology-I", "FT-403 - Food Preservation Technology", "FT-404 - Heat & Mass Transfer", "FT-405 - Food Analysis & Instrumentation"],
        "5": ["FT-501 - Food Processing Technology-II", "FT-502 - Dairy Technology", "FT-503(A) - Fruit & Vegetable Processing", "FT-503(B) - Cereal, Pulse & Oilseed Technology", "FT-503(C) - Meat, Fish & Poultry Processing", "FT-504(A) - Food Packaging Technology", "FT-504(B) - Food Plant Engineering", "FT-504(C) - Food Quality Assurance"],
        "6": ["FT-601 - Food Process Engineering", "FT-602 - Food Safety & Standards", "FT-603 - Refrigeration & Cold Storage", "FT-604(A) - Functional Foods & Nutraceuticals", "FT-604(B) - Bakery & Confectionery Technology", "FT-604(C) - Beverage Technology"],
        "7": ["FT-701 - Food Product Development", "FT-702 - Food Biotechnology", "FT-703(A) - Food Supply Chain Management", "FT-703(B) - Quality Management Systems", "FT-703(C) - Food Waste Management", "FT-704 - Industrial Management & Entrepreneurship"],
        "8": ["FT-801 - Advanced Food Technology", "FT-802 - Recent Trends in Food Technology", "FT-803(A) - Food Nanotechnology", "FT-803(B) - Food Toxicology", "FT-803(C) - Food Business Management"]
    },
    robotics: {
        "1": ["BT-101 - Engineering Mathematics-I", "BT-102 - Engineering Chemistry", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics"],
        "2": ["BT-201 - Engineering Mathematics-II", "BT-202 - Engineering Physics", "BT-203 - Basic Mechanical Engineering", "BT-204 - Basic Civil Engineering & Mechanics", "BT-205 - Basic Computer Engineering"],
        "3": ["BT-301 - Mathematics-III", "RB-302 - Engineering Mechanics", "RB-303 - Electronic Devices & Circuits", "RB-304 - Data Structures", "RB-305 - Digital Electronics"],
        "4": ["BT-401 - Mathematics-IV", "RB-402 - Microprocessors & Microcontrollers", "RB-403 - Control Systems", "RB-404 - Sensors & Actuators", "RB-405 - Kinematics of Machines"],
        "5": ["RB-501 - Robotics Engineering", "RB-502 - Embedded Systems", "RB-503(A) - Industrial Robotics", "RB-503(B) - Artificial Intelligence", "RB-503(C) - Machine Vision", "RB-504(A) - PLC & SCADA", "RB-504(B) - Mechatronics", "RB-504(C) - Computer Vision"],
        "6": ["RB-601 - Robot Dynamics & Control", "RB-602 - Autonomous Mobile Robots", "RB-603 - Internet of Things", "RB-604(A) - Machine Learning", "RB-604(B) - Human Robot Interaction", "RB-604(C) - Industrial Automation"],
        "7": ["RB-701 - Advanced Robotics", "RB-702 - Intelligent Robotic Systems", "RB-703(A) - Swarm Robotics", "RB-703(B) - Medical Robotics", "RB-703(C) - UAV & Drone Technology", "RB-704 - Industrial Management & Entrepreneurship"],
        "8": ["RB-801 - Advanced Robot Design", "RB-802 - Recent Trends in Robotics Engineering", "RB-803(A) - Collaborative Robotics (Cobots)", "RB-803(B) - Robotic Process Automation (RPA)", "RB-803(C) - AI Applications in Robotics"]
    },
    nano: {
        "1": ["BT-101 - Engineering Mathematics-I", "BT-102 - Engineering Chemistry", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics"],
        "2": ["BT-201 - Engineering Mathematics-II", "BT-202 - Engineering Physics", "BT-203 - Basic Mechanical Engineering", "BT-204 - Basic Civil Engineering & Mechanics", "BT-205 - Basic Computer Engineering"],
        "3": ["BT-301 - Mathematics-III", "NT-302 - Introduction to Nanotechnology", "NT-303 - Solid State Physics", "NT-304 - Materials Science", "NT-305 - Engineering Chemistry for Nanotechnology"],
        "4": ["BT-401 - Mathematics-IV", "NT-402 - Nano Materials", "NT-403 - Quantum Mechanics", "NT-404 - Nano Fabrication Techniques", "NT-405 - Nano Characterization Techniques"],
        "5": ["NT-501 - Nano Electronics", "NT-502 - Nano Biotechnology", "NT-503(A) - Carbon Nanomaterials", "NT-503(B) - Nano Photonics", "NT-503(C) - Nano Sensors", "NT-504(A) - Thin Film Technology", "NT-504(B) - MEMS & NEMS", "NT-504(C) - Computational Nanotechnology"],
        "6": ["NT-601 - Nanocomposites", "NT-602 - Nano Device Engineering", "NT-603 - Nano Toxicology & Safety", "NT-604(A) - Biomedical Nanotechnology", "NT-604(B) - Energy Nanotechnology", "NT-604(C) - Polymer Nanotechnology"],
        "7": ["NT-701 - Advanced Nanotechnology", "NT-702 - Nano Manufacturing", "NT-703(A) - Nano Medicine", "NT-703(B) - Environmental Nanotechnology", "NT-703(C) - Nano Robotics", "NT-704 - Industrial Management & Entrepreneurship"],
        "8": ["NT-801 - Recent Trends in Nanotechnology", "NT-802 - Nanotechnology Applications", "NT-803(A) - Advanced Functional Nanomaterials", "NT-803(B) - Nano Energy Systems", "NT-803(C) - Nano Product Design"]
    },
    marine: {
        "1": ["BT-101 - Engineering Mathematics-I", "BT-102 - Engineering Chemistry", "BT-103 - English for Communication", "BT-104 - Basic Electrical & Electronics Engineering", "BT-105 - Engineering Graphics"],
        "2": ["BT-201 - Engineering Mathematics-II", "BT-202 - Engineering Physics", "BT-203 - Basic Mechanical Engineering", "BT-204 - Basic Civil Engineering & Mechanics", "BT-205 - Basic Computer Engineering"],
        "3": ["BT-301 - Mathematics-III", "MR-302 - Applied Mechanics", "MR-303 - Engineering Thermodynamics", "MR-304 - Marine Engineering Drawing", "MR-305 - Electrical Technology"],
        "4": ["BT-401 - Mathematics-IV", "MR-402 - Marine Boilers", "MR-403 - Marine Diesel Engines", "MR-404 - Fluid Mechanics & Hydraulic Machines", "MR-405 - Marine Electrical Technology"],
        "5": ["MR-501 - Naval Architecture", "MR-502 - Marine Auxiliary Machinery", "MR-503(A) - Ship Construction", "MR-503(B) - Marine Heat Engines", "MR-503(C) - Marine Refrigeration & Air Conditioning", "MR-504(A) - Marine Automation", "MR-504(B) - Marine Pollution & Control", "MR-504(C) - Marine Materials"],
        "6": ["MR-601 - Marine Power Plant", "MR-602 - Marine Control Systems", "MR-603 - Marine Electrical Machines", "MR-604(A) - Marine Safety & Regulations", "MR-604(B) - Ship Operation & Maintenance", "MR-604(C) - Offshore Engineering"],
        "7": ["MR-701 - Advanced Marine Engineering", "MR-702 - Ship Design & Stability", "MR-703(A) - Port & Harbour Engineering", "MR-703(B) - Marine Renewable Energy", "MR-703(C) - Marine Robotics", "MR-704 - Industrial Management & Entrepreneurship"],
        "8": ["MR-801 - Modern Marine Engineering", "MR-802 - Recent Trends in Marine Engineering", "MR-803(A) - LNG & Gas Carrier Technology", "MR-803(B) - Marine Energy Management", "MR-803(C) - Smart Ship Technology"]
    }
};

let branchContent = [];
let branchLectures = [];
let branchSettings = {
    sections: { videos: true, pyq: true, tools: true, prompts: true },
    visibility: { videos: true, pyq: true, tools: true, prompts: true }
};

function branchParam() {
    return new URLSearchParams(window.location.search).get("branch") || "cse";
}

function normalizeBranchText(value) {
    return String(value || "").toLowerCase().replace(/&/g, "and").replace(/engg/g, "engineering").replace(/[^a-z0-9]+/g, " ").trim();
}

function escapeBranchHtml(value) {
    return String(value ?? "").replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
}

function safeBranchUrl(value) {
    const url = String(value || "").trim();
    if (/^https?:\/\//i.test(url) || /^\/?uploads\//i.test(url) || /^\.\.\/uploads\//i.test(url)) return escapeBranchHtml(url);
    return "#";
}


function branchPyqSubjectCode(subject) {
    const match = String(subject || "").match(/\b([A-Z]{1,6})\s*-?\s*(\d{3,4})(?:\s*\(([A-Z](?:\/[A-Z])*)\))?/i);
    if (!match) return "";
    const prefix = match[1].toUpperCase();
    const number = match[2];
    const suffix = match[3] ? match[3].toUpperCase().replace(/\s+/g, "") : "";
    return `${prefix}-${number}${suffix ? `(${suffix})` : ""}`;
}

function branchPyqSubjectValue(subject) {
    const code = branchPyqSubjectCode(subject);
    if (code) return `code:${code.toLowerCase().replace(/\s+/g, "")}`;
    return `subject:${normalizeBranchText(subject)}`;
}

function buildBranchPyqUrl(branch, semester = "all", subject = "all", year = "all") {
    const params = new URLSearchParams({
        branch: branch?.[0] || "all",
        semester: String(semester || "all"),
        subject: subject === "all" ? "all" : branchPyqSubjectValue(subject),
        year: String(year || "all")
    });
    return `../pages/pyq.html?${params.toString()}#pyqStepPapers`;
}
function buildBranchVideoUrl(branch, video) {
    const params = new URLSearchParams({
        branch: branch?.[0] || "all",
        semester: String(video?.semester || "all"),
        subject: String(video?.subject || "all")
    });
    return `../pages/lecture.html?${params.toString()}#lecturePlayer`;
}

function selectedBranch() {
    const id = branchParam().toLowerCase();
    return branchDirectory.find(([branchId]) => branchId === id) || branchDirectory[0];
}

function currentUserIsAdmin() {
    try {
        const user = JSON.parse(localStorage.getItem("mini_currentUser") || "null");
        return String(user?.role || "").toLowerCase() === "admin";
    } catch (error) {
        return false;
    }
}

function sectionAllowed(name) {
    if (currentUserIsAdmin()) return true;
    return branchSettings.sections?.[name] !== false && branchSettings.visibility?.[name] !== false;
}

function applyBranchVisibility() {
    const videoAllowed = sectionAllowed("videos");
    const pyqAllowed = sectionAllowed("pyq");
    const videoSection = document.getElementById("videos");
    const pyqSection = document.getElementById("branchPyq");
    const openVideoLibrary = document.getElementById("openVideoLibrary");
    const openPyqLibrary = document.getElementById("openPyqLibrary");

    if (videoSection) videoSection.hidden = !videoAllowed;
    if (pyqSection) pyqSection.hidden = !pyqAllowed;
    if (openVideoLibrary) openVideoLibrary.hidden = !videoAllowed;
    if (openPyqLibrary) openPyqLibrary.hidden = !pyqAllowed;

    document.querySelectorAll('.nav-menu a[href*="#videos"], .branch-detail-actions a[href="#videos"]').forEach((link) => {
        if (link.parentElement?.tagName === "LI") link.parentElement.hidden = !videoAllowed;
        else link.hidden = !videoAllowed;
    });

    document.querySelectorAll('.nav-menu a[href*="#pyq"], .branch-detail-actions a[href="#branchPyq"], .branch-content-type-options a[href="#branchPyq"]').forEach((link) => {
        if (link.parentElement?.tagName === "LI") link.parentElement.hidden = !pyqAllowed;
        else link.hidden = !pyqAllowed;
    });
}

function branchSubjectHasCode(value) {
    return /^[A-Z]{1,6}[\s-]?\d{3,4}(?:\s*-?\s*\([A-Z](?:\/[A-Z])*\)|\([A-Z]\))?\b/i.test(String(value || "").trim());
}

function branchCodedSubjectList(list) {
    return [...new Set((Array.isArray(list) ? list : [])
        .map((subject) => String(subject || "").trim())
        .filter((subject) => subject && branchSubjectHasCode(subject)))];
}

function branchCodedSubjectMap(map) {
    return Object.fromEntries(Object.entries(map || {})
        .map(([semester, subjects]) => [semester, branchCodedSubjectList(subjects)])
        .filter(([, subjects]) => subjects.length));
}

function semesterSubjectMap(branch) {
    const official = branchSemesterSubjects[branch[0]];
    if (official) return branchCodedSubjectMap({ "1": firstYearSubjects["1"], "2": firstYearSubjects["2"], ...official });
    const subjects = branchCodedSubjectList(branch[4]);
    return branchCodedSubjectMap({
        "1": firstYearSubjects["1"],
        "2": firstYearSubjects["2"],
        "3": subjects.slice(0, 3),
        "4": subjects.slice(1, 4),
        "5": subjects.slice(3, 6),
        "6": subjects.slice(4, 7),
        "7": subjects.slice(6, 9),
        "8": subjects.slice(-3)
    });
}

function itemMatchesBranch(item, branch) {
    const branchText = normalizeBranchText(`${branch[0]} ${branch[2]}`);
    const itemText = normalizeBranchText(item.branch || item.branchName || item.department || "");
    return !itemText || branchText.includes(itemText) || itemText.includes(branchText) || itemText.includes(branch[0]);
}

function currentFilters() {
    return {
        semester: document.getElementById("branchSemesterFilter")?.value || "all",
        subject: document.getElementById("branchSubjectFilter")?.value || "all",
        search: normalizeBranchText(document.getElementById("branchSearchInput")?.value || "")
    };
}

async function loadBranchData() {
    branchContent = JSON.parse(localStorage.getItem("admin_content") || "[]");
    branchLectures = JSON.parse(localStorage.getItem("backend_lectures") || "[]");
    branchSettings = {
        ...branchSettings,
        ...(JSON.parse(localStorage.getItem("engilearn_public_settings") || "null") || {})
    };

    if (!window.EngiLearnAPI) return;

    try {
        const data = await EngiLearnAPI.getPublicSettings();
        branchSettings = {
            ...branchSettings,
            ...(data.settings || {}),
            sections: { ...branchSettings.sections, ...(data.settings?.sections || {}) },
            visibility: { ...branchSettings.visibility, ...(data.settings?.visibility || {}) }
        };
        localStorage.setItem("engilearn_public_settings", JSON.stringify(branchSettings));
    } catch (error) {
        console.warn("Branch settings backend unavailable:", error.message);
    }

    try {
        const data = await EngiLearnAPI.getContent(false);
        branchContent = data.content || branchContent;
        localStorage.setItem("admin_content", JSON.stringify(branchContent));
    } catch (error) {
        console.warn("Branch content backend unavailable:", error.message);
    }

    try {
        const data = await EngiLearnAPI.getLectures();
        branchLectures = data.lectures || branchLectures;
        localStorage.setItem("backend_lectures", JSON.stringify(branchLectures));
    } catch (error) {
        console.warn("Branch lecture backend unavailable:", error.message);
    }
}

function branchSubjectDedupeKey(subject) {
    const text = String(subject || "").trim().replace(/\s+/g, " ");
    const codeMatch = text.match(/^([A-Z]{1,6}[\s-]?\d{3,4}(?:\s*-?\s*\([A-Z](?:\/[A-Z])*\))?)/i);
    const code = codeMatch ? codeMatch[1].toUpperCase().replace(/\s*-\s*/g, "-").replace(/\s+/g, "").replace(/-+\(/g, "(") : "";
    const name = text
        .replace(/^([A-Z]{1,6}[\s-]?\d{3,4}(?:\s*-?\s*\([A-Z](?:\/[A-Z])*\))?)\s*[-â€“â€”]?\s*/i, "")
        .toLowerCase()
        .replace(/&/g, " and ")
        .replace(/[^a-z0-9]+/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    return code ? `${code}::${name}` : name;
}

function uniqueBranchSubjects(subjects) {
    const map = new Map();
    subjects.filter(Boolean).forEach((subject) => {
        const key = branchSubjectDedupeKey(subject);
        if (key && !map.has(key)) map.set(key, subject);
    });
    return [...map.values()];
}

function setupFilters(branch) {
    const map = semesterSubjectMap(branch);
    const semesterSelect = document.getElementById("branchSemesterFilter");
    const subjectSelect = document.getElementById("branchSubjectFilter");
    const allSubjects = uniqueBranchSubjects(Object.values(map).flat());

    semesterSelect.innerHTML = `<option value="all">All semesters</option>${Object.keys(map).map((sem) => `<option value="${sem}">Semester ${sem}</option>`).join("")}`;
    subjectSelect.innerHTML = `<option value="all">All subjects</option>${allSubjects.map((subject) => `<option value="${escapeBranchHtml(subject)}">${escapeBranchHtml(subject)}</option>`).join("")}`;

    [semesterSelect, subjectSelect, document.getElementById("branchSearchInput")].forEach((field) => {
        field.addEventListener("input", () => renderBranchSections(branch));
    });

    document.getElementById("branchResetFilters").addEventListener("click", () => {
        semesterSelect.value = "all";
        subjectSelect.value = "all";
        document.getElementById("branchSearchInput").value = "";
        renderBranchSections(branch);
    });
}

function filteredSubjects(branch) {
    const filters = currentFilters();
    return Object.entries(semesterSubjectMap(branch)).map(([semester, subjects]) => ({
        semester,
        subjects: uniqueBranchSubjects(subjects).filter((subject) => (
            (filters.semester === "all" || filters.semester === semester) &&
            (filters.subject === "all" || subject === filters.subject) &&
            (!filters.search || normalizeBranchText(`${subject} semester ${semester}`).includes(filters.search))
        ))
    })).filter((group) => group.subjects.length);
}

function renderHero(branch) {
    const allSubjects = Object.values(semesterSubjectMap(branch)).flat();
    const uniqueSubjects = uniqueBranchSubjects(allSubjects).length;
    const branchUploads = branchContent.filter((item) => itemMatchesBranch(item, branch) && !String(item.type || "").toLowerCase().includes("pyq")).length;
    const branchVideos = branchLectures.filter((item) => itemMatchesBranch(item, branch)).length;

    document.title = `${branch[2]} - EngiLearn Branch Hub`;
    document.getElementById("branchRank").textContent = branch[1];
    document.getElementById("branchTitle").textContent = branch[2];
    document.getElementById("branchSummary").textContent = `Explore ${branch[2]} semester-wise subjects, uploaded notes, and internal video lectures in one branch-wise page.`;
    document.getElementById("branchStats").innerHTML = [
        ["8", "Semesters"],
        [uniqueSubjects, "Subjects"],
        [sectionAllowed("videos") ? branchVideos : 0, "Uploaded videos"],
        [branchUploads, "Notes uploads"]
    ].map(([value, label]) => `<span><strong>${value}</strong>${label}</span>`).join("");
    document.getElementById("openVideoLibrary").href = `../pages/lecture.html?branch=${encodeURIComponent(branch[0])}`;
    applyBranchVisibility();
}

function renderSubjects(branch) {
    const groups = filteredSubjects(branch);
    const count = groups.reduce((total, group) => total + group.subjects.length, 0);
    document.getElementById("subjectCountText").textContent = `${count} subject options`;
    document.getElementById("branchSemesterGrid").innerHTML = groups.length ? groups.map((group) => `
        <article class="branch-semester-card">
            <strong>Semester ${escapeBranchHtml(group.semester)}</strong>
            <div>${group.subjects.map((subject) => `<span>${escapeBranchHtml(subject)}</span>`).join("")}</div>
        </article>
    `).join("") : emptyState("No subjects match this filter.");
}

function suggestedVideos(branch) {
    return Object.values(semesterSubjectMap(branch)).flat().slice(0, 6).map((subject, index) => ({
        title: `${subject} complete lecture`,
        subject,
        semester: String((index % 8) + 1),
        teacherName: "YouTube Faculty",
        description: `${branch[2]} ${subject} exam-focused lecture playlist.`,
        videoUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(`${branch[2]} ${subject} RGPV lecture`)}`
    }));
}

function filteredVideos(branch) {
    const filters = currentFilters();
    const uploaded = branchLectures.filter((item) => itemMatchesBranch(item, branch));
    return (uploaded.length ? uploaded : suggestedVideos(branch)).filter((item) => {
        const haystack = normalizeBranchText(`${item.title} ${item.subject} ${item.semester} ${item.teacherName} ${item.description}`);
        return (filters.semester === "all" || String(item.semester || "").includes(filters.semester)) &&
            (filters.subject === "all" || normalizeBranchText(item.subject).includes(normalizeBranchText(filters.subject))) &&
            (!filters.search || haystack.includes(filters.search));
    });
}

function renderVideos(branch) {
    if (!sectionAllowed("videos")) {
        document.getElementById("branchVideoGrid").innerHTML = "";
        applyBranchVisibility();
        return;
    }
    const videos = filteredVideos(branch).slice(0, 9);
    document.getElementById("branchVideoGrid").innerHTML = videos.length ? videos.map((video) => `
        <article class="branch-resource-card">
            <div class="branch-resource-icon"><i class="fas fa-play"></i></div>
            <span>Semester ${escapeBranchHtml(video.semester || "All")} / ${escapeBranchHtml(video.subject || "Subject")}</span>
            <h3>${escapeBranchHtml(video.title || "Lecture")}</h3>
            <p>${escapeBranchHtml(video.description || "Branch lecture available for study.")}</p>
            <a class="pyq-btn secondary" href="${buildBranchVideoUrl(branch, video)}"><i class="fas fa-play-circle"></i> Watch</a>
        </article>
    `).join("") : emptyState("No videos match this filter.");
}

function filteredNotes(branch) {
    const filters = currentFilters();
    return branchContent.filter((item) => {
        const haystack = normalizeBranchText(`${item.title} ${item.subject} ${item.type} ${item.description} ${item.semester}`);
        return itemMatchesBranch(item, branch) &&
            (filters.semester === "all" || String(item.semester || "").includes(filters.semester)) &&
            (filters.subject === "all" || normalizeBranchText(item.subject).includes(normalizeBranchText(filters.subject))) &&
            (!filters.search || haystack.includes(filters.search));
    });
}


function uploadedBranchPyq(branch) {
    return filteredNotes(branch).filter((item) => {
        const type = String(item.type || "").toLowerCase();
        const url = String(item.fileUrl || item.url || "").toLowerCase();
        const text = String(`${item.title || ""} ${item.description || ""}`).toLowerCase();
        return type.includes("pyq") || (url.endsWith(".pdf") && text.includes("question")) || text.includes("pyq");
    });
}

function renderBranchPyq(branch) {
    const grid = document.getElementById("branchPyqGrid");
    if (!grid) return;

    const filters = currentFilters();
    const libraryLink = document.getElementById("openPyqLibrary");
    if (libraryLink) libraryLink.href = buildBranchPyqUrl(branch, filters.semester, filters.subject);

    if (!sectionAllowed("pyq")) {
        grid.innerHTML = "";
        applyBranchVisibility();
        return;
    }

    const uploaded = uploadedBranchPyq(branch).slice(0, 9);
    if (uploaded.length) {
        grid.innerHTML = uploaded.map((item) => {
            const fallbackUrl = buildBranchPyqUrl(branch, item.semester || filters.semester, item.subject || filters.subject);
            const fileUrl = safeBranchUrl(item.fileUrl || item.url);
            const openUrl = fileUrl === "#" ? fallbackUrl : fileUrl;
            return `
        <article class="branch-resource-card branch-pyq-card">
            <div class="branch-resource-icon"><i class="fas fa-file-pdf"></i></div>
            <span>Semester ${escapeBranchHtml(item.semester || "All")} / ${escapeBranchHtml(item.subject || "PYQ")}</span>
            <h3>${escapeBranchHtml(item.title || "Previous Year Question Paper")}</h3>
            <p>${escapeBranchHtml(item.description || "Content Admin uploaded PYQ PDF for this branch.")}</p>
            <div class="branch-resource-actions">
                <a class="pyq-btn secondary" href="${openUrl}" target="_blank" rel="noopener"><i class="fas fa-file-pdf"></i> Open PDF</a>
                <a class="pyq-btn ghost" href="${fallbackUrl}"><i class="fas fa-table-list"></i> Library</a>
            </div>
        </article>`;
        }).join("");
        return;
    }

    const generated = filteredSubjects(branch).flatMap((group) => group.subjects.map((subject) => ({
        semester: group.semester,
        subject,
        code: branchPyqSubjectCode(subject)
    }))).slice(0, 9);

    grid.innerHTML = generated.length ? generated.map((item) => `
        <article class="branch-resource-card branch-pyq-card">
            <div class="branch-resource-icon"><i class="fas fa-file-pdf"></i></div>
            <span>Semester ${escapeBranchHtml(item.semester)} / ${escapeBranchHtml(item.code || "Subject")}</span>
            <h3>${escapeBranchHtml(item.subject)} PYQ</h3>
            <p>Open saved previous year papers for this subject inside EngiLearn.</p>
            <a class="pyq-btn secondary" href="${buildBranchPyqUrl(branch, item.semester, item.subject)}"><i class="fas fa-table-list"></i> Open PYQ Library</a>
        </article>
    `).join("") : emptyState("No PYQ subjects match this filter.");
}

function renderNotes(branch) {
    const notes = filteredNotes(branch).filter((item) => !String(item.type || "").toLowerCase().includes("pyq"));
    const fallback = Object.values(semesterSubjectMap(branch)).flat().slice(0, 6).map((subject, index) => ({
        title: `${subject} notes`,
        subject,
        semester: String((index % 8) + 1),
        description: "Admin uploaded notes will appear here after adding content from dashboard.",
        fileUrl: ""
    }));
    const records = notes.length ? notes : fallback;

    document.getElementById("branchNotesGrid").innerHTML = records.map((item) => `
        <article class="branch-resource-card">
            <div class="branch-resource-icon"><i class="fas fa-book-open"></i></div>
            <span>Semester ${escapeBranchHtml(item.semester || "All")} / ${escapeBranchHtml(item.subject || "Subject")}</span>
            <h3>${escapeBranchHtml(item.title || "Study Notes")}</h3>
            <p>${escapeBranchHtml(item.description || "Notes and resources for this branch.")}</p>
            ${item.fileUrl || item.url ? `<a class="pyq-btn secondary" href="${safeBranchUrl(item.fileUrl || item.url)}" target="_blank" rel="noopener"><i class="fas fa-download"></i> Download</a>` : `<button class="pyq-btn secondary" type="button" disabled><i class="fas fa-clock"></i> Upload pending</button>`}
        </article>
    `).join("");
}

function renderBranchSections(branch) {
    renderSubjects(branch);
    renderVideos(branch);
    renderBranchPyq(branch);
    renderNotes(branch);
    applyBranchVisibility();
}

function emptyState(message) {
    return `<div class="lms-empty"><i class="fas fa-circle-info"></i><p>${escapeBranchHtml(message)}</p></div>`;
}

document.addEventListener("DOMContentLoaded", async () => {
    const branch = selectedBranch();
    setupFilters(branch);
    renderHero(branch);
    renderBranchSections(branch);
    await loadBranchData();
    renderHero(branch);
    renderBranchSections(branch);
    applyBranchVisibility();
});
