import { isText, noText } from '../../../lib/global.js'
import { formatRoles } from '../../../lib/roles.js'
import { sendRichButtons } from '../../../lib/reply.js'
import { quickReplyButton } from 'shileys'

export const commands = {
	register: async m => {
		const { command, sock, message, replyJid, jid } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		m.user.registered = true
		m.user.registeredAt ||= new Date().toISOString()
		await m.db.save()
		m.isMember = true
		m.isUnregister = false
		m.roles.labels = m.roles.labels.filter(label => label !== 'unregister')
		if (!m.roles.labels.includes('member')) {
			m.roles.labels.splice(Math.max(m.roles.labels.indexOf('user'), 0), 0, 'member')
		}
		await sendRichButtons(sock, targetJid, {
			text: [
				'╭━━━ ✅ *ʀᴇɢɪsᴛᴇʀ ʙᴇʀʜᴀsɪʟ* ━━━╮',
				'┃',
				`┃  👤 ɴᴀᴍᴀ   ⌁ ${m.user.name || '-'}`,
				`┃  🎭 ʀᴏʟᴇ   ⌁ ✅ ᴍᴇᴍʙᴇʀ`,
				`┃  📅 ᴛᴀɴɢɢᴀʟ ⌁ ${new Date().toLocaleDateString('id-ID')}`,
				'┃',
				'╰━━━━━━━━━━━━━━━━━━╯'
			].join('\n'),
			title: 'Register',
			quickReplies: [
				{ text: '👤 ᴘʀᴏғɪʟᴇ', id: `${command.prefix}role` },
				{ text: '📋 ᴍᴇɴᴜ', id: `${command.prefix}menu` }
			]
		}, quoted)
	},
	daftar: async m => await m.commands.register(m),
	unregister: async m => {
		m.user.registered = false
		m.user.unregisteredAt = new Date().toISOString()
		await m.db.save()
		await m.reply('❌ Status member dihapus. Kamu sekarang unregister.')
	},
	unreg: async m => await m.commands.unregister(m),
	setnama: async m => {
		const { command, sock, message, replyJid, jid } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		const name = command.text.trim().replace(/\s+/g, ' ')
		if (!name) {
			await m.reply(noText(command.prefix, command.name, 'Diana User'))
			return
		}
		if (name.length > 32) {
			await m.reply('⚠️ Nama maksimal 32 karakter.')
			return
		}
		m.user.name = name
		m.user.nameUpdatedAt = new Date().toISOString()
		await m.db.save()
		await sendRichButtons(sock, targetJid, {
			text: [
				'╭━━━ ✏️ *ɴᴀᴍᴀ ᴅɪᴜʙᴀʜ* ━━━╮',
				'┃',
				`┃  📝 ɴᴀᴍᴀ ⌁ ${name}`,
				'┃',
				'╰━━━━━━━━━━━━━━━━━━╯'
			].join('\n'),
			title: 'Set Nama',
			quickReplies: [
				{ text: '👤 ᴘʀᴏғɪʟᴇ', id: `${command.prefix}role` }
			]
		}, quoted)
	},
	setname: async m => await m.commands.setnama(m),
	nama: async m => await m.commands.setnama(m),
	role: async m => {
		const { command, sock, message, replyJid, jid } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		const roleText = formatRoles(m.roles)
		await sendRichButtons(sock, targetJid, {
			text: roleText,
			title: '👤 ᴘʀᴏғɪʟᴇ',
			quickReplies: [
				{ text: '✏️ sᴇᴛɴᴀᴍᴀ', id: `${command.prefix}setnama ` },
				{ text: '📋 ᴍᴇɴᴜ', id: `${command.prefix}menu` }
			]
		}, quoted)
	},
	profile: async m => await m.commands.role(m),
	me: async m => await m.commands.role(m)
}
