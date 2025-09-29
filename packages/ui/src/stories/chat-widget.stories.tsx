import type { Meta, StoryObj } from '@storybook/react';
import { ChatWidget, useChatWidget } from '../components/chat-widget';
import { Button } from '../components/button';
import { useState } from 'react';

const meta: Meta<typeof ChatWidget> = {
  title: 'Components/ChatWidget',
  component: ChatWidget,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleAgent = {
  id: '1',
  name: 'Sarah Martin',
  avatar:
    'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
  status: 'online' as const,
  role: 'Support technique',
};

const sampleMessages = [
  {
    id: '1',
    content: "Bonjour ! Comment puis-je vous aider aujourd'hui ?",
    sender: 'agent' as const,
    timestamp: new Date(Date.now() - 10 * 60000), // 10 minutes ago
    avatar: sampleAgent.avatar,
    name: sampleAgent.name,
  },
  {
    id: '2',
    content: "Bonjour, j'ai un problème avec ma commande",
    sender: 'user' as const,
    timestamp: new Date(Date.now() - 8 * 60000), // 8 minutes ago
  },
  {
    id: '3',
    content: 'Je comprends. Pouvez-vous me donner le numéro de votre commande ?',
    sender: 'agent' as const,
    timestamp: new Date(Date.now() - 7 * 60000), // 7 minutes ago
    avatar: sampleAgent.avatar,
    name: sampleAgent.name,
  },
  {
    id: '4',
    content: "Bien sûr, c'est le #12345",
    sender: 'user' as const,
    timestamp: new Date(Date.now() - 5 * 60000), // 5 minutes ago
  },
  {
    id: '5',
    content:
      'Merci ! Je vois votre commande. Elle est en cours de traitement et devrait être expédiée demain.',
    sender: 'agent' as const,
    timestamp: new Date(Date.now() - 3 * 60000), // 3 minutes ago
    avatar: sampleAgent.avatar,
    name: sampleAgent.name,
  },
];

function ChatWidgetDemo() {
  const { messages, isTyping, addMessage, sendMessage, sendFile, simulateTyping } = useChatWidget();

  // Initialize with sample messages
  React.useEffect(() => {
    if (messages.length === 0) {
      sampleMessages.forEach((message) => {
        addMessage(message);
      });
    }
  }, [messages.length, addMessage]);

  const handleSendMessage = (content: string) => {
    sendMessage(content);
    // Simulate agent response
    setTimeout(() => {
      simulateTyping();
      setTimeout(() => {
        addMessage({
          content: 'Merci pour votre message. Je vais vous répondre dans quelques instants.',
          sender: 'agent',
          avatar: sampleAgent.avatar,
          name: sampleAgent.name,
        });
      }, 2000);
    }, 1000);
  };

  const handleSendFile = (file: File) => {
    sendFile(file);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Chat Widget</h2>
        <p className="text-white/70">
          Widget de chat pour le support client avec gestion des messages et fichiers
        </p>
      </div>

      <ChatWidget
        messages={messages}
        agent={sampleAgent}
        onSendMessage={handleSendMessage}
        onSendFile={handleSendFile}
        isTyping={isTyping}
        maxHeight={400}
      />
    </div>
  );
}

export const Default: Story = {
  render: () => <ChatWidgetDemo />,
};

export const EmptyChat: Story = {
  render: () => {
    const { messages, sendMessage, sendFile } = useChatWidget();

    return (
      <div className="p-8">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-2">Chat vide</h3>
          <p className="text-white/70 text-sm">Chat sans messages initiaux</p>
        </div>

        <ChatWidget
          messages={messages}
          agent={sampleAgent}
          onSendMessage={sendMessage}
          onSendFile={sendFile}
          maxHeight={400}
        />
      </div>
    );
  },
};

export const WithFileUpload: Story = {
  render: () => {
    const { messages, sendMessage, sendFile } = useChatWidget();

    // Initialize with sample messages
    React.useEffect(() => {
      if (messages.length === 0) {
        sampleMessages.forEach((message) => {
          // @ts-ignore
          messages.push(message);
        });
      }
    }, [messages.length]);

    return (
      <div className="p-8">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-2">Avec upload de fichiers</h3>
          <p className="text-white/70 text-sm">Chat avec possibilité d'envoyer des fichiers</p>
        </div>

        <ChatWidget
          messages={messages}
          agent={sampleAgent}
          onSendMessage={sendMessage}
          onSendFile={sendFile}
          maxHeight={400}
        />
      </div>
    );
  },
};

export const AgentOffline: Story = {
  render: () => {
    const { messages, sendMessage } = useChatWidget();

    const offlineAgent = {
      ...sampleAgent,
      status: 'offline' as const,
    };

    return (
      <div className="p-8">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-2">Agent hors ligne</h3>
          <p className="text-white/70 text-sm">Chat avec un agent hors ligne</p>
        </div>

        <ChatWidget
          messages={messages}
          agent={offlineAgent}
          onSendMessage={sendMessage}
          disabled={true}
          placeholder="L'agent est hors ligne"
          maxHeight={400}
        />
      </div>
    );
  },
};

export const WithTypingIndicator: Story = {
  render: () => {
    const { messages, sendMessage } = useChatWidget();

    // Initialize with sample messages
    React.useEffect(() => {
      if (messages.length === 0) {
        sampleMessages.forEach((message) => {
          // @ts-ignore
          messages.push(message);
        });
      }
    }, [messages.length]);

    return (
      <div className="p-8">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-2">Avec indicateur de frappe</h3>
          <p className="text-white/70 text-sm">Chat avec indicateur de frappe activé</p>
        </div>

        <ChatWidget
          messages={messages}
          agent={sampleAgent}
          onSendMessage={sendMessage}
          isTyping={true}
          maxHeight={400}
        />
      </div>
    );
  },
};

export const DifferentAgentStatuses: Story = {
  render: () => {
    const { messages, sendMessage } = useChatWidget();

    const agents = [
      { ...sampleAgent, status: 'online' as const, name: 'Sarah (En ligne)' },
      { ...sampleAgent, status: 'away' as const, name: 'Marie (Absente)' },
      { ...sampleAgent, status: 'offline' as const, name: 'Pierre (Hors ligne)' },
    ];

    const [selectedAgent, setSelectedAgent] = useState(0);

    return (
      <div className="p-8">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-2">Différents statuts d'agent</h3>
          <p className="text-white/70 text-sm">Chat avec différents statuts d'agent</p>
        </div>

        <div className="mb-4 flex space-x-2">
          {agents.map((agent, index) => (
            <Button
              key={index}
              variant={selectedAgent === index ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedAgent(index)}
            >
              {agent.name}
            </Button>
          ))}
        </div>

        <ChatWidget
          messages={messages}
          agent={agents[selectedAgent]}
          onSendMessage={sendMessage}
          maxHeight={400}
        />
      </div>
    );
  },
};
