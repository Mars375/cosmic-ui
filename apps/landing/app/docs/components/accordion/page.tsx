'use client';

import { useState } from 'react';
import { Accordion } from '@cosmic-ui/ui';

export default function AccordionPage() {
  const [showCode, setShowCode] = useState(false);
  const [copiedStates, setCopiedStates] = useState({
    main: false,
  });

  const accordionItems = [
    {
      value: 'item-1',
      header: "Qu'est-ce que CosmicUI ?",
      content:
        'CosmicUI est une bibliothèque de composants React moderne et accessible, conçue pour créer des interfaces utilisateur élégantes et performantes.',
    },
    {
      value: 'item-2',
      header: 'Comment installer CosmicUI ?',
      content:
        'Vous pouvez installer CosmicUI via npm ou yarn : npm install @cosmic-ui/ui',
    },
    {
      value: 'item-3',
      header: 'CosmicUI est-il gratuit ?',
      content:
        'Oui, CosmicUI est entièrement gratuit et open source sous licence MIT.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header avec navigation */}
        <div className="flex items-center gap-4 mb-8">
          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
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
          <h1 className="text-3xl font-bold text-foreground">Accordion</h1>
          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
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

        {/* Résumé */}
        <div className="mb-8">
          <p className="text-lg text-muted-foreground">
            Un composant accordion permet d'afficher du contenu de manière
            organisée avec des sections pliables et dépliables.
          </p>
        </div>

        {/* Preview principale */}
        <div className="mb-12">
          <div className="flex justify-start">
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
              <div className="p-2 h-[450px] flex items-center justify-start">
                {!showCode ? (
                  <Accordion items={accordionItems} />
                ) : (
                  <div className="relative w-full h-full">
                    <div className="absolute top-4 right-4 z-10">
                      <button
                        onClick={async () => {
                          const code = `import { Accordion } from "@cosmic-ui/ui";

export function AccordionDemo() {
  const accordionItems = [
    {
      value: 'item-1',
      header: 'Qu\\'est-ce que CosmicUI ?',
      content: 'CosmicUI est une bibliothèque de composants React moderne et accessible.'
    },
    {
      value: 'item-2',
      header: 'Comment installer CosmicUI ?',
      content: 'Vous pouvez installer CosmicUI via npm : npm install @cosmic-ui/ui'
    }
  ];

  return (
    <div className="flex justify-center">
      <Accordion items={accordionItems} />
    </div>
  );
}`;
                          try {
                            await navigator.clipboard.writeText(code);
                            setCopiedStates(prev => ({ ...prev, main: true }));
                            setTimeout(() => {
                              setCopiedStates(prev => ({
                                ...prev,
                                main: false,
                              }));
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
                          <span>&#123;</span> Accordion <span>&#125;</span>{' '}
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
                          <span className="function">AccordionDemo</span>
                          () <span>&#123;</span>
                        </div>
                      </div>
                      <div className="flex" data-line>
                        <div className="select-none pr-4 text-right text-gray-400 w-8">
                          4
                        </div>
                        <div className="flex-1">
                          <span>&nbsp;&nbsp;</span>
                          <span className="keyword">const</span> accordionItems
                          = [
                        </div>
                      </div>
                      <div className="flex" data-line>
                        <div className="select-none pr-4 text-right text-gray-400 w-8">
                          5
                        </div>
                        <div className="flex-1">
                          <span>&nbsp;&nbsp;&nbsp;&nbsp;&#123;</span>
                        </div>
                      </div>
                      <div className="flex" data-line>
                        <div className="select-none pr-4 text-right text-gray-400 w-8">
                          6
                        </div>
                        <div className="flex-1">
                          <span>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;value:
                          </span>{' '}
                          <span className="string">'item-1'</span>,
                        </div>
                      </div>
                      <div className="flex" data-line>
                        <div className="select-none pr-4 text-right text-gray-400 w-8">
                          7
                        </div>
                        <div className="flex-1">
                          <span>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;header:
                          </span>{' '}
                          <span className="string">
                            'Qu\\'est-ce que CosmicUI ?'
                          </span>
                          ,
                        </div>
                      </div>
                      <div className="flex" data-line>
                        <div className="select-none pr-4 text-right text-gray-400 w-8">
                          8
                        </div>
                        <div className="flex-1">
                          <span>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;content:
                          </span>{' '}
                          <span className="string">
                            'CosmicUI est une bibliothèque...'
                          </span>
                        </div>
                      </div>
                      <div className="flex" data-line>
                        <div className="select-none pr-4 text-right text-gray-400 w-8">
                          9
                        </div>
                        <div className="flex-1">
                          <span>&nbsp;&nbsp;&nbsp;&nbsp;&#125;</span>
                        </div>
                      </div>
                      <div className="flex" data-line>
                        <div className="select-none pr-4 text-right text-gray-400 w-8">
                          10
                        </div>
                        <div className="flex-1">
                          <span>&nbsp;&nbsp;];</span>
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
                          <span>&nbsp;&nbsp;</span>
                          <span className="keyword">return</span> (
                        </div>
                      </div>
                      <div className="flex" data-line>
                        <div className="select-none pr-4 text-right text-gray-400 w-8">
                          13
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
                          14
                        </div>
                        <div className="flex-1">
                          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;</span>
                          <span className="tag">Accordion</span> items=
                          <span>&#123;</span>accordionItems<span>&#125;</span>
                          <span>&nbsp;/&gt;</span>
                        </div>
                      </div>
                      <div className="flex" data-line>
                        <div className="select-none pr-4 text-right text-gray-400 w-8">
                          15
                        </div>
                        <div className="flex-1">
                          <span>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/</span>
                          <span className="tag">div</span>
                          <span>&gt;</span>
                        </div>
                      </div>
                      <div className="flex" data-line>
                        <div className="select-none pr-4 text-right text-gray-400 w-8">
                          16
                        </div>
                        <div className="flex-1">
                          <span>&nbsp;&nbsp;);</span>
                        </div>
                      </div>
                      <div className="flex" data-line>
                        <div className="select-none pr-4 text-right text-gray-400 w-8">
                          17
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

        {/* Installation */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">
            Installation
          </h2>
          <div className="bg-muted p-4 rounded-lg">
            <code className="text-sm">npm install @cosmic-ui/ui</code>
          </div>
        </div>

        {/* Usage */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Usage</h2>
          <div className="bg-muted p-4 rounded-lg">
            <code className="text-sm">
              import &#123; Accordion &#125; from "@cosmic-ui/ui";
            </code>
          </div>
        </div>

        {/* Variants */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">
            Variants
          </h2>

          {/* Multiple */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3 text-foreground">
              Multiple
            </h3>
            <div className="flex justify-start">
              <div className="w-[500px] border border-border rounded-lg overflow-hidden bg-background">
                <div className="flex items-center gap-0 border-b border-border">
                  <button className="px-4 py-3 text-sm font-medium text-foreground border-b-2 border-foreground">
                    Preview
                  </button>
                  <button className="px-4 py-3 text-sm font-medium text-muted-foreground border-b-2 border-transparent">
                    Code
                  </button>
                </div>
                <div className="p-2 h-[450px] flex items-center justify-start">
                  <Accordion items={accordionItems} type="multiple" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
