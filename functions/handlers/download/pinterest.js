import { isText, noText } from '../../../lib/global.js'
import { scrapePinterestForReply, savePinterestSession, sendPinterestSessionPhoto, nextPinterestSession } from '../../../lib/pinterest.js'
import { sendPinterestButtons } from '../../../lib/reply.js'

export const commands = {
	pin: async m => {
		const { command, message, replyJid, jid, sock } = m
		const cmd = command.name
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		if (!isText(command)) {
			await m.reply(noText(command.prefix, cmd, 'anime girl'), quoted)
			return
		}
		await m.reply('📌 Ambil Pinterest...')
		try {
			const result = await scrapePinterestForReply(command.text)
			if (!result.ok) {
				await m.reply(result.text)
				return
			}
			if (result.images.length) {
				try {
					const session = savePinterestSession({ jid: targetJid, sender: m.sender, result })
					await sendPinterestSessionPhoto({ sock, jid: targetJid, session, quoted })
				} catch (error) {
					m.logger.warn({ error, command: cmd }, 'pinterest media send failed')
					await m.reply('⚠️ Link Pinterest berhasil diambil, tapi beberapa media gagal dikirim WhatsApp. Coba buka/copy link di pesan atas.', quoted)
				}
			} else {
				await sendPinterestButtons(sock, targetJid, {
					text: result.text,
					mediaUrl: result.firstMediaUrl,
					sourceUrl: result.sourceUrl
				}, quoted)
			}
		} catch (error) {
			await m.reply(`❌ Gagal scrape Pinterest: ${error.message || error}`)
		}
	},
	pinterest: async m => await m.commands.pin(m),
	pins: async m => await m.commands.pin(m),
	pinnext: async m => {
		const { command, message, replyJid, jid, sock } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		const session = nextPinterestSession({ jid: targetJid, sender: m.sender })
		if (!session) {
			await m.reply(`Session Pinterest habis. Pakai ${command.prefix}pin <query> lagi.`)
			return
		}
		try {
			await sendPinterestSessionPhoto({ sock, jid: targetJid, session, quoted })
		} catch (error) {
			m.logger.warn({ error, command: command.name }, 'pinterest media send failed')
			await m.reply('⚠️ Foto ini gagal dikirim WhatsApp. Tekan Next Photo lagi atau ulangi pencarian.')
		}
	},
	nextpin: async m => await m.commands.pinnext(m)
}
