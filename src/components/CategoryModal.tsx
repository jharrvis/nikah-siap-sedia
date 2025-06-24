
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { Category } from '@/types';
import { useAuth } from './AuthProvider';
import { useToast } from '@/hooks/use-toast';
import { IconPicker } from './IconPicker';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: Category | null;
  onSave: () => void;
}

export const CategoryModal: React.FC<CategoryModalProps> = ({
  isOpen,
  onClose,
  category,
  onSave
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: 'bg-gray-500',
    icon: '📋',
    timeline: '3-months'
  });

  const colorOptions = [
    { value: 'bg-rose-500', label: 'Rose' },
    { value: 'bg-purple-500', label: 'Purple' },
    { value: 'bg-pink-500', label: 'Pink' },
    { value: 'bg-amber-500', label: 'Amber' },
    { value: 'bg-blue-500', label: 'Blue' },
    { value: 'bg-green-500', label: 'Green' },
    { value: 'bg-indigo-500', label: 'Indigo' },
    { value: 'bg-cyan-500', label: 'Cyan' },
    { value: 'bg-orange-500', label: 'Orange' },
    { value: 'bg-red-500', label: 'Red' }
  ];

  const timelineOptions = [
    { value: '12-months', label: '12 Bulan Sebelumnya' },
    { value: '6-months', label: '6 Bulan Sebelumnya' },
    { value: '3-months', label: '3 Bulan Sebelumnya' },
    { value: '1-month', label: '1 Bulan Sebelumnya' },
    { value: '1-week', label: '1 Minggu Sebelumnya' },
    { value: 'day-of', label: 'Hari H' }
  ];

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        description: category.description || '',
        color: category.color,
        icon: category.icon,
        timeline: category.timeline
      });
    } else {
      setFormData({
        name: '',
        description: '',
        color: 'bg-gray-500',
        icon: '📋',
        timeline: '3-months'
      });
    }
  }, [category]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    try {
      if (category) {
        // Update existing category
        const { error } = await supabase
          .from('categories')
          .update({
            name: formData.name,
            description: formData.description,
            color: formData.color,
            icon: formData.icon,
            timeline: formData.timeline,
            updated_at: new Date().toISOString()
          })
          .eq('id', category.id);

        if (error) throw error;
        
        toast({
          title: "Kategori berhasil diperbarui",
          description: `${formData.name} telah diperbarui.`
        });
      } else {
        // Create new category
        const { error } = await supabase
          .from('categories')
          .insert({
            name: formData.name,
            description: formData.description,
            color: formData.color,
            icon: formData.icon,
            timeline: formData.timeline,
            user_id: user.id,
            order_index: 999
          });

        if (error) throw error;
        
        toast({
          title: "Kategori berhasil ditambahkan",
          description: `${formData.name} telah ditambahkan.`
        });
      }

      onSave();
      onClose();
    } catch (error) {
      console.error('Error saving category:', error);
      toast({
        title: "Error",
        description: "Gagal menyimpan kategori.",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-full max-h-full w-screen h-screen p-0 m-0">
        <div className="flex flex-col h-full">
          <DialogHeader className="p-6 pb-0 border-b">
            <DialogTitle>
              {category ? 'Edit Kategori' : 'Tambah Kategori Baru'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto p-6">
            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
              <div>
                <Label htmlFor="name">Nama Kategori</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Masukkan nama kategori"
                  required
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Masukkan deskripsi kategori"
                  rows={3}
                  className="mt-2"
                />
              </div>

              <IconPicker
                selectedIcon={formData.icon}
                onSelectIcon={(icon) => setFormData({ ...formData, icon })}
              />

              <div>
                <Label htmlFor="color">Warna</Label>
                <Select value={formData.color} onValueChange={(value) => setFormData({ ...formData, color: value })}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {colorOptions.map((color) => (
                      <SelectItem key={color.value} value={color.value}>
                        <div className="flex items-center space-x-2">
                          <div className={`w-4 h-4 rounded ${color.value}`}></div>
                          <span>{color.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="timeline">Timeline</Label>
                <Select value={formData.timeline} onValueChange={(value) => setFormData({ ...formData, timeline: value })}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timelineOptions.map((timeline) => (
                      <SelectItem key={timeline.value} value={timeline.value}>
                        {timeline.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </form>
          </div>

          <div className="p-6 border-t bg-gray-50 dark:bg-gray-800">
            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 max-w-2xl mx-auto">
              <Button type="button" variant="outline" onClick={onClose} className="w-full sm:w-auto">
                Batal
              </Button>
              <Button onClick={handleSubmit} className="bg-rose-600 hover:bg-rose-700 w-full sm:w-auto">
                {category ? 'Perbarui' : 'Tambah'}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
