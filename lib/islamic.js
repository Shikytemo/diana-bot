// ═══════════════════════════════════════════════════════════════
// islamic.js — Islamic Features Module (40+ commands)
// All data embedded — no external API needed
// ═══════════════════════════════════════════════════════════════

// ── 1. Asmaul Husna — 99 Names of Allah ──────────────────────
const ASMAULHUSNA = [
{no:1,ar:'اَللّٰهُ',latin:'Allah',meaning:'Allah (Tuhan)'},
{no:2,ar:'اَلرَّحْمٰنُ',latin:'Ar-Rahman',meaning:'Yang Maha Pengasih'},
{no:3,ar:'اَلرَّحِيْمُ',latin:'Ar-Rahim',meaning:'Yang Maha Penyayang'},
{no:4,ar:'اَلْمَلِكُ',latin:'Al-Malik',meaning:'Yang Maha Merajai'},
{no:5,ar:'اَلْقُدُّوْسُ',latin:'Al-Quddus',meaning:'Yang Maha Suci'},
{no:6,ar:'اَلسَّلَامُ',latin:'As-Salam',meaning:'Yang Maha Memberi Kesejahteraan'},
{no:7,ar:'اَلْمُؤْمِنُ',latin:"Al-Mu'min",meaning:'Yang Maha Memberi Keamanan'},
{no:8,ar:'اَلْمُهَيْمِنُ',latin:'Al-Muhaimin',meaning:'Yang Maha Mengawasi'},
{no:9,ar:'اَلْعَزِيْزُ',latin:'Al-Aziz',meaning:'Yang Maha Perkasa'},
{no:10,ar:'اَلْجَبَّارُ',latin:'Al-Jabbar',meaning:'Yang Maha Memaksa'},
{no:11,ar:'اَلْمُتَكَبِّرُ',latin:'Al-Mutakabbir',meaning:'Yang Maha Megah'},
{no:12,ar:'اَلْخَالِقُ',latin:'Al-Khaliq',meaning:'Yang Maha Pencipta'},
{no:13,ar:'اَلْبَارِئُ',latin:"Al-Bari'",meaning:'Yang Maha Melepaskan'},
{no:14,ar:'اَلْمُصَوِّرُ',latin:'Al-Mushawwir',meaning:'Yang Maha Membentuk'},
{no:15,ar:'اَلْغَفَّارُ',latin:'Al-Ghaffar',meaning:'Yang Maha Pengampun'},
{no:16,ar:'اَلْقَهَّارُ',latin:'Al-Qahhar',meaning:'Yang Maha Menaklukkan'},
{no:17,ar:'اَلْوَهَّابُ',latin:'Al-Wahhab',meaning:'Yang Maha Pemberi'},
{no:18,ar:'اَلرَّزَّاقُ',latin:'Ar-Razzaq',meaning:'Yang Maha Pemberi Rezeki'},
{no:19,ar:'اَلْفَتَّاحُ',latin:'Al-Fattah',meaning:'Yang Maha Pembuka'},
{no:20,ar:'اَلْعَلِيْمُ',latin:'Al-Alim',meaning:'Yang Maha Mengetahui'},
{no:21,ar:'اَلْقَابِضُ',latin:'Al-Qabidh',meaning:'Yang Maha Menyempitkan'},
{no:22,ar:'اَلْبَاسِطُ',latin:'Al-Basith',meaning:'Yang Maha Melapangkan'},
{no:23,ar:'اَلْخَافِضُ',latin:'Al-Khafidh',meaning:'Yang Maha Merendahkan'},
{no:24,ar:'اَلرَّافِعُ',latin:"Ar-Rafi'",meaning:'Yang Maha Meninggikan'},
{no:25,ar:'اَلْمُعِزُّ',latin:"Al-Mu'izz",meaning:'Yang Maha Memuliakan'},
{no:26,ar:'اَلْمُذِلُّ',latin:'Al-Mudhill',meaning:'Yang Maha Menghinakan'},
{no:27,ar:'اَلسَّمِيْعُ',latin:"As-Sami'",meaning:'Yang Maha Mendengar'},
{no:28,ar:'اَلْبَصِيْرُ',latin:'Al-Bashir',meaning:'Yang Maha Melihat'},
{no:29,ar:'اَلْحَكَمُ',latin:'Al-Hakam',meaning:'Yang Maha Menimbang'},
{no:30,ar:'اَلْعَدْلُ',latin:'Al-Adl',meaning:'Yang Maha Adil'},
{no:31,ar:'اَللَّطِيْفُ',latin:'Al-Lathif',meaning:'Yang Maha Lembut'},
{no:32,ar:'اَلْخَبِيْرُ',latin:'Al-Khabir',meaning:'Yang Maha Mengetahui'},
{no:33,ar:'اَلْحَلِيْمُ',latin:'Al-Halim',meaning:'Yang Maha Penyantun'},
{no:34,ar:'اَلْعَظِيْمُ',latin:'Al-Azhim',meaning:'Yang Maha Agung'},
{no:35,ar:'اَلْغَفُوْرُ',latin:'Al-Ghafur',meaning:'Yang Maha Pengampun'},
{no:36,ar:'اَلشَّكُوْرُ',latin:'As-Syakur',meaning:'Yang Maha Pembalas'},
{no:37,ar:'اَلْعَلِيُّ',latin:'Al-Aliyy',meaning:'Yang Maha Tinggi'},
{no:38,ar:'اَلْكَبِيْرُ',latin:'Al-Kabir',meaning:'Yang Maha Besar'},
{no:39,ar:'اَلْحَفِيْظُ',latin:'Al-Hafizh',meaning:'Yang Maha Memelihara'},
{no:40,ar:'اَلْمُقِيْتُ',latin:'Al-Muqit',meaning:'Yang Maha Pemberi Kecukupan'},
{no:41,ar:'اَلْحَسِيْبُ',latin:'Al-Hasib',meaning:'Yang Maha Membuat Perhitungan'},
{no:42,ar:'اَلْجَلِيْلُ',latin:'Al-Jalil',meaning:'Yang Maha Luhur'},
{no:43,ar:'اَلْكَرِيْمُ',latin:'Al-Karim',meaning:'Yang Maha Pemurah'},
{no:44,ar:'اَلرَّقِيْبُ',latin:'Ar-Raqib',meaning:'Yang Maha Mengawasi'},
{no:45,ar:'اَلْمُجِيْبُ',latin:'Al-Mujib',meaning:'Yang Maha Memperkenankan'},
{no:46,ar:'اَلْوَاسِعُ',latin:"Al-Wasi'",meaning:'Yang Maha Luas'},
{no:47,ar:'اَلْحَكِيْمُ',latin:'Al-Hakim',meaning:'Yang Maha Bijaksana'},
{no:48,ar:'اَلْوَدُوْدُ',latin:'Al-Wadud',meaning:'Yang Maha Mengasihi'},
{no:49,ar:'اَلْمَجِيْدُ',latin:'Al-Majid',meaning:'Yang Maha Mulia'},
{no:50,ar:'اَلْبَاعِثُ',latin:"Al-Ba'its",meaning:'Yang Maha Membangkitkan'},
{no:51,ar:'اَلشَّهِيْدُ',latin:'As-Syahid',meaning:'Yang Maha Menyaksikan'},
{no:52,ar:'اَلْحَقُّ',latin:'Al-Haqq',meaning:'Yang Maha Benar'},
{no:53,ar:'اَلْوَكِيْلُ',latin:'Al-Wakil',meaning:'Yang Maha Mewakili'},
{no:54,ar:'اَلْقَوِيُّ',latin:'Al-Qawiyy',meaning:'Yang Maha Kuat'},
{no:55,ar:'اَلْمَتِيْنُ',latin:'Al-Matin',meaning:'Yang Maha Kokoh'},
{no:56,ar:'اَلْوَلِيُّ',latin:'Al-Waliyy',meaning:'Yang Maha Melindungi'},
{no:57,ar:'اَلْحَمِيْدُ',latin:'Al-Hamid',meaning:'Yang Maha Terpuji'},
{no:58,ar:'اَلْمُحْصِيْ',latin:'Al-Muhshi',meaning:'Yang Maha Menghitung'},
{no:59,ar:'اَلْمُبْدِئُ',latin:"Al-Mubdi'",meaning:'Yang Maha Memulai'},
{no:60,ar:'اَلْمُعِيْدُ',latin:"Al-Mu'id",meaning:'Yang Maha Mengembalikan'},
{no:61,ar:'اَلْمُحْيِيْ',latin:'Al-Muhyi',meaning:'Yang Maha Menghidupkan'},
{no:62,ar:'اَلْمُمِيْتُ',latin:'Al-Mumit',meaning:'Yang Maha Mematikan'},
{no:63,ar:'اَلْحَيُّ',latin:'Al-Hayy',meaning:'Yang Maha Hidup'},
{no:64,ar:'اَلْقَيُّوْمُ',latin:'Al-Qayyum',meaning:'Yang Maha Berdiri Sendiri'},
{no:65,ar:'اَلْوَاجِدُ',latin:'Al-Wajid',meaning:'Yang Maha Menemukan'},
{no:66,ar:'اَلْمَاجِدُ',latin:'Al-Majid',meaning:'Yang Maha Mulia'},
{no:67,ar:'اَلْوَاحِدُ',latin:'Al-Wahid',meaning:'Yang Maha Esa'},
{no:68,ar:'اَلصَّمَدُ',latin:'As-Shamad',meaning:'Yang Maha Dituju'},
{no:69,ar:'اَلْقَادِرُ',latin:'Al-Qadir',meaning:'Yang Maha Kuasa'},
{no:70,ar:'اَلْمُقْتَدِرُ',latin:'Al-Muqtadir',meaning:'Yang Maha Berkuasa'},
{no:71,ar:'اَلْمُقَدِّمُ',latin:'Al-Muqaddim',meaning:'Yang Maha Mendahulukan'},
{no:72,ar:'اَلْمُؤَخِّرُ',latin:"Al-Mu'akhkhir",meaning:'Yang Maha Mengakhirkan'},
{no:73,ar:'اَلْاَوَّلُ',latin:'Al-Awwal',meaning:'Yang Maha Awal'},
{no:74,ar:'اَلْاٰخِرُ',latin:'Al-Akhir',meaning:'Yang Maha Akhir'},
{no:75,ar:'اَلظَّاهِرُ',latin:'Az-Zahir',meaning:'Yang Maha Nyata'},
{no:76,ar:'اَلْبَاطِنُ',latin:'Al-Bathin',meaning:'Yang Maha Tersembunyi'},
{no:77,ar:'اَلْوَالِيْ',latin:'Al-Wali',meaning:'Yang Maha Menguasai'},
{no:78,ar:'اَلْمُتَعَالِيْ',latin:"Al-Muta'ali",meaning:'Yang Maha Tinggi'},
{no:79,ar:'اَلْبَرُّ',latin:'Al-Barr',meaning:'Yang Maha Dermawan'},
{no:80,ar:'اَلتَّوَّابُ',latin:'At-Tawwab',meaning:'Yang Maha Menerima Tobat'},
{no:81,ar:'اَلْمُنْتَقِمُ',latin:'Al-Muntaqim',meaning:'Yang Maha Membalas'},
{no:82,ar:'اَلْعَفُوُّ',latin:'Al-Afuww',meaning:'Yang Maha Pemaaf'},
{no:83,ar:'اَلرَّؤُوْفُ',latin:"Ar-Ra'uf",meaning:'Yang Maha Pengasih'},
{no:84,ar:'مَالِكُ الْمُلْكِ',latin:'Malikul Mulk',meaning:'Yang Maha Penguasa Kerajaan'},
{no:85,ar:'ذُو الْجَلَالِ وَالْاِكْرَامِ',latin:'Dzul Jalali Wal Ikram',meaning:'Yang Maha Agung dan Mulia'},
{no:86,ar:'اَلْمُقْسِطُ',latin:'Al-Muqsit',meaning:'Yang Maha Adil'},
{no:87,ar:'اَلْجَامِعُ',latin:"Al-Jami'",meaning:'Yang Maha Mengumpulkan'},
{no:88,ar:'اَلْغَنِيُّ',latin:'Al-Ghaniyy',meaning:'Yang Maha Kaya'},
{no:89,ar:'اَلْمُغْنِيْ',latin:'Al-Mughni',meaning:'Yang Maha Pemberi Kekayaan'},
{no:90,ar:'اَلْمَانِعُ',latin:"Al-Mani'",meaning:'Yang Maha Mencegah'},
{no:91,ar:'اَلضَّارُّ',latin:'Ad-Darr',meaning:'Yang Maha Memberi Derita'},
{no:92,ar:'اَلنَّافِعُ',latin:"An-Nafi'",meaning:'Yang Maha Memberi Manfaat'},
{no:93,ar:'اَلنُّوْرُ',latin:'An-Nur',meaning:'Yang Maha Bercahaya'},
{no:94,ar:'اَلْهَادِيْ',latin:'Al-Hadi',meaning:'Yang Maha Pemberi Petunjuk'},
{no:95,ar:'اَلْبَدِيْعُ',latin:"Al-Badi'",meaning:'Yang Maha Pencipta Baru'},
{no:96,ar:'اَلْبَاقِيْ',latin:'Al-Baqi',meaning:'Yang Maha Kekal'},
{no:97,ar:'اَلْوَارِثُ',latin:'Al-Warith',meaning:'Yang Maha Mewarisi'},
{no:98,ar:'اَلرَّشِيْدُ',latin:'Ar-Rasyid',meaning:'Yang Maha Pandai'},
{no:99,ar:'اَلصَّبُوْرُ',latin:'As-Shabur',meaning:'Yang Maha Sabar'},
]

