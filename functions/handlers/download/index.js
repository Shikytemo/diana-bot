import { commands as tiktokCommands } from './tiktok.js'
import { commands as downloaderCommands } from './downloader.js'
import { commands as pinterestCommands } from './pinterest.js'
import { commands as mediafireCommands } from './mediafire.js'

export const commands = {
	...tiktokCommands,
	...downloaderCommands,
	...pinterestCommands,
	...mediafireCommands
}
