const OMDB_URL = 'https://www.omdbapi.com'

const fetchOmdb = async params => {
	const url = new URL(OMDB_URL)
	// Free tier: use 'trilogy' as demo key (publicly known demo key)
	url.searchParams.set('apikey', 'trilogy')
	for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v)
	const res = await fetch(url.toString())
	return res.json()
}

export const movieForReply = async query => {
	try {
		const data = await fetchOmdb({ s: query })
		if (data.Response === 'False') {
			return { ok: false, text: `Film "${query}" tidak ditemukan.` }
		}

		const results = data.Search?.slice(0, 5) || []
		if (!results.length) {
			return { ok: false, text: 'Tidak ada hasil.' }
		}

		// Get detail of first result
		const first = results[0]
		const detail = await fetchOmdb({ i: first.imdbID, plot: 'short' })

		if (detail.Response === 'False') {
			const list = results.map((r, i) =>
				`${i + 1}. *${r.Title}* (${r.Year}) — ${r.Type}`
			).join('\n')
			return { ok: true, text: `🎬 *Hasil pencarian: ${query}*\n\n${list}` }
		}

		const lines = [
			`🎬 *${detail.Title}*`,
			'',
			detail.Year ? `📅 Tahun: ${detail.Year}` : '',
			detail.Rated ? `🔞 Rating: ${detail.Rated}` : '',
			detail.Released ? `📆 Rilis: ${detail.Released}` : '',
			detail.Runtime ? `⏱️ Durasi: ${detail.Runtime}` : '',
			detail.Genre ? `🎭 Genre: ${detail.Genre}` : '',
			detail.Director ? `🎬 Sutradara: ${detail.Director}` : '',
			detail.Actors ? `👥 Pemain: ${detail.Actors}` : '',
			detail.imdbRating ? `⭐ IMDB: ${detail.imdbRating}/10` : '',
			detail.Metascore ? `📊 Metascore: ${detail.Metascore}/100` : '',
			detail.Plot ? `\n📝 ${detail.Plot}` : '',
			'',
			detail.imdbID ? `🔗 https://www.imdb.com/title/${detail.imdbID}` : ''
		].filter(Boolean)

		return {
			ok: true,
			text: lines.join('\n'),
			poster: detail.Poster && detail.Poster !== 'N/A' ? detail.Poster : null,
			url: detail.imdbID ? `https://www.imdb.com/title/${detail.imdbID}` : null
		}
	} catch (error) {
		return { ok: false, text: `Movie search gagal: ${error.message || error}` }
	}
}
