const POLLINATIONS_URL = 'https://gen.pollinations.ai/text'
const MAX_CONTEXT = 5

const chatContexts = new Map()

const getSystemPrompt = () =>
	'Kamu adalah Diana, asisten bot WhatsApp yang ramah dan membantu. Jawab dalam Bahasa Indonesia secara singkat dan padat. Gunakan emoji secukupnya. Jika ditanya hal teknis, jawab dengan jelas.'

const fetchAi = async prompt => {
	const url = `${POLLINATIONS_URL}/${encodeURIComponent(prompt)}?model=openai&system=${encodeURIComponent(getSystemPrompt())}`
	const res = await fetch(url)
	if (!res.ok) throw new Error(`AI error: ${res.status}`)
	return (await res.text()).trim()
}

const fetchAiChat = async messages => {
	const res = await fetch('https://gen.pollinations.ai/v1/chat/completions', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			model: 'openai',
			messages,
			temperature: 0.7
		})
	})
	if (!res.ok) throw new Error(`AI error: ${res.status}`)
	const data = await res.json()
	return data.choices?.[0]?.message?.content?.trim() || 'Maaf, AI tidak merespon.'
}

export const aiChatForReply = async (jid, sender, text) => {
	try {
		const key = `${jid}:${sender}`
		let context = chatContexts.get(key) || []
		context.push({ role: 'user', content: text })
		if (context.length > MAX_CONTEXT * 2) {
			context = context.slice(-MAX_CONTEXT * 2)
		}

		const messages = [
			{ role: 'system', content: getSystemPrompt() },
			...context
		]

		const reply = await fetchAiChat(messages)
		context.push({ role: 'assistant', content: reply })
		chatContexts.set(key, context)

		return { ok: true, text: reply }
	} catch (error) {
		// Fallback ke simple GET
		try {
			const reply = await fetchAi(text)
			return { ok: true, text: reply }
		} catch (err2) {
			return { ok: false, text: `AI gagal: ${err2.message || err2}` }
		}
	}
}

export const clearAiContext = (jid, sender) => {
	chatContexts.delete(`${jid}:${sender}`)
}
