import { isText, noText } from '../../../lib/global.js'
import { calcForReply } from '../../../lib/calc.js'
import { sendRichButtons } from '../../../lib/reply.js'

export const commands = {
	calc: async m => {
		const { command, sock, message, replyJid, jid } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		if (!isText(command)) {
			await m.reply(noText(command.prefix, command.name, '2+3*4'))
			return
		}
		const result = calcForReply(command.text)
		await sendRichButtons(sock, targetJid, {
			text: [
				'╭━━━ 🧮 *ᴋᴀʟᴋᴜʟᴀᴛᴏʀ* ━━━╮',
				'┃',
				result.text,
				'┃',
				'╰━━━━━━━━━━━━━━━━━━╯'
			].join('\n'),
			title: '🧮 Calculator',
			copies: [{ text: '📋 ᴄᴏᴘʏ ʜᴀsɪʟ', copyText: String(result.value ?? result.text) }]
		}, quoted)
	},

	math: async m => await m.commands.calc(m)
}
