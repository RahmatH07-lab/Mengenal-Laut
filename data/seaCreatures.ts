import { SeaCreature, StoryScene, MusicTheme } from '../types';

export const SEA_CREATURES: SeaCreature[] = [
  {
    id: 'dolphin',
    name: 'Lumba-lumba Pintar',
    scientificName: 'Delphinidae',
    category: 'Mamalia Laut',
    icon: '🐬',
    emoji: '🐬',
    badgeColor: 'bg-cyan-500 text-white',
    gradient: 'from-sky-400 via-cyan-500 to-blue-600',
    shadowColor: 'shadow-cyan-400/50',
    soundType: 'dolphin',
    shortDesc: 'Mamalia laut yang sangat cerdas, ramah, dan suka melompat tinggi di atas ombak!',
    funFacts: [
      'Lumba-lumba bukan ikan, tapi mamalia seperti kita yang bernapas menghirup udara!',
      'Mereka tidur dengan satu mata tetap terbuka untuk selalu waspada.',
      'Suka saling menyapa teman dengan siulan dan klik-klik suara unik!'
    ],
    superpower: 'Punya sonar alami (ekolokasi) untuk melihat benda dalam air meski gelap!',
    voiceScript: 'Halo adik-adik! Kenalkan, ini temanku si Lumba-lumba Pintar! Dia suka sekali melompat tinggi di atas ombak sambil tersenyum! Tahukah kamu? Lumba-lumba bernapas lewat lubang kecil di atas kepalanya yang bernama blowhole. Mereka sangat suka bermain dan menolong sesama lumba-lumba lho!',
    quiz: {
      question: 'Bagaimana cara lumba-lumba bernapas di laut?',
      options: [
        'Lewat insang di samping',
        'Lewat lubang napas di atas kepalanya',
        'Tidak pernah bernapas'
      ],
      correctIndex: 1,
      explanation: 'Hebat! Lumba-lumba adalah mamalia yang bernapas lewat lubang napas di atas kepalanya!'
    }
  },
  {
    id: 'sea_turtle',
    name: 'Penyu Laut yang Bijak',
    scientificName: 'Chelonioidea',
    category: 'Reptil Laut',
    icon: '🐢',
    emoji: '🐢',
    badgeColor: 'bg-emerald-500 text-white',
    gradient: 'from-emerald-400 via-teal-500 to-green-700',
    shadowColor: 'shadow-emerald-400/50',
    soundType: 'splash',
    shortDesc: 'Penjelajah samudra sejati dengan cangkang pelindung keras dan sirip dayung yang anggun!',
    funFacts: [
      'Penyu laut bisa berenang mengarungi samudra ribuan kilometer!',
      'Mereka membawa "rumah" pelindung keras di punggungnya kemana pun pergi.',
      'Bisa hidup sangat lama, bahkan sampai lebih dari 80 hingga 100 tahun!'
    ],
    superpower: 'Punya kompas alami di kepalanya untuk kembali ke pantai tempat ia menetas!',
    voiceScript: 'Waaah, lihat siapa yang berenang dengan santai ini! Ini adalah Kakek Penyu Laut! Gerakannya anggun sekali dengan sirip dayungnya. Penyu membawa cangkang keras sebagai pelindung tubuhnya. Penyu bisa berenang keliling dunia dan selalu ingat jalan pulang ke tempat ia dilahirkan. Keren kan!',
    quiz: {
      question: 'Apa fungsi cangkang keras di punggung penyu laut?',
      options: [
        'Sebagai tas mainan',
        'Untuk melindungi tubuhnya',
        'Untuk menyimpan air minum'
      ],
      correctIndex: 1,
      explanation: 'Benar sekali! Cangkang keras melindungi penyu dari bahaya!'
    }
  },
  {
    id: 'clownfish',
    name: 'Ikan Badut (Nemo)',
    scientificName: 'Amphiprioninae',
    category: 'Ikan',
    icon: '🐠',
    emoji: '🐠',
    badgeColor: 'bg-orange-500 text-white',
    gradient: 'from-amber-400 via-orange-500 to-red-500',
    shadowColor: 'shadow-orange-400/50',
    soundType: 'bubbles',
    shortDesc: 'Ikan kecil berwarna oranye cerah bergaris putih yang tinggal di anemon laut lembut!',
    funFacts: [
      'Memiliki warna oranye cerah dengan 3 garis putih yang sangat menggemaskan.',
      'Tinggal di dalam tentakel anemon laut dan kebal terhadap racun anemon!',
      'Ikan badut sangat berani menjaga rumahnya dari ikan lain yang lebih besar.'
    ],
    superpower: 'Kulitnya memiliki lapisan lendir ajaib sehingga tidak tersengat anemon berduri!',
    voiceScript: 'Cilukbaaa! Ini dia si mungil Ikan Badut Nemo! Warnanya oranye belang putih yang sangat cantik. Rumah kesukaannya adalah di antara anemon laut yang lembut. Hewan lain takut disengat anemon, tapi Ikan Badut punya lendir pelindung ajaib di kulitnya, jadi ia aman dan hangat di dalam rumahnya!',
    quiz: {
      question: 'Di manakah tempat tinggal favorit Ikan Badut di dasar laut?',
      options: [
        'Di dalam anemon laut',
        'Di atas pohon kelapa',
        'Di sarang burung'
      ],
      correctIndex: 0,
      explanation: 'Pintar sekali! Ikan Badut tinggal di dalam anemon laut yang lembut!'
    }
  },
  {
    id: 'blue_whale',
    name: 'Paus Biru Raksasa',
    scientificName: 'Balaenoptera musculus',
    category: 'Mamalia Laut',
    icon: '🐋',
    emoji: '🐋',
    badgeColor: 'bg-indigo-500 text-white',
    gradient: 'from-blue-400 via-indigo-600 to-slate-800',
    shadowColor: 'shadow-indigo-400/50',
    soundType: 'whale',
    shortDesc: 'Raksasa terbesar di muka bumi yang berhati lembut dan suka menyanyi di kedalaman laut!',
    funFacts: [
      'Paus biru adalah hewan terbesar yang pernah hidup di bumi, lebih besar dari dinosaurus!',
      'Jantungnya saja berukuran sebesar mobil kecil!',
      'Suara nyanyiannya bisa terdengar oleh paus lain dari jarak ribuan kilometer.'
    ],
    superpower: 'Bisa menyemburkan air setinggi 10 meter saat menghembuskan napas ke udara!',
    voiceScript: 'Duaaaar... shuuuu! Suara apa itu? Itu semburan air dari Paus Biru Raksasa! Paus biru adalah hewan paling besar di seluruh dunia! Panjangnya bisa sepanjang 3 bus sekolah dijajarkan! Walaupun tubuhnya raksasa, paus biru sangat baik hati dan makannya udang-udang kecil bernama krill.',
    quiz: {
      question: 'Seberapa besar tubuh Paus Biru Raksasa?',
      options: [
        'Sebesar kucing kecil',
        'Hewan terbesar di seluruh bumi',
        'Sebesar sepeda anak'
      ],
      correctIndex: 1,
      explanation: 'Tepat sekali! Paus Biru adalah makhluk hidup terbesar di muka bumi!'
    }
  },
  {
    id: 'octopus',
    name: 'Gurita Cerdas 8 Lengan',
    scientificName: 'Octopoda',
    category: 'Moluska & Lainnya',
    icon: '🐙',
    emoji: '🐙',
    badgeColor: 'bg-purple-500 text-white',
    gradient: 'from-fuchsia-400 via-purple-500 to-indigo-700',
    shadowColor: 'shadow-purple-400/50',
    soundType: 'pop',
    shortDesc: 'Pesulap samudra yang punya 8 tentakel lentur, 3 jantung, dan bisa menyamar seperti batu karang!',
    funFacts: [
      'Punya 8 lengan yang dilengkapi ratusan mangkuk penghisap kecil.',
      'Gurita punya 3 buah jantung dan darahnya berwarna biru unik!',
      'Bisa mengubah warna kulitnya dalam sekejap untuk menyamar (kamuflase).'
    ],
    superpower: 'Bisa menyemprotkan tinta hitam pekat untuk kabur dari kejaran pemangsa!',
    voiceScript: 'Lihat, ada pesulap laut! Ini adalah Gurita si Cerdas! Gurita punya delapan lengan yang lentur untuk meraba dan memegang benda. Gurita juga punya 3 jantung lho! Kalau sedang malu atau ingin sembunyi, gurita bisa menyemprotkan cairan tinta hitam lalu wuuush... dia bersembunyi dengan cepat!',
    quiz: {
      question: 'Berapa jumlah lengan yang dimiliki oleh seekor gurita?',
      options: [
        'Ada 2 lengan',
        'Ada 4 lengan',
        'Ada 8 lengan'
      ],
      correctIndex: 2,
      explanation: 'Luar biasa! Gurita memiliki 8 lengan yang lentur dan kuat!'
    }
  },
  {
    id: 'seahorse',
    name: 'Kuda Laut yang Imut',
    scientificName: 'Hippocampus',
    category: 'Ikan',
    icon: '🌊',
    emoji: '🐴',
    badgeColor: 'bg-yellow-500 text-slate-900',
    gradient: 'from-yellow-300 via-amber-400 to-orange-500',
    shadowColor: 'shadow-yellow-400/50',
    soundType: 'harp',
    shortDesc: 'Ikan unik yang berenang tegak lurus dan punya ekor melingkar untuk berpegangan pada rumput laut!',
    funFacts: [
      'Berenang dengan posisi tubuh berdiri tegak lurus.',
      'Ekornya bisa melingkar dan memegang erat tanaman laut agar tidak terbawa arus ombak.',
      'Yang melahirkan dan menggendong bayi-bayi kuda laut adalah sang Ayah!'
    ],
    superpower: 'Bisa menggerakkan mata kiri dan mata kanan ke arah berbeda secara bersamaan!',
    voiceScript: 'Aduh lucunya! Ini adalah Kuda Laut! Bentuk kepalanya mirip seperti kuda di daratan ya. Kuda laut berenang dengan posisi berdiri tegak. Ekornya yang lentur bisa melingkar memeluk rumput laut agar tidak terseret ombak. Dan yang paling istimewa, ayah kuda laut yang mengasuh telur bayi di dalam kantungnya!',
    quiz: {
      question: 'Siapakah yang menyimpan dan mengasuh telur bayi kuda laut sampai menetas?',
      options: [
        'Ayah Kuda Laut',
        'Ibu Burung',
        'Ikan Hiu'
      ],
      correctIndex: 0,
      explanation: 'Hebat! Ayah Kuda Laut yang memiliki kantung khusus untuk mengasuh bayi-bayinya!'
    }
  },
  {
    id: 'jellyfish',
    name: 'Ubur-ubur Berkilau',
    scientificName: 'Medusozoa',
    category: 'Moluska & Lainnya',
    icon: '🪼',
    emoji: '🪼',
    badgeColor: 'bg-pink-500 text-white',
    gradient: 'from-pink-300 via-rose-400 to-purple-600',
    shadowColor: 'shadow-pink-400/50',
    soundType: 'harp',
    shortDesc: 'Makhluk laut transparan yang lembut seperti agar-agar dan bisa bercahaya di laut dalam!',
    funFacts: [
      'Hampir 95% tubuh ubur-ubur terdiri dari air!',
      'Ubur-ubur tidak memiliki tulang, otak, maupun jantung.',
      'Beberapa ubur-ubur bisa menyala terang dan indah di malam hari (bioluminesensi).'
    ],
    superpower: 'Bercahaya warna-warni seperti lampu neon di dalam air gelap!',
    voiceScript: 'Kring kring! Lihat ubur-ubur ini melayang-layang seperti payung ajaib! Tubuhnya kenyal dan transparan seperti agar-agar jeli. Ubur-ubur tidak punya tulang ataupun otak, tapi mereka bisa bergerak naik turun dengan memompa air. Di tempat yang gelap, tubuhnya bisa menyala berkilauan seperti lampu pesta!',
    quiz: {
      question: 'Sebagian besar tubuh ubur-ubur terdiri dari apa?',
      options: [
        'Batu dan pasir',
        'Air (95%)',
        'Kayu keras'
      ],
      correctIndex: 1,
      explanation: 'Benar sekali! Tubuh ubur-ubur lembut karena 95% terdiri dari air!'
    }
  },
  {
    id: 'whale_shark',
    name: 'Hiu Paus yang Ramah',
    scientificName: 'Rhincodon typus',
    category: 'Ikan',
    icon: '🦈',
    emoji: '🦈',
    badgeColor: 'bg-teal-500 text-white',
    gradient: 'from-sky-500 via-teal-600 to-blue-900',
    shadowColor: 'shadow-teal-400/50',
    soundType: 'whale',
    shortDesc: 'Hiu terbesar di dunia yang sangat jinak, ramah pada penyelam, dan memiliki motif polkadot bintang!',
    funFacts: [
      'Ikan terbesar di dunia, tapi makanannya hanya plankton dan udang kecil!',
      'Punggungnya dihiasi bintik-bintik putih unik seperti peta bintang di langit.',
      'Sangat ramah dan senang berenang pelan berdampingan dengan penyelam.'
    ],
    superpower: 'Mulutnya yang sangat lebar bisa menyaring ribuan liter air sekaligus untuk makan!',
    voiceScript: 'Jangan takut ya adik-adik! Ini adalah Hiu Paus, si raksasa yang super baik dan ramah! Walaupun namanya hiu, giginya sangat kecil dan dia tidak makan ikan besar. Hiu paus hanya membuka mulut lebarnya untuk menyaring air dan memakan plankton kecil. Lihat motif bintik-bintik putih di punggungnya, cantik sekali ya!',
    quiz: {
      question: 'Apakah makanan utama dari Hiu Paus yang berbadan besar?',
      options: [
        'Plankton dan udang kecil',
        'Cokelat dan permen',
        'Kelapa muda'
      ],
      correctIndex: 0,
      explanation: 'Tepat sekali! Hiu Paus memakan plankton dan udang kecil dengan cara menyaring air!'
    }
  },
  {
    id: 'starfish',
    name: 'Bintang Laut Ajaib',
    scientificName: 'Asteroidea',
    category: 'Moluska & Lainnya',
    icon: '⭐',
    emoji: '⭐',
    badgeColor: 'bg-amber-500 text-slate-900',
    gradient: 'from-amber-300 via-orange-400 to-rose-500',
    shadowColor: 'shadow-amber-400/50',
    soundType: 'harp',
    shortDesc: 'Bintang berkilau di dasar samudra yang punya ribuan kaki tabung kecil untuk merayap!',
    funFacts: [
      'Bentuknya menyerupai bintang berkelip dengan 5 lengan (atau lebih).',
      'Punya ratusan kaki tabung kecil di bawah tubuhnya untuk merayap di batu karang.',
      'Bisa menumbuhkan lengan baru yang utuh jika salah satu lengannya terputus!'
    ],
    superpower: 'Bisa meregenerasi (menumbuhkan kembali) bagian tubuhnya yang hilang!',
    voiceScript: 'Wah, apakah ada bintang jatuh dari langit ke dalam laut? Bukan, ini adalah Bintang Laut! Bintang laut hidup di dasar laut dan menempel di batu karang. Di bawah tubuhnya ada ratusan kaki tabung kecil untuk berjalan. Dan yang paling ajaib, kalau lengannya putus, lengannya bisa tumbuh kembali menjadi baru!',
    quiz: {
      question: 'Apa keajaiban yang bisa dilakukan oleh Bintang Laut jika lengannya patah?',
      options: [
        'Menangis seharian',
        'Menumbuhkan lengan baru kembali',
        'Berubah menjadi burung'
      ],
      correctIndex: 1,
      explanation: 'Hebat! Bintang laut memiliki kekuatan menumbuhkan lengan baru kembali!'
    }
  },
  {
    id: 'crab',
    name: 'Kepiting Penari',
    scientificName: 'Brachyura',
    category: 'Moluska & Lainnya',
    icon: '🦀',
    emoji: '🦀',
    badgeColor: 'bg-red-500 text-white',
    gradient: 'from-rose-400 via-red-500 to-amber-600',
    shadowColor: 'shadow-red-400/50',
    soundType: 'pop',
    shortDesc: 'Penghuni karang berpunggung perisai yang berjalan menyamping dan suka melambaikan capitnya!',
    funFacts: [
      'Berjalan ke arah samping (menyamping) karena bentuk sendi kakinya yang unik.',
      'Memiliki dua capit kuat untuk mencari makan dan melambaikan salam.',
      'Matanya berada di atas tangkai kecil yang bisa berputar ke segala arah!'
    ],
    superpower: 'Bisa berganti kulit cangkang lama menjadi cangkang baru yang lebih besar saat tumbuh!',
    voiceScript: 'Klak-klik-klak! Siapa itu yang berjalan jalan miring ke samping? Itu adalah si Kepiting Penari! Kepiting punya baju pelindung keras dan dua capit yang gagah. Kenapa jalannya menyamping? Karena kakinya ditekuk ke samping, jadi lebih cepat berlari miring di atas pasir pantai!',
    quiz: {
      question: 'Bagaimanakah cara khas kepiting saat berjalan di atas pasir?',
      options: [
        'Terbang di udara',
        'Berjalan menyamping ke arah samping',
        'Melompat seperti katak'
      ],
      correctIndex: 1,
      explanation: 'Pintar! Kepiting berjalan menyamping ke arah samping!'
    }
  }
];

