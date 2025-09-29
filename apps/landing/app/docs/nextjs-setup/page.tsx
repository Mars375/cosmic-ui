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

export default function NextJSSetupPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-foreground">Setup Next.js</h1>

      <p className="text-foreground mb-8">
        Configuration optimale de CosmicUI avec Next.js 13+ (App Router) pour
        obtenir les meilleures performances et la meilleure DX.
      </p>

      <h2 className="text-2xl font-semibold mb-6 text-foreground">
        Structure de projet recommandée
      </h2>

      <p className="text-foreground mb-6">
        Organisation suggérée pour un projet Next.js avec CosmicUI :
      </p>

      <CodeBlock fileName="Structure" language="text">
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">1</div>
          <div className="flex-1">my-app/</div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">2</div>
          <div className="flex-1">├── app/</div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">3</div>
          <div className="flex-1">│&nbsp;&nbsp;&nbsp;├── globals.css</div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">4</div>
          <div className="flex-1">│&nbsp;&nbsp;&nbsp;├── layout.tsx</div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">5</div>
          <div className="flex-1">│&nbsp;&nbsp;&nbsp;├── page.tsx</div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">6</div>
          <div className="flex-1">│&nbsp;&nbsp;&nbsp;└── docs/</div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">7</div>
          <div className="flex-1">
            │&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── layout.tsx
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">8</div>
          <div className="flex-1">
            │&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── components/
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">9</div>
          <div className="flex-1">├── components/</div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            10
          </div>
          <div className="flex-1">
            │&nbsp;&nbsp;&nbsp;├──
            ui/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span style={{ color: '#6A737D' }}>
              # Composants CosmicUI wrappés
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            11
          </div>
          <div className="flex-1">
            │&nbsp;&nbsp;&nbsp;└── custom/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span style={{ color: '#6A737D' }}># Vos composants métier</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            12
          </div>
          <div className="flex-1">├── lib/</div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            13
          </div>
          <div className="flex-1">
            │&nbsp;&nbsp;&nbsp;└── utils.ts&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span style={{ color: '#6A737D' }}>
              # Fonction cn() et utilitaires
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            14
          </div>
          <div className="flex-1">├── tailwind.config.ts</div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            15
          </div>
          <div className="flex-1">└── package.json</div>
        </div>
      </CodeBlock>

      <h2 className="text-2xl font-semibold mb-6 text-foreground">
        Configuration TypeScript
      </h2>

      <CodeBlock fileName="tsconfig.json" language="json">
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">1</div>
          <div className="flex-1">
            <span>&#123;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">2</div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;</span>
            <span className="string">"compilerOptions"</span>
            <span>: &#123;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">3</div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span className="string">"target"</span>
            <span>: </span>
            <span className="string">"ES2017"</span>
            <span>,</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">4</div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span className="string">"lib"</span>
            <span>: &#91;</span>
            <span className="string">"dom"</span>
            <span>, </span>
            <span className="string">"dom.iterable"</span>
            <span>, </span>
            <span className="string">"ES6"</span>
            <span>&#93;,</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">5</div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span className="string">"allowJs"</span>
            <span>: </span>
            <span className="keyword">true</span>
            <span>,</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">6</div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span className="string">"skipLibCheck"</span>
            <span>: </span>
            <span className="keyword">true</span>
            <span>,</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">7</div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span className="string">"strict"</span>
            <span>: </span>
            <span className="keyword">true</span>
            <span>,</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">8</div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span className="string">"noEmit"</span>
            <span>: </span>
            <span className="keyword">true</span>
            <span>,</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">9</div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span className="string">"esModuleInterop"</span>
            <span>: </span>
            <span className="keyword">true</span>
            <span>,</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            10
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span className="string">"module"</span>
            <span>: </span>
            <span className="string">"esnext"</span>
            <span>,</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            11
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span className="string">"moduleResolution"</span>
            <span>: </span>
            <span className="string">"bundler"</span>
            <span>,</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            12
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span className="string">"resolveJsonModule"</span>
            <span>: </span>
            <span className="keyword">true</span>
            <span>,</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            13
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span className="string">"isolatedModules"</span>
            <span>: </span>
            <span className="keyword">true</span>
            <span>,</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            14
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span className="string">"jsx"</span>
            <span>: </span>
            <span className="string">"preserve"</span>
            <span>,</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            15
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span className="string">"incremental"</span>
            <span>: </span>
            <span className="keyword">true</span>
            <span>,</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            16
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span className="string">"plugins"</span>
            <span>: &#91;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            17
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#123;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            18
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span className="string">"name"</span>
            <span>: </span>
            <span className="string">"next"</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            19
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            20
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&#93;,</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            21
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span className="string">"paths"</span>
            <span>: &#123;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            22
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span className="string">"@/*"</span>
            <span>: &#91;</span>
            <span className="string">"./src/*"</span>
            <span>&#93;,</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            23
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span className="string">"@/components/*"</span>
            <span>: &#91;</span>
            <span className="string">"./src/components/*"</span>
            <span>&#93;,</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            24
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span className="string">"@/lib/*"</span>
            <span>: &#91;</span>
            <span className="string">"./src/lib/*"</span>
            <span>&#93;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            25
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&#125;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            26
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&#125;,</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            27
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;</span>
            <span className="string">"include"</span>
            <span>: &#91;</span>
            <span className="string">"next-env.d.ts"</span>
            <span>, </span>
            <span className="string">"**/*.ts"</span>
            <span>, </span>
            <span className="string">"**/*.tsx"</span>
            <span>&#93;,</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            28
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;</span>
            <span className="string">"exclude"</span>
            <span>: &#91;</span>
            <span className="string">"node_modules"</span>
            <span>&#93;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            29
          </div>
          <div className="flex-1">
            <span>&#125;</span>
          </div>
        </div>
      </CodeBlock>

      <h2 className="text-2xl font-semibold mb-6 text-foreground">
        Layout Root
      </h2>

      <p className="text-foreground mb-6">
        Configurez votre layout principal pour le thème global :
      </p>

      <CodeBlock fileName="app/layout.tsx" language="typescript">
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">1</div>
          <div className="flex-1">
            <span style={{ color: '#6A737D' }}>// app/layout.tsx</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">2</div>
          <div className="flex-1">
            <span className="keyword">import</span> <span>&#123;</span> Inter{' '}
            <span>&#125;</span> <span className="keyword">from</span>{' '}
            <span className="string">'next/font/google'</span>;
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">3</div>
          <div className="flex-1">
            <span className="keyword">import</span>{' '}
            <span className="string">'./globals.css'</span>;
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">4</div>
          <div className="flex-1"></div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">5</div>
          <div className="flex-1">
            <span className="keyword">const</span> inter ={' '}
            <span className="function">Inter</span>(<span>&#123;</span> subsets:{' '}
            <span>&#91;</span>
            <span className="string">'latin'</span>
            <span>&#93;</span> <span>&#125;</span>);
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">6</div>
          <div className="flex-1"></div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">7</div>
          <div className="flex-1">
            <span className="keyword">export const</span> metadata ={' '}
            <span>&#123;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">8</div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;title: </span>
            <span className="string">'Mon App'</span>,
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">9</div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;description: </span>
            <span className="string">
              'Application construite avec CosmicUI'
            </span>
            ,
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            10
          </div>
          <div className="flex-1">
            <span>&#125;</span>;
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            11
          </div>
          <div className="flex-1"></div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            12
          </div>
          <div className="flex-1">
            <span className="keyword">export default function</span>{' '}
            <span className="function">RootLayout</span>(<span>&#123;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            13
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;children,</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            14
          </div>
          <div className="flex-1">
            <span>
              &#125;: <span>&#123;</span>
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            15
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;children: React.ReactNode;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            16
          </div>
          <div className="flex-1">
            <span>&#125;</span>) <span>&#123;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            17
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;</span>
            <span className="keyword">return</span> (
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            18
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&lt;</span>
            <span className="tag">html</span> lang=
            <span className="string">"fr"</span> suppressHydrationWarning
            <span>&gt;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            19
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;</span>
            <span className="tag">body</span> className=<span>&#123;</span>
            inter.className<span>&#125;</span>
            <span>&gt;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            20
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;</span>
            <span className="tag">ThemeProvider</span>
            <span>&gt;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            21
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span>&#123;</span>children<span>&#125;</span>
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            22
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/</span>
            <span className="tag">ThemeProvider</span>
            <span>&gt;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            23
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/</span>
            <span className="tag">body</span>
            <span>&gt;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            24
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/</span>
            <span className="tag">html</span>
            <span>&gt;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            25
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;);</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            26
          </div>
          <div className="flex-1">
            <span>&#125;</span>
          </div>
        </div>
      </CodeBlock>

      <h2 className="text-2xl font-semibold mb-6 text-foreground">
        Gestion du thème
      </h2>

      <CodeBlock fileName="lib/theme-provider.tsx" language="typescript">
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">1</div>
          <div className="flex-1">
            <span className="string">'use client'</span>;
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">2</div>
          <div className="flex-1"></div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">3</div>
          <div className="flex-1">
            <span className="keyword">import</span> <span>&#123;</span>{' '}
            createContext, useContext, useEffect, useState <span>&#125;</span>{' '}
            <span className="keyword">from</span>{' '}
            <span className="string">'react'</span>;
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">4</div>
          <div className="flex-1"></div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">5</div>
          <div className="flex-1">
            <span className="keyword">type</span> Theme ={' '}
            <span className="string">'dark'</span> |{' '}
            <span className="string">'light'</span> |{' '}
            <span className="string">'system'</span>;
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">6</div>
          <div className="flex-1"></div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">7</div>
          <div className="flex-1">
            <span className="keyword">interface</span> ThemeProviderProps{' '}
            <span>&#123;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">8</div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;children: React.ReactNode;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">9</div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;defaultTheme?: Theme;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            10
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;storageKey?: </span>
            <span className="keyword">string</span>;
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            11
          </div>
          <div className="flex-1">
            <span>&#125;</span>
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
            <span className="keyword">type</span> ThemeContextType ={' '}
            <span>&#123;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            14
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;theme: Theme;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            15
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;setTheme: (theme: Theme) =&gt; </span>
            <span className="keyword">void</span>;
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            16
          </div>
          <div className="flex-1">
            <span>&#125;</span>;
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            17
          </div>
          <div className="flex-1"></div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            18
          </div>
          <div className="flex-1">
            <span className="keyword">const</span> ThemeProviderContext ={' '}
            <span className="function">createContext</span>&lt;ThemeContextType
            | <span className="keyword">undefined</span>&gt;(
            <span className="keyword">undefined</span>);
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            19
          </div>
          <div className="flex-1"></div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            20
          </div>
          <div className="flex-1">
            <span className="keyword">export function</span>{' '}
            <span className="function">ThemeProvider</span>(<span>&#123;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            21
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;children,</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            22
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;defaultTheme = </span>
            <span className="string">'system'</span>,
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            23
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;storageKey = </span>
            <span className="string">'cosmic-ui-theme'</span>,
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            24
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;...props</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            25
          </div>
          <div className="flex-1">
            <span>
              &#125;: ThemeProviderProps) <span>&#123;</span>
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            26
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;</span>
            <span className="keyword">const</span> <span>&#91;</span>theme,
            setTheme<span>&#93;</span> ={' '}
            <span className="function">useState</span>
            &lt;Theme&gt;(defaultTheme);
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            27
          </div>
          <div className="flex-1"></div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            28
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;</span>
            <span className="function">useEffect</span>(() =&gt;{' '}
            <span>&#123;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            29
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span className="keyword">const</span> media = window.
            <span className="function">matchMedia</span>(
            <span className="string">'(prefers-color-scheme: dark)'</span>);
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            30
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span className="keyword">if</span> (theme ==={' '}
            <span className="string">'system'</span>) <span>&#123;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            31
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;media.matches ?
              document.documentElement.classList.
              <span className="function">add</span>(
              <span className="string">'dark'</span>)
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            32
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
              document.documentElement.classList.
              <span className="function">remove</span>(
              <span className="string">'dark'</span>);
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            33
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;<span>&#125;</span>{' '}
              <span className="keyword">else</span> <span>&#123;</span>
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            34
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;document.documentElement.classList.
              <span className="function">toggle</span>(
              <span className="string">'dark'</span>, theme ==={' '}
              <span className="string">'dark'</span>);
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            35
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&#125;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            36
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;<span>&#125;</span>, <span>&#91;</span>theme
              <span>&#93;</span>);
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            37
          </div>
          <div className="flex-1"></div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            38
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;</span>
            <span className="keyword">const</span> value = <span>&#123;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            39
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;theme,</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            40
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;setTheme: (theme: Theme) =&gt;{' '}
              <span>&#123;</span>
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            41
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;localStorage.
              <span className="function">setItem</span>(storageKey, theme);
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            42
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span className="function">setTheme</span>(theme);
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            43
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;<span>&#125;</span>,
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            44
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&#125;</span>;
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            45
          </div>
          <div className="flex-1"></div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            46
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;</span>
            <span className="keyword">return</span> (
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            47
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&lt;</span>
            <span className="tag">ThemeProviderContext.Provider</span>{' '}
            <span>&#123;</span>...props<span>&#125;</span> value=
            <span>&#123;</span>value<span>&#125;</span>
            <span>&gt;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            48
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&#123;</span>children
              <span>&#125;</span>
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            49
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/</span>
            <span className="tag">ThemeProviderContext.Provider</span>
            <span>&gt;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            50
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;);</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            51
          </div>
          <div className="flex-1">
            <span>&#125;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            52
          </div>
          <div className="flex-1"></div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            53
          </div>
          <div className="flex-1">
            <span className="keyword">export const</span> useTheme = () =&gt;{' '}
            <span>&#123;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            54
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;</span>
            <span className="keyword">const</span> context ={' '}
            <span className="function">useContext</span>(ThemeProviderContext);
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            55
          </div>
          <div className="flex-1"></div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            56
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;</span>
            <span className="keyword">if</span> (context ==={' '}
            <span className="keyword">undefined</span>) <span>&#123;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            57
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span className="keyword">throw new</span>{' '}
            <span className="function">Error</span>(
            <span className="string">
              'useTheme must be used within a ThemeProvider'
            </span>
            );
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            58
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&#125;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            59
          </div>
          <div className="flex-1"></div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            60
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;</span>
            <span className="keyword">return</span> context;
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            61
          </div>
          <div className="flex-1">
            <span>&#125;</span>;
          </div>
        </div>
      </CodeBlock>

      <h2 className="text-2xl font-semibold mb-6 text-foreground">
        Utilitaires
      </h2>

      <CodeBlock fileName="lib/utils.ts" language="typescript">
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">1</div>
          <div className="flex-1">
            <span className="keyword">import</span> <span>&#123;</span>{' '}
            <span className="keyword">type</span> ClassValue, clsx{' '}
            <span>&#125;</span> <span className="keyword">from</span>{' '}
            <span className="string">'clsx'</span>;
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">2</div>
          <div className="flex-1">
            <span className="keyword">import</span> <span>&#123;</span> twMerge{' '}
            <span>&#125;</span> <span className="keyword">from</span>{' '}
            <span className="string">'tailwind-merge'</span>;
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">3</div>
          <div className="flex-1"></div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">4</div>
          <div className="flex-1">
            <span className="keyword">export function</span>{' '}
            <span className="function">cn</span>(...inputs: ClassValue
            <span>&#91;</span>
            <span>&#93;</span>) <span>&#123;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">5</div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;</span>
            <span className="keyword">return</span>{' '}
            <span className="function">twMerge</span>(
            <span className="function">clsx</span>(inputs));
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">6</div>
          <div className="flex-1">
            <span>&#125;</span>
          </div>
        </div>
      </CodeBlock>

      <h2 className="text-2xl font-semibold mb-6 text-foreground">
        Configuration globals.css
      </h2>

      <CodeBlock fileName="app/globals.css" language="css">
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">1</div>
          <div className="flex-1">
            <span className="keyword">@tailwind</span> base;
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">2</div>
          <div className="flex-1">
            <span className="keyword">@tailwind</span> components;
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">3</div>
          <div className="flex-1">
            <span className="keyword">@tailwind</span> utilities;
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">4</div>
          <div className="flex-1"></div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">5</div>
          <div className="flex-1">
            <span className="keyword">@layer</span> base <span>&#123;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">6</div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;:root <span>&#123;</span>
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">7</div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;--background: </span>
            <span className="string">0 0% 100%</span>;
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">8</div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;--foreground: </span>
            <span className="string">222.2 84% 4.9%</span>;
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">9</div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;--primary: </span>
            <span className="string">221.2 83.2% 53.3%</span>;
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            10
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;--border: </span>
            <span className="string">214.3 31.8% 91.4%</span>;
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            11
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;--radius: </span>
            <span className="string">0.5rem</span>;
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            12
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;<span>&#125;</span>
            </span>
          </div>
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
            <span className="string">222.2 84% 4.9%</span>;
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            15
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;--foreground: </span>
            <span className="string">210 40% 98%</span>;
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            16
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;--primary: </span>
            <span className="string">217.2 91.2% 59.8%</span>;
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            17
          </div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;--border: </span>
            <span className="string">217.2 32.6% 17.5%</span>;
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            18
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;<span>&#125;</span>
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            19
          </div>
          <div className="flex-1">
            <span>
              <span>&#125;</span>
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            20
          </div>
          <div className="flex-1"></div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            21
          </div>
          <div className="flex-1">
            <span className="keyword">@layer</span> base <span>&#123;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            22
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;* <span>&#123;</span>
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            23
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="keyword">@apply</span>{' '}
              border-border;
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            24
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;<span>&#125;</span>
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            25
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;body <span>&#123;</span>
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            26
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="keyword">@apply</span>{' '}
              bg-background text-foreground;
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">
            27
          </div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;<span>&#125;</span>
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
      </CodeBlock>

      <h2 className="text-2xl font-semibold mb-6 text-foreground">
        Configuration next.config.js
      </h2>

      <CodeBlock fileName="next.config.js" language="javascript">
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">1</div>
          <div className="flex-1">
            <span style={{ color: '#6A737D' }}>
              /** @type &#123;import('next').NextConfig&#125; */
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">2</div>
          <div className="flex-1">
            <span className="keyword">const</span> nextConfig ={' '}
            <span>&#123;</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">3</div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;transpilePackages: <span>&#91;</span>
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">4</div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span className="string">'@cosmic-ui/ui'</span>,
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">5</div>
          <div className="flex-1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span className="string">'@cosmic-ui/tokens'</span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">6</div>
          <div className="flex-1">
            <span>
              &nbsp;&nbsp;<span>&#93;</span>
            </span>
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">7</div>
          <div className="flex-1">
            <span>&#125;</span>;
          </div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">8</div>
          <div className="flex-1"></div>
        </div>
        <div className="flex" data-line>
          <div className="select-none pr-4 text-right text-gray-400 w-8">9</div>
          <div className="flex-1">
            <span className="keyword">module.exports</span> = nextConfig;
          </div>
        </div>
      </CodeBlock>

      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 mt-12">
        <h3 className="text-green-800 dark:text-green-200 font-semibold mb-2">
          🚀 Optimisé
        </h3>
        <p className="text-green-700 dark:text-green-300">
          Cette configuration est optimisée pour les performances Next.js avec
          support SSR/SSG et tree-shaking automatique.
        </p>
      </div>
    </div>
  );
}
