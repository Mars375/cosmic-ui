'use client';

import React from 'react';
import { CodeBlock } from '../../components/code-block';

export default function CustomizationPage() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-foreground">
        Personnalisation
      </h1>

      <p className="text-foreground mb-8">
        CosmicUI offre une flexibilité maximale pour étendre et personnaliser
        vos composants. Créez vos propres variants, étendez les classes
        utilitaires, et développez des composants sur mesure.
      </p>

      <h2 className="text-2xl font-semibold mb-6 mt-16 text-foreground">
        Créer des composants personnalisés
      </h2>

      <p className="text-foreground mb-6">
        Étendez les composants CosmicUI pour créer vos propres variants et
        comportements personnalisés :
      </p>

      <CodeBlock
        language="typescript"
        filePath="components/custom-button.tsx"
        showPackageManager={false}
      >
        {`import { Button } from '@cosmic-ui/ui';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const customButtonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        brand: 'bg-brand-500 text-white hover:bg-brand-600',
      },
      size: {
        default: 'h-10 py-2 px-4',
        large: 'h-12 py-3 px-6 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'brand';
  size?: 'default' | 'large';
}

export function CustomButton({
  className,
  variant,
  size,
  ...props
}: CustomButtonProps) {
  return (
    <button
      className={cn(customButtonVariants({ variant, size }), className)}
      {...props}
    />
  );
}`}
      </CodeBlock>

      <h2 className="text-2xl font-semibold mb-6 mt-16 text-foreground">
        Étendre la configuration Tailwind
      </h2>

      <p className="text-foreground mb-6">
        Ajoutez vos propres couleurs, espacements et autres tokens personnalisés
        :
      </p>

      <CodeBlock
        language="typescript"
        filePath="tailwind.config.ts"
        showPackageManager={false}
      >
        {`import preset from '@cosmic-ui/tokens/tailwind.preset.cjs';

export default {
  presets: [preset],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          500: '#0ea5e9',
          900: '#0c4a6e',
        },
      },
      spacing: {
        18: '4.5rem',
        88: '22rem',
      },
      borderRadius: {
        xl: '0.75rem',
        '2xl': '1rem',
      },
    },
  },
};`}
      </CodeBlock>

      <h2 className="text-2xl font-semibold mb-6 mt-16 text-foreground">
        Wrapper de composants
      </h2>

      <p className="text-foreground mb-6">
        Créez des wrappers pour ajouter des fonctionnalités spécifiques à vos
        composants :
      </p>

      <CodeBlock
        language="typescript"
        filePath="components/button-with-loading.tsx"
        showPackageManager={false}
      >
        {`import { Button } from '@cosmic-ui/ui';
import { Loader2 } from 'lucide-react';

interface ButtonWithLoadingProps extends React.ComponentProps<typeof Button> {
  loading?: boolean;
}

export function ButtonWithLoading({
  loading,
  children,
  disabled,
  ...props
}: ButtonWithLoadingProps) {
  return (
    <Button
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      )}
      {children}
    </Button>
  );
}`}
      </CodeBlock>

      <h2 className="text-2xl font-semibold mb-6 mt-16 text-foreground">
        Personnalisation des couleurs
      </h2>

      <p className="text-foreground mb-6">
        Définissez votre propre palette de couleurs en étendant les variables
        CSS :
      </p>

      <CodeBlock
        language="css"
        filePath="globals.css"
        showPackageManager={false}
      >
        {`@layer base {
  :root {
    /* Votre palette personnalisée */
    --primary: 142 76% 36%; /* Vert */
    --secondary: 210 40% 98%; /* Gris clair */
    --accent: 210 40% 96%; /* Gris très clair */
    --destructive: 0 84% 60%; /* Rouge */
    --muted: 210 40% 96%; /* Gris très clair */
    --muted-foreground: 215.4 16.3% 46.9%; /* Gris moyen */
    --border: 214.3 31.8% 91.4%; /* Gris clair */
    --input: 214.3 31.8% 91.4%; /* Gris clair */
    --ring: 142 76% 36%; /* Vert */
    --radius: 0.75rem; /* Rayon plus arrondi */
  }

  .dark {
    /* Mode sombre personnalisé */
    --primary: 142 76% 36%; /* Vert */
    --secondary: 217.2 32.6% 17.5%; /* Gris foncé */
    --accent: 217.2 32.6% 17.5%; /* Gris foncé */
    --destructive: 0 62.8% 30.6%; /* Rouge foncé */
    --muted: 217.2 32.6% 17.5%; /* Gris foncé */
    --muted-foreground: 215 20.2% 65.1%; /* Gris moyen */
    --border: 217.2 32.6% 17.5%; /* Gris foncé */
    --input: 217.2 32.6% 17.5%; /* Gris foncé */
    --ring: 142 76% 36%; /* Vert */
  }
}`}
      </CodeBlock>

      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 mt-12">
        <h3 className="text-green-800 dark:text-green-200 font-semibold mb-2">
          🎨 Personnalisation avancée
        </h3>
        <p className="text-green-700 dark:text-green-300">
          CosmicUI est conçu pour être étendu. Créez vos propres composants,
          variants et comportements pour répondre aux besoins spécifiques de
          votre application. Utilisez les outils fournis comme base et
          adaptez-les à votre design system.
        </p>
      </div>
    </div>
  );
}
