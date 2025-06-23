
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
    <div className="fixed bottom-6 right-6 flex flex-col space-y-3 z-50">
      <Button
        size="icon"
        className="h-12 w-12 bg-rose-600 hover:bg-rose-700 shadow-lg"
        onClick={onAddTask}
      >
        <Plus className="h-6 w-6" />
      </Button>
      <Button
        size="icon"
        variant="outline"
        className="h-12 w-12 shadow-lg bg-white dark:bg-gray-800"
        onClick={onManageCategories}
      >
        <Folder className="h-6 w-6" />
      </Button>
    </div>
  );
};
