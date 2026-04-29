import { sendMenu } from '../../lib/reply.js'

export default {
	name: 'menu',
	aliases: ['help', 'start'],
	description: 'Tampilkan menu bot',
	run: async ctx => {
		await sendMenu(ctx.sock, ctx.jid, ctx.config, ctx.message)
	}
}

