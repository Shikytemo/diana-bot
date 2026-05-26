import { isText, noText } from '../../../lib/global.js'
import { textproGenerate, textproListText, getTextproById } from '../../../lib/textpro.js'
import { withContextInfo } from '../../../lib/reply-style.js'

export const commands = {
	textpro: async m => {
		const { command, message, replyJid, jid, sock } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined

		if (!isText(command)) {
			await m.reply([
				'🎨 *TextPro Text Effect*',
				'',
				`Format: ${command.prefix}textpro <efek> <teks>`,
				`Contoh: ${command.prefix}textpro neon Hello`,
				`Contoh: ${command.prefix}textpro graffiti Hello World`,
				'',
				'Efek tersedia:',
				textproListText()
			].join('\n'))
			return
		}

		const effectId = command.args[0]?.toLowerCase()
		if (effectId === 'list') {
			await m.reply(textproListText())
			return
		}

		const effect = getTextproById(effectId)
		const texts = effect?.texts === 2
			? [command.args[1] || '', command.args[2] || '']
			: [command.args.slice(1).join(' ') || '']

		if (!texts[0]) {
			await m.reply(`⚠️ Teks belum diisi.\nContoh: ${command.prefix}textpro ${effectId} Hello`)
			return
		}

		await m.reply('🎨 Generate text effect... (5-15 detik)')
		const result = await textproGenerate(effectId, texts)
		if (!result.ok) {
			await m.reply(result.text)
			return
		}

		try {
			await sock.sendMessage(targetJid, await withContextInfo(sock, {
				image: { url: result.imageUrl },
				caption: `🎨 *${result.effect}*`
			}), { quoted })
		} catch {
			await m.reply(`🎨 ${result.effect}\n\n${result.imageUrl}`)
		}
	},

	tp: async m => await m.commands.textpro(m)
}
