import { getMessageText, getSenderJid } from './message.js'
import { withContextInfo } from './reply-style.js'

const spamWindowMs = 8000
const spamLimit = 6
const maxWarnings = 3
const maxDeletedMessages = 400
const deletedMessages = new Map()
const spamBuckets = new Map()
const handledDeletes = new Set()

const defaultSettings = () => ({
	welcome: false,
	leave: false,
	antiLink: false,
	antiSpam: false,
	antiDelete: false
})

export const isGroupJid = jid => typeof jid === 'string' && jid.endsWith('@g.us')

export const normalizeNumber = value => String(value || '').split('@')[0].split(':')[0].replace(/\D/g, '')

const jidFromNumber = value => {
	const number = normalizeNumber(value)
	return number ? `${number}@s.whatsapp.net` : null
}

const sameJidNumber = (a, b) => normalizeNumber(a) && normalizeNumber(a) === normalizeNumber(b)

const normalizeSettings = raw => ({
	...defaultSettings(),
	...raw,
	antiLink: Boolean(raw?.antiLink ?? raw?.antilink),
	antiSpam: Boolean(raw?.antiSpam ?? raw?.antispam),
	antiDelete: Boolean(raw?.antiDelete ?? raw?.antidelete)
})

export const getGroupSettings = (db, jid) => {
	const chat = db.getChat(jid)
	chat.settings = normalizeSettings(chat.settings)
	chat.warns ||= {}
	return chat.settings
}

export const setGroupSetting = (db, jid, key, value) => {
	const settings = getGroupSettings(db, jid)
	settings[key] = value
	return settings
}

export const formatGroupSettings = settings =>
	[
		'*Group settings*',
		`Welcome: ${settings.welcome ? 'on' : 'off'}`,
		`Leave: ${settings.leave ? 'on' : 'off'}`,
		`Anti-link: ${settings.antiLink ? 'on' : 'off'}`,
		`Anti-spam: ${settings.antiSpam ? 'on' : 'off'}`,
		`Anti-delete: ${settings.antiDelete ? 'on' : 'off'}`
	].join('\n')

const warningKey = jid => normalizeNumber(jid) || jid

export const addWarning = (db, groupJid, userJid, amount = 1) => {
	const chat = db.getChat(groupJid)
	chat.warns ||= {}
	const key = warningKey(userJid)
	chat.warns[key] = Math.max(0, (Number(chat.warns[key]) || 0) + amount)
	return chat.warns[key]
}

export const removeWarning = (db, groupJid, userJid, amount = 1) => {
	const chat = db.getChat(groupJid)
	chat.warns ||= {}
	const key = warningKey(userJid)
	chat.warns[key] = Math.max(0, (Number(chat.warns[key]) || 0) - amount)
	if (chat.warns[key] === 0) delete chat.warns[key]
	return chat.warns[key] || 0
}

export const addWarn = addWarning
export const removeWarn = removeWarning

const getMetadata = async (sock, jid, logger) => {
	if (!isGroupJid(jid) || typeof sock.groupMetadata !== 'function') return null

	try {
		return await sock.groupMetadata(jid)
	} catch (error) {
		logger?.debug({ error, jid }, 'failed to read group metadata')
		return null
	}
}

export const getGroupParticipant = (metadata, jid) => {
	const number = normalizeNumber(jid)
	if (!number) return null
	return metadata?.participants?.find(participant => normalizeNumber(participant.id) === number)
}

export const isParticipantAdmin = (metadata, jid) => ['admin', 'superadmin'].includes(getGroupParticipant(metadata, jid)?.admin)

export const isBotAdmin = async ({ sock, jid, logger }) => {
	const metadata = await getMetadata(sock, jid, logger)
	const botJid = sock.user?.id || sock.user?.jid
	return Boolean(metadata && isParticipantAdmin(metadata, botJid))
}

