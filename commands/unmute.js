const {MessageEmbed} = require('discord.js');
const {caseNumber} = require('../util/caseNumber.js');
const {parseUser} = require('../util/parseUser.js');

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  const user = message.mentions.users.first() || message.guild.members.get(args[0]).user;
  parseUser(message, user);
  const modlog = message.guild.channels.find('name', 'mod-log');
  const caseNum = caseNumber(client, modlog);
  const muteRole = client.guilds.get(message.guild.id).roles.find('name', 'Muted');

  if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('Rolleri ve izinleri değiştirme yetkisine sahip değilim.').catch(console.error);

  if(!user) return message.channel.send(`Birisinin susturmasını kaldırmak için ondan bahsetmeli yada ID girmeisiniz!\nKULLANIM:  **${process.env.prefix}unmute <mension/ID> <sebep>**`).catch(console.error);

  if(!modlog) message.guild.createChannel('mod-log', 'text').then(channel => console.log(`Yeni kanal oluşturuldu: ${channel}`)).catch(console.error);

  const reason = args.splice(1, args.length).join(' ') || `Moderator girişi beklenikor. ${process.env.prefix}reason ${caseNum} <sebep>.`;

  const embed = new MessageEmbed()
     .setAuthor('UNMUTE', 'http://icons.iconarchive.com/icons/fatcow/farm-fresh/32/keyboard-add-icon.png')
    .setDescription(`**Kullanıcının Susturulması Kaldırıldı**`)
    .setColor(0x00AE86)
    .setThumbnail(user.displayAvatarURL)
    .setTimestamp()
    .addField('**Tam Adı**', `${user.username}#${user.discriminator}`, true)
    .addField('**ID**', user.id, true)
    .addField(`**Moderatör:**`, `${message.author.username}#${message.author.discriminator}`, true)
    .setFooter(`Olay ${caseNum}`);
    ;

  if (!message.guild.member(user).roles.has(muteRole.id)) {
    message.channel.send(`${user.username} zaten susturulmamış? Kullanıcıyı zorla mı konuşturacağız?`);
  } else {
    message.guild.member(user).roles.remove(muteRole).then(() => {
      client.channels.get(modlog.id).send({embed}).catch(console.error);
    });
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'unmute',
  description: 'Bahsedilen kişinin susturmasını kaldırır.',
  usage: 'unmute [mention] [sebep]'
};
