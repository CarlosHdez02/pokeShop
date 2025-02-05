import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
export const ThemeContext = React.createContext(null);
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = React.useState("light");
    React.useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, []);
    React.useEffect(() => {
        localStorage.setItem("theme", theme);
        document.body.setAttribute("data-theme", theme);
    }, [theme]);
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };
    return (_jsx(ThemeContext.Provider, { value: { theme, toggleTheme }, children: children }));
};
