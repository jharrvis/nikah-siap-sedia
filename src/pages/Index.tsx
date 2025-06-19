import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from '@/components/AuthProvider';
import { ThemeProvider } from '@/components/ThemeProvider';
import { LoginForm } from '@/components/LoginForm';
import { Header } from '@/components/Header';
import { CountdownTimer } from '@/components/CountdownTimer';
import { WeddingDateSetter } from '@/components/WeddingDateSetter';
import { ViewModeToggle } from '@/components/ViewModeToggle';
import { TaskCard } from '@/components/TaskCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Task, Category, ViewMode } from '@/types';
import { defaultCategories, defaultTasks } from '@/data/defaultData';
import { Plus, Settings, Calendar } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [categories, setCategories] = useState<Category[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    // Load data dari localStorage atau gunakan default
    const savedCategories = localStorage.getItem(`wedding_categories_${user?.id}`);
    const savedTasks = localStorage.getItem(`wedding_tasks_${user?.id}`);

    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    } else {
      setCategories(defaultCategories);
      localStorage.setItem(`wedding_categories_${user?.id}`, JSON.stringify(defaultCategories));
    }

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      setTasks(defaultTasks);
      localStorage.setItem(`wedding_tasks_${user?.id}`, JSON.stringify(defaultTasks));
    }
  }, [user?.id]);

  const handleToggleComplete = (taskId: string) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem(`wedding_tasks_${user?.id}`, JSON.stringify(updatedTasks));
  };

  const filteredTasks = selectedCategory === 'all' 
    ? tasks 
    : tasks.filter(task => task.categoryId === selectedCategory);

  const completedTasks = tasks.filter(task => task.completed);
  const progressPercentage = tasks.length > 0 ? (completedTasks.length / tasks.length) * 100 : 0;

  const renderListView = () => (
    <div className="space-y-3">
      {filteredTasks.map(task => {
        const category = categories.find(cat => cat.id === task.categoryId);
        if (!category) return null;
        
        return (
          <TaskCard
            key={task.id}
            task={task}
            category={category}
            onToggleComplete={handleToggleComplete}
          />
        );
      })}
    </div>
  );

  const renderGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredTasks.map(task => {
        const category = categories.find(cat => cat.id === task.categoryId);
        if (!category) return null;
        
        return (
          <TaskCard
            key={task.id}
            task={task}
            category={category}
            onToggleComplete={handleToggleComplete}
          />
        );
      })}
    </div>
  );

  const renderCalendarView = () => (
    <div className="text-center p-8 text-gray-500 dark:text-gray-400">
      <Calendar className="h-12 w-12 mx-auto mb-4" />
      <p>Tampilan kalender akan segera hadir!</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Wedding Date Setter */}
        <WeddingDateSetter />
        
        {/* Countdown Timer */}
        <div className="mb-6">
          <CountdownTimer weddingDate={user?.weddingDate || ''} />
        </div>

        {/* Progress Overview */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-rose-600 dark:text-rose-400">Progress Persiapan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Tugas Selesai</span>
                <span>{completedTasks.length} / {tasks.length}</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
              <p className="text-xs text-gray-600 dark:text-gray-300">
                {Math.round(progressPercentage)}% persiapan telah selesai
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Category Filter */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('all')}
              className={selectedCategory === 'all' ? 'bg-rose-600 hover:bg-rose-700' : ''}
            >
              Semua Tugas ({tasks.length})
            </Button>
            {categories.map(category => {
              const categoryTasks = tasks.filter(task => task.categoryId === category.id);
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={selectedCategory === category.id ? 'bg-rose-600 hover:bg-rose-700' : ''}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name} ({categoryTasks.length})
                </Button>
              );
            })}
          </div>
        </div>

        {/* View Mode Toggle & Actions */}
        <div className="flex justify-between items-center mb-6">
          <ViewModeToggle currentMode={viewMode} onModeChange={setViewMode} />
          
          <div className="flex space-x-2">
            <Button size="sm" className="bg-rose-600 hover:bg-rose-700">
              <Plus className="h-4 w-4 mr-2" />
              Tambah Tugas
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Kelola Kategori
            </Button>
          </div>
        </div>

        {/* Tasks Display */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <p>Tidak ada tugas untuk kategori ini.</p>
            </div>
          ) : (
            <>
              {viewMode === 'list' && renderListView()}
              {viewMode === 'grid' && renderGridView()}
              {viewMode === 'calendar' && renderCalendarView()}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

const Index = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AuthenticatedApp />
      </AuthProvider>
    </ThemeProvider>
  );
};

const AuthenticatedApp = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <LoginForm />;
  }
  
  return <Dashboard />;
};

export default Index;
