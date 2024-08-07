document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    themeToggle.addEventListener('click', () => {
        console.log('Theme-Toggle wurde geklickt');
        body.classList.toggle('light-mode');
        if (body.classList.contains('light-mode')) {
            themeToggle.textContent = 'Dark Mode';
        } else {
            themeToggle.textContent = 'Light Mode';
        }
    });
});