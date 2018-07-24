const Discord  = require('discord.js');
const Utils    = require('../utils.js')
const settings = require('../settings.json');

exports.Run = function (message, cmd) {
  var rEmbed = new Discord.RichEmbed;
  rEmbed.setColor(0x3DABF4)
    .setFooter(cmd.Command.footer, client.user.avatarURL);
  if(cmd.aArguments.length === 0) {
    rEmbed.setTitle('Server Options')
      .setDescription('Below is a list of the options you can change on a server.')
      .addField('Prefix', 'The prefix used before commands. Default: "' + settings.defaultPrefix + '"');
  } else if (cmd.aArguments.length === 1) {
    var option = cmd.aArguments[0].toLowerCase();
    switch(option) {
      case 'prefix':
      rEmbed.setTitle('Prefix')
        .setDescription('The prefix used before commands. Default: "' + settings.defaultPrefix + '"');
      break;
      default:
      rEmbed.setTitle('Option not found')
        .setDescription('The server option you were looking for was not found.');
      break;
    }
  } else {
    var option = cmd.aArguments[0].toLowerCase();
    var iServer = cmd.iServer;
    if(iServer === -1)
      iServer = Utils.createServer(message.guild.id)
    switch(option) {
      case 'prefix':
      if((new RegExp('[a-zA-Z0-9!-&,.;]').test(cmd.aArguments[1]))) {
        rEmbed.setTitle('Prefix set')
          .setDescription('**' + message.guild.name.toSafe() + '**\'s prefix is now `' + cmd.aArguments[1].toLowerCase() + '`');
        Utils.setOption(iServer, 'prefix', cmd.aArguments[1].toLowerCase())
      } else {
        rEmbed.setTitle('Invalid Prefix')
          .setDescription('You can use **a-z**, **0-9**, **!-&**, "**.**", "**,**", and "**;**".');
      }
      break;
      default:
      rEmbed.setTitle('Option not found')
        .setDescription('The server option you tried to set was not found.')
      break;
    }
  }
  message.channel.send('', rEmbed);
}
