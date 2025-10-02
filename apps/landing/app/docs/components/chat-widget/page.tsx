'use client';

import * as React from 'react';
import { useState } from 'react';
import { CodeBlock } from '../../../components/code-block';
import { ChatWidget } from 'cosmic-ui-mars';
import { Button } from 'cosmic-ui-mars';
import { MessageCircle, User, Bot } from 'lucide-react';

export default function ChatWidgetPage() {
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
      name: 'Vous',
    },
    {
      id: '3',
      content: 'Je vais vous aider avec votre commande. Pouvez-vous me donner le numéro de commande ?',
      sender: 'agent' as const,
      timestamp: new Date(),
      type: 'text' as const,
      name: 'Support',
    },
  ]);

  const handleSendMessage = (message: string) => {
    const newMessage = {
      id: Date.now().toString(),
      content: message,
      sender: 'user' as const,
      timestamp: new Date(),
      type: 'text' as const,
      name: 'Vous',
    };
    setMessages(prev => [...prev, newMessage]);
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <MessageCircle className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">ChatWidget</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Widget de chat pour le support client et l'assistance en temps réel.
        </p>
      </div>

      {/* Installation */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Installation</h2>
        <CodeBlock filePath="package.json">pnpm add cosmic-ui-mars</CodeBlock>
      </div>

      {/* Usage basique */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Usage basique</h2>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Exemple</h3>
            <div className="p-6 bg-muted/30 rounded-lg border">
              <div className="h-96">
                <ChatWidget
                  messages={messages}
                  onSendMessage={handleSendMessage}
                  placeholder="Tapez votre message..."
                  title="Support Client"
                />
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4 text-foreground">Code</h3>
            <CodeBlock language="typescript" filePath="components/ChatWidgetExample.tsx" showPackageManager={false}>
{`import { ChatWidget } from 'cosmic-ui-mars';
import { useState } from 'react';

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

const handleSendMessage = (message: string) => {
  const newMessage = {
    id: Date.now().toString(),
    content: message,
    sender: 'user',
    timestamp: new Date(),
    type: 'text',
    name: 'Vous',
  };
  setMessages(prev => [...prev, newMessage]);
};

<ChatWidget
  messages={messages}
  onSendMessage={handleSendMessage}
  placeholder="Tapez votre message..."
  title="Support Client"
/>`}
            </CodeBlock>
          </div>
        </div>
      </div>

      {/* Variants */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Variants</h2>
        <div className="space-y-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Chat compact</h3>
              <p className="text-muted-foreground">Version compacte du widget de chat.</p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <div className="h-64">
                  <ChatWidget
                    messages={messages.slice(0, 2)}
                    onSendMessage={handleSendMessage}
                    placeholder="Message..."
                    title="Chat"
                    compact
                  />
                </div>
              </div>
            </div>
            <div>
              <CodeBlock language="typescript" filePath="components/CompactChatWidget.tsx" showPackageManager={false}>
{`export default function App\docs\components\chatWidget\page.tsxExample() {
  return <ChatWidget
  messages={messages}
  onSendMessage={handleSendMessage}
  placeholder="Message..."
  title="Chat"
  compact
/>;
}`}
              </CodeBlock>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Chat avec statut</h3>
              <p className="text-muted-foreground">Widget avec indicateur de statut de l'agent.</p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <div className="h-64">
                  <ChatWidget
                    messages={messages}
                    onSendMessage={handleSendMessage}
                    placeholder="Tapez votre message..."
                    title="Support Client"
                    agentStatus="online"
                    agentName="Marie Dubois"
                  />
                </div>
              </div>
            </div>
            <div>
              <CodeBlock language="typescript" filePath="components/ChatWidgetWithStatus.tsx" showPackageManager={false}>
{`export default function App\docs\components\chatWidget\page.tsxExample() {
  return <ChatWidget
  messages={messages}
  onSendMessage={handleSendMessage}
  placeholder="Tapez votre message..."
  title="Support Client"
  agentStatus="online"
  agentName="Marie Dubois"
/>;
}`}
              </CodeBlock>
            </div>
          </div>
        </div>
      </div>

      {/* Référence API */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Référence API</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-border rounded-lg">
            <thead>
              <tr className="bg-muted/50">
                <th className="border border-border px-4 py-3 text-left font-medium text-foreground">Prop</th>
                <th className="border border-border px-4 py-3 text-left font-medium text-foreground">Type</th>
                <th className="border border-border px-4 py-3 text-left font-medium text-foreground">Défaut</th>
                <th className="border border-border px-4 py-3 text-left font-medium text-foreground">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">messages</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Message[]</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">[]</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Liste des messages du chat</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">onSendMessage</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">(message: string) => void</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">-</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Callback appelé lors de l'envoi d'un message</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">title</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">string</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">'Chat'</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Titre du widget</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">placeholder</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">string</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">'Tapez votre message...'</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Placeholder du champ de saisie</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">compact</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">boolean</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">false</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Mode compact du widget</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">agentStatus</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">'online' | 'offline' | 'away'</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">'online'</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Statut de l'agent</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">agentName</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">string</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">-</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Nom de l'agent</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Conseils d'utilisation */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <h3 className="text-blue-800 dark:text-blue-200 font-semibold mb-2">
          💡 Conseils d'utilisation
        </h3>
        <ul className="text-blue-700 dark:text-blue-300 space-y-1 text-sm">
          <li>• Utilisez le mode <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">compact</code> pour les espaces restreints</li>
          <li>• Affichez le <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">statut</code> de l'agent pour informer les utilisateurs</li>
          <li>• Gérez l'état des messages avec <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">useState</code></li>
          <li>• Intégrez avec votre système de support client</li>
          <li>• Respectez les <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">guidelines d'accessibilité</code></li>
        </ul>
      </div>
    </div>
  );
}