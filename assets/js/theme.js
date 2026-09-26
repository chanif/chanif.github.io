/**
 * ============================================================
 * Fanani Portfolio & Learning Platform — Theme Manager
 * Supports Light & Dark Mode with LocalStorage & OS Preference
 * ============================================================
 */

(function () {
    // 1. Immediately apply theme before DOM render to prevent FOUC (Flash of Unstyled Content)
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    // 2. Global Toggle Function
    window.toggleTheme = function () {
        const isDark = document.documentElement.classList.toggle('dark');
        const theme = isDark ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
        updateThemeToggleIcons(isDark);
    };

    function updateThemeToggleIcons(isDark) {
        document.querySelectorAll('.theme-toggle-icon').forEach(el => {
            el.innerHTML = isDark ? '☀️' : '🌙';
        });
        document.querySelectorAll('.theme-toggle-label').forEach(el => {
            el.innerText = isDark ? 'Mode Terang' : 'Mode Gelap';
        });
    }

    // 3. Sync icons when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        const isDark = document.documentElement.classList.contains('dark');
        updateThemeToggleIcons(isDark);
    });

    // 4. Listen for system OS color scheme changes (if user hasn't explicitly chosen)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                document.documentElement.classList.add('dark');
                updateThemeToggleIcons(true);
            } else {
                document.documentElement.classList.remove('dark');
                updateThemeToggleIcons(false);
            }
        }
    });
})();
