import type { Meta, StoryObj } from '@storybook/react';
import { StepWizard, StepWizardControls } from '../components/step-wizard';
import { useState } from 'react';
import { Input } from '../components/input';
import { Button } from '../components/button';

const meta: Meta<typeof StepWizard> = {
  title: 'Components/StepWizard',
  component: StepWizard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleSteps = [
  {
    id: 'personal-info',
    title: 'Informations personnelles',
    description: 'Vos coordonnées de base',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
    content: (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white mb-2">Nom complet</label>
          <Input placeholder="Jean Dupont" />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-2">Email</label>
          <Input type="email" placeholder="jean@exemple.com" />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-2">Téléphone</label>
          <Input placeholder="+33 1 23 45 67 89" />
        </div>
      </div>
    ),
  },
  {
    id: 'company-info',
    title: 'Informations entreprise',
    description: 'Détails de votre entreprise',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    ),
    content: (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white mb-2">Nom de l'entreprise</label>
          <Input placeholder="Mon Entreprise SARL" />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-2">SIRET</label>
          <Input placeholder="123 456 789 01234" />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-2">Secteur d'activité</label>
          <select className="w-full px-3 py-2 bg-cosmic-surface border border-cosmic-border rounded-md text-white">
            <option>Technologie</option>
            <option>Finance</option>
            <option>Santé</option>
            <option>Éducation</option>
            <option>Autre</option>
          </select>
        </div>
      </div>
    ),
  },
  {
    id: 'preferences',
    title: 'Préférences',
    description: 'Configurez vos préférences',
    optional: true,
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    content: (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white mb-2">Langue préférée</label>
          <select className="w-full px-3 py-2 bg-cosmic-surface border border-cosmic-border rounded-md text-white">
            <option>Français</option>
            <option>English</option>
            <option>Español</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-2">Fuseau horaire</label>
          <select className="w-full px-3 py-2 bg-cosmic-surface border border-cosmic-border rounded-md text-white">
            <option>Europe/Paris</option>
            <option>America/New_York</option>
            <option>Asia/Tokyo</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <input type="checkbox" className="rounded border-cosmic-border" />
          <label className="text-sm text-white/70">Recevoir des notifications par email</label>
        </div>
      </div>
    ),
  },
  {
    id: 'review',
    title: 'Vérification',
    description: 'Vérifiez vos informations',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    content: (
      <div className="space-y-4">
        <div className="bg-cosmic-surface/50 p-4 rounded-lg">
          <h4 className="font-medium text-white mb-2">Récapitulatif</h4>
          <div className="space-y-2 text-sm text-white/70">
            <p>
              <strong>Nom:</strong> Jean Dupont
            </p>
            <p>
              <strong>Email:</strong> jean@exemple.com
            </p>
            <p>
              <strong>Entreprise:</strong> Mon Entreprise SARL
            </p>
            <p>
              <strong>Langue:</strong> Français
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <input type="checkbox" className="rounded border-cosmic-border" />
          <label className="text-sm text-white/70">
            J'accepte les{' '}
            <a href="#" className="text-cosmic-primary hover:underline">
              conditions d'utilisation
            </a>
          </label>
        </div>
      </div>
    ),
  },
];

function StepWizardDemo() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < sampleSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    alert('Formulaire terminé !');
  };

  return (
    <div className="w-full max-w-4xl p-8">
      <StepWizard
        steps={sampleSteps}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
        orientation="horizontal"
        variant="default"
        showProgress={true}
        allowNavigation={true}
      />

      <StepWizardControls
        currentStep={currentStep}
        totalSteps={sampleSteps.length}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onFinish={handleFinish}
        canGoNext={true}
        canGoPrevious={currentStep > 0}
      />
    </div>
  );
}

export const Default: Story = {
  render: () => <StepWizardDemo />,
};

export const VerticalOrientation: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(0);

    return (
      <div className="w-full max-w-4xl p-8">
        <StepWizard
          steps={sampleSteps}
          currentStep={currentStep}
          onStepChange={setCurrentStep}
          orientation="vertical"
          variant="default"
          showProgress={false}
          allowNavigation={true}
        />
      </div>
    );
  },
};

export const Variants: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(0);

    return (
      <div className="p-8 space-y-8">
        {(['default', 'dots', 'numbers', 'icons'] as const).map((variant) => (
          <div key={variant}>
            <h3 className="text-lg font-semibold text-white mb-4 capitalize">{variant} Variant</h3>
            <div className="w-full max-w-2xl">
              <StepWizard
                steps={sampleSteps}
                currentStep={currentStep}
                onStepChange={setCurrentStep}
                orientation="horizontal"
                variant={variant}
                showProgress={true}
                allowNavigation={true}
              />
            </div>
          </div>
        ))}
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(0);

    return (
      <div className="p-8 space-y-8">
        {(['sm', 'md', 'lg'] as const).map((size) => (
          <div key={size}>
            <h3 className="text-lg font-semibold text-white mb-4 capitalize">{size} Size</h3>
            <div className="w-full max-w-2xl">
              <StepWizard
                steps={sampleSteps}
                currentStep={currentStep}
                onStepChange={setCurrentStep}
                orientation="horizontal"
                variant="default"
                size={size}
                showProgress={true}
                allowNavigation={true}
              />
            </div>
          </div>
        ))}
      </div>
    );
  },
};

export const WithoutNavigation: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(0);

    return (
      <div className="w-full max-w-4xl p-8">
        <StepWizard
          steps={sampleSteps}
          currentStep={currentStep}
          onStepChange={setCurrentStep}
          orientation="horizontal"
          variant="default"
          showProgress={true}
          allowNavigation={false}
        />

        <div className="flex justify-center mt-6">
          <Button onClick={() => setCurrentStep((currentStep + 1) % sampleSteps.length)}>
            Étape suivante
          </Button>
        </div>
      </div>
    );
  },
};
