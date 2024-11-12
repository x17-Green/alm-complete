// src /components/ThemeToggle.tsx
import React from 'react';
import { useThemeContext } from '../context/ThemeContext';

const ThemeToggle: React.FC = () => {
    const { isDarkMode, toggleTheme } = useThemeContext();

    return (
        <button onClick={toggleTheme} style={{ margin: '10px', padding: '10px' }}>
            Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
        </button>
    );
};

export default ThemeToggle;
