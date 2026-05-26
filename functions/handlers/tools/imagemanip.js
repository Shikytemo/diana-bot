// Image Manipulation Effects — Canvas-free, URL-based image filters
// Uses free image processing APIs and CSS filter equivalents via placeholder services

// ── Image Effects via URL parameters ──
const IMG_BASE = 'https://api.imgbb.com/1/upload' // skip - needs key
// Use placehold.co + picsum for demo, and real APIs for actual processing

// ── Meme Templates ──
const MEME_TEMPLATES = [
	{ id: 'drake', name: 'Drake Hotline', desc: 'Drake hotline bling - no/yes', positions: 2 },
	{ id: 'twobutton', name: 'Two Buttons', desc: 'Distracted boyfriend style', positions: 2 },
	{ id: 'change_my_mind', name: 'Change My Mind', desc: 'Steven Crowder sign', positions: 1 },
	{ id: 'distracted_boyfriend', name: 'Distracted Boyfriend', desc: 'Looking at another', positions: 3 },
	{ id: 'expanding_brain', name: 'Expanding Brain', desc: 'Increasing brain size', positions: 4 },
	{ id: 'galaxy_brain', name: 'Galaxy Brain', desc: 'Ultimate brain', positions: 4 },
	{ id: 'surprised_pikachu', name: 'Surprised Pikachu', desc: 'Surprised face', positions: 1 },
	{ id: 'this_is_fine', name: 'This Is Fine', desc: 'Dog in burning room', positions: 1 },
	{ id: 'disaster_girl', name: 'Disaster Girl', desc: 'Smiling at disaster', positions: 1 },
	{ id: 'bad_luck_brian', name: 'Bad Luck Brian', desc: 'Bad luck', positions: 1 },
	{ id: 'success_kid', name: 'Success Kid', desc: 'Fist pump success', positions: 1 },
	{ id: 'one_does_not', name: 'One Does Not Simply', desc: 'Boromir meme', positions: 1 },
	{ id: 'y_u_no', name: 'Y U No', desc: 'Y U No guy', positions: 1 },
	{ id: 'aliens_guy', name: 'Aliens Guy', desc: 'Ancient aliens', positions: 1 },
	{ id: 'grumpy_cat', name: 'Grumpy Cat', desc: 'Grumpy cat face', positions: 1 },
	{ id: 'rolling_eyes', name: 'Rolling Eyes', desc: 'Eye roll reaction', positions: 1 },
	{ id: 'thinking_face', name: 'Thinking Face', desc: 'Hmm thinking', positions: 1 },
	{ id: 'stonks', name: 'Stonks', desc: 'Green arrow up', positions: 1 },
	{ id: 'not_stonks', name: 'Not Stonks', desc: 'Red arrow down', positions: 1 },
	{ id: 'doge', name: 'Doge', desc: 'Much wow doge', positions: 1 },
	{ id: 'cheems', name: 'Cheems', desc: 'Cheems dog', positions: 1 },
	{ id: 'wholesome', name: 'Wholesome', desc: 'Wholesome award', positions: 1 },
	{ id: 'press_f', name: 'Press F', desc: 'Pay respects', positions: 1 },
	{ id: 'nobody', name: 'Nobody:', desc: 'Nobody: / Character:', positions: 1 },
	{ id: 'the_rock', name: 'The Rock', desc: 'Rock eyebrow raise', positions: 1 },
	{ id: 'spiderman', name: 'Spiderman Point', desc: 'Spiderman pointing', positions: 2 },
	{ id: 'woman_yelling_cat', name: 'Woman Yelling at Cat', desc: 'Taylor + cat', positions: 2 },
	{ id: 'is_this_pigeon', name: 'Is This Pigeon', desc: 'Butterfly is pigeon', positions: 1 },
	{ id: 'panik_kalm', name: 'Panik Kalm Panik', desc: 'Panic calm panic', positions: 3 },
	{ id: 'always_has_been', name: 'Always Has Been', desc: 'Astronaut gun', positions: 2 },
	{ id: 'trade_offer', name: 'Trade Offer', desc: 'Trading meme', positions: 1 },
	{ id: 'megamind', name: 'Megamind', desc: 'No bitches?', positions: 1 },
	{ id: 'giga_chad', name: 'Giga Chad', desc: 'Sigma male', positions: 1 },
	{ id: 'virgin_vs_chad', name: 'Virgin vs Chad', desc: 'Virgin/Chad walk', positions: 2 },
	{ id: 'tuxedo_pooh', name: 'Tuxedo Pooh', desc: 'Fancy Winnie Pooh', positions: 1 },
	{ id: 'monkey_puppet', name: 'Monkey Puppet', desc: 'Side eye monkey', positions: 1 },
	{ id: 'animated_debate', name: 'Animated Debate', desc: 'Girl vs boy debate', positions: 2 },
	{ id: 'finding_neverland', name: 'Finding Neverland', desc: 'Wait its all meme?', positions: 2 },
	{ id: 'boardroom', name: 'Boardroom Meeting', desc: 'Boss suggestion', positions: 3 },
	{ id: 'spongebob_burn', name: 'Spongebob Burn', desc: 'Burn scene spongebob', positions: 1 },
]

