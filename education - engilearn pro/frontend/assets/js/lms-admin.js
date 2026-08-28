const adminLms = {
    data: null,
    analytics: null,
    requestRoleFilter: "all",
    accountRoleFilter: "all",
    toolHubHistoryVisible: false,
    repeatedPaymentHistoryVisible: false,

    currentAdmin() {
        const stored = JSON.parse(localStorage.getItem("mini_currentUser") || "null") || {};
        return (this.data?.users || []).find((user) => user.role === "Admin" && (user.id === stored.id || user.email === stored.email || user.adminId === stored.adminId)) || stored;
    },

    isMainAdmin() {
        const admin = this.currentAdmin();
        return String(admin.adminId || "").toUpperCase() === "ADMIN001" || String(admin.adminType || "").toLowerCase() === "main";
    },

    canManagePyq() {
        const adminType = String(this.currentAdmin()?.adminType || "").toLowerCase();
        return this.isMainAdmin() || adminType === "academic" || adminType === "content";
    },

    init() {
        this.bindTabs();
        this.bindForms();
        this.prefillPyqUploadFromQuery();
        window.addEventListener("popstate", () => this.openRequestedSection());
        document.getElementById("adminLogout").addEventListener("click", () => {
            EngiLearnAPI.logout().catch(() => {});
            EngiLearnAPI.token = "";
            localStorage.removeItem("mini_currentUser");
            window.location.href = "../index.html";
        });
        if (window.EngiLearnThemeEngine) {
            window.EngiLearnThemeEngine.bindModeToggles?.();
            window.EngiLearnThemeEngine.setMode?.(window.EngiLearnThemeEngine.currentMode?.() || "light");
        } else {
            document.getElementById("adminThemeToggle").addEventListener("click", () => {
                const next = document.body.dataset.theme === "dark" ? "light" : "dark";
                document.body.dataset.theme = next;
                localStorage.setItem("lms_theme", next);
                localStorage.setItem("theme", next);
                localStorage.setItem("engilearn_color_mode", next);
            });
            document.body.dataset.theme = localStorage.getItem("engilearn_color_mode") || localStorage.getItem("lms_theme") || "light";
        }
        this.load();
        this.openRequestedSection();
    },

    prefillPyqUploadFromQuery() {
        const query = new URLSearchParams(window.location.search);
        if (query.get("section") !== "pyq-manager") return;
        const form = document.getElementById("pyqUploadForm");
        if (!form) return;
        const branchId = String(query.get("branch") || "").toLowerCase();
        const semester = String(query.get("semester") || "").replace(/[^\d]/g, "");
        const branchNames = {
            cse: "Computer Science & Engineering", it: "Information Technology", ece: "Electronics & Communication",
            mech: "Mechanical Engineering", civil: "Civil Engineering", eee: "Electrical & Electronics",
            ai: "AI & Machine Learning", ds: "Data Science", cyber: "Cyber Security", chemical: "Chemical Engineering",
            auto: "Automobile Engineering", production: "Production Engineering", aero: "Aeronautical Engineering",
            bme: "Biomedical Engineering", iot: "IoT & Embedded Systems", mechatronics: "Mechatronics",
            power: "Power Electronics", instrumentation: "Instrumentation", env: "Environmental Engineering",
            arch: "Architecture", metallurgy: "Metallurgical Engineering", mining: "Mining Engineering",
            textile: "Textile Technology", petroleum: "Petroleum Engineering", food: "Food Technology",
            robotics: "Robotics Engineering", nano: "Nanotechnology", marine: "Marine Engineering"
        };
        if (branchNames[branchId]) {
            form.elements.branch.value = branchNames[branchId];
            form.elements.branchId.value = branchId;
        }
        if (/^[1-8]$/.test(semester)) form.elements.semester.value = semester;
    },

    bindTabs() {
        document.addEventListener("click", (event) => {
            const button = event.target.closest("[data-lms-tab], [data-lms-tab-target]");
            if (!button) return;
            event.preventDefault();
            event.stopPropagation();
            this.navigateToSection(button.dataset.lmsTab || button.dataset.lmsTabTarget);
        });
    },

    requestedSection() {
        const querySection = new URLSearchParams(window.location.search).get("section");
        const hashSection = String(window.location.hash || "").replace(/^#/, "");
        return querySection || hashSection || "overview";
    },

    openRequestedSection() {
        const id = this.requestedSection();
        this.openTab(document.getElementById(id)?.classList.contains("lms-section") ? id : "overview");
    },

    sectionUrl(id) {
        const target = document.getElementById(id)?.classList.contains("lms-section") ? id : "overview";
        const url = new URL(window.location.pathname.split("/").pop() || "admin.html", window.location.href);
        url.hash = "";
        url.search = "";
        if (target !== "overview") {
            url.searchParams.set("section", target);
        }
        return `${url.pathname}${url.search}`;
    },

    navigateToSection(id) {
        const targetUrl = this.sectionUrl(id);
        const currentUrl = `${window.location.pathname}${window.location.search}`;
        sessionStorage.setItem("engilearn_admin_page_section", id || "overview");
        if (targetUrl === currentUrl) {
            window.location.reload();
            return;
        }
        window.location.href = targetUrl;
    },

    openTab(id, updateHash = false) {
        if (!document.getElementById(id)?.classList.contains("lms-section")) id = "overview";
        document.querySelectorAll(".lms-tab").forEach((tab) => tab.classList.toggle("active", tab.dataset.lmsTab === id));
        document.querySelectorAll(".lms-section").forEach((section) => section.classList.toggle("active", section.id === id));
        const titles = {
            overview: ["Learning", "Overview"], lectures: ["Learning", "Lectures"], "subscriber-videos-admin": ["Learning", "Subscriber Videos"], subjects: ["Learning", "Subjects"], "pyq-manager": ["Learning", "PYQ Manager"],
            "repeated-questions-manager": ["Learning", "Add or Edit Most Repeated Questions"],
            assignments: ["Learning", "Assignments"], notifications: ["Learning", "Notifications"], live: ["Learning", "Live Classes"],
            "account-hub": ["Account", "Account Overview"], students: ["Account", "Accounts"], requests: ["Account", "Requests"],
            contacts: ["Account", "Support Messages"], "admin-control": ["Account", "Admin Control"],
            "activity-logs": ["Account", "Activity Logs"], visitors: ["Account", "Visitor Details"], settings: ["Account", "Admin Settings"],
            "website-settings": ["Website Settings", "Website Settings"], website: ["Website Settings", "Section Visibility"],
            advertising: ["Website Settings", "Advertising"],
            "video-section-admin": ["Website Settings", "Video Section"], "ai-section-admin": ["Website Settings", "Complete AI Tools Section"],
            "ai-tools-admin": ["Website Settings", "AI Tool Manager"], "tool-hub-access": ["Website Settings", "Tool Hub Access"],
            "repeated-questions-access": ["Website Settings", "Most Repeated Questions Visibility"]
        };
        const title = titles[id] || ["Admin Dashboard", id];
        const pageBar = document.getElementById("adminPageBar");
        if (pageBar) pageBar.hidden = id === "overview";
        if (document.getElementById("adminPageCategory")) document.getElementById("adminPageCategory").textContent = title[0];
        if (document.getElementById("adminPageTitle")) document.getElementById("adminPageTitle").textContent = title[1];
        document.body.classList.toggle("admin-page-mode", id !== "overview");
        document.body.dataset.adminSection = id;
        document.title = id === "overview" ? "Admin Dashboard | EngiLearn" : `${title[1]} | EngiLearn Admin`;
        if (updateHash) {
            this.navigateToSection(id);
            return;
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
    },

    bindForms() {
        document.getElementById("lectureForm").addEventListener("submit", (event) => this.saveLecture(event));
        document.getElementById("subscriberLectureForm")?.addEventListener("submit", (event) => this.saveSubscriberLecture(event));
        document.getElementById("subscriberLibrarySettingsForm")?.addEventListener("submit", (event) => this.saveSubscriberLibrarySettings(event));
        document.getElementById("subjectForm").addEventListener("submit", (event) => this.saveSubject(event));
        document.getElementById("pyqUploadForm")?.addEventListener("submit", (event) => this.savePyq(event));
        document.getElementById("pyqEditForm")?.addEventListener("submit", (event) => this.savePyqEdit(event));
        document.getElementById("closePyqEditModal")?.addEventListener("click", () => this.closePyqEdit());
        document.getElementById("importPyqDatasetBtn")?.addEventListener("click", () => this.importPyqDataset());
        document.getElementById("downloadAllPyqBtn")?.addEventListener("click", () => this.downloadAllPyq());
        document.getElementById("adminPyqSearch")?.addEventListener("input", () => this.renderPyqManager());
        document.getElementById("repeatedQuestionForm")?.addEventListener("submit", (event) => this.saveRepeatedQuestion(event));
        document.getElementById("cancelRepeatedQuestionEdit")?.addEventListener("click", () => this.resetRepeatedQuestionForm());
        document.getElementById("adminRepeatedQuestionSearch")?.addEventListener("input", () => this.renderRepeatedQuestionManager());
        document.getElementById("assignmentForm").addEventListener("submit", (event) => this.saveAssignment(event));
        document.getElementById("notificationForm").addEventListener("submit", (event) => this.sendNotification(event));
        document.getElementById("liveForm").addEventListener("submit", (event) => this.saveLive(event));
        document.getElementById("aiToolForm").addEventListener("submit", (event) => this.saveAiTool(event));
        document.getElementById("websiteSettingsForm").addEventListener("submit", (event) => this.saveWebsiteSettings(event));
        document.getElementById("settingsForm").addEventListener("submit", (event) => this.saveSettings(event));
        document.getElementById("videoSectionAdminForm")?.addEventListener("submit", (event) => this.saveDedicatedSection(event, "videos"));
        document.getElementById("aiSectionAdminForm")?.addEventListener("submit", (event) => this.saveDedicatedSection(event, "tools"));
        document.getElementById("toolHubSettingsForm")?.addEventListener("submit", (event) => this.saveToolHubSettings(event));
        document.getElementById("repeatedQuestionsSettingsForm")?.addEventListener("submit", (event) => this.saveRepeatedQuestionsSettings(event));
        document.getElementById("advertisingSettingsForm")?.addEventListener("submit", (event) => this.saveAdvertisingSettings(event));
        ["advertisingSectionInput", "advertisingVisibilityInput", "advertisingPlacementInput", "advertisingTitleInput", "advertisingMessageInput", "advertisingLinkInput", "advertisingImageInput"].forEach((id) => {
            const element = document.getElementById(id);
            if (element) element.addEventListener("input", () => this.renderAdvertisingPreview(this.readAdvertisingForm()));
            if (element) element.addEventListener("change", () => this.renderAdvertisingPreview(this.readAdvertisingForm()));
        });
        this.ensureSplitAccountApprovalControls();
        document.getElementById("accountApprovalSettingsForm")?.addEventListener("submit", (event) => this.saveAccountApprovalSettings(event));
        document.getElementById("teacherApprovalEnabledInput")?.addEventListener("change", () => this.syncAccountApprovalControl());
        document.getElementById("toggleToolHubPaymentHistory")?.addEventListener("click", (event) => {
            event.preventDefault();
            this.toggleToolHubPaymentHistory();
        });
        document.getElementById("toggleRepeatedPaymentHistory")?.addEventListener("click", (event) => {
            event.preventDefault();
            this.toggleRepeatedPaymentHistory();
        });
        document.getElementById("deleteSelectedToolHubPayments")?.addEventListener("click", () => this.bulkDeleteToolHubPayments());
        document.getElementById("deleteSelectedRepeatedPayments")?.addEventListener("click", () => this.bulkDeleteRepeatedPayments());
        document.getElementById("deleteSelectedActivityLogs")?.addEventListener("click", () => this.bulkDeleteActivityLogs());
        document.getElementById("deleteSelectedVisitors")?.addEventListener("click", () => this.bulkDeleteVisitors());
        document.getElementById("approveSelectedRequests")?.addEventListener("click", () => this.bulkRequestAction("approve"));
        document.getElementById("blockSelectedRequests")?.addEventListener("click", () => this.bulkRequestAction("block"));
        document.getElementById("rejectSelectedRequests")?.addEventListener("click", () => this.bulkRequestAction("reject"));
        document.getElementById("resolveSelectedContacts")?.addEventListener("click", () => this.bulkContactAction("Resolved"));
        document.getElementById("unresolveSelectedContacts")?.addEventListener("click", () => this.bulkContactAction("Unresolved"));
        document.getElementById("deleteSelectedContacts")?.addEventListener("click", () => this.bulkContactAction("delete"));
        [
            ["selectAllToolHubPayments", "toolhub-payment-select"],
            ["selectAllRepeatedPayments", "repeated-payment-select"],
            ["selectAllActivityLogs", "activity-log-select"],
            ["selectAllVisitors", "visitor-select"],
            ["selectAllRequests", "request-select"],
            ["selectAllContacts", "contact-select"]
        ].forEach(([masterId, itemClass]) => {
            document.getElementById(masterId)?.addEventListener("change", (event) => {
                document.querySelectorAll(`.${itemClass}`).forEach((item) => { item.checked = event.target.checked; });
            });
        });
        document.getElementById("adminLectureSearch").addEventListener("input", () => this.renderLectures());
        document.getElementById("subscriberLectureSearch")?.addEventListener("input", () => this.renderSubscriberLectures());
        document.querySelectorAll("[data-admin-date-filter-field]").forEach((element) => {
            const key = element.dataset.adminDateFilterField;
            const handler = () => this.renderDateFilteredSection(key);
            element.addEventListener("change", handler);
            element.addEventListener("input", handler);
        });
        document.getElementById("studentSearch").addEventListener("input", () => this.renderStudents());
        document.getElementById("requestRoleFilter").addEventListener("change", (event) => {
            this.requestRoleFilter = event.target.value;
            this.renderRequests();
        });
        document.getElementById("requestSearch")?.addEventListener("input", () => this.renderRequests());
        document.getElementById("contactSearch")?.addEventListener("input", () => this.renderContacts());
        document.getElementById("activityLogSearch")?.addEventListener("input", () => this.renderActivityLogs());
        document.getElementById("visitorSearch")?.addEventListener("input", () => this.renderVisitors());
        document.getElementById("submissionSearch")?.addEventListener("input", () => this.renderAssignments());
        document.getElementById("toolHubPaymentSearch")?.addEventListener("input", () => {
            if (this.toolHubHistoryVisible) this.renderToolHubGatewayPayments();
        });
        document.getElementById("repeatedPaymentSearch")?.addEventListener("input", () => {
            if (this.repeatedPaymentHistoryVisible) this.renderRepeatedQuestionPayments();
        });
        document.getElementById("accountRoleFilter").addEventListener("change", (event) => {
            this.accountRoleFilter = event.target.value;
            this.renderStudents();
        });
        document.getElementById("themePreviewBtn")?.addEventListener("click", (event) => {
            event.preventDefault();
            this.previewSelectedTheme(true);
        });
        document.getElementById("themeApplyBtn")?.addEventListener("click", () => this.applySelectedTheme());
        document.getElementById("themeExportBtn")?.addEventListener("click", () => this.exportThemeSettings());
        document.getElementById("themeImportBtn")?.addEventListener("click", () => this.importThemeSettings());
        document.getElementById("themeEngineSelect")?.addEventListener("change", () => this.previewSelectedTheme());
        document.getElementById("refreshToolHubPayments")?.addEventListener("click", async (event) => {
            event.preventDefault();
            this.toolHubHistoryVisible = true;
            await this.load();
            this.openTab("tool-hub-access");
            this.syncToolHubPaymentHistoryPanel();
            this.showActionStatus("Tool Hub payment history refreshed.");
        });
        document.getElementById("refreshRepeatedPayments")?.addEventListener("click", async (event) => {
            event.preventDefault();
            this.repeatedPaymentHistoryVisible = true;
            await this.load();
            this.openTab("repeated-questions-access");
            this.renderRepeatedQuestionPayments();
            this.showActionStatus("Repeated Questions payment history refreshed.");
        });
    },

    selectedAdminValues(selector) {
        return [...document.querySelectorAll(`${selector}:checked`)].map((item) => String(item.value || "")).filter(Boolean);
    },

    async bulkDeleteToolHubPayments() {
        const keys = this.selectedAdminValues(".toolhub-payment-select");
        if (!keys.length) return this.showActionStatus("Select at least one Tool Hub payment.", "warning");
        if (!confirm(`Delete ${keys.length} selected Tool Hub payment history entries?`)) return;
        let failed = 0;
        for (const encodedKey of keys) {
            try { await EngiLearnAPI.deleteToolHubPayment(decodeURIComponent(encodedKey)); } catch (error) { failed += 1; }
        }
        this.toolHubHistoryVisible = true;
        await this.load();
        this.openTab("tool-hub-access");
        this.syncToolHubPaymentHistoryPanel();
        this.showActionStatus(failed ? `${keys.length - failed} deleted; ${failed} failed.` : `${keys.length} Tool Hub payment entries deleted.`, failed ? "warning" : "success");
    },

    async bulkDeleteRepeatedPayments() {
        const keys = this.selectedAdminValues(".repeated-payment-select");
        if (!keys.length) return this.showActionStatus("Select at least one Repeated Questions payment.", "warning");
        if (!confirm(`Delete ${keys.length} selected Repeated Questions payment history entries?`)) return;
        let failed = 0;
        for (const encodedKey of keys) {
            try { await EngiLearnAPI.deleteToolHubPayment(decodeURIComponent(encodedKey)); } catch (error) { failed += 1; }
        }
        this.repeatedPaymentHistoryVisible = true;
        await this.load();
        this.openTab("repeated-questions-access");
        this.renderRepeatedQuestionPayments();
        this.showActionStatus(failed ? `${keys.length - failed} deleted; ${failed} failed.` : `${keys.length} Repeated Questions payment entries deleted.`, failed ? "warning" : "success");
    },

    async bulkDeleteActivityLogs() {
        const ids = this.selectedAdminValues(".activity-log-select");
        if (!ids.length) return this.showActionStatus("Select at least one activity log.", "warning");
        if (!confirm(`Delete ${ids.length} selected activity logs?`)) return;
        let failed = 0;
        for (const id of ids) { try { await EngiLearnAPI.deleteAdminLog(id); } catch (error) { failed += 1; } }
        await this.load();
        this.openTab("activity-logs");
        this.showActionStatus(failed ? `${ids.length - failed} logs deleted; ${failed} failed.` : `${ids.length} activity logs deleted.`, failed ? "warning" : "success");
    },

    async bulkDeleteVisitors() {
        const ids = this.selectedAdminValues(".visitor-select");
        if (!ids.length) return this.showActionStatus("Select at least one visitor record.", "warning");
        if (!confirm(`Delete ${ids.length} selected visitor records?`)) return;
        let failed = 0;
        try {
            await EngiLearnAPI.bulkDeleteVisits(ids);
        } catch (error) {
            for (const id of ids) {
                try { await EngiLearnAPI.deleteVisit(id); } catch (deleteError) { failed += 1; }
            }
        }
        await this.load();
        this.openTab("visitors");
        this.showActionStatus(failed ? `${ids.length - failed} visitor records deleted; ${failed} failed.` : `${ids.length} visitor records deleted.`, failed ? "warning" : "success");
    },

    async bulkRequestAction(action) {
        const ids = this.selectedAdminValues(".request-select");
        if (!ids.length) return this.showActionStatus("Select at least one account request.", "warning");
        if ((action === "reject" || action === "block") && !confirm(`${action === "reject" ? "Reject and delete" : "Block"} ${ids.length} selected account requests?`)) return;
        let failed = 0;
        for (const id of ids) {
            try {
                if (action === "approve") await EngiLearnAPI.approveUser(id);
                if (action === "reject") await EngiLearnAPI.rejectUser(id);
                if (action === "block") {
                    const user = (this.data.users || []).find((item) => String(item.id) === String(id));
                    if (user?.status !== "Blocked") await EngiLearnAPI.toggleUserStatus(id);
                }
            } catch (error) { failed += 1; }
        }
        await this.load();
        this.openTab("requests");
        this.showActionStatus(failed ? `${ids.length - failed} requests updated; ${failed} failed.` : `${ids.length} account requests updated.`, failed ? "warning" : "success");
    },

    async bulkContactAction(action) {
        const ids = this.selectedAdminValues(".contact-select");
        if (!ids.length) return this.showActionStatus("Select at least one support message.", "warning");
        if (action === "delete" && !confirm(`Delete ${ids.length} selected support messages permanently?`)) return;
        let failed = 0;
        for (const id of ids) {
            try {
                if (action === "delete") await EngiLearnAPI.deleteContact(id);
                else await EngiLearnAPI.updateContactStatus(id, action);
            } catch (error) { failed += 1; }
        }
        await this.load();
        this.openTab("contacts");
        this.showActionStatus(failed ? `${ids.length - failed} messages updated; ${failed} failed.` : `${ids.length} support messages updated.`, failed ? "warning" : "success");
    },
    renderDateFilteredSection(key) {
        const renderers = {
            activityLogs: () => this.renderActivityLogs(),
            payments: () => this.renderToolHubGatewayPayments(),
            repeatedPayments: () => this.renderRepeatedQuestionPayments(),
            contacts: () => this.renderContacts(),
            visitors: () => this.renderVisitors(),
            subscriberVideos: () => this.renderSubscriberLectures(),
            submissions: () => this.renderAssignments()
        };
        renderers[key]?.();
    },

    parseAdminDate(value) {
        if (!value) return null;
        const date = value instanceof Date ? value : new Date(value);
        return Number.isNaN(date.getTime()) ? null : date;
    },

    firstAdminDate(record, fields) {
        for (const field of fields) {
            const value = typeof field === "function" ? field(record) : record?.[field];
            const date = this.parseAdminDate(value);
            if (date) return date;
        }
        return null;
    },

    adminDateKey(date) {
        const parsed = this.parseAdminDate(date);
        if (!parsed) return "";
        const month = String(parsed.getMonth() + 1).padStart(2, "0");
        const day = String(parsed.getDate()).padStart(2, "0");
        return `${parsed.getFullYear()}-${month}-${day}`;
    },

    adminMonthKey(date) {
        const parsed = this.parseAdminDate(date);
        if (!parsed) return "";
        return `${parsed.getFullYear()}-${String(parsed.getMonth() + 1).padStart(2, "0")}`;
    },

    syncAdminDateFilterControls(key) {
        const mode = document.getElementById(`${key}DateMode`)?.value || "all";
        const controls = {
            day: document.getElementById(`${key}DateDay`),
            month: document.getElementById(`${key}DateMonth`),
            year: document.getElementById(`${key}DateYear`)
        };
        Object.entries(controls).forEach(([controlMode, control]) => {
            if (!control) return;
            const active = mode === controlMode;
            control.hidden = mode === "all" || !active;
            control.disabled = mode === "all" || !active;
        });
        return mode;
    },

    filterByAdminDate(records, key, dateGetter, label = "records") {
        const mode = this.syncAdminDateFilterControls(key);
        const total = records.length;
        let filtered = records;
        let description = "all dates";

        if (mode === "day") {
            const selected = document.getElementById(`${key}DateDay`)?.value || "";
            description = selected ? new Date(`${selected}T00:00:00`).toLocaleDateString() : "all dates";
            if (selected) filtered = records.filter((record) => this.adminDateKey(dateGetter(record)) === selected);
        } else if (mode === "month") {
            const selected = document.getElementById(`${key}DateMonth`)?.value || "";
            description = selected || "all dates";
            if (selected) filtered = records.filter((record) => this.adminMonthKey(dateGetter(record)) === selected);
        } else if (mode === "year") {
            const selected = String(document.getElementById(`${key}DateYear`)?.value || "").trim();
            description = selected || "all dates";
            if (selected) filtered = records.filter((record) => {
                const date = this.parseAdminDate(dateGetter(record));
                return date && String(date.getFullYear()) === selected;
            });
        }

        const summary = document.getElementById(`${key}DateSummary`);
        if (summary) summary.textContent = `Showing ${filtered.length} of ${total} ${label} (${description})`;
        return filtered;
    },

    formatAdminDate(value) {
        const date = this.parseAdminDate(value);
        return date ? date.toLocaleString() : "";
    },

    readLocalJson(key, fallback) {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : fallback;
        } catch (error) {
            return fallback;
        }
    },

    storedAdmin() {
        return this.readLocalJson("mini_currentUser", null);
    },

    hasStoredAdminSession() {
        const admin = this.storedAdmin();
        return !!admin && (String(admin.role || "").toLowerCase() === "admin" || !!admin.adminId || !!admin.adminType);
    },

    buildOfflineAdminData(error) {
        const admin = this.storedAdmin() || { name: "Admin", role: "Admin", adminId: "ADMIN001" };
        const settings = this.readLocalJson("engilearn_public_settings", null) || {};
        const lectures = this.readLocalJson("backend_lectures", []) || [];
        const contacts = this.readLocalJson("contact_messages", []) || [];
        const visits = this.readLocalJson("engilearn_visit_logs", []) || [];
        const aiTools = this.readLocalJson("engilearn_ai_tools", []) || [];
        return {
            users: [admin],
            subjects: this.readLocalJson("admin_subjects", []) || [],
            lectures,
            assignments: [],
            submissions: [],
            watchHistory: this.readLocalJson("student_watch_history", []) || [],
            bookmarks: [],
            contacts,
            visits,
            payments: this.readLocalJson("engilearn_toolhub_payments", []) || [],
            exams: [],
            pendingRequests: [],
            notifications: [],
            liveClasses: [],
            aiTools,
            logs: [{
                action: "Backend fallback",
                detail: error?.message || "Backend unavailable. Showing saved admin dashboard data.",
                adminName: admin.name || "Admin",
                createdAt: new Date().toISOString()
            }],
            settings
        };
    },

    async load() {
        try {
            const [lmsData, analyticsData, usersData] = await Promise.all([
                EngiLearnAPI.getAdminLms(),
                EngiLearnAPI.getAnalytics().catch(() => null),
                EngiLearnAPI.getUsers().catch(() => null)
            ]);
            this.data = lmsData || {};
            const apiUsers = Array.isArray(usersData?.users) ? usersData.users : (Array.isArray(usersData) ? usersData : []);
            const loadedUsers = apiUsers.length ? apiUsers : (Array.isArray(this.data.users) ? this.data.users : []);
            const users = loadedUsers.map((user) => ({ ...user, role: this.normalizeAccountRole(user.role) }));
            if (users.length || !(this.data.users || []).length) {
                this.data.users = users;
                this.data.admins = users.filter((user) => this.normalizeAccountRole(user.role) === "Admin");
                this.data.pendingRequests = [];
            }
            this.analytics = analyticsData || {
                totalStudents: (this.data.users || []).filter((user) => String(user.role || "").toLowerCase() === "student").length,
                totalVideos: (this.data.lectures || []).length,
                totalSubjects: (this.data.subjects || []).length,
                totalAssignments: (this.data.assignments || []).length,
                pendingRequests: (this.data.pendingRequests || []).length,
                mostWatched: []
            };
            this.render();
        } catch (error) {
            if (this.hasStoredAdminSession()) {
                this.data = this.buildOfflineAdminData(error);
                this.analytics = {
                    totalStudents: this.data.users.filter((user) => String(user.role || "").toLowerCase() === "student").length,
                    totalVideos: this.data.lectures.length,
                    totalSubjects: this.data.subjects.length,
                    totalAssignments: this.data.assignments.length,
                    pendingRequests: this.data.pendingRequests.length,
                    mostWatched: []
                };
                this.render();
                this.showActionStatus("Backend is offline, so this admin page is showing saved browser data. Start backend to update live records.", "warning");
                return;
            }
            this.renderAdminLogin(error.message);
        }
    },

    renderAdminLogin(message = "Admin login required") {
        document.querySelector(".lms-main").innerHTML = `
            <div class="lms-panel lms-auth-card">
                <h2>Admin Login Required</h2>
                <p class="lms-meta">${this.escapeHtml(message)}. Login here to load dashboard details.</p>
                <div class="lms-alert info">Admin must create a password with Forgot Password / OTP before first login.</div>
                <form class="lms-form" id="adminInlineLoginForm">
                    <label class="wide">Admin ID or Email<input name="identifier" value="ADMIN001" required></label>
                    <label class="wide">Password<input name="password" type="password" placeholder="Your own password" required></label>
                    <button class="lms-btn wide" type="submit"><i class="fas fa-sign-in-alt"></i> Open Admin Dashboard</button>
                    <div class="lms-form-status wide" id="adminInlineLoginStatus" aria-live="polite"></div>
                </form>
                <a class="lms-btn secondary" href="../index.html">Back Home</a>
            </div>
        `;
        document.getElementById("adminInlineLoginForm").addEventListener("submit", (event) => this.inlineAdminLogin(event));
    },

    async inlineAdminLogin(event) {
        event.preventDefault();
        const status = document.getElementById("adminInlineLoginStatus");
        const form = Object.fromEntries(new FormData(event.target));
        status.className = "lms-form-status wide";
        status.textContent = "Checking admin account...";

        try {
            const data = await EngiLearnAPI.login(form.identifier, form.password, "Admin");
            EngiLearnAPI.token = data.token;
            localStorage.setItem("mini_currentUser", JSON.stringify(data.user));
            status.classList.add("success");
            status.textContent = "Admin login successful. Loading dashboard...";
            window.location.reload();
        } catch (error) {
            status.classList.add("error");
            status.textContent = error.message || "Admin login failed.";
        }
    },

    render() {
        const admin = JSON.parse(localStorage.getItem("mini_currentUser") || "null");
        this.data = {
            users: [],
            subjects: [],
            lectures: [],
            assignments: [],
            submissions: [],
            watchHistory: [],
            bookmarks: [],
            contacts: [],
            visits: [],
            payments: [],
            exams: [],
            pendingRequests: [],
            notifications: [],
            liveClasses: [],
            aiTools: [],
            logs: [],
            settings: {
                sections: { videos: true, pyq: true, tools: true, prompts: true },
                visibility: { videos: true, pyq: true, tools: true, prompts: true },
                aiToolCategories: {},
                subscription: { videos: true, title: "Subscriber Video Library" },
                toolHub: { visible: true, accessMode: "paid", price: 100, qrImage: "", upiId: "", payeeName: "EngiLearn", instructions: "Payment is required before Tool Hub access is unlocked." },
                repeatedQuestions: { visible: true, accessMode: "paid", price: 100 }
            },
            ...(this.data || {})
        };
        this.mergeLocalStudentHistory();
        this.analytics = {
            totalStudents: 0,
            totalVideos: 0,
            totalSubjects: 0,
            totalAssignments: 0,
            pendingRequests: 0,
            mostWatched: [],
            ...(this.analytics || {})
        };
        document.getElementById("adminName").textContent = admin?.name || "Admin";
        document.getElementById("adminStudents").textContent = this.analytics.totalStudents;
        document.getElementById("adminVideos").textContent = this.analytics.totalVideos;
        document.getElementById("adminSubjects").textContent = this.analytics.totalSubjects;
        document.getElementById("adminRequests").textContent = this.analytics.pendingRequests || (this.data.pendingRequests || []).length;
        this.renderOverview();
        this.renderLectures();
        this.renderSubscriberLectures();
        this.renderSubjects();
        this.renderPyqManager();
        this.renderRepeatedQuestionManager();
        this.renderRequests();
        this.renderStudents();
        this.renderContacts();
        this.renderVisitors();
        this.renderAssignments();
        this.renderNotifications();
        this.renderLive();
        this.renderAiTools();
        this.renderAdminControl();
        this.renderAdminProfile();
        this.renderSettings();
        if (this.toolHubHistoryVisible) this.renderToolHubGatewayPayments();
        if (this.repeatedPaymentHistoryVisible) this.renderRepeatedQuestionPayments();
        this.renderWebsiteSettingsHub();
        this.renderActivityLogs();
        this.renderThemeManager();
        this.openRequestedSection();
    },

    renderWebsiteSettingsHub() {
        const toolCount = document.getElementById("websiteToolCount");
        const visibleCount = document.getElementById("websiteVisibleCount");
        const statusBoard = document.getElementById("websiteSectionStatusBoard");
        if (!toolCount || !visibleCount) return;
        const settings = this.data.settings || {};
        const sections = settings.sections || {};
        const visibility = settings.visibility || {};
        const items = [
            ["tools", "AI Tools", "fas fa-brain"],
            ["videos", "Video Section", "fas fa-video"],
            ["pyq", "PYQ Section", "fas fa-file-lines"]
        ];
        toolCount.textContent = String((this.data.aiTools || []).length);
        visibleCount.textContent = String(items.filter(([key]) => sections[key] !== false && visibility[key] !== false).length);
        if (statusBoard) {
            statusBoard.innerHTML = items.map(([key, label, icon]) => {
                const active = sections[key] !== false;
                const shown = visibility[key] !== false;
                return `
                    <article class="section-status-card ${active && shown ? "is-live" : "is-limited"}">
                        <i class="${icon}"></i>
                        <div>
                            <strong>${label}</strong>
                            <span>${active ? "Active" : "Disabled"} / ${shown ? "Shown" : "Hidden"}</span>
                        </div>
                    </article>
                `;
            }).join("");
        }
    },

    renderThemeManager() {
        const select = document.getElementById("themeEngineSelect");
        const defaultSelect = document.getElementById("themeDefaultSelect");
        const grid = document.getElementById("themePreviewGrid");
        const status = document.getElementById("themeEngineStatus");
        const userPreference = document.getElementById("themeUserPreferenceInput");
        const previewInput = document.getElementById("themePreviewInput");
        if (!select || !defaultSelect || !grid || !window.EngiLearnThemeEngine) return;

        const themeEngine = this.data.settings?.themeEngine || {};
        const activeTheme = themeEngine.activeTheme || "nothing-os";
        const defaultTheme = themeEngine.defaultTheme || activeTheme;
        const options = window.EngiLearnThemeEngine.presets.map((theme) => (
            `<option value="${this.escapeAttribute(theme.id)}">${this.escapeHtml(theme.name)}</option>`
        )).join("");

        select.innerHTML = options;
        defaultSelect.innerHTML = options;
        select.value = activeTheme;
        defaultSelect.value = defaultTheme;
        if (userPreference) userPreference.value = String(themeEngine.allowUserPreference !== false);
        if (previewInput) previewInput.value = String(themeEngine.allowPreview !== false);
        if (status) status.textContent = `Active: ${window.EngiLearnThemeEngine.presets.find((theme) => theme.id === activeTheme)?.name || activeTheme}`;

        const isMain = this.isMainAdmin();
        document.getElementById("themeManagerPanel")?.classList.toggle("theme-manager-disabled", !isMain);
        [select, defaultSelect, userPreference, previewInput, document.getElementById("themeApplyBtn"), document.getElementById("themeImportBtn")]
            .filter(Boolean)
            .forEach((element) => { element.disabled = !isMain; });

        grid.innerHTML = window.EngiLearnThemeEngine.presets.map((theme) => `
            <button class="theme-preview-card ${theme.id === activeTheme ? "active" : ""}" data-theme-preview="${this.escapeAttribute(theme.id)}" type="button">
                <i class="${this.escapeAttribute(theme.icon)}"></i>
                <strong>${this.escapeHtml(theme.name)}</strong>
                <span>${this.escapeHtml(theme.description)}</span>
            </button>
        `).join("");
        grid.querySelectorAll("[data-theme-preview]").forEach((button) => {
            button.addEventListener("click", () => {
                select.value = button.dataset.themePreview;
                this.previewSelectedTheme();
            });
        });

        window.EngiLearnThemeEngine.apply(activeTheme);
    },

    previewSelectedTheme(showStatus = false) {
        const select = document.getElementById("themeEngineSelect");
        const status = document.getElementById("themeEngineStatus");
        if (!select) {
            if (showStatus) this.showActionStatus("Theme selector is not ready yet. Reopen Website Settings and try again.", "error");
            return;
        }
        const themeId = select.value || "nothing-os";
        const theme = window.EngiLearnThemeEngine?.presets?.find((item) => item.id === themeId);
        if (window.EngiLearnThemeEngine?.preview) {
            window.EngiLearnThemeEngine.preview(themeId);
        } else {
            document.body.dataset.uiTheme = themeId;
            document.body.classList.add("theme-engine-ready");
        }
        document.querySelectorAll(".theme-preview-card").forEach((card) => {
            card.classList.toggle("active", card.dataset.themePreview === themeId);
        });
        if (status) status.textContent = `Preview: ${theme?.name || themeId}`;
        if (showStatus) this.showActionStatus(`Previewing ${theme?.name || themeId}. Click Apply Website Theme to save it.`);
    },

    async applySelectedTheme() {
        if (!this.isMainAdmin()) {
            this.showActionStatus("Only Main Admin can apply website themes.", "error");
            return;
        }
        const activeTheme = document.getElementById("themeEngineSelect")?.value || "nothing-os";
        const defaultTheme = document.getElementById("themeDefaultSelect")?.value || activeTheme;
        const allowUserPreference = document.getElementById("themeUserPreferenceInput")?.value !== "false";
        const allowPreview = document.getElementById("themePreviewInput")?.value !== "false";
        try {
            await EngiLearnAPI.updateSettings({
                themeEngine: {
                    activeTheme,
                    defaultTheme,
                    allowUserPreference,
                    allowPreview,
                    updatedAt: new Date().toISOString()
                }
            });
            window.EngiLearnThemeEngine?.apply(activeTheme);
            this.showActionStatus("Website theme applied successfully.");
            await this.load();
            this.openTab("website-settings");
        } catch (error) {
            this.showActionStatus(error.message || "Theme save failed.", "error");
        }
    },

    exportThemeSettings() {
        const box = document.getElementById("themeImportExportBox");
        if (!box || !window.EngiLearnThemeEngine) return;
        const settings = this.data.settings?.themeEngine || {};
        box.value = JSON.stringify({
            version: 1,
            exportedAt: new Date().toISOString(),
            themeEngine: settings,
            presets: window.EngiLearnThemeEngine.presets
        }, null, 2);
        this.showActionStatus("Theme settings exported.");
    },

    async importThemeSettings() {
        if (!this.isMainAdmin()) {
            this.showActionStatus("Only Main Admin can import website themes.", "error");
            return;
        }
        const box = document.getElementById("themeImportExportBox");
        if (!box?.value.trim()) {
            this.showActionStatus("Paste exported theme JSON first.", "error");
            return;
        }
        try {
            const parsed = JSON.parse(box.value);
            const themeEngine = parsed.themeEngine || parsed;
            await EngiLearnAPI.updateSettings({ themeEngine });
            window.EngiLearnThemeEngine?.apply(themeEngine.activeTheme || "nothing-os");
            this.showActionStatus("Theme settings imported.");
            await this.load();
            this.openTab("website-settings");
        } catch (error) {
            this.showActionStatus(error.message || "Theme import failed.", "error");
        }
    },


    renderActivityLogs() {
        const target = document.getElementById("activityLogRows");
        if (!target) return;
        const search = String(document.getElementById("activityLogSearch")?.value || "").trim().toLowerCase();
        const logs = this.filterByAdminDate((this.data.logs || [])
            .filter((log) => `${log.action || ""} ${log.detail || ""} ${log.adminName || ""}`.toLowerCase().includes(search))
            .slice()
            .sort((a, b) => new Date(b.createdAt || b.date || 0) - new Date(a.createdAt || a.date || 0)), "activityLogs", (log) => this.firstAdminDate(log, ["createdAt", "date", "time", "timestamp"]), "activity logs");
        target.innerHTML = logs.map((log) => `
            <tr>
                <td><input class="activity-log-select" type="checkbox" value="${this.escapeAttribute(log.id)}" aria-label="Select activity log"></td>
                <td>${this.escapeHtml(log.action || "Activity")}</td>
                <td>${this.escapeHtml(log.detail || "")}</td>
                <td>${this.escapeHtml(log.adminName || "Admin")}</td>
                <td>${this.formatAdminDate(log.createdAt || log.date || log.time || log.timestamp)}</td>
            </tr>
        `).join("") || `<tr><td colspan="5">No admin activity history yet.</td></tr>`;
    },
    mergeLocalStudentHistory() {
        const localHistory = JSON.parse(localStorage.getItem("student_watch_history") || "[]");
        const existing = new Set((this.data.watchHistory || []).map((item) => `${item.userId}-${item.email || ""}-${item.lectureId}`));
        localHistory.forEach((item) => {
            const matchedUser = this.data.users.find((user) =>
                (item.email && String(user.email).toLowerCase() === String(item.email).toLowerCase()) ||
                String(user.id) === String(item.userId)
            );
            const record = {
                ...item,
                userId: matchedUser?.id || item.userId || "local-student",
                studentName: matchedUser?.name || item.studentName || "Local Student"
            };
            const key = `${record.userId}-${record.email || ""}-${record.lectureId}`;
            if (!existing.has(key)) {
                this.data.watchHistory.push(record);
                existing.add(key);
            }
        });
    },

    renderOverview() {
        const grid = document.getElementById("mostWatchedGrid");
        if (!grid) return;
        grid.innerHTML = this.analytics.mostWatched.map((lecture) => `
            <article class="lms-card">
                <span class="lms-badge">${lecture.views || 0} views</span>
                <h3>${this.escapeHtml(lecture.title)}</h3>
                <p class="lms-meta">${this.escapeHtml(lecture.subject)} | ${this.escapeHtml(lecture.teacherName || "Teacher")}</p>
            </article>
        `).join("") || `<div class="lms-empty">No lecture views yet.</div>`;
    },

    renderLectures() {
        const search = document.getElementById("adminLectureSearch").value.toLowerCase();
        const lectures = this.data.lectures.filter((lecture) => `${this.escapeHtml(lecture.title)} ${this.escapeHtml(lecture.subject)} ${lecture.teacherName}`.toLowerCase().includes(search));
        document.getElementById("lectureRows").innerHTML = lectures.map((lecture) => `
            <tr>
                <td><strong>${this.escapeHtml(lecture.title)}</strong><br><span class="lms-meta">${this.escapeHtml(lecture.chapter || "")}</span></td>
                <td>${this.escapeHtml(lecture.branch)}<br>Sem ${this.escapeHtml(lecture.semester)} | ${this.escapeHtml(lecture.course)}</td>
                <td>${this.escapeHtml(lecture.teacherName || "")}</td>
                <td><span class="lms-badge">${this.escapeHtml(lecture.sourceType || "video")}</span>${lecture.isSubscriber === true ? `<br><span class="lms-meta">Subscriber</span>` : ""}</td>
                <td>${lecture.views || 0}</td>
                <td><button class="lms-btn danger" onclick="adminLms.deleteLecture(${lecture.id})"><i class="fas fa-trash"></i></button></td>
            </tr>
        `).join("") || `<tr><td colspan="6">No lectures uploaded.</td></tr>`;
    },

    renderSubscriberLectures() {
        const target = document.getElementById("subscriberLectureRows");
        if (!target) return;
        const search = String(document.getElementById("subscriberLectureSearch")?.value || "").toLowerCase();
        const lectures = this.filterByAdminDate((this.data.lectures || [])
            .filter((lecture) => lecture.isSubscriber === true)
            .filter((lecture) => `${lecture.title} ${lecture.subject} ${lecture.teacherName} ${lecture.branch}`.toLowerCase().includes(search))
            .sort((a, b) => new Date(b.createdAt || b.updatedAt || b.date || 0) - new Date(a.createdAt || a.updatedAt || a.date || 0)), "subscriberVideos", (lecture) => this.firstAdminDate(lecture, ["createdAt", "updatedAt", "uploadedAt", "date"]), "subscriber videos");
        target.innerHTML = lectures.map((lecture) => `
            <tr>
                <td><strong>${this.escapeHtml(lecture.title)}</strong><br><span class="lms-meta">${this.escapeHtml(lecture.chapter || lecture.sourceType || "Video")}</span></td>
                <td>${this.escapeHtml(lecture.branch)}<br>Sem ${this.escapeHtml(lecture.semester)} | ${this.escapeHtml(lecture.subject)}</td>
                <td>${this.escapeHtml(lecture.teacherName || "Teacher")}</td>
                <td><span class="lms-badge">${lecture.isActive === false ? "Disabled" : "Active"}</span></td>
                <td>${this.formatAdminDate(lecture.createdAt || lecture.updatedAt || lecture.uploadedAt || lecture.date)}</td>
                <td>
                    <button class="lms-btn secondary" type="button" onclick="adminLms.toggleSubscriberLectureStatus(${lecture.id}, ${lecture.isActive === false ? "true" : "false"})"><i class="fas ${lecture.isActive === false ? "fa-play" : "fa-pause"}"></i> ${lecture.isActive === false ? "Activate" : "Disable"}</button>
                    <button class="lms-btn secondary" type="button" onclick="adminLms.removeFromSubscriberLibrary(${lecture.id})"><i class="fas fa-box-archive"></i> Remove</button>
                    <button class="lms-btn danger" type="button" onclick="adminLms.deleteLecture(${lecture.id})"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `).join("") || `<tr><td colspan="6">No subscriber videos match this filter.</td></tr>`;
    },

    renderSubjects() {
        document.getElementById("subjectGrid").innerHTML = this.data.subjects.map((subject) => `
            <article class="lms-card">
                <span class="lms-badge">Sem ${this.escapeHtml(subject.semester)}</span>
                <h3>${this.escapeHtml(subject.name)}</h3>
                <p class="lms-meta">${this.escapeHtml(subject.branch)} | ${this.escapeHtml(subject.course)}</p>
                <p>${this.escapeHtml(subject.teacher || "Teacher not assigned")}</p>
                <button class="lms-btn danger" onclick="adminLms.deleteSubject(${subject.id})"><i class="fas fa-trash"></i> Delete</button>
            </article>
        `).join("");
    },

    renderPyqManager() {
        const stats = document.getElementById("pyqAdminStats");
        const rows = document.getElementById("adminPyqRows");
        if (!stats || !rows) return;
        const papers = (this.data.content || []).filter((item) => String(item.type || "").toLowerCase().includes("pyq"));
        const search = String(document.getElementById("adminPyqSearch")?.value || "").toLowerCase();
        const filtered = papers.filter((item) => `${item.subject} ${item.subjectCode} ${item.semester} ${item.year} ${item.session} ${item.branch}`.toLowerCase().includes(search));
        const allowed = this.canManagePyq();
        document.querySelectorAll('[data-lms-tab-target="pyq-manager"]').forEach((button) => {
            button.hidden = !allowed;
        });
        const uniqueSubjects = new Set(papers.map((item) => item.subject).filter(Boolean)).size;
        const uniqueCodes = new Set(papers.map((item) => item.subjectCode).filter(Boolean)).size;
        const semesters = new Set(papers.map((item) => String(item.semester || "")).filter(Boolean)).size;
        stats.innerHTML = [
            [papers.length, "PYQ Papers"],
            [uniqueSubjects, "Subjects"],
            [uniqueCodes, "Subject Codes"],
            [semesters, "Semesters"]
        ].map(([value, label]) => `<article class="lms-card"><span class="lms-badge">${this.escapeHtml(label)}</span><h3>${value}</h3></article>`).join("");
        rows.innerHTML = filtered.slice(0, 300).map((item) => `
            <tr>
                <td><strong>${this.escapeHtml(item.subject || item.title)}</strong><br><span class="lms-meta">${this.escapeHtml(item.branch || "")}</span></td>
                <td><span class="lms-badge">${this.escapeHtml(item.subjectCode || "Not set")}</span></td>
                <td>${this.escapeHtml(item.semester || "")}</td>
                <td>${this.escapeHtml(item.year || "")}</td>
                <td>${this.escapeHtml(item.session || "")}</td>
                <td>${item.fileUrl || item.filePath ? `<a class="lms-btn secondary" href="${this.safeUrl(item.fileUrl || item.filePath)}" target="_blank" rel="noopener"><i class="fas fa-file-pdf"></i> Open</a>` : "No file"}</td>
                <td>${allowed ? `<div class="admin-row-actions"><button class="lms-btn secondary" type="button" onclick="adminLms.editPyq(${Number(item.id)})"><i class="fas fa-pen"></i> Edit</button><button class="lms-btn danger" type="button" onclick="adminLms.deletePyq(${Number(item.id)})"><i class="fas fa-trash"></i> Delete</button></div>` : `<span class="lms-meta">Academic Admin only</span>`}</td>
            </tr>
        `).join("") || `<tr><td colspan="7">No PYQ records found.</td></tr>`;
        if (filtered.length > 300) {
            rows.insertAdjacentHTML("beforeend", `<tr><td colspan="7">Showing first 300 of ${filtered.length} records. Use search to narrow results.</td></tr>`);
        }
        document.getElementById("importPyqDatasetBtn").disabled = !allowed;
        const downloadButton = document.getElementById("downloadAllPyqBtn");
        if (downloadButton) {
            downloadButton.hidden = !allowed;
            downloadButton.disabled = !allowed || !papers.length;
        }
        document.querySelectorAll("#pyqUploadForm input, #pyqUploadForm select, #pyqUploadForm textarea, #pyqUploadForm button").forEach((control) => {
            control.disabled = !allowed;
        });
    },

    renderRepeatedQuestionManager() {
        const rows = document.getElementById("adminRepeatedQuestionRows");
        if (!rows) return;
        const allowed = this.canManagePyq();
        const search = String(document.getElementById("adminRepeatedQuestionSearch")?.value || "").trim().toLowerCase();
        const questions = (this.data.content || [])
            .filter((item) => String(item.type || "").toLowerCase() === "repeated question")
            .filter((item) => `${item.branch} ${item.branchId} ${item.semester} ${item.subject} ${item.subjectCode} ${item.unitLabel || item.unit} ${item.question || item.topic}`.toLowerCase().includes(search))
            .sort((a, b) => String(a.branch || "").localeCompare(String(b.branch || ""))
                || Number(a.semester || 0) - Number(b.semester || 0)
                || String(a.subjectCode || "").localeCompare(String(b.subjectCode || ""), undefined, { numeric: true })
                || String(a.unit || "").localeCompare(String(b.unit || ""), undefined, { numeric: true }));
        rows.innerHTML = questions.slice(0, 500).map((item) => {
            const years = Array.isArray(item.years) ? item.years.join(", ") : String(item.years || item.year || "Not listed");
            return `
                <tr>
                    <td><strong>${this.escapeHtml(item.question || item.topic || item.title || "")}</strong></td>
                    <td>${this.escapeHtml(item.branch || "")}<br><span class="lms-meta">Sem ${this.escapeHtml(item.semester || "")} / ${this.escapeHtml(item.subjectCode || "")} ${this.escapeHtml(item.subject || "")}</span></td>
                    <td>${this.escapeHtml(item.unitLabel || item.unit || "Extra Questions")}</td>
                    <td>${Math.max(1, Number(item.repeatCount || 1))} times</td>
                    <td>${this.escapeHtml(years)}</td>
                    <td><span class="lms-badge ${item.isActive === false ? "" : "success"}">${item.isActive === false ? "Hidden" : "Active"}</span></td>
                    <td>${allowed ? `<div class="admin-row-actions"><button class="lms-btn secondary" type="button" onclick="adminLms.editRepeatedQuestion(${Number(item.id)})"><i class="fas fa-pen"></i> Edit</button><button class="lms-btn danger" type="button" onclick="adminLms.deleteRepeatedQuestion(${Number(item.id)})"><i class="fas fa-trash"></i> Delete</button></div>` : `<span class="lms-meta">Academic Admin only</span>`}</td>
                </tr>`;
        }).join("") || `<tr><td colspan="7">No admin-added repeated questions found. Use the form above to add one.</td></tr>`;
        if (questions.length > 500) {
            rows.insertAdjacentHTML("beforeend", `<tr><td colspan="7">Showing first 500 of ${questions.length} questions. Use search to narrow results.</td></tr>`);
        }
        document.querySelectorAll("#repeatedQuestionForm input, #repeatedQuestionForm select, #repeatedQuestionForm textarea, #repeatedQuestionForm button").forEach((control) => {
            control.disabled = !allowed;
        });
    },

    editPyq(id) {
        const item = (this.data.content || []).find((content) => Number(content.id) === Number(id));
        const modal = document.getElementById("pyqEditModal");
        if (!item || !modal) return;
        document.getElementById("pyqEditId").value = item.id;
        document.getElementById("pyqEditBranch").value = item.branch || "";
        document.getElementById("pyqEditBranchId").value = item.branchId || "";
        document.getElementById("pyqEditSemester").value = item.semester || "1";
        document.getElementById("pyqEditSubject").value = item.subject || "";
        document.getElementById("pyqEditSubjectCode").value = item.subjectCode || "";
        document.getElementById("pyqEditYear").value = item.year || "";
        document.getElementById("pyqEditSession").value = item.session || "Jun";
        document.getElementById("pyqEditTopic").value = item.topic || "";
        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");
    },

    closePyqEdit() {
        const modal = document.getElementById("pyqEditModal");
        modal?.classList.remove("open");
        modal?.setAttribute("aria-hidden", "true");
        document.getElementById("pyqEditForm")?.reset();
    },

    editRepeatedQuestion(id) {
        const item = (this.data.content || []).find((content) => Number(content.id) === Number(id));
        if (!item) return;
        document.getElementById("repeatedQuestionId").value = item.id;
        document.getElementById("repeatedQuestionBranch").value = item.branch || "";
        document.getElementById("repeatedQuestionBranchId").value = item.branchId || "";
        document.getElementById("repeatedQuestionSemester").value = item.semester || "1";
        document.getElementById("repeatedQuestionSubject").value = item.subject || "";
        document.getElementById("repeatedQuestionSubjectCode").value = item.subjectCode || "";
        document.getElementById("repeatedQuestionUnit").value = item.unit || "extra";
        document.getElementById("repeatedQuestionCount").value = Math.max(1, Number(item.repeatCount || 1));
        document.getElementById("repeatedQuestionYears").value = Array.isArray(item.years) ? item.years.join(", ") : String(item.years || item.year || "");
        document.getElementById("repeatedQuestionStatus").value = item.isActive === false ? "false" : "true";
        document.getElementById("repeatedQuestionText").value = item.question || item.topic || "";
        const saveButton = document.getElementById("saveRepeatedQuestionBtn");
        saveButton.innerHTML = '<i class="fas fa-save"></i> Save Changes';
        document.getElementById("cancelRepeatedQuestionEdit").hidden = false;
        document.getElementById("repeatedQuestionForm")?.scrollIntoView({ behavior: "smooth", block: "start" });
    },

    resetRepeatedQuestionForm() {
        const form = document.getElementById("repeatedQuestionForm");
        form?.reset();
        document.getElementById("repeatedQuestionId").value = "";
        document.getElementById("repeatedQuestionBranch").value = "Computer Science & Engineering";
        document.getElementById("repeatedQuestionBranchId").value = "cse";
        document.getElementById("repeatedQuestionCount").value = "1";
        document.getElementById("saveRepeatedQuestionBtn").innerHTML = '<i class="fas fa-plus"></i> Add Question';
        document.getElementById("cancelRepeatedQuestionEdit").hidden = true;
    },

    downloadAllPyq() {
        if (!this.canManagePyq()) {
            this.showActionStatus("Admin access is required to download the PYQ library.", "error");
            return;
        }
        const papers = (this.data.content || [])
            .filter((item) => String(item.type || "").toLowerCase().includes("pyq"))
            .slice()
            .sort((a, b) => Number(a.semester || 99) - Number(b.semester || 99)
                || String(a.subjectCode || "").localeCompare(String(b.subjectCode || ""), undefined, { numeric: true })
                || Number(b.year || 0) - Number(a.year || 0));
        if (!papers.length) {
            this.showActionStatus("No PYQ papers are available to download.", "error");
            return;
        }
        let backendOrigin = window.location.origin;
        try {
            const apiBase = typeof EngiLearnAPI !== "undefined" ? EngiLearnAPI.baseURL : window.location.origin;
            backendOrigin = new URL(apiBase || window.location.origin).origin;
        } catch (error) {
            backendOrigin = window.location.origin;
        }
        const fileUrl = (item) => {
            const raw = String(item.fileUrl || item.filePath || item.url || "").trim();
            if (!raw) return "";
            if (/^\/(?:pyq-files|uploads)\//i.test(raw)) return `${backendOrigin}${raw}`;
            try {
                return new URL(raw, window.location.origin).href;
            } catch (error) {
                return raw;
            }
        };
        const rows = papers.map((item, index) => {
            const url = fileUrl(item);
            return `<tr><td>${index + 1}</td><td>${this.escapeHtml(item.branch || "")}</td><td>${this.escapeHtml(item.semester || "")}</td><td>${this.escapeHtml(item.subjectCode || "")}</td><td>${this.escapeHtml(item.subject || item.title || "")}</td><td>${this.escapeHtml(item.year || "")}</td><td>${this.escapeHtml(item.session || "")}</td><td>${url ? `<a href="${this.escapeAttribute(url)}">Open PDF</a>` : "No file"}</td></tr>`;
        }).join("");
        const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>EngiLearn Complete PYQ Library</title><style>body{font-family:Arial,sans-serif;margin:24px;color:#111}h1{margin:0 0 6px}p{color:#666}table{border-collapse:collapse;width:100%;font-size:13px}th,td{border:1px solid #ddd;padding:8px;text-align:left}th{background:#111;color:#fff;position:sticky;top:0}tr:nth-child(even){background:#f6f6f6}a{color:#b51219;font-weight:700}</style></head><body><h1>EngiLearn Complete PYQ Library</h1><p>${papers.length} admin-managed PYQ papers exported on ${this.escapeHtml(new Date().toLocaleString())}.</p><table><thead><tr><th>#</th><th>Branch</th><th>Sem</th><th>Code</th><th>Subject</th><th>Year</th><th>Session</th><th>PDF</th></tr></thead><tbody>${rows}</tbody></table></body></html>`;
        const blob = new Blob([html], { type: "text/html;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `engilearn-complete-pyq-library-${new Date().toISOString().slice(0, 10)}.html`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
        this.showActionStatus(`Downloaded the complete ${papers.length}-paper PYQ library index.`);
    },
    ensureSplitAccountApprovalControls() {
        return false;
    },
    syncAccountApprovalControl() {
        return false;
    },
    async saveAccountApprovalSettings(event) {
        event.preventDefault();
        this.showActionStatus("Verified accounts activate automatically; no approval is required.");
    },

    renderRequests() {
        const target = document.getElementById("requestRows");
        if (target) target.innerHTML = "";
    },

    normalizeAccountRole(role) {
        const value = String(role || "Student").trim().toLowerCase();
        if (value === "admin") return "Admin";
        if (value === "teacher") return "Teacher";
        return "Student";
    },

    renderStudents() {
        const search = document.getElementById("studentSearch").value.toLowerCase();
        const accountsByKey = new Map();
        [...(this.data.users || []), ...(this.data.admins || [])].forEach((account) => {
            const key = `${account.role || "User"}:${account.id || account.email || account.mobile || account.phone || account.adminId || account.teacherId || account.rollNumber}`;
            accountsByKey.set(key, account);
        });
        const students = [...accountsByKey.values()]
            .filter((user) => {
                const role = this.normalizeAccountRole(user.role);
                return role === "Student" || role === "Teacher" || (this.isMainAdmin() && role === "Admin");
            })
            .filter((user) => this.accountRoleFilter === "all" || this.normalizeAccountRole(user.role) === this.normalizeAccountRole(this.accountRoleFilter))
            .filter((user) => `${this.escapeHtml(user.name)} ${this.escapeHtml(user.email)} ${user.rollNumber || ""} ${user.teacherId || ""} ${user.adminId || ""} ${this.escapeHtml(user.phone || user.mobile || "")} ${this.escapeHtml(user.branch || "")} ${this.escapeHtml(user.course || "")} ${this.escapeHtml(user.department || "")} ${this.escapeHtml(user.designation || "")}`.toLowerCase().includes(search));
        document.getElementById("studentRows").innerHTML = students.map((user) => `
            <tr>
                <td data-label="Name"><strong>${this.escapeHtml(user.name)}</strong><br><span class="lms-meta">${this.escapeHtml(user.role)} ${this.escapeHtml(user.admissionYear || "")}</span></td>
                <td data-label="Contact">${this.escapeHtml(user.email)}<br>${this.escapeHtml(user.rollNumber || user.teacherId || "")}<br>${this.escapeHtml(user.phone || user.mobile || "")}</td>
                <td data-label="Academic">${user.role === "Admin" ? `${this.escapeHtml(user.department || "Admin")}<br>${this.escapeHtml(user.designation || "")}` : `${this.escapeHtml(user.course || "")}<br>${this.escapeHtml(user.branch || "")}, Sem ${this.escapeHtml(user.semester || "")}`}</td>
                <td data-label="Learning">${this.studentLearningSummary(user)}</td>
                <td data-label="About">${this.escapeHtml(user.about || "No student note saved.")}</td>
                <td data-label="Status">
                    <span class="lms-badge">${this.escapeHtml(user.status)}</span>
                    <span class="lms-badge">${user.isVerified === false ? "Verification pending" : "Verified"}</span>
                </td>
                <td data-label="Actions">
                    <div class="account-action-cluster" aria-label="Account actions for ${this.escapeAttribute(user.name)}">
                        <button class="lms-btn account-action-btn is-info" type="button" onclick="adminLms.showAccountInfo(${user.id})" title="View account information">
                            <i class="fas fa-circle-info"></i><span><strong>Details</strong><small>View account</small></span>
                        </button>
                        <button class="lms-btn account-action-btn ${user.status === "Blocked" ? "is-off" : "is-on"}" type="button" onclick="adminLms.toggleUserAccess(${user.id}, 'students')" title="${user.status === "Blocked" ? "Restore account access" : "Block account access"}">
                            <i class="fas ${user.status === "Blocked" ? "fa-lock" : "fa-user-check"}"></i><span><span class="account-action-label"><strong>${user.status === "Blocked" ? "Unblock" : "Block"}</strong><em class="account-action-state">${user.status === "Blocked" ? "OFF" : "ON"}</em></span><small>${user.status === "Blocked" ? "Account disabled" : "Account active"}</small></span>
                        </button>
                        ${user.role === "Admin" ? "" : `<button class="lms-btn account-action-btn is-notify" type="button" onclick="adminLms.openPersonalNotification(${user.id})" title="Send personal notification"><i class="fas fa-paper-plane"></i><span><strong>Notify</strong><small>Personal message</small></span></button>`}
                        ${user.role === "Admin" ? "" : this.accessGrantButtons(user)}
                        ${user.role === "Admin" ? "" : `<button class="lms-btn account-action-btn is-danger" type="button" onclick="adminLms.deleteUser(${user.id})" title="Delete account permanently"><i class="fas fa-trash"></i><span><strong>Delete</strong><small>Remove account</small></span></button>`}
                    </div>
                </td>
            </tr>
        `).join("") || `<tr><td colspan="7">No student, teacher, or admin accounts found.</td></tr>`;
    },

    renderContacts() {
        const target = document.getElementById("contactRows");
        if (!target) return;
        const search = String(document.getElementById("contactSearch")?.value || "").trim().toLowerCase();
        const rows = this.filterByAdminDate((this.data.contacts || [])
            .filter((item) => `${item.name || ""} ${item.email || ""} ${item.phone || ""} ${item.topic || ""} ${item.message || ""} ${item.status || ""}`.toLowerCase().includes(search))
            .slice()
            .sort((a, b) => new Date(b.createdAt || b.updatedAt || 0) - new Date(a.createdAt || a.updatedAt || 0)), "contacts", (item) => this.firstAdminDate(item, ["createdAt", "receivedAt", "updatedAt", "date"]), "contact messages")
            .map((item) => {
                const status = item.status || "New";
                const isResolved = status === "Resolved";
                return `
                <tr class="${isResolved ? "contact-resolved" : "contact-unresolved"}">
                    <td><input class="contact-select" type="checkbox" value="${this.escapeAttribute(item.id)}" aria-label="Select support message"></td>
                    <td><strong>${this.escapeHtml(item.name || "Visitor")}</strong><br><span class="lms-meta">#${this.escapeHtml(item.id || "")}</span></td>
                    <td>${this.escapeHtml(item.email || "")}<br>${this.escapeHtml(item.phone || "")}</td>
                    <td><span class="lms-badge">${this.escapeHtml(item.topic || "General")}</span></td>
                    <td>${this.escapeHtml(item.message || "")}</td>
                    <td><span class="lms-badge ${isResolved ? "success" : "warning"}">${this.escapeHtml(status)}</span>${item.updatedAt ? `<br><span class="lms-meta">Updated ${this.formatAdminDate(item.updatedAt)}</span>` : ""}</td>
                    <td>${this.formatAdminDate(item.createdAt || item.receivedAt || item.date)}</td>
                    <td class="contact-actions">
                        <button class="lms-btn ${isResolved ? "secondary" : ""}" onclick="adminLms.setContactStatus(${Number(item.id)}, '${isResolved ? "Unresolved" : "Resolved"}')"><i class="fas ${isResolved ? "fa-rotate-left" : "fa-check"}"></i> ${isResolved ? "Unresolve" : "Resolve"}</button>
                        <button class="lms-btn danger" onclick="adminLms.deleteContact(${Number(item.id)})"><i class="fas fa-trash"></i> Delete</button>
                    </td>
                </tr>
            `;
            }).join("");
        target.innerHTML = rows || `<tr><td colspan="8">No contact messages yet.</td></tr>`;
    },

    async setContactStatus(id, status) {
        try {
            await EngiLearnAPI.updateContactStatus(id, status);
            this.showActionStatus(`Message marked ${status.toLowerCase()}.`);
            await this.load();
            this.openTab("contacts");
        } catch (error) {
            this.showActionStatus(error.message || "Message status update failed.", "error");
        }
    },

    async deleteContact(id) {
        if (!confirm("Delete this contact message permanently?")) return;
        try {
            await EngiLearnAPI.deleteContact(id);
            this.showActionStatus("Contact message deleted.");
            await this.load();
            this.openTab("contacts");
        } catch (error) {
            this.showActionStatus(error.message || "Contact message delete failed.", "error");
        }
    },

    renderVisitors() {
        const statsTarget = document.getElementById("visitorStats");
        const rowsTarget = document.getElementById("visitorRows");
        if (!rowsTarget) return;

        const search = String(document.getElementById("visitorSearch")?.value || "").trim().toLowerCase();
        const allVisits = (this.data.visits || []).slice();
        const todayKey = new Date().toISOString().slice(0, 10);
        const visibleVisits = this.filterByAdminDate(allVisits
            .filter((visit) => [
                visit.visitorId, visit.sessionId, visit.userName, visit.userEmail, visit.userRole,
                visit.pageTitle, visit.page, visit.url, visit.referrer, visit.browser, visit.os,
                visit.deviceType, visit.ipAddress, visit.theme, visit.language, visit.timezone
            ].join(" ").toLowerCase().includes(search))
            .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)), "visitors", (visit) => this.firstAdminDate(visit, ["createdAt", "updatedAt", "date"]), "visitor records");

        const uniqueVisitors = new Set(allVisits.map((visit) => visit.visitorId).filter(Boolean)).size;
        const todayVisits = allVisits.filter((visit) => String(visit.createdAt || "").slice(0, 10) === todayKey).length;
        const pageCount = new Set(allVisits.map((visit) => visit.page || visit.url).filter(Boolean)).size;
        const mobileVisits = allVisits.filter((visit) => /mobile|tablet/i.test(String(visit.deviceType || ""))).length;
        if (statsTarget) {
            statsTarget.innerHTML = [
                [allVisits.length, "Total visits"],
                [uniqueVisitors, "Unique visitors"],
                [todayVisits, "Today"],
                [pageCount, "Pages visited"],
                [mobileVisits, "Mobile/tablet"]
            ].map(([value, label]) => `<article class="lms-card visitor-stat-card"><span class="lms-badge">${this.escapeHtml(label)}</span><h3>${this.escapeHtml(value)}</h3></article>`).join("");
        }

        rowsTarget.innerHTML = visibleVisits.map((visit) => {
            const screen = visit.screen || {};
            const viewport = visit.viewport || {};
            const connection = visit.connection || {};
            const account = visit.userEmail || visit.userName || visit.userRole
                ? `${this.escapeHtml(visit.userName || "Guest")}<br><span class="lms-meta">${this.escapeHtml(visit.userEmail || "No email")} | ${this.escapeHtml(visit.userRole || "Guest")}</span>`
                : "Guest visitor";
            const page = visit.pageTitle || visit.page || "Website page";
            const referrer = visit.referrer ? `<br><span class="lms-meta">From: ${this.escapeHtml(visit.referrer)}</span>` : "";
            const network = [
                connection.effectiveType ? `${connection.effectiveType}` : "",
                connection.downlink ? `${connection.downlink} Mbps` : "",
                connection.rtt ? `${connection.rtt} ms` : "",
                connection.saveData ? "Save-data" : ""
            ].filter(Boolean).join(" | ");
            return `
                <tr>
                    <td><input class="visitor-select" type="checkbox" value="${this.escapeAttribute(visit.id)}" aria-label="Select visitor record"></td>
                    <td><strong>${this.escapeHtml(visit.visitorId || "Visitor")}</strong><br><span class="lms-meta">Session: ${this.escapeHtml(visit.sessionId || "Not saved")}</span></td>
                    <td>${account}</td>
                    <td><strong>${this.escapeHtml(page)}</strong><br><span class="lms-meta">${this.escapeHtml(visit.page || visit.url || "")}</span>${referrer}</td>
                    <td><span class="lms-badge">${this.escapeHtml(visit.deviceType || "Device")}</span><br>${this.escapeHtml(visit.browser || "Browser")} / ${this.escapeHtml(visit.os || "OS")}<br><span class="lms-meta">${this.escapeHtml(visit.platform || "")}</span></td>
                    <td>${this.escapeHtml(screen.width || 0)}x${this.escapeHtml(screen.height || 0)}<br><span class="lms-meta">Viewport ${this.escapeHtml(viewport.width || 0)}x${this.escapeHtml(viewport.height || 0)} | ${this.escapeHtml(visit.theme || "default")}</span></td>
                    <td>${this.escapeHtml(visit.ipAddress || "Local")}<br><span class="lms-meta">${this.escapeHtml(visit.language || "")} ${this.escapeHtml(visit.timezone || "")}</span><br><span class="lms-meta">${this.escapeHtml(network || "Network not available")}</span></td>
                    <td>${this.formatAdminDate(visit.createdAt || visit.date)}</td>
                    <td>
                        <details class="visitor-user-agent"><summary>Details</summary><span>${this.escapeHtml(visit.userAgent || "No user agent saved")}</span></details>
                        <button class="lms-btn danger" type="button" onclick="adminLms.deleteVisit(${Number(visit.id)})"><i class="fas fa-trash"></i> Delete</button>
                    </td>
                </tr>
            `;
        }).join("") || `<tr><td colspan="9">No visitor records found.</td></tr>`;
    },

    async deleteVisit(id) {
        if (!confirm("Delete this visitor record permanently?")) return;
        try {
            await EngiLearnAPI.deleteVisit(id);
            this.showActionStatus("Visitor record deleted.");
            await this.load();
            this.openTab("visitors");
        } catch (error) {
            this.showActionStatus(error.message || "Visitor record delete failed.", "error");
        }
    },

    isCompletedPayment(payment) {
        const status = String(payment?.status || "").toLowerCase();
        const gatewayStatus = String(payment?.gatewayStatus || "").toLowerCase();
        return status === "paid" || gatewayStatus === "captured" || Boolean(payment?.verifiedAt && payment?.providerPaymentId);
    },

    paymentAcademicLine(payment, user = {}) {
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

    studentPaymentSlips(user) {
        return (this.data.payments || [])
            .filter((payment) => {
                const sameUser = Number(payment.userId) === Number(user.id);
                const sameEmail = payment.studentEmail && user.email && String(payment.studentEmail).toLowerCase() === String(user.email).toLowerCase();
                return (sameUser || sameEmail) && this.isCompletedPayment(payment);
            })
            .sort((a, b) => new Date(b.verifiedAt || b.paidAt || b.createdAt || b.date || 0) - new Date(a.verifiedAt || a.paidAt || a.createdAt || a.date || 0));
    },
    renderStudentPaymentSlips(user) {
        const slips = this.studentPaymentSlips(user);
        return slips.slice(0, 10).map((payment) => {
            const key = encodeURIComponent(this.toolHubPaymentKey(payment));
            const status = payment.status || (payment.verifiedAt || payment.paidAt ? "Paid" : "Created");
            const product = payment.type || payment.product || payment.course || "EngiLearn Access";
            const amount = `${payment.currency || "INR"} ${Number(payment.amount || 0)}`;
            const orderId = payment.providerOrderId || payment.orderId || payment.receipt || "Not added";
            const paymentId = payment.providerPaymentId || payment.paymentId || payment.utr || "Waiting for payment";
            const date = payment.verifiedAt || payment.paidAt || payment.createdAt || payment.date;
            const academicLine = this.paymentAcademicLine(payment, user);
            return `
                <article class="student-payment-slip-row">
                    <div>
                        <strong>${this.escapeHtml(product)}</strong>
                        <span>${this.escapeHtml(status)} | ${this.escapeHtml(amount)}</span>
                        ${academicLine ? `<span>Unlocked: ${this.escapeHtml(academicLine)}</span>` : ""}
                        <span>Order: ${this.escapeHtml(orderId)}</span>
                    </div>
                    <div>
                        <strong>${this.escapeHtml(paymentId)}</strong>
                        <span>${this.escapeHtml(date ? new Date(date).toLocaleString() : "No date saved")}</span>
                        <div class="payment-slip-actions"><button class="lms-btn secondary compact" type="button" onclick="adminLms.viewPaymentSlipByKey('${this.escapeAttribute(key)}')"><i class="fas fa-eye"></i> View Receipt</button><button class="lms-btn compact" type="button" onclick="adminLms.downloadPaymentSlipByKey('${this.escapeAttribute(key)}')"><i class="fas fa-download"></i> Download Receipt</button></div>
                    </div>
                </article>
            `;
        }).join("") || `<div class="lms-empty">No payment slips saved for this account yet.</div>`;
    },
    showAccountInfo(id) {
        const user = this.data.users.find((item) => Number(item.id) === Number(id));
        if (!user) return;
        const role = this.escapeHtml(user.role || "Account");
        const accountIdLabel = user.role === "Teacher" ? "Teacher ID" : "Roll Number";
        const accountId = user.role === "Teacher" ? user.teacherId : (user.studentId || user.engilearnId || user.rollNumber);
        const photoUrl = this.safeUrl(user.photoUrl || user.profilePhoto || user.avatarUrl || "");
        const initials = this.escapeHtml(String(user.name || user.email || "Account").split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "A");
        const history = (this.data.watchHistory || [])
            .filter((item) => String(item.userId) === String(user.id) || (item.email && String(item.email).toLowerCase() === String(user.email).toLowerCase()))
            .sort((a, b) => new Date(b.lastWatchedAt || 0) - new Date(a.lastWatchedAt || 0));
        const submissions = (this.data.submissions || []).filter((item) => Number(item.userId) === Number(user.id));
        const paymentSlips = this.studentPaymentSlips(user);
        const completed = history.filter((item) => Number(item.progress || 0) >= 95).length;
        const average = history.length ? Math.round(history.reduce((sum, item) => sum + Number(item.progress || 0), 0) / history.length) : 0;
        const modal = document.getElementById("studentDetailModal");
        modal.innerHTML = `
            <div class="lms-modal-card" role="dialog" aria-modal="true" aria-label="${role} account information">
                <div class="lms-modal-head student-account-detail-head">
                    <div class="student-account-identity">
                        <div class="student-account-photo">
                            ${photoUrl ? `<img src="${photoUrl}" alt="${this.escapeAttribute(user.name || "Account")} profile photo">` : `<span>${initials}</span>`}
                        </div>
                        <div>
                            <span class="lms-badge">${role} Account Info</span>
                            <h2>${this.escapeHtml(user.name)}</h2>
                            <p class="lms-meta">${this.escapeHtml(user.email)} | ${this.escapeHtml(accountId || "No account ID")}</p>
                        </div>
                    </div>
                    <button class="lms-icon-btn" type="button" onclick="adminLms.closeStudentDetail()" aria-label="Close"><i class="fas fa-xmark"></i></button>
                </div>
                <div class="student-detail-stats">
                    <article><span>Watched</span><strong>${history.length}</strong></article>
                    <article><span>Completed</span><strong>${completed}</strong></article>
                    <article><span>Average</span><strong>${average}%</strong></article>
                    <article><span>Submissions</span><strong>${submissions.length}</strong></article>
                </div>
                <div class="student-detail-grid">
                    <article class="lms-card student-detail-card">
                        <span class="lms-badge">Contact</span>
                        <p><strong>Email</strong><span>${this.escapeHtml(user.email || "Not added")}</span></p>
                        <p><strong>Phone</strong><span>${this.escapeHtml(user.phone || user.mobile || "Not added")}</span></p>
                        <p><strong>${accountIdLabel}</strong><span>${this.escapeHtml(accountId || "Not added")}</span></p>
                    </article>
                    <article class="lms-card student-detail-card">
                        <span class="lms-badge">Academic</span>
                        <p><strong>Branch</strong><span>${this.escapeHtml(user.branch || "Not added")}</span></p>
                        <p><strong>Semester</strong><span>${this.escapeHtml(user.semester || "Not added")}</span></p>
                        <p><strong>Course</strong><span>${this.escapeHtml(user.course || "Not added")}</span></p>
                        <p><strong>Admission Year</strong><span>${this.escapeHtml(user.admissionYear || "Not added")}</span></p>
                    </article>
                    <article class="lms-card student-detail-card">
                        <span class="lms-badge">Profile</span>
                        <p><strong>Status</strong><span>${this.escapeHtml(user.status || "Active")}</span></p>
                        <p><strong>Verification</strong><span>${user.isVerified === false ? "Pending" : "Verified"}</span></p>
                        <p><strong>About</strong><span>${this.escapeHtml(user.about || "No about information saved.")}</span></p>
                    </article>
                </div>
                <div class="admin-actions">
                    <button class="lms-btn ${user.status === "Blocked" ? "secondary" : "danger"}" onclick="adminLms.toggleUserAccess(${user.id})">${user.status === "Blocked" ? "Unblock" : "Block"}</button>
                    ${user.role === "Admin" ? "" : `<button class="lms-btn account-action-btn is-notify" type="button" onclick="adminLms.openPersonalNotification(${user.id})" title="Send personal notification"><i class="fas fa-paper-plane"></i><span><strong>Notify</strong><small>Personal message</small></span></button>`}
                    ${user.role === "Admin" ? "" : this.accessGrantButtons(user)}
                    <button class="lms-btn danger" onclick="adminLms.deleteUser(${user.id})"><i class="fas fa-trash"></i> Delete</button>
                </div>
                <section class="student-history-panel student-payment-slip-panel">
                    <div class="lms-modal-head">
                        <h3>Payment Slips</h3>
                        <span class="lms-badge">${paymentSlips.length} slips</span>
                    </div>
                    <div class="student-history-list student-payment-slip-list">
                        ${this.renderStudentPaymentSlips(user)}
                    </div>
                </section>
                <section class="student-history-panel">
                    <div class="lms-modal-head">
                        <h3>Recent Watch History</h3>
                        <span class="lms-badge">${history.length} records</span>
                    </div>
                    <div class="student-history-list">
                        ${history.slice(0, 10).map((item) => {
                            const lecture = this.data.lectures.find((entry) => String(entry.id) === String(item.lectureId));
                            const title = item.lectureTitle || lecture?.title || `Lecture ${item.lectureId}`;
                            return `
                                <article>
                                    <div>
                                        <strong>${this.escapeHtml(title)}</strong>
                                        <span>${this.escapeHtml(item.subject || lecture?.subject || "Subject")} | ${this.escapeHtml(item.teacher || lecture?.teacherName || "Teacher")}</span>
                                    </div>
                                    <div>
                                        <strong>${Math.round(Number(item.progress || 0))}%</strong>
                                        <span>${item.lastWatchedAt ? new Date(item.lastWatchedAt).toLocaleString() : "No time saved"}</span>
                                    </div>
                                </article>
                            `;
                        }).join("") || `<div class="lms-empty">No watched videos yet.</div>`}
                    </div>
                </section>
                <section class="student-history-panel">
                    <div class="lms-modal-head">
                        <h3>Assignment Submissions</h3>
                        <span class="lms-badge">${submissions.length} records</span>
                    </div>
                    <div class="student-history-list">
                        ${submissions.slice(0, 8).map((item) => `
                            <article>
                                <div>
                                    <strong>Assignment #${this.escapeHtml(item.assignmentId)}</strong>
                                    <span>${this.escapeHtml(item.status || "Submitted")}</span>
                                </div>
                                <div><span>${item.submittedAt ? new Date(item.submittedAt).toLocaleString() : ""}</span></div>
                            </article>
                        `).join("") || `<div class="lms-empty">No submissions yet.</div>`}
                    </div>
                </section>
            </div>
        `;
        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");
    },

    showStudentDetail(id) {
        this.showAccountInfo(id);
    },

    openPersonalNotification(id) {
        const user = this.data.users.find((item) => Number(item.id) === Number(id));
        if (!user) return;
        const modal = document.getElementById("studentDetailModal");
        const role = this.escapeHtml(user.role || "Account");
        const accountId = user.studentId || user.engilearnId || user.rollNumber || user.teacherId || "";
        const photoUrl = this.safeUrl(user.photoUrl || user.profilePhoto || user.avatarUrl || "");
        const initials = this.escapeHtml(String(user.name || user.email || "A").split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "A");
        modal.innerHTML = `
            <div class="lms-modal-card personal-notification-card" role="dialog" aria-modal="true" aria-label="Send personal notification">
                <div class="lms-modal-head student-account-detail-head">
                    <div class="student-account-identity">
                        <div class="student-account-photo">
                            ${photoUrl ? `<img src="${photoUrl}" alt="${this.escapeAttribute(user.name || "Account")} profile photo">` : `<span>${initials}</span>`}
                        </div>
                        <div>
                            <span class="lms-badge">${role} Personal Notification</span>
                            <h2>${this.escapeHtml(user.name || "Account")}</h2>
                            <p class="lms-meta">${this.escapeHtml(user.email || "No email")} ${accountId ? `| ${this.escapeHtml(accountId)}` : ""}</p>
                        </div>
                    </div>
                    <button class="lms-icon-btn" type="button" onclick="adminLms.closeStudentDetail()" aria-label="Close"><i class="fas fa-xmark"></i></button>
                </div>
                <form class="lms-form wide personal-notification-form" onsubmit="adminLms.sendPersonalNotification(event, ${Number(user.id)})">
                    <input type="hidden" name="targetUserId" value="${this.escapeAttribute(user.id)}">
                    <input type="hidden" name="targetEmail" value="${this.escapeAttribute(user.email || "")}">
                    <input type="hidden" name="audience" value="Personal">
                    <label>Title<input name="title" required value="Important information from EngiLearn"></label>
                    <label class="wide">Message<textarea name="message" required placeholder="Write personal information for this account"></textarea></label>
                    <div class="admin-actions wide">
                        <button class="lms-btn" type="submit"><i class="fas fa-paper-plane"></i> Send Personal Notification</button>
                        <button class="lms-btn secondary" type="button" onclick="adminLms.showAccountInfo(${Number(user.id)})"><i class="fas fa-circle-info"></i> Back to Details</button>
                    </div>
                    <div class="lms-form-status" id="personalNotificationStatus" aria-live="polite"></div>
                </form>
            </div>
        `;
        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");
        modal.querySelector("textarea[name='message']")?.focus();
    },

    async sendPersonalNotification(event, id) {
        event.preventDefault();
        const form = event.target;
        const status = document.getElementById("personalNotificationStatus");
        const payload = Object.fromEntries(new FormData(form));
        payload.targetUserId = Number(id);
        payload.audience = "Personal";
        if (status) status.textContent = "Sending personal notification...";
        try {
            await EngiLearnAPI.sendNotification(payload);
            if (status) status.textContent = "Personal notification sent to this account.";
            this.showActionStatus("Personal notification sent successfully.");
            await this.load();
            this.openPersonalNotification(id);
        } catch (error) {
            if (status) status.textContent = error.message || "Personal notification failed.";
            this.showActionStatus(error.message || "Personal notification failed.", "error");
        }
    },
    closeStudentDetail() {
        const modal = document.getElementById("studentDetailModal");
        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");
        modal.innerHTML = "";
    },

    studentLearningSummary(user) {
        const history = (this.data.watchHistory || []).filter((item) => Number(item.userId) === Number(user.id));
        const submissions = (this.data.submissions || []).filter((item) => Number(item.userId) === Number(user.id));
        const completed = history.filter((item) => Number(item.progress || 0) >= 95).length;
        const last = [...history].sort((a, b) => new Date(b.lastWatchedAt || 0) - new Date(a.lastWatchedAt || 0))[0];
        const lastLecture = last ? this.data.lectures.find((lecture) => Number(lecture.id) === Number(last.lectureId)) : null;
        const avgProgress = history.length
            ? Math.round(history.reduce((sum, item) => sum + Number(item.progress || 0), 0) / history.length)
            : 0;

        return `
            <div class="lms-info-compact">
                <strong>${history.length} watched</strong>
                <span>${completed} completed | ${avgProgress}% average</span>
                <span>${submissions.length} submissions</span>
                <span>Last: ${lastLecture ? this.escapeHtml(lastLecture.title) : "No video watched"}</span>
                <span>${this.accessGrantSummary(user)}</span>
            </div>
        `;
    },

    accessGrantSummary(user) {
        const flags = [
            ["Tool Hub", user.toolHubAccess],
            ["Repeated Q", user.repeatedQuestionsAccess],
            ["Sub Videos", user.subscriberVideoAccess]
        ];
        return flags.map(([label, active]) => `${label}: ${active ? "Free" : "Paid/Locked"}`).join(" | ");
    },

    accessGrantButtons(user) {
        const button = (field, label, icon) => {
            const active = user[field] === true;
            const action = active ? "Remove free access" : "Grant free access";
            return `<button class="lms-btn account-action-btn ${active ? "is-on" : "is-off"}" type="button" onclick="adminLms.setUserGrant(${Number(user.id)}, '${field}', ${active ? "false" : "true"})" title="${action} for ${label}"><i class="fas ${icon}"></i><span><span class="account-action-label"><strong>${label}</strong><em class="account-action-state">${active ? "ON" : "OFF"}</em></span><small>${active ? "Free access enabled" : "Free access disabled"}</small></span></button>`;
        };
        return `${button("toolHubAccess", "Tool Hub", "fa-toolbox")}${button("repeatedQuestionsAccess", "Repeated Q", "fa-bullseye")}${button("subscriberVideoAccess", "Sub Videos", "fa-crown")}`;
    },

    async setUserGrant(id, field, enabled) {
        try {
            const data = await EngiLearnAPI.updateUserAccess(id, { [field]: enabled });
            const index = (this.data.users || []).findIndex((user) => Number(user.id) === Number(id));
            if (index >= 0 && data.user) this.data.users[index] = data.user;
            this.showActionStatus(`${field.replace(/([A-Z])/g, " $1").trim()} ${enabled ? "enabled" : "disabled"}.`);
            this.renderStudents();
            const modal = document.getElementById("studentDetailModal");
            if (modal?.classList.contains("open")) this.showAccountInfo(id);
        } catch (error) {
            this.showActionStatus(error.message || "Access grant update failed.", "error");
        }
    },

    renderAssignments() {
        document.getElementById("assignmentGrid").innerHTML = this.data.assignments.map((assignment) => `
            <article class="lms-card">
                <span class="lms-badge">${this.escapeHtml(assignment.subject)}</span>
                <h3>${this.escapeHtml(assignment.title)}</h3>
                <p class="lms-meta">${this.escapeHtml(assignment.branch)} | Sem ${this.escapeHtml(assignment.semester)} | Deadline ${this.escapeHtml(assignment.deadline)}</p>
                ${assignment.fileUrl ? `<a class="lms-btn secondary" href="${this.safeUrl(assignment.fileUrl)}" download>Download</a>` : ""}
                <button class="lms-btn danger" onclick="adminLms.deleteAssignment(${assignment.id})"><i class="fas fa-trash"></i> Delete</button>
            </article>
        `).join("") || `<div class="lms-empty">No assignments yet.</div>`;
        const submissionSearch = String(document.getElementById("submissionSearch")?.value || "").trim().toLowerCase();
        const submissions = this.filterByAdminDate((this.data.submissions || [])
            .filter((submission) => `${submission.studentName || ""} ${submission.assignmentId || ""} ${submission.status || ""} ${submission.text || ""}`.toLowerCase().includes(submissionSearch))
            .slice()
            .sort((a, b) => new Date(b.submittedAt || b.createdAt || b.date || 0) - new Date(a.submittedAt || a.createdAt || a.date || 0)), "submissions", (submission) => this.firstAdminDate(submission, ["submittedAt", "createdAt", "date"]), "submissions");
        document.getElementById("submissionRows").innerHTML = submissions.map((submission) => `
            <tr><td>${this.escapeHtml(submission.studentName)}</td><td>Assignment #${this.escapeHtml(submission.assignmentId)}</td><td>${this.escapeHtml(submission.status)}</td><td>${submission.fileUrl ? `<a href="${this.safeUrl(submission.fileUrl)}" download>Download</a>` : this.escapeHtml(submission.text || "")}</td><td>${this.formatAdminDate(submission.submittedAt || submission.createdAt || submission.date)}</td></tr>
        `).join("") || `<tr><td colspan="5">No submissions match this filter.</td></tr>`;
    },

    renderNotifications() {
        document.getElementById("notificationGrid").innerHTML = this.data.notifications.map((item) => `
            <article class="lms-card">
                <span class="lms-badge">${this.escapeHtml(item.audience)}</span>
                <h3>${this.escapeHtml(item.title)}</h3>
                <p>${this.escapeHtml(item.message)}</p>
            </article>
        `).join("") || `<div class="lms-empty">No notifications.</div>`;
    },

    renderLive() {
        document.getElementById("liveGrid").innerHTML = this.data.liveClasses.map((item) => `
            <article class="lms-card">
                <span class="lms-badge">${this.escapeHtml(item.status)}</span>
                <h3>${this.escapeHtml(item.title)}</h3>
                <p class="lms-meta">${this.escapeHtml(item.subject)} | ${this.escapeHtml(item.teacherName || "")}</p>
                <p>${item.startsAt ? new Date(item.startsAt).toLocaleString() : ""}</p>
                <a class="lms-btn secondary" href="${this.safeUrl(item.meetingUrl)}" target="_blank" rel="noopener noreferrer">Open Link</a>
                <button class="lms-btn danger" onclick="adminLms.deleteLive(${item.id})"><i class="fas fa-trash"></i></button>
            </article>
        `).join("") || `<div class="lms-empty">No live classes.</div>`;
    },

    renderAiTools() {
        const tools = this.data.aiTools || [];
        document.getElementById("aiToolRows").innerHTML = tools.map((tool) => `
            <tr>
                <td><strong>${this.escapeHtml(tool.name)}</strong><br><span class="lms-meta">${this.escapeHtml(tool.description || "")}</span></td>
                <td>${this.escapeHtml(tool.category || "Study Assistant")}<br><span class="lms-badge">${this.escapeHtml(tool.toolType || "workspace")}</span></td>
                <td><span class="lms-badge">${tool.isActive === false || tool.status === "Inactive" ? "Deactivated" : "Active"}</span></td>
                <td><span class="lms-badge">${tool.isVisible === false ? "Hidden from users" : "Visible to users"}</span></td>
                <td>
                    <button class="lms-btn secondary" onclick="adminLms.editAiTool(${tool.id})"><i class="fas fa-pen"></i> Edit</button>
                    <button class="lms-btn ${tool.isActive === false || tool.status === "Inactive" ? "secondary" : "danger"}" onclick="adminLms.toggleAiTool(${tool.id}, 'isActive')">${tool.isActive === false || tool.status === "Inactive" ? "Activate" : "Deactivate"}</button>
                    <button class="lms-btn ${tool.isVisible === false ? "secondary" : "danger"}" onclick="adminLms.toggleAiTool(${tool.id}, 'isVisible')">${tool.isVisible === false ? "Show" : "Hide"}</button>
                    <button class="lms-btn danger" onclick="adminLms.deleteAiTool(${tool.id})"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `).join("") || `<tr><td colspan="5">No AI tools saved.</td></tr>`;
        const categorySettings = this.data.settings?.aiToolCategories || {};
        const categories = [...new Set(tools.map((tool) => tool.category || "Study Assistant"))];
        const categoryCards = categories.map((category) => {
            const visible = categorySettings[category] !== false;
            return `
                <article class="lms-card">
                    <span class="lms-badge">${visible ? "Shown to users" : "Hidden from users"}</span>
                    <h3>${this.escapeHtml(category)}</h3>
                    <p class="lms-meta">${tools.filter((tool) => (tool.category || "Study Assistant") === category).length} tools in this category. Admin always sees them.</p>
                    <button class="lms-btn ${visible ? "danger" : "secondary"}" onclick="adminLms.toggleAiCategory('${this.escapeAttribute(category)}')">${visible ? "Hide Category" : "Show Category"}</button>
                </article>
            `;
        }).join("") || `<div class="lms-empty">No AI categories yet.</div>`;
        const websiteCategoryGrid = document.getElementById("websiteAiCategoryGrid");
        if (websiteCategoryGrid) websiteCategoryGrid.innerHTML = categoryCards;
    },

    renderAdminControl() {
        const grid = document.getElementById("adminControlGrid");
        const logRows = document.getElementById("adminControlLogRows");
        if (!grid || !logRows) return;

        const admins = (this.data.admins || this.data.users.filter((user) => user.role === "Admin"));
        const main = this.isMainAdmin();
        grid.innerHTML = admins.map((admin) => {
            const isSelfMain = String(admin.adminId || "").toUpperCase() === "ADMIN001";
            const canBlock = main && !isSelfMain;
            return `
                <article class="lms-card">
                    <span class="lms-badge">${this.escapeHtml(admin.status || "Active")}</span>
                    <h3>${this.escapeHtml(admin.name || "Admin")}</h3>
                    <p class="lms-meta">${this.escapeHtml(admin.adminId || "")} | ${this.escapeHtml(admin.designation || "Administrator")}</p>
                    <p>${this.escapeHtml(admin.permissions || "Admin access")}</p>
                    <div class="lms-info-list">
                        <p><strong>Department</strong><span>${this.escapeHtml(admin.department || "LMS Control")}</span></p>
                        <p><strong>Last activity</strong><span>${this.escapeHtml(admin.activity || "No recent activity")}</span></p>
                        <p><strong>Last login</strong><span>${admin.lastLogin ? new Date(admin.lastLogin).toLocaleString() : "Not recorded"}</span></p>
                    </div>
                    ${canBlock ? `<button class="lms-btn ${admin.status === "Blocked" ? "secondary" : "danger"}" onclick="adminLms.toggleUserAccess(${admin.id}, 'admin-control')">${admin.status === "Blocked" ? "Unblock Admin" : "Block Admin"}</button>` : `<span class="lms-badge">${isSelfMain ? "Main Admin protected" : "View only"}</span>`}
                </article>
            `;
        }).join("") || `<div class="lms-empty">No admin records found.</div>`;

        logRows.innerHTML = (this.data.logs || []).slice(0, 80).map((log) => `
            <tr><td>${this.escapeHtml(log.action)}</td><td>${this.escapeHtml(log.detail || "")}</td><td>${this.escapeHtml(log.adminName || "Admin")}</td><td>${log.createdAt ? new Date(log.createdAt).toLocaleString() : ""}</td></tr>
        `).join("") || `<tr><td colspan="4">No admin work logs yet.</td></tr>`;

        document.querySelectorAll('[data-lms-tab="admin-control"]').forEach((tab) => {
            tab.hidden = !main;
        });
        const section = document.getElementById("admin-control");
        if (section && !main) section.classList.remove("active");
    },


    renderAdminProfile() {
        const admin = this.currentAdmin();
        const value = (field, fallback = "") => this.escapeHtml(admin[field] || fallback);

        document.getElementById("adminName").textContent = admin.name || "Admin";
        document.getElementById("adminProfileSummary").innerHTML = `
            <article class="lms-card lms-profile-card">
                <span class="lms-badge">Editable Admin Record</span>
                <h3>${value("name", "Admin")}</h3>
                <p class="lms-meta">${value("designation", "Administrator")} | ${value("department", "LMS Control")}</p>
                <form class="lms-form wide" id="adminProfileForm">
                    <label>Full Name<input name="name" value="${value("name", "Admin")}" required></label>
                    <label>Email<input name="email" type="email" value="${value("email", "admin@engilearn.com")}" required></label>
                    <label>Admin ID<input name="adminId" value="${value("adminId", "ADMIN001")}"></label>
                    <label>Phone<input name="phone" value="${value("phone")}" placeholder="Mobile number"></label>
                    <label>Department<input name="department" value="${value("department", "LMS Control")}"></label>
                    <label>Designation<input name="designation" value="${value("designation", "Administrator")}"></label>
                    <label class="wide">Permissions<input name="permissions" value="${value("permissions", "Students, lectures, assignments, live classes, notifications")}"></label>
                    <label class="wide">About Admin<textarea name="about" placeholder="Write admin information, role, or notes">${value("about")}</textarea></label>
                    <button class="lms-btn wide" type="submit"><i class="fas fa-save"></i> Save Admin Information</button>
                    <div class="lms-form-status" id="adminProfileSaveStatus" aria-live="polite"></div>
                </form>
            </article>
            <article class="lms-card">
                <span class="lms-badge">Saved Information</span>
                <h3>Admin Summary</h3>
                <div class="lms-info-list">
                    <p><strong>Email</strong><span>${value("email", "Not added")}</span></p>
                    <p><strong>Admin ID</strong><span>${value("adminId", "ADMIN001")}</span></p>
                    <p><strong>Phone</strong><span>${value("phone", "Not added")}</span></p>
                    <p><strong>Department</strong><span>${value("department", "Not added")}</span></p>
                    <p><strong>Designation</strong><span>${value("designation", "Administrator")}</span></p>
                    <p><strong>Status</strong><span>${value("status", "Active")}</span></p>
                </div>
            </article>
            <article class="lms-card">
                <span class="lms-badge">Admin Access</span>
                <h3>Dashboard Controls</h3>
                <p>${value("permissions", "Students, lectures, subjects, assignments, notifications, live classes, and settings")}</p>
                <p class="lms-meta">All admin information saves into backend user records when backend is running.</p>
            </article>
        `;
        document.getElementById("adminProfileForm").addEventListener("submit", (event) => this.saveAdminProfile(event));
    },

    renderSettings() {
        const settings = this.data.settings || {};
        const sections = settings.sections || {};
        const visibility = settings.visibility || {};
        const subscription = settings.subscription || {};
        const toolHub = settings.toolHub || {};
        const repeatedQuestions = settings.repeatedQuestions || {};
        const advertising = settings.advertising || {};
        const setValue = (id, value) => {
            const element = document.getElementById(id);
            if (element) element.value = String(value);
        };

        const announcement = document.querySelector("#settingsForm [name='announcement']");
        if (announcement) announcement.value = settings.announcement || "";
        setValue("websiteVideoSectionInput", sections.videos !== false);
        setValue("websiteVideoVisibilityInput", visibility.videos !== false);
        setValue("websitePromptSectionInput", sections.prompts !== false);
        setValue("websitePromptVisibilityInput", visibility.prompts !== false);
        setValue("websitePyqSectionInput", sections.pyq !== false);
        setValue("websitePyqVisibilityInput", visibility.pyq !== false);
        setValue("websiteToolsSectionInput", sections.tools !== false);
        setValue("websiteToolsVisibilityInput", visibility.tools !== false);
        setValue("dedicatedVideoSectionInput", sections.videos !== false);
        setValue("dedicatedVideoVisibilityInput", visibility.videos !== false);
        setValue("dedicatedAiSectionInput", sections.tools !== false);
        setValue("dedicatedAiVisibilityInput", visibility.tools !== false);
        setValue("subscriptionVideoInput", subscription.videos !== false);
        setValue("subscriberLibraryStatusInput", subscription.videos !== false);
        const subscriptionTitle = document.getElementById("subscriptionTitleInput");
        if (subscriptionTitle) subscriptionTitle.value = subscription.title || "Subscriber Video Library";
        const subscriberLibraryTitle = document.getElementById("subscriberLibraryTitleInput");
        if (subscriberLibraryTitle) subscriberLibraryTitle.value = subscription.title || "Subscriber Video Library";
        const subscriberLibraryDescription = document.getElementById("subscriberLibraryDescriptionInput");
        if (subscriberLibraryDescription) subscriberLibraryDescription.value = subscription.description || "Open all premium and subscriber-ready lectures in the learning player.";
        setValue("toolHubVisibleInput", toolHub.visible !== false);
        setValue("toolHubAccessInput", toolHub.accessMode === "free" ? "free" : "paid");
        const toolHubPrice = document.getElementById("toolHubPriceInput");
        if (toolHubPrice) toolHubPrice.value = toolHub.price || 100;
        const toolHubUpi = document.getElementById("toolHubUpiInput");
        if (toolHubUpi) toolHubUpi.value = toolHub.upiId || "";
        const toolHubPayee = document.getElementById("toolHubPayeeInput");
        if (toolHubPayee) toolHubPayee.value = toolHub.payeeName || "EngiLearn";
        const repeatedQuestionsAccessMode = repeatedQuestions.accessMode === "free" ? "free" : "paid";
        setValue("repeatedQuestionsVisibleInput", repeatedQuestions.visible !== false);
        setValue("repeatedQuestionsAccessInput", repeatedQuestionsAccessMode);
        const repeatedQuestionsPrice = document.getElementById("repeatedQuestionsPriceInput");
        if (repeatedQuestionsPrice) repeatedQuestionsPrice.value = repeatedQuestions.price ?? 100;
        setValue("advertisingSectionInput", advertising.enabled !== false);
        setValue("advertisingVisibilityInput", advertising.visible !== false);
        setValue("advertisingPlacementInput", advertising.placement || "home");
        const advertisingTitle = document.getElementById("advertisingTitleInput");
        if (advertisingTitle) advertisingTitle.value = advertising.title || "";
        const advertisingMessage = document.getElementById("advertisingMessageInput");
        if (advertisingMessage) advertisingMessage.value = advertising.message || "";
        const advertisingLink = document.getElementById("advertisingLinkInput");
        if (advertisingLink) advertisingLink.value = advertising.linkUrl || "";
        const advertisingImage = document.getElementById("advertisingImageInput");
        if (advertisingImage) advertisingImage.value = advertising.imageUrl || "";
        this.renderAdvertisingPreview(advertising);
    },

    toolHubPaymentKey(payment) {
        return String(payment?.id ?? payment?.providerOrderId ?? payment?.providerPaymentId ?? payment?.receipt ?? payment?.createdAt ?? "").trim();
    },

    syncToolHubPaymentHistoryPanel() {
        const panel = document.getElementById("toolHubPaymentHistoryPanel");
        const button = document.getElementById("toggleToolHubPaymentHistory");
        if (panel) panel.hidden = !this.toolHubHistoryVisible;
        if (button) {
            button.innerHTML = this.toolHubHistoryVisible
                ? '<i class="fas fa-eye-slash"></i> Hide Payment History'
                : '<i class="fas fa-clock-rotate-left"></i> Show Payment History';
            button.setAttribute("aria-expanded", String(this.toolHubHistoryVisible));
        }
    },

    toggleToolHubPaymentHistory(force = null) {
        this.toolHubHistoryVisible = typeof force === "boolean" ? force : !this.toolHubHistoryVisible;
        if (this.toolHubHistoryVisible) this.renderToolHubGatewayPayments();
        this.syncToolHubPaymentHistoryPanel();
    },

    renderToolHubGatewayPayments() {
        const target = document.getElementById("toolHubGatewayPaymentRows");
        if (!target) return;
        const search = String(document.getElementById("toolHubPaymentSearch")?.value || "").trim().toLowerCase();
        const payments = this.filterByAdminDate((this.data.payments || [])
            .filter((payment) => payment.product === "toolHub" || payment.type === "Tool Hub" || payment.course === "Tool Hub Access")
            .filter((payment) => `${payment.studentName || payment.name || ""} ${payment.studentEmail || ""} ${payment.studentMobile || ""} ${payment.providerOrderId || ""} ${payment.providerPaymentId || payment.utr || ""} ${payment.status || ""}`.toLowerCase().includes(search))
            .slice()
            .sort((a, b) => new Date(b.verifiedAt || b.paidAt || b.createdAt || b.date || 0) - new Date(a.verifiedAt || a.paidAt || a.createdAt || a.date || 0)), "payments", (payment) => this.firstAdminDate(payment, ["verifiedAt", "paidAt", "createdAt", "date"]), "Tool Hub payments");
        const summary = document.getElementById("toolHubPaymentHistorySummary");
        if (summary) {
            const paidCount = payments.filter((payment) => String(payment.status || "").toLowerCase() === "paid").length;
            const createdCount = payments.filter((payment) => String(payment.status || "").toLowerCase() !== "paid").length;
            const totalAmount = payments.reduce((sum, payment) => sum + Number(payment.amount || 0), 0);
            summary.innerHTML = `
                <span><strong>${payments.length}</strong> records</span>
                <span><strong>${paidCount}</strong> paid</span>
                <span><strong>${createdCount}</strong> pending/created</span>
                <span><strong>Rs. ${this.escapeHtml(totalAmount || 0)}</strong> total value</span>
            `;
        }
        target.innerHTML = payments.map((payment) => {
            const date = payment.verifiedAt || payment.paidAt || payment.createdAt || payment.date;
            const status = payment.status || "Created";
            const normalizedStatus = String(status).toLowerCase();
            const statusClass = normalizedStatus === "paid" ? "success" : normalizedStatus.includes("fail") ? "warning" : "";
            const amount = Number(payment.amount || 100);
            const key = encodeURIComponent(this.toolHubPaymentKey(payment));
            const orderId = payment.providerOrderId || payment.orderId || payment.receipt || `#${payment.id || ""}`;
            const paymentId = payment.providerPaymentId || payment.paymentId || payment.utr || "Waiting for payment";
            const contact = [payment.studentEmail, payment.studentMobile].filter(Boolean).map((item) => this.escapeHtml(item)).join("<br>") || "Not added";
            const access = normalizedStatus === "paid" ? "Unlocked" : normalizedStatus.includes("fail") ? "Failed" : "Waiting";
            return `
                <tr>
                    <td><input class="toolhub-payment-select" type="checkbox" value="${this.escapeAttribute(key)}" aria-label="Select Tool Hub payment"></td>
                    <td><strong>${this.escapeHtml(payment.studentName || payment.name || "Guest")}</strong><br><span class="lms-meta">User ID: ${this.escapeHtml(payment.userId || "Guest")}</span></td>
                    <td>${contact}</td>
                    <td><strong>${this.escapeHtml(orderId)}</strong><br><span class="lms-meta">Receipt: ${this.escapeHtml(payment.receipt || "Not added")}</span></td>
                    <td>${this.escapeHtml(paymentId)}<br><span class="lms-meta">Gateway: ${this.escapeHtml(payment.gatewayStatus || "Not captured yet")}</span></td>
                    <td>${this.escapeHtml(payment.provider || "Razorpay")}</td>
                    <td>${this.escapeHtml(payment.currency || "INR")} ${this.escapeHtml(amount)}</td>
                    <td><span class="lms-badge ${statusClass}">${this.escapeHtml(status)}</span></td>
                    <td>${this.escapeHtml(access)}</td>
                    <td>${this.formatAdminDate(date)}</td>
                    <td><button class="lms-btn secondary compact" type="button" onclick="adminLms.downloadPaymentSlipByKey('${this.escapeAttribute(key)}')"><i class="fas fa-file-pdf"></i> PDF Receipt</button></td>
                    <td><button class="lms-btn danger compact" type="button" onclick="adminLms.removeToolHubPayment('${this.escapeAttribute(key)}')"><i class="fas fa-trash"></i> Remove</button></td>
                </tr>
            `;
        }).join("") || `<tr><td colspan="12">No Tool Hub payment history yet.</td></tr>`;
        this.syncToolHubPaymentHistoryPanel();
    },

    syncRepeatedPaymentHistoryPanel() {
        const panel = document.getElementById("repeatedPaymentHistoryPanel");
        const button = document.getElementById("toggleRepeatedPaymentHistory");
        if (panel) panel.hidden = !this.repeatedPaymentHistoryVisible;
        if (button) {
            button.innerHTML = this.repeatedPaymentHistoryVisible
                ? '<i class="fas fa-eye-slash"></i> Hide Payment History'
                : '<i class="fas fa-clock-rotate-left"></i> Show Payment History';
            button.setAttribute("aria-expanded", String(this.repeatedPaymentHistoryVisible));
        }
    },

    toggleRepeatedPaymentHistory(force = null) {
        this.repeatedPaymentHistoryVisible = typeof force === "boolean" ? force : !this.repeatedPaymentHistoryVisible;
        if (this.repeatedPaymentHistoryVisible) this.renderRepeatedQuestionPayments();
        this.syncRepeatedPaymentHistoryPanel();
    },

    renderRepeatedQuestionPayments() {
        const target = document.getElementById("repeatedPaymentRows");
        if (!target) return;
        const search = String(document.getElementById("repeatedPaymentSearch")?.value || "").trim().toLowerCase();
        const payments = this.filterByAdminDate((this.data.payments || [])
            .filter((payment) => payment.product === "repeatedQuestions" || payment.type === "Repeated Questions")
            .filter((payment) => `${payment.studentName || payment.name || ""} ${payment.studentEmail || ""} ${payment.studentMobile || ""} ${payment.providerOrderId || ""} ${payment.providerPaymentId || payment.utr || ""} ${payment.status || ""}`.toLowerCase().includes(search))
            .slice()
            .sort((a, b) => new Date(b.verifiedAt || b.paidAt || b.createdAt || 0) - new Date(a.verifiedAt || a.paidAt || a.createdAt || 0)), "repeatedPayments", (payment) => this.firstAdminDate(payment, ["verifiedAt", "paidAt", "createdAt", "date"]), "Repeated Questions payments");
        const summary = document.getElementById("repeatedPaymentHistorySummary");
        if (summary) {
            const paidCount = payments.filter((payment) => String(payment.status || "").toLowerCase() === "paid").length;
            const totalAmount = payments.reduce((sum, payment) => sum + Number(payment.amount || 0), 0);
            const paidScopes = payments.filter((payment) => String(payment.status || "").toLowerCase() === "paid");
            const branches = new Set(paidScopes.map((payment) => String(payment.branchId || payment.branchName || payment.branch || "").trim()).filter(Boolean));
            const semesters = new Set(paidScopes.map((payment) => String(payment.unlockedSemester || payment.semester || "").match(/\d+/)?.[0]).filter(Boolean));
            summary.innerHTML = `<span><strong>${payments.length}</strong> records</span><span><strong>${paidCount}</strong> paid</span><span><strong>${branches.size}</strong> purchased branches</span><span><strong>${semesters.size}</strong> purchased semesters</span><span><strong>Rs. ${this.escapeHtml(totalAmount || 0)}</strong> total value</span>`;
        }
        target.innerHTML = payments.map((payment) => {
            const status = payment.status || "Created";
            const normalizedStatus = String(status).toLowerCase();
            const statusClass = normalizedStatus === "paid" ? "success" : normalizedStatus.includes("fail") ? "warning" : "";
            const key = encodeURIComponent(this.toolHubPaymentKey(payment));
            const orderId = payment.providerOrderId || payment.orderId || payment.receipt || `#${payment.id || ""}`;
            const paymentId = payment.providerPaymentId || payment.paymentId || payment.utr || "Waiting for payment";
            const contact = [payment.studentEmail, payment.studentMobile].filter(Boolean).map((item) => this.escapeHtml(item)).join("<br>") || "Not added";
            const branch = String(payment.branchName || payment.branch || payment.branchId || "Not selected").trim();
            const semester = String(payment.unlockedSemester || payment.semester || "").match(/\d+/)?.[0] || "Not selected";
            const access = normalizedStatus === "paid"
                ? `Unlocked: ${branch} / Semester ${semester}`
                : normalizedStatus.includes("fail") ? "Failed" : `Waiting: ${branch} / Semester ${semester}`;
            return `<tr>
                <td><input class="repeated-payment-select" type="checkbox" value="${this.escapeAttribute(key)}" aria-label="Select repeated-question payment"></td>
                <td><strong>${this.escapeHtml(payment.studentName || payment.name || "Guest")}</strong><br><span class="lms-meta">User ID: ${this.escapeHtml(payment.userId || "Guest")}</span></td>
                <td>${contact}</td>
                <td><strong>${this.escapeHtml(orderId)}</strong><br><span class="lms-meta">Receipt: ${this.escapeHtml(payment.receipt || "Not added")}</span></td>
                <td>${this.escapeHtml(paymentId)}<br><span class="lms-meta">Gateway: ${this.escapeHtml(payment.gatewayStatus || "Not captured yet")}</span></td>
                <td>${this.escapeHtml(payment.provider || "Razorpay")}</td>
                <td>${this.escapeHtml(payment.currency || "INR")} ${this.escapeHtml(Number(payment.amount || 0))}</td>
                <td><span class="lms-badge ${statusClass}">${this.escapeHtml(status)}</span></td>
                <td>${this.escapeHtml(access)}</td>
                <td>${this.formatAdminDate(payment.verifiedAt || payment.paidAt || payment.createdAt || payment.date)}</td>
                <td><button class="lms-btn secondary compact" type="button" onclick="adminLms.downloadPaymentSlipByKey('${this.escapeAttribute(key)}')"><i class="fas fa-file-pdf"></i> PDF Receipt</button></td>
                <td><button class="lms-btn danger compact" type="button" onclick="adminLms.removeRepeatedPayment('${this.escapeAttribute(key)}')"><i class="fas fa-trash"></i> Remove</button></td>
            </tr>`;
        }).join("") || `<tr><td colspan="12">No Repeated Questions payment history yet.</td></tr>`;
        this.syncRepeatedPaymentHistoryPanel();
    },

    async viewPaymentSlipByKey(encodedKey) {
        const key = decodeURIComponent(String(encodedKey || ""));
        const payment = (this.data.payments || []).find((item) => this.toolHubPaymentKey(item) === key);
        if (!payment) return this.showActionStatus("Payment slip record not found.", "error");
        try {
            await EngiLearnAPI.viewPaymentReceipt(key);
            this.showActionStatus("Payment receipt opened in a new tab.");
        } catch (error) {
            this.showActionStatus(error.message || "PDF receipt view failed.", "error");
        }
    },

    async downloadPaymentSlipByKey(encodedKey) {
        const key = decodeURIComponent(String(encodedKey || ""));
        const payment = (this.data.payments || []).find((item) => this.toolHubPaymentKey(item) === key);
        if (!payment) return this.showActionStatus("Payment slip record not found.", "error");
        await this.downloadPaymentSlip(payment);
    },

    async downloadPaymentSlip(payment) {
        const key = this.toolHubPaymentKey(payment);
        try {
            const result = await EngiLearnAPI.downloadPaymentReceipt(key);
            this.showActionStatus(`PDF receipt downloaded: ${result.fileName}`);
        } catch (error) {
            this.showActionStatus(error.message || "PDF receipt download failed.", "error");
        }
    },

    async removeRepeatedPayment(encodedKey) {
        const key = decodeURIComponent(String(encodedKey || ""));
        if (!key || !window.confirm("Remove this Repeated Questions payment history entry?")) return;
        try {
            await EngiLearnAPI.deleteToolHubPayment(key);
            this.data.payments = (this.data.payments || []).filter((payment) => this.toolHubPaymentKey(payment) !== key);
            this.showActionStatus("Repeated Questions payment history entry removed.");
        } catch (error) {
            this.showActionStatus(error.message || "Payment history entry could not be removed.", "error");
        }
        this.repeatedPaymentHistoryVisible = true;
        this.renderRepeatedQuestionPayments();
        this.openTab("repeated-questions-access");
    },

    async removeToolHubPayment(encodedKey) {
        const key = decodeURIComponent(String(encodedKey || ""));
        if (!key) return;
        if (!window.confirm("Remove this Tool Hub payment history entry from the admin dashboard?")) return;
        const matchesPayment = (payment) => [payment?.id, payment?.providerOrderId, payment?.providerPaymentId, payment?.receipt, payment?.createdAt]
            .some((value) => String(value ?? "") === key);
        const removeLocalPayment = () => {
            this.data.payments = (this.data.payments || []).filter((payment) => !matchesPayment(payment));
            const localPayments = this.readLocalJson("engilearn_toolhub_payments", []) || [];
            localStorage.setItem("engilearn_toolhub_payments", JSON.stringify(localPayments.filter((payment) => !matchesPayment(payment))));
        };

        try {
            await EngiLearnAPI.deleteToolHubPayment(key);
            removeLocalPayment();
            this.showActionStatus("Tool Hub payment history entry removed.");
            await this.load();
        } catch (error) {
            removeLocalPayment();
            this.showActionStatus(error.status === 0 ? "Backend is offline. Entry removed from this browser history." : "Payment history entry removed from this admin view.", "warning");
            this.renderToolHubGatewayPayments();
        }
        this.toolHubHistoryVisible = true;
        this.openTab("tool-hub-access");
        this.syncToolHubPaymentHistoryPanel();
    },
    async saveAdminProfile(event) {
        event.preventDefault();
        const status = document.getElementById("adminProfileSaveStatus");
        const profile = Object.fromEntries(new FormData(event.target));
        status.textContent = "Saving...";

        try {
            const data = await EngiLearnAPI.updateAdminProfile(profile);
            this.saveAdminLocally(data.user);
            const index = this.data.users.findIndex((user) => user.id === data.user.id);
            if (index >= 0) this.data.users[index] = data.user;
            status.textContent = "Saved to backend admin record.";
        } catch (error) {
            const admin = { ...(JSON.parse(localStorage.getItem("mini_currentUser") || "{}")), ...profile, role: "Admin" };
            this.saveAdminLocally(admin);
            status.textContent = "Message could not be sent right now. Please try again or email engilearn.edu@gmail.com.";
        }

        this.renderAdminProfile();
    },

    saveAdminLocally(admin) {
        localStorage.setItem("mini_currentUser", JSON.stringify(admin));
        document.getElementById("adminName").textContent = admin.name || "Admin";
    },

    showActionStatus(message, type = "success") {
        let status = document.getElementById("adminActionStatus");
        if (!status) {
            status = document.createElement("div");
            status.id = "adminActionStatus";
            status.className = "lms-form-status";
            document.querySelector(".lms-main")?.prepend(status);
        }
        status.className = `lms-form-status ${type}`;
        status.textContent = message;
    },

    escapeHtml(value) {
        return String(value ?? "").replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
    },

    escapeAttribute(value) {
        return this.escapeHtml(value).replace(/`/g, "&#96;");
    },

    safeUrl(value) {
        const url = String(value || "").trim();
        if (!url) return "";
        if (/^(https?:|\/|data:image\/)/i.test(url)) return this.escapeHtml(url);
        return "";
    },

    async saveLecture(event) {
        event.preventDefault();
        try {
            await EngiLearnAPI.saveLecture(new FormData(event.target));
            event.target.reset();
            this.showActionStatus("Lecture saved successfully.");
            await this.load();
        } catch (error) {
            this.showActionStatus(error.message || "Lecture save failed.", "error");
        }
    },

    async saveSubscriberLecture(event) {
        event.preventDefault();
        try {
            await EngiLearnAPI.saveLecture(new FormData(event.target));
            event.target.reset();
            this.showActionStatus("Subscriber video added successfully.");
            await this.load();
            this.openTab("subscriber-videos-admin");
        } catch (error) {
            this.showActionStatus(error.message || "Subscriber video upload failed.", "error");
        }
    },

    async saveSubscriberLibrarySettings(event) {
        event.preventDefault();
        const form = Object.fromEntries(new FormData(event.currentTarget));
        try {
            await EngiLearnAPI.updateSettings({
                subscription: {
                    videos: form.videos === "true",
                    title: form.title || "Subscriber Video Library",
                    description: form.description || "Open all premium and subscriber-ready lectures in the learning player."
                }
            });
            this.showActionStatus("Subscriber Video Library settings saved.");
            await this.load();
            this.openTab("subscriber-videos-admin");
        } catch (error) {
            this.showActionStatus(error.message || "Subscriber library settings save failed.", "error");
        }
    },

    async toggleSubscriberLectureStatus(id, isActive) {
        const form = new FormData();
        form.set("isActive", String(isActive));
        await EngiLearnAPI.saveLecture(form, id);
        this.showActionStatus(isActive ? "Subscriber video activated." : "Subscriber video disabled.");
        await this.load();
        this.openTab("subscriber-videos-admin");
    },

    async removeFromSubscriberLibrary(id) {
        const form = new FormData();
        form.set("isSubscriber", "false");
        await EngiLearnAPI.saveLecture(form, id);
        this.showActionStatus("Video removed from Subscriber Video Library.");
        await this.load();
        this.openTab("subscriber-videos-admin");
    },

    async saveSubject(event) {
        event.preventDefault();
        try {
            await EngiLearnAPI.saveSubject(Object.fromEntries(new FormData(event.target)));
            event.target.reset();
            this.showActionStatus("Subject added successfully.");
            await this.load();
        } catch (error) {
            this.showActionStatus(error.message || "Subject save failed.", "error");
        }
    },

    async importPyqDataset() {
        if (!this.canManagePyq()) {
            this.showActionStatus("Admin access is required to import PYQ papers.", "error");
            return;
        }
        if (!confirm("Replace all existing PYQ upload records with the configured sorted RGPV dataset? Other content will remain unchanged.")) return;
        const button = document.getElementById("importPyqDatasetBtn");
        button.disabled = true;
        try {
            const result = await EngiLearnAPI.importPyqDataset();
            this.showActionStatus(result.message || "PYQ dataset imported successfully.");
            await this.load();
            this.openTab("pyq-manager");
        } catch (error) {
            this.showActionStatus(error.message || "PYQ dataset import failed.", "error");
        } finally {
            button.disabled = !this.canManagePyq();
        }
    },

    async savePyq(event) {
        event.preventDefault();
        if (!this.canManagePyq()) {
            this.showActionStatus("Admin access is required to upload PYQ papers.", "error");
            return;
        }
        try {
            await EngiLearnAPI.savePyq(new FormData(event.target));
            event.target.reset();
            this.showActionStatus("PYQ uploaded successfully.");
            await this.load();
            this.openTab("pyq-manager");
        } catch (error) {
            this.showActionStatus(error.message || "PYQ upload failed.", "error");
        }
    },

    async savePyqEdit(event) {
        event.preventDefault();
        if (!this.canManagePyq()) {
            this.showActionStatus("Admin access is required to edit PYQ papers.", "error");
            return;
        }
        const form = Object.fromEntries(new FormData(event.target));
        const id = Number(form.id);
        delete form.id;
        try {
            await EngiLearnAPI.updatePyq(id, form);
            this.closePyqEdit();
            this.showActionStatus("PYQ record updated successfully.");
            await this.load();
            this.openTab("pyq-manager");
        } catch (error) {
            this.showActionStatus(error.message || "PYQ update failed.", "error");
        }
    },

    async deletePyq(id) {
        if (!confirm("Delete this PYQ record?")) return;
        try {
            await EngiLearnAPI.deletePyq(id);
            this.showActionStatus("PYQ record deleted.");
            await this.load();
            this.openTab("pyq-manager");
        } catch (error) {
            this.showActionStatus(error.message || "PYQ delete failed.", "error");
        }
    },

    async saveRepeatedQuestion(event) {
        event.preventDefault();
        if (!this.canManagePyq()) {
            this.showActionStatus("Admin access is required to manage repeated questions.", "error");
            return;
        }
        const form = Object.fromEntries(new FormData(event.target));
        const id = Number(form.id || 0) || null;
        delete form.id;
        form.repeatCount = Math.max(1, Number(form.repeatCount || 1));
        form.isActive = form.isActive !== "false";
        try {
            await EngiLearnAPI.saveRepeatedQuestion(form, id);
            this.resetRepeatedQuestionForm();
            this.showActionStatus(id ? "Repeated question updated successfully." : "Repeated question added successfully.");
            await this.load();
            this.openTab("repeated-questions-manager");
        } catch (error) {
            this.showActionStatus(error.message || "Repeated question save failed.", "error");
        }
    },

    async deleteRepeatedQuestion(id) {
        if (!confirm("Delete this repeated question permanently?")) return;
        try {
            await EngiLearnAPI.deleteRepeatedQuestion(id);
            this.showActionStatus("Repeated question deleted.");
            await this.load();
            this.openTab("repeated-questions-manager");
        } catch (error) {
            this.showActionStatus(error.message || "Repeated question delete failed.", "error");
        }
    },

    async saveAssignment(event) {
        event.preventDefault();
        try {
            await EngiLearnAPI.saveAssignment(new FormData(event.target));
            event.target.reset();
            this.showActionStatus("Assignment published successfully.");
            await this.load();
        } catch (error) {
            this.showActionStatus(error.message || "Assignment save failed.", "error");
        }
    },

    async sendNotification(event) {
        event.preventDefault();
        try {
            await EngiLearnAPI.sendNotification(Object.fromEntries(new FormData(event.target)));
            event.target.reset();
            this.showActionStatus("Notification sent successfully.");
            await this.load();
        } catch (error) {
            this.showActionStatus(error.message || "Notification failed.", "error");
        }
    },

    async saveLive(event) {
        event.preventDefault();
        try {
            await EngiLearnAPI.saveLiveClass(Object.fromEntries(new FormData(event.target)));
            event.target.reset();
            this.showActionStatus("Live class scheduled successfully.");
            await this.load();
        } catch (error) {
            this.showActionStatus(error.message || "Live class save failed.", "error");
        }
    },

    async saveAiTool(event) {
        event.preventDefault();
        const form = Object.fromEntries(new FormData(event.target));
        const id = form.id ? Number(form.id) : null;
        delete form.id;
        form.isActive = form.isActive === "true";
        form.isVisible = form.isVisible === "true";
        try {
            await EngiLearnAPI.saveAiTool(form, id);
            event.target.reset();
            document.getElementById("aiToolId").value = "";
            this.showActionStatus("AI tool saved successfully.");
            await this.load();
            this.openTab("ai-tools-admin");
        } catch (error) {
            this.showActionStatus(error.message || "AI tool save failed.", "error");
        }
    },

    editAiTool(id) {
        const tool = (this.data.aiTools || []).find((item) => Number(item.id) === Number(id));
        if (!tool) return;
        const form = document.getElementById("aiToolForm");
        form.elements.id.value = tool.id;
        form.elements.name.value = tool.name || "";
        form.elements.category.value = tool.category || "";
        form.elements.icon.value = tool.icon || "fas fa-robot";
        form.elements.color.value = tool.color || "#2563eb";
        form.elements.toolType.value = tool.toolType || "workspace";
        form.elements.isActive.value = String(tool.isActive !== false && tool.status !== "Inactive");
        form.elements.isVisible.value = String(tool.isVisible !== false);
        form.elements.embedUrl.value = tool.embedUrl || tool.toolUrl || tool.url || "";
        if (form.elements.toolUrl) form.elements.toolUrl.value = tool.toolUrl || tool.url || "";
        form.elements.description.value = tool.description || "";
        form.elements.promptPlaceholder.value = tool.promptPlaceholder || "";
        this.openTab("ai-tools-admin");
    },

    async toggleAiTool(id, field) {
        try {
            await EngiLearnAPI.toggleAiTool(id, field);
            this.showActionStatus("AI tool control updated.");
            await this.load();
            this.openTab("ai-tools-admin");
        } catch (error) {
            this.showActionStatus(error.message || "AI tool update failed.", "error");
        }
    },

    async toggleAiCategory(category) {
        const current = this.data.settings?.aiToolCategories || {};
        const next = {
            ...current,
            [category]: current[category] === false
        };
        try {
            await EngiLearnAPI.updateSettings({ aiToolCategories: next });
            this.showActionStatus("AI category visibility updated.");
            await this.load();
            this.openTab(document.getElementById("website")?.classList.contains("active") ? "website" : "ai-tools-admin");
        } catch (error) {
            this.showActionStatus(error.message || "AI category update failed.", "error");
        }
    },

    async saveWebsiteSettings(event) {
        event.preventDefault();
        const form = Object.fromEntries(new FormData(event.target));
        try {
            await EngiLearnAPI.updateSettings({
                sections: {
                    videos: form.videoSection === "true",
                    pyq: form.pyqSection === "true",
                    tools: form.toolsSection === "true",
                    prompts: false
                },
                visibility: {
                    videos: form.videoVisibility === "true",
                    tools: form.toolsVisibility === "true",
                    prompts: false,
                    pyq: form.pyqVisibility === "true"
                }
            });
            this.showActionStatus("Website section visibility saved.");
            await this.load();
            this.openTab("website");
        } catch (error) {
            this.showActionStatus(error.message || "Website visibility save failed.", "error");
        }
    },

    async saveDedicatedSection(event, sectionName) {
        event.preventDefault();
        const form = Object.fromEntries(new FormData(event.currentTarget));
        try {
            await EngiLearnAPI.updateSettings({
                sections: { [sectionName]: form.section === "true" },
                visibility: { [sectionName]: form.visibility === "true" }
            });
            this.showActionStatus(`${sectionName === "videos" ? "Video" : "AI Tools"} section saved.`);
            await this.load();
            this.openTab(sectionName === "videos" ? "video-section-admin" : "ai-section-admin");
        } catch (error) {
            this.showActionStatus(error.message || "Section save failed.", "error");
        }
    },

    async saveToolHubSettings(event) {
        event.preventDefault();
        const form = Object.fromEntries(new FormData(event.currentTarget));
        try {
            await EngiLearnAPI.updateSettings({
                toolHub: {
                    visible: form.toolHubVisible !== "false",
                    accessMode: form.toolHubAccess === "paid" ? "paid" : "free",
                    price: Number(form.toolHubPrice || 100),
                    upiId: form.toolHubUpi || "",
                    payeeName: form.toolHubPayee || "EngiLearn"
                }
            });
            this.showActionStatus("Tool Hub access settings saved.");
            await this.load();
            this.openTab("tool-hub-access");
        } catch (error) {
            this.showActionStatus(error.message || "Tool Hub settings save failed.", "error");
        }
    },

    async saveRepeatedQuestionsSettings(event) {
        event.preventDefault();
        const form = Object.fromEntries(new FormData(event.currentTarget));
        try {
            const repeatedQuestions = {
                visible: form.visible !== "false",
                accessMode: form.accessMode === "free" ? "free" : "paid",
                price: Math.max(0, Number(form.price || 0))
            };
            await EngiLearnAPI.updateSettings({ repeatedQuestions });
            this.data.settings = {
                ...(this.data.settings || {}),
                repeatedQuestions
            };
            this.showActionStatus("Most Repeated Questions access settings saved.");
            this.render();
            this.openTab("repeated-questions-access");
        } catch (error) {
            this.showActionStatus(error.message || "Repeated Questions settings save failed.", "error");
        }
    },

    readAdvertisingForm() {
        return {
            enabled: document.getElementById("advertisingSectionInput")?.value !== "false",
            visible: document.getElementById("advertisingVisibilityInput")?.value !== "false",
            placement: document.getElementById("advertisingPlacementInput")?.value || "home",
            title: document.getElementById("advertisingTitleInput")?.value || "",
            message: document.getElementById("advertisingMessageInput")?.value || "",
            linkUrl: document.getElementById("advertisingLinkInput")?.value || "",
            imageUrl: document.getElementById("advertisingImageInput")?.value || ""
        };
    },

    renderAdvertisingPreview(advertising = {}) {
        const title = advertising.title || "Advertising Preview";
        const message = advertising.message || "Saved advertising will preview here.";
        const placementLabels = { home: "Homepage", pyq: "PYQ Section", videos: "Video Section", branches: "Branch Section", all: "All main pages" };
        const statusBadge = document.getElementById("advertisingStatusBadge");
        if (statusBadge) {
            const active = advertising.enabled !== false;
            const visible = advertising.visible !== false;
            statusBadge.textContent = `${active ? "Active" : "Disabled"} / ${visible ? "Shown" : "Hidden"}`;
            statusBadge.classList.toggle("success", active && visible);
            statusBadge.classList.toggle("warning", !active || !visible);
        }
        const previewTitle = document.getElementById("advertisingPreviewTitle");
        if (previewTitle) previewTitle.textContent = title;
        const previewMessage = document.getElementById("advertisingPreviewMessage");
        if (previewMessage) previewMessage.textContent = message;
        const previewPlacement = document.getElementById("advertisingPreviewPlacement");
        if (previewPlacement) previewPlacement.textContent = placementLabels[advertising.placement] || "Homepage";
        const previewLink = document.getElementById("advertisingPreviewLink");
        if (previewLink) {
            const link = String(advertising.linkUrl || "").trim();
            previewLink.href = link || "#";
            previewLink.textContent = link ? "Open linked page" : "No link added";
            previewLink.classList.toggle("disabled", !link);
        }
        const previewMedia = document.getElementById("advertisingPreviewMedia");
        if (previewMedia) {
            const image = String(advertising.imageUrl || "").trim();
            previewMedia.innerHTML = image
                ? `<img src="${this.escapeAttribute(image)}" alt="${this.escapeAttribute(title)}">`
                : '<i class="fas fa-bullhorn"></i>';
        }
    },

    async saveAdvertisingSettings(event) {
        event.preventDefault();
        const advertising = this.readAdvertisingForm();
        try {
            await EngiLearnAPI.updateSettings({ advertising });
            this.showActionStatus("Advertising settings saved.");
            await this.load();
            this.openTab("advertising");
        } catch (error) {
            this.showActionStatus(error.message || "Advertising settings save failed.", "error");
        }
    },
    async saveSettings(event) {
        event.preventDefault();
        try {
            const form = Object.fromEntries(new FormData(event.target));
            await EngiLearnAPI.updateSettings({
                announcement: form.announcement || "",
                currentPassword: form.currentPassword || "",
                newPassword: form.newPassword || "",
                subscription: {
                    videos: form.subscriptionVideo === "true",
                    title: form.subscriptionTitle || "Subscriber Video Library",
                    description: "Open all premium and subscriber-ready lectures in the learning player."
                }
            });
            event.target.reset();
            this.showActionStatus("Settings saved successfully.");
            await this.load();
        } catch (error) {
            this.showActionStatus(error.message || "Settings save failed.", "error");
        }
    },

    async deleteLecture(id) {
        await EngiLearnAPI.deleteLecture(id);
        await this.load();
    },

    async deleteSubject(id) {
        await EngiLearnAPI.deleteSubject(id);
        await this.load();
    },

    async deleteAssignment(id) {
        await EngiLearnAPI.deleteAssignment(id);
        await this.load();
    },

    async deleteLive(id) {
        await EngiLearnAPI.deleteLiveClass(id);
        await this.load();
    },

    async deleteAiTool(id) {
        if (!confirm("Delete this AI tool permanently?")) return;
        try {
            await EngiLearnAPI.deleteAiTool(id);
            this.showActionStatus("AI tool deleted.");
            await this.load();
            this.openTab("ai-tools-admin");
        } catch (error) {
            this.showActionStatus(error.message || "AI tool delete failed.", "error");
        }
    },

    async toggleUserAccess(id, tab = null) {
        try {
            await EngiLearnAPI.toggleUserStatus(id);
            this.showActionStatus("Account access updated.");
            await this.load();
            if (tab) this.openTab(tab);
            if (tab === "admin-control") this.renderAdminControl();
        } catch (error) {
            this.showActionStatus(error.message || "Could not update account access.", "error");
        }
    },

    async toggleStudent(id) {
        await this.toggleUserAccess(id, "students");
    },

    async approveUser(id) {
        try {
            await EngiLearnAPI.approveUser(id);
            this.showActionStatus("Account request approved. User can login now.");
            await this.load();
            this.openTab("requests");
            this.closeStudentDetail();
        } catch (error) {
            this.showActionStatus(error.message || "Approval failed. Check OTP status first.", "error");
        }
    },

    async rejectUser(id) {
        if (!confirm("Reject and delete this account request?")) return;
        try {
            await EngiLearnAPI.rejectUser(id);
            this.showActionStatus("Account request rejected and deleted.");
            await this.load();
            this.openTab("requests");
        } catch (error) {
            this.showActionStatus(error.message || "Reject failed.", "error");
        }
    },

    async deleteUser(id) {
        if (!confirm("Delete this student/teacher account permanently?")) return;
        try {
            await EngiLearnAPI.deleteUser(id);
            this.showActionStatus("Account deleted.");
            await this.load();
            this.closeStudentDetail();
        } catch (error) {
            this.showActionStatus(error.message || "Delete failed.", "error");
        }
    }
};

document.addEventListener("DOMContentLoaded", () => adminLms.init());
