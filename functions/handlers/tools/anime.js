// 🎌 ANIME Commands

const BASE = 'https://api.siputzx.my.id'

async function fetchApi(url, method, body) {
	const opts = { headers: { 'Content-Type': 'application/json' } }
	if (method === 'POST') {
		opts.method = 'POST'
		opts.body = JSON.stringify(body)
	}
	const r = await fetch(url, opts)
	if (!r.ok) throw new Error(`HTTP ${r.status}`)
	const ct = r.headers.get('content-type') || ''
	if (ct.includes('image')) return { type: 'image', url }
	if (ct.includes('json')) {
		const j = await r.json()
		if (j.status === false || j.error) throw new Error(j.error || 'API error')
		return { type: 'json', data: j.data || j.result || j }
	}
	return { type: 'text', text: await r.text() }
}

function fmt(data) {
	if (typeof data === 'string') return data
	if (Array.isArray(data)) return data.slice(0,10).map((x,i) => typeof x==='object'? Object.entries(x).slice(0,3).map(([k,v])=>k+': '+v).join(', '): i+1+'. '+x).join('\n')
	if (typeof data === 'object' && data !== null) return Object.entries(data).filter(([k,v])=>v!=null&&typeof v!=='object').slice(0,25).map(([k,v])=>'*'+k+':* '+v).join('\n')
	return String(data)
}

