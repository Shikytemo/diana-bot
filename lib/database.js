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
			registered: false,
			premium: false,
			premiumUntil: null,
			createdAt: new Date().toISOString()
		}
		this.data.users[jid].registered ??= false
		this.data.users[jid].premium ??= false
		this.data.users[jid].premiumUntil ??= null
		return this.data.users[jid]
	}

	getChat(jid) {
		this.data.chats[jid] ||= {
			jid,
			createdAt: new Date().toISOString()
		}
		return this.data.chats[jid]
	}
}
