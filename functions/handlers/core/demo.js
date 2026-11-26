import { sendButtons, sendList, sendUrlButton, sendCopyButton, sendCallButton, sendRichButtons, sendComboButtons } from '../../../lib/reply.js'
import { quickReplyButton, urlButton, copyButton, callButton } from 'shileys'

export const commands = {
	button: async m => {
		const { command, config, message, replyJid, jid, sock } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		await sendButtons(sock, targetJid, {
			text: [
				'╭━━━ ✨ *ǫᴜɪᴄᴋ ʀᴇᴘʟʏ* ━━━╮',
				'┃',
				'┃  Tekan salah satu tombol',
				'┃  di bawah untuk eksekusi',
				'┃  command secara langsung.',
				'┃',
				'╰━━━━━━━━━━━━━━━━━━╯'
			].join('\n'),
			title: config.name,
			footer: '⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ sʜɪʟᴇʏs',
			buttons: [
				{ text: '⚡ ᴘɪɴɢ', id: `${command.prefix}ping` },
				{ text: '📋 ᴍᴇɴᴜ', id: `${command.prefix}menu` },
				{ text: '📋 ʟɪsᴛ', id: `${command.prefix}list` }
			]
		}, quoted)
	},
	buttons: async m => await m.commands.button(m),

	list: async m => {
		const { command, config, message, replyJid, jid, sock } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		await sendList(sock, targetJid, {
			text: [
				'╭━━━ 📋 *ʟɪsᴛ ᴍᴇɴᴜ* ━━━╮',
				'┃',
				'┃  Pilih salah satu menu',
				'┃  dari daftar di bawah.',
				'┃',
				'╰━━━━━━━━━━━━━━━━━━╯'
			].join('\n'),
			title: config.name,
			buttonText: '📋 ʙᴜᴋᴀ ᴘɪʟɪʜᴀɴ',
			sections: [
				{
					title: '👑 ᴄᴏᴍᴍᴀɴᴅ ᴜᴛᴀᴍᴀ',
					rows: [
						{ header: '⚡', title: 'ᴘɪɴɢ', description: 'Cek respon & status bot', id: `${command.prefix}ping` },
						{ header: '📋', title: 'ᴍᴇɴᴜ ɪɴᴛᴇʀᴀᴋᴛɪғ', description: 'Tampilkan menu button', id: `${command.prefix}menu` }
					]
				},
				{
					title: '🔘 ᴅᴇᴍᴏ ɴᴀᴛɪᴠᴇ-ғʟᴏᴡ',
					rows: [
						{ header: '✨', title: 'ǫᴜɪᴄᴋ ʀᴇᴘʟʏ', description: 'Demo tombol cepat', id: `${command.prefix}button` },
						{ header: '📋', title: 'ᴄᴏᴘʏ ᴄᴏᴅᴇ', description: 'Demo tombol salin text', id: `${command.prefix}copy` },
						{ header: '🌐', title: 'ᴜʀʟ ʙᴜᴛᴛᴏɴ', description: 'Demo tombol URL', id: `${command.prefix}link` },
						{ header: '📞', title: 'ᴄᴀʟʟ ʙᴜᴛᴛᴏɴ', description: 'Demo tombol telepon', id: `${command.prefix}call` }
					]
				}
			]
		}, quoted)
	},
	pilih: async m => await m.commands.list(m),

	link: async m => {
		const { config, message, replyJid, jid, sock } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		await sendRichButtons(sock, targetJid, {
			text: [
				'╭━━━ 🌐 *ɢɪᴛʜᴜʙ ʟɪɴᴋ* ━━━╮',
				'┃',
				'┃  Buka repository Diana Bot',
				'┃  dan Shileys di GitHub.',
				'┃',
				'╰━━━━━━━━━━━━━━━━━━╯'
			].join('\n'),
			title: config.name,
			urls: [
				{ text: '🤖 ᴅɪᴀɴᴀ-ʙᴏᴛ', url: 'https://github.com/Shikytemo/diana-bot' },
				{ text: '📦 sʜɪʟᴇʏs', url: 'https://github.com/Shikytemo/shileys' }
			]
		}, quoted)
	},
	url: async m => await m.commands.link(m),

	copy: async m => {
		const { config, message, replyJid, jid, sock } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		await sendRichButtons(sock, targetJid, {
			text: [
				'╭━━━ 📋 *ᴄᴏᴘʏ ᴛᴇxᴛ* ━━━╮',
				'┃',
				'┃  Tekan tombol di bawah',
				'┃  untuk salin kode pairing.',
				'┃',
				'╰━━━━━━━━━━━━━━━━━━╯'
			].join('\n'),
			title: config.name,
			copies: [
				{ text: '📋 ᴄᴏᴘʏ ᴄᴏᴅᴇ', copyText: 'DIANABOT' }
			],
			quickReplies: [
				{ text: '⚡ ᴘɪɴɢ', id: `${config.prefixes[0]}ping` }
			]
		}, quoted)
	},
	code: async m => await m.commands.copy(m),

	call: async m => {
		const { config, message, replyJid, jid, sock } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		await sendRichButtons(sock, targetJid, {
			text: [
				'╭━━━ 📞 *ᴄᴏɴᴛᴀᴄᴛ ᴏᴡɴᴇʀ* ━━━╮',
				'┃',
				'┃  Hubungi owner bot secara',
				'┃  langsung via telepon.',
				'┃',
				'╰━━━━━━━━━━━━━━━━━━╯'
			].join('\n'),
			title: config.name,
			calls: [
				{ text: '📞 ᴄᴀʟʟ ᴏᴡɴᴇʀ', phoneNumber: config.ownerNumber || '628385863327' }
			],
			copies: [
				{ text: '📋 ᴄᴏᴘʏ ɴᴏᴍᴏʀ', copyText: config.ownerNumber || '628385863327' }
			]
		}, quoted)
	},
	phone: async m => await m.commands.call(m)
}
