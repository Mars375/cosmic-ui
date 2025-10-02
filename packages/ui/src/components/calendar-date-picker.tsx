import * as React from 'react';
import { twMerge } from 'tailwind-merge';

function getMonthMatrix(year: number, month: number) {
  const first = new Date(year, month, 1);
  const start = new Date(first);
  start.setDate(first.getDate() - ((first.getDay() + 6) % 7)); // Monday start
  const weeks: Date[][] = [];
  let cur = new Date(start);
  for (let w = 0; w < 6; w++) {
    const row: Date[] = [];
    for (let d = 0; d < 7; d++) {
      row.push(new Date(cur));
      cur.setDate(cur.getDate() + 1);
    }
    weeks.push(row);
  }
  return weeks;
}

export interface CalendarDatePickerProps {
  value?: Date | null;
  onChange?: (date: Date) => void;
  className?: string;
  minYear?: number;
  maxYear?: number;
  showYearSelector?: boolean;
  showMonthSelector?: boolean;
}

export const CalendarDatePicker = ({
  className,
  value,
  onChange,
  minYear = 1900,
  maxYear = 2100,
  showYearSelector = true,
  showMonthSelector = true,
  ...props
}: CalendarDatePickerProps) => {
  const today = new Date();
  const [cursor, setCursor] = React.useState<Date>(value ?? today);
  const weeks = getMonthMatrix(cursor.getFullYear(), cursor.getMonth());
  const monthNames = [
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

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const currentYear = cursor.getFullYear();
  const currentMonth = cursor.getMonth();

  const handleYearChange = (year: number) => {
    setCursor(new Date(year, currentMonth, 1));
  };

  const handleMonthChange = (month: number) => {
    setCursor(new Date(currentYear, month, 1));
  };

  const generateYearOptions = () => {
    const years = [];
    for (let year = minYear; year <= maxYear; year++) {
      years.push(year);
    }
    return years;
  };

  return (
    <div className={twMerge('inline-block rounded-md p-3', className)} {...props}>
      {/* Navigation Header */}
      <div className="mb-4 space-y-2">
        {/* Year and Month Navigation */}
        <div className="flex items-center justify-between">
          <button
            className="flex h-8 w-8 items-center justify-center rounded-md border border-border hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
            onClick={() => setCursor(new Date(currentYear - 1, currentMonth, 1))}
            disabled={currentYear <= minYear}
            aria-label="Previous year"
          >
            ‹‹
          </button>
          <button
            className="flex h-8 w-8 items-center justify-center rounded-md border border-border hover:bg-accent hover:text-accent-foreground"
            onClick={() => setCursor(new Date(currentYear, currentMonth - 1, 1))}
            aria-label="Previous month"
          >
            ‹
          </button>

          <div className="flex items-center gap-2">
            {showMonthSelector ? (
              <select
                value={currentMonth}
                onChange={(e) => handleMonthChange(parseInt(e.target.value))}
                className="rounded-md border border-border bg-background px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {monthNames.map((month, index) => (
                  <option key={index} value={index}>
                    {month}
                  </option>
                ))}
              </select>
            ) : (
              <span className="text-sm font-medium">{monthNames[currentMonth]}</span>
            )}

            {showYearSelector ? (
              <select
                value={currentYear}
                onChange={(e) => handleYearChange(parseInt(e.target.value))}
                className="rounded-md border border-border bg-background px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {generateYearOptions().map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            ) : (
              <span className="text-sm font-medium">{currentYear}</span>
            )}
          </div>

          <button
            className="flex h-8 w-8 items-center justify-center rounded-md border border-border hover:bg-accent hover:text-accent-foreground"
            onClick={() => setCursor(new Date(currentYear, currentMonth + 1, 1))}
            aria-label="Next month"
          >
            ›
          </button>
          <button
            className="flex h-8 w-8 items-center justify-center rounded-md border border-border hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
            onClick={() => setCursor(new Date(currentYear + 1, currentMonth, 1))}
            disabled={currentYear >= maxYear}
            aria-label="Next year"
          >
            ››
          </button>
        </div>

        {/* Quick Navigation */}
        <div className="flex items-center justify-center gap-1">
          <button
            className="rounded-md px-2 py-1 text-xs hover:bg-accent hover:text-accent-foreground"
            onClick={() => setCursor(today)}
          >
            Aujourd&apos;hui
          </button>
        </div>
      </div>
      <table className="w-full border-collapse text-center text-sm">
        <thead className="text-muted-foreground">
          <tr>
            {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((d) => (
              <th key={d} className="px-1 py-1 font-normal">
                {d}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, wi) => (
            <tr key={wi}>
              {week.map((date, di) => {
                const inMonth = date.getMonth() === cursor.getMonth();
                const isSelected = value && isSameDay(date, value);
                const isToday = isSameDay(date, today);
                return (
                  <td key={di} className="p-0.5">
                    <button
                      type="button"
                      className={twMerge(
                        'h-8 w-8 rounded-md text-center text-sm transition-colors',
                        'hover:bg-accent hover:text-accent-foreground',
                        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                        inMonth ? 'text-foreground' : 'text-muted-foreground opacity-50',
                        isSelected && 'bg-primary text-primary-foreground hover:bg-primary/90',
                        isToday && !isSelected && 'bg-accent text-accent-foreground font-semibold',
                        className,
                      )}
                      aria-pressed={!!isSelected}
                      onClick={() => onChange?.(date)}
                      disabled={!inMonth}
                    >
                      {date.getDate()}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

CalendarDatePicker.displayName = 'CalendarDatePicker';
