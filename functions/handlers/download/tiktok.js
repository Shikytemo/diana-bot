import { isText, noText } from '../../../lib/global.js'
import { dispatchTiktokInput, resolveTiktokSearch, resolveTiktokUser, resolveTiktokVideo } from '../../../lib/tiktok.js'
import { sendRichButtons } from '../../../lib/reply.js'
import { withContextInfo } from '../../../lib/reply-style.js'
import { copyButton, urlButton } from 'shileys'

export const commands = {
	tiktok: async m => {
		const { command, message, replyJid, jid, sock } = m
		const cmd = command.name
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		if (!isText(command)) {
			await m.reply(noText(command.prefix, cmd, 'https://vm.tiktok.com/ZSNFRtUJj/'), quoted)
			return
		}
		const dispatch = dispatchTiktokInput(command.text)
		try {
			if (dispatch.kind === 'url') {
				await m.reply('🎬 *ᴀᴍʙɪʟ ᴛɪᴋᴛᴏᴋ ɴᴏ-ᴡᴀᴛᴇʀᴍᴀʀᴋ...*')
				const result = await resolveTiktokVideo(dispatch.value)
				if (!result.ok) {
					await m.reply(result.text || '❌ Tidak bisa resolve TikTok URL itu.')
					return
				}
				await sock.sendMessage(targetJid, await withContextInfo(sock, {
					video: { url: result.playUrl },
					mimetype: 'video/mp4',
					text: result.caption,
					title: '🎵 TikTok Downloader',
					footer: '⚡ ɴᴏ ᴡᴀᴛᴇʀᴍᴀʀᴋ',
					interactiveButtons: [
						urlButton('🌐 ʙᴜᴋᴀ ᴠɪᴅᴇᴏ', result.playUrl),
						copyButton('📋 ᴄᴏᴘʏ ʟɪɴᴋ', result.playUrl)
					]
				}), { quoted })
				return
			}
			if (dispatch.kind === 'user') {
				await m.reply(`🔎 *ᴀᴍʙɪʟ ᴘʀᴏғɪʟ ᴛɪᴋᴛᴏᴋ ${dispatch.value}...*`)
				const result = await resolveTiktokUser(dispatch.value)
				if (!result.ok) {
					await m.reply(result.text)
					return
				}
				await sendRichButtons(sock, targetJid, {
					text: [
						'╭━━━ 📊 *ᴛɪᴋᴛᴏᴋ ᴘʀᴏғɪʟᴇ* ━━━╮',
						'┃',
						result.text,
						'┃',
						'╰━━━━━━━━━━━━━━━━━━━━━━━╯'
					].join('\n'),
					title: '📊 TikTok Profile',
					urls: [{ text: '🌐 ʙᴜᴋᴀ ᴘʀᴏғɪʟ', url: result.profileUrl }],
					copies: [{ text: '📋 ᴄᴏᴘʏ ʟɪɴᴋ', copyText: result.profileUrl }]
				}, quoted)
				return
			}
			await m.reply(`🔎 *ᴄᴀʀɪ ᴛɪᴋᴛᴏᴋ "${dispatch.value}"...*`)
			const result = await resolveTiktokSearch(dispatch.value)
			if (!result.ok) {
				await m.reply(result.text)
				return
			}
			if (result.topPermalink) {
				await sendRichButtons(sock, targetJid, {
					text: [
						'╭━━━ 🔎 *ᴛɪᴋᴛᴏᴋ sᴇᴀʀᴄʜ* ━━━╮',
						'┃',
						result.text,
						'┃',
						'╰━━━━━━━━━━━━━━━━━━━━━━━╯'
					].join('\n'),
					title: '🔎 TikTok Search',
					urls: [{ text: '🎬 ʙᴜᴋᴀ ʜᴀsɪʟ ᴛᴇʀᴀᴛᴀs', url: result.topPermalink }],
					copies: [{ text: '📋 ᴄᴏᴘʏ ʟɪɴᴋ', copyText: result.topPermalink }]
				}, quoted)
			} else {
				await m.reply(result.text)
			}
		} catch (error) {
			await m.reply(`❌ TikTok gagal: ${error.message || error}`)
		}
	},
	tt: async m => await m.commands.tiktok(m),
	ttdl: async m => await m.commands.tiktok(m),
	ttuser: async m => {
		const { command, message, replyJid, jid, sock } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		if (!isText(command)) {
			await m.reply(noText(command.prefix, command.name, '@khaby.lame'), quoted)
			return
		}
		await m.reply('🔎 *ᴀᴍʙɪʟ ᴘʀᴏғɪʟ ᴛɪᴋᴛᴏᴋ...*')
		try {
			const result = await resolveTiktokUser(command.text)
			if (!result.ok) {
				await m.reply(result.text)
				return
			}
			await sendRichButtons(sock, targetJid, {
				text: [
					'╭━━━ 📊 *ᴛɪᴋᴛᴏᴋ ᴘʀᴏғɪʟᴇ* ━━━╮',
					'┃',
					result.text,
					'┃',
					'╰━━━━━━━━━━━━━━━━━━━━━━━╯'
				].join('\n'),
				title: '📊 TikTok Profile',
				urls: [{ text: '🌐 ʙᴜᴋᴀ ᴘʀᴏғɪʟ', url: result.profileUrl }],
				copies: [{ text: '📋 ᴄᴏᴘʏ ʟɪɴᴋ', copyText: result.profileUrl }]
			}, quoted)
		} catch (error) {
			await m.reply(`❌ Cek user gagal: ${error.message || error}`)
		}
	},
	ttprofile: async m => await m.commands.ttuser(m),
	tikuser: async m => await m.commands.ttuser(m)
}
