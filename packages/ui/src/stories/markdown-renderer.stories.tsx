import type { Meta, StoryObj } from '@storybook/react';
import { MarkdownRenderer } from '../components/markdown-renderer';

const meta: Meta<typeof MarkdownRenderer> = {
  title: 'Components/MarkdownRenderer',
  component: MarkdownRenderer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleMarkdown = `# Guide d'utilisation

Ce guide vous explique comment utiliser **CosmicUI** pour créer des interfaces modernes.

## Installation

Pour installer CosmicUI, utilisez la commande suivante :

\`\`\`bash
npm install @cosmic-ui/ui
\`\`\`

## Composants disponibles

### Boutons

Les boutons supportent plusieurs variantes :

- \`primary\` - Bouton principal
- \`secondary\` - Bouton secondaire  
- \`outline\` - Bouton avec bordure
- \`ghost\` - Bouton transparent

### Formulaires

Les composants de formulaire incluent :

1. **Input** - Champs de saisie
2. **Select** - Listes déroulantes
3. **Checkbox** - Cases à cocher
4. **Radio** - Boutons radio

## Exemple de code

\`\`\`tsx
import { Button, Input } from '@cosmic-ui/ui';

function MyComponent() {
  return (
    <div>
      <Input placeholder="Votre nom" />
      <Button>Envoyer</Button>
    </div>
  );
}
\`\`\`

## Tableau des fonctionnalités

| Composant | Statut | Version |
|-----------|--------|---------|
| Button | ✅ Complet | 1.0.0 |
| Input | ✅ Complet | 1.0.0 |
| Modal | 🚧 En cours | 0.9.0 |
| Chart | 📋 Planifié | - |

## Citations

> "La simplicité est la sophistication suprême."
> 
> — Léonard de Vinci

## Liens utiles

- [Documentation complète](https://cosmic-ui.dev/docs)
- [GitHub Repository](https://github.com/cosmic-ui/ui)
- [Exemples en ligne](https://cosmic-ui.dev/examples)

---

*Dernière mise à jour : Décembre 2024*`;

const complexMarkdown = `# Documentation API

## Authentification

L'API utilise un système d'authentification basé sur des **tokens JWT**.

### Endpoints

#### POST /auth/login

Authentifie un utilisateur et retourne un token.

\`\`\`json
{
  "email": "user@example.com",
  "password": "password123"
}
\`\`\`

**Réponse :**

\`\`\`json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  }
}
\`\`\`

## Gestion des erreurs

| Code | Description | Solution |
|------|-------------|----------|
| 400 | Bad Request | Vérifiez les paramètres |
| 401 | Unauthorized | Token invalide ou expiré |
| 403 | Forbidden | Permissions insuffisantes |
| 404 | Not Found | Ressource introuvable |
| 500 | Server Error | Erreur interne du serveur |

## Exemples d'utilisation

### JavaScript

\`\`\`javascript
const response = await fetch('/api/users', {
  method: 'GET',
  headers: {
    'Authorization': \`Bearer \${token}\`,
    'Content-Type': 'application/json'
  }
});

const users = await response.json();
\`\`\`

### Python

\`\`\`python
import requests

headers = {
    'Authorization': f'Bearer {token}',
    'Content-Type': 'application/json'
}

response = requests.get('/api/users', headers=headers)
users = response.json()
\`\`\`

## Notes importantes

> ⚠️ **Attention** : Les tokens expirent après 24 heures. Pensez à les renouveler.

> 💡 **Astuce** : Utilisez le endpoint \`/auth/refresh\` pour renouveler votre token sans reconnecter l'utilisateur.

## Support

Pour toute question :

- 📧 Email : support@cosmic-ui.dev
- 💬 Chat : [Discord](https://discord.gg/cosmic-ui)
- 📖 Docs : [Documentation](https://docs.cosmic-ui.dev)

---

*Version de l'API : 2.1.0*`;

export const Default: Story = {
  render: () => (
    <div className="max-w-4xl p-8">
      <MarkdownRenderer content={sampleMarkdown} />
    </div>
  ),
};

export const ComplexDocumentation: Story = {
  render: () => (
    <div className="max-w-4xl p-8">
      <MarkdownRenderer content={complexMarkdown} />
    </div>
  ),
};

export const WithCustomStyling: Story = {
  render: () => (
    <div className="max-w-4xl p-8">
      <MarkdownRenderer content={sampleMarkdown} className="prose-lg" />
    </div>
  ),
};

export const SimpleContent: Story = {
  render: () => (
    <div className="max-w-2xl p-8">
      <MarkdownRenderer
        content={`# Titre simple

Ceci est un **paragraphe** avec du texte en *italique* et du \`code inline\`.

## Liste

- Premier élément
- Deuxième élément
- Troisième élément

[Lien vers la documentation](https://cosmic-ui.dev)`}
      />
    </div>
  ),
};

export const CodeHeavy: Story = {
  render: () => (
    <div className="max-w-4xl p-8">
      <MarkdownRenderer
        content={`# Guide de développement

## Configuration TypeScript

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
}

const user: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  createdAt: new Date()
};
\`\`\`

## Configuration Tailwind

\`\`\`css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .btn-primary {
    @apply bg-blue-500 text-white px-4 py-2 rounded;
  }
}
\`\`\`

## Script de build

\`\`\`bash
#!/bin/bash
echo "Building project..."
npm run build
echo "Build complete!"
\`\`\`

## Configuration Docker

\`\`\`dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
\`\`\``}
      />
    </div>
  ),
};
