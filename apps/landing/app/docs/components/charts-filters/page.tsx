'use client';

import { useState } from 'react';
import { ChartsFilters } from '@cosmic-ui/ui';
import { Button } from '@cosmic-ui/ui';

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

export default function ChartsFiltersPage() {
  const [showCode, setShowCode] = useState(false);
  const [showCodeVariants, setShowCodeVariants] = useState(false);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const [filters, setFilters] = useState({
    category: 'all',
    period: '7d',
    status: ['active'],
  });

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStates(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCopiedStates(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

  const handleFilterChange = (filterId: string, value: any) => {
    setFilters(prev => ({ ...prev, [filterId]: value }));
  };

  const sampleCharts = [
    {
      id: 'sales',
      title: 'Ventes',
      type: 'line' as const,
      data: [
        { name: 'Jan', value: 120, category: 'sales' },
        { name: 'Fév', value: 150, category: 'sales' },
        { name: 'Mar', value: 180, category: 'sales' },
        { name: 'Avr', value: 200, category: 'sales' },
        { name: 'Mai', value: 170, category: 'sales' },
        { name: 'Juin', value: 220, category: 'sales' },
      ],
      filters: ['category', 'period'],
    },
    {
      id: 'users',
      title: 'Utilisateurs',
      type: 'pie' as const,
      data: [
        { name: 'Actifs', value: 65, color: '#22c55e' },
        { name: 'Inactifs', value: 25, color: '#ef4444' },
        { name: 'En attente', value: 10, color: '#eab308' },
      ],
      filters: ['status'],
    },
  ];

  const sampleFilters = [
    {
      id: 'category',
      label: 'Catégorie',
      type: 'select' as const,
      options: [
        { id: 'all', label: 'Toutes', value: 'all' },
        { id: 'sales', label: 'Ventes', value: 'sales' },
        { id: 'marketing', label: 'Marketing', value: 'marketing' },
        { id: 'support', label: 'Support', value: 'support' },
      ],
      value: filters.category,
    },
    {
      id: 'period',
      label: 'Période',
      type: 'select' as const,
      options: [
        { id: '7d', label: '7 jours', value: '7d' },
        { id: '30d', label: '30 jours', value: '30d' },
        { id: '90d', label: '90 jours', value: '90d' },
        { id: '1y', label: '1 an', value: '1y' },
      ],
      value: filters.period,
    },
    {
      id: 'status',
      label: 'Statut',
      type: 'multiselect' as const,
      options: [
        { id: 'active', label: 'Actif', value: 'active', color: '#22c55e' },
        { id: 'inactive', label: 'Inactif', value: 'inactive', color: '#ef4444' },
        { id: 'pending', label: 'En attente', value: 'pending', color: '#eab308' },
      ],
      value: filters.status,
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
          <h1 className="text-4xl font-bold">ChartsFilters</h1>
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
          Un composant de filtres pour graphiques avec support de différents
          types de filtres et actions.
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

          <div className="bg-cosmic-card border border-cosmic-border rounded-lg p-2 min-h-[450px] w-[500px] flex justify-start">
            {!showCode ? (
              <div className="p-4 w-full">
                <ChartsFilters
                  charts={sampleCharts}
                  filters={sampleFilters}
                  onFilterChange={handleFilterChange}
                  showFilters={true}
                  showExport={true}
                  showRefresh={true}
                  maxHeight={300}
                />
              </div>
            ) : (
              <div className="w-full">
                <CodeBlock
                  onCopy={() =>
                    handleCopy(
                      `import { ChartsFilters } from '@cosmic-ui/ui';
import { useState } from 'react';

export function MyChartsFilters() {
  const [filters, setFilters] = useState({
    category: 'all',
    period: '7d',
    status: ['active'],
  });

  const handleFilterChange = (filterId: string, value: any) => {
    setFilters(prev => ({ ...prev, [filterId]: value }));
  };

  const charts = [
    {
      id: 'sales',
      title: 'Ventes',
      type: 'line',
      data: [
        { name: 'Jan', value: 120, category: 'sales' },
        { name: 'Fév', value: 150, category: 'sales' },
        { name: 'Mar', value: 180, category: 'sales' },
        { name: 'Avr', value: 200, category: 'sales' },
        { name: 'Mai', value: 170, category: 'sales' },
        { name: 'Juin', value: 220, category: 'sales' },
      ],
      filters: ['category', 'period'],
    },
    {
      id: 'users',
      title: 'Utilisateurs',
      type: 'pie',
      data: [
        { name: 'Actifs', value: 65, color: '#22c55e' },
        { name: 'Inactifs', value: 25, color: '#ef4444' },
        { name: 'En attente', value: 10, color: '#eab308' },
      ],
      filters: ['status'],
    },
  ];

  const filterConfig = [
    {
      id: 'category',
      label: 'Catégorie',
      type: 'select',
      options: [
        { id: 'all', label: 'Toutes', value: 'all' },
        { id: 'sales', label: 'Ventes', value: 'sales' },
        { id: 'marketing', label: 'Marketing', value: 'marketing' },
        { id: 'support', label: 'Support', value: 'support' },
      ],
      value: filters.category,
    },
    {
      id: 'period',
      label: 'Période',
      type: 'select',
      options: [
        { id: '7d', label: '7 jours', value: '7d' },
        { id: '30d', label: '30 jours', value: '30d' },
        { id: '90d', label: '90 jours', value: '90d' },
        { id: '1y', label: '1 an', value: '1y' },
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
    <ChartsFilters
      charts={charts}
      filters={filterConfig}
      onFilterChange={handleFilterChange}
      showFilters={true}
      showExport={true}
      showRefresh={true}
      maxHeight={300}
    />
  );
}`,
                      'main'
                    )
                  }
                >
                  {`import { ChartsFilters } from '@cosmic-ui/ui';
import { useState } from 'react';

export function MyChartsFilters() {
  const [filters, setFilters] = useState({
    category: 'all',
    period: '7d',
    status: ['active'],
  });

  const handleFilterChange = (filterId: string, value: any) => {
    setFilters(prev => ({ ...prev, [filterId]: value }));
  };

  const charts = [
    {
      id: 'sales',
      title: 'Ventes',
      type: 'line',
      data: [
        { name: 'Jan', value: 120, category: 'sales' },
        { name: 'Fév', value: 150, category: 'sales' },
        { name: 'Mar', value: 180, category: 'sales' },
        { name: 'Avr', value: 200, category: 'sales' },
        { name: 'Mai', value: 170, category: 'sales' },
        { name: 'Juin', value: 220, category: 'sales' },
      ],
      filters: ['category', 'period'],
    },
    {
      id: 'users',
      title: 'Utilisateurs',
      type: 'pie',
      data: [
        { name: 'Actifs', value: 65, color: '#22c55e' },
        { name: 'Inactifs', value: 25, color: '#ef4444' },
        { name: 'En attente', value: 10, color: '#eab308' },
      ],
      filters: ['status'],
    },
  ];

  const filterConfig = [
    {
      id: 'category',
      label: 'Catégorie',
      type: 'select',
      options: [
        { id: 'all', label: 'Toutes', value: 'all' },
        { id: 'sales', label: 'Ventes', value: 'sales' },
        { id: 'marketing', label: 'Marketing', value: 'marketing' },
        { id: 'support', label: 'Support', value: 'support' },
      ],
      value: filters.category,
    },
    {
      id: 'period',
      label: 'Période',
      type: 'select',
      options: [
        { id: '7d', label: '7 jours', value: '7d' },
        { id: '30d', label: '30 jours', value: '30d' },
        { id: '90d', label: '90 jours', value: '90d' },
        { id: '1y', label: '1 an', value: '1y' },
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
    <ChartsFilters
      charts={charts}
      filters={filterConfig}
      onFilterChange={handleFilterChange}
      showFilters={true}
      showExport={true}
      showRefresh={true}
      maxHeight={300}
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
              Le composant ChartsFilters est déjà inclus dans le package
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
              Utilisez le composant pour créer des filtres pour vos graphiques.
            </p>
            <CodeBlock
              onCopy={() =>
                handleCopy(
                  `import { ChartsFilters } from '@cosmic-ui/ui';

const charts = [
  {
    id: 'chart1',
    title: 'Mon Graphique',
    type: 'line',
    data: [
      { name: 'Jan', value: 100 },
      { name: 'Fév', value: 150 },
    ],
    filters: ['period'],
  },
];

const filters = [
  {
    id: 'period',
    label: 'Période',
    type: 'select',
    options: [
      { id: '7d', label: '7 jours', value: '7d' },
      { id: '30d', label: '30 jours', value: '30d' },
    ],
  },
];

<ChartsFilters
  charts={charts}
  filters={filters}
  onFilterChange={(id, value) => console.log(id, value)}
/>`,
                  'usage'
                )
              }
            >
              {`import { ChartsFilters } from '@cosmic-ui/ui';

const charts = [
  {
    id: 'chart1',
    title: 'Mon Graphique',
    type: 'line',
    data: [
      { name: 'Jan', value: 100 },
      { name: 'Fév', value: 150 },
    ],
    filters: ['period'],
  },
];

const filters = [
  {
    id: 'period',
    label: 'Période',
    type: 'select',
    options: [
      { id: '7d', label: '7 jours', value: '7d' },
      { id: '30d', label: '30 jours', value: '30d' },
    ],
  },
];

<ChartsFilters
  charts={charts}
  filters={filters}
  onFilterChange={(id, value) => console.log(id, value)}
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

            <div className="bg-cosmic-card border border-cosmic-border rounded-lg p-2 min-h-[450px] w-[500px] flex justify-start">
              {!showCodeVariants ? (
                <div className="p-4 w-full space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Filtres simples
                    </h3>
                    <ChartsFilters
                      charts={sampleCharts.slice(0, 1)}
                      filters={sampleFilters.slice(0, 1)}
                      onFilterChange={handleFilterChange}
                      showFilters={true}
                      showExport={false}
                      showRefresh={false}
                      maxHeight={200}
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Avec actions
                    </h3>
                    <ChartsFilters
                      charts={sampleCharts.slice(0, 1)}
                      filters={sampleFilters.slice(0, 2)}
                      onFilterChange={handleFilterChange}
                      showFilters={true}
                      showExport={true}
                      showRefresh={true}
                      maxHeight={200}
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full">
                  <CodeBlock
                    onCopy={() =>
                      handleCopy(
                        `// Filtres simples
<ChartsFilters
  charts={charts}
  filters={filters}
  onFilterChange={handleFilterChange}
  showFilters={true}
  showExport={false}
  showRefresh={false}
/>

// Avec actions
<ChartsFilters
  charts={charts}
  filters={filters}
  onFilterChange={handleFilterChange}
  showFilters={true}
  showExport={true}
  showRefresh={true}
/>

// Filtres multiselect
const multiselectFilter = {
  id: 'categories',
  label: 'Catégories',
  type: 'multiselect',
  options: [
    { id: 'cat1', label: 'Catégorie 1', value: 'cat1' },
    { id: 'cat2', label: 'Catégorie 2', value: 'cat2' },
  ],
};

// Filtres date
const dateFilter = {
  id: 'dateRange',
  label: 'Période',
  type: 'daterange',
  value: { start: new Date(), end: new Date() },
};`,
                        'variants'
                      )
                    }
                  >
                    {`// Filtres simples
<ChartsFilters
  charts={charts}
  filters={filters}
  onFilterChange={handleFilterChange}
  showFilters={true}
  showExport={false}
  showRefresh={false}
/>

// Avec actions
<ChartsFilters
  charts={charts}
  filters={filters}
  onFilterChange={handleFilterChange}
  showFilters={true}
  showExport={true}
  showRefresh={true}
/>

// Filtres multiselect
const multiselectFilter = {
  id: 'categories',
  label: 'Catégories',
  type: 'multiselect',
  options: [
    { id: 'cat1', label: 'Catégorie 1', value: 'cat1' },
    { id: 'cat2', label: 'Catégorie 2', value: 'cat2' },
  ],
};

// Filtres date
const dateFilter = {
  id: 'dateRange',
  label: 'Période',
  type: 'daterange',
  value: { start: new Date(), end: new Date() },
};`}
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
