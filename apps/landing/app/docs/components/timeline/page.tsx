'use client';

import { useState } from 'react';
import { Timeline } from '@cosmic-ui/components';

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

export default function TimelinePage() {
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

  const sampleItems = [
    {
      id: 1,
      title: 'Projet lancé',
      description: 'Le projet a été officiellement lancé avec l\'équipe de développement.',
      time: '15 Jan 2024',
    },
    {
      id: 2,
      title: 'Première version',
      description: 'Version alpha publiée avec les fonctionnalités de base.',
      time: '28 Fév 2024',
    },
    {
      id: 3,
      title: 'Tests utilisateurs',
      description: 'Phase de tests avec un groupe d\'utilisateurs bêta.',
      time: '15 Mar 2024',
    },
    {
      id: 4,
      title: 'Version finale',
      description: 'Publication de la version 1.0 avec toutes les fonctionnalités.',
      time: '10 Avr 2024',
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
          <h1 className="text-4xl font-bold">Timeline</h1>
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
          Un composant de timeline pour afficher une chronologie d'événements
          avec descriptions et timestamps.
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
                <Timeline items={sampleItems} />
              </div>
            ) : (
              <div className="w-full h-full">
                <CodeBlock
                  onCopy={() =>
                    handleCopy(
                      `import { Timeline } from '@cosmic-ui/components';

const items = [
  {
    id: 1,
    title: 'Projet lancé',
    description: 'Le projet a été officiellement lancé avec l\\'équipe de développement.',
    time: '15 Jan 2024',
  },
  {
    id: 2,
    title: 'Première version',
    description: 'Version alpha publiée avec les fonctionnalités de base.',
    time: '28 Fév 2024',
  },
  {
    id: 3,
    title: 'Tests utilisateurs',
    description: 'Phase de tests avec un groupe d\\'utilisateurs bêta.',
    time: '15 Mar 2024',
  },
  {
    id: 4,
    title: 'Version finale',
    description: 'Publication de la version 1.0 avec toutes les fonctionnalités.',
    time: '10 Avr 2024',
  },
];

export function MyTimeline() {
  return <Timeline items={items} />;
}`,
                      'main'
                    )
                  }
                >
                  {`import { Timeline } from '@cosmic-ui/components';

const items = [
  {
    id: 1,
    title: 'Projet lancé',
    description: 'Le projet a été officiellement lancé avec l\\'équipe de développement.',
    time: '15 Jan 2024',
  },
  {
    id: 2,
    title: 'Première version',
    description: 'Version alpha publiée avec les fonctionnalités de base.',
    time: '28 Fév 2024',
  },
  {
    id: 3,
    title: 'Tests utilisateurs',
    description: 'Phase de tests avec un groupe d\\'utilisateurs bêta.',
    time: '15 Mar 2024',
  },
  {
    id: 4,
    title: 'Version finale',
    description: 'Publication de la version 1.0 avec toutes les fonctionnalités.',
    time: '10 Avr 2024',
  },
];

export function MyTimeline() {
  return <Timeline items={items} />;
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
              Le composant Timeline est déjà inclus dans le package
              @cosmic-ui/components.
            </p>
            <CodeBlock
              onCopy={() =>
                handleCopy(`npm install @cosmic-ui/components`, 'install')
              }
            >
              {`npm install @cosmic-ui/components`}
            </CodeBlock>
          </div>
        </div>

        {/* Usage */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Utilisation</h2>
          <div className="bg-cosmic-card border border-cosmic-border rounded-lg p-4">
            <p className="text-cosmic-muted-foreground mb-4">
              Utilisez le composant pour afficher une chronologie d'événements.
            </p>
            <CodeBlock
              onCopy={() =>
                handleCopy(
                  `import { Timeline } from '@cosmic-ui/components';

const items = [
  {
    id: 1,
    title: 'Événement 1',
    description: 'Description de l\\'événement',
    time: '2024-01-01',
  },
  // ...
];

<Timeline items={items} />`,
                  'usage'
                )
              }
            >
              {`import { Timeline } from '@cosmic-ui/components';

const items = [
  {
    id: 1,
    title: 'Événement 1',
    description: 'Description de l\\'événement',
    time: '2024-01-01',
  },
  // ...
];

<Timeline items={items} />`}
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
                      Timeline simple
                    </h3>
                    <Timeline
                      items={[
                        {
                          id: 1,
                          title: 'Étape 1',
                          time: '10:00',
                        },
                        {
                          id: 2,
                          title: 'Étape 2',
                          time: '11:00',
                        },
                      ]}
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Avec descriptions
                    </h3>
                    <Timeline
                      items={[
                        {
                          id: 1,
                          title: 'Connexion',
                          description: 'Utilisateur connecté avec succès',
                          time: '09:30',
                        },
                        {
                          id: 2,
                          title: 'Action effectuée',
                          description: 'L\\'utilisateur a effectué une action importante',
                          time: '09:45',
                        },
                      ]}
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full h-full">
                  <CodeBlock
                    onCopy={() =>
                      handleCopy(
                        `// Timeline simple
<Timeline
  items={[
    {
      id: 1,
      title: 'Étape 1',
      time: '10:00',
    },
    {
      id: 2,
      title: 'Étape 2',
      time: '11:00',
    },
  ]}
/>

// Avec descriptions
<Timeline
  items={[
    {
      id: 1,
      title: 'Connexion',
      description: 'Utilisateur connecté avec succès',
      time: '09:30',
    },
    {
      id: 2,
      title: 'Action effectuée',
      description: 'L\\'utilisateur a effectué une action importante',
      time: '09:45',
    },
  ]}
/>

// Sans timestamps
<Timeline
  items={[
    {
      id: 1,
      title: 'Événement 1',
      description: 'Description sans heure',
    },
    {
      id: 2,
      title: 'Événement 2',
      description: 'Autre description',
    },
  ]}
/>`,
                        'variants'
                      )
                    }
                  >
                    {`// Timeline simple
<Timeline
  items={[
    {
      id: 1,
      title: 'Étape 1',
      time: '10:00',
    },
    {
      id: 2,
      title: 'Étape 2',
      time: '11:00',
    },
  ]}
/>

// Avec descriptions
<Timeline
  items={[
    {
      id: 1,
      title: 'Connexion',
      description: 'Utilisateur connecté avec succès',
      time: '09:30',
    },
    {
      id: 2,
      title: 'Action effectuée',
      description: 'L\\'utilisateur a effectué une action importante',
      time: '09:45',
    },
  ]}
/>

// Sans timestamps
<Timeline
  items={[
    {
      id: 1,
      title: 'Événement 1',
      description: 'Description sans heure',
    },
    {
      id: 2,
      title: 'Événement 2',
      description: 'Autre description',
    },
  ]}
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
