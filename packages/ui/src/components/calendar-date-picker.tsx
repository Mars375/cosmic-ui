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
}

export const CalendarDatePicker = ({
  className,
  value,
  onChange,
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

  return (
    <div className={twMerge('inline-block rounded-md p-3', className)} {...props}>
      <div className="mb-2 flex items-center justify-between">
        <button
          className="rounded px-2 py-1 text-xs"
          onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
          aria-label="Previous month"
        >
          ‹
        </button>
        <div className="text-sm font-medium">
          {monthNames[cursor.getMonth()]} {cursor.getFullYear()}
        </div>
        <button
          className="rounded px-2 py-1 text-xs"
          onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
          aria-label="Next month"
        >
          ›
        </button>
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
                  <td key={di} className="p-1">
                    <button
                      type="button"
                      className={twMerge(
                        'h-8 w-8 rounded-md border text-center text-foreground',
                        className,
                      )}
                      aria-pressed={!!isSelected}
                      onClick={() => onChange?.(date)}
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
