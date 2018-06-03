const {MessageEmbed} = require('discord.js');
const {caseNumber} = require('../util/caseNumber.js');
const {parseUser} = require('../util/parseUser.js');

exports.run = async (client, message, args) => {
  const user = message.mentions.users.first() || args[0];
  await parseUser(message, user);
  const modlog = await message.guild.channels.find('name', 'mod-log');
  const caseNum = caseNumber(client, modlog);
  if (!modlog) return message.reply('**"mod-log"** kanal�n� bulamad�m.');
  if (!user) return message.reply('Birisini banlamak i�in ondan bahsetmelisin.').catch(console.error);
  message.guild.members.ban(user, 2);

  const reason = args.splice(1, args.length).join(' ') || `Moderator giri�i beklenikor. ${process.env.prefix}reason ${caseNum} <sebep>.`;
  const embed = new MessageEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setDescription(`**Eylem:** Ban\n**Hedef:** ${user.tag}, (${user.id})\n**Moderat�r:** ${message.author.tag}\n**Sebep:** ${reason}`)
    .setFooter(`Olay ${caseNum}`);
  return client.channels.get(modlog.id).send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'ban',
  description: 'Bahsedilen ki�iyi sunucuda banlar!',
  usage: 'ban [mention] [sebep]'
};