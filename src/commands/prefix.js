const Discord = require('discord.js');
const Utils  = require('../utils.js')

exports.Run = function (message, cmd) {
  var rEmbed = new Discord.RichEmbed;
  rEmbed.setTitle('Current Prefix')
    .setColor(0xED71E2)
    .setFooter(cmd.Command.footer, client.user.avatarURL)
    .setDescription('My prefix on **' + message.guild.name.toSafe() + '** is currently `' + cmd.sPrefix + '`');
  message.channel.send('', rEmbed);
}
