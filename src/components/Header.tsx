
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from './AuthProvider';
import { useTheme } from './ThemeProvider';
import { User, Sun, Moon, LogOut } from 'lucide-react';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">💐</div>
          <div>
            <h1 className="text-xl font-bold text-rose-600 dark:text-rose-400">Wedding Checklist</h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">Selamat datang, {user?.name}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-gray-600 dark:text-gray-300"
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-600 dark:text-gray-300"
          >
            <User className="h-5 w-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={logout}
            className="text-gray-600 dark:text-gray-300"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};
