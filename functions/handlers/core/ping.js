import { systemStatusText } from '../../helpers.js'

export const commands = {
	ping: async m => {
		await m.reply(systemStatusText(m, Date.now() - m.startedAt))
	},
	p: async m => await m.commands.ping(m)
}
