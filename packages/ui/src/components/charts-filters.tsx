'use client';

import * as React from 'react';
import { twMerge } from 'tailwind-merge';
import { Button } from './button';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Badge } from './badge';

export interface ChartData {
  name: string;
  value: number;
  color?: string;
  category?: string;
}

export interface FilterOption {
  id: string;
  label: string;
  value: any;
  count?: number;
  color?: string;
}

export interface ChartFilter {
  id: string;
  label: string;
  type: 'select' | 'multiselect' | 'date' | 'daterange' | 'number' | 'boolean';
  options?: FilterOption[];
  value?: any;
  defaultValue?: any;
}

export interface ChartsFiltersProps {
  charts: Array<{
    id: string;
    title: string;
    type: 'line' | 'bar' | 'pie' | 'area' | 'donut';
    data: ChartData[];
    filters?: string[];
  }>;
  filters: ChartFilter[];
  onFilterChange: (filterId: string, value: any) => void;
  onChartUpdate?: (chartId: string, data: ChartData[]) => void;
  className?: string;
  showFilters?: boolean;
  showExport?: boolean;
  showRefresh?: boolean;
  maxHeight?: number;
}

export function ChartsFilters({
  charts = [],
  filters = [],
  onFilterChange,
  onChartUpdate,
  className,
  showFilters = true,
  showExport = true,
  showRefresh = true,
  maxHeight = 600,
}: ChartsFiltersProps) {
  const [activeFilters, setActiveFilters] = React.useState<Record<string, any>>({});
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  // Initialize active filters with default values
  React.useEffect(() => {
    const initialFilters: Record<string, any> = {};
    filters.forEach((filter) => {
      if (filter.defaultValue !== undefined) {
        initialFilters[filter.id] = filter.defaultValue;
      }
    });
    setActiveFilters(initialFilters);
  }, [filters]);

  const handleFilterChange = (filterId: string, value: any) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterId]: value,
    }));
    onFilterChange(filterId, value);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const handleExport = () => {
    // Simulate export
    console.log('Exporting charts data...');
  };

  const renderFilter = (filter: ChartFilter) => {
    const value = activeFilters[filter.id] || filter.defaultValue;

    switch (filter.type) {
      case 'select':
        return (
          <div key={filter.id} className="space-y-2">
            <label className="text-sm font-medium text-white">{filter.label}</label>
            <select
              value={value || ''}
              onChange={(e) => handleFilterChange(filter.id, e.target.value)}
              className="w-full px-3 py-2 bg-cosmic-surface border border-cosmic-border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cosmic-primary"
            >
              <option value="">Tous</option>
              {filter.options?.map((option) => (
                <option key={option.id} value={option.value}>
                  {option.label} {option.count && `(${option.count})`}
                </option>
              ))}
            </select>
          </div>
        );

      case 'multiselect':
        return (
          <div key={filter.id} className="space-y-2">
            <label className="text-sm font-medium text-white">{filter.label}</label>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {filter.options?.map((option) => (
                <label key={option.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={Array.isArray(value) ? value.includes(option.value) : false}
                    onChange={(e) => {
                      const currentValue = Array.isArray(value) ? value : [];
                      const newValue = e.target.checked
                        ? [...currentValue, option.value]
                        : currentValue.filter((v: any) => v !== option.value);
                      handleFilterChange(filter.id, newValue);
                    }}
                    className="rounded border-cosmic-border"
                  />
                  <span className="text-sm text-white/90">{option.label}</span>
                  {option.count && (
                    <Badge variant="secondary" className="text-xs">
                      {option.count}
                    </Badge>
                  )}
                </label>
              ))}
            </div>
          </div>
        );

      case 'date':
        return (
          <div key={filter.id} className="space-y-2">
            <label className="text-sm font-medium text-white">{filter.label}</label>
            <input
              type="date"
              value={value || ''}
              onChange={(e) => handleFilterChange(filter.id, e.target.value)}
              className="w-full px-3 py-2 bg-cosmic-surface border border-cosmic-border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cosmic-primary"
            />
          </div>
        );

      case 'daterange':
        return (
          <div key={filter.id} className="space-y-2">
            <label className="text-sm font-medium text-white">{filter.label}</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="date"
                value={value?.start || ''}
                onChange={(e) => handleFilterChange(filter.id, { ...value, start: e.target.value })}
                className="px-3 py-2 bg-cosmic-surface border border-cosmic-border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cosmic-primary"
                placeholder="Début"
              />
              <input
                type="date"
                value={value?.end || ''}
                onChange={(e) => handleFilterChange(filter.id, { ...value, end: e.target.value })}
                className="px-3 py-2 bg-cosmic-surface border border-cosmic-border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cosmic-primary"
                placeholder="Fin"
              />
            </div>
          </div>
        );

      case 'number':
        return (
          <div key={filter.id} className="space-y-2">
            <label className="text-sm font-medium text-white">{filter.label}</label>
            <input
              type="number"
              value={value || ''}
              onChange={(e) => handleFilterChange(filter.id, parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 bg-cosmic-surface border border-cosmic-border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cosmic-primary"
            />
          </div>
        );

      case 'boolean':
        return (
          <div key={filter.id} className="space-y-2">
            <label className="text-sm font-medium text-white">{filter.label}</label>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={value || false}
                onChange={(e) => handleFilterChange(filter.id, e.target.checked)}
                className="rounded border-cosmic-border"
              />
              <span className="text-sm text-white/90">Activer</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderChart = (chart: any) => {
    const getChartColor = (index: number) => {
      const colors = [
        '#6C5CE7',
        '#00D1B2',
        '#FF6B6B',
        '#4ECDC4',
        '#45B7D1',
        '#96CEB4',
        '#FFEAA7',
        '#DDA0DD',
        '#98D8C8',
        '#F7DC6F',
      ];
      return colors[index % colors.length];
    };

    const renderChartContent = () => {
      switch (chart.type) {
        case 'line':
        case 'area':
          return (
            <div className="h-64 flex items-end justify-between space-x-1">
              {chart.data.map((item: ChartData, index: number) => (
                <div key={item.name} className="flex flex-col items-center space-y-2">
                  <div
                    className="w-8 rounded-t"
                    style={{
                      height: `${(item.value / Math.max(...chart.data.map((d: ChartData) => d.value))) * 200}px`,
                      backgroundColor: item.color || getChartColor(index),
                    }}
                  />
                  <span className="text-xs text-white/70">{item.name}</span>
                </div>
              ))}
            </div>
          );

        case 'bar':
          return (
            <div className="h-64 flex items-end justify-between space-x-1">
              {chart.data.map((item: ChartData, index: number) => (
                <div key={item.name} className="flex flex-col items-center space-y-2">
                  <div
                    className="w-8 rounded-t"
                    style={{
                      height: `${(item.value / Math.max(...chart.data.map((d: ChartData) => d.value))) * 200}px`,
                      backgroundColor: item.color || getChartColor(index),
                    }}
                  />
                  <span className="text-xs text-white/70">{item.name}</span>
                </div>
              ))}
            </div>
          );

        case 'pie':
        case 'donut':
          return (
            <div className="h-64 flex items-center justify-center">
              <div className="relative w-48 h-48">
                {chart.data.map((item: ChartData, index: number) => {
                  const total = chart.data.reduce((sum: number, d: ChartData) => sum + d.value, 0);
                  const percentage = (item.value / total) * 100;
                  const angle =
                    (chart.data
                      .slice(0, index)
                      .reduce((sum: number, d: ChartData) => sum + d.value, 0) /
                      total) *
                    360;

                  return (
                    <div
                      key={item.name}
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `conic-gradient(from ${angle}deg, ${item.color || getChartColor(index)} ${percentage}%, transparent ${percentage}%)`,
                      }}
                    />
                  );
                })}
                <div className="absolute inset-8 bg-cosmic-background rounded-full flex items-center justify-center">
                  <span className="text-sm text-white/70">Total</span>
                </div>
              </div>
            </div>
          );

        default:
          return (
            <div className="h-64 flex items-center justify-center text-white/50">
              Type de graphique non supporté
            </div>
          );
      }
    };

    return (
      <Card key={chart.id} className="h-full">
        <CardHeader>
          <CardTitle className="text-lg">{chart.title}</CardTitle>
        </CardHeader>
        <CardContent>
          {renderChartContent()}

          {/* Legend */}
          <div className="mt-4 flex flex-wrap gap-2">
            {chart.data.map((item: ChartData, index: number) => (
              <div key={item.name} className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color || getChartColor(index) }}
                />
                <span className="text-xs text-white/70">{item.name}</span>
                <span className="text-xs text-white/50">({item.value})</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className={twMerge('w-full', className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Dashboard avec Filtres</h2>
          <p className="text-white/70">Graphiques interactifs avec filtres avancés</p>
        </div>

        <div className="flex items-center space-x-2">
          {showRefresh && (
            <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
              {isRefreshing ? '🔄' : '🔄'} Actualiser
            </Button>
          )}
          {showExport && (
            <Button variant="outline" onClick={handleExport}>
              📊 Exporter
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Panel */}
        {showFilters && (
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Filtres</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">{filters.map(renderFilter)}</CardContent>
            </Card>
          </div>
        )}

        {/* Charts Grid */}
        <div className={twMerge('grid gap-6', showFilters ? 'lg:col-span-3' : 'lg:col-span-4')}>
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            style={{ maxHeight: `${maxHeight}px` }}
          >
            {charts.map(renderChart)}
          </div>
        </div>
      </div>
    </div>
  );
}

// Hook for charts with filters
export function useChartsFilters() {
  const [charts, setCharts] = React.useState<
    Array<{
      id: string;
      title: string;
      type: 'line' | 'bar' | 'pie' | 'area' | 'donut';
      data: ChartData[];
      filters?: string[];
    }>
  >([]);

  const [filters, setFilters] = React.useState<ChartFilter[]>([]);
  const [activeFilters, setActiveFilters] = React.useState<Record<string, any>>({});

  const updateChart = (chartId: string, data: ChartData[]) => {
    setCharts((prev) => prev.map((chart) => (chart.id === chartId ? { ...chart, data } : chart)));
  };

  const updateFilter = (filterId: string, value: any) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterId]: value,
    }));
  };

  const applyFilters = () => {
    // Apply filters to charts data
    charts.forEach((chart) => {
      if (chart.filters) {
        // Filter logic would go here
        console.log('Applying filters to chart:', chart.id, activeFilters);
      }
    });
  };

  const resetFilters = () => {
    const resetValues: Record<string, any> = {};
    filters.forEach((filter) => {
      resetValues[filter.id] = filter.defaultValue;
    });
    setActiveFilters(resetValues);
  };

  return {
    charts,
    filters,
    activeFilters,
    setCharts,
    setFilters,
    updateChart,
    updateFilter,
    applyFilters,
    resetFilters,
  };
}
