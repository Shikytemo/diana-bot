import { isText } from '../../../lib/global.js'
import { aiChatForReply, clearAiContext } from '../../../lib/aichat.js'
import { sendRichButtons, sendHTML } from '../../../lib/reply.js'

export const commands = {
	ai: async m => {
		const { command, sender, jid, sock, message, replyJid } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		if (!isText(command)) {
			await sendRichButtons(sock, targetJid, {
				text: [
					'╭━━━ 🤖 *ᴀɪ ᴄʜᴀᴛ* ━━━╮',
					'┃',
					`┃  📝 ғᴏʀᴍᴀᴛ ⌁ ${command.prefix}ai <pesan>`,
					`┃  💡 ᴄᴏɴᴛᴏʜ ⌁ ${command.prefix}ai Siapa presiden Indonesia?`,
					`┃  🌐 ʜᴛᴍʟ   ⌁ ${command.prefix}aihtml <pesan>`,
					'┃',
					'╰━━━━━━━━━━━━━━━━━━╯'
				].join('\n'),
				title: '🤖 AI Chat',
				quickReplies: [
					{ text: '🧹 ʀᴇsᴇᴛ ᴄᴏɴᴛᴇxᴛ', id: `${command.prefix}aiclear` },
					{ text: '📋 ᴍᴇɴᴜ', id: `${command.prefix}menu` }
				]
			}, quoted)
			return
		}
		await m.reply('🤖 *ʙᴇʀᴘɪᴋɪʀ...*')
		const result = await aiChatForReply(jid, sender, command.text)
		await sendRichButtons(sock, targetJid, {
			text: [
				'╭━━━ 🤖 *ᴀɪ ʀᴇsᴘᴏɴsᴇ* ━━━╮',
				'┃',
				result.text,
				'┃',
				'╰━━━━━━━━━━━━━━━━━━╯'
			].join('\n'),
			title: '🤖 AI Assistant',
			copies: [{ text: '📋 ᴄᴏᴘʏ ᴊᴀᴡᴀʙᴀɴ', copyText: result.text.slice(0, 2000) }],
			quickReplies: [
				{ text: '🧹 ʀᴇsᴇᴛ ᴄᴏɴᴛᴇxᴛ', id: `${command.prefix}aiclear` },
				{ text: '📋 ᴍᴇɴᴜ', id: `${command.prefix}menu` }
			]
		}, quoted)
	},

	chat: async m => await m.commands.ai(m),

	aihtml: async m => {
		const { command, sender, jid, sock, message, replyJid } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		if (!isText(command)) {
			await m.reply(`⚠️ Format: ${command.prefix}aihtml <pertanyaan>`)
			return
		}
		await m.reply('🤖 *ᴍᴇᴍʙᴜᴀᴛ ʀɪᴄʜ ʜᴛᴍʟ...*')
		const result = await aiChatForReply(jid, sender, command.text)
		const escaped = result.text
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/\n/g, '<br>')
		const html = `
			<div style="font-family: sans-serif; padding: 14px; background: #0f172a; color: #e2e8f0; border-radius: 12px;">
				<h2 style="margin:0 0 8px 0; color:#38bdf8;">🤖 Diana AI Response</h2>
				<p style="font-size:12px; color:#94a3b8; margin:0 0 12px 0;">Prompt: ${command.text.replace(/</g, '&lt;')}</p>
				<div style="background:#1e293b; padding:12px; border-radius:8px; line-height:1.5;">${escaped}</div>
			</div>
		`
		await sendHTML(sock, targetJid, html, { title: '🤖 Diana AI' }, quoted)
	},

	aiclear: async m => {
		const { sender, jid, sock, message, replyJid, command } = m
		const targetJid = replyJid || jid
		const quoted = targetJid === jid ? message : undefined
		clearAiContext(jid, sender)
		await sendRichButtons(sock, targetJid, {
			text: '🧹 Context AI berhasil direset.',
			title: '🤖 AI Chat',
			quickReplies: [{ text: '📋 ᴍᴇɴᴜ', id: `${command.prefix}menu` }]
		}, quoted)
	}
}
