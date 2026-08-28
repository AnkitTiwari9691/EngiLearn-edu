const authSystem = {
    currentUser: JSON.parse(localStorage.getItem("mini_currentUser") || "null"),

    init() {
        this.cache();
        this.attachEvents();
        this.syncSession();
        this.updateUI();
    },

    cache() {
        this.loginBtn = document.getElementById("loginBtn");
        this.headerLogin = document.getElementById("authOpenBtn");
        this.profileBtn = document.getElementById("profileBtn");
        this.dashboardBtn = document.getElementById("dashboardBtn");
        this.logoutBtn = document.getElementById("logoutBtn");
    },

    attachEvents() {
        this.loginBtn?.addEventListener("click", () => {
            window.location.href = "login.html";
        });
        this.headerLogin?.addEventListener("click", () => {
            window.location.href = "login.html";
        });
        this.profileBtn?.addEventListener("click", () => this.openDashboard());
        this.dashboardBtn?.addEventListener("click", () => this.openDashboard());
        this.logoutBtn?.addEventListener("click", () => this.logout());
    },

    async syncSession() {
        if (!window.EngiLearnAPI || !EngiLearnAPI.token) return;

        try {
            const data = await EngiLearnAPI.verifyToken();
            this.currentUser = data.user;
            localStorage.setItem("mini_currentUser", JSON.stringify(data.user));
            this.updateUI();
        } catch (error) {
            try {
                const refreshed = await EngiLearnAPI.refreshToken();
                EngiLearnAPI.token = refreshed.accessToken || refreshed.token;
                this.currentUser = refreshed.user;
                localStorage.setItem("mini_currentUser", JSON.stringify(refreshed.user));
                this.updateUI();
            } catch {
                this.clearSession();
            }
        }
    },

    openDashboard() {
        if (!this.currentUser) {
            window.location.href = "login.html";
            return;
        }

        const role = String(this.currentUser.role || "").trim().toLowerCase();

        if (role === "admin") {
            window.location.href = "pages/admin.html";
            return;
        }

        if (role === "teacher") {
            window.location.href = "pages/teacher.html";
            return;
        }

        window.location.href = "pages/dashboard.html";
    },

    async logout() {
        if (window.EngiLearnAPI) {
            await EngiLearnAPI.logout().catch(() => {});
            EngiLearnAPI.token = "";
        }
        this.clearSession();
        window.location.href = "index.html";
    },

    clearSession() {
        this.currentUser = null;
        localStorage.removeItem("mini_currentUser");
        this.updateUI();
    },

    updateUI() {
        const loggedIn = Boolean(this.currentUser);
        if (this.loginBtn) this.loginBtn.hidden = loggedIn;
        if (this.headerLogin) this.headerLogin.hidden = loggedIn;
        if (this.profileBtn) this.profileBtn.hidden = !loggedIn;
        if (this.dashboardBtn) this.dashboardBtn.hidden = !loggedIn;
        if (this.logoutBtn) this.logoutBtn.hidden = !loggedIn;

        const profileName = document.getElementById("profileName");
        if (profileName && loggedIn) {
            profileName.textContent = this.currentUser.name || this.currentUser.email || "Profile";
        }
    }
};

document.addEventListener("DOMContentLoaded", () => authSystem.init());
