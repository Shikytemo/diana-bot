import { fetchImage, generateImage, listModels } from '@shikytemo/shitools'

const FLAG_PARSER = /^--([a-zA-Z]+)=(.+)$/

const stripFlags = tokens => {
	const opts = {}
	const rest = []
	for (const token of tokens) {
		const match = FLAG_PARSER.exec(token)
		if (!match) {
			rest.push(token)
			continue
		}
		const [, key, value] = match
		opts[key.toLowerCase()] = value
	}
	return { opts, prompt: rest.join(' ').trim() }
}

const parseSize = value => {
	if (!value) return undefined
	const numeric = Number(value)
	if (!Number.isFinite(numeric)) return undefined
	const clamped = Math.max(64, Math.min(2048, Math.round(numeric)))
	return clamped
}

const parseOptions = opts => {
	const out = {}
	if (opts.model) out.model = String(opts.model).toLowerCase()
	const width = parseSize(opts.width || opts.w)
	const height = parseSize(opts.height || opts.h)
	if (width) out.width = width
	if (height) out.height = height
	if (opts.seed) {
		const seed = Number(opts.seed)
		if (Number.isFinite(seed)) out.seed = Math.floor(seed)
	}
	if (opts.enhance) out.enhance = opts.enhance === 'true'
	if (opts.referrer) out.referrer = String(opts.referrer)
	return out
}

export const generateImageForReply = async args => {
	const tokens = Array.isArray(args) ? args : String(args || '').trim().split(/\s+/).filter(Boolean)
	const { opts, prompt } = stripFlags(tokens)
	if (!prompt) {
		return {
			ok: false,
			text: 'Pakai: .image <prompt> [--model=flux] [--width=1024] [--height=1024] [--seed=42]'
		}
	}
	try {
		const options = parseOptions(opts)
		const built = await generateImage(prompt, options)
		const bytes = await fetchImage(prompt, options)
		const sizeKb = (bytes.byteLength / 1024).toFixed(1)
		const caption = [
			`🎨 *AI Image*`,
			'',
			`📝 Prompt : ${built.prompt}`,
			`🧠 Model  : ${built.model}`,
			`📐 Ukuran : ${built.width}×${built.height}`,
			built.seed != null ? `🎲 Seed   : ${built.seed}` : '',
			`📦 Size   : ${sizeKb} KB`,
			'',
			'Powered by Pollinations.ai'
		].filter(Boolean).join('\n')
		return {
			ok: true,
			image: Buffer.from(bytes),
			imageUrl: built.url,
			caption,
			built
		}
	} catch (error) {
		return { ok: false, text: `Generate image gagal: ${error.message || error}` }
	}
}

export const listImageModelsForReply = async () => {
	try {
		const models = await listModels()
		return {
			ok: true,
			text: ['🧠 *Pollinations Models*', '', ...models.map((m, i) => `${i + 1}. ${m}`)].join('\n'),
			models
		}
	} catch (error) {
		return { ok: false, text: `Gagal ambil daftar model: ${error.message || error}` }
	}
}
