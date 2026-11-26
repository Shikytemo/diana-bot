import { sendRichButtons, sendResult } from './reply.js'
import { quickReplyButton, copyButton } from 'shileys'

// ─── Shared API fetch for siputzx tools ─────────
const BASE = 'https://api.siputzx.my.id'

export async function fetchApi(url, method, body) {
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

export function fmt(data) {
	if (typeof data === 'string') return data
	if (Array.isArray(data)) return data.slice(0, 10).map((x, i) => typeof x === 'object' ? Object.entries(x).slice(0, 3).map(([k, v]) => k + ': ' + v).join(', ') : i + 1 + '. ' + x).join('\n')
	if (typeof data === 'object' && data !== null) return Object.entries(data).filter(([k, v]) => v != null && typeof v !== 'object').slice(0, 25).map(([k, v]) => `┃  *${k}:* ${v}`).join('\n')
	return String(data)
}

// ─── Generic API command handler with native buttons ─────────
export async function handleApiCommand(m, { endpoint, title, emoji, params, method = 'GET' }) {
	const inp = m.command.args?.join(' ') || ''
	const { command, sock, jid, message, replyJid } = m
	const targetJid = replyJid || jid
	const quoted = targetJid === jid ? message : undefined

	if (params?.length && !inp) {
		const paramList = params.map(p => p.name).join(', ')
		const example = params.map(p => p.example || p.name).join(', ')
		await sendRichButtons(sock, targetJid, {
			text: [
				`╭━━━ ${emoji} *${title}* ━━━╮`,
				'┃',
				`┃  ❌ ʙᴜᴛᴜʜ: ${paramList}`,
				`┃  📝 ᴄᴏɴᴛᴏʜ: .${command.name} ${example}`,
				'┃',
				'╰━━━━━━━━━━━━━━━━━━╯'
			].join('\n'),
			title,
			quickReplies: [
				{ text: '📋 ᴍᴇɴᴜ', id: `${command.prefix}menu` }
			]
		}, quoted)
		return
	}

	await m.reply(`${emoji} ʟᴏᴀᴅɪɴɢ...`)

	try {
		let url = BASE + endpoint
		const p = inp.split(/[,|]/).map(s => s.trim())

		if (method === 'GET') {
			const q = new URLSearchParams()
			if (params) {
				params.forEach((param, i) => {
					if (p[i]) q.set(param.name, p[i])
				})
			}
			const qs = q.toString()
			if (qs) url += '?' + qs
		}

		let result = await fetchApi(url, method, method === 'POST' ? Object.fromEntries((params || []).map((param, i) => [param.name, p[i] || ''])) : undefined)

		if (result.type === 'image') {
			await sock.sendMessage(targetJid, { image: { url: result.url }, caption: `${emoji} *${title}*` }, { quoted })
		} else {
			const text = fmt(result.data || result.text).slice(0, 4000)
			await sendResult(sock, targetJid, {
				text: [
					`╭━━━ ${emoji} *${title}* ━━━╮`,
					'┃',
					text,
					'┃',
					'╰━━━━━━━━━━━━━━━━━━╯'
				].join('\n'),
				title,
				copyText: typeof result.data === 'string' ? result.data : undefined
			}, quoted)
		}
	} catch (e) {
		await m.reply(`❌ Gagal: ${e.message}`)
	}
}

export { BASE }
