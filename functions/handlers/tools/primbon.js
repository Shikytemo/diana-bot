// 🔮 PRIMBON Commands

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
	cekpenyakit: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🔮 *cek potensi penyakit*\n\n❌ Butuh: tgl, bln, thn\nContoh: .cekpenyakit 12')
		await m.reply('🔮 Loading...')
		try {
			let url = BASE + '/api/primbon/cek_potensi_penyakit'
			
			// GET
			const q = new URLSearchParams()
			
			const p = inp.split(/[,|]/).map(s => s.trim())
			if (p[0]) q.set('tgl', p[0])
			if (p[1]) q.set('bln', p[1])
			if (p[2]) q.set('thn', p[2])
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['tgl'] = p[0]
			if (p[1]) body['bln'] = p[1]
			if (p[2]) body['thn'] = p[2]
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🔮 *cek potensi penyakit*' })
			} else {
				await m.reply('🔮 *cek potensi penyakit*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['tgl'] = p[0]
			if (p[1]) body['bln'] = p[1]
			if (p[2]) body['thn'] = p[2]
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🔮 *cek potensi penyakit*' })
				} else {
					await m.reply('🔮 *cek potensi penyakit*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	artinama: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🔮 *arti nama*\n\n❌ Butuh: nama\nContoh: .artinama putu')
		await m.reply('🔮 Loading...')
		try {
			let url = BASE + '/api/primbon/artinama'
			
			// GET
			const q = new URLSearchParams()
			q.set('nama', inp)
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				body['nama'] = inp
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🔮 *arti nama*' })
			} else {
				await m.reply('🔮 *arti nama*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['nama'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🔮 *arti nama*' })
				} else {
					await m.reply('🔮 *arti nama*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	nomorhoki: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🔮 *nomor hoki*\n\n❌ Butuh: phoneNumber\nContoh: .nomorhoki 6285658939117')
		await m.reply('🔮 Loading...')
		try {
			let url = BASE + '/api/primbon/nomorhoki'
			
			// GET
			const q = new URLSearchParams()
			q.set('phoneNumber', inp)
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				body['phoneNumber'] = inp
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🔮 *nomor hoki*' })
			} else {
				await m.reply('🔮 *nomor hoki*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['phoneNumber'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🔮 *nomor hoki*' })
				} else {
					await m.reply('🔮 *nomor hoki*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	tafsirmimpi: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🔮 *tafsir mimpi*\n\n❌ Butuh: mimpi\nContoh: .tafsirmimpi bertemu')
		await m.reply('🔮 Loading...')
		try {
			let url = BASE + '/api/primbon/tafsirmimpi'
			
			// GET
			const q = new URLSearchParams()
			q.set('mimpi', inp)
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				body['mimpi'] = inp
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🔮 *tafsir mimpi*' })
			} else {
				await m.reply('🔮 *tafsir mimpi*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['mimpi'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🔮 *tafsir mimpi*' })
				} else {
					await m.reply('🔮 *tafsir mimpi*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	cocoknama: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🔮 *kecocokan nama pasangan*\n\n❌ Butuh: nama1, nama2\nContoh: .cocoknama putu')
		await m.reply('🔮 Loading...')
		try {
			let url = BASE + '/api/primbon/kecocokan_nama_pasangan'
			
			// GET
			const q = new URLSearchParams()
			
			const p = inp.split(/[,|]/).map(s => s.trim())
			if (p[0]) q.set('nama1', p[0])
			if (p[1]) q.set('nama2', p[1])
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['nama1'] = p[0]
			if (p[1]) body['nama2'] = p[1]
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🔮 *kecocokan nama pasangan*' })
			} else {
				await m.reply('🔮 *kecocokan nama pasangan*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['nama1'] = p[0]
			if (p[1]) body['nama2'] = p[1]
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🔮 *kecocokan nama pasangan*' })
				} else {
					await m.reply('🔮 *kecocokan nama pasangan*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	jodohbali: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🔮 *ramalan jodoh bali*\n\n❌ Butuh: nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2\nContoh: .jodohbali putu')
		await m.reply('🔮 Loading...')
		try {
			let url = BASE + '/api/primbon/ramalanjodohbali'
			
			// GET
			const q = new URLSearchParams()
			
			const p = inp.split(/[,|]/).map(s => s.trim())
			if (p[0]) q.set('nama1', p[0])
			if (p[1]) q.set('tgl1', p[1])
			if (p[2]) q.set('bln1', p[2])
			if (p[3]) q.set('thn1', p[3])
			if (p[4]) q.set('nama2', p[4])
			if (p[5]) q.set('tgl2', p[5])
			if (p[6]) q.set('bln2', p[6])
			if (p[7]) q.set('thn2', p[7])
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['nama1'] = p[0]
			if (p[1]) body['tgl1'] = p[1]
			if (p[2]) body['bln1'] = p[2]
			if (p[3]) body['thn1'] = p[3]
			if (p[4]) body['nama2'] = p[4]
			if (p[5]) body['tgl2'] = p[5]
			if (p[6]) body['bln2'] = p[6]
			if (p[7]) body['thn2'] = p[7]
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🔮 *ramalan jodoh bali*' })
			} else {
				await m.reply('🔮 *ramalan jodoh bali*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['nama1'] = p[0]
			if (p[1]) body['tgl1'] = p[1]
			if (p[2]) body['bln1'] = p[2]
			if (p[3]) body['thn1'] = p[3]
			if (p[4]) body['nama2'] = p[4]
			if (p[5]) body['tgl2'] = p[5]
			if (p[6]) body['bln2'] = p[6]
			if (p[7]) body['thn2'] = p[7]
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🔮 *ramalan jodoh bali*' })
				} else {
					await m.reply('🔮 *ramalan jodoh bali*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	rejekiweton: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🔮 *rejeki hoki weton*\n\n❌ Butuh: tgl, bln, thn\nContoh: .rejekiweton 1')
		await m.reply('🔮 Loading...')
		try {
			let url = BASE + '/api/primbon/rejeki_hoki_weton'
			
			// GET
			const q = new URLSearchParams()
			
			const p = inp.split(/[,|]/).map(s => s.trim())
			if (p[0]) q.set('tgl', p[0])
			if (p[1]) q.set('bln', p[1])
			if (p[2]) q.set('thn', p[2])
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['tgl'] = p[0]
			if (p[1]) body['bln'] = p[1]
			if (p[2]) body['thn'] = p[2]
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🔮 *rejeki hoki weton*' })
			} else {
				await m.reply('🔮 *rejeki hoki weton*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['tgl'] = p[0]
			if (p[1]) body['bln'] = p[1]
			if (p[2]) body['thn'] = p[2]
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🔮 *rejeki hoki weton*' })
				} else {
					await m.reply('🔮 *rejeki hoki weton*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	zodiak: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🔮 *zodiak*\n\n❌ Butuh: zodiak\nContoh: .zodiak gemini')
		await m.reply('🔮 Loading...')
		try {
			let url = BASE + '/api/primbon/zodiak'
			
			// GET
			const q = new URLSearchParams()
			q.set('zodiak', inp)
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				body['zodiak'] = inp
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🔮 *zodiak*' })
			} else {
				await m.reply('🔮 *zodiak*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['zodiak'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🔮 *zodiak*' })
				} else {
					await m.reply('🔮 *zodiak*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	sifatbisnis: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🔮 *sifat usaha bisnis*\n\n❌ Butuh: tgl, bln, thn\nContoh: .sifatbisnis 1')
		await m.reply('🔮 Loading...')
		try {
			let url = BASE + '/api/primbon/sifat_usaha_bisnis'
			
			// GET
			const q = new URLSearchParams()
			
			const p = inp.split(/[,|]/).map(s => s.trim())
			if (p[0]) q.set('tgl', p[0])
			if (p[1]) q.set('bln', p[1])
			if (p[2]) q.set('thn', p[2])
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['tgl'] = p[0]
			if (p[1]) body['bln'] = p[1]
			if (p[2]) body['thn'] = p[2]
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🔮 *sifat usaha bisnis*' })
			} else {
				await m.reply('🔮 *sifat usaha bisnis*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['tgl'] = p[0]
			if (p[1]) body['bln'] = p[1]
			if (p[2]) body['thn'] = p[2]
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🔮 *sifat usaha bisnis*' })
				} else {
					await m.reply('🔮 *sifat usaha bisnis*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	jodohjawa: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🔮 *ramalan jodoh*\n\n❌ Butuh: nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2\nContoh: .jodohjawa putu')
		await m.reply('🔮 Loading...')
		try {
			let url = BASE + '/api/primbon/ramalanjodoh'
			
			// GET
			const q = new URLSearchParams()
			
			const p = inp.split(/[,|]/).map(s => s.trim())
			if (p[0]) q.set('nama1', p[0])
			if (p[1]) q.set('tgl1', p[1])
			if (p[2]) q.set('bln1', p[2])
			if (p[3]) q.set('thn1', p[3])
			if (p[4]) q.set('nama2', p[4])
			if (p[5]) q.set('tgl2', p[5])
			if (p[6]) q.set('bln2', p[6])
			if (p[7]) q.set('thn2', p[7])
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['nama1'] = p[0]
			if (p[1]) body['tgl1'] = p[1]
			if (p[2]) body['bln1'] = p[2]
			if (p[3]) body['thn1'] = p[3]
			if (p[4]) body['nama2'] = p[4]
			if (p[5]) body['tgl2'] = p[5]
			if (p[6]) body['bln2'] = p[6]
			if (p[7]) body['thn2'] = p[7]
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🔮 *ramalan jodoh*' })
			} else {
				await m.reply('🔮 *ramalan jodoh*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['nama1'] = p[0]
			if (p[1]) body['tgl1'] = p[1]
			if (p[2]) body['bln1'] = p[2]
			if (p[3]) body['thn1'] = p[3]
			if (p[4]) body['nama2'] = p[4]
			if (p[5]) body['tgl2'] = p[5]
			if (p[6]) body['bln2'] = p[6]
			if (p[7]) body['thn2'] = p[7]
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🔮 *ramalan jodoh*' })
				} else {
					await m.reply('🔮 *ramalan jodoh*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	}
}
