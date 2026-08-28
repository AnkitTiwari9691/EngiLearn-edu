document.addEventListener("DOMContentLoaded", () => {
    const verifyForm = document.getElementById("verifyResetForm");
    const resetForm = document.getElementById("resetForm");
    const identifier = document.getElementById("identifier");
    const role = document.getElementById("role");
    if (identifier && !identifier.value) identifier.value = sessionStorage.getItem("reset_identifier") || "";
    if (role && sessionStorage.getItem("reset_role")) role.value = sessionStorage.getItem("reset_role");

    const selectedRole = () => {
        const value = String(role?.value || "").trim();
        return value || undefined;
    };

    verifyForm?.addEventListener("submit", async (event) => {
        event.preventDefault();
        event.stopPropagation();
        const button = verifyForm.querySelector("button[type='submit']");
        AuthUI.setLoading(button, true, "Verifying...");
        try {
            await EngiLearnAPI.verifyResetOtp({ identifier: identifier.value, role: selectedRole(), otp: AuthUI.otpValue() });
            resetForm.hidden = false;
            AuthUI.alert("OTP verified. Enter a new password.", "success");
        } catch (error) {
            AuthUI.alert(error.message, "error");
        } finally {
            AuthUI.setLoading(button, false);
        }
    });

    resetForm?.addEventListener("submit", async (event) => {
        event.preventDefault();
        event.stopPropagation();
        const button = resetForm.querySelector("button[type='submit']");
        const newPassword = document.getElementById("newPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        if (newPassword !== confirmPassword) {
            AuthUI.alert("Passwords do not match.", "error");
            return;
        }
        AuthUI.setLoading(button, true, "Saving...");
        try {
            await EngiLearnAPI.resetPassword({ identifier: identifier.value, role: selectedRole(), newPassword });
            localStorage.removeItem("engilearn_token");
            localStorage.removeItem("mini_currentUser");
            const loginData = await EngiLearnAPI.login(identifier.value, newPassword, selectedRole());
            AuthUI.saveSession(loginData);
            AuthUI.alert("Password reset successful. Logging in with your new password...", "success");
            setTimeout(() => AuthUI.redirectByRole(loginData.user), 800);
            sessionStorage.removeItem("reset_identifier");
            sessionStorage.removeItem("reset_role");
        } catch (error) {
            AuthUI.alert(`${error.message}<br><a href="login.html">Go to login</a>`, "error");
        } finally {
            AuthUI.setLoading(button, false);
        }
    });
});
