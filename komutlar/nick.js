const Discord = require('discord.js');
const totika = require("../totika.json");
exports.run = async (client, message, args) => {

 if (!message.member.roles.has(totika.kayıtsorumlusu) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send()
  let member = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  let isim = args.slice(1).join(" ' ")
  if (!member) return message.channel.sendEmbed(new Discord.RichEmbed().setAuthor(message.author.tag ,message.author.avatarURL).setDescription(`Kullanıcıyı Etiketleyerek ismini Değişebilirsiniz.,veya id ile kayıt edin. \n • **Örnek :** \n\n \`.nick @etiket isim yaş\``).setColor("RANDOM"));
  if (!isim)  return message.channel.sendEmbed(new Discord.RichEmbed().setAuthor(message.author.tag ,message.author.avatarURL).setDescription(`Kullancının İsmini Yazmadın.`).setColor("RANDOM"));
  member.setNickname(`${totika.tag} ${isim}`)
  const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor(message.author.tag, message.author.avatarURL)
  .setDescription(`${member} Kullancının ismi \`${totika.tag} ${isim}\` Olarak başarı ile değişti!`)
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['isim'],
  permLevel: 0
}
exports.help = {
  name: 'nick',
  description: "Birinin nickini değiştirir.",
  usage: 'nick <yeni nick>'
}