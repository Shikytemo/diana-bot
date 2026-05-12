import { restartProcess, runSelfUpdate } from '../../../lib/updater.js'

export const commands = {
	update: async m => {
		if (!m.isOwner && !m.isAdmin) {
			await m.reply('Command ini hanya untuk owner/admin.')
			return
		}
		await m.reply('Cek update Diana...')
		const result = await runSelfUpdate({ logger: m.logger })
		await m.reply(result.text)
		if (result.restart) {
			restartProcess()
		}
	},
	upgrade: async m => await m.commands.update(m)
}
