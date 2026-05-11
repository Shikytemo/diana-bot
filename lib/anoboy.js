import {
	searchAnoboy,
	getLatestAnoboy,
	getAnoboyStream,
	getAnoboySeriesEpisodes,
	parseAnoboyEpisodePage,
	fetchAnoboyHtml
} from '@shikytemo/shitools'
import { copyButton, quickReplyButton, singleSelectButton, urlButton } from 'shileys'

const maxResults = 10
const maxEpisodeRows = 20
const sessionTtlMs = 1000 * 60 * 30
const sessions = new Map()

const sessionKey = ({ jid, sender }) => `anoboy:${jid}:${sender || jid}`

const cleanupSessions = () => {
	const now = Date.now()
	for (const [key, session] of sessions) {
		if (session.expiresAt <= now) sessions.delete(key)
	}
}

const truncate = (text, max = 650) => {
	const value = String(text || '').replace(/\s+/g, ' ').trim()
	return value.length > max ? `${value.slice(0, max - 3)}...` : value
}

const cleanText = value => String(value || '').replace(/\s+/g, ' ').trim()

// ── Search ──

export const searchAnoboyForReply = async query => {
	const result = await searchAnoboy(query)
	const results = result.results || []
	if (!results.length) return { ok: false, text: 'Anime tidak ditemukan di Anoboy.' }

	return { ok: true, type: 'anoboy', query, results }
}

// ── Latest ──

export const latestAnoboyForReply = async () => {
	const result = await getLatestAnoboy()
	const results = result.results || []
	if (!results.length) return { ok: false, text: 'Episode terbaru Anoboy kosong.' }

	return { ok: true, type: 'anoboy-latest', query: 'latest', results }
}

// ── Stream ──

export const getAnoboyStreamForReply = async input => {
	const result = await getAnoboyStream(input, { limit: 8 })
	if (!result.ok) {
		return {
			ok: false,
			text: result.text === 'Anoboy episode not found' ? 'Episode Anoboy tidak ditemukan.' : 'Stream Anoboy tidak ditemukan.'
		}
	}

	return result
}

// ── Sessions ──

const saveSession = ({ jid, sender, type, query, results, episode }) => {
	cleanupSessions()
	const session = {
		type,
		query,
		results,
		episode: episode || null,
		index: 0,
		expiresAt: Date.now() + sessionTtlMs
	}
	sessions.set(sessionKey({ jid, sender }), session)
	return session
}

const getSession = ({ jid, sender }) => {
	cleanupSessions()
	return sessions.get(sessionKey({ jid, sender })) || null
}

export const saveAnoboySearchSession = ({ jid, sender, result }) =>
	saveSession({ jid, sender, type: result.type, query: result.query, results: result.results })

export const saveAnoboyStreamSession = ({ jid, sender, result }) =>
	saveSession({ jid, sender, type: 'anoboy-stream', query: '', results: [], episode: result.episode })

export const nextAnoboySession = ({ jid, sender }) => {
	const session = getSession({ jid, sender })
	if (!session) return null

	if (session.episode?.mirrors?.length) {
		session.index = (session.index + 1) % session.episode.mirrors.length
	} else {
		session.index = (session.index + 1) % session.results.length
	}
	session.expiresAt = Date.now() + sessionTtlMs
	return session
}

export const selectAnoboyEpisode = async ({ jid, sender, index }) => {
	const session = getSession({ jid, sender })
	if (!session) return null

	const selectedIndex = Number(index) - 1
	const selected = session.episode?.episodes?.[selectedIndex]
	if (!selected) return null

	const html = await fetchAnoboyHtml(selected.url)
	const episode = parseAnoboyEpisodePage(html, selected.url)
	episode.episodes = session.episode.episodes

	if (!episode.mirrors.length) {
		throw new Error('Stream Anoboy tidak ditemukan di halaman episode.')
	}

	session.episode = episode
	session.index = 0
	session.expiresAt = Date.now() + sessionTtlMs
	return session
}

// ── Send helpers ──

export const sendAnoboySearchItem = async ({ sock, jid, session, quoted }) => {
	const item = session.results[session.index]
	const total = session.results.length
	const caption = [
		`🎬 *${item.title || '-'}* ${total > 1 ? `(${session.index + 1}/${total})` : ''}`,
		'',
		item.episodes ? `📺 Episodes: ${item.episodes}` : '',
		item.status ? `📡 Status: ${item.status}` : '',
		item.genres?.length ? `🏷️ Genre: ${item.genres.join(', ')}` : '',
		'',
		`🔗 Link: ${item.url}`
	].filter(Boolean).join('\n')

	const rows = session.results.slice(0, maxResults).map((entry, index) => ({
		header: `${index + 1}/${total}`,
		title: truncate(entry.title, 35) || '-',
		description: entry.url,
		id: `.anoboynext ${index + 1}`
	}))

	const content = {
		image: item.image ? { url: item.image } : undefined,
		text: caption,
		title: '🎬 Anoboy Search',
		footer: 'Powered by shitools',
		interactiveButtons: [
			copyButton('📋 Copy Link', item.url || '-'),
			item.url ? urlButton('🔗 Buka Web', item.url) : quickReplyButton('🔎 Cari Lagi', `.anoboy ${session.query}`),
			quickReplyButton('➡️ Next', '.anoboynext'),
			singleSelectButton('📋 Hasil Lain', [
				{ title: 'Hasil pencarian', rows }
			])
		]
	}

	if (!content.image) delete content.image
	await sock.sendMessage(jid, content, quoted ? { quoted } : {})
}

export const sendAnoboyStream = async ({ sock, jid, session, quoted }) => {
	const episode = session.episode
	const mirror = episode.mirrors[session.index]
	const total = episode.mirrors.length
	const current = session.index + 1
	const episodeRows = (episode.episodes || []).slice(0, maxEpisodeRows).map((item, index) => ({
		header: item.episode ? `Episode ${item.episode}` : `${index + 1}`,
		title: cleanText(item.title).slice(0, 45) || `Episode ${index + 1}`,
		description: item.url,
		id: `.anoboyselect ${index + 1}`
	}))

	const lines = [
		`🎬 *${episode.title || 'Anoboy Stream'}*`,
		'',
		`🧩 Server: ${mirror.name || 'Video'} (${current}/${total})`,
		`🔗 Stream: ${mirror.url}`,
		`📄 Episode: ${episode.url}`,
		episode.seriesUrl ? `📚 Series: ${episode.seriesUrl}` : ''
	].filter(Boolean)

	const content = {
		image: episode.image ? { url: episode.image } : undefined,
		text: lines.join('\n'),
		title: '🎬 Anoboy Stream',
		footer: 'Powered by shitools',
		interactiveButtons: [
			urlButton('📄 Detail Episode', episode.url),
			urlButton('▶️ Buka Stream', mirror.url),
			quickReplyButton('➡️ Server Lain', '.anoboynext'),
			...(episodeRows.length ? [
				singleSelectButton('📺 Pilih Episode', [
					{ title: 'Episode tersedia', rows: episodeRows }
				])
			] : [])
		]
	}

	if (!content.image) delete content.image
	await sock.sendMessage(jid, content, quoted ? { quoted } : {})
}
