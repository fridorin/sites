window.onload = function () {
    fetch('message.txt')
        .then(response => {
            return response.text();
        })
        .then(data => {
            document.getElementById('text').value = data;
        });
};
