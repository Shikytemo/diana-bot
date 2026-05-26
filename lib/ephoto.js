// ePhoto360 text/image effect maker
// Scrapes en.ephoto360.com via their form endpoints

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
		|| html.match(/["']([^"']*(?:ephoto360\.com\/upload)[^"']*\.(?:jpg|png|webp))["']/i)
	if (imgMatch) return imgMatch[1]
	// Fallback: find any image URL
	const anyImg = html.match(/["'](https?:\/\/[^"']+\.(?:jpg|png|webp))["']/)
	if (anyImg) return anyImg[1]
	return null
}

// ── ePhoto360 Effects Catalog ──
const ephotoEffects = [
	// ── Neon & Light Effects (30) ──
	{ id: 'neon_light', name: 'Neon Light Text', url: '/neon-light-text-effect-online-815.html', texts: 1 },
	{ id: 'neon_glow', name: 'Neon Glow', url: '/neon-glow-text-effect-online-816.html', texts: 1 },
	{ id: 'neon_square', name: 'Neon Square', url: '/neon-square-text-effect-online-817.html', texts: 1 },
	{ id: 'neon_circle', name: 'Neon Circle', url: '/neon-circle-text-effect-online-818.html', texts: 1 },
	{ id: 'neon_3d', name: '3D Neon', url: '/3d-neon-text-effect-online-819.html', texts: 1 },
	{ id: 'neon_flower', name: 'Neon Flower', url: '/neon-flower-text-effect-online-820.html', texts: 1 },
	{ id: 'neon_butterfly', name: 'Neon Butterfly', url: '/neon-butterfly-text-effect-online-821.html', texts: 1 },
	{ id: 'neon_crown', name: 'Neon Crown', url: '/neon-crown-text-effect-online-822.html', texts: 1 },
	{ id: 'neon_dragon', name: 'Neon Dragon', url: '/neon-dragon-text-effect-online-823.html', texts: 1 },
	{ id: 'neon_angel', name: 'Neon Angel', url: '/neon-angel-text-effect-online-824.html', texts: 1 },
	{ id: 'neon_fire', name: 'Neon Fire', url: '/neon-fire-text-effect-online-825.html', texts: 1 },
	{ id: 'neon_ice', name: 'Neon Ice', url: '/neon-ice-text-effect-online-826.html', texts: 1 },
	{ id: 'neon_love', name: 'Neon Love', url: '/neon-love-text-effect-online-827.html', texts: 1 },
	{ id: 'neon_music', name: 'Neon Music', url: '/neon-music-text-effect-online-828.html', texts: 1 },
	{ id: 'neon_skull', name: 'Neon Skull', url: '/neon-skull-text-effect-online-829.html', texts: 1 },
	{ id: 'neon_star', name: 'Neon Star', url: '/neon-star-text-effect-online-830.html', texts: 1 },
	{ id: 'neon_heart', name: 'Neon Heart', url: '/neon-heart-text-effect-online-831.html', texts: 1 },
	{ id: 'neon_bird', name: 'Neon Bird', url: '/neon-bird-text-effect-online-832.html', texts: 1 },
	{ id: 'neon_cat', name: 'Neon Cat', url: '/neon-cat-text-effect-online-833.html', texts: 1 },
	{ id: 'neon_wolf', name: 'Neon Wolf', url: '/neon-wolf-text-effect-online-834.html', texts: 1 },
	{ id: 'neon_galaxy', name: 'Neon Galaxy', url: '/neon-galaxy-text-effect-online-835.html', texts: 1 },
	{ id: 'neon_rainbow', name: 'Neon Rainbow', url: '/neon-rainbow-text-effect-online-836.html', texts: 1 },
	{ id: 'neon_sunset', name: 'Neon Sunset', url: '/neon-sunset-text-effect-online-837.html', texts: 1 },
	{ id: 'neon_ocean', name: 'Neon Ocean', url: '/neon-ocean-text-effect-online-838.html', texts: 1 },
	{ id: 'neon_forest', name: 'Neon Forest', url: '/neon-forest-text-effect-online-839.html', texts: 1 },
	{ id: 'neon_city', name: 'Neon City', url: '/neon-city-text-effect-online-840.html', texts: 1 },
	{ id: 'neon_snow', name: 'Neon Snow', url: '/neon-snow-text-effect-online-841.html', texts: 1 },
	{ id: 'neon_cloud', name: 'Neon Cloud', url: '/neon-cloud-text-effect-online-842.html', texts: 1 },
	{ id: 'neon_thunder', name: 'Neon Thunder', url: '/neon-thunder-text-effect-online-843.html', texts: 1 },
	{ id: 'neon_bubble', name: 'Neon Bubble', url: '/neon-bubble-text-effect-online-844.html', texts: 1 },

	// ── Logo & Brand Effects (25) ──
	{ id: 'logo_youtube', name: 'YouTube Logo', url: '/youtube-logo-maker-online-845.html', texts: 1 },
	{ id: 'logo_facebook', name: 'Facebook Logo', url: '/facebook-logo-maker-online-846.html', texts: 1 },
	{ id: 'logo_instagram', name: 'Instagram Logo', url: '/instagram-logo-maker-online-847.html', texts: 1 },
	{ id: 'logo_twitter', name: 'Twitter Logo', url: '/twitter-logo-maker-online-848.html', texts: 1 },
	{ id: 'logo_tiktok', name: 'TikTok Logo', url: '/tiktok-logo-maker-online-849.html', texts: 1 },
	{ id: 'logo_whatsapp', name: 'WhatsApp Logo', url: '/whatsapp-logo-maker-online-850.html', texts: 1 },
	{ id: 'logo_snapchat', name: 'Snapchat Logo', url: '/snapchat-logo-maker-online-851.html', texts: 1 },
	{ id: 'logo_telegram', name: 'Telegram Logo', url: '/telegram-logo-maker-online-852.html', texts: 1 },
	{ id: 'logo_discord', name: 'Discord Logo', url: '/discord-logo-maker-online-853.html', texts: 1 },
	{ id: 'logo_spotify', name: 'Spotify Logo', url: '/spotify-logo-maker-online-854.html', texts: 1 },
	{ id: 'logo_netflix', name: 'Netflix Logo', url: '/netflix-logo-maker-online-855.html', texts: 1 },
	{ id: 'logo_amazon', name: 'Amazon Logo', url: '/amazon-logo-maker-online-856.html', texts: 1 },
	{ id: 'logo_apple', name: 'Apple Logo', url: '/apple-logo-maker-online-857.html', texts: 1 },
	{ id: 'logo_google', name: 'Google Logo', url: '/google-logo-maker-online-858.html', texts: 1 },
	{ id: 'logo_microsoft', name: 'Microsoft Logo', url: '/microsoft-logo-maker-online-859.html', texts: 1 },
	{ id: 'logo_samsung', name: 'Samsung Logo', url: '/samsung-logo-maker-online-860.html', texts: 1 },
	{ id: 'logo_nike', name: 'Nike Logo', url: '/nike-logo-maker-online-861.html', texts: 1 },
	{ id: 'logo_adidas', name: 'Adidas Logo', url: '/adidas-logo-maker-online-862.html', texts: 1 },
	{ id: 'logo_supreme', name: 'Supreme Logo', url: '/supreme-logo-maker-online-863.html', texts: 1 },
	{ id: 'logo_louis_vuitton', name: 'Louis Vuitton', url: '/louis-vuitton-logo-maker-online-864.html', texts: 1 },
	{ id: 'logo_gucci', name: 'Gucci Logo', url: '/gucci-logo-maker-online-865.html', texts: 1 },
	{ id: 'logo_chanel', name: 'Chanel Logo', url: '/chanel-logo-maker-online-866.html', texts: 1 },
	{ id: 'logo_ferrari', name: 'Ferrari Logo', url: '/ferrari-logo-maker-online-867.html', texts: 1 },
	{ id: 'logo_bmw', name: 'BMW Logo', url: '/bmw-logo-maker-online-868.html', texts: 1 },
	{ id: 'logo_mercedes', name: 'Mercedes Logo', url: '/mercedes-logo-maker-online-869.html', texts: 1 },

	// ── Cover & Banner Effects (20) ──
	{ id: 'cover_facebook', name: 'Facebook Cover', url: '/facebook-cover-photo-maker-online-870.html', texts: 1 },
	{ id: 'cover_youtube', name: 'YouTube Banner', url: '/youtube-banner-maker-online-871.html', texts: 1 },
	{ id: 'cover_twitter', name: 'Twitter Header', url: '/twitter-header-maker-online-872.html', texts: 1 },
	{ id: 'cover_gaming', name: 'Gaming Banner', url: '/gaming-banner-maker-online-873.html', texts: 1 },
	{ id: 'cover_music', name: 'Music Banner', url: '/music-banner-maker-online-874.html', texts: 1 },
	{ id: 'cover_sports', name: 'Sports Banner', url: '/sports-banner-maker-online-875.html', texts: 1 },
	{ id: 'cover_nature', name: 'Nature Cover', url: '/nature-cover-maker-online-876.html', texts: 1 },
	{ id: 'cover_abstract', name: 'Abstract Cover', url: '/abstract-cover-maker-online-877.html', texts: 1 },
	{ id: 'cover_minimalist', name: 'Minimalist Cover', url: '/minimalist-cover-maker-online-878.html', texts: 1 },
	{ id: 'cover_gradient', name: 'Gradient Cover', url: '/gradient-cover-maker-online-879.html', texts: 1 },
	{ id: 'cover_galaxy', name: 'Galaxy Cover', url: '/galaxy-cover-maker-online-880.html', texts: 1 },
	{ id: 'cover_sunset', name: 'Sunset Cover', url: '/sunset-cover-maker-online-881.html', texts: 1 },
	{ id: 'cover_ocean', name: 'Ocean Cover', url: '/ocean-cover-maker-online-882.html', texts: 1 },
	{ id: 'cover_forest', name: 'Forest Cover', url: '/forest-cover-maker-online-883.html', texts: 1 },
	{ id: 'cover_city', name: 'City Cover', url: '/city-cover-maker-online-884.html', texts: 1 },
	{ id: 'cover_neon', name: 'Neon Cover', url: '/neon-cover-maker-online-885.html', texts: 1 },
	{ id: 'cover_vintage', name: 'Vintage Cover', url: '/vintage-cover-maker-online-886.html', texts: 1 },
	{ id: 'cover_digital', name: 'Digital Cover', url: '/digital-cover-maker-online-887.html', texts: 1 },
	{ id: 'cover_fire', name: 'Fire Cover', url: '/fire-cover-maker-online-888.html', texts: 1 },
	{ id: 'cover_ice', name: 'Ice Cover', url: '/ice-cover-maker-online-889.html', texts: 1 },

	// ── Name Effects (25) ──
	{ id: 'name_neon', name: 'Neon Name', url: '/neon-name-effect-online-890.html', texts: 1 },
	{ id: 'name_gold', name: 'Gold Name', url: '/gold-name-effect-online-891.html', texts: 1 },
	{ id: 'name_silver', name: 'Silver Name', url: '/silver-name-effect-online-892.html', texts: 1 },
	{ id: 'name_diamond', name: 'Diamond Name', url: '/diamond-name-effect-online-893.html', texts: 1 },
	{ id: 'name_fire', name: 'Fire Name', url: '/fire-name-effect-online-894.html', texts: 1 },
	{ id: 'name_ice', name: 'Ice Name', url: '/ice-name-effect-online-895.html', texts: 1 },
	{ id: 'name_water', name: 'Water Name', url: '/water-name-effect-online-896.html', texts: 1 },
	{ id: 'name_smoke', name: 'Smoke Name', url: '/smoke-name-effect-online-897.html', texts: 1 },
	{ id: 'name_sand', name: 'Sand Name', url: '/sand-name-effect-online-898.html', texts: 1 },
	{ id: 'name_graffiti', name: 'Graffiti Name', url: '/graffiti-name-effect-online-899.html', texts: 1 },
	{ id: 'name_tattoo', name: 'Tattoo Name', url: '/tattoo-name-effect-online-900.html', texts: 1 },
	{ id: 'name_heart', name: 'Heart Name', url: '/heart-name-effect-online-901.html', texts: 1 },
	{ id: 'name_flower', name: 'Flower Name', url: '/flower-name-effect-online-902.html', texts: 1 },
	{ id: 'name_butterfly', name: 'Butterfly Name', url: '/butterfly-name-effect-online-903.html', texts: 1 },
	{ id: 'name_star', name: 'Star Name', url: '/star-name-effect-online-904.html', texts: 1 },
	{ id: 'name_crown', name: 'Crown Name', url: '/crown-name-effect-online-905.html', texts: 1 },
	{ id: 'name_wings', name: 'Wings Name', url: '/wings-name-effect-online-906.html', texts: 1 },
	{ id: 'name_skull', name: 'Skull Name', url: '/skull-name-effect-online-907.html', texts: 1 },
	{ id: 'name_dragon', name: 'Dragon Name', url: '/dragon-name-effect-online-908.html', texts: 1 },
	{ id: 'name_angel', name: 'Angel Name', url: '/angel-name-effect-online-909.html', texts: 1 },
	{ id: 'name_devil', name: 'Devil Name', url: '/devil-name-effect-online-910.html', texts: 1 },
	{ id: 'name_robot', name: 'Robot Name', url: '/robot-name-effect-online-911.html', texts: 1 },
	{ id: 'name_royal', name: 'Royal Name', url: '/royal-name-effect-online-912.html', texts: 1 },
	{ id: 'name_vintage', name: 'Vintage Name', url: '/vintage-name-effect-online-913.html', texts: 1 },
	{ id: 'name_retro', name: 'Retro Name', url: '/retro-name-effect-online-914.html', texts: 1 },

	// ── Birthday & Celebration Effects (25) ──
	{ id: 'birthday_cake', name: 'Birthday Cake', url: '/birthday-cake-text-effect-online-915.html', texts: 1 },
	{ id: 'birthday_balloon', name: 'Birthday Balloon', url: '/birthday-balloon-text-effect-online-916.html', texts: 1 },
	{ id: 'birthday_candle', name: 'Birthday Candle', url: '/birthday-candle-text-effect-online-917.html', texts: 1 },
	{ id: 'birthday_card', name: 'Birthday Card', url: '/birthday-card-text-effect-online-918.html', texts: 1 },
	{ id: 'birthday_ribbon', name: 'Birthday Ribbon', url: '/birthday-ribbon-text-effect-online-919.html', texts: 1 },
	{ id: 'birthday_gift', name: 'Birthday Gift', url: '/birthday-gift-text-effect-online-920.html', texts: 1 },
	{ id: 'birthday_confetti', name: 'Birthday Confetti', url: '/birthday-confetti-text-effect-online-921.html', texts: 1 },
	{ id: 'birthday_star', name: 'Birthday Star', url: '/birthday-star-text-effect-online-922.html', texts: 1 },
	{ id: 'birthday_flower', name: 'Birthday Flower', url: '/birthday-flower-text-effect-online-923.html', texts: 1 },
	{ id: 'birthday_crown', name: 'Birthday Crown', url: '/birthday-crown-text-effect-online-924.html', texts: 1 },
	{ id: 'wedding_ring', name: 'Wedding Ring', url: '/wedding-ring-text-effect-online-925.html', texts: 1 },
	{ id: 'wedding_heart', name: 'Wedding Heart', url: '/wedding-heart-text-effect-online-926.html', texts: 1 },
	{ id: 'wedding_flower', name: 'Wedding Flower', url: '/wedding-flower-text-effect-online-927.html', texts: 1 },
	{ id: 'wedding_elegant', name: 'Wedding Elegant', url: '/wedding-elegant-text-effect-online-928.html', texts: 1 },
	{ id: 'anniversary_gold', name: 'Anniversary Gold', url: '/anniversary-gold-text-effect-online-929.html', texts: 1 },
	{ id: 'anniversary_silver', name: 'Anniversary Silver', url: '/anniversary-silver-text-effect-online-930.html', texts: 1 },
	{ id: 'christmas_tree', name: 'Christmas Tree', url: '/christmas-tree-text-effect-online-931.html', texts: 1 },
	{ id: 'christmas_snow', name: 'Christmas Snow', url: '/christmas-snow-text-effect-online-932.html', texts: 1 },
	{ id: 'christmas_ornament', name: 'Christmas Ornament', url: '/christmas-ornament-text-effect-online-933.html', texts: 1 },
	{ id: 'christmas_gift', name: 'Christmas Gift', url: '/christmas-gift-text-effect-online-934.html', texts: 1 },
	{ id: 'new_year', name: 'New Year', url: '/new-year-text-effect-online-935.html', texts: 1 },
	{ id: 'new_year_firework', name: 'New Year Firework', url: '/new-year-firework-text-effect-online-936.html', texts: 1 },
	{ id: 'valentine_heart', name: 'Valentine Heart', url: '/valentine-heart-text-effect-online-937.html', texts: 1 },
	{ id: 'valentine_rose', name: 'Valentine Rose', url: '/valentine-rose-text-effect-online-938.html', texts: 1 },
	{ id: 'valentine_couple', name: 'Valentine Couple', url: '/valentine-couple-text-effect-online-939.html', texts: 1 },

	// ── 3D & Special Effects (25) ──
	{ id: '3d_text', name: '3D Text', url: '/3d-text-effect-online-940.html', texts: 1 },
	{ id: '3d_gold', name: '3D Gold', url: '/3d-gold-text-effect-online-941.html', texts: 1 },
	{ id: '3d_silver', name: '3D Silver', url: '/3d-silver-text-effect-online-942.html', texts: 1 },
	{ id: '3d_chrome', name: '3D Chrome', url: '/3d-chrome-text-effect-online-943.html', texts: 1 },
	{ id: '3d_brick', name: '3D Brick', url: '/3d-brick-text-effect-online-944.html', texts: 1 },
	{ id: '3d_stone', name: '3D Stone', url: '/3d-stone-text-effect-online-945.html', texts: 1 },
	{ id: '3d_wood', name: '3D Wood', url: '/3d-wood-text-effect-online-946.html', texts: 1 },
	{ id: '3d_metal', name: '3D Metal', url: '/3d-metal-text-effect-online-947.html', texts: 1 },
	{ id: '3d_glass', name: '3D Glass', url: '/3d-glass-text-effect-online-948.html', texts: 1 },
	{ id: '3d_plastic', name: '3D Plastic', url: '/3d-plastic-text-effect-online-949.html', texts: 1 },
	{ id: '3d_rubber', name: '3D Rubber', url: '/3d-rubber-text-effect-online-950.html', texts: 1 },
	{ id: '3d_balloon', name: '3D Balloon', url: '/3d-balloon-text-effect-online-951.html', texts: 1 },
	{ id: '3d_candy', name: '3D Candy', url: '/3d-candy-text-effect-online-952.html', texts: 1 },
	{ id: '3d_chocolate', name: '3D Chocolate', url: '/3d-chocolate-text-effect-online-953.html', texts: 1 },
	{ id: '3d_ice_cream', name: '3D Ice Cream', url: '/3d-ice-cream-text-effect-online-954.html', texts: 1 },
	{ id: '3d_cake', name: '3D Cake', url: '/3d-cake-text-effect-online-955.html', texts: 1 },
	{ id: '3d_sand', name: '3D Sand', url: '/3d-sand-text-effect-online-956.html', texts: 1 },
	{ id: '3d_water', name: '3D Water', url: '/3d-water-text-effect-online-957.html', texts: 1 },
	{ id: '3d_fire', name: '3D Fire', url: '/3d-fire-text-effect-online-958.html', texts: 1 },
	{ id: '3d_ice', name: '3D Ice', url: '/3d-ice-text-effect-online-959.html', texts: 1 },
	{ id: '3d_neon', name: '3D Neon', url: '/3d-neon-text-effect-online-960.html', texts: 1 },
	{ id: '3d_glow', name: '3D Glow', url: '/3d-glow-text-effect-online-961.html', texts: 1 },
	{ id: '3d_hologram', name: '3D Hologram', url: '/3d-hologram-text-effect-online-962.html', texts: 1 },
	{ id: '3d_pixel', name: '3D Pixel', url: '/3d-pixel-text-effect-online-963.html', texts: 1 },
	{ id: '3d_retro', name: '3D Retro', url: '/3d-retro-text-effect-online-964.html', texts: 1 },

	// ── Nature & Background Effects (25) ──
	{ id: 'nature_sunset', name: 'Sunset Text', url: '/sunset-text-effect-online-965.html', texts: 1 },
	{ id: 'nature_sunrise', name: 'Sunrise Text', url: '/sunrise-text-effect-online-966.html', texts: 1 },
	{ id: 'nature_rain', name: 'Rain Text', url: '/rain-text-effect-online-967.html', texts: 1 },
	{ id: 'nature_snow', name: 'Snow Text', url: '/snow-text-effect-online-968.html', texts: 1 },
	{ id: 'nature_thunder', name: 'Thunder Text', url: '/thunder-text-effect-online-969.html', texts: 1 },
	{ id: 'nature_rainbow', name: 'Rainbow Text', url: '/rainbow-text-effect-online-970.html', texts: 1 },
	{ id: 'nature_aurora', name: 'Aurora Text', url: '/aurora-text-effect-online-971.html', texts: 1 },
	{ id: 'nature_moon', name: 'Moon Text', url: '/moon-text-effect-online-972.html', texts: 1 },
	{ id: 'nature_stars', name: 'Stars Text', url: '/stars-text-effect-online-973.html', texts: 1 },
	{ id: 'nature_cloud', name: 'Cloud Text', url: '/cloud-text-effect-online-974.html', texts: 1 },
	{ id: 'nature_fog', name: 'Fog Text', url: '/fog-text-effect-online-975.html', texts: 1 },
	{ id: 'nature_mist', name: 'Mist Text', url: '/mist-text-effect-online-976.html', texts: 1 },
	{ id: 'nature_waterfall', name: 'Waterfall Text', url: '/waterfall-text-effect-online-977.html', texts: 1 },
	{ id: 'nature_volcano', name: 'Volcano Text', url: '/volcano-text-effect-online-978.html', texts: 1 },
	{ id: 'nature_desert', name: 'Desert Text', url: '/desert-text-effect-online-979.html', texts: 1 },
	{ id: 'nature_mountain', name: 'Mountain Text', url: '/mountain-text-effect-online-980.html', texts: 1 },
	{ id: 'nature_forest', name: 'Forest Text', url: '/forest-text-effect-online-981.html', texts: 1 },
	{ id: 'nature_ocean', name: 'Ocean Text', url: '/ocean-text-effect-online-982.html', texts: 1 },
	{ id: 'nature_river', name: 'River Text', url: '/river-text-effect-online-983.html', texts: 1 },
	{ id: 'nature_lake', name: 'Lake Text', url: '/lake-text-effect-online-984.html', texts: 1 },
	{ id: 'nature_sky', name: 'Sky Text', url: '/sky-text-effect-online-985.html', texts: 1 },
	{ id: 'nature_storm', name: 'Storm Text', url: '/storm-text-effect-online-986.html', texts: 1 },
	{ id: 'nature_wind', name: 'Wind Text', url: '/wind-text-effect-online-987.html', texts: 1 },
	{ id: 'nature_spring', name: 'Spring Text', url: '/spring-text-effect-online-988.html', texts: 1 },
	{ id: 'nature_autumn', name: 'Autumn Text', url: '/autumn-text-effect-online-989.html', texts: 1 },

	// ── Anime & Cartoon Effects (25) ──
	{ id: 'anime_naruto', name: 'Naruto Style', url: '/naruto-text-effect-online-990.html', texts: 1 },
	{ id: 'anime_onepiece', name: 'One Piece Style', url: '/one-piece-text-effect-online-991.html', texts: 1 },
	{ id: 'anime_dragonball', name: 'Dragon Ball Style', url: '/dragon-ball-text-effect-online-992.html', texts: 1 },
	{ id: 'anime_demon', name: 'Demon Slayer Style', url: '/demon-slayer-text-effect-online-993.html', texts: 1 },
	{ id: 'anime_attack', name: 'Attack on Titan Style', url: '/attack-on-titan-text-effect-online-994.html', texts: 1 },
	{ id: 'anime_jujutsu', name: 'Jujutsu Kaisen Style', url: '/jujutsu-kaisen-text-effect-online-995.html', texts: 1 },
	{ id: 'anime_spy', name: 'Spy x Family Style', url: '/spy-family-text-effect-online-996.html', texts: 1 },
	{ id: 'anime_chainsaw', name: 'Chainsaw Man Style', url: '/chainsaw-man-text-effect-online-997.html', texts: 1 },
	{ id: 'anime_myhero', name: 'My Hero Academia Style', url: '/my-hero-academia-text-effect-online-998.html', texts: 1 },
	{ id: 'anime_sword', name: 'Sword Art Online Style', url: '/sword-art-online-text-effect-online-999.html', texts: 1 },
	{ id: 'cartoon_spongebob', name: 'SpongeBob Style', url: '/spongebob-text-effect-online-1000.html', texts: 1 },
	{ id: 'cartoon_simon', name: 'Simpsons Style', url: '/simpsons-text-effect-online-1001.html', texts: 1 },
	{ id: 'cartoon_mickey', name: 'Mickey Mouse Style', url: '/mickey-mouse-text-effect-online-1002.html', texts: 1 },
	{ id: 'cartoon_disney', name: 'Disney Style', url: '/disney-text-effect-online-1003.html', texts: 1 },
	{ id: 'cartoon_marvel', name: 'Marvel Style', url: '/marvel-text-effect-online-1004.html', texts: 1 },
	{ id: 'cartoon_dc', name: 'DC Style', url: '/dc-text-effect-online-1005.html', texts: 1 },
	{ id: 'cartoon_pixar', name: 'Pixar Style', url: '/pixar-text-effect-online-1006.html', texts: 1 },
	{ id: 'cartoon_anime', name: 'Anime Style', url: '/anime-text-effect-online-1007.html', texts: 1 },
	{ id: 'cartoon_manga', name: 'Manga Style', url: '/manga-text-effect-online-1008.html', texts: 1 },
	{ id: 'cartoon_chibi', name: 'Chibi Style', url: '/chibi-text-effect-online-1009.html', texts: 1 },
	{ id: 'cartoon_kawaii', name: 'Kawaii Style', url: '/kawaii-text-effect-online-1010.html', texts: 1 },
	{ id: 'cartoon_retro', name: 'Retro Cartoon', url: '/retro-cartoon-text-effect-online-1011.html', texts: 1 },
	{ id: 'cartoon_pixel', name: 'Pixel Art', url: '/pixel-art-text-effect-online-1012.html', texts: 1 },
	{ id: 'cartoon_8bit', name: '8-Bit Style', url: '/8bit-text-effect-online-1013.html', texts: 1 },
	{ id: 'cartoon_vaporwave', name: 'Vaporwave', url: '/vaporwave-text-effect-online-1014.html', texts: 1 },

	// ── Dual Text Effects (20) ──
	{ id: 'dual_neon', name: 'Dual Neon', url: '/dual-neon-text-effect-online-1015.html', texts: 2 },
	{ id: 'dual_fire', name: 'Dual Fire', url: '/dual-fire-text-effect-online-1016.html', texts: 2 },
	{ id: 'dual_ice', name: 'Dual Ice', url: '/dual-ice-text-effect-online-1017.html', texts: 2 },
	{ id: 'dual_gold', name: 'Dual Gold', url: '/dual-gold-text-effect-online-1018.html', texts: 2 },
	{ id: 'dual_silver', name: 'Dual Silver', url: '/dual-silver-text-effect-online-1019.html', texts: 2 },
	{ id: 'dual_chrome', name: 'Dual Chrome', url: '/dual-chrome-text-effect-online-1020.html', texts: 2 },
	{ id: 'dual_graffiti', name: 'Dual Graffiti', url: '/dual-graffiti-text-effect-online-1021.html', texts: 2 },
	{ id: 'dual_galaxy', name: 'Dual Galaxy', url: '/dual-galaxy-text-effect-online-1022.html', texts: 2 },
	{ id: 'dual_rainbow', name: 'Dual Rainbow', url: '/dual-rainbow-text-effect-online-1023.html', texts: 2 },
	{ id: 'dual_sunset', name: 'Dual Sunset', url: '/dual-sunset-text-effect-online-1024.html', texts: 2 },
	{ id: 'dual_ocean', name: 'Dual Ocean', url: '/dual-ocean-text-effect-online-1025.html', texts: 2 },
	{ id: 'dual_forest', name: 'Dual Forest', url: '/dual-forest-text-effect-online-1026.html', texts: 2 },
	{ id: 'dual_city', name: 'Dual City', url: '/dual-city-text-effect-online-1027.html', texts: 2 },
	{ id: 'dual_neon_light', name: 'Dual Neon Light', url: '/dual-neon-light-text-effect-online-1028.html', texts: 2 },
	{ id: 'dual_3d', name: 'Dual 3D', url: '/dual-3d-text-effect-online-1029.html', texts: 2 },
	{ id: 'dual_vintage', name: 'Dual Vintage', url: '/dual-vintage-text-effect-online-1030.html', texts: 2 },
	{ id: 'dual_retro', name: 'Dual Retro', url: '/dual-retro-text-effect-online-1031.html', texts: 2 },
	{ id: 'dual_modern', name: 'Dual Modern', url: '/dual-modern-text-effect-online-1032.html', texts: 2 },
	{ id: 'dual_elegant', name: 'Dual Elegant', url: '/dual-elegant-text-effect-online-1033.html', texts: 2 },
	{ id: 'dual_minimalist', name: 'Dual Minimalist', url: '/dual-minimalist-text-effect-online-1034.html', texts: 2 },

	// ── Holiday & Seasonal Effects (25) ──
	{ id: 'easter_egg', name: 'Easter Egg', url: '/easter-egg-text-effect-online-1035.html', texts: 1 },
	{ id: 'easter_bunny', name: 'Easter Bunny', url: '/easter-bunny-text-effect-online-1036.html', texts: 1 },
	{ id: 'halloween_pumpkin', name: 'Halloween Pumpkin', url: '/halloween-pumpkin-text-effect-online-1037.html', texts: 1 },
	{ id: 'halloween_ghost', name: 'Halloween Ghost', url: '/halloween-ghost-text-effect-online-1038.html', texts: 1 },
	{ id: 'halloween_bat', name: 'Halloween Bat', url: '/halloween-bat-text-effect-online-1039.html', texts: 1 },
	{ id: 'halloween_witch', name: 'Halloween Witch', url: '/halloween-witch-text-effect-online-1040.html', texts: 1 },
	{ id: 'thanksgiving', name: 'Thanksgiving', url: '/thanksgiving-text-effect-online-1041.html', texts: 1 },
	{ id: 'diwali', name: 'Diwali', url: '/diwali-text-effect-online-1042.html', texts: 1 },
	{ id: 'chinese_newyear', name: 'Chinese New Year', url: '/chinese-new-year-text-effect-online-1043.html', texts: 1 },
	{ id: 'eid_mubarak', name: 'Eid Mubarak', url: '/eid-mubarak-text-effect-online-1044.html', texts: 1 },
	{ id: 'independence_day', name: 'Independence Day', url: '/independence-day-text-effect-online-1045.html', texts: 1 },
	{ id: 'spring_blossom', name: 'Spring Blossom', url: '/spring-blossom-text-effect-online-1046.html', texts: 1 },
	{ id: 'summer_beach', name: 'Summer Beach', url: '/summer-beach-text-effect-online-1047.html', texts: 1 },
	{ id: 'autumn_leaves', name: 'Autumn Leaves', url: '/autumn-leaves-text-effect-online-1048.html', texts: 1 },
	{ id: 'winter_snow', name: 'Winter Snow', url: '/winter-snow-text-effect-online-1049.html', texts: 1 },
	{ id: 'rainy_day', name: 'Rainy Day', url: '/rainy-day-text-effect-online-1050.html', texts: 1 },
	{ id: 'sunny_day', name: 'Sunny Day', url: '/sunny-day-text-effect-online-1051.html', texts: 1 },
	{ id: 'windy_day', name: 'Windy Day', url: '/windy-day-text-effect-online-1052.html', texts: 1 },
	{ id: 'foggy_morning', name: 'Foggy Morning', url: '/foggy-morning-text-effect-online-1053.html', texts: 1 },
	{ id: 'starry_night', name: 'Starry Night', url: '/starry-night-text-effect-online-1054.html', texts: 1 },
	{ id: 'moonlight', name: 'Moonlight', url: '/moonlight-text-effect-online-1055.html', texts: 1 },
	{ id: 'sunrise_text', name: 'Sunrise Text', url: '/sunrise-text-effect-online-1056.html', texts: 1 },
	{ id: 'sunset_text', name: 'Sunset Text', url: '/sunset-text-effect-online-1057.html', texts: 1 },
	{ id: 'eclipse_text', name: 'Eclipse Text', url: '/eclipse-text-effect-online-1058.html', texts: 1 },
	{ id: 'aurora_text', name: 'Aurora Text', url: '/aurora-text-effect-online-1059.html', texts: 1 },

	// ── Social Media Effects (25) ──
	{ id: 'logo_youtube2', name: 'YouTube Banner', url: '/youtube-banner-maker-online-1060.html', texts: 1 },
	{ id: 'logo_facebook2', name: 'Facebook Cover', url: '/facebook-cover-maker-online-1061.html', texts: 1 },
	{ id: 'logo_twitter2', name: 'Twitter Header', url: '/twitter-header-maker-online-1062.html', texts: 1 },
	{ id: 'logo_linkedin', name: 'LinkedIn Banner', url: '/linkedin-banner-maker-online-1063.html', texts: 1 },
	{ id: 'logo_twitch2', name: 'Twitch Overlay', url: '/twitch-overlay-maker-online-1064.html', texts: 1 },
	{ id: 'logo_kick', name: 'Kick Logo', url: '/kick-logo-maker-online-1065.html', texts: 1 },
	{ id: 'logo_threads', name: 'Threads Logo', url: '/threads-logo-maker-online-1066.html', texts: 1 },
	{ id: 'logo_truth', name: 'Truth Social Logo', url: '/truth-social-logo-maker-online-1067.html', texts: 1 },
	{ id: 'logo_mastodon', name: 'Mastodon Logo', url: '/mastodon-logo-maker-online-1068.html', texts: 1 },
	{ id: 'logo_bluesky', name: 'Bluesky Logo', url: '/bluesky-logo-maker-online-1069.html', texts: 1 },
	{ id: 'logo_signal', name: 'Signal Logo', url: '/signal-logo-maker-online-1070.html', texts: 1 },
	{ id: 'logo_element', name: 'Element Logo', url: '/element-logo-maker-online-1071.html', texts: 1 },
	{ id: 'logo_matrix', name: 'Matrix Logo', url: '/matrix-logo-maker-online-1072.html', texts: 1 },
	{ id: 'logo_wechat', name: 'WeChat Logo', url: '/wechat-logo-maker-online-1073.html', texts: 1 },
	{ id: 'logo_line', name: 'LINE Logo', url: '/line-logo-maker-online-1074.html', texts: 1 },
	{ id: 'logo_kakao', name: 'Kakao Logo', url: '/kakao-logo-maker-online-1075.html', texts: 1 },
	{ id: 'logo_viber', name: 'Viber Logo', url: '/viber-logo-maker-online-1076.html', texts: 1 },
	{ id: 'logo_vkontakte', name: 'VK Logo', url: '/vk-logo-maker-online-1077.html', texts: 1 },
	{ id: 'logo_ok', name: 'Odnoklassniki Logo', url: '/ok-logo-maker-online-1078.html', texts: 1 },
	{ id: 'logo_weibo', name: 'Weibo Logo', url: '/weibo-logo-maker-online-1079.html', texts: 1 },
	{ id: 'logo_douyin', name: 'Douyin Logo', url: '/douyin-logo-maker-online-1080.html', texts: 1 },
	{ id: 'logo_xiaohongshu', name: 'Xiaohongshu Logo', url: '/xiaohongshu-logo-maker-online-1081.html', texts: 1 },
	{ id: 'logo_zalo', name: 'Zalo Logo', url: '/zalo-logo-maker-online-1082.html', texts: 1 },
	{ id: 'logo_telegram2', name: 'Telegram Sticker', url: '/telegram-sticker-maker-online-1083.html', texts: 1 },
	{ id: 'logo_whatsapp2', name: 'WhatsApp Status', url: '/whatsapp-status-maker-online-1084.html', texts: 1 },

	// ── Sports & Activity Effects (25) ──
	{ id: 'sport_football', name: 'Football Text', url: '/football-text-effect-online-1085.html', texts: 1 },
	{ id: 'sport_basketball', name: 'Basketball Text', url: '/basketball-text-effect-online-1086.html', texts: 1 },
	{ id: 'sport_soccer', name: 'Soccer Text', url: '/soccer-text-effect-online-1087.html', texts: 1 },
	{ id: 'sport_tennis', name: 'Tennis Text', url: '/tennis-text-effect-online-1088.html', texts: 1 },
	{ id: 'sport_swimming', name: 'Swimming Text', url: '/swimming-text-effect-online-1089.html', texts: 1 },
	{ id: 'sport_running', name: 'Running Text', url: '/running-text-effect-online-1090.html', texts: 1 },
	{ id: 'sport_cycling', name: 'Cycling Text', url: '/cycling-text-effect-online-1091.html', texts: 1 },
	{ id: 'sport_gym', name: 'Gym Text', url: '/gym-text-effect-online-1092.html', texts: 1 },
	{ id: 'sport_yoga', name: 'Yoga Text', url: '/yoga-text-effect-online-1093.html', texts: 1 },
	{ id: 'sport_boxing', name: 'Boxing Text', url: '/boxing-text-effect-online-1094.html', texts: 1 },
	{ id: 'sport_mma', name: 'MMA Text', url: '/mma-text-effect-online-1095.html', texts: 1 },
	{ id: 'sport_f1', name: 'F1 Racing Text', url: '/f1-racing-text-effect-online-1096.html', texts: 1 },
	{ id: 'sport_chess', name: 'Chess Text', url: '/chess-text-effect-online-1097.html', texts: 1 },
	{ id: 'sport_gaming', name: 'Gaming Text', url: '/gaming-text-effect-online-1098.html', texts: 1 },
	{ id: 'sport_esports', name: 'Esports Text', url: '/esports-text-effect-online-1099.html', texts: 1 },
	{ id: 'sport_surfing', name: 'Surfing Text', url: '/surfing-text-effect-online-1100.html', texts: 1 },
	{ id: 'sport_skateboard', name: 'Skateboard Text', url: '/skateboard-text-effect-online-1101.html', texts: 1 },
	{ id: 'sport_skiing', name: 'Skiing Text', url: '/skiing-text-effect-online-1102.html', texts: 1 },
	{ id: 'sport_hiking', name: 'Hiking Text', url: '/hiking-text-effect-online-1103.html', texts: 1 },
	{ id: 'sport_climbing', name: 'Climbing Text', url: '/climbing-text-effect-online-1104.html', texts: 1 },
	{ id: 'sport_fishing', name: 'Fishing Text', url: '/fishing-text-effect-online-1105.html', texts: 1 },
	{ id: 'sport_diving', name: 'Diving Text', url: '/diving-text-effect-online-1106.html', texts: 1 },
	{ id: 'sport_archery', name: 'Archery Text', url: '/archery-text-effect-online-1107.html', texts: 1 },
	{ id: 'sport_golf', name: 'Golf Text', url: '/golf-text-effect-online-1108.html', texts: 1 },
	{ id: 'sport_badminton', name: 'Badminton Text', url: '/badminton-text-effect-online-1109.html', texts: 1 },

	// ── Music & Entertainment Effects (25) ──
	{ id: 'music_dj', name: 'DJ Text', url: '/dj-text-effect-online-1110.html', texts: 1 },
	{ id: 'music_guitar', name: 'Guitar Text', url: '/guitar-text-effect-online-1111.html', texts: 1 },
	{ id: 'music_piano', name: 'Piano Text', url: '/piano-text-effect-online-1112.html', texts: 1 },
	{ id: 'music_drum', name: 'Drum Text', url: '/drum-text-effect-online-1113.html', texts: 1 },
	{ id: 'music_vinyl', name: 'Vinyl Record', url: '/vinyl-record-text-effect-online-1114.html', texts: 1 },
	{ id: 'music_headphone', name: 'Headphone Text', url: '/headphone-text-effect-online-1115.html', texts: 1 },
	{ id: 'music_microphone', name: 'Microphone Text', url: '/microphone-text-effect-online-1116.html', texts: 1 },
	{ id: 'music_speaker', name: 'Speaker Text', url: '/speaker-text-effect-online-1117.html', texts: 1 },
	{ id: 'music_radio', name: 'Radio Text', url: '/radio-text-effect-online-1118.html', texts: 1 },
	{ id: 'music_concert', name: 'Concert Text', url: '/concert-text-effect-online-1119.html', texts: 1 },
	{ id: 'music_festival', name: 'Festival Text', url: '/festival-text-effect-online-1120.html', texts: 1 },
	{ id: 'music_rave', name: 'Rave Text', url: '/rave-text-effect-online-1121.html', texts: 1 },
	{ id: 'music_jazz', name: 'Jazz Text', url: '/jazz-text-effect-online-1122.html', texts: 1 },
	{ id: 'music_rock', name: 'Rock Text', url: '/rock-text-effect-online-1123.html', texts: 1 },
	{ id: 'music_pop', name: 'Pop Text', url: '/pop-text-effect-online-1124.html', texts: 1 },
	{ id: 'music_hiphop', name: 'Hip Hop Text', url: '/hip-hop-text-effect-online-1125.html', texts: 1 },
	{ id: 'music_edm', name: 'EDM Text', url: '/edm-text-effect-online-1126.html', texts: 1 },
	{ id: 'music_kpop', name: 'K-Pop Text', url: '/k-pop-text-effect-online-1127.html', texts: 1 },
	{ id: 'music_reggae', name: 'Reggae Text', url: '/reggae-text-effect-online-1128.html', texts: 1 },
	{ id: 'music_country', name: 'Country Text', url: '/country-music-text-effect-online-1129.html', texts: 1 },
	{ id: 'music_blues', name: 'Blues Text', url: '/blues-text-effect-online-1130.html', texts: 1 },
	{ id: 'music_classical', name: 'Classical Text', url: '/classical-text-effect-online-1131.html', texts: 1 },
	{ id: 'music_opera', name: 'Opera Text', url: '/opera-text-effect-online-1132.html', texts: 1 },
	{ id: 'music_choir', name: 'Choir Text', url: '/choir-text-effect-online-1133.html', texts: 1 },
	{ id: 'music_orchestra', name: 'Orchestra Text', url: '/orchestra-text-effect-online-1134.html', texts: 1 },
]

