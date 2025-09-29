import type { Meta, StoryObj } from '@storybook/react';
import { KanbanBoard, useKanbanBoard } from '../components/kanban-board';
import { Button } from '../components/button';

const meta: Meta<typeof KanbanBoard> = {
  title: 'Components/KanbanBoard',
  component: KanbanBoard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleColumns = [
  {
    id: '1',
    title: 'À faire',
    tasks: [
      {
        id: '1',
        title: "Créer la page d'accueil",
        description: "Développer la page d'accueil avec les composants principaux",
        status: '1',
        priority: 'high' as const,
        assignee: {
          id: '1',
          name: 'Jean Dupont',
          avatar:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        },
        dueDate: new Date(Date.now() + 3 * 24 * 3600000), // 3 days from now
        tags: ['Frontend', 'React'],
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-01-22'),
      },
      {
        id: '2',
        title: 'Configurer la base de données',
        description: 'Mettre en place la structure de la base de données',
        status: '1',
        priority: 'medium' as const,
        assignee: {
          id: '2',
          name: 'Marie Martin',
          avatar:
            'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        },
        tags: ['Backend', 'Database'],
        createdAt: new Date('2024-01-21'),
        updatedAt: new Date('2024-01-23'),
      },
    ],
  },
  {
    id: '2',
    title: 'En cours',
    tasks: [
      {
        id: '3',
        title: "Implémenter l'authentification",
        description: "Créer le système d'authentification avec JWT",
        status: '2',
        priority: 'urgent' as const,
        assignee: {
          id: '3',
          name: 'Pierre Durand',
          avatar:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        },
        dueDate: new Date(Date.now() + 1 * 24 * 3600000), // 1 day from now
        tags: ['Backend', 'Security'],
        createdAt: new Date('2024-01-19'),
        updatedAt: new Date('2024-01-24'),
      },
      {
        id: '4',
        title: 'Designer les composants UI',
        description: "Créer les composants réutilisables pour l'interface",
        status: '2',
        priority: 'medium' as const,
        assignee: {
          id: '4',
          name: 'Sophie Leroy',
          avatar:
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        },
        tags: ['Design', 'UI/UX'],
        createdAt: new Date('2024-01-18'),
        updatedAt: new Date('2024-01-25'),
      },
    ],
  },
  {
    id: '3',
    title: 'En révision',
    tasks: [
      {
        id: '5',
        title: 'Tests unitaires',
        description: 'Écrire les tests unitaires pour les composants principaux',
        status: '3',
        priority: 'low' as const,
        assignee: {
          id: '5',
          name: 'Thomas Moreau',
          avatar:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        },
        tags: ['Testing', 'Quality'],
        createdAt: new Date('2024-01-17'),
        updatedAt: new Date('2024-01-26'),
      },
    ],
  },
  {
    id: '4',
    title: 'Terminé',
    tasks: [
      {
        id: '6',
        title: 'Setup du projet',
        description: 'Configuration initiale du projet avec les outils nécessaires',
        status: '4',
        priority: 'high' as const,
        assignee: {
          id: '1',
          name: 'Jean Dupont',
          avatar:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        },
        tags: ['Setup', 'Configuration'],
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-20'),
      },
    ],
  },
];

function KanbanBoardDemo() {
  const {
    columns,
    setColumns,
    moveTask,
    createTask,
    updateTask,
    deleteTask,
    createColumn,
    updateColumn,
    deleteColumn,
  } = useKanbanBoard();

  // Initialize with sample data
  React.useEffect(() => {
    if (columns.length === 0) {
      setColumns(sampleColumns);
    }
  }, [columns.length, setColumns]);

  const handleTaskMove = (
    taskId: string,
    fromColumnId: string,
    toColumnId: string,
    newIndex: number,
  ) => {
    moveTask(taskId, fromColumnId, toColumnId, newIndex);
    console.log('Task moved:', { taskId, fromColumnId, toColumnId, newIndex });
  };

  const handleTaskCreate = (columnId: string, task: any) => {
    createTask(columnId, task);
    console.log('Task created:', { columnId, task });
  };

  const handleTaskUpdate = (taskId: string, updates: any) => {
    updateTask(taskId, updates);
    console.log('Task updated:', { taskId, updates });
  };

  const handleTaskDelete = (taskId: string) => {
    deleteTask(taskId);
    console.log('Task deleted:', taskId);
  };

  const handleColumnCreate = (column: any) => {
    createColumn(column);
    console.log('Column created:', column);
  };

  const handleColumnUpdate = (columnId: string, updates: any) => {
    updateColumn(columnId, updates);
    console.log('Column updated:', { columnId, updates });
  };

  const handleColumnDelete = (columnId: string) => {
    deleteColumn(columnId);
    console.log('Column deleted:', columnId);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Kanban Board</h2>
        <p className="text-white/70">Tableau Kanban pour la gestion de projet avec drag & drop</p>
      </div>

      <KanbanBoard
        columns={columns}
        onTaskMove={handleTaskMove}
        onTaskCreate={handleTaskCreate}
        onTaskUpdate={handleTaskUpdate}
        onTaskDelete={handleTaskDelete}
        onColumnCreate={handleColumnCreate}
        onColumnUpdate={handleColumnUpdate}
        onColumnDelete={handleColumnDelete}
        maxHeight={500}
      />
    </div>
  );
}

export const Default: Story = {
  render: () => <KanbanBoardDemo />,
};

export const WithoutDragDrop: Story = {
  render: () => {
    const {
      columns,
      setColumns,
      createTask,
      updateTask,
      deleteTask,
      createColumn,
      updateColumn,
      deleteColumn,
    } = useKanbanBoard();

    // Initialize with sample data
    React.useEffect(() => {
      if (columns.length === 0) {
        setColumns(sampleColumns);
      }
    }, [columns.length, setColumns]);

    return (
      <div className="p-8">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-2">Sans drag & drop</h3>
          <p className="text-white/70 text-sm">
            Tableau Kanban sans fonctionnalité de glisser-déposer
          </p>
        </div>

        <KanbanBoard
          columns={columns}
          onTaskMove={() => {}}
          onTaskCreate={createTask}
          onTaskUpdate={updateTask}
          onTaskDelete={deleteTask}
          onColumnCreate={createColumn}
          onColumnUpdate={updateColumn}
          onColumnDelete={deleteColumn}
          allowDragDrop={false}
          maxHeight={500}
        />
      </div>
    );
  },
};

export const WithoutAddColumn: Story = {
  render: () => {
    const {
      columns,
      setColumns,
      moveTask,
      createTask,
      updateTask,
      deleteTask,
      updateColumn,
      deleteColumn,
    } = useKanbanBoard();

    // Initialize with sample data
    React.useEffect(() => {
      if (columns.length === 0) {
        setColumns(sampleColumns);
      }
    }, [columns.length, setColumns]);

    return (
      <div className="p-8">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-2">Sans ajout de colonne</h3>
          <p className="text-white/70 text-sm">
            Tableau Kanban sans possibilité d'ajouter des colonnes
          </p>
        </div>

        <KanbanBoard
          columns={columns}
          onTaskMove={moveTask}
          onTaskCreate={createTask}
          onTaskUpdate={updateTask}
          onTaskDelete={deleteTask}
          onColumnUpdate={updateColumn}
          onColumnDelete={deleteColumn}
          showAddColumn={false}
          maxHeight={500}
        />
      </div>
    );
  },
};

export const WithoutAddTask: Story = {
  render: () => {
    const {
      columns,
      setColumns,
      moveTask,
      updateTask,
      deleteTask,
      createColumn,
      updateColumn,
      deleteColumn,
    } = useKanbanBoard();

    // Initialize with sample data
    React.useEffect(() => {
      if (columns.length === 0) {
        setColumns(sampleColumns);
      }
    }, [columns.length, setColumns]);

    return (
      <div className="p-8">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-2">Sans ajout de tâche</h3>
          <p className="text-white/70 text-sm">
            Tableau Kanban sans possibilité d'ajouter des tâches
          </p>
        </div>

        <KanbanBoard
          columns={columns}
          onTaskMove={moveTask}
          onTaskUpdate={updateTask}
          onTaskDelete={deleteTask}
          onColumnCreate={createColumn}
          onColumnUpdate={updateColumn}
          onColumnDelete={deleteColumn}
          showAddTask={false}
          maxHeight={500}
        />
      </div>
    );
  },
};

export const EmptyBoard: Story = {
  render: () => {
    const {
      columns,
      moveTask,
      createTask,
      updateTask,
      deleteTask,
      createColumn,
      updateColumn,
      deleteColumn,
    } = useKanbanBoard();

    return (
      <div className="p-8">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-2">Tableau vide</h3>
          <p className="text-white/70 text-sm">Tableau Kanban sans colonnes ni tâches</p>
        </div>

        <KanbanBoard
          columns={columns}
          onTaskMove={moveTask}
          onTaskCreate={createTask}
          onTaskUpdate={updateTask}
          onTaskDelete={deleteTask}
          onColumnCreate={createColumn}
          onColumnUpdate={updateColumn}
          onColumnDelete={deleteColumn}
          maxHeight={500}
        />
      </div>
    );
  },
};
