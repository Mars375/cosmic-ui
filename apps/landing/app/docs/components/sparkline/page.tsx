'use client';

import { useState } from 'react';
import { Sparkline } from '@cosmic-ui/ui';

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

export default function SparklinePage() {
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

  const sampleData = [10, 25, 15, 30, 20, 35, 25, 40, 30, 45, 35, 50];
  const salesData = [120, 150, 180, 200, 170, 220, 190, 250, 210, 280, 240, 300];
  const userData = [80, 95, 110, 125, 105, 140, 120, 160, 135, 180, 150, 200];

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
          <h1 className="text-4xl font-bold">Sparkline</h1>
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
          Un composant de graphique sparkline pour afficher des tendances
          compactes dans des tableaux ou des cartes.
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
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Ventes</span>
                    <span className="text-sm text-cosmic-muted-foreground">
                      +12.5%
                    </span>
                  </div>
                  <Sparkline
                    data={sampleData}
                    width={200}
                    height={40}
                    stroke="#6366f1"
                    strokeWidth={2}
                    showDots={true}
                    dotRadius={2}
                  />
                </div>
              </div>
            ) : (
              <div className="w-full h-full">
                <CodeBlock
                  onCopy={() =>
                    handleCopy(
                      `import { Sparkline } from '@cosmic-ui/ui';

const data = [10, 25, 15, 30, 20, 35, 25, 40, 30, 45, 35, 50];

export function MySparkline() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Ventes</span>
        <span className="text-sm text-cosmic-muted-foreground">
          +12.5%
        </span>
      </div>
      <Sparkline
        data={data}
        width={200}
        height={40}
        stroke="#6366f1"
        strokeWidth={2}
        showDots={true}
        dotRadius={2}
      />
    </div>
  );
}`,
                      'main'
                    )
                  }
                >
                  {`import { Sparkline } from '@cosmic-ui/ui';

const data = [10, 25, 15, 30, 20, 35, 25, 40, 30, 45, 35, 50];

export function MySparkline() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Ventes</span>
        <span className="text-sm text-cosmic-muted-foreground">
          +12.5%
        </span>
      </div>
      <Sparkline
        data={data}
        width={200}
        height={40}
        stroke="#6366f1"
        strokeWidth={2}
        showDots={true}
        dotRadius={2}
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
              Le composant Sparkline est déjà inclus dans le package
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
              Utilisez le composant pour afficher des tendances compactes.
            </p>
            <CodeBlock
              onCopy={() =>
                handleCopy(
                  `import { Sparkline } from '@cosmic-ui/ui';

const data = [10, 25, 15, 30, 20, 35, 25, 40];

<Sparkline
  data={data}
  width={200}
  height={40}
  stroke="#6366f1"
  strokeWidth={2}
  showDots={true}
/>`,
                  'usage'
                )
              }
            >
              {`import { Sparkline } from '@cosmic-ui/ui';

const data = [10, 25, 15, 30, 20, 35, 25, 40];

<Sparkline
  data={data}
  width={200}
  height={40}
  stroke="#6366f1"
  strokeWidth={2}
  showDots={true}
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
                      Sans points
                    </h3>
                    <Sparkline
                      data={salesData}
                      width={180}
                      height={30}
                      stroke="#22c55e"
                      strokeWidth={2}
                      showDots={false}
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Avec points
                    </h3>
                    <Sparkline
                      data={userData}
                      width={180}
                      height={30}
                      stroke="#eab308"
                      strokeWidth={2}
                      showDots={true}
                      dotRadius={3}
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Ligne fine
                    </h3>
                    <Sparkline
                      data={sampleData}
                      width={180}
                      height={30}
                      stroke="#ef4444"
                      strokeWidth={1}
                      showDots={false}
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full h-full">
                  <CodeBlock
                    onCopy={() =>
                      handleCopy(
                        `// Sans points
<Sparkline
  data={data}
  width={200}
  height={40}
  stroke="#22c55e"
  strokeWidth={2}
  showDots={false}
/>

// Avec points
<Sparkline
  data={data}
  width={200}
  height={40}
  stroke="#eab308"
  strokeWidth={2}
  showDots={true}
  dotRadius={3}
/>

// Ligne fine
<Sparkline
  data={data}
  width={200}
  height={40}
  stroke="#ef4444"
  strokeWidth={1}
  showDots={false}
/>

// Avec padding personnalisé
<Sparkline
  data={data}
  width={200}
  height={40}
  stroke="#6366f1"
  strokeWidth={2}
  showDots={true}
  paddingX={10}
  paddingY={5}
/>`,
                        'variants'
                      )
                    }
                  >
                    {`// Sans points
<Sparkline
  data={data}
  width={200}
  height={40}
  stroke="#22c55e"
  strokeWidth={2}
  showDots={false}
/>

// Avec points
<Sparkline
  data={data}
  width={200}
  height={40}
  stroke="#eab308"
  strokeWidth={2}
  showDots={true}
  dotRadius={3}
/>

// Ligne fine
<Sparkline
  data={data}
  width={200}
  height={40}
  stroke="#ef4444"
  strokeWidth={1}
  showDots={false}
/>

// Avec padding personnalisé
<Sparkline
  data={data}
  width={200}
  height={40}
  stroke="#6366f1"
  strokeWidth={2}
  showDots={true}
  paddingX={10}
  paddingY={5}
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