// ── 2. Doa Harian — 30 Daily Prayers ─────────────────────────
const DOAHARIAN = [
{no:1,title:'Doa Sebelum Makan',ar:'بِسْمِ اللّٰهِ وَبَرَكَةِ اللّٰهِ',latin:'Bismillahi wa barakatillah',meaning:'Dengan nama Allah dan dengan keberkahan Allah'},
{no:2,title:'Doa Sesudah Makan',ar:'اَلْحَمْدُ لِلّٰهِ الَّذِيْ اَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِيْنَ',latin:"Alhamdulillahilladzi ath'amana wa saqana wa ja'alana muslimin",meaning:'Segala puji bagi Allah yang memberi makan dan minum serta menjadikan kami muslim'},
{no:3,title:'Doa Sebelum Tidur',ar:'بِاسْمِكَ اللّٰهُمَّ اَمُوْتُ وَاَحْيَا',latin:'Bismikallahumma amutu wa ahya',meaning:'Dengan nama-Mu ya Allah aku mati dan aku hidup'},
{no:4,title:'Doa Bangun Tidur',ar:'اَلْحَمْدُ لِلّٰهِ الَّذِيْ اَحْيَانَا بَعْدَ مَا اَمَاتَنَا وَاِلَيْهِ النُّشُوْرُ',latin:"Alhamdulillahilladzi ahyana ba'da ma amatana wa ilaihin nusyur",meaning:'Segala puji bagi Allah yang menghidupkan kami setelah mematikan kami'},
{no:5,title:'Doa Masuk Masjid',ar:'اَللّٰهُمَّ افْتَحْ لِيْ اَبْوَابَ رَحْمَتِكَ',latin:'Allahummaftah li abwaba rahmatik',meaning:'Ya Allah bukakan untukku pintu-pintu rahmat-Mu'},
{no:6,title:'Doa Keluar Masjid',ar:'اَللّٰهُمَّ اِنِّيْ اَسْاَلُكَ مِنْ فَضْلِكَ',latin:"Allahumma inni as'aluka min fadlik",meaning:'Ya Allah sesungguhnya aku memohon keutamaan-Mu'},
{no:7,title:'Doa Sebelum Wudhu',ar:'بِسْمِ اللّٰهِ وَالْحَمْدُ لِلّٰهِ',latin:'Bismillahi walhamdulillah',meaning:'Dengan nama Allah dan segala puji bagi Allah'},
{no:8,title:'Doa Sesudah Wudhu',ar:'اَشْهَدُ اَنْ لَا اِلٰهَ اِلَّا اللّٰهُ وَحْدَهُ لَا شَرِيْكَ لَهُ وَاَشْهَدُ اَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُوْلُهُ',latin:'Asyhadu an la ilaha illallahu wahdahu la syarikalah wa asyhadu anna Muhammadan abduhu wa rasuluh',meaning:'Aku bersaksi tidak ada Tuhan selain Allah dan Muhammad utusan-Nya'},
{no:9,title:'Doa Masuk Kamar Mandi',ar:'اَللّٰهُمَّ اِنِّيْ اَعُوْذُبِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ',latin:"Allahumma inni a'udzubika minal khubutsi wal khoba-its",meaning:'Ya Allah aku berlindung dari setan laki-laki dan perempuan'},
{no:10,title:'Doa Keluar Kamar Mandi',ar:'غُفْرَانَكَ اَلْحَمْدُ لِلّٰهِ الَّذِيْ اَذْهَبَ عَنِّي الْاَذٰى وَعَافَانِيْ',latin:'Ghufiranak, alhamdulillahilladzi adzhaba annil adza wa afani',meaning:'Ampunan-Mu, segala puji bagi Allah yang menghilangkan kotoran dan menyehatkanku'},
{no:11,title:'Doa Sebelum Belajar',ar:'بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ رَبِّ زِدْنِيْ عِلْمًا وَارْزُقْنِيْ فَهْمًا',latin:'Bismillahirrahmanirrahim, rabbi zidni ilman warzuqni fahman',meaning:'Ya Allah tambahkan ilmu dan rezekikan pemahaman'},
{no:12,title:'Doa Sesudah Belajar',ar:'اَللّٰهُمَّ اِنِّيْ اَسْتَوْدِعُكَ مَا عَلَّمْتَنِيْهِ فَرُدَّهُ اِلَيَّ عِنْدَ حَاجَتِيْ',latin:"Allahumma inni astaudi'uka ma allamtanihi faruddhu ilayya inda hajati",meaning:'Ya Allah aku titipkan ilmu yang Engkau ajarkan, kembalikan saat aku butuh'},
{no:13,title:'Doa Sebelum Bercermin',ar:'اَلْحَمْدُ لِلّٰهِ الَّذِيْ خَلَقَنِيْ فَاَحْسَنَ خَلْقِيْ وَرَوَّعَ صُوْرِيْ',latin:'Alhamdulillahilladzi khalaqani fa-ahsana kholqi wa rawwa-a shuri',meaning:'Segala puji bagi Allah yang menciptakanku dan membaguskan rupa serta wajahku'},
{no:14,title:'Doa Memakai Pakaian',ar:'بِسْمِ اللّٰهِ اَللّٰهُمَّ اِنِّيْ اَسْاَلُكَ مِنْ خَيْرِهِ وَخَيْرِ مَا هُوَ لَهُ وَاَعُوْذُبِكَ مِنْ شَرِّهِ وَشَرِّ مَا هُوَ لَهُ',latin:"Bismillah, Allahumma inni as'aluka min khoirihi wa khoiri ma huwa lahu wa a'udzubika min syarrihi wa syarri ma huwa lahu",meaning:'Ya Allah aku mohon kebaikannya dan berlindung dari keburukannya'},
{no:15,title:'Doa Menanggalkan Pakaian',ar:'بِسْمِ اللّٰهِ',latin:'Bismillah',meaning:'Dengan nama Allah'},
{no:16,title:'Doa Masuk Rumah',ar:'اَللّٰهُمَّ اِنِّيْ اَسْاَلُكَ خَيْرَ الْمَوْلِجِ وَخَيْرَ الْمَخْرَجِ بِسْمِ اللّٰهِ وَلَجْنَا وَبِسْمِ اللّٰهِ خَرَجْنَا',latin:"Allahumma inni as'aluka khoiral mauliji wa khoiral makhroji bismillahi walajna wa bismillahi kharajna",meaning:'Ya Allah aku mohon kebaikan tempat masuk dan keluar'},
{no:17,title:'Doa Keluar Rumah',ar:'بِسْمِ اللّٰهِ تَوَكَّلْتُ عَلَى اللّٰهِ لَا حَوْلَ وَلَا قُوَّةَ اِلَّا بِاللّٰهِ',latin:'Bismillahi tawakkaltu alallahi la haula wala quwwata illa billah',meaning:'Dengan nama Allah, aku bertawakal kepada Allah'},
{no:18,title:'Doa Naik Kendaraan',ar:'سُبْحَانَ الَّذِيْ سَخَّرَ لَنَا هٰذَا وَمَا كُنَّا لَهُ مُقْرِنِيْنَ وَاِنَّا اِلٰى رَبِّنَا لَمُنْقَلِبُوْنَ',latin:'Subhanalladzi sakhkhara lana hadza wa ma kunna lahu muqrinin wa inna ila rabbina lamunqalibun',meaning:'Maha Suci Allah yang menundukkan ini bagi kami'},
{no:19,title:'Doa Turun Kendaraan',ar:'اَللّٰهُمَّ اِنِّيْ اَسْاَلُكَ خَيْرَ هٰذِهِ الْقَرْيَةِ وَخَيْرَ اَهْلِهَا',latin:"Allahumma inni as'aluka khoiri hadzihil qaryati wa khoiri ahliha",meaning:'Ya Allah aku mohon kebaikan kampung ini dan penduduknya'},
{no:20,title:'Doa Untuk Kedua Orang Tua',ar:'رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِيْ صَغِيْرًا',latin:'Rabbirhamhuma kama rabbayani shoghira',meaning:'Ya Tuhan kasihilah keduanya sebagaimana mereka mendidikku kecil'},
{no:21,title:'Doa Sebelum Membaca Al-Quran',ar:'اَللّٰهُمَّ افْتَحْ عَلَيْنَا حِكْمَتَكَ وَانْشُرْ عَلَيْنَا رَحْمَتَكَ يَا ذَالْجَلَالِ وَالْاِكْرَامِ',latin:'Allahummaftah alaina hikmataka wansyur alaina rahmataka ya dzal jalali wal ikram',meaning:'Ya Allah bukakan hikmat dan luaskan rahmat-Mu pada kami'},
{no:22,title:'Doa Sesudah Membaca Al-Quran',ar:'صَدَقَ اللّٰهُ الْعَظِيْمُ وَبَلَّغَتْ رُسُلُهُ الْكِرَامُ',latin:'Shadaqallahul azhim wa ballaghat rusuluhul kiram',meaning:'Benarlah Allah yang Maha Agung dan utusan-Nya telah menyampaikan'},
{no:23,title:'Doa Ketika Mendengar Adzan',ar:'اَللّٰهُمَّ رَبَّ هٰذِهِ الدَّعْوَةِ التَّامَّةِ وَالصَّلَاةِ الْقَائِمَةِ اٰتِ مُحَمَّدًا الْوَسِيْلَةَ وَالْفَضِيْلَةَ وَابْعَثْهُ مَقَامًا مَحْمُوْدًا الَّذِيْ وَعَدْتَهُ',latin:"Allahumma rabba hadzihid da'watit tammati washshalatil qaimah ati Muhammadan al-wasilata wal fadhilata wab'athhu maqaman mahmudanilladzi wa'adtah",meaning:'Ya Allah berikan wasilah dan keutamaan pada Muhammad'},
{no:24,title:'Doa Iftitah',ar:'اَللّٰهُمَّ بَاعِدْ بَيْنِيْ وَبَيْنَ خَطَايَا كَمَا بَاعَدْتَ بَيْنَ الْمَشْرِقِ وَالْمَغْرِبِ',latin:"Allahumma ba'id baini wa baina khathaya kama ba'adta bainal masyriqi wal maghrib",meaning:'Ya Allah jauhkan antara aku dan dosaku sejauh timur dan barat'},
{no:25,title:'Doa Qunut',ar:'اَللّٰهُمَّ اهْدِنَا فِيْمَنْ هَدَيْتَ وَعَافِنَا فِيْمَنْ عَافَيْتَ وَتَوَلَّنَا فِيْمَنْ تَوَلَّيْتَ',latin:'Allahummahdina fiman hadayt wa afini fiman afayt wa tawallana fiman tawallayt',meaning:'Ya Allah beri petunjuk pada yang Engkau beri petunjuk'},
{no:26,title:'Doa Ketika Hujan',ar:'اَللّٰهُمَّ صَيِّبًا نَافِعًا',latin:"Allahumma shoyyiban nafi'an",meaning:'Ya Allah turunkan hujan yang bermanfaat'},
{no:27,title:'Doa Sesudah Hujan',ar:'مُطِرْنَا بِفَضْلِ اللّٰهِ وَرَحْمَتِهِ',latin:'Muthirna bifadhlillahi wa rahmatih',meaning:'Kami dikaruniai hujan dengan keutamaan dan rahmat Allah'},
{no:28,title:'Doa Menyapu Rumah',ar:'اَللّٰهُمَّ اجْعَلْ هٰذَا الْبَيْتَ بَيْتًا آمِنًا مُطْمَئِنًّا',latin:"Allahummaj'al hadzal baita baitan aminan mutma-innan",meaning:'Ya Allah jadikan rumah ini rumah yang aman dan tentram'},
{no:29,title:'Doa Menemukan Sesuatu yang Disukai',ar:'اَلْحَمْدُ لِلّٰهِ الَّذِيْ بِنِعْمَتِهِ تَتِمُّ الصَّالِحَاتُ',latin:"Alhamdulillahilladzi bi ni'matihi tatimmus shalihat",meaning:'Segala puji bagi Allah yang dengan nikmat-Nya sempurna kebaikan'},
{no:30,title:'Doa Menemukan Sesuatu yang Tidak Disukai',ar:'اَلْحَمْدُ لِلّٰهِ عَلٰى كُلِّ حَالٍ',latin:'Alhamdulillahi ala kulli hal',meaning:'Segala puji bagi Allah dalam segala keadaan'},
]

// ── 3. Ayat Kursi ────────────────────────────────────────────
const AYATKURSI = {
  ar: 'اَللّٰهُ لَا اِلٰهَ اِلَّا هُوَ الْحَيُّ الْقَيُّوْمُ ۚ لَا تَاْخُذُهٗ سِنَةٌ وَّلَا نَوْمٌ ۚ لَهٗ مَا فِي السَّمٰوٰتِ وَمَا فِي الْاَرْضِ ۚ مَنْ ذَا الَّذِيْ يَشْفَعُ عِنْدَهٗٓ اِلَّا بِاِذْنِهٖ ۚ يَعْلَمُ مَا بَيْنَ اَيْدِيْهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيْطُوْنَ بِشَيْءٍ مِّنْ عِلْمِهٖٓ اِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمٰوٰتِ وَالْاَرْضَ ۖ وَلَا يَـُٔوْدُهٗ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيْمُ',
  latin: "Allahu la ilaha illa huwal hayyul qayyum, la ta'khudzuhu sinatun wala na'um, lahu ma fis samawati wa ma fil ardh, man dzal ladzi yasyfa'u indahu illa bi idznih, ya'lamu ma baina aidihim wa ma khalfahum, wala yuhithuna bisyai-in min ilmihi illa bima sya', wasi'a kursiyyuhus samawati wal ardha, wala ya-uduhu hifzhuhuma, wahuwal aliyyul azhim",
  translation: 'Allah, tidak ada Tuhan (yang berhak disembah) melainkan Dia yang hidup kekal lagi terus menerus mengurus makhluk-Nya. Tidak mengantuk dan tidak tidur. Kepunyaan-Nya apa yang di langit dan di bumi. Tiada yang memberi syafaat di sisi-Nya tanpa izin-Nya. Dia mengetahui apa-apa yang di hadapan dan di belakang mereka, dan mereka tidak mengetahui apa-apa dari ilmu Allah melainkan apa yang dikehendaki-Nya. Kursi Allah meliputi langit dan bumi, dan Allah tidak merasa berat memelihara keduanya, dan Allah Maha Tinggi lagi Maha Besar.',
  surah: 'Al-Baqarah ayat 255',
  virtue: 'Dari Abu Hurairah RA, Rasulullah SAW bersabda: "Siapa yang membaca Ayat Kursi setiap selesai shalat, tidak ada yang menghalanginya masuk surga kecuali kematian." (HR. An-Nasa-i)'
}

// ── 4. Juz Amma — Surah 78-114 ───────────────────────────────
const JUZAMMA = [
{no:1,surah:78,name:'An-Naba',ar:'النبا',meaning:'Berita Besar',ayat:40},
{no:2,surah:79,name:"An-Nazi'at",ar:'النازعات',meaning:'Malaikat Yang Mencabut',ayat:46},
{no:3,surah:80,name:'Abasa',ar:'عبس',meaning:'Ia Bermuka Masam',ayat:42},
{no:4,surah:81,name:'At-Takwir',ar:'التكوير',meaning:'Menggulung',ayat:29},
{no:5,surah:82,name:'Al-Infithar',ar:'الانفطار',meaning:'Terbelah',ayat:19},
{no:6,surah:83,name:'Al-Muthaffifin',ar:'المطففين',meaning:'Orang Curang',ayat:36},
{no:7,surah:84,name:'Al-Insyiqaq',ar:'الانشقاق',meaning:'Terbelah',ayat:25},
{no:8,surah:85,name:'Al-Buruj',ar:'البروج',meaning:'Gugusan Bintang',ayat:22},
{no:9,surah:86,name:'At-Thariq',ar:'الطارق',meaning:'Yang Datang di Malam Hari',ayat:17},
{no:10,surah:87,name:"Al-A'la",ar:'الاعلى',meaning:'Yang Paling Tinggi',ayat:19},
{no:11,surah:88,name:'Al-Ghasyiyah',ar:'الغاشية',meaning:'Hari Kiamat',ayat:26},
{no:12,surah:89,name:'Al-Fajr',ar:'الفجر',meaning:'Fajar',ayat:30},
{no:13,surah:90,name:'Al-Balad',ar:'البلد',meaning:'Negeri',ayat:20},
{no:14,surah:91,name:'Asy-Syams',ar:'الشمس',meaning:'Matahari',ayat:15},
{no:15,surah:92,name:'Al-Lail',ar:'الليل',meaning:'Malam',ayat:21},
{no:16,surah:93,name:'Ad-Dhuha',ar:'الضحى',meaning:'Waktu Dhuha',ayat:11},
{no:17,surah:94,name:'Al-Insyirah',ar:'الانشراح',meaning:'Melapangkan',ayat:8},
{no:18,surah:95,name:'At-Tin',ar:'التين',meaning:'Buah Tin',ayat:8},
{no:19,surah:96,name:'Al-Alaq',ar:'العلق',meaning:'Segumpal Darah',ayat:19},
{no:20,surah:97,name:'Al-Qadr',ar:'القدر',meaning:'Kemuliaan',ayat:5},
{no:21,surah:98,name:'Al-Bayyinah',ar:'البينة',meaning:'Pembuktian',ayat:8},
{no:22,surah:99,name:'Az-Zalzalah',ar:'الزلزلة',meaning:'Kegoncangan',ayat:8},
{no:23,surah:100,name:'Al-Adiyat',ar:'العاديات',meaning:'Kuda Yang Berlari Kencang',ayat:11},
{no:24,surah:101,name:"Al-Qari'ah",ar:'القارعة',meaning:'Hari Kiamat',ayat:11},
{no:25,surah:102,name:'At-Takatsur',ar:'التكاثر',meaning:'Bermegah-megahan',ayat:8},
{no:26,surah:103,name:'Al-Asr',ar:'العصر',meaning:'Waktu Sore',ayat:3},
{no:27,surah:104,name:'Al-Humazah',ar:'الهمزة',meaning:'Pengumpat',ayat:9},
{no:28,surah:105,name:'Al-Fil',ar:'الفيل',meaning:'Gajah',ayat:5},
{no:29,surah:106,name:'Quraisy',ar:'قريش',meaning:'Suku Quraisy',ayat:4},
{no:30,surah:107,name:"Al-Ma'un",ar:'الماعون',meaning:'Barang Yang Berguna',ayat:7},
{no:31,surah:108,name:'Al-Kautsar',ar:'الكوثر',meaning:'Nikmat Berlimpah',ayat:3},
{no:32,surah:109,name:'Al-Kafirun',ar:'الكافرون',meaning:'Orang Kafir',ayat:6},
{no:33,surah:110,name:'An-Nashr',ar:'النصر',meaning:'Pertolongan',ayat:3},
{no:34,surah:111,name:'Al-Lahab',ar:'اللهب',meaning:'Api',ayat:5},
{no:35,surah:112,name:'Al-Ikhlas',ar:'الاخلاص',meaning:'Pemurnian',ayat:4},
{no:36,surah:113,name:'Al-Falaq',ar:'الفلق',meaning:'Waktu Subuh',ayat:5},
{no:37,surah:114,name:'An-Nas',ar:'الناس',meaning:'Umat Manusia',ayat:6},
]

// ── 5. Kisah Nabi — 25 Prophets ──────────────────────────────
const KISAHNABI = [
{no:1,name:'Nabi Adam AS',era:'Awal Manusia',story:'Manusia pertama yang diciptakan Allah dari tanah. Diberi kedudukan mulia, namun tergoda setan dan memakan buah khuldi, lalu diturunkan ke bumi. Ia bertaubat dan Allah menerima tobatnya. Menjadi khalifah di bumi dan ayah seluruh umat manusia.'},
{no:2,name:'Nabi Idris AS',era:'Keturunan Adam',story:'Nabi ke-2 yang terkenal cerdas dan tekun beribadah. Ahli membaca, menulis, dan menjahit. Allah mengangkatnya ke tempat yang tinggi. Berdakwah agar manusia berbuat baik dan jujur.'},
{no:3,name:'Nabi Nuh AS',era:'Zaman Pra-Banjir',story:'Berdakwah selama 950 tahun namun hanya sedikit yang beriman. Kaumnya mendustakan, lalu Allah memerintahkan membuat bahtera. Banjir besar menenggelamkan kaumnya yang kafir, orang beriman selamat di bahtera.'},
{no:4,name:'Nabi Hud AS',era:'Kaum Ad',story:'Diutus kepada kaum Ad yang sombong dan mewah. Menyeru menyembah Allah, namun kaumnya menolak. Allah mengirim angin kencang selama 7 malam yang membinasakan mereka.'},
{no:5,name:'Nabi Shalih AS',era:'Kaum Tsamud',story:'Diutus kepada kaum Tsamud yang pandai memahat batu. Membawa mukjizat unta betina dari batu. Kaumnya membunuh unta itu, lalu datang suara petir yang membinasakan mereka.'},
{no:6,name:'Nabi Ibrahim AS',era:'Zaman Raja Namrud',story:"Mencari Tuhan melalui bintang, bulan, matahari lalu menemukan Allah. Menghancurkan berhala kaumnya dan dilempar ke api namun Allah menjadikan api itu dingin. Membangun Ka'bah bersama Ismail."},
{no:7,name:'Nabi Luth AS',era:'Kaum Sodom',story:'Diutus kepada kaumnya yang melakukan perbuatan keji. Menyeru bertobat namun ditolak. Allah menghancurkan kaumnya dengan hujan batu dan membalikkan negeri mereka.'},
{no:8,name:'Nabi Ismail AS',era:'Mekkah',story:"Putra Ibrahim yang ditinggal di Mekkah bersama Hajar. Membantu ayahnya membangun Ka'bah. Patuh saat ayahnya bermimpi menyembelihnya, lalu Allah mengganti dengan domba."},
{no:9,name:'Nabi Ishaq AS',era:'Kanaan',story:'Putra Ibrahim dari Siti Sarah. Lahir sebagai mukjizat ketika Ibrahim sudah tua. Mewarisi sifat ayahnya yang saleh dan berdakwah di Kanaan.'},
{no:10,name:'Nabi Yaqub AS',era:'Kanaan',story:'Putra Ishaq dan ayah dari 12 suku Bani Israil. Sangat menyayangi Yusuf, sehingga saudara-saudaranya cemburu dan membuang Yusuf. Menangis hingga buta sampai bertemu Yusuf kembali.'},
{no:11,name:'Nabi Yusuf AS',era:'Mesir',story:'Memiliki ketampanan luar biasa. Dibuang ke sumur oleh saudaranya, dijual sebagai budak, dipenjara karena fitnah, namun akhirnya menjadi menteri keuangan Mesir berkat kemampuan menafsirkan mimpi.'},
{no:12,name:'Nabi Ayyub AS',era:'Tanah Uz',story:'Diuji dengan penyakit berat bertahun-tahun, harta dan keluarganya lenyap. Tetap sabar dan beribadah. Allah menyembuhkannya dan mengembalikan segalanya berlipat ganda.'},
{no:13,name:"Nabi Syu'aib AS",era:'Kaum Madyan',story:'Diutus kepada kaum Madyan yang curang dalam timbangan dan perdagangan. Menyeru berlaku adil namun ditolak. Allah mengirim azab berupa suara menggelegar yang membinasakan mereka.'},
{no:14,name:'Nabi Musa AS',era:'Mesir',story:'Diutus kepada Firaun yang mengaku Tuhan. Membawa 9 mukjizat, membelah laut, dan memimpin Bani Israil keluar Mesir. Menerima Taurat di Gunung Sinai.'},
{no:15,name:'Nabi Harun AS',era:'Mesir',story:'Saudara Musa yang diutus bersamanya. Fasih berbicara dan membantu dakwah Musa kepada Firaun. Menjadi imam Bani Israil saat Musa pergi ke Gunung Sinai.'},
{no:16,name:'Nabi Dzulkifli AS',era:'Bani Israil',story:'Terkenal sabar dan saleh. Menggantikan posisi nabi sebelumnya dan menjalankan tugas dakwah dengan tekun.'},
{no:17,name:'Nabi Daud AS',era:'Bani Israil',story:'Raja dan nabi Bani Israil. Mengalahkan Jalut (Goliath) saat masih muda. Allah memberinya Zabur, suara merdu, dan kemampuan membuat baju besi. Kerajaannya sangat kuat.'},
{no:18,name:'Nabi Sulaiman AS',era:'Bani Israil',story:'Mewarisi kerajaan Daud dan memiliki kemampuan berbicara dengan hewan serta mengendalikan jin. Membangun Baitul Maqdis dan terkenal dengan kebijaksanaan serta keadilannya.'},
{no:19,name:'Nabi Ilyas AS',era:'Bani Israil',story:"Diutus kepada Bani Israil yang menyembah berhala Ba'al. Menyeru kembali ke tauhid namun ditolak. Allah mengangkatnya ke langit dan mengirim azab kepada kaumnya."},
{no:20,name:'Nabi Ilyasa AS',era:'Bani Israil',story:'Penerus dakwah Ilyas. Berdakwah kepada Bani Israil yang tersesat dan membawa mereka kembali ke jalan yang benar.'},
{no:21,name:'Nabi Yunus AS',era:'Niniveh',story:'Meninggalkan kaumnya karena frustasi, lalu ditelan ikan besar di laut. Berdoa di perut ikan dan Allah menyelamatkannya. Kaumnya akhirnya beriman setelah melihat tanda azab.'},
{no:22,name:'Nabi Zakaria AS',era:'Bani Israil',story:'Berdoa mendapat anak di usia tua. Allah memberinya Yahya. Adalah pemelihara Maryam. Gugur syahid karena membela kebenaran.'},
{no:23,name:'Nabi Yahya AS',era:'Bani Israil',story:'Lahir sebagai mukjizat dari orang tua yang sudah tua. Diberi hikmah sejak kecil dan hidup zuhud. Gugur syahid karena menegur raja yang zalim.'},
{no:24,name:'Nabi Isa AS',era:'Bani Israil',story:'Lahir dari Maryam tanpa ayah. Membawa Injil dan mukjizat: menyembuhkan orang buta, menghidupkan orang mati, dan membentuk burung dari tanah. Diangkat ke langit dan akan turun kembali menjelang kiamat.'},
{no:25,name:'Nabi Muhammad SAW',era:'Mekkah-Madinah',story:'Nabi dan rasul terakhir. Menerima wahyu Al-Quran di Gua Hira. Berhijrah ke Madinah, membangun peradaban Islam, dan menyebarkan tauhid ke seluruh Jazirah Arab. Diutus sebagai rahmat bagi seluruh alam.'},
]

