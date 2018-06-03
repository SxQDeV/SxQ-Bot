const moment = require('moment');

async function embedSan(embed) {
  embed.message ? delete embed.message : null;
  embed.footer ? delete embed.footer.embed : null;
  embed.provider ? delete embed.provider.embed : null;
  embed.thumbnail ? delete embed.thumbnail.embed : null;
  embed.image ? delete embed.image.embed : null;
  embed.author ? delete embed.author.embed : null;
  embed.author.icon ? delete embed.author.icon : null;
  embed.timestamp ? delete embed.timestamp.embed : null;
  embed.fields ? embed.fields.forEach(f => {delete f.embed;}) : null;
  return embed;
};

exports.run = async (client, message, args) => {
  const modlog = message.guild.channels.find('name', 'mod-log');
  const caseNumber = args.shift();
  const newReason = args.join(' ') + `\n ${moment().utcOffset(3).locale('tr').format('DD-MM-YYYY HH:mm:ss')}`;

  await modlog.messages.fetch({limit:100}).then((messages) => {
    const caseLog = messages.filter(m => m.author.id === client.user.id &&
      m.embeds[0] &&
      m.embeds[0].type === 'rich' &&
      m.embeds[0].footer &&
      m.embeds[0].footer.text.startsWith('Olay') &&
      m.embeds[0].footer.text === `Olay ${caseNumber}`
    ).first();
    modlog.fetchMessage(caseLog.id).then(logMsg => {
      const embed = logMsg.embeds[0];
      embedSan(embed);
      embed.description = embed.description.replace(`Moderator girişi beklenikor. ${process.env.prefix}reason ${caseNumber} <sebep>.`, newReason);
      logMsg.edit({embed});
    })
  });
};

exports.conf = {
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'reason',
  description: 'Belirlenmeyen moderatör olayını günceller.',
  usage: 'reason <olay numarası> <yeni sebep>'
};
