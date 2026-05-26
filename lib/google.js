import { fetchText } from '@shikytemo/shitools'

const JINA_BASE = 'https://r.jina.ai'

export const googleSearchForReply = async query => {
	try {
		const url = `${JINA_BASE}/https://www.google.com/search?q=${encodeURIComponent(query)}&hl=id`
		const html = await fetchText(url)
		const results = []

		const matches = html.matchAll(/(?:>\s*|\n)([^\n<]{10,200}?)\s*[-—|]\s*(?:https?:\/\/[^\s\n]+)/g)
		for (const match of matches) {
			results.push(match[1].trim())
			if (results.length >= 5) break
		}

		if (!results.length) {
			const snippetMatch = html.match(/(?:>\s*|\n)([^\n<]{30,300}?)/g)
			if (snippetMatch) {
				for (const m of snippetMatch.slice(0, 5)) {
					const clean = m.replace(/^[>\s]+/, '').trim()
					if (clean.length > 20) results.push(clean)
				}
			}
		}

		if (!results.length) {
			return { ok: false, text: 'Tidak ada hasil ditemukan.' }
		}

		const text = [
			`🔍 *Google Search: ${query}*`,
			'',
			...results.map((r, i) => `${i + 1}. ${r}`),
			'',
			'Powered by Google via Jina'
		].join('\n')

		return { ok: true, text }
	} catch (error) {
		return { ok: false, text: `Google search gagal: ${error.message || error}` }
	}
}
