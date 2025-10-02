'use client';

import * as React from 'react';
import { CodeBlock } from '../../../components/code-block';

export default function CodeBlockPage() {
  return (
    <div>
      <div className="mb-12">
        <h1 className="text-5xl font-bold mb-6 text-foreground">CodeBlock</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl">
          Composant de bloc de code interactif avec sélecteur de gestionnaire de
          paquets, bouton de copie et adaptation au thème.
        </p>
      </div>

      <div className="space-y-8">
        {/* Exemple basique */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-foreground">
            Exemple basique
          </h2>
          <CodeBlock filePath="package.json">
            pnpm add cosmic-ui-mars @cosmic-ui/tokens tailwind-merge
            class-variance-authority
          </CodeBlock>
        </div>

        {/* Exemple avec npm */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-foreground">
            Avec npm par défaut
          </h2>
          <CodeBlock packageManager="npm" filePath="package.json">
            npm install cosmic-ui-mars @cosmic-ui/tokens tailwind-merge
            class-variance-authority
          </CodeBlock>
        </div>

        {/* Exemple sans sélecteur de package manager */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-foreground">
            Sans sélecteur de package manager
          </h2>
          <CodeBlock showPackageManager={false} filePath="scripts/setup.sh">
            git clone https://github.com/your-org/cosmic-ui.git
          </CodeBlock>
        </div>

        {/* Exemple avec commande complexe */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-foreground">
            Commande complexe
          </h2>
          <CodeBlock filePath="package.json">
            pnpm add cosmic-ui-mars @cosmic-ui/tokens && pnpm add -D tailwindcss
            postcss autoprefixer
          </CodeBlock>
        </div>

        {/* Exemple avec yarn */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-foreground">
            Avec yarn par défaut
          </h2>
          <CodeBlock packageManager="yarn" filePath="package.json">
            yarn add cosmic-ui-mars @cosmic-ui/tokens tailwind-merge
            class-variance-authority
          </CodeBlock>
        </div>
      </div>

      {/* Props */}
      <div className="border-t border-border pt-12 mt-12">
        <h2 className="text-3xl font-bold mb-8 text-foreground">Props</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground">
                  Prop
                </th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">
                  Type
                </th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">
                  Défaut
                </th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-border/50">
                <td className="py-3 px-4 font-mono text-primary">children</td>
                <td className="py-3 px-4 text-muted-foreground">string</td>
                <td className="py-3 px-4 text-muted-foreground">-</td>
                <td className="py-3 px-4 text-muted-foreground">
                  Le code à afficher
                </td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4 font-mono text-primary">language</td>
                <td className="py-3 px-4 text-muted-foreground">string</td>
                <td className="py-3 px-4 text-muted-foreground">'bash'</td>
                <td className="py-3 px-4 text-muted-foreground">
                  Langage du code (pour la coloration syntaxique)
                </td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4 font-mono text-primary">
                  packageManager
                </td>
                <td className="py-3 px-4 text-muted-foreground">
                  'pnpm' | 'npm' | 'yarn'
                </td>
                <td className="py-3 px-4 text-muted-foreground">'pnpm'</td>
                <td className="py-3 px-4 text-muted-foreground">
                  Gestionnaire de paquets par défaut
                </td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4 font-mono text-primary">
                  showPackageManager
                </td>
                <td className="py-3 px-4 text-muted-foreground">boolean</td>
                <td className="py-3 px-4 text-muted-foreground">true</td>
                <td className="py-3 px-4 text-muted-foreground">
                  Afficher le sélecteur de gestionnaire de paquets
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Utilisation */}
      <div className="border-t border-border pt-12 mt-12">
        <h2 className="text-3xl font-bold mb-8 text-foreground">Utilisation</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-foreground">
              Import
            </h3>
            <CodeBlock showPackageManager={false}>
              {`import { CodeBlock } from '@/components/code-block';`}
            </CodeBlock>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 text-foreground">
              Exemple d'utilisation
            </h3>
            <CodeBlock showPackageManager={false}>
              {`<CodeBlock packageManager="pnpm">
  pnpm add cosmic-ui-mars @cosmic-ui/tokens
</CodeBlock>`}
            </CodeBlock>
          </div>
        </div>
      </div>
    </div>
  );
}
