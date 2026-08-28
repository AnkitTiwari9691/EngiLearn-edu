const lmsAuth = {
    init() {
        const adminForm = document.getElementById("adminLoginForm");
        const studentForm = document.getElementById("studentLoginForm");
        const registerForm = document.getElementById("studentRegisterForm");
        if (adminForm) adminForm.addEventListener("submit", (event) => this.login(event, "Admin"));
        if (studentForm) studentForm.addEventListener("submit", (event) => this.login(event, "Student"));
        if (registerForm) registerForm.addEventListener("submit", (event) => this.register(event));
    },

    alert(message, type = "error") {
        document.getElementById("authAlert").innerHTML = `<div class="lms-alert ${type}">${message}</div>`;
    },

    async login(event, role) {
        event.preventDefault();
        const form = Object.fromEntries(new FormData(event.target));
        try {
            const data = await EngiLearnAPI.login(form.identifier, form.password, role);
            EngiLearnAPI.token = data.token;
            localStorage.setItem("mini_currentUser", JSON.stringify(data.user));
            this.alert("Login successful. Opening dashboard...", "success");
            setTimeout(() => {
                window.location.href = role === "Admin" ? "admin.html" : "dashboard.html";
            }, 450);
        } catch (error) {
            this.alert(error.message);
        }
    },

    async register(event) {
        event.preventDefault();
        const form = Object.fromEntries(new FormData(event.target));
        try {
            const data = await EngiLearnAPI.register(form);
            EngiLearnAPI.token = data.token;
            localStorage.setItem("mini_currentUser", JSON.stringify(data.user));
            this.alert("Account created. Opening dashboard...", "success");
            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 450);
        } catch (error) {
            this.alert(error.message);
        }
    }
};

document.addEventListener("DOMContentLoaded", () => lmsAuth.init());
