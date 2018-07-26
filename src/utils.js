const Parses = require('./parses.js');

exports.setOption = function (iServer, sOption, value) {
  if(iServer !== -1) {
    servers[iServer][sOption] = value;
  }
}

exports.pushOption = function (iServer, sOption, value) {
  if(iServer !== -1) {
    if (typeof servers[iServer][sOption] === 'undefined') {
      servers[iServer][sOption] = [ value ];
      return 1;
    } else
      return servers[iServer][sOption].push(value);
  }
  return 0;
}

exports.optionPosition = function (iServer, sOption, value) {
  if(iServer !== -1 && typeof servers[iServer][sOption] !== 'undefined') {
    for(var i = 0; i < servers[iServer][sOption].length; i++) {
      if(servers[iServer][sOption][i] === value)
        return i;
    }
  }
  return -1;
}

exports.spliceOption = function (iServer, sOption, iPosition, iAmount = 1) {
    if(iServer !== -1) {
      return servers[iServer][sOption].splice(iPosition, iAmount);
    }
    return -1;
}

exports.getOption = function (iServer, sOption) {
  var server = iServer;
  if(server >= servers.length)
    server = -1;
  if(server === -1)
    return Parses.Option(sOption).value.default;
  else
    return (typeof servers[server][sOption] === 'undefined') ? Parses.Option(sOption).value.default : servers[server][sOption];
}

exports.createServer = function (sID) {
  return servers.push({ id: sID }) - 1;
}

// Code line and code blocks not supported
String.prototype.toSafe = function () {
  return this.replace('\\\\\\*', '*')
    .replace('\\*', '\\*')
    .replace('\\_', '_')
    .replace('_', '\\_')
    .replace('\\\\`', '`')
    .replace('`', '\\`')
    .replace('\\\\~', '~')
    .replace('~', '\\~');
};

String.prototype.toPermissionName = function() {
  return this.replace('ADMINISTRATOR', 'Administrator')
    .replace('CREATE_INSTANT_INVITE', 'Create Instant Invite')
    .replace('KICK_MEMBERS', 'Kick Members')
    .replace('BAN_MEMBERS', 'Ban Members')
    .replace('MANAGE_CHANNELS', 'Manage Channels')
    .replace('MANAGE_GUILD', 'Manage Server')
    .replace('ADD_REACTIONS', 'Add Reactions')
    .replace('VIEW_AUDIT_LOG', 'View Audit Log')
    .replace('VIEW_CHANNEL', 'Read Text Channels & See Voice Channels')
    .replace('READ_MESSAGES', 'Read Text Channels & See Voice Channels')
    .replace('SEND_MESSAGES', 'Send Messages')
    .replace('SEND_TTS_MESSAGES', 'Send TTS Messages')
    .replace('MANAGE_MESSAGES', 'Manage Messages')
    .replace('EMBED_LINKS', 'Embed Links')
    .replace('ATTACH_FILES', 'Attach Files')
    .replace('READ_MESSAGE_HISTORY', 'Read Message History')
    .replace('MENTION_EVERYONE', 'Mention Everyone')
    .replace('USE_EXTERNAL_EMOJIS', 'Use External Emojis')
    .replace('EXTERNAL_EMOJIS', 'Use External Emojis')
    .replace('CONNECT', 'Connect')
    .replace('SPEAK', 'Speak')
    .replace('MUTE_MEMBERS', 'Mute Members')
    .replace('DEAFEN_MEMBERS', 'Deafen Members')
    .replace('MOVE_MEMBERS', 'Move Members')
    .replace('USE_VAD', 'Use Voice Activity')
    .replace('CHANGE_NICKNAME', 'Change Nickname')
    .replace('MANAGE_NICKNAMES', 'Manage Nicknames')
    .replace('MANAGE_ROLES', 'Manage Roles')
    .replace('MANAGE_ROLES_OR_PERMISSIONS', 'Manage Roles')
    .replace('MANAGE_WEBHOOKS', 'Manage Webhooks')
    .replace('MANAGE_EMOJIS', 'Manage Emojis');
}
