import { kateglo } from '@shikytemo/shitools'

const MAX_DEFS = 8

export const kategloForReply = async word => {
	const trimmed = String(word || '').trim()
	if (!trimmed) {
		return { ok: false, text: 'Pakai: .kateglo <kata>. Contoh: .kateglo komputer' }
	}
	try {
		const entry = await kateglo(trimmed)
		const defs = (entry.definitions || []).slice(0, MAX_DEFS)
		const lines = [
			`📕 *${entry.phrase}*${entry.type ? ` (${entry.type})` : ''}`,
			'',
			...defs.map((d, i) => {
				const bullet = `${i + 1}.${d.kelas ? ` _${d.kelas}_` : ''} ${d.text}`
				return d.sample ? `${bullet}\n   • ${d.sample}` : bullet
			})
		]
		if (entry.synonyms?.length) {
			lines.push('', `🔁 Sinonim: ${entry.synonyms.slice(0, 10).join(', ')}`)
		}
		if (entry.antonyms?.length) {
			lines.push(`↔️ Antonim: ${entry.antonyms.slice(0, 10).join(', ')}`)
		}
		if (!defs.length) lines.push('_(tidak ada definisi)_')
		return { ok: true, text: lines.join('\n'), entry }
	} catch (error) {
		return { ok: false, text: `Kateglo gagal: ${error.message || error}` }
	}
}
