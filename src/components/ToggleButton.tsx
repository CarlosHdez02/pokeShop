import { useTheme } from "../hooks/useTheme";


export const ThemeToggleButton = () => {
    const { theme, toggleTheme } = useTheme();
    
    return (
        <button onClick={toggleTheme} className="theme-toggle-btn">
            {theme === "light" ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
    );
};
