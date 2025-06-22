
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Task, Category } from '@/types';
import { Calendar, MapPin, Star, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface TaskCardProps {
  task: Task;
  category: Category;
  onToggleComplete: (taskId: string) => void;
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: string) => void;
  isDragging?: boolean;
}

export const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  category, 
  onToggleComplete, 
  onEdit,
  onDelete,
  isDragging = false 
}) => {
  const priorityColors = {
    low: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
    high: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
    urgent: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
  };

  const priorityLabels = {
    low: 'Rendah',
    medium: 'Sedang',
    high: 'Tinggi',
    urgent: 'Urgent'
  };

  const isOverdue = task.due_date && new Date(task.due_date) < new Date() && !task.completed;

  return (
    <Card 
      className={`transition-all duration-200 hover:shadow-md ${
        isDragging ? 'opacity-50 scale-95' : ''
      } ${task.completed ? 'opacity-60' : ''} ${
        isOverdue ? 'border-red-300 bg-red-50 dark:bg-red-900/10' : ''
      }`}
    >
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <Checkbox
            checked={task.completed}
            onCheckedChange={() => onToggleComplete(task.id)}
            className="mt-1"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <h3 className={`font-medium text-sm ${
                  task.completed ? 'line-through text-gray-500' : 'text-gray-900 dark:text-gray-100'
                }`}>
                  {task.title}
                </h3>
                {task.is_important && (
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                )}
              </div>
              <div className="flex items-center space-x-1">
                <Badge 
                  variant="secondary" 
                  className={`text-xs ${priorityColors[task.priority]}`}
                >
                  {priorityLabels[task.priority]}
                </Badge>
                {onEdit && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onEdit(task)}
                    className="h-6 w-6 p-0"
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                )}
                {onDelete && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDelete(task.id)}
                    className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>
            
            {task.description && (
              <p className={`text-xs mb-2 ${
                task.completed ? 'line-through text-gray-400' : 'text-gray-600 dark:text-gray-300'
              }`}>
                {task.description}
              </p>
            )}

            {task.venue_location && (
              <div className="flex items-center space-x-1 mb-2">
                <MapPin className="h-3 w-3 text-gray-400" />
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {task.venue_location}
                </span>
              </div>
            )}
            
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <span className={`${category.color} w-2 h-2 rounded-full`}></span>
                <span className="text-gray-500 dark:text-gray-400">{category.name}</span>
              </div>
              
              {task.due_date && (
                <div className={`flex items-center space-x-1 ${
                  isOverdue ? 'text-red-600' : 'text-gray-500 dark:text-gray-400'
                }`}>
                  <Calendar className="h-3 w-3" />
                  <span>
                    {format(new Date(task.due_date), 'dd MMM yyyy', { locale: id })}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
