'use client';

import * as React from 'react';
import { useState } from 'react';
import { Button } from 'cosmic-ui-mars';
import { CodeBlock } from '../../../components/code-block';
import { Download, Heart, Star, Settings, Trash2, Plus, Minus } from 'lucide-react';

export default function ButtonPage() {
  const [loading, setLoading] = useState(false);
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);

  const handleLoadingDemo = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-foreground">Button</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Un composant bouton polyvalent avec plusieurs variants, tailles et états. 
          Parfait pour les actions principales et secondaires dans vos interfaces.
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
              <div className="flex flex-wrap gap-3">
                <Button>Bouton par défaut</Button>
                <Button variant="secondary">Secondaire</Button>
                <Button variant="outline">Contour</Button>
                <Button variant="ghost">Fantôme</Button>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4 text-foreground">Code</h3>
            <CodeBlock language="typescript" filePath="components/ButtonExample.tsx" showPackageManager={false}>
{`import { Button } from 'cosmic-ui-mars';

export function ButtonExample() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button>Bouton par défaut</Button>
      <Button variant="secondary">Secondaire</Button>
      <Button variant="outline">Contour</Button>
      <Button variant="ghost">Fantôme</Button>
    </div>
  );
}`}
            </CodeBlock>
          </div>
        </div>
      </div>

      {/* Variants */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Variants</h2>
        <div className="space-y-8">
          {/* Default */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Default</h3>
              <p className="text-muted-foreground">Le variant par défaut pour les actions principales.</p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <Button>Action principale</Button>
              </div>
            </div>
            <div>
              <CodeBlock language="typescript" filePath="components/DefaultButton.tsx" showPackageManager={false}>
{`export default function DefaultButton() {
  return <Button>Action principale</Button>;
}`}
              </CodeBlock>
            </div>
          </div>

          {/* Secondary */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Secondary</h3>
              <p className="text-muted-foreground">Pour les actions secondaires moins importantes.</p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <Button variant="secondary">Action secondaire</Button>
              </div>
            </div>
            <div>
              <CodeBlock language="typescript" filePath="components/SecondaryButton.tsx" showPackageManager={false}>
{`export default function SecondaryButton() {
  return <Button variant="secondary">Action secondaire</Button>;
}`}
              </CodeBlock>
            </div>
          </div>

          {/* Outline */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Outline</h3>
              <p className="text-muted-foreground">Bouton avec bordure pour un style plus discret.</p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <Button variant="outline">Bouton contour</Button>
              </div>
            </div>
            <div>
              <CodeBlock language="typescript" filePath="components/OutlineButton.tsx" showPackageManager={false}>
{`export default function App\docs\components\button\page.tsxExample() {
  return <Button variant="outline">Bouton contour</Button>;
}`}
              </CodeBlock>
            </div>
          </div>

          {/* Ghost */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Ghost</h3>
              <p className="text-muted-foreground">Bouton transparent pour les actions discrètes.</p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <Button variant="ghost">Bouton fantôme</Button>
              </div>
            </div>
            <div>
              <CodeBlock language="typescript" filePath="components/GhostButton.tsx" showPackageManager={false}>
{`export default function App\docs\components\button\page.tsxExample() {
  return <Button variant="ghost">Bouton fantôme</Button>;
}`}
              </CodeBlock>
            </div>
          </div>

          {/* Destructive */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Destructive</h3>
              <p className="text-muted-foreground">Pour les actions destructives comme supprimer.</p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <Button variant="destructive">Supprimer</Button>
              </div>
            </div>
            <div>
              <CodeBlock language="typescript" filePath="components/DestructiveButton.tsx" showPackageManager={false}>
{`export default function App\docs\components\button\page.tsxExample() {
  return <Button variant="destructive">Supprimer</Button>;
}`}
              </CodeBlock>
            </div>
          </div>
        </div>
      </div>

      {/* Tailles */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Tailles</h2>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Exemples</h3>
            <p className="text-muted-foreground">Trois tailles disponibles pour s'adapter à vos besoins.</p>
            <div className="p-6 bg-muted/30 rounded-lg border">
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Petit</Button>
                <Button>Moyen</Button>
                <Button size="lg">Grand</Button>
              </div>
            </div>
          </div>
          <div>
            <CodeBlock language="typescript" filePath="components/ButtonSizes.tsx" showPackageManager={false}>
{`export default function App\docs\components\button\page.tsxExample() {
  <div className="flex flex-wrap items-center gap-3">
  <Button size="sm">Petit</Button>
  <Button>Moyen</Button>
  <Button size="lg">Grand</Button>
</div>
}`}
            </CodeBlock>
          </div>
        </div>
      </div>

      {/* Avec icônes */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Avec icônes</h2>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Exemples</h3>
            <p className="text-muted-foreground">Ajoutez des icônes pour améliorer la clarté des actions.</p>
            <div className="p-6 bg-muted/30 rounded-lg border">
              <div className="flex flex-wrap gap-3">
                <Button>
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger
                </Button>
                <Button variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Paramètres
                </Button>
                <Button variant="destructive">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Supprimer
                </Button>
              </div>
            </div>
          </div>
          <div>
            <CodeBlock language="typescript" filePath="components/ButtonWithIcons.tsx" showPackageManager={false}>
{`import { Download, Settings, Trash2 } from 'lucide-react';

<div className="flex flex-wrap gap-3">
  <Button>
    <Download className="w-4 h-4 mr-2" />
    Télécharger
  </Button>
  <Button variant="outline">
    <Settings className="w-4 h-4 mr-2" />
    Paramètres
  </Button>
  <Button variant="destructive">
    <Trash2 className="w-4 h-4 mr-2" />
    Supprimer
  </Button>
</div>`}
            </CodeBlock>
          </div>
        </div>
      </div>

      {/* États */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">États</h2>
        <div className="space-y-8">
          {/* Loading */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Loading</h3>
              <p className="text-muted-foreground">Bouton avec état de chargement pour les actions asynchrones.</p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <Button onClick={handleLoadingDemo} disabled={loading}>
                  {loading ? (
                    <>
                      <div className="w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Chargement...
                    </>
                  ) : (
                    'Cliquer pour charger'
                  )}
                </Button>
              </div>
            </div>
            <div>
              <CodeBlock language="typescript" filePath="components/LoadingButton.tsx" showPackageManager={false}>
{`export default function LoadingButton() {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <Button onClick={handleClick} disabled={loading}>
      {loading ? (
        <>
          <div className="w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
          Chargement...
        </>
      ) : (
        'Cliquer pour charger'
      )}
    </Button>
  );
}`}
              </CodeBlock>
            </div>
          </div>

          {/* Disabled */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Disabled</h3>
              <p className="text-muted-foreground">Bouton désactivé pour les actions non disponibles.</p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <div className="flex flex-wrap gap-3">
                  <Button disabled>Désactivé</Button>
                  <Button variant="secondary" disabled>Secondaire désactivé</Button>
                  <Button variant="outline" disabled>Contour désactivé</Button>
                </div>
              </div>
            </div>
            <div>
              <CodeBlock language="typescript" filePath="components/DisabledButtons.tsx" showPackageManager={false}>
{`export default function App\docs\components\button\page.tsxExample() {
  <div className="flex flex-wrap gap-3">
  <Button disabled>Désactivé</Button>
  <Button variant="secondary" disabled>Secondaire désactivé</Button>
  <Button variant="outline" disabled>Contour désactivé</Button>
</div>
}`}
              </CodeBlock>
            </div>
          </div>
        </div>
      </div>

      {/* Exemples interactifs */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Exemples interactifs</h2>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Compteur avec boutons</h3>
            <p className="text-muted-foreground">Exemple pratique d'utilisation des boutons dans une interface.</p>
            <div className="p-6 bg-muted/30 rounded-lg border">
              <div className="flex items-center justify-center gap-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setCount(count - 1)}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="text-2xl font-bold w-12 text-center">{count}</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setCount(count + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          <div>
            <CodeBlock language="typescript" filePath="components/CounterExample.tsx" showPackageManager={false}>
{`export default function CounterExample() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex items-center justify-center gap-4">
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => setCount(count - 1)}
      >
        <Minus className="w-4 h-4" />
      </Button>
      <span className="text-2xl font-bold w-12 text-center">{count}</span>
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => setCount(count + 1)}
      >
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  );
}`}
            </CodeBlock>
          </div>
        </div>
      </div>

      {/* API Reference */}
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
                <td className="border border-border px-4 py-3 font-mono text-sm">variant</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">'default' | 'secondary' | 'outline' | 'ghost' | 'destructive'</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">'default'</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Style visuel du bouton</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">size</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">'sm' | 'default' | 'lg'</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">'default'</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Taille du bouton</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">disabled</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">boolean</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">false</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Désactive le bouton</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">onClick</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">() => void</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">-</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Fonction appelée au clic</td>
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
          <li>• Utilisez le variant <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">default</code> pour les actions principales</li>
          <li>• Le variant <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">destructive</code> doit être utilisé avec parcimonie</li>
          <li>• Ajoutez des icônes pour améliorer la compréhension des actions</li>
          <li>• Utilisez l'état <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">loading</code> pour les actions asynchrones</li>
        </ul>
      </div>
    </div>
  );
}