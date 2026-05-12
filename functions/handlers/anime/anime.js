import { isText, noText } from '../../../lib/global.js'
import { searchAnimeForReply, saveAnimeSession, sendAnimeSessionItem, topAnimeForReply, seasonAnimeForReply, nextAnimeSession } from '../../../lib/anime.js'

export const commands = {
	anime: async m => {
		const { command, message, replyJid, jid, sock } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		if (!isText(command)) {
			await m.reply(noText(command.prefix, command.name, 'one piece'), quoted)
			return
		}
		await m.reply('🎬 Cari anime...')
		try {
			const result = await searchAnimeForReply(command.text)
			if (!result.ok) {
				await m.reply(result.text)
				return
			}
			const session = saveAnimeSession({ jid: targetJid, sender: m.sender, result })
			await sendAnimeSessionItem({ sock, jid: targetJid, session, quoted })
		} catch (error) {
			await m.reply(`❌ Gagal cari anime: ${error.message || error}`)
		}
	},
	ani: async m => await m.commands.anime(m),
	topanime: async m => {
		const { message, replyJid, jid, sock } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		await m.reply('🏆 Ambil top anime...')
		try {
			const result = await topAnimeForReply()
			const session = saveAnimeSession({ jid: targetJid, sender: m.sender, result })
			await sendAnimeSessionItem({ sock, jid: targetJid, session, quoted })
		} catch (error) {
			await m.reply(`❌ Gagal ambil top anime: ${error.message || error}`)
		}
	},
	topani: async m => await m.commands.topanime(m),
	seasonanime: async m => {
		const { message, replyJid, jid, sock } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		await m.reply('📅 Ambil anime season...')
		try {
			const result = await seasonAnimeForReply()
			const session = saveAnimeSession({ jid: targetJid, sender: m.sender, result })
			await sendAnimeSessionItem({ sock, jid: targetJid, session, quoted })
		} catch (error) {
			await m.reply(`❌ Gagal ambil anime season: ${error.message || error}`)
		}
	},
	season: async m => await m.commands.seasonanime(m),
	animenext: async m => {
		const { command, message, replyJid, jid, sock } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		const session = nextAnimeSession({ jid: targetJid, sender: m.sender, type: 'anime' })
		if (!session) {
			await m.reply(`Session habis. Pakai ${command.prefix}anime <query> lagi.`)
			return
		}
		const selectedIndex = Number(command.args[0])
		if (Number.isInteger(selectedIndex) && selectedIndex >= 1 && selectedIndex <= session.results.length) {
			session.index = selectedIndex - 1
		}
		await sendAnimeSessionItem({ sock, jid: targetJid, session, quoted })
	},
	aninext: async m => await m.commands.animenext(m)
}
