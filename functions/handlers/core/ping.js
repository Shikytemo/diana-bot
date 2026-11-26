import { sendRichButtons } from '../../../lib/reply.js'
import { quickReplyButton, urlButton } from 'shileys'

export const commands = {
	ping: async m => {
		const latency = Date.now() - m.startedAt
		const { systemStatusText } = await import('../../helpers.js')
		const status = systemStatusText(m, latency)
		const { config, message, replyJid, jid, sock, command } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined

		await sendRichButtons(sock, targetJid, {
			text: status,
			title: `⚡ ${config.name}`,
			quickReplies: [
				{ text: '📋 ᴍᴇɴᴜ', id: `${command.prefix}menu` },
				{ text: '🔄 ʀᴇғʀᴇsʜ', id: `${command.prefix}ping` }
			],
			urls: [
				{ text: '🌐 ɢɪᴛʜᴜʙ', url: 'https://github.com/Shikytemo/diana-bot' }
			]
		}, quoted)
	},
	p: async m => await m.commands.ping(m)
}
