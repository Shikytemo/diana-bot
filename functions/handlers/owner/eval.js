import { evalCode, formatEvalResult } from '../../helpers.js'
import { isText, noText } from '../../../lib/global.js'

export const commands = {
	eval: async m => {
		if (!m.isOwner) {
			await m.reply('Command ini hanya untuk owner.')
			return
		}
		if (!isText(m.command)) {
			await m.reply(noText(m.command.prefix, m.command.name, '1 + 1'))
			return
		}
		try {
			const result = await evalCode(m.command.text, m)
			await m.reply(`✅ *Eval Result*\n\n${formatEvalResult(result)}`)
		} catch (error) {
			await m.reply(`❌ *Eval Error*\n\n${error.stack || error.message || error}`)
		}
	},
	ev: async m => await m.commands.eval(m)
}
