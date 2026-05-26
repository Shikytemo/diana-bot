// 🛠️ TOOLS Commands

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
	ssweb: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🛠️ *Website Screenshot*\n\n❌ Butuh: url\nContoh: .ssweb https://google.com')
		await m.reply('🛠️ Loading...')
		try {
			let url = BASE + '/api/tools/ssweb'
			
			// GET
			const q = new URLSearchParams()
			
			const p = inp.split(/[,|]/).map(s => s.trim())
			if (p[0]) q.set('url', p[0])
			if (p[1]) q.set('device', p[1])
			if (p[2]) q.set('theme', p[2])
			if (p[3]) q.set('fullPage', p[3])
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['url'] = p[0]
			if (p[1]) body['device'] = p[1]
			if (p[2]) body['theme'] = p[2]
			if (p[3]) body['fullPage'] = p[3]
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🛠️ *Website Screenshot*' })
			} else {
				await m.reply('🛠️ *Website Screenshot*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['url'] = p[0]
			if (p[1]) body['device'] = p[1]
			if (p[2]) body['theme'] = p[2]
			if (p[3]) body['fullPage'] = p[3]
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🛠️ *Website Screenshot*' })
				} else {
					await m.reply('🛠️ *Website Screenshot*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	kodepos: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🛠️ *kodepos*\n\n❌ Butuh: form\nContoh: .kodepos pasiran jaya')
		await m.reply('🛠️ Loading...')
		try {
			let url = BASE + '/api/tools/kodepos'
			
			// GET
			const q = new URLSearchParams()
			q.set('form', inp)
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				body['form'] = inp
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🛠️ *kodepos*' })
			} else {
				await m.reply('🛠️ *kodepos*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['form'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🛠️ *kodepos*' })
				} else {
					await m.reply('🛠️ *kodepos*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	translate: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🛠️ *translate*\n\n❌ Butuh: text\nContoh: .translate I love you')
		await m.reply('🛠️ Loading...')
		try {
			let url = BASE + '/api/tools/translate'
			
			// GET
			const q = new URLSearchParams()
			
			const p = inp.split(/[,|]/).map(s => s.trim())
			if (p[0]) q.set('text', p[0])
			if (p[1]) q.set('source', p[1])
			if (p[2]) q.set('target', p[2])
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['text'] = p[0]
			if (p[1]) body['source'] = p[1]
			if (p[2]) body['target'] = p[2]
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🛠️ *translate*' })
			} else {
				await m.reply('🛠️ *translate*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['text'] = p[0]
			if (p[1]) body['source'] = p[1]
			if (p[2]) body['target'] = p[2]
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🛠️ *translate*' })
				} else {
					await m.reply('🛠️ *translate*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	countryInfo: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🛠️ *country Info*\n\n❌ Butuh: name\nContoh: .countryInfo Indonesia')
		await m.reply('🛠️ Loading...')
		try {
			let url = BASE + '/api/tools/countryInfo'
			
			// GET
			const q = new URLSearchParams()
			q.set('name', inp)
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				body['name'] = inp
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🛠️ *country Info*' })
			} else {
				await m.reply('🛠️ *country Info*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['name'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🛠️ *country Info*' })
				} else {
					await m.reply('🛠️ *country Info*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	subdomains: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🛠️ *subdomain finder*\n\n❌ Butuh: domain\nContoh: .subdomains siputzx.my.id')
		await m.reply('🛠️ Loading...')
		try {
			let url = BASE + '/api/tools/subdomains'
			
			// GET
			const q = new URLSearchParams()
			q.set('domain', inp)
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				body['domain'] = inp
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🛠️ *subdomain finder*' })
			} else {
				await m.reply('🛠️ *subdomain finder*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['domain'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🛠️ *subdomain finder*' })
				} else {
					await m.reply('🛠️ *subdomain finder*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	vcc-generator: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🛠️ *vcc generator*\n\n❌ Butuh: type\nContoh: .vcc-generator Visa')
		await m.reply('🛠️ Loading...')
		try {
			let url = BASE + '/api/tools/vcc-generator'
			
			// GET
			const q = new URLSearchParams()
			
			const p = inp.split(/[,|]/).map(s => s.trim())
			if (p[0]) q.set('type', p[0])
			if (p[1]) q.set('count', p[1])
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['type'] = p[0]
			if (p[1]) body['count'] = p[1]
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🛠️ *vcc generator*' })
			} else {
				await m.reply('🛠️ *vcc generator*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['type'] = p[0]
			if (p[1]) body['count'] = p[1]
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🛠️ *vcc generator*' })
				} else {
					await m.reply('🛠️ *vcc generator*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	}
}
