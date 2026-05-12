import { isText, noText } from '../../../lib/global.js'
import { resolveDownloader } from '../../../lib/utility-tools.js'
import { sendUrlButton } from '../../../lib/reply.js'

const handleDownload = async m => {
	const { command, message, replyJid, jid, sock } = m
	const cmd = command.name
	const targetJid = replyJid || jid
	const quoted = targetJid === jid ? message : undefined
	if (!isText(command)) {
		await m.reply(noText(command.prefix, cmd, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'), quoted)
		return
	}
	await m.reply('Cek link downloader...')
	try {
		const result = await resolveDownloader({ commandName: cmd, input: command.text })
		if (!result.ok) {
			await m.reply(result.text)
			return
		}
		const url = result.mode === 'direct' ? result.mediaUrl : result.sourceUrl
		await sendUrlButton(sock, targetJid, {
			text: result.text,
			title: `${result.platform} Downloader`,
			footer: result.mode === 'direct' ? 'Powered by yt-dlp' : 'Fallback aman',
			buttonText: result.mode === 'direct' ? 'Buka Media' : 'Buka Halaman',
			url
		}, quoted)
	} catch (error) {
		await m.reply(`Downloader gagal: ${error.message || error}`)
	}
}

export const commands = {
	instagram: handleDownload,
	ig: handleDownload,
	youtube: handleDownload,
	yt: handleDownload,
	ytmp4: handleDownload
}
