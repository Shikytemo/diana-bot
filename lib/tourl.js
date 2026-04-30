import { mkdtemp, rm, writeFile } from 'fs/promises'
import { tmpdir } from 'os'
import { join } from 'path'
import { uploadFile } from '@shikytemo/shitools'
import { downloadMediaMessage, extractMessageContent, getContentType } from 'shileys'

const extensionByMime = {
	'image/jpeg': 'jpg',
	'image/png': 'png',
	'image/webp': 'webp',
	'image/gif': 'gif',
	'video/mp4': 'mp4',
	'audio/mpeg': 'mp3',
	'audio/ogg': 'ogg',
	'audio/mp4': 'm4a',
	'application/pdf': 'pdf',
	'application/zip': 'zip'
}

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

const getMediaInfo = message => {
	const content = unwrapMessage(message.message || {})
	const type = getContentType(content)
	const media = content?.[type]

	if (!mediaMessageTypes.has(type) || !media || typeof media !== 'object') return null

	return {
		type: type.replace('Message', ''),
		mimetype: media.mimetype || 'application/octet-stream',
		fileName: media.fileName
	}
}

const getMediaTarget = message => {
	const quoted = getQuotedMessage(message)
	if (quoted && getMediaInfo(quoted)) return quoted
	if (getMediaInfo(message)) return message
	return null
}

const createFilename = info => {
	if (info.fileName) return info.fileName

	const ext = extensionByMime[info.mimetype] || info.mimetype.split('/')[1] || 'bin'
	return `diana-${Date.now()}.${ext.replace(/[^a-z0-9]/gi, '') || 'bin'}`
}

export const uploadMessageMediaToUrl = async ({ message, logger, sock }) => {
	const target = getMediaTarget(message)
	if (!target) {
		return {
			ok: false,
			text: 'Reply atau kirim media dengan caption .tourl.'
		}
	}

	const info = getMediaInfo(target)

	if (!info) {
		return {
			ok: false,
			text: 'Reply atau kirim media dengan caption .tourl.'
		}
	}

	let buffer
	try {
		buffer = await downloadMediaMessage(
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
	} catch (error) {
		logger?.warn({ error }, 'failed to download media for tourl')
		return {
			ok: false,
			text: `Gagal download media: ${error.message || error}`
		}
	}

	const dir = await mkdtemp(join(tmpdir(), 'diana-tourl-'))
	const filename = createFilename(info)
	const filePath = join(dir, filename)

	try {
		await writeFile(filePath, buffer)
		const result = await uploadFile(filePath, {
			filename,
			contentType: info.mimetype
		})

		return {
			ok: true,
			url: result.url,
			text: [
				'Upload berhasil.',
				`Type: ${info.type}`,
				`Size: ${(buffer.length / 1024).toFixed(2)} KB`,
				`URL: ${result.url}`
			].join('\n')
		}
	} finally {
		await rm(dir, { recursive: true, force: true })
	}
}
