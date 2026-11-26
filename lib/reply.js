import { callButton, copyButton, quickReplyButton, singleSelectButton, urlButton, locationButton, catalogButton } from 'shileys'
import { withContextInfo } from './reply-style.js'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  𝗗𝗜𝗔𝗡𝗔 𝗕𝗢𝗧 — ʀᴇᴘʟʏ ᴇɴɢɪɴᴇ
//  Native Flow Buttons · HTML Rich · Carousel
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const BOT_FOOTER = '⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ sʜɪʟᴇʏs'
const GITHUB_URL = 'https://github.com/Shikytemo/diana-bot'

const menuImageUrl = 'https://files.catbox.moe/qmspao.jpg'

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
	if (roles?.isOwner) return '👑 ᴏᴡɴᴇʀ'
	if (roles?.isAdmin) return '🛡️ ᴀᴅᴍɪɴ'
	if (roles?.isPremium) return '💎 ᴘʀᴇᴍɪᴜᴍ'
	if (roles?.isMember) return '✅ ᴍᴇᴍʙᴇʀ'
	if (roles?.isUnregister) return '❌ ᴜɴʀᴇɢ'
	return '👤 ᴜsᴇʀ'
}

const userName = roles => roles?.user?.name || roles?.number || '-'
const userLevel = roles => roles?.user?.level || 1

// ─── Basic Reply (guaranteed delivery) ─────────
export const reply = async (sock, jid, text, quoted) =>
	sock.sendMessage(
		jid,
		await withContextInfo(sock, { text }),
		{ quoted }
	)

// ─── Reply with Quick Buttons ─────────
export const sendButtons = async (sock, jid, content, quoted) =>
	sock.sendMessage(
		jid,
		await withContextInfo(sock, {
			text: content.text,
			title: content.title,
			footer: content.footer || BOT_FOOTER,
			interactiveButtons: content.buttons.map(button => quickReplyButton(button.text, button.id))
		}),
		{ quoted }
	)

