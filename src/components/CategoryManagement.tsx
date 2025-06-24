
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Edit, Trash2, Plus } from 'lucide-react';
import { Category } from '@/types';
import { CategoryModal } from './CategoryModal';
import { ConfirmModal } from './ConfirmModal';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface CategoryManagementProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  onRefresh: () => void;
}

export const CategoryManagement: React.FC<CategoryManagementProps> = ({
  isOpen,
  onClose,
  categories,
  onRefresh
}) => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setIsCategoryModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedCategory(null);
    setIsCategoryModalOpen(true);
  };

  const handleDeleteConfirm = (category: Category) => {
    setCategoryToDelete(category);
    setIsDeleteConfirmOpen(true);
  };

  const handleDelete = async () => {
    if (!categoryToDelete) return;

    try {
      // Check if category has tasks
      const { data: tasks, error: checkError } = await supabase
        .from('tasks')
        .select('id')
        .eq('category_id', categoryToDelete.id);

      if (checkError) throw checkError;

      if (tasks && tasks.length > 0) {
        toast({
          title: "Tidak dapat menghapus kategori",
          description: "Kategori masih memiliki tugas. Hapus atau pindahkan tugas terlebih dahulu.",
          variant: "destructive"
        });
        setIsDeleteConfirmOpen(false);
        setCategoryToDelete(null);
        return;
      }

      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', categoryToDelete.id);

      if (error) throw error;

      toast({
        title: "Kategori berhasil dihapus",
        description: `${categoryToDelete.name} telah dihapus.`
      });

      onRefresh();
      setIsDeleteConfirmOpen(false);
      setCategoryToDelete(null);
    } catch (error) {
      console.error('Error deleting category:', error);
      toast({
        title: "Error",
        description: "Gagal menghapus kategori.",
        variant: "destructive"
      });
    }
  };

  const handleCategoryModalClose = () => {
    setIsCategoryModalOpen(false);
    setSelectedCategory(null);
  };

  const handleCategorySave = () => {
    onRefresh();
    handleCategoryModalClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-full max-h-full w-screen h-screen p-0 m-0">
          <div className="flex flex-col h-full">
            <DialogHeader className="p-6 pb-0 border-b">
              <DialogTitle className="flex items-center justify-between">
                Kelola Kategori
                <Button onClick={handleAdd} className="bg-rose-600 hover:bg-rose-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Kategori
                </Button>
              </DialogTitle>
            </DialogHeader>
            
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="border rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">{category.icon}</span>
                        <div>
                          <h3 className="font-semibold">{category.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {category.description}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        <Badge variant="secondary" className={`${category.color} text-white`}>
                          {category.timeline}
                        </Badge>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(category)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteConfirm(category)}
                          className="hover:bg-red-50 hover:border-red-200"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 border-t bg-gray-50 dark:bg-gray-800">
              <Button variant="outline" onClick={onClose} className="w-full">
                Tutup
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={handleCategoryModalClose}
        category={selectedCategory}
        onSave={handleCategorySave}
      />

      <ConfirmModal
        isOpen={isDeleteConfirmOpen}
        onClose={() => {
          setIsDeleteConfirmOpen(false);
          setCategoryToDelete(null);
        }}
        onConfirm={handleDelete}
        title="Hapus Kategori"
        description={`Apakah Anda yakin ingin menghapus kategori "${categoryToDelete?.name}"? Aksi ini tidak dapat dibatalkan.`}
        confirmText="Hapus"
        cancelText="Batal"
        variant="destructive"
      />
    </>
  );
};
