'use client';

import * as React from 'react';
import { useState } from 'react';
import { CodeBlock } from '../../../components/code-block';
import { DataTable } from 'cosmic-ui-mars';
import { Badge } from 'cosmic-ui-mars';
import { Table } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

export default function DataTablePage() {
  const [selectedRows, setSelectedRows] = useState<Array<string | number>>([]);

  const sampleData: User[] = [
    {
      id: 1,
      name: 'Jean Dupont',
      email: 'jean@example.com',
      role: 'Admin',
      status: 'active',
    },
    {
      id: 2,
      name: 'Marie Martin',
      email: 'marie@example.com',
      role: 'User',
      status: 'active',
    },
    {
      id: 3,
      name: 'Pierre Durand',
      email: 'pierre@example.com',
      role: 'User',
      status: 'inactive',
    },
    {
      id: 4,
      name: 'Sophie Bernard',
      email: 'sophie@example.com',
      role: 'Moderator',
      status: 'active',
    },
  ];

  const columns = [
    {
      key: 'name',
      header: 'Nom',
      sortable: true,
    },
    {
      key: 'email',
      header: 'Email',
      sortable: true,
    },
    {
      key: 'role',
      header: 'Rôle',
      sortable: true,
    },
    {
      key: 'status',
      header: 'Statut',
      render: (row: User) => (
        <Badge variant={row.status === 'active' ? 'default' : 'secondary'}>
          {row.status === 'active' ? 'Actif' : 'Inactif'}
        </Badge>
      ),
    },
  ];

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Table className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">DataTable</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Tableau de données avec tri, filtrage et sélection pour afficher des
          données structurées.
        </p>
      </div>

      {/* Installation */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">
          Installation
        </h2>
        <CodeBlock filePath="package.json">pnpm add cosmic-ui-mars</CodeBlock>
      </div>

      {/* Usage basique */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">
          Usage basique
        </h2>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Exemple</h3>
            <div className="p-6 bg-muted/30 rounded-lg border">
              <DataTable
                data={sampleData}
                columns={columns}
                selectedRowIds={selectedRows}
                onSelectedRowIdsChange={setSelectedRows}
                selectableRows
              />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4 text-foreground">Code</h3>
            <CodeBlock
              language="typescript"
              filePath="components/DataTableExample.tsx"
              showPackageManager={false}
            >
              {`import { DataTable } from 'cosmic-ui-mars';
import { Badge } from 'cosmic-ui-mars';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

const sampleData: User[] = [
  {
    id: 1,
    name: 'Jean Dupont',
    email: 'jean@example.com',
    role: 'Admin',
    status: 'active',
  },
];

const columns = [
  {
    key: 'name',
    header: 'Nom',
    sortable: true,
  },
  {
    key: 'status',
    header: 'Statut',
    render: (row: User) => (
      <Badge variant={row.status === 'active' ? 'default' : 'secondary'}>
        {row.status === 'active' ? 'Actif' : 'Inactif'}
      </Badge>
    ),
  },
];

<DataTable
  data={sampleData}
  columns={columns}
  selectableRows
/>`}
            </CodeBlock>
          </div>
        </div>
      </div>

      {/* Variants */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">
          Variants
        </h2>
        <div className="space-y-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">
                Tableau avec pagination
              </h3>
              <p className="text-muted-foreground">
                Tableau avec pagination pour de grandes quantités de données.
              </p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <DataTable data={sampleData} columns={columns} pageSize={2} />
              </div>
            </div>
            <div>
              <CodeBlock
                language="typescript"
                filePath="components/PaginatedDataTable.tsx"
                showPackageManager={false}
              >
                {`export default function App\docs\components\dataTable\page.tsxExample() {
  return <DataTable
  data={sampleData}
  columns={columns}
  pageSize={10}
/>;
}`}
              </CodeBlock>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">
                Tableau avec tri
              </h3>
              <p className="text-muted-foreground">
                Tableau avec fonctionnalité de tri sur les colonnes.
              </p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <DataTable
                  data={sampleData}
                  columns={columns}
                  defaultSortKey="name"
                  defaultSortDirection="asc"
                />
              </div>
            </div>
            <div>
              <CodeBlock
                language="typescript"
                filePath="components/SortableDataTable.tsx"
                showPackageManager={false}
              >
                {`export default function App\docs\components\dataTable\page.tsxExample() {
  <DataTable
  data={sampleData}
  columns={columns}
  defaultSortKey="name"
  defaultSortDirection="asc"
  onSortChange={(key, direction) => console.log('Sort:', key, direction)}
/>
}`}
              </CodeBlock>
            </div>
          </div>
        </div>
      </div>

      {/* Référence API */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">
          Référence API
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-border rounded-lg">
            <thead>
              <tr className="bg-muted/50">
                <th className="border border-border px-4 py-3 text-left font-medium text-foreground">
                  Prop
                </th>
                <th className="border border-border px-4 py-3 text-left font-medium text-foreground">
                  Type
                </th>
                <th className="border border-border px-4 py-3 text-left font-medium text-foreground">
                  Défaut
                </th>
                <th className="border border-border px-4 py-3 text-left font-medium text-foreground">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">
                  data
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  T[]
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  []
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  Données à afficher
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">
                  columns
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  Column[]
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  []
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  Configuration des colonnes
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">
                  selectableRows
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  boolean
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  false
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  Activer la sélection de lignes
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">
                  selectedRowIds
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  Array&lt;string | number&gt;
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  []
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  IDs des lignes sélectionnées
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">
                  onSelectedRowIdsChange
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  (ids: Array&lt;string | number&gt;) =&gt; void
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  -
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  Callback lors du changement de sélection
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">
                  pageSize
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  number
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  10
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  Nombre d'éléments par page
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">
                  defaultSortKey
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  string
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  -
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  Clé de tri par défaut
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">
                  defaultSortDirection
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  'asc' | 'desc'
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  'asc'
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  Direction de tri par défaut
                </td>
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
          <li>
            • Utilisez{' '}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              pageSize
            </code>{' '}
            pour contrôler le nombre d'éléments par page
          </li>
          <li>
            • Activez{' '}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              selectableRows
            </code>{' '}
            pour permettre la sélection multiple
          </li>
          <li>
            • Rendez les colonnes{' '}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              triables
            </code>{' '}
            quand c'est pertinent
          </li>
          <li>
            • Utilisez des{' '}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              render functions
            </code>{' '}
            pour personnaliser l'affichage
          </li>
          <li>
            • Respectez les{' '}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              guidelines d'accessibilité
            </code>
          </li>
        </ul>
      </div>
    </div>
  );
}
