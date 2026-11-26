import { isText, noText } from '../../../lib/global.js'
import { encodeForReply, encoderListText, ENCODER_NAMES } from '../../../lib/encode.js'
import { sendRichButtons, sendList } from '../../../lib/reply.js'

export const commands = {
	encode: async m => {
		const { command, sock, message, replyJid, jid } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		if (!isText(command)) {
			await sendList(sock, targetJid, {
				text: [
					'╭━━━ 🔐 *ᴇɴᴄᴏᴅᴇ / ᴅᴇᴄᴏᴅᴇ* ━━━╮',
					'┃',
					`┃  📝 ғᴏʀᴍᴀᴛ ⌁ ${command.prefix}encode <method> <teks>`,
					`┃  🔓 ᴅᴇᴄᴏᴅᴇ ⌁ ${command.prefix}decode <method> <teks>`,
					`┃  💡 ᴄᴏɴᴛᴏʜ ⌁ ${command.prefix}encode base64 Hello`,
					'┃',
					'╰━━━━━━━━━━━━━━━━━━━━━━━╯'
				].join('\n'),
				title: '🔐 Encoder',
				buttonText: '🔐 ᴘɪʟɪʜ ᴍᴇᴛʜᴏᴅ',
				sections: [{
					title: '🔐 ᴍᴇᴛʜᴏᴅ ᴛᴇʀsᴇᴅɪᴀ',
					rows: ENCODER_NAMES.slice(0, 20).map(method => ({
						header: '🔐',
						title: method.toUpperCase(),
						description: `Encode Hello World ke ${method}`,
						id: `${command.prefix}encode ${method} Hello World`
					}))
				}]
			}, quoted)
			return
		}
		const method = command.args[0]?.toLowerCase()
		const text = command.args.slice(1).join(' ')
		if (!ENCODER_NAMES.includes(method)) {
			await m.reply(`❌ Method "${method}" tidak ditemukan.\n\nTersedia:\n${encoderListText()}`)
			return
		}
		if (!text) {
			await m.reply(`⚠️ Teks belum diisi.\nContoh: ${command.prefix}encode ${method} Hello World`)
			return
		}
		const result = encodeForReply(text, method, 'encode')
		await sendRichButtons(sock, targetJid, {
			text: [
				`╭━━━ 🔐 *ᴇɴᴄᴏᴅᴇ (${method})* ━━━╮`,
				'┃',
				result.text,
				'┃',
				'╰━━━━━━━━━━━━━━━━━━━━━━━╯'
			].join('\n'),
			title: `🔐 Encode ${method}`,
			copies: [{ text: '📋 ᴄᴏᴘʏ ʜᴀsɪʟ', copyText: result.output || result.text }]
		}, quoted)
	},

	decode: async m => {
		const { command, sock, message, replyJid, jid } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		if (!isText(command)) {
			await m.reply(`⚠️ Format: ${command.prefix}decode <method> <teks>\nContoh: ${command.prefix}decode base64 SGVsbG8=`)
			return
		}
		const method = command.args[0]?.toLowerCase()
		const text = command.args.slice(1).join(' ')
		if (!ENCODER_NAMES.includes(method)) {
			await m.reply(`❌ Method "${method}" tidak ditemukan.\n\nTersedia:\n${encoderListText()}`)
			return
		}
		if (!text) {
			await m.reply('⚠️ Teks belum diisi.')
			return
		}
		const result = encodeForReply(text, method, 'decode')
		await sendRichButtons(sock, targetJid, {
			text: [
				`╭━━━ 🔓 *ᴅᴇᴄᴏᴅᴇ (${method})* ━━━╮`,
				'┃',
				result.text,
				'┃',
				'╰━━━━━━━━━━━━━━━━━━━━━━━╯'
			].join('\n'),
			title: `🔓 Decode ${method}`,
			copies: [{ text: '📋 ᴄᴏᴘʏ ʜᴀsɪʟ', copyText: result.output || result.text }]
		}, quoted)
	},

	morse: async m => {
		const { command, sock, message, replyJid, jid } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		if (!isText(command)) {
			await m.reply(noText(command.prefix, command.name, 'Hello World'))
			return
		}
		const text = command.text
		const isMorse = /^[\s.\-\/]+$/.test(text)
		const result = encodeForReply(text, 'morse', isMorse ? 'decode' : 'encode')
		await sendRichButtons(sock, targetJid, {
			text: [
				'╭━━━ 📡 *ᴍᴏʀsᴇ ᴄᴏᴅᴇ* ━━━╮',
				'┃',
				result.text,
				'┃',
				'╰━━━━━━━━━━━━━━━━━━━╯'
			].join('\n'),
			title: '📡 Morse',
			copies: [{ text: '📋 ᴄᴏᴘʏ ʜᴀsɪʟ', copyText: result.output || result.text }]
		}, quoted)
	},

	binary: async m => {
		const { command, sock, message, replyJid, jid } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		if (!isText(command)) {
			await m.reply(noText(command.prefix, command.name, 'Hello'))
			return
		}
		const text = command.text
		const isBin = /^[01\s]+$/.test(text)
		const result = encodeForReply(text, 'binary', isBin ? 'decode' : 'encode')
		await sendRichButtons(sock, targetJid, {
			text: [
				'╭━━━ 💻 *ʙɪɴᴀʀʏ* ━━━╮',
				'┃',
				result.text,
				'┃',
				'╰━━━━━━━━━━━━━━━━━╯'
			].join('\n'),
			title: '💻 Binary',
			copies: [{ text: '📋 ᴄᴏᴘʏ ʜᴀsɪʟ', copyText: result.output || result.text }]
		}, quoted)
	},

	hash: async m => {
		const { command, sock, message, replyJid, jid } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		if (!isText(command)) {
			await sendList(sock, targetJid, {
				text: [
					'╭━━━ #️⃣ *ʜᴀsʜ ɢᴇɴᴇʀᴀᴛᴏʀ* ━━━╮',
					'┃',
					`┃  📝 ғᴏʀᴍᴀᴛ ⌁ ${command.prefix}hash <algo> <teks>`,
					`┃  💡 ᴄᴏɴᴛᴏʜ ⌁ ${command.prefix}hash sha256 Hello`,
					'┃',
					'╰━━━━━━━━━━━━━━━━━━━━━━━╯'
				].join('\n'),
				title: '#️⃣ Hash',
				buttonText: '#️⃣ ᴘɪʟɪʜ ᴀʟɢᴏ',
				sections: [{
					title: '#️⃣ ᴀʟɢᴏʀɪᴛᴍᴀ',
					rows: ['sha256', 'md5', 'sha1', 'sha512'].map(algo => ({
						header: '#️⃣',
						title: algo.toUpperCase(),
						description: `Hash Hello dengan ${algo}`,
						id: `${command.prefix}hash ${algo} Hello`
					}))
				}]
			}, quoted)
			return
		}
		const algo = command.args[0]?.toLowerCase()
		const text = command.args.slice(1).join(' ')
		if (!['sha256', 'md5', 'sha1', 'sha512'].includes(algo)) {
			await m.reply(`❌ Algo "${algo}" tidak ditemukan. Tersedia: sha256, md5, sha1, sha512`)
			return
		}
		if (!text) {
			await m.reply('⚠️ Teks belum diisi.')
			return
		}
		const result = encodeForReply(text, algo, 'encode')
		await sendRichButtons(sock, targetJid, {
			text: [
				`╭━━━ #️⃣ *ʜᴀsʜ (${algo.toUpperCase()})* ━━━╮`,
				'┃',
				result.text,
				'┃',
				'╰━━━━━━━━━━━━━━━━━━━━━━━╯'
			].join('\n'),
			title: `#️⃣ Hash ${algo}`,
			copies: [{ text: '📋 ᴄᴏᴘʏ ʜᴀsɪʟ', copyText: result.output || result.text }]
		}, quoted)
	}
}
