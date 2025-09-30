import * as React from 'react';
import { twMerge } from 'tailwind-merge';

export interface InputOTPProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  length?: number;
  value?: string;
  onChange?: (code: string) => void;
}

export const InputOTP = ({
  className,
  length = 6,
  value = '',
  onChange,
  ...props
}: InputOTPProps) => {
  const [digits, setDigits] = React.useState<string[]>(() =>
    Array.from({ length }, (_, i) => value[i] ?? ''),
  );
  const refs = React.useRef<HTMLInputElement[]>([]);

  React.useEffect(() => {
    const v = Array.from({ length }, (_, i) => value[i] ?? '');
    setDigits(v);
  }, [value, length]);

  const setAt = (idx: number, val: string) => {
    const next = [...digits];
    next[idx] = val.slice(-1);
    setDigits(next);
    onChange?.(next.join(''));
  };

  return (
    <div className={twMerge('flex items-center gap-2', className)}>
      {digits.map((d, idx) => (
        <input
          key={idx}
          ref={(el) => {
            if (el) refs.current[idx] = el;
          }}
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="[0-9]*"
          className="h-10 w-10 rounded-md border border-cosmic-border bg-cosmic-surface text-center text-lg text-white outline-none focus:ring-2 focus:ring-cosmic-primary"
          value={d}
          onChange={(e) => {
            const v = e.target.value.replace(/\D/g, '');
            setAt(idx, v);
            if (v && idx < length - 1) refs.current[idx + 1]?.focus();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Backspace' && !digits[idx] && idx > 0) {
              refs.current[idx - 1]?.focus();
            }
          }}
          aria-label={`Digit ${idx + 1}`}
          {...props}
        />
      ))}
    </div>
  );
};

InputOTP.displayName = 'InputOTP';

