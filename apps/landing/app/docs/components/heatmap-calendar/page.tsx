'use client';

import * as React from 'react';
import { useState } from 'react';
import { CodeBlock } from '../../../components/code-block';
import { HeatmapCalendar } from 'cosmic-ui-mars';
import { Calendar } from 'lucide-react';

export default function HeatmapCalendarPage() {
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
    <div className="container max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Calendar className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">HeatmapCalendar</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Calendrier heatmap pour visualiser l'activité ou les données sur une période.
        </p>
      </div>

      {/* Installation */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Installation</h2>
        <CodeBlock filePath="package.json">pnpm add cosmic-ui-mars</CodeBlock>
      </div>

      {/* Usage basique */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Usage basique</h2>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Exemple</h3>
            <div className="p-6 bg-muted/30 rounded-lg border">
              <HeatmapCalendar
                data={sampleData}
                startDate={new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)}
                endDate={new Date()}
                onDayClick={(day) => console.log('Day clicked:', day)}
              />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4 text-foreground">Code</h3>
            <CodeBlock language="typescript" filePath="components/HeatmapCalendarExample.tsx" showPackageManager={false}>
{`import { HeatmapCalendar } from 'cosmic-ui-mars';

const sampleData = [
  {
    date: '2024-01-01',
    value: 3,
    level: 3,
  },
  {
    date: '2024-01-02',
    value: 1,
    level: 1,
  },
  // ... plus de données
];

<HeatmapCalendar
  data={sampleData}
  startDate={new Date('2024-01-01')}
  endDate={new Date('2024-12-31')}
  onDayClick={(day) => console.log('Day clicked:', day)}
/>`}
            </CodeBlock>
          </div>
        </div>
      </div>

      {/* Variants */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Variants</h2>
        <div className="space-y-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Heatmap avec légende</h3>
              <p className="text-muted-foreground">Heatmap avec légende pour expliquer les niveaux.</p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <HeatmapCalendar
                  data={sampleData}
                  startDate={new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)}
                  endDate={new Date()}
                  showLegend
                  legendLabels={['Aucune activité', 'Faible', 'Modérée', 'Élevée', 'Très élevée']}
                />
              </div>
            </div>
            <div>
              <CodeBlock language="typescript" filePath="components/HeatmapWithLegend.tsx" showPackageManager={false}>
{`export default function App\docs\components\heatmapCalendar\page.tsxExample() {
  return <HeatmapCalendar
  data={sampleData}
  startDate={new Date('2024-01-01')}
  endDate={new Date('2024-12-31')}
  showLegend
  legendLabels={['Aucune activité', 'Faible', 'Modérée', 'Élevée', 'Très élevée']}
/>;
}`}
              </CodeBlock>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Heatmap avec tooltip</h3>
              <p className="text-muted-foreground">Heatmap avec tooltip pour afficher les détails.</p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <HeatmapCalendar
                  data={sampleData}
                  startDate={new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)}
                  endDate={new Date()}
                  showTooltip
                  tooltipContent={(day) => (
                    <div>
                      <p>Date: {day.date}</p>
                      <p>Valeur: {day.value}</p>
                      <p>Niveau: {day.level}</p>
                    </div>
                  )}
                />
              </div>
            </div>
            <div>
              <CodeBlock language="typescript" filePath="components/HeatmapWithTooltip.tsx" showPackageManager={false}>
{`export default function App\docs\components\heatmapCalendar\page.tsxExample() {
  <HeatmapCalendar
  data={sampleData}
  startDate={new Date('2024-01-01')}
  endDate={new Date('2024-12-31')}
  showTooltip
  tooltipContent={(day) => (
    <div>
      <p>Date: {day.date}</p>
      <p>Valeur: {day.value}</p>
      <p>Niveau: {day.level}</p>
    </div>
  )}
/>
}`}
              </CodeBlock>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Heatmap personnalisée</h3>
              <p className="text-muted-foreground">Heatmap avec couleurs et styles personnalisés.</p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <HeatmapCalendar
                  data={sampleData}
                  startDate={new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)}
                  endDate={new Date()}
                  colors={['#f0f0f0', '#c6e48b', '#7bc96f', '#239a3b', '#196127']}
                  squareSize={12}
                  spacing={2}
                />
              </div>
            </div>
            <div>
              <CodeBlock language="typescript" filePath="components/CustomHeatmap.tsx" showPackageManager={false}>
{`export default function App\docs\components\heatmapCalendar\page.tsxExample() {
  return <HeatmapCalendar
  data={sampleData}
  startDate={new Date('2024-01-01')}
  endDate={new Date('2024-12-31')}
  colors={['#f0f0f0', '#c6e48b', '#7bc96f', '#239a3b', '#196127']}
  squareSize={12}
  spacing={2}
/>;
}`}
              </CodeBlock>
            </div>
          </div>
        </div>
      </div>

      {/* Référence API */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Référence API</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-border rounded-lg">
            <thead>
              <tr className="bg-muted/50">
                <th className="border border-border px-4 py-3 text-left font-medium text-foreground">Prop</th>
                <th className="border border-border px-4 py-3 text-left font-medium text-foreground">Type</th>
                <th className="border border-border px-4 py-3 text-left font-medium text-foreground">Défaut</th>
                <th className="border border-border px-4 py-3 text-left font-medium text-foreground">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">data</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">HeatmapData[]</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">[]</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Données de la heatmap</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">startDate</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Date</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">-</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Date de début</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">endDate</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Date</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">-</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Date de fin</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">onDayClick</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">(day: HeatmapData) => void</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">-</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Callback lors du clic sur un jour</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">showLegend</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">boolean</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">false</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Afficher la légende</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">showTooltip</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">boolean</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">false</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Afficher le tooltip</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">colors</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">string[]</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">['#f0f0f0', '#c6e48b', '#7bc96f', '#239a3b', '#196127']</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Couleurs de la heatmap</td>
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
          <li>• Utilisez des <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">couleurs cohérentes</code> avec votre design</li>
          <li>• Ajoutez une <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">légende</code> pour expliquer les niveaux</li>
          <li>• Implémentez des <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">tooltips</code> pour plus de détails</li>
          <li>• Ajustez la <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">taille des carrés</code> selon l'espace disponible</li>
          <li>• Respectez les <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">guidelines d'accessibilité</code></li>
        </ul>
      </div>
    </div>
  );
}