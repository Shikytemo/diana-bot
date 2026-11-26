import { requireGroupAdmin, requireBotGroupAdmin, addWarning, removeWarning, normalizeNumber } from '../../../lib/group-tools.js'
import { getGroupTargets } from '../../helpers.js'
import { withContextInfo } from '../../../lib/reply-style.js'
import { sendRichButtons } from '../../../lib/reply.js'
import { quickReplyButton } from 'shileys'

export const commands = {
	warn: async m => {
		if (!(await requireGroupAdmin(m))) return
		const targets = await getGroupTargets(m)
		if (!targets.length) return
		const { jid, sock, message, db, command, replyJid } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		for (const target of targets) {
			const count = addWarning(db, jid, target)
			if (count >= 3) {
				try {
					await sock.groupParticipantsUpdate(jid, [target], 'remove')
					removeWarning(db, jid, target, 99)
					await sendRichButtons(sock, jid, {
						text: [
							'╭━━━ ⚠️ *ᴡᴀʀɴ 3/3 — ᴋɪᴄᴋ* ━━━╮',
							'┃',
							`┃  👤 ᴛᴀʀɢᴇᴛ ⌁ @${normalizeNumber(target)}`,
							'┃  💥 ᴀᴋsɪ   ⌁ ᴅɪ-ᴋɪᴄᴋ ᴅᴀʀɪ ɢʀᴜᴘ',
							'┃',
							'╰━━━━━━━━━━━━━━━━━━╯'
						].join('\n'),
						title: 'Warning System',
						quickReplies: [
							{ text: '⚙️ sᴇᴛᴛɪɴɢs', id: `${command.prefix}groupsetting` }
						]
					}, quoted)
				} catch {
					await sock.sendMessage(jid, await withContextInfo(sock, { text: `⚠️ Gagal kick @${normalizeNumber(target)}, cek bot admin.`, mentions: [target] }), { quoted })
				}
			} else {
				await sock.sendMessage(jid, await withContextInfo(sock, {
					text: [
						'╭━━━ ⚠️ *ᴡᴀʀɴɪɴɢ* ━━━╮',
						'┃',
						`┃  👤 ᴛᴀʀɢᴇᴛ ⌁ @${normalizeNumber(target)}`,
						`┃  📊 ᴡᴀʀɴ   ⌁ ${count}/3`,
						'┃',
						'╰━━━━━━━━━━━━━━━━━━╯'
					].join('\n'),
					mentions: [target]
				}), { quoted })
			}
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
		await m.reply(`🦶 Berhasil kick ${targets.length} member.`)
	},
	remove: async m => await m.commands.kick(m),
	promote: async m => {
		if (!(await requireGroupAdmin(m))) return
		if (!(await requireBotGroupAdmin(m))) return
		const targets = await getGroupTargets(m)
		if (!targets.length) return
		await m.sock.groupParticipantsUpdate(m.jid, targets, 'promote')
		await m.reply(`⬆️ Berhasil promote ${targets.length} member.`)
	},
	demote: async m => {
		if (!(await requireGroupAdmin(m))) return
		if (!(await requireBotGroupAdmin(m))) return
		const targets = await getGroupTargets(m)
		if (!targets.length) return
		await m.sock.groupParticipantsUpdate(m.jid, targets, 'demote')
		await m.reply(`⬇️ Berhasil demote ${targets.length} admin.`)
	}
}
