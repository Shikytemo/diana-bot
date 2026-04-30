import { isMedia } from './media.js'

const isText = command => Boolean(command?.text?.trim())

const noText = (prefix, command, example) =>
	[
		'⚠️ *Teksnya belum diisi.*',
		'',
		`Format: ${prefix}${command} <teks>`,
		example ? `Contoh: ${prefix}${command} ${example}` : ''
	].filter(Boolean).join('\n')

const noMedia = (prefix, command) =>
	[
		'⚠️ *Media belum ditemukan.*',
		'',
		`Kirim media dengan caption ${prefix}${command}`,
		`atau reply media lalu ketik ${prefix}${command}.`
	].join('\n')

export { isText, isMedia, noText, noMedia }
