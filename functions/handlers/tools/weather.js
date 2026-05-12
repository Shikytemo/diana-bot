import { isText, noText } from '../../../lib/global.js'
import { weatherForReply } from '../../../lib/weather.js'
import { bmkgForReply } from '../../../lib/bmkg.js'

export const commands = {
	cuaca: async m => {
		if (!isText(m.command)) {
			await m.reply(noText(m.command.prefix, m.command.name, 'Jakarta'))
			return
		}
		await m.reply('🌤️ Cek cuaca...')
		const result = await weatherForReply(m.command.text)
		await m.reply(result.text)
	},
	weather: async m => await m.commands.cuaca(m),
	bmkg: async m => {
		if (!isText(m.command)) {
			await m.reply(noText(m.command.prefix, m.command.name, 'Sleman'))
			return
		}
		await m.reply('🇮🇩 Ambil prakiraan BMKG...')
		const result = await bmkgForReply(m.command.text)
		await m.reply(result.text)
	}
}
