export const commands = {
	antiviewonce: async m => {
		const { jid, db, isGroupAdmin, isOwner, command } = m
		if (!jid.endsWith('@g.us')) {
			await m.reply('⚠️ Command ini hanya bisa dipakai di grup.')
			return
		}
		if (!isGroupAdmin && !isOwner) {
			await m.reply('⚠️ Hanya admin grup yang bisa mengatur anti view-once.')
			return
		}

		const chat = db.getChat(jid)
		chat.antiViewOnce = !chat.antiViewOnce
		await db.save()

		const status = chat.antiViewOnce ? 'aktif ✅' : 'nonaktif ❌'
		await m.reply(`👁️ Anti view-once: *${status}*\n\nPesan view-once yang masuk akan disimpan dan dikirim ulang sebagai media biasa.`)
	}
}

// Called from handler.js when a view-once message is received
export const processAntiViewOnce = async m => {
	const { jid, db, sock, message } = m
	if (!jid.endsWith('@g.us')) return false

	const chat = db.getChat(jid)
	if (!chat.antiViewOnce) return false

	const content = message.message || {}
	const viewOnce = content.imageMessage?.viewOnce || content.videoMessage?.viewOnce
	if (!viewOnce) return false

	try {
		const media = await m.download()
		if (!media?.buffer) return false

		const targetJid = m.replyJid || jid
		const mediaType = content.imageMessage ? 'image' : 'video'
		const mimetype = content.imageMessage?.mimetype || content.videoMessage?.mimetype || 'application/octet-stream'
		const mediaContent = { [mediaType]: media.buffer, mimetype, caption: '👁️ View-once di-capture' }

		await sock.sendMessage(targetJid, mediaContent, { quoted: m.quoted })
		return true
	} catch (error) {
		m.logger?.warn?.({ error }, 'anti-view-once failed')
		return false
	}
}
