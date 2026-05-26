// Encode/Decode utilities — no external deps

const MORSE_MAP = {
	A:'.-',B:'-...',C:'-.-.',D:'-..',E:'.',F:'..-.',G:'--.',H:'....',I:'..',J:'.---',
	K:'-.-',L:'.-..',M:'--',N:'-.',O:'---',P:'.--.',Q:'--.-',R:'.-.',S:'...',T:'-',
	U:'..-',V:'...-',W:'.--',X:'-..-',Y:'-.--',Z:'--..','0':'-----','1':'.----','2':'..---',
	'3':'...--','4':'....-','5':'.....','6':'-....','7':'--...','8':'---..','9':'----.',
	'.':'.-.-.-',',':'--..--','?':'..--..','!':'-.-.--'
}
const MORSE_REV = Object.fromEntries(Object.entries(MORSE_MAP).map(([k,v]) => [v,k]))

const toMorse = text => text.toUpperCase().split('').map(c => {
	if (c === ' ') return '/'
	return MORSE_MAP[c] || c
}).join(' ')

const fromMorse = morse => morse.split(' ').map(s => {
	if (s === '/') return ' '
	return MORSE_REV[s] || s
}).join('')

const toBinary = text => text.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ')
const fromBinary = binary => binary.split(/\s+/).map(b => String.fromCharCode(parseInt(b, 2))).join('')

const toBase64 = text => Buffer.from(text, 'utf8').toString('base64')
const fromBase64 = b64 => { try { return Buffer.from(b64, 'base64').toString('utf8') } catch { return 'Invalid base64' } }

const toHex = text => text.split('').map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join(' ')
const fromHex = hex => hex.split(/\s+/).map(h => String.fromCharCode(parseInt(h, 16))).join('')

const toReverse = text => text.split('').reverse().join('')
const toUppercase = text => text.toUpperCase()
const toLowercase = text => text.toLowerCase()
const toTitlecase = text => text.replace(/\b\w/g, c => c.toUpperCase())

const toAscii = text => text.split('').map(c => c.charCodeAt(0)).join(' ')
const fromAscii = ascii => ascii.split(/\s+/).map(n => String.fromCharCode(Number(n))).join('')

const toHash = (text, algo = 'sha256') => {
	const crypto = globalThis.crypto || require('crypto')
	if (crypto.subtle) {
		// Web Crypto API
		return 'Hash requires Node crypto module'
	}
	// Node crypto
	try {
		const nodeCrypto = require('crypto')
		return nodeCrypto.createHash(algo).update(text).digest('hex')
	} catch {
		return 'Crypto not available'
	}
}

