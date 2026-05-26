// Tools & Converters — TTS, OCR, Color, Timezone, Unit, Shortlink, etc.

// ── TTS (Text-to-Speech) via Google Translate TTS ──
const TTS_LANGS = {
	id: 'Indonesian', en: 'English', ja: 'Japanese', ko: 'Korean', zh: 'Chinese',
	es: 'Spanish', fr: 'French', de: 'German', it: 'Italian', pt: 'Portuguese',
	ru: 'Russian', ar: 'Arabic', hi: 'Hindi', th: 'Thai', vi: 'Vietnamese',
	ms: 'Malay', tl: 'Filipino', nl: 'Dutch', pl: 'Polish', tr: 'Turkish',
	sv: 'Swedish', da: 'Danish', fi: 'Finnish', no: 'Norwegian', el: 'Greek',
	cs: 'Czech', ro: 'Romanian', hu: 'Hungarian', uk: 'Ukrainian', he: 'Hebrew'
}

const ttsGenerate = async (text, lang = 'id') => {
	const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=${lang}&client=tw-ob`
	const res = await fetch(url, {
		headers: { 'User-Agent': 'Mozilla/5.0' }
	})
	if (!res.ok) throw new Error('TTS gagal')
	const buffer = Buffer.from(await res.arrayBuffer())
	return { buffer, lang }
}

// ── Color Converter ──
const hexToRgb = hex => {
	const h = hex.replace('#', '')
	return { r: parseInt(h.substring(0, 2), 16), g: parseInt(h.substring(2, 4), 16), b: parseInt(h.substring(4, 6), 16) }
}

const rgbToHex = (r, g, b) => '#' + [r, g, b].map(c => Math.max(0, Math.min(255, Math.round(c))).toString(16).padStart(2, '0')).join('')

const rgbToHsl = (r, g, b) => {
	r /= 255; g /= 255; b /= 255
	const max = Math.max(r, g, b), min = Math.min(r, g, b)
	let h, s, l = (max + min) / 2
	if (max === min) { h = s = 0 } else {
		const d = max - min
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
		switch (max) {
			case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
			case g: h = ((b - r) / d + 2) / 6; break
			case b: h = ((r - g) / d + 4) / 6; break
		}
	}
	return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}

const hslToRgb = (h, s, l) => {
	h /= 360; s /= 100; l /= 100
	let r, g, b
	if (s === 0) { r = g = b = l } else {
		const hue2rgb = (p, q, t) => { if (t < 0) t += 1; if (t > 1) t -= 1; if (t < 1/6) return p + (q - p) * 6 * t; if (t < 1/2) return q; if (t < 2/3) return p + (q - p) * (2/3 - t) * 6; return p }
		const q = l < 0.5 ? l * (1 + s) : l + s - l * s
		const p = 2 * l - q
		r = hue2rgb(p, q, h + 1/3); g = hue2rgb(p, q, h); b = hue2rgb(p, q, h - 1/3)
	}
	return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) }
}

// ── Timezone ──
const TIMEZONES = [
	{ id: 'WIB', offset: 7, name: 'Waktu Indonesia Barat', cities: 'Jakarta, Bandung, Surabaya' },
	{ id: 'WITA', offset: 8, name: 'Waktu Indonesia Tengah', cities: 'Bali, Makassar, Lombok' },
	{ id: 'WIT', offset: 9, name: 'Waktu Indonesia Timur', cities: 'Jayapura, Ambon, Manokwari' },
	{ id: 'UTC', offset: 0, name: 'UTC/GMT', cities: 'London, Dublin, Lisbon' },
	{ id: 'JST', offset: 9, name: 'Japan Standard Time', cities: 'Tokyo, Osaka, Seoul' },
	{ id: 'CST', offset: 8, name: 'China Standard Time', cities: 'Beijing, Shanghai, Taipei' },
	{ id: 'IST', offset: 5.5, name: 'India Standard Time', cities: 'Mumbai, Delhi, Bangalore' },
	{ id: 'EST', offset: -5, name: 'Eastern Standard Time', cities: 'New York, Miami, Toronto' },
	{ id: 'PST', offset: -8, name: 'Pacific Standard Time', cities: 'Los Angeles, Seattle, Vancouver' },
	{ id: 'CET', offset: 1, name: 'Central European Time', cities: 'Paris, Berlin, Rome, Madrid' },
	{ id: 'AEST', offset: 10, name: 'Australian Eastern', cities: 'Sydney, Melbourne, Brisbane' },
	{ id: 'NZST', offset: 12, name: 'New Zealand Time', cities: 'Auckland, Wellington' },
	{ id: 'SGT', offset: 8, name: 'Singapore Time', cities: 'Singapore, Kuala Lumpur' },
	{ id: 'HKT', offset: 8, name: 'Hong Kong Time', cities: 'Hong Kong' },
	{ id: 'THA', offset: 7, name: 'Thailand Time', cities: 'Bangkok, Chiang Mai' },
	{ id: 'MYT', offset: 8, name: 'Malaysia Time', cities: 'Kuala Lumpur' },
	{ id: 'PHT', offset: 8, name: 'Philippine Time', cities: 'Manila, Cebu' },
	{ id: 'KST', offset: 9, name: 'Korean Standard Time', cities: 'Seoul, Busan' },
	{ id: 'GST', offset: 4, name: 'Gulf Standard Time', cities: 'Dubai, Abu Dhabi' },
	{ id: 'MST', offset: -7, name: 'Mountain Standard Time', cities: 'Denver, Phoenix' },
]

// ── Unit Converter ──
const UNIT_CONVERSIONS = {
	// Length
	'km_mi': (v) => v * 0.621371, 'mi_km': (v) => v * 1.60934,
	'm_ft': (v) => v * 3.28084, 'ft_m': (v) => v * 0.3048,
	'cm_in': (v) => v * 0.393701, 'in_cm': (v) => v * 2.54,
	'km_m': (v) => v * 1000, 'm_km': (v) => v / 1000,
	'yd_m': (v) => v * 0.9144, 'm_yd': (v) => v * 1.09361,
	'nm_km': (v) => v * 1.852, 'km_nm': (v) => v / 1.852,
	// Weight
	'kg_lb': (v) => v * 2.20462, 'lb_kg': (v) => v * 0.453592,
	'g_oz': (v) => v * 0.035274, 'oz_g': (v) => v * 28.3495,
	'kg_g': (v) => v * 1000, 'g_kg': (v) => v / 1000,
	't_kg': (v) => v * 1000, 'kg_t': (v) => v / 1000,
	// Temperature
	'c_f': (v) => (v * 9/5) + 32, 'f_c': (v) => (v - 32) * 5/9,
	'c_k': (v) => v + 273.15, 'k_c': (v) => v - 273.15,
	'f_k': (v) => (v - 32) * 5/9 + 273.15, 'k_f': (v) => (v - 273.15) * 9/5 + 32,
	// Volume
	'l_gal': (v) => v * 0.264172, 'gal_l': (v) => v * 3.78541,
	'l_ml': (v) => v * 1000, 'ml_l': (v) => v / 1000,
	'l_cup': (v) => v * 4.22675, 'cup_l': (v) => v * 0.236588,
	// Speed
	'kmh_mph': (v) => v * 0.621371, 'mph_kmh': (v) => v * 1.60934,
	'ms_kmh': (v) => v * 3.6, 'kmh_ms': (v) => v / 3.6,
	'kn_kmh': (v) => v * 1.852, 'kmh_kn': (v) => v / 1.852,
	// Data
	'gb_mb': (v) => v * 1024, 'mb_gb': (v) => v / 1024,
	'tb_gb': (v) => v * 1024, 'gb_tb': (v) => v / 1024,
	'mb_kb': (v) => v * 1024, 'kb_mb': (v) => v / 1024,
	'gb_tb': (v) => v / 1024, 'pb_tb': (v) => v * 1024,
	// Area
	'ha_ac': (v) => v * 2.47105, 'ac_ha': (v) => v * 0.404686,
	'sqm_sqft': (v) => v * 10.7639, 'sqft_sqm': (v) => v * 0.092903,
	'km2_mi2': (v) => v * 0.386102, 'mi2_km2': (v) => v * 2.58999,
	// Pressure
	'pa_psi': (v) => v * 0.000145038, 'psi_pa': (v) => v * 6894.76,
	'bar_psi': (v) => v * 14.5038, 'psi_bar': (v) => v * 0.0689476,
	'atm_pa': (v) => v * 101325, 'pa_atm': (v) => v / 101325,
}

const UNIT_LABELS = {
	km: 'Kilometer', mi: 'Mile', m: 'Meter', ft: 'Feet', cm: 'Centimeter', in: 'Inch',
	yd: 'Yard', nm: 'Nautical Mile', kg: 'Kilogram', lb: 'Pound', g: 'Gram', oz: 'Ounce',
	t: 'Ton', c: 'Celsius', f: 'Fahrenheit', k: 'Kelvin', l: 'Liter', gal: 'Gallon',
	ml: 'Milliliter', cup: 'Cup', kmh: 'km/h', mph: 'mph', ms: 'm/s', kn: 'Knot',
	gb: 'GB', mb: 'MB', tb: 'TB', kb: 'KB', pb: 'PB', ha: 'Hectare', ac: 'Acre',
	sqm: 'm²', sqft: 'ft²', km2: 'km²', mi2: 'mi²', pa: 'Pascal', psi: 'PSI',
	bar: 'Bar', atm: 'Atmosphere'
}

// ── Placeholder Image Generator ──
const placeholderGenerate = (width, height, text, bgColor = '333333', textColor = 'ffffff') => {
	return `https://placehold.co/${width}x${height}/${bgColor}/${textColor}?text=${encodeURIComponent(text || `${width}x${height}`)}`
}

