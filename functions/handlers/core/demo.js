import { sendButtons, sendList, sendUrlButton, sendCopyButton, sendCallButton } from '../../../lib/reply.js'

export const commands = {
	button: async m => {
		const { command, config, message, replyJid, jid, sock } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		await sendButtons(sock, targetJid, {
			text: 'Quick reply button aktif.',
			title: config.name,
			footer: 'Powered by shileys',
			buttons: [
				{ text: 'Ping', id: `${command.prefix}ping` },
				{ text: 'Menu', id: `${command.prefix}menu` },
				{ text: 'List', id: `${command.prefix}list` }
			]
		}, quoted)
	},
	buttons: async m => await m.commands.button(m),
	list: async m => {
		const { command, config, message, replyJid, jid, sock } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		await sendList(sock, targetJid, {
			text: 'Pilih salah satu menu di bawah.',
			title: config.name,
			footer: 'Powered by shileys',
			buttonText: 'Buka Pilihan',
			sections: [
				{
					title: 'Command utama',
					rows: [
						{ header: 'Status', title: 'Ping', description: 'Cek respon bot', id: `${command.prefix}ping` },
						{ header: 'Menu', title: 'Menu Interaktif', description: 'Tampilkan menu button', id: `${command.prefix}menu` }
					]
				},
				{
					title: 'Demo native-flow',
					rows: [
						{ header: 'Button', title: 'Quick Reply', description: 'Contoh tombol cepat', id: `${command.prefix}button` },
						{ header: 'Copy', title: 'Copy Code', description: 'Contoh tombol salin text', id: `${command.prefix}copy` }
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
		await sendUrlButton(sock, targetJid, {
			text: 'Buka repository shileys.',
			title: config.name,
			footer: 'Powered by shileys',
			buttonText: 'GitHub',
			url: 'https://github.com/Shikytemo/shileys'
		}, quoted)
	},
	url: async m => await m.commands.link(m),
	copy: async m => {
		const { config, message, replyJid, jid, sock } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		await sendCopyButton(sock, targetJid, {
			text: 'Tekan tombol untuk salin kode pairing demo.',
			title: config.name,
			footer: 'Powered by shileys',
			buttonText: 'Copy Code',
			copyText: 'DIANABOT'
		}, quoted)
	},
	code: async m => await m.commands.copy(m),
	call: async m => {
		const { config, message, replyJid, jid, sock } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		await sendCallButton(sock, targetJid, {
			text: 'Hubungi owner bot.',
			title: config.name,
			footer: 'Powered by shileys',
			buttonText: 'Call Owner',
			phoneNumber: config.ownerNumber || '628385863327'
		}, quoted)
	},
	phone: async m => await m.commands.call(m)
}
