'use client';

import * as React from 'react';
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from 'cosmic-ui-mars';
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

export default function TabsPage() {
  const [value, setValue] = useState('');
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-foreground">Tabs</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Un composant onglets pour organiser le contenu en sections.
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
              <Tabs>Contenu du composant</Tabs>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4 text-foreground">Code</h3>
            <CodeBlock
              language="typescript"
              filePath="components/TabsExample.tsx"
              showPackageManager={false}
            >
              {`import { Tabs } from 'cosmic-ui-mars';

<Tabs>
  Contenu du composant
</Tabs>`}
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
                Onglets avec icônes
              </h3>
              <p className="text-muted-foreground">Description du variant</p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <Tabs>Contenu du composant</Tabs>
              </div>
            </div>
            <div>
              <CodeBlock
                language="typescript"
                filePath="components/Tabs1.tsx"
                showPackageManager={false}
              >
                {`export default function App\docs\components\tabs\page.tsxExample() {
  <Tabs>
  Contenu du composant
</Tabs>
}`}
              </CodeBlock>
            </div>
          </div>
        </div>
      </div>

      {/* Exemples interactifs */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">
          Exemples interactifs
        </h2>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">
              Tabs avec état contrôlé
            </h3>
            <p className="text-muted-foreground">
              Tabs avec gestion d'état et changement d'onglet.
            </p>
            <div className="p-6 bg-muted/30 rounded-lg border">
              <div className="space-y-4">
                <Tabs
                  value={value}
                  onValueChange={setValue}
                  defaultValue="tab1"
                >
                  <TabsList>
                    <TabsTrigger value="tab1">Profil</TabsTrigger>
                    <TabsTrigger value="tab2">Paramètres</TabsTrigger>
                    <TabsTrigger value="tab3">Notifications</TabsTrigger>
                  </TabsList>
                  <TabsContent value="tab1" className="mt-4">
                    <div className="p-4 bg-background rounded border">
                      <h3 className="font-medium mb-2">
                        Informations du profil
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Gérez vos informations personnelles et votre photo de
                        profil.
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="tab2" className="mt-4">
                    <div className="p-4 bg-background rounded border">
                      <h3 className="font-medium mb-2">Paramètres du compte</h3>
                      <p className="text-sm text-muted-foreground">
                        Configurez vos préférences et paramètres de sécurité.
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="tab3" className="mt-4">
                    <div className="p-4 bg-background rounded border">
                      <h3 className="font-medium mb-2">
                        Préférences de notification
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Choisissez comment vous souhaitez être notifié.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
                <p className="text-xs text-muted-foreground">
                  Onglet actuel: {value || 'tab1'}
                </p>
              </div>
            </div>
          </div>
          <div>
            <CodeBlock
              language="typescript"
              filePath="components/InteractiveTabs.tsx"
              showPackageManager={false}
            >
              {`export default function InteractiveTabs() {
  const [value, setValue] = useState('tab1');

  return (
    <div className="space-y-4">
      <Tabs value={value} onValueChange={setValue}>
        <TabsList>
          <TabsTrigger value="tab1">Profil</TabsTrigger>
          <TabsTrigger value="tab2">Paramètres</TabsTrigger>
          <TabsTrigger value="tab3">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1" className="mt-4">
          <div className="p-4 bg-background rounded border">
            <h3 className="font-medium mb-2">Informations du profil</h3>
            <p className="text-sm text-muted-foreground">
              Gérez vos informations personnelles.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="tab2" className="mt-4">
          <div className="p-4 bg-background rounded border">
            <h3 className="font-medium mb-2">Paramètres du compte</h3>
            <p className="text-sm text-muted-foreground">
              Configurez vos préférences.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="tab3" className="mt-4">
          <div className="p-4 bg-background rounded border">
            <h3 className="font-medium mb-2">Notifications</h3>
            <p className="text-sm text-muted-foreground">
              Choisissez vos préférences de notification.
            </p>
          </div>
        </TabsContent>
      </Tabs>
      <p className="text-xs text-muted-foreground">
        Onglet actuel: {value}
      </p>
    </div>
  );
}`}
            </CodeBlock>
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
