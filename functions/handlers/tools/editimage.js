import { isText, noText } from '../../../lib/global.js'
import { editImage, parseEditArgs } from '../../../lib/aiimage-edit.js'
import { withContextInfo } from '../../../lib/reply-style.js'

export const commands = {
	editimage: async m => {
		const { command, message, replyJid, jid, sock } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined

		// Download image from quoted message
		let imageBuffer = null
		m.logger.info('editimage: downloading image...')
		const media = await m.download()
		m.logger.info({ hasBuffer: !!media?.buffer, mimetype: media?.info?.mimetype, size: media?.buffer?.length }, 'editimage: download done')
		if (media?.buffer) {
			imageBuffer = media.buffer
		}

		if (!imageBuffer) {
			await m.reply('Reply gambar yang mau diedit.\n\nFormat: .editimage <prompt>\nContoh: .editimage make it anime style')
			return
		}

		if (!isText(command)) {
			await m.reply(noText(command.prefix, command.name, 'make it anime style'))
			return
		}

		const { prompt } = parseEditArgs(command.args)

		if (!prompt) {
			await m.reply('Prompt kosong! Contoh: .editimage make it anime style')
			return
		}

		await m.reply('🎨 Edit gambar AI... (5-60 detik)')

		try {
			m.logger.info({ prompt, bufferSize: imageBuffer.length }, 'editimage: calling editImage')
			const result = await editImage(prompt, imageBuffer)
			m.logger.info({ sizeKb: result.sizeKb, model: result.model }, 'editimage: editImage success')
			const caption = [
				'🎨 *AI Image Edit*',
				'',
				`📝 Prompt : ${result.prompt}`,
				`🧠 Model  : ${result.model}`,
				`📦 Size   : ${result.sizeKb} KB`,
				'',
				result.model === 'flux' ? 'Powered by Pollinations.ai' : 'Powered by DeepFakeMaker'
			].join('\n')

			await sock.sendMessage(targetJid, await withContextInfo(sock, { image: result.image, caption }), { quoted })
		} catch (error) {
			m.logger.warn({ error, command: command.name }, 'editimage failed')
			await m.reply(`Edit gambar gagal: ${error.message || error}`)
		}
	}
}
