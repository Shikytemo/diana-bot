const channelUrlRegex = /(?:https?:\/\/)?(?:www\.)?whatsapp\.com\/channel\/([A-Za-z0-9_-]+)/i

export const DEFAULT_CHANNEL_URL = 'https://whatsapp.com/channel/0029VbCyv0UHFxOwu9cipn2'

export const extractChannelInvite = input => {
	const text = String(input || '').trim()
	if (!text) return ''

	const match = text.match(channelUrlRegex)
	if (match?.[1]) return match[1]

	return text.replace(/^@/, '').replace(/[^A-Za-z0-9_-]/g, '')
}

export const getChannelUrl = invite => `https://whatsapp.com/channel/${invite}`

const asText = value => {
	if (!value) return ''
	if (typeof value === 'string') return value
	if (typeof value.text === 'string') return value.text
	if (typeof value.value === 'string') return value.value
	if (typeof value.name === 'string') return value.name
	return ''
}

export const getChannelId = async (sock, input) => {
	const invite = extractChannelInvite(input || DEFAULT_CHANNEL_URL)
	if (!invite) {
		throw new Error('Link channel tidak valid.')
	}

	if (typeof sock.newsletterMetadata !== 'function') {
		throw new Error('Socket belum support newsletter metadata.')
	}

	const metadata = await sock.newsletterMetadata('invite', invite)
	if (!metadata?.id) {
		throw new Error('Channel tidak ditemukan atau link tidak valid.')
	}

	const jid = metadata.id.endsWith('@newsletter') ? metadata.id : `${metadata.id}@newsletter`
	const metadataInvite = asText(metadata.invite) || invite

	return {
		invite: metadataInvite,
		jid,
		url: getChannelUrl(metadataInvite),
		name: asText(metadata.name) || asText(metadata.thread_metadata?.name) || '-',
		description: asText(metadata.description) || asText(metadata.thread_metadata?.description),
		subscribers: metadata.subscribers,
		verification: asText(metadata.verification) || '-'
	}
}

export const formatChannelId = data =>
	[
		'🛰️ *Channel ID ditemukan*',
		'',
		`🏷️ Nama: ${data.name}`,
		`🆔 ID: ${data.jid}`,
		`🔗 Link: ${data.url}`,
		Number.isFinite(data.subscribers) ? `👥 Subscribers: ${data.subscribers}` : '',
		`✅ Verifikasi: ${data.verification}`,
		data.description ? `📝 Deskripsi: ${data.description}` : ''
	].filter(Boolean).join('\n')
