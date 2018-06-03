const moment = require('moment');

module.exports = message => {
  if (!message || !message.id || !message.content || !message.guild) return;
  const channel = message.guild.channels.find('name', 'mod-log');
  if (!channel) return;
  channel.send(`🗑 ${moment().utcOffset(3).locale('tr').format('DD-MM-YYYY HH:mm:ss')}: __${message.channel}__ kanalında, __${message.author.tag} (${message.author.id})__ tarafından gönderilmiş;\n'**${message.cleanContent}**'\nmesajı  silindi.`);

};
