const levels = {
	silent: 99,
	error: 50,
	warn: 40,
	info: 30,
	debug: 20,
	trace: 10
}

const icons = {
	error: '✕',
	warn: '▲',
	info: '●',
	debug: '·',
	trace: '·'
}

const colors = {
	error: '\x1b[31m',
	warn: '\x1b[33m',
	info: '\x1b[36m',
	debug: '\x1b[90m',
	trace: '\x1b[90m',
	success: '\x1b[32m',
	magenta: '\x1b[35m',
	dim: '\x1b[90m',
	reset: '\x1b[0m',
	bold: '\x1b[1m'
}

const messageMap = {
	'stale unregistered pairing session cleared': 'Session pairing lama dibersihkan',
	'pairing code generated': 'Kode pairing siap',
	'pairing wait timeout reached; run diana again if pairing was not completed': 'Waktu pairing habis, jalankan bot lagi kalau belum selesai',
	'failed to request pairing code': 'Gagal membuat kode pairing',
	'bot connected': 'Bot berhasil terhubung',
	'connection closed after pairing code was generated; keeping CLI alive while you enter the code': 'Koneksi pairing ditutup sementara, CLI tetap menunggu kode dimasukkan',
	'connection closed': 'Koneksi terputus',
	'command received': 'Command masuk',
	'command routing': 'Route command',
	'command failed': 'Command gagal',
	'reconnect failed': 'Reconnect gagal',
	'message handler failed': 'Handler pesan gagal',
	'unhandled rejection': 'Unhandled rejection',
	'uncaught exception': 'Uncaught exception',
	'failed to start bot': 'Gagal menjalankan bot'
}

const now = () => {
	const d = new Date()
	return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

const errorSummary = error => {
	if (!error) return undefined
	const status = error?.output?.statusCode || error?.statusCode
	const message = error?.message || String(error)
	return status ? `${message} [${status}]` : message
}

const cleanValue = value => {
	if (value === true) return 'yes'
	if (value === false) return 'no'
	if (Array.isArray(value)) return value.join('/')
	if (typeof value === 'object' && value !== null) return JSON.stringify(value)
	return String(value)
}

const formatMeta = meta => {
	const entries = Object.entries(meta || {}).filter(([key, value]) => {
		return !['error', 'err', 'trace', 'stack', 'msg', 'level', 'time', 'pid', 'hostname'].includes(key) && value !== undefined
	})

	if (!entries.length) return ''

	return (
		`${colors.dim}  ` +
		entries
			.map(([key, value]) => {
				return `${key}: ${cleanValue(value)}`
			})
			.join('  ')
		+ colors.reset
	)
}

export const createLogger = (level = 'info', bindings = {}) => {
	const threshold = levels[level] ?? levels.info

	const write = (kind, metaOrMessage, maybeMessage) => {
		if ((levels[kind] ?? levels.info) < threshold) return

		const meta = {
			...bindings,
			...(typeof metaOrMessage === 'object' && metaOrMessage !== null ? metaOrMessage : {})
		}
		const message = typeof metaOrMessage === 'string' ? metaOrMessage : maybeMessage || meta.msg || ''
		const error = meta.error || meta.err
		const summary = errorSummary(error)
		const prettyMessage = messageMap[message] || message
		const line = `${colors[kind]}${icons[kind]}${colors.reset} ${prettyMessage}${summary ? `${colors.dim} · ${colors.reset}${summary}` : ''}${formatMeta(meta)}${colors.dim}  ${now()}${colors.reset}`

		console[kind === 'error' ? 'error' : 'log'](line)

		if (process.env.DEBUG_STACK === 'true' && error?.stack) {
			console.error(error.stack)
		}
	}

	const logger = {
		level,
		error: (meta, message) => write('error', meta, message),
		warn: (meta, message) => write('warn', meta, message),
		info: (meta, message) => write('info', meta, message),
		debug: (meta, message) => write('debug', meta, message),
		trace: (meta, message) => write('trace', meta, message),
		child: (childBindings = {}, options = {}) =>
			createLogger(options.level || level, {
				...bindings,
				...childBindings
			})
	}

	return logger
}

export const printPanel = (title, rows = []) => {
	const width = Math.max(
		title.length + 4,
		...rows.map(([label, value]) => `${label}: ${value}`.length + 4),
		34
	)
	const line = '─'.repeat(width - 2)
	console.log(`${colors.cyan || colors.info}┌${line}┐${colors.reset}`)
	console.log(`${colors.cyan || colors.info}│${colors.reset} ${colors.bold}${title.padEnd(width - 4)}${colors.reset} ${colors.cyan || colors.info}│${colors.reset}`)
	console.log(`${colors.cyan || colors.info}├${line}┤${colors.reset}`)
	for (const [label, value] of rows) {
		const text = `${label}: ${value}`
		console.log(`${colors.cyan || colors.info}│${colors.reset} ${text.padEnd(width - 4)} ${colors.cyan || colors.info}│${colors.reset}`)
	}
	console.log(`${colors.cyan || colors.info}└${line}┘${colors.reset}`)
}
