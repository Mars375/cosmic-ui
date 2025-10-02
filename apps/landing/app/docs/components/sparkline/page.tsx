'use client';

import * as React from 'react';
import { useState } from 'react';
import { CodeBlock } from '../../../components/code-block';
import { Sparkline } from 'cosmic-ui-mars';
import { TrendingUp } from 'lucide-react';

export default function SparklinePage() {
  const sampleData = [65, 70, 80, 75, 85, 90, 95, 88, 92, 100, 105, 98];
  const userData = [80, 95, 110, 125, 105, 140, 120, 160, 135, 180, 150, 200];

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <TrendingUp className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">Sparkline</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Graphique miniature pour afficher des tendances de données de manière
          compacte.
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
                    Tendance des ventes
                  </p>
                  <Sparkline data={sampleData} width={200} height={50} />
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4 text-foreground">Code</h3>
            <CodeBlock
              language="typescript"
              filePath="components/SparklineExample.tsx"
              showPackageManager={false}
            >
              {`import { Sparkline } from 'cosmic-ui-mars';

const data = [65, 70, 80, 75, 85, 90, 95, 88, 92, 100, 105, 98];

<Sparkline 
  data={data} 
  width={200} 
  height={50} 
/>`}
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
                Sparkline colorée
              </h3>
              <p className="text-muted-foreground">
                Sparkline avec couleurs personnalisées.
              </p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Croissance positive (vert)
                    </p>
                    <Sparkline
                      data={userData}
                      width={200}
                      height={50}
                      color="#22c55e"
                      fillColor="#22c55e20"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Décroissance (rouge)
                    </p>
                    <Sparkline
                      data={[100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50, 45]}
                      width={200}
                      height={50}
                      color="#ef4444"
                      fillColor="#ef444420"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <CodeBlock
                language="typescript"
                filePath="components/ColoredSparkline.tsx"
                showPackageManager={false}
              >
                {`export default function App\docs\components\sparkline\page.tsxExample() {
  // Sparkline positive (vert)
<Sparkline 
  data={data} 
  width={200} 
  height={50} 
  color="#22c55e"
  fillColor="#22c55e20"
/>

// Sparkline négative (rouge)
<Sparkline 
  data={data} 
  width={200} 
  height={50} 
  color="#ef4444"
  fillColor="#ef444420"
/>
}`}
              </CodeBlock>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">
                Sparkline avec points
              </h3>
              <p className="text-muted-foreground">
                Sparkline avec points de données visibles.
              </p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Avec tous les points
                    </p>
                    <Sparkline
                      data={sampleData}
                      width={200}
                      height={50}
                      showDots
                      dotSize={3}
                    />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Avec point final uniquement
                    </p>
                    <Sparkline
                      data={userData}
                      width={200}
                      height={50}
                      showLastDot
                      dotSize={4}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <CodeBlock
                language="typescript"
                filePath="components/DottedSparkline.tsx"
                showPackageManager={false}
              >
                {`export default function App\docs\components\sparkline\page.tsxExample() {
  // Avec tous les points
<Sparkline 
  data={data} 
  width={200} 
  height={50} 
  showDots
  dotSize={3}
/>

// Avec point final uniquement
<Sparkline 
  data={data} 
  width={200} 
  height={50} 
  showLastDot
  dotSize={4}
/>
}`}
              </CodeBlock>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">
                Sparkline avec remplissage
              </h3>
              <p className="text-muted-foreground">
                Sparkline avec zone remplie sous la courbe.
              </p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Zone remplie
                    </p>
                    <Sparkline
                      data={sampleData}
                      width={200}
                      height={50}
                      filled
                      fillColor="#6366f120"
                      color="#6366f1"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Gradient de remplissage
                    </p>
                    <Sparkline
                      data={userData}
                      width={200}
                      height={50}
                      filled
                      gradient
                      color="#8b5cf6"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <CodeBlock
                language="typescript"
                filePath="components/FilledSparkline.tsx"
                showPackageManager={false}
              >
                {`export default function App\docs\components\sparkline\page.tsxExample() {
  // Zone remplie simple
<Sparkline 
  data={data} 
  width={200} 
  height={50} 
  filled
  fillColor="#6366f120"
  color="#6366f1"
/>

// Avec gradient
<Sparkline 
  data={data} 
  width={200} 
  height={50} 
  filled
  gradient
  color="#8b5cf6"
/>
}`}
              </CodeBlock>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">
                Sparkline avec animation
              </h3>
              <p className="text-muted-foreground">
                Sparkline avec animation d'apparition.
              </p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Animation progressive
                    </p>
                    <Sparkline
                      data={sampleData}
                      width={200}
                      height={50}
                      animated
                      animationDuration={2000}
                      showLastDot
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <CodeBlock
                language="typescript"
                filePath="components/AnimatedSparkline.tsx"
                showPackageManager={false}
              >
                {`export default function App\docs\components\sparkline\page.tsxExample() {
  return <Sparkline 
  data={data} 
  width={200} 
  height={50} 
  animated
  animationDuration={2000}
  showLastDot
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
                  data
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  number[]
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  []
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  Données à afficher
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">
                  width
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  number
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  100
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  Largeur du graphique
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">
                  height
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  number
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  30
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  Hauteur du graphique
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">
                  color
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  string
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  '#3b82f6'
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  Couleur de la ligne
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">
                  fillColor
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  string
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  -
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  Couleur de remplissage
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">
                  filled
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  boolean
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  false
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  Remplir la zone
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">
                  showDots
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  boolean
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  false
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  Afficher tous les points
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">
                  showLastDot
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  boolean
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  false
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  Afficher le dernier point
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
            selon la tendance
          </li>
          <li>
            • Gardez les{' '}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              dimensions compactes
            </code>{' '}
            pour l'intégration
          </li>
          <li>
            • Ajoutez des{' '}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              points
            </code>{' '}
            pour mettre en évidence
          </li>
          <li>
            • Utilisez le{' '}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              remplissage
            </code>{' '}
            pour plus de visibilité
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
