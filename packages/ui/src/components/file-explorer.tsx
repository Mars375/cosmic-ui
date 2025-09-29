'use client';

import * as React from 'react';
import { twMerge } from 'tailwind-merge';
import { Button } from './button';
import { Input } from './input';
import { Badge } from './badge';

export interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size?: number;
  modified: Date;
  path: string;
  children?: FileItem[];
  icon?: string;
  extension?: string;
}

export interface FileExplorerProps {
  files: FileItem[];
  onFileSelect?: (file: FileItem) => void;
  onFolderToggle?: (folder: FileItem) => void;
  onFileUpload?: (file: File) => void;
  onFileDelete?: (file: FileItem) => void;
  onFileRename?: (file: FileItem, newName: string) => void;
  onFolderCreate?: (name: string) => void;
  className?: string;
  selectedFile?: FileItem | null;
  expandedFolders?: Set<string>;
  showToolbar?: boolean;
  showSearch?: boolean;
  showDetails?: boolean;
  maxHeight?: number;
}

export function FileExplorer({
  files,
  onFileSelect,
  onFolderToggle,
  onFileUpload,
  onFileDelete,
  onFileRename,
  onFolderCreate,
  className,
  selectedFile,
  expandedFolders = new Set(),
  showToolbar = true,
  showSearch = true,
  showDetails = true,
  maxHeight = 500,
}: FileExplorerProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [renamingFile, setRenamingFile] = React.useState<FileItem | null>(null);
  const [newName, setNewName] = React.useState('');
  const [showCreateFolder, setShowCreateFolder] = React.useState(false);
  const [newFolderName, setNewFolderName] = React.useState('');

  const filteredFiles = React.useMemo(() => {
    if (!searchQuery) return files;

    const filterFiles = (items: FileItem[]): FileItem[] => {
      return items
        .filter((item) => {
          const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
          const hasMatchingChildren = item.children ? filterFiles(item.children).length > 0 : false;
          return matchesSearch || hasMatchingChildren;
        })
        .map((item) => ({
          ...item,
          children: item.children ? filterFiles(item.children) : undefined,
        }));
    };

    return filterFiles(files);
  }, [files, searchQuery]);

  const getFileIcon = (file: FileItem) => {
    if (file.type === 'folder') {
      return expandedFolders.has(file.id) ? '📂' : '📁';
    }

    if (file.icon) return file.icon;

    const extension = file.extension || file.name.split('.').pop()?.toLowerCase();

    switch (extension) {
      case 'js':
      case 'jsx':
      case 'ts':
      case 'tsx':
        return '📄';
      case 'css':
      case 'scss':
      case 'sass':
        return '🎨';
      case 'html':
      case 'htm':
        return '🌐';
      case 'json':
        return '📋';
      case 'md':
      case 'mdx':
        return '📝';
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'gif':
      case 'svg':
        return '🖼️';
      case 'pdf':
        return '📕';
      case 'zip':
      case 'rar':
      case '7z':
        return '📦';
      case 'mp4':
      case 'avi':
      case 'mov':
        return '🎬';
      case 'mp3':
      case 'wav':
      case 'flac':
        return '🎵';
      default:
        return '📄';
    }
  };

  const formatFileSize = (size?: number) => {
    if (!size) return '';

    const units = ['B', 'KB', 'MB', 'GB'];
    let unitIndex = 0;
    let fileSize = size;

    while (fileSize >= 1024 && unitIndex < units.length - 1) {
      fileSize /= 1024;
      unitIndex++;
    }

    return `${fileSize.toFixed(1)} ${units[unitIndex]}`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleFileClick = (file: FileItem) => {
    if (file.type === 'folder') {
      onFolderToggle?.(file);
    } else {
      onFileSelect?.(file);
    }
  };

  const handleRename = (file: FileItem) => {
    setRenamingFile(file);
    setNewName(file.name);
  };

  const handleRenameSubmit = () => {
    if (renamingFile && newName.trim()) {
      onFileRename?.(renamingFile, newName.trim());
      setRenamingFile(null);
      setNewName('');
    }
  };

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      onFolderCreate?.(newFolderName.trim());
      setNewFolderName('');
      setShowCreateFolder(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onFileUpload) {
      onFileUpload(file);
    }
  };

  const renderFileItem = (file: FileItem, level = 0) => {
    const isSelected = selectedFile?.id === file.id;
    const isExpanded = expandedFolders.has(file.id);
    const isRenaming = renamingFile?.id === file.id;

    return (
      <div key={file.id}>
        <div
          className={twMerge(
            'flex items-center space-x-2 px-2 py-1 rounded cursor-pointer hover:bg-cosmic-border/30 transition-colors',
            isSelected && 'bg-cosmic-primary/20',
            level > 0 && 'ml-4',
          )}
          style={{ paddingLeft: `${level * 16 + 8}px` }}
        >
          {/* Expand/Collapse button for folders */}
          {file.type === 'folder' && (
            <button
              onClick={() => onFolderToggle?.(file)}
              className="w-4 h-4 flex items-center justify-center text-white/50 hover:text-white/70"
            >
              {isExpanded ? '▼' : '▶'}
            </button>
          )}

          {/* File icon */}
          <span className="text-lg">{getFileIcon(file)}</span>

          {/* File name */}
          {isRenaming ? (
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onBlur={handleRenameSubmit}
              onKeyPress={(e) => e.key === 'Enter' && handleRenameSubmit()}
              className="flex-1 h-6 text-sm"
              autoFocus
            />
          ) : (
            <span
              className="flex-1 text-sm text-white/90 truncate"
              onClick={() => handleFileClick(file)}
            >
              {file.name}
            </span>
          )}

          {/* File size */}
          {showDetails && file.type === 'file' && (
            <span className="text-xs text-white/50">{formatFileSize(file.size)}</span>
          )}

          {/* Actions */}
          {!isRenaming && (
            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRename(file)}
                className="h-6 w-6 p-0 text-white/50 hover:text-white/70"
              >
                ✏️
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onFileDelete?.(file)}
                className="h-6 w-6 p-0 text-white/50 hover:text-red-400"
              >
                🗑️
              </Button>
            </div>
          )}
        </div>

        {/* Children */}
        {file.type === 'folder' && isExpanded && file.children && (
          <div>{file.children.map((child) => renderFileItem(child, level + 1))}</div>
        )}
      </div>
    );
  };

  return (
    <div className={twMerge('bg-cosmic-surface border border-cosmic-border rounded-lg', className)}>
      {/* Toolbar */}
      {showToolbar && (
        <div className="p-3 border-b border-cosmic-border">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-white">Explorateur de fichiers</h3>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCreateFolder(true)}
                className="text-xs"
              >
                📁 Nouveau dossier
              </Button>
              <label className="cursor-pointer">
                <Button variant="outline" size="sm" className="text-xs">
                  📤 Upload
                </Button>
                <input type="file" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>
          </div>

          {/* Search */}
          {showSearch && (
            <Input
              placeholder="Rechercher des fichiers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          )}
        </div>
      )}

      {/* Create folder dialog */}
      {showCreateFolder && (
        <div className="p-3 border-b border-cosmic-border bg-cosmic-border/20">
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Nom du dossier"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCreateFolder()}
              className="flex-1"
              autoFocus
            />
            <Button size="sm" onClick={handleCreateFolder} disabled={!newFolderName.trim()}>
              Créer
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setShowCreateFolder(false);
                setNewFolderName('');
              }}
            >
              Annuler
            </Button>
          </div>
        </div>
      )}

      {/* File list */}
      <div className="overflow-y-auto p-2" style={{ maxHeight: `${maxHeight}px` }}>
        {filteredFiles.length === 0 ? (
          <div className="text-center text-white/50 py-8">
            <div className="text-4xl mb-2">📁</div>
            <p>Aucun fichier trouvé</p>
          </div>
        ) : (
          <div className="space-y-1">{filteredFiles.map((file) => renderFileItem(file))}</div>
        )}
      </div>

      {/* Details panel */}
      {showDetails && selectedFile && (
        <div className="p-3 border-t border-cosmic-border bg-cosmic-border/20">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-lg">{getFileIcon(selectedFile)}</span>
              <span className="font-medium text-white">{selectedFile.name}</span>
            </div>
            <div className="text-xs text-white/70 space-y-1">
              <div>Chemin: {selectedFile.path}</div>
              {selectedFile.type === 'file' && selectedFile.size && (
                <div>Taille: {formatFileSize(selectedFile.size)}</div>
              )}
              <div>Modifié: {formatDate(selectedFile.modified)}</div>
              {selectedFile.extension && <div>Extension: {selectedFile.extension}</div>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Hook for file explorer
export function useFileExplorer() {
  const [files, setFiles] = React.useState<FileItem[]>([]);
  const [selectedFile, setSelectedFile] = React.useState<FileItem | null>(null);
  const [expandedFolders, setExpandedFolders] = React.useState<Set<string>>(new Set());

  const toggleFolder = (folder: FileItem) => {
    setExpandedFolders((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(folder.id)) {
        newSet.delete(folder.id);
      } else {
        newSet.add(folder.id);
      }
      return newSet;
    });
  };

  const selectFile = (file: FileItem) => {
    setSelectedFile(file);
  };

  const addFile = (file: FileItem, parentPath?: string) => {
    setFiles((prev) => {
      if (!parentPath) {
        return [...prev, file];
      }

      const addToPath = (items: FileItem[], path: string): FileItem[] => {
        return items.map((item) => {
          if (item.path === path && item.type === 'folder') {
            return {
              ...item,
              children: [...(item.children || []), file],
            };
          }
          if (item.children) {
            return {
              ...item,
              children: addToPath(item.children, path),
            };
          }
          return item;
        });
      };

      return addToPath(prev, parentPath);
    });
  };

  const removeFile = (fileId: string) => {
    setFiles((prev) => {
      const removeFromItems = (items: FileItem[]): FileItem[] => {
        return items
          .filter((item) => item.id !== fileId)
          .map((item) => ({
            ...item,
            children: item.children ? removeFromItems(item.children) : undefined,
          }));
      };

      return removeFromItems(prev);
    });

    if (selectedFile?.id === fileId) {
      setSelectedFile(null);
    }
  };

  const renameFile = (fileId: string, newName: string) => {
    setFiles((prev) => {
      const renameInItems = (items: FileItem[]): FileItem[] => {
        return items.map((item) => {
          if (item.id === fileId) {
            return {
              ...item,
              name: newName,
              path: item.path.replace(item.name, newName),
            };
          }
          if (item.children) {
            return {
              ...item,
              children: renameInItems(item.children),
            };
          }
          return item;
        });
      };

      return renameInItems(prev);
    });

    if (selectedFile?.id === fileId) {
      setSelectedFile((prev) => (prev ? { ...prev, name: newName } : null));
    }
  };

  return {
    files,
    selectedFile,
    expandedFolders,
    setFiles,
    toggleFolder,
    selectFile,
    addFile,
    removeFile,
    renameFile,
  };
}
