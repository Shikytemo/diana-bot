export const config = {
	name: process.env.BOT_NAME || 'Diana Bot',
	prefixes: (process.env.BOT_PREFIXES || '!,.,/').split(',').map(prefix => prefix.trim()).filter(Boolean),
	ownerNumber: process.env.OWNER_NUMBER || '12365021517',
	adminNumbers: (process.env.ADMIN_NUMBERS || '').split(',').map(number => number.trim()).filter(Boolean),
	premiumNumbers: (process.env.PREMIUM_NUMBERS || '').split(',').map(number => number.trim()).filter(Boolean),
	pairingNumber: process.env.BOT_PHONE_NUMBER || '',
	pairingCode: process.env.PAIRING_CODE || 'DIANABOT',
	pairingWaitMs: Number(process.env.PAIRING_WAIT_MS || 180000),
	resetStalePairingSession: process.env.RESET_STALE_PAIRING_SESSION !== 'false',
	browserName: process.env.BROWSER_NAME || 'Safari',
	waLogLevel: process.env.WA_LOG_LEVEL || 'silent',
	sessionDir: process.env.SESSION_DIR || './database/session',
	databaseFile: process.env.DATABASE_FILE || './database/data.json',
	logLevel: process.env.LOG_LEVEL || 'info',
	autoRead: process.env.AUTO_READ === 'true',
	customReply: {
		enabled: process.env.CUSTOM_REPLY_ENABLED !== 'false',
		forwarded: process.env.CUSTOM_REPLY_FORWARDED !== 'false',
		channelId: process.env.CUSTOM_REPLY_CHANNEL_ID || '',
		channelName: process.env.CUSTOM_REPLY_CHANNEL_NAME || 'Diana Bot',
		title: process.env.CUSTOM_REPLY_TITLE || 'Diana Bot',
		body: process.env.CUSTOM_REPLY_BODY || 'WhatsApp Bot',
		thumbnailUrl: process.env.CUSTOM_REPLY_THUMBNAIL_URL || '',
		sourceUrl: process.env.CUSTOM_REPLY_SOURCE_URL || 'https://github.com/Shikytemo/diana-bot'
	}
}
