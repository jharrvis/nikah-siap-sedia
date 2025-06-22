
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, ArrowUpDown } from 'lucide-react';

interface TaskSearchFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  priorityFilter: string;
  onPriorityFilterChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
}

export const TaskSearchFilter: React.FC<TaskSearchFilterProps> = ({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  priorityFilter,
  onPriorityFilterChange,
  statusFilter,
  onStatusFilterChange,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Cari tugas..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Sort Dropdown */}
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-full sm:w-48">
            <ArrowUpDown className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Urutkan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="title">Nama A-Z</SelectItem>
            <SelectItem value="title_desc">Nama Z-A</SelectItem>
            <SelectItem value="priority">Prioritas Tinggi</SelectItem>
            <SelectItem value="priority_desc">Prioritas Rendah</SelectItem>
            <SelectItem value="due_date">Deadline Terdekat</SelectItem>
            <SelectItem value="created_at">Terbaru</SelectItem>
            <SelectItem value="created_at_desc">Terlama</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        {/* Priority Filter */}
        <Select value={priorityFilter} onValueChange={onPriorityFilterChange}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Semua Prioritas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Prioritas</SelectItem>
            <SelectItem value="urgent">Urgent</SelectItem>
            <SelectItem value="high">Tinggi</SelectItem>
            <SelectItem value="medium">Sedang</SelectItem>
            <SelectItem value="low">Rendah</SelectItem>
          </SelectContent>
        </Select>

        {/* Status Filter */}
        <Select value={statusFilter} onValueChange={onStatusFilterChange}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Semua Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Status</SelectItem>
            <SelectItem value="completed">Selesai</SelectItem>
            <SelectItem value="pending">Belum Selesai</SelectItem>
            <SelectItem value="important">Penting</SelectItem>
            <SelectItem value="overdue">Terlambat</SelectItem>
          </SelectContent>
        </Select>

        {/* Reset Filters */}
        <Button
          variant="outline"
          onClick={() => {
            onSearchChange('');
            onSortChange('created_at');
            onPriorityFilterChange('all');
            onStatusFilterChange('all');
          }}
          className="w-full sm:w-auto"
        >
          Reset Filter
        </Button>
      </div>
    </div>
  );
};
