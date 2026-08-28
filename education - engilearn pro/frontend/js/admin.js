document.addEventListener("DOMContentLoaded", async () => {
    try {
        const data = await EngiLearnAPI.request("/admin/dashboard");
        document.getElementById("adminName").textContent = data.admin.name;
        document.getElementById("users").textContent = data.stats.users;
        document.getElementById("students").textContent = data.stats.students;
        document.getElementById("lectures").textContent = data.stats.lectures;
    } catch (error) {
        window.location.href = "login.html";
    }
});
