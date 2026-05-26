// funutils.js — 35 fun/utility commands for diana-bot
// ESM module — export const commands = { ... }

const pick = arr => arr[Math.floor(Math.random() * arr.length)]
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

// ─── Data Collections ────────────────────────────────────────────────

const eightBallResponses = [
	'Ya, pasti saja! 🟢', 'Tanpa diragukan! 🟢', 'Bisa dipastikan! 🟢',
	'Benar sekali! 🟢', 'Sepertinya iya 🟡', 'Kemungkinan besar iya 🟡',
	'Outlook bagus 🟡', 'Tanda-tandanya iya 🟡', 'Belum bisa ditebak 😐',
	'Coba tanya lagi nanti 😐', 'Lebih baik tidak diberitahu 🔴',
	'Jangan berharap 🔴', 'Tidak 🔴', 'Sangat meragukan 🔴',
	'Sangat tidak mungkin 🔴', 'Mungkin iya, mungkin tidak 😐',
	'Fate mengatakan iya 🟢', 'Jangan mengandalkan itu 🔴',
	'Konsentrasi dan tanya lagi 🟡', 'Jawabannya ada di dalam hatimu 💜'
]

const pickupLines = [
	'Apakah kamu sakit? Karena kamu membuatku lemas di lutut. 😍',
	'Maaf, apakah kamu dari surga? Karena kamu benar-benar seperti malaikat. 😇',
	'Apakah nama kamu Google? Karena kamu punya semua yang aku cari. 🔍',
	'Bukan wajahmu yang bikin jatuh cinta, tapi senyummu yang bikin dunia berhenti. 💕',
	'Kamu itu seperti WiFi, aku selalu ingin terhubung denganmu. 📶',
	'Kalau kamu adalah sayuran, kamu pasti labu manis. 🎃',
	'Apa kamu tukang sihir? Karena setiap kali aku lihat kamu, semua orang lain menghilang. 🪄',
	'Aku bukan fotografer, tapi aku bisa melihat kita berkembang bersama. 📸',
	'Apakah kamu peta? Karena aku tersesat di matamu. 🗺️',
	'Kamu itu seperti kopi di pagi hari—membuat hariku selalu lebih baik. ☕',
	'Kalau cinta itu api, kamu pasti api unggun terbesar. 🔥',
	'Aku bukan pandai matematika, tapi aku tahu kamu + aku = sempurna. ➕',
	'Apakah kamu baterai? Karena kamu mengisi ulang hariku. 🔋',
	'Maaf, apakah kamu kunci? Karena kamu membuka hatiku. 🔑',
	'Kalau kamu bintang, aku mau jadi langit malammu. ⭐'
]

const roasts = [
	'Otakmu seperti kursi kosong—nggak ada yang nongol. 🪑',
	'Kamu itu seperti awan, datang dan pergi tanpa arti. ☁️',
	'Mukamu bisa dijadikan jamu untuk obat pahit. 😂',
	'Kalau kebodohan itu emas, kamu pasti sudah jadi miliarder. 💰',
	'Kamu itu seperti WiFi gratis—lambat dan nggak bisa diandalkan. 📶',
	'Tinggi kepercayaan dirimu melebihi tinggi badanmu. 📏',
	'Kamu punya bakat—bakat bikin orang pusing. 🤯',
	'Kalau bodoh itu olahraga, kamu pasti juara olimpiade. 🏅',
	'Wajahmu seperti password—sulit ditebak dan nggak ada yang mau ingat. 🔐',
	'Kamu itu seperti iklan pop-up—nggak ada yang mau tapi selalu muncul. 📢',
	'Kecerdasanmu seperti sinyal di hutan—hilang tak berbekas. 🌲',
	'Kalau kamu bunga, kamu pasti bunga mati. 💀'
]

const compliments = [
	'Kamu punya senyum yang bisa menerangi seluruh ruangan! ✨',
	'Kamu adalah bukti bahwa orang baik masih ada di dunia ini. 🌟',
	'Kamu punya energi yang bikin semua orang di sekitarmu merasa nyaman. 🤗',
	'Setiap kali kamu berbicara, aku selalu ingin mendengar lebih banyak. 🎧',
	'Kamu itu seperti matahari—selalu bikin hari jadi lebih cerah. ☀️',
	'Dunia butuh lebih banyak orang sepertimu. 🌍',
	'Kamu punya rasa humor yang luar biasa! 😄',
	'Kamu adalah versi terbaik dari dirimu sendiri. 💪',
	'Kamu punya bakat yang jarang dimiliki orang lain. 🎨',
	'Kamu membuat hal-hal sederhana terasa istimewa. 💎',
	'Kamu itu unik—dan itu kelebihan terbesarmu. 🦋',
	'Kehadiranmu sudah cukup untuk membuat hari-hari lebih baik. 🌈'
]

const funFacts = [
	'🐙 Gurita punya 3 jantung dan darah berwarna biru.',
	'🍯 Madu tidak pernah basi—madu yang ditemukan di makam Mesir kuno masih bisa dimakan!',
	'🦈 Hiu sudah ada sebelum pohon di bumi. Pohon muncul 350 juta tahun lalu, hiu 400 juta tahun lalu.',
	'🐄 Sapi punya sahabat dan akan stres jika dipisahkan dari sahabatnya.',
	'🦑 Sotong raksasa punya mata sebesar bola voli.',
	'🍌 Pisang adalah berry, tapi stroberi bukan berry sejati.',
	'🧠 Otak manusia menghasilkan listrik yang cukup untuk menyalakan bola lampu kecil.',
	'🦩 Flamingo berwarna pink karena makan udang dan alga.',
	'🌧️ Awan rata-rata beratnya 500.000 kg.',
	'🦈 Hiu adalah satu-satunya ikan yang bisa berkedip dengan kedua mata.',
	'📱 Nama asli Google adalah "BackRub".',
	'🐘 Gajah adalah satu-satunya hewan yang tidak bisa melompat.',
	'🧊 Air panas membeku lebih cepat dari air dingin dalam kondisi tertentu (efek Mpemba).',
	'🐝 Lebah madu bisa mengenali wajah manusia.',
	'🌌 Ada lebih banyak bintang di alam semesta daripada butiran pasir di bumi.'
]

