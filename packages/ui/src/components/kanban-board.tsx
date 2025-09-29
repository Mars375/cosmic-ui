'use client';

import * as React from 'react';
import { twMerge } from 'tailwind-merge';
import { Button } from './button';
import { Badge } from './badge';
import { Avatar } from './avatar';
import { Card, CardContent, CardHeader, CardTitle } from './card';

export interface KanbanTask {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee?: {
    id: string;
    name: string;
    avatar?: string;
  };
  dueDate?: Date;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface KanbanColumn {
  id: string;
  title: string;
  tasks: KanbanTask[];
  color?: string;
  maxTasks?: number;
}

export interface KanbanBoardProps {
  columns: KanbanColumn[];
  onTaskMove: (taskId: string, fromColumnId: string, toColumnId: string, newIndex: number) => void;
  onTaskCreate?: (
    columnId: string,
    task: Omit<KanbanTask, 'id' | 'createdAt' | 'updatedAt'>,
  ) => void;
  onTaskUpdate?: (taskId: string, updates: Partial<KanbanTask>) => void;
  onTaskDelete?: (taskId: string) => void;
  onColumnCreate?: (column: Omit<KanbanColumn, 'id' | 'tasks'>) => void;
  onColumnUpdate?: (columnId: string, updates: Partial<KanbanColumn>) => void;
  onColumnDelete?: (columnId: string) => void;
  className?: string;
  showAddColumn?: boolean;
  showAddTask?: boolean;
  maxHeight?: number;
  allowDragDrop?: boolean;
}

export function KanbanBoard({
  columns,
  onTaskMove,
  onTaskCreate,
  onTaskUpdate,
  onTaskDelete,
  onColumnCreate,
  onColumnUpdate,
  onColumnDelete,
  className,
  showAddColumn = true,
  showAddTask = true,
  maxHeight = 600,
  allowDragDrop = true,
}: KanbanBoardProps) {
  const [draggedTask, setDraggedTask] = React.useState<KanbanTask | null>(null);
  const [draggedColumn, setDraggedColumn] = React.useState<string | null>(null);
  const [showCreateTask, setShowCreateTask] = React.useState<string | null>(null);
  const [showCreateColumn, setShowCreateColumn] = React.useState(false);
  const [newTaskTitle, setNewTaskTitle] = React.useState('');
  const [newColumnTitle, setNewColumnTitle] = React.useState('');

  const getPriorityColor = (priority: KanbanTask['priority']) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-500/20 text-red-400';
      case 'high':
        return 'bg-orange-500/20 text-orange-400';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'low':
        return 'bg-green-500/20 text-green-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getPriorityText = (priority: KanbanTask['priority']) => {
    switch (priority) {
      case 'urgent':
        return 'Urgent';
      case 'high':
        return 'Élevée';
      case 'medium':
        return 'Moyenne';
      case 'low':
        return 'Faible';
      default:
        return 'Non définie';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      month: 'short',
      day: 'numeric',
    });
  };

  const isOverdue = (date: Date) => {
    return date < new Date() && date.toDateString() !== new Date().toDateString();
  };

  const handleDragStart = (e: React.DragEvent, task: KanbanTask, columnId: string) => {
    if (!allowDragDrop) return;

    setDraggedTask(task);
    setDraggedColumn(columnId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetColumnId: string, targetIndex: number) => {
    e.preventDefault();

    if (!draggedTask || !draggedColumn || draggedColumn === targetColumnId) {
      return;
    }

    onTaskMove(draggedTask.id, draggedColumn, targetColumnId, targetIndex);
    setDraggedTask(null);
    setDraggedColumn(null);
  };

  const handleCreateTask = (columnId: string) => {
    if (newTaskTitle.trim() && onTaskCreate) {
      onTaskCreate(columnId, {
        title: newTaskTitle.trim(),
        status: columnId,
        priority: 'medium',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      setNewTaskTitle('');
      setShowCreateTask(null);
    }
  };

  const handleCreateColumn = () => {
    if (newColumnTitle.trim() && onColumnCreate) {
      onColumnCreate({
        title: newColumnTitle.trim(),
        tasks: [],
      });
      setNewColumnTitle('');
      setShowCreateColumn(false);
    }
  };

  const renderTask = (task: KanbanTask, columnId: string, index: number) => {
    return (
      <div
        key={task.id}
        draggable={allowDragDrop}
        onDragStart={(e) => handleDragStart(e, task, columnId)}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, columnId, index)}
        className={twMerge(
          'p-3 bg-cosmic-surface border border-cosmic-border rounded-lg cursor-move hover:shadow-md transition-all',
          draggedTask?.id === task.id && 'opacity-50',
        )}
      >
        <div className="space-y-2">
          {/* Header */}
          <div className="flex items-start justify-between">
            <h4 className="font-medium text-white text-sm leading-tight">{task.title}</h4>
            <Badge className={getPriorityColor(task.priority)}>
              {getPriorityText(task.priority)}
            </Badge>
          </div>

          {/* Description */}
          {task.description && (
            <p className="text-xs text-white/70 line-clamp-2">{task.description}</p>
          )}

          {/* Tags */}
          {task.tags && task.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {task.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="px-2 py-1 bg-cosmic-border/50 text-xs text-white/70 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2">
              {task.assignee && (
                <Avatar src={task.assignee.avatar} alt={task.assignee.name} size="xs" />
              )}
              {task.dueDate && (
                <span
                  className={twMerge(
                    'text-xs px-2 py-1 rounded',
                    isOverdue(task.dueDate)
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-cosmic-border/50 text-white/70',
                  )}
                >
                  {formatDate(task.dueDate)}
                </span>
              )}
            </div>

            <div className="flex items-center space-x-1">
              {onTaskUpdate && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onTaskUpdate(task.id, {})}
                  className="h-6 w-6 p-0 text-white/50 hover:text-white/70"
                >
                  ✏️
                </Button>
              )}
              {onTaskDelete && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onTaskDelete(task.id)}
                  className="h-6 w-6 p-0 text-white/50 hover:text-red-400"
                >
                  🗑️
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderColumn = (column: KanbanColumn) => {
    return (
      <div key={column.id} className="flex-shrink-0 w-80 bg-cosmic-border/20 rounded-lg p-4">
        {/* Column Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold text-white">{column.title}</h3>
            <Badge variant="secondary" className="text-xs">
              {column.tasks.length}
              {column.maxTasks && `/${column.maxTasks}`}
            </Badge>
          </div>

          <div className="flex items-center space-x-1">
            {onColumnUpdate && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onColumnUpdate(column.id, {})}
                className="h-6 w-6 p-0 text-white/50 hover:text-white/70"
              >
                ✏️
              </Button>
            )}
            {onColumnDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onColumnDelete(column.id)}
                className="h-6 w-6 p-0 text-white/50 hover:text-red-400"
              >
                🗑️
              </Button>
            )}
          </div>
        </div>

        {/* Tasks */}
        <div className="space-y-3 min-h-[200px]">
          {column.tasks.map((task, index) => renderTask(task, column.id, index))}

          {/* Create Task */}
          {showAddTask && showCreateTask === column.id && (
            <div className="p-3 border-2 border-dashed border-cosmic-border rounded-lg">
              <input
                type="text"
                placeholder="Titre de la tâche..."
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleCreateTask(column.id)}
                className="w-full px-2 py-1 bg-cosmic-surface border border-cosmic-border rounded text-white placeholder-white/50 text-sm"
                autoFocus
              />
              <div className="flex items-center space-x-2 mt-2">
                <Button
                  size="sm"
                  onClick={() => handleCreateTask(column.id)}
                  disabled={!newTaskTitle.trim()}
                >
                  Ajouter
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowCreateTask(null);
                    setNewTaskTitle('');
                  }}
                >
                  Annuler
                </Button>
              </div>
            </div>
          )}

          {/* Add Task Button */}
          {showAddTask && showCreateTask !== column.id && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCreateTask(column.id)}
              className="w-full border-dashed"
            >
              + Ajouter une tâche
            </Button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={twMerge('w-full', className)}>
      {/* Board Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Tableau Kanban</h2>
          <p className="text-white/70">Gérez vos tâches avec un tableau Kanban</p>
        </div>

        {showAddColumn && (
          <Button onClick={() => setShowCreateColumn(true)} variant="outline">
            + Ajouter une colonne
          </Button>
        )}
      </div>

      {/* Create Column */}
      {showCreateColumn && (
        <div className="mb-6 p-4 bg-cosmic-surface/50 rounded-lg">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Nom de la colonne..."
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCreateColumn()}
              className="flex-1 px-3 py-2 bg-cosmic-surface border border-cosmic-border rounded text-white placeholder-white/50"
              autoFocus
            />
            <Button onClick={handleCreateColumn} disabled={!newColumnTitle.trim()}>
              Créer
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setShowCreateColumn(false);
                setNewColumnTitle('');
              }}
            >
              Annuler
            </Button>
          </div>
        </div>
      )}

      {/* Board */}
      <div className="flex space-x-4 overflow-x-auto pb-4" style={{ maxHeight: `${maxHeight}px` }}>
        {columns.map((column) => renderColumn(column))}
      </div>
    </div>
  );
}

