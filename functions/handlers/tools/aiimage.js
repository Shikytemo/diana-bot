import { isText, noText } from '../../../lib/global.js'
import { generateImageForReply, listImageModelsForReply } from '../../../lib/aiimage.js'
import { sendUrlButton } from '../../../lib/reply.js'
import { withContextInfo } from '../../../lib/reply-style.js'

export const commands = {
	image: async m => {
		const { command, message, replyJid, jid, sock } = m
		const cmd = command.name
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		if (!isText(command)) {
			await m.reply(noText(command.prefix, cmd, 'a cyberpunk corgi --width=1024 --height=1024'), quoted)
			return
		}
		await m.reply('🎨 Render gambar AI... (15-30 detik)')
		const result = await generateImageForReply(command.args)
		if (!result.ok) {
			await m.reply(result.text)
			return
		}
		try {
			await sock.sendMessage(targetJid, await withContextInfo(sock, { image: result.image, caption: result.caption }), { quoted })
		} catch (error) {
			m.logger.warn({ error, command: cmd }, 'aiimage send failed')
			await sendUrlButton(sock, targetJid, {
				text: `${result.caption}\n\n⚠️ Gagal upload langsung, pakai link.`,
				title: '🎨 AI Image',
				footer: 'Powered by Pollinations.ai',
				buttonText: 'Buka Gambar',
				url: result.imageUrl
			}, quoted)
		}
	},
	imagine: async m => await m.commands.image(m),
	ai: async m => await m.commands.image(m),
	gen: async m => await m.commands.image(m),
	imagemodels: async m => {
		await m.reply('🧠 Ambil daftar model...')
		const result = await listImageModelsForReply()
		await m.reply(result.text)
	},
	models: async m => await m.commands.imagemodels(m),
	aimodels: async m => await m.commands.imagemodels(m)
}
