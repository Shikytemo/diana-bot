// 🔍 SEARCH Commands

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
	amsearch: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🔍 *music apple*\n\n❌ Butuh: query\nContoh: .amsearch duka')
		await m.reply('🔍 Loading...')
		try {
			let url = BASE + '/api/s/applemusic'
			
			// GET
			const q = new URLSearchParams()
			
			const p = inp.split(/[,|]/).map(s => s.trim())
			if (p[0]) q.set('query', p[0])
			if (p[1]) q.set('region', p[1])
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['query'] = p[0]
			if (p[1]) body['region'] = p[1]
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🔍 *music apple*' })
			} else {
				await m.reply('🔍 *music apple*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['query'] = p[0]
			if (p[1]) body['region'] = p[1]
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🔍 *music apple*' })
				} else {
					await m.reply('🔍 *music apple*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	spsearch: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🔍 *spotify search*\n\n❌ Butuh: query\nContoh: .spsearch serana')
		await m.reply('🔍 Loading...')
		try {
			let url = BASE + '/api/s/spotify'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🔍 *spotify search*' })
			} else {
				await m.reply('🔍 *spotify search*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['query'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🔍 *spotify search*' })
				} else {
					await m.reply('🔍 *spotify search*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	gitsearch: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🔍 *gitagram search*\n\n❌ Butuh: search\nContoh: .gitsearch sekuat hatimu')
		await m.reply('🔍 Loading...')
		try {
			let url = BASE + '/api/s/gitagram'
			
			// GET
			const q = new URLSearchParams()
			q.set('search', inp)
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				body['search'] = inp
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🔍 *gitagram search*' })
			} else {
				await m.reply('🔍 *gitagram search*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['search'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🔍 *gitagram search*' })
				} else {
					await m.reply('🔍 *gitagram search*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	lahelu: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🔍 *lahelu search*\n\n❌ Butuh: query\nContoh: .lahelu drak')
		await m.reply('🔍 Loading...')
		try {
			let url = BASE + '/api/s/lahelu'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🔍 *lahelu search*' })
			} else {
				await m.reply('🔍 *lahelu search*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['query'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🔍 *lahelu search*' })
				} else {
					await m.reply('🔍 *lahelu search*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	duck: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🔍 *duckduckgo*\n\n❌ Butuh: query\nContoh: .duck openai')
		await m.reply('🔍 Loading...')
		try {
			let url = BASE + '/api/s/duckduckgo'
			
			// GET
			const q = new URLSearchParams()
			
			const p = inp.split(/[,|]/).map(s => s.trim())
			if (p[0]) q.set('query', p[0])
			if (p[1]) q.set('kl', p[1])
			if (p[2]) q.set('df', p[2])
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['query'] = p[0]
			if (p[1]) body['kl'] = p[1]
			if (p[2]) body['df'] = p[2]
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🔍 *duckduckgo*' })
			} else {
				await m.reply('🔍 *duckduckgo*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['query'] = p[0]
			if (p[1]) body['kl'] = p[1]
			if (p[2]) body['df'] = p[2]
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🔍 *duckduckgo*' })
				} else {
					await m.reply('🔍 *duckduckgo*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	bing: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🔍 *bing image*\n\n❌ Butuh: query\nContoh: .bing kucing')
		await m.reply('🔍 Loading...')
		try {
			let url = BASE + '/api/s/bimg'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🔍 *bing image*' })
			} else {
				await m.reply('🔍 *bing image*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['query'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🔍 *bing image*' })
				} else {
					await m.reply('🔍 *bing image*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	musixmatch: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🔍 *musixmatch*\n\n❌ Butuh: query\nContoh: .musixmatch garam dan madu')
		await m.reply('🔍 Loading...')
		try {
			let url = BASE + '/api/s/musixmatch'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🔍 *musixmatch*' })
			} else {
				await m.reply('🔍 *musixmatch*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['query'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🔍 *musixmatch*' })
				} else {
					await m.reply('🔍 *musixmatch*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	brave: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🔍 *brave search*\n\n❌ Butuh: query\nContoh: .brave apa itu nodejs')
		await m.reply('🔍 Loading...')
		try {
			let url = BASE + '/api/s/brave'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🔍 *brave search*' })
			} else {
				await m.reply('🔍 *brave search*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['query'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🔍 *brave search*' })
				} else {
					await m.reply('🔍 *brave search*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	instants: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🔍 *my instants search*\n\n❌ Butuh: query\nContoh: .instants cihuyy')
		await m.reply('🔍 Loading...')
		try {
			let url = BASE + '/api/s/myinstants'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🔍 *my instants search*' })
			} else {
				await m.reply('🔍 *my instants search*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['query'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🔍 *my instants search*' })
				} else {
					await m.reply('🔍 *my instants search*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	font8: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🔍 *8 font*\n\n❌ Butuh: query\nContoh: .font8 cartoon')
		await m.reply('🔍 Loading...')
		try {
			let url = BASE + '/api/s/8font'
			
			// GET
			const q = new URLSearchParams()
			
			const p = inp.split(/[,|]/).map(s => s.trim())
			if (p[0]) q.set('query', p[0])
			if (p[1]) q.set('page', p[1])
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['query'] = p[0]
			if (p[1]) body['page'] = p[1]
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🔍 *8 font*' })
			} else {
				await m.reply('🔍 *8 font*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['query'] = p[0]
			if (p[1]) body['page'] = p[1]
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🔍 *8 font*' })
				} else {
					await m.reply('🔍 *8 font*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	seegore: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🔍 *seegore search*\n\n❌ Butuh: query\nContoh: .seegore train')
		await m.reply('🔍 Loading...')
		try {
			let url = BASE + '/api/s/seegore'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🔍 *seegore search*' })
			} else {
				await m.reply('🔍 *seegore search*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['query'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🔍 *seegore search*' })
				} else {
					await m.reply('🔍 *seegore search*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	otakotaku: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🔍 *otakotaku search*\n\n❌ Butuh: query\nContoh: .otakotaku mahiru')
		await m.reply('🔍 Loading...')
		try {
			let url = BASE + '/api/s/otakotaku'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🔍 *otakotaku search*' })
			} else {
				await m.reply('🔍 *otakotaku search*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['query'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🔍 *otakotaku search*' })
				} else {
					await m.reply('🔍 *otakotaku search*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	mcpedl: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🔍 *mcpedl search*\n\n❌ Butuh: q\nContoh: .mcpedl shaders')
		await m.reply('🔍 Loading...')
		try {
			let url = BASE + '/api/s/mcpedl'
			
			// GET
			const q = new URLSearchParams()
			q.set('q', inp)
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				body['q'] = inp
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🔍 *mcpedl search*' })
			} else {
				await m.reply('🔍 *mcpedl search*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['q'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🔍 *mcpedl search*' })
				} else {
					await m.reply('🔍 *mcpedl search*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	googleimg: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🔍 *google image*\n\n❌ Butuh: query\nContoh: .googleimg siputzx')
		await m.reply('🔍 Loading...')
		try {
			let url = BASE + '/api/s/googleimg'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🔍 *google image*' })
			} else {
				await m.reply('🔍 *google image*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['query'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🔍 *google image*' })
				} else {
					await m.reply('🔍 *google image*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	mangatoon: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🔍 *mangatoon search*\n\n❌ Butuh: query\nContoh: .mangatoon cat')
		await m.reply('🔍 Loading...')
		try {
			let url = BASE + '/api/s/mangatoon'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🔍 *mangatoon search*' })
			} else {
				await m.reply('🔍 *mangatoon search*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['query'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🔍 *mangatoon search*' })
				} else {
					await m.reply('🔍 *mangatoon search*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	gsmarena: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🔍 *gsmarena*\n\n❌ Butuh: query\nContoh: .gsmarena iphone')
		await m.reply('🔍 Loading...')
		try {
			let url = BASE + '/api/s/gsmarena'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🔍 *gsmarena*' })
			} else {
				await m.reply('🔍 *gsmarena*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['query'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🔍 *gsmarena*' })
				} else {
					await m.reply('🔍 *gsmarena*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	resep: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🔍 *resep koki search*\n\n❌ Butuh: query\nContoh: .resep nasi goreng')
		await m.reply('🔍 Loading...')
		try {
			let url = BASE + '/api/s/resep'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🔍 *resep koki search*' })
			} else {
				await m.reply('🔍 *resep koki search*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['query'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🔍 *resep koki search*' })
				} else {
					await m.reply('🔍 *resep koki search*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	ytsearch: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🔍 *youtube*\n\n❌ Butuh: query\nContoh: .ytsearch sc bot')
		await m.reply('🔍 Loading...')
		try {
			let url = BASE + '/api/s/youtube'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🔍 *youtube*' })
			} else {
				await m.reply('🔍 *youtube*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['query'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🔍 *youtube*' })
				} else {
					await m.reply('🔍 *youtube*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	kbbi: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🔍 *kbbi*\n\n❌ Butuh: q\nContoh: .kbbi ilmu')
		await m.reply('🔍 Loading...')
		try {
			let url = BASE + '/api/s/kbbi'
			
			// GET
			const q = new URLSearchParams()
			q.set('q', inp)
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				body['q'] = inp
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🔍 *kbbi*' })
			} else {
				await m.reply('🔍 *kbbi*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['q'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🔍 *kbbi*' })
				} else {
					await m.reply('🔍 *kbbi*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	pinsearch: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🔍 *pinterest*\n\n❌ Butuh: query\nContoh: .pinsearch cat')
		await m.reply('🔍 Loading...')
		try {
			let url = BASE + '/api/s/pinterest'
			
			// GET
			const q = new URLSearchParams()
			
			const p = inp.split(/[,|]/).map(s => s.trim())
			if (p[0]) q.set('query', p[0])
			if (p[1]) q.set('type', p[1])
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['query'] = p[0]
			if (p[1]) body['type'] = p[1]
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🔍 *pinterest*' })
			} else {
				await m.reply('🔍 *pinterest*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['query'] = p[0]
			if (p[1]) body['type'] = p[1]
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🔍 *pinterest*' })
				} else {
					await m.reply('🔍 *pinterest*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	scsearch: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🔍 *soundcloud search*\n\n❌ Butuh: query\nContoh: .scsearch duka')
		await m.reply('🔍 Loading...')
		try {
			let url = BASE + '/api/s/soundcloud'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🔍 *soundcloud search*' })
			} else {
				await m.reply('🔍 *soundcloud search*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['query'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🔍 *soundcloud search*' })
				} else {
					await m.reply('🔍 *soundcloud search*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	}
}
