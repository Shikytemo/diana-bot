import menu from './menu.js'
import ping from './ping.js'

const nativeFlowCommands = [
	{
		name: 'button',
		aliases: ['buttons'],
		description: 'Demo quick reply button'
	},
	{
		name: 'list',
		aliases: ['pilih'],
		description: 'Demo button pilihan/list'
	},
	{
		name: 'link',
		aliases: ['url'],
		description: 'Demo tombol buka link'
	},
	{
		name: 'copy',
		aliases: ['code'],
		description: 'Demo tombol salin text'
	},
	{
		name: 'call',
		aliases: ['phone'],
		description: 'Demo tombol telepon'
	},
	{
		name: 'id',
		aliases: ['jid'],
		description: 'Cek JID chat'
	}
]

const commandList = [menu, ping, ...nativeFlowCommands]

export const commands = new Map()

for (const command of commandList) {
	commands.set(command.name, command)
	for (const alias of command.aliases || []) {
		commands.set(alias, command)
	}
}

export const listCommands = () => commandList
