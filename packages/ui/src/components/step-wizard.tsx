'use client';

import * as React from 'react';
import { twMerge } from 'tailwind-merge';

export interface Step {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
  optional?: boolean;
  disabled?: boolean;
}

export interface StepWizardProps {
  steps: Step[];
  currentStep: number;
  onStepChange: (step: number) => void;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'dots' | 'numbers' | 'icons';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  allowNavigation?: boolean;
  showProgress?: boolean;
}

export function StepWizard({
  steps,
  currentStep,
  onStepChange,
  orientation = 'horizontal',
  variant = 'default',
  size = 'md',
  className,
  allowNavigation = true,
  showProgress = true,
}: StepWizardProps) {
  const progress = ((currentStep + 1) / steps.length) * 100;

  const getStepStatus = (stepIndex: number) => {
    if (stepIndex < currentStep) return 'completed';
    if (stepIndex === currentStep) return 'current';
    return 'upcoming';
  };

  const renderStepIndicator = (
    step: Step,
    stepIndex: number,
    status: 'completed' | 'current' | 'upcoming',
  ) => {
    const isClickable =
      allowNavigation && !step.disabled && (status === 'completed' || status === 'current');

    const baseClasses = twMerge('flex items-center justify-center rounded-full transition-colors', {
      // Size variants
      'w-6 h-6 text-xs': size === 'sm',
      'w-8 h-8 text-sm': size === 'md',
      'w-10 h-10 text-base': size === 'lg',

      // Status variants
      'bg-cosmic-primary text-white': status === 'completed',
      'bg-cosmic-primary text-white ring-2 ring-cosmic-primary ring-offset-2 ring-offset-cosmic-background':
        status === 'current',
      'bg-cosmic-border text-white/50': status === 'upcoming',

      // Interactive
      'cursor-pointer hover:bg-cosmic-primary/80': isClickable,
      'cursor-not-allowed opacity-50': step.disabled,
    });

    const content = (() => {
      switch (variant) {
        case 'dots':
          return <div className="w-2 h-2 rounded-full bg-current" />;
        case 'numbers':
          return stepIndex + 1;
        case 'icons':
          return step.icon || stepIndex + 1;
        default:
          return status === 'completed' ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            stepIndex + 1
          );
      }
    })();

    return (
      <div className={baseClasses} onClick={() => isClickable && onStepChange(stepIndex)}>
        {content}
      </div>
    );
  };

  const renderStepContent = (step: Step, stepIndex: number) => {
    if (stepIndex !== currentStep) return null;

    return (
      <div className="mt-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-white">{step.title}</h3>
          {step.description && <p className="text-white/70 mt-1">{step.description}</p>}
        </div>
        <div>{step.content}</div>
      </div>
    );
  };

  if (orientation === 'vertical') {
    return (
      <div className={twMerge('flex', className)}>
        {/* Steps */}
        <div className="flex-shrink-0">
          <nav className="space-y-4">
            {steps.map((step, stepIndex) => {
              const status = getStepStatus(stepIndex);
              const isClickable =
                allowNavigation &&
                !step.disabled &&
                (status === 'completed' || status === 'current');

              return (
                <div
                  key={step.id}
                  className={twMerge('flex items-start space-x-3', isClickable && 'cursor-pointer')}
                  onClick={() => isClickable && onStepChange(stepIndex)}
                >
                  {/* Connector line */}
                  {stepIndex < steps.length - 1 && (
                    <div className="absolute left-4 top-8 w-px h-8 bg-cosmic-border" />
                  )}

                  {/* Step indicator */}
                  <div className="relative z-10">
                    {renderStepIndicator(step, stepIndex, status)}
                  </div>

                  {/* Step content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h4
                        className={twMerge(
                          'text-sm font-medium',
                          status === 'current' ? 'text-white' : 'text-white/70',
                        )}
                      >
                        {step.title}
                      </h4>
                      {step.optional && <span className="text-xs text-white/50">(optionnel)</span>}
                    </div>
                    {step.description && (
                      <p className="text-xs text-white/60 mt-1">{step.description}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 ml-8">{renderStepContent(steps[currentStep], currentStep)}</div>
      </div>
    );
  }

  return (
    <div className={twMerge('w-full', className)}>
      {/* Progress bar */}
      {showProgress && (
        <div className="mb-8">
          <div className="flex justify-between text-sm text-white/70 mb-2">
            <span>
              Étape {currentStep + 1} sur {steps.length}
            </span>
            <span>{Math.round(progress)}% terminé</span>
          </div>
          <div className="w-full bg-cosmic-border rounded-full h-2">
            <div
              className="bg-cosmic-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Steps */}
      <nav className="flex items-center justify-between">
        {steps.map((step, stepIndex) => {
          const status = getStepStatus(stepIndex);
          const isLast = stepIndex === steps.length - 1;

          return (
            <div key={step.id} className="flex items-center">
              {/* Step */}
              <div className="flex flex-col items-center">
                {renderStepIndicator(step, stepIndex, status)}
                <div className="mt-2 text-center">
                  <div
                    className={twMerge(
                      'text-xs font-medium',
                      status === 'current' ? 'text-white' : 'text-white/70',
                    )}
                  >
                    {step.title}
                  </div>
                  {step.description && (
                    <div className="text-xs text-white/50 mt-1 max-w-24">{step.description}</div>
                  )}
                </div>
              </div>

              {/* Connector */}
              {!isLast && (
                <div
                  className={twMerge(
                    'flex-1 h-px mx-4',
                    stepIndex < currentStep ? 'bg-cosmic-primary' : 'bg-cosmic-border',
                  )}
                />
              )}
            </div>
          );
        })}
      </nav>

      {/* Content */}
      {renderStepContent(steps[currentStep], currentStep)}
    </div>
  );
}

// Navigation controls for step wizard
export interface StepWizardControlsProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onFinish?: () => void;
  canGoNext?: boolean;
  canGoPrevious?: boolean;
  nextLabel?: string;
  previousLabel?: string;
  finishLabel?: string;
  className?: string;
}

export function StepWizardControls({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onFinish,
  canGoNext = true,
  canGoPrevious = true,
  nextLabel = 'Suivant',
  previousLabel = 'Précédent',
  finishLabel = 'Terminer',
  className,
}: StepWizardControlsProps) {
  const isLastStep = currentStep === totalSteps - 1;
  const isFirstStep = currentStep === 0;

  return (
    <div className={twMerge('flex items-center justify-between pt-6', className)}>
      <button
        onClick={onPrevious}
        disabled={isFirstStep || !canGoPrevious}
        className={twMerge(
          'px-4 py-2 text-sm font-medium rounded-md transition-colors',
          isFirstStep || !canGoPrevious
            ? 'text-white/30 cursor-not-allowed'
            : 'text-white/70 hover:text-white hover:bg-cosmic-border/50',
        )}
      >
        {previousLabel}
      </button>

      <div className="flex items-center space-x-2">
        {isLastStep ? (
          onFinish && (
            <button
              onClick={onFinish}
              disabled={!canGoNext}
              className={twMerge(
                'px-6 py-2 text-sm font-medium rounded-md transition-colors',
                canGoNext
                  ? 'bg-cosmic-primary text-white hover:bg-cosmic-primary/80'
                  : 'bg-cosmic-border text-white/30 cursor-not-allowed',
              )}
            >
              {finishLabel}
            </button>
          )
        ) : (
          <button
            onClick={onNext}
            disabled={!canGoNext}
            className={twMerge(
              'px-6 py-2 text-sm font-medium rounded-md transition-colors',
              canGoNext
                ? 'bg-cosmic-primary text-white hover:bg-cosmic-primary/80'
                : 'bg-cosmic-border text-white/30 cursor-not-allowed',
            )}
          >
            {nextLabel}
          </button>
        )}
      </div>
    </div>
  );
}
