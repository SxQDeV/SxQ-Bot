exports.run = (client, message, args) => {
  let command;
  if (client.commands.has(args[0])) {
    command = args[0];
  } else if (client.aliases.has(args[0])) {
    command = client.aliases.get(args[0]);
  }
  if (!command) {
    return message.channel.send(`Komutu bulamıyorum: ${args[0]}`);
  } else {
    message.channel.send(`Tekrar yükleniyor: ${command}`)
      .then(m => {
        client.reload(command)
          .then(() => {
            m.edit(`${command} komutu **başarıyla tekrar yüklendi**`);
          })
          .catch(e => {
            m.edit(`Komut tekrar yüklemesi başarısız: ${command}\n\`\`\`${e.stack}\`\`\``);
          });
      });
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['r'],
  permLevel: 4
};

exports.help = {
  name: 'reload',
  description: 'Komut dosyasını yeniden yükler. (güncelleme yada değişiklik varsa.)',
  usage: 'reload <komutAdı>'
};
