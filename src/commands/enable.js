const Discord  = require('discord.js');
const Utils    = require('../utils.js');
const Parses   = require('../parses.js');
const commands = require('../commands.json');

exports.Run = function (message, cmd) {
  var rEmbed = new Discord.RichEmbed;
  rEmbed.setColor(0x7DE868)
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
      var iServer = cmd.iServer;
      if(iServer !== -1) {
        var iPosition = Utils.optionPosition(iServer, 'disabled', commands[cCommand.iCommand].name.toLowerCase());
        if(iPosition !== -1) {
          Utils.spliceOption(iServer, 'disabled', iPosition);
        }
      }
      rEmbed.setTitle('Command enabled')
        .setDescription('You have enabled the **' + commands[cCommand.iCommand].name.toLowerCase() + '** command.')
    } else {
      rEmbed.setTitle('Command not found')
        .setDescription('The command you were looking for was not found. Try `' + cmd.sPrefix + 'help` for a list of commands.');
    }
  }
  message.channel.send('', rEmbed);
}
