
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Task, Category, Note } from '@/types';
import { useAuth } from '@/components/AuthProvider';

export const useSupabaseData = () => {
  const { user } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  // Default categories untuk user baru
  const defaultCategories = [
    { name: 'Venue & Catering', description: 'Tempat dan makanan untuk acara', color: 'bg-rose-500', icon: '🏛️', timeline: '12-months' },
    { name: 'Dokumentasi', description: 'Fotografer dan videographer', color: 'bg-purple-500', icon: '📸', timeline: '12-months' },
    { name: 'Fashion & Beauty', description: 'Gaun, jas, dan makeup', color: 'bg-pink-500', icon: '👗', timeline: '6-months' },
    { name: 'Undangan', description: 'Desain dan cetak undangan', color: 'bg-amber-500', icon: '💌', timeline: '3-months' },
    { name: 'Administrasi', description: 'Dokumen dan perizinan', color: 'bg-blue-500', icon: '📋', timeline: '6-months' },
    { name: 'Dekorasi & Bunga', description: 'Dekorasi venue dan bunga', color: 'bg-green-500', icon: '💐', timeline: '3-months' },
    { name: 'Musik & Hiburan', description: 'Band atau DJ untuk acara', color: 'bg-indigo-500', icon: '🎵', timeline: '6-months' },
    { name: 'Transportasi', description: 'Mobil pengantin dan tamu', color: 'bg-cyan-500', icon: '🚗', timeline: '1-month' },
    { name: 'Honeymoon', description: 'Perencanaan bulan madu', color: 'bg-orange-500', icon: '✈️', timeline: '3-months' },
    { name: 'Hari H', description: 'Persiapan di hari pernikahan', color: 'bg-red-500', icon: '💒', timeline: 'day-of' }
  ];

  const fetchCategories = async () => {
    if (!user?.id) return;
    
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('user_id', user.id)
      .order('order_index');
    
    if (error) {
      console.error('Error fetching categories:', error);
      return;
    }

    if (data.length === 0) {
      // Buat kategori default untuk user baru
      const defaultCategoriesWithUserId = defaultCategories.map((cat, index) => ({
        ...cat,
        user_id: user.id,
        order_index: index
      }));
      
      const { data: newCategories, error: createError } = await supabase
        .from('categories')
        .insert(defaultCategoriesWithUserId)
        .select();
      
      if (!createError && newCategories) {
        setCategories(newCategories);
      }
    } else {
      setCategories(data);
    }
  };

  const fetchTasks = async () => {
    if (!user?.id) return;
    
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', user.id)
      .order('order_index');
    
    if (error) {
      console.error('Error fetching tasks:', error);
      return;
    }
    
    setTasks(data || []);
  };

  const fetchNotes = async () => {
    if (!user?.id) return;
    
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching notes:', error);
      return;
    }
    
    setNotes(data || []);
  };

  useEffect(() => {
    if (user?.id) {
      Promise.all([fetchCategories(), fetchTasks(), fetchNotes()]).finally(() => {
        setLoading(false);
      });
    }
  }, [user?.id]);

  return {
    categories,
    tasks,
    notes,
    loading,
    refetch: { fetchCategories, fetchTasks, fetchNotes }
  };
};
