import { execFileSync } from 'node:child_process'
import os from 'node:os'
import { inspect } from 'node:util'
import { toAudio, toPTT, toSticker, toVideo } from '@shikytemo/shitools'
import { DEFAULT_CHANNEL_URL, formatChannelId, getChannelId } from '../lib/channel.js'
import { nextAnimeSession, saveAnimeSession, searchAnimeForReply, seasonAnimeForReply, sendAnimeSessionItem, topAnimeForReply } from '../lib/anime.js'
import { isMedia, isText, noMedia, noText } from '../lib/global.js'
import { formatLevel } from '../lib/leveling.js'
import { nextPinterestSession, savePinterestSession, scrapePinterestForReply, sendPinterestSessionPhoto } from '../lib/pinterest.js'
import { sendButtons, sendCallButton, sendChannelIdButtons, sendCopyButton, sendList, sendMenu, sendPinterestButtons, sendUrlButton } from '../lib/reply.js'
import { formatReplyStyles, normalizeReplyStyle, setReplyStyle } from '../lib/reply-style.js'
import { formatRoles } from '../lib/roles.js'
import { getSamehadakuStream, nextSamehadakuSession, saveSamehadakuSession, selectSamehadakuEpisode, sendSamehadakuStream, sendSamehadakuVideo } from '../lib/samehadaku.js'
import { uploadMessageMediaToUrl } from '../lib/tourl.js'
import { restartProcess, runSelfUpdate } from '../lib/updater.js'

