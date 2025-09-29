'use client';

import { useState } from 'react';
import { AIAssistant } from '@cosmic-ui/ui';
import { Button } from '@cosmic-ui/ui';
import { Bot, User, Code, Lightbulb } from 'lucide-react';

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

export default function AIAssistantPage() {
  const [showCode, setShowCode] = useState(false);
  const [showCodeVariants, setShowCodeVariants] = useState(false);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const [messages, setMessages] = useState([
    {
      id: '1',
      content: 'Bonjour ! Je suis votre assistant IA. Comment puis-je vous aider aujourd\'hui ?',
      sender: 'ai' as const,
      timestamp: new Date(Date.now() - 60000),
      type: 'text' as const,
    },
    {
      id: '2',
      content: 'Pouvez-vous m\'expliquer comment utiliser React ?',
      sender: 'user' as const,
      timestamp: new Date(Date.now() - 30000),
      type: 'text' as const,
    },
    {
      id: '3',
      content: 'Bien sûr ! React est une bibliothèque JavaScript pour créer des interfaces utilisateur. Voici un exemple basique :',
      sender: 'ai' as const,
      timestamp: new Date(Date.now() - 20000),
      type: 'text' as const,
    },
    {
      id: '4',
      content: 'function App() {\n  return (\n    <div>\n      <h1>Hello World!</h1>\n    </div>\n  );\n}',
      sender: 'ai' as const,
      timestamp: new Date(Date.now() - 10000),
      type: 'code' as const,
      code: {
        language: 'jsx',
        content: 'function App() {\n  return (\n    <div>\n      <h1>Hello World!</h1>\n    </div>\n  );\n}',
      },
    },
  ]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStates(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCopiedStates(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

  const handleSendMessage = (message: string) => {
    const newMessage = {
      id: Date.now().toString(),
      content: message,
      sender: 'user' as const,
      timestamp: new Date(),
      type: 'text' as const,
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const suggestions = [
    'Explique-moi les hooks React',
    'Comment créer un composant ?',
    'Qu\'est-ce que le state ?',
    'Montre-moi un exemple de useEffect',
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
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
          <h1 className="text-4xl font-bold">AIAssistant</h1>
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
        <p className="text-lg text-gray-600 dark:text-gray-400-foreground mb-8">
          Un composant d'assistant IA avec chat, suggestions et support de code.
        </p>

        {/* Main Preview */}
        <div className="mb-12">
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setShowCode(false)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                !showCode
                  ? 'bg-cosmic-primary text-white'
                  : 'bg-cosmic-border text-gray-900 dark:text-white hover:bg-cosmic-border/80'
              }`}
            >
              Preview
            </button>
            <button
              onClick={() => setShowCode(true)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                showCode
                  ? 'bg-cosmic-primary text-white'
                  : 'bg-cosmic-border text-gray-900 dark:text-white hover:bg-cosmic-border/80'
              }`}
            >
              Code
            </button>
          </div>

          <div className="bg-cosmic-card border border-gray-200 dark:border-gray-700 rounded-lg p-2 min-h-[450px] w-[500px] flex justify-start">
            {!showCode ? (
              <div className="p-4 w-full">
                <AIAssistant
                  messages={messages}
                  onSendMessage={handleSendMessage}
                  onSuggestionClick={handleSuggestionClick}
                  placeholder="Posez votre question à l'IA..."
                  isTyping={false}
                  disabled={false}
                  maxHeight={350}
                  showSuggestions={true}
                  suggestions={suggestions}
                />
              </div>
            ) : (
              <div className="w-full">
                <CodeBlock
                  onCopy={() =>
                    handleCopy(
                      `import { AIAssistant } from '@cosmic-ui/ui';
import { useState } from 'react';

export function MyAIAssistant() {
  const [messages, setMessages] = useState([
    {
      id: '1',
      content: 'Bonjour ! Je suis votre assistant IA.',
      sender: 'ai',
      timestamp: new Date(),
      type: 'text',
    },
  ]);

  const handleSendMessage = (message: string) => {
    const newMessage = {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date(),
      type: 'text',
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const suggestions = [
    'Explique-moi les hooks React',
    'Comment créer un composant ?',
    'Qu\\'est-ce que le state ?',
    'Montre-moi un exemple de useEffect',
  ];

  return (
    <AIAssistant
      messages={messages}
      onSendMessage={handleSendMessage}
      onSuggestionClick={handleSuggestionClick}
      placeholder="Posez votre question à l'IA..."
      isTyping={false}
      disabled={false}
      maxHeight={350}
      showSuggestions={true}
      suggestions={suggestions}
    />
  );
}`,
                      'main'
                    )
                  }
                >
                  {`import { AIAssistant } from '@cosmic-ui/ui';
import { useState } from 'react';

export function MyAIAssistant() {
  const [messages, setMessages] = useState([
    {
      id: '1',
      content: 'Bonjour ! Je suis votre assistant IA.',
      sender: 'ai',
      timestamp: new Date(),
      type: 'text',
    },
  ]);

  const handleSendMessage = (message: string) => {
    const newMessage = {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date(),
      type: 'text',
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const suggestions = [
    'Explique-moi les hooks React',
    'Comment créer un composant ?',
    'Qu\\'est-ce que le state ?',
    'Montre-moi un exemple de useEffect',
  ];

  return (
    <AIAssistant
      messages={messages}
      onSendMessage={handleSendMessage}
      onSuggestionClick={handleSuggestionClick}
      placeholder="Posez votre question à l'IA..."
      isTyping={false}
      disabled={false}
      maxHeight={350}
      showSuggestions={true}
      suggestions={suggestions}
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
          <div className="bg-cosmic-card border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <p className="text-gray-600 dark:text-gray-400-foreground mb-4">
              Le composant AIAssistant est déjà inclus dans le package
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
          <div className="bg-cosmic-card border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <p className="text-gray-600 dark:text-gray-400-foreground mb-4">
              Utilisez le composant pour créer un assistant IA interactif.
            </p>
            <CodeBlock
              onCopy={() =>
                handleCopy(
                  `import { AIAssistant } from '@cosmic-ui/ui';

const messages = [
  {
    id: '1',
    content: 'Bonjour !',
    sender: 'ai',
    timestamp: new Date(),
    type: 'text',
  },
];

<AIAssistant
  messages={messages}
  onSendMessage={(message) => console.log(message)}
  placeholder="Posez votre question..."
  showSuggestions={true}
  suggestions={['Question 1', 'Question 2']}
/>`,
                  'usage'
                )
              }
            >
              {`import { AIAssistant } from '@cosmic-ui/ui';

const messages = [
  {
    id: '1',
    content: 'Bonjour !',
    sender: 'ai',
    timestamp: new Date(),
    type: 'text',
  },
];

<AIAssistant
  messages={messages}
  onSendMessage={(message) => console.log(message)}
  placeholder="Posez votre question..."
  showSuggestions={true}
  suggestions={['Question 1', 'Question 2']}
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
                    : 'bg-cosmic-border text-gray-900 dark:text-white hover:bg-cosmic-border/80'
                }`}
              >
                Preview
              </button>
              <button
                onClick={() => setShowCodeVariants(true)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  showCodeVariants
                    ? 'bg-cosmic-primary text-white'
                    : 'bg-cosmic-border text-gray-900 dark:text-white hover:bg-cosmic-border/80'
                }`}
              >
                Code
              </button>
            </div>

            <div className="bg-cosmic-card border border-gray-200 dark:border-gray-700 rounded-lg p-2 min-h-[450px] w-[500px] flex justify-start">
              {!showCodeVariants ? (
                <div className="p-4 w-full space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Sans suggestions
                    </h3>
                    <AIAssistant
                      messages={messages.slice(0, 2)}
                      onSendMessage={handleSendMessage}
                      placeholder="Tapez votre message..."
                      showSuggestions={false}
                      maxHeight={200}
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      En cours de frappe
                    </h3>
                    <AIAssistant
                      messages={messages.slice(0, 2)}
                      onSendMessage={handleSendMessage}
                      placeholder="Tapez votre message..."
                      isTyping={true}
                      showSuggestions={false}
                      maxHeight={200}
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full">
                  <CodeBlock
                    onCopy={() =>
                      handleCopy(
                        `// Sans suggestions
<AIAssistant
  messages={messages}
  onSendMessage={handleSendMessage}
  placeholder="Tapez votre message..."
  showSuggestions={false}
  maxHeight={300}
/>

// En cours de frappe
<AIAssistant
  messages={messages}
  onSendMessage={handleSendMessage}
  placeholder="Tapez votre message..."
  isTyping={true}
  showSuggestions={false}
  maxHeight={300}
/>

// Désactivé
<AIAssistant
  messages={messages}
  onSendMessage={handleSendMessage}
  placeholder="Assistant indisponible"
  disabled={true}
  showSuggestions={false}
  maxHeight={300}
/>

// Avec code
const messageWithCode = {
  id: '1',
  content: 'Voici un exemple de code :',
  sender: 'ai',
  timestamp: new Date(),
  type: 'code',
  code: {
    language: 'javascript',
    content: 'console.log("Hello World!");',
  },
};`,
                        'variants'
                      )
                    }
                  >
                    {`// Sans suggestions
<AIAssistant
  messages={messages}
  onSendMessage={handleSendMessage}
  placeholder="Tapez votre message..."
  showSuggestions={false}
  maxHeight={300}
/>

// En cours de frappe
<AIAssistant
  messages={messages}
  onSendMessage={handleSendMessage}
  placeholder="Tapez votre message..."
  isTyping={true}
  showSuggestions={false}
  maxHeight={300}
/>

// Désactivé
<AIAssistant
  messages={messages}
  onSendMessage={handleSendMessage}
  placeholder="Assistant indisponible"
  disabled={true}
  showSuggestions={false}
  maxHeight={300}
/>

// Avec code
const messageWithCode = {
  id: '1',
  content: 'Voici un exemple de code :',
  sender: 'ai',
  timestamp: new Date(),
  type: 'code',
  code: {
    language: 'javascript',
    content: 'console.log("Hello World!");',
  },
};`}
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
