const Discord = require('discord.js');

exports.run = async (client, message, args, perms) => {

  let messagecount = parseInt(args.join(' '));
  await message.delete();
  if (messagecount < 2) return message.channel.send(`Lütfen 2-99 arasında bir sayı girin. \nKullanım: ${process.env.prefix}purge <miktar>`);

  message.channel.messages.fetch({
    limit: messagecount
  }).then(messages =>
    message.channel.bulkDelete(messages));
  message.channel.send(`${message.author} tarafından '${messagecount}' adet mesaj silindi! ${message.createdAt}`).then(
  response => response.delete(10000));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'purge',
  description: 'X adet mesajı kullanılan kanaldan siler!',
  usage: 'purge <sayı>'
};
 
