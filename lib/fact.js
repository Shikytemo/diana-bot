import { randomFact } from '@shikytemo/shitools'

export const factForReply = async (lang = 'en') => {
	try {
		const f = await randomFact({ lang })
		const text = [`💡 *Random Fact*`, '', f.text, '', `🔗 ${f.url}`].filter(Boolean).join('\n')
		return { ok: true, text, fact: f }
	} catch (error) {
		return { ok: false, text: `Fact gagal: ${error.message || error}` }
	}
}
