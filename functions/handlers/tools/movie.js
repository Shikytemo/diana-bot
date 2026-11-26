import { isText, noText } from '../../../lib/global.js'
import { movieForReply } from '../../../lib/movie.js'
import { sendRichButtons } from '../../../lib/reply.js'
import { withContextInfo } from '../../../lib/reply-style.js'
import { urlButton, copyButton } from 'shileys'

export const commands = {
	movie: async m => {
		const { command, message, replyJid, jid, sock } = m
		const cmd = command.name
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		if (!isText(command)) {
			await m.reply(noText(command.prefix, cmd, 'Spiderman'))
			return
		}
		await m.reply('🎬 *ᴄᴀʀɪ ғɪʟᴍ...*')
		const result = await movieForReply(command.text)
		if (!result.ok) {
			await m.reply(result.text)
			return
		}
		const formatted = [
			'╭━━━ 🎬 *ᴍᴏᴠɪᴇ ɪɴғᴏ* ━━━╮',
			'┃',
			result.text,
			'┃',
			'╰━━━━━━━━━━━━━━━━━━╯'
		].join('\n')

		if (result.poster) {
			try {
				const buttons = []
				if (result.url) buttons.push(urlButton('🌐 ʙᴜᴋᴀ ɪᴍᴅʙ', result.url))
				buttons.push(copyButton('📋 ᴄᴏᴘʏ ɪɴғᴏ', result.text.slice(0, 1000)))
				await sock.sendMessage(targetJid, await withContextInfo(sock, {
					image: { url: result.poster },
					text: formatted,
					title: '🎬 Movie Info',
					footer: '⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ sʜɪʟᴇʏs',
					interactiveButtons: buttons
				}), { quoted })
				return
			} catch { /* fallback below */ }
		}
		await sendRichButtons(sock, targetJid, {
			text: formatted,
			title: '🎬 Movie Info',
			footer: '⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴏᴍᴅʙ',
			...(result.url ? { urls: [{ text: '🌐 ʙᴜᴋᴀ ɪᴍᴅʙ', url: result.url }] } : {}),
			copies: [{ text: '📋 ᴄᴏᴘʏ ɪɴғᴏ', copyText: result.text.slice(0, 1000) }]
		}, quoted)
	},

	film: async m => await m.commands.movie(m)
}
