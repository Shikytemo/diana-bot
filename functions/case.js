import { execFileSync } from 'node:child_process'
import os from 'node:os'
import { inspect } from 'node:util'
import { toAudio, toPTT, toSticker, toVideo } from '@shikytemo/shitools'
import { generateImageForReply, listImageModelsForReply } from '../lib/aiimage.js'
import { bmkgForReply } from '../lib/bmkg.js'
import { DEFAULT_CHANNEL_URL, formatChannelId, getChannelId } from '../lib/channel.js'
import { nextAnimeSession, saveAnimeSession, searchAnimeForReply, seasonAnimeForReply, sendAnimeSessionItem, topAnimeForReply } from '../lib/anime.js'
import { kursForReply, ratesForReply } from '../lib/currency.js'
import { factForReply } from '../lib/fact.js'
import { ghTrendForReply } from '../lib/ghtrend.js'
import { isMedia, isText, noMedia, noText } from '../lib/global.js'
import { addWarning, formatGroupSettings, getGroupSettings, isGroupJid, normalizeNumber, removeWarning, requireBotGroupAdmin, requireGroupAdmin, resolveTargetJids, setGroupSetting } from '../lib/group-tools.js'
import { ipLookupForReply } from '../lib/iplookup.js'
import { jokeForReply } from '../lib/joke.js'
import { kategloForReply } from '../lib/kateglo.js'
import { formatLevel } from '../lib/leveling.js'
import { fetchLyricsForReply, searchLyricsForReply } from '../lib/lyrics.js'
import { mediafireForReply } from '../lib/mediafire.js'
import { memeForReply } from '../lib/meme.js'
import { newsForReply, newsSourceListText } from '../lib/news.js'
import { nextPinterestSession, savePinterestSession, scrapePinterestForReply, sendPinterestSessionPhoto } from '../lib/pinterest.js'
import { pypiForReply } from '../lib/pypi.js'
import { animeQuoteForReply, quoteForReply } from '../lib/quote.js'
import { ayatForReply, surahForReply, surahListForReply } from '../lib/quran.js'
import { redditForReply } from '../lib/reddit.js'
import { sendButtons, sendCallButton, sendChannelIdButtons, sendCopyButton, sendList, sendMenu, sendPinterestButtons, sendUrlButton } from '../lib/reply.js'
import { formatReplyStyles, normalizeReplyStyle, setReplyStyle } from '../lib/reply-style.js'
import { formatRoles } from '../lib/roles.js'
import { getSamehadakuStream, nextSamehadakuSession, saveSamehadakuSession, selectSamehadakuEpisode, sendSamehadakuStream, sendSamehadakuVideo } from '../lib/samehadaku.js'
import { getAnoboyStreamForReply, latestAnoboyForReply, nextAnoboySession, saveAnoboySearchSession, saveAnoboyStreamSession, searchAnoboyForReply, selectAnoboyEpisode, sendAnoboySearchItem, sendAnoboyStream } from '../lib/anoboy.js'
import { getOtakudesuStreamForReply, latestOtakudesuForReply, nextOtakudesuSession, saveOtakudesuSearchSession, saveOtakudesuStreamSession, searchOtakudesuForReply, selectOtakudesuEpisode, sendOtakudesuSearchItem, sendOtakudesuStream } from '../lib/otakudesu.js'
import { nextSpotifySession, saveSpotifySearchSession, sendSpotifyDl, sendSpotifySearchItem, spotifyDlForReply, spotifySearchForReply } from '../lib/spotify.js'
import { screenshotForReply } from '../lib/screenshot.js'
import { sholatForReply } from '../lib/sholat.js'
import { dispatchTiktokInput, resolveTiktokSearch, resolveTiktokUser, resolveTiktokVideo } from '../lib/tiktok.js'
import { uploadMessageMediaToUrl } from '../lib/tourl.js'
import { detectForReply, translateForReply } from '../lib/translate.js'
import { handleBackupCommand, handleLogsCommand, handleReminderCommand, handleRestoreCommand } from '../lib/owner-tools.js'
import { restartProcess, runSelfUpdate } from '../lib/updater.js'
import { createQrImageUrl, createShortlink, isHttpUrl, readQrFromUrl, resolveDownloader } from '../lib/utility-tools.js'
import { wallhavenForReply } from '../lib/wallhaven.js'
import { weatherForReply } from '../lib/weather.js'
import { wikipediaForReply } from '../lib/wikipedia.js'
import { ytSearchForReply } from '../lib/ytsearch.js'

