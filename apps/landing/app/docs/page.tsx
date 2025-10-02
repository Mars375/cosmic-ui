'use client';

import Link from 'next/link';
import { Button } from '@cosmic-ui/ui';
import { CodeBlock } from '../../../components/code-block';

export default function DocsPage() {
  return (
    <div>
      <div className="mb-12">
        <h1 className="text-5xl font-bold mb-6 text-foreground">
          Bienvenue dans CosmicUI
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl">
          Une bibliothèque de composants React moderne et accessible, construite
          avec Tailwind CSS et TypeScript. CosmicUI vous offre tous les
          composants essentiels pour créer des interfaces utilisateur
          exceptionnelles.
        </p>
        <div className="flex gap-4">
          <Link href="/docs/installation">
            <Button>Commencer</Button>
          </Link>
          <Link href="/docs/components">
            <Button variant="outline">Voir les composants</Button>
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="p-6 border border-border rounded-lg bg-card">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
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
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2 text-foreground">
            Installation rapide
          </h3>
          <p className="text-muted-foreground mb-4">
            Installez CosmicUI en quelques commandes et commencez à construire
            immédiatement.
          </p>
          <Link
            href="/docs/installation"
            className="text-primary hover:underline text-sm font-medium"
          >
            Guide d'installation →
          </Link>
        </div>

        <div className="p-6 border border-border rounded-lg bg-card">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
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
          <h3 className="text-lg font-semibold mb-2 text-foreground">
            Composants riches
          </h3>
          <p className="text-muted-foreground mb-4">
            Plus de 60 composants prêts à l'emploi, de Button à DataTable en
            passant par les graphiques.
          </p>
          <Link
            href="/docs/components"
            className="text-primary hover:underline text-sm font-medium"
          >
            Explorer les composants →
          </Link>
        </div>

        <div className="p-6 border border-border rounded-lg bg-card">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
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
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2 text-foreground">
            Thème personnalisable
          </h3>
          <p className="text-muted-foreground mb-4">
            Système de thème flexible avec support du mode sombre et
            personnalisation complète.
          </p>
          <Link
            href="/docs/theming"
            className="text-primary hover:underline text-sm font-medium"
          >
            Personnaliser le thème →
          </Link>
        </div>
      </div>

      <div className="border-t border-border pt-12">
        <h2 className="text-3xl font-bold mb-8 text-foreground">
          Fonctionnalités principales
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-foreground">
              🚀 Performance optimisée
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Composants légers et performants</li>
              <li>• Tree-shaking automatique</li>
              <li>• Optimisé pour Next.js et React</li>
              <li>• Support SSR complet</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-foreground">
              ♿ Accessibilité intégrée
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Conforme aux standards WCAG 2.1</li>
              <li>• Support clavier complet</li>
              <li>• Compatible lecteurs d'écran</li>
              <li>• Focus management intelligent</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-foreground">
              🎨 Design system cohérent
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Tokens de design unifiés</li>
              <li>• Espacement et typographie cohérents</li>
              <li>• Palette de couleurs harmonieuse</li>
              <li>• Composants modulaires</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-foreground">
              🔧 Développeur-friendly
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• TypeScript natif</li>
              <li>• IntelliSense complet</li>
              <li>• Documentation interactive</li>
              <li>• Exemples de code copiables</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-12 mt-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-foreground">
            Prêt à commencer ?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Installez CosmicUI et créez votre première interface en quelques
            minutes. Notre documentation vous guide à chaque étape.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/docs/installation">
              <Button size="lg">Installation</Button>
            </Link>
            <Link href="/docs/components">
              <Button variant="outline" size="lg">
                Voir tous les composants
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
