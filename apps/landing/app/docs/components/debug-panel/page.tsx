'use client';

import * as React from 'react';
import { useState } from 'react';
import { CodeBlock } from '../../../components/code-block';
import { DebugPanel } from 'cosmic-ui-mars';
import { Button } from 'cosmic-ui-mars';
import { Bug, Network, Activity, Trash2 } from 'lucide-react';

export default function DebugPanelPage() {
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
      duration: 150,
      timestamp: new Date(Date.now() - 300000),
    },
    {
      id: '2',
      url: '/api/posts',
      method: 'POST',
      status: 201,
      duration: 200,
      timestamp: new Date(Date.now() - 240000),
    },
    {
      id: '3',
      url: '/api/auth/login',
      method: 'POST',
      status: 401,
      duration: 100,
      timestamp: new Date(Date.now() - 180000),
    },
  ]);

  const addLog = (level: 'info' | 'warn' | 'error' | 'debug', message: string, source: string) => {
    const newLog = {
      id: Date.now().toString(),
      timestamp: new Date(),
      level,
      message,
      source,
    };
    setLogs(prev => [newLog, ...prev]);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  const clearNetworkRequests = () => {
    setNetworkRequests([]);
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Bug className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">DebugPanel</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Panneau de débogage pour surveiller les logs, les requêtes réseau et les performances de l'application.
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
              <div className="space-y-4">
                <Button onClick={() => setIsOpen(true)}>
                  <Bug className="w-4 h-4 mr-2" />
                  Ouvrir le panneau de débogage
                </Button>
                <div className="space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => addLog('info', 'Nouveau log d\'information', 'Test')}
                  >
                    Ajouter log info
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => addLog('error', 'Erreur de test', 'Test')}
                  >
                    Ajouter log erreur
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4 text-foreground">Code</h3>
            <CodeBlock language="typescript" filePath="components/DebugPanelExample.tsx" showPackageManager={false}>
{`import { DebugPanel } from 'cosmic-ui-mars';
import { useState } from 'react';

const [isOpen, setIsOpen] = useState(false);
const [logs, setLogs] = useState([]);

const addLog = (level, message, source) => {
  const newLog = {
    id: Date.now().toString(),
    timestamp: new Date(),
    level,
    message,
    source,
  };
  setLogs(prev => [newLog, ...prev]);
};

<DebugPanel
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  logs={logs}
  onClearLogs={() => setLogs([])}
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
              <h3 className="text-lg font-medium text-foreground">Panneau avec requêtes réseau</h3>
              <p className="text-muted-foreground">Panneau affichant les requêtes réseau et leurs performances.</p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <Button onClick={() => setIsOpen(true)}>
                  <Network className="w-4 h-4 mr-2" />
                  Voir les requêtes réseau
                </Button>
              </div>
            </div>
            <div>
              <CodeBlock language="typescript" filePath="components/NetworkDebugPanel.tsx" showPackageManager={false}>
{`export default function App\docs\components\debugPanel\page.tsxExample() {
  <DebugPanel
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  logs={logs}
  networkRequests={networkRequests}
  onClearLogs={clearLogs}
  onClearNetworkRequests={clearNetworkRequests}
/>
}`}
              </CodeBlock>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Panneau avec métriques</h3>
              <p className="text-muted-foreground">Panneau affichant les métriques de performance.</p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <Button onClick={() => setIsOpen(true)}>
                  <Activity className="w-4 h-4 mr-2" />
                  Voir les métriques
                </Button>
              </div>
            </div>
            <div>
              <CodeBlock language="typescript" filePath="components/MetricsDebugPanel.tsx" showPackageManager={false}>
{`export default function App\docs\components\debugPanel\page.tsxExample() {
  <DebugPanel
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  logs={logs}
  metrics={{
    memory: 45.2,
    cpu: 12.8,
    network: 1.2
  }}
  onClearLogs={clearLogs}
/>
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
                <td className="border border-border px-4 py-3 font-mono text-sm">isOpen</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">boolean</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">false</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">État d'ouverture du panneau</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">onClose</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">() => void</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">-</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Callback appelé lors de la fermeture</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">logs</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Log[]</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">[]</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Liste des logs à afficher</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">networkRequests</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">NetworkRequest[]</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">[]</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Liste des requêtes réseau</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">onClearLogs</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">() => void</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">-</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Callback pour effacer les logs</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">onClearNetworkRequests</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">() => void</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">-</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Callback pour effacer les requêtes</td>
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
          <li>• Utilisez le <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">DebugPanel</code> uniquement en développement</li>
          <li>• Organisez les <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">logs</code> par niveau de priorité</li>
          <li>• Surveillez les <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">requêtes réseau</code> pour détecter les problèmes</li>
          <li>• Affichez les <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">métriques</code> de performance en temps réel</li>
          <li>• Implémentez des <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">filtres</code> pour faciliter le débogage</li>
        </ul>
      </div>

      {/* DebugPanel Component */}
      <DebugPanel
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        logs={logs}
        networkRequests={networkRequests}
        onClearLogs={clearLogs}
        onClearNetworkRequests={clearNetworkRequests}
      />
    </div>
  );
}