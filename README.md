# 👧 Diana Bot

> ʜɪ, ᴡᴇʟᴄᴏᴍᴇ ᴛᴏ **Diana Bot**  
> WhatsApp bot ringan berbasis **Shileys** dengan menu media, button interaktif, profile user, leveling, dan tools harian.

![Diana Bot](https://files.catbox.moe/qmspao.jpg)

## ✨ Fitur

- 🔐 Login pairing code, tanpa QR ribet.
- 🎀 Menu anime-style dengan gambar, emoji, role, level, versi, dan tanggal Jakarta.
- 🔘 Native-flow button: list, copy, URL, call, dan quick reply.
- 👤 Auto register user ke database.
- ✏️ Command `.setnama` untuk nama profile.
- 🏆 Sistem leveling dari aktivitas command.
- 📌 Pinterest scraper dengan tombol next photo.
- ☁️ Upload media ke Catbox lewat `.tourl`.
- 🛰️ Cek ID channel WhatsApp lewat `.idch`.
- 🔄 Self update lewat `.update` untuk owner/admin.
- 📣 Auto follow channel Diana saat bot connect.

## 🚀 Install

```sh
git clone https://github.com/Shikytemo/diana-bot.git
cd diana-bot
npm install
npm start
```

Saat pertama login, masukkan nomor WhatsApp bot. Diana akan menampilkan pairing code di terminal.

## ⚙️ Config

Semua setting utama ada di:

```text
config.js
```

Tidak perlu `.env` untuk base lokal. Ubah langsung nilai seperti owner, prefix, session, database, dan custom reply dari file itu.

## 📖 Command

```text
.menu       buka menu media
.ping       cek status bot dan device
.setnama    set nama profile
.role       cek role, nama, dan level
.pin        cari media Pinterest
.pinnext    foto Pinterest berikutnya
.tourl      upload media ke Catbox
.idch       cek ID channel WhatsApp
.update     update bot dari GitHub
```

## 🧩 Stack

- Node.js ESM
- Shileys
- @shikytemo/shitools
- JSON database lokal

## 🛡️ Catatan

Jangan push file runtime seperti:

```text
database/data.json
database/session/
```

File itu berisi data lokal dan session WhatsApp.
