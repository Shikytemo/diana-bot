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
- 🎬 TikTok native: URL → no-watermark, query → search, `@user` → profil (powered by shitools).
- 🎵 Lyric finder: `.lyrics <judul>` (Genius + lyrics.ovh).
- 🌐 Translator: `.tr en halo dunia` / `.detect <text>` (Google Translate proxy).
- 🎨 AI image generator: `.image <prompt>` (Pollinations, free).
- 📚 Wikipedia, 🕌 Sholat, 📖 Quran, 🇮🇩 BMKG, 🌤️ Cuaca global, 📰 Berita Indo (CNN/Antara/Tempo/dll).
- 💱 Kurs `USD IDR 50` + 🌐 IP lookup, 📕 KBBI/Kateglo, 🐍 PyPI, 🔥 GitHub trending.
- 📺 YouTube search, 🖼️ Wallhaven wallpaper, 🔴 Reddit, 😂 Meme/Joke, 💭 Quote/Fakta, 📸 Screenshot, 🗂️ Mediafire.

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

### 🌍 Group-bot Scrapers (powered by shitools v1.5.0)

```text
.wiki <topik>           Wikipedia summary (id)
.surah <1-114>          Tampilkan surah Al-Quran
.ayat <surah> <ayat>    Tampilkan satu ayat (.ayat 2 255)
.surahlist              Daftar 114 surah
.sholat <kota>          Jadwal sholat hari ini
.cuaca <kota>           Cuaca global (wttr.in)
.bmkg <desa/kota>       Prakiraan cuaca resmi BMKG
.quote                  Quote random (zenquotes)
.animequote             Quote anime (animechan)
.fact                   Random useless fact
.joke [kategori]        Random joke (jokeapi)
.meme [subreddit]       Meme random dari Reddit
.kateglo <kata>         Kamus Bahasa Indonesia
.pypi <package>         Info package PyPI
.ghtrend [lang] [since] GitHub trending repos
.ytsearch <query>       Cari video YouTube
.wp <query>             Wallpaper Wallhaven
.kurs <FROM> <TO> [n]   Konversi mata uang (.kurs USD IDR 50)
.rates [BASE]           Daftar kurs populer (default USD)
.ip [addr]              Lookup IP / lokasi (kosong = IP bot)
.reddit <sub> [sort]    Post subreddit (.reddit memes top)
.berita [src]           Headline berita Indonesia (.berita list)
.ss <url>               Screenshot halaman web
.mediafire <url>        Direct link Mediafire
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
