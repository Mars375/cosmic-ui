'use client';

import * as React from 'react';
import { useState } from 'react';
import { CodeBlock } from '../../../components/code-block';
import { ChartsFilters } from 'cosmic-ui-mars';
import { Button } from 'cosmic-ui-mars';
import { Filter, BarChart3, TrendingUp } from 'lucide-react';

export default function ChartsFiltersPage() {
  const [filters, setFilters] = useState({
    category: 'all',
    period: '7d',
    status: ['active'],
  });

  const handleFilterChange = (filterId: string, value: any) => {
    setFilters(prev => ({ ...prev, [filterId]: value }));
  };

  const filterConfig = [
    {
      id: 'category',
      label: 'Catégorie',
      type: 'select',
      options: [
        { id: 'all', label: 'Toutes', value: 'all' },
        { id: 'sales', label: 'Ventes', value: 'sales' },
        { id: 'users', label: 'Utilisateurs', value: 'users' },
        { id: 'revenue', label: 'Revenus', value: 'revenue' },
      ],
      value: filters.category,
    },
    {
      id: 'period',
      label: 'Période',
      type: 'select',
      options: [
        { id: '1d', label: '1 jour', value: '1d' },
        { id: '7d', label: '7 jours', value: '7d' },
        { id: '30d', label: '30 jours', value: '30d' },
        { id: '90d', label: '90 jours', value: '90d' },
      ],
      value: filters.period,
    },
    {
      id: 'status',
      label: 'Statut',
      type: 'multiselect',
      options: [
        { id: 'active', label: 'Actif', value: 'active', color: '#22c55e' },
        { id: 'inactive', label: 'Inactif', value: 'inactive', color: '#ef4444' },
        { id: 'pending', label: 'En attente', value: 'pending', color: '#eab308' },
      ],
      value: filters.status,
    },
  ];

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Filter className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">ChartsFilters</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Composant de filtres pour les graphiques et tableaux de données.
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
              <ChartsFilters
                filters={filterConfig}
                onChange={handleFilterChange}
              />
              <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Filtres appliqués :</p>
                <pre className="text-xs mt-2 text-foreground">
                  {JSON.stringify(filters, null, 2)}
                </pre>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4 text-foreground">Code</h3>
            <CodeBlock language="typescript" filePath="components/ChartsFiltersExample.tsx" showPackageManager={false}>
{`import { ChartsFilters } from 'cosmic-ui-mars';
import { useState } from 'react';

const [filters, setFilters] = useState({
  category: 'all',
  period: '7d',
  status: ['active'],
});

const filterConfig = [
  {
    id: 'category',
    label: 'Catégorie',
    type: 'select',
    options: [
      { id: 'all', label: 'Toutes', value: 'all' },
      { id: 'sales', label: 'Ventes', value: 'sales' },
    ],
    value: filters.category,
  },
];

<ChartsFilters
  filters={filterConfig}
  onChange={(filterId, value) => {
    setFilters(prev => ({ ...prev, [filterId]: value }));
  }}
/>`}
            </CodeBlock>
          </div>
        </div>
      </div>

      {/* Types de filtres */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Types de filtres</h2>
        <div className="space-y-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Filtre select</h3>
              <p className="text-muted-foreground">Filtre avec sélection unique.</p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <ChartsFilters
                  filters={[filterConfig[0]]}
                  onChange={handleFilterChange}
                />
              </div>
            </div>
            <div>
              <CodeBlock language="typescript" filePath="components/SelectFilter.tsx" showPackageManager={false}>
{`export default function App\docs\components\chartsFilters\page.tsxExample() {
  {
  id: 'category',
  label: 'Catégorie',
  type: 'select',
  options: [
    { id: 'all', label: 'Toutes', value: 'all' },
    { id: 'sales', label: 'Ventes', value: 'sales' },
  ],
  value: filters.category,
}
}`}
              </CodeBlock>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Filtre multiselect</h3>
              <p className="text-muted-foreground">Filtre avec sélection multiple.</p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <ChartsFilters
                  filters={[filterConfig[2]]}
                  onChange={handleFilterChange}
                />
              </div>
            </div>
            <div>
              <CodeBlock language="typescript" filePath="components/MultiselectFilter.tsx" showPackageManager={false}>
{`export default function App\docs\components\chartsFilters\page.tsxExample() {
  {
  id: 'status',
  label: 'Statut',
  type: 'multiselect',
  options: [
    { id: 'active', label: 'Actif', value: 'active', color: '#22c55e' },
    { id: 'inactive', label: 'Inactif', value: 'inactive', color: '#ef4444' },
  ],
  value: filters.status,
}
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
                <td className="border border-border px-4 py-3 font-mono text-sm">filters</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">FilterConfig[]</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">-</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Configuration des filtres</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">onChange</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">(filterId: string, value: any) => void</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">-</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Callback appelé lors du changement de filtre</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">className</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">string</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">-</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Classes CSS supplémentaires</td>
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
          <li>• Utilisez <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">select</code> pour les filtres uniques</li>
          <li>• Utilisez <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">multiselect</code> pour les filtres multiples</li>
          <li>• Ajoutez des <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">couleurs</code> pour les options multiselect</li>
          <li>• Gérez l'état des filtres avec <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">useState</code></li>
          <li>• Intégrez avec vos composants de graphiques</li>
        </ul>
      </div>
    </div>
  );
}