import { sendRichButtons, sendComboButtons } from '../../../lib/reply.js'
import { quickReplyButton } from 'shileys'

export const commands = {
	tagall: async m => {
		const { jid, sock, message, isGroupAdmin, isOwner, command, replyJid } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		if (!jid.endsWith('@g.us')) {
			await m.reply('⚠️ Command ini hanya bisa dipakai di grup.')
			return
		}
		if (!isGroupAdmin && !isOwner) {
			await m.reply('⚠️ Hanya admin grup yang bisa tag semua member.')
			return
		}

		const metadata = await sock.groupMetadata(jid)
		const members = metadata.participants
		const mentions = members.map(p => p.id)
		const mentionText = members.map(p => `@${p.id.split('@')[0]}`).join(' ')

		const header = command.text || '📢 ᴘᴇɴɢᴜᴍᴜᴍᴀɴ'

		await sock.sendMessage(jid, {
			text: [
				'╭━━━ 📢 *ᴛᴀɢ ᴀʟʟ* ━━━╮',
				'┃',
				`┃  📝 ${header}`,
				'┃',
				`┃  👥 ${members.length} ᴍᴇᴍʙᴇʀ`,
				'┃',
				'╰━━━━━━━━━━━━━━━━━━╯',
				'',
				mentionText
			].join('\n'),
			mentions,
			title: 'Tag All',
			footer: '⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ sʜɪʟᴇʏs',
			interactiveButtons: [
				quickReplyButton('📋 ᴍᴇɴᴜ', `${command.prefix}menu`)
			]
		})
	},

	everyone: async m => await m.commands.tagall(m)
}
