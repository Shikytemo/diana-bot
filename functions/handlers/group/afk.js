import { setAfk, getAfk, removeAfk, formatAfk } from '../../../lib/afk.js'
import { sendRichButtons } from '../../../lib/reply.js'
import { quickReplyButton } from 'shileys'

export const commands = {
	afk: async m => {
		const { command, sender, db, sock, message, replyJid, jid } = m
		const reason = command.text || ''
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		setAfk(db, sender, reason)
		await db.save()
		await sendRichButtons(sock, targetJid, {
			text: [
				'╭━━━ 👋 *ᴀғᴋ ᴍᴏᴅᴇ ᴀᴋᴛɪғ* ━━━╮',
				'┃',
				`┃  👤 ᴜsᴇʀ   ⌁ @${sender.split('@')[0]}`,
				`┃  💬 ᴀʟᴀsᴀɴ ⌁ ${reason || '_tidak disebutkan_'}`,
				'┃',
				'┃  Bot akan otomatis reply',
				'┃  kalau ada yang tag kamu.',
				'┃',
				'╰━━━━━━━━━━━━━━━━━━╯'
			].join('\n'),
			title: 'AFK Mode',
			quickReplies: [
				{ text: '📋 ᴍᴇɴᴜ', id: `${command.prefix}menu` }
			]
		}, quoted)
	}
}

export const checkAfkMentions = async (m, mentionedJids) => {
	if (!mentionedJids?.length) return
	const { db, sock, jid, message } = m
	const targetJid = m.replyJid || jid
	const quoted = targetJid === jid ? message : undefined

	for (const mentionedJid of mentionedJids) {
		const afk = getAfk(db, mentionedJid)
		if (afk) {
			const { reply } = await import('../../../lib/reply.js')
			await reply(sock, targetJid, `👋 @${mentionedJid.split('@')[0]} sedang AFK\n${formatAfk(afk)}`, quoted)
		}
	}
}

export const checkAfkReturn = async m => {
	const { sender, db } = m
	const afk = getAfk(db, sender)
	if (afk) {
		removeAfk(db, sender)
		await db.save()
		await m.reply('👋 Selamat datang kembali! AFK mode dinonaktifkan.')
	}
}
