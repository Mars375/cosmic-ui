'use client';

import { useState } from 'react';
import { VisuallyHidden, SkipLink } from '@cosmic-ui/ui';
import { Button } from '@cosmic-ui/ui';
import { Eye, EyeOff, SkipForward } from 'lucide-react';

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

export default function A11yHelpersPage() {
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
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
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
          <h1 className="text-4xl font-bold">A11y Helpers</h1>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
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
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Des composants utilitaires pour améliorer l'accessibilité de vos
          applications.
        </p>

        {/* Main Preview */}
        <div className="mb-12">
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setShowCode(false)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                !showCode
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Preview
            </button>
            <button
              onClick={() => setShowCode(true)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                showCode
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Code
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2 h-[450px] w-[500px] flex justify-start">
            {!showCode ? (
              <div className="p-4 w-full">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">SkipLink</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                      Appuyez sur Tab pour voir le lien de saut
                    </p>
                    <SkipLink href="#main">
                      Aller au contenu principal
                    </SkipLink>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">VisuallyHidden</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                      Texte caché visuellement mais accessible aux lecteurs d'écran
                    </p>
                    <Button>
                      <Eye className="w-4 h-4" />
                      <VisuallyHidden>Voir le contenu</VisuallyHidden>
                    </Button>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Exemple combiné</h3>
                    <div className="space-y-2">
                      <SkipLink href="#navigation">
                        Aller à la navigation
                      </SkipLink>
                      <Button>
                        <EyeOff className="w-4 h-4" />
                        <VisuallyHidden>Masquer le contenu</VisuallyHidden>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-full">
                <CodeBlock
                  onCopy={() =>
                    handleCopy(
                      `import { VisuallyHidden, SkipLink } from '@cosmic-ui/ui';
import { Button } from '@cosmic-ui/ui';
import { Eye, EyeOff } from 'lucide-react';

export function MyA11yHelpers() {
  return (
    <div className="space-y-4">
      {/* SkipLink pour la navigation */}
      <SkipLink href="#main">
        Aller au contenu principal
      </SkipLink>
      
      {/* VisuallyHidden pour les lecteurs d'écran */}
      <Button>
        <Eye className="w-4 h-4" />
        <VisuallyHidden>Voir le contenu</VisuallyHidden>
      </Button>
      
      {/* Exemple combiné */}
      <div className="space-y-2">
        <SkipLink href="#navigation">
          Aller à la navigation
        </SkipLink>
        <Button>
          <EyeOff className="w-4 h-4" />
          <VisuallyHidden>Masquer le contenu</VisuallyHidden>
        </Button>
      </div>
    </div>
  );
}`,
                      'main'
                    )
                  }
                >
                  {`import { VisuallyHidden, SkipLink } from '@cosmic-ui/ui';
import { Button } from '@cosmic-ui/ui';
import { Eye, EyeOff } from 'lucide-react';

export function MyA11yHelpers() {
  return (
    <div className="space-y-4">
      {/* SkipLink pour la navigation */}
      <SkipLink href="#main">
        Aller au contenu principal
      </SkipLink>
      
      {/* VisuallyHidden pour les lecteurs d'écran */}
      <Button>
        <Eye className="w-4 h-4" />
        <VisuallyHidden>Voir le contenu</VisuallyHidden>
      </Button>
      
      {/* Exemple combiné */}
      <div className="space-y-2">
        <SkipLink href="#navigation">
          Aller à la navigation
        </SkipLink>
        <Button>
          <EyeOff className="w-4 h-4" />
          <VisuallyHidden>Masquer le contenu</VisuallyHidden>
        </Button>
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
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Les composants A11y Helpers sont déjà inclus dans le package
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
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Utilisez ces composants pour améliorer l'accessibilité de votre application.
            </p>
            <CodeBlock
              onCopy={() =>
                handleCopy(
                  `import { VisuallyHidden, SkipLink } from '@cosmic-ui/ui';

// SkipLink pour la navigation
<SkipLink href="#main">
  Aller au contenu principal
</SkipLink>

// VisuallyHidden pour les lecteurs d'écran
<Button>
  <Icon />
  <VisuallyHidden>Description de l'action</VisuallyHidden>
</Button>`,
                  'usage'
                )
              }
            >
              {`import { VisuallyHidden, SkipLink } from '@cosmic-ui/ui';

// SkipLink pour la navigation
<SkipLink href="#main">
  Aller au contenu principal
</SkipLink>

// VisuallyHidden pour les lecteurs d'écran
<Button>
  <Icon />
  <VisuallyHidden>Description de l'action</VisuallyHidden>
</Button>`}
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
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                Preview
              </button>
              <button
                onClick={() => setShowCodeVariants(true)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  showCodeVariants
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                Code
              </button>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2 h-[450px] w-[500px] flex justify-start">
              {!showCodeVariants ? (
                <div className="p-4 w-full space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      SkipLink personnalisé
                    </h3>
                    <SkipLink href="#footer">
                      Aller au pied de page
                    </SkipLink>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      VisuallyHidden avec texte
                    </h3>
                    <Button>
                      <SkipForward className="w-4 h-4" />
                      <VisuallyHidden>Passer à la section suivante</VisuallyHidden>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full">
                  <CodeBlock
                    onCopy={() =>
                      handleCopy(
                        `// SkipLink personnalisé
<SkipLink href="#footer">
  Aller au pied de page
</SkipLink>

// VisuallyHidden avec texte descriptif
<Button>
  <SkipForward className="w-4 h-4" />
  <VisuallyHidden>Passer à la section suivante</VisuallyHidden>
</Button>

// SkipLink avec contenu personnalisé
<SkipLink href="#search">
  <span className="flex items-center gap-2">
    <SearchIcon className="w-4 h-4" />
    Aller à la recherche
  </span>
</SkipLink>

// VisuallyHidden pour les formulaires
<label>
  Email
  <VisuallyHidden>(requis)</VisuallyHidden>
  <Input type="email" required />
</label>

// SkipLink pour les sections importantes
<SkipLink href="#main-content">
  Aller au contenu principal
</SkipLink>

// VisuallyHidden pour les icônes
<Button>
  <DownloadIcon className="w-4 h-4" />
  <VisuallyHidden>Télécharger le fichier</VisuallyHidden>
</Button>`,
                        'variants'
                      )
                    }
                  >
                    {`// SkipLink personnalisé
<SkipLink href="#footer">
  Aller au pied de page
</SkipLink>

// VisuallyHidden avec texte descriptif
<Button>
  <SkipForward className="w-4 h-4" />
  <VisuallyHidden>Passer à la section suivante</VisuallyHidden>
</Button>

// SkipLink avec contenu personnalisé
<SkipLink href="#search">
  <span className="flex items-center gap-2">
    <SearchIcon className="w-4 h-4" />
    Aller à la recherche
  </span>
</SkipLink>

// VisuallyHidden pour les formulaires
<label>
  Email
  <VisuallyHidden>(requis)</VisuallyHidden>
  <Input type="email" required />
</label>

// SkipLink pour les sections importantes
<SkipLink href="#main-content">
  Aller au contenu principal
</SkipLink>

// VisuallyHidden pour les icônes
<Button>
  <DownloadIcon className="w-4 h-4" />
  <VisuallyHidden>Télécharger le fichier</VisuallyHidden>
</Button>`}
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
