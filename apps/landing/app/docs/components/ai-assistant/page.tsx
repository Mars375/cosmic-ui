'use client';

import React, { useState } from 'react';
import { CodeBlock } from '../../../components/code-block';
import { AIAssistant } from 'cosmic-ui-mars';
import { Button } from 'cosmic-ui-mars';
import { Bot, User, Code, Lightbulb } from 'lucide-react';

export default function AIAssistantPage() {
  const [showCode, setShowCode] = useState(false);
  const [showCodeVariants, setShowCodeVariants] = useState(false);
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
    <div className="container max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Bot className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">AIAssistant</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Un composant d'assistant IA avec chat, suggestions et support de code.
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
                className="relative !static !bottom-auto !left-auto !w-full"
              />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4 text-foreground">Code</h3>
            <CodeBlock language="typescript" filePath="components/AIAssistantExample.tsx" showPackageManager={false}>
              {`import { AIAssistant } from 'cosmic-ui-mars';
import * as React from 'react';
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
      className="relative !static !bottom-auto !left-auto !w-full"
    />
  );
}`}
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
              <h3 className="text-lg font-medium text-foreground">Sans suggestions</h3>
              <p className="text-muted-foreground">Assistant sans suggestions de questions.</p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <AIAssistant
                  messages={messages.slice(0, 2)}
                  onSendMessage={handleSendMessage}
                  placeholder="Tapez votre message..."
                  showSuggestions={false}
                  maxHeight={200}
                  className="relative !static !bottom-auto !left-auto !w-full"
                />
              </div>
            </div>
            <div>
              <CodeBlock language="typescript" filePath="components/AIAssistantNoSuggestions.tsx" showPackageManager={false}>
                {`export default function App\docs\components\aiAssistant\page.tsxExample() {
  return <AIAssistant
  messages={messages}
  onSendMessage={handleSendMessage}
  placeholder="Tapez votre message..."
  showSuggestions={false}
  maxHeight={300}
/>;
}`}
              </CodeBlock>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">En cours de frappe</h3>
              <p className="text-muted-foreground">Assistant avec indicateur de frappe.</p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <AIAssistant
                  messages={messages.slice(0, 2)}
                  onSendMessage={handleSendMessage}
                  placeholder="Tapez votre message..."
                  isTyping={true}
                  showSuggestions={false}
                  maxHeight={200}
                  className="relative !static !bottom-auto !left-auto !w-full"
                />
              </div>
            </div>
            <div>
              <CodeBlock language="typescript" filePath="components/AIAssistantTyping.tsx" showPackageManager={false}>
                {`export default function App\docs\components\aiAssistant\page.tsxExample() {
  return <AIAssistant
  messages={messages}
  onSendMessage={handleSendMessage}
  placeholder="Tapez votre message..."
  isTyping={true}
  showSuggestions={false}
  maxHeight={300}
/>;
}`}
              </CodeBlock>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Désactivé</h3>
              <p className="text-muted-foreground">Assistant en mode désactivé.</p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <AIAssistant
                  messages={messages.slice(0, 2)}
                  onSendMessage={handleSendMessage}
                  placeholder="Assistant indisponible"
                  disabled={true}
                  showSuggestions={false}
                  maxHeight={200}
                  className="relative !static !bottom-auto !left-auto !w-full"
                />
              </div>
            </div>
            <div>
              <CodeBlock language="typescript" filePath="components/AIAssistantDisabled.tsx" showPackageManager={false}>
                {`export default function App\docs\components\aiAssistant\page.tsxExample() {
  return <AIAssistant
  messages={messages}
  onSendMessage={handleSendMessage}
  placeholder="Assistant indisponible"
  disabled={true}
  showSuggestions={false}
  maxHeight={300}
/>;
}`}
              </CodeBlock>
            </div>
          </div>
        </div>
      </div>

      {/* API Reference */}
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
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">-</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Liste des messages du chat</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">onSendMessage</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">(message: string) => void</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">-</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Callback appelé lors de l'envoi d'un message</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">placeholder</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">string</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">"Tapez votre message..."</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Placeholder du champ de saisie</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">isTyping</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">boolean</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">false</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Affiche l'indicateur de frappe</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">disabled</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">boolean</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">false</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Désactive l'assistant</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">showSuggestions</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">boolean</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">true</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Affiche les suggestions</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">suggestions</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">string[]</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">[]</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Liste des suggestions</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">maxHeight</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">number</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">400</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Hauteur maximale du chat</td>
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
          <li>• Par défaut, le composant utilise un <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">positionnement fixe</code> (widget flottant)</li>
          <li>• Pour l'intégrer dans une page, utilisez <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">className="relative !static !w-full"</code></li>
          <li>• Utilisez des messages structurés avec <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">type</code> et <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">sender</code></li>
          <li>• Le type <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">code</code> permet d'afficher du code avec coloration syntaxique</li>
          <li>• Les suggestions améliorent l'expérience utilisateur</li>
          <li>• Utilisez <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">isTyping</code> pour indiquer une réponse en cours</li>
          <li>• Respectez les <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">guidelines d'accessibilité</code> pour les chats</li>
        </ul>
      </div>
    </div>
  );
}