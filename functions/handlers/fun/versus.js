import { addGameXp } from '../../../lib/game.js'

const SUIT_XP = 15
const TD_XP = 5

const pick = arr => arr[Math.floor(Math.random() * arr.length)]

const suitEmoji = { batu: '✊', kertas: '✋', gunting: '✌️' }
const suitNames = ['batu', 'kertas', 'gunting']

const suitResult = (player, bot) => {
	if (player === bot) return 'draw'
	const wins = { batu: 'gunting', gunting: 'kertas', kertas: 'batu' }
	return wins[player] === bot ? 'win' : 'lose'
}

const truthQuestions = [
	'Apa rahasia terbesar yang pernah kamu simpan?',
	'Siapa orang yang paling kamu kagumi dan kenapa?',
	'Apa hal paling memalukan yang pernah kamu lakukan?',
	'Jika bisa jadi orang lain sehari, siapa yang kamu pilih?',
	'Apa ketakutan terbesar kamu?',
	'Apa hal yang paling kamu sesali?',
	'Siapa crush pertama kamu?',
	'Apa kebohongan terakhir yang kamu bilang?',
	'Kalau bisa punya satu kekuatan super, apa yang kamu pilih?',
	'Apa hal paling childish yang masih kamu lakukan?',
	'Pernah nge-stalk seseorang di sosmed? Siapa?',
	'Apa hal yang paling bikin kamu cemburu?',
	'Jika dunia kiamat besok, apa yang kamu lakukan hari ini?',
	'Apa pendapat kamu yang paling kontroversial?',
	'Pernah nangis karena apa yang kamu lihat di internet?',
	'Apa hal paling jahat yang pernah kamu pikirkan?',
	'Siapa orang yang paling sering kamu pikirin?',
	'Apa hal yang kamu sembunyikan dari orang tuamu?',
	'Kalau bisa balik waktu, momen apa yang mau kamu ulangi?',
	'Apa compliment terbaik yang pernah kamu terima?'
]

const dareChallenges = [
	'Kirim voice note nyanyi 10 detik!',
	'Kirim foto selfie dengan ekspresi paling aneh!',
	'Tag seseorang dan bilang "Aku kangen kamu"!',
	'Kirim pesan ke kontak terakhir kamu: "Aku punya rahasia buat kamu"',
	'Ganti nama profil kamu jadi "Cinta Sejati" selama 1 jam!',
	'Kirim voice note bilang "Aku sayang kalian semua" dengan nada drama!',
	'Tulis status WA: "Aku lagi main truth or dare dan ini dare-ku"!',
	'Kirim foto makanan terdekat dari kamu sekarang!',
	'Kirim pesan ke crush kamu (kalau punya) pake emoji 💕!',
	'Kirim voice note baca puisi buatanmu sendiri!',
	'Ganti foto profil jadi meme selama 30 menit!',
	'Kirim pesan ke 3 kontak: "Kamu cute"!',
	'Bilang sesuatu di grup pake bahasa daerahmu!',
	'Kirim foto langit/pemandangan dari tempat kamu sekarang!',
	'Kirim voice note ketawa selama 5 detik tanpa henti!',
	'Kirim pesan ke orang terakhir yang chat kamu: "Maaf, aku terlalu penuh cinta"!',
	'Tulis 3 fakta tentang dirimu yang nggak ada yang tahu!',
	'Kirim emoji 💃 ke 5 grup sekaligus!',
	'Kirim foto jari kamu yang lagi bikin peace ✌️!',
	'Bilang "Aku admit, aku suka main HP sambil tidur" di grup!'
]

export const commands = {
	suit: async m => {
		const { sender, db, command } = m
		const choice = (command.args[0] || '').toLowerCase()
		const normalized = { batu: 'batu', kertas: 'kertas', gunting: 'gunting', b: 'batu', k: 'kertas', g: 'gunting', rock: 'batu', paper: 'kertas', scissors: 'gunting' }[choice]
		if (!normalized) {
			await m.reply([
				'✊✋✌️ *Batu Gunting Kertas*',
				'',
				`Format: ${command.prefix}suit <batu/kertas/gunting>`,
				`Contoh: ${command.prefix}suit batu`,
				`Alias: b/k/g, rock/paper/scissors`
			].join('\n'))
			return
		}

		const botChoice = pick(suitNames)
		const result = suitResult(normalized, botChoice)

		const user = db.getUser(sender)
		let xp = 3
		let resultText = '❌ Kamu kalah!'
		if (result === 'win') {
			xp = SUIT_XP
			resultText = '✅ Kamu menang! 🎉'
		} else if (result === 'draw') {
			xp = 8
			resultText = '🤝 Seri!'
		}
		const xpResult = addGameXp(user, xp)
		await db.save()

		const lines = [
			'✊✋✌️ *Batu Gunting Kertas*',
			'',
			`Kamu: ${suitEmoji[normalized]} ${normalized.charAt(0).toUpperCase() + normalized.slice(1)}`,
			`Bot: ${suitEmoji[botChoice]} ${botChoice.charAt(0).toUpperCase() + botChoice.slice(1)}`,
			'',
			resultText,
			`🎁 +${xp} XP`
		]
		if (xpResult.leveledUp) {
			lines.push('', `🏆 *Level Up!* Sekarang Level ${xpResult.level}`)
		}
		await m.reply(lines.join('\n'))
	},

	rps: async m => await m.commands.suit(m),

	truth: async m => {
		const { sender, db } = m
		const question = pick(truthQuestions)
		const user = db.getUser(sender)
		const xpResult = addGameXp(user, TD_XP)
		await db.save()

		const lines = [
			'🤔 *Truth*',
			'',
			question,
			'',
			`🎁 +${TD_XP} XP (partisipasi)`
		]
		if (xpResult.leveledUp) {
			lines.push('', `🏆 *Level Up!* Sekarang Level ${xpResult.level}`)
		}
		await m.reply(lines.join('\n'))
	},

	dare: async m => {
		const { sender, db } = m
		const challenge = pick(dareChallenges)
		const user = db.getUser(sender)
		const xpResult = addGameXp(user, TD_XP)
		await db.save()

		const lines = [
			'😈 *Dare*',
			'',
			challenge,
			'',
			`🎁 +${TD_XP} XP (partisipasi)`
		]
		if (xpResult.leveledUp) {
			lines.push('', `🏆 *Level Up!* Sekarang Level ${xpResult.level}`)
		}
		await m.reply(lines.join('\n'))
	}
}
