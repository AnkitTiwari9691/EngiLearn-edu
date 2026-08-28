document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    form?.addEventListener("submit", async (event) => {
        event.preventDefault();
        event.stopPropagation();
        const button = form.querySelector("button[type='submit']");
        const payload = Object.fromEntries(new FormData(form).entries());
        AuthUI.setLoading(button, true, "Signing in...");
        try {
            const identifier = String(payload.identifier || "").trim();
            if (!identifier || !payload.password) throw new Error("Enter your email/mobile number and password.");
            localStorage.removeItem("engilearn_token");
            localStorage.removeItem("mini_currentUser");
            const selectedRole = typeof EngiLearnAPI.normalizedRolePayload === "function"
                ? EngiLearnAPI.normalizedRolePayload(payload.role)
                : (String(payload.role || "").trim() || undefined);
            const data = await EngiLearnAPI.login(identifier, payload.password, selectedRole);
            AuthUI.saveSession(data);
            sessionStorage.removeItem("reset_identifier");
            sessionStorage.removeItem("reset_role");
            if (!EngiLearnAPI.token || !data.user?.role) throw new Error("Login session could not be created. Please try again.");
            AuthUI.alert("Login successful. Opening dashboard...", "success");
            AuthUI.redirectByRole(data.user);
        } catch (error) {
            const needsPasswordSetup = /create your own password|forgot password|otp reset/i.test(error.message || "");
            if (needsPasswordSetup) {
                sessionStorage.setItem("reset_identifier", String(payload.identifier || "").trim());
                if (payload.role) {
                    sessionStorage.setItem("reset_role", payload.role);
                } else {
                    sessionStorage.removeItem("reset_role");
                }
                AuthUI.alert("Create your own password first. Use OTP reset, then login with your new password.<br><a href=\"forgot-password.html\">Send reset OTP now</a>", "error");
            } else {
                AuthUI.alert(error.message, "error");
            }
        } finally {
            AuthUI.setLoading(button, false);
        }
    });
});
