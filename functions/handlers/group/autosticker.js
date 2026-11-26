import { toSticker } from '@shikytemo/shitools'
import { isMedia } from '../../../lib/global.js'
import { withContextInfo } from '../../../lib/reply-style.js'
import { sendRichButtons } from '../../../lib/reply.js'
import { quickReplyButton } from 'shileys'

export const commands = {
	autosticker: async m => {
		const { jid, db, isGroupAdmin, isOwner, command, sock, message, replyJid } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		if (!jid.endsWith('@g.us')) {
			await m.reply('⚠️ Command ini hanya bisa dipakai di grup.')
			return
		}
		if (!isGroupAdmin && !isOwner) {
			await m.reply('⚠️ Hanya admin grup yang bisa mengatur auto-sticker.')
			return
		}

		const chat = db.getChat(jid)
		chat.autoSticker = !chat.autoSticker
		await db.save()

		const status = chat.autoSticker ? '✅ ᴀᴋᴛɪғ' : '❌ ɴᴏɴᴀᴋᴛɪғ'
		await sendRichButtons(sock, targetJid, {
			text: [
				'╭━━━ 🃏 *ᴀᴜᴛᴏ-sᴛɪᴄᴋᴇʀ* ━━━╮',
				'┃',
				`┃  📊 sᴛᴀᴛᴜs ⌁ ${status}`,
				'┃',
				'┃  Setiap gambar yang dikirim',
				'┃  di grup ini akan otomatis',
				'┃  dijadikan sticker.',
				'┃',
				'╰━━━━━━━━━━━━━━━━━━╯'
			].join('\n'),
			title: 'Auto-Sticker',
			quickReplies: [
				{ text: '⚙️ sᴇᴛᴛɪɴɢs', id: `${command.prefix}groupsetting` },
				{ text: '📋 ᴍᴇɴᴜ', id: `${command.prefix}menu` }
			]
		}, quoted)
	}
}

export const processAutoSticker = async m => {
	const { jid, db, sock, message } = m
	if (!jid.endsWith('@g.us')) return false

	const chat = db.getChat(jid)
	if (!chat.autoSticker) return false

	const content = message.message || {}
	const imageMsg = content.imageMessage
	if (!imageMsg) return false

	try {
		const media = await m.download()
		if (!media?.buffer) return false

		const sticker = await toSticker({ buffer: media.buffer, mimetype: media.info.mimetype })
		const targetJid = m.replyJid || jid
		await sock.sendMessage(targetJid, await withContextInfo(sock, { sticker }), {
			quoted: m.quoted
		})
		return true
	} catch (error) {
		m.logger?.warn?.({ error }, 'auto-sticker failed')
		return false
	}
}
