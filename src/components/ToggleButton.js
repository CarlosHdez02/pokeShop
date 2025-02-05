import { jsx as _jsx } from "react/jsx-runtime";
import { useTheme } from "../hooks/useTheme";
export const ThemeToggleButton = () => {
    const { theme, toggleTheme } = useTheme();
    return (_jsx("button", { onClick: toggleTheme, className: "theme-toggle-btn", children: theme === "light" ? "🌞 Light Mode" : "🌙 Dark Mode" }));
};
