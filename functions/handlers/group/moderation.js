import { addWarning, normalizeNumber, removeWarning, requireBotGroupAdmin, requireGroupAdmin, resolveTargetJids } from '../../../lib/group-tools.js'
import { getGroupTargets } from '../../helpers.js'
import { withContextInfo } from '../../../lib/reply-style.js'

export const commands = {
	warn: async m => {
		if (!(await requireGroupAdmin(m))) return
		const targets = await getGroupTargets(m)
		if (!targets.length) return
		const { jid, message, replyJid, sock } = m
		const quoted = replyJid === jid ? message : undefined
		for (const target of targets) {
			const count = addWarning(m.db, jid, target)
			await sock.sendMessage(jid, await withContextInfo(sock, { text: `@${normalizeNumber(target)} mendapat warn ${count}/3.`, mentions: [target] }), { quoted })
		}
		await m.db.save()
	},
	unwarn: async m => {
		if (!(await requireGroupAdmin(m))) return
		const targets = await getGroupTargets(m)
		if (!targets.length) return
		const { jid, message, replyJid, sock } = m
		const quoted = replyJid === jid ? message : undefined
		for (const target of targets) {
			const count = removeWarning(m.db, jid, target)
			await sock.sendMessage(jid, await withContextInfo(sock, { text: `Warn @${normalizeNumber(target)} sekarang ${count}/3.`, mentions: [target] }), { quoted })
		}
		await m.db.save()
	},
	kick: async m => {
		if (!(await requireGroupAdmin(m))) return
		if (!(await requireBotGroupAdmin(m))) return
		const targets = await getGroupTargets(m)
		if (!targets.length) return
		await m.sock.groupParticipantsUpdate(m.jid, targets, 'remove')
		for (const target of targets) {
			removeWarning(m.db, m.jid, target, 99)
		}
		await m.db.save()
		await m.reply(`Berhasil kick ${targets.length} member.`)
	},
	remove: async m => await m.commands.kick(m),
	promote: async m => {
		if (!(await requireGroupAdmin(m))) return
		if (!(await requireBotGroupAdmin(m))) return
		const targets = await getGroupTargets(m)
		if (!targets.length) return
		await m.sock.groupParticipantsUpdate(m.jid, targets, 'promote')
		await m.reply(`Berhasil promote ${targets.length} member.`)
	},
	demote: async m => {
		if (!(await requireGroupAdmin(m))) return
		if (!(await requireBotGroupAdmin(m))) return
		const targets = await getGroupTargets(m)
		if (!targets.length) return
		await m.sock.groupParticipantsUpdate(m.jid, targets, 'demote')
		await m.reply(`Berhasil demote ${targets.length} admin.`)
	}
}
