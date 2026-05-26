// Advanced Game Engines — Wordle, Sudoku, Typing Test, Minesweeper, 
// Math Challenge, Guess Number, RPS Tournament, Word Chain, Memory, Quiz

import { hasSession, createSession, getSession, deleteSession, addGameXp } from './game.js'

const GAME_XP = { win: 25, draw: 5, lose: 3, play: 5 }

// ── Wordle ──
const WORDLE_WORDS = [
	'about','above','abuse','actor','acute','admit','adopt','adult','after','again',
	'agent','agree','ahead','alarm','album','alert','alien','align','alive','allow',
	'alone','along','alter','among','angel','anger','angle','angry','apart','apple',
	'apply','arena','argue','arise','armor','array','aside','asset','avoid','award',
	'aware','badly','baker','basic','basis','beach','begin','being','below','bench',
	'birth','black','blade','blame','blank','blast','blaze','bleed','blend','bless',
	'blind','block','blood','bloom','blown','board','bonus','boost','bound','brain',
	'brand','brave','bread','break','breed','brick','brief','bring','broad','broke',
	'brown','brush','build','bunch','burst','buyer','cabin','candy','carry','catch',
	'cause','chain','chair','charm','chart','chase','cheap','check','chest','chief',
	'child','china','chunk','civil','claim','class','clean','clear','climb','clock',
	'clone','close','cloud','coach','coast','color','comet','count','court','cover',
	'crack','craft','crash','crazy','cream','crime','cross','crowd','crown','crush',
	'curve','cycle','daily','dance','death','debut','delay','depth','devil','dirty',
	'doubt','draft','drain','drama','drawn','dream','dress','drift','drink','drive',
	'drop','dying','eager','early','earth','eight','elect','elite','email','empty',
	'enemy','enjoy','enter','entry','equal','error','essay','event','every','exact',
	'exist','extra','faith','false','fancy','fatal','fault','feast','fiber','field',
	'fight','final','first','fixed','flame','flash','fleet','flesh','float','flood',
	'floor','flour','fluid','focus','force','forge','forth','forum','found','frame',
	'frank','fraud','fresh','front','fruit','fully','funny','ghost','giant','given',
	'glass','globe','glory','going','grace','grade','grain','grand','grant','graph',
	'grasp','grass','grave','great','green','greet','grief','grill','grind','gross',
	'group','grove','grown','guard','guess','guest','guide','guilt','happy','harsh',
	'heart','heavy','hence','horse','hotel','house','human','humor','ideal','image',
	'imply','index','inner','input','issue','ivory','joint','judge','juice','knife',
	'knock','known','label','labor','large','laser','later','laugh','layer','learn',
	'lease','leave','legal','level','light','limit','linen','liver','local','logic',
	'loose','lover','lower','lucky','lunch','magic','major','maker','manor','maple',
	'march','match','mayor','media','mercy','metal','meter','minor','minus','mixed',
	'model','money','month','moral','motor','mount','mouse','mouth','movie','music',
	'naked','nerve','never','night','noble','noise','north','noted','novel','nurse',
	'ocean','offer','often','olive','onset','opera','orbit','order','other','outer',
	'owner','oxide','paint','panel','panic','paper','party','pasta','patch','pause',
	'peace','pearl','penny','phase','phone','photo','piano','piece','pilot','pitch',
	'pixel','place','plain','plane','plant','plate','plaza','plead','pluck','point',
	'polar','pound','power','press','price','pride','prime','prince','print','prior',
	'prize','probe','proof','proud','prove','psalm','pulse','punch','pupil','queen',
	'query','quest','queue','quick','quiet','quite','quota','quote','radar','radio',
	'raise','rally','range','rapid','ratio','reach','ready','realm','rebel','reign',
	'relax','reply','rider','ridge','rifle','right','rigid','rival','river','robot',
	'rocky','roman','rough','round','route','royal','rugby','ruler','rural','saint',
	'sauce','scale','scene','scope','score','sense','serve','seven','shade','shake',
	'shall','shame','shape','share','sharp','sheet','shelf','shell','shift','shirt',
	'shock','shoot','shore','short','shout','sight','since','sixth','sixty','skill',
	'skull','slave','sleep','slice','slide','slope','smart','smell','smile','smoke',
	'snack','snake','solar','solid','solve','sorry','sound','south','space','spare',
	'speak','speed','spend','spice','spine','spite','split','spoke','sport','spray',
	'squad','stack','staff','stage','stain','stake','stale','stall','stamp','stand',
	'stare','start','state','stays','steal','steam','steel','steep','steer','stern',
	'stick','stiff','still','stock','stone','stood','store','storm','story','stove',
	'strip','stuck','study','stuff','style','sugar','suite','super','surge','swamp',
	'swear','sweet','swept','swing','sword','table','taste','teach','teeth','tempo',
	'thank','theme','thick','thing','think','third','those','three','throw','thumb',
	'tiger','tight','timer','title','today','token','topic','total','touch','tough',
	'towel','tower','toxic','trace','track','trade','trail','train','trait','treat',
	'trend','trial','tribe','trick','tried','troop','truck','truly','trump','trunk',
	'trust','truth','tumor','twice','twist','ultra','uncle','under','union','unity',
	'until','upper','upset','urban','usage','usual','valid','value','valve','vault',
	'verse','video','vigor','viral','virus','visit','vital','vivid','vocal','voice',
	'voter','wagon','waste','watch','water','weary','weave','weird','whale','wheat',
	'wheel','where','which','while','white','whole','whose','widow','woman','world',
	'worry','worse','worst','worth','would','wound','wrath','write','wrong','wrote',
	'yacht','yield','young','youth'
]

