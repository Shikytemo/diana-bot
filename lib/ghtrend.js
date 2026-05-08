import { getGithubTrending } from '@shikytemo/shitools'

const MAX_REPOS = 10

export const ghTrendForReply = async (args = []) => {
	const tokens = Array.isArray(args) ? args : String(args || '').trim().split(/\s+/).filter(Boolean)
	const language = tokens.find(t => !['daily', 'weekly', 'monthly'].includes(t.toLowerCase()))
	const since = tokens.find(t => ['daily', 'weekly', 'monthly'].includes(t.toLowerCase())) || 'daily'
	try {
		const repos = await getGithubTrending({ since, language })
		if (!repos.length) {
			return { ok: false, text: `Tidak ada trending repo untuk ${language || 'all'} (${since}).` }
		}
		const list = repos.slice(0, MAX_REPOS)
		const lines = [
			`🔥 *GitHub Trending* — ${language ? `${language} • ` : ''}${since}`,
			'',
			...list.map((r, i) => {
				const meta = `⭐ ${r.stars} • +${r.starsAdded} ${since === 'daily' ? 'today' : since === 'weekly' ? 'this week' : 'this month'}${r.language ? ` • ${r.language}` : ''}`
				const desc = r.description ? `\n   ${r.description.slice(0, 110)}${r.description.length > 110 ? '…' : ''}` : ''
				return `${i + 1}. *${r.fullName}*\n   ${meta}${desc}\n   🔗 ${r.url}`
			})
		]
		return { ok: true, text: lines.join('\n'), repos: list }
	} catch (error) {
		return { ok: false, text: `GitHub Trending gagal: ${error.message || error}` }
	}
}
