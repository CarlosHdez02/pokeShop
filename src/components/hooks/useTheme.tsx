// In useTheme.ts
import React from "react";
import { ThemeContext } from "../../context/ThemeProvider";
export const useTheme = () => {
    const context = React.useContext(ThemeContext);
    if (context === null) {
        console.error('Theme context is null');
        throw new Error('useTheme must be used within theme provider')
    }
    return context;
};