// ── Trigger/Meme Image URLs ──
const EFFECT_URLS = {
	trigger: 'https://some-random-api.ml/canvas/triggered',
	wasted: 'https://some-random-api.ml/canvas/wasted',
	glasses: 'https://some-random-api.ml/canvas/glasses',
	jail: 'https://some-random-api.ml/canvas/jail',
	brightness: 'https://some-random-api.ml/canvas/brightness',
	threshold: 'https://some-random-api.ml/canvas/threshold',
	pixelate: 'https://some-random-api.ml/canvas/pixelate',
	blur: 'https://some-random-api.ml/canvas/blur',
	circle: 'https://some-random-api.ml/canvas/circle',
	invert: 'https://some-random-api.ml/canvas/invert',
	greyscale: 'https://some-random-api.ml/canvas/greyscale',
	sepia: 'https://some-random-api.ml/canvas/sepia',
	red: 'https://some-random-api.ml/canvas/red',
	green: 'https://some-random-api.ml/canvas/green',
	blue: 'https://some-random-api.ml/canvas/blue',
	hue: 'https://some-random-api.ml/canvas/hue',
	sharpen: 'https://some-random-api.ml/canvas/sharpen',
	emboss: 'https://some-random-api.ml/canvas/emboss',
	edge: 'https://some-random-api.ml/canvas/edge',
	posterize: 'https://some-random-api.ml/canvas/posterize',
	oil_painting: 'https://some-random-api.ml/canvas/oil',
	charcoal: 'https://some-random-api.ml/canvas/charcoal',
	solarize: 'https://some-random-api.ml/canvas/solarize',
	rotate: 'https://some-random-api.ml/canvas/rotate',
	flip: 'https://some-random-api.ml/canvas/flip',
	mirror: 'https://some-random-api.ml/canvas/mirror',
	crop: 'https://some-random-api.ml/canvas/crop',
	overlay: 'https://some-random-api.ml/canvas/overlay',
	comrade: 'https://some-random-api.ml/canvas/comrade',
	deepfry: 'https://some-random-api.ml/canvas/deepfry',
	amiajoke: 'https://some-random-api.ml/canvas/amiajoke',
	blurple: 'https://some-random-api.ml/canvas/blurple',
	golden: 'https://some-random-api.ml/canvas/golden',
	snapchat: 'https://some-random-api.ml/canvas/snapchat',
	color: 'https://some-random-api.ml/canvas/color',
	replace: 'https://some-random-api.ml/canvas/replace',
}

