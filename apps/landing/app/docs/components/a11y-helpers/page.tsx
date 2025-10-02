'use client';

import * as React from 'react';
import { useState } from 'react';
import { CodeBlock } from '../../../components/code-block';
import { VisuallyHidden, SkipLink } from 'cosmic-ui-mars';
import { Button } from 'cosmic-ui-mars';
import { Eye, EyeOff, SkipForward, Accessibility } from 'lucide-react';

export default function A11yHelpersPage() {
  const [showSkipLink, setShowSkipLink] = useState(false);

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Accessibility className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">A11y Helpers</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Les composants d'accessibilité (A11y) aident à rendre votre
          application accessible à tous les utilisateurs, y compris ceux qui
          utilisent des technologies d'assistance.
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
            <h3 className="text-lg font-medium text-foreground">
              VisuallyHidden
            </h3>
            <p className="text-muted-foreground">
              Masque visuellement le contenu tout en le gardant accessible aux
              lecteurs d'écran.
            </p>
            <div className="p-6 bg-muted/30 rounded-lg border">
              <div className="space-y-4">
                <VisuallyHidden>
                  Ce texte est masqué visuellement mais accessible aux lecteurs
                  d'écran
                </VisuallyHidden>
                <p className="text-sm text-muted-foreground">
                  ℹ️ Le texte ci-dessus est masqué visuellement mais présent
                  dans le DOM pour les technologies d'assistance.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const hiddenText = document.querySelector(
                      '[data-visually-hidden]'
                    );
                    if (hiddenText) {
                      alert(
                        'Texte masqué trouvé : "' + hiddenText.textContent + '"'
                      );
                    }
                  }}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Révéler le texte masqué
                </Button>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4 text-foreground">Code</h3>
            <CodeBlock
              language="typescript"
              filePath="components/VisuallyHiddenExample.tsx"
              showPackageManager={false}
            >
              {`import { VisuallyHidden } from 'cosmic-ui-mars';

export default function MyComponent() {
  return (
    <div>
      <h1>Titre visible</h1>
      <VisuallyHidden>
        Ce texte est masqué visuellement mais accessible
      </VisuallyHidden>
      <p>Contenu visible normal</p>
    </div>
  );
}`}
            </CodeBlock>
          </div>
        </div>
      </div>

      {/* SkipLink */}
      <div className="mb-12">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">SkipLink</h3>
            <p className="text-muted-foreground">
              Lien pour permettre aux utilisateurs de passer directement au
              contenu principal.
            </p>
            <div className="p-6 bg-muted/30 rounded-lg border">
              <div className="space-y-4">
                <div className="relative">
                  <SkipLink href="#main-content">
                    Passer au contenu principal
                  </SkipLink>
                  <p className="text-sm text-muted-foreground mt-2">
                    ℹ️ Le lien ci-dessus n'est visible que lors de la navigation
                    au clavier (Tab).
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSkipLink(!showSkipLink)}
                >
                  <SkipForward className="w-4 h-4 mr-2" />
                  {showSkipLink ? 'Masquer' : 'Afficher'} le SkipLink
                </Button>
                {showSkipLink && (
                  <div className="p-3 bg-primary text-primary-foreground rounded text-sm">
                    Voici à quoi ressemble le SkipLink quand il est visible
                  </div>
                )}
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4 text-foreground">Code</h3>
            <CodeBlock
              language="typescript"
              filePath="components/SkipLinkExample.tsx"
              showPackageManager={false}
            >
              {`import { SkipLink } from 'cosmic-ui-mars';

export default function Layout() {
  return (
    <div>
      <SkipLink href="#main-content">
        Passer au contenu principal
      </SkipLink>
      
      <nav>
        {/* Navigation */}
      </nav>
      
      <main id="main-content">
        <h1>Contenu principal</h1>
        <p>Le contenu principal de votre page...</p>
      </main>
    </div>
  );
}`}
            </CodeBlock>
          </div>
        </div>
      </div>

      {/* Exemple complet */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">
          Exemple complet
        </h2>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">
              Application accessible
            </h3>
            <p className="text-muted-foreground">
              Exemple d'utilisation complète des composants d'accessibilité.
            </p>
            <div className="p-6 bg-muted/30 rounded-lg border">
              <div className="space-y-4">
                <SkipLink href="#demo-content">Aller au contenu</SkipLink>

                <nav className="flex gap-4 p-3 bg-card border rounded">
                  <VisuallyHidden>
                    <h2>Navigation principale</h2>
                  </VisuallyHidden>
                  <a href="#" className="text-primary hover:underline">
                    Accueil
                  </a>
                  <a href="#" className="text-primary hover:underline">
                    À propos
                  </a>
                  <a href="#" className="text-primary hover:underline">
                    Contact
                  </a>
                </nav>

                <main id="demo-content" className="p-3 bg-card border rounded">
                  <h1 className="text-lg font-semibold mb-2">
                    Contenu principal
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Ce contenu est accessible via le lien "Aller au contenu".
                  </p>
                </main>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4 text-foreground">Code</h3>
            <CodeBlock
              language="typescript"
              filePath="components/AccessibleApp.tsx"
              showPackageManager={false}
            >
              {`import { VisuallyHidden, SkipLink } from 'cosmic-ui-mars';

export default function AccessibleApp() {
  return (
    <div>
      {/* Lien de saut pour la navigation */}
      <SkipLink href="#main-content">
        Aller au contenu
      </SkipLink>
      
      {/* Navigation avec titre masqué pour les lecteurs d'écran */}
      <nav>
        <VisuallyHidden>
          <h2>Navigation principale</h2>
        </VisuallyHidden>
        <ul className="flex gap-4">
          <li><a href="/">Accueil</a></li>
          <li><a href="/about">À propos</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
      
      {/* Contenu principal */}
      <main id="main-content">
        <h1>Contenu principal</h1>
        <p>Ce contenu est accessible via le lien de saut.</p>
      </main>
    </div>
  );
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

        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              VisuallyHidden
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
                      children
                    </td>
                    <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                      React.ReactNode
                    </td>
                    <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                      -
                    </td>
                    <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                      Contenu à masquer visuellement
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-3 font-mono text-sm">
                      asChild
                    </td>
                    <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                      boolean
                    </td>
                    <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                      false
                    </td>
                    <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                      Rend le contenu comme enfant direct
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              SkipLink
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
                      href
                    </td>
                    <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                      string
                    </td>
                    <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                      -
                    </td>
                    <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                      ID de l'élément cible (ex: "#main-content")
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-3 font-mono text-sm">
                      children
                    </td>
                    <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                      React.ReactNode
                    </td>
                    <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                      -
                    </td>
                    <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                      Texte du lien
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
        </div>
      </div>

      {/* Conseils d'utilisation */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <h3 className="text-blue-800 dark:text-blue-200 font-semibold mb-2">
          💡 Conseils d'accessibilité
        </h3>
        <ul className="text-blue-700 dark:text-blue-300 space-y-1 text-sm">
          <li>
            • Utilisez{' '}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              SkipLink
            </code>{' '}
            en début de page pour la navigation au clavier
          </li>
          <li>
            •{' '}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              VisuallyHidden
            </code>{' '}
            est parfait pour les titres de sections destinés aux lecteurs
            d'écran
          </li>
          <li>
            • Testez toujours avec un{' '}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              lecteur d'écran
            </code>{' '}
            (NVDA, JAWS, VoiceOver)
          </li>
          <li>
            • Assurez-vous que tous les éléments interactifs sont{' '}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              accessibles au clavier
            </code>
          </li>
          <li>
            • Respectez les{' '}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              guidelines WCAG 2.1
            </code>{' '}
            niveau AA minimum
          </li>
        </ul>
      </div>
    </div>
  );
}
