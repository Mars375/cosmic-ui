'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { codeToHtml } from 'shiki';
import {
  getHighlighter,
  getTheme,
  isLanguageSupported,
} from '../../lib/shiki-config';

interface CodeBlockProps {
  children: string;
  language?: string;
  packageManager?: 'pnpm' | 'npm' | 'yarn' | 'bun';
  showPackageManager?: boolean;
  filePath: string;
  showImports?: boolean;
  imports?: string[];
}

// Icônes pour différents langages
const getLanguageIcon = (lang: string) => {
  const icons: Record<string, JSX.Element> = {
    bash: (
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
        className="lucide lucide-terminal text-white dark:text-black size-3"
      >
        <polyline points="4 17 10 11 4 5"></polyline>
        <line x1="12" x2="20" y1="19" y2="19"></line>
      </svg>
    ),
    terminal: (
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
        className="lucide lucide-terminal text-white dark:text-black size-3"
      >
        <polyline points="4 17 10 11 4 5"></polyline>
        <line x1="12" x2="20" y1="19" y2="19"></line>
      </svg>
    ),
    shell: (
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
        className="lucide lucide-terminal text-white dark:text-black size-3"
      >
        <polyline points="4 17 10 11 4 5"></polyline>
        <line x1="12" x2="20" y1="19" y2="19"></line>
      </svg>
    ),
    sh: (
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
        className="lucide lucide-terminal text-white dark:text-black size-3"
      >
        <polyline points="4 17 10 11 4 5"></polyline>
        <line x1="12" x2="20" y1="19" y2="19"></line>
      </svg>
    ),
    zsh: (
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
        className="lucide lucide-terminal text-white dark:text-black size-3"
      >
        <polyline points="4 17 10 11 4 5"></polyline>
        <line x1="12" x2="20" y1="19" y2="19"></line>
      </svg>
    ),
    fish: (
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
        className="lucide lucide-terminal text-white dark:text-black size-3"
      >
        <polyline points="4 17 10 11 4 5"></polyline>
        <line x1="12" x2="20" y1="19" y2="19"></line>
      </svg>
    ),
    typescript: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="fill-foreground"
      >
        <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"></path>
      </svg>
    ),
    javascript: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#F7DF1E" />
        <path
          d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"
          fill="black"
        />
      </svg>
    ),
    css: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#1572B6" />
        <path
          d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"
          fill="white"
        />
      </svg>
    ),
    json: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"></path>
        <path d="M10 6h4"></path>
        <path d="M10 10h4"></path>
        <path d="M10 14h4"></path>
        <path d="M10 18h4"></path>
      </svg>
    ),
    python: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#3776ab" />
        <path
          d="M12.5 2.5c-1.5 0-2.5 1-2.5 2.5v2.5h5V5c0-1.5-1-2.5-2.5-2.5zM7.5 5c0-1.5 1-2.5 2.5-2.5s2.5 1 2.5 2.5v2.5h-5V5zM7.5 10v7.5c0 1.5 1 2.5 2.5 2.5s2.5-1 2.5-2.5V10h-5zM16.5 5c0-1.5 1-2.5 2.5-2.5s2.5 1 2.5 2.5v2.5h-5V5zM16.5 10v7.5c0 1.5 1 2.5 2.5 2.5s2.5-1 2.5-2.5V10h-5z"
          fill="white"
        />
      </svg>
    ),
    react: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="2" fill="#61dafb" />
        <path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
          fill="#61dafb"
        />
        <path
          d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"
          fill="#61dafb"
        />
      </svg>
    ),
    sql: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#336791" />
        <path
          d="M4 6h16v2H4V6zm0 4h16v2H4v-2zm0 4h16v2H4v-2zm0 4h16v2H4v-2z"
          fill="white"
        />
      </svg>
    ),
    default: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="4 17 10 11 4 5"></polyline>
        <line x1="12" x2="20" y1="19" y2="19"></line>
      </svg>
    ),
  };

  return icons[lang] || icons.default;
};

