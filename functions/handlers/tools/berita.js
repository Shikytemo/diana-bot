// 📰 BERITA Commands

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
	kompas: async m => {
		const inp = m.command.args?.join(' ') || ''
		
		await m.reply('📰 Loading...')
		try {
			let url = BASE + '/api/berita/kompas'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '📰 *kompas news*' })
			} else {
				await m.reply('📰 *kompas news*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '📰 *kompas news*' })
				} else {
					await m.reply('📰 *kompas news*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	cnn: async m => {
		const inp = m.command.args?.join(' ') || ''
		
		await m.reply('📰 Loading...')
		try {
			let url = BASE + '/api/berita/cnn'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '📰 *cnn Indonesia*' })
			} else {
				await m.reply('📰 *cnn Indonesia*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '📰 *cnn Indonesia*' })
				} else {
					await m.reply('📰 *cnn Indonesia*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	tribunnews: async m => {
		const inp = m.command.args?.join(' ') || ''
		
		await m.reply('📰 Loading...')
		try {
			let url = BASE + '/api/berita/tribunnews'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '📰 *tribunnews*' })
			} else {
				await m.reply('📰 *tribunnews*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '📰 *tribunnews*' })
				} else {
					await m.reply('📰 *tribunnews*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	jkt48: async m => {
		const inp = m.command.args?.join(' ') || ''
		
		await m.reply('📰 Loading...')
		try {
			let url = BASE + '/api/berita/jkt48'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '📰 *jkt48 news*' })
			} else {
				await m.reply('📰 *jkt48 news*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '📰 *jkt48 news*' })
				} else {
					await m.reply('📰 *jkt48 news*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	liputan6: async m => {
		const inp = m.command.args?.join(' ') || ''
		
		await m.reply('📰 Loading...')
		try {
			let url = BASE + '/api/berita/liputan6'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '📰 *liputan6*' })
			} else {
				await m.reply('📰 *liputan6*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '📰 *liputan6*' })
				} else {
					await m.reply('📰 *liputan6*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	suara: async m => {
		const inp = m.command.args?.join(' ') || ''
		
		await m.reply('📰 Loading...')
		try {
			let url = BASE + '/api/berita/suara'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '📰 *suara news*' })
			} else {
				await m.reply('📰 *suara news*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '📰 *suara news*' })
				} else {
					await m.reply('📰 *suara news*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	sindonews: async m => {
		const inp = m.command.args?.join(' ') || ''
		
		await m.reply('📰 Loading...')
		try {
			let url = BASE + '/api/berita/sindonews'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '📰 *sindonews*' })
			} else {
				await m.reply('📰 *sindonews*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '📰 *sindonews*' })
				} else {
					await m.reply('📰 *sindonews*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	cnbcindonesia: async m => {
		const inp = m.command.args?.join(' ') || ''
		
		await m.reply('📰 Loading...')
		try {
			let url = BASE + '/api/berita/cnbcindonesia'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '📰 *cnbc indonesia*' })
			} else {
				await m.reply('📰 *cnbc indonesia*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '📰 *cnbc indonesia*' })
				} else {
					await m.reply('📰 *cnbc indonesia*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	merdeka: async m => {
		const inp = m.command.args?.join(' ') || ''
		
		await m.reply('📰 Loading...')
		try {
			let url = BASE + '/api/berita/merdeka'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '📰 *merdeka news*' })
			} else {
				await m.reply('📰 *merdeka news*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '📰 *merdeka news*' })
				} else {
					await m.reply('📰 *merdeka news*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	antara: async m => {
		const inp = m.command.args?.join(' ') || ''
		
		await m.reply('📰 Loading...')
		try {
			let url = BASE + '/api/berita/antara'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '📰 *antara news*' })
			} else {
				await m.reply('📰 *antara news*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '📰 *antara news*' })
				} else {
					await m.reply('📰 *antara news*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	}
}
