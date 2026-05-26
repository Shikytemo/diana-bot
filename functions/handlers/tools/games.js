// 🎮 GAMES Commands

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
	lengkapikalimat: async m => {
		const inp = m.command.args?.join(' ') || ''
		
		await m.reply('🎮 Loading...')
		try {
			let url = BASE + '/api/games/lengkapikalimat'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎮 *Lengkapi Kalimat*' })
			} else {
				await m.reply('🎮 *Lengkapi Kalimat*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎮 *Lengkapi Kalimat*' })
				} else {
					await m.reply('🎮 *Lengkapi Kalimat*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	kabupaten: async m => {
		const inp = m.command.args?.join(' ') || ''
		
		await m.reply('🎮 Loading...')
		try {
			let url = BASE + '/api/games/kabupaten'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎮 *Tebak Kabupaten*' })
			} else {
				await m.reply('🎮 *Tebak Kabupaten*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎮 *Tebak Kabupaten*' })
				} else {
					await m.reply('🎮 *Tebak Kabupaten*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	tekateki: async m => {
		const inp = m.command.args?.join(' ') || ''
		
		await m.reply('🎮 Loading...')
		try {
			let url = BASE + '/api/games/tekateki'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎮 *Teka Teki*' })
			} else {
				await m.reply('🎮 *Teka Teki*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎮 *Teka Teki*' })
				} else {
					await m.reply('🎮 *Teka Teki*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	tebakjkt: async m => {
		const inp = m.command.args?.join(' ') || ''
		
		await m.reply('🎮 Loading...')
		try {
			let url = BASE + '/api/games/tebakjkt'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎮 *Tebak JKT*' })
			} else {
				await m.reply('🎮 *Tebak JKT*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎮 *Tebak JKT*' })
				} else {
					await m.reply('🎮 *Tebak JKT*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	tebakkalimat: async m => {
		const inp = m.command.args?.join(' ') || ''
		
		await m.reply('🎮 Loading...')
		try {
			let url = BASE + '/api/games/tebakkalimat'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎮 *Tebak Kalimat*' })
			} else {
				await m.reply('🎮 *Tebak Kalimat*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎮 *Tebak Kalimat*' })
				} else {
					await m.reply('🎮 *Tebak Kalimat*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	caklontong: async m => {
		const inp = m.command.args?.join(' ') || ''
		
		await m.reply('🎮 Loading...')
		try {
			let url = BASE + '/api/games/caklontong'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎮 *Cak Lontong*' })
			} else {
				await m.reply('🎮 *Cak Lontong*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎮 *Cak Lontong*' })
				} else {
					await m.reply('🎮 *Cak Lontong*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	cc-sd: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🎮 *Cerdas Cermat*\n\n❌ Butuh: matapelajaran\nContoh: .cc-sd matematika')
		await m.reply('🎮 Loading...')
		try {
			let url = BASE + '/api/games/cc-sd'
			
			// GET
			const q = new URLSearchParams()
			
			const p = inp.split(/[,|]/).map(s => s.trim())
			if (p[0]) q.set('matapelajaran', p[0])
			if (p[1]) q.set('jumlahsoal', p[1])
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['matapelajaran'] = p[0]
			if (p[1]) body['jumlahsoal'] = p[1]
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎮 *Cerdas Cermat*' })
			} else {
				await m.reply('🎮 *Cerdas Cermat*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['matapelajaran'] = p[0]
			if (p[1]) body['jumlahsoal'] = p[1]
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎮 *Cerdas Cermat*' })
				} else {
					await m.reply('🎮 *Cerdas Cermat*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	tebaklogo: async m => {
		const inp = m.command.args?.join(' ') || ''
		
		await m.reply('🎮 Loading...')
		try {
			let url = BASE + '/api/games/tebaklogo'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎮 *Tebak Logo*' })
			} else {
				await m.reply('🎮 *Tebak Logo*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎮 *Tebak Logo*' })
				} else {
					await m.reply('🎮 *Tebak Logo*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	susun: async m => {
		const inp = m.command.args?.join(' ') || ''
		
		await m.reply('🎮 Loading...')
		try {
			let url = BASE + '/api/games/susunkata'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎮 *Susun Kata*' })
			} else {
				await m.reply('🎮 *Susun Kata*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎮 *Susun Kata*' })
				} else {
					await m.reply('🎮 *Susun Kata*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	tebakwarna: async m => {
		const inp = m.command.args?.join(' ') || ''
		
		await m.reply('🎮 Loading...')
		try {
			let url = BASE + '/api/games/tebakwarna'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎮 *Tebak Warna*' })
			} else {
				await m.reply('🎮 *Tebak Warna*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎮 *Tebak Warna*' })
				} else {
					await m.reply('🎮 *Tebak Warna*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	tebaklagu: async m => {
		const inp = m.command.args?.join(' ') || ''
		
		await m.reply('🎮 Loading...')
		try {
			let url = BASE + '/api/games/tebaklagu'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎮 *Tebak Lagu*' })
			} else {
				await m.reply('🎮 *Tebak Lagu*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎮 *Tebak Lagu*' })
				} else {
					await m.reply('🎮 *Tebak Lagu*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	asahotak: async m => {
		const inp = m.command.args?.join(' ') || ''
		
		await m.reply('🎮 Loading...')
		try {
			let url = BASE + '/api/games/asahotak'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎮 *Asah Otak*' })
			} else {
				await m.reply('🎮 *Asah Otak*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎮 *Asah Otak*' })
				} else {
					await m.reply('🎮 *Asah Otak*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	tebaklirik: async m => {
		const inp = m.command.args?.join(' ') || ''
		
		await m.reply('🎮 Loading...')
		try {
			let url = BASE + '/api/games/tebaklirik'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎮 *Tebak Lirik*' })
			} else {
				await m.reply('🎮 *Tebak Lirik*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎮 *Tebak Lirik*' })
				} else {
					await m.reply('🎮 *Tebak Lirik*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	maths: async m => {
		const inp = m.command.args?.join(' ') || ''
		
		await m.reply('🎮 Loading...')
		try {
			let url = BASE + '/api/games/maths'
			
			// GET
			const q = new URLSearchParams()
			q.set('level', inp)
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				body['level'] = inp
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎮 *Maths*' })
			} else {
				await m.reply('🎮 *Maths*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['level'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎮 *Maths*' })
				} else {
					await m.reply('🎮 *Maths*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	tebakkata: async m => {
		const inp = m.command.args?.join(' ') || ''
		
		await m.reply('🎮 Loading...')
		try {
			let url = BASE + '/api/games/tebakkata'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎮 *Tebak Kata*' })
			} else {
				await m.reply('🎮 *Tebak Kata*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎮 *Tebak Kata*' })
				} else {
					await m.reply('🎮 *Tebak Kata*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	tebakkimia: async m => {
		const inp = m.command.args?.join(' ') || ''
		
		await m.reply('🎮 Loading...')
		try {
			let url = BASE + '/api/games/tebakkimia'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎮 *Tebak Kimia*' })
			} else {
				await m.reply('🎮 *Tebak Kimia*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎮 *Tebak Kimia*' })
				} else {
					await m.reply('🎮 *Tebak Kimia*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	surah: async m => {
		const inp = m.command.args?.join(' ') || ''
		
		await m.reply('🎮 Loading...')
		try {
			let url = BASE + '/api/games/surah'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎮 *Tebak Surah*' })
			} else {
				await m.reply('🎮 *Tebak Surah*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎮 *Tebak Surah*' })
				} else {
					await m.reply('🎮 *Tebak Surah*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	tebakhewan: async m => {
		const inp = m.command.args?.join(' ') || ''
		
		await m.reply('🎮 Loading...')
		try {
			let url = BASE + '/api/games/tebakhewan'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎮 *Tebak Hewan*' })
			} else {
				await m.reply('🎮 *Tebak Hewan*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎮 *Tebak Hewan*' })
				} else {
					await m.reply('🎮 *Tebak Hewan*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	tebaktebakan: async m => {
		const inp = m.command.args?.join(' ') || ''
		
		await m.reply('🎮 Loading...')
		try {
			let url = BASE + '/api/games/tebaktebakan'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎮 *Tebak Tebakan*' })
			} else {
				await m.reply('🎮 *Tebak Tebakan*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎮 *Tebak Tebakan*' })
				} else {
					await m.reply('🎮 *Tebak Tebakan*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	tebakbendera: async m => {
		const inp = m.command.args?.join(' ') || ''
		
		await m.reply('🎮 Loading...')
		try {
			let url = BASE + '/api/games/tebakbendera'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎮 *Tebak Bendera*' })
			} else {
				await m.reply('🎮 *Tebak Bendera*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎮 *Tebak Bendera*' })
				} else {
					await m.reply('🎮 *Tebak Bendera*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	tebakkartun: async m => {
		const inp = m.command.args?.join(' ') || ''
		
		await m.reply('🎮 Loading...')
		try {
			let url = BASE + '/api/games/tebakkartun'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎮 *Tebak Kartun*' })
			} else {
				await m.reply('🎮 *Tebak Kartun*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎮 *Tebak Kartun*' })
				} else {
					await m.reply('🎮 *Tebak Kartun*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	siapakahaku: async m => {
		const inp = m.command.args?.join(' ') || ''
		
		await m.reply('🎮 Loading...')
		try {
			let url = BASE + '/api/games/siapakahaku'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎮 *Siapakah Aku*' })
			} else {
				await m.reply('🎮 *Siapakah Aku*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎮 *Siapakah Aku*' })
				} else {
					await m.reply('🎮 *Siapakah Aku*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	tebakgame: async m => {
		const inp = m.command.args?.join(' ') || ''
		
		await m.reply('🎮 Loading...')
		try {
			let url = BASE + '/api/games/tebakgame'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎮 *Tebak Game*' })
			} else {
				await m.reply('🎮 *Tebak Game*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎮 *Tebak Game*' })
				} else {
					await m.reply('🎮 *Tebak Game*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	karakter-freefire: async m => {
		const inp = m.command.args?.join(' ') || ''
		
		await m.reply('🎮 Loading...')
		try {
			let url = BASE + '/api/games/karakter-freefire'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎮 *Tebak Karakter Free Fire*' })
			} else {
				await m.reply('🎮 *Tebak Karakter Free Fire*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎮 *Tebak Karakter Free Fire*' })
				} else {
					await m.reply('🎮 *Tebak Karakter Free Fire*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	tebakheroml: async m => {
		const inp = m.command.args?.join(' ') || ''
		
		await m.reply('🎮 Loading...')
		try {
			let url = BASE + '/api/games/tebakheroml'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎮 *Tebak Hero ML*' })
			} else {
				await m.reply('🎮 *Tebak Hero ML*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎮 *Tebak Hero ML*' })
				} else {
					await m.reply('🎮 *Tebak Hero ML*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	tebakgambar: async m => {
		const inp = m.command.args?.join(' ') || ''
		
		await m.reply('🎮 Loading...')
		try {
			let url = BASE + '/api/games/tebakgambar'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎮 *Tebak Gambar*' })
			} else {
				await m.reply('🎮 *Tebak Gambar*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎮 *Tebak Gambar*' })
				} else {
					await m.reply('🎮 *Tebak Gambar*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	family100: async m => {
		const inp = m.command.args?.join(' ') || ''
		
		await m.reply('🎮 Loading...')
		try {
			let url = BASE + '/api/games/family100'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎮 *Family100*' })
			} else {
				await m.reply('🎮 *Family100*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎮 *Family100*' })
				} else {
					await m.reply('🎮 *Family100*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	}
}
