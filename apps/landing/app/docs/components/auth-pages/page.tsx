'use client';

import { useState } from 'react';
import { LoginPage, RegisterPage } from '@cosmic-ui/react';
import { Button } from '@cosmic-ui/react';
import { LogIn, UserPlus, Mail, Lock, User } from 'lucide-react';

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

export default function AuthPagesPage() {
  const [showCode, setShowCode] = useState(false);
  const [showCodeVariants, setShowCodeVariants] = useState(false);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const [currentPage, setCurrentPage] = useState<'login' | 'register'>('login');

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStates(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCopiedStates(prev => ({ ...prev, [id]: false }));
    }, 2000);
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
          <h1 className="text-4xl font-bold">Auth Pages</h1>
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
          Des pages d'authentification prêtes à l'emploi pour la connexion et
          l'inscription.
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
                  <div className="flex gap-2 mb-4">
                    <button
                      onClick={() => setCurrentPage('login')}
                      className={`px-3 py-1 rounded text-sm ${
                        currentPage === 'login'
                          ? 'bg-cosmic-primary text-white'
                          : 'bg-cosmic-border text-cosmic-foreground hover:bg-cosmic-border/80'
                      }`}
                    >
                      Connexion
                    </button>
                    <button
                      onClick={() => setCurrentPage('register')}
                      className={`px-3 py-1 rounded text-sm ${
                        currentPage === 'register'
                          ? 'bg-cosmic-primary text-white'
                          : 'bg-cosmic-border text-cosmic-foreground hover:bg-cosmic-border/80'
                      }`}
                    >
                      Inscription
                    </button>
                  </div>
                  
                  {currentPage === 'login' ? (
                    <LoginPage />
                  ) : (
                    <RegisterPage />
                  )}
                </div>
              </div>
            ) : (
              <div className="w-full h-full">
                <CodeBlock
                  onCopy={() =>
                    handleCopy(
                      `import { LoginPage, RegisterPage } from '@cosmic-ui/react';
import { useState } from 'react';

export function MyAuthPages() {
  const [currentPage, setCurrentPage] = useState<'login' | 'register'>('login');

  return (
    <div className="space-y-4">
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setCurrentPage('login')}
          className={\`px-3 py-1 rounded text-sm \${
            currentPage === 'login'
              ? 'bg-primary text-white'
              : 'bg-border text-foreground hover:bg-border/80'
          }\`}
        >
          Connexion
        </button>
        <button
          onClick={() => setCurrentPage('register')}
          className={\`px-3 py-1 rounded text-sm \${
            currentPage === 'register'
              ? 'bg-primary text-white'
              : 'bg-border text-foreground hover:bg-border/80'
          }\`}
        >
          Inscription
        </button>
      </div>
      
      {currentPage === 'login' ? (
        <LoginPage />
      ) : (
        <RegisterPage />
      )}
    </div>
  );
}`,
                      'main'
                    )
                  }
                >
                  {`import { LoginPage, RegisterPage } from '@cosmic-ui/react';
import { useState } from 'react';

export function MyAuthPages() {
  const [currentPage, setCurrentPage] = useState<'login' | 'register'>('login');

  return (
    <div className="space-y-4">
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setCurrentPage('login')}
          className={\`px-3 py-1 rounded text-sm \${
            currentPage === 'login'
              ? 'bg-primary text-white'
              : 'bg-border text-foreground hover:bg-border/80'
          }\`}
        >
          Connexion
        </button>
        <button
          onClick={() => setCurrentPage('register')}
          className={\`px-3 py-1 rounded text-sm \${
            currentPage === 'register'
              ? 'bg-primary text-white'
              : 'bg-border text-foreground hover:bg-border/80'
          }\`}
        >
          Inscription
        </button>
      </div>
      
      {currentPage === 'login' ? (
        <LoginPage />
      ) : (
        <RegisterPage />
      )}
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
              Les composants Auth Pages sont déjà inclus dans le package
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
              Utilisez ces composants pour créer des pages d'authentification.
            </p>
            <CodeBlock
              onCopy={() =>
                handleCopy(
                  `import { LoginPage, RegisterPage } from '@cosmic-ui/react';

// Page de connexion
<LoginPage />

// Page d'inscription
<RegisterPage />`,
                  'usage'
                )
              }
            >
              {`import { LoginPage, RegisterPage } from '@cosmic-ui/react';

// Page de connexion
<LoginPage />

// Page d'inscription
<RegisterPage />`}
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
                      Page de connexion
                    </h3>
                    <LoginPage />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Page d'inscription
                    </h3>
                    <RegisterPage />
                  </div>
                </div>
              ) : (
                <div className="w-full h-full">
                  <CodeBlock
                    onCopy={() =>
                      handleCopy(
                        `// Page de connexion simple
<LoginPage />

// Page d'inscription simple
<RegisterPage />

// Utilisation dans un layout
<div className="min-h-screen flex items-center justify-center">
  <div className="w-full max-w-md">
    <LoginPage />
  </div>
</div>

// Avec navigation entre les pages
const [isLogin, setIsLogin] = useState(true);

<div className="space-y-4">
  <div className="flex gap-2">
    <button
      onClick={() => setIsLogin(true)}
      className={\`px-3 py-1 rounded \${
        isLogin ? 'bg-primary text-white' : 'bg-border'
      }\`}
    >
      Connexion
    </button>
    <button
      onClick={() => setIsLogin(false)}
      className={\`px-3 py-1 rounded \${
        !isLogin ? 'bg-primary text-white' : 'bg-border'
      }\`}
    >
      Inscription
    </button>
  </div>
  
  {isLogin ? <LoginPage /> : <RegisterPage />}
</div>

// Intégration avec un router
import { useRouter } from 'next/router';

const router = useRouter();

const handleLogin = () => {
  // Logique de connexion
  router.push('/dashboard');
};

const handleRegister = () => {
  // Logique d'inscription
  router.push('/welcome');
};`,
                        'variants'
                      )
                    }
                  >
                    {`// Page de connexion simple
<LoginPage />

// Page d'inscription simple
<RegisterPage />

// Utilisation dans un layout
<div className="min-h-screen flex items-center justify-center">
  <div className="w-full max-w-md">
    <LoginPage />
  </div>
</div>

// Avec navigation entre les pages
const [isLogin, setIsLogin] = useState(true);

<div className="space-y-4">
  <div className="flex gap-2">
    <button
      onClick={() => setIsLogin(true)}
      className={\`px-3 py-1 rounded \${
        isLogin ? 'bg-primary text-white' : 'bg-border'
      }\`}
    >
      Connexion
    </button>
    <button
      onClick={() => setIsLogin(false)}
      className={\`px-3 py-1 rounded \${
        !isLogin ? 'bg-primary text-white' : 'bg-border'
      }\`}
    >
      Inscription
    </button>
  </div>
  
  {isLogin ? <LoginPage /> : <RegisterPage />}
</div>

// Intégration avec un router
import { useRouter } from 'next/router';

const router = useRouter();

const handleLogin = () => {
  // Logique de connexion
  router.push('/dashboard');
};

const handleRegister = () => {
  // Logique d'inscription
  router.push('/welcome');
};`}
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
