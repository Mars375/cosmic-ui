'use client';

import { useState } from 'react';
import { KanbanBoard } from '@cosmic-ui/components';
import { Button } from '@cosmic-ui/components';
import { Plus, User, Calendar, Tag } from 'lucide-react';

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

export default function KanbanBoardPage() {
  const [showCode, setShowCode] = useState(false);
  const [showCodeVariants, setShowCodeVariants] = useState(false);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const [columns, setColumns] = useState([
    {
      id: 'todo',
      title: 'À faire',
      color: '#ef4444',
      tasks: [
        {
          id: 'task1',
          title: 'Concevoir la nouvelle interface',
          description: 'Créer les maquettes pour la nouvelle interface utilisateur',
          status: 'todo',
          priority: 'high' as const,
          assignee: {
            id: 'user1',
            name: 'Alice Martin',
            avatar: '/avatars/alice.jpg',
          },
          dueDate: new Date('2024-02-15'),
          tags: ['design', 'ui'],
          createdAt: new Date('2024-01-10'),
          updatedAt: new Date('2024-01-10'),
        },
        {
          id: 'task2',
          title: 'Rédiger la documentation',
          description: 'Documenter les nouvelles fonctionnalités',
          status: 'todo',
          priority: 'medium' as const,
          assignee: {
            id: 'user2',
            name: 'Bob Dupont',
            avatar: '/avatars/bob.jpg',
          },
          dueDate: new Date('2024-02-20'),
          tags: ['documentation'],
          createdAt: new Date('2024-01-11'),
          updatedAt: new Date('2024-01-11'),
        },
      ],
    },
    {
      id: 'in-progress',
      title: 'En cours',
      color: '#eab308',
      tasks: [
        {
          id: 'task3',
          title: 'Développer l\'API',
          description: 'Créer les endpoints pour la nouvelle API',
          status: 'in-progress',
          priority: 'high' as const,
          assignee: {
            id: 'user3',
            name: 'Charlie Bernard',
            avatar: '/avatars/charlie.jpg',
          },
          dueDate: new Date('2024-02-10'),
          tags: ['backend', 'api'],
          createdAt: new Date('2024-01-08'),
          updatedAt: new Date('2024-01-12'),
        },
      ],
    },
    {
      id: 'done',
      title: 'Terminé',
      color: '#22c55e',
      tasks: [
        {
          id: 'task4',
          title: 'Configurer l\'environnement',
          description: 'Mettre en place l\'environnement de développement',
          status: 'done',
          priority: 'low' as const,
          assignee: {
            id: 'user1',
            name: 'Alice Martin',
            avatar: '/avatars/alice.jpg',
          },
          dueDate: new Date('2024-01-05'),
          tags: ['setup'],
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-05'),
        },
      ],
    },
  ]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStates(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCopiedStates(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

  const handleTaskMove = (taskId: string, fromColumnId: string, toColumnId: string, newIndex: number) => {
    setColumns(prev => {
      const newColumns = [...prev];
      const fromColumn = newColumns.find(col => col.id === fromColumnId);
      const toColumn = newColumns.find(col => col.id === toColumnId);
      
      if (fromColumn && toColumn) {
        const task = fromColumn.tasks.find(t => t.id === taskId);
        if (task) {
          fromColumn.tasks = fromColumn.tasks.filter(t => t.id !== taskId);
          toColumn.tasks.splice(newIndex, 0, { ...task, status: toColumnId });
        }
      }
      
      return newColumns;
    });
  };

  const handleTaskCreate = (columnId: string, task: any) => {
    const newTask = {
      ...task,
      id: `task-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setColumns(prev => prev.map(col => 
      col.id === columnId 
        ? { ...col, tasks: [...col.tasks, newTask] }
        : col
    ));
  };

  const handleTaskUpdate = (taskId: string, updates: any) => {
    setColumns(prev => prev.map(col => ({
      ...col,
      tasks: col.tasks.map(task => 
        task.id === taskId 
          ? { ...task, ...updates, updatedAt: new Date() }
          : task
      ),
    })));
  };

  const handleTaskDelete = (taskId: string) => {
    setColumns(prev => prev.map(col => ({
      ...col,
      tasks: col.tasks.filter(task => task.id !== taskId),
    })));
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
          <h1 className="text-4xl font-bold">KanbanBoard</h1>
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
          Un composant de tableau Kanban pour gérer des tâches avec colonnes et
          glisser-déposer.
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
                <KanbanBoard
                  columns={columns}
                  onTaskMove={handleTaskMove}
                  onTaskCreate={handleTaskCreate}
                  onTaskUpdate={handleTaskUpdate}
                  onTaskDelete={handleTaskDelete}
                  showAddColumn={true}
                  showAddTask={true}
                  maxHeight={350}
                />
              </div>
            ) : (
              <div className="w-full h-full">
                <CodeBlock
                  onCopy={() =>
                    handleCopy(
                      `import { KanbanBoard } from '@cosmic-ui/components';
import { useState } from 'react';

export function MyKanbanBoard() {
  const [columns, setColumns] = useState([
    {
      id: 'todo',
      title: 'À faire',
      color: '#ef4444',
      tasks: [
        {
          id: 'task1',
          title: 'Concevoir la nouvelle interface',
          description: 'Créer les maquettes pour la nouvelle interface utilisateur',
          status: 'todo',
          priority: 'high',
          assignee: {
            id: 'user1',
            name: 'Alice Martin',
            avatar: '/avatars/alice.jpg',
          },
          dueDate: new Date('2024-02-15'),
          tags: ['design', 'ui'],
          createdAt: new Date('2024-01-10'),
          updatedAt: new Date('2024-01-10'),
        },
      ],
    },
    {
      id: 'in-progress',
      title: 'En cours',
      color: '#eab308',
      tasks: [],
    },
    {
      id: 'done',
      title: 'Terminé',
      color: '#22c55e',
      tasks: [],
    },
  ]);

  const handleTaskMove = (taskId, fromColumnId, toColumnId, newIndex) => {
    setColumns(prev => {
      const newColumns = [...prev];
      const fromColumn = newColumns.find(col => col.id === fromColumnId);
      const toColumn = newColumns.find(col => col.id === toColumnId);
      
      if (fromColumn && toColumn) {
        const task = fromColumn.tasks.find(t => t.id === taskId);
        if (task) {
          fromColumn.tasks = fromColumn.tasks.filter(t => t.id !== taskId);
          toColumn.tasks.splice(newIndex, 0, { ...task, status: toColumnId });
        }
      }
      
      return newColumns;
    });
  };

  const handleTaskCreate = (columnId, task) => {
    const newTask = {
      ...task,
      id: \`task-\${Date.now()}\`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setColumns(prev => prev.map(col => 
      col.id === columnId 
        ? { ...col, tasks: [...col.tasks, newTask] }
        : col
    ));
  };

  const handleTaskUpdate = (taskId, updates) => {
    setColumns(prev => prev.map(col => ({
      ...col,
      tasks: col.tasks.map(task => 
        task.id === taskId 
          ? { ...task, ...updates, updatedAt: new Date() }
          : task
      ),
    })));
  };

  const handleTaskDelete = (taskId) => {
    setColumns(prev => prev.map(col => ({
      ...col,
      tasks: col.tasks.filter(task => task.id !== taskId),
    })));
  };

  return (
    <KanbanBoard
      columns={columns}
      onTaskMove={handleTaskMove}
      onTaskCreate={handleTaskCreate}
      onTaskUpdate={handleTaskUpdate}
      onTaskDelete={handleTaskDelete}
      showAddColumn={true}
      showAddTask={true}
      maxHeight={400}
    />
  );
}`,
                      'main'
                    )
                  }
                >
                  {`import { KanbanBoard } from '@cosmic-ui/components';
import { useState } from 'react';

export function MyKanbanBoard() {
  const [columns, setColumns] = useState([
    {
      id: 'todo',
      title: 'À faire',
      color: '#ef4444',
      tasks: [
        {
          id: 'task1',
          title: 'Concevoir la nouvelle interface',
          description: 'Créer les maquettes pour la nouvelle interface utilisateur',
          status: 'todo',
          priority: 'high',
          assignee: {
            id: 'user1',
            name: 'Alice Martin',
            avatar: '/avatars/alice.jpg',
          },
          dueDate: new Date('2024-02-15'),
          tags: ['design', 'ui'],
          createdAt: new Date('2024-01-10'),
          updatedAt: new Date('2024-01-10'),
        },
      ],
    },
    {
      id: 'in-progress',
      title: 'En cours',
      color: '#eab308',
      tasks: [],
    },
    {
      id: 'done',
      title: 'Terminé',
      color: '#22c55e',
      tasks: [],
    },
  ]);

  const handleTaskMove = (taskId, fromColumnId, toColumnId, newIndex) => {
    setColumns(prev => {
      const newColumns = [...prev];
      const fromColumn = newColumns.find(col => col.id === fromColumnId);
      const toColumn = newColumns.find(col => col.id === toColumnId);
      
      if (fromColumn && toColumn) {
        const task = fromColumn.tasks.find(t => t.id === taskId);
        if (task) {
          fromColumn.tasks = fromColumn.tasks.filter(t => t.id !== taskId);
          toColumn.tasks.splice(newIndex, 0, { ...task, status: toColumnId });
        }
      }
      
      return newColumns;
    });
  };

  const handleTaskCreate = (columnId, task) => {
    const newTask = {
      ...task,
      id: \`task-\${Date.now()}\`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setColumns(prev => prev.map(col => 
      col.id === columnId 
        ? { ...col, tasks: [...col.tasks, newTask] }
        : col
    ));
  };

  const handleTaskUpdate = (taskId, updates) => {
    setColumns(prev => prev.map(col => ({
      ...col,
      tasks: col.tasks.map(task => 
        task.id === taskId 
          ? { ...task, ...updates, updatedAt: new Date() }
          : task
      ),
    })));
  };

  const handleTaskDelete = (taskId) => {
    setColumns(prev => prev.map(col => ({
      ...col,
      tasks: col.tasks.filter(task => task.id !== taskId),
    })));
  };

  return (
    <KanbanBoard
      columns={columns}
      onTaskMove={handleTaskMove}
      onTaskCreate={handleTaskCreate}
      onTaskUpdate={handleTaskUpdate}
      onTaskDelete={handleTaskDelete}
      showAddColumn={true}
      showAddTask={true}
      maxHeight={400}
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
              Le composant KanbanBoard est déjà inclus dans le package
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
              Utilisez le composant pour créer un tableau Kanban.
            </p>
            <CodeBlock
              onCopy={() =>
                handleCopy(
                  `import { KanbanBoard } from '@cosmic-ui/components';

const columns = [
  {
    id: 'todo',
    title: 'À faire',
    color: '#ef4444',
    tasks: [],
  },
  {
    id: 'done',
    title: 'Terminé',
    color: '#22c55e',
    tasks: [],
  },
];

<KanbanBoard
  columns={columns}
  onTaskMove={(taskId, fromColumnId, toColumnId, newIndex) => {
    console.log('Task moved:', taskId, fromColumnId, toColumnId, newIndex);
  }}
  showAddColumn={true}
  showAddTask={true}
/>`,
                  'usage'
                )
              }
            >
              {`import { KanbanBoard } from '@cosmic-ui/components';

const columns = [
  {
    id: 'todo',
    title: 'À faire',
    color: '#ef4444',
    tasks: [],
  },
  {
    id: 'done',
    title: 'Terminé',
    color: '#22c55e',
    tasks: [],
  },
];

<KanbanBoard
  columns={columns}
  onTaskMove={(taskId, fromColumnId, toColumnId, newIndex) => {
    console.log('Task moved:', taskId, fromColumnId, toColumnId, newIndex);
  }}
  showAddColumn={true}
  showAddTask={true}
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
                      Colonnes simples
                    </h3>
                    <KanbanBoard
                      columns={columns.slice(0, 2)}
                      onTaskMove={handleTaskMove}
                      showAddColumn={false}
                      showAddTask={false}
                      maxHeight={200}
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Avec ajout de tâches
                    </h3>
                    <KanbanBoard
                      columns={columns.slice(0, 2)}
                      onTaskMove={handleTaskMove}
                      onTaskCreate={handleTaskCreate}
                      showAddColumn={false}
                      showAddTask={true}
                      maxHeight={200}
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full h-full">
                  <CodeBlock
                    onCopy={() =>
                      handleCopy(
                        `// Colonnes simples
<KanbanBoard
  columns={columns}
  onTaskMove={handleTaskMove}
  showAddColumn={false}
  showAddTask={false}
/>

// Avec ajout de tâches
<KanbanBoard
  columns={columns}
  onTaskMove={handleTaskMove}
  onTaskCreate={handleTaskCreate}
  showAddColumn={false}
  showAddTask={true}
/>

// Avec ajout de colonnes
<KanbanBoard
  columns={columns}
  onTaskMove={handleTaskMove}
  onColumnCreate={handleColumnCreate}
  showAddColumn={true}
  showAddTask={false}
/>

// Complet
<KanbanBoard
  columns={columns}
  onTaskMove={handleTaskMove}
  onTaskCreate={handleTaskCreate}
  onTaskUpdate={handleTaskUpdate}
  onTaskDelete={handleTaskDelete}
  onColumnCreate={handleColumnCreate}
  onColumnUpdate={handleColumnUpdate}
  onColumnDelete={handleColumnDelete}
  showAddColumn={true}
  showAddTask={true}
/>`,
                        'variants'
                      )
                    }
                  >
                    {`// Colonnes simples
<KanbanBoard
  columns={columns}
  onTaskMove={handleTaskMove}
  showAddColumn={false}
  showAddTask={false}
/>

// Avec ajout de tâches
<KanbanBoard
  columns={columns}
  onTaskMove={handleTaskMove}
  onTaskCreate={handleTaskCreate}
  showAddColumn={false}
  showAddTask={true}
/>

// Avec ajout de colonnes
<KanbanBoard
  columns={columns}
  onTaskMove={handleTaskMove}
  onColumnCreate={handleColumnCreate}
  showAddColumn={true}
  showAddTask={false}
/>

// Complet
<KanbanBoard
  columns={columns}
  onTaskMove={handleTaskMove}
  onTaskCreate={handleTaskCreate}
  onTaskUpdate={handleTaskUpdate}
  onTaskDelete={handleTaskDelete}
  onColumnCreate={handleColumnCreate}
  onColumnUpdate={handleColumnUpdate}
  onColumnDelete={handleColumnDelete}
  showAddColumn={true}
  showAddTask={true}
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
