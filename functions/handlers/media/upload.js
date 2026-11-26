import { isMedia, isText, noMedia, noText } from '../../../lib/global.js'
import { uploadMessageMediaToUrl } from '../../../lib/tourl.js'
import { createQrImageUrl, createShortlink, isHttpUrl, readQrFromUrl } from '../../../lib/utility-tools.js'
import { sendRichButtons } from '../../../lib/reply.js'
import { withContextInfo } from '../../../lib/reply-style.js'
import { copyButton, urlButton } from 'shileys'

export const commands = {
	tourl: async m => {
		const { command, message, replyJid, jid, sock } = m
		const cmd = command.name
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		if (!isMedia(message)) {
			await m.reply(noMedia(command.prefix, cmd), quoted)
			return
		}
		await m.reply('☁️ *ᴜᴘʟᴏᴀᴅ ᴍᴇᴅɪᴀ ᴋᴇ ᴄᴀᴛʙᴏx...*')
		const result = await uploadMessageMediaToUrl({ message, logger: m.logger, sock })
		if (result.ok && result.url) {
			await sendRichButtons(sock, targetJid, {
				text: [
					'╭━━━ ☁️ *ᴛᴏ ᴜʀʟ* ━━━╮',
					'┃',
					`┃  🔗 ${result.url}`,
					'┃',
					'╰━━━━━━━━━━━━━━━━━━╯'
				].join('\n'),
				title: '☁️ Catbox Uploader',
				urls: [{ text: '🌐 ʙᴜᴋᴀ ғɪʟᴇ', url: result.url }],
				copies: [{ text: '📋 ᴄᴏᴘʏ ᴜʀʟ', copyText: result.url }]
			}, quoted)
		} else {
			await m.reply(result.text)
		}
	},
	urlfile: async m => await m.commands.tourl(m),

	short: async m => {
		const { command, message, replyJid, jid, sock } = m
		const cmd = command.name
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		if (!isText(command)) {
			await m.reply(noText(command.prefix, cmd, 'https://example.com'), quoted)
			return
		}
		await m.reply('🔗 *ᴍᴇᴍʙᴜᴀᴛ sʜᴏʀᴛʟɪɴᴋ...*')
		try {
			const result = await createShortlink(command.text)
			if (!result.ok) {
				await m.reply(result.text)
				return
			}
			await sendRichButtons(sock, targetJid, {
				text: [
					'╭━━━ 🔗 *sʜᴏʀᴛʟɪɴᴋ* ━━━╮',
					'┃',
					`┃  ${result.text}`,
					'┃',
					'╰━━━━━━━━━━━━━━━━━━╯'
				].join('\n'),
				title: '🔗 Shortlink',
				footer: '⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴛɪɴʏᴜʀʟ',
				urls: [{ text: '🌐 ʙᴜᴋᴀ sʜᴏʀᴛʟɪɴᴋ', url: result.shortUrl }],
				copies: [{ text: '📋 ᴄᴏᴘʏ ʟɪɴᴋ', copyText: result.shortUrl }]
			}, quoted)
		} catch (error) {
			await m.reply(`❌ Shortlink gagal: ${error.message || error}`)
		}
	},
	shortlink: async m => await m.commands.short(m),

	qr: async m => {
		const { command, message, replyJid, jid, sock } = m
		const cmd = command.name
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		if (!isText(command)) {
			await m.reply(noText(command.prefix, cmd, 'https://example.com'), quoted)
			return
		}
		const result = createQrImageUrl(command.text)
		if (!result.ok) {
			await m.reply(result.text)
			return
		}
		await sock.sendMessage(targetJid, await withContextInfo(sock, {
			image: { url: result.imageUrl },
			text: [
				'╭━━━ 📱 *ǫʀ ᴄᴏᴅᴇ* ━━━╮',
				'┃',
				`┃  📝 ${result.data}`,
				'┃',
				'╰━━━━━━━━━━━━━━━━━━╯'
			].join('\n'),
			title: '📱 QR Generator',
			footer: '⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ sʜɪʟᴇʏs',
			interactiveButtons: [
				copyButton('📋 ᴄᴏᴘʏ ᴛᴇxᴛ', result.data),
				urlButton('🖼️ ʙᴜᴋᴀ ɢᴀᴍʙᴀʀ', result.imageUrl)
			]
		}), { quoted })
	},
	qrcode: async m => await m.commands.qr(m),

	readqr: async m => {
		const { command, message, replyJid, jid, sock } = m
		const cmd = command.name
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		let imageUrl = isText(command) && isHttpUrl(command.text) ? command.text.trim() : ''
		if (!imageUrl) {
			if (!isMedia(message)) {
				await m.reply(`⚠️ Kirim/reply gambar QR atau pakai ${command.prefix}${cmd} <url gambar>.`, quoted)
				return
			}
			await m.reply('☁️ *ᴜᴘʟᴏᴀᴅ ɢᴀᴍʙᴀʀ ǫʀ...*')
			const upload = await uploadMessageMediaToUrl({ message, logger: m.logger, sock })
			if (!upload.ok) {
				await m.reply(upload.text)
				return
			}
			imageUrl = upload.url
		}
		await m.reply('🔍 *ᴍᴇᴍʙᴀᴄᴀ ǫʀ...*')
		try {
			const result = await readQrFromUrl(imageUrl)
			await sendRichButtons(sock, targetJid, {
				text: [
					'╭━━━ 📱 *ʜᴀsɪʟ sᴄᴀɴ ǫʀ* ━━━╮',
					'┃',
					`┃  ${result.text}`,
					'┃',
					'╰━━━━━━━━━━━━━━━━━━╯'
				].join('\n'),
				title: '📱 QR Reader',
				copies: [{ text: '📋 ᴄᴏᴘʏ ʜᴀsɪʟ', copyText: result.data || result.text }],
				...(isHttpUrl(result.data) ? { urls: [{ text: '🌐 ʙᴜᴋᴀ ʟɪɴᴋ', url: result.data }] } : {})
			}, quoted)
		} catch (error) {
			await m.reply(`❌ Baca QR gagal: ${error.message || error}`)
		}
	},
	qrread: async m => await m.commands.readqr(m),
	scanqr: async m => await m.commands.readqr(m)
}
