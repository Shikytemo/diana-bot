import { getTiktok, getTiktokUser, isTiktokUrl, searchTiktok } from '@shikytemo/shitools'

const formatNumber = value => {
	const n = Number(value)
	if (!Number.isFinite(n)) return '-'
	if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
	if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
	return String(n)
}

const formatDuration = seconds => {
	const total = Math.max(0, Math.round(Number(seconds) || 0))
	const m = Math.floor(total / 60)
	const s = total % 60
	return `${m}:${String(s).padStart(2, '0')}`
}

const stripUsername = handle => String(handle || '').trim().replace(/^@+/, '')

const isUsernameQuery = input => /^@[A-Za-z0-9._]{2,32}$/.test(String(input || '').trim())

const formatVideoCaption = (video, prefix = '🎬') => {
	const stats = video.stats || {}
	const lines = [
		`${prefix} *TikTok ${video.author?.name ? `· ${video.author.name}` : ''}*`.trim(),
		'',
		video.title ? `📝 ${video.title}` : '',
		video.author?.username ? `👤 @${video.author.username}` : '',
		typeof video.duration === 'number' ? `⏱️ ${formatDuration(video.duration)}` : '',
		`👁️ ${formatNumber(stats.plays)} | ❤️ ${formatNumber(stats.likes)} | 💬 ${formatNumber(stats.comments)} | 🔁 ${formatNumber(stats.shares)}`,
		video.music?.title ? `🎵 ${video.music.title}${video.music.author ? ` — ${video.music.author}` : ''}` : '',
		video.permalink ? `🔗 ${video.permalink}` : ''
	].filter(Boolean)
	return lines.join('\n')
}

const pickPlayUrl = video => video.noWatermarkUrl || video.hdUrl || video.url || video.watermarkUrl

export const resolveTiktokVideo = async input => {
	if (!isTiktokUrl(input)) {
		return { ok: false, reason: 'not-url' }
	}
	const video = await getTiktok(input)
	const playUrl = pickPlayUrl(video)
	if (!playUrl) {
		return {
			ok: false,
			reason: 'no-media',
			text: 'TikTok berhasil di-resolve tapi tidak ada URL video yang bisa diputar.'
		}
	}
	return {
		ok: true,
		video,
		playUrl,
		caption: formatVideoCaption(video, '📥')
	}
}

export const resolveTiktokSearch = async (query, options = {}) => {
	const limit = Math.max(1, Math.min(Number(options.limit) || 5, 10))
	const result = await searchTiktok(query, { limit })
	if (!result.videos.length) {
		return {
			ok: false,
			text: `Tidak ada hasil TikTok untuk "${query}".`
		}
	}
	const list = result.videos.slice(0, limit)
	const lines = [
		`🔎 *TikTok Search* — "${query}"`,
		'',
		...list.map((video, index) => {
			const author = video.author?.username ? `@${video.author.username}` : 'unknown'
			const stats = video.stats || {}
			return [
				`${index + 1}. ${video.title?.slice(0, 80) || '(no title)'}`,
				`   ${author} · 👁️ ${formatNumber(stats.plays)} · ❤️ ${formatNumber(stats.likes)}`,
				video.permalink ? `   ${video.permalink}` : ''
			].filter(Boolean).join('\n')
		})
	]
	return {
		ok: true,
		query,
		videos: list,
		text: lines.join('\n'),
		topPermalink: list[0]?.permalink
	}
}

export const resolveTiktokUser = async input => {
	const username = stripUsername(input)
	if (!username) {
		return { ok: false, text: 'Username TikTok tidak valid. Contoh: @khaby.lame' }
	}
	const user = await getTiktokUser(username)
	const stats = user.stats || {}
	const lines = [
		`👤 *TikTok @${user.username}*`,
		'',
		user.name ? `🪪 Nama  : ${user.name}` : '',
		user.region ? `🌏 Region: ${user.region}` : '',
		user.bio ? `📝 Bio   : ${user.bio}` : '',
		`👥 Follow: ${formatNumber(stats.followers)}`,
		`👀 Diikuti: ${formatNumber(stats.following)}`,
		`❤️ Likes : ${formatNumber(stats.likes)}`,
		`🎬 Video : ${formatNumber(stats.videos)}`,
		user.verified ? '✅ Verified' : '',
		user.private ? '🔒 Private account' : ''
	].filter(Boolean)
	return {
		ok: true,
		user,
		text: lines.join('\n'),
		profileUrl: `https://www.tiktok.com/@${user.username}`
	}
}

export const dispatchTiktokInput = input => {
	const trimmed = String(input || '').trim()
	if (!trimmed) return { kind: 'empty' }
	if (isTiktokUrl(trimmed)) return { kind: 'url', value: trimmed }
	if (isUsernameQuery(trimmed)) return { kind: 'user', value: trimmed }
	return { kind: 'search', value: trimmed }
}

export { formatVideoCaption as formatTiktokCaption }
