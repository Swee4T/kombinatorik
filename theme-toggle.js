document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Anwenden des gespeicherten Themes
    applyTheme();

    themeToggle.addEventListener('click', () => {
        toggleTheme();
    });

    function toggleTheme() {
        if (body.classList.contains('light-mode')) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }

    function setTheme(theme) {
        if (theme === 'light') {
            body.classList.add('light-mode');
            themeToggle.textContent = 'Dark Mode';
        } else {
            body.classList.remove('light-mode');
            themeToggle.textContent = 'Light Mode';
        }
        localStorage.setItem('theme', theme);
    }

    function applyTheme() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);
    }
});