import { fetchScreenshot, getScreenshotUrl, normalizeHttpUrl } from '@shikytemo/shitools'

export const screenshotForReply = async input => {
	const trimmed = String(input || '').trim()
	if (!trimmed) {
		return { ok: false, text: 'Pakai: .ss <url>. Contoh: .ss https://github.com' }
	}
	const url = normalizeHttpUrl(trimmed)
	if (!url) {
		return { ok: false, text: 'URL tidak valid. Contoh: .ss https://github.com' }
	}
	try {
		const bytes = await fetchScreenshot(url, { width: 1280, height: 800 })
		const sizeKb = (bytes.byteLength / 1024).toFixed(1)
		const caption = [
			`📸 *Screenshot*`,
			'',
			`🔗 ${url}`,
			`📐 1280×800`,
			`📦 ${sizeKb} KB`,
			'',
			'Powered by mShots (s.wp.com)'
		].join('\n')
		return {
			ok: true,
			image: Buffer.from(bytes),
			imageUrl: getScreenshotUrl(url, { width: 1280, height: 800 }),
			caption,
			url
		}
	} catch (error) {
		return { ok: false, text: `Screenshot gagal: ${error.message || error}` }
	}
}
