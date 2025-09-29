'use client';

import { useState } from 'react';
import { 
  DropdownMenu, 
  DropdownTrigger, 
  DropdownContent, 
  DropdownItem, 
  DropdownSeparator, 
  DropdownLabel 
} from '@cosmic-ui/ui';
import { Button } from '@cosmic-ui/ui';

const CodeBlock = ({ children, onCopy }: { children: string; onCopy: () => void }) => {
  return (
    <div className="relative">
      <pre className="bg-white dark:bg-black p-2 rounded-lg overflow-x-auto text-sm">
        <code>{children}</code>
      </pre>
      <button
        onClick={onCopy}
        className="absolute top-2 right-2 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z" fill="currentColor"/>
        </svg>
      </button>
    </div>
  );
};

export default function DropdownMenuPage() {
  const [showCode, setShowCode] = useState(false);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStates(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCopiedStates(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h1 className="text-3xl font-bold">Dropdown Menu</h1>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Summary */}
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Le composant Dropdown Menu affiche une liste d'actions contextuelles dans un menu déroulant, 
          idéal pour les actions secondaires et l'organisation de l'interface.
        </p>

        {/* Main Preview */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-xl font-semibold">Aperçu</h2>
            <div className="flex bg-white dark:bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setShowCode(false)}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  !showCode ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-white'
                }`}
              >
                Aperçu
              </button>
              <button
                onClick={() => setShowCode(true)}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  showCode ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-white'
                }`}
              >
                Code
              </button>
            </div>
          </div>

          <div className="w-[500px] min-h-[450px] border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 p-2 flex justify-start">
            {!showCode ? (
              <div className="p-4">
                <DropdownMenu>
                  <DropdownTrigger asChild>
                    <Button variant="outline">Actions</Button>
                  </DropdownTrigger>
                  <DropdownContent>
                    <DropdownItem>Modifier</DropdownItem>
                    <DropdownItem>Dupliquer</DropdownItem>
                    <DropdownSeparator />
                    <DropdownItem>Supprimer</DropdownItem>
                  </DropdownContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="w-full bg-white dark:bg-black p-2 rounded">
                <CodeBlock onCopy={() => copyToClipboard(`import { 
  DropdownMenu, 
  DropdownTrigger, 
  DropdownContent, 
  DropdownItem, 
  DropdownSeparator 
} from '@cosmic-ui/ui';
import { Button } from '@cosmic-ui/ui';

export default function MyComponent() {
  return (
    <DropdownMenu>
      <DropdownTrigger asChild>
        <Button variant="outline">Actions</Button>
      </DropdownTrigger>
      <DropdownContent>
        <DropdownItem>Modifier</DropdownItem>
        <DropdownItem>Dupliquer</DropdownItem>
        <DropdownSeparator />
        <DropdownItem>Supprimer</DropdownItem>
      </DropdownContent>
    </DropdownMenu>
  );
}`, 'main')}>
{`import { 
  DropdownMenu, 
  DropdownTrigger, 
  DropdownContent, 
  DropdownItem, 
  DropdownSeparator 
} from '@cosmic-ui/ui';
import { Button } from '@cosmic-ui/ui';

export default function MyComponent() {
  return (
    <DropdownMenu>
      <DropdownTrigger asChild>
        <Button variant="outline">Actions</Button>
      </DropdownTrigger>
      <DropdownContent>
        <DropdownItem>Modifier</DropdownItem>
        <DropdownItem>Dupliquer</DropdownItem>
        <DropdownSeparator />
        <DropdownItem>Supprimer</DropdownItem>
      </DropdownContent>
    </DropdownMenu>
  );
}`}
                </CodeBlock>
              </div>
            )}
          </div>
        </div>

        {/* Installation */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Installation</h2>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <CodeBlock onCopy={() => copyToClipboard('npm install @cosmic-ui/ui', 'install')}>
{`npm install @cosmic-ui/ui`}
            </CodeBlock>
          </div>
        </div>

        {/* Usage */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Utilisation</h2>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <CodeBlock onCopy={() => copyToClipboard(`import { 
  DropdownMenu, 
  DropdownTrigger, 
  DropdownContent, 
  DropdownItem, 
  DropdownSeparator,
  DropdownLabel 
} from '@cosmic-ui/ui';

export default function MyComponent() {
  return (
    <DropdownMenu>
      <DropdownTrigger asChild>
        <button>Menu</button>
      </DropdownTrigger>
      <DropdownContent>
        <DropdownLabel>Actions</DropdownLabel>
        <DropdownItem>Éditer</DropdownItem>
        <DropdownItem>Partager</DropdownItem>
        <DropdownSeparator />
        <DropdownItem>Supprimer</DropdownItem>
      </DropdownContent>
    </DropdownMenu>
  );
}`, 'usage')}>
{`import { 
  DropdownMenu, 
  DropdownTrigger, 
  DropdownContent, 
  DropdownItem, 
  DropdownSeparator,
  DropdownLabel 
} from '@cosmic-ui/ui';

export default function MyComponent() {
  return (
    <DropdownMenu>
      <DropdownTrigger asChild>
        <button>Menu</button>
      </DropdownTrigger>
      <DropdownContent>
        <DropdownLabel>Actions</DropdownLabel>
        <DropdownItem>Éditer</DropdownItem>
        <DropdownItem>Partager</DropdownItem>
        <DropdownSeparator />
        <DropdownItem>Supprimer</DropdownItem>
      </DropdownContent>
    </DropdownMenu>
  );
}`}
            </CodeBlock>
          </div>
        </div>

        {/* Variants */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-6">Variantes</h2>

          {/* With Labels */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <h3 className="text-lg font-medium">Avec labels</h3>
              <div className="flex bg-white dark:bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setShowCode(false)}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    !showCode ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-white'
                  }`}
                >
                  Aperçu
                </button>
                <button
                  onClick={() => setShowCode(true)}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    showCode ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-white'
                  }`}
                >
                  Code
                </button>
              </div>
            </div>

            <div className="w-[500px] min-h-[450px] border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 p-2 flex justify-start">
              {!showCode ? (
                <div className="p-4">
                  <DropdownMenu>
                    <DropdownTrigger asChild>
                      <Button variant="outline">Options</Button>
                    </DropdownTrigger>
                    <DropdownContent>
                      <DropdownLabel>Fichier</DropdownLabel>
                      <DropdownItem>Nouveau</DropdownItem>
                      <DropdownItem>Ouvrir</DropdownItem>
                      <DropdownItem>Sauvegarder</DropdownItem>
                      <DropdownSeparator />
                      <DropdownLabel>Édition</DropdownLabel>
                      <DropdownItem>Annuler</DropdownItem>
                      <DropdownItem>Refaire</DropdownItem>
                    </DropdownContent>
                  </DropdownMenu>
                </div>
              ) : (
                <div className="w-full bg-white dark:bg-black p-2 rounded">
                  <CodeBlock onCopy={() => copyToClipboard(`import { 
  DropdownMenu, 
  DropdownTrigger, 
  DropdownContent, 
  DropdownItem, 
  DropdownSeparator,
  DropdownLabel 
} from '@cosmic-ui/ui';
import { Button } from '@cosmic-ui/ui';

export default function MyComponent() {
  return (
    <DropdownMenu>
      <DropdownTrigger asChild>
        <Button variant="outline">Options</Button>
      </DropdownTrigger>
      <DropdownContent>
        <DropdownLabel>Fichier</DropdownLabel>
        <DropdownItem>Nouveau</DropdownItem>
        <DropdownItem>Ouvrir</DropdownItem>
        <DropdownItem>Sauvegarder</DropdownItem>
        <DropdownSeparator />
        <DropdownLabel>Édition</DropdownLabel>
        <DropdownItem>Annuler</DropdownItem>
        <DropdownItem>Refaire</DropdownItem>
      </DropdownContent>
    </DropdownMenu>
  );
}`, 'with-labels')}>
{`import { 
  DropdownMenu, 
  DropdownTrigger, 
  DropdownContent, 
  DropdownItem, 
  DropdownSeparator,
  DropdownLabel 
} from '@cosmic-ui/ui';
import { Button } from '@cosmic-ui/ui';

export default function MyComponent() {
  return (
    <DropdownMenu>
      <DropdownTrigger asChild>
        <Button variant="outline">Options</Button>
      </DropdownTrigger>
      <DropdownContent>
        <DropdownLabel>Fichier</DropdownLabel>
        <DropdownItem>Nouveau</DropdownItem>
        <DropdownItem>Ouvrir</DropdownItem>
        <DropdownItem>Sauvegarder</DropdownItem>
        <DropdownSeparator />
        <DropdownLabel>Édition</DropdownLabel>
        <DropdownItem>Annuler</DropdownItem>
        <DropdownItem>Refaire</DropdownItem>
      </DropdownContent>
    </DropdownMenu>
  );
}`}
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
