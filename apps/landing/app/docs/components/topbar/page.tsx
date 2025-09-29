'use client';

import { useState } from 'react';
import { Topbar } from '@cosmic-ui/ui';
import { Button } from '@cosmic-ui/ui';
import { Search, Bell, User, Settings } from 'lucide-react';

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

export default function TopbarPage() {
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
          <h1 className="text-4xl font-bold">Topbar</h1>
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
          Un composant de barre de navigation supérieure avec logo, recherche et
          actions.
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
                      <Button variant="ghost" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  }
                />
                <div className="mt-4 p-4 bg-cosmic-background rounded-lg">
                  <h3 className="text-lg font-medium mb-2">
                    Contenu principal
                  </h3>
                  <p className="text-cosmic-muted-foreground">
                    Le contenu de votre application apparaît ici, sous la
                    topbar.
                  </p>
                </div>
              </div>
            ) : (
              <div className="w-full h-full">
                <CodeBlock
                  onCopy={() =>
                    handleCopy(
                      `import { Topbar } from '@cosmic-ui/ui';
import { Button } from '@cosmic-ui/ui';
import { Search, Bell, User, Settings } from 'lucide-react';

export function MyTopbar() {
  return (
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
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      }
    />
  );
}`,
                      'main'
                    )
                  }
                >
                  {`import { Topbar } from '@cosmic-ui/ui';
import { Button } from '@cosmic-ui/ui';
import { Search, Bell, User, Settings } from 'lucide-react';

export function MyTopbar() {
  return (
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
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      }
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
              Le composant Topbar est déjà inclus dans le package
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
              Importez le composant et utilisez-le avec votre logo, recherche et
              actions.
            </p>
            <CodeBlock
              onCopy={() =>
                handleCopy(
                  `import { Topbar } from '@cosmic-ui/ui';

<Topbar
  logo={<span>Mon App</span>}
  search={<input placeholder="Rechercher..." />}
  actions={<button>Menu</button>}
/>`,
                  'usage'
                )
              }
            >
              {`import { Topbar } from '@cosmic-ui/ui';

<Topbar
  logo={<span>Mon App</span>}
  search={<input placeholder="Rechercher..." />}
  actions={<button>Menu</button>}
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
                <div className="p-4 w-full space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Topbar simple</h3>
                    <Topbar
                      logo={<span className="font-semibold">SimpleApp</span>}
                      actions={
                        <Button variant="ghost" size="sm">
                          <User className="w-4 h-4" />
                        </Button>
                      }
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Topbar avec recherche
                    </h3>
                    <Topbar
                      logo={<span className="font-semibold">SearchApp</span>}
                      search={
                        <input
                          type="text"
                          placeholder="Rechercher..."
                          className="px-3 py-1 bg-cosmic-background border border-cosmic-border rounded text-sm"
                        />
                      }
                      actions={
                        <Button variant="ghost" size="sm">
                          <Bell className="w-4 h-4" />
                        </Button>
                      }
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Topbar complète
                    </h3>
                    <Topbar
                      logo={<span className="font-semibold">FullApp</span>}
                      search={
                        <input
                          type="text"
                          placeholder="Rechercher..."
                          className="px-3 py-1 bg-cosmic-background border border-cosmic-border rounded text-sm"
                        />
                      }
                      actions={
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm">
                            <Bell className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Settings className="w-4 h-4" />
                          </Button>
                        </div>
                      }
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full h-full">
                  <CodeBlock
                    onCopy={() =>
                      handleCopy(
                        `// Topbar simple
<Topbar
  logo={<span className="font-semibold">SimpleApp</span>}
  actions={
    <Button variant="ghost" size="sm">
      <User className="w-4 h-4" />
    </Button>
  }
/>

// Topbar avec recherche
<Topbar
  logo={<span className="font-semibold">SearchApp</span>}
  search={
    <input
      type="text"
      placeholder="Rechercher..."
      className="px-3 py-1 bg-cosmic-background border border-cosmic-border rounded text-sm"
    />
  }
  actions={
    <Button variant="ghost" size="sm">
      <Bell className="w-4 h-4" />
    </Button>
  }
/>

// Topbar complète
<Topbar
  logo={<span className="font-semibold">FullApp</span>}
  search={
    <input
      type="text"
      placeholder="Rechercher..."
      className="px-3 py-1 bg-cosmic-background border border-cosmic-border rounded text-sm"
    />
  }
  actions={
    <div className="flex items-center gap-1">
      <Button variant="ghost" size="sm">
        <Bell className="w-4 h-4" />
      </Button>
      <Button variant="ghost" size="sm">
        <Settings className="w-4 h-4" />
      </Button>
    </div>
  }
/>`,
                        'variants'
                      )
                    }
                  >
                    {`// Topbar simple
<Topbar
  logo={<span className="font-semibold">SimpleApp</span>}
  actions={
    <Button variant="ghost" size="sm">
      <User className="w-4 h-4" />
    </Button>
  }
/>

// Topbar avec recherche
<Topbar
  logo={<span className="font-semibold">SearchApp</span>}
  search={
    <input
      type="text"
      placeholder="Rechercher..."
      className="px-3 py-1 bg-cosmic-background border border-cosmic-border rounded text-sm"
    />
  }
  actions={
    <Button variant="ghost" size="sm">
      <Bell className="w-4 h-4" />
    </Button>
  }
/>

// Topbar complète
<Topbar
  logo={<span className="font-semibold">FullApp</span>}
  search={
    <input
      type="text"
      placeholder="Rechercher..."
      className="px-3 py-1 bg-cosmic-background border border-cosmic-border rounded text-sm"
    />
  }
  actions={
    <div className="flex items-center gap-1">
      <Button variant="ghost" size="sm">
        <Bell className="w-4 h-4" />
      </Button>
      <Button variant="ghost" size="sm">
        <Settings className="w-4 h-4" />
      </Button>
    </div>
  }
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
