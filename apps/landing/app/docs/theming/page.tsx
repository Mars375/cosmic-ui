'use client';

import { useState } from 'react';

const CodeBlock = ({
  children,
  fileName,
  language = 'bash',
}: {
  children: React.ReactNode;
  fileName?: string;
  language?: string;
}) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      const textContent =
        typeof children === 'string'
          ? children
          : Array.isArray(children)
            ? children.join('')
            : String(children);
      await navigator.clipboard.writeText(textContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const isTerminal = fileName === 'Terminal';

  return (
    <div className="relative mb-6">
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="flex items-center gap-2 border-b px-3 py-1">
          <div className="bg-foreground flex size-4 items-center justify-center rounded-[1px] opacity-70">
            {isTerminal ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-terminal text-code size-3"
              >
                <polyline points="4 17 10 11 4 5"></polyline>
                <line x1="12" x2="20" y1="19" y2="19"></line>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="fill-foreground w-4 h-4"
              >
                <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"></path>
              </svg>
            )}
          </div>
          <span className="text-muted-foreground text-sm">{fileName}</span>
          <button
            onClick={copyToClipboard}
            className="text-gray-500 hover:text-gray-700 transition-colors ml-auto"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {copied ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              )}
            </svg>
          </button>
        </div>
        <div className="px-4 py-3.5 bg-white dark:bg-black">
          <pre className="font-mono text-sm leading-relaxed">
            <code>{children}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default function ThemingPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-foreground">Theming</h1>

      <p className="text-foreground mb-8">
        CosmicUI utilise un système de thème basé sur des variables CSS pour une
        personnalisation complète et cohérente. Le système supporte les modes
        clair et sombre avec une transition fluide.
      </p>

      <h2 className="text-2xl font-semibold mb-6 text-foreground">
        Structure du thème
      </h2>

      <p className="text-foreground mb-6">
        Le thème est défini par des variables CSS HSL dans le fichier
        globals.css :
      </p>

      <CodeBlock fileName="globals.css" language="css">
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">1</div>
          <div className="flex-1">
            <span className="keyword">@layer</span> base <span>&#123;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">2</div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;:root <span>&#123;</span>
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">3</div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;--background: </span>
            <span className="string">0 0% 100%</span>;{' '}
            <span style={{ color: '#6A737D' }}>/* Blanc */</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">4</div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;--foreground: </span>
            <span className="string">222.2 84% 4.9%</span>;{' '}
            <span style={{ color: '#6A737D' }}>/* Noir */</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">5</div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;--primary: </span>
            <span className="string">221.2 83.2% 53.3%</span>;{' '}
            <span style={{ color: '#6A737D' }}>/* Bleu */</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">6</div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;--card: </span>
            <span className="string">0 0% 100%</span>;{' '}
            <span style={{ color: '#6A737D' }}>/* Blanc */</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">7</div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;--border: </span>
            <span className="string">214.3 31.8% 91.4%</span>;{' '}
            <span style={{ color: '#6A737D' }}>/* Gris clair */</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">8</div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;--muted: </span>
            <span className="string">210 40% 98%</span>;{' '}
            <span style={{ color: '#6A737D' }}>/* Gris très clair */</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">9</div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;--muted-foreground: </span>
            <span className="string">215.4 16.3% 46.9%</span>;{' '}
            <span style={{ color: '#6A737D' }}>/* Gris moyen */</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            10
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;--radius: </span>
            <span className="string">0.5rem</span>;{' '}
            <span style={{ color: '#6A737D' }}>/* Rayon de bordure */</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            11
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;<span>&#125;</span>
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            12
          </div>
          <div className="flex-1"></div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            13
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;.dark <span>&#123;</span>
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            14
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;--background: </span>
            <span className="string">222.2 84% 4.9%</span>;{' '}
            <span style={{ color: '#6A737D' }}>/* Noir */</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            15
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;--foreground: </span>
            <span className="string">210 40% 98%</span>;{' '}
            <span style={{ color: '#6A737D' }}>/* Blanc */</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            16
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;--primary: </span>
            <span className="string">217.2 91.2% 59.8%</span>;{' '}
            <span style={{ color: '#6A737D' }}>/* Bleu clair */</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            17
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;--card: </span>
            <span className="string">222.2 84% 4.9%</span>;{' '}
            <span style={{ color: '#6A737D' }}>/* Noir */</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            18
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;--border: </span>
            <span className="string">217.2 32.6% 17.5%</span>;{' '}
            <span style={{ color: '#6A737D' }}>/* Gris foncé */</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            19
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;--muted: </span>
            <span className="string">217.2 32.6% 17.5%</span>;{' '}
            <span style={{ color: '#6A737D' }}>/* Gris foncé */</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            20
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;--muted-foreground: </span>
            <span className="string">215 20.2% 65.1%</span>;{' '}
            <span style={{ color: '#6A737D' }}>/* Gris moyen */</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            21
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;<span>&#125;</span>
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            22
          </div>
          <div className="flex-1">
            <span>
              <span>&#125;</span>
            </span>
          </div>
        </div>
      </CodeBlock>

      <h2 className="text-2xl font-semibold mb-6 text-foreground">
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

      <h2 className="text-2xl font-semibold mb-6 text-foreground">
        Utilisation dans les composants
      </h2>

      <p className="text-foreground mb-6">
        Les composants CosmicUI utilisent ces variables via les classes Tailwind
        CSS :
      </p>

      <CodeBlock fileName="components/button.tsx" language="typescript">
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">1</div>
          <div className="flex-1">
            <span className="keyword">import</span> <span>&#123;</span> cva,{' '}
            <span className="keyword">type</span> VariantProps{' '}
            <span>&#125;</span> <span className="keyword">from</span>{' '}
            <span className="string">'class-variance-authority'</span>;
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">2</div>
          <div className="flex-1">
            <span className="keyword">import</span> <span>&#123;</span> cn{' '}
            <span>&#125;</span> <span className="keyword">from</span>{' '}
            <span className="string">'@/lib/utils'</span>;
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">3</div>
          <div className="flex-1"></div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">4</div>
          <div className="flex-1">
            <span className="keyword">const</span> buttonVariants ={' '}
            <span className="function">cva</span>(
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">5</div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;</span>
            <span className="string">
              "inline-flex items-center justify-center rounded-md text-sm
              font-medium"
            </span>
            ,
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">6</div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&#123;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">7</div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;variants: <span>&#123;</span>
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">8</div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;variant: <span>&#123;</span>
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">9</div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;default:{' '}
            </span>
            <span className="string">
              "bg-primary text-primary-foreground hover:bg-primary/90"
            </span>
            ,
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            10
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;destructive:{' '}
            </span>
            <span className="string">
              "bg-destructive text-destructive-foreground
              hover:bg-destructive/90"
            </span>
            ,
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            11
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;outline:{' '}
            </span>
            <span className="string">
              "border border-input bg-background hover:bg-accent"
            </span>
            ,
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            12
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;secondary:{' '}
            </span>
            <span className="string">
              "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            </span>
            ,
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            13
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ghost: </span>
            <span className="string">
              "hover:bg-accent hover:text-accent-foreground"
            </span>
            ,
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            14
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;link: </span>
            <span className="string">
              "text-primary underline-offset-4 hover:underline"
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            15
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&#125;</span>
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            16
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;<span>&#125;</span>
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            17
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;<span>&#125;</span>
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            18
          </div>
          <div className="flex-1">
            <span>);</span>
          </div>
        </div>
      </CodeBlock>

      <h2 className="text-2xl font-semibold mb-6 text-foreground">
        Personnalisation
      </h2>

      <p className="text-foreground mb-6">
        Pour personnaliser le thème, modifiez les variables CSS dans votre
        fichier globals.css :
      </p>

      <CodeBlock fileName="globals.css" language="css">
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">1</div>
          <div className="flex-1">
            <span className="keyword">@layer</span> base <span>&#123;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">2</div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;:root <span>&#123;</span>
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">3</div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span style={{ color: '#6A737D' }}>
              /* Votre palette personnalisée */
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">4</div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;--primary: </span>
            <span className="string">142 76% 36%</span>;{' '}
            <span style={{ color: '#6A737D' }}>/* Vert */</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">5</div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;--secondary: </span>
            <span className="string">210 40% 98%</span>;{' '}
            <span style={{ color: '#6A737D' }}>/* Gris clair */</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">6</div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;--accent: </span>
            <span className="string">210 40% 96%</span>;{' '}
            <span style={{ color: '#6A737D' }}>/* Gris très clair */</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">7</div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;--destructive: </span>
            <span className="string">0 84% 60%</span>;{' '}
            <span style={{ color: '#6A737D' }}>/* Rouge */</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">8</div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;--radius: </span>
            <span className="string">0.75rem</span>;{' '}
            <span style={{ color: '#6A737D' }}>/* Rayon plus arrondi */</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">9</div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;<span>&#125;</span>
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            10
          </div>
          <div className="flex-1">
            <span>
              <span>&#125;</span>
            </span>
          </div>
        </div>
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
