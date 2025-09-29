import type { Meta, StoryObj } from '@storybook/react';
import { FileExplorer, useFileExplorer } from '../components/file-explorer';
import { Button } from '../components/button';

const meta: Meta<typeof FileExplorer> = {
  title: 'Components/FileExplorer',
  component: FileExplorer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleFiles = [
  {
    id: '1',
    name: 'Documents',
    type: 'folder' as const,
    path: '/Documents',
    modified: new Date('2024-01-15'),
    children: [
      {
        id: '2',
        name: 'Projet React',
        type: 'folder' as const,
        path: '/Documents/Projet React',
        modified: new Date('2024-01-20'),
        children: [
          {
            id: '3',
            name: 'App.tsx',
            type: 'file' as const,
            path: '/Documents/Projet React/App.tsx',
            size: 2048,
            modified: new Date('2024-01-22'),
            extension: 'tsx',
          },
          {
            id: '4',
            name: 'index.css',
            type: 'file' as const,
            path: '/Documents/Projet React/index.css',
            size: 1024,
            modified: new Date('2024-01-21'),
            extension: 'css',
          },
        ],
      },
      {
        id: '5',
        name: 'README.md',
        type: 'file' as const,
        path: '/Documents/README.md',
        size: 512,
        modified: new Date('2024-01-18'),
        extension: 'md',
      },
    ],
  },
  {
    id: '6',
    name: 'Images',
    type: 'folder' as const,
    path: '/Images',
    modified: new Date('2024-01-10'),
    children: [
      {
        id: '7',
        name: 'logo.png',
        type: 'file' as const,
        path: '/Images/logo.png',
        size: 25600,
        modified: new Date('2024-01-12'),
        extension: 'png',
      },
      {
        id: '8',
        name: 'screenshot.jpg',
        type: 'file' as const,
        path: '/Images/screenshot.jpg',
        size: 128000,
        modified: new Date('2024-01-14'),
        extension: 'jpg',
      },
    ],
  },
  {
    id: '9',
    name: 'package.json',
    type: 'file' as const,
    path: '/package.json',
    size: 1536,
    modified: new Date('2024-01-25'),
    extension: 'json',
  },
  {
    id: '10',
    name: 'config.js',
    type: 'file' as const,
    path: '/config.js',
    size: 768,
    modified: new Date('2024-01-24'),
    extension: 'js',
  },
];

function FileExplorerDemo() {
  const {
    files,
    selectedFile,
    expandedFolders,
    toggleFolder,
    selectFile,
    addFile,
    removeFile,
    renameFile,
  } = useFileExplorer();

  // Initialize with sample files
  React.useEffect(() => {
    if (files.length === 0) {
      // @ts-ignore
      files.push(...sampleFiles);
    }
  }, [files.length]);

  const handleFileSelect = (file: any) => {
    selectFile(file);
    console.log('File selected:', file);
  };

  const handleFolderToggle = (folder: any) => {
    toggleFolder(folder);
    console.log('Folder toggled:', folder);
  };

  const handleFileUpload = (file: File) => {
    const newFile = {
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: 'file' as const,
      path: `/${file.name}`,
      size: file.size,
      modified: new Date(),
      extension: file.name.split('.').pop(),
    };
    addFile(newFile);
    console.log('File uploaded:', newFile);
  };

  const handleFileDelete = (file: any) => {
    removeFile(file.id);
    console.log('File deleted:', file);
  };

  const handleFileRename = (file: any, newName: string) => {
    renameFile(file.id, newName);
    console.log('File renamed:', file, 'to', newName);
  };

  const handleFolderCreate = (name: string) => {
    const newFolder = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      type: 'folder' as const,
      path: `/${name}`,
      modified: new Date(),
      children: [],
    };
    addFile(newFolder);
    console.log('Folder created:', newFolder);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">File Explorer</h2>
        <p className="text-white/70">
          Explorateur de fichiers avec gestion des dossiers et fichiers
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
          maxHeight={400}
        />

        <div className="space-y-4">
          <div className="p-4 bg-cosmic-surface/50 rounded-lg">
            <h3 className="font-medium text-white mb-2">Fichier sélectionné</h3>
            {selectedFile ? (
              <div className="text-sm text-white/70">
                <p>
                  <strong>Nom:</strong> {selectedFile.name}
                </p>
                <p>
                  <strong>Type:</strong> {selectedFile.type}
                </p>
                <p>
                  <strong>Chemin:</strong> {selectedFile.path}
                </p>
                {selectedFile.size && (
                  <p>
                    <strong>Taille:</strong> {selectedFile.size} bytes
                  </p>
                )}
                <p>
                  <strong>Modifié:</strong> {selectedFile.modified.toLocaleDateString()}
                </p>
              </div>
            ) : (
              <p className="text-white/50">Aucun fichier sélectionné</p>
            )}
          </div>

          <div className="p-4 bg-cosmic-surface/50 rounded-lg">
            <h3 className="font-medium text-white mb-2">Actions</h3>
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  addFile({
                    id: Math.random().toString(36).substr(2, 9),
                    name: 'nouveau-fichier.txt',
                    type: 'file',
                    path: '/nouveau-fichier.txt',
                    size: 0,
                    modified: new Date(),
                    extension: 'txt',
                  })
                }
              >
                Ajouter un fichier
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  addFile({
                    id: Math.random().toString(36).substr(2, 9),
                    name: 'Nouveau dossier',
                    type: 'folder',
                    path: '/Nouveau dossier',
                    modified: new Date(),
                    children: [],
                  })
                }
              >
                Ajouter un dossier
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const Default: Story = {
  render: () => <FileExplorerDemo />,
};

