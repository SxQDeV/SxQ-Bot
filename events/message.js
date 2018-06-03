module.exports = message => {
  const client = message.client;
  if(message.author.bot) return;
  if(!message.content.startsWith(process.env.prefix)) return;
  const command = message.content.split(' ')[0].slice(process.env.prefix.length);
  const args = message.content.split(' ').slice(1);
  const perms = client.elevation(message);
  let cmd;

  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }

  if (cmd) {
    if (perms < cmd.conf.permLevel) return message.reply('Bu komutu kullanma yetkin yok.');
    if (!message.guild && cmd.conf.guildOnly) return message.channel.send('Bu komut özel mesaj yoluyla kullanılamaz. Lütfen bu komutu bir serverda çalıştırın.');
    if (cmd.conf.enabled = false) return message.channel.send('Bu komut geçici olarak kullanılamamaktadır.');
    cmd.run(client, message, args, perms);
  }
};
