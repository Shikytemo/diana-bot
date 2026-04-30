import { execFile } from 'child_process'

const run = (command, args, options = {}) =>
	new Promise(resolve => {
		execFile(command, args, { timeout: 120000, ...options }, (error, stdout, stderr) => {
			resolve({
				ok: !error,
				code: error?.code || 0,
				stdout: stdout.trim(),
				stderr: stderr.trim()
			})
		})
	})

const shortHash = hash => hash.slice(0, 7)

export const runSelfUpdate = async ({ cwd = process.cwd(), logger }) => {
	const fetch = await run('git', ['fetch', '--prune'], { cwd })
	if (!fetch.ok) {
		return {
			updated: false,
			restart: false,
			text: `Gagal cek update:\n${fetch.stderr || fetch.stdout || `git fetch exit ${fetch.code}`}`
		}
	}

	const local = await run('git', ['rev-parse', 'HEAD'], { cwd })
	const remote = await run('git', ['rev-parse', '@{u}'], { cwd })
	if (!local.ok || !remote.ok) {
		return {
			updated: false,
			restart: false,
			text: 'Remote upstream belum diset. Jalankan git branch --set-upstream-to origin/main.'
		}
	}

	if (local.stdout === remote.stdout) {
		return {
			updated: false,
			restart: false,
			text: `Diana sudah versi terbaru (${shortHash(local.stdout)}).`
		}
	}

	const pull = await run('git', ['pull', '--ff-only'], { cwd })
	if (!pull.ok) {
		return {
			updated: false,
			restart: false,
			text: `Gagal update file:\n${pull.stderr || pull.stdout || `git pull exit ${pull.code}`}`
		}
	}

	const install = await run('npm', ['install'], { cwd })
	if (!install.ok) {
		return {
			updated: true,
			restart: false,
			text: `File sudah diupdate, tapi npm install gagal:\n${install.stderr || install.stdout || `npm install exit ${install.code}`}`
		}
	}

	logger?.info({ from: shortHash(local.stdout), to: shortHash(remote.stdout) }, 'self update installed')

	return {
		updated: true,
		restart: true,
		text: [
			'Diana berhasil update.',
			`From: ${shortHash(local.stdout)}`,
			`To: ${shortHash(remote.stdout)}`,
			'Dependency sudah diinstall. Bot restart sekarang.'
		].join('\n')
	}
}

export const restartProcess = (delayMs = 1200) => {
	setTimeout(() => {
		process.exit(0)
	}, delayMs).unref()
}