// ── 6. Niat Sholat — 5 Daily Prayers ─────────────────────────
const NIATSHOLAT = [
{name:'Subuh',ar:'اُصَلِّيْ لِلّٰهِ فَرْضَ الصُّبْحِ رَكْعَتَيْنِ مُسْتَقْبِلَ الْقِبْلَةِ اَدَاءً لِلّٰهِ تَعَالٰى',latin:"Usholli lillahi fardhash-shubhi rak'ataini mustaqbilal qiblati adaa-an lillahi ta'ala",meaning:"Aku niat shalat fardu Subuh dua rakaat menghadap qiblat karena Allah Ta'ala"},
{name:'Dzuhur',ar:'اُصَلِّيْ لِلّٰهِ فَرْضَ الظُّهْرِ اَرْبَعَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ اَدَاءً لِلّٰهِ تَعَالٰى',latin:"Usholli lillahi fardhaz-zuhri arba'a raka'atin mustaqbilal qiblati adaa-an lillahi ta'ala",meaning:"Aku niat shalat fardu Dzuhur empat rakaat menghadap qiblat karena Allah Ta'ala"},
{name:'Ashar',ar:'اُصَلِّيْ لِلّٰهِ فَرْضَ الْعَصْرِ اَرْبَعَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ اَدَاءً لِلّٰهِ تَعَالٰى',latin:"Usholli lillahi fardhal-ashri arba'a raka'atin mustaqbilal qiblati adaa-an lillahi ta'ala",meaning:"Aku niat shalat fardu Ashar empat rakaat menghadap qiblat karena Allah Ta'ala"},
{name:'Maghrib',ar:'اُصَلِّيْ لِلّٰهِ فَرْضَ الْمَغْرِبِ ثَلَاثَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ اَدَاءً لِلّٰهِ تَعَالٰى',latin:"Usholli lillahi fardhal-maghribi tsalatsa raka'atin mustaqbilal qiblati adaa-an lillahi ta'ala",meaning:"Aku niat shalat fardu Maghrib tiga rakaat menghadap qiblat karena Allah Ta'ala"},
{name:'Isya',ar:'اُصَلِّيْ لِلّٰهِ فَرْضَ الْعِشَاءِ اَرْبَعَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ اَدَاءً لِلّٰهِ تَعَالٰى',latin:"Usholli lillahi fardhal-isya-i arba'a raka'atin mustaqbilal qiblati adaa-an lillahi ta'ala",meaning:"Aku niat shalat fardu Isya empat rakaat menghadap qiblat karena Allah Ta'ala"},
]

// ── 7. Tahlil ────────────────────────────────────────────────
const TAHLIL = [
{step:1,title:'Tasbih',ar:'سُبْحَانَ اللّٰهِ',latin:'Subhanallah',count:33},
{step:2,title:'Tahmid',ar:'اَلْحَمْدُ لِلّٰهِ',latin:'Alhamdulillah',count:33},
{step:3,title:'Takbir',ar:'اَللّٰهُ اَكْبَرُ',latin:'Allahu Akbar',count:33},
{step:4,title:'Tahlil',ar:'لَا اِلٰهَ اِلَّا اللّٰهُ',latin:'La ilaha illallah',count:1},
{step:5,title:'Doa Tahlil',ar:'اَللّٰهُمَّ اغْفِرْ لِلْمُسْلِمِيْنَ وَالْمُسْلِمَاتِ وَالْمُؤْمِنِيْنَ وَالْمُؤْمِنَاتِ الْاَحْيَاءِ مِنْهُمْ وَالْاَمْوَاتِ',latin:"Allahummaghfir lil muslimina wal muslimati wal mu'minina wal mu'minatil ahya-i minhum wal amwat",count:1},
{step:6,title:'Shalawat',ar:'اَللّٰهُمَّ صَلِّ عَلٰى سَيِّدِنَا مُحَمَّدٍ',latin:'Allahumma shalli ala sayyidina Muhammad',count:1},
{step:7,title:'Istighfar',ar:'اَسْتَغْفِرُ اللّٰهَ الْعَظِيْمَ',latin:'Astaghfirullahal azhim',count:100},
{step:8,title:'Doa Penutup',ar:'رَبَّنَا اٰتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْاٰخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',latin:'Rabbana atina fid dunya hasanatan wa fil akhirati hasanatan wa qina adzaban nar',count:1},
]

// ── 8. Wirid ─────────────────────────────────────────────────
const WIRID = [
{no:1,title:'Istighfar',ar:'اَسْتَغْفِرُ اللّٰهَ الْعَظِيْمَ الَّذِيْ لَا اِلٰهَ اِلَّا هُوَ الْحَيُّ الْقَيُّوْمُ وَاَتُوْبُ اِلَيْهِ',latin:'Astaghfirullahal azhimalladzi la ilaha illa huwal hayyul qayyum wa atubu ilaih',count:100},
{no:2,title:'Tahlil',ar:'لَا اِلٰهَ اِلَّا اللّٰهُ وَحْدَهُ لَا شَرِيْكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ يُحْيِيْ وَيُمِيْتُ وَهُوَ عَلٰى كُلِّ شَيْءٍ قَدِيْرٌ',latin:'La ilaha illallahu wahdahu la syarikalah lahul mulku walahul hamdu yuhyi wa yumitu wahuwa ala kulli syai-in qadir',count:100},
{no:3,title:'Tasbih',ar:'سُبْحَانَ اللّٰهِ',latin:'Subhanallah',count:33},
{no:4,title:'Tahmid',ar:'اَلْحَمْدُ لِلّٰهِ',latin:'Alhamdulillah',count:33},
{no:5,title:'Takbir',ar:'اَللّٰهُ اَكْبَرُ',latin:'Allahu Akbar',count:33},
{no:6,title:'Hauqalah',ar:'لَا حَوْلَ وَلَا قُوَّةَ اِلَّا بِاللّٰهِ الْعَلِيِّ الْعَظِيْمِ',latin:'La haula wala quwwata illa billahil aliyyil azhim',count:100},
{no:7,title:'Shalawat',ar:'اَللّٰهُمَّ صَلِّ عَلٰى سَيِّدِنَا مُحَمَّدٍ وَعَلٰى اٰلِ سَيِّدِنَا مُحَمَّدٍ',latin:'Allahumma shalli ala sayyidina Muhammad wa ala ali sayyidina Muhammad',count:100},
{no:8,title:'Doa Penutup',ar:'سُبْحَانَ رَبِّكَ رَبِّ الْعِزَّةِ عَمَّا يَصِفُوْنَ وَسَلَامٌ عَلَى الْمُرْسَلِيْنَ وَالْحَمْدُ لِلّٰهِ رَبِّ الْعَالَمِيْنَ',latin:'Subhana rabbika rabbil izzati amma yasifun wa salamunal mursalin wal hamdulillahi rabbil alamin',count:1},
]

// ── 9. Dzikir Pagi/Petang ────────────────────────────────────
const DZIKIR_PAGI = [
{no:1,ar:'اَللّٰهُمَّ بِكَ اَصْبَحْنَا وَبِكَ اَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوْتُ وَاِلَيْكَ النُّشُوْرُ',latin:'Allahumma bika asbahna wa bika amsaina wa bika nahya wa bika namutu wa ilaikan nusyur',count:1},
{no:2,ar:'اَللّٰهُمَّ اَنْتَ رَبِّيْ لَا اِلٰهَ اِلَّا اَنْتَ خَلَقْتَنِيْ وَاَنَا عَبْدُكَ',latin:'Allahumma anta rabbi la ilaha illa anta khalaqtani wa ana abduk',count:1},
{no:3,ar:'سُبْحَانَ اللّٰهِ وَبِحَمْدِهِ',latin:'Subhanallahi wa bihamdih',count:100},
{no:4,ar:'لَا اِلٰهَ اِلَّا اللّٰهُ وَحْدَهُ لَا شَرِيْكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلٰى كُلِّ شَيْءٍ قَدِيْرٌ',latin:'La ilaha illallahu wahdahu la syarikalah lahul mulku walahul hamdu wahuwa ala kulli syai-in qadir',count:10},
{no:5,ar:'اَللّٰهُمَّ اِنِّيْ اَسْاَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالْاٰخِرَةِ',latin:"Allahumma inni as'alukal afiyata fid dunya wal akhirah",count:1},
{no:6,ar:'اَللّٰهُمَّ عَافِنِيْ فِيْ بَدَنِيْ اَللّٰهُمَّ عَافِنِيْ فِيْ سَمْعِيْ اَللّٰهُمَّ عَافِنِيْ فِيْ بَصَرِيْ',latin:"Allahumma afini fi badani, Allahumma afini fi sam'i, Allahumma afini fi basari",count:3},
{no:7,ar:'بِسْمِ اللّٰهِ الَّذِيْ لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْاَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيْعُ الْعَلِيْمُ',latin:"Bismillahilladzi la yadzurru ma'asmihi syai-un fil ardi wala fis sama-i wahuwas sami'ul alim",count:3},
{no:8,ar:'رَضِيْتُ بِاللّٰهِ رَبًّا وَبِالْاِسْلَامِ دِيْنًا وَبِمُحَمَّدٍ صَلَّى اللّٰهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا',latin:'Radhitu billahi rabba wa bil islami dina wa bi Muhammadin shallallahu alaihi wa sallama nabiyya',count:3},
]

const DZIKIR_PETANG = [
{no:1,ar:'اَللّٰهُمَّ بِكَ اَمْسَيْنَا وَبِكَ اَصْبَحْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوْتُ وَاِلَيْكَ الْمَصِيْرُ',latin:'Allahumma bika amsaina wa bika asbahna wa bika nahya wa bika namutu wa ilaikal mashir',count:1},
{no:2,ar:'اَعُوْذُ بِكَلِمَاتِ اللّٰهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',latin:"A'udzu bikalimatillahit tammati min syarri ma khalaq",count:3},
{no:3,ar:'سُبْحَانَ اللّٰهِ وَبِحَمْدِهِ',latin:'Subhanallahi wa bihamdih',count:100},
{no:4,ar:'اَللّٰهُمَّ اِنِّيْ اَسْاَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالْاٰخِرَةِ',latin:"Allahumme inni as'alukal afiyata fid dunya wal akhirah",count:1},
{no:5,ar:'اَللّٰهُمَّ مَا اَمْسَى بِيْ مِنْ نِعْمَةٍ اَوْ بِاَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لَا شَرِيْكَ لَكَ فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ',latin:"Allahumma ma amsa biyi min ni'matin aw bi ahadin min kholqik faminka wahdaka la syarika laka falakal hamdu walakas syukru",count:1},
{no:6,ar:'بِسْمِ اللّٰهِ الَّذِيْ لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْاَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيْعُ الْعَلِيْمُ',latin:"Bismillahilladzi la yadzurru ma'asmihi syai-un fil ardi wala fis sama-i wahuwas sami'ul alim",count:3},
{no:7,ar:'حَسْبِيَ اللّٰهُ لَا اِلٰهَ اِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيْمِ',latin:'Hasbiyallahu la ilaha illa huwa alaihi tawakkaltu wahuwa rabbul arsyil azhim',count:7},
]

// ── 10. Doa Qunut & Doa Iftitah ───────────────────────────────
const DOAKHUSUS = [
{title:'Doa Qunut',ar:'اَللّٰهُمَّ اهْدِنَا فِيْمَنْ هَدَيْتَ وَعَافِنَا فِيْمَنْ عَافَيْتَ وَتَوَلَّنَا فِيْمَنْ تَوَلَّيْتَ وَبَارِكْ لَنَا فِيْمَا اَعْطَيْتَ وَقِنَا شَرَّ مَا قَضَيْتَ اِنَّكَ تَقْضِيْ وَلَا يُقْضٰى عَلَيْكَ اِنَّهُ لَا يَذِلُّ مَنْ وَالَيْتَ وَلَا يَعِزُّ مَنْ عَادَيْتَ تَبَارَكْتَ رَبَّنَا وَتَعَالَيْتَ',latin:"Allahummahdina fiman hadayt, wa afini fiman afayt, wa tawallana fiman tawallayt, wa barik lana fima a'thayt, wa qina syarra ma qadhayt, innaka taqdhi wala yudhda alayk, innahu la yadzillu man walayt, wala ya'izzu man adayt, tabarakta rabbana wa ta'alayt",meaning:'Ya Allah berilah kami petunjuk, sehatkan kami, peliharalah kami, berkahilah kami, dan lindungilah kami dari kejelekan'},
{title:'Doa Iftitah',ar:'اَللّٰهُمَّ بَاعِدْ بَيْنِيْ وَبَيْنَ خَطَايَا كَمَا بَاعَدْتَ بَيْنَ الْمَشْرِقِ وَالْمَغْرِبِ اَللّٰهُمَّ نَقِّنِيْ مِنَ الْخَطَايَا كَمَا يُنَقَّى الثَّوْبُ الْاَبْيَضُ مِنَ الدَّنَسِ اَللّٰهُمَّ اغْسِلْنِيْ مِنَ الْخَطَايَا بِالثَّلْجِ وَالْمَاءِ وَالْبَرَدِ',latin:"Allahumma ba'id baini wa baina khathaya kama ba'adta bainal masyriqi wal maghrib, Allahumma naqqini minal khathaya kama yunaqqats tsawbul abyadhu minad danas, Allahummaghsilni minal khathaya bits tsalji wal ma-i wal barad",meaning:'Ya Allah jauhkan antara aku dan dosaku, bersihkan aku dari kesalahan, cucilah aku dari kesalahan dengan salju, air, dan embun'},
{title:'Doa Sujud',ar:'سُبْحَانَ رَبِّيَ الْاَعْلٰى',latin:"Subhana rabbiyal a'la",meaning:'Maha Suci Tuhan-ku Yang Maha Tinggi'},
{title:'Doa Ruku',ar:'سُبْحَانَ رَبِّيَ الْعَظِيْمِ',latin:'Subhana rabbiyal azhim',meaning:'Maha Suci Tuhan-ku Yang Maha Agung'},
{title:'Doa Duduk Antara Dua Sujud',ar:'اَللّٰهُمَّ اغْفِرْلِيْ وَارْحَمْنِيْ وَاجْبُرْنِيْ وَارْفَعْنِيْ وَاهْدِنِيْ وَعَافِنِيْ وَارْزُقْنِيْ',latin:"Allahummaghfirli warhamni wa jburni warfa'ni wahdini wa afini warzuqni",meaning:'Ya Allah ampunilah aku, kasihanilah aku, cukupilah aku, angkatlah derajatku, berilah petunjuk, kesehatan, dan rezeki padaku'},
{title:'Doa Tasyahud Awal',ar:'اَلتَّحِيَّاتُ الْمُبَارَكَاتُ الصَّلَوَاتُ الطَّيِّبَاتُ لِلّٰهِ اَلسَّلَامُ عَلَيْكَ اَيُّهَا النَّبِيُّ وَرَحْمَةُ اللّٰهِ وَبَرَكَاتُهُ اَلسَّلَامُ عَلَيْنَا وَعَلٰى عِبَادِ اللّٰهِ الصَّالِحِيْنَ',latin:'At-tahiyyatul mubarakatus shalawatut thayyibatu lillah, assalamu alaika ayyuhan nabiyyu wa rahmatullahi wa barakatuh, assalamu alaina wa ala ibadillahis shalihin',meaning:'Segala penghormatan dan kebaikan hanya bagi Allah. Salam sejahtera bagimu wahai Nabi. Salam sejahtera bagi kami dan hamba-hamba Allah yang saleh'},
{title:'Doa Tasyahud Akhir + Shalawat',ar:'اَللّٰهُمَّ صَلِّ عَلٰى سَيِّدِنَا مُحَمَّدٍ وَعَلٰى اٰلِ سَيِّدِنَا مُحَمَّدٍ كَمَا صَلَّيْتَ عَلٰى سَيِّدِنَا اِبْرَاهِيْمَ وَعَلٰى اٰلِ سَيِّدِنَا اِبْرَاهِيْمَ وَبَارِكْ عَلٰى سَيِّدِنَا مُحَمَّدٍ وَعَلٰى اٰلِ سَيِّدِنَا مُحَمَّدٍ كَمَا بَارَكْتَ عَلٰى سَيِّدِنَا اِبْرَاهِيْمَ وَعَلٰى اٰلِ سَيِّدِنَا اِبْرَاهِيْمَ فِي الْعَالَمِيْنَ اِنَّكَ حَمِيْدٌ مَجِيْدٌ',latin:'Allahumma shalli ala sayyidina Muhammad wa ala ali sayyidina Muhammad kama shallayta ala sayyidina Ibrahim wa ala ali sayyidina Ibrahim wa barik ala sayyidina Muhammad wa ala ali sayyidina Muhammad kama barakta ala sayyidina Ibrahim wa ala ali sayyidina Ibrahim fil alamin innaka hamidun majid',meaning:'Ya Allah berilah shalawat pada Muhammad dan keluarganya sebagaimana Engkau bershalawat pada Ibrahim dan keluarganya'},
]