const yoMamaJokes = [
	'Yo mama sebesar itu, sampai ketika dia duduk di sekitar rumah, dia duduk DI SEKITAR rumah! 🏠',
	'Yo mama begitu malas, sampai dia menaruh pager di sekitar TV untuk nonton dari luar. 📺',
	'Yo mama begitu tua, sampai debu di matanya adalah fosil. 🦕',
	'Yo mama begitu pendek, sampai dia harus naik tangga untuk mengambil koin receh. 🪙',
	'Yo mama begitu gemuk, sampai pantatnya punk punya area khusus sendiri. 🎸',
	'Yo mama begitu miskin, sampai dia tidak bisa membayar perhatian. 💸',
	'Yo mama begitu jelek, sampai hantu menolak menghantui rumahnya. 👻',
	'Yo mama begitu gemuk, sampai bumi mengorbit dia bukan matahari. 🌍',
	'Yo mama begitu tua, sampai dia punya gambar diri di dinding gua. 🖼️',
	'Yo mama begitu pendek, sampai dia bermain kejar-kejaran dengan kecoak dan kalah. 🪳',
	'Yo mama begitu gemuk, sampai dia pakai sabuk dengan garis lintang dan bujur. 🗺️',
	'Yo mama begitu malas, sampai dia mempekerjakan seseorang untuk bermimpi untuknya. 💭'
]

const puns = [
	'Kenapa nasi goreng tidak pernah kalah? Karena dia selalu di-goreng! 🍚',
	'Apa kata gunung ke gunung lain? "Hai, puncak kamu kelihatan!" 🏔️',
	'Kenapa ikan tidak suka bermain piano? Karena takut kena tuna! 🐟',
	'Apa bahasa Jepangnya kucing yang jatuh? Nya-duk! 🐱',
	'Kenapa komputer tidak lapar? Karena sudah punya banyak byte! 💻',
	'Apa persamaan antara tukang sihir dan pelaut? Keduanya ahli mantera! 🧙',
	'Kenapa buku matematika sedih? Karena punya terlalu banyak masalah. 📚',
	'Kenapa jam dinding ditangkap polisi? Karena jamannya! ⏰',
	'Apa kata semut ke gajah? "Gajah, jangan besar diri!" 🐜',
	'Kenapa rokok tidak sekolah? Karena cuma mau nge-butt! 🚬',
	'Kenapa kucing ditangkap polisi? Karena maling! 🐱',
	'Kenapa sepatu tidak bisa bicara? Karena selalu di-injak-injak! 👟'
]

const oneLiners = [
	'Aku memberitahu dokter aku patah lengan di dua tempat. Dia bilang, "Berhenti pergi ke tempat itu!" 🏥',
	'Aku dulu tidak suka janggut, tapi lama-lama tumbuh di diriku. 🧔',
	'Orang bijak pernah bilang, "Jangan letakkan semua telur dalam satu keranjang." Tapi orang bodoh bilang, "Taruh semua telur di satu keranjang dan AWASII!" 🥚',
	'Kerja keras tidak pernah membunuh siapa pun, tapi mengapa ambil risiko? 😴',
	'Uang tidak bisa membeli kebahagiaan, tapi lebih baik menangis di dalam mobil mewah. 🚗',
	'Aku di diet. Makanan yang sehat mati, bukan aku. 🥗',
	'Jangan pernah bertaruh dengan orang bodoh—mereka selalu menang. 🎰',
	'Jika atasanmu selalu benar, berarti salah satu dari kalian tidak diperlukan. 👔',
	'Aku bukan malas, aku sedang mode hemat energi. 🔋',
	'Orang bilang tidak ada yang sempurna. Tapi hei, tidak ada yang namanya "tidak ada" juga. 🤷',
	'Kesabaran itu kebajikan. Tapi menunggu terlalu lama itu kebodohan. ⏳',
	'Aku punya terlalu banyak waktu luang—kata orang. Padahal aku cuma malas. 🛋️'
]

const riddles = [
	{ q: 'Apa yang punya mata tapi tidak bisa melihat?', a: 'Jarum 🪡' },
	{ q: 'Apa yang punya tangan tapi tidak bisa mengambil?', a: 'Jam dinding ⏰' },
	{ q: 'Apa yang punya kaki tapi tidak bisa berjalan?', a: 'Meja 🪑' },
	{ q: 'Semakin kamu tarik, semakin pendek. Apa itu?', a: 'Rokok 🚬' },
	{ q: 'Apa yang bisa berjalan tanpa kaki dan menangis tanpa mata?', a: 'Awan ☁️' },
	{ q: 'Apa yang selalu di depanmu tapi tidak bisa dilihat?', a: 'Masa depan 🔮' },
	{ q: 'Apa yang naik tapi tidak pernah turun?', a: 'Umur 🎂' },
	{ q: 'Apa yang basah saat mengeringkan?', a: 'Handuk 🧴' },
	{ q: 'Apa yang punya leher tapi tidak punya kepala?', a: 'Botol 🍾' },
	{ q: 'Apa yang kamu bagi tapi tidak bisa dipotong?', a: 'Rahasia 🤫' },
	{ q: 'Apa yang hilang saat kamu sebut namanya?', a: 'Diam 🤫' },
	{ q: 'Apa yang bisa mengisi ruangan tapi tidak punya massa?', a: 'Cahaya 💡' }
]

