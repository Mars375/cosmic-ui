'use client';

import * as React from 'react';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from 'cosmic-ui-mars';
import { CodeBlock } from '../../../components/code-block';
import { Button } from 'cosmic-ui-mars';
import {
  Heart,
  Share2,
  MoreHorizontal,
  Calendar,
  User,
  Tag,
} from 'lucide-react';

export default function CardPage() {
  const [liked, setLiked] = useState(false);
  const [shareCount, setShareCount] = useState(42);

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
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-foreground">Card</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Un composant carte flexible pour organiser et afficher du contenu.
          Parfait pour les articles, profils, statistiques et bien plus encore.
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
            <Card className="w-full max-w-sm">
              <CardHeader>
                <CardTitle>Titre de la carte</CardTitle>
                <CardDescription>Description de la carte</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Contenu de la carte. Vous pouvez y mettre n'importe quel
                  contenu.
                </p>
              </CardContent>
              <CardFooter>
                <Button>Action</Button>
              </CardFooter>
            </Card>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4 text-foreground">Code</h3>
            <CodeBlock
              language="typescript"
              filePath="components/CardExample.tsx"
              showPackageManager={false}
            >
              {`import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from 'cosmic-ui-mars';
import { Button } from 'cosmic-ui-mars';

<Card className="w-full max-w-sm">
  <CardHeader>
    <CardTitle>Titre de la carte</CardTitle>
    <CardDescription>Description de la carte</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-sm text-muted-foreground">
      Contenu de la carte. Vous pouvez y mettre n'importe quel contenu.
    </p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>`}
            </CodeBlock>
          </div>
        </div>
      </div>

      {/* Types de cartes */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">
          Types de cartes
        </h2>
        <div className="space-y-8">
          {/* Carte simple */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">
                Carte simple
              </h3>
              <p className="text-muted-foreground">
                Carte basique avec juste le contenu.
              </p>
              <Card className="w-full max-w-sm">
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">
                    Une carte simple sans header ni footer.
                  </p>
                </CardContent>
              </Card>
            </div>
            <div>
              <CodeBlock
                language="typescript"
                filePath="components/SimpleCard.tsx"
                showPackageManager={false}
              >
                {`export default function App\docs\components\card\page.tsxExample() {
  <Card className="w-full max-w-sm">
  <CardContent className="pt-6">
    <p className="text-sm text-muted-foreground">
      Une carte simple sans header ni footer.
    </p>
  </CardContent>
</Card>
}`}
              </CodeBlock>
            </div>
          </div>

          {/* Carte avec image */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">
                Carte avec image
              </h3>
              <p className="text-muted-foreground">
                Carte avec image en en-tête.
              </p>
              <Card className="w-full max-w-sm overflow-hidden">
                <div className="h-32 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-medium">Image</span>
                </div>
                <CardHeader>
                  <CardTitle>Carte avec image</CardTitle>
                  <CardDescription>
                    Description de la carte avec image
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Cette carte inclut une image en en-tête.
                  </p>
                </CardContent>
              </Card>
            </div>
            <div>
              <CodeBlock
                language="typescript"
                filePath="components/CardWithImage.tsx"
                showPackageManager={false}
              >
                {`export default function App\docs\components\card\page.tsxExample() {
  <Card className="w-full max-w-sm overflow-hidden">
  <div className="h-32 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
    <span className="text-white font-medium">Image</span>
  </div>
  <CardHeader>
    <CardTitle>Carte avec image</CardTitle>
    <CardDescription>Description de la carte avec image</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-sm text-muted-foreground">
      Cette carte inclut une image en en-tête.
    </p>
  </CardContent>
</Card>
}`}
              </CodeBlock>
            </div>
          </div>

          {/* Carte interactive */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">
                Carte interactive
              </h3>
              <p className="text-muted-foreground">
                Carte avec interactions et états.
              </p>
              <Card className="w-full max-w-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Article</CardTitle>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                  <CardDescription>Un article intéressant</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Contenu de l'article avec des interactions possibles.
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>12 Jan</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>Auteur</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setLiked(!liked)}
                  >
                    <Heart
                      className={`export default function App\docs\components\card\page.tsxExample() {
  w-4 h-4 mr-1 ${liked ? 'fill-red-500 text-red-500' : ''}
}`}
                    />
                    {liked ? '12' : '11'}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShareCount(shareCount + 1)}
                  >
                    <Share2 className="w-4 h-4 mr-1" />
                    {shareCount}
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <div>
              <CodeBlock
                language="typescript"
                filePath="components/InteractiveCard.tsx"
                showPackageManager={false}
              >
                {`const [liked, setLiked] = useState(false);
const [shareCount, setShareCount] = useState(42);

<Card className="w-full max-w-sm">
  <CardHeader>
    <div className="flex items-center justify-between">
      <CardTitle className="text-lg">Article</CardTitle>
      <Button variant="ghost" size="sm">
        <MoreHorizontal className="w-4 h-4" />
      </Button>
    </div>
    <CardDescription>Un article intéressant</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-sm text-muted-foreground mb-4">
      Contenu de l'article avec des interactions possibles.
    </p>
    <div className="flex items-center gap-4 text-xs text-muted-foreground">
      <div className="flex items-center gap-1">
        <Calendar className="w-3 h-3" />
        <span>12 Jan</span>
      </div>
      <div className="flex items-center gap-1">
        <User className="w-3 h-3" />
        <span>Auteur</span>
      </div>
    </div>
  </CardContent>
  <CardFooter className="flex items-center justify-between">
    <Button 
      variant="ghost" 
      size="sm"
      onClick={() => setLiked(!liked)}
    >
      <Heart className={\`w-4 h-4 mr-1 \${liked ? 'fill-red-500 text-red-500' : ''}\`} />
      {liked ? '12' : '11'}
    </Button>
    <Button 
      variant="ghost" 
      size="sm"
      onClick={() => setShareCount(shareCount + 1)}
    >
      <Share2 className="w-4 h-4 mr-1" />
      {shareCount}
    </Button>
  </CardFooter>
</Card>`}
              </CodeBlock>
            </div>
          </div>
        </div>
      </div>

      {/* Grille de cartes */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">
          Grille de cartes
        </h2>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Exemple</h3>
            <p className="text-muted-foreground">
              Organisez plusieurs cartes dans une grille responsive.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <CardTitle className="text-sm">Statut</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">24</p>
                  <p className="text-xs text-muted-foreground">
                    Utilisateurs actifs
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <CardTitle className="text-sm">Ventes</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">1,234</p>
                  <p className="text-xs text-muted-foreground">Ce mois</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <CardTitle className="text-sm">Revenus</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">€12,345</p>
                  <p className="text-xs text-muted-foreground">Total</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <CardTitle className="text-sm">Conversion</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">3.2%</p>
                  <p className="text-xs text-muted-foreground">Taux</p>
                </CardContent>
              </Card>
            </div>
          </div>
          <div>
            <CodeBlock
              language="typescript"
              filePath="components/CardGrid.tsx"
              showPackageManager={false}
            >
              {`export default function App\docs\components\card\page.tsxExample() {
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <Card>
    <CardHeader className="pb-3">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <CardTitle className="text-sm">Statut</CardTitle>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-2xl font-bold">24</p>
      <p className="text-xs text-muted-foreground">Utilisateurs actifs</p>
    </CardContent>
  </Card>
  {/* ... autres cartes */}
</div>
}`}
            </CodeBlock>
          </div>
        </div>
      </div>

      {/* Carte de profil */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">
          Carte de profil
        </h2>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Exemple</h3>
            <p className="text-muted-foreground">
              Carte de profil utilisateur avec avatar et informations.
            </p>
            <Card className="w-full max-w-sm">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">JD</span>
                </div>
                <CardTitle>John Doe</CardTitle>
                <CardDescription>Développeur Full Stack</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <Tag className="w-4 h-4" />
                    <span>React, TypeScript, Node.js</span>
                  </div>
                  <p className="text-muted-foreground">
                    Passionné par le développement web et les nouvelles
                    technologies.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button className="flex-1">Suivre</Button>
                <Button variant="outline" className="flex-1">
                  Message
                </Button>
              </CardFooter>
            </Card>
          </div>
          <div>
            <CodeBlock
              language="typescript"
              filePath="components/ProfileCard.tsx"
              showPackageManager={false}
            >
              {`export default function App\docs\components\card\page.tsxExample() {
  <Card className="w-full max-w-sm">
  <CardHeader className="text-center">
    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
      <span className="text-white font-bold text-xl">JD</span>
    </div>
    <CardTitle>John Doe</CardTitle>
    <CardDescription>Développeur Full Stack</CardDescription>
  </CardHeader>
  <CardContent className="text-center">
    <div className="space-y-2 text-sm">
      <div className="flex items-center justify-center gap-2 text-muted-foreground">
        <Tag className="w-4 h-4" />
        <span>React, TypeScript, Node.js</span>
      </div>
      <p className="text-muted-foreground">
        Passionné par le développement web et les nouvelles technologies.
      </p>
    </div>
  </CardContent>
  <CardFooter className="flex gap-2">
    <Button className="flex-1">Suivre</Button>
    <Button variant="outline" className="flex-1">Message</Button>
  </CardFooter>
</Card>
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
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4 text-foreground">Card</h3>
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

          <div>
            <h3 className="text-lg font-medium mb-4 text-foreground">
              CardHeader, CardContent, CardFooter
            </h3>
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

          <div>
            <h3 className="text-lg font-medium mb-4 text-foreground">
              CardTitle, CardDescription
            </h3>
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
        </div>
      </div>

      {/* Conseils d'utilisation */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <h3 className="text-blue-800 dark:text-blue-200 font-semibold mb-2">
          💡 Conseils d'utilisation
        </h3>
        <ul className="text-blue-700 dark:text-blue-300 space-y-1 text-sm">
          <li>
            • Utilisez{' '}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              CardHeader
            </code>{' '}
            pour le titre et la description
          </li>
          <li>
            •{' '}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              CardContent
            </code>{' '}
            contient le contenu principal
          </li>
          <li>
            •{' '}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              CardFooter
            </code>{' '}
            est idéal pour les actions
          </li>
          <li>
            • Organisez les cartes en grille pour une meilleure lisibilité
          </li>
          <li>
            • Ajoutez des états interactifs pour améliorer l'expérience
            utilisateur
          </li>
        </ul>
      </div>
    </div>
  );
}
