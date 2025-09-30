import type { Meta, StoryObj } from '@storybook/react';
import { PricingTable, type PricingPlan } from '../components/pricing-table';

const plans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Pour débuter avec Cosmic UI',
    priceMonthly: 0,
    features: ['1 projet', 'Composants de base', 'Support communautaire'],
    cta: { label: 'Commencer', href: '#' },
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Pour les équipes',
    priceMonthly: 19,
    priceYearly: 190,
    popular: true,
    features: ['5 projets', 'Composants SaaS', 'Support prioritaire'],
    cta: { label: 'Choisir Pro', href: '#' },
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Personnalisation avancée',
    priceMonthly: 99,
    priceYearly: 990,
    features: ['Projets illimités', 'Thèmes custom', 'SLA dédié'],
    cta: { label: 'Contacter Sales', href: '#' },
  },
];

const meta: Meta<typeof PricingTable> = {
  title: 'SaaS/PricingTable',
  component: PricingTable,
  args: { plans, billingPeriod: 'monthly' },
  tags: ['autodocs'],
};
export default meta;

export const Monthly: StoryObj<typeof PricingTable> = {};
export const Yearly: StoryObj<typeof PricingTable> = {
  args: { billingPeriod: 'yearly' },
};

