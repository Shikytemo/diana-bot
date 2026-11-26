import { isGroupJid, formatGroupSettings, getGroupSettings } from '../../../lib/group-tools.js'
import { toggleGroupFeature } from '../../helpers.js'
import { sendRichButtons, sendList } from '../../../lib/reply.js'
import { quickReplyButton } from 'shileys'

export const commands = {
	welcome: async m => await toggleGroupFeature(m, 'welcome', '👋 Welcome'),
	setwelcome: async m => await m.commands.welcome(m),
	leave: async m => await toggleGroupFeature(m, 'leave', '🚪 Leave'),
	setleave: async m => await m.commands.leave(m),
	antilink: async m => await toggleGroupFeature(m, 'antiLink', '🔗 Anti-link'),
	'anti-link': async m => await m.commands.antilink(m),
	antispam: async m => await toggleGroupFeature(m, 'antiSpam', '🛡️ Anti-spam'),
	'anti-spam': async m => await m.commands.antispam(m),
	antidelete: async m => await toggleGroupFeature(m, 'antiDelete', '🗑️ Anti-delete'),
	'anti-delete': async m => await m.commands.antidelete(m),
	groupsetting: async m => {
		const { jid, sock, message, replyJid, command } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		if (!isGroupJid(jid)) {
			await m.reply('⚠️ Command ini hanya bisa dipakai di grup.')
			return
		}
		const settings = getGroupSettings(m.db, jid)
		const fmt = formatGroupSettings(settings)
		await sendRichButtons(sock, targetJid, {
			text: fmt,
			title: '⚙️ ɢʀᴏᴜᴘ sᴇᴛᴛɪɴɢs',
			quickReplies: [
				{ text: '👋 ᴡᴇʟᴄᴏᴍᴇ', id: `${command.prefix}welcome` },
				{ text: '🔗 ᴀɴᴛɪʟɪɴᴋ', id: `${command.prefix}antilink` },
				{ text: '🛡️ ᴀɴᴛɪsᴘᴀᴍ', id: `${command.prefix}antispam` }
			]
		}, quoted)
	},
	groupsettings: async m => await m.commands.groupsetting(m)
}
