
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from './AuthProvider';
import { LogOut, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const Header: React.FC = () => {
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
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
              <User className="h-4 w-4" />
              <span>{user?.name}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="flex items-center space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Keluar</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
