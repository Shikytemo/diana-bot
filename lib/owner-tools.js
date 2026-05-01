import { copyFile, mkdir, readdir, readFile, stat } from 'fs/promises'
import { basename, dirname, join, resolve } from 'path'

const DEFAULT_AUTO_BACKUP_MS = 24 * 60 * 60 * 1000
const MAX_TIMEOUT_MS = 2147483647
const consoleLines = []
const maxConsoleLines = 300
const reminderTimers = new Map()
let consoleTailInstalled = false
let autoBackupTimer = null
let activeRuntime = null

const ownerSettings = db => {
	db.data.settings ||= {}
	db.data.settings.ownerTools ||= {}
	db.data.settings.ownerTools.autoBackup ||= {
		enabled: false,
		intervalMs: DEFAULT_AUTO_BACKUP_MS,
		updatedAt: new Date().toISOString()
	}
	db.data.settings.ownerTools.reminders ||= []
	return db.data.settings.ownerTools
}

const timestamp = date =>
	date
		.toISOString()
		.replaceAll('-', '')
		.replaceAll(':', '')
		.replace(/\.\d+Z$/, 'Z')

const formatBytes = bytes => {
	const units = ['B', 'KB', 'MB', 'GB']
	let value = Number(bytes) || 0
	let unit = 0

	while (value >= 1024 && unit < units.length - 1) {
		value /= 1024
		unit += 1
	}

	return `${value.toFixed(value >= 10 || unit === 0 ? 0 : 1)} ${units[unit]}`
}

const formatDuration = ms => {
	const seconds = Math.max(0, Math.round(ms / 1000))
	const parts = [
		['d', Math.floor(seconds / 86400)],
		['h', Math.floor(seconds / 3600) % 24],
		['m', Math.floor(seconds / 60) % 60],
		['s', seconds % 60]
	].filter(([, value]) => value > 0)

	return parts.length ? parts.map(([label, value]) => `${value}${label}`).join(' ') : '0s'
}

const parseDuration = value => {
	const match = String(value || '').trim().match(/^(\d+)(s|m|h|d)$/i)
	if (!match) return null

	const amount = Number(match[1])
	const unit = match[2].toLowerCase()
	const multiplier = {
		s: 1000,
		m: 60 * 1000,
		h: 60 * 60 * 1000,
		d: 24 * 60 * 60 * 1000
	}[unit]

	return amount > 0 ? amount * multiplier : null
}

const databaseBackupDir = config => join(dirname(config.databaseFile), 'backups')

const safeReason = reason =>
	String(reason || 'manual')
		.toLowerCase()
		.replace(/[^a-z0-9_-]+/g, '-')
		.replace(/^-+|-+$/g, '')
		.slice(0, 24) || 'manual'

export const createDatabaseBackup = async ({ db, config, reason = 'manual' }) => {
	await db.save()
	const backupDir = databaseBackupDir(config)
	await mkdir(backupDir, { recursive: true })

	const createdAt = new Date()
	const fileName = `data-${timestamp(createdAt)}-${safeReason(reason)}.json`
	const file = join(backupDir, fileName)
	await copyFile(config.databaseFile, file)
	const info = await stat(file)

	return {
		file,
		fileName,
		size: info.size,
		createdAt: createdAt.toISOString()
	}
}

const listBackups = async config => {
	const backupDir = databaseBackupDir(config)
	try {
		const entries = await readdir(backupDir, { withFileTypes: true })
		const files = await Promise.all(
			entries
				.filter(entry => entry.isFile() && entry.name.endsWith('.json'))
				.map(async entry => {
					const file = join(backupDir, entry.name)
					const info = await stat(file)
					return {
						file,
						fileName: entry.name,
						size: info.size,
						mtimeMs: info.mtimeMs
					}
				})
		)

		return files.sort((a, b) => b.mtimeMs - a.mtimeMs)
	} catch (error) {
		if (error.code === 'ENOENT') return []
		throw error
	}
}

