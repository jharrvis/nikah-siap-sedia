
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { supabase } from '@/integrations/supabase/client';
import { Task, Category } from '@/types';
import { useAuth } from './AuthProvider';
import { useToast } from '@/hooks/use-toast';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task?: Task | null;
  categories: Category[];
  onSave: () => void;
}

export const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  task,
  categories,
  onSave
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category_id: '',
    priority: 'medium' as 'low' | 'medium' | 'high' | 'urgent',
    due_date: '',
    venue_location: '',
    is_important: false
  });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const priorityOptions = [
    { value: 'low', label: 'Rendah', color: 'text-green-600' },
    { value: 'medium', label: 'Sedang', color: 'text-yellow-600' },
    { value: 'high', label: 'Tinggi', color: 'text-orange-600' },
    { value: 'urgent', label: 'Urgent', color: 'text-red-600' }
  ];

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description || '',
        category_id: task.category_id,
        priority: task.priority,
        due_date: task.due_date || '',
        venue_location: task.venue_location || '',
        is_important: task.is_important
      });
      if (task.due_date) {
        setSelectedDate(new Date(task.due_date));
      }
    } else {
      setFormData({
        title: '',
        description: '',
        category_id: '',
        priority: 'medium',
        due_date: '',
        venue_location: '',
        is_important: false
      });
      setSelectedDate(undefined);
    }
  }, [task]);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setFormData({
      ...formData,
      due_date: date ? format(date, 'yyyy-MM-dd') : ''
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    try {
      if (task) {
        // Update existing task
        const { error } = await supabase
          .from('tasks')
          .update({
            title: formData.title,
            description: formData.description,
            category_id: formData.category_id,
            priority: formData.priority,
            due_date: formData.due_date || null,
            venue_location: formData.venue_location || null,
            is_important: formData.is_important,
            updated_at: new Date().toISOString()
          })
          .eq('id', task.id);

        if (error) throw error;
        
        toast({
          title: "Tugas berhasil diperbarui",
          description: `${formData.title} telah diperbarui.`
        });
      } else {
        // Create new task
        const { error } = await supabase
          .from('tasks')
          .insert({
            title: formData.title,
            description: formData.description,
            category_id: formData.category_id,
            priority: formData.priority,
            due_date: formData.due_date || null,
            venue_location: formData.venue_location || null,
            is_important: formData.is_important,
            user_id: user.id,
            order_index: 999,
            completed: false
          });

        if (error) throw error;
        
        toast({
          title: "Tugas berhasil ditambahkan",
          description: `${formData.title} telah ditambahkan.`
        });
      }

      onSave();
      onClose();
    } catch (error) {
      console.error('Error saving task:', error);
      toast({
        title: "Error",
        description: "Gagal menyimpan tugas.",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {task ? 'Edit Tugas' : 'Tambah Tugas Baru'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Judul Tugas</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Masukkan judul tugas"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="description">Deskripsi</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Masukkan deskripsi tugas"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="category">Kategori</Label>
            <Select value={formData.category_id} onValueChange={(value) => setFormData({ ...formData, category_id: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih kategori" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    <div className="flex items-center space-x-2">
                      <span>{category.icon}</span>
                      <span>{category.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="priority">Prioritas</Label>
            <Select value={formData.priority} onValueChange={(value: any) => setFormData({ ...formData, priority: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {priorityOptions.map((priority) => (
                  <SelectItem key={priority.value} value={priority.value}>
                    <span className={priority.color}>{priority.label}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Tanggal Deadline</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, 'dd MMMM yyyy', { locale: id }) : 'Pilih tanggal'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label htmlFor="venue">Venue/Lokasi</Label>
            <Input
              id="venue"
              value={formData.venue_location}
              onChange={(e) => setFormData({ ...formData, venue_location: e.target.value })}
              placeholder="Masukkan venue atau lokasi"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="important"
              checked={formData.is_important}
              onCheckedChange={(checked) => setFormData({ ...formData, is_important: checked as boolean })}
            />
            <Label htmlFor="important">Tandai sebagai penting</Label>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit" className="bg-rose-600 hover:bg-rose-700">
              {task ? 'Perbarui' : 'Tambah'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
