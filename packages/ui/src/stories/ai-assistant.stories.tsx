import type { Meta, StoryObj } from '@storybook/react';
import { AIAssistant, useAIAssistant } from '../components/ai-assistant';
import { Button } from '../components/button';
import { useState } from 'react';

const meta: Meta<typeof AIAssistant> = {
  title: 'Components/AIAssistant',
  component: AIAssistant,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleMessages = [
  {
    id: '1',
    content: "Bonjour ! Je suis votre assistant IA. Comment puis-je vous aider aujourd'hui ?",
    sender: 'ai' as const,
    timestamp: new Date(Date.now() - 10 * 60000),
  },
  {
    id: '2',
    content: "Pouvez-vous m'expliquer comment utiliser React ?",
    sender: 'user' as const,
    timestamp: new Date(Date.now() - 8 * 60000),
  },
  {
    id: '3',
    content:
      'Bien sûr ! React est une bibliothèque JavaScript pour créer des interfaces utilisateur. Voici un exemple simple :',
    sender: 'ai' as const,
    timestamp: new Date(Date.now() - 7 * 60000),
    type: 'code' as const,
    code: {
      language: 'jsx',
      content: `import React from 'react';

function App() {
  return (
    <div>
      <h1>Hello World!</h1>
    </div>
  );
}

export default App;`,
    },
  },
  {
    id: '4',
    content: "Merci ! C'est très clair.",
    sender: 'user' as const,
    timestamp: new Date(Date.now() - 5 * 60000),
  },
  {
    id: '5',
    content: "De rien ! Avez-vous d'autres questions sur React ou sur autre chose ?",
    sender: 'ai' as const,
    timestamp: new Date(Date.now() - 3 * 60000),
    suggestions: [
      'Comment créer des composants ?',
      "Qu'est-ce que les hooks ?",
      "Comment gérer l'état ?",
    ],
  },
];

const sampleSuggestions = [
  'Comment créer un composant React ?',
  "Qu'est-ce que les hooks ?",
  "Comment gérer l'état local ?",
  'Comment faire des requêtes API ?',
  'Comment styliser avec Tailwind ?',
];

function AIAssistantDemo() {
  const { messages, isTyping, sendMessage, simulateAIResponse } = useAIAssistant();

  // Initialize with sample messages
  React.useEffect(() => {
    if (messages.length === 0) {
      sampleMessages.forEach((message) => {
        // @ts-ignore
        messages.push(message);
      });
    }
  }, [messages.length]);

  const handleSendMessage = (content: string) => {
    sendMessage(content);

    // Simulate AI response
    setTimeout(
      () => {
        const responses = [
          'Je comprends votre question. Laissez-moi vous expliquer...',
          'Excellente question ! Voici ce que je peux vous dire...',
          'Je vais vous aider avec cela. Voici une explication détaillée...',
          "C'est une question intéressante. Permettez-moi de vous donner quelques informations...",
        ];

        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        simulateAIResponse(randomResponse, 'text', [
          'Pouvez-vous donner plus de détails ?',
          'Avez-vous un exemple ?',
          "Comment puis-je l'implémenter ?",
        ]);
      },
      1000 + Math.random() * 2000,
    );
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">AI Assistant</h2>
        <p className="text-white/70">Assistant IA intégré pour aider les utilisateurs</p>
      </div>

      <AIAssistant
        messages={messages}
        onSendMessage={handleSendMessage}
        isTyping={isTyping}
        suggestions={sampleSuggestions}
        maxHeight={400}
      />
    </div>
  );
}

export const Default: Story = {
  render: () => <AIAssistantDemo />,
};

export const EmptyChat: Story = {
  render: () => {
    const { messages, sendMessage, simulateAIResponse } = useAIAssistant();

    const handleSendMessage = (content: string) => {
      sendMessage(content);

      setTimeout(() => {
        simulateAIResponse(
          'Bonjour ! Je suis là pour vous aider. Que puis-je faire pour vous ?',
          'text',
          [
            'Comment utiliser cette application ?',
            'Quelles sont les fonctionnalités disponibles ?',
            "Comment obtenir de l'aide ?",
          ],
        );
      }, 1000);
    };

    return (
      <div className="p-8">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-2">Chat vide</h3>
          <p className="text-white/70 text-sm">Assistant IA sans messages initiaux</p>
        </div>

        <AIAssistant
          messages={messages}
          onSendMessage={handleSendMessage}
          suggestions={sampleSuggestions}
          maxHeight={400}
        />
      </div>
    );
  },
};

export const WithCodeExamples: Story = {
  render: () => {
    const { messages, sendMessage, simulateAIResponse } = useAIAssistant();

    const handleSendMessage = (content: string) => {
      sendMessage(content);

      setTimeout(() => {
        if (content.toLowerCase().includes('code') || content.toLowerCase().includes('exemple')) {
          simulateAIResponse('Voici un exemple de code pour vous aider :', 'code', undefined, {
            language: 'javascript',
            content: `// Exemple de fonction
function greetUser(name) {
  return \`Bonjour, \${name} ! Comment allez-vous ?\`;
}

// Utilisation
const message = greetUser('Marie');
console.log(message); // "Bonjour, Marie ! Comment allez-vous ?"`,
          });
        } else {
          simulateAIResponse('Je peux vous aider avec du code ! Demandez-moi un exemple.', 'text', [
            'Montrez-moi un exemple de code',
            'Comment écrire une fonction ?',
            'Aide avec JavaScript',
          ]);
        }
      }, 1000);
    };

    return (
      <div className="p-8">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-2">Avec exemples de code</h3>
          <p className="text-white/70 text-sm">Assistant IA qui peut afficher du code</p>
        </div>

        <AIAssistant
          messages={messages}
          onSendMessage={handleSendMessage}
          suggestions={[
            'Montrez-moi un exemple de code',
            'Comment écrire une fonction JavaScript ?',
            'Aide avec React',
          ]}
          maxHeight={400}
        />
      </div>
    );
  },
};

export const WithSuggestions: Story = {
  render: () => {
    const { messages, sendMessage, simulateAIResponse } = useAIAssistant();

    const handleSendMessage = (content: string) => {
      sendMessage(content);

      setTimeout(() => {
        simulateAIResponse(
          'Je comprends votre question. Voici quelques suggestions pour vous aider :',
          'suggestion',
          [
            'Pouvez-vous expliquer plus en détail ?',
            'Avez-vous un exemple pratique ?',
            "Comment puis-je l'implémenter ?",
            'Y a-t-il des alternatives ?',
          ],
        );
      }, 1000);
    };

    return (
      <div className="p-8">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-2">Avec suggestions</h3>
          <p className="text-white/70 text-sm">Assistant IA avec suggestions de questions</p>
        </div>

        <AIAssistant
          messages={messages}
          onSendMessage={handleSendMessage}
          suggestions={[
            'Comment créer un composant ?',
            "Qu'est-ce que les hooks ?",
            "Comment gérer l'état ?",
            'Comment faire des requêtes API ?',
          ]}
          maxHeight={400}
        />
      </div>
    );
  },
};

export const TypingIndicator: Story = {
  render: () => {
    const { messages, sendMessage, simulateAIResponse } = useAIAssistant();

    const handleSendMessage = (content: string) => {
      sendMessage(content);
      simulateAIResponse('Je réfléchis à votre question...', 'text');
    };

    return (
      <div className="p-8">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-2">Indicateur de frappe</h3>
          <p className="text-white/70 text-sm">Assistant IA avec indicateur de frappe</p>
        </div>

        <AIAssistant
          messages={messages}
          onSendMessage={handleSendMessage}
          isTyping={true}
          maxHeight={400}
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const { messages } = useAIAssistant();

    return (
      <div className="p-8">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-2">Désactivé</h3>
          <p className="text-white/70 text-sm">Assistant IA désactivé</p>
        </div>

        <AIAssistant
          messages={messages}
          onSendMessage={() => {}}
          disabled={true}
          placeholder="L'assistant est temporairement indisponible"
          maxHeight={400}
        />
      </div>
    );
  },
};