const sendBackupDocument = async ({ m, backup }) => {
	const buffer = await readFile(backup.file)
	await m.sock.sendMessage(
		m.targetJid,
		{
			document: buffer,
			mimetype: 'application/json',
			fileName: backup.fileName,
			caption: [
				'*Database backup dibuat.*',
				`File: ${backup.fileName}`,
				`Size: ${formatBytes(backup.size)}`
			].join('\n')
		},
		{
			quoted: m.quoted
		}
	)
}

const runAutoBackup = async () => {
	if (!activeRuntime) return

	const { db, config, logger } = activeRuntime
	try {
		const backup = await createDatabaseBackup({ db, config, reason: 'auto' })
		logger.info({ file: backup.fileName, size: formatBytes(backup.size) }, 'auto database backup created')
	} catch (error) {
		logger.warn({ error }, 'auto database backup failed')
	}
}

const scheduleAutoBackup = async runtime => {
	if (autoBackupTimer) {
		clearTimeout(autoBackupTimer)
		autoBackupTimer = null
	}

	const settings = ownerSettings(runtime.db).autoBackup
	if (!settings.enabled) return

	const intervalMs = Number(settings.intervalMs) || DEFAULT_AUTO_BACKUP_MS
	autoBackupTimer = setTimeout(async () => {
		await runAutoBackup()
		await scheduleAutoBackup(runtime)
	}, Math.min(intervalMs, MAX_TIMEOUT_MS))
}

const patchConsoleMethod = method => {
	const original = console[method].bind(console)
	console[method] = (...args) => {
		const line = args
			.map(arg => {
				if (typeof arg === 'string') return arg
				try {
					return JSON.stringify(arg)
				} catch {
					return String(arg)
				}
			})
			.join(' ')
		consoleLines.push(`[${new Date().toISOString()}] ${method.toUpperCase()} ${line}`)
		while (consoleLines.length > maxConsoleLines) consoleLines.shift()
		return original(...args)
	}
}

const installConsoleTail = () => {
	if (consoleTailInstalled) return
	consoleTailInstalled = true
	for (const method of ['log', 'info', 'warn', 'error']) {
		patchConsoleMethod(method)
	}
}

const scheduleLongTimeout = (id, delay, callback) => {
	const timeout = setTimeout(() => {
		reminderTimers.delete(id)
		if (delay > MAX_TIMEOUT_MS) {
			scheduleLongTimeout(id, delay - MAX_TIMEOUT_MS, callback)
			return
		}

		callback()
	}, Math.min(delay, MAX_TIMEOUT_MS))

	reminderTimers.set(id, timeout)
}

const sendReminder = async reminder => {
	if (!activeRuntime) return

	const { sock, db, logger } = activeRuntime
	try {
		await sock.sendMessage(reminder.chatJid, {
			text: [`⏰ *Reminder*`, '', reminder.text].join('\n')
		})
	} catch (error) {
		logger.warn({ error, id: reminder.id }, 'reminder send failed')
	}

	const settings = ownerSettings(db)
	settings.reminders = settings.reminders.filter(item => item.id !== reminder.id)
	await db.save()
}

const scheduleReminder = reminder => {
	const dueAt = new Date(reminder.dueAt).getTime()
	const delay = dueAt - Date.now()
	if (delay <= 0) {
		sendReminder(reminder)
		return
	}

	if (reminderTimers.has(reminder.id)) clearTimeout(reminderTimers.get(reminder.id))
	scheduleLongTimeout(reminder.id, delay, () => sendReminder(reminder))
}

const rescheduleReminders = db => {
	for (const timer of reminderTimers.values()) clearTimeout(timer)
	reminderTimers.clear()

	const settings = ownerSettings(db)
	settings.reminders = settings.reminders.filter(item => item?.id && item?.chatJid && item?.dueAt && item?.text)
	for (const reminder of settings.reminders) {
		scheduleReminder(reminder)
	}
}

