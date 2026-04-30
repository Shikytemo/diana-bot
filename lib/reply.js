import { callButton, copyButton, quickReplyButton, singleSelectButton, urlButton } from 'shileys'

export const replyText = (sock, jid, text, quoted) =>
	sock.sendMessage(
		jid,
		{
			text
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
