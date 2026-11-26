import { mkdir, readFile } from 'fs/promises'
import { DatabaseSync } from 'node:sqlite'
import { dirname } from 'path'

const defaultData = () => ({
	users: {},
	chats: {},
	settings: {
		createdAt: new Date().toISOString()
	}
})

export class SqlDatabase {
	constructor(file, { legacyJsonFile = null } = {}) {
		this.file = file
		this.legacyJsonFile = legacyJsonFile
		this.db = null
		this.data = defaultData()
		this.writeQueue = Promise.resolve()
	}

	async load() {
		await mkdir(dirname(this.file), { recursive: true })

		if (!this.db) {
			this.db = new DatabaseSync(this.file)
			this.db.exec(`
				PRAGMA journal_mode = WAL;
				PRAGMA synchronous = NORMAL;

				CREATE TABLE IF NOT EXISTS users (
					jid TEXT PRIMARY KEY,
					name TEXT,
					registered INTEGER NOT NULL DEFAULT 1,
					premium INTEGER NOT NULL DEFAULT 0,
					premium_until TEXT,
					level INTEGER NOT NULL DEFAULT 1,
					exp INTEGER NOT NULL DEFAULT 0,
					commands INTEGER NOT NULL DEFAULT 0,
					messages INTEGER NOT NULL DEFAULT 0,
					created_at TEXT NOT NULL,
					extra TEXT
				);

				CREATE TABLE IF NOT EXISTS chats (
					jid TEXT PRIMARY KEY,
					created_at TEXT NOT NULL,
					data TEXT NOT NULL
				);

				CREATE TABLE IF NOT EXISTS settings (
					key TEXT PRIMARY KEY,
					value TEXT
				);
			`)
		}

		const userRows = this.db.prepare('SELECT * FROM users').all()
		const chatRows = this.db.prepare('SELECT * FROM chats').all()
		const settingRows = this.db.prepare('SELECT * FROM settings').all()

		const isEmpty = userRows.length === 0 && chatRows.length === 0 && settingRows.length === 0
		if (isEmpty && this.legacyJsonFile) {
			const migrated = await this.#migrateLegacyJson()
			if (migrated) {
				return this.load()
			}
		}

		const data = defaultData()
		for (const row of userRows) {
			const extra = row.extra ? JSON.parse(row.extra) : {}
			data.users[row.jid] = {
				...extra,
				jid: row.jid,
				name: row.name ?? null,
				registered: Boolean(row.registered),
				premium: Boolean(row.premium),
				premiumUntil: row.premium_until ?? null,
				level: row.level ?? 1,
				exp: row.exp ?? 0,
				commands: row.commands ?? 0,
				messages: row.messages ?? 0,
				createdAt: row.created_at
			}
		}

		for (const row of chatRows) {
			const parsed = row.data ? JSON.parse(row.data) : {}
			data.chats[row.jid] = {
				...parsed,
				jid: row.jid,
				createdAt: row.created_at
			}
		}

		for (const row of settingRows) {
			data.settings[row.key] = row.value !== null ? JSON.parse(row.value) : null
		}

		this.data = data
		if (settingRows.length === 0) {
			await this.save()
		}

		return this.data
	}

	async #migrateLegacyJson() {
		try {
			const raw = await readFile(this.legacyJsonFile, 'utf8')
			const parsed = JSON.parse(raw)
			this.data = {
				...defaultData(),
				...parsed
			}
			await this.save()
			return true
		} catch (error) {
			if (error.code !== 'ENOENT') throw error
			return false
		}
	}

	#persistSync() {
		if (!this.db) return

		const upsertUser = this.db.prepare(`
			INSERT INTO users (jid, name, registered, premium, premium_until, level, exp, commands, messages, created_at, extra)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
			ON CONFLICT(jid) DO UPDATE SET
				name = excluded.name,
				registered = excluded.registered,
				premium = excluded.premium,
				premium_until = excluded.premium_until,
				level = excluded.level,
				exp = excluded.exp,
				commands = excluded.commands,
				messages = excluded.messages,
				created_at = excluded.created_at,
				extra = excluded.extra
		`)

		const upsertChat = this.db.prepare(`
			INSERT INTO chats (jid, created_at, data)
			VALUES (?, ?, ?)
			ON CONFLICT(jid) DO UPDATE SET
				created_at = excluded.created_at,
				data = excluded.data
		`)

		const upsertSetting = this.db.prepare(`
			INSERT INTO settings (key, value)
			VALUES (?, ?)
			ON CONFLICT(key) DO UPDATE SET
				value = excluded.value
		`)

		this.db.exec('BEGIN IMMEDIATE')
		try {
			for (const [jid, user] of Object.entries(this.data.users || {})) {
				const {
					jid: _jid,
					name = null,
					registered = true,
					premium = false,
					premiumUntil = null,
					level = 1,
					exp = 0,
					commands = 0,
					messages = 0,
					createdAt = new Date().toISOString(),
					...extra
				} = user
				upsertUser.run(
					jid,
					name,
					registered ? 1 : 0,
					premium ? 1 : 0,
					premiumUntil,
					level,
					exp,
					commands,
					messages,
					createdAt,
					Object.keys(extra).length > 0 ? JSON.stringify(extra) : null
				)
			}

			for (const [jid, chat] of Object.entries(this.data.chats || {})) {
				const { jid: _jid, createdAt = new Date().toISOString(), ...rest } = chat
				upsertChat.run(jid, createdAt, JSON.stringify(rest))
			}

			for (const [key, value] of Object.entries(this.data.settings || {})) {
				upsertSetting.run(key, JSON.stringify(value ?? null))
			}

			this.db.exec('COMMIT')
		} catch (error) {
			this.db.exec('ROLLBACK')
			throw error
		}
	}

	async save() {
		this.writeQueue = this.writeQueue.then(() => {
			this.#persistSync()
		})
		return this.writeQueue
	}

	close() {
		if (this.db) {
			this.db.close()
			this.db = null
		}
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

export { SqlDatabase as JsonDatabase }
