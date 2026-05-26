import { callButton, copyButton, quickReplyButton, singleSelectButton, urlButton } from 'shileys'
import { withContextInfo } from './reply-style.js'

export const reply = async (sock, jid, text, quoted) =>
	sock.sendMessage(
		jid,
		{
			text,
			title: sock.dianaConfig?.customReply?.title || sock.dianaConfig?.name || 'Diana Bot',
			footer: sock.dianaConfig?.customReply?.body || 'Powered by shileys',
			interactiveButtons: [
				urlButton('🌐 ɢɪᴛʜᴜʙ', sock.dianaConfig?.customReply?.sourceUrl || 'https://github.com/Shikytemo/diana-bot')
			]
		},
		{ quoted }
	)

const menuImageUrl = 'https://files.catbox.moe/qmspao.jpg'
const githubUrl = 'https://github.com/Shikytemo/diana-bot'

const jakartaDate = () =>
	new Intl.DateTimeFormat('id-ID', {
		timeZone: 'Asia/Jakarta',
		weekday: 'long',
		day: '2-digit',
		month: 'long',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		hour12: false
	}).format(new Date())

const mainRole = roles => {
	if (roles?.isOwner) return 'owner'
	if (roles?.isAdmin) return 'admin'
	if (roles?.isPremium) return 'premium'
	if (roles?.isMember) return 'member'
	if (roles?.isUnregister) return 'unregister'
	return 'user'
}

const userName = roles => roles?.user?.name || roles?.number || '-'
const userLevel = roles => roles?.user?.level || 1

const menuCaption = (config, roles) =>
	[
		`*ʜɪ, ᴡᴇʟᴄᴏᴍᴇ ᴛᴏ ${config.name}*`,
		'',
		`👤 ɴᴀᴍᴀ  : ${userName(roles)}`,
		`👤 ʀᴏʟᴇ  : ${mainRole(roles)}`,
		`🏆 ʟᴇᴠᴇʟ : ${userLevel(roles)}`,
		`📦 ᴠᴇʀsɪ : v${config.version || '1.0.0'}`,
		`📅 ʜᴀʀɪ  : ${jakartaDate()} WIB`,
		`⚙️ ᴘʀᴇғɪx: ${config.prefixes.join(' ')}`,
		'',
		'📋 ᴘɪʟɪʜ ᴍᴇɴᴜ ᴅɪ ʙᴀᴡᴀʜ.'
	].join('\n')

