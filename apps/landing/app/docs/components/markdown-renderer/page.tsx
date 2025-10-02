'use client';

import * as React from 'react';
import { useState } from 'react';
import { CodeBlock } from '../../../components/code-block';
import { MarkdownRenderer } from 'cosmic-ui-mars';
import { Button } from 'cosmic-ui-mars';
import { FileText, Code, Hash } from 'lucide-react';

export default function MarkdownRendererPage() {
  const sampleMarkdown = `# Titre Principal

Ceci est un **paragraphe** avec du texte en *italique* et du texte en **gras**.

## Sous-titre

### Liste à puces
- Premier élément
- Deuxième élément
- Troisième élément

### Liste numérotée
1. Premier point
2. Deuxième point
3. Troisième point

### Citation
> Ceci est une citation importante qui met en valeur un point clé.

### Code inline
Utilisez \`console.log()\` pour afficher des messages dans la console.

### Code bloc
\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

### Lien
[Visitez notre site](https://example.com)

### Tableau
| Colonne 1 | Colonne 2 | Colonne 3 |
|-----------|-----------|-----------|
| Donnée 1  | Donnée 2  | Donnée 3  |
| Donnée 4  | Donnée 5  | Donnée 6  |

---

*Dernière mise à jour : 2024-01-15*`;

  const [markdownContent, setMarkdownContent] = useState(sampleMarkdown);

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">
            MarkdownRenderer
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Rendu de contenu Markdown avec support des éléments de base et des
          extensions.
        </p>
      </div>

      {/* Installation */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">
          Installation
        </h2>
        <CodeBlock filePath="package.json">pnpm add cosmic-ui-mars</CodeBlock>
      </div>

      {/* Usage basique */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">
          Usage basique
        </h2>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Exemple</h3>
            <div className="p-6 bg-muted/30 rounded-lg border">
              <div className="h-96 overflow-y-auto">
                <MarkdownRenderer content={sampleMarkdown} />
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4 text-foreground">Code</h3>
            <CodeBlock
              language="typescript"
              filePath="components/MarkdownRendererExample.tsx"
              showPackageManager={false}
            >
              {`import { MarkdownRenderer } from 'cosmic-ui-mars';

const markdownContent = \`# Titre Principal

Ceci est un **paragraphe** avec du texte en *italique*.

## Sous-titre

### Liste à puces
- Premier élément
- Deuxième élément

### Code inline
Utilisez \`console.log()\` pour afficher des messages.

### Code bloc
\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`
\`;

<MarkdownRenderer content={markdownContent} />`}
            </CodeBlock>
          </div>
        </div>
      </div>

      {/* Variants */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">
          Variants
        </h2>
        <div className="space-y-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">
                Rendu avec syntaxe colorée
              </h3>
              <p className="text-muted-foreground">
                Rendu avec coloration syntaxique pour les blocs de code.
              </p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <div className="h-96 overflow-y-auto">
                  <MarkdownRenderer
                    content={sampleMarkdown}
                    enableSyntaxHighlighting
                  />
                </div>
              </div>
            </div>
            <div>
              <CodeBlock
                language="typescript"
                filePath="components/SyntaxHighlightedMarkdown.tsx"
                showPackageManager={false}
              >
                {`export default function App\docs\components\markdownRenderer\page.tsxExample() {
  return <MarkdownRenderer 
  content={markdownContent}
  enableSyntaxHighlighting
/>;
}`}
              </CodeBlock>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">
                Rendu avec liens externes
              </h3>
              <p className="text-muted-foreground">
                Rendu avec ouverture des liens dans un nouvel onglet.
              </p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <div className="h-96 overflow-y-auto">
                  <MarkdownRenderer
                    content={sampleMarkdown}
                    openLinksInNewTab
                  />
                </div>
              </div>
            </div>
            <div>
              <CodeBlock
                language="typescript"
                filePath="components/ExternalLinksMarkdown.tsx"
                showPackageManager={false}
              >
                {`export default function App\docs\components\markdownRenderer\page.tsxExample() {
  return <MarkdownRenderer 
  content={markdownContent}
  openLinksInNewTab
/>;
}`}
              </CodeBlock>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">
                Rendu avec table des matières
              </h3>
              <p className="text-muted-foreground">
                Rendu avec table des matières automatique.
              </p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <div className="h-96 overflow-y-auto">
                  <MarkdownRenderer
                    content={sampleMarkdown}
                    showTableOfContents
                  />
                </div>
              </div>
            </div>
            <div>
              <CodeBlock
                language="typescript"
                filePath="components/TOCMarkdown.tsx"
                showPackageManager={false}
              >
                {`export default function App\docs\components\markdownRenderer\page.tsxExample() {
  return <MarkdownRenderer 
  content={markdownContent}
  showTableOfContents
/>;
}`}
              </CodeBlock>
            </div>
          </div>
        </div>
      </div>

      {/* Référence API */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">
          Référence API
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-border rounded-lg">
            <thead>
              <tr className="bg-muted/50">
                <th className="border border-border px-4 py-3 text-left font-medium text-foreground">
                  Prop
                </th>
                <th className="border border-border px-4 py-3 text-left font-medium text-foreground">
                  Type
                </th>
                <th className="border border-border px-4 py-3 text-left font-medium text-foreground">
                  Défaut
                </th>
                <th className="border border-border px-4 py-3 text-left font-medium text-foreground">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">
                  content
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  string
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  ''
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  Contenu Markdown à rendre
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">
                  enableSyntaxHighlighting
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  boolean
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  false
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  Activer la coloration syntaxique
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">
                  openLinksInNewTab
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  boolean
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  false
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  Ouvrir les liens dans un nouvel onglet
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">
                  showTableOfContents
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  boolean
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  false
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  Afficher la table des matières
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">
                  className
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  string
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  -
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  Classes CSS supplémentaires
                </td>
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
          <li>
            • Utilisez la{' '}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              coloration syntaxique
            </code>{' '}
            pour les blocs de code
          </li>
          <li>
            • Activez l'
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              ouverture externe
            </code>{' '}
            pour les liens
          </li>
          <li>
            • Ajoutez une{' '}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              table des matières
            </code>{' '}
            pour les longs documents
          </li>
          <li>
            • Validez le{' '}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              contenu Markdown
            </code>{' '}
            avant le rendu
          </li>
          <li>
            • Respectez les{' '}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              guidelines d'accessibilité
            </code>
          </li>
        </ul>
      </div>
    </div>
  );
}
