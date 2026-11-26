import { isText, noText } from '../../../lib/global.js'
import { weatherForReply } from '../../../lib/weather.js'
import { bmkgForReply } from '../../../lib/bmkg.js'
import { sendRichButtons } from '../../../lib/reply.js'

export const commands = {
	cuaca: async m => {
		const { command, message, replyJid, jid, sock } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		if (!isText(command)) {
			await m.reply(noText(command.prefix, command.name, 'Jakarta'))
			return
		}
		await m.reply('🌤️ ᴄᴇᴋ ᴄᴜᴀᴄᴀ...')
		const result = await weatherForReply(command.text)
		await sendRichButtons(sock, targetJid, {
			text: [
				'╭━━━ 🌤️ *ᴄᴜᴀᴄᴀ* ━━━╮',
				'┃',
				`┃  ${result.text.slice(0, 3800)}`,
				'┃',
				'╰━━━━━━━━━━━━━━━━━━╯'
			].join('\n'),
			title: '🌤️ Weather',
			quickReplies: [
				{ text: '🇮🇩 ʙᴍᴋɢ', id: `${command.prefix}bmkg ${command.text}` },
				{ text: '📋 ᴍᴇɴᴜ', id: `${command.prefix}menu` }
			]
		}, quoted)
	},
	weather: async m => await m.commands.cuaca(m),
	bmkg: async m => {
		const { command, message, replyJid, jid, sock } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		if (!isText(command)) {
			await m.reply(noText(command.prefix, command.name, 'Sleman'))
			return
		}
		await m.reply('🇮🇩 ᴀᴍʙɪʟ ᴘʀᴀᴋɪʀᴀᴀɴ ʙᴍᴋɢ...')
		const result = await bmkgForReply(command.text)
		await sendRichButtons(sock, targetJid, {
			text: [
				'╭━━━ 🇮🇩 *ʙᴍᴋɢ* ━━━╮',
				'┃',
				`┃  ${result.text.slice(0, 3800)}`,
				'┃',
				'╰━━━━━━━━━━━━━━━━━━╯'
			].join('\n'),
			title: '🇮🇩 BMKG',
			quickReplies: [
				{ text: '🌤️ ᴄᴜᴀᴄᴀ', id: `${command.prefix}cuaca ${command.text}` },
				{ text: '📋 ᴍᴇɴᴜ', id: `${command.prefix}menu` }
			]
		}, quoted)
	}
}
