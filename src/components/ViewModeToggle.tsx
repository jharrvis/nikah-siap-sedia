
import React from 'react';
import { Button } from '@/components/ui/button';
import { ViewMode } from '@/types';
import { Calendar, Grid3X3, List } from 'lucide-react';

interface ViewModeToggleProps {
  currentMode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
}

export const ViewModeToggle: React.FC<ViewModeToggleProps> = ({ currentMode, onModeChange }) => {
  return (
    <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
      <Button
        variant={currentMode === 'list' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onModeChange('list')}
        className={currentMode === 'list' ? 'bg-rose-600 hover:bg-rose-700' : ''}
      >
        <List className="h-4 w-4 mr-2" />
        List
      </Button>
      <Button
        variant={currentMode === 'grid' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onModeChange('grid')}
        className={currentMode === 'grid' ? 'bg-rose-600 hover:bg-rose-700' : ''}
      >
        <Grid3X3 className="h-4 w-4 mr-2" />
        Grid
      </Button>
      <Button
        variant={currentMode === 'calendar' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onModeChange('calendar')}
        className={currentMode === 'calendar' ? 'bg-rose-600 hover:bg-rose-700' : ''}
      >
        <Calendar className="h-4 w-4 mr-2" />
        Calendar
      </Button>
    </div>
  );
};
