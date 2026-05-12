import { isText, noText } from '../../../lib/global.js'
import { getSamehadakuStream, saveSamehadakuSession, sendSamehadakuVideo, nextSamehadakuSession, sendSamehadakuStream, selectSamehadakuEpisode } from '../../../lib/samehadaku.js'

export const commands = {
	stream: async m => {
		const { command, message, replyJid, jid, sock } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		if (!isText(command)) {
			await m.reply(noText(command.prefix, command.name, 'gnosia episode 20'), quoted)
			return
		}
		await m.reply('🎬 Ambil stream Samehadaku...')
		try {
			const result = await getSamehadakuStream(command.text)
			if (!result.ok) {
				await m.reply(result.text)
				return
			}
			const session = saveSamehadakuSession({ jid: targetJid, sender: m.sender, result })
			await sendSamehadakuVideo({ sock, jid: targetJid, session, quoted })
		} catch (error) {
			await m.reply(`❌ Gagal ambil stream Samehadaku: ${error.message || error}`)
		}
	},
	samehadaku: async m => await m.commands.stream(m),
	nonton: async m => await m.commands.stream(m),
	streamnext: async m => {
		const { command, message, replyJid, jid, sock } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		const session = nextSamehadakuSession({ jid: targetJid, sender: m.sender })
		if (!session) {
			await m.reply(`Session stream habis. Pakai ${command.prefix}stream <url/query> lagi.`)
			return
		}
		await sendSamehadakuStream({ sock, jid: targetJid, session, quoted })
	},
	nextstream: async m => await m.commands.streamnext(m),
	streamselect: async m => {
		const { command, message, replyJid, jid, sock } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		const selectedIndex = Number(command.args[0])
		if (!Number.isInteger(selectedIndex) || selectedIndex < 1) {
			await m.reply('Pilih episode dari list stream dulu.')
			return
		}
		try {
			const session = await selectSamehadakuEpisode({ jid: targetJid, sender: m.sender, index: selectedIndex })
			if (!session) {
				await m.reply(`Session stream habis. Pakai ${command.prefix}stream <url/query> lagi.`)
				return
			}
			await sendSamehadakuStream({ sock, jid: targetJid, session, quoted })
		} catch (error) {
			await m.reply(`❌ Gagal pilih episode: ${error.message || error}`)
		}
	},
	pilihstream: async m => await m.commands.streamselect(m)
}
