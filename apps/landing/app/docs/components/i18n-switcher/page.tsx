'use client';

import { useState } from 'react';
import { I18nSwitcher } from '@cosmic-ui/components';
import { Button } from '@cosmic-ui/components';
import { Globe, Languages } from 'lucide-react';

const CodeBlock = ({
  children,
  onCopy,
}: {
  children: string;
  onCopy: () => void;
}) => {
  return (
    <div className="relative">
      <pre className="bg-white dark:bg-black p-4 rounded-lg overflow-x-auto text-sm">
        <code>{children}</code>
      </pre>
      <button
        onClick={onCopy}
        className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
      </button>
    </div>
  );
};

export default function I18nSwitcherPage() {
  const [showCode, setShowCode] = useState(false);
  const [showCodeVariants, setShowCodeVariants] = useState(false);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const [currentLanguage, setCurrentLanguage] = useState('fr');

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStates(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCopiedStates(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

  const sampleLanguages = [
    {
      code: 'fr',
      name: 'Français',
      nativeName: 'Français',
      flag: '🇫🇷',
    },
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      flag: '🇺🇸',
    },
    {
      code: 'es',
      name: 'Spanish',
      nativeName: 'Español',
      flag: '🇪🇸',
    },
    {
      code: 'de',
      name: 'German',
      nativeName: 'Deutsch',
      flag: '🇩🇪',
    },
    {
      code: 'it',
      name: 'Italian',
      nativeName: 'Italiano',
      flag: '🇮🇹',
    },
  ];

  const handleLanguageChange = (languageCode: string) => {
    setCurrentLanguage(languageCode);
    console.log('Language changed to:', languageCode);
  };

  const simpleLanguages = [
    {
      code: 'fr',
      name: 'Français',
      nativeName: 'Français',
      flag: '🇫🇷',
    },
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      flag: '🇺🇸',
    },
  ];

  const complexLanguages = [
    {
      code: 'fr',
      name: 'Français',
      nativeName: 'Français',
      flag: '🇫🇷',
    },
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      flag: '🇺🇸',
    },
    {
      code: 'es',
      name: 'Spanish',
      nativeName: 'Español',
      flag: '🇪🇸',
    },
    {
      code: 'de',
      name: 'German',
      nativeName: 'Deutsch',
      flag: '🇩🇪',
    },
    {
      code: 'it',
      name: 'Italian',
      nativeName: 'Italiano',
      flag: '🇮🇹',
    },
    {
      code: 'pt',
      name: 'Portuguese',
      nativeName: 'Português',
      flag: '🇵🇹',
    },
    {
      code: 'ru',
      name: 'Russian',
      nativeName: 'Русский',
      flag: '🇷🇺',
    },
    {
      code: 'ja',
      name: 'Japanese',
      nativeName: '日本語',
      flag: '🇯🇵',
    },
  ];

  return (
    <div className="min-h-screen bg-cosmic-background text-cosmic-foreground">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button className="p-2 hover:bg-cosmic-border rounded-lg">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <h1 className="text-4xl font-bold">I18n Switcher</h1>
          <button className="p-2 hover:bg-cosmic-border rounded-lg">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Summary */}
        <p className="text-lg text-cosmic-muted-foreground mb-8">
          Un composant de changement de langue avec support des drapeaux et
          noms natifs.
        </p>

        {/* Main Preview */}
        <div className="mb-12">
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setShowCode(false)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                !showCode
                  ? 'bg-cosmic-primary text-white'
                  : 'bg-cosmic-border text-cosmic-foreground hover:bg-cosmic-border/80'
              }`}
            >
              Preview
            </button>
            <button
              onClick={() => setShowCode(true)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                showCode
                  ? 'bg-cosmic-primary text-white'
                  : 'bg-cosmic-border text-cosmic-foreground hover:bg-cosmic-border/80'
              }`}
            >
              Code
            </button>
          </div>

          <div className="bg-cosmic-card border border-cosmic-border rounded-lg p-2 h-[450px] w-[500px] flex justify-start">
            {!showCode ? (
              <div className="p-4 w-full">
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2">
                      Langue actuelle : {currentLanguage}
                    </h3>
                    <p className="text-sm text-cosmic-muted-foreground mb-4">
                      Cliquez sur le sélecteur pour changer de langue
                    </p>
                  </div>
                  <I18nSwitcher
                    languages={sampleLanguages}
                    currentLanguage={currentLanguage}
                    onLanguageChange={handleLanguageChange}
                    variant="dropdown"
                    size="md"
                    showFlag={true}
                    showNativeName={true}
                    showCode={false}
                  />
                </div>
              </div>
            ) : (
              <div className="w-full h-full">
                <CodeBlock
                  onCopy={() =>
                    handleCopy(
                      `import { I18nSwitcher } from '@cosmic-ui/components';
import { useState } from 'react';

export function MyI18nSwitcher() {
  const [currentLanguage, setCurrentLanguage] = useState('fr');

  const languages = [
    {
      code: 'fr',
      name: 'Français',
      nativeName: 'Français',
      flag: '🇫🇷',
    },
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      flag: '🇺🇸',
    },
    {
      code: 'es',
      name: 'Spanish',
      nativeName: 'Español',
      flag: '🇪🇸',
    },
    {
      code: 'de',
      name: 'German',
      nativeName: 'Deutsch',
      flag: '🇩🇪',
    },
    {
      code: 'it',
      name: 'Italian',
      nativeName: 'Italiano',
      flag: '🇮🇹',
    },
  ];

  const handleLanguageChange = (languageCode) => {
    setCurrentLanguage(languageCode);
    console.log('Language changed to:', languageCode);
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">
          Langue actuelle : {currentLanguage}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Cliquez sur le sélecteur pour changer de langue
        </p>
      </div>
      <I18nSwitcher
        languages={languages}
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
        variant="dropdown"
        size="md"
        showFlag={true}
        showNativeName={true}
        showCode={false}
      />
    </div>
  );
}`,
                      'main'
                    )
                  }
                >
                  {`import { I18nSwitcher } from '@cosmic-ui/components';
import { useState } from 'react';

export function MyI18nSwitcher() {
  const [currentLanguage, setCurrentLanguage] = useState('fr');

  const languages = [
    {
      code: 'fr',
      name: 'Français',
      nativeName: 'Français',
      flag: '🇫🇷',
    },
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      flag: '🇺🇸',
    },
    {
      code: 'es',
      name: 'Spanish',
      nativeName: 'Español',
      flag: '🇪🇸',
    },
    {
      code: 'de',
      name: 'German',
      nativeName: 'Deutsch',
      flag: '🇩🇪',
    },
    {
      code: 'it',
      name: 'Italian',
      nativeName: 'Italiano',
      flag: '🇮🇹',
    },
  ];

  const handleLanguageChange = (languageCode) => {
    setCurrentLanguage(languageCode);
    console.log('Language changed to:', languageCode);
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">
          Langue actuelle : {currentLanguage}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Cliquez sur le sélecteur pour changer de langue
        </p>
      </div>
      <I18nSwitcher
        languages={languages}
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
        variant="dropdown"
        size="md"
        showFlag={true}
        showNativeName={true}
        showCode={false}
      />
    </div>
  );
}`}
                </CodeBlock>
              </div>
            )}
          </div>
        </div>

        {/* Installation */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Installation</h2>
          <div className="bg-cosmic-card border border-cosmic-border rounded-lg p-4">
            <p className="text-cosmic-muted-foreground mb-4">
              Le composant I18nSwitcher est déjà inclus dans le package
              @cosmic-ui/components.
            </p>
            <CodeBlock
              onCopy={() =>
                handleCopy(`npm install @cosmic-ui/components`, 'install')
              }
            >
              {`npm install @cosmic-ui/components`}
            </CodeBlock>
          </div>
        </div>

        {/* Usage */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Utilisation</h2>
          <div className="bg-cosmic-card border border-cosmic-border rounded-lg p-4">
            <p className="text-cosmic-muted-foreground mb-4">
              Utilisez le composant pour permettre aux utilisateurs de changer de langue.
            </p>
            <CodeBlock
              onCopy={() =>
                handleCopy(
                  `import { I18nSwitcher } from '@cosmic-ui/components';

const languages = [
  {
    code: 'fr',
    name: 'Français',
    nativeName: 'Français',
    flag: '🇫🇷',
  },
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
  },
];

<I18nSwitcher
  languages={languages}
  currentLanguage="fr"
  onLanguageChange={(code) => console.log('Language:', code)}
  variant="dropdown"
  size="md"
  showFlag={true}
  showNativeName={true}
/>`,
                  'usage'
                )
              }
            >
              {`import { I18nSwitcher } from '@cosmic-ui/components';

const languages = [
  {
    code: 'fr',
    name: 'Français',
    nativeName: 'Français',
    flag: '🇫🇷',
  },
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
  },
];

<I18nSwitcher
  languages={languages}
  currentLanguage="fr"
  onLanguageChange={(code) => console.log('Language:', code)}
  variant="dropdown"
  size="md"
  showFlag={true}
  showNativeName={true}
/>`}
            </CodeBlock>
          </div>
        </div>

        {/* Variants */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Variantes</h2>

          {/* Variants Preview */}
          <div className="mb-8">
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setShowCodeVariants(false)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  !showCodeVariants
                    ? 'bg-cosmic-primary text-white'
                    : 'bg-cosmic-border text-cosmic-foreground hover:bg-cosmic-border/80'
                }`}
              >
                Preview
              </button>
              <button
                onClick={() => setShowCodeVariants(true)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  showCodeVariants
                    ? 'bg-cosmic-primary text-white'
                    : 'bg-cosmic-border text-cosmic-foreground hover:bg-cosmic-border/80'
                }`}
              >
                Code
              </button>
            </div>

            <div className="bg-cosmic-card border border-cosmic-border rounded-lg p-2 h-[450px] w-[500px] flex justify-start">
              {!showCodeVariants ? (
                <div className="p-4 w-full space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Variant button
                    </h3>
                    <I18nSwitcher
                      languages={simpleLanguages}
                      currentLanguage={currentLanguage}
                      onLanguageChange={handleLanguageChange}
                      variant="button"
                      size="sm"
                      showFlag={true}
                      showNativeName={false}
                      showCode={true}
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Variant select
                    </h3>
                    <I18nSwitcher
                      languages={simpleLanguages}
                      currentLanguage={currentLanguage}
                      onLanguageChange={handleLanguageChange}
                      variant="select"
                      size="lg"
                      showFlag={false}
                      showNativeName={true}
                      showCode={false}
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full h-full">
                  <CodeBlock
                    onCopy={() =>
                      handleCopy(
                        `// Variant dropdown
<I18nSwitcher
  languages={languages}
  currentLanguage={currentLanguage}
  onLanguageChange={handleLanguageChange}
  variant="dropdown"
  size="md"
  showFlag={true}
  showNativeName={true}
  showCode={false}
/>

// Variant button
<I18nSwitcher
  languages={languages}
  currentLanguage={currentLanguage}
  onLanguageChange={handleLanguageChange}
  variant="button"
  size="sm"
  showFlag={true}
  showNativeName={false}
  showCode={true}
/>

// Variant select
<I18nSwitcher
  languages={languages}
  currentLanguage={currentLanguage}
  onLanguageChange={handleLanguageChange}
  variant="select"
  size="lg"
  showFlag={false}
  showNativeName={true}
  showCode={false}
/>

// Tailles disponibles
<I18nSwitcher
  languages={languages}
  currentLanguage={currentLanguage}
  onLanguageChange={handleLanguageChange}
  variant="dropdown"
  size="sm"    // sm, md, lg
  showFlag={true}
  showNativeName={true}
  showCode={false}
/>

// Options d'affichage
<I18nSwitcher
  languages={languages}
  currentLanguage={currentLanguage}
  onLanguageChange={handleLanguageChange}
  variant="dropdown"
  size="md"
  showFlag={true}        // Afficher les drapeaux
  showNativeName={true}  // Afficher les noms natifs
  showCode={false}       // Afficher les codes de langue
/>`,
                        'variants'
                      )
                    }
                  >
                    {`// Variant dropdown
<I18nSwitcher
  languages={languages}
  currentLanguage={currentLanguage}
  onLanguageChange={handleLanguageChange}
  variant="dropdown"
  size="md"
  showFlag={true}
  showNativeName={true}
  showCode={false}
/>

// Variant button
<I18nSwitcher
  languages={languages}
  currentLanguage={currentLanguage}
  onLanguageChange={handleLanguageChange}
  variant="button"
  size="sm"
  showFlag={true}
  showNativeName={false}
  showCode={true}
/>

// Variant select
<I18nSwitcher
  languages={languages}
  currentLanguage={currentLanguage}
  onLanguageChange={handleLanguageChange}
  variant="select"
  size="lg"
  showFlag={false}
  showNativeName={true}
  showCode={false}
/>

// Tailles disponibles
<I18nSwitcher
  languages={languages}
  currentLanguage={currentLanguage}
  onLanguageChange={handleLanguageChange}
  variant="dropdown"
  size="sm"    // sm, md, lg
  showFlag={true}
  showNativeName={true}
  showCode={false}
/>

// Options d'affichage
<I18nSwitcher
  languages={languages}
  currentLanguage={currentLanguage}
  onLanguageChange={handleLanguageChange}
  variant="dropdown"
  size="md"
  showFlag={true}        // Afficher les drapeaux
  showNativeName={true}  // Afficher les noms natifs
  showCode={false}       // Afficher les codes de langue
/>`}
                  </CodeBlock>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