const commandList = [
	{ name: 'menu', aliases: ['help', 'start'], description: 'Tampilkan menu bot' },
	{ name: 'ping', aliases: ['p'], description: 'Cek respon bot' },
	{ name: 'eval', aliases: ['ev'], description: 'Evaluasi kode JavaScript owner' },
	{ name: 'backup', aliases: ['dbbackup'], description: 'Backup database owner' },
	{ name: 'restore', aliases: ['dbrestore'], description: 'Restore database dari backup JSON owner' },
	{ name: 'logs', aliases: ['logtail'], description: 'Tail log runtime owner' },
	{ name: 'remind', aliases: ['reminder', 'schedule', 'scheduler'], description: 'Set reminder owner' },
	{ name: 'sticker', aliases: ['s'], description: 'Ubah image/video jadi sticker' },
	{ name: 'toaudio', aliases: ['tomp3'], description: 'Ubah video/audio jadi MP3' },
	{ name: 'toptt', aliases: ['vn'], description: 'Ubah video/audio jadi voice note' },
	{ name: 'tovid', aliases: ['togif'], description: 'Ubah sticker jadi video/GIF' },
	{ name: 'update', aliases: ['upgrade'], description: 'Update file bot dan install dependency' },
	{ name: 'tourl', aliases: ['urlfile'], description: 'Upload media ke Catbox' },
	{ name: 'short', aliases: ['shortlink'], description: 'Buat shortlink TinyURL' },
	{ name: 'qr', aliases: ['qrcode'], description: 'Generate QR code dari text/URL' },
	{ name: 'readqr', aliases: ['qrread', 'scanqr'], description: 'Baca QR dari gambar atau URL gambar' },
	{ name: 'tiktok', aliases: ['tt'], description: 'TikTok native: URL → no-watermark, query → search, @user → profil' },
	{ name: 'ttuser', aliases: ['ttprofile', 'tikuser'], description: 'Cek profil TikTok by @username' },
	{ name: 'instagram', aliases: ['ig'], description: 'Downloader Instagram atau tombol halaman asli' },
	{ name: 'youtube', aliases: ['yt', 'ytmp4'], description: 'Downloader YouTube atau tombol halaman asli' },
	{ name: 'lyrics', aliases: ['lirik', 'ly'], description: 'Cari lyric lagu (Genius + lyrics.ovh)' },
	{ name: 'translate', aliases: ['tr', 'tl'], description: 'Translate teks (default ke Bahasa Indonesia)' },
	{ name: 'detect', aliases: ['detlang', 'dlang'], description: 'Deteksi bahasa dari teks' },
	{ name: 'image', aliases: ['imagine', 'ai', 'gen'], description: 'Generate gambar AI dari prompt (Pollinations)' },
	{ name: 'imagemodels', aliases: ['models', 'aimodels'], description: 'List model AI image yang tersedia' },
	{ name: 'wiki', aliases: ['wikipedia'], description: 'Cari artikel Wikipedia (id)' },
	{ name: 'surah', aliases: ['quran'], description: 'Tampilkan surah Al-Quran by nomor' },
	{ name: 'ayat', aliases: [], description: 'Tampilkan satu ayat (.ayat 2 255)' },
	{ name: 'surahlist', aliases: ['daftarsurah'], description: 'Daftar 114 surah Al-Quran' },
	{ name: 'sholat', aliases: ['jadwalsholat'], description: 'Jadwal sholat hari ini per kota' },
	{ name: 'cuaca', aliases: ['weather'], description: 'Cuaca global via wttr.in' },
	{ name: 'bmkg', aliases: [], description: 'Cuaca resmi BMKG (Indonesia)' },
	{ name: 'quote', aliases: ['kata'], description: 'Quote random' },
	{ name: 'animequote', aliases: ['anime-quote'], description: 'Quote anime random' },
	{ name: 'fact', aliases: ['fakta'], description: 'Random useless fact' },
	{ name: 'joke', aliases: ['lelucon'], description: 'Random joke (jokeapi)' },
	{ name: 'meme', aliases: [], description: 'Random meme dari Reddit' },
	{ name: 'kateglo', aliases: ['kbbi'], description: 'Kamus Indonesia (definisi + sinonim)' },
	{ name: 'pypi', aliases: ['pip'], description: 'Info package PyPI' },
	{ name: 'ghtrend', aliases: ['github-trending', 'gh-trend'], description: 'GitHub trending repos' },
	{ name: 'ytsearch', aliases: ['youtube-search'], description: 'Cari video YouTube' },
	{ name: 'wp', aliases: ['wallpaper', 'wallhaven'], description: 'Cari wallpaper di Wallhaven' },
	{ name: 'kurs', aliases: ['currency'], description: 'Konversi mata uang (.kurs USD IDR 50)' },
	{ name: 'rates', aliases: ['rate'], description: 'Daftar kurs populer dari base currency' },
	{ name: 'ip', aliases: ['iplookup'], description: 'Lookup info IP / lokasi' },
	{ name: 'reddit', aliases: ['r'], description: 'Lihat post subreddit (.reddit memes top)' },
	{ name: 'berita', aliases: ['news'], description: 'Headline berita Indonesia (CNN/Antara/dll)' },
	{ name: 'ss', aliases: ['screenshot'], description: 'Screenshot halaman web' },
	{ name: 'mediafire', aliases: ['mf'], description: 'Direct link Mediafire dari URL' },
	{ name: 'pin', aliases: ['pinterest', 'pins'], description: 'Scrape media Pinterest' },
	{ name: 'pinnext', aliases: ['nextpin'], description: 'Foto Pinterest berikutnya' },
	{ name: 'anime', aliases: ['ani'], description: 'Cari anime di Samehadaku' },
	{ name: 'stream', aliases: ['samehadaku', 'nonton'], description: 'Ambil stream episode Samehadaku' },
	{ name: 'streamselect', aliases: ['pilihstream'], description: 'Pilih episode stream Samehadaku' },
	{ name: 'streamnext', aliases: ['nextstream'], description: 'Server stream Samehadaku berikutnya' },
	{ name: 'otakudesu', aliases: ['otaku'], description: 'Cari anime di Otakudesu' },
	{ name: 'otakudesulatest', aliases: ['otakulatest', 'otakulatest'], description: 'Episode terbaru Otakudesu' },
	{ name: 'otakudesustream', aliases: ['otakustream'], description: 'Ambil stream episode Otakudesu' },
	{ name: 'otakudesunext', aliases: ['otakunext'], description: 'Hasil/server Otakudesu berikutnya' },
	{ name: 'otakudesuselect', aliases: ['otakuselect'], description: 'Pilih episode stream Otakudesu' },
	{ name: 'anoboy', aliases: ['ano'], description: 'Cari anime di Anoboy' },
	{ name: 'anoboylatest', aliases: ['anolatest', 'anolatest'], description: 'Episode terbaru Anoboy' },
	{ name: 'anoboystream', aliases: ['anostream'], description: 'Ambil stream episode Anoboy' },
	{ name: 'anoboynext', aliases: ['anonext'], description: 'Hasil/server Anoboy berikutnya' },
	{ name: 'anoboyselect', aliases: ['anoselect'], description: 'Pilih episode stream Anoboy' },
	{ name: 'spotify', aliases: ['sp'], description: 'Cari lagu di Spotify' },
	{ name: 'spotifydl', aliases: ['spdl'], description: 'Download lagu dari Spotify URL' },
	{ name: 'spotifynext', aliases: ['spnext'], description: 'Hasil Spotify berikutnya' },
	{ name: 'topanime', aliases: ['topani'], description: 'Top anime Samehadaku' },
	{ name: 'seasonanime', aliases: ['season'], description: 'Anime season sekarang' },
	{ name: 'idch', aliases: ['cekidch', 'cekid'], description: 'Cek ID channel WhatsApp' },
	{ name: 'role', aliases: ['profile', 'me'], description: 'Cek role user' },
	{ name: 'setnama', aliases: ['setname', 'nama'], description: 'Set nama profile bot' },
	{ name: 'setreply', aliases: ['replyset'], description: 'Set custom reply style v1-v5' },
	{ name: 'welcome', aliases: ['setwelcome'], description: 'Aktif/nonaktif welcome grup' },
	{ name: 'leave', aliases: ['setleave'], description: 'Aktif/nonaktif leave grup' },
	{ name: 'antilink', aliases: ['anti-link'], description: 'Aktif/nonaktif anti-link grup' },
	{ name: 'antispam', aliases: ['anti-spam'], description: 'Aktif/nonaktif anti-spam grup' },
	{ name: 'antidelete', aliases: ['anti-delete'], description: 'Aktif/nonaktif anti-delete grup' },
	{ name: 'groupsetting', aliases: ['groupsettings'], description: 'Cek setting grup' },
	{ name: 'warn', aliases: [], description: 'Beri warn member grup' },
	{ name: 'unwarn', aliases: [], description: 'Kurangi warn member grup' },
	{ name: 'kick', aliases: ['remove'], description: 'Keluarkan member grup' },
	{ name: 'promote', aliases: [], description: 'Jadikan admin grup' },
	{ name: 'demote', aliases: [], description: 'Turunkan admin grup' },
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

const parseOnOff = value => {
	const normalized = String(value || '').toLowerCase()
	if (['on', 'enable', 'aktif', '1', 'true'].includes(normalized)) return true
	if (['off', 'disable', 'mati', '0', 'false'].includes(normalized)) return false
	return null
}

const toggleGroupFeature = async (m, key, label) => {
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

const getGroupTargets = async m => {
	const targets = resolveTargetJids(m.message, m.command)
	if (!targets.length) {
		await m.reply(`Tag/reply target atau pakai nomor. Contoh: ${m.command.prefix}${m.command.name} 62812xxxx`)
	}
	return targets
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

		case 'backup':
		case 'dbbackup': {
			if (!isOwner) {
				await m.reply('Command ini hanya untuk owner.')
				break
			}

			try {
				await handleBackupCommand(m)
			} catch (error) {
				await m.reply(`❌ Backup gagal: ${error.message || error}`)
			}
			break
		}

		case 'restore':
		case 'dbrestore': {
			if (!isOwner) {
				await m.reply('Command ini hanya untuk owner.')
				break
			}

			try {
				await handleRestoreCommand(m)
			} catch (error) {
				await m.reply(`❌ Restore gagal: ${error.message || error}`)
			}
			break
		}

		case 'logs':
		case 'logtail': {
			if (!isOwner) {
				await m.reply('Command ini hanya untuk owner.')
				break
			}

			try {
				await handleLogsCommand(m)
			} catch (error) {
				await m.reply(`❌ Ambil log gagal: ${error.message || error}`)
			}
			break
		}

		case 'remind':
		case 'reminder':
		case 'schedule':
		case 'scheduler': {
			if (!isOwner) {
				await m.reply('Command ini hanya untuk owner.')
				break
			}

			try {
				await handleReminderCommand(m)
			} catch (error) {
				await m.reply(`❌ Reminder gagal: ${error.message || error}`)
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

		case 'short':
		case 'shortlink': {
			if (!isText(command)) {
				await m.reply(noText(command.prefix, cmd, 'https://example.com'), quoted)
				break
			}

			await m.reply('Buat shortlink...')
			try {
				const result = await createShortlink(command.text)
				if (!result.ok) {
					await m.reply(result.text)
					break
				}

				await sendUrlButton(
					sock,
					targetJid,
					{
						text: result.text,
						title: 'Shortlink',
						footer: 'Powered by TinyURL',
						buttonText: 'Buka Shortlink',
						url: result.shortUrl
					},
					quoted
				)
			} catch (error) {
				await m.reply(`Shortlink gagal: ${error.message || error}`)
			}
			break
		}

		case 'qr':
		case 'qrcode': {
			if (!isText(command)) {
				await m.reply(noText(command.prefix, cmd, 'https://example.com'), quoted)
				break
			}

			const result = createQrImageUrl(command.text)
			if (!result.ok) {
				await m.reply(result.text)
				break
			}

			await sock.sendMessage(
				targetJid,
				{
					image: { url: result.imageUrl },
					caption: `QR code:\n${result.data}`
				},
				{ quoted }
			)
			break
		}

		case 'readqr':
		case 'qrread':
		case 'scanqr': {
			let imageUrl = isText(command) && isHttpUrl(command.text) ? command.text.trim() : ''

			if (!imageUrl) {
				if (!isMedia(message)) {
					await m.reply(`Kirim/reply gambar QR atau pakai ${command.prefix}${cmd} <url gambar>.`, quoted)
					break
				}

				await m.reply('Upload gambar QR...')
				const upload = await uploadMessageMediaToUrl({ message, logger: m.logger, sock })
				if (!upload.ok) {
					await m.reply(upload.text)
					break
				}
				imageUrl = upload.url
			}

			await m.reply('Baca QR...')
			try {
				const result = await readQrFromUrl(imageUrl)
				await m.reply(result.text)
			} catch (error) {
				await m.reply(`Baca QR gagal: ${error.message || error}`)
			}
			break
		}

		case 'tiktok':
		case 'tt': {
			if (!isText(command)) {
				await m.reply(noText(command.prefix, cmd, 'https://vm.tiktok.com/ZSNFRtUJj/'), quoted)
				break
			}

			const dispatch = dispatchTiktokInput(command.text)
			try {
				if (dispatch.kind === 'url') {
					await m.reply('🎬 Ambil TikTok no-watermark...')
					const result = await resolveTiktokVideo(dispatch.value)
					if (!result.ok) {
						await m.reply(result.text || 'Tidak bisa resolve TikTok URL itu.')
						break
					}
					await sock.sendMessage(
						targetJid,
						{
							video: { url: result.playUrl },
							mimetype: 'video/mp4',
							caption: result.caption
						},
						{ quoted }
					)
					break
				}

				if (dispatch.kind === 'user') {
					await m.reply(`🔎 Ambil profil TikTok ${dispatch.value}...`)
					const result = await resolveTiktokUser(dispatch.value)
					if (!result.ok) {
						await m.reply(result.text)
						break
					}
					await sendUrlButton(
						sock,
						targetJid,
						{
							text: result.text,
							title: '📊 TikTok Profile',
							footer: 'Powered by shitools',
							buttonText: 'Buka Profil',
							url: result.profileUrl
						},
						quoted
					)
					break
				}

				await m.reply(`🔎 Cari TikTok "${dispatch.value}"...`)
				const result = await resolveTiktokSearch(dispatch.value)
				if (!result.ok) {
					await m.reply(result.text)
					break
				}
				if (result.topPermalink) {
					await sendUrlButton(
						sock,
						targetJid,
						{
							text: result.text,
							title: '🔎 TikTok Search',
							footer: 'Powered by shitools',
							buttonText: 'Buka Hasil Teratas',
							url: result.topPermalink
						},
						quoted
					)
				} else {
					await m.reply(result.text)
				}
			} catch (error) {
				await m.reply(`TikTok gagal: ${error.message || error}`)
			}
			break
		}

		case 'ttuser':
		case 'ttprofile':
		case 'tikuser': {
			if (!isText(command)) {
				await m.reply(noText(command.prefix, cmd, '@khaby.lame'), quoted)
				break
			}
			await m.reply('🔎 Ambil profil TikTok...')
			try {
				const result = await resolveTiktokUser(command.text)
				if (!result.ok) {
					await m.reply(result.text)
					break
				}
				await sendUrlButton(
					sock,
					targetJid,
					{
						text: result.text,
						title: '📊 TikTok Profile',
						footer: 'Powered by shitools',
						buttonText: 'Buka Profil',
						url: result.profileUrl
					},
					quoted
				)
			} catch (error) {
				await m.reply(`Cek user gagal: ${error.message || error}`)
			}
			break
		}

		case 'instagram':
		case 'ig':
		case 'youtube':
		case 'yt':
		case 'ytmp4': {
			if (!isText(command)) {
				await m.reply(noText(command.prefix, cmd, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'), quoted)
				break
			}

			await m.reply('Cek link downloader...')
			try {
				const result = await resolveDownloader({ commandName: cmd, input: command.text })
				if (!result.ok) {
					await m.reply(result.text)
					break
				}

				const url = result.mode === 'direct' ? result.mediaUrl : result.sourceUrl
				await sendUrlButton(
					sock,
					targetJid,
					{
						text: result.text,
						title: `${result.platform} Downloader`,
						footer: result.mode === 'direct' ? 'Powered by yt-dlp' : 'Fallback aman',
						buttonText: result.mode === 'direct' ? 'Buka Media' : 'Buka Halaman',
						url
					},
					quoted
				)
			} catch (error) {
				await m.reply(`Downloader gagal: ${error.message || error}`)
			}
			break
		}

		case 'lyrics':
		case 'lirik':
		case 'ly': {
			if (!isText(command)) {
				await m.reply(noText(command.prefix, cmd, 'someone you loved'), quoted)
				break
			}
			await m.reply('🎵 Cari lyric...')
			const result = command.args[0] === 'search'
				? await searchLyricsForReply(command.args.slice(1).join(' ') || command.text)
				: await fetchLyricsForReply(command.text)
			if (result.ok && result.url) {
				await sendUrlButton(
					sock,
					targetJid,
					{
						text: result.text,
						title: '🎵 Lyrics',
						footer: 'Powered by Genius + lyrics.ovh',
						buttonText: 'Buka Genius',
						url: result.url
					},
					quoted
				)
			} else {
				await m.reply(result.text)
			}
			break
		}

		case 'translate':
		case 'tr':
		case 'tl': {
			if (!isText(command)) {
				await m.reply(noText(command.prefix, cmd, 'en halo dunia'), quoted)
				break
			}
			await m.reply('🌐 Translate...')
			const result = await translateForReply(command.text, command.args)
			await m.reply(result.text)
			break
		}

		case 'detect':
		case 'detlang':
		case 'dlang': {
			if (!isText(command)) {
				await m.reply(noText(command.prefix, cmd, 'selamat pagi'), quoted)
				break
			}
			await m.reply('🌐 Cek bahasa...')
			const result = await detectForReply(command.text)
			await m.reply(result.text)
			break
		}

		case 'image':
		case 'imagine':
		case 'ai':
		case 'gen': {
			if (!isText(command)) {
				await m.reply(noText(command.prefix, cmd, 'a cyberpunk corgi --width=1024 --height=1024'), quoted)
				break
			}
			await m.reply('🎨 Render gambar AI... (15-30 detik)')
			const result = await generateImageForReply(command.args)
			if (!result.ok) {
				await m.reply(result.text)
				break
			}
			try {
				await sock.sendMessage(
					targetJid,
					{
						image: result.image,
						caption: result.caption
					},
					{ quoted }
				)
			} catch (error) {
				m.logger.warn({ error, command: cmd }, 'aiimage send failed')
				await sendUrlButton(
					sock,
					targetJid,
					{
						text: `${result.caption}\n\n⚠️ Gagal upload langsung, pakai link.`,
						title: '🎨 AI Image',
						footer: 'Powered by Pollinations.ai',
						buttonText: 'Buka Gambar',
						url: result.imageUrl
					},
					quoted
				)
			}
			break
		}

		case 'imagemodels':
		case 'models':
		case 'aimodels': {
			await m.reply('🧠 Ambil daftar model...')
			const result = await listImageModelsForReply()
			await m.reply(result.text)
			break
		}

		case 'wiki':
		case 'wikipedia': {
			if (!isText(command)) {
				await m.reply(noText(command.prefix, cmd, 'Sukarno'), quoted)
				break
			}
			await m.reply('📚 Cari di Wikipedia...')
			const result = await wikipediaForReply(command.text)
			if (result.ok && result.url) {
				await sendUrlButton(
					sock,
					targetJid,
					{
						text: result.text,
						title: '📚 Wikipedia',
						footer: 'Powered by Wikipedia',
						buttonText: 'Buka Wikipedia',
						url: result.url
					},
					quoted
				)
			} else {
				await m.reply(result.text)
			}
			break
		}

		case 'surah':
		case 'quran': {
			if (!isText(command)) {
				await m.reply(noText(command.prefix, cmd, '36'), quoted)
				break
			}
			await m.reply('📖 Ambil surah...')
			const result = await surahForReply(command.text)
			await m.reply(result.text)
			break
		}

		case 'ayat': {
			if (!isText(command)) {
				await m.reply(noText(command.prefix, cmd, '2 255'), quoted)
				break
			}
			await m.reply('📖 Ambil ayat...')
			const result = await ayatForReply(command.text)
			await m.reply(result.text)
			break
		}

		case 'surahlist':
		case 'daftarsurah': {
			await m.reply('📚 Ambil daftar surah...')
			const result = await surahListForReply()
			await m.reply(result.text)
			break
		}

		case 'sholat':
		case 'jadwalsholat': {
			if (!isText(command)) {
				await m.reply(noText(command.prefix, cmd, 'Jakarta'), quoted)
				break
			}
			await m.reply('🕌 Ambil jadwal sholat...')
			const result = await sholatForReply(command.text)
			await m.reply(result.text)
			break
		}

		case 'cuaca':
		case 'weather': {
			if (!isText(command)) {
				await m.reply(noText(command.prefix, cmd, 'Jakarta'), quoted)
				break
			}
			await m.reply('🌤️ Cek cuaca...')
			const result = await weatherForReply(command.text)
			await m.reply(result.text)
			break
		}

		case 'bmkg': {
			if (!isText(command)) {
				await m.reply(noText(command.prefix, cmd, 'Sleman'), quoted)
				break
			}
			await m.reply('🇮🇩 Ambil prakiraan BMKG...')
			const result = await bmkgForReply(command.text)
			await m.reply(result.text)
			break
		}

		case 'quote':
		case 'kata': {
			await m.reply('💭 Ambil quote...')
			const result = await quoteForReply()
			await m.reply(result.text)
			break
		}

		case 'animequote':
		case 'anime-quote': {
			await m.reply('🎌 Ambil anime quote...')
			const result = await animeQuoteForReply()
			await m.reply(result.text)
			break
		}

		case 'fact':
		case 'fakta': {
			await m.reply('💡 Ambil fakta...')
			const result = await factForReply(command.args[0])
			await m.reply(result.text)
			break
		}

		case 'joke':
		case 'lelucon': {
			await m.reply('😂 Ambil joke...')
			const result = await jokeForReply(command.args[0])
			await m.reply(result.text)
			break
		}

		case 'meme': {
			await m.reply('😂 Ambil meme...')
			const result = await memeForReply(command.text)
			if (!result.ok) {
				await m.reply(result.text)
				break
			}
			try {
				await sock.sendMessage(
					targetJid,
					{ image: { url: result.imageUrl }, caption: result.caption },
					{ quoted }
				)
			} catch (error) {
				m.logger.warn({ error, command: cmd }, 'meme send failed')
				await sendUrlButton(
					sock,
					targetJid,
					{
						text: `${result.caption}\n\n⚠️ Gagal kirim langsung, pakai link.`,
						title: '😂 Meme',
						footer: 'Powered by meme-api.com',
						buttonText: 'Buka Meme',
						url: result.imageUrl
					},
					quoted
				)
			}
			break
		}

		case 'kateglo':
		case 'kbbi': {
			if (!isText(command)) {
				await m.reply(noText(command.prefix, cmd, 'komputer'), quoted)
				break
			}
			await m.reply('📕 Cari di KBBI/Kateglo...')
			const result = await kategloForReply(command.text)
			await m.reply(result.text)
			break
		}

		case 'pypi':
		case 'pip': {
			if (!isText(command)) {
				await m.reply(noText(command.prefix, cmd, 'requests'), quoted)
				break
			}
			await m.reply('🐍 Cek PyPI...')
			const result = await pypiForReply(command.text)
			if (result.ok && result.url) {
				await sendUrlButton(
					sock,
					targetJid,
					{
						text: result.text,
						title: '🐍 PyPI',
						footer: 'Powered by pypi.org',
						buttonText: 'Buka PyPI',
						url: result.url
					},
					quoted
				)
			} else {
				await m.reply(result.text)
			}
			break
		}

		case 'ghtrend':
		case 'github-trending':
		case 'gh-trend': {
			await m.reply('🔥 Ambil GitHub Trending...')
			const result = await ghTrendForReply(command.args)
			await m.reply(result.text)
			break
		}

		case 'ytsearch':
		case 'youtube-search': {
			if (!isText(command)) {
				await m.reply(noText(command.prefix, cmd, 'lo-fi beats'), quoted)
				break
			}
			await m.reply('📺 Cari di YouTube...')
			const result = await ytSearchForReply(command.text)
			if (result.ok && result.topUrl) {
				await sendUrlButton(
					sock,
					targetJid,
					{
						text: result.text,
						title: '📺 YouTube Search',
						footer: 'Powered by Piped',
						buttonText: 'Buka Hasil Teratas',
						url: result.topUrl
					},
					quoted
				)
			} else {
				await m.reply(result.text)
			}
			break
		}

		case 'wp':
		case 'wallpaper':
		case 'wallhaven': {
			if (!isText(command)) {
				await m.reply(noText(command.prefix, cmd, 'cyberpunk'), quoted)
				break
			}
			await m.reply('🖼️ Cari wallpaper...')
			const result = await wallhavenForReply(command.text)
			if (!result.ok) {
				await m.reply(result.text)
				break
			}
			try {
				await sock.sendMessage(
					targetJid,
					{ image: { url: result.imageUrl }, caption: result.caption },
					{ quoted }
				)
			} catch (error) {
				m.logger.warn({ error, command: cmd }, 'wallpaper send failed')
				await sendUrlButton(
					sock,
					targetJid,
					{
						text: `${result.caption}\n\n⚠️ Gagal kirim langsung, pakai link.`,
						title: '🖼️ Wallhaven',
						footer: 'Powered by Wallhaven',
						buttonText: 'Buka Wallpaper',
						url: result.pageUrl || result.imageUrl
					},
					quoted
				)
			}
			break
		}

		case 'kurs':
		case 'currency': {
			if (!isText(command)) {
				await m.reply(noText(command.prefix, cmd, 'USD IDR 50'), quoted)
				break
			}
			await m.reply('💱 Konversi mata uang...')
			const result = await kursForReply(command.args)
			await m.reply(result.text)
			break
		}

		case 'rates':
		case 'rate': {
			await m.reply('💱 Ambil rates...')
			const result = await ratesForReply(command.args[0])
			await m.reply(result.text)
			break
		}

		case 'ip':
		case 'iplookup': {
			await m.reply('🌐 Lookup IP...')
			const result = await ipLookupForReply(command.text)
			if (result.ok && result.mapUrl) {
				await sendUrlButton(
					sock,
					targetJid,
					{
						text: result.text,
						title: '🌐 IP Lookup',
						footer: 'Powered by ipwho.is',
						buttonText: 'Buka Maps',
						url: result.mapUrl
					},
					quoted
				)
			} else {
				await m.reply(result.text)
			}
			break
		}

		case 'reddit':
		case 'r': {
			if (!isText(command)) {
				await m.reply(noText(command.prefix, cmd, 'ProgrammerHumor top'), quoted)
				break
			}
			await m.reply('🔴 Ambil post Reddit...')
			const result = await redditForReply(command.args)
			if (result.ok && result.topPermalink) {
				await sendUrlButton(
					sock,
					targetJid,
					{
						text: result.text,
						title: '🔴 Reddit',
						footer: 'Powered by reddit.com',
						buttonText: 'Buka Post Teratas',
						url: result.topPermalink
					},
					quoted
				)
			} else {
				await m.reply(result.text)
			}
			break
		}

		case 'berita':
		case 'news': {
			if (command.args[0] === 'list') {
				await m.reply(newsSourceListText())
				break
			}
			await m.reply('📰 Ambil headline...')
			const result = await newsForReply(command.text || command.args[0])
			if (result.ok && result.topUrl) {
				await sendUrlButton(
					sock,
					targetJid,
					{
						text: result.text,
						title: '📰 Berita',
						footer: 'Powered by berita-indo-api',
						buttonText: 'Buka Berita Teratas',
						url: result.topUrl
					},
					quoted
				)
			} else {
				await m.reply(result.text)
			}
			break
		}

		case 'ss':
		case 'screenshot': {
			if (!isText(command)) {
				await m.reply(noText(command.prefix, cmd, 'https://github.com'), quoted)
				break
			}
			await m.reply('📸 Render screenshot... (5-15 detik)')
			const result = await screenshotForReply(command.text)
			if (!result.ok) {
				await m.reply(result.text)
				break
			}
			try {
				await sock.sendMessage(
					targetJid,
					{ image: result.image, caption: result.caption },
					{ quoted }
				)
			} catch (error) {
				m.logger.warn({ error, command: cmd }, 'screenshot send failed')
				await sendUrlButton(
					sock,
					targetJid,
					{
						text: `${result.caption}\n\n⚠️ Gagal kirim langsung, pakai link.`,
						title: '📸 Screenshot',
						footer: 'Powered by mShots',
						buttonText: 'Buka Gambar',
						url: result.imageUrl
					},
					quoted
				)
			}
			break
		}

		case 'mediafire':
		case 'mf': {
			if (!isText(command)) {
				await m.reply(noText(command.prefix, cmd, 'https://www.mediafire.com/file/...'), quoted)
				break
			}
			await m.reply('🗂️ Resolve Mediafire...')
			const result = await mediafireForReply(command.text)
			if (result.ok && result.downloadUrl) {
				await sendUrlButton(
					sock,
					targetJid,
					{
						text: result.text,
						title: '🗂️ Mediafire',
						footer: 'Direct download',
						buttonText: 'Download',
						url: result.downloadUrl
					},
					quoted
				)
			} else {
				await m.reply(result.text)
			}
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

		// ── Otakudesu ──

		case 'otakudesu':
		case 'otaku': {
			if (!isText(command)) {
				await m.reply(noText(command.prefix, cmd, 'one piece'), quoted)
				break
			}

			await m.reply('🎬 Cari anime Otakudesu...')
			try {
				const result = await searchOtakudesuForReply(command.text)
				if (!result.ok) {
					await m.reply(result.text)
					break
				}

				const session = saveOtakudesuSearchSession({ jid: targetJid, sender: m.sender, result })
				await sendOtakudesuSearchItem({ sock, jid: targetJid, session, quoted })
			} catch (error) {
				await m.reply(`❌ Gagal cari anime Otakudesu: ${error.message || error}`)
			}
			break
		}

		case 'otakudesulatest':
		case 'otakulatest': {
			await m.reply('📺 Ambil episode terbaru Otakudesu...')
			try {
				const result = await latestOtakudesuForReply()
				if (!result.ok) {
					await m.reply(result.text)
					break
				}

				const session = saveOtakudesuSearchSession({ jid: targetJid, sender: m.sender, result })
				await sendOtakudesuSearchItem({ sock, jid: targetJid, session, quoted })
			} catch (error) {
				await m.reply(`❌ Gagal ambil latest Otakudesu: ${error.message || error}`)
			}
			break
		}

		case 'otakudesustream':
		case 'otakustream': {
			if (!isText(command)) {
				await m.reply(noText(command.prefix, cmd, 'one piece episode 1100'), quoted)
				break
			}

			await m.reply('🎬 Ambil stream Otakudesu...')
			try {
				const result = await getOtakudesuStreamForReply(command.text)
				if (!result.ok) {
					await m.reply(result.text)
					break
				}

				const session = saveOtakudesuStreamSession({ jid: targetJid, sender: m.sender, result })
				await sendOtakudesuStream({ sock, jid: targetJid, session, quoted })
			} catch (error) {
				await m.reply(`❌ Gagal ambil stream Otakudesu: ${error.message || error}`)
			}
			break
		}

		case 'otakudesunext':
		case 'otakunext': {
			const session = nextOtakudesuSession({ jid: targetJid, sender: m.sender })
			if (!session) {
				await m.reply(`Session habis. Pakai ${command.prefix}otakudesu <query> lagi.`)
				break
			}

			try {
				if (session.episode?.mirrors?.length) {
					await sendOtakudesuStream({ sock, jid: targetJid, session, quoted })
				} else {
					await sendOtakudesuSearchItem({ sock, jid: targetJid, session, quoted })
				}
			} catch (error) {
				await m.reply(`❌ Gagal kirim hasil: ${error.message || error}`)
			}
			break
		}

		case 'otakudesuselect':
		case 'otakuselect': {
			const selectedIndex = Number(command.args[0])
			if (!Number.isInteger(selectedIndex) || selectedIndex < 1) {
				await m.reply('Pilih episode dari list stream dulu.')
				break
			}

			try {
				const session = await selectOtakudesuEpisode({ jid: targetJid, sender: m.sender, index: selectedIndex })
				if (!session) {
					await m.reply(`Session stream habis. Pakai ${command.prefix}otakudesustream <query> lagi.`)
					break
				}

				await sendOtakudesuStream({ sock, jid: targetJid, session, quoted })
			} catch (error) {
				await m.reply(`❌ Gagal pilih episode: ${error.message || error}`)
			}
			break
		}

		// ── Anoboy ──

		case 'anoboy':
		case 'ano': {
			if (!isText(command)) {
				await m.reply(noText(command.prefix, cmd, 'one piece'), quoted)
				break
			}

			await m.reply('🎬 Cari anime Anoboy...')
			try {
				const result = await searchAnoboyForReply(command.text)
				if (!result.ok) {
					await m.reply(result.text)
					break
				}

				const session = saveAnoboySearchSession({ jid: targetJid, sender: m.sender, result })
				await sendAnoboySearchItem({ sock, jid: targetJid, session, quoted })
			} catch (error) {
				await m.reply(`❌ Gagal cari anime Anoboy: ${error.message || error}`)
			}
			break
		}

		case 'anoboylatest':
		case 'anolatest': {
			await m.reply('📺 Ambil episode terbaru Anoboy...')
			try {
				const result = await latestAnoboyForReply()
				if (!result.ok) {
					await m.reply(result.text)
					break
				}

				const session = saveAnoboySearchSession({ jid: targetJid, sender: m.sender, result })
				await sendAnoboySearchItem({ sock, jid: targetJid, session, quoted })
			} catch (error) {
				await m.reply(`❌ Gagal ambil latest Anoboy: ${error.message || error}`)
			}
			break
		}

		case 'anoboystream':
		case 'anostream': {
			if (!isText(command)) {
				await m.reply(noText(command.prefix, cmd, 'one piece episode 1100'), quoted)
				break
			}

			await m.reply('🎬 Ambil stream Anoboy...')
			try {
				const result = await getAnoboyStreamForReply(command.text)
				if (!result.ok) {
					await m.reply(result.text)
					break
				}

				const session = saveAnoboyStreamSession({ jid: targetJid, sender: m.sender, result })
				await sendAnoboyStream({ sock, jid: targetJid, session, quoted })
			} catch (error) {
				await m.reply(`❌ Gagal ambil stream Anoboy: ${error.message || error}`)
			}
			break
		}

		case 'anoboynext':
		case 'anonext': {
			const session = nextAnoboySession({ jid: targetJid, sender: m.sender })
			if (!session) {
				await m.reply(`Session habis. Pakai ${command.prefix}anoboy <query> lagi.`)
				break
			}

			try {
				if (session.episode?.mirrors?.length) {
					await sendAnoboyStream({ sock, jid: targetJid, session, quoted })
				} else {
					await sendAnoboySearchItem({ sock, jid: targetJid, session, quoted })
				}
			} catch (error) {
				await m.reply(`❌ Gagal kirim hasil: ${error.message || error}`)
			}
			break
		}

		case 'anoboyselect':
		case 'anoselect': {
			const selectedIndex = Number(command.args[0])
			if (!Number.isInteger(selectedIndex) || selectedIndex < 1) {
				await m.reply('Pilih episode dari list stream dulu.')
				break
			}

			try {
				const session = await selectAnoboyEpisode({ jid: targetJid, sender: m.sender, index: selectedIndex })
				if (!session) {
					await m.reply(`Session stream habis. Pakai ${command.prefix}anoboystream <query> lagi.`)
					break
				}

				await sendAnoboyStream({ sock, jid: targetJid, session, quoted })
			} catch (error) {
				await m.reply(`❌ Gagal pilih episode: ${error.message || error}`)
			}
			break
		}

		// ── Spotify ──

		case 'spotify':
		case 'sp': {
			if (!isText(command)) {
				await m.reply(noText(command.prefix, cmd, 'imagine dragons'), quoted)
				break
			}

			await m.reply('🎵 Cari lagu Spotify...')
			try {
				const result = await spotifySearchForReply(command.text)
				if (!result.ok) {
					await m.reply(result.text)
					break
				}

				const session = saveSpotifySearchSession({ jid: targetJid, sender: m.sender, result })
				await sendSpotifySearchItem({ sock, jid: targetJid, session, quoted })
			} catch (error) {
				await m.reply(`❌ Gagal cari Spotify: ${error.message || error}`)
			}
			break
		}

		case 'spotifydl':
		case 'spdl': {
			if (!isText(command)) {
				await m.reply(noText(command.prefix, cmd, 'https://open.spotify.com/track/...'), quoted)
				break
			}

			await m.reply('🎵 Ambil info Spotify...')
			try {
				const result = await spotifyDlForReply(command.text)
				if (!result.ok) {
					await m.reply(result.text)
					break
				}

				await sendSpotifyDl({ sock, jid: targetJid, result, quoted })
			} catch (error) {
				await m.reply(`❌ Gagal download Spotify: ${error.message || error}`)
			}
			break
		}

		case 'spotifynext':
		case 'spnext': {
			const session = nextSpotifySession({ jid: targetJid, sender: m.sender })
			if (!session) {
				await m.reply(`Session habis. Pakai ${command.prefix}spotify <query> lagi.`)
				break
			}

			try {
				await sendSpotifySearchItem({ sock, jid: targetJid, session, quoted })
			} catch (error) {
				await m.reply(`❌ Gagal kirim hasil: ${error.message || error}`)
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

		case 'welcome':
		case 'setwelcome':
			await toggleGroupFeature(m, 'welcome', 'Welcome')
			break

		case 'leave':
		case 'setleave':
			await toggleGroupFeature(m, 'leave', 'Leave')
			break

		case 'antilink':
		case 'anti-link':
			await toggleGroupFeature(m, 'antiLink', 'Anti-link')
			break

		case 'antispam':
		case 'anti-spam':
			await toggleGroupFeature(m, 'antiSpam', 'Anti-spam')
			break

		case 'antidelete':
		case 'anti-delete':
			await toggleGroupFeature(m, 'antiDelete', 'Anti-delete')
			break

		case 'groupsetting':
		case 'groupsettings': {
			if (!isGroupJid(jid)) {
				await m.reply('Command ini hanya bisa dipakai di grup.')
				break
			}

			await m.reply(formatGroupSettings(getGroupSettings(m.db, jid)))
			break
		}

		case 'warn': {
			if (!(await requireGroupAdmin(m))) break

			const targets = await getGroupTargets(m)
			if (!targets.length) break

			for (const target of targets) {
				const count = addWarning(m.db, jid, target)
				await sock.sendMessage(jid, { text: `@${normalizeNumber(target)} mendapat warn ${count}/3.`, mentions: [target] }, { quoted })
			}
			await m.db.save()
			break
		}

		case 'unwarn': {
			if (!(await requireGroupAdmin(m))) break

			const targets = await getGroupTargets(m)
			if (!targets.length) break

			for (const target of targets) {
				const count = removeWarning(m.db, jid, target)
				await sock.sendMessage(jid, { text: `Warn @${normalizeNumber(target)} sekarang ${count}/3.`, mentions: [target] }, { quoted })
			}
			await m.db.save()
			break
		}

		case 'kick':
		case 'remove': {
			if (!(await requireGroupAdmin(m))) break
			if (!(await requireBotGroupAdmin(m))) break

			const targets = await getGroupTargets(m)
			if (!targets.length) break

			await sock.groupParticipantsUpdate(jid, targets, 'remove')
			for (const target of targets) {
				removeWarning(m.db, jid, target, 99)
			}
			await m.db.save()
			await m.reply(`Berhasil kick ${targets.length} member.`)
			break
		}

		case 'promote': {
			if (!(await requireGroupAdmin(m))) break
			if (!(await requireBotGroupAdmin(m))) break

			const targets = await getGroupTargets(m)
			if (!targets.length) break

			await sock.groupParticipantsUpdate(jid, targets, 'promote')
			await m.reply(`Berhasil promote ${targets.length} member.`)
			break
		}

		case 'demote': {
			if (!(await requireGroupAdmin(m))) break
			if (!(await requireBotGroupAdmin(m))) break

			const targets = await getGroupTargets(m)
			if (!targets.length) break

			await sock.groupParticipantsUpdate(jid, targets, 'demote')
			await m.reply(`Berhasil demote ${targets.length} admin.`)
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
