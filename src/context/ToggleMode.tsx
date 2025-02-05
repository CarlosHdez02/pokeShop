import React from "react";

type ThemeContextType = "light" | 'dark';

export const ThemeContext = React.createContext<ThemeContextType>('light');