const wordleCheck = (word, guess) => {
	const result = Array(5).fill('⬛')
	const remaining = [...word]
	// First pass: correct positions (green)
	for (let i = 0; i < 5; i++) {
		if (guess[i] === word[i]) {
			result[i] = '🟩'
			remaining[i] = null
		}
	}
	// Second pass: wrong position (yellow)
	for (let i = 0; i < 5; i++) {
		if (result[i] !== '🟩') {
			const idx = remaining.indexOf(guess[i])
			if (idx >= 0) {
				result[i] = '🟨'
				remaining[idx] = null
			}
		}
	}
	return result.join('')
}

// ── Sudoku ──
const sudokuGenerate = (difficulty = 'easy') => {
	const board = Array.from({ length: 9 }, () => Array(9).fill(0))
	const fills = difficulty === 'easy' ? 35 : difficulty === 'medium' ? 28 : 22
	
	const isValid = (b, r, c, n) => {
		for (let i = 0; i < 9; i++) { if (b[r][i] === n || b[i][c] === n) return false }
		const br = Math.floor(r / 3) * 3, bc = Math.floor(c / 3) * 3
		for (let i = br; i < br + 3; i++) for (let j = bc; j < bc + 3; j++) if (b[i][j] === n) return false
		return true
	}
	const solve = b => {
		for (let r = 0; r < 9; r++) for (let c = 0; c < 9; c++) {
			if (b[r][c] === 0) {
				const nums = [1,2,3,4,5,6,7,8,9].sort(() => Math.random() - 0.5)
				for (const n of nums) {
					if (isValid(b, r, c, n)) { b[r][c] = n; if (solve(b)) return true; b[r][c] = 0 }
				}
				return false
			}
		}
		return true
	}
	solve(board)
	const solution = board.map(r => [...r])
	// Remove cells
	const cells = []
	for (let r = 0; r < 9; r++) for (let c = 0; c < 9; c++) cells.push([r, c])
	cells.sort(() => Math.random() - 0.5)
	for (let i = 0; i < 81 - fills; i++) { const [r, c] = cells[i]; board[r][c] = 0 }
	return { board, solution }
}

const sudokuRender = board => {
	const lines = []
	for (let r = 0; r < 9; r++) {
		const row = board[r].map(c => c === 0 ? '·' : c).join(' ')
		const sep = r % 3 === 2 && r < 8 ? '─'.repeat(17) : null
		lines.push(row.replace(/(.{5}) (.{5}) (.{5})/, '$1 │ $2 │ $3'))
		if (sep) lines.push(sep)
	}
	return lines.join('\n')
}

// ── Typing Test ──
const typingSentences = [
	'The quick brown fox jumps over the lazy dog',
	'Programming is the art of telling a computer what to do',
	'Every great developer you know got there by solving problems',
	'The best error message is the one that never shows up',
	'Code is like humor when you have to explain it its bad',
	'Simplicity is the soul of efficiency',
	'First solve the problem then write the code',
	'Talk is cheap show me the code',
	'Any fool can write code that a computer can understand',
	'Experience is the name everyone gives to their mistakes',
	'The most disastrous thing that you can ever learn is your first programming language',
	'Software and cathedrals are much the same first we build them then we pray',
	'Debugging is twice as hard as writing the code in the first place',
	'Java is to JavaScript what car is to carpet',
	'Sometimes it pays to stay in bed on Monday rather than spending the rest of the week debugging',
	'In order to be irreplaceable one must always be different',
	'The function of good software is to make the complex appear to be simple',
	'One of the best programming skills you can have is knowing when to walk away',
	'Computers are fast programmers keep it slow',
	'A good programmer is someone who always looks both ways before crossing a one way street'
]

// ── Minesweeper ──
const minesweeperGenerate = (size = 8, mines = 10) => {
	const board = Array.from({ length: size }, () => Array(size).fill(0))
	const revealed = Array.from({ length: size }, () => Array(size).fill(false))
	const flagged = Array.from({ length: size }, () => Array(size).fill(false))
	
	// Place mines
	let placed = 0
	while (placed < mines) {
		const r = Math.floor(Math.random() * size), c = Math.floor(Math.random() * size)
		if (board[r][c] !== -1) { board[r][c] = -1; placed++ }
	}
	// Calculate numbers
	for (let r = 0; r < size; r++) for (let c = 0; c < size; c++) {
		if (board[r][c] === -1) continue
		let count = 0
		for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) {
			const nr = r + dr, nc = c + dc
			if (nr >= 0 && nr < size && nc >= 0 && nc < size && board[nr][nc] === -1) count++
		}
		board[r][c] = count
	}
	return { board, revealed, flagged, size, mines }
}

const minesweeperReveal = (game, r, c) => {
	const { board, revealed, size } = game
	if (r < 0 || r >= size || c < 0 || c >= size || revealed[r][c]) return board[r]?.[c] === -1
	revealed[r][c] = true
	if (board[r][c] === 0) {
		for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) {
			minesweeperReveal(game, r + dr, c + dc)
		}
	}
	return board[r][c] === -1
}

