// ─── Diana Bot — scraper wrapper (btch-downloader + Bochil sub-packages) ───
// Dibuat 2026-11-28, diverifikasi di Node v24 + npm 10.
// Urutan fallback: btch-downloader dulu, lalu Bochil, lalu shitools.
// JANGAN import umbrella '@bochilteam/scraper':
//  - ESM-nya gagal di cheerio 1.2.0 ("does not provide an export named 'default'")
//  - paket religions/others/texts menjalankan fetch di top-level saat di-import
//    (listJadwalSholat / listJadwalTV / textproList). Kalau fetch itu gagal,
//    promise-nya unhandled dan proses Node bisa mati (exit 1, HTTP 504 di tes lokal).
//  - Solusi: load sub-package Bochil satu-satu lewat CJS require (createRequire),
//    lazy (di dalam fungsi), dan hanya paket yang aman di bawah ini.
import { createRequire } from 'node:module'
import * as btch from 'btch-downloader'

const require = createRequire(import.meta.url)

const isHttpUrl = value => /^https?:\/\//i.test(String(value || '').trim())

const clean = value => String(value || '').trim()

// Platform yang didukung .dl (auto-detect) dan command spesifik di bawah.
export const SUPPORTED_PLATFORMS = [
	'instagram',
	'tiktok',
	'facebook',
	'twitter',
	'youtube',
	'capcut',
	'threads',
	'spotify',
	'soundcloud',
	'mediafire',
	'pinterest',
	'gdrive',
	'douyin',
	'snackvideo'
]

const PLATFORM_PATTERNS = [
	[/instagram\.com/i, 'instagram'],
	[/(tiktok\.com|vt\.tiktok\.com|vm\.tiktok\.com)/i, 'tiktok'],
	[/(facebook\.com|fb\.watch|fb\.com)/i, 'facebook'],
	[/(twitter\.com|x\.com)/i, 'twitter'],
	[/(youtube\.com|youtu\.be)/i, 'youtube'],
	[/capcut\.com/i, 'capcut'],
	[/threads\.(com|net)/i, 'threads'],
	[/open\.spotify\.com/i, 'spotify'],
	[/soundcloud\.com/i, 'soundcloud'],
	[/mediafire\.com/i, 'mediafire'],
	[/(pinterest\.com|pin\.it)/i, 'pinterest'],
	[/drive\.google\.com/i, 'gdrive'],
	[/douyin\.com/i, 'douyin'],
	[/snackvideo\.com/i, 'snackvideo']
]

export const detectPlatform = input => {
	const url = clean(input)
	if (!url) return null
	for (const [pattern, platform] of PLATFORM_PATTERNS) {
		if (pattern.test(url)) return platform
	}
	return null
}

// ─── Normalisasi hasil yang bentuknya beda-beda antar library ───
// btch: { status, title, video, audio, thumbnail, ... }
//   video/audio bisa string, array string, atau object { url / noWatermark / ... }
// Bochil: bentuknya beda per fungsi, jadi jangan andalkan nama field tertentu.
// Strategi umum: jalanin object sampai kedalaman 3, kumpulkan URL http,
// utamakan .mp4 untuk video, .mp3 untuk audio, lalu gambar.
const collectUrls = (value, depth = 0, out = []) => {
	if (depth > 3 || value == null) return out
	if (typeof value === 'string' && isHttpUrl(value)) {
		out.push(value)
		return out
	}
	if (Array.isArray(value)) {
		for (const item of value) collectUrls(item, depth + 1, out)
		return out
	}
	if (typeof value === 'object') {
		for (const item of Object.values(value)) collectUrls(item, depth + 1, out)
	}
	return out
}

const pickUrl = (urls, extensions) => {
	if (!urls.length) return null
	for (const ext of extensions) {
		const found = urls.find(url => url.toLowerCase().split('?')[0].endsWith(ext))
		if (found) return found
	}
	return urls[0]
}

