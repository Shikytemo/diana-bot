import { randomMeme } from '@shikytemo/shitools'

export const memeForReply = async (subreddit = '') => {
	const sub = String(subreddit || '').trim().replace(/^r\//, '')
	try {
		const m = await randomMeme(sub ? { subreddit: sub } : {})
		const caption = [
			`😂 *${m.title}*`,
			`📌 r/${m.subreddit} • by u/${m.author}`,
			m.nsfw ? '⚠️ NSFW' : '',
			'',
			`🔗 ${m.postLink}`
		].filter(Boolean).join('\n')
		return { ok: true, caption, imageUrl: m.url, meme: m }
	} catch (error) {
		return { ok: false, text: `Meme gagal: ${error.message || error}` }
	}
}
