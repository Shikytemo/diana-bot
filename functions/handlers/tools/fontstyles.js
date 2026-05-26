// Font/Text Style Commands — 30+ Unicode text transformations
// ESM module for diana-bot WhatsApp bot

// ── Unicode Character Maps ──
const MAP = {
	bold:          '𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵',
	italic:        '𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡',
	bolditalic:    '𝙖𝙗𝙘𝙙𝙚𝙛𝙜𝙝𝙞𝙟𝙠𝙡𝙢𝙣𝙤𝙥𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯𝘼𝘽𝘾𝘿𝙀𝙁𝙂𝙃𝙄𝙅𝙆𝙇𝙈𝙉𝙊𝙋𝙌𝙍𝙎𝙏𝙐𝙑𝙒𝙓𝙔𝙕𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵',
	monospace:     '𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿',
	script:        '𝒶𝒷𝒸𝒹ℯ𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩ℴ𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵',
	boldscript:    '𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩',
	fraktur:       '𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ',
	doublestruck:  '𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡',
	smallcaps:     'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀꜱᴛᴜᴠᴡxʏᴢAʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀꜱᴛᴜᴠᴡxʏᴢ',
}

const SRC = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

function mapChars(text, mapKey) {
	const m = MAP[mapKey]
	if (!m) return text
	return [...text].map(c => {
		const i = SRC.indexOf(c)
		return i >= 0 ? m[i] : c
	}).join('')
}

// Circled letters
function circled(text) {
	return [...text].map(c => {
		if (c >= 'a' && c <= 'z') return String.fromCharCode(0x24D0 + c.charCodeAt(0) - 97)
		if (c >= 'A' && c <= 'Z') return String.fromCharCode(0x24B6 + c.charCodeAt(0) - 65)
		if (c >= '0' && c <= '9') return ['⓪','①','②','③','④','⑤','⑥','⑦','⑧','⑨'][+c]
		return c
	}).join('')
}

// Squared letters
function squared(text) {
	return [...text].map(c => {
		if (c >= 'A' && c <= 'Z') return String.fromCharCode(0x1F130 + c.charCodeAt(0) - 65)
		if (c >= 'a' && c <= 'z') return String.fromCharCode(0x1F130 + c.charCodeAt(0) - 97)
		if (c >= '0' && c <= '9') return ['🄀','➀','➁','➂','➃','➄','➅','➆','➇','➈'][+c]
		return c
	}).join('')
}

// Upside down
const UPSIDE = { a:'ɐ', b:'q', c:'ɔ', d:'p', e:'ǝ', f:'ɟ', g:'ƃ', h:'ɥ', i:'ᴉ', j:'ɾ', k:'ʞ', l:'l', m:'ɯ', n:'u', o:'o', p:'d', q:'b', r:'ɹ', s:'s', t:'ʇ', u:'n', v:'ʌ', w:'ʍ', x:'x', y:'ʎ', z:'z', A:'∀', B:'ꓭ', C:'Ɔ', D:'◖', E:'Ǝ', F:'Ⅎ', G:'⅁', H:'H', I:'I', J:'ſ', K:'ꓘ', L:'˥', M:'W', N:'N', O:'O', P:'Ԁ', Q:'Ό', R:'ꓤ', S:'S', T:'⊥', U:'∩', V:'Λ', W:'M', X:'X', Y:'⅄', Z:'Z', '0':'0', '1':'Ɩ', '2':'ᄅ', '3':'Ɛ', '4':'ㄣ', '5':'ϛ', '6':'9', '7':'ㄥ', '8':'8', '9':'6', '?':'¿', '!':'¡', '.':'˙', ',':'\'', '(':')', ')':'(' }
function upsideDown(text) {
	return [...text].reverse().map(c => UPSIDE[c] || c).join('')
}

// Fullwidth
function fullWidth(text) {
	return [...text].map(c => {
		const code = c.charCodeAt(0)
		if (code >= 33 && code <= 126) return String.fromCharCode(code + 0xFEE0)
		if (code === 32) return '\u3000'
		return c
	}).join('')
}

// Strikethrough
function strikeThrough(text) {
	return [...text].map(c => c + '\u0336').join('')
}

// Underline
function underline(text) {
	return [...text].map(c => c + '\u0332').join('')
}

// Crossed
function crossed(text) {
	return [...text].map(c => c + '\u0338').join('')
}

// Zalgo
function zalgo(text) {
	const above = ['\u0300','\u0301','\u0302','\u0303','\u0304','\u0305','\u0306','\u0307','\u0308','\u030A','\u030B','\u030C','\u030D','\u030E','\u030F','\u0310','\u0311','\u0312']
	const below = ['\u0316','\u0317','\u0318','\u0319','\u031C','\u031D','\u031E','\u031F','\u0320','\u0321','\u0322','\u0323','\u0324','\u0325','\u0326','\u0327','\u0328','\u0329']
	return [...text].map(c => {
		if (c === ' ') return c
		let out = c
		const n = Math.floor(Math.random() * 6) + 2
		for (let i = 0; i < n; i++) {
			out += (i % 2 === 0 ? above : below)[Math.floor(Math.random() * (i % 2 === 0 ? above : below).length)]
		}
		return out
	}).join('')
}

