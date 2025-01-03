document.addEventListener("DOMContentLoaded", () => {
    fetch('message.txt')
        .then(response => {
            return response.text();
        })
        .then(data => {
            const textArea = document.getElementById('text');
                textArea.value = data;
        })
});