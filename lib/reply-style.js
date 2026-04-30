const replyStyleNames = ['v1', 'v2', 'v3', 'v4', 'v5']

export const normalizeReplyStyle = value => {
	const style = String(value || '').trim().toLowerCase()
	return replyStyleNames.includes(style) ? style : ''
}

export const getReplyStyle = db => normalizeReplyStyle(db?.getSetting?.('replyStyle')) || 'v1'

export const setReplyStyle = (db, style) => {
	const normalized = normalizeReplyStyle(style)
	if (!normalized) return ''

	db.setSetting('replyStyle', normalized)
	return normalized
}

export const formatReplyStyles = prefix =>
	[
		'🎭 *Custom Reply Style*',
		'',
		'v1 - Channel preview kecil',
		'v2 - Forwarded newsletter',
		'v3 - GitHub preview',
		'v4 - Preview besar',
		'v5 - Clean reply',
		'',
		`Format: ${prefix}setreply v1`
	].join('\n')

export const buildReplyContext = (config, db) => {
	const custom = config?.customReply
	if (!custom?.enabled) return undefined

	const style = getReplyStyle(db)
	if (style === 'v5') return undefined

	const contextInfo = {}
	const withForward = style === 'v1' || style === 'v2' || style === 'v4'
	const withNewsletter = style === 'v1' || style === 'v2' || style === 'v4'
	const withExternal = style === 'v1' || style === 'v3' || style === 'v4'

	if (withForward) {
		contextInfo.isForwarded = true
		contextInfo.forwardingScore = Number.isFinite(custom.forwardingScore) ? custom.forwardingScore : 1
	}

	if (withNewsletter && custom.channelId) {
		contextInfo.forwardedNewsletterMessageInfo = {
			newsletterJid: custom.channelId,
			newsletterName: custom.channelName || custom.title || 'Diana Bot',
			serverMessageId: style === 'v2' ? -1 : 1
		}
	}

	if (withExternal) {
		contextInfo.externalAdReply = {
			title: style === 'v3' ? 'Diana Bot GitHub' : (custom.title || custom.channelName || 'Diana Bot'),
			body: style === 'v3' ? 'Source code Diana Bot' : (custom.body || ''),
			mediaType: 1,
			renderLargerThumbnail: style === 'v4',
			showAdAttribution: style === 'v4',
			sourceUrl: custom.sourceUrl || undefined,
			thumbnailUrl: custom.thumbnailUrl || undefined
		}
	}

	return Object.keys(contextInfo).length ? contextInfo : undefined
}
