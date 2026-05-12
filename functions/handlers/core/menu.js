import { menuText } from '../../helpers.js'
import { sendMenu } from '../../../lib/reply.js'

export const commands = {
	menu: async m => {
		const { config, message, replyJid, jid, sock } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		await sendMenu(sock, targetJid, config, quoted, m.roles)
	},
	help: async m => await m.commands.menu(m),
	start: async m => await m.commands.menu(m),
	menutext: async m => {
		await m.reply(menuText(m.config, m.command.prefix))
	},
	allmenu: async m => await m.commands.menutext(m)
}
