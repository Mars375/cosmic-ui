import * as React from 'react';
import * as RadixAvatar from '@radix-ui/react-avatar';
import { twMerge } from 'tailwind-merge';

export interface AvatarProps extends React.ComponentPropsWithoutRef<typeof RadixAvatar.Root> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  backgroundClassName?: string; // permet de contrôler le fond (light/dark)
}

export const Avatar = ({
  className,
  src,
  alt,
  fallback,
  size = 36,
  backgroundClassName = 'bg-muted',
  ...props
}: AvatarProps) => {
  const pixelSize = React.useMemo(() => {
    if (typeof size === 'number') return size;
    const map: Record<string, number> = { xs: 24, sm: 36, md: 48, lg: 64, xl: 80 };
    return map[size] ?? 36;
  }, [size]);

  return (
    <RadixAvatar.Root
      className={twMerge(
        'inline-flex items-center justify-center overflow-hidden rounded-full border',
        backgroundClassName,
        className,
      )}
      style={{ width: pixelSize, height: pixelSize }}
      {...props}
    >
      {src ? (
        <RadixAvatar.Image src={src} alt={alt} className="h-full w-full object-cover" />
      ) : null}
      <RadixAvatar.Fallback
        delayMs={300}
        className="h-full w-full flex items-center justify-center"
      >
        {fallback ?? '👤'}
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  );
};

Avatar.displayName = 'Avatar';
