export default {
	name: 'ping',
	aliases: ['p'],
	description: 'Cek respon bot',
	run: async ctx => {
		await ctx.sock.sendMessage(
			ctx.jid,
			{
				text: `Pong ${Date.now() - ctx.startedAt}ms`
			},
			{
				quoted: ctx.message
			}
		)
	}
}

