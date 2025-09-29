'use client';

import * as React from 'react';
import { twMerge } from 'tailwind-merge';
import { Button } from './button';
import { Badge } from './badge';
import { Card, CardContent, CardHeader, CardTitle } from './card';

export interface LogEntry {
  id: string;
  timestamp: Date;
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  data?: any;
  source?: string;
}

export interface NetworkRequest {
  id: string;
  url: string;
  method: string;
  status?: number;
  statusText?: string;
  duration?: number;
  timestamp: Date;
  requestData?: any;
  responseData?: any;
  error?: string;
}

export interface DebugPanelProps {
  logs: LogEntry[];
  networkRequests: NetworkRequest[];
  onClearLogs: () => void;
  onClearNetwork: () => void;
  className?: string;
  isOpen: boolean;
  onToggle: () => void;
  position?: 'bottom' | 'right';
  maxHeight?: number;
  showNetwork?: boolean;
  showLogs?: boolean;
  showPerformance?: boolean;
}

export function DebugPanel({
  logs,
  networkRequests,
  onClearLogs,
  onClearNetwork,
  className,
  isOpen,
  onToggle,
  position = 'bottom',
  maxHeight = 400,
  showNetwork = true,
  showLogs = true,
  showPerformance = true,
}: DebugPanelProps) {
  const [activeTab, setActiveTab] = React.useState<'logs' | 'network' | 'performance'>('logs');
  const [filter, setFilter] = React.useState<string>('');
  const [logLevel, setLogLevel] = React.useState<string>('all');

  const filteredLogs = logs.filter((log) => {
    const matchesFilter = !filter || log.message.toLowerCase().includes(filter.toLowerCase());
    const matchesLevel = logLevel === 'all' || log.level === logLevel;
    return matchesFilter && matchesLevel;
  });

  const getLevelColor = (level: LogEntry['level']) => {
    switch (level) {
      case 'error':
        return 'bg-red-500/20 text-red-400';
      case 'warn':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'info':
        return 'bg-blue-500/20 text-blue-400';
      case 'debug':
        return 'bg-gray-500/20 text-gray-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusColor = (status?: number) => {
    if (!status) return 'bg-gray-500/20 text-gray-400';
    if (status >= 200 && status < 300) return 'bg-green-500/20 text-green-400';
    if (status >= 300 && status < 400) return 'bg-yellow-500/20 text-yellow-400';
    if (status >= 400) return 'bg-red-500/20 text-red-400';
    return 'bg-gray-500/20 text-gray-400';
  };

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      fractionalSecondDigits: 3,
    });
  };

  const formatDuration = (duration?: number) => {
    if (!duration) return 'N/A';
    return `${duration}ms`;
  };

  if (!isOpen) {
    return (
      <Button
        onClick={onToggle}
        className={twMerge(
          'fixed z-50',
          position === 'bottom' ? 'bottom-4 right-4' : 'top-4 right-4',
          className,
        )}
        variant="outline"
        size="sm"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        Debug
      </Button>
    );
  }

  return (
    <div
      className={twMerge(
        'fixed z-50 bg-cosmic-surface border border-cosmic-border rounded-lg shadow-xl',
        position === 'bottom' ? 'bottom-4 right-4 w-96' : 'top-4 right-4 w-80',
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-cosmic-border">
        <div className="flex items-center space-x-2">
          <h3 className="font-semibold text-white">Debug Panel</h3>
          <Badge variant="secondary" className="text-xs">
            {logs.length + networkRequests.length}
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="text-white/70 hover:text-white"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-cosmic-border">
        {showLogs && (
          <button
            onClick={() => setActiveTab('logs')}
            className={twMerge(
              'flex-1 px-4 py-2 text-sm font-medium transition-colors',
              activeTab === 'logs'
                ? 'text-white border-b-2 border-cosmic-primary bg-cosmic-surface/50'
                : 'text-white/70 hover:text-white hover:bg-cosmic-border/30',
            )}
          >
            Logs ({logs.length})
          </button>
        )}
        {showNetwork && (
          <button
            onClick={() => setActiveTab('network')}
            className={twMerge(
              'flex-1 px-4 py-2 text-sm font-medium transition-colors',
              activeTab === 'network'
                ? 'text-white border-b-2 border-cosmic-primary bg-cosmic-surface/50'
                : 'text-white/70 hover:text-white hover:bg-cosmic-border/30',
            )}
          >
            Network ({networkRequests.length})
          </button>
        )}
        {showPerformance && (
          <button
            onClick={() => setActiveTab('performance')}
            className={twMerge(
              'flex-1 px-4 py-2 text-sm font-medium transition-colors',
              activeTab === 'performance'
                ? 'text-white border-b-2 border-cosmic-primary bg-cosmic-surface/50'
                : 'text-white/70 hover:text-white hover:bg-cosmic-border/30',
            )}
          >
            Performance
          </button>
        )}
      </div>

      {/* Content */}
      <div className="overflow-y-auto" style={{ maxHeight: `${maxHeight}px` }}>
        {activeTab === 'logs' && (
          <div className="p-4 space-y-4">
            {/* Filters */}
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Filtrer les logs..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full px-3 py-2 bg-cosmic-border border border-cosmic-border rounded-md text-white placeholder-white/50 text-sm"
              />
              <select
                value={logLevel}
                onChange={(e) => setLogLevel(e.target.value)}
                className="w-full px-3 py-2 bg-cosmic-border border border-cosmic-border rounded-md text-white text-sm"
              >
                <option value="all">Tous les niveaux</option>
                <option value="error">Erreurs</option>
                <option value="warn">Avertissements</option>
                <option value="info">Informations</option>
                <option value="debug">Debug</option>
              </select>
            </div>

            {/* Logs */}
            <div className="space-y-2">
              {filteredLogs.length === 0 ? (
                <div className="text-center text-white/50 py-4">
                  <p>Aucun log</p>
                </div>
              ) : (
                filteredLogs.map((log) => (
                  <div key={log.id} className="p-3 bg-cosmic-border/30 rounded-lg text-sm">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={getLevelColor(log.level)}>{log.level.toUpperCase()}</Badge>
                      <span className="text-xs text-white/50">{formatTime(log.timestamp)}</span>
                    </div>
                    <div className="text-white/90 mb-1">{log.message}</div>
                    {log.source && (
                      <div className="text-xs text-white/50">Source: {log.source}</div>
                    )}
                    {log.data && (
                      <details className="mt-2">
                        <summary className="text-xs text-white/70 cursor-pointer">Données</summary>
                        <pre className="mt-2 p-2 bg-cosmic-background rounded text-xs text-white/70 overflow-x-auto">
                          {JSON.stringify(log.data, null, 2)}
                        </pre>
                      </details>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end">
              <Button variant="outline" size="sm" onClick={onClearLogs} className="text-xs">
                Vider les logs
              </Button>
            </div>
          </div>
        )}

        {activeTab === 'network' && (
          <div className="p-4 space-y-4">
            {/* Network Requests */}
            <div className="space-y-2">
              {networkRequests.length === 0 ? (
                <div className="text-center text-white/50 py-4">
                  <p>Aucune requête réseau</p>
                </div>
              ) : (
                networkRequests.map((request) => (
                  <div key={request.id} className="p-3 bg-cosmic-border/30 rounded-lg text-sm">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(request.status)}>{request.method}</Badge>
                        {request.status && (
                          <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                        )}
                      </div>
                      <span className="text-xs text-white/50">{formatTime(request.timestamp)}</span>
                    </div>
                    <div className="text-white/90 mb-1 truncate">{request.url}</div>
                    {request.duration && (
                      <div className="text-xs text-white/50">
                        Durée: {formatDuration(request.duration)}
                      </div>
                    )}
                    {request.error && (
                      <div className="text-xs text-red-400 mt-1">Erreur: {request.error}</div>
                    )}
                    {(request.requestData || request.responseData) && (
                      <details className="mt-2">
                        <summary className="text-xs text-white/70 cursor-pointer">Détails</summary>
                        {request.requestData && (
                          <div className="mt-2">
                            <div className="text-xs text-white/70 mb-1">Request:</div>
                            <pre className="p-2 bg-cosmic-background rounded text-xs text-white/70 overflow-x-auto">
                              {JSON.stringify(request.requestData, null, 2)}
                            </pre>
                          </div>
                        )}
                        {request.responseData && (
                          <div className="mt-2">
                            <div className="text-xs text-white/70 mb-1">Response:</div>
                            <pre className="p-2 bg-cosmic-background rounded text-xs text-white/70 overflow-x-auto">
                              {JSON.stringify(request.responseData, null, 2)}
                            </pre>
                          </div>
                        )}
                      </details>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end">
              <Button variant="outline" size="sm" onClick={onClearNetwork} className="text-xs">
                Vider le réseau
              </Button>
            </div>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="p-4 space-y-4">
            <div className="space-y-3">
              <div className="p-3 bg-cosmic-border/30 rounded-lg">
                <div className="text-sm font-medium text-white mb-2">Mémoire</div>
                <div className="text-xs text-white/70">
                  Utilisée:{' '}
                  {Math.round((performance as any).memory?.usedJSHeapSize / 1024 / 1024 || 0)} MB
                </div>
                <div className="text-xs text-white/70">
                  Limite:{' '}
                  {Math.round((performance as any).memory?.totalJSHeapSize / 1024 / 1024 || 0)} MB
                </div>
              </div>

              <div className="p-3 bg-cosmic-border/30 rounded-lg">
                <div className="text-sm font-medium text-white mb-2">Performance</div>
                <div className="text-xs text-white/70">
                  FPS: {Math.round(1000 / (performance.now() % 1000))}
                </div>
                <div className="text-xs text-white/70">
                  Temps de chargement: {Math.round(performance.now())}ms
                </div>
              </div>

              <div className="p-3 bg-cosmic-border/30 rounded-lg">
                <div className="text-sm font-medium text-white mb-2">Navigateur</div>
                <div className="text-xs text-white/70">
                  User Agent: {navigator.userAgent.split(' ')[0]}
                </div>
                <div className="text-xs text-white/70">Langue: {navigator.language}</div>
                <div className="text-xs text-white/70">
                  Résolution: {window.screen.width}x{window.screen.height}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Hook for debug panel
export function useDebugPanel() {
  const [logs, setLogs] = React.useState<LogEntry[]>([]);
  const [networkRequests, setNetworkRequests] = React.useState<NetworkRequest[]>([]);
  const [isOpen, setIsOpen] = React.useState(false);

  const addLog = (level: LogEntry['level'], message: string, data?: any, source?: string) => {
    const log: LogEntry = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      level,
      message,
      data,
      source,
    };
    setLogs((prev) => [log, ...prev].slice(0, 100)); // Keep only last 100 logs
  };

  const addNetworkRequest = (request: Omit<NetworkRequest, 'id' | 'timestamp'>) => {
    const networkRequest: NetworkRequest = {
      ...request,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
    };
    setNetworkRequests((prev) => [networkRequest, ...prev].slice(0, 50)); // Keep only last 50 requests
  };

  const clearLogs = () => setLogs([]);
  const clearNetwork = () => setNetworkRequests([]);
  const toggle = () => setIsOpen((prev) => !prev);

  // Intercept console methods
  React.useEffect(() => {
    const originalLog = console.log;
    const originalWarn = console.warn;
    const originalError = console.error;

    console.log = (...args) => {
      addLog('info', args.join(' '), args.length > 1 ? args : undefined, 'console');
      originalLog(...args);
    };

    console.warn = (...args) => {
      addLog('warn', args.join(' '), args.length > 1 ? args : undefined, 'console');
      originalWarn(...args);
    };

    console.error = (...args) => {
      addLog('error', args.join(' '), args.length > 1 ? args : undefined, 'console');
      originalError(...args);
    };

    return () => {
      console.log = originalLog;
      console.warn = originalWarn;
      console.error = originalError;
    };
  }, []);

  return {
    logs,
    networkRequests,
    isOpen,
    addLog,
    addNetworkRequest,
    clearLogs,
    clearNetwork,
    toggle,
  };
}
