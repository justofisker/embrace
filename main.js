//
// Embrace created by MsDiana (https://msdiana.io)
//
// An open-source multipurpose Discord bot
//

// Modules

const Discord = require('discord.js')
const fs = require('fs');

// Globals

global.client = new Discord.Client();
global.servers  = require('./src/servers.json');

// Constants

const Utils    = require('./src/utils.js');
const Parses = require('./src/parses.js')

// On Message

client.on('message', message => {
  var cmd = Parses.Message(message);
  if(cmd) {
    if(cmd.cFail.bFail) {
      var rEmbed = new Discord.RichEmbed;
      rEmbed.setTitle('Command Failed')
        .setFooter('Command failure', client.user.avatarURL)
        .setTimestamp(new Date())
        .setColor(0xAA2323);
      switch(cmd.cFail.sFailType) {
        case 'nsfw':
        rEmbed.setDescription('This command is NSFW and therefore you can only use it in NSFW channels.');
        break;
        case 'dm':
        rEmbed.setDescription('This command is cannot be used in direct messages.');
        break;
        case 'permission':
        rEmbed.setDescription('You do not have sufficient permissions. You need the following permission(s): **' + cmd.cFail.aFailReason.join('**, **').toPermissionName() + '**.');
        break;
        case 'disabled':
        rEmbed.setDescription('This command is disabled.');
        break;
        default:
        rEmbed.setDescription('Command failed for an unknown reason.');
        break;
      }
      message.channel.send('', rEmbed);
    } else {
        if (fs.existsSync('./src/commands/' + cmd.sName + '.js')) {
          require('./src/commands/' + cmd.sName + '.js').Run(message, cmd);
        } else {
        console.error('Command file "./src/commands/' + cmd.sName + '.js" not found.');
        }
    }
  }
});

// Other Listeners



// Login and Logout

client.on('ready', () => {
  console.log('Now online as ' + client.user.tag + ' on ' + client.guilds.size + ' server' + (client.guilds.size === 1 ? '' : 's') + '!');
  client.user.setActivity('@' + client.user.username + ' help')
});

client.on('disconnect', () => {
  fs.writeFile("./src/servers.json", JSON.stringify(servers), function(error){
    if(error) {
      console.log(error);
    }
  });
  console.log('Now offline as ' + client.user.tag + '!');
});

// Login with token

if(require('./src/token.json') === '') {
  console.log('Please enter your bot\'s token in "src/token.json"');
} else
  client.login(require('./src/token.json'));
