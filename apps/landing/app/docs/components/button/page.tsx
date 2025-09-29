'use client';

import { useState } from 'react';
import { Button } from '@cosmic-ui/ui';

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

  return (
    <div className="relative mb-6">
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="flex items-center gap-2 border-b px-3 py-1">
          <div className="bg-foreground flex size-4 items-center justify-center rounded-[1px] opacity-70">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="fill-foreground w-4 h-4"
            >
              <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"></path>
            </svg>
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

export default function ButtonPage() {
  const [showCode, setShowCode] = useState(false);
  const [showSecondaryCode, setShowSecondaryCode] = useState(false);
  const [showOutlineCode, setShowOutlineCode] = useState(false);
  const [showGhostCode, setShowGhostCode] = useState(false);
  const [showDestructiveCode, setShowDestructiveCode] = useState(false);
  const [showSizesCode, setShowSizesCode] = useState(false);
  const [showDisabledCode, setShowDisabledCode] = useState(false);

  const [copiedStates, setCopiedStates] = useState({
    main: false,
    secondary: false,
    outline: false,
    ghost: false,
    destructive: false,
    sizes: false,
    disabled: false,
  });

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-4 text-foreground">Button</h1>
            <p className="text-lg text-muted-foreground">
              Un composant bouton polyvalent avec plusieurs variants et tailles.
              Parfait pour les actions principales et secondaires dans vos
              interfaces.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="mb-8 flex justify-start">
        <div className="w-[500px] border border-border rounded-lg overflow-hidden bg-background">
          <div className="flex items-center gap-0 border-b border-border">
            <button
              onClick={() => setShowCode(false)}
              className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                !showCode
                  ? 'text-foreground border-foreground'
                  : 'text-muted-foreground border-transparent hover:text-foreground'
              }`}
            >
              Preview
            </button>
            <button
              onClick={() => setShowCode(true)}
              className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                showCode
                  ? 'text-foreground border-foreground'
                  : 'text-muted-foreground border-transparent hover:text-foreground'
              }`}
            >
              Code
            </button>
          </div>
          <div className="p-2 h-[450px] flex items-center justify-center">
            {!showCode ? (
              <Button>Button</Button>
            ) : (
              <div className="relative w-full h-full">
                <div className="absolute top-4 right-4 z-10">
                  <button
                    onClick={async () => {
                      const code = `import { Button } from "@cosmic-ui/ui";

export function ButtonDemo() {
  return (
    <div className="flex justify-center">
      <Button>Button</Button>
    </div>
  );
}`;
                      try {
                        await navigator.clipboard.writeText(code);
                        setCopiedStates(prev => ({ ...prev, main: true }));
                        setTimeout(() => {
                          setCopiedStates(prev => ({ ...prev, main: false }));
                        }, 2000);
                      } catch (err) {
                        console.error('Failed to copy text: ', err);
                      }
                    }}
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {copiedStates.main ? (
                      <svg
                        className="h-4 w-4 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                <div className="bg-white dark:bg-black rounded-lg p-2 font-mono text-sm overflow-x-auto w-full h-full">
                  <div className="flex" data-line>
                    <div className="select-none pr-4 text-right text-gray-400 w-8">
                      1
                    </div>
                    <div className="flex-1">
                      <span className="keyword">import</span>{' '}
                      <span>&#123;</span> Button <span>&#125;</span>{' '}
                      <span className="keyword">from</span>{' '}
                      <span className="string">"@cosmic-ui/ui"</span>;
                    </div>
                  </div>
                  <div className="flex" data-line>
                    <div className="select-none pr-4 text-right text-gray-400 w-8">
                      2
                    </div>
                    <div className="flex-1"></div>
                  </div>
                  <div className="flex" data-line>
                    <div className="select-none pr-4 text-right text-gray-400 w-8">
                      3
                    </div>
                    <div className="flex-1">
                      <span className="keyword">export function</span>{' '}
                      <span className="function">ButtonDemo</span>(){' '}
                      <span>&#123;</span>
                    </div>
                  </div>
                  <div className="flex" data-line>
                    <div className="select-none pr-4 text-right text-gray-400 w-8">
                      4
                    </div>
                    <div className="flex-1">
                      <span>&nbsp;&nbsp;</span>
                      <span className="keyword">return</span> (
                    </div>
                  </div>
                  <div className="flex" data-line>
                    <div className="select-none pr-4 text-right text-gray-400 w-8">
                      5
                    </div>
                    <div className="flex-1">
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;&lt;</span>
                      <span className="tag">div</span> className=
                      <span className="string">"flex justify-center"</span>
                      <span>&gt;</span>
                    </div>
                  </div>
                  <div className="flex" data-line>
                    <div className="select-none pr-4 text-right text-gray-400 w-8">
                      6
                    </div>
                    <div className="flex-1">
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;</span>
                      <span className="tag">Button</span>
                      <span>&gt;</span>Button<span>&lt;/</span>
                      <span className="tag">Button</span>
                      <span>&gt;</span>
                    </div>
                  </div>
                  <div className="flex" data-line>
                    <div className="select-none pr-4 text-right text-gray-400 w-8">
                      7
                    </div>
                    <div className="flex-1">
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/</span>
                      <span className="tag">div</span>
                      <span>&gt;</span>
                    </div>
                  </div>
                  <div className="flex" data-line>
                    <div className="select-none pr-4 text-right text-gray-400 w-8">
                      8
                    </div>
                    <div className="flex-1">
                      <span>&nbsp;&nbsp;);</span>
                    </div>
                  </div>
                  <div className="flex" data-line>
                    <div className="select-none pr-4 text-right text-gray-400 w-8">
                      9
                    </div>
                    <div className="flex-1">
                      <span>&#125;</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Installation */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">
          Installation
        </h2>
        <p className="text-muted-foreground mb-4">
          Le composant Button est inclus dans le package principal de CosmicUI.
        </p>
        <CodeBlock fileName="Terminal" language="bash">
          <div className="flex" data-line>
            <div className="select-none pr-4 text-right text-gray-400 w-8">
              1
            </div>
            <div className="flex-1">pnpm add @cosmic-ui/ui</div>
          </div>
        </CodeBlock>
      </div>

      {/* Usage */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">Usage</h2>
        <p className="text-muted-foreground mb-4">
          Importez le composant et utilisez-le dans votre application :
        </p>
        <CodeBlock fileName="my-component.tsx" language="tsx">
          <div className="flex" data-line>
            <div className="select-none pr-4 text-right text-gray-400 w-8">
              1
            </div>
            <div className="flex-1">
              <span className="keyword">import</span> <span>&#123;</span> Button{' '}
              <span>&#125;</span> <span className="keyword">from</span>{' '}
              <span className="string">'@cosmic-ui/ui'</span>;
            </div>
          </div>
          <div className="flex" data-line>
            <div className="select-none pr-4 text-right text-gray-400 w-8">
              2
            </div>
            <div className="flex-1"></div>
          </div>
          <div className="flex" data-line>
            <div className="select-none pr-4 text-right text-gray-400 w-8">
              3
            </div>
            <div className="flex-1">
              <span className="keyword">export function</span>{' '}
              <span className="function">MyComponent</span>(){' '}
              <span>&#123;</span>
            </div>
          </div>
          <div className="flex" data-line>
            <div className="select-none pr-4 text-right text-gray-400 w-8">
              4
            </div>
            <div className="flex-1">
              <span>&nbsp;&nbsp;</span>
              <span className="keyword">return</span> (
            </div>
          </div>
          <div className="flex" data-line>
            <div className="select-none pr-4 text-right text-gray-400 w-8">
              5
            </div>
            <div className="flex-1">
              <span>&nbsp;&nbsp;&nbsp;&nbsp;&lt;</span>
              <span className="tag">Button</span> onClick=&#123;() =&gt;{' '}
              <span className="function">alert</span>(
              <span className="string">'Hello!'</span>)&#125;<span>&gt;</span>
            </div>
          </div>
          <div className="flex" data-line>
            <div className="select-none pr-4 text-right text-gray-400 w-8">
              6
            </div>
            <div className="flex-1">
              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Cliquez ici</span>
            </div>
          </div>
          <div className="flex" data-line>
            <div className="select-none pr-4 text-right text-gray-400 w-8">
              7
            </div>
            <div className="flex-1">
              <span>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/</span>
              <span className="tag">Button</span>
              <span>&gt;</span>
            </div>
          </div>
          <div className="flex" data-line>
            <div className="select-none pr-4 text-right text-gray-400 w-8">
              8
            </div>
            <div className="flex-1">
              <span>&nbsp;&nbsp;);</span>
            </div>
          </div>
          <div className="flex" data-line>
            <div className="select-none pr-4 text-right text-gray-400 w-8">
              9
            </div>
            <div className="flex-1">
              <span>&#125;</span>
            </div>
          </div>
        </CodeBlock>
      </div>

      {/* Variants */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">
          Variants
        </h2>
        <p className="text-muted-foreground mb-6">
          Le composant Button supporte plusieurs variants pour différents cas
          d'usage :
        </p>

        <div className="space-y-6">
          {/* Secondary */}
          <div>
            <h3 className="text-lg font-medium mb-3 text-foreground">
              Secondary
            </h3>
            <div className="flex justify-start">
              <div className="w-[500px] border border-border rounded-lg overflow-hidden bg-background">
                <div className="flex items-center gap-0 border-b border-border">
                  <button
                    onClick={() => setShowSecondaryCode(false)}
                    className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                      !showSecondaryCode
                        ? 'text-foreground border-foreground'
                        : 'text-muted-foreground border-transparent hover:text-foreground'
                    }`}
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => setShowSecondaryCode(true)}
                    className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                      showSecondaryCode
                        ? 'text-foreground border-foreground'
                        : 'text-muted-foreground border-transparent hover:text-foreground'
                    }`}
                  >
                    Code
                  </button>
                </div>
                <div className="p-2 h-[450px] flex items-center justify-center">
                  {!showSecondaryCode ? (
                    <Button variant="secondary">Secondary Button</Button>
                  ) : (
                    <div className="relative w-full h-full">
                      <div className="absolute top-4 right-4 z-10">
                        <button
                          onClick={async () => {
                            const code = `import { Button } from "@cosmic-ui/ui";

export function SecondaryButtonDemo() {
  return (
    <div className="flex justify-center">
      <Button variant="secondary">Secondary Button</Button>
    </div>
  );
}`;
                            try {
                              await navigator.clipboard.writeText(code);
                              setCopiedStates(prev => ({
                                ...prev,
                                secondary: true,
                              }));
                              setTimeout(() => {
                                setCopiedStates(prev => ({
                                  ...prev,
                                  secondary: false,
                                }));
                              }, 2000);
                            } catch (err) {
                              console.error('Failed to copy text: ', err);
                            }
                          }}
                          className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {copiedStates.secondary ? (
                            <svg
                              className="h-4 w-4 text-green-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          ) : (
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                              />
                            </svg>
                          )}
                        </button>
                      </div>
                      <div className="bg-white dark:bg-black rounded-lg p-2 font-mono text-sm overflow-x-auto w-full h-full">
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">
                            1
                          </div>
                          <div className="flex-1">
                            <span className="keyword">import</span>{' '}
                            <span>&#123;</span> Button <span>&#125;</span>{' '}
                            <span className="keyword">from</span>{' '}
                            <span className="string">"@cosmic-ui/ui"</span>;
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">
                            2
                          </div>
                          <div className="flex-1"></div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">
                            3
                          </div>
                          <div className="flex-1">
                            <span className="keyword">export function</span>{' '}
                            <span className="function">
                              SecondaryButtonDemo
                            </span>
                            () <span>&#123;</span>
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">
                            4
                          </div>
                          <div className="flex-1">
                            <span>&nbsp;&nbsp;</span>
                            <span className="keyword">return</span> (
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">
                            5
                          </div>
                          <div className="flex-1">
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;&lt;</span>
                            <span className="tag">div</span> className=
                            <span className="string">
                              "flex justify-center"
                            </span>
                            <span>&gt;</span>
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">
                            6
                          </div>
                          <div className="flex-1">
                            <span>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;
                            </span>
                            <span className="tag">Button</span> variant=
                            <span className="string">"secondary"</span>
                            <span>&gt;</span>Secondary Button<span>&lt;/</span>
                            <span className="tag">Button</span>
                            <span>&gt;</span>
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">
                            7
                          </div>
                          <div className="flex-1">
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/</span>
                            <span className="tag">div</span>
                            <span>&gt;</span>
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">
                            8
                          </div>
                          <div className="flex-1">
                            <span>&nbsp;&nbsp;);</span>
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">
                            9
                          </div>
                          <div className="flex-1">
                            <span>&#125;</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Outline */}
          <div>
            <h3 className="text-lg font-medium mb-3 text-foreground">
              Outline
            </h3>
            <div className="flex justify-start">
              <div className="w-[500px] border border-border rounded-lg overflow-hidden bg-background">
                <div className="flex items-center gap-0 border-b border-border">
                  <button
                    onClick={() => setShowOutlineCode(false)}
                    className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                      !showOutlineCode
                        ? 'text-foreground border-foreground'
                        : 'text-muted-foreground border-transparent hover:text-foreground'
                    }`}
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => setShowOutlineCode(true)}
                    className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                      showOutlineCode
                        ? 'text-foreground border-foreground'
                        : 'text-muted-foreground border-transparent hover:text-foreground'
                    }`}
                  >
                    Code
                  </button>
                </div>
                <div className="p-2 h-[450px] flex items-center justify-center">
                  {!showOutlineCode ? (
                    <Button variant="outline">Outline Button</Button>
                  ) : (
                    <div className="relative w-full h-full">
                      <div className="absolute top-4 right-4 z-10">
                        <button
                          onClick={async () => {
                            const code = `import { Button } from "@cosmic-ui/ui";

export function OutlineButtonDemo() {
  return (
    <div className="flex justify-center">
      <Button variant="outline">Outline Button</Button>
    </div>
  );
}`;
                            try {
                              await navigator.clipboard.writeText(code);
                              setCopiedStates(prev => ({
                                ...prev,
                                outline: true,
                              }));
                              setTimeout(() => {
                                setCopiedStates(prev => ({
                                  ...prev,
                                  outline: false,
                                }));
                              }, 2000);
                            } catch (err) {
                              console.error('Failed to copy text: ', err);
                            }
                          }}
                          className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {copiedStates.outline ? (
                            <svg
                              className="h-4 w-4 text-green-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          ) : (
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                              />
                            </svg>
                          )}
                        </button>
                      </div>
                      <div className="bg-white dark:bg-black rounded-lg p-2 font-mono text-sm overflow-x-auto w-full h-full">
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">
                            1
                          </div>
                          <div className="flex-1">
                            <span className="keyword">import</span>{' '}
                            <span>&#123;</span> Button <span>&#125;</span>{' '}
                            <span className="keyword">from</span>{' '}
                            <span className="string">"@cosmic-ui/ui"</span>;
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">
                            2
                          </div>
                          <div className="flex-1"></div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">
                            3
                          </div>
                          <div className="flex-1">
                            <span className="keyword">export function</span>{' '}
                            <span className="function">OutlineButtonDemo</span>
                            () <span>&#123;</span>
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">
                            4
                          </div>
                          <div className="flex-1">
                            <span>&nbsp;&nbsp;</span>
                            <span className="keyword">return</span> (
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">
                            5
                          </div>
                          <div className="flex-1">
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;&lt;</span>
                            <span className="tag">div</span> className=
                            <span className="string">
                              "flex justify-center"
                            </span>
                            <span>&gt;</span>
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">
                            6
                          </div>
                          <div className="flex-1">
                            <span>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;
                            </span>
                            <span className="tag">Button</span> variant=
                            <span className="string">"outline"</span>
                            <span>&gt;</span>Outline Button<span>&lt;/</span>
                            <span className="tag">Button</span>
                            <span>&gt;</span>
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">
                            7
                          </div>
                          <div className="flex-1">
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/</span>
                            <span className="tag">div</span>
                            <span>&gt;</span>
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">
                            8
                          </div>
                          <div className="flex-1">
                            <span>&nbsp;&nbsp;);</span>
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">
                            9
                          </div>
                          <div className="flex-1">
                            <span>&#125;</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Ghost */}
          <div>
            <h3 className="text-lg font-medium mb-3 text-foreground">Ghost</h3>
            <div className="flex justify-start">
              <div className="w-[500px] border border-border rounded-lg overflow-hidden bg-background">
                <div className="flex items-center gap-0 border-b border-border">
                  <button
                    onClick={() => setShowGhostCode(false)}
                    className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                      !showGhostCode
                        ? 'text-foreground border-foreground'
                        : 'text-muted-foreground border-transparent hover:text-foreground'
                    }`}
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => setShowGhostCode(true)}
                    className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                      showGhostCode
                        ? 'text-foreground border-foreground'
                        : 'text-muted-foreground border-transparent hover:text-foreground'
                    }`}
                  >
                    Code
                  </button>
                </div>
                <div className="p-2 h-[450px] flex items-center justify-center">
                  {!showGhostCode ? (
                    <Button variant="ghost">Ghost Button</Button>
                  ) : (
                    <div className="relative w-full h-full">
                      <div className="absolute top-4 right-4 z-10">
                        <button
                          onClick={async () => {
                            const code = `import { Button } from "@cosmic-ui/ui";

export function GhostButtonDemo() {
  return (
    <div className="flex justify-center">
      <Button variant="ghost">Ghost Button</Button>
    </div>
  );
}`;
                            try {
                              await navigator.clipboard.writeText(code);
                              setCopiedStates(prev => ({
                                ...prev,
                                ghost: true,
                              }));
                              setTimeout(() => {
                                setCopiedStates(prev => ({
                                  ...prev,
                                  ghost: false,
                                }));
                              }, 2000);
                            } catch (err) {
                              console.error('Failed to copy text: ', err);
                            }
                          }}
                          className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {copiedStates.ghost ? (
                            <svg
                              className="h-4 w-4 text-green-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          ) : (
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                              />
                            </svg>
                          )}
                        </button>
                      </div>
                      <div className="bg-white dark:bg-black rounded-lg p-2 font-mono text-sm overflow-x-auto w-full h-full">
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">1</div>
                          <div className="flex-1">
                            <span className="keyword">import</span>{' '}
                            <span>&#123;</span> Button <span>&#125;</span>{' '}
                            <span className="keyword">from</span>{' '}
                            <span className="string">"@cosmic-ui/ui"</span>;
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">2</div>
                          <div className="flex-1"></div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">3</div>
                          <div className="flex-1">
                            <span className="keyword">export function</span>{' '}
                            <span className="function">GhostButtonDemo</span>
                            () <span>&#123;</span>
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">4</div>
                          <div className="flex-1">
                            <span>&nbsp;&nbsp;</span>
                            <span className="keyword">return</span> (
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">5</div>
                          <div className="flex-1">
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;&lt;</span>
                            <span className="tag">div</span> className=
                            <span className="string">
                              "flex justify-center"
                            </span>
                            <span>&gt;</span>
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">6</div>
                          <div className="flex-1">
                            <span>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;
                            </span>
                            <span className="tag">Button</span> variant=
                            <span className="string">"ghost"</span>
                            <span>&gt;</span>Ghost Button<span>&lt;/</span>
                            <span className="tag">Button</span>
                            <span>&gt;</span>
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">7</div>
                          <div className="flex-1">
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/</span>
                            <span className="tag">div</span>
                            <span>&gt;</span>
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">8</div>
                          <div className="flex-1">
                            <span>&nbsp;&nbsp;);</span>
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">9</div>
                          <div className="flex-1">
                            <span>&#125;</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Destructive */}
          <div>
            <h3 className="text-lg font-medium mb-3 text-foreground">
              Destructive
            </h3>
            <div className="flex justify-start">
              <div className="w-[500px] border border-border rounded-lg overflow-hidden bg-background">
                <div className="flex items-center gap-0 border-b border-border">
                  <button
                    onClick={() => setShowDestructiveCode(false)}
                    className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                      !showDestructiveCode
                        ? 'text-foreground border-foreground'
                        : 'text-muted-foreground border-transparent hover:text-foreground'
                    }`}
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => setShowDestructiveCode(true)}
                    className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                      showDestructiveCode
                        ? 'text-foreground border-foreground'
                        : 'text-muted-foreground border-transparent hover:text-foreground'
                    }`}
                  >
                    Code
                  </button>
                </div>
                <div className="p-2 h-[450px] flex items-center justify-center">
                  {!showDestructiveCode ? (
                    <Button variant="destructive">Delete</Button>
                  ) : (
                    <div className="relative w-full h-full">
                      <div className="absolute top-4 right-4 z-10">
                        <button
                          onClick={async () => {
                            const code = `import { Button } from "@cosmic-ui/ui";

export function DestructiveButtonDemo() {
  return (
    <div className="flex justify-center">
      <Button variant="destructive">Delete</Button>
    </div>
  );
}`;
                            try {
                              await navigator.clipboard.writeText(code);
                              setCopiedStates(prev => ({
                                ...prev,
                                destructive: true,
                              }));
                              setTimeout(() => {
                                setCopiedStates(prev => ({
                                  ...prev,
                                  destructive: false,
                                }));
                              }, 2000);
                            } catch (err) {
                              console.error('Failed to copy text: ', err);
                            }
                          }}
                          className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {copiedStates.destructive ? (
                            <svg
                              className="h-4 w-4 text-green-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          ) : (
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                              />
                            </svg>
                          )}
                        </button>
                      </div>
                      <div className="bg-white dark:bg-black rounded-lg p-2 font-mono text-sm overflow-x-auto w-full h-full">
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">1</div>
                          <div className="flex-1">
                            <span className="keyword">import</span>{' '}
                            <span>&#123;</span> Button <span>&#125;</span>{' '}
                            <span className="keyword">from</span>{' '}
                            <span className="string">"@cosmic-ui/ui"</span>;
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">2</div>
                          <div className="flex-1"></div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">3</div>
                          <div className="flex-1">
                            <span className="keyword">export function</span>{' '}
                            <span className="function">DestructiveButtonDemo</span>
                            () <span>&#123;</span>
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">4</div>
                          <div className="flex-1">
                            <span>&nbsp;&nbsp;</span>
                            <span className="keyword">return</span> (
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">5</div>
                          <div className="flex-1">
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;&lt;</span>
                            <span className="tag">div</span> className=
                            <span className="string">
                              "flex justify-center"
                            </span>
                            <span>&gt;</span>
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">6</div>
                          <div className="flex-1">
                            <span>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;
                            </span>
                            <span className="tag">Button</span> variant=
                            <span className="string">"destructive"</span>
                            <span>&gt;</span>Delete<span>&lt;/</span>
                            <span className="tag">Button</span>
                            <span>&gt;</span>
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">7</div>
                          <div className="flex-1">
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/</span>
                            <span className="tag">div</span>
                            <span>&gt;</span>
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">8</div>
                          <div className="flex-1">
                            <span>&nbsp;&nbsp;);</span>
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">9</div>
                          <div className="flex-1">
                            <span>&#125;</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sizes */}
          <div>
            <h3 className="text-lg font-medium mb-3 text-foreground">
              Tailles
            </h3>
            <div className="flex justify-start">
              <div className="w-[500px] border border-border rounded-lg overflow-hidden bg-background">
                <div className="flex items-center gap-0 border-b border-border">
                  <button
                    onClick={() => setShowSizesCode(false)}
                    className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                      !showSizesCode
                        ? 'text-foreground border-foreground'
                        : 'text-muted-foreground border-transparent hover:text-foreground'
                    }`}
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => setShowSizesCode(true)}
                    className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                      showSizesCode
                        ? 'text-foreground border-foreground'
                        : 'text-muted-foreground border-transparent hover:text-foreground'
                    }`}
                  >
                    Code
                  </button>
                </div>
                <div className="p-2 h-[450px] flex items-center justify-center gap-4">
                  {!showSizesCode ? (
                    <>
                      <Button size="sm">Small</Button>
                      <Button>Default</Button>
                      <Button size="lg">Large</Button>
                    </>
                  ) : (
                    <div className="relative w-full h-full">
                      <div className="absolute top-4 right-4 z-10">
                        <button
                          onClick={async () => {
                            const code = `import { Button } from "@cosmic-ui/ui";

export function SizesButtonDemo() {
  return (
    <div className="flex justify-center gap-4">
      <Button size="sm">Small</Button>
      <Button>Default</Button>
      <Button size="lg">Large</Button>
    </div>
  );
}`;
                            try {
                              await navigator.clipboard.writeText(code);
                              setCopiedStates(prev => ({
                                ...prev,
                                sizes: true,
                              }));
                              setTimeout(() => {
                                setCopiedStates(prev => ({
                                  ...prev,
                                  sizes: false,
                                }));
                              }, 2000);
                            } catch (err) {
                              console.error('Failed to copy text: ', err);
                            }
                          }}
                          className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {copiedStates.sizes ? (
                            <svg
                              className="h-4 w-4 text-green-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          ) : (
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                              />
                            </svg>
                          )}
                        </button>
                      </div>
                      <div className="bg-white dark:bg-black rounded-lg p-2 font-mono text-sm overflow-x-auto w-full h-full">
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">1</div>
                          <div className="flex-1">
                            <span className="keyword">import</span>{' '}
                            <span>&#123;</span> Button <span>&#125;</span>{' '}
                            <span className="keyword">from</span>{' '}
                            <span className="string">"@cosmic-ui/ui"</span>;
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">2</div>
                          <div className="flex-1"></div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">3</div>
                          <div className="flex-1">
                            <span className="keyword">export function</span>{' '}
                            <span className="function">SizesButtonDemo</span>
                            () <span>&#123;</span>
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">4</div>
                          <div className="flex-1">
                            <span>&nbsp;&nbsp;</span>
                            <span className="keyword">return</span> (
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">5</div>
                          <div className="flex-1">
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;&lt;</span>
                            <span className="tag">div</span> className=
                            <span className="string">
                              "flex justify-center gap-4"
                            </span>
                            <span>&gt;</span>
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">6</div>
                          <div className="flex-1">
                            <span>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;
                            </span>
                            <span className="tag">Button</span> size=
                            <span className="string">"sm"</span>
                            <span>&gt;</span>Small<span>&lt;/</span>
                            <span className="tag">Button</span>
                            <span>&gt;</span>
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">7</div>
                          <div className="flex-1">
                            <span>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;
                            </span>
                            <span className="tag">Button</span>
                            <span>&gt;</span>Default<span>&lt;/</span>
                            <span className="tag">Button</span>
                            <span>&gt;</span>
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">8</div>
                          <div className="flex-1">
                            <span>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;
                            </span>
                            <span className="tag">Button</span> size=
                            <span className="string">"lg"</span>
                            <span>&gt;</span>Large<span>&lt;/</span>
                            <span className="tag">Button</span>
                            <span>&gt;</span>
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">9</div>
                          <div className="flex-1">
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/</span>
                            <span className="tag">div</span>
                            <span>&gt;</span>
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">10</div>
                          <div className="flex-1">
                            <span>&nbsp;&nbsp;);</span>
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">11</div>
                          <div className="flex-1">
                            <span>&#125;</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Disabled */}
          <div>
            <h3 className="text-lg font-medium mb-3 text-foreground">
              Désactivé
            </h3>
            <div className="flex justify-start">
              <div className="w-[500px] border border-border rounded-lg overflow-hidden bg-background">
                <div className="flex items-center gap-0 border-b border-border">
                  <button
                    onClick={() => setShowDisabledCode(false)}
                    className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                      !showDisabledCode
                        ? 'text-foreground border-foreground'
                        : 'text-muted-foreground border-transparent hover:text-foreground'
                    }`}
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => setShowDisabledCode(true)}
                    className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                      showDisabledCode
                        ? 'text-foreground border-foreground'
                        : 'text-muted-foreground border-transparent hover:text-foreground'
                    }`}
                  >
                    Code
                  </button>
                </div>
                <div className="p-2 h-[450px] flex items-center justify-center">
                  {!showDisabledCode ? (
                    <Button disabled>Disabled Button</Button>
                  ) : (
                    <div className="relative w-full h-full">
                      <div className="absolute top-4 right-4 z-10">
                        <button
                          onClick={async () => {
                            const code = `import { Button } from "@cosmic-ui/ui";

export function DisabledButtonDemo() {
  return (
    <div className="flex justify-center">
      <Button disabled>Disabled Button</Button>
    </div>
  );
}`;
                            try {
                              await navigator.clipboard.writeText(code);
                              setCopiedStates(prev => ({
                                ...prev,
                                disabled: true,
                              }));
                              setTimeout(() => {
                                setCopiedStates(prev => ({
                                  ...prev,
                                  disabled: false,
                                }));
                              }, 2000);
                            } catch (err) {
                              console.error('Failed to copy text: ', err);
                            }
                          }}
                          className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {copiedStates.disabled ? (
                            <svg
                              className="h-4 w-4 text-green-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          ) : (
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                              />
                            </svg>
                          )}
                        </button>
                      </div>
                      <div className="bg-white dark:bg-black rounded-lg p-2 font-mono text-sm overflow-x-auto w-full h-full">
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">1</div>
                          <div className="flex-1">
                            <span className="keyword">import</span>{' '}
                            <span>&#123;</span> Button <span>&#125;</span>{' '}
                            <span className="keyword">from</span>{' '}
                            <span className="string">"@cosmic-ui/ui"</span>;
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">2</div>
                          <div className="flex-1"></div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">3</div>
                          <div className="flex-1">
                            <span className="keyword">export function</span>{' '}
                            <span className="function">DisabledButtonDemo</span>
                            () <span>&#123;</span>
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">4</div>
                          <div className="flex-1">
                            <span>&nbsp;&nbsp;</span>
                            <span className="keyword">return</span> (
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">5</div>
                          <div className="flex-1">
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;&lt;</span>
                            <span className="tag">div</span> className=
                            <span className="string">
                              "flex justify-center"
                            </span>
                            <span>&gt;</span>
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">6</div>
                          <div className="flex-1">
                            <span>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;
                            </span>
                            <span className="tag">Button</span> disabled
                            <span>&gt;</span>Disabled Button<span>&lt;/</span>
                            <span className="tag">Button</span>
                            <span>&gt;</span>
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">7</div>
                          <div className="flex-1">
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/</span>
                            <span className="tag">div</span>
                            <span>&gt;</span>
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">8</div>
                          <div className="flex-1">
                            <span>&nbsp;&nbsp;);</span>
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">9</div>
                          <div className="flex-1">
                            <span>&#125;</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
