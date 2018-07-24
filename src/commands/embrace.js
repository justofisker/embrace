const Parses = require('../parses.js');

exports.Run = function (message, cmd) {
  var user = Parses.User(message.channel, cmd.sArgumentString);
  if(!user)
    user = message.author;
  message.channel.send('*embraces* ' + user);
}
