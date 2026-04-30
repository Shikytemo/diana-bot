import makeWASocket, { Browsers, DisconnectReason, useMultiFileAuthState } from 'shileys'
import { mkdir, readFile, rm } from 'fs/promises'
import { join } from 'path'
import { followChannelOnce } from './channel.js'
import { JsonDatabase } from './database.js'
import { handleMessages } from '../functions/handler.js'

const autoFollowChannelUrl = 'https://whatsapp.com/channel/0029VbCyv0UHFxOwu9cipn2'

const shouldReconnect = lastDisconnect => {
	const statusCode = lastDisconnect?.error?.output?.statusCode
	return statusCode !== DisconnectReason.loggedOut
}

const normalizePairingCode = code => code.replace(/[^a-zA-Z0-9]/g, '').toUpperCase()

const resetStalePairingSession = async (sessionDir, logger) => {
	const credsFile = join(sessionDir, 'creds.json')
	try {
		const creds = JSON.parse(await readFile(credsFile, 'utf8'))
		if (creds && creds.registered === false) {
			await rm(sessionDir, { recursive: true, force: true })
			logger.warn('stale unregistered pairing session cleared')
		}
	} catch (error) {
		if (error.code !== 'ENOENT') {
			throw error
		}
	}
}

const autoFollowChannel = async ({ sock, db, logger }) => {
	try {
		const result = await followChannelOnce({
			sock,
			db,
			input: autoFollowChannelUrl,
			logger
		})

		if (result.skipped) {
			logger.debug({ channel: result.jid, name: result.name }, 'auto follow channel skipped')
		}
	} catch (error) {
		logger.warn({ error }, 'auto follow channel failed')
	}
}

export const connectBot = async ({ config, logger }) => {
	await mkdir(config.sessionDir, { recursive: true })
	let pairingCodeRequested = false
	let pairingWaitTimer = null
	let reconnectTimer = null

	const db = new JsonDatabase(config.databaseFile)
	await db.load()

	if (config.resetStalePairingSession) {
		await resetStalePairingSession(config.sessionDir, logger)
		await mkdir(config.sessionDir, { recursive: true })
	}

	const { state, saveCreds } = await useMultiFileAuthState(config.sessionDir)

	if (!state.creds.registered && !config.pairingNumber) {
		throw new Error('Nomor HP wajib diisi untuk pairing code login.')
	}

	const sock = makeWASocket({
		auth: state,
		browser: Browsers.macOS(config.browserName),
		logger: logger.child({ module: 'wa' }, { level: config.waLogLevel }),
		printQRInTerminal: false,
		markOnlineOnConnect: true
	})
	sock.dianaConfig = config
	sock.dianaDb = db

	const requestCodeOnce = async () => {
		if (sock.authState.creds.registered || pairingCodeRequested || !config.pairingNumber) {
			return
		}

		const customCode = normalizePairingCode(config.pairingCode)
		if (customCode.length !== 8) {
			throw new Error(`PAIRING_CODE must be 8 alphanumeric chars after cleanup. Current: ${customCode}`)
		}

		await sock.waitForSocketOpen()
		const code = await sock.requestPairingCode(config.pairingNumber.replace(/\D/g, ''), customCode)
		pairingCodeRequested = true
		logger.info({ code, browser: config.browserName }, 'pairing code generated')
		console.log(`Pairing code: ${code}`)
		console.log('Masukkan kode itu di WhatsApp > Linked devices. CLI akan tetap menunggu pairing.')

		pairingWaitTimer = setTimeout(() => {
			logger.warn('pairing wait timeout reached; run diana again if pairing was not completed')
			process.exitCode = 0
		}, config.pairingWaitMs)
	}

	sock.ev.on('creds.update', saveCreds)

	sock.ev.on('connection.update', update => {
		const { connection, lastDisconnect, qr } = update

		if (qr && !sock.authState.creds.registered) {
			requestCodeOnce().catch(error => logger.error({ error }, 'failed to request pairing code'))
		}

		if (connection === 'open') {
			if (pairingWaitTimer) {
				clearTimeout(pairingWaitTimer)
				pairingWaitTimer = null
			}
			if (reconnectTimer) {
				clearTimeout(reconnectTimer)
				reconnectTimer = null
			}
			logger.info({ name: config.name }, 'bot connected')
			autoFollowChannel({ sock, db, logger })
		}

		if (connection === 'close') {
			if (pairingCodeRequested && !sock.authState.creds.registered) {
				logger.warn('connection closed after pairing code was generated; keeping CLI alive while you enter the code')
				return
			}

			const reconnect = shouldReconnect(lastDisconnect)
			logger.warn({ reconnect, error: lastDisconnect?.error }, 'connection closed')
			if (reconnect && !reconnectTimer) {
				reconnectTimer = setTimeout(() => {
					connectBot({ config, logger }).catch(error => logger.error({ error }, 'reconnect failed'))
				}, 3000)
			}
		}
	})

	sock.ev.on('messages.upsert', event => {
		handleMessages({
			sock,
			messages: event.messages,
			type: event.type,
			config,
			db,
			logger
		}).catch(error => logger.error({ error }, 'message handler failed'))
	})

	return sock
}
