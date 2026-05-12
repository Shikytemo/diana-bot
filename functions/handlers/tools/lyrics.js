import { isText, noText } from '../../../lib/global.js'
import { fetchLyricsForReply, searchLyricsForReply } from '../../../lib/lyrics.js'
import { sendUrlButton } from '../../../lib/reply.js'

export const commands = {
	lyrics: async m => {
		const { command, message, replyJid, jid, sock } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		if (!isText(command)) {
			await m.reply(noText(command.prefix, command.name, 'someone you loved'), quoted)
			return
		}
		await m.reply('🎵 Cari lyric...')
		const result = command.args[0] === 'search'
			? await searchLyricsForReply(command.args.slice(1).join(' ') || command.text)
			: await fetchLyricsForReply(command.text)
		if (result.ok && result.url) {
			await sendUrlButton(sock, targetJid, {
				text: result.text,
				title: '🎵 Lyrics',
				footer: 'Powered by Genius + lyrics.ovh',
				buttonText: 'Buka Genius',
				url: result.url
			}, quoted)
		} else {
			await m.reply(result.text)
		}
	},
	lirik: async m => await m.commands.lyrics(m),
	ly: async m => await m.commands.lyrics(m)
}
