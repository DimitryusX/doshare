import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'auto';

const THEME_STORAGE_KEY = 'doshare-theme';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    // Get from localStorage or default to 'auto'
    const stored = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
    return stored || 'auto';
  });

  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(() => {
    if (theme === 'auto') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return theme;
  });

  useEffect(() => {
    // Save to localStorage
    localStorage.setItem(THEME_STORAGE_KEY, theme);

    // Resolve theme based on preference
    let resolved: 'light' | 'dark';
    if (theme === 'auto') {
      resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } else {
      resolved = theme;
    }

    setResolvedTheme(resolved);

    // Apply theme class to html element
    const html = document.documentElement;
    if (resolved === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }

    // Listen for system theme changes when in auto mode
    if (theme === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        const newResolved = e.matches ? 'dark' : 'light';
        setResolvedTheme(newResolved);
        if (newResolved === 'dark') {
          html.classList.add('dark');
        } else {
          html.classList.remove('dark');
        }
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  return { theme, resolvedTheme, setTheme };
}