export const commands = {
	animequotes: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🎌 *quoted anime*\n\n❌ Butuh: query\nContoh: .animequotes fate')
		await m.reply('🎌 Loading...')
		try {
			let url = BASE + '/api/s/animequotes'
			
			// GET
			const q = new URLSearchParams()
			q.set('query', inp)
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				body['query'] = inp
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎌 *quoted anime*' })
			} else {
				await m.reply('🎌 *quoted anime*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['query'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎌 *quoted anime*' })
				} else {
					await m.reply('🎌 *quoted anime*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	auratail-search: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🎌 *auratail search*\n\n❌ Butuh: query\nContoh: .auratail-search war')
		await m.reply('🎌 Loading...')
		try {
			let url = BASE + '/api/anime/auratail-search'
			
			// GET
			const q = new URLSearchParams()
			q.set('query', inp)
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				body['query'] = inp
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎌 *auratail search*' })
			} else {
				await m.reply('🎌 *auratail search*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['query'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎌 *auratail search*' })
				} else {
					await m.reply('🎌 *auratail search*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	auratail-latest: async m => {
		const inp = m.command.args?.join(' ') || ''
		
		await m.reply('🎌 Loading...')
		try {
			let url = BASE + '/api/anime/auratail-latest'
			
			// GET
			const q = new URLSearchParams()
			
			const p = inp.split(/[,|]/).map(s => s.trim())
			
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎌 *auratail latest*' })
			} else {
				await m.reply('🎌 *auratail latest*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎌 *auratail latest*' })
				} else {
					await m.reply('🎌 *auratail latest*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	auratail-schedule: async m => {
		const inp = m.command.args?.join(' ') || ''
		
		await m.reply('🎌 Loading...')
		try {
			let url = BASE + '/api/anime/auratail-schedule'
			
			// GET
			const q = new URLSearchParams()
			
			const p = inp.split(/[,|]/).map(s => s.trim())
			
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎌 *auratail schedule*' })
			} else {
				await m.reply('🎌 *auratail schedule*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎌 *auratail schedule*' })
				} else {
					await m.reply('🎌 *auratail schedule*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	auratail-detail: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🎌 *auratail detail*\n\n❌ Butuh: url\nContoh: .auratail-detail https://auratail.vip/the-war-of-cards/')
		await m.reply('🎌 Loading...')
		try {
			let url = BASE + '/api/anime/auratail-detail'
			
			// GET
			const q = new URLSearchParams()
			q.set('url', inp)
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				body['url'] = inp
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎌 *auratail detail*' })
			} else {
				await m.reply('🎌 *auratail detail*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['url'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎌 *auratail detail*' })
				} else {
					await m.reply('🎌 *auratail detail*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	otakudesuongoing: async m => {
		const inp = m.command.args?.join(' ') || ''
		
		await m.reply('🎌 Loading...')
		try {
			let url = BASE + '/api/anime/otakudesu/ongoing'
			
			// GET
			const q = new URLSearchParams()
			
			const p = inp.split(/[,|]/).map(s => s.trim())
			
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎌 *otakudesu ongoing*' })
			} else {
				await m.reply('🎌 *otakudesu ongoing*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎌 *otakudesu ongoing*' })
				} else {
					await m.reply('🎌 *otakudesu ongoing*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	otakusearch: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🎌 *otakudesu search*\n\n❌ Butuh: s\nContoh: .otakusearch naruto')
		await m.reply('🎌 Loading...')
		try {
			let url = BASE + '/api/anime/otakudesu/search'
			
			// GET
			const q = new URLSearchParams()
			q.set('s', inp)
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				body['s'] = inp
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎌 *otakudesu search*' })
			} else {
				await m.reply('🎌 *otakudesu search*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['s'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎌 *otakudesu search*' })
				} else {
					await m.reply('🎌 *otakudesu search*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	otakudesudownload: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🎌 *otakudesu download*\n\n❌ Butuh: url\nContoh: .otakudesudownload https://otakudesu.cloud/lengkap/btr-nng-sub-indo-part-1/')
		await m.reply('🎌 Loading...')
		try {
			let url = BASE + '/api/anime/otakudesu/download'
			
			// GET
			const q = new URLSearchParams()
			q.set('url', inp)
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				body['url'] = inp
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎌 *otakudesu download*' })
			} else {
				await m.reply('🎌 *otakudesu download*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['url'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎌 *otakudesu download*' })
				} else {
					await m.reply('🎌 *otakudesu download*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	otakudetail: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🎌 *otakudesu detail*\n\n❌ Butuh: url\nContoh: .otakudetail https://otakudesu.cloud/anime/borto-sub-indo/')
		await m.reply('🎌 Loading...')
		try {
			let url = BASE + '/api/anime/otakudesu/detail'
			
			// GET
			const q = new URLSearchParams()
			q.set('url', inp)
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				body['url'] = inp
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎌 *otakudesu detail*' })
			} else {
				await m.reply('🎌 *otakudesu detail*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['url'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎌 *otakudesu detail*' })
				} else {
					await m.reply('🎌 *otakudesu detail*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	anichin-episode: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🎌 *anichin episode*\n\n❌ Butuh: url\nContoh: .anichin-episode https://anichin.cafe/renegade-immortal/')
		await m.reply('🎌 Loading...')
		try {
			let url = BASE + '/api/anime/anichin-episode'
			
			// GET
			const q = new URLSearchParams()
			q.set('url', inp)
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				body['url'] = inp
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎌 *anichin episode*' })
			} else {
				await m.reply('🎌 *anichin episode*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['url'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎌 *anichin episode*' })
				} else {
					await m.reply('🎌 *anichin episode*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	anichin-search: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🎌 *anichin search*\n\n❌ Butuh: query\nContoh: .anichin-search naga')
		await m.reply('🎌 Loading...')
		try {
			let url = BASE + '/api/anime/anichin-search'
			
			// GET
			const q = new URLSearchParams()
			q.set('query', inp)
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				body['query'] = inp
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎌 *anichin search*' })
			} else {
				await m.reply('🎌 *anichin search*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['query'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎌 *anichin search*' })
				} else {
					await m.reply('🎌 *anichin search*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	anichin-download: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🎌 *anichin download*\n\n❌ Butuh: url\nContoh: .anichin-download https://anichin.cafe/renegade-immortal-episode-69-subtitle-indonesia/')
		await m.reply('🎌 Loading...')
		try {
			let url = BASE + '/api/anime/anichin-download'
			
			// GET
			const q = new URLSearchParams()
			q.set('url', inp)
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				body['url'] = inp
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎌 *anichin download*' })
			} else {
				await m.reply('🎌 *anichin download*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['url'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎌 *anichin download*' })
				} else {
					await m.reply('🎌 *anichin download*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	anichin-latest: async m => {
		const inp = m.command.args?.join(' ') || ''
		
		await m.reply('🎌 Loading...')
		try {
			let url = BASE + '/api/anime/anichin-latest'
			
			// GET
			const q = new URLSearchParams()
			
			const p = inp.split(/[,|]/).map(s => s.trim())
			
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎌 *anichin latest*' })
			} else {
				await m.reply('🎌 *anichin latest*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎌 *anichin latest*' })
				} else {
					await m.reply('🎌 *anichin latest*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	anichin-popular: async m => {
		const inp = m.command.args?.join(' ') || ''
		
		await m.reply('🎌 Loading...')
		try {
			let url = BASE + '/api/anime/anichin-popular'
			
			// GET
			const q = new URLSearchParams()
			
			const p = inp.split(/[,|]/).map(s => s.trim())
			
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎌 *anichin popular*' })
			} else {
				await m.reply('🎌 *anichin popular*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎌 *anichin popular*' })
				} else {
					await m.reply('🎌 *anichin popular*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	anichin-detail: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🎌 *anichin detail*\n\n❌ Butuh: url\nContoh: .anichin-detail https://anichin.cafe/renegade-immortal-episode-69-subtitle-indonesia/')
		await m.reply('🎌 Loading...')
		try {
			let url = BASE + '/api/anime/anichin-detail'
			
			// GET
			const q = new URLSearchParams()
			q.set('url', inp)
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				body['url'] = inp
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎌 *anichin detail*' })
			} else {
				await m.reply('🎌 *anichin detail*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['url'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎌 *anichin detail*' })
				} else {
					await m.reply('🎌 *anichin detail*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	oploverz-episode: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🎌 *oploverz episode*\n\n❌ Butuh: url\nContoh: .oploverz-episode https://oploverz.org/mushoku-tensei-isekai-ittara-honki-dasu-s2/')
		await m.reply('🎌 Loading...')
		try {
			let url = BASE + '/api/anime/oploverz-episode'
			
			// GET
			const q = new URLSearchParams()
			q.set('url', inp)
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				body['url'] = inp
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎌 *oploverz episode*' })
			} else {
				await m.reply('🎌 *oploverz episode*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['url'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎌 *oploverz episode*' })
				} else {
					await m.reply('🎌 *oploverz episode*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	oploverz-ongoing: async m => {
		const inp = m.command.args?.join(' ') || ''
		
		await m.reply('🎌 Loading...')
		try {
			let url = BASE + '/api/anime/oploverz-ongoing'
			
			// GET
			const q = new URLSearchParams()
			
			const p = inp.split(/[,|]/).map(s => s.trim())
			
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎌 *oploverz ongoing*' })
			} else {
				await m.reply('🎌 *oploverz ongoing*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎌 *oploverz ongoing*' })
				} else {
					await m.reply('🎌 *oploverz ongoing*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	oploverz-search: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🎌 *oploverz search*\n\n❌ Butuh: query\nContoh: .oploverz-search romance')
		await m.reply('🎌 Loading...')
		try {
			let url = BASE + '/api/anime/oploverz-search'
			
			// GET
			const q = new URLSearchParams()
			q.set('query', inp)
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				body['query'] = inp
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎌 *oploverz search*' })
			} else {
				await m.reply('🎌 *oploverz search*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['query'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎌 *oploverz search*' })
				} else {
					await m.reply('🎌 *oploverz search*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	oploverz-download: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🎌 *oploverz download*\n\n❌ Butuh: url\nContoh: .oploverz-download https://oploverz.org/anime/captain-tsubasa-season-2-junior-youth-hen-1-episode-30-subtitle-indonesia/')
		await m.reply('🎌 Loading...')
		try {
			let url = BASE + '/api/anime/oploverz-download'
			
			// GET
			const q = new URLSearchParams()
			q.set('url', inp)
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				body['url'] = inp
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎌 *oploverz download*' })
			} else {
				await m.reply('🎌 *oploverz download*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['url'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎌 *oploverz download*' })
				} else {
					await m.reply('🎌 *oploverz download*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	komikindo-search: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🎌 *komikindo search*\n\n❌ Butuh: query\nContoh: .komikindo-search solo leveling')
		await m.reply('🎌 Loading...')
		try {
			let url = BASE + '/api/anime/komikindo-search'
			
			// GET
			const q = new URLSearchParams()
			q.set('query', inp)
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				body['query'] = inp
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎌 *komikindo search*' })
			} else {
				await m.reply('🎌 *komikindo search*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['query'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎌 *komikindo search*' })
				} else {
					await m.reply('🎌 *komikindo search*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	komikindo-detail: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🎌 *komikindo detail*\n\n❌ Butuh: url\nContoh: .komikindo-detail https://komikindo.cz/komik/550578-solo-leveling/')
		await m.reply('🎌 Loading...')
		try {
			let url = BASE + '/api/anime/komikindo-detail'
			
			// GET
			const q = new URLSearchParams()
			q.set('url', inp)
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				body['url'] = inp
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎌 *komikindo detail*' })
			} else {
				await m.reply('🎌 *komikindo detail*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['url'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎌 *komikindo detail*' })
				} else {
					await m.reply('🎌 *komikindo detail*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	komikindo-download: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🎌 *komikindo download*\n\n❌ Butuh: url\nContoh: .komikindo-download https://komikindo.cz/solo-leveling-chapter-1/')
		await m.reply('🎌 Loading...')
		try {
			let url = BASE + '/api/anime/komikindo-download'
			
			// GET
			const q = new URLSearchParams()
			q.set('url', inp)
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				body['url'] = inp
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎌 *komikindo download*' })
			} else {
				await m.reply('🎌 *komikindo download*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['url'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎌 *komikindo download*' })
				} else {
					await m.reply('🎌 *komikindo download*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	samehasearch: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🎌 *samehadaku search*\n\n❌ Butuh: query\nContoh: .samehasearch naruto')
		await m.reply('🎌 Loading...')
		try {
			let url = BASE + '/api/anime/samehadaku/search'
			
			// GET
			const q = new URLSearchParams()
			q.set('query', inp)
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				body['query'] = inp
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎌 *samehadaku search*' })
			} else {
				await m.reply('🎌 *samehadaku search*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['query'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎌 *samehadaku search*' })
				} else {
					await m.reply('🎌 *samehadaku search*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	samehadakudownload: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🎌 *samehadaku download*\n\n❌ Butuh: url\nContoh: .samehadakudownload https://v1.samehadaku.how/rekishi-ni-nokoru-akujo-ni-naru-zo-episode-9')
		await m.reply('🎌 Loading...')
		try {
			let url = BASE + '/api/anime/samehadaku/download'
			
			// GET
			const q = new URLSearchParams()
			q.set('url', inp)
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				body['url'] = inp
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎌 *samehadaku download*' })
			} else {
				await m.reply('🎌 *samehadaku download*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['url'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎌 *samehadaku download*' })
				} else {
					await m.reply('🎌 *samehadaku download*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	samehalatest: async m => {
		const inp = m.command.args?.join(' ') || ''
		
		await m.reply('🎌 Loading...')
		try {
			let url = BASE + '/api/anime/samehadaku/latest'
			
			// GET
			const q = new URLSearchParams()
			
			const p = inp.split(/[,|]/).map(s => s.trim())
			
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎌 *samehadaku latest*' })
			} else {
				await m.reply('🎌 *samehadaku latest*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎌 *samehadaku latest*' })
				} else {
					await m.reply('🎌 *samehadaku latest*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	samehadakurelease: async m => {
		const inp = m.command.args?.join(' ') || ''
		
		await m.reply('🎌 Loading...')
		try {
			let url = BASE + '/api/anime/samehadaku/release'
			
			// GET
			const q = new URLSearchParams()
			
			const p = inp.split(/[,|]/).map(s => s.trim())
			
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎌 *samehadaku release*' })
			} else {
				await m.reply('🎌 *samehadaku release*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎌 *samehadaku release*' })
				} else {
					await m.reply('🎌 *samehadaku release*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	samehadetail: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🎌 *samehadaku detail*\n\n❌ Butuh: link\nContoh: .samehadetail https://v1.samehadaku.how/anime/blue-lock-season-2/')
		await m.reply('🎌 Loading...')
		try {
			let url = BASE + '/api/anime/samehadaku/detail'
			
			// GET
			const q = new URLSearchParams()
			q.set('link', inp)
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				body['link'] = inp
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎌 *samehadaku detail*' })
			} else {
				await m.reply('🎌 *samehadaku detail*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['link'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎌 *samehadaku detail*' })
				} else {
					await m.reply('🎌 *samehadaku detail*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	}
}
