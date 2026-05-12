import { pinterest } from '@shikytemo/shitools'
import { copyButton, quickReplyButton } from 'shileys'
import { withContextInfo } from './reply-style.js'

const maxShown = 10
const maxImages = 3
const sessions = new Map()
const sessionTtlMs = 1000 * 60 * 30

const sessionKey = ({ jid, sender }) => `${jid}:${sender || jid}`

const cleanupSessions = () => {
	const now = Date.now()
	for (const [key, session] of sessions) {
		if (session.expiresAt <= now) sessions.delete(key)
	}
}

export const scrapePinterestForReply = async input => {
	const result = await pinterest(input, { direct: true, jina: false, limit: maxShown })
	const media = (result.media || []).slice(0, maxShown)
	const images = media.filter(item => item.type === 'image').slice(0, maxImages)

	if (!media.length) {
		return {
			ok: false,
			text: 'Tidak ada media Pinterest yang ditemukan.'
		}
	}

	const lines = [
		result.mode === 'search' ? '🔎 *Pinterest Search*' : '📌 *Pinterest Downloader*',
		'',
		result.query ? `🔍 Query: ${result.query}` : '',
		result.title ? `🏷️ ${result.title}` : '',
		`🔎 Via: ${result.via}`,
		`🧩 Media: ${images.length}${result.total ? `/${result.total}` : ''}`,
		'',
		...images.map((item, index) => `${index + 1}. 🖼️ ${item.url}`)
	].filter(Boolean)

	if (result.total > maxImages) {
		lines.push('', `+${result.total - maxImages} media lain tidak ditampilkan.`)
	}

	return {
		ok: true,
		sourceUrl: result.source_url,
		firstMediaUrl: media[0].url,
		images,
		media,
		text: lines.join('\n')
	}
}

export const savePinterestSession = ({ jid, sender, result }) => {
	cleanupSessions()

	if (!result?.images?.length) return null

	const key = sessionKey({ jid, sender })
	const session = {
		images: result.images,
		sourceUrl: result.sourceUrl,
		title: result.text?.split('\n').find(line => line.startsWith('🏷️ '))?.replace('🏷️ ', '') || 'Pinterest',
		index: 0,
		expiresAt: Date.now() + sessionTtlMs
	}

	sessions.set(key, session)
	return session
}

export const getPinterestSession = ({ jid, sender }) => {
	cleanupSessions()
	return sessions.get(sessionKey({ jid, sender })) || null
}

export const nextPinterestSession = ({ jid, sender }) => {
	const session = getPinterestSession({ jid, sender })
	if (!session) return null

	session.index = (session.index + 1) % session.images.length
	session.expiresAt = Date.now() + sessionTtlMs
	return session
}

const sendImageWithFallback = async ({ sock, jid, item, caption, quoted }) => {
	const urls = [...new Set([item.url, ...(item.fallback_urls || []), item.original_url].filter(Boolean))]
	let lastError

	for (const url of urls) {
		try {
			await sock.sendMessage(
				jid,
				await withContextInfo(sock, {
					image: { url },
					text: caption,
					title: '📌 Pinterest',
					footer: 'Powered by shitools',
					interactiveButtons: [
						copyButton('📋 Copy Link', url),
						quickReplyButton('➡️ Next Photo', '.pinnext')
					]
				}),
				quoted ? { quoted } : {}
			)
			return url
		} catch (error) {
			lastError = error
		}
	}

	throw lastError
}

export const sendPinterestSessionPhoto = async ({ sock, jid, session, quoted }) => {
	const item = session.images[session.index]
	const total = session.images.length
	const current = session.index + 1
	const caption = `📌 Pinterest ${current}/${total}\n${session.title}`
	await sendImageWithFallback({ sock, jid, item, caption, quoted })
}
