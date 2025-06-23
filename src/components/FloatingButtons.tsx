
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Folder } from 'lucide-react';

interface FloatingButtonsProps {
  onAddTask: () => void;
  onManageCategories: () => void;
}

export const FloatingButtons: React.FC<FloatingButtonsProps> = ({
  onAddTask,
  onManageCategories,
}) => {
  return (
    <div className="fixed bottom-20 right-6 flex flex-col space-y-3 z-50">
      <Button
        size="icon"
        className="h-14 w-14 rounded-full bg-rose-600 hover:bg-rose-700 shadow-lg border-2 border-white dark:border-gray-800"
        onClick={onAddTask}
      >
        <Plus className="h-6 w-6" />
      </Button>
      <Button
        size="icon"
        variant="outline"
        className="h-14 w-14 rounded-full shadow-lg bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600"
        onClick={onManageCategories}
      >
        <Folder className="h-6 w-6" />
      </Button>
    </div>
  );
};
