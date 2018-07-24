const settings = require('../settings.json')

exports.Run = function (message, cmd) {
  if(message.author.id === settings.ownerID)
   {
     client.destroy();
   }
}
