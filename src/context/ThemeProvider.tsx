import React from "react";

export type Theme = "light" | "dark";

export interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void; // Fixed naming to match function
}

export const ThemeContext = React.createContext<ThemeContextType | null>(null);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = React.useState<Theme>("light");

    React.useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as Theme | null;
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

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
