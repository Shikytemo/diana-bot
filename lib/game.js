import { addCommandXp } from './leveling.js'

const sessions = new Map()
const SESSION_TIMEOUT = 30000 // 30 detik

export const hasSession = jid => sessions.has(jid)

export const getSession = jid => sessions.get(jid) || null

export const createSession = (jid, data) => {
	const timer = setTimeout(() => sessions.delete(jid), SESSION_TIMEOUT)
	sessions.set(jid, { ...data, timer })
	return sessions.get(jid)
}

export const deleteSession = jid => {
	const session = sessions.get(jid)
	if (session?.timer) clearTimeout(session.timer)
	sessions.delete(jid)
}

export const addGameXp = (user, amount = 15) => {
	user.exp = Number(user.exp) || 0
	user.level = Math.max(Number(user.level) || 1, 1)
	user.exp += amount
	return addCommandXp(user, 0) // just triggers level-up check
}
