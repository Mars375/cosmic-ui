'use client';

import { useState } from 'react';
import { DataTable } from '@cosmic-ui/react';
import { Badge } from '@cosmic-ui/react';

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

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

export default function DataTablePage() {
  const [showCode, setShowCode] = useState(false);
  const [showCodeVariants, setShowCodeVariants] = useState(false);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const [selectedRows, setSelectedRows] = useState<Array<string | number>>([]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStates(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCopiedStates(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

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
          <h1 className="text-4xl font-bold">DataTable</h1>
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
          Un composant de tableau de données avec tri, sélection et pagination.
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

          <div className="bg-cosmic-card border border-cosmic-border rounded-lg p-2 h-[450px] w-[500px] flex justify-start">
            {!showCode ? (
              <div className="p-4 w-full">
                <DataTable
                  columns={columns}
                  data={sampleData}
                  selectableRows
                  selectedRowIds={selectedRows}
                  onSelectedRowIdsChange={setSelectedRows}
                  pageSize={3}
                />
              </div>
            ) : (
              <div className="w-full h-full">
                <CodeBlock
                  onCopy={() =>
                    handleCopy(
                      `import { DataTable } from '@cosmic-ui/react';
import { Badge } from '@cosmic-ui/react';
import { useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

export function MyDataTable() {
  const [selectedRows, setSelectedRows] = useState<Array<string | number>>([]);

  const data: User[] = [
    { id: 1, name: 'Jean Dupont', email: 'jean@example.com', role: 'Admin', status: 'active' },
    { id: 2, name: 'Marie Martin', email: 'marie@example.com', role: 'User', status: 'active' },
    { id: 3, name: 'Pierre Durand', email: 'pierre@example.com', role: 'User', status: 'inactive' },
    { id: 4, name: 'Sophie Bernard', email: 'sophie@example.com', role: 'Moderator', status: 'active' },
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
    <DataTable
      columns={columns}
      data={data}
      selectableRows
      selectedRowIds={selectedRows}
      onSelectedRowIdsChange={setSelectedRows}
      pageSize={3}
    />
  );
}`,
                      'main'
                    )
                  }
                >
                  {`import { DataTable } from '@cosmic-ui/react';
import { Badge } from '@cosmic-ui/react';
import { useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

export function MyDataTable() {
  const [selectedRows, setSelectedRows] = useState<Array<string | number>>([]);

  const data: User[] = [
    { id: 1, name: 'Jean Dupont', email: 'jean@example.com', role: 'Admin', status: 'active' },
    { id: 2, name: 'Marie Martin', email: 'marie@example.com', role: 'User', status: 'active' },
    { id: 3, name: 'Pierre Durand', email: 'pierre@example.com', role: 'User', status: 'inactive' },
    { id: 4, name: 'Sophie Bernard', email: 'sophie@example.com', role: 'Moderator', status: 'active' },
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
    <DataTable
      columns={columns}
      data={data}
      selectableRows
      selectedRowIds={selectedRows}
      onSelectedRowIdsChange={setSelectedRows}
      pageSize={3}
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
              Le composant DataTable est déjà inclus dans le package
              @cosmic-ui/react.
            </p>
            <CodeBlock
              onCopy={() =>
                handleCopy(`npm install @cosmic-ui/react`, 'install')
              }
            >
              {`npm install @cosmic-ui/react`}
            </CodeBlock>
          </div>
        </div>

        {/* Usage */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Utilisation</h2>
          <div className="bg-cosmic-card border border-cosmic-border rounded-lg p-4">
            <p className="text-cosmic-muted-foreground mb-4">
              Créez des tableaux de données avec tri, sélection et pagination.
            </p>
            <CodeBlock
              onCopy={() =>
                handleCopy(
                  `import { DataTable } from '@cosmic-ui/react';

const columns = [
  { key: 'name', header: 'Nom', sortable: true },
  { key: 'email', header: 'Email', sortable: true },
];

const data = [
  { id: 1, name: 'Jean Dupont', email: 'jean@example.com' },
  { id: 2, name: 'Marie Martin', email: 'marie@example.com' },
];

<DataTable
  columns={columns}
  data={data}
  selectableRows
  pageSize={10}
/>`,
                  'usage'
                )
              }
            >
              {`import { DataTable } from '@cosmic-ui/react';

const columns = [
  { key: 'name', header: 'Nom', sortable: true },
  { key: 'email', header: 'Email', sortable: true },
];

const data = [
  { id: 1, name: 'Jean Dupont', email: 'jean@example.com' },
  { id: 2, name: 'Marie Martin', email: 'marie@example.com' },
];

<DataTable
  columns={columns}
  data={data}
  selectableRows
  pageSize={10}
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

            <div className="bg-cosmic-card border border-cosmic-border rounded-lg p-2 h-[450px] w-[500px] flex justify-start">
              {!showCodeVariants ? (
                <div className="p-4 w-full space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Tableau simple</h3>
                    <DataTable
                      columns={columns.slice(0, 2)}
                      data={sampleData.slice(0, 2)}
                      pageSize={2}
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">Avec sélection</h3>
                    <DataTable
                      columns={columns.slice(0, 3)}
                      data={sampleData.slice(0, 2)}
                      selectableRows
                      selectedRowIds={selectedRows}
                      onSelectedRowIdsChange={setSelectedRows}
                      pageSize={2}
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full h-full">
                  <CodeBlock
                    onCopy={() =>
                      handleCopy(
                        `// Tableau simple
<DataTable
  columns={columns.slice(0, 2)}
  data={data.slice(0, 2)}
  pageSize={2}
/>

// Avec sélection
<DataTable
  columns={columns.slice(0, 3)}
  data={data.slice(0, 2)}
  selectableRows
  selectedRowIds={selectedRows}
  onSelectedRowIdsChange={setSelectedRows}
  pageSize={2}
/>

// Avec tri personnalisé
<DataTable
  columns={columns}
  data={data}
  defaultSortKey="name"
  defaultSortDirection="asc"
  onSortChange={(key, direction) => {
    console.log('Sort:', key, direction);
  }}
/>`,
                        'variants'
                      )
                    }
                  >
                    {`// Tableau simple
<DataTable
  columns={columns.slice(0, 2)}
  data={data.slice(0, 2)}
  pageSize={2}
/>

// Avec sélection
<DataTable
  columns={columns.slice(0, 3)}
  data={data.slice(0, 2)}
  selectableRows
  selectedRowIds={selectedRows}
  onSelectedRowIdsChange={setSelectedRows}
  pageSize={2}
/>

// Avec tri personnalisé
<DataTable
  columns={columns}
  data={data}
  defaultSortKey="name"
  defaultSortDirection="asc"
  onSortChange={(key, direction) => {
    console.log('Sort:', key, direction);
  }}
/>`}
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