// ── 11. Kisah Sahabat — 10 Companions ────────────────────────
const KISAHSAHABAT = [
{no:1,name:'Abu Bakar As-Siddiq RA',title:'Khalifah Pertama',story:'Sahabat terdekat Nabi SAW. Orang pertama yang beriman dari kalangan laki-laki dewasa. Menemani Nabi hijrah ke Madinah. Menjadi khalifah pertama setelah wafatnya Nabi. Memerangi nabi palsu dan murtad dalam Perang Riddah. Terkenal dengan kejujurannya dan kedermawanannya.'},
{no:2,name:'Umar bin Khattab RA',title:'Khalifah Kedua',story:'Dulunya musuh Islam, masuk Islam setelah mendengar ayat Al-Quran. Terkenal tegas dan adil hingga dijuluki Al-Faruq. Sebagai khalifah kedua, wilayah Islam meluas ke Persia, Mesir, dan Syam. Membangun sistem administrasi negara dan memperluas Masjidil Haram.'},
{no:3,name:'Utsman bin Affan RA',title:'Khalifah Ketiga',story:'Dijuluki Dzun Nurain karena menikahi dua putri Nabi. Sangat dermawan, membiayai tentara Tabuk dan membeli sumur Raumah. Pada masanya, Al-Quran dikumpulkan dan dibukukan menjadi Mushaf Utsmani yang menjadi standar hingga kini.'},
{no:4,name:'Ali bin Abi Thalib RA',title:'Khalifah Keempat',story:'Sepupu dan menantu Nabi SAW. Sangat pemberani dan ahli ilmu. Dalam Perang Khandaq, mengalahkan Amr bin Abdwud. Sebagai khalifah keempat, menghadapi fitnah dan perang saudara. Terkenal dengan pidato dan hikmahnya dalam Nahjul Balaghah.'},
{no:5,name:'Bilal bin Rabah RA',title:'Muadzin Pertama',story:'Budak keturunan Habsyi yang disiksa karena masuk Islam. Abu Bakar membeli dan memerdekakannya. Dipilih Nabi sebagai muadzin pertama karena suaranya merdu. Menolak mengumandangkan azan setelah wafatnya Nabi karena terlalu sedih.'},
{no:6,name:'Khalid bin Walid RA',title:'Saifullah (Pedang Allah)',story:'Dulunya panglima perang Quraisy yang mengalahkan Muslimin di Uhud. Setelah masuk Islam, menjadi jenderal terbesar Islam. Tidak pernah kalah dalam lebih dari 100 pertempuran. Menaklukkan Pers, Mesir, dan Syam. Dijuluki Saifullah oleh Nabi SAW.'},
{no:7,name:'Salman Al-Farisi RA',title:'Pencari Kebenaran',story:'Berasal dari Persia dan dulunya penganut Zoroaster. Mengembara mencari nabi terakhir hingga bertemu Nabi Muhammad di Madinah. Mengusulkan strategi parit (Khandaq) yang menyelamatkan Muslimin. Nabi menjadikannya keluarga (Ahlul Bait).'},
{no:8,name:'Abu Ubaidah bin Jarrah RA',title:'Aminul Ummah',story:'Dijuluki Aminul Ummah (Orang Kepercayaan Umat) oleh Nabi. Panglima yang sangat dihormati. Memimpin penaklukan Syam. Saat wabah thaun di Syam, tetap tinggal dan akhirnya wafat karena wabah tersebut.'},
{no:9,name:'Aisyah binti Abu Bakar RA',title:'Ummul Mukminin',story:'Istri Nabi yang paling dicintai. Perawi hadis terbanyak di kalangan istri Nabi (2.210 hadis). Sangat cerdas dan ahli fiqih. Setelah wafatnya Nabi, menjadi rujukan ilmu agama. Terlibat dalam Perang Unta namun kemudian menyesal.'},
{no:10,name:'Zaid bin Haritsah RA',title:'Anak Angkat Nabi',story:'Budak yang dibebaskan dan diadopsi Nabi. Sangat setia dan dicintai Nabi seperti anak kandung. Menjadi komandan pertama yang diangkat Nabi dalam Perang Mut-ah. Gugur sebagai syahid dalam pertempuran tersebut.'},
]

// ── 12. Dalil — Quran Verses by Topic ────────────────────────
const DALIL = [
{topic:'Sabar',verses:[{ref:'Al-Baqarah:153',text:'Sesungguhnya Allah bersama orang-orang yang sabar.'},{ref:'Al-Baqarah:155',text:'Sungguh, Kami akan menguji kamu dengan sedikit rasa takut, kelaparan, kekurangan harta, jiwa, dan buah-buahan. Dan berikanlah kabar gembira kepada orang-orang yang sabar.'},{ref:'Ali Imran:200',text:'Hai orang-orang yang beriman, bersabarlah kamu, kuatkanlah kesabaranmu, dan tetaplah bersiap siaga.'}]},
{topic:'Syukur',verses:[{ref:'Ibrahim:7',text:'Sesungguhnya jika kamu bersyukur, niscaya Aku tambah nikmat-Ku kepadamu.'},{ref:'An-Nahl:78',text:'Dan Allah mengeluarkan kamu dari perut ibumu dalam keadaan tidak mengetahui sesuatu pun, lalu Dia memberi kamu pendengaran, penglihatan, dan hati agar kamu bersyukur.'}]},
{topic:'Taubat',verses:[{ref:'Az-Zumar:53',text:'Katakanlah, "Wahai hamba-hamba-Ku yang melampaui batas terhadap diri mereka sendiri! Janganlah kamu berputus asa dari rahmat Allah. Sesungguhnya Allah mengampuni dosa-dosa semuanya."'},{ref:'At-Tahrim:8',text:'Hai orang-orang yang beriman, bertaubatlah kepada Allah dengan taubat yang semurni-murninya.'}]},
{topic:'Ilmu',verses:[{ref:'Al-Mujadilah:11',text:'Allah akan mengangkat derajat orang-orang yang beriman dan berilmu di antaramu beberapa derajat.'},{ref:'Az-Zumar:9',text:'Apakah sama orang-orang yang mengetahui dengan orang-orang yang tidak mengetahui?'}]},
{topic:'Kejujuran',verses:[{ref:'Al-Ahzab:70-71',text:'Hai orang-orang yang beriman, bertakwalah kepada Allah dan ucapkanlah perkataan yang benar. Niscaya Allah memperbaiki amal-amalmu dan mengampuni dosa-dosamu.'}]},
{topic:'Sedekah',verses:[{ref:'Al-Baqarah:261',text:'Perumpamaan orang yang menginfakkan hartanya di jalan Allah seperti sebutir benih yang menumbuhkan tujuh tangkai, pada setiap tangkai ada seratus biji.'},{ref:'Al-Hadid:7',text:'Berimanlah kamu kepada Allah dan Rasul-Nya dan infakkanlah sebagian harta yang Allah telah menjadikan kamu menguasainya.'}]},
{topic:'Hati',verses:[{ref:"Ar-Ra'd:28",text:'Ingatlah, hanya dengan mengingat Allah-lah hati menjadi tenteram.'},{ref:'Al-Baqarah:74',text:'Kemudian setelah itu hatimu menjadi keras seperti batu, bahkan lebih keras lagi.'}]},
{topic:'Orang Tua',verses:[{ref:'Al-Isra:23',text:'Dan Tuhanmu telah memerintahkan agar kamu jangan menyembah selain Dia dan hendaklah berbuat baik pada ibu bapak.'},{ref:'Luqman:14',text:'Dan Kami perintahkan kepada manusia (berbuat baik) kepada kedua orang tuanya.'}]},
{topic:'Saudara',verses:[{ref:'Al-Hujurat:10',text:'Orang-orang beriman itu bersaudara, karena itu damaikanlah antara kedua saudaramu.'},{ref:'Al-Hujurat:12',text:'Janganlah kamu menggunjingkan sebagian yang lain.'}]},
{topic:'Cobaan',verses:[{ref:'Al-Baqarah:286',text:'Allah tidak membebani seseorang melainkan sesuai dengan kesanggupannya.'},{ref:'Al-Insyirah:5-6',text:'Maka sesungguhnya bersama kesulitan ada kemudahan. Sesungguhnya bersama kesulitan ada kemudahan.'}]},
{topic:'Ikhtiar',verses:[{ref:"Ar-Ra'd:11",text:'Sesungguhnya Allah tidak mengubah keadaan suatu kaum sehingga mereka mengubah keadaan yang ada pada diri mereka sendiri.'}]},
{topic:'Tawakal',verses:[{ref:'At-Talaq:3',text:'Dan barangsiapa bertawakal kepada Allah, niscaya Allah akan mencukupkan (keperluan)nya.'},{ref:'Ali Imran:159',text:'Bermusyawarahlah dengan mereka, kemudian setelah kamu bertekad bulat, bertawakallah kepada Allah.'}]},
{topic:'Kebersihan',verses:[{ref:'Al-Baqarah:222',text:'Sesungguhnya Allah menyukai orang-orang yang bertaubat dan menyukai orang-orang yang menyucikan diri.'}]},
{topic:'Adab',verses:[{ref:'Al-Hujurat:1',text:'Hai orang-orang yang beriman, janganlah kamu mendahului Allah dan Rasul-Nya.'},{ref:'An-Nur:27-28',text:'Janganlah kamu memasuki rumah yang bukan rumahmu sebelum minta izin dan memberi salam.'}]},
{topic:'Perempuan',verses:[{ref:'An-Nisa:1',text:'Bertakwalah kepada Allah yang dengan nama-Nya kamu saling meminta dan (peliharalah) hubungan silaturahmi.'}]},
{topic:'Makanan Halal',verses:[{ref:'Al-Baqarah:172',text:'Hai orang-orang yang beriman, makanlah di antara rezeki yang baik-baik yang Kami berikan kepadamu dan bersyukurlah kepada Allah.'}]},
{topic:'Pernikahan',verses:[{ref:'Ar-Rum:21',text:'Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya.'}]},
{topic:'Kematian',verses:[{ref:'Ali Imran:185',text:'Tiap-tiap yang bernyawa akan merasakan mati. Dan sesungguhnya pada hari kiamat sajalah disempurnakan pahalamu.'}]},
{topic:'Dosa',verses:[{ref:'An-Nisa:31',text:'Jika kamu menjauhi dosa-dosa besar di antara hal-hal yang dilarang, niscaya Kami hapus kesalahan-kesalahanmu.'}]},
{topic:'Rizki',verses:[{ref:'Adz-Dzariyat:58',text:'Sesungguhnya Allah Dialah Maha Pemberi rezeki, Tuhan Yang Memiliki Kekuatan, Sangat Kokoh.'},{ref:'Fushshilat:10',text:'Dan Dia menentukan padanya kadar makanan-makanan (penghuninya) dalam empat masa.'}]},
]

// ── 13. Hukum Islam ──────────────────────────────────────────
const HUKUMISLAM = [
{no:1,title:'Thaharah (Bersuci)',desc:'Wajib bersuci dari hadas kecil dan besar sebelum ibadah. Caranya: wudhu, tayamum, atau mandi wajib. Najis harus dibersihkan dari badan, pakaian, dan tempat ibadah.'},
{no:2,title:'Shalat Lima Waktu',desc:'Ibadah wajib 5 kali sehari: Subuh (2 rakaat), Dzuhur (4), Ashar (4), Maghrib (3), Isya (4). Meninggalkan shalat dengan sengaja adalah dosa besar.'},
{no:3,title:'Puasa Ramadhan',desc:'Wajib berpuasa sebulan penuh di bulan Ramadhan. Dari terbit fajar sampai terbenam matahari. Tidak makan, minum, dan hubungan suami istri.'},
{no:4,title:'Zakat',desc:'Wajib mengeluarkan sebagian harta jika mencapai nisab dan haul. Zakat fitrah wajib setiap Muslim menjelang Idul Fitri. Zakat mal 2,5% untuk emas/perak/simpanan setahun.'},
{no:5,title:'Haji',desc:"Wajib sekali seumur hidup bagi yang mampu. Rukun Haji: ihram, tawaf, sa'i, wukuf di Arafah, tahallul."},
{no:6,title:'Jual Beli',desc:'Dihalalkan jual beli dengan syarat: barang halal, sukarela, tidak menipu, tidak riba. Riba (bunga) diharamkan dalam Islam.'},
{no:7,title:'Nikah',desc:'Pernikahan disunnahkan. Syarat: suka rela, wali, 2 saksi, mahar. Tujuan: menjaga kehormatan, keturunan, dan kasih sayang.'},
{no:8,title:'Waris',desc:'Hukum pembagian warisan diatur rinci dalam Al-Quran (An-Nisa:11-12). Porsi: laki-laki 2x perempuan, orang tua 1/6, istri 1/4 atau 1/8, suami 1/2 atau 1/4.'},
{no:9,title:'Hudud (Hukuman)',desc:'Hukuman atas kejahatan berat: 100 cambuk bagi pezina, rajam bagi muhsan, potong tangan bagi pencuri, hukuman mati bagi pembunuh sengaja. Semua dengan syarat dan bukti ketat.'},
{no:10,title:'Makanan Halal & Haram',desc:'Halal: daging sembelihan halal, ikan, sayur, buah. Haram: babi, anjing, bangkai, darah, binatang buas, khamar (minuman memabukkan).'},
{no:11,title:'Qishash',desc:'Hukum balas setimpal atas pembunuhan sengaja. Keluarga korban bisa memaafkan dengan diat (tebusan) atau menuntut qishash. "Dan dalam qishash itu ada kehidupan bagimu." (Al-Baqarah:179)'},
{no:12,title:'Wasiat',desc:'Orang yang akan meninggal boleh berwasiat maksimal 1/3 hartanya. Tidak boleh merugikan ahli waris. Dilaksanakan setelah dibayar hutang.'},
]

// ── 14. Sejarah Islam ─────────────────────────────────────────
const SEJARAHISLAM = [
{no:1,year:'571 M',event:'Kelahiran Nabi Muhammad SAW di Mekkah'},
{no:2,year:'610 M',event:'Wahyu pertama di Gua Hira — Surah Al-Alaq 1-5'},
{no:3,year:'613 M',event:'Dakwah terbuka Nabi Muhammad kepada penduduk Mekkah'},
{no:4,year:'615 M',event:'Hijrah pertama ke Habsyi (Ethiopia)'},
{no:5,year:'619 M',event:'Tahun Kesedihan — Wafatnya Abu Thalib dan Khadijah'},
{no:6,year:"620 M",event:"Isra Mi'raj — Perjalanan malam ke Baitul Maqdis dan Sidratul Muntaha"},
{no:7,year:'622 M',event:'Hijrah ke Madinah — Awal penanggalan Hijriah'},
{no:8,year:'624 M',event:'Perang Badar — Kemenangan pertama Muslimin (313 vs 1000)'},
{no:9,year:'625 M',event:'Perang Uhud — Muslimin kalah karena pemanah meninggalkan posisi'},
{no:10,year:'627 M',event:'Perang Khandaq (Parit) — Strategi Salman Al-Farisi'},
{no:11,year:'628 M',event:'Perjanjian Hudaibiyah — Gencatan senjata dengan Quraisy'},
{no:12,year:'629 M',event:'Pembebasan Khaibar dari Yahudi'},
{no:13,year:'630 M',event:'Pembebasan Mekkah — 10.000 pasukan tanpa pertumpahan darah'},
{no:14,year:'632 M',event:'Wafatnya Nabi Muhammad SAW — Haji Wada'},
{no:15,year:'632-634 M',event:'Kekhalifahan Abu Bakar — Perang Riddah, pengumpulan Al-Quran'},
{no:16,year:'634-644 M',event:'Kekhalifahan Umar — Penaklukan Persia, Mesir, Syam'},
{no:17,year:'644-656 M',event:'Kekhalifahan Utsman — Kodifikasi Al-Quran (Mushaf Utsmani)'},
{no:18,year:'656-661 M',event:'Kekhalifahan Ali — Fitnah, Perang Shiffin, Perang Unta'},
{no:19,year:'661-750 M',event:'Dinasti Umayyah — Ekspansi ke Spanyol dan Asia Tengah'},
{no:20,year:'750-1258 M',event:'Dinasti Abbasiyah — Zaman Keemasan Islam, ilmu pengetahuan berkembang'},
]

