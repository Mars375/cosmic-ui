'use client';

import * as React from 'react';
import { useState } from 'react';
import { CodeBlock } from '../../../components/code-block';
import { DashboardLayout } from 'cosmic-ui-mars';
import { Sidebar } from 'cosmic-ui-mars';
import { Topbar } from 'cosmic-ui-mars';
import { Button } from 'cosmic-ui-mars';
import { Home, Settings, User, Bell, Search } from 'lucide-react';

export default function DashboardLayoutPage() {
  const [showCode, setShowCode] = useState(false);
  const [showCodeVariants, setShowCodeVariants] = useState(false);

  const sidebarItems = [
    {
      key: 'home',
      label: 'Accueil',
      icon: <Home className="w-4 h-4" />,
      href: '/',
    },
    {
      key: 'profile',
      label: 'Profil',
      icon: <User className="w-4 h-4" />,
      href: '/profile',
    },
    {
      key: 'notifications',
      label: 'Notifications',
      icon: <Bell className="w-4 h-4" />,
      href: '/notifications',
      badge: (
        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
          3
        </span>
      ),
    },
    {
      key: 'settings',
      label: 'Paramètres',
      icon: <Settings className="w-4 h-4" />,
      href: '/settings',
    },
  ];

  const topbar = (
    <Topbar
      logo={<span className="font-bold text-lg">MonApp</span>}
      search={
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cosmic-primary"
          />
        </div>
      }
      actions={
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Bell className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <User className="w-4 h-4" />
          </Button>
        </div>
      }
    />
  );

  const sidebar = (
    <Sidebar
      items={sidebarItems}
      activeKey="home"
      collapsed={false}
      header={
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="font-semibold">Mon App</h2>
        </div>
      }
    />
  );

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Home className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">
            DashboardLayout
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Layout de tableau de bord avec sidebar et topbar pour les applications
          web.
        </p>
      </div>

      {/* Installation */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">
          Installation
        </h2>
        <CodeBlock filePath="package.json">pnpm add cosmic-ui-mars</CodeBlock>
      </div>

      {/* Usage basique */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">
          Usage basique
        </h2>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Exemple</h3>
            <div className="p-6 bg-muted/30 rounded-lg border">
              <div className="h-96 border rounded-lg overflow-hidden">
                <DashboardLayout
                  sidebar={sidebar}
                  topbar={topbar}
                  content={
                    <div className="p-6">
                      <h2 className="text-2xl font-bold mb-4">
                        Tableau de bord
                      </h2>
                      <p className="text-muted-foreground">
                        Contenu principal de l'application
                      </p>
                    </div>
                  }
                />
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4 text-foreground">Code</h3>
            <CodeBlock
              language="typescript"
              filePath="components/DashboardLayoutExample.tsx"
              showPackageManager={false}
            >
              {`import { DashboardLayout } from 'cosmic-ui-mars';
import { Sidebar } from 'cosmic-ui-mars';
import { Topbar } from 'cosmic-ui-mars';

const sidebarItems = [
  {
    key: 'home',
    label: 'Accueil',
    icon: <Home className="w-4 h-4" />,
    href: '/',
  },
];

const sidebar = (
  <Sidebar
    items={sidebarItems}
    activeKey="home"
    collapsed={false}
  />
);

const topbar = (
  <Topbar
    logo={<span className="font-bold text-lg">MonApp</span>}
    actions={<Button>Action</Button>}
  />
);

<DashboardLayout
  sidebar={sidebar}
  topbar={topbar}
  content={<div>Contenu principal</div>}
/>`}
            </CodeBlock>
          </div>
        </div>
      </div>

      {/* Variants */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">
          Variants
        </h2>
        <div className="space-y-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">
                Layout avec sidebar collapsible
              </h3>
              <p className="text-muted-foreground">
                Layout avec sidebar qui peut être réduite.
              </p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <div className="h-96 border rounded-lg overflow-hidden">
                  <DashboardLayout
                    sidebar={
                      <Sidebar
                        items={sidebarItems}
                        activeKey="home"
                        collapsed={true}
                      />
                    }
                    topbar={topbar}
                    content={
                      <div className="p-6">
                        <h2 className="text-2xl font-bold mb-4">
                          Sidebar réduite
                        </h2>
                        <p className="text-muted-foreground">
                          La sidebar est réduite pour économiser l'espace
                        </p>
                      </div>
                    }
                  />
                </div>
              </div>
            </div>
            <div>
              <CodeBlock
                language="typescript"
                filePath="components/CollapsibleDashboardLayout.tsx"
                showPackageManager={false}
              >
                {`export default function App\docs\components\dashboardLayout\page.tsxExample() {
  <DashboardLayout
  sidebar={
    <Sidebar
      items={sidebarItems}
      activeKey="home"
      collapsed={true}
    />
  }
  topbar={topbar}
  content={<div>Contenu avec sidebar réduite</div>}
/>
}`}
              </CodeBlock>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">
                Layout sans topbar
              </h3>
              <p className="text-muted-foreground">
                Layout avec seulement la sidebar.
              </p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <div className="h-96 border rounded-lg overflow-hidden">
                  <DashboardLayout
                    sidebar={sidebar}
                    content={
                      <div className="p-6">
                        <h2 className="text-2xl font-bold mb-4">Sans topbar</h2>
                        <p className="text-muted-foreground">
                          Layout simplifié sans barre supérieure
                        </p>
                      </div>
                    }
                  />
                </div>
              </div>
            </div>
            <div>
              <CodeBlock
                language="typescript"
                filePath="components/SimpleDashboardLayout.tsx"
                showPackageManager={false}
              >
                {`export default function App\docs\components\dashboardLayout\page.tsxExample() {
  <DashboardLayout
  sidebar={sidebar}
  content={<div>Contenu sans topbar</div>}
/>
}`}
              </CodeBlock>
            </div>
          </div>
        </div>
      </div>

      {/* Référence API */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">
          Référence API
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-border rounded-lg">
            <thead>
              <tr className="bg-muted/50">
                <th className="border border-border px-4 py-3 text-left font-medium text-foreground">
                  Prop
                </th>
                <th className="border border-border px-4 py-3 text-left font-medium text-foreground">
                  Type
                </th>
                <th className="border border-border px-4 py-3 text-left font-medium text-foreground">
                  Défaut
                </th>
                <th className="border border-border px-4 py-3 text-left font-medium text-foreground">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">
                  sidebar
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  ReactNode
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  -
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  Composant sidebar
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">
                  topbar
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  ReactNode
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  -
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  Composant topbar
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">
                  content
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  ReactNode
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  -
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  Contenu principal
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">
                  className
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  string
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  -
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  Classes CSS supplémentaires
                </td>
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
          <li>
            • Utilisez le{' '}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              DashboardLayout
            </code>{' '}
            pour les applications complexes
          </li>
          <li>
            • Organisez la{' '}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              navigation
            </code>{' '}
            dans la sidebar
          </li>
          <li>
            • Placez les{' '}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              actions globales
            </code>{' '}
            dans la topbar
          </li>
          <li>
            • Rendez la sidebar{' '}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              collapsible
            </code>{' '}
            sur mobile
          </li>
          <li>
            • Respectez les{' '}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              guidelines d'accessibilité
            </code>
          </li>
        </ul>
      </div>
    </div>
  );
}
