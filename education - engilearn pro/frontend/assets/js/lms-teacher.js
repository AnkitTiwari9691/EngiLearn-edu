const teacherState = {
    data: null,

    async init() {
        this.bindTabs();
        this.bindForms();
        await this.load();
    },

    async load() {
        try {
            if (!window.EngiLearnAPI || !EngiLearnAPI.token) {
                throw new Error("Login required");
            }
            this.data = await EngiLearnAPI.getTeacherDashboard();
            this.render();
        } catch (error) {
            document.querySelector(".lms-main").innerHTML = `<div class="lms-panel"><h2>Teacher login required</h2><p>${this.escape(error.message)}</p><a class="lms-btn" href="../index.html">Go to login</a></div>`;
        }
    },

    bindTabs() {
        document.addEventListener("click", (event) => {
            const tab = event.target.closest("[data-lms-tab]");
            if (!tab) return;
            document.querySelectorAll(".lms-tab").forEach((item) => item.classList.remove("active"));
            document.querySelectorAll(".lms-section").forEach((section) => section.classList.remove("active"));
            tab.classList.add("active");
            document.getElementById(tab.dataset.lmsTab)?.classList.add("active");
        });

        document.getElementById("teacherLogout")?.addEventListener("click", () => {
            EngiLearnAPI.logout().catch(() => {});
            EngiLearnAPI.token = "";
            localStorage.removeItem("mini_currentUser");
            window.location.href = "../index.html";
        });
    },

    bindForms() {
        document.getElementById("teacherAssignmentForm")?.addEventListener("submit", async (event) => {
            event.preventDefault();
            const formData = new FormData(event.target);
            try {
                await EngiLearnAPI.saveTeacherAssignment(formData);
                event.target.reset();
                await this.load();
            } catch (error) {
                alert(error.message);
            }
        });

        document.getElementById("teacherAttendanceForm")?.addEventListener("submit", async (event) => {
            event.preventDefault();
            const payload = Object.fromEntries(new FormData(event.target).entries());
            try {
                await EngiLearnAPI.markAttendance(payload);
                await this.load();
            } catch (error) {
                alert(error.message);
            }
        });

        document.getElementById("teacherMarksForm")?.addEventListener("submit", async (event) => {
            event.preventDefault();
            const payload = Object.fromEntries(new FormData(event.target).entries());
            try {
                await EngiLearnAPI.uploadMarks(payload);
                await this.load();
            } catch (error) {
                alert(error.message);
            }
        });
    },

    render() {
        const { teacher, students, assignments, submissions, attendance, marks, stats } = this.data;
        document.getElementById("teacherName").textContent = teacher.name || "Teacher";
        document.getElementById("teacherScope").textContent = `${teacher.branch || "Branch"} / Sem ${teacher.semester || "-"}`;
        document.getElementById("teacherGreeting").textContent = `Welcome, ${teacher.name || "Teacher"}`;
        document.getElementById("teacherStudentCount").textContent = stats.students;
        document.getElementById("teacherSubjectCount").textContent = stats.subjects;
        document.getElementById("teacherAssignmentCount").textContent = stats.assignments;
        document.getElementById("teacherSubmissionCount").textContent = stats.submissions;

        this.fillStudentSelect("attendanceStudent", students);
        this.fillStudentSelect("marksStudent", students);
        document.getElementById("teacherStudentCards").innerHTML = students.slice(0, 6).map((student) => this.studentCard(student)).join("") || this.empty("No assigned students yet.");
        document.getElementById("teacherAssignmentCards").innerHTML = assignments.slice(0, 6).map((item) => this.simpleCard(item.title, item.subject, item.deadline)).join("") || this.empty("No assignments yet.");
        document.getElementById("teacherStudentRows").innerHTML = students.map((student) => `
            <tr><td>${this.escape(student.name)}</td><td>${this.escape(student.email)}</td><td>${this.escape(student.branch)}</td><td>${this.escape(student.semester)}</td><td>${this.escape(student.status)}</td></tr>
        `).join("") || `<tr><td colspan="5">No students found.</td></tr>`;
        document.getElementById("teacherSubmissionRows").innerHTML = submissions.map((submission) => {
            const assignment = assignments.find((item) => item.id === submission.assignmentId);
            return `<tr><td>${this.escape(submission.studentName)}</td><td>${this.escape(assignment?.title || "Assignment")}</td><td>${this.escape(submission.status)}</td><td>${this.escape((submission.submittedAt || "").slice(0, 10))}</td></tr>`;
        }).join("") || `<tr><td colspan="4">No submissions yet.</td></tr>`;
        document.getElementById("attendanceCards").innerHTML = attendance.slice(0, 8).map((item) => this.simpleCard(item.studentName, item.subject, `${item.date} - ${item.status}`)).join("") || this.empty("No attendance saved yet.");
        document.getElementById("marksCards").innerHTML = marks.slice(0, 8).map((item) => this.simpleCard(item.studentName, item.subject, `${item.exam}: ${item.score}/${item.maxScore}`)).join("") || this.empty("No marks uploaded yet.");
    },

    fillStudentSelect(id, students) {
        const select = document.getElementById(id);
        if (!select) return;
        select.innerHTML = students.map((student) => `<option value="${student.id}">${this.escape(student.name)} - ${this.escape(student.rollNumber || student.email)}</option>`).join("");
    },

    studentCard(student) {
        return this.simpleCard(student.name, student.email, `${student.branch} / Sem ${student.semester}`);
    },

    simpleCard(title, subtitle, meta) {
        return `<article class="lms-card"><h3>${this.escape(title)}</h3><p>${this.escape(subtitle || "")}</p><span>${this.escape(meta || "")}</span></article>`;
    },

    empty(message) {
        return `<div class="lms-empty">${this.escape(message)}</div>`;
    },

    escape(value) {
        return String(value ?? "").replace(/[&<>"']/g, (char) => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        }[char]));
    }
};

document.addEventListener("DOMContentLoaded", () => teacherState.init());
