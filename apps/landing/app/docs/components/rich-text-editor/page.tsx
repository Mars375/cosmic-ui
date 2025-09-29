'use client';

import { useState } from 'react';
import { RichTextEditor } from '@cosmic-ui/react';

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

export default function RichTextEditorPage() {
  const [showCode, setShowCode] = useState(false);
  const [showCodeVariants, setShowCodeVariants] = useState(false);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const [content, setContent] = useState(
    '<p>Commencez à écrire votre contenu...</p>'
  );
  const [readOnlyContent, setReadOnlyContent] = useState(
    '<p><strong>Contenu en lecture seule</strong></p><p>Ce texte ne peut pas être modifié.</p>'
  );

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
        <p className="text-lg text-cosmic-muted-foreground mb-8">
          Un éditeur de texte riche avec barre d'outils pour la mise en forme et
          l'édition de contenu HTML.
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
                <RichTextEditor
                  value={content}
                  onChange={setContent}
                  placeholder="Commencez à écrire votre contenu..."
                  minHeight={200}
                  maxHeight={300}
                />
              </div>
            ) : (
              <div className="w-full h-full">
                <CodeBlock
                  onCopy={() =>
                    handleCopy(
                      `import { RichTextEditor } from '@cosmic-ui/react';
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
}`,
                      'main'
                    )
                  }
                >
                  {`import { RichTextEditor } from '@cosmic-ui/react';
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
          <div className="bg-cosmic-card border border-cosmic-border rounded-lg p-4">
            <p className="text-cosmic-muted-foreground mb-4">
              Le composant RichTextEditor est déjà inclus dans le package
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
              Utilisez le composant pour créer des éditeurs de texte riche avec
              mise en forme.
            </p>
            <CodeBlock
              onCopy={() =>
                handleCopy(
                  `import { RichTextEditor } from '@cosmic-ui/react';

<RichTextEditor
  value={htmlContent}
  onChange={setHtmlContent}
  placeholder="Écrivez votre texte..."
  toolbar={true}
  readOnly={false}
/>`,
                  'usage'
                )
              }
            >
              {`import { RichTextEditor } from '@cosmic-ui/react';

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
                <div className="w-full h-full">
                  <CodeBlock
                    onCopy={() =>
                      handleCopy(
                        `// Sans barre d'outils
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
/>`,
                        'variants'
                      )
                    }
                  >
                    {`// Sans barre d'outils
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
