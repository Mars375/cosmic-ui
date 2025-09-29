'use client';

import { useState } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@cosmic-ui/ui';

export default function AccordionPage() {
  const [showCode, setShowCode] = useState(false);
  const [showSingleCode, setShowSingleCode] = useState(false);
  const [showMultipleCode, setShowMultipleCode] = useState(false);
  const [copiedStates, setCopiedStates] = useState({
    main: false,
    single: false,
    multiple: false,
  });
  const [packageManager, setPackageManager] = useState('pnpm');

  const installCommands = {
    pnpm: 'pnpm add @cosmic-ui/ui',
    npm: 'npm install @cosmic-ui/ui',
    yarn: 'yarn add @cosmic-ui/ui',
  };

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
          <p className="text-lg text-muted-foreground mb-4">
            Le composant Accordion permet d'afficher du contenu de manière
            organisée avec des sections pliables et dépliables. Idéal pour les
            FAQ, les menus de navigation, ou toute interface nécessitant une
            organisation hiérarchique du contenu.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
              Caractéristiques principales
            </h3>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>• Support des modes single et multiple</li>
              <li>• Accessibilité complète avec ARIA</li>
              <li>• Animations fluides d'ouverture/fermeture</li>
              <li>• Support des thèmes light/dark</li>
              <li>• Contenu personnalisable (texte, composants React)</li>
              <li>• Icône de chevron avec rotation automatique</li>
            </ul>
          </div>
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
              <div className="p-2 min-h-[450px] flex items-center justify-start">
                {!showCode ? (
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>
                        Qu'est-ce que CosmicUI ?
                      </AccordionTrigger>
                      <AccordionContent>
                        CosmicUI est une bibliothèque de composants React
                        moderne et accessible, conçue pour créer des interfaces
                        utilisateur élégantes et performantes.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>
                        Comment installer CosmicUI ?
                      </AccordionTrigger>
                      <AccordionContent>
                        Vous pouvez installer CosmicUI via npm, pnpm ou yarn :
                        npm install @cosmic-ui/ui
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>
                        CosmicUI est-il gratuit ?
                      </AccordionTrigger>
                      <AccordionContent>
                        Oui, CosmicUI est entièrement gratuit et open source
                        sous licence MIT.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ) : (
                  <div className="relative w-full">
                    <div className="absolute top-4 right-4 z-10">
                      <button
                        onClick={async () => {
                          const code = `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@cosmic-ui/ui";

export function AccordionDemo() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Qu'est-ce que CosmicUI ?</AccordionTrigger>
        <AccordionContent>
          CosmicUI est une bibliothèque de composants React moderne et accessible.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Comment installer CosmicUI ?</AccordionTrigger>
        <AccordionContent>
          Vous pouvez installer CosmicUI via npm : npm install @cosmic-ui/ui
        </AccordionContent>
      </AccordionItem>
    </Accordion>
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
                    <div className="bg-white dark:bg-black rounded-lg p-2 font-mono text-sm overflow-x-auto w-full">
                      <div className="flex" data-line>
                        <div className="select-none pr-4 text-right text-gray-400 w-8">
                          1
                        </div>
                        <div className="flex-1">
                          <span className="keyword">import</span>{' '}
                          <span>&#123;</span> Accordion, AccordionItem,
                          AccordionTrigger, AccordionContent <span>&#125;</span>{' '}
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
                          <span className="keyword">return</span> (
                        </div>
                      </div>
                      <div className="flex" data-line>
                        <div className="select-none pr-4 text-right text-gray-400 w-8">
                          5
                        </div>
                        <div className="flex-1">
                          <span>&nbsp;&nbsp;&nbsp;&nbsp;&lt;</span>
                          <span className="tag">Accordion</span> type=
                          <span className="string">"single"</span> collapsible
                          className=
                          <span className="string">"w-full"</span>
                          <span>&gt;</span>
                        </div>
                      </div>
                      <div className="flex" data-line>
                        <div className="select-none pr-4 text-right text-gray-400 w-8">
                          6
                        </div>
                        <div className="flex-1">
                          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;</span>
                          <span className="tag">AccordionItem</span> value=
                          <span className="string">"item-1"</span>
                          <span>&gt;</span>
                        </div>
                      </div>
                      <div className="flex" data-line>
                        <div className="select-none pr-4 text-right text-gray-400 w-8">
                          7
                        </div>
                        <div className="flex-1">
                          <span>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;
                          </span>
                          <span className="tag">AccordionTrigger</span>
                          <span>&gt;</span>Qu'est-ce que CosmicUI ?&lt;/
                          <span className="tag">AccordionTrigger</span>
                          <span>&gt;</span>
                        </div>
                      </div>
                      <div className="flex" data-line>
                        <div className="select-none pr-4 text-right text-gray-400 w-8">
                          8
                        </div>
                        <div className="flex-1">
                          <span>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;
                          </span>
                          <span className="tag">AccordionContent</span>
                          <span>&gt;</span>
                        </div>
                      </div>
                      <div className="flex" data-line>
                        <div className="select-none pr-4 text-right text-gray-400 w-8">
                          9
                        </div>
                        <div className="flex-1">
                          <span>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          </span>
                          CosmicUI est une bibliothèque de composants React...
                        </div>
                      </div>
                      <div className="flex" data-line>
                        <div className="select-none pr-4 text-right text-gray-400 w-8">
                          10
                        </div>
                        <div className="flex-1">
                          <span>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/
                          </span>
                          <span className="tag">AccordionContent</span>
                          <span>&gt;</span>
                        </div>
                      </div>
                      <div className="flex" data-line>
                        <div className="select-none pr-4 text-right text-gray-400 w-8">
                          11
                        </div>
                        <div className="flex-1">
                          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/</span>
                          <span className="tag">AccordionItem</span>
                          <span>&gt;</span>
                        </div>
                      </div>
                      <div className="flex" data-line>
                        <div className="select-none pr-4 text-right text-gray-400 w-8">
                          12
                        </div>
                        <div className="flex-1">
                          <span>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/</span>
                          <span className="tag">Accordion</span>
                          <span>&gt;</span>
                        </div>
                      </div>
                      <div className="flex" data-line>
                        <div className="select-none pr-4 text-right text-gray-400 w-8">
                          13
                        </div>
                        <div className="flex-1">
                          <span>&nbsp;&nbsp;);</span>
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
          <p className="text-muted-foreground mb-4">
            Le composant Accordion est inclus dans le package @cosmic-ui/ui.
          </p>
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
                  onClick={() => setPackageManager('pnpm')}
                  className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 h-7 border border-transparent pt-0.5 ${
                    packageManager === 'pnpm'
                      ? 'bg-accent border-input shadow-none'
                      : 'data-[state=active]:bg-accent data-[state=active]:border-input data-[state=active]:shadow-none'
                  }`}
                >
                  pnpm
                </button>
                <button
                  onClick={() => setPackageManager('npm')}
                  className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 h-7 border border-transparent pt-0.5 ${
                    packageManager === 'npm'
                      ? 'bg-accent border-input shadow-none'
                      : 'data-[state=active]:bg-accent data-[state=active]:border-input data-[state=active]:shadow-none'
                  }`}
                >
                  npm
                </button>
                <button
                  onClick={() => setPackageManager('yarn')}
                  className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 h-7 border border-transparent pt-0.5 ${
                    packageManager === 'yarn'
                      ? 'bg-accent border-input shadow-none'
                      : 'data-[state=active]:bg-accent data-[state=active]:border-input data-[state=active]:shadow-none'
                  }`}
                >
                  yarn
                </button>
              </div>
            </div>
            <div className="px-4 py-3.5 bg-white dark:bg-black">
              <pre className="font-mono text-sm leading-relaxed">
                <code>
                  {
                    installCommands[
                      packageManager as keyof typeof installCommands
                    ]
                  }
                </code>
              </pre>
            </div>
          </div>
        </div>

        {/* Usage */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Usage</h2>
          <p className="text-muted-foreground mb-4">
            L'Accordion utilise une structure composée de 4 composants
            principaux : Accordion (conteneur), AccordionItem (élément),
            AccordionTrigger (déclencheur) et AccordionContent (contenu).
          </p>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-700 px-3 py-1 mb-3">
              <div className="bg-gray-800 dark:bg-gray-200 flex size-4 items-center justify-center rounded-[1px] opacity-70">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="fill-gray-200 dark:fill-gray-800 w-4 h-4"
                >
                  <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"></path>
                </svg>
              </div>
              <span className="text-gray-600 dark:text-gray-400 text-sm">
                usage.tsx
              </span>
            </div>
            <div className="px-4 py-3.5 bg-white dark:bg-black">
              <pre className="font-mono text-sm leading-relaxed">
                <code>
                  <div className="flex" data-line>
                    <div className="select-none pr-4 text-right text-gray-400 w-8">
                      1
                    </div>
                    <div className="flex-1">
                      <span className="keyword">import</span>{' '}
                      <span>&#123;</span> Accordion, AccordionItem,
                      AccordionTrigger, AccordionContent <span>&#125;</span>{' '}
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
                      <span className="function">MyAccordion</span>
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
                      <span className="tag">Accordion</span> type=
                      <span className="string">"single"</span> collapsible
                      <span>&gt;</span>
                    </div>
                  </div>
                  <div className="flex" data-line>
                    <div className="select-none pr-4 text-right text-gray-400 w-8">
                      6
                    </div>
                    <div className="flex-1">
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;</span>
                      <span className="tag">AccordionItem</span> value=
                      <span className="string">"item-1"</span>
                      <span>&gt;</span>
                    </div>
                  </div>
                  <div className="flex" data-line>
                    <div className="select-none pr-4 text-right text-gray-400 w-8">
                      7
                    </div>
                    <div className="flex-1">
                      <span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;
                      </span>
                      <span className="tag">AccordionTrigger</span>
                      <span>&gt;</span>Question 1&lt;/
                      <span className="tag">AccordionTrigger</span>
                      <span>&gt;</span>
                    </div>
                  </div>
                  <div className="flex" data-line>
                    <div className="select-none pr-4 text-right text-gray-400 w-8">
                      8
                    </div>
                    <div className="flex-1">
                      <span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;
                      </span>
                      <span className="tag">AccordionContent</span>
                      <span>&gt;</span>Réponse 1&lt;/
                      <span className="tag">AccordionContent</span>
                      <span>&gt;</span>
                    </div>
                  </div>
                  <div className="flex" data-line>
                    <div className="select-none pr-4 text-right text-gray-400 w-8">
                      9
                    </div>
                    <div className="flex-1">
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/</span>
                      <span className="tag">AccordionItem</span>
                      <span>&gt;</span>
                    </div>
                  </div>
                  <div className="flex" data-line>
                    <div className="select-none pr-4 text-right text-gray-400 w-8">
                      10
                    </div>
                    <div className="flex-1">
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/</span>
                      <span className="tag">Accordion</span>
                      <span>&gt;</span>
                    </div>
                  </div>
                  <div className="flex" data-line>
                    <div className="select-none pr-4 text-right text-gray-400 w-8">
                      11
                    </div>
                    <div className="flex-1">
                      <span>&nbsp;&nbsp;);</span>
                    </div>
                  </div>
                  <div className="flex" data-line>
                    <div className="select-none pr-4 text-right text-gray-400 w-8">
                      12
                    </div>
                    <div className="flex-1">
                      <span>&#125;</span>
                    </div>
                  </div>
                </code>
              </pre>
            </div>
          </div>
        </div>

        {/* Variants */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">
            Variants
          </h2>

          {/* Single (par défaut) */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3 text-foreground">
              Single (par défaut)
            </h3>
            <p className="text-muted-foreground mb-4 text-sm">
              Un seul élément peut être ouvert à la fois. Parfait pour les FAQ
              ou les menus de navigation. L'élément ouvert peut être refermé en
              cliquant dessus.
            </p>
            <div className="flex justify-start">
              <div className="w-[500px] border border-border rounded-lg overflow-hidden bg-background">
                <div className="flex items-center gap-0 border-b border-border">
                  <button
                    onClick={() => setShowSingleCode(false)}
                    className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                      !showSingleCode
                        ? 'text-foreground border-foreground'
                        : 'text-muted-foreground border-transparent hover:text-foreground'
                    }`}
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => setShowSingleCode(true)}
                    className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                      showSingleCode
                        ? 'text-foreground border-foreground'
                        : 'text-muted-foreground border-transparent hover:text-foreground'
                    }`}
                  >
                    Code
                  </button>
                  {showSingleCode && (
                    <div className="ml-auto pr-4">
                      <button
                        onClick={async () => {
                          const code = `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@cosmic-ui/ui";

export function SingleAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Qu'est-ce que CosmicUI ?</AccordionTrigger>
        <AccordionContent>
          CosmicUI est une bibliothèque de composants React moderne et accessible.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Comment installer CosmicUI ?</AccordionTrigger>
        <AccordionContent>
          Vous pouvez installer CosmicUI via npm : npm install @cosmic-ui/ui
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}`;
                          try {
                            await navigator.clipboard.writeText(code);
                            setCopiedStates(prev => ({ ...prev, single: true }));
                            setTimeout(() => {
                              setCopiedStates(prev => ({
                                ...prev,
                                single: false,
                              }));
                            }, 2000);
                          } catch (err) {
                            console.error('Failed to copy text: ', err);
                          }
                        }}
                        className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {copiedStates.single ? (
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
                  )}
                </div>
                <div className="p-2 min-h-[450px] flex items-center justify-start">
                  {!showSingleCode ? (
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>
                          Qu'est-ce que CosmicUI ?
                        </AccordionTrigger>
                        <AccordionContent>
                          CosmicUI est une bibliothèque de composants React
                          moderne et accessible.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                        <AccordionTrigger>
                          Comment installer CosmicUI ?
                        </AccordionTrigger>
                        <AccordionContent>
                          Vous pouvez installer CosmicUI via npm : npm install
                          @cosmic-ui/ui
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ) : (
                    <div className="relative w-full">
                      <div className="bg-white dark:bg-black rounded-lg p-2 font-mono text-sm overflow-x-auto w-full">
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">
                            1
                          </div>
                          <div className="flex-1">
                            <span className="keyword">import</span>{' '}
                            <span>&#123;</span> Accordion, AccordionItem,
                            AccordionTrigger, AccordionContent <span>&#125;</span>{' '}
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
                            <span className="function">SingleAccordion</span>
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
                            <span className="tag">Accordion</span> type=
                            <span className="string">"single"</span> collapsible className=
                            <span className="string">"w-full"</span>
                            <span>&gt;</span>
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">
                            6
                          </div>
                          <div className="flex-1">
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;</span>
                            <span className="tag">AccordionItem</span> value=
                            <span className="string">"item-1"</span>
                            <span>&gt;</span>
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">
                            7
                          </div>
                          <div className="flex-1">
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;</span>
                            <span className="tag">AccordionTrigger</span>
                            <span>&gt;</span>Qu'est-ce que CosmicUI ?&lt;/
                            <span className="tag">AccordionTrigger</span>
                            <span>&gt;</span>
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">
                            8
                          </div>
                          <div className="flex-1">
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;</span>
                            <span className="tag">AccordionContent</span>
                            <span>&gt;</span>
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">
                            9
                          </div>
                          <div className="flex-1">
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            CosmicUI est une bibliothèque de composants React...
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">
                            10
                          </div>
                          <div className="flex-1">
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/</span>
                            <span className="tag">AccordionContent</span>
                            <span>&gt;</span>
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">
                            11
                          </div>
                          <div className="flex-1">
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/</span>
                            <span className="tag">AccordionItem</span>
                            <span>&gt;</span>
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">
                            12
                          </div>
                          <div className="flex-1">
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;</span>
                            <span className="tag">AccordionItem</span> value=
                            <span className="string">"item-2"</span>
                            <span>&gt;</span>
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">
                            13
                          </div>
                          <div className="flex-1">
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;</span>
                            <span className="tag">AccordionTrigger</span>
                            <span>&gt;</span>Comment installer CosmicUI ?&lt;/
                            <span className="tag">AccordionTrigger</span>
                            <span>&gt;</span>
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">
                            14
                          </div>
                          <div className="flex-1">
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;</span>
                            <span className="tag">AccordionContent</span>
                            <span>&gt;</span>
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">
                            15
                          </div>
                          <div className="flex-1">
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            Vous pouvez installer CosmicUI via npm...
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">
                            16
                          </div>
                          <div className="flex-1">
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/</span>
                            <span className="tag">AccordionContent</span>
                            <span>&gt;</span>
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">
                            17
                          </div>
                          <div className="flex-1">
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/</span>
                            <span className="tag">AccordionItem</span>
                            <span>&gt;</span>
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">
                            18
                          </div>
                          <div className="flex-1">
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/</span>
                            <span className="tag">Accordion</span>
                            <span>&gt;</span>
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">
                            19
                          </div>
                          <div className="flex-1">
                            <span>&nbsp;&nbsp;);</span>
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">
                            20
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

          {/* Multiple */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3 text-foreground">
              Multiple
            </h3>
            <p className="text-muted-foreground mb-4 text-sm">
              Plusieurs éléments peuvent être ouverts simultanément. Idéal pour
              les sections de contenu indépendantes.
            </p>
            <div className="flex justify-start">
              <div className="w-[500px] border border-border rounded-lg overflow-hidden bg-background">
                <div className="flex items-center gap-0 border-b border-border">
                  <button
                    onClick={() => setShowMultipleCode(false)}
                    className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                      !showMultipleCode
                        ? 'text-foreground border-foreground'
                        : 'text-muted-foreground border-transparent hover:text-foreground'
                    }`}
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => setShowMultipleCode(true)}
                    className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                      showMultipleCode
                        ? 'text-foreground border-foreground'
                        : 'text-muted-foreground border-transparent hover:text-foreground'
                    }`}
                  >
                    Code
                  </button>
                  {showMultipleCode && (
                    <div className="ml-auto pr-4">
                      <button
                        onClick={async () => {
                          const code = `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@cosmic-ui/ui";

export function MultipleAccordion() {
  return (
    <Accordion type="multiple" className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Qu'est-ce que CosmicUI ?</AccordionTrigger>
        <AccordionContent>
          CosmicUI est une bibliothèque de composants React moderne et accessible.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Comment installer CosmicUI ?</AccordionTrigger>
        <AccordionContent>
          Vous pouvez installer CosmicUI via npm : npm install @cosmic-ui/ui
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}`;
                          try {
                            await navigator.clipboard.writeText(code);
                            setCopiedStates(prev => ({ ...prev, multiple: true }));
                            setTimeout(() => {
                              setCopiedStates(prev => ({
                                ...prev,
                                multiple: false,
                              }));
                            }, 2000);
                          } catch (err) {
                            console.error('Failed to copy text: ', err);
                          }
                        }}
                        className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {copiedStates.multiple ? (
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
                  )}
                </div>
                <div className="p-2 min-h-[450px] flex items-center justify-start">
                  {!showMultipleCode ? (
                    <Accordion type="multiple" className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>
                          Qu'est-ce que CosmicUI ?
                        </AccordionTrigger>
                        <AccordionContent>
                          CosmicUI est une bibliothèque de composants React
                          moderne et accessible.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                        <AccordionTrigger>
                          Comment installer CosmicUI ?
                        </AccordionTrigger>
                        <AccordionContent>
                          Vous pouvez installer CosmicUI via npm : npm install
                          @cosmic-ui/ui
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ) : (
                    <div className="relative w-full">
                      <div className="bg-white dark:bg-black rounded-lg p-2 font-mono text-sm overflow-x-auto w-full">
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">
                            1
                          </div>
                          <div className="flex-1">
                            <span className="keyword">import</span>{' '}
                            <span>&#123;</span> Accordion, AccordionItem,
                            AccordionTrigger, AccordionContent <span>&#125;</span>{' '}
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
                            <span className="function">MultipleAccordion</span>
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
                            <span className="tag">Accordion</span> type=
                            <span className="string">"multiple"</span> className=
                            <span className="string">"w-full"</span>
                            <span>&gt;</span>
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">
                            6
                          </div>
                          <div className="flex-1">
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;</span>
                            <span className="tag">AccordionItem</span> value=
                            <span className="string">"item-1"</span>
                            <span>&gt;</span>
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">
                            7
                          </div>
                          <div className="flex-1">
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;</span>
                            <span className="tag">AccordionTrigger</span>
                            <span>&gt;</span>Qu'est-ce que CosmicUI ?&lt;/
                            <span className="tag">AccordionTrigger</span>
                            <span>&gt;</span>
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">
                            8
                          </div>
                          <div className="flex-1">
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;</span>
                            <span className="tag">AccordionContent</span>
                            <span>&gt;</span>
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">
                            9
                          </div>
                          <div className="flex-1">
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            CosmicUI est une bibliothèque de composants React...
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">
                            10
                          </div>
                          <div className="flex-1">
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/</span>
                            <span className="tag">AccordionContent</span>
                            <span>&gt;</span>
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">
                            11
                          </div>
                          <div className="flex-1">
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/</span>
                            <span className="tag">AccordionItem</span>
                            <span>&gt;</span>
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">
                            12
                          </div>
                          <div className="flex-1">
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;</span>
                            <span className="tag">AccordionItem</span> value=
                            <span className="string">"item-2"</span>
                            <span>&gt;</span>
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">
                            13
                          </div>
                          <div className="flex-1">
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;</span>
                            <span className="tag">AccordionTrigger</span>
                            <span>&gt;</span>Comment installer CosmicUI ?&lt;/
                            <span className="tag">AccordionTrigger</span>
                            <span>&gt;</span>
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">
                            14
                          </div>
                          <div className="flex-1">
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;</span>
                            <span className="tag">AccordionContent</span>
                            <span>&gt;</span>
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">
                            15
                          </div>
                          <div className="flex-1">
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            Vous pouvez installer CosmicUI via npm...
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">
                            16
                          </div>
                          <div className="flex-1">
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/</span>
                            <span className="tag">AccordionContent</span>
                            <span>&gt;</span>
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">
                            17
                          </div>
                          <div className="flex-1">
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/</span>
                            <span className="tag">AccordionItem</span>
                            <span>&gt;</span>
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">
                            18
                          </div>
                          <div className="flex-1">
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/</span>
                            <span className="tag">Accordion</span>
                            <span>&gt;</span>
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">
                            19
                          </div>
                          <div className="flex-1">
                            <span>&nbsp;&nbsp;);</span>
                          </div>
                        </div>
                        <div className="flex" data-line>
                          <div className="select-none pr-4 text-right text-gray-400 w-8">
                            20
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
        </div>
      </div>
    </div>
  );
}
