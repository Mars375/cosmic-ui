'use client';

import * as React from 'react';
import { useState } from 'react';
import { CodeBlock } from '../../../components/code-block';
import { RadioGroup, RadioGroupItem } from 'cosmic-ui-mars';
import { Circle } from 'lucide-react';

export default function RadioGroupPage() {
  const [selectedValue, setSelectedValue] = useState('option1');
  const [selectedSize, setSelectedSize] = useState('medium');
  const [selectedTheme, setSelectedTheme] = useState('light');

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Circle className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">RadioGroup</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Groupe de boutons radio pour sélectionner une option parmi plusieurs choix exclusifs.
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
                <p className="text-sm text-muted-foreground">Sélection: {selectedValue}</p>
                <RadioGroup value={selectedValue} onValueChange={setSelectedValue}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option1" id="option1" />
                    <label htmlFor="option1" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Option 1
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option2" id="option2" />
                    <label htmlFor="option2" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Option 2
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option3" id="option3" />
                    <label htmlFor="option3" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Option 3
                    </label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4 text-foreground">Code</h3>
            <CodeBlock language="typescript" filePath="components/RadioGroupExample.tsx" showPackageManager={false}>
{`import { RadioGroup, RadioGroupItem } from 'cosmic-ui-mars';
import { useState } from 'react';

const [selectedValue, setSelectedValue] = useState('option1');

<RadioGroup value={selectedValue} onValueChange={setSelectedValue}>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option1" id="option1" />
    <label htmlFor="option1">Option 1</label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option2" id="option2" />
    <label htmlFor="option2">Option 2</label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option3" id="option3" />
    <label htmlFor="option3">Option 3</label>
  </div>
</RadioGroup>`}
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
              <h3 className="text-lg font-medium text-foreground">Groupe avec tailles</h3>
              <p className="text-muted-foreground">RadioGroup avec différentes tailles.</p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">Taille sélectionnée: {selectedSize}</p>
                  <RadioGroup value={selectedSize} onValueChange={setSelectedSize}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="small" id="small" size="sm" />
                      <label htmlFor="small" className="text-sm">Petit</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="medium" size="md" />
                      <label htmlFor="medium" className="text-sm">Moyen</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="large" id="large" size="lg" />
                      <label htmlFor="large" className="text-sm">Grand</label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
            <div>
              <CodeBlock language="typescript" filePath="components/SizedRadioGroup.tsx" showPackageManager={false}>
{`export default function App\docs\components\radioGroup\page.tsxExample() {
  <RadioGroup value={selectedSize} onValueChange={setSelectedSize}>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="small" id="small" size="sm" />
    <label htmlFor="small">Petit</label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="medium" id="medium" size="md" />
    <label htmlFor="medium">Moyen</label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="large" id="large" size="lg" />
    <label htmlFor="large">Grand</label>
  </div>
</RadioGroup>
}`}
              </CodeBlock>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Groupe désactivé</h3>
              <p className="text-muted-foreground">RadioGroup avec options désactivées.</p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <RadioGroup defaultValue="enabled">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="enabled" id="enabled" />
                    <label htmlFor="enabled" className="text-sm">Option activée</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="disabled" id="disabled" disabled />
                    <label htmlFor="disabled" className="text-sm text-muted-foreground">Option désactivée</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="another" id="another" />
                    <label htmlFor="another" className="text-sm">Autre option</label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            <div>
              <CodeBlock language="typescript" filePath="components/DisabledRadioGroup.tsx" showPackageManager={false}>
{`export default function App\docs\components\radioGroup\page.tsxExample() {
  <RadioGroup defaultValue="enabled">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="enabled" id="enabled" />
    <label htmlFor="enabled">Option activée</label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="disabled" id="disabled" disabled />
    <label htmlFor="disabled">Option désactivée</label>
  </div>
</RadioGroup>
}`}
              </CodeBlock>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Groupe horizontal</h3>
              <p className="text-muted-foreground">RadioGroup avec disposition horizontale.</p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">Thème: {selectedTheme}</p>
                  <RadioGroup 
                    value={selectedTheme} 
                    onValueChange={setSelectedTheme}
                    className="flex flex-row space-x-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="light" id="light-theme" />
                      <label htmlFor="light-theme" className="text-sm">Clair</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dark" id="dark-theme" />
                      <label htmlFor="dark-theme" className="text-sm">Sombre</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="auto" id="auto-theme" />
                      <label htmlFor="auto-theme" className="text-sm">Auto</label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
            <div>
              <CodeBlock language="typescript" filePath="components/HorizontalRadioGroup.tsx" showPackageManager={false}>
{`export default function App\docs\components\radioGroup\page.tsxExample() {
  <RadioGroup 
  value={selectedTheme} 
  onValueChange={setSelectedTheme}
  className="flex flex-row space-x-6"
>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="light" id="light" />
    <label htmlFor="light">Clair</label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="dark" id="dark" />
    <label htmlFor="dark">Sombre</label>
  </div>
</RadioGroup>
}`}
              </CodeBlock>
            </div>
          </div>
        </div>
      </div>

      {/* Référence API */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Référence API</h2>
        
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4 text-foreground">RadioGroup</h3>
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
                  <td className="border border-border px-4 py-3 font-mono text-sm">value</td>
                  <td className="border border-border px-4 py-3 text-sm text-muted-foreground">string</td>
                  <td className="border border-border px-4 py-3 text-sm text-muted-foreground">-</td>
                  <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Valeur sélectionnée</td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-3 font-mono text-sm">defaultValue</td>
                  <td className="border border-border px-4 py-3 text-sm text-muted-foreground">string</td>
                  <td className="border border-border px-4 py-3 text-sm text-muted-foreground">-</td>
                  <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Valeur par défaut</td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-3 font-mono text-sm">onValueChange</td>
                  <td className="border border-border px-4 py-3 text-sm text-muted-foreground">(value: string) => void</td>
                  <td className="border border-border px-4 py-3 text-sm text-muted-foreground">-</td>
                  <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Callback de changement</td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-3 font-mono text-sm">disabled</td>
                  <td className="border border-border px-4 py-3 text-sm text-muted-foreground">boolean</td>
                  <td className="border border-border px-4 py-3 text-sm text-muted-foreground">false</td>
                  <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Désactiver le groupe</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4 text-foreground">RadioGroupItem</h3>
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
                  <td className="border border-border px-4 py-3 font-mono text-sm">value</td>
                  <td className="border border-border px-4 py-3 text-sm text-muted-foreground">string</td>
                  <td className="border border-border px-4 py-3 text-sm text-muted-foreground">-</td>
                  <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Valeur de l'option</td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-3 font-mono text-sm">id</td>
                  <td className="border border-border px-4 py-3 text-sm text-muted-foreground">string</td>
                  <td className="border border-border px-4 py-3 text-sm text-muted-foreground">-</td>
                  <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Identifiant unique</td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-3 font-mono text-sm">size</td>
                  <td className="border border-border px-4 py-3 text-sm text-muted-foreground">'sm' | 'md' | 'lg'</td>
                  <td className="border border-border px-4 py-3 text-sm text-muted-foreground">'md'</td>
                  <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Taille du bouton radio</td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-3 font-mono text-sm">disabled</td>
                  <td className="border border-border px-4 py-3 text-sm text-muted-foreground">boolean</td>
                  <td className="border border-border px-4 py-3 text-sm text-muted-foreground">false</td>
                  <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Désactiver l'option</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Conseils d'utilisation */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <h3 className="text-blue-800 dark:text-blue-200 font-semibold mb-2">
          💡 Conseils d'utilisation
        </h3>
        <ul className="text-blue-700 dark:text-blue-300 space-y-1 text-sm">
          <li>• Utilisez des <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">labels clairs</code> pour chaque option</li>
          <li>• Associez toujours un <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">label</code> à chaque RadioGroupItem</li>
          <li>• Limitez le nombre d'<code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">options</code> (max 5-7)</li>
          <li>• Utilisez la disposition <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">verticale</code> par défaut</li>
          <li>• Respectez les <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">guidelines d'accessibilité</code></li>
        </ul>
      </div>
    </div>
  );
}