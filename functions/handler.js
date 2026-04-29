import { getMessageText, getSenderJid, parseCommand } from '../lib/message.js'
import { replyText } from '../lib/reply.js'
import { runCase } from './case.js'

const isLidJid = jid => typeof jid === 'string' && jid.endsWith('@lid')

const resolveReplyJid = async (sock, message, jid) => {
	if (!isLidJid(jid)) return jid

	const altJid = message.key?.remoteJidAlt
	if (altJid && !isLidJid(altJid)) return altJid

	if (typeof sock.lidToJid !== 'function') return jid

	try {
		return (await sock.lidToJid(jid)) || jid
	} catch {
		return jid
	}
}

const normalizeIncomingMessage = async (sock, message) => {
	if (typeof sock.normalizeMessageLidToJid !== 'function') return message

	try {
		return await sock.normalizeMessageLidToJid(message)
	} catch {
		return message
	}
}

export const handleMessages = async ({ sock, messages, type, config, db, logger }) => {
	if (!['notify', 'append'].includes(type)) return

	for (const rawMessage of messages) {
		if (!rawMessage.message || rawMessage.key.fromMe) continue

		const message = await normalizeIncomingMessage(sock, rawMessage)
		const rawJid = rawMessage.key.remoteJid
		const jid = message.key.remoteJid
		const replyJid = await resolveReplyJid(sock, rawMessage, jid)
		const sender = getSenderJid(message)
		const text = getMessageText(message).trim()
		if (!jid || !sender || !text) continue

		db.getUser(sender)
		db.getChat(jid)
		await db.save()

		const parsed = parseCommand(text, config.prefixes)
		if (!parsed) continue
		logger.info({ command: parsed.name, chat: jid, sender: sender !== jid ? sender : undefined }, 'command received')
		logger.debug({ command: parsed.name, jid, replyJid, sender, rawJid: rawJid !== jid ? rawJid : undefined }, 'command routing')

		const ctx = {
			sock,
			message,
			jid,
			replyJid,
			sender,
			text,
			command: parsed,
			config,
			db,
			logger,
			startedAt: Date.now()
		}

		try {
			await runCase(ctx)
		} catch (error) {
			logger.error({ error, command: parsed.name }, 'command failed')
			await replyText(sock, replyJid, 'Command error. Cek log terminal.', replyJid === jid ? message : undefined)
		}
	}
}