// ── 15. Ramadhan Guide ───────────────────────────────────────
const RAMADHAN = [
{no:1,title:'Rukun Puasa',desc:"1) Niat puasa setiap malam Ramadhan, 2) Menahan diri dari makan, minum, dan hubungan suami-istri dari terbit fajar sampai terbenam matahari."},
{no:2,title:'Hal yang Membatalkan Puasa',desc:'1) Makan/minum dengan sengaja, 2) Hubungan suami-istri, 3) Muntah dengan sengaja, 4) Menelan sesuatu yang bukan makanan, 5) Gila atau pingsan sepanjang hari.'},
{no:3,title:'Hal yang Diperbolehkan',desc:'1) Mandi, 2) Berkumur tanpa menelan, 3) Menelan ludah sendiri, 4) Suntik yang bukan nutrisi, 5) Darah keluar (donor/luka), 6) Rasa masakan tanpa menelan.'},
{no:4,title:"Sunnah Puasa",desc:"1) Sahur sebelum fajar, 2) Segera berbuka saat maghrib, 3) Berbuka dengan kurma/air, 4) Membaca Al-Quran, 5) Memperbanyak sedekah, 6) I'tikaf 10 hari terakhir."},
{no:5,title:'Shalat Tarawih',desc:"Shalat sunnah malam Ramadhan. 8 atau 20 rakaat menurut madzhab. Dikerjakan berjamaah setelah Isya. Sunnah dikerjakan di masjid."},
{no:6,title:'Lailatul Qadr',desc:"Malam kemuliaan yang lebih baik dari 1000 bulan. Dicari pada 10 hari terakhir Ramadhan, terutama malam ganjil (21, 23, 25, 27, 29)."},
{no:7,title:"Zakat Fitrah",desc:"Wajib dikeluarkan sebelum shalat Idul Fitri. Sebesar 1 sha' (±2,5 kg) makanan pokok. Tujuan: menyucikan puasa dan membantu fakir miskin."},
{no:8,title:'Orang yang Diperbolehkan Tidak Puasa',desc:'1) Sakit, 2) Musafir, 3) Hamil/menyusui yang khawatir bayinya, 4) Orang tua renta. Wajib qadha kecuali orang tua renta yang diganti fidyah.'},
{no:9,title:'Idul Fitri',desc:'Hari raya umat Islam setelah Ramadhan. Disunnahkan: mandi, memakai pakaian terbaik, makan sebelum shalat, shalat Id berjamaah, takbir, dan saling mengunjungi.'},
{no:10,title:'Keutamaan Ramadhan',desc:'1) Pintu surga dibuka, pintu neraka ditutup, setan dibelenggu, 2) Amal pahala berlipat ganda, 3) Doa mustajab, 4) Dosa diampuni, 5) Umrah pahalanya setara haji.'},
]

// ── 16. Shalawat Collection ──────────────────────────────────
const SHALAWAT = [
{no:1,title:'Shalawat Ibrahimiyah',ar:'اَللّٰهُمَّ صَلِّ عَلٰى سَيِّدِنَا مُحَمَّدٍ وَعَلٰى اٰلِ سَيِّدِنَا مُحَمَّدٍ كَمَا صَلَّيْتَ عَلٰى سَيِّدِنَا اِبْرَاهِيْمَ وَعَلٰى اٰلِ سَيِّدِنَا اِبْرَاهِيْمَ وَبَارِكْ عَلٰى سَيِّدِنَا مُحَمَّدٍ وَعَلٰى اٰلِ سَيِّدِنَا مُحَمَّدٍ كَمَا بَارَكْتَ عَلٰى سَيِّدِنَا اِبْرَاهِيْمَ وَعَلٰى اٰلِ سَيِّدِنَا اِبْرَاهِيْمَ فِي الْعَالَمِيْنَ اِنَّكَ حَمِيْدٌ مَجِيْدٌ',latin:'Allahumma shalli ala sayyidina Muhammad wa ala ali sayyidina Muhammad kama shallayta ala sayyidina Ibrahim wa ala ali sayyidina Ibrahim wa barik ala sayyidina Muhammad wa ala ali sayyidina Muhammad kama barakta ala sayyidina Ibrahim wa ala ali sayyidina Ibrahim fil alamin innaka hamidun majid'},
{no:2,title:'Shalawat Nariyah',ar:'اَللّٰهُمَّ صَلِّ صَلَاةً دَائِمَةً بِرَحْمَتِكَ عَلٰى سَيِّدِنَا مُحَمَّدٍ نِيْرِ الْاَنْوَارِ وَالْهِدَايَةِ',latin:'Allahumma shalli shalatan daimatan birahmatika ala sayyidina Muhammad ni-ril anwari wal hidayah'},
{no:3,title:'Shalawat Badar',ar:'اَللّٰهُمَّ صَلِّ وَسَلِّمْ عَلٰى سَيِّدِنَا مُحَمَّدٍ صَلَاةً تُنْجِيْنَا بِهَا مِنْ جَمِيْعِ الْاَهْوَالِ وَالْاٰفَاتِ',latin:"Allahumma shalli wa sallim ala sayyidina Muhammad shalatan tunjina biha min jami'il ahwali wal afat"},
{no:4,title:'Shalawat Munjiyat',ar:'اَللّٰهُمَّ صَلِّ عَلٰى سَيِّدِنَا مُحَمَّدٍ صَلَاةً تُنْجِيْنَا بِهَا مِنْ جَمِيْعِ الْاَهْوَالِ وَالْاٰفَاتِ وَتَقْضِيْ لَنَا بِهَا جَمِيْعَ الْحَاجَاتِ',latin:"Allahumma shalli ala sayyidina Muhammad shalatan tunjina biha min jami'il ahwali wal afat wa taqdhi lana biha jami'al hajat"},
{no:5,title:'Shalawat Thibbul Qulub',ar:'اَللّٰهُمَّ صَلِّ وَسَلِّمْ عَلٰى سَيِّدِنَا مُحَمَّدٍ فِي الْاُوْلٰيْنَ وَصَلِّ وَسَلِّمْ عَلٰى سَيِّدِنَا مُحَمَّدٍ فِي الْاٰخِرِيْنَ وَصَلِّ وَسَلِّمْ عَلٰى سَيِّدِنَا مُحَمَّدٍ فِيْ الْمَلَاِ الْاَعْلٰى اِلٰى يَوْمِ الدِّيْنِ',latin:"Allahumma shalli wa sallim ala sayyidina Muhammad fil awwalin wa shalli wa sallim ala sayyidina Muhammad fil akhirin wa shalli wa sallim ala sayyidina Muhammad fil mala-il a'la ila yawmid din"},
{no:6,title:'Shalawat Fatih',ar:'اَللّٰهُمَّ صَلِّ عَلٰى سَيِّدِنَا مُحَمَّدٍ الْفَاتِحِ لِمَا اُغْلِقَ وَالْخَاتِمِ لِمَا سَبَقَ نَاصِرِ الْحَقِّ بِالْحَقِّ وَالْهَادِيْ اِلٰى صِرَاطِكَ الْمُسْتَقِيْمِ',latin:'Allahumma shalli ala sayyidina Muhammadil fatihi lima ughliqa wal khatimi lima sabaqa nasiril haqqi bil haqqi wal hadi ila shiratikal mustaqim'},
{no:7,title:'Shalawat Tafrijiyah',ar:'اَللّٰهُمَّ صَلِّ عَلٰى سَيِّدِنَا مُحَمَّدٍ وَعَلٰى اٰلِ سَيِّدِنَا مُحَمَّدٍ اَللّٰهُمَّ فَرِّجْ هَمَّنَا وَغَمَّنَا',latin:"Allahumma shalli ala sayyidina Muhammad wa ala ali sayyidina Muhammad, Allahumma farrij hammana wa ghammana"},
{no:8,title:'Shalawat Syifa',ar:'اَللّٰهُمَّ صَلِّ عَلٰى سَيِّدِنَا مُحَمَّدٍ شِفَاءً لِلْقُلُوْبِ وَدَوَاءً لِلْاَرْوَاحِ وَعِزًّا لِلْاَبْدَانِ',latin:'Allahumma shalli ala sayyidina Muhammad syifa-an lil qulubi wa dawa-an lil arwahi wa izzan lil abdan'},
{no:9,title:'Shalawat Ummi',ar:'اَللّٰهُمَّ صَلِّ عَلٰى سَيِّدِنَا مُحَمَّدٍ عَبْدِكَ وَنَبِيِّكَ وَرَسُوْلِكَ النَّبِيِّ الْاُمِّيِّ',latin:"Allahumma shalli ala sayyidina Muhammad abdika wa nabiyyika wa rasulikan nabiyyil ummiyy"},
{no:10,title:'Shalawat Wulida',ar:'اَللّٰهُمَّ صَلِّ عَلٰى مَوْلِدِ النُّوْرِ سَيِّدِنَا مُحَمَّدٍ صَلَّى اللّٰهُ عَلَيْهِ وَسَلَّمَ',latin:'Allahumma shalli ala maulidin nuri sayyidina Muhammad shallallahu alaihi wa sallam'},
]

// ── 17-30. Doa Collections ───────────────────────────────────
const DOAMAKAN = {
  before: {ar:'بِسْمِ اللّٰهِ وَبَرَكَةِ اللّٰهِ',latin:'Bismillahi wa barakatillah',meaning:'Dengan nama Allah dan dengan keberkahan Allah'},
  after: {ar:'اَلْحَمْدُ لِلّٰهِ الَّذِيْ اَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِيْنَ',latin:"Alhamdulillahilladzi ath'amana wa saqana wa ja'alana muslimin",meaning:'Segala puji bagi Allah yang memberi makan dan minum serta menjadikan kami muslim'}
}

const DOATIDUR = {
  ar: 'بِاسْمِكَ اللّٰهُمَّ اَمُوْتُ وَاَحْيَا',
  latin: 'Bismikallahumma amutu wa ahya',
  meaning: 'Dengan nama-Mu ya Allah aku mati dan aku hidup',
  extra: [
    {ar:'اَللّٰهُمَّ قِنِيْ عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ',latin:"Allahumma qini adzabaka yawma tab'athu ibadak",meaning:'Ya Allah lindungilah aku dari azab-Mu pada hari Engkau membangkitkan hamba-hamba-Mu'}
  ]
}

const DOAMASJID = {
  enter: {ar:'اَللّٰهُمَّ افْتَحْ لِيْ اَبْوَابَ رَحْمَتِكَ',latin:'Allahummaftah li abwaba rahmatik',meaning:'Ya Allah bukakan untukku pintu-pintu rahmat-Mu'},
  leave: {ar:'اَللّٰهُمَّ اِنِّيْ اَسْاَلُكَ مِنْ فَضْلِكَ',latin:"Allahumma inni as'aluka min fadlik",meaning:'Ya Allah sesungguhnya aku memohon keutamaan-Mu'}
}

const DOAWUDHU = {
  before: {ar:'بِسْمِ اللّٰهِ وَالْحَمْدُ لِلّٰهِ',latin:'Bismillahi walhamdulillah',meaning:'Dengan nama Allah dan segala puji bagi Allah'},
  after: {ar:'اَشْهَدُ اَنْ لَا اِلٰهَ اِلَّا اللّٰهُ وَحْدَهُ لَا شَرِيْكَ لَهُ وَاَشْهَدُ اَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُوْلُهُ اَللّٰهُمَّ اجْعَلْنِيْ مِنَ التَّوَّابِيْنَ وَاجْعَلْنِيْ مِنَ الْمُتَطَهِّرِيْنَ',latin:'Asyhadu an la ilaha illallahu wahdahu la syarikalah wa asyhadu anna Muhammadan abduhu wa rasuluh, Allahummaj\'alni minat tawwabina waj\'alni minal mutathahhirin',meaning:'Aku bersaksi tidak ada Tuhan selain Allah dan Muhammad utusan-Nya. Ya Allah jadikanlah aku orang yang bertaubat dan mensucikan diri'}
}

const DOAPARENTS = {
  ar: 'رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِيْ صَغِيْرًا',
  latin: 'Rabbirhamhuma kama rabbayani shoghira',
  meaning: 'Ya Tuhan kasihilah keduanya sebagaimana mereka mendidikku kecil',
  extra: [
    {ar:'رَبَّنَا اغْفِرْ لِيْ وَلِوَالِدَيَّ يَوْمَ يَقُوْمُ الْحِسَابُ',latin:'Rabbanaaghfir li wa liwalidayya yawma yaqumul hisab',meaning:'Ya Tuhan kami ampunilah aku dan kedua orang tuaku pada hari hisab'}
  ]
}

const DOASICK = {
  ar: 'اَللّٰهُمَّ رَبَّ النَّاسِ اَذْهِبِ الْبَاسَ اِشْفِ اَنْتَ الشَّافِيْ لَا شِفَاءَ اِلَّا شِفَاؤُكَ شِفَاءً لَا يُغَادِرُ سَقَمًا',
  latin: "Allahumma rabban nas adzhibil ba's isyfi antas syafi la syifa-a illa syifa-uka syifa-an la yughadiru saqama",
  meaning: 'Ya Allah Tuhan manusia, hilangkan penyakit, sembuhkanlah, Engkau Maha Penyembuh, tidak ada kesembuhan kecuali kesembuhan-Mu'
}

const DOATRAVEL = {
  ar: 'سُبْحَانَ الَّذِيْ سَخَّرَ لَنَا هٰذَا وَمَا كُنَّا لَهُ مُقْرِنِيْنَ وَاِنَّا اِلٰى رَبِّنَا لَمُنْقَلِبُوْنَ اَللّٰهُمَّ اِنَّا نَسْاَلُكَ فِيْ سَفَرِنَا هٰذَا الْبِرَّ وَالتَّقْوٰى وَمِنَ الْعَمَلِ مَا تَرْضٰى',
  latin: "Subhanalladzi sakhkhara lana hadza wa ma kunna lahu muqrinin wa inna ila rabbina lamunqalibun, Allahumma inna nas'aluka fi safari na hadzal birra wat taqwa wa minal amali ma tardha",
  meaning: 'Maha Suci Allah yang menundukkan ini bagi kami. Ya Allah kami mohon dalam perjalanan ini kebaikan dan ketakwaan'
}

const DOASTUDY = {
  ar: 'بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ رَبِّ زِدْنِيْ عِلْمًا وَارْزُقْنِيْ فَهْمًا وَاجْعَلْنِيْ مِنَ الصَّالِحِيْنَ',
  latin: "Bismillahirrahmanirrahim, rabbi zidni ilman warzuqni fahman waj'alni minash shalihin",
  meaning: 'Ya Allah tambahkan ilmu dan rezekikan pemahaman, jadikanlah aku termasuk orang-orang yang saleh'
}

const DOAMARRIAGE = {
  ar: 'اَللّٰهُمَّ اِنِّيْ اُرِيْدُ اَنْ اَنْكِحَ فُلَانَةَ فَاِنْ كَانَتْ لِيْ زَوْجَةً صَالِحَةً فَاقْدُرْهَا لِيْ',
  latin: "Allahumma inni uridu an ankha fulanata fa-in kanat li zawjatan shalihatan faqdurha li",
  meaning: 'Ya Allah sesungguhnya aku ingin menikahi si fulanah, jika ia istri yang saleh maka takdirkanlah ia untukku'
}

const DOADEATH = {
  ar: 'اَللّٰهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَعَافِهِ وَاعْفُ عَنْهُ وَاَكْرِمْ نُزُلَهُ وَوَسِّعْ مُدْخَلَهُ وَاغْسِلْهُ بِالْمَاءِ وَالثَّلْجِ وَالْبَرَدِ',
  latin: "Allahummaghfir lahu warhamhu wa afihi wa'fu anhu wa akrim nuzulahu wa wassi' mudkhalahu waghsilhu bil ma-i wats tsalji wal barad",
  meaning: 'Ya Allah ampunilah dia, kasihanilah dia, sejahterakanlah dia, maafkanlah dia, muliakanlah tempatnya, luaskanlah kuburnya, dan cucilah dia dengan air, salju, dan embun'
}

const DOARIZQI = {
  ar: 'اَللّٰهُمَّ اكْفِنِيْ بِحَلَالِكَ عَنْ حَرَامِكَ وَاَغْنِنِيْ بِفَضْلِكَ عَمَّنْ سِوَاكَ',
  latin: "Allahummakfini bihalalika an haramika wa aghnini bifadlika amman siwak",
  meaning: 'Ya Allah cukupkanlah aku dengan halal-Mu dari haram-Mu dan kayakanlah aku dengan keutamaan-Mu dari selain-Mu'
}

const DOAFORGIVENESS = {
  ar: 'اَسْتَغْفِرُ اللّٰهَ الْعَظِيْمَ الَّذِيْ لَا اِلٰهَ اِلَّا هُوَ الْحَيُّ الْقَيُّوْمُ وَاَتُوْبُ اِلَيْهِ',
  latin: "Astaghfirullahal azhimalladzi la ilaha illa huwal hayyul qayyum wa atubu ilaih",
  meaning: 'Aku memohon ampunan kepada Allah Yang Maha Agung, yang tidak ada Tuhan selain Dia, Yang Hidup dan Berdiri Sendiri, dan aku bertaubat kepada-Nya'
}

const DOAPROPHET = {
  ar: 'اَللّٰهُمَّ صَلِّ عَلٰى سَيِّدِنَا مُحَمَّدٍ وَعَلٰى اٰلِ سَيِّدِنَا مُحَمَّدٍ كَمَا صَلَّيْتَ عَلٰى سَيِّدِنَا اِبْرَاهِيْمَ وَعَلٰى اٰلِ سَيِّدِنَا اِبْرَاهِيْمَ وَبَارِكْ عَلٰى سَيِّدِنَا مُحَمَّدٍ وَعَلٰى اٰلِ سَيِّدِنَا مُحَمَّدٍ كَمَا بَارَكْتَ عَلٰى سَيِّدِنَا اِبْرَاهِيْمَ وَعَلٰى اٰلِ سَيِّدِنَا اِبْرَاهِيْمَ فِي الْعَالَمِيْنَ اِنَّكَ حَمِيْدٌ مَجِيْدٌ',
  latin: 'Allahumma shalli ala sayyidina Muhammad wa ala ali sayyidina Muhammad kama shallayta ala sayyidina Ibrahim wa ala ali sayyidina Ibrahim wa barik ala sayyidina Muhammad wa ala ali sayyidina Muhammad kama barakta ala sayyidina Ibrahim wa ala ali sayyidina Ibrahim fil alamin innaka hamidun majid',
  meaning: 'Shalawat Ibrahimiyah — shalawat dan salam kepada Nabi Muhammad dan keluarganya sebagaimana shalawat kepada Ibrahim dan keluarganya'
}

