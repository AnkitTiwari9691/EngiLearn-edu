const Toast = {
    root() {
        let root = document.querySelector(".toast-root");
        if (!root) {
            root = document.createElement("div");
            root.className = "toast-root";
            document.body.appendChild(root);
        }
        return root;
    },

    show(message, type = "success") {
        const item = document.createElement("div");
        item.className = `toast toast-${type}`;
        item.innerHTML = `<i class="fas ${type === "error" ? "fa-circle-xmark" : "fa-circle-check"}"></i><span>${message}</span>`;
        this.root().appendChild(item);
        setTimeout(() => item.classList.add("show"), 20);
        setTimeout(() => {
            item.classList.remove("show");
            setTimeout(() => item.remove(), 220);
        }, 4200);
    }
};

window.Toast = Toast;
