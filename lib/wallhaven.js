import { searchWallhaven } from '@shikytemo/shitools'

const formatBytes = bytes => {
	const n = Number(bytes || 0)
	if (!Number.isFinite(n) || n <= 0) return ''
	if (n >= 1024 * 1024) return `${(n / (1024 * 1024)).toFixed(1)} MB`
	if (n >= 1024) return `${(n / 1024).toFixed(1)} KB`
	return `${n} B`
}

export const wallhavenForReply = async query => {
	const trimmed = String(query || '').trim()
	if (!trimmed) {
		return { ok: false, text: 'Pakai: .wp <query>. Contoh: .wp cyberpunk' }
	}
	try {
		const results = await searchWallhaven(trimmed, { limit: 1 })
		if (!results.length) {
			return { ok: false, text: `Wallpaper tidak ketemu untuk "${trimmed}".` }
		}
		const w = results[0]
		const caption = [
			`🖼️ *Wallhaven — ${trimmed}*`,
			'',
			`🆔 ${w.id}`,
			`📐 ${w.resolution}${w.ratio ? ` (${w.ratio})` : ''}`,
			w.fileSize ? `📦 ${formatBytes(w.fileSize)}` : '',
			w.category ? `🏷️ ${w.category}/${w.purity}` : '',
			'',
			`🔗 ${w.pageUrl}`
		].filter(Boolean).join('\n')
		return { ok: true, caption, imageUrl: w.url, pageUrl: w.pageUrl, wallpaper: w }
	} catch (error) {
		return { ok: false, text: `Wallhaven gagal: ${error.message || error}` }
	}
}