const minesweeperRender = game => {
	const { board, revealed, flagged, size } = game
	const symbols = { '-1': '💣', '0': '⬜', '1': '1️⃣', '2': '2️⃣', '3': '3️⃣', '4': '4️⃣', '5': '5️⃣', '6': '6️⃣', '7': '7️⃣', '8': '8️⃣' }
	const lines = ['  ' + Array.from({ length: size }, (_, i) => i % 10).join('')]
	for (let r = 0; r < size; r++) {
		const row = []
		for (let c = 0; c < size; c++) {
			if (flagged[r][c]) row.push('🚩')
			else if (!revealed[r][c]) row.push('▪️')
			else row.push(symbols[String(board[r][c])] || '⬜')
		}
		lines.push(`${r} ${row.join('')}`)
	}
	return lines.join('\n')
}

// ── Math Challenge ──
const mathGenerate = (level = 1) => {
	const ops = ['+', '-', '×']
	if (level >= 2) ops.push('÷')
	if (level >= 3) ops.push('^')
	const op = ops[Math.floor(Math.random() * ops.length)]
	let a, b, answer
	const max = 10 + level * 10
	switch (op) {
		case '+': a = Math.floor(Math.random() * max) + 1; b = Math.floor(Math.random() * max) + 1; answer = a + b; break
		case '-': a = Math.floor(Math.random() * max) + 1; b = Math.floor(Math.random() * Math.min(a, max)) + 1; answer = a - b; break
		case '×': a = Math.floor(Math.random() * (max / 2)) + 1; b = Math.floor(Math.random() * (max / 2)) + 1; answer = a * b; break
		case '÷': b = Math.floor(Math.random() * 12) + 1; answer = Math.floor(Math.random() * 12) + 1; a = b * answer; break
		case '^': a = Math.floor(Math.random() * 10) + 1; b = 2; answer = a * a; break
	}
	return { question: `${a} ${op} ${b}`, answer, level }
}

// ── Guess Number ──
const guessNumberGenerate = (max = 100) => ({
	number: Math.floor(Math.random() * max) + 1,
	max,
	attempts: 0,
	maxAttempts: Math.ceil(Math.log2(max)) + 2
})

// ── Word Chain ──
const wordChainWords = [
	'apel','bola','cacing','dapur','elang','fajar','gajah','harimau','ikan','jamur',
	'kucing','lebah','mangga','naga','orang','payung','queen','roti','sapi','taksi',
	'ular','vas','wajah','xenon','yang','zebra','abang','batu','cinta','daun',
	'emas','fokus','guru','hujan','indah','jalan','kuda','laut','mata','nasi',
	'obat','pohon','quran','rumah','sawah','tangan','udara','vila','warna','xilofon',
	'yakin','zaman','angin','beras','cokelat','domba','enak','flora','gunung','hewan',
	'indonesia','jeruk','kambing','lilin','mentega','nenek','olahraga','panda','rambut','sate',
	'telur','universitas','vitamin','wayang','xerxes','yoghurt','zaitun'
]

// ── Memory Game ──
const memoryEmojis = ['🍎','🍊','🍋','🍇','🍉','🍓','🍑','🍒','🥝','🥥','🍍','🥭','🍌','🫐','🍈','🥑']
const memoryGenerate = (pairs = 6) => {
	const selected = memoryEmojis.slice(0, pairs)
	const cards = [...selected, ...selected].sort(() => Math.random() - 0.5)
	const revealed = Array(cards.length).fill(false)
	return { cards, revealed, pairs, matched: 0, attempts: 0 }
}
const memoryRender = game => {
	const { cards, revealed } = game
	const rows = []
	for (let i = 0; i < cards.length; i++) {
		rows.push(revealed[i] ? cards[i] : '🃏')
	}
	const size = Math.ceil(Math.sqrt(cards.length))
	const grid = []
	for (let i = 0; i < cards.length; i += size) {
		grid.push(rows.slice(i, i + size).join(' '))
	}
	return grid.join('\n')
}

// ── RPS Tournament ──
const rpsTournament = () => {
	const choices = ['🪨', '📄', '✂️']
	const results = []
	let playerWins = 0
	let botWins = 0
	const target = 3
	return { choices, results, playerWins, botWins, target, round: 1 }
}

// ── Color Guess ──
const colorGenerate = () => {
	const r = Math.floor(Math.random() * 256)
	const g = Math.floor(Math.random() * 256)
	const b = Math.floor(Math.random() * 256)
	const hex = '#' + [r, g, b].map(c => c.toString(16).padStart(2, '0')).join('')
	return { r, g, b, hex }
}

