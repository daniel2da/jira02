import {useTheme} from "../../contexts/ThemeContext";

function ThemeToggle() {
    const { isDark, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            style={{
                background: 'transparent',
                border: '1px solid var(--border-color)',
                borderRadius: '20px',
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
            }}
        >
            {isDark ? '🌙' : '☀️'}
            {isDark ? 'Тёмная' : 'Светлая'}
        </button>
    );
}

export default ThemeToggle;