'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { themeStyles } from '@/types/theme';

interface ThemeSelectorProps {
  currentTheme: number;
  updateTheme: (userName: string, theme: number) => Promise<void>;
  userName: string;
}

export default function ThemeSelector({
  currentTheme,
  updateTheme,
  userName,
}: ThemeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const styles = themeStyles[currentTheme];

  async function handleThemeChange(theme: number) {
    setIsLoading(true);
    try {
      await updateTheme(userName, theme);
      router.refresh();
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  }

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading}
        className={`${styles.buttonSecondary} px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300`}
      >
        Theme {currentTheme}
      </button>

      {isOpen && (
  <div className={`${styles.dropdown} fixed md:absolute left-0 right-0 md:right-auto md:left-auto top-full mt-2 w-full md:w-48 z-[9999]`}>
    <div className="py-1 bg-white shadow-lg rounded-lg mx-4 md:mx-0">
            {Array.from({ length: 9 }, (_, i) => i + 1).map((theme) => (
              <button
                key={theme}
                onClick={() => handleThemeChange(theme)}
                className={`${styles.dropdownItem} w-full text-left px-4 py-2 transition-colors duration-200`}
              >
                Theme {theme}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}