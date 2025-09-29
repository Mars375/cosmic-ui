import * as React from 'react';
import { twMerge } from 'tailwind-merge';

export type SortDirection = 'asc' | 'desc';

export type DataTableColumn<T> = {
  key: keyof T | string;
  header: string;
  sortable?: boolean;
  width?: string | number;
  render?: (row: T) => React.ReactNode;
};

export interface DataTableProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  columns: Array<DataTableColumn<T>>;
  data: T[];
  getRowId?: (row: T, index: number) => string | number;
  selectableRows?: boolean;
  selectedRowIds?: Array<string | number>;
  onSelectedRowIdsChange?: (ids: Array<string | number>) => void;
  sortKey?: string;
  sortDirection?: SortDirection;
  defaultSortKey?: string;
  defaultSortDirection?: SortDirection;
  onSortChange?: (key: string, direction: SortDirection) => void;
  page?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
}

export function DataTable<T extends Record<string, any>>({
  className,
  columns,
  data,
  getRowId = (_row, index) => index,
  selectableRows,
  selectedRowIds,
  onSelectedRowIdsChange,
  sortKey: controlledSortKey,
  sortDirection: controlledSortDir,
  defaultSortKey,
  defaultSortDirection = 'asc',
  onSortChange,
  page: controlledPage,
  pageSize = 10,
  onPageChange,
  ...props
}: DataTableProps<T>) {
  const isSortControlled = controlledSortKey !== undefined && controlledSortDir !== undefined;
  const [uncontrolledSort, setUncontrolledSort] = React.useState<{
    key: string;
    dir: SortDirection;
  } | null>(defaultSortKey ? { key: defaultSortKey, dir: defaultSortDirection } : null);
  const sortKey = isSortControlled
    ? (controlledSortKey as string | undefined)
    : uncontrolledSort?.key;
  const sortDir = isSortControlled ? controlledSortDir : uncontrolledSort?.dir;

  const setSort = (key: string) => {
    let nextDir: SortDirection = 'asc';
    if (sortKey === key) nextDir = sortDir === 'asc' ? 'desc' : 'asc';
    if (!isSortControlled) setUncontrolledSort({ key, dir: nextDir });
    onSortChange?.(key, nextDir);
  };

  const isPageControlled = controlledPage !== undefined;
  const [uncontrolledPage, setUncontrolledPage] = React.useState<number>(1);
  const page = isPageControlled ? (controlledPage as number) : uncontrolledPage;
  const setPage = (p: number) => {
    if (!isPageControlled) setUncontrolledPage(p);
    onPageChange?.(p);
  };

  const [uncontrolledSelected, setUncontrolledSelected] = React.useState<Array<string | number>>(
    [],
  );
  const isSelectionControlled = selectedRowIds !== undefined;
  const selectedIds = isSelectionControlled
    ? (selectedRowIds as Array<string | number>)
    : uncontrolledSelected;
  const setSelected = (ids: Array<string | number>) => {
    if (!isSelectionControlled) setUncontrolledSelected(ids);
    onSelectedRowIdsChange?.(ids);
  };

  const sortedData = React.useMemo(() => {
    if (!sortKey) return data;
    const copy = [...data];
    copy.sort((a, b) => {
      const va = (a as any)[sortKey];
      const vb = (b as any)[sortKey];
      if (va == null && vb == null) return 0;
      if (va == null) return sortDir === 'asc' ? -1 : 1;
      if (vb == null) return sortDir === 'asc' ? 1 : -1;
      if (va < vb) return sortDir === 'asc' ? -1 : 1;
      if (va > vb) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
    return copy;
  }, [data, sortKey, sortDir]);

  const total = sortedData.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;
  const end = start + pageSize;
  const pageRows = sortedData.slice(start, end);

  const allVisibleIds = pageRows.map((row, idx) => getRowId(row, start + idx));
  const allSelectedOnPage =
    allVisibleIds.length > 0 && allVisibleIds.every((id) => selectedIds.includes(id));

  const toggleAllOnPage = () => {
    if (!selectableRows) return;
    if (allSelectedOnPage) {
      setSelected(selectedIds.filter((id) => !allVisibleIds.includes(id)));
    } else {
      const union = new Set([...selectedIds, ...allVisibleIds]);
      setSelected(Array.from(union));
    }
  };

  const toggleOne = (id: string | number) => {
    if (!selectableRows) return;
    if (selectedIds.includes(id)) setSelected(selectedIds.filter((x) => x !== id));
    else setSelected([...selectedIds, id]);
  };

  return (
    <div className={twMerge('w-full', className)} {...props}>
      <div className="overflow-auto rounded-lg border border-cosmic-border">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-white/[0.04] text-white/80">
            <tr>
              {selectableRows ? (
                <th scope="col" className="px-3 py-2 w-10">
                  <input
                    aria-label="Select all rows on page"
                    type="checkbox"
                    checked={allSelectedOnPage}
                    onChange={toggleAllOnPage}
                  />
                </th>
              ) : null}
              {columns.map((col) => {
                const key = String(col.key);
                const isSorted = sortKey === key;
                const ariaSort = isSorted
                  ? sortDir === 'asc'
                    ? 'ascending'
                    : 'descending'
                  : 'none';
                return (
                  <th
                    key={key}
                    scope="col"
                    className="px-3 py-2 font-semibold"
                    style={{ width: col.width }}
                    aria-sort={ariaSort as any}
                  >
                    {col.sortable ? (
                      <button
                        type="button"
                        onClick={() => setSort(key)}
                        className="inline-flex items-center gap-1 rounded px-1 py-0.5 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-cosmic-primary"
                        aria-label={`Sort by ${col.header}`}
                      >
                        {col.header}
                        <span aria-hidden className="text-xs opacity-70">
                          {isSorted ? (sortDir === 'asc' ? '▲' : '▼') : '↕'}
                        </span>
                      </button>
                    ) : (
                      <span>{col.header}</span>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {pageRows.map((row, idx) => {
              const id = getRowId(row, start + idx);
              const selected = selectedIds.includes(id);
              return (
                <tr
                  key={String(id)}
                  aria-selected={selectableRows ? selected : undefined}
                  className="border-t border-cosmic-border hover:bg-white/[0.02]"
                >
                  {selectableRows ? (
                    <td className="px-3 py-2">
                      <input
                        aria-label={`Select row ${idx + 1}`}
                        type="checkbox"
                        checked={selected}
                        onChange={() => toggleOne(id)}
                      />
                    </td>
                  ) : null}
                  {columns.map((col) => {
                    const key = String(col.key);
                    return (
                      <td key={key} className="px-3 py-2 text-white/90">
                        {col.render ? col.render(row) : String(row[key] ?? '')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-3 flex items-center justify-between text-sm text-white/80">
        <div>
          Page {safePage} / {totalPages}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="rounded-md border border-cosmic-border px-3 py-1 hover:bg-white/10 disabled:opacity-50"
            onClick={() => setPage(Math.max(1, safePage - 1))}
            disabled={safePage <= 1}
          >
            Previous
          </button>
          <button
            type="button"
            className="rounded-md border border-cosmic-border px-3 py-1 hover:bg-white/10 disabled:opacity-50"
            onClick={() => setPage(Math.min(totalPages, safePage + 1))}
            disabled={safePage >= totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
