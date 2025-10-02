'use client';

import * as React from 'react';
import { useState } from 'react';
import { CodeBlock } from '../../../components/code-block';
import { Button } from 'cosmic-ui-mars';
import { NavigationMenu } from 'cosmic-ui-mars';
import { Home, Settings, User, Bell, ChevronDown } from 'lucide-react';

export default function NavigationMenuPage() {
  const navigationItems = [
    {
      id: 'home',
      label: 'Accueil',
      href: '/',
      icon: <Home className="w-4 h-4" />,
    },
    {
      id: 'profile',
      label: 'Profil',
      href: '/profile',
      icon: <User className="w-4 h-4" />,
    },
    {
      id: 'notifications',
      label: 'Notifications',
      href: '/notifications',
      icon: <Bell className="w-4 h-4" />,
      badge: '3',
    },
    {
      id: 'settings',
      label: 'Paramètres',
      href: '/settings',
      icon: <Settings className="w-4 h-4" />,
    },
  ];

  const navigationItemsWithDropdown = [
    {
      id: 'home',
      label: 'Accueil',
      href: '/',
      icon: <Home className="w-4 h-4" />,
    },
    {
      id: 'profile',
      label: 'Profil',
      href: '/profile',
      icon: <User className="w-4 h-4" />,
    },
    {
      id: 'notifications',
      label: 'Notifications',
      href: '/notifications',
      icon: <Bell className="w-4 h-4" />,
      badge: '3',
    },
    {
      id: 'settings',
      label: 'Paramètres',
      href: '/settings',
      icon: <Settings className="w-4 h-4" />,
      dropdown: [
        {
          id: 'account',
          label: 'Compte',
          href: '/settings/account',
        },
        {
          id: 'preferences',
          label: 'Préférences',
          href: '/settings/preferences',
        },
        {
          id: 'security',
          label: 'Sécurité',
          href: '/settings/security',
        },
      ],
    },
  ];

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Home className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">NavigationMenu</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Menu de navigation avec support des icônes, badges et menus déroulants.
        </p>
      </div>

      {/* Installation */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Installation</h2>
        <CodeBlock filePath="package.json">pnpm add cosmic-ui-mars</CodeBlock>
      </div>

      {/* Usage basique */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Usage basique</h2>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Exemple</h3>
            <div className="p-6 bg-muted/30 rounded-lg border">
              <NavigationMenu
                items={navigationItems}
                activeItem="home"
                onItemClick={(item) => console.log('Clicked:', item)}
              />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4 text-foreground">Code</h3>
            <CodeBlock language="typescript" filePath="components/NavigationMenuExample.tsx" showPackageManager={false}>
{`import { NavigationMenu } from 'cosmic-ui-mars';
import { Home, User, Bell, Settings } from 'lucide-react';

const navigationItems = [
  {
    id: 'home',
    label: 'Accueil',
    href: '/',
    icon: <Home className="w-4 h-4" />,
  },
  {
    id: 'profile',
    label: 'Profil',
    href: '/profile',
    icon: <User className="w-4 h-4" />,
  },
  {
    id: 'notifications',
    label: 'Notifications',
    href: '/notifications',
    icon: <Bell className="w-4 h-4" />,
    badge: '3',
  },
];

<NavigationMenu
  items={navigationItems}
  activeItem="home"
  onItemClick={(item) => console.log('Clicked:', item)}
/>`}
            </CodeBlock>
          </div>
        </div>
      </div>

      {/* Variants */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Variants</h2>
        <div className="space-y-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Menu avec dropdown</h3>
              <p className="text-muted-foreground">Menu avec éléments déroulants.</p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <NavigationMenu
                  items={navigationItemsWithDropdown}
                  activeItem="home"
                  onItemClick={(item) => console.log('Clicked:', item)}
                />
              </div>
            </div>
            <div>
              <CodeBlock language="typescript" filePath="components/DropdownNavigationMenu.tsx" showPackageManager={false}>
{`export default function App\docs\components\navigationMenu\page.tsxExample() {
  const navigationItemsWithDropdown = [
  {
    id: 'settings',
    label: 'Paramètres',
    href: '/settings',
    icon: <Settings className="w-4 h-4" />,
    dropdown: [
      {
        id: 'account',
        label: 'Compte',
        href: '/settings/account',
      },
      {
        id: 'preferences',
        label: 'Préférences',
        href: '/settings/preferences',
      },
    ],
  },
];

<NavigationMenu
  items={navigationItemsWithDropdown}
  activeItem="home"
  onItemClick={(item) => console.log('Clicked:', item)}
/>
}`}
              </CodeBlock>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Menu horizontal</h3>
              <p className="text-muted-foreground">Menu avec orientation horizontale.</p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <NavigationMenu
                  items={navigationItems}
                  activeItem="home"
                  onItemClick={(item) => console.log('Clicked:', item)}
                  orientation="horizontal"
                />
              </div>
            </div>
            <div>
              <CodeBlock language="typescript" filePath="components/HorizontalNavigationMenu.tsx" showPackageManager={false}>
{`export default function App\docs\components\navigationMenu\page.tsxExample() {
  <NavigationMenu
  items={navigationItems}
  activeItem="home"
  onItemClick={(item) => console.log('Clicked:', item)}
  orientation="horizontal"
/>
}`}
              </CodeBlock>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Menu compact</h3>
              <p className="text-muted-foreground">Menu avec style compact.</p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <NavigationMenu
                  items={navigationItems}
                  activeItem="home"
                  onItemClick={(item) => console.log('Clicked:', item)}
                  variant="compact"
                />
              </div>
            </div>
            <div>
              <CodeBlock language="typescript" filePath="components/CompactNavigationMenu.tsx" showPackageManager={false}>
{`export default function App\docs\components\navigationMenu\page.tsxExample() {
  <NavigationMenu
  items={navigationItems}
  activeItem="home"
  onItemClick={(item) => console.log('Clicked:', item)}
  variant="compact"
/>
}`}
              </CodeBlock>
            </div>
          </div>
        </div>
      </div>

      {/* Référence API */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Référence API</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-border rounded-lg">
            <thead>
              <tr className="bg-muted/50">
                <th className="border border-border px-4 py-3 text-left font-medium text-foreground">Prop</th>
                <th className="border border-border px-4 py-3 text-left font-medium text-foreground">Type</th>
                <th className="border border-border px-4 py-3 text-left font-medium text-foreground">Défaut</th>
                <th className="border border-border px-4 py-3 text-left font-medium text-foreground">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">items</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">NavigationItem[]</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">[]</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Éléments du menu</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">activeItem</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">string</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">-</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Élément actif</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">onItemClick</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">(item: NavigationItem) => void</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">-</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Callback lors du clic</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">orientation</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">'vertical' | 'horizontal'</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">'vertical'</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Orientation du menu</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">variant</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">'default' | 'compact'</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">'default'</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Style du menu</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Conseils d'utilisation */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <h3 className="text-blue-800 dark:text-blue-200 font-semibold mb-2">
          💡 Conseils d'utilisation
        </h3>
        <ul className="text-blue-700 dark:text-blue-300 space-y-1 text-sm">
          <li>• Utilisez des <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">icônes</code> pour identifier rapidement les éléments</li>
          <li>• Ajoutez des <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">badges</code> pour les notifications</li>
          <li>• Organisez les <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">menus déroulants</code> logiquement</li>
          <li>• Choisissez l'<code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">orientation</code> selon l'espace disponible</li>
          <li>• Respectez les <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">guidelines d'accessibilité</code></li>
        </ul>
      </div>
    </div>
  );
}