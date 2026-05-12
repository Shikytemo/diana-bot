import { isText, noText } from '../../../lib/global.js'
import { searchOtakudesuForReply, latestOtakudesuForReply, saveOtakudesuSearchSession, sendOtakudesuSearchItem, getOtakudesuStreamForReply, saveOtakudesuStreamSession, sendOtakudesuStream, nextOtakudesuSession, selectOtakudesuEpisode } from '../../../lib/otakudesu.js'

export const commands = {
	otakudesu: async m => {
		const { command, message, replyJid, jid, sock } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		if (!isText(command)) {
			await m.reply(noText(command.prefix, command.name, 'one piece'), quoted)
			return
		}
		await m.reply('🎬 Cari anime Otakudesu...')
		try {
			const result = await searchOtakudesuForReply(command.text)
			if (!result.ok) {
				await m.reply(result.text)
				return
			}
			const session = saveOtakudesuSearchSession({ jid: targetJid, sender: m.sender, result })
			await sendOtakudesuSearchItem({ sock, jid: targetJid, session, quoted })
		} catch (error) {
			await m.reply(`❌ Gagal cari anime Otakudesu: ${error.message || error}`)
		}
	},
	otaku: async m => await m.commands.otakudesu(m),
	otakudesulatest: async m => {
		const { message, replyJid, jid, sock } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		await m.reply('📺 Ambil episode terbaru Otakudesu...')
		try {
			const result = await latestOtakudesuForReply()
			if (!result.ok) {
				await m.reply(result.text)
				return
			}
			const session = saveOtakudesuSearchSession({ jid: targetJid, sender: m.sender, result })
			await sendOtakudesuSearchItem({ sock, jid: targetJid, session, quoted })
		} catch (error) {
			await m.reply(`❌ Gagal ambil latest Otakudesu: ${error.message || error}`)
		}
	},
	otakulatest: async m => await m.commands.otakudesulatest(m),
	otakudesustream: async m => {
		const { command, message, replyJid, jid, sock } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		if (!isText(command)) {
			await m.reply(noText(command.prefix, command.name, 'one piece episode 1100'), quoted)
			return
		}
		await m.reply('🎬 Ambil stream Otakudesu...')
		try {
			const result = await getOtakudesuStreamForReply(command.text)
			if (!result.ok) {
				await m.reply(result.text)
				return
			}
			const session = saveOtakudesuStreamSession({ jid: targetJid, sender: m.sender, result })
			await sendOtakudesuStream({ sock, jid: targetJid, session, quoted })
		} catch (error) {
			await m.reply(`❌ Gagal ambil stream Otakudesu: ${error.message || error}`)
		}
	},
	otakustream: async m => await m.commands.otakudesustream(m),
	otakudesunext: async m => {
		const { command, message, replyJid, jid, sock } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		const session = nextOtakudesuSession({ jid: targetJid, sender: m.sender })
		if (!session) {
			await m.reply(`Session habis. Pakai ${command.prefix}otakudesu <query> lagi.`)
			return
		}
		try {
			if (session.episode?.mirrors?.length) {
				await sendOtakudesuStream({ sock, jid: targetJid, session, quoted })
			} else {
				await sendOtakudesuSearchItem({ sock, jid: targetJid, session, quoted })
			}
		} catch (error) {
			await m.reply(`❌ Gagal kirim hasil: ${error.message || error}`)
		}
	},
	otakunext: async m => await m.commands.otakudesunext(m),
	otakudesuselect: async m => {
		const { command, message, replyJid, jid, sock } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		const selectedIndex = Number(command.args[0])
		if (!Number.isInteger(selectedIndex) || selectedIndex < 1) {
			await m.reply('Pilih episode dari list stream dulu.')
			return
		}
		try {
			const session = await selectOtakudesuEpisode({ jid: targetJid, sender: m.sender, index: selectedIndex })
			if (!session) {
				await m.reply(`Session stream habis. Pakai ${command.prefix}otakudesustream <query> lagi.`)
				return
			}
			await sendOtakudesuStream({ sock, jid: targetJid, session, quoted })
		} catch (error) {
			await m.reply(`❌ Gagal pilih episode: ${error.message || error}`)
		}
	},
	otakuselect: async m => await m.commands.otakudesuselect(m)
}
