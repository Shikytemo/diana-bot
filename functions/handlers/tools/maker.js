// ✨ MAKER Commands

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
	photooxy: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('✨ *photooxy*\n\n❌ Butuh: url, text1\nContoh: .photooxy https://photooxy.com/logo-and-text-effects/shadow-text-effect-in-the-sky-394.html')
		await m.reply('✨ Loading...')
		try {
			let url = BASE + '/api/m/photooxy'
			
			// GET
			const q = new URLSearchParams()
			
			const p = inp.split(/[,|]/).map(s => s.trim())
			if (p[0]) q.set('url', p[0])
			if (p[1]) q.set('text1', p[1])
			if (p[2]) q.set('text2', p[2])
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['url'] = p[0]
			if (p[1]) body['text1'] = p[1]
			if (p[2]) body['text2'] = p[2]
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '✨ *photooxy*' })
			} else {
				await m.reply('✨ *photooxy*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['url'] = p[0]
			if (p[1]) body['text1'] = p[1]
			if (p[2]) body['text2'] = p[2]
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '✨ *photooxy*' })
				} else {
					await m.reply('✨ *photooxy*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	ephoto360: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('✨ *ephoto360*\n\n❌ Butuh: url, text1\nContoh: .ephoto360 https://en.ephoto360.com/create-a-cartoon-style-graffiti-text-effect-online-668.html')
		await m.reply('✨ Loading...')
		try {
			let url = BASE + '/api/m/ephoto360'
			
			// GET
			const q = new URLSearchParams()
			
			const p = inp.split(/[,|]/).map(s => s.trim())
			if (p[0]) q.set('url', p[0])
			if (p[1]) q.set('text1', p[1])
			if (p[2]) q.set('text2', p[2])
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['url'] = p[0]
			if (p[1]) body['text1'] = p[1]
			if (p[2]) body['text2'] = p[2]
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '✨ *ephoto360*' })
			} else {
				await m.reply('✨ *ephoto360*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['url'] = p[0]
			if (p[1]) body['text1'] = p[1]
			if (p[2]) body['text2'] = p[2]
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '✨ *ephoto360*' })
				} else {
					await m.reply('✨ *ephoto360*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	brat: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('✨ *brat*\n\n❌ Butuh: text\nContoh: .brat Hello world!')
		await m.reply('✨ Loading...')
		try {
			let url = BASE + '/api/m/brat'
			
			// GET
			const q = new URLSearchParams()
			
			const p = inp.split(/[,|]/).map(s => s.trim())
			if (p[0]) q.set('text', p[0])
			if (p[1]) q.set('isAnimated', p[1])
			if (p[2]) q.set('delay', p[2])
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['text'] = p[0]
			if (p[1]) body['isAnimated'] = p[1]
			if (p[2]) body['delay'] = p[2]
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '✨ *brat*' })
			} else {
				await m.reply('✨ *brat*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['text'] = p[0]
			if (p[1]) body['isAnimated'] = p[1]
			if (p[2]) body['delay'] = p[2]
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '✨ *brat*' })
				} else {
					await m.reply('✨ *brat*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	textpro: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('✨ *textpro*\n\n❌ Butuh: url, text1\nContoh: .textpro https://textpro.me/create-artistic-3d-text-effects-from-corn-kernels-1177.html')
		await m.reply('✨ Loading...')
		try {
			let url = BASE + '/api/m/textpro'
			
			// GET
			const q = new URLSearchParams()
			
			const p = inp.split(/[,|]/).map(s => s.trim())
			if (p[0]) q.set('url', p[0])
			if (p[1]) q.set('text1', p[1])
			if (p[2]) q.set('text2', p[2])
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['url'] = p[0]
			if (p[1]) body['text1'] = p[1]
			if (p[2]) body['text2'] = p[2]
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '✨ *textpro*' })
			} else {
				await m.reply('✨ *textpro*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['url'] = p[0]
			if (p[1]) body['text1'] = p[1]
			if (p[2]) body['text2'] = p[2]
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '✨ *textpro*' })
				} else {
					await m.reply('✨ *textpro*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	}
}
