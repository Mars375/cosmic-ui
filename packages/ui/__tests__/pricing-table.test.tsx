import React from 'react';
import { render, screen } from '@testing-library/react';
import { PricingTable, type PricingPlan } from '../src/components/pricing-table';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

const plans: PricingPlan[] = [
  { id: 'starter', name: 'Starter', priceMonthly: 0, features: ['A'], cta: { label: 'Go' } },
  {
    id: 'pro',
    name: 'Pro',
    priceMonthly: 10,
    priceYearly: 100,
    features: ['B'],
    cta: { label: 'Buy' },
  },
];

test('renders pricing plans and prices', () => {
  render(<PricingTable plans={plans} billingPeriod="monthly" />);
  expect(screen.getByText(/starter/i)).toBeInTheDocument();
  expect(screen.getByText(/pro/i)).toBeInTheDocument();
  expect(screen.getAllByText('$').length).toBeGreaterThan(0);
});

test('is accessible', async () => {
  const { container } = render(<PricingTable plans={plans} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
