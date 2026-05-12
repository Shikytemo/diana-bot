export const withContextInfo = async (sock, content) => {
	const custom = sock.dianaConfig?.customReply
	if (!custom?.enabled) return content

	return {
		...content,
		contextInfo: {
			externalAdReply: {
				title: custom.title || sock.dianaConfig?.name || 'Diana Bot',
				body: custom.body || '',
				mediaType: 1,
				renderLargerThumbnail: true,
				showAdAttribution: true,
				sourceUrl: custom.sourceUrl || '',
				thumbnailUrl: custom.thumbnailUrl || ''
			}
		}
	}
}
