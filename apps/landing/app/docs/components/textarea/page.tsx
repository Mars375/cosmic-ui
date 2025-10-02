'use client';

import * as React from 'react';
import { useState } from 'react';
import { Textarea } from 'cosmic-ui-mars';
import { CodeBlock } from '../../../components/code-block';
import { Button } from 'cosmic-ui-mars';
import {
  Star,
  Heart,
  Settings,
  User,
  Bell,
  Download,
  Share2,
  Trash2,
  Edit,
  Plus,
  Minus,
} from 'lucide-react';

export default function TextareaPage() {
  const [message, setMessage] = useState('');
  const [comment, setComment] = useState(
    'Ceci est un commentaire par défaut...'
  );

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <svg
              className="w-6 h-6 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-foreground">Textarea</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Un composant textarea pour la saisie de texte multiligne. Parfait pour
          les commentaires, descriptions et messages longs.
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
                  <label className="text-sm font-medium mb-2 block">
                    Message
                  </label>
                  <Textarea
                    placeholder="Tapez votre message ici..."
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    rows={3}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Commentaire
                  </label>
                  <Textarea
                    defaultValue="Ceci est un commentaire par défaut..."
                    rows={4}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Description (désactivé)
                  </label>
                  <Textarea
                    defaultValue="Ce textarea est désactivé"
                    disabled
                    rows={2}
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4 text-foreground">Code</h3>
            <CodeBlock
              language="typescript"
              filePath="components/TextareaExample.tsx"
              showPackageManager={false}
            >
              {`export default function TextareaExample() {
  const [message, setMessage] = useState('');

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-2 block">Message</label>
        <Textarea 
          placeholder="Tapez votre message ici..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Commentaire</label>
        <Textarea 
          defaultValue="Ceci est un commentaire par défaut..."
          rows={4}
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Description (désactivé)</label>
        <Textarea 
          defaultValue="Ce textarea est désactivé"
          disabled
          rows={2}
        />
      </div>
    </div>
  );
}`}
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
                Textarea avec compteur
              </h3>
              <p className="text-muted-foreground">Description du variant</p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <Textarea
                  placeholder="Tapez votre texte ici..."
                  defaultValue="Contenu par défaut"
                />
              </div>
            </div>
            <div>
              <CodeBlock
                language="typescript"
                filePath="components/BasicTextarea.tsx"
                showPackageManager={false}
              >
                {`export default function BasicTextarea() {
  return (
    <Textarea 
      placeholder="Tapez votre texte ici..."
      defaultValue="Contenu par défaut"
    />
  );
}`}
              </CodeBlock>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">
                Textarea redimensionnable
              </h3>
              <p className="text-muted-foreground">Description du variant</p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <Textarea placeholder="Textarea redimensionnable..." rows={4} />
              </div>
            </div>
            <div>
              <CodeBlock
                language="typescript"
                filePath="components/ResizableTextarea.tsx"
                showPackageManager={false}
              >
                {`export default function ResizableTextarea() {
  return (
    <Textarea 
      placeholder="Textarea redimensionnable..."
      rows={4}
    />
  );
}`}
              </CodeBlock>
            </div>
          </div>
        </div>
      </div>

      {/* API Reference */}
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
                  variant
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  'default' | 'secondary' | 'outline' | 'ghost' | 'destructive'
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  'default'
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  Style visuel du composant
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">
                  size
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  'sm' | 'default' | 'lg'
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  'default'
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  Taille du composant
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">
                  disabled
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  boolean
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  false
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  Désactive le composant
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
            • Utilisez le variant{' '}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              default
            </code>{' '}
            pour les cas standards
          </li>
          <li>
            • Le variant{' '}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              destructive
            </code>{' '}
            pour les actions dangereuses
          </li>
          <li>
            • Ajoutez des{' '}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              icônes
            </code>{' '}
            pour améliorer la compréhension
          </li>
          <li>
            • Utilisez l'état{' '}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              disabled
            </code>{' '}
            pour les actions non disponibles
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
