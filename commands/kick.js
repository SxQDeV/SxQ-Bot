const {MessageEmbed} = require('discord.js');
const {caseNumber} = require('../util/caseNumber.js');
const {parseUser} = require('../util/parseUser.js');

exports.run = async (client, message, args) => {
  const toKick = message.mentions.members.first() || message.guild.members.get(args[0]);
  await parseUser(message, toKick);
  if (toKick.id === message.author.id) 
    return message.channel.send(`${message.author.username}? Hayýr! Bunu kendine yapmana izin veremem, neden denedin ki?`);

  if (toKick.highestRole.position >= message.member.highestRole.position) 
    return message.channel.send('Hedef üye, senin konumundan daha yüksek ya da eþit bir role sahip!\nÜzgünüm, ne demiþler "Çayda dem, Discord\'ta kýdem!');
  
  const modlog = message.guild.channels.find('name', 'mod-log');
  const caseNum = await caseNumber(client, modlog);

  if (!toKick) return message.reply('Birisini atmak için ondan bahsetmelisin.').catch(console.error);
  if (!modlog) await message.guild.createChannel('mod-log', 'text').then(channel => console.log(`Yeni kanal oluþturuldu: ${channel}`)).catch(console.error);

  // message.guild.member(user).kick();

  const reason = args.splice(1, args.length).join(' ') || `Moderator giriþi beklenikor. ${process.env.prefix}reason ${caseNum} <sebep>.`;
  const embed = new MessageEmbed()
  .setAuthor('KICK')
  .setDescription(`**Kullanýcý Atýldý.**\n**Sebep:** ${reason}`)
  .setColor(0x00AE86)
  .setThumbnail(toKick.user.displayAvatarURL)
  .setTimestamp()
  .addField('**Tam Adý**', `${toKick.user.username}#${toKick.user.discriminator}`, true)
  .addField('**ID**', toKick.id, true)
  .addField(`**Moderatör:**`, `${message.author.username}#${message.author.discriminator}`, true)
  //.addField(`**Sebep**`, `${reason}`)
  .setFooter(`Olay ${caseNum}`);

  return client.channels.get(modlog.id).send({embed}).then(
    message.guild.member(toKick).kick());
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'kick',
  description: 'Bahsedilen kiþiyi sunucudan atar!',
  usage: 'kick [mention] [sebep]'
};