const Discord = require('discord.js');

exports.run = async (client, message, args)  => {
    let guild = message.guild;
    let verify = guild.roles.find("name", process.env.verifyRole);
    let role = guild.roles.find("name", process.env.memRole);
    let rules = guild.channels.find('name', process.env.rulesChannel);
    let wellcome = guild.channels.find("name", process.env.welcomeChanel)
    let target = message.member


    if(target.roles.has(role.id) && !target.roles.has(verify.id))
        return message.reply('Bu komut sizin için değildir.').catch(console.error);

    if(message.channel !== rules)
      return message.reply(`Onaylama işlemi sadece ${rules} kanalında yapılabilir!`).catch(console.error);

    if(!target.roles.has(role.id)) {
       await target.roles.add(role, 'Kuralları onayladı.').catch(console.error);
    }

    if(target.roles.has(verify.id))
      await target.roles.remove(verify, 'Kuralları onayladı.').catch(console.error);

   guild.channels.get(wellcome.id).send(`__${target}__ aramıza katıldı. Şuanda **${guild.members.size}** kişiyiz!`);

   let messages = await rules.messages.fetch({limit:50}).then(messages => messages.find(m => m.content.startsWith(`${target.user.tag}`))).then(msg=> msg.delete()).catch(console.error);
   message.delete();

};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['verify', 'onaylıyorum', 'kabul', 'ok'],
    permLevel: 0
};

exports.help = {
    name: 'onay',
    description: 'Üye sunucu kurallarını onaylar.',
    usage: 'onay'
};
