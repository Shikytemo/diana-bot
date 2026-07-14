// GitHub repo star watcher — polls starred repos, notifies owner on star change.

const C = {
	reset: '\x1b[0m',
	bold: '\x1b[1m',
	dim: '\x1b[90m',
	cyan: '\x1b[36m',
	green: '\x1b[32m',
	yellow: '\x1b[33m',
	magenta: '\x1b[35m',
	red: '\x1b[31m'
}

const box = (title, rows, accent = C.cyan) => {
	const inner = Math.max(title.length, ...rows.map(([l, v]) => `${l}: ${v}`.length))
	const w = inner + 2
	const L = '│'
	const bar = '─'.repeat(w)
	const pad = s => s + ' '.repeat(w - s.length)
	const line = (s, c = C.reset) => `${accent}${L}${C.reset} ${c}${pad(s)}${C.reset} ${accent}${L}${C.reset}`
	console.log(`${accent}┌${bar}┐${C.reset}`)
	console.log(line(title, C.bold))
	console.log(`${accent}├${bar}┤${C.reset}`)
	for (const [label, value] of rows) console.log(line(`${label}: ${value}`))
	console.log(`${accent}└${bar}┘${C.reset}`)
}

const fetchStars = async repo => {
	const res = await fetch(`https://api.github.com/repos/${repo}`, {
		headers: { 'User-Agent': 'diana-bot', Accept: 'application/vnd.github+json' }
	})
	if (!res.ok) throw new Error(`GitHub ${res.status} for ${repo}`)
	const data = await res.json()
	return {
		stars: data.stargazers_count ?? 0,
		forks: data.forks_count ?? 0,
		openIssues: data.open_issues_count ?? 0,
		desc: data.description || ''
	}
}

export const startRepoWatcher = ({ config, sock, db, logger }) => {
	const cfg = config.repoWatcher
	if (!cfg?.enabled || !cfg.repos?.length) return null

	const last = new Map()
	let timer = null

	const tick = async () => {
		for (const repo of cfg.repos) {
			try {
				const stats = await fetchStars(repo)
				const prev = last.get(repo)
				last.set(repo, stats)

				const delta = prev ? stats.stars - prev.stars : 0
				const accent = delta > 0 ? C.green : delta < 0 ? C.red : C.cyan

				box(
					`★ ${repo}`,
					[
						['stars', `${stats.stars}${delta ? `  (${delta > 0 ? '+' : ''}${delta})` : ''}`],
						['forks', String(stats.forks)],
						['issues', String(stats.openIssues)],
						['desc', stats.desc.slice(0, 40)]
					],
					accent
				)

				if (delta !== 0 && sock?.user?.id) {
					const target = config.ownerNumber ? `${config.ownerNumber}@s.whatsapp.net` : sock.user.id
					const arrow = delta > 0 ? '📈' : '📉'
					const text =
						`${arrow} *GitHub Star Update*\n\n` +
						`*Repo:* ${repo}\n` +
						`*Stars:* ${stats.stars} (${delta > 0 ? '+' : ''}${delta})\n` +
						`*Forks:* ${stats.forks}\n` +
						`*Issues:* ${stats.openIssues}`
					await sock.sendMessage(target, { text })
				}
			} catch (error) {
				logger.warn({ error: error.message, repo }, 'repo watcher poll failed')
			}
		}
	}

	tick()
	timer = setInterval(tick, (cfg.intervalMinutes || 15) * 60 * 1000)
	logger.info({ repos: cfg.repos.length, intervalMinutes: cfg.intervalMinutes }, 'repo watcher enabled')
	return () => timer && clearInterval(timer)
}
