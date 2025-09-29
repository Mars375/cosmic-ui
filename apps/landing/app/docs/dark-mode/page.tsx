export default function DarkModePage() {
  return (
    <>
      <h1>Dark Mode</h1>
      
      <p>
        Configuration et utilisation du mode sombre avec CosmicUI. Découvrez comment 
        implémenter un basculement fluide entre les modes clair et sombre.
      </p>

      <h2>Méthodes d'implémentation</h2>

      <h3>1. Classe CSS manuelle</h3>
      
      <p>
        La méthode la plus simple est d'ajouter/supprimer la classe <code>dark</code> :
      </p>
      
      <pre><code>{`// Basculement manuel
const toggleDarkMode = () => {
  document.documentElement.classList.toggle('dark');
};

// Basé sur les préférences système
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
if (prefersDark.matches) {
  document.documentElement.classList.add('dark');
}`}</code></pre>

      <h3>2. Hook React avec localStorage</h3>
      
      <pre><code>{`'use client';

import { useState, useEffect } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system';
    if (savedTheme) setTheme(savedTheme);
  }, []);
  
  const toggleTheme = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', prefersDark);
    } else {
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
    }
  };
  
  return { theme, toggleTheme };
}`}</code></pre>

      <h3>3. Provider complet avec Next.js</h3>
      
      <pre><code>{`'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type ThemeDataset = 'light' | 'dark' | 'system';

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeDataset;
  storageKey?: string;
}

interface ThemeProviderState {
  theme: ThemeDataset;
  setTheme: (theme: ThemeDataset) => void;
}

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'cosmic-ui-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeDataset>(defaultTheme);

  useEffect(() => {
    const root = window.document.documentElement;
    const storedTheme = localStorage.getItem(storageKey) as ThemeDataset;
    
    if (storedTheme) {
      setTheme(storedTheme);
    } else if (defaultTheme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setTheme('system');
      root.classList.toggle('dark', systemTheme === 'dark');
    }
  }, [defaultTheme, storageKey]);

  useEffect(() => {
    const root = window.document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const updateTheme = () => {
      if (theme === 'system') {
        root.classList.toggle('dark', mediaQuery.matches);
      } else {
        root.classList.toggle('dark', theme === 'dark');
      }
    };
    
    updateTheme();
    
    // Listen for system theme changes
    mediaQuery.addEventListener('change', updateTheme);
    return () => mediaQuery.removeEventListener('change', updateTheme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: ThemeDataset) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};`}</code></pre>

      <h2>Composant Theme Toggle</h2>
      
      <pre><code>{`'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      <Sun className="h-4 w-4" />
      <button
        role="switch"
        aria-checked={theme === 'dark'}
        aria-label="Basculer le mode sombre"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className="relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-gray-200 dark:bg-gray-700"
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
      <Moon className="h-4 w-4" />
    </div>
  );
}`}</code></pre>

      <h2>Intégration avec Next.js</h2>

      <h3>Layout App Router</h3>
      
      <pre><code>{`// app/layout.tsx
import { ThemeProvider } from '@/components/theme-provider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}`}</code></pre>

      <h3>Configuration page-level</h3>
      
      <pre><code>{`'use client';

import { ThemeProvider } from '@/components/theme-provider';
import { ThemeToggle } from '@/components/theme-toggle';

export default function HomePage() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <header className="flex justify-between items-center p-4">
          <h1>Mon App</h1>
          <ThemeToggle />
        </header>
        <main>
          {/* Contenu de votre app */}
        </main>
      </div>
    </ThemeProvider>
  );
}`}</code></pre>

      <h2>Prévention des flashs</h2>

      <h3>suppressHydrationWarning</h3>
      
      <p>
        Ajoutez <code>suppressHydrationWarning</code> sur votre élément HTML :
      </p>
      
      <pre><code>{`<html lang="fr" suppressHydrationWarning>
  <body>{children}</body>
</html>`}</code></pre>

      <h3>Script inline pour la synchronisation</h3>
      
      <pre><code>{`// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: \`
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else if (theme === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    document.documentElement.classList.toggle('dark', prefersDark);
                  }
                } catch (e) {}
              })();
            \`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}`}</code></pre>

      <h2>Tests et débuggage</h2>

      <h3>Configuration dev tools</h3>
      
      <pre><code>{`// Détecter les problèmes de hydration
if (typeof window !== 'undefined') {
  console.log('Current theme:', 
    document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  );
}`}</code></pre>

      <h3>Forcer le dark mode en dev</h3>
      
      <pre><code>{`// En développement uniquement
if (process.env.NODE_ENV === 'development') {
  document.documentElement.classList.add('dark');
}`}</code></pre>

      <div className="bg-gray-50 dark:bg-gray-900/20 border border-gray-200 dark:border-gray-800 rounded-lg p-4 mt-6">
        <h3 className="text-gray-800 dark:text-gray-200 font-semibold">💡 Tips</h3>
        <ul className="text-gray-700 dark:text-gray-300 mt-1 space-y-1">
          <li>• Toujours tester les deux modes pendant le développement</li>
          <li>• Prévoir un mode <code>system</code> pour respecter les préférences utilisateur</li>
          <li>• Utiliser <code>suppressHydrationWarning</code> pour éviter les erreurs Next.js</li>
          <li>• Persister le choix utilisateur dans localStorage</li>
        </ul>
      </div>
    </>
  );
}