const normalizeResult = (raw, platform, sourceUrl) => {
	if (!raw || typeof raw !== 'object') {
		return { ok: false, platform, sourceUrl, text: 'Scraper mengembalikan hasil kosong.' }
	}
	// btch menandai gagal dengan status:false + message
	if (raw.status === false) {
		return {
			ok: false,
			platform,
			sourceUrl,
			text: raw.message ? String(raw.message) : 'Scraper gagal (status false).'
		}
	}
	const title = clean(raw.title || raw.caption || '')
	const thumbnail = clean(raw.thumbnail || raw.image || '')
	const urls = collectUrls(raw)
	const videoUrl = pickUrl(urls, ['.mp4', '.mov', '.webm'])
	const audioUrl = pickUrl(urls, ['.mp3', '.m4a', '.ogg', '.wav'])
	const imageUrl = pickUrl(urls, ['.jpg', '.jpeg', '.png', '.webp'])
	// Jangan pakai thumbnail sebagai media utama kalau ada video/audio.
	const mediaUrl = videoUrl || audioUrl || imageUrl || null
	const kind = videoUrl ? 'video' : audioUrl ? 'audio' : imageUrl ? 'image' : 'link'
	if (!mediaUrl) {
		return {
			ok: false,
			platform,
			sourceUrl,
			title,
			text: 'Scraper berhasil tapi tidak ada URL media yang bisa dikirim. Coba buka link aslinya.'
		}
	}
	const lines = [
		`${platform} link siap.`,
		title ? `Judul: ${title}` : '',
		`Source: ${sourceUrl}`
	].filter(Boolean)
	return { ok: true, platform, sourceUrl, mediaUrl, title, thumbnail, kind, text: lines.join('\n') }
}

// ─── btch-downloader (primary, ESM, terverifikasi) ───
// Exports terverifikasi v6.4.0: igdl, ttdl, fbdown, twitter, youtube, capcut,
// threads, spotify, soundcloud, mediafire, pinterest, gdrive, douyin,
// snackvideo, yts, xiaohongshu, cocofun, kuaishou, aio.
// Catatan tes lokal 2026-11-28: yts OK, ttdl mengembalikan video:[] untuk
// URL contoh, spotify mengembalikan status:false (500 dari upstream).
// Jadi hasilnya SELALU dicek, jangan diasumsikan berhasil.
const BTCH_FN = {
	instagram: btch.igdl,
	tiktok: btch.ttdl,
	facebook: btch.fbdown,
	twitter: btch.twitter,
	youtube: btch.youtube,
	capcut: btch.capcut,
	threads: btch.threads,
	spotify: btch.spotify,
	soundcloud: btch.soundcloud,
	mediafire: btch.mediafire,
	pinterest: btch.pinterest,
	gdrive: btch.gdrive,
	douyin: btch.douyin,
	snackvideo: btch.snackvideo
}

const resolveBtch = async (platform, url) => {
	const fn = BTCH_FN[platform]
	if (typeof fn !== 'function') return { ok: false, text: `btch tidak mendukung ${platform}.` }
	const raw = await fn(url)
	return normalizeResult(raw, platform, url)
}

// ─── Bochil sub-packages (fallback, CJS, lazy) ───
// Hanya paket aman yang di-load. Sengaja TIDAK ada:
//  - '@bochilteam/scraper' (umbrella, menarik religions/others/texts)
//  - scraper-religions, scraper-others, scraper-texts (fetch top-level)
const BOCHIL_PKG = {
	tiktok: ['@bochilteam/scraper-tiktok', 'tiktokdl'],
	instagram: ['@bochilteam/scraper-instagram', 'instagramdl'],
	facebook: ['@bochilteam/scraper-facebook', 'facebookdl'],
	twitter: ['@bochilteam/scraper-twitter', 'twitter'],
	youtube: ['@bochilteam/scraper-youtube', 'youtubedl'],
	mediafire: ['@bochilteam/scraper-mediafire', 'mediafiredl'],
}

const loadBochilFn = (platform) => {
	const entry = BOCHIL_PKG[platform]
	if (!entry) return null
	const [pkg, fnName] = entry
	try {
		const mod = require(pkg)
		return typeof mod[fnName] === 'function' ? mod[fnName] : null
	} catch {
		return null
	}
}

const resolveBochil = async (platform, url) => {
	const fn = loadBochilFn(platform)
	if (!fn) return { ok: false, text: `Bochil tidak mendukung ${platform}.` }
	// Catatan tes lokal 2026-11-28: tiktokdl di cheerio 1.2.0 gagal
	// "Cannot read properties of undefined (reading 'load')", dan di
	// cheerio 1.0.0-rc.12 gagal validasi zod (struktur TikTok berubah).
	// Jadi Bochil di sini hanya fallback, bukan andalan.
	const raw = await fn(url)
	return normalizeResult(raw, platform, url)
}

