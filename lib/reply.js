import { generateWAMessageFromContent, isJidGroup, jidNormalizedUser, proto } from 'shileys'

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

const privacyModeOffset = 77980457

const getPrivacyModeTs = () => (Math.floor(Date.now() / 1000) - privacyModeOffset).toString()

const buildMixedNativeFlowBizNode = () => ({
	tag: 'biz',
	attrs: {
		actual_actors: '2',
		host_storage: '2',
		privacy_mode_ts: getPrivacyModeTs()
	},
	content: [
		{
			tag: 'interactive',
			attrs: {
				type: 'native_flow',
				v: '1'
			},
			content: [
				{
					tag: 'native_flow',
					attrs: {
						v: '9',
						name: 'mixed'
					}
				}
			]
		},
		{
			tag: 'quality_control',
			attrs: {
				source_type: 'third_party'
			}
		}
	]
})

const buildQuickReply = (displayText, id) =>
	buildNativeButton('quick_reply', {
		display_text: displayText,
		id
	})

const buildNativeButton = (name, params) =>
	proto.Message.InteractiveMessage.NativeFlowMessage.NativeFlowButton.create({
		name,
		buttonParamsJson: JSON.stringify(params)
	})

const getUserJid = sock => jidNormalizedUser(sock.user?.id || sock.authState?.creds?.me?.id)

const sendInteractiveMessage = async (sock, jid, content, options = {}) => {
	const interactiveMessage = proto.Message.InteractiveMessage.create({
		body: proto.Message.InteractiveMessage.Body.create({
			text: content.text
		}),
		header: content.title
			? proto.Message.InteractiveMessage.Header.create({
				title: content.title,
				hasMediaAttachment: false
			})
			: undefined,
		footer: content.footer
			? proto.Message.InteractiveMessage.Footer.create({
				text: content.footer
			})
			: undefined,
		nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
			buttons: content.buttons,
			messageParamsJson: '{}',
			messageVersion: 1
		})
	})
	const waMessage = generateWAMessageFromContent(
		jid,
		{
			interactiveMessage
		},
		{
			userJid: getUserJid(sock),
			quoted: options.quoted
		}
	)
	const additionalNodes = isJidGroup(jid)
		? [buildMixedNativeFlowBizNode()]
		: [
			{
				tag: 'bot',
				attrs: {
					biz_bot: '1'
				}
			},
			buildMixedNativeFlowBizNode()
		]

	await sock.relayMessage(jid, waMessage.message, {
		messageId: waMessage.key.id,
		additionalNodes
	})

	return waMessage
}

export const sendMenu = (sock, jid, config, quoted) =>
	sendInteractiveMessage(
		sock,
		jid,
		{
			text: 'Pilih menu yang tersedia.',
			title: config.name,
			footer: 'Powered by shileys',
			buttons: [
				buildQuickReply('Menu', `${config.prefixes[0]}menu`),
				buildQuickReply('Ping', `${config.prefixes[0]}ping`),
				buildQuickReply('Text Menu', `${config.prefixes[0]}menutext`)
			]
		},
		{
			quoted
		}
	)

export const sendButtons = (sock, jid, content, quoted) =>
	sendInteractiveMessage(
		sock,
		jid,
		{
			text: content.text,
			title: content.title,
			footer: content.footer,
			buttons: content.buttons.map(button => buildQuickReply(button.text, button.id))
		},
		{
			quoted
		}
	)

export const sendList = (sock, jid, content, quoted) =>
	sendInteractiveMessage(
		sock,
		jid,
		{
			text: content.text,
			title: content.title,
			footer: content.footer,
			buttons: [
				buildNativeButton('single_select', {
					title: content.buttonText || 'Pilih',
					sections: content.sections.map(section => ({
						title: section.title,
						rows: section.rows.map(row => ({
							header: row.header,
							title: row.title,
							description: row.description,
							id: row.id
						}))
					}))
				})
			]
		},
		{
			quoted
		}
	)

export const sendUrlButton = (sock, jid, content, quoted) =>
	sendInteractiveMessage(
		sock,
		jid,
		{
			text: content.text,
			title: content.title,
			footer: content.footer,
			buttons: [
				buildNativeButton('cta_url', {
					display_text: content.buttonText || 'Buka Link',
					url: content.url,
					merchant_url: content.url
				})
			]
		},
		{
			quoted
		}
	)

export const sendCopyButton = (sock, jid, content, quoted) =>
	sendInteractiveMessage(
		sock,
		jid,
		{
			text: content.text,
			title: content.title,
			footer: content.footer,
			buttons: [
				buildNativeButton('cta_copy', {
					display_text: content.buttonText || 'Copy',
					copy_code: content.copyText
				})
			]
		},
		{
			quoted
		}
	)

export const sendCallButton = (sock, jid, content, quoted) =>
	sendInteractiveMessage(
		sock,
		jid,
		{
			text: content.text,
			title: content.title,
			footer: content.footer,
			buttons: [
				buildNativeButton('cta_call', {
					display_text: content.buttonText || 'Telepon',
					phone_number: content.phoneNumber
				})
			]
		},
		{
			quoted
		}
	)
