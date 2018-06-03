const chalk = require('chalk'); // eslint-disable-line no-unused-vars

module.exports = client => {
  console.log(chalk.bgGreen('myBot online!'));
  console.log(process.env.prefix);
  client.user.setActivity(`${process.env.prefix}help`);

  client.generateInvite(['ADMINISTRATOR']).then(link => {
    console.log(`Bot davet linki oluşturuldu: ${link}`);
  }).catch(e =>{
    console.log(e.stack);
  });
};
