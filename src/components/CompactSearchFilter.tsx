
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Search, Filter, X } from 'lucide-react';

interface CompactSearchFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  priorityFilter: string;
  onPriorityFilterChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
}

export const CompactSearchFilter: React.FC<CompactSearchFilterProps> = ({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  priorityFilter,
  onPriorityFilterChange,
  statusFilter,
  onStatusFilterChange,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const hasActiveFilters = searchTerm || priorityFilter !== 'all' || statusFilter !== 'all';

  return (
    <div className="flex items-center space-x-2">
      {/* Search Dialog */}
      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogTrigger asChild>
          <Button 
            variant={hasActiveFilters ? "default" : "outline"} 
            size="sm"
            className={hasActiveFilters ? "bg-rose-600 hover:bg-rose-700" : ""}
          >
            <Search className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Pencarian & Filter</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Cari tugas..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={priorityFilter !== 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => onPriorityFilterChange(priorityFilter === 'urgent' ? 'all' : 'urgent')}
                className={priorityFilter === 'urgent' ? 'bg-red-600 hover:bg-red-700' : ''}
              >
                Urgent
              </Button>
              <Button
                variant={priorityFilter !== 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => onPriorityFilterChange(priorityFilter === 'high' ? 'all' : 'high')}
                className={priorityFilter === 'high' ? 'bg-orange-600 hover:bg-orange-700' : ''}
              >
                Tinggi
              </Button>
              <Button
                variant={statusFilter !== 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => onStatusFilterChange(statusFilter === 'completed' ? 'all' : 'completed')}
                className={statusFilter === 'completed' ? 'bg-green-600 hover:bg-green-700' : ''}
              >
                Selesai
              </Button>
            </div>

            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  onSearchChange('');
                  onPriorityFilterChange('all');
                  onStatusFilterChange('all');
                }}
                className="w-full"
              >
                <X className="h-4 w-4 mr-2" />
                Reset Filter
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Sort Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => onSortChange('title')}>
            Nama A-Z
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onSortChange('priority')}>
            Prioritas Tinggi
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onSortChange('due_date')}>
            Deadline Terdekat
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onSortChange('created_at')}>
            Terbaru
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
