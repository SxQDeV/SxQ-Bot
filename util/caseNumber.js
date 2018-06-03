async function caseNumber(client, modlog) {
  const messages = await modlog.messages.fetch({limit:50});
  const log = await messages.filter(m => m.author.id === client.user.id &&
    m.embeds[0] &&
    m.embeds[0].type === 'MessageEmbed' &&
    m.embeds[0].footer &&
    m.embeds[0].footer.text.startsWith('Olay')
  ).first();
  if (!log) return 1;
  const thisCase = /Olay\s(\d+)/.exec(log.embeds[0].footer.text);
  return thisCase ? parseInt(thisCase[1]) + 1 : 1;
}

module.exports = {caseNumber};