// ─── Reply with Sections List ─────────
export const sendList = async (sock, jid, content, quoted) =>
	sock.sendMessage(
		jid,
		await withContextInfo(sock, {
			text: content.text,
			title: content.title,
			footer: content.footer || BOT_FOOTER,
			interactiveButtons: [
				singleSelectButton(
					content.buttonText || '📋 ʙᴜᴋᴀ ᴘɪʟɪʜᴀɴ',
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

// ─── Reply with URL Button ─────────
export const sendUrlButton = async (sock, jid, content, quoted) =>
	sock.sendMessage(
		jid,
		await withContextInfo(sock, {
			text: content.text,
			title: content.title,
			footer: content.footer || BOT_FOOTER,
			interactiveButtons: [urlButton(content.buttonText || '🔗 ʙᴜᴋᴀ ʟɪɴᴋ', content.url)]
		}),
		{ quoted }
	)

// ─── Reply with Copy Button ─────────
export const sendCopyButton = async (sock, jid, content, quoted) =>
	sock.sendMessage(
		jid,
		await withContextInfo(sock, {
			text: content.text,
			title: content.title,
			footer: content.footer || BOT_FOOTER,
			interactiveButtons: [copyButton(content.buttonText || '📋 ᴄᴏᴘʏ', content.copyText)]
		}),
		{ quoted }
	)

// ─── Reply with Call Button ─────────
export const sendCallButton = async (sock, jid, content, quoted) =>
	sock.sendMessage(
		jid,
		await withContextInfo(sock, {
			text: content.text,
			title: content.title,
			footer: content.footer || BOT_FOOTER,
			interactiveButtons: [callButton(content.buttonText || '📞 ᴛᴇʟᴇᴘᴏɴ', content.phoneNumber)]
		}),
		{ quoted }
	)

// ─── Reply with Multiple Button Types (Combo) ─────────
export const sendComboButtons = async (sock, jid, content, quoted) =>
	sock.sendMessage(
		jid,
		await withContextInfo(sock, {
			text: content.text,
			title: content.title,
			footer: content.footer || BOT_FOOTER,
			...(content.image ? { image: content.image } : {}),
			interactiveButtons: content.buttons
		}),
		{ quoted }
	)

// ─── Reply with Quick Buttons + URL + Copy (Multi-Action) ─────────
export const sendRichButtons = async (sock, jid, content, quoted) => {
	const buttons = []
	if (content.quickReplies) {
		for (const qr of content.quickReplies) {
			buttons.push(quickReplyButton(qr.text, qr.id))
		}
	}
	if (content.urls) {
		for (const u of content.urls) {
			buttons.push(urlButton(u.text, u.url))
		}
	}
	if (content.copies) {
		for (const c of content.copies) {
			buttons.push(copyButton(c.text, c.copyText))
		}
	}
	if (content.calls) {
		for (const cl of content.calls) {
			buttons.push(callButton(cl.text, cl.phoneNumber))
		}
	}
	if (content.location) {
		buttons.push(locationButton(content.location.text || '📍 ʟᴏᴋᴀsɪ'))
	}

	return sock.sendMessage(
		jid,
		await withContextInfo(sock, {
			text: content.text,
			title: content.title,
			footer: content.footer || BOT_FOOTER,
			...(content.image ? { image: content.image } : {}),
			interactiveButtons: buttons
		}),
		{ quoted }
	)
}

// ─── Send HTML Rich (AI Rich) ─────────
export const sendHTML = async (sock, jid, html, options = {}, quoted) => {
	try {
		await sock.sendHTML(jid, html, {
			title: options.title || sock.dianaConfig?.name || 'Diana Bot',
			footer: options.footer || BOT_FOOTER,
			mode: options.mode || 'inline',
			...options
		})
	} catch {
		// Fallback to plain text
		const text = html.replace(/<[^>]*>/g, '').slice(0, 4000)
		await reply(sock, jid, text, quoted)
	}
}

// ─── Send Album (multiple media) ─────────
export const sendAlbum = async (sock, jid, medias, options = {}, quoted) => {
	try {
		await sock.sendAlbumMessage(jid, medias, { quoted, ...options })
	} catch {
		// Fallback: send one by one
		for (const media of medias.slice(0, 5)) {
			try {
				await sock.sendMessage(jid, media, { quoted })
			} catch { /* skip failed */ }
		}
	}
}

// ─── Send Carousel (scrollable cards with media + buttons) ─────────
export const sendCarousel = async (sock, jid, { text, title, subtitle, footer, cards }, quoted) => {
	try {
		return await sock.sendMessage(
			jid,
			await withContextInfo(sock, {
				text: text || '',
				title,
				subtitle,
				footer: footer || BOT_FOOTER,
				cards
			}),
			quoted ? { quoted } : {}
		)
	} catch {
		// Fallback to first card with rich buttons
		const first = cards?.[0]
		if (!first) return
		return sock.sendMessage(
			jid,
			await withContextInfo(sock, {
				...(first.image ? { image: first.image } : {}),
				text: [text, first.title, first.body].filter(Boolean).join('\n\n'),
				title: title || first.title,
				footer: footer || BOT_FOOTER,
				interactiveButtons: first.buttons || []
			}),
			quoted ? { quoted } : {}
		)
	}
}

// ─── Menu (Interactive) ─────────
const menuCaption = (config, roles) =>
	[
		`╭━━━━━━━━━━━━━━━━━━╮`,
		`┃  *${config.name}*`,
		`╰━━━━━━━━━━━━━━━━━━╯`,
		'',
		`┊ 👤 ɴᴀᴍᴀ  ⌁ ${userName(roles)}`,
		`┊ 🎭 ʀᴏʟᴇ  ⌁ ${mainRole(roles)}`,
		`┊ 🏆 ʟᴇᴠᴇʟ ⌁ ${userLevel(roles)}`,
		`┊ 📦 ᴠᴇʀsɪ ⌁ v${config.version || '1.0.0'}`,
		`┊ 📅 ᴡᴀᴋᴛᴜ ⌁ ${jakartaDate()} WIB`,
		`┊ ⚙️ ᴘʀᴇғɪx ⌁ ${config.prefixes.join(' ')}`,
		'',
		'╭━━━━━━━━━━━━━━━━━━╮',
		'┃  📋 ᴘɪʟɪʜ ᴍᴇɴᴜ ᴅɪ ʙᴀᴡᴀʜ',
		'╰━━━━━━━━━━━━━━━━━━╯'
	].join('\n')

export const sendMenu = async (sock, jid, config, quoted, roles) =>
	sock.sendMessage(
		jid,
		{
			image: { url: menuImageUrl },
			text: menuCaption(config, roles),
			title: config.name,
			footer: BOT_FOOTER,
			interactiveButtons: [
				singleSelectButton('📋 ᴅᴀғᴛᴀʀ ᴍᴇɴᴜ', [
					{
						title: '👑 ᴄᴏᴍᴍᴀɴᴅ ᴜᴛᴀᴍᴀ',
						rows: [
							{ header: '⚡', title: 'ᴘɪɴɢ', description: 'Cek status bot dan device', id: `${config.prefixes[0]}ping` },
							{ header: '📖', title: 'ᴛᴇxᴛ ᴍᴇɴᴜ', description: 'Tampilkan semua command', id: `${config.prefixes[0]}menutext` },
							{ header: '👤', title: 'ʀᴏʟᴇ', description: 'Cek role akun kamu', id: `${config.prefixes[0]}role` },
							{ header: '✏️', title: 'sᴇᴛɴᴀᴍᴀ', description: 'Ubah nama profile bot', id: `${config.prefixes[0]}setnama Diana User` },
						]
					},
					{
						title: '🧰 ᴛᴏᴏʟs & ᴜᴛɪʟɪᴛʏ',
						rows: [
							{ header: '📌', title: 'ᴘɪɴᴛᴇʀᴇsᴛ', description: 'Cari / scrape media Pinterest', id: `${config.prefixes[0]}pin anime` },
							{ header: '🎬', title: 'ᴀɴɪᴍᴇ', description: 'Cari anime lengkap + poster', id: `${config.prefixes[0]}anime one piece` },
							{ header: '▶️', title: 'sᴀᴍᴇʜᴀᴅᴀᴋᴜ', description: 'Ambil link stream episode', id: `${config.prefixes[0]}stream gnosia episode 20` },
							{ header: '🏆', title: 'ᴛᴏᴘ ᴀɴɪᴍᴇ', description: 'Top anime MAL', id: `${config.prefixes[0]}topanime` },
							{ header: '☁️', title: 'ᴛᴏ ᴜʀʟ', description: 'Reply media → upload Catbox', id: `${config.prefixes[0]}tourl` },
							{ header: '🔎', title: 'ɪᴅ ᴄʜᴀɴɴᴇʟ', description: 'Cek ID channel WhatsApp', id: `${config.prefixes[0]}idch` }
						]
					},
					{
						title: '🤖 ᴀɪ & sᴇᴀʀᴄʜ',
						rows: [
							{ header: '🤖', title: 'ᴀɪ ᴄʜᴀᴛ', description: 'Chat dengan AI (Gemini/GPT)', id: `${config.prefixes[0]}ai halo` },
							{ header: '🌐', title: 'ɢᴏᴏɢʟᴇ', description: 'Cari di Google', id: `${config.prefixes[0]}google Indonesia` },
							{ header: '📚', title: 'ᴡɪᴋɪᴘᴇᴅɪᴀ', description: 'Cari artikel Wikipedia', id: `${config.prefixes[0]}wiki Sukarno` },
							{ header: '🎵', title: 'sᴘᴏᴛɪғʏ', description: 'Cari lagu Spotify', id: `${config.prefixes[0]}spotify imagine dragons` },
							{ header: '🎼', title: 'ʟɪʀɪᴋ', description: 'Cari lirik lagu', id: `${config.prefixes[0]}lirik bohemian rhapsody` },
							{ header: '🌤️', title: 'ᴄᴜᴀᴄᴀ', description: 'Cek cuaca kota', id: `${config.prefixes[0]}cuaca Jakarta` }
						]
					},
					{
						title: '🌍 ɪɴғᴏ & sᴄʀᴀᴘᴇʀ',
						rows: [
							{ header: '🕌', title: 'sʜᴏʟᴀᴛ', description: 'Jadwal sholat hari ini', id: `${config.prefixes[0]}sholat Jakarta` },
							{ header: '📖', title: 'sᴜʀᴀʜ', description: 'Baca surah Al-Quran', id: `${config.prefixes[0]}surah 36` },
							{ header: '🔮', title: 'ᴢᴏᴅɪᴀᴋ', description: 'Ramalan zodiak hari ini', id: `${config.prefixes[0]}zodiak aries` },
							{ header: '🌍', title: 'ᴄᴏᴜɴᴛʀʏ ɪɴғᴏ', description: 'Info negara', id: `${config.prefixes[0]}countryinfo Indonesia` },
							{ header: '₿', title: 'ᴄʀʏᴘᴛᴏ ɪɴғᴏ', description: 'Info crypto CoinGecko', id: `${config.prefixes[0]}cryptoinfo bitcoin` },
							{ header: '📰', title: 'ʜᴀᴄᴋᴇʀ ɴᴇᴡs', description: 'Top stories HN', id: `${config.prefixes[0]}hn` }
						]
					},
					{
						title: '📥 ᴅᴏᴡɴʟᴏᴀᴅᴇʀ',
						rows: [
							{ header: '🎵', title: 'ᴛɪᴋᴛᴏᴋ', description: 'Download video TikTok', id: `${config.prefixes[0]}tiktok https://...` },
							{ header: '📸', title: 'ɪɴsᴛᴀɢʀᴀᴍ', description: 'Download media Instagram', id: `${config.prefixes[0]}ig https://...` },
							{ header: '🗂️', title: 'ᴍᴇᴅɪᴀғɪʀᴇ', description: 'Download file Mediafire', id: `${config.prefixes[0]}mediafire https://...` },
							{ header: '▶️', title: 'ʏᴏᴜᴛᴜʙᴇ', description: 'Download video YouTube', id: `${config.prefixes[0]}yt https://...` }
						]
					},
					{
						title: '🎮 ɢᴀᴍᴇ & ғᴜɴ',
						rows: [
							{ header: '🎯', title: 'ᴛᴇʙᴀᴋ ɢᴀᴍʙᴀʀ', description: 'Tebak emoji puzzle', id: `${config.prefixes[0]}tebakgambar` },
							{ header: '♟️', title: 'ᴛɪᴄᴛᴀᴄᴛᴏᴇ', description: 'Main TicTacToe vs bot', id: `${config.prefixes[0]}ttt` },
							{ header: '🎰', title: 'sʟᴏᴛ', description: 'Mesin slot casino', id: `${config.prefixes[0]}slot` },
							{ header: '🎲', title: 'ᴅᴀᴅᴜ', description: 'Lempar dadu', id: `${config.prefixes[0]}dadu` },
							{ header: '📝', title: 'ᴡᴏʀᴅʟᴇ', description: 'Tebak kata 5 huruf', id: `${config.prefixes[0]}wordle` },
							{ header: '💣', title: 'ᴍɪɴᴇsᴡᴇᴇᴘᴇʀ', description: 'Sapuan ranjau klasik', id: `${config.prefixes[0]}minesweeper` }
						]
					},
					{
						title: '🛡️ ɢʀᴏᴜᴘ ᴍᴀɴᴀɢᴇᴍᴇɴᴛ',
						rows: [
							{ header: '📢', title: 'ᴛᴀɢᴀʟʟ', description: 'Tag semua member grup', id: `${config.prefixes[0]}tagall` },
							{ header: '👋', title: 'ᴀғᴋ', description: 'Set status AFK', id: `${config.prefixes[0]}afk lagi makan` },
							{ header: '⚙️', title: 'ɢʀᴏᴜᴘsᴇᴛᴛɪɴɢ', description: 'Lihat setting grup', id: `${config.prefixes[0]}groupsetting` },
							{ header: '🃏', title: 'ᴀᴜᴛᴏsᴛɪᴄᴋᴇʀ', description: 'Toggle auto-sticker', id: `${config.prefixes[0]}autosticker` },
							{ header: '👁️', title: 'ᴀɴᴛɪᴠɪᴇᴡᴏɴᴄᴇ', description: 'Toggle anti view-once', id: `${config.prefixes[0]}antiviewonce` }
						]
					},
					{
						title: '🔘 ᴅᴇᴍᴏ ʙᴜᴛᴛᴏɴ',
						rows: [
							{ header: '✨', title: 'ǫᴜɪᴄᴋ ʀᴇᴘʟʏ', description: 'Demo tombol cepat', id: `${config.prefixes[0]}button` },
							{ header: '📋', title: 'ʟɪsᴛ', description: 'Demo tombol list', id: `${config.prefixes[0]}list` },
							{ header: '📋', title: 'ᴄᴏᴘʏ', description: 'Demo tombol copy text', id: `${config.prefixes[0]}copy` },
							{ header: '🌐', title: 'ʟɪɴᴋ', description: 'Demo tombol URL', id: `${config.prefixes[0]}link` },
							{ header: '📞', title: 'ᴄᴀʟʟ', description: 'Demo tombol telepon', id: `${config.prefixes[0]}call` }
						]
					}
				]),
				urlButton('🌐 ɢɪᴛʜᴜʙ', GITHUB_URL)
			]
		},
		{
			quoted
		}
	)

// ─── Channel ID buttons ─────────
export const sendChannelIdButtons = async (sock, jid, content, quoted) =>
	sock.sendMessage(
		jid,
		await withContextInfo(sock, {
			text: content.text,
			title: content.title,
			footer: content.footer || BOT_FOOTER,
			interactiveButtons: [
				copyButton('📋 ᴄᴏᴘʏ ɪᴅ', content.channelId),
				urlButton('🔗 ʙᴜᴋᴀ ᴄʜᴀɴɴᴇʟ', content.url)
			]
		}),
		{ quoted }
	)

// ─── Pinterest buttons ─────────
export const sendPinterestButtons = async (sock, jid, content, quoted) =>
	sock.sendMessage(
		jid,
		await withContextInfo(sock, {
			text: content.text,
			title: '📌 ᴘɪɴᴛᴇʀᴇsᴛ sᴄʀᴀᴘᴇʀ',
			footer: BOT_FOOTER,
			interactiveButtons: [
				copyButton('📋 ᴄᴏᴘʏ ᴍᴇᴅɪᴀ', content.mediaUrl),
				urlButton('🔗 ʙᴜᴋᴀ ᴘɪɴ', content.sourceUrl)
			]
		}),
		{ quoted }
	)

// ─── Generic Result with Buttons ─────────
export const sendResult = async (sock, jid, { text, title, footer, url, copyText, quickReplies, image }, quoted) => {
	const buttons = []
	if (quickReplies) {
		for (const qr of quickReplies) {
			buttons.push(quickReplyButton(qr.text, qr.id))
		}
	}
	if (url) buttons.push(urlButton('🔗 ʙᴜᴋᴀ ʟɪɴᴋ', url))
	if (copyText) buttons.push(copyButton('📋 ᴄᴏᴘʏ', copyText))
	if (!buttons.length) buttons.push(urlButton('🌐 ɢɪᴛʜᴜʙ', GITHUB_URL))

	return sock.sendMessage(
		jid,
		await withContextInfo(sock, {
			text,
			title: title || sock.dianaConfig?.name || 'Diana Bot',
			footer: footer || BOT_FOOTER,
			...(image ? { image } : {}),
			interactiveButtons: buttons
		}),
		{ quoted }
	)
}
