import { execFileSync } from 'node:child_process'
import os from 'node:os'
import { inspect } from 'node:util'
import { listCommands } from './commands.js'
import { formatLevel } from '../lib/leveling.js'
import { requireGroupAdmin, setGroupSetting, resolveTargetJids } from '../lib/group-tools.js'

export const menuText = (config, prefix) => {
	const commands = listCommands()
		.map(item => `${prefix}${item.name} - ${item.description}`)
		.join('\n')

	return [
		`*${config.name}*`,
		'',
		'Command:',
		commands,
		'',
		`Prefix: ${config.prefixes.join(' ')}`
	].join('\n')
}

export const formatBytes = bytes => {
	const units = ['B', 'KB', 'MB', 'GB', 'TB']
	let value = Number(bytes) || 0
	let unit = 0

	while (value >= 1024 && unit < units.length - 1) {
		value /= 1024
		unit += 1
	}

	return `${value.toFixed(value >= 10 || unit === 0 ? 0 : 1)} ${units[unit]}`
}

export const formatDuration = seconds => {
	const parts = [
		['d', Math.floor(seconds / 86400)],
		['h', Math.floor(seconds / 3600) % 24],
		['m', Math.floor(seconds / 60) % 60],
		['s', Math.floor(seconds) % 60]
	].filter(([, value]) => value > 0)

	return parts.length ? parts.map(([label, value]) => `${value}${label}`).join(' ') : '0s'
}

export const getDiskInfo = () => {
	try {
		const output = execFileSync('df', ['-k', process.cwd()], { encoding: 'utf8', timeout: 1500 })
		const line = output.trim().split('\n').at(-1)
		if (!line) return null

		const columns = line.trim().split(/\s+/)
		if (columns.length < 5) return null

		const [filesystem, blocks, used, available, percent] = columns
		return {
			filesystem,
			used: formatBytes(Number(used) * 1024),
			total: formatBytes(Number(blocks) * 1024),
			available: formatBytes(Number(available) * 1024),
			percent
		}
	} catch {
		return null
	}
}

export const evalCode = async (code, m) => {
	const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor
	const fn = new AsyncFunction('m', 'ctx', 'sock', 'db', 'config', 'message', 'command', 'reply', `return (${code})`)

	try {
		return await fn(m, m, m.sock, m.db, m.config, m.message, m.command, m.reply)
	} catch (error) {
		const fallback = new AsyncFunction('m', 'ctx', 'sock', 'db', 'config', 'message', 'command', 'reply', code)
		return fallback(m, m, m.sock, m.db, m.config, m.message, m.command, m.reply)
	}
}

export const formatEvalResult = value => {
	const output = typeof value === 'string' ? value : inspect(value, { depth: 3, colors: false })
	return output.length > 3500 ? `${output.slice(0, 3500)}\n...` : output
}

export const systemStatusText = (m, latencyMs) => {
	const cpus = os.cpus()
	const cpu = cpus[0]
	const memoryUsed = os.totalmem() - os.freemem()
	const heap = process.memoryUsage()
	const disk = getDiskInfo()
	const loadAverage = os.loadavg().map(load => load.toFixed(2)).join(' / ')
	const lines = [
		`⚡ *${m.config.name} Status*`,
		'',
		`🚀 Response : ${latencyMs}ms`,
		`⏱️ Runtime  : ${formatDuration(process.uptime())}`,
		`📱 Device   : ${formatDuration(os.uptime())}`,
		'',
		`🏷️ Host     : ${os.hostname()}`,
		`🧩 OS       : ${os.type()} ${os.release()}`,
		`🛠️ Platform : ${os.platform()} ${os.arch()}`,
		`🟢 Node     : ${process.version}`,
		`🔢 PID      : ${process.pid}`,
		'',
		`🧠 CPU      : ${cpu?.model || 'Unknown'}`,
		`⚙️ Core     : ${cpus.length}`,
		`📊 Load     : ${loadAverage}`,
		`💾 RAM      : ${formatBytes(memoryUsed)} / ${formatBytes(os.totalmem())}`,
		`📦 Heap     : ${formatBytes(heap.heapUsed)} / ${formatBytes(heap.heapTotal)}`
	]

	if (disk) {
		lines.push(`🗄️ Disk     : ${disk.used} / ${disk.total} (${disk.percent})`)
		lines.push(`🆓 Free     : ${disk.available}`)
	}

	lines.push('')
	lines.push(`💬 Chat     : ${m.jid}`)
	lines.push(`📨 Sender   : ${m.sender}`)
	lines.push(`👤 Nama     : ${m.user.name || '-'}`)
	lines.push(`🎭 Role     : ${m.roles.labels.join(', ') || 'user'}`)
	lines.push(`🏆 Level    : ${formatLevel(m.user)}`)

	return lines.join('\n')
}

export const parseOnOff = value => {
	const normalized = String(value || '').toLowerCase()
	if (['on', 'enable', 'aktif', '1', 'true'].includes(normalized)) return true
	if (['off', 'disable', 'mati', '0', 'false'].includes(normalized)) return false
	return null
}

export const toggleGroupFeature = async (m, key, label) => {
	if (!(await requireGroupAdmin(m))) return

	const value = parseOnOff(m.command.args[0])
	if (value === null) {
		await m.reply(`Pakai: ${m.command.prefix}${m.command.name} on/off`)
		return
	}

	setGroupSetting(m.db, m.jid, key, value)
	await m.db.save()
	await m.reply(`${label} ${value ? 'aktif' : 'nonaktif'}.`)
}

export const getGroupTargets = async m => {
	const targets = resolveTargetJids(m.message, m.command)
	if (!targets.length) {
		await m.reply(`Tag/reply target atau pakai nomor. Contoh: ${m.command.prefix}${m.command.name} 62812xxxx`)
	}
	return targets
}
