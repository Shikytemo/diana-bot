import { commands as tebakCommands } from './tebak.js'
import { commands as casinoCommands } from './casino.js'
import { commands as versusCommands } from './versus.js'
import { commands as gamesCommands } from './games.js'
import { commands as advancedGamesCommands } from './advanced.js'
import { commands as moregamesCommands } from './moregames.js'

export const commands = {
	...tebakCommands,
	...casinoCommands,
	...versusCommands,
	...gamesCommands,
	...advancedGamesCommands,
	...moregamesCommands
}
