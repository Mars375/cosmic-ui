'use client';

import * as React from 'react';
import { useState } from 'react';
import { CodeBlock } from '../../../components/code-block';
import { StepWizard } from 'cosmic-ui-mars';
import { CheckCircle } from 'lucide-react';

export default function StepWizardPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const steps = [
    {
      id: 'personal',
      title: 'Informations personnelles',
      description: 'Saisissez vos informations de base',
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nom complet</label>
            <input className="w-full p-2 border rounded-md" placeholder="John Doe" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input className="w-full p-2 border rounded-md" placeholder="john@example.com" />
          </div>
        </div>
      ),
    },
    {
      id: 'preferences',
      title: 'Préférences',
      description: 'Configurez vos préférences',
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Thème</label>
            <select className="w-full p-2 border rounded-md">
              <option>Clair</option>
              <option>Sombre</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Langue</label>
            <select className="w-full p-2 border rounded-md">
              <option>Français</option>
              <option>English</option>
            </select>
          </div>
        </div>
      ),
    },
    {
      id: 'confirmation',
      title: 'Confirmation',
      description: 'Vérifiez vos informations',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-muted/30 rounded-lg">
            <h4 className="font-medium mb-2">Récapitulatif</h4>
            <p className="text-sm text-muted-foreground">
              Vos informations ont été saisies avec succès.
            </p>
          </div>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCompletedSteps([...completedSteps, currentStep]);
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <CheckCircle className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">StepWizard</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Assistant étape par étape pour guider les utilisateurs à travers des processus complexes.
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
                <StepWizard
                  steps={steps}
                  currentStep={currentStep}
                completedSteps={completedSteps}
                onNext={handleNext}
                onPrevious={handlePrevious}
                onStepClick={setCurrentStep}
            />
          </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4 text-foreground">Code</h3>
            <CodeBlock language="typescript" filePath="components/StepWizardExample.tsx" showPackageManager={false}>
                  {`import { StepWizard } from 'cosmic-ui-mars';
import { useState } from 'react';

  const steps = [
    {
      id: 'personal',
      title: 'Informations personnelles',
    description: 'Saisissez vos informations de base',
    content: <PersonalInfoForm />,
  },
  {
    id: 'preferences',
    title: 'Préférences',
    description: 'Configurez vos préférences',
    content: <PreferencesForm />,
  },
  {
    id: 'confirmation',
    title: 'Confirmation',
    description: 'Vérifiez vos informations',
    content: <ConfirmationStep />,
  },
];

const [currentStep, setCurrentStep] = useState(0);
const [completedSteps, setCompletedSteps] = useState([]);

<StepWizard
  steps={steps}
  currentStep={currentStep}
  completedSteps={completedSteps}
  onNext={handleNext}
  onPrevious={handlePrevious}
  onStepClick={setCurrentStep}
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
              <h3 className="text-lg font-medium text-foreground">Wizard linéaire</h3>
              <p className="text-muted-foreground">Wizard avec navigation séquentielle obligatoire.</p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                    <StepWizard
                  steps={steps}
                  currentStep={currentStep}
                  completedSteps={completedSteps}
                  onNext={handleNext}
                  onPrevious={handlePrevious}
                  linear
                    />
                  </div>
                </div>
            <div>
              <CodeBlock language="typescript" filePath="components/LinearStepWizard.tsx" showPackageManager={false}>
{`export default function App\docs\components\stepWizard\page.tsxExample() {
  return <StepWizard
  steps={steps}
  currentStep={currentStep}
  completedSteps={completedSteps}
  onNext={handleNext}
  onPrevious={handlePrevious}
  linear
/>;
}`}
              </CodeBlock>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Wizard avec validation</h3>
              <p className="text-muted-foreground">Wizard avec validation des étapes.</p>
              <div className="p-6 bg-muted/30 rounded-lg border">
<StepWizard
  steps={steps}
  currentStep={currentStep}
                  completedSteps={completedSteps}
                  onNext={handleNext}
                  onPrevious={handlePrevious}
                  onValidate={(stepId) => {
                    // Logique de validation
                    return Promise.resolve(true);
                  }}
                  showValidation
                />
              </div>
            </div>
            <div>
              <CodeBlock language="typescript" filePath="components/ValidatedStepWizard.tsx" showPackageManager={false}>
{`export default function App\docs\components\stepWizard\page.tsxExample() {
  <StepWizard
  steps={steps}
  currentStep={currentStep}
  completedSteps={completedSteps}
  onNext={handleNext}
  onPrevious={handlePrevious}
  onValidate={(stepId) => {
    // Logique de validation
    return Promise.resolve(true);
  }}
  showValidation
/>
}`}
              </CodeBlock>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Wizard compact</h3>
              <p className="text-muted-foreground">Version compacte pour espaces restreints.</p>
              <div className="p-6 bg-muted/30 rounded-lg border">
<StepWizard
  steps={steps}
  currentStep={currentStep}
                  completedSteps={completedSteps}
                  onNext={handleNext}
                  onPrevious={handlePrevious}
                  variant="compact"
                />
              </div>
            </div>
            <div>
              <CodeBlock language="typescript" filePath="components/CompactStepWizard.tsx" showPackageManager={false}>
{`export default function App\docs\components\stepWizard\page.tsxExample() {
  return <StepWizard
  steps={steps}
  currentStep={currentStep}
  completedSteps={completedSteps}
  onNext={handleNext}
  onPrevious={handlePrevious}
  variant="compact"
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
                <td className="border border-border px-4 py-3 font-mono text-sm">steps</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Step[]</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">[]</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Liste des étapes</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">currentStep</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">number</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">0</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Étape actuelle</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">completedSteps</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">number[]</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">[]</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Étapes terminées</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">onNext</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">() => void</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">-</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Callback suivant</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">onPrevious</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">() => void</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">-</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Callback précédent</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">onStepClick</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">(step: number) => void</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">-</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Callback clic étape</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">linear</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">boolean</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">false</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Navigation séquentielle</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">showValidation</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">boolean</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">false</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Afficher la validation</td>
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
          <li>• Limitez le nombre d'<code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">étapes</code> (max 5-7)</li>
          <li>• Utilisez des <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">titres clairs</code> pour chaque étape</li>
          <li>• Implémentez la <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">validation</code> des données</li>
          <li>• Permettez la <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">navigation libre</code> si approprié</li>
          <li>• Respectez les <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">guidelines d'accessibilité</code></li>
        </ul>
      </div>
    </div>
  );
}