export const requireGroupAdmin = async m => {
	if (!isGroupJid(m.jid)) {
		await m.reply('Command ini hanya bisa dipakai di grup.')
		return false
	}

	if (!m.isOwner && !m.isGroupAdmin) {
		await m.reply('Command ini hanya untuk admin grup.')
		return false
	}

	return true
}

export const requireBotGroupAdmin = async m => {
	if (await isBotAdmin({ sock: m.sock, jid: m.jid, logger: m.logger })) return true

	await m.reply('Bot harus menjadi admin grup untuk menjalankan command ini.')
	return false
}

export const resolveTargetJids = (message, command) => {
	const context = message.message?.extendedTextMessage?.contextInfo || {}
	const targets = [
		...(context.mentionedJid || []),
		context.participant,
		...command.args.map(jidFromNumber)
	].filter(Boolean)

	const unique = []
	for (const target of targets) {
		if (!unique.some(item => sameJidNumber(item, target))) unique.push(target)
	}
	return unique
}

const linkPattern = /(?:https?:\/\/|chat\.whatsapp\.com\/|whatsapp\.com\/channel\/|wa\.me\/|www\.)\S+/i

const isLinkText = text => linkPattern.test(text || '')

const deleteGroupMessage = async ({ sock, jid, message, logger }) => {
	try {
		await sock.sendMessage(jid, { delete: message.key })
		return true
	} catch (error) {
		logger?.debug({ error, jid }, 'failed to delete group message')
		return false
	}
}

const moderateBadMessage = async ({ sock, db, jid, sender, message, reason, logger }) => {
	await deleteGroupMessage({ sock, jid, message, logger })
	const count = addWarning(db, jid, sender)
	await db.save()
	await sock.sendMessage(
		jid,
		await withContextInfo(sock, {
			text: `@${normalizeNumber(sender)} ${reason}. Warn ${count}/${maxWarnings}.`,
			mentions: [sender]
		}),
		{ quoted: message }
	)

	if (count < maxWarnings || typeof sock.groupParticipantsUpdate !== 'function') return

	try {
		await sock.groupParticipantsUpdate(jid, [sender], 'remove')
		removeWarning(db, jid, sender, count)
		await db.save()
		await sock.sendMessage(jid, await withContextInfo(sock, { text: `@${normalizeNumber(sender)} dikeluarkan karena mencapai ${maxWarnings} warn.`, mentions: [sender] }))
	} catch (error) {
		logger?.debug({ error, jid, sender }, 'failed to kick warned participant')
	}
}

const isDeleteProtocol = message => {
	const protocol = message.message?.protocolMessage
	return protocol?.key && ['REVOKE', 0].includes(protocol.type)
}

const deletedMessageKey = key => [key?.remoteJid, key?.participant, key?.id].filter(Boolean).join(':')

const describeMessage = message => {
	const text = getMessageText(message).trim()
	if (text) return text

	const content = message.message || {}
	const type = Object.keys(content)[0] || 'pesan'
	return `[${type}]`
}

const rememberMessage = (message, text) => {
	if (!message.key?.id || isDeleteProtocol(message)) return

	const key = deletedMessageKey(message.key)
	deletedMessages.set(key, {
		jid: message.key.remoteJid,
		sender: getSenderJid(message),
		text: text || describeMessage(message),
		at: Date.now()
	})

	if (deletedMessages.size > maxDeletedMessages) {
		deletedMessages.delete(deletedMessages.keys().next().value)
	}
}

export const cacheMessageForAntidelete = rememberMessage

