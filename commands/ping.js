exports.run = function(client, message) {
  message.channel.send('Ping?')
    .then(msg => {
      msg.edit(message.reply(`Burdayım! Gecikme: ${(msg.createdTimestamp - message.createdTimestamp)}ms`));
    });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ping',
  description: 'Ping/Pong komutu. Bunun ne işe yaradığını merak ediyorum?',
  usage: 'ping'
};
