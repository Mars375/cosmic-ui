'use client';

import { useState } from 'react';
import { CommandPalette } from '@cosmic-ui/ui';
import { Button } from '@cosmic-ui/ui';
import { Search, Settings, User, FileText, Home, Mail } from 'lucide-react';

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

export default function CommandPalettePage() {
  const [showCode, setShowCode] = useState(false);
  const [showCodeVariants, setShowCodeVariants] = useState(false);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const [isOpen, setIsOpen] = useState(false);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStates(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCopiedStates(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

  const groups = [
    {
      id: 'navigation',
      title: 'Navigation',
      items: [
        {
          id: 'home',
          title: 'Accueil',
          description: 'Aller à la page d\'accueil',
          icon: <Home className="w-4 h-4" />,
          action: () => console.log('Navigation vers accueil'),
          keywords: ['home', 'accueil', 'dashboard'],
        },
        {
          id: 'profile',
          title: 'Profil',
          description: 'Voir votre profil utilisateur',
          icon: <User className="w-4 h-4" />,
          action: () => console.log('Navigation vers profil'),
          keywords: ['profile', 'profil', 'user', 'utilisateur'],
        },
        {
          id: 'settings',
          title: 'Paramètres',
          description: 'Ouvrir les paramètres',
          icon: <Settings className="w-4 h-4" />,
          action: () => console.log('Navigation vers paramètres'),
          keywords: ['settings', 'paramètres', 'config'],
        },
      ],
    },
    {
      id: 'actions',
      title: 'Actions',
      items: [
        {
          id: 'search',
          title: 'Rechercher',
          description: 'Lancer une recherche',
          icon: <Search className="w-4 h-4" />,
          action: () => console.log('Lancer recherche'),
          keywords: ['search', 'recherche', 'find'],
        },
        {
          id: 'new-document',
          title: 'Nouveau document',
          description: 'Créer un nouveau document',
          icon: <FileText className="w-4 h-4" />,
          action: () => console.log('Créer document'),
          keywords: ['new', 'nouveau', 'document', 'create'],
        },
        {
          id: 'send-email',
          title: 'Envoyer un email',
          description: 'Composer un nouvel email',
          icon: <Mail className="w-4 h-4" />,
          action: () => console.log('Envoyer email'),
          keywords: ['email', 'mail', 'send', 'envoyer'],
        },
      ],
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
          <h1 className="text-4xl font-bold">CommandPalette</h1>
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
          Un composant de palette de commandes pour navigation rapide et
          recherche d'actions.
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
                <div className="space-y-4">
                  <Button onClick={() => setIsOpen(true)}>
                    Ouvrir la palette de commandes
                  </Button>
                  <CommandPalette
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    groups={groups}
                    placeholder="Tapez une commande ou recherchez..."
                  />
                </div>
              </div>
            ) : (
              <div className="w-full h-full">
                <CodeBlock
                  onCopy={() =>
                    handleCopy(
                      `import { CommandPalette } from '@cosmic-ui/ui';
import { Button } from '@cosmic-ui/ui';
import { Home, User, Settings, Search, FileText, Mail } from 'lucide-react';
import { useState } from 'react';

export function MyCommandPalette() {
  const [isOpen, setIsOpen] = useState(false);

  const groups = [
    {
      id: 'navigation',
      title: 'Navigation',
      items: [
        {
          id: 'home',
          title: 'Accueil',
          description: 'Aller à la page d\\'accueil',
          icon: <Home className="w-4 h-4" />,
          action: () => console.log('Navigation vers accueil'),
          keywords: ['home', 'accueil', 'dashboard'],
        },
        {
          id: 'profile',
          title: 'Profil',
          description: 'Voir votre profil utilisateur',
          icon: <User className="w-4 h-4" />,
          action: () => console.log('Navigation vers profil'),
          keywords: ['profile', 'profil', 'user', 'utilisateur'],
        },
        {
          id: 'settings',
          title: 'Paramètres',
          description: 'Ouvrir les paramètres',
          icon: <Settings className="w-4 h-4" />,
          action: () => console.log('Navigation vers paramètres'),
          keywords: ['settings', 'paramètres', 'config'],
        },
      ],
    },
    {
      id: 'actions',
      title: 'Actions',
      items: [
        {
          id: 'search',
          title: 'Rechercher',
          description: 'Lancer une recherche',
          icon: <Search className="w-4 h-4" />,
          action: () => console.log('Lancer recherche'),
          keywords: ['search', 'recherche', 'find'],
        },
        {
          id: 'new-document',
          title: 'Nouveau document',
          description: 'Créer un nouveau document',
          icon: <FileText className="w-4 h-4" />,
          action: () => console.log('Créer document'),
          keywords: ['new', 'nouveau', 'document', 'create'],
        },
        {
          id: 'send-email',
          title: 'Envoyer un email',
          description: 'Composer un nouvel email',
          icon: <Mail className="w-4 h-4" />,
          action: () => console.log('Envoyer email'),
          keywords: ['email', 'mail', 'send', 'envoyer'],
        },
      ],
    },
  ];

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>
        Ouvrir la palette de commandes
      </Button>
      <CommandPalette
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        groups={groups}
        placeholder="Tapez une commande ou recherchez..."
      />
    </div>
  );
}`,
                      'main'
                    )
                  }
                >
                  {`import { CommandPalette } from '@cosmic-ui/ui';
import { Button } from '@cosmic-ui/ui';
import { Home, User, Settings, Search, FileText, Mail } from 'lucide-react';
import { useState } from 'react';

export function MyCommandPalette() {
  const [isOpen, setIsOpen] = useState(false);

  const groups = [
    {
      id: 'navigation',
      title: 'Navigation',
      items: [
        {
          id: 'home',
          title: 'Accueil',
          description: 'Aller à la page d\\'accueil',
          icon: <Home className="w-4 h-4" />,
          action: () => console.log('Navigation vers accueil'),
          keywords: ['home', 'accueil', 'dashboard'],
        },
        {
          id: 'profile',
          title: 'Profil',
          description: 'Voir votre profil utilisateur',
          icon: <User className="w-4 h-4" />,
          action: () => console.log('Navigation vers profil'),
          keywords: ['profile', 'profil', 'user', 'utilisateur'],
        },
        {
          id: 'settings',
          title: 'Paramètres',
          description: 'Ouvrir les paramètres',
          icon: <Settings className="w-4 h-4" />,
          action: () => console.log('Navigation vers paramètres'),
          keywords: ['settings', 'paramètres', 'config'],
        },
      ],
    },
    {
      id: 'actions',
      title: 'Actions',
      items: [
        {
          id: 'search',
          title: 'Rechercher',
          description: 'Lancer une recherche',
          icon: <Search className="w-4 h-4" />,
          action: () => console.log('Lancer recherche'),
          keywords: ['search', 'recherche', 'find'],
        },
        {
          id: 'new-document',
          title: 'Nouveau document',
          description: 'Créer un nouveau document',
          icon: <FileText className="w-4 h-4" />,
          action: () => console.log('Créer document'),
          keywords: ['new', 'nouveau', 'document', 'create'],
        },
        {
          id: 'send-email',
          title: 'Envoyer un email',
          description: 'Composer un nouvel email',
          icon: <Mail className="w-4 h-4" />,
          action: () => console.log('Envoyer email'),
          keywords: ['email', 'mail', 'send', 'envoyer'],
        },
      ],
    },
  ];

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>
        Ouvrir la palette de commandes
      </Button>
      <CommandPalette
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        groups={groups}
        placeholder="Tapez une commande ou recherchez..."
      />
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
          <div className="bg-cosmic-card border border-cosmic-border rounded-lg p-4">
            <p className="text-cosmic-muted-foreground mb-4">
              Le composant CommandPalette est déjà inclus dans le package
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
          <div className="bg-cosmic-card border border-cosmic-border rounded-lg p-4">
            <p className="text-cosmic-muted-foreground mb-4">
              Utilisez le composant pour créer une palette de commandes.
            </p>
            <CodeBlock
              onCopy={() =>
                handleCopy(
                  `import { CommandPalette } from '@cosmic-ui/ui';

const groups = [
  {
    id: 'navigation',
    title: 'Navigation',
    items: [
      {
        id: 'home',
        title: 'Accueil',
        description: 'Aller à la page d\\'accueil',
        action: () => console.log('Navigation vers accueil'),
        keywords: ['home', 'accueil'],
      },
    ],
  },
];

<CommandPalette
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  groups={groups}
  placeholder="Tapez une commande..."
/>`,
                  'usage'
                )
              }
            >
              {`import { CommandPalette } from '@cosmic-ui/ui';

const groups = [
  {
    id: 'navigation',
    title: 'Navigation',
    items: [
      {
        id: 'home',
        title: 'Accueil',
        description: 'Aller à la page d\\'accueil',
        action: () => console.log('Navigation vers accueil'),
        keywords: ['home', 'accueil'],
      },
    ],
  },
];

<CommandPalette
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  groups={groups}
  placeholder="Tapez une commande..."
/>`}
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
                    <h3 className="text-sm font-medium mb-2">
                      Groupe simple
                    </h3>
                    <Button 
                      size="sm" 
                      onClick={() => setIsOpen(true)}
                    >
                      Ouvrir
                    </Button>
                    <CommandPalette
                      isOpen={isOpen}
                      onClose={() => setIsOpen(false)}
                      groups={groups.slice(0, 1)}
                      placeholder="Rechercher..."
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Sans icônes
                    </h3>
                    <Button 
                      size="sm" 
                      onClick={() => setIsOpen(true)}
                    >
                      Ouvrir
                    </Button>
                    <CommandPalette
                      isOpen={isOpen}
                      onClose={() => setIsOpen(false)}
                      groups={groups.map(group => ({
                        ...group,
                        items: group.items.map(item => ({
                          ...item,
                          icon: undefined,
                        })),
                      }))}
                      placeholder="Tapez une commande..."
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full h-full">
                  <CodeBlock
                    onCopy={() =>
                      handleCopy(
                        `// Groupe simple
<CommandPalette
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  groups={groups.slice(0, 1)}
  placeholder="Rechercher..."
/>

// Sans icônes
<CommandPalette
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  groups={groups.map(group => ({
    ...group,
    items: group.items.map(item => ({
      ...item,
      icon: undefined,
    })),
  }))}
  placeholder="Tapez une commande..."
/>

// Avec raccourcis clavier
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.metaKey && e.key === 'k') {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  document.addEventListener('keydown', handleKeyDown);
  return () => document.removeEventListener('keydown', handleKeyDown);
}, []);

// Placeholder personnalisé
<CommandPalette
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  groups={groups}
  placeholder="Appuyez sur Cmd+K pour rechercher..."
/>`,
                        'variants'
                      )
                    }
                  >
                    {`// Groupe simple
<CommandPalette
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  groups={groups.slice(0, 1)}
  placeholder="Rechercher..."
/>

// Sans icônes
<CommandPalette
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  groups={groups.map(group => ({
    ...group,
    items: group.items.map(item => ({
      ...item,
      icon: undefined,
    })),
  }))}
  placeholder="Tapez une commande..."
/>

// Avec raccourcis clavier
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.metaKey && e.key === 'k') {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  document.addEventListener('keydown', handleKeyDown);
  return () => document.removeEventListener('keydown', handleKeyDown);
}, []);

// Placeholder personnalisé
<CommandPalette
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  groups={groups}
  placeholder="Appuyez sur Cmd+K pour rechercher..."
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
