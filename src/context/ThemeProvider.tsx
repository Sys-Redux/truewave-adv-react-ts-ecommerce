import { type ReactNode, useEffect, useState } from 'react';
import { type Theme, ThemeContext } from './ThemeContext';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    // Check local storage or default to dark (best theme)
    const [theme, setTheme] = useState<Theme>(() => {
        const saved = localStorage.getItem('truewave-theme') as Theme;
        return saved || 'dark';
    });

    useEffect(() => {
        // Save theme choice to local storage
        localStorage.setItem('truewave-theme', theme);

        // Apply theme to document
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };


    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};