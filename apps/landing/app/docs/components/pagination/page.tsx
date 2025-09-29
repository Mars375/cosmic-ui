'use client';

import { useState } from 'react';
import { Pagination } from '@cosmic-ui/ui';

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

export default function PaginationPage() {
  const [showCode, setShowCode] = useState(false);
  const [showCodeVariants, setShowCodeVariants] = useState(false);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const [currentPage, setCurrentPage] = useState(5);

  const handleCopy = (text: string, id: string) => {
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
          <h1 className="text-4xl font-bold">Pagination</h1>
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
          Un composant de pagination simple et accessible pour naviguer entre
          les pages de contenu.
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
              <div className="p-4 w-full flex items-center justify-center">
                <Pagination
                  totalPages={10}
                  page={currentPage}
                  onPageChange={setCurrentPage}
                />
              </div>
            ) : (
              <div className="w-full h-full">
                <CodeBlock
                  onCopy={() =>
                    handleCopy(
                      `import { Pagination } from '@cosmic-ui/ui';
import { useState } from 'react';

export function MyPagination() {
  const [currentPage, setCurrentPage] = useState(5);

  return (
    <Pagination
      totalPages={10}
      page={currentPage}
      onPageChange={setCurrentPage}
    />
  );
}`,
                      'main'
                    )
                  }
                >
                  {`import { Pagination } from '@cosmic-ui/ui';
import { useState } from 'react';

export function MyPagination() {
  const [currentPage, setCurrentPage] = useState(5);

  return (
    <Pagination
      totalPages={10}
      page={currentPage}
      onPageChange={setCurrentPage}
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
              Le composant Pagination est déjà inclus dans le package
              @cosmic-ui/ui.
            </p>
            <CodeBlock
              onCopy={() =>
                handleCopy(`npm install @cosmic-ui/ui`, 'install')
              }
            >
              {`npm install @cosmic-ui/ui`}
            </CodeBlock>
          </div>
        </div>

        {/* Usage */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Utilisation</h2>
          <div className="bg-cosmic-card border border-cosmic-border rounded-lg p-4">
            <p className="text-cosmic-muted-foreground mb-4">
              Importez le composant et utilisez-le avec le nombre total de pages
              et la page actuelle.
            </p>
            <CodeBlock
              onCopy={() =>
                handleCopy(
                  `import { Pagination } from '@cosmic-ui/ui';

<Pagination
  totalPages={20}
  page={1}
  onPageChange={(page) => console.log('Page changed:', page)}
/>`,
                  'usage'
                )
              }
            >
              {`import { Pagination } from '@cosmic-ui/ui';

<Pagination
  totalPages={20}
  page={1}
  onPageChange={(page) => console.log('Page changed:', page)}
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
                <div className="p-4 w-full space-y-8">
                  <div className="text-center">
                    <h3 className="text-sm font-medium mb-4">Page 1 sur 10</h3>
                    <Pagination
                      totalPages={10}
                      page={1}
                      onPageChange={() => {}}
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-sm font-medium mb-4">Page 5 sur 10</h3>
                    <Pagination
                      totalPages={10}
                      page={5}
                      onPageChange={() => {}}
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-sm font-medium mb-4">Page 10 sur 10</h3>
                    <Pagination
                      totalPages={10}
                      page={10}
                      onPageChange={() => {}}
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full h-full">
                  <CodeBlock
                    onCopy={() =>
                      handleCopy(
                        `// Page 1 sur 10
<Pagination
  totalPages={10}
  page={1}
  onPageChange={(page) => setCurrentPage(page)}
/>

// Page 5 sur 10
<Pagination
  totalPages={10}
  page={5}
  onPageChange={(page) => setCurrentPage(page)}
/>

// Page 10 sur 10
<Pagination
  totalPages={10}
  page={10}
  onPageChange={(page) => setCurrentPage(page)}
/>`,
                        'variants'
                      )
                    }
                  >
                    {`// Page 1 sur 10
<Pagination
  totalPages={10}
  page={1}
  onPageChange={(page) => setCurrentPage(page)}
/>

// Page 5 sur 10
<Pagination
  totalPages={10}
  page={5}
  onPageChange={(page) => setCurrentPage(page)}
/>

// Page 10 sur 10
<Pagination
  totalPages={10}
  page={10}
  onPageChange={(page) => setCurrentPage(page)}
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
