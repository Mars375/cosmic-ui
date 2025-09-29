'use client';

import { useState } from 'react';
import { InputOTP } from '@cosmic-ui/ui';

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

export default function InputOTPPage() {
  const [showCode, setShowCode] = useState(false);
  const [showCodeVariants, setShowCodeVariants] = useState(false);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const [otpValue, setOtpValue] = useState('');
  const [otp4Value, setOtp4Value] = useState('');
  const [otp8Value, setOtp8Value] = useState('');

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStates(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCopiedStates(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
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
          <h1 className="text-4xl font-bold">InputOTP</h1>
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
        <p className="text-lg text-gray-600 dark:text-gray-400-foreground mb-8">
          Un composant d'input pour les codes OTP (One-Time Password) avec
          navigation automatique entre les champs.
        </p>

        {/* Main Preview */}
        <div className="mb-12">
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setShowCode(false)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                !showCode
                  ? 'bg-cosmic-primary text-white'
                  : 'bg-cosmic-border text-gray-900 dark:text-white hover:bg-cosmic-border/80'
              }`}
            >
              Preview
            </button>
            <button
              onClick={() => setShowCode(true)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                showCode
                  ? 'bg-cosmic-primary text-white'
                  : 'bg-cosmic-border text-gray-900 dark:text-white hover:bg-cosmic-border/80'
              }`}
            >
              Code
            </button>
          </div>

          <div className="bg-cosmic-card border border-gray-200 dark:border-gray-700 rounded-lg p-2 min-h-[450px] w-[500px] flex justify-start">
            {!showCode ? (
              <div className="p-4 w-full flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-sm font-medium mb-4">
                    Code de vérification
                  </h3>
                  <InputOTP
                    length={6}
                    value={otpValue}
                    onChange={setOtpValue}
                  />
                  <p className="text-xs text-gray-600 dark:text-gray-400-foreground mt-2">
                    Entrez le code à 6 chiffres
                  </p>
                </div>
              </div>
            ) : (
              <div className="w-full">
                <CodeBlock
                  onCopy={() =>
                    handleCopy(
                      `import { InputOTP } from '@cosmic-ui/ui';
import { useState } from 'react';

export function MyInputOTP() {
  const [otpValue, setOtpValue] = useState('');

  return (
    <div className="text-center">
      <h3 className="text-sm font-medium mb-4">
        Code de vérification
      </h3>
      <InputOTP
        length={6}
        value={otpValue}
        onChange={setOtpValue}
      />
      <p className="text-xs text-gray-600 dark:text-gray-400-foreground mt-2">
        Entrez le code à 6 chiffres
      </p>
    </div>
  );
}`,
                      'main'
                    )
                  }
                >
                  {`import { InputOTP } from '@cosmic-ui/ui';
import { useState } from 'react';

export function MyInputOTP() {
  const [otpValue, setOtpValue] = useState('');

  return (
    <div className="text-center">
      <h3 className="text-sm font-medium mb-4">
        Code de vérification
      </h3>
      <InputOTP
        length={6}
        value={otpValue}
        onChange={setOtpValue}
      />
      <p className="text-xs text-gray-600 dark:text-gray-400-foreground mt-2">
        Entrez le code à 6 chiffres
      </p>
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
          <div className="bg-cosmic-card border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <p className="text-gray-600 dark:text-gray-400-foreground mb-4">
              Le composant InputOTP est déjà inclus dans le package
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
          <div className="bg-cosmic-card border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <p className="text-gray-600 dark:text-gray-400-foreground mb-4">
              Utilisez le composant pour saisir des codes OTP avec navigation
              automatique.
            </p>
            <CodeBlock
              onCopy={() =>
                handleCopy(
                  `import { InputOTP } from '@cosmic-ui/ui';

<InputOTP
  length={6}
  value={otpCode}
  onChange={setOtpCode}
/>`,
                  'usage'
                )
              }
            >
              {`import { InputOTP } from '@cosmic-ui/ui';

<InputOTP
  length={6}
  value={otpCode}
  onChange={setOtpCode}
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
                    : 'bg-cosmic-border text-gray-900 dark:text-white hover:bg-cosmic-border/80'
                }`}
              >
                Preview
              </button>
              <button
                onClick={() => setShowCodeVariants(true)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  showCodeVariants
                    ? 'bg-cosmic-primary text-white'
                    : 'bg-cosmic-border text-gray-900 dark:text-white hover:bg-cosmic-border/80'
                }`}
              >
                Code
              </button>
            </div>

            <div className="bg-cosmic-card border border-gray-200 dark:border-gray-700 rounded-lg p-2 min-h-[450px] w-[500px] flex justify-start">
              {!showCodeVariants ? (
                <div className="p-4 w-full space-y-8">
                  <div className="text-center">
                    <h3 className="text-sm font-medium mb-4">
                      Code à 4 chiffres
                    </h3>
                    <InputOTP
                      length={4}
                      value={otp4Value}
                      onChange={setOtp4Value}
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-sm font-medium mb-4">
                      Code à 6 chiffres
                    </h3>
                    <InputOTP
                      length={6}
                      value={otpValue}
                      onChange={setOtpValue}
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-sm font-medium mb-4">
                      Code à 8 chiffres
                    </h3>
                    <InputOTP
                      length={8}
                      value={otp8Value}
                      onChange={setOtp8Value}
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full">
                  <CodeBlock
                    onCopy={() =>
                      handleCopy(
                        `// Code à 4 chiffres
<InputOTP
  length={4}
  value={otp4Value}
  onChange={setOtp4Value}
/>

// Code à 6 chiffres
<InputOTP
  length={6}
  value={otp6Value}
  onChange={setOtp6Value}
/>

// Code à 8 chiffres
<InputOTP
  length={8}
  value={otp8Value}
  onChange={setOtp8Value}
/>`,
                        'variants'
                      )
                    }
                  >
                    {`// Code à 4 chiffres
<InputOTP
  length={4}
  value={otp4Value}
  onChange={setOtp4Value}
/>

// Code à 6 chiffres
<InputOTP
  length={6}
  value={otp6Value}
  onChange={setOtp6Value}
/>

// Code à 8 chiffres
<InputOTP
  length={8}
  value={otp8Value}
  onChange={setOtp8Value}
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
