import * as React from 'react';
import { twMerge } from 'tailwind-merge';

export interface InputMaskProps extends React.InputHTMLAttributes<HTMLInputElement> {
  mask: (raw: string) => string;
}

export const InputWithMask = ({
  className,
  mask,
  onChange,
  defaultValue,
  value,
  ...props
}: InputMaskProps) => {
  const [displayValue, setDisplayValue] = React.useState<string>(() => {
    const initial = (value as string | undefined) ?? (defaultValue as string | undefined) ?? '';
    const raw = String(initial).replace(/\s/g, '');
    return mask(raw);
  });

  React.useEffect(() => {
    if (value !== undefined) {
      const raw = String(value).replace(/\s/g, '');
      setDisplayValue(mask(raw));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <input
      {...props}
      value={displayValue}
      className={twMerge(
        'w-full rounded-md border border-cosmic-border bg-cosmic-surface px-3 py-2 text-sm text-white outline-none ring-0 placeholder:text-white/40 focus:ring-2 focus:ring-cosmic-primary',
        className,
      )}
      onChange={(e) => {
        const raw = e.target.value.replace(/\s/g, '');
        const masked = mask(raw);
        setDisplayValue(masked);
        if (onChange) {
          const ev = {
            ...e,
            target: { ...e.target, value: masked },
          } as React.ChangeEvent<HTMLInputElement>;
          onChange(ev);
        }
      }}
    />
  );
};

InputWithMask.displayName = 'InputWithMask';
