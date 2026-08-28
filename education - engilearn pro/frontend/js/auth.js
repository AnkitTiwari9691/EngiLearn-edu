const AuthUI = {
    alert(message, type = "success") {
        const box = document.getElementById("authAlert");
        if (box) box.innerHTML = `<div class="auth-alert ${type}">${message}</div>`;
        if (window.Toast) {
            const text = String(message || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
            Toast.show(text, type);
        }
    },

    maskDestination(value, channel = "") {
        const text = String(value || "").trim();
        if (!text) return "";
        if (channel === "email" || text.includes("@")) {
            const [name, domain] = text.split("@");
            if (!domain) return text;
            return `${name.slice(0, 2)}***@${domain}`;
        }
        const digits = text.replace(/\D/g, "");
        if (digits.length >= 4) return `mobile ending ${digits.slice(-4)}`;
        return text;
    },

    otpDestinationText(data) {
        const channels = Array.isArray(data?.sentChannels) ? data.sentChannels : [];
        if (!channels.length) return "";
        return channels
            .map((item) => {
                const channel = item.channel === "sms" ? "mobile" : item.channel || "contact";
                const to = this.maskDestination(item.to, item.channel);
                return `${channel}${to ? ` ${to}` : ""}`;
            })
            .join(" and ");
    },

    otpMessage(data, fallback) {
        const destination = this.otpDestinationText(data);
        const note = data?.deliveryNote && data.deliveryMode !== "real"
            ? `<br><small>${data.deliveryNote}</small>`
            : "";
        return `${fallback}${destination ? `<br><small>OTP sent to ${destination}.</small>` : ""}${note}`;
    },

    setLoading(button, loading, text = "Processing...") {
        if (!button) return;
        button.disabled = loading;
        if (loading) {
            button.dataset.label = button.innerHTML;
            button.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${text}`;
        } else if (button.dataset.label) {
            button.innerHTML = button.dataset.label;
        }
    },

    showPassword(button, input) {
        if (!button || !input) return;
        button.addEventListener("click", () => {
            input.type = input.type === "password" ? "text" : "password";
            button.innerHTML = input.type === "password" ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
        });
    },

    rolePath(role) {
        const normalizedRole = String(role || "Student").trim().toLowerCase();
        const dashboardPaths = {
            admin: "pages/admin.html",
            teacher: "pages/teacher.html",
            student: "pages/dashboard.html"
        };
        return dashboardPaths[normalizedRole] || dashboardPaths.student;
    },

    saveSession(data) {
        if (data.accessToken || data.token) EngiLearnAPI.token = data.accessToken || data.token;
        if (data.user) localStorage.setItem("mini_currentUser", JSON.stringify(data.user));
    },

    redirectByRole(user) {
        const params = new URLSearchParams(window.location.search);
        const returnTo = params.get("returnTo");
        if (returnTo) {
            try {
                const target = new URL(returnTo, window.location.origin);
                if (target.origin === window.location.origin) {
                    window.location.href = target.toString();
                    return;
                }
            } catch (error) {
                // Fall back to role dashboard below.
            }
        }
        window.location.href = this.rolePath(user?.role);
    },

    otpValue() {
        return [...document.querySelectorAll("[data-otp]")].map((input) => input.value.trim()).join("");
    },

    wireOtpBoxes() {
        document.querySelectorAll("[data-otp]").forEach((input, index, boxes) => {
            input.addEventListener("input", () => {
                input.value = input.value.replace(/\D/g, "").slice(0, 1);
                if (input.value && boxes[index + 1]) boxes[index + 1].focus();
            });
            input.addEventListener("keydown", (event) => {
                if (event.key === "Backspace" && !input.value && boxes[index - 1]) boxes[index - 1].focus();
            });
        });
    },

    startCountdown(button, seconds = 60) {
        let remaining = seconds;
        button.disabled = true;
        const timer = setInterval(() => {
            button.textContent = `Resend OTP (${remaining}s)`;
            remaining -= 1;
            if (remaining < 0) {
                clearInterval(timer);
                button.disabled = false;
                button.textContent = "Resend OTP";
            }
        }, 1000);
    }
};

document.addEventListener("DOMContentLoaded", () => {
    if ("serviceWorker" in navigator && ["localhost", "127.0.0.1", "::1"].includes(location.hostname)) {
        navigator.serviceWorker.getRegistrations?.()
            .then((registrations) => registrations.forEach((registration) => registration.unregister()))
            .catch(() => {});
        window.caches?.keys?.()
            .then((keys) => Promise.all(keys.filter((key) => key.startsWith("engilearn-")).map((key) => caches.delete(key))))
            .catch(() => {});
    }
    document.querySelectorAll(".auth-form").forEach((form) => {
        form.setAttribute("action", "javascript:void(0)");
        form.addEventListener("submit", (event) => {
            event.preventDefault();
        }, { capture: true });
    });
    AuthUI.showPassword(document.querySelector("[data-toggle-password]"), document.querySelector("[data-password]"));
    AuthUI.wireOtpBoxes();
});