const DOAPROTECTION = {
  ar: 'اَعُوْذُ بِكَلِمَاتِ اللّٰهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
  latin: "A'udzu bikalimatillahit tammati min syarri ma khalaq",
  meaning: 'Aku berlindung dengan kalimat-kalimat Allah yang sempurna dari kejahatan apa yang Dia ciptakan',
  extra: [
    {ar:'بِسْمِ اللّٰهِ الَّذِيْ لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْاَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيْعُ الْعَلِيْمُ',latin:"Bismillahilladzi la yadzurru ma'asmihi syai-un fil ardi wala fis sama-i wahuwas sami'ul alim",meaning:'Dengan nama Allah yang dengan nama-Nya tidak ada sesuatu yang membahayakan di bumi dan di langit'}
  ]
}

// ── 31. Tasbih Counter (in-memory) ───────────────────────────
const tasbihCounters = new Map()

// ── 32. Zakat Calculator ─────────────────────────────────────
const ZAKAT_RATES = {
  gold_nisab: 85, // gram
  silver_nisab: 595, // gram
  gold_price_per_gram: 1000000, // approximate IDR
  silver_price_per_gram: 12000, // approximate IDR
  rate: 0.025 // 2.5%
}

// ── 33. Hijri Calendar ───────────────────────────────────────
const HIJRI_MONTHS = ['Muharram','Safar','Rabi\'ul Awal','Rabi\'ul Akhir','Jumadil Awal','Jumadil Akhir','Rajab','Sya\'ban','Ramadhan','Syawwal','Dzulqa\'dah','Dzulhijjah']

function gregorianToHijri(date) {
  const d = date instanceof Date ? date : new Date(date)
  const jd = Math.floor((d.getTime() / 86400000) + 2440587.5)
  const l = jd - 1948440 + 10632
  const n = Math.floor((l - 1) / 10631)
  const l2 = l - 10631 * n + 354
  const j = Math.floor((10985 - l2) / 5316) * Math.floor((50 * l2) / 17719) + Math.floor(l2 / 5670) * Math.floor((43 * l2) / 15238)
  const l3 = l2 - Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) - Math.floor(j / 16) * Math.floor((15238 * j) / 43) + 29
  const m = Math.floor((24 * l3) / 709)
  const y = 30 * n + j - 30
  const day = l3 - Math.floor((709 * m) / 24)
  return { year: y, month: m, day, monthName: HIJRI_MONTHS[m - 1] || '' }
}

// ── 34. Qibla Direction ─────────────────────────────────────
const QIBLA_CITIES = [
  {name:'Jakarta',lat:-6.2088,lng:106.8456,dir:'292° (Barat Laut)'},
  {name:'Bandung',lat:-6.9175,lng:107.6191,dir:'294° (Barat Laut)'},
  {name:'Surabaya',lat:-7.2575,lng:112.7521,dir:'293° (Barat Laut)'},
  {name:'Semarang',lat:-6.9666,lng:110.4196,dir:'293° (Barat Laut)'},
  {name:'Yogyakarta',lat:-7.7956,lng:110.3695,dir:'294° (Barat Laut)'},
  {name:'Medan',lat:3.5952,lng:98.6722,dir:'291° (Barat Laut)'},
  {name:'Makassar',lat:-5.1477,lng:119.4327,dir:'293° (Barat Laut)'},
  {name:'Palembang',lat:-2.9761,lng:104.7754,dir:'292° (Barat Laut)'},
  {name:'Denpasar',lat:-8.6500,lng:115.2167,dir:'293° (Barat Laut)'},
  {name:'Padang',lat:-0.9493,lng:100.3534,dir:'291° (Barat Laut)'},
  {name:'Banjarmasin',lat:-3.4434,lng:114.8366,dir:'293° (Barat Laut)'},
  {name:'Manado',lat:1.4748,lng:124.8421,dir:'294° (Barat Laut)'},
  {name:'Malang',lat:-7.9666,lng:112.6326,dir:'293° (Barat Laut)'},
  {name:'Lampung',lat:-5.4500,lng:105.2667,dir:'292° (Barat Laut)'},
  {name:'Pekanbaru',lat:0.5071,lng:101.4478,dir:'291° (Barat Laut)'},
  {name:'Kuala Lumpur',lat:3.1390,lng:101.6869,dir:'292° (Barat Laut)'},
  {name:'Singapura',lat:1.3521,lng:103.8198,dir:'292° (Barat Laut)'},
  {name:'Bangkok',lat:13.7563,lng:100.5018,dir:'295° (Barat Laut)'},
  {name:'Riyadh',lat:24.7136,lng:46.6753,dir:'207° (Selatan Barat)'},
  {name:'Kairo',lat:30.0444,lng:31.2357,dir:'135° (Tenggara)'},
  {name:'London',lat:51.5074,lng:-0.1278,dir:'118° (Tenggara)'},
  {name:'New York',lat:40.7128,lng:-74.0060,dir:'58° (Timur Laut)'},
]

// ── 35. Imsakiyah ────────────────────────────────────────────
const IMSAK_CITIES = [
  {name:'Jakarta',imsak:'04:33',subuh:'04:43',dzuhur:'11:55',ashar:'15:16',maghrib:'18:02',isya:'19:15'},
  {name:'Bandung',imsak:'04:28',subuh:'04:38',dzuhur:'11:51',ashar:'15:13',maghrib:'17:58',isya:'19:11'},
  {name:'Surabaya',imsak:'04:16',subuh:'04:26',dzuhur:'11:46',ashar:'15:09',maghrib:'17:54',isya:'19:07'},
  {name:'Semarang',imsak:'04:21',subuh:'04:31',dzuhur:'11:48',ashar:'15:11',maghrib:'17:56',isya:'19:09'},
  {name:'Yogyakarta',imsak:'04:22',subuh:'04:32',dzuhur:'11:49',ashar:'15:12',maghrib:'17:57',isya:'19:10'},
  {name:'Medan',imsak:'04:52',subuh:'05:02',dzuhur:'12:11',ashar:'15:31',maghrib:'18:19',isya:'19:33'},
  {name:'Makassar',imsak:'04:35',subuh:'04:45',dzuhur:'12:03',ashar:'15:27',maghrib:'18:12',isya:'19:26'},
  {name:'Palembang',imsak:'04:39',subuh:'04:49',dzuhur:'12:02',ashar:'15:23',maghrib:'18:10',isya:'19:24'},
  {name:'Denpasar',imsak:'04:33',subuh:'04:43',dzuhur:'12:01',ashar:'15:25',maghrib:'18:10',isya:'19:24'},
  {name:'Padang',imsak:'04:47',subuh:'04:57',dzuhur:'12:07',ashar:'15:27',maghrib:'18:15',isya:'19:29'},
  {name:'Banjarmasin',imsak:'04:27',subuh:'04:37',dzuhur:'12:01',ashar:'15:26',maghrib:'18:11',isya:'19:25'},
  {name:'Manado',imsak:'04:26',subuh:'04:36',dzuhur:'11:56',ashar:'15:21',maghrib:'18:06',isya:'19:20'},
]

// ── 36. Kajian Topics ────────────────────────────────────────
const KAJIAN = [
  {no:1,topic:'Aqidah',desc:'Ilmu tentang keimanan: rukun iman, sifat Allah, tauhid, dan menghindari syirik. Dasar keislaman yang paling fundamental.'},
  {no:2,topic:'Fiqih Ibadah',desc:'Hukum-hukum praktik ibadah: thaharah, shalat, puasa, zakat, haji. Berdasarkan Al-Quran, Sunnah, dan pendapat ulama.'},
  {no:3,topic:'Fiqih Muamalah',desc:'Hukum transaksi: jual beli, sewa, utang piutang, kerja, investasi. Prinsip keadilan dan larangan riba.'},
  {no:4,topic:'Tafsir Al-Quran',desc:'Penjelasan makna ayat Al-Quran. Metode tafsir bil ma\'tsur (dengan riwayat) dan bil ra\'yi (dengan ijtihad).'},
  {no:5,topic:'Hadits',desc:'Ilmu tentang sabda Nabi: sanad, matan, derajat hadis (sahih, hasan, dhaif). Metode penyimpanan dan penelitian hadis.'},
  {no:6,topic:'Akhlaq',desc:'Ilmu tentang akhlak: sifat terpuji (jujur, sabar, adil, rendah hati) dan sifat tercela (riya, hasud, sombong, kikir).'},
  {no:7,topic:'Sejarah Islam',desc:'Perjalanan umat Islam dari masa Nabi hingga modern: khulafaur rasyidin, dinasti, peradaban, dan tokoh-tokoh.'},
  {no:8,topic:'Tasawuf',desc:'Ilmu tentang penyucian jiwa: mendekatkan diri kepada Allah, maqamat (tingkatan), dan ahwal (keadaan spiritual).'},
  {no:9,topic:'Ilmu Kalam',desc:'Teologi Islam: membahas sifat Allah, takdir, keadilan, dan iman. Aliran Asy\'ariyah, Maturidiyah, Mu\'tazilah.'},
  {no:10,topic:'Dakwah',desc:'Ilmu tentang penyampaian Islam: metode, media, strategi, dan adab dakwah. Berdakwah dengan hikmah dan nasihat yang baik.'},
  {no:11,topic:'Fiqih Kontemporer',desc:'Hukum Islam untuk masalah modern: transplantasi organ, bayi tabung, kripto, digital, dan isu-isu kekinian.'},
]

// ── 37. Mufti / Fatwa ────────────────────────────────────────
const FATWA = [
  {no:1,topic:'Zakat Penghasilan',fatwa:'Penghasilan wajib dizakati jika mencapai nisab (85 gram emas) dan haul (1 tahun). Besarnya 2,5% dari penghasilan bruto setahun. MUI dan Musatnas Zakat menyepakatinya.'},
  {no:2,topic:'Bunga Bank',fatwa:'Bunga bank termasuk riba dan haram hukumnya. Alternatif: perbankan syariah dengan akad mudharabah, musyarakah, atau wadiah.'},
  {no:3,topic:'Asuransi',fatwa:'Asuransi konvensional haram karena mengandung gharar, maysir, dan riba. Asuransi syariah (takaful) halal dengan prinsip ta\'awun dan tabarru\'.'},
  {no:4,topic:'Donor Organ',fatwa:'Donor organ diperbolehkan dengan syarat: donor hidup tidak membahayakan, donor meninggal atas izin wasiat, dan tujuan medis yang jelas.'},
  {no:5,topic:'Bayi Tabung',fatwa:'Bayi tabung halal jika sperma dan ovum dari pasangan suami-istri yang sah. Haram jika menggunakan donor pihak ketiga.'},
  {no:6,topic:'Kriptocurrency',fatwa:'Kripto sebagai komoditas diperbolehkan untuk transaksi dan investasi dengan syarat tidak spekulatif, tidak money laundering, dan underlying asset jelas. MUI: haram jika mengandung gharar.'},
  {no:7,topic:'Vaksin',fatwa:'Vaksinasi diperbolehkan sebagai upaya pencegahan penyakit (darurat/sadarurat). Termasuk vaksin yang mengandung unsur haram jika tidak ada alternatif halal.'},
  {no:8,topic:'Euthanasia',fatwa:'Euthanasia aktif (mempercepat kematian) haram karena membunuh. Euthanasia pasif (menghentikan tindakan medis yang tidak bermanfaat) diperselisihkan para ulama.'},
  {no:9,topic:'Musik',fatwa:'Musik yang tidak membangkitkan syahwat, tidak mendorong maksiat, dan tidak mengandung kata-kata kotor dimakruhkan oleh sebagian ulama dan dihalalkan oleh sebagian lain.'},
  {no:10,topic:'Merokok',fatwa:'Merokok haram karena merusak kesehatan, membuang harta, dan membahayakan orang lain (asap pasif). MUI mengeluarkan fatwa haram pada 2010.'},
]

// ── 38. Maulid Nabi ──────────────────────────────────────────
const MAULID = {
  title: 'Maulid Nabi Muhammad SAW',
  desc: 'Peringatan kelahiran Nabi Muhammad SAW pada 12 Rabi\'ul Awal. Tradisi yang berkembang sejak abad ke-7 Hijriah.',
  content: [
    'Kelahiran Nabi Muhammad SAW pada hari Senin, 12 Rabi\'ul Awal Tahun Gajah (571 M) di Mekkah.',
    'Ayahnya Abdullah wafat sebelum beliau lahir. Ibunya Aminah wafat saat beliau berusia 6 tahun.',
    'Diasuh oleh kakeknya Abdul Muthalib, lalu pamannya Abu Thalib.',
    'Sejak kecil sudah dikenal sebagai anak yang jujur dan terpercaya (Al-Amin).',
    'Pada usia 25 tahun menikah dengan Khadijah binti Khuwailid.',
    'Diangkat menjadi nabi pada usia 40 tahun di Gua Hira.',
    'Maulid Nabi merupakan bentuk syukur atas kelahiran rasul terakhir yang membawa rahmat bagi seluruh alam.',
    'Dibacakan kitab Maulid seperti Maulid Diba, Maulid Barzanji, dan Maulid Simthud Durar.',
    'Hukum perayaan maulid: diperselisihkan ulama. Jumhur membolehkan sebagai bentuk syukur, sebagian menilai bid\'ah.',
  ]
}

// ── 39. Isra Mi'raj ──────────────────────────────────────────
const ISRA = {
  title: "Isra Mi'raj Nabi Muhammad SAW",
  date: '27 Rajab (tahun ke-10 kenabian, 620 M)',
  story: [
    "Isra Mi'raj adalah perjalanan malam Nabi Muhammad SAW dari Masjidil Haram ke Masjidil Aqsha (Isra) dan dari Masjidil Aqsha ke Sidratul Muntaha (Mi'raj).",
    'Perjalanan ini terjadi pada malam 27 Rajab, sekitar tahun ke-10 kenabian, setelah Tahun Kesedihan.',
    'Nabi ditemani Malaikat Jibril dan menaiki Buraq (kendaraan cepat).',
    'Di Masjidil Aqsha, Nabi memimpin shalat berjamaah bersama para nabi dan rasul.',
    "Saat Mi'raj, Nabi melewati langit-langit dan bertemu para nabi: Adam (langit 1), Isa & Yahya (2), Yusuf (3), Idris (4), Harun (5), Musa (6), Ibrahim (7).",
    'Di Sidratul Muntaha, Nabi menerima perintah shalat 5 waktu yang semula 50 waktu, kemudian dikurangi menjadi 5 waktu setelah dialog dengan Musa AS.',
    'Shalat 5 waktu merupakan hadiah terbesar dari Isra Mi\'raj bagi umat Islam.',
    'Peristiwa ini menjadi ujian keimanan: Abu Bakar langsung beriman sehingga digelari As-Siddiq.',
  ]
}

// ── 40. Nabi Akhir Zaman — Signs of End Times ────────────────
const NABIAKHIR = [
  {no:1,sign:'Munculnya Dajjal',desc:'Figur jahat yang mengaku Tuhan, membawa fitnah besar. Akan menguji iman seluruh umat manusia. Isa AS yang akan membunuhnya.'},
  {no:2,sign:'Turunnya Nabi Isa AS',desc:'Nabi Isa akan turun kembali ke bumi di menara putih Damaskus. Ia akan membunuh Dajjal, mematahkan salib, dan membunuh babi.'},
  {no:3,sign:'Munculnya Ya\'juj dan Ma\'juj',desc:'Bangsa yang sangat banyak dan merusak. Akan menerjang dari segala penjuru. Dihancurkan oleh doa Nabi Isa dan umatnya.'},
  {no:4,sign:'Munculnya Dabbatul Ardh',desc:'Binatang dari bumi yang bisa berbicara dan membedakan orang beriman dan kafir dengan tanda di wajah mereka.'},
  {no:5,sign:'Asap yang menutupi bumi',desc:'Asap tebal yang menutupi bumi selama 40 hari. Orang beriman seperti pilek, orang kafir seperti orang gila.'},
  {no:6,sign:'Matahari terbit dari barat',desc:'Tanda besar kiamat yang membuat pintu tobat tertutup. Siapa yang belum beriman saat itu tidak akan diterima tobatnya.'},
  {no:7,sign:'Bumi mengeluarkan harta',desc:'Bumi akan mengeluarkan tumpukan emas dan perak. Manusia akan berperang memperebutkannya hingga terjadi pembunuhan besar.'},
  {no:8,sign:'Api yang mengumpulkan manusia',desc:'Api besar dari Yaman yang menghalau manusia ke Syam. Ini tanda kiamat yang sangat dekat.'},
  {no:9,sign:'Hancurnya Ka\'bah',desc:"Ka'bah akan dihancurkan oleh orang dari Habasyah (Ethiopia) bernama Dzus-Suwai'ain. Ini tanda kiamat sudah sangat dekat."},
  {no:10,sign:'Tersebarnya kerusakan',desc:'Perzinaan, khamar, riba, dan maksiat merajalela. Ilmu diangkat dan kebodohan merajalela. Manusia berlomba dalam kemewahan dunia.'},
  {no:11,sign:'Imam Mahdi',desc:'Pemimpin dari keturunan Nabi yang akan memenuhi bumi dengan keadilan setelah dipenuhi kezaliman. Namanya sama dengan nama Nabi (Muhammad).'},
  {no:12,sign:'Tanda-tanda kecil',desc:'Ilmu diangkat, kebodohan merajalela, zina merajalela, minuman keras diminum terang-terangan, pembunuhan merajalela, wanita berpakaian tapi telanjang, manusia saling memutus silaturahmi.'},
]

// ═══════════════════════════════════════════════════════════════
// COMMANDS — 40+ Islamic Commands
// ═══════════════════════════════════════════════════════════════

