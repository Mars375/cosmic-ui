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

export default function InstallationPage() {
  const [packageManager, setPackageManager] = useState('pnpm');

  const installCommands = {
    pnpm: 'pnpm add @cosmic-ui/ui @cosmic-ui/tokens tailwind-merge class-variance-authority',
    npm: 'npm install @cosmic-ui/ui @cosmic-ui/tokens tailwind-merge class-variance-authority',
    yarn: 'yarn add @cosmic-ui/ui @cosmic-ui/tokens tailwind-merge class-variance-authority',
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-foreground">Installation</h1>

      <p className="text-foreground mb-8">
        Suivez ce guide pour installer et configurer CosmicUI dans votre projet
        React.
      </p>

      <h2 className="text-2xl font-semibold mb-6 text-foreground">
        1. Installation des dépendances
      </h2>

      <div className="relative mb-6">
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="flex items-center gap-2 border-b px-3 py-1">
            <div className="bg-foreground flex size-4 items-center justify-center rounded-[1px] opacity-70">
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
            </div>
            <div className="text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-none p-0">
              <button
                className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 h-7 border border-transparent pt-0.5 ${
                  packageManager === 'pnpm'
                    ? 'bg-accent border-input shadow-none'
                    : 'data-[state=active]:bg-accent data-[state=active]:border-input data-[state=active]:shadow-none'
                }`}
                onClick={() => setPackageManager('pnpm')}
              >
                pnpm
              </button>
              <button
                className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 h-7 border border-transparent pt-0.5 ${
                  packageManager === 'npm'
                    ? 'bg-accent border-input shadow-none'
                    : 'data-[state=active]:bg-accent data-[state=active]:border-input data-[state=active]:shadow-none'
                }`}
                onClick={() => setPackageManager('npm')}
              >
                npm
              </button>
              <button
                className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 h-7 border border-transparent pt-0.5 ${
                  packageManager === 'yarn'
                    ? 'bg-accent border-input shadow-none'
                    : 'data-[state=active]:bg-accent data-[state=active]:border-input data-[state=active]:shadow-none'
                }`}
                onClick={() => setPackageManager('yarn')}
              >
                yarn
              </button>
            </div>
          </div>
          <div className="px-4 py-3.5 bg-white dark:bg-black">
            <pre className="font-mono text-sm leading-relaxed">
              <code>
                {packageManager === 'pnpm' &&
                  'pnpm add @cosmic-ui/ui @cosmic-ui/tokens tailwind-merge class-variance-authority'}
                {packageManager === 'npm' &&
                  'npm install @cosmic-ui/ui @cosmic-ui/tokens tailwind-merge class-variance-authority'}
                {packageManager === 'yarn' &&
                  'yarn add @cosmic-ui/ui @cosmic-ui/tokens tailwind-merge class-variance-authority'}
              </code>
            </pre>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-6 text-foreground">
        2. Configuration Tailwind CSS
      </h2>

      <p className="text-foreground mb-6">
        Ajoutez le preset CosmicUI à votre configuration Tailwind :
      </p>

      <CodeBlock fileName="tailwind.config.ts" language="typescript">
        <div className="flex">
          <div className="select-none pr-4 text-right text-gray-400 w-8">1</div>
          <div className="flex-1">
            <span style={{ color: '#032F62' }}>"use client"</span>
          </div>
        </div>
        <div className="flex">
          <div className="select-none pr-4 text-right text-gray-400 w-8">2</div>
          <div className="flex-1"></div>
        </div>
        <div className="flex">
          <div className="select-none pr-4 text-right text-gray-400 w-8">3</div>
          <div className="flex-1">
            <span style={{ color: '#D73A49' }}>import</span> preset{' '}
            <span style={{ color: '#D73A49' }}>from</span>{' '}
            <span style={{ color: '#032F62' }}>
              '@cosmic-ui/tokens/tailwind.preset.cjs'
            </span>
          </div>
        </div>
        <div className="flex">
          <div className="select-none pr-4 text-right text-gray-400 w-8">4</div>
          <div className="flex-1"></div>
        </div>
        <div className="flex">
          <div className="select-none pr-4 text-right text-gray-400 w-8">5</div>
          <div className="flex-1">
            <span style={{ color: '#D73A49' }}>export default</span>{' '}
            <span style={{ color: '#24292E' }}>&#123;</span>
          </div>
        </div>
        <div className="flex">
          <div className="select-none pr-4 text-right text-gray-400 w-8">6</div>
          <div className="flex-1">
            <span style={{ color: '#24292E' }}>&nbsp;&nbsp;content: </span>
            <span style={{ color: '#24292E' }}>&#91;</span>
            <span style={{ color: '#032F62' }}>
              './src/**/*.&#123;js,ts,jsx,tsx,mdx&#125;'
            </span>
            <span style={{ color: '#24292E' }}>,</span>
          </div>
        </div>
        <div className="flex">
          <div className="select-none pr-4 text-right text-gray-400 w-8">7</div>
          <div className="flex-1">
            <span style={{ color: '#032F62' }}>
              &nbsp;&nbsp;'./app/**/*.&#123;js,ts,jsx,tsx,mdx&#125;'
            </span>
            <span style={{ color: '#24292E' }}>,</span>
          </div>
        </div>
        <div className="flex">
          <div className="select-none pr-4 text-right text-gray-400 w-8">8</div>
          <div className="flex-1">
            <span style={{ color: '#032F62' }}>
              &nbsp;&nbsp;'./pages/**/*.&#123;js,ts,jsx,tsx,mdx&#125;'
            </span>
            <span style={{ color: '#24292E' }}>,</span>
          </div>
        </div>
        <div className="flex">
          <div className="select-none pr-4 text-right text-gray-400 w-8">9</div>
          <div className="flex-1">
            <span style={{ color: '#032F62' }}>
              &nbsp;&nbsp;'./components/**/*.&#123;js,ts,jsx,tsx,mdx&#125;'
            </span>
            <span style={{ color: '#24292E' }}>,</span>
          </div>
        </div>
        <div className="flex">
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            10
          </div>
          <div className="flex-1">
            <span style={{ color: '#24292E' }}>&nbsp;&nbsp;&#93;</span>
            <span style={{ color: '#24292E' }}>,</span>
          </div>
        </div>
        <div className="flex">
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            11
          </div>
          <div className="flex-1">
            <span style={{ color: '#24292E' }}>&nbsp;&nbsp;presets: </span>
            <span style={{ color: '#24292E' }}>&#91;</span>preset
            <span style={{ color: '#24292E' }}>&#93;</span>
            <span style={{ color: '#24292E' }}>,</span>
          </div>
        </div>
        <div className="flex">
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            12
          </div>
          <div className="flex-1">
            <span style={{ color: '#24292E' }}>&#125;</span>
          </div>
        </div>
      </CodeBlock>

      <h2 className="text-2xl font-semibold mb-6 text-foreground">
        3. Configuration Next.js (optionnel)
      </h2>

      <p className="text-foreground mb-6">
        Si vous utilisez Next.js, configurez le transpilation des packages :
      </p>

      <CodeBlock fileName="next.config.js" language="javascript">
        <div className="flex">
          <div className="select-none pr-4 text-right text-gray-400 w-8">1</div>
          <div className="flex-1">
            <span style={{ color: '#6A737D' }}>
              /** @type &#123;import('next').NextConfig&#125; */
            </span>
          </div>
        </div>
        <div className="flex">
          <div className="select-none pr-4 text-right text-gray-400 w-8">2</div>
          <div className="flex-1">
            <span style={{ color: '#D73A49' }}>const</span> nextConfig{' '}
            <span style={{ color: '#24292E' }}>= &#123;</span>
          </div>
        </div>
        <div className="flex">
          <div className="select-none pr-4 text-right text-gray-400 w-8">3</div>
          <div className="flex-1">
            <span style={{ color: '#24292E' }}>
              &nbsp;&nbsp;transpilePackages:{' '}
            </span>
            <span style={{ color: '#24292E' }}>&#91;</span>
          </div>
        </div>
        <div className="flex">
          <div className="select-none pr-4 text-right text-gray-400 w-8">4</div>
          <div className="flex-1">
            <span style={{ color: '#032F62' }}>
              &nbsp;&nbsp;&nbsp;&nbsp;'@cosmic-ui/ui'
            </span>
            <span style={{ color: '#24292E' }}>,</span>
          </div>
        </div>
        <div className="flex">
          <div className="select-none pr-4 text-right text-gray-400 w-8">5</div>
          <div className="flex-1">
            <span style={{ color: '#032F62' }}>
              &nbsp;&nbsp;&nbsp;&nbsp;'@cosmic-ui/tokens'
            </span>
          </div>
        </div>
        <div className="flex">
          <div className="select-none pr-4 text-right text-gray-400 w-8">6</div>
          <div className="flex-1">
            <span style={{ color: '#24292E' }}>&nbsp;&nbsp;&#93;</span>
            <span style={{ color: '#24292E' }}>,</span>
          </div>
        </div>
        <div className="flex">
          <div className="select-none pr-4 text-right text-gray-400 w-8">7</div>
          <div className="flex-1">
            <span style={{ color: '#24292E' }}>&#125;</span>
          </div>
        </div>
        <div className="flex">
          <div className="select-none pr-4 text-right text-gray-400 w-8">8</div>
          <div className="flex-1"></div>
        </div>
        <div className="flex">
          <div className="select-none pr-4 text-right text-gray-400 w-8">9</div>
          <div className="flex-1">
            <span style={{ color: '#D73A49' }}>module.exports</span> =
            nextConfig
          </div>
        </div>
      </CodeBlock>

      <h2 className="text-2xl font-semibold mb-6 text-foreground">
        4. Premier composant
      </h2>

      <p className="text-foreground mb-6">
        Testez votre installation avec un composant simple :
      </p>

      <CodeBlock fileName="src/components/Example.tsx" language="typescript">
        <div className="flex">
          <div className="select-none pr-4 text-right text-gray-400 w-8">1</div>
          <div className="flex-1">
            <span style={{ color: '#D73A49' }}>import</span>{' '}
            <span style={{ color: '#24292E' }}>&#123;</span> Button, Card, Input{' '}
            <span style={{ color: '#24292E' }}>&#125;</span>{' '}
            <span style={{ color: '#D73A49' }}>from</span>{' '}
            <span style={{ color: '#032F62' }}>'@cosmic-ui/ui'</span>
          </div>
        </div>
        <div className="flex">
          <div className="select-none pr-4 text-right text-gray-400 w-8">2</div>
          <div className="flex-1"></div>
        </div>
        <div className="flex">
          <div className="select-none pr-4 text-right text-gray-400 w-8">3</div>
          <div className="flex-1">
            <span style={{ color: '#D73A49' }}>export function</span> Example
            <span style={{ color: '#24292E' }}>() &#123;</span>
          </div>
        </div>
        <div className="flex">
          <div className="select-none pr-4 text-right text-gray-400 w-8">4</div>
          <div className="flex-1">
            <span style={{ color: '#24292E' }}>&nbsp;&nbsp;</span>
            <span style={{ color: '#D73A49' }}>return</span>{' '}
            <span style={{ color: '#24292E' }}>(</span>
          </div>
        </div>
        <div className="flex">
          <div className="select-none pr-4 text-right text-gray-400 w-8">5</div>
          <div className="flex-1">
            <span style={{ color: '#24292E' }}>
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;
            </span>
            <span style={{ color: '#005CC5' }}>Card</span> className=
            <span style={{ color: '#032F62' }}>"p-6 max-w-md"</span>
            <span style={{ color: '#24292E' }}>&gt;</span>
          </div>
        </div>
        <div className="flex">
          <div className="select-none pr-4 text-right text-gray-400 w-8">6</div>
          <div className="flex-1">
            <span style={{ color: '#24292E' }}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;
            </span>
            <span style={{ color: '#005CC5' }}>h3</span> className=
            <span style={{ color: '#032F62' }}>
              "text-lg font-semibold mb-4"
            </span>
            <span style={{ color: '#24292E' }}>&gt;</span>Mon premier composant
            <span style={{ color: '#24292E' }}>&lt;/</span>
            <span style={{ color: '#005CC5' }}>h3</span>
            <span style={{ color: '#24292E' }}>&gt;</span>
          </div>
        </div>
        <div className="flex">
          <div className="select-none pr-4 text-right text-gray-400 w-8">7</div>
          <div className="flex-1">
            <span style={{ color: '#24292E' }}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;
            </span>
            <span style={{ color: '#005CC5' }}>Input</span>
            placeholder=
            <span style={{ color: '#032F62' }}>"Entrez votre texte"</span>
            className=<span style={{ color: '#032F62' }}>"mb-4"</span>
            <span style={{ color: '#24292E' }}>/&gt;</span>
          </div>
        </div>
        <div className="flex">
          <div className="select-none pr-4 text-right text-gray-400 w-8">8</div>
          <div className="flex-1">
            <span style={{ color: '#24292E' }}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;
            </span>
            <span style={{ color: '#005CC5' }}>Button</span> variant=
            <span style={{ color: '#032F62' }}>"outline"</span>
            <span style={{ color: '#24292E' }}>&gt;</span>
            Valider
            <span style={{ color: '#24292E' }}>&lt;/</span>
            <span style={{ color: '#005CC5' }}>Button</span>
            <span style={{ color: '#24292E' }}>&gt;</span>
          </div>
        </div>
        <div className="flex">
          <div className="select-none pr-4 text-right text-gray-400 w-8">9</div>
          <div className="flex-1">
            <span style={{ color: '#24292E' }}>
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;/
            </span>
            <span style={{ color: '#005CC5' }}>Card</span>
            <span style={{ color: '#24292E' }}>&gt;</span>
          </div>
        </div>
        <div className="flex">
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            10
          </div>
          <div className="flex-1">
            <span style={{ color: '#24292E' }}>&nbsp;&nbsp;)</span>
          </div>
        </div>
        <div className="flex">
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            11
          </div>
          <div className="flex-1">
            <span style={{ color: '#24292E' }}>&#125;</span>
          </div>
        </div>
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
