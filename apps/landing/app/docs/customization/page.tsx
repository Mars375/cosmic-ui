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

export default function CustomizationPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-foreground">
        Personnalisation
      </h1>

      <p className="text-foreground mb-8">
        CosmicUI offre une flexibilité maximale pour étendre et personnaliser
        vos composants. Créez vos propres variants, étendez les classes
        utilitaires, et développez des composants sur mesure.
      </p>

      <h2 className="text-2xl font-semibold mb-6 text-foreground">
        Créer des composants personnalisés
      </h2>

      <p className="text-foreground mb-6">
        Étendez les composants CosmicUI pour créer vos propres variants et
        comportements personnalisés :
      </p>

      <CodeBlock fileName="components/custom-button.tsx" language="typescript">
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">1</div>
          <div className="flex-1">
            <span className="keyword">import</span> <span>&#123;</span> Button{' '}
            <span>&#125;</span> <span className="keyword">from</span>{' '}
            <span className="string">'@cosmic-ui/ui'</span>;
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">2</div>
          <div className="flex-1">
            <span className="keyword">import</span> <span>&#123;</span> cva{' '}
            <span>&#125;</span> <span className="keyword">from</span>{' '}
            <span className="string">'class-variance-authority'</span>;
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">3</div>
          <div className="flex-1">
            <span className="keyword">import</span> <span>&#123;</span> cn{' '}
            <span>&#125;</span> <span className="keyword">from</span>{' '}
            <span className="string">'@/lib/utils'</span>;
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">4</div>
          <div className="flex-1"></div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">5</div>
          <div className="flex-1">
            <span className="keyword">const</span> customButtonVariants ={' '}
            <span className="function">cva</span>(
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">6</div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;
              <span className="string">
                'inline-flex items-center justify-center rounded-md text-sm
                font-medium transition-colors focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-ring
                focus-visible:ring-offset-2 disabled:opacity-50
                disabled:pointer-events-none ring-offset-background'
              </span>
              ,
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">7</div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;<span>&#123;</span>
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">8</div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;variants: <span>&#123;</span>
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">9</div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;variant: <span>&#123;</span>
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            10
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;default:{' '}
              <span className="string">
                'bg-primary text-primary-foreground hover:bg-primary/90'
              </span>
              ,
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            11
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;brand:{' '}
              <span className="string">
                'bg-brand-500 text-white hover:bg-brand-600'
              </span>
              ,
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            12
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&#125;</span>,
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            13
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;size: <span>&#123;</span>
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            14
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;default:{' '}
              <span className="string">'h-10 py-2 px-4'</span>,
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            15
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;large:{' '}
              <span className="string">'h-12 py-3 px-6 text-base'</span>,
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            16
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&#125;</span>,
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            17
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;<span>&#125;</span>,
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            18
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;defaultVariants: <span>&#123;</span>
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            19
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;variant:{' '}
              <span className="string">'default'</span>,
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            20
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;size:{' '}
              <span className="string">'default'</span>,
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            21
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;<span>&#125;</span>,
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            22
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;<span>&#125;</span>
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            23
          </div>
          <div className="flex-1">
            <span>);</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            24
          </div>
          <div className="flex-1"></div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            25
          </div>
          <div className="flex-1">
            <span className="keyword">interface</span> CustomButtonProps{' '}
            <span className="keyword">extends</span>{' '}
            React.ButtonHTMLAttributes&lt;HTMLButtonElement&gt;{' '}
            <span>&#123;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            26
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;variant?: <span className="string">'default'</span> |{' '}
              <span className="string">'brand'</span>;
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            27
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;size?: <span className="string">'default'</span> |{' '}
              <span className="string">'large'</span>;
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            28
          </div>
          <div className="flex-1">
            <span>
              <span>&#125;</span>
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            29
          </div>
          <div className="flex-1"></div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            30
          </div>
          <div className="flex-1">
            <span className="keyword">export function</span>{' '}
            <span className="function">CustomButton</span>(<span>&#123;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            31
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;className,</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            32
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;variant,</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            33
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;size,</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            34
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;...props</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            35
          </div>
          <div className="flex-1">
            <span>
              <span>&#125;</span>: CustomButtonProps) <span>&#123;</span>
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            36
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;<span className="keyword">return</span> (
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            37
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="tag">button</span>
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            38
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;className=&#123;
              <span className="function">cn</span>(customButtonVariants(
              <span>&#123;</span> variant, size <span>&#125;</span>),
              className)&#125;
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            39
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#123;...props&#125;
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            40
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;/&gt;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            41
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;);</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            42
          </div>
          <div className="flex-1">
            <span>
              <span>&#125;</span>
            </span>
          </div>
        </div>
      </CodeBlock>

      <h2 className="text-2xl font-semibold mb-6 text-foreground">
        Étendre la configuration Tailwind
      </h2>

      <p className="text-foreground mb-6">
        Ajoutez vos propres couleurs, espacements et autres tokens personnalisés
        :
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
          <div className="flex-1"></div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">3</div>
          <div className="flex-1">
            <span className="keyword">export default</span> <span>&#123;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">4</div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;presets: <span>&#91;</span>preset<span>&#93;</span>,
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">5</div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;theme: <span>&#123;</span>
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">6</div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;extend: <span>&#123;</span>
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">7</div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;colors: <span>&#123;</span>
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">8</div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;brand:{' '}
              <span>&#123;</span>
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">9</div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;50:{' '}
              <span className="string">'#f0f9ff'</span>,
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            10
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;500:{' '}
              <span className="string">'#0ea5e9'</span>,
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            11
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;900:{' '}
              <span className="string">'#0c4a6e'</span>,
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            12
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span>&#125;</span>,
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            13
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&#125;</span>,
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            14
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;spacing: <span>&#123;</span>
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            15
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;18:{' '}
              <span className="string">'4.5rem'</span>,
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            16
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;88:{' '}
              <span className="string">'22rem'</span>,
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            17
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&#125;</span>,
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            18
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;borderRadius:{' '}
              <span>&#123;</span>
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            19
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;xl:{' '}
              <span className="string">'0.75rem'</span>,
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            20
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2xl:{' '}
              <span className="string">'1rem'</span>,
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            21
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&#125;</span>,
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            22
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;<span>&#125;</span>,
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            23
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;<span>&#125;</span>,
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            24
          </div>
          <div className="flex-1">
            <span>
              <span>&#125;</span>;
            </span>
          </div>
        </div>
      </CodeBlock>

      <h2 className="text-2xl font-semibold mb-6 text-foreground">
        Wrapper de composants
      </h2>

      <p className="text-foreground mb-6">
        Créez des wrappers pour ajouter des fonctionnalités spécifiques à vos
        composants :
      </p>

      <CodeBlock
        fileName="components/button-with-loading.tsx"
        language="typescript"
      >
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">1</div>
          <div className="flex-1">
            <span className="keyword">import</span> <span>&#123;</span> Button{' '}
            <span>&#125;</span> <span className="keyword">from</span>{' '}
            <span className="string">'@cosmic-ui/ui'</span>;
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">2</div>
          <div className="flex-1">
            <span className="keyword">import</span> <span>&#123;</span> Loader2{' '}
            <span>&#125;</span> <span className="keyword">from</span>{' '}
            <span className="string">'lucide-react'</span>;
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">3</div>
          <div className="flex-1"></div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">4</div>
          <div className="flex-1">
            <span className="keyword">interface</span> ButtonWithLoadingProps{' '}
            <span className="keyword">extends</span>{' '}
            React.ComponentProps&lt;typeof Button&gt; <span>&#123;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">5</div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;loading?: <span className="keyword">boolean</span>;
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">6</div>
          <div className="flex-1">
            <span>
              <span>&#125;</span>
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">7</div>
          <div className="flex-1"></div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">8</div>
          <div className="flex-1">
            <span className="keyword">export function</span>{' '}
            <span className="function">ButtonWithLoading</span>(
            <span>&#123;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">9</div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;loading,</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            10
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;children,</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            11
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;disabled,</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            12
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;...props</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            13
          </div>
          <div className="flex-1">
            <span>
              <span>&#125;</span>: ButtonWithLoadingProps) <span>&#123;</span>
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            14
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;<span className="keyword">return</span> (
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            15
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="tag">Button</span>
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            16
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;disabled=&#123;disabled ||
              loading&#125;
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            17
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#123;...props&#125;
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            18
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&gt;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            19
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#123;loading && (</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            20
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;
              <span className="tag">Loader2</span> className=
              <span className="string">"mr-2 h-4 w-4 animate-spin"</span> /&gt;
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            21
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)&#125;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            22
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#123;children&#125;
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            23
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="tag">Button</span>
              &gt;
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            24
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;);</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            25
          </div>
          <div className="flex-1">
            <span>
              <span>&#125;</span>
            </span>
          </div>
        </div>
      </CodeBlock>

      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 mt-12">
        <h3 className="text-green-800 dark:text-green-200 font-semibold mb-2">
          🎨 Personnalisation avancée
        </h3>
        <p className="text-green-700 dark:text-green-300">
          CosmicUI est conçu pour être étendu. Créez vos propres composants,
          variants et comportements pour répondre aux besoins spécifiques de
          votre application.
        </p>
      </div>
    </div>
  );
}
