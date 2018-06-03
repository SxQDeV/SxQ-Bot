const {MessageEmbed} = require('discord.js');
const {caseNumber} = require('../util/caseNumber.js');
const {parseUser} = require('../util/parseUser.js');

exports.run = async (client, message, args) => {
  const toMute = message.mentions.members.first() || message.guild.members.get(args[0]);
//  await parseUser(message, toMute);
  if (toMute.id === message.author.id) 
    return message.channel.send(`${message.author.username}? Hayýr! Bunu kendine yapmana izin veremem, neden denedin ki?`);

  if (toMute.roles.highest.position >= message.member.roles.highest.position) 
    return message.channel.send('Hedef üye, senin konumundan daha yüksek ya da eþit bir role sahip!\nÜzgünüm, ne demiþler "Çayda dem, Discord\'ta kýdem!');
 
  const modlog = message.guild.channels.find('name', 'mod-log');
  const caseNum = await caseNumber(client, modlog);
  const muteRole = message.guild.roles.find('name', 'MyBot Muted');

  if (message.mentions.users.size < 1) return message.reply('Birisini susturmak için ondan bahsetmen gerekir.').catch(console.error);

  if (!modlog) await message.guild.createChannel('mod-log', 'text').then(channel => console.log(`Yeni kanal oluþturuldu: ${channel}`)).catch(console.error);

  if (!muteRole) {
    try {
      muteRole = await message.guild.createRole({
        name: 'MyBot Muted',
        color: '#000000',
        permissions: [ ]
      });
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muteRole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        })
      });
    } catch (e) {
    console.log(e)
    }
  };

  const reason = args.splice(1, args.length).join(' ') || `Moderator giriþi beklenikor. ${process.env.prefix}reason ${caseNum} <sebep>.`;

  const embed = new MessageEmbed()
    .setAuthor('MUTE', 'http://icons.iconarchive.com/icons/fatcow/farm-fresh/32/keyboard-delete-icon.png')
    .setDescription(`**Kullanýcý Susturuldu.**\n**Sebep:** ${reason}`)
    .setColor(0x00AE86)
    .setThumbnail(toMute.user.displayAvatarURL(toMute.user))
    .setTimestamp()
    .addField('**Tam Adý**', `${toMute.user.username}#${toMute.user.discriminator}`, true)
    .addField('**ID**', toMute.id, true)
    .addField(`**Moderatör:**`, `${message.author.username}#${message.author.discriminator}`, true)
    .setFooter(`Olay ${caseNum}`);

  if (!message.guild.me.permissions.has('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('Rolleri ve izinleri deðiþtirme yetkisine sahip deðilim.').catch(console.error);

  if (toMute.roles.has(muteRole.id)) message.channel.send(`${toMute.user.username} zaten susturulmuþ?`);
  
  else {
    message.guild.member(toMute).roles.add(muteRole, args.slice(1).join(' ')).then(() => {
    modlog.send({embed}).catch(console.error);
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
  name: 'mute',
  description: 'Bahsedilen kiþiyi susturur.',
  usage: 'mute [mention] [sebep]'
};
