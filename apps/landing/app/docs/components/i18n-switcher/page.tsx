'use client';

import * as React from 'react';
import { useState } from 'react';
import { CodeBlock } from '../../../components/code-block';
import { I18nSwitcher } from 'cosmic-ui-mars';
import { Button } from 'cosmic-ui-mars';
import { Globe, Languages } from 'lucide-react';

export default function I18nSwitcherPage() {
  const [currentLanguage, setCurrentLanguage] = useState('fr');

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

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Globe className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">I18nSwitcher</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Sélecteur de langue pour l'internationalisation des applications.
        </p>
      </div>

      {/* Installation */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Installation</h2>
        <CodeBlock filePath="package.json">pnpm add cosmic-ui-mars</CodeBlock>
      </div>

      {/* Usage basique */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Usage basique</h2>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Exemple</h3>
            <div className="p-6 bg-muted/30 rounded-lg border">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Langue actuelle: {currentLanguage}
                  </label>
                  <I18nSwitcher
                    languages={sampleLanguages}
                    currentLanguage={currentLanguage}
                    onLanguageChange={handleLanguageChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4 text-foreground">Code</h3>
            <CodeBlock language="typescript" filePath="components/I18nSwitcherExample.tsx" showPackageManager={false}>
{`import { I18nSwitcher } from 'cosmic-ui-mars';
import { useState } from 'react';

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
];

<I18nSwitcher
  languages={languages}
  currentLanguage={currentLanguage}
  onLanguageChange={setCurrentLanguage}
/>`}
            </CodeBlock>
          </div>
        </div>
      </div>

      {/* Variants */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Variants</h2>
        <div className="space-y-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Sélecteur compact</h3>
              <p className="text-muted-foreground">Sélecteur avec affichage compact.</p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Langue
                  </label>
                  <I18nSwitcher
                    languages={sampleLanguages}
                    currentLanguage={currentLanguage}
                    onLanguageChange={handleLanguageChange}
                    variant="compact"
                  />
                </div>
              </div>
            </div>
            <div>
              <CodeBlock language="typescript" filePath="components/CompactI18nSwitcher.tsx" showPackageManager={false}>
{`export default function App\docs\components\i18nSwitcher\page.tsxExample() {
  return <I18nSwitcher
  languages={languages}
  currentLanguage={currentLanguage}
  onLanguageChange={setCurrentLanguage}
  variant="compact"
/>;
}`}
              </CodeBlock>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Sélecteur avec icônes</h3>
              <p className="text-muted-foreground">Sélecteur affichant les drapeaux des pays.</p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Langue
                  </label>
                  <I18nSwitcher
                    languages={sampleLanguages}
                    currentLanguage={currentLanguage}
                    onLanguageChange={handleLanguageChange}
                    showFlags
                  />
                </div>
              </div>
            </div>
            <div>
              <CodeBlock language="typescript" filePath="components/FlagI18nSwitcher.tsx" showPackageManager={false}>
{`export default function App\docs\components\i18nSwitcher\page.tsxExample() {
  return <I18nSwitcher
  languages={languages}
  currentLanguage={currentLanguage}
  onLanguageChange={setCurrentLanguage}
  showFlags
/>;
}`}
              </CodeBlock>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Sélecteur avec noms natifs</h3>
              <p className="text-muted-foreground">Sélecteur affichant les noms de langues dans leur langue native.</p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Langue
                  </label>
                  <I18nSwitcher
                    languages={sampleLanguages}
                    currentLanguage={currentLanguage}
                    onLanguageChange={handleLanguageChange}
                    showNativeNames
                  />
                </div>
              </div>
            </div>
            <div>
              <CodeBlock language="typescript" filePath="components/NativeI18nSwitcher.tsx" showPackageManager={false}>
{`export default function App\docs\components\i18nSwitcher\page.tsxExample() {
  return <I18nSwitcher
  languages={languages}
  currentLanguage={currentLanguage}
  onLanguageChange={setCurrentLanguage}
  showNativeNames
/>;
}`}
              </CodeBlock>
            </div>
          </div>
        </div>
      </div>

      {/* Référence API */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Référence API</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-border rounded-lg">
            <thead>
              <tr className="bg-muted/50">
                <th className="border border-border px-4 py-3 text-left font-medium text-foreground">Prop</th>
                <th className="border border-border px-4 py-3 text-left font-medium text-foreground">Type</th>
                <th className="border border-border px-4 py-3 text-left font-medium text-foreground">Défaut</th>
                <th className="border border-border px-4 py-3 text-left font-medium text-foreground">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">languages</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Language[]</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">[]</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Liste des langues disponibles</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">currentLanguage</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">string</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">-</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Code de la langue actuelle</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">onLanguageChange</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">(code: string) => void</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">-</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Callback lors du changement de langue</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">variant</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">'default' | 'compact'</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">'default'</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Style du sélecteur</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">showFlags</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">boolean</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">false</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Afficher les drapeaux</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">showNativeNames</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">boolean</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">false</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Afficher les noms natifs</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Conseils d'utilisation */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <h3 className="text-blue-800 dark:text-blue-200 font-semibold mb-2">
          💡 Conseils d'utilisation
        </h3>
        <ul className="text-blue-700 dark:text-blue-300 space-y-1 text-sm">
          <li>• Utilisez des <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">codes ISO</code> standard pour les langues</li>
          <li>• Ajoutez des <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">drapeaux</code> pour une meilleure UX</li>
          <li>• Affichez les <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">noms natifs</code> pour l'authenticité</li>
          <li>• Implémentez la <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">persistance</code> des préférences</li>
          <li>• Respectez les <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">guidelines d'accessibilité</code></li>
        </ul>
      </div>
    </div>
  );
}