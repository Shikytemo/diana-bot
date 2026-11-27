import { isText, noText } from '../../../lib/global.js'
import { detectPlatform, resolveDownload, resolveYtSearch } from '../../../lib/scraper.js'
import { sendRichButtons } from '../../../lib/reply.js'
import { withContextInfo } from '../../../lib/reply-style.js'
import { copyButton, urlButton } from 'shileys'

// Handler mengikuti pola Diana yang sudah ada (lihat tiktok.js / mediafire.js):
//  - m.reply untuk teks, sock.sendMessage untuk media
//  - targetJid = replyJid || jid, quoted hanya kalau target === jid
//  - gagal scraper = balas teks, JANGAN crash bot
const sendResult = async (m, result) => {
	const { sock, message, replyJid, jid } = m
	const targetJid = replyJid || jid
	const quoted = targetJid === jid ? message : undefined
	if (!result.ok) {
		await m.reply(result.text)
		return
	}
	// Media langsung (video / audio / gambar) kalau ada
	if (result.kind === 'video' && result.mediaUrl) {
		await sock.sendMessage(targetJid, await withContextInfo(sock, {
			video: { url: result.mediaUrl },
			mimetype: 'video/mp4',
			text: result.text,
			title: `📥 ${result.platform} Downloader`,
			footer: '⚡ ᴅɪʀᴇᴄᴛ ᴍᴇᴅɪᴀ',
			interactiveButtons: [
				urlButton('🌐 ʙᴜᴋᴀ ᴠɪᴅᴇᴏ', result.mediaUrl),
				copyButton('📋 ᴄᴏᴘʏ ʟɪɴᴋ', result.mediaUrl)
			]
		}), { quoted })
		return
	}
	if (result.kind === 'audio' && result.mediaUrl) {
		await sock.sendMessage(targetJid, await withContextInfo(sock, {
			audio: { url: result.mediaUrl },
			mimetype: 'audio/mpeg',
			text: result.text,
			title: `🎵 ${result.platform} Downloader`,
			footer: '⚡ ᴅɪʀᴇᴄᴛ ᴀᴜᴅɪᴏ',
			interactiveButtons: [
				urlButton('🌐 ʙᴜᴋᴀ ᴀᴜᴅɪᴏ', result.mediaUrl),
				copyButton('📋 ᴄᴏᴘʏ ʟɪɴᴋ', result.mediaUrl)
			]
		}), { quoted })
		return
	}
	if (result.kind === 'image' && result.mediaUrl) {
		await sock.sendMessage(targetJid, await withContextInfo(sock, {
			image: { url: result.mediaUrl },
			text: result.text,
			title: `🖼️ ${result.platform} Downloader`,
			footer: '⚡ ᴅɪʀᴇᴄᴛ ᴍᴇᴅɪᴀ',
			interactiveButtons: [
				urlButton('🌐 ʙᴜᴋᴀ ɢᴀᴍʙᴀʀ', result.mediaUrl),
				copyButton('📋 ᴄᴏᴘʏ ʟɪɴᴋ', result.mediaUrl)
			]
		}), { quoted })
		return
	}
	// Fallback: hanya link (sama seperti handler downloader lama)
	await sendRichButtons(sock, targetJid, {
		text: [
			`╭━━━ 📥 *${result.platform} ᴅᴏᴡɴʟᴏᴀᴅᴇʀ* ━━━╮`,
			'┃',
			`┃  ${result.text}`,
			'┃',
			'╰━━━━━━━━━━━━━━━━━━╯'
		].join('\n'),
		title: `${result.platform} Downloader`,
		footer: '🔗 ғᴀʟʟʙᴀᴄᴋ ʟɪɴᴋ',
		urls: [{ text: '📥 ʙᴜᴋᴀ ᴍᴇᴅɪᴀ', url: result.mediaUrl }],
		copies: [{ text: '📋 ᴄᴏᴘʏ ʟɪɴᴋ', copyText: result.mediaUrl }]
	}, quoted)
}

const handlePlatform = platform => async m => {
	const { command } = m
	if (!isText(command)) {
		await m.reply(noText(command.prefix, command.name, 'https://example.com/...'))
		return
	}
	await m.reply('⏳ ᴄᴇᴋ ʟɪɴᴋ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ...')
	try {
		const result = await resolveDownload({ input: command.text, platform })
		await sendResult(m, result)
	} catch (error) {
		await m.reply(`❌ Downloader gagal: ${error?.message || error}`)
	}
}

const handleDl = async m => {
	const { command } = m
	if (!isText(command)) {
		await m.reply(noText(command.prefix, command.name, 'https://www.instagram.com/reel/...'))
		return
	}
	const platform = detectPlatform(command.text)
	if (!platform) {
		await m.reply('❌ Platform link itu belum didukung. Coba IG, TikTok, FB, X, YouTube, CapCut, Threads, Spotify, SoundCloud, MediaFire, Pinterest, atau Google Drive.')
		return
	}
	await m.reply(`⏳ ᴅᴇᴛᴇᴋsɪ: ${platform}...`)
	try {
		const result = await resolveDownload({ input: command.text, platform })
		await sendResult(m, result)
	} catch (error) {
		await m.reply(`❌ Downloader gagal: ${error?.message || error}`)
	}
}

const handleYts = async m => {
	const { command, message, replyJid, jid, sock } = m
	if (!isText(command)) {
		await m.reply(noText(command.prefix, command.name, 'somewhere only we know'))
		return
	}
	await m.reply(`🔎 *ᴄᴀʀɪ ʏᴏᴜᴛᴜʙᴇ "${command.text}"...*`)
	const result = await resolveYtSearch(command.text)
	if (!result.ok) {
		await m.reply(result.text)
		return
	}
	const targetJid = replyJid || jid
	const quoted = targetJid === jid ? message : undefined
	if (result.topUrl) {
		await sendRichButtons(sock, targetJid, {
			text: [
				'╭━━━ 🔎 *ʏᴏᴜᴛᴜʙᴇ sᴇᴀʀᴄʜ* ━━━╮',
				'┃',
				result.text,
				'┃',
				'╰━━━━━━━━━━━━━━━━━━━━━━━╯'
			].join('\n'),
			title: '🔎 YouTube Search',
			urls: [{ text: '▶️ ʙᴜᴋᴀ ʜᴀsɪʟ ᴛᴇʀᴀᴛᴀs', url: result.topUrl }],
			copies: [{ text: '📋 ᴄᴏᴘʏ ʟɪɴᴋ', copyText: result.topUrl }]
		}, quoted)
	} else {
		await m.reply(result.text)
	}
}

export const commands = {
	// .dl — auto-detect, command baru (tidak bentrok dengan yang sudah ada)
	dl: handleDl,
	download: handleDl,
	autodl: handleDl,
	// Command di bawah ini SUDAH ada di functions/commands.js tapi belum
	// punya handler di functions/handlers/download/index.js — file ini
	// yang mengisinya. Kalau ternyata sudah ada handler lain dengan nama
	// yang sama di folder handlers lain, hapus duplikatnya sebelum merge.
	facebook: handlePlatform('facebook'),
	fb: handlePlatform('facebook'),
	twitter: handlePlatform('twitter'),
	x: handlePlatform('twitter'),
	capcut: handlePlatform('capcut'),
	soundcloud: handlePlatform('soundcloud'),
	sc: handlePlatform('soundcloud'),
	threads: handlePlatform('threads'),
	spotifydl: handlePlatform('spotify'),
	spdl: handlePlatform('spotify'),
	gdrive: handlePlatform('gdrive'),
	yts: handleYts
}
