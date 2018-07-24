const Discord  = require('discord.js');
const Utils    = require('../utils.js');
const Parses   = require('../parses.js');
const commands = require('../commands.json');

exports.Run = function (message, cmd) {
  var rEmbed = new Discord.RichEmbed;
  rEmbed.setColor(0xE86868)
    .setFooter(cmd.Command.footer, client.user.avatarURL);
  if(cmd.aArguments.length === 0) {
    rEmbed.setTitle('Disabled commands');
    var disabled = '';
    if(cmd.iServer !== -1)
      if(typeof servers[cmd.iServer].disabled !== 'undefined')
        if(servers[cmd.iServer].disabled.length !== 0)
          disabled = servers[cmd.iServer].disabled.join('`, `');
    if(disabled === '')
      disabled = 'None';
    rEmbed.setDescription('`' + disabled + '`');
  } else {
    var cCommand = Parses.Command(cmd.aArguments[0].toLowerCase());
    if(cCommand) {
      var sCommand = commands[cCommand.iCommand].name.toLowerCase();
      if(commands[cCommand.iCommand].can_disable) {
        var iServer = cmd.iServer;
        if(iServer === -1)
          iServer = Utils.createServer(message.guild.id);
        if(Utils.optionPosition(iServer, 'disabled', sCommand) === -1) {
          Utils.pushOption(iServer, 'disabled', sCommand);
        }
        rEmbed.setTitle('Command disabled')
          .setDescription('You have disabled the **' + sCommand + '** command. To re-enabled it use `' + cmd.sPrefix + 'enable ' + sCommand + '`.')
      } else {
        rEmbed.setTitle('Cannot disable')
          .setDescription('You cannot disable **' + sCommand + '**.')
      }
    } else {
      rEmbed.setTitle('Command not found')
        .setDescription('The command you were looking for was not found. I cannot disable commands for other bots. Try `' + cmd.sPrefix + 'help` for a list of my commands.');
    }
  }
  message.channel.send('', rEmbed);
}
