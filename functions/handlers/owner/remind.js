import { handleReminderCommand } from '../../../lib/owner-tools.js'

export const commands = {
	remind: async m => {
		if (!m.isOwner) {
			await m.reply('Command ini hanya untuk owner.')
			return
		}
		try {
			await handleReminderCommand(m)
		} catch (error) {
			await m.reply(`❌ Reminder gagal: ${error.message || error}`)
		}
	},
	reminder: async m => await m.commands.remind(m),
	schedule: async m => await m.commands.remind(m),
	scheduler: async m => await m.commands.remind(m)
}
