'use client';

import * as React from 'react';
import { useState } from 'react';
import { CodeBlock } from '../../../components/code-block';
import { CommandPalette } from 'cosmic-ui-mars';
import { Button } from 'cosmic-ui-mars';
import { Search, Settings, User, FileText, Home, Mail } from 'lucide-react';

export default function CommandPalettePage() {
  const [isOpen, setIsOpen] = useState(false);

  const groups = [
    {
      id: 'navigation',
      title: 'Navigation',
      items: [
        {
          id: 'home',
          title: 'Accueil',
          description: 'Retourner à la page d\'accueil',
          icon: <Home className="w-4 h-4" />,
          action: () => console.log('Navigate to home'),
        },
        {
          id: 'settings',
          title: 'Paramètres',
          description: 'Ouvrir les paramètres',
          icon: <Settings className="w-4 h-4" />,
          action: () => console.log('Open settings'),
        },
        {
          id: 'profile',
          title: 'Profil',
          description: 'Voir le profil utilisateur',
          icon: <User className="w-4 h-4" />,
          action: () => console.log('Open profile'),
        },
      ],
    },
    {
      id: 'actions',
      title: 'Actions',
      items: [
        {
          id: 'new-document',
          title: 'Nouveau document',
          description: 'Créer un nouveau document',
          icon: <FileText className="w-4 h-4" />,
          action: () => console.log('Create new document'),
        },
        {
          id: 'send-email',
          title: 'Envoyer un email',
          description: 'Composer un nouvel email',
          icon: <Mail className="w-4 h-4" />,
          action: () => console.log('Send email'),
        },
      ],
    },
  ];

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Search className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">CommandPalette</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Palette de commandes pour la navigation rapide et l'exécution d'actions.
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
              <Button onClick={() => setIsOpen(true)}>
                <Search className="w-4 h-4 mr-2" />
                Ouvrir la palette
              </Button>
              <p className="text-sm text-muted-foreground mt-2">
                Cliquez sur le bouton pour ouvrir la palette de commandes
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4 text-foreground">Code</h3>
            <CodeBlock language="typescript" filePath="components/CommandPaletteExample.tsx" showPackageManager={false}>
{`import { CommandPalette } from 'cosmic-ui-mars';
import { useState } from 'react';

const [isOpen, setIsOpen] = useState(false);

const groups = [
  {
    id: 'navigation',
    title: 'Navigation',
    items: [
      {
        id: 'home',
        title: 'Accueil',
        description: 'Retourner à la page d\'accueil',
        icon: <Home className="w-4 h-4" />,
        action: () => console.log('Navigate to home'),
      },
    ],
  },
];

<CommandPalette
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  groups={groups}
/>`}
            </CodeBlock>
          </div>
        </div>
      </div>

      {/* Variants */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Variants</h2>
        <div className="space-y-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Palette avec recherche</h3>
              <p className="text-muted-foreground">Palette avec fonction de recherche intégrée.</p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <Button onClick={() => setIsOpen(true)}>
                  <Search className="w-4 h-4 mr-2" />
                  Rechercher
                </Button>
              </div>
            </div>
            <div>
              <CodeBlock language="typescript" filePath="components/SearchableCommandPalette.tsx" showPackageManager={false}>
{`export default function App\docs\components\commandPalette\page.tsxExample() {
  <CommandPalette
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  groups={groups}
  placeholder="Rechercher une commande..."
  showSearch
/>
}`}
              </CodeBlock>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Palette avec raccourcis</h3>
              <p className="text-muted-foreground">Palette affichant les raccourcis clavier.</p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <Button onClick={() => setIsOpen(true)}>
                  <Search className="w-4 h-4 mr-2" />
                  Raccourcis
                </Button>
              </div>
            </div>
            <div>
              <CodeBlock language="typescript" filePath="components/CommandPaletteWithShortcuts.tsx" showPackageManager={false}>
{`export default function App\docs\components\commandPalette\page.tsxExample() {
  <CommandPalette
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  groups={groups}
  showShortcuts
  shortcutKey="k"
/>
}`}
              </CodeBlock>
            </div>
          </div>
        </div>
      </div>

      {/* Référence API */}
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
                <td className="border border-border px-4 py-3 font-mono text-sm">isOpen</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">boolean</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">false</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">État d'ouverture de la palette</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">onClose</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">() => void</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">-</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Callback appelé lors de la fermeture</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">groups</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">CommandGroup[]</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">[]</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Groupes de commandes</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">placeholder</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">string</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">'Rechercher...'</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Placeholder du champ de recherche</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">showSearch</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">boolean</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">true</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Afficher le champ de recherche</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">showShortcuts</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">boolean</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">false</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Afficher les raccourcis clavier</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">shortcutKey</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">string</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">'k'</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Touche de raccourci pour ouvrir</td>
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
          <li>• Organisez les commandes en <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">groupes</code> logiques</li>
          <li>• Utilisez des <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">icônes</code> pour identifier rapidement les actions</li>
          <li>• Ajoutez des <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">descriptions</code> pour clarifier les commandes</li>
          <li>• Implémentez des <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">raccourcis clavier</code> pour l'accessibilité</li>
          <li>• Respectez les <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">guidelines d'accessibilité</code></li>
        </ul>
      </div>

      {/* CommandPalette Component */}
      <CommandPalette
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        groups={groups}
        placeholder="Rechercher une commande..."
        showSearch
        showShortcuts
        shortcutKey="k"
      />
    </div>
  );
}