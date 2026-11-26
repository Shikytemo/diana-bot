import { isText, noText } from '../../../lib/global.js'
import { googleSearchForReply } from '../../../lib/google.js'
import { sendRichButtons } from '../../../lib/reply.js'

export const commands = {
	google: async m => {
		const { command, sock, message, replyJid, jid } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		if (!isText(command)) {
			await m.reply(noText(command.prefix, command.name, 'WhatsApp bot'))
			return
		}
		await m.reply('🔍 *ᴄᴀʀɪ ᴅɪ ɢᴏᴏɢʟᴇ...*')
		const result = await googleSearchForReply(command.text)
		const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(command.text)}`
		await sendRichButtons(sock, targetJid, {
			text: [
				'╭━━━ 🔍 *ɢᴏᴏɢʟᴇ sᴇᴀʀᴄʜ* ━━━╮',
				'┃',
				result.text.slice(0, 3800),
				'┃',
				'╰━━━━━━━━━━━━━━━━━━━━━╯'
			].join('\n'),
			title: '🔍 Google Search',
			urls: [{ text: '🌐 ʙᴜᴋᴀ ɢᴏᴏɢʟᴇ', url: searchUrl }],
			copies: [{ text: '📋 ᴄᴏᴘʏ ʜᴀsɪʟ', copyText: result.text.slice(0, 2000) }]
		}, quoted)
	},

	g: async m => await m.commands.google(m)
}
