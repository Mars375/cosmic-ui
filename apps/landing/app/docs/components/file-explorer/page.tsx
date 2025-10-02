'use client';

import * as React from 'react';
import { useState } from 'react';
import { CodeBlock } from '../../../components/code-block';
import { FileExplorer } from 'cosmic-ui-mars';
import { Button } from 'cosmic-ui-mars';
import { Folder, File, Upload, Search } from 'lucide-react';

export default function FileExplorerPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [expandedFolders, setExpandedFolders] = useState(new Set(['documents', 'images']));

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
          id: 'photo2.png',
          name: 'Photo2.png',
          type: 'file' as const,
          size: 768000,
          path: '/images/photo2.png',
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

  const handleFolderToggle = (folderId: string) => {
    setExpandedFolders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(folderId)) {
        newSet.delete(folderId);
      } else {
        newSet.add(folderId);
      }
      return newSet;
    });
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Folder className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">FileExplorer</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Explorateur de fichiers avec navigation hiérarchique et gestion des dossiers.
        </p>
      </div>

      {/* Installation */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Installation</h2>
        <CodeBlock filePath="package.json">pnpm add cosmic-ui-mars</CodeBlock>
      </div>

      {/* Usage basique */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Usage basique</h2>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Exemple</h3>
            <div className="p-6 bg-muted/30 rounded-lg border">
              <div className="h-96 border rounded-lg overflow-hidden">
                <FileExplorer
                  files={sampleFiles}
                  selectedFile={selectedFile}
                  onFileSelect={handleFileSelect}
                  expandedFolders={expandedFolders}
                  onFolderToggle={handleFolderToggle}
                />
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4 text-foreground">Code</h3>
            <CodeBlock language="typescript" filePath="components/FileExplorerExample.tsx" showPackageManager={false}>
{`import { FileExplorer } from 'cosmic-ui-mars';
import { useState } from 'react';

const [selectedFile, setSelectedFile] = useState(null);
const [expandedFolders, setExpandedFolders] = useState(new Set(['documents']));

const sampleFiles = [
  {
    id: 'documents',
    name: 'Documents',
    type: 'folder',
    path: '/documents',
    children: [
      {
        id: 'report.pdf',
        name: 'Rapport.pdf',
        type: 'file',
        size: 1024000,
        path: '/documents/rapport.pdf',
        extension: 'pdf',
      },
    ],
  },
];

<FileExplorer
  files={sampleFiles}
  selectedFile={selectedFile}
  onFileSelect={setSelectedFile}
  expandedFolders={expandedFolders}
  onFolderToggle={(folderId) => {
    setExpandedFolders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(folderId)) {
        newSet.delete(folderId);
      } else {
        newSet.add(folderId);
      }
      return newSet;
    });
  }}
/>`}
            </CodeBlock>
          </div>
        </div>
      </div>

      {/* Variants */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Variants</h2>
        <div className="space-y-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Explorateur avec recherche</h3>
              <p className="text-muted-foreground">Explorateur avec fonction de recherche intégrée.</p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <div className="h-96 border rounded-lg overflow-hidden">
                  <FileExplorer
                    files={sampleFiles}
                    selectedFile={selectedFile}
                    onFileSelect={handleFileSelect}
                    expandedFolders={expandedFolders}
                    onFolderToggle={handleFolderToggle}
                    searchable
                    searchPlaceholder="Rechercher des fichiers..."
                  />
                </div>
              </div>
            </div>
            <div>
              <CodeBlock language="typescript" filePath="components/SearchableFileExplorer.tsx" showPackageManager={false}>
{`export default function App\docs\components\fileExplorer\page.tsxExample() {
  return <FileExplorer
  files={sampleFiles}
  selectedFile={selectedFile}
  onFileSelect={setSelectedFile}
  expandedFolders={expandedFolders}
  onFolderToggle={handleFolderToggle}
  searchable
  searchPlaceholder="Rechercher des fichiers..."
/>;
}`}
              </CodeBlock>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Explorateur avec actions</h3>
              <p className="text-muted-foreground">Explorateur avec actions contextuelles.</p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <div className="h-96 border rounded-lg overflow-hidden">
                  <FileExplorer
                    files={sampleFiles}
                    selectedFile={selectedFile}
                    onFileSelect={handleFileSelect}
                    expandedFolders={expandedFolders}
                    onFolderToggle={handleFolderToggle}
                    showActions
                    onUpload={() => console.log('Upload')}
                    onNewFolder={() => console.log('New folder')}
                  />
                </div>
              </div>
            </div>
            <div>
              <CodeBlock language="typescript" filePath="components/ActionableFileExplorer.tsx" showPackageManager={false}>
{`export default function App\docs\components\fileExplorer\page.tsxExample() {
  <FileExplorer
  files={sampleFiles}
  selectedFile={selectedFile}
  onFileSelect={setSelectedFile}
  expandedFolders={expandedFolders}
  onFolderToggle={handleFolderToggle}
  showActions
  onUpload={() => console.log('Upload')}
  onNewFolder={() => console.log('New folder')}
/>
}`}
              </CodeBlock>
            </div>
          </div>
        </div>
      </div>

      {/* Référence API */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Référence API</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-border rounded-lg">
            <thead>
              <tr className="bg-muted/50">
                <th className="border border-border px-4 py-3 text-left font-medium text-foreground">Prop</th>
                <th className="border border-border px-4 py-3 text-left font-medium text-foreground">Type</th>
                <th className="border border-border px-4 py-3 text-left font-medium text-foreground">Défaut</th>
                <th className="border border-border px-4 py-3 text-left font-medium text-foreground">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">files</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">FileItem[]</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">[]</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Liste des fichiers et dossiers</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">selectedFile</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">FileItem | null</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">null</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Fichier sélectionné</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">onFileSelect</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">(file: FileItem) => void</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">-</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Callback lors de la sélection d'un fichier</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">expandedFolders</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Set&lt;string&gt;</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">new Set()</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Dossiers ouverts</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">onFolderToggle</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">(folderId: string) => void</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">-</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Callback lors de l'ouverture/fermeture d'un dossier</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">searchable</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">boolean</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">false</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Activer la recherche</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">showActions</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">boolean</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">false</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Afficher les actions</td>
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
          <li>• Organisez les fichiers en <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">hiérarchie</code> logique</li>
          <li>• Utilisez des <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">icônes</code> pour identifier les types de fichiers</li>
          <li>• Implémentez la <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">recherche</code> pour de grandes structures</li>
          <li>• Ajoutez des <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">actions contextuelles</code> selon les besoins</li>
          <li>• Respectez les <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">guidelines d'accessibilité</code></li>
        </ul>
      </div>
    </div>
  );
}