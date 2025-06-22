
import { Category, Task } from '@/types';

export const defaultCategories: Category[] = [
  {
    id: '1',
    name: 'Venue & Catering',
    description: 'Tempat dan makanan untuk acara',
    color: 'bg-rose-500',
    icon: '🏛️',
    order_index: 1,
    timeline: '12-months',
    user_id: '',
    created_at: '',
    updated_at: ''
  },
  {
    id: '2',
    name: 'Dokumentasi',
    description: 'Fotografer dan videographer',
    color: 'bg-purple-500',
    icon: '📸',
    order_index: 2,
    timeline: '12-months',
    user_id: '',
    created_at: '',
    updated_at: ''
  },
  {
    id: '3',
    name: 'Fashion & Beauty',
    description: 'Gaun, jas, dan makeup',
    color: 'bg-pink-500',
    icon: '👗',
    order_index: 3,
    timeline: '6-months',
    user_id: '',
    created_at: '',
    updated_at: ''
  },
  {
    id: '4',
    name: 'Undangan',
    description: 'Desain dan cetak undangan',
    color: 'bg-amber-500',
    icon: '💌',
    order_index: 4,
    timeline: '3-months',
    user_id: '',
    created_at: '',
    updated_at: ''
  },
  {
    id: '5',
    name: 'Administrasi',
    description: 'Dokumen dan perizinan',
    color: 'bg-blue-500',
    icon: '📋',
    order_index: 5,
    timeline: '6-months',
    user_id: '',
    created_at: '',
    updated_at: ''
  },
  {
    id: '6',
    name: 'Dekorasi & Bunga',
    description: 'Dekorasi venue dan bunga',
    color: 'bg-green-500',
    icon: '💐',
    order_index: 6,
    timeline: '3-months',
    user_id: '',
    created_at: '',
    updated_at: ''
  },
  {
    id: '7',
    name: 'Musik & Hiburan',
    description: 'Band atau DJ untuk acara',
    color: 'bg-indigo-500',
    icon: '🎵',
    order_index: 7,
    timeline: '6-months',
    user_id: '',
    created_at: '',
    updated_at: ''
  },
  {
    id: '8',
    name: 'Transportasi',
    description: 'Mobil pengantin dan tamu',
    color: 'bg-cyan-500',
    icon: '🚗',
    order_index: 8,
    timeline: '1-month',
    user_id: '',
    created_at: '',
    updated_at: ''
  },
  {
    id: '9',
    name: 'Honeymoon',
    description: 'Perencanaan bulan madu',
    color: 'bg-orange-500',
    icon: '✈️',
    order_index: 9,
    timeline: '3-months',
    user_id: '',
    created_at: '',
    updated_at: ''
  },
  {
    id: '10',
    name: 'Hari H',
    description: 'Persiapan di hari pernikahan',
    color: 'bg-red-500',
    icon: '💒',
    order_index: 10,
    timeline: 'day-of',
    user_id: '',
    created_at: '',
    updated_at: ''
  }
];

export const defaultTasks: Task[] = [
  // Venue & Catering
  {
    id: '1',
    title: 'Survei dan booking venue resepsi',
    description: 'Kunjungi beberapa venue dan pilih yang terbaik',
    completed: false,
    category_id: '1',
    user_id: '',
    priority: 'high',
    order_index: 1,
    is_important: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Survei dan booking venue akad nikah',
    description: 'Pilih tempat untuk akad nikah',
    completed: false,
    category_id: '1',
    user_id: '',
    priority: 'high',
    order_index: 2,
    is_important: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Pilih catering dan menu makanan',
    description: 'Food tasting dan finalisasi menu',
    completed: false,
    category_id: '1',
    user_id: '',
    priority: 'high',
    order_index: 3,
    is_important: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  
  // Dokumentasi
  {
    id: '4',
    title: 'Booking fotografer wedding',
    description: 'Pilih fotografer dengan portfolio terbaik',
    completed: false,
    category_id: '2',
    user_id: '',
    priority: 'high',
    order_index: 1,
    is_important: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '5',
    title: 'Booking videographer',
    description: 'Untuk video cinematic pernikahan',
    completed: false,
    category_id: '2',
    user_id: '',
    priority: 'medium',
    order_index: 2,
    is_important: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '6',
    title: 'Prewedding photoshoot',
    description: 'Sesi foto sebelum pernikahan',
    completed: false,
    category_id: '2',
    user_id: '',
    priority: 'medium',
    order_index: 3,
    is_important: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },

  // Fashion & Beauty
  {
    id: '7',
    title: 'Beli atau sewa gaun pengantin',
    description: 'Fitting dan finalisasi gaun',
    completed: false,
    category_id: '3',
    user_id: '',
    priority: 'high',
    order_index: 1,
    is_important: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '8',
    title: 'Beli atau sewa jas pengantin pria',
    description: 'Sesuaikan dengan tema wedding',
    completed: false,
    category_id: '3',
    user_id: '',
    priority: 'high',
    order_index: 2,
    is_important: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '9',
    title: 'Booking MUA (Make Up Artist)',
    description: 'Trial makeup dan book untuk hari H',
    completed: false,
    category_id: '3',
    user_id: '',
    priority: 'high',
    order_index: 3,
    is_important: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '10',
    title: 'Perawatan kecantikan pengantin',
    description: 'Facial, spa, dll sebelum hari H',
    completed: false,
    category_id: '3',
    user_id: '',
    priority: 'medium',
    order_index: 4,
    is_important: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },

  // Undangan
  {
    id: '11',
    title: 'Desain undangan pernikahan',
    description: 'Buat atau pesan desain undangan',
    completed: false,
    category_id: '4',
    user_id: '',
    priority: 'high',
    order_index: 1,
    is_important: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '12',
    title: 'Cetak undangan',
    description: 'Cetak sesuai jumlah tamu yang diundang',
    completed: false,
    category_id: '4',
    user_id: '',
    priority: 'high',
    order_index: 2,
    is_important: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '13',
    title: 'Distribusi undangan',
    description: 'Bagikan undangan ke semua tamu',
    completed: false,
    category_id: '4',
    user_id: '',
    priority: 'medium',
    order_index: 3,
    is_important: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },

  // Administrasi
  {
    id: '14',
    title: 'Urus surat nikah di KUA/Gereja',
    description: 'Daftar dan urus persyaratan nikah',
    completed: false,
    category_id: '5',
    user_id: '',
    priority: 'high',
    order_index: 1,
    is_important: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '15',
    title: 'Siapkan dokumen persyaratan',
    description: 'KTP, KK, akta kelahiran, dll',
    completed: false,
    category_id: '5',
    user_id: '',
    priority: 'high',
    order_index: 2,
    is_important: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '16',
    title: 'Buat daftar tamu undangan',
    description: 'Compile semua nama dan alamat tamu',
    completed: false,
    category_id: '5',
    user_id: '',
    priority: 'medium',
    order_index: 3,
    is_important: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },

  // Hari H
  {
    id: '17',
    title: 'Persiapan pengantin pagi hari',
    description: 'Makeup, dress up, dan persiapan final',
    completed: false,
    category_id: '10',
    user_id: '',
    priority: 'high',
    order_index: 1,
    is_important: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '18',
    title: 'Koordinasi dengan vendor',
    description: 'Pastikan semua vendor hadir tepat waktu',
    completed: false,
    category_id: '10',
    user_id: '',
    priority: 'high',
    order_index: 2,
    is_important: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];
