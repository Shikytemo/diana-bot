export const commands = {
	owner: async m => {
		if (!m.config.ownerNumber) {
			await m.reply('Owner belum diset di config.')
			return
		}
		await m.reply(`Owner: ${m.config.ownerNumber}`)
	},
	creator: async m => await m.commands.owner(m),
	id: async m => {
		const { jid, replyJid, sender } = m
		const targetJid = replyJid || jid
		await m.reply(`Chat JID: ${jid}\nReply JID: ${targetJid}\nSender: ${sender}`)
	},
	jid: async m => await m.commands.id(m)
}