export const initializeOwnerTools = async runtime => {
	activeRuntime = runtime
	installConsoleTail()
	ownerSettings(runtime.db)
	rescheduleReminders(runtime.db)
	await scheduleAutoBackup(runtime)
}

const backupHelp = prefix =>
	[
		'*Owner backup tools*',
		`${prefix}backup - buat backup database dan kirim file JSON`,
		`${prefix}backup list - lihat backup lokal terakhir`,
		`${prefix}backup auto status`,
		`${prefix}backup auto on 24h`,
		`${prefix}backup auto off`
	].join('\n')

export const handleBackupCommand = async m => {
	const sub = (m.command.args[0] || '').toLowerCase()

	if (!sub || sub === 'now') {
		const backup = await createDatabaseBackup({ db: m.db, config: m.config, reason: 'manual' })
		await sendBackupDocument({ m, backup })
		return
	}

	if (sub === 'list') {
		const backups = await listBackups(m.config)
		if (!backups.length) {
			await m.reply('Belum ada backup database lokal.')
			return
		}

		await m.reply(
			backups
				.slice(0, 10)
				.map((backup, index) => `${index + 1}. ${backup.fileName} (${formatBytes(backup.size)})`)
				.join('\n')
		)
		return
	}

	if (sub === 'auto') {
		const action = (m.command.args[1] || 'status').toLowerCase()
		const settings = ownerSettings(m.db).autoBackup

		if (action === 'status') {
			await m.reply(`Auto backup: ${settings.enabled ? 'on' : 'off'}\nInterval: ${formatDuration(settings.intervalMs)}`)
			return
		}

		if (action === 'on') {
			const intervalMs = parseDuration(m.command.args[2]) || DEFAULT_AUTO_BACKUP_MS
			settings.enabled = true
			settings.intervalMs = intervalMs
			settings.updatedAt = new Date().toISOString()
			await m.db.save()
			await scheduleAutoBackup({ sock: m.sock, db: m.db, config: m.config, logger: m.logger })
			await m.reply(`Auto backup aktif setiap ${formatDuration(intervalMs)}.`)
			return
		}

		if (action === 'off') {
			settings.enabled = false
			settings.updatedAt = new Date().toISOString()
			await m.db.save()
			await scheduleAutoBackup({ sock: m.sock, db: m.db, config: m.config, logger: m.logger })
			await m.reply('Auto backup dimatikan.')
			return
		}
	}

	await m.reply(backupHelp(m.command.prefix))
}

const normalizeDatabaseData = data => {
	if (!data || typeof data !== 'object' || Array.isArray(data)) {
		throw new Error('Backup harus berisi JSON object.')
	}

	return {
		...data,
		users: data.users && typeof data.users === 'object' && !Array.isArray(data.users) ? data.users : {},
		chats: data.chats && typeof data.chats === 'object' && !Array.isArray(data.chats) ? data.chats : {},
		settings: data.settings && typeof data.settings === 'object' && !Array.isArray(data.settings) ? data.settings : {}
	}
}

export const handleRestoreCommand = async m => {
	const media = await m.download()
	if (!media) {
		await m.reply(`Reply file backup JSON lalu ketik ${m.command.prefix}${m.command.name}.`)
		return
	}

	const fileName = media.info?.fileName || ''
	const mimetype = media.info?.mimetype || ''
	if (!fileName.endsWith('.json') && !mimetype.includes('json') && mimetype !== 'application/octet-stream') {
		await m.reply('Restore hanya menerima document JSON backup database.')
		return
	}

	const data = normalizeDatabaseData(JSON.parse(media.buffer.toString('utf8')))
	const beforeRestore = await createDatabaseBackup({ db: m.db, config: m.config, reason: 'pre-restore' })
	m.db.data = data
	await m.db.save()
	await initializeOwnerTools({ sock: m.sock, db: m.db, config: m.config, logger: m.logger })
	await m.reply(`Database berhasil direstore.\nBackup sebelum restore: ${beforeRestore.fileName}`)
}