export const STORY_SCENES: StoryScene[] = [
  {
    id: 1,
    creatureId: 'intro',
    title: 'Kapal Selam Kuning Kiki Siap Menyelam! 🟡',
    subtitle: 'Ayo Menjelajahi Samudra Luas Bersama!',
    kikiExpression: 'waving',
    dialogue: 'Halo teman-teman kecil yang cerdas! Namaku Kiki, kapten cilik penyelam laut! Hari ini Kiki akan mengajak kalian menyelam ke dasar laut biru yang indah untuk berkenalan dengan hewan-hewan laut yang luar biasa! Sudah siap? Ayo kita hitung mundur: Tiga... Dua... Satu... BYUUUUR! 🌊',
    highlightText: 'Ayo menyelam bersama Kapten Kiki! 🤿',
    backgroundGradient: 'from-sky-400 via-blue-500 to-indigo-800',
    ambientFish: ['🐠', '🐡', '🐟', '🫧']
  },
  {
    id: 2,
    creatureId: 'dolphin',
    title: 'Melompat Bersama Lumba-lumba Ceria 🐬',
    subtitle: 'Teman Pintar yang Suka Melompat Tinggi',
    kikiExpression: 'excited',
    dialogue: 'Byuuuuur! Lihat di sebelah kanan kapal kita! Ada kawanan Lumba-lumba yang sedang melompat gembira! Lumba-lumba bernapas menggunakan lubang napas di atas kepalanya lho. Mereka sangat ramah dan suka membantu teman-temannya. Lumba-lumba juga berbicara dengan siulan klik-klik yang merdu!',
    highlightText: 'Lumba-lumba adalah mamalia cerdas dan suka melompat! 🐬',
    backgroundGradient: 'from-cyan-400 via-sky-500 to-blue-700',
    ambientFish: ['🐬', '🫧', '🐟', '✨']
  },
  {
    id: 3,
    creatureId: 'sea_turtle',
    title: 'Berenang Santai Bersama Penyu Laut 🐢',
    subtitle: 'Petualang Bijak Samudra Raya',
    kikiExpression: 'happy',
    dialogue: 'Wah, sekarang kita berpapasan dengan Kakek Penyu Laut! Gerakan siripnya anggun sekali seperti sayap burung di dalam air. Penyu membawa rumah cangkang keras di punggungnya. Penyu bisa berenang keliling dunia dan hidup hingga berumur lebih dari 80 tahun! Hebat ya!',
    highlightText: 'Penyu laut membawa cangkang pelindung dan berenang ribuan mil! 🐢',
    backgroundGradient: 'from-teal-400 via-emerald-600 to-teal-900',
    ambientFish: ['🐢', '🪸', '🫧', '🌿']
  },
  {
    id: 4,
    creatureId: 'clownfish',
    title: 'Cilukba Rumah Ikan Badut Nemo 🐠',
    subtitle: 'Warna Oranye Cantik di Anemon Laut',
    kikiExpression: 'excited',
    dialogue: 'Cilukbaaa! Ada Ikan Badut oranye bergaris putih yang lucu sedang bersembunyi di dalam anemon laut! Kulit ikan badut punya lendir ajaib khusus, jadi dia tidak takut tersengat anemon. Anemon menjadi rumah yang aman dan nyaman untuk keluarga ikan badut bermain!',
    highlightText: 'Ikan badut bersahabat erat dengan anemon laut! 🐠',
    backgroundGradient: 'from-amber-400 via-orange-500 to-sky-800',
    ambientFish: ['🐠', '🪸', '🫧', '⭐']
  },
  {
    id: 5,
    creatureId: 'blue_whale',
    title: 'Bertemu Raksasa Baik: Paus Biru! 🐋',
    subtitle: 'Makhluk Terbesar di Seluruh Jagat Raya',
    kikiExpression: 'surprised',
    dialogue: 'Woooooow! Lihat bayangan raksasa di atas kita! Itu adalah Paus Biru, hewan terbesar di seluruh muka bumi! Tubuhnya sepanjang 3 bus sekolah, dan jantungnya sebesar mobil! Tapi jangan takut, paus biru sangat lembut dan suka menyanyikan melodi indah di kedalaman samudra.',
    highlightText: 'Paus Biru adalah hewan terbesar di bumi yang berhati lembut! 🐋',
    backgroundGradient: 'from-blue-500 via-indigo-700 to-slate-950',
    ambientFish: ['🐋', '🫧', '🌊', '🐟']
  },
  {
    id: 6,
    creatureId: 'octopus',
    title: 'Pesulap 8 Lengan: Si Gurita Cerdas 🐙',
    subtitle: 'Bisa Berubah Warna & Menyemprot Tinta',
    kikiExpression: 'excited',
    dialogue: 'Tengok ke celah batu karang itu! Ada Gurita si Pesulap Laut! Gurita punya 8 lengan lentur dan 3 jantung! Kalau sedang terkejut, gurita bisa menyemprotkan tinta hitam rahasia lalu wuuush... dia berubah warna menyamar seperti batu karang di sekitarnya!',
    highlightText: 'Gurita punya 8 lengan dan bisa menyamar seperti batu karang! 🐙',
    backgroundGradient: 'from-purple-500 via-fuchsia-600 to-indigo-900',
    ambientFish: ['🐙', '🫧', '🪨', '🦀']
  },
  {
    id: 7,
    creatureId: 'outro',
    title: 'Terima Kasih Penjelajah Cilik! 🌟',
    subtitle: 'Jaga Selalu Lautan Kita agar Tetap Bersih & Indah',
    kikiExpression: 'happy',
    dialogue: 'Horeee! Petualangan kapal selam kita hari ini menyenangkan sekali ya! Kita sudah melihat lumba-lumba, penyu, ikan badut, paus, dan gurita. Ingat pesan Kiki ya: jangan buang sampah sembarangan ke laut, agar sahabat-sahabat laut kita selalu sehat dan gembira! Sampai jumpa di petualangan berikutnya!',
    highlightText: 'Ayo jaga kebersihan laut bersama Kapten Kiki! 🌟❤️',
    backgroundGradient: 'from-sky-400 via-amber-400 to-rose-500',
    ambientFish: ['🐬', '🐢', '🐠', '🐋', '🐙', '⭐', '🫧']
  }
];

export const MUSIC_THEMES: MusicTheme[] = [
  {
    id: 'cheerful_nursery',
    name: 'Petualangan Ceria di Laut 🎶',
    description: 'Irama riang marimba, lonceng ceria, dan tiupan seruling anak-anak',
    tempo: 120,
    scaleType: 'nursery'
  },
  {
    id: 'bubble_dance',
    name: 'Pesta Gelembung Ikan 🫧',
    description: 'Melodi kalimba lucu berpadu dengan letupan gelembung air',
    tempo: 110,
    scaleType: 'bubble_dance'
  },
  {
    id: 'calm_ocean',
    name: 'Bintang Laut Menari 🌊',
    description: 'Alunan lembut dan menenangkan dengan desau ombak manis',
    tempo: 85,
    scaleType: 'calm_ocean'
  }
];
