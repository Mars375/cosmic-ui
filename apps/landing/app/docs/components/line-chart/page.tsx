'use client';

import * as React from 'react';
import { useState } from 'react';
import { CodeBlock } from '../../../components/code-block';
import { LineChart } from 'cosmic-ui-mars';
import { TrendingUp } from 'lucide-react';

export default function LineChartPage() {
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
    <div className="container max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <TrendingUp className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">LineChart</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Graphique en ligne pour visualiser l'évolution des données dans le
          temps.
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
              <div className="h-80">
                <LineChart
                  data={sampleData}
                  series={singleSeries}
                  xAxisKey="month"
                  height={300}
                />
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4 text-foreground">Code</h3>
            <CodeBlock
              language="typescript"
              filePath="components/LineChartExample.tsx"
              showPackageManager={false}
            >
              {`import { LineChart } from 'cosmic-ui-mars';

const sampleData = [
  { month: 'Jan', sales: 120 },
  { month: 'Fév', sales: 150 },
  { month: 'Mar', sales: 180 },
];

const series = [
  {
    dataKey: 'sales',
    color: '#6366f1',
    name: 'Ventes',
  },
];

<LineChart
  data={sampleData}
  series={series}
  xAxisKey="month"
  height={300}
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
                Graphique multi-séries
              </h3>
              <p className="text-muted-foreground">
                Graphique avec plusieurs séries de données.
              </p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <div className="h-80">
                  <LineChart
                    data={sampleData}
                    series={multiSeries}
                    xAxisKey="month"
                    height={300}
                    showLegend
                  />
                </div>
              </div>
            </div>
            <div>
              <CodeBlock
                language="typescript"
                filePath="components/MultiSeriesLineChart.tsx"
                showPackageManager={false}
              >
                {`export default function App\docs\components\lineChart\page.tsxExample() {
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
];

<LineChart
  data={sampleData}
  series={multiSeries}
  xAxisKey="month"
  height={300}
  showLegend
/>
}`}
              </CodeBlock>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">
                Graphique avec tooltip
              </h3>
              <p className="text-muted-foreground">
                Graphique avec tooltip interactif.
              </p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <div className="h-80">
                  <LineChart
                    data={sampleData}
                    series={singleSeries}
                    xAxisKey="month"
                    height={300}
                    showTooltip
                    tooltipContent={data => (
                      <div className="p-2 bg-background border rounded shadow">
                        <p className="font-medium">{data.month}</p>
                        <p className="text-sm text-muted-foreground">
                          Ventes: {data.sales}
                        </p>
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>
            <div>
              <CodeBlock
                language="typescript"
                filePath="components/TooltipLineChart.tsx"
                showPackageManager={false}
              >
                {`export default function App\docs\components\lineChart\page.tsxExample() {
  <LineChart
  data={sampleData}
  series={singleSeries}
  xAxisKey="month"
  height={300}
  showTooltip
  tooltipContent={(data) => (
    <div className="p-2 bg-background border rounded shadow">
      <p className="font-medium">{data.month}</p>
      <p className="text-sm text-muted-foreground">
        Ventes: {data.sales}
      </p>
    </div>
  )}
/>
}`}
              </CodeBlock>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">
                Graphique avec grille
              </h3>
              <p className="text-muted-foreground">
                Graphique avec grille de fond.
              </p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <div className="h-80">
                  <LineChart
                    data={sampleData}
                    series={singleSeries}
                    xAxisKey="month"
                    height={300}
                    showGrid
                    gridColor="#e5e7eb"
                  />
                </div>
              </div>
            </div>
            <div>
              <CodeBlock
                language="typescript"
                filePath="components/GridLineChart.tsx"
                showPackageManager={false}
              >
                {`export default function App\docs\components\lineChart\page.tsxExample() {
  return <LineChart
  data={sampleData}
  series={singleSeries}
  xAxisKey="month"
  height={300}
  showGrid
  gridColor="#e5e7eb"
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
                  any[]
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
                  series
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  Series[]
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  []
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  Configuration des séries
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">
                  xAxisKey
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  string
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  -
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  Clé de l'axe X
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
                  Afficher le tooltip
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">
                  showGrid
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  boolean
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  false
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  Afficher la grille
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
              couleurs cohérentes
            </code>{' '}
            pour les séries
          </li>
          <li>
            • Ajoutez une{' '}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              légende
            </code>{' '}
            pour les graphiques multi-séries
          </li>
          <li>
            • Implémentez des{' '}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              tooltips
            </code>{' '}
            pour plus de détails
          </li>
          <li>
            • Utilisez une{' '}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              grille
            </code>{' '}
            pour faciliter la lecture
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
