// Scraper Commands — Twitter/X, Facebook, CapCut, Pinterest, SoundCloud, etc.
// Uses free scraping APIs

// ── Twitter/X Scraper ──
const twitterScrape = async (url) => {
	try {
		const api = `https://api.twitter-fx.io/v1/media?url=${encodeURIComponent(url)}`
		const res = await fetch(api, { headers: { 'User-Agent': 'Mozilla/5.0' } })
		if (!res.ok) throw new Error('API gagal')
		const data = await res.json()
		return data
	} catch {
		// Fallback: try another API
		try {
			const api2 = `https://api.cobalt.tools/api/json?url=${encodeURIComponent(url)}`
			const res2 = await fetch(api2, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
				body: JSON.stringify({ url })
			})
			if (!res2.ok) throw new Error('Fallback gagal')
			return await res2.json()
		} catch {
			return { error: 'Gagal scrape Twitter/X. Coba lagi nanti.' }
		}
	}
}

// ── Facebook Scraper ──
const facebookScrape = async (url) => {
	try {
		const api = `https://api.cobalt.tools/api/json?url=${encodeURIComponent(url)}`
		const res = await fetch(api, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
			body: JSON.stringify({ url })
		})
		if (!res.ok) throw new Error('API gagal')
		return await res.json()
	} catch {
		return { error: 'Gagal scrape Facebook. Coba lagi nanti.' }
	}
}

// ── CapCut Template Scraper ──
const capcutScrape = async (url) => {
	try {
		// Extract template ID from URL
		const match = url.match(/template\/(\d+)/)
		if (!match) return { error: 'URL CapCut template tidak valid' }
		const templateId = match[1]
		return {
			templateId,
			url: `https://www.capcut.com/template/${templateId}`,
			download: `https://www.capcut.com/api/template/download?id=${templateId}`
		}
	} catch {
		return { error: 'Gagal scrape CapCut' }
	}
}

// ── SoundCloud Scraper ──
const soundcloudScrape = async (url) => {
	try {
		const api = `https://api.cobalt.tools/api/json?url=${encodeURIComponent(url)}`
		const res = await fetch(api, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
			body: JSON.stringify({ url })
		})
		if (!res.ok) throw new Error('API gagal')
		return await res.json()
	} catch {
		return { error: 'Gagal scrape SoundCloud. Coba lagi nanti.' }
	}
}

// ── Giphy Search ──
const giphySearch = async (query) => {
	try {
		const res = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=${encodeURIComponent(query)}&limit=5`)
		const data = await res.json()
		return data.data?.map(g => ({
			url: g.images?.original?.url,
			title: g.title,
			webUrl: g.url
		})) || []
	} catch {
		return []
	}
}

// ── Unsplash Search (no key) ──
const unsplashSearch = async (query) => {
	try {
		const res = await fetch(`https://unsplash.com/napi/search/photos?query=${encodeURIComponent(query)}&per_page=5`)
		const data = await res.json()
		return data.results?.map(r => ({
			url: r.urls?.regular,
			thumb: r.urls?.thumb,
			author: r.user?.name,
			description: r.description || r.alt_description
		})) || []
	} catch {
		return []
	}
}

// ── Pexels Search (no key) ──
const pexelsSearch = async (query) => {
	try {
		const res = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=5`, {
			headers: { 'Authorization': 'hCkwKk1RqWtNjC0Kz9PZ3RgV4lS0LTlFmU6bWkNxgBt4cVMmYgiS5lGb' }
		})
		if (!res.ok) throw new Error('Pexels gagal')
		const data = await res.json()
		return data.photos?.map(p => ({
			url: p.src?.original,
			thumb: p.src?.medium,
			author: p.photographer,
			description: p.alt
		})) || []
	} catch {
		return []
	}
}

// ── GitHub User Info ──
const githubUser = async (username) => {
	try {
		const res = await fetch(`https://api.github.com/users/${username}`)
		if (!res.ok) throw new Error('User tidak ditemukan')
		return await res.json()
	} catch (e) {
		return { error: e.message }
	}
}

// ── GitHub Repo Info ──
const githubRepo = async (owner, repo) => {
	try {
		const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`)
		if (!res.ok) throw new Error('Repo tidak ditemukan')
		return await res.json()
	} catch (e) {
		return { error: e.message }
	}
}

// ── NPM Package Info ──
const npmInfo = async (pkg) => {
	try {
		const res = await fetch(`https://registry.npmjs.org/${encodeURIComponent(pkg)}`)
		if (!res.ok) throw new Error('Package tidak ditemukan')
		return await res.json()
	} catch (e) {
		return { error: e.message }
	}
}

// ── Wikipedia Search ──
const wikiSearch = async (query, lang = 'id') => {
	try {
		const res = await fetch(`https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`)
		if (!res.ok) throw new Error('Tidak ditemukan')
		return await res.json()
	} catch (e) {
		return { error: e.message }
	}
}

// ── Urban Dictionary ──
const urbanSearch = async (term) => {
	try {
		const res = await fetch(`https://api.urbandictionary.com/v0/define?term=${encodeURIComponent(term)}`)
		const data = await res.json()
		return data.list?.[0] || null
	} catch {
		return null
	}
}

