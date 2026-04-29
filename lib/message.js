export const getMessageText = message => {
	const content = message.message || {}
	const nativeFlowParams = content.interactiveResponseMessage?.nativeFlowResponseMessage?.paramsJson
	let nativeFlowId = ''

	if (nativeFlowParams) {
		try {
			const parsed = JSON.parse(nativeFlowParams)
			nativeFlowId = parsed.id || parsed.response || parsed.selectedId || ''
		} catch {
			nativeFlowId = nativeFlowParams
		}
	}

	return (
		content.conversation ||
		content.extendedTextMessage?.text ||
		content.imageMessage?.caption ||
		content.videoMessage?.caption ||
		content.buttonsResponseMessage?.selectedButtonId ||
		content.templateButtonReplyMessage?.selectedId ||
		nativeFlowId ||
		''
	)
}

export const getSenderJid = message => message.key.participant || message.key.remoteJid

export const parseCommand = (text, prefixes) => {
	const prefix = prefixes.find(item => text.startsWith(item))
	if (!prefix) return null

	const body = text.slice(prefix.length).trim()
	if (!body) return null

	const [name, ...args] = body.split(/\s+/)
	return {
		prefix,
		name: name.toLowerCase(),
		args,
		text: args.join(' ')
	}
}
