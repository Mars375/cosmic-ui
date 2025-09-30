'use client';

import * as React from 'react';

export function ThemeSwitcher() {
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