// ── Dictionary ──
const dictSearch = async (word) => {
	try {
		const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`)
		if (!res.ok) throw new Error('Kata tidak ditemukan')
		const data = await res.json()
		return data[0]
	} catch (e) {
		return { error: e.message }
	}
}

// ── CoinGecko Crypto ──
const cryptoInfo = async (id) => {
	try {
		const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
		if (!res.ok) throw new Error('Crypto tidak ditemukan')
		return await res.json()
	} catch (e) {
		return { error: e.message }
	}
}

// ── REST Countries ──
const countryInfo = async (name) => {
	try {
		const res = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(name)}`)
		if (!res.ok) throw new Error('Negara tidak ditemukan')
		const data = await res.json()
		return data[0]
	} catch (e) {
		return { error: e.message }
	}
}

// ── Open Library ──
const bookSearch = async (query) => {
	try {
		const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=5`)
		if (!res.ok) throw new Error('Buku tidak ditemukan')
		return await res.json()
	} catch (e) {
		return { error: e.message }
	}
}

// ── TV Maze ──
const tvSearch = async (query) => {
	try {
		const res = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`)
		if (!res.ok) throw new Error('TV show tidak ditemukan')
		return await res.json()
	} catch (e) {
		return { error: e.message }
	}
}

// ── PokéAPI ──
const pokemonInfo = async (name) => {
	try {
		const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(name)}`)
		if (!res.ok) throw new Error('Pokemon tidak ditemukan')
		return await res.json()
	} catch (e) {
		return { error: e.message }
	}
}

// ── SWAPI ──
const swapiInfo = async (type, id) => {
	try {
		const res = await fetch(`https://swapi.dev/api/${type}/${id}/`)
		if (!res.ok) throw new Error('Tidak ditemukan')
		return await res.json()
	} catch (e) {
		return { error: e.message }
	}
}

// ── Deezer Search ──
const deezerSearch = async (query) => {
	try {
		const res = await fetch(`https://api.deezer.com/search?q=${encodeURIComponent(query)}&limit=5`)
		if (!res.ok) throw new Error('Deezer gagal')
		return await res.json()
	} catch (e) {
		return { error: e.message }
	}
}

