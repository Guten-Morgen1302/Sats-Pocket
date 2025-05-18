import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type ThemeType = 'dark' | 'light' | 'sepia';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  nextTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeType>('dark');
  
  // Apply theme on initial load and state changes
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const applyTheme = (newTheme: ThemeType) => {
    // Set body styles based on theme
    document.body.classList.remove('dark', 'light', 'sepia');
    document.body.classList.add(newTheme);
    
    // Set theme-specific body styles
    if (newTheme === 'dark') {
      document.body.style.backgroundColor = '#121212';
      document.body.style.color = '#F8F9FA';
    } else if (newTheme === 'light') {
      document.body.style.backgroundColor = '#F8F9FA';
      document.body.style.color = '#121212';
    } else if (newTheme === 'sepia') {
      document.body.style.backgroundColor = '#F5E8C8';
      document.body.style.color = '#3E2D14';
    }
  };

  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
  };

  const nextTheme = () => {
    switch (theme) {
      case 'dark':
        setTheme('light');
        break;
      case 'light':
        setTheme('sepia');
        break;
      case 'sepia':
        setTheme('dark');
        break;
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, nextTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  
  // For debugging purposes, return a default context if not wrapped in provider
  if (context === undefined) {
    console.warn('useTheme was called outside of ThemeProvider, returning default values');
    return {
      theme: 'dark' as const,
      setTheme: () => {},
      nextTheme: () => {}
    };
  }
  
  return context;
}
