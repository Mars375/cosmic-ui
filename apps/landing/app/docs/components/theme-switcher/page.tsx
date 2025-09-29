'use client';

import { useState } from 'react';
import { ThemeSwitcher } from '@cosmic-ui/ui';
import { Button } from '@cosmic-ui/ui';
import { Sun, Moon, Monitor, Palette } from 'lucide-react';

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

export default function ThemeSwitcherPage() {
  const [showCode, setShowCode] = useState(false);
  const [showCodeVariants, setShowCodeVariants] = useState(false);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark' | 'system'>('system');

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStates(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCopiedStates(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

  const handleThemeChange = (theme: 'light' | 'dark' | 'system') => {
    setCurrentTheme(theme);
    console.log('Theme changed to:', theme);
  };

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
          <h1 className="text-4xl font-bold">ThemeSwitcher</h1>
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
          Un composant de changement de thème avec support des modes clair,
          sombre et système.
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
                    <h3 className="text-lg font-semibold mb-2">Thème actuel : {currentTheme}</h3>
                    <p className="text-sm text-cosmic-muted-foreground mb-4">
                      Cliquez sur les boutons ci-dessous pour changer de thème
                    </p>
                  </div>
                  <ThemeSwitcher
                    currentTheme={currentTheme}
                    onThemeChange={handleThemeChange}
                    variant="button"
                    size="md"
                    showLabel={true}
                  />
                </div>
              </div>
            ) : (
              <div className="w-full h-full">
                <CodeBlock
                  onCopy={() =>
                    handleCopy(
                      `import { ThemeSwitcher } from '@cosmic-ui/ui';
import { useState } from 'react';

export function MyThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark' | 'system'>('system');

  const handleThemeChange = (theme) => {
    setCurrentTheme(theme);
    console.log('Theme changed to:', theme);
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">
          Thème actuel : {currentTheme}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Cliquez sur les boutons ci-dessous pour changer de thème
        </p>
      </div>
      <ThemeSwitcher
        currentTheme={currentTheme}
        onThemeChange={handleThemeChange}
        variant="button"
        size="md"
        showLabel={true}
      />
    </div>
  );
}`,
                      'main'
                    )
                  }
                >
                  {`import { ThemeSwitcher } from '@cosmic-ui/ui';
import { useState } from 'react';

export function MyThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark' | 'system'>('system');

  const handleThemeChange = (theme) => {
    setCurrentTheme(theme);
    console.log('Theme changed to:', theme);
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">
          Thème actuel : {currentTheme}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Cliquez sur les boutons ci-dessous pour changer de thème
        </p>
      </div>
      <ThemeSwitcher
        currentTheme={currentTheme}
        onThemeChange={handleThemeChange}
        variant="button"
        size="md"
        showLabel={true}
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
              Le composant ThemeSwitcher est déjà inclus dans le package
              @cosmic-ui/ui.
            </p>
            <CodeBlock
              onCopy={() =>
                handleCopy(`npm install @cosmic-ui/ui`, 'install')
              }
            >
              {`npm install @cosmic-ui/ui`}
            </CodeBlock>
          </div>
        </div>

        {/* Usage */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Utilisation</h2>
          <div className="bg-cosmic-card border border-cosmic-border rounded-lg p-4">
            <p className="text-cosmic-muted-foreground mb-4">
              Utilisez le composant pour permettre aux utilisateurs de changer de thème.
            </p>
            <CodeBlock
              onCopy={() =>
                handleCopy(
                  `import { ThemeSwitcher } from '@cosmic-ui/ui';

const [theme, setTheme] = useState('system');

<ThemeSwitcher
  currentTheme={theme}
  onThemeChange={setTheme}
  variant="button"
  size="md"
  showLabel={true}
/>`,
                  'usage'
                )
              }
            >
              {`import { ThemeSwitcher } from '@cosmic-ui/ui';

const [theme, setTheme] = useState('system');

<ThemeSwitcher
  currentTheme={theme}
  onThemeChange={setTheme}
  variant="button"
  size="md"
  showLabel={true}
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
                      Variant dropdown
                    </h3>
                    <ThemeSwitcher
                      currentTheme={currentTheme}
                      onThemeChange={handleThemeChange}
                      variant="dropdown"
                      size="sm"
                      showLabel={false}
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Variant toggle
                    </h3>
                    <ThemeSwitcher
                      currentTheme={currentTheme}
                      onThemeChange={handleThemeChange}
                      variant="toggle"
                      size="lg"
                      showLabel={true}
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full h-full">
                  <CodeBlock
                    onCopy={() =>
                      handleCopy(
                        `// Variant button
<ThemeSwitcher
  currentTheme={theme}
  onThemeChange={setTheme}
  variant="button"
  size="md"
  showLabel={true}
/>

// Variant dropdown
<ThemeSwitcher
  currentTheme={theme}
  onThemeChange={setTheme}
  variant="dropdown"
  size="sm"
  showLabel={false}
/>

// Variant toggle
<ThemeSwitcher
  currentTheme={theme}
  onThemeChange={setTheme}
  variant="toggle"
  size="lg"
  showLabel={true}
/>

// Tailles disponibles
<ThemeSwitcher
  currentTheme={theme}
  onThemeChange={setTheme}
  variant="button"
  size="sm"    // sm, md, lg
  showLabel={true}
/>

// Sans labels
<ThemeSwitcher
  currentTheme={theme}
  onThemeChange={setTheme}
  variant="button"
  size="md"
  showLabel={false}
/>`,
                        'variants'
                      )
                    }
                  >
                    {`// Variant button
<ThemeSwitcher
  currentTheme={theme}
  onThemeChange={setTheme}
  variant="button"
  size="md"
  showLabel={true}
/>

// Variant dropdown
<ThemeSwitcher
  currentTheme={theme}
  onThemeChange={setTheme}
  variant="dropdown"
  size="sm"
  showLabel={false}
/>

// Variant toggle
<ThemeSwitcher
  currentTheme={theme}
  onThemeChange={setTheme}
  variant="toggle"
  size="lg"
  showLabel={true}
/>

// Tailles disponibles
<ThemeSwitcher
  currentTheme={theme}
  onThemeChange={setTheme}
  variant="button"
  size="sm"    // sm, md, lg
  showLabel={true}
/>

// Sans labels
<ThemeSwitcher
  currentTheme={theme}
  onThemeChange={setTheme}
  variant="button"
  size="md"
  showLabel={false}
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
