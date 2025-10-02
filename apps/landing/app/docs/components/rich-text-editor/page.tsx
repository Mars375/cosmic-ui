'use client';

import React, { useState } from 'react';
import { CodeBlock } from '../../../components/code-block';
import { RichTextEditor } from 'cosmic-ui-mars';

export default function RichTextEditorPage() {
  const [showCode, setShowCode] = useState(false);
  const [showCodeVariants, setShowCodeVariants] = useState(false);
  const [content, setContent] = useState(
    '<p>Commencez à écrire votre contenu...</p>'
  );
  const [readOnlyContent, setReadOnlyContent] = useState(
    '<p><strong>Contenu en lecture seule</strong></p><p>Ce texte ne peut pas être modifié.</p>'
  );

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
          <h1 className="text-4xl font-bold">RichTextEditor</h1>
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
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Un éditeur de texte riche avec barre d'outils pour la mise en forme et
          l'édition de contenu HTML.
        </p>

        {/* Main Preview */}
        <div className="mb-12">
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setShowCode(false)}
              className={`export default function App\docs\components\richTextEditor\page.tsxExample() {
  px-4 py-2 rounded-lg text-sm font-medium ${
    !showCode
      ? 'bg-cosmic-primary text-white'
      : 'bg-cosmic-border text-gray-900 dark:text-white hover:bg-cosmic-border/80'
  }
}`}
            >
              Preview
            </button>
            <button
              onClick={() => setShowCode(true)}
              className={`export default function App\docs\components\richTextEditor\page.tsxExample() {
  px-4 py-2 rounded-lg text-sm font-medium ${
    showCode
      ? 'bg-cosmic-primary text-white'
      : 'bg-cosmic-border text-gray-900 dark:text-white hover:bg-cosmic-border/80'
  }
}`}
            >
              Code
            </button>
          </div>

          <div className="bg-cosmic-card border border-gray-200 dark:border-gray-700 rounded-lg p-2 min-h-[450px] w-[500px] flex justify-start">
            {!showCode ? (
              <div className="p-4 w-full">
                <RichTextEditor
                  value={content}
                  onChange={setContent}
                  placeholder="Commencez à écrire votre contenu..."
                  minHeight={200}
                  maxHeight={300}
                />
              </div>
            ) : (
              <div className="w-full">
                <CodeBlock
                  language="typescript"
                  filePath="components/Example.tsx"
                  showPackageManager={false}
                >
                  {`import { RichTextEditor } from 'cosmic-ui-mars';
import { useState } from 'react';

export function MyRichTextEditor() {
  const [content, setContent] = useState('<p>Commencez à écrire votre contenu...</p>');

  return (
    <RichTextEditor
      value={content}
      onChange={setContent}
      placeholder="Commencez à écrire votre contenu..."
      minHeight={200}
      maxHeight={300}
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
          <div className="bg-cosmic-card border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Le composant RichTextEditor est déjà inclus dans le package
              cosmic-ui-mars.
            </p>
            <CodeBlock
              language="bash"
              filePath="package.json"
              showPackageManager={false}
            >
              {`pnpm add cosmic-ui-mars`}
            </CodeBlock>
          </div>
        </div>

        {/* Usage */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Utilisation</h2>
          <div className="bg-cosmic-card border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Utilisez le composant pour créer des éditeurs de texte riche avec
              mise en forme.
            </p>
            <CodeBlock
              language="typescript"
              filePath="components/Example.tsx"
              showPackageManager={false}
            >
              {`import { RichTextEditor } from 'cosmic-ui-mars';

<RichTextEditor
  value={htmlContent}
  onChange={setHtmlContent}
  placeholder="Écrivez votre texte..."
  toolbar={true}
  readOnly={false}
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
                className={`export default function App\docs\components\richTextEditor\page.tsxExample() {
  px-4 py-2 rounded-lg text-sm font-medium ${
    !showCodeVariants
      ? 'bg-cosmic-primary text-white'
      : 'bg-cosmic-border text-gray-900 dark:text-white hover:bg-cosmic-border/80'
  }
}`}
              >
                Preview
              </button>
              <button
                onClick={() => setShowCodeVariants(true)}
                className={`export default function App\docs\components\richTextEditor\page.tsxExample() {
  px-4 py-2 rounded-lg text-sm font-medium ${
    showCodeVariants
      ? 'bg-cosmic-primary text-white'
      : 'bg-cosmic-border text-gray-900 dark:text-white hover:bg-cosmic-border/80'
  }
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
                      Sans barre d'outils
                    </h3>
                    <RichTextEditor
                      value={content}
                      onChange={setContent}
                      placeholder="Éditeur simple..."
                      toolbar={false}
                      minHeight={100}
                      maxHeight={150}
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">Lecture seule</h3>
                    <RichTextEditor
                      value={readOnlyContent}
                      onChange={() => {}}
                      readOnly={true}
                      toolbar={false}
                      minHeight={100}
                      maxHeight={150}
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full">
                  <CodeBlock
                    language="typescript"
                    filePath="components/Example.tsx"
                    showPackageManager={false}
                  >
                    {`export default function App\docs\components\richTextEditor\page.tsxExample() {
  // Sans barre d'outils
<RichTextEditor
  value={content}
  onChange={setContent}
  placeholder="Éditeur simple..."
  toolbar={false}
  minHeight={100}
  maxHeight={150}
/>

// Lecture seule
<RichTextEditor
  value={readOnlyContent}
  onChange={() => {}}
  readOnly={true}
  toolbar={false}
  minHeight={100}
  maxHeight={150}
/>

// Avec barre d'outils complète
<RichTextEditor
  value={content}
  onChange={setContent}
  placeholder="Éditeur complet..."
  toolbar={true}
  minHeight={200}
  maxHeight={400}
/>
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
