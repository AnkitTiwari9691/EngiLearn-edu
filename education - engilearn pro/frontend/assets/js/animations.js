document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    document.querySelectorAll(".fade-in").forEach((element) => observer.observe(element));

    const heroText = "Complete Engineering Education Platform";
    const heroH1 = document.querySelector(".hero-content h1");
    let index = 0;

    function typeWriter() {
        if (!heroH1 || index > heroText.length) return;
        heroH1.textContent = index === heroText.length ? heroText : `${heroText.slice(0, index)}|`;
        index += 1;
        if (index <= heroText.length) window.setTimeout(typeWriter, 65);
    }

    window.setTimeout(typeWriter, 500);
});
