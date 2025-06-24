
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface FilterDropdownProps {
  sortBy: string;
  onSortChange: (value: string) => void;
  priorityFilter: string;
  onPriorityFilterChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  sortBy,
  onSortChange,
  priorityFilter,
  onPriorityFilterChange,
  statusFilter,
  onStatusFilterChange,
}) => {
  const hasActiveFilters = priorityFilter !== 'all' || statusFilter !== 'all' || sortBy !== 'created_at';

  const handleReset = () => {
    onSortChange('created_at');
    onPriorityFilterChange('all');
    onStatusFilterChange('all');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="relative">
          <Filter className="h-4 w-4" />
          {hasActiveFilters && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs">
              •
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            Urutkan
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
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
              Terbaru Ditambahkan
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator />

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            Prioritas
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem onClick={() => onPriorityFilterChange('all')}>
              Semua Prioritas
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onPriorityFilterChange('urgent')}>
              Urgent
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onPriorityFilterChange('high')}>
              Tinggi
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onPriorityFilterChange('medium')}>
              Sedang
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onPriorityFilterChange('low')}>
              Rendah
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            Status
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem onClick={() => onStatusFilterChange('all')}>
              Semua Status
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStatusFilterChange('pending')}>
              Belum Selesai
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStatusFilterChange('completed')}>
              Selesai
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStatusFilterChange('overdue')}>
              Terlambat
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStatusFilterChange('important')}>
              Penting
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        {hasActiveFilters && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleReset}>
              Reset Filter
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
