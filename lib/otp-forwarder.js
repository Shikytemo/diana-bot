import { copyButton } from 'shileys'

const otpKeywords = [
	'otp',
	'one time password',
	'kode',
	'code',
	'verifikasi',
	'verification',
	'verify',
	'login',
	'masuk',
	'keamanan',
	'security',
	'autentikasi',
	'authentication',
	'pin'
]

const otpCodePattern = /(?<!\d)(?:\d[\s-]?){4,8}(?!\d)/g
const forwardedOtp = new Map()
const forwardedTtlMs = 1000 * 60 * 5

const normalizeNumber = value => String(value || '').split('@')[0].split(':')[0].replace(/\D/g, '')
const ownerJid = config => {
	const number = normalizeNumber(config.ownerNumber)
	return number ? `${number}@s.whatsapp.net` : ''
}

const cleanupForwarded = () => {
	const now = Date.now()
	for (const [key, expiresAt] of forwardedOtp) {
		if (expiresAt <= now) forwardedOtp.delete(key)
	}
}

const hasOtpKeyword = text => {
	const lower = String(text || '').toLowerCase()
	return otpKeywords.some(keyword => lower.includes(keyword))
}

export const extractOtpCodes = text => {
	const codes = []
	for (const match of String(text || '').matchAll(otpCodePattern)) {
		const code = match[0].replace(/\D/g, '')
		if (code.length >= 4 && code.length <= 8) codes.push(code)
	}
	return [...new Set(codes)]
}

export const isOtpMessage = text => hasOtpKeyword(text) && extractOtpCodes(text).length > 0

export const forwardOtpToOwner = async ({ sock, config, jid, sender, text, logger }) => {
	const target = ownerJid(config)
	if (!target || !isOtpMessage(text)) return false

	const senderNumber = normalizeNumber(sender)
	const ownerNumber = normalizeNumber(config.ownerNumber)
	if (senderNumber && senderNumber === ownerNumber) return false

	cleanupForwarded()
	const codes = extractOtpCodes(text)
	const dedupeKey = `${sender}:${jid}:${codes.join(',')}:${text}`
	if (forwardedOtp.has(dedupeKey)) return false
	forwardedOtp.set(dedupeKey, Date.now() + forwardedTtlMs)

	await sock.sendMessage(target, {
		text: [
			'🔐 *OTP masuk ke bot*',
			'',
			`Kode: ${codes.join(', ')}`,
			`Dari: ${sender}`,
			`Chat: ${jid}`,
			'',
			text
		].join('\n'),
		title: '🔐 OTP Forwarder',
		footer: 'Powered by Diana',
		interactiveButtons: [
			copyButton('📋 Copy OTP', codes[0])
		]
	})

	logger?.info({ sender, chat: jid }, 'otp forwarded to owner')
	return true
}
