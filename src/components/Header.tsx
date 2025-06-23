
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useAuth } from './AuthProvider';
import { ThemeToggle } from './ThemeToggle';
import { AccountSettings } from './AccountSettings';
import { NotificationBell } from './NotificationBell';
import { LogOut, User, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Task } from '@/types';

interface HeaderProps {
  tasks?: Task[];
  onNotificationFilter?: (filter: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ tasks = [], onNotificationFilter = () => {} }) => {
  const { user, logout } = useAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Berhasil keluar",
        description: "Anda telah keluar dari aplikasi"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal keluar dari aplikasi",
        variant: "destructive"
      });
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">💒</span>
            <h1 className="text-xl font-bold text-rose-600 dark:text-rose-400">
              Wedding Planner
            </h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <NotificationBell tasks={tasks} onFilterChange={onNotificationFilter} />
            <ThemeToggle />
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">{user?.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <div className="flex items-center space-x-2 px-2 py-1.5">
                    <User className="h-4 w-4" />
                    <span>{user?.name}</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <AccountSettings />
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Keluar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};
