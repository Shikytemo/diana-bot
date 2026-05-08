import { getWikipediaSummary, searchWikipedia } from '@shikytemo/shitools'

const MAX_EXTRACT = 1500

const truncate = (text, max = MAX_EXTRACT) => {
	if (!text) return ''
	if (text.length <= max) return text
	return `${text.slice(0, max).trimEnd()}…`
}

export const wikipediaForReply = async query => {
	if (!query || !query.trim()) {
		return { ok: false, text: 'Pakai: .wiki <topik>. Contoh: .wiki Sukarno' }
	}
	try {
		const hits = await searchWikipedia(query, { lang: 'id', limit: 5 })
		if (!hits.length) {
			return { ok: false, text: `Wiki tidak ketemu untuk "${query}".` }
		}
		const page = await getWikipediaSummary(hits[0].title, { lang: 'id' })
		const lines = [
			`📚 *${page.title}*`,
			page.description ? `_${page.description}_` : '',
			'',
			truncate(page.extract),
			'',
			page.url ? `🔗 ${page.url}` : ''
		].filter(Boolean)
		return {
			ok: true,
			text: lines.join('\n'),
			url: page.url,
			thumbnail: page.thumbnail
		}
	} catch (error) {
		return { ok: false, text: `Wiki gagal: ${error.message || error}` }
	}
}
