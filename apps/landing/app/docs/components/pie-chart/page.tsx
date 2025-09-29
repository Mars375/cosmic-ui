'use client';

import { useState } from 'react';
import { PieChart } from '@cosmic-ui/react';

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

export default function PieChartPage() {
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

  const sampleData = [
    { name: 'Ventes', value: 45, color: '#6366f1' },
    { name: 'Marketing', value: 25, color: '#22c55e' },
    { name: 'Support', value: 20, color: '#eab308' },
    { name: 'Autres', value: 10, color: '#ef4444' },
  ];

  const userData = [
    { name: 'Actifs', value: 65, color: '#22c55e' },
    { name: 'Inactifs', value: 25, color: '#ef4444' },
    { name: 'En attente', value: 10, color: '#eab308' },
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
          <h1 className="text-4xl font-bold">PieChart</h1>
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
          Un composant de graphique en secteurs pour visualiser des données
          catégorielles avec des couleurs personnalisables.
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
              <div className="p-4 w-full flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-sm font-medium mb-4">
                    Répartition des ventes
                  </h3>
                  <PieChart
                    data={sampleData}
                    height={200}
                    innerRadius={40}
                    appearance="dark"
                  />
                  <div className="mt-4 space-y-1">
                    {sampleData.map((item, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span>{item.name}: {item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-full">
                <CodeBlock
                  onCopy={() =>
                    handleCopy(
                      `import { PieChart } from '@cosmic-ui/react';

const data = [
  { name: 'Ventes', value: 45, color: '#6366f1' },
  { name: 'Marketing', value: 25, color: '#22c55e' },
  { name: 'Support', value: 20, color: '#eab308' },
  { name: 'Autres', value: 10, color: '#ef4444' },
];

export function MyPieChart() {
  return (
    <div className="text-center">
      <h3 className="text-sm font-medium mb-4">
        Répartition des ventes
      </h3>
      <PieChart
        data={data}
        height={200}
        innerRadius={40}
        appearance="dark"
      />
      <div className="mt-4 space-y-1">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2 text-xs">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span>{item.name}: {item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}`,
                      'main'
                    )
                  }
                >
                  {`import { PieChart } from '@cosmic-ui/react';

const data = [
  { name: 'Ventes', value: 45, color: '#6366f1' },
  { name: 'Marketing', value: 25, color: '#22c55e' },
  { name: 'Support', value: 20, color: '#eab308' },
  { name: 'Autres', value: 10, color: '#ef4444' },
];

export function MyPieChart() {
  return (
    <div className="text-center">
      <h3 className="text-sm font-medium mb-4">
        Répartition des ventes
      </h3>
      <PieChart
        data={data}
        height={200}
        innerRadius={40}
        appearance="dark"
      />
      <div className="mt-4 space-y-1">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2 text-xs">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span>{item.name}: {item.value}%</span>
          </div>
        ))}
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
          <div className="bg-cosmic-card border border-cosmic-border rounded-lg p-4">
            <p className="text-cosmic-muted-foreground mb-4">
              Le composant PieChart est déjà inclus dans le package
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
              Utilisez le composant pour créer des graphiques en secteurs.
            </p>
            <CodeBlock
              onCopy={() =>
                handleCopy(
                  `import { PieChart } from '@cosmic-ui/react';

const data = [
  { name: 'Catégorie 1', value: 40, color: '#6366f1' },
  { name: 'Catégorie 2', value: 30, color: '#22c55e' },
  { name: 'Catégorie 3', value: 30, color: '#eab308' },
];

<PieChart
  data={data}
  height={200}
  innerRadius={40}
  appearance="dark"
/>`,
                  'usage'
                )
              }
            >
              {`import { PieChart } from '@cosmic-ui/react';

const data = [
  { name: 'Catégorie 1', value: 40, color: '#6366f1' },
  { name: 'Catégorie 2', value: 30, color: '#22c55e' },
  { name: 'Catégorie 3', value: 30, color: '#eab308' },
];

<PieChart
  data={data}
  height={200}
  innerRadius={40}
  appearance="dark"
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
                  <div className="text-center">
                    <h3 className="text-sm font-medium mb-2">
                      Utilisateurs
                    </h3>
                    <PieChart
                      data={userData}
                      height={150}
                      innerRadius={30}
                      appearance="dark"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-sm font-medium mb-2">
                      Donut chart
                    </h3>
                    <PieChart
                      data={sampleData.slice(0, 3)}
                      height={120}
                      innerRadius={50}
                      appearance="dark"
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full h-full">
                  <CodeBlock
                    onCopy={() =>
                      handleCopy(
                        `// Graphique simple
<PieChart
  data={data}
  height={200}
  innerRadius={40}
  appearance="dark"
/>

// Donut chart
<PieChart
  data={data}
  height={200}
  innerRadius={60}
  appearance="dark"
/>

// Apparence claire
<PieChart
  data={data}
  height={200}
  innerRadius={40}
  appearance="light"
/>

// Sans couleurs personnalisées
const dataWithoutColors = [
  { name: 'Catégorie 1', value: 40 },
  { name: 'Catégorie 2', value: 30 },
  { name: 'Catégorie 3', value: 30 },
];

<PieChart
  data={dataWithoutColors}
  height={200}
  innerRadius={40}
  appearance="dark"
/>`,
                        'variants'
                      )
                    }
                  >
                    {`// Graphique simple
<PieChart
  data={data}
  height={200}
  innerRadius={40}
  appearance="dark"
/>

// Donut chart
<PieChart
  data={data}
  height={200}
  innerRadius={60}
  appearance="dark"
/>

// Apparence claire
<PieChart
  data={data}
  height={200}
  innerRadius={40}
  appearance="light"
/>

// Sans couleurs personnalisées
const dataWithoutColors = [
  { name: 'Catégorie 1', value: 40 },
  { name: 'Catégorie 2', value: 30 },
  { name: 'Catégorie 3', value: 30 },
];

<PieChart
  data={dataWithoutColors}
  height={200}
  innerRadius={40}
  appearance="dark"
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
