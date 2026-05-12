import { commands as menuCommands } from './menu.js'
import { commands as pingCommands } from './ping.js'
import { commands as demoCommands } from './demo.js'
import { commands as miscCommands } from './misc.js'

export const commands = {
	...menuCommands,
	...pingCommands,
	...demoCommands,
	...miscCommands
}
