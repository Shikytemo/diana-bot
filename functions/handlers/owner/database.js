import { handleBackupCommand, handleLogsCommand, handleRestoreCommand } from '../../../lib/owner-tools.js'

export const commands = {
	backup: async m => {
		if (!m.isOwner) {
			await m.reply('Command ini hanya untuk owner.')
			return
		}
		try {
			await handleBackupCommand(m)
		} catch (error) {
			await m.reply(`❌ Backup gagal: ${error.message || error}`)
		}
	},
	dbbackup: async m => await m.commands.backup(m),
	restore: async m => {
		if (!m.isOwner) {
			await m.reply('Command ini hanya untuk owner.')
			return
		}
		try {
			await handleRestoreCommand(m)
		} catch (error) {
			await m.reply(`❌ Restore gagal: ${error.message || error}`)
		}
	},
	dbrestore: async m => await m.commands.restore(m),
	logs: async m => {
		if (!m.isOwner) {
			await m.reply('Command ini hanya untuk owner.')
			return
		}
		try {
			await handleLogsCommand(m)
		} catch (error) {
			await m.reply(`❌ Ambil log gagal: ${error.message || error}`)
		}
	},
	logtail: async m => await m.commands.logs(m)
}
