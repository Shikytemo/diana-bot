import { mkdir, readFile, writeFile } from 'fs/promises'
import { dirname } from 'path'

const defaultData = () => ({
	users: {},
	chats: {},
	settings: {
		createdAt: new Date().toISOString()
	}
})

export class JsonDatabase {
	constructor(file) {
		this.file = file
		this.data = defaultData()
		this.writeQueue = Promise.resolve()
	}

	async load() {
		await mkdir(dirname(this.file), { recursive: true })

		try {
			const raw = await readFile(this.file, 'utf8')
			this.data = {
				...defaultData(),
				...JSON.parse(raw)
			}
		} catch (error) {
			if (error.code !== 'ENOENT') throw error
			await this.save()
		}

		return this.data
	}

	async save() {
		await mkdir(dirname(this.file), { recursive: true })
		this.writeQueue = this.writeQueue.then(() => writeFile(this.file, JSON.stringify(this.data, null, 2)))
		return this.writeQueue
	}

	getUser(jid) {
		this.data.users[jid] ||= {
			jid,
			name: null,
			registered: true,
			premium: false,
			premiumUntil: null,
			level: 1,
			exp: 0,
			commands: 0,
			messages: 0,
			createdAt: new Date().toISOString()
		}
		this.data.users[jid].name ??= null
		this.data.users[jid].registered ??= true
		this.data.users[jid].premium ??= false
		this.data.users[jid].premiumUntil ??= null
		this.data.users[jid].level ??= 1
		this.data.users[jid].exp ??= 0
		this.data.users[jid].commands ??= 0
		this.data.users[jid].messages ??= 0
		return this.data.users[jid]
	}

	getSetting(key, fallback = undefined) {
		this.data.settings ||= {}
		return this.data.settings[key] ?? fallback
	}

	setSetting(key, value) {
		this.data.settings ||= {}
		this.data.settings[key] = value
		return value
	}

	getChat(jid) {
		this.data.chats[jid] ||= {
			jid,
			createdAt: new Date().toISOString()
		}
		return this.data.chats[jid]
	}
}
