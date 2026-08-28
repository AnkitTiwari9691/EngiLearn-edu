document.addEventListener("DOMContentLoaded", () => {
    const requestForm = document.getElementById("signupForm");
    const completeForm = document.getElementById("completeSignupForm");
    const sendOtpBtn = document.getElementById("sendOtpBtn");
    let pendingPayload = null;
    let requestingSignupOtp = false;
    sessionStorage.removeItem("pending_signup_payload");
    if (pendingPayload) {
        Object.entries(pendingPayload).forEach(([key, value]) => {
            const field = requestForm?.elements?.[key];
            if (field) field.value = value;
        });
        completeForm.hidden = false;
        AuthUI.alert("Enter the signup OTP and create password.", "success");
    }

    function stopNativeSubmit(event) {
        event?.preventDefault?.();
        event?.stopPropagation?.();
        event?.stopImmediatePropagation?.();
    }

    async function requestSignupOtp(event) {
        stopNativeSubmit(event);
        if (requestingSignupOtp) return;
        const button = sendOtpBtn || requestForm.querySelector("button[type='submit']");
        const payload = Object.fromEntries(new FormData(requestForm).entries());
        payload.email = (payload.email || "").trim();
        payload.mobile = (payload.mobile || "").trim();

        if (!payload.email || !payload.mobile) {
            AuthUI.alert("Enter both email and mobile number for real OTP signup.", "error");
            return;
        }

        requestingSignupOtp = true;
        AuthUI.setLoading(button, true, "Sending OTP...");
        AuthUI.alert("OTP request started. Please wait while EngiLearn sends it to your email or mobile.", "info");
        try {
            const data = await EngiLearnAPI.requestSignupOtp(payload);
            pendingPayload = payload;
            sessionStorage.setItem("pending_signup_payload", JSON.stringify(payload));
            completeForm.hidden = false;
            AuthUI.alert(AuthUI.otpMessage(data, "OTP sent successfully. Check your email or mobile, then create your password."), "success");
        } catch (error) {
            pendingPayload = null;
            sessionStorage.removeItem("pending_signup_payload");
            completeForm.hidden = true;
            const message = /unverified|Trial accounts/i.test(error.message)
                ? "Twilio trial can send signup OTP only to verified phone numbers. Verify this number in Twilio or upgrade Twilio to paid."
                : error.message;
            AuthUI.alert(message, "error");
        } finally {
            requestingSignupOtp = false;
            AuthUI.setLoading(button, false);
        }
    }

    requestForm?.addEventListener("submit", requestSignupOtp);
    sendOtpBtn?.addEventListener("click", (event) => {
        stopNativeSubmit(event);
        if (requestForm?.reportValidity && !requestForm.reportValidity()) return;
        requestSignupOtp(event);
    });

    completeForm?.addEventListener("submit", async (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (!pendingPayload) {
            AuthUI.alert("Request OTP first.", "error");
            return;
        }

        const button = completeForm.querySelector("button[type='submit']");
        const form = Object.fromEntries(new FormData(completeForm).entries());
        if (form.password !== form.confirmPassword) {
            AuthUI.alert("Passwords do not match.", "error");
            return;
        }

        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,72}$/.test(form.password)) {
            AuthUI.alert("Password needs uppercase, lowercase, number, and symbol.", "error");
            return;
        }

        AuthUI.setLoading(button, true, "Creating...");
        try {
            const data = await EngiLearnAPI.signup({
                ...pendingPayload,
                otp: AuthUI.otpValue(),
                password: form.password
            });
            AuthUI.alert(`${data.message || "Password created. Your account is active and ready to login."}<br><a href="login.html">Go to login</a>`, "success");
            sessionStorage.removeItem("pending_signup_payload");
        } catch (error) {
            AuthUI.alert(error.message, "error");
        } finally {
            AuthUI.setLoading(button, false);
        }
    });
});
