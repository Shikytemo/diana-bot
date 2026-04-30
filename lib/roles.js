const normalizeNumber = value => String(value || '').split('@')[0].split(':')[0].replace(/\D/g, '')

const numberSet = numbers => new Set(numbers.map(normalizeNumber).filter(Boolean))

const isPremiumActive = user => {
	if (user.premium) return true
	if (!user.premiumUntil) return false

	const until = new Date(user.premiumUntil).getTime()
	return Number.isFinite(until) && until > Date.now()
}

const getGroupParticipant = (metadata, sender) => {
	const senderNumber = normalizeNumber(sender)
	return metadata?.participants?.find(participant => normalizeNumber(participant.id) === senderNumber)
}

const resolveGroupAdmin = async ({ sock, jid, sender, logger }) => {
	if (!jid?.endsWith('@g.us') || typeof sock.groupMetadata !== 'function') return false

	try {
		const metadata = await sock.groupMetadata(jid)
		const participant = getGroupParticipant(metadata, sender)
		return ['admin', 'superadmin'].includes(participant?.admin)
	} catch (error) {
		logger?.debug({ error, jid, sender }, 'failed to resolve group admin')
		return false
	}
}

export const resolveRoles = async ({ sock, jid, sender, config, db, logger }) => {
	const user = db.getUser(sender)
	const senderNumber = normalizeNumber(sender)
	const owners = numberSet([config.ownerNumber])
	const admins = numberSet(config.adminNumbers || [])
	const premiums = numberSet(config.premiumNumbers || [])
	const groupAdmin = await resolveGroupAdmin({ sock, jid, sender, logger })

	const isOwner = owners.has(senderNumber)
	const isAdmin = isOwner || admins.has(senderNumber) || groupAdmin
	const isPremium = isOwner || premiums.has(senderNumber) || isPremiumActive(user)
	const isMember = Boolean(user.registered)
	const isUnregister = !isMember

	return {
		number: senderNumber,
		user,
		isOwner,
		isAdmin,
		isGroupAdmin: groupAdmin,
		isPremium,
		isMember,
		isUser: true,
		isUnregister,
		labels: [
			isOwner && 'owner',
			isAdmin && 'admin',
			isPremium && 'premium',
			isMember && 'member',
			'user',
			isUnregister && 'unregister'
		].filter(Boolean)
	}
}

export const formatRoles = roles =>
	[
		`Nomor: ${roles.number || '-'}`,
		`Role: ${roles.labels.join(', ')}`,
		`Owner: ${roles.isOwner ? 'yes' : 'no'}`,
		`Admin: ${roles.isAdmin ? 'yes' : 'no'}`,
		`Member: ${roles.isMember ? 'yes' : 'no'}`,
		`User: ${roles.isUser ? 'yes' : 'no'}`,
		`Premium: ${roles.isPremium ? 'yes' : 'no'}`,
		`Unregister: ${roles.isUnregister ? 'yes' : 'no'}`
	].join('\n')