// ── iTunes Search ──
const itunesSearch = async (query) => {
	try {
		const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&limit=5`)
		if (!res.ok) throw new Error('iTunes gagal')
		return await res.json()
	} catch (e) {
		return { error: e.message }
	}
}

// ── Hacker News ──
const hnTop = async () => {
	try {
		const res = await fetch('https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=10')
		if (!res.ok) throw new Error('HN gagal')
		return await res.json()
	} catch (e) {
		return { error: e.message }
	}
}

export const commands = {
	// ── Twitter/X Download ──
	twitter: async m => {
		const { command, reply } = m
		const url = command.args[0]
		if (!url || !url.includes('twitter.com') && !url.includes('x.com')) {
			await reply('🐦 *Twitter/X Downloader*\n\nFormat: .twitter <url>\nContoh: .twitter https://x.com/user/status/123456')
			return
		}
		await reply('⏳ Mengambil data Twitter/X...')
		const result = await twitterScrape(url)
		if (result.error) { await reply(result.error); return }
		if (result.url) {
			await reply(`🐦 Twitter/X\n\n📥 Download: ${result.url}`)
		} else if (result.picker) {
			const list = result.picker.map((p, i) => `${i + 1}. ${p.type || 'media'}: ${p.url}`).join('\n')
			await reply(`🐦 Twitter/X\n\n${list}`)
		} else {
			await reply('🐦 Data ditemukan tapi tidak ada media.\n' + JSON.stringify(result).slice(0, 500))
		}
	},

	x: async m => await m.commands.twitter(m),

	// ── Facebook Download ──
	facebook: async m => {
		const { command, reply } = m
		const url = command.args[0]
		if (!url || !url.includes('facebook.com') && !url.includes('fb.watch')) {
			await reply('📘 *Facebook Downloader*\n\nFormat: .facebook <url>\nContoh: .facebook https://fb.watch/xxxxx')
			return
		}
		await reply('⏳ Mengambil data Facebook...')
		const result = await facebookScrape(url)
		if (result.error) { await reply(result.error); return }
		if (result.url) {
			await reply(`📘 Facebook\n\n📥 Download: ${result.url}`)
		} else {
			await reply('📘 Data ditemukan tapi tidak ada media.\n' + JSON.stringify(result).slice(0, 500))
		}
	},

	fb: async m => await m.commands.facebook(m),

	// ── CapCut Template ──
	capcut: async m => {
		const { command, reply } = m
		const url = command.args[0]
		if (!url || !url.includes('capcut.com')) {
			await reply('✂️ *CapCut Template*\n\nFormat: .capcut <url template>\nContoh: .capcut https://www.capcut.com/template/123456')
			return
		}
		const result = await capcutScrape(url)
		if (result.error) { await reply(result.error); return }
		await reply([
			'✂️ *CapCut Template*',
			'',
			`🆔 ID: ${result.templateId}`,
			`🔗 URL: ${result.url}`,
			`📥 Download: ${result.download}`
		].join('\n'))
	},

	// ── SoundCloud Download ──
	soundcloud: async m => {
		const { command, reply } = m
		const url = command.args[0]
		if (!url || !url.includes('soundcloud.com')) {
			await reply('🎵 *SoundCloud Downloader*\n\nFormat: .soundcloud <url>\nContoh: .soundcloud https://soundcloud.com/user/track')
			return
		}
		await reply('⏳ Mengambil data SoundCloud...')
		const result = await soundcloudScrape(url)
		if (result.error) { await reply(result.error); return }
		if (result.url) {
			await reply(`🎵 SoundCloud\n\n📥 Download: ${result.url}`)
		} else {
			await reply('🎵 Data ditemukan tapi tidak ada audio.\n' + JSON.stringify(result).slice(0, 500))
		}
	},

	sc: async m => await m.commands.soundcloud(m),

	// ── Giphy Search ──
	giphy: async m => {
		const { command, reply, download } = m
		const query = command.text
		if (!query) { await reply('Format: .giphy <query>'); return }
		const results = await giphySearch(query)
		if (!results.length) { await reply('GIF tidak ditemukan'); return }
		const gif = results[0]
		try {
			const buffer = await download(gif.url)
			await reply({ video: buffer, caption: `🎬 ${gif.title}`, gifPlayback: true })
		} catch {
			await reply(`🎬 ${gif.title}\n🔗 ${gif.webUrl}`)
		}
	},

	gif: async m => await m.commands.giphy(m),

	// ── Unsplash Search ──
	unsplash: async m => {
		const { command, reply, download } = m
		const query = command.text
		if (!query) { await reply('Format: .unsplash <query>'); return }
		const results = await unsplashSearch(query)
		if (!results.length) { await reply('Foto tidak ditemukan'); return }
		const photo = results[0]
		try {
			const buffer = await download(photo.url)
			await reply({ image: buffer, caption: `📸 ${photo.author}\n${photo.description || ''}` })
		} catch {
			await reply(`📸 ${photo.author}\n🔗 ${photo.url}`)
		}
	},

	// ── GitHub User ──
	ghuser: async m => {
		const { command, reply } = m
		const username = command.args[0]
		if (!username) { await reply('Format: .ghuser <username>'); return }
		const data = await githubUser(username)
		if (data.error) { await reply(data.error); return }
		await reply([
			'👤 *GitHub User*',
			'',
			`📛 ${data.name || data.login}`,
			`📝 ${data.bio || 'No bio'}`,
			`🏢 ${data.company || '-'} | 📍 ${data.location || '-'}`,
			`📦 Repos: ${data.public_repos}`,
			`👥 Followers: ${data.followers} | Following: ${data.following}`,
			`🔗 ${data.html_url}`,
			`🖼️ ${data.avatar_url}`
		].join('\n'))
	},

	// ── GitHub Repo ──
	ghrepo: async m => {
		const { command, reply } = m
		const repo = command.text
		if (!repo || !repo.includes('/')) { await reply('Format: .ghrepo owner/repo'); return }
		const [owner, name] = repo.split('/')
		const data = await githubRepo(owner, name)
		if (data.error) { await reply(data.error); return }
		await reply([
			'📦 *GitHub Repo*',
			'',
			`📛 ${data.full_name}`,
			`📝 ${data.description || 'No description'}`,
			`⭐ ${data.stargazers_count} | 🍴 ${data.forks_count} | 👁️ ${data.watchers_count}`,
			`💻 ${data.language || 'N/A'} | 📜 ${data.license?.name || 'No license'}`,
			`🔗 ${data.html_url}`
		].join('\n'))
	},

	// ── NPM Package ──
	npm: async m => {
		const { command, reply } = m
		const pkg = command.args[0]
		if (!pkg) { await reply('Format: .npm <package>'); return }
		const data = await npmInfo(pkg)
		if (data.error) { await reply(data.error); return }
		const latest = data['dist-tags']?.latest
		const ver = data.versions?.[latest]
		await reply([
			'📦 *NPM Package*',
			'',
			`📛 ${data.name}`,
			`📝 ${data.description || 'No description'}`,
			`🏷️ Latest: v${latest}`,
			`📜 License: ${ver?.license || 'N/A'}`,
			`🔗 https://www.npmjs.com/package/${data.name}`
		].join('\n'))
	},

	// ── Wikipedia ──
	wikien: async m => {
		const { command, reply } = m
		const query = command.text
		if (!query) { await reply('Format: .wikien <query>'); return }
		const data = await wikiSearch(query, 'en')
		if (data.error) { await reply(data.error); return }
		await reply([
			'📚 *Wikipedia (EN)*',
			'',
			`📌 ${data.title}`,
			`📝 ${data.extract?.slice(0, 500) || 'No extract'}`,
			`🔗 ${data.content_urls?.desktop?.page || ''}`
		].join('\n'))
	},

	// ── Urban Dictionary ──
	urban: async m => {
		const { command, reply } = m
		const term = command.text
		if (!term) { await reply('Format: .urban <kata>'); return }
		const data = await urbanSearch(term)
		if (!data) { await reply('Tidak ditemukan di Urban Dictionary'); return }
		await reply([
			'🤙 *Urban Dictionary*',
			'',
			`📌 ${data.word}`,
			`📝 ${data.definition?.slice(0, 500)}`,
			`💡 ${data.example?.slice(0, 200) || ''}`,
			`👍 ${data.thumbs_up} | 👎 ${data.thumbs_down}`
		].join('\n'))
	},

	// ── Dictionary EN ──
	dict: async m => {
		const { command, reply } = m
		const word = command.args[0]
		if (!word) { await reply('Format: .dict <word>'); return }
		const data = await dictSearch(word)
		if (data.error) { await reply(data.error); return }
		const meanings = data.meanings?.slice(0, 2).map(m => {
			const defs = m.definitions?.slice(0, 2).map(d => `  • ${d.definition}`).join('\n')
			return `*${m.partOfSpeech}*\n${defs}`
		}).join('\n\n')
		const phonetic = data.phonetics?.find(p => p.text)?.text || ''
		await reply([
			'📕 *Dictionary*',
			'',
			`📌 ${data.word} ${phonetic}`,
			meanings || 'No definitions found'
		].join('\n'))
	},

	// ── Crypto Info ──
	cryptoinfo: async m => {
		const { command, reply } = m
		const id = command.args[0]
		if (!id) { await reply('Format: .cryptoinfo <id>\nContoh: .cryptoinfo bitcoin'); return }
		await reply('⏳ Mengambil data crypto...')
		const data = await cryptoInfo(id)
		if (data.error) { await reply(data.error); return }
		await reply([
			'₿ *Crypto Info*',
			'',
			`📛 ${data.name} (${data.symbol?.toUpperCase()})`,
			`💰 $${data.market_data?.current_price?.usd?.toLocaleString() || 'N/A'}`,
			`📊 Market Cap: $${data.market_data?.market_cap?.usd?.toLocaleString() || 'N/A'}`,
			`📈 24h: ${data.market_data?.price_change_percentage_24h?.toFixed(2) || 'N/A'}%`,
			`🏅 Rank: #${data.market_cap_rank || 'N/A'}`,
			`🔗 https://www.coingecko.com/en/coins/${data.id}`
		].join('\n'))
	},

	// ── Country Info ──
	countryinfo: async m => {
		const { command, reply, download } = m
		const name = command.text
		if (!name) { await reply('Format: .countryinfo <negara>'); return }
		const data = await countryInfo(name)
		if (data.error) { await reply(data.error); return }
		const flag = data.flags?.[0] || data.flags?.svg
		await reply([
			'🌍 *Country Info*',
			'',
			`📛 ${data.name?.common}`,
			`🏛️ Capital: ${data.capital?.join(', ') || 'N/A'}`,
			`👥 Population: ${data.population?.toLocaleString() || 'N/A'}`,
			`🗺️ Region: ${data.region} / ${data.subregion || ''}`,
			`🗣️ Languages: ${Object.values(data.languages || {}).join(', ') || 'N/A'}`,
			`💱 Currency: ${Object.values(data.currencies || {}).map(c => c.name).join(', ') || 'N/A'}`,
			`📞 Code: +${data.idd?.root?.replace('+', '') || ''}${data.idd?.suffixes?.[0] || ''}`,
			flag ? `🏳️ Flag: ${flag}` : ''
		].filter(Boolean).join('\n'))
	},

	// ── Book Search ──
	booksearch: async m => {
		const { command, reply } = m
		const query = command.text
		if (!query) { await reply('Format: .booksearch <judul/penulis>'); return }
		const data = await bookSearch(query)
		if (data.error || !data.docs?.length) { await reply('Buku tidak ditemukan'); return }
		const books = data.docs.slice(0, 5).map(b => 
			`📖 *${b.title}*\n✍️ ${b.author_name?.join(', ') || 'Unknown'} | 📅 ${b.first_publish_year || 'N/A'}`
		).join('\n\n')
		await reply(`📚 *Book Search*\n\n${books}`)
	},

	book: async m => await m.commands.booksearch(m),

	// ── TV Show Search ──
	tvshow: async m => {
		const { command, reply } = m
		const query = command.text
		if (!query) { await reply('Format: .tvshow <judul>'); return }
		const data = await tvSearch(query)
		if (data.error || !data.length) { await reply('TV show tidak ditemukan'); return }
		const show = data[0]?.show
		if (!show) { await reply('TV show tidak ditemukan'); return }
		await reply([
			'📺 *TV Show*',
			'',
			`📛 ${show.name}`,
			`📝 ${show.summary?.replace(/<[^>]*>/g, '')?.slice(0, 300) || 'No summary'}`,
			`⭐ ${show.rating?.average || 'N/A'}`,
			`📅 ${show.premiered || 'N/A'} | 🏷️ ${show.genres?.join(', ') || 'N/A'}`,
			`🔗 ${show.url || ''}`,
			show.image?.medium ? `🖼️ ${show.image.medium}` : ''
		].filter(Boolean).join('\n'))
	},

	// ── Pokemon Info ──
	pokemon: async m => {
		const { command, reply, download } = m
		const name = command.args[0]
		if (!name) { await reply('Format: .pokemon <nama/nomor>'); return }
		const data = await pokemonInfo(name.toLowerCase())
		if (data.error) { await reply(data.error); return }
		const sprite = data.sprites?.front_default
		await reply([
			'⚡ *Pokemon Info*',
			'',
			`📛 ${data.name?.toUpperCase()} (#${data.id})`,
			`🏷️ Type: ${data.types?.map(t => t.type.name).join(', ')}`,
			`📏 Height: ${(data.height / 10).toFixed(1)}m | Weight: ${(data.weight / 10).toFixed(1)}kg`,
			`⚔️ Stats:`,
			...(data.stats?.map(s => `  • ${s.stat.name}: ${s.base_stat}`) || []),
			`🎮 Abilities: ${data.abilities?.map(a => a.ability.name).join(', ')}`,
			sprite ? `🖼️ ${sprite}` : ''
		].filter(Boolean).join('\n'))
	},

	poke: async m => await m.commands.pokemon(m),

	// ── Star Wars API ──
	swapi: async m => {
		const { command, reply } = m
		const type = command.args[0]
		const id = command.args[1]
		if (!type || !id) {
			await reply('🌌 *Star Wars API*\n\nFormat: .swapi <type> <id>\nType: people, planets, starships, vehicles, species, films\nContoh: .swapi people 1')
			return
		}
		const data = await swapiInfo(type, id)
		if (data.error) { await reply(data.error); return }
		const fields = Object.entries(data).filter(([k, v]) => typeof v === 'string' && !k.endsWith('_url') && k !== 'url' && k !== 'created' && k !== 'edited').map(([k, v]) => `• ${k}: ${v}`).join('\n')
		await reply(`🌌 *Star Wars: ${type} #${id}*\n\n${fields.slice(0, 1000)}`)
	},

	// ── Deezer Search ──
	deezer: async m => {
		const { command, reply } = m
		const query = command.text
		if (!query) { await reply('Format: .deezer <lagu>'); return }
		const data = await deezerSearch(query)
		if (data.error || !data.data?.length) { await reply('Lagu tidak ditemukan'); return }
		const tracks = data.data.slice(0, 5).map(t => 
			`🎵 *${t.title}*\n🎤 ${t.artist?.name} | 💿 ${t.album?.title}\n🔗 ${t.link}`
		).join('\n\n')
		await reply(`🎶 *Deezer Search*\n\n${tracks}`)
	},

	// ── iTunes Search ──
	itunes: async m => {
		const { command, reply } = m
		const query = command.text
		if (!query) { await reply('Format: .itunes <lagu>'); return }
		const data = await itunesSearch(query)
		if (data.error || !data.results?.length) { await reply('Lagu tidak ditemukan'); return }
		const tracks = data.results.slice(0, 5).map(t =>
			`🎵 *${t.trackName}*\n🎤 ${t.artistName} | 💿 ${t.collectionName || ''}\n🔗 ${t.trackViewUrl || ''}`
		).join('\n\n')
		await reply(`🎶 *iTunes Search*\n\n${tracks}`)
	},

	// ── Hacker News ──
	hackernews: async m => {
		const data = await hnTop()
		if (data.error || !data.hits?.length) { await reply('HN gagal'); return }
		const posts = data.hits.slice(0, 10).map((h, i) =>
			`${i + 1}. ${h.title}\n   ⭐ ${h.points} | 💬 ${h.num_comments} | 🔗 ${h.url || `https://news.ycombinator.com/item?id=${h.objectID}`}`
		).join('\n\n')
		await reply(`📰 *Hacker News*\n\n${posts}`)
	},

	hn: async m => await m.commands.hackernews(m),

	// ── Rick & Morty ──
	rickmorty: async m => {
		const { command, reply } = m
		const type = command.args[0] || 'character'
		const id = command.args[1] || '1'
		try {
			const res = await fetch(`https://rickandmortyapi.com/api/${type}/${id}`)
			if (!res.ok) throw new Error('Tidak ditemukan')
			const data = await res.json()
			const fields = Object.entries(data).filter(([k, v]) => typeof v === 'string' && k !== 'url' && k !== 'created').map(([k, v]) => `• ${k}: ${v}`).join('\n')
			await reply(`🧪 *Rick & Morty: ${type} #${id}*\n\n${fields.slice(0, 800)}`)
		} catch (e) {
			await reply(e.message || 'Gagal')
		}
	},

	rm: async m => await m.commands.rickmorty(m),

	// ── Jikan (MyAnimeList) ──
	animesearch: async m => {
		const { command, reply } = m
		const query = command.text
		if (!query) { await reply('Format: .animesearch <judul>'); return }
		try {
			const res = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=3`)
			if (!res.ok) throw new Error('API gagal')
			const data = await res.json()
			if (!data.data?.length) { await reply('Anime tidak ditemukan'); return }
			const results = data.data.map(a => 
				`🎌 *${a.title}*\n⭐ ${a.score || 'N/A'} | 📺 ${a.episodes || '?'} eps | 🏷️ ${a.genres?.map(g => g.name).join(', ')}\n📝 ${a.synopsis?.slice(0, 200) || ''}...\n🔗 ${a.url}`
			).join('\n\n')
			await reply(`🎌 *Anime Search*\n\n${results}`)
		} catch (e) {
			await reply(e.message || 'Gagal')
		}
	},

	mangasearch: async m => {
		const { command, reply } = m
		const query = command.text
		if (!query) { await reply('Format: .mangasearch <judul>'); return }
		try {
			const res = await fetch(`https://api.jikan.moe/v4/manga?q=${encodeURIComponent(query)}&limit=3`)
			if (!res.ok) throw new Error('API gagal')
			const data = await res.json()
			if (!data.data?.length) { await reply('Manga tidak ditemukan'); return }
			const results = data.data.map(a =>
				`📖 *${a.title}*\n⭐ ${a.score || 'N/A'} | 📚 ${a.chapters || '?'} ch | 🏷️ ${a.genres?.map(g => g.name).join(', ')}\n🔗 ${a.url}`
			).join('\n\n')
			await reply(`📖 *Manga Search*\n\n${results}`)
		} catch (e) {
			await reply(e.message || 'Gagal')
		}
	},

	// ── Top Anime/Manga ──
	topanime: async m => {
		try {
			const res = await fetch('https://api.jikan.moe/v4/top/anime?limit=5')
			const data = await res.json()
			if (!data.data?.length) { await reply('Gagal ambil data'); return }
			const list = data.data.map((a, i) =>
				`${i + 1}. ${a.title} ⭐${a.score || 'N/A'}`
			).join('\n')
			await reply(`🎌 *Top Anime*\n\n${list}`)
		} catch {
			await reply('Gagal ambil top anime')
		}
	},

	topmanga: async m => {
		try {
			const res = await fetch('https://api.jikan.moe/v4/top/manga?limit=5')
			const data = await res.json()
			if (!data.data?.length) { await reply('Gagal ambil data'); return }
			const list = data.data.map((a, i) =>
				`${i + 1}. ${a.title} ⭐${a.score || 'N/A'}`
			).join('\n')
			await reply(`📖 *Top Manga*\n\n${list}`)
		} catch {
			await reply('Gagal ambil top manga')
		}
	},

	// ── Current Season Anime ──
	seasonnow: async m => {
		try {
			const res = await fetch('https://api.jikan.moe/v4/seasons/now?limit=10')
			const data = await res.json()
			if (!data.data?.length) { await reply('Gagal ambil data'); return }
			const list = data.data.slice(0, 10).map((a, i) =>
				`${i + 1}. ${a.title} ⭐${a.score || 'N/A'}`
			).join('\n')
			await reply(`🎌 *Anime Season Sekarang*\n\n${list}`)
		} catch {
			await reply('Gagal ambil season anime')
		}
	},

	season: async m => await m.commands.seasonnow(m),

	// ── Anime Quote ──
	animequote: async m => {
		try {
			const res = await fetch('https://animechan.io/api/v1/quotes/random')
			if (!res.ok) throw new Error('API gagal')
			const data = await res.json()
			await m.reply(`💬 *${data.quote}*\n\n— ${data.character} (${data.anime})`)
		} catch {
			await m.reply('Gagal ambil anime quote')
		}
	},

	aq: async m => await m.commands.animequote(m),

	// ── Waifu Pics ──
	waifu: async m => {
		const { command, reply, download } = m
		const category = command.args[0] || 'waifu'
		const validCats = ['waifu', 'neko', 'shinobu', 'megumin', 'awoo', 'bully', 'cuddle', 'cry', 'hug', 'kiss', 'lick', 'pat', 'smug', 'bonk', 'yeet', 'blush', 'wave', 'highfive', 'handhold', 'nom', 'bite', 'glomp', 'slap', 'kill', 'kick', 'happy', 'wink', 'poke', 'dance', 'cringe']
		if (!validCats.includes(category)) {
			await reply(`🌸 Kategori tidak valid.\n\nTersedia: ${validCats.join(', ')}`)
			return
		}
		try {
			const res = await fetch(`https://api.waifu.pics/sfw/${category}`)
			const data = await res.json()
			if (!data.url) throw new Error('Gagal')
			const buffer = await download(data.url)
			await reply({ image: buffer, caption: `🌸 ${category}` })
		} catch {
			await reply('Gagal ambil waifu image')
		}
	},

	neko: async m => {
		m.command.args = ['neko']
		await m.commands.waifu(m)
	},

	shinobu: async m => {
		m.command.args = ['shinobu']
		await m.commands.waifu(m)
	},

	megumin: async m => {
		m.command.args = ['megumin']
		await m.commands.waifu(m)
	},

	awoo: async m => {
		m.command.args = ['awoo']
		await m.commands.waifu(m)
	},

	cuddle: async m => {
		m.command.args = ['cuddle']
		await m.commands.waifu(m)
	},

	hug: async m => {
		m.command.args = ['hug']
		await m.commands.waifu(m)
	},

	kiss: async m => {
		m.command.args = ['kiss']
		await m.commands.waifu(m)
	},

	pat: async m => {
		m.command.args = ['pat']
		await m.commands.waifu(m)
	},

	// ── Animal Images ──
	catimg: async m => {
		try {
			const res = await fetch('https://api.thecatapi.com/v1/images/search')
			const data = await res.json()
			if (data[0]?.url) {
				const buffer = await m.download(data[0].url)
				await m.reply({ image: buffer, caption: '🐱 Meow!' })
			}
		} catch { await m.reply('Gagal ambil gambar kucing') }
	},

	dogimg: async m => {
		try {
			const res = await fetch('https://api.thedogapi.com/v1/images/search')
			const data = await res.json()
			if (data[0]?.url) {
				const buffer = await m.download(data[0].url)
				await m.reply({ image: buffer, caption: '🐶 Woof!' })
			}
		} catch { await m.reply('Gagal ambil gambar anjing') }
	},

	foximg: async m => {
		try {
			const res = await fetch('https://randomfox.ca/floof/')
			const data = await res.json()
			if (data.image) {
				const buffer = await m.download(data.image)
				await m.reply({ image: buffer, caption: '🦊' })
			}
		} catch { await m.reply('Gagal ambil gambar rubah') }
	},

	duckimg: async m => {
		try {
			const res = await fetch('https://random-d.uk/api/random')
			const data = await res.json()
			if (data.url) {
				const buffer = await m.download(data.url)
				await m.reply({ image: buffer, caption: '🦆' })
			}
		} catch { await m.reply('Gagal ambil gambar bebek') }
	},

	birdimg: async m => {
		try {
			const res = await fetch('https://shibe.online/api/birds?count=1')
			const data = await res.json()
			if (data[0]) {
				const buffer = await m.download(data[0])
				await m.reply({ image: buffer, caption: '🐦' })
			}
		} catch { await m.reply('Gagal ambil gambar burung') }
	},

	// ── Animal Facts ──
	catfact: async m => {
		try {
			const res = await fetch('https://meowfacts.herokuapp.com/')
			const data = await res.json()
			await m.reply(`🐱 ${data.data?.[0] || 'Fakta kucing tidak tersedia'}`)
		} catch { await m.reply('Gagal ambil fakta kucing') }
	},

	dogfact: async m => {
		try {
			const res = await fetch('https://dog-api.kinduff.com/api/facts')
			const data = await res.json()
			await m.reply(`🐶 ${data.facts?.[0] || 'Fakta anjing tidak tersedia'}`)
		} catch { await m.reply('Gagal ambil fakta anjing') }
	},

	// ── Number Trivia ──
	numtrivia: async m => {
		const num = m.command.args[0] || 'random'
		try {
			const res = await fetch(`https://numbersapi.com/${num}/trivia`)
			const text = await res.text()
			await m.reply(`🔢 ${text}`)
		} catch { await m.reply('Gagal ambil trivia') }
	},

	// ── XKCD ──
	xkcd: async m => {
		try {
			const res = await fetch('https://xkcd.com/info.0.json')
			const data = await res.json()
			await m.reply([
				'🎨 *xkcd*',
				'',
				`📌 #${data.num}: ${data.title}`,
				`📝 ${data.alt?.slice(0, 300) || ''}`,
				`🖼️ ${data.img}`
			].join('\n'))
		} catch { await m.reply('Gagal ambil xkcd') }
	},

	// ── Earthquake Info ──
	earthquake: async m => {
		try {
			const res = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson')
			const data = await res.json()
			if (!data.features?.length) { await m.reply('Tidak ada gempa signifikan 24 jam terakhir'); return }
			const quakes = data.features.slice(0, 5).map(q => {
				const p = q.properties
				const c = q.geometry.coordinates
				return `🌍 M${p.mag} | 📍 ${c[1].toFixed(2)},${c[0].toFixed(2)} | 📅 ${new Date(p.time).toLocaleString('id-ID')} | 📍 ${p.place}`
			}).join('\n')
			await m.reply(`🌍 *Gempa 24 Jam Terakhir*\n\n${quakes}`)
		} catch { await m.reply('Gagal ambil data gempa') }
	},

	gempa: async m => await m.commands.earthquake(m),

	// ── ISS Position ──
	iss: async m => {
		try {
			const res = await fetch('http://api.open-notify.org/iss-now.json')
			const data = await res.json()
			const pos = data.iss_position
			await m.reply(`🛰️ *ISS Position*\n\n📍 Lat: ${pos.latitude}\n📍 Lon: ${pos.longitude}\n📅 ${new Date(data.timestamp * 1000).toLocaleString('id-ID')}`)
		} catch { await m.reply('Gagal ambil posisi ISS') }
	},

	// ── People In Space ──
	spacepeople: async m => {
		try {
			const res = await fetch('http://api.open-notify.org/astros.json')
			const data = await res.json()
			const people = data.people.map(p => `👨‍🚀 ${p.name} (${p.craft})`).join('\n')
			await m.reply(`👨‍🚀 *Orang di Luar Angkasa* (${data.number})\n\n${people}`)
		} catch { await m.reply('Gagal ambil data') }
	},

	// ── SpaceX ──
	spacex: async m => {
		try {
			const res = await fetch('https://api.spacexdata.com/v4/launches/latest')
			const data = await res.json()
			await m.reply([
				'🚀 *SpaceX Latest Launch*',
				'',
				`📛 ${data.name}`,
				`📅 ${new Date(data.date_utc).toLocaleString('id-ID')}`,
				`✅ Success: ${data.success ? 'Ya' : 'Tidak'}`,
				`📝 ${data.details?.slice(0, 300) || 'No details'}`,
				`🔗 ${data.links?.webcast || ''}`
			].join('\n'))
		} catch { await m.reply('Gagal ambil data SpaceX') }
	},

	// ── Recipe Search ──
	recipe: async m => {
		const { command, reply } = m
		const query = command.text
		if (!query) { await reply('Format: .recipe <makanan>'); return }
		try {
			const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`)
			const data = await res.json()
			if (!data.meals?.length) { await reply('Resep tidak ditemukan'); return }
			const meal = data.meals[0]
			await reply([
				'🍳 *Recipe*',
				'',
				`📛 ${meal.strMeal}`,
				`🏷️ ${meal.strCategory} | ${meal.strArea}`,
				`📝 ${meal.strInstructions?.slice(0, 500) || ''}`,
				`🔗 ${meal.strYoutube || ''}`,
				`🖼️ ${meal.strMealThumb || ''}`
			].join('\n'))
		} catch { await reply('Gagal cari resep') }
	},

	// ── Random Meal ──
	randommeal: async m => {
		try {
			const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
			const data = await res.json()
			const meal = data.meals?.[0]
			if (!meal) { await m.reply('Gagal ambil resep'); return }
			await m.reply([
				'🍽️ *Random Meal*',
				'',
				`📛 ${meal.strMeal}`,
				`🏷️ ${meal.strCategory} | ${meal.strArea}`,
				`📝 ${meal.strInstructions?.slice(0, 400) || ''}`,
				`🖼️ ${meal.strMealThumb || ''}`
			].join('\n'))
		} catch { await m.reply('Gagal') }
	},

	// ── Cocktail Search ──
	cocktail: async m => {
		const { command, reply } = m
		const query = command.text
		if (!query) { await reply('Format: .cocktail <nama>'); return }
		try {
			const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`)
			const data = await res.json()
			if (!data.drinks?.length) { await reply('Cocktail tidak ditemukan'); return }
			const drink = data.drinks[0]
			await reply([
				'🍹 *Cocktail*',
				'',
				`📛 ${drink.strDrink}`,
				`🏷️ ${drink.strCategory} | ${drink.strAlcoholic}`,
				`📝 ${drink.strInstructions?.slice(0, 300) || ''}`,
				`🖼️ ${drink.strDrinkThumb || ''}`
			].join('\n'))
		} catch { await reply('Gagal') }
	},

	// ── Exchange Rate ──
	exrate: async m => {
		const { command, reply } = m
		const from = (command.args[0] || 'USD').toUpperCase()
		const to = (command.args[1] || 'IDR').toUpperCase()
		try {
			const res = await fetch(`https://api.frankfurter.app/latest?from=${from}&to=${to}`)
			const data = await res.json()
			const rate = data.rates?.[to]
			if (!rate) { await reply('Mata uang tidak ditemukan'); return }
			await reply(`💱 *Exchange Rate*\n\n1 ${from} = ${rate.toLocaleString()} ${to}\n📅 ${data.date}`)
		} catch { await reply('Gagal ambil kurs') }
	},

	// ── COVID Stats ──
	covid: async m => {
		try {
			const res = await fetch('https://disease.sh/v3/covid-19/all')
			const data = await res.json()
			await m.reply([
				'🦠 *COVID-19 Global*',
				'',
				`📊 Cases: ${data.cases?.toLocaleString()}`,
				`💚 Recovered: ${data.recovered?.toLocaleString()}`,
				`💀 Deaths: ${data.deaths?.toLocaleString()}`,
				`📈 Today: +${data.todayCases?.toLocaleString()}`,
				`📅 Updated: ${new Date(data.updated).toLocaleString('id-ID')}`
			].join('\n'))
		} catch { await m.reply('Gagal ambil data COVID') }
	},

	// ── Holiday Info ──
	holiday: async m => {
		try {
			const res = await fetch('https://date.nager.at/api/v3/NextPublicHolidays/ID')
			const data = await res.json()
			if (!data.length) { await m.reply('Tidak ada hari libur terdekat'); return }
			const next = data[0]
			await m.reply([
				'🎉 *Hari Libur Berikutnya*',
				'',
				`📅 ${next.date}`,
				`📛 ${next.localName}`,
				`🌐 ${next.name}`,
				`🏷️ ${next.types?.join(', ') || 'Public'}`
			].join('\n'))
		} catch { await m.reply('Gagal ambil data') }
	},

	// ── Brewery Search ──
	brewery: async m => {
		const { command, reply } = m
		const query = command.text
		if (!query) { await reply('Format: .brewery <nama/kota>'); return }
		try {
			const res = await fetch(`https://api.openbrewerydb.org/breweries/search?query=${encodeURIComponent(query)}&per_page=3`)
			const data = await res.json()
			if (!data.length) { await reply('Brewery tidak ditemukan'); return }
			const list = data.map(b => `🍺 *${b.name}*\n📍 ${b.city}, ${b.state || ''} ${b.country || ''}\n🏷️ ${b.brewery_type}\n🔗 ${b.website_url || ''}`).join('\n\n')
			await reply(`🍺 *Brewery Search*\n\n${list}`)
		} catch { await reply('Gagal') }
	},

	// ── Agify (predict age) ──
	agify: async m => {
		const { command, reply } = m
		const name = command.args[0]
		if (!name) { await reply('Format: .agify <nama>'); return }
		try {
			const res = await fetch(`https://api.agify.io?name=${encodeURIComponent(name)}`)
			const data = await res.json()
			await reply(`🎂 *Agify*\n\nNama: ${data.name}\nPrediksi umur: ${data.age || '?'} tahun\nJumlah sample: ${data.count?.toLocaleString() || '?'}`)
		} catch { await reply('Gagal') }
	},

	// ── Genderize (predict gender) ──
	genderize: async m => {
		const { command, reply } = m
		const name = command.args[0]
		if (!name) { await reply('Format: .genderize <nama>'); return }
		try {
			const res = await fetch(`https://api.genderize.io?name=${encodeURIComponent(name)}`)
			const data = await res.json()
			await reply(`⚧ *Genderize*\n\nNama: ${data.name}\nPrediksi: ${data.gender || '?'} (${data.probability ? (data.probability * 100).toFixed(1) + '%' : '?'})`)
		} catch { await reply('Gagal') }
	},

	// ── Nationalize (predict nationality) ──
	nationalize: async m => {
		const { command, reply } = m
		const name = command.args[0]
		if (!name) { await reply('Format: .nationalize <nama>'); return }
		try {
			const res = await fetch(`https://api.nationalize.io?name=${encodeURIComponent(name)}`)
			const data = await res.json()
			const countries = data.country?.map(c => `• ${c.country_id}: ${(c.probability * 100).toFixed(1)}%`).join('\n') || 'Tidak terdeteksi'
			await reply(`🏳️ *Nationalize*\n\nNama: ${data.name}\n${countries}`)
		} catch { await reply('Gagal') }
	},

	// ── Random User ──
	randomuser: async m => {
		try {
			const res = await fetch('https://randomuser.me/api/?results=1')
			const data = await res.json()
			const u = data.results?.[0]
			if (!u) { await m.reply('Gagal'); return }
			await m.reply([
				'👤 *Random User*',
				'',
				`📛 ${u.name?.title} ${u.name?.first} ${u.name?.last}`,
				`📧 ${u.email}`,
				`📱 ${u.phone}`,
				`📍 ${u.location?.city}, ${u.location?.country}`,
				`🖼️ ${u.picture?.large}`
			].join('\n'))
		} catch { await m.reply('Gagal') }
	},

	// ── IP Lookup ──
	iplookup: async m => {
		const { command, reply } = m
		const ip = command.args[0]
		if (!ip) { await reply('Format: .iplookup <ip>'); return }
		try {
			const res = await fetch(`https://ip-api.com/json/${ip}`)
			const data = await res.json()
			if (data.status !== 'success') { await reply('IP tidak ditemukan'); return }
			await reply([
				'🌐 *IP Lookup*',
				'',
				`📍 ${data.city}, ${data.regionName}, ${data.country}`,
				`🏷️ ISP: ${data.isp}`,
				`🏢 Org: ${data.org}`,
				`🕐 TZ: ${data.timezone}`,
				`📐 ${data.lat}, ${data.lon}`
			].join('\n'))
		} catch { await reply('Gagal') }
	}
}
