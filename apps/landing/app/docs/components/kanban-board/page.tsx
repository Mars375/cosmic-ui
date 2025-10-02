'use client';

import * as React from 'react';
import { useState } from 'react';
import { CodeBlock } from '../../../components/code-block';
import { KanbanBoard } from 'cosmic-ui-mars';
import { Button } from 'cosmic-ui-mars';
import { Plus, User, Calendar, Tag } from 'lucide-react';

export default function KanbanBoardPage() {
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
      color: '#f59e0b',
      tasks: [
        {
          id: 'task3',
          title: 'Développer les composants',
          description: 'Implémenter les nouveaux composants React',
          status: 'in-progress',
          priority: 'high' as const,
          assignee: {
            id: 'user3',
            name: 'Charlie Dubois',
            avatar: '/avatars/charlie.jpg',
          },
          dueDate: new Date('2024-02-10'),
          tags: ['development', 'react'],
          createdAt: new Date('2024-01-08'),
          updatedAt: new Date('2024-01-12'),
        },
      ],
    },
    {
      id: 'done',
      title: 'Terminé',
      color: '#10b981',
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

  const handleTaskMove = (taskId: string, newStatus: string) => {
    setColumns(prevColumns => {
      return prevColumns.map(column => {
        if (column.id === newStatus) {
          // Trouver la tâche dans une autre colonne
          let taskToMove = null;
          const updatedColumns = prevColumns.map(col => {
            if (col.id !== newStatus) {
              const taskIndex = col.tasks.findIndex(task => task.id === taskId);
              if (taskIndex !== -1) {
                taskToMove = { ...col.tasks[taskIndex], status: newStatus };
                return {
                  ...col,
                  tasks: col.tasks.filter(task => task.id !== taskId)
                };
              }
            }
            return col;
          });

          if (taskToMove) {
            return {
              ...column,
              tasks: [...column.tasks, taskToMove]
            };
          }
        }
        return column;
      });
    });
  };

  const handleTaskCreate = (columnId: string, task: any) => {
    setColumns(prevColumns => {
      return prevColumns.map(column => {
        if (column.id === columnId) {
          const newTask = {
            ...task,
            id: `task-${Date.now()}`,
            status: columnId,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          return {
            ...column,
            tasks: [...column.tasks, newTask]
          };
        }
        return column;
      });
    });
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Tag className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">KanbanBoard</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Tableau Kanban pour organiser et suivre les tâches en colonnes.
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
              <div className="h-96 overflow-hidden">
                <KanbanBoard
                  columns={columns}
                  onTaskMove={handleTaskMove}
                  onTaskCreate={handleTaskCreate}
                />
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4 text-foreground">Code</h3>
            <CodeBlock language="typescript" filePath="components/KanbanBoardExample.tsx" showPackageManager={false}>
{`import { KanbanBoard } from 'cosmic-ui-mars';
import { useState } from 'react';

const [columns, setColumns] = useState([
  {
    id: 'todo',
    title: 'À faire',
    color: '#ef4444',
    tasks: [
      {
        id: 'task1',
        title: 'Concevoir la nouvelle interface',
        description: 'Créer les maquettes',
        status: 'todo',
        priority: 'high',
        assignee: {
          id: 'user1',
          name: 'Alice Martin',
          avatar: '/avatars/alice.jpg',
        },
        dueDate: new Date('2024-02-15'),
        tags: ['design', 'ui'],
      },
    ],
  },
]);

<KanbanBoard
  columns={columns}
  onTaskMove={(taskId, newStatus) => {
    // Logique de déplacement
  }}
  onTaskCreate={(columnId, task) => {
    // Logique de création
  }}
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
              <h3 className="text-lg font-medium text-foreground">Tableau avec filtres</h3>
              <p className="text-muted-foreground">Tableau avec fonctionnalité de filtrage.</p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <div className="h-96 overflow-hidden">
                  <KanbanBoard
                    columns={columns}
                    onTaskMove={handleTaskMove}
                    onTaskCreate={handleTaskCreate}
                    showFilters
                    filterOptions={{
                      priority: ['high', 'medium', 'low'],
                      assignee: ['user1', 'user2', 'user3'],
                      tags: ['design', 'ui', 'documentation', 'development', 'react', 'setup']
                    }}
                  />
                </div>
              </div>
            </div>
            <div>
              <CodeBlock language="typescript" filePath="components/FilteredKanbanBoard.tsx" showPackageManager={false}>
{`export default function App\docs\components\kanbanBoard\page.tsxExample() {
  return <KanbanBoard
  columns={columns}
  onTaskMove={handleTaskMove}
  onTaskCreate={handleTaskCreate}
  showFilters
  filterOptions={{
    priority: ['high', 'medium', 'low'],
    assignee: ['user1', 'user2', 'user3'],
    tags: ['design', 'ui', 'documentation']
  }}
/>;
}`}
              </CodeBlock>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Tableau avec recherche</h3>
              <p className="text-muted-foreground">Tableau avec fonction de recherche.</p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <div className="h-96 overflow-hidden">
                  <KanbanBoard
                    columns={columns}
                    onTaskMove={handleTaskMove}
                    onTaskCreate={handleTaskCreate}
                    showSearch
                    searchPlaceholder="Rechercher des tâches..."
                  />
                </div>
              </div>
            </div>
            <div>
              <CodeBlock language="typescript" filePath="components/SearchableKanbanBoard.tsx" showPackageManager={false}>
{`export default function App\docs\components\kanbanBoard\page.tsxExample() {
  return <KanbanBoard
  columns={columns}
  onTaskMove={handleTaskMove}
  onTaskCreate={handleTaskCreate}
  showSearch
  searchPlaceholder="Rechercher des tâches..."
/>;
}`}
              </CodeBlock>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Tableau compact</h3>
              <p className="text-muted-foreground">Tableau avec un style compact.</p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <div className="h-96 overflow-hidden">
                  <KanbanBoard
                    columns={columns}
                    onTaskMove={handleTaskMove}
                    onTaskCreate={handleTaskCreate}
                    variant="compact"
                  />
                </div>
              </div>
            </div>
            <div>
              <CodeBlock language="typescript" filePath="components/CompactKanbanBoard.tsx" showPackageManager={false}>
{`export default function App\docs\components\kanbanBoard\page.tsxExample() {
  return <KanbanBoard
  columns={columns}
  onTaskMove={handleTaskMove}
  onTaskCreate={handleTaskCreate}
  variant="compact"
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
                <td className="border border-border px-4 py-3 font-mono text-sm">columns</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Column[]</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">[]</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Colonnes du tableau</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">onTaskMove</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">(taskId: string, newStatus: string) => void</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">-</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Callback lors du déplacement d'une tâche</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">onTaskCreate</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">(columnId: string, task: Task) => void</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">-</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Callback lors de la création d'une tâche</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">showFilters</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">boolean</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">false</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Afficher les filtres</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">showSearch</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">boolean</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">false</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Afficher la recherche</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">variant</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">'default' | 'compact'</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">'default'</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Style du tableau</td>
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
          <li>• Organisez les <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">colonnes</code> selon votre workflow</li>
          <li>• Utilisez des <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">couleurs</code> pour identifier les colonnes</li>
          <li>• Ajoutez des <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">métadonnées</code> aux tâches (priorité, assigné, etc.)</li>
          <li>• Implémentez le <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">drag & drop</code> pour une meilleure UX</li>
          <li>• Respectez les <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">guidelines d'accessibilité</code></li>
        </ul>
      </div>
    </div>
  );
}