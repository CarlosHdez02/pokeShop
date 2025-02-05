import React from "react";
export type Theme = "light" | "dark";
export interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}
export declare const ThemeContext: React.Context<ThemeContextType | null>;
export declare const ThemeProvider: React.FC<{
    children: React.ReactNode;
}>;
//# sourceMappingURL=ThemeProvider.d.ts.map