const Discord = require('discord.js');

exports.Run = function (message, cmd) {
  var rEmbed = new Discord.RichEmbed;
  rEmbed.setTitle('Pong!')
    .setFooter(cmd.Command.footer, client.user.avatarURL)
    .setTimestamp(new Date(client._pingTimestamp));
    var iPing = Math.ceil(client.ping);
    const iWorst = 200;
    const iBest  = 100;
    /*
     *  iRed is determined by limiting the range of iPing between iWorst (highest ping value) and iBest (lowest bring value)
     *  It's divided by difference of iWorst and iBest to get a value between 0 and 1
     *  It is also multiplied by 255 become the red value of the embed color.
     */
    var iRed = Math.ceil(Math.max(0, Math.min(iPing, iWorst) - iBest) / (iWorst - iBest) * 255);
    rEmbed.setColor([iRed, 255 - iRed, 0])
    .setDescription('**' + client.user.username + '** is online with a ping of **' + iPing  + 'ms**.');
    message.channel.send('', rEmbed);
}
