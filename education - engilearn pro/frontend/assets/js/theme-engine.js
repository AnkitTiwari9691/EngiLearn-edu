(function () {
    const STORAGE_KEY = "engilearn_ui_theme";
    const MODE_KEY = "engilearn_color_mode";
    const ROOT = document.documentElement;

    const presets = [
        ["nothing-os", "Nothing OS", "Dot matrix, monochrome, transparent tech panels", "fa-solid fa-circle-nodes"],
        ["glassmorphism", "Glassmorphism", "Blurred glass panels with floating depth", "fa-regular fa-gem"],
        ["liquid-glass", "Liquid Glass", "Fluid translucent glass, refractive borders, soft motion depth", "fa-solid fa-droplet"],
        ["neumorphism", "Neumorphism", "Soft raised surfaces and gentle shadows", "fa-solid fa-layer-group"],
        ["cyberpunk", "Cyberpunk", "Neon glow, dark grids, high energy", "fa-solid fa-bolt"],
        ["neon-grid", "Neon Grid", "Dark app-grid cards with glowing branch icons", "fa-solid fa-grip"],
        ["luxury-gold", "Luxury Gold", "Premium black and gold editorial finish", "fa-solid fa-crown"],
        ["minimal-light", "Minimal Light", "Quiet whitespace and paper-like clarity", "fa-regular fa-sun"],
        ["material-design", "Material Design", "Structured surfaces and crisp elevation", "fa-solid fa-shapes"],
        ["apple-inspired", "Apple Inspired", "Soft gradients, calm spacing, polished cards", "fa-brands fa-apple"],
        ["gaming", "Gaming", "Bold panels, HUD-like controls, vivid action", "fa-solid fa-gamepad"],
        ["anime", "Anime", "Playful cards, pastel panels, expressive layout", "fa-solid fa-star"],
        ["corporate", "Corporate", "Professional, dense, enterprise dashboard", "fa-solid fa-briefcase"],
        ["futuristic-ai", "Futuristic AI", "AI cockpit, luminous surfaces, data feel", "fa-solid fa-robot"],
        ["retro", "Retro", "Warm vintage interface and chunky controls", "fa-solid fa-compact-disc"],
        ["dark-pro", "Dark Pro", "High contrast professional dark workspace", "fa-solid fa-moon"],
        ["gradient-modern", "Gradient Modern", "Colorful modern gradients and fluid cards", "fa-solid fa-wand-magic-sparkles"]
    ].map(([id, name, description, icon]) => ({ id, name, description, icon }));

    function safeTheme(id) {
        return presets.some((theme) => theme.id === id) ? id : "nothing-os";
    }

    function setTheme(id, options = {}) {
        const theme = safeTheme(id);
        ROOT.dataset.uiTheme = theme;
        if (document.body) {
            document.body.dataset.uiTheme = theme;
            document.body.classList.add("theme-engine-ready");
        }
        if (!options.preview && options.persist !== false) {
            localStorage.setItem(STORAGE_KEY, theme);
        }
        window.dispatchEvent(new CustomEvent("engilearn:themechange", { detail: { theme, preview: !!options.preview } }));
        return theme;
    }

    function safeMode(mode) {
        return mode === "dark" ? "dark" : "light";
    }

    function getSavedMode() {
        return safeMode(localStorage.getItem(MODE_KEY) || localStorage.getItem("lms_theme") || localStorage.getItem("theme") || document.body?.dataset.theme || ROOT.dataset.theme || "light");
    }

    function updateModeIcons(mode) {
        document.querySelectorAll("#themeToggle i, #adminThemeToggle i, #themeModeBtn i").forEach((icon) => {
            icon.classList.toggle("fa-moon", mode !== "dark");
            icon.classList.toggle("fa-sun", mode === "dark");
            icon.classList.remove("fa-circle-half-stroke");
        });
        document.querySelectorAll("#themeToggle, #adminThemeToggle, #themeModeBtn").forEach((toggle) => {
            toggle.setAttribute("aria-pressed", String(mode === "dark"));
            toggle.setAttribute("title", mode === "dark" ? "Switch to light mode" : "Switch to dark mode");
        });
    }

    function setMode(mode, options = {}) {
        const next = safeMode(mode);
        ROOT.dataset.theme = next;
        if (document.body) document.body.dataset.theme = next;
        if (options.persist !== false) {
            localStorage.setItem(MODE_KEY, next);
            localStorage.setItem("theme", next);
            localStorage.setItem("lms_theme", next);
        }
        updateModeIcons(next);
        window.dispatchEvent(new CustomEvent("engilearn:modechange", { detail: { mode: next } }));
        return next;
    }

    function toggleMode() {
        return setMode((document.body?.dataset.theme || ROOT.dataset.theme) === "dark" ? "light" : "dark");
    }

    function bindModeToggles() {
        document.querySelectorAll("#themeToggle, #adminThemeToggle, #themeModeBtn").forEach((toggle) => {
            if (toggle.dataset.themeEngineBound === "true") return;
            toggle.dataset.themeEngineBound = "true";
            toggle.addEventListener("click", (event) => {
                event.preventDefault();
                toggleMode();
            });
        });
        updateModeIcons(getSavedMode());
    }

    async function loadDefaultTheme() {
        const host = window.location.hostname && window.location.hostname !== "0.0.0.0" ? window.location.hostname : "localhost";
        const isLocal = ["localhost", "127.0.0.1", "::1"].includes(host);
        const candidates = isLocal
            ? [`http://${host}:5021/api/public/settings`, "http://127.0.0.1:5021/api/public/settings", "http://localhost:5021/api/public/settings", "/api/public/settings"]
            : ["/api/public/settings"];
        for (const url of candidates) {
            try {
                const response = await fetch(url, { credentials: "include" });
                if (!response.ok) continue;
                const data = await response.json();
                return data.settings?.themeEngine || {};
            } catch (error) {
                // Try the next local URL.
            }
        }
        return {};
    }

    function exportTheme() {
        const activeTheme = ROOT.dataset.uiTheme || "nothing-os";
        return JSON.stringify({
            version: 1,
            exportedAt: new Date().toISOString(),
            activeTheme,
            presets
        }, null, 2);
    }

    function importTheme(raw) {
        const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
        const theme = safeTheme(parsed.activeTheme || parsed.id);
        return setTheme(theme);
    }

    async function init() {
        setMode(getSavedMode());
        bindModeToggles();
        setTheme(localStorage.getItem(STORAGE_KEY) || "nothing-os", { preview: false });
        const settings = await loadDefaultTheme();
        const allowUserPreference = settings.allowUserPreference !== false;
        const saved = allowUserPreference ? localStorage.getItem(STORAGE_KEY) : "";
        setTheme(saved || settings.activeTheme || settings.defaultTheme || "nothing-os", { preview: false });
    }

    function syncSavedTheme() {
        setMode(getSavedMode(), { persist: false });
        setTheme(localStorage.getItem(STORAGE_KEY) || ROOT.dataset.uiTheme || "nothing-os", { persist: false });
        bindModeToggles();
    }

    ROOT.dataset.theme = getSavedMode();
    ROOT.dataset.uiTheme = safeTheme(localStorage.getItem(STORAGE_KEY) || "nothing-os");

    window.addEventListener("storage", (event) => {
        if ([STORAGE_KEY, MODE_KEY, "theme", "lms_theme"].includes(event.key)) syncSavedTheme();
    });
    window.addEventListener("pageshow", syncSavedTheme);

    window.EngiLearnThemeEngine = {
        presets,
        init,
        apply: (id) => setTheme(id),
        preview: (id) => setTheme(id, { preview: true }),
        export: exportTheme,
        import: importTheme,
        current: () => ROOT.dataset.uiTheme || "nothing-os",
        setMode,
        toggleMode,
        bindModeToggles,
        currentMode: () => document.body.dataset.theme || getSavedMode()
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
