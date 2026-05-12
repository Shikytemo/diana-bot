import { isText, noText } from '../../../lib/global.js'
import { detectForReply, translateForReply } from '../../../lib/translate.js'

export const commands = {
	translate: async m => {
		if (!isText(m.command)) {
			await m.reply(noText(m.command.prefix, m.command.name, 'en halo dunia'))
			return
		}
		await m.reply('🌐 Translate...')
		const result = await translateForReply(m.command.text, m.command.args)
		await m.reply(result.text)
	},
	tr: async m => await m.commands.translate(m),
	tl: async m => await m.commands.translate(m),
	detect: async m => {
		if (!isText(m.command)) {
			await m.reply(noText(m.command.prefix, m.command.name, 'selamat pagi'))
			return
		}
		await m.reply('🌐 Cek bahasa...')
		const result = await detectForReply(m.command.text)
		await m.reply(result.text)
	},
	detlang: async m => await m.commands.detect(m),
	dlang: async m => await m.commands.detect(m)
}
