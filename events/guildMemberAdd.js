const moment = require('moment');

module.exports = async member => {
  if (!member || !member.id || !member.guild) return;
  let guild = member.guild;
  let verify = guild.roles.find("name", process.env.verifyRole);

  if(!verify) guild.createRole({
    name: process.env.verifyRole,
    color: "#000000",
    hoist: true,
    permisions:0
}).catch(console.error);

  await member.roles.add(verify, 'Kuralları onaylaması bekleniyor.').catch(console.error);

  let rules = guild.channels.find('name', process.env.rulesChannel);

  guild.channels.get(rules.id).send(`${member.user.tag}, **'${guild.name}'** sunucumuza hoş geldin.\nEğer yukarıdaki kuralların tümünü kabul ediyorsan lütfen __**${process.env.prefix}onay**__ yazın! :grin: \nEğer kabul etmiyorsan seni üzülerek ve sessizce dışarıya alalım ${member} :disappointed: \n`).catch(console.error);

    console.log(`${moment().utcOffset(3).locale('tr').format('DD-MM-YYYY HH:mm:ss')} : ${member.user.username}, ${guild.name} sunucusuna katıldı.`);
};
