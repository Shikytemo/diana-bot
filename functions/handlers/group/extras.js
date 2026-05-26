export const commands = {
	hidetag: async m => {
		const { jid, sock, isGroupAdmin, isOwner, text, command } = m
		if (!jid.endsWith('@g.us')) {
			await m.reply('⚠️ Command ini hanya bisa dipakai di grup.')
			return
		}
		if (!isGroupAdmin && !isOwner) {
			await m.reply('⚠️ Hanya admin grup yang bisa hidetag.')
			return
		}

		const metadata = await sock.groupMetadata(jid)
		const members = metadata.participants
		const mentions = members.map(p => p.id)
		const header = command.text || '📢'

		await sock.sendMessage(jid, { text: header, mentions })
	},

	ht: async m => await m.commands.hidetag(m),

	poll: async m => {
		const { jid, sock, isGroupAdmin, isOwner, command } = m
		if (!jid.endsWith('@g.us')) {
			await m.reply('⚠️ Command ini hanya bisa dipakai di grup.')
			return
		}
		if (!isGroupAdmin && !isOwner) {
			await m.reply('⚠️ Hanya admin grup yang bisa buat poll.')
			return
		}
		if (!command.text) {
			await m.reply(`📊 *Poll*\n\nFormat: ${command.prefix}poll Pertanyaan|Opsi1|Opsi2|Opsi3\nContoh: ${command.prefix}poll Makan apa?|Nasi goreng|Mie ayam|Bakso`)
			return
		}

		const parts = command.text.split('|')
		if (parts.length < 3) {
			await m.reply('⚠️ Minimal butuh 1 pertanyaan + 2 opsi.\nContoh: .poll Pertanyaan|Opsi1|Opsi2')
			return
		}

		const question = parts[0]
		const options = parts.slice(1).map(p => p.trim())

		await sock.sendMessage(jid, {
			poll: {
				name: question,
				values: options,
				selectableCount: 1
			}
		})
	},

	setprefix: async m => {
		const { jid, sock, isOwner, command, config } = m
		if (!isOwner) {
			await m.reply('⚠️ Hanya owner yang bisa ubah prefix.')
			return
		}
		if (!command.text) {
			await m.reply(`Format: ${command.prefix}setprefix <prefix>\nContoh: ${command.prefix}setprefix !`)
			return
		}
		const newPrefix = command.text.trim()
		config.prefixes = [newPrefix]
		await m.reply(`✅ Prefix diubah ke: *${newPrefix}*`)
	},

	block: async m => {
		const { sock, isOwner, command } = m
		if (!isOwner) {
			await m.reply('⚠️ Hanya owner.')
			return
		}
		const number = command.args[0]?.replace(/[^0-9]/g, '')
		if (!number) {
			await m.reply('Format: .block <nomor>')
			return
		}
		await sock.updateBlockStatus(`${number}@s.whatsapp.net`, 'block')
		await m.reply(`✅ Blocked: ${number}`)
	},

	unblock: async m => {
		const { sock, isOwner, command } = m
		if (!isOwner) {
			await m.reply('⚠️ Hanya owner.')
			return
		}
		const number = command.args[0]?.replace(/[^0-9]/g, '')
		if (!number) {
			await m.reply('Format: .unblock <nomor>')
			return
		}
		await sock.updateBlockStatus(`${number}@s.whatsapp.net`, 'unblock')
		await m.reply(`✅ Unblocked: ${number}`)
	}
}
