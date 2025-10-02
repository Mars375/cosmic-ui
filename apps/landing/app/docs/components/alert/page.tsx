'use client';

import * as React from 'react';
import { useState } from 'react';
import { Alert, AlertTitle, AlertDescription } from 'cosmic-ui-mars';
import { CodeBlock } from '../../../components/code-block';
import { Button } from 'cosmic-ui-mars';
import { AlertTriangle, CheckCircle, Info, XCircle, X } from 'lucide-react';

export default function AlertPage() {
  const [showAlert, setShowAlert] = useState(true);
  const [alertType, setAlertType] = useState<
    'info' | 'success' | 'warning' | 'error'
  >('info');

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <svg
              className="w-6 h-6 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-foreground">Alert</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Un composant d'alerte pour afficher des messages importants à
          l'utilisateur.
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
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Information</AlertTitle>
                <AlertDescription>
                  Ceci est une alerte d'information avec un titre et une
                  description.
                </AlertDescription>
              </Alert>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4 text-foreground">Code</h3>
            <CodeBlock
              language="typescript"
              filePath="components/AlertExample.tsx"
              showPackageManager={false}
            >
              {`import { Alert, AlertTitle, AlertDescription } from 'cosmic-ui-mars';
import { Info } from 'lucide-react';

<Alert>
  <Info className="h-4 w-4" />
  <AlertTitle>Information</AlertTitle>
  <AlertDescription>
    Ceci est une alerte d'information avec un titre et une description.
  </AlertDescription>
</Alert>`}
            </CodeBlock>
          </div>
        </div>
      </div>

      {/* Variants */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">
          Variants
        </h2>
        <div className="space-y-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">
                Alerte de succès
              </h3>
              <p className="text-muted-foreground">
                Alerte avec style de succès personnalisé.
              </p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <Alert className="border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-900/20 dark:text-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <AlertTitle>Succès</AlertTitle>
                  <AlertDescription>
                    Votre opération a été réalisée avec succès !
                  </AlertDescription>
                </Alert>
              </div>
            </div>
            <div>
              <CodeBlock
                language="typescript"
                filePath="components/SuccessAlert.tsx"
                showPackageManager={false}
              >
                {`import { Alert, AlertTitle, AlertDescription } from 'cosmic-ui-mars';
import { CheckCircle } from 'lucide-react';

<Alert className="border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-900/20 dark:text-green-200">
  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
  <AlertTitle>Succès</AlertTitle>
  <AlertDescription>
    Votre opération a été réalisée avec succès !
  </AlertDescription>
</Alert>`}
              </CodeBlock>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">
                Alerte d'erreur
              </h3>
              <p className="text-muted-foreground">
                Alerte avec style d'erreur personnalisé.
              </p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <Alert className="border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-900/20 dark:text-red-200">
                  <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                  <AlertTitle>Erreur</AlertTitle>
                  <AlertDescription>
                    Une erreur s'est produite lors du traitement de votre
                    demande.
                  </AlertDescription>
                </Alert>
              </div>
            </div>
            <div>
              <CodeBlock
                language="typescript"
                filePath="components/ErrorAlert.tsx"
                showPackageManager={false}
              >
                {`import { Alert, AlertTitle, AlertDescription } from 'cosmic-ui-mars';
import { XCircle } from 'lucide-react';

<Alert className="border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-900/20 dark:text-red-200">
  <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
  <AlertTitle>Erreur</AlertTitle>
  <AlertDescription>
    Une erreur s'est produite lors du traitement de votre demande.
  </AlertDescription>
</Alert>`}
              </CodeBlock>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">
                Alerte d'avertissement
              </h3>
              <p className="text-muted-foreground">
                Alerte avec style d'avertissement personnalisé.
              </p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <Alert className="border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200">
                  <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                  <AlertTitle>Attention</AlertTitle>
                  <AlertDescription>
                    Veuillez vérifier vos données avant de continuer.
                  </AlertDescription>
                </Alert>
              </div>
            </div>
            <div>
              <CodeBlock
                language="typescript"
                filePath="components/WarningAlert.tsx"
                showPackageManager={false}
              >
                {`import { Alert, AlertTitle, AlertDescription } from 'cosmic-ui-mars';
import { AlertTriangle } from 'lucide-react';

<Alert className="border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200">
  <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
  <AlertTitle>Attention</AlertTitle>
  <AlertDescription>
    Veuillez vérifier vos données avant de continuer.
  </AlertDescription>
</Alert>`}
              </CodeBlock>
            </div>
          </div>
        </div>
      </div>

      {/* Exemples interactifs */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">
          Exemples interactifs
        </h2>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">
              Alerte avec fermeture
            </h3>
            <p className="text-muted-foreground">
              Alerte que l'utilisateur peut fermer.
            </p>
            <div className="p-6 bg-muted/30 rounded-lg border">
              <div className="space-y-4">
                {showAlert && (
                  <Alert className="relative">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Notification</AlertTitle>
                    <AlertDescription>
                      Cette alerte peut être fermée en cliquant sur le bouton X.
                    </AlertDescription>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 h-6 w-6 p-0"
                      onClick={() => setShowAlert(false)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Alert>
                )}
                {!showAlert && (
                  <Button onClick={() => setShowAlert(true)}>
                    Afficher l'alerte
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div>
            <CodeBlock
              language="typescript"
              filePath="components/DismissibleAlert.tsx"
              showPackageManager={false}
            >
              {`import { Alert, AlertTitle, AlertDescription } from 'cosmic-ui-mars';
import { Button } from 'cosmic-ui-mars';
import { Info, X } from 'lucide-react';
import { useState } from 'react';

const [showAlert, setShowAlert] = useState(true);

{showAlert && (
  <Alert className="relative">
    <Info className="h-4 w-4" />
    <AlertTitle>Notification</AlertTitle>
    <AlertDescription>
      Cette alerte peut être fermée en cliquant sur le bouton X.
    </AlertDescription>
    <Button
      variant="ghost"
      size="sm"
      className="absolute top-2 right-2 h-6 w-6 p-0"
      onClick={() => setShowAlert(false)}
    >
      <X className="h-3 w-3" />
    </Button>
  </Alert>
)}`}
            </CodeBlock>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">
              Types d'alertes dynamiques
            </h3>
            <p className="text-muted-foreground">
              Changez le type d'alerte dynamiquement.
            </p>
            <div className="p-6 bg-muted/30 rounded-lg border">
              <div className="space-y-4">
                <div className="flex gap-2 flex-wrap">
                  <Button
                    size="sm"
                    variant={alertType === 'info' ? 'default' : 'outline'}
                    onClick={() => setAlertType('info')}
                  >
                    Info
                  </Button>
                  <Button
                    size="sm"
                    variant={alertType === 'success' ? 'default' : 'outline'}
                    onClick={() => setAlertType('success')}
                  >
                    Succès
                  </Button>
                  <Button
                    size="sm"
                    variant={alertType === 'warning' ? 'default' : 'outline'}
                    onClick={() => setAlertType('warning')}
                  >
                    Attention
                  </Button>
                  <Button
                    size="sm"
                    variant={alertType === 'error' ? 'default' : 'outline'}
                    onClick={() => setAlertType('error')}
                  >
                    Erreur
                  </Button>
                </div>

                {alertType === 'info' && (
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Information</AlertTitle>
                    <AlertDescription>
                      Voici une information importante.
                    </AlertDescription>
                  </Alert>
                )}

                {alertType === 'success' && (
                  <Alert className="border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-900/20 dark:text-green-200">
                    <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <AlertTitle>Succès</AlertTitle>
                    <AlertDescription>
                      L'opération s'est déroulée avec succès !
                    </AlertDescription>
                  </Alert>
                )}

                {alertType === 'warning' && (
                  <Alert className="border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200">
                    <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                    <AlertTitle>Attention</AlertTitle>
                    <AlertDescription>
                      Veuillez faire attention à cette action.
                    </AlertDescription>
                  </Alert>
                )}

                {alertType === 'error' && (
                  <Alert className="border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-900/20 dark:text-red-200">
                    <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                    <AlertTitle>Erreur</AlertTitle>
                    <AlertDescription>
                      Une erreur s'est produite.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </div>
          </div>
          <div>
            <CodeBlock
              language="typescript"
              filePath="components/DynamicAlert.tsx"
              showPackageManager={false}
            >
              {`import { Alert, AlertTitle, AlertDescription } from 'cosmic-ui-mars';
import { Button } from 'cosmic-ui-mars';
import { Info, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { useState } from 'react';

const [alertType, setAlertType] = useState<'info' | 'success' | 'warning' | 'error'>('info');

<div className="flex gap-2 flex-wrap">
  <Button
    size="sm"
    variant={alertType === 'info' ? 'default' : 'outline'}
    onClick={() => setAlertType('info')}
  >
    Info
  </Button>
  {/* Autres boutons... */}
</div>

{alertType === 'info' && (
  <Alert>
    <Info className="h-4 w-4" />
    <AlertTitle>Information</AlertTitle>
    <AlertDescription>Voici une information importante.</AlertDescription>
  </Alert>
)}

{/* Autres types d'alertes... */}`}
            </CodeBlock>
          </div>
        </div>
      </div>

      {/* API Reference */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">
          Référence API
        </h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              Alert
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="border border-border px-4 py-3 text-left font-medium text-foreground">
                      Prop
                    </th>
                    <th className="border border-border px-4 py-3 text-left font-medium text-foreground">
                      Type
                    </th>
                    <th className="border border-border px-4 py-3 text-left font-medium text-foreground">
                      Défaut
                    </th>
                    <th className="border border-border px-4 py-3 text-left font-medium text-foreground">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border px-4 py-3 font-mono text-sm">
                      className
                    </td>
                    <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                      string
                    </td>
                    <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                      -
                    </td>
                    <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                      Classes CSS supplémentaires
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-3 font-mono text-sm">
                      children
                    </td>
                    <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                      React.ReactNode
                    </td>
                    <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                      -
                    </td>
                    <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                      Contenu de l'alerte
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              AlertTitle
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="border border-border px-4 py-3 text-left font-medium text-foreground">
                      Prop
                    </th>
                    <th className="border border-border px-4 py-3 text-left font-medium text-foreground">
                      Type
                    </th>
                    <th className="border border-border px-4 py-3 text-left font-medium text-foreground">
                      Défaut
                    </th>
                    <th className="border border-border px-4 py-3 text-left font-medium text-foreground">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border px-4 py-3 font-mono text-sm">
                      className
                    </td>
                    <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                      string
                    </td>
                    <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                      -
                    </td>
                    <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                      Classes CSS supplémentaires
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-3 font-mono text-sm">
                      children
                    </td>
                    <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                      React.ReactNode
                    </td>
                    <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                      -
                    </td>
                    <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                      Titre de l'alerte
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              AlertDescription
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="border border-border px-4 py-3 text-left font-medium text-foreground">
                      Prop
                    </th>
                    <th className="border border-border px-4 py-3 text-left font-medium text-foreground">
                      Type
                    </th>
                    <th className="border border-border px-4 py-3 text-left font-medium text-foreground">
                      Défaut
                    </th>
                    <th className="border border-border px-4 py-3 text-left font-medium text-foreground">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border px-4 py-3 font-mono text-sm">
                      className
                    </td>
                    <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                      string
                    </td>
                    <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                      -
                    </td>
                    <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                      Classes CSS supplémentaires
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-3 font-mono text-sm">
                      children
                    </td>
                    <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                      React.ReactNode
                    </td>
                    <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                      -
                    </td>
                    <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                      Description de l'alerte
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
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
              AlertTitle
            </code>{' '}
            et{' '}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              AlertDescription
            </code>{' '}
            pour structurer le contenu
          </li>
          <li>
            • Ajoutez des{' '}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              icônes
            </code>{' '}
            pour améliorer la compréhension visuelle
          </li>
          <li>
            • Utilisez des{' '}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              classes CSS personnalisées
            </code>{' '}
            pour créer différents types d'alertes
          </li>
          <li>
            • Implémentez la{' '}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              fermeture
            </code>{' '}
            pour les alertes temporaires
          </li>
          <li>
            • Respectez les{' '}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              guidelines d'accessibilité
            </code>{' '}
            avec l'attribut role="alert"
          </li>
        </ul>
      </div>
    </div>
  );
}
