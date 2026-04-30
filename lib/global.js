import { isMedia } from './tourl.js'

globalThis.isText = command => Boolean(command?.text?.trim())
globalThis.isMedia = isMedia

globalThis.noText = (prefix, command, example) =>
	[
		'⚠️ *Teksnya belum diisi.*',
		'',
		`Format: ${prefix}${command} <teks>`,
		example ? `Contoh: ${prefix}${command} ${example}` : ''
	].filter(Boolean).join('\n')

globalThis.noMedia = (prefix, command) =>
	[
		'⚠️ *Media belum ditemukan.*',
		'',
		`Kirim media dengan caption ${prefix}${command}`,
		`atau reply media lalu ketik ${prefix}${command}.`
	].join('\n')
