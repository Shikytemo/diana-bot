import { execFileSync } from 'node:child_process'
import os from 'node:os'
import { DEFAULT_CHANNEL_URL, formatChannelId, getChannelId } from '../lib/channel.js'
import { formatLevel } from '../lib/leveling.js'
import { nextPinterestSession, savePinterestSession, scrapePinterestForReply, sendPinterestSessionPhoto } from '../lib/pinterest.js'
import { replyText, sendButtons, sendCallButton, sendChannelIdButtons, sendCopyButton, sendList, sendMenu, sendPinterestButtons, sendUrlButton } from '../lib/reply.js'
import { formatRoles } from '../lib/roles.js'
import { uploadMessageMediaToUrl } from '../lib/tourl.js'
import { restartProcess, runSelfUpdate } from '../lib/updater.js'

const commandList = [
	{ name: 'menu', aliases: ['help', 'start'], description: 'Tampilkan menu bot' },
	{ name: 'ping', aliases: ['p'], description: 'Cek respon bot' },
	{ name: 'update', aliases: ['upgrade'], description: 'Update file bot dan install dependency' },
	{ name: 'tourl', aliases: ['urlfile'], description: 'Upload media ke Catbox' },
	{ name: 'pin', aliases: ['pinterest', 'pins'], description: 'Scrape media Pinterest' },
	{ name: 'pinnext', aliases: ['nextpin'], description: 'Foto Pinterest berikutnya' },
	{ name: 'idch', aliases: ['cekidch', 'cekid'], description: 'Cek ID channel WhatsApp' },
	{ name: 'role', aliases: ['profile', 'me'], description: 'Cek role user' },
	{ name: 'setnama', aliases: ['setname', 'nama'], description: 'Set nama profile bot' },
	{ name: 'register', aliases: ['daftar'], description: 'Daftar sebagai member' },
	{ name: 'unregister', aliases: ['unreg'], description: 'Hapus status member' },
	{ name: 'button', aliases: ['buttons'], description: 'Demo quick reply button' },
	{ name: 'list', aliases: ['pilih'], description: 'Demo button pilihan/list' },
	{ name: 'link', aliases: ['url'], description: 'Demo tombol buka link' },
	{ name: 'copy', aliases: ['code'], description: 'Demo tombol salin text' },
	{ name: 'call', aliases: ['phone'], description: 'Demo tombol telepon' },
	{ name: 'owner', aliases: ['creator'], description: 'Tampilkan owner bot' },
	{ name: 'id', aliases: ['jid'], description: 'Cek JID chat' }
]

export const listCommands = () => commandList

