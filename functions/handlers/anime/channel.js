import { DEFAULT_CHANNEL_URL, formatChannelId, getChannelId } from '../../../lib/channel.js'
import { sendChannelIdButtons } from '../../../lib/reply.js'

export const commands = {
	idch: async m => {
		const { command, message, replyJid, jid, sock } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		const input = command.text || DEFAULT_CHANNEL_URL
		await m.reply('🔎 Cek ID channel...')
		try {
			const channel = await getChannelId(sock, input)
			await sendChannelIdButtons(sock, targetJid, {
				text: formatChannelId(channel),
				title: '🛰️ Channel Checker',
				footer: 'Powered by Diana Bot',
				channelId: channel.jid,
				url: channel.url
			}, quoted)
		} catch (error) {
			await m.reply(`❌ Gagal cek channel: ${error.message || error}`)
		}
	},
	cekidch: async m => await m.commands.idch(m),
	cekid: async m => await m.commands.idch(m)
}
