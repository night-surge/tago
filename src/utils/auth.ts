// types/theme.ts

export type ThemeNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface ButtonTheme {
  border: string;
  background: string;
  hover: string;
  text: string;
}

export const buttonThemes: Record<ThemeNumber, ButtonTheme> = {
  1: {
    border: 'border-purple-500/20',
    background: 'bg-purple-500/10',
    hover: 'hover:bg-purple-500/20',
    text: 'text-purple-500'
  },
  2: {
    border: 'border-blue-500/20',
    background: 'bg-blue-500/10',
    hover: 'hover:bg-blue-500/20',
    text: 'text-blue-500'
  },
  3: {
    border: 'border-green-500/20',
    background: 'bg-green-500/10',
    hover: 'hover:bg-green-500/20',
    text: 'text-green-500'
  },
  4: {
    border: 'border-yellow-500/20',
    background: 'bg-yellow-500/10',
    hover: 'hover:bg-yellow-500/20',
    text: 'text-yellow-500'
  },
  5: {
    border: 'border-red-500/20',
    background: 'bg-red-500/10',
    hover: 'hover:bg-red-500/20',
    text: 'text-red-500'
  },
  6: {
    border: 'border-pink-500/20',
    background: 'bg-pink-500/10',
    hover: 'hover:bg-pink-500/20',
    text: 'text-pink-500'
  },
  7: {
    border: 'border-indigo-500/20',
    background: 'bg-indigo-500/10',
    hover: 'hover:bg-indigo-500/20',
    text: 'text-indigo-500'
  },
  8: {
    border: 'border-gray-500/20',
    background: 'bg-gray-500/10',
    hover: 'hover:bg-gray-500/20',
    text: 'text-gray-500'
  },
  9: {
    border: 'border-teal-500/20',
    background: 'bg-teal-500/10',
    hover: 'hover:bg-teal-500/20',
    text: 'text-teal-500'
  }
};

// Helper function to get theme classes
export const getButtonTheme = (themeNumber: ThemeNumber): string => {
  const theme = buttonThemes[themeNumber];
  return `${theme.border} ${theme.background} ${theme.hover} ${theme.text}`;
};