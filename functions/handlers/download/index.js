import { commands as tiktokCommands } from './tiktok.js'
import { commands as downloaderCommands } from './downloader.js'
import { commands as pinterestCommands } from './pinterest.js'
import { commands as mediafireCommands } from './mediafire.js'
import { commands as scraperCommands } from './scraper.js'

export const commands = {
	...tiktokCommands,
	...downloaderCommands,
	...pinterestCommands,
	...mediafireCommands,
	// scraper.js sengaja paling akhir: facebook / twitter / capcut /
	// soundcloud / threads / spotifydl / gdrive / dl / yts adalah command
	// baru, tidak menimpa instagram / youtube / tiktok yang sudah ada.
	...scraperCommands
}