const readTailFile = async (file, lineCount) => {
	const raw = await readFile(file, 'utf8')
	return raw.split(/\r?\n/).filter(Boolean).slice(-lineCount).join('\n')
}

const logCandidates = async () => {
	const cwd = process.cwd()
	const dirs = [cwd, join(cwd, 'logs'), join(cwd, 'database')]
	const files = []

	for (const dir of dirs) {
		try {
			for (const entry of await readdir(dir, { withFileTypes: true })) {
				if (entry.isFile() && entry.name.endsWith('.log')) {
					const file = join(dir, entry.name)
					const info = await stat(file)
					files.push({ file, mtimeMs: info.mtimeMs })
				}
			}
		} catch (error) {
			if (error.code !== 'ENOENT') throw error
		}
	}

	if (process.env.LOG_FILE) {
		const file = resolve(process.env.LOG_FILE)
		try {
			const info = await stat(file)
			files.push({ file, mtimeMs: info.mtimeMs })
		} catch {}
	}

	return files.sort((a, b) => b.mtimeMs - a.mtimeMs)
}

export const handleLogsCommand = async m => {
	const lineCount = Math.min(Math.max(Number(m.command.args[0]) || 30, 5), 100)
	const fileLogs = await logCandidates()

	if (fileLogs.length) {
		const latest = fileLogs[0]
		const text = await readTailFile(latest.file, lineCount)
		await m.reply([`*Tail ${basename(latest.file)}*`, '', text || '(kosong)'].join('\n').slice(0, 3500))
		return
	}

	const lines = consoleLines.slice(-lineCount).join('\n')
	await m.reply([`*Runtime logs*`, '', lines || 'Belum ada log runtime yang tertangkap sejak bot start.'].join('\n').slice(0, 3500))
}

const reminderHelp = prefix =>
	[
		'*Owner reminder tools*',
		`${prefix}remind 10m cek server`,
		`${prefix}remind list`,
		`${prefix}remind cancel <id>`
	].join('\n')

export const handleReminderCommand = async m => {
	const sub = (m.command.args[0] || '').toLowerCase()
	const settings = ownerSettings(m.db)

	if (sub === 'list') {
		const reminders = settings.reminders
			.slice()
			.sort((a, b) => new Date(a.dueAt) - new Date(b.dueAt))

		if (!reminders.length) {
			await m.reply('Tidak ada reminder aktif.')
			return
		}

		await m.reply(
			reminders
				.slice(0, 20)
				.map(item => `${item.id} - ${formatDuration(new Date(item.dueAt) - Date.now())} - ${item.text}`)
				.join('\n')
		)
		return
	}

	if (sub === 'cancel') {
		const id = m.command.args[1]
		if (!id) {
			await m.reply(reminderHelp(m.command.prefix))
			return
		}

		const before = settings.reminders.length
		settings.reminders = settings.reminders.filter(item => item.id !== id)
		if (reminderTimers.has(id)) {
			clearTimeout(reminderTimers.get(id))
			reminderTimers.delete(id)
		}
		await m.db.save()
		await m.reply(before === settings.reminders.length ? `Reminder ${id} tidak ditemukan.` : `Reminder ${id} dibatalkan.`)
		return
	}

	const durationMs = parseDuration(sub)
	const text = m.command.args.slice(1).join(' ').trim()
	if (!durationMs || !text) {
		await m.reply(reminderHelp(m.command.prefix))
		return
	}

	const reminder = {
		id: `r${Date.now().toString(36)}`,
		chatJid: m.targetJid,
		createdBy: m.sender,
		text,
		dueAt: new Date(Date.now() + durationMs).toISOString(),
		createdAt: new Date().toISOString()
	}
	settings.reminders.push(reminder)
	await m.db.save()
	scheduleReminder(reminder)
	await m.reply(`Reminder ${reminder.id} disetel untuk ${formatDuration(durationMs)}.`)
}
