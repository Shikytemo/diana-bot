import { getPypiPackage } from '@shikytemo/shitools'

const truncate = (text, max = 600) => {
	if (!text) return ''
	if (text.length <= max) return text
	return `${text.slice(0, max).trimEnd()}…`
}

export const pypiForReply = async name => {
	const trimmed = String(name || '').trim()
	if (!trimmed) {
		return { ok: false, text: 'Pakai: .pypi <package>. Contoh: .pypi requests' }
	}
	try {
		const p = await getPypiPackage(trimmed)
		const lines = [
			`🐍 *PyPI — ${p.name}*`,
			`📦 v${p.versionLatest}${p.releaseDate ? ` • ${p.releaseDate.slice(0, 10)}` : ''}`,
			p.summary ? `📝 ${truncate(p.summary, 200)}` : '',
			p.author ? `👤 ${p.author}` : '',
			p.license ? `📜 ${p.license}` : '',
			p.requiresPython ? `🐍 Python: ${p.requiresPython}` : '',
			'',
			`🔗 ${p.projectUrl || `https://pypi.org/project/${p.name}/`}`
		].filter(Boolean)
		if (p.requiresDist?.length) {
			lines.push('', `📚 Deps: ${p.requiresDist.slice(0, 6).join(', ')}${p.requiresDist.length > 6 ? '…' : ''}`)
		}
		return { ok: true, text: lines.join('\n'), url: p.projectUrl, pkg: p }
	} catch (error) {
		return { ok: false, text: `PyPI gagal: ${error.message || error}` }
	}
}
