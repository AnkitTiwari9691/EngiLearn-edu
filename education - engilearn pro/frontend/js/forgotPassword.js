document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("forgotForm");
    form?.addEventListener("submit", async (event) => {
        event.preventDefault();
        event.stopPropagation();
        const button = form.querySelector("button[type='submit']");
        const payload = Object.fromEntries(new FormData(form).entries());
        AuthUI.setLoading(button, true, "Sending...");
        AuthUI.alert("Password reset OTP request started. Please wait while EngiLearn sends it to your email or mobile.", "info");
        try {
            const data = await EngiLearnAPI.forgotPassword(payload);
            sessionStorage.setItem("reset_identifier", payload.identifier);
            if (payload.role) {
                sessionStorage.setItem("reset_role", payload.role);
            } else {
                sessionStorage.removeItem("reset_role");
            }
            AuthUI.alert(`${AuthUI.otpMessage(data, "Password reset OTP sent successfully.")}<br><a href="reset-password.html">Open reset password</a>`, "success");
        } catch (error) {
            AuthUI.alert(error.message, "error");
        } finally {
            AuthUI.setLoading(button, false);
        }
    });
});
