const Discord = require('discord.js');
const request = require('request');

exports.Run = function (message, cmd) {
  var rEmbed = new Discord.RichEmbed;
  rEmbed.setColor(0xFF8000)
    .setFooter(cmd.Command.footer, client.user.avatarURL);
  message.channel.startTyping();
  request({ url: 'http://aws.random.cat/meow', json: true, }, function(error, response, body) {
    if(typeof body.file === 'undefined') {
      rEmbed.setDescription('Cat not found');
    } else {
      rEmbed.setImage(body.file);
    }
    message.channel.send('', rEmbed);
    message.channel.stopTyping();
  });
}
