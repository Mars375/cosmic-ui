'use client';

import { useState } from 'react';
import { Button } from '@cosmic-ui/react';
import { NavigationMenu } from '@cosmic-ui/react';
import { Home, Settings, User, Bell, ChevronDown } from 'lucide-react';

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

export default function NavigationMenuPage() {
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
      children: [
        {
          id: 'profile-edit',
          label: 'Modifier le profil',
          href: '/profile/edit',
        },
        {
          id: 'profile-settings',
          label: 'Paramètres du profil',
          href: '/profile/settings',
        },
      ],
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
          <h1 className="text-4xl font-bold">NavigationMenu</h1>
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
          Un composant de menu de navigation flexible avec support des icônes,
          badges et sous-menus.
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
                <NavigationMenu
                  items={navigationItems}
                  orientation="horizontal"
                  variant="default"
                  size="md"
                />
              </div>
            ) : (
              <div className="w-full h-full">
                <CodeBlock
                  onCopy={() =>
                    handleCopy(
                      `import { NavigationMenu } from '@cosmic-ui/react';
import { Home, Settings, User, Bell } from 'lucide-react';

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

export function MyNavigation() {
  return (
    <NavigationMenu
      items={navigationItems}
      orientation="horizontal"
      variant="default"
      size="md"
    />
  );
}`,
                      'main'
                    )
                  }
                >
                  {`import { NavigationMenu } from '@cosmic-ui/react';
import { Home, Settings, User, Bell } from 'lucide-react';

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

export function MyNavigation() {
  return (
    <NavigationMenu
      items={navigationItems}
      orientation="horizontal"
      variant="default"
      size="md"
    />
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
              Le composant NavigationMenu est déjà inclus dans le package
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
              Importez le composant et utilisez-le avec vos éléments de
              navigation.
            </p>
            <CodeBlock
              onCopy={() =>
                handleCopy(
                  `import { NavigationMenu } from '@cosmic-ui/react';

const items = [
  { id: 'home', label: 'Accueil', href: '/' },
  { id: 'about', label: 'À propos', href: '/about' },
];

<NavigationMenu items={items} />`,
                  'usage'
                )
              }
            >
              {`import { NavigationMenu } from '@cosmic-ui/react';

const items = [
  { id: 'home', label: 'Accueil', href: '/' },
  { id: 'about', label: 'À propos', href: '/about' },
];

<NavigationMenu items={items} />`}
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
                <div className="p-4 w-full space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Horizontal avec sous-menus
                    </h3>
                    <NavigationMenu
                      items={navigationItemsWithDropdown}
                      orientation="horizontal"
                      variant="default"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">Vertical</h3>
                    <NavigationMenu
                      items={navigationItems}
                      orientation="vertical"
                      variant="default"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">Pills</h3>
                    <NavigationMenu
                      items={navigationItems}
                      orientation="horizontal"
                      variant="pills"
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full h-full">
                  <CodeBlock
                    onCopy={() =>
                      handleCopy(
                        `// Navigation avec sous-menus
const itemsWithDropdown = [
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
    children: [
      { id: 'profile-edit', label: 'Modifier le profil', href: '/profile/edit' },
      { id: 'profile-settings', label: 'Paramètres du profil', href: '/profile/settings' },
    ],
  },
];

// Navigation verticale
<NavigationMenu
  items={items}
  orientation="vertical"
  variant="default"
/>

// Navigation avec style pills
<NavigationMenu
  items={items}
  orientation="horizontal"
  variant="pills"
/>`,
                        'variants'
                      )
                    }
                  >
                    {`// Navigation avec sous-menus
const itemsWithDropdown = [
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
    children: [
      { id: 'profile-edit', label: 'Modifier le profil', href: '/profile/edit' },
      { id: 'profile-settings', label: 'Paramètres du profil', href: '/profile/settings' },
    ],
  },
];

// Navigation verticale
<NavigationMenu
  items={items}
  orientation="vertical"
  variant="default"
/>

// Navigation avec style pills
<NavigationMenu
  items={items}
  orientation="horizontal"
  variant="pills"
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
