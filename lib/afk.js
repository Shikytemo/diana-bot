// AFK system — stores AFK status in DB per user

export const setAfk = (db, sender, reason = '') => {
	const user = db.getUser(sender)
	user.afk = {
		reason: reason || 'tidak ada alasan',
		at: new Date().toISOString()
	}
	return user
}

export const getAfk = (db, sender) => {
	const user = db.getUser(sender)
	return user.afk || null
}

export const removeAfk = (db, sender) => {
	const user = db.getUser(sender)
	delete user.afk
	return user
}

export const formatAfk = afk => {
	const ago = Math.round((Date.now() - new Date(afk.at).getTime()) / 60000)
	const timeStr = ago < 1 ? 'baru saja' : ago < 60 ? `${ago} menit lalu` : `${Math.round(ago / 60)} jam lalu`
	return `User AFK: _${afk.reason}_ (${timeStr})`
}
