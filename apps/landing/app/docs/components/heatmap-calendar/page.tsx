'use client';

import { useState } from 'react';
import { HeatmapCalendar } from '@cosmic-ui/react';

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

export default function HeatmapCalendarPage() {
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

  // Données d'exemple pour la heatmap
  const generateSampleData = () => {
    const data = [];
    const today = new Date();
    for (let i = 0; i < 365; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const value = Math.floor(Math.random() * 5);
      data.push({
        date: date.toISOString().split('T')[0],
        value,
        level: value as 0 | 1 | 2 | 3 | 4,
      });
    }
    return data;
  };

  const sampleData = generateSampleData();

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
          <h1 className="text-4xl font-bold">HeatmapCalendar</h1>
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
          Un composant de calendrier heatmap pour visualiser l'activité sur une
          période donnée.
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
                <HeatmapCalendar
                  data={sampleData}
                  colorScheme="green"
                  size="sm"
                  showTooltip={true}
                  showLegend={true}
                  onDateClick={(date, value) => {
                    console.log('Date clicked:', date, 'Value:', value);
                  }}
                />
              </div>
            ) : (
              <div className="w-full h-full">
                <CodeBlock
                  onCopy={() =>
                    handleCopy(
                      `import { HeatmapCalendar } from '@cosmic-ui/react';

// Génération de données d'exemple
const generateSampleData = () => {
  const data = [];
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const value = Math.floor(Math.random() * 5);
    data.push({
      date: date.toISOString().split('T')[0],
      value,
      level: value as 0 | 1 | 2 | 3 | 4,
    });
  }
  return data;
};

export function MyHeatmapCalendar() {
  const data = generateSampleData();

  return (
    <HeatmapCalendar
      data={data}
      colorScheme="green"
      size="sm"
      showTooltip={true}
      showLegend={true}
      onDateClick={(date, value) => {
        console.log('Date clicked:', date, 'Value:', value);
      }}
    />
  );
}`,
                      'main'
                    )
                  }
                >
                  {`import { HeatmapCalendar } from '@cosmic-ui/react';

// Génération de données d'exemple
const generateSampleData = () => {
  const data = [];
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const value = Math.floor(Math.random() * 5);
    data.push({
      date: date.toISOString().split('T')[0],
      value,
      level: value as 0 | 1 | 2 | 3 | 4,
    });
  }
  return data;
};

export function MyHeatmapCalendar() {
  const data = generateSampleData();

  return (
    <HeatmapCalendar
      data={data}
      colorScheme="green"
      size="sm"
      showTooltip={true}
      showLegend={true}
      onDateClick={(date, value) => {
        console.log('Date clicked:', date, 'Value:', value);
      }}
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
              Le composant HeatmapCalendar est déjà inclus dans le package
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
              Utilisez le composant pour afficher une heatmap d'activité.
            </p>
            <CodeBlock
              onCopy={() =>
                handleCopy(
                  `import { HeatmapCalendar } from '@cosmic-ui/react';

const data = [
  { date: '2024-01-01', value: 3, level: 3 },
  { date: '2024-01-02', value: 1, level: 1 },
  // ...
];

<HeatmapCalendar
  data={data}
  colorScheme="blue"
  size="md"
  showTooltip={true}
/>`,
                  'usage'
                )
              }
            >
              {`import { HeatmapCalendar } from '@cosmic-ui/react';

const data = [
  { date: '2024-01-01', value: 3, level: 3 },
  { date: '2024-01-02', value: 1, level: 1 },
  // ...
];

<HeatmapCalendar
  data={data}
  colorScheme="blue"
  size="md"
  showTooltip={true}
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
                    <h3 className="text-sm font-medium mb-2">Couleur bleue</h3>
                    <HeatmapCalendar
                      data={sampleData.slice(0, 100)}
                      colorScheme="blue"
                      size="sm"
                      showTooltip={false}
                      showLegend={false}
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">Couleur rouge</h3>
                    <HeatmapCalendar
                      data={sampleData.slice(0, 100)}
                      colorScheme="red"
                      size="sm"
                      showTooltip={false}
                      showLegend={false}
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full h-full">
                  <CodeBlock
                    onCopy={() =>
                      handleCopy(
                        `// Couleur bleue
<HeatmapCalendar
  data={data}
  colorScheme="blue"
  size="sm"
  showTooltip={false}
  showLegend={false}
/>

// Couleur rouge
<HeatmapCalendar
  data={data}
  colorScheme="red"
  size="sm"
  showTooltip={false}
  showLegend={false}
/>

// Taille large
<HeatmapCalendar
  data={data}
  colorScheme="purple"
  size="lg"
  showTooltip={true}
  showLegend={true}
/>

// Sans labels
<HeatmapCalendar
  data={data}
  colorScheme="orange"
  size="md"
  showLabels={false}
  showTooltip={true}
/>`,
                        'variants'
                      )
                    }
                  >
                    {`// Couleur bleue
<HeatmapCalendar
  data={data}
  colorScheme="blue"
  size="sm"
  showTooltip={false}
  showLegend={false}
/>

// Couleur rouge
<HeatmapCalendar
  data={data}
  colorScheme="red"
  size="sm"
  showTooltip={false}
  showLegend={false}
/>

// Taille large
<HeatmapCalendar
  data={data}
  colorScheme="purple"
  size="lg"
  showTooltip={true}
  showLegend={true}
/>

// Sans labels
<HeatmapCalendar
  data={data}
  colorScheme="orange"
  size="md"
  showLabels={false}
  showTooltip={true}
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
