const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Server Information")
    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name)
    .addField("Total Members", message.guild.memberCount)
    .addField("Create Bot", "MKxRay ᴰᵉᵛ ⚒#1224");

    message.channel.send(serverembed);
}

module.exports.help = {
  name:"serverinfo"
}