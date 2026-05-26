import { isText, noText } from '../../../lib/global.js'
import { apiCommandForReply, apiListText } from '../../../lib/api-handler.js'
import { withContextInfo } from '../../../lib/reply-style.js'

export const commands = {
	api: async m => {
		const { command, message, replyJid, jid, sock } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined

		if (!isText(command)) {
			await m.reply(apiListText())
			return
		}

		const subCmd = command.args[0]?.toLowerCase()
		const input = command.args.slice(1).join(' ')

		if (subCmd === 'list') {
			await m.reply(apiListText())
			return
		}

		await m.reply('📡 Fetch data...')
		const result = await apiCommandForReply(subCmd, input)

		if (!result.ok) {
			await m.reply(result.text)
			return
		}

		if (result.type === 'image' && result.imageUrl) {
			try {
				await sock.sendMessage(targetJid, await withContextInfo(sock, {
					image: { url: result.imageUrl },
					caption: result.text || ''
				}), { quoted })
			} catch {
				await m.reply(result.text || result.imageUrl)
			}
		} else {
			await m.reply(result.text)
		}
	}
}
