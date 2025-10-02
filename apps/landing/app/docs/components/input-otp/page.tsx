'use client';

import * as React from 'react';
import { useState } from 'react';
import { CodeBlock } from '../../../components/code-block';
import { InputOTP } from 'cosmic-ui-mars';
import { Shield } from 'lucide-react';

export default function InputOTPPage() {
  const [otpValue, setOtpValue] = useState('');
  const [otp4Value, setOtp4Value] = useState('');
  const [otp8Value, setOtp8Value] = useState('');

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">InputOTP</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Champ de saisie pour les codes OTP (One-Time Password) avec navigation automatique entre les champs.
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
                    Code OTP (6 chiffres)
                  </label>
                  <InputOTP
                    value={otpValue}
                    onChange={setOtpValue}
                    length={6}
                    placeholder="000000"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Code OTP (4 chiffres)
                  </label>
                  <InputOTP
                    value={otp4Value}
                    onChange={setOtp4Value}
                    length={4}
                    placeholder="0000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Code OTP (8 chiffres)
                  </label>
                  <InputOTP
                    value={otp8Value}
                    onChange={setOtp8Value}
                    length={8}
                    placeholder="00000000"
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4 text-foreground">Code</h3>
            <CodeBlock language="typescript" filePath="components/InputOTPExample.tsx" showPackageManager={false}>
{`import { InputOTP } from 'cosmic-ui-mars';
import { useState } from 'react';

const [otpValue, setOtpValue] = useState('');

<InputOTP
  value={otpValue}
  onChange={setOtpValue}
  length={6}
  placeholder="000000"
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
              <h3 className="text-lg font-medium text-foreground">OTP avec validation</h3>
              <p className="text-muted-foreground">OTP avec validation en temps réel.</p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Code de vérification
                  </label>
                  <InputOTP
                    value=""
                    onChange={() => {}}
                    length={6}
                    placeholder="000000"
                    onComplete={(value) => {
                      if (value === '123456') {
                        console.log('Code correct !');
                      } else {
                        console.log('Code incorrect');
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            <div>
              <CodeBlock language="typescript" filePath="components/ValidatedOTP.tsx" showPackageManager={false}>
{`export default function App\docs\components\inputOtp\page.tsxExample() {
  <InputOTP
  value={otpValue}
  onChange={setOtpValue}
  length={6}
  placeholder="000000"
  onComplete={(value) => {
    if (value === '123456') {
      console.log('Code correct !');
    } else {
      console.log('Code incorrect');
    }
  }}
/>
}`}
              </CodeBlock>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">OTP avec auto-focus</h3>
              <p className="text-muted-foreground">OTP avec focus automatique sur le premier champ.</p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Code OTP
                  </label>
                  <InputOTP
                    value=""
                    onChange={() => {}}
                    length={6}
                    placeholder="000000"
                    autoFocus
                  />
                </div>
              </div>
            </div>
            <div>
              <CodeBlock language="typescript" filePath="components/AutoFocusOTP.tsx" showPackageManager={false}>
{`export default function App\docs\components\inputOtp\page.tsxExample() {
  return <InputOTP
  value={otpValue}
  onChange={setOtpValue}
  length={6}
  placeholder="000000"
  autoFocus
/>;
}`}
              </CodeBlock>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">OTP avec masquage</h3>
              <p className="text-muted-foreground">OTP avec masquage des caractères pour la sécurité.</p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Code secret
                  </label>
                  <InputOTP
                    value=""
                    onChange={() => {}}
                    length={6}
                    placeholder="000000"
                    mask="*"
                  />
                </div>
              </div>
            </div>
            <div>
              <CodeBlock language="typescript" filePath="components/MaskedOTP.tsx" showPackageManager={false}>
{`export default function App\docs\components\inputOtp\page.tsxExample() {
  return <InputOTP
  value={otpValue}
  onChange={setOtpValue}
  length={6}
  placeholder="000000"
  mask="*"
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
                <td className="border border-border px-4 py-3 font-mono text-sm">value</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">string</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">''</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Valeur du code OTP</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">onChange</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">(value: string) => void</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">-</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Callback lors du changement</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">length</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">number</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">6</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Nombre de caractères</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">placeholder</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">string</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">''</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Texte d'aide</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">onComplete</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">(value: string) => void</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">-</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Callback quand le code est complet</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">autoFocus</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">boolean</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">false</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Focus automatique</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">mask</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">string</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">''</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Caractère de masquage</td>
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
          <li>• Utilisez des <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">codes courts</code> (4-6 caractères) pour l'UX</li>
          <li>• Implémentez la <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">validation</code> côté serveur</li>
          <li>• Ajoutez un <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">masquage</code> pour les codes sensibles</li>
          <li>• Utilisez l'<code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">auto-focus</code> pour améliorer l'UX</li>
          <li>• Respectez les <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">guidelines d'accessibilité</code></li>
        </ul>
      </div>
    </div>
  );
}