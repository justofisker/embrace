const Discord = require('discord.js');

exports.Run = function (message, cmd) {
  var rEmbed = new Discord.RichEmbed;
  rEmbed.setTitle('Invite ' + client.user.username)
    .setDescription('Click the text above to invite me to your server!')
    .setFooter(cmd.Command.footer , client.user.avatarURL)
    .setColor(0x6D53BA);
  client.generateInvite(['KICK_MEMBERS', 'BAN_MEMBERS', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'MANAGE_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'MENTION_EVERYONE', 'USE_EXTERNAL_EMOJIS', 'CONNECT', 'SPEAK', 'MANAGE_WEBHOOKS'])
    .then(link => {
      rEmbed.setURL(link);
      message.author.send('', rEmbed);
  });
}
