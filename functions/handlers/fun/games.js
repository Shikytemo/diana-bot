import { hasSession, createSession, deleteSession, addGameXp } from '../../../lib/game.js'

const GAME_XP = { win: 20, draw: 5, lose: 3, play: 5 }

// ── 8Ball ──
const ballResponses = [
	'Ya, tentu saja! 🟢', 'Sangat mungkin! 🟢', 'Tanpa ragu! 🟢', 'Pasti ya! 🟢',
	'Kayaknya iya 🟡', 'Mungkin saja 🟡', 'Peluangnya bagus 🟡', 'Bisa jadi 🟡',
	'Jangan berharap 😴', 'Nggak deh 🔴', 'Sangat diragukan 🔴', 'Jawabannya tidak 🔴',
	'Coba tanya lagi nanti 🫠', 'Saya nggak tahu 🫠', 'Lupakan saja 🫠', 'Nggak jelas 🫠'
]

// ── TicTacToe ──
const TTT_SIZE = 3
const tttBoard = () => Array(TTT_SIZE * TTT_SIZE).fill('⬜')
const tttRender = board => {
	const symbols = { X: '❌', O: '⭕', '⬜': '⬜' }
	const rows = []
	for (let i = 0; i < TTT_SIZE; i++) {
		rows.push(board.slice(i * TTT_SIZE, (i + 1) * TTT_SIZE).map(c => symbols[c] || c).join(''))
	}
	return rows.join('\n')
}
const tttCheck = (board, sym) => {
	const lines = [
		[0,1,2],[3,4,5],[6,7,8], // rows
		[0,3,6],[1,4,7],[2,5,8], // cols
		[0,4,8],[2,4,6]          // diags
	]
	return lines.some(l => l.every(i => board[i] === sym))
}
const tttAiMove = board => {
	const empty = board.map((c, i) => c === '⬜' ? i : -1).filter(i => i >= 0)
	if (!empty.length) return -1
	// Try to win
	for (const i of empty) {
		const test = [...board]; test[i] = 'O'
		if (tttCheck(test, 'O')) return i
	}
	// Try to block
	for (const i of empty) {
		const test = [...board]; test[i] = 'X'
		if (tttCheck(test, 'X')) return i
	}
	// Center, corners, edges
	const pref = [4, 0, 2, 6, 8, 1, 3, 5, 7]
	return pref.find(i => board[i] === '⬜') ?? empty[0]
}

// ── Hangman ──
const hangmanWords = [
	'javascript', 'whatsapp', 'terminal', 'android', 'programming', 'computer',
	'keyboard', 'internet', 'database', 'algorithm', 'function', 'variable',
	'python', 'github', 'server', 'network', 'browser', 'compiler',
	'framework', 'library', 'module', 'package', 'runtime', 'debugging',
	'indonesia', 'jakarta', 'surabaya', 'bandung', 'yogyakarta', 'semarang'
]
const hangmanStages = ['😀','😐','😟','😰','😱','💀']

// ── Trivia ──
const triviaCategories = {
	general: 9, books: 10, film: 11, music: 12, tv: 14, games: 15, science: 17, geography: 22, history: 23, sports: 21
}

const pick = arr => arr[Math.floor(Math.random() * arr.length)]

