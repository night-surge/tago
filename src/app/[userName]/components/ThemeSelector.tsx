'use client';

import { useState } from 'react';

interface ThemeSelectorProps {
  currentTheme: number;
  updateTheme: (userName: string, theme: number) => Promise<void>;
  userName: string;
}

const THEMES = [
  { id: 1, name: 'Candy Floss', description: 'Dreamy pastels with candy accents' },
  { id: 2, name: 'Glassmorphic', description: 'Elegant glass-like minimalist design aesthetic' },
  { id: 3, name: 'SoftScape', description: 'Gentle gradients with pastel accents' },
  { id: 4, name: 'Glow Links', description: 'Beautiful personal links in pink' },
  { id: 5, name: 'AuroraFlow', description: 'Flowing colors in cosmic space' },
  { id: 6, name: 'Minimal', description: 'Simple and focused' },
  { id: 7, name: 'Dark Crystal', description: 'Frosted glass with ethereal glow' },
  { id: 8, name: 'Obsidian', description: 'Sharp black with white accents' },
  { id: 9, name: 'Morning Mist', description: 'Light airy pastels and gradients' },
];

export default function ThemeSelector({ currentTheme, updateTheme, userName }: ThemeSelectorProps) {
  const [loading, setLoading] = useState<number | null>(null);

  const handleThemeChange = async (themeId: number) => {
    try {
      setLoading(themeId);
      await updateTheme(userName, themeId);
    } catch (error) {
      console.error('Failed to update theme:', error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {THEMES.map((theme) => (
        <div
          key={theme.id}
          onClick={() => handleThemeChange(theme.id)}
          className={`p-4 rounded-lg border transition-all cursor-pointer ${
            currentTheme === theme.id
              ? 'border-white bg-zinc-900'
              : 'border-zinc-800 hover:border-zinc-600'
          }`}
        >
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-white">{theme.name}</h3>
            {loading === theme.id && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
          </div>
          <p className="text-sm text-zinc-400 mt-1">{theme.description}</p>
        </div>
      ))}
    </div>
  );
}