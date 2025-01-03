document.querySelectorAll('[copy]').forEach(function (element) {
    element.addEventListener('click', function () {
        navigator.clipboard.writeText(this.getAttribute('copy'));
    });
});