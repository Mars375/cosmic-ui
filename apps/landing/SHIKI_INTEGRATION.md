# Intégration Shiki - Guide Complet

## 🎯 Vue d'ensemble

Shiki est déjà intégré dans votre projet CosmicUI avec une configuration optimisée pour les performances et l'expérience utilisateur.

## 📦 Configuration actuelle

### Dépendances

- **Shiki**: `3.13.0` (dernière version)
- **Next.js**: Support SSR/SSG optimisé
- **TypeScript**: Support complet

### Langages supportés

```typescript
const supportedLanguages = [
  'bash',
  'typescript',
  'javascript',
  'tsx',
  'jsx',
  'css',
  'json',
  'python',
  'react',
  'sql',
  'html',
  'markdown',
  'yaml',
  'dockerfile',
  'git',
  'diff',
];
```

### Thèmes disponibles

- `github-light` (mode clair)
- `github-dark` (mode sombre)

## 🚀 Utilisation

### Composant CodeBlock de base

```tsx
import { CodeBlock } from '@/components/code-block';

// Exemple basique
<CodeBlock language="typescript">
  const hello = 'world';
  console.log(hello);
</CodeBlock>

// Avec sélecteur de package manager
<CodeBlock language="bash" packageManager="npm">
  npm install @cosmic-ui/ui
</CodeBlock>

// Sans sélecteur de package manager
<CodeBlock language="python" showPackageManager={false}>
  print("Hello, World!")
</CodeBlock>
```

### Fonctionnalités avancées

#### 1. Mise en évidence de lignes

```tsx
<CodeBlock language="typescript">
  {`const data = fetch('/api/users');
// Cette ligne sera mise en évidence
const processed = data.map(user => user.name);
return processed;`}
</CodeBlock>
```

#### 2. Numéros de ligne

Les numéros de ligne sont automatiquement ajoutés pour tous les blocs de code.

#### 3. Copie vers le presse-papiers

Bouton de copie intégré avec feedback visuel.

## 🎨 Personnalisation

### Variables CSS personnalisées

```css
:root {
  /* Couleurs pour la coloration syntaxique */
  --shiki-string-light: #0a3069;
  --shiki-keyword-light: #cf222e;
  --shiki-function-light: #8250df;
  --shiki-tag-light: #116329;
  --shiki-text-light: #24292e;
}

.dark {
  --shiki-string-dark: #9ecbff;
  --shiki-keyword-dark: #f97583;
  --shiki-function-dark: #b392f0;
  --shiki-tag-dark: #85e89d;
  --shiki-text-dark: #e1e4e8;
}
```

### Styles pour les lignes mises en évidence

```css
[data-line] .highlighted-line {
  background-color: rgba(255, 235, 59, 0.2);
  border-left: 3px solid #ffc107;
  padding-left: 8px;
  margin-left: -8px;
}
```

## ⚡ Optimisations de performance

### 1. Configuration centralisée

- Fichier `lib/shiki-config.ts` pour la configuration
- Instance singleton du highlighter
- Chargement paresseux des thèmes et langages

### 2. Vérification des langages

```typescript
// Vérification automatique si le langage est supporté
const supportedLang = isLanguageSupported(lang) ? lang : 'bash';
```

### 3. Gestion des erreurs

- Fallback automatique vers le langage par défaut
- Affichage du code brut en cas d'erreur
- Logs d'erreur pour le debugging

## 🔧 Configuration avancée

### Ajouter de nouveaux langages

1. Modifier `lib/shiki-config.ts`:

```typescript
export const shikiConfig = {
  langs: [
    // ... langages existants
    'rust',
    'go',
    'php',
    'java',
  ],
};
```

2. Ajouter les icônes dans `code-block.tsx`:

```typescript
const getLanguageIcon = (lang: string) => {
  const icons: Record<string, JSX.Element> = {
    // ... icônes existantes
    rust: <RustIcon />,
    go: <GoIcon />,
  };
};
```

### Ajouter de nouveaux thèmes

1. Modifier `lib/shiki-config.ts`:

```typescript
export const shikiConfig = {
  themes: ['github-light', 'github-dark', 'nord', 'monokai', 'dracula'],
};
```

2. Mettre à jour la fonction `getTheme`:

```typescript
export function getTheme(isDark: boolean, customTheme?: string): string {
  if (customTheme) return customTheme;
  return isDark ? 'github-dark' : 'github-light';
}
```

## 🐛 Dépannage

### Problèmes courants

1. **Langage non supporté**
   - Vérifier que le langage est dans `shikiConfig.langs`
   - Utiliser le fallback automatique vers 'bash'

2. **Thème non chargé**
   - Vérifier que le thème est dans `shikiConfig.themes`
   - Redémarrer le serveur de développement

3. **Erreurs de compilation**
   - Vérifier les imports dans `code-block.tsx`
   - S'assurer que `lib/shiki-config.ts` est accessible

### Logs de debugging

```typescript
// Activer les logs détaillés
console.log('Language:', lang, 'Supported:', isLanguageSupported(lang));
console.log('Theme:', getTheme(isDark));
```

## 📚 Ressources

- [Documentation Shiki officielle](https://shiki.matsu.io/)
- [Thèmes disponibles](https://shiki.matsu.io/themes)
- [Langages supportés](https://shiki.matsu.io/languages)
- [Configuration Next.js](https://nextjs.org/docs)

## 🎉 Fonctionnalités à venir

- [ ] Support pour les thèmes personnalisés
- [ ] Mise en évidence de lignes interactives
- [ ] Export des blocs de code en images
- [ ] Intégration avec les outils de développement
- [ ] Support pour les annotations de code
