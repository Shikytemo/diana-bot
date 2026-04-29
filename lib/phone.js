import { readFile } from 'fs/promises'
import { join } from 'path'
import { createInterface } from 'readline/promises'
import { stdin as input, stdout as output } from 'process'

export const normalizePhone = value => value.replace(/\D/g, '')

export const askPhoneNumber = async () => {
	const rl = createInterface({ input, output })
	try {
		const answer = await rl.question('Nomor HP WhatsApp: ')
		return normalizePhone(answer)
	} finally {
		rl.close()
	}
}

export const getPhoneFromCli = async () => {
	const argPhone = process.argv.find(arg => /^\+?\d{8,}$/.test(arg))
	if (argPhone) return normalizePhone(argPhone)

	if (process.env.BOT_PHONE_NUMBER) {
		return normalizePhone(process.env.BOT_PHONE_NUMBER)
	}

	return askPhoneNumber()
}

export const isSessionRegistered = async sessionDir => {
	try {
		const creds = JSON.parse(await readFile(join(sessionDir, 'creds.json'), 'utf8'))
		return creds?.registered === true
	} catch (error) {
		if (error.code === 'ENOENT') return false
		throw error
	}
}
