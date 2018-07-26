const Discord  = require('discord.js');
const Utils    = require('../utils.js')
const Parses   = require('../parses.js');
const options  = require('../options.json');

function valuetoString(sType, sValue) {
  if(sValue)
    switch(sType) {
      case 'string':
      case 'argument':
      return '"' + sValue + '"';
      break;
      case 'channel':
      return '<#' + sValue + '>';
      break;
      case 'user':
      return '<@' + sValue + '>';
      break;
      case 'role':
      return '<@&' + sValue + '>';
      break;
    }
  else
    return null;
}

exports.Run = function (message, cmd) {
  var rEmbed = new Discord.RichEmbed;
  rEmbed.setColor(0x3DABF4)
    .setFooter(cmd.Command.footer, client.user.avatarURL);
  if(cmd.aArguments.length === 0) {
    // Show all options and value
    rEmbed.setTitle('Server Options')
      .setDescription('Below is a list of server options and their current values.')
    for(var i = 0; i < options.length; i ++) {
      var value = valuetoString(options[i].value.type, Utils.getOption(cmd.iServer, options[i].parameter));
      rEmbed.addField(options[i].parameter, value ? value : '`Not set`', true);
    }
  } else if (cmd.aArguments.length === 1) {
    var option = Parses.Option(cmd.aArguments[0].toLowerCase());
    // Show detail about an option
    if(option) {
      rEmbed.setTitle(option.name)
        .setDescription(option.description)
      var value = valuetoString(option.value.type, Utils.getOption(cmd.iServer, option.parameter));
      rEmbed.addField(option.parameter, value ? value : '`Not set`', true);
    } else {
      rEmbed.setTitle('Option not found')
        .setDescription('The option you were looking for was not found. Use `' + cmd.Prefix + 'set` to see a list of all options.');
    }
  } else {
    var sOption = cmd.aArguments[0].toLowerCase();
    // Set an option
    var option = Parses.Option(sOption);
    if(option) {
      var value = null;
      switch(option.value.type) {
        case 'string':
        value = cmd.sArgumentString.substr(option.parameter.length + 1);
        while(value.startsWith(' '))
          value = value.substr(1);
        break;
        case 'argument':
        value = cmd.aArguments[1];
        break;
        case 'channel':
        value = Parses.Channel(message.guild, cmd.aArguments.slice(1).join(' '));
        if(value)
          value = value.id;
        break;
        case 'user':
        value = Parses.User(message.channel, cmd.aArguments.slice(1).join(' '));
        if(value)
          value = value.id;
        break;
        case 'role':
        value = Parses.Role(message.guild, cmd.aArguments.slice(1).join(' '));
        if(value)
          value = value.id;
        break;
      }
      if(typeof option.value.lowercase !== 'undefined' && typeof value === 'string') {
        if(option.value.lowercase)
          value = value.toLowerCase();
      }
      var bFail = false;
      if(typeof option.value.regexp !== 'undefined' && typeof value === 'string') {
        if(!(new RegExp(option.value.regexp).test(value)))
          bFail = true;
      }
      if(bFail) {
        rEmbed.setTitle('Failed to set option')
          .setDescription('Check to make sure you correctly typed what you want to set this option to.');
      } else {
        Utils.setOption(cmd.iServer, option.value.name, value);
        rEmbed.setTitle(option.name + ' set')
          .setDescription('**' + option.name + '** is now ' + valuetoString(option.value.type, value) + '.');
      }
    } else {
      rEmbed.setTitle('Option not found')
        .setDescription('The option you were looking for was not found. Use `' + cmd.Prefix + 'set` to see a list of all options.');
    }
  }
  message.channel.send('', rEmbed);
}
