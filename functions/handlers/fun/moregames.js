// More Games — 20 fun game commands for diana-bot
// Trivia, Flag Quiz, Capital Quiz, Math Quiz, Word Guess, Riddle,
// Would You Rather, Never Have I Ever, Truth, Dare, This or That,
// Who Would, Scenario, Debate, Hot Take, 20 Questions, Anagram,
// Word Association, Guess Song, Guess Movie

import { hasSession, createSession, getSession, deleteSession, addGameXp } from '../../../lib/game.js'

const GAME_XP = { win: 20, play: 5, lose: 3 }

const pick = arr => arr[Math.floor(Math.random() * arr.length)]
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

// ── HTML entity decoder ──
const decode = s => s
	.replace(/&quot;/g, '"')
	.replace(/&#039;/g, "'")
	.replace(/&amp;/g, '&')
	.replace(/&lt;/g, '<')
	.replace(/&gt;/g, '>')
	.replace(/&nbsp;/g, ' ')

// ── Normalize answer for comparison ──
const norm = s => s.toLowerCase().trim().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ')

// ══════════════════════════════════════════
//  DATA COLLECTIONS
// ══════════════════════════════════════════

// ── Riddles (25+) ──
const RIDDLES = [
	{ q: 'Semakin kamu ambil, semakin aku besar. Siapa aku?', a: 'lubang' },
	{ q: 'Aku punya mata tapi nggak bisa lihat. Siapa aku?', a: 'jarum' },
	{ q: 'Aku punya kunci tapi nggak bisa buka pintu. Siapa aku?', a: 'piano' },
	{ q: 'Aku punya tangan tapi nggak bisa mengusap. Siapa aku?', a: 'jam' },
	{ q: 'Aku punya gigi tapi nggak bisa menggigit. Siapa aku?', a: 'sisir' },
	{ q: 'Aku punya leher tapi nggak punya kepala. Siapa aku?', a: 'botol' },
	{ q: 'Aku bisa terbang tanpa sayap, menangis tanpa mata. Siapa aku?', a: 'awan' },
	{ q: 'Aku selalu ikut kamu, tapi nggak pernah bisa kejar kamu. Siapa aku?', a: 'bayangan' },
	{ q: 'Aku punya kaki tapi nggak bisa jalan. Siapa aku?', a: 'meja' },
	{ q: 'Aku bisa naik tanpa tangga, turun tanpa lift. Siapa aku?', a: 'asap' },
	{ q: 'Aku punya lidah tapi nggak bisa bicara. Siapa aku?', a: 'sepatu' },
	{ q: 'Aku ada di air tapi nggak basah. Siapa aku?', a: 'bayangan' },
	{ q: 'Aku punya wajah tapi nggak punya tangan. Siapa aku?', a: 'koin' },
	{ q: 'Semakin kering, semakin basah. Siapa aku?', a: 'handuk' },
	{ q: 'Aku bisa pecah tanpa disentuh. Siapa aku?', a: 'janji' },
	{ q: 'Aku punya telinga tapi nggak bisa dengar. Siapa aku?', a: 'jagung' },
	{ q: 'Aku selalu datang tapi nggak pernah sampai. Siapa aku?', a: 'besok' },
	{ q: 'Aku bisa mengisi ruangan tapi nggak punya massa. Siapa aku?', a: 'cahaya' },
	{ q: 'Aku punya jari tapi nggak punya tangan. Siapa aku?', a: 'sarung tangan' },
	{ q: 'Aku nggak punya suara tapi bisa menjawab. Siapa aku?', a: 'gema' },
	{ q: 'Aku lahir di laut, mati di dapur. Siapa aku?', a: 'garam' },
	{ q: 'Aku punya banyak kata tapi nggak bisa bicara. Siapa aku?', a: 'buku' },
	{ q: 'Aku bisa berlari tapi nggak bisa jalan. Siapa aku?', a: 'air' },
	{ q: 'Aku punya akar tapi nggak tumbuh. Siapa aku?', a: 'akar matematika' },
	{ q: 'Aku selalu di depanmu tapi nggak bisa dilihat. Siapa aku?', a: 'masa depan' },
	{ q: 'Aku punya mata tapi nggak bisa melihat, punya kaki tapi nggak bisa berjalan. Siapa aku?', a: 'gunung' },
]

// ── Would You Rather ──
const WOULD_YOU = [
	'Lebih pilih makan nasi selama seminggu atau mi selama seminggu?',
	'Lebih pilih bisa terbang atau bisa ngelanjutin?',
	'Lebih pilih jadi miliarder tapi kesepian atau miskin tapi bahagia?',
	'Lebih pilih hidup di masa lalu atau masa depan?',
	'Lebih pilih punya kekuatan super atau kecerdasan super?',
	'Lebih pilih nggak punya internet selama sebulan atau nggak punya AC selama sebulan?',
	'Lebih pilih bisa bicara sama hewan atau bisa ngomong semua bahasa?',
	'Lebih pilih jadi seleb tapi dibenci atau jadi orang biasa tapi dicintai?',
	'Lebih pilih makan pizza selama setahun atau burger selama setahun?',
	'Lebih pilih bisa invisible atau bisa baca pikiran?',
	'Lebih pilih tinggal di pantai atau di gunung?',
	'Lebih pilih jadi koki terkenal atau musisi terkenal?',
	'Lebih pilih nggak pernah tidur atau nggak pernah makan?',
	'Lebih pilih selalu 1 jam terlambat atau 1 jam terlalu awal?',
	'Lebih pilih punya WiFi gratis seumur hidup atau makan gratis seumur hidup?',
	'Lebih pilih bisa teleport atau bisa waktu travel?',
	'Lebih pilih jadi pahlawan atau penjahat?',
	'Lebih pilih hidup 1000 tahun atau hidup 100 tahun tapi bahagia?',
	'Lebih pilih selalu jujur atau selalu berbohong?',
	'Lebih pilih jadi atlit pro atau gamer pro?',
	'Lebih pilih bisa berenang seperti ikan atau terbang seperti burung?',
	'Lebih pilih tinggal sendiri atau dengan 10 teman?',
	'Lebih pilih jadi presiden atau jadi CEO perusahaan besar?',
	'Lebih pilih bisa main semua alat musik atau bisa main semua olahraga?',
	'Lebih pilih selalu hujan atau selalu panas?',
]

// ── Never Have I Ever ──
const NEVER_HAVE = [
	'Tidak pernah ketiduran saat kerja/sekolah',
	'Tidak pernah lupa ulang tahun orang tua',
	'Tidak pernah makan di tengah malam',
	'Tidak pernah nonton film horor sendirian',
	'Tidak pernah mengirim pesan ke orang salah',
	'Tidak pernah pura-pura sakit buat nggak sekolah',
	'Tidak pernah ketipu online',
	'Tidak pernah jadi yang terakhir datang ke pesta',
	'Tidak pernah tertawa saat situasi serius',
	'Tidak pernah buang makanan yang masih bagus',
	'Tidak pernah lupa nama orang yang baru dikenal',
	'Tidak pernah stalking mantan di media sosial',
	'Tidak pernah nangis nonton film',
	'Tidak pernah tertidur di transportasi umum',
	'Tidak pernah mengunci diri di luar rumah',
	'Tidak pernah memasak sesuatu yang gagal total',
	'Tidak pernah mengirim chat ke grup yang salah',
	'Tidak pernah berbohong soal umur',
	'Tidak pernah menghadiri reuni sekolah',
	'Tidak pernah membeli sesuatu yang nggak perlu di midnight sale',
	'Tidak pernah jatuh di depan umum',
	'Tidak pernah lupa di mana parkir mobil/motor',
	'Tidak pernah meminjam uang dan lupa bayar',
	'Tidak pernah menghapus chat penting secara tidak sengaja',
	'Tidak pernah makan makanan yang jatuh (5 detik rule!)',
]

// ── Truth Questions ──
const TRUTHS = [
	'Apa rahasia terbesar yang belum pernah kamu ceritakan ke siapa pun?',
	'Siapa orang yang paling kamu kagumi dan kenapa?',
	'Apa hal paling memalukan yang pernah kamu lakukan?',
	'Kalau kamu bisa ubah satu hal tentang dirimu, apa itu?',
	'Apa ketakutan terbesarmu?',
	'Siapa orang terakhir yang kamu pikirkan sebelum tidur?',
	'Apa kebohongan terakhir yang kamu bilang?',
	'Pernah nggak kamu suka sama teman sendiri? Cerita dong!',
	'Apa mimpi terliarmu yang paling aneh?',
	'Kalau kamu bisa berteman sama satu seleb, siapa?',
	'Apa hal paling childish yang masih kamu lakukan?',
	'Apa hal yang paling kamu sesali?',
	'Siapa orang yang paling sering kamu stalking di sosmed?',
	'Apa skill yang paling kamu bangga?',
	'Kalau kamu bisa waktu travel, ke kapan dan kenapa?',
	'Apa pendapatmu yang paling kontroversial?',
	'Pernah nggak kamu pura-pura suka hadiah dari seseorang?',
	'Apa hal paling kikir yang pernah kamu lakukan?',
	'Siapa orang yang paling bikin kamu jengkel?',
	'Apa hal paling spontan yang pernah kamu lakukan?',
	'Kalau kamu bisa hapus satu memory, mana yang kamu hapus?',
	'Apa yang paling bikin kamu cemburu?',
	'Pernah nggak kamu nolong orang cuma buat pamer?',
	'Apa hal paling konyol yang pernah kamu percaya waktu kecil?',
	'Apa yang akan kamu lakukan kalau nggak ada yang nonton?',
]

// ── Dares ──
const DARES = [
	'Kirim pesan ke orang terakhir di chat kamu: "Aku kangen kamu banget!"',
	'Buat story dengan caption: "Aku lagi jatuh cinta..."',
	'Telepon orang ke-5 di kontak dan bilang "Halo, ini polisi!"',
	'Kirim foto selfie tanpa filter ke grup ini!',
	'Bilang "Aku sayang kalian semua" ke 3 orang secara acak!',
	'Nyanyikan lagu dan kirim voice note-nya!',
	'Tulis status: "Aku baru saja menang game truth or dare!"',
	'Kirim voice note dengan suara bebek!',
	'Kirim pesan ke crush kamu: "Hei, lagi apa?"',
	'Panggil seseorang di grup dengan sebutan "Sayang" selama 5 menit!',
	'Buat pantun 4 baris tentang orang di sebelah kanan kamu!',
	'Kirim foto makanan terakhir yang kamu makan!',
	'Ceritakan lelucon paling ga keren yang kamu tahu!',
	'Kirim pesan ke 3 kontak acak: "Kamu tahu nggak kalau aku alien?"',
	'Imitasi suara guru favorit kamu dan kirim voice note!',
	'Tulis alphabet terbalik dan kirim!',
	'Kirim pesan ke orang tua: "Aku mau nikah!"',
	'Bilang "I love you" dalam 3 bahasa!',
	'Kirim foto view dari kamarmu sekarang!',
	'Do 10 push-up dan ceritakan hasilnya!',
	'Kirim pesan ke nomor 1 di kontak: "Maaf, aku salah kirim. Tapi tetap semangat ya!"',
	'Nyanyikan chorus lagu Indonesia Raya dan kirim voice note!',
	'Tulis kalimat "Aku seekor kucing lucu" 5 kali dengan cepat!',
	'Kirim pesan ke 2 orang acak: "Kamu mau nggak jadi sahabatku?"',
	'Kirim voice note bilang "Bleblebleble" selama 10 detik!',
]

// ── This or That ──
const THIS_OR_THAT = [
	{ a: 'Kopi', b: 'Teh' },
	{ a: 'Pagi', b: 'Malam' },
	{ a: 'Kucing', b: 'Anjing' },
	{ a: 'Netflix', b: 'YouTube' },
	{ a: 'Pizza', b: 'Burger' },
	{ a: 'Pantai', b: 'Gunung' },
	{ a: 'Musik', b: 'Film' },
	{ a: 'Android', b: 'iPhone' },
	{ a: 'Buku', b: 'Film' },
	{ a: 'Musim Panas', b: 'Musim Dingin' },
	{ a: 'Online', b: 'Offline' },
	{ a: 'Manis', b: 'Asin' },
	{ a: 'Makan', b: 'Tidur' },
	{ a: 'Jalan Kaki', b: 'Naik Motor' },
	{ a: 'Karaoke', b: 'Bioskop' },
	{ a: 'Mie Ayam', b: 'Bakso' },
	{ a: 'Nasi Goreng', b: 'Mie Goreng' },
	{ a: 'Es Teh', b: 'Es Jeruk' },
	{ a: 'Jalan-jalan', b: 'Nonton di rumah' },
	{ a: 'TikTok', b: 'Instagram' },
	{ a: 'Sabtu', b: 'Minggu' },
	{ a: 'Gaming', b: 'Baca' },
	{ a: 'Indomie', b: 'Sedap' },
	{ a: 'Jaket', b: 'Hoodie' },
	{ a: 'Foto', b: 'Video' },
]

// ── Who Would ──
const WHO_WOULD = [
	'paling mungkin nangis nonton film drama?',
	'paling mungkin tertawa saat situasi serius?',
	'paling mungkin lupa ulang tahun sendiri?',
	'paling mungkin makan tengah malam?',
	'paling mungkin ketiduran di kelas/meeting?',
	'paling mungkin ngomong sama diri sendiri?',
	'paling mungkin jadi miliarder duluan?',
	'paling mungkin ketinggalan pesawat/kereta?',
	'paling mungkin stalking mantan?',
	'paling mungkin beli sesuatu yang nggak perlu?',
	'paling mungkin bikin lelucon yang ga lucu?',
	'paling mungkin jadi presiden?',
	'paling mungkin menang lomba makan?',
	'paling mungkin nggak balas chat berhari-hari?',
	'paling mungkin bikin drama di sosmed?',
	'paling mungkin jadi influencer?',
	'paling mungkin lupa nama orang baru?',
	'paling mungkin tertawa paling keras di grup?',
	'paling mungkin selamat dari zombie apocalypse?',
	'paling mungkin ngomong "aku sayang kalian" duluan?',
	'paling mungkin kirim meme di tengah malam?',
	'paling mungkin bikin grup chat baru?',
	'paling mungkin pura-pura nggak lihat chat?',
	'paling mungkin jadi yang paling rajin?',
	'paling mungkin kasih hadiah aneh?',
]

// ── Scenarios ──
const SCENARIOS = [
	'Kalau kamu nemu dompet berisi 1 juta di jalan, apa yang kamu lakuin?',
	'Kalau kamu bisa ngobrol sama versi dirimu 10 tahun lalu, apa yang kamu bilang?',
	'Kalau dunia mau kiamat besok, apa yang kamu lakuin hari ini?',
	'Kalau kamu jadi presiden sehari, kebijakan pertama apa yang kamu buat?',
	'Kalau kamu nemu lampu ajaib, 3 permintaanmu apa?',
	'Kalau kamu bisa swap hidup sama seseorang selama sehari, siapa?',
	'Kalau internet mati selama seminggu, apa yang kamu lakuin?',
	'Kalau kamu bisa punya satu skill instan, apa?',
	'Kalau kamu terdampar di pulau sendirian, 3 barang apa yang kamu bawa?',
	'Kalau kamu bisa hapus satu hal dari sejarah, apa?',
	'Kalau alien mendarat dan minta makanan, apa yang kamu kasih?',
	'Kalau kamu bisa ulang satu hari dalam hidupmu, hari mana?',
	'Kalau kamu harus makan satu makanan selamanya, apa?',
	'Kalau kamu bisa teleport ke satu tempat sekarang, ke mana?',
	'Kalau kamu jadi invisible selama sehari, apa yang kamu lakuin?',
	'Kalau kamu bisa baca pikiran selama 1 jam, siapa yang kamu "baca"?',
	'Kalau kamu dikasih 1 miliar tapi nggak boleh belanjakan, apa yang kamu lakuin?',
	'Kalau kamu bisa jadi karakter fiksi, siapa?',
	'Kalau semua orang bisa dengar pikiranmu, apa yang kamu pikirkan pertama?',
	'Kalau kamu bisa berhenti waktu selama 10 menit, apa yang kamu lakuin?',
	'Kalau kamu harus pilih antara nggak pernah nonton film lagi atau nggak pernah denger musik lagi, pilih apa?',
	'Kalau kamu bisa kirim pesan ke semua orang di bumi, apa yang kamu bilang?',
	'Kalau kamu jadi hewan selama sehari, hewan apa?',
	'Kalau kamu bisa travel ke tahun mana saja, ke kapan?',
	'Kalau kamu nemu mesin waktu yang cuma bisa dipakai sekali, ke mana kamu pergi?',
]

// ── Debate Topics ──
const DEBATES = [
	'Apakah AI akan menggantikan semua pekerjaan manusia?',
	'Apakah nasi goreng lebih enak dari mie goreng?',
	'Apakah uang bisa membeli kebahagiaan?',
	'Apakah media sosial lebih banyak dampak negatif atau positif?',
	'Apakah pendidikan formal masih relevan di era digital?',
	'Apakah kucing lebih baik dari anjing sebagai peliharaan?',
	'Apakah remote work lebih produktif dari kantor?',
	'Apakah makanan pedas itu enak atau penyiksaan?',
	'Apakah video game bikin agresif?',
	'Apakah kolaborasi lebih penting dari kompetisi?',
	'Apakah teknologi bikin manusia makin kesepian?',
	'Apakah jadi morning person lebih baik dari night owl?',
	'Apakah pizza dengan nanas itu kejahatan kuliner?',
	'Apakah perlu ada regulasi untuk AI?',
	'Apakah uang tunai akan hilang digantikan digital?',
	'Apakah belajar coding harus mulai dari SD?',
	'Apakah anime lebih baik dari film Hollywood?',
	'Apakah gratisan itu selalu bagus?',
	'Apakah single lebih bahagia dari yang berpasangan?',
	'Apakah manusia butuh pemimpin atau bisa self-govern?',
	'Apakah smartphone merusak kemampuan bersosialisasi?',
	'Apakah kuliah online setara dengan kuliah offline?',
	'Apakah kopi itu obat atau racun?',
	'Apakah Indonesia siap jadi negara maju?',
	'Apakah hobi bisa jadi pekerjaan yang menguntungkan?',
]

// ── Hot Takes ──
const HOT_TAKES = [
	'Nasi goreng kampus lebih enak dari restoran mahal',
	'WhatsApp lebih baik dari Telegram',
	'Mie instan rasa original adalah yang terbaik',
	'Subtitle lebih enak dari dubbing',
	'Pagi hari adalah waktu paling produktif',
	'Kucing lebih setia dari anjing',
	'Kopi hitam lebih enak dari kopi susu',
	'Musik lama lebih baik dari musik sekarang',
	'Film lama lebih kreatif dari film sekarang',
	'Offline shopping lebih memuaskan dari online',
	'Es krim vanilla adalah raja semua es krim',
	'Jalan kaki lebih menyenangkan dari lari',
	'Kamar rapi itu overrated',
	'Baca buku lebih baik dari nonton film',
	'Indomie goreng lebih enak dari Indomie rebus',
	'Tidur siang itu kebutuhan, bukan kemalasan',
	'Gorengan pinggir jalan lebih enak dari restoran',
	'Nonton ulang film favorit itu nggak membosankan',
	'Makan pakai tangan lebih enak dari pakai sendok',
	'Motor lebih praktis dari mobil di Jakarta',
	'Air putih lebih segar dari minuman manis',
	'Nge-gaming bukan pembuang waktu',
	'Ngumpul sama teman lebih asyik dari nge-date',
	'Shower malam lebih enak dari shower pagi',
	'Bahasa Indonesia itu susah tapi indah',
]

// ── Words for Anagram ──
const ANAGRAM_WORDS = [
	'javascript', 'whatsapp', 'telegram', 'indonesia', 'programming',
	'keyboard', 'internet', 'database', 'algorithm', 'computer',
	'mobile', 'android', 'laptop', 'server', 'network',
	'browser', 'python', 'github', 'software', 'hardware',
	'developer', 'terminal', 'digital', 'sistem', 'aplikasi',
	'kucing', 'makanan', 'sekolah', 'belajar', 'bermain',
	'keluarga', 'teman', 'cinta', 'bahagia', 'semangat',
	'kreatif', 'imajinasi', 'petualangan', 'misteri', 'fantasi',
]

// ── Words for Word Guess ──
const WORD_GUESS_WORDS = [
	'javascript', 'whatsapp', 'indonesia', 'programming', 'algorithm',
	'computer', 'keyboard', 'internet', 'database', 'developer',
	'terminal', 'software', 'hardware', 'browser', 'network',
	'kucing', 'makanan', 'sekolah', 'belajar', 'keluarga',
	'petualangan', 'fantasi', 'misteri', 'kreatif', 'semangat',
	'bahagia', 'imajinasi', 'teknologi', 'informasi', 'komunikasi',
	'pendidikan', 'perjalanan', 'persahabatan', 'keberanian', 'kebahagiaan',
]

// ── Guess Song ──
const GUESS_SONGS = [
	{ lyrics: 'Terima kasih my love, kamu datang di hatiku...', answer: 'terima kasih my love', hint: 'Artist: Armada' },
	{ lyrics: 'Bukan dia yang kau cinta, kau cuma ingin dia kembali...', answer: 'bukan dia', hint: 'Artist: Sheila On 7' },
	{ lyrics: 'Malam ini tenang, suara angin bernyanyi...', answer: 'malam ini tenang', hint: 'Lagu anak' },
	{ lyrics: 'Aku mau, aku mau, aku mau hidup yang mewah...', answer: 'aku mau', hint: 'Artist: The Changcuters' },
	{ lyrics: 'Sahabat kecilku, lama sudah tak jumpa...', answer: 'sahabat kecil', hint: 'Artist: Tulus' },
	{ lyrics: 'Dermaga ini, menanti sekelum cerita...', answer: 'dermaga', hint: 'Artist: Payung Teduh' },
	{ lyrics: 'Mungkin kami memang bukan untuk bersama...', answer: 'mungkin', hint: 'Artist: Nadin Amizah' },
	{ lyrics: 'Dan seandainya, aku bisa memilih...', answer: 'seandainya', hint: 'Artist: Viera' },
	{ lyrics: 'Ada apa denganmu, yang selalu begini...', answer: 'ada apa denganmu', hint: 'Artist: Padi' },
	{ lyrics: 'Separuh jiwaku pergi, saat kau pergi...', answer: 'separuh jiwaku', hint: 'Artist: Nidji' },
	{ lyrics: 'Kuingin selalu bersama, dalam suka dan duka...', answer: 'selalu bersama', hint: 'Lagu nostalgia' },
	{ lyrics: 'Aku ini siapa, kamu ini siapa...', answer: 'siapa', hint: 'Artist: Papinka' },
	{ lyrics: 'Hati yang luka, siuman di dunia...', answer: 'hati yang luka', hint: 'Artist: Nike Ardilla' },
	{ lyrics: 'Bunda, pulanglah kau ke rumah...', answer: 'bunda', hint: 'Artist: Lala' },
	{ lyrics: 'Kasihmu sebening embun pagi...', answer: 'kasih', hint: 'Lagu lama' },
	{ lyrics: 'Isabella, aku mencintaimu...', answer: 'isabella', hint: 'Artist: Gigi' },
	{ lyrics: 'Aku tak ingin berpisah, dari dirimu...', answer: 'tak ingin berpisah', hint: 'Artist: Jikustik' },
	{ lyrics: 'Indonesia, tanah airku, tanah tumpah darahku...', answer: 'indonesia raya', hint: 'Lagu kebangsaan' },
	{ lyrics: 'Naik delman, aku naik delman...', answer: 'naik delman', hint: 'Lagu anak' },
	{ lyrics: 'Matahari, permata dunia...', answer: 'matahari', hint: 'Artist: Pamungkas' },
]

// ── Guess Movie ──
const GUESS_MOVIES = [
	{ quote: 'Dengan ini aku menyatakan, bahwa aku tidak suka sama kamu!', answer: 'ada apa dengan cinta', hint: 'Film Indonesia 2002' },
	{ quote: 'Aku mau, kita berdua, di sini, selamanya.', answer: 'pengabdi setan', hint: 'Film horor Indonesia' },
	{ quote: 'May the Force be with you.', answer: 'star wars', hint: 'Franchise sci-fi legendaris' },
	{ quote: 'I am your father.', answer: 'star wars', hint: 'Plot twist paling ikonik' },
	{ quote: 'Just keep swimming.', answer: 'finding nemo', hint: 'Film animasi Pixar' },
	{ quote: 'To infinity and beyond!', answer: 'toy story', hint: 'Film animasi Pixar' },
	{ quote: 'I am Iron Man.', answer: 'iron man', hint: 'MCU Phase 1' },
	{ quote: 'I am inevitable.', answer: 'avengers endgame', hint: 'MCU Phase 3 finale' },
	{ quote: 'Hasta la vista, baby.', answer: 'terminator', hint: 'Film sci-fi action' },
	{ quote: 'Life is like a box of chocolates.', answer: 'forrest gump', hint: 'Film drama klasik' },
	{ quote: 'My precious...', answer: 'lord of the rings', hint: 'Fantasy epic' },
	{ quote: 'Winter is coming.', answer: 'game of thrones', hint: 'Serial HBO' },
	{ quote: 'I see dead people.', answer: 'the sixth sense', hint: 'Film thriller 1999' },
	{ quote: 'E.T. phone home.', answer: 'et', hint: 'Film sci-fi Spielberg' },
	{ quote: 'There is no spoon.', answer: 'the matrix', hint: 'Film sci-fi 1999' },
	{ quote: 'I feel the need... the need for speed!', answer: 'top gun', hint: 'Film action penerbangan' },
	{ quote: 'You talking to me?', answer: 'taxi driver', hint: 'Film klasik De Niro' },
	{ quote: 'Gampang woi, namanya juga anak kost!', answer: 'malam satu suro', hint: 'Film horor Indonesia' },
	{ quote: 'Aku cinta kamu, tapi kamu cinta dia.', answer: 'heart break', hint: 'Film Indonesia romantis' },
	{ quote: 'Wakanda Forever!', answer: 'black panther', hint: 'MCU film solo' },
]

// ── Word Association ──
const WORD_ASSOC = [
	{ word: 'matahari', answers: ['panas', 'terang', 'siang', 'kuning', 'mentari'] },
	{ word: 'laut', answers: ['biru', 'ombak', 'ikan', 'asin', 'pantai'] },
	{ word: 'sekolah', answers: ['belajar', 'guru', 'murid', 'buku', 'kelas'] },
	{ word: 'kopi', answers: ['hitam', 'panas', 'ngopi', 'kafein', 'pagi'] },
	{ word: 'hujan', answers: ['basah', 'awan', 'payung', 'dingin', 'mendung'] },
	{ word: 'kucing', answers: ['meong', 'lucu', 'karnivora', 'peliharaan', 'whiskas'] },
	{ word: 'makan', answers: ['lapar', 'nasi', 'perut', 'enak', 'restoran'] },
	{ word: 'tidur', answers: ['mimpi', 'bantal', 'kasur', 'ngantuk', 'malam'] },
	{ word: 'musik', answers: ['lagu', 'dengar', 'nyanyi', 'gitar', 'radio'] },
	{ word: 'buku', answers: ['baca', 'halaman', 'perpustakaan', 'penulis', 'cerita'] },
	{ word: 'telepon', answers: ['panggil', 'chat', 'hp', 'nomor', 'hubungi'] },
	{ word: 'gunung', answers: ['tinggi', 'naik', 'dingin', 'puncak', 'pendaki'] },
	{ word: 'cinta', answers: ['sayang', 'hati', 'kasih', 'pacar', 'romantis'] },
	{ word: 'uang', answers: ['belanja', 'kaya', 'dompet', 'gaji', 'tabungan'] },
	{ word: 'rumah', answers: ['tinggal', 'keluarga', 'kamar', 'pintu', 'atap'] },
	{ word: 'mobil', answers: ['jalan', 'bensin', 'kemudi', 'roda', 'parkir'] },
	{ word: 'komputer', answers: ['laptop', 'coding', 'monitor', 'keyboard', 'mouse'] },
	{ word: 'waktu', answers: ['jam', 'detik', 'menit', 'lebih', 'cepat'] },
	{ word: 'teman', answers: ['sahabat', 'dekat', 'bermain', 'curhat', 'kumpul'] },
	{ word: 'mimpi', answers: ['tidur', 'harapan', 'cita', 'angan', 'malam'] },
]

// ── 20 Questions categories ──
const TWENTY_Q_CATEGORIES = [
	{ category: 'Hewan', examples: 'kucing, gajah, elang, ikan' },
	{ category: 'Makanan', examples: 'nasi goreng, bakso, pizza' },
	{ category: 'Benda', examples: 'ponsel, buku, kursi' },
	{ category: 'Tempat', examples: 'sekolah, pantai, rumah sakit' },
	{ category: 'Profesi', examples: 'dokter, guru, pilot' },
	{ category: 'Kendaraan', examples: 'mobil, pesawat, kereta' },
	{ category: 'Tumbuhan', examples: 'mangga, mawar, padi' },
	{ category: 'Film', examples: 'Avengers, Dilan, KKN' },
]


// ══════════════════════════════════════════
//  GAME COMMANDS
// ══════════════════════════════════════════

export const commands = {

	// ── 1. Trivia (Open Trivia DB) ──
	trivia: async m => {
		const { reply, chat, sender, command } = m
		if (hasSession(chat)) { await reply('⏳ Masih ada game berjalan. Selesaikan dulu!'); return }
		await reply('❓ Mengambil trivia...')
		try {
			const cat = command.args[0]?.toLowerCase() || ''
			const catMap = { general: 9, books: 10, film: 11, music: 12, tv: 14, games: 15, science: 17, geography: 22, history: 23, sports: 21 }
			const catId = catMap[cat] || ''
			const url = catId
				? `https://opentdb.com/api.php?amount=1&type=multiple&category=${catId}`
				: 'https://opentdb.com/api.php?amount=1&type=multiple'
			const res = await fetch(url)
			const data = await res.json()
			const q = data.results?.[0]
			if (!q) { await reply('❌ Trivia tidak tersedia.'); return }

			const answers = [q.correct_answer, ...q.incorrect_answers].sort(() => Math.random() - 0.5)
			const correctIdx = answers.indexOf(q.correct_answer)
			const options = answers.map((a, i) => `${String.fromCharCode(65 + i)}. ${decode(a)}`).join('\n')

			await reply([
				'🧠 *Trivia*',
				'',
				decode(q.question),
				'',
				options,
				'',
				'Ketik A/B/C/D untuk jawab!',
				'⏰ Waktu 30 detik'
			].join('\n'))
			createSession(chat, {
				type: 'moregames-trivia',
				answer: String.fromCharCode(65 + correctIdx).toLowerCase(),
				correctText: decode(q.correct_answer),
				sender
			})
			if (m.gameSession) {
				m.gameSession.set(chat, { type: 'trivia', answer: String.fromCharCode(65 + correctIdx).toLowerCase(), sender, timeout: 30000 })
			}
		} catch (e) {
			await reply(`❌ Gagal mengambil trivia: ${e.message || e}`)
		}
	},

	// ── 2. Flag Quiz (REST Countries API) ──
	flagquiz: async m => {
		const { reply, chat, sender } = m
		if (hasSession(chat)) { await reply('⏳ Masih ada game berjalan. Selesaikan dulu!'); return }
		await reply('🏁 Mengambil bendera...')
		try {
			const res = await fetch('https://restcountries.com/v3.1/all')
			const countries = await res.json()
			const country = pick(countries)
			const flag = country.flag || country.cca2?.replace(/./g, c => String.fromCodePoint(127397 + c.charCodeAt())) || '🏳️'
			const name = country.name?.common || country.name?.official || 'Unknown'

			await reply([
				'🏁 *Tebak Bendera*',
				'',
				`Bendera: ${flag}`,
				`Region: ${country.region || '-'}`,
				`Ibukota: ${country.capital?.[0] ? '???' : 'N/A'}`,
				'',
				'Tebak nama negara ini!',
				'⏰ Waktu 30 detik'
			].join('\n'))
			createSession(chat, {
				type: 'moregames-flagquiz',
				answer: norm(name),
				displayAnswer: name,
				sender
			})
			if (m.gameSession) {
				m.gameSession.set(chat, { type: 'flagquiz', answer: norm(name), sender, timeout: 30000 })
			}
		} catch (e) {
			await reply(`❌ Gagal mengambil data bendera: ${e.message || e}`)
		}
	},

	flag: async m => await commands.flagquiz(m),

	// ── 3. Capital Quiz (REST Countries API) ──
	capquiz: async m => {
		const { reply, chat, sender } = m
		if (hasSession(chat)) { await reply('⏳ Masih ada game berjalan. Selesaikan dulu!'); return }
		await reply('🏙️ Mengambil data negara...')
		try {
			const res = await fetch('https://restcountries.com/v3.1/all')
			const countries = await res.json()
			const withCapital = countries.filter(c => c.capital?.[0])
			const country = pick(withCapital)
			const capital = country.capital[0]
			const name = country.name?.common || 'Unknown'

			await reply([
				'🏙️ *Tebak Ibukota*',
				'',
				`Negara: ${name}`,
				`Region: ${country.region || '-'}`,
				`Bendera: ${country.flag || '🏳️'}`,
				'',
				'Apa ibukota negara ini?',
				'⏰ Waktu 30 detik'
			].join('\n'))
			createSession(chat, {
				type: 'moregames-capquiz',
				answer: norm(capital),
				displayAnswer: capital,
				sender
			})
			if (m.gameSession) {
				m.gameSession.set(chat, { type: 'capquiz', answer: norm(capital), sender, timeout: 30000 })
			}
		} catch (e) {
			await reply(`❌ Gagal mengambil data negara: ${e.message || e}`)
		}
	},

	capital: async m => await commands.capquiz(m),

	// ── 4. Math Quiz ──
	mathquiz: async m => {
		const { reply, chat, sender, command } = m
		if (hasSession(chat)) { await reply('⏳ Masih ada game berjalan. Selesaikan dulu!'); return }
		const diff = Number(command.args[0]) || 1
		const level = Math.min(Math.max(diff, 1), 5)
		const ops = ['+', '-']
		if (level >= 2) ops.push('×')
		if (level >= 3) ops.push('÷')
		if (level >= 4) ops.push('^')
		const op = pick(ops)
		let a, b, answer, question
		const max = 10 + level * 15
		switch (op) {
			case '+':
				a = randInt(1, max); b = randInt(1, max); answer = a + b
				question = `${a} + ${b}`; break
			case '-':
				a = randInt(1, max); b = randInt(1, a); answer = a - b
				question = `${a} - ${b}`; break
			case '×':
				a = randInt(1, Math.floor(max / 2)); b = randInt(1, Math.floor(max / 2)); answer = a * b
				question = `${a} × ${b}`; break
			case '÷':
				b = randInt(1, 12); answer = randInt(1, 12); a = b * answer
				question = `${a} ÷ ${b}`; break
			case '^':
				a = randInt(2, 15); b = 2; answer = a * a
				question = `${a}²`; break
		}
		await reply([
			'🔢 *Math Quiz*',
			'',
			`Level: ${level}/5`,
			`Hitung: ${question} = ?`,
			'',
			'Ketik jawaban angkamu!',
			'⏰ Waktu 30 detik'
		].join('\n'))
		createSession(chat, {
			type: 'moregames-mathquiz',
			answer: String(answer),
			displayAnswer: String(answer),
			sender
		})
		if (m.gameSession) {
			m.gameSession.set(chat, { type: 'mathquiz', answer: String(answer), sender, timeout: 30000 })
		}
	},

	mq: async m => await commands.mathquiz(m),

	// ── 5. Word Guess ──
	wordguess: async m => {
		const { reply, chat, sender } = m
		if (hasSession(chat)) { await reply('⏳ Masih ada game berjalan. Selesaikan dulu!'); return }
		const word = pick(WORD_GUESS_WORDS)
		const guessed = new Set()
		const masked = () => word.split('').map(c => guessed.has(c) ? c : '_ ').join('')
		await reply([
			'📝 *Tebak Kata*',
			'',
			`Kata: ${masked()}`,
			`Panjang: ${word.length} huruf`,
			'',
			'Ketik satu huruf untuk menebak!',
			'Atau ketik kata lengkap jika sudah tahu!',
			'⏰ Waktu 60 detik'
		].join('\n'))
		createSession(chat, {
			type: 'moregames-wordguess',
			word,
			guessed,
			wrong: 0,
			maxWrong: 8,
			sender
		}, 60000)
		if (m.gameSession) {
			m.gameSession.set(chat, { type: 'wordguess', answer: word, sender, timeout: 60000 })
		}
	},

	wg: async m => await commands.wordguess(m),

	// ── 6. Riddle ──
	riddle: async m => {
		const { reply, chat, sender } = m
		if (hasSession(chat)) { await reply('⏳ Masih ada game berjalan. Selesaikan dulu!'); return }
		const r = pick(RIDDLES)
		await reply([
			'🤔 *Teka-Teki*',
			'',
			r.q,
			'',
			'Ketik jawabanmu!',
			'⏰ Waktu 30 detik'
		].join('\n'))
		createSession(chat, {
			type: 'moregames-riddle',
			answer: norm(r.a),
			displayAnswer: r.a,
			sender
		})
		if (m.gameSession) {
			m.gameSession.set(chat, { type: 'riddle', answer: norm(r.a), sender, timeout: 30000 })
		}
	},

	tekateki: async m => await commands.riddle(m),

	// ── 7. Would You Rather ──
	wouldyou: async m => {
		const { reply, chat, sender, db } = m
		const question = pick(WOULD_YOU)
		const user = db.getUser(sender)
		addGameXp(user, GAME_XP.play)
		await db.save()
		await reply([
			'🤷 *Would You Rather*',
			'',
			question,
			'',
			'Ketik pilihanmu dan alasan!',
			`🎁 +${GAME_XP.play} XP`
		].join('\n'))
	},

	wyr: async m => await commands.wouldyou(m),

	// ── 8. Never Have I Ever ──
	neverhave: async m => {
		const { reply, chat, sender, db } = m
		const prompt = pick(NEVER_HAVE)
		const user = db.getUser(sender)
		addGameXp(user, GAME_XP.play)
		await db.save()
		await reply([
			'🤚 *Never Have I Ever*',
			'',
			prompt,
			'',
			'Pernah atau nggak? Ketik jawabanmu!',
			`🎁 +${GAME_XP.play} XP`
		].join('\n'))
	},

	nhie: async m => await commands.neverhave(m),

	// ── 9. Truth ──
	truth: async m => {
		const { reply, chat, sender, db } = m
		const question = pick(TRUTHS)
		const user = db.getUser(sender)
		addGameXp(user, GAME_XP.play)
		await db.save()
		await reply([
			'🫣 *Truth*',
			'',
			question,
			'',
			'Jawab dengan jujur ya!',
			`🎁 +${GAME_XP.play} XP`
		].join('\n'))
	},

	// ── 10. Dare ──
	dare: async m => {
		const { reply, chat, sender, db } = m
		const challenge = pick(DARES)
		const user = db.getUser(sender)
		addGameXp(user, GAME_XP.play)
		await db.save()
		await reply([
			'😈 *Dare*',
			'',
			challenge,
			'',
			'Lakukan tantangannya!',
			`🎁 +${GAME_XP.play} XP`
		].join('\n'))
	},

	// ── 11. This or That ──
	thisorthat: async m => {
		const { reply, chat, sender, db } = m
		const { a, b } = pick(THIS_OR_THAT)
		const user = db.getUser(sender)
		addGameXp(user, GAME_XP.play)
		await db.save()
		await reply([
			'⚖️ *This or That*',
			'',
			`${a}  🆚  ${b}`,
			'',
			'Pilih salah satu dan kasih alasan!',
			`🎁 +${GAME_XP.play} XP`
		].join('\n'))
	},

	tot: async m => await commands.thisorthat(m),

	// ── 12. Who Would ──
	whowould: async m => {
		const { reply, chat, sender, db, command } = m
		const scenario = pick(WHO_WOULD)
		const target = command.text || 'di grup ini'
		const user = db.getUser(sender)
		addGameXp(user, GAME_XP.play)
		await db.save()
		await reply([
			'🫵 *Who Would*',
			'',
			`Siapa ${target} yang paling mungkin ${scenario}`,
			'',
			'Sebutkan nama dan kenapa!',
			`🎁 +${GAME_XP.play} XP`
		].join('\n'))
	},

	ww: async m => await commands.whowould(m),

	// ── 13. Scenario ──
	scenario: async m => {
		const { reply, chat, sender, db } = m
		const scene = pick(SCENARIOS)
		const user = db.getUser(sender)
		addGameXp(user, GAME_XP.play)
		await db.save()
		await reply([
			'🎬 *What Would You Do?*',
			'',
			scene,
			'',
			'Apa yang akan kamu lakukan?',
			`🎁 +${GAME_XP.play} XP`
		].join('\n'))
	},

	wwyd: async m => await commands.scenario(m),

	// ── 14. Debate ──
	debate: async m => {
		const { reply, chat, sender, db } = m
		const topic = pick(DEBATES)
		const user = db.getUser(sender)
		addGameXp(user, GAME_XP.play)
		await db.save()
		await reply([
			'🗣️ *Debat!*',
			'',
			topic,
			'',
			'Kasih pendapatmu! Pro atau kontra?',
			`🎁 +${GAME_XP.play} XP`
		].join('\n'))
	},

	// ── 15. Hot Take ──
	hotake: async m => {
		const { reply, chat, sender, db } = m
		const opinion = pick(HOT_TAKES)
		const user = db.getUser(sender)
		addGameXp(user, GAME_XP.play)
		await db.save()
		await reply([
			'🔥 *Hot Take*',
			'',
			`"${opinion}"`,
			'',
			'Setuju atau nggak? Debattt! 🔥',
			`🎁 +${GAME_XP.play} XP`
		].join('\n'))
	},

	hottake: async m => await commands.hotake(m),

	// ── 16. 20 Questions ──
	'20questions': async m => {
		const { reply, chat, sender } = m
		if (hasSession(chat)) { await reply('⏳ Masih ada game berjalan. Selesaikan dulu!'); return }
		const cat = pick(TWENTY_Q_CATEGORIES)
		await reply([
			'❓ *20 Questions*',
			'',
			'Pikirkan sesuatu, dan aku akan coba tebak!',
			`Kategori: ${cat.category} (contoh: ${cat.examples})`,
			'',
			'Ketik *ya*, *tidak*, *mungkin*, atau *tidak tahu* untuk setiap pertanyaanku.',
			'Kamu punya 20 pertanyaan sebelum aku menebak!',
			'',
			'Pertanyaan #1: Apa benda itu hidup?',
			'⏰ Waktu 2 menit'
		].join('\n'))
		createSession(chat, {
			type: 'moregames-20questions',
			category: cat.category,
			questions: ['Apa benda itu hidup?'],
			answers: [],
			questionNum: 1,
			maxQuestions: 20,
			sender
		}, 120000)
		if (m.gameSession) {
			m.gameSession.set(chat, { type: '20questions', sender, timeout: 120000 })
		}
	},

	twentyq: async m => await commands['20questions'](m),

	// ── 17. Anagram ──
	anagram: async m => {
		const { reply, chat, sender } = m
		if (hasSession(chat)) { await reply('⏳ Masih ada game berjalan. Selesaikan dulu!'); return }
		const word = pick(ANAGRAM_WORDS)
		const scrambled = word.split('').sort(() => Math.random() - 0.5).join('')
		// Make sure it's actually scrambled
		const finalScrambled = scrambled === word ? word.split('').reverse().join('') : scrambled
		await reply([
			'🔀 *Anagram*',
			'',
			`Susun huruf ini jadi kata: *${finalScrambled}*`,
			`Panjang kata: ${word.length} huruf`,
			'',
			'Ketik jawabanmu!',
			'⏰ Waktu 30 detik'
		].join('\n'))
		createSession(chat, {
			type: 'moregames-anagram',
			answer: norm(word),
			displayAnswer: word,
			sender
		})
		if (m.gameSession) {
			m.gameSession.set(chat, { type: 'anagram', answer: norm(word), sender, timeout: 30000 })
		}
	},

	// ── 18. Word Association ──
	wordassoc: async m => {
		const { reply, chat, sender } = m
		if (hasSession(chat)) { await reply('⏳ Masih ada game berjalan. Selesaikan dulu!'); return }
		const item = pick(WORD_ASSOC)
		await reply([
			'🔗 *Word Association*',
			'',
			`Kata: *${item.word}*`,
			'',
			'Ketik kata pertama yang kebayang!',
			'⏰ Waktu 15 detik'
		].join('\n'))
		createSession(chat, {
			type: 'moregames-wordassoc',
			answer: item.answers,
			word: item.word,
			sender
		}, 15000)
		if (m.gameSession) {
			m.gameSession.set(chat, { type: 'wordassoc', answer: item.answers, sender, timeout: 15000 })
		}
	},

	wa: async m => await commands.wordassoc(m),

	// ── 19. Guess Song ──
	guesssong: async m => {
		const { reply, chat, sender } = m
		if (hasSession(chat)) { await reply('⏳ Masih ada game berjalan. Selesaikan dulu!'); return }
		const song = pick(GUESS_SONGS)
		await reply([
			'🎵 *Tebak Lagu*',
			'',
			`Lirik: "${song.lyrics}"`,
			`Hint: ${song.hint}`,
			'',
			'Tebak judul lagunya!',
			'⏰ Waktu 30 detik'
		].join('\n'))
		createSession(chat, {
			type: 'moregames-guesssong',
			answer: norm(song.answer),
			displayAnswer: song.answer,
			sender
		})
		if (m.gameSession) {
			m.gameSession.set(chat, { type: 'guesssong', answer: norm(song.answer), sender, timeout: 30000 })
		}
	},

	tebaklagu: async m => await commands.guesssong(m),

	// ── 20. Guess Movie ──
	guessmovie: async m => {
		const { reply, chat, sender } = m
		if (hasSession(chat)) { await reply('⏳ Masih ada game berjalan. Selesaikan dulu!'); return }
		const movie = pick(GUESS_MOVIES)
		await reply([
			'🎬 *Tebak Film*',
			'',
			`Quote: "${movie.quote}"`,
			`Hint: ${movie.hint}`,
			'',
			'Tebak judul filmnya!',
			'⏰ Waktu 30 detik'
		].join('\n'))
		createSession(chat, {
			type: 'moregames-guessmovie',
			answer: norm(movie.answer),
			displayAnswer: movie.answer,
			sender
		})
		if (m.gameSession) {
			m.gameSession.set(chat, { type: 'guessmovie', answer: norm(movie.answer), sender, timeout: 30000 })
		}
	},

	tebakfilm: async m => await commands.guessmovie(m),


	// ══════════════════════════════════════════
	//  ANSWER CHECKER — called from handler.js
	// ══════════════════════════════════════════
	_checkMoreGames: async m => {
		const { jid, chat, sender, db, text } = m
		const session = getSession(chat || jid)
		if (!session || session.sender !== sender) return false
		const guess = text.toLowerCase().trim()

		// ── Trivia answer ──
		if (session.type === 'moregames-trivia') {
			if (!['a', 'b', 'c', 'd'].includes(guess)) return false
			deleteSession(chat || jid)
			const user = db.getUser(sender)
			if (guess === session.answer) {
				const xpResult = addGameXp(user, GAME_XP.win)
				await db.save()
				const lines = [
					`✅ Benar! Jawaban: ${session.answer.toUpperCase()}. ${session.correctText}`,
					`🎁 +${GAME_XP.win} XP`
				]
				if (xpResult.leveledUp) lines.push('', `🏆 *Level Up!* Level ${xpResult.level}`)
				await m.reply(lines.join('\n'))
			} else {
				const xpResult = addGameXp(user, GAME_XP.lose)
				await db.save()
				await m.reply([
					`❌ Salah! Jawaban: ${session.answer.toUpperCase()}. ${session.correctText}`,
					`🎁 +${GAME_XP.lose} XP`
				].join('\n'))
			}
			return true
		}

		// ── Flag Quiz answer ──
		if (session.type === 'moregames-flagquiz') {
			if (guess.length < 2) return false
			deleteSession(chat || jid)
			const user = db.getUser(sender)
			if (norm(guess) === session.answer || norm(guess).includes(session.answer) || session.answer.includes(norm(guess))) {
				const xpResult = addGameXp(user, GAME_XP.win)
				await db.save()
				const lines = [
					`✅ Benar! Negaranya: ${session.displayAnswer}`,
					`🎁 +${GAME_XP.win} XP`
				]
				if (xpResult.leveledUp) lines.push('', `🏆 *Level Up!* Level ${xpResult.level}`)
				await m.reply(lines.join('\n'))
			} else {
				const xpResult = addGameXp(user, GAME_XP.lose)
				await db.save()
				await m.reply([
					`❌ Salah! Negaranya: ${session.displayAnswer}`,
					`🎁 +${GAME_XP.lose} XP`
				].join('\n'))
			}
			return true
		}

		// ── Capital Quiz answer ──
		if (session.type === 'moregames-capquiz') {
			if (guess.length < 2) return false
			deleteSession(chat || jid)
			const user = db.getUser(sender)
			if (norm(guess) === session.answer || norm(guess).includes(session.answer) || session.answer.includes(norm(guess))) {
				const xpResult = addGameXp(user, GAME_XP.win)
				await db.save()
				const lines = [
					`✅ Benar! Ibukotanya: ${session.displayAnswer}`,
					`🎁 +${GAME_XP.win} XP`
				]
				if (xpResult.leveledUp) lines.push('', `🏆 *Level Up!* Level ${xpResult.level}`)
				await m.reply(lines.join('\n'))
			} else {
				const xpResult = addGameXp(user, GAME_XP.lose)
				await db.save()
				await m.reply([
					`❌ Salah! Ibukotanya: ${session.displayAnswer}`,
					`🎁 +${GAME_XP.lose} XP`
				].join('\n'))
			}
			return true
		}

		// ── Math Quiz answer ──
		if (session.type === 'moregames-mathquiz') {
			if (!/^\d+$/.test(guess.replace(/-/g, ''))) return false
			deleteSession(chat || jid)
			const user = db.getUser(sender)
			if (guess === session.answer) {
				const xpResult = addGameXp(user, GAME_XP.win)
				await db.save()
				const lines = [
					`✅ Benar! Jawaban: ${session.displayAnswer}`,
					`🎁 +${GAME_XP.win} XP`
				]
				if (xpResult.leveledUp) lines.push('', `🏆 *Level Up!* Level ${xpResult.level}`)
				await m.reply(lines.join('\n'))
			} else {
				const xpResult = addGameXp(user, GAME_XP.lose)
				await db.save()
				await m.reply([
					`❌ Salah! Jawaban: ${session.displayAnswer}`,
					`🎁 +${GAME_XP.lose} XP`
				].join('\n'))
			}
			return true
		}

		// ── Word Guess answer ──
		if (session.type === 'moregames-wordguess') {
			const letter = guess.toLowerCase().trim()

			// Full word guess
			if (letter.length > 1) {
				deleteSession(chat || jid)
				const user = db.getUser(sender)
				if (norm(letter) === norm(session.word)) {
					const xpResult = addGameXp(user, GAME_XP.win)
					await db.save()
					const lines = [
						`✅ Benar! Katanya: ${session.word}`,
						`🎁 +${GAME_XP.win} XP`
					]
					if (xpResult.leveledUp) lines.push('', `🏆 *Level Up!* Level ${xpResult.level}`)
					await m.reply(lines.join('\n'))
				} else {
					const xpResult = addGameXp(user, GAME_XP.lose)
					await db.save()
					await m.reply([
						`❌ Salah! Katanya: ${session.word}`,
						`🎁 +${GAME_XP.lose} XP`
					].join('\n'))
				}
				return true
			}

			// Single letter guess
			if (letter.length !== 1 || !/[a-z]/.test(letter)) return false

			if (session.word.includes(letter)) {
				session.guessed.add(letter)
			} else {
				session.wrong++
			}

			const masked = session.word.split('').map(c => session.guessed.has(c) ? c : '_ ').join('')
			const won = !masked.includes('_')
			const dead = session.wrong >= session.maxWrong

			if (won || dead) {
				deleteSession(chat || jid)
				const user = db.getUser(sender)
				if (won) {
					const xpResult = addGameXp(user, GAME_XP.win)
					await db.save()
					await m.reply([
						`✅ *Kamu menang!* 🎉`,
						`Kata: *${session.word}*`,
						`🎁 +${GAME_XP.win} XP`
					].join('\n'))
				} else {
					const xpResult = addGameXp(user, GAME_XP.lose)
					await db.save()
					await m.reply([
						`💀 *Kamu kalah!* Salah ${session.wrong}/${session.maxWrong}`,
						`Kata: *${session.word}*`,
						`🎁 +${GAME_XP.lose} XP`
					].join('\n'))
				}
				return true
			}

			await m.reply([
				`📝 *Tebak Kata*`,
				'',
				`Kata: ${masked}`,
				`Salah: ${session.wrong}/${session.maxWrong}`,
				`Tebakan: ${[...session.guessed].join(', ') || '-'}`,
				'',
				'Ketik satu huruf lagi atau kata lengkap!'
			].join('\n'))
			return true
		}

		// ── Riddle answer ──
		if (session.type === 'moregames-riddle') {
			if (guess.length < 2) return false
			deleteSession(chat || jid)
			const user = db.getUser(sender)
			if (norm(guess) === session.answer || norm(guess).includes(session.answer) || session.answer.includes(norm(guess))) {
				const xpResult = addGameXp(user, GAME_XP.win)
				await db.save()
				const lines = [
					`✅ Benar! Jawaban: ${session.displayAnswer}`,
					`🎁 +${GAME_XP.win} XP`
				]
				if (xpResult.leveledUp) lines.push('', `🏆 *Level Up!* Level ${xpResult.level}`)
				await m.reply(lines.join('\n'))
			} else {
				const xpResult = addGameXp(user, GAME_XP.lose)
				await db.save()
				await m.reply([
					`❌ Salah! Jawaban: ${session.displayAnswer}`,
					`🎁 +${GAME_XP.lose} XP`
				].join('\n'))
			}
			return true
		}

		// ── Anagram answer ──
		if (session.type === 'moregames-anagram') {
			if (guess.length < 2) return false
			deleteSession(chat || jid)
			const user = db.getUser(sender)
			if (norm(guess) === session.answer) {
				const xpResult = addGameXp(user, GAME_XP.win)
				await db.save()
				const lines = [
					`✅ Benar! Katanya: ${session.displayAnswer}`,
					`🎁 +${GAME_XP.win} XP`
				]
				if (xpResult.leveledUp) lines.push('', `🏆 *Level Up!* Level ${xpResult.level}`)
				await m.reply(lines.join('\n'))
			} else {
				const xpResult = addGameXp(user, GAME_XP.lose)
				await db.save()
				await m.reply([
					`❌ Salah! Katanya: ${session.displayAnswer}`,
					`🎁 +${GAME_XP.lose} XP`
				].join('\n'))
			}
			return true
		}

		// ── Guess Song answer ──
		if (session.type === 'moregames-guesssong') {
			if (guess.length < 2) return false
			deleteSession(chat || jid)
			const user = db.getUser(sender)
			if (norm(guess) === session.answer || norm(guess).includes(session.answer) || session.answer.includes(norm(guess))) {
				const xpResult = addGameXp(user, GAME_XP.win)
				await db.save()
				const lines = [
					`✅ Benar! Lagu: ${session.displayAnswer}`,
					`🎁 +${GAME_XP.win} XP`
				]
				if (xpResult.leveledUp) lines.push('', `🏆 *Level Up!* Level ${xpResult.level}`)
				await m.reply(lines.join('\n'))
			} else {
				const xpResult = addGameXp(user, GAME_XP.lose)
				await db.save()
				await m.reply([
					`❌ Salah! Lagu: ${session.displayAnswer}`,
					`🎁 +${GAME_XP.lose} XP`
				].join('\n'))
			}
			return true
		}

		// ── Guess Movie answer ──
		if (session.type === 'moregames-guessmovie') {
			if (guess.length < 2) return false
			deleteSession(chat || jid)
			const user = db.getUser(sender)
			if (norm(guess) === session.answer || norm(guess).includes(session.answer) || session.answer.includes(norm(guess))) {
				const xpResult = addGameXp(user, GAME_XP.win)
				await db.save()
				const lines = [
					`✅ Benar! Film: ${session.displayAnswer}`,
					`🎁 +${GAME_XP.win} XP`
				]
				if (xpResult.leveledUp) lines.push('', `🏆 *Level Up!* Level ${xpResult.level}`)
				await m.reply(lines.join('\n'))
			} else {
				const xpResult = addGameXp(user, GAME_XP.lose)
				await db.save()
				await m.reply([
					`❌ Salah! Film: ${session.displayAnswer}`,
					`🎁 +${GAME_XP.lose} XP`
				].join('\n'))
			}
			return true
		}

		// ── Word Association answer ──
		if (session.type === 'moregames-wordassoc') {
			if (guess.length < 1) return false
			deleteSession(chat || jid)
			const user = db.getUser(sender)
			const normalizedGuess = norm(guess)
			const isMatch = session.answer.some(a => norm(a) === normalizedGuess || norm(a).includes(normalizedGuess) || normalizedGuess.includes(norm(a)))
			if (isMatch) {
				const xpResult = addGameXp(user, GAME_XP.win)
				await db.save()
				const lines = [
					`✅ Keren! "${guess}" memang terkait dengan "${session.word}"!`,
					`Jawaban lain: ${session.answer.join(', ')}`,
					`🎁 +${GAME_XP.win} XP`
				]
				if (xpResult.leveledUp) lines.push('', `🏆 *Level Up!* Level ${xpResult.level}`)
				await m.reply(lines.join('\n'))
			} else {
				const xpResult = addGameXp(user, GAME_XP.play)
				await db.save()
				await m.reply([
					`🤔 Menarik! "${guess}" juga bisa jadi!`,
					`Jawaban umum: ${session.answer.join(', ')}`,
					`🎁 +${GAME_XP.play} XP`
				].join('\n'))
			}
			return true
		}

		// ── 20 Questions answer ──
		if (session.type === 'moregames-20questions') {
			const validAnswers = ['ya', 'yes', 'tidak', 'no', 'enggak', 'nggak', 'mungkin', 'maybe', 'tidak tahu', 'nggak tahu', 'ga tahu', 'gatau', 'nggak tau', 'ga tau']
			if (!validAnswers.some(va => guess === va || guess.includes(va))) return false

			const isYes = ['ya', 'yes', 'yep', 'yup', 'iya', 'betul', 'benar'].some(w => guess.includes(w))
			const isNo = ['tidak', 'no', 'nope', 'nggak', 'enggak', 'bukan', 'ga', 'gak'].some(w => guess.includes(w))
			const isMaybe = ['mungkin', 'maybe', 'kadang', 'sometimes'].some(w => guess.includes(w))
			const isDunno = ['tidak tahu', 'nggak tahu', 'ga tahu', 'gatau', 'nggak tau', 'ga tau', 'dunno'].some(w => guess.includes(w))

			session.answers.push({ q: session.questions[session.questions.length - 1], isYes, isNo, isMaybe, isDunno })
			session.questionNum++

			// Generate next question based on answers
			const questions20 = [
				'Apakah benda itu bisa bergerak sendiri?',
				'Apakah benda itu bisa dimakan?',
				'Apakah benda itu ada di dalam rumah?',
				'Apakah benda itu berukuran kecil?',
				'Apakah benda itu berhubungan dengan teknologi?',
				'Apakah benda itu berwarna?',
				'Apakah benda itu berhubungan dengan alam?',
				'Apakah benda itu bisa dibeli?',
				'Apakah benda itu hidup di air?',
				'Apakah benda itu punya kaki?',
				'Apakah benda itu terbuat dari logam?',
				'Apakah benda itu berhubungan dengan musik?',
				'Apakah benda itu punya layar?',
				'Apakah benda itu berhubungan dengan makanan?',
				'Apakah benda itu bisa terbang?',
				'Apakah benda itu punya roda?',
				'Apakah benda itu berhubungan dengan olahraga?',
				'Apakah benda itu ada di sekolah?',
				'Apakah benda itu berhubungan dengan kesehatan?',
				'Apakah benda itu punya tombol?',
			]

			if (session.questionNum > session.maxQuestions) {
				// Time to guess
				deleteSession(chat || jid)
				const user = db.getUser(sender)
				const xpResult = addGameXp(user, GAME_XP.play)
				await db.save()
				await m.reply([
					'❓ *20 Questions — Tebakan Akhir*',
					'',
					'Aku sudah tanya 20 pertanyaan! Tapi aku belum bisa nebak 😅',
					'Apa jawabannya? (ketik aja, ini bukan game lagi)',
					`🎁 +${GAME_XP.play} XP`
				].join('\n'))
				return true
			}

			const nextQ = questions20[session.questionNum - 1] || `Pertanyaan #${session.questionNum}: Apakah benda itu unik?`
			session.questions.push(nextQ)

			await m.reply([
				`❓ *20 Questions* (#${session.questionNum}/${session.maxQuestions})`,
				'',
				nextQ,
				'',
				'Jawab: ya / tidak / mungkin / tidak tahu'
			].join('\n'))
			return true
		}

		return false
	}
}
