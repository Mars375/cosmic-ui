export default function CustomizationPage() {
  return (
    <>
      <h1>Personnalisation</h1>

      <p>
        Guide complet pour étendre et personnaliser CosmicUI selon vos besoins
        spécifiques. Découvrez comment créer vos propres variants et composants.
      </p>

      <h2>Override des styles par défaut</h2>

      <h3>Composant Button personnalisé</h3>

      <pre>
        <code>{`import { Button, type ButtonProps } from '@cosmic-ui/ui';
import { cn } from '@/lib/utils';

interface CustomButtonProps extends ButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
}

export function CustomButton({ 
  className, 
  variant = 'default', 
  ...props 
}: CustomButtonProps) {
  return (
    <Button
      className={cn(
        // Styles personnalisés pour votre variant
        variant === 'custom' && 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600',
        className
      )}
      {...props}
    />
  );
}`}</code>
      </pre>

      <h3>Thème customisé avec classe</h3>

      <pre>
        <code>{`// styles/custom-theme.css
.custom-theme {
  --primary: 280 100% 70%;
  --primary-foreground: 0 0% 100%;
  --secondary: 220 50% 85%;
  --accent: 280 50% 90%;
}

.gradient-text {
  background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}`}</code>
      </pre>

      <h2>Composants composites</h2>

      <h3>Card avec header/footer customisés</h3>

      <pre>
        <code>{`import { Card, CardContent, CardHeader, CardTitle } from '@cosmic-ui/ui';
import { cn } from '@/lib/utils';

interface CustomCardProps {
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function CustomCard({ title, children, footer, className }: CustomCardProps) {
  return (
    <Card className={cn('group hover:shadow-lg transition-shadow', className)}>
      {title && (
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className="space-y-4">
        {children}
      </CardContent>
      {footer && (
        <div className="px-6 pb-6 pt-0">
          <div className="pt-4 border-t border-border">
            {footer}
          </div>
        </div>
      )}
    </Card>
  );
}`}</code>
      </pre>

      <h3>Input avec validation intégrée</h3>

      <pre>
        <code>{`import { Input } from '@cosmic-ui/ui';
import { cn } from '@/lib/utils';
import { forwardRef, useState } from 'react';

interface ValidatedInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onValidate?: (value: string) => string | null;
  onChange?: (value: string, isValid: boolean) => void;
}

export const ValidatedInput = forwardRef<HTMLInputElement, ValidatedInputProps>(
  ({ className, onValidate, onChange, onBlur, ...props }, ref) => {
    const [error, setError] = useState<string | null>(null);

    const handleValidate = (value: string) => {
      if (onValidate) {
        const errorMessage = onValidate(value);
        setError(errorMessage);
        onChange?.(value, !errorMessage);
      } else {
        onChange?.(value, true);
      }
    };

    return (
      <div className="space-y-1">
        <Input
          ref={ref}
          className={cn(
            error && 'border-destructive focus-visible:ring-destructive',
            className
          )}
          onBlur={(e) => {
            handleValidate(e.target.value);
            onBlur?.(e);
          }}
          {...props}
        />
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
      </div>
    );
  }
);`}</code>
      </pre>

      <h2>Tokens personnalisés</h2>

      <h3>Espaces et typography custom</h3>

      <pre>
        <code>{`// tailwind.config.ts
export default {
  theme: {
    extend: {
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      fontSize: {
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      colors: {
        // Vos couleurs custom
        brand: {
          50: '#f0f9ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
        accent: {
          warm: 'hsl(24 100% 85%)',
          cool: 'hsl(200 100% 85%)',
        },
      },
    },
  },
};`}</code>
      </pre>

      <h3>Variables CSS étendues</h3>

      <pre>
        <code>{`:root {
  /* Variables CosmicUI par défaut */
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  
  /* Variables étendues */
  --border-radius-custom: 1rem;
  --shadow-custom: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  --animation-duration: 150ms;
  --animation-timing: cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Couleurs métier */
  --success: 142 76% 36%;
  --success-foreground: 0 0% 98%;
  --warning: 47 96% 53%;
  --warning-foreground: 26 83% 14%;
  --info: 199 89% 48%;
  --info-foreground: 0 0% 98%;
}`}</code>
      </pre>

      <h2>Animation personnalisées</h2>

      <h3>Keyframes custom</h3>

      <pre>
        <code>{`/* styles/animations.css */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes glow {
  0%, 100% { box-shadow: 0 0 5px hsl(var(--primary)); }
  50% { box-shadow: 0 0 20px hsl(var(--primary)); }
}

@keyframes slide-in {
  from { transform: translateX(-100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

.animate-float { animation: float 3s ease-in-out infinite; }
.animate-glow { animation: glow 2s ease-in-out infinite; }
.animate-slide-in { animation: slide-in 0.3s ease-out; }`}</code>
      </pre>

      <h3>Composant avec animations</h3>

      <pre>
        <code>{`import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  children: React.ReactNode;
  animation?: 'float' | 'glow' | 'slide-in';
  delay?: number;
}

export function AnimatedCard({ 
  children, 
  animation = 'slide-in', 
  delay = 0 
}: AnimatedCardProps) {
  const animationClasses = {
    float: 'animate-float',
    glow: 'animate-glow',
    'slide-in': 'animate-slide-in',
  };

  return (
    <div 
      className={cn(animationClasses[animation])}
      style={{ animationDelay: \`\${delay}ms\` }}
    >
      {children}
    </div>
  );
}`}</code>
      </pre>

      <h2>Breakpoints et responsive</h2>

      <h3>Utilitaires responsive personnalisés</h3>

      <pre>
        <code>{`// lib/responsive.ts
export const breakpoints = {
  xs: '475px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export function useMediaQuery(breakpoint: keyof typeof breakpoints) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(\`(min-width: \${breakpoints[breakpoint]})\`);
    setMatches(media.matches);

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener('change', listener);
    
    return () => media.removeEventListener('change', listener);
  }, [breakpoint]);

  return matches;
}`}</code>
      </pre>

      <h2>Thème multi-brand</h2>

      <h3>Switcher de thème</h3>

      <pre>
        <code>{`'use client';

import { cn } from '@/lib/utils';

type BrandTheme = 'default' | 'corporate' | 'startup' | 'creative';

const brandThemes: Record<BrandTheme, { primary: string; secondary: string }> = {
  default: {
    primary: '262 83% 58%',
    secondary: '210 40% 96%',
  },
  corporate: {
    primary: '215 25% 27%',
    secondary: '215 16% 47%',
  },
  startup: {
    primary: '142 71% 45%',
    secondary: '142 47% 91%',
  },
  creative: {
    primary: '24 100% 57%',
    secondary: '24 100% 90%',
  },
};

export function BrandThemeToggle({ currentTheme, onThemeChange }: {
  currentTheme: BrandTheme;
  onThemeChange: (theme: BrandTheme) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {Object.keys(brandThemes).map((theme) => (
        <button
          key={theme}
          onClick={() => onThemeChange(theme as BrandTheme)}
          className={cn(
            'px-3 py-2 rounded-md text-sm font-medium transition-colors',
            currentTheme === theme 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          )}
        >
          {theme.charAt(0).toUpperCase() + theme.slice(1)}
        </button>
      ))}
    </div>
  );
}`}</code>
      </pre>

      <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4 mt-6">
        <h3 className="text-indigo-800 dark:text-indigo-200 font-semibold">
          🚀 Extension
        </h3>
        <p className="text-indigo-700 dark:text-indigo-300 mt-1">
          CosmicUI est conçu pour être étendu. Utilisez <code>cn()</code> pour
          fusionner vos styles avec ceux de la bibliothèque, et n'hésitez pas à
          créer vos propres variants.
        </p>
      </div>
    </>
  );
}
