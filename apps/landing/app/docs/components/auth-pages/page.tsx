'use client';

import * as React from 'react';
import { useState } from 'react';
import { CodeBlock } from '../../../components/code-block';
import { LoginPage, RegisterPage } from 'cosmic-ui-mars';
import { Button } from 'cosmic-ui-mars';
import { LogIn, UserPlus, Mail, Lock, User } from 'lucide-react';

export default function AuthPagesPage() {
  const [currentPage, setCurrentPage] = useState<'login' | 'register'>('login');

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <LogIn className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">Auth Pages</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Composants de pages d'authentification prêts à l'emploi pour login et
          inscription.
        </p>
      </div>

      {/* Installation */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">
          Installation
        </h2>
        <CodeBlock filePath="package.json">pnpm add cosmic-ui-mars</CodeBlock>
      </div>

      {/* Usage basique */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">
          Usage basique
        </h2>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Exemple</h3>
            <div className="p-6 bg-muted/30 rounded-lg border">
              <div className="flex gap-2 mb-4">
                <Button
                  variant={currentPage === 'login' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentPage('login')}
                >
                  Login
                </Button>
                <Button
                  variant={currentPage === 'register' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentPage('register')}
                >
                  Register
                </Button>
              </div>
              {currentPage === 'login' ? <LoginPage /> : <RegisterPage />}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4 text-foreground">Code</h3>
            <CodeBlock
              language="typescript"
              filePath="components/AuthPagesExample.tsx"
              showPackageManager={false}
            >
              {`import { LoginPage, RegisterPage } from 'cosmic-ui-mars';
import { useState } from 'react';

const [currentPage, setCurrentPage] = useState<'login' | 'register'>('login');

{currentPage === 'login' ? <LoginPage /> : <RegisterPage />}`}
            </CodeBlock>
          </div>
        </div>
      </div>

      {/* Composants individuels */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">
          Composants individuels
        </h2>
        <div className="space-y-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">
                Page de connexion
              </h3>
              <p className="text-muted-foreground">
                Composant de page de connexion avec formulaire.
              </p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <LoginPage />
              </div>
            </div>
            <div>
              <CodeBlock
                language="typescript"
                filePath="components/LoginPageExample.tsx"
                showPackageManager={false}
              >
                {`import { LoginPage } from 'cosmic-ui-mars';

<LoginPage />`}
              </CodeBlock>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">
                Page d'inscription
              </h3>
              <p className="text-muted-foreground">
                Composant de page d'inscription avec formulaire.
              </p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <RegisterPage />
              </div>
            </div>
            <div>
              <CodeBlock
                language="typescript"
                filePath="components/RegisterPageExample.tsx"
                showPackageManager={false}
              >
                {`import { RegisterPage } from 'cosmic-ui-mars';

<RegisterPage />`}
              </CodeBlock>
            </div>
          </div>
        </div>
      </div>

      {/* Référence API */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">
          Référence API
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-border rounded-lg">
            <thead>
              <tr className="bg-muted/50">
                <th className="border border-border px-4 py-3 text-left font-medium text-foreground">
                  Composant
                </th>
                <th className="border border-border px-4 py-3 text-left font-medium text-foreground">
                  Props
                </th>
                <th className="border border-border px-4 py-3 text-left font-medium text-foreground">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">
                  LoginPage
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  -
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  Page de connexion avec formulaire
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">
                  RegisterPage
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  -
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  Page d'inscription avec formulaire
                </td>
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
          <li>
            • Utilisez{' '}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              LoginPage
            </code>{' '}
            pour la connexion
          </li>
          <li>
            • Utilisez{' '}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              RegisterPage
            </code>{' '}
            pour l'inscription
          </li>
          <li>• Personnalisez les styles selon votre design system</li>
          <li>• Intégrez avec votre système d'authentification</li>
          <li>
            • Respectez les{' '}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              guidelines d'accessibilité
            </code>
          </li>
        </ul>
      </div>
    </div>
  );
}
