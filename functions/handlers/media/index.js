import { commands as converterCommands } from './converter.js'
import { commands as uploadCommands } from './upload.js'

export const commands = {
	...converterCommands,
	...uploadCommands
}