const fortunes = [
	'🥠 Keberuntungan besar menantimu di akhir bulan ini. Bersiaplah!',
	'🥠 Seseorang yang kamu rindukan akan segera menghubungimu.',
	'🥠 Perubahan positif akan datang dari arah yang tidak terduga.',
	'🥠 Keberanianmu hari ini akan membuahkan hasil luar biasa besok.',
	'🥠 Jangan terburu-buru—sabar adalah kunci keberhasilanmu saat ini.',
	'🥠 Angka 7 membawa keberuntungan untukmu minggu ini.',
	'🥠 Seseorang diam-diam mengagumimu. Perhatikan sekitarmu!',
	'🥠 Proyek yang kamu kerjakan akan sukses melebihi ekspektasi.',
	'🥠 Perjalanan yang kamu rencanakan akan membawa keajaiban.',
	'🥠 Tutup mulut, buka mata—peluang ada di depanmu.',
	'🥠 Waktu yang tepat untuk memulai sesuatu yang baru adalah SEKARANG.',
	'🥠 Kebaikan yang kamu tanam akan berbuah dalam waktu dekat.'
]

const moods = [
	'😊 Sedang senang! Hidup terasa indah hari ini.',
	'😢 Sedang sedih... butuh peluk virtual.',
	'😤 Sedang marah! Jangan dekat-dekat dulu ya.',
	'😴 Sedang ngantuk berat. Mode hibernasi ON.',
	'🤩 Sedang excited! Semua terasa luar biasa!',
	'🥱 Sedang bosan. Butuh hiburan segera.',
	'😎 Sedang cool dan percaya diri. Nothing can stop me!',
	'🥺 Sedang merana... siapa yang mau kasih semangat?',
	'🤗 Sedang penuh kasih sayang! Mau peluk semua orang.',
	'🤯 Sedang bingung. Otak overload.',
	'😌 Sedang damai dan tenang. Zen mode activated.',
	'😈 Sedang jahil! Hati-hati semua orang!'
]

const vibes = [
	'✨ Vibe: Main Character Energy — Kamu adalah bintang utama hari ini!',
	'🌊 Vibe: Chill & Relaxed — Seperti ombak di pantai, tenang dan damai.',
	'🔥 Vibe: On Fire — Semua yang kamu lakukan hari ini bakal luar biasa!',
	'🌙 Vibe: Midnight Mood — Lebih produktif saat dunia tertidur.',
	'⚡ Vibe: Electric — Energi positif mengalir deras!',
	'🌸 Vibe: Soft Girl/Boy Energy — Lembut tapi berdaya.',
	'🎮 Vibe: Gamer Mode — Hidup adalah game dan kamu pemain terbaik.',
	'🎭 Vibe: Dramatic Queen — Setiap momen adalah panggung.',
	'🧘 Vibe: Zen Master — Keseimbangan sempurna antara body dan mind.',
	'🦋 Vibe: Transformation — Kamu sedang berkembang menjadi versi terbaik.',
	'💀 Vibe: Chaos Mode — Hidup ini chaos, tapi kamu chaos yang teratur.',
	'🌈 Vibe: Rainbow Energy — Cerah di setiap sisi!'
]

const personalities = [
	'🦁 The Leader — Berani, tegas, dan selalu menginspirasi orang lain.',
	'🦊 The Strategist — Pintar, licik, dan selalu tiga langkah di depan.',
	'🐻 The Guardian — Pelindung setia yang bisa diandalkan.',
	'🦋 The Free Spirit — Kreatif, spontan, dan tidak bisa dibatasi.',
	'🦉 The Wise One — Tenang, bijaksana, dan selalu puni jawaban.',
	'🐺 The Loyal One — Setia sampai akhir, tidak pernah meninggalkan teman.',
	'🦄 The Dreamer — Imajinasi tanpa batas, selalu melihat kemungkinan.',
	'🐉 The Powerful — Kuat, ambisius, dan tidak pernah menyerah.',
	'🦜 The Entertainer — Ceria, suka bercanda, jiwa pesta sejati.',
	'🐢 The Patient — Sabar, tekun, dan selalu mencapai tujuan akhirnya.',
	'🦈 The Ambitious — Fokus, agresif, dan selalu meraih yang terbaik.',
	'🐧 The Team Player — Suka kerja sama, seta kerja keras diam-diam.'
]

const spiritAnimals = [
	'🦅 Eagle — Penglihatan tajam, terbang tinggi, dan kebebasan tanpa batas.',
	'🐺 Wolf — Setia pada kawanan, kuat dalam kesendirian, dan intuitif.',
	'🦁 Lion — Berani, bangga, dan pemimpin alami.',
	'🦊 Fox — Cerdik, adaptif, dan selalu menemukan jalan keluar.',
	'🐻 Bear — Kuat, protektif, dan penuh kehangatan.',
	'🦉 Owl — Bijaksana, observan, dan aktif di saat orang lain tidur.',
	'🦋 Butterfly — Transformasi indah, perubahan positif, dan kebebasan.',
	'🐬 Dolphin — Ceria, pintar, dan suka bermain.',
	'🦌 Deer — Lemah lembut, anggun, dan terhubung dengan alam.',
	'🐍 Snake — Transformasi, penyembuhan, dan kebijaksanaan kuno.',
	'🐉 Dragon — Kuat, mistis, dan penjaga harta karun batin.',
	'🦜 Parrot — Ekspresif, ceria, dan suka berkomunikasi.'
]

