import { isGroupJid, formatGroupSettings, getGroupSettings } from '../../../lib/group-tools.js'
import { toggleGroupFeature } from '../../helpers.js'

export const commands = {
	welcome: async m => await toggleGroupFeature(m, 'welcome', 'Welcome'),
	setwelcome: async m => await m.commands.welcome(m),
	leave: async m => await toggleGroupFeature(m, 'leave', 'Leave'),
	setleave: async m => await m.commands.leave(m),
	antilink: async m => await toggleGroupFeature(m, 'antiLink', 'Anti-link'),
	'anti-link': async m => await m.commands.antilink(m),
	antispam: async m => await toggleGroupFeature(m, 'antiSpam', 'Anti-spam'),
	'anti-spam': async m => await m.commands.antispam(m),
	antidelete: async m => await toggleGroupFeature(m, 'antiDelete', 'Anti-delete'),
	'anti-delete': async m => await m.commands.antidelete(m),
	groupsetting: async m => {
		if (!isGroupJid(m.jid)) {
			await m.reply('Command ini hanya bisa dipakai di grup.')
			return
		}
		await m.reply(formatGroupSettings(getGroupSettings(m.db, m.jid)))
	},
	groupsettings: async m => await m.commands.groupsetting(m)
}
