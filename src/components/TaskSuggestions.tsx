
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Category } from '@/types';
import { Plus } from 'lucide-react';

interface TaskSuggestion {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  timeline: string;
  venue_required?: boolean;
}

interface TaskSuggestionsProps {
  category: Category;
  onAddTask: (taskData: Partial<TaskSuggestion>) => void;
}

const getTaskSuggestions = (categoryName: string): TaskSuggestion[] => {
  const suggestions: Record<string, TaskSuggestion[]> = {
    'Venue & Catering': [
      { title: 'Survey venue pernikahan', description: 'Kunjungi 3-5 venue pilihan', priority: 'urgent', timeline: '12 bulan', venue_required: true },
      { title: 'Booking venue utama', description: 'Konfirmasi dan bayar DP venue', priority: 'urgent', timeline: '12 bulan' },
      { title: 'Pilih menu catering', description: 'Food tasting dan finalisasi menu', priority: 'high', timeline: '6 bulan' },
      { title: 'Konfirmasi jumlah tamu', description: 'Hitung kapasitas venue vs daftar tamu', priority: 'high', timeline: '3 bulan' },
      { title: 'Final meeting venue', description: 'Koordinasi teknis H-1', priority: 'medium', timeline: '1 minggu' }
    ],
    'Dokumentasi': [
      { title: 'Cari fotografer wedding', description: 'Research dan compare portfolio', priority: 'urgent', timeline: '12 bulan' },
      { title: 'Booking photographer', description: 'Kontrak dan bayar DP fotografer', priority: 'urgent', timeline: '10 bulan' },
      { title: 'Prewedding photoshoot', description: 'Sesi foto prewedding', priority: 'high', timeline: '3 bulan', venue_required: true },
      { title: 'Briefing photographer', description: 'Diskusi rundown dan shot list', priority: 'medium', timeline: '1 bulan' },
      { title: 'Koordinasi videographer', description: 'Sync dengan tim dokumentasi', priority: 'medium', timeline: '1 minggu' }
    ],
    'Fashion & Beauty': [
      { title: 'Fitting gaun pengantin', description: 'Pilih dan fitting dress utama', priority: 'high', timeline: '6 bulan' },
      { title: 'Cari MUA (Make Up Artist)', description: 'Trial makeup dan booking MUA', priority: 'high', timeline: '6 bulan' },
      { title: 'Fitting jas pengantin pria', description: 'Sewa atau beli jas pengantin', priority: 'high', timeline: '4 bulan' },
      { title: 'Final fitting pakaian', description: 'Pastikan semua pakaian pas', priority: 'medium', timeline: '1 bulan' },
      { title: 'Siapkan aksesoris', description: 'Sepatu, perhiasan, dan aksesoris lainnya', priority: 'medium', timeline: '1 bulan' }
    ],
    'Undangan': [
      { title: 'Design undangan', description: 'Buat konsep dan desain undangan', priority: 'high', timeline: '3 bulan' },
      { title: 'Cetak undangan', description: 'Produksi undangan sesuai jumlah tamu', priority: 'high', timeline: '2 bulan' },
      { title: 'Distribusi undangan', description: 'Bagikan undangan ke semua tamu', priority: 'medium', timeline: '1 bulan' },
      { title: 'Follow up RSVP', description: 'Konfirmasi kehadiran tamu', priority: 'medium', timeline: '2 minggu' },
      { title: 'Update daftar tamu', description: 'Finalisasi jumlah tamu yang hadir', priority: 'medium', timeline: '1 minggu' }
    ],
    'Administrasi': [
      { title: 'Urus surat nikah', description: 'Siapkan dokumen untuk catatan sipil', priority: 'urgent', timeline: '6 bulan' },
      { title: 'Daftar ke KUA/Gereja', description: 'Booking jadwal akad nikah', priority: 'urgent', timeline: '6 bulan' },
      { title: 'Bimbingan pra nikah', description: 'Ikuti sesi konseling pra nikah', priority: 'high', timeline: '3 bulan' },
      { title: 'Siapkan berkas lengkap', description: 'Kumpulkan semua dokumen yang diperlukan', priority: 'high', timeline: '2 bulan' },
      { title: 'Konfirmasi jadwal akad', description: 'Recheck jadwal dan persyaratan', priority: 'medium', timeline: '1 minggu' }
    ],
    'Dekorasi & Bunga': [
      { title: 'Konsep dekorasi venue', description: 'Tentukan tema dan konsep dekor', priority: 'high', timeline: '3 bulan' },
      { title: 'Booking dekorator', description: 'Pilih dan kontrak jasa dekorasi', priority: 'high', timeline: '3 bulan' },
      { title: 'Pilih bunga pengantin', description: 'Hand bouquet dan corsage', priority: 'medium', timeline: '1 bulan' },
      { title: 'Dekorasi meja tamu', description: 'Centerpiece dan setting meja', priority: 'medium', timeline: '2 minggu' },
      { title: 'Final check dekorasi', description: 'Pastikan semua sesuai konsep', priority: 'medium', timeline: '1 hari' }
    ],
    'Musik & Hiburan': [
      { title: 'Cari band/DJ wedding', description: 'Survey dan audisi entertainment', priority: 'high', timeline: '6 bulan' },
      { title: 'Booking entertainment', description: 'Kontrak dan bayar DP hiburan', priority: 'high', timeline: '4 bulan' },
      { title: 'Playlist lagu favorit', description: 'Siapkan daftar lagu yang diinginkan', priority: 'medium', timeline: '2 bulan' },
      { title: 'Sound system check', description: 'Test audio dan microphone', priority: 'medium', timeline: '1 minggu' },
      { title: 'Rehearsal entertainment', description: 'Gladi bersih dengan entertainer', priority: 'medium', timeline: '1 hari' }
    ],
    'Transportasi': [
      { title: 'Sewa mobil pengantin', description: 'Booking kendaraan untuk pengantin', priority: 'medium', timeline: '1 bulan' },
      { title: 'Transportasi keluarga', description: 'Atur kendaraan untuk keluarga besar', priority: 'medium', timeline: '1 bulan' },
      { title: 'Koordinasi sopir', description: 'Briefing rute dan jadwal', priority: 'low', timeline: '1 minggu' },
      { title: 'Backup transportation', description: 'Siapkan alternatif kendaraan', priority: 'low', timeline: '1 minggu' },
      { title: 'Check kendaraan', description: 'Pastikan kondisi mobil prima', priority: 'medium', timeline: '1 hari' }
    ],
    'Honeymoon': [
      { title: 'Tentukan destinasi', description: 'Pilih lokasi bulan madu', priority: 'medium', timeline: '3 bulan' },
      { title: 'Booking hotel/resort', description: 'Reservasi akomodasi honeymoon', priority: 'medium', timeline: '2 bulan' },
      { title: 'Urus visa/paspor', description: 'Siapkan dokumen perjalanan', priority: 'high', timeline: '2 bulan' },
      { title: 'Booking tiket pesawat', description: 'Beli tiket untuk honeymoon', priority: 'medium', timeline: '1 bulan' },
      { title: 'Siapkan itinerary', description: 'Rencana kegiatan selama honeymoon', priority: 'low', timeline: '2 minggu' }
    ],
    'Hari H': [
      { title: 'Final briefing vendor', description: 'Meeting terakhir dengan semua vendor', priority: 'urgent', timeline: '1 hari' },
      { title: 'Siapkan emergency kit', description: 'Kit darurat untuk hari H', priority: 'high', timeline: '1 hari' },
      { title: 'Koordinasi wedding organizer', description: 'Final check dengan WO', priority: 'urgent', timeline: '1 hari' },
      { title: 'Preparation checklist', description: 'Cek ulang semua persiapan', priority: 'urgent', timeline: '1 hari' },
      { title: 'Relax dan istirahat', description: 'Tidur cukup sebelum hari besar', priority: 'high', timeline: '1 hari' }
    ]
  };

  return suggestions[categoryName] || [];
};

export const TaskSuggestions: React.FC<TaskSuggestionsProps> = ({ category, onAddTask }) => {
  const suggestions = getTaskSuggestions(category.name);

  if (suggestions.length === 0) return null;

  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-orange-100 text-orange-800',
    urgent: 'bg-red-100 text-red-800'
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="text-lg flex items-center space-x-2">
          <span>{category.icon}</span>
          <span>Saran Tugas - {category.name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="border rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-800">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-sm">{suggestion.title}</h4>
                <Badge className={`text-xs ${priorityColors[suggestion.priority]}`}>
                  {suggestion.priority}
                </Badge>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                {suggestion.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  Timeline: {suggestion.timeline}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onAddTask({
                    title: suggestion.title,
                    description: suggestion.description,
                    priority: suggestion.priority
                  })}
                  className="h-7 text-xs"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Tambah
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
