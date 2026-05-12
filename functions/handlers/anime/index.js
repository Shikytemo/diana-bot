import { commands as animeCommands } from './anime.js'
import { commands as samehadakuCommands } from './samehadaku.js'
import { commands as otakudesuCommands } from './otakudesu.js'
import { commands as anoboyCommands } from './anoboy.js'
import { commands as spotifyCommands } from './spotify.js'
import { commands as channelCommands } from './channel.js'

export const commands = {
	...animeCommands,
	...samehadakuCommands,
	...otakudesuCommands,
	...anoboyCommands,
	...spotifyCommands,
	...channelCommands
}
