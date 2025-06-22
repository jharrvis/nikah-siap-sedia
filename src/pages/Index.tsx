
import React, { useState } from 'react';
import { AuthProvider, useAuth } from '@/components/AuthProvider';
import { ThemeProvider } from '@/components/ThemeProvider';
import { LoginForm } from '@/components/LoginForm';
import { Header } from '@/components/Header';
import { CountdownTimer } from '@/components/CountdownTimer';
import { WeddingDateSetter } from '@/components/WeddingDateSetter';
import { ViewModeToggle } from '@/components/ViewModeToggle';
import { TaskCard } from '@/components/TaskCard';
import { TaskModal } from '@/components/TaskModal';
import { CategoryModal } from '@/components/CategoryModal';
import { NotesPanel } from '@/components/NotesPanel';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Task, Category, ViewMode } from '@/types';
import { useSupabaseData } from '@/hooks/useSupabaseData';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Settings, Calendar, AlertTriangle, Star } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { categories, tasks, notes, loading, refetch } = useSupabaseData();
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editingCategory, setEditingCategory] = useState(null);

  const handleToggleComplete = async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    try {
      const { error } = await supabase
        .from('tasks')
        .update({
          completed: !task.completed,
          updated_at: new Date().toISOString()
        })
        .eq('id', taskId);

      if (error) throw error;
      
      toast({
        title: task.completed ? "Tugas dibatalkan" : "Tugas selesai!",
        description: `${task.title} ${task.completed ? 'belum selesai' : 'telah diselesaikan'}.`
      });
      
      refetch.fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
      toast({
        title: "Error",
        description: "Gagal mengupdate tugas.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus tugas ini?')) return;

    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId);

      if (error) throw error;
      
      toast({ title: "Tugas berhasil dihapus" });
      refetch.fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
      toast({
        title: "Error",
        description: "Gagal menghapus tugas.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus kategori ini? Semua tugas dalam kategori ini juga akan terhapus.')) return;

    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', categoryId);

      if (error) throw error;
      
      toast({ title: "Kategori berhasil dihapus" });
      refetch.fetchCategories();
      refetch.fetchTasks();
    } catch (error) {
      console.error('Error deleting category:', error);
      toast({
        title: "Error",
        description: "Gagal menghapus kategori.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-rose-600"></div>
      </div>
    );
  }

  const filteredTasks = selectedCategory === 'all' 
    ? tasks 
    : tasks.filter(task => task.category_id === selectedCategory);

  const completedTasks = tasks.filter(task => task.completed);
  const progressPercentage = tasks.length > 0 ? (completedTasks.length / tasks.length) * 100 : 0;

  const urgentTasks = tasks.filter(task => task.priority === 'urgent' && !task.completed);
  const importantTasks = tasks.filter(task => task.is_important && !task.completed);
  const overdueTasks = tasks.filter(task => 
    task.due_date && 
    new Date(task.due_date) < new Date() && 
    !task.completed
  );

  const renderListView = () => (
    <div className="space-y-3">
      {filteredTasks.map(task => {
        const category = categories.find(cat => cat.id === task.category_id);
        if (!category) return null;
        
        return (
          <TaskCard
            key={task.id}
            task={task}
            category={category}
            onToggleComplete={handleToggleComplete}
            onEdit={(task) => {
              setEditingTask(task);
              setIsTaskModalOpen(true);
            }}
            onDelete={handleDeleteTask}
          />
        );
      })}
    </div>
  );

  const renderGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredTasks.map(task => {
        const category = categories.find(cat => cat.id === task.category_id);
        if (!category) return null;
        
        return (
          <TaskCard
            key={task.id}
            task={task}
            category={category}
            onToggleComplete={handleToggleComplete}
            onEdit={(task) => {
              setEditingTask(task);
              setIsTaskModalOpen(true);
            }}
            onDelete={handleDeleteTask}
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Alert Cards */}
            {(urgentTasks.length > 0 || importantTasks.length > 0 || overdueTasks.length > 0) && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {urgentTasks.length > 0 && (
                  <Card className="border-red-200 bg-red-50 dark:bg-red-900/10">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                        <div>
                          <p className="font-medium text-red-800 dark:text-red-400">Urgent</p>
                          <p className="text-sm text-red-600">{urgentTasks.length} tugas</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                {importantTasks.length > 0 && (
                  <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-900/10">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <Star className="h-5 w-5 text-yellow-600" />
                        <div>
                          <p className="font-medium text-yellow-800 dark:text-yellow-400">Penting</p>
                          <p className="text-sm text-yellow-600">{importantTasks.length} tugas</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                {overdueTasks.length > 0 && (
                  <Card className="border-orange-200 bg-orange-50 dark:bg-orange-900/10">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-5 w-5 text-orange-600" />
                        <div>
                          <p className="font-medium text-orange-800 dark:text-orange-400">Terlambat</p>
                          <p className="text-sm text-orange-600">{overdueTasks.length} tugas</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* Progress Overview */}
            <Card>
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

            {/* Category Filter - Mobile Optimized */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('all')}
                className={`${selectedCategory === 'all' ? 'bg-rose-600 hover:bg-rose-700' : ''} text-xs`}
              >
                Semua ({tasks.length})
              </Button>
              {categories.map(category => {
                const categoryTasks = tasks.filter(task => task.category_id === category.id);
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className={`${selectedCategory === category.id ? 'bg-rose-600 hover:bg-rose-700' : ''} text-xs`}
                  >
                    <span className="mr-1">{category.icon}</span>
                    <span className="hidden sm:inline">{category.name}</span>
                    <span className="sm:hidden">{category.name.slice(0, 8)}</span>
                    ({categoryTasks.length})
                  </Button>
                );
              })}
            </div>

            {/* View Mode Toggle & Actions - Mobile Optimized */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <ViewModeToggle currentMode={viewMode} onModeChange={setViewMode} />
              
              <div className="flex flex-col sm:flex-row w-full sm:w-auto space-y-2 sm:space-y-0 sm:space-x-2">
                <Button 
                  size="sm" 
                  className="bg-rose-600 hover:bg-rose-700 w-full sm:w-auto"
                  onClick={() => {
                    setEditingTask(null);
                    setIsTaskModalOpen(true);
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Tugas
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full sm:w-auto"
                  onClick={() => {
                    setEditingCategory(null);
                    setIsCategoryModalOpen(true);
                  }}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Kelola Kategori
                </Button>
              </div>
            </div>

            {/* Tasks Display */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6">
              {filteredTasks.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <p>Tidak ada tugas untuk kategori ini.</p>
                  <p className="text-sm mt-2">Klik "Tambah Tugas" untuk memulai!</p>
                </div>
              ) : (
                <>
                  {viewMode === 'list' && renderListView()}
                  {viewMode === 'grid' && renderGridView()}
                  {viewMode === 'calendar' && renderCalendarView()}
                </>
              )}
            </div>
          </div>

          {/* Notes Panel - Mobile Optimized */}
          <div className="lg:col-span-1">
            <NotesPanel 
              notes={notes} 
              tasks={tasks}
              onRefresh={refetch.fetchNotes}
            />
          </div>
        </div>
      </main>

      {/* Modals */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false);
          setEditingTask(null);
        }}
        task={editingTask}
        categories={categories}
        onSave={() => {
          refetch.fetchTasks();
          refetch.fetchNotes();
        }}
      />

      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => {
          setIsCategoryModalOpen(false);
          setEditingCategory(null);
        }}
        category={editingCategory}
        onSave={() => {
          refetch.fetchCategories();
          refetch.fetchTasks();
        }}
      />
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
