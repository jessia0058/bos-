const Discord = require("discord.js");
const totika = require("../totika.json");


module.exports.run = async (client, message, args) => {
  const vkseslikanal = message.guild.channels.filter(c => c.type === "voice").filter(c => c.parentID === totika.vkoda);
  let vkseslisayı = 0;
  for (const [id, voiceChannel] of vkseslikanal)
    vkseslisayı += voiceChannel.members.size;
  
    const publicoda = message.guild.channels.filter(c => c.type === "voice").filter(c => c.parentID === totika.publicoda);
  let pubses = 0;
  for (const [id, voiceChannel] of publicoda)
    pubses += voiceChannel.members.size;
  
      const sesli = message.guild.channels.filter(c => c.type === "voice")
  let topses = 0;
  for (const [id, voiceChannel] of sesli)
    topses += voiceChannel.members.size;
  
        const dcsesli = message.guild.channels.filter(c => c.type === "voice").filter(c => c.parentID === totika.dcoda);
  let dckanalsesli = 0;
  for (const [id, voiceChannel] of dcsesli)
    dckanalsesli += voiceChannel.members.size;
  
  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")

    .setAuthor(message.author.tag , message.author.avatarURL)
    .setDescription(`Şuan da toplam ${topses} kişi seslide! \n toplam sunucuda ${message.guild.memberCount} kişi bulunmakta.\n`)

  message.channel.sendEmbed(embed);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "say",
  description: "say",
  usage: "say"
};