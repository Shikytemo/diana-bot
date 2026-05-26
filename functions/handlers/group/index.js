import { commands as settingsCommands } from './settings.js'
import { commands as moderationCommands } from './moderation.js'
import { commands as profileCommands } from './profile.js'
import { commands as afkCommands } from './afk.js'
import { commands as tagallCommands } from './tagall.js'
import { commands as autostickerCommands } from './autosticker.js'
import { commands as antiviewonceCommands } from './antiviewonce.js'
import { commands as extrasCommands } from './extras.js'

export const commands = {
	...settingsCommands,
	...moderationCommands,
	...profileCommands,
	...afkCommands,
	...tagallCommands,
	...autostickerCommands,
	...antiviewonceCommands,
	...extrasCommands
}
