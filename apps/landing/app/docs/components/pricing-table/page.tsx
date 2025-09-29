'use client';

import { useState } from 'react';
import { PricingTable } from '@cosmic-ui/ui';
import { Button } from '@cosmic-ui/ui';
import { Check, Star, Zap } from 'lucide-react';

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

export default function PricingTablePage() {
  const [showCode, setShowCode] = useState(false);
  const [showCodeVariants, setShowCodeVariants] = useState(false);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStates(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCopiedStates(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

  const samplePlans = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Parfait pour les projets personnels',
      priceMonthly: 9,
      priceYearly: 90,
      currency: '€',
      features: [
        'Jusqu\'à 5 projets',
        '10GB de stockage',
        'Support par email',
        'API de base',
        'Analytics de base',
      ],
      cta: {
        label: 'Commencer',
        onClick: () => console.log('Starter plan selected'),
      },
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Idéal pour les équipes en croissance',
      priceMonthly: 29,
      priceYearly: 290,
      currency: '€',
      features: [
        'Jusqu\'à 25 projets',
        '100GB de stockage',
        'Support prioritaire',
        'API avancée',
        'Analytics avancées',
        'Intégrations tierces',
        'Collaboration en équipe',
      ],
      popular: true,
      badge: 'Populaire',
      cta: {
        label: 'Essayer gratuitement',
        onClick: () => console.log('Professional plan selected'),
      },
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Pour les grandes organisations',
      priceMonthly: 99,
      priceYearly: 990,
      currency: '€',
      features: [
        'Projets illimités',
        'Stockage illimité',
        'Support 24/7',
        'API complète',
        'Analytics personnalisées',
        'Intégrations personnalisées',
        'Gestion des utilisateurs',
        'Sécurité avancée',
        'SLA garanti',
      ],
      cta: {
        label: 'Nous contacter',
        onClick: () => console.log('Enterprise plan selected'),
      },
    },
  ];

  const simplePlans = [
    {
      id: 'basic',
      name: 'Basique',
      priceMonthly: 5,
      currency: '€',
      features: ['Fonctionnalités de base', 'Support email'],
      cta: { label: 'Choisir', onClick: () => {} },
    },
    {
      id: 'premium',
      name: 'Premium',
      priceMonthly: 15,
      currency: '€',
      features: ['Toutes les fonctionnalités', 'Support prioritaire'],
      cta: { label: 'Choisir', onClick: () => {} },
    },
  ];

  const complexPlans = [
    {
      id: 'free',
      name: 'Gratuit',
      description: 'Pour commencer',
      priceMonthly: 0,
      currency: '€',
      features: [
        '1 projet',
        '1GB de stockage',
        'Support communautaire',
      ],
      cta: {
        label: 'Commencer gratuitement',
        onClick: () => console.log('Free plan selected'),
      },
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'Pour les professionnels',
      priceMonthly: 19,
      priceYearly: 190,
      currency: '€',
      features: [
        '10 projets',
        '50GB de stockage',
        'Support par email',
        'API complète',
        'Analytics',
        'Intégrations',
      ],
      popular: true,
      cta: {
        label: 'Essayer Pro',
        onClick: () => console.log('Pro plan selected'),
      },
    },
    {
      id: 'business',
      name: 'Business',
      description: 'Pour les entreprises',
      priceMonthly: 49,
      priceYearly: 490,
      currency: '€',
      features: [
        'Projets illimités',
        '200GB de stockage',
        'Support prioritaire',
        'API avancée',
        'Analytics avancées',
        'Intégrations personnalisées',
        'Gestion d\'équipe',
      ],
      cta: {
        label: 'Contacter les ventes',
        onClick: () => console.log('Business plan selected'),
      },
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
          <h1 className="text-4xl font-bold">PricingTable</h1>
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
          Un composant de tableau de prix avec plans, fonctionnalités et
          périodes de facturation.
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
                <div className="mb-4">
                  <div className="flex items-center justify-center gap-2">
                    <span className={`text-sm ${billingPeriod === 'monthly' ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400-foreground'}`}>
                      Mensuel
                    </span>
                    <button
                      onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
                      className="relative inline-flex h-6 w-11 items-center rounded-full bg-cosmic-border transition-colors focus:outline-none focus:ring-2 focus:ring-cosmic-primary focus:ring-offset-2"
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          billingPeriod === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                    <span className={`text-sm ${billingPeriod === 'yearly' ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400-foreground'}`}>
                      Annuel
                    </span>
                  </div>
                </div>
                <PricingTable
                  plans={samplePlans}
                  billingPeriod={billingPeriod}
                  className="grid-cols-1"
                />
              </div>
            ) : (
              <div className="w-full">
                <CodeBlock
                  onCopy={() =>
                    handleCopy(
                      `import { PricingTable } from '@cosmic-ui/ui';
import { useState } from 'react';

export function MyPricingTable() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Parfait pour les projets personnels',
      priceMonthly: 9,
      priceYearly: 90,
      currency: '€',
      features: [
        'Jusqu\\'à 5 projets',
        '10GB de stockage',
        'Support par email',
        'API de base',
        'Analytics de base',
      ],
      cta: {
        label: 'Commencer',
        onClick: () => console.log('Starter plan selected'),
      },
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Idéal pour les équipes en croissance',
      priceMonthly: 29,
      priceYearly: 290,
      currency: '€',
      features: [
        'Jusqu\\'à 25 projets',
        '100GB de stockage',
        'Support prioritaire',
        'API avancée',
        'Analytics avancées',
        'Intégrations tierces',
        'Collaboration en équipe',
      ],
      popular: true,
      badge: 'Populaire',
      cta: {
        label: 'Essayer gratuitement',
        onClick: () => console.log('Professional plan selected'),
      },
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Pour les grandes organisations',
      priceMonthly: 99,
      priceYearly: 990,
      currency: '€',
      features: [
        'Projets illimités',
        'Stockage illimité',
        'Support 24/7',
        'API complète',
        'Analytics personnalisées',
        'Intégrations personnalisées',
        'Gestion des utilisateurs',
        'Sécurité avancée',
        'SLA garanti',
      ],
      cta: {
        label: 'Nous contacter',
        onClick: () => console.log('Enterprise plan selected'),
      },
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-center gap-2 mb-4">
        <span className={\`text-sm \${billingPeriod === 'monthly' ? 'text-foreground' : 'text-muted-foreground'}\`}>
          Mensuel
        </span>
        <button
          onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
          className="relative inline-flex h-6 w-11 items-center rounded-full bg-border transition-colors"
        >
          <span
            className={\`inline-block h-4 w-4 transform rounded-full bg-white transition-transform \${
              billingPeriod === 'yearly' ? 'translate-x-6' : 'translate-x-1'
            }\`}
          />
        </button>
        <span className={\`text-sm \${billingPeriod === 'yearly' ? 'text-foreground' : 'text-muted-foreground'}\`}>
          Annuel
        </span>
      </div>
      <PricingTable
        plans={plans}
        billingPeriod={billingPeriod}
        className="grid-cols-1"
      />
    </div>
  );
}`,
                      'main'
                    )
                  }
                >
                  {`import { PricingTable } from '@cosmic-ui/ui';
import { useState } from 'react';

export function MyPricingTable() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Parfait pour les projets personnels',
      priceMonthly: 9,
      priceYearly: 90,
      currency: '€',
      features: [
        'Jusqu\\'à 5 projets',
        '10GB de stockage',
        'Support par email',
        'API de base',
        'Analytics de base',
      ],
      cta: {
        label: 'Commencer',
        onClick: () => console.log('Starter plan selected'),
      },
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Idéal pour les équipes en croissance',
      priceMonthly: 29,
      priceYearly: 290,
      currency: '€',
      features: [
        'Jusqu\\'à 25 projets',
        '100GB de stockage',
        'Support prioritaire',
        'API avancée',
        'Analytics avancées',
        'Intégrations tierces',
        'Collaboration en équipe',
      ],
      popular: true,
      badge: 'Populaire',
      cta: {
        label: 'Essayer gratuitement',
        onClick: () => console.log('Professional plan selected'),
      },
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Pour les grandes organisations',
      priceMonthly: 99,
      priceYearly: 990,
      currency: '€',
      features: [
        'Projets illimités',
        'Stockage illimité',
        'Support 24/7',
        'API complète',
        'Analytics personnalisées',
        'Intégrations personnalisées',
        'Gestion des utilisateurs',
        'Sécurité avancée',
        'SLA garanti',
      ],
      cta: {
        label: 'Nous contacter',
        onClick: () => console.log('Enterprise plan selected'),
      },
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-center gap-2 mb-4">
        <span className={\`text-sm \${billingPeriod === 'monthly' ? 'text-foreground' : 'text-muted-foreground'}\`}>
          Mensuel
        </span>
        <button
          onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
          className="relative inline-flex h-6 w-11 items-center rounded-full bg-border transition-colors"
        >
          <span
            className={\`inline-block h-4 w-4 transform rounded-full bg-white transition-transform \${
              billingPeriod === 'yearly' ? 'translate-x-6' : 'translate-x-1'
            }\`}
          />
        </button>
        <span className={\`text-sm \${billingPeriod === 'yearly' ? 'text-foreground' : 'text-muted-foreground'}\`}>
          Annuel
        </span>
      </div>
      <PricingTable
        plans={plans}
        billingPeriod={billingPeriod}
        className="grid-cols-1"
      />
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
              Le composant PricingTable est déjà inclus dans le package
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
              Utilisez le composant pour créer un tableau de prix.
            </p>
            <CodeBlock
              onCopy={() =>
                handleCopy(
                  `import { PricingTable } from '@cosmic-ui/ui';

const plans = [
  {
    id: 'basic',
    name: 'Basique',
    priceMonthly: 9,
    currency: '€',
    features: ['Fonctionnalités de base', 'Support email'],
    cta: { label: 'Choisir', onClick: () => {} },
  },
  {
    id: 'pro',
    name: 'Pro',
    priceMonthly: 29,
    currency: '€',
    features: ['Toutes les fonctionnalités', 'Support prioritaire'],
    popular: true,
    cta: { label: 'Choisir', onClick: () => {} },
  },
];

<PricingTable
  plans={plans}
  billingPeriod="monthly"
/>`,
                  'usage'
                )
              }
            >
              {`import { PricingTable } from '@cosmic-ui/ui';

const plans = [
  {
    id: 'basic',
    name: 'Basique',
    priceMonthly: 9,
    currency: '€',
    features: ['Fonctionnalités de base', 'Support email'],
    cta: { label: 'Choisir', onClick: () => {} },
  },
  {
    id: 'pro',
    name: 'Pro',
    priceMonthly: 29,
    currency: '€',
    features: ['Toutes les fonctionnalités', 'Support prioritaire'],
    popular: true,
    cta: { label: 'Choisir', onClick: () => {} },
  },
];

<PricingTable
  plans={plans}
  billingPeriod="monthly"
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
                    <h3 className="text-sm font-medium mb-2">
                      Plans simples
                    </h3>
                    <PricingTable
                      plans={simplePlans}
                      billingPeriod="monthly"
                      className="grid-cols-2"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Plans avec badge
                    </h3>
                    <PricingTable
                      plans={complexPlans}
                      billingPeriod="monthly"
                      className="grid-cols-3"
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full">
                  <CodeBlock
                    onCopy={() =>
                      handleCopy(
                        `// Plans simples
<PricingTable
  plans={[
    {
      id: 'basic',
      name: 'Basique',
      priceMonthly: 5,
      currency: '€',
      features: ['Fonctionnalités de base', 'Support email'],
      cta: { label: 'Choisir', onClick: () => {} },
    },
    {
      id: 'premium',
      name: 'Premium',
      priceMonthly: 15,
      currency: '€',
      features: ['Toutes les fonctionnalités', 'Support prioritaire'],
      cta: { label: 'Choisir', onClick: () => {} },
    },
  ]}
  billingPeriod="monthly"
  className="grid-cols-2"
/>

// Plans avec badge populaire
<PricingTable
  plans={[
    {
      id: 'free',
      name: 'Gratuit',
      priceMonthly: 0,
      currency: '€',
      features: ['1 projet', '1GB de stockage'],
      cta: { label: 'Commencer', onClick: () => {} },
    },
    {
      id: 'pro',
      name: 'Pro',
      priceMonthly: 19,
      currency: '€',
      features: ['10 projets', '50GB de stockage', 'Support'],
      popular: true,
      badge: 'Populaire',
      cta: { label: 'Essayer', onClick: () => {} },
    },
  ]}
  billingPeriod="monthly"
/>

// Facturation annuelle
<PricingTable
  plans={plans}
  billingPeriod="yearly"
/>

// Grille personnalisée
<PricingTable
  plans={plans}
  billingPeriod="monthly"
  className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
/>`,
                        'variants'
                      )
                    }
                  >
                    {`// Plans simples
<PricingTable
  plans={[
    {
      id: 'basic',
      name: 'Basique',
      priceMonthly: 5,
      currency: '€',
      features: ['Fonctionnalités de base', 'Support email'],
      cta: { label: 'Choisir', onClick: () => {} },
    },
    {
      id: 'premium',
      name: 'Premium',
      priceMonthly: 15,
      currency: '€',
      features: ['Toutes les fonctionnalités', 'Support prioritaire'],
      cta: { label: 'Choisir', onClick: () => {} },
    },
  ]}
  billingPeriod="monthly"
  className="grid-cols-2"
/>

// Plans avec badge populaire
<PricingTable
  plans={[
    {
      id: 'free',
      name: 'Gratuit',
      priceMonthly: 0,
      currency: '€',
      features: ['1 projet', '1GB de stockage'],
      cta: { label: 'Commencer', onClick: () => {} },
    },
    {
      id: 'pro',
      name: 'Pro',
      priceMonthly: 19,
      currency: '€',
      features: ['10 projets', '50GB de stockage', 'Support'],
      popular: true,
      badge: 'Populaire',
      cta: { label: 'Essayer', onClick: () => {} },
    },
  ]}
  billingPeriod="monthly"
/>

// Facturation annuelle
<PricingTable
  plans={plans}
  billingPeriod="yearly"
/>

// Grille personnalisée
<PricingTable
  plans={plans}
  billingPeriod="monthly"
  className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
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
