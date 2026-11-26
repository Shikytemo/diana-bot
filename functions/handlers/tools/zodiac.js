import { isText, noText } from '../../../lib/global.js'
import { horoscopeForReply, zodiacListText } from '../../../lib/zodiac.js'
import { sendRichButtons, sendList } from '../../../lib/reply.js'

const zodiacEmoji = {
	aries: '♈', taurus: '♉', gemini: '♊', cancer: '♋',
	leo: '♌', virgo: '♍', libra: '♎', scorpio: '♏',
	sagittarius: '♐', capricorn: '♑', aquarius: '♒', pisces: '♓'
}

export const commands = {
	zodiak: async m => {
		const { command, sock, message, replyJid, jid } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		if (!isText(command)) {
			await sendList(sock, targetJid, {
				text: [
					'╭━━━ 🔮 *ᴢᴏᴅɪᴀᴋ / ʜᴏʀᴏsᴄᴏᴘᴇ* ━━━╮',
					'┃',
					'┃  Pilih zodiak kamu dari',
					'┃  daftar di bawah.',
					'┃',
					'╰━━━━━━━━━━━━━━━━━━╯'
				].join('\n'),
				title: '🔮 Zodiak',
				buttonText: '♈ ᴘɪʟɪʜ ᴢᴏᴅɪᴀᴋ',
				sections: [{
					title: '♈ ᴅᴀғᴛᴀʀ ᴢᴏᴅɪᴀᴋ',
					rows: Object.entries(zodiacEmoji).map(([name, emoji]) => ({
						header: emoji,
						title: name.charAt(0).toUpperCase() + name.slice(1),
						description: `Ramalan ${name} hari ini`,
						id: `${command.prefix}zodiak ${name}`
					}))
				}]
			}, quoted)
			return
		}
		if (command.text.toLowerCase() === 'list') {
			await m.reply(zodiacListText())
			return
		}
		await m.reply('🔮 ᴀᴍʙɪʟ ʀᴀᴍᴀʟᴀɴ...')
		const result = await horoscopeForReply(command.text)
		const emoji = zodiacEmoji[command.text.toLowerCase()] || '🔮'
		await sendRichButtons(sock, targetJid, {
			text: [
				`╭━━━ ${emoji} *${command.text.toUpperCase()}* ━━━╮`,
				'┃',
				`┃  ${result.text.slice(0, 3800)}`,
				'┃',
				'╰━━━━━━━━━━━━━━━━━━╯'
			].join('\n'),
			title: `${emoji} Zodiak`,
			quickReplies: [
				{ text: '♈ ᴢᴏᴅɪᴀᴋ ʟᴀɪɴ', id: `${command.prefix}zodiak` },
				{ text: '📋 ᴍᴇɴᴜ', id: `${command.prefix}menu` }
			]
		}, quoted)
	},

	horo: async m => await m.commands.zodiak(m)
}
