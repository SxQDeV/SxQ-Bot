exports.run = function(client, message, args) {

  var argresult = args.join(' ');
  if (!argresult) argresult = `${process.env.prefix}help`;

  client.user.setActivity(argresult);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['setoyun'],
  permLevel: 4
};

exports.help = {
  name: 'setgame',
  description: 'Botun oyun durumunu ayarlar!',
  usage: 'setgame <oyun>'
};
