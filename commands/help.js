exports.run = (client, message, args) => {
  if (!args[0]) {
    const commandNames = Array.from(client.commands.keys());
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
    message.channel.send(`= Komut Listesi =\n\n[Detaylar i�in ${process.env.prefix}help <komutAd�> kullan�n]\n\n${client.commands.map(c => `${process.env.prefix}${c.help.name}${' '.repeat(longest - c.help.name.length)} :: ${c.help.description}`).join('\n')}`, {code:'asciidoc'});
  } else {
    let command = args[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      message.channel.send(`= ${command.help.name} = \n${command.help.description}\nKullan�m::${command.help.usage}`, {code:'asciidoc'});
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['h', 'halp', 'yard�m'],
  permLevel: 0
};

exports.help = {
  name: 'help',
  description: '�zin seviyeniz i�in ge�erli t�m komutlar� g�sterir.',
  usage: 'help [komut]'
};