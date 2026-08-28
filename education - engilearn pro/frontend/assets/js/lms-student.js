const studentLms = {
    data: null,
    activeLecture: null,

    formatStudentId(seed) {
        const text = String(seed ?? "").trim();
        const numeric = Number.parseInt(text.replace(/\D/g, ""), 10);
        if (Number.isFinite(numeric) && numeric > 0) {
            return `EL-${String(numeric).padStart(2, "0")}`;
        }

        let hash = 0;
        for (const char of text || "student") {
            hash = ((hash << 5) - hash + char.charCodeAt(0)) | 0;
        }
        return `EL-${String(Math.abs(hash % 9999) || 1).padStart(2, "0")}`;
    },

    isGeneratedStudentId(value) {
        const text = String(value || "").trim();
        return !text || /^ROLL\d{4,}$/i.test(text) || /^EN\d+$/i.test(text) || /^Student Account$/i.test(text);
    },

    studentAccountId(user = {}) {
        const candidates = [user.studentId, user.engilearnId, user.rollNumber]
            .map((value) => String(value || "").trim())
            .filter(Boolean);
        const existing = candidates.find((value) => !this.isGeneratedStudentId(value));
        if (existing) return existing.replace(/^EL(?=\d)/i, "EL-").toUpperCase();
        return this.formatStudentId(user.id || user.email || user.name || "student");
    },

    normalizeStudentProfile(user = {}) {
        const accountId = this.studentAccountId(user);
        const photoUrl = String(user.photoUrl || user.profilePhoto || user.avatarUrl || "").trim();
        return {
            ...user,
            studentId: user.studentId && !this.isGeneratedStudentId(user.studentId) ? user.studentId : accountId,
            engilearnId: user.engilearnId && !this.isGeneratedStudentId(user.engilearnId) ? user.engilearnId : accountId,
            rollNumber: user.rollNumber && !this.isGeneratedStudentId(user.rollNumber) ? user.rollNumber : accountId,
            photoUrl,
            profilePhoto: photoUrl
        };
    },

    profilePhotoUrl(user = {}) {
        return this.safeUrl(user.profilePhoto || user.photoUrl || user.avatarUrl);
    },

    init() {
        this.bindTabs();
        window.addEventListener("hashchange", () => this.openTabFromHash());
        this.bindLogout();
        this.bindProfileSummary();
        document.getElementById("aiChatForm").addEventListener("submit", (event) => this.askAi(event));
        this.load();
    },

    bindTabs() {
        document.querySelectorAll("[data-lms-tab], [data-lms-tab-target]").forEach((button) => {
            button.addEventListener("click", (event) => {
                event.preventDefault();
                const target = button.dataset.lmsTab || button.dataset.lmsTabTarget;
                this.openTab(target);
                if (target) window.history.replaceState(null, "", `#${target}`);
            });
        });
    },

    bindLogout() {
        ["studentLogout", "studentTopLogout"].forEach((id) => {
            document.getElementById(id)?.addEventListener("click", async (event) => {
                event.preventDefault();
                try {
                    await EngiLearnAPI.logout();
                } catch (error) {
                    console.warn("Logout request failed, clearing local session.", error);
                }
                EngiLearnAPI.token = "";
                localStorage.removeItem("mini_currentUser");
                window.location.href = "../index.html";
            });
        });
    },

    bindProfileSummary() {
        const trigger = document.getElementById("studentSummaryTrigger");
        if (!trigger) return;

        trigger.addEventListener("click", () => this.toggleProfileSummary());
        trigger.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                this.toggleProfileSummary();
            }
        });
        document.addEventListener("click", (event) => {
            const popup = document.getElementById("studentSummaryPopup");
            if (!popup || !popup.classList.contains("open")) return;
            if (!popup.contains(event.target) && !trigger.contains(event.target)) {
                this.closeProfileSummary();
            }
        });
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") this.closeProfileSummary();
        });
    },

    toggleProfileSummary() {
        const popup = document.getElementById("studentSummaryPopup");
        if (!popup || !this.data?.user) return;
        if (popup.classList.contains("open")) {
            this.closeProfileSummary();
            return;
        }

        popup.innerHTML = this.profileSummaryPopupHtml();
        popup.classList.add("open");
        popup.setAttribute("aria-hidden", "false");
    },

    closeProfileSummary() {
        const popup = document.getElementById("studentSummaryPopup");
        if (!popup) return;
        popup.classList.remove("open");
        popup.setAttribute("aria-hidden", "true");
    },

    profileSummaryPopupHtml() {
        const user = this.normalizeStudentProfile(this.data.user || {});
        this.data.user = user;
        const progress = this.data.progress || { completed: 0, total: 0, percent: 0 };
        const value = (field, fallback = "") => this.escapeHtml(user[field] || fallback);
        const photoUrl = this.profilePhotoUrl(user);
        const accountId = this.studentAccountId(user);
        const initials = this.escapeHtml(String(user.name || "Student").split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "ST");
        const socialLinks = [
            ["linkedin", "LinkedIn", "fa-brands fa-linkedin"],
            ["facebook", "Facebook", "fa-brands fa-facebook"],
            ["instagram", "Instagram", "fa-brands fa-instagram"]
        ].filter(([field]) => this.safeUrl(user[field]));

        return `
            <div class="student-summary-card" role="dialog" aria-modal="false" aria-label="Student profile summary">
                <button class="student-summary-close" type="button" aria-label="Close profile summary" onclick="studentLms.closeProfileSummary()"><i class="fas fa-times"></i></button>
                <div class="student-summary-head">
                    <div class="student-summary-photo">
                        ${photoUrl ? `<img src="${photoUrl}" alt="${value("name", "Student")} photo">` : `<span>${initials}</span>`}
                    </div>
                    <div>
                        <span class="lms-badge">Student Profile</span>
                        <h3>${value("name", "Student")}</h3>
                        <p>${value("branch", "Branch not added")} | Semester ${value("semester", "-")}</p>
                    </div>
                </div>
                <div class="student-summary-list">
                    <p><strong>Email</strong><span>${value("email", "Not added")}</span></p>
                    <p><strong>EngiLearn ID</strong><span>${this.escapeHtml(accountId)}</span></p>
                    <p><strong>Course</strong><span>${value("course", "Not added")}</span></p>
                    <p><strong>Progress</strong><span>${progress.percent || 0}% (${progress.completed || 0}/${progress.total || 0})</span></p>
                </div>
                <div class="student-summary-socials">
                    ${socialLinks.map(([field, label, icon]) => `<a href="${this.safeUrl(user[field])}" target="_blank" rel="noopener noreferrer"><i class="${icon}"></i><span>${label}</span></a>`).join("") || `<span>No social links added</span>`}
                </div>
                <button class="lms-btn wide" type="button" onclick="studentLms.openTab('profile'); studentLms.closeProfileSummary();"><i class="fas fa-user-gear"></i> Open Full Profile</button>
            </div>
        `;
    },

    openTab(id) {
        if (!id || !document.getElementById(id)) return;
        document.querySelectorAll(".lms-tab").forEach((tab) => tab.classList.toggle("active", tab.dataset.lmsTab === id));
        document.querySelectorAll(".lms-section").forEach((section) => section.classList.toggle("active", section.id === id));
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    },

    openTabFromHash() {
        const tab = window.location.hash.replace("#", "");
        if (tab && document.getElementById(tab)) {
            this.openTab(tab);
        }
    },

    async load() {
        try {
            this.data = await EngiLearnAPI.getStudentDashboard();
            localStorage.setItem("mini_currentUser", JSON.stringify(this.data.user || {}));
            this.mergeLocalWatchHistory();
            this.render();
        } catch (error) {
            const currentUser = JSON.parse(localStorage.getItem("mini_currentUser") || "null");
            if (!currentUser || currentUser.role === "Admin") {
                document.querySelector(".lms-main").innerHTML = `<div class="lms-panel"><h2>Login required</h2><p>${error.message}</p><a class="lms-btn" href="../index.html">Go to login</a></div>`;
                return;
            }

            this.data = this.localDashboard(currentUser);
            this.mergeLocalWatchHistory();
            this.render();
        }
    },

    mergeLocalWatchHistory() {
        const user = this.data?.user || JSON.parse(localStorage.getItem("mini_currentUser") || "{}");
        const localHistory = JSON.parse(localStorage.getItem("student_watch_history") || "[]")
            .filter((item) => !item.email || !user.email || String(item.email).toLowerCase() === String(user.email).toLowerCase());
        const combined = [...(this.data.watchHistory || [])];
        localHistory.forEach((item) => {
            const index = combined.findIndex((entry) => String(entry.lectureId) === String(item.lectureId));
            if (index >= 0) {
                combined[index] = { ...combined[index], ...item, progress: Math.max(Number(combined[index].progress || 0), Number(item.progress || 0)) };
            } else {
                combined.push(item);
            }
        });
        this.data.watchHistory = combined;
        const completed = combined.filter((item) => Number(item.progress || 0) >= 95).length;
        this.data.progress = {
            ...(this.data.progress || {}),
            completed,
            total: this.data.lectures?.length || combined.length,
            percent: (this.data.lectures?.length || combined.length) ? Math.round((completed / (this.data.lectures?.length || combined.length)) * 100) : 0
        };
    },

    localDashboard(user) {
        const savedProfile = JSON.parse(localStorage.getItem(this.localProfileKey(user.email)) || "{}");
        const identityLock = {
            studentId: user.studentId,
            engilearnId: user.engilearnId,
            rollNumber: user.rollNumber
        };
        const mergedUser = { ...user, ...savedProfile };
        Object.entries(identityLock).forEach(([key, value]) => {
            if (value && !this.isGeneratedStudentId(value)) mergedUser[key] = value;
        });
        const accountId = this.studentAccountId(mergedUser);
        const watchHistory = JSON.parse(localStorage.getItem("student_watch_history") || "[]");
        const bookmarks = JSON.parse(localStorage.getItem("student_bookmarks") || "[]");
        const submissions = JSON.parse(localStorage.getItem("student_submissions") || "[]");
        const lectures = [];
        const completed = watchHistory.filter((item) => Number(item.progress) >= 95).length;

        return {
            user: {
                name: mergedUser.name || mergedUser.email?.split("@")[0] || "Student",
                email: mergedUser.email || "",
                studentId: mergedUser.studentId || mergedUser.engilearnId || accountId,
                engilearnId: mergedUser.engilearnId || mergedUser.studentId || accountId,
                rollNumber: this.isGeneratedStudentId(mergedUser.rollNumber) ? accountId : mergedUser.rollNumber,
                branch: mergedUser.branch || "",
                semester: mergedUser.semester || "",
                course: mergedUser.course || "",
                phone: mergedUser.phone || "",
                admissionYear: mergedUser.admissionYear || "",
                status: mergedUser.status || "Active",
                photoUrl: mergedUser.photoUrl || mergedUser.profilePhoto || mergedUser.avatarUrl || "",
                profilePhoto: mergedUser.profilePhoto || mergedUser.photoUrl || mergedUser.avatarUrl || "",
                linkedin: mergedUser.linkedin || "",
                facebook: mergedUser.facebook || "",
                instagram: mergedUser.instagram || "",
                about: mergedUser.about || ""
            },
            announcement: "Welcome to EngiLearn LMS",
            lectures,
            assignments: [],
            notifications: [],
            liveClasses: [],
            watchHistory,
            bookmarks,
            submissions,
            paymentSlips: [],
            progress: {
                completed,
                total: lectures.length,
                percent: lectures.length ? Math.round((completed / lectures.length) * 100) : 0
            }
        };
    },

    render() {
        const { progress } = this.data;
        const user = this.normalizeStudentProfile(this.data.user || {});
        this.data.user = user;
        const accountId = this.studentAccountId(user);
        document.getElementById("studentName").textContent = user.name;
        document.getElementById("studentScope").textContent = `${accountId} | ${user.branch} | Sem ${user.semester}`;
        document.getElementById("studentGreeting").textContent = `Welcome back, ${user.name}`;
        document.getElementById("announcementText").textContent = this.data.announcement || "No announcement right now.";
        document.getElementById("statLectures").textContent = this.data.lectures.length;
        document.getElementById("statCompleted").textContent = progress.completed;
        document.getElementById("statAssignments").textContent = this.data.assignments.length;
        document.getElementById("statProgress").textContent = `${progress.percent}%`;
        this.renderFilters();
        this.renderLectures();
        this.renderWatchHistory();
        this.renderAssignments();
        this.renderNotifications();
        this.renderLive();
        this.renderProfile();
        this.renderPaymentSlips();
        this.openTabFromHash();
    },

    renderFilters() {
        const subjects = [...new Set(this.data.lectures.map((lecture) => lecture.subject).filter(Boolean))];
        const teachers = [...new Set(this.data.lectures.map((lecture) => lecture.teacherName).filter(Boolean))];
        document.getElementById("subjectFilter").innerHTML = `<option value="all">All subjects</option>${subjects.map((subject) => `<option>${this.escapeHtml(subject)}</option>`).join("")}`;
        document.getElementById("teacherFilter").innerHTML = `<option value="all">All teachers</option>${teachers.map((teacher) => `<option>${this.escapeHtml(teacher)}</option>`).join("")}`;
        ["lectureSearch", "subjectFilter", "teacherFilter"].forEach((id) => {
            document.getElementById(id).addEventListener("input", () => this.renderLectures());
        });
    },

    progressFor(lectureId) {
        return this.data.watchHistory.find((item) => String(item.lectureId) === String(lectureId)) || { progress: 0, lastPosition: 0 };
    },

    isBookmarked(lectureId) {
        return this.data.bookmarks.some((item) => String(item.lectureId) === String(lectureId));
    },

    filteredLectures() {
        const search = document.getElementById("lectureSearch")?.value.toLowerCase() || "";
        const subject = document.getElementById("subjectFilter")?.value || "all";
        const teacher = document.getElementById("teacherFilter")?.value || "all";
        return this.data.lectures.filter((lecture) => {
            const haystack = `${lecture.title} ${lecture.subject} ${lecture.chapter} ${lecture.teacherName}`.toLowerCase();
            return haystack.includes(search)
                && (subject === "all" || lecture.subject === subject)
                && (teacher === "all" || lecture.teacherName === teacher);
        });
    },

    renderLectures() {
        const cards = this.filteredLectures().map((lecture) => this.lectureCard(lecture)).join("");
        const fallback = `<div class="lms-empty">No lectures found for your filters.</div>`;
        document.getElementById("lectureGrid").innerHTML = cards || fallback;
        const continueLectures = [...this.data.lectures].sort((a, b) => this.progressFor(b.id).progress - this.progressFor(a.id).progress).slice(0, 4);
        document.getElementById("continueGrid").innerHTML = continueLectures.map((lecture) => this.lectureCard(lecture)).join("") || fallback;
    },

    renderWatchHistory() {
        const history = [...(this.data.watchHistory || [])]
            .sort((a, b) => new Date(b.lastWatchedAt || 0) - new Date(a.lastWatchedAt || 0))
            .slice(0, 8);
        const html = history.map((item) => {
            const lecture = this.data.lectures.find((entry) => String(entry.id) === String(item.lectureId));
            const title = this.escapeHtml(item.lectureTitle || lecture?.title || `Lecture ${item.lectureId}`);
            return `
                <article class="lms-card">
                    <span class="lms-badge">${this.escapeHtml(item.contentType || lecture?.sourceType || "video")}</span>
                    <h3>${title}</h3>
                    <p class="lms-meta">${this.escapeHtml(item.subject || lecture?.subject || "Subject")} | ${this.escapeHtml(item.teacher || lecture?.teacherName || "Teacher")}</p>
                    <div class="lms-progress"><span style="width:${Math.min(Number(item.progress || 0), 100)}%"></span></div>
                    <p class="lms-meta">${Math.round(Number(item.progress || 0))}% watched | ${item.lastWatchedAt ? new Date(item.lastWatchedAt).toLocaleString() : ""}</p>
                </article>
            `;
        }).join("");
        const target = document.getElementById("watchHistoryGrid");
        if (target) target.innerHTML = html || `<div class="lms-empty">No watch history yet. Open Video Lectures and watch a video.</div>`;
    },

    lectureCard(lecture) {
        const progress = this.progressFor(lecture.id).progress || 0;
        const title = this.escapeHtml(lecture.title);
        const subject = this.escapeHtml(lecture.subject);
        const chapter = this.escapeHtml(lecture.chapter || "Chapter");
        const teacher = this.escapeHtml(lecture.teacherName || "Teacher");
        const thumb = this.safeUrl(lecture.thumbnailUrl);
        const notes = this.safeUrl(lecture.notesUrl);
        return `
            <article class="lms-card">
                <div class="lecture-thumb">${thumb ? `<img src="${thumb}" alt="${title} thumbnail">` : `<i class="fas fa-play"></i>`}</div>
                <h3>${title}</h3>
                <p class="lms-meta">${subject} | ${chapter} | ${teacher}</p>
                <div class="lms-progress" aria-label="Progress"><span style="width:${Math.min(progress, 100)}%"></span></div>
                <p class="lms-meta">${Math.round(progress)}% completed</p>
                <div class="lms-actions">
                    <button class="lms-btn" onclick="studentLms.playLecture(${lecture.id})"><i class="fas fa-play"></i> Watch</button>
                    <button class="lms-btn secondary" onclick="studentLms.toggleBookmark(${lecture.id})"><i class="fas fa-bookmark"></i> ${this.isBookmarked(lecture.id) ? "Saved" : "Save"}</button>
                    ${notes ? `<a class="lms-btn secondary" href="${notes}" download><i class="fas fa-download"></i> Notes</a>` : ""}
                </div>
            </article>
        `;
    },

    async playLecture(id) {
        let lecture;
        let history;
        try {
            ({ lecture, history } = await EngiLearnAPI.getLecture(id));
        } catch (error) {
            lecture = this.data.lectures.find((item) => Number(item.id) === Number(id));
            history = this.progressFor(id);
            if (!lecture) return;
        }
        this.activeLecture = lecture;
        const isEmbed = lecture.sourceType !== "mp4" && !lecture.videoUrl.endsWith(".mp4") && !lecture.videoUrl.startsWith("/uploads/");
        document.getElementById("lecturePlayer").innerHTML = `
            <h2>${this.escapeHtml(lecture.title)}</h2>
            <p class="lms-meta">${this.escapeHtml(lecture.description || "")}</p>
            ${isEmbed
                ? `<iframe src="${this.safeUrl(lecture.videoUrl)}" title="${this.escapeHtml(lecture.title)}" allowfullscreen></iframe>`
                : `<video id="activeVideo" src="${this.safeUrl(lecture.videoUrl)}" controls controlsList="nodownload" preload="metadata"></video>`}
        `;
        const video = document.getElementById("activeVideo");
        if (video) {
            video.currentTime = Number(history.lastPosition || 0);
            video.addEventListener("timeupdate", () => {
                if (!video.duration) return;
                const progress = (video.currentTime / video.duration) * 100;
                if (Math.round(video.currentTime) % 8 === 0) {
                    this.saveLocalProgress(id, { progress, lastPosition: video.currentTime });
                    EngiLearnAPI.saveProgress(id, { progress, lastPosition: video.currentTime }).catch(() => {});
                }
            });
        } else {
            const progress = { progress: Math.max(10, history.progress || 0), lastPosition: 0 };
            this.saveLocalProgress(id, progress);
            await EngiLearnAPI.saveProgress(id, progress).catch(() => {});
        }
        this.openTab("lectures");
    },

    async toggleBookmark(id) {
        try {
            await EngiLearnAPI.toggleBookmark(id);
            await this.load();
        } catch (error) {
            const bookmarks = JSON.parse(localStorage.getItem("student_bookmarks") || "[]");
            const exists = bookmarks.some((item) => Number(item.lectureId) === Number(id));
            const next = exists ? bookmarks.filter((item) => Number(item.lectureId) !== Number(id)) : [...bookmarks, { lectureId: id }];
            localStorage.setItem("student_bookmarks", JSON.stringify(next));
            this.data.bookmarks = next;
            this.renderLectures();
        }
    },

    renderAssignments() {
        document.getElementById("assignmentGrid").innerHTML = this.data.assignments.map((assignment) => {
            const submitted = this.data.submissions.find((item) => Number(item.assignmentId) === Number(assignment.id));
            const fileUrl = this.safeUrl(assignment.fileUrl);
            return `
                <article class="lms-card">
                    <span class="lms-badge">${this.escapeHtml(assignment.subject)}</span>
                    <h3>${this.escapeHtml(assignment.title)}</h3>
                    <p class="lms-meta">Deadline: ${this.escapeHtml(assignment.deadline)}</p>
                    <p>${this.escapeHtml(assignment.description || "")}</p>
                    ${fileUrl ? `<a class="lms-btn secondary" href="${fileUrl}" download><i class="fas fa-download"></i> Download</a>` : ""}
                    <form class="lms-form wide" onsubmit="studentLms.submitAssignment(event, ${assignment.id})">
                        <label class="wide">Answer<textarea name="text" placeholder="Write submission note">${this.escapeHtml(submitted?.text || "")}</textarea></label>
                        <label class="wide">Upload file<input name="file" type="file"></label>
                        <button class="lms-btn wide" type="submit"><i class="fas fa-upload"></i> ${submitted ? "Update Submission" : "Submit Assignment"}</button>
                    </form>
                </article>
            `;
        }).join("") || `<div class="lms-empty">No assignments for your course yet.</div>`;
    },

    async submitAssignment(event, id) {
        event.preventDefault();
        const form = new FormData(event.target);
        try {
            await EngiLearnAPI.submitAssignment(id, form);
            await this.load();
        } catch (error) {
            const submissions = JSON.parse(localStorage.getItem("student_submissions") || "[]").filter((item) => Number(item.assignmentId) !== Number(id));
            submissions.push({ assignmentId: id, text: form.get("text") || "", submittedAt: new Date().toISOString() });
            localStorage.setItem("student_submissions", JSON.stringify(submissions));
            this.data.submissions = submissions;
            this.renderAssignments();
        }
    },

    saveLocalProgress(id, progress) {
        const user = this.data?.user || JSON.parse(localStorage.getItem("mini_currentUser") || "{}");
        const lecture = this.data.lectures.find((item) => String(item.id) === String(id));
        const history = JSON.parse(localStorage.getItem("student_watch_history") || "[]").filter((item) => !(String(item.lectureId) === String(id) && String(item.email || "") === String(user.email || "")));
        history.push({
            lectureId: String(id),
            userId: user.id || "local-student",
            studentName: user.name || user.email || "Student",
            email: user.email || "",
            lectureTitle: lecture?.title || `Lecture ${id}`,
            subject: lecture?.subject || "",
            branch: lecture?.branch || user.branch || "",
            semester: lecture?.semester || user.semester || "",
            teacher: lecture?.teacherName || "",
            contentType: lecture?.sourceType || "video",
            lastWatchedAt: new Date().toISOString(),
            ...progress
        });
        localStorage.setItem("student_watch_history", JSON.stringify(history));
        this.data.watchHistory = history;
        this.renderWatchHistory();
    },

    renderNotifications() {
        document.getElementById("notificationGrid").innerHTML = this.data.notifications.map((item) => `
            <article class="lms-card">
                <span class="lms-badge">${this.escapeHtml(item.audience === "Personal" ? "Personal" : (item.audience || "All Students"))}</span>
                <h3>${this.escapeHtml(item.title)}</h3>
                <p>${this.escapeHtml(item.message)}</p>
                <p class="lms-meta">${item.createdAt ? new Date(item.createdAt).toLocaleString() : ""}</p>
            </article>
        `).join("") || `<div class="lms-empty">No notifications.</div>`;
    },

    renderLive() {
        const html = this.data.liveClasses.map((item) => `
            <article class="lms-card">
                <span class="lms-badge">${this.escapeHtml(item.status)}</span>
                <h3>${this.escapeHtml(item.title)}</h3>
                <p class="lms-meta">${this.escapeHtml(item.subject)} | ${this.escapeHtml(item.teacherName || "Teacher")}</p>
                <p>${item.startsAt ? new Date(item.startsAt).toLocaleString() : ""}</p>
                <a class="lms-btn" href="${this.safeUrl(item.meetingUrl)}" target="_blank" rel="noopener noreferrer"><i class="fas fa-video"></i> Join Class</a>
            </article>
        `).join("") || `<div class="lms-empty">No live classes scheduled.</div>`;
        document.getElementById("liveGrid").innerHTML = html;
        document.getElementById("overviewLiveGrid").innerHTML = html;
    },

    paymentKey(payment) {
        return String(payment?.id ?? payment?.providerOrderId ?? payment?.providerPaymentId ?? payment?.receipt ?? payment?.createdAt ?? "").trim();
    },

    isCompletedPayment(payment) {
        const status = String(payment?.status || "").toLowerCase();
        const gatewayStatus = String(payment?.gatewayStatus || "").toLowerCase();
        return status === "paid" || gatewayStatus === "captured" || Boolean(payment?.verifiedAt && payment?.providerPaymentId);
    },

    paymentAcademicLine(payment) {
        const user = this.data?.user || {};
        const studentId = String(payment?.studentId || payment?.engilearnId || payment?.rollNumber || user.studentId || user.engilearnId || user.rollNumber || "").trim();
        const branch = String(payment?.branchName || payment?.studentBranch || payment?.branch || user.branch || "").trim();
        const rawSemester = payment?.unlockedSemester ?? payment?.semester ?? payment?.semesterNumber ?? payment?.selectedSemester ?? user.semester ?? "";
        const semester = String(rawSemester || "").match(/\d+/)?.[0] || "";
        const parts = [];
        if (studentId) parts.push(`Student ID: ${studentId}`);
        if (branch) parts.push(`Branch: ${branch}`);
        if (semester) parts.push(`Semester: ${semester}`);
        return parts.join(" | ");
    },

    renderPaymentSlips() {
        const grid = document.getElementById("paymentSlipGrid");
        if (!grid) return;
        const payments = (this.data.paymentSlips || []).filter((payment) => this.isCompletedPayment(payment)).slice().sort((a, b) => new Date(b.verifiedAt || b.paidAt || b.createdAt || 0) - new Date(a.verifiedAt || a.paidAt || a.createdAt || 0));
        grid.innerHTML = payments.map((payment) => {
            const key = encodeURIComponent(this.paymentKey(payment));
            const academicLine = this.paymentAcademicLine(payment);
            return `<article class="lms-card">
                <span class="lms-badge">${this.escapeHtml(payment.status || "Created")}</span>
                <h3>${this.escapeHtml(payment.type || payment.product || "EngiLearn Access")}</h3>
                <p class="lms-meta">${this.escapeHtml(payment.provider || "Razorpay")} | ${this.escapeHtml(payment.currency || "INR")} ${this.escapeHtml(payment.amount || 0)}</p>
                ${academicLine ? `<p class="lms-meta"><i class="fas fa-unlock"></i> ${this.escapeHtml(academicLine)}</p>` : ""}
                <p>Order: ${this.escapeHtml(payment.providerOrderId || payment.receipt || "Not added")}</p>
                <p>Payment: ${this.escapeHtml(payment.providerPaymentId || payment.paymentId || payment.utr || "Waiting for payment")}</p>
                <p class="lms-meta">${this.escapeHtml(this.formatDate(payment.verifiedAt || payment.paidAt || payment.createdAt || payment.date))}</p>
                <div class="payment-slip-actions"><button class="lms-btn secondary" type="button" onclick="studentLms.viewPaymentSlip('${key}')"><i class="fas fa-eye"></i> View Receipt</button><button class="lms-btn" type="button" onclick="studentLms.downloadPaymentSlip('${key}')"><i class="fas fa-download"></i> Download Receipt</button></div>
            </article>`;
        }).join("") || `<div class="lms-empty">No payment slips saved for this student yet.</div>`;
    },

    async viewPaymentSlip(encodedKey) {
        const key = decodeURIComponent(String(encodedKey || ""));
        const payment = (this.data.paymentSlips || []).find((item) => this.paymentKey(item) === key);
        if (!payment) return;
        try {
            await EngiLearnAPI.viewPaymentReceipt(key);
        } catch (error) {
            window.alert(error.message || "PDF receipt view failed.");
        }
    },

    async downloadPaymentSlip(encodedKey) {
        const key = decodeURIComponent(String(encodedKey || ""));
        const payment = (this.data.paymentSlips || []).find((item) => this.paymentKey(item) === key);
        if (!payment) return;
        try {
            await EngiLearnAPI.downloadPaymentReceipt(key);
        } catch (error) {
            window.alert(error.message || "PDF receipt download failed.");
        }
    },

    renderProfile() {
        const user = this.normalizeStudentProfile(this.data.user || {});
        this.data.user = user;
        const accountId = this.studentAccountId(user);
        const progress = this.data.progress || { completed: 0, total: 0, percent: 0 };
        const completedAssignments = this.data.submissions.length;
        const nextLiveClass = this.data.liveClasses[0];
        const value = (field, fallback = "") => this.escapeHtml(user[field] || fallback);
        const raw = (field, fallback = "") => String(user[field] || fallback || "");
        const photoUrl = this.profilePhotoUrl(user);
        const initials = this.escapeHtml(raw("name", "Student").split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "ST");
        const socialLinks = [
            ["linkedin", "LinkedIn", "fa-brands fa-linkedin"],
            ["facebook", "Facebook", "fa-brands fa-facebook"],
            ["instagram", "Instagram", "fa-brands fa-instagram"]
        ].filter(([field]) => this.safeUrl(user[field]));

        document.getElementById("profileSummary").innerHTML = `
            <article class="lms-card lms-profile-card">
                <span class="lms-badge">Editable Student Record</span>
                <div class="student-profile-hero">
                    <div class="student-profile-photo">
                        ${photoUrl ? `<img src="${photoUrl}" alt="${value("name", "Student")} photo">` : `<span>${initials}</span>`}
                    </div>
                    <div>
                        <h3>${value("name", "Student")}</h3>
                        <p class="lms-meta">${value("branch", "Branch not added")} | Semester ${value("semester", "-")}</p>
                        <div class="student-social-links">
                            ${socialLinks.map(([field, label, icon]) => `<a href="${this.safeUrl(user[field])}" target="_blank" rel="noopener noreferrer"><i class="${icon}"></i> ${label}</a>`).join("") || `<span>No social links added</span>`}
                        </div>
                    </div>
                </div>
                <form class="lms-form wide" id="studentProfileForm">
                    <label>Full Name<input name="name" value="${value("name", "Student")}" required></label>
                    <label>Email<input name="email" type="email" value="${value("email")}" required></label>
                    <label>EngiLearn ID<input name="rollNumber" value="${this.escapeHtml(accountId)}" readonly></label>
                    <input type="hidden" name="studentId" value="${this.escapeHtml(accountId)}">
                    <input type="hidden" name="engilearnId" value="${this.escapeHtml(accountId)}">
                    <label>Phone<input name="phone" value="${value("phone")}" placeholder="Mobile number"></label>
                    <label>Branch<input name="branch" value="${value("branch", "Computer Science & Engineering")}"></label>
                    <label>Semester<input name="semester" value="${value("semester", "3")}"></label>
                    <label>Course<input name="course" value="${value("course", "")}"></label>
                    <label>Admission Year<input name="admissionYear" value="${value("admissionYear", "2026")}"></label>
                    <label class="wide">Profile Photo URL<input name="photoUrl" value="${this.escapeHtml(raw("photoUrl") || raw("profilePhoto") || raw("avatarUrl"))}" placeholder="Paste image URL or data:image URL"></label>
                    <label class="wide">Upload Profile Photo<input id="studentProfilePhotoFile" type="file" accept="image/*"></label>
                    <label>LinkedIn<input name="linkedin" value="${value("linkedin")}" placeholder="https://www.linkedin.com/in/..."></label>
                    <label>Facebook<input name="facebook" value="${value("facebook")}" placeholder="https://www.facebook.com/..."></label>
                    <label>Instagram<input name="instagram" value="${value("instagram")}" placeholder="https://www.instagram.com/..."></label>
                    <label class="wide">About Student<textarea name="about" placeholder="Write student information, goals, address, or notes">${value("about", "")}</textarea></label>
                    <button class="lms-btn wide" type="submit"><i class="fas fa-save"></i> Save Student Information</button>
                    <div class="lms-form-status" id="profileSaveStatus" aria-live="polite"></div>
                </form>
            </article>
            <article class="lms-card">
                <span class="lms-badge">Saved Information</span>
                <h3>Profile Summary</h3>
                <div class="lms-info-list">
                    <p><strong>Email</strong><span>${value("email", "Not added")}</span></p>
                    <p><strong>EngiLearn ID</strong><span>${this.escapeHtml(accountId)}</span></p>
                    <p><strong>Phone</strong><span>${value("phone", "Not added")}</span></p>
                    <p><strong>Branch</strong><span>${value("branch", "Not added")}</span></p>
                    <p><strong>Semester</strong><span>Semester ${value("semester", "-")}</span></p>
                    <p><strong>Course</strong><span>${value("course", "Not added")}</span></p>
                    <p><strong>Admission Year</strong><span>${value("admissionYear", "Not added")}</span></p>
                    <p><strong>Status</strong><span>${value("status", "Active")}</span></p>
                    <p><strong>LinkedIn</strong><span>${this.socialSummary("linkedin", "Not added")}</span></p>
                    <p><strong>Facebook</strong><span>${this.socialSummary("facebook", "Not added")}</span></p>
                    <p><strong>Instagram</strong><span>${this.socialSummary("instagram", "Not added")}</span></p>
                </div>
            </article>
            <article class="lms-card">
                <span class="lms-badge">Learning Progress</span>
                <h3>${progress.percent}% completed</h3>
                <div class="lms-progress" aria-label="Student progress"><span style="width:${progress.percent}%"></span></div>
                <p class="lms-meta">${progress.completed} of ${progress.total} lectures completed</p>
                <p>${this.data.lectures.length} lectures available</p>
                <p>${this.data.assignments.length} assignments assigned</p>
                <p>${completedAssignments} submissions saved</p>
            </article>
            <article class="lms-card">
                <span class="lms-badge">Watched Videos</span>
                <h3>Video History</h3>
                ${this.watchedVideoSummary()}
            </article>
            <article class="lms-card">
                <span class="lms-badge">Access</span>
                <h3>Student Features</h3>
                <p>Lectures, assignments, notifications, live classes, AI support, profile, bookmarks, and progress tracking are enabled.</p>
                <div class="lms-info-list">
                    <p><strong>Tool Hub</strong><span>${user.toolHubAccess ? "Free access granted" : "Paid or locked"}</span></p>
                    <p><strong>Most Repeated Questions</strong><span>${user.repeatedQuestionsAccess ? "Free access granted" : "Free/paid by admin setting"}</span></p>
                    <p><strong>Subscriber Videos</strong><span>${user.subscriberVideoAccess ? "Free access granted" : "Standard access"}</span></p>
                </div>
                <p class="lms-meta">Next live class: ${nextLiveClass ? `${this.escapeHtml(nextLiveClass.title)} (${this.escapeHtml(nextLiveClass.status)})` : "No live class scheduled"}</p>
            </article>
        `;
        document.getElementById("studentProfileForm").addEventListener("submit", (event) => this.saveProfile(event));
        document.getElementById("studentProfilePhotoFile")?.addEventListener("change", (event) => this.previewProfilePhoto(event));
    },

    previewProfilePhoto(event) {
        const file = event.target.files?.[0];
        const form = document.getElementById("studentProfileForm");
        const input = form?.elements?.photoUrl;
        const status = document.getElementById("profileSaveStatus");
        if (!file || !input) return;
        if (!/^image\//i.test(file.type)) {
            if (status) status.textContent = "Please choose an image file for the profile photo.";
            event.target.value = "";
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            const dataUrl = String(reader.result || "");
            input.value = dataUrl;
            this.data.user.photoUrl = dataUrl;
            this.data.user.profilePhoto = dataUrl;
            document.querySelectorAll(".student-profile-photo").forEach((photo) => {
                photo.innerHTML = `<img src="${this.escapeHtml(dataUrl)}" alt="${this.escapeHtml(this.data.user.name || "Student")} photo">`;
            });
            if (status) status.textContent = "Photo ready. Click Save Student Information to keep it."; 
        };
        reader.readAsDataURL(file);
    },

    watchedVideoSummary() {
        const history = [...(this.data.watchHistory || [])]
            .sort((a, b) => new Date(b.lastWatchedAt || 0) - new Date(a.lastWatchedAt || 0))
            .slice(0, 6);

        if (!history.length) {
            return `<p class="lms-meta">No videos watched yet. Open a lecture to start tracking progress.</p>`;
        }

        return `
            <div class="lms-info-list">
                ${history.map((item) => {
                    const lecture = this.data.lectures.find((entry) => Number(entry.id) === Number(item.lectureId));
                    return `<p><strong>${this.escapeHtml(lecture?.title || `Lecture #${item.lectureId}`)}</strong><span>${Math.round(Number(item.progress || 0))}% watched</span></p>`;
                }).join("")}
            </div>
        `;
    },

    socialSummary(field, fallback) {
        const url = this.safeUrl(this.data.user?.[field]);
        return url ? `<a href="${url}" target="_blank" rel="noopener noreferrer">${this.escapeHtml(this.data.user[field])}</a>` : this.escapeHtml(fallback);
    },

    formatDate(value) {
        const date = value ? new Date(value) : null;
        return date && !Number.isNaN(date.getTime()) ? date.toLocaleString() : "Not added";
    },

    async saveProfile(event) {
        event.preventDefault();
        const status = document.getElementById("profileSaveStatus");
        const profile = Object.fromEntries(new FormData(event.target));
        const accountId = this.studentAccountId(this.data.user || profile);
        profile.rollNumber = accountId;
        profile.studentId = accountId;
        profile.engilearnId = accountId;
        profile.photoUrl = String(profile.photoUrl || profile.profilePhoto || "").trim();
        profile.profilePhoto = profile.photoUrl;
        status.textContent = "Saving...";

        try {
            const data = await EngiLearnAPI.updateStudentProfile(profile);
            this.data.user = data.user;
            this.saveUserLocally(data.user);
            status.textContent = "Saved to backend and admin student record.";
        } catch (error) {
            this.data.user = { ...this.data.user, ...profile, rollNumber: accountId, studentId: accountId, engilearnId: accountId };
            this.saveUserLocally(this.data.user);
            status.textContent = "Message could not be sent right now. Please try again or email engilearn.edu@gmail.com.";
        }

        this.renderProfile();
    },

    saveUserLocally(user) {
        const normalized = this.normalizeStudentProfile(user || {});
        localStorage.setItem("mini_currentUser", JSON.stringify(normalized));
        localStorage.setItem(this.localProfileKey(normalized.email), JSON.stringify(normalized));
    },

    localProfileKey(email) {
        return `student_profile_${String(email || "student").toLowerCase()}`;
    },

    escapeHtml(value) {
        return String(value ?? "").replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
    },

    safeUrl(value) {
        const url = String(value || "").trim();
        if (!url) return "";
        if (/^(https?:|\/|data:image\/)/i.test(url)) return this.escapeHtml(url);
        return "";
    },

    askAi(event) {
        event.preventDefault();
        const question = document.getElementById("aiQuestion").value.trim();
        if (!question) return;
        const lectures = this.data.lectures.slice(0, 3).map((lecture) => lecture.title).join(", ");
        const answer = question.toLowerCase().includes("assignment")
            ? "Open Assignments, download the file if available, write your response, attach your work, and submit before the deadline."
            : question.toLowerCase().includes("lecture") || question.toLowerCase().includes("notes")
                ? `Your available lectures include: ${lectures || "no lectures yet"}. Use the lecture search by subject, topic, or teacher.`
                : "I can help you find lectures, notes, assignments, live classes, and progress details from your dashboard.";
        document.getElementById("aiChatLog").innerHTML += `
            <article class="lms-card"><strong>You</strong><p>${question}</p></article>
            <article class="lms-card"><strong>AI Support</strong><p>${answer}</p></article>
        `;
        event.target.reset();
    }
};

document.addEventListener("DOMContentLoaded", () => studentLms.init());
