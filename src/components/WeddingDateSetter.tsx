
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useAuth } from './AuthProvider';
import { useToast } from '@/hooks/use-toast';

export const WeddingDateSetter: React.FC = () => {
  const { user, updateWeddingDate } = useAuth();
  const [date, setDate] = useState(user?.weddingDate || '');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (date) {
      updateWeddingDate(date);
      toast({
        title: "Tanggal Berhasil Disimpan",
        description: "Tanggal pernikahan Anda telah diperbarui"
      });
    }
  };

  if (user?.weddingDate) {
    return null; // Sembunyikan jika tanggal sudah diset
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-rose-600 dark:text-rose-400">Atur Tanggal Pernikahan</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="wedding-date">Tanggal Pernikahan</Label>
            <Input
              id="wedding-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          <Button 
            type="submit"
            className="bg-rose-600 hover:bg-rose-700 dark:bg-rose-700 dark:hover:bg-rose-800"
          >
            Simpan Tanggal
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
