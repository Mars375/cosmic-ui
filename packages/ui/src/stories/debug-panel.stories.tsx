import type { Meta, StoryObj } from '@storybook/react';
import { DebugPanel, useDebugPanel } from '../components/debug-panel';
import { Button } from '../components/button';
import { useState } from 'react';

const meta: Meta<typeof DebugPanel> = {
  title: 'Components/DebugPanel',
  component: DebugPanel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleLogs = [
  {
    id: '1',
    timestamp: new Date(Date.now() - 5 * 60000),
    level: 'info' as const,
    message: 'Application initialisée',
    source: 'app',
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 4 * 60000),
    level: 'warn' as const,
    message: "Configuration manquante pour l'API",
    source: 'config',
  },
  {
    id: '3',
    timestamp: new Date(Date.now() - 3 * 60000),
    level: 'error' as const,
    message: 'Erreur de connexion à la base de données',
    source: 'database',
    data: { error: 'Connection timeout', code: 'DB_TIMEOUT' },
  },
  {
    id: '4',
    timestamp: new Date(Date.now() - 2 * 60000),
    level: 'debug' as const,
    message: 'Requête API envoyée',
    source: 'api',
    data: { url: '/api/users', method: 'GET' },
  },
];

const sampleNetworkRequests = [
  {
    id: '1',
    url: 'https://api.exemple.com/users',
    method: 'GET',
    status: 200,
    statusText: 'OK',
    duration: 150,
    timestamp: new Date(Date.now() - 10 * 60000),
    responseData: { users: [{ id: 1, name: 'John' }] },
  },
  {
    id: '2',
    url: 'https://api.exemple.com/posts',
    method: 'POST',
    status: 201,
    statusText: 'Created',
    duration: 300,
    timestamp: new Date(Date.now() - 8 * 60000),
    requestData: { title: 'Nouveau post', content: 'Contenu...' },
    responseData: { id: 123, title: 'Nouveau post' },
  },
  {
    id: '3',
    url: 'https://api.exemple.com/upload',
    method: 'POST',
    status: 500,
    statusText: 'Internal Server Error',
    duration: 5000,
    timestamp: new Date(Date.now() - 5 * 60000),
    error: 'Server error',
  },
];

function DebugPanelDemo() {
  const {
    logs,
    networkRequests,
    isOpen,
    addLog,
    addNetworkRequest,
    clearLogs,
    clearNetwork,
    toggle,
  } = useDebugPanel();

  // Initialize with sample data
  React.useEffect(() => {
    if (logs.length === 0) {
      sampleLogs.forEach((log) => {
        addLog(log.level, log.message, log.data, log.source);
      });
    }
    if (networkRequests.length === 0) {
      sampleNetworkRequests.forEach((request) => {
        addNetworkRequest(request);
      });
    }
  }, [logs.length, networkRequests.length, addLog, addNetworkRequest]);

  const handleAddTestLog = () => {
    const levels = ['info', 'warn', 'error', 'debug'] as const;
    const randomLevel = levels[Math.floor(Math.random() * levels.length)];
    addLog(randomLevel, `Log de test - ${randomLevel}`, { timestamp: new Date() }, 'test');
  };

  const handleAddTestRequest = () => {
    const methods = ['GET', 'POST', 'PUT', 'DELETE'] as const;
    const randomMethod = methods[Math.floor(Math.random() * methods.length)];
    const statuses = [200, 201, 400, 404, 500] as const;
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

    addNetworkRequest({
      url: `https://api.exemple.com/test-${Date.now()}`,
      method: randomMethod,
      status: randomStatus,
      statusText: randomStatus === 200 ? 'OK' : 'Error',
      duration: Math.floor(Math.random() * 1000) + 100,
    });
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Debug Panel</h2>
        <p className="text-white/70">
          Panel de débogage pour surveiller les logs, requêtes réseau et performances
        </p>
      </div>

      <div className="flex space-x-4 mb-8">
        <Button onClick={handleAddTestLog}>Ajouter un log de test</Button>
        <Button onClick={handleAddTestRequest}>Ajouter une requête de test</Button>
        <Button onClick={() => console.log('Test console.log')}>Test console.log</Button>
        <Button onClick={() => console.warn('Test console.warn')}>Test console.warn</Button>
        <Button onClick={() => console.error('Test console.error')}>Test console.error</Button>
      </div>

      <DebugPanel
        logs={logs}
        networkRequests={networkRequests}
        onClearLogs={clearLogs}
        onClearNetwork={clearNetwork}
        isOpen={isOpen}
        onToggle={toggle}
        position="bottom"
        maxHeight={500}
      />
    </div>
  );
}

