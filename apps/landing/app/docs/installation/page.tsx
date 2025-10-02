'use client';

import { CodeBlock } from '../../components/code-block';

export default function InstallationPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-foreground">Installation</h1>

      <p className="text-foreground mb-8">
        Suivez ce guide pour installer et configurer CosmicUI dans votre projet
        React.
      </p>

      <h2 className="text-2xl font-semibold mb-6 mt-16 text-foreground">
        1. Installation des dépendances
      </h2>

      <CodeBlock filePath="package.json">
        pnpm add @cosmic-ui/ui @cosmic-ui/tokens tailwind-merge
        class-variance-authority
      </CodeBlock>

      <h2 className="text-2xl font-semibold mb-6 mt-16 text-foreground">
        2. Configuration Tailwind CSS
      </h2>

      <p className="text-foreground mb-8">
        Ajoutez le preset CosmicUI à votre configuration Tailwind :
      </p>

      <CodeBlock
        showPackageManager={false}
        language="typescript"
        filePath="tailwind.config.ts"
      >
        {`import preset from '@cosmic-ui/tokens/tailwind.preset.cjs'

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  presets: [preset],
}`}
      </CodeBlock>

      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <p className="text-blue-800 dark:text-blue-200 text-sm">
          <strong>💡 Astuce :</strong> Le preset CosmicUI inclut toutes les
          couleurs, espacements et autres tokens nécessaires. Vous pouvez
          étendre cette configuration selon vos besoins.
        </p>
      </div>

      <h2 className="text-2xl font-semibold mb-6 mt-16 text-foreground">
        3. Configuration Next.js (optionnel)
      </h2>

      <p className="text-foreground mb-8">
        Si vous utilisez Next.js, configurez le transpilation des packages :
      </p>

      <CodeBlock
        showPackageManager={false}
        language="typescript"
        filePath="next.config.ts"
      >
        {`/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@cosmic-ui/ui',
    '@cosmic-ui/tokens'
  ],
}

module.exports = nextConfig`}
      </CodeBlock>

      <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
        <p className="text-amber-800 dark:text-amber-200 text-sm">
          <strong>⚠️ Important :</strong> Cette configuration est nécessaire
          pour que Next.js puisse transpiler les packages CosmicUI. Sans cela,
          vous pourriez rencontrer des erreurs de compilation.
        </p>
      </div>

      <h2 className="text-2xl font-semibold mb-6 mt-16 text-foreground">
        4. Premier composant
      </h2>

      <p className="text-foreground mb-6">
        Testez votre installation avec un composant simple :
      </p>

      <CodeBlock
        showPackageManager={false}
        language="typescript"
        filePath="components/Example.tsx"
      >
        {`import { Button, Card, Input } from '@cosmic-ui/ui'

export function Example() {
  return (
    <Card className="p-6 max-w-md">
      <h3 className="text-lg font-semibold mb-4">Mon premier composant</h3>
      <Input
        placeholder="Entrez votre texte"
        className="mb-4"
      />
      <Button variant="outline">
        Valider
      </Button>
    </Card>
  )
}`}
      </CodeBlock>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 mt-12">
        <div className="flex items-start">
          <span className="text-2xl mr-3">💡</span>
          <div>
            <h3 className="font-semibold text-foreground mb-2">Astuce</h3>
            <p className="text-foreground">
              Assurez-vous que votre projet utilise Tailwind CSS v3.4+ pour une
              compatibilité optimale.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
