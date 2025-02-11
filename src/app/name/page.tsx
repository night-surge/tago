"use client"

import React, { useState } from 'react';
import LightMode  from '@/components/themes/LightMode';  // Updated import
import CandyMode  from '@/components/themes/CandyMode';  // Updated import

// Theme types
interface Theme {
  name: string;
  // Add other theme properties as needed
  styles?: Record<string, string>;  // Optional: for theme-specific styles
}

// Theme definitions
const lightTheme: Theme = {
  name: 'light',
  styles: {}  // Add your light theme styles here
};

// Props interface for LinksPageDemo
interface LinksPageDemoProps {
  theme: Theme;
}

// Update the import and add props interface
const LinksPageDemo: React.FC<LinksPageDemoProps> = ({ theme }) => {
  // Your LinksPageDemo implementation
  return <div>Links Page Demo with theme: {theme.name}</div>;
};

// Theme Selector Component
interface ThemeSelectorProps {
  onThemeChange: (theme: Theme) => void;
  currentTheme: Theme;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ onThemeChange, currentTheme }) => {
  const themes = [lightTheme, CandyMode];  // For now, just using lightTheme

  return (
    <div className="fixed top-4 right-4 z-50">
      <select
        value={currentTheme.name}
        onChange={(e) => {
          const selectedTheme = themes.find(theme => theme.name === e.target.value);
          if (selectedTheme) onThemeChange(selectedTheme);
        }}
        className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        {themes.map((theme) => (
          <option key={theme.name} value={theme.name}>
            {theme.name.charAt(0).toUpperCase() + theme.name.slice(1)} Theme
          </option>
        ))}
      </select>
    </div>
  );
};

// Main Page Component
const Home = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(lightTheme);

  return (
    <main>
      <ThemeSelector 
        currentTheme={currentTheme} 
        onThemeChange={setCurrentTheme} 
      />
      <LinksPageDemo theme={currentTheme} />
    </main>
  );
};

export default Home;