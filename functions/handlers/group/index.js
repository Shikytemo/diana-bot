import { commands as settingsCommands } from './settings.js'
import { commands as moderationCommands } from './moderation.js'
import { commands as profileCommands } from './profile.js'

export const commands = {
	...settingsCommands,
	...moderationCommands,
	...profileCommands
}
