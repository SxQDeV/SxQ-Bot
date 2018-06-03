const {RichEmbed} = require('discord.js');
const {caseNumber} = require('../util/caseNumber.js');
const {parseUser} = require('../util/parseUser.js');

exports.run = (client, message, args) => { // eslint-disable-line no-unused-vars
  const user = args[0];
  const modlog = message.guild.channels.find('name', 'mod-log');
  const reason = args.slice(1).join(' ');
  client.unbanReason = reason;
  client.unbanAuth = message.author;
  if (!modlog) return message.reply('**"mod-log"** kanalını bulamadım.');
  if (reason.length < 1) return message.reply('Banı kaldırmak için bir sebep belirtmelisin.');
  if (!user) return message.reply('Kullanıcıyı ayıt edici bilgi sağlamalısın. (Kullanıcı **id**\'si gibi)').catch(console.error);
  message.guild.members.unban(user);
  message.channel.send(`${user.username} kullanıcısının banı kaldırıldı`)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'unban',
  description: 'Kullanıcının banını kaldırır.',
  usage: 'unban [mention] [sebep]'
};
