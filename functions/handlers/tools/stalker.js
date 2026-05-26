// 👀 STALKER Commands

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
	github: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('👀 *github*\n\n❌ Butuh: user\nContoh: .github octocat')
		await m.reply('👀 Loading...')
		try {
			let url = BASE + '/api/stalk/github'
			
			// GET
			const q = new URLSearchParams()
			q.set('user', inp)
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				body['user'] = inp
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '👀 *github*' })
			} else {
				await m.reply('👀 *github*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['user'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '👀 *github*' })
				} else {
					await m.reply('👀 *github*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	instagram: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('👀 *instagram*\n\n❌ Butuh: username\nContoh: .instagram google')
		await m.reply('👀 Loading...')
		try {
			let url = BASE + '/api/stalk/instagram'
			
			// GET
			const q = new URLSearchParams()
			q.set('username', inp)
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				body['username'] = inp
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '👀 *instagram*' })
			} else {
				await m.reply('👀 *instagram*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['username'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '👀 *instagram*' })
				} else {
					await m.reply('👀 *instagram*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	roblox: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('👀 *roblox*\n\n❌ Butuh: user\nContoh: .roblox builderman')
		await m.reply('👀 Loading...')
		try {
			let url = BASE + '/api/stalk/roblox'
			
			// GET
			const q = new URLSearchParams()
			q.set('user', inp)
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				body['user'] = inp
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '👀 *roblox*' })
			} else {
				await m.reply('👀 *roblox*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['user'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '👀 *roblox*' })
				} else {
					await m.reply('👀 *roblox*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	twitter: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('👀 *twitter stalk*\n\n❌ Butuh: user\nContoh: .twitter siputzx')
		await m.reply('👀 Loading...')
		try {
			let url = BASE + '/api/stalk/twitter'
			
			// GET
			const q = new URLSearchParams()
			q.set('user', inp)
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				body['user'] = inp
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '👀 *twitter stalk*' })
			} else {
				await m.reply('👀 *twitter stalk*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['user'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '👀 *twitter stalk*' })
				} else {
					await m.reply('👀 *twitter stalk*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	threads: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('👀 *threads*\n\n❌ Butuh: q\nContoh: .threads google')
		await m.reply('👀 Loading...')
		try {
			let url = BASE + '/api/stalk/threads'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '👀 *threads*' })
			} else {
				await m.reply('👀 *threads*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['q'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '👀 *threads*' })
				} else {
					await m.reply('👀 *threads*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	youtube: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('👀 *youtube stalk*\n\n❌ Butuh: username\nContoh: .youtube siputzx')
		await m.reply('👀 Loading...')
		try {
			let url = BASE + '/api/stalk/youtube'
			
			// GET
			const q = new URLSearchParams()
			q.set('username', inp)
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				body['username'] = inp
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '👀 *youtube stalk*' })
			} else {
				await m.reply('👀 *youtube stalk*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['username'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '👀 *youtube stalk*' })
				} else {
					await m.reply('👀 *youtube stalk*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	pinterest: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('👀 *pinterest*\n\n❌ Butuh: q\nContoh: .pinterest dims')
		await m.reply('👀 Loading...')
		try {
			let url = BASE + '/api/stalk/pinterest'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '👀 *pinterest*' })
			} else {
				await m.reply('👀 *pinterest*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['q'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '👀 *pinterest*' })
				} else {
					await m.reply('👀 *pinterest*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	tiktok: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('👀 *tiktok*\n\n❌ Butuh: username\nContoh: .tiktok mrbeast')
		await m.reply('👀 Loading...')
		try {
			let url = BASE + '/api/stalk/tiktok'
			
			// GET
			const q = new URLSearchParams()
			q.set('username', inp)
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				body['username'] = inp
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '👀 *tiktok*' })
			} else {
				await m.reply('👀 *tiktok*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['username'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '👀 *tiktok*' })
				} else {
					await m.reply('👀 *tiktok*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	}
}
