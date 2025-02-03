import React from "react";

type ThemeContextType = "light" | 'dark';

const ThemeContext = React.createContext<ThemeContextType>('light');