import { isText, noText } from '../../../lib/global.js'
import { horoscopeForReply, zodiacListText } from '../../../lib/zodiac.js'

export const commands = {
	zodiak: async m => {
		const { command } = m
		if (!isText(command)) {
			await m.reply([
				'🔮 *Zodiak / Horoscope*',
				'',
				`Format: ${command.prefix}zodiak <zodiak>`,
				`Contoh: ${command.prefix}zodiak aries`,
				'',
				zodiacListText()
			].join('\n'))
			return
		}
		if (command.text.toLowerCase() === 'list') {
			await m.reply(zodiacListText())
			return
		}
		await m.reply('🔮 Ambil ramalan...')
		const result = await horoscopeForReply(command.text)
		await m.reply(result.text)
	},

	horo: async m => await m.commands.zodiak(m)
}
