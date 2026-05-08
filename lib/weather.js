import { getWeather } from '@shikytemo/shitools'

export const weatherForReply = async query => {
	const trimmed = String(query || '').trim()
	if (!trimmed) {
		return { ok: false, text: 'Pakai: .cuaca <kota>. Contoh: .cuaca Jakarta' }
	}
	try {
		const w = await getWeather(trimmed)
		const text = [
			`🌤️ *Cuaca — ${w.location}${w.country ? `, ${w.country}` : ''}*`,
			'',
			`☁️ Kondisi    : ${w.condition || '-'}`,
			`🌡️ Suhu       : ${w.temperature || '-'} (terasa ${w.feelsLike || '-'})`,
			`💧 Kelembapan : ${w.humidity || '-'}`,
			`💨 Angin      : ${w.wind || '-'}`,
			`👁️ Jarak Pandang: ${w.visibility || '-'}`,
			'',
			`⏰ Update     : ${w.observedAt || '-'}`,
			`🛰️ Source     : ${w.source}`
		].join('\n')
		return { ok: true, text, weather: w }
	} catch (error) {
		return { ok: false, text: `Cuaca gagal: ${error.message || error}` }
	}
}
