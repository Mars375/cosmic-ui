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
    <div className="relative mb-6">
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-700 px-3 py-1">
          <div className="bg-gray-800 dark:bg-gray-200 flex size-4 items-center justify-center rounded-[1px] opacity-70">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="fill-gray-200 dark:fill-gray-800 w-4 h-4"
            >
              <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"></path>
            </svg>
          </div>
          <span className="text-gray-600 dark:text-gray-400 text-sm">code.tsx</span>
          <button
            onClick={onCopy}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors ml-auto"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </button>
        </div>
        <div className="px-4 py-3.5 bg-white dark:bg-black overflow-x-auto">
          <pre className="font-mono text-sm leading-relaxed whitespace-pre-wrap" data-line>
            <code>{children}</code>
          </pre>
        </div>
      </div>
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

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2 min-h-[450px] w-[500px] flex justify-start">
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
              <div className="w-full">
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
                  {<>
                    <span className="keyword">import</span>{' '}
                    <span>&#123;</span> VisuallyHidden, SkipLink{' '}
                    <span>&#125;</span> <span className="keyword">from</span>{' '}
                    <span className="string">'@cosmic-ui/ui'</span>;<br />
                    <span className="keyword">import</span>{' '}
                    <span>&#123;</span> Button{' '}
                    <span>&#125;</span> <span className="keyword">from</span>{' '}
                    <span className="string">'@cosmic-ui/ui'</span>;<br />
                    <span className="keyword">import</span>{' '}
                    <span>&#123;</span> Eye, EyeOff{' '}
                    <span>&#125;</span> <span className="keyword">from</span>{' '}
                    <span className="string">'lucide-react'</span>;<br /><br />
                    <span className="keyword">export function</span>{' '}
                    <span className="function">MyA11yHelpers</span>(){' '}
                    <span>&#123;</span><br />
                    &nbsp;&nbsp;<span className="keyword">return</span> (<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="tag">div</span> className=
                    <span className="string">"space-y-4"</span><span>&gt;</span><br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="comment">&#123;/* SkipLink pour la navigation */&#125;</span><br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="tag">SkipLink</span> href=
                    <span className="string">"#main"</span><span>&gt;</span><br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Aller au contenu principal<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="tag">/SkipLink</span><span>&gt;</span><br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="comment">&#123;/* VisuallyHidden pour les lecteurs d'écran */&#125;</span><br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="tag">Button</span><span>&gt;</span><br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="tag">Eye</span> className=
                    <span className="string">"w-4 h-4"</span> /<span>&gt;</span><br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="tag">VisuallyHidden</span><span>&gt;</span>Voir le contenu<span className="tag">/VisuallyHidden</span><span>&gt;</span><br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="tag">/Button</span><span>&gt;</span><br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="comment">&#123;/* Exemple combiné */&#125;</span><br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="tag">div</span> className=
                    <span className="string">"space-y-2"</span><span>&gt;</span><br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="tag">SkipLink</span> href=
                    <span className="string">"#navigation"</span><span>&gt;</span><br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Aller à la navigation<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="tag">/SkipLink</span><span>&gt;</span><br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="tag">Button</span><span>&gt;</span><br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="tag">EyeOff</span> className=
                    <span className="string">"w-4 h-4"</span> /<span>&gt;</span><br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="tag">VisuallyHidden</span><span>&gt;</span>Masquer le contenu<span className="tag">/VisuallyHidden</span><span>&gt;</span><br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="tag">/Button</span><span>&gt;</span><br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="tag">/div</span><span>&gt;</span><br />
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="tag">/div</span><span>&gt;</span><br />
                    &nbsp;&nbsp;);<br />
                    <span>&#125;</span>
                  </>}
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
              {<>
                <span className="keyword">npm</span> <span className="function">install</span> <span className="string">@cosmic-ui/ui</span>
              </>}
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
              {<>
                <span className="keyword">import</span>{' '}
                <span>&#123;</span> VisuallyHidden, SkipLink{' '}
                <span>&#125;</span> <span className="keyword">from</span>{' '}
                <span className="string">'@cosmic-ui/ui'</span>;<br /><br />
                <span className="comment">// SkipLink pour la navigation</span><br />
                <span className="tag">SkipLink</span> href=
                <span className="string">"#main"</span><span>&gt;</span><br />
                &nbsp;&nbsp;Aller au contenu principal<br />
                <span className="tag">/SkipLink</span><span>&gt;</span><br /><br />
                <span className="comment">// VisuallyHidden pour les lecteurs d'écran</span><br />
                <span className="tag">Button</span><span>&gt;</span><br />
                &nbsp;&nbsp;<span className="tag">Icon</span> /<span>&gt;</span><br />
                &nbsp;&nbsp;<span className="tag">VisuallyHidden</span><span>&gt;</span>Description de l'action<span className="tag">/VisuallyHidden</span><span>&gt;</span><br />
                <span className="tag">/Button</span><span>&gt;</span>
              </>}
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

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2 min-h-[450px] w-[500px] flex justify-start">
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
                <div className="w-full">
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
                    {<>
                      <span className="comment">// SkipLink personnalisé</span><br />
                      <span className="tag">SkipLink</span> href=
                      <span className="string">"#footer"</span><span>&gt;</span><br />
                      &nbsp;&nbsp;Aller au pied de page<br />
                      <span className="tag">/SkipLink</span><span>&gt;</span><br /><br />
                      <span className="comment">// VisuallyHidden avec texte descriptif</span><br />
                      <span className="tag">Button</span><span>&gt;</span><br />
                      &nbsp;&nbsp;<span className="tag">SkipForward</span> className=
                      <span className="string">"w-4 h-4"</span> /<span>&gt;</span><br />
                      &nbsp;&nbsp;<span className="tag">VisuallyHidden</span><span>&gt;</span>Passer à la section suivante<span className="tag">/VisuallyHidden</span><span>&gt;</span><br />
                      <span className="tag">/Button</span><span>&gt;</span><br /><br />
                      <span className="comment">// SkipLink avec contenu personnalisé</span><br />
                      <span className="tag">SkipLink</span> href=
                      <span className="string">"#search"</span><span>&gt;</span><br />
                      &nbsp;&nbsp;<span className="tag">span</span> className=
                      <span className="string">"flex items-center gap-2"</span><span>&gt;</span><br />
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="tag">SearchIcon</span> className=
                      <span className="string">"w-4 h-4"</span> /<span>&gt;</span><br />
                      &nbsp;&nbsp;&nbsp;&nbsp;Aller à la recherche<br />
                      &nbsp;&nbsp;<span className="tag">/span</span><span>&gt;</span><br />
                      <span className="tag">/SkipLink</span><span>&gt;</span><br /><br />
                      <span className="comment">// VisuallyHidden pour les formulaires</span><br />
                      <span className="tag">label</span><span>&gt;</span><br />
                      &nbsp;&nbsp;Email<br />
                      &nbsp;&nbsp;<span className="tag">VisuallyHidden</span><span>&gt;</span>(requis)<span className="tag">/VisuallyHidden</span><span>&gt;</span><br />
                      &nbsp;&nbsp;<span className="tag">Input</span> type=
                      <span className="string">"email"</span> required /<span>&gt;</span><br />
                      <span className="tag">/label</span><span>&gt;</span><br /><br />
                      <span className="comment">// SkipLink pour les sections importantes</span><br />
                      <span className="tag">SkipLink</span> href=
                      <span className="string">"#main-content"</span><span>&gt;</span><br />
                      &nbsp;&nbsp;Aller au contenu principal<br />
                      <span className="tag">/SkipLink</span><span>&gt;</span><br /><br />
                      <span className="comment">// VisuallyHidden pour les icônes</span><br />
                      <span className="tag">Button</span><span>&gt;</span><br />
                      &nbsp;&nbsp;<span className="tag">DownloadIcon</span> className=
                      <span className="string">"w-4 h-4"</span> /<span>&gt;</span><br />
                      &nbsp;&nbsp;<span className="tag">VisuallyHidden</span><span>&gt;</span>Télécharger le fichier<span className="tag">/VisuallyHidden</span><span>&gt;</span><br />
                      <span className="tag">/Button</span><span>&gt;</span>
                    </>}
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