// ── Flag Quiz ──
const flagData = [
	{ country: 'Indonesia', hint: 'Merah putih', code: 'ID' },
	{ country: 'Jepang', hint: 'Lingkaran merah di putih', code: 'JP' },
	{ country: 'Korea Selatan', hint: 'Taegeuk di tengah', code: 'KR' },
	{ country: 'Amerika Serikat', hint: 'Stars and stripes', code: 'US' },
	{ country: 'Inggris', hint: 'Union Jack', code: 'GB' },
	{ country: 'Prancis', hint: 'Bleu blanc rouge vertikal', code: 'FR' },
	{ country: 'Jerman', hint: 'Schwarz rot gold horizontal', code: 'DE' },
	{ country: 'Italia', hint: 'Verde bianco rosso vertikal', code: 'IT' },
	{ country: 'Brasil', hint: 'Rhombus hijau di kuning', code: 'BR' },
	{ country: 'Australia', hint: 'Union Jack + bintang selatan', code: 'AU' },
	{ country: 'Kanada', hint: 'Maple leaf di merah putih', code: 'CA' },
	{ country: 'China', hint: 'Bintang kuning di merah', code: 'CN' },
	{ country: 'India', hint: 'Ashoka Chakra di tengah', code: 'IN' },
	{ country: 'Rusia', hint: 'Putih biru merah horizontal', code: 'RU' },
	{ country: 'Arab Saudi', hint: 'Shahada di hijau', code: 'SA' },
	{ country: 'Turki', hint: 'Bulan sabit di merah', code: 'TR' },
	{ country: 'Thailand', hint: 'Merah putih biru putih merah', code: 'TH' },
	{ country: 'Malaysia', hint: 'Jalur emas + bulan sabit', code: 'MY' },
	{ country: 'Filipina', hint: 'Matahari + bintang', code: 'PH' },
	{ country: 'Singapura', hint: 'Bulan sabit + bintang di merah putih', code: 'SG' },
	{ country: 'Meksiko', hint: 'Eagle di hijau putih merah', code: 'MX' },
	{ country: 'Argentina', hint: 'Matahari di biru putih biru', code: 'AR' },
	{ country: 'Spanyol', hint: 'Merah kuning merah + coat of arms', code: 'ES' },
	{ country: 'Portugal', hint: 'Sphere armillary di hijau merah', code: 'PT' },
	{ country: 'Belanda', hint: 'Merah putih biru horizontal', code: 'NL' },
	{ country: 'Swiss', hint: 'Cross putih di merah', code: 'CH' },
	{ country: 'Swedia', hint: 'Cross kuning di biru', code: 'SE' },
	{ country: 'Norwegia', hint: 'Cross biru di merah putih', code: 'NO' },
	{ country: 'Finlandia', hint: 'Cross biru di putih', code: 'FI' },
	{ country: 'Denmark', hint: 'Cross putih di merah', code: 'DK' },
	{ country: 'Polandia', hint: 'Putih merah horizontal', code: 'PL' },
	{ country: 'Ukraina', hint: 'Biru kuning horizontal', code: 'UA' },
	{ country: 'Vietnam', hint: 'Bintang kuning di merah', code: 'VN' },
	{ country: 'Myanmar', hint: 'Kuning hijau merah + bintang', code: 'MM' },
	{ country: 'Kamboja', hint: 'Angkor Wat di biru merah', code: 'KH' },
	{ country: 'Pakistan', hint: 'Bulan sabit + bintang di hijau putih', code: 'PK' },
	{ country: 'Bangladesh', hint: 'Lingkaran merah di hijau', code: 'BD' },
	{ country: 'Nigeria', hint: 'Hijau putih hijau vertikal', code: 'NG' },
	{ country: 'Afrika Selatan', hint: 'Y-shape berwarna-warni', code: 'ZA' },
	{ country: 'Mesir', hint: 'Eagle di merah putih hitam', code: 'EG' },
	{ country: 'Kuba', hint: 'Triangle + bintang di merah putih biru', code: 'CU' },
	{ country: 'Kolombia', hint: 'Kuning biru merah horizontal', code: 'CO' },
	{ country: 'Peru', hint: 'Merah putih merah vertikal', code: 'PE' },
	{ country: 'Chile', hint: 'Bintang di biru putih merah', code: 'CL' },
	{ country: 'Selandia Baru', hint: 'Union Jack + bintang selatan', code: 'NZ' },
	{ country: 'Irlandia', hint: 'Hijau putih oranye vertikal', code: 'IE' },
	{ country: 'Austria', hint: 'Merah putih merah horizontal', code: 'AT' },
	{ country: 'Belgia', hint: 'Hitam kuning merah vertikal', code: 'BE' },
	{ country: 'Yunani', hint: 'Cross + garis biru putih', code: 'GR' },
	{ country: 'Rumania', hint: 'Biru kuning merah vertikal', code: 'RO' },
]

const pick = arr => arr[Math.floor(Math.random() * arr.length)]