// Hook for kanban board
export function useKanbanBoard() {
  const [columns, setColumns] = React.useState<KanbanColumn[]>([]);

  const moveTask = (taskId: string, fromColumnId: string, toColumnId: string, newIndex: number) => {
    setColumns((prev) => {
      const newColumns = [...prev];
      const fromColumn = newColumns.find((col) => col.id === fromColumnId);
      const toColumn = newColumns.find((col) => col.id === toColumnId);

      if (!fromColumn || !toColumn) return prev;

      const task = fromColumn.tasks.find((task) => task.id === taskId);
      if (!task) return prev;

      // Remove from source column
      fromColumn.tasks = fromColumn.tasks.filter((task) => task.id !== taskId);

      // Add to target column
      toColumn.tasks.splice(newIndex, 0, task);

      return newColumns;
    });
  };

  const createTask = (
    columnId: string,
    task: Omit<KanbanTask, 'id' | 'createdAt' | 'updatedAt'>,
  ) => {
    const newTask: KanbanTask = {
      ...task,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setColumns((prev) =>
      prev.map((col) => (col.id === columnId ? { ...col, tasks: [...col.tasks, newTask] } : col)),
    );
  };

  const updateTask = (taskId: string, updates: Partial<KanbanTask>) => {
    setColumns((prev) =>
      prev.map((col) => ({
        ...col,
        tasks: col.tasks.map((task) =>
          task.id === taskId ? { ...task, ...updates, updatedAt: new Date() } : task,
        ),
      })),
    );
  };

  const deleteTask = (taskId: string) => {
    setColumns((prev) =>
      prev.map((col) => ({
        ...col,
        tasks: col.tasks.filter((task) => task.id !== taskId),
      })),
    );
  };

  const createColumn = (column: Omit<KanbanColumn, 'id' | 'tasks'>) => {
    const newColumn: KanbanColumn = {
      ...column,
      id: Math.random().toString(36).substr(2, 9),
      tasks: [],
    };

    setColumns((prev) => [...prev, newColumn]);
  };

  const updateColumn = (columnId: string, updates: Partial<KanbanColumn>) => {
    setColumns((prev) => prev.map((col) => (col.id === columnId ? { ...col, ...updates } : col)));
  };

  const deleteColumn = (columnId: string) => {
    setColumns((prev) => prev.filter((col) => col.id !== columnId));
  };

  return {
    columns,
    setColumns,
    moveTask,
    createTask,
    updateTask,
    deleteTask,
    createColumn,
    updateColumn,
    deleteColumn,
  };
}