export const commands = {

  // ── 1. asmaulhusna ─────────────────────────────────────────
  asmaulhusna: async m => {
    const arg = m.command.args?.trim()
    if (arg) {
      const num = parseInt(arg)
      if (isNaN(num) || num < 1 || num > 99) {
        return m.reply('❌ Nomor harus 1-99. Contoh: `.asmaulhusna 1`')
      }
      const n = ASMAULHUSNA[num - 1]
      return m.reply([
        `✨ *Asmaul Husna #${n.no}*`,
        '',
        `🕌 ${n.ar}`,
        `📝 ${n.latin}`,
        `📌 ${n.meaning}`,
      ].join('\n'))
    }
    const lines = [
      '✨ *99 Asmaul Husna*',
      '',
      ...ASMAULHUSNA.map(n => `${String(n.no).padStart(2,' ')}. ${n.ar} — ${n.latin} (${n.meaning})`)
    ]
    return m.reply(lines.join('\n'))
  },

  // ── 2. doaharian ───────────────────────────────────────────
  doaharian: async m => {
    const arg = m.command.args?.trim()
    if (arg) {
      const num = parseInt(arg)
      if (isNaN(num) || num < 1 || num > 30) {
        return m.reply('❌ Nomor harus 1-30. Contoh: `.doaharian 1`')
      }
      const d = DOAHARIAN[num - 1]
      return m.reply([
        `🤲 *${d.title}*`,
        '',
        `🕌 ${d.ar}`,
        `📝 ${d.latin}`,
        `📌 ${d.meaning}`,
      ].join('\n'))
    }
    return m.reply([
      '🤲 *Doa Harian (30 Doa)*',
      '',
      ...DOAHARIAN.map(d => `${String(d.no).padStart(2,' ')}. ${d.title}`),
      '',
      '_Ketik .doaharian <nomor> untuk detail_',
    ].join('\n'))
  },

  // ── 3. ayatkursi ───────────────────────────────────────────
  ayatkursi: async m => {
    return m.reply([
      '📖 *Ayat Kursi*',
      `📍 ${AYATKURSI.surah}`,
      '',
      AYATKURSI.ar,
      '',
      `📝 ${AYATKURSI.latin}`,
      '',
      `📌 ${AYATKURSI.translation}`,
      '',
      `⭐ Keutamaan: ${AYATKURSI.virtue}`,
    ].join('\n'))
  },

  // ── 4. juzamma ─────────────────────────────────────────────
  juzamma: async m => {
    const arg = m.command.args?.trim()
    if (arg) {
      const num = parseInt(arg)
      if (isNaN(num) || num < 1 || num > 37) {
        return m.reply('❌ Nomor harus 1-37. Contoh: `.juzamma 1`')
      }
      const s = JUZAMMA[num - 1]
      return m.reply([
        `📖 *Surah ${s.name}* (${s.ar})`,
        `📊 Nomor: ${s.surah} • ${s.ayat} ayat`,
        `📌 Arti: ${s.meaning}`,
      ].join('\n'))
    }
    return m.reply([
      '📖 *Juz Amma (Surah 78-114)*',
      '',
      ...JUZAMMA.map(s => `${String(s.no).padStart(2,' ')}. ${s.name} (${s.ar}) — ${s.ayat} ayat`),
      '',
      '_Ketik .juzamma <nomor> untuk detail_',
    ].join('\n'))
  },

  // ── 5. kisahnabi ───────────────────────────────────────────
  kisahnabi: async m => {
    const arg = m.command.args?.trim()?.toLowerCase()
    if (arg) {
      const nabi = KISAHNABI.find(n => n.name.toLowerCase().includes(arg) || String(n.no) === arg)
      if (!nabi) return m.reply(`❌ Nabi "${arg}" tidak ditemukan.\n\n_Ketik .kisahnabi untuk daftar_`)
      return m.reply([
        `📜 *${nabi.name}*`,
        `📅 Era: ${nabi.era}`,
        '',
        nabi.story,
      ].join('\n'))
    }
    return m.reply([
      '📜 *Kisah 25 Nabi & Rasul*',
      '',
      ...KISAHNABI.map(n => `${String(n.no).padStart(2,' ')}. ${n.name} (${n.era})`),
      '',
      '_Ketik .kisahnabi <nama/nomor> untuk detail_',
    ].join('\n'))
  },

  // ── 6. niatsholat ──────────────────────────────────────────
  niatsholat: async m => {
    const arg = m.command.args?.trim()?.toLowerCase()
    if (arg) {
      const sholat = NIATSHOLAT.find(n => n.name.toLowerCase() === arg)
      if (!sholat) return m.reply(`❌ Shalat "${arg}" tidak ditemukan. Pilihan: subuh, dzuhur, ashar, maghrib, isya`)
      return m.reply([
        `🕌 *Niat Shalat ${sholat.name}*`,
        '',
        sholat.ar,
        '',
        `📝 ${sholat.latin}`,
        '',
        `📌 ${sholat.meaning}`,
      ].join('\n'))
    }
    return m.reply([
      '🕌 *Niat Shalat Lima Waktu*',
      '',
      ...NIATSHOLAT.map(n => `▪️ *${n.name}*\n${n.ar}\n_${n.latin}_\n📌 ${n.meaning}\n`),
    ].join('\n'))
  },

  // ── 7. tahlil ──────────────────────────────────────────────
  tahlil: async m => {
    return m.reply([
      '📿 *Bacaan Tahlil*',
      '',
      ...TAHLIL.map(t => `${t.step}. *${t.title}* (${t.count}x)\n${t.ar}\n_${t.latin}_`),
    ].join('\n\n'))
  },

  // ── 8. wirid ───────────────────────────────────────────────
  wirid: async m => {
    return m.reply([
      '📿 *Wirid Setelah Shalat*',
      '',
      ...WIRID.map(w => `${w.no}. *${w.title}* (${w.count}x)\n${w.ar}\n_${w.latin}_`),
    ].join('\n\n'))
  },

  // ── 9. dzikir ──────────────────────────────────────────────
  dzikir: async m => {
    const arg = m.command.args?.trim()?.toLowerCase()
    if (arg === 'pagi' || arg === 'subuh') {
      return m.reply([
        '🌅 *Dzikir Pagi*',
        '',
        ...DZIKIR_PAGI.map(d => `${d.no}. (${d.count}x)\n${d.ar}\n_${d.latin}_`),
      ].join('\n\n'))
    }
    if (arg === 'petang' || arg === 'sore' || arg === 'maghrib') {
      return m.reply([
        '🌇 *Dzikir Petang*',
        '',
        ...DZIKIR_PETANG.map(d => `${d.no}. (${d.count}x)\n${d.ar}\n_${d.latin}_`),
      ].join('\n\n'))
    }
    return m.reply('❌ Gunakan: `.dzikir pagi` atau `.dzikir petang`')
  },

  // ── 10. doaqlb ─────────────────────────────────────────────
  doaqlb: async m => {
    const arg = m.command.args?.trim()?.toLowerCase()
    if (arg) {
      const doa = DOAKHUSUS.find(d => d.title.toLowerCase().includes(arg))
      if (!doa) return m.reply(`❌ Doa "${arg}" tidak ditemukan.\n\nPilihan: qunut, iftitah, sujud, ruku, duduk, tasyahud awal, tasyahud akhir`)
      return m.reply([
        `🤲 *${doa.title}*`,
        '',
        doa.ar,
        '',
        `📝 ${doa.latin}`,
        '',
        `📌 ${doa.meaning}`,
      ].join('\n'))
    }
    return m.reply([
      '🤲 *Doa-Doa Khusus Shalat*',
      '',
      ...DOAKHUSUS.map(d => `▪️ *${d.title}*\n${d.ar}\n_${d.latin}_\n📌 ${d.meaning}\n`),
    ].join('\n'))
  },

  // ── 11. kisahsahabat ──────────────────────────────────────
  kisahsahabat: async m => {
    const arg = m.command.args?.trim()?.toLowerCase()
    if (arg) {
      const sahabat = KISAHSAHABAT.find(s => s.name.toLowerCase().includes(arg) || String(s.no) === arg)
      if (!sahabat) return m.reply(`❌ Sahabat "${arg}" tidak ditemukan.\n\n_Ketik .kisahsahabat untuk daftar_`)
      return m.reply([
        `👤 *${sahabat.name}*`,
        `🏷️ ${sahabat.title}`,
        '',
        sahabat.story,
      ].join('\n'))
    }
    return m.reply([
      '👤 *Kisah 10 Sahabat Nabi*',
      '',
      ...KISAHSAHABAT.map(s => `${String(s.no).padStart(2,' ')}. ${s.name} — ${s.title}`),
      '',
      '_Ketik .kisahsahabat <nama/nomor> untuk detail_',
    ].join('\n'))
  },

  // ── 12. dalil ──────────────────────────────────────────────
  dalil: async m => {
    const arg = m.command.args?.trim()?.toLowerCase()
    if (arg) {
      const d = DALIL.find(d => d.topic.toLowerCase() === arg || d.topic.toLowerCase().includes(arg))
      if (!d) return m.reply(`❌ Topik "${arg}" tidak ditemukan.\n\n_Topik: ${DALIL.map(d=>d.topic).join(', ')}_`)
      return m.reply([
        `📖 *Dalil: ${d.topic}*`,
        '',
        ...d.verses.map(v => `📌 *${v.ref}*\n${v.text}`).join('\n\n'),
      ].join('\n'))
    }
    return m.reply([
      '📖 *Dalil Al-Quran Berdasarkan Topik*',
      '',
      ...DALIL.map(d => `▪️ ${d.topic} (${d.verses.length} ayat)`),
      '',
      '_Ketik .dalil <topik> untuk detail_',
    ].join('\n'))
  },

  // ── 13. hukumislam ─────────────────────────────────────────
  hukumislam: async m => {
    const arg = m.command.args?.trim()?.toLowerCase()
    if (arg) {
      const h = HUKUMISLAM.find(h => h.title.toLowerCase().includes(arg) || String(h.no) === arg)
      if (!h) return m.reply(`❌ Topik "${arg}" tidak ditemukan.\n\n_Ketik .hukumislam untuk daftar_`)
      return m.reply([
        `⚖️ *${h.title}*`,
        '',
        h.desc,
      ].join('\n'))
    }
    return m.reply([
      '⚖️ *Hukum Islam*',
      '',
      ...HUKUMISLAM.map(h => `${String(h.no).padStart(2,' ')}. *${h.title}*\n   ${h.desc}`).join('\n\n'),
    ].join('\n'))
  },

  // ── 14. sejarahislam ───────────────────────────────────────
  sejarahislam: async m => {
    return m.reply([
      '📜 *Sejarah Islam — Timeline*',
      '',
      ...SEJARAHISLAM.map(s => `📅 *${s.year}*\n   ${s.event}`),
    ].join('\n\n'))
  },

  // ── 15. ramadhan ───────────────────────────────────────────
  ramadhan: async m => {
    const arg = m.command.args?.trim()?.toLowerCase()
    if (arg) {
      const r = RAMADHAN.find(r => r.title.toLowerCase().includes(arg) || String(r.no) === arg)
      if (!r) return m.reply(`❌ Topik "${arg}" tidak ditemukan.\n\n_Ketik .ramadhan untuk daftar_`)
      return m.reply([
        `🌙 *${r.title}*`,
        '',
        r.desc,
      ].join('\n'))
    }
    return m.reply([
      '🌙 *Panduan Ramadhan*',
      '',
      ...RAMADHAN.map(r => `${String(r.no).padStart(2,' ')}. *${r.title}*\n   ${r.desc}`).join('\n\n'),
    ].join('\n'))
  },

  // ── 16. shalawat ───────────────────────────────────────────
  shalawat: async m => {
    const arg = m.command.args?.trim()
    if (arg) {
      const num = parseInt(arg)
      if (!isNaN(num) && num >= 1 && num <= SHALAWAT.length) {
        const s = SHALAWAT[num - 1]
        return m.reply([
          `✨ *${s.title}*`,
          '',
          s.ar,
          '',
          `📝 ${s.latin}`,
        ].join('\n'))
      }
      const s = SHALAWAT.find(s => s.title.toLowerCase().includes(arg.toLowerCase()))
      if (s) return m.reply([`✨ *${s.title}*`,'',s.ar,'',`📝 ${s.latin}`].join('\n'))
      return m.reply(`❌ Shalawat "${arg}" tidak ditemukan.`)
    }
    return m.reply([
      '✨ *Kumpulan Shalawat*',
      '',
      ...SHALAWAT.map(s => `${String(s.no).padStart(2,' ')}. ${s.title}`),
      '',
      '_Ketik .shalawat <nomor/nama> untuk detail_',
    ].join('\n'))
  },

  // ── 17. doamakan ───────────────────────────────────────────
  doamakan: async m => {
    return m.reply([
      '🍽️ *Doa Makan*',
      '',
      `▪️ *Sebelum Makan*`,
      DOAMAKAN.before.ar,
      `_${DOAMAKAN.before.latin}_`,
      `📌 ${DOAMAKAN.before.meaning}`,
      '',
      `▪️ *Sesudah Makan*`,
      DOAMAKAN.after.ar,
      `_${DOAMAKAN.after.latin}_`,
      `📌 ${DOAMAKAN.after.meaning}`,
    ].join('\n'))
  },

  // ── 18. doatidur ───────────────────────────────────────────
  doatidur: async m => {
    const lines = [
      '😴 *Doa Sebelum Tidur*',
      '',
      DOATIDUR.ar,
      `_${DOATIDUR.latin}_`,
      `📌 ${DOATIDUR.meaning}`,
    ]
    if (DOATIDUR.extra) {
      for (const e of DOATIDUR.extra) {
        lines.push('', e.ar, `_${e.latin}_`, `📌 ${e.meaning}`)
      }
    }
    return m.reply(lines.join('\n'))
  },

  // ── 19. doamasjid ──────────────────────────────────────────
  doamasjid: async m => {
    return m.reply([
      '🕌 *Doa Masjid*',
      '',
      `▪️ *Masuk Masjid*`,
      DOAMASJID.enter.ar,
      `_${DOAMASJID.enter.latin}_`,
      `📌 ${DOAMASJID.enter.meaning}`,
      '',
      `▪️ *Keluar Masjid*`,
      DOAMASJID.leave.ar,
      `_${DOAMASJID.leave.latin}_`,
      `📌 ${DOAMASJID.leave.meaning}`,
    ].join('\n'))
  },

  // ── 20. doawudhu ───────────────────────────────────────────
  doawudhu: async m => {
    return m.reply([
      '💧 *Doa Wudhu*',
      '',
      `▪️ *Sebelum Wudhu*`,
      DOAWUDHU.before.ar,
      `_${DOAWUDHU.before.latin}_`,
      `📌 ${DOAWUDHU.before.meaning}`,
      '',
      `▪️ *Sesudah Wudhu*`,
      DOAWUDHU.after.ar,
      `_${DOAWUDHU.after.latin}_`,
      `📌 ${DOAWUDHU.after.meaning}`,
    ].join('\n'))
  },

  // ── 21. doaparents ─────────────────────────────────────────
  doaparents: async m => {
    const lines = [
      '👨‍👩‍👧 *Doa untuk Kedua Orang Tua*',
      '',
      DOAPARENTS.ar,
      `_${DOAPARENTS.latin}_`,
      `📌 ${DOAPARENTS.meaning}`,
    ]
    if (DOAPARENTS.extra) {
      for (const e of DOAPARENTS.extra) {
        lines.push('', e.ar, `_${e.latin}_`, `📌 ${e.meaning}`)
      }
    }
    return m.reply(lines.join('\n'))
  },

  // ── 22. doasick ────────────────────────────────────────────
  doasick: async m => {
    return m.reply([
      '🏥 *Doa untuk Orang Sakit*',
      '',
      DOASICK.ar,
      '',
      `📝 ${DOASICK.latin}`,
      '',
      `📌 ${DOASICK.meaning}`,
    ].join('\n'))
  },

  // ── 23. doatravel ──────────────────────────────────────────
  doatravel: async m => {
    return m.reply([
      '✈️ *Doa Bepergian*',
      '',
      DOATRAVEL.ar,
      '',
      `📝 ${DOATRAVEL.latin}`,
      '',
      `📌 ${DOATRAVEL.meaning}`,
    ].join('\n'))
  },

  // ── 24. doastudy ───────────────────────────────────────────
  doastudy: async m => {
    return m.reply([
      '📚 *Doa Belajar*',
      '',
      DOASTUDY.ar,
      '',
      `📝 ${DOASTUDY.latin}`,
      '',
      `📌 ${DOASTUDY.meaning}`,
    ].join('\n'))
  },

  // ── 25. doamarriage ────────────────────────────────────────
  doamarriage: async m => {
    return m.reply([
      '💍 *Doa Pernikahan*',
      '',
      DOAMARRIAGE.ar,
      '',
      `📝 ${DOAMARRIAGE.latin}`,
      '',
      `📌 ${DOAMARRIAGE.meaning}`,
    ].join('\n'))
  },

  // ── 26. doadeath ───────────────────────────────────────────
  doadeath: async m => {
    return m.reply([
      '⚰️ *Doa untuk Orang Meninggal*',
      '',
      DOADEATH.ar,
      '',
      `📝 ${DOADEATH.latin}`,
      '',
      `📌 ${DOADEATH.meaning}`,
    ].join('\n'))
  },

  // ── 27. doarizqi ───────────────────────────────────────────
  doarizqi: async m => {
    return m.reply([
      '💰 *Doa Memohon Rezeki*',
      '',
      DOARIZQI.ar,
      '',
      `📝 ${DOARIZQI.latin}`,
      '',
      `📌 ${DOARIZQI.meaning}`,
    ].join('\n'))
  },

  // ── 28. doaforgiveness ─────────────────────────────────────
  doaforgiveness: async m => {
    return m.reply([
      '🙏 *Doa Istighfar (Pengampunan)*',
      '',
      DOAFORGIVENESS.ar,
      '',
      `📝 ${DOAFORGIVENESS.latin}`,
      '',
      `📌 ${DOAFORGIVENESS.meaning}`,
    ].join('\n'))
  },

  // ── 29. doaprophet ─────────────────────────────────────────
  doaprophet: async m => {
    return m.reply([
      '🤲 *Doa Mengikuti Nabi (Shalawat Ibrahimiyah)*',
      '',
      DOAPROPHET.ar,
      '',
      `📝 ${DOAPROPHET.latin}`,
      '',
      `📌 ${DOAPROPHET.meaning}`,
    ].join('\n'))
  },

  // ── 30. doaprotection ──────────────────────────────────────
  doaprotection: async m => {
    const lines = [
      '🛡️ *Doa Perlindungan*',
      '',
      DOAPROTECTION.ar,
      '',
      `📝 ${DOAPROTECTION.latin}`,
      '',
      `📌 ${DOAPROTECTION.meaning}`,
    ]
    if (DOAPROTECTION.extra) {
      for (const e of DOAPROTECTION.extra) {
        lines.push('', e.ar, `_${e.latin}_`, `📌 ${e.meaning}`)
      }
    }
    return m.reply(lines.join('\n'))
  },

  // ── 31. tasbih ─────────────────────────────────────────────
  tasbih: async m => {
    const { jid, sender, command } = m
    const arg = command.args?.trim()?.toLowerCase()
    const key = `${jid}:${sender}`
    if (arg === 'reset' || arg === 'ulang') {
      tasbihCounters.delete(key)
      return m.reply('📿 Tasbih counter direset ke 0.')
    }
    if (arg === 'hasil' || arg === 'cek') {
      const count = tasbihCounters.get(key) || 0
      return m.reply(`📿 Tasbih: *${count}*`)
    }
    const current = tasbihCounters.get(key) || 0
    const next = current + 1
    tasbihCounters.set(key, next)
    if (next === 33) return m.reply(`📿 Tasbih: *${next}* — ✅ *Subhanallah 33x selesai!*`)
    if (next === 66) return m.reply(`📿 Tasbih: *${next}* — ✅ *Alhamdulillah 33x selesai!*`)
    if (next === 99) return m.reply(`📿 Tasbih: *${next}* — ✅ *Allahu Akbar 33x selesai!*`)
    if (next === 100) return m.reply(`📿 Tasbih: *${next}* — ✅ *Tasbih 100x selesai! Masya Allah!*`)
    return m.reply(`📿 Tasbih: *${next}*`)
  },

  // ── 32. zakat ──────────────────────────────────────────────
  zakat: async m => {
    const arg = m.command.args?.trim()
    if (!arg) {
      return m.reply([
        '💰 *Kalkulator Zakat*',
        '',
        'Penggunaan:',
        '▪️ `.zakat <jumlah_harta>` — Hitung zakat mal (2,5%)',
        '▪️ `.zakat emas <gram>` — Hitung zakat emas',
        '▪️ `.zakat fitrah` — Info zakat fitrah',
        '',
        `📊 Nisab emas: ${ZAKAT_RATES.gold_nisab} gram`,
        `📊 Nisab perak: ${ZAKAT_RATES.silver_nisab} gram`,
        `📊 Tarif zakat mal: ${ZAKAT_RATES.rate * 100}%`,
      ].join('\n'))
    }
    const lower = arg.toLowerCase()
    if (lower.startsWith('fitrah')) {
      return m.reply([
        '🌾 *Zakat Fitrah*',
        '',
        "Wajib bagi setiap Muslim menjelang Idul Fitri.",
        "Besarnya: 1 sha' (±2,5 kg) makanan pokok atau setara uang.",
        `Perkiraan: Rp 40.000 - Rp 60.000 per jiwa`,
        '',
        "📌 Tujuan: Menyucikan puasa & membantu fakir miskin",
      ].join('\n'))
    }
    if (lower.startsWith('emas')) {
      const gram = parseFloat(arg.split(/\s+/)[1])
      if (isNaN(gram)) return m.reply('❌ Contoh: `.zakat emas 100`')
      if (gram < ZAKAT_RATES.gold_nisab) return m.reply(`❌ Belum mencapai nisab (${ZAKAT_RATES.gold_nisab} gram emas).`)
      const zakat = gram * ZAKAT_RATES.rate
      const value = gram * ZAKAT_RATES.gold_price_per_gram
      const zakatValue = zakat * ZAKAT_RATES.gold_price_per_gram
      return m.reply([
        '💰 *Zakat Emas*',
        '',
        `📊 Emas: ${gram} gram`,
        `💰 Nilai: Rp ${value.toLocaleString('id-ID')}`,
        `📊 Nisab: ${ZAKAT_RATES.gold_nisab} gram ✅`,
        `🕌 Zakat: ${zakat.toFixed(2)} gram (Rp ${zakatValue.toLocaleString('id-ID')})`,
      ].join('\n'))
    }
    const amount = parseFloat(arg.replace(/[^0-9]/g, ''))
    if (isNaN(amount) || amount <= 0) return m.reply('❌ Contoh: `.zakat 1000000`')
    const nisabValue = ZAKAT_RATES.gold_nisab * ZAKAT_RATES.gold_price_per_gram
    const zakatAmount = amount * ZAKAT_RATES.rate
    const isNisab = amount >= nisabValue
    return m.reply([
      '💰 *Kalkulator Zakat Mal*',
      '',
      `📊 Harta: Rp ${amount.toLocaleString('id-ID')}`,
      `📊 Nisab: Rp ${nisabValue.toLocaleString('id-ID')} (${isNisab ? '✅ Terpenuhi' : '❌ Belum terpenuhi'})`,
      `🕌 Zakat (2,5%): Rp ${zakatAmount.toLocaleString('id-ID')}`,
    ].join('\n'))
  },

  // ── 33. hijriah ────────────────────────────────────────────
  hijriah: async m => {
    const arg = m.command.args?.trim()
    let date
    if (arg) {
      date = new Date(arg)
      if (isNaN(date.getTime())) return m.reply('❌ Format tanggal salah. Contoh: `.hijriah 2024-01-15`')
    } else {
      date = new Date()
    }
    const h = gregorianToHijri(date)
    const gregStr = date.toLocaleDateString('id-ID', { weekday:'long', year:'numeric', month:'long', day:'numeric' })
    return m.reply([
      '📅 *Kalender Hijriah*',
      '',
      `📆 Masehi: ${gregStr}`,
      `🌙 Hijriah: ${h.day} ${h.monthName} ${h.year} H`,
    ].join('\n'))
  },

  // ── 34. qibla ─────────────────────────────────────────────
  qibla: async m => {
    const arg = m.command.args?.trim()?.toLowerCase()
    if (!arg) {
      return m.reply([
        '🧭 *Arah Qibla*',
        '',
        'Ketik: `.qibla <kota>`',
        '',
        'Kota tersedia:',
        ...QIBLA_CITIES.map(c => `▪️ ${c.name}`),
      ].join('\n'))
    }
    const city = QIBLA_CITIES.find(c => c.name.toLowerCase().includes(arg))
    if (!city) return m.reply(`❌ Kota "${arg}" tidak ditemukan.\n\n_Ketik .qibla untuk daftar kota_`)
    return m.reply([
      `🧭 *Arah Qibla — ${city.name}*`,
      '',
      `📍 Koordinat: ${city.lat}, ${city.lng}`,
      `🕋 Arah Qibla: ${city.dir}`,
      '',
      '_Arah dari lokasi Anda menuju Ka\'bah_',
    ].join('\n'))
  },

  // ── 35. imsak ─────────────────────────────────────────────
  imsak: async m => {
    const arg = m.command.args?.trim()?.toLowerCase()
    if (!arg) {
      return m.reply([
        '🌅 *Jadwal Imsakiyah*',
        '',
        'Ketik: `.imsak <kota>`',
        '',
        'Kota tersedia:',
        ...IMSAK_CITIES.map(c => `▪️ ${c.name}`),
      ].join('\n'))
    }
    const city = IMSAK_CITIES.find(c => c.name.toLowerCase().includes(arg))
    if (!city) return m.reply(`❌ Kota "${arg}" tidak ditemukan.\n\n_Ketik .imsak untuk daftar kota_`)
    return m.reply([
      `🌅 *Jadwal Imsakiyah — ${city.name}*`,
      '',
      `🌙 Imsak   : ${city.imsak}`,
      `🌄 Subuh   : ${city.subuh}`,
      `🕛 Dzuhur  : ${city.dzuhur}`,
      `🕒 Ashar   : ${city.ashar}`,
      `🌇 Maghrib : ${city.maghrib}`,
      `🌃 Isya    : ${city.isya}`,
      '',
      '_Jadwal perkiraan, bisa berbeda sedikit_',
    ].join('\n'))
  },

  // ── 36. kajian ─────────────────────────────────────────────
  kajian: async m => {
    const arg = m.command.args?.trim()?.toLowerCase()
    if (arg) {
      const k = KAJIAN.find(k => k.topic.toLowerCase().includes(arg) || String(k.no) === arg)
      if (!k) return m.reply(`❌ Topik "${arg}" tidak ditemukan.\n\n_Ketik .kajian untuk daftar_`)
      return m.reply([
        `📚 *Kajian: ${k.topic}*`,
        '',
        k.desc,
      ].join('\n'))
    }
    return m.reply([
      '📚 *Topik Kajian Islam*',
      '',
      ...KAJIAN.map(k => `${String(k.no).padStart(2,' ')}. *${k.topic}*\n   ${k.desc}`).join('\n\n'),
    ].join('\n'))
  },

  // ── 37. mufti ──────────────────────────────────────────────
  mufti: async m => {
    const arg = m.command.args?.trim()?.toLowerCase()
    if (arg) {
      const f = FATWA.find(f => f.topic.toLowerCase().includes(arg) || String(f.no) === arg)
      if (!f) return m.reply(`❌ Fatwa "${arg}" tidak ditemukan.\n\n_Ketik .mufti untuk daftar_`)
      return m.reply([
        `⚖️ *Fatwa: ${f.topic}*`,
        '',
        f.fatwa,
      ].join('\n'))
    }
    return m.reply([
      '⚖️ *Fatwa-Fatwa Umum*',
      '',
      ...FATWA.map(f => `${String(f.no).padStart(2,' ')}. *${f.topic}*\n   ${f.fatwa}`).join('\n\n'),
    ].join('\n'))
  },

  // ── 38. maulid ─────────────────────────────────────────────
  maulid: async m => {
    return m.reply([
      `🎉 *${MAULID.title}*`,
      '',
      `📌 ${MAULID.desc}`,
      '',
      ...MAULID.content.map((c, i) => `${i + 1}. ${c}`),
    ].join('\n'))
  },

  // ── 39. isra ──────────────────────────────────────────────
  isra: async m => {
    return m.reply([
      `✨ *${ISRA.title}*`,
      '',
      `📅 ${ISRA.date}`,
      '',
      ...ISRA.story.map((s, i) => `${i + 1}. ${s}`),
    ].join('\n'))
  },

  // ── 40. nabiakhir ──────────────────────────────────────────
  nabiakhir: async m => {
    const arg = m.command.args?.trim()?.toLowerCase()
    if (arg) {
      const n = NABIAKHIR.find(n => n.sign.toLowerCase().includes(arg) || String(n.no) === arg)
      if (!n) return m.reply(`❌ Tanda "${arg}" tidak ditemukan.\n\n_Ketik .nabiakhir untuk daftar_`)
      return m.reply([
        `🔮 *${n.sign}*`,
        '',
        n.desc,
      ].join('\n'))
    }
    return m.reply([
      '🔮 *Tanda-Tanda Kiamat*',
      '',
      ...NABIAKHIR.map(n => `${String(n.no).padStart(2,' ')}. *${n.sign}*\n   ${n.desc}`).join('\n\n'),
    ].join('\n'))
  },

  // ── 41. syahadat ───────────────────────────────────────────
  syahadat: async m => {
    return m.reply([
      '🕌 *Syahadat*',
      '',
      SYAHADAT.ar,
      '',
      `📝 ${SYAHADAT.latin}`,
      '',
      `📌 ${SYAHADAT.meaning}`,
      '',
      `💡 ${SYAHADAT.desc}`,
    ].join('\n'))
  },

  // ── 42. jumat ──────────────────────────────────────────────
  jumat: async m => {
    return m.reply([
      '🕌 *Sunnah Hari Jumat*',
      '',
      ...JUMAT.map(j => `${j.no}. ${j.tip}`),
    ].join('\n'))
  },

  // ── 43. tahajjud ───────────────────────────────────────────
  tahajjud: async m => {
    return m.reply([
      `🌙 *${TAHAJJUD.title}*`,
      '',
      `📌 ${TAHAJJUD.desc}`,
      '',
      `🕌 Niat:`,
      TAHAJJUD.niat.ar,
      `_${TAHAJJUD.niat.latin}_`,
      `📌 ${TAHAJJUD.niat.meaning}`,
      '',
      `⭐ Keutamaan:`,
      ...TAHAJJUD.virtues.map(v => `▪️ ${v}`),
    ].join('\n'))
  },

  // ── 44. iduladha ────────────────────────────────────────────
  iduladha: async m => {
    return m.reply([
      `🐑 *${IDULADHA.title}*`,
      '',
      `📅 ${IDULADHA.date}`,
      `📌 ${IDULADHA.desc}`,
      '',
      `🕌 Sunnah:`,
      ...IDULADHA.sunnah.map(s => `▪️ ${s}`),
    ].join('\n'))
  },

  // ── 45. dhuha ──────────────────────────────────────────────
  dhuha: async m => {
    return m.reply([
      `☀️ *${DHUHA.title}*`,
      '',
      `📌 ${DHUHA.desc}`,
      `⏰ Waktu: ${DHUHA.time}`,
      '',
      `🕌 Niat:`,
      DHUHA.niat.ar,
      `_${DHUHA.niat.latin}_`,
      `📌 ${DHUHA.niat.meaning}`,
      '',
      `⭐ Keutamaan:`,
      DHUHA.virtue,
    ].join('\n'))
  },

}

