import { getCurrentSeasonAnime, getTopAnime, searchAnime } from '@shikytemo/shitools'
import { copyButton, quickReplyButton, singleSelectButton, urlButton } from 'shileys'
import { withContextInfo } from './reply-style.js'

const maxResults = 10
const sessionTtlMs = 1000 * 60 * 30
const sessions = new Map()

const sessionKey = ({ jid, sender, type }) => `${type}:${jid}:${sender || jid}`

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

const animeCaption = (item, index, total) =>
	[
		`🎬 *${item.title || '-'}* ${total > 1 ? `(${index + 1}/${total})` : ''}`,
		'',
		`⭐ Score : ${item.score || '-'}`,
		`📺 Type  : ${item.type || '-'}`,
		`📡 Status: ${item.status || '-'}`,
		`👁️ Views : ${item.views || '-'}`,
		`🏷️ Genre : ${item.genres?.join(', ') || '-'}`,
		'',
		`🔗 Link: ${item.url}`
	].filter(Boolean).join('\n')

const saveSession = ({ jid, sender, type, query, results }) => {
	cleanupSessions()
	const session = {
		type,
		query,
		results,
		index: 0,
		expiresAt: Date.now() + sessionTtlMs
	}
	sessions.set(sessionKey({ jid, sender, type }), session)
	return session
}

const getSession = ({ jid, sender, type }) => {
	cleanupSessions()
	return sessions.get(sessionKey({ jid, sender, type })) || null
}

export const nextAnimeSession = ({ jid, sender, type = 'anime' }) => {
	const session = getSession({ jid, sender, type })
	if (!session) return null

	session.index = (session.index + 1) % session.results.length
	session.expiresAt = Date.now() + sessionTtlMs
	return session
}

export const searchAnimeForReply = async query => {
	const result = await searchAnime(query)
	const results = result.results || []
	if (!results.length) return { ok: false, text: 'Anime tidak ditemukan di Samehadaku.' }

	return { ok: true, type: 'anime', query, results }
}

export const topAnimeForReply = async () => {
	const result = await getTopAnime()
	const results = result.results || []
	if (!results.length) return { ok: false, text: 'Top anime kosong dari Samehadaku.' }
	return { ok: true, type: 'anime', query: 'top anime', results }
}

export const seasonAnimeForReply = async () => {
	const result = await getCurrentSeasonAnime()
	const results = result.results || []
	if (!results.length) return { ok: false, text: 'Anime season kosong dari Samehadaku.' }
	return { ok: true, type: 'anime', query: 'season anime', results }
}

export const saveAnimeSession = ({ jid, sender, result }) =>
	saveSession({ jid, sender, type: result.type, query: result.query, results: result.results })

export const sendAnimeSessionItem = async ({ sock, jid, session, quoted }) => {
	const item = session.results[session.index]
	const total = session.results.length
	const caption = animeCaption(item, session.index, total)
	const nextCommand = '.animenext'
	const rows = session.results.slice(0, 10).map((entry, index) => ({
		header: `${index + 1}/${total}`,
		title: truncate(entry.title, 35) || '-',
		description: `${entry.type} | ${entry.score || 'No Score'} | ${entry.status}`,
		id: `${nextCommand} ${index + 1}`
	}))
	const content = {
		image: item.image ? { url: item.image } : undefined,
		text: caption,
		title: '🎬 Samehadaku Search',
		footer: 'Powered by shitools',
		interactiveButtons: [
			copyButton('📋 Copy Link', item.url || '-'),
			item.url ? urlButton('🔗 Buka Web', item.url) : quickReplyButton('🔎 Cari Lagi', `.anime ${session.query}`),
			quickReplyButton('➡️ Next', nextCommand),
			singleSelectButton('📋 Hasil Lain', [
				{
					title: 'Hasil pencarian',
					rows
				}
			])
		]
	}

	if (!content.image) delete content.image

	await sock.sendMessage(jid, await withContextInfo(sock, content), quoted ? { quoted } : {})
}
