// 🎮 GAMES Commands
const BASE = 'https://api.siputzx.my.id'

async function req(url) {
	const r = await fetch(url)
	if (!r.ok) throw new Error(`HTTP ${r.status}`)
	const j = await r.json()
	if (j.status === false || j.error) throw new Error(j.error || 'API error')
	return j.data || j.result || j
}

function kv(obj, max) {
	if (!obj || typeof obj !== 'object') return String(obj)
	return Object.entries(obj).filter(([k, v]) => v != null && typeof v !== 'object').slice(0, max || 20).map(([k, v]) => '*' + k + ':* ' + v).join('\n')
}

export const commands = {
	// Quiz games — show soal + hint, reveal answer
	tebakgambar: async m => {
		await m.reply('🎮 Loading...')
		try {
			const d = await req(`${BASE}/api/games/tebakgambar`)
			await m.sock.sendMessage(m.jid, {
				image: { url: d.img },
				caption: `🎮 *Tebak Gambar #${d.index}*\n\n📝 ${d.deskripsi}`
			})
			await m.reply(`🔑 *Jawaban:* ||${d.jawaban}||`)
		} catch (e) { await m.reply('❌ ' + e.message) }
	},
	caklontong: async m => {
		await m.reply('🎮 Loading...')
		try {
			const d = await req(`${BASE}/api/games/caklontong`)
			await m.reply(`🎮 *Cak Lontong #${d.index}*\n\n❓ *Soal:* ${d.soal}\n💡 _${d.deskripsi}_\n\n🔑 *Jawaban:* ||${d.jawaban}||`)
		} catch (e) { await m.reply('❌ ' + e.message) }
	},
	family100: async m => {
		await m.reply('🎮 Loading...')
		try {
			const d = await req(`${BASE}/api/games/family100`)
			const jwb = Array.isArray(d.jawaban) ? d.jawaban.map((x, i) => `${i + 1}. ${x}`).join('\n') : d.jawaban
			await m.reply(`🎮 *Family 100*\n\n❓ *Soal:* ${d.soal}\n\n📋 *Jawaban:*\n${jwb}`)
		} catch (e) { await m.reply('❌ ' + e.message) }
	},
	tebakbendera: async m => {
		await m.reply('🎮 Loading...')
		try {
			const d = await req(`${BASE}/api/games/tebakbendera`)
			await m.sock.sendMessage(m.jid, {
				image: { url: d.img },
				caption: '🎮 *Tebak Bendera*\n\nNegara apakah ini?'
			})
			await m.reply(`🔑 *Jawaban:* ||${d.name}||`)
		} catch (e) { await m.reply('❌ ' + e.message) }
	},
	tebakkata: async m => {
		await m.reply('🎮 Loading...')
		try {
			const d = await req(`${BASE}/api/games/tebakkata`)
			await m.reply(`🎮 *Tebak Kata #${d.index}*\n\n❓ *Clue:* ${d.soal}\n\n🔑 *Jawaban:* ||${d.jawaban}||`)
		} catch (e) { await m.reply('❌ ' + e.message) }
	},
	tebaklagu: async m => {
		await m.reply('🎮 Loading...')
		try {
			const d = await req(`${BASE}/api/games/tebaklagu`)
			await m.sock.sendMessage(m.jid, {
				audio: { url: d.lagu },
				mimetype: 'audio/mpeg',
				ptt: false
			})
			await m.reply(`🎮 *Tebak Lagu*\n\nJudul lagu apa ini?\n\n🔑 *Jawaban:* ||${d.judul} - ${d.artis}||`)
		} catch (e) { await m.reply('❌ ' + e.message) }
	},
	susunkata: async m => {
		await m.reply('🎮 Loading...')
		try {
			const d = await req(`${BASE}/api/games/susunkata`)
			await m.reply(`🎮 *Susun Kata #${d.index}*\n\n🔤 *Acak:* ${d.soal}\n🏷️ *Tipe:* ${d.tipe}\n\n🔑 *Jawaban:* ||${d.jawaban}||`)
		} catch (e) { await m.reply('❌ ' + e.message) }
	},
	cermat: async m => {
		await m.reply('🎮 Loading...')
		try {
			const d = await req(`${BASE}/api/games/cerdascermat`)
			if (!d) throw new Error('Soal tidak tersedia')
			await m.reply(`🎮 *Cerdas Cermat*\n\n❓ *Soal:* ${d.soal || d.pertanyaan}\n\n🔑 *Jawaban:* ||${d.jawaban}||`)
		} catch (e) { await m.reply('❌ ' + e.message) }
	},
	tebakkimia: async m => {
		await m.reply('🎮 Loading...')
		try {
			const d = await req(`${BASE}/api/games/tebakkimia`)
			await m.reply(`🎮 *Tebak Kimia*\n\n${kv(d)}`)
		} catch (e) { await m.reply('❌ ' + e.message) }
	},
	tebaklirik: async m => {
		await m.reply('🎮 Loading...')
		try {
			const d = await req(`${BASE}/api/games/tebaklirik`)
			await m.reply(`🎮 *Tebak Lirik*\n\n${kv(d)}`)
		} catch (e) { await m.reply('❌ ' + e.message) }
	},
	tebaklogo: async m => {
		await m.reply('🎮 Loading...')
		try {
			const d = await req(`${BASE}/api/games/tebaklogo`)
			await m.reply(`🎮 *Tebak Logo*\n\n${kv(d)}`)
		} catch (e) { await m.reply('❌ ' + e.message) }
	},
	whoami: async m => {
		await m.reply('🎮 Loading...')
		try {
			const d = await req(`${BASE}/api/games/whoami`)
			await m.reply(`🎮 *Who Am I*\n\n${kv(d)}`)
		} catch (e) { await m.reply('❌ ' + e.message) }
	},
	mathquiz: async m => {
		await m.reply('🎮 Loading...')
		try {
			const d = await req(`${BASE}/api/games/mathquiz`)
			await m.reply(`🎮 *Math Quiz*\n\n${kv(d)}`)
		} catch (e) { await m.reply('❌ ' + e.message) }
	},
	flagquiz: async m => {
		await m.reply('🎮 Loading...')
		try {
			const d = await req(`${BASE}/api/games/flagquiz`)
			await m.reply(`🎮 *Flag Quiz*\n\n${kv(d)}`)
		} catch (e) { await m.reply('❌ ' + e.message) }
	},
	wordpuzzle: async m => {
		await m.reply('🎮 Loading...')
		try {
			const d = await req(`${BASE}/api/games/wordpuzzle`)
			await m.reply(`🎮 *Word Puzzle*\n\n${kv(d)}`)
		} catch (e) { await m.reply('❌ ' + e.message) }
	},
	musicquiz: async m => {
		await m.reply('🎮 Loading...')
		try {
			const d = await req(`${BASE}/api/games/musicquiz`)
			await m.reply(`🎮 *Music Quiz*\n\n${kv(d)}`)
		} catch (e) { await m.reply('❌ ' + e.message) }
	},
	gamequiz: async m => {
		await m.reply('🎮 Loading...')
		try {
			const d = await req(`${BASE}/api/games/gamingquiz`)
			await m.reply(`🎮 *Gaming Quiz*\n\n${kv(d)}`)
		} catch (e) { await m.reply('❌ ' + e.message) }
	},
	logoquiz: async m => {
		await m.reply('🎮 Loading...')
		try {
			const d = await req(`${BASE}/api/games/logoquiz`)
			await m.reply(`🎮 *Logo Quiz*\n\n${kv(d)}`)
		} catch (e) { await m.reply('❌ ' + e.message) }
	},
	picquiz: async m => {
		await m.reply('🎮 Loading...')
		try {
			const d = await req(`${BASE}/api/games/picturequiz`)
			await m.reply(`🎮 *Picture Quiz*\n\n${kv(d)}`)
		} catch (e) { await m.reply('❌ ' + e.message) }
	},
	brandquiz: async m => {
		await m.reply('🎮 Loading...')
		try {
			const d = await req(`${BASE}/api/games/brandrecognition`)
			await m.reply(`🎮 *Brand Quiz*\n\n${kv(d)}`)
		} catch (e) { await m.reply('❌ ' + e.message) }
	},
	asahotak: async m => {
		await m.reply('🎮 Loading...')
		try {
			const d = await req(`${BASE}/api/games/asahotak`)
			await m.reply(`🎮 *Asah Otak*\n\n${kv(d)}`)
		} catch (e) { await m.reply('❌ ' + e.message) }
	},
	tts: async m => {
		await m.reply('🎮 Loading...')
		try {
			const d = await req(`${BASE}/api/games/tekatekisilang`)
			await m.reply(`🎮 *TTS*\n\n${kv(d)}`)
		} catch (e) { await m.reply('❌ ' + e.message) }
	},
	visual: async m => {
		await m.reply('🎮 Loading...')
		try {
			const d = await req(`${BASE}/api/games/visualpuzzle`)
			await m.reply(`🎮 *Visual Puzzle*\n\n${kv(d)}`)
		} catch (e) { await m.reply('❌ ' + e.message) }
	},
	levelup: async m => {
		await m.reply('🎮 Loading...')
		try {
			const d = await req(`${BASE}/api/games/levelup`)
			await m.reply(`🎮 *Level Up*\n\n${kv(d)}`)
		} catch (e) { await m.reply('❌ ' + e.message) }
	},
	battleroyale: async m => {
		await m.reply('🎮 Loading...')
		try {
			const d = await req(`${BASE}/api/games/battleroyale`)
			await m.reply(`🎮 *Battle Royale*\n\n${kv(d)}`)
		} catch (e) { await m.reply('❌ ' + e.message) }
	}
}