const superpowers = [
	'⚡ Elektrokinesis — Kamu bisa mengendalikan listrik! Petir adalah senjatamu.',
	'🔥 Pyrokinesis — Kamu bisa mengendalikan api! Dunia adalah obatmu.',
	'❄️ Cryokinesis — Kamu bisa mengendalikan es dan dingin! Musuhmu akan membeku.',
	'🧠 Telepati — Kamu bisa membaca pikiran! Tidak ada rahasia yang tersembunyi.',
	'👻 Invisibilitas — Kamu bisa menghilang! Seni menghilang tanpa jejak.',
	'⏳ Manipulasi Waktu — Kamu bisa menghentikan dan memundurkan waktu!',
	'🌀 Telekinesis — Kamu bisa menggerakkan benda dengan pikiran!',
	'🌊 Hydrokinesis — Kamu bisa mengendalikan air! Samudra patuh padamu.',
	'💨 Aerokinesis — Kamu bisa mengendalikan angin! Badai adalah sahabatmu.',
	'🌱 Chlorokinesis — Kamu bisa mengendalikan tani tanaman! Hutan adalah tentaramu.',
	'💫 Super Speed — Kamu bisa berlari secepat cahaya! Tidak ada yang bisa menangkapmu.',
	'🛡️ Force Field — Kamu bisa menciptakan perisai energi! Tidak ada yang bisa melukaimu.'
]

const patronuses = [
	'🦌 Rusa — Simbol keanggunan dan perlindungan, seperti Patronus Harry Potter.',
	'🐺 Serigala — Setia dan kuat, melindungi yang dicintai dengan segala harga.',
	'🦊 Rubah — Cerdik dan lincah, selalu menemukan jalan keluar dari kegelapan.',
	'🐈 Kucing — Misterius dan elegan, membawa cahaya di saat gelap.',
	'🦅 Elang — Tajam dan gagah, menerbangkan harapan dari ketinggian.',
	'🐉 Naga — Kekuatan murni yang mengusir semua kegelapan.',
	'🦄 Unicorn — Murni dan ajaib, cahaya yang tak bisa dipadamkan.',
	'🐻 Beruang — Kuat dan protektif, benteng terakhir melawan Dementor.',
	'🦉 Burung Hantu — Bijaksana dan waspada, penerang di malam gelap.',
	'🐇 Kelinci — Cepat dan tangkas, harapan yang selalu berlari menuju cahaya.',
	'🦢 Angsa — Anggun dan setia, cinta yang mengusir segala ketakutan.',
	'🦁 Singa — Berani dan bangga, raungan yang menggemparkan kegelapan.'
]

const slotSymbols = ['🍒', '🍋', '🍊', '🍇', '🔔', '💎', '7️⃣', '⭐']

const zodiacSigns = [
	{ name: 'Capricorn', symbol: '♑', element: 'Tanah', start: [1, 1], end: [1, 19] },
	{ name: 'Aquarius', symbol: '♒', element: 'Udara', start: [1, 20], end: [2, 18] },
	{ name: 'Pisces', symbol: '♓', element: 'Air', start: [2, 19], end: [3, 20] },
	{ name: 'Aries', symbol: '♈', element: 'Api', start: [3, 21], end: [4, 19] },
	{ name: 'Taurus', symbol: '♉', element: 'Tanah', start: [4, 20], end: [5, 20] },
	{ name: 'Gemini', symbol: '♊', element: 'Udara', start: [5, 21], end: [6, 20] },
	{ name: 'Cancer', symbol: '♋', element: 'Air', start: [6, 21], end: [7, 22] },
	{ name: 'Leo', symbol: '♌', element: 'Api', start: [7, 23], end: [8, 22] },
	{ name: 'Virgo', symbol: '♍', element: 'Tanah', start: [8, 23], end: [9, 22] },
	{ name: 'Libra', symbol: '♎', element: 'Udara', start: [9, 23], end: [10, 22] },
	{ name: 'Scorpio', symbol: '♏', element: 'Air', start: [10, 23], end: [11, 21] },
	{ name: 'Sagittarius', symbol: '♐', element: 'Api', start: [11, 22], end: [12, 21] },
	{ name: 'Capricorn', symbol: '♑', element: 'Tanah', start: [12, 22], end: [12, 31] }
]

const zodiacDescriptions = {
	Capricorn: '♑ *Capricorn* (22 Des - 19 Jan)\nElemen: Tanah 🌍\nPlanet: Saturnus 🪐\nSifat: Ambisius, disiplin, bertanggung jawab, dan sabar.',
	Aquarius: '♒ *Aquarius* (20 Jan - 18 Feb)\nElemen: Udara 💨\nPlanet: Uranus 🪐\nSifat: Inovatif, mandiri, humanis, dan eksentrik.',
	Pisces: '♓ *Pisces* (19 Feb - 20 Mar)\nElemen: Air 🌊\nPlanet: Neptunus 🪐\nSifat: Intuitif, kreatif, empatis, dan imajinatif.',
	Aries: '♈ *Aries* (21 Mar - 19 Apr)\nElemen: Api 🔥\nPlanet: Mars 🔴\nSifat: Berani, energik, impulsif, dan kompetitif.',
	Taurus: '♉ *Taurus* (20 Apr - 20 Mei)\nElemen: Tanah 🌍\nPlanet: Venus 💚\nSifat: Setia, sabar, praktis, dan sensual.',
	Gemini: '♊ *Gemini* (21 Mei - 20 Jun)\nElemen: Udara 💨\nPlanet: Merkuri 🪐\nSifat: Komunikatif, adaptif, penasaran, dan cerdas.',
	Cancer: '♋ *Cancer* (21 Jun - 22 Jul)\nElemen: Air 🌊\nPlanet: Bulan 🌙\nSifat: Emosional, protektif, intuitif, dan setia.',
	Leo: '♌ *Leo* (23 Jul - 22 Agu)\nElemen: Api 🔥\nPlanet: Matahari ☀️\nSifat: Karismatik, murah hati, dramatis, dan percaya diri.',
	Virgo: '♍ *Virgo* (23 Agu - 22 Sep)\nElemen: Tanah 🌍\nPlanet: Merkuri 🪐\nSifat: Analitis, perfeksionis, rajin, dan sederhana.',
	Libra: '♎ *Libra* (23 Sep - 22 Okt)\nElemen: Udara 💨\nPlanet: Venus 💚\nSifat: Diplomatis, adil, romantis, dan estetis.',
	Scorpio: '♏ *Scorpio* (23 Okt - 21 Nov)\nElemen: Air 🌊\nPlanet: Pluto 🪐\nSifat: Intens, misterius, tekun, dan passionate.',
	Sagittarius: '♐ *Sagittarius* (22 Nov - 21 Des)\nElemen: Api 🔥\nPlanet: Jupiter 🟤\nSifat: Optimis, petualang, jujur, dan filosofis.'
}

