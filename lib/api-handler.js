import { getById, getRegistry, getByCategory } from './api-registry.js'
import { sendUrlButton } from './reply.js'
import { withContextInfo } from './reply-style.js'

const extractPath = (obj, path) => {
	if (!path || !obj) return obj
	const parts = path.replace(/^\$\.?/, '').split(/\.|\[|\]/).filter(Boolean)
	let current = obj
	for (const part of parts) {
		if (current == null) return null
		current = current[part]
	}
	return current
}

const formatJson = (data, depth = 0) => {
	if (!data || typeof data !== 'object') return String(data ?? '')
	const indent = '  '.repeat(depth)
	if (Array.isArray(data)) {
		if (data.length === 0) return '[]'
		if (data.length <= 5 && depth < 2) {
			return data.map((item, i) => {
				const formatted = formatJson(item, depth + 1)
				return `${indent}${i + 1}. ${formatted}`
			}).join('\n')
		}
		return data.slice(0, 10).map((item, i) => {
			const formatted = typeof item === 'object' ? formatJson(item, depth + 1) : String(item)
			return `${indent}${i + 1}. ${formatted}`
		}).join('\n') + (data.length > 10 ? `\n${indent}... dan ${data.length - 10} lainnya` : '')
	}
	return Object.entries(data)
		.filter(([k, v]) => v != null && typeof v !== 'object')
		.map(([k, v]) => `${indent}${k}: ${v}`)
		.join('\n')
}

export const apiCommandForReply = async (id, input) => {
	const entry = getById(id)
	if (!entry) return { ok: false, text: `API "${id}" tidak ditemukan.` }

	try {
		let url = entry.url
		if (entry.needsInput && input) {
			url = entry.url + encodeURIComponent(input)
		}

		const res = await fetch(url)
		if (!res.ok) throw new Error(`HTTP ${res.status}`)

		const contentType = res.headers.get('content-type') || ''
		let data

		if (contentType.includes('image') || entry.type === 'image') {
			return { ok: true, imageUrl: url, type: 'image' }
		}

		if (contentType.includes('json')) {
			data = await res.json()
		} else {
			const text = await res.text()
			return { ok: true, text, type: 'text' }
		}

		// Extract specific path
		if (entry.responsePath && entry.type !== 'json') {
			const extracted = extractPath(data, entry.responsePath)
			if (extracted != null) {
				if (typeof extracted === 'string') {
					return { ok: true, text: extracted, type: 'text' }
				}
				if (typeof extracted === 'object' && extracted.url) {
					return { ok: true, imageUrl: extracted.url, type: 'image' }
				}
			}
		}

		// Format JSON output
		const formatted = formatJson(data)
		const header = `${entry.emoji || '📡'} *${entry.name}*`
		const text = formatted ? `${header}\n\n${formatted}` : `${header}\n\nTidak ada data.`
		return { ok: true, text, type: 'text', data }
	} catch (error) {
		return { ok: false, text: `${entry.name} gagal: ${error.message || error}` }
	}
}

export const apiCategoryList = () => {
	const cats = {}
	for (const entry of getRegistry()) {
		cats[entry.category] ||= []
		cats[entry.category].push(entry)
	}
	return cats
}

export const apiListText = () => {
	const cats = apiCategoryList()
	const lines = ['📡 *API Command List*\n']
	for (const [cat, entries] of Object.entries(cats)) {
		lines.push(`── ${cat.toUpperCase()} ──`)
		for (const e of entries) {
			const input = e.needsInput ? ' <query>' : ''
			lines.push(`  ${e.emoji} .api ${e.id}${input} — ${e.description}`)
		}
		lines.push('')
	}
	return lines.join('\n')
}
