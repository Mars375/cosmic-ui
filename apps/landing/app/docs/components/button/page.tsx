'use client';

import { useState } from 'react';
import { Button } from '@cosmic-ui/ui';

const CodeBlock = ({
  children,
  fileName,
  language = 'bash',
}: {
  children: string;
  fileName?: string;
  language?: string;
}) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="relative">
      {fileName && (
        <div className="bg-muted border-b border-border px-4 py-2 text-sm text-muted-foreground">
          {fileName}
        </div>
      )}
      <div className="relative">
        <pre className="bg-muted border border-border rounded-lg p-4 overflow-x-auto">
          <code className="text-foreground">{children}</code>
        </pre>
        <button
          onClick={copyToClipboard}
          className="absolute top-2 right-2 p-2 text-muted-foreground hover:text-foreground transition-colors"
          title="Copier le code"
        >
          {copied ? '✓' : '📋'}
        </button>
      </div>
    </div>
  );
};

export default function ButtonPage() {
  const [activeTab, setActiveTab] = useState('preview');

  return (
    <>
      <h1 className="text-4xl font-bold mb-8 text-foreground">Button</h1>

      <p className="text-foreground mb-8">
        Le composant Button est un élément interactif polyvalent avec plusieurs
        variantes et tailles.
      </p>

      <div className="mb-8">
        <div className="flex space-x-1 mb-8">
          {(['preview', 'installation', 'usage'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm rounded-md transition-colors ${
                activeTab === tab
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab === 'preview'
                ? 'Aperçu'
                : tab === 'installation'
                  ? 'Installation'
                  : 'Usage'}
            </button>
          ))}
        </div>

        {activeTab === 'preview' && (
          <div className="space-y-10">
            <div>
              <h3 className="text-xl font-semibold mb-6 text-foreground">
                Variantes
              </h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="default">Default</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6 text-foreground">
                Tailles
              </h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6 text-foreground">
                États
              </h3>
              <div className="flex flex-wrap gap-4">
                <Button>Normal</Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'installation' && (
          <div>
            <CodeBlock fileName="Terminal">
              <span className="text-blue-500">pnpm</span> add <span className="text-green-500">@cosmic-ui/ui</span>
            </CodeBlock>

            <CodeBlock
              fileName="src/components/MyButton.tsx"
              language="typescript"
            >
              <span className="text-blue-500">import</span> <span className="text-gray-500">&#123;</span> Button <span className="text-gray-500">&#125;</span> <span className="text-blue-500">from</span> <span className="text-green-500">'@cosmic-ui/ui'</span>

<span className="text-blue-500">export function</span> MyButton<span className="text-gray-500">() &#123;</span>
  <span className="text-blue-500">return</span> <span className="text-yellow-500">&lt;Button&gt;</span>Mon bouton<span className="text-yellow-500">&lt;/Button&gt;</span>
<span className="text-gray-500">&#125;</span>
            </CodeBlock>
          </div>
        )}

        {activeTab === 'usage' && (
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-6 text-foreground">
                Props
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-border">
                  <thead>
                    <tr className="bg-muted">
                      <th className="border border-border p-3 text-left text-foreground">
                        Prop
                      </th>
                      <th className="border border-border p-3 text-left text-foreground">
                        Type
                      </th>
                      <th className="border border-border p-3 text-left text-foreground">
                        Default
                      </th>
                      <th className="border border-border p-3 text-left text-foreground">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-border p-3 text-foreground">
                        variant
                      </td>
                      <td className="border border-border p-3 text-foreground">
                        "default" | "outline" | "ghost" | "destructive"
                      </td>
                      <td className="border border-border p-3 text-foreground">
                        "default"
                      </td>
                      <td className="border border-border p-3 text-foreground">
                        Style visuel du bouton
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3 text-foreground">
                        size
                      </td>
                      <td className="border border-border p-3 text-foreground">
                        "sm" | "default" | "lg"
                      </td>
                      <td className="border border-border p-3 text-foreground">
                        "default"
                      </td>
                      <td className="border border-border p-3 text-foreground">
                        Taille du bouton
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3 text-foreground">
                        disabled
                      </td>
                      <td className="border border-border p-3 text-foreground">
                        boolean
                      </td>
                      <td className="border border-border p-3 text-foreground">
                        false
                      </td>
                      <td className="border border-border p-3 text-foreground">
                        Désactive le bouton
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6 text-foreground">
                Exemples avancés
              </h3>

              <CodeBlock
                fileName="src/components/AdvancedButton.tsx"
                language="typescript"
              >
                <span className="text-blue-500">import</span> <span className="text-gray-500">&#123;</span> Button <span className="text-gray-500">&#125;</span> <span className="text-blue-500">from</span> <span className="text-green-500">'@cosmic-ui/ui'</span>

<span className="text-blue-500">export function</span> AdvancedButton<span className="text-gray-500">() &#123;</span>
  <span className="text-blue-500">return</span> <span className="text-gray-500">(</span>
    <span className="text-yellow-500">&lt;div</span> className=<span className="text-green-500">"space-y-4"</span><span className="text-yellow-500">&gt;</span>
      <span className="text-gray-400">&#123;/* Bouton avec icône */&#125;</span>
      <span className="text-yellow-500">&lt;Button</span> className=<span className="text-green-500">"flex items-center gap-2"</span><span className="text-yellow-500">&gt;</span>
        <span className="text-yellow-500">&lt;span&gt;</span>+<span className="text-yellow-500">&lt;/span&gt;</span>
        Ajouter
      <span className="text-yellow-500">&lt;/Button&gt;</span>
      
      <span className="text-gray-400">&#123;/* Bouton comme lien */&#125;</span>
      <span className="text-yellow-500">&lt;Button</span> asChild<span className="text-yellow-500">&gt;</span>
        <span className="text-yellow-500">&lt;a</span> href=<span className="text-green-500">"/dashboard"</span><span className="text-yellow-500">&gt;</span>Aller au dashboard<span className="text-yellow-500">&lt;/a&gt;</span>
      <span className="text-yellow-500">&lt;/Button&gt;</span>
      
      <span className="text-gray-400">&#123;/* Bouton de chargement */&#125;</span>
      <span className="text-yellow-500">&lt;Button</span> disabled<span className="text-yellow-500">&gt;</span>
        <span className="text-yellow-500">&lt;span</span> className=<span className="text-green-500">"animate-spin mr-2"</span><span className="text-yellow-500">&gt;</span>⟳<span className="text-yellow-500">&lt;/span&gt;</span>
        Chargement...
      <span className="text-yellow-500">&lt;/Button&gt;</span>
    <span className="text-yellow-500">&lt;/div&gt;</span>
  <span className="text-gray-500">)</span>
<span className="text-gray-500">&#125;</span>
              </CodeBlock>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6 text-foreground">
                Accessibilité
              </h3>
              <ul className="space-y-2 text-foreground">
                <li>• Support natif du clavier (Tab, Enter, Espace)</li>
                <li>• Attributs ARIA automatiques</li>
                <li>• Focus visible pour la navigation clavier</li>
                <li>• Respect des préférences de mouvement réduit</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
