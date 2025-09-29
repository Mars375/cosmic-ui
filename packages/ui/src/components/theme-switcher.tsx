'use client';

import * as React from 'react';
import { twMerge } from 'tailwind-merge';
import { Button } from './button';

export type Theme = 'light' | 'dark' | 'system';

export interface ThemeSwitcherProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
  className?: string;
  variant?: 'button' | 'dropdown' | 'toggle';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function ThemeSwitcher({
  currentTheme,
  onThemeChange,
  className,
  variant = 'button',
  size = 'md',
  showLabel = true,
}: ThemeSwitcherProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const themes = [
    {
      id: 'light' as Theme,
      label: 'Clair',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
    },
    {
      id: 'dark' as Theme,
      label: 'Sombre',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      ),
    },
    {
      id: 'system' as Theme,
      label: 'Système',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
  ];

  const currentThemeData = themes.find((t) => t.id === currentTheme);

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-2 py-1 text-xs';
      case 'lg':
        return 'px-4 py-3 text-base';
      default:
        return 'px-3 py-2 text-sm';
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'sm':
        return 'w-3 h-3';
      case 'lg':
        return 'w-5 h-5';
      default:
        return 'w-4 h-4';
    }
  };

  if (variant === 'toggle') {
    return (
      <div className={twMerge('flex items-center space-x-2', className)}>
        {showLabel && <span className="text-sm text-white/70">Thème:</span>}
        <div className="flex bg-cosmic-border rounded-lg p-1">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => onThemeChange(theme.id)}
              className={twMerge(
                'flex items-center space-x-2 rounded-md px-3 py-1 text-sm transition-colors',
                currentTheme === theme.id
                  ? 'bg-cosmic-primary text-white'
                  : 'text-white/70 hover:text-white hover:bg-cosmic-surface/50',
              )}
            >
              <span className={getIconSize()}>{theme.icon}</span>
              {showLabel && <span>{theme.label}</span>}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'dropdown') {
    return (
      <div className={twMerge('relative', className)}>
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className={twMerge('flex items-center space-x-2', getSizeClasses())}
        >
          <span className={getIconSize()}>{currentThemeData?.icon}</span>
          {showLabel && <span>{currentThemeData?.label}</span>}
          <svg
            className={twMerge('transition-transform', isOpen ? 'rotate-180' : '', getIconSize())}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </Button>

        {isOpen && (
          <>
            {/* Backdrop */}
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

            {/* Dropdown */}
            <div className="absolute right-0 top-full mt-2 w-48 bg-cosmic-surface border border-cosmic-border rounded-lg shadow-xl z-50">
              <div className="p-2">
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => {
                      onThemeChange(theme.id);
                      setIsOpen(false);
                    }}
                    className={twMerge(
                      'w-full flex items-center space-x-3 px-3 py-2 text-sm rounded-md transition-colors',
                      currentTheme === theme.id
                        ? 'bg-cosmic-primary text-white'
                        : 'text-white/70 hover:text-white hover:bg-cosmic-border/50',
                    )}
                  >
                    <span className={getIconSize()}>{theme.icon}</span>
                    <span>{theme.label}</span>
                    {currentTheme === theme.id && (
                      <svg
                        className="w-4 h-4 ml-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  // Default button variant
  return (
    <div className={twMerge('flex items-center space-x-2', className)}>
      {showLabel && <span className="text-sm text-white/70">Thème:</span>}
      <Button
        variant="outline"
        onClick={() => {
          const currentIndex = themes.findIndex((t) => t.id === currentTheme);
          const nextIndex = (currentIndex + 1) % themes.length;
          onThemeChange(themes[nextIndex].id);
        }}
        className={twMerge('flex items-center space-x-2', getSizeClasses())}
      >
        <span className={getIconSize()}>{currentThemeData?.icon}</span>
        {showLabel && <span>{currentThemeData?.label}</span>}
      </Button>
    </div>
  );
}

// Hook for theme management
export function useTheme() {
  const [theme, setTheme] = React.useState<Theme>('system');

  // Initialize theme from localStorage or system preference
  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      setTheme(savedTheme);
    } else {
      // Detect system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  // Apply theme to document
  React.useEffect(() => {
    const root = document.documentElement;

    if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('dark', prefersDark);
    } else {
      root.classList.toggle('dark', theme === 'dark');
    }

    localStorage.setItem('theme', theme);
  }, [theme]);

  // Listen for system theme changes
  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
      if (theme === 'system') {
        const root = document.documentElement;
        root.classList.toggle('dark', mediaQuery.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return {
    theme,
    changeTheme,
    isDark:
      theme === 'dark' ||
      (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches),
  };
}

// Theme provider component
export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'theme',
}: ThemeProviderProps) {
  const [theme, setTheme] = React.useState<Theme>(defaultTheme);

  React.useEffect(() => {
    const savedTheme = localStorage.getItem(storageKey) as Theme;
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      setTheme(savedTheme);
    }
  }, [storageKey]);

  React.useEffect(() => {
    const root = document.documentElement;

    if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('dark', prefersDark);
    } else {
      root.classList.toggle('dark', theme === 'dark');
    }

    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey]);

  const value = {
    theme,
    setTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// Context for theme
const ThemeContext = React.createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
}>({
  theme: 'system',
  setTheme: () => {},
});

// Hook to use theme context
export function useThemeContext() {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
}
