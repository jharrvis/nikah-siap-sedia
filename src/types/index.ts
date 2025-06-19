
export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  categoryId: string;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
  order: number;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  order: number;
  timeline: string; // '12-months', '6-months', '3-months', '1-month', '1-week', 'day-of'
}

export type ViewMode = 'list' | 'grid' | 'calendar';
