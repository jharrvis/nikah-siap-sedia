
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger }

 from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Note, Task } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthProvider';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, StickyNote } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface NotesPanelProps {
  notes: Note[];
  tasks: Task[];
  onRefresh: () => void;
}

export const NotesPanel: React.FC<NotesPanelProps> = ({ notes, tasks, onRefresh }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    task_id: '',
    is_general: true
  });

  const generalNotes = notes.filter(note => note.is_general);
  const taskNotes = notes.filter(note => !note.is_general);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    try {
      if (editingNote) {
        const { error } = await supabase
          .from('notes')
          .update({
            title: formData.title || null,
            content: formData.content,
            task_id: formData.is_general ? null : formData.task_id || null,
            is_general: formData.is_general,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingNote.id);

        if (error) throw error;
        toast({ title: "Catatan berhasil diperbarui" });
      } else {
        const { error } = await supabase
          .from('notes')
          .insert({
            title: formData.title || null,
            content: formData.content,
            task_id: formData.is_general ? null : formData.task_id || null,
            is_general: formData.is_general,
            user_id: user.id
          });

        if (error) throw error;
        toast({ title: "Catatan berhasil ditambahkan" });
      }

      onRefresh();
      setIsModalOpen(false);
      setEditingNote(null);
      setFormData({ title: '', content: '', task_id: '', is_general: true });
    } catch (error) {
      console.error('Error saving note:', error);
      toast({
        title: "Error",
        description: "Gagal menyimpan catatan.",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (note: Note) => {
    setEditingNote(note);
    setFormData({
      title: note.title || '',
      content: note.content,
      task_id: note.task_id || '',
      is_general: note.is_general
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (noteId: string) => {
    try {
      const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', noteId);

      if (error) throw error;
      
      toast({ title: "Catatan berhasil dihapus" });
      onRefresh();
    } catch (error) {
      console.error('Error deleting note:', error);
      toast({
        title: "Error",
        description: "Gagal menghapus catatan.",
        variant: "destructive"
      });
    }
  };

  const getTaskTitle = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    return task ? task.title : 'Task tidak ditemukan';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <StickyNote className="h-5 w-5" />
            <span>Catatan</span>
          </CardTitle>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-rose-600 hover:bg-rose-700">
                <Plus className="h-4 w-4 mr-2" />
                Tambah Catatan
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>
                  {editingNote ? 'Edit Catatan' : 'Tambah Catatan Baru'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.is_general}
                      onChange={(e) => setFormData({ ...formData, is_general: e.target.checked })}
                    />
                    <span>Catatan Umum</span>
                  </label>
                </div>

                {!formData.is_general && (
                  <div>
                    <label className="block text-sm font-medium mb-1">Pilih Tugas</label>
                    <select
                      value={formData.task_id}
                      onChange={(e) => setFormData({ ...formData, task_id: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md"
                      required={!formData.is_general}
                    >
                      <option value="">Pilih tugas...</option>
                      {tasks.map(task => (
                        <option key={task.id} value={task.id}>{task.title}</option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-1">Judul (Opsional)</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Masukkan judul catatan"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Isi Catatan</label>
                  <Textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Tulis catatan Anda..."
                    rows={4}
                    required
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                    Batal
                  </Button>
                  <Button type="submit" className="bg-rose-600 hover:bg-rose-700">
                    {editingNote ? 'Perbarui' : 'Simpan'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="general">Catatan Umum ({generalNotes.length})</TabsTrigger>
            <TabsTrigger value="tasks">Catatan Tugas ({taskNotes.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-3 mt-4">
            {generalNotes.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">
                Belum ada catatan umum
              </p>
            ) : (
              generalNotes.map(note => (
                <Card key={note.id} className="bg-yellow-50 dark:bg-yellow-900/10">
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start mb-2">
                      {note.title && (
                        <h4 className="font-medium text-sm">{note.title}</h4>
                      )}
                      <div className="flex space-x-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEdit(note)}
                          className="h-6 w-6 p-0"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(note.id)}
                          className="h-6 w-6 p-0 text-red-500"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      {note.content}
                    </p>
                    <p className="text-xs text-gray-500">
                      {format(new Date(note.created_at), 'dd MMM yyyy, HH:mm', { locale: id })}
                    </p>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
          
          <TabsContent value="tasks" className="space-y-3 mt-4">
            {taskNotes.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">
                Belum ada catatan untuk tugas
              </p>
            ) : (
              taskNotes.map(note => (
                <Card key={note.id} className="bg-blue-50 dark:bg-blue-900/10">
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        {note.title && (
                          <h4 className="font-medium text-sm">{note.title}</h4>
                        )}
                        <Badge variant="outline" className="text-xs mb-2">
                          {getTaskTitle(note.task_id!)}
                        </Badge>
                      </div>
                      <div className="flex space-x-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEdit(note)}
                          className="h-6 w-6 p-0"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(note.id)}
                          className="h-6 w-6 p-0 text-red-500"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      {note.content}
                    </p>
                    <p className="text-xs text-gray-500">
                      {format(new Date(note.created_at), 'dd MMM yyyy, HH:mm', { locale: id })}
                    </p>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
