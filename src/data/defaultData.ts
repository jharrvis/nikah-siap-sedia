
import { Category, Task } from '@/types';

export const defaultCategories: Category[] = [
  {
    id: '1',
    name: 'Venue & Catering',
    description: 'Tempat dan makanan untuk acara',
    color: 'bg-rose-500',
    icon: '🏛️',
    order: 1,
    timeline: '12-months'
  },
  {
    id: '2',
    name: 'Dokumentasi',
    description: 'Fotografer dan videographer',
    color: 'bg-purple-500',
    icon: '📸',
    order: 2,
    timeline: '12-months'
  },
  {
    id: '3',
    name: 'Fashion & Beauty',
    description: 'Gaun, jas, dan makeup',
    color: 'bg-pink-500',
    icon: '👗',
    order: 3,
    timeline: '6-months'
  },
  {
    id: '4',
    name: 'Undangan',
    description: 'Desain dan cetak undangan',
    color: 'bg-amber-500',
    icon: '💌',
    order: 4,
    timeline: '3-months'
  },
  {
    id: '5',
    name: 'Administrasi',
    description: 'Dokumen dan perizinan',
    color: 'bg-blue-500',
    icon: '📋',
    order: 5,
    timeline: '6-months'
  },
  {
    id: '6',
    name: 'Dekorasi & Bunga',
    description: 'Dekorasi venue dan bunga',
    color: 'bg-green-500',
    icon: '💐',
    order: 6,
    timeline: '3-months'
  },
  {
    id: '7',
    name: 'Musik & Hiburan',
    description: 'Band atau DJ untuk acara',
    color: 'bg-indigo-500',
    icon: '🎵',
    order: 7,
    timeline: '6-months'
  },
  {
    id: '8',
    name: 'Transportasi',
    description: 'Mobil pengantin dan tamu',
    color: 'bg-cyan-500',
    icon: '🚗',
    order: 8,
    timeline: '1-month'
  },
  {
    id: '9',
    name: 'Honeymoon',
    description: 'Perencanaan bulan madu',
    color: 'bg-orange-500',
    icon: '✈️',
    order: 9,
    timeline: '3-months'
  },
  {
    id: '10',
    name: 'Hari H',
    description: 'Persiapan di hari pernikahan',
    color: 'bg-red-500',
    icon: '💒',
    order: 10,
    timeline: 'day-of'
  }
];

export const defaultTasks: Task[] = [
  // Venue & Catering
  {
    id: '1',
    title: 'Survei dan booking venue resepsi',
    description: 'Kunjungi beberapa venue dan pilih yang terbaik',
    completed: false,
    categoryId: '1',
    priority: 'high',
    order: 1,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Survei dan booking venue akad nikah',
    description: 'Pilih tempat untuk akad nikah',
    completed: false,
    categoryId: '1',
    priority: 'high',
    order: 2,
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Pilih catering dan menu makanan',
    description: 'Food tasting dan finalisasi menu',
    completed: false,
    categoryId: '1',
    priority: 'high',
    order: 3,
    createdAt: new Date().toISOString()
  },
  
  // Dokumentasi
  {
    id: '4',
    title: 'Booking fotografer wedding',
    description: 'Pilih fotografer dengan portfolio terbaik',
    completed: false,
    categoryId: '2',
    priority: 'high',
    order: 1,
    createdAt: new Date().toISOString()
  },
  {
    id: '5',
    title: 'Booking videographer',
    description: 'Untuk video cinematic pernikahan',
    completed: false,
    categoryId: '2',
    priority: 'medium',
    order: 2,
    createdAt: new Date().toISOString()
  },
  {
    id: '6',
    title: 'Prewedding photoshoot',
    description: 'Sesi foto sebelum pernikahan',
    completed: false,
    categoryId: '2',
    priority: 'medium',
    order: 3,
    createdAt: new Date().toISOString()
  },

  // Fashion & Beauty
  {
    id: '7',
    title: 'Beli atau sewa gaun pengantin',
    description: 'Fitting dan finalisasi gaun',
    completed: false,
    categoryId: '3',
    priority: 'high',
    order: 1,
    createdAt: new Date().toISOString()
  },
  {
    id: '8',
    title: 'Beli atau sewa jas pengantin pria',
    description: 'Sesuaikan dengan tema wedding',
    completed: false,
    categoryId: '3',
    priority: 'high',
    order: 2,
    createdAt: new Date().toISOString()
  },
  {
    id: '9',
    title: 'Booking MUA (Make Up Artist)',
    description: 'Trial makeup dan book untuk hari H',
    completed: false,
    categoryId: '3',
    priority: 'high',
    order: 3,
    createdAt: new Date().toISOString()
  },
  {
    id: '10',
    title: 'Perawatan kecantikan pengantin',
    description: 'Facial, spa, dll sebelum hari H',
    completed: false,
    categoryId: '3',
    priority: 'medium',
    order: 4,
    createdAt: new Date().toISOString()
  },

  // Undangan
  {
    id: '11',
    title: 'Desain undangan pernikahan',
    description: 'Buat atau pesan desain undangan',
    completed: false,
    categoryId: '4',
    priority: 'high',
    order: 1,
    createdAt: new Date().toISOString()
  },
  {
    id: '12',
    title: 'Cetak undangan',
    description: 'Cetak sesuai jumlah tamu yang diundang',
    completed: false,
    categoryId: '4',
    priority: 'high',
    order: 2,
    createdAt: new Date().toISOString()
  },
  {
    id: '13',
    title: 'Distribusi undangan',
    description: 'Bagikan undangan ke semua tamu',
    completed: false,
    categoryId: '4',
    priority: 'medium',
    order: 3,
    createdAt: new Date().toISOString()
  },

  // Administrasi
  {
    id: '14',
    title: 'Urus surat nikah di KUA/Gereja',
    description: 'Daftar dan urus persyaratan nikah',
    completed: false,
    categoryId: '5',
    priority: 'high',
    order: 1,
    createdAt: new Date().toISOString()
  },
  {
    id: '15',
    title: 'Siapkan dokumen persyaratan',
    description: 'KTP, KK, akta kelahiran, dll',
    completed: false,
    categoryId: '5',
    priority: 'high',
    order: 2,
    createdAt: new Date().toISOString()
  },
  {
    id: '16',
    title: 'Buat daftar tamu undangan',
    description: 'Compile semua nama dan alamat tamu',
    completed: false,
    categoryId: '5',
    priority: 'medium',
    order: 3,
    createdAt: new Date().toISOString()
  },

  // Hari H
  {
    id: '17',
    title: 'Persiapan pengantin pagi hari',
    description: 'Makeup, dress up, dan persiapan final',
    completed: false,
    categoryId: '10',
    priority: 'high',
    order: 1,
    createdAt: new Date().toISOString()
  },
  {
    id: '18',
    title: 'Koordinasi dengan vendor',
    description: 'Pastikan semua vendor hadir tepat waktu',
    completed: false,
    categoryId: '10',
    priority: 'high',
    order: 2,
    createdAt: new Date().toISOString()
  }
];
