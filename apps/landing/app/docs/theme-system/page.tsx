'use client';

import * as React from 'react';
import { useState } from 'react';
import { Button, Card, Badge, Input, Switch } from 'cosmic-ui-mars';
import { CodeBlock } from '../../components/code-block';

function ThemeDemo() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Appliquer le mode sombre au document
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Contrôles du thème</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Switch
              id="dark-mode"
              label="Mode sombre"
              checked={darkMode}
              onCheckedChange={toggleDarkMode}
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Aperçu des composants</h3>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <Button>Bouton primaire</Button>
            <Button variant="secondary">Secondaire</Button>
            <Button variant="outline">Contour</Button>
            <Button variant="ghost">Ghost</Button>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge>Défaut</Badge>
            <Badge variant="secondary">Secondaire</Badge>
            <Badge variant="success">Succès</Badge>
            <Badge variant="warning">Attention</Badge>
            <Badge variant="destructive">Erreur</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder="Champ de saisie" />
            <Input placeholder="Champ avec valeur" defaultValue="Exemple" />
          </div>

          <Card className="p-4">
            <h4 className="font-medium mb-2">Carte imbriquée</h4>
            <p className="text-muted-foreground text-sm">
              Cette carte hérite automatiquement des couleurs du thème.
            </p>
          </Card>
        </div>
      </Card>
    </div>
  );
}

export default function ThemeSystemPage() {
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
                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-foreground">
            Système de thèmes
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl">
          CosmicUI utilise un système de thèmes adaptatif qui s'ajuste
          automatiquement aux couleurs de votre application. Tous les composants
          héritent des couleurs du thème sans configuration supplémentaire.
        </p>
      </div>

      {/* Installation */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">
          Installation
        </h2>
        <CodeBlock filePath="package.json">pnpm add cosmic-ui-mars</CodeBlock>
      </div>

      {/* Couleurs par défaut */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">
          Couleurs par défaut
        </h2>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">
              Tokens adaptatifs
            </h3>
            <p className="text-muted-foreground">
              Tous les composants utilisent des tokens CSS qui s'adaptent
              automatiquement au thème de votre application. Pas besoin de
              configuration supplémentaire !
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-primary rounded"></div>
                <span className="text-sm">
                  <code>bg-primary</code> - Couleur principale
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-secondary rounded"></div>
                <span className="text-sm">
                  <code>bg-secondary</code> - Couleur secondaire
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-muted rounded"></div>
                <span className="text-sm">
                  <code>bg-muted</code> - Couleur atténuée
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-card border border-border rounded"></div>
                <span className="text-sm">
                  <code>bg-card</code> - Arrière-plan des cartes
                </span>
              </div>
            </div>
          </div>
          <div>
            <CodeBlock
              language="typescript"
              filePath="components/MyComponent.tsx"
              showPackageManager={false}
            >
              {`import { Button, Card } from 'cosmic-ui-mars';

// Les composants héritent automatiquement des couleurs
export default function MyComponent() {
  return (
    <Card className="p-6">
      <h2 className="text-foreground">Titre</h2>
      <p className="text-muted-foreground">Description</p>
      <Button>Action</Button>
    </Card>
  );
}`}
            </CodeBlock>
          </div>
        </div>
      </div>

      {/* Démo interactive */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">
          Démo interactive
        </h2>
        <ThemeDemo />
      </div>

      {/* Variables CSS */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">
          Variables CSS disponibles
        </h2>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">
              Couleurs principales
            </h3>
            <p className="text-muted-foreground">
              Ces variables CSS sont automatiquement appliquées à tous les
              composants.
            </p>
          </div>
          <div>
            <CodeBlock
              language="css"
              filePath="globals.css"
              showPackageManager={false}
            >
              {`:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96%;
  --secondary-foreground: 222.2 84% 4.9%;
  --muted: 210 40% 96%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --card: 222.2 84% 4.9%;
  --card-foreground: 210 40% 98%;
  /* ... autres variables pour le mode sombre */
}`}
            </CodeBlock>
          </div>
        </div>
      </div>

      {/* Personnalisation */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">
          Personnalisation
        </h2>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">
              Override des couleurs
            </h3>
            <p className="text-muted-foreground">
              Vous pouvez facilement personnaliser les couleurs en redéfinissant
              les variables CSS.
            </p>
          </div>
          <div>
            <CodeBlock
              language="css"
              filePath="globals.css"
              showPackageManager={false}
            >
              {`:root {
  /* Personnaliser la couleur primaire */
  --primary: 142 76% 36%; /* Vert */
  --primary-foreground: 355 7% 97%;
  
  /* Personnaliser la couleur secondaire */
  --secondary: 260 84% 54%; /* Violet */
  --secondary-foreground: 210 40% 98%;
  
  /* Personnaliser les cartes */
  --card: 0 0% 98%;
  --card-foreground: 240 10% 3.9%;
}`}
            </CodeBlock>
          </div>
        </div>
      </div>

      {/* Conseils */}
      <div className="mb-12">
        <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-blue-900 dark:text-blue-100">
            💡 Conseils d'utilisation
          </h3>
          <ul className="text-blue-700 dark:text-blue-300 space-y-1 text-sm">
            <li>
              • Les composants héritent automatiquement des couleurs du thème
            </li>
            <li>
              • Utilisez les tokens CSS (
              <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
                bg-primary
              </code>
              ,{' '}
              <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
                text-foreground
              </code>
              ) pour une cohérence parfaite
            </li>
            <li>
              • Tous les composants supportent le mode sombre automatiquement
            </li>
            <li>
              • Vous pouvez override les couleurs par défaut avec des classes
              Tailwind personnalisées
            </li>
            <li>
              • Les variables CSS utilisent le format HSL pour une meilleure
              flexibilité
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
