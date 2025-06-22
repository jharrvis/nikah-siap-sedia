
import { useState, useMemo } from 'react';
import { Task } from '@/types';

export const useTaskFilters = (tasks: Task[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredAndSortedTasks = useMemo(() => {
    let filteredTasks = [...tasks];

    // Apply search filter
    if (searchTerm) {
      filteredTasks = filteredTasks.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply priority filter
    if (priorityFilter !== 'all') {
      filteredTasks = filteredTasks.filter(task => task.priority === priorityFilter);
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      switch (statusFilter) {
        case 'completed':
          filteredTasks = filteredTasks.filter(task => task.completed);
          break;
        case 'pending':
          filteredTasks = filteredTasks.filter(task => !task.completed);
          break;
        case 'important':
          filteredTasks = filteredTasks.filter(task => task.is_important);
          break;
        case 'overdue':
          filteredTasks = filteredTasks.filter(task => 
            task.due_date && 
            new Date(task.due_date) < new Date() && 
            !task.completed
          );
          break;
      }
    }

    // Apply sorting
    filteredTasks.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'title_desc':
          return b.title.localeCompare(a.title);
        case 'priority':
          const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
          return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
        case 'priority_desc':
          const priorityOrderDesc = { urgent: 4, high: 3, medium: 2, low: 1 };
          return (priorityOrderDesc[a.priority] || 0) - (priorityOrderDesc[b.priority] || 0);
        case 'due_date':
          if (!a.due_date && !b.due_date) return 0;
          if (!a.due_date) return 1;
          if (!b.due_date) return -1;
          return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
        case 'created_at':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'created_at_desc':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        default:
          return 0;
      }
    });

    return filteredTasks;
  }, [tasks, searchTerm, sortBy, priorityFilter, statusFilter]);

  return {
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    priorityFilter,
    setPriorityFilter,
    statusFilter,
    setStatusFilter,
    filteredAndSortedTasks,
  };
};
