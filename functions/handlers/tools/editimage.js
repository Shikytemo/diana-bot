import { isText, noText } from '../../../lib/global.js'
import { editImage, parseEditArgs } from '../../../lib/aiimage-edit.js'
import { withContextInfo } from '../../../lib/reply-style.js'
import { sendUrlButton } from '../../../lib/reply.js'

export const commands = {
	editimage: async m => {
		const { command, message, replyJid, jid, sock } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined

		// Get image from quoted message or URL in args
		let imageUrl = null
		const quotedMsg = m.quoted || m.msg?.message
		if (quotedMsg) {
			const qMsg = quotedMsg.message || quotedMsg
			imageUrl = qMsg?.imageMessage?.url || qMsg?.extendedTextMessage?.contextInfo?.externalAdReply?.thumbnailUrl
		}

		// Check for URL in text (first arg that looks like URL)
		const args = command.args || []
		const urlArg = args.find(a => /^https?:\/\//i.test(a))
		if (urlArg) {
			imageUrl = urlArg
			// Remove URL from args so it doesn't end up in prompt
			const cleanArgs = args.filter(a => a !== urlArg)
			command.args = cleanArgs
		}

		if (!imageUrl) {
			await m.reply('Reply gambar atau kirim URL gambar.\n\nFormat: .editimage <prompt> --model=flux\n       .editimage https://example.com/img.jpg <prompt>')
			return
		}

		if (!isText(command)) {
			await m.reply(noText(command.prefix, command.name, 'ubah jadi anime --model=flux'))
			return
		}

		const { prompt, options } = parseEditArgs(command.args)

		await m.reply('🎨 Edit gambar AI... (15-30 detik)')

		try {
			const result = await editImage(prompt, imageUrl, options)
			const caption = [
				'🎨 *AI Image Edit*',
				'',
				`📝 Prompt : ${result.prompt}`,
				`🧠 Model  : ${result.model}`,
				`📐 Ukuran : ${result.width}×${result.height}`,
				`📦 Size   : ${result.sizeKb} KB`,
				'',
				'Powered by Pollinations.ai'
			].join('\n')

			await sock.sendMessage(targetJid, await withContextInfo(sock, { image: result.image, caption }), { quoted })
		} catch (error) {
			m.logger.warn({ error, command: command.name }, 'editimage failed')
			await m.reply(`Edit gambar gagal: ${error.message || error}`)
		}
	}
}
