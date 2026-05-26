import { addGameXp } from '../../../lib/game.js'

const REELS = ['🍒', '🍋', '🍊', '🍇', '🔔', '💎', '7️⃣', '⭐']
const SLOT_XP_JACKPOT = 50
const SLOT_XP_PAIR = 15
const SLOT_XP_LOSS = 5

const pick = arr => arr[Math.floor(Math.random() * arr.length)]

export const commands = {
	slot: async m => {
		const { sender, db } = m
		const r1 = pick(REELS), r2 = pick(REELS), r3 = pick(REELS)
		const isJackpot = r1 === r2 && r2 === r3
		const isPair = r1 === r2 || r2 === r3 || r1 === r3
		const user = db.getUser(sender)

		let xp = SLOT_XP_LOSS
		let result = '❌ Zonk!'
		if (isJackpot) {
			xp = SLOT_XP_JACKPOT
			result = '🎰 JACKPOT! 🎉'
		} else if (isPair) {
			xp = SLOT_XP_PAIR
			result = '✅ Dapat pasangan!'
		}

		const xpResult = addGameXp(user, xp)
		await db.save()

		const lines = [
			'🎰 *Slot Machine*',
			'',
			`┌───┬───┬───┐`,
			`│ ${r1} │ ${r2} │ ${r3} │`,
			`└───┴───┴───┘`,
			'',
			result,
			`🎁 +${xp} XP`
		]
		if (xpResult.leveledUp) {
			lines.push('', `🏆 *Level Up!* Sekarang Level ${xpResult.level}`)
		}
		await m.reply(lines.join('\n'))
	},

	coinflip: async m => {
		const { sender, db, command } = m
		const choice = (command.args[0] || '').toLowerCase()
		if (!['heads', 'tails', 'h', 't', 'kepala', 'ekor'].includes(choice)) {
			await m.reply([
				'🪙 *Coin Flip*',
				'',
				`Format: ${command.prefix}coinflip <heads/tails>`,
				`Contoh: ${command.prefix}coinflip heads`,
				`Alias: h/t, kepala/ekor`
			].join('\n'))
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
			'🪙 *Coin Flip*',
			'',
			`Kamu pilih: ${userChoice}`,
			`Hasil: ${flipResult}`,
			'',
			won ? '✅ Kamu menang! 🎉' : '❌ Kamu kalah!',
			`🎁 +${xp} XP`
		]
		if (xpResult.leveledUp) {
			lines.push('', `🏆 *Level Up!* Sekarang Level ${xpResult.level}`)
		}
		await m.reply(lines.join('\n'))
	},

	cf: async m => await m.commands.coinflip(m),

	dice: async m => {
		const { sender, db, command } = m
		const sides = Math.max(Number(command.args[0]) || 6, 2)
		const roll = Math.floor(Math.random() * sides) + 1

		const user = db.getUser(sender)
		const xp = roll === sides ? 15 : 3
		const xpResult = addGameXp(user, xp)
		await db.save()

		const diceEmoji = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅']
		const emoji = sides <= 6 && roll <= 6 ? diceEmoji[roll - 1] : '🎲'

		const lines = [
			'🎲 *Dice Roll*',
			'',
			`${emoji} Hasil: *${roll}* (1-${sides})`,
			roll === sides ? '🎉 Maksimal!' : '',
			`🎁 +${xp} XP`
		].filter(Boolean)
		if (xpResult.leveledUp) {
			lines.push('', `🏆 *Level Up!* Sekarang Level ${xpResult.level}`)
		}
		await m.reply(lines.join('\n'))
	},

	dadu: async m => await m.commands.dice(m)
}