export const sendMenu = async (sock, jid, config, quoted, roles) =>
	sock.sendMessage(
		jid,
		{
			image: { url: menuImageUrl },
			text: menuCaption(config, roles),
			title: config.name,
			footer: 'Powered by shileys',
			interactiveButtons: [
				singleSelectButton('📋 ᴅᴀғᴛᴀʀ ᴍᴇɴᴜ', [
					{
						title: '👑 ᴄᴏᴍᴍᴀɴᴅ ᴜᴛᴀᴍᴀ',
						rows: [
							{
								header: '⚡ sᴛᴀᴛᴜs',
								title: 'ᴘɪɴɢ',
								description: 'Cek status bot dan device',
								id: `${config.prefixes[0]}ping`
							},
							{
								header: '📖 ᴍᴇɴᴜ',
								title: 'ᴛᴇxᴛ ᴍᴇɴᴜ',
								description: 'Tampilkan semua command dalam bentuk text',
								id: `${config.prefixes[0]}menutext`
							},
							{
								header: '👤 ᴘʀᴏғɪʟᴇ',
								title: 'ʀᴏʟᴇ',
								description: 'Cek role akun kamu',
								id: `${config.prefixes[0]}role`
							},
							{
								header: '✏️ ᴘʀᴏғɪʟᴇ',
								title: 'sᴇᴛɴᴀᴍᴀ',
								description: 'Ubah nama profile bot',
								id: `${config.prefixes[0]}setnama Diana User`
							},
						]
					},
					{
						title: '🧰 ᴛᴏᴏʟs',
						rows: [
							{
								header: '📌 ᴅᴏᴡɴʟᴏᴀᴅᴇʀ',
								title: 'ᴘɪɴᴛᴇʀᴇsᴛ',
								description: 'Cari atau scrape media Pinterest',
								id: `${config.prefixes[0]}pin anime`
							},
							{
								header: '🎬 ᴀɴɪᴍᴇ',
								title: 'ᴀɴɪᴍᴇ',
								description: 'Cari anime lengkap dengan poster',
								id: `${config.prefixes[0]}anime one piece`
							},
							{
								header: '▶️ sᴛʀᴇᴀᴍ',
								title: 'sᴀᴍᴇʜᴀᴅᴀᴋᴜ',
								description: 'Ambil link stream episode',
								id: `${config.prefixes[0]}stream gnosia episode 20`
							},
							{
								header: '🏆 ᴀɴɪᴍᴇ',
								title: 'ᴛᴏᴘ ᴀɴɪᴍᴇ',
								description: 'Top anime MAL',
								id: `${config.prefixes[0]}topanime`
							},
							{
								header: '☁️ ᴜᴘʟᴏᴀᴅᴇʀ',
								title: 'ᴛᴏ ᴜʀʟ',
								description: 'Reply media untuk upload ke Catbox',
								id: `${config.prefixes[0]}tourl`
							},
							{
								header: '🔎 ᴄʜᴇᴄᴋᴇʀ',
								title: 'ɪᴅ ᴄʜᴀɴɴᴇʟ',
								description: 'Cek ID channel WhatsApp',
								id: `${config.prefixes[0]}idch`
							}
						]
					},
						{
						title: '🌍 ɪɴғᴏ & sᴄʀᴀᴘᴇʀ',
						rows: [
							{
								header: '📚 ᴡɪᴋɪ',
								title: 'ᴡɪᴋɪᴘᴇᴅɪᴀ',
								description: 'Cari artikel Wikipedia',
								id: `${config.prefixes[0]}wiki Sukarno`
							},
							{
								header: '🕌 ɪsʟᴀᴍ',
								title: 'sʜᴏʟᴀᴛ',
								description: 'Jadwal sholat hari ini',
								id: `${config.prefixes[0]}sholat Jakarta`
							},
							{
								header: '📖 ɪsʟᴀᴍ',
								title: 'sᴜʀᴀʜ',
								description: 'Tampilkan surah Al-Quran',
								id: `${config.prefixes[0]}surah 36`
							},
							{
								header: '🇮🇩 ᴄᴜᴀᴄᴀ',
								title: 'ʙᴍᴋɢ',
								description: 'Prakiraan resmi BMKG',
								id: `${config.prefixes[0]}bmkg Sleman`
							},
							{
								header: '🌤️ ɢʟᴏʙᴀʟ',
								title: 'ᴄᴜᴀᴄᴀ',
								description: 'Cuaca global wttr.in',
								id: `${config.prefixes[0]}cuaca Jakarta`
							},
							{
								header: '📰 ɴᴇᴡs',
								title: 'ʙᴇʀɪᴛᴀ',
								description: 'Headline berita Indonesia',
								id: `${config.prefixes[0]}berita cnn`
							},
							{
								header: '💱 ғɪɴᴀɴᴄᴇ',
								title: 'ᴋᴜʀs',
								description: 'Konversi mata uang',
								id: `${config.prefixes[0]}kurs USD IDR 50`
							},
							{
								header: '🌐 ɴᴇᴛᴡᴏʀᴋ',
								title: 'ɪᴘ ʟᴏᴏᴋᴜᴘ',
								description: 'Cek lokasi IP',
								id: `${config.prefixes[0]}ip 8.8.8.8`
							}
						]
					},
					{
						title: '🎉 ғᴜɴ',
						rows: [
							{
								header: '💭 ᴋᴀᴛᴀ',
								title: 'ǫᴜᴏᴛᴇ',
								description: 'Quote random',
								id: `${config.prefixes[0]}quote`
							},
							{
								header: '🎌 ᴀɴɪᴍᴇ',
								title: 'ᴀɴɪᴍᴇǫᴜᴏᴛᴇ',
								description: 'Quote anime random',
								id: `${config.prefixes[0]}animequote`
							},
							{
								header: '😂 ʜᴜᴍᴏʀ',
								title: 'ᴊᴏᴋᴇ',
								description: 'Joke random',
								id: `${config.prefixes[0]}joke`
							},
							{
								header: '😂 ʀᴇᴅᴅɪᴛ',
								title: 'ᴍᴇᴍᴇ',
								description: 'Meme random dari Reddit',
								id: `${config.prefixes[0]}meme`
							},
							{
								header: '💡 ғᴀᴋᴛᴀ',
								title: 'ғᴀᴄᴛ',
								description: 'Useless fact random',
								id: `${config.prefixes[0]}fact`
							},
							{
								header: '🔴 ʀᴇᴅᴅɪᴛ',
								title: 'ʀᴇᴅᴅɪᴛ',
								description: 'Post subreddit',
								id: `${config.prefixes[0]}reddit ProgrammerHumor top`
							},
							{
								header: '🖼️ ᴛᴇʙᴀᴋ',
								title: 'ᴛᴇʙᴀᴋ ɢᴀᴍʙᴀʀ',
								description: 'Tebak jawaban dari emoji',
								id: `${config.prefixes[0]}tebakgambar`
							},
							{
								header: '📝 ᴛᴇʙᴀᴋ',
								title: 'ᴛᴇʙᴀᴋ ᴋᴀᴛᴀ',
								description: 'Tebak kata dari clue',
								id: `${config.prefixes[0]}tebakkata`
							},
							{
								header: '🎌 ᴛᴇʙᴀᴋ',
								title: 'ᴛᴇʙᴀᴋ ᴀɴɪᴍᴇ',
								description: 'Tebak judul anime',
								id: `${config.prefixes[0]}tebakanime action`
							},
							{
								header: '🎰 ᴄᴀsɪɴᴏ',
								title: 'sʟᴏᴛ',
								description: 'Slot machine — dapat XP',
								id: `${config.prefixes[0]}slot`
							},
							{
								header: '🪙 ᴄᴏɪɴ',
								title: 'ᴄᴏɪɴ ғʟɪᴘ',
								description: 'Lempar koin heads/tails',
								id: `${config.prefixes[0]}coinflip heads`
							},
							{
								header: '🎲 ᴅɪᴄᴇ',
								title: 'ᴅᴀᴅᴜ',
								description: 'Lempar dadu',
								id: `${config.prefixes[0]}dice`
							},
							{
								header: '✊ ɢᴀᴍᴇ',
								title: 'sᴜɪᴛ',
								description: 'Batu gunting kertas vs bot',
								id: `${config.prefixes[0]}suit batu`
							},
							{
								header: '🤔 ᴛʀᴜᴛʜ',
								title: 'ᴛʀᴜᴛʜ',
								description: 'Random truth question',
								id: `${config.prefixes[0]}truth`
							},
							{
								header: '😈 ᴅᴀʀᴇ',
								title: 'ᴅᴀʀᴇ',
								description: 'Random dare challenge',
								id: `${config.prefixes[0]}dare`
							}
						]
					},
					{
						title: '🛠️ ᴅᴇᴠ & sᴇᴀʀᴄʜ',
						rows: [
							{
								header: '🐍 ᴘᴀᴄᴋᴀɢᴇ',
								title: 'ᴘʏᴘɪ',
								description: 'Info package PyPI',
								id: `${config.prefixes[0]}pypi requests`
							},
							{
								header: '🔥 ɢɪᴛʜᴜʙ',
								title: 'ɢʜᴛʀᴇɴᴅ',
								description: 'GitHub trending repos',
								id: `${config.prefixes[0]}ghtrend`
							},
							{
								header: '📺 ᴠɪᴅᴇᴏ',
								title: 'ʏᴛsᴇᴀʀᴄʜ',
								description: 'Cari video YouTube',
								id: `${config.prefixes[0]}ytsearch lo-fi beats`
							},
							{
								header: '🖼️ ᴀʀᴛ',
								title: 'ᴡᴀʟʟᴘᴀᴘᴇʀ',
								description: 'Cari wallpaper Wallhaven',
								id: `${config.prefixes[0]}wp cyberpunk`
							},
							{
								header: '📕 ᴋʙʙɪ',
								title: 'ᴋᴀᴛᴇɢʟᴏ',
								description: 'Kamus Bahasa Indonesia',
								id: `${config.prefixes[0]}kateglo komputer`
							},
							{
								header: '📸 ᴡᴇʙ',
								title: 'sᴄʀᴇᴇɴsʜᴏᴛ',
								description: 'Screenshot halaman web',
								id: `${config.prefixes[0]}ss https://github.com`
							},
							{
								header: '🗂️ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ',
								title: 'ᴍᴇᴅɪᴀғɪʀᴇ',
								description: 'Direct link Mediafire',
								id: `${config.prefixes[0]}mediafire url`
							},
							{
								header: '🔍 sᴇᴀʀᴄʜ',
								title: 'ɢᴏᴏɢʟᴇ',
								description: 'Cari di Google',
								id: `${config.prefixes[0]}g WhatsApp bot`
							},
							{
								header: '🎬 ᴍᴏᴠɪᴇ',
								title: 'ғɪʟᴍ',
								description: 'Info film dari OMDb',
								id: `${config.prefixes[0]}movie Spiderman`
							},
							{
								header: '🧮 ᴍᴀᴛʜ',
								title: 'ᴄᴀʟᴄ',
								description: 'Kalkulator expression',
								id: `${config.prefixes[0]}calc 2+3*4`
							},
							{
								header: '✨ ғᴏɴᴛ',
								title: 'ғᴏɴᴛ sᴛʏʟɪsʜ',
								description: 'Ubah teks jadi font stylish',
								id: `${config.prefixes[0]}font bold Hello`
							}
						]
					},
					{
						title: '🤖 ᴀɪ & ᴇxᴛʀᴀ',
						rows: [
							{
								header: '🤖 ᴀɪ',
								title: 'ᴀɪ ᴄʜᴀᴛ',
								description: 'Chat AI gratis',
								id: `${config.prefixes[0]}ai Siapa presiden Indonesia?`
							},
							{
								header: '🔮 ᴢᴏᴅɪᴀᴋ',
								title: 'ʜᴏʀᴏsᴄᴏᴘᴇ',
								description: 'Ramalan zodiak harian',
								id: `${config.prefixes[0]}zodiak aries`
							},
							{
								header: '🎨 ᴛᴇxᴛ',
								title: 'ᴛᴇxᴛᴘʀᴏ',
								description: '150+ text effect maker',
								id: `${config.prefixes[0]}tp neon Hello`
							},
							{
								header: '🎨 ᴇᴘʜᴏᴛᴏ',
								title: 'ᴇᴘʜᴏᴛᴏ360',
								description: '320+ ePhoto360 effects',
								id: `${config.prefixes[0]}ep neon_light Hello`
							},
							{
								header: '🖼️ ᴘʜᴏᴛᴏ',
								title: 'ᴘʜᴏᴛᴏᴏxʏ',
								description: '165+ Photooxy effects',
								id: `${config.prefixes[0]}poxy flaming Hello`
							},
							{
								header: '📡 ᴀᴘɪ',
								title: 'ᴀᴘɪ ᴄᴏᴍᴍᴀɴᴅ',
								description: '647+ API endpoints',
								id: `${config.prefixes[0]}api list`
							},
							{
								header: '🔐 ᴇɴᴄᴏᴅᴇ',
								title: 'ᴇɴᴄᴏᴅᴇ/ᴅᴇᴄᴏᴅᴇ',
								description: '50+ encode methods',
								id: `${config.prefixes[0]}encode base64 Hello`
							},
							{
								header: '🔊 ᴛᴛs',
								title: 'ᴛᴇxᴛ ᴛᴏ sᴘᴇᴇᴄʜ',
								description: 'TTS 20+ bahasa',
								id: `${config.prefixes[0]}tts id Halo`
							},
							{
								header: '📐 ᴄᴏɴᴠᴇʀᴛ',
								title: 'ᴜɴɪᴛ ᴄᴏɴᴠᴇʀᴛᴇʀ',
								description: '50+ konversi unit',
								id: `${config.prefixes[0]}convert 100 km_mi`
							},
							{
								header: '🎨 ᴄᴏʟᴏʀ',
								title: 'ᴄᴏʟᴏʀ ᴄᴏɴᴠᴇʀᴛ',
								description: 'Hex/RGB/HSL converter',
								id: `${config.prefixes[0]}color #ff6600`
							},
							{
								header: '🕐 ᴛɪᴍᴇ',
								title: 'ᴛɪᴍᴇᴢᴏɴᴇ',
								description: 'Info timezone dunia',
								id: `${config.prefixes[0]}tz WIB`
							},
							{
								header: '🔑 ᴘᴡ',
								title: 'ᴘᴀssᴡᴏʀᴅ ɢᴇɴ',
								description: 'Generate password random',
								id: `${config.prefixes[0]}pw 20`
							},
							{
								header: '🕌 ɪsʟᴀᴍ',
								title: 'ǫᴜʀᴀɴ',
								description: 'Ayat Al-Quran',
								id: `${config.prefixes[0]}quran random`
							},
							{
								header: '🕌 ᴀsᴍᴀ',
								title: 'ᴀsᴍᴀᴜʟ ʜᴜsɴᴀ',
								description: '99 Nama Allah',
								id: `${config.prefixes[0]}asmaulhusna`
							},
							{
								header: '📿 ᴅʜɪᴋʀ',
								title: 'ᴅʜɪᴋʀ',
								description: 'Dhikr + keutamaan',
								id: `${config.prefixes[0]}dhikr`
							},
							{
								header: '🤲 ᴅᴏᴀ',
								title: 'ᴅᴏᴀ ʜᴀʀɪᴀɴ',
								description: 'Doa harian',
								id: `${config.prefixes[0]}doa`
							},
							{
								header: '🕌 sʜᴀʟᴀᴛ',
								title: 'ᴊᴀᴅᴡᴀʟ sʜᴀʟᴀᴛ',
								description: 'Jadwal shalat per kota',
								id: `${config.prefixes[0]}jadwalshalat Jakarta`
							},
							{
								header: '💰 ᴢᴀᴋᴀᴛ',
								title: 'ᴋᴀʟᴋᴜʟᴀᴛᴏʀ ᴢᴀᴋᴀᴛ',
								description: 'Hitung zakat',
								id: `${config.prefixes[0]}zakat mal`
							},
							{
								header: '🎨 ɪᴍɢ',
								title: 'ɪᴍᴀɢᴇ ᴇғғᴇᴄᴛs',
								description: '30+ image filters',
								id: `${config.prefixes[0]}imgfx list`
							},
							{
								header: '🎭 ᴏᴠᴇʀ',
								title: 'ɪᴍᴀɢᴇ ᴏᴠᴇʀʟᴀʏs',
								description: '12+ overlay effects',
								id: `${config.prefixes[0]}overlay`
							},
							{
								header: '😂 ᴍᴇᴍᴇ',
								title: 'ᴍᴇᴍᴇ ɢᴇɴᴇʀᴀᴛᴏʀ',
								description: '40+ meme templates',
								id: `${config.prefixes[0]}meme list`
							},
							{
								header: '✏️ ғᴏɴᴛ',
								title: 'ғᴏɴᴛ sᴛʏʟᴇs',
								description: '30+ text styles',
								id: `${config.prefixes[0]}bold Hello`
							},
							{
								header: '🎭 ғᴜɴ',
								title: 'ᴘɪᴄᴋᴜᴘ ʟɪɴᴇ',
								description: 'Random pickup line',
								id: `${config.prefixes[0]}pickup`
							},
							{
								header: '🔮 ғᴏʀᴛᴜɴᴇ',
								title: 'ғᴏʀᴛᴜɴᴇ ᴄᴏᴏᴋɪᴇ',
								description: 'Fortune cookie message',
								id: `${config.prefixes[0]}fortune`
							},
							{
								header: '🎲 ɢᴀᴍᴇ',
								title: 'ᴀɴᴀɢʀᴀᴍ',
								description: 'Anagram unscramble',
								id: `${config.prefixes[0]}anagram`
							},
							{
								header: '🎬 ǫᴜɪᴢ',
								title: 'ɢᴜᴇss ᴍᴏᴠɪᴇ',
								description: 'Tebak film dari quote',
								id: `${config.prefixes[0]}guessmovie`
							},
							{
								header: '🎵 ǫᴜɪᴢ',
								title: 'ɢᴜᴇss sᴏɴɢ',
								description: 'Tebak lagu dari lirik',
								id: `${config.prefixes[0]}guesssong`
							},
							{
								header: '🍳 ʀᴇᴄɪᴘᴇ',
								title: 'ʀᴀɴᴅᴏᴍ ʀᴇᴄɪᴘᴇ',
								description: 'Resep makanan random',
								id: `${config.prefixes[0]}randomrecipe`
							},
							{
								header: '🧪 sᴄɪ',
								title: 'ᴘᴇʀɪᴏᴅɪᴄ ᴛᴀʙʟᴇ',
								description: 'Info elemen kimia',
								id: `${config.prefixes[0]}periodic hydrogen`
							},
							{
								header: '🪐 sᴘᴀᴄᴇ',
								title: 'ᴘʟᴀɴᴇᴛ ɪɴғᴏ',
								description: 'Info planet tata surya',
								id: `${config.prefixes[0]}planet earth`
							},
							{
								header: '🎮 ᴅᴇᴀʟ',
								title: 'ɢᴀᴍᴇ ᴅᴇᴀʟs',
								description: 'Game deals CheapShark',
								id: `${config.prefixes[0]}gamedeal`
							}
						]
					},
					{
						title: '👥 ɢʀᴏᴜᴘ ᴛᴏᴏʟs',
						rows: [
							{
								header: '📢 ᴛᴀɢ',
								title: 'ᴛᴀɢ ᴀʟʟ',
								description: 'Tag semua member grup',
								id: `${config.prefixes[0]}tagall`
							},
							{
								header: '👻 ʜɪᴅᴇ',
								title: 'ʜɪᴅᴇᴛᴀɢ',
								description: 'Tag tersembunyi',
								id: `${config.prefixes[0]}hidetag`
							},
							{
								header: '📊 ᴘᴏʟʟ',
								title: 'ᴘᴏʟʟ',
								description: 'Buat polling di grup',
								id: `${config.prefixes[0]}poll Pertanyaan|Ya|Tidak`
							},
							{
								header: '👋 ᴀғᴋ',
								title: 'ᴀғᴋ ᴍᴏᴅᴇ',
								description: 'Set AFK mode',
								id: `${config.prefixes[0]}afk makan`
							},
							{
								header: '🃏 ᴀᴜᴛᴏ',
								title: 'ᴀᴜᴛᴏ-sᴛɪᴄᴋᴇʀ',
								description: 'Auto convert gambar jadi sticker',
								id: `${config.prefixes[0]}autosticker`
							},
							{
								header: '👁️ ᴀɴᴛɪ',
								title: 'ᴀɴᴛɪ ᴠɪᴇᴡ-ᴏɴᴄᴇ',
								description: 'Capture view-once message',
								id: `${config.prefixes[0]}antiviewonce`
							}
						]
					},
					{
						title: '🎮 ᴀᴅᴠᴀɴᴄᴇᴅ ɢᴀᴍᴇs',
						rows: [
							{
								header: '🟩 ᴡᴏʀᴅ',
								title: 'ᴡᴏʀᴅʟᴇ',
								description: 'Tebak kata 5 huruf',
								id: `${config.prefixes[0]}wordle`
							},
							{
								header: '🔢 ᴘᴜᴢᴢʟᴇ',
								title: 'sᴜᴅᴏᴋᴜ',
								description: 'Sudoku puzzle',
								id: `${config.prefixes[0]}sudoku`
							},
							{
								header: '⌨️ ᴛʏᴘᴇ',
								title: 'ᴛʏᴘɪɴɢ ᴛᴇsᴛ',
								description: 'Typing speed test',
								id: `${config.prefixes[0]}typing`
							},
							{
								header: '💣 ᴍɪɴᴇ',
								title: 'ᴍɪɴᴇsᴡᴇᴇᴘᴇʀ',
								description: 'Minesweeper game',
								id: `${config.prefixes[0]}mine`
							},
							{
								header: '🧮 ᴍᴀᴛʜ',
								title: 'ᴍᴀᴛʜ ᴄʜᴀʟʟᴇɴɢᴇ',
								description: 'Math challenge streak XP',
								id: `${config.prefixes[0]}math 1`
							},
							{
								header: '🔢 ɢᴜᴇss',
								title: 'ɢᴜᴇss ɴᴜᴍʙᴇʀ',
								description: 'Tebak angka 1-100',
								id: `${config.prefixes[0]}gn`
							},
							{
								header: '🔗 ᴄʜᴀɪɴ',
								title: 'ᴡᴏʀᴅ ᴄʜᴀɪɴ',
								description: 'Sambung kata game',
								id: `${config.prefixes[0]}chain`
							},
							{
								header: '🧠 ᴍᴇᴍ',
								title: 'ᴍᴇᴍᴏʀʏ',
								description: 'Memory card game',
								id: `${config.prefixes[0]}memory`
							},
							{
								header: '🏆 ᴛᴏᴜʀɴᴀᴍᴇɴᴛ',
								title: 'ʀᴘs ᴛᴏᴜʀɴᴀᴍᴇɴᴛ',
								description: 'RPS best of 5',
								id: `${config.prefixes[0]}rpst`
							},
							{
								header: '🏳️ ғʟᴀɢ',
								title: 'ғʟᴀɢ ϙᴜɪᴢ',
								description: 'Tebak bendera negara',
								id: `${config.prefixes[0]}flag`
							}
						]
					},
					{
						title: '🌐 sᴄʀᴀᴘᴇʀ & ᴀᴘɪ',
						rows: [
							{
								header: '🐦 ᴛᴡɪᴛᴛᴇʀ',
								title: 'ᴛᴡɪᴛᴛᴇʀ/𝚇',
								description: 'Download video Twitter/X',
								id: `${config.prefixes[0]}x url`
							},
							{
								header: '📘 ғʙ',
								title: 'ғᴀᴄᴇʙᴏᴏᴋ',
								description: 'Download video Facebook',
								id: `${config.prefixes[0]}fb url`
							},
							{
								header: '🎵 sᴄ',
								title: 'sᴏᴜɴᴅᴄʟᴏᴜᴅ',
								description: 'Download SoundCloud',
								id: `${config.prefixes[0]}sc url`
							},
							{
								header: '⚡ ᴘᴏᴋᴇ',
								title: 'ᴘᴏᴋᴇᴍᴏɴ',
								description: 'Info Pokemon',
								id: `${config.prefixes[0]}poke pikachu`
							},
							{
								header: '🎌 ᴀɴɪᴍᴇ',
								title: 'ᴀɴɪᴍᴇ sᴇᴀʀᴄʜ',
								description: 'Cari anime MAL',
								id: `${config.prefixes[0]}animesearch naruto`
							},
							{
								header: '🌍 ᴄᴏᴜɴᴛʀʏ',
								title: 'ᴄᴏᴜɴᴛʀʏ ɪɴғᴏ',
								description: 'Info negara',
								id: `${config.prefixes[0]}countryinfo Indonesia`
							},
							{
								header: '₿ ᴄʀʏᴘᴛᴏ',
								title: 'ᴄʀʏᴘᴛᴏ ɪɴғᴏ',
								description: 'Info crypto CoinGecko',
								id: `${config.prefixes[0]}cryptoinfo bitcoin`
							},
							{
								header: '🐱 ᴀɴɪᴍᴀʟ',
								title: 'ᴄᴀᴛ ɪᴍᴀɢᴇ',
								description: 'Random gambar kucing',
								id: `${config.prefixes[0]}catimg`
							},
							{
								header: '🐶 ᴀɴɪᴍᴀʟ',
								title: 'ᴅᴏɢ ɪᴍᴀɢᴇ',
								description: 'Random gambar anjing',
								id: `${config.prefixes[0]}dogimg`
							},
							{
								header: '🌸 ᴡᴀɪғᴜ',
								title: 'ᴡᴀɪғᴜ ɪᴍɢ',
								description: 'Waifu/neko anime image',
								id: `${config.prefixes[0]}waifu`
							},
							{
								header: '📰 ʜɴ',
								title: 'ʜᴀᴄᴋᴇʀ ɴᴇᴡs',
								description: 'Top stories HN',
								id: `${config.prefixes[0]}hn`
							},
							{
								header: '🦠 ᴄᴏᴠɪᴅ',
								title: 'ᴄᴏᴠɪᴅ sᴛᴀᴛs',
								description: 'Statistik COVID global',
								id: `${config.prefixes[0]}covid`
							}
						]
					},
					{
						title: '🔘 ᴅᴇᴍᴏ ʙᴜᴛᴛᴏɴ',
						rows: [
							{
								header: '✨ ɴᴀᴛɪᴠᴇ ғʟᴏᴡ',
								title: 'ǫᴜɪᴄᴋ ʀᴇᴘʟʏ',
								description: 'Demo tombol cepat',
								id: `${config.prefixes[0]}button`
							},
							{
								header: '✨ ɴᴀᴛɪᴠᴇ ғʟᴏᴡ',
								title: 'ʟɪsᴛ',
								description: 'Demo tombol list',
								id: `${config.prefixes[0]}list`
							},
							{
								header: '✨ ɴᴀᴛɪᴠᴇ ғʟᴏᴡ',
								title: 'ᴄᴏᴘʏ',
								description: 'Demo tombol copy text',
								id: `${config.prefixes[0]}copy`
							}
						]
					}
				]),
				urlButton('🌐 ɢɪᴛʜᴜʙ', githubUrl)
			]
		},
		{
			quoted
		}
	)

