//consts (for glitch)
// GEREKLİ YERLER
const express = require('express');
const app = express();
const totika = require("./totika.json");
// GEREKLİ YERLER
// -------------------------------------------------------------
const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
const Jimp = require('jimp');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(aliases => {
      client.aliases.set(aliases, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

  client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};



//////////////////
client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});








client.login(ayarlar.token);



client.on('ready', () => {
  client.user.setPresence({
      game: {
          name: `Êl Châpø`,
          type: 'PLAYING',
          //url: 'https://www.twitch.tv/gifwork'
          // Değerler:
          // PLAYING: Oynuyor
          // WATCHING: İzliyor
          // LISTENING: Dinliyor
          // STREAMING : Yayında
      },
            status: 'dnd'	
      // Değerler:
      // online: Çevrimiçi
      // dnd: Rahatsız Etmeyin
      // idle: Boşta
  })
})




  


client.on('message', async message => {
   if(message.author.bot || message.channel.type === "dm") return;
            if(message.content.includes('!tag')){
              [message.channel.send(totika.tag)] 
       }
})


client.on('message', async message => {
   if(message.author.bot || message.channel.type === "dm") return;
            if(message.content.includes('!link')){
              [message.channel.send(totika.link)] 
       }
})



let modülcük = require('moment')
let mese = require('parse-ms') // bura
modülcük.locale('tr')
client.on('guildMemberAdd', async(member) =>{
  const emoji = (client.emojis.find("name", "bsonsuzluk"))
  var msg = member
  var üyesayısı = msg.guild.members.size.toString().replace(/ /g, "    ")
  var üs = üyesayısı.match(/([0-9])/g)
  üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
  if(üs) {
    üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
      return {
    "1": "<a:sayicik_1:730037608712765562>",
        "2": "<a:sayicik_2:730037602710716477>", 
        "3": "<a:sayicik_3:730037595731525673>",
        "4": "<a:sayicik_4:730037589834334262>",
        "5": "<a:sayicik_5:730037584025092097>",
        "6": "<a:sayicik_6:730037578560176138>",
        "7": "<a:sayicik_7:730037572461527120>",
        "8": "<a:sayicik_8:730037567285624853>",
        "9": "<a:sayicik_9:730037560331730975>",
        "0": "<a:sayicik_0:730037613666500689>"}[d];
      })
    }
  let kanal = totika.welcome
 let kyt = totika.kayıtsorumlusu
  let kanalcik = client.channels.get(kanal)
  let tarih = modülcük(member.user.createdAt).format('DD MM YYYY')
  let geçen = mese(Date.now()- member.user.createdTimestamp)
let saniye = geçen.seconds
let dakika = geçen.minutes
let saat = geçen.hours
let gün = geçen.days
let nekdr = saniye + ' Saniye '
if(gün>0) nekdr =gün+' Gün '+saat+' Saat '+ dakika+' Dakika '+saniye+' Saniye ' 
else if(saat>0) nekdr =saat+' Saat '+ dakika+' Dakika '+saniye+' Saniye ' 
else if(dakika>0) nekdr =dakika+' Dakika '+saniye+' Saniye ' 
let guvenlik = 'Hesapı Kayıt Olmaya Uygundur.'
  var x = modülcük(member.user.createdAt)
    .add(7, "days")
    .fromNow();
   x = x.replace("birkaç saniye önce", " ");
  if (!x.includes("önce") || x.includes("sonra") || x == " ") x = 'Güvensiz! '+ x, guvenlik = 'Hesapı Kayıt Olmaya Uygun Değildir.'
  console.log(x)
  //guvenlik = 'Güvenli' 
  //kanalcik.send(' Hoşgeldin ('+member+'- \`'+member.id+'\`) Seninle beraber '+üyesayısı.toString()+ ' kişiyiz, Kaydınızın yapılması için ses teyit odasına girmeniz gerekli. \n kanalından sunucu kurallarımızı okumayı ihmal etme! Discordda katılma tarihi: '+nekdr+' \n <@&753272474879393932>, <@&723996660346257430>, <@&723996661415804948> 'n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬)                                

  
kanalcik.send('▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ \n'+ emoji + ' **BlackStonk** sunucusuna hoşgeldin '+ member +', ailemiz seninle birlikte **'+ msg.guild.members.size +'** kişi oldu! \n'+ emoji +' Kaydınızın yapılması için ses teyit odasına girmeniz gerekli. \n'+ emoji +' Hesabının kuruluşundan bu yana **'+nekdr+'**Olmuş! \n'+ emoji +' '+guvenlik+' \n'+ emoji +' <@&'+ kyt +'> sizinle ilgilenicektir iyi eğlenceler.\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬')                                
})

