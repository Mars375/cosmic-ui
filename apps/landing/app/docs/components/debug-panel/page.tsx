'use client';

import { useState } from 'react';
import { DebugPanel } from '@cosmic-ui/components';
import { Button } from '@cosmic-ui/components';
import { Bug, Network, Activity, Trash2 } from 'lucide-react';

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

export default function DebugPanelPage() {
  const [showCode, setShowCode] = useState(false);
  const [showCodeVariants, setShowCodeVariants] = useState(false);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const [isOpen, setIsOpen] = useState(false);
  const [logs, setLogs] = useState([
    {
      id: '1',
      timestamp: new Date(Date.now() - 300000),
      level: 'info' as const,
      message: 'Application démarrée avec succès',
      source: 'App',
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 240000),
      level: 'warn' as const,
      message: 'Connexion lente détectée',
      source: 'Network',
    },
    {
      id: '3',
      timestamp: new Date(Date.now() - 180000),
      level: 'error' as const,
      message: 'Erreur de validation des données',
      source: 'Form',
      data: { field: 'email', value: 'invalid-email' },
    },
    {
      id: '4',
      timestamp: new Date(Date.now() - 120000),
      level: 'debug' as const,
      message: 'État du composant mis à jour',
      source: 'Component',
      data: { component: 'UserProfile', state: 'loading' },
    },
  ]);
  const [networkRequests, setNetworkRequests] = useState([
    {
      id: '1',
      url: '/api/users',
      method: 'GET',
      status: 200,
      statusText: 'OK',
      duration: 150,
      timestamp: new Date(Date.now() - 300000),
      responseData: { users: [] },
    },
    {
      id: '2',
      url: '/api/auth/login',
      method: 'POST',
      status: 401,
      statusText: 'Unauthorized',
      duration: 89,
      timestamp: new Date(Date.now() - 240000),
      requestData: { email: 'test@example.com' },
      error: 'Invalid credentials',
    },
    {
      id: '3',
      url: '/api/data',
      method: 'GET',
      status: 200,
      statusText: 'OK',
      duration: 234,
      timestamp: new Date(Date.now() - 180000),
      responseData: { data: 'success' },
    },
  ]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStates(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCopiedStates(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

  const handleClearLogs = () => {
    setLogs([]);
  };

  const handleClearNetwork = () => {
    setNetworkRequests([]);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const addLog = () => {
    const newLog = {
      id: Date.now().toString(),
      timestamp: new Date(),
      level: 'info' as const,
      message: 'Nouveau log ajouté',
      source: 'Debug',
    };
    setLogs(prev => [newLog, ...prev]);
  };

  const addNetworkRequest = () => {
    const newRequest = {
      id: Date.now().toString(),
      url: '/api/test',
      method: 'POST',
      status: 200,
      statusText: 'OK',
      duration: Math.floor(Math.random() * 200) + 50,
      timestamp: new Date(),
      responseData: { success: true },
    };
    setNetworkRequests(prev => [newRequest, ...prev]);
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
          <h1 className="text-4xl font-bold">Debug Panel</h1>
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
          Un panneau de débogage pour surveiller les logs, les requêtes réseau
          et les performances.
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

          <div className="bg-cosmic-card border border-cosmic-border rounded-lg p-2 h-[450px] w-[500px] flex justify-start">
            {!showCode ? (
              <div className="p-4 w-full">
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Button onClick={addLog} size="sm">
                      <Bug className="w-4 h-4" />
                      Ajouter Log
                    </Button>
                    <Button onClick={addNetworkRequest} size="sm">
                      <Network className="w-4 h-4" />
                      Ajouter Requête
                    </Button>
                  </div>
                  
                  <DebugPanel
                    logs={logs}
                    networkRequests={networkRequests}
                    onClearLogs={handleClearLogs}
                    onClearNetwork={handleClearNetwork}
                    isOpen={isOpen}
                    onToggle={handleToggle}
                    position="bottom"
                    maxHeight={300}
                    showNetwork={true}
                    showLogs={true}
                    showPerformance={true}
                  />
                </div>
              </div>
            ) : (
              <div className="w-full h-full">
                <CodeBlock
                  onCopy={() =>
                    handleCopy(
                      `import { DebugPanel } from '@cosmic-ui/components';
import { useState } from 'react';

export function MyDebugPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [logs, setLogs] = useState([
    {
      id: '1',
      timestamp: new Date(),
      level: 'info',
      message: 'Application démarrée avec succès',
      source: 'App',
    },
    {
      id: '2',
      timestamp: new Date(),
      level: 'warn',
      message: 'Connexion lente détectée',
      source: 'Network',
    },
    {
      id: '3',
      timestamp: new Date(),
      level: 'error',
      message: 'Erreur de validation des données',
      source: 'Form',
      data: { field: 'email', value: 'invalid-email' },
    },
  ]);

  const [networkRequests, setNetworkRequests] = useState([
    {
      id: '1',
      url: '/api/users',
      method: 'GET',
      status: 200,
      statusText: 'OK',
      duration: 150,
      timestamp: new Date(),
      responseData: { users: [] },
    },
    {
      id: '2',
      url: '/api/auth/login',
      method: 'POST',
      status: 401,
      statusText: 'Unauthorized',
      duration: 89,
      timestamp: new Date(),
      requestData: { email: 'test@example.com' },
      error: 'Invalid credentials',
    },
  ]);

  const handleClearLogs = () => {
    setLogs([]);
  };

  const handleClearNetwork = () => {
    setNetworkRequests([]);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <DebugPanel
      logs={logs}
      networkRequests={networkRequests}
      onClearLogs={handleClearLogs}
      onClearNetwork={handleClearNetwork}
      isOpen={isOpen}
      onToggle={handleToggle}
      position="bottom"
      maxHeight={300}
      showNetwork={true}
      showLogs={true}
      showPerformance={true}
    />
  );
}`,
                      'main'
                    )
                  }
                >
                  {`import { DebugPanel } from '@cosmic-ui/components';
import { useState } from 'react';

export function MyDebugPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [logs, setLogs] = useState([
    {
      id: '1',
      timestamp: new Date(),
      level: 'info',
      message: 'Application démarrée avec succès',
      source: 'App',
    },
    {
      id: '2',
      timestamp: new Date(),
      level: 'warn',
      message: 'Connexion lente détectée',
      source: 'Network',
    },
    {
      id: '3',
      timestamp: new Date(),
      level: 'error',
      message: 'Erreur de validation des données',
      source: 'Form',
      data: { field: 'email', value: 'invalid-email' },
    },
  ]);

  const [networkRequests, setNetworkRequests] = useState([
    {
      id: '1',
      url: '/api/users',
      method: 'GET',
      status: 200,
      statusText: 'OK',
      duration: 150,
      timestamp: new Date(),
      responseData: { users: [] },
    },
    {
      id: '2',
      url: '/api/auth/login',
      method: 'POST',
      status: 401,
      statusText: 'Unauthorized',
      duration: 89,
      timestamp: new Date(),
      requestData: { email: 'test@example.com' },
      error: 'Invalid credentials',
    },
  ]);

  const handleClearLogs = () => {
    setLogs([]);
  };

  const handleClearNetwork = () => {
    setNetworkRequests([]);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <DebugPanel
      logs={logs}
      networkRequests={networkRequests}
      onClearLogs={handleClearLogs}
      onClearNetwork={handleClearNetwork}
      isOpen={isOpen}
      onToggle={handleToggle}
      position="bottom"
      maxHeight={300}
      showNetwork={true}
      showLogs={true}
      showPerformance={true}
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
              Le composant DebugPanel est déjà inclus dans le package
              @cosmic-ui/components.
            </p>
            <CodeBlock
              onCopy={() =>
                handleCopy(`npm install @cosmic-ui/components`, 'install')
              }
            >
              {`npm install @cosmic-ui/components`}
            </CodeBlock>
          </div>
        </div>

        {/* Usage */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Utilisation</h2>
          <div className="bg-cosmic-card border border-cosmic-border rounded-lg p-4">
            <p className="text-cosmic-muted-foreground mb-4">
              Utilisez le composant pour créer un panneau de débogage.
            </p>
            <CodeBlock
              onCopy={() =>
                handleCopy(
                  `import { DebugPanel } from '@cosmic-ui/components';

const logs = [
  {
    id: '1',
    timestamp: new Date(),
    level: 'info',
    message: 'Application démarrée',
    source: 'App',
  },
];

const networkRequests = [
  {
    id: '1',
    url: '/api/users',
    method: 'GET',
    status: 200,
    duration: 150,
    timestamp: new Date(),
  },
];

<DebugPanel
  logs={logs}
  networkRequests={networkRequests}
  onClearLogs={() => setLogs([])}
  onClearNetwork={() => setNetworkRequests([])}
  isOpen={isOpen}
  onToggle={() => setIsOpen(!isOpen)}
/>`,
                  'usage'
                )
              }
            >
              {`import { DebugPanel } from '@cosmic-ui/components';

const logs = [
  {
    id: '1',
    timestamp: new Date(),
    level: 'info',
    message: 'Application démarrée',
    source: 'App',
  },
];

const networkRequests = [
  {
    id: '1',
    url: '/api/users',
    method: 'GET',
    status: 200,
    duration: 150,
    timestamp: new Date(),
  },
];

<DebugPanel
  logs={logs}
  networkRequests={networkRequests}
  onClearLogs={() => setLogs([])}
  onClearNetwork={() => setNetworkRequests([])}
  isOpen={isOpen}
  onToggle={() => setIsOpen(!isOpen)}
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

            <div className="bg-cosmic-card border border-cosmic-border rounded-lg p-2 h-[450px] w-[500px] flex justify-start">
              {!showCodeVariants ? (
                <div className="p-4 w-full space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Logs seulement
                    </h3>
                    <DebugPanel
                      logs={logs.slice(0, 2)}
                      networkRequests={[]}
                      onClearLogs={handleClearLogs}
                      onClearNetwork={handleClearNetwork}
                      isOpen={isOpen}
                      onToggle={handleToggle}
                      position="bottom"
                      maxHeight={200}
                      showNetwork={false}
                      showLogs={true}
                      showPerformance={false}
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Réseau seulement
                    </h3>
                    <DebugPanel
                      logs={[]}
                      networkRequests={networkRequests.slice(0, 2)}
                      onClearLogs={handleClearLogs}
                      onClearNetwork={handleClearNetwork}
                      isOpen={isOpen}
                      onToggle={handleToggle}
                      position="right"
                      maxHeight={200}
                      showNetwork={true}
                      showLogs={false}
                      showPerformance={false}
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full h-full">
                  <CodeBlock
                    onCopy={() =>
                      handleCopy(
                        `// Logs seulement
<DebugPanel
  logs={logs}
  networkRequests={[]}
  onClearLogs={handleClearLogs}
  onClearNetwork={handleClearNetwork}
  isOpen={isOpen}
  onToggle={handleToggle}
  showNetwork={false}
  showLogs={true}
  showPerformance={false}
/>

// Réseau seulement
<DebugPanel
  logs={[]}
  networkRequests={networkRequests}
  onClearLogs={handleClearLogs}
  onClearNetwork={handleClearNetwork}
  isOpen={isOpen}
  onToggle={handleToggle}
  showNetwork={true}
  showLogs={false}
  showPerformance={false}
/>

// Position à droite
<DebugPanel
  logs={logs}
  networkRequests={networkRequests}
  onClearLogs={handleClearLogs}
  onClearNetwork={handleClearNetwork}
  isOpen={isOpen}
  onToggle={handleToggle}
  position="right"
  maxHeight={400}
/>

// Hauteur personnalisée
<DebugPanel
  logs={logs}
  networkRequests={networkRequests}
  onClearLogs={handleClearLogs}
  onClearNetwork={handleClearNetwork}
  isOpen={isOpen}
  onToggle={handleToggle}
  maxHeight={500}
/>

// Performance seulement
<DebugPanel
  logs={[]}
  networkRequests={[]}
  onClearLogs={handleClearLogs}
  onClearNetwork={handleClearNetwork}
  isOpen={isOpen}
  onToggle={handleToggle}
  showNetwork={false}
  showLogs={false}
  showPerformance={true}
/>`,
                        'variants'
                      )
                    }
                  >
                    {`// Logs seulement
<DebugPanel
  logs={logs}
  networkRequests={[]}
  onClearLogs={handleClearLogs}
  onClearNetwork={handleClearNetwork}
  isOpen={isOpen}
  onToggle={handleToggle}
  showNetwork={false}
  showLogs={true}
  showPerformance={false}
/>

// Réseau seulement
<DebugPanel
  logs={[]}
  networkRequests={networkRequests}
  onClearLogs={handleClearLogs}
  onClearNetwork={handleClearNetwork}
  isOpen={isOpen}
  onToggle={handleToggle}
  showNetwork={true}
  showLogs={false}
  showPerformance={false}
/>

// Position à droite
<DebugPanel
  logs={logs}
  networkRequests={networkRequests}
  onClearLogs={handleClearLogs}
  onClearNetwork={handleClearNetwork}
  isOpen={isOpen}
  onToggle={handleToggle}
  position="right"
  maxHeight={400}
/>

// Hauteur personnalisée
<DebugPanel
  logs={logs}
  networkRequests={networkRequests}
  onClearLogs={handleClearLogs}
  onClearNetwork={handleClearNetwork}
  isOpen={isOpen}
  onToggle={handleToggle}
  maxHeight={500}
/>

// Performance seulement
<DebugPanel
  logs={[]}
  networkRequests={[]}
  onClearLogs={handleClearLogs}
  onClearNetwork={handleClearNetwork}
  isOpen={isOpen}
  onToggle={handleToggle}
  showNetwork={false}
  showLogs={false}
  showPerformance={true}
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
