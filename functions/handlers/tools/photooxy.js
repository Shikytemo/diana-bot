import { photooxyGenerate, photooxyListText, getPhotooxyById } from '../../../lib/photooxy.js'

export const commands = {
	photooxy: async m => {
		const { command, download } = m
		const effectId = command.args[0]?.toLowerCase()
		if (!effectId) {
			const list = photooxyListText()
			const chunks = []
			const lines = list.split('\n')
			let chunk = '🖼️ *Photooxy Effects*\n\n'
			for (const line of lines) {
				if (chunk.length + line.length + 1 > 4000) {
					chunks.push(chunk)
					chunk = ''
				}
				chunk += line + '\n'
			}
			if (chunk) chunks.push(chunk)
			if (chunks.length === 1) {
				await m.reply(chunks[0])
			} else {
				await m.reply(chunks[0] + '\n\n... dan masih banyak lagi. Ketik .photooxy <id> <teks>')
			}
			return
		}

		if (effectId === 'list') {
			await m.reply(photooxyListText())
			return
		}

		const effect = getPhotooxyById(effectId)
		if (!effect) {
			await m.reply(`Efek "${effectId}" tidak ditemukan.\nKetik .photooxy untuk list efek.`)
			return
		}

		const textInput = command.args.slice(effect.texts === 2 ? 1 : 1).join(' ')
		const texts = textInput.split('|').map(t => t.trim()).filter(Boolean)
		if (texts.length < effect.texts) {
			await m.reply(`Efek "${effect.name}" butuh ${effect.texts} teks.\nContoh: .photooxy ${effectId} ${effect.texts === 2 ? 'Hello|World' : 'Hello'}`)
			return
		}

		await m.reply('⏳ Membuat efek Photooxy...')
		const result = await photooxyGenerate(effectId, texts)
		if (!result.ok) {
			await m.reply(result.text)
			return
		}

		try {
			const buffer = await download(result.imageUrl)
			await m.reply({ image: buffer, caption: `🖼️ Photooxy: ${result.effect}` })
		} catch {
			await m.reply(`🖼️ ${result.effect}: ${result.imageUrl}`)
		}
	},

	poxy: async m => await m.commands.photooxy(m)
}