export const handleAntiDelete = async ({ sock, message, db, logger }) => {
	const protocol = message.message?.protocolMessage
	const deletedKey = protocol?.key
	const jid = deletedKey?.remoteJid || message.key?.remoteJid
	if (!isGroupJid(jid) || !deletedKey || !getGroupSettings(db, jid).antiDelete) return false

	const normalizedDeletedKey = { ...deletedKey, remoteJid: jid }
	const handleKey = deletedMessageKey(normalizedDeletedKey)
	if (handledDeletes.has(handleKey)) return true
	handledDeletes.add(handleKey)
	if (handledDeletes.size > maxDeletedMessages) {
		handledDeletes.delete(handledDeletes.values().next().value)
	}

	const original = deletedMessages.get(handleKey)
	const sender = original?.sender || normalizedDeletedKey.participant || message.key.participant || message.key.remoteJid
	const body = original?.text || 'Pesan tidak tersimpan di cache.'
	try {
		await sock.sendMessage(jid, await withContextInfo(sock, {
			text: `Anti-delete\nPengirim: @${normalizeNumber(sender)}\nIsi: ${body}`,
			mentions: [sender].filter(Boolean)
		}))
		return true
	} catch (error) {
		logger?.debug({ error, jid }, 'failed to send anti-delete message')
		return false
	}
}

export const handleDeleteUpdates = async ({ sock, updates, db, logger }) => {
	await handleMessageUpdateForAntiDelete({ sock, updates, db, logger })
}

const checkSpam = ({ jid, sender }) => {
	const key = `${jid}:${sender}`
	const now = Date.now()
	const bucket = (spamBuckets.get(key) || []).filter(timestamp => now - timestamp <= spamWindowMs)
	bucket.push(now)
	spamBuckets.set(key, bucket)
	return bucket.length > spamLimit
}

export const processGroupMessageGuards = async ({ sock, message, text, db, config, logger }) => {
	const jid = message.key.remoteJid
	const sender = getSenderJid(message)
	if (!isGroupJid(jid) || !sender) return false

	const settings = getGroupSettings(db, jid)
	if (settings.antiDelete) {
		if (await handleAntiDelete({ sock, message, db, logger })) return true
		rememberMessage(message, text)
	}

	if (!settings.antiLink && !settings.antiSpam) return false

	const metadata = await getMetadata(sock, jid, logger)
	const ownerNumber = normalizeNumber(config.ownerNumber)
	const senderNumber = normalizeNumber(sender)
	if (ownerNumber && senderNumber === ownerNumber) return false
	if (metadata && isParticipantAdmin(metadata, sender)) return false

	if (settings.antiLink && isLinkText(text)) {
		await moderateBadMessage({ sock, db, jid, sender, message, reason: 'link tidak diizinkan', logger })
		return true
	}

	if (settings.antiSpam && checkSpam({ jid, sender })) {
		await moderateBadMessage({ sock, db, jid, sender, message, reason: 'spam terdeteksi', logger })
		return true
	}

	return false
}

export const handleGroupModeration = async ({ m }) => processGroupMessageGuards({
	sock: m.sock,
	message: m.message,
	text: m.text,
	db: m.db,
	config: m.config,
	logger: m.logger
})

export const handleGroupParticipantsUpdate = async ({ sock, update, db, logger }) => {
	const jid = update.id
	if (!isGroupJid(jid)) return

	const settings = getGroupSettings(db, jid)
	const participants = update.participants || []
	if (!participants.length) return

	if (update.action === 'add' && settings.welcome) {
		await sock.sendMessage(jid, await withContextInfo(sock, {
			text: `Selamat datang ${participants.map(item => `@${normalizeNumber(item)}`).join(', ')}.`,
			mentions: participants
		})).catch(error => logger?.debug({ error, jid }, 'failed to send welcome message'))
	}

	if (['remove', 'leave'].includes(update.action) && settings.leave) {
		await sock.sendMessage(jid, await withContextInfo(sock, {
			text: `${participants.map(item => `@${normalizeNumber(item)}`).join(', ')} keluar dari grup.`,
			mentions: participants
		})).catch(error => logger?.debug({ error, jid }, 'failed to send leave message'))
	}
}

export const handleMessageUpdateForAntiDelete = async ({ sock, updates, db, logger }) => {
	for (const update of updates || []) {
		if (update.update?.message?.protocolMessage) {
			await handleAntiDelete({
				sock,
				message: {
					key: update.key,
					message: update.update.message
				},
				db,
				logger
			})
		}
	}
}
