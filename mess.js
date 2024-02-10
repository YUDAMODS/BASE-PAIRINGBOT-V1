require('../config')
const {
	downloadContentFromMessage,
	generateWAMessage,
	generateWAMessageFromContent,
	generateProfilePicture
} = require("@whiskeysockets/baileys")
const baileys = require("@whiskeysockets/baileys")
const fs = require("fs")
const chalk = require("chalk")
const axios = require("axios")
const path = require("path")
const { exec } = require("child_process")
const util = require("util")
var config = require("../config.js")
const tanggal = moment.tz('Asia/Jakarta').format('DD/MM/YY')
//=============
function hitungMundurRamadhan() {
    // Tanggal Ramadhan tahun ini
    const tanggalRamadhan = moment('2024-04-13', 'YYYY-MM-DD');
    // Tanggal hari ini
    const tanggalHariIni = moment();
    
    // Hitung selisih hari antara hari ini dan tanggal Ramadhan
    const selisihHari = tanggalRamadhan.diff(tanggalHariIni, 'days');
    
    // Membuat pesan balasan
    let pesan = '';
    if (selisihHari > 0) {
        pesan = `Tinggal ${selisihHari} hari menuju Ramadhan.`;
    } else if (selisihHari === 0) {
        pesan = `Hari ini adalah hari pertama Ramadhan! Selamat menjalankan ibadah puasa.`;
    } else {
        pesan = `Ramadhan sudah berlalu. Semoga ibadah puasamu diterima.`;
    }
    
    return pesan;
}
const time2 = moment().tz('Asia/Jakarta').format('HH:mm:ss')
const func = require("../lib/function.js")
const { addSaldo, minSaldo, cekSaldo, cekKoinPerak } = require("./database/deposit");
const { addSaldo, minSaldo, cekSaldo } = require("./database/deposit");
let db_saldo = JSON.parse(fs.readFileSync("./database/saldo.json"));
//singkat
let evalOwn = ['6283842204546@s.whatsapp.net', '6283877118785@s.whatsapp.net']
var icon = fs.readFileSync("./src/dep.jpg")
const owner = JSON.parse(fs.readFileSync('./database/owner.json'))

