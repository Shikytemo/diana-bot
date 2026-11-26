import { isText, noText } from '../../../lib/global.js'
import { detectForReply, translateForReply } from '../../../lib/translate.js'
import { sendRichButtons } from '../../../lib/reply.js'

export const commands = {
	translate: async m => {
		const { command, sock, message, replyJid, jid } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		if (!isText(command)) {
			await m.reply(noText(command.prefix, command.name, 'en halo dunia'))
			return
		}
		await m.reply('🌐 *ᴛʀᴀɴsʟᴀᴛᴇ...*')
		const result = await translateForReply(command.text, command.args)
		await sendRichButtons(sock, targetJid, {
			text: [
				'╭━━━ 🌐 *ᴛʀᴀɴsʟᴀᴛᴇ* ━━━╮',
				'┃',
				result.text,
				'┃',
				'╰━━━━━━━━━━━━━━━━━━╯'
			].join('\n'),
			title: '🌐 Translator',
			copies: [{ text: '📋 ᴄᴏᴘʏ ʜᴀsɪʟ', copyText: result.translated || result.text }],
			quickReplies: [{ text: '📋 ᴍᴇɴᴜ', id: `${command.prefix}menu` }]
		}, quoted)
	},
	tr: async m => await m.commands.translate(m),
	tl: async m => await m.commands.translate(m),
	detect: async m => {
		const { command, sock, message, replyJid, jid } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		if (!isText(command)) {
			await m.reply(noText(command.prefix, command.name, 'selamat pagi'))
			return
		}
		await m.reply('🌐 *ᴄᴇᴋ ʙᴀʜᴀsᴀ...*')
		const result = await detectForReply(command.text)
		await sendRichButtons(sock, targetJid, {
			text: [
				'╭━━━ 🌐 *ᴅᴇᴛᴇᴄᴛ ʟᴀɴɢᴜᴀɢᴇ* ━━━╮',
				'┃',
				result.text,
				'┃',
				'╰━━━━━━━━━━━━━━━━━━━━━━━╯'
			].join('\n'),
			title: '🌐 Language Detector',
			quickReplies: [
				{ text: '🌐 ᴛʀᴀɴsʟᴀᴛᴇ ᴇɴ', id: `${command.prefix}tr en ${command.text}` },
				{ text: '🌐 ᴛʀᴀɴsʟᴀᴛᴇ ɪᴅ', id: `${command.prefix}tr id ${command.text}` }
			]
		}, quoted)
	},
	detlang: async m => await m.commands.detect(m),
	dlang: async m => await m.commands.detect(m)
}
