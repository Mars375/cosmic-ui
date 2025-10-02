'use client';

import * as React from 'react';
import { useState } from 'react';
import { CodeBlock } from '../../../components/code-block';
import { PricingTable, Button } from 'cosmic-ui-mars';
import { Check, Star, Zap } from 'lucide-react';

export default function PricingTablePage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

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
      popular: false,
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'Idéal pour les équipes en croissance',
      priceMonthly: 29,
      priceYearly: 290,
      currency: '€',
      features: [
        'Projets illimités',
        '100GB de stockage',
        'Support prioritaire',
        'API avancée',
        'Analytics avancées',
        'Intégrations tierces',
        'Collaboration équipe',
      ],
      cta: {
        label: 'Choisir Pro',
        onClick: () => console.log('Pro plan selected'),
      },
      popular: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Pour les grandes organisations',
      priceMonthly: 99,
      priceYearly: 990,
      currency: '€',
      features: [
        'Tout du plan Pro',
        'Stockage illimité',
        'Support dédié 24/7',
        'API entreprise',
        'Analytics personnalisées',
        'SSO et sécurité avancée',
        'Gestion des utilisateurs',
        'SLA garanti',
      ],
      cta: {
        label: 'Contacter',
        onClick: () => console.log('Enterprise plan selected'),
      },
      popular: false,
    },
  ];

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Star className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">PricingTable</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Table de tarification pour présenter vos plans et offres de manière claire et attractive.
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
                <div className="flex justify-center mb-6">
                  <div className="bg-muted rounded-lg p-1 flex">
                    <button
                      onClick={() => setBillingPeriod('monthly')}
                      className={`export default function App\docs\components\pricingTable\page.tsxExample() {
  px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        billingPeriod === 'monthly'
                          ? 'bg-background text-foreground shadow-sm'
                          : 'text-muted-foreground hover:text-foreground'
                      }
}`}
                    >
                      Mensuel
                    </button>
                    <button
                      onClick={() => setBillingPeriod('yearly')}
                      className={`export default function App\docs\components\pricingTable\page.tsxExample() {
  px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        billingPeriod === 'yearly'
                          ? 'bg-background text-foreground shadow-sm'
                          : 'text-muted-foreground hover:text-foreground'
                      }
}`}
                    >
                      Annuel
                    </button>
                  </div>
                </div>
                <PricingTable
                  plans={samplePlans}
                  billingPeriod={billingPeriod}
                  onPlanSelect={(planId) => console.log('Plan selected:', planId)}
                />
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4 text-foreground">Code</h3>
            <CodeBlock language="typescript" filePath="components/PricingTableExample.tsx" showPackageManager={false}>
{`import { PricingTable } from 'cosmic-ui-mars';
import { useState } from 'react';

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
    ],
    cta: {
      label: 'Commencer',
      onClick: () => console.log('Starter selected'),
    },
  },
  // ... autres plans
];

const [billingPeriod, setBillingPeriod] = useState('monthly');

<PricingTable
  plans={plans}
  billingPeriod={billingPeriod}
  onPlanSelect={(planId) => console.log('Plan:', planId)}
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
              <h3 className="text-lg font-medium text-foreground">Table avec plan populaire</h3>
              <p className="text-muted-foreground">Table avec mise en évidence du plan recommandé.</p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <PricingTable
                  plans={samplePlans}
                  billingPeriod={billingPeriod}
                  onPlanSelect={(planId) => console.log('Plan selected:', planId)}
                  showPopularBadge
                />
              </div>
            </div>
            <div>
              <CodeBlock language="typescript" filePath="components/PopularPricingTable.tsx" showPackageManager={false}>
{`export default function App\docs\components\pricingTable\page.tsxExample() {
  return <PricingTable
  plans={plans}
  billingPeriod={billingPeriod}
  onPlanSelect={handlePlanSelect}
  showPopularBadge
/>;
}`}
              </CodeBlock>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Table compacte</h3>
              <p className="text-muted-foreground">Version compacte pour espaces restreints.</p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <PricingTable
                  plans={samplePlans.slice(0, 2)}
                  billingPeriod={billingPeriod}
                  onPlanSelect={(planId) => console.log('Plan selected:', planId)}
                  variant="compact"
                />
              </div>
            </div>
            <div>
              <CodeBlock language="typescript" filePath="components/CompactPricingTable.tsx" showPackageManager={false}>
{`export default function App\docs\components\pricingTable\page.tsxExample() {
  return <PricingTable
  plans={plans}
  billingPeriod={billingPeriod}
  onPlanSelect={handlePlanSelect}
  variant="compact"
/>;
}`}
              </CodeBlock>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Table avec remise annuelle</h3>
              <p className="text-muted-foreground">Affichage de la remise pour la facturation annuelle.</p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <PricingTable
                  plans={samplePlans}
                  billingPeriod={billingPeriod}
                  onPlanSelect={(planId) => console.log('Plan selected:', planId)}
                  showYearlyDiscount
                  yearlyDiscountText="Économisez 20%"
                />
              </div>
            </div>
            <div>
              <CodeBlock language="typescript" filePath="components/DiscountPricingTable.tsx" showPackageManager={false}>
{`export default function App\docs\components\pricingTable\page.tsxExample() {
  return <PricingTable
  plans={plans}
  billingPeriod={billingPeriod}
  onPlanSelect={handlePlanSelect}
  showYearlyDiscount
  yearlyDiscountText="Économisez 20%"
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
                <td className="border border-border px-4 py-3 font-mono text-sm">plans</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Plan[]</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">[]</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Liste des plans tarifaires</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">billingPeriod</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">'monthly' | 'yearly'</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">'monthly'</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Période de facturation</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">onPlanSelect</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">(planId: string) => void</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">-</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Callback de sélection de plan</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">showPopularBadge</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">boolean</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">false</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Afficher le badge populaire</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">variant</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">'default' | 'compact'</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">'default'</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Variante d'affichage</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">showYearlyDiscount</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">boolean</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">false</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Afficher la remise annuelle</td>
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
          <li>• Mettez en évidence le <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">plan recommandé</code></li>
          <li>• Utilisez des <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">descriptions claires</code> pour chaque plan</li>
          <li>• Proposez des <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">remises annuelles</code> attractives</li>
          <li>• Limitez le nombre de <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">fonctionnalités</code> affichées</li>
          <li>• Respectez les <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">guidelines d'accessibilité</code></li>
        </ul>
      </div>
    </div>
  );
}