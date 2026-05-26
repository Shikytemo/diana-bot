import { isText, noText } from '../../../lib/global.js'
import { googleSearchForReply } from '../../../lib/google.js'

export const commands = {
	google: async m => {
		const { command } = m
		if (!isText(command)) {
			await m.reply(noText(command.prefix, command.name, 'WhatsApp bot'))
			return
		}
		await m.reply('🔍 Cari di Google...')
		const result = await googleSearchForReply(command.text)
		await m.reply(result.text)
	},

	g: async m => await m.commands.google(m)
}
