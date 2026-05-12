import { quoteForReply, animeQuoteForReply } from '../../../lib/quote.js'
import { factForReply } from '../../../lib/fact.js'
import { jokeForReply } from '../../../lib/joke.js'
import { memeForReply } from '../../../lib/meme.js'
import { sendUrlButton } from '../../../lib/reply.js'
import { withContextInfo } from '../../../lib/reply-style.js'

export const commands = {
	quote: async m => {
		await m.reply('💭 Ambil quote...')
		const result = await quoteForReply()
		await m.reply(result.text)
	},
	kata: async m => await m.commands.quote(m),
	animequote: async m => {
		await m.reply('🎌 Ambil anime quote...')
		const result = await animeQuoteForReply()
		await m.reply(result.text)
	},
	'anime-quote': async m => await m.commands.animequote(m),
	fact: async m => {
		await m.reply('💡 Ambil fakta...')
		const result = await factForReply(m.command.args[0])
		await m.reply(result.text)
	},
	fakta: async m => await m.commands.fact(m),
	joke: async m => {
		await m.reply('😂 Ambil joke...')
		const result = await jokeForReply(m.command.args[0])
		await m.reply(result.text)
	},
	lelucon: async m => await m.commands.joke(m),
	meme: async m => {
		const { command, message, replyJid, jid, sock } = m
		const cmd = command.name
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		await m.reply('😂 Ambil meme...')
		const result = await memeForReply(command.text)
		if (!result.ok) {
			await m.reply(result.text)
			return
		}
		try {
			await sock.sendMessage(targetJid, await withContextInfo(sock, { image: { url: result.imageUrl }, caption: result.caption }), { quoted })
		} catch (error) {
			m.logger.warn({ error, command: cmd }, 'meme send failed')
			await sendUrlButton(sock, targetJid, {
				text: `${result.caption}\n\n⚠️ Gagal kirim langsung, pakai link.`,
				title: '😂 Meme',
				footer: 'Powered by meme-api.com',
				buttonText: 'Buka Meme',
				url: result.imageUrl
			}, quoted)
		}
	}
}
