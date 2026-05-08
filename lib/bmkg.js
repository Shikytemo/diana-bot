import { bmkg, searchBmkgArea } from '@shikytemo/shitools'

const MAX_FORECAST = 6

const formatHari = iso => {
	const date = new Date(iso)
	if (Number.isNaN(date.getTime())) return iso
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
		const area = result.area
		const list = (result.forecasts || []).slice(0, MAX_FORECAST)
		const lines = [
			`🇮🇩 *Cuaca BMKG — ${area.desa || area.kotkab || trimmed}*`,
			`📍 ${[area.kecamatan, area.kotkab, area.provinsi].filter(Boolean).join(' • ')}`,
			'',
			...list.map(f => `• ${formatHari(f.datetime)} — ${f.weatherDesc} ${f.temperature}°C 💨${f.windSpeed}km/h ${f.humidity}%`)
		]
		if (!list.length) lines.push('_(tidak ada prakiraan tersedia)_')
		return { ok: true, text: lines.join('\n'), result }
	} catch (error) {
		try {
			const areas = await searchBmkgArea(trimmed)
			if (!areas.length) {
				return { ok: false, text: `Wilayah "${trimmed}" tidak ketemu.` }
			}
			return { ok: false, text: `BMKG gagal: ${error.message || error}` }
		} catch {
			return { ok: false, text: `BMKG gagal: ${error.message || error}` }
		}
	}
}
