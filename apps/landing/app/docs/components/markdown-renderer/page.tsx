'use client';

import { useState } from 'react';
import { MarkdownRenderer } from '@cosmic-ui/ui';
import { Button } from '@cosmic-ui/ui';
import { FileText, Code, Hash } from 'lucide-react';

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

export default function MarkdownRendererPage() {
  const [showCode, setShowCode] = useState(false);
  const [showCodeVariants, setShowCodeVariants] = useState(false);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStates(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCopiedStates(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

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

*Fin du document*`;

  const simpleMarkdown = `# Titre Simple

Ceci est un **paragraphe** simple avec du texte formaté.

## Liste
- Élément 1
- Élément 2
- Élément 3

[Lien vers un site](https://example.com)`;

  const complexMarkdown = `# Guide Complet

## Introduction

Ce guide vous aidera à comprendre les **fonctionnalités avancées** de notre système.

### Fonctionnalités Principales

1. **Gestion des utilisateurs**
   - Création de comptes
   - Authentification sécurisée
   - Gestion des rôles

2. **Interface utilisateur**
   - Design responsive
   - Thème sombre/clair
   - Accessibilité

### Code d'exemple

\`\`\`typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

const createUser = (userData: Omit<User, 'id'>): User => {
  return {
    id: generateId(),
    ...userData,
  };
};
\`\`\`

### Tableau de comparaison

| Fonctionnalité | Version 1.0 | Version 2.0 |
|----------------|-------------|-------------|
| Authentification | ✅ | ✅ |
| Thème sombre | ❌ | ✅ |
| API REST | ✅ | ✅ |
| GraphQL | ❌ | ✅ |

### Notes importantes

> **Attention** : Assurez-vous de sauvegarder vos données avant de procéder à la mise à jour.

### Liens utiles

- [Documentation API](https://api.example.com/docs)
- [Support technique](https://support.example.com)
- [Communauté](https://community.example.com)

---

*Dernière mise à jour : 2024-01-15*`;

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
          <h1 className="text-4xl font-bold">MarkdownRenderer</h1>
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
          Un composant pour rendre du contenu Markdown avec support des éléments
          HTML de base.
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
              <div className="p-4 w-full overflow-y-auto">
                <MarkdownRenderer
                  content={sampleMarkdown}
                  className="prose prose-invert max-w-none"
                />
              </div>
            ) : (
              <div className="w-full">
                <CodeBlock
                  onCopy={() =>
                    handleCopy(
                      `import { MarkdownRenderer } from '@cosmic-ui/ui';

export function MyMarkdownRenderer() {
  const markdownContent = \`# Titre Principal

Ceci est un **paragraphe** avec du texte en *italique* et du texte en **gras**.

## Sous-titre

### Liste à puces
- Premier élément
- Deuxième élément
- Troisième élément

### Code inline
Utilisez \`console.log()\` pour afficher des messages.

### Lien
[Visitez notre site](https://example.com)

### Citation
> Ceci est une citation importante.

### Code bloc
\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

### Tableau
| Colonne 1 | Colonne 2 |
|-----------|-----------|
| Donnée 1  | Donnée 2  |
| Donnée 4  | Donnée 5  |\`;

  return (
    <MarkdownRenderer
      content={markdownContent}
      className="prose prose-invert max-w-none"
    />
  );
}`,
                      'main'
                    )
                  }
                >
                  {`import { MarkdownRenderer } from '@cosmic-ui/ui';

export function MyMarkdownRenderer() {
  const markdownContent = \`# Titre Principal

Ceci est un **paragraphe** avec du texte en *italique* et du texte en **gras**.

## Sous-titre

### Liste à puces
- Premier élément
- Deuxième élément
- Troisième élément

### Code inline
Utilisez \`console.log()\` pour afficher des messages.

### Lien
[Visitez notre site](https://example.com)

### Citation
> Ceci est une citation importante.

### Code bloc
\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

### Tableau
| Colonne 1 | Colonne 2 |
|-----------|-----------|
| Donnée 1  | Donnée 2  |
| Donnée 4  | Donnée 5  |\`;

  return (
    <MarkdownRenderer
      content={markdownContent}
      className="prose prose-invert max-w-none"
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
              Le composant MarkdownRenderer est déjà inclus dans le package
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
              Utilisez le composant pour rendre du contenu Markdown.
            </p>
            <CodeBlock
              onCopy={() =>
                handleCopy(
                  `import { MarkdownRenderer } from '@cosmic-ui/ui';

const content = \`# Mon Titre
Ceci est du **texte en gras** et du *texte en italique*.\`;

<MarkdownRenderer
  content={content}
  className="prose prose-invert max-w-none"
/>`,
                  'usage'
                )
              }
            >
              {`import { MarkdownRenderer } from '@cosmic-ui/ui';

const content = \`# Mon Titre
Ceci est du **texte en gras** et du *texte en italique*.\`;

<MarkdownRenderer
  content={content}
  className="prose prose-invert max-w-none"
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
                <div className="p-4 w-full space-y-4 overflow-y-auto">
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Contenu simple
                    </h3>
                    <div className="max-h-[150px] overflow-y-auto">
                      <MarkdownRenderer
                        content={simpleMarkdown}
                        className="prose prose-invert max-w-none prose-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Contenu complexe
                    </h3>
                    <div className="max-h-[150px] overflow-y-auto">
                      <MarkdownRenderer
                        content={complexMarkdown}
                        className="prose prose-invert max-w-none prose-sm"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full">
                  <CodeBlock
                    onCopy={() =>
                      handleCopy(
                        `// Contenu simple
<MarkdownRenderer
  content="# Titre Simple\\n\\nCeci est un **paragraphe** simple."
  className="prose prose-invert max-w-none prose-sm"
/>

// Contenu complexe avec tableaux
<MarkdownRenderer
  content={complexMarkdown}
  className="prose prose-invert max-w-none"
/>

// Avec composants personnalisés
<MarkdownRenderer
  content={markdownContent}
  components={{
    h1: ({ children, className }) => (
      <h1 className={\`text-3xl font-bold text-blue-500 \${className}\`}>
        {children}
      </h1>
    ),
    code: ({ children, className }) => (
      <code className={\`bg-gray-800 text-green-400 px-1 py-0.5 rounded \${className}\`}>
        {children}
      </code>
    ),
  }}
/>

// Styles personnalisés
<MarkdownRenderer
  content={content}
  className="prose prose-invert prose-lg max-w-none"
/>`,
                        'variants'
                      )
                    }
                  >
                    {`// Contenu simple
<MarkdownRenderer
  content="# Titre Simple\\n\\nCeci est un **paragraphe** simple."
  className="prose prose-invert max-w-none prose-sm"
/>

// Contenu complexe avec tableaux
<MarkdownRenderer
  content={complexMarkdown}
  className="prose prose-invert max-w-none"
/>

// Avec composants personnalisés
<MarkdownRenderer
  content={markdownContent}
  components={{
    h1: ({ children, className }) => (
      <h1 className={\`text-3xl font-bold text-blue-500 \${className}\`}>
        {children}
      </h1>
    ),
    code: ({ children, className }) => (
      <code className={\`bg-gray-800 text-green-400 px-1 py-0.5 rounded \${className}\`}>
        {children}
      </code>
    ),
  }}
/>

// Styles personnalisés
<MarkdownRenderer
  content={content}
  className="prose prose-invert prose-lg max-w-none"
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
