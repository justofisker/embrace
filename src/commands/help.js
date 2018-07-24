const Discord  = require('discord.js')
const commands = require('../commands.json')
const Parses   = require('../parses.js');
const Utils    = require('../utils.js')

exports.Run = function (message, cmd) {
var rEmbed = new Discord.RichEmbed;
rEmbed.setColor(0xFFFF00);
if(cmd.aArguments.length === 0) {
  rEmbed.setTitle('List of commands')
    .setDescription('Use `help <command>` to see help and information on specific commands.')
    var aGroups = [];
    for(var i = 0; i < commands.length; i++) {
      if(commands[i].group === 'Hidden')
      continue;
      var iGroup = -1;
      for(var j = 0; j < aGroups.length; j++) {
        if(commands[i].group === aGroups[j]) {
          iGroup = j;
          break;
      }
    }
    if(iGroup === -1) {
      iGroup = aGroups.length;
      aGroups.push(commands[i].group)
      rEmbed.addField(commands[i].group, commands[i].name.toLowerCase(), true);
    } else {
      rEmbed.fields[iGroup].value += '\n' + commands[i].name.toLowerCase();
    }
  }
} else {
  var cCommand = Parses.Command(cmd.aArguments[0].toLowerCase());
  if(cCommand && commands[cCommand.iCommand].group !== 'Hidden') {
    rEmbed.setTitle(commands[cCommand.iCommand].name)
      .setDescription(commands[cCommand.iCommand].description)
      .addField('Usage', commands[cCommand.iCommand].name.toLowerCase() + ' ' + commands[cCommand.iCommand].usage, true)
      .addField('Aliases', commands[cCommand.iCommand].aliases.length === 0 ? '`None`' : commands[cCommand.iCommand].aliases.join(', '), true);
    if(typeof commands[cCommand.iCommand].permissions !== 'undefined') {
      if(commands[cCommand.iCommand].permissions.length > 0)
        rEmbed.addField('Permission Needed', commands[cCommand.iCommand].permissions.join(', ').toPermissionName(), true);
    }
  } else {
    rEmbed.setTitle('Command not found')
      .setDescription('The command you were looking for was not found. Check your spelling or `help` for a list of commands.');
  }
}
rEmbed.addField('Please note', 'Do **not** use prefixes while direct messaging me. Please also note different servers may have different prefixes. You can use `@' + client.user.username + ' prefix` in a server to see what my prefix in that server is.', false);
message.author.send('', rEmbed);
}
