'use client';

import { CodeBlock } from '../../components/code-block';

export default function TailwindConfigPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-foreground">
        Configuration Tailwind
      </h1>

      <p className="text-foreground mb-8">
        Guide détaillé pour configurer Tailwind CSS avec CosmicUI et optimiser
        votre environnement de développement.
      </p>

      <h2 className="text-2xl font-semibold mb-6 text-foreground">
        Structure du preset
      </h2>

      <p className="text-foreground mb-6">
        Le preset CosmicUI inclut automatiquement :
      </p>

      <ul className="space-y-3 text-foreground mb-8">
        <li className="text-muted-foreground">
          <strong className="text-foreground">Variables de couleurs</strong> :
          Système de tokens cohérent
        </li>
        <li className="text-muted-foreground">
          <strong className="text-foreground">Utilitaires</strong> : Classes CSS
          optimisées
        </li>
        <li className="text-muted-foreground">
          <strong className="text-foreground">Plugins</strong> : Animations et
          transitions
        </li>
        <li className="text-muted-foreground">
          <strong className="text-foreground">Responsive</strong> : Breakpoints
          par défaut
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-6 text-foreground">
        Configuration minimale
      </h2>

      <CodeBlock
        showPackageManager={false}
        language="typescript"
        filePath="components/Example.tsx"
      >
        {`// tailwind.config.ts
import preset from '@cosmic-ui/tokens/tailwind.preset.cjs'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  presets: [preset],
}

export default config`}
      </CodeBlock>

      <h2 className="text-2xl font-semibold mb-6 text-foreground">
        Configuration avancée
      </h2>

      <p className="text-foreground mb-6">
        Pour personnaliser davantage votre configuration :
      </p>

      <CodeBlock
        showPackageManager={false}
        language="typescript"
        filePath="components/Example.tsx"
      >
        {`import preset from '@cosmic-ui/tokens/tailwind.preset.cjs'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  presets: [preset],
  theme: {
    extend: {
      // Ajouter vos couleurs personnalisées
      colors: {
        brand: {
          50: '#faf5ff',
          500: '#8b5cf6',
          900: '#581c87',
        },
      },
    },
  },
  plugins: [
    // Ajouter des plugins supplémentaires
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}

export default config`}
      </CodeBlock>

      <h2 className="text-2xl font-semibold mb-6 text-foreground">
        Optimisation pour la production
      </h2>

      <h3 className="text-xl font-semibold mb-4 text-foreground">Purge CSS</h3>
      <p className="text-foreground mb-6">
        Pour optimiser la taille de votre bundle final :
      </p>

      <CodeBlock
        showPackageManager={false}
        language="typescript"
        filePath="lib/utils.ts"
      >
        {`export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    // Inclure explicitement les composants CosmicUI utilisés
    './node_modules/@cosmic-ui/ui/dist/**/*.{js,ts}',
  ],
  presets: [preset],
}`}
      </CodeBlock>

      <h3 className="text-xl font-semibold mb-4 text-foreground">
        Variables CSS dynamiques
      </h3>

      <p className="text-foreground mb-6">
        Pour changer les couleurs à l'exécution, définissez vos variables CSS :
      </p>

      <CodeBlock
        showPackageManager={false}
        language="css"
        filePath="globals.css"
      >
        {`// globals.css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 262.1 83.3% 57.8%;
  --muted: 210 40% 98%;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 263.4 70% 50.4%;
  --muted: 217.2 32.6% 17.5%;
}`}
      </CodeBlock>

      <h2 className="text-2xl font-semibold mb-6 text-foreground">
        Intégration avec les frameworks
      </h2>

      <h3 className="text-xl font-semibold mb-4 text-foreground">Next.js</h3>
      <CodeBlock
        showPackageManager={false}
        language="typescript"
        filePath="components/Component.tsx"
      >
        {`// next.config.ts
import { addPlugin } from 'tailwindcss/plugin'

export default {
  experimental: {
    optimizeCss: true, // Pour l'optimisation CSS
  },
}`}
      </CodeBlock>

      <h3 className="text-xl font-semibold mb-4 text-foreground">Vite</h3>
      <CodeBlock
        showPackageManager={false}
        language="typescript"
        filePath="lib/utils.ts"
      >
        {`// vite.config.ts
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss()],
})`}
      </CodeBlock>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mt-12">
        <h3 className="text-blue-800 dark:text-blue-200 font-semibold mb-2">
          ⚡ Performance
        </h3>
        <p className="text-blue-700 dark:text-blue-300">
          Utilisez le preset CosmicUI tel quel pour les performances optimales.
          Les styles sont pré-optimisés pour éviter les conflits et la
          redondance.
        </p>
      </div>
    </div>
  );
}
