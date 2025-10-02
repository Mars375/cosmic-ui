'use client';

import * as React from 'react';
import { useState } from 'react';
import { CodeBlock } from '../../../components/code-block';
import { FileUpload } from 'cosmic-ui-mars';
import { Button } from 'cosmic-ui-mars';
import { Upload, File, X, Check } from 'lucide-react';

export default function FileUploadPage() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

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
    <div className="container max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Upload className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">FileUpload</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Composant d'upload de fichiers avec drag & drop et gestion des fichiers.
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
              <FileUpload
                onFiles={handleFiles}
                accept=".pdf,.doc,.docx,.jpg,.png"
                maxSize={5 * 1024 * 1024} // 5MB
                multiple
              />
              {uploadedFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h4 className="font-medium text-foreground">Fichiers uploadés :</h4>
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                      <div className="flex items-center gap-2">
                        <File className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-foreground">{file.name}</span>
                        <span className="text-xs text-muted-foreground">({formatFileSize(file.size)})</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4 text-foreground">Code</h3>
            <CodeBlock language="typescript" filePath="components/FileUploadExample.tsx" showPackageManager={false}>
{`import { FileUpload } from 'cosmic-ui-mars';
import { useState } from 'react';

const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

const handleFiles = (files: FileList) => {
  const newFiles = Array.from(files);
  setUploadedFiles(prev => [...prev, ...newFiles]);
};

<FileUpload
  onFiles={handleFiles}
  accept=".pdf,.doc,.docx,.jpg,.png"
  maxSize={5 * 1024 * 1024} // 5MB
  multiple
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
              <h3 className="text-lg font-medium text-foreground">Upload simple</h3>
              <p className="text-muted-foreground">Upload d'un seul fichier avec validation.</p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <FileUpload
                  onFiles={(files) => console.log('Single file:', files[0])}
                  accept=".pdf"
                  maxSize={2 * 1024 * 1024} // 2MB
                  multiple={false}
                />
              </div>
            </div>
            <div>
              <CodeBlock language="typescript" filePath="components/SingleFileUpload.tsx" showPackageManager={false}>
{`export default function App\docs\components\fileUpload\page.tsxExample() {
  <FileUpload
  onFiles={(files) => console.log('Single file:', files[0])}
  accept=".pdf"
  maxSize={2 * 1024 * 1024} // 2MB
  multiple={false}
/>
}`}
              </CodeBlock>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Upload avec prévisualisation</h3>
              <p className="text-muted-foreground">Upload avec prévisualisation des images.</p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <FileUpload
                  onFiles={handleFiles}
                  accept=".jpg,.jpeg,.png,.gif"
                  maxSize={10 * 1024 * 1024} // 10MB
                  multiple
                  showPreview
                />
              </div>
            </div>
            <div>
              <CodeBlock language="typescript" filePath="components/PreviewFileUpload.tsx" showPackageManager={false}>
{`export default function App\docs\components\fileUpload\page.tsxExample() {
  return <FileUpload
  onFiles={handleFiles}
  accept=".jpg,.jpeg,.png,.gif"
  maxSize={10 * 1024 * 1024} // 10MB
  multiple
  showPreview
/>;
}`}
              </CodeBlock>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Upload avec progression</h3>
              <p className="text-muted-foreground">Upload avec barre de progression.</p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <FileUpload
                  onFiles={handleFiles}
                  accept="*"
                  maxSize={50 * 1024 * 1024} // 50MB
                  multiple
                  showProgress
                  onProgress={(progress) => console.log('Progress:', progress)}
                />
              </div>
            </div>
            <div>
              <CodeBlock language="typescript" filePath="components/ProgressFileUpload.tsx" showPackageManager={false}>
{`export default function App\docs\components\fileUpload\page.tsxExample() {
  <FileUpload
  onFiles={handleFiles}
  accept="*"
  maxSize={50 * 1024 * 1024} // 50MB
  multiple
  showProgress
  onProgress={(progress) => console.log('Progress:', progress)}
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
                <td className="border border-border px-4 py-3 font-mono text-sm">onFiles</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">(files: FileList) => void</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">-</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Callback appelé lors de la sélection de fichiers</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">accept</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">string</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">'*'</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Types de fichiers acceptés</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">maxSize</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">number</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Infinity</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Taille maximale en bytes</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">multiple</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">boolean</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">true</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Autoriser la sélection multiple</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">showPreview</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">boolean</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">false</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Afficher la prévisualisation</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">showProgress</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">boolean</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">false</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Afficher la barre de progression</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">onProgress</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">(progress: number) => void</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">-</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Callback pour le suivi de progression</td>
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
          <li>• Définissez des <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">limites de taille</code> appropriées</li>
          <li>• Utilisez des <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">types MIME</code> spécifiques pour la sécurité</li>
          <li>• Implémentez la <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">validation côté serveur</code></li>
          <li>• Affichez des <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">messages d'erreur</code> clairs</li>
          <li>• Respectez les <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">guidelines d'accessibilité</code></li>
        </ul>
      </div>
    </div>
  );
}