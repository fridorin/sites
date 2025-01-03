document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[copy]").forEach(element => {
        element.addEventListener("click", () => {
            const textToCopy = element.getAttribute("copy");
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    element.classList.add("copied");
                    setTimeout(() => element.classList.remove("copied"), 2000);
                })
        });
    });
});