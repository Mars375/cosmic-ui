'use client';

import { useState } from 'react';
import { FileExplorer } from '@cosmic-ui/ui';
import { Button } from '@cosmic-ui/ui';
import { Folder, File, Upload, Search } from 'lucide-react';

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

export default function FileExplorerPage() {
  const [showCode, setShowCode] = useState(false);
  const [showCodeVariants, setShowCodeVariants] = useState(false);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [expandedFolders, setExpandedFolders] = useState(new Set(['documents', 'images']));

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStates(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCopiedStates(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

  const sampleFiles = [
    {
      id: 'documents',
      name: 'Documents',
      type: 'folder' as const,
      path: '/documents',
      modified: new Date('2024-01-15'),
      children: [
        {
          id: 'report.pdf',
          name: 'Rapport.pdf',
          type: 'file' as const,
          size: 1024000,
          path: '/documents/rapport.pdf',
          modified: new Date('2024-01-14'),
          extension: 'pdf',
        },
        {
          id: 'presentation.pptx',
          name: 'Présentation.pptx',
          type: 'file' as const,
          size: 2048000,
          path: '/documents/presentation.pptx',
          modified: new Date('2024-01-13'),
          extension: 'pptx',
        },
      ],
    },
    {
      id: 'images',
      name: 'Images',
      type: 'folder' as const,
      path: '/images',
      modified: new Date('2024-01-12'),
      children: [
        {
          id: 'photo1.jpg',
          name: 'Photo1.jpg',
          type: 'file' as const,
          size: 512000,
          path: '/images/photo1.jpg',
          modified: new Date('2024-01-11'),
          extension: 'jpg',
        },
        {
          id: 'logo.png',
          name: 'Logo.png',
          type: 'file' as const,
          size: 256000,
          path: '/images/logo.png',
          modified: new Date('2024-01-10'),
          extension: 'png',
        },
      ],
    },
    {
      id: 'readme.txt',
      name: 'README.txt',
      type: 'file' as const,
      size: 1024,
      path: '/readme.txt',
      modified: new Date('2024-01-09'),
      extension: 'txt',
    },
  ];

  const handleFileSelect = (file: any) => {
    setSelectedFile(file);
  };

  const handleFolderToggle = (folder: any) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folder.id)) {
      newExpanded.delete(folder.id);
    } else {
      newExpanded.add(folder.id);
    }
    setExpandedFolders(newExpanded);
  };

  const handleFileUpload = (file: File) => {
    console.log('Upload file:', file.name);
  };

  const handleFileDelete = (file: any) => {
    console.log('Delete file:', file.name);
  };

  const handleFileRename = (file: any, newName: string) => {
    console.log('Rename file:', file.name, 'to', newName);
  };

  const handleFolderCreate = (name: string) => {
    console.log('Create folder:', name);
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
          <h1 className="text-4xl font-bold">FileExplorer</h1>
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
          Un composant d'explorateur de fichiers avec navigation, recherche et
          gestion de fichiers.
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

          <div className="bg-cosmic-card border border-cosmic-border rounded-lg p-2 min-h-[450px] w-[500px] flex justify-start">
            {!showCode ? (
              <div className="p-4 w-full">
                <FileExplorer
                  files={sampleFiles}
                  onFileSelect={handleFileSelect}
                  onFolderToggle={handleFolderToggle}
                  onFileUpload={handleFileUpload}
                  onFileDelete={handleFileDelete}
                  onFileRename={handleFileRename}
                  onFolderCreate={handleFolderCreate}
                  selectedFile={selectedFile}
                  expandedFolders={expandedFolders}
                  showToolbar={true}
                  showSearch={true}
                  showDetails={true}
                  maxHeight={350}
                />
              </div>
            ) : (
              <div className="w-full">
                <CodeBlock
                  onCopy={() =>
                    handleCopy(
                      `import { FileExplorer } from '@cosmic-ui/ui';
import { useState } from 'react';

export function MyFileExplorer() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [expandedFolders, setExpandedFolders] = useState(new Set(['documents']));

  const files = [
    {
      id: 'documents',
      name: 'Documents',
      type: 'folder',
      path: '/documents',
      modified: new Date('2024-01-15'),
      children: [
        {
          id: 'report.pdf',
          name: 'Rapport.pdf',
          type: 'file',
          size: 1024000,
          path: '/documents/rapport.pdf',
          modified: new Date('2024-01-14'),
          extension: 'pdf',
        },
      ],
    },
    {
      id: 'readme.txt',
      name: 'README.txt',
      type: 'file',
      size: 1024,
      path: '/readme.txt',
      modified: new Date('2024-01-09'),
      extension: 'txt',
    },
  ];

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleFolderToggle = (folder) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folder.id)) {
      newExpanded.delete(folder.id);
    } else {
      newExpanded.add(folder.id);
    }
    setExpandedFolders(newExpanded);
  };

  const handleFileUpload = (file) => {
    console.log('Upload file:', file.name);
  };

  const handleFileDelete = (file) => {
    console.log('Delete file:', file.name);
  };

  const handleFileRename = (file, newName) => {
    console.log('Rename file:', file.name, 'to', newName);
  };

  const handleFolderCreate = (name) => {
    console.log('Create folder:', name);
  };

  return (
    <FileExplorer
      files={files}
      onFileSelect={handleFileSelect}
      onFolderToggle={handleFolderToggle}
      onFileUpload={handleFileUpload}
      onFileDelete={handleFileDelete}
      onFileRename={handleFileRename}
      onFolderCreate={handleFolderCreate}
      selectedFile={selectedFile}
      expandedFolders={expandedFolders}
      showToolbar={true}
      showSearch={true}
      showDetails={true}
      maxHeight={350}
    />
  );
}`,
                      'main'
                    )
                  }
                >
                  {`import { FileExplorer } from '@cosmic-ui/ui';
import { useState } from 'react';

export function MyFileExplorer() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [expandedFolders, setExpandedFolders] = useState(new Set(['documents']));

  const files = [
    {
      id: 'documents',
      name: 'Documents',
      type: 'folder',
      path: '/documents',
      modified: new Date('2024-01-15'),
      children: [
        {
          id: 'report.pdf',
          name: 'Rapport.pdf',
          type: 'file',
          size: 1024000,
          path: '/documents/rapport.pdf',
          modified: new Date('2024-01-14'),
          extension: 'pdf',
        },
      ],
    },
    {
      id: 'readme.txt',
      name: 'README.txt',
      type: 'file',
      size: 1024,
      path: '/readme.txt',
      modified: new Date('2024-01-09'),
      extension: 'txt',
    },
  ];

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleFolderToggle = (folder) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folder.id)) {
      newExpanded.delete(folder.id);
    } else {
      newExpanded.add(folder.id);
    }
    setExpandedFolders(newExpanded);
  };

  const handleFileUpload = (file) => {
    console.log('Upload file:', file.name);
  };

  const handleFileDelete = (file) => {
    console.log('Delete file:', file.name);
  };

  const handleFileRename = (file, newName) => {
    console.log('Rename file:', file.name, 'to', newName);
  };

  const handleFolderCreate = (name) => {
    console.log('Create folder:', name);
  };

  return (
    <FileExplorer
      files={files}
      onFileSelect={handleFileSelect}
      onFolderToggle={handleFolderToggle}
      onFileUpload={handleFileUpload}
      onFileDelete={handleFileDelete}
      onFileRename={handleFileRename}
      onFolderCreate={handleFolderCreate}
      selectedFile={selectedFile}
      expandedFolders={expandedFolders}
      showToolbar={true}
      showSearch={true}
      showDetails={true}
      maxHeight={350}
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
              Le composant FileExplorer est déjà inclus dans le package
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
              Utilisez le composant pour créer un explorateur de fichiers.
            </p>
            <CodeBlock
              onCopy={() =>
                handleCopy(
                  `import { FileExplorer } from '@cosmic-ui/ui';

const files = [
  {
    id: 'documents',
    name: 'Documents',
    type: 'folder',
    path: '/documents',
    modified: new Date(),
    children: [],
  },
];

<FileExplorer
  files={files}
  onFileSelect={(file) => console.log(file)}
  onFolderToggle={(folder) => console.log(folder)}
  showToolbar={true}
  showSearch={true}
/>`,
                  'usage'
                )
              }
            >
              {`import { FileExplorer } from '@cosmic-ui/ui';

const files = [
  {
    id: 'documents',
    name: 'Documents',
    type: 'folder',
    path: '/documents',
    modified: new Date(),
    children: [],
  },
];

<FileExplorer
  files={files}
  onFileSelect={(file) => console.log(file)}
  onFolderToggle={(folder) => console.log(folder)}
  showToolbar={true}
  showSearch={true}
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

            <div className="bg-cosmic-card border border-cosmic-border rounded-lg p-2 min-h-[450px] w-[500px] flex justify-start">
              {!showCodeVariants ? (
                <div className="p-4 w-full space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Sans toolbar
                    </h3>
                    <FileExplorer
                      files={sampleFiles.slice(0, 2)}
                      onFileSelect={handleFileSelect}
                      onFolderToggle={handleFolderToggle}
                      selectedFile={selectedFile}
                      expandedFolders={expandedFolders}
                      showToolbar={false}
                      showSearch={false}
                      showDetails={false}
                      maxHeight={200}
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Avec recherche
                    </h3>
                    <FileExplorer
                      files={sampleFiles.slice(0, 2)}
                      onFileSelect={handleFileSelect}
                      onFolderToggle={handleFolderToggle}
                      selectedFile={selectedFile}
                      expandedFolders={expandedFolders}
                      showToolbar={false}
                      showSearch={true}
                      showDetails={false}
                      maxHeight={200}
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full">
                  <CodeBlock
                    onCopy={() =>
                      handleCopy(
                        `// Sans toolbar
<FileExplorer
  files={files}
  onFileSelect={handleFileSelect}
  onFolderToggle={handleFolderToggle}
  showToolbar={false}
  showSearch={false}
  showDetails={false}
/>

// Avec recherche
<FileExplorer
  files={files}
  onFileSelect={handleFileSelect}
  onFolderToggle={handleFolderToggle}
  showToolbar={false}
  showSearch={true}
  showDetails={false}
/>

// Avec détails
<FileExplorer
  files={files}
  onFileSelect={handleFileSelect}
  onFolderToggle={handleFolderToggle}
  showToolbar={true}
  showSearch={true}
  showDetails={true}
/>

// Lecture seule
<FileExplorer
  files={files}
  onFileSelect={handleFileSelect}
  onFolderToggle={handleFolderToggle}
  showToolbar={false}
  showSearch={true}
  showDetails={true}
/>`,
                        'variants'
                      )
                    }
                  >
                    {`// Sans toolbar
<FileExplorer
  files={files}
  onFileSelect={handleFileSelect}
  onFolderToggle={handleFolderToggle}
  showToolbar={false}
  showSearch={false}
  showDetails={false}
/>

// Avec recherche
<FileExplorer
  files={files}
  onFileSelect={handleFileSelect}
  onFolderToggle={handleFolderToggle}
  showToolbar={false}
  showSearch={true}
  showDetails={false}
/>

// Avec détails
<FileExplorer
  files={files}
  onFileSelect={handleFileSelect}
  onFolderToggle={handleFolderToggle}
  showToolbar={true}
  showSearch={true}
  showDetails={true}
/>

// Lecture seule
<FileExplorer
  files={files}
  onFileSelect={handleFileSelect}
  onFolderToggle={handleFolderToggle}
  showToolbar={false}
  showSearch={true}
  showDetails={true}
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
