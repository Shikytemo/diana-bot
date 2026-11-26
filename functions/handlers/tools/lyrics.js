import { isText, noText } from '../../../lib/global.js'
import { fetchLyricsForReply, searchLyricsForReply } from '../../../lib/lyrics.js'
import { sendRichButtons } from '../../../lib/reply.js'

export const commands = {
	lyrics: async m => {
		const { command, message, replyJid, jid, sock } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		if (!isText(command)) {
			await m.reply(noText(command.prefix, command.name, 'someone you loved'), quoted)
			return
		}
		await m.reply('🎵 *ᴄᴀʀɪ ʟɪʀɪᴋ ʟᴀɢᴜ...*')
		const result = command.args[0] === 'search'
			? await searchLyricsForReply(command.args.slice(1).join(' ') || command.text)
			: await fetchLyricsForReply(command.text)
		if (result.ok) {
			await sendRichButtons(sock, targetJid, {
				text: [
					'╭━━━ 🎵 *ʟʏʀɪᴄs* ━━━╮',
					'┃',
					result.text.slice(0, 3800),
					'┃',
					'╰━━━━━━━━━━━━━━━━━━╯'
				].join('\n'),
				title: '🎵 Lyrics',
				footer: '⚡ ɢᴇɴɪᴜs + ʟʏʀɪᴄs.ᴏᴠʜ',
				...(result.url ? { urls: [{ text: '🌐 ʙᴜᴋᴀ ɢᴇɴɪᴜs', url: result.url }] } : {}),
				copies: [{ text: '📋 ᴄᴏᴘʏ ʟɪʀɪᴋ', copyText: result.text.slice(0, 2000) }]
			}, quoted)
		} else {
			await m.reply(result.text)
		}
	},
	lirik: async m => await m.commands.lyrics(m),
	ly: async m => await m.commands.lyrics(m)
}
