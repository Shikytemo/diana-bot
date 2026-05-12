import { commands as lyricsCommands } from './lyrics.js'
import { commands as translateCommands } from './translate.js'
import { commands as aiimageCommands } from './aiimage.js'
import { commands as wikiCommands } from './wiki.js'
import { commands as quranCommands } from './quran.js'
import { commands as weatherCommands } from './weather.js'
import { commands as funCommands } from './fun.js'
import { commands as infoCommands } from './info.js'
import { commands as visualCommands } from './visual.js'

export const commands = {
	...lyricsCommands,
	...translateCommands,
	...aiimageCommands,
	...wikiCommands,
	...quranCommands,
	...weatherCommands,
	...funCommands,
	...infoCommands,
	...visualCommands
}
