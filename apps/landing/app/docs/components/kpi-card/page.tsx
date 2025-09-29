'use client';

import { useState } from 'react';
import { KpiCard } from '@cosmic-ui/components';
import { TrendingUp, TrendingDown, Users, DollarSign, ShoppingCart, Activity } from 'lucide-react';

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

export default function KpiCardPage() {
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
          <h1 className="text-4xl font-bold">KpiCard</h1>
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
          Un composant de carte KPI pour afficher des métriques avec icônes et
          variations.
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
                <KpiCard
                  label="Ventes totales"
                  value="12,345"
                  delta={12.5}
                  deltaDirection="up"
                  icon={<TrendingUp className="w-5 h-5 text-green-500" />}
                  helperText="vs mois dernier"
                />
              </div>
            ) : (
              <div className="w-full h-full">
                <CodeBlock
                  onCopy={() =>
                    handleCopy(
                      `import { KpiCard } from '@cosmic-ui/components';
import { TrendingUp } from 'lucide-react';

export function MyKpiCard() {
  return (
    <KpiCard
      label="Ventes totales"
      value="12,345"
      delta={12.5}
      deltaDirection="up"
      icon={<TrendingUp className="w-5 h-5 text-green-500" />}
      helperText="vs mois dernier"
    />
  );
}`,
                      'main'
                    )
                  }
                >
                  {`import { KpiCard } from '@cosmic-ui/components';
import { TrendingUp } from 'lucide-react';

export function MyKpiCard() {
  return (
    <KpiCard
      label="Ventes totales"
      value="12,345"
      delta={12.5}
      deltaDirection="up"
      icon={<TrendingUp className="w-5 h-5 text-green-500" />}
      helperText="vs mois dernier"
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
              Le composant KpiCard est déjà inclus dans le package
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
              Utilisez le composant pour afficher des métriques KPI.
            </p>
            <CodeBlock
              onCopy={() =>
                handleCopy(
                  `import { KpiCard } from '@cosmic-ui/components';

<KpiCard
  label="Utilisateurs actifs"
  value="1,234"
  delta={8.2}
  deltaDirection="up"
  helperText="vs semaine dernière"
/>`,
                  'usage'
                )
              }
            >
              {`import { KpiCard } from '@cosmic-ui/components';

<KpiCard
  label="Utilisateurs actifs"
  value="1,234"
  delta={8.2}
  deltaDirection="up"
  helperText="vs semaine dernière"
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
                      Variation positive
                    </h3>
                    <KpiCard
                      label="Revenus"
                      value="€45,678"
                      delta={15.3}
                      deltaDirection="up"
                      icon={<DollarSign className="w-4 h-4 text-green-500" />}
                      helperText="vs mois dernier"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Variation négative
                    </h3>
                    <KpiCard
                      label="Taux de conversion"
                      value="3.2%"
                      delta={2.1}
                      deltaDirection="down"
                      icon={<TrendingDown className="w-4 h-4 text-red-500" />}
                      helperText="vs semaine dernière"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Sans variation
                    </h3>
                    <KpiCard
                      label="Commandes"
                      value="892"
                      icon={<ShoppingCart className="w-4 h-4 text-blue-500" />}
                      helperText="ce mois"
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full h-full">
                  <CodeBlock
                    onCopy={() =>
                      handleCopy(
                        `// Variation positive
<KpiCard
  label="Revenus"
  value="€45,678"
  delta={15.3}
  deltaDirection="up"
  icon={<DollarSign className="w-4 h-4 text-green-500" />}
  helperText="vs mois dernier"
/>

// Variation négative
<KpiCard
  label="Taux de conversion"
  value="3.2%"
  delta={2.1}
  deltaDirection="down"
  icon={<TrendingDown className="w-4 h-4 text-red-500" />}
  helperText="vs semaine dernière"
/>

// Sans variation
<KpiCard
  label="Commandes"
  value="892"
  icon={<ShoppingCart className="w-4 h-4 text-blue-500" />}
  helperText="ce mois"
/>

// Neutre
<KpiCard
  label="Utilisateurs"
  value="1,234"
  delta={0}
  deltaDirection="neutral"
  icon={<Users className="w-4 h-4 text-gray-500" />}
  helperText="stable"
/>

// Avec valeur numérique
<KpiCard
  label="Sessions"
  value={2456}
  delta={5.7}
  deltaDirection="up"
  icon={<Activity className="w-4 h-4 text-purple-500" />}
  helperText="vs hier"
/>`,
                        'variants'
                      )
                    }
                  >
                    {`// Variation positive
<KpiCard
  label="Revenus"
  value="€45,678"
  delta={15.3}
  deltaDirection="up"
  icon={<DollarSign className="w-4 h-4 text-green-500" />}
  helperText="vs mois dernier"
/>

// Variation négative
<KpiCard
  label="Taux de conversion"
  value="3.2%"
  delta={2.1}
  deltaDirection="down"
  icon={<TrendingDown className="w-4 h-4 text-red-500" />}
  helperText="vs semaine dernière"
/>

// Sans variation
<KpiCard
  label="Commandes"
  value="892"
  icon={<ShoppingCart className="w-4 h-4 text-blue-500" />}
  helperText="ce mois"
/>

// Neutre
<KpiCard
  label="Utilisateurs"
  value="1,234"
  delta={0}
  deltaDirection="neutral"
  icon={<Users className="w-4 h-4 text-gray-500" />}
  helperText="stable"
/>

// Avec valeur numérique
<KpiCard
  label="Sessions"
  value={2456}
  delta={5.7}
  deltaDirection="up"
  icon={<Activity className="w-4 h-4 text-purple-500" />}
  helperText="vs hier"
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
