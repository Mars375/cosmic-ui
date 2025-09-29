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

      <CodeBlock fileName="tailwind.config.ts" language="typescript">
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">1</div>
          <div className="flex-1">
            <span style={{ color: '#6A737D' }}>// tailwind.config.ts</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">2</div>
          <div className="flex-1">
            <span className="keyword">import</span> preset{' '}
            <span className="keyword">from</span>{' '}
            <span className="string">
              '@cosmic-ui/tokens/tailwind.preset.cjs'
            </span>
            ;
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">3</div>
          <div className="flex-1">
            <span className="keyword">import</span> type <span>&#123;</span>{' '}
            Config <span>&#125;</span> <span className="keyword">from</span>{' '}
            <span className="string">'tailwindcss'</span>;
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">4</div>
          <div className="flex-1"></div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">5</div>
          <div className="flex-1">
            <span className="keyword">const</span> config: Config{' '}
            <span>= &#123;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">6</div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;content: </span>
            <span>&#91;</span>
            <span className="string">
              './src/**/*.&#123;js,ts,jsx,tsx&#125;'
            </span>
            <span>&#93;</span>,
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">7</div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;presets: </span>
            <span>&#91;</span>preset
            <span>&#93;</span>,
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">8</div>
          <div className="flex-1">
            <span>&#125;</span>;
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">9</div>
          <div className="flex-1"></div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            10
          </div>
          <div className="flex-1">
            <span className="keyword">export default</span> config;
          </div>
        </div>
      </CodeBlock>

      <h2 className="text-2xl font-semibold mb-6 text-foreground">
        Configuration avancée
      </h2>

      <p className="text-foreground mb-6">
        Pour personnaliser davantage votre configuration :
      </p>

      <CodeBlock fileName="tailwind.config.ts" language="typescript">
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">1</div>
          <div className="flex-1">
            <span className="keyword">import</span> preset{' '}
            <span className="keyword">from</span>{' '}
            <span className="string">
              '@cosmic-ui/tokens/tailwind.preset.cjs'
            </span>
            ;
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">2</div>
          <div className="flex-1">
            <span className="keyword">import</span> type <span>&#123;</span>{' '}
            Config <span>&#125;</span> <span className="keyword">from</span>{' '}
            <span className="string">'tailwindcss'</span>;
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">3</div>
          <div className="flex-1"></div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">4</div>
          <div className="flex-1">
            <span className="keyword">const</span> config: Config{' '}
            <span>= &#123;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">5</div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;content: </span>
            <span>&#91;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">6</div>
          <div className="flex-1">
            <span className="string">
              &nbsp;&nbsp;&nbsp;&nbsp;'./src/**/*.&#123;js,ts,jsx,tsx&#125;'
            </span>
            ,
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">7</div>
          <div className="flex-1">
            <span className="string">
              &nbsp;&nbsp;&nbsp;&nbsp;'./app/**/*.&#123;js,ts,jsx,tsx&#125;'
            </span>
            ,
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">8</div>
          <div className="flex-1">
            <span className="string">
              &nbsp;&nbsp;&nbsp;&nbsp;'./components/**/*.&#123;js,ts,jsx,tsx&#125;'
            </span>
            ,
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">9</div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&#93;</span>,
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            10
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;presets: </span>
            <span>&#91;</span>preset
            <span>&#93;</span>,
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            11
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;theme: </span>
            <span>&#123;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            12
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;extend: </span>
            <span>&#123;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            13
          </div>
          <div className="flex-1">
            <span style={{ color: '#6A737D' }}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Ajouter vos couleurs
              personnalisées
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            14
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;colors: </span>
            <span>&#123;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            15
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;brand: </span>
            <span>&#123;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            16
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;50:{' '}
            </span>
            <span className="string">'#faf5ff'</span>,
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            17
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;500:{' '}
            </span>
            <span className="string">'#8b5cf6'</span>,
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            18
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;900:{' '}
            </span>
            <span className="string">'#581c87'</span>,
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            19
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;</span>,
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            20
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;</span>,
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            21
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&#125;</span>,
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            22
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;plugins: </span>
            <span>&#91;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            23
          </div>
          <div className="flex-1">
            <span style={{ color: '#6A737D' }}>
              &nbsp;&nbsp;&nbsp;&nbsp;// Ajouter des plugins supplémentaires
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            24
          </div>
          <div className="flex-1">
            <span className="keyword">&nbsp;&nbsp;&nbsp;&nbsp;require</span>(
            <span className="string">'@tailwindcss/forms'</span>),
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            25
          </div>
          <div className="flex-1">
            <span className="keyword">&nbsp;&nbsp;&nbsp;&nbsp;require</span>(
            <span className="string">'@tailwindcss/typography'</span>
            ),
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            26
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&#93;</span>,
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            27
          </div>
          <div className="flex-1">
            <span>&#125;</span>;
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            28
          </div>
          <div className="flex-1"></div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            29
          </div>
          <div className="flex-1">
            <span className="keyword">export default</span> config;
          </div>
        </div>
      </CodeBlock>

      <h2 className="text-2xl font-semibold mb-6 text-foreground">
        Optimisation pour la production
      </h2>

      <h3 className="text-xl font-semibold mb-4 text-foreground">Purge CSS</h3>
      <p className="text-foreground mb-6">
        Pour optimiser la taille de votre bundle final :
      </p>

      <CodeBlock fileName="tailwind.config.ts" language="typescript">
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">1</div>
          <div className="flex-1">
            <span className="keyword">export default</span> <span>&#123;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">2</div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;content: </span>
            <span>&#91;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">3</div>
          <div className="flex-1">
            <span className="string">
              &nbsp;&nbsp;&nbsp;&nbsp;'./src/**/*.&#123;js,ts,jsx,tsx&#125;'
            </span>
            ,
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">4</div>
          <div className="flex-1">
            <span style={{ color: '#6A737D' }}>
              &nbsp;&nbsp;&nbsp;&nbsp;// Inclure explicitement les composants
              CosmicUI utilisés
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">5</div>
          <div className="flex-1">
            <span className="string">
              &nbsp;&nbsp;&nbsp;&nbsp;'./node_modules/@cosmic-ui/ui/dist/**/*.&#123;js,ts&#125;'
            </span>
            ,
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">6</div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&#93;</span>,
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">7</div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;presets: </span>
            <span>&#91;</span>preset
            <span>&#93;</span>,
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">8</div>
          <div className="flex-1">
            <span>&#125;</span>;
          </div>
        </div>
      </CodeBlock>

      <h3 className="text-xl font-semibold mb-4 text-foreground">
        Variables CSS dynamiques
      </h3>

      <p className="text-foreground mb-6">
        Pour changer les couleurs à l'exécution, définissez vos variables CSS :
      </p>

      <CodeBlock fileName="globals.css" language="css">
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">1</div>
          <div className="flex-1">
            <span style={{ color: '#6A737D' }}>// globals.css</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">2</div>
          <div className="flex-1">
            <span>:root &#123;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">3</div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;--background: </span>
            <span className="string">0 0% 100%</span>;
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">4</div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;--foreground: </span>
            <span className="string">222.2 84% 4.9%</span>;
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">5</div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;--primary: </span>
            <span className="string">262.1 83.3% 57.8%</span>;
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">6</div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;--muted: </span>
            <span className="string">210 40% 98%</span>;
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">7</div>
          <div className="flex-1">
            <span>&#125;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">8</div>
          <div className="flex-1"></div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">9</div>
          <div className="flex-1">
            <span>.dark &#123;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            10
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;--background: </span>
            <span className="string">222.2 84% 4.9%</span>;
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            11
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;--foreground: </span>
            <span className="string">210 40% 98%</span>;
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            12
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;--primary: </span>
            <span className="string">263.4 70% 50.4%</span>;
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            13
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;--muted: </span>
            <span className="string">217.2 32.6% 17.5%</span>;
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            14
          </div>
          <div className="flex-1">
            <span>&#125;</span>
          </div>
        </div>
      </CodeBlock>

      <h2 className="text-2xl font-semibold mb-6 text-foreground">
        Intégration avec les frameworks
      </h2>

      <h3 className="text-xl font-semibold mb-4 text-foreground">Next.js</h3>
      <CodeBlock fileName="next.config.js" language="javascript">
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">1</div>
          <div className="flex-1">
            <span style={{ color: '#6A737D' }}>// next.config.js</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">2</div>
          <div className="flex-1">
            <span className="keyword">const</span> <span>&#123;</span> addPlugin{' '}
            <span>&#125;</span> = <span className="keyword">require</span>(
            <span className="string">'tailwindcss/plugin'</span>);
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">3</div>
          <div className="flex-1"></div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">4</div>
          <div className="flex-1">
            <span className="keyword">module.exports</span> ={' '}
            <span>&#123;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">5</div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;experimental: </span>
            <span>&#123;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">6</div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;optimizeCss: </span>
            <span className="keyword">true</span>,{' '}
            <span style={{ color: '#6A737D' }}>// Pour l'optimisation CSS</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">7</div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&#125;</span>,
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">8</div>
          <div className="flex-1">
            <span>&#125;</span>;
          </div>
        </div>
      </CodeBlock>

      <h3 className="text-xl font-semibold mb-4 text-foreground">Vite</h3>
      <CodeBlock fileName="vite.config.ts" language="typescript">
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">1</div>
          <div className="flex-1">
            <span style={{ color: '#6A737D' }}>// vite.config.ts</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">2</div>
          <div className="flex-1">
            <span className="keyword">import</span> <span>&#123;</span>{' '}
            defineConfig <span>&#125;</span>{' '}
            <span className="keyword">from</span>{' '}
            <span className="string">'vite'</span>;
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">3</div>
          <div className="flex-1">
            <span className="keyword">import</span> tailwindcss{' '}
            <span className="keyword">from</span>{' '}
            <span className="string">'@tailwindcss/vite'</span>;
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">4</div>
          <div className="flex-1"></div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">5</div>
          <div className="flex-1">
            <span className="keyword">export default</span> defineConfig(
            <span>&#123;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">6</div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;plugins: </span>
            <span>&#91;</span>tailwindcss()
            <span>&#93;</span>,
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">7</div>
          <div className="flex-1">
            <span>&#125;</span>);
          </div>
        </div>
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
