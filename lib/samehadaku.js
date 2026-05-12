import { getSamehadakuLegacyStream, getSamehadakuStream as fetchSamehadakuStream, parseSamehadakuEpisodePage } from '@shikytemo/shitools'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { quickReplyButton, singleSelectButton, urlButton } from 'shileys'
import { withContextInfo } from './reply-style.js'

const maxEpisodeRows = 20
const sessionTtlMs = 1000 * 60 * 30
const sessions = new Map()

const sessionKey = ({ jid, sender }) => `${jid}:${sender || jid}`

const cleanupSessions = () => {
	const now = Date.now()
	for (const [key, session] of sessions) {
		if (session.expiresAt <= now) sessions.delete(key)
	}
}

const cleanText = value => String(value || '').replace(/\s+/g, ' ').trim()
const directVideoPattern = /\.(?:mp4|webm|mkv)(?:[?#].*)?$/i
const samehadakuSlug = url => {
	try {
		return new URL(url).pathname.split('/').filter(Boolean).at(-1) || ''
	} catch {
		return ''
	}
}

const fetchHtml = async url => {
	const response = await fetch(url, {
		headers: {
			accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
			'user-agent': process.env.USER_AGENT || 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120 Safari/537.36'
		}
	})

	if (!response.ok) throw new Error(`Samehadaku request failed ${response.status} ${response.statusText}`)
	return response.text()
}

export const getSamehadakuStream = async input => {
	const result = await fetchSamehadakuStream(input, { limit: 8 })
	if (!result.ok) {
		return {
			ok: false,
			text: result.text === 'Samehadaku episode not found' ? 'Episode Samehadaku tidak ditemukan.' : 'Stream Samehadaku tidak ditemukan di halaman episode.'
		}
	}

	return result
}

export const saveSamehadakuSession = ({ jid, sender, result }) => {
	cleanupSessions()
	if (!result?.episode?.mirrors?.length) return null

	const session = {
		episode: result.episode,
		index: 0,
		expiresAt: Date.now() + sessionTtlMs
	}

	sessions.set(sessionKey({ jid, sender }), session)
	return session
}

const getSamehadakuSession = ({ jid, sender }) => {
	cleanupSessions()
	return sessions.get(sessionKey({ jid, sender })) || null
}

export const nextSamehadakuSession = ({ jid, sender }) => {
	const session = getSamehadakuSession({ jid, sender })
	if (!session) return null

	session.index = (session.index + 1) % session.episode.mirrors.length
	session.expiresAt = Date.now() + sessionTtlMs
	return session
}

export const selectSamehadakuEpisode = async ({ jid, sender, index }) => {
	const session = getSamehadakuSession({ jid, sender })
	if (!session) return null

	const selectedIndex = Number(index) - 1
	const selected = session.episode.episodes?.[selectedIndex]
	if (!selected) return null

	const html = await fetchHtml(selected.url)
	const episode = parseSamehadakuEpisodePage(html, selected.url)
	episode.episodes = session.episode.episodes

	if (!episode.mirrors.length) {
		throw new Error('Stream Samehadaku tidak ditemukan di halaman episode.')
	}

	session.episode = episode
	session.index = 0
	session.expiresAt = Date.now() + sessionTtlMs
	return session
}

export const sendSamehadakuStream = async ({ sock, jid, session, quoted }) => {
	const episode = session.episode
	const mirror = episode.mirrors[session.index]
	const total = episode.mirrors.length
	const current = session.index + 1
	const episodeRows = (episode.episodes || []).slice(0, maxEpisodeRows).map((item, index) => ({
		header: item.episode ? `Episode ${item.episode}` : `${index + 1}`,
		title: cleanText(item.title).slice(0, 45) || `Episode ${index + 1}`,
		description: item.url,
		id: `.streamselect ${index + 1}`
	}))
	const lines = [
		`🎬 *${episode.title || 'Samehadaku Stream'}*`,
		'',
		`🧩 Server: ${mirror.name || 'Video'} (${current}/${total})`,
		`🔗 Stream: ${mirror.url}`,
		`📄 Episode: ${episode.url}`,
		episode.seriesUrl ? `📚 Series: ${episode.seriesUrl}` : ''
	].filter(Boolean)

	const content = {
		image: episode.image ? { url: episode.image } : undefined,
		text: lines.join('\n'),
		title: '🎬 Samehadaku Stream',
		footer: 'Powered by shitools',
		interactiveButtons: [
			urlButton('📄 Detail Episode', episode.url),
			urlButton('▶️ Buka Stream', mirror.url),
			quickReplyButton('➡️ Server Lain', '.streamnext'),
			...(episodeRows.length ? [
				singleSelectButton('📺 Pilih Episode', [
					{
						title: 'Episode tersedia',
						rows: episodeRows
					}
				])
			] : [])
		]
	}

	if (!content.image) delete content.image

	await sock.sendMessage(jid, await withContextInfo(sock, content), quoted ? { quoted } : {})
}

const downloadVideoBuffer = async url => {
	const response = await fetch(url, {
		headers: {
			'user-agent': process.env.USER_AGENT || 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120 Safari/537.36'
		}
	})

	if (!response.ok) throw new Error(`Download video failed ${response.status} ${response.statusText}`)

	const contentType = response.headers.get('content-type') || ''
	if (!contentType.startsWith('video/') && !directVideoPattern.test(url)) {
		throw new Error('Stream URL bukan file video langsung.')
	}

	const tempDir = await mkdtemp(path.join(os.tmpdir(), 'diana-samehadaku-'))
	const tempFile = path.join(tempDir, 'stream-video')

	try {
		const buffer = Buffer.from(await response.arrayBuffer())
		await writeFile(tempFile, buffer)
		return await readFile(tempFile)
	} finally {
		await rm(tempDir, { force: true, recursive: true })
	}
}

export const sendSamehadakuVideo = async ({ sock, jid, session, quoted }) => {
	const episode = session.episode
	let mirror = episode.mirrors[session.index]

	if (!directVideoPattern.test(mirror.url)) {
		const slug = samehadakuSlug(episode.url)
		const legacy = slug ? await getSamehadakuLegacyStream(slug).catch(() => null) : null
		const directMirror = legacy?.episode?.mirrors?.find(item => item.directVideo && /720p/i.test(item.name)) ||
			legacy?.episode?.mirrors?.find(item => item.directVideo)
		if (directMirror) mirror = directMirror
	}

	try {
		const video = await downloadVideoBuffer(mirror.url)
		await sock.sendMessage(
			jid,
			{
				video,
				mimetype: 'video/mp4',
				caption: `🎬 ${episode.title || 'Samehadaku Stream'}`
			},
			quoted ? { quoted } : {}
		)
	} catch {
		await sendSamehadakuStream({ sock, jid, session, quoted })
	}
}
