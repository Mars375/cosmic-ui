'use client';

import { useState } from 'react';
import { LineChart } from '@cosmic-ui/components';

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

export default function LineChartPage() {
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
    { month: 'Jan', sales: 120, users: 80, revenue: 1500 },
    { month: 'Fév', sales: 150, users: 95, revenue: 1800 },
    { month: 'Mar', sales: 180, users: 110, revenue: 2200 },
    { month: 'Avr', sales: 200, users: 125, revenue: 2500 },
    { month: 'Mai', sales: 170, users: 105, revenue: 2100 },
    { month: 'Juin', sales: 220, users: 140, revenue: 2800 },
  ];

  const singleSeries = [
    {
      dataKey: 'sales',
      color: '#6366f1',
      name: 'Ventes',
    },
  ];

  const multiSeries = [
    {
      dataKey: 'sales',
      color: '#6366f1',
      name: 'Ventes',
    },
    {
      dataKey: 'users',
      color: '#22c55e',
      name: 'Utilisateurs',
    },
    {
      dataKey: 'revenue',
      color: '#eab308',
      name: 'Revenus',
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
          <h1 className="text-4xl font-bold">LineChart</h1>
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
          Un composant de graphique en ligne pour visualiser des données
          temporelles avec plusieurs séries.
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
                <div className="mb-4">
                  <h3 className="text-sm font-medium mb-2">Ventes mensuelles</h3>
                  <LineChart
                    data={sampleData}
                    xKey="month"
                    series={singleSeries}
                    height={200}
                    showDots={true}
                    showXLabels={true}
                    showYLabels={true}
                  />
                </div>
              </div>
            ) : (
              <div className="w-full h-full">
                <CodeBlock
                  onCopy={() =>
                    handleCopy(
                      `import { LineChart } from '@cosmic-ui/components';

const data = [
  { month: 'Jan', sales: 120, users: 80, revenue: 1500 },
  { month: 'Fév', sales: 150, users: 95, revenue: 1800 },
  { month: 'Mar', sales: 180, users: 110, revenue: 2200 },
  { month: 'Avr', sales: 200, users: 125, revenue: 2500 },
  { month: 'Mai', sales: 170, users: 105, revenue: 2100 },
  { month: 'Juin', sales: 220, users: 140, revenue: 2800 },
];

const series = [
  {
    dataKey: 'sales',
    color: '#6366f1',
    name: 'Ventes',
  },
];

export function MyLineChart() {
  return (
    <LineChart
      data={data}
      xKey="month"
      series={series}
      height={200}
      showDots={true}
      showXLabels={true}
      showYLabels={true}
    />
  );
}`,
                      'main'
                    )
                  }
                >
                  {`import { LineChart } from '@cosmic-ui/components';

const data = [
  { month: 'Jan', sales: 120, users: 80, revenue: 1500 },
  { month: 'Fév', sales: 150, users: 95, revenue: 1800 },
  { month: 'Mar', sales: 180, users: 110, revenue: 2200 },
  { month: 'Avr', sales: 200, users: 125, revenue: 2500 },
  { month: 'Mai', sales: 170, users: 105, revenue: 2100 },
  { month: 'Juin', sales: 220, users: 140, revenue: 2800 },
];

const series = [
  {
    dataKey: 'sales',
    color: '#6366f1',
    name: 'Ventes',
  },
];

export function MyLineChart() {
  return (
    <LineChart
      data={data}
      xKey="month"
      series={series}
      height={200}
      showDots={true}
      showXLabels={true}
      showYLabels={true}
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
              Le composant LineChart est déjà inclus dans le package
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
              Utilisez le composant pour créer des graphiques en ligne.
            </p>
            <CodeBlock
              onCopy={() =>
                handleCopy(
                  `import { LineChart } from '@cosmic-ui/components';

const data = [
  { month: 'Jan', value: 100 },
  { month: 'Fév', value: 150 },
  { month: 'Mar', value: 200 },
];

const series = [
  {
    dataKey: 'value',
    color: '#6366f1',
    name: 'Données',
  },
];

<LineChart
  data={data}
  xKey="month"
  series={series}
  height={200}
/>`,
                  'usage'
                )
              }
            >
              {`import { LineChart } from '@cosmic-ui/components';

const data = [
  { month: 'Jan', value: 100 },
  { month: 'Fév', value: 150 },
  { month: 'Mar', value: 200 },
];

const series = [
  {
    dataKey: 'value',
    color: '#6366f1',
    name: 'Données',
  },
];

<LineChart
  data={data}
  xKey="month"
  series={series}
  height={200}
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
                      Série multiple
                    </h3>
                    <LineChart
                      data={sampleData}
                      xKey="month"
                      series={multiSeries}
                      height={150}
                      showDots={true}
                      showXLabels={true}
                      showYLabels={true}
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Sans points
                    </h3>
                    <LineChart
                      data={sampleData}
                      xKey="month"
                      series={singleSeries}
                      height={120}
                      showDots={false}
                      showXLabels={false}
                      showYLabels={false}
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full h-full">
                  <CodeBlock
                    onCopy={() =>
                      handleCopy(
                        `// Série multiple
const multiSeries = [
  {
    dataKey: 'sales',
    color: '#6366f1',
    name: 'Ventes',
  },
  {
    dataKey: 'users',
    color: '#22c55e',
    name: 'Utilisateurs',
  },
  {
    dataKey: 'revenue',
    color: '#eab308',
    name: 'Revenus',
  },
];

<LineChart
  data={data}
  xKey="month"
  series={multiSeries}
  height={200}
  showDots={true}
  showXLabels={true}
  showYLabels={true}
/>

// Sans points
<LineChart
  data={data}
  xKey="month"
  series={series}
  height={200}
  showDots={false}
  showXLabels={false}
  showYLabels={false}
/>

// Avec formatage personnalisé
<LineChart
  data={data}
  xKey="month"
  series={series}
  height={200}
  xLabelFormatter={(value) => value.toString().substring(0, 3)}
  yLabelFormatter={(value) => \`\${value}k\`}
  yTicks={5}
/>`,
                        'variants'
                      )
                    }
                  >
                    {`// Série multiple
const multiSeries = [
  {
    dataKey: 'sales',
    color: '#6366f1',
    name: 'Ventes',
  },
  {
    dataKey: 'users',
    color: '#22c55e',
    name: 'Utilisateurs',
  },
  {
    dataKey: 'revenue',
    color: '#eab308',
    name: 'Revenus',
  },
];

<LineChart
  data={data}
  xKey="month"
  series={multiSeries}
  height={200}
  showDots={true}
  showXLabels={true}
  showYLabels={true}
/>

// Sans points
<LineChart
  data={data}
  xKey="month"
  series={series}
  height={200}
  showDots={false}
  showXLabels={false}
  showYLabels={false}
/>

// Avec formatage personnalisé
<LineChart
  data={data}
  xKey="month"
  series={series}
  height={200}
  xLabelFormatter={(value) => value.toString().substring(0, 3)}
  yLabelFormatter={(value) => \`\${value}k\`}
  yTicks={5}
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
