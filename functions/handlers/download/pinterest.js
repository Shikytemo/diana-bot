import { isText, noText } from '../../../lib/global.js'
import { scrapePinterestForReply, savePinterestSession, sendPinterestSessionPhoto, nextPinterestSession } from '../../../lib/pinterest.js'
import { sendPinterestButtons, sendCarousel, sendAlbum } from '../../../lib/reply.js'
import { copyButton, urlButton, quickReplyButton } from 'shileys'

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
		await m.reply('📌 *ᴍᴇɴᴄᴀʀɪ ᴅɪ ᴘɪɴᴛᴇʀᴇsᴛ...*')
		try {
			const result = await scrapePinterestForReply(command.text)
			if (!result.ok) {
				await m.reply(result.text)
				return
			}
			if (result.images.length > 1) {
				const session = savePinterestSession({ jid: targetJid, sender: m.sender, result })
				const cards = result.images.slice(0, 5).map((item, idx) => ({
					image: { url: item.url },
					title: `📌 ʜᴀsɪʟ #${idx + 1}`,
					body: `🔍 ${command.text}`,
					footer: '⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ sʜɪʟᴇʏs',
					buttons: [
						copyButton('📋 ᴄᴏᴘʏ ʟɪɴᴋ', item.url),
						urlButton('🔗 ʙᴜᴋᴀ ᴘɪɴ', result.sourceUrl || item.url),
						quickReplyButton('📸 ᴀʟʙᴜᴍ', `${command.prefix}pinalbum ${command.text}`)
					]
				}))
				try {
					await sendCarousel(sock, targetJid, {
						text: [
							'╭━━━ 📌 *ᴘɪɴᴛᴇʀᴇsᴛ ᴄᴀʀᴏᴜsᴇʟ* ━━━╮',
							'┃',
							`┃  🔍 ǫᴜᴇʀʏ ⌁ ${command.text}`,
							`┃  🖼️ ᴛᴏᴛᴀʟ ⌁ ${cards.length} ғᴏᴛᴏ`,
							'┃',
							'╰━━━━━━━━━━━━━━━━━━━━━╯'
						].join('\n'),
						title: '📌 Pinterest',
						cards
					}, quoted)
					return
				} catch {
					if (session) {
						await sendPinterestSessionPhoto({ sock, jid: targetJid, session, quoted })
						return
					}
				}
			}
			if (result.images.length) {
				const session = savePinterestSession({ jid: targetJid, sender: m.sender, result })
				await sendPinterestSessionPhoto({ sock, jid: targetJid, session, quoted })
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
	pinalbum: async m => {
		const { command, message, replyJid, jid, sock } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		if (!isText(command)) {
			await m.reply(noText(command.prefix, command.name, 'anime girl'), quoted)
			return
		}
		await m.reply('📸 *ᴍᴇɴɢɪʀɪᴍ ᴀʟʙᴜᴍ ᴘɪɴᴛᴇʀᴇsᴛ...*')
		try {
			const result = await scrapePinterestForReply(command.text)
			if (!result.ok || !result.images.length) {
				await m.reply(result.text || '❌ Media tidak ditemukan.')
				return
			}
			const medias = result.images.slice(0, 6).map((item, idx) => ({
				image: { url: item.url },
				caption: idx === 0 ? `📌 *ᴘɪɴᴛᴇʀᴇsᴛ ᴀʟʙᴜᴍ*\n🔍 ${command.text}` : undefined
			}))
			await sendAlbum(sock, targetJid, medias, {}, quoted)
		} catch (error) {
			await m.reply(`❌ Gagal kirim album: ${error.message || error}`)
		}
	},
	pinnext: async m => {
		const { command, message, replyJid, jid, sock } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		const session = nextPinterestSession({ jid: targetJid, sender: m.sender })
		if (!session) {
			await m.reply(`⚠️ Session Pinterest habis. Pakai ${command.prefix}pin <query> lagi.`)
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
