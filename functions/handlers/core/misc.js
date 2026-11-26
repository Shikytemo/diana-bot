import { sendRichButtons } from '../../../lib/reply.js'
import { quickReplyButton, copyButton } from 'shileys'

export const commands = {
	owner: async m => {
		const { config, message, replyJid, jid, sock } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		if (!config.ownerNumber) {
			await m.reply('⚠️ Owner belum diset di config.')
			return
		}
		await sendRichButtons(sock, targetJid, {
			text: [
				'╭━━━ 👑 *ᴏᴡɴᴇʀ ɪɴғᴏ* ━━━╮',
				'┃',
				`┃  📱 ɴᴏᴍᴏʀ  ⌁ ${config.ownerNumber}`,
				`┃  🏷️ ɴᴀᴍᴀ   ⌁ ${config.ownerName || config.name}`,
				'┃',
				'╰━━━━━━━━━━━━━━━━━━╯'
			].join('\n'),
			title: config.name,
			copies: [
				{ text: '📋 ᴄᴏᴘʏ ɴᴏᴍᴏʀ', copyText: config.ownerNumber }
			],
			calls: [
				{ text: '📞 ʜᴜʙᴜɴɢɪ ᴏᴡɴᴇʀ', phoneNumber: config.ownerNumber }
			]
		}, quoted)
	},
	creator: async m => await m.commands.owner(m),

	id: async m => {
		const { jid, replyJid, sender, sock, message, command } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		await sendRichButtons(sock, targetJid, {
			text: [
				'╭━━━ 🔎 *ᴊɪᴅ ɪɴғᴏ* ━━━╮',
				'┃',
				`┃  💬 ᴄʜᴀᴛ   ⌁ ${jid}`,
				`┃  🔗 ʀᴇᴘʟʏ  ⌁ ${targetJid}`,
				`┃  📨 sᴇɴᴅᴇʀ ⌁ ${sender}`,
				'┃',
				'╰━━━━━━━━━━━━━━━━━━╯'
			].join('\n'),
			title: 'JID Info',
			copies: [
				{ text: '📋 ᴄᴏᴘʏ ᴊɪᴅ', copyText: jid },
				{ text: '📋 ᴄᴏᴘʏ sᴇɴᴅᴇʀ', copyText: sender }
			]
		}, quoted)
	},
	jid: async m => await m.commands.id(m)
}
