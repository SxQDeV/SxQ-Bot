const moment = require('moment');

module.exports = (guild, user) => {
  console.log(`BAN! ${moment().utcOffset(3).locale('tr').format('DD-MM-YYYY HH:mm:ss')}: ${user.username}, ${guild.name} sunucusunda banlandı!!`);

  let modlog = guild.channels.find('name', process.env.modLog);

  guild.channels.get(modlog.id).send(`${moment().utcOffset(3).locale('tr').format('DD-MM-YYYY HH:mm:ss')}: "${user.username}", ${guild.name}(${guild.id})'de banlandı!!}`);
};
