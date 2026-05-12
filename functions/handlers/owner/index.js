import { commands as evalCommands } from './eval.js'
import { commands as databaseCommands } from './database.js'
import { commands as remindCommands } from './remind.js'
import { commands as updateCommands } from './update.js'

export const commands = {
	...evalCommands,
	...databaseCommands,
	...remindCommands,
	...updateCommands
}
