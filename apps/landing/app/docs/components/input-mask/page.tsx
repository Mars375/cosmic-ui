'use client';

import * as React from 'react';
import { useState } from 'react';
import { CodeBlock } from '../../../components/code-block';
import { InputWithMask } from 'cosmic-ui-mars';
import { Hash } from 'lucide-react';

export default function InputMaskPage() {
  const [phoneValue, setPhoneValue] = useState('');
  const [creditCardValue, setCreditCardValue] = useState('');
  const [dateValue, setDateValue] = useState('');

  // Masques personnalisés
  const phoneMask = (raw: string) => {
    const cleaned = raw.replace(/\D/g, '');
    if (cleaned.length <= 2) return cleaned;
    if (cleaned.length <= 4)
      return `${cleaned.slice(0, 2)} ${cleaned.slice(2)}`;
    if (cleaned.length <= 6)
      return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 4)} ${cleaned.slice(4)}`;
    return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 4)} ${cleaned.slice(4, 6)} ${cleaned.slice(6, 8)}`;
  };

  const creditCardMask = (raw: string) => {
    const cleaned = raw.replace(/\D/g, '');
    const groups = cleaned.match(/.{1,4}/g) || [];
    return groups.join(' ');
  };

  const dateMask = (raw: string) => {
    const cleaned = raw.replace(/\D/g, '');
    if (cleaned.length <= 2) return cleaned;
    if (cleaned.length <= 4)
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Hash className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">InputMask</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Champ de saisie avec masque pour formater automatiquement les données saisies.
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
                    Téléphone
                  </label>
                  <InputWithMask
                    value={phoneValue}
                    onChange={setPhoneValue}
                    mask={phoneMask}
                    placeholder="01 23 45 67 89"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Carte de crédit
                  </label>
                  <InputWithMask
                    value={creditCardValue}
                    onChange={setCreditCardValue}
                    mask={creditCardMask}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Date
                  </label>
                  <InputWithMask
                    value={dateValue}
                    onChange={setDateValue}
                    mask={dateMask}
                    placeholder="DD/MM/YYYY"
                    maxLength={10}
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4 text-foreground">Code</h3>
            <CodeBlock language="typescript" filePath="components/InputMaskExample.tsx" showPackageManager={false}>
{`import { InputWithMask } from 'cosmic-ui-mars';
import { useState } from 'react';

const [phoneValue, setPhoneValue] = useState('');

const phoneMask = (raw: string) => {
  const cleaned = raw.replace(/\\D/g, '');
  if (cleaned.length <= 2) return cleaned;
  if (cleaned.length <= 4)
    return \`\${cleaned.slice(0, 2)} \${cleaned.slice(2)}\`;
  if (cleaned.length <= 6)
    return \`\${cleaned.slice(0, 2)} \${cleaned.slice(2, 4)} \${cleaned.slice(4)}\`;
  return \`\${cleaned.slice(0, 2)} \${cleaned.slice(2, 4)} \${cleaned.slice(4, 6)} \${cleaned.slice(6, 8)}\`;
};

<InputWithMask
  value={phoneValue}
  onChange={setPhoneValue}
  mask={phoneMask}
  placeholder="01 23 45 67 89"
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
              <h3 className="text-lg font-medium text-foreground">Masque de devise</h3>
              <p className="text-muted-foreground">Masque pour formater les montants en devise.</p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Montant
                  </label>
                  <InputWithMask
                    value=""
                    onChange={() => {}}
                    mask={(raw) => {
                      const cleaned = raw.replace(/\D/g, '');
                      const amount = parseInt(cleaned) / 100;
                      return amount.toLocaleString('fr-FR', {
                        style: 'currency',
                        currency: 'EUR'
                      });
                    }}
                    placeholder="0,00 €"
                  />
                </div>
              </div>
            </div>
            <div>
              <CodeBlock language="typescript" filePath="components/CurrencyMask.tsx" showPackageManager={false}>
{`export default function App\docs\components\inputMask\page.tsxExample() {
  <InputWithMask
  value={amount}
  onChange={setAmount}
  mask={(raw) => {
    const cleaned = raw.replace(/\\D/g, '');
    const amount = parseInt(cleaned) / 100;
    return amount.toLocaleString('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    });
  }}
  placeholder="0,00 €"
/>
}`}
              </CodeBlock>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Masque d'IP</h3>
              <p className="text-muted-foreground">Masque pour formater les adresses IP.</p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Adresse IP
                  </label>
                  <InputWithMask
                    value=""
                    onChange={() => {}}
                    mask={(raw) => {
                      const cleaned = raw.replace(/[^0-9.]/g, '');
                      const parts = cleaned.split('.');
                      return parts.slice(0, 4).join('.');
                    }}
                    placeholder="192.168.1.1"
                    maxLength={15}
                  />
                </div>
              </div>
            </div>
            <div>
              <CodeBlock language="typescript" filePath="components/IPMask.tsx" showPackageManager={false}>
{`export default function App\docs\components\inputMask\page.tsxExample() {
  <InputWithMask
  value={ip}
  onChange={setIp}
  mask={(raw) => {
    const cleaned = raw.replace(/[^0-9.]/g, '');
    const parts = cleaned.split('.');
    return parts.slice(0, 4).join('.');
  }}
  placeholder="192.168.1.1"
  maxLength={15}
/>
}`}
              </CodeBlock>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Masque avec validation</h3>
              <p className="text-muted-foreground">Masque avec validation en temps réel.</p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Code postal
                  </label>
                  <InputWithMask
                    value=""
                    onChange={() => {}}
                    mask={(raw) => {
                      const cleaned = raw.replace(/\D/g, '');
                      return cleaned.slice(0, 5);
                    }}
                    placeholder="75001"
                    maxLength={5}
                    onValidate={(value) => {
                      const cleaned = value.replace(/\D/g, '');
                      return cleaned.length === 5;
                    }}
                  />
                </div>
              </div>
            </div>
            <div>
              <CodeBlock language="typescript" filePath="components/ValidatedMask.tsx" showPackageManager={false}>
{`export default function App\docs\components\inputMask\page.tsxExample() {
  <InputWithMask
  value={postalCode}
  onChange={setPostalCode}
  mask={(raw) => {
    const cleaned = raw.replace(/\\D/g, '');
    return cleaned.slice(0, 5);
  }}
  placeholder="75001"
  maxLength={5}
  onValidate={(value) => {
    const cleaned = value.replace(/\\D/g, '');
    return cleaned.length === 5;
  }}
/>
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
                <td className="border border-border px-4 py-3 font-mono text-sm">value</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">string</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">''</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Valeur du champ</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">onChange</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">(value: string) => void</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">-</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Callback lors du changement</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">mask</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">(raw: string) => string</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">-</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Fonction de masquage</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">placeholder</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">string</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">''</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Texte d'aide</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">maxLength</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">number</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Infinity</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Longueur maximale</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">onValidate</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">(value: string) => boolean</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">-</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Fonction de validation</td>
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
          <li>• Créez des <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">masques personnalisés</code> pour vos besoins</li>
          <li>• Utilisez des <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">placeholders</code> pour guider l'utilisateur</li>
          <li>• Implémentez la <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">validation</code> pour assurer la qualité des données</li>
          <li>• Définissez des <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">limites de longueur</code> appropriées</li>
          <li>• Respectez les <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">guidelines d'accessibilité</code></li>
        </ul>
      </div>
    </div>
  );
}