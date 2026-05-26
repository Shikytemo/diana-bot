import { isText, noText } from '../../../lib/global.js'
import { encodeForReply, encoderListText, ENCODER_NAMES } from '../../../lib/encode.js'

export const commands = {
	encode: async m => {
		const { command } = m
		if (!isText(command)) {
			await m.reply([
				'🔐 *Encode/Decode*',
				'',
				`Format: ${command.prefix}encode <method> <teks>`,
				`Decode: ${command.prefix}decode <method> <teks>`,
				`Contoh: ${command.prefix}encode base64 Hello World`,
				'',
				`Method tersedia:`,
				encoderListText()
			].join('\n'))
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
		await m.reply(result.text)
	},

	decode: async m => {
		const { command } = m
		if (!isText(command)) {
			await m.reply(`Format: ${command.prefix}decode <method> <teks>\nContoh: ${command.prefix}decode base64 SGVsbG8=`)
			return
		}
		const method = command.args[0]?.toLowerCase()
		const text = command.args.slice(1).join(' ')
		if (!ENCODER_NAMES.includes(method)) {
			await m.reply(`❌ Method "${method}" tidak ditemukan.\n\nTersedia:\n${encoderListText()}`)
			return
		}
		if (!text) {
			await m.reply(`⚠️ Teks belum diisi.`)
			return
		}
		const result = encodeForReply(text, method, 'decode')
		await m.reply(result.text)
	},

	morse: async m => {
		const { command } = m
		if (!isText(command)) {
			await m.reply(noText(command.prefix, command.name, 'Hello World'))
			return
		}
		const text = command.text
		// Auto-detect: if input contains only .-/ then decode, else encode
		const isMorse = /^[\s.\-\/]+$/.test(text)
		const result = encodeForReply(text, 'morse', isMorse ? 'decode' : 'encode')
		await m.reply(result.text)
	},

	binary: async m => {
		const { command } = m
		if (!isText(command)) {
			await m.reply(noText(command.prefix, command.name, 'Hello'))
			return
		}
		const text = command.text
		const isBin = /^[01\s]+$/.test(text)
		const result = encodeForReply(text, 'binary', isBin ? 'decode' : 'encode')
		await m.reply(result.text)
	},

	hash: async m => {
		const { command } = m
		if (!isText(command)) {
			await m.reply(`Format: ${command.prefix}hash <algo> <teks>\nAlgo: sha256, md5, sha1, sha512\nContoh: ${command.prefix}hash sha256 Hello`)
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
		await m.reply(result.text)
	}
}
