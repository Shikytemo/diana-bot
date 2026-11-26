import { restartProcess, runSelfUpdate } from '../../../lib/updater.js'
import { sendRichButtons } from '../../../lib/reply.js'

export const commands = {
	update: async m => {
		const { sock, message, replyJid, jid, command } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		if (!m.isOwner && !m.isAdmin) {
			await m.reply('⚠️ Command ini hanya untuk owner/admin.')
			return
		}
		await m.reply('🔄 *ᴄᴇᴋ ᴜᴘᴅᴀᴛᴇ ᴅɪᴀɴᴀ...*')
		const result = await runSelfUpdate({ logger: m.logger })
		await sendRichButtons(sock, targetJid, {
			text: [
				'╭━━━ 🔄 *ʙᴏᴛ ᴜᴘᴅᴀᴛᴇ* ━━━╮',
				'┃',
				result.text,
				'┃',
				'╰━━━━━━━━━━━━━━━━━━━╯'
			].join('\n'),
			title: '🔄 Updater',
			quickReplies: [
				{ text: '⚡ ᴘɪɴɢ', id: `${command.prefix}ping` },
				{ text: '📋 ᴍᴇɴᴜ', id: `${command.prefix}menu` }
			]
		}, quoted)
		if (result.restart) {
			restartProcess()
		}
	},
	upgrade: async m => await m.commands.update(m)
}
