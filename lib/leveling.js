export const xpForNextLevel = level => Math.max(Number(level) || 1, 1) * 100

export const addCommandXp = (user, amount = 12) => {
	user.exp = Number(user.exp) || 0
	user.level = Math.max(Number(user.level) || 1, 1)
	user.commands = (Number(user.commands) || 0) + 1
	user.exp += amount

	let leveledUp = false
	while (user.exp >= xpForNextLevel(user.level)) {
		user.exp -= xpForNextLevel(user.level)
		user.level += 1
		leveledUp = true
	}

	return {
		leveledUp,
		level: user.level,
		exp: user.exp,
		nextExp: xpForNextLevel(user.level)
	}
}

export const formatLevel = user => {
	const level = Math.max(Number(user?.level) || 1, 1)
	const exp = Number(user?.exp) || 0
	const nextExp = xpForNextLevel(level)
	return `Level ${level} (${exp}/${nextExp} XP)`
}
