export const config = {
	name: process.env.BOT_NAME || 'Diana Bot',
	version: process.env.BOT_VERSION || '1.0.0',
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
		forwardingScore: Number(process.env.CUSTOM_REPLY_FORWARDING_SCORE || 0),
		channelId: process.env.CUSTOM_REPLY_CHANNEL_ID || '120363423953253980@newsletter',
		channelName: process.env.CUSTOM_REPLY_CHANNEL_NAME || '👧 ᴅɪᴀɴᴀ - ʙᴏᴛ',
		title: process.env.CUSTOM_REPLY_TITLE || '👧 ᴅɪᴀɴᴀ - ʙᴏᴛ',
		body: process.env.CUSTOM_REPLY_BODY || 'Powered by shileys',
		thumbnailUrl: process.env.CUSTOM_REPLY_THUMBNAIL_URL || 'https://files.catbox.moe/qmspao.jpg',
		sourceUrl: process.env.CUSTOM_REPLY_SOURCE_URL || 'https://github.com/Shikytemo/diana-bot'
	}
}
