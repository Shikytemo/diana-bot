import {
	searchOtakudesu,
	getLatestOtakudesu,
	getOtakudesuStream,
	getOtakudesuSeriesEpisodes,
	parseOtakudesuEpisodePage,
	fetchOtakudesuHtml
} from '@shikytemo/shitools'
import { copyButton, quickReplyButton, singleSelectButton, urlButton } from 'shileys'
import { withContextInfo } from './reply-style.js'

const maxResults = 10
const maxEpisodeRows = 20
const sessionTtlMs = 1000 * 60 * 30
const sessions = new Map()

const sessionKey = ({ jid, sender }) => `otakudesu:${jid}:${sender || jid}`

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

export const searchOtakudesuForReply = async query => {
	const result = await searchOtakudesu(query)
	const results = result.results || []
	if (!results.length) return { ok: false, text: 'Anime tidak ditemukan di Otakudesu.' }

	return { ok: true, type: 'otakudesu', query, results }
}

// ── Latest ──

export const latestOtakudesuForReply = async () => {
	const result = await getLatestOtakudesu()
	const results = result.results || []
	if (!results.length) return { ok: false, text: 'Episode terbaru Otakudesu kosong.' }

	return { ok: true, type: 'otakudesu-latest', query: 'latest', results }
}

// ── Stream ──

export const getOtakudesuStreamForReply = async input => {
	const result = await getOtakudesuStream(input, { limit: 8 })
	if (!result.ok) {
		return {
			ok: false,
			text: result.text === 'Otakudesu episode not found' ? 'Episode Otakudesu tidak ditemukan.' : 'Stream Otakudesu tidak ditemukan.'
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

export const saveOtakudesuSearchSession = ({ jid, sender, result }) =>
	saveSession({ jid, sender, type: result.type, query: result.query, results: result.results })

export const saveOtakudesuStreamSession = ({ jid, sender, result }) =>
	saveSession({ jid, sender, type: 'otakudesu-stream', query: '', results: [], episode: result.episode })

export const nextOtakudesuSession = ({ jid, sender }) => {
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

export const selectOtakudesuEpisode = async ({ jid, sender, index }) => {
	const session = getSession({ jid, sender })
	if (!session) return null

	const selectedIndex = Number(index) - 1
	const selected = session.episode?.episodes?.[selectedIndex]
	if (!selected) return null

	const html = await fetchOtakudesuHtml(selected.url)
	const episode = parseOtakudesuEpisodePage(html, selected.url)
	episode.episodes = session.episode.episodes

	if (!episode.mirrors.length) {
		throw new Error('Stream Otakudesu tidak ditemukan di halaman episode.')
	}

	session.episode = episode
	session.index = 0
	session.expiresAt = Date.now() + sessionTtlMs
	return session
}

// ── Send helpers ──

export const sendOtakudesuSearchItem = async ({ sock, jid, session, quoted }) => {
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
		id: `.otakudesunext ${index + 1}`
	}))

	const content = {
		image: item.image ? { url: item.image } : undefined,
		text: caption,
		title: '🎬 Otakudesu Search',
		footer: 'Powered by shitools',
		interactiveButtons: [
			copyButton('📋 Copy Link', item.url || '-'),
			item.url ? urlButton('🔗 Buka Web', item.url) : quickReplyButton('🔎 Cari Lagi', `.otakudesu ${session.query}`),
			quickReplyButton('➡️ Next', '.otakudesunext'),
			singleSelectButton('📋 Hasil Lain', [
				{ title: 'Hasil pencarian', rows }
			])
		]
	}

	if (!content.image) delete content.image
	await sock.sendMessage(jid, await withContextInfo(sock, content), quoted ? { quoted } : {})
}

export const sendOtakudesuStream = async ({ sock, jid, session, quoted }) => {
	const episode = session.episode
	const mirror = episode.mirrors[session.index]
	const total = episode.mirrors.length
	const current = session.index + 1
	const episodeRows = (episode.episodes || []).slice(0, maxEpisodeRows).map((item, index) => ({
		header: item.episode ? `Episode ${item.episode}` : `${index + 1}`,
		title: cleanText(item.title).slice(0, 45) || `Episode ${index + 1}`,
		description: item.url,
		id: `.otakudesuselect ${index + 1}`
	}))

	const lines = [
		`🎬 *${episode.title || 'Otakudesu Stream'}*`,
		'',
		`🧩 Server: ${mirror.name || 'Video'} (${current}/${total})`,
		`🔗 Stream: ${mirror.url}`,
		`📄 Episode: ${episode.url}`,
		episode.seriesUrl ? `📚 Series: ${episode.seriesUrl}` : ''
	].filter(Boolean)

	const content = {
		image: episode.image ? { url: episode.image } : undefined,
		text: lines.join('\n'),
		title: '🎬 Otakudesu Stream',
		footer: 'Powered by shitools',
		interactiveButtons: [
			urlButton('📄 Detail Episode', episode.url),
			urlButton('▶️ Buka Stream', mirror.url),
			quickReplyButton('➡️ Server Lain', '.otakudesunext'),
			...(episodeRows.length ? [
				singleSelectButton('📺 Pilih Episode', [
					{ title: 'Episode tersedia', rows: episodeRows }
				])
			] : [])
		]
	}

	if (!content.image) delete content.image
	await sock.sendMessage(jid, await withContextInfo(sock, content), quoted ? { quoted } : {})
}