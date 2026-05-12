import { isText, noText } from '../../../lib/global.js'
import { spotifySearchForReply, saveSpotifySearchSession, sendSpotifySearchItem, spotifyDlForReply, sendSpotifyDl, nextSpotifySession } from '../../../lib/spotify.js'

export const commands = {
	spotify: async m => {
		const { command, message, replyJid, jid, sock } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		if (!isText(command)) {
			await m.reply(noText(command.prefix, command.name, 'imagine dragons'), quoted)
			return
		}
		await m.reply('🎵 Cari lagu Spotify...')
		try {
			const result = await spotifySearchForReply(command.text)
			if (!result.ok) {
				await m.reply(result.text)
				return
			}
			const session = saveSpotifySearchSession({ jid: targetJid, sender: m.sender, result })
			await sendSpotifySearchItem({ sock, jid: targetJid, session, quoted })
		} catch (error) {
			await m.reply(`❌ Gagal cari Spotify: ${error.message || error}`)
		}
	},
	sp: async m => await m.commands.spotify(m),
	spotifydl: async m => {
		const { command, message, replyJid, jid, sock } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		if (!isText(command)) {
			await m.reply(noText(command.prefix, command.name, 'https://open.spotify.com/track/...'), quoted)
			return
		}
		await m.reply('🎵 Ambil info Spotify...')
		try {
			const result = await spotifyDlForReply(command.text)
			if (!result.ok) {
				await m.reply(result.text)
				return
			}
			await sendSpotifyDl({ sock, jid: targetJid, result, quoted })
		} catch (error) {
			await m.reply(`❌ Gagal download Spotify: ${error.message || error}`)
		}
	},
	spdl: async m => await m.commands.spotifydl(m),
	spotifynext: async m => {
		const { command, message, replyJid, jid, sock } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		const session = nextSpotifySession({ jid: targetJid, sender: m.sender })
		if (!session) {
			await m.reply(`Session habis. Pakai ${command.prefix}spotify <query> lagi.`)
			return
		}
		try {
			await sendSpotifySearchItem({ sock, jid: targetJid, session, quoted })
		} catch (error) {
			await m.reply(`❌ Gagal kirim hasil: ${error.message || error}`)
		}
	},
	spnext: async m => await m.commands.spotifynext(m)
}
