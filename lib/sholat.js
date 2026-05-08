import { getSholatSchedule, searchSholatCity } from '@shikytemo/shitools'

const formatHari = isoDate => {
	const date = new Date(isoDate)
	if (Number.isNaN(date.getTime())) return isoDate
	return new Intl.DateTimeFormat('id-ID', {
		timeZone: 'Asia/Jakarta',
		weekday: 'long',
		day: '2-digit',
		month: 'long',
		year: 'numeric'
	}).format(date)
}

export const sholatForReply = async query => {
	const trimmed = String(query || '').trim()
	if (!trimmed) {
		return { ok: false, text: 'Pakai: .sholat <kota>. Contoh: .sholat Jakarta' }
	}
	try {
		const cities = await searchSholatCity(trimmed)
		if (!cities.length) {
			return { ok: false, text: `Kota "${trimmed}" tidak ketemu.` }
		}
		const city = cities[0]
		const schedule = await getSholatSchedule(city.id)
		const j = schedule.jadwal || {}
		const lines = [
			`🕌 *Jadwal Sholat — ${schedule.lokasi || city.lokasi}*`,
			`📅 ${formatHari(schedule.tanggal)}`,
			'',
			`🌅 Imsak    : ${j.imsak || '-'}`,
			`🌄 Subuh    : ${j.subuh || '-'}`,
			`☀️ Terbit   : ${j.terbit || '-'}`,
			`🕓 Dhuha    : ${j.dhuha || '-'}`,
			`🕛 Dzuhur   : ${j.dzuhur || '-'}`,
			`🕒 Ashar    : ${j.ashar || '-'}`,
			`🌇 Maghrib  : ${j.maghrib || '-'}`,
			`🌃 Isya     : ${j.isya || '-'}`
		]
		if (cities.length > 1) {
			lines.push('', `_(${cities.length - 1} kota lain match — perjelas nama jika perlu)_`)
		}
		return { ok: true, text: lines.join('\n'), schedule }
	} catch (error) {
		return { ok: false, text: `Sholat gagal: ${error.message || error}` }
	}
}
