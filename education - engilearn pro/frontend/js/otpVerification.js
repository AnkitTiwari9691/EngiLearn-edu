(function () {
    const emailForm = document.getElementById("emailOtpForm");
    const verifyForm = document.getElementById("verifyOtpForm");
    const email = document.getElementById("email");
    const otp = document.getElementById("otp");
    const sendButton = document.getElementById("sendOtpBtn");
    const verifyButton = document.getElementById("verifyOtpBtn");
    const changeEmailButton = document.getElementById("changeEmailBtn");
    const stepText = document.getElementById("otpStepText");

    function setVerifyStep(enabled) {
        emailForm.hidden = enabled;
        verifyForm.hidden = !enabled;
        stepText.textContent = enabled
            ? `OTP sent to ${email.value}. Enter it below.`
            : "Start by sending an OTP to your email.";
        if (enabled) otp.focus();
    }

    emailForm?.addEventListener("submit", async (event) => {
        event.preventDefault();
        AuthUI.setLoading(sendButton, true, "Sending OTP...");

        try {
            const data = await EngiLearnAPI.sendEmailOtp({ email: email.value });
            AuthUI.alert(AuthUI.otpMessage(data, "OTP sent. Check your email."), "success");
            setVerifyStep(true);
        } catch (error) {
            AuthUI.alert(error.message || "OTP send failed.", "error");
        } finally {
            AuthUI.setLoading(sendButton, false);
        }
    });

    verifyForm?.addEventListener("submit", async (event) => {
        event.preventDefault();
        AuthUI.setLoading(verifyButton, true, "Verifying...");

        try {
            const data = await EngiLearnAPI.verifyEmailOtp({ email: email.value, otp: otp.value });
            AuthUI.alert(data.message || "OTP verified successfully.", "success");
            otp.value = "";
        } catch (error) {
            AuthUI.alert(error.message || "OTP verification failed.", "error");
        } finally {
            AuthUI.setLoading(verifyButton, false);
        }
    });

    changeEmailButton?.addEventListener("click", () => {
        otp.value = "";
        setVerifyStep(false);
        email.focus();
    });
})();
