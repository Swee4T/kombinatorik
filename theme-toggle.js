document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    themeToggle.addEventListener('click', () => {
        console.log('Theme-Toggle wurde geklickt');
        body.classList.toggle('light-mode');
        if (body.classList.contains('light-mode')) {
            themeToggle.textContent = 'Dark Mode';
            localStorage.setItem('theme', 'light');
        } else {
            themeToggle.textContent = 'Light Mode';
            localStorage.setItem('theme', 'dark');
        }
    });

    function applyTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.classList.add('light-mode');
        } else {
            body.classList.remove('light-mode');
        }
    }

    applyTheme();
});