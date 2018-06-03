exports.parseUser = (message, user) => {
  const member = message.guild.member(user) || null;
  if (user.id === message.author.id) {
    return message.channel.send(`${message.author.username}? Hayır! Bunu kendine yapmana izin veremem, neden denedin ki?`);
  } else if (member) {
    if (member.roles.highest.position >= message.member.roles.highest.position ) return message.channel.send('Hedef üye, senin konumundan daha yüksek ya da eşit bir role sahip!\nÜzgünüm, ne demişler "Çayda dem, Discord\'ta kıdem!');
  }
  return user;
};
