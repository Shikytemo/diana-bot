import { isText, noText } from '../../../lib/global.js'
import { transformText, styleListText, STYLE_NAMES } from '../../../lib/font.js'
import { sendRichButtons, sendList } from '../../../lib/reply.js'

export const commands = {
	font: async m => {
		const { command, sock, message, replyJid, jid } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		if (!isText(command)) {
			await sendList(sock, targetJid, {
				text: [
					'╭━━━ ✨ *ғᴏɴᴛ sᴛʏʟɪsʜ* ━━━╮',
					'┃',
					`┃  Format: ${command.prefix}font <style> <teks>`,
					`┃  Contoh: ${command.prefix}font bold Hello World`,
					'┃',
					'╰━━━━━━━━━━━━━━━━━━╯'
				].join('\n'),
				title: '✨ Font Stylish',
				buttonText: '✨ ᴘɪʟɪʜ sᴛʏʟᴇ',
				sections: [{
					title: '✨ ᴅᴀғᴛᴀʀ sᴛʏʟᴇ',
					rows: STYLE_NAMES.slice(0, 20).map(name => ({
						header: '✨',
						title: name,
						description: `Contoh: ${command.prefix}font ${name} Hello`,
						id: `${command.prefix}font ${name} Hello World`
					}))
				}]
			}, quoted)
			return
		}

		const args = command.text.split(/\s+/)
		const style = args[0]?.toLowerCase()
		const text = args.slice(1).join(' ')

		if (!STYLE_NAMES.includes(style)) {
			await m.reply(`❌ Style "${style}" tidak ditemukan.\n\nStyle tersedia:\n${styleListText()}`)
			return
		}
		if (!text) {
			await m.reply(`⚠️ Teks belum diisi.\nContoh: ${command.prefix}font ${style} Hello World`)
			return
		}

		const result = transformText(text, style)
		await sendRichButtons(sock, targetJid, {
			text: result,
			title: `✨ ${style}`,
			copies: [
				{ text: '📋 ᴄᴏᴘʏ ᴛᴇxᴛ', copyText: result }
			]
		}, quoted)
	},

	style: async m => await m.commands.font(m)
}
