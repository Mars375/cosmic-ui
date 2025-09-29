import * as React from 'react';
import { Button } from './button';
import { twMerge } from 'tailwind-merge';

export type PricingPlan = {
  id: string;
  name: string;
  description?: string;
  priceMonthly?: number;
  priceYearly?: number;
  priceSuffix?: string;
  currency?: string; // e.g. "$"
  features: string[];
  popular?: boolean;
  badge?: string;
  cta: { label: string; href?: string; onClick?: () => void; disabled?: boolean };
};

export interface PricingTableProps extends React.HTMLAttributes<HTMLDivElement> {
  plans: PricingPlan[];
  billingPeriod?: 'monthly' | 'yearly';
  className?: string;
}

export const PricingTable = React.forwardRef<HTMLDivElement, PricingTableProps>(
  ({ className, plans, billingPeriod = 'monthly', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={twMerge('grid gap-6 sm:grid-cols-2 lg:grid-cols-3', className)}
        {...props}
      >
        {plans.map((plan) => {
          const amount = billingPeriod === 'monthly' ? plan.priceMonthly : plan.priceYearly;
          const currency = plan.currency ?? '$';
          const suffix = plan.priceSuffix ?? (billingPeriod === 'monthly' ? '/mo' : '/yr');
          const headingId = `${plan.id}-title`;
          const priceId = `${plan.id}-price`;

          const CardComp: React.ElementType = 'article';

          return (
            <CardComp
              key={plan.id}
              aria-labelledby={headingId}
              className={twMerge(
                'relative rounded-lg border border-cosmic-border bg-cosmic-surface p-6 text-white',
                plan.popular ? 'ring-2 ring-cosmic-primary' : '',
              )}
            >
              {plan.badge || plan.popular ? (
                <div className="absolute -top-3 right-3">
                  <span className="rounded-full bg-cosmic-primary px-3 py-1 text-xs font-medium text-cosmic-primaryForeground">
                    {plan.badge ?? 'Popular'}
                  </span>
                </div>
              ) : null}

              <h3 id={headingId} className="text-lg font-semibold">
                {plan.name}
              </h3>
              {plan.description ? (
                <p className="mt-1 text-sm text-cosmic-muted">{plan.description}</p>
              ) : null}

              {amount != null ? (
                <div className="mt-4 flex items-end gap-1" aria-labelledby={priceId}>
                  <span aria-hidden className="text-base text-white/80">
                    {currency}
                  </span>
                  <span id={priceId} className="text-3xl font-bold tracking-tight">
                    {amount}
                  </span>
                  <span className="text-sm text-white/70">{suffix}</span>
                </div>
              ) : null}

              <ul className="mt-4 space-y-2" aria-label={`Features for ${plan.name}`}>
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-white/90">
                    <span aria-hidden>✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                {plan.cta.href ? (
                  <a
                    href={plan.cta.href}
                    aria-label={`${plan.cta.label} - ${plan.name}`}
                    className={twMerge(
                      'inline-flex w-full items-center justify-center rounded-lg border border-cosmic-border bg-white/[0.04] px-4 py-2 text-sm font-medium hover:bg-white/[0.08] focus-visible:ring-2 focus-visible:ring-cosmic-primary',
                      plan.cta.disabled ? 'pointer-events-none opacity-50' : '',
                    )}
                  >
                    {plan.cta.label}
                  </a>
                ) : (
                  <Button
                    variant="subtle"
                    fullWidth
                    disabled={plan.cta.disabled}
                    aria-label={`${plan.cta.label} - ${plan.name}`}
                    onClick={plan.cta.onClick}
                  >
                    {plan.cta.label}
                  </Button>
                )}
              </div>
            </CardComp>
          );
        })}
      </div>
    );
  },
);
PricingTable.displayName = 'PricingTable';
