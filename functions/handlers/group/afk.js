import { setAfk, getAfk, removeAfk, formatAfk } from '../../../lib/afk.js'

export const commands = {
	afk: async m => {
		const { command, sender, db } = m
		const reason = command.text || ''
		setAfk(db, sender, reason)
		await db.save()
		await m.reply([
			'👋 *AFK Mode Aktif*',
			'',
			reason ? `Alasan: _${reason}_` : 'Alasan: _tidak disebutkan_',
			'',
			'Bot akan otomatis reply kalau ada yang tag kamu.'
		].join('\n'))
	}
}

// Called from handler.js when someone mentions an AFK user
export const checkAfkMentions = async (m, mentionedJids) => {
	if (!mentionedJids?.length) return
	const { db, sock, jid, message } = m
	const targetJid = m.replyJid || jid
	const quoted = targetJid === jid ? message : undefined

	for (const mentionedJid of mentionedJids) {
		const afk = getAfk(db, mentionedJid)
		if (afk) {
			const { reply } = await import('../../../lib/reply.js')
			await reply(sock, targetJid, `👤 @${mentionedJid.split('@')[0]} sedang AFK\n${formatAfk(afk)}`, quoted)
		}
	}
}

// Called from handler.js when AFK user sends a message
export const checkAfkReturn = async m => {
	const { sender, db } = m
	const afk = getAfk(db, sender)
	if (afk) {
		removeAfk(db, sender)
		await db.save()
		await m.reply(`👋 Selamat datang kembali! AFK mode dinonaktifkan.`)
	}
}
