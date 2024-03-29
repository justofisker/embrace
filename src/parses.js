const settings = require('./settings.json');
const commands = require('./commands.json');
const options  = require('./options.json');

exports.Command = function (sCommand) {
  var iCommand = -1
      iAlias   = -1;
  command_test:
  for(var i = 0; i < commands.length; i++) {
    if(commands[i].name.toLowerCase() === sCommand) {
      iCommand = i;
      break;
    } else for(var j = 0; j < commands[i].aliases.length; j++) {
      if(commands[i].aliases[j].toLowerCase() === sCommand) {
        iCommand = i;
        iAlias = j;
        break command_test;
      }
    }
  }
  if(iCommand === -1)
    return null;
  return {iCommand: iCommand, iAlias: iAlias};
}

exports.Arguments = function (sArguments) {
  // TODO: Add support for arguments in quotes to stay as one arg
  var aArguments = sArguments.split(' ');
  for(var i = 0; i < aArguments.length; i++) {
    if(aArguments[i] === '') {
      aArguments.splice(i, 1);
      i--;
    }
  }
  return aArguments;
}

exports.Message = function (message) {
  if(message.author.bot)
    return null;
  var iServer = -1
      sPrefix = ''
      sWorking = '';
  // If NOT a DM channel then test for server. Prefix will be blank for DM's
  if(message.channel.type !== 'dm') {
    // Test for server and prefix
    for(var i = 0; i < servers.length; i++) {
      if(servers[i].id === message.guild.id) {
        iServer = i;
        if(typeof servers[i].prefix === 'undefined')
          sPrefix = settings.defaultPrefix;
        else
          sPrefix = servers[i].prefix;
        break;
      }
    }
    if(sPrefix === '')
      sPrefix = settings.defaultPrefix;
    sWorking = message.content;
    if(sWorking.startsWith(sPrefix)) {
      sWorking = sWorking.substr(sPrefix.length);
    } else if (settings.mentionPrefix) {
      if(sWorking.startsWith('<@' + client.user.id + '>'))
        sWorking = sWorking.substr(('<@' + client.user.id + '>').length);
      else if (sWorking.startsWith('<@!' + client.user.id + '>'))
        sWorking = sWorking.substr(('<@!' + client.user.id + '>').length);
      else
        return null;
      while(sWorking.startsWith(' '))
        sWorking = sWorking.substr(1);
    } else
      return null;
  } else
    sWorking = message.content;
  // Take the first "word" of the message after the prefix as the command
  var sAlias = sWorking.split(' ')[0].toLowerCase();
  var cCommand = exports.Command(sAlias);
  if(!cCommand)
    return null;
  // Test for fails
  var bFail = false
      sFailType = ''
      aFailReason = [];
  if(message.channel.type === 'text') {
    if(iServer !== -1) {
      if(typeof servers[iServer].disabled !== 'undefined') {
        for(var i = 0; i < servers[iServer].disabled.length; i++) {
          if(servers[iServer].disabled[i].toLowerCase() === commands[cCommand.iCommand].name.toLowerCase()) {
            bFail = true;
            sFailType = 'disabled';
          }
        }
      }
    }
    if(!bFail && !message.channel.nsfw && commands[cCommand.iCommand].group === 'NSFW') {
      bFail = true;
      sFailType = 'nsfw';
    } else if(typeof commands[cCommand.iCommand].permissions !== 'undefined') { // Check for permissions
      for(var i = 0; i < commands[cCommand.iCommand].permissions.length; i++) {
        if(!message.member.permissions.has(commands[cCommand.iCommand].permissions[i]))
        {
          bFail = true;
          sFailType = 'permission';
          aFailReason.push(commands[cCommand.iCommand].permissions[i]);
        }
      }
    }
  } else {
    if(!commands[cCommand.iCommand].allow_dm) {
      bFail = true;
      sFailType = 'dm';
    }
  }
  // Format extra variables
  var sCommand = commands[cCommand.iCommand].name.toLowerCase();
  var sArgumentString = sWorking.substr(sAlias.length + 1);
  var aArguments = exports.Arguments(sArgumentString);
  return {
    sName: sCommand,
    sAlias: sAlias,
    aArguments: aArguments,
    sArgumentString: sArgumentString,
    sPrefix: sPrefix,
    iServer: iServer,
    cCommand: cCommand,
    Command: commands[cCommand.iCommand],
    cFail: {
      bFail: bFail,
      sFailType: sFailType,
      aFailReason: aFailReason
    }
  };
}

exports.User = function (channel, sUser) {
  if(/^<@!?\d+>$/.test(sUser)) {
    sUserID = sUser.substr(2, sUser.length - 3);
    if(sUserID.startsWith('!'))
      sUserID = sUserID.substr(1);
    var user = null;
    if(channel.type !== 'dm') { // Not DM Channel (text or voice)
      channel.members.some(function (member) {
        if(member.id === sUserID) {
          user = member.user;
          return true;
        }
      });
    } else { // DM Channel
      if(client.user.id === sWorking)
        user = client.user;
      else if (channel.recipient.id === sWorking)
        user = channel.recipient;
    }
    return user;
  } else {
      var user = null;
      if(channel.type !== 'dm') { // Not DM Channel (text or voice)
        channel.members.some(function (member) {
          if(member.id === sUser || member.user.username.toLowerCase() === sUser.toLowerCase()) {
            user = member.user;
            return true;
          }
          if(member.nickname)
            if(member.nickname.toLowerCase() === sUser.toLowerCase())
              user = member.user;
        });
      } else { // DM Channel
        if(client.user.id === sUser || client.user.username.toLowerCase() === sUser.toLowerCase())
          user = client.user;
        else if (channel.recipient.id === sUser || channel.recipient.username.toLowerCase() === sUser.toLowerCase())
          user = channel.recipient;
      }
      return user;
  }
  return null;
}

exports.Channel = function (guild, sChannel, sType = 'text') {
  if(/^<#\d+>$/.test(sChannel)) {
    var sChannelID = sChannel.substr(2, sChannel.length - 3);
    var out = null;
    guild.channels.some(function(channel) {
      if(channel.type === sType && channel.id === sChannelID) {
        out = channel;
        return true;
      }
    });
      return out;
  } else {
    var out = null;
    guild.channels.some(function (channel) {
      if(channel.id === sChannel) {
        out = channel;
        return true;
      }
      if(channel.name === sChannel.toLowerCase())
        out = channel;
    });
    return out;
  }
  return null;
}

exports.Option = function (sOption) {
  for(var i = 0; i < options.length; i++) {
    if(options[i].parameter === sOption.toLowerCase()) {
      return options[i];
    }
  }
  return null;
}

exports.Role = function (guild, sRole) {
  if(/^<@&\d+>$/.test(sRole)) {
    var sRoleID = sRole.substr(3, sRole.length - 4);
    var out = null;
    guild.roles.some(function (role) {
      if(role.id === sRoleID)
      {
        out = role;
        return true;
      }
    });
    return out;
  } else {
    var out = null;
    guild.roles.some(function (role) {
      if(role.id === sRole) {
        out = role;
        return true;
      } else if(role.name.toLowerCase() === sRole.toLowerCase())
        out = role;
    });
    return out;
  }
  return null;
}
