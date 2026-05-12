import { isText, noText } from '../../../lib/global.js'
import { dispatchTiktokInput, resolveTiktokSearch, resolveTiktokUser, resolveTiktokVideo } from '../../../lib/tiktok.js'
import { sendUrlButton } from '../../../lib/reply.js'
import { withContextInfo } from '../../../lib/reply-style.js'

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
				await m.reply('🎬 Ambil TikTok no-watermark...')
				const result = await resolveTiktokVideo(dispatch.value)
				if (!result.ok) {
					await m.reply(result.text || 'Tidak bisa resolve TikTok URL itu.')
					return
				}
				await sock.sendMessage(targetJid, await withContextInfo(sock, {
					video: { url: result.playUrl },
					mimetype: 'video/mp4',
					caption: result.caption
				}), { quoted })
				return
			}
			if (dispatch.kind === 'user') {
				await m.reply(`🔎 Ambil profil TikTok ${dispatch.value}...`)
				const result = await resolveTiktokUser(dispatch.value)
				if (!result.ok) {
					await m.reply(result.text)
					return
				}
				await sendUrlButton(sock, targetJid, {
					text: result.text,
					title: '📊 TikTok Profile',
					footer: 'Powered by shitools',
					buttonText: 'Buka Profil',
					url: result.profileUrl
				}, quoted)
				return
			}
			await m.reply(`🔎 Cari TikTok "${dispatch.value}"...`)
			const result = await resolveTiktokSearch(dispatch.value)
			if (!result.ok) {
				await m.reply(result.text)
				return
			}
			if (result.topPermalink) {
				await sendUrlButton(sock, targetJid, {
					text: result.text,
					title: '🔎 TikTok Search',
					footer: 'Powered by shitools',
					buttonText: 'Buka Hasil Teratas',
					url: result.topPermalink
				}, quoted)
			} else {
				await m.reply(result.text)
			}
		} catch (error) {
			await m.reply(`TikTok gagal: ${error.message || error}`)
		}
	},
	tt: async m => await m.commands.tiktok(m),
	ttuser: async m => {
		const { command, message, replyJid, jid, sock } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		if (!isText(command)) {
			await m.reply(noText(command.prefix, command.name, '@khaby.lame'), quoted)
			return
		}
		await m.reply('🔎 Ambil profil TikTok...')
		try {
			const result = await resolveTiktokUser(command.text)
			if (!result.ok) {
				await m.reply(result.text)
				return
			}
			await sendUrlButton(sock, targetJid, {
				text: result.text,
				title: '📊 TikTok Profile',
				footer: 'Powered by shitools',
				buttonText: 'Buka Profil',
				url: result.profileUrl
			}, quoted)
		} catch (error) {
			await m.reply(`Cek user gagal: ${error.message || error}`)
		}
	},
	ttprofile: async m => await m.commands.ttuser(m),
	tikuser: async m => await m.commands.ttuser(m)
}