export const commands = {
	'8ball': async m => {
		const { command, sender, db } = m
		if (!command.text) {
			await m.reply(`🔮 *8-Ball*\n\nFormat: ${command.prefix}8ball <pertanyaan>\nContoh: ${command.prefix}8ball Apa saya akan kaya?`)
			return
		}
		const answer = pick(ballResponses)
		const user = db.getUser(sender)
		const xpResult = addGameXp(user, GAME_XP.play)
		await db.save()
		await m.reply([
			'🔮 *Magic 8-Ball*',
			'',
			`❓ ${command.text}`,
			'',
			answer,
			`🎁 +${GAME_XP.play} XP`
		].join('\n'))
	},

	tictactoe: async m => {
		const { jid, sender, db, user } = m
		if (hasSession(jid)) {
			await m.reply('⏳ Masih ada game berjalan. Selesaikan dulu.')
			return
		}
		const board = tttBoard()
		await m.reply([
			'❌⭕ *Tic Tac Toe*',
			'',
			'Kamu: ❌ | Bot: ⭕',
			'',
			tttRender(board),
			'',
			'Ketik nomor 1-9 untuk menaruh ❌',
			'⏰ Waktu 30 detik per giliran'
		].join('\n'))
		createSession(jid, { type: 'tictactoe', board, sender, turn: 'X' }, 120000)
	},

	ttt: async m => await m.commands.tictactoe(m),

	hangman: async m => {
		const { jid, sender, db, user } = m
		if (hasSession(jid)) {
			await m.reply('⏳ Masih ada game berjalan.')
			return
		}
		const word = pick(hangmanWords)
		const guessed = new Set()
		const masked = () => word.split('').map(c => guessed.has(c) ? c : '_').join(' ')
		await m.reply([
			'💀 *Hangman*',
			'',
			`Kata: ${masked()}`,
			`Huruf: ${word.length} huruf`,
			`Tebakan salah: 0/6 ${hangmanStages[0]}`,
			'',
			'Ketik satu huruf untuk menebak!',
			'⏰ Waktu 60 detik'
		].join('\n'))
		createSession(jid, { type: 'hangman', word, guessed, wrong: 0, sender }, 60000)
	},

	trivia: async m => {
		const { jid, sender, db, user, command } = m
		if (hasSession(jid)) {
			await m.reply('⏳ Masih ada game berjalan.')
			return
		}
		const cat = command.args[0]?.toLowerCase() || 'general'
		const catId = triviaCategories[cat] || 9
		await m.reply('❓ Ambil trivia...')
		try {
			const res = await fetch(`https://opentdb.com/api.php?amount=1&type=multiple&category=${catId}`)
			const data = await res.json()
			const q = data.results?.[0]
			if (!q) {
				await m.reply('❌ Trivia tidak tersedia.')
				return
			}
			const decode = s => s.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
			const answers = [q.correct_answer, ...q.incorrect_answers].sort(() => Math.random() - 0.5)
			const correctIdx = answers.indexOf(q.correct_answer)
			const options = answers.map((a, i) => `${String.fromCharCode(65 + i)}. ${decode(a)}`).join('\n')

			await m.reply([
				'❓ *Trivia*',
				'',
				decode(q.question),
				'',
				options,
				'',
				'Ketik A/B/C/D untuk jawab!',
				'⏰ Waktu 30 detik'
			].join('\n'))
			createSession(jid, {
				type: 'trivia',
				answer: String.fromCharCode(65 + correctIdx).toLowerCase(),
				sender
			})
		} catch (error) {
			await m.reply(`Trivia gagal: ${error.message || error}`)
		}
	},

	// Check game answers for non-command messages (tictactoe, hangman, trivia)
	_checkGame: async m => {
		const { jid, sender, db, text } = m
		const session = getSession(jid)
		if (!session || session.sender !== sender) return false

		// Trivia answer
		if (session.type === 'trivia') {
			const answer = text.toLowerCase().trim()
			if (!['a', 'b', 'c', 'd'].includes(answer)) return false
			deleteSession(jid)
			const user = db.getUser(sender)
			if (answer === session.answer) {
				const xpResult = addGameXp(user, GAME_XP.win)
				await db.save()
				const lines = [`✅ Benar! Jawaban: ${session.answer.toUpperCase()}`, `🎁 +${GAME_XP.win} XP`]
				if (xpResult.leveledUp) lines.push('', `🏆 *Level Up!* Level ${xpResult.level}`)
				await m.reply(lines.join('\n'))
			} else {
				const xpResult = addGameXp(user, GAME_XP.lose)
				await db.save()
				await m.reply(`❌ Salah! Jawaban: ${session.answer.toUpperCase()}\n🎁 +${GAME_XP.lose} XP`)
			}
			return true
		}

		// Hangman guess
		if (session.type === 'hangman') {
			const letter = text.toLowerCase().trim()
			if (letter.length !== 1 || !/[a-z]/.test(letter)) return false

			if (session.word.includes(letter)) {
				session.guessed.add(letter)
			} else {
				session.wrong++
			}

			const masked = session.word.split('').map(c => session.guessed.has(c) ? c : '_').join(' ')
			const won = !masked.includes('_')
			const dead = session.wrong >= 6

			if (won || dead) {
				deleteSession(jid)
				const user = db.getUser(sender)
				if (won) {
					const xpResult = addGameXp(user, GAME_XP.win)
					await db.save()
					await m.reply([
						'✅ *Kamu menang!* 🎉',
						`Kata: *${session.word}*`,
						`🎁 +${GAME_XP.win} XP`
					].join('\n'))
				} else {
					const xpResult = addGameXp(user, GAME_XP.lose)
					await db.save()
					await m.reply([
						'💀 *Kamu kalah!*',
						`Kata: *${session.word}*`,
						`${hangmanStages[5]} Salah: ${session.wrong}/6`,
						`🎁 +${GAME_XP.lose} XP`
					].join('\n'))
				}
				return true
			}

			// Update session
			await m.reply([
				`${hangmanStages[session.wrong]} *Hangman*`,
				'',
				`Kata: ${masked}`,
				`Salah: ${session.wrong}/6`,
				`Tebakan: ${[...session.guessed].join(', ') || '-'}`,
				'',
				'Ketik satu huruf lagi!'
			].join('\n'))
			return true
		}

		// TicTacToe move
		if (session.type === 'tictactoe') {
			const pos = Number(text) - 1
			if (isNaN(pos) || pos < 0 || pos > 8 || session.board[pos] !== '⬜') return false

			// Player move
			session.board[pos] = 'X'
			if (tttCheck(session.board, 'X')) {
				deleteSession(jid)
				const user = db.getUser(sender)
				const xpResult = addGameXp(user, GAME_XP.win)
				await db.save()
				await m.reply([
					'❌⭕ *Tic Tac Toe*',
					'',
					tttRender(session.board),
					'',
					'✅ Kamu menang! 🎉',
					`🎁 +${GAME_XP.win} XP`
				].join('\n'))
				return true
			}

			// Check draw
			if (!session.board.includes('⬜')) {
				deleteSession(jid)
				const user = db.getUser(sender)
				const xpResult = addGameXp(user, GAME_XP.draw)
				await db.save()
				await m.reply([
					'❌⭕ *Tic Tac Toe*',
					'',
					tttRender(session.board),
					'',
					'🤝 Seri!',
					`🎁 +${GAME_XP.draw} XP`
				].join('\n'))
				return true
			}

			// Bot move
			const aiPos = tttAiMove(session.board)
			if (aiPos >= 0) session.board[aiPos] = 'O'

			if (tttCheck(session.board, 'O')) {
				deleteSession(jid)
				const user = db.getUser(sender)
				const xpResult = addGameXp(user, GAME_XP.lose)
				await db.save()
				await m.reply([
					'❌⭕ *Tic Tac Toe*',
					'',
					tttRender(session.board),
					'',
					'❌ Bot menang!',
					`🎁 +${GAME_XP.lose} XP`
				].join('\n'))
				return true
			}

			if (!session.board.includes('⬜')) {
				deleteSession(jid)
				const user = db.getUser(sender)
				const xpResult = addGameXp(user, GAME_XP.draw)
				await db.save()
				await m.reply([
					'❌⭕ *Tic Tac Toe*',
					'',
					tttRender(session.board),
					'',
					'🤝 Seri!',
					`🎁 +${GAME_XP.draw} XP`
				].join('\n'))
				return true
			}

			await m.reply([
				'❌⭕ *Tic Tac Toe*',
				'',
				tttRender(session.board),
				'',
				'Giliranmu! Ketik 1-9'
			].join('\n'))
			return true
		}

		return false
	}
}
