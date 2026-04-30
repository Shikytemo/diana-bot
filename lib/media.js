import { downloadMediaMessage, extractMessageContent, getContentType } from 'shileys'

const mediaMessageTypes = new Set(['imageMessage', 'videoMessage', 'audioMessage', 'documentMessage', 'stickerMessage'])

const unwrapMessage = content => extractMessageContent(content) || content

const getQuotedMessage = message => {
	const content = unwrapMessage(message.message || {})
	const contextInfo = Object.values(content || {}).find(value => value?.contextInfo)?.contextInfo
	const quotedMessage = contextInfo?.quotedMessage

	if (!quotedMessage) return null

	return {
		key: {
			remoteJid: message.key.remoteJid,
			id: contextInfo.stanzaId,
			participant: contextInfo.participant,
			fromMe: false
		},
		message: quotedMessage
	}
}

export const getMediaInfo = message => {
	const content = unwrapMessage(message.message || {})
	const type = getContentType(content)
	const media = content?.[type]

	if (!mediaMessageTypes.has(type) || !media || typeof media !== 'object') return null

	return {
		type: type.replace('Message', ''),
		messageType: type,
		mimetype: media.mimetype || (type === 'stickerMessage' ? 'image/webp' : 'application/octet-stream'),
		fileName: media.fileName
	}
}

export const getMediaTarget = message => {
	const quoted = getQuotedMessage(message)
	if (quoted && getMediaInfo(quoted)) return quoted
	if (getMediaInfo(message)) return message
	return null
}

export const isMedia = message => Boolean(getMediaTarget(message))

export const downloadMedia = async ({ message, logger, sock }) => {
	const target = getMediaTarget(message)
	if (!target) return null

	const info = getMediaInfo(target)
	if (!info) return null

	const buffer = await downloadMediaMessage(
		target,
		'buffer',
		{},
		{
			logger,
			reuploadRequest: async mediaMessage => {
				if (typeof sock?.updateMediaMessage === 'function') {
					return sock.updateMediaMessage(mediaMessage)
				}

				return mediaMessage
			}
		}
	)

	return { buffer, info, message: target }
}
