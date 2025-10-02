# Intégration du thème dans votre application

CosmicUI est une librairie **sans thème par défaut**. Elle utilise les variables CSS de votre application pour s'adapter automatiquement à votre design system.

## Variables CSS requises

Votre application doit définir ces variables CSS pour que les composants fonctionnent correctement :

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 222.2 84% 4.9%;
  --primary: 262.1 83.3% 57.8%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96%;
  --secondary-foreground: 222.2 84% 4.9%;
  --muted: 210 40% 96%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96%;
  --accent-foreground: 222.2 84% 4.9%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 262.1 83.3% 57.8%;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --card: 222.2 84% 4.9%;
  --card-foreground: 210 40% 98%;
  --popover: 222.2 84% 4.9%;
  --popover-foreground: 210 40% 98%;
  --primary: 262.1 83.3% 57.8%;
  --primary-foreground: 210 40% 98%;
  --secondary: 217.2 32.6% 17.5%;
  --secondary-foreground: 210 40% 98%;
  --muted: 217.2 32.6% 17.5%;
  --muted-foreground: 215 20.2% 65.1%;
  --accent: 217.2 32.6% 17.5%;
  --accent-foreground: 210 40% 98%;
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 210 40% 98%;
  --border: 217.2 32.6% 17.5%;
  --input: 217.2 32.6% 17.5%;
  --ring: 262.1 83.3% 57.8%;
}
```

## Configuration Tailwind

Ajoutez le preset CosmicUI à votre `tailwind.config.js` :

```js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './node_modules/@cosmic-ui/ui/dist/**/*.{js,ts,jsx,tsx}'],
  presets: [require('@cosmic-ui/tokens/tailwind.preset.cjs')],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

## Exemple d'utilisation

```tsx
import { Button, Card, Input } from '@cosmic-ui/ui';

function App() {
  return (
    <div className="bg-background text-foreground">
      <Card>
        <CardContent>
          <Input placeholder="Votre texte..." />
          <Button>Cliquez-moi</Button>
        </CardContent>
      </Card>
    </div>
  );
}
```

## Mode sombre

Pour activer le mode sombre, ajoutez la classe `dark` à votre élément racine :

```tsx
// Dans votre composant racine
<div className="dark">
  <App />
</div>
```

## Personnalisation

Vous pouvez personnaliser les couleurs en modifiant les variables CSS dans votre application. Les composants s'adapteront automatiquement.

```css
:root {
  --primary: 142 76% 36%; /* Vert au lieu de violet */
  --secondary: 210 40% 96%; /* Gris clair */
}
```

## Avantages

- ✅ **Flexibilité** : Utilise le thème de votre application
- ✅ **Cohérence** : S'intègre parfaitement à votre design system
- ✅ **Performance** : Pas de CSS supplémentaire inutile
- ✅ **Maintenance** : Un seul endroit pour gérer les couleurs
