const EngiLearnAPI = {
    _refreshPromise: null,

    get isLocalDevHost() {
        return ["localhost", "127.0.0.1", "::1"].includes(window.location.hostname);
    },

    get isLocalFrontendServer() {
        return this.isLocalDevHost && !["", "5021"].includes(window.location.port);
    },

    get isDevTunnelHost() {
        return /\.devtunnels\.ms$/i.test(window.location.hostname || "");
    },

    get devTunnelBackendOrigin() {
        if (!this.isDevTunnelHost) return "";
        const host = window.location.hostname || "";
        const backendHost = host
            .replace(/-5500(\.|$)/i, "-5021$1")
            .replace(/-5501(\.|$)/i, "-5021$1")
            .replace(/-5173(\.|$)/i, "-5021$1")
            .replace(/-3000(\.|$)/i, "-5021$1");

        if (backendHost === host && !/-5021(\.|$)/i.test(host)) return "";
        return `${window.location.protocol}//${backendHost}`;
    },

    get baseURL() {
        const tunnelOrigin = this.devTunnelBackendOrigin;
        if (this.isDevTunnelHost && tunnelOrigin && tunnelOrigin !== window.location.origin) {
            return `${window.location.origin}/api`;
        }
        if (window.location.port === "5021" || !window.location.port) {
            if (tunnelOrigin) return `${tunnelOrigin}/api`;
            return `${window.location.origin}/api`;
        }
        const host = window.location.hostname && window.location.hostname !== "0.0.0.0"
            ? window.location.hostname
            : "localhost";
        const isLocal = ["localhost", "127.0.0.1", "::1"].includes(host);
        if (tunnelOrigin) return `${tunnelOrigin}/api`;
        if (!isLocal) {
            return `${window.location.origin}/api`;
        }
        return `http://${host}:5021/api`;
    },

    get fallbackBaseURL() {
        const tunnelOrigin = this.devTunnelBackendOrigin;
        if (tunnelOrigin) return `${tunnelOrigin}/api`;
        if (this.isLocalFrontendServer) {
            return this.baseURL.includes("127.0.0.1")
                ? "http://localhost:5021/api"
                : "http://127.0.0.1:5021/api";
        }
        if (!this.baseURL.includes(":5021")) return this.baseURL;
        return this.baseURL.includes("localhost")
            ? "http://127.0.0.1:5021/api"
            : "http://localhost:5021/api";
    },

    get candidateBaseURLs() {
        const urls = [];
        const add = (value) => {
            if (value && !urls.includes(value)) urls.push(value);
        };

        add(this.baseURL);
        add(this.fallbackBaseURL);
        if (this.isDevTunnelHost) {
            add("http://127.0.0.1:5021/api");
            add("http://localhost:5021/api");
        }
        return urls;
    },

    get token() {
        return localStorage.getItem("engilearn_token") || "";
    },

    set token(value) {
        if (value) {
            localStorage.setItem("engilearn_token", value);
        } else {
            localStorage.removeItem("engilearn_token");
        }
    },

    async refreshSession() {
        if (!this._refreshPromise) {
            this._refreshPromise = this.request("/auth/refresh-token", {
                method: "POST",
                _skipAuthRefresh: true
            }).then((refreshed) => {
                this.token = refreshed.accessToken || refreshed.token || "";
                if (refreshed.user) localStorage.setItem("mini_currentUser", JSON.stringify(refreshed.user));
                return refreshed;
            }).finally(() => {
                this._refreshPromise = null;
            });
        }
        return this._refreshPromise;
    },

    async request(path, options = {}) {
        const isForm = options.body instanceof FormData;
        const headers = {
            ...(options.headers || {})
        };

        if (!isForm) {
            headers["Content-Type"] = "application/json";
        }

        if (this.token) {
            headers.Authorization = `Bearer ${this.token}`;
        }

        const controller = new AbortController();
        const timeout = window.setTimeout(() => controller.abort(), Number(options.timeout || 45000));
        const requestOptions = {
            ...options,
            headers,
            credentials: "include",
            signal: options.signal || controller.signal,
            body: isForm
                ? options.body
                : options.body && typeof options.body !== "string"
                ? JSON.stringify(options.body)
                : options.body
        };

        delete requestOptions.timeout;
        delete requestOptions._retried;
        delete requestOptions._skipAuthRefresh;
        let response;
        let connectionError;
        try {
            const baseURLs = this.candidateBaseURLs;
            for (let index = 0; index < baseURLs.length; index += 1) {
                const apiBase = baseURLs[index];
                try {
                    response = await fetch(`${apiBase}${path}`, requestOptions);
                } catch (error) {
                    connectionError = error;
                    response = null;
                    if (controller.signal.aborted) break;
                    continue;
                }

                if (response && [404, 405].includes(response.status) && index < baseURLs.length - 1) {
                    continue;
                }
                break;
            }
        } finally {
            window.clearTimeout(timeout);
        }

        if (!response) {
            const unavailable = new Error(controller.signal.aborted
                ? "EngiLearn server took too long to respond. Please try again."
                : "EngiLearn server is not reachable right now. Please refresh and try again.");
            unavailable.cause = connectionError;
            unavailable.status = 0;
            throw unavailable;
        }

        const responseText = await response.text().catch(() => "");
        let data = {};
        try {
            data = responseText ? JSON.parse(responseText) : {};
        } catch (error) {
            data = {};
        }

        if (!response.ok) {
            const canRefresh = response.status === 401
                && this.token
                && !options._retried
                && !options._skipAuthRefresh
                && !["/auth/login", "/auth/refresh-token", "/auth/logout"].includes(path);
            if (canRefresh) {
                try {
                    await this.refreshSession();
                    return this.request(path, { ...options, _retried: true });
                } catch (refreshError) {
                    this.token = "";
                    localStorage.removeItem("mini_currentUser");
                }
            }
            const fallbackMessage = response.status === 401
                ? "Login required. Please sign in and try again."
                : response.status === 403
                ? "You do not have permission for this action."
                : response.status === 404
                ? "This EngiLearn feature is not available on the current server."
                : response.status >= 500
                ? "EngiLearn server is temporarily unavailable. Please try again."
                : `Request failed (${response.status}).`;
            const error = new Error(data.message || data.error || responseText.trim() || fallbackMessage);
            error.status = response.status;
            error.requestId = response.headers.get("X-Request-Id") || "";
            throw error;
        }

        return data;
    },

    normalizedRolePayload(role) {
        const value = String(role || "").trim();
        const lower = value.toLowerCase();
        return value && !["auto", "automatic", "automatic role detection", "all"].includes(lower) ? value : undefined;
    },
    normalizedAuthPayload(payload = {}) {
        const body = { ...payload };
        const selectedRole = this.normalizedRolePayload(body.role);
        if (selectedRole) {
            body.role = selectedRole;
        } else {
            delete body.role;
        }
        if (body.identifier != null) body.identifier = String(body.identifier).trim();
        if (body.email != null) body.email = String(body.email).trim();
        if (body.mobile != null) body.mobile = String(body.mobile).trim();
        return body;
    },

    login(email, password, role) {
        const selectedRole = this.normalizedRolePayload(role);
        return this.request("/auth/login", {
            method: "POST",
            body: { identifier: String(email || "").trim(), password, ...(selectedRole ? { role: selectedRole } : {}) }
        });
    },

    signup(user) {
        return this.request("/auth/complete-signup", {
            method: "POST",
            body: user
        });
    },

    requestSignupOtp(payload) {
        return this.request("/auth/request-signup-otp", {
            method: "POST",
            body: payload,
            timeout: 45000
        });
    },

    register(user) {
        return this.signup(user);
    },

    verifySignupOtp(payload) {
        return this.request("/auth/verify-signup-otp", {
            method: "POST",
            body: payload
        });
    },

    resendOtp(payload) {
        return this.request("/auth/resend-otp", {
            method: "POST",
            body: payload
        });
    },

    cancelSignupRequest(payload) {
        return this.request("/auth/cancel-signup-request", {
            method: "DELETE",
            body: payload
        });
    },

    sendLoginOtp(payload) {
        return this.request("/auth/send-login-otp", {
            method: "POST",
            body: this.normalizedAuthPayload(payload),
            timeout: 45000
        });
    },

    verifyLoginOtp(payload) {
        return this.request("/auth/verify-login-otp", {
            method: "POST",
            body: this.normalizedAuthPayload(payload)
        });
    },

    refreshToken() {
        return this.request("/auth/refresh-token", { method: "POST" });
    },

    resetPassword(payload) {
        return this.request("/auth/reset-password", {
            method: "POST",
            body: this.normalizedAuthPayload(payload)
        });
    },

    forgotPassword(payload) {
        return this.request("/auth/forgot-password", {
            method: "POST",
            body: this.normalizedAuthPayload(payload),
            timeout: 45000
        });
    },

    verifyResetOtp(payload) {
        return this.request("/auth/verify-reset-otp", {
            method: "POST",
            body: this.normalizedAuthPayload(payload)
        });
    },

    verifyToken() {
        return this.request("/auth/verify");
    },

    logout() {
        return this.request("/auth/logout", { method: "POST" });
    },

    getUsers() {
        return this.request("/admin/users");
    },

    saveUser(user, id) {
        return this.request(id ? `/admin/users/${id}` : "/admin/users", {
            method: id ? "PUT" : "POST",
            body: user
        });
    },

    toggleUserStatus(id) {
        return this.request(`/admin/users/${id}/status`, { method: "PATCH" });
    },

    updateUserAccess(id, access) {
        return this.request(`/admin/users/${id}/access`, { method: "PATCH", body: access });
    },

    deleteUser(id) {
        return this.request(`/admin/users/${id}`, { method: "DELETE" });
    },

    getApprovalRequests() {
        return this.request("/admin/requests");
    },

    approveUser(id) {
        return this.request(`/admin/users/${id}/approve`, { method: "PATCH" });
    },

    rejectUser(id) {
        return this.request(`/admin/users/${id}/reject`, { method: "DELETE" });
    },

    getContent(admin = false) {
        return this.request(admin ? "/admin/content" : "/content", admin ? {} : { timeout: 15000 });
    },

    getLectures() {
        return this.request("/lectures", { timeout: 1200 });
    },

    getPublicSettings() {
        return this.request("/public/settings", { timeout: 1200 });
    },

    createToolHubOrder(customer = {}) {
        return this.request("/toolhub/checkout/order", { method: "POST", body: customer });
    },

    verifyToolHubPayment(payment) {
        return this.request("/toolhub/checkout/verify", { method: "POST", body: payment });
    },

    async downloadPaymentReceipt(key, options = {}) {
        if (!key) throw new Error("Payment receipt key is missing.");
        let response = null;
        let connectionError = null;
        for (const apiBase of this.candidateBaseURLs) {
            try {
                response = await fetch(`${apiBase}/payments/${encodeURIComponent(key)}/receipt.pdf`, {
                    method: "GET",
                    headers: this.token ? { Authorization: `Bearer ${this.token}` } : {},
                    credentials: "include"
                });
                if (response.ok || response.status !== 404) break;
            } catch (error) {
                connectionError = error;
                response = null;
            }
        }
        if (!response) throw new Error(connectionError?.message || "Payment receipt server is unavailable.");
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Payment receipt failed (${response.status}).`);
        }
        const blob = await response.blob();
        if (!String(blob.type || "").toLowerCase().includes("pdf")) {
            throw new Error("The server did not return a valid PDF receipt.");
        }
        const disposition = response.headers.get("Content-Disposition") || "";
        const matchedName = disposition.match(/filename="?([^";]+)"?/i)?.[1];
        const fileName = matchedName || `engilearn-payment-receipt-${String(key).replace(/[^a-z0-9_-]+/gi, "-")}.pdf`;
        const url = URL.createObjectURL(blob);
        if (options.view) {
            const opened = window.open(url, "_blank", "noopener");
            if (!opened) throw new Error("Popup blocked. Please allow popups to view the receipt.");
            window.setTimeout(() => URL.revokeObjectURL(url), 60000);
            return { fileName, viewed: true };
        }
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.setTimeout(() => URL.revokeObjectURL(url), 1000);
        return { fileName, size: blob.size };
    },

    viewPaymentReceipt(key) {
        return this.downloadPaymentReceipt(key, { view: true });
    },

    deleteToolHubPayment(id) {
        return this.request(`/admin/payments/${encodeURIComponent(id)}`, { method: "DELETE" });
    },

    getAiTools() {
        return this.request("/ai-tools", { timeout: 1200 });
    },

    saveContent(item, id) {
        return this.request(id ? `/admin/content/${id}` : "/admin/content", {
            method: id ? "PUT" : "POST",
            body: item
        });
    },

    deleteContent(id) {
        return this.request(`/admin/content/${id}`, { method: "DELETE" });
    },

    getPyqStatus() {
        return this.request("/admin/pyq/status");
    },

    importPyqDataset() {
        return this.request("/admin/pyq/import", { method: "POST" });
    },

    savePyq(formData) {
        return this.request("/admin/pyq", { method: "POST", body: formData });
    },

    updatePyq(id, item) {
        return this.request(`/admin/pyq/${id}`, { method: "PUT", body: item });
    },

    deletePyq(id) {
        return this.request(`/admin/pyq/${id}`, { method: "DELETE" });
    },

    saveRepeatedQuestion(item, id) {
        return this.request(id ? `/admin/repeated-questions/${id}` : "/admin/repeated-questions", {
            method: id ? "PUT" : "POST",
            body: item
        });
    },

    deleteRepeatedQuestion(id) {
        return this.request(`/admin/repeated-questions/${id}`, { method: "DELETE" });
    },


    sendContact(message) {
        return this.request("/contact", {
            method: "POST",
            body: message
        });
    },

    recordVisit(visit) {
        return this.request("/visits", {
            method: "POST",
            body: visit,
            timeout: 2500,
            _skipAuthRefresh: true
        });
    },


    updateContactStatus(id, status) {
        return this.request(`/admin/contacts/${id}/status`, {
            method: "PATCH",
            body: { status }
        });
    },

    deleteContact(id) {
        return this.request(`/admin/contacts/${id}`, { method: "DELETE" });
    },

    deleteVisit(id) {
        return this.request(`/admin/visits/${encodeURIComponent(id)}`, { method: "DELETE" });
    },

    bulkDeleteVisits(ids) {
        return this.request("/admin/visits/bulk-delete", {
            method: "POST",
            body: { ids }
        });
    },

    deleteAdminLog(id) {
        return this.request(`/admin/logs/${encodeURIComponent(id)}`, { method: "DELETE" });
    },
    getRecords(type) {
        return this.request(`/admin/records/${type}`);
    },

    saveRecord(type, record, id) {
        return this.request(id ? `/admin/records/${type}/${id}` : `/admin/records/${type}`, {
            method: id ? "PUT" : "POST",
            body: record
        });
    },

    deleteRecord(type, id) {
        return this.request(`/admin/records/${type}/${id}`, { method: "DELETE" });
    },

    getAdminLms() {
        return this.request("/admin/lms");
    },

    getAnalytics() {
        return this.request("/admin/analytics");
    },

    saveSubject(subject, id) {
        return this.request(id ? `/admin/subjects/${id}` : "/admin/subjects", {
            method: id ? "PUT" : "POST",
            body: subject
        });
    },

    deleteSubject(id) {
        return this.request(`/admin/subjects/${id}`, { method: "DELETE" });
    },

    saveLecture(formData, id) {
        return this.request(id ? `/admin/lectures/${id}` : "/admin/lectures", {
            method: id ? "PUT" : "POST",
            body: formData
        });
    },

    deleteLecture(id) {
        return this.request(`/admin/lectures/${id}`, { method: "DELETE" });
    },

    saveAssignment(formData) {
        return this.request("/admin/assignments", {
            method: "POST",
            body: formData
        });
    },

    deleteAssignment(id) {
        return this.request(`/admin/assignments/${id}`, { method: "DELETE" });
    },

    sendNotification(notification) {
        return this.request("/admin/notifications", {
            method: "POST",
            body: notification
        });
    },

    saveLiveClass(liveClass) {
        return this.request("/admin/live-classes", {
            method: "POST",
            body: liveClass
        });
    },

    deleteLiveClass(id) {
        return this.request(`/admin/live-classes/${id}`, { method: "DELETE" });
    },

    updateSettings(settings) {
        return this.request("/admin/settings", {
            method: "PATCH",
            body: settings
        });
    },

    saveAiTool(tool, id) {
        return this.request(id ? `/admin/ai-tools/${id}` : "/admin/ai-tools", {
            method: id ? "PUT" : "POST",
            body: tool
        });
    },

    toggleAiTool(id, field) {
        return this.request(`/admin/ai-tools/${id}/toggle`, {
            method: "PATCH",
            body: { field }
        });
    },

    deleteAiTool(id) {
        return this.request(`/admin/ai-tools/${id}`, { method: "DELETE" });
    },

    updateAdminProfile(profile) {
        return this.request("/admin/profile", {
            method: "PUT",
            body: profile
        });
    },

    getStudentDashboard() {
        return this.request("/student/dashboard");
    },

    getTeacherDashboard() {
        return this.request("/teacher/dashboard");
    },

    saveTeacherAssignment(formData) {
        return this.request("/teacher/assignments", {
            method: "POST",
            body: formData
        });
    },

    markAttendance(attendance) {
        return this.request("/teacher/attendance", {
            method: "POST",
            body: attendance
        });
    },

    uploadMarks(marks) {
        return this.request("/teacher/marks", {
            method: "POST",
            body: marks
        });
    },

    updateStudentProfile(profile) {
        return this.request("/student/profile", {
            method: "PUT",
            body: profile
        });
    },

    getLecture(id) {
        return this.request(`/student/lectures/${id}`);
    },

    saveProgress(id, progress) {
        return this.request(`/student/lectures/${id}/progress`, {
            method: "POST",
            body: progress
        });
    },

    toggleBookmark(id) {
        return this.request(`/student/lectures/${id}/bookmark`, { method: "POST" });
    },

    submitAssignment(id, formData) {
        return this.request(`/student/assignments/${id}/submit`, {
            method: "POST",
            body: formData
        });
    }
};

window.EngiLearnAPI = EngiLearnAPI;

(function setupEngiLearnVisitTracker() {
    if (window.__engilearnVisitTrackerReady) return;
    window.__engilearnVisitTrackerReady = true;

    const randomId = (prefix) => {
        if (window.crypto?.randomUUID) return `${prefix}-${window.crypto.randomUUID()}`;
        return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
    };

    const readJson = (key, fallback = null) => {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : fallback;
        } catch (error) {
            return fallback;
        }
    };

    const saveLocalVisitFallback = (payload) => {
        try {
            const existing = readJson("engilearn_visit_logs", []) || [];
            localStorage.setItem("engilearn_visit_logs", JSON.stringify([
                { id: `local-${Date.now()}`, ...payload, localOnly: true, createdAt: new Date().toISOString() },
                ...existing
            ].slice(0, 100)));
        } catch (error) {
            // Visitor tracking must never interrupt the page.
        }
    };

    const visitorId = () => {
        const existing = localStorage.getItem("engilearn_visitor_id");
        if (existing) return existing;
        const next = randomId("ELV");
        localStorage.setItem("engilearn_visitor_id", next);
        return next;
    };

    const sessionId = () => {
        const existing = sessionStorage.getItem("engilearn_visit_session");
        if (existing) return existing;
        const next = randomId("ELS");
        sessionStorage.setItem("engilearn_visit_session", next);
        return next;
    };

    const currentUser = () => {
        const user = readJson("mini_currentUser", {}) || {};
        return {
            id: user.id || "",
            name: user.name || "",
            email: user.email || "",
            role: user.role || ""
        };
    };

    const colorMode = () => document.documentElement.dataset.themeMode
        || document.body?.dataset.theme
        || localStorage.getItem("engilearn_color_mode")
        || localStorage.getItem("theme")
        || "";

    const collectPayload = () => {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection || {};
        return {
            visitorId: visitorId(),
            sessionId: sessionId(),
            title: document.title || "EngiLearn",
            path: `${window.location.pathname}${window.location.search}${window.location.hash}`,
            url: window.location.href,
            referrer: document.referrer || "",
            language: navigator.language || "",
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "",
            platform: navigator.platform || "",
            userAgent: navigator.userAgent || "",
            theme: colorMode(),
            user: currentUser(),
            screen: {
                width: window.screen?.width || 0,
                height: window.screen?.height || 0,
                pixelRatio: window.devicePixelRatio || 1
            },
            viewport: {
                width: window.innerWidth || document.documentElement.clientWidth || 0,
                height: window.innerHeight || document.documentElement.clientHeight || 0
            },
            connection: {
                effectiveType: connection.effectiveType || "",
                downlink: connection.downlink || 0,
                rtt: connection.rtt || 0,
                saveData: Boolean(connection.saveData)
            }
        };
    };

    const track = async () => {
        const payload = collectPayload();
        try {
            await EngiLearnAPI.recordVisit(payload);
        } catch (error) {
            saveLocalVisitFallback(payload);
        }
    };

    window.EngiLearnVisitTracker = {
        track,
        collectPayload
    };

    window.addEventListener("load", () => {
        window.setTimeout(track, 500);
    }, { once: true });
})();

(function setupEngiLearnPdfRouter() {
    if (window.EngiLearnPDF?.routerReady) return;

    const isPdfTarget = (href) => {
        const value = String(href || "").trim();
        return /\.pdf(?:$|[?#])/i.test(value) || /\/api\/pyq\/[^/?#]+\/download(?:$|[?#])/i.test(value);
    };

    const isDownloadIntent = (element) => {
        const text = String(element?.textContent || "").toLowerCase();
        const className = String(element?.className || "").toLowerCase();
        return element?.hasAttribute?.("download") || text.includes("download") || className.includes("download");
    };

    const pagePrefix = () => (window.location.pathname.includes("/pages/") ? "" : "pages/");

    const normalizePdfSource = (href) => {
        const raw = String(href || "").trim();
        if (!raw) return "";
        try {
            const url = new URL(raw, window.location.href);
            return url.href;
        } catch (error) {
            return raw;
        }
    };

    const toViewerUrl = (href, title = "PYQ Paper") => {
        const file = normalizePdfSource(href);
        const label = String(title || "PYQ Paper").replace(/\s+/g, " ").trim();
        return `${pagePrefix()}pdf-viewer.html?file=${encodeURIComponent(file)}&title=${encodeURIComponent(label || "PYQ Paper")}`;
    };

    window.EngiLearnPDF = {
        routerReady: true,
        isPdfTarget,
        toViewerUrl,
        open(href, title) {
            const viewerUrl = toViewerUrl(href, title);
            window.location.href = viewerUrl;
        }
    };

    document.addEventListener("click", (event) => {
        const link = event.target?.closest?.("a[href]");
        if (!link) return;
        const href = link.getAttribute("href") || "";
        if (!isPdfTarget(href) || isDownloadIntent(link) || link.dataset.rawPdf === "true" || /\/api\/pyq\/[^/?#]+\/download(?:$|[?#])/i.test(href)) return;
        event.preventDefault();
        event.stopPropagation();
        window.location.href = toViewerUrl(href, link.dataset.title || link.getAttribute("aria-label") || link.textContent || "PYQ Paper");
    }, true);
})();
