const { RichEmbed } = require('discord.js')
const db = require('quick.db')
const totika = require("../totika.json");
exports.run = async(client, message, args) => {
  console.log(args)

        let tag = "ꉈ"
        let isim = args[1]
        let yas = args[2]

        let member = message.guild.member(message.mentions.members.first() || message.guild.members.get(args[0]))

  if(!message.member.roles.get(totika.kayıtsorumlusu) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send()

        if (!member) return message.reply('Kayıt edebilmek için birini etiketlemelisin!')
        if (!isim) return message.reply('Birini kayıt edebilmek için öncelikle isim girmelisin!').then(m => m.delete(5000))
        if (!yas) return message.reply('Yaş girmelisiniz.')

        isim = `${tag} ${isim.substr(0,1).toUpperCase()+isim.substr(1,isim.length)} ' ${yas}`
        
        console.log(isim)
        

        member.setNickname(isim).catch(() => { console.log("İsmi değiştirirken sorun oluştu.") })

        let veri = await db.get(`${message.guild.id}.${member.id}.kayıt`)
        
        console.log(veri)

        let erkekRol = message.guild.roles.get("753272500363985068")
        let erkekRol2 = message.guild.roles.get("753272501488058548")
        let kayıtsız = message.guild.roles.get("753272507036860497")
        if (!veri) {
            db.set(`${message.guild.id}.${member.id}.kayıt`, { cinsiyet: [erkekRol.toString()], isimyas: [`${isim}`] })
        } else {
            veri.cinsiyet.push(erkekRol.toString())
            veri.isimyas.push(isim)
            db.set(`${message.guild.id}.${member.id}.kayıt`, veri)
        }


        const embed = new RichEmbed()
            .setColor("RANDOM")
            .setAuthor(message.author.tag, message.author.avatarURL)

        if (!veri) {
            embed.setDescription(`${member} kişisinin ismi başarıyla **"${isim}"** olarak değiştirildi, kayıt işlemi başarılı.`) //maplama kısmı
        } else {
            embed.setDescription(`${member} kişisinin ismi başarıyla **"${isim}"** olarak değiştirildi, bu üye daha önce bu isimlerde kayıt olmuş.
    
<:toti:753399714350628976> Kişinin toplamda ${veri.isimyas.length} isim kaydı bulundu
${veri.isimyas.map((r, index) => `\`\`${r}\`\`(${veri.cinsiyet[index++]})`).join('\n')}`)
    }

member.removeRole(kayıtsız.id)
    member.addRole(erkekRol.id)
    member.addRole(erkekRol2.id)
    message.channel.send(embed)
} 

exports.conf = {
    enabled: true,
    aliases: ["e"],
    guildOnly: false,
    permLevel: 0
  };
  
  exports.help = {
    name: 'erkek',
    description: 'Bir üyeye erkek olarak kayıt eder.',
    usage: '<@üye> <isim> <yaş>',
    examples: '@blackparadoxz Sabri 19'
  };