// ── Lorem Ipsum Generator ──
const loremWords = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum'.split(' ')

const loremGenerate = (count = 5) => {
	const sentences = []
	for (let i = 0; i < count; i++) {
		const len = 8 + Math.floor(Math.random() * 12)
		const words = Array.from({ length: len }, () => loremWords[Math.floor(Math.random() * loremWords.length)])
		words[0] = words[0][0].toUpperCase() + words[0].slice(1)
		sentences.push(words.join(' ') + '.')
	}
	return sentences.join(' ')
}

// ── Text Tools ──
const textReverse = s => s.split('').reverse().join('')
const textSort = s => s.split('\n').sort().join('\n')
const textShuffle = s => s.split('').sort(() => Math.random() - 0.5).join('')
const textCount = s => `Karakter: ${s.length}\nKata: ${s.split(/\s+/).filter(Boolean).length}\nBaris: ${s.split('\n').length}\nHuruf: ${s.replace(/[^a-z]/gi, '').length}\nAngka: ${s.replace(/[^0-9]/g, '').length}\nSpasi: ${s.split(' ').length - 1}`
const textRepeat = (s, n = 3) => s.repeat(Math.min(n, 10))
const textUpper = s => s.toUpperCase()
const textLower = s => s.toLowerCase()
const textTitle = s => s.replace(/\b\w/g, c => c.toUpperCase())
const textCapitalize = s => s.charAt(0).toUpperCase() + s.slice(1)
const textTrim = s => s.trim()
const textPad = (s, n = 20) => s.padEnd(Math.min(n, 100), ' ')
const textCenter = (s, n = 20) => { const pad = Math.max(0, n - s.length); const left = Math.floor(pad / 2); return ' '.repeat(left) + s + ' '.repeat(pad - left) }
const textStrip = s => s.replace(/<[^>]*>/g, '')
const textSlug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const textCamel = s => s.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase())
const textSnake = s => s.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_|_$/g, '')
const textKebab = s => s.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '')
const textPascal = s => s.replace(/(^|[^a-zA-Z0-9]+)(.)/g, (_, _s, c) => c.toUpperCase())

