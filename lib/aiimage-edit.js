const ENDPOINT = 'https://image.pollinations.ai/prompt'
const DEFAULT_MODEL = 'flux'
const DEFAULT_WIDTH = 1024
const DEFAULT_HEIGHT = 1024

const FLAG_PARSER = /^--([a-zA-Z]+)=(.+)$/

const stripFlags = tokens => {
	const opts = {}
	const rest = []
	for (const token of tokens) {
		const match = FLAG_PARSER.exec(token)
		if (!match) { rest.push(token); continue }
		const [, key, value] = match
		opts[key.toLowerCase()] = value
	}
	return { opts, prompt: rest.join(' ').trim() }
}

const parseSize = v => {
	const n = Number(v)
	return Number.isFinite(n) ? Math.max(64, Math.min(2048, Math.round(n))) : undefined
}

export const editImage = async (prompt, imageUrl, options = {}) => {
	if (!prompt?.trim()) throw new Error('Prompt wajib diisi')
	if (!imageUrl) throw new Error('URL gambar wajib diisi')

	const model = options.model || DEFAULT_MODEL
	const width = options.width || DEFAULT_WIDTH
	const height = options.height || DEFAULT_HEIGHT

	const params = new URLSearchParams({
		model,
		width: String(width),
		height: String(height),
		nologo: 'true',
		image: imageUrl
	})
	if (options.seed != null) params.set('seed', String(options.seed))

	const url = `${ENDPOINT}/${encodeURIComponent(prompt.trim())}?${params}`
	const resp = await fetch(url)
	if (!resp.ok) throw new Error(`Pollinations responded ${resp.status}`)

	const buffer = await resp.arrayBuffer()
	return {
		image: Buffer.from(buffer),
		imageUrl: url,
		prompt: prompt.trim(),
		model,
		width,
		height,
		sizeKb: (buffer.byteLength / 1024).toFixed(1)
	}
}

export const parseEditArgs = args => {
	const tokens = Array.isArray(args) ? args : String(args || '').trim().split(/\s+/).filter(Boolean)
	const { opts, prompt } = stripFlags(tokens)
	const options = {}
	if (opts.model) options.model = String(opts.model).toLowerCase()
	const w = parseSize(opts.width || opts.w)
	const h = parseSize(opts.height || opts.h)
	if (w) options.width = w
	if (h) options.height = h
	if (opts.seed) {
		const s = Number(opts.seed)
		if (Number.isFinite(s)) options.seed = Math.floor(s)
	}
	return { prompt, options }
}
