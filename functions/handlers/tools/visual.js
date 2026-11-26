import { isText, noText } from '../../../lib/global.js'
import { sendRichButtons } from '../../../lib/reply.js'
import { wallhavenForReply } from '../../../lib/wallhaven.js'
import { screenshotForReply } from '../../../lib/screenshot.js'
import { withContextInfo } from '../../../lib/reply-style.js'

export const commands = {
	wp: async m => {
		const { command, message, replyJid, jid, sock } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		if (!isText(command)) {
			await m.reply(noText(command.prefix, command.name, 'cyberpunk'))
			return
		}
		await m.reply('🖼️ ᴄᴀʀɪ ᴡᴀʟʟᴘᴀᴘᴇʀ...')
		const result = await wallhavenForReply(command.text)
		if (!result.ok) {
			await m.reply(result.text)
			return
		}
		try {
			await sock.sendMessage(targetJid, await withContextInfo(sock, {
				image: { url: result.imageUrl },
				caption: [
					'╭━━━ 🖼️ *ᴡᴀʟʟᴘᴀᴘᴇʀ* ━━━╮',
					'┃',
					`┃  ${result.caption}`,
					'┃',
					'╰━━━━━━━━━━━━━━━━━━╯'
				].join('\n'),
				interactiveButtons: []
			}), { quoted })
		} catch {
			await sendRichButtons(sock, targetJid, {
				text: `${result.caption}\n\n⚠️ Gagal kirim langsung.`,
				title: '🖼️ Wallhaven',
				urls: [
					{ text: '🖼️ ʙᴜᴋᴀ ᴡᴀʟʟᴘᴀᴘᴇʀ', url: result.pageUrl || result.imageUrl }
				]
			}, quoted)
		}
	},
	wallpaper: async m => await m.commands.wp(m),
	wallhaven: async m => await m.commands.wp(m),

	ss: async m => {
		const { command, message, replyJid, jid, sock } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		if (!isText(command)) {
			await m.reply(noText(command.prefix, command.name, 'https://github.com'))
			return
		}
		await m.reply('📸 ʀᴇɴᴅᴇʀ sᴄʀᴇᴇɴsʜᴏᴛ... (5-15 ᴅᴇᴛɪᴋ)')
		const result = await screenshotForReply(command.text)
		if (!result.ok) {
			await m.reply(result.text)
			return
		}
		try {
			await sock.sendMessage(targetJid, await withContextInfo(sock, { image: result.image, caption: result.caption }), { quoted })
		} catch {
			await sendRichButtons(sock, targetJid, {
				text: `${result.caption}\n\n⚠️ Gagal kirim langsung.`,
				title: '📸 Screenshot',
				urls: [
					{ text: '📸 ʙᴜᴋᴀ ɢᴀᴍʙᴀʀ', url: result.imageUrl }
				]
			}, quoted)
		}
	},
	screenshot: async m => await m.commands.ss(m)
}
