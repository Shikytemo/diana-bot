import { spotifyDl, searchSpotifyTracks, SpotifyAPI } from '@shikytemo/shitools'
import { copyButton, quickReplyButton, urlButton } from 'shileys'
import { withContextInfo } from './reply-style.js'

const sessionTtlMs = 1000 * 60 * 30
const sessions = new Map()

const sessionKey = ({ jid, sender }) => `spotify:${jid}:${sender || jid}`

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

const formatDuration = ms => {
	const total = Math.max(0, Math.round(Number(ms) || 0) / 1000)
	const m = Math.floor(total / 60)
	const s = Math.floor(total % 60)
	return `${m}:${String(s).padStart(2, '0')}`
}

const formatNumber = value => {
	const n = Number(value)
	if (!Number.isFinite(n)) return '-'
	if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`
	if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
	if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
	return String(n)
}

// ── Download ──

export const spotifyDlForReply = async input => {
	const result = await spotifyDl(input)
	if (!result.title && !result.downloadUrl) {
		return { ok: false, text: 'Gagal mengambil info Spotify. Pastikan URL valid.' }
	}

	const artists = Array.isArray(result.artists) ? result.artists.join(', ') : String(result.artists || '-')
	const lines = [
		`🎵 *${result.title || '-'}*`,
		'',
		`🎤 Artist : ${artists}`,
		result.duration ? `⏱️ Durasi : ${formatDuration(result.duration)}` : '',
		result.previewUrl ? `🎧 Preview: ${result.previewUrl}` : '',
		result.downloadUrl ? `📥 Download: ${result.downloadUrl}` : '',
		'',
		result.downloadUrl ? '⚠️ Gunakan link download sebelum expired.' : '⚠️ Download URL tidak tersedia, gunakan preview.'
	].filter(Boolean)

	return {
		ok: true,
		title: result.title,
		artists: result.artists,
		previewUrl: result.previewUrl,
		downloadUrl: result.downloadUrl,
		text: lines.join('\n')
	}
}

// ── Search ──

export const spotifySearchForReply = async (query, limit = 5) => {
	const api = await SpotifyAPI()
	const result = await api.searchTracks(query, { limit })
	const tracks = result.tracks?.items || []

	if (!tracks.length) {
		return { ok: false, text: `Tidak ada hasil Spotify untuk "${query}".` }
	}

	const lines = [
		`🔎 *Spotify Search* — "${query}"`,
		'',
		...tracks.map((track, index) => {
			const artists = track.artists?.map(a => a.name).join(', ') || '-'
			const duration = track.duration_ms ? formatDuration(track.duration_ms) : ''
			return [
				`${index + 1}. ${track.name}`,
				`   🎤 ${artists}${duration ? ` · ⏱️ ${duration}` : ''}`,
				`   🔗 https://open.spotify.com/track/${track.id}`
			].join('\n')
		})
	]

	return {
		ok: true,
		tracks,
		text: lines.join('\n'),
		topUrl: tracks[0] ? `https://open.spotify.com/track/${tracks[0].id}` : null
	}
}

// ── Sessions ──

export const saveSpotifySearchSession = ({ jid, sender, result }) => {
	cleanupSessions()
	if (!result?.tracks?.length) return null

	const session = {
		tracks: result.tracks,
		index: 0,
		expiresAt: Date.now() + sessionTtlMs
	}
	sessions.set(sessionKey({ jid, sender }), session)
	return session
}

const getSpotifySession = ({ jid, sender }) => {
	cleanupSessions()
	return sessions.get(sessionKey({ jid, sender })) || null
}

export const nextSpotifySession = ({ jid, sender }) => {
	const session = getSpotifySession({ jid, sender })
	if (!session) return null

	session.index = (session.index + 1) % session.tracks.length
	session.expiresAt = Date.now() + sessionTtlMs
	return session
}

// ── Send helpers ──

export const sendSpotifyDl = async ({ sock, jid, result, quoted }) => {
	const content = {
		text: result.text,
		title: '🎵 Spotify',
		footer: 'Powered by shitools',
		interactiveButtons: [
			...(result.downloadUrl ? [urlButton('📥 Download MP3', result.downloadUrl)] : []),
			...(result.previewUrl ? [urlButton('🎧 Preview', result.previewUrl)] : []),
			copyButton('📋 Copy Info', `${result.title} - ${artists}`)
		]
	}

	await sock.sendMessage(jid, await withContextInfo(sock, content), quoted ? { quoted } : {})
}

export const sendSpotifySearchItem = async ({ sock, jid, session, quoted }) => {
	const track = session.tracks[session.index]
	const total = session.tracks.length
	const artists = track.artists?.map(a => a.name).join(', ') || '-'
	const caption = [
		`🎵 *${track.name}* (${session.index + 1}/${total})`,
		'',
		`🎤 Artist  : ${artists}`,
		track.album?.name ? `💿 Album   : ${track.album.name}` : '',
		track.duration_ms ? `⏱️ Durasi  : ${formatDuration(track.duration_ms)}` : '',
		track.popularity ? `🔥 Popular : ${track.popularity}%` : '',
		'',
		`🔗 https://open.spotify.com/track/${track.id}`
	].filter(Boolean).join('\n')

	const content = {
		image: track.album?.images?.[0]?.url ? { url: track.album.images[0].url } : undefined,
		text: caption,
		title: '🎵 Spotify Search',
		footer: 'Powered by shitools',
		interactiveButtons: [
			urlButton('🔗 Buka Spotify', `https://open.spotify.com/track/${track.id}`),
			quickReplyButton('📥 Download', `.spotifydl https://open.spotify.com/track/${track.id}`),
			quickReplyButton('➡️ Next', '.spotifynext'),
			copyButton('📋 Copy Link', `https://open.spotify.com/track/${track.id}`)
		]
	}

	if (!content.image) delete content.image
	await sock.sendMessage(jid, await withContextInfo(sock, content), quoted ? { quoted } : {})
}
