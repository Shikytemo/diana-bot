import { randomAnimeQuote, randomQuote } from '@shikytemo/shitools'

export const quoteForReply = async () => {
	try {
		const q = await randomQuote()
		const text = [`💭 _"${q.content}"_`, '', `— *${q.author}*`].join('\n')
		return { ok: true, text, quote: q }
	} catch (error) {
		return { ok: false, text: `Quote gagal: ${error.message || error}` }
	}
}

export const animeQuoteForReply = async () => {
	try {
		const q = await randomAnimeQuote()
		const text = [
			`🎌 _"${q.content}"_`,
			'',
			`— *${q.character}*`,
			q.anime ? `🎬 ${q.anime}` : ''
		].filter(Boolean).join('\n')
		return { ok: true, text, quote: q }
	} catch (error) {
		return { ok: false, text: `Anime quote gagal: ${error.message || error}` }
	}
}
