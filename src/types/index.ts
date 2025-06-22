
export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  category_id: string;
  user_id: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  order_index: number;
  due_date?: string;
  venue_location?: string;
  is_important: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  order_index: number;
  timeline: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface Note {
  id: string;
  title?: string;
  content: string;
  task_id?: string;
  user_id: string;
  is_general: boolean;
  created_at: string;
  updated_at: string;
}

export type ViewMode = 'list' | 'grid' | 'calendar';
