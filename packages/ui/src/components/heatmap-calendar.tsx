'use client';

import * as React from 'react';
import { twMerge } from 'tailwind-merge';
import { Tooltip } from './tooltip';

export interface HeatmapData {
  date: string; // YYYY-MM-DD format
  value: number;
  level: 0 | 1 | 2 | 3 | 4; // 0 = no activity, 4 = max activity
}

export interface HeatmapCalendarProps {
  data: HeatmapData[];
  startDate?: Date;
  endDate?: Date;
  className?: string;
  onDateClick?: (date: string, value: number) => void;
  showTooltip?: boolean;
  showLegend?: boolean;
  showLabels?: boolean;
  colorScheme?: 'green' | 'blue' | 'purple' | 'red' | 'orange';
  size?: 'sm' | 'md' | 'lg';
}

export function HeatmapCalendar({
  data,
  startDate,
  endDate,
  className,
  onDateClick,
  showTooltip = true,
  showLegend = true,
  showLabels = true,
  colorScheme = 'green',
  size = 'md',
}: HeatmapCalendarProps) {
  const [hoveredDate, setHoveredDate] = React.useState<string | null>(null);

  // Default to last year if no dates provided
  const defaultEndDate = endDate || new Date();
  const defaultStartDate =
    startDate ||
    new Date(defaultEndDate.getFullYear() - 1, defaultEndDate.getMonth(), defaultEndDate.getDate());

  // Generate all dates in range
  const generateDates = () => {
    const dates: string[] = [];
    const current = new Date(defaultStartDate);

    while (current <= defaultEndDate) {
      dates.push(current.toISOString().split('T')[0]);
      current.setDate(current.getDate() + 1);
    }

    return dates;
  };

  const allDates = generateDates();
  const dataMap = new Map(data.map((item) => [item.date, item]));

  // Get color for activity level
  const getColor = (level: number) => {
    const colors = {
      green: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
      blue: ['#161b22', '#0c2a6b', '#0969da', '#218bff', '#54aeff'],
      purple: ['#161b22', '#4c2889', '#6f42c1', '#8b5cf6', '#a78bfa'],
      red: ['#161b22', '#7d1a1a', '#da3633', '#f85149', '#ffa198'],
      orange: ['#161b22', '#8a4a00', '#d29922', '#f0b72f', '#f9e79f'],
    };

    return colors[colorScheme][level] || colors[colorScheme][0];
  };

  // Get size classes
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-3 h-3';
      case 'lg':
        return 'w-5 h-5';
      default:
        return 'w-4 h-4';
    }
  };

  // Group dates by weeks
  const groupByWeeks = () => {
    const weeks: string[][] = [];
    let currentWeek: string[] = [];

    allDates.forEach((date, index) => {
      const dateObj = new Date(date);
      const dayOfWeek = dateObj.getDay();

      // Start new week on Sunday or first date
      if (dayOfWeek === 0 || index === 0) {
        if (currentWeek.length > 0) {
          weeks.push(currentWeek);
        }
        currentWeek = [];
      }

      currentWeek.push(date);
    });

    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }

    return weeks;
  };

  const weeks = groupByWeeks();

  // Get month labels
  const getMonthLabels = () => {
    const labels: { month: string; weekIndex: number }[] = [];
    const months = [
      'Jan',
      'Fév',
      'Mar',
      'Avr',
      'Mai',
      'Jun',
      'Jul',
      'Aoû',
      'Sep',
      'Oct',
      'Nov',
      'Déc',
    ];

    weeks.forEach((week, weekIndex) => {
      if (week.length > 0) {
        const firstDate = new Date(week[0]);
        const month = months[firstDate.getMonth()];

        // Only add label if it's the first week of the month or if we haven't added this month yet
        const lastLabel = labels[labels.length - 1];
        if (!lastLabel || lastLabel.month !== month) {
          labels.push({ month, weekIndex });
        }
      }
    });

    return labels;
  };

  const monthLabels = getMonthLabels();

  // Get day labels
  const getDayLabels = () => {
    return ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  };

  const dayLabels = getDayLabels();

  // Format date for display
  const formatDate = (date: string) => {
    const d = new Date(date);
    const months = [
      'janvier',
      'février',
      'mars',
      'avril',
      'mai',
      'juin',
      'juillet',
      'août',
      'septembre',
      'octobre',
      'novembre',
      'décembre',
    ];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  // Get activity level for date
  const getActivityLevel = (date: string) => {
    const item = dataMap.get(date);
    return item ? item.level : 0;
  };

  // Get value for date
  const getValue = (date: string) => {
    const item = dataMap.get(date);
    return item ? item.value : 0;
  };

  const renderSquare = (date: string) => {
    const level = getActivityLevel(date);
    const value = getValue(date);
    const isHovered = hoveredDate === date;

    const square = (
      <div
        key={date}
        className={twMerge(
          'rounded-sm cursor-pointer transition-all',
          getSizeClasses(),
          isHovered && 'ring-2 ring-white/50',
        )}
        style={{ backgroundColor: getColor(level) }}
        onClick={() => onDateClick?.(date, value)}
        onMouseEnter={() => setHoveredDate(date)}
        onMouseLeave={() => setHoveredDate(null)}
      />
    );

    if (showTooltip) {
      return (
        <Tooltip
          key={date}
          content={
            <div className="text-center">
              <div className="font-medium">{formatDate(date)}</div>
              <div className="text-sm text-white/70">
                {value > 0 ? `${value} contribution${value > 1 ? 's' : ''}` : 'Aucune contribution'}
              </div>
            </div>
          }
        >
          {square}
        </Tooltip>
      );
    }

    return square;
  };

  return (
    <div className={twMerge('w-full', className)}>
      {/* Month labels */}
      {showLabels && (
        <div className="flex mb-2">
          <div className="w-6" /> {/* Spacer for day labels */}
          {weeks.map((week, weekIndex) => {
            const label = monthLabels.find((l) => l.weekIndex === weekIndex);
            return (
              <div
                key={weekIndex}
                className="flex-1 text-xs text-muted-foreground text-center"
                style={{ minWidth: `${getSizeClasses().split(' ')[1]}` }}
              >
                {label?.month}
              </div>
            );
          })}
        </div>
      )}

      {/* Calendar grid */}
      <div className="flex">
        {/* Day labels */}
        {showLabels && (
          <div className="flex flex-col mr-2">
            {dayLabels.map((day, index) => (
              <div
                key={index}
                className={twMerge(
                  'text-xs text-muted-foreground text-center',
                  getSizeClasses().split(' ')[1],
                )}
                style={{ height: `${getSizeClasses().split(' ')[1]}` }}
              >
                {index % 2 === 0 ? day : ''}
              </div>
            ))}
          </div>
        )}

        {/* Calendar squares */}
        <div className="flex flex-col">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex">
              {week.map((date) => renderSquare(date))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      {showLegend && (
        <div className="flex items-center justify-end mt-4 space-x-2">
          <span className="text-xs text-muted-foreground">Moins</span>
          <div className="flex space-x-1">
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={twMerge('rounded-sm', getSizeClasses())}
                style={{ backgroundColor: getColor(level) }}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">Plus</span>
        </div>
      )}
    </div>
  );
}

// Hook for heatmap calendar
export function useHeatmapCalendar() {
  const [data, setData] = React.useState<HeatmapData[]>([]);

  const addData = (newData: HeatmapData[]) => {
    setData((prev) => {
      const dataMap = new Map(prev.map((item) => [item.date, item]));

      newData.forEach((item) => {
        dataMap.set(item.date, item);
      });

      return Array.from(dataMap.values()).sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      );
    });
  };

  const updateData = (date: string, value: number) => {
    setData((prev) => {
      const existing = prev.find((item) => item.date === date);

      if (existing) {
        return prev.map((item) =>
          item.date === date
            ? {
                ...item,
                value,
                level: Math.min(4, Math.max(0, Math.floor(value / 5))) as 0 | 1 | 2 | 3 | 4,
              }
            : item,
        );
      } else {
        return [
          ...prev,
          {
            date,
            value,
            level: Math.min(4, Math.max(0, Math.floor(value / 5))) as 0 | 1 | 2 | 3 | 4,
          },
        ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      }
    });
  };

  const clearData = () => {
    setData([]);
  };

  const generateSampleData = (days: number = 365) => {
    const sampleData: HeatmapData[] = [];
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - days * 24 * 60 * 60 * 1000);

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const date = d.toISOString().split('T')[0];
      const value = Math.floor(Math.random() * 20);
      const level = Math.min(4, Math.max(0, Math.floor(value / 5))) as 0 | 1 | 2 | 3 | 4;

      sampleData.push({ date, value, level });
    }

    setData(sampleData);
  };

  return {
    data,
    setData,
    addData,
    updateData,
    clearData,
    generateSampleData,
  };
}
