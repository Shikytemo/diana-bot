import {
	createQrImageUrl as createQrUrl,
	isHttpUrl,
	normalizeHttpUrl,
	readQrBuffer,
	resolveSocialDownloader,
	shortenUrl
} from '@shikytemo/shitools'

export { isHttpUrl }

export const createShortlink = async input => {
	const targetUrl = normalizeHttpUrl(input)
	if (!targetUrl) {
		return {
			ok: false,
			text: 'URL tidak valid. Contoh: .short https://example.com'
		}
	}

	const result = await shortenUrl(targetUrl)
	if (!result.ok || !isHttpUrl(result.shortUrl)) {
		return {
			ok: false,
			text: result.text || 'Shortlink gagal dibuat.'
		}
	}

	return {
		ok: true,
		sourceUrl: targetUrl,
		shortUrl: result.shortUrl,
		text: [`Shortlink berhasil.`, `Original: ${targetUrl}`, `Short: ${result.shortUrl}`].join('\n')
	}
}

export const createQrImageUrl = input => {
	const data = String(input || '').trim()
	if (!data) {
		return {
			ok: false,
			text: 'Text/URL kosong. Contoh: .qr https://example.com'
		}
	}

	if (data.length > 900) {
		return {
			ok: false,
			text: 'Data QR terlalu panjang. Maksimal 900 karakter.'
		}
	}

	return {
		ok: true,
		imageUrl: createQrUrl(data, { size: '500x500' }),
		data
	}
}

export const readQrFromUrl = async fileUrl => {
	if (!isHttpUrl(fileUrl)) {
		return {
			ok: false,
			text: 'URL gambar QR tidak valid.'
		}
	}

	const response = await fetch(fileUrl, {
		headers: {
			'user-agent': 'DianaBot/1.0'
		}
	})
	if (!response.ok) {
		return {
			ok: false,
			text: `Gagal download gambar QR: HTTP ${response.status}`
		}
	}

	const buffer = Buffer.from(await response.arrayBuffer())
	const result = await readQrBuffer(buffer)
	return result.ok
		? { ok: true, data: result.text, text: `Isi QR:\n${result.text}` }
		: { ok: false, text: `QR tidak terbaca${result.text ? `: ${result.text}` : '.'}` }
}

export const resolveDownloader = async ({ commandName, input }) => {
	const result = await resolveSocialDownloader({ commandName, input })
	const label = result.platform || 'Downloader'

	if (!result.ok) {
		return {
			ok: false,
			text: result.text === 'URL is invalid'
				? `URL tidak valid. Contoh: .${commandName} https://...`
				: `URL bukan link ${label} yang didukung.`
		}
	}

	if (result.mode === 'direct') {
		return {
			...result,
			text: [
				`${label} link siap.`,
				`Judul: ${result.title}`,
				result.duration ? `Durasi: ${Math.round(result.duration)} detik` : '',
				`Source: ${result.sourceUrl}`
			].filter(Boolean).join('\n')
		}
	}

	return {
		...result,
		text: [
			result.error ? `${label} downloader belum bisa mengambil direct media.` : `${label} downloader memakai fallback aman.`,
			result.error ? `Alasan: ${result.error}` : 'Install yt-dlp di server jika ingin direct media.',
			'Buka halaman asli lewat tombol di bawah.'
		].join('\n')
	}
}
