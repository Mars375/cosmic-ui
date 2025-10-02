'use client';

import * as React from 'react';
import { useState } from 'react';
import { CodeBlock } from '../../../components/code-block';
import { Sidebar } from 'cosmic-ui-mars';
import { Menu, Home, Settings, User, FileText, BarChart3 } from 'lucide-react';

export default function SidebarPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedItem, setSelectedItem] = useState('dashboard');

  const menuItems = [
    {
      key: 'dashboard',
      label: 'Tableau de bord',
      icon: React.createElement(Home, { className: 'w-4 h-4' }),
      href: '/dashboard',
    },
    {
      key: 'analytics',
      label: 'Analytics',
      icon: React.createElement(BarChart3, { className: 'w-4 h-4' }),
      href: '/analytics',
    },
    {
      key: 'documents',
      label: 'Documents',
      icon: React.createElement(FileText, { className: 'w-4 h-4' }),
      href: '/documents',
    },
    {
      key: 'profile',
      label: 'Profil',
      icon: React.createElement(User, { className: 'w-4 h-4' }),
      href: '/profile',
    },
    {
      key: 'settings',
      label: 'Paramètres',
      icon: React.createElement(Settings, { className: 'w-4 h-4' }),
      href: '/settings',
    },
  ];

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Menu className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">Sidebar</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Barre latérale de navigation pour organiser et accéder aux différentes sections de l'application.
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
              <div className="h-96 border rounded-lg overflow-hidden">
                <Sidebar
                  items={menuItems}
                  activeKey={selectedItem}
                  collapsed={isCollapsed}
                  onCollapsedChange={setIsCollapsed}
                />
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4 text-foreground">Code</h3>
            <CodeBlock language="typescript" filePath="components/SidebarExample.tsx" showPackageManager={false}>
{`import { Sidebar } from 'cosmic-ui-mars';
import { useState } from 'react';
import { Home, Settings, User } from 'lucide-react';

const menuItems = [
  {
    id: 'dashboard',
    label: 'Tableau de bord',
    icon: Home,
    href: '/dashboard',
  },
  {
    id: 'profile',
    label: 'Profil',
    icon: User,
    href: '/profile',
  },
  {
    id: 'settings',
    label: 'Paramètres',
    icon: Settings,
    href: '/settings',
  },
];

const [selectedItem, setSelectedItem] = useState('dashboard');
const [isCollapsed, setIsCollapsed] = useState(false);

<Sidebar
  items={menuItems}
  selectedItem={selectedItem}
  onItemSelect={setSelectedItem}
  isCollapsed={isCollapsed}
  onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
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
              <h3 className="text-lg font-medium text-foreground">Sidebar collapsible</h3>
              <p className="text-muted-foreground">Sidebar avec possibilité de réduction.</p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <div className="h-96 border rounded-lg overflow-hidden">
                  <Sidebar
                    items={menuItems}
                    selectedItem={selectedItem}
                    onItemSelect={setSelectedItem}
                    isCollapsed={true}
                    collapsible
                  />
                </div>
              </div>
            </div>
            <div>
              <CodeBlock language="typescript" filePath="components/CollapsibleSidebar.tsx" showPackageManager={false}>
{`export default function App\docs\components\sidebar\page.tsxExample() {
  return <Sidebar
  items={menuItems}
  selectedItem={selectedItem}
  onItemSelect={setSelectedItem}
  isCollapsed={true}
  collapsible
/>;
}`}
              </CodeBlock>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Sidebar avec groupes</h3>
              <p className="text-muted-foreground">Sidebar avec éléments groupés par catégories.</p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <div className="h-96 border rounded-lg overflow-hidden">
                  <Sidebar
                    items={[
                      {
                        id: 'main',
                        label: 'Principal',
                        type: 'group',
                        children: [
                          { id: 'dashboard', label: 'Tableau de bord', icon: Home },
                          { id: 'analytics', label: 'Analytics', icon: BarChart3 },
                        ],
                      },
                      {
                        id: 'account',
                        label: 'Compte',
                        type: 'group',
                        children: [
                          { id: 'profile', label: 'Profil', icon: User },
                          { id: 'settings', label: 'Paramètres', icon: Settings },
                        ],
                      },
                    ]}
                    selectedItem={selectedItem}
                    onItemSelect={setSelectedItem}
                  />
                </div>
              </div>
            </div>
            <div>
              <CodeBlock language="typescript" filePath="components/GroupedSidebar.tsx" showPackageManager={false}>
{`export default function App\docs\components\sidebar\page.tsxExample() {
  const groupedItems = [
  {
    id: 'main',
    label: 'Principal',
    type: 'group',
    children: [
      { id: 'dashboard', label: 'Tableau de bord', icon: Home },
      { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    ],
  },
  {
    id: 'account',
    label: 'Compte',
    type: 'group',
    children: [
      { id: 'profile', label: 'Profil', icon: User },
      { id: 'settings', label: 'Paramètres', icon: Settings },
    ],
  },
];

<Sidebar
  items={groupedItems}
  selectedItem={selectedItem}
  onItemSelect={setSelectedItem}
/>
}`}
              </CodeBlock>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Sidebar avec footer</h3>
              <p className="text-muted-foreground">Sidebar avec section footer personnalisée.</p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <div className="h-96 border rounded-lg overflow-hidden">
                  <Sidebar
                    items={menuItems}
                    selectedItem={selectedItem}
                    onItemSelect={setSelectedItem}
                    footer={
                      <div className="p-4 border-t">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-primary-foreground" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">John Doe</p>
                            <p className="text-xs text-muted-foreground">john@example.com</p>
                          </div>
                        </div>
                      </div>
                    }
                  />
                </div>
              </div>
            </div>
            <div>
              <CodeBlock language="typescript" filePath="components/FooterSidebar.tsx" showPackageManager={false}>
{`export default function App\docs\components\sidebar\page.tsxExample() {
  <Sidebar
  items={menuItems}
  selectedItem={selectedItem}
  onItemSelect={setSelectedItem}
  footer={
    <div className="p-4 border-t">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-primary rounded-full">
          <User className="w-4 h-4" />
        </div>
        <div>
          <p className="text-sm font-medium">John Doe</p>
          <p className="text-xs text-muted-foreground">john@example.com</p>
        </div>
      </div>
    </div>
  }
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
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">SidebarItem[]</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">[]</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Éléments du menu</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">selectedItem</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">string</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">-</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Élément sélectionné</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">onItemSelect</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">(id: string) => void</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">-</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Callback de sélection</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">isCollapsed</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">boolean</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">false</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">État réduit</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">collapsible</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">boolean</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">false</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Peut être réduite</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">onToggleCollapse</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">() => void</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">-</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Callback de basculement</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">footer</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">ReactNode</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">-</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Contenu du footer</td>
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
          <li>• Utilisez des <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">icônes cohérentes</code> pour les éléments</li>
          <li>• Organisez les éléments par <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">groupes logiques</code></li>
          <li>• Implémentez la <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">réduction</code> pour les écrans étroits</li>
          <li>• Ajoutez un <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">footer</code> pour les informations utilisateur</li>
          <li>• Respectez les <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">guidelines d'accessibilité</code></li>
        </ul>
      </div>
    </div>
  );
}