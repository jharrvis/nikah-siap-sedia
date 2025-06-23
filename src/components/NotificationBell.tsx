
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Bell, AlertCircle, Calendar, Clock } from 'lucide-react';
import { Task } from '@/types';

interface NotificationBellProps {
  tasks: Task[];
  onFilterChange: (filter: string) => void;
}

export const NotificationBell: React.FC<NotificationBellProps> = ({ tasks, onFilterChange }) => {
  const importantTasks = tasks.filter(task => task.is_important && !task.completed);
  const todayTasks = tasks.filter(task => {
    const today = new Date().toISOString().split('T')[0];
    return task.due_date === today && !task.completed;
  });
  const overdueTasks = tasks.filter(task => 
    task.due_date && 
    new Date(task.due_date) < new Date() && 
    !task.completed
  );

  const totalNotifications = importantTasks.length + todayTasks.length + overdueTasks.length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-4 w-4" />
          {totalNotifications > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {totalNotifications}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        {totalNotifications === 0 ? (
          <DropdownMenuItem className="text-center text-gray-500 dark:text-gray-400">
            Tidak ada notifikasi
          </DropdownMenuItem>
        ) : (
          <>
            {importantTasks.length > 0 && (
              <DropdownMenuItem onClick={() => onFilterChange('important')} className="cursor-pointer">
                <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                <span>{importantTasks.length} Tugas Penting</span>
              </DropdownMenuItem>
            )}
            {todayTasks.length > 0 && (
              <DropdownMenuItem onClick={() => onFilterChange('today')} className="cursor-pointer">
                <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                <span>{todayTasks.length} Tugas Hari Ini</span>
              </DropdownMenuItem>
            )}
            {overdueTasks.length > 0 && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onFilterChange('overdue')} className="cursor-pointer">
                  <Clock className="h-4 w-4 mr-2 text-orange-500" />
                  <span>{overdueTasks.length} Tugas Terlambat</span>
                </DropdownMenuItem>
              </>
            )}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
