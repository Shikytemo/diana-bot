import { pinterest } from '@shikytemo/shitools'

const maxShown = 10

export const scrapePinterestForReply = async input => {
	const result = await pinterest(input, { limit: maxShown })
	const media = (result.media || []).slice(0, maxShown)
	const images = media.filter(item => item.type === 'image').slice(0, maxShown)

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
		`🧩 Media: ${media.length}${result.total ? `/${result.total}` : ''}`,
		'',
		...media.slice(0, maxShown).map((item, index) => `${index + 1}. ${item.type === 'video' ? '🎥' : '🖼️'} ${item.url}`)
	].filter(Boolean)

	if (result.total > maxShown) {
		lines.push('', `+${result.total - maxShown} media lain tidak ditampilkan.`)
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

export const sendPinterestImages = async ({ sock, jid, images, quoted }) => {
	for (const [index, item] of images.entries()) {
		await sock.sendMessage(
			jid,
			{
				image: { url: item.url },
				caption: `📌 Pinterest ${index + 1}/${images.length}`
			},
			index === 0 ? { quoted } : {}
		)
	}
}
