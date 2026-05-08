import { searchYoutube } from '@shikytemo/shitools'

const MAX_RESULTS = 8

const formatViews = views => {
	const n = Number(views || 0)
	if (!Number.isFinite(n) || n <= 0) return ''
	if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M views`
	if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K views`
	return `${n} views`
}

export const ytSearchForReply = async query => {
	const trimmed = String(query || '').trim()
	if (!trimmed) {
		return { ok: false, text: 'Pakai: .ytsearch <kata kunci>. Contoh: .ytsearch lo-fi beats' }
	}
	try {
		const results = await searchYoutube(trimmed, { limit: MAX_RESULTS })
		if (!results.length) {
			return { ok: false, text: `YouTube tidak ada hasil untuk "${trimmed}".` }
		}
		const lines = [
			`📺 *YouTube Search* — "${trimmed}"`,
			'',
			...results.map((r, i) => {
				const meta = [r.duration, formatViews(r.views), r.uploaded].filter(Boolean).join(' • ')
				return `${i + 1}. *${r.title}*\n   👤 ${r.channel}${meta ? ` • ${meta}` : ''}\n   🔗 ${r.url}`
			})
		]
		return {
			ok: true,
			text: lines.join('\n'),
			results,
			topUrl: results[0]?.url
		}
	} catch (error) {
		return { ok: false, text: `YT search gagal: ${error.message || error}` }
	}
}
