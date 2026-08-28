document.addEventListener("DOMContentLoaded", async () => {
    const renderProfile = (user) => {
        document.getElementById("dashName").textContent = user.name;
        document.getElementById("dashEmail").textContent = user.email || user.mobile || "";
        document.getElementById("dashRole").textContent = user.role;
    };

    try {
        const data = await EngiLearnAPI.request("/user/profile");
        renderProfile(data.user);
    } catch (error) {
        try {
            const refreshed = await EngiLearnAPI.refreshToken();
            AuthUI.saveSession(refreshed);
            const data = await EngiLearnAPI.request("/user/profile");
            renderProfile(data.user);
        } catch {
            window.location.href = "login.html";
        }
    }

    document.getElementById("logout")?.addEventListener("click", async () => {
        await EngiLearnAPI.logout().catch(() => {});
        EngiLearnAPI.token = "";
        localStorage.removeItem("mini_currentUser");
        window.location.href = "login.html";
    });
});
