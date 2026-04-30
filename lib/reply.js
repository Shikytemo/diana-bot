import { callButton, copyButton, quickReplyButton, singleSelectButton, urlButton } from 'shileys'

const buildCustomReplyContext = config => {
	const custom = config?.customReply
	if (!custom?.enabled) return undefined

	const contextInfo = {}

	if (custom.forwarded) {
		contextInfo.isForwarded = true
		contextInfo.forwardingScore = Number.isFinite(custom.forwardingScore) ? custom.forwardingScore : 0
	}

	if (custom.channelId) {
		contextInfo.forwardedNewsletterMessageInfo = {
			newsletterJid: custom.channelId,
			newsletterName: custom.channelName || custom.title || 'Diana Bot',
			serverMessageId: 1
		}
	}

	if (custom.title || custom.body || custom.thumbnailUrl || custom.sourceUrl) {
		contextInfo.externalAdReply = {
			title: custom.title || custom.channelName || 'Diana Bot',
			body: custom.body || '',
			mediaType: 1,
			renderLargerThumbnail: Boolean(custom.thumbnailUrl),
			showAdAttribution: false,
			sourceUrl: custom.sourceUrl || undefined,
			thumbnailUrl: custom.thumbnailUrl || undefined
		}
	}

	return Object.keys(contextInfo).length ? contextInfo : undefined
}

export const replyText = (sock, jid, text, quoted) =>
	sock.sendMessage(
		jid,
		{
			text,
			contextInfo: buildCustomReplyContext(sock.dianaConfig)
		},
		{
			quoted
		}
	)

export const sendMenu = (sock, jid, config, quoted) =>
	sock.sendMessage(
		jid,
		{
			text: 'Pilih menu yang tersedia.',
			title: config.name,
			footer: 'Powered by shileys',
			interactiveButtons: [
				quickReplyButton('Menu', `${config.prefixes[0]}menu`),
				quickReplyButton('Ping', `${config.prefixes[0]}ping`),
				quickReplyButton('Text Menu', `${config.prefixes[0]}menutext`)
			]
		},
		{
			quoted
		}
	)

export const sendButtons = (sock, jid, content, quoted) =>
	sock.sendMessage(
		jid,
		{
			text: content.text,
			title: content.title,
			footer: content.footer,
			interactiveButtons: content.buttons.map(button => quickReplyButton(button.text, button.id))
		},
		{
			quoted
		}
	)

export const sendList = (sock, jid, content, quoted) =>
	sock.sendMessage(
		jid,
		{
			text: content.text,
			title: content.title,
			footer: content.footer,
			interactiveButtons: [
				singleSelectButton(
					content.buttonText || 'Pilih',
					content.sections.map(section => ({
						title: section.title,
						rows: section.rows.map(row => ({
							header: row.header,
							title: row.title,
							description: row.description,
							id: row.id
						}))
					}))
				)
			]
		},
		{
			quoted
		}
	)

export const sendUrlButton = (sock, jid, content, quoted) =>
	sock.sendMessage(
		jid,
		{
			text: content.text,
			title: content.title,
			footer: content.footer,
			interactiveButtons: [urlButton(content.buttonText || 'Buka Link', content.url)]
		},
		{
			quoted
		}
	)

export const sendCopyButton = (sock, jid, content, quoted) =>
	sock.sendMessage(
		jid,
		{
			text: content.text,
			title: content.title,
			footer: content.footer,
			interactiveButtons: [copyButton(content.buttonText || 'Copy', content.copyText)]
		},
		{
			quoted
		}
	)

export const sendCallButton = (sock, jid, content, quoted) =>
	sock.sendMessage(
		jid,
		{
			text: content.text,
			title: content.title,
			footer: content.footer,
			interactiveButtons: [callButton(content.buttonText || 'Telepon', content.phoneNumber)]
		},
		{
			quoted
		}
	)

export const sendChannelIdButtons = (sock, jid, content, quoted) =>
	sock.sendMessage(
		jid,
		{
			text: content.text,
			title: content.title,
			footer: content.footer,
			interactiveButtons: [
				copyButton('📋 Copy ID', content.channelId),
				urlButton('🔗 Buka Channel', content.url)
			]
		},
		{
			quoted
		}
	)

export const sendPinterestButtons = (sock, jid, content, quoted) =>
	sock.sendMessage(
		jid,
		{
			text: content.text,
			title: '📌 Pinterest Scraper',
			footer: 'Powered by shitools',
			interactiveButtons: [
				copyButton('📋 Copy Media', content.mediaUrl),
				urlButton('🔗 Buka Pin', content.sourceUrl)
			]
		},
		{
			quoted
		}
	)
