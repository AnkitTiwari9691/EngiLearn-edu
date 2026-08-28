document.addEventListener("DOMContentLoaded", () => {
    const sendForm = document.getElementById("sendLoginOtpForm");
    const verifyForm = document.getElementById("verifyLoginOtpForm");
    const identifier = document.getElementById("identifier");
    const role = document.getElementById("role");
    const resend = document.getElementById("resendOtp");
    const statusPanel = document.getElementById("otpStatusPanel");
    const statusTitle = document.getElementById("otpStatusTitle");
    const statusText = document.getElementById("otpStatusText");
    const timerText = document.getElementById("otpTimer");
    let timerId = null;

    function formatTime(ms) {
        const total = Math.max(0, Math.ceil(ms / 1000));
        const minutes = String(Math.floor(total / 60)).padStart(2, "0");
        const seconds = String(total % 60).padStart(2, "0");
        return `${minutes}:${seconds}`;
    }

    function showOtpStatus(data = {}) {
        const { expiresInMinutes = 5, restored = false } = data;
        const expiresAt = restored
            ? Number(sessionStorage.getItem("login_otp_expires_at") || 0)
            : Date.now() + Number(expiresInMinutes || 5) * 60 * 1000;

        if (restored && (!expiresAt || expiresAt <= Date.now())) {
            sessionStorage.removeItem("login_otp_identifier");
            sessionStorage.removeItem("login_otp_role");
            sessionStorage.removeItem("login_otp_expires_at");
            statusPanel.hidden = true;
            verifyForm.hidden = true;
            return;
        }

        if (!restored) sessionStorage.setItem("login_otp_expires_at", String(expiresAt));
        statusPanel.hidden = false;
        statusTitle.textContent = restored ? "OTP already sent" : "OTP sent successfully";
        const destination = AuthUI.otpDestinationText(data);
        statusText.textContent = destination
            ? `Check OTP on your ${destination}, then enter it below.`
            : "Check your registered email or mobile, then enter OTP below.";

        clearInterval(timerId);
        const tick = () => {
            const remaining = expiresAt - Date.now();
            timerText.textContent = remaining > 0 ? formatTime(remaining) : "Expired";
            if (remaining <= 0) {
                clearInterval(timerId);
                resend.disabled = false;
                resend.textContent = "Resend OTP";
            }
        };
        tick();
        timerId = setInterval(tick, 1000);
    }

    const savedIdentifier = sessionStorage.getItem("login_otp_identifier") || "";
    const savedRole = sessionStorage.getItem("login_otp_role") || "";
    if (savedIdentifier) {
        identifier.value = savedIdentifier;
        verifyForm.hidden = false;
        showOtpStatus({ restored: true });
    }
    if (savedRole) role.value = savedRole;

    function selectedRole() {
        const value = String(role?.value || "").trim();
        return EngiLearnAPI.normalizedRolePayload ? EngiLearnAPI.normalizedRolePayload(value) : (value || undefined);
    }
    async function sendOtp({ resendRequest = false } = {}) {
        const button = resendRequest ? resend : sendForm.querySelector("button[type='submit']");
        AuthUI.setLoading(button, true, resendRequest ? "Resending..." : "Sending...");
        AuthUI.alert(resendRequest
            ? "Resending OTP. Please wait while EngiLearn contacts your email or mobile."
            : "OTP request started. Please wait while EngiLearn sends it to your email or mobile.", "info");
        try {
            const data = await EngiLearnAPI.sendLoginOtp({ identifier: identifier.value, role: selectedRole(), resend: resendRequest });
            sessionStorage.setItem("login_otp_identifier", identifier.value);
            selectedRole() ? sessionStorage.setItem("login_otp_role", selectedRole()) : sessionStorage.removeItem("login_otp_role");
            verifyForm.hidden = false;
            showOtpStatus(data);
            AuthUI.alert(AuthUI.otpMessage(data, "OTP sent successfully for login."), "success");
            AuthUI.startCountdown(resend, 60);
        } catch (error) {
            if (identifier.value) {
                sessionStorage.setItem("login_otp_identifier", identifier.value);
                selectedRole() ? sessionStorage.setItem("login_otp_role", selectedRole()) : sessionStorage.removeItem("login_otp_role");
                verifyForm.hidden = false;
            }
            AuthUI.alert(error.message, "error");
        } finally {
            AuthUI.setLoading(button, false);
        }
    }

    sendForm?.addEventListener("submit", async (event) => {
        event.preventDefault();
        event.stopPropagation();
        await sendOtp();
    });

    verifyForm?.addEventListener("submit", async (event) => {
        event.preventDefault();
        event.stopPropagation();
        const button = verifyForm.querySelector("button[type='submit']");
        AuthUI.setLoading(button, true, "Verifying...");
        try {
            const data = await EngiLearnAPI.verifyLoginOtp({ identifier: identifier.value, otp: AuthUI.otpValue() });
            AuthUI.saveSession(data);
            sessionStorage.removeItem("login_otp_identifier");
            sessionStorage.removeItem("login_otp_role");
            AuthUI.alert("OTP login successful.", "success");
            AuthUI.redirectByRole(data.user);
        } catch (error) {
            AuthUI.alert(error.message, "error");
        } finally {
            AuthUI.setLoading(button, false);
        }
    });

    resend?.addEventListener("click", () => {
        sendOtp({ resendRequest: true });
    });
});
