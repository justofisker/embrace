const Discord = require('discord.js')

exports.Run = function (message, cmd) {
  rEmbed = new Discord.RichEmbed;
  rEmbed.setFooter(cmd.Command.footer, client.user.avatarURL)
    .setColor(0xCD77F4);
  if(cmd.sArgumentString === '') {
    rEmbed.setTitle('Ask a question')
      .setDescription('You need to ask a question to the Magic 8-Ball.');
  } else {
    rEmbed.setTitle('The Magic 8-Ball says...');
    switch(Math.floor(Math.random() * 20)) {
      case 0:
      rEmbed.setDescription('It is certain.');
      break;
      case 1:
      rEmbed.setDescription('It is decidedly so.');
      break;
      case 2:
      rEmbed.setDescription('Without a doubt.');
      break;
      case 3:
      rEmbed.setDescription('Yes - definitely.');
      break;
      case 4:
      rEmbed.setDescription('You may rely on it.');
      break;
      case 5:
      rEmbed.setDescription('As I see it, yes.');
      break;
      case 6:
      rEmbed.setDescription('Most likely.');
      break;
      case 7:
      rEmbed.setDescription('Outlook good.');
      break;
      case 8:
      rEmbed.setDescription('Yes.');
      break;
      case 9:
      rEmbed.setDescription('Signs point to yes.');
      break;
      case 10:
      rEmbed.setDescription('Reply hazy, try again');
      break;
      case 11:
      rEmbed.setDescription('Ask again later.');
      break;
      case 12:
      rEmbed.setDescription('Better not tell you now.');
      break;
      case 13:
      rEmbed.setDescription('Cannot predict now.');
      break;
      case 14:
      rEmbed.setDescription('Concentrate and ask again.');
      break;
      case 15:
      rEmbed.setDescription('Don\'t count on it.');
      break;
      case 16:
      rEmbed.setDescription('My reply is no.');
      break;
      case 17:
      rEmbed.setDescription('My sources say no');
      break;
      case 18:
      rEmbed.setDescription('Outlook not so good.');
      break;
      case 19:
      rEmbed.setDescription('Very doubtful.');
      break;
    }
  }
  message.channel.send('', rEmbed);
}
