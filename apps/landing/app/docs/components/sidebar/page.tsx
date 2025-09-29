'use client';

import { useState } from 'react';
import { Sidebar } from '@cosmic-ui/ui';
import { Home, Settings, User, Bell, FileText, BarChart3 } from 'lucide-react';

const CodeBlock = ({
  children,
  onCopy,
}: {
  children: string;
  onCopy: () => void;
}) => {
  return (
    <div className="relative">
      <pre className="bg-white dark:bg-black p-4 rounded-lg overflow-x-auto text-sm">
        <code>{children}</code>
      </pre>
      <button
        onClick={onCopy}
        className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
      </button>
    </div>
  );
};

export default function SidebarPage() {
  const [showCode, setShowCode] = useState(false);
  const [showCodeVariants, setShowCodeVariants] = useState(false);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const [collapsed, setCollapsed] = useState(false);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStates(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCopiedStates(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

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
      key: 'documents',
      label: 'Documents',
      icon: <FileText className="w-4 h-4" />,
      href: '/documents',
    },
    {
      key: 'analytics',
      label: 'Analytics',
      icon: <BarChart3 className="w-4 h-4" />,
      href: '/analytics',
    },
    {
      key: 'settings',
      label: 'Paramètres',
      icon: <Settings className="w-4 h-4" />,
      href: '/settings',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button className="p-2 hover:bg-cosmic-border rounded-lg">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <h1 className="text-4xl font-bold">Sidebar</h1>
          <button className="p-2 hover:bg-cosmic-border rounded-lg">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Summary */}
        <p className="text-lg text-gray-600 dark:text-gray-400-foreground mb-8">
          Un composant de barre latérale avec support de la réduction, icônes et
          badges.
        </p>

        {/* Main Preview */}
        <div className="mb-12">
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setShowCode(false)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                !showCode
                  ? 'bg-cosmic-primary text-white'
                  : 'bg-cosmic-border text-gray-900 dark:text-white hover:bg-cosmic-border/80'
              }`}
            >
              Preview
            </button>
            <button
              onClick={() => setShowCode(true)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                showCode
                  ? 'bg-cosmic-primary text-white'
                  : 'bg-cosmic-border text-gray-900 dark:text-white hover:bg-cosmic-border/80'
              }`}
            >
              Code
            </button>
          </div>

          <div className="bg-cosmic-card border border-gray-200 dark:border-gray-700 rounded-lg p-2 min-h-[450px] w-[500px] flex justify-start">
            {!showCode ? (
              <div className="p-4 w-full">
                <div className="flex h-full">
                  <Sidebar
                    items={sidebarItems}
                    activeKey="home"
                    collapsed={collapsed}
                    onCollapsedChange={setCollapsed}
                    header={
                      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="font-semibold">Mon App</h2>
                      </div>
                    }
                    footer={
                      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                        <button
                          onClick={() => setCollapsed(!collapsed)}
                          className="w-full p-2 text-left hover:bg-cosmic-border rounded-lg"
                        >
                          {collapsed ? '▶' : '◀'}
                        </button>
                      </div>
                    }
                  />
                  <div className="flex-1 p-4">
                    <h3 className="text-lg font-medium mb-2">
                      Contenu principal
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400-foreground">
                      Le contenu de votre application apparaît ici.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full">
                <CodeBlock
                  onCopy={() =>
                    handleCopy(
                      `import { Sidebar } from '@cosmic-ui/ui';
import { Home, Settings, User, Bell, FileText, BarChart3 } from 'lucide-react';
import { useState } from 'react';

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
    badge: <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">3</span>,
  },
  {
    key: 'documents',
    label: 'Documents',
    icon: <FileText className="w-4 h-4" />,
    href: '/documents',
  },
  {
    key: 'analytics',
    label: 'Analytics',
    icon: <BarChart3 className="w-4 h-4" />,
    href: '/analytics',
  },
  {
    key: 'settings',
    label: 'Paramètres',
    icon: <Settings className="w-4 h-4" />,
    href: '/settings',
  },
];

export function MySidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-full">
      <Sidebar
        items={sidebarItems}
        activeKey="home"
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
        header={
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="font-semibold">Mon App</h2>
          </div>
        }
        footer={
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="w-full p-2 text-left hover:bg-cosmic-border rounded-lg"
            >
              {collapsed ? '▶' : '◀'}
            </button>
          </div>
        }
      />
      <div className="flex-1 p-4">
        <h3 className="text-lg font-medium mb-2">Contenu principal</h3>
        <p className="text-gray-600 dark:text-gray-400-foreground">
          Le contenu de votre application apparaît ici.
        </p>
      </div>
    </div>
  );
}`,
                      'main'
                    )
                  }
                >
                  {`import { Sidebar } from '@cosmic-ui/ui';
import { Home, Settings, User, Bell, FileText, BarChart3 } from 'lucide-react';
import { useState } from 'react';

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
    badge: <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">3</span>,
  },
  {
    key: 'documents',
    label: 'Documents',
    icon: <FileText className="w-4 h-4" />,
    href: '/documents',
  },
  {
    key: 'analytics',
    label: 'Analytics',
    icon: <BarChart3 className="w-4 h-4" />,
    href: '/analytics',
  },
  {
    key: 'settings',
    label: 'Paramètres',
    icon: <Settings className="w-4 h-4" />,
    href: '/settings',
  },
];

export function MySidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-full">
      <Sidebar
        items={sidebarItems}
        activeKey="home"
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
        header={
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="font-semibold">Mon App</h2>
          </div>
        }
        footer={
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="w-full p-2 text-left hover:bg-cosmic-border rounded-lg"
            >
              {collapsed ? '▶' : '◀'}
            </button>
          </div>
        }
      />
      <div className="flex-1 p-4">
        <h3 className="text-lg font-medium mb-2">Contenu principal</h3>
        <p className="text-gray-600 dark:text-gray-400-foreground">
          Le contenu de votre application apparaît ici.
        </p>
      </div>
    </div>
  );
}`}
                </CodeBlock>
              </div>
            )}
          </div>
        </div>

        {/* Installation */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Installation</h2>
          <div className="bg-cosmic-card border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <p className="text-gray-600 dark:text-gray-400-foreground mb-4">
              Le composant Sidebar est déjà inclus dans le package
              @cosmic-ui/ui.
            </p>
            <CodeBlock
              onCopy={() =>
                handleCopy(`npm install @cosmic-ui/ui`, 'install')
              }
            >
              {`npm install @cosmic-ui/ui`}
            </CodeBlock>
          </div>
        </div>

        {/* Usage */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Utilisation</h2>
          <div className="bg-cosmic-card border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <p className="text-gray-600 dark:text-gray-400-foreground mb-4">
              Importez le composant et utilisez-le avec vos éléments de
              navigation.
            </p>
            <CodeBlock
              onCopy={() =>
                handleCopy(
                  `import { Sidebar } from '@cosmic-ui/ui';

const items = [
  { key: 'home', label: 'Accueil', href: '/' },
  { key: 'about', label: 'À propos', href: '/about' },
];

<Sidebar items={items} activeKey="home" />`,
                  'usage'
                )
              }
            >
              {`import { Sidebar } from '@cosmic-ui/ui';

const items = [
  { key: 'home', label: 'Accueil', href: '/' },
  { key: 'about', label: 'À propos', href: '/about' },
];

<Sidebar items={items} activeKey="home" />`}
            </CodeBlock>
          </div>
        </div>

        {/* Variants */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Variantes</h2>

          {/* Variants Preview */}
          <div className="mb-8">
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setShowCodeVariants(false)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  !showCodeVariants
                    ? 'bg-cosmic-primary text-white'
                    : 'bg-cosmic-border text-gray-900 dark:text-white hover:bg-cosmic-border/80'
                }`}
              >
                Preview
              </button>
              <button
                onClick={() => setShowCodeVariants(true)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  showCodeVariants
                    ? 'bg-cosmic-primary text-white'
                    : 'bg-cosmic-border text-gray-900 dark:text-white hover:bg-cosmic-border/80'
                }`}
              >
                Code
              </button>
            </div>

            <div className="bg-cosmic-card border border-gray-200 dark:border-gray-700 rounded-lg p-2 min-h-[450px] w-[500px] flex justify-start">
              {!showCodeVariants ? (
                <div className="p-4 w-full space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Sidebar réduite
                    </h3>
                    <div className="flex h-32">
                      <Sidebar
                        items={sidebarItems.slice(0, 3)}
                        activeKey="home"
                        collapsed={true}
                      />
                      <div className="flex-1 p-2 bg-white dark:bg-gray-900 rounded">
                        <p className="text-xs text-gray-600 dark:text-gray-400-foreground">
                          Contenu
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Sidebar avec badges
                    </h3>
                    <div className="flex h-32">
                      <Sidebar
                        items={sidebarItems}
                        activeKey="notifications"
                        collapsed={false}
                      />
                      <div className="flex-1 p-2 bg-white dark:bg-gray-900 rounded">
                        <p className="text-xs text-gray-600 dark:text-gray-400-foreground">
                          Contenu
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full">
                  <CodeBlock
                    onCopy={() =>
                      handleCopy(
                        `// Sidebar réduite
<Sidebar
  items={items}
  activeKey="home"
  collapsed={true}
/>

// Sidebar avec badges
const itemsWithBadges = [
  {
    key: 'notifications',
    label: 'Notifications',
    icon: <Bell className="w-4 h-4" />,
    badge: <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">3</span>,
  },
];

<Sidebar
  items={itemsWithBadges}
  activeKey="notifications"
  collapsed={false}
/>`,
                        'variants'
                      )
                    }
                  >
                    {`// Sidebar réduite
<Sidebar
  items={items}
  activeKey="home"
  collapsed={true}
/>

// Sidebar avec badges
const itemsWithBadges = [
  {
    key: 'notifications',
    label: 'Notifications',
    icon: <Bell className="w-4 h-4" />,
    badge: <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">3</span>,
  },
];

<Sidebar
  items={itemsWithBadges}
  activeKey="notifications"
  collapsed={false}
/>`}
                  </CodeBlock>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
