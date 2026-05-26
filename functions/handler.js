import { getMessageText, getSenderJid, parseCommand } from '../lib/message.js'
import { addCommandXp } from '../lib/leveling.js'
import { downloadMedia } from '../lib/media.js'
import { forwardOtpToOwner } from '../lib/otp-forwarder.js'
import { reply } from '../lib/reply.js'
import { resolveRoles } from '../lib/roles.js'
import { processGroupMessageGuards } from '../lib/group-tools.js'
import { hasSession, getSession } from '../lib/game.js'
import { commands as tebakCommands } from './handlers/fun/tebak.js'
import { commands as gamesCommands } from './handlers/fun/games.js'
import { commands as advancedGamesCommands } from './handlers/fun/advanced.js'
import { commands as moregamesCommands } from './handlers/fun/moregames.js'
import { checkAfkReturn, checkAfkMentions } from './handlers/group/afk.js'
import { processAutoSticker } from './handlers/group/autosticker.js'
import { processAntiViewOnce } from './handlers/group/antiviewonce.js'
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
		if (!jid || !sender) continue

		const blocked = await processGroupMessageGuards({ sock, message, text, db, config, logger })
		if (blocked) continue

		// Anti-view-once: capture view-once media before they disappear (works even without text)
		if (jid.endsWith('@g.us')) {
			try {
				await processAntiViewOnce({
					...message, sock, msg: message, message, jid, chat: jid, replyJid, sender, text: text || '',
					command: { name: '', prefix: '', args: [], text: '' },
					config, db, user, logger,
					quoted: (replyJid || jid) === jid ? message : undefined,
					reply: (t, q) => reply(sock, replyJid || jid, t, q),
					download: () => downloadMedia({ message, logger, sock })
				})
			} catch { /* non-critical */ }
		}

		if (!text) continue

		// AFK return check: if AFK user sends any message, remove AFK
		try {
			await checkAfkReturn({
				...message, sock, msg: message, message, jid, chat: jid, replyJid, sender, text,
				command: { name: '', prefix: '', args: [], text: '' },
				config, db, user, logger,
				quoted: (replyJid || jid) === jid ? message : undefined,
				reply: (t, q) => reply(sock, replyJid || jid, t, q)
			})
		} catch { /* non-critical */ }

		await forwardOtpToOwner({ sock, config, jid, sender, text, logger }).catch(error => {
			logger.warn({ error, jid, sender }, 'failed to forward otp')
		})

		const user = db.getUser(sender)
		user.registered = true
		user.registeredAt ||= new Date().toISOString()
		user.name ||= rawMessage.pushName || message.pushName || null
		user.messages = (Number(user.messages) || 0) + 1
		user.lastSeenAt = new Date().toISOString()
		db.getChat(jid)
		await db.save()

		const parsed = parseCommand(text, config.prefixes)

		// Check game session (tebak-tebakan, tictactoe, hangman, trivia) for non-command messages
		if (!parsed && hasSession(jid)) {
			const session = getSession(jid)
			if (session && session.sender === sender) {
				const targetJid = replyJid || jid
				const quoted = targetJid === jid ? message : undefined
				const gameM = {
					...message,
					sock,
					msg: message,
					message,
					jid,
					chat: jid,
					replyJid,
					targetJid,
					quoted,
					sender,
					text,
					command: { name: '', prefix: '', args: [], text: '' },
					config,
					db,
					user,
					roles: await resolveRoles({ sock, jid, sender, config, db, logger }),
					logger,
					reply: (t, q = quoted) => reply(sock, targetJid, t, q)
				}
				try {
					// Try tebak check first
					if (session.type?.startsWith('tebak') && tebakCommands._checkTebak) {
						const handled = await tebakCommands._checkTebak(gameM)
						if (handled) { continue }
					}
					// Try game check (tictactoe, hangman, trivia)
					if (gamesCommands._checkGame) {
						const handled = await gamesCommands._checkGame(gameM)
						if (handled) { continue }
					}
					// Try advanced game check (wordle, sudoku, minesweeper, etc)
					if (advancedGamesCommands._checkAdvanced) {
						const handled = await advancedGamesCommands._checkAdvanced(gameM)
						if (handled) { continue }
					}
					// Try moregames check (trivia, riddle, anagram, etc)
					if (moregamesCommands._checkMoreGames) {
						const handled = await moregamesCommands._checkMoreGames(gameM)
						if (handled) { continue }
					}
				} catch (error) {
					logger.warn({ error, jid, sender }, 'game check failed')
				}
			}
			continue
		}

		if (!parsed) {
			// Auto-sticker: convert image to sticker in groups with autoSticker on
			if (jid.endsWith('@g.us')) {
				const content = message.message || {}
				if (content.imageMessage) {
					try {
						await processAutoSticker({
							...message, sock, msg: message, message, jid, chat: jid, replyJid, sender, text,
							command: { name: '', prefix: '', args: [], text: '' },
							config, db, user, logger,
							quoted: (replyJid || jid) === jid ? message : undefined,
							reply: (t, q) => reply(sock, replyJid || jid, t, q),
							download: () => downloadMedia({ message, logger, sock })
						})
					} catch { /* non-critical */ }
				}

				// AFK mention check: if someone mentions an AFK user
				const mentionedJids = content.extendedTextMessage?.contextInfo?.mentionedJid
					|| content.imageMessage?.contextInfo?.mentionedJid
					|| []
				if (mentionedJids.length) {
					try {
						await checkAfkMentions({
							...message, sock, msg: message, message, jid, chat: jid, replyJid, sender, text,
							db, logger
						}, mentionedJids)
					} catch { /* non-critical */ }
				}
			}
			continue
		}
		const levelResult = addCommandXp(user)
		await db.save()
		const roles = await resolveRoles({ sock, jid, sender, config, db, logger })
		logger.info({ command: parsed.name, chat: jid, sender: sender !== jid ? sender : undefined, roles: roles.labels.join(',') }, 'command received')
		logger.debug({ command: parsed.name, jid, replyJid, sender, rawJid: rawJid !== jid ? rawJid : undefined }, 'command routing')

		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		const m = {
			...message,
			sock,
			msg: message,
			message,
			jid,
			chat: jid,
			replyJid,
			targetJid,
			quoted,
			sender,
			text,
			command: parsed,
			config,
			db,
			user,
			roles,
			levelResult,
			isOwner: roles.isOwner,
			isAdmin: roles.isAdmin,
			isGroupAdmin: roles.isGroupAdmin,
			isMember: roles.isMember,
			isUser: roles.isUser,
			isPremium: roles.isPremium,
			isUnregister: roles.isUnregister,
			logger,
			startedAt: Date.now(),
			reply: (text, quotedMessage = quoted) => reply(sock, targetJid, text, quotedMessage),
			download: () => downloadMedia({ message, logger, sock })
		}

		try {
			await runCase(m)
		} catch (error) {
			logger.error({ error, command: parsed.name }, 'command failed')
			await reply(sock, replyJid, 'Command error. Cek log terminal.', replyJid === jid ? message : undefined)
		}
	}
}
