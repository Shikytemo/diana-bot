import { callButton, copyButton, quickReplyButton, singleSelectButton, urlButton } from 'shileys'
import { buildReplyContext } from './reply-style.js'

export const reply = (sock, jid, text, quoted) =>
	sock.sendMessage(
		jid,
		{
			text,
			contextInfo: buildReplyContext(sock.dianaConfig, sock.dianaDb)
		},
		{
			quoted
		}
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

export const sendMenu = (sock, jid, config, quoted, roles) =>
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
							{
								header: '🎭 ʀᴇᴘʟʏ',
								title: 'sᴇᴛʀᴇᴘʟʏ',
								description: 'Set style custom reply',
								id: `${config.prefixes[0]}setreply v1`
							}
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

export const sendButtons = (sock, jid, content, quoted) =>
	sock.sendMessage(
		jid,
		{
			text: content.text,
			title: content.title,
			footer: content.footer,
			interactiveButtons: content.buttons.map(button => quickReplyButton(button.text, button.id))
		},
		{
			quoted
		}
	)

export const sendList = (sock, jid, content, quoted) =>
	sock.sendMessage(
		jid,
		{
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
		},
		{
			quoted
		}
	)

export const sendUrlButton = (sock, jid, content, quoted) =>
	sock.sendMessage(
		jid,
		{
			text: content.text,
			title: content.title,
			footer: content.footer,
			interactiveButtons: [urlButton(content.buttonText || 'Buka Link', content.url)]
		},
		{
			quoted
		}
	)

export const sendCopyButton = (sock, jid, content, quoted) =>
	sock.sendMessage(
		jid,
		{
			text: content.text,
			title: content.title,
			footer: content.footer,
			interactiveButtons: [copyButton(content.buttonText || 'Copy', content.copyText)]
		},
		{
			quoted
		}
	)

export const sendCallButton = (sock, jid, content, quoted) =>
	sock.sendMessage(
		jid,
		{
			text: content.text,
			title: content.title,
			footer: content.footer,
			interactiveButtons: [callButton(content.buttonText || 'Telepon', content.phoneNumber)]
		},
		{
			quoted
		}
	)

export const sendChannelIdButtons = (sock, jid, content, quoted) =>
	sock.sendMessage(
		jid,
		{
			text: content.text,
			title: content.title,
			footer: content.footer,
			interactiveButtons: [
				copyButton('📋 Copy ID', content.channelId),
				urlButton('🔗 Buka Channel', content.url)
			]
		},
		{
			quoted
		}
	)

export const sendPinterestButtons = (sock, jid, content, quoted) =>
	sock.sendMessage(
		jid,
		{
			text: content.text,
			title: '📌 Pinterest Scraper',
			footer: 'Powered by shitools',
			interactiveButtons: [
				copyButton('📋 Copy Media', content.mediaUrl),
				urlButton('🔗 Buka Pin', content.sourceUrl)
			]
		},
		{
			quoted
		}
	)
