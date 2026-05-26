export const commands = {
	tagall: async m => {
		const { jid, sock, message, isGroupAdmin, isOwner, text, command } = m
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

		const header = command.text || '📢 Pengumuman'
		const body = `${header}\n\n${mentionText}`

		await sock.sendMessage(jid, { text: body, mentions })
	},

	everyone: async m => await m.commands.tagall(m)
}
