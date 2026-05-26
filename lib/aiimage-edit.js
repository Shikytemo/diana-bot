import { createCipheriv, createHash, publicEncrypt, randomBytes, randomUUID, constants as cryptoConstants } from 'crypto'
import { tmpdir } from 'os'
import { join } from 'path'
import { mkdtemp, writeFile, rm } from 'fs/promises'
import { uploadFile } from '@shikytemo/shitools'

// ── DeepFakeMaker Auth ──────────────────────────────────────────────
const PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDa2oPxMZe71V4dw2r8rHWt59gH
W5INRmlhepe6GUanrHykqKdlIB4kcJiu8dHC/FJeppOXVoKz82pvwZCmSUrF/1yr
rnmUDjqUefDu8myjhcbio6CnG5TtQfwN2pz3g6yHkLgp8cFfyPSWwyOCMMMsTU9s
snOjvdDb4wiZI8x3UwIDAQAB
-----END PUBLIC KEY-----`
const AUTH_S = 'NHGNy5YFz7HeFb'
const APP_ID = 'ai_df'

const randomStr = len => {
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	const bytes = randomBytes(len)
	let s = ''
	for (let i = 0; i < len; i++) s += chars.charAt(bytes[i] % chars.length)
	return s
}

const aesEncrypt = (data, key, iv) => {
	const cipher = createCipheriv('aes-128-cbc', Buffer.from(key, 'utf8'), Buffer.from(iv, 'utf8'))
	return cipher.update(data, 'utf8', 'base64') + cipher.final('base64')
}

const generateAuth = () => {
	const t = Math.floor(Date.now() / 1000).toString()
	const nonce = randomUUID()
	const tempKey = randomStr(16)
	const encKey = publicEncrypt(
		{ key: PUBLIC_KEY, padding: cryptoConstants.RSA_PKCS1_PADDING },
		Buffer.from(tempKey)
	).toString('base64')
	const sign = aesEncrypt(`${APP_ID}:${AUTH_S}:${t}:${nonce}:${encKey}`, tempKey, tempKey)
	return { app_id: APP_ID, t, nonce, sign, secret_key: encKey }
}

const DF_BASE = 'https://apiv1.deepfakemaker.io/api'
const DF_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'

const dfFetch = async (path, { method = 'GET', body, params } = {}) => {
	const auth = generateAuth()
	const url = new URL(DF_BASE + path)
	if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))
	Object.entries(auth).forEach(([k, v]) => url.searchParams.set(k, v))

	const resp = await fetch(url.toString(), {
		method,
		headers: {
			'User-Agent': DF_UA,
			'Referer': 'https://deepfakemaker.io/',
			...(body ? { 'Content-Type': 'application/json' } : {})
		},
		body: body ? JSON.stringify(body) : undefined
	})

	if (!resp.ok) {
		const text = await resp.text().catch(() => '')
		throw new Error(`DeepFakeMaker ${resp.status}: ${text.slice(0, 200)}`)
	}

	return resp.json()
}

// ── Provider 1: DeepFakeMaker (fast, 5-15s) ────────────────────────
const editWithDeepFakeMaker = async (prompt, imageBuffer) => {
	const userId = randomStr(64).toLowerCase()

	// Upload image
	const fileName = randomStr(32) + '_' + Date.now() + '.jpg'
	const hash = createHash('sha256').update(imageBuffer).digest('hex')
	const signData = await dfFetch('/user/v2/upload-sign', {
		method: 'POST',
		body: { filename: fileName, hash, user_id: userId }
	})
	if (!signData?.data?.url) throw new Error('Gagal mendapat upload URL')

	await fetch(signData.data.url, {
		method: 'PUT',
		headers: { 'content-type': 'image/jpeg' },
		body: imageBuffer
	})
	const imageUrl = 'https://cdn.deepfakemaker.io/' + signData.data.object_name

	// Create task
	const taskData = await dfFetch('/replicate/v1/free/nano/banana/task', {
		method: 'POST',
		body: {
			prompt: prompt.trim(),
			platform: 'nano_banana',
			images: [imageUrl],
			output_format: 'png',
			user_id: userId
		}
	})
	if (!taskData?.data?.task_id) throw new Error('Gagal membuat task: ' + JSON.stringify(taskData).slice(0, 200))

	// Poll for result
	const taskId = taskData.data.task_id
	let resultUrl = null
	for (let i = 0; i < 60; i++) {
		await new Promise(r => setTimeout(r, 2500))
		try {
			const status = await dfFetch('/replicate/v1/free/nano/banana/task', {
				params: { user_id: userId, task_id: taskId }
			})
			if (status.msg === 'success') {
				resultUrl = status.data?.generate_url || status.data?.imageUrl
				if (resultUrl) break
			}
		} catch { /* retry */ }
	}
	if (!resultUrl) throw new Error('DeepFakeMaker timeout')

	// Download result
	const imgResp = await fetch(resultUrl)
	if (!imgResp.ok) throw new Error('Gagal download hasil')
	const buffer = Buffer.from(await imgResp.arrayBuffer())

	return { image: buffer, imageUrl: resultUrl, prompt: prompt.trim(), model: 'nano_banana', sizeKb: (buffer.length / 1024).toFixed(1) }
}

// ── Provider 2: Pollinations (slower, 15-60s, always free) ─────────
const uploadToCatbox = async buffer => {
	const dir = await mkdtemp(join(tmpdir(), 'diana-ei-'))
	const filePath = join(dir, 'image.jpg')
	try {
		await writeFile(filePath, buffer)
		const result = await uploadFile(filePath, { filename: 'image.jpg', contentType: 'image/jpeg' })
		const url = String(result.url || '').trim()
		if (/^https:\/\//.test(url)) return url
		throw new Error('Upload Catbox gagal')
	} finally {
		rm(dir, { recursive: true }).catch(() => {})
	}
}

const editWithPollinations = async (prompt, imageBuffer) => {
	// Upload buffer to get a URL for Pollinations image param
	const imageUrl = await uploadToCatbox(imageBuffer)

	const params = new URLSearchParams({
		model: 'flux',
		width: '1024',
		height: '1024',
		nologo: 'true',
		image: imageUrl
	})

	const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt.trim())}?${params}`
	const controller = new AbortController()
	const timer = setTimeout(() => controller.abort(), 120000)
	let resp
	try {
		resp = await fetch(url, { signal: controller.signal })
	} finally {
		clearTimeout(timer)
	}
	if (!resp.ok) throw new Error(`Pollinations ${resp.status}`)

	const buffer = Buffer.from(await resp.arrayBuffer())
	return { image: buffer, imageUrl: url, prompt: prompt.trim(), model: 'flux', sizeKb: (buffer.length / 1024).toFixed(1) }
}

