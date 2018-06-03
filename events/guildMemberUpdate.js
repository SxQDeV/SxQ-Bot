const ddiff = require('return-deep-diff');

module.exports = (oMember, nMember) => {
  console.log(`Üye Güncellemesi - ${new Date()}`);
  console.log(ddiff(oMember, nMember));
};
