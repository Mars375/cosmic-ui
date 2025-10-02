'use client';

import * as React from 'react';
import { useState } from 'react';
import { CodeBlock } from '../../../components/code-block';
import {
  DropdownMenu,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownLabel,
} from 'cosmic-ui-mars';
import { Button } from 'cosmic-ui-mars';
import {
  MoreVertical,
  User,
  Settings,
  LogOut,
  Download,
  Share,
  Edit,
  Trash2,
} from 'lucide-react';

export default function DropdownMenuPage() {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <MoreVertical className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">DropdownMenu</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Menu déroulant contextuel pour afficher des actions et des options
          dans une interface.
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
              <DropdownMenu>
                <DropdownTrigger asChild>
                  <Button variant="outline">
                    <MoreVertical className="w-4 h-4 mr-2" />
                    Actions
                  </Button>
                </DropdownTrigger>
                <DropdownContent>
                  <DropdownItem>
                    <Edit className="w-4 h-4 mr-2" />
                    Modifier
                  </DropdownItem>
                  <DropdownItem>
                    <Download className="w-4 h-4 mr-2" />
                    Télécharger
                  </DropdownItem>
                  <DropdownItem>
                    <Share className="w-4 h-4 mr-2" />
                    Partager
                  </DropdownItem>
                  <DropdownSeparator />
                  <DropdownItem className="text-red-600">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Supprimer
                  </DropdownItem>
                </DropdownContent>
              </DropdownMenu>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4 text-foreground">Code</h3>
            <CodeBlock
              language="typescript"
              filePath="components/DropdownMenuExample.tsx"
              showPackageManager={false}
            >
              {`import { 
  DropdownMenu, 
  DropdownTrigger, 
  DropdownContent, 
  DropdownItem, 
  DropdownSeparator 
} from 'cosmic-ui-mars';
import { Button } from 'cosmic-ui-mars';

<DropdownMenu>
  <DropdownTrigger asChild>
    <Button variant="outline">
      <MoreVertical className="w-4 h-4 mr-2" />
      Actions
    </Button>
  </DropdownTrigger>
  <DropdownContent>
    <DropdownItem>
      <Edit className="w-4 h-4 mr-2" />
      Modifier
    </DropdownItem>
    <DropdownItem>
      <Download className="w-4 h-4 mr-2" />
      Télécharger
    </DropdownItem>
    <DropdownSeparator />
    <DropdownItem className="text-red-600">
      <Trash2 className="w-4 h-4 mr-2" />
      Supprimer
    </DropdownItem>
  </DropdownContent>
</DropdownMenu>`}
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
                Menu avec labels
              </h3>
              <p className="text-muted-foreground">
                Menu avec des labels pour organiser les éléments.
              </p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <DropdownMenu>
                  <DropdownTrigger asChild>
                    <Button variant="outline">
                      <User className="w-4 h-4 mr-2" />
                      Profil
                    </Button>
                  </DropdownTrigger>
                  <DropdownContent>
                    <DropdownLabel>Mon compte</DropdownLabel>
                    <DropdownItem>
                      <User className="w-4 h-4 mr-2" />
                      Profil
                    </DropdownItem>
                    <DropdownItem>
                      <Settings className="w-4 h-4 mr-2" />
                      Paramètres
                    </DropdownItem>
                    <DropdownSeparator />
                    <DropdownLabel>Actions</DropdownLabel>
                    <DropdownItem>
                      <LogOut className="w-4 h-4 mr-2" />
                      Déconnexion
                    </DropdownItem>
                  </DropdownContent>
                </DropdownMenu>
              </div>
            </div>
            <div>
              <CodeBlock
                language="typescript"
                filePath="components/LabeledDropdownMenu.tsx"
                showPackageManager={false}
              >
                {`export default function App\docs\components\dropdownMenu\page.tsxExample() {
  <DropdownMenu>
  <DropdownTrigger asChild>
    <Button variant="outline">
      <User className="w-4 h-4 mr-2" />
      Profil
    </Button>
  </DropdownTrigger>
  <DropdownContent>
    <DropdownLabel>Mon compte</DropdownLabel>
    <DropdownItem>
      <User className="w-4 h-4 mr-2" />
      Profil
    </DropdownItem>
    <DropdownItem>
      <Settings className="w-4 h-4 mr-2" />
      Paramètres
    </DropdownItem>
    <DropdownSeparator />
    <DropdownLabel>Actions</DropdownLabel>
    <DropdownItem>
      <LogOut className="w-4 h-4 mr-2" />
      Déconnexion
    </DropdownItem>
  </DropdownContent>
</DropdownMenu>
}`}
              </CodeBlock>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">
                Menu avec états
              </h3>
              <p className="text-muted-foreground">
                Menu avec différents états d'éléments.
              </p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <DropdownMenu>
                  <DropdownTrigger asChild>
                    <Button variant="outline">
                      <Settings className="w-4 h-4 mr-2" />
                      Options
                    </Button>
                  </DropdownTrigger>
                  <DropdownContent>
                    <DropdownItem>Option 1</DropdownItem>
                    <DropdownItem disabled>Option désactivée</DropdownItem>
                    <DropdownItem>Option 3</DropdownItem>
                    <DropdownSeparator />
                    <DropdownItem>Option 4</DropdownItem>
                  </DropdownContent>
                </DropdownMenu>
              </div>
            </div>
            <div>
              <CodeBlock
                language="typescript"
                filePath="components/StatefulDropdownMenu.tsx"
                showPackageManager={false}
              >
                {`export default function App\docs\components\dropdownMenu\page.tsxExample() {
  <DropdownMenu>
  <DropdownTrigger asChild>
    <Button variant="outline">
      <Settings className="w-4 h-4 mr-2" />
      Options
    </Button>
  </DropdownTrigger>
  <DropdownContent>
    <DropdownItem>
      Option 1
    </DropdownItem>
    <DropdownItem disabled>
      Option désactivée
    </DropdownItem>
    <DropdownItem>
      Option 3
    </DropdownItem>
    <DropdownSeparator />
    <DropdownItem>
      Option 4
    </DropdownItem>
  </DropdownContent>
</DropdownMenu>
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
                  Composant
                </th>
                <th className="border border-border px-4 py-3 text-left font-medium text-foreground">
                  Props
                </th>
                <th className="border border-border px-4 py-3 text-left font-medium text-foreground">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">
                  DropdownMenu
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  -
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  Conteneur principal du menu
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">
                  DropdownTrigger
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  asChild
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  Élément déclencheur du menu
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">
                  DropdownContent
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  align, side
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  Contenu du menu déroulant
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">
                  DropdownItem
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  disabled, onSelect
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  Élément du menu
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">
                  DropdownSeparator
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  -
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  Séparateur entre les éléments
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">
                  DropdownLabel
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  -
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  Label pour organiser les éléments
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
              icônes
            </code>{' '}
            pour identifier rapidement les actions
          </li>
          <li>
            • Organisez les éléments avec des{' '}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              labels
            </code>{' '}
            et des séparateurs
          </li>
          <li>
            • Désactivez les éléments non disponibles avec{' '}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              disabled
            </code>
          </li>
          <li>
            • Utilisez des{' '}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              couleurs
            </code>{' '}
            pour indiquer les actions dangereuses
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