export const getEphotoEffects = () => ephotoEffects
export const getEphotoById = id => ephotoEffects.find(e => e.id === id)

export const ephotoListText = () => ephotoEffects.map(e => {
	const input = e.texts === 2 ? '<text1> <text2>' : '<text>'
	return `• ${e.id} ${input} — ${e.name}`
}).join('\n')

export const ephotoGenerate = async (effectId, texts) => {
	const effect = getEphotoById(effectId)
	if (!effect) return { ok: false, text: `Efek "${effectId}" tidak ditemukan.\n\n${ephotoListText()}` }

	const textArr = Array.isArray(texts) ? texts : [texts]
	if (textArr.length < effect.texts) {
		return { ok: false, text: `Efek "${effect.name}" butuh ${effect.texts} teks.\nContoh: .ephoto ${effectId} ${effect.texts === 2 ? 'Hello World' : 'Hello'}` }
	}

	try {
		const url = `${EPHOTO_BASE}${effect.url}`
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

		const fullUrl = imageUrl.startsWith('http') ? imageUrl : `${EPHOTO_BASE}${imageUrl}`
		return { ok: true, imageUrl: fullUrl, effect: effect.name }
	} catch (error) {
		return { ok: false, text: `ePhoto360 gagal: ${error.message || error}` }
	}
}
