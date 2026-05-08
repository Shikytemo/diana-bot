import { getIpInfo } from '@shikytemo/shitools'

export const ipLookupForReply = async ip => {
	const trimmed = String(ip || '').trim()
	try {
		const info = await getIpInfo(trimmed)
		const lines = [
			`🌐 *IP Lookup — ${info.ip}*`,
			'',
			`${info.flag || '🏳️'} ${info.country}${info.countryCode ? ` (${info.countryCode})` : ''}`,
			info.region ? `📍 Region   : ${info.region}` : '',
			info.city ? `🏙️ Kota     : ${info.city}` : '',
			info.postal ? `📮 Postal   : ${info.postal}` : '',
			info.timezone ? `🕒 Timezone : ${info.timezone}` : '',
			info.isp ? `🛰️ ISP      : ${info.isp}` : '',
			info.org && info.org !== info.isp ? `🏢 Org      : ${info.org}` : '',
			info.asn ? `🔢 ASN      : ${info.asn}` : '',
			info.type ? `📡 Type     : ${info.type}` : '',
			'',
			info.mapUrl ? `🗺️ ${info.mapUrl}` : ''
		].filter(Boolean)
		return { ok: true, text: lines.join('\n'), info, mapUrl: info.mapUrl }
	} catch (error) {
		return { ok: false, text: `IP lookup gagal: ${error.message || error}` }
	}
}
