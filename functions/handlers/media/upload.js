import { isMedia, isText, noMedia, noText } from '../../../lib/global.js'
import { uploadMessageMediaToUrl } from '../../../lib/tourl.js'
import { createQrImageUrl, createShortlink, isHttpUrl, readQrFromUrl } from '../../../lib/utility-tools.js'
import { sendUrlButton } from '../../../lib/reply.js'
import { withContextInfo } from '../../../lib/reply-style.js'

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
		await m.reply('Upload media ke Catbox...')
		const result = await uploadMessageMediaToUrl({ message, logger: m.logger, sock })
		await m.reply(result.text)
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
		await m.reply('Buat shortlink...')
		try {
			const result = await createShortlink(command.text)
			if (!result.ok) {
				await m.reply(result.text)
				return
			}
			await sendUrlButton(sock, targetJid, {
				text: result.text,
				title: 'Shortlink',
				footer: 'Powered by TinyURL',
				buttonText: 'Buka Shortlink',
				url: result.shortUrl
			}, quoted)
		} catch (error) {
			await m.reply(`Shortlink gagal: ${error.message || error}`)
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
			caption: `QR code:\n${result.data}`
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
				await m.reply(`Kirim/reply gambar QR atau pakai ${command.prefix}${cmd} <url gambar>.`, quoted)
				return
			}
			await m.reply('Upload gambar QR...')
			const upload = await uploadMessageMediaToUrl({ message, logger: m.logger, sock })
			if (!upload.ok) {
				await m.reply(upload.text)
				return
			}
			imageUrl = upload.url
		}
		await m.reply('Baca QR...')
		try {
			const result = await readQrFromUrl(imageUrl)
			await m.reply(result.text)
		} catch (error) {
			await m.reply(`Baca QR gagal: ${error.message || error}`)
		}
	},
	qrread: async m => await m.commands.readqr(m),
	scanqr: async m => await m.commands.readqr(m)
}