export const Default: Story = {
  render: () => <DebugPanelDemo />,
};

export const RightPosition: Story = {
  render: () => {
    const {
      logs,
      networkRequests,
      isOpen,
      addLog,
      addNetworkRequest,
      clearLogs,
      clearNetwork,
      toggle,
    } = useDebugPanel();

    // Initialize with sample data
    React.useEffect(() => {
      if (logs.length === 0) {
        sampleLogs.forEach((log) => {
          addLog(log.level, log.message, log.data, log.source);
        });
      }
      if (networkRequests.length === 0) {
        sampleNetworkRequests.forEach((request) => {
          addNetworkRequest(request);
        });
      }
    }, [logs.length, networkRequests.length, addLog, addNetworkRequest]);

    return (
      <div className="p-8">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-2">Position droite</h3>
          <p className="text-white/70 text-sm">Panel de débogage positionné à droite</p>
        </div>

        <DebugPanel
          logs={logs}
          networkRequests={networkRequests}
          onClearLogs={clearLogs}
          onClearNetwork={clearNetwork}
          isOpen={isOpen}
          onToggle={toggle}
          position="right"
          maxHeight={400}
        />
      </div>
    );
  },
};

export const LogsOnly: Story = {
  render: () => {
    const { logs, networkRequests, isOpen, addLog, clearLogs, toggle } = useDebugPanel();

    // Initialize with sample data
    React.useEffect(() => {
      if (logs.length === 0) {
        sampleLogs.forEach((log) => {
          addLog(log.level, log.message, log.data, log.source);
        });
      }
    }, [logs.length, addLog]);

    return (
      <div className="p-8">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-2">Logs uniquement</h3>
          <p className="text-white/70 text-sm">Panel de débogage affichant seulement les logs</p>
        </div>

        <DebugPanel
          logs={logs}
          networkRequests={networkRequests}
          onClearLogs={clearLogs}
          onClearNetwork={() => {}}
          isOpen={isOpen}
          onToggle={toggle}
          position="bottom"
          showNetwork={false}
          showPerformance={false}
        />
      </div>
    );
  },
};

export const NetworkOnly: Story = {
  render: () => {
    const { logs, networkRequests, isOpen, addNetworkRequest, clearNetwork, toggle } =
      useDebugPanel();

    // Initialize with sample data
    React.useEffect(() => {
      if (networkRequests.length === 0) {
        sampleNetworkRequests.forEach((request) => {
          addNetworkRequest(request);
        });
      }
    }, [networkRequests.length, addNetworkRequest]);

    return (
      <div className="p-8">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-2">Réseau uniquement</h3>
          <p className="text-white/70 text-sm">
            Panel de débogage affichant seulement les requêtes réseau
          </p>
        </div>

        <DebugPanel
          logs={logs}
          networkRequests={networkRequests}
          onClearLogs={() => {}}
          onClearNetwork={clearNetwork}
          isOpen={isOpen}
          onToggle={toggle}
          position="bottom"
          showLogs={false}
          showPerformance={false}
        />
      </div>
    );
  },
};

export const PerformanceOnly: Story = {
  render: () => {
    const { logs, networkRequests, isOpen, toggle } = useDebugPanel();

    return (
      <div className="p-8">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-2">Performance uniquement</h3>
          <p className="text-white/70 text-sm">
            Panel de débogage affichant seulement les métriques de performance
          </p>
        </div>

        <DebugPanel
          logs={logs}
          networkRequests={networkRequests}
          onClearLogs={() => {}}
          onClearNetwork={() => {}}
          isOpen={isOpen}
          onToggle={toggle}
          position="bottom"
          showLogs={false}
          showNetwork={false}
        />
      </div>
    );
  },
};
