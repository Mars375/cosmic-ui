'use client';

import { useState } from 'react';
import { FileUpload } from '@cosmic-ui/ui';
import { Button } from '@cosmic-ui/ui';
import { Upload, File, X, Check } from 'lucide-react';

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

export default function FileUploadPage() {
  const [showCode, setShowCode] = useState(false);
  const [showCodeVariants, setShowCodeVariants] = useState(false);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStates(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCopiedStates(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

  const handleFiles = (files: FileList) => {
    const newFiles = Array.from(files);
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
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
          <h1 className="text-4xl font-bold">FileUpload</h1>
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
        <p className="text-lg text-gray-600 dark:text-gray-400-foreground mb-8">
          Un composant de téléchargement de fichiers avec glisser-déposer et
          prévisualisation.
        </p>

        {/* Main Preview */}
        <div className="mb-12">
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setShowCode(false)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                !showCode
                  ? 'bg-cosmic-primary text-white'
                  : 'bg-cosmic-border text-gray-900 dark:text-white hover:bg-cosmic-border/80'
              }`}
            >
              Preview
            </button>
            <button
              onClick={() => setShowCode(true)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                showCode
                  ? 'bg-cosmic-primary text-white'
                  : 'bg-cosmic-border text-gray-900 dark:text-white hover:bg-cosmic-border/80'
              }`}
            >
              Code
            </button>
          </div>

          <div className="bg-cosmic-card border border-gray-200 dark:border-gray-700 rounded-lg p-2 min-h-[450px] w-[500px] flex justify-start">
            {!showCode ? (
              <div className="p-4 w-full">
                <div className="space-y-4">
                  <FileUpload
                    accept=".pdf,.doc,.docx,.txt"
                    multiple={true}
                    onFiles={handleFiles}
                    className="min-h-[120px]"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="w-8 h-8 text-gray-600 dark:text-gray-400-foreground" />
                      <span className="text-sm text-gray-600 dark:text-gray-400-foreground">
                        Glissez vos fichiers ici ou cliquez pour sélectionner
                      </span>
                      <span className="text-xs text-gray-600 dark:text-gray-400-foreground">
                        PDF, DOC, DOCX, TXT (max 10MB)
                      </span>
                    </div>
                  </FileUpload>
                  
                  {uploadedFiles.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Fichiers sélectionnés :</h4>
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-white dark:bg-gray-900 rounded border">
                          <div className="flex items-center gap-2">
                            <File className="w-4 h-4 text-gray-600 dark:text-gray-400-foreground" />
                            <div>
                              <p className="text-sm font-medium">{file.name}</p>
                              <p className="text-xs text-gray-600 dark:text-gray-400-foreground">
                                {formatFileSize(file.size)}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFile(index)}
                            className="p-1 hover:bg-cosmic-border rounded"
                          >
                            <X className="w-4 h-4 text-gray-600 dark:text-gray-400-foreground" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="w-full">
                <CodeBlock
                  onCopy={() =>
                    handleCopy(
                      `import { FileUpload } from '@cosmic-ui/ui';
import { Upload } from 'lucide-react';
import { useState } from 'react';

export function MyFileUpload() {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFiles = (files) => {
    const newFiles = Array.from(files);
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  return (
    <FileUpload
      accept=".pdf,.doc,.docx,.txt"
      multiple={true}
      onFiles={handleFiles}
      className="min-h-[120px]"
    >
      <div className="flex flex-col items-center gap-2">
        <Upload className="w-8 h-8 text-gray-600 dark:text-gray-400-foreground" />
        <span className="text-sm text-gray-600 dark:text-gray-400-foreground">
          Glissez vos fichiers ici ou cliquez pour sélectionner
        </span>
        <span className="text-xs text-gray-600 dark:text-gray-400-foreground">
          PDF, DOC, DOCX, TXT (max 10MB)
        </span>
      </div>
    </FileUpload>
  );
}`,
                      'main'
                    )
                  }
                >
                  {`import { FileUpload } from '@cosmic-ui/ui';
import { Upload } from 'lucide-react';
import { useState } from 'react';

export function MyFileUpload() {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFiles = (files) => {
    const newFiles = Array.from(files);
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  return (
    <FileUpload
      accept=".pdf,.doc,.docx,.txt"
      multiple={true}
      onFiles={handleFiles}
      className="min-h-[120px]"
    >
      <div className="flex flex-col items-center gap-2">
        <Upload className="w-8 h-8 text-gray-600 dark:text-gray-400-foreground" />
        <span className="text-sm text-gray-600 dark:text-gray-400-foreground">
          Glissez vos fichiers ici ou cliquez pour sélectionner
        </span>
        <span className="text-xs text-gray-600 dark:text-gray-400-foreground">
          PDF, DOC, DOCX, TXT (max 10MB)
        </span>
      </div>
    </FileUpload>
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
          <div className="bg-cosmic-card border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <p className="text-gray-600 dark:text-gray-400-foreground mb-4">
              Le composant FileUpload est déjà inclus dans le package
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
          <div className="bg-cosmic-card border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <p className="text-gray-600 dark:text-gray-400-foreground mb-4">
              Utilisez le composant pour créer une zone de téléchargement de fichiers.
            </p>
            <CodeBlock
              onCopy={() =>
                handleCopy(
                  `import { FileUpload } from '@cosmic-ui/ui';

<FileUpload
  accept=".pdf,.doc,.docx"
  multiple={true}
  onFiles={(files) => console.log(files)}
>
  <span>Cliquez pour sélectionner des fichiers</span>
</FileUpload>`,
                  'usage'
                )
              }
            >
              {`import { FileUpload } from '@cosmic-ui/ui';

<FileUpload
  accept=".pdf,.doc,.docx"
  multiple={true}
  onFiles={(files) => console.log(files)}
>
  <span>Cliquez pour sélectionner des fichiers</span>
</FileUpload>`}
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
                    : 'bg-cosmic-border text-gray-900 dark:text-white hover:bg-cosmic-border/80'
                }`}
              >
                Preview
              </button>
              <button
                onClick={() => setShowCodeVariants(true)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  showCodeVariants
                    ? 'bg-cosmic-primary text-white'
                    : 'bg-cosmic-border text-gray-900 dark:text-white hover:bg-cosmic-border/80'
                }`}
              >
                Code
              </button>
            </div>

            <div className="bg-cosmic-card border border-gray-200 dark:border-gray-700 rounded-lg p-2 min-h-[450px] w-[500px] flex justify-start">
              {!showCodeVariants ? (
                <div className="p-4 w-full space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Fichier unique
                    </h3>
                    <FileUpload
                      accept="image/*"
                      multiple={false}
                      onFiles={handleFiles}
                      className="min-h-[80px]"
                    >
                      <div className="flex flex-col items-center gap-1">
                        <Upload className="w-6 h-6 text-gray-600 dark:text-gray-400-foreground" />
                        <span className="text-xs text-gray-600 dark:text-gray-400-foreground">
                          Sélectionner une image
                        </span>
                      </div>
                    </FileUpload>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Tous types
                    </h3>
                    <FileUpload
                      multiple={true}
                      onFiles={handleFiles}
                      className="min-h-[80px]"
                    >
                      <div className="flex flex-col items-center gap-1">
                        <Upload className="w-6 h-6 text-gray-600 dark:text-gray-400-foreground" />
                        <span className="text-xs text-gray-600 dark:text-gray-400-foreground">
                          Tous types de fichiers
                        </span>
                      </div>
                    </FileUpload>
                  </div>
                </div>
              ) : (
                <div className="w-full">
                  <CodeBlock
                    onCopy={() =>
                      handleCopy(
                        `// Fichier unique
<FileUpload
  accept="image/*"
  multiple={false}
  onFiles={handleFiles}
>
  <span>Sélectionner une image</span>
</FileUpload>

// Tous types
<FileUpload
  multiple={true}
  onFiles={handleFiles}
>
  <span>Tous types de fichiers</span>
</FileUpload>

// Images seulement
<FileUpload
  accept="image/*"
  multiple={true}
  onFiles={handleFiles}
>
  <span>Sélectionner des images</span>
</FileUpload>

// Documents seulement
<FileUpload
  accept=".pdf,.doc,.docx,.txt"
  multiple={true}
  onFiles={handleFiles}
>
  <span>Sélectionner des documents</span>
</FileUpload>

// Avec contenu personnalisé
<FileUpload onFiles={handleFiles}>
  <div className="text-center">
    <Upload className="w-12 h-12 mx-auto mb-2" />
    <p className="font-medium">Glissez vos fichiers ici</p>
    <p className="text-sm text-muted-foreground">
      ou cliquez pour parcourir
    </p>
  </div>
</FileUpload>`,
                        'variants'
                      )
                    }
                  >
                    {`// Fichier unique
<FileUpload
  accept="image/*"
  multiple={false}
  onFiles={handleFiles}
>
  <span>Sélectionner une image</span>
</FileUpload>

// Tous types
<FileUpload
  multiple={true}
  onFiles={handleFiles}
>
  <span>Tous types de fichiers</span>
</FileUpload>

// Images seulement
<FileUpload
  accept="image/*"
  multiple={true}
  onFiles={handleFiles}
>
  <span>Sélectionner des images</span>
</FileUpload>

// Documents seulement
<FileUpload
  accept=".pdf,.doc,.docx,.txt"
  multiple={true}
  onFiles={handleFiles}
>
  <span>Sélectionner des documents</span>
</FileUpload>

// Avec contenu personnalisé
<FileUpload onFiles={handleFiles}>
  <div className="text-center">
    <Upload className="w-12 h-12 mx-auto mb-2" />
    <p className="font-medium">Glissez vos fichiers ici</p>
    <p className="text-sm text-muted-foreground">
      ou cliquez pour parcourir
    </p>
  </div>
</FileUpload>`}
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
