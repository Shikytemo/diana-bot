import { isText, noText } from '../../../lib/global.js'
import { formatRoles } from '../../../lib/roles.js'

export const commands = {
	register: async m => {
		m.user.registered = true
		m.user.registeredAt ||= new Date().toISOString()
		await m.db.save()
		m.isMember = true
		m.isUnregister = false
		m.roles.labels = m.roles.labels.filter(label => label !== 'unregister')
		if (!m.roles.labels.includes('member')) {
			m.roles.labels.splice(Math.max(m.roles.labels.indexOf('user'), 0), 0, 'member')
		}
		await m.reply('Berhasil register sebagai member.')
	},
	daftar: async m => await m.commands.register(m),
	unregister: async m => {
		m.user.registered = false
		m.user.unregisteredAt = new Date().toISOString()
		await m.db.save()
		await m.reply('Status member dihapus. Kamu sekarang unregister.')
	},
	unreg: async m => await m.commands.unregister(m),
	setnama: async m => {
		const { command } = m
		const name = command.text.trim().replace(/\s+/g, ' ')
		if (!name) {
			await m.reply(noText(command.prefix, command.name, 'Diana User'))
			return
		}
		if (name.length > 32) {
			await m.reply('Nama maksimal 32 karakter.')
			return
		}
		m.user.name = name
		m.user.nameUpdatedAt = new Date().toISOString()
		await m.db.save()
		await m.reply(`Nama disimpan: ${name}`)
	},
	setname: async m => await m.commands.setnama(m),
	nama: async m => await m.commands.setnama(m),
	role: async m => {
		await m.reply(formatRoles(m.roles))
	},
	profile: async m => await m.commands.role(m),
	me: async m => await m.commands.role(m)
}
