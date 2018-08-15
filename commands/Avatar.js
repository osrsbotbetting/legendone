const Discord = require('discord.js');

exports.run = (client, message, args, tools) => {
    
    // Define user, if nobody is mentioned it will store author
    let user = message.mentions.users.first() || message.author;
    
    // Form Embed
    let embed = new Discord.RichEmbed()
        .setAuthor(`${message.username}'s avatar`)
        .setColor('RANDOM')
        .setImage(`${message.guildmember.displayAvatarURL}`)
        
    // Send Message
    message.channel.send(embed)
    
}

module.exports.help = {
    name:"avatar"
  }