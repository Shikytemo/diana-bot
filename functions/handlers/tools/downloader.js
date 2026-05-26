// ⬇️ DOWNLOADER Commands

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
	capcut: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('⬇️ *capcut*\n\n❌ Butuh: url\nContoh: .capcut https://www.capcut.com/tv2/ZSmm1R7Sd/ jj kece banget')
		await m.reply('⬇️ Loading...')
		try {
			let url = BASE + '/api/d/capcut'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '⬇️ *capcut*' })
			} else {
				await m.reply('⬇️ *capcut*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['url'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '⬇️ *capcut*' })
				} else {
					await m.reply('⬇️ *capcut*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	gdrive: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('⬇️ *gdrive*\n\n❌ Butuh: url\nContoh: .gdrive https://drive.google.com/file/d/1YTD7Ymux9puFNqu__5WPlYdFZHcGI3Wz/view?usp=drivesdk')
		await m.reply('⬇️ Loading...')
		try {
			let url = BASE + '/api/d/gdrive'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '⬇️ *gdrive*' })
			} else {
				await m.reply('⬇️ *gdrive*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['url'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '⬇️ *gdrive*' })
				} else {
					await m.reply('⬇️ *gdrive*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	spotify: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('⬇️ *Spotify*\n\n❌ Butuh: url\nContoh: .spotify https://open.spotify.com/intl-id/track/5EWyweCJ5igLl6bjbGRmGm')
		await m.reply('⬇️ Loading...')
		try {
			let url = BASE + '/api/d/spotify'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '⬇️ *Spotify*' })
			} else {
				await m.reply('⬇️ *Spotify*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['url'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '⬇️ *Spotify*' })
				} else {
					await m.reply('⬇️ *Spotify*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	savefrom: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('⬇️ *SaveFrom Downloader*\n\n❌ Butuh: url\nContoh: .savefrom https://m.soundcloud.com/teguh-hariyadi-652597010/anji-dia')
		await m.reply('⬇️ Loading...')
		try {
			let url = BASE + '/api/d/savefrom'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '⬇️ *SaveFrom Downloader*' })
			} else {
				await m.reply('⬇️ *SaveFrom Downloader*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['url'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '⬇️ *SaveFrom Downloader*' })
				} else {
					await m.reply('⬇️ *SaveFrom Downloader*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	github: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('⬇️ *github downloader*\n\n❌ Butuh: url\nContoh: .github https://gist.github.com/siputzx/966268a3aa3c14695e80cc9f30da8e9f')
		await m.reply('⬇️ Loading...')
		try {
			let url = BASE + '/api/d/github'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '⬇️ *github downloader*' })
			} else {
				await m.reply('⬇️ *github downloader*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['url'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '⬇️ *github downloader*' })
				} else {
					await m.reply('⬇️ *github downloader*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	douyin: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('⬇️ *douyin downloader*\n\n❌ Butuh: url\nContoh: .douyin https://www.douyin.com/video/7256984651137289483')
		await m.reply('⬇️ Loading...')
		try {
			let url = BASE + '/api/d/douyin'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '⬇️ *douyin downloader*' })
			} else {
				await m.reply('⬇️ *douyin downloader*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['url'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '⬇️ *douyin downloader*' })
				} else {
					await m.reply('⬇️ *douyin downloader*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	lahelu: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('⬇️ *lahelu downloader*\n\n❌ Butuh: url\nContoh: .lahelu https://lahelu.com/post/PMujNAfxy')
		await m.reply('⬇️ Loading...')
		try {
			let url = BASE + '/api/d/lahelu'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '⬇️ *lahelu downloader*' })
			} else {
				await m.reply('⬇️ *lahelu downloader*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['url'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '⬇️ *lahelu downloader*' })
				} else {
					await m.reply('⬇️ *lahelu downloader*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	soundcloud: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('⬇️ *soundCloud*\n\n❌ Butuh: url\nContoh: .soundcloud https://m.soundcloud.com/teguh-hariyadi-652597010/anji-dia')
		await m.reply('⬇️ Loading...')
		try {
			let url = BASE + '/api/d/soundcloud'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '⬇️ *soundCloud*' })
			} else {
				await m.reply('⬇️ *soundCloud*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['url'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '⬇️ *soundCloud*' })
				} else {
					await m.reply('⬇️ *soundCloud*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	snackvideo: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('⬇️ *snack video*\n\n❌ Butuh: url\nContoh: .snackvideo https://s.snackvideo.com/p/dwlMd51U')
		await m.reply('⬇️ Loading...')
		try {
			let url = BASE + '/api/d/snackvideo'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '⬇️ *snack video*' })
			} else {
				await m.reply('⬇️ *snack video*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['url'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '⬇️ *snack video*' })
				} else {
					await m.reply('⬇️ *snack video*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	spotifyv2: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('⬇️ *spotify v2*\n\n❌ Butuh: url\nContoh: .spotifyv2 https://open.spotify.com/track/4iV5W9uYEdYUVa79Axb7Rh')
		await m.reply('⬇️ Loading...')
		try {
			let url = BASE + '/api/d/spotifyv2'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '⬇️ *spotify v2*' })
			} else {
				await m.reply('⬇️ *spotify v2*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['url'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '⬇️ *spotify v2*' })
				} else {
					await m.reply('⬇️ *spotify v2*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	tiktok: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('⬇️ *tiktok*\n\n❌ Butuh: url\nContoh: .tiktok https://vt.tiktok.com/ZSjXNEnbC/')
		await m.reply('⬇️ Loading...')
		try {
			let url = BASE + '/api/d/tiktok'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '⬇️ *tiktok*' })
			} else {
				await m.reply('⬇️ *tiktok*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['url'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '⬇️ *tiktok*' })
				} else {
					await m.reply('⬇️ *tiktok*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	fastdl: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('⬇️ *fastdl instagram downloader*\n\n❌ Butuh: url\nContoh: .fastdl siputzx_')
		await m.reply('⬇️ Loading...')
		try {
			let url = BASE + '/api/d/fastdl'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '⬇️ *fastdl instagram downloader*' })
			} else {
				await m.reply('⬇️ *fastdl instagram downloader*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['url'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '⬇️ *fastdl instagram downloader*' })
				} else {
					await m.reply('⬇️ *fastdl instagram downloader*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	igram: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('⬇️ *igram downloader*\n\n❌ Butuh: url\nContoh: .igram https://www.instagram.com/reel/xxx/')
		await m.reply('⬇️ Loading...')
		try {
			let url = BASE + '/api/d/igram'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '⬇️ *igram downloader*' })
			} else {
				await m.reply('⬇️ *igram downloader*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['url'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '⬇️ *igram downloader*' })
				} else {
					await m.reply('⬇️ *igram downloader*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	tiktokv2: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('⬇️ *tiktok v2*\n\n❌ Butuh: url\nContoh: .tiktokv2 https://vt.tiktok.com/ZSjXNEnbC/')
		await m.reply('⬇️ Loading...')
		try {
			let url = BASE + '/api/d/tiktok/v2'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '⬇️ *tiktok v2*' })
			} else {
				await m.reply('⬇️ *tiktok v2*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['url'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '⬇️ *tiktok v2*' })
				} else {
					await m.reply('⬇️ *tiktok v2*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	twitter: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('⬇️ *twitter downloader*\n\n❌ Butuh: url\nContoh: .twitter https://twitter.com/9GAG/status/1661175429859012608')
		await m.reply('⬇️ Loading...')
		try {
			let url = BASE + '/api/d/twitter'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '⬇️ *twitter downloader*' })
			} else {
				await m.reply('⬇️ *twitter downloader*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['url'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '⬇️ *twitter downloader*' })
				} else {
					await m.reply('⬇️ *twitter downloader*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	ssstwiter: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('⬇️ *SSSTWITER Downloader*\n\n❌ Butuh: url\nContoh: .ssstwiter https://x.com/i/status/2010954966978998484')
		await m.reply('⬇️ Loading...')
		try {
			let url = BASE + '/api/d/ssstwiter'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '⬇️ *SSSTWITER Downloader*' })
			} else {
				await m.reply('⬇️ *SSSTWITER Downloader*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['url'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '⬇️ *SSSTWITER Downloader*' })
				} else {
					await m.reply('⬇️ *SSSTWITER Downloader*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	facebook: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('⬇️ *facebook*\n\n❌ Butuh: url\nContoh: .facebook https://www.facebook.com/share/r/1CbPCn9MQw/')
		await m.reply('⬇️ Loading...')
		try {
			let url = BASE + '/api/d/facebook'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '⬇️ *facebook*' })
			} else {
				await m.reply('⬇️ *facebook*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['url'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '⬇️ *facebook*' })
				} else {
					await m.reply('⬇️ *facebook*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	ytpost: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('⬇️ *Youtube Community*\n\n❌ Butuh: url\nContoh: .ytpost http://youtube.com/post/UgkxHU_brINfE3uqhUT_bdhQu-QVNQVIzYKL?si=LXSX98EhAKJfjDne')
		await m.reply('⬇️ Loading...')
		try {
			let url = BASE + '/api/d/ytpost'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '⬇️ *Youtube Community*' })
			} else {
				await m.reply('⬇️ *Youtube Community*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['url'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '⬇️ *Youtube Community*' })
				} else {
					await m.reply('⬇️ *Youtube Community*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	sssinstagram: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('⬇️ *sssinstagram downloader*\n\n❌ Butuh: url\nContoh: .sssinstagram siputzx_')
		await m.reply('⬇️ Loading...')
		try {
			let url = BASE + '/api/d/sssinstagram'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '⬇️ *sssinstagram downloader*' })
			} else {
				await m.reply('⬇️ *sssinstagram downloader*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['url'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '⬇️ *sssinstagram downloader*' })
				} else {
					await m.reply('⬇️ *sssinstagram downloader*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	ummy: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('⬇️ *ummy downloader*\n\n❌ Butuh: url\nContoh: .ummy nasaartemis')
		await m.reply('⬇️ Loading...')
		try {
			let url = BASE + '/api/d/ummy'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '⬇️ *ummy downloader*' })
			} else {
				await m.reply('⬇️ *ummy downloader*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['url'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '⬇️ *ummy downloader*' })
				} else {
					await m.reply('⬇️ *ummy downloader*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	rednote: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('⬇️ *rednote*\n\n❌ Butuh: url\nContoh: .rednote https://xhslink.com/a/b1c2')
		await m.reply('⬇️ Loading...')
		try {
			let url = BASE + '/api/d/rednote'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '⬇️ *rednote*' })
			} else {
				await m.reply('⬇️ *rednote*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['url'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '⬇️ *rednote*' })
				} else {
					await m.reply('⬇️ *rednote*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	}
}
