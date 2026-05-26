// 🎨 CANVAS Commands

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
	welcomev1: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🎨 *Welcome V1*\n\n❌ Butuh: username, guildName, guildIcon, memberCount, avatar, background\nContoh: .welcomev1 John')
		await m.reply('🎨 Loading...')
		try {
			let url = BASE + '/api/canvas/welcomev1'
			
			// GET
			const q = new URLSearchParams()
			
			const p = inp.split(/[,|]/).map(s => s.trim())
			if (p[0]) q.set('username', p[0])
			if (p[1]) q.set('guildName', p[1])
			if (p[2]) q.set('guildIcon', p[2])
			if (p[3]) q.set('memberCount', p[3])
			if (p[4]) q.set('avatar', p[4])
			if (p[5]) q.set('background', p[5])
			if (p[6]) q.set('quality', p[6])
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['username'] = p[0]
			if (p[1]) body['guildName'] = p[1]
			if (p[2]) body['guildIcon'] = p[2]
			if (p[3]) body['memberCount'] = p[3]
			if (p[4]) body['avatar'] = p[4]
			if (p[5]) body['background'] = p[5]
			if (p[6]) body['quality'] = p[6]
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Welcome V1*' })
			} else {
				await m.reply('🎨 *Welcome V1*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['username'] = p[0]
			if (p[1]) body['guildName'] = p[1]
			if (p[2]) body['guildIcon'] = p[2]
			if (p[3]) body['memberCount'] = p[3]
			if (p[4]) body['avatar'] = p[4]
			if (p[5]) body['background'] = p[5]
			if (p[6]) body['quality'] = p[6]
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Welcome V1*' })
				} else {
					await m.reply('🎨 *Welcome V1*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	captcha: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🎨 *Captcha Image*\n\n❌ Butuh: background\nContoh: .captcha https://i.ibb.co/4YBNyvP/images-76.jpg')
		await m.reply('🎨 Loading...')
		try {
			let url = BASE + '/api/canvas/captcha'
			
			// GET
			const q = new URLSearchParams()
			
			const p = inp.split(/[,|]/).map(s => s.trim())
			if (p[0]) q.set('background', p[0])
			if (p[1]) q.set('captchaKey', p[1])
			if (p[2]) q.set('border', p[2])
			if (p[3]) q.set('overlayOpacity', p[3])
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['background'] = p[0]
			if (p[1]) body['captchaKey'] = p[1]
			if (p[2]) body['border'] = p[2]
			if (p[3]) body['overlayOpacity'] = p[3]
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Captcha Image*' })
			} else {
				await m.reply('🎨 *Captcha Image*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['background'] = p[0]
			if (p[1]) body['captchaKey'] = p[1]
			if (p[2]) body['border'] = p[2]
			if (p[3]) body['overlayOpacity'] = p[3]
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Captcha Image*' })
				} else {
					await m.reply('🎨 *Captcha Image*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	goodbyev1: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🎨 *Goodbye V1*\n\n❌ Butuh: username, guildName, guildIcon, memberCount, avatar, background\nContoh: .goodbyev1 John')
		await m.reply('🎨 Loading...')
		try {
			let url = BASE + '/api/canvas/goodbyev1'
			
			// GET
			const q = new URLSearchParams()
			
			const p = inp.split(/[,|]/).map(s => s.trim())
			if (p[0]) q.set('username', p[0])
			if (p[1]) q.set('guildName', p[1])
			if (p[2]) q.set('guildIcon', p[2])
			if (p[3]) q.set('memberCount', p[3])
			if (p[4]) q.set('avatar', p[4])
			if (p[5]) q.set('background', p[5])
			if (p[6]) q.set('quality', p[6])
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['username'] = p[0]
			if (p[1]) body['guildName'] = p[1]
			if (p[2]) body['guildIcon'] = p[2]
			if (p[3]) body['memberCount'] = p[3]
			if (p[4]) body['avatar'] = p[4]
			if (p[5]) body['background'] = p[5]
			if (p[6]) body['quality'] = p[6]
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Goodbye V1*' })
			} else {
				await m.reply('🎨 *Goodbye V1*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['username'] = p[0]
			if (p[1]) body['guildName'] = p[1]
			if (p[2]) body['guildIcon'] = p[2]
			if (p[3]) body['memberCount'] = p[3]
			if (p[4]) body['avatar'] = p[4]
			if (p[5]) body['background'] = p[5]
			if (p[6]) body['quality'] = p[6]
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Goodbye V1*' })
				} else {
					await m.reply('🎨 *Goodbye V1*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	profile: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🎨 *Profile Card*\n\n❌ Butuh: backgroundURL, avatarURL, rankName, rankId, exp, requireExp, level, name\nContoh: .profile https://i.ibb.co.com/2jMjYXK/IMG-20250103-WA0469.jpg')
		await m.reply('🎨 Loading...')
		try {
			let url = BASE + '/api/canvas/profile'
			
			// GET
			const q = new URLSearchParams()
			
			const p = inp.split(/[,|]/).map(s => s.trim())
			if (p[0]) q.set('backgroundURL', p[0])
			if (p[1]) q.set('avatarURL', p[1])
			if (p[2]) q.set('rankName', p[2])
			if (p[3]) q.set('rankId', p[3])
			if (p[4]) q.set('exp', p[4])
			if (p[5]) q.set('requireExp', p[5])
			if (p[6]) q.set('level', p[6])
			if (p[7]) q.set('name', p[7])
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['backgroundURL'] = p[0]
			if (p[1]) body['avatarURL'] = p[1]
			if (p[2]) body['rankName'] = p[2]
			if (p[3]) body['rankId'] = p[3]
			if (p[4]) body['exp'] = p[4]
			if (p[5]) body['requireExp'] = p[5]
			if (p[6]) body['level'] = p[6]
			if (p[7]) body['name'] = p[7]
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Profile Card*' })
			} else {
				await m.reply('🎨 *Profile Card*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['backgroundURL'] = p[0]
			if (p[1]) body['avatarURL'] = p[1]
			if (p[2]) body['rankName'] = p[2]
			if (p[3]) body['rankId'] = p[3]
			if (p[4]) body['exp'] = p[4]
			if (p[5]) body['requireExp'] = p[5]
			if (p[6]) body['level'] = p[6]
			if (p[7]) body['name'] = p[7]
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Profile Card*' })
				} else {
					await m.reply('🎨 *Profile Card*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	blur: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🎨 *Blur Image Effect*\n\n❌ Butuh: image\nContoh: .blur https://i.ibb.co/9rtTrVy/download-1.jpg')
		await m.reply('🎨 Loading...')
		try {
			let url = BASE + '/api/canvas/blur'
			
			// GET
			const q = new URLSearchParams()
			q.set('image', inp)
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				body['image'] = inp
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Blur Image Effect*' })
			} else {
				await m.reply('🎨 *Blur Image Effect*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['image'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Blur Image Effect*' })
				} else {
					await m.reply('🎨 *Blur Image Effect*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	security: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🎨 *Security Card*\n\n❌ Butuh: avatar, background, createdTimestamp, suspectTimestamp, locale\nContoh: .security https://i.ibb.co/1s8T3sY/48f7ce63c7aa.jpg')
		await m.reply('🎨 Loading...')
		try {
			let url = BASE + '/api/canvas/security'
			
			// GET
			const q = new URLSearchParams()
			
			const p = inp.split(/[,|]/).map(s => s.trim())
			if (p[0]) q.set('avatar', p[0])
			if (p[1]) q.set('background', p[1])
			if (p[2]) q.set('createdTimestamp', p[2])
			if (p[3]) q.set('suspectTimestamp', p[3])
			if (p[4]) q.set('locale', p[4])
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['avatar'] = p[0]
			if (p[1]) body['background'] = p[1]
			if (p[2]) body['createdTimestamp'] = p[2]
			if (p[3]) body['suspectTimestamp'] = p[3]
			if (p[4]) body['locale'] = p[4]
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Security Card*' })
			} else {
				await m.reply('🎨 *Security Card*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['avatar'] = p[0]
			if (p[1]) body['background'] = p[1]
			if (p[2]) body['createdTimestamp'] = p[2]
			if (p[3]) body['suspectTimestamp'] = p[3]
			if (p[4]) body['locale'] = p[4]
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Security Card*' })
				} else {
					await m.reply('🎨 *Security Card*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	sertifikat-tolol: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🎨 *Sertifikat Tolol*\n\n❌ Butuh: text\nContoh: .sertifikat-tolol lorem ipsum!')
		await m.reply('🎨 Loading...')
		try {
			let url = BASE + '/api/canvas/sertifikat-tolol'
			
			// GET
			const q = new URLSearchParams()
			q.set('text', inp)
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				body['text'] = inp
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Sertifikat Tolol*' })
			} else {
				await m.reply('🎨 *Sertifikat Tolol*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['text'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Sertifikat Tolol*' })
				} else {
					await m.reply('🎨 *Sertifikat Tolol*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	facepalm: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🎨 *Facepalm Image*\n\n❌ Butuh: image\nContoh: .facepalm https://i.ibb.co/9rtTrVy/download-1.jpg')
		await m.reply('🎨 Loading...')
		try {
			let url = BASE + '/api/canvas/facepalm'
			
			// GET
			const q = new URLSearchParams()
			q.set('image', inp)
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				body['image'] = inp
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Facepalm Image*' })
			} else {
				await m.reply('🎨 *Facepalm Image*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['image'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Facepalm Image*' })
				} else {
					await m.reply('🎨 *Facepalm Image*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	goodbyev4: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🎨 *Goodbye V4*\n\n❌ Butuh: avatar, background, title, description\nContoh: .goodbyev4 https://i.ibb.co/1s8T3sY/48f7ce63c7aa.jpg')
		await m.reply('🎨 Loading...')
		try {
			let url = BASE + '/api/canvas/goodbyev4'
			
			// GET
			const q = new URLSearchParams()
			
			const p = inp.split(/[,|]/).map(s => s.trim())
			if (p[0]) q.set('avatar', p[0])
			if (p[1]) q.set('background', p[1])
			if (p[2]) q.set('title', p[2])
			if (p[3]) q.set('description', p[3])
			if (p[4]) q.set('border', p[4])
			if (p[5]) q.set('avatarBorder', p[5])
			if (p[6]) q.set('overlayOpacity', p[6])
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['avatar'] = p[0]
			if (p[1]) body['background'] = p[1]
			if (p[2]) body['title'] = p[2]
			if (p[3]) body['description'] = p[3]
			if (p[4]) body['border'] = p[4]
			if (p[5]) body['avatarBorder'] = p[5]
			if (p[6]) body['overlayOpacity'] = p[6]
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Goodbye V4*' })
			} else {
				await m.reply('🎨 *Goodbye V4*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['avatar'] = p[0]
			if (p[1]) body['background'] = p[1]
			if (p[2]) body['title'] = p[2]
			if (p[3]) body['description'] = p[3]
			if (p[4]) body['border'] = p[4]
			if (p[5]) body['avatarBorder'] = p[5]
			if (p[6]) body['overlayOpacity'] = p[6]
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Goodbye V4*' })
				} else {
					await m.reply('🎨 *Goodbye V4*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	gay: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🎨 *Gay Image*\n\n❌ Butuh: nama, avatar, num\nContoh: .gay Lendra')
		await m.reply('🎨 Loading...')
		try {
			let url = BASE + '/api/canvas/gay'
			
			// GET
			const q = new URLSearchParams()
			
			const p = inp.split(/[,|]/).map(s => s.trim())
			if (p[0]) q.set('nama', p[0])
			if (p[1]) q.set('avatar', p[1])
			if (p[2]) q.set('num', p[2])
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['nama'] = p[0]
			if (p[1]) body['avatar'] = p[1]
			if (p[2]) body['num'] = p[2]
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Gay Image*' })
			} else {
				await m.reply('🎨 *Gay Image*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['nama'] = p[0]
			if (p[1]) body['avatar'] = p[1]
			if (p[2]) body['num'] = p[2]
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Gay Image*' })
				} else {
					await m.reply('🎨 *Gay Image*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	ship: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🎨 *Ship Image*\n\n❌ Butuh: avatar1, avatar2, background, persen\nContoh: .ship https://i.ibb.co.com/Yc4MVdV/images.jpg')
		await m.reply('🎨 Loading...')
		try {
			let url = BASE + '/api/canvas/ship'
			
			// GET
			const q = new URLSearchParams()
			
			const p = inp.split(/[,|]/).map(s => s.trim())
			if (p[0]) q.set('avatar1', p[0])
			if (p[1]) q.set('avatar2', p[1])
			if (p[2]) q.set('background', p[2])
			if (p[3]) q.set('persen', p[3])
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['avatar1'] = p[0]
			if (p[1]) body['avatar2'] = p[1]
			if (p[2]) body['background'] = p[2]
			if (p[3]) body['persen'] = p[3]
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Ship Image*' })
			} else {
				await m.reply('🎨 *Ship Image*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['avatar1'] = p[0]
			if (p[1]) body['avatar2'] = p[1]
			if (p[2]) body['background'] = p[2]
			if (p[3]) body['persen'] = p[3]
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Ship Image*' })
				} else {
					await m.reply('🎨 *Ship Image*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	welcomev5: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🎨 *Welcome V5*\n\n❌ Butuh: username, guildName, memberCount, avatar, background\nContoh: .welcomev5 Zero Two')
		await m.reply('🎨 Loading...')
		try {
			let url = BASE + '/api/canvas/welcomev5'
			
			// GET
			const q = new URLSearchParams()
			
			const p = inp.split(/[,|]/).map(s => s.trim())
			if (p[0]) q.set('username', p[0])
			if (p[1]) q.set('guildName', p[1])
			if (p[2]) q.set('memberCount', p[2])
			if (p[3]) q.set('avatar', p[3])
			if (p[4]) q.set('background', p[4])
			if (p[5]) q.set('quality', p[5])
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['username'] = p[0]
			if (p[1]) body['guildName'] = p[1]
			if (p[2]) body['memberCount'] = p[2]
			if (p[3]) body['avatar'] = p[3]
			if (p[4]) body['background'] = p[4]
			if (p[5]) body['quality'] = p[5]
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Welcome V5*' })
			} else {
				await m.reply('🎨 *Welcome V5*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['username'] = p[0]
			if (p[1]) body['guildName'] = p[1]
			if (p[2]) body['memberCount'] = p[2]
			if (p[3]) body['avatar'] = p[3]
			if (p[4]) body['background'] = p[4]
			if (p[5]) body['quality'] = p[5]
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Welcome V5*' })
				} else {
					await m.reply('🎨 *Welcome V5*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	batslap: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🎨 *Batslap Image*\n\n❌ Butuh: image1, image2\nContoh: .batslap https://i.ibb.co/1s8T3sY/48f7ce63c7aa.jpg')
		await m.reply('🎨 Loading...')
		try {
			let url = BASE + '/api/canvas/batslap'
			
			// GET
			const q = new URLSearchParams()
			
			const p = inp.split(/[,|]/).map(s => s.trim())
			if (p[0]) q.set('image1', p[0])
			if (p[1]) q.set('image2', p[1])
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['image1'] = p[0]
			if (p[1]) body['image2'] = p[1]
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Batslap Image*' })
			} else {
				await m.reply('🎨 *Batslap Image*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['image1'] = p[0]
			if (p[1]) body['image2'] = p[1]
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Batslap Image*' })
				} else {
					await m.reply('🎨 *Batslap Image*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	greyscale: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🎨 *Greyscale Image*\n\n❌ Butuh: image\nContoh: .greyscale https://i.ibb.co/1s8T3sY/48f7ce63c7aa.jpg')
		await m.reply('🎨 Loading...')
		try {
			let url = BASE + '/api/canvas/greyscale'
			
			// GET
			const q = new URLSearchParams()
			q.set('image', inp)
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				body['image'] = inp
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Greyscale Image*' })
			} else {
				await m.reply('🎨 *Greyscale Image*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['image'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Greyscale Image*' })
				} else {
					await m.reply('🎨 *Greyscale Image*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	darkness: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🎨 *Darkness Image Effect*\n\n❌ Butuh: image\nContoh: .darkness https://i.ibb.co/9rtTrVy/download-1.jpg')
		await m.reply('🎨 Loading...')
		try {
			let url = BASE + '/api/canvas/darkness'
			
			// GET
			const q = new URLSearchParams()
			
			const p = inp.split(/[,|]/).map(s => s.trim())
			if (p[0]) q.set('image', p[0])
			if (p[1]) q.set('amount', p[1])
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['image'] = p[0]
			if (p[1]) body['amount'] = p[1]
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Darkness Image Effect*' })
			} else {
				await m.reply('🎨 *Darkness Image Effect*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['image'] = p[0]
			if (p[1]) body['amount'] = p[1]
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Darkness Image Effect*' })
				} else {
					await m.reply('🎨 *Darkness Image Effect*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	kiss: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🎨 *Kiss Image*\n\n❌ Butuh: image1, image2\nContoh: .kiss https://i.ibb.co/1s8T3sY/48f7ce63c7aa.jpg')
		await m.reply('🎨 Loading...')
		try {
			let url = BASE + '/api/canvas/kiss'
			
			// GET
			const q = new URLSearchParams()
			
			const p = inp.split(/[,|]/).map(s => s.trim())
			if (p[0]) q.set('image1', p[0])
			if (p[1]) q.set('image2', p[1])
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['image1'] = p[0]
			if (p[1]) body['image2'] = p[1]
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Kiss Image*' })
			} else {
				await m.reply('🎨 *Kiss Image*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['image1'] = p[0]
			if (p[1]) body['image2'] = p[1]
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Kiss Image*' })
				} else {
					await m.reply('🎨 *Kiss Image*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	goodbyev5: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🎨 *Goodbye V5*\n\n❌ Butuh: username, guildName, memberCount, avatar, background\nContoh: .goodbyev5 Zero Two')
		await m.reply('🎨 Loading...')
		try {
			let url = BASE + '/api/canvas/goodbyev5'
			
			// GET
			const q = new URLSearchParams()
			
			const p = inp.split(/[,|]/).map(s => s.trim())
			if (p[0]) q.set('username', p[0])
			if (p[1]) q.set('guildName', p[1])
			if (p[2]) q.set('memberCount', p[2])
			if (p[3]) q.set('avatar', p[3])
			if (p[4]) q.set('background', p[4])
			if (p[5]) q.set('quality', p[5])
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['username'] = p[0]
			if (p[1]) body['guildName'] = p[1]
			if (p[2]) body['memberCount'] = p[2]
			if (p[3]) body['avatar'] = p[3]
			if (p[4]) body['background'] = p[4]
			if (p[5]) body['quality'] = p[5]
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Goodbye V5*' })
			} else {
				await m.reply('🎨 *Goodbye V5*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['username'] = p[0]
			if (p[1]) body['guildName'] = p[1]
			if (p[2]) body['memberCount'] = p[2]
			if (p[3]) body['avatar'] = p[3]
			if (p[4]) body['background'] = p[4]
			if (p[5]) body['quality'] = p[5]
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Goodbye V5*' })
				} else {
					await m.reply('🎨 *Goodbye V5*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	circle: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🎨 *Circle Image*\n\n❌ Butuh: image\nContoh: .circle https://i.ibb.co/9rtTrVy/download-1.jpg')
		await m.reply('🎨 Loading...')
		try {
			let url = BASE + '/api/canvas/circle'
			
			// GET
			const q = new URLSearchParams()
			q.set('image', inp)
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				body['image'] = inp
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Circle Image*' })
			} else {
				await m.reply('🎨 *Circle Image*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['image'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Circle Image*' })
				} else {
					await m.reply('🎨 *Circle Image*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	fake-xnxx: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🎨 *Fake XNXX Comment*\n\n❌ Butuh: name, quote\nContoh: .fake-xnxx Nelson Mandela')
		await m.reply('🎨 Loading...')
		try {
			let url = BASE + '/api/canvas/fake-xnxx'
			
			// GET
			const q = new URLSearchParams()
			
			const p = inp.split(/[,|]/).map(s => s.trim())
			if (p[0]) q.set('name', p[0])
			if (p[1]) q.set('quote', p[1])
			if (p[2]) q.set('likes', p[2])
			if (p[3]) q.set('dislikes', p[3])
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['name'] = p[0]
			if (p[1]) body['quote'] = p[1]
			if (p[2]) body['likes'] = p[2]
			if (p[3]) body['dislikes'] = p[3]
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Fake XNXX Comment*' })
			} else {
				await m.reply('🎨 *Fake XNXX Comment*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['name'] = p[0]
			if (p[1]) body['quote'] = p[1]
			if (p[2]) body['likes'] = p[2]
			if (p[3]) body['dislikes'] = p[3]
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Fake XNXX Comment*' })
				} else {
					await m.reply('🎨 *Fake XNXX Comment*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	spotify: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🎨 *Spotify Card*\n\n❌ Butuh: title, artist, start, end, image\nContoh: .spotify Blinding Lights')
		await m.reply('🎨 Loading...')
		try {
			let url = BASE + '/api/canvas/spotify'
			
			// GET
			const q = new URLSearchParams()
			
			const p = inp.split(/[,|]/).map(s => s.trim())
			if (p[0]) q.set('title', p[0])
			if (p[1]) q.set('artist', p[1])
			if (p[2]) q.set('start', p[2])
			if (p[3]) q.set('end', p[3])
			if (p[4]) q.set('image', p[4])
			if (p[5]) q.set('album', p[5])
			if (p[6]) q.set('border', p[6])
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['title'] = p[0]
			if (p[1]) body['artist'] = p[1]
			if (p[2]) body['start'] = p[2]
			if (p[3]) body['end'] = p[3]
			if (p[4]) body['image'] = p[4]
			if (p[5]) body['album'] = p[5]
			if (p[6]) body['border'] = p[6]
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Spotify Card*' })
			} else {
				await m.reply('🎨 *Spotify Card*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['title'] = p[0]
			if (p[1]) body['artist'] = p[1]
			if (p[2]) body['start'] = p[2]
			if (p[3]) body['end'] = p[3]
			if (p[4]) body['image'] = p[4]
			if (p[5]) body['album'] = p[5]
			if (p[6]) body['border'] = p[6]
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Spotify Card*' })
				} else {
					await m.reply('🎨 *Spotify Card*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	goodbyev3: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🎨 *Goodbye V3*\n\n❌ Butuh: username, avatar\nContoh: .goodbyev3 John')
		await m.reply('🎨 Loading...')
		try {
			let url = BASE + '/api/canvas/goodbyev3'
			
			// GET
			const q = new URLSearchParams()
			
			const p = inp.split(/[,|]/).map(s => s.trim())
			if (p[0]) q.set('username', p[0])
			if (p[1]) q.set('avatar', p[1])
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['username'] = p[0]
			if (p[1]) body['avatar'] = p[1]
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Goodbye V3*' })
			} else {
				await m.reply('🎨 *Goodbye V3*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['username'] = p[0]
			if (p[1]) body['avatar'] = p[1]
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Goodbye V3*' })
				} else {
					await m.reply('🎨 *Goodbye V3*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	ektp: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🎨 *eKTP Generator*\n\n❌ Butuh: provinsi, kota, nik, nama, ttl, jenis_kelamin, golongan_darah, alamat, rt/rw, kel/desa, kecamatan, agama, status, pekerjaan, kewarganegaraan, masa_berlaku, terbuat, pas_photo\nContoh: .ektp JAWA BARAT')
		await m.reply('🎨 Loading...')
		try {
			let url = BASE + '/api/canvas/ektp'
			
			// GET
			const q = new URLSearchParams()
			
			const p = inp.split(/[,|]/).map(s => s.trim())
			if (p[0]) q.set('provinsi', p[0])
			if (p[1]) q.set('kota', p[1])
			if (p[2]) q.set('nik', p[2])
			if (p[3]) q.set('nama', p[3])
			if (p[4]) q.set('ttl', p[4])
			if (p[5]) q.set('jenis_kelamin', p[5])
			if (p[6]) q.set('golongan_darah', p[6])
			if (p[7]) q.set('alamat', p[7])
			if (p[8]) q.set('rt/rw', p[8])
			if (p[9]) q.set('kel/desa', p[9])
			if (p[10]) q.set('kecamatan', p[10])
			if (p[11]) q.set('agama', p[11])
			if (p[12]) q.set('status', p[12])
			if (p[13]) q.set('pekerjaan', p[13])
			if (p[14]) q.set('kewarganegaraan', p[14])
			if (p[15]) q.set('masa_berlaku', p[15])
			if (p[16]) q.set('terbuat', p[16])
			if (p[17]) q.set('pas_photo', p[17])
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['provinsi'] = p[0]
			if (p[1]) body['kota'] = p[1]
			if (p[2]) body['nik'] = p[2]
			if (p[3]) body['nama'] = p[3]
			if (p[4]) body['ttl'] = p[4]
			if (p[5]) body['jenis_kelamin'] = p[5]
			if (p[6]) body['golongan_darah'] = p[6]
			if (p[7]) body['alamat'] = p[7]
			if (p[8]) body['rt/rw'] = p[8]
			if (p[9]) body['kel/desa'] = p[9]
			if (p[10]) body['kecamatan'] = p[10]
			if (p[11]) body['agama'] = p[11]
			if (p[12]) body['status'] = p[12]
			if (p[13]) body['pekerjaan'] = p[13]
			if (p[14]) body['kewarganegaraan'] = p[14]
			if (p[15]) body['masa_berlaku'] = p[15]
			if (p[16]) body['terbuat'] = p[16]
			if (p[17]) body['pas_photo'] = p[17]
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *eKTP Generator*' })
			} else {
				await m.reply('🎨 *eKTP Generator*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['provinsi'] = p[0]
			if (p[1]) body['kota'] = p[1]
			if (p[2]) body['nik'] = p[2]
			if (p[3]) body['nama'] = p[3]
			if (p[4]) body['ttl'] = p[4]
			if (p[5]) body['jenis_kelamin'] = p[5]
			if (p[6]) body['golongan_darah'] = p[6]
			if (p[7]) body['alamat'] = p[7]
			if (p[8]) body['rt/rw'] = p[8]
			if (p[9]) body['kel/desa'] = p[9]
			if (p[10]) body['kecamatan'] = p[10]
			if (p[11]) body['agama'] = p[11]
			if (p[12]) body['status'] = p[12]
			if (p[13]) body['pekerjaan'] = p[13]
			if (p[14]) body['kewarganegaraan'] = p[14]
			if (p[15]) body['masa_berlaku'] = p[15]
			if (p[16]) body['terbuat'] = p[16]
			if (p[17]) body['pas_photo'] = p[17]
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *eKTP Generator*' })
				} else {
					await m.reply('🎨 *eKTP Generator*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	tweet: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🎨 *Tweet Card*\n\n❌ Butuh: displayName, username, comment, avatar\nContoh: .tweet Gemini')
		await m.reply('🎨 Loading...')
		try {
			let url = BASE + '/api/canvas/tweet'
			
			// GET
			const q = new URLSearchParams()
			
			const p = inp.split(/[,|]/).map(s => s.trim())
			if (p[0]) q.set('displayName', p[0])
			if (p[1]) q.set('username', p[1])
			if (p[2]) q.set('comment', p[2])
			if (p[3]) q.set('avatar', p[3])
			if (p[4]) q.set('verified', p[4])
			if (p[5]) q.set('theme', p[5])
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['displayName'] = p[0]
			if (p[1]) body['username'] = p[1]
			if (p[2]) body['comment'] = p[2]
			if (p[3]) body['avatar'] = p[3]
			if (p[4]) body['verified'] = p[4]
			if (p[5]) body['theme'] = p[5]
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Tweet Card*' })
			} else {
				await m.reply('🎨 *Tweet Card*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['displayName'] = p[0]
			if (p[1]) body['username'] = p[1]
			if (p[2]) body['comment'] = p[2]
			if (p[3]) body['avatar'] = p[3]
			if (p[4]) body['verified'] = p[4]
			if (p[5]) body['theme'] = p[5]
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Tweet Card*' })
				} else {
					await m.reply('🎨 *Tweet Card*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	welcomev2: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🎨 *Welcome V2*\n\n❌ Butuh: username, guildName, memberCount, avatar, background\nContoh: .welcomev2 John')
		await m.reply('🎨 Loading...')
		try {
			let url = BASE + '/api/canvas/welcomev2'
			
			// GET
			const q = new URLSearchParams()
			
			const p = inp.split(/[,|]/).map(s => s.trim())
			if (p[0]) q.set('username', p[0])
			if (p[1]) q.set('guildName', p[1])
			if (p[2]) q.set('memberCount', p[2])
			if (p[3]) q.set('avatar', p[3])
			if (p[4]) q.set('background', p[4])
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['username'] = p[0]
			if (p[1]) body['guildName'] = p[1]
			if (p[2]) body['memberCount'] = p[2]
			if (p[3]) body['avatar'] = p[3]
			if (p[4]) body['background'] = p[4]
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Welcome V2*' })
			} else {
				await m.reply('🎨 *Welcome V2*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['username'] = p[0]
			if (p[1]) body['guildName'] = p[1]
			if (p[2]) body['memberCount'] = p[2]
			if (p[3]) body['avatar'] = p[3]
			if (p[4]) body['background'] = p[4]
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Welcome V2*' })
				} else {
					await m.reply('🎨 *Welcome V2*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	affect: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🎨 *Affect Image*\n\n❌ Butuh: image\nContoh: .affect https://i.ibb.co/1s8T3sY/48f7ce63c7aa.jpg')
		await m.reply('🎨 Loading...')
		try {
			let url = BASE + '/api/canvas/affect'
			
			// GET
			const q = new URLSearchParams()
			q.set('image', inp)
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				body['image'] = inp
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Affect Image*' })
			} else {
				await m.reply('🎨 *Affect Image*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['image'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Affect Image*' })
				} else {
					await m.reply('🎨 *Affect Image*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	xnxx: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🎨 *Fake XNXX Image*\n\n❌ Butuh: title, image\nContoh: .xnxx Lari ada wibu')
		await m.reply('🎨 Loading...')
		try {
			let url = BASE + '/api/canvas/xnxx'
			
			// GET
			const q = new URLSearchParams()
			
			const p = inp.split(/[,|]/).map(s => s.trim())
			if (p[0]) q.set('title', p[0])
			if (p[1]) q.set('image', p[1])
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['title'] = p[0]
			if (p[1]) body['image'] = p[1]
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Fake XNXX Image*' })
			} else {
				await m.reply('🎨 *Fake XNXX Image*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['title'] = p[0]
			if (p[1]) body['image'] = p[1]
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Fake XNXX Image*' })
				} else {
					await m.reply('🎨 *Fake XNXX Image*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	beautiful: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🎨 *Beautiful Image Effect*\n\n❌ Butuh: image\nContoh: .beautiful https://i.ibb.co/9rtTrVy/download-1.jpg')
		await m.reply('🎨 Loading...')
		try {
			let url = BASE + '/api/canvas/beautiful'
			
			// GET
			const q = new URLSearchParams()
			q.set('image', inp)
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				body['image'] = inp
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Beautiful Image Effect*' })
			} else {
				await m.reply('🎨 *Beautiful Image Effect*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['image'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Beautiful Image Effect*' })
				} else {
					await m.reply('🎨 *Beautiful Image Effect*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	welcomev3: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🎨 *Welcome V3*\n\n❌ Butuh: username, avatar\nContoh: .welcomev3 John')
		await m.reply('🎨 Loading...')
		try {
			let url = BASE + '/api/canvas/welcomev3'
			
			// GET
			const q = new URLSearchParams()
			
			const p = inp.split(/[,|]/).map(s => s.trim())
			if (p[0]) q.set('username', p[0])
			if (p[1]) q.set('avatar', p[1])
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['username'] = p[0]
			if (p[1]) body['avatar'] = p[1]
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Welcome V3*' })
			} else {
				await m.reply('🎨 *Welcome V3*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['username'] = p[0]
			if (p[1]) body['avatar'] = p[1]
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Welcome V3*' })
				} else {
					await m.reply('🎨 *Welcome V3*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	invert: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🎨 *Invert Image*\n\n❌ Butuh: image\nContoh: .invert https://i.ibb.co/1s8T3sY/48f7ce63c7aa.jpg')
		await m.reply('🎨 Loading...')
		try {
			let url = BASE + '/api/canvas/invert'
			
			// GET
			const q = new URLSearchParams()
			q.set('image', inp)
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				body['image'] = inp
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Invert Image*' })
			} else {
				await m.reply('🎨 *Invert Image*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['image'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Invert Image*' })
				} else {
					await m.reply('🎨 *Invert Image*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	welcomev4: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🎨 *Welcome V4*\n\n❌ Butuh: avatar, background, description\nContoh: .welcomev4 https://i.ibb.co/1s8T3sY/48f7ce63c7aa.jpg')
		await m.reply('🎨 Loading...')
		try {
			let url = BASE + '/api/canvas/welcomev4'
			
			// GET
			const q = new URLSearchParams()
			
			const p = inp.split(/[,|]/).map(s => s.trim())
			if (p[0]) q.set('avatar', p[0])
			if (p[1]) q.set('background', p[1])
			if (p[2]) q.set('description', p[2])
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['avatar'] = p[0]
			if (p[1]) body['background'] = p[1]
			if (p[2]) body['description'] = p[2]
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Welcome V4*' })
			} else {
				await m.reply('🎨 *Welcome V4*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['avatar'] = p[0]
			if (p[1]) body['background'] = p[1]
			if (p[2]) body['description'] = p[2]
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Welcome V4*' })
				} else {
					await m.reply('🎨 *Welcome V4*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	level-up: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🎨 *Level Up Card*\n\n❌ Butuh: backgroundURL, avatarURL, fromLevel, toLevel, name\nContoh: .level-up https://i.ibb.co.com/2jMjYXK/IMG-20250103-WA0469.jpg')
		await m.reply('🎨 Loading...')
		try {
			let url = BASE + '/api/canvas/level-up'
			
			// GET
			const q = new URLSearchParams()
			
			const p = inp.split(/[,|]/).map(s => s.trim())
			if (p[0]) q.set('backgroundURL', p[0])
			if (p[1]) q.set('avatarURL', p[1])
			if (p[2]) q.set('fromLevel', p[2])
			if (p[3]) q.set('toLevel', p[3])
			if (p[4]) q.set('name', p[4])
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['backgroundURL'] = p[0]
			if (p[1]) body['avatarURL'] = p[1]
			if (p[2]) body['fromLevel'] = p[2]
			if (p[3]) body['toLevel'] = p[3]
			if (p[4]) body['name'] = p[4]
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Level Up Card*' })
			} else {
				await m.reply('🎨 *Level Up Card*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['backgroundURL'] = p[0]
			if (p[1]) body['avatarURL'] = p[1]
			if (p[2]) body['fromLevel'] = p[2]
			if (p[3]) body['toLevel'] = p[3]
			if (p[4]) body['name'] = p[4]
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Level Up Card*' })
				} else {
					await m.reply('🎨 *Level Up Card*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	goodbyev2: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🎨 *Goodbye V2*\n\n❌ Butuh: username, guildName, memberCount, avatar, background\nContoh: .goodbyev2 John')
		await m.reply('🎨 Loading...')
		try {
			let url = BASE + '/api/canvas/goodbyev2'
			
			// GET
			const q = new URLSearchParams()
			
			const p = inp.split(/[,|]/).map(s => s.trim())
			if (p[0]) q.set('username', p[0])
			if (p[1]) q.set('guildName', p[1])
			if (p[2]) q.set('memberCount', p[2])
			if (p[3]) q.set('avatar', p[3])
			if (p[4]) q.set('background', p[4])
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['username'] = p[0]
			if (p[1]) body['guildName'] = p[1]
			if (p[2]) body['memberCount'] = p[2]
			if (p[3]) body['avatar'] = p[3]
			if (p[4]) body['background'] = p[4]
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Goodbye V2*' })
			} else {
				await m.reply('🎨 *Goodbye V2*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['username'] = p[0]
			if (p[1]) body['guildName'] = p[1]
			if (p[2]) body['memberCount'] = p[2]
			if (p[3]) body['avatar'] = p[3]
			if (p[4]) body['background'] = p[4]
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Goodbye V2*' })
				} else {
					await m.reply('🎨 *Goodbye V2*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	top: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🎨 *Top Leaderboard*\n\n❌ Butuh: background, usersData\nContoh: .top https://i.ibb.co/4YBNyvP/images-76.jpg')
		await m.reply('🎨 Loading...')
		try {
			let url = BASE + '/api/canvas/top'
			
			// GET
			const q = new URLSearchParams()
			
			const p = inp.split(/[,|]/).map(s => s.trim())
			if (p[0]) q.set('background', p[0])
			if (p[1]) q.set('usersData', p[1])
			if (p[2]) q.set('scoreMessage', p[2])
			if (p[3]) q.set('opacity', p[3])
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['background'] = p[0]
			if (p[1]) body['usersData'] = p[1]
			if (p[2]) body['scoreMessage'] = p[2]
			if (p[3]) body['opacity'] = p[3]
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Top Leaderboard*' })
			} else {
				await m.reply('🎨 *Top Leaderboard*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['background'] = p[0]
			if (p[1]) body['usersData'] = p[1]
			if (p[2]) body['scoreMessage'] = p[2]
			if (p[3]) body['opacity'] = p[3]
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Top Leaderboard*' })
				} else {
					await m.reply('🎨 *Top Leaderboard*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	delete: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🎨 *Delete Image*\n\n❌ Butuh: image\nContoh: .delete https://i.ibb.co/1s8T3sY/48f7ce63c7aa.jpg')
		await m.reply('🎨 Loading...')
		try {
			let url = BASE + '/api/canvas/delete'
			
			// GET
			const q = new URLSearchParams()
			q.set('image', inp)
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				body['image'] = inp
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Delete Image*' })
			} else {
				await m.reply('🎨 *Delete Image*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['image'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🎨 *Delete Image*' })
				} else {
					await m.reply('🎨 *Delete Image*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	}
}
