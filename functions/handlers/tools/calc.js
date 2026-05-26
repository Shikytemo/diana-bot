import { isText, noText } from '../../../lib/global.js'
import { calcForReply } from '../../../lib/calc.js'

export const commands = {
	calc: async m => {
		const { command } = m
		if (!isText(command)) {
			await m.reply(noText(command.prefix, command.name, '2+3*4'))
			return
		}
		const result = calcForReply(command.text)
		await m.reply(result.text)
	},

	math: async m => await m.commands.calc(m)
}
