export interface ThemeProps {
    user: {
      name: string;
      tagline: string;
      links: string[];
      picture: string;
    };
    handlers: {
      handleAddLink: (userName: string) => Promise<void>;
      handleThemeChange: (userName: string, newTheme: number) => Promise<void>;
    };
    userName: string;
    currentTheme: number;
  }