const ms = require("parse-ms");
const db = require("quick.db");
client.on("message", async message => {
  
  if(message.author.bot) return;
  if(!message.guild) return;
  if(message.content.includes(`${prefix}afk`)) return;
  
  if(await db.fetch(`afk_${message.author.id}`)) {
    db.delete(`afk_${message.author.id}`);
    db.delete(`afk_süre_${message.author.id}`);
    message.reply("Başarıyla afk modundan çıktınız.");
    const buseafk = message.member.displayName.replace("[AFK]","")
message.member.setNickname(buseafk)
  }
  
  var USER = message.mentions.users.first();
  if(!USER) return;
  var REASON = await db.fetch(`afk_${USER.id}`);
  
  if(REASON) {
    let süre = await db.fetch(`afk_süre_${USER.id}`);
    let timeObj = ms(Date.now() - süre);
    //`${USER.tag} kullanıcısı AFK\n AFK süresi: ${timeObj.hours}h ${timeObj.minutes}m ${timeObj.seconds}s\nSebep:\n **${REASON}**`
    let emb = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('• Afk Sistemi')
    .setFooter('Developer By Êl Châpø.')
    .setTimestamp()
    .setDescription(`**<@${USER.id}> Adlı Kullanıcı Afk! \n AFK Süresi: ${timeObj.hours}h ${timeObj.minutes}m ${timeObj.seconds}s \n Sebep : ${REASON}**`)
message.channel.send(emb)
  }
});


client.on("userUpdate", async(old, nev) => {
  if(old.username !== nev.username) {
  if(!nev.username.includes(totika.tag) && client.guilds.get(totika.sunucu).members.get(nev.id).roles.has(totika.ototagrol)) {
     client.guilds.get(totika.sunucu).members.get(nev.id).removeRole(totika.ototagrol)




    let embed1 = new Discord.RichEmbed()
            .setColor("RANDOM")
			.setAuthor('• Tag Rolü Alındı!')
            .setDescription(`**${nev}, "${totika.tag}" tagını Çıkartığı için bot Tarafından <@&${totika.ototagrol}> rolü alındı!**`)
                
              
             
        client.channels.get(totika.ototagkanal).send(embed1)
    } 

     if(nev.username.includes(totika.tag) && !client.guilds.get(totika.sunucu).members.get(nev.id).roles.has(totika.ototagrol)) {  


       let embed1 = new Discord.RichEmbed()
            .setColor("RANDOM")
			.setAuthor('• Tag Rolü Verildi!')
            .setDescription(`**${nev}, "${totika.tag}" tagını aldığı için bot Tarafından <@&${totika.ototagrol}> rolü verildi!**`)
                
              
            
        client.channels.get(totika.ototagkanal).send(embed1)
      client.guilds.get(totika.sunucu).members.get(nev.id).addRole(totika.ototagrol)
     }
  }
  })



  client.on('guildMemberAdd' , async member => {
    let j = await db.fetch(`jail_${member.guild.id}_${member.id}`)
    if(j === 'var') {
        member.addRole(totika.cezalırol)
        member.removeRole(totika.kayıtsız)		//cezalı rol ıd
        
    let kanal = client.channels.get("743956033117880330") //log kanal ıd.
	    let emb = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('• Cezalı')
    .setDescription(`**${member} Adlı Kullanıcı \`Cezalı\`lıda Kayıtlı Olduğu İçin Sizi Tekrardan Cezalıya Attım! `)
message.channel.send(kanal)
member.send(`${member} sunucumuza hoşgeldiniz sen onceden jailde oldugun için seni yeniden jaile atmak zorunda kaldım.`)
}
})


client.on("guildMemberAdd", member => {
  let sChannel = member.guild.channels.find(c => c.id === totika.welcome)
  var moment = require("moment")
  require("moment-duration-format")
  const emoji = (client.emojis.find("name", "totika"))
  moment.locale("tr")
   var {Permissions} = require('discord.js');
   var x = moment(member.user.createdAt).add(7, 'days').fromNow()
   var user = member.user
   x = x.replace("birkaç saniye önce", " ")
   if(!x.includes("önce") ||x.includes("sonra") || x == " ") {
   var rol = member.guild.roles.get(totika.şüphelihesap)
   var kayıtsız = member.guild.roles.get(totika.kayıtsız)
   member.addRole(rol)
   member.send("** "+emoji+" Merhaba , Hesabınız 7 Günden Önce Açıldığı İçin Hesapınıza __Süpheli__ Rolü Verilmiştir. 7 Gün Sonra Kayıt Olabilirsiniz.")
  const embed = new Discord.RichEmbed()
  .setTitle(`• Şüpheli Hesap`)
  .setColor("RANDOM")
  .setDescription(`** ${emoji} ${member} Hoşgeldin **7** Günden Önce Açıldığı İçin Seni Cezalıya Attım!**`)
  sChannel.send(embed) 
setTimeout(() => {

        member.removeRole(kayıtsız.id);

}, 1000)



   }
        else {

        }
    });

    client.on('guildMemberAdd', async member => {

      member.send(`https://discord.gg/jqZWneV `)
    })  
    
    
    client.on("ready", () => {
  client.channels.get("762437447874773003").join();
});