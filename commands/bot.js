const Discord = require('discord.js');
const moment = require('moment');
const ms =require('ms')

exports.run = async (client, message, args) => {
 
  let member = message.guild.members.get(client.user.id);
  let allRoller = await member.roles.map(r => r.name);
  let everyoneIndex = await allRoller.indexOf('@everyone');
  let everyone = await allRoller.splice(everyoneIndex, 1);
  let roller = allRoller.join(' ? ');
  
  if(client.user.presence.activity.type = "PLAYING") client.user.presence.activity.type=` oynuyor.`;
  else if(client.user.presence.activity.type = "WATCHING") client.user.presence.activity.type=` izliyor.`;
  else if(client.user.presence.activity.type = "STREAMING") client.user.presence.activity.type=` yayýnda. ${client.user.presence.activity.url}`;
  else if(client.user.presence.activity.type = "LISTENING") client.user.presence.activity.type=` dinliyor.`;
  else client.user.presence.activity.type;
  
  let embed = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.displayAvatarURL())
    .setDescription('Benim Bilgilerim')
    .setColor('#4286f4')
    .setThumbnail(client.user.displayAvatarURL({size: 512}))
    .setTimestamp()
    .addField('Kullanýcý Adý', client.user.tag, true)
    .addField('Kullanýcý Sayýsý', `${client.users.size}`, true)
    .addField('Kanal Sayýsý', `${client.channels.size}`, true)
    .addField('Sunucu Sayýsý', `${client.guilds.size}`, true)
    .addField('Son Baðlantý', moment(client.readyAt).utcOffset(3).locale('tr').format('DD-MM-YYYY HH:mm:ss'), true)
    .addField('Çalýþma Süresi', ms(client.uptime), true)
    .addField('Durum', `${client.user.presence.status}`, true)
    .addField('Aktivite', client.user.presence.activity.name + client.user.presence.activity.type, true)
    .addField('Sunucudaki Rolü', roller)
    .addField('Discord\'a Katýlma', `${moment(client.user.createdTimestamp).utcOffset(3).locale('tr').format('DD-MM-YYYY HH:mm:ss')}`, true)
    .addField('Sunucuya Katýlma', `${moment(client.joinedTimestamp).utcOffset(3).locale('tr').format('DD-MM-YYYY HH:mm:ss')}`, true)
   ;

  message.channel.send(embed);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'bot',
    description: 'Bot hakkýnda güncel bilgiler verir',
    usage: 'bot'
  };