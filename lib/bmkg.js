import { bmkg } from '@shikytemo/shitools'

const MAX_FORECAST = 6

const formatHari = iso => {
	if (!iso) return ''
	const date = new Date(iso)
	if (Number.isNaN(date.getTime())) return String(iso)
	return new Intl.DateTimeFormat('id-ID', {
		timeZone: 'Asia/Jakarta',
		weekday: 'short',
		day: '2-digit',
		month: 'short',
		hour: '2-digit',
		minute: '2-digit'
	}).format(date)
}

export const bmkgForReply = async query => {
	const trimmed = String(query || '').trim()
	if (!trimmed) {
		return { ok: false, text: 'Pakai: .bmkg <desa/kota>. Contoh: .bmkg Sleman' }
	}
	try {
		const result = await bmkg(trimmed)
		const list = (result.forecast || []).slice(0, MAX_FORECAST)
		const lines = [
			`🇮🇩 *Cuaca BMKG — ${result.desa || result.kotkab || trimmed}*`,
			`📍 ${[result.kecamatan, result.kotkab, result.provinsi].filter(Boolean).join(' • ')}`,
			'',
			...list.map(f => `• ${formatHari(f.datetime) || '-'} — ${f.weatherDesc || '-'} ${f.temperature || '-'}°C 💨${f.windSpeed || 0}km/h ${f.humidity || 0}%`)
		]
		if (!list.length) lines.push('_(tidak ada prakiraan tersedia)_')
		return { ok: true, text: lines.join('\n'), result }
	} catch (error) {
		return { ok: false, text: `BMKG gagal: ${error.message || error}` }
	}
}
