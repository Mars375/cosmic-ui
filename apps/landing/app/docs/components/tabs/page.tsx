'use client';

import { useState } from 'react';
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from '@cosmic-ui/components';

const CodeBlock = ({ children, onCopy }: { children: string; onCopy: () => void }) => {
  return (
    <div className="relative">
      <pre className="bg-white dark:bg-black p-2 rounded-lg overflow-x-auto text-sm">
        <code>{children}</code>
      </pre>
      <button
        onClick={onCopy}
        className="absolute top-2 right-2 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z" fill="currentColor"/>
        </svg>
      </button>
    </div>
  );
};

export default function TabsPage() {
  const [showCode, setShowCode] = useState(false);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStates(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCopiedStates(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-cosmic-background text-cosmic-foreground">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button className="p-2 hover:bg-cosmic-surface rounded-lg">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h1 className="text-3xl font-bold">Tabs</h1>
          <button className="p-2 hover:bg-cosmic-surface rounded-lg">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Summary */}
        <p className="text-lg text-cosmic-muted mb-8">
          Le composant Tabs organise le contenu en sections accessibles via des onglets, 
          permettant une navigation claire entre différents groupes d'informations.
        </p>

        {/* Main Preview */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-xl font-semibold">Aperçu</h2>
            <div className="flex bg-cosmic-surface rounded-lg p-1">
              <button
                onClick={() => setShowCode(false)}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  !showCode ? 'bg-cosmic-primary text-cosmic-primaryForeground' : 'text-cosmic-muted hover:text-cosmic-foreground'
                }`}
              >
                Aperçu
              </button>
              <button
                onClick={() => setShowCode(true)}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  showCode ? 'bg-cosmic-primary text-cosmic-primaryForeground' : 'text-cosmic-muted hover:text-cosmic-foreground'
                }`}
              >
                Code
              </button>
            </div>
          </div>

          <div className="w-[500px] h-[450px] border border-cosmic-border rounded-lg bg-cosmic-surface p-2 flex justify-start">
            {!showCode ? (
              <div className="p-4 w-full">
                <Tabs defaultValue="account" className="w-full">
                  <TabsList>
                    <TabsTrigger value="account">Compte</TabsTrigger>
                    <TabsTrigger value="password">Mot de passe</TabsTrigger>
                  </TabsList>
                  <TabsContent value="account" className="mt-4">
                    <p>Gérez les paramètres de votre compte.</p>
                  </TabsContent>
                  <TabsContent value="password" className="mt-4">
                    <p>Changez votre mot de passe.</p>
                  </TabsContent>
                </Tabs>
              </div>
            ) : (
              <div className="w-full h-full bg-white dark:bg-black p-2 rounded">
                <CodeBlock onCopy={() => copyToClipboard(`import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from '@cosmic-ui/components';

export default function MyComponent() {
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList>
        <TabsTrigger value="account">Compte</TabsTrigger>
        <TabsTrigger value="password">Mot de passe</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="mt-4">
        <p>Gérez les paramètres de votre compte.</p>
      </TabsContent>
      <TabsContent value="password" className="mt-4">
        <p>Changez votre mot de passe.</p>
      </TabsContent>
    </Tabs>
  );
}`, 'main')}>
{`import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from '@cosmic-ui/components';

export default function MyComponent() {
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList>
        <TabsTrigger value="account">Compte</TabsTrigger>
        <TabsTrigger value="password">Mot de passe</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="mt-4">
        <p>Gérez les paramètres de votre compte.</p>
      </TabsContent>
      <TabsContent value="password" className="mt-4">
        <p>Changez votre mot de passe.</p>
      </TabsContent>
    </Tabs>
  );
}`}
                </CodeBlock>
              </div>
            )}
          </div>
        </div>

        {/* Installation */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Installation</h2>
          <div className="bg-cosmic-surface p-4 rounded-lg">
            <CodeBlock onCopy={() => copyToClipboard('npm install @cosmic-ui/components', 'install')}>
{`npm install @cosmic-ui/components`}
            </CodeBlock>
          </div>
        </div>

        {/* Usage */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Utilisation</h2>
          <div className="bg-cosmic-surface p-4 rounded-lg">
            <CodeBlock onCopy={() => copyToClipboard(`import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from '@cosmic-ui/components';

export default function MyComponent() {
  return (
    <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">Onglet 1</TabsTrigger>
        <TabsTrigger value="tab2">Onglet 2</TabsTrigger>
        <TabsTrigger value="tab3">Onglet 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <p>Contenu de l'onglet 1</p>
      </TabsContent>
      <TabsContent value="tab2">
        <p>Contenu de l'onglet 2</p>
      </TabsContent>
      <TabsContent value="tab3">
        <p>Contenu de l'onglet 3</p>
      </TabsContent>
    </Tabs>
  );
}`, 'usage')}>
{`import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from '@cosmic-ui/components';

export default function MyComponent() {
  return (
    <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">Onglet 1</TabsTrigger>
        <TabsTrigger value="tab2">Onglet 2</TabsTrigger>
        <TabsTrigger value="tab3">Onglet 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <p>Contenu de l'onglet 1</p>
      </TabsContent>
      <TabsContent value="tab2">
        <p>Contenu de l'onglet 2</p>
      </TabsContent>
      <TabsContent value="tab3">
        <p>Contenu de l'onglet 3</p>
      </TabsContent>
    </Tabs>
  );
}`}
            </CodeBlock>
          </div>
        </div>

        {/* Variants */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-6">Variantes</h2>

          {/* Multiple Tabs */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <h3 className="text-lg font-medium">Plusieurs onglets</h3>
              <div className="flex bg-cosmic-surface rounded-lg p-1">
                <button
                  onClick={() => setShowCode(false)}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    !showCode ? 'bg-cosmic-primary text-cosmic-primaryForeground' : 'text-cosmic-muted hover:text-cosmic-foreground'
                  }`}
                >
                  Aperçu
                </button>
                <button
                  onClick={() => setShowCode(true)}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    showCode ? 'bg-cosmic-primary text-cosmic-primaryForeground' : 'text-cosmic-muted hover:text-cosmic-foreground'
                  }`}
                >
                  Code
                </button>
              </div>
            </div>

            <div className="w-[500px] h-[450px] border border-cosmic-border rounded-lg bg-cosmic-surface p-2 flex justify-start">
              {!showCode ? (
                <div className="p-4 w-full">
                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList>
                      <TabsTrigger value="overview">Aperçu</TabsTrigger>
                      <TabsTrigger value="analytics">Analytiques</TabsTrigger>
                      <TabsTrigger value="reports">Rapports</TabsTrigger>
                      <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview" className="mt-4">
                      <p>Vue d'ensemble de vos données.</p>
                    </TabsContent>
                    <TabsContent value="analytics" className="mt-4">
                      <p>Analyse détaillée des performances.</p>
                    </TabsContent>
                    <TabsContent value="reports" className="mt-4">
                      <p>Générez et consultez vos rapports.</p>
                    </TabsContent>
                    <TabsContent value="notifications" className="mt-4">
                      <p>Gérez vos préférences de notification.</p>
                    </TabsContent>
                  </Tabs>
                </div>
              ) : (
                <div className="w-full h-full bg-white dark:bg-black p-2 rounded">
                  <CodeBlock onCopy={() => copyToClipboard(`import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from '@cosmic-ui/components';

export default function MyComponent() {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList>
        <TabsTrigger value="overview">Aperçu</TabsTrigger>
        <TabsTrigger value="analytics">Analytiques</TabsTrigger>
        <TabsTrigger value="reports">Rapports</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="mt-4">
        <p>Vue d'ensemble de vos données.</p>
      </TabsContent>
      <TabsContent value="analytics" className="mt-4">
        <p>Analyse détaillée des performances.</p>
      </TabsContent>
      <TabsContent value="reports" className="mt-4">
        <p>Générez et consultez vos rapports.</p>
      </TabsContent>
      <TabsContent value="notifications" className="mt-4">
        <p>Gérez vos préférences de notification.</p>
      </TabsContent>
    </Tabs>
  );
}`, 'multiple')}>
{`import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from '@cosmic-ui/components';

export default function MyComponent() {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList>
        <TabsTrigger value="overview">Aperçu</TabsTrigger>
        <TabsTrigger value="analytics">Analytiques</TabsTrigger>
        <TabsTrigger value="reports">Rapports</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="mt-4">
        <p>Vue d'ensemble de vos données.</p>
      </TabsContent>
      <TabsContent value="analytics" className="mt-4">
        <p>Analyse détaillée des performances.</p>
      </TabsContent>
      <TabsContent value="reports" className="mt-4">
        <p>Générez et consultez vos rapports.</p>
      </TabsContent>
      <TabsContent value="notifications" className="mt-4">
        <p>Gérez vos préférences de notification.</p>
      </TabsContent>
    </Tabs>
  );
}`}
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
