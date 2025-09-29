'use client';

import { useState } from 'react';
import { DashboardLayout } from '@cosmic-ui/react';
import { Sidebar } from '@cosmic-ui/react';
import { Topbar } from '@cosmic-ui/react';
import { Button } from '@cosmic-ui/react';
import { Home, Settings, User, Bell, Search } from 'lucide-react';

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

export default function DashboardLayoutPage() {
  const [showCode, setShowCode] = useState(false);
  const [showCodeVariants, setShowCodeVariants] = useState(false);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

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
            className="w-full pl-10 pr-4 py-2 bg-cosmic-background border border-cosmic-border rounded-lg focus:outline-none focus:ring-2 focus:ring-cosmic-primary"
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
        <div className="p-4 border-b border-cosmic-border">
          <h2 className="font-semibold">Mon App</h2>
        </div>
      }
    />
  );

  return (
    <div className="min-h-screen bg-cosmic-background text-cosmic-foreground">
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
          <h1 className="text-4xl font-bold">DashboardLayout</h1>
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
        <p className="text-lg text-cosmic-muted-foreground mb-8">
          Un composant de mise en page pour dashboard avec sidebar et topbar
          intégrés.
        </p>

        {/* Main Preview */}
        <div className="mb-12">
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setShowCode(false)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                !showCode
                  ? 'bg-cosmic-primary text-white'
                  : 'bg-cosmic-border text-cosmic-foreground hover:bg-cosmic-border/80'
              }`}
            >
              Preview
            </button>
            <button
              onClick={() => setShowCode(true)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                showCode
                  ? 'bg-cosmic-primary text-white'
                  : 'bg-cosmic-border text-cosmic-foreground hover:bg-cosmic-border/80'
              }`}
            >
              Code
            </button>
          </div>

          <div className="bg-cosmic-card border border-cosmic-border rounded-lg p-2 h-[450px] w-[500px] flex justify-start">
            {!showCode ? (
              <div className="p-4 w-full">
                <div className="h-full border border-cosmic-border rounded-lg overflow-hidden">
                  <DashboardLayout
                    sidebar={sidebar}
                    topbar={topbar}
                    className="h-full"
                  >
                    <div className="p-4">
                      <h3 className="text-lg font-medium mb-2">
                        Contenu principal
                      </h3>
                      <p className="text-cosmic-muted-foreground">
                        Le contenu de votre dashboard apparaît ici.
                      </p>
                    </div>
                  </DashboardLayout>
                </div>
              </div>
            ) : (
              <div className="w-full h-full">
                <CodeBlock
                  onCopy={() =>
                    handleCopy(
                      `import { DashboardLayout } from '@cosmic-ui/react';
import { Sidebar } from '@cosmic-ui/react';
import { Topbar } from '@cosmic-ui/react';
import { Button } from '@cosmic-ui/react';
import { Home, Settings, User, Bell, Search } from 'lucide-react';

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
    key: 'settings',
    label: 'Paramètres',
    icon: <Settings className="w-4 h-4" />,
    href: '/settings',
  },
];

export function MyDashboard() {
  const topbar = (
    <Topbar
      logo={<span className="font-bold text-lg">MonApp</span>}
      search={
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-full pl-10 pr-4 py-2 bg-cosmic-background border border-cosmic-border rounded-lg focus:outline-none focus:ring-2 focus:ring-cosmic-primary"
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
        <div className="p-4 border-b border-cosmic-border">
          <h2 className="font-semibold">Mon App</h2>
        </div>
      }
    />
  );

  return (
    <DashboardLayout
      sidebar={sidebar}
      topbar={topbar}
    >
      <div className="p-4">
        <h3 className="text-lg font-medium mb-2">Contenu principal</h3>
        <p className="text-cosmic-muted-foreground">
          Le contenu de votre dashboard apparaît ici.
        </p>
      </div>
    </DashboardLayout>
  );
}`,
                      'main'
                    )
                  }
                >
                  {`import { DashboardLayout } from '@cosmic-ui/react';
import { Sidebar } from '@cosmic-ui/react';
import { Topbar } from '@cosmic-ui/react';
import { Button } from '@cosmic-ui/react';
import { Home, Settings, User, Bell, Search } from 'lucide-react';

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
    key: 'settings',
    label: 'Paramètres',
    icon: <Settings className="w-4 h-4" />,
    href: '/settings',
  },
];

export function MyDashboard() {
  const topbar = (
    <Topbar
      logo={<span className="font-bold text-lg">MonApp</span>}
      search={
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-full pl-10 pr-4 py-2 bg-cosmic-background border border-cosmic-border rounded-lg focus:outline-none focus:ring-2 focus:ring-cosmic-primary"
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
        <div className="p-4 border-b border-cosmic-border">
          <h2 className="font-semibold">Mon App</h2>
        </div>
      }
    />
  );

  return (
    <DashboardLayout
      sidebar={sidebar}
      topbar={topbar}
    >
      <div className="p-4">
        <h3 className="text-lg font-medium mb-2">Contenu principal</h3>
        <p className="text-cosmic-muted-foreground">
          Le contenu de votre dashboard apparaît ici.
        </p>
      </div>
    </DashboardLayout>
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
          <div className="bg-cosmic-card border border-cosmic-border rounded-lg p-4">
            <p className="text-cosmic-muted-foreground mb-4">
              Le composant DashboardLayout est déjà inclus dans le package
              @cosmic-ui/react.
            </p>
            <CodeBlock
              onCopy={() =>
                handleCopy(`npm install @cosmic-ui/react`, 'install')
              }
            >
              {`npm install @cosmic-ui/react`}
            </CodeBlock>
          </div>
        </div>

        {/* Usage */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Utilisation</h2>
          <div className="bg-cosmic-card border border-cosmic-border rounded-lg p-4">
            <p className="text-cosmic-muted-foreground mb-4">
              Utilisez le composant pour créer une mise en page de dashboard
              complète.
            </p>
            <CodeBlock
              onCopy={() =>
                handleCopy(
                  `import { DashboardLayout } from '@cosmic-ui/react';

<DashboardLayout
  sidebar={<Sidebar items={items} />}
  topbar={<Topbar logo="MonApp" />}
>
  <div>Contenu principal</div>
</DashboardLayout>`,
                  'usage'
                )
              }
            >
              {`import { DashboardLayout } from '@cosmic-ui/react';

<DashboardLayout
  sidebar={<Sidebar items={items} />}
  topbar={<Topbar logo="MonApp" />}
>
  <div>Contenu principal</div>
</DashboardLayout>`}
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
                    : 'bg-cosmic-border text-cosmic-foreground hover:bg-cosmic-border/80'
                }`}
              >
                Preview
              </button>
              <button
                onClick={() => setShowCodeVariants(true)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  showCodeVariants
                    ? 'bg-cosmic-primary text-white'
                    : 'bg-cosmic-border text-cosmic-foreground hover:bg-cosmic-border/80'
                }`}
              >
                Code
              </button>
            </div>

            <div className="bg-cosmic-card border border-cosmic-border rounded-lg p-2 h-[450px] w-[500px] flex justify-start">
              {!showCodeVariants ? (
                <div className="p-4 w-full space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Layout simple</h3>
                    <div className="h-32 border border-cosmic-border rounded-lg overflow-hidden">
                      <DashboardLayout
                        sidebar={
                          <Sidebar
                            items={sidebarItems.slice(0, 2)}
                            activeKey="home"
                            collapsed={false}
                          />
                        }
                        topbar={
                          <Topbar
                            logo={<span className="font-semibold">Simple</span>}
                          />
                        }
                        className="h-full"
                      >
                        <div className="p-2 text-xs">Contenu</div>
                      </DashboardLayout>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">Avec recherche</h3>
                    <div className="h-32 border border-cosmic-border rounded-lg overflow-hidden">
                      <DashboardLayout
                        sidebar={
                          <Sidebar
                            items={sidebarItems.slice(0, 2)}
                            activeKey="home"
                            collapsed={false}
                          />
                        }
                        topbar={
                          <Topbar
                            logo={<span className="font-semibold">Search</span>}
                            search={
                              <input
                                type="text"
                                placeholder="Rechercher..."
                                className="px-2 py-1 bg-cosmic-background border border-cosmic-border rounded text-xs"
                              />
                            }
                          />
                        }
                        className="h-full"
                      >
                        <div className="p-2 text-xs">Contenu</div>
                      </DashboardLayout>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full">
                  <CodeBlock
                    onCopy={() =>
                      handleCopy(
                        `// Layout simple
<DashboardLayout
  sidebar={<Sidebar items={items} activeKey="home" />}
  topbar={<Topbar logo="MonApp" />}
>
  <div>Contenu principal</div>
</DashboardLayout>

// Avec recherche
<DashboardLayout
  sidebar={<Sidebar items={items} activeKey="home" />}
  topbar={
    <Topbar
      logo="MonApp"
      search={<input placeholder="Rechercher..." />}
    />
  }
>
  <div>Contenu principal</div>
</DashboardLayout>

// Avec actions
<DashboardLayout
  sidebar={<Sidebar items={items} activeKey="home" />}
  topbar={
    <Topbar
      logo="MonApp"
      actions={
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">
            <Bell className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <User className="w-4 h-4" />
          </Button>
        </div>
      }
    />
  }
>
  <div>Contenu principal</div>
</DashboardLayout>`,
                        'variants'
                      )
                    }
                  >
                    {`// Layout simple
<DashboardLayout
  sidebar={<Sidebar items={items} activeKey="home" />}
  topbar={<Topbar logo="MonApp" />}
>
  <div>Contenu principal</div>
</DashboardLayout>

// Avec recherche
<DashboardLayout
  sidebar={<Sidebar items={items} activeKey="home" />}
  topbar={
    <Topbar
      logo="MonApp"
      search={<input placeholder="Rechercher..." />}
    />
  }
>
  <div>Contenu principal</div>
</DashboardLayout>

// Avec actions
<DashboardLayout
  sidebar={<Sidebar items={items} activeKey="home" />}
  topbar={
    <Topbar
      logo="MonApp"
      actions={
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">
            <Bell className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <User className="w-4 h-4" />
          </Button>
        </div>
      }
    />
  }
>
  <div>Contenu principal</div>
</DashboardLayout>`}
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
