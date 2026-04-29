import './lib/console-filter.js'
import { connectBot } from './lib/client.js'
import { config } from './config.js'
import { createLogger } from './lib/logger.js'
import { getPhoneFromCli, isSessionRegistered } from './lib/phone.js'

const logger = createLogger(config.logLevel)

process.on('unhandledRejection', error => {
	logger.error({ error }, 'unhandled rejection')
})

process.on('uncaughtException', error => {
	logger.error({ error }, 'uncaught exception')
})

const pairingNumber = (await isSessionRegistered(config.sessionDir)) ? config.pairingNumber : await getPhoneFromCli()

connectBot({ config: { ...config, pairingNumber }, logger }).catch(error => {
	logger.error({ error }, 'failed to start bot')
	process.exitCode = 1
})
