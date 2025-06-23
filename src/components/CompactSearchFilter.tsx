
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Search, Filter, SortAsc } from 'lucide-react';

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

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchOpen(false);
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Search Dialog */}
      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Search className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-full max-h-full w-screen h-screen p-0 m-0">
          <div className="flex flex-col h-full">
            <DialogHeader className="p-6 pb-0">
              <DialogTitle>Pencarian & Filter</DialogTitle>
            </DialogHeader>
            
            <div className="flex-1 overflow-y-auto p-6">
              <form onSubmit={handleSearchSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="search">Cari Tugas</Label>
                  <Input
                    id="search"
                    type="text"
                    placeholder="Cari berdasarkan judul atau deskripsi..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Urutkan Berdasarkan</Label>
                    <div className="space-y-2">
                      <Button
                        type="button"
                        variant={sortBy === 'title' ? 'default' : 'outline'}
                        onClick={() => onSortChange('title')}
                        className="w-full justify-start"
                      >
                        Judul
                      </Button>
                      <Button
                        type="button"
                        variant={sortBy === 'priority' ? 'default' : 'outline'}
                        onClick={() => onSortChange('priority')}
                        className="w-full justify-start"
                      >
                        Prioritas
                      </Button>
                      <Button
                        type="button"
                        variant={sortBy === 'due_date' ? 'default' : 'outline'}
                        onClick={() => onSortChange('due_date')}
                        className="w-full justify-start"
                      >
                        Tanggal
                      </Button>
                      <Button
                        type="button"
                        variant={sortBy === 'created_at' ? 'default' : 'outline'}
                        onClick={() => onSortChange('created_at')}
                        className="w-full justify-start"
                      >
                        Dibuat
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Filter Prioritas</Label>
                    <div className="space-y-2">
                      <Button
                        type="button"
                        variant={priorityFilter === 'all' ? 'default' : 'outline'}
                        onClick={() => onPriorityFilterChange('all')}
                        className="w-full justify-start"
                      >
                        Semua
                      </Button>
                      <Button
                        type="button"
                        variant={priorityFilter === 'urgent' ? 'default' : 'outline'}
                        onClick={() => onPriorityFilterChange('urgent')}
                        className="w-full justify-start"
                      >
                        Urgent
                      </Button>
                      <Button
                        type="button"
                        variant={priorityFilter === 'high' ? 'default' : 'outline'}
                        onClick={() => onPriorityFilterChange('high')}
                        className="w-full justify-start"
                      >
                        Tinggi
                      </Button>
                      <Button
                        type="button"
                        variant={priorityFilter === 'medium' ? 'default' : 'outline'}
                        onClick={() => onPriorityFilterChange('medium')}
                        className="w-full justify-start"
                      >
                        Sedang
                      </Button>
                      <Button
                        type="button"
                        variant={priorityFilter === 'low' ? 'default' : 'outline'}
                        onClick={() => onPriorityFilterChange('low')}
                        className="w-full justify-start"
                      >
                        Rendah
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Filter Status</Label>
                    <div className="space-y-2">
                      <Button
                        type="button"
                        variant={statusFilter === 'all' ? 'default' : 'outline'}
                        onClick={() => onStatusFilterChange('all')}
                        className="w-full justify-start"
                      >
                        Semua
                      </Button>
                      <Button
                        type="button"
                        variant={statusFilter === 'pending' ? 'default' : 'outline'}
                        onClick={() => onStatusFilterChange('pending')}
                        className="w-full justify-start"
                      >
                        Belum Selesai
                      </Button>
                      <Button
                        type="button"
                        variant={statusFilter === 'completed' ? 'default' : 'outline'}
                        onClick={() => onStatusFilterChange('completed')}
                        className="w-full justify-start"
                      >
                        Selesai
                      </Button>
                      <Button
                        type="button"
                        variant={statusFilter === 'overdue' ? 'default' : 'outline'}
                        onClick={() => onStatusFilterChange('overdue')}
                        className="w-full justify-start"
                      >
                        Terlambat
                      </Button>
                      <Button
                        type="button"
                        variant={statusFilter === 'important' ? 'default' : 'outline'}
                        onClick={() => onStatusFilterChange('important')}
                        className="w-full justify-start"
                      >
                        Penting
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsSearchOpen(false)}>
                    Tutup
                  </Button>
                  <Button type="submit">
                    Terapkan
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Filter Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onPriorityFilterChange('urgent')}>
            Prioritas Urgent
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onPriorityFilterChange('high')}>
            Prioritas Tinggi
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onStatusFilterChange('pending')}>
            Belum Selesai
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onStatusFilterChange('overdue')}>
            Terlambat
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onStatusFilterChange('important')}>
            Tugas Penting
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
