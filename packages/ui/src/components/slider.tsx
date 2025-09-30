import * as React from 'react';
import * as RadixSlider from '@radix-ui/react-slider';
import { twMerge } from 'tailwind-merge';

export interface SliderProps extends React.ComponentPropsWithoutRef<typeof RadixSlider.Root> {
  label?: string;
}

export const Slider = ({ className, label, ...props }: SliderProps) => (
  <div className="text-white">
    {label ? (
      <label
        className="mb-1 block text-sm text-white/80"
        htmlFor={props.name as string | undefined}
      >
        {label}
      </label>
    ) : null}
    <RadixSlider.Root
      className={twMerge('relative flex w-full touch-none select-none items-center', className)}
      {...props}
    >
      <RadixSlider.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-white/10">
        <RadixSlider.Range className="absolute h-full bg-cosmic-primary" />
      </RadixSlider.Track>
      <RadixSlider.Thumb
        className="block h-4 w-4 rounded-full border border-cosmic-border bg-white"
        aria-label={label ?? 'Value'}
      />
    </RadixSlider.Root>
  </div>
);

Slider.displayName = 'Slider';

