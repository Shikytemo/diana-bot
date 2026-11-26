import { isText, noText } from '../../../lib/global.js'
import { mediafireForReply } from '../../../lib/mediafire.js'
import { sendRichButtons } from '../../../lib/reply.js'

export const commands = {
	mediafire: async m => {
		const { command, message, replyJid, jid, sock } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		if (!isText(command)) {
			await m.reply(noText(command.prefix, command.name, 'https://www.mediafire.com/file/...'))
			return
		}
		await m.reply('🗂️ ʀᴇsᴏʟᴠᴇ ᴍᴇᴅɪᴀғɪʀᴇ...')
		const result = await mediafireForReply(command.text)
		if (result.ok && result.downloadUrl) {
			await sendRichButtons(sock, targetJid, {
				text: [
					'╭━━━ 🗂️ *ᴍᴇᴅɪᴀғɪʀᴇ* ━━━╮',
					'┃',
					`┃  ${result.text}`,
					'┃',
					'╰━━━━━━━━━━━━━━━━━━╯'
				].join('\n'),
				title: '🗂️ Mediafire',
				urls: [
					{ text: '📥 ᴅᴏᴡɴʟᴏᴀᴅ', url: result.downloadUrl }
				],
				copies: [
					{ text: '📋 ᴄᴏᴘʏ ʟɪɴᴋ', copyText: result.downloadUrl }
				]
			}, quoted)
		} else {
			await m.reply(result.text)
		}
	},
	mf: async m => await m.commands.mediafire(m)
}
