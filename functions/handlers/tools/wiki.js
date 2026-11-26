import { isText, noText } from '../../../lib/global.js'
import { wikipediaForReply } from '../../../lib/wikipedia.js'
import { sendRichButtons } from '../../../lib/reply.js'

export const commands = {
	wiki: async m => {
		const { command, message, replyJid, jid, sock } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		if (!isText(command)) {
			await m.reply(noText(command.prefix, command.name, 'Sukarno'))
			return
		}
		await m.reply('📚 ᴄᴀʀɪ ᴅɪ ᴡɪᴋɪᴘᴇᴅɪᴀ...')
		const result = await wikipediaForReply(command.text)
		if (result.ok && result.url) {
			await sendRichButtons(sock, targetJid, {
				text: [
					'╭━━━ 📚 *ᴡɪᴋɪᴘᴇᴅɪᴀ* ━━━╮',
					'┃',
					`┃  ${result.text.slice(0, 3800)}`,
					'┃',
					'╰━━━━━━━━━━━━━━━━━━╯'
				].join('\n'),
				title: '📚 Wikipedia',
				urls: [
					{ text: '🌐 ʙᴜᴋᴀ ᴡɪᴋɪᴘᴇᴅɪᴀ', url: result.url }
				],
				copies: [
					{ text: '📋 ᴄᴏᴘʏ ʟɪɴᴋ', copyText: result.url }
				]
			}, quoted)
		} else {
			await m.reply(result.text)
		}
	},
	wikipedia: async m => await m.commands.wiki(m)
}
