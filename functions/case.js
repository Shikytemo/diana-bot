import { commands as coreCommands } from './handlers/core/index.js'
import { commands as ownerCommands } from './handlers/owner/index.js'
import { commands as mediaCommands } from './handlers/media/index.js'
import { commands as downloadCommands } from './handlers/download/index.js'
import { commands as toolsCommands } from './handlers/tools/index.js'
import { commands as animeCommands } from './handlers/anime/index.js'
import { commands as groupCommands } from './handlers/group/index.js'
import { commands as funCommands } from './handlers/fun/index.js'
import { listCommands } from './commands.js'

const handlers = {
	...coreCommands,
	...ownerCommands,
	...mediaCommands,
	...downloadCommands,
	...toolsCommands,
	...animeCommands,
	...groupCommands,
	...funCommands
}

// Build alias → handler name mapping
const aliasMap = {}
const allNames = []
for (const cmd of listCommands()) {
	allNames.push(cmd.name)
	if (cmd.aliases?.length) {
		allNames.push(...cmd.aliases)
		for (const alias of cmd.aliases) aliasMap[alias] = cmd.name
	}
}

// Levenshtein distance
const distance = (a, b) => {
	const m = a.length, n = b.length
	const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0))
	for (let i = 0; i <= m; i++) dp[i][0] = i
	for (let j = 0; j <= n; j++) dp[0][j] = j
	for (let i = 1; i <= m; i++)
		for (let j = 1; j <= n; j++)
			dp[i][j] = Math.min(
				dp[i - 1][j] + 1,
				dp[i][j - 1] + 1,
				dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
			)
	return dp[m][n]
}

const findSuggestion = name => {
	let best = null, bestDist = Infinity
	for (const valid of allNames) {
		const d = distance(name, valid)
		if (d < bestDist) { bestDist = d; best = valid }
	}
	// Only suggest if close enough (max 3 edits, and not more than half the length)
	return bestDist <= 3 && bestDist <= Math.max(2, name.length / 2) ? best : null
}

export const runCase = async m => {
	const rawCmd = m.command.name
	const cmd = aliasMap[rawCmd] || rawCmd
	const handler = handlers[cmd]

	if (handler) {
		m.commands = handlers
		await handler(m)
	} else {
		const suggestion = findSuggestion(rawCmd)
		const prefix = m.command.prefix
		if (suggestion) {
			await m.reply(`Command *${rawCmd}* tidak ditemukan.\nMaksudmu *${prefix}${suggestion}*?`)
		} else {
			await m.reply(`Command tidak ditemukan: ${rawCmd}`)
		}
	}
}
