import { randomJoke } from '@shikytemo/shitools'

export const jokeForReply = async (category = 'Any') => {
	try {
		const j = await randomJoke({ category })
		const lines = [`😂 *Joke — ${j.category}*`, '']
		if (j.type === 'twopart') {
			lines.push(j.setup, '', `_${j.delivery}_`)
		} else {
			lines.push(j.joke)
		}
		return { ok: true, text: lines.join('\n'), joke: j }
	} catch (error) {
		return { ok: false, text: `Joke gagal: ${error.message || error}` }
	}
}
