import { getMediafire } from '@shikytemo/shitools'

export const mediafireForReply = async input => {
	const trimmed = String(input || '').trim()
	if (!trimmed) {
		return { ok: false, text: 'Pakai: .mediafire <url>. Contoh: .mediafire https://www.mediafire.com/file/...' }
	}
	try {
		const file = await getMediafire(trimmed)
		const text = [
			`🗂️ *Mediafire — ${file.filename}*`,
			'',
			`📁 Tipe : ${file.mime || '-'}`,
			`📦 Size : ${file.size || '-'}`,
			'',
			`🔗 Page : ${file.pageUrl}`,
			`⬇️ Direct: ${file.url}`
		].join('\n')
		return { ok: true, text, file, downloadUrl: file.url }
	} catch (error) {
		return { ok: false, text: `Mediafire gagal: ${error.message || error}` }
	}
}