// ── Main: try DeepFakeMaker, fallback to Pollinations ──────────────
export const editImage = async (prompt, imageBuffer, options = {}) => {
	if (!prompt?.trim()) throw new Error('Prompt wajib diisi')
	if (!imageBuffer) throw new Error('Buffer gambar wajib diisi')

	// If user explicitly picks provider
	const provider = options.provider || 'auto'

	if (provider === 'pollinations') {
		return editWithPollinations(prompt, imageBuffer)
	}

	if (provider === 'deepfakemaker') {
		return editWithDeepFakeMaker(prompt, imageBuffer)
	}

	// Auto: try DeepFakeMaker first, fallback to Pollinations on limit/error
	try {
		return await editWithDeepFakeMaker(prompt, imageBuffer)
	} catch (err) {
		const msg = err.message || ''
		const isLimitError = msg.includes('free usage limit') || msg.includes('401')
		if (!isLimitError) throw err
		// Fallback
		return editWithPollinations(prompt, imageBuffer)
	}
}

// ── Arg parser ──────────────────────────────────────────────────────
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

export const parseEditArgs = args => {
	const tokens = Array.isArray(args) ? args : String(args || '').trim().split(/\s+/).filter(Boolean)
	const { opts, prompt } = stripFlags(tokens)
	const options = {}
	if (opts.model) options.model = String(opts.model).toLowerCase()
	if (opts.provider) options.provider = String(opts.provider).toLowerCase()
	if (opts.seed) {
		const s = Number(opts.seed)
		if (Number.isFinite(s)) options.seed = Math.floor(s)
	}
	return { prompt, options }
}