// Hook pour la coloration syntaxique avec Shiki
const useShikiHighlight = (code: string, lang: string, isDark: boolean) => {
  const [highlightedCode, setHighlightedCode] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const highlight = async () => {
      try {
        setIsLoading(true);

        // Vérifier si le langage est supporté
        const supportedLang = isLanguageSupported(lang) ? lang : 'bash';
        const theme = getTheme(isDark);

        const html = await codeToHtml(code, {
          lang: supportedLang,
          theme: theme,
          transformers: [
            {
              name: 'line-numbers',
              code(node) {
                // Ajouter des numéros de ligne
                this.addClassToHast(node, 'line-numbers');
              },
            },
            {
              name: 'highlight-lines',
              line(node, line) {
                // Support pour la mise en évidence de lignes spécifiques
                if (node.properties?.['data-highlight']) {
                  this.addClassToHast(node, 'highlighted-line');
                }
              },
            },
            {
              name: 'fix-jsx-text',
              code(node) {
                // Corriger la coloration du texte dans les balises JSX
                this.addClassToHast(node, 'jsx-fixed');
              },
            },
            {
              name: 'highlight-components',
              code(node) {
                // Ajouter des classes pour la coloration des composants
                this.addClassToHast(node, 'component-highlighted');
              },
            },
          ],
        });
        setHighlightedCode(html);
      } catch (error) {
        console.error('Error highlighting code:', error);
        setHighlightedCode(code);
      } finally {
        setIsLoading(false);
      }
    };

    highlight();
  }, [code, lang, isDark]);

  return { highlightedCode, isLoading };
};

