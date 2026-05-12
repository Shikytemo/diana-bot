import { isText, noText } from '../../../lib/global.js'
import { wallhavenForReply } from '../../../lib/wallhaven.js'
import { screenshotForReply } from '../../../lib/screenshot.js'
import { sendUrlButton } from '../../../lib/reply.js'
import { withContextInfo } from '../../../lib/reply-style.js'

export const commands = {
	wp: async m => {
		const { command, message, replyJid, jid, sock } = m
		const cmd = command.name
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		if (!isText(command)) {
			await m.reply(noText(command.prefix, cmd, 'cyberpunk'))
			return
		}
		await m.reply('🖼️ Cari wallpaper...')
		const result = await wallhavenForReply(command.text)
		if (!result.ok) {
			await m.reply(result.text)
			return
		}
		try {
			await sock.sendMessage(targetJid, await withContextInfo(sock, { image: { url: result.imageUrl }, caption: result.caption }), { quoted })
		} catch (error) {
			m.logger.warn({ error, command: cmd }, 'wallpaper send failed')
			await sendUrlButton(sock, targetJid, {
				text: `${result.caption}\n\n⚠️ Gagal kirim langsung, pakai link.`,
				title: '🖼️ Wallhaven',
				footer: 'Powered by Wallhaven',
				buttonText: 'Buka Wallpaper',
				url: result.pageUrl || result.imageUrl
			}, quoted)
		}
	},
	wallpaper: async m => await m.commands.wp(m),
	wallhaven: async m => await m.commands.wp(m),
	ss: async m => {
		const { command, message, replyJid, jid, sock } = m
		const cmd = command.name
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		if (!isText(command)) {
			await m.reply(noText(command.prefix, cmd, 'https://github.com'))
			return
		}
		await m.reply('📸 Render screenshot... (5-15 detik)')
		const result = await screenshotForReply(command.text)
		if (!result.ok) {
			await m.reply(result.text)
			return
		}
		try {
			await sock.sendMessage(targetJid, await withContextInfo(sock, { image: result.image, caption: result.caption }), { quoted })
		} catch (error) {
			m.logger.warn({ error, command: cmd }, 'screenshot send failed')
			await sendUrlButton(sock, targetJid, {
				text: `${result.caption}\n\n⚠️ Gagal kirim langsung, pakai link.`,
				title: '📸 Screenshot',
				footer: 'Powered by mShots',
				buttonText: 'Buka Gambar',
				url: result.imageUrl
			}, quoted)
		}
	},
	screenshot: async m => await m.commands.ss(m)
}
