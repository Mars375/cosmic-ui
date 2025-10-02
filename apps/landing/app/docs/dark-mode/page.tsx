'use client';

import React from 'react';
import { CodeBlock } from '../../components/code-block';

export default function DarkModePage() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-foreground">Mode Sombre</h1>

      <p className="text-foreground mb-8">
        CosmicUI supporte nativement le mode sombre grâce à l'intégration avec{' '}
        <code className="bg-muted px-2 py-1 rounded">next-themes</code>. Le
        système de thème s'adapte automatiquement aux préférences de
        l'utilisateur et permet un basculement fluide entre les modes clair et
        sombre.
      </p>

      <h2 className="text-2xl font-semibold mb-6 text-foreground">
        Installation
      </h2>

      <p className="text-foreground mb-6">
        Le mode sombre est déjà configuré dans CosmicUI. Assurez-vous d'avoir
        installé les dépendances nécessaires :
      </p>

      <CodeBlock filePath="package.json">pnpm add next-themes</CodeBlock>

      <h2 className="text-2xl font-semibold mb-6 text-foreground">
        Configuration du Provider
      </h2>

      <p className="text-foreground mb-6">
        Enveloppez votre application avec le ThemeProvider dans votre layout
        principal :
      </p>

      <CodeBlock
        language="typescript"
        filePath="app/layout.tsx"
        showPackageManager={false}
      >
        {`import { ThemeProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}`}
      </CodeBlock>

      <h2 className="text-2xl font-semibold mb-6 text-foreground">
        Utilisation du Hook useTheme
      </h2>

      <p className="text-foreground mb-6">
        Utilisez le hook{' '}
        <code className="bg-muted px-2 py-1 rounded">useTheme</code>
        pour accéder et contrôler le thème actuel :
      </p>

      <CodeBlock
        language="typescript"
        filePath="components/theme-switcher.tsx"
        showPackageManager={false}
      >
        {`'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { Button } from 'cosmic-ui-mars';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Basculer le thème</span>
    </Button>
  );
}`}
      </CodeBlock>

      <h2 className="text-2xl font-semibold mb-6 text-foreground">
        Variables CSS pour le Mode Sombre
      </h2>

      <p className="text-foreground mb-6">
        CosmicUI utilise des variables CSS pour gérer les couleurs en mode
        sombre. Voici les principales variables disponibles :
      </p>

      <CodeBlock
        language="css"
        filePath="globals.css"
        showPackageManager={false}
      >
        {`@layer base {
  :root {
    /* Mode clair */
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96%;
    --secondary-foreground: 222.2 84% 4.9%;
    --muted: 210 40% 96%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96%;
    --accent-foreground: 222.2 84% 4.9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    --radius: 0.5rem;
  }

  .dark {
    /* Mode sombre */
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 84% 4.9%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 224.3 76.3% 94.1%;
  }
}`}
      </CodeBlock>

      <h2 className="text-2xl font-semibold mb-6 text-foreground">
        Composants avec Support du Mode Sombre
      </h2>

      <p className="text-foreground mb-6">
        Tous les composants CosmicUI supportent automatiquement le mode sombre
        grâce aux variables CSS. Voici quelques exemples :
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-foreground">
            Boutons
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Les boutons s'adaptent automatiquement au thème
          </p>
          <div className="space-y-2">
            <div className="bg-primary text-primary-foreground px-3 py-2 rounded text-sm">
              Bouton primaire
            </div>
            <div className="bg-secondary text-secondary-foreground px-3 py-2 rounded text-sm">
              Bouton secondaire
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Cartes</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Les cartes utilisent les couleurs de thème
          </p>
          <div className="bg-muted p-3 rounded text-sm text-muted-foreground">
            Contenu de carte
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-6 text-foreground">
        Personnalisation
      </h2>

      <p className="text-foreground mb-6">
        Vous pouvez personnaliser les couleurs du mode sombre en modifiant les
        variables CSS dans votre fichier globals.css :
      </p>

      <CodeBlock
        language="css"
        filePath="globals.css"
        showPackageManager={false}
      >
        {`@layer base {
  .dark {
    /* Personnalisation du mode sombre */
    --background: 222.2 84% 4.9%; /* Fond plus sombre */
    --foreground: 210 40% 98%; /* Texte plus clair */
    --primary: 142 76% 36%; /* Couleur primaire verte */
    --secondary: 217.2 32.6% 17.5%; /* Couleur secondaire */
    --accent: 280 100% 70%; /* Couleur d'accent violette */
    --border: 217.2 32.6% 17.5%; /* Bordures */
    --muted: 217.2 32.6% 17.5%; /* Éléments discrets */
  }
}`}
      </CodeBlock>

      <h2 className="text-2xl font-semibold mb-6 text-foreground">
        Détection Automatique
      </h2>

      <p className="text-foreground mb-6">
        Le système détecte automatiquement les préférences de l'utilisateur et
        applique le thème approprié. Vous pouvez forcer un thème spécifique :
      </p>

      <CodeBlock
        language="typescript"
        filePath="components/theme-example.tsx"
        showPackageManager={false}
      >
        {`'use client';

import { useTheme } from 'next-themes';

export function ThemeExample() {
  const { theme, setTheme, systemTheme } = useTheme();

  return (
    <div className="space-y-4">
      <p>Thème actuel : {theme}</p>
      <p>Thème système : {systemTheme}</p>
      
      <div className="flex gap-2">
        <button onClick={() => setTheme('light')}>
          Mode clair
        </button>
        <button onClick={() => setTheme('dark')}>
          Mode sombre
        </button>
        <button onClick={() => setTheme('system')}>
          Système
        </button>
      </div>
    </div>
  );
}`}
      </CodeBlock>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mt-12">
        <h3 className="text-blue-800 dark:text-blue-200 font-semibold mb-2">
          💡 Conseil
        </h3>
        <p className="text-blue-700 dark:text-blue-300">
          Utilisez{' '}
          <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">
            suppressHydrationWarning
          </code>{' '}
          sur l'élément HTML pour éviter les avertissements d'hydratation lors
          du changement de thème.
        </p>
      </div>
    </div>
  );
}