const menuText = (config, prefix) => {
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

const formatBytes = bytes => {
	const units = ['B', 'KB', 'MB', 'GB', 'TB']
	let value = Number(bytes) || 0
	let unit = 0

	while (value >= 1024 && unit < units.length - 1) {
		value /= 1024
		unit += 1
	}

	return `${value.toFixed(value >= 10 || unit === 0 ? 0 : 1)} ${units[unit]}`
}

const formatDuration = seconds => {
	const parts = [
		['d', Math.floor(seconds / 86400)],
		['h', Math.floor(seconds / 3600) % 24],
		['m', Math.floor(seconds / 60) % 60],
		['s', Math.floor(seconds) % 60]
	].filter(([, value]) => value > 0)

	return parts.length ? parts.map(([label, value]) => `${value}${label}`).join(' ') : '0s'
}

const getDiskInfo = () => {
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

const systemStatusText = (ctx, latencyMs) => {
	const cpus = os.cpus()
	const cpu = cpus[0]
	const memoryUsed = os.totalmem() - os.freemem()
	const heap = process.memoryUsage()
	const disk = getDiskInfo()
	const loadAverage = os.loadavg().map(load => load.toFixed(2)).join(' / ')
	const lines = [
		`⚡ *${ctx.config.name} Status*`,
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
	lines.push(`💬 Chat     : ${ctx.jid}`)
	lines.push(`📨 Sender   : ${ctx.sender}`)
	lines.push(`👤 Nama     : ${ctx.user.name || '-'}`)
	lines.push(`🎭 Role     : ${ctx.roles.labels.join(', ') || 'user'}`)
	lines.push(`🏆 Level    : ${formatLevel(ctx.user)}`)

	return lines.join('\n')
}

export const runCase = async ctx => {
	const {
		command,
		config,
		isAdmin,
		isMember,
		isOwner,
		isPremium,
		isUnregister,
		jid,
		message,
		replyJid,
		sock
	} = ctx
	const targetJid = replyJid || jid
	const quoted = targetJid === jid ? message : undefined
	const cmd = command.name

	switch (cmd) {
		case 'menu':
		case 'help':
		case 'start':
			await sendMenu(sock, targetJid, config, quoted, ctx.roles)
			break

		case 'button':
		case 'buttons':
			await sendButtons(
				sock,
				targetJid,
				{
					text: 'Quick reply button aktif.',
					title: config.name,
					footer: 'Powered by shileys',
					buttons: [
						{ text: 'Ping', id: `${command.prefix}ping` },
						{ text: 'Menu', id: `${command.prefix}menu` },
						{ text: 'List', id: `${command.prefix}list` }
					]
				},
				quoted
			)
			break

		case 'list':
		case 'pilih':
			await sendList(
				sock,
				targetJid,
				{
					text: 'Pilih salah satu menu di bawah.',
					title: config.name,
					footer: 'Powered by shileys',
					buttonText: 'Buka Pilihan',
					sections: [
						{
							title: 'Command utama',
							rows: [
								{
									header: 'Status',
									title: 'Ping',
									description: 'Cek respon bot',
									id: `${command.prefix}ping`
								},
								{
									header: 'Menu',
									title: 'Menu Interaktif',
									description: 'Tampilkan menu button',
									id: `${command.prefix}menu`
								}
							]
						},
						{
							title: 'Demo native-flow',
							rows: [
								{
									header: 'Button',
									title: 'Quick Reply',
									description: 'Contoh tombol cepat',
									id: `${command.prefix}button`
								},
								{
									header: 'Copy',
									title: 'Copy Code',
									description: 'Contoh tombol salin text',
									id: `${command.prefix}copy`
								}
							]
						}
					]
				},
				quoted
			)
			break

		case 'link':
		case 'url':
			await sendUrlButton(
				sock,
				targetJid,
				{
					text: 'Buka repository shileys.',
					title: config.name,
					footer: 'Powered by shileys',
					buttonText: 'GitHub',
					url: 'https://github.com/Shikytemo/shileys'
				},
				quoted
			)
			break

		case 'copy':
		case 'code':
			await sendCopyButton(
				sock,
				targetJid,
				{
					text: 'Tekan tombol untuk salin kode pairing demo.',
					title: config.name,
					footer: 'Powered by shileys',
					buttonText: 'Copy Code',
					copyText: 'DIANABOT'
				},
				quoted
			)
			break

		case 'call':
		case 'phone':
			await sendCallButton(
				sock,
				targetJid,
				{
					text: 'Hubungi owner bot.',
					title: config.name,
					footer: 'Powered by shileys',
					buttonText: 'Call Owner',
					phoneNumber: config.ownerNumber || '628385863327'
				},
				quoted
			)
			break

		case 'menutext':
		case 'allmenu':
			await replyText(sock, targetJid, menuText(config, command.prefix), quoted)
			break

		case 'ping':
		case 'p':
			await replyText(sock, targetJid, systemStatusText(ctx, Date.now() - ctx.startedAt), quoted)
			break

		case 'update':
		case 'upgrade': {
			if (!isOwner && !isAdmin) {
				await replyText(sock, targetJid, 'Command ini hanya untuk owner/admin.', quoted)
				break
			}

			await replyText(sock, targetJid, 'Cek update Diana...', quoted)
			const result = await runSelfUpdate({ logger: ctx.logger })
			await replyText(sock, targetJid, result.text)

			if (result.restart) {
				restartProcess()
			}
			break
		}

		case 'tourl':
		case 'urlfile': {
			await replyText(sock, targetJid, 'Upload media ke Catbox...', quoted)
			const result = await uploadMessageMediaToUrl({ message, logger: ctx.logger, sock })
			await replyText(sock, targetJid, result.text)
			break
		}

		case 'pin':
		case 'pinterest':
		case 'pins': {
			if (!command.text) {
				await replyText(sock, targetJid, `Format: ${command.prefix}${cmd} <link pin atau kata kunci>`, quoted)
				break
			}

			await replyText(sock, targetJid, '📌 Ambil Pinterest...', quoted)
			try {
				const result = await scrapePinterestForReply(command.text)
				if (!result.ok) {
					await replyText(sock, targetJid, result.text, quoted)
					break
				}

				if (result.images.length) {
					try {
						const session = savePinterestSession({ jid: targetJid, sender: ctx.sender, result })
						await sendPinterestSessionPhoto({ sock, jid: targetJid, session, quoted })
					} catch (error) {
						ctx.logger.warn({ error, command: cmd }, 'pinterest media send failed')
						await replyText(sock, targetJid, '⚠️ Link Pinterest berhasil diambil, tapi beberapa media gagal dikirim WhatsApp. Coba buka/copy link di pesan atas.', quoted)
					}
				} else {
					await sendPinterestButtons(
						sock,
						targetJid,
						{
							text: result.text,
							mediaUrl: result.firstMediaUrl,
							sourceUrl: result.sourceUrl
						},
						quoted
					)
				}
			} catch (error) {
				await replyText(sock, targetJid, `❌ Gagal scrape Pinterest: ${error.message || error}`, quoted)
			}
			break
		}

		case 'pinnext':
		case 'nextpin': {
			const session = nextPinterestSession({ jid: targetJid, sender: ctx.sender })
			if (!session) {
				await replyText(sock, targetJid, `Session Pinterest habis. Pakai ${command.prefix}pin <query> lagi.`, quoted)
				break
			}

			try {
				await sendPinterestSessionPhoto({ sock, jid: targetJid, session, quoted })
			} catch (error) {
				ctx.logger.warn({ error, command: cmd }, 'pinterest media send failed')
				await replyText(sock, targetJid, '⚠️ Foto ini gagal dikirim WhatsApp. Tekan Next Photo lagi atau ulangi pencarian.', quoted)
			}
			break
		}

		case 'idch':
		case 'cekidch':
		case 'cekid': {
			const input = command.text || DEFAULT_CHANNEL_URL
			await replyText(sock, targetJid, '🔎 Cek ID channel...', quoted)

			try {
				const channel = await getChannelId(sock, input)
				await sendChannelIdButtons(
					sock,
					targetJid,
					{
						text: formatChannelId(channel),
						title: '🛰️ Channel Checker',
						footer: 'Powered by Diana Bot',
						channelId: channel.jid,
						url: channel.url
					},
					quoted
				)
			} catch (error) {
				await replyText(sock, targetJid, `❌ Gagal cek channel: ${error.message || error}`, quoted)
			}
			break
		}

		case 'role':
		case 'profile':
		case 'me':
			await replyText(sock, targetJid, formatRoles(ctx.roles), quoted)
			break

		case 'setnama':
		case 'setname':
		case 'nama': {
			const name = command.text.trim().replace(/\s+/g, ' ')
			if (!name) {
				await replyText(sock, targetJid, `Format: ${command.prefix}${cmd} <nama>`, quoted)
				break
			}

			if (name.length > 32) {
				await replyText(sock, targetJid, 'Nama maksimal 32 karakter.', quoted)
				break
			}

			ctx.user.name = name
			ctx.user.nameUpdatedAt = new Date().toISOString()
			await ctx.db.save()
			await replyText(sock, targetJid, `Nama disimpan: ${name}`, quoted)
			break
		}

		case 'register':
		case 'daftar':
			ctx.user.registered = true
			ctx.user.registeredAt ||= new Date().toISOString()
			await ctx.db.save()
			ctx.isMember = true
			ctx.isUnregister = false
			ctx.roles.labels = ctx.roles.labels.filter(label => label !== 'unregister')
			if (!ctx.roles.labels.includes('member')) {
				ctx.roles.labels.splice(Math.max(ctx.roles.labels.indexOf('user'), 0), 0, 'member')
			}
			await replyText(sock, targetJid, 'Berhasil register sebagai member.', quoted)
			break

		case 'unregister':
		case 'unreg':
			ctx.user.registered = false
			ctx.user.unregisteredAt = new Date().toISOString()
			await ctx.db.save()
			await replyText(sock, targetJid, 'Status member dihapus. Kamu sekarang unregister.', quoted)
			break

		case 'owner':
		case 'creator':
			if (!config.ownerNumber) {
				await replyText(sock, targetJid, 'Owner belum diset di config.', quoted)
				break
			}

			await replyText(sock, targetJid, `Owner: ${config.ownerNumber}`, quoted)
			break

		case 'id':
		case 'jid':
			await replyText(sock, targetJid, `Chat JID: ${jid}\nReply JID: ${targetJid}\nSender: ${ctx.sender}`, quoted)
			break

		default:
			await replyText(sock, targetJid, `Command tidak ditemukan: ${cmd}`, quoted)
			break
	}
}
