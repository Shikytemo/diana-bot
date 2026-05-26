// 🤖 AI Commands

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
	duckai: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🤖 *DuckAI Chat*\n\n❌ Butuh: message\nContoh: .duckai What is the meaning of life?')
		await m.reply('🤖 Loading...')
		try {
			let url = BASE + '/api/ai/duckai'
			
			// GET
			const q = new URLSearchParams()
			
			const p = inp.split(/[,|]/).map(s => s.trim())
			if (p[0]) q.set('message', p[0])
			if (p[1]) q.set('model', p[1])
			if (p[2]) q.set('systemPrompt', p[2])
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['message'] = p[0]
			if (p[1]) body['model'] = p[1]
			if (p[2]) body['systemPrompt'] = p[2]
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🤖 *DuckAI Chat*' })
			} else {
				await m.reply('🤖 *DuckAI Chat*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['message'] = p[0]
			if (p[1]) body['model'] = p[1]
			if (p[2]) body['systemPrompt'] = p[2]
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🤖 *DuckAI Chat*' })
				} else {
					await m.reply('🤖 *DuckAI Chat*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	bibleai: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🤖 *Bible AI*\n\n❌ Butuh: question\nContoh: .bibleai What is faith?')
		await m.reply('🤖 Loading...')
		try {
			let url = BASE + '/api/ai/bibleai'
			
			// GET
			const q = new URLSearchParams()
			
			const p = inp.split(/[,|]/).map(s => s.trim())
			if (p[0]) q.set('question', p[0])
			if (p[1]) q.set('translation', p[1])
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['question'] = p[0]
			if (p[1]) body['translation'] = p[1]
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🤖 *Bible AI*' })
			} else {
				await m.reply('🤖 *Bible AI*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['question'] = p[0]
			if (p[1]) body['translation'] = p[1]
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🤖 *Bible AI*' })
				} else {
					await m.reply('🤖 *Bible AI*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	gptoss: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🤖 *GPT OSS 120B*\n\n❌ Butuh: prompt\nContoh: .gptoss Halo, siapa kamu?')
		await m.reply('🤖 Loading...')
		try {
			let url = BASE + '/api/ai/gptoss120b'
			
			// GET
			const q = new URLSearchParams()
			
			const p = inp.split(/[,|]/).map(s => s.trim())
			if (p[0]) q.set('prompt', p[0])
			if (p[1]) q.set('system', p[1])
			if (p[2]) q.set('temperature', p[2])
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['prompt'] = p[0]
			if (p[1]) body['system'] = p[1]
			if (p[2]) body['temperature'] = p[2]
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🤖 *GPT OSS 120B*' })
			} else {
				await m.reply('🤖 *GPT OSS 120B*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['prompt'] = p[0]
			if (p[1]) body['system'] = p[1]
			if (p[2]) body['temperature'] = p[2]
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🤖 *GPT OSS 120B*' })
				} else {
					await m.reply('🤖 *GPT OSS 120B*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	glm47: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🤖 *GLM 4.7 Flash*\n\n❌ Butuh: prompt\nContoh: .glm47 Halo, siapa kamu?')
		await m.reply('🤖 Loading...')
		try {
			let url = BASE + '/api/ai/glm47flash'
			
			// GET
			const q = new URLSearchParams()
			
			const p = inp.split(/[,|]/).map(s => s.trim())
			if (p[0]) q.set('prompt', p[0])
			if (p[1]) q.set('system', p[1])
			if (p[2]) q.set('temperature', p[2])
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['prompt'] = p[0]
			if (p[1]) body['system'] = p[1]
			if (p[2]) body['temperature'] = p[2]
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🤖 *GLM 4.7 Flash*' })
			} else {
				await m.reply('🤖 *GLM 4.7 Flash*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['prompt'] = p[0]
			if (p[1]) body['system'] = p[1]
			if (p[2]) body['temperature'] = p[2]
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🤖 *GLM 4.7 Flash*' })
				} else {
					await m.reply('🤖 *GLM 4.7 Flash*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	phi2: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🤖 *Phi-2*\n\n❌ Butuh: prompt\nContoh: .phi2 Halo, siapa kamu?')
		await m.reply('🤖 Loading...')
		try {
			let url = BASE + '/api/ai/phi2'
			
			// GET
			const q = new URLSearchParams()
			
			const p = inp.split(/[,|]/).map(s => s.trim())
			if (p[0]) q.set('prompt', p[0])
			if (p[1]) q.set('system', p[1])
			if (p[2]) q.set('temperature', p[2])
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['prompt'] = p[0]
			if (p[1]) body['system'] = p[1]
			if (p[2]) body['temperature'] = p[2]
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🤖 *Phi-2*' })
			} else {
				await m.reply('🤖 *Phi-2*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['prompt'] = p[0]
			if (p[1]) body['system'] = p[1]
			if (p[2]) body['temperature'] = p[2]
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🤖 *Phi-2*' })
				} else {
					await m.reply('🤖 *Phi-2*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	qwq: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🤖 *QwQ 32B*\n\n❌ Butuh: prompt\nContoh: .qwq Halo, siapa kamu?')
		await m.reply('🤖 Loading...')
		try {
			let url = BASE + '/api/ai/qwq32b'
			
			// GET
			const q = new URLSearchParams()
			
			const p = inp.split(/[,|]/).map(s => s.trim())
			if (p[0]) q.set('prompt', p[0])
			if (p[1]) q.set('system', p[1])
			if (p[2]) q.set('temperature', p[2])
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['prompt'] = p[0]
			if (p[1]) body['system'] = p[1]
			if (p[2]) body['temperature'] = p[2]
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🤖 *QwQ 32B*' })
			} else {
				await m.reply('🤖 *QwQ 32B*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['prompt'] = p[0]
			if (p[1]) body['system'] = p[1]
			if (p[2]) body['temperature'] = p[2]
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🤖 *QwQ 32B*' })
				} else {
					await m.reply('🤖 *QwQ 32B*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	deepseek: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🤖 *DeepSeek R1*\n\n❌ Butuh: prompt\nContoh: .deepseek Halo, siapa kamu?')
		await m.reply('🤖 Loading...')
		try {
			let url = BASE + '/api/ai/deepseekr1'
			
			// GET
			const q = new URLSearchParams()
			
			const p = inp.split(/[,|]/).map(s => s.trim())
			if (p[0]) q.set('prompt', p[0])
			if (p[1]) q.set('system', p[1])
			if (p[2]) q.set('temperature', p[2])
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['prompt'] = p[0]
			if (p[1]) body['system'] = p[1]
			if (p[2]) body['temperature'] = p[2]
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🤖 *DeepSeek R1*' })
			} else {
				await m.reply('🤖 *DeepSeek R1*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				
				const p = inp.split(/[,|]/).map(s => s.trim())
				if (p[0]) body['prompt'] = p[0]
			if (p[1]) body['system'] = p[1]
			if (p[2]) body['temperature'] = p[2]
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🤖 *DeepSeek R1*' })
				} else {
					await m.reply('🤖 *DeepSeek R1*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	metaai: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🤖 *meta ai*\n\n❌ Butuh: query\nContoh: .metaai Tell me a fun fact about space.')
		await m.reply('🤖 Loading...')
		try {
			let url = BASE + '/api/ai/metaai'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🤖 *meta ai*' })
			} else {
				await m.reply('🤖 *meta ai*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['query'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🤖 *meta ai*' })
				} else {
					await m.reply('🤖 *meta ai*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	duckimg: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🤖 *DuckAI Image Generator*\n\n❌ Butuh: prompt\nContoh: .duckimg a cat sitting on the moon')
		await m.reply('🤖 Loading...')
		try {
			let url = BASE + '/api/ai/duckaiimage'
			
			// GET
			const q = new URLSearchParams()
			q.set('prompt', inp)
			url += '?' + q
			const result = await fetchApi(url, 'GET')
			
			// Fallback: try POST if GET fails
			if (!result || result.type === 'error') {
				const body = {}
				body['prompt'] = inp
				const result = await fetchApi(url, 'POST', body)
			}
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🤖 *DuckAI Image Generator*' })
			} else {
				await m.reply('🤖 *DuckAI Image Generator*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['prompt'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🤖 *DuckAI Image Generator*' })
				} else {
					await m.reply('🤖 *DuckAI Image Generator*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	},

	gemini: async m => {
		const inp = m.command.args?.join(' ') || ''
		
		await m.reply('🤖 Loading...')
		try {
			let url = BASE + '/api/ai/gemini'
			
			// POST only
			const body = {}
			
			const p = inp.split(/[,|]/).map(s => s.trim())
			if (p[0]) body['content'] = p[0]
			if (p[1]) body['cookie'] = p[1]
			if (p[2]) body['promptSystem'] = p[2]
			if (p[3]) body['imageUrl'] = p[3]
			if (p[4]) body['conversationID'] = p[4]
			if (p[5]) body['responseID'] = p[5]
			if (p[6]) body['choiceID'] = p[6]
			const result = await fetchApi(url, 'POST', body)
			
			
			if (result.type === 'image') {
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🤖 *gemini [ BETA ]*' })
			} else {
				await m.reply('🤖 *gemini [ BETA ]*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			await m.reply('❌ Gagal: ' + e.message)
		}
	},

	gita: async m => {
		const inp = m.command.args?.join(' ') || ''
		if (!inp) return m.reply('🤖 *gita*\n\n❌ Butuh: q\nContoh: .gita What is karma?')
		await m.reply('🤖 Loading...')
		try {
			let url = BASE + '/api/ai/gita'
			
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
				await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🤖 *gita*' })
			} else {
				await m.reply('🤖 *gita*\n\n' + fmt(result.data || result.text).slice(0, 4000))
			}
		} catch (e) {
			
			// Final fallback: POST
			try {
				const body = {}
				body['q'] = inp
				const result = await fetchApi(url, 'POST', body)
				if (result.type === 'image') {
					await m.sock.sendMessage(m.jid, { image: { url: result.url }, caption: '🤖 *gita*' })
				} else {
					await m.reply('🤖 *gita*\n\n' + fmt(result.data || result.text).slice(0, 4000))
				}
			} catch (e2) {
				await m.reply('❌ Gagal: ' + e2.message)
			}
		}
	}
}
