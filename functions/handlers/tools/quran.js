import { isText, noText } from '../../../lib/global.js'
import { surahForReply, ayatForReply, surahListForReply } from '../../../lib/quran.js'
import { sholatForReply } from '../../../lib/sholat.js'

export const commands = {
	surah: async m => {
		if (!isText(m.command)) {
			await m.reply(noText(m.command.prefix, m.command.name, '36'))
			return
		}
		await m.reply('📖 Ambil surah...')
		const result = await surahForReply(m.command.text)
		await m.reply(result.text)
	},
	quran: async m => await m.commands.surah(m),
	ayat: async m => {
		if (!isText(m.command)) {
			await m.reply(noText(m.command.prefix, m.command.name, '2 255'))
			return
		}
		await m.reply('📖 Ambil ayat...')
		const result = await ayatForReply(m.command.text)
		await m.reply(result.text)
	},
	surahlist: async m => {
		await m.reply('📚 Ambil daftar surah...')
		const result = await surahListForReply()
		await m.reply(result.text)
	},
	daftarsurah: async m => await m.commands.surahlist(m),
	sholat: async m => {
		if (!isText(m.command)) {
			await m.reply(noText(m.command.prefix, m.command.name, 'Jakarta'))
			return
		}
		await m.reply('🕌 Ambil jadwal sholat...')
		const result = await sholatForReply(m.command.text)
		await m.reply(result.text)
	},
	jadwalsholat: async m => await m.commands.sholat(m)
}
