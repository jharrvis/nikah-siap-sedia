
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Task, Category } from '@/types';

interface TaskCardProps {
  task: Task;
  category: Category;
  onToggleComplete: (taskId: string) => void;
  onEdit?: (task: Task) => void;
  isDragging?: boolean;
}

export const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  category, 
  onToggleComplete, 
  onEdit,
  isDragging = false 
}) => {
  const priorityColors = {
    low: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
    high: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
  };

  const priorityLabels = {
    low: 'Rendah',
    medium: 'Sedang',
    high: 'Tinggi'
  };

  return (
    <Card 
      className={`cursor-move transition-all duration-200 hover:shadow-md ${
        isDragging ? 'opacity-50 scale-95' : ''
      } ${task.completed ? 'opacity-60' : ''}`}
      onClick={() => onEdit?.(task)}
    >
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <Checkbox
            checked={task.completed}
            onCheckedChange={() => onToggleComplete(task.id)}
            className="mt-1"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h3 className={`font-medium text-sm ${
                task.completed ? 'line-through text-gray-500' : 'text-gray-900 dark:text-gray-100'
              }`}>
                {task.title}
              </h3>
              <Badge 
                variant="secondary" 
                className={`ml-2 text-xs ${priorityColors[task.priority]}`}
              >
                {priorityLabels[task.priority]}
              </Badge>
            </div>
            
            {task.description && (
              <p className={`text-xs mb-2 ${
                task.completed ? 'line-through text-gray-400' : 'text-gray-600 dark:text-gray-300'
              }`}>
                {task.description}
              </p>
            )}
            
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <span className={`${category.color} w-2 h-2 rounded-full`}></span>
                <span className="text-gray-500 dark:text-gray-400">{category.name}</span>
              </div>
              
              {task.dueDate && (
                <span className="text-gray-500 dark:text-gray-400">
                  {new Date(task.dueDate).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short'
                  })}
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
