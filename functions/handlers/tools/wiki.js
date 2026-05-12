import { isText, noText } from '../../../lib/global.js'
import { wikipediaForReply } from '../../../lib/wikipedia.js'
import { sendUrlButton } from '../../../lib/reply.js'

export const commands = {
	wiki: async m => {
		const { command, message, replyJid, jid, sock } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		if (!isText(command)) {
			await m.reply(noText(command.prefix, command.name, 'Sukarno'))
			return
		}
		await m.reply('📚 Cari di Wikipedia...')
		const result = await wikipediaForReply(command.text)
		if (result.ok && result.url) {
			await sendUrlButton(sock, targetJid, {
				text: result.text,
				title: '📚 Wikipedia',
				footer: 'Powered by Wikipedia',
				buttonText: 'Buka Wikipedia',
				url: result.url
			}, quoted)
		} else {
			await m.reply(result.text)
		}
	},
	wikipedia: async m => await m.commands.wiki(m)
}
