import { toAudio, toPTT, toSticker, toVideo } from '@shikytemo/shitools'
import { isMedia, noMedia } from '../../../lib/global.js'

export const commands = {
	sticker: async m => {
		const { command, message, replyJid, jid, sock } = m
		const cmd = command.name
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		if (!isMedia(message)) {
			await m.reply(noMedia(command.prefix, cmd))
			return
		}
		const media = await m.download()
		if (!media?.info?.mimetype?.startsWith('image/') && !media?.info?.mimetype?.startsWith('video/')) {
			await m.reply('Kirim/reply gambar, GIF, atau video untuk dijadikan sticker.')
			return
		}
		await m.reply('⏳ Sedang membuat sticker...')
		const sticker = await toSticker(media)
		await sock.sendMessage(targetJid, { sticker }, { quoted })
	},
	s: async m => await m.commands.sticker(m),
	toaudio: async m => {
		const { command, message, replyJid, jid, sock } = m
		const cmd = command.name
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		if (!isMedia(message)) {
			await m.reply(noMedia(command.prefix, cmd))
			return
		}
		const media = await m.download()
		if (!media?.info?.mimetype?.startsWith('audio/') && !media?.info?.mimetype?.startsWith('video/')) {
			await m.reply('Kirim/reply audio atau video untuk diubah jadi MP3.')
			return
		}
		await m.reply('⏳ Sedang membuat audio...')
		const audio = await toAudio(media)
		await sock.sendMessage(targetJid, { audio, mimetype: 'audio/mpeg' }, { quoted })
	},
	tomp3: async m => await m.commands.toaudio(m),
	toptt: async m => {
		const { command, message, replyJid, jid, sock } = m
		const cmd = command.name
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		if (!isMedia(message)) {
			await m.reply(noMedia(command.prefix, cmd))
			return
		}
		const media = await m.download()
		if (!media?.info?.mimetype?.startsWith('audio/') && !media?.info?.mimetype?.startsWith('video/')) {
			await m.reply('Kirim/reply audio atau video untuk diubah jadi VN.')
			return
		}
		await m.reply('⏳ Sedang membuat voice note...')
		const audio = await toPTT(media)
		await sock.sendMessage(targetJid, { audio, mimetype: 'audio/ogg; codecs=opus', ptt: true }, { quoted })
	},
	vn: async m => await m.commands.toptt(m),
	tovid: async m => {
		const { command, message, replyJid, jid, sock } = m
		const cmd = command.name
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		if (!isMedia(message)) {
			await m.reply(noMedia(command.prefix, cmd))
			return
		}
		const media = await m.download()
		if (media?.info?.mimetype !== 'image/webp') {
			await m.reply('Reply sticker untuk diubah jadi video/GIF.')
			return
		}
		await m.reply('⏳ Sedang membuat video...')
		const video = await toVideo(media)
		await sock.sendMessage(targetJid, { video, mimetype: 'video/mp4', gifPlayback: cmd === 'togif' }, { quoted })
	},
	togif: async m => await m.commands.tovid(m)
}