// ─── Fallback terakhir: shitools (sudah dipakai Diana) ───
// resolveSocialDownloader di shitools dipakai handler ig/yt lama.
// Di-load dinamis supaya lib ini tetap bisa di-test tanpa shitools.
const resolveShitools = async (platform, url) => {
	try {
		const { resolveSocialDownloader } = await import('@shikytemo/shitools')
		const commandName = platform === 'twitter' ? 'twitter' : platform
		const result = await resolveSocialDownloader({ commandName, input: url })
		if (!result?.ok) return { ok: false, text: result?.text || 'shitools gagal.' }
		const mediaUrl = result.mode === 'direct' ? result.mediaUrl : result.sourceUrl
		if (!mediaUrl) return { ok: false, text: 'shitools tidak memberi link media.' }
		return {
			ok: true,
			platform,
			sourceUrl: url,
			mediaUrl,
			title: result.title || '',
			kind: 'link',
			text: `${platform} link siap (fallback shitools).\nSource: ${url}`
		}
	} catch {
		return { ok: false, text: 'shitools tidak tersedia.' }
	}
}

// ─── API utama dipakai handler ───
export const resolveDownload = async ({ input, platform: forcedPlatform } = {}) => {
	const url = clean(input)
	if (!url) {
		return { ok: false, text: 'URL belum diisi.' }
	}
	if (!isHttpUrl(url)) {
		return { ok: false, text: 'URL tidak valid. Tempel link lengkap, contoh: https://www.instagram.com/reel/...' }
	}
	const platform = forcedPlatform || detectPlatform(url)
	if (!platform) {
		return {
			ok: false,
			text: 'Platform link itu belum didukung. Yang didukung: Instagram, TikTok, Facebook, Twitter/X, YouTube, CapCut, Threads, Spotify, SoundCloud, MediaFire, Pinterest, Google Drive, Douyin, SnackVideo.'
		}
	}
	const errors = []
	// 1. btch
	try {
		const result = await resolveBtch(platform, url)
		if (result.ok) return result
		errors.push(`btch: ${result.text}`)
	} catch (error) {
		errors.push(`btch: ${error?.message || error}`)
	}
	// 2. Bochil (hanya platform yang ada di BOCHIL_PKG)
	if (BOCHIL_PKG[platform]) {
		try {
			const result = await resolveBochil(platform, url)
			if (result.ok) return result
			errors.push(`bochil: ${result.text}`)
		} catch (error) {
			errors.push(`bochil: ${error?.message || error}`)
		}
	}
	// 3. shitools (instagram / youtube / twitter saja yang masuk akal)
	if (['instagram', 'youtube', 'twitter'].includes(platform)) {
		try {
			const result = await resolveShitools(platform, url)
			if (result.ok) return result
			errors.push(`shitools: ${result.text}`)
		} catch (error) {
			errors.push(`shitools: ${error?.message || error}`)
		}
	}
	return {
		ok: false,
		platform,
		sourceUrl: url,
		text: `Downloader ${platform} gagal di semua sumber.\n${errors.slice(0, 3).join('\n')}\nCoba lagi nanti, atau buka link aslinya.`
	}
}

export const resolveYtSearch = async query => {
	const q = clean(query)
	if (!q) return { ok: false, text: 'Query YouTube belum diisi.' }
	try {
		const raw = await btch.yts(q)
		const list = raw?.result?.all || raw?.all || []
		if (!list.length) return { ok: false, text: `Tidak ada hasil YouTube untuk "${q}".` }
		const top = list.slice(0, 5)
		const lines = [
			`🔎 *YouTube Search* — "${q}"`,
			'',
			...top.map((item, index) => `${index + 1}. ${item.title || '(no title)'}\n   ${item.url || ''}`).filter(Boolean)
		]
		return { ok: true, query: q, items: top, text: lines.join('\n'), topUrl: top[0]?.url || null }
	} catch (error) {
		return { ok: false, text: `YouTube search gagal: ${error?.message || error}` }
	}
}
