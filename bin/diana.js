#!/usr/bin/env node

import { connectBot } from '../lib/client.js'
import { config as baseConfig } from '../config.js'
import { createLogger } from '../lib/logger.js'
import { getPhoneFromCli, isSessionRegistered } from '../lib/phone.js'

const phone = (await isSessionRegistered(baseConfig.sessionDir)) ? baseConfig.pairingNumber : await getPhoneFromCli()

if (!(await isSessionRegistered(baseConfig.sessionDir)) && !phone) {
	console.error('Nomor HP wajib diisi.')
	process.exit(1)
}

const config = {
	...baseConfig,
	pairingNumber: phone
}

const logger = createLogger(config.logLevel)

connectBot({ config, logger }).catch(error => {
	logger.error({ error }, 'failed to start bot')
	process.exitCode = 1
})