export function CodeBlock({
  children,
  language = 'bash',
  packageManager = 'pnpm',
  showPackageManager = true,
  filePath,
  showImports = true,
  imports = [],
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [activeManager, setActiveManager] = useState(packageManager);
  const [isExpanded, setIsExpanded] = useState(false);
  const { theme, resolvedTheme } = useTheme();

  const isDark = resolvedTheme === 'dark' || theme === 'dark';

  // Convertir children en string si nécessaire
  const rawCodeString =
    typeof children === 'string' ? children : String(children || '');

  // Fonction pour détecter automatiquement les composants utilisés et générer les imports
  const generateImports = (code: string, customImports: string[] = []) => {
    if (
      !showImports ||
      language === 'bash' ||
      language === 'terminal' ||
      language === 'json' ||
      language === 'css' ||
      language === 'html'
    ) {
      return '';
    }

    const componentPattern = /<([A-Z][a-zA-Z0-9]*)/g;
    const components = new Set<string>();
    let match;

    while ((match = componentPattern.exec(code)) !== null) {
      components.add(match[1]);
    }

    const imports: string[] = [];

    // Imports personnalisés fournis
    if (customImports.length > 0) {
      imports.push(...customImports);
    }

    // Import des composants détectés depuis cosmic-ui-mars
    if (components.size > 0) {
      const componentList = Array.from(components).sort().join(', ');
      imports.push(`import { ${componentList} } from 'cosmic-ui-mars';`);
    }

    // Imports React si nécessaire
    if (
      code.includes('useState') ||
      code.includes('useEffect') ||
      code.includes('React.')
    ) {
      imports.push(`import * as React from 'react';`);
      if (code.includes('useState') || code.includes('useEffect')) {
        const hooks = [];
        if (code.includes('useState')) hooks.push('useState');
        if (code.includes('useEffect')) hooks.push('useEffect');
        imports.push(`import { ${hooks.join(', ')} } from 'react';`);
      }
    }

    return imports.length > 0 ? imports.join('\n') + '\n\n' : '';
  };

  // Générer le code complet avec imports
  const codeString = showImports
    ? generateImports(rawCodeString, imports) + rawCodeString
    : rawCodeString;

  const getCommand = () => {
    if (!showPackageManager) return codeString;
    return codeString.replace(/^(pnpm|npm|yarn|bun)/, activeManager);
  };

  const { highlightedCode, isLoading } = useShikiHighlight(
    getCommand(),
    language,
    isDark
  );

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(getCommand());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Déterminer si c'est un terminal (bash, shell, etc.)
  const isTerminal = [
    'bash',
    'shell',
    'sh',
    'zsh',
    'fish',
    'terminal',
  ].includes(language);

  // Déterminer si le code est trop long (plus de 20 lignes)
  const codeLines = codeString.split('\n').length;
  const isLongCode = codeLines > 20;

  // Déterminer si une ligne est trop longue (plus de 80 caractères)
  const hasLongLines = codeString.split('\n').some(line => line.length > 80);

  // Si c'est un terminal, utiliser la nouvelle structure avec onglets
  if (isTerminal) {
    return (
      <div className="relative overflow-x-auto bg-muted/30 rounded-lg border border-border/50">
        <div
          dir="ltr"
          data-orientation="horizontal"
          data-slot="tabs"
          className="flex flex-col gap-0"
        >
          {/* Header avec icône et onglets */}
          <div className="border-border/50 flex items-center gap-2 border-b px-3 py-1 bg-muted/20">
            {/* Icône du terminal */}
            <div className="flex size-4 items-center justify-center rounded-[1px] bg-black dark:bg-gray-300">
              {getLanguageIcon(language)}
            </div>

            {/* Onglets des gestionnaires de paquets */}
            {showPackageManager && (
              <div
                role="tablist"
                aria-orientation="horizontal"
                data-slot="tabs-list"
                className="text-code-foreground inline-flex h-9 w-fit items-center justify-center rounded-none bg-transparent p-0"
                tabIndex={0}
                data-orientation="horizontal"
                style={{ outline: 'none' }}
              >
                {(['pnpm', 'npm', 'yarn', 'bun'] as const).map(manager => (
                  <button
                    key={manager}
                    type="button"
                    role="tab"
                    aria-selected={activeManager === manager}
                    aria-controls={`radix-content-${manager}`}
                    data-state={
                      activeManager === manager ? 'active' : 'inactive'
                    }
                    id={`radix-trigger-${manager}`}
                    data-slot="tabs-trigger"
                    className={`data-[state=active]:text-accent-foreground data-[state=active]:bg-accent text-muted-foreground hover:text-foreground hover:bg-accent/50 inline-flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,background-color] disabled:pointer-events-none disabled:opacity-50 h-7 border border-transparent pt-0.5`}
                    tabIndex={-1}
                    data-orientation="horizontal"
                    data-radix-collection-item=""
                    onClick={() => setActiveManager(manager)}
                  >
                    {manager}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Contenu des onglets */}
          <div className="no-scrollbar overflow-x-auto">
            {(['pnpm', 'npm', 'yarn', 'bun'] as const).map(manager => (
              <div
                key={manager}
                data-state={activeManager === manager ? 'active' : 'inactive'}
                data-orientation="horizontal"
                role="tabpanel"
                aria-labelledby={`radix-trigger-${manager}`}
                id={`radix-content-${manager}`}
                tabIndex={0}
                data-slot="tabs-content"
                className="flex-1 outline-none mt-0 px-4 py-3.5 text-code-foreground"
                style={{ animationDuration: '0s' }}
                hidden={activeManager !== manager}
              >
                {activeManager === manager && (
                  <pre>
                    <code
                      className="relative font-mono text-sm leading-none"
                      data-language="bash"
                    >
                      {getCommand()}
                    </code>
                  </pre>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bouton copier */}
        <button
          data-slot="copy-button"
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive backdrop-blur-sm absolute top-2 right-2 z-10 size-7 opacity-70 hover:opacity-100 focus-visible:opacity-100 text-muted-foreground bg-background/90 hover:bg-accent hover:text-accent-foreground"
          data-state="closed"
          onClick={copyToClipboard}
        >
          <span className="sr-only">Copy</span>
          {copied ? (
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
              className="lucide lucide-check"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          ) : (
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
              className="lucide lucide-clipboard"
            >
              <rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect>
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
            </svg>
          )}
        </button>
      </div>
    );
  }

  // Structure collapsible avec figure pour les autres langages
  return (
    <div
      data-state={isExpanded ? 'open' : 'closed'}
      data-slot="collapsible"
      className="group/collapsible relative md:-mx-1"
    >
      {(isLongCode || hasLongLines) && (
        <div
          className="absolute top-1.5 right-9 z-10 flex items-center"
          aria-controls="radix-collapsible"
          aria-expanded={isExpanded}
          data-state={isExpanded ? 'open' : 'closed'}
          data-slot="collapsible-trigger"
        >
          <button
            data-slot="button"
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 gap-1.5 has-[>svg]:px-2.5 text-muted-foreground h-7 rounded-md px-2"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </button>
          <div
            data-orientation="vertical"
            role="none"
            data-slot="separator"
            className="bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px mx-1.5 !h-4"
          ></div>
        </div>
      )}

      <div
        data-state={isExpanded ? 'open' : 'closed'}
        id="radix-collapsible"
        data-slot="collapsible-content"
        className={`relative mt-6 overflow-hidden [&>figure]:mt-0 [&>figure]:md:!mx-0 ${
          (isLongCode || hasLongLines) && !isExpanded ? 'max-h-64' : ''
        }`}
        style={
          {
            transitionDuration: '0.2s',
            animationName: 'none',
            '--radix-collapsible-content-height': isExpanded ? 'auto' : '256px',
            '--radix-collapsible-content-width': '680px',
          } as React.CSSProperties
        }
      >
        <figure
          data-rehype-pretty-code-figure=""
          className="[&>pre]:max-h-96 bg-muted/30 rounded-md border border-border/50"
        >
          <figcaption
            data-rehype-pretty-code-title=""
            className="text-code-foreground [&_svg]:text-code-foreground flex items-center gap-2 [&_svg]:size-4 [&_svg]:opacity-70 px-4 py-2 border-b border-border/50 bg-muted/20 text-left"
            data-language={language}
          >
            {getLanguageIcon(language)}
            {filePath}
          </figcaption>

          <button
            data-slot="copy-button"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 bg-code absolute top-2 right-2 z-10 size-7 hover:opacity-100 focus-visible:opacity-100"
            data-state="closed"
            onClick={copyToClipboard}
          >
            <span className="sr-only">Copy</span>
            {copied ? (
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
                className="lucide lucide-check"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            ) : (
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
                className="lucide lucide-clipboard"
              >
                <rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect>
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
              </svg>
            )}
          </button>

          <div>
            {isLoading ? (
              <div className="animate-pulse">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </div>
            ) : (
              <div
                className="no-scrollbar min-w-0 overflow-x-auto px-4 py-3.5 outline-none has-[[data-highlighted-line]]:px-0 has-[[data-line-numbers]]:px-0 has-[[data-slot=tabs]]:p-0 !bg-transparent [&_pre]:overflow-x-auto [&_pre]:whitespace-pre-wrap [&_pre]:break-words"
                dangerouslySetInnerHTML={{ __html: highlightedCode }}
              />
            )}
          </div>
        </figure>
      </div>

      {(isLongCode || hasLongLines) && !isExpanded && (
        <button
          type="button"
          aria-controls="radix-collapsible"
          aria-expanded={isExpanded}
          data-state={isExpanded ? 'open' : 'closed'}
          data-slot="collapsible-trigger"
          className="absolute inset-x-0 -bottom-2 flex h-20 items-center justify-center rounded-b-lg bg-gradient-to-b from-muted/70 to-muted text-muted-foreground hover:text-foreground text-sm transition-colors group-data-[state=open]/collapsible:hidden"
          onClick={() => setIsExpanded(true)}
        >
          Expand
        </button>
      )}
    </div>
  );
}