// ── Password Generator ──
const passwordGenerate = (length = 16, options = {}) => {
	const { upper = true, lower = true, numbers = true, symbols = true } = options
	let chars = ''
	if (upper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
	if (lower) chars += 'abcdefghijklmnopqrstuvwxyz'
	if (numbers) chars += '0123456789'
	if (symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?'
	if (!chars) chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
	return Array.from({ length: Math.min(length, 64) }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

// ── UUID Generator ──
const uuidGenerate = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
	const r = Math.random() * 16 | 0
	return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
})

// ── QR Code via API ──
const qrGenerate = (text, size = 300) => `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`

// ── Barcode via API ──
const barcodeGenerate = (text, format = 'CODE128') => `https://barcodeapi.org/api/${format}/${encodeURIComponent(text)}`

export const commands = {
	// ── TTS ──
	tts: async m => {
		const { command, reply } = m
		const lang = command.args[0]?.length === 2 ? command.args[0] : 'id'
		const text = command.args[0]?.length === 2 ? command.args.slice(1).join(' ') : command.text
		if (!text) {
			await reply(`🔊 *Text-to-Speech*\n\nFormat: .tts [lang] <teks>\nContoh: .tts id Halo semuanya\n\nBahasa: ${Object.entries(TTS_LANGS).map(([k, v]) => `${k}=${v}`).join(', ')}`)
			return
		}
		try {
			const { buffer } = await ttsGenerate(text.slice(0, 200), lang)
			await reply({ audio: buffer, mimetype: 'audio/mp3', ptt: false })
		} catch (e) {
			await reply(`TTS gagal: ${e.message || e}`)
		}
	},

	// ── Color Converter ──
	color: async m => {
		const { command, reply } = m
		const input = command.text
		if (!input) {
			await reply('🎨 *Color Converter*\n\nFormat: .color <hex/rgb>\nContoh:\n.color #ff6600\n.color 255,102,0')
			return
		}
		let r, g, b
		if (input.startsWith('#')) {
			const rgb = hexToRgb(input)
			r = rgb.r; g = rgb.g; b = rgb.b
		} else {
			const parts = input.split(/[,\s]+/).map(Number)
			if (parts.length !== 3 || parts.some(isNaN)) {
				await reply('Format salah. Gunakan #hex atau r,g,b')
				return
			}
			r = parts[0]; g = parts[1]; b = parts[2]
		}
		const hex = rgbToHex(r, g, b)
		const hsl = rgbToHsl(r, g, b)
		const css = `rgb(${r}, ${g}, ${b})`
		await reply([
			'🎨 *Color Info*',
			'',
			`HEX: ${hex}`,
			`RGB: ${css}`,
			`HSL: hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
			`Preview: ${placeholderGenerate(200, 100, hex, hex.slice(1), 'ffffff')}`,
			'',
			`Complement: ${rgbToHex(255 - r, 255 - g, 255 - b)}`,
			`Lighter: ${rgbToHex(Math.min(255, r + 50), Math.min(255, g + 50), Math.min(255, b + 50))}`,
			`Darker: ${rgbToHex(Math.max(0, r - 50), Math.max(0, g - 50), Math.max(0, b - 50))}`
		].join('\n'))
	},

	// ── Timezone ──
	timezone: async m => {
		const { command, reply } = m
		const tzId = command.args[0]?.toUpperCase()
		if (!tzId) {
			await reply([
				'🕐 *Timezone Info*',
				'',
				'Format: .timezone <id>',
				'',
				TIMEZONES.map(t => `• ${t.id} — ${t.name} (UTC${t.offset >= 0 ? '+' : ''}${t.offset})`).join('\n'),
				'',
				'Contoh: .timezone WIB'
			].join('\n'))
			return
		}
		const tz = TIMEZONES.find(t => t.id === tzId)
		if (!tz) {
			await reply(`Timezone "${tzId}" tidak ditemukan. Ketik .timezone untuk list.`)
			return
		}
		const now = new Date()
		const utc = now.getTime() + now.getTimezoneOffset() * 60000
		const tzTime = new Date(utc + tz.offset * 3600000)
		const timeStr = tzTime.toLocaleString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
		const dateStr = tzTime.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
		await reply([
			`🕐 *${tz.name}*`,
			'',
			`⏰ ${timeStr}`,
			`📅 ${dateStr}`,
			`UTC${tz.offset >= 0 ? '+' : ''}${tz.offset}`,
			`🏙️ ${tz.cities}`
		].join('\n'))
	},

	tz: async m => await m.commands.timezone(m),

	// ── Unit Converter ──
	convert: async m => {
		const { command, reply } = m
		const [valueStr, fromTo] = command.args
		if (!valueStr || !fromTo) {
			await reply([
				'📐 *Unit Converter*',
				'',
				'Format: .convert <value> <from_to>',
				'Contoh: .convert 100 km_mi',
				'',
				'Length: km_mi, mi_km, m_ft, ft_m, cm_in, in_cm, km_m, m_km',
				'Weight: kg_lb, lb_kg, g_oz, oz_g, kg_g, g_kg, t_kg',
				'Temp: c_f, f_c, c_k, k_c, f_k, k_f',
				'Volume: l_gal, gal_l, l_ml, ml_l, l_cup',
				'Speed: kmh_mph, mph_kmh, ms_kmh, kmh_ms, kn_kmh',
				'Data: gb_mb, mb_gb, tb_gb, mb_kb, kb_mb',
				'Area: ha_ac, ac_ha, sqm_sqft, sqft_sqm, km2_mi2',
				'Pressure: pa_psi, psi_pa, bar_psi, psi_bar, atm_pa'
			].join('\n'))
			return
		}
		const value = Number(valueStr)
		const converter = UNIT_CONVERSIONS[fromTo.toLowerCase()]
		if (isNaN(value) || !converter) {
			await reply('Format/konversi salah. Ketik .convert untuk list.')
			return
		}
		const result = converter(value)
		const [from, to] = fromTo.split('_')
		const fromLabel = UNIT_LABELS[from.toLowerCase()] || from
		const toLabel = UNIT_LABELS[to.toLowerCase()] || to
		await reply(`📐 *Conversion*\n\n${value} ${fromLabel} = ${Number(result.toFixed(6))} ${toLabel}`)
	},

	unit: async m => await m.commands.convert(m),

	// ── Text Tools ──
	texttools: async m => {
		const { command, reply } = m
		const action = command.args[0]?.toLowerCase()
		const text = command.args.slice(1).join(' ')
		const actions = {
			reverse: () => textReverse(text),
			sort: () => textSort(text),
			shuffle: () => textShuffle(text),
			count: () => textCount(text),
			repeat: () => textRepeat(text, Number(command.args[2]) || 3),
			upper: () => textUpper(text),
			lower: () => textLower(text),
			title: () => textTitle(text),
			capitalize: () => textCapitalize(text),
			trim: () => textTrim(text),
			pad: () => textPad(text, Number(command.args[2]) || 20),
			center: () => textCenter(text, Number(command.args[2]) || 20),
			strip: () => textStrip(text),
			slug: () => textSlug(text),
			camel: () => textCamel(text),
			snake: () => textSnake(text),
			kebab: () => textKebab(text),
			pascal: () => textPascal(text),
		}
		if (!action || !actions[action]) {
			await reply([
				'📝 *Text Tools*',
				'',
				'Format: .texttools <action> <teks>',
				'',
				'Transform: reverse, upper, lower, title, capitalize, shuffle',
				'Format: slug, camel, snake, kebab, pascal, strip, trim, pad, center',
				'Utility: count, sort, repeat',
				'',
				'Contoh: .texttools reverse Hello World'
			].join('\n'))
			return
		}
		if (!text && action !== 'count') {
			await reply('Teks tidak boleh kosong!')
			return
		}
		const result = actions[action]()
		await reply(`📝 *${action}*\n\n${result}`)
	},

	tt: async m => await m.commands.texttools(m),

	// ── Password Generator ──
	password: async m => {
		const { command, reply } = m
		const length = Number(command.args[0]) || 16
		const opts = {}
		if (command.args.includes('no-upper')) opts.upper = false
		if (command.args.includes('no-lower')) opts.lower = false
		if (command.args.includes('no-numbers')) opts.numbers = false
		if (command.args.includes('no-symbols')) opts.symbols = false
		const pw = passwordGenerate(length, opts)
		const strength = pw.length >= 16 && /[A-Z]/.test(pw) && /[a-z]/.test(pw) && /[0-9]/.test(pw) && /[^a-zA-Z0-9]/.test(pw) ? '🟢 Kuat' : pw.length >= 12 ? '🟡 Sedang' : '🔴 Lemah'
		await reply([
			'🔑 *Password Generator*',
			'',
			`\`${pw}\``,
			'',
			`Panjang: ${pw.length}`,
			`Kekuatan: ${strength}`,
			'',
			'Format: .password [length] [no-upper|no-lower|no-numbers|no-symbols]'
		].join('\n'))
	},

	pw: async m => await m.commands.password(m),

	// ── UUID Generator ──
	uuid: async m => {
		const id = uuidGenerate()
		await m.reply(`🔑 UUID: \`${id}\``)
	},

	// ── Barcode Generator ──
	barcode: async m => {
		const { command, reply, download } = m
		const text = command.text
		if (!text) {
			await reply('📊 *Barcode Generator*\n\nFormat: .barcode <teks>\nContoh: .barcode 1234567890')
			return
		}
		const url = barcodeGenerate(text)
		try {
			const buffer = await download(url)
			await reply({ image: buffer, caption: `📊 Barcode: ${text}` })
		} catch {
			await reply(`📊 Barcode: ${url}`)
		}
	},

	// ── Placeholder Image ──
	placeholder: async m => {
		const { command, reply, download } = m
		const width = Number(command.args[0]) || 300
		const height = Number(command.args[1]) || width
		const text = command.args.slice(2).join(' ') || `${width}x${height}`
		const url = placeholderGenerate(width, height, text)
		try {
			const buffer = await download(url)
			await reply({ image: buffer, caption: `🖼️ Placeholder ${width}x${height}` })
		} catch {
			await reply(`🖼️ ${url}`)
		}
	},

	// ── Lorem Ipsum ──
	lorem: async m => {
		const count = Number(m.command.args[0]) || 5
		await m.reply(loremGenerate(Math.min(count, 20)))
	},

	// ── Character Counter ──
	charcount: async m => {
		const text = m.command.text
		if (!text) { await m.reply('Format: .charcount <teks>'); return }
		await m.reply(textCount(text))
	},

	// ── Read File Info ──
	fileinfo: async m => {
		const { m: msg } = m
		if (!msg?.message?.documentMessage && !msg?.message?.imageMessage && !msg?.message?.videoMessage && !msg?.message?.audioMessage && !msg?.message?.stickerMessage) {
			await m.reply('📎 Reply media untuk lihat info file.')
			return
		}
		const type = Object.keys(msg.message)[0]
		const info = msg.message[type]
		const lines = ['📎 *File Info*', '']
		if (info.fileName) lines.push(`📄 Nama: ${info.fileName}`)
		if (info.mimetype) lines.push(`🏷️ Type: ${info.mimetype}`)
		if (info.fileLength) lines.push(`📦 Size: ${(Number(info.fileLength) / 1024).toFixed(1)} KB`)
		if (info.width) lines.push(`↔️ Width: ${info.width}`)
		if (info.height) lines.push(`↕️ Height: ${info.height}`)
		if (info.seconds) lines.push(`⏱️ Durasi: ${info.seconds}s`)
		if (info.pageCount) lines.push(`📃 Halaman: ${info.pageCount}`)
		await m.reply(lines.join('\n'))
	},

	// ── Text to Image (simple) ──
	text2img: async m => {
		const { command, download } = m
		const text = command.text
		if (!text) { await m.reply('Format: .text2img <teks>'); return }
		const url = placeholderGenerate(400, 200, text.slice(0, 50), '1a1a2e', 'e94560')
		try {
			const buffer = await download(url)
			await m.reply({ image: buffer, caption: `📝 ${text.slice(0, 50)}` })
		} catch {
			await m.reply(`📝 ${url}`)
		}
	},

	t2i: async m => await m.commands.text2img(m),

	// ── Random Number ──
	rand: async m => {
		const min = Number(m.command.args[0]) || 1
		const max = Number(m.command.args[1]) || 100
		const result = Math.floor(Math.random() * (max - min + 1)) + min
		await m.reply(`🎲 Random (${min}-${max}): *${result}*`)
	},

	// ── Pick Random ──
	pickrandom: async m => {
		const text = m.command.text
		if (!text) { await m.reply('Format: .pickrandom opsi1|opsi2|opsi3'); return }
		const options = text.split('|').map(s => s.trim()).filter(Boolean)
		if (options.length < 2) { await m.reply('Minimal 2 opsi dipisah |'); return }
		const picked = options[Math.floor(Math.random() * options.length)]
		await m.reply(`🎯 Dari: ${options.join(', ')}\n🎲 Terpilih: *${picked}*`)
	},

	// ── Yes/No ──
	yesno: async m => {
		const answer = Math.random() < 0.5 ? '✅ Ya' : '❌ Tidak'
		await m.reply(`🤔 ${answer}`)
	},

	// ── Rate ──
	rate: async m => {
		const text = m.command.text
		if (!text) { await m.reply('Format: .rate <sesuatu>'); return }
		const score = Math.floor(Math.random() * 11)
		const bar = '█'.repeat(score) + '░'.repeat(10 - score)
		await m.reply(`📊 Rate "${text}"\n\n[${bar}] ${score}/10`)
	},

	// ── Ship ──
	ship: async m => {
		const names = m.command.text?.split('|').map(s => s.trim()).filter(Boolean)
		if (!names || names.length < 2) { await m.reply('Format: .ship nama1|nama2'); return }
		const score = Math.floor(Math.random() * 101)
		const heart = score >= 80 ? '❤️❤️❤️' : score >= 50 ? '❤️❤️' : score >= 25 ? '❤️' : '💔'
		await m.reply(`💘 *Ship*\n\n${names[0]} 💕 ${names[1]}\n${heart} ${score}%`)
	},

	// ── How Gay ──
	howgay: async m => {
		const text = m.command.text || 'Kamu'
		const score = Math.floor(Math.random() * 101)
		const bar = '█'.repeat(Math.floor(score / 10)) + '░'.repeat(10 - Math.floor(score / 10))
		await m.reply(`🌈 *How Gay*\n\n${text}\n[${bar}] ${score}%`)
	},

	// ── How Simp ──
	howsimp: async m => {
		const text = m.command.text || 'Kamu'
		const score = Math.floor(Math.random() * 101)
		await m.reply(`🥺 *How Simp*\n\n${text}: ${score}% simp`)
	},

	// ── How Smart ──
	howsmart: async m => {
		const text = m.command.text || 'Kamu'
		const score = Math.floor(Math.random() * 101)
		const bar = '█'.repeat(Math.floor(score / 10)) + '░'.repeat(10 - Math.floor(score / 10))
		await m.reply(`🧠 *How Smart*\n\n${text}\n[${bar}] ${score}%`)
	},

	// ── Waifu Rate ──
	waifurate: async m => {
		const text = m.command.text || 'Kamu'
		const score = Math.floor(Math.random() * 101)
		const grade = score >= 90 ? 'S+' : score >= 80 ? 'S' : score >= 70 ? 'A' : score >= 60 ? 'B' : score >= 50 ? 'C' : score >= 40 ? 'D' : 'F'
		await m.reply(`🌸 *Waifu Rate*\n\n${text}: ${score}/100 (Grade: ${grade})`)
	},

	// ── Character Info ──
	charinfo: async m => {
		const text = m.command.text
		if (!text) { await m.reply('Format: .charinfo <karakter>'); return }
		const info = textCount(text)
		await m.reply(`📝 *Character Info: "${text.slice(0, 30)}"*\n\n${info}`)
	},

	// ── Joke One Liner ──
	oneliner: async m => {
		try {
			const res = await fetch('https://api.jokes.one/jod/')
			const data = await res.json()
			const joke = data.contents?.jokes?.[0]?.joke?.text || 'Gagal ambil joke'
			await m.reply(`😂 ${joke}`)
		} catch {
			await m.reply('Gagal ambil joke')
		}
	},

	// ── Quote Random ──
	quoterandom: async m => {
		try {
			const res = await fetch('https://api.quotable.io/random')
			const data = await res.json()
			await m.reply(`💬 *${data.content}*\n\n— ${data.author}`)
		} catch {
			await m.reply('Gagal ambil quote')
		}
	},

	// ── Chuck Norris ──
	chuck: async m => {
		try {
			const res = await fetch('https://api.chucknorris.io/jokes/random')
			const data = await res.json()
			await m.reply(`👊 ${data.value}`)
		} catch {
			await m.reply('Gagal ambil joke')
		}
	},

	// ── Advice ──
	advice: async m => {
		try {
			const res = await fetch('https://api.adviceslip.com/advice')
			const data = await res.json()
			await m.reply(`💡 ${data.slip.advice}`)
		} catch {
			await m.reply('Gagal ambil advice')
		}
	},

	// ── Insult ──
	insult: async m => {
		try {
			const res = await fetch('https://evilinsult.com/generate_insult.php?lang=en&type=json')
			const data = await res.json()
			await m.reply(`😈 ${data.insult}`)
		} catch {
			await m.reply('Gagal ambil insult')
		}
	},

	// ── Compliment ──
	compliment: async m => {
		try {
			const res = await fetch('https://complimentr.com/api/v1/compliment')
			const data = await res.json()
			await m.reply(`💕 ${data.compliment}`)
		} catch {
			await m.reply('Gagal ambil compliment')
		}
	}
}
