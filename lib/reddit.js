import { getSubreddit } from '@shikytemo/shitools'

const VALID_SORT = new Set(['hot', 'new', 'top', 'rising', 'controversial'])
const MAX_POSTS = 8

export const redditForReply = async args => {
	const tokens = Array.isArray(args) ? args : String(args || '').trim().split(/\s+/).filter(Boolean)
	if (!tokens.length) {
		return { ok: false, text: 'Pakai: .reddit <subreddit> [hot|new|top|rising]. Contoh: .reddit ProgrammerHumor top' }
	}
	const sub = tokens[0].replace(/^\/?r\//, '')
	const sort = tokens[1] && VALID_SORT.has(tokens[1].toLowerCase()) ? tokens[1].toLowerCase() : 'hot'
	try {
		const posts = await getSubreddit(sub, { sort, limit: MAX_POSTS, t: 'day' })
		if (!posts.length) {
			return { ok: false, text: `r/${sub} kosong.` }
		}
		const lines = [
			`🔴 *r/${sub}* — ${sort}`,
			'',
			...posts.map((p, i) => {
				const meta = `⬆️ ${p.score} • 💬 ${p.comments}${p.flair ? ` • ${p.flair}` : ''}${p.nsfw ? ' • ⚠️NSFW' : ''}`
				return `${i + 1}. *${p.title.slice(0, 110)}${p.title.length > 110 ? '…' : ''}*\n   ${meta}\n   🔗 https://reddit.com${p.permalink}`
			})
		]
		return {
			ok: true,
			text: lines.join('\n'),
			posts,
			topPermalink: posts[0] ? `https://reddit.com${posts[0].permalink}` : ''
		}
	} catch (error) {
		return { ok: false, text: `Reddit gagal: ${error.message || error}` }
	}
}
