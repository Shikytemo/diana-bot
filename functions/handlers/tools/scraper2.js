// Scraper2 Commands — 35 additional API/scraper commands for diana-bot
// Food & Drink, Books & Literature, Fun & Quotes, Facts & Trivia,
// Science & Space, Gaming, and more — all using free public APIs

export const commands = {
	// ════════════════════════════════════════
	//  🍽️ FOOD & DRINK
	// ════════════════════════════════════════

	// ── Recipe Search (TheMealDB) ──
	recipe2: async m => {
		const { command, reply } = m
		const query = command.text
		if (!query) {
			await reply('🍳 *Resep Makanan*\n\nFormat: .recipe2 <makanan>\nContoh: .recipe2 pasta')
			return
		}
		try {
			const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`)
			if (!res.ok) throw new Error('API gagal')
			const data = await res.json()
			if (!data.meals?.length) { await reply('🍳 Resep tidak ditemukan'); return }
			const meal = data.meals[0]
			const ingredients = []
			for (let i = 1; i <= 20; i++) {
				const ing = meal[`strIngredient${i}`]
				const measure = meal[`strMeasure${i}`]
				if (ing && ing.trim()) ingredients.push(`  • ${ing}${measure ? ` — ${measure}` : ''}`)
			}
			await reply([
				'🍳 *Resep Makanan*',
				'',
				`📛 ${meal.strMeal}`,
				`🏷️ ${meal.strCategory} | ${meal.strArea}`,
				'',
				`🥘 *Bahan-bahan:*`,
				ingredients.join('\n'),
				'',
				`📝 ${meal.strInstructions?.slice(0, 600) || ''}`,
				`🔗 ${meal.strYoutube || ''}`,
				`🖼️ ${meal.strMealThumb || ''}`
			].join('\n'))
		} catch {
			await reply('🍳 Gagal mencari resep. Coba lagi nanti.')
		}
	},

	// ── Random Recipe (TheMealDB) ──
	randomrecipe: async m => {
		try {
			const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
			if (!res.ok) throw new Error('API gagal')
			const data = await res.json()
			const meal = data.meals?.[0]
			if (!meal) { await m.reply('🍳 Gagal mengambil resep acak'); return }
			const ingredients = []
			for (let i = 1; i <= 20; i++) {
				const ing = meal[`strIngredient${i}`]
				const measure = meal[`strMeasure${i}`]
				if (ing && ing.trim()) ingredients.push(`  • ${ing}${measure ? ` — ${measure}` : ''}`)
			}
			await m.reply([
				'🎲 *Resep Acak*',
				'',
				`📛 ${meal.strMeal}`,
				`🏷️ ${meal.strCategory} | ${meal.strArea}`,
				'',
				`🥘 *Bahan-bahan:*`,
				ingredients.join('\n'),
				'',
				`📝 ${meal.strInstructions?.slice(0, 500) || ''}`,
				`🔗 ${meal.strYoutube || ''}`,
				`🖼️ ${meal.strMealThumb || ''}`
			].join('\n'))
		} catch {
			await m.reply('🍳 Gagal mengambil resep acak')
		}
	},

	// ── Cocktail Search (TheCocktailDB) ──
	cocktail2: async m => {
		const { command, reply } = m
		const query = command.text
		if (!query) {
			await reply('🍹 *Cocktail Search*\n\nFormat: .cocktail2 <nama>\nContoh: .cocktail2 margarita')
			return
		}
		try {
			const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`)
			if (!res.ok) throw new Error('API gagal')
			const data = await res.json()
			if (!data.drinks?.length) { await reply('🍹 Cocktail tidak ditemukan'); return }
			const drink = data.drinks[0]
			const ingredients = []
			for (let i = 1; i <= 15; i++) {
				const ing = drink[`strIngredient${i}`]
				const measure = drink[`strMeasure${i}`]
				if (ing && ing.trim()) ingredients.push(`  • ${ing}${measure ? ` — ${measure}` : ''}`)
			}
			await reply([
				'🍹 *Cocktail*',
				'',
				`📛 ${drink.strDrink}`,
				`🏷️ ${drink.strCategory} | ${drink.strAlcoholic}`,
				`🥂 Glass: ${drink.strGlass || '-'}`,
				'',
				`🧪 *Bahan:*`,
				ingredients.join('\n'),
				'',
				`📝 ${drink.strInstructions?.slice(0, 400) || ''}`,
				`🖼️ ${drink.strDrinkThumb || ''}`
			].join('\n'))
		} catch {
			await reply('🍹 Gagal mencari cocktail')
		}
	},

	// ── Random Cocktail ──
	randomcocktail: async m => {
		try {
			const res = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
			if (!res.ok) throw new Error('API gagal')
			const data = await res.json()
			const drink = data.drinks?.[0]
			if (!drink) { await m.reply('🍹 Gagal mengambil cocktail acak'); return }
			const ingredients = []
			for (let i = 1; i <= 15; i++) {
				const ing = drink[`strIngredient${i}`]
				const measure = drink[`strMeasure${i}`]
				if (ing && ing.trim()) ingredients.push(`  • ${ing}${measure ? ` — ${measure}` : ''}`)
			}
			await m.reply([
				'🎲 *Cocktail Acak*',
				'',
				`📛 ${drink.strDrink}`,
				`🏷️ ${drink.strCategory} | ${drink.strAlcoholic}`,
				`🥂 Glass: ${drink.strGlass || '-'}`,
				'',
				`🧪 *Bahan:*`,
				ingredients.join('\n'),
				'',
				`📝 ${drink.strInstructions?.slice(0, 400) || ''}`,
				`🖼️ ${drink.strDrinkThumb || ''}`
			].join('\n'))
		} catch {
			await m.reply('🍹 Gagal mengambil cocktail acak')
		}
	},

	// ── Random Beer (Punk API) ──
	beer: async m => {
		try {
			const res = await fetch('https://api.punkapi.com/v2/beers/random')
			if (!res.ok) throw new Error('API gagal')
			const data = await res.json()
			const beer = data[0]
			if (!beer) { await m.reply('🍺 Gagal mengambil data bir'); return }
			const foodPairing = beer.food_pairing?.map(f => `  • ${f}`).join('\n') || '-'
			await m.reply([
				'🍺 *Random Beer*',
				'',
				`📛 ${beer.name}`,
				`📝 ${beer.tagline || ''}`,
				`📝 ${beer.description?.slice(0, 300) || ''}`,
				`🏷️ ABV: ${beer.abv || '?'}% | IBU: ${beer.ibu || '?'}`,
				`🎯 First Brewed: ${beer.first_brewed || '?'}`,
				`🧪 Tips: ${beer.brewers_tips || '-'}`,
				'',
				`🍽️ *Cocok dengan:*`,
				foodPairing,
				`🖼️ ${beer.image_url || ''}`
			].join('\n'))
		} catch {
			await m.reply('🍺 Gagal mengambil data bir')
		}
	},

	// ── Random Food Image (Foodish) ──
	foodimg: async m => {
		try {
			const res = await fetch('https://foodish-api.cyclic.app/')
			if (!res.ok) throw new Error('API gagal')
			const data = await res.json()
			if (!data.image) { await m.reply('🍽️ Gagal mengambil gambar makanan'); return }
			await m.reply(`🍽️ *Random Food Image*\n\n🖼️ ${data.image}`)
		} catch {
			await m.reply('🍽️ Gagal mengambil gambar makanan')
		}
	},

	// ── Random Coffee Image ──
	coffeeimg: async m => {
		try {
			const res = await fetch('https://coffee.alexflipnote.dev/random.json')
			if (!res.ok) throw new Error('API gagal')
			const data = await res.json()
			if (!data.file) { await m.reply('☕ Gagal mengambil gambar kopi'); return }
			await m.reply(`☕ *Random Coffee*\n\n🖼️ ${data.file}`)
		} catch {
			await m.reply('☕ Gagal mengambil gambar kopi')
		}
	},

	// ── Nutrition Info (CalorieNinjas) ──
	nutrition: async m => {
		const { command, reply } = m
		const query = command.text
		if (!query) {
			await reply('🥗 *Info Nutrisi*\n\nFormat: .nutrition <makanan>\nContoh: .nutrition 1 cup rice')
			return
		}
		try {
			const res = await fetch(`https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(query)}`)
			if (!res.ok) throw new Error('API gagal')
			const data = await res.json()
			if (!data.items?.length) { await reply('🥗 Data nutrisi tidak ditemukan'); return }
			const item = data.items[0]
			await reply([
				'🥗 *Info Nutrisi*',
				'',
				`📛 ${item.name}`,
				`⚖️ Porsi: ${item.serving_size_g || '?'}g`,
				`🔥 Kalori: ${item.calories || '?'} kcal`,
				`🥩 Protein: ${item.protein_g || '?'}g`,
				`🧈 Lemak: ${item.fat_total_g || '?'}g (Jenuh: ${item.fat_saturated_g || '?'}g)`,
				`🍞 Karbo: ${item.carbohydrates_total_g || '?'}g`,
				`🍬 Gula: ${item.sugar_g || '?'}g`,
				`🧂 Sodium: ${item.sodium_mg || '?'}mg`,
				`🌾 Serat: ${item.fiber_g || '?'}g`,
				`🥔 Kalium: ${item.potassium_mg || '?'}mg`
			].join('\n'))
		} catch {
			await reply('🥗 Gagal mengambil info nutrisi')
		}
	},

	// ════════════════════════════════════════
	//  📚 BOOKS & LITERATURE
	// ════════════════════════════════════════

	// ── Open Library Search ──
	openlibrary: async m => {
		const { command, reply } = m
		const query = command.text
		if (!query) {
			await reply('📚 *Open Library*\n\nFormat: .openlibrary <judul/penulis>\nContoh: .openlibrary harry potter')
			return
		}
		try {
			const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=5`)
			if (!res.ok) throw new Error('API gagal')
			const data = await res.json()
			if (!data.docs?.length) { await reply('📚 Buku tidak ditemukan'); return }
			const books = data.docs.slice(0, 5).map(b => {
				const coverUrl = b.cover_i ? `https://covers.openlibrary.org/b/id/${b.cover_i}-M.jpg` : ''
				return [
					`📖 *${b.title}*`,
					`✍️ ${b.author_name?.join(', ') || 'Unknown'}`,
					`📅 ${b.first_publish_year || 'N/A'} | 📚 ${b.edition_count || '?'} edisi`,
					`🏷️ ${b.subject?.slice(0, 3).join(', ') || '-'}`,
					coverUrl ? `🖼️ ${coverUrl}` : '',
					`🔗 https://openlibrary.org${b.key}`
				].filter(Boolean).join('\n')
			}).join('\n\n')
			await reply(`📚 *Open Library*\n\n${books}`)
		} catch {
			await reply('📚 Gagal mencari buku')
		}
	},

	// ── Random Book ──
	randombook: async m => {
		try {
			const res = await fetch('https://openlibrary.org/random.json')
			if (!res.ok) throw new Error('API gagal')
			const data = await res.json()
			const title = data.title || 'Unknown'
			const authors = data.authors?.map(a => a.name || a).join(', ') || 'Unknown'
			const coverUrl = data.covers?.[0] ? `https://covers.openlibrary.org/b/id/${data.covers[0]}-M.jpg` : ''
			const subjects = data.subjects?.slice(0, 5).join(', ') || '-'
			const desc = data.description?.value || data.description || ''
			await m.reply([
				'🎲 *Buku Acak*',
				'',
				`📖 ${title}`,
				`✍️ ${authors}`,
				`🏷️ ${subjects}`,
				`📝 ${typeof desc === 'string' ? desc.slice(0, 400) : ''}`,
				coverUrl ? `🖼️ ${coverUrl}` : '',
				`🔗 https://openlibrary.org${data.key || ''}`
			].filter(Boolean).join('\n'))
		} catch {
			await m.reply('📚 Gagal mengambil buku acak')
		}
	},

	// ── Project Gutenberg (Free Ebooks) ──
	gutenberg: async m => {
		const { command, reply } = m
		const query = command.text
		if (!query) {
			await reply('📖 *Project Gutenberg*\n\nFormat: .gutenberg <judul/penulis>\nContoh: .gutenberg sherlock holmes')
			return
		}
		try {
			const res = await fetch(`https://gutendex.com/books?search=${encodeURIComponent(query)}`)
			if (!res.ok) throw new Error('API gagal')
			const data = await res.json()
			if (!data.results?.length) { await reply('📖 Ebook tidak ditemukan'); return }
			const books = data.results.slice(0, 5).map(b => {
				const formats = b.formats || {}
				const htmlUrl = formats['text/html'] || formats['text/plain'] || ''
				return [
					`📕 *${b.title}*`,
					`✍️ ${b.authors?.map(a => a.name).join(', ') || 'Unknown'}`,
					`🌐 ${b.languages?.join(', ') || '?'} | 📚 ${b.download_count?.toLocaleString() || '?'} downloads`,
					htmlUrl ? `🔗 ${htmlUrl}` : ''
				].filter(Boolean).join('\n')
			}).join('\n\n')
			await reply(`📖 *Project Gutenberg*\n\n${books}`)
		} catch {
			await reply('📖 Gagal mencari ebook')
		}
	},

	// ── Random Poem (PoetryDB) ──
	poetry: async m => {
		try {
			const res = await fetch('https://poetrydb.org/random')
			if (!res.ok) throw new Error('API gagal')
			const data = await res.json()
			if (!data?.[0]) { await m.reply('📜 Gagal mengambil puisi'); return }
			const poem = data[0]
			const lines = poem.lines?.slice(0, 20).join('\n') || ''
			await m.reply([
				'📜 *Puisi Acak*',
				'',
				`📌 ${poem.title}`,
				`✍️ ${poem.author}`,
				'',
				lines,
				poem.lines?.length > 20 ? '\n... (dipotong)' : ''
			].join('\n'))
		} catch {
			await m.reply('📜 Gagal mengambil puisi')
		}
	},

	// ════════════════════════════════════════
	//  💬 FUN & QUOTES
	// ════════════════════════════════════════

	// ── Random Quote (Quotable) ──
	quote2: async m => {
		try {
			const res = await fetch('https://api.quotable.io/random')
			if (!res.ok) throw new Error('API gagal')
			const data = await res.json()
			await m.reply([
				'💬 *Kutipan Acak*',
				'',
				`"${data.content}"`,
				``,
				`— ${data.author || 'Unknown'}`,
				`🏷️ ${data.tags?.join(', ') || ''}`
			].join('\n'))
		} catch {
			await m.reply('💬 Gagal mengambil kutipan')
		}
	},

	// ── Random Advice (AdviceSlip) ──
	advice: async m => {
		try {
			const res = await fetch('https://api.adviceslip.com/advice')
			if (!res.ok) throw new Error('API gagal')
			const data = await res.json()
			await m.reply(`💡 *Saran Acak*\n\n"${data.slip?.advice || 'Tidak tersedia'}"`)
		} catch {
			await m.reply('💡 Gagal mengambil saran')
		}
	},

	// ── Positive Affirmation ──
	affirmation: async m => {
		try {
			const res = await fetch('https://www.affirmations.dev/', {
				headers: { 'User-Agent': 'Mozilla/5.0' }
			})
			if (!res.ok) throw new Error('API gagal')
			const data = await res.json()
			await m.reply(`✨ *Afirmasi Positif*\n\n"${data.affirmation || 'Kamu luar biasa!'}"`)
		} catch {
			await m.reply('✨ Gagal mengambil afirmasi')
		}
	},

	// ── Bored — Random Activity ──
	bored: async m => {
		try {
			const res = await fetch('https://bored-api.appbrewery.dev/random')
			if (!res.ok) throw new Error('API gagal')
			const data = await res.json()
			await m.reply([
				'🎯 *Aktivitas Acak*',
				'',
				`📛 ${data.activity || 'Tidak tersedia'}`,
				`🏷️ Tipe: ${data.type || '?'}`,
				`👥 Peserta: ${data.participants || '?'}`,
				`💰 Biaya: ${data.price !== undefined ? (data.price === 0 ? 'Gratis' : `$${data.price}`) : '?'}`,
				data.link ? `🔗 ${data.link}` : ''
			].filter(Boolean).join('\n'))
		} catch {
			await m.reply('🎯 Gagal mengambil aktivitas')
		}
	},

	// ── Trivia (Open Trivia DB) ──
	trivia2: async m => {
		try {
			const res = await fetch('https://opentdb.com/api.php?amount=1&type=multiple')
			if (!res.ok) throw new Error('API gagal')
			const data = await res.json()
			const q = data.results?.[0]
			if (!q) { await m.reply('❓ Gagal mengambil trivia'); return }
			const decoded = str => str ? str.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>') : ''
			const options = [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5)
			const optionList = options.map((o, i) => `  ${String.fromCharCode(65 + i)}. ${decoded(o)}`).join('\n')
			await m.reply([
				'❓ *Trivia Acak*',
				'',
				`📌 ${decoded(q.question)}`,
				`🏷️ ${q.category} | ${q.difficulty}`,
				'',
				optionList,
				'',
				`💡 Jawaban: ${decoded(q.correct_answer)}`
			].join('\n'))
		} catch {
			await m.reply('❓ Gagal mengambil trivia')
		}
	},

	// ── Random xkcd Comic ──
	xkcdrandom: async m => {
		const { command, reply } = m
		const num = command.args?.[0]
		try {
			let url = 'https://xkcd.com/info.0.json'
			if (num && !isNaN(num)) {
				url = `https://xkcd.com/${num}/info.0.json`
			} else {
				// Get latest then pick random
				const latestRes = await fetch('https://xkcd.com/info.0.json')
				if (!latestRes.ok) throw new Error('API gagal')
				const latest = await latestRes.json()
				const randomNum = Math.floor(Math.random() * latest.num) + 1
				url = `https://xkcd.com/${randomNum}/info.0.json`
			}
			const res = await fetch(url)
			if (!res.ok) throw new Error('Komik tidak ditemukan')
			const data = await res.json()
			await reply([
				'🎨 *xkcd Comic*',
				'',
				`📌 #${data.num}: ${data.title}`,
				`📅 ${data.year}-${data.month}-${data.day}`,
				`📝 ${data.alt?.slice(0, 400) || ''}`,
				`🖼️ ${data.img}`
			].join('\n'))
		} catch {
			await reply('🎨 Gagal mengambil komik xkcd')
		}
	},

	// ── Random Joke (JokeAPI) ──
	joke2: async m => {
		try {
			const res = await fetch('https://v2.jokeapi.dev/joke/Any?safe-mode')
			if (!res.ok) throw new Error('API gagal')
			const data = await res.json()
			if (data.error) { await m.reply('😂 Gagal mengambil lelucon'); return }
			if (data.type === 'twopart') {
				await m.reply([
					'😂 *Lelucon Acak*',
					'',
					`📌 ${data.setup}`,
					``,
					`👉 ${data.delivery}`
				].join('\n'))
			} else {
				await m.reply(`😂 *Lelucon Acak*\n\n${data.joke}`)
			}
		} catch {
			await m.reply('😂 Gagal mengambil lelucon')
		}
	},

	// ── Dad Joke (icanhazdadjoke) ──
	dadjoke2: async m => {
		try {
			const res = await fetch('https://icanhazdadjoke.com/', {
				headers: { 'Accept': 'application/json' }
			})
			if (!res.ok) throw new Error('API gagal')
			const data = await res.json()
			await m.reply(`👨 *Dad Joke*\n\n${data.joke || 'Tidak tersedia'}`)
		} catch {
			await m.reply('👨 Gagal mengambil dad joke')
		}
	},

	// ── Chuck Norris Joke ──
	chuck: async m => {
		try {
			const res = await fetch('https://api.chucknorris.io/jokes/random')
			if (!res.ok) throw new Error('API gagal')
			const data = await res.json()
			await m.reply([
				'👊 *Chuck Norris Fact*',
				'',
				`${data.value || 'Tidak tersedia'}`,
				``,
				`🔗 ${data.url || ''}`
			].join('\n'))
		} catch {
			await m.reply('👊 Gagal mengambil Chuck Norris joke')
		}
	},

	// ════════════════════════════════════════
	//  🧠 FACTS & TRIVIA
	// ════════════════════════════════════════

	// ── Random Useless Fact ──
	uselessfact: async m => {
		try {
			const res = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random', {
				headers: { 'User-Agent': 'Mozilla/5.0' }
			})
			if (!res.ok) throw new Error('API gagal')
			const data = await res.json()
			await m.reply([
				'🤓 *Fakta Tak Berguna*',
				'',
				`${data.text || 'Tidak tersedia'}`,
				``,
				`🔗 ${data.source_url || ''}`
			].join('\n'))
		} catch {
			await m.reply('🤓 Gagal mengambil fakta')
		}
	},

	// ── Number Fact (Numbers API) ──
	numberfact: async m => {
		const { command, reply } = m
		const num = command.args?.[0] || 'random'
		try {
			const res = await fetch(`http://numbersapi.com/${num}/trivia`)
			if (!res.ok) throw new Error('API gagal')
			const text = await res.text()
			await reply(`🔢 *Fakta Angka*\n\n${text}`)
		} catch {
			await reply('🔢 Gagal mengambil fakta angka')
		}
	},

	// ── Date Fact (Numbers API) ──
	datefact: async m => {
		const { command, reply } = m
		const input = command.text
		try {
			let url = 'http://numbersapi.com/random/date'
			if (input) {
				const parts = input.split('/')
				if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
					url = `http://numbersapi.com/${parts[0]}/${parts[1]}/date`
				}
			}
			const res = await fetch(url)
			if (!res.ok) throw new Error('API gagal')
			const text = await res.text()
			await reply(`📅 *Fakta Tanggal*\n\n${text}`)
		} catch {
			await reply('📅 Gagal mengambil fakta tanggal')
		}
	},

	// ── Year Fact (Numbers API) ──
	yearfact: async m => {
		const { command, reply } = m
		const year = command.args?.[0] || 'random'
		try {
			const res = await fetch(`http://numbersapi.com/${year}/year`)
			if (!res.ok) throw new Error('API gagal')
			const text = await res.text()
			await reply(`📆 *Fakta Tahun*\n\n${text}`)
		} catch {
			await reply('📆 Gagal mengambil fakta tahun')
		}
	},

	// ── On This Day (Wikipedia) ──
	onthisday: async m => {
		const { command, reply } = m
		const input = command.text
		try {
			let path = ''
			if (input) {
				const parts = input.split('/')
				if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
					path = `${parts[0]}/${parts[1]}`
				} else {
					await reply('📅 *On This Day*\n\nFormat: .onthisday <bulan/hari>\nContoh: .onthisday 2/14\nKosongkan untuk hari ini')
					return
				}
			} else {
				const now = new Date()
				path = `${now.getMonth() + 1}/${now.getDate()}`
			}
			const res = await fetch(`https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/${path}`, {
				headers: { 'User-Agent': 'Mozilla/5.' }
			})
			if (!res.ok) throw new Error('API gagal')
			const data = await res.json()
			const events = data.events?.slice(0, 5).map(e =>
				`📌 ${e.year || '?'} — ${e.text?.slice(0, 200) || ''}`
			).join('\n\n') || 'Tidak ada event'
			const births = data.births?.slice(0, 3).map(b =>
				`🎂 ${b.year || '?'} — ${b.text?.slice(0, 100) || ''}`
			).join('\n') || ''
			await reply([
				`📅 *On This Day (${path})*`,
				'',
				'📜 *Peristiwa:*',
				events,
				births ? `\n🎂 *Kelahiran:*\n${births}` : ''
			].join('\n'))
		} catch {
			await reply('📅 Gagal mengambil data hari ini')
		}
	},

	// ════════════════════════════════════════
	//  🔬 SCIENCE & SPACE
	// ════════════════════════════════════════

	// ── Sunrise/Sunset Times ──
	sunrise: async m => {
		const { command, reply } = m
		const lat = command.args?.[0]
		const lng = command.args?.[1]
		try {
			let url = 'https://api.sunrise-sunset.org/json?lat=-6.2&lng=106.8' // Default: Jakarta
			if (lat && lng && !isNaN(lat) && !isNaN(lng)) {
				url = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}`
			} else if (lat) {
				await reply('🌅 *Sunrise/Sunset*\n\nFormat: .sunrise <lat> <lng>\nContoh: .sunrise -6.2 106.8\nKosongkan untuk Jakarta')
				return
			}
			const res = await fetch(url)
			if (!res.ok) throw new Error('API gagal')
			const data = await res.json()
			const r = data.results
			if (!r) { await reply('🌅 Gagal mengambil data'); return }
			await reply([
				'🌅 *Sunrise & Sunset*',
				'',
				`📍 Lat: ${lat || '-6.2'} | Lng: ${lng || '106.8'}`,
				`🌅 Sunrise: ${r.sunrise || '?'}`,
				`🌇 Sunset: ${r.sunset || '?'}`,
				`🕐 Solar Noon: ${r.solar_noon || '?'}`,
				`⏱️ Day Length: ${r.day_length || '?'}`,
				`🌅 Civil Twilight: ${r.civil_twilight_begin || '?'} — ${r.civil_twilight_end || '?'}`,
				`🌑 Nautical Twilight: ${r.nautical_twilight_begin || '?'} — ${r.nautical_twilight_end || '?'}`
			].join('\n'))
		} catch {
			await reply('🌅 Gagal mengambil data sunrise/sunset')
		}
	},

	// ── Air Quality ──
	airquality: async m => {
		const { command, reply } = m
		const city = command.args?.[0]
		if (!city) {
			await reply('🌬️ *Kualitas Udara*\n\nFormat: .airquality <kota>\nContoh: .airquality jakarta')
			return
		}
		try {
			const res = await fetch(`https://api.waqi.info/feed/${encodeURIComponent(city)}/?token=demo`)
			if (!res.ok) throw new Error('API gagal')
			const data = await res.json()
			if (data.status !== 'ok' || !data.data) { await reply('🌬️ Data kualitas udara tidak ditemukan'); return }
			const d = data.data
			const aqi = d.aqi || '?'
			let level = 'Tidak diketahui'
			if (aqi <= 50) level = '🟢 Baik'
			else if (aqi <= 100) level = '🟡 Sedang'
			else if (aqi <= 150) level = '🟠 Tidak Sehat (Sensitif)'
			else if (aqi <= 200) level = '🔴 Tidak Sehat'
			else if (aqi <= 300) level = '🟣 Sangat Tidak Sehat'
			else level = '🟤 Berbahaya'
			const iaqi = d.iaqi || {}
			const details = [
				`🌡️ PM2.5: ${iaqi.pm25?.v ?? '?'}`,
				`💨 PM10: ${iaqi.pm10?.v ?? '?'}`,
				`🌬️ O3: ${iaqi.o3?.v ?? '?'}`,
				`💨 NO2: ${iaqi.no2?.v ?? '?'}`,
				`💨 SO2: ${iaqi.so2?.v ?? '?'}`,
				`💨 CO: ${iaqi.co?.v ?? '?'}`
			].join('\n')
			await reply([
				'🌬️ *Kualitas Udara*',
				'',
				`📍 ${d.city?.name || city}`,
				`📊 AQI: ${aqi} — ${level}`,
				`📅 ${d.time?.s || ''}`,
				'',
				details
			].join('\n'))
		} catch {
			await reply('🌬️ Gagal mengambil data kualitas udara')
		}
	},

	// ── Periodic Table Element ──
	periodic: async m => {
		const { command, reply } = m
		const element = command.args?.[0]
		if (!element) {
			await reply('⚛️ *Tabel Periodik*\n\nFormat: .periodic <elemen>\nContoh: .periodic oxygen\nContoh: .periodic Au')
			return
		}
		try {
			// Try by name first, then by symbol
			let res = await fetch(`https://api.periodic-table.dev/element/${encodeURIComponent(element)}`)
			if (!res.ok) {
				// Try searching all elements
				res = await fetch('https://api.periodic-table.dev/elements')
				if (!res.ok) throw new Error('API gagal')
				const all = await res.json()
				const found = all.find(e =>
					e.name?.toLowerCase() === element.toLowerCase() ||
					e.symbol?.toLowerCase() === element.toLowerCase()
				)
				if (!found) { await reply('⚛️ Elemen tidak ditemukan'); return }
				await reply(formatElement(found))
				return
			}
			const data = await res.json()
			if (Array.isArray(data) && data.length) {
				await reply(formatElement(data[0]))
			} else if (data.name) {
				await reply(formatElement(data))
			} else {
				await reply('⚛️ Elemen tidak ditemukan')
			}
		} catch {
			await reply('⚛️ Gagal mengambil data elemen')
		}
	},

	// ── Planet Info (Solar System) ──
	planet: async m => {
		const { command, reply } = m
		const name = command.text
		if (!name) {
			await reply('🪐 *Planet Info*\n\nFormat: .planet <nama>\nContoh: .planet earth\nTersedia: mercury, venus, earth, mars, jupiter, saturn, uranus, neptune, pluto')
			return
		}
		try {
			const res = await fetch(`https://api.le-systeme-solaire.net/rest/bodies/${encodeURIComponent(name)}`)
			if (!res.ok) throw new Error('API gagal')
			const data = await res.json()
			if (!data.englishName) { await reply('🪐 Planet/tubuh tidak ditemukan'); return }
			const moons = data.moons?.map(m => m.moon).join(', ') || 'Tidak ada'
			await reply([
				'🪐 *Planet Info*',
				'',
				`📛 ${data.englishName} (${data.name || ''})`,
				`🏷️ Tipe: ${data.bodyType || '?'}`,
				`⚖️ Massa: ${data.mass?.massValue ? `${data.mass.massValue.toExponential(2)} × 10^${data.mass.massExponent} kg` : '?'}`,
				`📏 Radius: ${data.meanRadius ? `${data.meanRadius.toLocaleString()} km` : '?'}`,
				`🔄 Periode Orbit: ${data.sideralOrbit ? `${data.sideralOrbit.toFixed(1)} hari` : '?'}`,
				`🌀 Periode Rotasi: ${data.sideralRotation ? `${data.sideralRotation.toFixed(1)} jam` : '?'}`,
				`☀️ Gravitasi: ${data.gravity ? `${data.gravity} m/s²` : '?'}`,
				`🌡️ Suhu Rata-rata: ${data.avgTemp ? `${data.avgTemp} K (${(data.avgTemp - 273.15).toFixed(1)}°C)` : '?'}`,
				`🌙 Bulan: ${moons}`,
				`🌌 Jarak ke Matahari: ${data.semimajorAxis ? `${data.semimajorAxis.toLocaleString()} km` : '?'}`
			].join('\n'))
		} catch {
			await reply('🪐 Gagal mengambil data planet')
		}
	},

	// ── ISS Position (Where The ISS At) ──
	satellite: async m => {
		try {
			const res = await fetch('https://api.wheretheiss.at/v1/satellites/25544')
			if (!res.ok) throw new Error('API gagal')
			const data = await res.json()
			await m.reply([
				'🛰️ *Posisi ISS*',
				'',
				`📍 Latitude: ${data.latitude?.toFixed(4) || '?'}`,
				`📍 Longitude: ${data.longitude?.toFixed(4) || '?'}`,
				`📏 Altitude: ${data.altitude?.toFixed(2) || '?'} km`,
				`💨 Kecepatan: ${data.velocity?.toFixed(2) || '?'} km/h`,
				`🕐 Timestamp: ${data.timestamp ? new Date(data.timestamp * 1000).toLocaleString('id-ID') : '?'}`,
				`🔭 Visibility: ${data.visibility || '?'}`,
				`🔢 Norad ID: ${data.id || '25544'}`
			].join('\n'))
		} catch {
			await m.reply('🛰️ Gagal mengambil posisi satelit')
		}
	},

	// ── Aurora Forecast ──
	aurora: async m => {
		try {
			const res = await fetch('https://api.auroras.live/v1/?type=probability', {
				headers: { 'User-Agent': 'Mozilla/5.0' }
			})
			if (!res.ok) throw new Error('API gagal')
			const data = await res.json()
			const formatted = Object.entries(data).map(([key, val]) => {
				if (typeof val === 'object' && val !== null) {
					const inner = Object.entries(val).map(([k, v]) => `  • ${k}: ${v}`).join('\n')
					return `📌 ${key}:\n${inner}`
				}
				return `📌 ${key}: ${val}`
			}).join('\n\n')
			await m.reply([
				'🌌 *Aurora Forecast*',
				'',
				formatted || 'Data tidak tersedia',
				'',
				'🔗 https://auroras.live'
			].join('\n'))
		} catch {
			await m.reply('🌌 Gagal mengambil aurora forecast')
		}
	},

	// ════════════════════════════════════════
	//  🎮 GAMING
	// ════════════════════════════════════════

	// ── Speedrun Game Data ──
	speedrun: async m => {
		const { command, reply } = m
		const query = command.text
		if (!query) {
			await reply('🎮 *Speedrun*\n\nFormat: .speedrun <game>\nContoh: .speedrun mario')
			return
		}
		try {
			const res = await fetch(`https://www.speedrun.com/api/v1/games?name=${encodeURIComponent(query)}&max=3`)
			if (!res.ok) throw new Error('API gagal')
			const data = await res.json()
			if (!data.data?.length) { await reply('🎮 Game tidak ditemukan'); return }
			const games = data.data.map(g => {
				const categories = g.categories?.data?.map(c => c.name).join(', ') || '-'
				return [
					`🎮 *${g.names?.international || g.name || 'Unknown'}*`,
					`📝 ${g.summary?.slice(0, 200) || 'No summary'}`,
					`🏷️ Kategori: ${categories}`,
					`📅 Rilis: ${g.releaseDate || '?'}`,
					`🔗 ${g.weblink || ''}`
				].join('\n')
			}).join('\n\n')
			await reply(`🎮 *Speedrun Search*\n\n${games}`)
		} catch {
			await reply('🎮 Gagal mencari data speedrun')
		}
	},

	// ── Steam Game Search ──
	steam: async m => {
		const { command, reply } = m
		const query = command.text
		if (!query) {
			await reply('🎮 *Steam Search*\n\nFormat: .steam <game>\nContoh: .steam portal')
			return
		}
		try {
			const res = await fetch(`https://store.steampowered.com/api/storesearch/?term=${encodeURIComponent(query)}&l=english&cc=us`)
			if (!res.ok) throw new Error('API gagal')
			const data = await res.json()
			if (!data.items?.length) { await reply('🎮 Game tidak ditemukan di Steam'); return }
			const games = data.items.slice(0, 5).map(g => {
				const price = g.price
					? (g.price.final === 0 ? '🆓 Gratis' : `$${(g.price.final / 100).toFixed(2)}`)
					: '💰 Harga tidak tersedia'
				return [
					`🎮 *${g.name}*`,
					`🆔 App ID: ${g.id}`,
					`${price}`,
					`🔗 https://store.steampowered.com/app/${g.id}`
				].join('\n')
			}).join('\n\n')
			await reply(`🎮 *Steam Search*\n\n${games}`)
		} catch {
			await reply('🎮 Gagal mencari game di Steam')
		}
	},

	// ── Game Deals (CheapShark) ──
	gamedeal: async m => {
		const { command, reply } = m
		const maxPrice = command.args?.[0] || '15'
		try {
			const res = await fetch(`https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=${maxPrice}&pageSize=5`)
			if (!res.ok) throw new Error('API gagal')
			const data = await res.json()
			if (!data.length) { await reply('🏷️ Tidak ada deal ditemukan'); return }
			const deals = data.slice(0, 5).map(d => {
				const savings = d.savings ? `${parseFloat(d.savings).toFixed(0)}%` : '0%'
				const price = d.salePrice ? `$${d.salePrice}` : '?'
				const normal = d.normalPrice ? `$${d.normalPrice}` : '?'
				const rating = d.steamRatingPercent ? `⭐ ${d.steamRatingPercent}%` : ''
				return [
					`🏷️ *${d.title}*`,
					`💰 ${price} (Normal: ${normal}) | Diskon: ${savings}`,
					rating,
					`🔗 https://store.steampowered.com/app/${d.steamAppID || ''}`
				].filter(Boolean).join('\n')
			}).join('\n\n')
			await reply(`🏷️ *Game Deals (≤$${maxPrice})*\n\n${deals}`)
		} catch {
			await reply('🏷️ Gagal mengambil game deals')
		}
	}
}

// ── Helper: Format Periodic Table Element ──
function formatElement(e) {
	return [
		'⚛️ *Tabel Periodik*',
		'',
		`📛 ${e.name} (${e.symbol})`,
		`🔢 Nomor Atom: ${e.atomicNumber || '?'}`,
		`⚖️ Massa Atom: ${e.atomicMass || '?'}`,
		`🏷️ Golongan: ${e.group || '?'} | Periode: ${e.period || '?'}`,
		`🧪 Fase: ${e.phase || '?'}`,
		`💰 Density: ${e.density || '?'} g/cm³`,
		`🌡️ Titik Didih: ${e.boilingPoint || '?'} K`,
		`❄️ Titik Leleh: ${e.meltingPoint || '?'} K`,
		`⚡ Elektronegativitas: ${e.electronegativity || '?'}`,
		`🔗 Konfigurasi: ${e.electronConfiguration || '?'}`,
		`📝 ${e.summary?.slice(0, 300) || ''}`,
		e.source ? `🔗 ${e.source}` : '',
		e.image ? `🖼️ ${e.image.url || e.image}` : ''
	].filter(Boolean).join('\n')
}
