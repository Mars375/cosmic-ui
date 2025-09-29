import type { Meta, StoryObj } from '@storybook/react';
import { ChartsFilters, useChartsFilters } from '../components/charts-filters';
import { Button } from '../components/button';

const meta: Meta<typeof ChartsFilters> = {
  title: 'Components/ChartsFilters',
  component: ChartsFilters,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleCharts = [
  {
    id: '1',
    title: 'Ventes par mois',
    type: 'line' as const,
    data: [
      { name: 'Jan', value: 1200, color: '#6C5CE7' },
      { name: 'Fév', value: 1900, color: '#00D1B2' },
      { name: 'Mar', value: 3000, color: '#FF6B6B' },
      { name: 'Avr', value: 2800, color: '#4ECDC4' },
      { name: 'Mai', value: 1890, color: '#45B7D1' },
      { name: 'Jun', value: 2390, color: '#96CEB4' },
    ],
    filters: ['category', 'dateRange'],
  },
  {
    id: '2',
    title: 'Répartition des produits',
    type: 'pie' as const,
    data: [
      { name: 'Électronique', value: 35, color: '#6C5CE7' },
      { name: 'Vêtements', value: 25, color: '#00D1B2' },
      { name: 'Livres', value: 20, color: '#FF6B6B' },
      { name: 'Maison', value: 15, color: '#4ECDC4' },
      { name: 'Sport', value: 5, color: '#45B7D1' },
    ],
    filters: ['category'],
  },
  {
    id: '3',
    title: 'Utilisateurs actifs',
    type: 'bar' as const,
    data: [
      { name: 'Lun', value: 400, color: '#6C5CE7' },
      { name: 'Mar', value: 300, color: '#00D1B2' },
      { name: 'Mer', value: 200, color: '#FF6B6B' },
      { name: 'Jeu', value: 278, color: '#4ECDC4' },
      { name: 'Ven', value: 189, color: '#45B7D1' },
      { name: 'Sam', value: 239, color: '#96CEB4' },
      { name: 'Dim', value: 349, color: '#FFEAA7' },
    ],
    filters: ['dateRange'],
  },
  {
    id: '4',
    title: 'Revenus par région',
    type: 'donut' as const,
    data: [
      { name: 'Europe', value: 45, color: '#6C5CE7' },
      { name: 'Amérique', value: 30, color: '#00D1B2' },
      { name: 'Asie', value: 20, color: '#FF6B6B' },
      { name: 'Afrique', value: 5, color: '#4ECDC4' },
    ],
    filters: ['region'],
  },
];

const sampleFilters = [
  {
    id: 'category',
    label: 'Catégorie',
    type: 'select' as const,
    options: [
      { id: 'all', label: 'Toutes', value: 'all' },
      { id: 'electronics', label: 'Électronique', value: 'electronics', count: 150 },
      { id: 'clothing', label: 'Vêtements', value: 'clothing', count: 89 },
      { id: 'books', label: 'Livres', value: 'books', count: 45 },
      { id: 'home', label: 'Maison', value: 'home', count: 67 },
    ],
    defaultValue: 'all',
  },
  {
    id: 'region',
    label: 'Région',
    type: 'multiselect' as const,
    options: [
      { id: 'europe', label: 'Europe', value: 'europe', count: 45 },
      { id: 'america', label: 'Amérique', value: 'america', count: 30 },
      { id: 'asia', label: 'Asie', value: 'asia', count: 20 },
      { id: 'africa', label: 'Afrique', value: 'africa', count: 5 },
    ],
    defaultValue: [],
  },
  {
    id: 'dateRange',
    label: 'Période',
    type: 'daterange' as const,
    defaultValue: { start: '', end: '' },
  },
  {
    id: 'minValue',
    label: 'Valeur minimum',
    type: 'number' as const,
    defaultValue: 0,
  },
  {
    id: 'showTrends',
    label: 'Afficher les tendances',
    type: 'boolean' as const,
    defaultValue: false,
  },
];

function ChartsFiltersDemo() {
  const {
    charts,
    filters,
    activeFilters,
    setCharts,
    setFilters,
    updateChart,
    updateFilter,
    resetFilters,
  } = useChartsFilters();

  // Initialize with sample data
  React.useEffect(() => {
    if (charts.length === 0) {
      setCharts(sampleCharts);
    }
    if (filters.length === 0) {
      setFilters(sampleFilters);
    }
  }, [charts.length, filters.length, setCharts, setFilters]);

  const handleFilterChange = (filterId: string, value: any) => {
    updateFilter(filterId, value);
    console.log('Filter changed:', { filterId, value });
  };

  const handleChartUpdate = (chartId: string, data: any) => {
    updateChart(chartId, data);
    console.log('Chart updated:', { chartId, data });
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Charts with Filters</h2>
        <p className="text-white/70">Dashboard avec graphiques interactifs et filtres avancés</p>
      </div>

      <div className="mb-6 flex justify-end">
        <Button variant="outline" onClick={resetFilters}>
          Réinitialiser les filtres
        </Button>
      </div>

      <ChartsFilters
        charts={charts}
        filters={filters}
        onFilterChange={handleFilterChange}
        onChartUpdate={handleChartUpdate}
        maxHeight={500}
      />
    </div>
  );
}

export const Default: Story = {
  render: () => <ChartsFiltersDemo />,
};

export const WithoutFilters: Story = {
  render: () => {
    const { charts, setCharts, updateChart } = useChartsFilters();

    // Initialize with sample data
    React.useEffect(() => {
      if (charts.length === 0) {
        setCharts(sampleCharts);
      }
    }, [charts.length, setCharts]);

    const handleChartUpdate = (chartId: string, data: any) => {
      updateChart(chartId, data);
      console.log('Chart updated:', { chartId, data });
    };

    return (
      <div className="p-8">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-2">Sans filtres</h3>
          <p className="text-white/70 text-sm">
            Dashboard avec graphiques uniquement, sans panneau de filtres
          </p>
        </div>

        <ChartsFilters
          charts={charts}
          filters={[]}
          onFilterChange={() => {}}
          onChartUpdate={handleChartUpdate}
          showFilters={false}
          maxHeight={500}
        />
      </div>
    );
  },
};

export const WithoutExport: Story = {
  render: () => {
    const { charts, filters, setCharts, setFilters, updateChart, updateFilter } =
      useChartsFilters();

    // Initialize with sample data
    React.useEffect(() => {
      if (charts.length === 0) {
        setCharts(sampleCharts);
      }
      if (filters.length === 0) {
        setFilters(sampleFilters);
      }
    }, [charts.length, filters.length, setCharts, setFilters]);

    const handleFilterChange = (filterId: string, value: any) => {
      updateFilter(filterId, value);
    };

    const handleChartUpdate = (chartId: string, data: any) => {
      updateChart(chartId, data);
    };

    return (
      <div className="p-8">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-2">Sans export</h3>
          <p className="text-white/70 text-sm">Dashboard sans bouton d'export</p>
        </div>

        <ChartsFilters
          charts={charts}
          filters={filters}
          onFilterChange={handleFilterChange}
          onChartUpdate={handleChartUpdate}
          showExport={false}
          maxHeight={500}
        />
      </div>
    );
  },
};

export const WithoutRefresh: Story = {
  render: () => {
    const { charts, filters, setCharts, setFilters, updateChart, updateFilter } =
      useChartsFilters();

    // Initialize with sample data
    React.useEffect(() => {
      if (charts.length === 0) {
        setCharts(sampleCharts);
      }
      if (filters.length === 0) {
        setFilters(sampleFilters);
      }
    }, [charts.length, filters.length, setCharts, setFilters]);

    const handleFilterChange = (filterId: string, value: any) => {
      updateFilter(filterId, value);
    };

    const handleChartUpdate = (chartId: string, data: any) => {
      updateChart(chartId, data);
    };

    return (
      <div className="p-8">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-2">Sans actualisation</h3>
          <p className="text-white/70 text-sm">Dashboard sans bouton d'actualisation</p>
        </div>

        <ChartsFilters
          charts={charts}
          filters={filters}
          onFilterChange={handleFilterChange}
          onChartUpdate={handleChartUpdate}
          showRefresh={false}
          maxHeight={500}
        />
      </div>
    );
  },
};

export const SingleChart: Story = {
  render: () => {
    const { charts, filters, setCharts, setFilters, updateChart, updateFilter } =
      useChartsFilters();

    // Initialize with single chart
    React.useEffect(() => {
      if (charts.length === 0) {
        setCharts([sampleCharts[0]]);
      }
      if (filters.length === 0) {
        setFilters([sampleFilters[0], sampleFilters[2]]);
      }
    }, [charts.length, filters.length, setCharts, setFilters]);

    const handleFilterChange = (filterId: string, value: any) => {
      updateFilter(filterId, value);
    };

    const handleChartUpdate = (chartId: string, data: any) => {
      updateChart(chartId, data);
    };

    return (
      <div className="p-8">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-2">Graphique unique</h3>
          <p className="text-white/70 text-sm">Dashboard avec un seul graphique et filtres</p>
        </div>

        <ChartsFilters
          charts={charts}
          filters={filters}
          onFilterChange={handleFilterChange}
          onChartUpdate={handleChartUpdate}
          maxHeight={400}
        />
      </div>
    );
  },
};
