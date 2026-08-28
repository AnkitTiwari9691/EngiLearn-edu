document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("otpForm");
    const email = document.getElementById("email");
    const role = document.getElementById("role");
    const resend = document.getElementById("resendOtp");
    const cancel = document.getElementById("cancelRequest");
    if (email && !email.value) email.value = sessionStorage.getItem("pending_signup_email") || "";
    if (role) role.value = sessionStorage.getItem("pending_signup_role") || "Student";
    if (resend) AuthUI.startCountdown(resend, 60);

    form?.addEventListener("submit", async (event) => {
        event.preventDefault();
        const button = form.querySelector("button[type='submit']");
        AuthUI.setLoading(button, true, "Verifying...");
        try {
            const data = await EngiLearnAPI.verifySignupOtp({ email: email.value, role: role?.value, otp: AuthUI.otpValue() });
            AuthUI.alert(data.message || "OTP verified. Your account is active and ready to login.", "success");
            setTimeout(() => window.location.href = "login.html", 1200);
        } catch (error) {
            AuthUI.alert(error.message, "error");
        } finally {
            AuthUI.setLoading(button, false);
        }
    });

    resend?.addEventListener("click", async () => {
        try {
            await EngiLearnAPI.resendOtp({ email: email.value, role: role?.value, purpose: "signup" });
            AuthUI.alert("OTP resent.", "success");
            AuthUI.startCountdown(resend, 60);
        } catch (error) {
            AuthUI.alert(error.message, "error");
        }
    });

    cancel?.addEventListener("click", async () => {
        if (!email.value) {
            AuthUI.alert("Enter the email used for signup first.", "error");
            return;
        }

        if (!confirm("Cancel and delete this signup request?")) return;

        AuthUI.setLoading(cancel, true, "Cancelling...");
        try {
            await EngiLearnAPI.cancelSignupRequest({ email: email.value, role: role?.value });
            sessionStorage.removeItem("pending_signup_email");
            sessionStorage.removeItem("pending_signup_role");
            AuthUI.alert("Signup request cancelled.", "success");
            setTimeout(() => window.location.href = "signup.html", 800);
        } catch (error) {
            AuthUI.alert(error.message, "error");
        } finally {
            AuthUI.setLoading(cancel, false);
        }
    });
});
