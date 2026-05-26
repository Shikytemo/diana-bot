import { isText, noText } from '../../../lib/global.js'
import { aiChatForReply, clearAiContext } from '../../../lib/aichat.js'

export const commands = {
	ai: async m => {
		const { command, sender, jid } = m
		if (!isText(command)) {
			await m.reply([
				'🤖 *AI Chat*',
				'',
				`Format: ${command.prefix}ai <pesan>`,
				`Contoh: ${command.prefix}ai Siapa presiden Indonesia?`,
				'',
				`💡 ${command.prefix}aiclear — Reset context AI`
			].join('\n'))
			return
		}
		await m.reply('🤖 Berpikir...')
		const result = await aiChatForReply(jid, sender, command.text)
		await m.reply(result.text)
	},

	chat: async m => await m.commands.ai(m),

	aiclear: async m => {
		const { sender, jid } = m
		clearAiContext(jid, sender)
		await m.reply('🧹 Context AI direset.')
	}
}
