const Discord = require('discord.js');
const request = require('request');

exports.Run = function (message, cmd) {
  var rEmbed = new Discord.RichEmbed;
  rEmbed.setColor(0xFF8000)
    .setFooter(cmd.Command.footer, client.user.avatarURL);
  message.channel.startTyping();
  request({ url: 'http://random.dog/woof.json', json: true }, function(error, response, body) {
    if(typeof body.url === 'undefined') {
      rEmbed.setDescription('Dog not found');
    } else {
      rEmbed.setImage(body.url);
    }
    message.channel.send('', rEmbed);
    message.channel.stopTyping();
  });
}
