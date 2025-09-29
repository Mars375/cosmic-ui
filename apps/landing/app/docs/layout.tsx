'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  href: string;
  label: string;
}

interface NavSection {
  label: string;
  items: NavItem[];
}

interface PrevNextProps {
  currentPath: string;
}

function PrevNext({ currentPath }: PrevNextProps) {
  // Flatten all navigation items
  const allItems = docsNavigation.flatMap(section => section.items);

  // Find current index
  const currentIndex = allItems.findIndex(item => item.href === currentPath);

  // Get previous and next items
  const prevItem = currentIndex > 0 ? allItems[currentIndex - 1] : null;
  const nextItem =
    currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null;

  if (!prevItem && !nextItem) {
    return null;
  }

  return (
    <div className="flex items-center justify-between border-t border-border/50 pt-6 mt-8">
      <div className="flex-1">
        {prevItem ? (
          <Link
            href={prevItem.href}
            className="group flex items-center gap-2 text-muted-foreground/70 hover:text-muted-foreground transition-colors"
          >
            <svg
              className="h-3 w-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <div>
              <div className="text-xs text-muted-foreground/60">Précédent</div>
              <div className="text-sm font-normal">{prevItem.label}</div>
            </div>
          </Link>
        ) : (
          <div></div>
        )}
      </div>

      <div className="flex-1 flex justify-end">
        {nextItem ? (
          <Link
            href={nextItem.href}
            className="group flex items-center gap-2 text-muted-foreground/70 hover:text-muted-foreground transition-colors"
          >
            <div className="text-right">
              <div className="text-xs text-muted-foreground/60">Suivant</div>
              <div className="text-sm font-normal">{nextItem.label}</div>
            </div>
            <svg
              className="h-3 w-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

const docsNavigation: NavSection[] = [
  {
    label: 'Installation',
    items: [
      { href: '/docs', label: 'Introduction' },
      { href: '/docs/installation', label: 'Installation' },
      { href: '/docs/tailwind-config', label: 'Configuration Tailwind' },
      { href: '/docs/nextjs-setup', label: 'Setup Next.js' },
    ],
  },
  {
    label: 'Configuration',
    items: [
      { href: '/docs/theming', label: 'Theming' },
      { href: '/docs/dark-mode', label: 'Dark Mode' },
      { href: '/docs/customization', label: 'Personnalisation' },
      { href: '/docs/colors', label: 'Système de couleurs' },
    ],
  },
  {
    label: 'Composants',
    items: [
      { href: '/docs/components/accordion', label: 'Accordion' },
      { href: '/docs/components/alert', label: 'Alert' },
      { href: '/docs/components/avatar', label: 'Avatar' },
      { href: '/docs/components/badge', label: 'Badge' },
      { href: '/docs/components/button', label: 'Button' },
      {
        href: '/docs/components/calendar-date-picker',
        label: 'CalendarDatePicker',
      },
      { href: '/docs/components/card', label: 'Card' },
      { href: '/docs/components/chat-widget', label: 'ChatWidget' },
      { href: '/docs/components/input', label: 'Input' },
      { href: '/docs/components/kpi-card', label: 'KpiCard' },
      { href: '/docs/components/line-chart', label: 'LineChart' },
      { href: '/docs/components/navigation-menu', label: 'NavigationMenu' },
      { href: '/docs/components/pagination', label: 'Pagination' },
      { href: '/docs/components/pie-chart', label: 'PieChart' },
      { href: '/docs/components/select', label: 'Select' },
      { href: '/docs/components/sidebar', label: 'Sidebar' },
      { href: '/docs/components/switch', label: 'Switch' },
      { href: '/docs/components/table', label: 'Table' },
      { href: '/docs/components/topbar', label: 'Topbar' },
    ],
  },
];

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <div className="container mx-auto grid grid-cols-12 gap-8 px-4 py-10">
      <aside className="col-span-12 md:col-span-3">
        <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-hide">
          <nav className="space-y-6">
            {docsNavigation.map(section => (
              <div key={section.label}>
                <div className="mb-3 text-xs font-semibold uppercase text-foreground">
                  {section.label}
                </div>
                <div className="space-y-1 text-sm">
                  {section.items.map(item => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`block rounded px-3 py-2 transition-colors ${
                        isActive(item.href)
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </aside>
      <main className="col-span-12 md:col-span-9">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          {children}
          <PrevNext currentPath={pathname} />
        </div>
      </main>
    </div>
  );
}
