'use client';

import { useState } from 'react';
import { 
  Table, 
  Thead, 
  Tbody, 
  Tr, 
  Th, 
  Td 
} from '@cosmic-ui/components';

const CodeBlock = ({ children, onCopy }: { children: string; onCopy: () => void }) => {
  return (
    <div className="relative">
      <pre className="bg-white dark:bg-black p-2 rounded-lg overflow-x-auto text-sm">
        <code>{children}</code>
      </pre>
      <button
        onClick={onCopy}
        className="absolute top-2 right-2 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z" fill="currentColor"/>
        </svg>
      </button>
    </div>
  );
};

export default function TablePage() {
  const [showCode, setShowCode] = useState(false);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStates(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCopiedStates(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-cosmic-background text-cosmic-foreground">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button className="p-2 hover:bg-cosmic-surface rounded-lg">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h1 className="text-3xl font-bold">Table</h1>
          <button className="p-2 hover:bg-cosmic-surface rounded-lg">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Summary */}
        <p className="text-lg text-cosmic-muted mb-8">
          Le composant Table affiche des données structurées en lignes et colonnes, 
          offrant une présentation claire et organisée des informations.
        </p>

        {/* Main Preview */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-xl font-semibold">Aperçu</h2>
            <div className="flex bg-cosmic-surface rounded-lg p-1">
              <button
                onClick={() => setShowCode(false)}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  !showCode ? 'bg-cosmic-primary text-cosmic-primaryForeground' : 'text-cosmic-muted hover:text-cosmic-foreground'
                }`}
              >
                Aperçu
              </button>
              <button
                onClick={() => setShowCode(true)}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  showCode ? 'bg-cosmic-primary text-cosmic-primaryForeground' : 'text-cosmic-muted hover:text-cosmic-foreground'
                }`}
              >
                Code
              </button>
            </div>
          </div>

          <div className="w-[500px] h-[450px] border border-cosmic-border rounded-lg bg-cosmic-surface p-2 flex justify-start">
            {!showCode ? (
              <div className="p-4 w-full">
                <Table>
                  <Thead>
                    <Tr>
                      <Th>Nom</Th>
                      <Th>Email</Th>
                      <Th>Rôle</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>John Doe</Td>
                      <Td>john@example.com</Td>
                      <Td>Admin</Td>
                    </Tr>
                    <Tr>
                      <Td>Jane Smith</Td>
                      <Td>jane@example.com</Td>
                      <Td>User</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </div>
            ) : (
              <div className="w-full h-full bg-white dark:bg-black p-2 rounded">
                <CodeBlock onCopy={() => copyToClipboard(`import { 
  Table, 
  Thead, 
  Tbody, 
  Tr, 
  Th, 
  Td 
} from '@cosmic-ui/components';

export default function MyComponent() {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Nom</Th>
          <Th>Email</Th>
          <Th>Rôle</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>John Doe</Td>
          <Td>john@example.com</Td>
          <Td>Admin</Td>
        </Tr>
        <Tr>
          <Td>Jane Smith</Td>
          <Td>jane@example.com</Td>
          <Td>User</Td>
        </Tr>
      </Tbody>
    </Table>
  );
}`, 'main')}>
{`import { 
  Table, 
  Thead, 
  Tbody, 
  Tr, 
  Th, 
  Td 
} from '@cosmic-ui/components';

export default function MyComponent() {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Nom</Th>
          <Th>Email</Th>
          <Th>Rôle</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>John Doe</Td>
          <Td>john@example.com</Td>
          <Td>Admin</Td>
        </Tr>
        <Tr>
          <Td>Jane Smith</Td>
          <Td>jane@example.com</Td>
          <Td>User</Td>
        </Tr>
      </Tbody>
    </Table>
  );
}`}
                </CodeBlock>
              </div>
            )}
          </div>
        </div>

        {/* Installation */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Installation</h2>
          <div className="bg-cosmic-surface p-4 rounded-lg">
            <CodeBlock onCopy={() => copyToClipboard('npm install @cosmic-ui/components', 'install')}>
{`npm install @cosmic-ui/components`}
            </CodeBlock>
          </div>
        </div>

        {/* Usage */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Utilisation</h2>
          <div className="bg-cosmic-surface p-4 rounded-lg">
            <CodeBlock onCopy={() => copyToClipboard(`import { 
  Table, 
  Thead, 
  Tbody, 
  Tr, 
  Th, 
  Td 
} from '@cosmic-ui/components';

export default function MyComponent() {
  const data = [
    { id: 1, name: 'Alice', age: 25 },
    { id: 2, name: 'Bob', age: 30 },
    { id: 3, name: 'Charlie', age: 35 }
  ];

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>Nom</Th>
          <Th>Âge</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((item) => (
          <Tr key={item.id}>
            <Td>{item.id}</Td>
            <Td>{item.name}</Td>
            <Td>{item.age}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}`, 'usage')}>
{`import { 
  Table, 
  Thead, 
  Tbody, 
  Tr, 
  Th, 
  Td 
} from '@cosmic-ui/components';

export default function MyComponent() {
  const data = [
    { id: 1, name: 'Alice', age: 25 },
    { id: 2, name: 'Bob', age: 30 },
    { id: 3, name: 'Charlie', age: 35 }
  ];

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>Nom</Th>
          <Th>Âge</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((item) => (
          <Tr key={item.id}>
            <Td>{item.id}</Td>
            <Td>{item.name}</Td>
            <Td>{item.age}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}`}
            </CodeBlock>
          </div>
        </div>

        {/* Variants */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-6">Variantes</h2>

          {/* Complex Table */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <h3 className="text-lg font-medium">Tableau complexe</h3>
              <div className="flex bg-cosmic-surface rounded-lg p-1">
                <button
                  onClick={() => setShowCode(false)}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    !showCode ? 'bg-cosmic-primary text-cosmic-primaryForeground' : 'text-cosmic-muted hover:text-cosmic-foreground'
                  }`}
                >
                  Aperçu
                </button>
                <button
                  onClick={() => setShowCode(true)}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    showCode ? 'bg-cosmic-primary text-cosmic-primaryForeground' : 'text-cosmic-muted hover:text-cosmic-foreground'
                  }`}
                >
                  Code
                </button>
              </div>
            </div>

            <div className="w-[500px] h-[450px] border border-cosmic-border rounded-lg bg-cosmic-surface p-2 flex justify-start">
              {!showCode ? (
                <div className="p-4 w-full">
                  <Table>
                    <Thead>
                      <Tr>
                        <Th>Produit</Th>
                        <Th>Prix</Th>
                        <Th>Stock</Th>
                        <Th>Statut</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td>Laptop</Td>
                        <Td>999€</Td>
                        <Td>15</Td>
                        <Td>En stock</Td>
                      </Tr>
                      <Tr>
                        <Td>Smartphone</Td>
                        <Td>699€</Td>
                        <Td>0</Td>
                        <Td>Rupture</Td>
                      </Tr>
                      <Tr>
                        <Td>Tablette</Td>
                        <Td>399€</Td>
                        <Td>8</Td>
                        <Td>En stock</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </div>
              ) : (
                <div className="w-full h-full bg-white dark:bg-black p-2 rounded">
                  <CodeBlock onCopy={() => copyToClipboard(`import { 
  Table, 
  Thead, 
  Tbody, 
  Tr, 
  Th, 
  Td 
} from '@cosmic-ui/components';

export default function MyComponent() {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Produit</Th>
          <Th>Prix</Th>
          <Th>Stock</Th>
          <Th>Statut</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>Laptop</Td>
          <Td>999€</Td>
          <Td>15</Td>
          <Td>En stock</Td>
        </Tr>
        <Tr>
          <Td>Smartphone</Td>
          <Td>699€</Td>
          <Td>0</Td>
          <Td>Rupture</Td>
        </Tr>
        <Tr>
          <Td>Tablette</Td>
          <Td>399€</Td>
          <Td>8</Td>
          <Td>En stock</Td>
        </Tr>
      </Tbody>
    </Table>
  );
}`, 'complex')}>
{`import { 
  Table, 
  Thead, 
  Tbody, 
  Tr, 
  Th, 
  Td 
} from '@cosmic-ui/components';

export default function MyComponent() {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Produit</Th>
          <Th>Prix</Th>
          <Th>Stock</Th>
          <Th>Statut</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>Laptop</Td>
          <Td>999€</Td>
          <Td>15</Td>
          <Td>En stock</Td>
        </Tr>
        <Tr>
          <Td>Smartphone</Td>
          <Td>699€</Td>
          <Td>0</Td>
          <Td>Rupture</Td>
        </Tr>
        <Tr>
          <Td>Tablette</Td>
          <Td>399€</Td>
          <Td>8</Td>
          <Td>En stock</Td>
        </Tr>
      </Tbody>
    </Table>
  );
}`}
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
