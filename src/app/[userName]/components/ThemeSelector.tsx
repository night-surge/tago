'use client';

import { useState } from 'react';

interface ThemeSelectorProps {
  currentTheme: number;
  updateTheme: (userName: string, theme: number) => Promise<void>;
  userName: string;
}

const THEMES = [
  { id: 1, name: 'Classic', description: 'Clean and minimal design' },
  { id: 2, name: 'Modern', description: 'Sleek and contemporary' },
  { id: 3, name: 'Bold', description: 'High contrast and impactful' },
  { id: 4, name: 'Elegant', description: 'Sophisticated and refined' },
  { id: 5, name: 'Vibrant', description: 'Colorful and energetic' },
  { id: 6, name: 'Minimal', description: 'Simple and focused' },
  { id: 7, name: 'Dark', description: 'Dark mode optimized' },
  { id: 8, name: 'Light', description: 'Bright and airy' },
  { id: 9, name: 'Professional', description: 'Business-focused design' },
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