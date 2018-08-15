const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  let helpembed = new Discord.RichEmbed()
  .setDescription("Help Menu")
  .setColor('RANDOM')
  .addField("8ball", "Usage: ~8ball [question]")
  .addField("botinfo", "Usage: ~botinfo")
  .addField("cat", "Usage: ~cat")
  .addField("credits", "Usage: ~credits")
  .addField("dog", "Usage: ~dog")
  .addField("help", "Usage: ~help")
  .addField("level", "Usage: ~level")
  .addField("pay", "Usage: ~pay [@user]")
  .addField("report", "Usage: ~report [@user]")
  .addField("say", "Usage: ~say [message here]")
  .addField("serverinfo", "Usage: ~serverinfo")
  .addField("meme", "Usage: ~meme")
  .addField("Links", "Usage: ~links")
  .addField("userinfo", "Usage: ~userinfo [@user]")

  message.member.send(helpembed);

  let Funembed = new Discord.RichEmbed()
  .setDescription("Fun Menu")
  .setColor('RANDOM')
  .addField("rps", "Usage: ~rps")
  .addField("joke", "Usage: ~joke")
  .addField("ascii", "Usage: ~ascii")

  message.member.send(Funembed);

  let Moneyembed = new Discord.RichEmbed()
  .setDescription("Money Menu")
  .setColor('RANDOM')
  .addField("pay", "Usage: ~pay")
  .addField("coins", "Usage: ~coins")

  message.member.send(Moneyembed);

  if(message.member.hasPermission("ADMINISTRATOR")){
  let modembed = new Discord.RichEmbed()
  .setDescription("Mod Help Menu")
  .setColor('RANDOM')
  .addField("addrole", "Usage: ~addrole [@user]")
  .addField("removerole", "Usage: ~removerole [@user]")
  .addField("kick", "Usage: ~kick [@user]")
  .addField("warn", "Usage: ~warn [@user]")
  .addField("tempmute", "Usage: ~tempmute [@user] [duration] [reason]")
  .addField("ban", "Usage: ~ban [@user] [reason]")
  .addField("prefix", "Usage: ~prefix [new prefix here]")
  .addField("mute", "Usage: ~mute")
  .addField("vote", "Usage: ~vote")
  .addField("unmute", "Usage: ~unmute")

  try{
    await message.author.send(modembed);
    message.react(":lologo:")
  }catch(e){
    message.reply("Your DMs are locked. I cannot send you the mod cmds.")
  }
}

}

module.exports.help = {
  name: "help"
}