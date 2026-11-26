import { evalCode, formatEvalResult } from '../../helpers.js'
import { isText, noText } from '../../../lib/global.js'
import { sendRichButtons, sendHTML } from '../../../lib/reply.js'

export const commands = {
	eval: async m => {
		const { command, sock, message, replyJid, jid } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		if (!m.isOwner) {
			await m.reply('⚠️ Command ini hanya untuk owner.')
			return
		}
		if (!isText(command)) {
			await m.reply(noText(command.prefix, command.name, '1 + 1'))
			return
		}
		try {
			const result = await evalCode(command.text, m)
			const formatted = formatEvalResult(result)
			await sendRichButtons(sock, targetJid, {
				text: [
					'╭━━━ ✅ *ᴇᴠᴀʟ ʀᴇsᴜʟᴛ* ━━━╮',
					'┃',
					`\`\`\`\n${formatted}\n\`\`\``,
					'┃',
					'╰━━━━━━━━━━━━━━━━━━╯'
				].join('\n'),
				title: '⚡ Eval',
				copies: [{ text: '📋 ᴄᴏᴘʏ ʀᴇsᴜʟᴛ', copyText: formatted.slice(0, 2000) }],
				quickReplies: [{ text: '🔄 ʀᴇ-ʀᴜɴ', id: `${command.prefix}ev ${command.text}` }]
			}, quoted)
		} catch (error) {
			const errStr = String(error.stack || error.message || error)
			await sendRichButtons(sock, targetJid, {
				text: [
					'╭━━━ ❌ *ᴇᴠᴀʟ ᴇʀʀᴏʀ* ━━━╮',
					'┃',
					`\`\`\`\n${errStr.slice(0, 3500)}\n\`\`\``,
					'┃',
					'╰━━━━━━━━━━━━━━━━━━╯'
				].join('\n'),
				title: '❌ Eval Error',
				copies: [{ text: '📋 ᴄᴏᴘʏ ᴇʀʀᴏʀ', copyText: errStr.slice(0, 2000) }]
			}, quoted)
		}
	},
	ev: async m => await m.commands.eval(m)
}
