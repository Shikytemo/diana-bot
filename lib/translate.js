import { detectLanguage, translate } from '@shikytemo/shitools'

const DEFAULT_TARGET = 'id'
const FLAG_LANG_REGEX = /^([a-z]{2,5}(?:-[A-Za-z]{2,8})?)$/

const isLikelyLangCode = token => FLAG_LANG_REGEX.test(token)

export const parseTranslateArgs = (rawText, args = []) => {
	const tokens = (args.length ? args : String(rawText || '').trim().split(/\s+/)).filter(Boolean)
	let to = DEFAULT_TARGET
	let from
	const rest = []

	for (const token of tokens) {
		if (token.startsWith('--to=')) to = token.slice(5).toLowerCase()
		else if (token.startsWith('--from=')) from = token.slice(7).toLowerCase()
		else if (rest.length === 0 && isLikelyLangCode(token) && tokens.length > 1) to = token.toLowerCase()
		else rest.push(token)
	}

	const text = rest.join(' ').trim()
	return { text, to, from }
}

export const translateForReply = async (rawText, args = []) => {
	const { text, to, from } = parseTranslateArgs(rawText, args)
	if (!text) {
		return {
			ok: false,
			text: 'Pakai: .tr <text> atau .tr <kode-bahasa> <text>. Contoh: .tr en halo dunia'
		}
	}
	try {
		const result = await translate(text, { to, from })
		const header = `🌐 *${result.sourceLang.toUpperCase()} → ${result.targetLang.toUpperCase()}*`
		return {
			ok: true,
			text: `${header}\n\n${result.text}`,
			result
		}
	} catch (error) {
		return { ok: false, text: `Translate gagal: ${error.message || error}` }
	}
}

export const detectForReply = async input => {
	const trimmed = String(input || '').trim()
	if (!trimmed) {
		return { ok: false, text: 'Pakai: .detect <text>' }
	}
	try {
		const lang = await detectLanguage(trimmed)
		return { ok: true, lang, text: `Bahasa terdeteksi: *${lang.toUpperCase()}*` }
	} catch (error) {
		return { ok: false, text: `Detect gagal: ${error.message || error}` }
	}
}
