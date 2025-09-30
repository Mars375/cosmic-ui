import './globals.css';
import Link from 'next/link';
import { Topbar } from '../../../packages/ui/src/components/topbar';
import { ThemeSwitcher } from './components/theme-switcher';

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
              {/* <Link
                href="/docs"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Docs
              </Link> */}
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
