import { hasSession, getSession, createSession, deleteSession, addGameXp } from '../../../lib/game.js'
import { searchAnime } from '@shikytemo/shitools'

const TEBAK_XP = 25

// ── Tebak Gambar ──
// Bank soal: emoji puzzle → jawaban
const gambarBank = [
	{ hint: '🍎📱', answer: 'apple iphone' },
	{ hint: '🌙🐺', answer: 'moon wolf' },
	{ hint: '🔥❄️💧🌿', answer: 'avatar' },
	{ hint: '🧙‍♂️💍🌋', answer: 'lord of the rings' },
	{ hint: '🕷️🏙️🦸‍♂️', answer: 'spiderman' },
	{ hint: '🦇🃏🏙️', answer: 'batman' },
	{ hint: '⚡🧑‍🦱🔨', answer: 'thor' },
	{ hint: '🤖🚗💥', answer: 'transformers' },
	{ hint: '🏴‍☠️⚓🦜', answer: 'pirates' },
	{ hint: '🐉🔥👸🏰', answer: 'game of thrones' },
	{ hint: '🦁🐗🐗🐗', answer: 'lion king' },
	{ hint: '🧊⛵🚢', answer: 'titanic' },
	{ hint: '👻🔫🚫👻', answer: 'ghostbusters' },
	{ hint: '🦈🏊😱', answer: 'jaws' },
	{ hint: '🎩🐰🥚', answer: 'easter' },
	{ hint: '🧛‍♂️🧄🌅', answer: 'dracula' },
	{ hint: '🤠🐴🏜️', answer: 'cowboy' },
	{ hint: '🚀👨‍🚀🌍', answer: 'astronaut' },
	{ hint: '🎹🎹🎹🎵', answer: 'piano' },
	{ hint: '🍕🐢🥋', answer: 'ninja turtles' }
]

// ── Tebak Kata ──
const kataBank = [
	{ hint: 'Bahasa pemrograman yang namanya diambil dari ular 🐍', answer: 'python' },
	{ hint: 'Planet terbesar di tata surya', answer: 'jupiter' },
	{ hint: 'Negara dengan penduduk terbanyak di dunia', answer: 'india' },
	{ hint: 'Gunung tertinggi di dunia', answer: 'everest' },
	{ hint: 'Bahasa pemrograman yang logo-nya kopi ☕', answer: 'java' },
	{ hint: 'Ibukota Jepang', answer: 'tokyo' },
	{ hint: 'Benda langit yang paling dekat dengan bumi', answer: 'bulan' },
	{ hint: 'Hewan tercepat di darat', answer: 'cheetah' },
	{ hint: 'Samudra terbesar di dunia', answer: 'pasifik' },
	{ hint: 'Unsur kimia dengan simbol Au', answer: 'emas' },
	{ hint: 'Benua terkecil di dunia', answer: 'australia' },
	{ hint: 'Organ tubuh terbesar manusia', answer: 'kulit' },
	{ hint: 'Negara kepulauan terbesar di dunia', answer: 'indonesia' },
	{ hint: 'Benda yang dipakai ninja untuk menembakkan bintang', answer: 'shuriken' },
	{ hint: 'Makanan Jepang dari nasi dan ikan mentah', answer: 'sushi' },
	{ hint: 'Alat musik yang punya 88 tombol', answer: 'piano' },
	{ hint: 'Hewan yang bisa tidur 22 jam sehari', answer: 'koala' },
	{ hint: 'Benda yang dipakai untuk melihat benda jauh di langit', answer: 'teleskop' },
	{ hint: 'Buah yang namanya sama dengan warnanya', answer: 'jeruk' },
	{ hint: 'Negara yang terkenal dengan menara miringnya', answer: 'italia' }
]

const pick = arr => arr[Math.floor(Math.random() * arr.length)]

const normalizeAnswer = s => String(s).toLowerCase().replace(/[^a-z0-9\s]/g, '').trim()

