function initMobileNavigation() {
    const toggle = document.querySelector(".mobile-menu-toggle");
    const menu = document.querySelector(".nav-menu");
    if (!toggle || !menu) return;

    toggle.addEventListener("click", () => {
        const isOpen = document.body.classList.toggle("nav-open");
        toggle.setAttribute("aria-expanded", String(isOpen));
        toggle.innerHTML = `<i class="fas ${isOpen ? "fa-xmark" : "fa-bars"}"></i>`;
    });

    menu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            document.body.classList.remove("nav-open");
            toggle.setAttribute("aria-expanded", "false");
            toggle.innerHTML = `<i class="fas fa-bars"></i>`;
        });
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMobileNavigation);
} else {
    initMobileNavigation();
}