// Bubble (same as circled but with dots)
function bubble(text) { return circled(text) }

// Regional indicator
function regional(text) {
	return [...text].map(c => {
		const lower = c.toLowerCase()
		if (lower >= 'a' && lower <= 'z') {
			return String.fromCharCode(0x1F1E6 + lower.charCodeAt(0) - 97) + ' '
		}
		return c
	}).join('').trim()
}

// Braille
const BRAILLE = { a:'⠁',b:'⠃',c:'⠉',d:'⠙',e:'⠑',f:'⠋',g:'⠛',h:'⠓',i:'⠊',j:'⠚',k:'⠅',l:'⠇',m:'⠍',n:'⠝',o:'⠕',p:'⠏',q:'⠟',r:'⠗',s:'⠎',t:'⠞',u:'⠥',v:'⠧',w:'⠺',x:'⠭',y:'⠽',z:'⠵',0:'⠴',1:'⠂',2:'⠆',3:'⠒',4:'⠲',5:'⠢',6:'⠖',7:'⠶',8:'⠦',9:'⠔',' ':' ' }
function braille(text) {
	return [...text.toLowerCase()].map(c => BRAILLE[c] || c).join('')
}

// Morse
const MORSE = { a:'.-',b:'-...',c:'-.-.',d:'-..',e:'.',f:'..-.',g:'--.',h:'....',i:'..',j:'.---',k:'-.-',l:'.-..',m:'--',n:'-.',o:'---',p:'.--.',q:'--.-',r:'.-.',s:'...',t:'-',u:'..-',v:'...-',w:'.--',x:'-..-',y:'-.--',z:'--..',0:'-----',1:'.----',2:'..---',3:'...--',4:'....-',5:'.....',6:'-....',7:'--...',8:'---..',9:'----.' }
function morse(text) {
	return [...text.toLowerCase()].map(c => c === ' ' ? '/' : (MORSE[c] || c)).join(' ')
}

// NATO phonetic
const NATO = { a:'Alpha',b:'Bravo',c:'Charlie',d:'Delta',e:'Echo',f:'Foxtrot',g:'Golf',h:'Hotel',i:'India',j:'Juliet',k:'Kilo',l:'Lima',m:'Mike',n:'November',o:'Oscar',p:'Papa',q:'Quebec',r:'Romeo',s:'Sierra',t:'Tango',u:'Uniform',v:'Victor',w:'Whiskey',x:'X-ray',y:'Yankee',z:'Zulu',0:'Zero',1:'One',2:'Two',3:'Three',4:'Four',5:'Five',6:'Six',7:'Seven',8:'Eight',9:'Niner' }
function nato(text) {
	return [...text.toLowerCase()].map(c => c === ' ' ? '|' : (NATO[c] || c)).join(' ')
}

// Binary
function binary(text) {
	return [...text].map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ')
}

// Hex
function hex(text) {
	return [...text].map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join(' ')
}

// Leet
const LEET = { a:'4',b:'8',c:'(',e:'3',f:'ph',g:'9',h:'#',i:'1',j:'j',k:'|{',l:'1',m:'/\\/\\',n:'/\\/',o:'0',p:'|o',q:'0,',r:'|2',s:'5',t:'7',u:'|_|',v:'\\/',w:'\\/\\/',x:'><',y:'`/',z:'2' }
function leet(text) {
	return [...text.toLowerCase()].map(c => LEET[c] || c).join('')
}

// Reverse
function reverse(text) { return [...text].reverse().join('') }

// Title case
function titleCase(text) { return text.replace(/\b\w/g, c => c.toUpperCase()) }

// Alternating case
function altCase(text) {
	let upper = true
	return [...text].map(c => {
		if (/[a-zA-Z]/.test(c)) {
			const r = upper ? c.toUpperCase() : c.toLowerCase()
			upper = !upper
			return r
		}
		return c
	}).join('')
}

// Wide spaced
function wide(text) { return [...text].join(' ') }

// ── Command Helpers ──
const noText = (name, style) => `Format: .${name} <teks>\nContoh: .${name} Hello World`

