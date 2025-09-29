import type { Meta, StoryObj } from '@storybook/react';
import { HeatmapCalendar, useHeatmapCalendar } from '../components/heatmap-calendar';
import { Button } from '../components/button';

const meta: Meta<typeof HeatmapCalendar> = {
  title: 'Components/HeatmapCalendar',
  component: HeatmapCalendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Generate sample data for the last year
const generateSampleData = () => {
  const data = [];
  const endDate = new Date();
  const startDate = new Date(endDate.getFullYear() - 1, endDate.getMonth(), endDate.getDate());

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const date = d.toISOString().split('T')[0];
    const value = Math.floor(Math.random() * 20);
    const level = Math.min(4, Math.max(0, Math.floor(value / 5))) as 0 | 1 | 2 | 3 | 4;

    data.push({ date, value, level });
  }

  return data;
};

const sampleData = generateSampleData();

function HeatmapCalendarDemo() {
  const { data, generateSampleData, updateData } = useHeatmapCalendar();

  // Initialize with sample data
  React.useEffect(() => {
    if (data.length === 0) {
      generateSampleData(365);
    }
  }, [data.length, generateSampleData]);

  const handleDateClick = (date: string, value: number) => {
    console.log('Date clicked:', { date, value });
    updateData(date, value + 1);
  };

  const handleRegenerateData = () => {
    generateSampleData(365);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Heatmap Calendar</h2>
        <p className="text-white/70">Calendrier de contributions style GitHub avec heatmap</p>
      </div>

      <div className="space-y-6">
        <div className="flex justify-end">
          <Button onClick={handleRegenerateData} variant="outline">
            Régénérer les données
          </Button>
        </div>

        <HeatmapCalendar
          data={data}
          onDateClick={handleDateClick}
          showTooltip={true}
          showLegend={true}
          showLabels={true}
          colorScheme="green"
          size="md"
        />
      </div>
    </div>
  );
}

export const Default: Story = {
  render: () => <HeatmapCalendarDemo />,
};

export const DifferentColorSchemes: Story = {
  render: () => {
    const { data, generateSampleData } = useHeatmapCalendar();

    // Initialize with sample data
    React.useEffect(() => {
      if (data.length === 0) {
        generateSampleData(365);
      }
    }, [data.length, generateSampleData]);

    const colorSchemes = ['green', 'blue', 'purple', 'red', 'orange'] as const;

    return (
      <div className="p-8 space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Différents schémas de couleurs</h3>
          <p className="text-white/70 text-sm">
            Heatmap calendar avec différents schémas de couleurs
          </p>
        </div>

        {colorSchemes.map((scheme) => (
          <div key={scheme}>
            <h4 className="text-sm font-medium text-white/70 mb-2 capitalize">{scheme}</h4>
            <HeatmapCalendar
              data={data}
              colorScheme={scheme}
              showTooltip={true}
              showLegend={true}
              showLabels={true}
              size="sm"
            />
          </div>
        ))}
      </div>
    );
  },
};

export const DifferentSizes: Story = {
  render: () => {
    const { data, generateSampleData } = useHeatmapCalendar();

    // Initialize with sample data
    React.useEffect(() => {
      if (data.length === 0) {
        generateSampleData(365);
      }
    }, [data.length, generateSampleData]);

    const sizes = ['sm', 'md', 'lg'] as const;

    return (
      <div className="p-8 space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Différentes tailles</h3>
          <p className="text-white/70 text-sm">
            Heatmap calendar avec différentes tailles de carrés
          </p>
        </div>

        {sizes.map((size) => (
          <div key={size}>
            <h4 className="text-sm font-medium text-white/70 mb-2 capitalize">{size}</h4>
            <HeatmapCalendar
              data={data}
              size={size}
              showTooltip={true}
              showLegend={true}
              showLabels={true}
              colorScheme="green"
            />
          </div>
        ))}
      </div>
    );
  },
};

export const WithoutTooltip: Story = {
  render: () => {
    const { data, generateSampleData } = useHeatmapCalendar();

    // Initialize with sample data
    React.useEffect(() => {
      if (data.length === 0) {
        generateSampleData(365);
      }
    }, [data.length, generateSampleData]);

    return (
      <div className="p-8">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-2">Sans tooltip</h3>
          <p className="text-white/70 text-sm">Heatmap calendar sans tooltip au survol</p>
        </div>

        <HeatmapCalendar
          data={data}
          showTooltip={false}
          showLegend={true}
          showLabels={true}
          colorScheme="green"
          size="md"
        />
      </div>
    );
  },
};

export const WithoutLegend: Story = {
  render: () => {
    const { data, generateSampleData } = useHeatmapCalendar();

    // Initialize with sample data
    React.useEffect(() => {
      if (data.length === 0) {
        generateSampleData(365);
      }
    }, [data.length, generateSampleData]);

    return (
      <div className="p-8">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-2">Sans légende</h3>
          <p className="text-white/70 text-sm">Heatmap calendar sans légende des couleurs</p>
        </div>

        <HeatmapCalendar
          data={data}
          showTooltip={true}
          showLegend={false}
          showLabels={true}
          colorScheme="green"
          size="md"
        />
      </div>
    );
  },
};

export const WithoutLabels: Story = {
  render: () => {
    const { data, generateSampleData } = useHeatmapCalendar();

    // Initialize with sample data
    React.useEffect(() => {
      if (data.length === 0) {
        generateSampleData(365);
      }
    }, [data.length, generateSampleData]);

    return (
      <div className="p-8">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-2">Sans labels</h3>
          <p className="text-white/70 text-sm">Heatmap calendar sans labels de mois et jours</p>
        </div>

        <HeatmapCalendar
          data={data}
          showTooltip={true}
          showLegend={true}
          showLabels={false}
          colorScheme="green"
          size="md"
        />
      </div>
    );
  },
};

export const CustomDateRange: Story = {
  render: () => {
    const { data, generateSampleData } = useHeatmapCalendar();

    // Initialize with sample data
    React.useEffect(() => {
      if (data.length === 0) {
        generateSampleData(90); // Last 90 days
      }
    }, [data.length, generateSampleData]);

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 90);
    const endDate = new Date();

    return (
      <div className="p-8">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-2">Plage de dates personnalisée</h3>
          <p className="text-white/70 text-sm">Heatmap calendar pour les 90 derniers jours</p>
        </div>

        <HeatmapCalendar
          data={data}
          startDate={startDate}
          endDate={endDate}
          showTooltip={true}
          showLegend={true}
          showLabels={true}
          colorScheme="blue"
          size="md"
        />
      </div>
    );
  },
};

export const EmptyData: Story = {
  render: () => {
    return (
      <div className="p-8">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-2">Données vides</h3>
          <p className="text-white/70 text-sm">Heatmap calendar sans données</p>
        </div>

        <HeatmapCalendar
          data={[]}
          showTooltip={true}
          showLegend={true}
          showLabels={true}
          colorScheme="green"
          size="md"
        />
      </div>
    );
  },
};