module.exports = async(sock, m, store) => {
try {
    if (!m) return
   if (m.isBaileys) return
const content = JSON.stringify(m.message)
const from = m.key.remoteJid
const chats = (m.type === 'conversation' && m.message.conversation) ? m.message.conversation : (m.type == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (m.type == 'documentMessage') && m.message.documentMessage.caption ? m.message.documentMessage.caption : (m.type == 'videoMessage') && m.message.videoMessage.caption ? m.message.videoMessage.caption : (m.type == 'extendedTextMessage') && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text : (m.type == 'buttonsResponseMessage' && m.message.buttonsResponseMessage.selectedButtonId) ? m.message.buttonsResponseMessage.selectedButtonId : (m.type == 'templateButtonReplyMessage') && m.message.templateButtonReplyMessage.selectedId ? m.message.templateButtonReplyMessage.selectedId : '' 
if (sock.multi) {
var prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(chats) ? chats.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/gi) : '#'
} else {
if (sock.nopref) {
prefix = ''
} else {
prefix = sock.prefa
}
}
const { type, quotedMsg, mentioned, now, fromMe } = m
const quoted = m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
const args = chats.split(' ')
const command = chats.toLowerCase().split(' ')[0] || ''
const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()//Kalau mau Single prefix Lu ganti pake ini = const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
const args = body.trim().split(/ +/).slice(1)
const quoted = m.isQuoted ? m.quoted : m
const q = chats.slice(command.length + 1, chats.length)
const botNumber = sock.user.id.split(':')[0] + '@s.whatsapp.net'
const isGroup = m.key.remoteJid.endsWith('@g.us')
const sender = isGroup ? (m.key.participant ? m.key.participant : m.participant) : m.key.remoteJid
const isOwner = global.owner == sender ? true : [`${global.owner}@s.whatsapp.net`].includes(sender) ? true : false
const groupMetadata = isGroup ? await sock.groupMetadata(from) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const groupId = isGroup ? groupMetadata.id : ''
const groupMembers = isGroup ? groupMetadata.participants : ''
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
const isGroupAdmins = groupAdmins.includes(sender)
        
//baris function
const reply = (teks) => {
			sock.sendMessage(from, { text: teks }, { quoted: m })
	}
const sendContact = (jid, numbers, name, quoted, mn) => {
let number = numbers.replace(/[^0-9]/g, '')
const vcard = 'BEGIN:VCARD\n' 
			+ 'VERSION:3.0\n' 
			+ 'FN:' + name + '\n'
			+ 'ORG:;\n'
			+ 'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\n'
			+ 'END:VCARD'
			return sock.sendMessage(from, { contacts: { displayName: name, contacts: [{ vcard }] }, mentions : mn ? mn : []},{ quoted: m })
		}
const sendMess = (hehe, teks) => {
	sock.sendMessage(hehe, { text: teks })
}

const sendText = (from, teks) => {
	sock.sendMessage(from, { text: teks })
}

if (chats.startsWith("=> ") && isOwner && evalOwn) {
		console.log(chalk.green('[EVAL]'), chalk.white(`Dari Owner aowkoakwoak`))
		  const ev = (sul) => {
            var sat = JSON.stringify(sul, null, 2)
            var bang = util.format(sat)
            if (sat == undefined) {
              bang = util.format(sul)
            }
            return reply(bang)
          }
          try {
           reply(util.format(eval(`;(async () => { ${chats.slice(2)} })()`)))
          } catch (e) {
           reply(util.format(e))
          }
		} else if (chats.startsWith("$ ") && isOwner) {
        console.log(chalk.green('[EXEC]'), chalk.white(`Dari Owner aowkoakwoak`))
          exec(chats.slice(2), (err, stdout) => {
		    if (err) return reply(`${err}`)
		    if (stdout) reply(`${stdout}`)
		  })
        } else if (chats.startsWith("> ") && isOwner && evalOwn) {
	    console.log(chalk.green('[EVAL]'), chalk.white(`Dari Owner aowkaokwoak`))
		 try {
	       let evaled = await eval(chats.slice(2))
		   if (typeof evaled !== 'string') evaled = require("util").inspect(evaled)
			reply(`${evaled}`)
		 } catch (err) {
		   reply(`${err}`)
		 }
		}
		var saldo = '';
var angkarev = angka.toString().split('').reverse().join('');
for (var i = 0; i < angkarev.length; i++)
if (i % 3 == 0) saldo += angkarev.substr(i, 3) + '.';
return '' + saldo.split('', saldo.length - 1).reverse().join('');
}
		
		if (sock.mode === 'self'){
            if (!isOwner) return
        }

// log chat masuk
if (m.message && !m.isBaileys) {
console.log(chalk.white(chalk.bgBlue("DARI :")), chalk.white(m.pushName), chalk.black(chalk.yellow(sender)) + "\n" + chalk.white(chalk.bgBlue("DI :")), chalk.black(chalk.bgWhite(isGroup ? groupMetadata.subject : "Private Chat", m.from)) + "\n" + chalk.white(chalk.bgBlue("PESAN :")), chalk.black(chalk.bgWhite(m.body || m.type)))
        }
            
switch (command) {

case prefix+"menu": case prefix+"help": {
                let text = `
_*>Hello User<*_
_Bot ini masih dalam perkembangan, wajar jika fitur sedikit_

┌─────────────────────
│ _*Name:*_ _${m.pushName}_
│ _*Number:*_ _${sender.split('@')[0]}_
│ _*Rp*${toRupiah(cekSaldo(sender, db_saldo))}_
├─────────────────────
│ _*Bot Name:*_ _YUDA - MD_
│ _*Created By:*_ _YUDAMODS_
└─────────────────────

_*-MAIN MENU-*_
${prefix}owner
${prefix}sc
${prefix}menfes

_*-OWNER MENU-*_
${prefix}broadcast
> (Eval)
$ (Exec)`

sock.sendMessage(from, {text: text, contextInfo: { externalAdReply: {  title: 'YUDA - MD', body: '© YUDAMODS', thumbnail: fs.readFileSync("./src/dep.jpg"), sourceUrl: 'https://youtube.com/@YUDAMODS', mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}}, {quoted: m})
}
break
case prefix+'self':{
            if (!isOwner) return reply('Only owner')
            sock.mode = 'self'
            reply('Berhasil berubah ke mode self')
            }
            sock.sendMessage(from, {text: text, contextInfo: { externalAdReply: {  title: 'YUDA - MD', body: '© YUDAMODS', thumbnail: fs.readFileSync("./src/dep.jpg"), sourceUrl: 'https://youtube.com/@YUDAMODS', mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}}, {quoted: m})
}
            break
        case prefix+'publik': case prefix+'public':{
            if (!isOwner) return reply('Only owner')
            sock.mode = 'public'
            reply('Berhasil berubah ke mode public')
            }
            sock.sendMessage(from, {text: text, contextInfo: { externalAdReply: {  title: 'YUDA - MD', body: '© YUDAMODS', thumbnail: fs.readFileSync("./src/dep.jpg"), sourceUrl: 'https://youtube.com/@YUDAMODS', mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}}, {quoted: m})
}
            break
        case prefix+'setprefix':
            if (!isOwner) return reply('Only owner')
            if (args.length < 2) return reply(`Masukkan prefix\nOptions :\n=> multi\n=> nopref`)
            if (q === 'multi') {
                sock.multi = true
                reply(`Berhasil mengubah prefix ke ${q}`)
            } else if (q === 'nopref') {
                sock.multi = false
                sock.nopref = true
                reply(`Berhasil mengubah prefix ke ${q}`)
            } else {
                sock.multi = false
                sock.nopref = false
                sock.prefa = `${q}`
                reply(`Berhasil mengubah prefix ke ${q}`)
            }
            sock.sendMessage(from, {text: text, contextInfo: { externalAdReply: {  title: 'YUDA - MD', body: '© YUDAMODS', thumbnail: fs.readFileSync("./src/dep.jpg"), sourceUrl: 'https://youtube.com/@YUDAMODS', mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}}, {quoted: m})
}
            break
//case prefix+'sc': {
//  reply('_*Script Ini Private*_')
//  break
}
 case prefix+"owner": {
   sendContact(from, `${global.owner}@s.whatsapp.net`, 'WhyDepin', m)
 }
 break
 
case prefix+'bc': case prefix+'broadcast':
if (!isOwner) return reply('only owner')
if (args.length < 2) return reply(`Masukkan isi pesannya`)
var data = await store.chats.all()
 for (let i of data) {
 sock.sendMessage(i.id, { text: `_*🚨Broadcast🚨*_\n\n${q}` })
await func.sleep(1000)
 }
 sock.sendMessage(from, {text: text, contextInfo: { externalAdReply: {  title: 'YUDA - MD', body: '© YUDAMODS', thumbnail: fs.readFileSync("./src/dep.jpg"), sourceUrl: 'https://youtube.com/@YUDAMODS', mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}}, {quoted: m})
}
break

case prefix+'menfes': case prefix+'confes': {
if (!q) return reply('Example : ${prefix + command} 62xxx|nama|pesan')
y = q.split('|')[0]
b = q.split('|')[1]
n = q.split('|')[2]
let txt = `_Hai, ada secret message nih_\nDari: _*${b}*_\nPesan: _*${n}*_`
sock.sendMessage(`${y}@s.whatsapp.net`, {text: txt}, {quoted:m})
reply('success')
} 
break
 case 'acc': case 'addsaldo':{
if (!isOwner) return reply('only owner')
if (!q.split(",")[0]) return reply(`Ex : ${prefix+command} nomor,jumlah\n\nContoh :\n${prefix+command} 628xxx,20000`)
if (!q.split(",")[1]) return reply(`Ex : ${prefix+command} nomor,jumlah\n\nContoh :\n${prefix+command} 628xxx,20000`)
addSaldo(q.split(",")[0]+"@s.whatsapp.net", Number(q.split(",")[1]), db_saldo)
reply(`「 *SALDO USER* 」
⭔ID: @${sender.split("@")[0]}
⭔Nomer: @${q.split(",")[0]}
⭔Tanggal: ${tanggal}
⭔Saldo: Rp${toRupiah(cekSaldo(q.split(",")[0]+"@s.whatsapp.net", db_saldo))}, `)
                }
        case 'kirim': {
                    let messageText = `DONE KAK DEPOSIT SUDAH BERHASIL SEJUMLAH  ${q.split(",")[1]} TELAH DITAMBAHKAN KE SALDO ANDA CEK SALDO KETIK .SALDO TERIMAKASIH`
  let targetNumber = `${q.split(",")[0]}@s.whatsapp.net`;

  sock.sendMessage(targetNumber, {
    text: `*${messageText}*`,
    mentions: [sender]
  }, {
    quoted: yudamods
  }).then(() => {
    m.reply('Acc Berhasil Tuan✅');
  }).catch(() => {
    m.reply('Gagal mengirim pesan!');
  });
}
break
case 'cmdmenu': {
reply(`
▭▬▭▬▭▬▭▬▭▬▭▬▭▬

 ⭔${prefix}buyscbugv1
 ⭔${prefix}buyscbugv2
 ⭔${prefix}buyscbugv3
 ⭔${prefix}buyscv2
 ⭔${prefix}buyscv3
 ⭔${prefix}buyscv3subdo
 ⭔${prefix}buyscv4
 ⭔${prefix}buyscv5
 ⭔${prefix}buyscv6
 ⭔${prefix}buyscv6subdo
 ⭔${prefix}buyscv7otp
 ⭔${prefix}buyscv7addpm2
 ⭔${prefix}buyscjagagrupv1
 ⭔${prefix}buyscjagagrupv2
 ⭔${prefix}buyscpushkontak
 ⭔${prefix}buyschwv191
 ⭔${prefix}buyschwv192
 ⭔${prefix}buyschwv201
 ⭔${prefix}buyschwv202
 ⭔${prefix}buyscpanel
 ⭔${prefix}buyscpushautosave
 ⭔${prefix}buyscjpmv1
 ⭔${prefix}buyscjpmv2
 ⭔${prefix}buyscjpmv3
 ⭔${prefix}buyscvps1
 ⭔${prefix}buyscvps2
 ⭔${prefix}buyscpm2
 ⭔${prefix}buyscthemav1
 ⭔${prefix}buyscthemav2
 ⭔${prefix}buyscnowa
 ⭔${prefix}buyscwebp
 ⭔${prefix}buysctesmoni
 ⭔${prefix}buyscddos
 ⭔${prefix}buymodule`)
}
sock.sendMessage(from, {text: text, contextInfo: { externalAdReply: {  title: 'YUDA - MD', body: '© YUDAMODS', thumbnail: fs.readFileSync("./src/dep.jpg"), sourceUrl: 'https://youtube.com/@YUDAMODS', mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}}, {quoted: m})
}
break
case "buysc": case "cekharga": {
sock.sendMessage(from, {text: text, contextInfo: { externalAdReply: {  title: 'YUDA - MD', body: '© YUDAMODS', thumbnail: fs.readFileSync("./src/dep.jpg"), sourceUrl: 'https://youtube.com/@YUDAMODS', mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}}, {quoted: m})
}
const owned = `${owner}@s.whatsapp.net`
const text12 = `*Hi @${sender.split("@")[0]} 👋*
▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭
Kaga tau cara nya? ketik .cmdmenu Untuk memeriksa cmd

*Mau Buy Sc? Pilih Sc Dibawah Ini* :

*Sc Bug v1 10k*
*Sc Bug v2 25k*
*Sc Bug v3 35k*
*Sc Hw 19 15k*
*Sc Hw 19 Fitur Jpm 20k*
*Sc Hw 19 Fitur Jpm + Cpanel 25k*
*Sc Campuran v2 15k*
*Sc Campuran v3 25k*
*Sc Campuran v3 + Subdo 30k*
*Sc Campuran v4 35k*
*Sc Campuran v5 40k*
*Sc Campuran v6 60k*
*Sc Campuran v6 + Subdo 70k*
*Sc Campuran v7 + otp 75k*
*Sc Campuran v7 + addpm2 85k*
*Sc Campuran v8 90k* ( Free Panel Unli )
*Sc Cvps v1 50k*
*Sc Cvps v2 80k* ( Free Panel Unli )
*Sc Jaga Grupv1 10k*
*Sc Jaga Grupv2 15k*
*Sc Pushkontak 10k*
*Sc PushAutoSave 15k*
*Sc Jpm X PushKntk v1 15k*
*Sc Jpm X PushKntk v2 20k*
*Sc Jpm X PushKntk v3 25k*
*Sc Themav1 10k*
*Sc Themav2 15k*
*Sc Nowa 20k*
*Sc Webp 10k*
*Sc Tesmoni 15k*
*Sc Ddos 20k*
*Sc Buka Enc 15k*
*Module 15k*
*Admin Panel 15k ( Garansi 7Day )*
*All Vps ( Pm Owner )*
*Sc yg lain?,,pm admin*

*Usahakan Saldo Mu Mencukupi Ya Kak🙏*
▬▭▬▭▬▭▬▭▬▭▬▭▬`
sock.sendMessage(from, { text: text12, contextInfo: { mentionedJid: [sender, owned], forwardingScore: 9999, isForwarded: true }}, { quoted: m })
}
break        
case 'buyscpanel': {
       if (cekSaldo(sender,db_saldo) < 15000) return sock.sendMessage(from, { text: `Maaf *@${sender.split('@')[0]}*, sepertinya saldo kamu kurang dari Rp15.000 Silahkan melakukan deposit terlebih dahulu sebelum ${command}`, mentions: [sender]}, { quoted: m })
reply(`Wait Tuan Sc Sedang Kami Proses⏳`) 
                    minSaldo(sender, 15000, db_saldo)
const baby2 = await mediafireDl('https://www.mediafire.com/file/g26mwz05enfd02p/Sc+Cpanel.zip/file')
sock.sendMessage(from, { document : { url : baby2[0].link}, fileName : baby2[0].nama, mimetype: baby2[0].mime }, { quoted : m }).catch ((err) => reply('*Failed to download File*'))
}
break
                case 'buyscbugv1': {
       if (cekSaldo(sender,db_saldo) < 15000) return sock.sendMessage(from, { text: `Maaf *@${sender.split('@')[0]}*, sepertinya saldo kamu kurang dari Rp15.000 Silahkan melakukan deposit terlebih dahulu sebelum ${command}`, mentions: [sender]}, { quoted: m })
reply(`Wait Tuan Sc Sedang Kami Proses⏳`) 
                    minSaldo(sender, 15000, db_saldo)
const baby2 = await mediafireDl('https://www.mediafire.com/file/xfw5xe4mprrlrq9/Sc_Bug_V1.zip/file')
sock.sendMessage(from, { document : { url : baby2[0].link}, fileName : baby2[0].nama, mimetype: baby2[0].mime }, { quoted : m }).catch ((err) => reply('*Failed to download File*'))
}
break
                case 'buyscbugv2': {
       if (cekSaldo(sender,db_saldo) < 25000) return sock.sendMessage(from, { text: `Maaf *@${sender.split('@')[0]}*, sepertinya saldo kamu kurang dari Rp25.000 Silahkan melakukan deposit terlebih dahulu sebelum ${command}`, mentions: [sender]}, { quoted: m })
reply(`Wait Tuan Sc Sedang Kami Proses⏳`) 
                    minSaldo(sender, 25000, db_saldo)
const baby2 = await mediafireDl('https://www.mediafire.com/file/xuzamc8oayprn4k/Sc_Bug_V2.zip/file')
sock.sendMessage(from, { document : { url : baby2[0].link}, fileName : baby2[0].nama, mimetype: baby2[0].mime }, { quoted : m }).catch ((err) => reply('*Failed to download File*'))
}
break
                case 'buyscbugv3': {
       if (cekSaldo(sender,db_saldo) < 35000) return sock.sendMessage(from, { text: `Maaf *@${sender.split('@')[0]}*, sepertinya saldo kamu kurang dari Rp35.000 Silahkan melakukan deposit terlebih dahulu sebelum ${command}`, mentions: [sender]}, { quoted: m })
reply(`Wait Tuan Sc Sedang Kami Proses⏳`) 
                    minSaldo(sender, 35000, db_saldo)
const baby2 = await mediafireDl('https://www.mediafire.com/file/l76f8btgfpqln9z/Sc_Bug_V3.zip/file')
sock.sendMessage(from, { document : { url : baby2[0].link}, fileName : baby2[0].nama, mimetype: baby2[0].mime }, { quoted : m }).catch ((err) => reply('*Failed to download File*'))
}
break
                case 'buyscv2': {
       if (cekSaldo(sender,db_saldo) < 15000) return sock.sendMessage(from, { text: `Maaf *@${sender.split('@')[0]}*, sepertinya saldo kamu kurang dari Rp15.000 Silahkan melakukan deposit terlebih dahulu sebelum ${command}`, mentions: [sender]}, { quoted: m })
reply(`Wait Tuan Sc Sedang Kami Proses⏳`) 
                    minSaldo(sender, 15000, db_saldo)
const baby2 = await mediafireDl('https://www.mediafire.com/file/aji3jug4bcadtyt/Sc_v2.zip/file')
sock.sendMessage(from, { document : { url : baby2[0].link}, fileName : baby2[0].nama, mimetype: baby2[0].mime }, { quoted : m }).catch ((err) => reply('*Failed to download File*'))
}
break
                case 'buyscv3': {
       if (cekSaldo(sender,db_saldo) < 25000) return sock.sendMessage(from, { text: `Maaf *@${sender.split('@')[0]}*, sepertinya saldo kamu kurang dari Rp25.000 Silahkan melakukan deposit terlebih dahulu sebelum ${command}`, mentions: [sender]}, { quoted: m })
reply(`Wait Tuan Sc Sedang Kami Proses⏳`) 
                    minSaldo(sender, 25000, db_saldo)
const baby2 = await mediafireDl('https://www.mediafire.com/file/pxnzy1l8a8oyxb7/Sc_v3.zip/file')
sock.sendMessage(from, { document : { url : baby2[0].link}, fileName : baby2[0].nama, mimetype: baby2[0].mime }, { quoted : m }).catch ((err) => reply('*Failed to download File*'))
}
break
                case 'buyscv3subdo': {
       if (cekSaldo(sender,db_saldo) < 30000) return sock.sendMessage(from, { text: `Maaf *@${sender.split('@')[0]}*, sepertinya saldo kamu kurang dari Rp30.000 Silahkan melakukan deposit terlebih dahulu sebelum ${command}`, mentions: [sender]}, { quoted: m })
reply(`Wait Tuan Sc Sedang Kami Proses⏳`) 
                    minSaldo(sender, 30000, db_saldo)
const baby2 = await mediafireDl('https://www.mediafire.com/file/q8bzkjtt4qk8fsc/Sc_v3_Subdo.zip/file')
sock.sendMessage(from, { document : { url : baby2[0].link}, fileName : baby2[0].nama, mimetype: baby2[0].mime }, { quoted : m }).catch ((err) => reply('*Failed to download File*'))
}
break
                case 'buyscv4': {
       if (cekSaldo(sender,db_saldo) < 35000) return sock.sendMessage(from, { text: `Maaf *@${sender.split('@')[0]}*, sepertinya saldo kamu kurang dari Rp35.000 Silahkan melakukan deposit terlebih dahulu sebelum ${command}`, mentions: [sender]}, { quoted: m })
reply(`Wait Tuan Sc Sedang Kami Proses⏳`) 
                    minSaldo(sender, 35000, db_saldo)
const baby2 = await mediafireDl('https://www.mediafire.com/file/y8po44xpgjqg1g8/ScCampuranV4.zip/file')
sock.sendMessage(from, { document : { url : baby2[0].link}, fileName : baby2[0].nama, mimetype: baby2[0].mime }, { quoted : m }).catch ((err) => reply('*Failed to download File*'))
}
break
                case 'buyscv5': {
       if (cekSaldo(sender,db_saldo) < 55000) return sock.sendMessage(from, { text: `Maaf *@${sender.split('@')[0]}*, sepertinya saldo kamu kurang dari Rp55.000 Silahkan melakukan deposit terlebih dahulu sebelum ${command}`, mentions: [sender]}, { quoted: m })
reply(`Wait Tuan Sc Sedang Kami Proses⏳`) 
                    minSaldo(sender, 55000, db_saldo)
const baby2 = await mediafireDl('https://www.mediafire.com/file/7i55w043gwd39i9/Sc+v5+Full+Otomatis.zip/file')
sock.sendMessage(from, { document : { url : baby2[0].link}, fileName : baby2[0].nama, mimetype: baby2[0].mime }, { quoted : m }).catch ((err) => reply('*Failed to download File*'))
}
break
                case 'buyscv6': {
       if (cekSaldo(sender,db_saldo) < 60000) return sock.sendMessage(from, { text: `Maaf *@${sender.split('@')[0]}*, sepertinya saldo kamu kurang dari Rp60.000 Silahkan melakukan deposit terlebih dahulu sebelum ${command}`, mentions: [sender]}, { quoted: m })
reply(`Wait Tuan Sc Sedang Kami Proses⏳`) 
                    minSaldo(sender, 60000, db_saldo)
const baby2 = await mediafireDl('https://www.mediafire.com/file/6el6pwjzu1dbn60/Sc%252Bv6.zip/file')
sock.sendMessage(from, { document : { url : baby2[0].link}, fileName : baby2[0].nama, mimetype: baby2[0].mime }, { quoted : m }).catch ((err) => reply('*Failed to download File*'))
}
break
                case 'buyscv6subdo': {
       if (cekSaldo(sender,db_saldo) < 70000) return sock.sendMessage(from, { text: `Maaf *@${sender.split('@')[0]}*, sepertinya saldo kamu kurang dari Rp70.000 Silahkan melakukan deposit terlebih dahulu sebelum ${command}`, mentions: [sender]}, { quoted: m })
reply(`Wait Tuan Sc Sedang Kami Proses⏳`) 
                    minSaldo(sender, 70000, db_saldo)
const baby2 = await mediafireDl('https://www.mediafire.com/file/ivhjsn8calgpaak/Sc+v6.zip/file')
sock.sendMessage(from, { document : { url : baby2[0].link}, fileName : baby2[0].nama, mimetype: baby2[0].mime }, { quoted : m }).catch ((err) => reply('*Failed to download File*'))
}
break
                case 'buyscv7otp': {
       if (cekSaldo(sender,db_saldo) < 75000) return sock.sendMessage(from, { text: `Maaf *@${sender.split('@')[0]}*, sepertinya saldo kamu kurang dari Rp75.000 Silahkan melakukan deposit terlebih dahulu sebelum ${command}`, mentions: [sender]}, { quoted: m })
reply(`Wait Tuan Sc Sedang Kami Proses⏳`) 
                    minSaldo(sender, 75000, db_saldo)
const baby2 = await mediafireDl('https://www.mediafire.com/file/fsvfy6ia24t2ctg/Sc+v7.zip/file')
sock.sendMessage(from, { document : { url : baby2[0].link}, fileName : baby2[0].nama, mimetype: baby2[0].mime }, { quoted : m }).catch ((err) => reply('*Failed to download File*'))
}
break
                case 'buyscv7addpm2': {
       if (cekSaldo(sender,db_saldo) < 85000) return sock.sendMessage(from, { text: `Maaf *@${sender.split('@')[0]}*, sepertinya saldo kamu kurang dari Rp85.000 Silahkan melakukan deposit terlebih dahulu sebelum ${command}`, mentions: [sender]}, { quoted: m })
reply(`Wait Tuan Sc Sedang Kami Proses⏳`) 
                    minSaldo(sender, 85000, db_saldo)
const baby2 = await mediafireDl('https://www.mediafire.com/file/ucp2nsjzgm8fnzs/Sc+v7+Fitur+Addpm2.zip/file')
sock.sendMessage(from, { document : { url : baby2[0].link}, fileName : baby2[0].nama, mimetype: baby2[0].mime }, { quoted : m }).catch ((err) => reply('*Failed to download File*'))
}
break
                case 'buyscv8': {
       if (cekSaldo(sender,db_saldo) < 95000) return sock.sendMessage(from, { text: `Maaf *@${sender.split('@')[0]}*, sepertinya saldo kamu kurang dari Rp95.000 Silahkan melakukan deposit terlebih dahulu sebelum ${command}`, mentions: [sender]}, { quoted: m })
reply(`Wait Tuan Sc Sedang Kami Proses⏳`) 
                    minSaldo(sender, 9.5000, db_saldo)
const baby2 = await mediafireDl('https://www.mediafire.com/file/wgn9xu2plg46z75/Sc+Campuran+v8.zip/file')
sock.sendMessage(from, { document : { url : baby2[0].link}, fileName : baby2[0].nama, mimetype: baby2[0].mime }, { quoted : m }).catch ((err) => reply('*Failed to download File*'))
}
break
                case 'buyscjagagrupv1': {
       if (cekSaldo(sender,db_saldo) < 10000) return sock.sendMessage(from, { text: `Maaf *@${sender.split('@')[0]}*, sepertinya saldo kamu kurang dari Rp10.000 Silahkan melakukan deposit terlebih dahulu sebelum ${command}`, mentions: [sender]}, { quoted: m })
reply(`Wait Tuan Sc Sedang Kami Proses⏳`) 
                    minSaldo(sender, 10000, db_saldo)
const baby2 = await mediafireDl('https://www.mediafire.com/file/jaxgd3mdrxjkszb/Sc_Jaga_Grup.zip/file')
sock.sendMessage(from, { document : { url : baby2[0].link}, fileName : baby2[0].nama, mimetype: baby2[0].mime }, { quoted : m }).catch ((err) => reply('*Failed to download File*'))
}
break
                case 'buyscjagagrupv2': {
       if (cekSaldo(sender,db_saldo) < 15000) return sock.sendMessage(from, { text: `Maaf *@${sender.split('@')[0]}*, sepertinya saldo kamu kurang dari Rp15.000 Silahkan melakukan deposit terlebih dahulu sebelum ${command}`, mentions: [sender]}, { quoted: m })
reply(`Wait Tuan Sc Sedang Kami Proses⏳`) 
                    minSaldo(sender, 15000, db_saldo)
const baby2 = await mediafireDl('https://www.mediafire.com/file/fnbxdwor0ldky84/JagaGrup+V2.zip/file')
sock.sendMessage(from, { document : { url : baby2[0].link}, fileName : baby2[0].nama, mimetype: baby2[0].mime }, { quoted : m }).catch ((err) => reply('*Failed to download File*'))
}
break
                case 'buyscpushkontak': {
       if (cekSaldo(sender,db_saldo) < 10000) return sock.sendMessage(from, { text: `Maaf *@${sender.split('@')[0]}*, sepertinya saldo kamu kurang dari Rp10.000 Silahkan melakukan deposit terlebih dahulu sebelum ${command}`, mentions: [sender]}, { quoted: m })
reply(`Wait Tuan Sc Sedang Kami Proses⏳`) 
                    minSaldo(sender, 10000, db_saldo)
const baby2 = await mediafireDl('https://www.mediafire.com/file/xdh4ocswkkt7tt2/BotSaveContact.zip/file')
sock.sendMessage(from, { document : { url : baby2[0].link}, fileName : baby2[0].nama, mimetype: baby2[0].mime }, { quoted : m }).catch ((err) => reply('*Failed to download File*'))
}
break
                case 'buyschwv191': {
       if (cekSaldo(sender,db_saldo) < 20000) return sock.sendMessage(from, { text: `Maaf *@${sender.split('@')[0]}*, sepertinya saldo kamu kurang dari Rp20.000 Silahkan melakukan deposit terlebih dahulu sebelum ${command}`, mentions: [sender]}, { quoted: m })
reply(`Wait Tuan Sc Sedang Kami Proses⏳`) 
                    minSaldo(sender, 20000, db_saldo)
const baby2 = await mediafireDl('https://www.mediafire.com/file/6kfjfrh6zdsh0yt/Sc+Hw+19+By+Rafathar+Offcial.zip/file')
sock.sendMessage(from, { document : { url : baby2[0].link}, fileName : baby2[0].nama, mimetype: baby2[0].mime }, { quoted : m }).catch ((err) => reply('*Failed to download File*'))
}
break
                case 'buyschwv192': {
       if (cekSaldo(sender,db_saldo) < 25000) return sock.sendMessage(from, { text: `Maaf *@${sender.split('@')[0]}*, sepertinya saldo kamu kurang dari Rp25.000 Silahkan melakukan deposit terlebih dahulu sebelum ${command}`, mentions: [sender]}, { quoted: m })
reply(`Wait Tuan Sc Sedang Kami Proses⏳`) 
                    minSaldo(sender, 25000, db_saldo)
const baby2 = await mediafireDl('https://www.mediafire.com/file/xgsig9ks6frk33f/Sc+Hw+19+Campuran.zip/file')
sock.sendMessage(from, { document : { url : baby2[0].link}, fileName : baby2[0].nama, mimetype: baby2[0].mime }, { quoted : m }).catch ((err) => reply('*Failed to download File*'))
}
break
                case 'buyschwv201': {
       if (cekSaldo(sender,db_saldo) < 30000) return sock.sendMessage(from, { text: `Maaf *@${sender.split('@')[0]}*, sepertinya saldo kamu kurang dari Rp30.000 Silahkan melakukan deposit terlebih dahulu sebelum ${command}`, mentions: [sender]}, { quoted: m })
reply(`Wait Tuan Sc Sedang Kami Proses⏳`) 
                    minSaldo(sender, 30000, db_saldo)
const baby2 = await mediafireDl('https://www.mediafire.com/file/ms5ku2ln12eejys/Hw+v20+Enc.zip/file')
sock.sendMessage(from, { document : { url : baby2[0].link}, fileName : baby2[0].nama, mimetype: baby2[0].mime }, { quoted : m }).catch ((err) => reply('*Failed to download File*'))
}
break
                case 'buyschwv202': {
       if (cekSaldo(sender,db_saldo) < 45000) return sock.sendMessage(from, { text: `Maaf *@${sender.split('@')[0]}*, sepertinya saldo kamu kurang dari Rp45.000 Silahkan melakukan deposit terlebih dahulu sebelum ${command}`, mentions: [sender]}, { quoted: m })
reply(`Wait Tuan Sc Sedang Kami Proses⏳`) 
                    minSaldo(sender, 45000, db_saldo)
const baby2 = await mediafireDl('https://www.mediafire.com/file/r1ua56cc5gtiu4t/Hw+v20+No+Enc.zip/file')
sock.sendMessage(from, { document : { url : baby2[0].link}, fileName : baby2[0].nama, mimetype: baby2[0].mime }, { quoted : m }).catch ((err) => reply('*Failed to download File*'))
}
break               
                case 'buyschwv21': {
       if (cekSaldo(sender,db_saldo) < 45000) return sock.sendMessage(from, { text: `Maaf *@${sender.split('@')[0]}*, sepertinya saldo kamu kurang dari Rp45.000 Silahkan melakukan deposit terlebih dahulu sebelum ${command}`, mentions: [sender]}, { quoted: m })
reply(`Wait Tuan Sc Sedang Kami Proses⏳`) 
                    minSaldo(sender, 45000, db_saldo)
const baby2 = await mediafireDl('https://www.mediafire.com/file/hkle716qtcnrs5f/Sc+Hw21+No+Enc.zip/file')
sock.sendMessage(from, { document : { url : baby2[0].link}, fileName : baby2[0].nama, mimetype: baby2[0].mime }, { quoted : m }).catch ((err) => reply('*Failed to download File*'))
}
break
                case 'buyschwv21noscan': {
       if (cekSaldo(sender,db_saldo) < 65000) return sock.sendMessage(from, { text: `Maaf *@${sender.split('@')[0]}*, sepertinya saldo kamu kurang dari Rp65.000 Silahkan melakukan deposit terlebih dahulu sebelum ${command}`, mentions: [sender]}, { quoted: m })
reply(`Wait Tuan Sc Sedang Kami Proses⏳`) 
                    minSaldo(sender, 65000, db_saldo)
const baby2 = await mediafireDl('https://www.mediafire.com/file/t4t9kboxbhmbosl/Sc+Hw21+No+Enc+No+Scan.zip/file')
sock.sendMessage(from, { document : { url : baby2[0].link}, fileName : baby2[0].nama, mimetype: baby2[0].mime }, { quoted : m }).catch ((err) => reply('*Failed to download File*'))
}
break
                case 'buyscnoscan': {
       if (cekSaldo(sender,db_saldo) < 55000) return sock.sendMessage(from, { text: `Maaf *@${sender.split('@')[0]}*, sepertinya saldo kamu kurang dari Rp55.000 Silahkan melakukan deposit terlebih dahulu sebelum ${command}`, mentions: [sender]}, { quoted: m })
reply(`Wait Tuan Sc Sedang Kami Proses⏳`) 
                    minSaldo(sender, 55000, db_saldo)
const baby2 = await mediafireDl('https://www.mediafire.com/file/ysbnrwngzf74dp4/Sc+No+Scan.zip/file')
sock.sendMessage(from, { document : { url : baby2[0].link}, fileName : baby2[0].nama, mimetype: baby2[0].mime }, { quoted : m }).catch ((err) => reply('*Failed to download File*'))
}
break
                case 'buyscscan': {
       if (cekSaldo(sender,db_saldo) < 45000) return sock.sendMessage(from, { text: `Maaf *@${sender.split('@')[0]}*, sepertinya saldo kamu kurang dari Rp45.000 Silahkan melakukan deposit terlebih dahulu sebelum ${command}`, mentions: [sender]}, { quoted: m })
reply(`Wait Tuan Sc Sedang Kami Proses⏳`) 
                    minSaldo(sender, 45000, db_saldo)
const baby2 = await mediafireDl('https://www.mediafire.com/file/oolon4sp4t5iupq/null.zip/file')
sock.sendMessage(from, { document : { url : baby2[0].link}, fileName : baby2[0].nama, mimetype: baby2[0].mime }, { quoted : m }).catch ((err) => reply('*Failed to download File*'))
}
break
         case 'buyscpushautosave': {
       if (cekSaldo(sender,db_saldo) < 15000) return sock.sendMessage(from, { text: `Maaf *@${sender.split('@')[0]}*, sepertinya saldo kamu kurang dari Rp15.000 Silahkan melakukan deposit terlebih dahulu sebelum ${command}`, mentions: [sender]}, { quoted: m })
reply(`Wait Tuan Sc Sedang Kami Proses⏳`) 
                    minSaldo(sender, 15000, db_saldo)
const baby2 = await mediafireDl('https://www.mediafire.com/file/yousxcwwv5cjj0p/SC+PUSH+SIMPLE+BY+RAFATHAR+OFFCIAL.zip/file')
sock.sendMessage(from, { document : { url : baby2[0].link}, fileName : baby2[0].nama, mimetype: baby2[0].mime }, { quoted : m }).catch ((err) => reply('*Failed to download File*'))
}
break
                case 'buyscvps1': {
       if (cekSaldo(sender,db_saldo) < 50000) return sock.sendMessage(from, { text: `Maaf *@${sender.split('@')[0]}*, sepertinya saldo kamu kurang dari Rp50.000 Silahkan melakukan deposit terlebih dahulu sebelum ${command}`, mentions: [sender]}, { quoted: m })
reply(`Wait Tuan Sc Sedang Kami Proses⏳`) 
                    minSaldo(sender, 50000, db_saldo)
const baby2 = await mediafireDl('https://www.mediafire.com/file/m15hcg29acbocu8/Cvps+x+cpanel.zip/file')
sock.sendMessage(from, { document : { url : baby2[0].link}, fileName : baby2[0].nama, mimetype: baby2[0].mime }, { quoted : m }).catch ((err) => reply('*Failed to download File*'))
}
break
                case 'buyscvps2': {
       if (cekSaldo(sender,db_saldo) < 80000) return sock.sendMessage(from, { text: `Maaf *@${sender.split('@')[0]}*, sepertinya saldo kamu kurang dari Rp80.000 Silahkan melakukan deposit terlebih dahulu sebelum ${command}`, mentions: [sender]}, { quoted: m })
reply(`Wait Tuan Sc Sedang Kami Proses⏳`) 
                    minSaldo(sender, 80000, db_saldo)
const baby2 = await mediafireDl('https://www.mediafire.com/file/e82vlln6hgrb5eq/Cvps+x+cpanel+v2.zip/file')
sock.sendMessage(from, { document : { url : baby2[0].link}, fileName : baby2[0].nama, mimetype: baby2[0].mime }, { quoted : m }).catch ((err) => reply('*Failed to download File*'))
}
break
                case 'buyscjpmv1': {
       if (cekSaldo(sender,db_saldo) < 15000) return sock.sendMessage(from, { text: `Maaf *@${sender.split('@')[0]}*, sepertinya saldo kamu kurang dari Rp15.000 Silahkan melakukan deposit terlebih dahulu sebelum ${command}`, mentions: [sender]}, { quoted: m })
reply(`Wait Tuan Sc Sedang Kami Proses⏳`) 
                    minSaldo(sender, 15000, db_saldo)
const baby2 = await mediafireDl('https://www.mediafire.com/file/bdtbszlg69old31/Jpm+X+PushKntk+V1.zip/file')
sock.sendMessage(from, { document : { url : baby2[0].link}, fileName : baby2[0].nama, mimetype: baby2[0].mime }, { quoted : m }).catch ((err) => reply('*Failed to download File*'))
}
break
                case 'buyscjpmv2': {
       if (cekSaldo(sender,db_saldo) < 20000) return sock.sendMessage(from, { text: `Maaf *@${sender.split('@')[0]}*, sepertinya saldo kamu kurang dari Rp20.000 Silahkan melakukan deposit terlebih dahulu sebelum ${command}`, mentions: [sender]}, { quoted: m })
reply(`Wait Tuan Sc Sedang Kami Proses⏳`) 
                    minSaldo(sender, 20000, db_saldo)
const baby2 = await mediafireDl('https://www.mediafire.com/file/ilam1m6wsgxqh6b/Jpm+X+PushKntk+V2.zip/file')
sock.sendMessage(from, { document : { url : baby2[0].link}, fileName : baby2[0].nama, mimetype: baby2[0].mime }, { quoted : m }).catch ((err) => reply('*Failed to download File*'))
}
break
                case 'buyscjpmv3': {
       if (cekSaldo(sender,db_saldo) < 25000) return sock.sendMessage(from, { text: `Maaf *@${sender.split('@')[0]}*, sepertinya saldo kamu kurang dari Rp25.000 Silahkan melakukan deposit terlebih dahulu sebelum ${command}`, mentions: [sender]}, { quoted: m })
reply(`Wait Tuan Sc Sedang Kami Proses⏳`) 
                    minSaldo(sender, 25000, db_saldo)
const baby2 = await mediafireDl('https://www.mediafire.com/file/o1sj4k0aeb2frm0/Jpm+X+PushKntk+V3.zip/file')
sock.sendMessage(from, { document : { url : baby2[0].link}, fileName : baby2[0].nama, mimetype: baby2[0].mime }, { quoted : m }).catch ((err) => reply('*Failed to download File*'))
}
break
                case 'buyscthemav1': {
       if (cekSaldo(sender,db_saldo) < 10000) return sock.sendMessage(from, { text: `Maaf *@${sender.split('@')[0]}*, sepertinya saldo kamu kurang dari Rp10.000 Silahkan melakukan deposit terlebih dahulu sebelum ${command}`, mentions: [sender]}, { quoted: m })
reply(`Wait Tuan Sc Sedang Kami Proses⏳`) 
                    minSaldo(sender, 10000, db_saldo)
const baby2 = await mediafireDl('https://www.mediafire.com/file/yvedxy122ewg10e/Sc+Thema+Panel.zip/file')
sock.sendMessage(from, { document : { url : baby2[0].link}, fileName : baby2[0].nama, mimetype: baby2[0].mime }, { quoted : m }).catch ((err) => reply('*Failed to download File*'))
}
break
                case 'buyscthemav2': {
       if (cekSaldo(sender,db_saldo) < 15000) return sock.sendMessage(from, { text: `Maaf *@${sender.split('@')[0]}*, sepertinya saldo kamu kurang dari Rp15.000 Silahkan melakukan deposit terlebih dahulu sebelum ${command}`, mentions: [sender]}, { quoted: m })
reply(`Sabar`) 
                    minSaldo(sender, 15000, db_saldo)
const baby2 = await mediafireDl('https://www.mediafire.com/file/hannff11mbawc34/temaptero.zip/file')
sock.sendMessage(from, { document : { url : baby2[0].link}, fileName : baby2[0].nama, mimetype: baby2[0].mime }, { quoted : m }).catch ((err) => reply('*Failed to download File*'))
}
break
                case 'buyscnowa': {
       if (cekSaldo(sender,db_saldo) < 20000) return sock.sendMessage(from, { text: `Maaf *@${sender.split('@')[0]}*, sepertinya saldo kamu kurang dari Rp20.000 Silahkan melakukan deposit terlebih dahulu sebelum ${command}`, mentions: [sender]}, { quoted: m })
reply(`Sabar`) 
                    minSaldo(sender, 20000, db_saldo)
const baby2 = await mediafireDl('https://www.mediafire.com/file/gzy6qhjk9tkv46z/Nowa.zip/file')
sock.sendMessage(from, { document : { url : baby2[0].link}, fileName : baby2[0].nama, mimetype: baby2[0].mime }, { quoted : m }).catch ((err) => reply('*Failed to download File*'))
}
break
                case 'buyscwebp': {
       if (cekSaldo(sender,db_saldo) < 10000) return sock.sendMessage(from, { text: `Maaf *@${sender.split('@')[0]}*, sepertinya saldo kamu kurang dari Rp10.000 Silahkan melakukan deposit terlebih dahulu sebelum ${command}`, mentions: [sender]}, { quoted: m })
reply(`Sabar`) 
                    minSaldo(sender, 10000, db_saldo)
const baby2 = await mediafireDl('https://www.mediafire.com/file/i5fgc58laqm1vp8/SC+BOT+WEBP.zip/file')
sock.sendMessage(from, { document : { url : baby2[0].link}, fileName : baby2[0].nama, mimetype: baby2[0].mime }, { quoted : m }).catch ((err) => reply('*Failed to download File*'))
}
break
                case 'buysctesmoni': {
       if (cekSaldo(sender,db_saldo) < 15000) return sock.sendMessage(from, { text: `Maaf *@${sender.split('@')[0]}*, sepertinya saldo kamu kurang dari Rp15.000 Silahkan melakukan deposit terlebih dahulu sebelum ${command}`, mentions: [sender]}, { quoted: m })
reply(`Sabar`) 
                    minSaldo(sender, 15000, db_saldo)
const baby2 = await mediafireDl('https://www.mediafire.com/file/0f0vjjdb6rtye1p/TESTIMONI.zip/file')
sock.sendMessage(from, { document : { url : baby2[0].link}, fileName : baby2[0].nama, mimetype: baby2[0].mime }, { quoted : m }).catch ((err) => reply('*Failed to download File*'))
}
break
                case 'buyscddos': {
       if (cekSaldo(sender,db_saldo) < 20000) return sock.sendMessage(from, { text: `Maaf *@${sender.split('@')[0]}*, sepertinya saldo kamu kurang dari Rp20.000 Silahkan melakukan deposit terlebih dahulu sebelum ${command}`, mentions: [sender]}, { quoted: m })
reply(`Sabar`) 
                    minSaldo(sender, 20000, db_saldo)
const baby2 = await mediafireDl('https://www.mediafire.com/file/o4cbc7vejqujeo7/sc+ddos.zip/file')
sock.sendMessage(from, { document : { url : baby2[0].link}, fileName : baby2[0].nama, mimetype: baby2[0].mime }, { quoted : m }).catch ((err) => reply('*Failed to download File*'))
}
break
                case 'buymodule': {
       if (cekSaldo(sender,db_saldo) < 15000) return sock.sendMessage(from, { text: `Maaf *@${sender.split('@')[0]}*, sepertinya saldo kamu kurang dari Rp15.000 Silahkan melakukan deposit terlebih dahulu sebelum ${command}`, mentions: [sender]}, { quoted: m })
reply(`Wait Tuan Sc Sedang Kami Proses⏳`) 
                    minSaldo(sender, 15000, db_saldo)
const baby2 = await mediafireDl('https://www.mediafire.com/file/h931yeyrzkyr91e/node_modules.zip/file')
sock.sendMessage(from, { document : { url : baby2[0].link}, fileName : baby2[0].nama, mimetype: baby2[0].mime }, { quoted : m }).catch ((err) => reply('*Failed to download File*'))
}
break
                case 'buyscpm2': {
       if (cekSaldo(sender,db_saldo) < 45000) return sock.sendMessage(from, { text: `Maaf *@${sender.split('@')[0]}*, sepertinya saldo kamu kurang dari Rp45.000 Silahkan melakukan deposit terlebih dahulu sebelum ${command}`, mentions: [sender]}, { quoted: m })
reply(`Wait Tuan Sc Sedang Kami Proses⏳`) 
                    minSaldo(sender, 45000, db_saldo)
const baby2 = await mediafireDl('https://www.mediafire.com/file/bj4ram64qu6j1ao/Sc+Pm2.zip/file')
sock.sendMessage(from, { document : { url : baby2[0].link}, fileName : baby2[0].nama, mimetype: baby2[0].mime }, { quoted : m }).catch ((err) => reply('*Failed to download File*'))
}
break    

}
 } catch (e) {
        console.log(util.format(e))
    }
}
