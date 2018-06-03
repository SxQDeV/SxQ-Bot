const Discord = require('discord.js');
const moment = require('moment');

module.exports = (guild, user) => {
  console.log(`!BAN ${moment().utcOffset(3).locale('tr').format('DD-MM-YYYY HH:mm:ss')}: "${user.username}", ${guild.name}(${guild.id})'de banı kaldırıldı!!`);

  let modlog = guild.channels.find('name', process.env.modLog);

  guild.channels.get(modlog.id ).send(`${moment().utcOffset(3).locale('tr').format('DD-MM-YYYY HH:mm:ss')}: "${user.username}", ${guild.name}(${guild.id})'de banı kaldırıldı!!`);
  //const embed = new Discord.RichEmbed()
    //.setColor(0x00AE86)
    //.setTimestamp()
    //.setDescription(`**Eylem:** Unban\n**Hedef:** ${user.tag}, (${user.id})\n**Moderatör:** ${guild.client.unbanAuth.tag}\n**Sebep:** ${guild.client.unbanReason}`);
  //return guild.channels.find('name', 'mod-log').send({embed});

};