// ─── Helper Functions ─────────────────────────────────────────────────

function getZodiacFromDate(day, month) {
	for (const z of zodiacSigns) {
		const [sm, sd] = z.start
		const [em, ed] = z.end
		if (sm === em) {
			if (month === sm && day >= sd && day <= ed) return z.name
		} else if (month === sm && day >= sd) {
			return z.name
		} else if (month === em && day <= ed) {
			return z.name
		}
	}
	return 'Capricorn'
}

function parseDiceNotation(text) {
	if (!text) return { count: 1, sides: 6 }
	const match = text.trim().match(/^(\d+)d(\d+)$/i)
	if (match) {
		const count = Math.min(parseInt(match[1], 10), 20)
		const sides = Math.min(parseInt(match[2], 10), 100)
		return { count: Math.max(count, 1), sides: Math.max(sides, 2) }
	}
	return { count: 1, sides: 6 }
}

// ─── Commands ──────────────────────────────────────────────────────────

export const commands = {

	// 1. Magic 8-Ball
	'8ball': async m => {
		const question = m.command?.text?.trim()
		if (!question) {
			await m.reply('🎱 *Magic 8-Ball*\n\nFormat: .8ball <pertanyaan>\nContoh: .8ball Apakah aku akan jadi kaya?')
			return
		}
		const answer = pick(eightBallResponses)
		await m.reply(`🎱 *Magic 8-Ball*\n\n❓ Pertanyaan: ${question}\n🎱 Jawaban: ${answer}`)
	},

	// 2. Coin Flip
	coinflip: async m => {
		const result = Math.random() < 0.5 ? 'Kepala 🪙' : 'Ekor 🪙'
		await m.reply(`🪙 *Coin Flip*\n\nHasil: ${result}`)
	},

	// 3. Dice Roll
	dice: async m => {
		const { count, sides } = parseDiceNotation(m.command?.text)
		const rolls = []
		for (let i = 0; i < count; i++) {
			rolls.push(rand(1, sides))
		}
		const total = rolls.reduce((a, b) => a + b, 0)
		const rollsText = count > 1 ? ` (${rolls.join(' + ')})` : ''
		await m.reply(`🎲 *Dice Roll*\n\n🎲 Dadu: ${count}d${sides}\n📊 Hasil: ${total}${rollsText}`)
	},

	// 4. Russian Roulette
	roulette: async m => {
		const chamber = rand(1, 6)
		const bullet = rand(1, 6)
		const survived = chamber !== bullet
		const name = m.pushName || 'Pemain'
		if (survived) {
			await m.reply(`🔫 *Russian Roulette*\n\n🎯 Chamber: ${chamber}/6\n💥 Peluru di chamber: ${bullet}\n\n😅 ${name} selamat! Kamu hidup untuk bermain lagi...`)
		} else {
			await m.reply(`🔫 *Russian Roulette*\n\n🎯 Chamber: ${chamber}/6\n💥 Peluru di chamber: ${bullet}\n\n💀 ${name} KENA! Game over... 💀👻`)
		}
	},

	// 5. Slot Machine
	slot: async m => {
		const s1 = pick(slotSymbols)
		const s2 = pick(slotSymbols)
		const s3 = pick(slotSymbols)
		const win = s1 === s2 && s2 === s3
		const partial = s1 === s2 || s2 === s3 || s1 === s3
		let result
		if (win) {
			result = '🎉 JACKPOT! Kamu menang besar! 🎉'
		} else if (partial) {
			result = '😏 Dua cocok! Hampir jackpot...'
		} else {
			result = '💔 Tidak ada yang cocok. Coba lagi!'
		}
		await m.reply([
			'🎰 *Slot Machine* 🎰',
			'',
			`┌───┬───┬───┐`,
			`│ ${s1} │ ${s2} │ ${s3} │`,
			`└───┴───┴───┘`,
			'',
			result
		].join('\n'))
	},

	// 6. Love Ship
	loveship: async m => {
		const mentioned = m.mentionedJid || []
		if (mentioned.length < 2) {
			await m.reply('💕 *Love Ship*\n\nFormat: .loveship @orang1 @orang2\n\nTag 2 orang untuk menghitung kecocokan cinta!')
			return
		}
		const hash1 = mentioned[0].split('@')[0].split('').reduce((a, c) => a + c.charCodeAt(0), 0)
		const hash2 = mentioned[1].split('@')[0].split('').reduce((a, c) => a + c.charCodeAt(0), 0)
		const percent = ((hash1 * hash2) % 100) + 1
		const heart = percent > 80 ? '💕' : percent > 60 ? '❤️' : percent > 40 ? '🧡' : percent > 20 ? '💛' : '💔'
		const verdict = percent > 80 ? 'Jodoh banget! 💍' : percent > 60 ? 'Cocok nih! 😍' : percent > 40 ? 'Lumayan lah 😏' : percent > 20 ? 'Agak susah... 😅' : 'Kayaknya tidak jodoh 💔'
		await m.reply(`💕 *Love Ship*\n\n${heart} Kecocokan: ${percent}%\n📊 Verdict: ${verdict}`)
	},

	// 7. Soulmate
	soulmate: async m => {
		const mentioned = m.mentionedJid || []
		if (mentioned.length < 2) {
			await m.reply('💫 *Soulmate Test*\n\nFormat: .soulmate @orang1 @orang2\n\nTag 2 orang untuk cek kecocokan jiwa!')
			return
		}
		const hash1 = mentioned[0].split('@')[0].split('').reduce((a, c) => a + c.charCodeAt(0), 0)
		const hash2 = mentioned[1].split('@')[0].split('').reduce((a, c) => a + c.charCodeAt(0), 0)
		const percent = ((hash1 + hash2) % 100) + 1
		const stars = '⭐'.repeat(Math.ceil(percent / 20))
		const verdict = percent > 80 ? 'Soulmate sejati! 🌟✨' : percent > 60 ? 'Koneksi yang kuat! 💫' : percent > 40 ? 'Ada chemistry! 🔗' : percent > 20 ? 'Masih perlu waktu... ⏳' : 'Bukan jodoh di dunia ini 🌀'
		await m.reply(`💫 *Soulmate Test*\n\n${stars} Kecocokan Jiwa: ${percent}%\n📊 Verdict: ${verdict}`)
	},

	// 8. Friendship
	friendship: async m => {
		const mentioned = m.mentionedJid || []
		if (mentioned.length < 2) {
			await m.reply('🤝 *Friendship Calculator*\n\nFormat: .friendship @orang1 @orang2\n\nTag 2 orang untuk hitung persentase pertemanan!')
			return
		}
		const hash1 = mentioned[0].split('@')[0].split('').reduce((a, c) => a + c.charCodeAt(0), 0)
		const hash2 = mentioned[1].split('@')[0].split('').reduce((a, c) => a + c.charCodeAt(0), 0)
		const percent = ((hash1 ^ hash2) % 100) + 1
		const emoji = percent > 80 ? '🤝' : percent > 60 ? '👏' : percent > 40 ? '😊' : percent > 20 ? '🤔' : '😬'
		const verdict = percent > 80 ? 'Sahabat sejati! 🏆' : percent > 60 ? 'Teman baik! 🎉' : percent > 40 ? 'Teman biasa 🤷' : percent > 20 ? 'Kenalan doang... 👋' : 'Bukan teman? 😂'
		await m.reply(`🤝 *Friendship Calculator*\n\n${emoji} Persentase: ${percent}%\n📊 Verdict: ${verdict}`)
	},

	// 9. Rate
	rate: async m => {
		const text = m.command?.text?.trim()
		if (!text) {
			await m.reply('⭐ *Rate*\n\nFormat: .rate <sesuatu>\nContoh: .rate kecantikanmu')
			return
		}
		const score = rand(1, 100)
		const starCount = Math.ceil(score / 20)
		const stars = '⭐'.repeat(starCount) + '☆'.repeat(5 - starCount)
		const verdict = score > 80 ? 'Luar biasa! 🔥' : score > 60 ? 'Bagus! 👍' : score > 40 ? 'Lumayan 😐' : score > 20 ? 'Hmm... 😬' : 'Yah... 💀'
		await m.reply(`⭐ *Rate*\n\n📊 "${text}"\n${stars} ${score}/100\n💬 ${verdict}`)
	},

	// 10. Pickup Line
	pickup: async m => {
		await m.reply(`💝 *Pickup Line*\n\n${pick(pickupLines)}`)
	},

	// 11. Roast
	roast: async m => {
		const mentioned = m.mentionedJid || []
		const target = mentioned.length > 0 ? `@${mentioned[0].split('@')[0]}` : m.pushName || 'Kamu'
		await m.reply(`🔥 *Roast*\n\n${target}, ${pick(roasts)}`)
	},

	// 12. Compliment
	compliment: async m => {
		const mentioned = m.mentionedJid || []
		const target = mentioned.length > 0 ? `@${mentioned[0].split('@')[0]}` : m.pushName || 'Kamu'
		await m.reply(`💖 *Compliment*\n\n${target}, ${pick(compliments)}`)
	},

	// 13. Fun Fact
	fact: async m => {
		await m.reply(`💡 *Fun Fact*\n\n${pick(funFacts)}`)
	},

	// 14. Useless Fact (API)
	uselessfact: async m => {
		try {
			await m.reply('🤷 Ambil useless fact...')
			const res = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en')
			if (!res.ok) throw new Error(`HTTP ${res.status}`)
			const data = await res.json()
			await m.reply(`🤷 *Useless Fact*\n\n${data.text}`)
		} catch {
			await m.reply('⚠️ Gagal mengambil useless fact. Coba lagi nanti!')
		}
	},

	// 15. Random Joke
	joke: async m => {
		const jokes = [
			'Kenapa programmer suka gelap? Karena kalau terang, banyak bug yang kelihatan! 🐛',
			'Anak: "Pak, nilai matematika aku 100!"\nAyah: "Wow, berapa soalnya?"\nAnak: "200..." 😂',
			'Istri: "Sayang, aku mau yang mahal!"\nSuami: "Oke, aku belikan gula pasir 1 kg." 🍬',
			'Guru: "Sebutkan 5 hewan dari Afrika!"\nMurid: "3 singa dan 2 gajah." 🦁🐘',
			'Kenapa orang tidak percaya aku? Karena aku bukan orang, aku kucing. 🐱',
			'Dokter: "Minum obat ini 3x sehari."\nPasien: "Tapi dok, aku cuma makan 1x sehari." 💊',
			'Wife: "Beliin aku sesuatu yang bikin aku cantik."\nHusband: *belikan cermin* 🪞',
			'Kenapa kereta api tidak pernah tersesat? Karena selalu di jalurnya! 🚂',
			'Bos: "Kamu terlambat lagi!"\nKaryawan: "Maaf pak, jalan licin."\nBos: "Tapi kamu naik motor!"\nKaryawan: "Iya pak, motornya yang licin." 🏍️',
			'Kenapa buku sejarah tidak punya teman? Karena terlalu banyak masa lalu. 📖',
			'Anak: "Bunda, aku mau adik!"\nBunda: "Makan sayur dulu baru kasih."\nAnak: "Yaudah, aku kirim sayur ke stork." 🥦',
			'Apa bedanya orang miskin dan orang kaya? Orang miskin pikir dulu baru beli, orang kaya beli dulu baru mikir. 💸'
		]
		await m.reply(`😂 *Joke*\n\n${pick(jokes)}`)
	},

	// 16. Dad Joke (API)
	dadjoke: async m => {
		try {
			await m.reply('👨 Ambil dad joke...')
			const res = await fetch('https://icanhazdadjoke.com/', {
				headers: { Accept: 'application/json' }
			})
			if (!res.ok) throw new Error(`HTTP ${res.status}`)
			const data = await res.json()
			await m.reply(`👨 *Dad Joke*\n\n${data.joke}`)
		} catch {
			await m.reply('⚠️ Gagal mengambil dad joke. Coba lagi nanti!')
		}
	},

	// 17. Chuck Norris Joke (API)
	chucknorris: async m => {
		try {
			await m.reply('👊 Ambil Chuck Norris joke...')
			const res = await fetch('https://api.chucknorris.io/jokes/random')
			if (!res.ok) throw new Error(`HTTP ${res.status}`)
			const data = await res.json()
			await m.reply(`👊 *Chuck Norris Joke*\n\n${data.value}`)
		} catch {
			await m.reply('⚠️ Gagal mengambil Chuck Norris joke. Coba lagi nanti!')
		}
	},

	// 18. Inspirational Quote
	quote: async m => {
		const quotes = [
			'💭 "Satu-satunya cara untuk melakukan pekerjaan hebat adalah mencintai apa yang kamu lakukan." — Steve Jobs',
			'💭 "Hidup adalah apa yang terjadi saat kamu sibuk membuat rencana lain." — John Lennon',
			'💭 "Masa depan milik mereka yang percaya pada keindahan mimpi mereka." — Eleanor Roosevelt',
			'💭 "Jangan biarkan kemarin mengambil terlalu banyak hari ini." — Will Rogers',
			'💭 "Kesuksesan bukanlah kunci kebahagiaan. Kebahagiaan adalah kunci kesuksesan." — Albert Schweitzer',
			'💭 "Satu-satunya hal yang mustahil adalah sesuatu yang tidak kamu coba." — Unknown',
			'💭 "Pendidikan adalah senjata paling ampuh untuk mengubah dunia." — Nelson Mandela',
			'💭 "Orang yang berani gagal besar dapat mencapai besar." — Robert Kennedy',
			'💭 "Jangan tunggu. Waktunya tidak akan pernah tepat." — Napoleon Hill',
			'💭 "Kamu tidak perlu melihat seluruh tangga, cukup ambil langkah pertama." — Martin Luther King Jr.',
			'💭 "Semuanya tampak mustahil sampai dilakukan." — Nelson Mandela',
			'💭 "Hidup 10% apa yang terjadi padamu dan 90% bagaimana kamu meresponsnya." — Lou Holtz'
		]
		await m.reply(pick(quotes))
	},

	// 19. Motivational Quote
	motivation: async m => {
		const motivations = [
			'🔥 "Jangan pernah menyerah. Hari ini susah, besok lebih susah, tapi lusa akan indah." — Jack Ma',
			'🔥 "Kamu lebih kuat dari yang kamu pikirkan dan lebih berani dari yang kamu percaya." — Unknown',
			'🔥 "Setiap master dulunya seorang pemula. Setiap ahli dulunya seorang amatir." — Unknown',
			'🔥 "Orang sukses melakukan apa yang orang gagal tidak mau lakukan." — Jim Rohn',
			'🔥 "Jika kamu lelah, istirahatlah. Bukan berhenti." — Banksy',
			'🔥 "Kegagalan adalah kesempatan untuk memulai lagi dengan lebih bijak." — Henry Ford',
			'🔥 "Sulit bukan berarti mustahil. Mustahil hanya berarti butuh waktu lebih lama." — Unknown',
			'🔥 "Kamu tidak butuh motivasi, kamu butuh disiplin. Motivasi datang dan pergi, disiplin tetap." — Unknown',
			'🔥 "Satu langkah kecil lebih baik daripada nol langkah." — Unknown',
			'🔥 "Jangan bandingkan dirimu dengan orang lain. Bandingkan dirimu dengan dirimu kemarin." — Jordan Peterson',
			'🔥 "Kamu gagal hanya saat kamu berhenti mencoba." — Unknown',
			'🔥 "Hari ini adalah hari terbaik untuk memulai sesuatu yang besar." — Unknown'
		]
		await m.reply(pick(motivations))
	},

	// 20. Affirmation (API)
	affirmation: async m => {
		try {
			await m.reply('✨ Ambil affirmation...')
			const res = await fetch('https://www.affirmations.dev/')
			if (!res.ok) throw new Error(`HTTP ${res.status}`)
			const data = await res.json()
			await m.reply(`✨ *Affirmation*\n\n"${data.affirmation}" 💜`)
		} catch {
			const fallbacks = [
				'Kamu layak mendapatkannya semua yang baik. 💜',
				'Kamu cukup. Kamu selalu cukup. 💜',
				'Hari ini akan menjadi hari yang indah. 💜',
				'Kamu punya kekuatan untuk menciptakan perubahan. 💜',
				'Kamu adalah magnet untuk hal-hal positif. 💜'
			]
			await m.reply(`✨ *Affirmation*\n\n"${pick(fallbacks)}" 💜`)
		}
	},

	// 21. Advice (API)
	advice: async m => {
		try {
			await m.reply('💡 Ambil advice...')
			const res = await fetch('https://api.adviceslip.com/advice', {
				headers: { Accept: 'application/json' }
			})
			if (!res.ok) throw new Error(`HTTP ${res.status}`)
			const data = await res.json()
			await m.reply(`💡 *Advice #${data.slip.id}*\n\n"${data.slip.advice}"`)
		} catch {
			const fallbacks = [
				'Jangan pernah berhenti belajar. 📚',
				'Istirahat itu penting. Jangan push dirimu terlalu keras. 🛌',
				'Jangan takut meminta bantuan. 🤝',
				'Fokus pada apa yang bisa kamu kontrol. 🎯',
				'Jadilah versi terbaik dari dirimu sendiri. 🌟'
			]
			await m.reply(`💡 *Advice*\n\n"${pick(fallbacks)}"`)
		}
	},

	// 22. Yo Mama Joke
	yomama: async m => {
		await m.reply(`😂 *Yo Mama Joke*\n\n${pick(yoMamaJokes)}`)
	},

	// 23. Pun
	pun: async m => {
		await m.reply(`😜 *Pun*\n\n${pick(puns)}`)
	},

	// 24. One-Liner
	oneliner: async m => {
		await m.reply(`😏 *One-Liner*\n\n${pick(oneLiners)}`)
	},

	// 25. Riddle
	riddle: async m => {
		const r = pick(riddles)
		await m.reply([
			'🧩 *Riddle*',
			'',
			`❓ ${r.q}`,
			'',
			'💬 Balas "answer" atau tunggu 10 detik untuk jawaban...'
		].join('\n'))
		// Send answer after delay
		setTimeout(async () => {
			try {
				await m.reply(`🧩 *Jawaban Riddle*\n\n✅ ${r.a}`)
			} catch { /* ignore if reply fails */ }
		}, 10000)
	},

	// 26. Fortune Cookie
	fortune: async m => {
		await m.reply(pick(fortunes))
	},

	// 27. Horoscope (API)
	horoscope: async m => {
		const sign = m.command?.text?.trim()?.toLowerCase()
		const validSigns = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']
		if (!sign || !validSigns.includes(sign)) {
			await m.reply([
				'🔮 *Horoscope*',
				'',
				`Format: .horoscope <zodiak>`,
				`Contoh: .horoscope leo`,
				'',
				`Zodiak tersedia: ${validSigns.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(', ')}`
			].join('\n'))
			return
		}
		try {
			await m.reply('🔮 Ambil ramalan...')
			const res = await fetch(`https://aztro.sameerkumar.website/?sign=${sign}&day=today`, { method: 'POST' })
			if (!res.ok) throw new Error(`HTTP ${res.status}`)
			const data = await res.json()
			await m.reply([
				`🔮 *Horoscope: ${sign.charAt(0).toUpperCase() + sign.slice(1)}*`,
				`📅 ${data.current_date || 'Hari ini'}`,
				'',
				`📝 Deskripsi: ${data.description || '-'}`,
				`🎯 Kompatibilitas: ${data.compatibility || '-'}`,
				`🍀 Angka Keberuntungan: ${data.lucky_number || '-'}`,
				`🎨 Warna Keberuntungan: ${data.color || '-'}`,
				`⏰ Waktu Keberuntungan: ${data.lucky_time || '-'}`,
				`🌟 Mood: ${data.mood || '-'}`
			].join('\n'))
		} catch {
			await m.reply('⚠️ Gagal mengambil horoscope. Coba lagi nanti!')
		}
	},

	// 28. Zodiac Sign from Birth Date
	zodiac: async m => {
		const text = m.command?.text?.trim()
		if (!text) {
			await m.reply('♈ *Zodiac Sign*\n\nFormat: .zodiac <tanggal-bulan>\nContoh: .zodiac 15-08 (15 Agustus)')
			return
		}
		const dateMatch = text.match(/(\d{1,2})[-/](\d{1,2})/)
		if (!dateMatch) {
			await m.reply('⚠️ Format tanggal salah. Gunakan: .zodiac DD-MM\nContoh: .zodiac 15-08')
			return
		}
		const day = parseInt(dateMatch[1], 10)
		const month = parseInt(dateMatch[2], 10)
		if (day < 1 || day > 31 || month < 1 || month > 12) {
			await m.reply('⚠️ Tanggal tidak valid. Pastikan hari (1-31) dan bulan (1-12) benar.')
			return
		}
		const signName = getZodiacFromDate(day, month)
		const info = zodiacDescriptions[signName] || `Zodiak: ${signName}`
		await m.reply(`📅 Tanggal: ${day}/${month}\n\n${info}`)
	},

	// 29. Lucky Number
	lucky: async m => {
		const count = Math.min(parseInt(m.command?.args?.[0], 10) || 3, 10)
		const numbers = []
		for (let i = 0; i < count; i++) {
			numbers.push(rand(1, 99))
		}
		const name = m.pushName || 'Kamu'
		await m.reply(`🍀 *Lucky Number*\n\n🎰 ${name} hari ini:\n🎲 ${numbers.join(' - ')}\n\nSemoga membawa keberuntungan! ✨`)
	},

	// 30. Mood
	mood: async m => {
		const name = m.pushName || 'Kamu'
		await m.reply(`😊 *Mood Check*\n\n${name} hari ini:\n${pick(moods)}`)
	},

	// 31. Vibe Check
	vibe: async m => {
		const name = m.pushName || 'Kamu'
		await m.reply(`✨ *Vibe Check*\n\n${name}:\n${pick(vibes)}`)
	},

	// 32. Personality Type
	personality: async m => {
		const name = m.pushName || 'Kamu'
		await m.reply(`🧠 *Personality Type*\n\n${name}:\n${pick(personalities)}`)
	},

	// 33. Spirit Animal
	spiritanimal: async m => {
		const name = m.pushName || 'Kamu'
		await m.reply(`🐾 *Spirit Animal*\n\n${name}:\n${pick(spiritAnimals)}`)
	},

	// 34. Superpower
	superpower: async m => {
		const name = m.pushName || 'Kamu'
		await m.reply(`⚡ *Superpower*\n\n${name}:\n${pick(superpowers)}`)
	},

	// 35. Patronus
	patronus: async m => {
		const name = m.pushName || 'Kamu'
		await m.reply(`🪄 *Patronus*\n\n${name}:\n${pick(patronuses)}\n\n*"Expecto Patronum!"* ✨`)
	}
}
