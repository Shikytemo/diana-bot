import { addGameXp } from '../../../lib/game.js'
import { sendRichButtons } from '../../../lib/reply.js'

const REELS = ['🍒', '🍋', '🍊', '🍇', '🔔', '💎', '7️⃣', '⭐']
const SLOT_XP_JACKPOT = 50
const SLOT_XP_PAIR = 15
const SLOT_XP_LOSS = 5

const pick = arr => arr[Math.floor(Math.random() * arr.length)]

export const commands = {
	slot: async m => {
		const { sender, db, sock, message, replyJid, jid, command } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		const r1 = pick(REELS), r2 = pick(REELS), r3 = pick(REELS)
		const isJackpot = r1 === r2 && r2 === r3
		const isPair = r1 === r2 || r2 === r3 || r1 === r3
		const user = db.getUser(sender)

		let xp = SLOT_XP_LOSS
		let result = '❌ ᴢᴏɴᴋ!'
		if (isJackpot) {
			xp = SLOT_XP_JACKPOT
			result = '🎰 *ᴊᴀᴄᴋᴘᴏᴛ!* 🎉'
		} else if (isPair) {
			xp = SLOT_XP_PAIR
			result = '✅ *ᴅᴀᴘᴀᴛ ᴘᴀsᴀɴɢᴀɴ!*'
		}

		const xpResult = addGameXp(user, xp)
		await db.save()

		const lines = [
			'╭━━━ 🎰 *sʟᴏᴛ ᴍᴀᴄʜɪɴᴇ* ━━━╮',
			'┃',
			'┃  ┌───┬───┬───┐',
			`┃  │ ${r1} │ ${r2} │ ${r3} │`,
			'┃  └───┴───┴───┘',
			'┃',
			`┃  ${result}`,
			`┃  🎁 +${xp} XP`
		]
		if (xpResult.leveledUp) {
			lines.push(`┃  🏆 *ʟᴇᴠᴇʟ ᴜᴘ!* ʟᴇᴠᴇʟ ${xpResult.level}`)
		}
		lines.push('┃', '╰━━━━━━━━━━━━━━━━━━━━━╯')

		await sendRichButtons(sock, targetJid, {
			text: lines.join('\n'),
			title: '🎰 Casino Slot',
			quickReplies: [
				{ text: '🎰 sᴘɪɴ ʟᴀɢɪ', id: `${command.prefix}slot` },
				{ text: '🪙 ᴄᴏɪɴғʟɪᴘ', id: `${command.prefix}cf` },
				{ text: '🎲 ᴅᴀᴅᴜ', id: `${command.prefix}dadu` }
			]
		}, quoted)
	},

	coinflip: async m => {
		const { sender, db, command, sock, message, replyJid, jid } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		const choice = (command.args[0] || '').toLowerCase()
		if (!['heads', 'tails', 'h', 't', 'kepala', 'ekor'].includes(choice)) {
			await sendRichButtons(sock, targetJid, {
				text: [
					'╭━━━ 🪙 *ᴄᴏɪɴ ғʟɪᴘ* ━━━╮',
					'┃',
					'┃  Pilih sisi koin di bawah:',
					'┃',
					'╰━━━━━━━━━━━━━━━━━━━╯'
				].join('\n'),
				title: '🪙 Coin Flip',
				quickReplies: [
					{ text: '👑 ʜᴇᴀᴅs (ᴋᴇᴘᴀʟᴀ)', id: `${command.prefix}cf heads` },
					{ text: '🪙 ᴛᴀɪʟs (ᴇᴋᴏʀ)', id: `${command.prefix}cf tails` }
				]
			}, quoted)
			return
		}
		const isHeads = choice === 'heads' || choice === 'h' || choice === 'kepala'
		const userChoice = isHeads ? 'Heads (Kepala)' : 'Tails (Ekor)'
		const flip = Math.random() < 0.5
		const flipResult = flip ? 'Heads (Kepala)' : 'Tails (Ekor)'
		const won = isHeads === flip

		const user = db.getUser(sender)
		const xp = won ? 20 : 3
		const xpResult = addGameXp(user, xp)
		await db.save()

		const lines = [
			'╭━━━ 🪙 *ᴄᴏɪɴ ғʟɪᴘ* ━━━╮',
			'┃',
			`┃  🎯 ᴘɪʟɪʜᴀɴ ⌁ ${userChoice}`,
			`┃  🪙 ʜᴀsɪʟ   ⌁ ${flipResult}`,
			'┃',
			`┃  ${won ? '✅ ᴋᴀᴍᴜ ᴍᴇɴᴀɴɢ! 🎉' : '❌ ᴋᴀᴍᴜ ᴋᴀʟᴀʜ!'}`,
			`┃  🎁 +${xp} XP`
		]
		if (xpResult.leveledUp) {
			lines.push(`┃  🏆 *ʟᴇᴠᴇʟ ᴜᴘ!* ʟᴇᴠᴇʟ ${xpResult.level}`)
		}
		lines.push('┃', '╰━━━━━━━━━━━━━━━━━━━╯')

		await sendRichButtons(sock, targetJid, {
			text: lines.join('\n'),
			title: '🪙 Coin Flip',
			quickReplies: [
				{ text: '👑 ʜᴇᴀᴅs', id: `${command.prefix}cf heads` },
				{ text: '🪙 ᴛᴀɪʟs', id: `${command.prefix}cf tails` },
				{ text: '🎰 sʟᴏᴛ', id: `${command.prefix}slot` }
			]
		}, quoted)
	},

	cf: async m => await m.commands.coinflip(m),

	dice: async m => {
		const { sender, db, command, sock, message, replyJid, jid } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		const sides = Math.max(Number(command.args[0]) || 6, 2)
		const roll = Math.floor(Math.random() * sides) + 1

		const user = db.getUser(sender)
		const xp = roll === sides ? 15 : 3
		const xpResult = addGameXp(user, xp)
		await db.save()

		const diceEmoji = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅']
		const emoji = sides <= 6 && roll <= 6 ? diceEmoji[roll - 1] : '🎲'

		const lines = [
			'╭━━━ 🎲 *ᴅɪᴄᴇ ʀᴏʟʟ* ━━━╮',
			'┃',
			`┃  ${emoji} ʜᴀsɪʟ ⌁ *${roll}* (1-${sides})`,
			...(roll === sides ? ['┃  🎉 ᴍᴀᴋsɪᴍᴀʟ!'] : []),
			`┃  🎁 +${xp} XP`
		]
		if (xpResult.leveledUp) {
			lines.push(`┃  🏆 *ʟᴇᴠᴇʟ ᴜᴘ!* ʟᴇᴠᴇʟ ${xpResult.level}`)
		}
		lines.push('┃', '╰━━━━━━━━━━━━━━━━━━━╯')

		await sendRichButtons(sock, targetJid, {
			text: lines.join('\n'),
			title: '🎲 Dice Roll',
			quickReplies: [
				{ text: '🎲 ʟᴇᴍᴘᴀʀ ʟᴀɢɪ', id: `${command.prefix}dadu ${sides}` },
				{ text: '🎰 sʟᴏᴛ', id: `${command.prefix}slot` }
			]
		}, quoted)
	},

	dadu: async m => await m.commands.dice(m)
}