// ── Bonus Data ───────────────────────────────────────────────
const SYAHADAT = {
  ar: 'اَشْهَدُ اَنْ لَا اِلٰهَ اِلَّا اللّٰهُ وَاَشْهَدُ اَنَّ مُحَمَّدًا رَسُوْلُ اللّٰهِ',
  latin: 'Asyhadu an la ilaha illallah wa asyhadu anna Muhammadarrasulullah',
  meaning: 'Aku bersaksi bahwa tidak ada Tuhan selain Allah dan aku bersaksi bahwa Muhammad adalah utusan Allah',
  desc: 'Dua kalimat syahadat merupakan rukun Islam pertama dan pintu masuk ke dalam Islam. Diucapkan dengan penuh keyakinan dan pemahaman maknanya.'
}

const JUMAT = [
  {no:1,tip:'Mandi sebelum berangkat shalat Jumat'},
  {no:2,tip:'Memakai pakaian terbaik dan bersih'},
  {no:3,tip:'Memotong kuku dan memotong kumis'},
  {no:4,tip:'Menggunakan minyak wangi (bagi laki-laki)'},
  {no:5,tip:'Berangkat lebih awal ke masjid'},
  {no:6,tip:'Membaca surah Al-Kahf pada malam/siang Jumat'},
  {no:7,tip:'Memperbanyak shalawat kepada Nabi SAW'},
  {no:8,tip:'Mendengarkan khutbah dengan khusyuk, tidak berbicara'},
  {no:9,tip:'Shalat 2 rakaat tahiyyatul masjid sebelum duduk'},
  {no:10,tip:'Berdoa mustajab pada hari Jumat (ada waktu khusus)'},
]

const TAHAJJUD = {
  title: 'Shalat Tahajjud',
  desc: 'Shalat sunnah malam hari yang dikerjakan setelah tidur. Minimal 2 rakaat, maksimal tidak terbatas. Waktu terbaik: sepertiga malam terakhir.',
  niat: {ar:'اُصَلِّيْ لِلّٰهِ سُنَّةَ التَّهَجُّدِ رَكْعَتَيْنِ مُسْتَقْبِلَ الْقِبْلَةِ اَدَاءً لِلّٰهِ تَعَالٰى',latin:"Usholli lillahi sunnatat tahajjudi rak'ataini mustaqbilal qiblati adaa-an lillahi ta'ala",meaning:"Aku niat shalat sunnah tahajjud dua rakaat menghadap qiblat karena Allah Ta'ala"},
  virtues: [
    'Amal yang paling utama setelah shalat wajib (HR. Ahmad)',
    'Allah turun ke langit dunia pada sepertiga malam terakhir',
    'Orang yang rajin tahajjud mendapat kedudukan terpuji (Al-Isra:79)',
    'Ciri orang bertakwa dan berilmu (Az-Zumar:9)',
  ]
}

const IDULADHA = {
  title: 'Idul Adha',
  date: '10 Dzulhijjah',
  desc: 'Hari raya kurban umat Islam. Memperingati kisah pengorbanan Nabi Ibrahim AS yang rela menyembelih putranya Ismail atas perintah Allah.',
  sunnah: [
    'Tidak makan sebelum shalat Id (disunnahkan makan dari daging kurban)',
    'Mandi dan memakai pakaian terbaik',
    'Membaca takbir dari malam 9 Dzulhijjah hingga 13 Dzulhijjah',
    'Shalat Idul Adha berjamaah di lapangan/masjid',
    'Menyembelih hewan kurban (kambing, sapi, unta)',
    'Membagikan daging kurban kepada fakir miskin',
  ]
}

const DHUHA = {
  title: 'Shalat Dhuha',
  desc: 'Shalat sunnah saat matahari naik setinggi tombak hingga waktu Dzuhur. Minimal 2 rakaat, maksimal 12 rakaat (atau 8 rakaat menurut sebagian ulama).',
  time: '±07:00 - 11:30 (saat matahari naik hingga menjelang Dzuhur)',
  niat: {ar:'اُصَلِّيْ لِلّٰهِ سُنَّةَ الضُّحٰى رَكْعَتَيْنِ مُسْتَقْبِلَ الْقِبْلَةِ اَدَاءً لِلّٰهِ تَعَالٰى',latin:"Usholli lillahi sunnatadh dhuha rak'ataini mustaqbilal qiblati adaa-an lillahi ta'ala",meaning:"Aku niat shalat sunnah dhuha dua rakaat menghadap qiblat karena Allah Ta'ala"},
  virtue: 'Dalam hadis disebutkan: "Pada setiap sendi tubuh manusia wajib disedekahi setiap pagi. Setiap tasbih adalah sedekah, setiap tahmid sedekah, setiap tahlil sedekah, setiap takbir sedekah... Dan semua itu diganti dengan shalat 2 rakaat Dhuha." (HR. Muslim)'
}
