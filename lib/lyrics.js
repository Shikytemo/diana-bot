import { lyrics, searchLyrics } from '@shikytemo/shitools'

const MAX_LYRICS_LENGTH = 3500

const truncateLyrics = body => {
	if (body.length <= MAX_LYRICS_LENGTH) return body
	return `${body.slice(0, MAX_LYRICS_LENGTH).trimEnd()}\n…\n(_potong, lyric kepanjangan_)`
}

export const fetchLyricsForReply = async query => {
	try {
		const result = await lyrics(query)
		const header = [
			`🎵 *${result.fullTitle || `${result.artist} — ${result.title}`}*`,
			result.url ? `🔗 ${result.url}` : '',
			'',
			''
		].filter(Boolean).join('\n')
		return {
			ok: true,
			text: header + truncateLyrics(result.lyrics),
			url: result.url,
			thumbnail: result.thumbnail
		}
	} catch (error) {
		return {
			ok: false,
			text: `Lyric tidak ketemu: ${error.message || error}`
		}
	}
}

export const searchLyricsForReply = async query => {
	try {
		const hits = await searchLyrics(query)
		if (!hits.length) {
			return { ok: false, text: `Tidak ada hasil Genius untuk "${query}".` }
		}
		const list = hits.slice(0, 8)
		const lines = [
			`🔎 *Lyrics Search* — "${query}"`,
			'',
			...list.map((hit, index) => `${index + 1}. ${hit.fullTitle || `${hit.artist} — ${hit.title}`}\n   ${hit.url}`)
		]
		return { ok: true, text: lines.join('\n'), hits: list }
	} catch (error) {
		return { ok: false, text: `Lyrics search gagal: ${error.message || error}` }
	}
}