export const WithoutToolbar: Story = {
  render: () => {
    const { files, selectedFile, expandedFolders, toggleFolder, selectFile } = useFileExplorer();

    // Initialize with sample files
    React.useEffect(() => {
      if (files.length === 0) {
        // @ts-ignore
        files.push(...sampleFiles);
      }
    }, [files.length]);

    return (
      <div className="p-8">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-2">Sans barre d'outils</h3>
          <p className="text-white/70 text-sm">Explorateur de fichiers sans barre d'outils</p>
        </div>

        <FileExplorer
          files={files}
          onFileSelect={selectFile}
          onFolderToggle={toggleFolder}
          selectedFile={selectedFile}
          expandedFolders={expandedFolders}
          showToolbar={false}
          maxHeight={400}
        />
      </div>
    );
  },
};

export const WithoutSearch: Story = {
  render: () => {
    const { files, selectedFile, expandedFolders, toggleFolder, selectFile } = useFileExplorer();

    // Initialize with sample files
    React.useEffect(() => {
      if (files.length === 0) {
        // @ts-ignore
        files.push(...sampleFiles);
      }
    }, [files.length]);

    return (
      <div className="p-8">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-2">Sans recherche</h3>
          <p className="text-white/70 text-sm">
            Explorateur de fichiers sans fonction de recherche
          </p>
        </div>

        <FileExplorer
          files={files}
          onFileSelect={selectFile}
          onFolderToggle={toggleFolder}
          selectedFile={selectedFile}
          expandedFolders={expandedFolders}
          showSearch={false}
          maxHeight={400}
        />
      </div>
    );
  },
};

export const WithoutDetails: Story = {
  render: () => {
    const { files, selectedFile, expandedFolders, toggleFolder, selectFile } = useFileExplorer();

    // Initialize with sample files
    React.useEffect(() => {
      if (files.length === 0) {
        // @ts-ignore
        files.push(...sampleFiles);
      }
    }, [files.length]);

    return (
      <div className="p-8">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-2">Sans détails</h3>
          <p className="text-white/70 text-sm">Explorateur de fichiers sans panneau de détails</p>
        </div>

        <FileExplorer
          files={files}
          onFileSelect={selectFile}
          onFolderToggle={toggleFolder}
          selectedFile={selectedFile}
          expandedFolders={expandedFolders}
          showDetails={false}
          maxHeight={400}
        />
      </div>
    );
  },
};

export const EmptyState: Story = {
  render: () => {
    const { files, selectedFile, expandedFolders, toggleFolder, selectFile } = useFileExplorer();

    return (
      <div className="p-8">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-2">État vide</h3>
          <p className="text-white/70 text-sm">Explorateur de fichiers sans fichiers</p>
        </div>

        <FileExplorer
          files={files}
          onFileSelect={selectFile}
          onFolderToggle={toggleFolder}
          selectedFile={selectedFile}
          expandedFolders={expandedFolders}
          maxHeight={400}
        />
      </div>
    );
  },
};
