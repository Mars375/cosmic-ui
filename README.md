# CosmicUI

Une librairie UI moderne et modulaire pour applications SaaS et DataViz, inspirée de Shadcn et MUI.

## 🚀 Fonctionnalités

- **Composants de base** : Button, Input, Card, Modal, etc.
- **Composants SaaS** : Sidebar, DataTable, Pricing Table, KPI widgets
- **Composants DataViz** : Charts, KPI cards, Timelines, Dashboards
- **Accessibilité** : Conforme aux standards ARIA
- **Thème** : Système de design cohérent avec tokens
- **Tests** : Unit, intégration, accessibilité et visuels
- **Documentation** : Storybook pour chaque composant

## 📦 Structure du projet

```
cosmic-ui/
├── packages/
│   ├── ui/              # Librairie de composants
│   └── tokens/          # Tokens de design (couleurs, espacements)
├── apps/
│   └── landing/         # Site de présentation
├── turbo.json          # Configuration Turborepo
└── package.json        # Scripts monorepo
```

## 🛠️ Développement

### Prérequis

- Node.js >= 18
- pnpm >= 8

### Installation

```bash
# Installer les dépendances
pnpm install

# Démarrer le développement
pnpm dev

# Démarrer Storybook
pnpm storybook

# Lancer les tests
pnpm test

# Build de production
pnpm build
```

### Scripts disponibles

- `pnpm dev` - Démarre tous les serveurs de développement
- `pnpm dev:ui` - Démarre uniquement le développement UI
- `pnpm dev:landing` - Démarre uniquement la landing page
- `pnpm build` - Build de production
- `pnpm test` - Lance tous les tests
- `pnpm lint` - Vérification du code
- `pnpm format` - Formatage du code
- `pnpm storybook` - Démarre Storybook
- `pnpm clean` - Nettoie les caches et node_modules

## 🎨 Utilisation

```tsx
import { Button, Card, CardContent } from '@cosmic-ui/ui';

function App() {
  return (
    <Card>
      <CardContent>
        <Button>Cliquez-moi</Button>
      </CardContent>
    </Card>
  );
}
```

## 🧪 Tests

- **Unit tests** : Jest + React Testing Library
- **Accessibilité** : jest-axe
- **Tests visuels** : Playwright (à venir)

## 📚 Documentation

La documentation complète est disponible dans Storybook :

- Composants de base
- Composants SaaS
- Composants DataViz
- Guide d'accessibilité
- Système de design

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.
