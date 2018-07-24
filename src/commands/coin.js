const Discord = require('discord.js')

exports.Run = function (message, cmd) {
  rEmbed = new Discord.RichEmbed;
  rEmbed.setTitle('I flipped a coin and...')
    .setFooter(cmd.Command.footer, client.user.avatarURL)
    .setColor(0xAFB1B5);
  switch(Math.floor(Math.random() * 2)) {
    case 0:
    rEmbed.setDescription('It\'s Heads!');
    break;
    case 1:
    rEmbed.setDescription('It\'s Tails!');
    break;
  }
  message.channel.send('', rEmbed);
}
