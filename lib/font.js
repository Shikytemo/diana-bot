// Unicode font/style transforms — no API needed

const STYLES = {
	bold: chars => {
		const map = '𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵'
		const base = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
		return chars.split('').map(c => {
			const i = base.indexOf(c)
			return i >= 0 ? map[i] : c
		}).join('')
	},
	italic: chars => {
		const map = '𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘻𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡'
		const base = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
		return chars.split('').map(c => {
			const i = base.indexOf(c)
			return i >= 0 ? map[i] : c
		}).join('')
	},
	script: chars => {
		const lower = '𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃'
		const upper = '𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩'
		const baseL = 'abcdefghijklmnopqrstuvwxyz'
		const baseU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
		return chars.split('').map(c => {
			const li = baseL.indexOf(c), ui = baseU.indexOf(c)
			return li >= 0 ? lower[li] : ui >= 0 ? upper[ui] : c
		}).join('')
	},
	mono: chars => {
		const map = 'ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ'
		const base = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
		return chars.split('').map(c => {
			const i = base.indexOf(c)
			return i >= 0 ? map[i] : c
		}).join('')
	},
	small: chars => {
		const map = 'ᴀʙᴄᴅꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀꜱᴛᴜᴠᴡxʏᴢ'
		const base = 'abcdefghijklmnopqrstuvwxyz'
		return chars.split('').map(c => {
			const i = base.indexOf(c)
			return i >= 0 ? map[i] : c
		}).join('')
	},
	box: chars => {
		const map = '🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉'
		const base = 'abcdefghijklmnopqrstuvwxyz'
		return chars.split('').map(c => {
			const i = base.indexOf(c)
			return i >= 0 ? map[i] : c
		}).join('')
	}
}

export const STYLE_NAMES = Object.keys(STYLES)

export const styleListText = () => STYLE_NAMES.map(s => `• ${s}`).join('\n')

export const transformText = (text, style) => {
	const fn = STYLES[style]
	if (!fn) return null
	return fn(text)
}
