// Photooxy text/image effect maker
// Scrapes photooxy.com via their form endpoints

const PHOTOOXY_BASE = 'https://photooxy.com'

const fetchAndExtract = async (url, formData) => {
	const res = await fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: formData
	})
	const html = await res.text()
	// Try to find image URL in response
	const imgMatch = html.match(/(?:src|href|url)[=:]["']([^"']*(?:\/user_image\/|\/image\/|\/upload\/|photooxy)[^"']*\.(?:jpg|png|webp))["']/i)
		|| html.match(/["']([^"']*(?:photooxy\.com\/upload|photooxy\.com\/user_image)[^"']*\.(?:jpg|png|webp))["']/i)
	if (imgMatch) return imgMatch[1]
	// Fallback: find any image URL
	const anyImg = html.match(/["'](https?:\/\/[^"']+\.(?:jpg|png|webp))["']/)
	if (anyImg) return anyImg[1]
	return null
}

// ── Photooxy Effects Catalog ──
const photooxyEffects = [
	// Logo & Typography Effects (30)
	{ id: 'flaming', name: 'Flaming Text', url: '/logo-maker/flaming-text-online-161.html', texts: 1 },
	{ id: 'glossy', name: 'Glossy Text', url: '/logo-maker/glossy-text-online-162.html', texts: 1 },
	{ id: 'neon', name: 'Neon Text', url: '/logo-maker/neon-text-online-163.html', texts: 1 },
	{ id: 'rainbow', name: 'Rainbow Text', url: '/logo-maker/rainbow-text-online-164.html', texts: 1 },
	{ id: 'water', name: 'Water Text', url: '/logo-maker/water-text-online-165.html', texts: 1 },
	{ id: 'metal', name: 'Metal Text', url: '/logo-maker/metal-text-online-166.html', texts: 1 },
	{ id: 'chrome', name: 'Chrome Text', url: '/logo-maker/chrome-text-online-167.html', texts: 1 },
	{ id: 'gold', name: 'Gold Text', url: '/logo-maker/gold-text-online-168.html', texts: 1 },
	{ id: 'silver', name: 'Silver Text', url: '/logo-maker/silver-text-online-169.html', texts: 1 },
	{ id: 'copper', name: 'Copper Text', url: '/logo-maker/copper-text-online-170.html', texts: 1 },
	{ id: 'steel', name: 'Steel Text', url: '/logo-maker/steel-text-online-171.html', texts: 1 },
	{ id: 'diamond', name: 'Diamond Text', url: '/logo-maker/diamond-text-online-172.html', texts: 1 },
	{ id: 'crystal', name: 'Crystal Text', url: '/logo-maker/crystal-text-online-173.html', texts: 1 },
	{ id: 'glass', name: 'Glass Text', url: '/logo-maker/glass-text-online-174.html', texts: 1 },
	{ id: 'ice', name: 'Ice Text', url: '/logo-maker/ice-text-online-175.html', texts: 1 },
	{ id: 'snow', name: 'Snow Text', url: '/logo-maker/snow-text-online-176.html', texts: 1 },
	{ id: 'smoke', name: 'Smoke Text', url: '/logo-maker/smoke-text-online-177.html', texts: 1 },
	{ id: 'cloud', name: 'Cloud Text', url: '/logo-maker/cloud-text-online-178.html', texts: 1 },
	{ id: 'fire', name: 'Fire Text', url: '/logo-maker/fire-text-online-179.html', texts: 1 },
	{ id: 'lava', name: 'Lava Text', url: '/logo-maker/lava-text-online-180.html', texts: 1 },
	{ id: 'shadow', name: 'Shadow Text', url: '/logo-maker/shadow-text-online-181.html', texts: 1 },
	{ id: 'glow', name: 'Glow Text', url: '/logo-maker/glow-text-online-182.html', texts: 1 },
	{ id: 'sparkle', name: 'Sparkle Text', url: '/logo-maker/sparkle-text-online-183.html', texts: 1 },
	{ id: 'glitter', name: 'Glitter Text', url: '/logo-maker/glitter-text-online-184.html', texts: 1 },
	{ id: 'stars', name: 'Stars Text', url: '/logo-maker/stars-text-online-185.html', texts: 1 },
	{ id: 'lightning', name: 'Lightning Text', url: '/logo-maker/lightning-text-online-186.html', texts: 1 },
	{ id: 'thunder', name: 'Thunder Text', url: '/logo-maker/thunder-text-online-187.html', texts: 1 },
	{ id: 'electric', name: 'Electric Text', url: '/logo-maker/electric-text-online-188.html', texts: 1 },
	{ id: 'plasma', name: 'Plasma Text', url: '/logo-maker/plasma-text-online-189.html', texts: 1 },
	{ id: 'cosmic', name: 'Cosmic Text', url: '/logo-maker/cosmic-text-online-190.html', texts: 1 },

	// Nature & Scenery Effects (25)
	{ id: 'sunset', name: 'Sunset Text', url: '/logo-maker/sunset-text-online-191.html', texts: 1 },
	{ id: 'sunrise', name: 'Sunrise Text', url: '/logo-maker/sunrise-text-online-192.html', texts: 1 },
	{ id: 'ocean', name: 'Ocean Text', url: '/logo-maker/ocean-text-online-193.html', texts: 1 },
	{ id: 'beach', name: 'Beach Text', url: '/logo-maker/beach-text-online-194.html', texts: 1 },
	{ id: 'mountain', name: 'Mountain Text', url: '/logo-maker/mountain-text-online-195.html', texts: 1 },
	{ id: 'forest', name: 'Forest Text', url: '/logo-maker/forest-text-online-196.html', texts: 1 },
	{ id: 'garden', name: 'Garden Text', url: '/logo-maker/garden-text-online-197.html', texts: 1 },
	{ id: 'flower', name: 'Flower Text', url: '/logo-maker/flower-text-online-198.html', texts: 1 },
	{ id: 'rose', name: 'Rose Text', url: '/logo-maker/rose-text-online-199.html', texts: 1 },
	{ id: 'leaf', name: 'Leaf Text', url: '/logo-maker/leaf-text-online-200.html', texts: 1 },
	{ id: 'tree', name: 'Tree Text', url: '/logo-maker/tree-text-online-201.html', texts: 1 },
	{ id: 'grass', name: 'Grass Text', url: '/logo-maker/grass-text-online-202.html', texts: 1 },
	{ id: 'rain', name: 'Rain Text', url: '/logo-maker/rain-text-online-203.html', texts: 1 },
	{ id: 'storm', name: 'Storm Text', url: '/logo-maker/storm-text-online-204.html', texts: 1 },
	{ id: 'wind', name: 'Wind Text', url: '/logo-maker/wind-text-online-205.html', texts: 1 },
	{ id: 'aurora', name: 'Aurora Text', url: '/logo-maker/aurora-text-online-206.html', texts: 1 },
	{ id: 'galaxy', name: 'Galaxy Text', url: '/logo-maker/galaxy-text-online-207.html', texts: 1 },
	{ id: 'night', name: 'Night Text', url: '/logo-maker/night-text-online-208.html', texts: 1 },
	{ id: 'moon', name: 'Moon Text', url: '/logo-maker/moon-text-online-209.html', texts: 1 },
	{ id: 'space', name: 'Space Text', url: '/logo-maker/space-text-online-210.html', texts: 1 },
	{ id: 'comet', name: 'Comet Text', url: '/logo-maker/comet-text-online-211.html', texts: 1 },
	{ id: 'meteor', name: 'Meteor Text', url: '/logo-maker/meteor-text-online-212.html', texts: 1 },
	{ id: 'planet', name: 'Planet Text', url: '/logo-maker/planet-text-online-213.html', texts: 1 },
	{ id: 'nebula', name: 'Nebula Text', url: '/logo-maker/nebula-text-online-214.html', texts: 1 },
	{ id: 'constellation', name: 'Constellation Text', url: '/logo-maker/constellation-text-online-215.html', texts: 1 },

	// Art & Style Effects (25)
	{ id: 'graffiti', name: 'Graffiti Text', url: '/logo-maker/graffiti-text-online-216.html', texts: 1 },
	{ id: 'tattoo', name: 'Tattoo Text', url: '/logo-maker/tattoo-text-online-217.html', texts: 1 },
	{ id: 'sketch', name: 'Sketch Text', url: '/logo-maker/sketch-text-online-218.html', texts: 1 },
	{ id: 'pencil', name: 'Pencil Text', url: '/logo-maker/pencil-text-online-219.html', texts: 1 },
	{ id: 'paint', name: 'Paint Text', url: '/logo-maker/paint-text-online-220.html', texts: 1 },
	{ id: 'watercolor', name: 'Watercolor Text', url: '/logo-maker/watercolor-text-online-221.html', texts: 1 },
	{ id: 'oil', name: 'Oil Paint Text', url: '/logo-maker/oil-paint-text-online-222.html', texts: 1 },
	{ id: 'crayon', name: 'Crayon Text', url: '/logo-maker/crayon-text-online-223.html', texts: 1 },
	{ id: 'chalk', name: 'Chalk Text', url: '/logo-maker/chalk-text-online-224.html', texts: 1 },
	{ id: 'ink', name: 'Ink Text', url: '/logo-maker/ink-text-online-225.html', texts: 1 },
	{ id: 'brush', name: 'Brush Text', url: '/logo-maker/brush-text-online-226.html', texts: 1 },
	{ id: 'spray', name: 'Spray Text', url: '/logo-maker/spray-text-online-227.html', texts: 1 },
	{ id: 'mosaic', name: 'Mosaic Text', url: '/logo-maker/mosaic-text-online-228.html', texts: 1 },
	{ id: 'pixel', name: 'Pixel Text', url: '/logo-maker/pixel-text-online-229.html', texts: 1 },
	{ id: 'retro', name: 'Retro Text', url: '/logo-maker/retro-text-online-230.html', texts: 1 },
	{ id: 'vintage', name: 'Vintage Text', url: '/logo-maker/vintage-text-online-231.html', texts: 1 },
	{ id: 'art_deco', name: 'Art Deco Text', url: '/logo-maker/art-deco-text-online-232.html', texts: 1 },
	{ id: 'baroque', name: 'Baroque Text', url: '/logo-maker/baroque-text-online-233.html', texts: 1 },
	{ id: 'gothic', name: 'Gothic Text', url: '/logo-maker/gothic-text-online-234.html', texts: 1 },
	{ id: 'minimal', name: 'Minimal Text', url: '/logo-maker/minimal-text-online-235.html', texts: 1 },
	{ id: 'modern', name: 'Modern Text', url: '/logo-maker/modern-text-online-236.html', texts: 1 },
	{ id: 'futuristic', name: 'Futuristic Text', url: '/logo-maker/futuristic-text-online-237.html', texts: 1 },
	{ id: 'cyberpunk', name: 'Cyberpunk Text', url: '/logo-maker/cyberpunk-text-online-238.html', texts: 1 },
	{ id: 'steampunk', name: 'Steampunk Text', url: '/logo-maker/steampunk-text-online-239.html', texts: 1 },
	{ id: 'pop_art', name: 'Pop Art Text', url: '/logo-maker/pop-art-text-online-240.html', texts: 1 },

	// Special & Fun Effects (25)
	{ id: 'candy', name: 'Candy Text', url: '/logo-maker/candy-text-online-241.html', texts: 1 },
	{ id: 'chocolate', name: 'Chocolate Text', url: '/logo-maker/chocolate-text-online-242.html', texts: 1 },
	{ id: 'cookie', name: 'Cookie Text', url: '/logo-maker/cookie-text-online-243.html', texts: 1 },
	{ id: 'cake', name: 'Cake Text', url: '/logo-maker/cake-text-online-244.html', texts: 1 },
	{ id: 'donut', name: 'Donut Text', url: '/logo-maker/donut-text-online-245.html', texts: 1 },
	{ id: 'icecream', name: 'Ice Cream Text', url: '/logo-maker/ice-cream-text-online-246.html', texts: 1 },
	{ id: 'balloon', name: 'Balloon Text', url: '/logo-maker/balloon-text-online-247.html', texts: 1 },
	{ id: 'ribbon', name: 'Ribbon Text', url: '/logo-maker/ribbon-text-online-248.html', texts: 1 },
	{ id: 'gift', name: 'Gift Text', url: '/logo-maker/gift-text-online-249.html', texts: 1 },
	{ id: 'heart', name: 'Heart Text', url: '/logo-maker/heart-text-online-250.html', texts: 1 },
	{ id: 'love', name: 'Love Text', url: '/logo-maker/love-text-online-251.html', texts: 1 },
	{ id: 'butterfly', name: 'Butterfly Text', url: '/logo-maker/butterfly-text-online-252.html', texts: 1 },
	{ id: 'dragon', name: 'Dragon Text', url: '/logo-maker/dragon-text-online-253.html', texts: 1 },
	{ id: 'skull', name: 'Skull Text', url: '/logo-maker/skull-text-online-254.html', texts: 1 },
	{ id: 'crown', name: 'Crown Text', url: '/logo-maker/crown-text-online-255.html', texts: 1 },
	{ id: 'wings', name: 'Wings Text', url: '/logo-maker/wings-text-online-256.html', texts: 1 },
	{ id: 'angel', name: 'Angel Text', url: '/logo-maker/angel-text-online-257.html', texts: 1 },
	{ id: 'devil', name: 'Devil Text', url: '/logo-maker/devil-text-online-258.html', texts: 1 },
	{ id: 'ghost', name: 'Ghost Text', url: '/logo-maker/ghost-text-online-259.html', texts: 1 },
	{ id: 'zombie', name: 'Zombie Text', url: '/logo-maker/zombie-text-online-260.html', texts: 1 },
	{ id: 'vampire', name: 'Vampire Text', url: '/logo-maker/vampire-text-online-261.html', texts: 1 },
	{ id: 'werewolf', name: 'Werewolf Text', url: '/logo-maker/werewolf-text-online-262.html', texts: 1 },
	{ id: 'pirate', name: 'Pirate Text', url: '/logo-maker/pirate-text-online-263.html', texts: 1 },
	{ id: 'ninja', name: 'Ninja Text', url: '/logo-maker/ninja-text-online-264.html', texts: 1 },
	{ id: 'samurai', name: 'Samurai Text', url: '/logo-maker/samurai-text-online-265.html', texts: 1 },

	// Dual Text Effects (10)
	{ id: 'dual_flaming', name: 'Dual Flaming', url: '/logo-maker/dual-flaming-text-online-266.html', texts: 2 },
	{ id: 'dual_neon', name: 'Dual Neon', url: '/logo-maker/dual-neon-text-online-267.html', texts: 2 },
	{ id: 'dual_glow', name: 'Dual Glow', url: '/logo-maker/dual-glow-text-online-268.html', texts: 2 },
	{ id: 'dual_gold', name: 'Dual Gold', url: '/logo-maker/dual-gold-text-online-269.html', texts: 2 },
	{ id: 'dual_chrome', name: 'Dual Chrome', url: '/logo-maker/dual-chrome-text-online-270.html', texts: 2 },
	{ id: 'dual_graffiti', name: 'Dual Graffiti', url: '/logo-maker/dual-graffiti-text-online-271.html', texts: 2 },
	{ id: 'dual_galaxy', name: 'Dual Galaxy', url: '/logo-maker/dual-galaxy-text-online-272.html', texts: 2 },
	{ id: 'dual_rainbow', name: 'Dual Rainbow', url: '/logo-maker/dual-rainbow-text-online-273.html', texts: 2 },
	{ id: 'dual_sunset', name: 'Dual Sunset', url: '/logo-maker/dual-sunset-text-online-274.html', texts: 2 },
	{ id: 'dual_nature', name: 'Dual Nature', url: '/logo-maker/dual-nature-text-online-275.html', texts: 2 },

	// Logo & Brand Effects (15)
	{ id: 'logo_youtube', name: 'YouTube Style', url: '/logo-maker/youtube-style-online-276.html', texts: 1 },
	{ id: 'logo_facebook', name: 'Facebook Style', url: '/logo-maker/facebook-style-online-277.html', texts: 1 },
	{ id: 'logo_instagram', name: 'Instagram Style', url: '/logo-maker/instagram-style-online-278.html', texts: 1 },
	{ id: 'logo_twitter', name: 'Twitter Style', url: '/logo-maker/twitter-style-online-279.html', texts: 1 },
	{ id: 'logo_tiktok', name: 'TikTok Style', url: '/logo-maker/tiktok-style-online-280.html', texts: 1 },
	{ id: 'logo_whatsapp', name: 'WhatsApp Style', url: '/logo-maker/whatsapp-style-online-281.html', texts: 1 },
	{ id: 'logo_telegram', name: 'Telegram Style', url: '/logo-maker/telegram-style-online-282.html', texts: 1 },
	{ id: 'logo_discord', name: 'Discord Style', url: '/logo-maker/discord-style-online-283.html', texts: 1 },
	{ id: 'logo_spotify', name: 'Spotify Style', url: '/logo-maker/spotify-style-online-284.html', texts: 1 },
	{ id: 'logo_netflix', name: 'Netflix Style', url: '/logo-maker/netflix-style-online-285.html', texts: 1 },
	{ id: 'logo_snapchat', name: 'Snapchat Style', url: '/logo-maker/snapchat-style-online-286.html', texts: 1 },
	{ id: 'logo_twitch', name: 'Twitch Style', url: '/logo-maker/twitch-style-online-287.html', texts: 1 },
	{ id: 'logo_reddit', name: 'Reddit Style', url: '/logo-maker/reddit-style-online-288.html', texts: 1 },
	{ id: 'logo_pinterest', name: 'Pinterest Style', url: '/logo-maker/pinterest-style-online-289.html', texts: 1 },
	{ id: 'logo_tumblr', name: 'Tumblr Style', url: '/logo-maker/tumblr-style-online-290.html', texts: 1 },

	// Neon & Glow Effects (15)
	{ id: 'neon_blue', name: 'Neon Blue', url: '/logo-maker/neon-blue-online-291.html', texts: 1 },
	{ id: 'neon_red', name: 'Neon Red', url: '/logo-maker/neon-red-online-292.html', texts: 1 },
	{ id: 'neon_green', name: 'Neon Green', url: '/logo-maker/neon-green-online-293.html', texts: 1 },
	{ id: 'neon_purple', name: 'Neon Purple', url: '/logo-maker/neon-purple-online-294.html', texts: 1 },
	{ id: 'neon_pink', name: 'Neon Pink', url: '/logo-maker/neon-pink-online-295.html', texts: 1 },
	{ id: 'neon_yellow', name: 'Neon Yellow', url: '/logo-maker/neon-yellow-online-296.html', texts: 1 },
	{ id: 'neon_orange', name: 'Neon Orange', url: '/logo-maker/neon-orange-online-297.html', texts: 1 },
	{ id: 'neon_white', name: 'Neon White', url: '/logo-maker/neon-white-online-298.html', texts: 1 },
	{ id: 'neon_cyan', name: 'Neon Cyan', url: '/logo-maker/neon-cyan-online-299.html', texts: 1 },
	{ id: 'neon_magenta', name: 'Neon Magenta', url: '/logo-maker/neon-magenta-online-300.html', texts: 1 },
	{ id: 'glow_blue', name: 'Glow Blue', url: '/logo-maker/glow-blue-online-301.html', texts: 1 },
	{ id: 'glow_red', name: 'Glow Red', url: '/logo-maker/glow-red-online-302.html', texts: 1 },
	{ id: 'glow_green', name: 'Glow Green', url: '/logo-maker/glow-green-online-303.html', texts: 1 },
	{ id: 'glow_purple', name: 'Glow Purple', url: '/logo-maker/glow-purple-online-304.html', texts: 1 },
	{ id: 'glow_gold', name: 'Glow Gold', url: '/logo-maker/glow-gold-online-305.html', texts: 1 },

	// Special Effects (20)
	{ id: 'glitch2', name: 'Glitch Text 2', url: '/logo-maker/glitch-text-2-online-306.html', texts: 2 },
	{ id: 'hologram2', name: 'Hologram Text 2', url: '/logo-maker/hologram-text-2-online-307.html', texts: 1 },
	{ id: 'matrix2', name: 'Matrix Text 2', url: '/logo-maker/matrix-text-2-online-308.html', texts: 1 },
	{ id: 'cyberpunk2', name: 'Cyberpunk Text 2', url: '/logo-maker/cyberpunk-text-2-online-309.html', texts: 1 },
	{ id: 'vaporwave2', name: 'Vaporwave Text 2', url: '/logo-maker/vaporwave-text-2-online-310.html', texts: 1 },
	{ id: 'synthwave2', name: 'Synthwave Text 2', url: '/logo-maker/synthwave-text-2-online-311.html', texts: 1 },
	{ id: 'retrowave2', name: 'Retrowave Text 2', url: '/logo-maker/retrowave-text-2-online-312.html', texts: 1 },
	{ id: 'pixel2', name: 'Pixel Text 2', url: '/logo-maker/pixel-text-2-online-313.html', texts: 1 },
	{ id: '8bit2', name: '8-Bit Text 2', url: '/logo-maker/8bit-text-2-online-314.html', texts: 1 },
	{ id: 'ascii2', name: 'ASCII Text 2', url: '/logo-maker/ascii-text-2-online-315.html', texts: 1 },
	{ id: 'gradient2', name: 'Gradient Text 2', url: '/logo-maker/gradient-text-2-online-316.html', texts: 1 },
	{ id: 'rainbow2', name: 'Rainbow Text 2', url: '/logo-maker/rainbow-text-2-online-317.html', texts: 1 },
	{ id: 'sunset2', name: 'Sunset Text 2', url: '/logo-maker/sunset-text-2-online-318.html', texts: 1 },
	{ id: 'sunrise2', name: 'Sunrise Text 2', url: '/logo-maker/sunrise-text-2-online-319.html', texts: 1 },
	{ id: 'aurora2', name: 'Aurora Text 2', url: '/logo-maker/aurora-text-2-online-320.html', texts: 1 },
	{ id: 'eclipse2', name: 'Eclipse Text 2', url: '/logo-maker/eclipse-text-2-online-321.html', texts: 1 },
	{ id: 'underwater2', name: 'Underwater Text 2', url: '/logo-maker/underwater-text-2-online-322.html', texts: 1 },
	{ id: 'space2', name: 'Space Text 2', url: '/logo-maker/space-text-2-online-323.html', texts: 1 },
	{ id: 'alien2', name: 'Alien Text 2', url: '/logo-maker/alien-text-2-online-324.html', texts: 1 },
	{ id: 'robot2', name: 'Robot Text 2', url: '/logo-maker/robot-text-2-online-325.html', texts: 1 },
]

export const getPhotooxyEffects = () => photooxyEffects
export const getPhotooxyById = id => photooxyEffects.find(e => e.id === id)

export const photooxyListText = () => photooxyEffects.map(e => {
	const input = e.texts === 2 ? '<text1> <text2>' : '<text>'
	return `• ${e.id} ${input} — ${e.name}`
}).join('\n')

export const photooxyGenerate = async (effectId, texts) => {
	const effect = getPhotooxyById(effectId)
	if (!effect) return { ok: false, text: `Efek "${effectId}" tidak ditemukan.\n\n${photooxyListText()}` }

	const textArr = Array.isArray(texts) ? texts : [texts]
	if (textArr.length < effect.texts) {
		return { ok: false, text: `Efek "${effect.name}" butuh ${effect.texts} teks.\nContoh: .photooxy ${effectId} ${effect.texts === 2 ? 'Hello World' : 'Hello'}` }
	}

	try {
		const url = `${PHOTOOXY_BASE}${effect.url}`
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

		const fullUrl = imageUrl.startsWith('http') ? imageUrl : `${PHOTOOXY_BASE}${imageUrl}`
		return { ok: true, imageUrl: fullUrl, effect: effect.name }
	} catch (error) {
		return { ok: false, text: `Photooxy gagal: ${error.message || error}` }
	}
}
