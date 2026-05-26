import { isText, noText } from '../../../lib/global.js'
import { transformText, styleListText, STYLE_NAMES } from '../../../lib/font.js'

export const commands = {
	font: async m => {
		const { command } = m
		if (!isText(command)) {
			await m.reply([
				'✨ *Font Stylish*',
				'',
				`Format: ${command.prefix}font <style> <teks>`,
				`Contoh: ${command.prefix}font bold Hello World`,
				'',
				`Style tersedia:`,
				styleListText()
			].join('\n'))
			return
		}

		const args = command.text.split(/\s+/)
		const style = args[0]?.toLowerCase()
		const text = args.slice(1).join(' ')

		if (!STYLE_NAMES.includes(style)) {
			await m.reply(`❌ Style "${style}" tidak ditemukan.\n\nStyle tersedia:\n${styleListText()}`)
			return
		}
		if (!text) {
			await m.reply(`⚠️ Teks belum diisi.\nContoh: ${command.prefix}font ${style} Hello World`)
			return
		}

		const result = transformText(text, style)
		await m.reply(result)
	},

	style: async m => await m.commands.font(m)
}
