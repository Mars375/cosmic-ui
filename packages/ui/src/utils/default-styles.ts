/**
 * Utilitaires pour les styles par défaut des composants
 * Ces styles s'adaptent automatiquement au thème de l'application
 */

export const defaultComponentStyles = {
  // Backgrounds par défaut
  backgrounds: {
    card: 'bg-card text-card-foreground',
    surface: 'bg-background text-foreground',
    muted: 'bg-muted text-muted-foreground',
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    accent: 'bg-accent text-accent-foreground',
  },

  // Bordures par défaut
  borders: {
    default: 'border border-border',
    muted: 'border border-muted',
    input: 'border border-input',
  },

  // États interactifs
  interactive: {
    hover: 'hover:bg-accent hover:text-accent-foreground',
    focus: 'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    disabled: 'disabled:opacity-50 disabled:cursor-not-allowed',
  },

  // Transitions
  transitions: {
    default: 'transition-colors duration-200',
    all: 'transition-all duration-200',
  },
} as const;

/**
 * Combine les styles par défaut avec les styles personnalisés
 */
export function combineStyles(...styles: (string | undefined)[]): string {
  return styles.filter(Boolean).join(' ');
}

/**
 * Applique les styles par défaut d'un composant
 */
export function applyDefaultStyles(
  componentType: keyof typeof defaultComponentStyles.backgrounds,
  customClassName?: string,
  options: {
    withBorder?: boolean;
    withHover?: boolean;
    withFocus?: boolean;
    withTransition?: boolean;
  } = {},
): string {
  const {
    withBorder = false,
    withHover = false,
    withFocus = false,
    withTransition = true,
  } = options;

  const styles = [
    defaultComponentStyles.backgrounds[componentType],
    withBorder && defaultComponentStyles.borders.default,
    withHover && defaultComponentStyles.interactive.hover,
    withFocus && defaultComponentStyles.interactive.focus,
    withTransition && defaultComponentStyles.transitions.default,
    defaultComponentStyles.interactive.disabled,
    customClassName,
  ];

  return combineStyles(...styles);
}
