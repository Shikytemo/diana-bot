import { getAyat, getSurah, listSurah } from '@shikytemo/shitools'

const MAX_AYAT = 30

export const surahForReply = async input => {
	if (!input || !String(input).trim()) {
		return { ok: false, text: 'Pakai: .surah <nomor 1-114>. Contoh: .surah 36' }
	}
	const nomor = Number(String(input).trim())
	if (!Number.isInteger(nomor) || nomor < 1 || nomor > 114) {
		return { ok: false, text: 'Nomor surah harus 1-114.' }
	}
	try {
		const surah = await getSurah(nomor)
		const ayatList = (surah.ayat || []).slice(0, MAX_AYAT)
		const lines = [
			`📖 *${surah.namaLatin}* (${surah.nama}) — ${surah.arti}`,
			`📊 ${surah.jumlahAyat} ayat • ${surah.tempatTurun}`,
			'',
			...ayatList.map(a => `${a.nomorAyat}. ${a.teksArab}\n_${a.teksIndonesia}_`)
		]
		if (surah.jumlahAyat > MAX_AYAT) {
			lines.push('', `_(dipotong, total ${surah.jumlahAyat} ayat)_`)
		}
		return { ok: true, text: lines.join('\n'), surah }
	} catch (error) {
		return { ok: false, text: `Surah gagal: ${error.message || error}` }
	}
}

export const ayatForReply = async args => {
	const tokens = String(args || '').trim().split(/[\s:.,/-]+/).filter(Boolean)
	const surahNo = Number(tokens[0])
	const ayatNo = Number(tokens[1])
	if (!Number.isInteger(surahNo) || surahNo < 1 || surahNo > 114) {
		return { ok: false, text: 'Pakai: .ayat <surah> <ayat>. Contoh: .ayat 2 255' }
	}
	if (!Number.isInteger(ayatNo) || ayatNo < 1) {
		return { ok: false, text: 'Nomor ayat harus angka >= 1. Contoh: .ayat 2 255' }
	}
	try {
		const ayat = await getAyat(surahNo, ayatNo)
		const text = [
			`📖 *${ayat.surahLatin}* ${ayat.surahNomor}:${ayat.nomorAyat}`,
			'',
			ayat.teksArab,
			'',
			`_${ayat.teksIndonesia}_`,
			ayat.audio ? `🎧 ${ayat.audio}` : ''
		].filter(Boolean).join('\n')
		return { ok: true, text, ayat }
	} catch (error) {
		return { ok: false, text: `Ayat gagal: ${error.message || error}` }
	}
}

export const surahListForReply = async () => {
	try {
		const list = await listSurah()
		const text = [
			'📚 *Daftar Surah Al-Quran*',
			'',
			...list.map(s => `${String(s.nomor).padStart(3, ' ')}. ${s.namaLatin} — ${s.arti}`)
		].join('\n')
		return { ok: true, text, list }
	} catch (error) {
		return { ok: false, text: `List surah gagal: ${error.message || error}` }
	}
}
