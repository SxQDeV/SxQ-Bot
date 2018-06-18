const http = require('http');
const express = require('express');
const app = express();
app.get('/', (request, response) => {
  console.log(Date.now() + ' Ping Received');
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 200000);

const Discord = require('discord.js');
const client = new Discord.Client();
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);

const log = message => {
  console.log(`[${moment().utcOffset(3).locale('tr').format('DD-MM-YYYY HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);
  log(`Komutlar yükleniyor...Toplam ${files.length} komut.`);
  files.forEach(f => {
    const props = require(`./commands/${f}`);
    log(`Komut Yükleniyor: ${props.help.name}. 👍`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

elevation = message => {
  /* This function should resolve to an ELEVATION level which
     is then sent to the command handler for verification*/
  let permlvl = 0;
  const mod_role = message.guild.roles.find('name', process.env.modrolename);
  if (mod_role && message.member.roles.has(mod_role.id)) permlvl = 2;
  const admin_role = message.guild.roles.find('name', process.env.adminrolename);
  if (admin_role && message.member.roles.has(admin_role.id)) permlvl = 3;
  if (message.author.id === process.env.ownerid) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
//client.on('debug', e => {
//console.log(chalk.bgBlue(e.replace(regToken, '!bu veri sansürlenmiştir!')));
//});

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, '!bu veri sansürlenmiştir!')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, '!bu veri sansürlenmiştir!')));
});

client.login(process.env.TOKEN);
