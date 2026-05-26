import { isText, noText } from '../../../lib/global.js'
import { movieForReply } from '../../../lib/movie.js'
import { sendUrlButton } from '../../../lib/reply.js'
import { withContextInfo } from '../../../lib/reply-style.js'

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
		await m.reply('🎬 Cari film...')
		const result = await movieForReply(command.text)
		if (!result.ok) {
			await m.reply(result.text)
			return
		}
		if (result.poster) {
			try {
				await sock.sendMessage(targetJid, await withContextInfo(sock, {
					image: { url: result.poster },
					caption: result.text
				}), { quoted })
			} catch {
				await m.reply(result.text)
			}
		} else if (result.url) {
			await sendUrlButton(sock, targetJid, {
				text: result.text,
				title: '🎬 Movie',
				footer: 'Powered by OMDb',
				buttonText: 'Buka IMDB',
				url: result.url
			}, quoted)
		} else {
			await m.reply(result.text)
		}
	},

	film: async m => await m.commands.movie(m)
}