const ENCODERS = {
	morse: { encode: toMorse, decode: fromMorse },
	binary: { encode: toBinary, decode: fromBinary },
	base64: { encode: toBase64, decode: fromBase64 },
	hex: { encode: toHex, decode: fromHex },
	reverse: { encode: toReverse, decode: toReverse },
	upper: { encode: toUppercase, decode: toLowercase },
	lower: { encode: toLowercase, decode: toUppercase },
	title: { encode: toTitlecase, decode: toTitlecase },
	ascii: { encode: toAscii, decode: fromAscii },
	sha256: { encode: t => toHash(t, 'sha256'), decode: null },
	md5: { encode: t => toHash(t, 'md5'), decode: null },
	sha1: { encode: t => toHash(t, 'sha1'), decode: null },
	sha512: { encode: t => toHash(t, 'sha512'), decode: null },
	rot13: {
		encode: t => t.replace(/[a-zA-Z]/g, c => String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26)),
		decode: t => t.replace(/[a-zA-Z]/g, c => String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26))
	},
	atbash: {
		encode: t => t.replace(/[a-z]/g, c => String.fromCharCode(219 - c.charCodeAt(0))).replace(/[A-Z]/g, c => String.fromCharCode(155 - c.charCodeAt(0))),
		decode: t => t.replace(/[a-z]/g, c => String.fromCharCode(219 - c.charCodeAt(0))).replace(/[A-Z]/g, c => String.fromCharCode(155 - c.charCodeAt(0)))
	},
	url: { encode: encodeURIComponent, decode: decodeURIComponent },
	html: {
		encode: t => t.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])),
		decode: t => t.replace(/&(?:amp|lt|gt|quot|#39);/g, c => ({ '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'" }[c]))
	},
	// ── Additional Encoders ──
	rot5: {
		encode: t => t.replace(/\d/g, c => String.fromCharCode((c.charCodeAt(0) - 48 + 5) % 10 + 48)),
		decode: t => t.replace(/\d/g, c => String.fromCharCode((c.charCodeAt(0) - 48 + 5) % 10 + 48))
	},
	rot18: {
		encode: t => t.replace(/[a-zA-Z]/g, c => String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26)).replace(/\d/g, c => String.fromCharCode((c.charCodeAt(0) - 48 + 5) % 10 + 48)),
		decode: t => t.replace(/[a-zA-Z]/g, c => String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26)).replace(/\d/g, c => String.fromCharCode((c.charCodeAt(0) - 48 + 5) % 10 + 48))
	},
	rot47: {
		encode: t => t.replace(/./g, c => { const code = c.charCodeAt(0); return code >= 33 && code <= 126 ? String.fromCharCode(((code - 33 + 47) % 94) + 33) : c }),
		decode: t => t.replace(/./g, c => { const code = c.charCodeAt(0); return code >= 33 && code <= 126 ? String.fromCharCode(((code - 33 + 47) % 94) + 33) : c })
	},
	caesar5: {
		encode: t => t.replace(/[a-z]/g, c => String.fromCharCode((c.charCodeAt(0) - 97 + 5) % 26 + 97)).replace(/[A-Z]/g, c => String.fromCharCode((c.charCodeAt(0) - 65 + 5) % 26 + 65)),
		decode: t => t.replace(/[a-z]/g, c => String.fromCharCode((c.charCodeAt(0) - 97 + 21) % 26 + 97)).replace(/[A-Z]/g, c => String.fromCharCode((c.charCodeAt(0) - 65 + 21) % 26 + 65))
	},
	caesar10: {
		encode: t => t.replace(/[a-z]/g, c => String.fromCharCode((c.charCodeAt(0) - 97 + 10) % 26 + 97)).replace(/[A-Z]/g, c => String.fromCharCode((c.charCodeAt(0) - 65 + 10) % 26 + 65)),
		decode: t => t.replace(/[a-z]/g, c => String.fromCharCode((c.charCodeAt(0) - 97 + 16) % 26 + 97)).replace(/[A-Z]/g, c => String.fromCharCode((c.charCodeAt(0) - 65 + 16) % 26 + 65))
	},
	caesar20: {
		encode: t => t.replace(/[a-z]/g, c => String.fromCharCode((c.charCodeAt(0) - 97 + 20) % 26 + 97)).replace(/[A-Z]/g, c => String.fromCharCode((c.charCodeAt(0) - 65 + 20) % 26 + 65)),
		decode: t => t.replace(/[a-z]/g, c => String.fromCharCode((c.charCodeAt(0) - 97 + 6) % 26 + 97)).replace(/[A-Z]/g, c => String.fromCharCode((c.charCodeAt(0) - 65 + 6) % 26 + 65))
	},
	vigenere: {
		encode: (t, key = 'KEY') => {
			key = key.toUpperCase()
			let ki = 0
			return t.replace(/[a-zA-Z]/g, c => {
				const shift = key.charCodeAt(ki++ % key.length) - 65
				const base = c <= 'Z' ? 65 : 97
				return String.fromCharCode((c.charCodeAt(0) - base + shift) % 26 + base)
			})
		},
		decode: (t, key = 'KEY') => {
			key = key.toUpperCase()
			let ki = 0
			return t.replace(/[a-zA-Z]/g, c => {
				const shift = key.charCodeAt(ki++ % key.length) - 65
				const base = c <= 'Z' ? 65 : 97
				return String.fromCharCode((c.charCodeAt(0) - base - shift + 26) % 26 + base)
			})
		}
	},
	octal: {
		encode: t => t.split('').map(c => c.charCodeAt(0).toString(8).padStart(3, '0')).join(' '),
		decode: o => o.split(/\s+/).map(n => String.fromCharCode(parseInt(n, 8))).join('')
	},
	decimal: {
		encode: t => t.split('').map(c => c.charCodeAt(0)).join(' '),
		decode: d => d.split(/\s+/).map(n => String.fromCharCode(Number(n))).join('')
	},
	binary_text: {
		encode: t => t.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(''),
		decode: b => { const bytes = b.match(/.{8}/g) || []; return bytes.map(b => String.fromCharCode(parseInt(b, 2))).join('') }
	},
	strip_tags: {
		encode: t => t.replace(/<[^>]*>/g, ''),
		decode: null
	},
	slug: {
		encode: t => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
		decode: null
	},
	camel: {
		encode: t => t.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()),
		decode: null
	},
	snake: {
		encode: t => t.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_|_$/g, ''),
		decode: null
	},
	kebab: {
		encode: t => t.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, ''),
		decode: null
	},
	pascal: {
		encode: t => t.replace(/(^|[^a-zA-Z0-9]+)(.)/g, (_, _s, c) => c.toUpperCase()),
		decode: null
	},
	leet: {
		encode: t => t.replace(/a/gi, '4').replace(/e/gi, '3').replace(/i/gi, '1').replace(/o/gi, '0').replace(/s/gi, '5').replace(/t/gi, '7').replace(/b/gi, '8').replace(/g/gi, '9'),
		decode: null
	},
	zalgo: {
		encode: t => t.split('').map(c => {
			const zalgo = ['\u0300','\u0301','\u0302','\u0303','\u0304','\u0305','\u0306','\u0307','\u0308','\u0309','\u030A','\u030B','\u030C','\u030D','\u030E','\u030F','\u0310','\u0311','\u0312','\u0313','\u0314','\u0315']
			const count = 3 + Math.floor(Math.random() * 5)
			return c + Array.from({ length: count }, () => zalgo[Math.floor(Math.random() * zalgo.length)]).join('')
		}).join(''),
		decode: t => t.replace(/[\u0300-\u036F]/g, '')
	},
	morse_num: {
		encode: t => toMorse(t).replace(/\./g, '1').replace(/-/g, '2').replace(/\//g, '3'),
		decode: t => fromMorse(t.replace(/1/g, '.').replace(/2/g, '-').replace(/3/g, '/'))
	},
	tap_code: {
		encode: t => {
			const grid = 'ABCDEFGHIKLMNOPQRSTUVWXYZ'
			return t.toUpperCase().replace(/K/g, 'C').split('').map(c => {
				const idx = grid.indexOf(c)
				if (idx === -1) return c
				const row = Math.floor(idx / 5) + 1
				const col = (idx % 5) + 1
				return `${row}.${col}`
			}).join(' ')
		},
		decode: t => {
			const grid = 'ABCDEFGHIKLMNOPQRSTUVWXYZ'
			return t.split(' ').map(pair => {
				const parts = pair.split('.')
				if (parts.length !== 2) return pair
				const [row, col] = parts.map(Number)
				if (isNaN(row) || isNaN(col)) return pair
				return grid[(row - 1) * 5 + (col - 1)] || pair
			}).join('')
		}
	},
	pig_latin: {
		encode: t => t.split(' ').map(w => {
			if (!/^[a-zA-Z]/.test(w)) return w
			const match = w.match(/^([^aeiouAEIOU]*)(.*)/)
			return match ? match[2] + match[1] + 'ay' : w
		}).join(' '),
		decode: t => t.split(' ').map(w => {
			const match = w.match(/^(.*?)([bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]+)ay$/)
			if (!match) return w
			return match[2] + match[1]
		}).join(' ')
	},
	reverse_words: {
		encode: t => t.split(' ').reverse().join(' '),
		decode: t => t.split(' ').reverse().join(' ')
	},
	alternating: {
		encode: t => t.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join(''),
		decode: null
	},
	wide: {
		encode: t => t.split('').map(c => {
			const code = c.charCodeAt(0)
			if (code >= 33 && code <= 126) return String.fromCharCode(code + 65248)
			if (code === 32) return '\u3000'
			return c
		}).join(''),
		decode: t => t.split('').map(c => {
			const code = c.charCodeAt(0)
			if (code >= 65281 && code <= 65374) return String.fromCharCode(code - 65248)
			if (code === 12288) return ' '
			return c
		}).join('')
	},
	smallcaps: {
		encode: t => t.split('').map(c => {
			const map = { 'a':'ᴀ','b':'ʙ','c':'ᴄ','d':'ᴅ','e':'ᴇ','f':'ꜰ','g':'ɢ','h':'ʜ','i':'ɪ','j':'ᴊ','k':'ᴋ','l':'ʟ','m':'ᴍ','n':'ɴ','o':'ᴏ','p':'ᴘ','q':'ǫ','r':'ʀ','s':'ꜱ','t':'ᴛ','u':'ᴜ','v':'ᴠ','w':'ᴡ','x':'x','y':'ʏ','z':'ᴢ' }
			return map[c.toLowerCase()] || c
		}).join(''),
		decode: null
	},
	fancy: {
		encode: t => t.split('').map(c => {
			const map = { 'a':'𝓪','b':'𝓫','c':'𝓬','d':'𝓭','e':'𝓮','f':'𝓯','g':'𝓰','h':'𝓱','i':'𝓲','j':'𝓳','k':'𝓴','l':'𝓵','m':'𝓶','n':'𝓷','o':'𝓸','p':'𝓹','q':'𝓺','r':'𝓻','s':'𝓼','t':'𝓽','u':'𝓾','v':'𝓿','w':'𝔀','x':'𝔁','y':'𝔂','z':'𝔃' }
			return map[c.toLowerCase()] || c
		}).join(''),
		decode: null
	},
	upside_down: {
		encode: t => t.split('').reverse().map(c => {
			const map = { 'a':'ɐ','b':'q','c':'ɔ','d':'p','e':'ǝ','f':'ɟ','g':'ƃ','h':'ɥ','i':'ᴉ','j':'ɾ','k':'ʞ','l':'l','m':'ɯ','n':'u','o':'o','p':'d','q':'b','r':'ɹ','s':'s','t':'ʇ','u':'n','v':'ʌ','w':'ʍ','x':'x','y':'ʎ','z':'z','.':'˙',',':'\u0027','?':'¿','!':'¡' }
			return map[c.toLowerCase()] || c
		}).join(''),
		decode: null
	},
	braille: {
		encode: t => t.split('').map(c => {
			const map = { ' ':'⠀','a':'⠁','b':'⠃','c':'⠉','d':'⠋','e':'⠑','f':'⠋','g':'⠛','h':'⠓','i':'⠊','j':'⠚','k':'⠅','l':'⠇','m':'⠍','n':'⠝','o':'⠕','p':'⠏','q':'⠟','r':'⠗','s':'⠎','t':'⠞','u':'⠥','v':'⠧','w':'⠺','x':'⠭','y':'⠽','z':'⠵','1':'⠼⠁','2':'⠼⠃','3':'⠼⠉','4':'⠼⠙','5':'⠼⠑','6':'⠼⠋','7':'⠼⠛','8':'⠼⠓','9':'⠼⠊','0':'⠼⠚' }
			return map[c.toLowerCase()] || c
		}).join(''),
		decode: null
	},
	nato: {
		encode: t => t.toUpperCase().split('').map(c => {
			const map = { 'A':'Alpha','B':'Bravo','C':'Charlie','D':'Delta','E':'Echo','F':'Foxtrot','G':'Golf','H':'Hotel','I':'India','J':'Juliet','K':'Kilo','L':'Lima','M':'Mike','N':'November','O':'Oscar','P':'Papa','Q':'Quebec','R':'Romeo','S':'Sierra','T':'Tango','U':'Uniform','V':'Victor','W':'Whiskey','X':'X-ray','Y':'Yankee','Z':'Zulu','0':'Zero','1':'One','2':'Two','3':'Three','4':'Four','5':'Five','6':'Six','7':'Seven','8':'Eight','9':'Niner' }
			return map[c] || c
		}).join(' '),
		decode: null
	},
	t9: {
		encode: t => t.toLowerCase().split('').map(c => {
			const map = { 'a':'2','b':'22','c':'222','d':'3','e':'33','f':'333','g':'4','h':'44','i':'444','j':'5','k':'55','l':'555','m':'6','n':'66','o':'666','p':'7','q':'77','r':'777','s':'7777','t':'8','u':'88','v':'888','w':'9','x':'99','y':'999','z':'9999',' ':'0' }
			return map[c] || c
		}).join(' '),
		decode: null
	},
	a1z26: {
		encode: t => t.toUpperCase().split('').map(c => {
			if (c >= 'A' && c <= 'Z') return c.charCodeAt(0) - 64
			if (c === ' ') return '/'
			return c
		}).join(' '),
		decode: t => t.split(' ').map(s => {
			if (s === '/') return ' '
			const n = Number(s)
			if (n >= 1 && n <= 26) return String.fromCharCode(n + 64)
			return s
		}).join('')
	}
}

export const ENCODER_NAMES = Object.keys(ENCODERS)
export const encoderListText = () => ENCODER_NAMES.map(e => `• ${e}`).join('\n')

export const encodeForReply = (text, method, mode = 'encode') => {
	const enc = ENCODERS[method]
	if (!enc) return { ok: false, text: `Method "${method}" tidak ditemukan.\n\nTersedia:\n${encoderListText()}` }

	const fn = mode === 'decode' && enc.decode ? enc.decode : enc.encode
	if (!fn) return { ok: false, text: `Method "${method}" tidak support decode (one-way hash).` }

	try {
		const result = fn(text)
		return { ok: true, text: `🔐 *${method.toUpperCase()} ${mode}*\n\n\`\`\`\n${result}\n\`\`\`` }
	} catch (error) {
		return { ok: false, text: `Encode gagal: ${error.message}` }
	}
}