export const commands = {
	bold: async m => {
		const text = m.command.text
		if (!text) { await m.reply(noText('bold')); return }
		await m.reply(`✏️ *Bold*\n\n${mapChars(text, 'bold')}`)
	},
	italic: async m => {
		const text = m.command.text
		if (!text) { await m.reply(noText('italic')); return }
		await m.reply(`✏️ *Italic*\n\n${mapChars(text, 'italic')}`)
	},
	bolditalic: async m => {
		const text = m.command.text
		if (!text) { await m.reply(noText('bolditalic')); return }
		await m.reply(`✏️ *Bold Italic*\n\n${mapChars(text, 'bolditalic')}`)
	},
	monospace: async m => {
		const text = m.command.text
		if (!text) { await m.reply(noText('monospace')); return }
		await m.reply(`✏️ *Monospace*\n\n${mapChars(text, 'monospace')}`)
	},
	script: async m => {
		const text = m.command.text
		if (!text) { await m.reply(noText('script')); return }
		await m.reply(`✏️ *Script*\n\n${mapChars(text, 'script')}`)
	},
	boldscript: async m => {
		const text = m.command.text
		if (!text) { await m.reply(noText('boldscript')); return }
		await m.reply(`✏️ *Bold Script*\n\n${mapChars(text, 'boldscript')}`)
	},
	fraktur: async m => {
		const text = m.command.text
		if (!text) { await m.reply(noText('fraktur')); return }
		await m.reply(`✏️ *Fraktur*\n\n${mapChars(text, 'fraktur')}`)
	},
	doublestruck: async m => {
		const text = m.command.text
		if (!text) { await m.reply(noText('doublestruck')); return }
		await m.reply(`✏️ *Double-Struck*\n\n${mapChars(text, 'doublestruck')}`)
	},
	circled: async m => {
		const text = m.command.text
		if (!text) { await m.reply(noText('circled')); return }
		await m.reply(`✏️ *Circled*\n\n${circled(text)}`)
	},
	squared: async m => {
		const text = m.command.text
		if (!text) { await m.reply(noText('squared')); return }
		await m.reply(`✏️ *Squared*\n\n${squared(text)}`)
	},
	smallcaps: async m => {
		const text = m.command.text
		if (!text) { await m.reply(noText('smallcaps')); return }
		await m.reply(`✏️ *Small Caps*\n\n${mapChars(text, 'smallcaps')}`)
	},
	upsidedown: async m => {
		const text = m.command.text
		if (!text) { await m.reply(noText('upsidedown')); return }
		await m.reply(`✏️ *Upside Down*\n\n${upsideDown(text)}`)
	},
	fullwidth: async m => {
		const text = m.command.text
		if (!text) { await m.reply(noText('fullwidth')); return }
		await m.reply(`✏️ *Fullwidth*\n\n${fullWidth(text)}`)
	},
	strikethrough: async m => {
		const text = m.command.text
		if (!text) { await m.reply(noText('strikethrough')); return }
		await m.reply(`✏️ *Strikethrough*\n\n${strikeThrough(text)}`)
	},
	underline: async m => {
		const text = m.command.text
		if (!text) { await m.reply(noText('underline')); return }
		await m.reply(`✏️ *Underline*\n\n${underline(text)}`)
	},
	crossed: async m => {
		const text = m.command.text
		if (!text) { await m.reply(noText('crossed')); return }
		await m.reply(`✏️ *Crossed*\n\n${crossed(text)}`)
	},
	zalgo: async m => {
		const text = m.command.text
		if (!text) { await m.reply(noText('zalgo')); return }
		await m.reply(`✏️ *Zalgo*\n\n${zalgo(text)}`)
	},
	bubble: async m => {
		const text = m.command.text
		if (!text) { await m.reply(noText('bubble')); return }
		await m.reply(`✏️ *Bubble*\n\n${bubble(text)}`)
	},
	regional: async m => {
		const text = m.command.text
		if (!text) { await m.reply(noText('regional')); return }
		await m.reply(`✏️ *Regional*\n\n${regional(text)}`)
	},
	braille: async m => {
		const text = m.command.text
		if (!text) { await m.reply(noText('braille')); return }
		await m.reply(`✏️ *Braille*\n\n${braille(text)}`)
	},
	morse: async m => {
		const text = m.command.text
		if (!text) { await m.reply(noText('morse')); return }
		await m.reply(`✏️ *Morse Code*\n\n${morse(text)}`)
	},
	nato: async m => {
		const text = m.command.text
		if (!text) { await m.reply(noText('nato')); return }
		await m.reply(`✏️ *NATO Phonetic*\n\n${nato(text)}`)
	},
	binary: async m => {
		const text = m.command.text
		if (!text) { await m.reply(noText('binary')); return }
		await m.reply(`✏️ *Binary*\n\n${binary(text)}`)
	},
	hex: async m => {
		const text = m.command.text
		if (!text) { await m.reply(noText('hex')); return }
		await m.reply(`✏️ *Hexadecimal*\n\n${hex(text)}`)
	},
	leet: async m => {
		const text = m.command.text
		if (!text) { await m.reply(noText('leet')); return }
		await m.reply(`✏️ *L33t Sp34k*\n\n${leet(text)}`)
	},
	reverse: async m => {
		const text = m.command.text
		if (!text) { await m.reply(noText('reverse')); return }
		await m.reply(`✏️ *Reverse*\n\n${reverse(text)}`)
	},
	title: async m => {
		const text = m.command.text
		if (!text) { await m.reply(noText('title')); return }
		await m.reply(`✏️ *Title Case*\n\n${titleCase(text)}`)
	},
	alternating: async m => {
		const text = m.command.text
		if (!text) { await m.reply(noText('alternating')); return }
		await m.reply(`✏️ *Alternating Case*\n\n${altCase(text)}`)
	},
	wide: async m => {
		const text = m.command.text
		if (!text) { await m.reply(noText('wide')); return }
		await m.reply(`✏️ *Wide Spaced*\n\n${wide(text)}`)
	},
}
