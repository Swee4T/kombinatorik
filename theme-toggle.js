document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.theme-toggle');
    const icon = toggle.querySelector('.theme-toggle__icon i');
    const text = toggle.querySelector('.theme-toggle__text');
    
    // Funktion zum Aktualisieren der UI
    const updateThemeUI = (isLight) => {
        // Theme Class
        document.body.classList.toggle('light-mode', isLight);
        
        // Icon
        icon.classList.remove(isLight ? 'fa-moon' : 'fa-sun');
        icon.classList.add(isLight ? 'fa-sun' : 'fa-moon');
        
        // Text
        text.textContent = isLight ? 'Light Mode' : 'Dark Mode';
        
        // Speichern der Einstellung
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    };
    
    // Initial Theme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const initialIsLight = savedTheme 
        ? savedTheme === 'light'
        : !prefersDark.matches;
    
    updateThemeUI(initialIsLight);
    
    // Click Handler
    toggle.addEventListener('click', () => {
        const isLight = !document.body.classList.contains('light-mode');
        updateThemeUI(isLight);
    });
    
    // System Theme Change Handler
    prefersDark.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            updateThemeUI(!e.matches);
        }
    });
});