export const commands = {
	tebakgambar: async m => {
		const { jid, sender, db, user } = m
		if (hasSession(jid)) {
			await m.reply('⏳ Masih ada game berjalan di chat ini. Jawab dulu atau tunggu timeout.')
			return
		}
		const soal = pick(gambarBank)
		const masked = soal.answer.replace(/[a-z]/g, c => c === ' ' ? ' ' : '_')
		await m.reply([
			'🖼️ *Tebak Gambar*',
			'',
			`Emoji: ${soal.hint}`,
			`Jawaban: \`${masked}\``,
			'',
			'Ketik jawabanmu langsung di chat ini!',
			'⏰ Waktu 30 detik.'
		].join('\n'))
		createSession(jid, { type: 'tebakgambar', answer: normalizeAnswer(soal.answer), sender })
	},

	tebakkata: async m => {
		const { jid, sender, db, user } = m
		if (hasSession(jid)) {
			await m.reply('⏳ Masih ada game berjalan di chat ini. Jawab dulu atau tunggu timeout.')
			return
		}
		const soal = pick(kataBank)
		const masked = soal.answer.replace(/[a-z]/g, c => c === ' ' ? ' ' : '_')
		await m.reply([
			'📝 *Tebak Kata*',
			'',
			`Clue: ${soal.hint}`,
			`Jawaban: \`${masked}\` (${soal.answer.length} huruf)`,
			'',
			'Ketik jawabanmu langsung di chat ini!',
			'⏰ Waktu 30 detik.'
		].join('\n'))
		createSession(jid, { type: 'tebakkata', answer: normalizeAnswer(soal.answer), sender })
	},

	tebakanime: async m => {
		const { jid, sender, db, user, command } = m
		if (hasSession(jid)) {
			await m.reply('⏳ Masih ada game berjalan di chat ini. Jawab dulu atau tunggu timeout.')
			return
		}
		const query = command.text || command.args[0] || ''
		if (!query.trim()) {
			await m.reply(`⚠️ Format: ${command.prefix}tebakanime <genre/keyword>\nContoh: ${command.prefix}tebakanime action`)
			return
		}
		await m.reply('🎌 Cari anime untuk tebakan...')
		try {
			const results = await searchAnime(query)
			if (!results?.length) {
				await m.reply('❌ Anime tidak ditemukan. Coba keyword lain.')
				return
			}
			const anime = pick(results)
			const title = normalizeAnswer(anime.title)
			const masked = anime.title.replace(/[a-zA-Z0-9]/g, '_')
			const hint = anime.title.length > 6
				? anime.title.slice(0, 2) + masked.slice(2, -2) + anime.title.slice(-2)
				: masked
			await m.reply([
				'🎌 *Tebak Anime*',
				'',
				`Judul: \`${hint}\``,
				anime.score ? `⭐ Score: ${anime.score}` : '',
				anime.type ? `📺 Type: ${anime.type}` : '',
				'',
				'Ketik judul anime-nya!',
				'⏰ Waktu 30 detik.'
			].filter(Boolean).join('\n'))
			createSession(jid, { type: 'tebakanime', answer: title, sender })
		} catch (error) {
			await m.reply(`❌ Gagal ambil data anime: ${error.message || error}`)
		}
	},

	// Check jawaban tebak — dipanggil dari handler.js saat bukan command
	_checkTebak: async m => {
		const { jid, sender, db, text } = m
		const session = getSession(jid)
		if (!session || session.sender !== sender) return false

		const guess = normalizeAnswer(text)
		if (guess === session.answer) {
			deleteSession(jid)
			const user = db.getUser(sender)
			const xpResult = addGameXp(user, TEBAK_XP)
			await db.save()
			const lines = [
				'✅ *Benar!* 🎉',
				`Jawaban: *${session.answer}*`,
				`🎁 +${TEBAK_XP} XP`
			]
			if (xpResult.leveledUp) {
				lines.push('', `🏆 *Level Up!* Sekarang Level ${xpResult.level}`)
			}
			await m.reply(lines.join('\n'))
			return true
		}
		return false
	}
}