const commandList = [
	{ name: 'menu', aliases: ['help', 'start'], description: 'Tampilkan menu bot' },
	{ name: 'ping', aliases: ['p'], description: 'Cek respon bot' },
	{ name: 'eval', aliases: ['ev'], description: 'Evaluasi kode JavaScript owner' },
	{ name: 'sticker', aliases: ['s'], description: 'Ubah image/video jadi sticker' },
	{ name: 'toaudio', aliases: ['tomp3'], description: 'Ubah video/audio jadi MP3' },
	{ name: 'toptt', aliases: ['vn'], description: 'Ubah video/audio jadi voice note' },
	{ name: 'tovid', aliases: ['togif'], description: 'Ubah sticker jadi video/GIF' },
	{ name: 'update', aliases: ['upgrade'], description: 'Update file bot dan install dependency' },
	{ name: 'tourl', aliases: ['urlfile'], description: 'Upload media ke Catbox' },
	{ name: 'pin', aliases: ['pinterest', 'pins'], description: 'Scrape media Pinterest' },
	{ name: 'pinnext', aliases: ['nextpin'], description: 'Foto Pinterest berikutnya' },
	{ name: 'anime', aliases: ['ani'], description: 'Cari anime di Samehadaku' },
	{ name: 'stream', aliases: ['samehadaku', 'nonton'], description: 'Ambil stream episode Samehadaku' },
	{ name: 'streamselect', aliases: ['pilihstream'], description: 'Pilih episode stream Samehadaku' },
	{ name: 'streamnext', aliases: ['nextstream'], description: 'Server stream Samehadaku berikutnya' },
	{ name: 'topanime', aliases: ['topani'], description: 'Top anime Samehadaku' },
	{ name: 'seasonanime', aliases: ['season'], description: 'Anime season sekarang' },
	{ name: 'idch', aliases: ['cekidch', 'cekid'], description: 'Cek ID channel WhatsApp' },
	{ name: 'role', aliases: ['profile', 'me'], description: 'Cek role user' },
	{ name: 'setnama', aliases: ['setname', 'nama'], description: 'Set nama profile bot' },
	{ name: 'setreply', aliases: ['replyset'], description: 'Set custom reply style v1-v5' },
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

const evalCode = async (code, m) => {
	const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor
	const fn = new AsyncFunction('m', 'ctx', 'sock', 'db', 'config', 'message', 'command', 'reply', `return (${code})`)

	try {
		return await fn(m, m, m.sock, m.db, m.config, m.message, m.command, m.reply)
	} catch (error) {
		const fallback = new AsyncFunction('m', 'ctx', 'sock', 'db', 'config', 'message', 'command', 'reply', code)
		return fallback(m, m, m.sock, m.db, m.config, m.message, m.command, m.reply)
	}
}

const formatEvalResult = value => {
	const output = typeof value === 'string' ? value : inspect(value, { depth: 3, colors: false })
	return output.length > 3500 ? `${output.slice(0, 3500)}\n...` : output
}

const systemStatusText = (m, latencyMs) => {
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

export const runCase = async m => {
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
	} = m
	const targetJid = replyJid || jid
	const quoted = targetJid === jid ? message : undefined
	const cmd = command.name

	switch (cmd) {
		case 'menu':
		case 'help':
		case 'start':
			await sendMenu(sock, targetJid, config, quoted, m.roles)
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
			await m.reply(menuText(config, command.prefix))
			break

		case 'ping':
		case 'p':
			await m.reply(systemStatusText(m, Date.now() - m.startedAt))
			break

		case 'eval':
		case 'ev': {
			if (!isOwner) {
				await m.reply('Command ini hanya untuk owner.')
				break
			}

			if (!isText(command)) {
				await m.reply(noText(command.prefix, cmd, '1 + 1'))
				break
			}

			try {
				const result = await evalCode(command.text, m)
				await m.reply(`✅ *Eval Result*\n\n${formatEvalResult(result)}`)
			} catch (error) {
				await m.reply(`❌ *Eval Error*\n\n${error.stack || error.message || error}`)
			}
			break
		}

		case 'sticker':
		case 's': {
			if (!isMedia(message)) {
				await m.reply(noMedia(command.prefix, cmd))
				break
			}

			const media = await m.download()
			if (!media?.info?.mimetype?.startsWith('image/') && !media?.info?.mimetype?.startsWith('video/')) {
				await m.reply('Kirim/reply gambar, GIF, atau video untuk dijadikan sticker.')
				break
			}

			await m.reply('⏳ Sedang membuat sticker...')
			const sticker = await toSticker(media)
			await sock.sendMessage(targetJid, { sticker }, { quoted })
			break
		}

		case 'toaudio':
		case 'tomp3': {
			if (!isMedia(message)) {
				await m.reply(noMedia(command.prefix, cmd))
				break
			}

			const media = await m.download()
			if (!media?.info?.mimetype?.startsWith('audio/') && !media?.info?.mimetype?.startsWith('video/')) {
				await m.reply('Kirim/reply audio atau video untuk diubah jadi MP3.')
				break
			}

			await m.reply('⏳ Sedang membuat audio...')
			const audio = await toAudio(media)
			await sock.sendMessage(targetJid, { audio, mimetype: 'audio/mpeg' }, { quoted })
			break
		}

		case 'toptt':
		case 'vn': {
			if (!isMedia(message)) {
				await m.reply(noMedia(command.prefix, cmd))
				break
			}

			const media = await m.download()
			if (!media?.info?.mimetype?.startsWith('audio/') && !media?.info?.mimetype?.startsWith('video/')) {
				await m.reply('Kirim/reply audio atau video untuk diubah jadi VN.')
				break
			}

			await m.reply('⏳ Sedang membuat voice note...')
			const audio = await toPTT(media)
			await sock.sendMessage(targetJid, { audio, mimetype: 'audio/ogg; codecs=opus', ptt: true }, { quoted })
			break
		}

		case 'tovid':
		case 'togif': {
			if (!isMedia(message)) {
				await m.reply(noMedia(command.prefix, cmd))
				break
			}

			const media = await m.download()
			if (media?.info?.mimetype !== 'image/webp') {
				await m.reply('Reply sticker untuk diubah jadi video/GIF.')
				break
			}

			await m.reply('⏳ Sedang membuat video...')
			const video = await toVideo(media)
			await sock.sendMessage(targetJid, { video, mimetype: 'video/mp4', gifPlayback: cmd === 'togif' }, { quoted })
			break
		}

		case 'update':
		case 'upgrade': {
			if (!isOwner && !isAdmin) {
				await m.reply('Command ini hanya untuk owner/admin.')
				break
			}

			await m.reply('Cek update Diana...')
			const result = await runSelfUpdate({ logger: m.logger })
			await m.reply(result.text)

			if (result.restart) {
				restartProcess()
			}
			break
		}

		case 'tourl':
		case 'urlfile': {
			if (!isMedia(message)) {
				await m.reply(noMedia(command.prefix, cmd), quoted)
				break
			}

			await m.reply('Upload media ke Catbox...')
			const result = await uploadMessageMediaToUrl({ message, logger: m.logger, sock })
			await m.reply(result.text)
			break
		}

		case 'pin':
		case 'pinterest':
		case 'pins': {
			if (!isText(command)) {
				await m.reply(noText(command.prefix, cmd, 'anime girl'), quoted)
				break
			}

			await m.reply('📌 Ambil Pinterest...')
			try {
				const result = await scrapePinterestForReply(command.text)
				if (!result.ok) {
					await m.reply(result.text)
					break
				}

				if (result.images.length) {
					try {
						const session = savePinterestSession({ jid: targetJid, sender: m.sender, result })
						await sendPinterestSessionPhoto({ sock, jid: targetJid, session, quoted })
					} catch (error) {
						m.logger.warn({ error, command: cmd }, 'pinterest media send failed')
						await m.reply('⚠️ Link Pinterest berhasil diambil, tapi beberapa media gagal dikirim WhatsApp. Coba buka/copy link di pesan atas.', quoted)
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
				await m.reply(`❌ Gagal scrape Pinterest: ${error.message || error}`)
			}
			break
		}

		case 'pinnext':
		case 'nextpin': {
			const session = nextPinterestSession({ jid: targetJid, sender: m.sender })
			if (!session) {
				await m.reply(`Session Pinterest habis. Pakai ${command.prefix}pin <query> lagi.`)
				break
			}

			try {
				await sendPinterestSessionPhoto({ sock, jid: targetJid, session, quoted })
			} catch (error) {
				m.logger.warn({ error, command: cmd }, 'pinterest media send failed')
				await m.reply('⚠️ Foto ini gagal dikirim WhatsApp. Tekan Next Photo lagi atau ulangi pencarian.')
			}
			break
		}

		case 'anime':
		case 'ani': {
			if (!isText(command)) {
				await m.reply(noText(command.prefix, cmd, 'one piece'), quoted)
				break
			}

			await m.reply('🎬 Cari anime...')
			try {
				const result = await searchAnimeForReply(command.text)
				if (!result.ok) {
					await m.reply(result.text)
					break
				}

				const session = saveAnimeSession({ jid: targetJid, sender: m.sender, result })
				await sendAnimeSessionItem({ sock, jid: targetJid, session, quoted })
			} catch (error) {
				await m.reply(`❌ Gagal cari anime: ${error.message || error}`)
			}
			break
		}

		case 'topanime':
		case 'topani': {
			await m.reply('🏆 Ambil top anime...')
			try {
				const result = await topAnimeForReply()
				const session = saveAnimeSession({ jid: targetJid, sender: m.sender, result })
				await sendAnimeSessionItem({ sock, jid: targetJid, session, quoted })
			} catch (error) {
				await m.reply(`❌ Gagal ambil top anime: ${error.message || error}`)
			}
			break
		}

		case 'seasonanime':
		case 'season': {
			await m.reply('📅 Ambil anime season...')
			try {
				const result = await seasonAnimeForReply()
				const session = saveAnimeSession({ jid: targetJid, sender: m.sender, result })
				await sendAnimeSessionItem({ sock, jid: targetJid, session, quoted })
			} catch (error) {
				await m.reply(`❌ Gagal ambil anime season: ${error.message || error}`)
			}
			break
		}

		case 'animenext':
		case 'aninext': {
			const session = nextAnimeSession({ jid: targetJid, sender: m.sender, type: 'anime' })
			if (!session) {
				await m.reply(`Session habis. Pakai ${command.prefix}anime <query> lagi.`)
				break
			}

			const selectedIndex = Number(command.args[0])
			if (Number.isInteger(selectedIndex) && selectedIndex >= 1 && selectedIndex <= session.results.length) {
				session.index = selectedIndex - 1
			}

			await sendAnimeSessionItem({ sock, jid: targetJid, session, quoted })
			break
		}

		case 'stream':
		case 'samehadaku':
		case 'nonton': {
			if (!isText(command)) {
				await m.reply(noText(command.prefix, cmd, 'gnosia episode 20'), quoted)
				break
			}

			await m.reply('🎬 Ambil stream Samehadaku...')
			try {
				const result = await getSamehadakuStream(command.text)
				if (!result.ok) {
					await m.reply(result.text)
					break
				}

				const session = saveSamehadakuSession({ jid: targetJid, sender: m.sender, result })
				await sendSamehadakuVideo({ sock, jid: targetJid, session, quoted })
			} catch (error) {
				await m.reply(`❌ Gagal ambil stream Samehadaku: ${error.message || error}`)
			}
			break
		}

		case 'streamnext':
		case 'nextstream': {
			const session = nextSamehadakuSession({ jid: targetJid, sender: m.sender })
			if (!session) {
				await m.reply(`Session stream habis. Pakai ${command.prefix}stream <url/query> lagi.`)
				break
			}

			await sendSamehadakuStream({ sock, jid: targetJid, session, quoted })
			break
		}

		case 'streamselect':
		case 'pilihstream': {
			const selectedIndex = Number(command.args[0])
			if (!Number.isInteger(selectedIndex) || selectedIndex < 1) {
				await m.reply('Pilih episode dari list stream dulu.')
				break
			}

			try {
				const session = await selectSamehadakuEpisode({ jid: targetJid, sender: m.sender, index: selectedIndex })
				if (!session) {
					await m.reply(`Session stream habis. Pakai ${command.prefix}stream <url/query> lagi.`)
					break
				}

				await sendSamehadakuStream({ sock, jid: targetJid, session, quoted })
			} catch (error) {
				await m.reply(`❌ Gagal pilih episode: ${error.message || error}`)
			}
			break
		}

		case 'idch':
		case 'cekidch':
		case 'cekid': {
			const input = command.text || DEFAULT_CHANNEL_URL
			await m.reply('🔎 Cek ID channel...')

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
				await m.reply(`❌ Gagal cek channel: ${error.message || error}`)
			}
			break
		}

		case 'role':
		case 'profile':
		case 'me':
			await m.reply(formatRoles(m.roles))
			break

		case 'setnama':
		case 'setname':
		case 'nama': {
			const name = command.text.trim().replace(/\s+/g, ' ')
			if (!name) {
				await m.reply(noText(command.prefix, cmd, 'Diana User'), quoted)
				break
			}

			if (name.length > 32) {
				await m.reply('Nama maksimal 32 karakter.')
				break
			}

			m.user.name = name
			m.user.nameUpdatedAt = new Date().toISOString()
			await m.db.save()
			await m.reply(`Nama disimpan: ${name}`)
			break
		}

		case 'setreply':
		case 'replyset': {
			if (!isOwner && !isAdmin) {
				await m.reply('Command ini hanya untuk owner/admin.')
				break
			}

			const style = normalizeReplyStyle(command.args[0])
			if (!style) {
				await m.reply(formatReplyStyles(command.prefix))
				break
			}

			setReplyStyle(m.db, style)
			await m.db.save()
			await m.reply(`Custom reply berhasil diset ke ${style}.`)
			break
		}

		case 'register':
		case 'daftar':
			m.user.registered = true
			m.user.registeredAt ||= new Date().toISOString()
			await m.db.save()
			m.isMember = true
			m.isUnregister = false
			m.roles.labels = m.roles.labels.filter(label => label !== 'unregister')
			if (!m.roles.labels.includes('member')) {
				m.roles.labels.splice(Math.max(m.roles.labels.indexOf('user'), 0), 0, 'member')
			}
			await m.reply('Berhasil register sebagai member.')
			break

		case 'unregister':
		case 'unreg':
			m.user.registered = false
			m.user.unregisteredAt = new Date().toISOString()
			await m.db.save()
			await m.reply('Status member dihapus. Kamu sekarang unregister.')
			break

		case 'owner':
		case 'creator':
			if (!config.ownerNumber) {
				await m.reply('Owner belum diset di config.')
				break
			}

			await m.reply(`Owner: ${config.ownerNumber}`)
			break

		case 'id':
		case 'jid':
			await m.reply(`Chat JID: ${jid}\nReply JID: ${targetJid}\nSender: ${m.sender}`)
			break

		default:
			await m.reply(`Command tidak ditemukan: ${cmd}`)
			break
	}
}
