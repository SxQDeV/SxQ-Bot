exports.run = (client, message, args) => {
  if (!args[0]) {
    const commandNames = Array.from(client.commands.keys());
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
    message.channel.send(`= Komut Listesi =\n\n[Detaylar için ${process.env.prefix}help <komutAdý> kullanýn]\n\n${client.commands.map(c => `${process.env.prefix}${c.help.name}${' '.repeat(longest - c.help.name.length)} :: ${c.help.description}`).join('\n')}`, {code:'asciidoc'});
  } else {
    let command = args[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      message.channel.send(`= ${command.help.name} = \n${command.help.description}\nKullaným::${command.help.usage}`, {code:'asciidoc'});
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['h', 'halp', 'yardým'],
  permLevel: 0
};

exports.help = {
  name: 'help',
  description: 'Ýzin seviyeniz için geçerli tüm komutlarý gösterir.',
  usage: 'help [komut]'
};