'use client';

import * as React from 'react';
import { useState } from 'react';
import { CodeBlock } from '../../../components/code-block';

// Timeline component placeholder
const Timeline = () => (
  <div className="p-4 border-2 border-dashed border-muted-foreground/25 rounded-lg text-center">
    <p className="text-muted-foreground">
      Composant <code className="font-mono">Timeline</code> en cours de
      développement
    </p>
  </div>
);
import { Clock } from 'lucide-react';

export default function TimelinePage() {
  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Clock className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">Timeline</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Composant de chronologie pour afficher des événements dans le temps.
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
              <Timeline />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4 text-foreground">Code</h3>
            <CodeBlock
              language="typescript"
              filePath="components/TimelineExample.tsx"
              showPackageManager={false}
            >
              {`import { Timeline } from 'cosmic-ui-mars';

<Timeline />`}
            </CodeBlock>
          </div>
        </div>
      </div>

      {/* Conseils d'utilisation */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <h3 className="text-blue-800 dark:text-blue-200 font-semibold mb-2">
          💡 Conseils d'utilisation
        </h3>
        <ul className="text-blue-700 dark:text-blue-300 space-y-1 text-sm">
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
