const ZODIAC_SIGNS = [
	{ name: 'Capricorn', emoji: '♑', dates: '22 Des - 19 Jan' },
	{ name: 'Aquarius', emoji: '♒', dates: '20 Jan - 18 Feb' },
	{ name: 'Pisces', emoji: '♓', dates: '19 Feb - 20 Mar' },
	{ name: 'Aries', emoji: '♈', dates: '21 Mar - 19 Apr' },
	{ name: 'Taurus', emoji: '♉', dates: '20 Apr - 20 Mei' },
	{ name: 'Gemini', emoji: '♊', dates: '21 Mei - 20 Jun' },
	{ name: 'Cancer', emoji: '♋', dates: '21 Jun - 22 Jul' },
	{ name: 'Leo', emoji: '♌', dates: '23 Jul - 22 Agu' },
	{ name: 'Virgo', emoji: '♍', dates: '23 Agu - 22 Sep' },
	{ name: 'Libra', emoji: '♎', dates: '23 Sep - 22 Okt' },
	{ name: 'Scorpio', emoji: '♏', dates: '23 Okt - 21 Nov' },
	{ name: 'Sagittarius', emoji: '♐', dates: '22 Nov - 21 Des' }
]

const HOROSCOPE_URL = 'https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily'

const normalizeSign = input => {
	const s = input.toLowerCase().trim()
	const map = {
		capricorn: 'Capricorn', cap: 'Capricorn', capricornus: 'Capricorn',
		aquarius: 'Aquarius', aqua: 'Aquarius',
		pisces: 'Pisces', fish: 'Pisces',
		aries: 'Aries', ram: 'Aries',
		taurus: 'Taurus', bull: 'Taurus',
		gemini: 'Gemini', twin: 'Gemini',
		cancer: 'Cancer', crab: 'Cancer',
		leo: 'Leo', lion: 'Leo',
		virgo: 'Virgo', virgin: 'Virgo',
		libra: 'Libra', scale: 'Libra',
		scorpio: 'Scorpio', scorpion: 'Scorpio', scorp: 'Scorpio',
		sagittarius: 'Sagittarius', sag: 'Sagittarius', archer: 'Sagittarius'
	}
	return map[s] || null
}

export const zodiacListText = () => {
	return ZODIAC_SIGNS.map(z => `${z.emoji} ${z.name} (${z.dates})`).join('\n')
}

export const horoscopeForReply = async sign => {
	const normalized = normalizeSign(sign)
	if (!normalized) {
		return { ok: false, text: `Zodiak "${sign}" tidak dikenali.\n\n${zodiacListText()}` }
	}

	const zodiac = ZODIAC_SIGNS.find(z => z.name === normalized)

	try {
		const res = await fetch(`${HOROSCOPE_URL}?sign=${normalized}&day=today`)
		const data = await res.json()
		const horoscope = data?.data?.horoscope || data?.horoscope || data?.description

		if (!horoscope) {
			return { ok: false, text: 'Ramalan tidak tersedia saat ini.' }
		}

		const lines = [
			`${zodiac.emoji} *${zodiac.name}* — ${zodiac.dates}`,
			'',
			horoscope,
			'',
			'🔮 Ramalan harian'
		].join('\n')

		return { ok: true, text: lines }
	} catch (error) {
		return { ok: false, text: `Horoscope gagal: ${error.message || error}` }
	}
}
