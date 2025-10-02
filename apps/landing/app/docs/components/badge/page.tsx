'use client';

import * as React from 'react';
import { useState } from 'react';
import { Badge } from 'cosmic-ui-mars';
import { CodeBlock } from '../../../components/code-block';
import { Button } from 'cosmic-ui-mars';
import {
  X,
  Check,
  AlertCircle,
  Info,
  Star,
  Heart,
  ShoppingCart,
} from 'lucide-react';

export default function BadgePage() {
  const [notifications, setNotifications] = useState(5);
  const [likes, setLikes] = useState(42);
  const [cartItems, setCartItems] = useState(3);

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
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-foreground">Badge</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Un composant badge pour afficher des étiquettes, des compteurs et des
          statuts. Parfait pour les notifications, les catégories et les
          indicateurs visuels.
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
            <div className="flex flex-wrap gap-3">
              <Badge>Défaut</Badge>
              <Badge variant="secondary">Secondaire</Badge>
              <Badge variant="success">Succès</Badge>
              <Badge variant="warning">Attention</Badge>
              <Badge variant="destructive">Erreur</Badge>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4 text-foreground">Code</h3>
            <CodeBlock
              language="typescript"
              filePath="components/BadgeExample.tsx"
              showPackageManager={false}
            >
              {`import { Badge } from 'cosmic-ui-mars';

<div className="flex flex-wrap gap-3">
  <Badge>Défaut</Badge>
  <Badge variant="secondary">Secondaire</Badge>
  <Badge variant="success">Succès</Badge>
  <Badge variant="warning">Attention</Badge>
  <Badge variant="destructive">Erreur</Badge>
</div>`}
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
          {/* Default */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Default</h3>
              <p className="text-muted-foreground">
                Le variant par défaut pour les badges standards.
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge>Nouveau</Badge>
                <Badge>Populaire</Badge>
                <Badge>Recommandé</Badge>
              </div>
            </div>
            <div>
              <CodeBlock
                language="typescript"
                filePath="components/DefaultBadge.tsx"
                showPackageManager={false}
              >
                {`export default function BadgeExample() {
  <div className="flex flex-wrap gap-3">
  <Badge>Nouveau</Badge>
  <Badge>Populaire</Badge>
  <Badge>Recommandé</Badge>
</div>
}`}
              </CodeBlock>
            </div>
          </div>

          {/* Secondary */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Secondary</h3>
              <p className="text-muted-foreground">
                Pour les badges secondaires moins importants.
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary">Brouillon</Badge>
                <Badge variant="secondary">En attente</Badge>
                <Badge variant="secondary">Archivé</Badge>
              </div>
            </div>
            <div>
              <CodeBlock
                language="typescript"
                filePath="components/SecondaryBadge.tsx"
                showPackageManager={false}
              >
                {`export default function BadgeExample() {
  <div className="flex flex-wrap gap-3">
  <Badge variant="secondary">Brouillon</Badge>
  <Badge variant="secondary">En attente</Badge>
  <Badge variant="secondary">Archivé</Badge>
</div>
}`}
              </CodeBlock>
            </div>
          </div>

          {/* Outline */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Outline</h3>
              <p className="text-muted-foreground">
                Badge avec bordure pour un style plus discret.
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary">React</Badge>
                <Badge variant="secondary">TypeScript</Badge>
                <Badge variant="secondary">Next.js</Badge>
              </div>
            </div>
            <div>
              <CodeBlock
                language="typescript"
                filePath="components/OutlineBadge.tsx"
                showPackageManager={false}
              >
                {`export default function BadgeExample() {
  <div className="flex flex-wrap gap-3">
  <Badge variant="secondary">React</Badge>
  <Badge variant="secondary">TypeScript</Badge>
  <Badge variant="secondary">Next.js</Badge>
</div>
}`}
              </CodeBlock>
            </div>
          </div>

          {/* Destructive */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">
                Destructive
              </h3>
              <p className="text-muted-foreground">
                Pour les statuts d'erreur ou d'alerte.
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge variant="destructive">Erreur</Badge>
                <Badge variant="destructive">Expiré</Badge>
                <Badge variant="destructive">Bloqué</Badge>
              </div>
            </div>
            <div>
              <CodeBlock
                language="typescript"
                filePath="components/DestructiveBadge.tsx"
                showPackageManager={false}
              >
                {`export default function BadgeExample() {
  <div className="flex flex-wrap gap-3">
  <Badge variant="destructive">Erreur</Badge>
  <Badge variant="destructive">Expiré</Badge>
  <Badge variant="destructive">Bloqué</Badge>
</div>
}`}
              </CodeBlock>
            </div>
          </div>
        </div>
      </div>

      {/* Avec icônes */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">
          Avec icônes
        </h2>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Exemples</h3>
            <p className="text-muted-foreground">
              Badges avec icônes pour améliorer la compréhension.
            </p>
            <div className="flex flex-wrap gap-3">
              <Badge>
                <Check className="w-3 h-3 mr-1" />
                Succès
              </Badge>
              <Badge variant="secondary">
                <Info className="w-3 h-3 mr-1" />
                Information
              </Badge>
              <Badge variant="destructive">
                <AlertCircle className="w-3 h-3 mr-1" />
                Attention
              </Badge>
              <Badge variant="secondary">
                <Star className="w-3 h-3 mr-1" />
                Premium
              </Badge>
            </div>
          </div>
          <div>
            <CodeBlock
              language="typescript"
              filePath="components/BadgeWithIcons.tsx"
              showPackageManager={false}
            >
              {`import { Check, Info, AlertCircle, Star } from 'lucide-react';

<div className="flex flex-wrap gap-3">
  <Badge>
    <Check className="w-3 h-3 mr-1" />
    Succès
  </Badge>
  <Badge variant="secondary">
    <Info className="w-3 h-3 mr-1" />
    Information
  </Badge>
  <Badge variant="destructive">
    <AlertCircle className="w-3 h-3 mr-1" />
    Attention
  </Badge>
  <Badge variant="secondary">
    <Star className="w-3 h-3 mr-1" />
    Premium
  </Badge>
</div>`}
            </CodeBlock>
          </div>
        </div>
      </div>

      {/* Compteurs */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">
          Compteurs
        </h2>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Exemples</h3>
            <p className="text-muted-foreground">
              Badges utilisés comme compteurs pour les notifications et actions.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  Notifications
                </span>
                <Badge variant="destructive">{notifications}</Badge>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setNotifications(notifications + 1)}
                >
                  +
                </Button>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Likes</span>
                <Badge variant="secondary">
                  <Heart className="w-3 h-3 mr-1" />
                  {likes}
                </Badge>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setLikes(likes + 1)}
                >
                  +
                </Button>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Panier</span>
                <Badge>
                  <ShoppingCart className="w-3 h-3 mr-1" />
                  {cartItems}
                </Badge>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setCartItems(cartItems + 1)}
                >
                  +
                </Button>
              </div>
            </div>
          </div>
          <div>
            <CodeBlock
              language="typescript"
              filePath="components/BadgeCounters.tsx"
              showPackageManager={false}
            >
              {`export default function BadgeExample() {
  const [notifications, setNotifications] = useState(5);
const [likes, setLikes] = useState(42);
const [cartItems, setCartItems] = useState(3);

<div className="space-y-4">
  <div className="flex items-center gap-3">
    <span className="text-sm text-muted-foreground">Notifications</span>
    <Badge variant="destructive">{notifications}</Badge>
    <Button 
      variant="secondary" 
      size="sm"
      onClick={() => setNotifications(notifications + 1)}
    >
      +
    </Button>
  </div>
  <div className="flex items-center gap-3">
    <span className="text-sm text-muted-foreground">Likes</span>
    <Badge variant="secondary">
      <Heart className="w-3 h-3 mr-1" />
      {likes}
    </Badge>
    <Button 
      variant="secondary" 
      size="sm"
      onClick={() => setLikes(likes + 1)}
    >
      +
    </Button>
  </div>
</div>
}`}
            </CodeBlock>
          </div>
        </div>
      </div>

      {/* Badges supprimables */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">
          Badges supprimables
        </h2>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Exemple</h3>
            <p className="text-muted-foreground">
              Badges avec bouton de suppression pour les filtres et tags.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="pr-1">
                React
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 ml-1 hover:bg-transparent"
                >
                  <X className="w-3 h-3" />
                </Button>
              </Badge>
              <Badge variant="secondary" className="pr-1">
                TypeScript
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 ml-1 hover:bg-transparent"
                >
                  <X className="w-3 h-3" />
                </Button>
              </Badge>
              <Badge variant="secondary" className="pr-1">
                Frontend
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 ml-1 hover:bg-transparent"
                >
                  <X className="w-3 h-3" />
                </Button>
              </Badge>
            </div>
          </div>
          <div>
            <CodeBlock
              language="typescript"
              filePath="components/RemovableBadge.tsx"
              showPackageManager={false}
            >
              {`import { X } from 'lucide-react';

<div className="flex flex-wrap gap-2">
  <Badge variant="secondary" className="pr-1">
    React
    <Button
      variant="ghost"
      size="sm"
      className="h-auto p-0 ml-1 hover:bg-transparent"
    >
      <X className="w-3 h-3" />
    </Button>
  </Badge>
  <Badge variant="secondary" className="pr-1">
    TypeScript
    <Button
      variant="ghost"
      size="sm"
      className="h-auto p-0 ml-1 hover:bg-transparent"
    >
      <X className="w-3 h-3" />
    </Button>
  </Badge>
</div>`}
            </CodeBlock>
          </div>
        </div>
      </div>

      {/* Statuts */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Statuts</h2>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Exemples</h3>
            <p className="text-muted-foreground">
              Badges pour afficher différents statuts d'état.
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <span className="text-sm">Commande #1234</span>
                <Badge>Livré</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <span className="text-sm">Commande #1235</span>
                <Badge variant="secondary">En cours</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <span className="text-sm">Commande #1236</span>
                <Badge variant="secondary">En attente</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <span className="text-sm">Commande #1237</span>
                <Badge variant="destructive">Annulé</Badge>
              </div>
            </div>
          </div>
          <div>
            <CodeBlock
              language="typescript"
              filePath="components/StatusBadges.tsx"
              showPackageManager={false}
            >
              {`export default function BadgeExample() {
  <div className="space-y-3">
  <div className="flex items-center justify-between p-3 border rounded-lg">
    <span className="text-sm">Commande #1234</span>
    <Badge>Livré</Badge>
  </div>
  <div className="flex items-center justify-between p-3 border rounded-lg">
    <span className="text-sm">Commande #1235</span>
    <Badge variant="secondary">En cours</Badge>
  </div>
  <div className="flex items-center justify-between p-3 border rounded-lg">
    <span className="text-sm">Commande #1236</span>
    <Badge variant="secondary">En attente</Badge>
  </div>
  <div className="flex items-center justify-between p-3 border rounded-lg">
    <span className="text-sm">Commande #1237</span>
    <Badge variant="destructive">Annulé</Badge>
  </div>
</div>
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
                  'default' | 'secondary' | 'outline' | 'destructive'
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  'default'
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  Style visuel du badge
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
            pour les statuts positifs
          </li>
          <li>
            • Le variant{' '}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              destructive
            </code>{' '}
            pour les erreurs et alertes
          </li>
          <li>
            • Ajoutez des{' '}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              icônes
            </code>{' '}
            pour améliorer la compréhension
          </li>
          <li>
            • Utilisez des{' '}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              compteurs
            </code>{' '}
            pour les notifications
          </li>
          <li>
            • Rendez les badges{' '}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              supprimables
            </code>{' '}
            pour les filtres
          </li>
        </ul>
      </div>
    </div>
  );
}
