'use client';

import './globals.css';
import Link from 'next/link';
import { Topbar } from '../../../packages/ui/src/components/topbar';
import * as React from 'react';

function ThemeSwitcher() {
  const [dark, setDark] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  const apply = (isDark: boolean) => {
    setDark(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  React.useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('theme');
    const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches;
    apply(saved ? saved === 'dark' : prefers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!mounted) {
    return (
      <div
        className="h-7 w-14 rounded-full border border-input bg-background"
        aria-hidden
      />
    );
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label="Basculer le thème"
      onClick={() => apply(!dark)}
      className={`relative inline-flex h-7 w-14 items-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
        dark ? 'bg-primary/20 border-primary/40' : 'bg-muted border-input'
      }`}
    >
      {/* Icône soleil */}
      <span className="pointer-events-none absolute left-1.5 h-4 w-4 text-amber-500">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 18a6 6 0 100-12 6 6 0 000 12zM12 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm0 18a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm10-9a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM4 12a1 1 0 01-1 1H2a1 1 0 110-2h1a1 1 0 011 1zm13.657-6.657a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414zM6.636 17.364a1 1 0 011.415 0l.707.707a1 1 0 01-1.415 1.415l-.707-.707a1 1 0 010-1.415zm12.728 0a1 1 0 010 1.415l-.707.707a1 1 0 11-1.414-1.415l.707-.707a1 1 0 011.414 0zM6.343 4.343a1 1 0 010 1.414l-.707.707A1 1 0 114.222 5.05l.707-.707a1 1 0 011.414 0z" />
        </svg>
      </span>
      {/* Icône lune */}
      <span className="pointer-events-none absolute right-1.5 h-4 w-4 text-indigo-500">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
        </svg>
      </span>
      {/* Poignée */}
      <span
        className={`absolute left-1 h-5 w-5 transform rounded-full bg-background-opposite shadow-md transition-transform ${
          dark ? 'translate-x-7' : 'translate-x-0'
        }`}
      />
    </button>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Topbar
          className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mx-auto px-4"
          logo={
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="text-lg font-semibold tracking-tight text-foreground hover:text-primary"
              >
                CosmicUI
              </Link>
              <Link
                href="/docs"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Docs
              </Link>
            </div>
          }
          actions={
            <div className="flex items-center gap-4">
              <div className="relative hidden sm:block">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="w-64 rounded-md border border-input bg-background px-8 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
                <svg
                  className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <ThemeSwitcher />
            </div>
          }
        />
        {children}
      </body>
    </html>
  );
}

