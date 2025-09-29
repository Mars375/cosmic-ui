'use client';

import { useState } from 'react';
import { InputWithMask } from '@cosmic-ui/react';

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

export default function InputMaskPage() {
  const [showCode, setShowCode] = useState(false);
  const [showCodeVariants, setShowCodeVariants] = useState(false);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const [phoneValue, setPhoneValue] = useState('');
  const [creditCardValue, setCreditCardValue] = useState('');

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStates(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCopiedStates(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

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
          <h1 className="text-4xl font-bold">InputMask</h1>
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
          Un composant d'input avec masque personnalisable pour formater
          automatiquement la saisie utilisateur.
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
              <div className="p-4 w-full space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Téléphone
                  </label>
                  <InputWithMask
                    mask={phoneMask}
                    value={phoneValue}
                    onChange={e => setPhoneValue(e.target.value)}
                    placeholder="06 12 34 56 78"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Carte de crédit
                  </label>
                  <InputWithMask
                    mask={creditCardMask}
                    value={creditCardValue}
                    onChange={e => setCreditCardValue(e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                  />
                </div>
              </div>
            ) : (
              <div className="w-full h-full">
                <CodeBlock
                  onCopy={() =>
                    handleCopy(
                      `import { InputWithMask } from '@cosmic-ui/react';
import { useState } from 'react';

// Masque pour téléphone français
const phoneMask = (raw: string) => {
  const cleaned = raw.replace(/\\D/g, '');
  if (cleaned.length <= 2) return cleaned;
  if (cleaned.length <= 4) return \`\${cleaned.slice(0, 2)} \${cleaned.slice(2)}\`;
  if (cleaned.length <= 6) return \`\${cleaned.slice(0, 2)} \${cleaned.slice(2, 4)} \${cleaned.slice(4)}\`;
  return \`\${cleaned.slice(0, 2)} \${cleaned.slice(2, 4)} \${cleaned.slice(4, 6)} \${cleaned.slice(6, 8)}\`;
};

// Masque pour carte de crédit
const creditCardMask = (raw: string) => {
  const cleaned = raw.replace(/\\D/g, '');
  const groups = cleaned.match(/.{1,4}/g) || [];
  return groups.join(' ');
};

export function MyInputMask() {
  const [phoneValue, setPhoneValue] = useState('');
  const [creditCardValue, setCreditCardValue] = useState('');

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-medium">Téléphone</label>
        <InputWithMask
          mask={phoneMask}
          value={phoneValue}
          onChange={(e) => setPhoneValue(e.target.value)}
          placeholder="06 12 34 56 78"
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium">Carte de crédit</label>
        <InputWithMask
          mask={creditCardMask}
          value={creditCardValue}
          onChange={(e) => setCreditCardValue(e.target.value)}
          placeholder="1234 5678 9012 3456"
          maxLength={19}
        />
      </div>
    </div>
  );
}`,
                      'main'
                    )
                  }
                >
                  {`import { InputWithMask } from '@cosmic-ui/react';
import { useState } from 'react';

// Masque pour téléphone français
const phoneMask = (raw: string) => {
  const cleaned = raw.replace(/\\D/g, '');
  if (cleaned.length <= 2) return cleaned;
  if (cleaned.length <= 4) return \`\${cleaned.slice(0, 2)} \${cleaned.slice(2)}\`;
  if (cleaned.length <= 6) return \`\${cleaned.slice(0, 2)} \${cleaned.slice(2, 4)} \${cleaned.slice(4)}\`;
  return \`\${cleaned.slice(0, 2)} \${cleaned.slice(2, 4)} \${cleaned.slice(4, 6)} \${cleaned.slice(6, 8)}\`;
};

// Masque pour carte de crédit
const creditCardMask = (raw: string) => {
  const cleaned = raw.replace(/\\D/g, '');
  const groups = cleaned.match(/.{1,4}/g) || [];
  return groups.join(' ');
};

export function MyInputMask() {
  const [phoneValue, setPhoneValue] = useState('');
  const [creditCardValue, setCreditCardValue] = useState('');

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-medium">Téléphone</label>
        <InputWithMask
          mask={phoneMask}
          value={phoneValue}
          onChange={(e) => setPhoneValue(e.target.value)}
          placeholder="06 12 34 56 78"
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium">Carte de crédit</label>
        <InputWithMask
          mask={creditCardMask}
          value={creditCardValue}
          onChange={(e) => setCreditCardValue(e.target.value)}
          placeholder="1234 5678 9012 3456"
          maxLength={19}
        />
      </div>
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
              Le composant InputMask est déjà inclus dans le package
              @cosmic-ui/react.
            </p>
            <CodeBlock
              onCopy={() =>
                handleCopy(`npm install @cosmic-ui/react`, 'install')
              }
            >
              {`npm install @cosmic-ui/react`}
            </CodeBlock>
          </div>
        </div>

        {/* Usage */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Utilisation</h2>
          <div className="bg-cosmic-card border border-cosmic-border rounded-lg p-4">
            <p className="text-cosmic-muted-foreground mb-4">
              Créez des masques personnalisés pour formater la saisie
              utilisateur.
            </p>
            <CodeBlock
              onCopy={() =>
                handleCopy(
                  `import { InputWithMask } from '@cosmic-ui/react';

const dateMask = (raw: string) => {
  const cleaned = raw.replace(/\\D/g, '');
  if (cleaned.length <= 2) return cleaned;
  if (cleaned.length <= 4) return \`\${cleaned.slice(0, 2)}/\${cleaned.slice(2)}\`;
  return \`\${cleaned.slice(0, 2)}/\${cleaned.slice(2, 4)}/\${cleaned.slice(4, 8)}\`;
};

<InputWithMask
  mask={dateMask}
  placeholder="JJ/MM/AAAA"
/>`,
                  'usage'
                )
              }
            >
              {`import { InputWithMask } from '@cosmic-ui/react';

const dateMask = (raw: string) => {
  const cleaned = raw.replace(/\\D/g, '');
  if (cleaned.length <= 2) return cleaned;
  if (cleaned.length <= 4) return \`\${cleaned.slice(0, 2)}/\${cleaned.slice(2)}\`;
  return \`\${cleaned.slice(0, 2)}/\${cleaned.slice(2, 4)}/\${cleaned.slice(4, 8)}\`;
};

<InputWithMask
  mask={dateMask}
  placeholder="JJ/MM/AAAA"
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
                    <h3 className="text-sm font-medium mb-2">Date</h3>
                    <InputWithMask
                      mask={raw => {
                        const cleaned = raw.replace(/\D/g, '');
                        if (cleaned.length <= 2) return cleaned;
                        if (cleaned.length <= 4)
                          return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
                        return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
                      }}
                      placeholder="JJ/MM/AAAA"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">Code postal</h3>
                    <InputWithMask
                      mask={raw => raw.replace(/\D/g, '').slice(0, 5)}
                      placeholder="75001"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">SIRET</h3>
                    <InputWithMask
                      mask={raw => {
                        const cleaned = raw.replace(/\D/g, '');
                        if (cleaned.length <= 3) return cleaned;
                        if (cleaned.length <= 6)
                          return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
                        if (cleaned.length <= 9)
                          return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
                        return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 9)} ${cleaned.slice(9, 14)}`;
                      }}
                      placeholder="123 456 789 01234"
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full h-full">
                  <CodeBlock
                    onCopy={() =>
                      handleCopy(
                        `// Masque pour date
const dateMask = (raw: string) => {
  const cleaned = raw.replace(/\\D/g, '');
  if (cleaned.length <= 2) return cleaned;
  if (cleaned.length <= 4) return \`\${cleaned.slice(0, 2)}/\${cleaned.slice(2)}\`;
  return \`\${cleaned.slice(0, 2)}/\${cleaned.slice(2, 4)}/\${cleaned.slice(4, 8)}\`;
};

<InputWithMask mask={dateMask} placeholder="JJ/MM/AAAA" />

// Masque pour code postal
const postalCodeMask = (raw: string) => raw.replace(/\\D/g, '').slice(0, 5);

<InputWithMask mask={postalCodeMask} placeholder="75001" />

// Masque pour SIRET
const siretMask = (raw: string) => {
  const cleaned = raw.replace(/\\D/g, '');
  if (cleaned.length <= 3) return cleaned;
  if (cleaned.length <= 6) return \`\${cleaned.slice(0, 3)} \${cleaned.slice(3)}\`;
  if (cleaned.length <= 9) return \`\${cleaned.slice(0, 3)} \${cleaned.slice(3, 6)} \${cleaned.slice(6)}\`;
  return \`\${cleaned.slice(0, 3)} \${cleaned.slice(3, 6)} \${cleaned.slice(6, 9)} \${cleaned.slice(9, 14)}\`;
};

<InputWithMask mask={siretMask} placeholder="123 456 789 01234" />`,
                        'variants'
                      )
                    }
                  >
                    {`// Masque pour date
const dateMask = (raw: string) => {
  const cleaned = raw.replace(/\\D/g, '');
  if (cleaned.length <= 2) return cleaned;
  if (cleaned.length <= 4) return \`\${cleaned.slice(0, 2)}/\${cleaned.slice(2)}\`;
  return \`\${cleaned.slice(0, 2)}/\${cleaned.slice(2, 4)}/\${cleaned.slice(4, 8)}\`;
};

<InputWithMask mask={dateMask} placeholder="JJ/MM/AAAA" />

// Masque pour code postal
const postalCodeMask = (raw: string) => raw.replace(/\\D/g, '').slice(0, 5);

<InputWithMask mask={postalCodeMask} placeholder="75001" />

// Masque pour SIRET
const siretMask = (raw: string) => {
  const cleaned = raw.replace(/\\D/g, '');
  if (cleaned.length <= 3) return cleaned;
  if (cleaned.length <= 6) return \`\${cleaned.slice(0, 3)} \${cleaned.slice(3)}\`;
  if (cleaned.length <= 9) return \`\${cleaned.slice(0, 3)} \${cleaned.slice(3, 6)} \${cleaned.slice(6)}\`;
  return \`\${cleaned.slice(0, 3)} \${cleaned.slice(3, 6)} \${cleaned.slice(6, 9)} \${cleaned.slice(9, 14)}\`;
};

<InputWithMask mask={siretMask} placeholder="123 456 789 01234" />`}
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
