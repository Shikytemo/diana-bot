import { isText, noText } from '../../../lib/global.js'
import { mediafireForReply } from '../../../lib/mediafire.js'
import { sendUrlButton } from '../../../lib/reply.js'

export const commands = {
	mediafire: async m => {
		const { command, message, replyJid, jid, sock } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		if (!isText(command)) {
			await m.reply(noText(command.prefix, command.name, 'https://www.mediafire.com/file/...'), quoted)
			return
		}
		await m.reply('🗂️ Resolve Mediafire...')
		const result = await mediafireForReply(command.text)
		if (result.ok && result.downloadUrl) {
			await sendUrlButton(sock, targetJid, {
				text: result.text,
				title: '🗂️ Mediafire',
				footer: 'Direct download',
				buttonText: 'Download',
				url: result.downloadUrl
			}, quoted)
		} else {
			await m.reply(result.text)
		}
	},
	mf: async m => await m.commands.mediafire(m)
}
