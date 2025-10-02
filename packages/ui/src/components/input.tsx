import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  email?: boolean;
  url?: boolean;
  number?: boolean;
  custom?: (value: string) => string | null;
}

export interface ValidationState {
  isValid: boolean;
  error: string | null;
  isDirty: boolean;
  isTouched: boolean;
}

const inputVariants = cva(
  'w-full appearance-none bg-background text-foreground placeholder:text-muted-foreground border border-input outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))]',
  {
    variants: {
      size: {
        sm: 'h-9 px-3 text-sm rounded-md',
        md: 'h-10 px-4 text-sm rounded-lg',
        lg: 'h-11 px-4 text-base rounded-lg',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
      invalid: {
        true: 'border-destructive focus-visible:ring-destructive',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      fullWidth: true,
      invalid: false,
    },
  },
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  label?: string;
  helperText?: string;
  errorText?: string;
  rules?: ValidationRule;
  showValidation?: boolean;
  onValidationChange?: (state: ValidationState) => void;
}

// Fonction de validation
const validateInput = (value: string, rules?: ValidationRule): ValidationState => {
  if (!rules) return { isValid: true, error: null, isDirty: false, isTouched: false };

  // Required
  if (rules.required && (!value || value.trim() === '')) {
    return { isValid: false, error: 'Ce champ est obligatoire', isDirty: true, isTouched: true };
  }

  // Skip other validations if empty and not required
  if (!value || value.trim() === '') {
    return { isValid: true, error: null, isDirty: false, isTouched: false };
  }

  // Min length
  if (rules.minLength && value.length < rules.minLength) {
    return {
      isValid: false,
      error: `Minimum ${rules.minLength} caractères`,
      isDirty: true,
      isTouched: true,
    };
  }

  // Max length
  if (rules.maxLength && value.length > rules.maxLength) {
    return {
      isValid: false,
      error: `Maximum ${rules.maxLength} caractères`,
      isDirty: true,
      isTouched: true,
    };
  }

  // Email
  if (rules.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return { isValid: false, error: 'Format email invalide', isDirty: true, isTouched: true };
  }

  // URL
  if (rules.url && !/^https?:\/\/.+/.test(value)) {
    return { isValid: false, error: 'Format URL invalide', isDirty: true, isTouched: true };
  }

  // Number
  if (rules.number && isNaN(Number(value))) {
    return { isValid: false, error: 'Doit être un nombre', isDirty: true, isTouched: true };
  }

  // Pattern
  if (rules.pattern && !rules.pattern.test(value)) {
    return { isValid: false, error: 'Format invalide', isDirty: true, isTouched: true };
  }

  // Custom validation
  if (rules.custom) {
    const customError = rules.custom(value);
    if (customError) {
      return { isValid: false, error: customError, isDirty: true, isTouched: true };
    }
  }

  return { isValid: true, error: null, isDirty: true, isTouched: true };
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      size,
      fullWidth,
      leading,
      trailing,
      invalid,
      label,
      helperText,
      errorText,
      rules,
      showValidation = true,
      onValidationChange,
      onChange,
      onBlur,
      value,
      defaultValue,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue || '');
    const [validationState, setValidationState] = React.useState<ValidationState>({
      isValid: true,
      error: null,
      isDirty: false,
      isTouched: false,
    });

    const currentValue = value !== undefined ? value : internalValue;
    const isControlled = value !== undefined;

    // Validate on value change
    React.useEffect(() => {
      if (rules && showValidation) {
        const newState = validateInput(String(currentValue), rules);
        setValidationState(newState);
        onValidationChange?.(newState);
      }
    }, [currentValue, rules, showValidation, onValidationChange]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;

      if (!isControlled) {
        setInternalValue(newValue);
      }

      onChange?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (rules && showValidation) {
        const newState = { ...validationState, isTouched: true };
        setValidationState(newState);
        onValidationChange?.(newState);
      }
      onBlur?.(e);
    };

    const hasError =
      invalid || (showValidation && !validationState.isValid && validationState.isTouched);
    const displayError = errorText || (showValidation && validationState.error);

    const field = (
      <input
        ref={ref}
        value={currentValue}
        onChange={handleChange}
        onBlur={handleBlur}
        aria-invalid={hasError || undefined}
        aria-describedby={
          displayError
            ? `${props.id || 'input'}-error`
            : helperText
              ? `${props.id || 'input'}-helper`
              : undefined
        }
        className={twMerge(
          inputVariants({ size, fullWidth, invalid: hasError }),
          className,
          leading || trailing ? 'pl-10 pr-10' : undefined,
        )}
        {...props}
      />
    );

    const inputElement =
      !leading && !trailing ? (
        field
      ) : (
        <div className="relative">
          {leading && (
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {leading}
            </span>
          )}
          {field}
          {trailing && (
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {trailing}
            </span>
          )}
        </div>
      );

    // If no label, helper text, or error, return just the input
    if (!label && !helperText && !displayError) {
      return inputElement;
    }

    // Return full field with label and validation
    return (
      <div className="space-y-1">
        {label && (
          <label
            htmlFor={props.id}
            className={twMerge(
              'text-sm font-medium text-foreground',
              rules?.required && 'after:content-["*"] after:ml-0.5 after:text-destructive',
            )}
          >
            {label}
          </label>
        )}
        {inputElement}
        {displayError && showValidation && validationState.isTouched && (
          <p id={`${props.id || 'input'}-error`} className="text-sm text-destructive">
            {displayError}
          </p>
        )}
        {helperText && !displayError && (
          <p id={`${props.id || 'input'}-helper`} className="text-sm text-muted-foreground">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';
