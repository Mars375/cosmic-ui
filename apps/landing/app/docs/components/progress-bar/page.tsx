'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { CodeBlock } from '../../../components/code-block';
import { ProgressBar } from 'cosmic-ui-mars';
import { Activity } from 'lucide-react';

export default function ProgressBarPage() {
  const [progress, setProgress] = useState(0);
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => (prev >= 100 ? 0 : prev + 10));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimatedProgress(prev => (prev >= 100 ? 0 : prev + 5));
    }, 500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Activity className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">ProgressBar</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Barre de progression pour indiquer l'avancement d'une tâche ou d'un
          processus.
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
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Progression: {progress}%
                  </p>
                  <ProgressBar value={progress} />
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4 text-foreground">Code</h3>
            <CodeBlock
              language="typescript"
              filePath="components/ProgressBarExample.tsx"
              showPackageManager={false}
            >
              {`import { ProgressBar } from 'cosmic-ui-mars';
import { useState, useEffect } from 'react';

const [progress, setProgress] = useState(0);

useEffect(() => {
  const timer = setInterval(() => {
    setProgress(prev => prev >= 100 ? 0 : prev + 10);
  }, 1000);
  return () => clearInterval(timer);
}, []);

<ProgressBar value={progress} />`}
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
                Barre avec label
              </h3>
              <p className="text-muted-foreground">
                Barre de progression avec texte d'indication.
              </p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <div className="space-y-4">
                  <ProgressBar
                    value={progress}
                    showLabel
                    label={`export default function App\docs\components\progressBar\page.tsxExample() {
  ${progress}% terminé
}`}
                  />
                </div>
              </div>
            </div>
            <div>
              <CodeBlock
                language="typescript"
                filePath="components/LabeledProgressBar.tsx"
                showPackageManager={false}
              >
                {`<ProgressBar
  value={progress}
  showLabel
  label={\`\${progress}% terminé\`}
/>`}
              </CodeBlock>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">
                Barre colorée
              </h3>
              <p className="text-muted-foreground">
                Barre avec différentes couleurs selon la valeur.
              </p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Succès (vert)
                    </p>
                    <ProgressBar value={85} variant="success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Attention (orange)
                    </p>
                    <ProgressBar value={60} variant="warning" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Erreur (rouge)
                    </p>
                    <ProgressBar value={30} variant="error" />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <CodeBlock
                language="typescript"
                filePath="components/ColoredProgressBar.tsx"
                showPackageManager={false}
              >
                {`export default function App\docs\components\progressBar\page.tsxExample() {
  <ProgressBar value={85} variant="success" />
<ProgressBar value={60} variant="warning" />
<ProgressBar value={30} variant="error" />
}`}
              </CodeBlock>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">
                Barre animée
              </h3>
              <p className="text-muted-foreground">
                Barre avec animation de progression fluide.
              </p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Animation: {animatedProgress}%
                    </p>
                    <ProgressBar value={animatedProgress} animated showLabel />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <CodeBlock
                language="typescript"
                filePath="components/AnimatedProgressBar.tsx"
                showPackageManager={false}
              >
                {`export default function App\docs\components\progressBar\page.tsxExample() {
  return <ProgressBar
  value={progress}
  animated
  showLabel
/>;
}`}
              </CodeBlock>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">
                Barre avec tailles
              </h3>
              <p className="text-muted-foreground">
                Différentes tailles de barres de progression.
              </p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Petite</p>
                    <ProgressBar value={progress} size="sm" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Normale
                    </p>
                    <ProgressBar value={progress} size="md" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Grande</p>
                    <ProgressBar value={progress} size="lg" />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <CodeBlock
                language="typescript"
                filePath="components/SizedProgressBar.tsx"
                showPackageManager={false}
              >
                {`export default function App\docs\components\progressBar\page.tsxExample() {
  <ProgressBar value={progress} size="sm" />
<ProgressBar value={progress} size="md" />
<ProgressBar value={progress} size="lg" />
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
                  value
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  number
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  0
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  Valeur de progression (0-100)
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">
                  variant
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  'default' | 'success' | 'warning' | 'error'
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  'default'
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  Variante de couleur
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">
                  size
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  'sm' | 'md' | 'lg'
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  'md'
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  Taille de la barre
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">
                  showLabel
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  boolean
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  false
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  Afficher le label
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">
                  label
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  string
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  -
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  Texte du label personnalisé
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">
                  animated
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  boolean
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  false
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  Activer l'animation
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
            • Utilisez des{' '}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              couleurs appropriées
            </code>{' '}
            selon le contexte
          </li>
          <li>
            • Ajoutez des{' '}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              labels informatifs
            </code>{' '}
            quand nécessaire
          </li>
          <li>
            • Activez l'
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              animation
            </code>{' '}
            pour les transitions fluides
          </li>
          <li>
            • Choisissez la{' '}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              taille appropriée
            </code>{' '}
            au contexte
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
