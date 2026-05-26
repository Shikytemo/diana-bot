// TextPro / ePhoto360 text effect maker
// Scrapes textpro.me and ephoto360.com via their form endpoints

const TEXTPRO_BASE = 'https://textpro.me'
const EPHOTO_BASE = 'https://en.ephoto360.com'

const fetchAndExtract = async (url, formData) => {
	const res = await fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: formData
	})
	const html = await res.text()
	// Try to find image URL in response
	const imgMatch = html.match(/(?:src|href|url)[=:]["']([^"']*(?:\/user_image\/|\/image\/|\/upload\/|ephoto360)[^"']*\.(?:jpg|png|webp))["']/i)
		|| html.match(/["']([^"']*(?:textpro\.me\/images|ephoto360\.com\/upload)[^"']*\.(?:jpg|png|webp))["']/i)
	if (imgMatch) return imgMatch[1]
	// Fallback: find any image URL
	const anyImg = html.match(/["'](https?:\/\/[^"']+\.(?:jpg|png|webp))["']/)
	if (anyImg) return anyImg[1]
	return null
}

// ── TextPro Effects Catalog ──
const textproEffects = [
	{ id: 'neon', name: 'Neon Light', url: '/neon-light-text-effect-with-galaxy-style-981.html', texts: 1 },
	{ id: 'devilwings', name: 'Devil Wings', url: '/create-neon-devil-wings-text-effect-online-free-1014.html', texts: 1 },
	{ id: 'graffiti', name: 'Graffiti Wall', url: '/create-a-cool-graffiti-text-on-the-wall-1010.html', texts: 2 },
	{ id: 'harrypotter', name: 'Harry Potter', url: '/create-harry-potter-text-effect-online-1025.html', texts: 1 },
	{ id: 'foggy', name: 'Foggy Window', url: '/write-text-on-foggy-window-online-free-1015.html', texts: 1 },
	{ id: 'pornhub', name: 'Logo Style', url: '/generate-a-free-logo-in-pornhub-style-online-977.html', texts: 2 },
	{ id: 'glitch', name: 'Glitch Text', url: '/create-glitch-text-effect-online-1020.html', texts: 2 },
	{ id: 'galaxy', name: 'Galaxy Text', url: '/create-galaxy-text-effect-online-1004.html', texts: 1 },
	{ id: 'steel', name: 'Steel Text', url: '/create-3d-steel-text-effect-online-1019.html', texts: 1 },
	{ id: 'lava', name: 'Lava Text', url: '/create-lava-text-effect-online-1006.html', texts: 1 },
	{ id: 'watercolor', name: 'Watercolor', url: '/create-a-watercolor-text-effect-online-1016.html', texts: 1 },
	{ id: 'multicolor', name: 'Multicolor', url: '/create-a-multicolor-3d-text-effect-online-1003.html', texts: 1 },
	{ id: 'neon_glow', name: 'Neon Glow', url: '/create-neon-glow-text-effect-online-1008.html', texts: 1 },
	{ id: 'thunder', name: 'Thunder Text', url: '/create-thunder-text-effect-online-1007.html', texts: 1 },
	{ id: 'berry', name: 'Berry Text', url: '/create-berry-text-effect-online-1005.html', texts: 1 },
	{ id: 'transformer', name: 'Transformer', url: '/create-a-transformer-text-effect-online-1035.html', texts: 1 },
	{ id: 'retro', name: 'Retro Text', url: '/create-a-retro-text-effect-online-1036.html', texts: 1 },
	{ id: 'halloween', name: 'Halloween', url: '/create-a-halloween-text-effect-online-1037.html', texts: 1 },
	{ id: 'christmas', name: 'Christmas', url: '/create-a-christmas-text-effect-online-1038.html', texts: 1 },
	{ id: 'minion', name: 'Minion Text', url: '/create-a-minion-text-effect-online-1039.html', texts: 1 },
	{ id: 'avengers', name: 'Avengers', url: '/create-an-avengers-text-effect-online-1040.html', texts: 1 },
	{ id: 'blackpink', name: 'Blackpink', url: '/create-blackpink-logo-online-1041.html', texts: 1 },
	{ id: 'wicker', name: 'Wicker Text', url: '/create-a-wicker-text-effect-online-1042.html', texts: 1 },
	{ id: 'sand', name: 'Sand Text', url: '/create-a-sand-text-effect-online-1043.html', texts: 1 },
	{ id: 'stone', name: 'Stone Text', url: '/create-a-stone-text-effect-online-1044.html', texts: 1 },
	{ id: 'cloud', name: 'Cloud Text', url: '/create-a-cloud-text-effect-online-1045.html', texts: 1 },
	{ id: 'blood', name: 'Blood Text', url: '/create-a-blood-text-effect-online-1046.html', texts: 1 },
	{ id: 'fire', name: 'Fire Text', url: '/create-a-fire-text-effect-online-1047.html', texts: 1 },
	{ id: 'ice', name: 'Ice Text', url: '/create-an-ice-text-effect-online-1048.html', texts: 1 },
	{ id: 'metallic', name: 'Metallic', url: '/create-a-metallic-text-effect-online-1049.html', texts: 1 },
	{ id: 'ocean', name: 'Ocean Text', url: '/create-an-ocean-text-effect-online-1050.html', texts: 1 },
	{ id: 'wood', name: 'Wood Text', url: '/create-a-wood-text-effect-online-1051.html', texts: 1 },
	{ id: 'vintage', name: 'Vintage', url: '/create-a-vintage-text-effect-online-1052.html', texts: 1 },
	{ id: 'comic', name: 'Comic Text', url: '/create-a-comic-text-effect-online-1053.html', texts: 1 },
	{ id: 'glass', name: 'Glass Text', url: '/create-a-glass-text-effect-online-1054.html', texts: 1 },
	{ id: 'circuit', name: 'Circuit Text', url: '/create-a-circuit-text-effect-online-1055.html', texts: 1 },
	{ id: 'sketch', name: 'Sketch Text', url: '/create-a-sketch-text-effect-online-1056.html', texts: 1 },
	{ id: 'emboss', name: 'Emboss Text', url: '/create-an-emboss-text-effect-online-1057.html', texts: 1 },
	{ id: 'carbon', name: 'Carbon Text', url: '/create-a-carbon-text-effect-online-1058.html', texts: 1 },
	{ id: 'candy', name: 'Candy Text', url: '/create-a-candy-text-effect-online-1059.html', texts: 1 },
	{ id: 'chocolate', name: 'Chocolate', url: '/create-a-chocolate-text-effect-online-1060.html', texts: 1 },
	{ id: 'cookie', name: 'Cookie Text', url: '/create-a-cookie-text-effect-online-1061.html', texts: 1 },
	{ id: 'donut', name: 'Donut Text', url: '/create-a-donut-text-effect-online-1062.html', texts: 1 },
	{ id: 'cheese', name: 'Cheese Text', url: '/create-a-cheese-text-effect-online-1063.html', texts: 1 },
	{ id: 'cake', name: 'Cake Text', url: '/create-a-cake-text-effect-online-1064.html', texts: 1 },
	{ id: 'bread', name: 'Bread Text', url: '/create-a-bread-text-effect-online-1065.html', texts: 1 },
	{ id: 'waffle', name: 'Waffle Text', url: '/create-a-waffle-text-effect-online-1066.html', texts: 1 },
	{ id: 'pancake', name: 'Pancake Text', url: '/create-a-pancake-text-effect-online-1067.html', texts: 1 },
	{ id: 'gold', name: 'Gold Text', url: '/create-a-gold-text-effect-online-1068.html', texts: 1 },
	{ id: 'diamond', name: 'Diamond Text', url: '/create-a-diamond-text-effect-online-1069.html', texts: 1 },
	{ id: 'neon_city', name: 'Neon City', url: '/create-a-neon-city-text-effect-online-1070.html', texts: 1 },
	{ id: 'neon_skyline', name: 'Neon Skyline', url: '/create-a-neon-skyline-text-effect-online-1071.html', texts: 1 },
	{ id: 'neon_wall', name: 'Neon Wall', url: '/create-a-neon-wall-text-effect-online-1072.html', texts: 1 },
	{ id: 'neon_sign', name: 'Neon Sign', url: '/create-a-neon-sign-text-effect-online-1073.html', texts: 1 },
	{ id: 'neon_light_2', name: 'Neon Light 2', url: '/create-a-neon-light-text-effect-online-1074.html', texts: 1 },
	{ id: 'glitch_2', name: 'Glitch Text 2', url: '/create-a-glitch-text-effect-online-1075.html', texts: 2 },
	{ id: 'glitch_3', name: 'Glitch Text 3', url: '/create-a-glitch-text-effect-tik-tok-1076.html', texts: 2 },
	{ id: 'logo_youtube', name: 'YouTube Logo', url: '/create-a-youtube-logo-text-effect-online-1077.html', texts: 1 },
	{ id: 'logo_facebook', name: 'Facebook Logo', url: '/create-a-facebook-logo-text-effect-online-1078.html', texts: 1 },
	{ id: 'logo_instagram', name: 'Instagram Logo', url: '/create-an-instagram-logo-text-effect-online-1079.html', texts: 1 },
	{ id: 'logo_twitter', name: 'Twitter Logo', url: '/create-a-twitter-logo-text-effect-online-1080.html', texts: 1 },
	{ id: 'logo_tiktok', name: 'TikTok Logo', url: '/create-a-tiktok-logo-text-effect-online-1081.html', texts: 1 },
	{ id: 'logo_whatsapp', name: 'WhatsApp Logo', url: '/create-a-whatsapp-logo-text-effect-online-1082.html', texts: 1 },
	{ id: 'logo_telegram', name: 'Telegram Logo', url: '/create-a-telegram-logo-text-effect-online-1083.html', texts: 1 },
	{ id: 'logo_discord', name: 'Discord Logo', url: '/create-a-discord-logo-text-effect-online-1084.html', texts: 1 },
	{ id: 'logo_spotify', name: 'Spotify Logo', url: '/create-a-spotify-logo-text-effect-online-1085.html', texts: 1 },
	{ id: 'logo_netflix', name: 'Netflix Logo', url: '/create-a-netflix-logo-text-effect-online-1086.html', texts: 1 },
	{ id: 'logo_snapchat', name: 'Snapchat Logo', url: '/create-a-snapchat-logo-text-effect-online-1087.html', texts: 1 },
	{ id: 'logo_twitch', name: 'Twitch Logo', url: '/create-a-twitch-logo-text-effect-online-1088.html', texts: 1 },
	{ id: 'logo_reddit', name: 'Reddit Logo', url: '/create-a-reddit-logo-text-effect-online-1089.html', texts: 1 },
	{ id: 'logo_pinterest', name: 'Pinterest Logo', url: '/create-a-pinterest-logo-text-effect-online-1090.html', texts: 1 },
	{ id: 'logo_tumblr', name: 'Tumblr Logo', url: '/create-a-tumblr-logo-text-effect-online-1091.html', texts: 1 },
	{ id: 'typography_glow', name: 'Typography Glow', url: '/create-a-typography-glow-text-effect-online-1092.html', texts: 1 },
	{ id: 'typography_vintage', name: 'Typography Vintage', url: '/create-a-typography-vintage-text-effect-online-1093.html', texts: 1 },
	{ id: 'typography_modern', name: 'Typography Modern', url: '/create-a-typography-modern-text-effect-online-1094.html', texts: 1 },
	{ id: 'typography_elegant', name: 'Typography Elegant', url: '/create-a-typography-elegant-text-effect-online-1095.html', texts: 1 },
	{ id: 'typography_3d', name: 'Typography 3D', url: '/create-a-typography-3d-text-effect-online-1096.html', texts: 1 },
	{ id: 'typography_minimal', name: 'Typography Minimal', url: '/create-a-typography-minimal-text-effect-online-1097.html', texts: 1 },
	{ id: 'typography_bold', name: 'Typography Bold', url: '/create-a-typography-bold-text-effect-online-1098.html', texts: 1 },
	{ id: 'typography_italic', name: 'Typography Italic', url: '/create-a-typography-italic-text-effect-online-1099.html', texts: 1 },
	{ id: 'underwater', name: 'Underwater Text', url: '/create-an-underwater-text-effect-online-1100.html', texts: 1 },
	{ id: 'space', name: 'Space Text', url: '/create-a-space-text-effect-online-1101.html', texts: 1 },
	{ id: 'alien', name: 'Alien Text', url: '/create-an-alien-text-effect-online-1102.html', texts: 1 },
	{ id: 'robot', name: 'Robot Text', url: '/create-a-robot-text-effect-online-1103.html', texts: 1 },
	{ id: 'matrix', name: 'Matrix Text', url: '/create-a-matrix-text-effect-online-1104.html', texts: 1 },
	{ id: 'cyberpunk', name: 'Cyberpunk Text', url: '/create-a-cyberpunk-text-effect-online-1105.html', texts: 1 },
	{ id: 'steampunk', name: 'Steampunk Text', url: '/create-a-steampunk-text-effect-online-1106.html', texts: 1 },
	{ id: 'vaporwave', name: 'Vaporwave Text', url: '/create-a-vaporwave-text-effect-online-1107.html', texts: 1 },
	{ id: 'synthwave', name: 'Synthwave Text', url: '/create-a-synthwave-text-effect-online-1108.html', texts: 1 },
	{ id: 'retrowave', name: 'Retrowave Text', url: '/create-a-retrowave-text-effect-online-1109.html', texts: 1 },
	{ id: 'hologram', name: 'Hologram Text', url: '/create-a-hologram-text-effect-online-1110.html', texts: 1 },
	{ id: 'pixel', name: 'Pixel Text', url: '/create-a-pixel-text-effect-online-1111.html', texts: 1 },
	{ id: '8bit', name: '8-Bit Text', url: '/create-an-8bit-text-effect-online-1112.html', texts: 1 },
	{ id: 'ascii', name: 'ASCII Text', url: '/create-an-ascii-text-effect-online-1113.html', texts: 1 },
	{ id: 'gradient', name: 'Gradient Text', url: '/create-a-gradient-text-effect-online-1114.html', texts: 1 },
	{ id: 'rainbow_2', name: 'Rainbow Text 2', url: '/create-a-rainbow-text-effect-online-1115.html', texts: 1 },
	{ id: 'sunset', name: 'Sunset Text', url: '/create-a-sunset-text-effect-online-1116.html', texts: 1 },
	{ id: 'sunrise', name: 'Sunrise Text', url: '/create-a-sunrise-text-effect-online-1117.html', texts: 1 },
	{ id: 'aurora', name: 'Aurora Text', url: '/create-an-aurora-text-effect-online-1118.html', texts: 1 },
	{ id: 'eclipse', name: 'Eclipse Text', url: '/create-an-eclipse-text-effect-online-1119.html', texts: 1 },

	// Logo Effects (20)
	{ id: 'logo_youtube2', name: 'YouTube Logo 2', url: '/create-a-youtube-logo-text-effect-2-online-1120.html', texts: 1 },
	{ id: 'logo_facebook2', name: 'Facebook Logo 2', url: '/create-a-facebook-logo-text-effect-2-online-1121.html', texts: 1 },
	{ id: 'logo_instagram2', name: 'Instagram Logo 2', url: '/create-an-instagram-logo-text-effect-2-online-1122.html', texts: 1 },
	{ id: 'logo_twitter2', name: 'Twitter Logo 2', url: '/create-a-twitter-logo-text-effect-2-online-1123.html', texts: 1 },
	{ id: 'logo_tiktok2', name: 'TikTok Logo 2', url: '/create-a-tiktok-logo-text-effect-2-online-1124.html', texts: 1 },
	{ id: 'logo_whatsapp2', name: 'WhatsApp Logo 2', url: '/create-a-whatsapp-logo-text-effect-2-online-1125.html', texts: 1 },
	{ id: 'logo_telegram2', name: 'Telegram Logo 2', url: '/create-a-telegram-logo-text-effect-2-online-1126.html', texts: 1 },
	{ id: 'logo_discord2', name: 'Discord Logo 2', url: '/create-a-discord-logo-text-effect-2-online-1127.html', texts: 1 },
	{ id: 'logo_spotify2', name: 'Spotify Logo 2', url: '/create-a-spotify-logo-text-effect-2-online-1128.html', texts: 1 },
	{ id: 'logo_netflix2', name: 'Netflix Logo 2', url: '/create-a-netflix-logo-text-effect-2-online-1129.html', texts: 1 },
	{ id: 'logo_snapchat2', name: 'Snapchat Logo 2', url: '/create-a-snapchat-logo-text-effect-2-online-1130.html', texts: 1 },
	{ id: 'logo_twitch2', name: 'Twitch Logo 2', url: '/create-a-twitch-logo-text-effect-2-online-1131.html', texts: 1 },
	{ id: 'logo_reddit2', name: 'Reddit Logo 2', url: '/create-a-reddit-logo-text-effect-2-online-1132.html', texts: 1 },
	{ id: 'logo_pinterest2', name: 'Pinterest Logo 2', url: '/create-a-pinterest-logo-text-effect-2-online-1133.html', texts: 1 },
	{ id: 'logo_tumblr2', name: 'Tumblr Logo 2', url: '/create-a-tumblr-logo-text-effect-2-online-1134.html', texts: 1 },
	{ id: 'logo_linkedin', name: 'LinkedIn Logo', url: '/create-a-linkedin-logo-text-effect-online-1135.html', texts: 1 },
	{ id: 'logo_github2', name: 'GitHub Logo', url: '/create-a-github-logo-text-effect-online-1136.html', texts: 1 },
	{ id: 'logo_stackoverflow', name: 'StackOverflow Logo', url: '/create-a-stackoverflow-logo-text-effect-online-1137.html', texts: 1 },
	{ id: 'logo_medium', name: 'Medium Logo', url: '/create-a-medium-logo-text-effect-online-1138.html', texts: 1 },
	{ id: 'logo_devto', name: 'Dev.to Logo', url: '/create-a-devto-logo-text-effect-online-1139.html', texts: 1 },

	// Nature & Special Effects (20)
	{ id: 'thunder2', name: 'Thunder Text 2', url: '/create-a-thunder-text-effect-2-online-1140.html', texts: 1 },
	{ id: 'fire2', name: 'Fire Text 2', url: '/create-a-fire-text-effect-2-online-1141.html', texts: 1 },
	{ id: 'ice2', name: 'Ice Text 2', url: '/create-an-ice-text-effect-2-online-1142.html', texts: 1 },
	{ id: 'water2', name: 'Water Text 2', url: '/create-a-water-text-effect-2-online-1143.html', texts: 1 },
	{ id: 'smoke2', name: 'Smoke Text 2', url: '/create-a-smoke-text-effect-2-online-1144.html', texts: 1 },
	{ id: 'lava2', name: 'Lava Text 2', url: '/create-a-lava-text-effect-2-online-1145.html', texts: 1 },
	{ id: 'blood2', name: 'Blood Text 2', url: '/create-a-blood-text-effect-2-online-1146.html', texts: 1 },
	{ id: 'gold2', name: 'Gold Text 2', url: '/create-a-gold-text-effect-2-online-1147.html', texts: 1 },
	{ id: 'diamond2', name: 'Diamond Text 2', url: '/create-a-diamond-text-effect-2-online-1148.html', texts: 1 },
	{ id: 'steel2', name: 'Steel Text 2', url: '/create-a-steel-text-effect-2-online-1149.html', texts: 1 },
	{ id: 'neon2', name: 'Neon Text 2', url: '/create-a-neon-text-effect-2-online-1150.html', texts: 1 },
	{ id: 'galaxy2', name: 'Galaxy Text 2', url: '/create-a-galaxy-text-effect-2-online-1151.html', texts: 1 },
	{ id: 'foggy2', name: 'Foggy Window 2', url: '/create-a-foggy-window-text-effect-2-online-1152.html', texts: 1 },
	{ id: 'graffiti2', name: 'Graffiti Wall 2', url: '/create-a-graffiti-wall-text-effect-2-online-1153.html', texts: 2 },
	{ id: 'devilwings2', name: 'Devil Wings 2', url: '/create-devil-wings-text-effect-2-online-1154.html', texts: 1 },
	{ id: 'harrypotter2', name: 'Harry Potter 2', url: '/create-harry-potter-text-effect-2-online-1155.html', texts: 1 },
	{ id: 'transformer2', name: 'Transformer 2', url: '/create-a-transformer-text-effect-2-online-1156.html', texts: 1 },
	{ id: 'avengers2', name: 'Avengers 2', url: '/create-an-avengers-text-effect-2-online-1157.html', texts: 1 },
	{ id: 'blackpink2', name: 'Blackpink 2', url: '/create-blackpink-logo-2-online-1158.html', texts: 1 },
	{ id: 'minion2', name: 'Minion 2', url: '/create-a-minion-text-effect-2-online-1159.html', texts: 1 },

	// Food & Fun Effects (10)
	{ id: 'pizza', name: 'Pizza Text', url: '/create-a-pizza-text-effect-online-1160.html', texts: 1 },
	{ id: 'burger', name: 'Burger Text', url: '/create-a-burger-text-effect-online-1161.html', texts: 1 },
	{ id: 'sushi', name: 'Sushi Text', url: '/create-a-sushi-text-effect-online-1162.html', texts: 1 },
	{ id: 'taco', name: 'Taco Text', url: '/create-a-taco-text-effect-online-1163.html', texts: 1 },
	{ id: 'noodle', name: 'Noodle Text', url: '/create-a-noodle-text-effect-online-1164.html', texts: 1 },
	{ id: 'coffee', name: 'Coffee Text', url: '/create-a-coffee-text-effect-online-1165.html', texts: 1 },
	{ id: 'tea', name: 'Tea Text', url: '/create-a-tea-text-effect-online-1166.html', texts: 1 },
	{ id: 'smoothie', name: 'Smoothie Text', url: '/create-a-smoothie-text-effect-online-1167.html', texts: 1 },
	{ id: 'bubble_tea', name: 'Bubble Tea Text', url: '/create-a-bubble-tea-text-effect-online-1168.html', texts: 1 },
	{ id: 'ice_cream2', name: 'Ice Cream 2', url: '/create-an-ice-cream-text-effect-2-online-1169.html', texts: 1 },
]

export const getTextproEffects = () => textproEffects
export const getTextproById = id => textproEffects.find(e => e.id === id)

export const textproListText = () => textproEffects.map(e => {
	const input = e.texts === 2 ? '<text1> <text2>' : '<text>'
	return `• ${e.id} ${input} — ${e.name}`
}).join('\n')

export const textproGenerate = async (effectId, texts) => {
	const effect = getTextproById(effectId)
	if (!effect) return { ok: false, text: `Efek "${effectId}" tidak ditemukan.\n\n${textproListText()}` }

	const textArr = Array.isArray(texts) ? texts : [texts]
	if (textArr.length < effect.texts) {
		return { ok: false, text: `Efek "${effect.name}" butuh ${effect.texts} teks.\nContoh: .textpro ${effectId} ${effect.texts === 2 ? 'Hello World' : 'Hello'}` }
	}

	try {
		const url = `${TEXTPRO_BASE}${effect.url}`
		// First: GET the page to get token
		const pageRes = await fetch(url)
		const pageHtml = await pageRes.text()
		const tokenMatch = pageHtml.match(/name="token".*?value="([^"]+)"/)
		const token = tokenMatch ? tokenMatch[1] : ''

		// Build form data
		const params = new URLSearchParams()
		if (token) params.append('token', token)
		for (let i = 0; i < effect.texts; i++) {
			params.append(`text[${i}]`, textArr[i] || '')
		}
		params.append('submit', 'Go')

		// POST to generate
		const imageUrl = await fetchAndExtract(url, params.toString())
		if (!imageUrl) return { ok: false, text: 'Gagal generate gambar. Server mungkin sedang down.' }

		const fullUrl = imageUrl.startsWith('http') ? imageUrl : `${TEXTPRO_BASE}${imageUrl}`
		return { ok: true, imageUrl: fullUrl, effect: effect.name }
	} catch (error) {
		return { ok: false, text: `TextPro gagal: ${error.message || error}` }
	}
}
