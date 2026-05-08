import { getNews, listNewsSources } from '@shikytemo/shitools'

const MAX_ITEMS = 8

const sourceList = () => listNewsSources()

const matchSource = input => {
	const sources = sourceList()
	const norm = String(input || '').trim().toLowerCase()
	if (!norm) return sources[0]
	const exact = sources.find(s => s.id === norm)
	if (exact) return exact
	const aliasMap = {
		cnn: 'cnn-news',
		cnbc: 'cnbc-news',
		antara: 'antara-news',
		tempo: 'tempo-news',
		okezone: 'okezone-news',
		republika: 'republika-news',
		jpnn: 'jpnn-news',
		tvone: 'tvone-news',
		kumparan: 'kumparan-news'
	}
	const aliasId = aliasMap[norm]
	if (aliasId) return sources.find(s => s.id === aliasId)
	return sources.find(s => s.id.startsWith(norm) || s.label.toLowerCase().includes(norm))
}

export const newsForReply = async input => {
	const source = matchSource(input)
	if (!source) {
		const list = sourceList().map(s => `• ${s.id} (${s.label})`).join('\n')
		return { ok: false, text: `Sumber tidak ketemu. Pakai salah satu:\n${list}` }
	}
	try {
		const items = await getNews(source.id)
		if (!items.length) {
			return { ok: false, text: `${source.label} tidak ada headline saat ini.` }
		}
		const list = items.slice(0, MAX_ITEMS)
		const lines = [
			`📰 *${source.label}*`,
			'',
			...list.map((n, i) => `${i + 1}. *${n.title}*\n   🔗 ${n.link}`)
		]
		return { ok: true, text: lines.join('\n'), items: list, topUrl: list[0]?.link }
	} catch (error) {
		return { ok: false, text: `Berita gagal: ${error.message || error}` }
	}
}

export const newsSourceListText = () => {
	const sources = sourceList()
	return ['📰 *Sumber Berita*', '', ...sources.map(s => `• ${s.id} — ${s.label}`)].join('\n')
}
