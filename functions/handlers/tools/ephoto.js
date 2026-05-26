import { ephotoGenerate, ephotoListText, getEphotoById } from '../../../lib/ephoto.js'

export const commands = {
	ephoto: async m => {
		const { command, download } = m
		const effectId = command.args[0]?.toLowerCase()
		if (!effectId) {
			const list = ephotoListText()
			const chunks = []
			const lines = list.split('\n')
			let chunk = '🎨 *ePhoto360 Effects*\n\n'
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
				await m.reply(chunks[0] + '\n\n... dan masih banyak lagi. Ketik .ephoto <id> <teks>')
			}
			return
		}

		if (effectId === 'list') {
			await m.reply(ephotoListText())
			return
		}

		const effect = getEphotoById(effectId)
		if (!effect) {
			await m.reply(`Efek "${effectId}" tidak ditemukan.\nKetik .ephoto untuk list efek.`)
			return
		}

		const textInput = command.args.slice(effect.texts === 2 ? 1 : 1).join(' ')
		const texts = textInput.split('|').map(t => t.trim()).filter(Boolean)
		if (texts.length < effect.texts) {
			await m.reply(`Efek "${effect.name}" butuh ${effect.texts} teks.\nContoh: .ephoto ${effectId} ${effect.texts === 2 ? 'Hello|World' : 'Hello'}`)
			return
		}

		await m.reply('⏳ Membuat efek ePhoto360...')
		const result = await ephotoGenerate(effectId, texts)
		if (!result.ok) {
			await m.reply(result.text)
			return
		}

		try {
			const buffer = await download(result.imageUrl)
			await m.reply({ image: buffer, caption: `🎨 ePhoto360: ${result.effect}` })
		} catch {
			await m.reply(`🎨 ${result.effect}: ${result.imageUrl}`)
		}
	},

	ep: async m => await m.commands.ephoto(m)
}
