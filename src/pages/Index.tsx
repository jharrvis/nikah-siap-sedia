
import React, { useState } from 'react';
import { AuthProvider, useAuth } from '@/components/AuthProvider';
import { ThemeProvider } from '@/components/ThemeProvider';
import { LoginForm } from '@/components/LoginForm';
import { Header } from '@/components/Header';
import { CountdownTimer } from '@/components/CountdownTimer';
import { WeddingDateSetter } from '@/components/WeddingDateSetter';
import { TaskCard } from '@/components/TaskCard';
import { TaskModal } from '@/components/TaskModal';
import { CategoryModal } from '@/components/CategoryModal';
import { NotesPanel } from '@/components/NotesPanel';
import { FloatingButtons } from '@/components/FloatingButtons';
import { CompactSearchFilter } from '@/components/CompactSearchFilter';
import { TaskBoxes } from '@/components/TaskBoxes';
import { CompactProgress } from '@/components/CompactProgress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Task, Category } from '@/types';
import { useSupabaseData } from '@/hooks/useSupabaseData';
import { useTaskFilters } from '@/hooks/useTaskFilters';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { AlertTriangle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { categories, tasks, notes, loading, refetch } = useSupabaseData();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [showImportantOnly, setShowImportantOnly] = useState(false);

  // Get filtered tasks based on category and important filter
  const categoryFilteredTasks = selectedCategory === 'all' 
    ? tasks 
    : tasks.filter(task => task.category_id === selectedCategory);

  const displayTasks = showImportantOnly 
    ? categoryFilteredTasks.filter(task => task.is_important && !task.completed)
    : categoryFilteredTasks;

  // Use the task filters hook
  const {
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    priorityFilter,
    setPriorityFilter,
    statusFilter,
    setStatusFilter,
    filteredAndSortedTasks,
  } = useTaskFilters(displayTasks);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-rose-600"></div>
      </div>
    );
  }

  const completedTasks = tasks.filter(task => task.completed);
  const overdueTasks = tasks.filter(task => 
    task.due_date && 
    new Date(task.due_date) < new Date() && 
    !task.completed
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
            {/* Compact Progress */}
            <CompactProgress 
              completedTasks={completedTasks.length}
              totalTasks={tasks.length}
            />

            {/* Task Boxes */}
            <TaskBoxes tasks={tasks} />

            {/* Overdue Alert */}
            {overdueTasks.length > 0 && (
              <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 rounded-lg p-4 mb-4">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <span className="text-red-800 dark:text-red-400 font-medium">
                    {overdueTasks.length} tugas terlambat
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setStatusFilter('overdue')}
                    className="ml-auto text-red-600 border-red-200"
                  >
                    Lihat
                  </Button>
                </div>
              </div>
            )}

            {/* Search and Category Filter */}
            <div className="flex items-center space-x-4 overflow-x-auto pb-2">
              <div className="flex-shrink-0">
                <CompactSearchFilter
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                  priorityFilter={priorityFilter}
                  onPriorityFilterChange={setPriorityFilter}
                  statusFilter={statusFilter}
                  onStatusFilterChange={setStatusFilter}
                />
              </div>
              
              {/* Category Tabs - Scrollable */}
              <div className="flex space-x-2 flex-shrink-0">
                <Button
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    setSelectedCategory('all');
                    setShowImportantOnly(false);
                  }}
                  className={`${selectedCategory === 'all' ? 'bg-rose-600 hover:bg-rose-700' : ''} text-xs flex-shrink-0`}
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
                      onClick={() => {
                        setSelectedCategory(category.id);
                        setShowImportantOnly(false);
                      }}
                      className={`${selectedCategory === category.id ? 'bg-rose-600 hover:bg-rose-700' : ''} text-xs flex-shrink-0`}
                    >
                      <span className="mr-1">{category.icon}</span>
                      {category.name} ({categoryTasks.length})
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Show current filter status */}
            {(showImportantOnly || searchTerm || priorityFilter !== 'all' || statusFilter !== 'all') && (
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm text-gray-600 dark:text-gray-300">Filter aktif:</span>
                {showImportantOnly && (
                  <Badge variant="secondary" className="cursor-pointer" onClick={() => setShowImportantOnly(false)}>
                    Tugas Penting ✕
                  </Badge>
                )}
                {searchTerm && (
                  <Badge variant="secondary" className="cursor-pointer" onClick={() => setSearchTerm('')}>
                    "{searchTerm}" ✕
                  </Badge>
                )}
                {priorityFilter !== 'all' && (
                  <Badge variant="secondary" className="cursor-pointer" onClick={() => setPriorityFilter('all')}>
                    {priorityFilter} ✕
                  </Badge>
                )}
                {statusFilter !== 'all' && (
                  <Badge variant="secondary" className="cursor-pointer" onClick={() => setStatusFilter('all')}>
                    {statusFilter} ✕
                  </Badge>
                )}
              </div>
            )}

            {/* Tasks Display - List Only */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6">
              {filteredAndSortedTasks.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <p>Tidak ada tugas yang sesuai dengan filter.</p>
                  <p className="text-sm mt-2">Coba ubah filter atau tambah tugas baru!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredAndSortedTasks.map(task => {
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
              )}
            </div>
          </div>

          {/* Notes Panel */}
          <div className="lg:col-span-1">
            <NotesPanel 
              notes={notes} 
              tasks={tasks}
              onRefresh={refetch.fetchNotes}
            />
          </div>
        </div>
      </main>

      {/* Floating Action Buttons */}
      <FloatingButtons
        onAddTask={() => {
          setEditingTask(null);
          setIsTaskModalOpen(true);
        }}
        onManageCategories={() => {
          setEditingCategory(null);
          setIsCategoryModalOpen(true);
        }}
      />

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
