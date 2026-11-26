import { isText, noText } from '../../../lib/global.js'
import { surahForReply, ayatForReply, surahListForReply } from '../../../lib/quran.js'
import { sholatForReply } from '../../../lib/sholat.js'
import { sendRichButtons, sendList } from '../../../lib/reply.js'

export const commands = {
	surah: async m => {
		const { command, sock, message, replyJid, jid } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		if (!isText(command)) {
			await m.reply(noText(command.prefix, command.name, '36'))
			return
		}
		await m.reply('📖 ᴀᴍʙɪʟ sᴜʀᴀʜ...')
		const result = await surahForReply(command.text)
		await sendRichButtons(sock, targetJid, {
			text: [
				'╭━━━ 📖 *ᴀʟ-ǫᴜʀᴀɴ* ━━━╮',
				'┃',
				`┃  ${result.text.slice(0, 3800)}`,
				'┃',
				'╰━━━━━━━━━━━━━━━━━━╯'
			].join('\n'),
			title: '📖 Al-Quran',
			quickReplies: [
				{ text: '📚 ᴅᴀғᴛᴀʀ sᴜʀᴀʜ', id: `${command.prefix}surahlist` },
				{ text: '🕌 sʜᴏʟᴀᴛ', id: `${command.prefix}sholat Jakarta` }
			],
			copies: [
				{ text: '📋 ᴄᴏᴘʏ ᴛᴇxᴛ', copyText: result.text.slice(0, 2000) }
			]
		}, quoted)
	},
	quran: async m => await m.commands.surah(m),
	ayat: async m => {
		const { command, sock, message, replyJid, jid } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		if (!isText(command)) {
			await m.reply(noText(command.prefix, command.name, '2 255'))
			return
		}
		await m.reply('📖 ᴀᴍʙɪʟ ᴀʏᴀᴛ...')
		const result = await ayatForReply(command.text)
		await sendRichButtons(sock, targetJid, {
			text: result.text,
			title: '📖 Ayat',
			copies: [
				{ text: '📋 ᴄᴏᴘʏ ᴀʏᴀᴛ', copyText: result.text.slice(0, 2000) }
			]
		}, quoted)
	},
	surahlist: async m => {
		await m.reply('📚 ᴀᴍʙɪʟ ᴅᴀғᴛᴀʀ sᴜʀᴀʜ...')
		const result = await surahListForReply()
		await m.reply(result.text)
	},
	daftarsurah: async m => await m.commands.surahlist(m),
	sholat: async m => {
		const { command, sock, message, replyJid, jid } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		if (!isText(command)) {
			await m.reply(noText(command.prefix, command.name, 'Jakarta'))
			return
		}
		await m.reply('🕌 ᴀᴍʙɪʟ ᴊᴀᴅᴡᴀʟ sʜᴏʟᴀᴛ...')
		const result = await sholatForReply(command.text)
		await sendRichButtons(sock, targetJid, {
			text: [
				'╭━━━ 🕌 *ᴊᴀᴅᴡᴀʟ sʜᴏʟᴀᴛ* ━━━╮',
				'┃',
				`┃  ${result.text.slice(0, 3800)}`,
				'┃',
				'╰━━━━━━━━━━━━━━━━━━╯'
			].join('\n'),
			title: '🕌 Jadwal Sholat',
			quickReplies: [
				{ text: '📖 sᴜʀᴀʜ ʏᴀsɪɴ', id: `${command.prefix}surah 36` },
				{ text: '📋 ᴍᴇɴᴜ', id: `${command.prefix}menu` }
			]
		}, quoted)
	},
	jadwalsholat: async m => await m.commands.sholat(m)
}
