exports.run = function(client, message, args) {
  var argresult = args.join(' ');

  client.user.setStatus(argresult).then(
    console.log(`"${message.guild}" sunucusunda durumum "${argresult}" olarak değiştirildi. Prefix: ${process.env.prefix}`)).then (
    message.guild.channels.find('name', 'modlog').send(`"${client.user.username}" durumu "${argresult}" olarak değiştirildi.`)
  );
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['setdurum'],
  permLevel: 4
};

exports.help = {
  name: 'setstatus',
  description: 'Bot\'un durumunu ayarlar!',
  usage: 'setstatus <online / idle / dnd / invisible>'
};
