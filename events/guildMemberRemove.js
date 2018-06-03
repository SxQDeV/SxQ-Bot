const moment = require('moment');

module.exports = async (member) => {
  if (!member || !member.id || !member.guild) return;
  let user = member.user;
  let guild = member.guild;
  console.log(`${moment().utcOffset(3).locale('tr').format('DD-MM-YYYY HH:mm:ss')}: ${member.user.tag}, ${guild.name} sunucusundan ayrıldı.`);

  let modlog = guild.channels.find('name', process.env.welcomeChanel);
  guild.channels.get(modlog.id).send(`${moment().format('DD-MM-YYYY HH:mm:ss')} : ${member.user.tag} aramızdan ayrıldı. Şunda ${guild.members.size} kişiyiz`).catch(console.error);

  let rules = guild.channels.find('name', process.env.rulesChannel);
  let msgs = await rules.messages.fetch({limit:10})
  let msg = msgs.filter(m => m.content.startsWith(`${user.tag}`)).catch(console.error);
       if(!msg) return;
       msg.delete();
}
