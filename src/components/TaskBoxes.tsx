
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Task } from '@/types';
import { Calendar, Star, ChevronDown, ChevronUp } from 'lucide-react';

interface TaskBoxesProps {
  tasks: Task[];
  onTaskClick?: (taskId: string) => void;
}

export const TaskBoxes: React.FC<TaskBoxesProps> = ({ tasks, onTaskClick }) => {
  const [isImportantExpanded, setIsImportantExpanded] = useState(true);
  const [isTodayExpanded, setIsTodayExpanded] = useState(true);
  const [isUpcomingExpanded, setIsUpcomingExpanded] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const importantTasks = tasks.filter(task => task.is_important && !task.completed);
  const todayTasks = tasks.filter(task => {
    if (!task.due_date || task.completed) return false;
    const dueDate = new Date(task.due_date);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate.getTime() === today.getTime();
  });
  
  const upcomingTasks = tasks.filter(task => {
    if (!task.due_date || task.completed) return false;
    const dueDate = new Date(task.due_date);
    return dueDate > tomorrow;
  }).slice(0, 5);

  const TaskList = ({ tasks, limit }: { tasks: Task[], limit?: number }) => (
    <div className="space-y-2">
      {(limit ? tasks.slice(0, limit) : tasks).map(task => (
        <div 
          key={task.id} 
          className="flex items-center space-x-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-800 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
          onClick={() => onTaskClick?.(task.id)}
        >
          <div className="flex-1 truncate">
            <p className="text-sm font-medium truncate">{task.title}</p>
            {task.due_date && (
              <p className="text-xs text-gray-500">
                {new Date(task.due_date).toLocaleDateString('id-ID')}
              </p>
            )}
          </div>
          <Badge variant={task.priority === 'urgent' ? 'destructive' : 'secondary'} className="text-xs">
            {task.priority}
          </Badge>
        </div>
      ))}
      {tasks.length === 0 && (
        <p className="text-sm text-gray-500 text-center py-4">Tidak ada tugas</p>
      )}
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Important Tasks */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium flex items-center">
              <Star className="h-4 w-4 mr-2 text-yellow-500" />
              Penting ({importantTasks.length})
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsImportantExpanded(!isImportantExpanded)}
            >
              {isImportantExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </CardHeader>
        {isImportantExpanded && (
          <CardContent className="pt-0">
            <TaskList tasks={importantTasks} limit={3} />
          </CardContent>
        )}
      </Card>

      {/* Today's Tasks */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-blue-500" />
              Hari Ini ({todayTasks.length})
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsTodayExpanded(!isTodayExpanded)}
            >
              {isTodayExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </CardHeader>
        {isTodayExpanded && (
          <CardContent className="pt-0">
            <TaskList tasks={todayTasks} limit={3} />
          </CardContent>
        )}
      </Card>

      {/* Upcoming Tasks */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-green-500" />
              Akan Datang ({upcomingTasks.length})
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsUpcomingExpanded(!isUpcomingExpanded)}
            >
              {isUpcomingExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </CardHeader>
        {isUpcomingExpanded && (
          <CardContent className="pt-0">
            <TaskList tasks={upcomingTasks} limit={3} />
          </CardContent>
        )}
      </Card>
    </div>
  );
};
