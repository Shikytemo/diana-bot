import { isText, noText } from '../../../lib/global.js'
import { searchAnoboyForReply, latestAnoboyForReply, saveAnoboySearchSession, sendAnoboySearchItem, getAnoboyStreamForReply, saveAnoboyStreamSession, sendAnoboyStream, nextAnoboySession, selectAnoboyEpisode } from '../../../lib/anoboy.js'

export const commands = {
	anoboy: async m => {
		const { command, message, replyJid, jid, sock } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		if (!isText(command)) {
			await m.reply(noText(command.prefix, command.name, 'one piece'), quoted)
			return
		}
		await m.reply('🎬 Cari anime Anoboy...')
		try {
			const result = await searchAnoboyForReply(command.text)
			if (!result.ok) {
				await m.reply(result.text)
				return
			}
			const session = saveAnoboySearchSession({ jid: targetJid, sender: m.sender, result })
			await sendAnoboySearchItem({ sock, jid: targetJid, session, quoted })
		} catch (error) {
			await m.reply(`❌ Gagal cari anime Anoboy: ${error.message || error}`)
		}
	},
	ano: async m => await m.commands.anoboy(m),
	anoboylatest: async m => {
		const { message, replyJid, jid, sock } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		await m.reply('📺 Ambil episode terbaru Anoboy...')
		try {
			const result = await latestAnoboyForReply()
			if (!result.ok) {
				await m.reply(result.text)
				return
			}
			const session = saveAnoboySearchSession({ jid: targetJid, sender: m.sender, result })
			await sendAnoboySearchItem({ sock, jid: targetJid, session, quoted })
		} catch (error) {
			await m.reply(`❌ Gagal ambil latest Anoboy: ${error.message || error}`)
		}
	},
	anolatest: async m => await m.commands.anoboylatest(m),
	anoboystream: async m => {
		const { command, message, replyJid, jid, sock } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		if (!isText(command)) {
			await m.reply(noText(command.prefix, command.name, 'one piece episode 1100'), quoted)
			return
		}
		await m.reply('🎬 Ambil stream Anoboy...')
		try {
			const result = await getAnoboyStreamForReply(command.text)
			if (!result.ok) {
				await m.reply(result.text)
				return
			}
			const session = saveAnoboyStreamSession({ jid: targetJid, sender: m.sender, result })
			await sendAnoboyStream({ sock, jid: targetJid, session, quoted })
		} catch (error) {
			await m.reply(`❌ Gagal ambil stream Anoboy: ${error.message || error}`)
		}
	},
	anostream: async m => await m.commands.anoboystream(m),
	anoboynext: async m => {
		const { command, message, replyJid, jid, sock } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		const session = nextAnoboySession({ jid: targetJid, sender: m.sender })
		if (!session) {
			await m.reply(`Session habis. Pakai ${command.prefix}anoboy <query> lagi.`)
			return
		}
		try {
			if (session.episode?.mirrors?.length) {
				await sendAnoboyStream({ sock, jid: targetJid, session, quoted })
			} else {
				await sendAnoboySearchItem({ sock, jid: targetJid, session, quoted })
			}
		} catch (error) {
			await m.reply(`❌ Gagal kirim hasil: ${error.message || error}`)
		}
	},
	anonext: async m => await m.commands.anoboynext(m),
	anoboyselect: async m => {
		const { command, message, replyJid, jid, sock } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		const selectedIndex = Number(command.args[0])
		if (!Number.isInteger(selectedIndex) || selectedIndex < 1) {
			await m.reply('Pilih episode dari list stream dulu.')
			return
		}
		try {
			const session = await selectAnoboyEpisode({ jid: targetJid, sender: m.sender, index: selectedIndex })
			if (!session) {
				await m.reply(`Session stream habis. Pakai ${command.prefix}anoboystream <query> lagi.`)
				return
			}
			await sendAnoboyStream({ sock, jid: targetJid, session, quoted })
		} catch (error) {
			await m.reply(`❌ Gagal pilih episode: ${error.message || error}`)
		}
	},
	anoselect: async m => await m.commands.anoboyselect(m)
}
