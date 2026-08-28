const studyTools = {
    toolHubAccessUser: null,
    toolHubAccessVerified: false,
    stopwatchInterval: null,
    stopwatchTime: 0,
    isRunning: false,
    pomodoroInterval: null,
    pomodoroSeconds: 25 * 60,
    pomodoroMode: "focus",
    pomodoroRunning: false,
    calcInput: "0",
    todos: JSON.parse(localStorage.getItem("studyTodos") || "[]"),
    converterUnits: {
        length: { m: 1, cm: 0.01, mm: 0.001, km: 1000, inch: 0.0254, ft: 0.3048 },
        mass: { kg: 1, g: 0.001, mg: 0.000001, lb: 0.45359237 },
        data: { B: 1, KB: 1024, MB: 1024 ** 2, GB: 1024 ** 3 }
    },
    formulas: {
        maths: [
            ["Quadratic", "x = (-b +/- sqrt(b^2 - 4ac)) / 2a"],
            ["Derivative", "d/dx x^n = n x^(n-1)"],
            ["Integration", "Integral x^n dx = x^(n+1)/(n+1) + C"],
            ["Laplace", "L{e^(at)} = 1 / (s - a)"]
        ],
        physics: [
            ["Force", "F = ma"],
            ["Kinetic Energy", "KE = 1/2 mv^2"],
            ["Ohm's Law", "V = IR"],
            ["Wave Speed", "v = f lambda"]
        ],
        circuits: [
            ["Power", "P = VI = I^2R = V^2/R"],
            ["Capacitor", "Xc = 1 / (2 pi f C)"],
            ["Inductor", "Xl = 2 pi f L"],
            ["RC Time Constant", "tau = RC"]
        ],
        cs: [
            ["Binary Search", "O(log n)"],
            ["Merge Sort", "O(n log n)"],
            ["Dijkstra", "O((V + E) log V) with heap"],
            ["DBMS Normalization", "1NF -> 2NF -> 3NF -> BCNF"]
        ]
    },

    init() {
        this.initDock();
        this.refreshToolHubAccess();
        this.initStopwatch();
        this.initNotes();
        this.initCalculator();
        this.initTodos();
        this.initPomodoro();
        this.initConverter();
        this.initFormulas();
        this.initCgpa();
        this.initAttendance();
        this.resumePaymentIfRequested();
        window.addEventListener("hashchange", () => this.resumePaymentIfRequested());
    },

    initDock() {
        const dock = document.querySelector(".toolbox-dock");
        this.applyToolHubSettings();
        window.addEventListener("engilearn:settings", () => this.applyToolHubSettings());
        document.getElementById("dockCenter")?.addEventListener("click", () => {
            if (!this.canUseToolHub()) return this.openToolHubAccess();
            dock?.classList.toggle("open");
        });
        document.querySelectorAll("[data-tool-open]").forEach((button) => {
            button.dataset.toolBound = "true";
            button.addEventListener("click", () => {
                if (!this.canUseToolHub()) return this.openToolHubAccess();
                this.openModal(button.dataset.toolOpen);
                dock?.classList.remove("open");
            });
        });
        document.addEventListener("click", (event) => {
            const button = event.target.closest("[data-tool-open]");
            if (!button || button.dataset.toolBound === "true") return;
            if (!this.canUseToolHub()) return this.openToolHubAccess();
            this.openModal(button.dataset.toolOpen);
            dock?.classList.remove("open");
        });
        document.querySelectorAll("[data-tool-close]").forEach((button) => {
            button.addEventListener("click", () => this.closeModals());
        });
        document.querySelectorAll(".tool-modal").forEach((modal) => {
            modal.addEventListener("click", (event) => {
                if (event.target === modal) this.closeModals();
            });
        });
        document.querySelectorAll("[data-payment-method]").forEach((button) => button.addEventListener("click", () => this.selectPaymentMethod(button.dataset.paymentMethod)));
        document.getElementById("toolHubVerifyUpi")?.addEventListener("click", () => this.verifyCustomerUpi());
        document.getElementById("toolHubGatewayPayBtn")?.addEventListener("click", () => this.startGatewayPayment());
    },

    selectPaymentMethod(method) {
        document.querySelectorAll("[data-payment-method]").forEach((button) => button.classList.toggle("active", button.dataset.paymentMethod === method));
        document.querySelectorAll("[data-payment-panel]").forEach((panel) => panel.classList.toggle("active", panel.dataset.paymentPanel === method));
        const status = document.getElementById("toolHubGatewayStatus");
        if (status) status.textContent = method === "upi"
            ? "UPI payment opens securely inside Razorpay and unlocks access after server verification."
            : `${method === "card" ? "Card" : method === "netbanking" ? "Net banking" : "Wallet"} payment opens securely inside Razorpay checkout.`;
    },

    verifyCustomerUpi() {
        const input = document.getElementById("toolHubCustomerUpi");
        const status = document.getElementById("toolHubUpiVerifyStatus");
        const value = String(input?.value || "").trim();
        const valid = /^[a-z0-9._-]{2,}@[a-z0-9._-]{2,}$/i.test(value);
        if (status) {
            status.textContent = valid ? "UPI ID format verified." : "Enter a valid UPI ID such as name@bank.";
            status.classList.toggle("success", valid);
        }
    },

    async startGatewayPayment() {
        const button = document.getElementById("toolHubGatewayPayBtn");
        const status = document.getElementById("toolHubGatewayStatus");
        const user = JSON.parse(localStorage.getItem("mini_currentUser") || "{}");
        if (!EngiLearnAPI.token || !user.id) {
            if (status) status.textContent = "Login required. Opening login page, then payment will continue.";
            sessionStorage.setItem("engilearn_resume_toolhub_payment", "true");
            window.location.href = this.loginUrlForPayment();
            return;
        }
        if (button) button.disabled = true;
        if (status) status.textContent = "Creating secure payment order...";
        try {
            await this.ensureRazorpayCheckout();
            const order = await EngiLearnAPI.createToolHubOrder({
                name: user.name || "",
                email: user.email || "",
                mobile: user.mobile || user.phone || ""
            });
            const checkout = new Razorpay({
                key: order.keyId,
                amount: order.amount,
                currency: order.currency,
                name: order.payeeName || "EngiLearn",
                description: "Tool Hub Access",
                order_id: order.orderId,
                prefill: { name: user.name || "", email: user.email || "", contact: user.mobile || user.phone || "" },
                theme: { color: "#d71920" },
                handler: async (payment) => {
                    if (status) status.textContent = "Verifying successful payment...";
                    try {
                        const result = await EngiLearnAPI.verifyToolHubPayment(payment);
                        if (!result.verified) throw new Error("Payment verification failed.");
                        try {
                            await EngiLearnAPI.downloadPaymentReceipt(result.receiptKey || result.paymentId);
                        } catch (receiptError) {
                            console.warn("PDF receipt download unavailable:", receiptError.message);
                        }
                        const savedUser = JSON.parse(localStorage.getItem("mini_currentUser") || "{}");
                        savedUser.toolHubAccess = true;
                        localStorage.setItem("mini_currentUser", JSON.stringify(savedUser));
                        this.toolHubAccessUser = result.user || savedUser;
                        this.toolHubAccessVerified = true;
                        this.applyToolHubSettings();
                        this.closeModals();
                        document.querySelector(".toolbox-dock")?.classList.add("open");
                        this.showSuccess("Payment verified. Tool Hub unlocked and PDF receipt generated.");
                    } catch (error) {
                        if (status) status.textContent = error.message || "Payment verification failed.";
                    }
                },
                modal: { ondismiss: () => { if (status) status.textContent = "Payment was cancelled."; } }
            });
            checkout.on("payment.failed", (response) => {
                if (status) status.textContent = response.error?.description || "Payment failed. Please try again.";
            });
            checkout.open();
        } catch (error) {
            if (status) status.textContent = error.message || "Secure payment is not configured yet.";
        } finally {
            if (button) button.disabled = false;
        }
    },

    loginUrlForPayment() {
        const returnUrl = `${window.location.origin}${window.location.pathname.replace(/\/frontend$/, "/frontend/index.html")}#toolhub-payment`;
        const loginUrl = window.location.pathname.endsWith("/frontend")
            ? "/frontend/login.html"
            : "login.html";
        return `${loginUrl}?returnTo=${encodeURIComponent(returnUrl)}`;
    },

    ensureRazorpayCheckout() {
        if (window.Razorpay) return Promise.resolve();
        return new Promise((resolve, reject) => {
            const existing = document.querySelector('script[src*="checkout.razorpay.com/v1/checkout.js"]');
            if (existing) {
                existing.addEventListener("load", () => resolve(), { once: true });
                existing.addEventListener("error", () => reject(new Error("Secure checkout could not load. Check internet connection.")), { once: true });
                window.setTimeout(() => window.Razorpay ? resolve() : reject(new Error("Secure checkout is still loading. Please click Pay again.")), 7000);
                return;
            }
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.async = true;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error("Secure checkout could not load. Check internet connection."));
            document.head.appendChild(script);
        });
    },
    getToolHubSettings() {
        // Paid access must fail closed. A stale/local browser setting is never
        // allowed to turn a server-paid feature into free access.
        const settings = window.engilearnPlatformSettingsFresh === true
            ? (window.engilearnPlatformSettings || {})
            : {};
        return {
            visible: true,
            accessMode: "paid",
            price: 100,
            qrImage: "",
            upiId: "",
            payeeName: "EngiLearn",
            instructions: "Pay Rs. 100 first, then unlock Tool Hub tools on this device.",
            ...(settings.toolHub || {})
        };
    },

    isAdminUser() {
        return this.toolHubAccessVerified
            && String(this.toolHubAccessUser?.role || "").toLowerCase().includes("admin");
    },

    async refreshToolHubAccess() {
        this.toolHubAccessUser = null;
        this.toolHubAccessVerified = false;
        if (!window.EngiLearnAPI?.token) {
            this.toolHubAccessVerified = true;
            this.applyToolHubSettings();
            return;
        }
        try {
            const result = await EngiLearnAPI.verifyToken();
            this.toolHubAccessUser = result.user || null;
            this.toolHubAccessVerified = true;
            if (result.user) localStorage.setItem("mini_currentUser", JSON.stringify(result.user));
        } catch (error) {
            this.toolHubAccessUser = null;
            this.toolHubAccessVerified = true;
        }
        this.applyToolHubSettings();
    },

    canUseToolHub() {
        const settings = this.getToolHubSettings();
        if (settings.visible === false) return false;
        if (this.isAdminUser()) return true;
        if (settings.accessMode !== "paid") return true;
        if (!this.toolHubAccessVerified) return false;
        return this.toolHubAccessUser?.toolHubAccess === true;
    },

    applyToolHubSettings() {
        const dock = document.querySelector(".toolbox-dock");
        if (!dock) return;
        const settings = this.getToolHubSettings();
        dock.hidden = settings.visible === false;
        dock.classList.toggle("paid-locked", settings.visible !== false && settings.accessMode === "paid" && !this.canUseToolHub());
    },

    openToolHubAccess() {
        const settings = this.getToolHubSettings();
        if (settings.visible === false) {
            this.showSuccess("Tool Hub is currently hidden by admin.");
            return;
        }
        const priceText = document.getElementById("toolHubPriceText");
        if (priceText) priceText.textContent = `Rs. ${Number(settings.price || 100).toFixed(2)}`;
        const gatewayPay = document.getElementById("toolHubGatewayPayBtn");
        if (gatewayPay) gatewayPay.innerHTML = `<i class="fas fa-shield-halved"></i> Pay Rs. ${Number(settings.price || 100)} Securely`;
        const orderId = document.getElementById("toolHubOrderId");
        if (orderId) orderId.textContent = `#TH-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}`;
        this.selectPaymentMethod("upi");
        this.openModal("toolHubAccessModal");
    },

    resumePaymentIfRequested() {
        const shouldResume = window.location.hash === "#toolhub-payment"
            || sessionStorage.getItem("engilearn_resume_toolhub_payment") === "true";
        if (!shouldResume) return;
        sessionStorage.removeItem("engilearn_resume_toolhub_payment");
        window.setTimeout(() => {
            this.openToolHubAccess();
            document.getElementById("toolHubGatewayPayBtn")?.focus();
            const status = document.getElementById("toolHubGatewayStatus");
            if (status) status.textContent = EngiLearnAPI.token
                ? "Ready. Click Pay Rs. 100 Securely to open Razorpay."
                : "Login is required before payment. Click Pay Rs. 100 Securely to continue.";
        }, 650);
    },
    openModal(id) {
        this.closeModals();
        document.getElementById(id)?.classList.add("open");
        if (id === "notesModal") this.loadNotes();
        if (id === "todoModal") this.renderTodos();
        if (id === "formulaModal") this.renderFormulas();
        if (id === "cgpaModal") this.renderCgpaRows();
        if (id === "attendanceModal") this.updateAttendance();
    },

    closeModals() {
        document.querySelectorAll(".tool-modal").forEach((modal) => modal.classList.remove("open"));
    },

    initStopwatch() {
        document.getElementById("startBtn")?.addEventListener("click", () => this.startStopwatch());
        document.getElementById("pauseBtn")?.addEventListener("click", () => this.pauseStopwatch());
        document.getElementById("resetBtn")?.addEventListener("click", () => this.resetStopwatch());
    },

    startStopwatch() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.stopwatchInterval = setInterval(() => this.updateStopwatch(), 1000);
        document.getElementById("startBtn").disabled = true;
        document.getElementById("pauseBtn").disabled = false;
        document.getElementById("startBtn").innerHTML = '<i class="fas fa-play"></i> Running';
    },

    pauseStopwatch() {
        this.isRunning = false;
        clearInterval(this.stopwatchInterval);
        document.getElementById("startBtn").disabled = false;
        document.getElementById("pauseBtn").disabled = true;
        document.getElementById("startBtn").innerHTML = '<i class="fas fa-play"></i> Resume';
    },

    resetStopwatch() {
        this.pauseStopwatch();
        this.stopwatchTime = 0;
        document.getElementById("stopwatchDisplay").textContent = "00:00:00";
        document.getElementById("startBtn").innerHTML = '<i class="fas fa-play"></i> Start';
    },

    updateStopwatch() {
        this.stopwatchTime += 1;
        const hours = Math.floor(this.stopwatchTime / 3600);
        const minutes = Math.floor((this.stopwatchTime % 3600) / 60);
        const seconds = this.stopwatchTime % 60;
        document.getElementById("stopwatchDisplay").textContent = [hours, minutes, seconds]
            .map((value) => String(value).padStart(2, "0"))
            .join(":");
    },

    initNotes() {
        document.getElementById("saveNotesBtn")?.addEventListener("click", () => {
            localStorage.setItem("studyNotes", document.getElementById("notesTextarea").value);
            this.showSuccess("Notes saved.");
        });
        document.getElementById("clearNotesBtn")?.addEventListener("click", () => {
            document.getElementById("notesTextarea").value = "";
            localStorage.removeItem("studyNotes");
            this.showSuccess("Notes cleared.");
        });
    },

    loadNotes() {
        document.getElementById("notesTextarea").value = localStorage.getItem("studyNotes") || "";
    },

    showSuccess(message) {
        const msg = document.getElementById("successMsg");
        if (!msg) return;
        msg.querySelector("span").textContent = message;
        msg.classList.add("open");
        setTimeout(() => msg.classList.remove("open"), 1800);
    },

    initCalculator() {
        const buttons = [
            ["C", "clear"], ["Back", "delete"], ["/", "operator"], ["x", "operator"],
            ["7", "number"], ["8", "number"], ["9", "number"], ["-", "operator"],
            ["4", "number"], ["5", "number"], ["6", "number"], ["+", "operator"],
            ["1", "number"], ["2", "number"], ["3", "number"], ["=", "equals"],
            ["0", "number wide"], [".", "number"]
        ];
        const grid = document.getElementById("calculatorGrid");
        if (!grid) return;
        grid.querySelectorAll("button").forEach((button) => button.remove());
        buttons.forEach(([label, type]) => {
            const button = document.createElement("button");
            button.className = `calc-btn calc-${type.split(" ")[0]}`;
            if (type.includes("wide")) button.style.gridColumn = "span 2";
            if (type === "equals") button.classList.add("calc-equals");
            button.textContent = label;
            button.addEventListener("click", () => this.handleCalc(label));
            grid.appendChild(button);
        });
    },

    initAttendance() {
        ["attendanceTotal", "attendancePresent", "attendanceTarget"].forEach((id) => {
            document.getElementById(id)?.addEventListener("input", () => this.updateAttendance());
            document.getElementById(id)?.addEventListener("change", () => this.updateAttendance());
        });
        this.updateAttendance();
    },

    updateAttendance() {
        const total = Math.max(0, Number(document.getElementById("attendanceTotal")?.value || 0));
        const present = Math.min(total, Math.max(0, Number(document.getElementById("attendancePresent")?.value || 0)));
        const target = Math.min(100, Math.max(1, Number(document.getElementById("attendanceTarget")?.value || 75)));
        const result = document.getElementById("attendanceResult");
        if (!result) return;

        const percent = total ? (present / total) * 100 : 0;
        let detail = "Add total and attended classes.";
        if (total > 0 && percent >= target) {
            const canMiss = Math.floor((present / (target / 100)) - total);
            detail = canMiss > 0
                ? `You can miss ${canMiss} class${canMiss === 1 ? "" : "es"} and stay above ${target}%.`
                : `You are exactly around the ${target}% target.`;
        } else if (total > 0) {
            const needed = Math.ceil(((target / 100) * total - present) / (1 - target / 100));
            detail = `Attend next ${Math.max(0, needed)} class${needed === 1 ? "" : "es"} to reach ${target}%.`;
        }

        result.innerHTML = `
            <strong>${percent.toFixed(2)}%</strong>
            <span>${detail}</span>
        `;
        result.classList.toggle("danger", total > 0 && percent < target);
    },

    handleCalc(value) {
        if (value === "C") {
            this.calcInput = "0";
        } else if (value === "Back") {
            this.calcInput = this.calcInput.length > 1 ? this.calcInput.slice(0, -1) : "0";
        } else if (value === "=") {
            this.calculate();
            return;
        } else {
            this.calcInput = this.calcInput === "0" && value !== "." ? value : this.calcInput + value;
        }
        document.getElementById("calcDisplay").textContent = this.calcInput;
    },

    calculate() {
        const expression = this.calcInput.replace(/x/g, "*");
        if (!/^[0-9+\-*/.()\s]+$/.test(expression)) {
            document.getElementById("calcDisplay").textContent = "Error";
            this.calcInput = "0";
            return;
        }

        try {
            this.calcInput = Function(`"use strict"; return (${expression})`)().toString();
            document.getElementById("calcDisplay").textContent = this.calcInput;
        } catch {
            document.getElementById("calcDisplay").textContent = "Error";
            this.calcInput = "0";
        }
    },

    initTodos() {
        document.getElementById("addTodoBtn")?.addEventListener("click", () => this.addTodo());
        document.getElementById("todoInput")?.addEventListener("keydown", (event) => {
            if (event.key === "Enter") this.addTodo();
        });
        document.getElementById("clearTodosBtn")?.addEventListener("click", () => {
            this.todos = [];
            this.saveTodos();
            this.renderTodos();
        });
    },

    addTodo() {
        const input = document.getElementById("todoInput");
        const text = input.value.trim();
        if (!text) return;
        this.todos.push({ text, completed: false });
        input.value = "";
        this.saveTodos();
        this.renderTodos();
    },

    renderTodos() {
        const list = document.getElementById("todoList");
        list.innerHTML = "";
        this.todos.forEach((todo, index) => {
            const item = document.createElement("div");
            item.className = `todo-item ${todo.completed ? "completed" : ""}`;

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = todo.completed;
            checkbox.addEventListener("change", () => {
                this.todos[index].completed = checkbox.checked;
                this.saveTodos();
                this.renderTodos();
            });

            const label = document.createElement("span");
            label.textContent = todo.text;

            const remove = document.createElement("button");
            remove.className = "todo-delete-btn";
            remove.innerHTML = '<i class="fas fa-trash"></i>';
            remove.addEventListener("click", () => {
                this.todos.splice(index, 1);
                this.saveTodos();
                this.renderTodos();
            });

            item.append(checkbox, label, remove);
            list.appendChild(item);
        });
    },

    saveTodos() {
        localStorage.setItem("studyTodos", JSON.stringify(this.todos));
    },

    initPomodoro() {
        document.getElementById("pomodoroStartBtn")?.addEventListener("click", () => this.startPomodoro());
        document.getElementById("pomodoroPauseBtn")?.addEventListener("click", () => this.pausePomodoro());
        document.getElementById("pomodoroResetBtn")?.addEventListener("click", () => this.resetPomodoro());
        ["focusMinutes", "breakMinutes"].forEach((id) => {
            document.getElementById(id)?.addEventListener("change", () => this.resetPomodoro());
        });
        this.resetPomodoro();
    },

    pomodoroMinutes(type) {
        const id = type === "break" ? "breakMinutes" : "focusMinutes";
        return Math.max(1, Number(document.getElementById(id)?.value || (type === "break" ? 5 : 25)));
    },

    updatePomodoroDisplay() {
        const minutes = Math.floor(this.pomodoroSeconds / 60);
        const seconds = this.pomodoroSeconds % 60;
        document.getElementById("pomodoroDisplay").textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
        document.getElementById("pomodoroMode").textContent = this.pomodoroMode === "focus" ? "Focus Session" : "Break Time";
    },

    startPomodoro() {
        if (this.pomodoroRunning) return;
        this.pomodoroRunning = true;
        document.getElementById("pomodoroStartBtn").disabled = true;
        document.getElementById("pomodoroPauseBtn").disabled = false;
        this.pomodoroInterval = setInterval(() => {
            this.pomodoroSeconds -= 1;
            if (this.pomodoroSeconds <= 0) {
                this.pomodoroMode = this.pomodoroMode === "focus" ? "break" : "focus";
                this.pomodoroSeconds = this.pomodoroMinutes(this.pomodoroMode) * 60;
                this.showSuccess(this.pomodoroMode === "break" ? "Focus complete. Take a break." : "Break complete. Start focus.");
            }
            this.updatePomodoroDisplay();
        }, 1000);
    },

    pausePomodoro() {
        this.pomodoroRunning = false;
        clearInterval(this.pomodoroInterval);
        document.getElementById("pomodoroStartBtn").disabled = false;
        document.getElementById("pomodoroPauseBtn").disabled = true;
    },

    resetPomodoro() {
        this.pausePomodoro();
        this.pomodoroMode = "focus";
        this.pomodoroSeconds = this.pomodoroMinutes("focus") * 60;
        this.updatePomodoroDisplay();
    },

    initConverter() {
        const type = document.getElementById("converterType");
        const inputs = ["converterValue", "converterFrom", "converterTo"];
        type?.addEventListener("change", () => this.populateConverter());
        inputs.forEach((id) => document.getElementById(id)?.addEventListener("input", () => this.updateConverter()));
        inputs.forEach((id) => document.getElementById(id)?.addEventListener("change", () => this.updateConverter()));
        this.populateConverter();
    },

    populateConverter() {
        const type = document.getElementById("converterType")?.value || "length";
        const from = document.getElementById("converterFrom");
        const to = document.getElementById("converterTo");
        const units = type === "temperature" ? ["C", "F", "K"] : Object.keys(this.converterUnits[type] || {});
        [from, to].forEach((select) => {
            if (!select) return;
            select.innerHTML = units.map((unit) => `<option value="${unit}">${unit}</option>`).join("");
        });
        if (to?.options[1]) to.selectedIndex = 1;
        this.updateConverter();
    },

    convertTemperature(value, from, to) {
        const celsius = from === "F" ? (value - 32) * 5 / 9 : from === "K" ? value - 273.15 : value;
        if (to === "F") return celsius * 9 / 5 + 32;
        if (to === "K") return celsius + 273.15;
        return celsius;
    },

    updateConverter() {
        const type = document.getElementById("converterType")?.value || "length";
        const value = Number(document.getElementById("converterValue")?.value || 0);
        const from = document.getElementById("converterFrom")?.value;
        const to = document.getElementById("converterTo")?.value;
        let result = 0;
        if (type === "temperature") {
            result = this.convertTemperature(value, from, to);
        } else {
            const units = this.converterUnits[type] || this.converterUnits.length;
            result = value * units[from] / units[to];
        }
        document.getElementById("converterResult").textContent = `${value} ${from} = ${Number(result.toFixed(6))} ${to}`;
    },

    initFormulas() {
        document.getElementById("formulaSubject")?.addEventListener("change", () => this.renderFormulas());
        this.renderFormulas();
    },

    renderFormulas() {
        const subject = document.getElementById("formulaSubject")?.value || "maths";
        const list = document.getElementById("formulaList");
        if (!list) return;
        list.innerHTML = (this.formulas[subject] || []).map(([name, value]) => `
            <article class="formula-item">
                <strong>${name}</strong>
                <code>${value}</code>
            </article>
        `).join("");
    },

    initCgpa() {
        document.getElementById("addCgpaRowBtn")?.addEventListener("click", () => this.addCgpaRow());
        document.getElementById("resetCgpaBtn")?.addEventListener("click", () => {
            localStorage.removeItem("cgpaRows");
            this.renderCgpaRows(true);
        });
        this.renderCgpaRows();
    },

    cgpaRows() {
        return JSON.parse(localStorage.getItem("cgpaRows") || "null") || [
            { subject: "Subject 1", credits: 4, grade: 8 },
            { subject: "Subject 2", credits: 4, grade: 8 },
            { subject: "Subject 3", credits: 3, grade: 8 }
        ];
    },

    saveCgpaRows(rows) {
        localStorage.setItem("cgpaRows", JSON.stringify(rows));
    },

    renderCgpaRows(reset = false) {
        const wrap = document.getElementById("cgpaRows");
        if (!wrap) return;
        const rows = reset ? [
            { subject: "Subject 1", credits: 4, grade: 8 },
            { subject: "Subject 2", credits: 4, grade: 8 },
            { subject: "Subject 3", credits: 3, grade: 8 }
        ] : this.cgpaRows();
        this.saveCgpaRows(rows);
        wrap.innerHTML = rows.map((row, index) => `
            <div class="cgpa-row" data-cgpa-row="${index}">
                <input aria-label="Subject" value="${row.subject}">
                <input aria-label="Credits" type="number" min="1" max="10" value="${row.credits}">
                <input aria-label="Grade point" type="number" min="0" max="10" step="0.1" value="${row.grade}">
                <button type="button" aria-label="Remove subject"><i class="fas fa-xmark"></i></button>
            </div>
        `).join("");
        wrap.querySelectorAll(".cgpa-row").forEach((row, index) => {
            row.querySelectorAll("input").forEach((input) => input.addEventListener("input", () => this.updateCgpaFromDom()));
            row.querySelector("button").addEventListener("click", () => {
                const nextRows = this.cgpaRows().filter((_, itemIndex) => itemIndex !== index);
                this.saveCgpaRows(nextRows.length ? nextRows : [{ subject: "Subject 1", credits: 4, grade: 8 }]);
                this.renderCgpaRows();
            });
        });
        this.updateCgpaFromDom();
    },

    updateCgpaFromDom() {
        const rows = [...document.querySelectorAll(".cgpa-row")].map((row) => {
            const inputs = row.querySelectorAll("input");
            return {
                subject: inputs[0].value,
                credits: Number(inputs[1].value || 0),
                grade: Number(inputs[2].value || 0)
            };
        });
        this.saveCgpaRows(rows);
        const totalCredits = rows.reduce((sum, row) => sum + row.credits, 0);
        const weighted = rows.reduce((sum, row) => sum + row.credits * row.grade, 0);
        const sgpa = totalCredits ? weighted / totalCredits : 0;
        document.getElementById("cgpaResult").textContent = `SGPA: ${sgpa.toFixed(2)} / 10`;
    },

    addCgpaRow() {
        const rows = this.cgpaRows();
        rows.push({ subject: `Subject ${rows.length + 1}`, credits: 3, grade: 8 });
        this.saveCgpaRows(rows);
        this.renderCgpaRows();
    }
};

document.addEventListener("DOMContentLoaded", () => studyTools.init());
