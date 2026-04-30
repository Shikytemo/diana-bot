import { getCurrentSeasonAnime, getTopAnime, searchAnime, searchCharacters, searchManga } from '@shikytemo/shitools'
import { copyButton, quickReplyButton, singleSelectButton, urlButton } from 'shileys'

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

const names = items => items?.map(item => item.name).filter(Boolean).slice(0, 4).join(', ') || '-'

const score = item => item.score ? `${item.score}/10` : '-'

const streamText = item => {
	if (!item.streaming?.length) return 'Cek platform resmi di daerah kamu'
	return item.streaming.slice(0, 3).map(stream => stream.name).join(', ')
}

const animeCaption = (item, index, total) =>
	[
		`🎬 *${item.title || '-'}* ${total > 1 ? `(${index + 1}/${total})` : ''}`,
		item.titleEnglish ? `🌐 ${item.titleEnglish}` : '',
		item.titleJapanese ? `🇯🇵 ${item.titleJapanese}` : '',
		'',
		`⭐ Score : ${score(item)}`,
		`📺 Type  : ${item.type || '-'}`,
		`📦 Eps   : ${item.episodes || '-'}`,
		`📡 Status: ${item.status || '-'}`,
		`📅 Season: ${[item.season, item.year].filter(Boolean).join(' ') || '-'}`,
		`🏷️ Genre : ${names(item.genres)}`,
		`🎙️ Studio: ${names(item.studios)}`,
		`🇮🇩 Sub Indo: tergantung platform resmi`,
		`🔗 Legal : ${streamText(item)}`,
		'',
		truncate(item.synopsis)
	].filter(Boolean).join('\n')

const mangaCaption = (item, index, total) =>
	[
		`📚 *${item.title || '-'}* ${total > 1 ? `(${index + 1}/${total})` : ''}`,
		item.titleEnglish ? `🌐 ${item.titleEnglish}` : '',
		item.titleJapanese ? `🇯🇵 ${item.titleJapanese}` : '',
		'',
		`⭐ Score : ${score(item)}`,
		`📖 Type  : ${item.type || '-'}`,
		`📦 Ch    : ${item.chapters || '-'}`,
		`📚 Vol   : ${item.volumes || '-'}`,
		`📡 Status: ${item.status || '-'}`,
		`🏷️ Genre : ${names(item.genres)}`,
		`✍️ Author: ${names(item.authors)}`,
		'',
		truncate(item.synopsis)
	].filter(Boolean).join('\n')

const characterCaption = (item, index, total) =>
	[
		`👤 *${item.name || '-'}* ${total > 1 ? `(${index + 1}/${total})` : ''}`,
		item.nameKanji ? `🇯🇵 ${item.nameKanji}` : '',
		item.nicknames?.length ? `🏷️ ${item.nicknames.slice(0, 5).join(', ')}` : '',
		`⭐ Favorite: ${item.favorites || 0}`,
		'',
		truncate(item.about, 850)
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
	const result = await searchAnime(query, { limit: maxResults, sfw: true })
	const results = result.results || []
	if (!results.length) return { ok: false, text: 'Anime tidak ditemukan.' }

	return { ok: true, type: 'anime', query, results }
}

export const searchMangaForReply = async query => {
	const result = await searchManga(query, { limit: maxResults })
	const results = result.results || []
	if (!results.length) return { ok: false, text: 'Manga tidak ditemukan.' }

	return { ok: true, type: 'manga', query, results }
}

export const searchCharacterForReply = async query => {
	const result = await searchCharacters(query, { limit: maxResults })
	const results = result.results || []
	if (!results.length) return { ok: false, text: 'Character tidak ditemukan.' }

	return { ok: true, type: 'character', query, results }
}

export const topAnimeForReply = async () => {
	const result = await getTopAnime({ limit: maxResults, sfw: true })
	return { ok: true, type: 'anime', query: 'top anime', results: result.results || [] }
}

export const seasonAnimeForReply = async () => {
	const result = await getCurrentSeasonAnime({ limit: maxResults, sfw: true })
	return { ok: true, type: 'anime', query: 'season anime', results: result.results || [] }
}

export const saveAnimeSession = ({ jid, sender, result }) =>
	saveSession({ jid, sender, type: result.type, query: result.query, results: result.results })

const captionByType = {
	anime: animeCaption,
	manga: mangaCaption,
	character: characterCaption
}

const nextCommandByType = {
	anime: '.animenext',
	manga: '.manganext',
	character: '.charnext'
}

const titleByType = {
	anime: '🎬 Anime',
	manga: '📚 Manga',
	character: '👤 Character'
}

export const sendAnimeSessionItem = async ({ sock, jid, session, quoted }) => {
	const item = session.results[session.index]
	const total = session.results.length
	const caption = captionByType[session.type](item, session.index, total)
	const nextCommand = nextCommandByType[session.type] || '.animenext'
	const rows = session.results.slice(0, 10).map((entry, index) => ({
		header: `${index + 1}/${total}`,
		title: entry.title || entry.name || '-',
		description: entry.type || entry.status || entry.nameKanji || session.query,
		id: `${nextCommand} ${index + 1}`
	}))
	const content = {
		image: item.image ? { url: item.image } : undefined,
		text: caption,
		title: titleByType[session.type],
		footer: 'Powered by shitools',
		interactiveButtons: [
			copyButton('📋 Copy Link', item.url || '-'),
			item.url ? urlButton('🔗 Buka MAL', item.url) : quickReplyButton('🔎 Cari Lagi', `.anime ${session.query}`),
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

	await sock.sendMessage(jid, content, quoted ? { quoted } : {})
}