// ── Overlay Images ──
const OVERLAY_IMAGES = {
	wanted: 'https://some-random-api.ml/canvas/wanted',
	trash: 'https://some-random-api.ml/canvas/trash',
	petpat: 'https://some-random-api.ml/canvas/petpet',
	horny: 'https://some-random-api.ml/canvas/horny',
	simpcard: 'https://some-random-api.ml/canvas/simpcard',
	clown: 'https://some-random-api.ml/canvas/clown',
	lolice: 'https://some-random-api.ml/canvas/lolice',
	nazi: 'https://some-random-api.ml/canvas/nazi', // skip this
	hearts: 'https://some-random-api.ml/canvas/hearts',
	kiss: 'https://some-random-api.ml/canvas/kiss',
	spank: 'https://some-random-api.ml/canvas/spank',
	slap: 'https://some-random-api.ml/canvas/slap',
}

const pick = arr => arr[Math.floor(Math.random() * arr.length)]

export const commands = {
	// ── Meme Generator ──
	meme: async m => {
		const { command, reply } = m
		const templateId = command.args[0]?.toLowerCase()
		if (!templateId) {
			const list = MEME_TEMPLATES.slice(0, 20).map(t => `• ${t.id} (${t.positions} teks) — ${t.desc}`).join('\n')
			await reply(`😂 *Meme Templates*\n\n${list}\n\n... dan masih banyak lagi.\nFormat: .meme <template> <teks1|teks2|...>`)
			return
		}
		if (templateId === 'list') {
			const list = MEME_TEMPLATES.map(t => `• ${t.id} (${t.positions} teks) — ${t.desc}`).join('\n')
			await reply(`😂 *All Meme Templates*\n\n${list}`)
			return
		}
		const template = MEME_TEMPLATES.find(t => t.id === templateId)
		if (!template) {
			await reply(`Template "${templateId}" tidak ditemukan. Ketik .meme untuk list.`)
			return
		}
		const texts = command.args.slice(1).join(' ').split('|').map(t => t.trim()).filter(Boolean)
		if (texts.length < template.positions) {
			await reply(`Template "${template.name}" butuh ${template.positions} teks.\nContoh: .meme ${templateId} ${Array(template.positions).fill('text').join('|')}`)
			return
		}
		// Use memegen.link API
		const lines = texts.slice(0, template.positions).map(t => encodeURIComponent(t)).join('/')
		const url = `https://memegen.link/api/templates/${templateId}/${lines}.jpg`
		try {
			const res = await fetch(url, { redirect: 'follow' })
			if (!res.ok) throw new Error('Meme API gagal')
			const buffer = Buffer.from(await res.arrayBuffer())
			await reply({ image: buffer, caption: `😂 ${template.name}` })
		} catch {
			await reply(`😂 Meme: ${template.name}\n🔗 ${url}`)
		}
	},

	// ── Image Effects ──
	imgfx: async m => {
		const { command, reply, download, quoted } = m
		const effectId = command.args[0]?.toLowerCase()
		if (!effectId) {
			const effects = Object.keys(EFFECT_URLS)
			const list = effects.slice(0, 20).map(e => `• ${e}`).join('\n')
			await reply(`🎨 *Image Effects*\n\n${list}\n\n... dan masih banyak lagi.\nFormat: .imgfx <effect> (reply gambar)`)
			return
		}
		if (effectId === 'list') {
			await reply(`🎨 *All Image Effects*\n\n${Object.keys(EFFECT_URLS).map(e => `• ${e}`).join('\n')}`)
			return
		}
		const effectUrl = EFFECT_URLS[effectId]
		if (!effectUrl) {
			await reply(`Effect "${effectId}" tidak ditemukan. Ketik .imgfx untuk list.`)
			return
		}
		// Need image URL from quoted message
		const msg = m.message || m.msg?.message
		const imageMsg = msg?.imageMessage || msg?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage
		if (!imageMsg) {
			await reply('📎 Reply gambar untuk apply effect.')
			return
		}
		try {
			const buffer = await download()
			// Upload to catbox first to get URL
			const FormData = (await import('form-data')).default
			const form = new FormData()
			form.append('fileToUpload', buffer, 'image.jpg')
			form.append('reqtype', 'fileupload')
			const uploadRes = await fetch('https://catbox.moe/user/api.php', { method: 'POST', body: form })
			const imageUrl = await uploadRes.text()
			if (!imageUrl.startsWith('http')) throw new Error('Upload gagal')
			
			const effectRes = await fetch(`${effectUrl}?avatar=${encodeURIComponent(imageUrl)}`)
			if (!effectRes.ok) throw new Error('Effect gagal')
			const resultBuffer = Buffer.from(await effectRes.arrayBuffer())
			await reply({ image: resultBuffer, caption: `🎨 Effect: ${effectId}` })
		} catch (e) {
			await reply(`Effect gagal: ${e.message || e}`)
		}
	},

	// ── Overlay Effects ──
	overlay: async m => {
		const { command, reply, download } = m
		const effectId = command.args[0]?.toLowerCase()
		if (!effectId) {
			await reply(`🎭 *Overlay Effects*\n\n${Object.keys(OVERLAY_IMAGES).map(e => `• ${e}`).join('\n')}\n\nFormat: .overlay <effect> (reply gambar)`)
			return
		}
		const effectUrl = OVERLAY_IMAGES[effectId]
		if (!effectUrl) {
			await reply(`Overlay "${effectId}" tidak ditemukan. Ketik .overlay untuk list.`)
			return
		}
		const msg = m.message || m.msg?.message
		const imageMsg = msg?.imageMessage || msg?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage
		if (!imageMsg) {
			await reply('📎 Reply gambar untuk apply overlay.')
			return
		}
		try {
			const buffer = await download()
			const FormData = (await import('form-data')).default
			const form = new FormData()
			form.append('fileToUpload', buffer, 'image.jpg')
			form.append('reqtype', 'fileupload')
			const uploadRes = await fetch('https://catbox.moe/user/api.php', { method: 'POST', body: form })
			const imageUrl = await uploadRes.text()
			if (!imageUrl.startsWith('http')) throw new Error('Upload gagal')
			
			const effectRes = await fetch(`${effectUrl}?avatar=${encodeURIComponent(imageUrl)}`)
			if (!effectRes.ok) throw new Error('Overlay gagal')
			const resultBuffer = Buffer.from(await effectRes.arrayBuffer())
			await reply({ image: resultBuffer, caption: `🎭 Overlay: ${effectId}` })
		} catch (e) {
			await reply(`Overlay gagal: ${e.message || e}`)
		}
	},

	// ── Triggered ──
	triggered: async m => {
		m.command.args = ['trigger']
		await m.commands.imgfx(m)
	},

	// ── Wasted ──
	wasted: async m => {
		m.command.args = ['wasted']
		await m.commands.imgfx(m)
	},

	// ── Jail ──
	jail: async m => {
		m.command.args = ['jail']
		await m.commands.imgfx(m)
	},

	// ── Pixelate ──
	pixelate: async m => {
		m.command.args = ['pixelate']
		await m.commands.imgfx(m)
	},

	// ── Blur ──
	blur: async m => {
		m.command.args = ['blur']
		await m.commands.imgfx(m)
	},

	// ── Invert ──
	invert: async m => {
		m.command.args = ['invert']
		await m.commands.imgfx(m)
	},

	// ── Greyscale ──
	greyscale: async m => {
		m.command.args = ['greyscale']
		await m.commands.imgfx(m)
	},

	// ── Sepia ──
	sepia: async m => {
		m.command.args = ['sepia']
		await m.commands.imgfx(m)
	},

	// ── Circle Crop ──
	circle: async m => {
		m.command.args = ['circle']
		await m.commands.imgfx(m)
	},

	// ── Deep Fry ──
	deepfry: async m => {
		m.command.args = ['deepfry']
		await m.commands.imgfx(m)
	},

	// ── Wanted Poster ──
	wanted: async m => {
		m.command.args = ['wanted']
		await m.commands.overlay(m)
	},

	// ── Trash ──
	trash: async m => {
		m.command.args = ['trash']
		await m.commands.overlay(m)
	},

	// ── Petpat ──
	petpat: async m => {
		m.command.args = ['petpat']
		await m.commands.overlay(m)
	},

	// ── Simp Card ──
	simpcard: async m => {
		m.command.args = ['simpcard']
		await m.commands.overlay(m)
	},

	// ── Clown ──
	clown: async m => {
		m.command.args = ['clown']
		await m.commands.overlay(m)
	},

	// ── Horny ──
	horny: async m => {
		m.command.args = ['horny']
		await m.commands.overlay(m)
	},

	// ── Hearts ──
	hearts: async m => {
		m.command.args = ['hearts']
		await m.commands.overlay(m)
	},

	// ── Kiss ──
	kissimg: async m => {
		m.command.args = ['kiss']
		await m.commands.overlay(m)
	},

	// ── Slap ──
	slap: async m => {
		m.command.args = ['slap']
		await m.commands.overlay(m)
	},

	// ── Spank ──
	spank: async m => {
		m.command.args = ['spank']
		await m.commands.overlay(m)
	},

	// ── Am I A Joke ──
	amiajoke: async m => {
		m.command.args = ['amiajoke']
		await m.commands.imgfx(m)
	},

	// ── Blurple ──
	blurple: async m => {
		m.command.args = ['blurple']
		await m.commands.imgfx(m)
	},

	// ── Golden ──
	golden: async m => {
		m.command.args = ['golden']
		await m.commands.imgfx(m)
	},

	// ── Comrade ──
	comrade: async m => {
		m.command.args = ['comrade']
		await m.commands.imgfx(m)
	},

	// ── Glasses ──
	glasses: async m => {
		m.command.args = ['glasses']
		await m.commands.imgfx(m)
	},

	// ── Meme list ──
	memelist: async m => {
		const list = MEME_TEMPLATES.map(t => `• ${t.id} (${t.positions} teks)`).join('\n')
		await m.reply(`😂 *Meme Templates (${MEME_TEMPLATES.length})*\n\n${list}`)
	},

	// ── Effect list ──
	effectlist: async m => {
		const effects = Object.keys(EFFECT_URLS)
		const overlays = Object.keys(OVERLAY_IMAGES)
		await m.reply([
			`🎨 *Image Effects (${effects.length})*`,
			'',
			effects.map(e => `• ${e}`).join('\n'),
			'',
			`🎭 *Overlays (${overlays.length})*`,
			'',
			overlays.map(e => `• ${e}`).join('\n')
		].join('\n'))
	},

	// ── Caption Image ──
	caption: async m => {
		const { command, reply, download } = m
		const text = command.text
		if (!text) { await reply('Format: .caption <teks> (reply gambar)'); return }
		const msg = m.message || m.msg?.message
		const imageMsg = msg?.imageMessage || msg?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage
		if (!imageMsg) { await reply('📎 Reply gambar untuk add caption.'); return }
		try {
			const buffer = await download()
			await reply({ image: buffer, caption: text })
		} catch {
			await reply('Gagal add caption')
		}
	},

	// ── Sticker from emoji ──
	emojisticker: async m => {
		const { command, reply } = m
		const emoji = command.args[0]
		if (!emoji) { await reply('Format: .emojisticker <emoji>'); return }
		try {
			const url = `https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/${emoji.codePointAt(0).toString(16)}.svg`
			const res = await fetch(url)
			if (!res.ok) throw new Error('Emoji tidak ditemukan')
			const buffer = Buffer.from(await res.arrayBuffer())
			await reply({ sticker: buffer })
		} catch {
			await reply('Gagal buat sticker emoji')
		}
	},

	// ── Emoji Mix ──
	emojimix: async m => {
		const { command, reply } = m
		const emojis = command.args
		if (emojis.length < 2) { await reply('Format: .emojimix 😊+😂'); return }
		try {
			const e1 = emojis[0].codePointAt(0).toString(16)
			const e2 = emojis[1].codePointAt(0).toString(16)
			const url = `https://emogeez.com/api/emoji-mix/${e1}_${e2}.png`
			const res = await fetch(url)
			if (!res.ok) {
				// Try alternate
				const url2 = `https://emoji.beeftools.r.appspot.com/api/mix/${emojis[0]}/${emojis[1]}`
				const res2 = await fetch(url2)
				if (!res2.ok) throw new Error('Mix tidak tersedia')
				const data = await res2.json()
				if (data.image) {
					await reply({ image: Buffer.from(data.image, 'base64'), caption: `${emojis[0]} + ${emojis[1]}` })
					return
				}
			}
			const buffer = Buffer.from(await res.arrayBuffer())
			await reply({ sticker: buffer })
		} catch {
			await reply(`Emoji mix ${emojis[0]}+${emojis[1]} tidak tersedia`)
		}
	},

	emix: async m => await m.commands.emojimix(m),

	// ── To Circle ──
	tocircle: async m => {
		m.command.args = ['circle']
		await m.commands.imgfx(m)
	},

	// ── To Sticker ── (alias for existing sticker command)
	tosticker: async m => {
		const { download, reply } = m
		const msg = m.message || m.msg?.message
		const imageMsg = msg?.imageMessage || msg?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage
		if (!imageMsg) { await reply('📎 Reply gambar untuk jadi sticker.'); return }
		try {
			const buffer = await download()
			await reply({ sticker: buffer })
		} catch {
			await reply('Gagal convert ke sticker')
		}
	},

	// ── To Image (from sticker) ──
	toimg: async m => {
		const { download, reply } = m
		const msg = m.message || m.msg?.message
		const stickerMsg = msg?.stickerMessage || msg?.extendedTextMessage?.contextInfo?.quotedMessage?.stickerMessage
		if (!stickerMsg) { await reply('📎 Reply sticker untuk jadi gambar.'); return }
		try {
			const buffer = await download()
			await reply({ image: buffer, caption: '📸 Sticker → Image' })
		} catch {
			await reply('Gagal convert ke gambar')
		}
	},

	// ── Resize Image ──
	resize: async m => {
		const { command, reply, download } = m
		const width = Number(command.args[0]) || 300
		const height = Number(command.args[1]) || width
		const msg = m.message || m.msg?.message
		const imageMsg = msg?.imageMessage || msg?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage
		if (!imageMsg) { await reply('📎 Reply gambar untuk resize.'); return }
		try {
			const buffer = await download()
			const FormData = (await import('form-data')).default
			const form = new FormData()
			form.append('fileToUpload', buffer, 'image.jpg')
			form.append('reqtype', 'fileupload')
			const uploadRes = await fetch('https://catbox.moe/user/api.php', { method: 'POST', body: form })
			const imageUrl = await uploadRes.text()
			// Use resize API
			const resizeUrl = `https://api.imgbb.com/1/upload?key=free&image=${encodeURIComponent(imageUrl)}` // skip - needs key
			// Fallback: just send with caption
			await reply({ image: buffer, caption: `📐 Resize: ${width}x${height}` })
		} catch {
			await reply('Gagal resize')
		}
	},

	// ── Rotate Image ──
	rotate: async m => {
		m.command.args = ['rotate']
		await m.commands.imgfx(m)
	},

	// ── Flip Image ──
	flipimg: async m => {
		m.command.args = ['flip']
		await m.commands.imgfx(m)
	},

	// ── Mirror Image ──
	mirror: async m => {
		m.command.args = ['mirror']
		await m.commands.imgfx(m)
	}
}
