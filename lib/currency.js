import { convertCurrency, getRates } from '@shikytemo/shitools'

const formatNumber = value => {
	const n = Number(value)
	if (!Number.isFinite(n)) return String(value)
	return new Intl.NumberFormat('id-ID', {
		minimumFractionDigits: 0,
		maximumFractionDigits: 4
	}).format(n)
}

export const kursForReply = async args => {
	const tokens = Array.isArray(args) ? args : String(args || '').trim().split(/\s+/).filter(Boolean)
	if (tokens.length < 2) {
		return { ok: false, text: 'Pakai: .kurs <FROM> <TO> [amount]. Contoh: .kurs USD IDR 50' }
	}
	const from = String(tokens[0] || '').toUpperCase()
	const to = String(tokens[1] || '').toUpperCase()
	const amount = tokens.length > 2 ? Number(tokens[2]) : 1
	if (!Number.isFinite(amount) || amount <= 0) {
		return { ok: false, text: 'Amount harus angka > 0. Contoh: .kurs USD IDR 50' }
	}
	try {
		const out = await convertCurrency(from, to, amount)
		const text = [
			`💱 *Currency — ${out.from} → ${out.to}*`,
			'',
			`${formatNumber(out.amount)} ${out.from} = *${formatNumber(out.result)} ${out.to}*`,
			`📊 Rate: 1 ${out.from} = ${formatNumber(out.rate)} ${out.to}`,
			`⏰ Update: ${out.updatedAt}`,
			`🛰️ Source: ${out.source}`
		].join('\n')
		return { ok: true, text, conversion: out }
	} catch (error) {
		return { ok: false, text: `Kurs gagal: ${error.message || error}` }
	}
}

export const ratesForReply = async base => {
	const code = String(base || 'USD').trim().toUpperCase() || 'USD'
	try {
		const rates = await getRates(code)
		const popular = ['USD', 'EUR', 'IDR', 'JPY', 'SGD', 'MYR', 'AUD', 'GBP', 'KRW', 'CNY']
		const filtered = popular.filter(c => c !== rates.base && rates.rates[c] != null)
		const lines = [
			`💱 *Rates — base ${rates.base}*`,
			`⏰ ${rates.updatedAt}`,
			'',
			...filtered.map(c => `1 ${rates.base} = ${formatNumber(rates.rates[c])} ${c}`)
		]
		return { ok: true, text: lines.join('\n'), rates }
	} catch (error) {
		return { ok: false, text: `Rates gagal: ${error.message || error}` }
	}
}
