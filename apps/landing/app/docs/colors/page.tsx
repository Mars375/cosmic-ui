export default function ColorsPage() {
  return (
    <>
      <h1>Système de couleurs</h1>

      <p>
        Documentation complète du système de couleurs HSL utilisé par CosmicUI.
        Comprendre les tokens pour créer des thèmes cohérents et accessibles.
      </p>

      <h2>Format HSL</h2>

      <p>
        CosmicUI utilise le format HSL (Hue, Saturation, Lightness) pour ses
        couleurs car il offre plusieurs avantages :
      </p>

      <ul>
        <li>
          <strong>Facilité de manipulation</strong> : Modification intuitive de
          la luminosité
        </li>
        <li>
          <strong>Cohérence visuelle</strong> : Relations harmonieuses entre les
          couleurs
        </li>
        <li>
          <strong>Accessibilité</strong> : Contraste prévisible
        </li>
        <li>
          <strong>Thèmes dynamiques</strong> : Changements fluides entre modes
        </li>
      </ul>

      <h2>Structure des tokens</h2>

      <h3>Variables principales</h3>

      <pre>
        <code>{`/* Format HSL sans unités pour Tailwind */
:root {
  /* Fond */
  --background: 0 0% 100%;           /* Blanc pur */
  --foreground: 222.2 84% 4.9%;       /* Noir profond */
  
  /* Couleur principale */
  --primary: 221.2 83.2% 53.3%;       /* Bleu vif */
  --primary-foreground: 210 40% 98%;  /* Blanc */
  
  /* Couleur secondaire */
  --secondary: 210 40% 96%;           /* Bleu très clair */
  --secondary-foreground: 222.2 84% 4.9%; /* Noir */
  
  /* États interactifs */
  --muted: 210 40% 96%;              /* Gris bleuté clair */
  --muted-foreground: 215.4 16.3% 46.9%; /* Gris bleuté */
  --accent: 210 40% 96%;             /* Accent subtil */
  --accent-foreground: 222.2 84% 4.9%; /* Texte noir */
  
  /* États d'erreur */
  --destructive: 0 84.2% 60.2%;       /* Rouge */
  --destructive-foreground: 210 40% 98%; /* Blanc */
  
  /* Interface */
  --card: 0 0% 100%;                 /* Fond carte */
  --card-foreground: 222.2 84% 4.9%; /* Texte carte */
  --popover: 0 0% 100%;             /* Fond popover */
  --popover-foreground: 222.2 84% 4.9%; /* Texte popover */
  
  /* Bordures et inputs */
  --border: 214.3 31.8% 91.4%;      /* Bordures */
  --input: 214.3 31.8% 91.4%;       /* Background input */
  --ring: 221.2 83.2% 53.3%;       /* Focus ring */
}`}</code>
      </pre>

      <h2>Guide des couleurs par usage</h2>

      <h3>Couleurs primaires</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="space-y-2">
          <div className="h-16 rounded border flex items-center justify-center bg-primary text-primary-foreground">
            Primary
          </div>
          <code>HSL(221, 83%, 53%)</code>
          <p className="text-sm text-muted-foreground">
            Couleur principale de votre app. Utilisée pour les CTA, liens
            actifs, focus states.
          </p>
        </div>

        <div className="space-y-2">
          <div className="h-16 rounded border flex items-center justify-center bg-secondary text-secondary-foreground">
            Secondary
          </div>
          <code>HSL(210, 40%, 96%)</code>
          <p className="text-sm text-muted-foreground">
            Couleur secondaire, moins saturée. Pour les éléments d'accentuation.
          </p>
        </div>
      </div>

      <h3>Couleurs fonctionnelles</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="space-y-2">
          <div className="h-16 rounded border flex items-center justify-center bg-destructive text-destructive-foreground">
            Destructive
          </div>
          <code>HSL(0, 84%, 60%)</code>
          <p className="text-sm text-muted-foreground">
            Pour les actions destructives (suppression, erreurs).
          </p>
        </div>

        <div className="space-y-2">
          <div className="h-16 rounded border flex items-center justify-center bg-muted text-muted-foreground">
            Muted
          </div>
          <code>HSL(210, 40%, 96%)</code>
          <p className="text-sm text-muted-foreground">
            Pour les contenus secondaires et de remplissage.
          </p>
        </div>

        <div className="space-y-2">
          <div className="h-16 rounded border flex items-center justify-center bg-accent text-accent-foreground">
            Accent
          </div>
          <code>HSL(210, 40%, 96%)</code>
          <p className="text-sm text-muted-foreground">
            Pour les éléments d'accentuation subtis.
          </p>
        </div>
      </div>

      <h2>Génération de palettes</h2>

      <h3>Palette monochromatique</h3>

      <pre>
        <code>{`/* Variation de luminosité d'une même teinte */
:root {
  --gray-50: 210 40% 98%;   /* Très clair */
  --gray-100: 210 40% 96%; /* Clair */
  --gray-500: 215 16% 47%; /* Moyen */
  --gray-900: 222 84% 5%;  /* Très foncé */
  --gray-950: 222 84% 1%;  /* Presque noir */
}`}</code>
      </pre>

      <h3>Palette harmonique</h3>

      <pre>
        <code>{`/* Teintes réparties équitablement */
:root {
  --primary: 221 83% 53%;    /* Bleu (0°) */
  --secondary: 262 83% 53%;  /* Violet (120°) */
  --tertiary: 142 83% 53%;   /* Vert (240°) */
}`}</code>
      </pre>

      <h3>Palette triadique</h3>

      <pre>
        <code>{`/* Couleurs à 120° d'écart sur le cercle chromatique */
:root {
  --primary: 0 100% 50%;     /* Rouge */
  --secondary: 120 100% 50%; /* Vert */
  --tertiary: 240 100% 50%; /* Bleu */
}`}</code>
      </pre>

      <h2>Outils de création</h2>

      <h3>Function HSL en JavaScript</h3>

      <pre>
        <code>{`// Conversion RGB vers HSL
function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  
  if (max === min) {
    h = s = 0; // achromatique
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

// Usage
const [h, s, l] = rgbToHsl(59, 130, 246); // blue-500
console.log(\`--color: \${h} \${s}% \${l}%\`); // "221 83% 53%"
`}</code>
      </pre>

      <h3>Validation d'accessibilité</h3>

      <pre>
        <code>{`// Calcul du contraste WCAG
function getContrast(color1, color2) {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  
  return (brightest + 0.05) / (darkest + 0.05);
}

// Validation WCAG AA (minimum 4.5:1)
function isValidContrast(color1, color2) {
  return getContrast(color1, color2) >= 4.5;
}

// Exemple d'agencement automatique
function autoForegroundForBackground(bgHsl) {
  const [, s, l] = bgHsl.split(' ').map(Number);
  
  // Si luminosité > 50%, texte sombre, sinon texte clair
  return l > 50 
    ? \`hsl(\${Math.round(Math.random() * 360)} \${s}% 20%)\`
    : \`hsl(\${Math.round(Math.random() * 360)} \${s}% 90%)\`;
}`}</code>
      </pre>

      <h2>Patterns d'usage recommandés</h2>

      <h3>Card avec états</h3>

      <pre>
        <code>{`/* États interactifs avec nos tokens */
.card-base {
  @apply bg-card text-card-foreground border-border;
}

.card-hover {
  @apply hover:bg-accent hover:text-accent-foreground;
}

.card-selected {
  @apply bg-primary text-primary-foreground border-primary;
}

.card-disabled {
  @apply bg-muted text-muted-foreground opacity-50;
}`}</code>
      </pre>

      <h3>Formulaires</h3>

      <pre>
        <code>{`/* Styles de formulaire basés sur l'état */
.input-base {
  @apply bg-input border-input text-foreground;
}

.input-focus {
  @apply focus-visible:ring-ring focus-visible:border-primary;
}

.input-error {
  @apply border-destructive focus-visible:ring-destructive;
}

.input-success {
  @apply border-green-500 focus-visible:ring-green-500;
}`}</code>
      </pre>

      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mt-6">
        <h3 className="text-amber-800 dark:text-amber-200 font-semibold">
          🎯 Accessibilité
        </h3>
        <p className="text-amber-700 dark:text-amber-300 mt-1">
          Respectez les ratios de contraste WCAG AA (4.5:1). Testez toujours vos
          couleurs avec des outils comme WebAIM's Contrast Checker.
        </p>
      </div>
    </>
  );
}
