'use client';

import * as React from 'react';
import { createContext, useContext } from 'react';

interface ThemeConfig {
  // Couleurs personnalisées qui overrident les tokens par défaut
  colors?: {
    primary?: string;
    secondary?: string;
    accent?: string;
    destructive?: string;
    muted?: string;
    card?: string;
    popover?: string;
    background?: string;
    foreground?: string;
    border?: string;
    input?: string;
    ring?: string;
  };
  // Mode sombre
  darkMode?: boolean;
  // Préfixe CSS pour les variables personnalisées
  cssPrefix?: string;
}

interface ThemeContextValue {
  config: ThemeConfig;
  updateTheme: (newConfig: Partial<ThemeConfig>) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export interface CosmicThemeProviderProps {
  children: React.ReactNode;
  defaultConfig?: ThemeConfig;
  storageKey?: string;
}

export function CosmicThemeProvider({
  children,
  defaultConfig = {},
  storageKey = 'cosmic-ui-theme',
}: CosmicThemeProviderProps) {
  const [config, setConfig] = React.useState<ThemeConfig>(defaultConfig);

  // Charger la configuration depuis le localStorage
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsedConfig = JSON.parse(stored);
        setConfig((prev) => ({ ...prev, ...parsedConfig }));
      }
    } catch (error) {
      console.warn('Failed to load theme config from localStorage:', error);
    }
  }, [storageKey]);

  // Sauvegarder la configuration dans le localStorage
  React.useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(config));
    } catch (error) {
      console.warn('Failed to save theme config to localStorage:', error);
    }
  }, [config, storageKey]);

  // Appliquer les variables CSS personnalisées
  React.useEffect(() => {
    const root = document.documentElement;
    const prefix = config.cssPrefix || '--';

    if (config.colors) {
      Object.entries(config.colors).forEach(([key, value]) => {
        if (value) {
          root.style.setProperty(`${prefix}${key}`, value);
        }
      });
    }

    // Gérer le mode sombre
    if (config.darkMode !== undefined) {
      if (config.darkMode) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, [config]);

  const updateTheme = React.useCallback((newConfig: Partial<ThemeConfig>) => {
    setConfig((prev) => ({
      ...prev,
      ...newConfig,
      colors: { ...prev.colors, ...newConfig.colors },
    }));
  }, []);

  const value = React.useMemo(
    () => ({
      config,
      updateTheme,
    }),
    [config, updateTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useCosmicTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useCosmicTheme must be used within a CosmicThemeProvider');
  }
  return context;
}

// Hook pour appliquer automatiquement les couleurs par défaut
export function useDefaultStyles(
  componentType: 'card' | 'surface' | 'muted' | 'primary' | 'secondary' | 'accent',
) {
  const { config } = useCosmicTheme();

  const getDefaultClasses = React.useCallback(() => {
    const baseClasses = {
      card: 'bg-card text-card-foreground border border-border',
      surface: 'bg-background text-foreground',
      muted: 'bg-muted text-muted-foreground',
      primary: 'bg-primary text-primary-foreground',
      secondary: 'bg-secondary text-secondary-foreground',
      accent: 'bg-accent text-accent-foreground',
    };

    return baseClasses[componentType];
  }, [componentType]);

  return getDefaultClasses();
}
