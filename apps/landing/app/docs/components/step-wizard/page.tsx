'use client';

import { useState } from 'react';
import { StepWizard } from '@cosmic-ui/ui';
import { Button } from '@cosmic-ui/ui';
import { User, Mail, Lock, Check } from 'lucide-react';

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

export default function StepWizardPage() {
  const [showCode, setShowCode] = useState(false);
  const [showCodeVariants, setShowCodeVariants] = useState(false);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const [currentStep, setCurrentStep] = useState(0);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStates(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCopiedStates(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

  const steps = [
    {
      id: 'personal',
      title: 'Informations personnelles',
      description: 'Renseignez vos informations de base',
      icon: <User className="w-4 h-4" />,
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nom</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
              placeholder="Votre nom"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Prénom</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
              placeholder="Votre prénom"
            />
          </div>
        </div>
      ),
    },
    {
      id: 'contact',
      title: 'Contact',
      description: 'Vos informations de contact',
      icon: <Mail className="w-4 h-4" />,
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
              placeholder="votre@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Téléphone</label>
            <input
              type="tel"
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
              placeholder="06 12 34 56 78"
            />
          </div>
        </div>
      ),
    },
    {
      id: 'security',
      title: 'Sécurité',
      description: 'Créez votre mot de passe',
      icon: <Lock className="w-4 h-4" />,
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Mot de passe
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
              placeholder="Mot de passe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Confirmer le mot de passe
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
              placeholder="Confirmer le mot de passe"
            />
          </div>
        </div>
      ),
    },
    {
      id: 'complete',
      title: 'Terminé',
      description: 'Votre compte a été créé',
      icon: <Check className="w-4 h-4" />,
      content: (
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-medium">Félicitations !</h3>
          <p className="text-gray-600 dark:text-gray-400-foreground">
            Votre compte a été créé avec succès.
          </p>
        </div>
      ),
    },
  ];

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
          <h1 className="text-4xl font-bold">StepWizard</h1>
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
          Un composant d'assistant étape par étape pour guider les utilisateurs
          dans un processus.
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
              <div className="p-4 w-full">
                <StepWizard
                  steps={steps}
                  currentStep={currentStep}
                  onStepChange={setCurrentStep}
                  orientation="horizontal"
                  variant="default"
                  size="md"
                  allowNavigation={true}
                  showProgress={true}
                />
                <div className="flex justify-between mt-4">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                  >
                    Précédent
                  </Button>
                  <Button
                    onClick={() =>
                      setCurrentStep(
                        Math.min(steps.length - 1, currentStep + 1)
                      )
                    }
                    disabled={currentStep === steps.length - 1}
                  >
                    Suivant
                  </Button>
                </div>
              </div>
            ) : (
              <div className="w-full">
                <CodeBlock
                  onCopy={() =>
                    handleCopy(
                      `import { StepWizard } from '@cosmic-ui/ui';
import { Button } from '@cosmic-ui/ui';
import { User, Mail, Lock, Check } from 'lucide-react';
import { useState } from 'react';

export function MyStepWizard() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      id: 'personal',
      title: 'Informations personnelles',
      description: 'Renseignez vos informations de base',
      icon: <User className="w-4 h-4" />,
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nom</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
              placeholder="Votre nom"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Prénom</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
              placeholder="Votre prénom"
            />
          </div>
        </div>
      ),
    },
    {
      id: 'contact',
      title: 'Contact',
      description: 'Vos informations de contact',
      icon: <Mail className="w-4 h-4" />,
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
              placeholder="votre@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Téléphone</label>
            <input
              type="tel"
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
              placeholder="06 12 34 56 78"
            />
          </div>
        </div>
      ),
    },
    {
      id: 'security',
      title: 'Sécurité',
      description: 'Créez votre mot de passe',
      icon: <Lock className="w-4 h-4" />,
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Mot de passe</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
              placeholder="Mot de passe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Confirmer le mot de passe
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
              placeholder="Confirmer le mot de passe"
            />
          </div>
        </div>
      ),
    },
    {
      id: 'complete',
      title: 'Terminé',
      description: 'Votre compte a été créé',
      icon: <Check className="w-4 h-4" />,
      content: (
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-medium">Félicitations !</h3>
          <p className="text-gray-600 dark:text-gray-400-foreground">
            Votre compte a été créé avec succès.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div>
      <StepWizard
        steps={steps}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
        orientation="horizontal"
        variant="default"
        size="md"
        allowNavigation={true}
        showProgress={true}
      />
      <div className="flex justify-between mt-4">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
        >
          Précédent
        </Button>
        <Button
          onClick={() =>
            setCurrentStep(Math.min(steps.length - 1, currentStep + 1))
          }
          disabled={currentStep === steps.length - 1}
        >
          Suivant
        </Button>
      </div>
    </div>
  );
}`,
                      'main'
                    )
                  }
                >
                  {`import { StepWizard } from '@cosmic-ui/ui';
import { Button } from '@cosmic-ui/ui';
import { User, Mail, Lock, Check } from 'lucide-react';
import { useState } from 'react';

export function MyStepWizard() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      id: 'personal',
      title: 'Informations personnelles',
      description: 'Renseignez vos informations de base',
      icon: <User className="w-4 h-4" />,
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nom</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
              placeholder="Votre nom"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Prénom</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
              placeholder="Votre prénom"
            />
          </div>
        </div>
      ),
    },
    {
      id: 'contact',
      title: 'Contact',
      description: 'Vos informations de contact',
      icon: <Mail className="w-4 h-4" />,
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
              placeholder="votre@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Téléphone</label>
            <input
              type="tel"
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
              placeholder="06 12 34 56 78"
            />
          </div>
        </div>
      ),
    },
    {
      id: 'security',
      title: 'Sécurité',
      description: 'Créez votre mot de passe',
      icon: <Lock className="w-4 h-4" />,
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Mot de passe</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
              placeholder="Mot de passe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Confirmer le mot de passe
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
              placeholder="Confirmer le mot de passe"
            />
          </div>
        </div>
      ),
    },
    {
      id: 'complete',
      title: 'Terminé',
      description: 'Votre compte a été créé',
      icon: <Check className="w-4 h-4" />,
      content: (
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-medium">Félicitations !</h3>
          <p className="text-gray-600 dark:text-gray-400-foreground">
            Votre compte a été créé avec succès.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div>
      <StepWizard
        steps={steps}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
        orientation="horizontal"
        variant="default"
        size="md"
        allowNavigation={true}
        showProgress={true}
      />
      <div className="flex justify-between mt-4">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
        >
          Précédent
        </Button>
        <Button
          onClick={() =>
            setCurrentStep(Math.min(steps.length - 1, currentStep + 1))
          }
          disabled={currentStep === steps.length - 1}
        >
          Suivant
        </Button>
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
          <div className="bg-cosmic-card border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <p className="text-gray-600 dark:text-gray-400-foreground mb-4">
              Le composant StepWizard est déjà inclus dans le package
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
              Utilisez le composant pour créer des assistants étape par étape.
            </p>
            <CodeBlock
              onCopy={() =>
                handleCopy(
                  `import { StepWizard } from '@cosmic-ui/ui';

const steps = [
  {
    id: 'step1',
    title: 'Étape 1',
    description: 'Description de l'étape',
    content: <div>Contenu de l'étape</div>,
  },
  // ...
];

<StepWizard
  steps={steps}
  currentStep={currentStep}
  onStepChange={setCurrentStep}
  orientation="horizontal"
  variant="default"
/>`,
                  'usage'
                )
              }
            >
              {`import { StepWizard } from '@cosmic-ui/ui';

const steps = [
  {
    id: 'step1',
    title: 'Étape 1',
    description: 'Description de l'étape',
    content: <div>Contenu de l'étape</div>,
  },
  // ...
];

<StepWizard
  steps={steps}
  currentStep={currentStep}
  onStepChange={setCurrentStep}
  orientation="horizontal"
  variant="default"
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
                <div className="p-4 w-full space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Variant dots</h3>
                    <StepWizard
                      steps={steps.slice(0, 3)}
                      currentStep={1}
                      onStepChange={() => {}}
                      orientation="horizontal"
                      variant="dots"
                      size="sm"
                      showProgress={false}
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Variant numbers
                    </h3>
                    <StepWizard
                      steps={steps.slice(0, 3)}
                      currentStep={1}
                      onStepChange={() => {}}
                      orientation="horizontal"
                      variant="numbers"
                      size="sm"
                      showProgress={false}
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full">
                  <CodeBlock
                    onCopy={() =>
                      handleCopy(
                        `// Variant dots
<StepWizard
  steps={steps}
  currentStep={currentStep}
  onStepChange={setCurrentStep}
  orientation="horizontal"
  variant="dots"
  size="sm"
  showProgress={false}
/>

// Variant numbers
<StepWizard
  steps={steps}
  currentStep={currentStep}
  onStepChange={setCurrentStep}
  orientation="horizontal"
  variant="numbers"
  size="sm"
  showProgress={false}
/>

// Orientation verticale
<StepWizard
  steps={steps}
  currentStep={currentStep}
  onStepChange={setCurrentStep}
  orientation="vertical"
  variant="default"
  size="md"
/>

// Variant icons
<StepWizard
  steps={steps}
  currentStep={currentStep}
  onStepChange={setCurrentStep}
  orientation="horizontal"
  variant="icons"
  size="lg"
/>`,
                        'variants'
                      )
                    }
                  >
                    {`// Variant dots
<StepWizard
  steps={steps}
  currentStep={currentStep}
  onStepChange={setCurrentStep}
  orientation="horizontal"
  variant="dots"
  size="sm"
  showProgress={false}
/>

// Variant numbers
<StepWizard
  steps={steps}
  currentStep={currentStep}
  onStepChange={setCurrentStep}
  orientation="horizontal"
  variant="numbers"
  size="sm"
  showProgress={false}
/>

// Orientation verticale
<StepWizard
  steps={steps}
  currentStep={currentStep}
  onStepChange={setCurrentStep}
  orientation="vertical"
  variant="default"
  size="md"
/>

// Variant icons
<StepWizard
  steps={steps}
  currentStep={currentStep}
  onStepChange={setCurrentStep}
  orientation="horizontal"
  variant="icons"
  size="lg"
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
