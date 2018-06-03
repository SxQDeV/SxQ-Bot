const Discord = require('discord.js');
const moment = require('moment');

exports.run = async (client, message, args) => {

  let guild = message.guild;
  await console.log(guild.name)
  let allRoller = await guild.roles.map(r => r.name);
  let everyoneIndex = await allRoller.indexOf('@everyone');
  let everyone = await allRoller.splice(everyoneIndex, 1);
  let roller = allRoller.join(' ❱ ');

  let embed = new Discord.MessageEmbed()
    .setDescription('__**Sunucu Bilgileri**__')
    .setColor('#4286f4')
    .setThumbnail(guild.displayIconURL)
    .setTimestamp()
    .addField('Sunucu Adı', `${guild.name}`, true)
    .addField('Bölgesi', `${guild.region}`, true)
    .addField('Sunucu ID', `${guild.id}`, true)
    .addField('Kurulma Zamanı', `${moment(guild.createdAt).utcOffset(3).locale('tr').format('DD-MM-YYYY HH:mm:ss')}`, true)
    .addField('Sahibi', guild.owner, true)
    .addField('Üyeler', guild.members.size, true)
    .addField('Metin Kanalları', guild.channels.find('type', 'text').length, true)
    .addField('Ses Kanalları', guild.channels.find('type', 'voice').length, true)
    .addField('Doğrulama Düzeyi', guild.verificationLevel, true)
    .addField('İçerik Filtresi Düzeyi', guild.explicitContentFilter, true)
    .addField('Sunucudaki Roller', roller)
    ;

  message.channel.send(embed);

  return;
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'server',
  description: 'Sunucu bilgilerini gösterir',
  usage: 'server'
};
