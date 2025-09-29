'use client';

import { useState } from 'react';
import { ChatWidget } from '@cosmic-ui/ui';
import { Button } from '@cosmic-ui/ui';
import { MessageCircle, User, Bot } from 'lucide-react';

const CodeBlock = ({
  children,
  onCopy,
}: {
  children: string;
  onCopy: () => void;
}) => {
  return (
    <div className="relative">
      <pre className="bg-white dark:bg-black p-4 rounded-lg overflow-x-auto text-sm">
        <code>{children}</code>
      </pre>
      <button
        onClick={onCopy}
        className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
      </button>
    </div>
  );
};

export default function ChatWidgetPage() {
  const [showCode, setShowCode] = useState(false);
  const [showCodeVariants, setShowCodeVariants] = useState(false);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const [messages, setMessages] = useState([
    {
      id: '1',
      content: 'Bonjour ! Comment puis-je vous aider aujourd\'hui ?',
      sender: 'agent' as const,
      timestamp: new Date(Date.now() - 60000),
      type: 'text' as const,
      name: 'Support',
    },
    {
      id: '2',
      content: 'J\'ai un problème avec ma commande',
      sender: 'user' as const,
      timestamp: new Date(Date.now() - 30000),
      type: 'text' as const,
    },
    {
      id: '3',
      content: 'Je comprends. Pouvez-vous me donner le numéro de votre commande ?',
      sender: 'agent' as const,
      timestamp: new Date(Date.now() - 20000),
      type: 'text' as const,
      name: 'Support',
    },
    {
      id: '4',
      content: 'Bien sûr, c\'est #12345',
      sender: 'user' as const,
      timestamp: new Date(Date.now() - 10000),
      type: 'text' as const,
    },
  ]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStates(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCopiedStates(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

  const handleSendMessage = (content: string) => {
    const newMessage = {
      id: Date.now().toString(),
      content,
      sender: 'user' as const,
      timestamp: new Date(),
      type: 'text' as const,
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendFile = (file: File) => {
    const newMessage = {
      id: Date.now().toString(),
      content: `Fichier envoyé: ${file.name}`,
      sender: 'user' as const,
      timestamp: new Date(),
      type: 'file' as const,
      metadata: {
        fileName: file.name,
        fileSize: `${(file.size / 1024).toFixed(1)} KB`,
      },
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const agent = {
    id: 'support',
    name: 'Support',
    avatar: '/avatars/support.jpg',
    status: 'online' as const,
    role: 'Agent de support',
  };

  return (
    <div className="min-h-screen bg-cosmic-background text-cosmic-foreground">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button className="p-2 hover:bg-cosmic-border rounded-lg">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <h1 className="text-4xl font-bold">ChatWidget</h1>
          <button className="p-2 hover:bg-cosmic-border rounded-lg">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Summary */}
        <p className="text-lg text-cosmic-muted-foreground mb-8">
          Un composant de chat pour support client avec agent et messages
          multimédia.
        </p>

        {/* Main Preview */}
        <div className="mb-12">
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setShowCode(false)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                !showCode
                  ? 'bg-cosmic-primary text-white'
                  : 'bg-cosmic-border text-cosmic-foreground hover:bg-cosmic-border/80'
              }`}
            >
              Preview
            </button>
            <button
              onClick={() => setShowCode(true)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                showCode
                  ? 'bg-cosmic-primary text-white'
                  : 'bg-cosmic-border text-cosmic-foreground hover:bg-cosmic-border/80'
              }`}
            >
              Code
            </button>
          </div>

          <div className="bg-cosmic-card border border-cosmic-border rounded-lg p-2 min-h-[450px] w-[500px] flex justify-start">
            {!showCode ? (
              <div className="p-4 w-full">
                <ChatWidget
                  messages={messages}
                  agent={agent}
                  onSendMessage={handleSendMessage}
                  onSendFile={handleSendFile}
                  placeholder="Tapez votre message..."
                  maxHeight={350}
                  showTyping={true}
                  isTyping={false}
                  disabled={false}
                  showSenderName={true}
                  groupConsecutive={true}
                />
              </div>
            ) : (
              <div className="w-full">
                <CodeBlock
                  onCopy={() =>
                    handleCopy(
                      `import { ChatWidget } from '@cosmic-ui/ui';
import { useState } from 'react';

export function MyChatWidget() {
  const [messages, setMessages] = useState([
    {
      id: '1',
      content: 'Bonjour ! Comment puis-je vous aider ?',
      sender: 'agent',
      timestamp: new Date(),
      type: 'text',
      name: 'Support',
    },
  ]);

  const handleSendMessage = (content: string) => {
    const newMessage = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
      type: 'text',
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendFile = (file: File) => {
    const newMessage = {
      id: Date.now().toString(),
      content: \`Fichier envoyé: \${file.name}\`,
      sender: 'user',
      timestamp: new Date(),
      type: 'file',
      metadata: {
        fileName: file.name,
        fileSize: \`\${(file.size / 1024).toFixed(1)} KB\`,
      },
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const agent = {
    id: 'support',
    name: 'Support',
    avatar: '/avatars/support.jpg',
    status: 'online',
    role: 'Agent de support',
  };

  return (
    <ChatWidget
      messages={messages}
      agent={agent}
      onSendMessage={handleSendMessage}
      onSendFile={handleSendFile}
      placeholder="Tapez votre message..."
      maxHeight={350}
      showTyping={true}
      isTyping={false}
      disabled={false}
      showSenderName={true}
      groupConsecutive={true}
    />
  );
}`,
                      'main'
                    )
                  }
                >
                  {`import { ChatWidget } from '@cosmic-ui/ui';
import { useState } from 'react';

export function MyChatWidget() {
  const [messages, setMessages] = useState([
    {
      id: '1',
      content: 'Bonjour ! Comment puis-je vous aider ?',
      sender: 'agent',
      timestamp: new Date(),
      type: 'text',
      name: 'Support',
    },
  ]);

  const handleSendMessage = (content: string) => {
    const newMessage = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
      type: 'text',
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendFile = (file: File) => {
    const newMessage = {
      id: Date.now().toString(),
      content: \`Fichier envoyé: \${file.name}\`,
      sender: 'user',
      timestamp: new Date(),
      type: 'file',
      metadata: {
        fileName: file.name,
        fileSize: \`\${(file.size / 1024).toFixed(1)} KB\`,
      },
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const agent = {
    id: 'support',
    name: 'Support',
    avatar: '/avatars/support.jpg',
    status: 'online',
    role: 'Agent de support',
  };

  return (
    <ChatWidget
      messages={messages}
      agent={agent}
      onSendMessage={handleSendMessage}
      onSendFile={handleSendFile}
      placeholder="Tapez votre message..."
      maxHeight={350}
      showTyping={true}
      isTyping={false}
      disabled={false}
      showSenderName={true}
      groupConsecutive={true}
    />
  );
}`}
                </CodeBlock>
              </div>
            )}
          </div>
        </div>

        {/* Installation */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Installation</h2>
          <div className="bg-cosmic-card border border-cosmic-border rounded-lg p-4">
            <p className="text-cosmic-muted-foreground mb-4">
              Le composant ChatWidget est déjà inclus dans le package
              @cosmic-ui/ui.
            </p>
            <CodeBlock
              onCopy={() =>
                handleCopy(`npm install @cosmic-ui/ui`, 'install')
              }
            >
              {`npm install @cosmic-ui/ui`}
            </CodeBlock>
          </div>
        </div>

        {/* Usage */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Utilisation</h2>
          <div className="bg-cosmic-card border border-cosmic-border rounded-lg p-4">
            <p className="text-cosmic-muted-foreground mb-4">
              Utilisez le composant pour créer un chat de support client.
            </p>
            <CodeBlock
              onCopy={() =>
                handleCopy(
                  `import { ChatWidget } from '@cosmic-ui/ui';

const messages = [
  {
    id: '1',
    content: 'Bonjour !',
    sender: 'agent',
    timestamp: new Date(),
    type: 'text',
  },
];

const agent = {
  id: 'support',
  name: 'Support',
  status: 'online',
};

<ChatWidget
  messages={messages}
  agent={agent}
  onSendMessage={(content) => console.log(content)}
  placeholder="Tapez votre message..."
/>`,
                  'usage'
                )
              }
            >
              {`import { ChatWidget } from '@cosmic-ui/ui';

const messages = [
  {
    id: '1',
    content: 'Bonjour !',
    sender: 'agent',
    timestamp: new Date(),
    type: 'text',
  },
];

const agent = {
  id: 'support',
  name: 'Support',
  status: 'online',
};

<ChatWidget
  messages={messages}
  agent={agent}
  onSendMessage={(content) => console.log(content)}
  placeholder="Tapez votre message..."
/>`}
            </CodeBlock>
          </div>
        </div>

        {/* Variants */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Variantes</h2>

          {/* Variants Preview */}
          <div className="mb-8">
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setShowCodeVariants(false)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  !showCodeVariants
                    ? 'bg-cosmic-primary text-white'
                    : 'bg-cosmic-border text-cosmic-foreground hover:bg-cosmic-border/80'
                }`}
              >
                Preview
              </button>
              <button
                onClick={() => setShowCodeVariants(true)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  showCodeVariants
                    ? 'bg-cosmic-primary text-white'
                    : 'bg-cosmic-border text-cosmic-foreground hover:bg-cosmic-border/80'
                }`}
              >
                Code
              </button>
            </div>

            <div className="bg-cosmic-card border border-cosmic-border rounded-lg p-2 min-h-[450px] w-[500px] flex justify-start">
              {!showCodeVariants ? (
                <div className="p-4 w-full space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Agent hors ligne
                    </h3>
                    <ChatWidget
                      messages={messages.slice(0, 2)}
                      agent={{ ...agent, status: 'offline' }}
                      onSendMessage={handleSendMessage}
                      placeholder="Agent hors ligne"
                      maxHeight={200}
                      showTyping={false}
                      disabled={true}
                      showSenderName={false}
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      En cours de frappe
                    </h3>
                    <ChatWidget
                      messages={messages.slice(0, 2)}
                      agent={agent}
                      onSendMessage={handleSendMessage}
                      placeholder="Tapez votre message..."
                      maxHeight={200}
                      showTyping={true}
                      isTyping={true}
                      showSenderName={true}
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full">
                  <CodeBlock
                    onCopy={() =>
                      handleCopy(
                        `// Agent hors ligne
<ChatWidget
  messages={messages}
  agent={{ ...agent, status: 'offline' }}
  onSendMessage={handleSendMessage}
  placeholder="Agent hors ligne"
  disabled={true}
  showSenderName={false}
/>

// En cours de frappe
<ChatWidget
  messages={messages}
  agent={agent}
  onSendMessage={handleSendMessage}
  placeholder="Tapez votre message..."
  showTyping={true}
  isTyping={true}
  showSenderName={true}
/>

// Sans regroupement
<ChatWidget
  messages={messages}
  agent={agent}
  onSendMessage={handleSendMessage}
  groupConsecutive={false}
  showSenderName={true}
/>

// Avec fichiers
<ChatWidget
  messages={messages}
  agent={agent}
  onSendMessage={handleSendMessage}
  onSendFile={handleSendFile}
  placeholder="Tapez votre message ou envoyez un fichier..."
/>`,
                        'variants'
                      )
                    }
                  >
                    {`// Agent hors ligne
<ChatWidget
  messages={messages}
  agent={{ ...agent, status: 'offline' }}
  onSendMessage={handleSendMessage}
  placeholder="Agent hors ligne"
  disabled={true}
  showSenderName={false}
/>

// En cours de frappe
<ChatWidget
  messages={messages}
  agent={agent}
  onSendMessage={handleSendMessage}
  placeholder="Tapez votre message..."
  showTyping={true}
  isTyping={true}
  showSenderName={true}
/>

// Sans regroupement
<ChatWidget
  messages={messages}
  agent={agent}
  onSendMessage={handleSendMessage}
  groupConsecutive={false}
  showSenderName={true}
/>

// Avec fichiers
<ChatWidget
  messages={messages}
  agent={agent}
  onSendMessage={handleSendMessage}
  onSendFile={handleSendFile}
  placeholder="Tapez votre message ou envoyez un fichier..."
/>`}
                  </CodeBlock>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
