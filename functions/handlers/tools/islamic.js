// Islamic Features Module — Quran, Hadith, Prayer, Dhikr, Islamic Calendar & more
// Uses free APIs: alquran.cloud, sunnah.com, aladhan.com

const pick = arr => arr[Math.floor(Math.random() * arr.length)]

// ── Dhikr Collection ──
const DHIKR = [
	{ arabic: 'سُبْحَانَ اللَّهِ', latin: 'Subhanallah', meaning: 'Maha Suci Allah', reward: '1 kebaikan dicatat, 1 dosa dihapus, 1 derajat dinaikkan' },
	{ arabic: 'الْحَمْدُ لِلَّهِ', latin: 'Alhamdulillah', meaning: 'Segala puji bagi Allah', reward: '1 kebaikan dicatat, 1 dosa dihapus, 1 derajat dinaikkan' },
	{ arabic: 'اللَّهُ أَكْبَرُ', latin: 'Allahu Akbar', meaning: 'Allah Maha Besar', reward: '1 kebaikan dicatat, 1 dosa dihapus, 1 derajat dinaikkan' },
	{ arabic: 'لَا إِلَٰهَ إِلَّا اللَّهُ', latin: 'La ilaha illallah', meaning: 'Tiada Tuhan selain Allah', reward: 'Pahala memerdekakan 10 budak, 10 kebaikan dicatat, 10 dosa dihapus' },
	{ arabic: 'أَسْتَغْفِرُ اللَّهَ', latin: 'Astaghfirullah', meaning: 'Aku memohon ampun kepada Allah', reward: 'Diberi jalan keluar dari setiap kesempitan, dan diberi rezeki dari arah tidak disangka' },
	{ arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ', latin: 'Subhanallahi wa bihamdihi', meaning: 'Maha Suci Allah dan segala puji bagi-Nya', reward: '1000 kebaikan dicatat, atau dihapus dosa-dosa meski sebanyak buih laut' },
	{ arabic: 'سُبْحَانَ اللَّهِ الْعَظِيمِ', latin: 'Subhanallahil Adzim', meaning: 'Maha Suci Allah Yang Maha Agung', reward: '2 kebaikan dicatat, 2 dosa dihapus, 2 derajat dinaikkan' },
	{ arabic: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ', latin: 'La haula wala quwwata illa billah', meaning: 'Tiada daya dan kekuatan kecuali dengan Allah', reward: 'Pahala seperti zakat, dan penawar dari 99 penyakit' },
	{ arabic: 'صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ', latin: 'Sallallahu Alaihi Wasallam', meaning: 'Semoga shalawat dan salam atas Nabi', reward: '10 shalawat dari Allah, 10 dosa dihapus, 10 derajat dinaikkan' },
	{ arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ', latin: 'Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina adzaban-nar', meaning: 'Ya Tuhan kami, berilah kami kebaikan di dunia dan akhirat, dan lindungilah kami dari azab neraka', reward: 'Doa paling lengkap' },
	{ arabic: 'يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَى دِينِكَ', latin: 'Ya Muqallibal Qulub Tsabbit Qalbi Ala Dinik', meaning: 'Ya Allah Yang Maha Membalik-balikkan hati, tetapkanlah hatiku pada agama-Mu', reward: 'Menjaga keimanan' },
	{ arabic: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ', latin: 'Bismillahilladzi la yadurru ma asmihi syaiun', meaning: 'Dengan nama Allah yang tidak ada sesuatu pun yang membahayakan bersama nama-Nya', reward: 'Tidak ada sesuatu yang membahayakannya' },
	{ arabic: 'رَضِيتُ بِاللَّهِ رَبًّا وَبِالْإِسْلَامِ دِينًا وَبِمُحَمَّدٍ نَبِيًّا', latin: 'Radhitu billahi Rabba wabil Islami dina wabimuhammadin nabiyya', meaning: 'Aku ridha Allah sebagai Tuhan, Islam sebagai agama, dan Muhammad sebagai Nabi', reward: 'Berhak mendapat syafaat di hari kiamat' },
	{ arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ سُبْحَانَ اللَّهِ الْعَظِيمِ', latin: 'Subhanallahi wa bihamdihi subhanallahil adzim', meaning: 'Maha Suci Allah dan segala puji bagi-Nya, Maha Suci Allah Yang Maha Agung', reward: 'Kalimat yang ringan di lisan, berat di timbangan, dicintai Ar-Rahman' },
	{ arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ', latin: 'Allahumma salli ala Muhammad wa ala ali Muhammad', meaning: 'Ya Allah, berikanlah shalawat kepada Muhammad dan keluarga Muhammad', reward: '10 shalawat dari Allah' },
]

// ── Asmaul Husna (99 Names) ──
const ASMAUL_HUSNA = [
	{ num: 1, arabic: 'الرَّحْمَنُ', latin: 'Ar-Rahman', meaning: 'Yang Maha Pengasih' },
	{ num: 2, arabic: 'الرَّحِيمُ', latin: 'Ar-Rahim', meaning: 'Yang Maha Penyayang' },
	{ num: 3, arabic: 'الْمَلِكُ', latin: 'Al-Malik', meaning: 'Yang Maha Merajai' },
	{ num: 4, arabic: 'الْقُدُّوسُ', latin: 'Al-Quddus', meaning: 'Yang Maha Suci' },
	{ num: 5, arabic: 'السَّلَامُ', latin: 'As-Salam', meaning: 'Yang Maha Memberi Kesejahteraan' },
	{ num: 6, arabic: 'الْمُؤْمِنُ', latin: 'Al-Mumin', meaning: 'Yang Maha Memberi Keamanan' },
	{ num: 7, arabic: 'الْمُهَيْمِنُ', latin: 'Al-Muhaimin', meaning: 'Yang Maha Pemelihara' },
	{ num: 8, arabic: 'الْعَزِيزُ', latin: 'Al-Aziz', meaning: 'Yang Maha Perkasa' },
	{ num: 9, arabic: 'الْجَبَّارُ', latin: 'Al-Jabbar', meaning: 'Yang Maha Memaksa' },
	{ num: 10, arabic: 'الْمُتَكَبِّرُ', latin: 'Al-Mutakabbir', meaning: 'Yang Maha Megah' },
	{ num: 11, arabic: 'الْخَالِقُ', latin: 'Al-Khaliq', meaning: 'Yang Maha Pencipta' },
	{ num: 12, arabic: 'الْبَارِئُ', latin: 'Al-Bari', meaning: 'Yang Maha Melepaskan' },
	{ num: 13, arabic: 'الْمُصَوِّرُ', latin: 'Al-Musawwir', meaning: 'Yang Maha Membentuk' },
	{ num: 14, arabic: 'الْغَفَّارُ', latin: 'Al-Ghaffar', meaning: 'Yang Maha Pengampun' },
	{ num: 15, arabic: 'الْقَهَّارُ', latin: 'Al-Qahhar', meaning: 'Yang Maha Menaklukkan' },
	{ num: 16, arabic: 'الْوَهَّابُ', latin: 'Al-Wahhab', meaning: 'Yang Maha Pemberi' },
	{ num: 17, arabic: 'الرَّزَّاقُ', latin: 'Ar-Razzaq', meaning: 'Yang Maha Pemberi Rezeki' },
	{ num: 18, arabic: 'الْفَتَّاحُ', latin: 'Al-Fattah', meaning: 'Yang Maha Pembuka' },
	{ num: 19, arabic: 'الْعَلِيمُ', latin: 'Al-Alim', meaning: 'Yang Maha Mengetahui' },
	{ num: 20, arabic: 'الْقَابِضُ', latin: 'Al-Qabidh', meaning: 'Yang Maha Menahan' },
	{ num: 21, arabic: 'الْبَاسِطُ', latin: 'Al-Basith', meaning: 'Yang Maha Melapangkan' },
	{ num: 22, arabic: 'الْخَافِضُ', latin: 'Al-Khafidh', meaning: 'Yang Maha Merendahkan' },
	{ num: 23, arabic: 'الرَّافِعُ', latin: 'Ar-Rafi', meaning: 'Yang Maha Meninggikan' },
	{ num: 24, arabic: 'الْمُعِزُّ', latin: 'Al-Muizz', meaning: 'Yang Maha Memuliakan' },
	{ num: 25, arabic: 'الْمُذِلُّ', latin: 'Al-Mudzil', meaning: 'Yang Maha Menghinakan' },
	{ num: 26, arabic: 'السَّمِيعُ', latin: 'As-Samii', meaning: 'Yang Maha Mendengar' },
	{ num: 27, arabic: 'الْبَصِيرُ', latin: 'Al-Bashir', meaning: 'Yang Maha Melihat' },
	{ num: 28, arabic: 'الْحَكَمُ', latin: 'Al-Hakam', meaning: 'Yang Maha Menetapkan' },
	{ num: 29, arabic: 'الْعَدْلُ', latin: 'Al-Adl', meaning: 'Yang Maha Adil' },
	{ num: 30, arabic: 'اللَّطِيفُ', latin: 'Al-Lathif', meaning: 'Yang Maha Lembut' },
	{ num: 31, arabic: 'الْخَبِيرُ', latin: 'Al-Khabir', meaning: 'Yang Maha Mengetahui' },
	{ num: 32, arabic: 'الْحَلِيمُ', latin: 'Al-Halim', meaning: 'Yang Maha Penyantun' },
	{ num: 33, arabic: 'الْعَظِيمُ', latin: 'Al-Azim', meaning: 'Yang Maha Agung' },
	{ num: 34, arabic: 'الْغَفُورُ', latin: 'Al-Ghafur', meaning: 'Yang Maha Pengampun' },
	{ num: 35, arabic: 'الشَّكُورُ', latin: 'Asy-Syakur', meaning: 'Yang Maha Pembalas' },
	{ num: 36, arabic: 'الْعَلِيُّ', latin: 'Al-Aliyy', meaning: 'Yang Maha Tinggi' },
	{ num: 37, arabic: 'الْكَبِيرُ', latin: 'Al-Kabir', meaning: 'Yang Maha Besar' },
	{ num: 38, arabic: 'الْحَفِيظُ', latin: 'Al-Hafizh', meaning: 'Yang Maha Memelihara' },
	{ num: 39, arabic: 'الْمُقِيتُ', latin: 'Al-Muqit', meaning: 'Yang Maha Pemberi Kecukupan' },
	{ num: 40, arabic: 'الْحَسِيبُ', latin: 'Al-Hasib', meaning: 'Yang Maha Membuat Perhitungan' },
	{ num: 41, arabic: 'الْجَلِيلُ', latin: 'Al-Jalil', meaning: 'Yang Maha Luhur' },
	{ num: 42, arabic: 'الْكَرِيمُ', latin: 'Al-Karim', meaning: 'Yang Maha Pemurah' },
	{ num: 43, arabic: 'الرَّقِيبُ', latin: 'Ar-Raqib', meaning: 'Yang Maha Mengawasi' },
	{ num: 44, arabic: 'الْمُجِيبُ', latin: 'Al-Mujib', meaning: 'Yang Maha Mengabulkan' },
	{ num: 45, arabic: 'الْوَاسِعُ', latin: 'Al-Wasi', meaning: 'Yang Maha Luas' },
	{ num: 46, arabic: 'الْحَكِيمُ', latin: 'Al-Hakim', meaning: 'Yang Maha Bijaksana' },
	{ num: 47, arabic: 'الْوَدُودُ', latin: 'Al-Wadud', meaning: 'Yang Maha Mengasihi' },
	{ num: 48, arabic: 'الْمَجِيدُ', latin: 'Al-Majid', meaning: 'Yang Maha Mulia' },
	{ num: 49, arabic: 'الْبَاعِثُ', latin: 'Al-Baits', meaning: 'Yang Maha Membangkitkan' },
	{ num: 50, arabic: 'الشَّهِيدُ', latin: 'Asy-Syahid', meaning: 'Yang Maha Menyaksikan' },
	{ num: 51, arabic: 'الْحَقُّ', latin: 'Al-Haqq', meaning: 'Yang Maha Benar' },
	{ num: 52, arabic: 'الْوَكِيلُ', latin: 'Al-Wakil', meaning: 'Yang Maha Mewakili' },
	{ num: 53, arabic: 'الْقَوِيُّ', latin: 'Al-Qawiyy', meaning: 'Yang Maha Kuat' },
	{ num: 54, arabic: 'الْمَتِينُ', latin: 'Al-Matin', meaning: 'Yang Maha Kokoh' },
	{ num: 55, arabic: 'الْوَلِيُّ', latin: 'Al-Waliyy', meaning: 'Yang Maha Melindungi' },
	{ num: 56, arabic: 'الْحَمِيدُ', latin: 'Al-Hamid', meaning: 'Yang Maha Terpuji' },
	{ num: 57, arabic: 'الْمُحْصِي', latin: 'Al-Muhshi', meaning: 'Yang Maha Menghitung' },
	{ num: 58, arabic: 'الْمُبْدِئُ', latin: 'Al-Mubdi', meaning: 'Yang Maha Memulai' },
	{ num: 59, arabic: 'الْمُعِيدُ', latin: 'Al-Muid', meaning: 'Yang Maha Mengembalikan' },
	{ num: 60, arabic: 'الْمُحْيِي', latin: 'Al-Muhyi', meaning: 'Yang Maha Menghidupkan' },
	{ num: 61, arabic: 'الْمُمِيتُ', latin: 'Al-Mumit', meaning: 'Yang Maha Mematikan' },
	{ num: 62, arabic: 'الْحَيُّ', latin: 'Al-Hayy', meaning: 'Yang Maha Hidup' },
	{ num: 63, arabic: 'الْقَيُّومُ', latin: 'Al-Qayyum', meaning: 'Yang Maha Berdiri Sendiri' },
	{ num: 64, arabic: 'الْوَاجِدُ', latin: 'Al-Wajid', meaning: 'Yang Maha Menemukan' },
	{ num: 65, arabic: 'الْمَاجِدُ', latin: 'Al-Majid', meaning: 'Yang Maha Mulia' },
	{ num: 66, arabic: 'الْوَاحِدُ', latin: 'Al-Wahid', meaning: 'Yang Maha Esa' },
	{ num: 67, arabic: 'الصَّمَدُ', latin: 'As-Samad', meaning: 'Yang Maha Dituju' },
	{ num: 68, arabic: 'الْقَادِرُ', latin: 'Al-Qadir', meaning: 'Yang Maha Kuasa' },
	{ num: 69, arabic: 'الْمُقْتَدِرُ', latin: 'Al-Muqtadir', meaning: 'Yang Maha Berkuasa' },
	{ num: 70, arabic: 'الْمُقَدِّمُ', latin: 'Al-Muqaddim', meaning: 'Yang Maha Mendahulukan' },
	{ num: 71, arabic: 'الْمُؤَخِّرُ', latin: 'Al-Muakhkhir', meaning: 'Yang Maha Mengakhirkan' },
	{ num: 72, arabic: 'الْأَوَّلُ', latin: 'Al-Awwal', meaning: 'Yang Maha Awal' },
	{ num: 73, arabic: 'الْآخِرُ', latin: 'Al-Akhir', meaning: 'Yang Maha Akhir' },
	{ num: 74, arabic: 'الظَّاهِرُ', latin: 'Az-Zahir', meaning: 'Yang Maha Nyata' },
	{ num: 75, arabic: 'الْبَاطِنُ', latin: 'Al-Bathin', meaning: 'Yang Maha Tersembunyi' },
	{ num: 76, arabic: 'الْوَالِي', latin: 'Al-Wali', meaning: 'Yang Maha Mengatur' },
	{ num: 77, arabic: 'الْمُتَعَالِي', latin: 'Al-Mutaali', meaning: 'Yang Maha Tinggi' },
	{ num: 78, arabic: 'الْبَرُّ', latin: 'Al-Barr', meaning: 'Yang Maha Dermawan' },
	{ num: 79, arabic: 'التَّوَّابُ', latin: 'At-Tawwab', meaning: 'Yang Maha Menerima Taubat' },
	{ num: 80, arabic: 'الْمُنْتَقِمُ', latin: 'Al-Muntaqim', meaning: 'Yang Maha Membalas' },
	{ num: 81, arabic: 'الْعَفُوُّ', latin: 'Al-Afuww', meaning: 'Yang Maha Pemaaf' },
	{ num: 82, arabic: 'الرَّؤُوفُ', latin: 'Ar-Rauf', meaning: 'Yang Maha Pengasih' },
	{ num: 83, arabic: 'مَالِكُ الْمُلْكِ', latin: 'Malikul Mulk', meaning: 'Yang Maha Pemilik Kerajaan' },
	{ num: 84, arabic: 'ذُو الْجَلَالِ وَالْإِكْرَامِ', latin: 'Dzul Jalali wal Ikram', meaning: 'Yang Maha Pemilik Keagungan dan Kemuliaan' },
	{ num: 85, arabic: 'الْمُقْسِطُ', latin: 'Al-Muqsit', meaning: 'Yang Maha Adil' },
	{ num: 86, arabic: 'الْجَامِعُ', latin: 'Al-Jami', meaning: 'Yang Maha Mengumpulkan' },
	{ num: 87, arabic: 'الْغَنِيُّ', latin: 'Al-Ghaniyy', meaning: 'Yang Maha Kaya' },
	{ num: 88, arabic: 'الْمُغْنِي', latin: 'Al-Mughni', meaning: 'Yang Maha Pemberi Kekayaan' },
	{ num: 89, arabic: 'الْمَانِعُ', latin: 'Al-Mani', meaning: 'Yang Maha Mencegah' },
	{ num: 90, arabic: 'الضَّارُّ', latin: 'Ad-Darr', meaning: 'Yang Maha Memberi Derita' },
	{ num: 91, arabic: 'النَّافِعُ', latin: 'An-Nafi', meaning: 'Yang Maha Memberi Manfaat' },
	{ num: 92, arabic: 'النُّورُ', latin: 'An-Nur', meaning: 'Yang Maha Bercahaya' },
	{ num: 93, arabic: 'الْهَادِي', latin: 'Al-Hadi', meaning: 'Yang Maha Pemberi Petunjuk' },
	{ num: 94, arabic: 'الْبَدِيعُ', latin: 'Al-Badi', meaning: 'Yang Maha Pencipta Baru' },
	{ num: 95, arabic: 'الْبَاقِي', latin: 'Al-Baqi', meaning: 'Yang Maha Kekal' },
	{ num: 96, arabic: 'الْوَارِثُ', latin: 'Al-Warith', meaning: 'Yang Maha Mewarisi' },
	{ num: 97, arabic: 'الرَّشِيدُ', latin: 'Ar-Rasyid', meaning: 'Yang Maha Pandai' },
	{ num: 98, arabic: 'الصَّبُورُ', latin: 'As-Sabur', meaning: 'Yang Maha Sabar' },
	{ num: 99, arabic: 'اللَّهُ', latin: 'Allah', meaning: 'Allah' },
]

// ── Daily Doa Collection ──
const DAILY_DOA = [
	{ title: 'Doa Sebelum Makan', arabic: 'بِسْمِ اللَّهِ وَعَلَى بَرَكَةِ اللَّهِ', latin: 'Bismillahi wa ala barakatillah', meaning: 'Dengan nama Allah dan dengan keberkahan Allah' },
	{ title: 'Doa Setelah Makan', arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ', latin: 'Alhamdulillahilladzi ath-amana wa saqana wa ja-alana muslimin', meaning: 'Segala puji bagi Allah yang telah memberi makan dan minum serta menjadikan kami muslim' },
	{ title: 'Doa Sebelum Tidur', arabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا', latin: 'Bismikallahumma amutu wa ahya', meaning: 'Dengan nama-Mu ya Allah, aku mati dan aku hidup' },
	{ title: 'Doa Bangun Tidur', arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ', latin: 'Alhamdulillahilladzi ahyana bada ma amatana wa ilaihin nusyur', meaning: 'Segala puji bagi Allah yang menghidupkan kami setelah mematikan kami dan kepada-Nya kebangkitan' },
	{ title: 'Doa Masuk Masjid', arabic: 'اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ', latin: 'Allahummaftah li abwaba rahmatik', meaning: 'Ya Allah, bukakanlah untukku pintu-pintu rahmat-Mu' },
	{ title: 'Doa Keluar Masjid', arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ', latin: 'Allahumma inni as-aluka min fadlik', meaning: 'Ya Allah, sesungguhnya aku memohon kepada-Mu dari keutamaan-Mu' },
	{ title: 'Doa Masuk Kamar Mandi', arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ', latin: 'Allahumma inni auzubika minal khubutsi wal khabaits', meaning: 'Ya Allah, aku berlindung kepada-Mu dari setan laki-laki dan perempuan' },
	{ title: 'Doa Keluar Kamar Mandi', arabic: 'غُفْرَانَكَ', latin: 'Ghufuranak', meaning: 'Aku memohon ampun-Mu' },
	{ title: 'Doa Sebelum Wudhu', arabic: 'بِسْمِ اللَّهِ', latin: 'Bismillah', meaning: 'Dengan nama Allah' },
	{ title: 'Doa Setelah Wudhu', arabic: 'أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ', latin: 'Asyhadu an la ilaha illallah wahdahu la syarika lahu wa asyhadu anna Muhammadan abduhu wa rasuluhu', meaning: 'Aku bersaksi bahwa tiada Tuhan selain Allah dan Muhammad adalah hamba dan utusan-Nya' },
	{ title: 'Doa Sebelum Membaca Al-Quran', arabic: 'اللَّهُمَّ افْتَحْ عَلَيْنَا حِكْمَتَكَ وَانْشُرْ عَلَيْنَا رَحْمَتَكَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ', latin: 'Allahummaftah alaina hikmataka wanshur alaina rahmataka ya dzal jalali wal ikram', meaning: 'Ya Allah, bukakanlah hikmah-Mu dan tebarkanlah rahmat-Mu atas kami' },
	{ title: 'Doa Untuk Kedua Orang Tua', arabic: 'رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا', latin: 'Rabbirhamhuma kama rabbayani shghira', meaning: 'Ya Tuhanku, kasihilah keduanya sebagaimana keduanya mendidik aku waktu kecil' },
	{ title: 'Doa Sebelum Belajar', arabic: 'رَبِّ زِدْنِي عِلْمًا', latin: 'Rabbi zidni ilma', meaning: 'Ya Tuhanku, tambahkanlah ilmu kepadaku' },
	{ title: 'Doa Setelah Belajar', arabic: 'اللَّهُمَّ انْفَعْنِي بِمَا عَلَّمْتَنِي وَعَلِّمْنِي مَا يَنْفَعُنِي', latin: 'Allahummanfa ni bima allamtani wa allimni ma yanfauni', meaning: 'Ya Allah, berikanlah manfaat atas ilmu yang Engkau ajarkan kepadaku dan ajarkan ilmu yang bermanfaat bagiku' },
	{ title: 'Doa Sebelum Perjalanan', arabic: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ', latin: 'Subhanalladzi sakhkhara lana hadza wa ma kunna lahu muqrinin', meaning: 'Maha Suci Allah yang menundukkan ini bagi kami dan kami tidak mampu menguasainya' },
	{ title: 'Doa Ketika Hujan', arabic: 'اللَّهُمَّ صَيِّبًا نَافِعًا', latin: 'Allahuma shayyiban nafian', meaning: 'Ya Allah, turunkanlah hujan yang bermanfaat' },
	{ title: 'Doa Ketika Mendengar Petir', arabic: 'سُبْحَانَ الَّذِي يُسَبِّحُ الرَّعْدُ بِحَمْدِهِ وَالْمَلَائِكَةُ مِنْ خِيفَتِهِ', latin: 'Subhanalladzi yusabbihur radu bihamdihi wal malaikatu min khifatihi', meaning: 'Maha Suci Allah yang petir bertasbih dengan memuji-Nya dan malaikat karena takut kepada-Nya' },
	{ title: 'Doa Ketika Angin Kencang', arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَهَا وَخَيْرَ مَا فِيهَا وَخَيْرَ مَا أَرْسَلْتَ بِهِ وَأَعُوذُ بِكَ مِنْ شَرِّهَا وَشَرِّ مَا فِيهَا وَشَرِّ مَا أَرْسَلْتَ بِهِ', latin: 'Allahumma inni as-aluka khairaha wa khaira ma fiha wa khaira ma arsalta bihi wa auzubika min sharriha wa sharri ma fiha wa sharri ma arsalta bihi', meaning: 'Ya Allah, aku memohon kebaikan angin, kebaikan isinya, dan kebaikan yang Engkau kirim dengannya' },
	{ title: 'Doa Memohon Ilmu', arabic: 'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي', latin: 'Rabbisyrakh li sadri wa yassir li amri', meaning: 'Ya Tuhanku, lapangkanlah dadaku dan mudahkanlah urusanku' },
	{ title: 'Doa Mohon Ampunan', arabic: 'رَبَّنَا ظَلَمْنَا أَنْفُسَنَا وَإِنْ لَمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ', latin: 'Rabbana zhalamna anfusana wa il lam taghfir lana wa tarhamna lanakunanna minal khasirin', meaning: 'Ya Tuhan kami, kami telah menganiaya diri kami sendiri, jika Engkau tidak mengampuni kami dan memberi rahmat kepada kami, niscaya pastilah kami termasuk orang-orang yang merugi' },
]

// ── Islamic Calendar Events ──
const ISLAMIC_EVENTS = [
	{ month: 1, name: 'Muharram', event: 'Tahun Baru Hijriyah' },
	{ month: 1, day: 10, name: 'Asyura', event: 'Hari Asyura - Puasa sunnah' },
	{ month: 3, name: 'Rabiul Awal', event: 'Bulan kelahiran Nabi Muhammad SAW' },
	{ month: 3, day: 12, name: 'Maulid Nabi', event: 'Hari kelahiran Nabi Muhammad SAW' },
	{ month: 7, name: 'Rajab', event: 'Bulan Isra Miraj' },
	{ month: 7, day: 27, name: 'Isra Miraj', event: 'Peristiwa Isra Miraj Nabi Muhammad SAW' },
	{ month: 8, name: 'Sya\'ban', event: 'Bulan persiapan Ramadhan' },
	{ month: 8, day: 15, name: 'Nisfu Sya\'ban', event: 'Malam pertengahan Sya\'ban' },
	{ month: 9, name: 'Ramadhan', event: 'Bulan puasa' },
	{ month: 9, day: 1, name: 'Awal Ramadhan', event: 'Hari pertama puasa Ramadhan' },
	{ month: 9, day: 17, name: 'Nuzulul Quran', event: 'Turunnya Al-Quran' },
	{ month: 9, day: 27, name: 'Lailatul Qadr', event: 'Malam kemuliaan (perkiraan)' },
	{ month: 10, name: 'Syawal', event: 'Hari Raya Idul Fitri' },
	{ month: 10, day: 1, name: 'Idul Fitri', event: 'Hari Raya Idul Fitri 1 Syawal' },
	{ month: 12, name: 'Dzulhijjah', event: 'Bulan Haji' },
	{ month: 12, day: 8, name: 'Hari Tarwiyah', event: 'Hari ke-8 Dzulhijjah' },
	{ month: 12, day: 9, name: 'Hari Arafah', event: 'Hari ke-9 Dzulhijjah - Puasa sunnah' },
	{ month: 12, day: 10, name: 'Idul Adha', event: 'Hari Raya Idul Adha 10 Dzulhijjah' },
	{ month: 12, day: 11, name: 'Hari Tasyrik', event: 'Hari ke-11 Dzulhijjah' },
	{ month: 12, day: 12, name: 'Hari Tasyrik', event: 'Hari ke-12 Dzulhijjah' },
	{ month: 12, day: 13, name: 'Hari Tasyrik', event: 'Hari ke-13 Dzulhijjah' },
]

// ── Quran Topics ──
const QURAN_TOPICS = {
	faith: { name: 'Iman', verses: ['2:285', '3:18', '4:136', '49:15'] },
	patience: { name: 'Kesabaran', verses: ['2:153', '2:155', '3:200', '13:24'] },
	gratitude: { name: 'Syukur', verses: ['2:152', '14:7', '27:40', '31:12'] },
	forgiveness: { name: 'Ampunan', verses: ['2:286', '3:31', '39:53', '42:25'] },
	mercy: { name: 'Kasih Sayang', verses: ['1:1', '6:54', '7:56', '21:107'] },
	prayer: { name: 'Doa', verses: ['2:186', '2:286', '3:38', '40:60'] },
	knowledge: { name: 'Ilmu', verses: ['2:269', '3:18', '20:114', '39:9'] },
	justice: { name: 'Keadilan', verses: ['4:135', '5:8', '7:29', '16:90'] },
	kindness: { name: 'Kebaikan', verses: ['2:195', '2:261', '5:2', '90:17'] },
	parents: { name: 'Orang Tua', verses: ['17:23', '17:24', '29:8', '31:14'] },
	charity: { name: 'Sedekah', verses: ['2:261', '2:265', '2:271', '57:7'] },
	peace: { name: 'Perdamaian', verses: ['2:208', '8:61', '25:63', '41:34'] },
	hope: { name: 'Harapan', verses: ['2:286', '3:139', '12:87', '39:53'] },
	love: { name: 'Cinta', verses: ['3:31', '5:54', '30:21', '85:14'] },
	halal: { name: 'Halal', verses: ['2:172', '5:88', '5:96', '16:114'] },
}

// Helper: fetch Quran ayah
async function fetchQuranAyah(ref) {
	try {
		const res = await fetch(`https://api.alquran.cloud/v1/ayah/${ref}/id.indonesian`)
		if (!res.ok) return null
		const data = await res.json()
		return data.data
	} catch { return null }
}

// Helper: fetch Hadith
async function fetchHadith(collection, number) {
	try {
		const res = await fetch(`https://api.sunnah.com/v1/hadiths/${collection}:${number}`)
		if (!res.ok) return null
		const data = await res.json()
		return data
	} catch { return null }
}

export const commands = {
	// ── Quran Verse ──
	quran: async m => {
		const { command, reply } = m
		const ref = command.args[0]
		if (!ref) {
			await reply(`📖 *Al-Quran*\n\nFormat:\n• .quran 1:1 — Surah:Ayat\n• .quran random — Ayat random\n• .quran topic faith — Ayat tentang iman\n• .quran list — Daftar topik`)
			return
		}
		if (ref === 'list') {
			const topics = Object.entries(QURAN_TOPICS).map(([k, v]) => `• ${k} — ${v.name}`).join('\n')
			await reply(`📖 *Quran Topics*\n\n${topics}`)
			return
		}
		if (ref === 'topic') {
			const topic = command.args[1]?.toLowerCase()
			if (!topic || !QURAN_TOPICS[topic]) {
				await reply('Topik tidak ditemukan. Ketik .quran list')
				return
			}
			const t = QURAN_TOPICS[topic]
			const verseRef = pick(t.verses)
			const ayah = await fetchQuranAyah(verseRef)
			if (!ayah) { await reply('Gagal mengambil ayat.'); return }
			await reply([
				`📖 *Ayat tentang ${t.name}*`,
				``,
				`🕌 ${ayah.surah.englishName} (${ayah.surah.number}:${ayah.numberInSurah})`,
				``,
				`📝 ${ayah.text}`,
				``,
				`🇮🇩 ${ayah.translation || ''}`,
			].join('\n'))
			return
		}
		if (ref === 'random') {
			const surah = Math.floor(Math.random() * 114) + 1
			const ayahNum = Math.floor(Math.random() * 30) + 1
			const ayah = await fetchQuranAyah(`${surah}:${ayahNum}`)
			if (!ayah) { await reply('Gagal mengambil ayat.'); return }
			await reply([
				`📖 *Ayat Random*`,
				``,
				`🕌 ${ayah.surah?.englishName || 'Surah ' + surah} (${surah}:${ayah.numberInSurah || ayahNum})`,
				``,
				`📝 ${ayah.text || ''}`,
				``,
				`🇮🇩 ${ayah.translation || ''}`,
			].join('\n'))
			return
		}
		// Specific verse
		const ayah = await fetchQuranAyah(ref)
		if (!ayah) { await reply(`Ayat ${ref} tidak ditemukan.`); return }
		await reply([
			`📖 *Al-Quran*`,
			``,
			`🕌 ${ayah.surah?.englishName || ''} (${ref})`,
			``,
			`📝 ${ayah.text || ''}`,
			``,
			`🇮🇩 ${ayah.translation || ''}`,
		].join('\n'))
	},

	// ── Surah Info ──
	surah: async m => {
		const { command, reply } = m
		const num = Number(command.args[0])
		if (!num || num < 1 || num > 114) {
			await reply('Format: .surah <1-114>')
			return
		}
		try {
			const res = await fetch(`https://api.alquran.cloud/v1/surah/${num}/id.indonesian`)
			if (!res.ok) throw new Error('API gagal')
			const data = await res.json()
			const s = data.data
			await reply([
				`🕌 *Surah ${s.englishName}*`,
				``,
				`📝 ${s.englishNameTranslation}`,
				`🔢 Nomor: ${s.number}`,
				`📊 Jumlah Ayat: ${s.numberOfAyahs}`,
				`📜 Tipe: ${s.revelationType === 'Meccan' ? 'Makkiyah' : 'Madaniyah'}`,
			].join('\n'))
		} catch {
			await reply('Gagal mengambil info surah.')
		}
	},

	// ── Hadith ──
	hadith: async m => {
		const { command, reply } = m
		const collection = command.args[0]?.toLowerCase()
		const collections = ['bukhari', 'muslim', 'abudawud', 'tirmidhi', 'nasai', 'ibnmajah', 'malik', 'ahmad']
		if (!collection) {
			await reply([
				`📜 *Hadith*`,
				``,
				`Format: .hadith <koleksi> <nomor>`,
				``,
				`Koleksi tersedia:`,
				collections.map(c => `• ${c}`).join('\n'),
			].join('\n'))
			return
		}
		if (!collections.includes(collection)) {
			await reply(`Koleksi "${collection}" tidak ditemukan. Tersedia: ${collections.join(', ')}`)
			return
		}
		const number = command.args[1]
		if (!number) {
			await reply(`Format: .hadith ${collection} <nomor>`)
			return
		}
		try {
			const res = await fetch(`https://api.sunnah.com/v1/hadiths/${collection}:${number}`, {
				headers: { 'Accept': 'application/json' }
			})
			if (!res.ok) throw new Error('Hadith tidak ditemukan')
			const data = await res.json()
			await reply([
				`📜 *Hadith*`,
				``,
				`📚 Koleksi: ${collection}`,
				`🔢 Nomor: ${number}`,
				``,
				data.body || data.text || '',
			].join('\n'))
		} catch {
			await reply(`Hadith ${collection}:${number} tidak ditemukan.`)
		}
	},

	// ── Asmaul Husna ──
	asmaulhusna: async m => {
		const { command, reply } = m
		const num = Number(command.args[0])
		if (!num) {
			// Show random
			const a = pick(ASMAUL_HUSNA)
			await reply([
				`✨ *Asmaul Husna #${a.num}*`,
				``,
				`🕌 ${a.arabic}`,
				`📝 ${a.latin}`,
				`🇮🇩 ${a.meaning}`,
			].join('\n'))
			return
		}
		if (num < 1 || num > 99) {
			await reply('Nomor asmaul husna: 1-99')
			return
		}
		const a = ASMAUL_HUSNA.find(x => x.num === num)
		if (!a) { await reply('Tidak ditemukan.'); return }
		await reply([
			`✨ *Asmaul Husna #${a.num}*`,
			``,
			`🕌 ${a.arabic}`,
			`📝 ${a.latin}`,
			`🇮🇩 ${a.meaning}`,
		].join('\n'))
	},

	ah: async m => await m.commands.asmaulhusna(m),

	// ── Asmaul Husna List ──
	asmaulhusnalist: async m => {
		const list = ASMAUL_HUSNA.map(a => `${a.num}. ${a.latin} — ${a.meaning}`).join('\n')
		await m.reply(`✨ *Asmaul Husna (99)*\n\n${list}`)
	},

	// ── Dhikr ──
	dhikr: async m => {
		const d = pick(DHIKR)
		await m.reply([
			`📿 *Dhikr*`,
			``,
			`🕌 ${d.arabic}`,
			`📝 ${d.latin}`,
			`🇮🇩 ${d.meaning}`,
			``,
			`🎁 Keutamaan: ${d.reward}`,
		].join('\n'))
	},

	// ── Dhikr List ──
	dhikrlist: async m => {
		const list = DHIKR.map((d, i) => `${i + 1}. ${d.latin} — ${d.meaning}`).join('\n')
		await m.reply(`📿 *Dhikr Collection (${DHIKR.length})*\n\n${list}`)
	},

	// ── Daily Doa ──
	doa: async m => {
		const { command, reply } = m
		const idx = Number(command.args[0])
		if (!idx) {
			const d = pick(DAILY_DOA)
			await reply([
				`🤲 *${d.title}*`,
				``,
				`🕌 ${d.arabic}`,
				`📝 ${d.latin}`,
				`🇮🇩 ${d.meaning}`,
			].join('\n'))
			return
		}
		if (idx < 1 || idx > DAILY_DOA.length) {
			await reply(`Nomor doa: 1-${DAILY_DOA.length}`)
			return
		}
		const d = DAILY_DOA[idx - 1]
		await reply([
			`🤲 *${d.title}*`,
			``,
			`🕌 ${d.arabic}`,
			`📝 ${d.latin}`,
			`🇮🇩 ${d.meaning}`,
		].join('\n'))
	},

	// ── Doa List ──
	doalist: async m => {
		const list = DAILY_DOA.map((d, i) => `${i + 1}. ${d.title}`).join('\n')
		await m.reply(`🤲 *Kumpulan Doa Harian (${DAILY_DOA.length})*\n\n${list}\n\nFormat: .doa <nomor>`)
	},

	// ── Prayer Times ──
	jadwalshalat: async m => {
		const { command, reply } = m
		const city = command.text || 'Jakarta'
		try {
			// Get city coordinates
			const geoRes = await fetch(`https://api.aladhan.com/v1/cityInfo?city=${encodeURIComponent(city)}&country=Indonesia&method=20`)
			if (geoRes.ok) {
				const geoData = await geoRes.json()
				if (geoData.code === 200) {
					const { latitude, longitude } = geoData.data
					const today = new Date().toISOString().split('T')[0]
					const prayerRes = await fetch(`https://api.aladhan.com/v1/timings/${today}?latitude=${latitude}&longitude=${longitude}&method=20`)
					if (prayerRes.ok) {
						const prayerData = await prayerRes.json()
						const t = prayerData.data.timings
						await reply([
							`🕌 *Jadwal Shalat - ${city}*`,
							`📅 ${today}`,
							``,
							`🌅 Imsak: ${t.Imsak}`,
							`🌅 Subuh: ${t.Fajr}`,
							`☀️ Syuruq: ${t.Sunrise}`,
							`🌞 Dzuhur: ${t.Dhuhr}`,
							`🌤 Ashar: ${t.Asr}`,
							`🌇 Maghrib: ${t.Maghrib}`,
							`🌙 Isya: ${t.Isha}`,
						].join('\n'))
						return
					}
				}
			}
			// Fallback: use Hijri calendar
			const today = new Date().toISOString().split('T')[0]
			const res = await fetch(`https://api.aladhan.com/v1/gpiAddress?address=${encodeURIComponent(city)}&method=20`)
			if (res.ok) {
				const data = await res.json()
				const t = data.data?.timings
				if (t) {
					await reply([
						`🕌 *Jadwal Shalat - ${city}*`,
						`📅 ${today}`,
						``,
						`🌅 Imsak: ${t.Imsak}`,
						`🌅 Subuh: ${t.Fajr}`,
						`☀️ Syuruq: ${t.Sunrise}`,
						`🌞 Dzuhur: ${t.Dhuhr}`,
						`🌤 Ashar: ${t.Asr}`,
						`🌇 Maghrib: ${t.Maghrib}`,
						`🌙 Isya: ${t.Isha}`,
					].join('\n'))
					return
				}
			}
			await reply('Gagal mengambil jadwal shalat. Coba nama kota lain.')
		} catch {
			await reply('Gagal mengambil jadwal shalat.')
		}
	},

	jadwalsholat: async m => await m.commands.jadwalshalat(m),

	// ── Hijri Calendar ──
	hijri: async m => {
		const { command, reply } = m
		const date = command.args[0] || new Date().toISOString().split('T')[0]
		try {
			const res = await fetch(`https://api.aladhan.com/v1/gpiDate?date=${date}&method=20`)
			if (!res.ok) {
				// Try alternate endpoint
				const today = new Date()
				const gd = today.getDate().toString().padStart(2, '0')
				const gm = (today.getMonth() + 1).toString().padStart(2, '0')
				const gy = today.getFullYear()
				const res2 = await fetch(`https://api.aladhan.com/v1/hpiCalendar?method=20&month=${gm}&year=${gy}`)
				if (!res2.ok) throw new Error('API gagal')
				const data = await res2.json()
				const h = data.data?.[0]?.hijri
				if (h) {
					await reply([
						`📅 *Kalender Hijriyah*`,
						``,
						`🗓 ${h.day} ${h.month.en} ${h.year} H`,
						`📝 ${h.day} ${h.month.ar} ${h.year} هـ`,
					].join('\n'))
					return
				}
				throw new Error('No data')
			}
			const data = await res.json()
			const h = data.data?.hijri
			if (!h) throw new Error('No hijri data')
			await reply([
				`📅 *Kalender Hijriyah*`,
				``,
				`🗓 Masehi: ${date}`,
				`🕌 Hijri: ${h.day} ${h.month?.en || h.month} ${h.year} H`,
				`📝 ${h.day} ${h.month?.ar || ''} ${h.year} هـ`,
			].join('\n'))
		} catch {
			await reply('Gagal mengkonversi ke kalender Hijriyah.')
		}
	},

	// ── Islamic Events ──
	islamicevent: async m => {
		const { command, reply } = m
		const month = Number(command.args[0])
		if (!month) {
			const list = ISLAMIC_EVENTS.map(e => `• Bulan ${e.month} — ${e.name}: ${e.event}`).join('\n')
			await reply(`🕌 *Peristiwa Islam*\n\n${list}`)
			return
		}
		const events = ISLAMIC_EVENTS.filter(e => e.month === month)
		if (!events.length) { await reply('Tidak ada event untuk bulan tersebut.'); return }
		await reply(events.map(e => `🕌 *${e.name}*\n📅 Bulan ${e.month}${e.day ? ', Hari ' + e.day : ''}\n📝 ${e.event}`).join('\n\n'))
	},

	// ── Quran Search ──
	quransearch: async m => {
		const { command, reply } = m
		const query = command.text
		if (!query) { await reply('Format: .quransearch <kata kunci>'); return }
		try {
			const res = await fetch(`https://api.alquran.cloud/v1/search/${encodeURIComponent(query)}/all/id.indonesian`)
			if (!res.ok) throw new Error('API gagal')
			const data = await res.json()
			const matches = data.data?.matches?.slice(0, 5)
			if (!matches?.length) { await reply(`Tidak ditemukan ayat mengandung "${query}".`); return }
			const results = matches.map(m => `• ${m.surah?.englishName || ''} (${m.surah?.number}:${m.numberInSurah}) — ${m.text?.substring(0, 100)}...`).join('\n\n')
			await reply(`🔍 *Hasil pencarian "${query}"*\n\n${results}\n\nTotal: ${data.data?.count || 0} ayat`)
		} catch {
			await reply('Gagal mencari di Al-Quran.')
		}
	},

	qs: async m => await m.commands.quransearch(m),

	// ── Tafsir ──
	tafsir: async m => {
		const { command, reply } = m
		const ref = command.args[0]
		if (!ref) { await reply('Format: .tafsir <surah:ayat>'); return }
		try {
			const res = await fetch(`https://api.alquran.cloud/v1/ayah/${ref}/id.muntakhab`)
			if (!res.ok) throw new Error('Tafsir tidak ditemukan')
			const data = await res.json()
			await reply([
				`📖 *Tafsir ${ref}*`,
				``,
				`📝 ${data.data?.text || ''}`,
			].join('\n'))
		} catch {
			await reply(`Tafsir untuk ${ref} tidak ditemukan.`)
		}
	},

	// ── Juz Info ──
	juz: async m => {
		const { command, reply } = m
		const num = Number(command.args[0])
		if (!num || num < 1 || num > 30) { await reply('Format: .juz <1-30>'); return }
		try {
			const res = await fetch(`https://api.alquran.cloud/v1/juz/${num}/id.indonesian`)
			if (!res.ok) throw new Error('API gagal')
			const data = await res.json()
			const ayahs = data.data?.ayahs
			if (!ayahs?.length) throw new Error('No data')
			const first = ayahs[0]
			const last = ayahs[ayahs.length - 1]
			await reply([
				`📖 *Juz ${num}*`,
				``,
				`🏁 Mulai: ${first.surah?.englishName || ''} : ${first.numberInSurah}`,
				`🔚 Akhir: ${last.surah?.englishName || ''} : ${last.numberInSurah}`,
				`📊 Total Ayat: ${ayahs.length}`,
			].join('\n'))
		} catch {
			await reply('Gagal mengambil info juz.')
		}
	},

	// ── Random Islamic Quote ──
	islamquote: async m => {
		const quotes = [
			'Barangsiapa yang menempuh jalan untuk mencari ilmu, maka Allah akan memudahkan baginya jalan menuju surga. — HR. Muslim',
			'Sebagian baiknya manusia adalah yang paling bermanfaat bagi manusia lainnya. — HR. Ahmad',
			'Tidaklah dua orang muslim berjumpa lalu berjabat tangan, melainkan keduanya diampuni sebelum berpisah. — HR. Abu Daud',
			'Sesungguhnya Allah tidak melihat pada tubuh dan rupa kalian, tetapi Allah melihat pada hati dan amal kalian. — HR. Muslim',
			'Orang yang kuat bukanlah orang yang dapat mengalahkan dengan gulatannya, tetapi orang yang kuat adalah orang yang mampu menahan diri ketika marah. — HR. Bukhari & Muslim',
			'Sebaik-baiknya kalian adalah yang belajar Al-Quran dan mengajarkannya. — HR. Bukhari',
			'Sesungguhnya di setiap kesulitan ada kemudahan. — QS. Al-Insyirah: 5-6',
			'Dan janganlah kamu berputus asa dari rahmat Allah. Sesungguhnya tiada berputus asa dari rahmat Allah melainkan orang-orang yang kafir. — QS. Yusuf: 87',
			'Maka sesungguhnya bersama kesulitan ada kemudahan. — QS. Al-Insyirah: 6',
			'Dan Kami tidak mengutus engkau (Muhammad) melainkan untuk seluruh umat manusia sebagai pembawa berita gembira dan sebagai pemberi peringatan. — QS. Saba: 28',
			'Janganlah kamu membenci satu sama lain, janganlah saling dengki, janganlah saling membelakangi, dan jadilah kalian hamba-hamba Allah yang bersaudara. — HR. Muslim',
			'Siapa yang menutupi aib saudaranya sesama muslim, maka Allah akan menutupi aibnya di hari kiamat. — HR. Bukhari & Muslim',
			'Sebagai rahmat-Ku telah meliputi segala sesuatu. — QS. Al-A\'raf: 156',
			'Dan Tuhanmu Maha Pemurah, — QS. Al-An\'am: 133',
			'Sesungguhnya Allah menyukai orang-orang yang bertaubat dan menyukai orang-orang yang mensucikan diri. — QS. Al-Baqarah: 222',
		]
		await m.reply(`🕌 *Islamic Quote*\n\n${pick(quotes)}`)
	},

	// ── Qibla Direction ──
	qibla: async m => {
		const { command, reply } = m
		const lat = Number(command.args[0])
		const lon = Number(command.args[1])
		if (!lat || !lon) {
			await reply('Format: .qibla <latitude> <longitude>\nContoh: .qibla -6.2088 106.8456 (Jakarta)')
			return
		}
		// Calculate Qibla direction (Kaaba: 21.4225, 39.8262)
		const kaabaLat = 21.4225 * Math.PI / 180
		const kaabaLon = 39.8262 * Math.PI / 180
		const myLat = lat * Math.PI / 180
		const myLon = lon * Math.PI / 180
		const dLon = kaabaLon - myLon
		const y = Math.sin(dLon) * Math.cos(kaabaLat)
		const x = Math.cos(myLat) * Math.sin(kaabaLat) - Math.sin(myLat) * Math.cos(kaabaLat) * Math.cos(dLon)
		let bearing = Math.atan2(y, x) * 180 / Math.PI
		bearing = ((bearing % 360) + 360) % 360
		const directions = ['Utara', 'Timur Laut', 'Timur', 'Tenggara', 'Selatan', 'Barat Daya', 'Barat', 'Barat Laut']
		const dirIdx = Math.round(bearing / 45) % 8
		await reply([
			`🧭 *Arah Qibla*`,
			``,
			`📍 Lokasi: ${lat}, ${lon}`,
			`🕌 Arah: ${bearing.toFixed(1)}° (${directions[dirIdx]})`,
			`🕋 Menuju Kaabah (Makkah)`,
		].join('\n'))
	},

	// ── Zakat Calculator ──
	zakat: async m => {
		const { command, reply } = m
		const type = command.args[0]?.toLowerCase()
		if (!type) {
			await reply([
				`💰 *Kalkulator Zakat*`,
				``,
				`Format:`,
				`• .zakat mal <jumlah_harta>`,
				`• .zakat fitrah <jumlah_jiwa>`,
				`• .zakat pertanian <hasil_panen>`,
				`• .zakat emas <berat_gram>`,
				`• .zakat perak <berat_gram>`,
				`• .zakat simpanan <jumlah>`,
				`• .zakat profesi <penghasilan_per_bulan>`,
			].join('\n'))
			return
		}
		const amount = Number(command.args[1])
		if (!amount) { await reply('Masukkan jumlah.'); return }
		let result = ''
		switch (type) {
			case 'mal':
				result = `💰 *Zakat Mal*\n\nHarta: Rp ${amount.toLocaleString()}\nZakat (2.5%): Rp ${(amount * 0.025).toLocaleString()}\nNisab: 85g emas (~Rp 85.000.000)`
				break
			case 'fitrah':
				result = `🍚 *Zakat Fitrah*\n\nJiwa: ${amount}\nZakat per jiwa: 2.5 kg makanan pokok / setara\nTotal: ${amount * 2.5} kg makanan pokok\nAtau setara uang (sesuai harga beras setempat)`
				break
			case 'pertanian':
				const rate = amount > 653 ? 0.05 : 0.1 // irrigated vs rain-fed
				result = `🌾 *Zakat Pertanian*\n\nHasil: ${amount} kg\nNisab: 653 kg\nRate: ${rate * 100}%\nZakat: ${(amount * rate).toFixed(1)} kg`
				break
			case 'emas':
				result = `🥇 *Zakat Emas*\n\nBerat: ${amount} gram\nNisab: 85 gram\n${amount >= 85 ? `Wajib zakat!\nZakat (2.5%): ${(amount * 0.025).toFixed(2)} gram` : 'Belum mencapai nisab (85 gram)'}`
				break
			case 'perak':
				result = `🥈 *Zakat Perak*\n\nBerat: ${amount} gram\nNisab: 595 gram\n${amount >= 595 ? `Wajib zakat!\nZakat (2.5%): ${(amount * 0.025).toFixed(2)} gram` : 'Belum mencapai nisab (595 gram)'}`
				break
			case 'simpanan':
				result = `🏦 *Zakat Simpanan*\n\nSimpanan: Rp ${amount.toLocaleString()}\nNisab: ~Rp 85.000.000\n${amount >= 85000000 ? `Wajib zakat!\nZakat (2.5%): Rp ${(amount * 0.025).toLocaleString()}` : 'Belum mencapai nisab'}`
				break
			case 'profesi':
				result = `💼 *Zakat Profesi*\n\nPenghasilan/bulan: Rp ${amount.toLocaleString()}\nTahunan: Rp ${(amount * 12).toLocaleString()}\nNisab: ~Rp 85.000.000/tahun\n${amount * 12 >= 85000000 ? `Wajib zakat!\nZakat (2.5%): Rp ${(amount * 12 * 0.025).toLocaleString()}/tahun\n         Rp ${(amount * 0.025).toLocaleString()}/bulan` : 'Belum mencapai nisab'}`
				break
			default:
				result = 'Tipe zakat tidak ditemukan. Ketik .zakat untuk list.'
		}
		await reply(result)
	},

	// ── Islamic Date ──
	islamicdate: async m => {
		try {
			const today = new Date()
			const d = today.getDate().toString().padStart(2, '0')
			const mo = (today.getMonth() + 1).toString().padStart(2, '0')
			const y = today.getFullYear()
			const res = await fetch(`https://api.aladhan.com/v1/hpiCalendar?method=20&month=${mo}&year=${y}`)
			if (!res.ok) throw new Error('API gagal')
			const data = await res.json()
			const todayData = data.data?.find(entry => entry.gregorian?.day === d)
			if (!todayData) throw new Error('No data for today')
			const h = todayData.hijri
			await reply([
				`📅 *Tanggal Islam Hari Ini*`,
				``,
				`🗓 Masehi: ${d}/${mo}/${y}`,
				`🕌 Hijri: ${h.day} ${h.month.en} ${h.year} H`,
				`📝 Arab: ${h.day} ${h.month.ar} ${h.year}`,
			].join('\n'))
		} catch {
			await reply('Gagal mengambil tanggal Hijriyah.')
		}
	},

	// ── 99 Names Quiz ──
	asmaulhusnaquiz: async m => {
		const { reply, chat, sender } = m
		const a = pick(ASMAUL_HUSNA)
		const question = `🕌 *Tebak Asmaul Husna*\n\nArab: ${a.arabic}\nLatin: ???\nArti: ${a.meaning}\n\nNomor: #${a.num}\n\nKetik jawaban (nama latin)!`
		await reply(question)
		// Store answer for checking
		if (m.gameSession) {
			m.gameSession.set(chat, { type: 'asmaulhusna', answer: a.latin.toLowerCase(), sender, timeout: 30000 })
		}
	},

	ahquiz: async m => await m.commands.asmaulhusnaquiz(m),

	// ── Quran Quiz ──
	quranquiz: async m => {
		const { reply, chat, sender } = m
		const surah = Math.floor(Math.random() * 114) + 1
		try {
			const res = await fetch(`https://api.alquran.cloud/v1/surah/${surah}/id.indonesian`)
			if (!res.ok) throw new Error('API gagal')
			const data = await res.json()
			const s = data.data
			const question = `📖 *Tebak Surah*\n\nNama terjemahan: ${s.englishNameTranslation}\nJumlah ayat: ${s.numberOfAyahs}\nTipe: ${s.revelationType === 'Meccan' ? 'Makkiyah' : 'Madaniyah'}\n\nSiapa nama surah ini?`
			await reply(question)
			if (m.gameSession) {
				m.gameSession.set(chat, { type: 'quranquiz', answer: s.englishName.toLowerCase(), sender, timeout: 30000 })
			}
		} catch {
			await reply('Gagal membuat quiz.')
		}
	},

	// ── Prayer Guide ──
	shalatguide: async m => {
		await m.reply([
			`🕌 *Tata Cara Shalat*`,
			``,
			`1️⃣ Niat (dalam hati)`,
			`2️⃣ Takbiratul Ihram`,
			`3️⃣ Doa Iftitah`,
			`4️⃣ Al-Fatihah`,
			`5️⃣ Surah/Al-Quran`,
			`6️⃣ Ruku + Tasbih 3x`,
			`7️⃣ I\'tidal`,
			`8️⃣ Sujud + Tasbih 3x`,
			`9️⃣ Duduk antara 2 sujud`,
			`🔟 Sujud ke-2`,
			`1️⃣1️⃣ Duduk tasyahud awal (rakaat ke-2)`,
			`1️⃣2️⃣ Tasyahud akhir + Syahadat`,
			`1️⃣3️⃣ Salam`,
			``,
			`📝 Rakaat per shalat:`,
			`• Subuh: 2 rakaat`,
			`• Dzuhur: 4 rakaat`,
			`• Ashar: 4 rakaat`,
			`• Maghrib: 3 rakaat`,
			`• Isya: 4 rakaat`,
		].join('\n'))
	},

	// ── Wudhu Guide ──
	wudhuguide: async m => {
		await m.reply([
			`💧 *Tata Cara Wudhu*`,
			``,
			`1️⃣ Niat`,
			`2️⃣ Membaca Bismillah`,
			`3️⃣ Membasuh muka`,
			`4️⃣ Membasuh tangan sampai siku`,
			`5️⃣ Mengusap kepala`,
			`6️⃣ Membasuh telinga`,
			`7️⃣ Membasuh kaki sampai mata kaki`,
			`8️⃣ Tertib (berurutan)`,
			``,
			`📿 Sunnah wudhu:`,
			`• Berkumur-kumur`,
			`• Istinsyaq (memasukkan air ke hidung)`,
			`• Istintsar (mengeluarkan air dari hidung)`,
			`• Membasuh sela-sela jari`,
			`• Mendahulukan anggota kanan`,
			`• Membaca doa setelah wudhu`,
		].join('\n'))
	},

	// ── Islamic Greeting ──
	assalamualaikum: async m => {
		const greetings = [
			'Waalaikumussalam warahmatullahi wabarakatuh 🕌',
			'Waalaikumussalam warahmatullah 🤲',
			'Waalaikumussalam 🕌 Semoga rahmat Allah menyertaimu',
		]
		await m.reply(pick(greetings))
	},

	// ── Islamic Fact ──
	islamicfact: async m => {
		const facts = [
			'Al-Quran memiliki 114 surah, 6.236 ayat, dan 30 juz.',
			'Surah terpanjang adalah Al-Baqarah dengan 286 ayat.',
			'Surah terpendek adalah Al-Kautsar dengan hanya 3 ayat.',
			'Surah Al-Fatihah disebut "Ummul Quran" (Induk Al-Quran).',
			'Basmalah muncul 114 kali dalam Al-Quran.',
			'Nama "Muhammad" disebutkan 4 kali dalam Al-Quran.',
			'Nama "Musa" adalah nama yang paling banyak disebut dalam Al-Quran (136 kali).',
			'Ada 15 sajdah (sujud tilawah) dalam Al-Quran.',
			'Surah An-Nas adalah surah terakhir dalam Al-Quran.',
			'Surah Al-Alaq ayat 1-5 adalah ayat pertama yang diturunkan.',
			'Surah Al-Muddastir ayat 1-7 adalah surah kedua yang diturunkan.',
			'Kaabah dibangun kembali oleh Nabi Ibrahim dan Ismail a.s.',
			'Isra Miraj terjadi pada 27 Rajab tahun ke-10 kenabian.',
			'Hari Jumat adalah hari terbaik menurut hadist.',
			'Puasa Ramadhan diwajibkan pada tahun ke-2 Hijriyah.',
			'Nabi Muhammad SAW wafat pada 12 Rabiul Awal tahun 11 H.',
			'Perang Badar terjadi pada 17 Ramadhan tahun 2 H.',
			'Perjanjian Hudaibiyah terjadi pada tahun 6 H.',
			'Penaklukan Makkah terjadi pada 8 H.',
			'Haji Wada (haji terakhir Nabi) terjadi pada 10 H.',
		]
		await m.reply(`🕌 *Fakta Islam*\n\n${pick(facts)}`)
	},

	// ── Islamic Name ──
	islamicname: async m => {
		const { command, reply } = m
		const gender = command.args[0]?.toLowerCase()
		const maleNames = [
			'Muhammad', 'Ahmad', 'Ibrahim', 'Ismail', 'Ishaq', 'Yusuf', 'Musa', 'Harun', 'Isa',
			'Umar', 'Utsman', 'Ali', 'Hasan', 'Husain', 'Bilal', 'Zaid', 'Hamzah', 'Abubakar',
			'Abdullah', 'Abdurrahman', 'Abdulaziz', 'Abdulmalik', 'Abdulhamid', 'Fahmi', 'Fikri',
			'Rizki', 'Hafizh', 'Zikri', 'Nabil', 'Faisal', 'Tariq', 'Zain', 'Aqil', 'Hakim',
			'Nasir', 'Amin', 'Syafiq', 'Rasyid', 'Khairul', 'Mahmud', 'Khalid', 'Salman', 'Ammar',
		]
		const femaleNames = [
			'Khadijah', 'Aisyah', 'Fatimah', 'Zainab', 'Maryam', 'Asiyah', 'Hajar', 'Siti',
			'Hafshah', 'Sumayyah', 'Ummu Salamah', 'Safiyyah', 'Ruqayyah', 'Ummu Kultsum',
			'Amina', 'Halimah', 'Zulaikha', 'Balqis', 'Asma', 'Atikah', 'Nur', 'Alya',
			'Safira', 'Khadijah', 'Salma', 'Hana', 'Layla', 'Amira', 'Nadia', 'Rania',
			'Syifa', 'Aira', 'Zahra', 'Nabila', 'Farah', 'Aida', 'Rahma', 'Salwa',
		]
		if (gender === 'male' || gender === 'laki') {
			await reply(`👦 *Nama Islami (Laki-laki)*\n\n${pick(maleNames)}`)
		} else if (gender === 'female' || gender === 'perempuan') {
			await reply(`👧 *Nama Islami (Perempuan)*\n\n${pick(femaleNames)}`)
		} else {
			await reply(`🕌 *Nama Islami Random*\n\n${pick([...maleNames, ...femaleNames])}\n\nFormat: .islamicname male/female`)
		}
	},

	// ── Dua for specific occasions ──
	dua: async m => {
		const { command, reply } = m
		const occasion = command.args[0]?.toLowerCase()
		const duas = {
			sick: { title: 'Doa Untuk Orang Sakit', arabic: 'اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَأْسَ اشْفِ أَنْتَ الشَّافِي لَا شِفَاءَ إِلَّا شِفَاؤُكَ شِفَاءً لَا يُغَادِرُ سَقَمًا', latin: 'Allahumma rabban-nas adhhibil-bas ishfi antash-shafi la shifa-a illa shifa-uka shifa-an la yughadiru saqama', meaning: 'Ya Allah Tuhan manusia, hilangkanlah penyakit, berikanlah kesembuhan, Engkau Maha Penyembuh, tidak ada kesembuhan kecuali kesembuhan dari-Mu' },
			travel: { title: 'Doa Bepergian', arabic: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ', latin: 'Subhanalladzi sakhkhara lana hadza wa ma kunna lahu muqrinin wa inna ila rabbina lamunqalibun', meaning: 'Maha Suci Allah yang menundukkan ini bagi kami, dan kami tidak mampu menguasainya, dan sesungguhnya kami akan kembali kepada Tuhan kami' },
			fear: { title: 'Doa Ketika Takut', arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ هَمٍّ يَحْزُنُنِي وَأَعُوذُ بِكَ مِنْ عِلْمٍ لَا يَنْفَعُ وَمِنْ قَلْبٍ لَا يَخْشَعُ وَمِنْ نَفْسٍ لَا تَشْبَعُ وَمِنْ دَعْوَةٍ لَا يُسْتَجَابُ لَهَا', latin: 'Allahumma inni auzubika min hammin yahzununii wa auzubika min ilmin la yanfau wa min qalbin la yakhshau wa min nafsin la tashbau wa min dawatin la yustajabu laha', meaning: 'Ya Allah aku berlindung dari kesedihan, ilmu yang tidak bermanfaat, hati yang tidak khusyuk, nafsu yang tidak puas, dan doa yang tidak dikabulkan' },
			anxiety: { title: 'Doa Ketika Cemas', arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ وَأَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ وَأَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ', latin: 'Allahumma inni auzubika minal hammi wal hazan wa auzubika minal ajzi wal kasal wa auzubika minal jubni wal bukhl wa auzubika min ghalabatid-dayni wa qahrir-rijal', meaning: 'Ya Allah aku berlindung dari kegelisahan dan kesedihan, dari kelemahan dan kemalasan, dari kepengecutan dan kekikiran, dan dari lilitan hutang dan penindasan orang' },
			anger: { title: 'Doa Ketika Marah', arabic: 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ', latin: 'Auzubillahi minasy-syaithanir-rajim', meaning: 'Aku berlindung kepada Allah dari setan yang terkutuk' },
			food: { title: 'Doa Sebelum Makan', arabic: 'بِسْمِ اللَّهِ وَعَلَى بَرَكَةِ اللَّهِ', latin: 'Bismillahi wa ala barakatillah', meaning: 'Dengan nama Allah dan dengan keberkahan Allah' },
			exam: { title: 'Doa Sebelum Ujian', arabic: 'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي وَاحْلُلْ عُقْدَةً مِنْ لِسَانِي يَفْقَهُوا قَوْلِي', latin: 'Rabbisyrakh li sadri wa yassir li amri wahlul uqdatan min lisani yafqahu qauli', meaning: 'Ya Tuhanku, lapangkanlah dadaku, mudahkanlah urusanku, dan lepaskanlah kekakuan dari lidahku agar mereka memahami perkataanku' },
			marriage: { title: 'Doa Pernikahan', arabic: 'بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ', latin: 'Barakallahu laka wa baraka alaika wa jama-a bainakuma fi khair', meaning: 'Semoga Allah memberkahi kamu dan memberkahi atasmu serta mengumpulkan kalian dalam kebaikan' },
			death: { title: 'Doa Untuk Orang Meninggal', arabic: 'اللَّهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَعَافِهِ وَاعْفُ عَنْهُ', latin: 'Allahummaghfir lahu warhamhu wa afihi wafu anhu', meaning: 'Ya Allah, ampunilah dia, kasihilah dia, sejahterakanlah dia, dan maafkanlah dia' },
			home: { title: 'Doa Masuk Rumah', arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ الْمَوْلِجِ وَخَيْرَ الْمَخْرَجِ بِسْمِ اللَّهِ وَلَجْنَا وَبِسْمِ اللَّهِ خَرَجْنَا وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا', latin: 'Allahumma inni as-aluka khairal-mauliji wa khairal-makhraji bismillahi walajna wa bismillahi kharajna wa alallahi rabbina tawakkalna', meaning: 'Ya Allah aku memohon kebaikan tempat masuk dan keluar, dengan nama Allah kami masuk dan keluar, dan kepada Allah Tuhan kami bertawakkal' },
		}
		if (!occasion) {
			await reply(`🤲 *Doa untuk Berbagai Keperluan*\n\n${Object.keys(duas).map(k => `• ${k}`).join('\n')}\n\nFormat: .dua <keperluan>`)
			return
		}
		const d = duas[occasion]
		if (!d) { await reply(`Doa untuk "${occasion}" tidak ditemukan. Ketik .dua untuk list.`); return }
		await reply([
			`🤲 *${d.title}*`,
			``,
			`🕌 ${d.arabic}`,
			`📝 ${d.latin}`,
			`🇮🇩 ${d.meaning}`,
		].join('\n'))
	},

	// ── Ramadan Info ──
	ramadhan: async m => {
		await m.reply([
			`🌙 *Info Ramadhan*`,
			``,
			`📋 Kewajiban:`,
			`• Puasa dari Subuh sampai Maghrib`,
			`• Menahan diri dari makan, minum, dan hal yang membatalkan`,
			``,
			`✅ Yang Sunnah:`,
			`• Sahur sebelum Subuh`,
			`• Berbuka segera saat Maghrib`,
			`• Tarawih di malam hari`,
			`• Tadarus Al-Quran`,
			`• Sedekah & amal kebaikan`,
			`• I\'tikaf di 10 hari terakhir`,
			``,
			`❌ Yang Membatalkan:`,
			`• Makan & minum dengan sengaja`,
			`• Muntah dengan sengaja`,
			`• Berhubungan suami istri`,
			``,
			`🎁 Keutamaan:`,
			`• Pahala dilipatgandakan`,
			`• Doa mustajab saat berbuka`,
			`• Lailatul Qadr lebih baik dari 1000 bulan`,
		].join('\n'))
	},

	// ── Hajj Guide ──
	hajjguide: async m => {
		await m.reply([
			`🕋 *Panduan Haji*`,
			``,
			`📋 Rukun Haji:`,
			`1️⃣ Ihram`,
			`2️⃣ Tawaf`,
			`3️⃣ Sa'i`,
			`4️⃣ Wukuf di Arafah`,
			`5️⃣ Tahallul`,
			`6️⃣ Tertib (berurutan)`,
			``,
			`📅 Hari-hari Haji:`,
			`• 8 Dzulhijjah: Hari Tarwiyah → Mina`,
			`• 9 Dzulhijjah: Hari Arafah → Wukuf`,
			`• 10 Dzulhijjah: Idul Adha → Lontar Jumrah`,
			`• 11-13 Dzulhijjah: Hari Tasyrik`,
		].join('\n'))
	},

	// ── Umrah Guide ──
	umrahguide: async m => {
		await m.reply([
			`🕋 *Panduan Umrah*`,
			``,
			`📋 Rukun Umrah:`,
			`1️⃣ Ihram`,
			`2️⃣ Tawaf`,
			`3️⃣ Sa'i`,
			`4️⃣ Tahallul`,
			`5️⃣ Tertib`,
			``,
			`📝 Langkah-langkah:`,
			`1. Berihram dari Miqat`,
			`2. Tawaf 7 keliling Kaabah`,
			`3. Shalat 2 rakaat di belakang Maqam Ibrahim`,
			`4. Sa'i 7 kali antara Shafa dan Marwah`,
			`5. Tahallul (mencukur/memotong rambut)`,
		].join('\n'))
	},

	// ── Islamic Ruling ──
	fatwa: async m => {
		const { command, reply } = m
		const topic = command.text
		if (!topic) {
			await reply('Format: .fatwa <topik>\nContoh: .fatwa zakat, .fatwa nikah, .fatwa puasa')
			return
		}
		// General Islamic rulings reference
		const rulings = {
			zakat: '💰 Zakat adalah rukun Islam ke-3. Wajib bagi muslim yang hartanya mencapai nisab. Rate umum 2.5% untuk harta simpanan.',
			nikah: '💍 Pernikahan dalam Islam adalah ibadah yang disunnahkan. Syarat: wali, 2 saksi, mahar, ijab-qabul.',
			puasa: '🌙 Puasa Ramadhan wajib bagi muslim baligh, berakal, dan sehat. Yang tidak mampu boleh mengganti di hari lain.',
			shalat: '🕌 Shalat 5 waktu wajib bagi muslim baligh dan berakal. Dimulai dari takbir, diakhiri salam.',
			haji: '🕋 Haji wajib sekali seumur hidup bagi yang mampu. Rukun: Ihram, Tawaf, Sa\'i, Wukuf, Tahallul, Tertib.',
			jualbeli: '🛒 Jual beli halal jika: barang halal, sukarela, tanpa penipuan, tanpa riba.',
			riba: '🚫 Riba haram dalam Islam. Termasuk bunga bank, lebihan tanpa ganti, dan sistem keuangan eksploitatif.',
			warisan: '📜 Warisan diatur dalam Al-Quran (QS. An-Nisa: 11-12). Pembagian berdasarkan kedekatan nasab.',
			thalaq: '💔 Thalaq (cerai) diperbolehkan tapi dibenci Allah. Prosedur: 1 thalaq, iddah 3 kali suci, rujuk atau thalaq ke-2.',
			aurat: '👗 Aurat laki-laki: pusar-lutut. Aurat perempuan: seluruh tubuh kecuali wajah dan telapak tangan (menurut mayoritas ulama).',
		}
		const key = Object.keys(rulings).find(k => topic.toLowerCase().includes(k))
		if (key) {
			await reply(rulings[key])
		} else {
			await reply(`Topik "${topic}" belum tersedia. Tersedia: ${Object.keys(rulings).join(', ')}`)
		}
	},
}
