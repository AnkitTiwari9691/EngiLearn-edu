(function () {
    "use strict";

    const STANDARD_SUBJECTS = [
        ["Data Structures and Algorithms", ["dsa", "data structure", "data structures", "data structure algorithm", "data structures algorithm", "data structure and algorithm", "data structures and algorithm", "data structure algorithms", "data structures algorithms", "data structures and algorithms", "algorithm and data structure"]],
        ["Operating System", ["os", "operating system", "operating systems"]],
        ["Database Management System", ["dbms", "database management system", "database management systems", "database system", "database systems", "data base management system", "data base management systems"]],
        ["Computer Networks", ["cn", "computer network", "computer networks", "networking", "wireless and mobile computing", "wireless mobile computing"]],
        ["Artificial Intelligence and Machine Learning", ["ai", "artificial intelligence", "ai ml", "aiml", "ai and ml", "artificial intelligence machine learning", "artificial intelligence and machine learning", "machine learning", "ml"]],
        ["Analysis and Design of Algorithms", ["ada", "analysis and design of algorithm", "analysis and design of algorithms", "design and analysis of algorithm", "design and analysis of algorithms"]],
        ["Theory of Computation", ["toc", "theory of computation", "theory of computations", "formal language and automata theory", "formal languages and automata theory", "automata theory"]],
        ["Software Engineering", ["se", "software engineering", "software engineering with agile methodology", "agile software development"]],
        ["Computer Organization and Architecture", ["coa", "computer organization", "computer organisation", "computer architecture", "computer organization and architecture", "computer organisation and architecture", "computer system organisation", "computer system organization"]],
        ["Object Oriented Programming and Methodology", ["oop", "oops", "oopm", "object oriented programming", "object oriented programming and methodology", "object oriented programming methodology", "object oriented programming system"]],
        ["Digital Circuits and Systems", ["digital circuits and system", "digital circuit and design", "digital system", "digital systems", "digital system design", "digital circuits and systems"]],
        ["Discrete Structure", ["discrete structure", "discrete structures", "introduction to discrete structure", "introduction to discrete structures", "introduction to discrete structure and linear algebra"]],
        ["Engineering Chemistry", ["engineering chemistry", "chemistry"]],
        ["Engineering Physics", ["engineering physics", "physics"]],
        ["Engineering Mathematics I", ["mathematics i", "mathematics 1", "engineering mathematics i", "engineering mathematics 1"]],
        ["Engineering Mathematics II", ["mathematics ii", "mathematics 2", "engineering mathematics ii", "engineering mathematics 2"]],
        ["Mathematics III", ["mathematics iii", "mathematics 3", "mathematics-iii", "mathematics-3", "engineering mathematics iii", "engineering mathematics 3"]],
        ["Energy and Environmental Engineering", ["energy and environmental engineering", "environmental engineering", "energy environment ethics and society", "energy and environment engineering"]],
        ["Basic Mechanical Engineering", ["basic mechanical engineering", "mechanical engineering basics"]],
        ["Basic Civil Engineering and Mechanics", ["basic civil engineering", "basic civil engineering and mechanics", "civil engineering and mechanics"]],
        ["Basic Electrical and Electronics Engineering", ["basic electrical and electronics engineering", "basic electrical electronics engineering", "basic electrical engineering"]],
        ["Basic Computer Engineering", ["basic computer engineering", "fundamentals of computer science", "computer fundamentals"]],
        ["English for Communication", ["english for communication", "communication skills", "technical communication"]],
        ["Engineering Graphics", ["engineering graphics", "engineering drawing"]]
    ];

    const aliasToStandard = new Map();
    const standardToAliases = new Map();

    function romanToNumber(text) {
        return String(text || "")
            .replace(/\biii\b/g, " 3 ")
            .replace(/\bii\b/g, " 2 ")
            .replace(/\bi\b/g, " 1 ");
    }

    function singularize(token) {
        if (!token || token.length < 4) return token;
        if (token.endsWith("ies")) return `${token.slice(0, -3)}y`;
        if (token.endsWith("sses")) return token.slice(0, -2);
        if (token.endsWith("s") && !token.endsWith("ss")) return token.slice(0, -1);
        return token;
    }

    function normalize(value) {
        return romanToNumber(String(value || ""))
            .normalize("NFKD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .replace(/&|\+/g, " and ")
            .replace(/\bdata\s+base\b/g, "database")
            .replace(/[^a-z0-9\s]/g, " ")
            .replace(/\s+/g, " ")
            .trim()
            .split(" ")
            .map(singularize)
            .join(" ");
    }

    function titleCase(value) {
        const small = new Set(["and", "of", "for", "to", "in", "with"]);
        return String(value || "")
            .split(" ")
            .filter(Boolean)
            .map((word, index) => small.has(word) && index ? word : word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    }

    STANDARD_SUBJECTS.forEach(([standard, aliases]) => {
        const values = [...new Set([standard, ...aliases])];
        standardToAliases.set(standard, values);
        values.forEach((alias) => aliasToStandard.set(normalize(alias), standard));
        aliasToStandard.set(normalize(standard), standard);
    });

    function standardize(value) {
        const key = normalize(value);
        if (!key) return "";
        if (aliasToStandard.has(key)) return aliasToStandard.get(key);
        const compact = key.replace(/\s+/g, "");
        for (const [alias, standard] of aliasToStandard.entries()) {
            if (alias.replace(/\s+/g, "") === compact) return standard;
        }
        return titleCase(key);
    }

    function canonicalKey(value) {
        return normalize(standardize(value));
    }

    function tokenSet(value) {
        const stop = new Set(["and", "of", "the", "for", "to", "in", "with", "a", "an"]);
        return new Set(canonicalKey(value).split(" ").filter((token) => token && !stop.has(token)));
    }

    function score(left, right) {
        const a = tokenSet(left);
        const b = tokenSet(right);
        if (!a.size || !b.size) return 0;
        const intersection = [...a].filter((token) => b.has(token)).length;
        const union = new Set([...a, ...b]).size;
        return union ? intersection / union : 0;
    }

    function isSimilar(left, right) {
        const a = canonicalKey(left);
        const b = canonicalKey(right);
        if (!a || !b) return false;
        if (a === b) return true;
        if (a.length >= 12 && b.startsWith(`${a} `)) return true;
        if (b.length >= 12 && a.startsWith(`${b} `)) return true;
        return score(left, right) >= 0.72;
    }

    function groupSubjects(subjects) {
        const groups = {};
        (subjects || []).forEach((subject) => {
            const original = String(subject || "").trim();
            if (!original) return;
            const standard = standardize(original);
            if (!groups[standard]) groups[standard] = [];
            if (!groups[standard].includes(original)) groups[standard].push(original);
        });
        return groups;
    }

    function highlightSubjectHtml(text, matcher) {
        const original = String(text || "");
        const terms = [...tokenSet(matcher)].filter((term) => term.length > 2);
        if (!original || !terms.length) return original;
        const escaped = original.replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[char]));
        const safeTerms = terms.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
        const pattern = new RegExp(`\\b(${safeTerms.join("|")})s?\\b`, "ig");
        return escaped.replace(pattern, '<mark class="subject-match-highlight">$1</mark>');
    }

    window.EngiLearnSubjectSimilarity = {
        normalize,
        standardize,
        canonicalKey,
        score,
        isSimilar,
        groupSubjects,
        highlightSubjectHtml,
        aliases: Object.fromEntries(standardToAliases.entries())
    };
}());