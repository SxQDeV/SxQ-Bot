const Discord = require('discord.js');
const moment = require('moment');

exports.run = async (client, message, args) => {
  let member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.guild.members.get(message.author.id);
 
  let allRoller = await member.roles.map(r => r.name);
  let everyoneIndex = await allRoller.indexOf('@everyone');
  let everyone = await allRoller.splice(everyoneIndex, 1);
  let roller = allRoller.join(' ? ');
  let nick = member.nickname || member.user.username;
  let botmu = "Hay�r";
    if (member.user.bot) botmu='EVET';
  let game = "-Yok-";
    if(member.presence.game) game = member.presence.game.name;
  
  let embed = new Discord.MessageEmbed()
    .setAuthor(`${member.displayName} Kimdir?\n `)
    .setThumbnail(member.user.displayAvatarURL(member.user)) 
    .setColor('#4286f4')
    .setTimestamp()
    .addField('Kullan�c� Ad�', member.user.tag, true)
    .addField('Nick', nick, true)
    .addField('Kullan�c� ID', member.user.id, true)
    .addField('Durum', `${member.presence.status}`, true)
    .addField('Aktivite', game, true)
    .addField('Bot mu?', botmu, true)
    .addField('Sunucudaki Rol�', roller)
    .addField('Discord\'a Kat�lma', `${moment(member.user.createdTimestamp).utcOffset(3).locale('tr').format('DD-MM-YYYY HH:mm:ss')}`, true)
    .addField('Sunucuya Kat�lma', `${moment(member.joinedTimestamp).utcOffset(3).locale('tr').format('DD-MM-YYYY HH:mm:ss')}`, true);

  message.channel.send(embed).catch(console.error);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kim'],
  permLevel: 0
};

exports.help = {
  name: 'info',
  description: 'Kullan�c� bilgilerini g�sterir',
  usage: 'info (@bahsetme)'
};