export const sendButtons = async (sock, jid, content, quoted) =>
	sock.sendMessage(
		jid,
		await withContextInfo(sock, {
			text: content.text,
			title: content.title,
			footer: content.footer,
			interactiveButtons: content.buttons.map(button => quickReplyButton(button.text, button.id))
		}),
		{ quoted }
	)

export const sendList = async (sock, jid, content, quoted) =>
	sock.sendMessage(
		jid,
		await withContextInfo(sock, {
			text: content.text,
			title: content.title,
			footer: content.footer,
			interactiveButtons: [
				singleSelectButton(
					content.buttonText || 'Pilih',
					content.sections.map(section => ({
						title: section.title,
						rows: section.rows.map(row => ({
							header: row.header,
							title: row.title,
							description: row.description,
							id: row.id
						}))
					}))
				)
			]
		}),
		{ quoted }
	)

export const sendUrlButton = async (sock, jid, content, quoted) =>
	sock.sendMessage(
		jid,
		await withContextInfo(sock, {
			text: content.text,
			title: content.title,
			footer: content.footer,
			interactiveButtons: [urlButton(content.buttonText || 'Buka Link', content.url)]
		}),
		{ quoted }
	)

export const sendCopyButton = async (sock, jid, content, quoted) =>
	sock.sendMessage(
		jid,
		await withContextInfo(sock, {
			text: content.text,
			title: content.title,
			footer: content.footer,
			interactiveButtons: [copyButton(content.buttonText || 'Copy', content.copyText)]
		}),
		{ quoted }
	)

export const sendCallButton = async (sock, jid, content, quoted) =>
	sock.sendMessage(
		jid,
		await withContextInfo(sock, {
			text: content.text,
			title: content.title,
			footer: content.footer,
			interactiveButtons: [callButton(content.buttonText || 'Telepon', content.phoneNumber)]
		}),
		{ quoted }
	)

export const sendChannelIdButtons = async (sock, jid, content, quoted) =>
	sock.sendMessage(
		jid,
		await withContextInfo(sock, {
			text: content.text,
			title: content.title,
			footer: content.footer,
			interactiveButtons: [
				copyButton('📋 Copy ID', content.channelId),
				urlButton('🔗 Buka Channel', content.url)
			]
		}),
		{ quoted }
	)

export const sendPinterestButtons = async (sock, jid, content, quoted) =>
	sock.sendMessage(
		jid,
		await withContextInfo(sock, {
			text: content.text,
			title: '📌 Pinterest Scraper',
			footer: 'Powered by shitools',
			interactiveButtons: [
				copyButton('📋 Copy Media', content.mediaUrl),
				urlButton('🔗 Buka Pin', content.sourceUrl)
			]
		}),
		{ quoted }
	)
