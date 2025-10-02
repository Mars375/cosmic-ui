'use client';

import * as React from 'react';
import { useState } from 'react';
import { CodeBlock } from '../../../components/code-block';
import { PieChart } from 'cosmic-ui-mars';

export default function PieChartPage() {
  const [showCode, setShowCode] = useState(false);
  const [showCodeVariants, setShowCodeVariants] = useState(false);
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
    <div className="container max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <svg
              className="w-6 h-6 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-foreground">PieChart</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Graphique en secteurs pour visualiser des données proportionnelles.
        </p>
      </div>

      {/* Installation */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">
          Installation
        </h2>
        <CodeBlock filePath="package.json">pnpm add cosmic-ui-mars</CodeBlock>
      </div>

      {/* Usage basique */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">
          Usage basique
        </h2>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Exemple</h3>
            <div className="p-6 bg-muted/30 rounded-lg border">
              <div className="h-64">
                <PieChart
                  data={sampleData}
                  width={200}
                  height={200}
                  showLegend
                  showTooltip
                />
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4 text-foreground">Code</h3>
            <CodeBlock
              language="typescript"
              filePath="components/PieChartExample.tsx"
              showPackageManager={false}
            >
              {`import { PieChart } from 'cosmic-ui-mars';

const data = [
  { name: 'Ventes', value: 45, color: '#6366f1' },
  { name: 'Marketing', value: 25, color: '#22c55e' },
  { name: 'Support', value: 20, color: '#eab308' },
  { name: 'Autres', value: 10, color: '#ef4444' },
];

<PieChart
  data={data}
  width={200}
  height={200}
  showLegend
  showTooltip
/>`}
            </CodeBlock>
          </div>
        </div>
      </div>

      {/* Variants */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">
          Variants
        </h2>
        <div className="space-y-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">
                Graphique avec légende
              </h3>
              <p className="text-muted-foreground">
                Graphique avec légende personnalisée.
              </p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <div className="h-64">
                  <PieChart
                    data={userData}
                    width={200}
                    height={200}
                    showLegend
                    legendPosition="bottom"
                    showTooltip
                  />
                </div>
              </div>
            </div>
            <div>
              <CodeBlock
                language="typescript"
                filePath="components/LegendPieChart.tsx"
                showPackageManager={false}
              >
                {`export default function App\docs\components\pieChart\page.tsxExample() {
  return <PieChart
  data={data}
  width={200}
  height={200}
  showLegend
  legendPosition="bottom"
  showTooltip
/>;
}`}
              </CodeBlock>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">
                Graphique interactif
              </h3>
              <p className="text-muted-foreground">
                Graphique avec interactions et animations.
              </p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <div className="h-64">
                  <PieChart
                    data={sampleData}
                    width={200}
                    height={200}
                    showLegend
                    showTooltip
                    interactive
                    animation
                  />
                </div>
              </div>
            </div>
            <div>
              <CodeBlock
                language="typescript"
                filePath="components/InteractivePieChart.tsx"
                showPackageManager={false}
              >
                {`export default function App\docs\components\pieChart\page.tsxExample() {
  return <PieChart
  data={data}
  width={200}
  height={200}
  showLegend
  showTooltip
  interactive
  animation
/>;
}`}
              </CodeBlock>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">
                Graphique personnalisé
              </h3>
              <p className="text-muted-foreground">
                Graphique avec styles personnalisés.
              </p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <div className="h-64">
                  <PieChart
                    data={userData}
                    width={200}
                    height={200}
                    showLegend
                    showTooltip
                    innerRadius={40}
                    outerRadius={80}
                    strokeWidth={2}
                    stroke="#fff"
                  />
                </div>
              </div>
            </div>
            <div>
              <CodeBlock
                language="typescript"
                filePath="components/CustomPieChart.tsx"
                showPackageManager={false}
              >
                {`export default function App\docs\components\pieChart\page.tsxExample() {
  return <PieChart
  data={data}
  width={200}
  height={200}
  showLegend
  showTooltip
  innerRadius={40}
  outerRadius={80}
  strokeWidth={2}
  stroke="#fff"
/>;
}`}
              </CodeBlock>
            </div>
          </div>
        </div>
      </div>

      {/* Référence API */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">
          Référence API
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-border rounded-lg">
            <thead>
              <tr className="bg-muted/50">
                <th className="border border-border px-4 py-3 text-left font-medium text-foreground">
                  Prop
                </th>
                <th className="border border-border px-4 py-3 text-left font-medium text-foreground">
                  Type
                </th>
                <th className="border border-border px-4 py-3 text-left font-medium text-foreground">
                  Défaut
                </th>
                <th className="border border-border px-4 py-3 text-left font-medium text-foreground">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">
                  data
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  PieData[]
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  []
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  Données du graphique
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">
                  width
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  number
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  300
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  Largeur du graphique
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">
                  height
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  number
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  300
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  Hauteur du graphique
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">
                  showLegend
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  boolean
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  false
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  Afficher la légende
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">
                  showTooltip
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  boolean
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  false
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  Afficher les tooltips
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">
                  interactive
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  boolean
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  false
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  Activer les interactions
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">
                  animation
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  boolean
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  false
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  Activer les animations
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Conseils d'utilisation */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <h3 className="text-blue-800 dark:text-blue-200 font-semibold mb-2">
          💡 Conseils d'utilisation
        </h3>
        <ul className="text-blue-700 dark:text-blue-300 space-y-1 text-sm">
          <li>
            • Utilisez des{' '}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              couleurs contrastées
            </code>{' '}
            pour les secteurs
          </li>
          <li>
            • Limitez le nombre de{' '}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              secteurs
            </code>{' '}
            (max 6-7)
          </li>
          <li>
            • Ajoutez une{' '}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              légende
            </code>{' '}
            pour la lisibilité
          </li>
          <li>
            • Utilisez des{' '}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              tooltips
            </code>{' '}
            pour les détails
          </li>
          <li>
            • Respectez les{' '}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              guidelines d'accessibilité
            </code>
          </li>
        </ul>
      </div>
    </div>
  );
}
