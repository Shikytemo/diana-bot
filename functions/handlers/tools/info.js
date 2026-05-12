import { isText, noText } from '../../../lib/global.js'
import { kategloForReply } from '../../../lib/kateglo.js'
import { pypiForReply } from '../../../lib/pypi.js'
import { ghTrendForReply } from '../../../lib/ghtrend.js'
import { ytSearchForReply } from '../../../lib/ytsearch.js'
import { kursForReply, ratesForReply } from '../../../lib/currency.js'
import { ipLookupForReply } from '../../../lib/iplookup.js'
import { redditForReply } from '../../../lib/reddit.js'
import { newsForReply, newsSourceListText } from '../../../lib/news.js'
import { sendUrlButton } from '../../../lib/reply.js'

export const commands = {
	kateglo: async m => {
		if (!isText(m.command)) {
			await m.reply(noText(m.command.prefix, m.command.name, 'komputer'))
			return
		}
		await m.reply('📕 Cari di KBBI/Kateglo...')
		const result = await kategloForReply(m.command.text)
		await m.reply(result.text)
	},
	kbbi: async m => await m.commands.kateglo(m),
	pypi: async m => {
		const { command, message, replyJid, jid, sock } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		if (!isText(command)) {
			await m.reply(noText(command.prefix, command.name, 'requests'))
			return
		}
		await m.reply('🐍 Cek PyPI...')
		const result = await pypiForReply(command.text)
		if (result.ok && result.url) {
			await sendUrlButton(sock, targetJid, {
				text: result.text,
				title: '🐍 PyPI',
				footer: 'Powered by pypi.org',
				buttonText: 'Buka PyPI',
				url: result.url
			}, quoted)
		} else {
			await m.reply(result.text)
		}
	},
	pip: async m => await m.commands.pypi(m),
	ghtrend: async m => {
		await m.reply('🔥 Ambil GitHub Trending...')
		const result = await ghTrendForReply(m.command.args)
		await m.reply(result.text)
	},
	'github-trending': async m => await m.commands.ghtrend(m),
	'gh-trend': async m => await m.commands.ghtrend(m),
	ytsearch: async m => {
		const { command, message, replyJid, jid, sock } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		if (!isText(command)) {
			await m.reply(noText(command.prefix, command.name, 'lo-fi beats'))
			return
		}
		await m.reply('📺 Cari di YouTube...')
		const result = await ytSearchForReply(command.text)
		if (result.ok && result.topUrl) {
			await sendUrlButton(sock, targetJid, {
				text: result.text,
				title: '📺 YouTube Search',
				footer: 'Powered by Piped',
				buttonText: 'Buka Hasil Teratas',
				url: result.topUrl
			}, quoted)
		} else {
			await m.reply(result.text)
		}
	},
	'youtube-search': async m => await m.commands.ytsearch(m),
	kurs: async m => {
		if (!isText(m.command)) {
			await m.reply(noText(m.command.prefix, m.command.name, 'USD IDR 50'))
			return
		}
		await m.reply('💱 Konversi mata uang...')
		const result = await kursForReply(m.command.args)
		await m.reply(result.text)
	},
	currency: async m => await m.commands.kurs(m),
	rates: async m => {
		await m.reply('💱 Ambil rates...')
		const result = await ratesForReply(m.command.args[0])
		await m.reply(result.text)
	},
	rate: async m => await m.commands.rates(m),
	ip: async m => {
		const { command, message, replyJid, jid, sock } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		await m.reply('🌐 Lookup IP...')
		const result = await ipLookupForReply(command.text)
		if (result.ok && result.mapUrl) {
			await sendUrlButton(sock, targetJid, {
				text: result.text,
				title: '🌐 IP Lookup',
				footer: 'Powered by ipwho.is',
				buttonText: 'Buka Maps',
				url: result.mapUrl
			}, quoted)
		} else {
			await m.reply(result.text)
		}
	},
	iplookup: async m => await m.commands.ip(m),
	reddit: async m => {
		const { command, message, replyJid, jid, sock } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		if (!isText(command)) {
			await m.reply(noText(command.prefix, command.name, 'ProgrammerHumor top'))
			return
		}
		await m.reply('🔴 Ambil post Reddit...')
		const result = await redditForReply(command.args)
		if (result.ok && result.topPermalink) {
			await sendUrlButton(sock, targetJid, {
				text: result.text,
				title: '🔴 Reddit',
				footer: 'Powered by reddit.com',
				buttonText: 'Buka Post Teratas',
				url: result.topPermalink
			}, quoted)
		} else {
			await m.reply(result.text)
		}
	},
	r: async m => await m.commands.reddit(m),
	berita: async m => {
		const { command, message, replyJid, jid, sock } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		if (m.command.args[0] === 'list') {
			await m.reply(newsSourceListText())
			return
		}
		await m.reply('📰 Ambil headline...')
		const result = await newsForReply(command.text || command.args[0])
		if (result.ok && result.topUrl) {
			await sendUrlButton(sock, targetJid, {
				text: result.text,
				title: '📰 Berita',
				footer: 'Powered by berita-indo-api',
				buttonText: 'Buka Berita Teratas',
				url: result.topUrl
			}, quoted)
		} else {
			await m.reply(result.text)
		}
	},
	news: async m => await m.commands.berita(m)
}