export const commands = {
	// ── Wordle ──
	wordle: async m => {
		const { jid, sender, db } = m
		if (hasSession(jid)) { await m.reply('⏳ Masih ada game berjalan.'); return }
		const word = pick(WORDLE_WORDS)
		await m.reply([
			'🟩 *Wordle*',
			'',
			'Tebak kata 5 huruf dalam 6 percobaan!',
			'🟩 = Benar posisi | 🟨 = Ada tapi salah posisi | ⬛ = Tidak ada',
			'',
			'Ketik kata 5 huruf untuk menebak!',
			'⏰ Waktu 60 detik per tebakan'
		].join('\n'))
		createSession(jid, { type: 'wordle', word, guesses: [], sender, maxGuesses: 6 })
	},

	// ── Sudoku ──
	sudoku: async m => {
		const { jid, sender, db, command } = m
		if (hasSession(jid)) { await m.reply('⏳ Masih ada game berjalan.'); return }
		const diff = command.args[0] || 'easy'
		const { board, solution } = sudokuGenerate(diff)
		await m.reply([
			'🔢 *Sudoku*',
			'',
			`Difficulty: ${diff}`,
			sudokuRender(board),
			'',
			'Ketik posisi dan angka: `row col num`',
			'Contoh: `0 0 5` untuk isi baris 0 kolom 0 dengan 5',
			'Ketik `sudoku check` untuk cek jawaban',
			'⏰ Waktu 5 menit'
		].join('\n'))
		createSession(jid, { type: 'sudoku', board, solution, sender, diff }, 300000)
	},

	// ── Typing Test ──
	typing: async m => {
		const { jid, sender } = m
		if (hasSession(jid)) { await m.reply('⏳ Masih ada game berjalan.'); return }
		const sentence = pick(typingSentences)
		await m.reply([
			'⌨️ *Typing Test*',
			'',
			'Ketik kalimat ini secepat mungkin:',
			'',
			`📝 "${sentence}"`,
			'',
			'Waktu dimulai sekarang! Ketik ulang kalimat di atas.',
			'⏰ Waktu 60 detik'
		].join('\n'))
		createSession(jid, { type: 'typing', sentence, startTime: Date.now(), sender }, 60000)
	},

	// ── Minesweeper ──
	minesweeper: async m => {
		const { jid, sender } = m
		if (hasSession(jid)) { await m.reply('⏳ Masih ada game berjalan.'); return }
		const game = minesweeperGenerate(8, 10)
		await m.reply([
			'💣 *Minesweeper*',
			'',
			minesweeperRender(game),
			'',
			'Ketik `row col` untuk reveal (contoh: `3 4`)',
			'Ketik `f row col` untuk flag (contoh: `f 3 4`)',
			`💣 10 mine di papan 8×8`,
			'⏰ Waktu 5 menit'
		].join('\n'))
		createSession(jid, { type: 'minesweeper', game, sender }, 300000)
	},

	mine: async m => await commands.minesweeper(m),

	// ── Math Challenge ──
	math: async m => {
		const { jid, sender, db, command } = m
		if (hasSession(jid)) { await m.reply('⏳ Masih ada game berjalan.'); return }
		const level = Number(command.args[0]) || 1
		const challenge = mathGenerate(Math.min(level, 5))
		await m.reply([
			'🧮 *Math Challenge*',
			'',
			`Level ${challenge.level}: Berapa ${challenge.question}?`,
			'',
			'Ketik jawaban angkanya!',
			'⏰ Waktu 30 detik'
		].join('\n'))
		createSession(jid, { type: 'math', answer: String(challenge.answer), level: challenge.level, sender, streak: 0 })
	},

	// ── Guess Number ──
	guessnum: async m => {
		const { jid, sender } = m
		if (hasSession(jid)) { await m.reply('⏳ Masih ada game berjalan.'); return }
		const game = guessNumberGenerate(100)
		await m.reply([
			'🔢 *Guess the Number*',
			'',
			`Saya pikir angka 1-${game.max}. Tebak!`,
			`Maksimal ${game.maxAttempts} percobaan`,
			'',
			'Ketik angka untuk menebak!',
			'⏰ Waktu 60 detik'
		].join('\n'))
		createSession(jid, { type: 'guessnum', ...game, sender }, 60000)
	},

	// ── Word Chain ──
	wordchain: async m => {
		const { jid, sender } = m
		if (hasSession(jid)) { await m.reply('⏳ Masih ada game berjalan.'); return }
		const start = pick(wordChainWords)
		await m.reply([
			'🔗 *Word Chain* (Sambung Kata)',
			'',
			`Kata awal: *${start}*`,
			`Sambung dengan kata yang dimulai huruf terakhir: *${start.slice(-1).toUpperCase()}*`,
			'',
			'Ketik kata yang dimulai huruf terakhir kata sebelumnya!',
			'⏰ Waktu 30 detik per giliran'
		].join('\n'))
		createSession(jid, { type: 'wordchain', lastWord: start, sender, chain: [start], score: 0 })
	},

	chain: async m => await commands.wordchain(m),

	// ── Memory Game ──
	memory: async m => {
		const { jid, sender } = m
		if (hasSession(jid)) { await m.reply('⏳ Masih ada game berjalan.'); return }
		const game = memoryGenerate(6)
		// Reveal all briefly then hide
		await m.reply([
			'🧠 *Memory Game*',
			'',
			'Hafalkan posisi kartu ini!',
			memoryRender({ ...game, revealed: Array(game.cards.length).fill(true) }),
			'',
			'Kartu akan ditutup. Ketik 2 posisi untuk flip!',
			'Contoh: `0 1` untuk flip kartu posisi 0 dan 1',
			'⏰ Waktu 2 menit'
		].join('\n'))
		// Hide all after sending
		game.revealed = Array(game.cards.length).fill(false)
		createSession(jid, { type: 'memory', game, sender, firstPick: null }, 120000)
	},

	// ── RPS Tournament ──
	rpstournament: async m => {
		const { jid, sender } = m
		if (hasSession(jid)) { await m.reply('⏳ Masih ada game berjalan.'); return }
		const game = rpsTournament()
		await m.reply([
			'🏆 *RPS Tournament* (Best of 5)',
			'',
			'Pertama mencapai 3 menang, jadi juara!',
			'Ketik: 🪨 (batu), 📄 (kertas), atau ✂️ (gunting)',
			'',
			`Round ${game.round} — Pilih!`
		].join('\n'))
		createSession(jid, { type: 'rpstournament', ...game, sender })
	},

	rpst: async m => await commands.rpstournament(m),

	// ── Color Guess ──
	colorguess: async m => {
		const { jid, sender } = m
		if (hasSession(jid)) { await m.reply('⏳ Masih ada game berjalan.'); return }
		const color = colorGenerate()
		await m.reply([
			'🎨 *Color Guess*',
			'',
			`Tebak warna hex ini: *${color.hex}*`,
			'Ketik komponen RGB (contoh: `128 64 200`)',
			'',
			'Semakin dekat, semakin banyak XP!',
			'⏰ Waktu 30 detik'
		].join('\n'))
		createSession(jid, { type: 'colorguess', ...color, sender })
	},

	cg: async m => await commands.colorguess(m),

	// ── Flag Quiz ──
	flagquiz: async m => {
		const { jid, sender } = m
		if (hasSession(jid)) { await m.reply('⏳ Masih ada game berjalan.'); return }
		const flag = pick(flagData)
		await m.reply([
			'🏳️ *Flag Quiz*',
			'',
			`Hint: ${flag.hint}`,
			`Kode: ${flag.code}`,
			'',
			'Tebak negara apa ini!',
			'⏰ Waktu 30 detik'
		].join('\n'))
		createSession(jid, { type: 'flagquiz', answer: flag.country.toLowerCase(), hint: flag.hint, sender })
	},

	flag: async m => await commands.flagquiz(m),

	// ── Check advanced game answers ──
_checkAdvanced: async m => {
		const { jid, sender, db, text } = m
		const session = getSession(jid)
		if (!session || session.sender !== sender) return false

		// Wordle guess
		if (session.type === 'wordle') {
			const guess = text.toLowerCase().trim()
			if (guess.length !== 5 || !/^[a-z]{5}$/.test(guess)) return false
			const result = wordleCheck(session.word, guess)
			session.guesses.push({ guess, result })
			const won = guess === session.word
			const lost = session.guesses.length >= session.maxGuesses
			if (won || lost) {
				deleteSession(jid)
				const user = db.getUser(sender)
				if (won) {
					addGameXp(user, GAME_XP.win)
					await db.save()
					await m.reply([
						'🟩 *Wordle — Kamu menang!* 🎉',
						'',
						session.guesses.map(g => `${g.result} ${g.guess}`).join('\n'),
						`🎁 +${GAME_XP.win} XP`
					].join('\n'))
				} else {
					addGameXp(user, GAME_XP.lose)
					await db.save()
					await m.reply([
						'⬛ *Wordle — Kamu kalah!*',
						'',
						session.guesses.map(g => `${g.result} ${g.guess}`).join('\n'),
						`Jawaban: *${session.word}*`,
						`🎁 +${GAME_XP.lose} XP`
					].join('\n'))
				}
				return true
			}
			await m.reply([
				`🟩 *Wordle* (${session.guesses.length}/${session.maxGuesses})`,
				'',
				session.guesses.map(g => `${g.result} ${g.guess}`).join('\n'),
				'',
				'Ketik kata 5 huruf lagi!'
			].join('\n'))
			return true
		}

		// Sudoku input
		if (session.type === 'sudoku') {
			const input = text.toLowerCase().trim()
			if (input === 'sudoku check' || input === 'check') {
				const correct = session.board.every((row, r) => row.every((cell, c) => cell === session.solution[r][c]))
				if (correct) {
					deleteSession(jid)
					const user = db.getUser(sender)
					addGameXp(user, GAME_XP.win * 2)
					await db.save()
					await m.reply(`✅ *Sudoku selesai!* 🎉\n🎁 +${GAME_XP.win * 2} XP`)
				} else {
					await m.reply('❌ Belum benar. Lanjutkan!')
				}
				return true
			}
			const parts = input.split(/\s+/)
			if (parts.length === 3) {
				const [r, c, num] = parts.map(Number)
				if (!isNaN(r) && !isNaN(c) && !isNaN(num) && r >= 0 && r < 9 && c >= 0 && c < 9 && num >= 1 && num <= 9) {
					session.board[r][c] = num
					await m.reply([
						'🔢 *Sudoku*',
						'',
						sudokuRender(session.board)
					].join('\n'))
					return true
				}
			}
			return false
		}

		// Typing test
		if (session.type === 'typing') {
			const typed = text.trim()
			const elapsed = (Date.now() - session.startTime) / 1000
			const original = session.sentence
			// Calculate accuracy
			let correct = 0
			const maxLen = Math.max(typed.length, original.length)
			for (let i = 0; i < original.length; i++) { if (typed[i] === original[i]) correct++ }
			const accuracy = Math.round((correct / original.length) * 100)
			const words = typed.split(/\s+/).length
			const wpm = Math.round((words / elapsed) * 60)
			deleteSession(jid)
			const user = db.getUser(sender)
			const xpEarned = accuracy > 90 ? GAME_XP.win : accuracy > 70 ? GAME_XP.play : GAME_XP.lose
			addGameXp(user, xpEarned)
			await db.save()
			await m.reply([
				'⌨️ *Typing Test Result*',
				'',
				`⏱️ Waktu: ${elapsed.toFixed(1)}s`,
				`📊 WPM: ${wpm}`,
				`🎯 Akurasi: ${accuracy}%`,
				`📝 Kata: ${words}`,
				`🎁 +${xpEarned} XP`
			].join('\n'))
			return true
		}

		// Minesweeper input
		if (session.type === 'minesweeper') {
			const input = text.trim()
			const isFlag = input.startsWith('f ')
			const parts = input.replace(/^f\s+/, '').split(/\s+/)
			const [r, c] = parts.map(Number)
			if (isNaN(r) || isNaN(c) || r < 0 || r >= session.game.size || c < 0 || c >= session.game.size) return false

			if (isFlag) {
				session.game.flagged[r][c] = !session.game.flagged[r][c]
				await m.reply([
					'💣 *Minesweeper*',
					'',
					minesweeperRender(session.game)
				].join('\n'))
				return true
			}

			const hitMine = minesweeperReveal(session.game, r, c)
			if (hitMine) {
				// Reveal all mines
				session.game.revealed = session.game.revealed.map((row, ri) => row.map((_, ci) => session.game.board[ri][ci] === -1))
				deleteSession(jid)
				const user = db.getUser(sender)
				addGameXp(user, GAME_XP.lose)
				await db.save()
				await m.reply([
					'💣 *Boom! Kamu kena mine!*',
					'',
					minesweeperRender(session.game),
					`🎁 +${GAME_XP.lose} XP`
				].join('\n'))
				return true
			}

			// Check win
			const allRevealed = session.game.revealed.every((row, ri) => row.every((cell, ci) => cell || session.game.board[ri][ci] === -1))
			if (allRevealed) {
				deleteSession(jid)
				const user = db.getUser(sender)
				addGameXp(user, GAME_XP.win * 2)
				await db.save()
				await m.reply([
					'🎉 *Minesweeper selesai!*',
					'',
					minesweeperRender(session.game),
					`🎁 +${GAME_XP.win * 2} XP`
				].join('\n'))
				return true
			}

			await m.reply([
				'💣 *Minesweeper*',
				'',
				minesweeperRender(session.game)
			].join('\n'))
			return true
		}

		// Math challenge
		if (session.type === 'math') {
			const answer = text.trim()
			if (answer !== String(session.answer) && answer !== session.answer) return false
			deleteSession(jid)
			const user = db.getUser(sender)
			if (answer === String(session.answer)) {
				session.streak = (session.streak || 0) + 1
				const xp = GAME_XP.win + session.streak * 5
				addGameXp(user, xp)
				await db.save()
				await m.reply([
					`✅ Benar! ${session.answer}`,
					`🔥 Streak: ${session.streak}`,
					`🎁 +${xp} XP`,
					'',
					`Ketik ${m.command.prefix}math ${session.level + 1} untuk level lebih tinggi!`
				].join('\n'))
			} else {
				addGameXp(user, GAME_XP.lose)
				await db.save()
				await m.reply(`❌ Salah! Jawaban: ${session.answer}\n🎁 +${GAME_XP.lose} XP`)
			}
			return true
		}

		// Guess number
		if (session.type === 'guessnum') {
			const num = Number(text.trim())
			if (isNaN(num)) return false
			session.attempts++
			if (num === session.number) {
				deleteSession(jid)
				const user = db.getUser(sender)
				addGameXp(user, GAME_XP.win)
				await db.save()
				await m.reply([
					`✅ Benar! Angkanya ${session.number}!`,
					`📊 Percobaan: ${session.attempts}/${session.maxAttempts}`,
					`🎁 +${GAME_XP.win} XP`
				].join('\n'))
				return true
			}
			if (session.attempts >= session.maxAttempts) {
				deleteSession(jid)
				const user = db.getUser(sender)
				addGameXp(user, GAME_XP.lose)
				await db.save()
				await m.reply(`❌ Habisan percobaan! Angkanya ${session.number}\n🎁 +${GAME_XP.lose} XP`)
				return true
			}
			const hint = num > session.number ? '📉 Terlalu besar!' : '📈 Terlalu kecil!'
			await m.reply(`${hint} (Percobaan ${session.attempts}/${session.maxAttempts})`)
			return true
		}

		// Word chain
		if (session.type === 'wordchain') {
			const word = text.toLowerCase().trim()
			const lastChar = session.lastWord.slice(-1)
			if (!word.startsWith(lastChar) || word.length < 2) {
				deleteSession(jid)
				const user = db.getUser(sender)
				addGameXp(user, GAME_XP.lose)
				await db.save()
				await m.reply(`❌ Kata harus dimulai huruf "${lastChar.toUpperCase()}"!\nSkor: ${session.score} | 🎁 +${GAME_XP.lose} XP`)
				return true
			}
			session.lastWord = word
			session.chain.push(word)
			session.score++
			// Bot responds
			const botWords = wordChainWords.filter(w => w.startsWith(word.slice(-1)))
			if (botWords.length === 0) {
				deleteSession(jid)
				const user = db.getUser(sender)
				addGameXp(user, GAME_XP.win + session.score * 2)
				await db.save()
				await m.reply(`🏆 Bot menyerah! Kamu menang!\nSkor: ${session.score} | 🎁 +${GAME_XP.win + session.score * 2} XP`)
				return true
			}
			const botWord = pick(botWords)
			session.lastWord = botWord
			session.chain.push(botWord)
			await m.reply([
				'🔗 *Word Chain*',
				'',
				`Kamu: ${word}`,
				`Bot: ${botWord}`,
				`Skor: ${session.score}`,
				'',
				`Sambung dengan kata yang dimulai: *${botWord.slice(-1).toUpperCase()}*`
			].join('\n'))
			return true
		}

		// Memory game
		if (session.type === 'memory') {
			const parts = text.trim().split(/\s+/).map(Number)
			if (parts.length < 1 || parts.some(p => isNaN(p))) return false

			if (session.firstPick === null) {
				const idx = parts[0]
				if (idx < 0 || idx >= session.game.cards.length) return false
				session.firstPick = idx
				session.game.revealed[idx] = true
				session.game.attempts++
				await m.reply([
					'🧠 *Memory Game*',
					'',
					memoryRender(session.game),
					'',
					`Kartu ${idx}: ${session.game.cards[idx]}`,
					'Ketik posisi kedua untuk mencocokkan!'
				].join('\n'))
				return true
			} else {
				const idx = parts[0]
				if (idx < 0 || idx >= session.game.cards.length || idx === session.firstPick) return false
				session.game.revealed[idx] = true
				const first = session.firstPick
				// Check match
				if (session.game.cards[first] === session.game.cards[idx]) {
					session.game.matched++
					session.firstPick = null
					if (session.game.matched === session.game.pairs) {
						deleteSession(jid)
						const user = db.getUser(sender)
						addGameXp(user, GAME_XP.win)
						await db.save()
						await m.reply([
							'🎉 *Memory Game selesai!*',
							`📊 Percobaan: ${session.game.attempts}`,
							`🎁 +${GAME_XP.win} XP`
						].join('\n'))
						return true
					}
					await m.reply([
						'🧠 *Memory Game*',
						'',
						memoryRender(session.game),
						'',
						'✅ Cocok! Pilih kartu lagi!'
					].join('\n'))
					return true
				} else {
					// Hide both after showing
					const card1 = session.game.cards[first]
					const card2 = session.game.cards[idx]
					session.game.revealed[first] = false
					session.game.revealed[idx] = false
					session.firstPick = null
					await m.reply([
						'🧠 *Memory Game*',
						'',
						`❌ Tidak cocok: ${card1} ≠ ${card2}`,
						memoryRender(session.game),
						'',
						'Coba lagi! Ketik 2 posisi.'
					].join('\n'))
					return true
				}
			}
		}

		// RPS Tournament
		if (session.type === 'rpstournament') {
			const choiceMap = { '🪨': 'rock', '📄': 'paper', '✂️': 'scissors', 'batu': 'rock', 'kertas': 'paper', 'gunting': 'scissors', 'rock': 'rock', 'paper': 'paper', 'scissors': 'scissors', 'r': 'rock', 'p': 'paper', 's': 'scissors' }
			const playerChoice = choiceMap[text.toLowerCase().trim()]
			if (!playerChoice) return false
			const choices = ['rock', 'paper', 'scissors']
			const botChoice = pick(choices)
			const emoji = { rock: '🪨', paper: '📄', scissors: '✂️' }
			const beats = { rock: 'scissors', paper: 'rock', scissors: 'paper' }
			
			let result
			if (playerChoice === botChoice) result = 'draw'
			else if (beats[playerChoice] === botChoice) { result = 'win'; session.playerWins++ }
			else { result = 'lose'; session.botWins++ }

			session.round++
			const gameOver = session.playerWins >= session.target || session.botWins >= session.target
			if (gameOver) {
				deleteSession(jid)
				const user = db.getUser(sender)
				const won = session.playerWins >= session.target
				addGameXp(user, won ? GAME_XP.win * 2 : GAME_XP.lose)
				await db.save()
				await m.reply([
					'🏆 *RPS Tournament — Selesai!*',
					'',
					`Kamu: ${emoji[playerChoice]} vs Bot: ${emoji[botChoice]}`,
					`Hasil: ${result === 'win' ? '✅ Menang' : result === 'lose' ? '❌ Kalah' : '🤝 Seri'}`,
					'',
					`Skor akhir: ${session.playerWins}-${session.botWins}`,
					won ? `🎉 Kamu juara! 🎁 +${GAME_XP.win * 2} XP` : `😅 Bot juara! 🎁 +${GAME_XP.lose} XP`
				].join('\n'))
				return true
			}

			await m.reply([
				`🏆 *RPS Tournament* (Best of ${session.target * 2 - 1})`,
				'',
				`Round ${session.round}: Kamu ${emoji[playerChoice]} vs Bot ${emoji[botChoice]}`,
				`Hasil: ${result === 'win' ? '✅ Menang' : result === 'lose' ? '❌ Kalah' : '🤝 Seri'}`,
				'',
				`Skor: Kamu ${session.playerWins} - Bot ${session.botWins}`,
				'Ketik 🪨📄✂️ untuk round berikutnya!'
			].join('\n'))
			return true
		}

		// Color guess
		if (session.type === 'colorguess') {
			const parts = text.trim().split(/\s+/).map(Number)
			if (parts.length !== 3 || parts.some(p => isNaN(p))) return false
			const [r, g, b] = parts
			const distance = Math.sqrt((r - session.r) ** 2 + (g - session.g) ** 2 + (b - session.b) ** 2)
			const maxDist = Math.sqrt(3 * 255 * 255)
			const accuracy = Math.round((1 - distance / maxDist) * 100)
			deleteSession(jid)
			const user = db.getUser(sender)
			const xp = accuracy > 90 ? GAME_XP.win : accuracy > 70 ? GAME_XP.play : GAME_XP.lose
			addGameXp(user, xp)
			await db.save()
			await m.reply([
				'🎨 *Color Guess Result*',
				'',
				`Target: RGB(${session.r}, ${session.g}, ${session.b}) = ${session.hex}`,
				`Kamu: RGB(${r}, ${g}, ${b})`,
				`🎯 Akurasi: ${accuracy}%`,
				`🎁 +${xp} XP`
			].join('\n'))
			return true
		}

		// Flag quiz
		if (session.type === 'flagquiz') {
			const answer = text.toLowerCase().trim()
			if (answer !== session.answer && answer !== session.answer.replace(/\s+/g, '')) return false
			deleteSession(jid)
			const user = db.getUser(sender)
			addGameXp(user, GAME_XP.win)
			await db.save()
			await m.reply(`✅ Benar! Bendera *${session.answer}* 🏳️\n🎁 +${GAME_XP.win} XP`)
			return true
		}

		return false
	}
}
