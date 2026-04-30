import { callButton, copyButton, quickReplyButton, singleSelectButton, urlButton } from 'shileys'

const buildCustomReplyContext = config => {
	const custom = config?.customReply
	if (!custom?.enabled) return undefined

	const contextInfo = {}

	if (custom.forwarded) {
		contextInfo.isForwarded = true
		contextInfo.forwardingScore = Number.isFinite(custom.forwardingScore) ? custom.forwardingScore : 0
	}

	if (custom.channelId) {
		contextInfo.forwardedNewsletterMessageInfo = {
			newsletterJid: custom.channelId,
			newsletterName: custom.channelName || custom.title || 'Diana Bot',
			serverMessageId: 1
		}
	}

	if (custom.title || custom.body || custom.thumbnailUrl || custom.sourceUrl) {
		contextInfo.externalAdReply = {
			title: custom.title || custom.channelName || 'Diana Bot',
			body: custom.body || '',
			mediaType: 1,
			renderLargerThumbnail: Boolean(custom.thumbnailUrl),
			showAdAttribution: false,
			sourceUrl: custom.sourceUrl || undefined,
			thumbnailUrl: custom.thumbnailUrl || undefined
		}
	}

	return Object.keys(contextInfo).length ? contextInfo : undefined
}

export const replyText = (sock, jid, text, quoted) =>
	sock.sendMessage(
		jid,
		{
			text,
			contextInfo: buildCustomReplyContext(sock.dianaConfig)
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
