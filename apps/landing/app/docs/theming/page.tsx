'use client';

import { CodeBlock } from '../../components/code-block';

export default function ThemingPage() {
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
          <h1 className="text-4xl font-bold text-foreground">Theming</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl">
          CosmicUI utilise un système de thème basé sur des variables CSS pour
          une personnalisation complète et cohérente. Le système supporte les
          modes clair et sombre avec une transition fluide.
        </p>
      </div>

      <h2 className="text-2xl font-semibold mb-6 mt-16 text-foreground">
        Structure du thème
      </h2>

      <p className="text-foreground mb-6">
        Le thème est défini par des variables CSS HSL dans le fichier
        globals.css :
      </p>

      <CodeBlock language="css" filePath="globals.css">
        {`@layer base {
  :root {
    --background: 0 0% 100%; /* Blanc */
    --foreground: 222.2 84% 4.9%; /* Noir */
    --primary: 221.2 83.2% 53.3%; /* Bleu */
    --card: 0 0% 100%; /* Blanc */
    --border: 214.3 31.8% 91.4%; /* Gris clair */
    --muted: 210 40% 98%; /* Gris très clair */
    --muted-foreground: 215.4 16.3% 46.9%; /* Gris moyen */
    --radius: 0.5rem; /* Rayon de bordure */
  }

  .dark {
    --background: 222.2 84% 4.9%; /* Noir */
    --foreground: 210 40% 98%; /* Blanc */
    --primary: 217.2 91.2% 59.8%; /* Bleu clair */
    --card: 222.2 84% 4.9%; /* Noir */
    --border: 217.2 32.6% 17.5%; /* Gris foncé */
    --muted: 217.2 32.6% 17.5%; /* Gris foncé */
    --muted-foreground: 215 20.2% 65.1%; /* Gris moyen */
  }
}`}
      </CodeBlock>

      <h2 className="text-2xl font-semibold mb-6 mt-16 text-foreground">
        Variables CSS disponibles
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-foreground">
            Couleurs principales
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <code className="bg-muted px-2 py-1 rounded">--background</code> -
              Arrière-plan principal
            </li>
            <li>
              <code className="bg-muted px-2 py-1 rounded">--foreground</code> -
              Texte principal
            </li>
            <li>
              <code className="bg-muted px-2 py-1 rounded">--primary</code> -
              Couleur primaire
            </li>
            <li>
              <code className="bg-muted px-2 py-1 rounded">--card</code> -
              Arrière-plan des cartes
            </li>
            <li>
              <code className="bg-muted px-2 py-1 rounded">--border</code> -
              Couleur des bordures
            </li>
          </ul>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-foreground">
            Couleurs secondaires
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <code className="bg-muted px-2 py-1 rounded">--muted</code> -
              Arrière-plan discret
            </li>
            <li>
              <code className="bg-muted px-2 py-1 rounded">
                --muted-foreground
              </code>{' '}
              - Texte discret
            </li>
            <li>
              <code className="bg-muted px-2 py-1 rounded">--popover</code> -
              Arrière-plan des popovers
            </li>
            <li>
              <code className="bg-muted px-2 py-1 rounded">--input</code> -
              Couleur des inputs
            </li>
            <li>
              <code className="bg-muted px-2 py-1 rounded">--radius</code> -
              Rayon de bordure
            </li>
          </ul>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-6 mt-16 text-foreground">
        Utilisation dans les composants
      </h2>

      <p className="text-foreground mb-6">
        Les composants CosmicUI utilisent ces variables via les classes Tailwind
        CSS :
      </p>

      <CodeBlock language="typescript" filePath="components/button.tsx">
        {`import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      }
    }
  }
);`}
      </CodeBlock>

      <h2 className="text-2xl font-semibold mb-6 mt-16 text-foreground">
        Personnalisation
      </h2>

      <p className="text-foreground mb-6">
        Pour personnaliser le thème, modifiez les variables CSS dans votre
        fichier globals.css :
      </p>

      <CodeBlock language="css" filePath="globals.css">
        {`@layer base {
  :root {
              /* Votre palette personnalisée */
    --primary: 142 76% 36%; /* Vert */
    --secondary: 210 40% 98%; /* Gris clair */
    --accent: 210 40% 96%; /* Gris très clair */
    --destructive: 0 84% 60%; /* Rouge */
    --radius: 0.75rem; /* Rayon plus arrondi */
  }
}`}
      </CodeBlock>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mt-12">
        <h3 className="text-blue-800 dark:text-blue-200 font-semibold mb-2">
          💡 Conseil
        </h3>
        <p className="text-blue-700 dark:text-blue-300">
          Utilisez des outils comme{' '}
          <a href="https://uicolors.app/create" className="underline">
            uicolors.app
          </a>{' '}
          pour générer des palettes de couleurs cohérentes en format HSL.
        </p>
      </div>
    </div>
  );
}
