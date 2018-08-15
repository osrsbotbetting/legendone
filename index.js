const botconfig = require("./botconfig.json");
const tokenfile = require("./token.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
let coins = require("./coins.json");
let xp = require("./xp.json");
let purple = botconfig.purple;
let cooldown = new Set();
let cdseconds = 5;

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);

  });
});


function changing_status() {
  let status = ['💂Legends Never Die💂', '📑For Help: ~help📑', '♥League Of Legends Israel♥']
  let random = status[Math.floor(Math.random() * status.length)]
  bot.user.setActivity(random, {type:'WATCHING'})
}

bot.on("ready", () => {
  console.log( /*Whatever you want to say*/ );
  setInterval(changing_status, 5000);
})

//Continue with code!


//Side Notes
//9000 is 9 seconds.


bot.on('guildMemberAdd', member => {
  let channel = member.guild.channels.find('name', 'join-leave-log');
  let memberavatar = member.user.avatarURL
      if (!channel) return;
      let embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setThumbnail(memberavatar)
      .addField(':bust_in_silhouette: | name : ', `${member}`)
      .addField(':microphone2: | Welcome!', `Welcome to the server, ${member}`)
      .addField(':id: | User :', "**[" + `${member.id}` + "]**")
      .addField(':family_mwgb: | Your are the member', `${member.guild.memberCount}`)
      .addField("Name", `<@` + `${member.id}` + `>`, true)
      .addField('Server', `${member.guild.name}`, true )
      .setFooter(`**${member.guild.name}**`)
      .setTimestamp()

      channel.sendEmbed(embed);
});

bot.on('guildMemberAdd', member => {

  console.log(`${member}`, "has joined" + `${member.guild.name}`)

});

bot.on('guildMemberRemove', member => {
  let channel = member.guild.channels.find('name', 'join-leave-log');
  let memberavatar = member.user.avatarURL
      if (!channel) return;
      let embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setThumbnail(memberavatar)
      .addField('Name:', `${member}`)
      .addField('Has Let the Server', ';(')
      .addField('Bye Bye :cry:', 'We will all miss you!')
      .addField('The server now as', `${member.guild.memberCount}` + " members")
      .setFooter(`**${member.guild.name}`)
      .setTimestamp()
      channel.sendEmbed(embed);
});

bot.on('guildMemberRemove', member => {
  console.log(`${member}` + "has left" + `${member.guild.name}` + "Sending leave message now")
  console.log("Leave Message Sent")
});

bot.on('guildCreate', guild => {
      console.log(`New guild added : ${guild.name}, owned by ${guild.owner.user.username}`);
});

bot.on('roleDelete', async role => {
     
   let logchannel = role.guild.channels.find(`name`, "log");
   logchannel.sned(`The role ${role.name} has been deleted.`)
});

bot.on('roleCreate', async role => {
     
  let logchannel = role.guild.channels.find(`name`, "log");
  logchannel.sned(`The role ${role.name} has been Create.`)
});

bot.on('channelCreate', async channel => {

  console.log(`${channel.name} has been created.`);

  let schannel = channel.guild.channels.find(`name`, "log");
  schannel.send(`${channel} has been created`);
});

bot.on('channelDelete', async channel => {

  console.log(`${channel.name} has been deleted.`);

  let schannel = channel.guild.channels.find(`name`, "log");
  schannel.send(`${channel} has been deleted`);
});

bot.on('roleUpdate', async (oldrole, newrole) => {
 
  let logchannel = newrole.guild.channels.find(`name`, "log");
  logchannel.send(`The Role ${oldrole.name} has changed to ${newrole}`);
});

bot.on('guildMemberUpdate', async (oldmember, newmember ) => {

  let logchannel = newmember.guild.channels.find(`name`, "log");

  if(oldmember.displayName == newmember.displayName){
    return logchannel.send(`The user ${newmember} has been updated`);
  }
  logchannel.send(`The user ${oldmember.displayName} has changed to ${newmember}`)

});

bot.on("message", async message => {

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    };
  }

  if(!coins[message.author.id]){
    coins[message.author.id] = {
      coins: 0
    };
  }

  let coinAmt = Math.floor(Math.random() * 15) + 1;
  let baseAmt = Math.floor(Math.random() * 15) + 1;
  console.log(`${coinAmt} ; ${baseAmt}`);

  if(coinAmt === baseAmt){
    coins[message.author.id] = {
      coins: coins[message.author.id].coins + coinAmt
    };
  fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
    if (err) console.log(err)
  });
  let coinEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setColor("#0000FF")
  .addField("💸", `${coinAmt} coins added!`);

  message.channel.send(coinEmbed).then(msg => {msg.delete(5000)});
  }

  let xpAdd = Math.floor(Math.random() * 7) + 8;
  console.log(xpAdd);

  if(!xp[message.author.id]){
    xp[message.author.id] = {
      xp: 0,
      level: 1
    };
  }


  let curxp = xp[message.author.id].xp;
  let curlvl = xp[message.author.id].level;
  let nxtLvl = xp[message.author.id].level * 300;
  xp[message.author.id].xp =  curxp + xpAdd;
  if(nxtLvl <= xp[message.author.id].xp){
    xp[message.author.id].level = curlvl + 1;
    let lvlup = new Discord.RichEmbed()
    .setTitle("Level Up!")
    .setColor(purple)
    .addField("New Level", curlvl + 1);

    message.channel.send(lvlup).then(msg => {msg.delete(5000)});
  }
  fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
    if(err) console.log(err)
  });
  let prefix = prefixes[message.guild.id].prefixes;
  if(!message.content.startsWith(prefix)) return;
  if(cooldown.has(message.author.id)){
    message.delete();
    return message.reply("You have to wait 5 seconds between commands.")
  }
  if(!message.member.hasPermission("ADMINISTRATOR")){
    cooldown.add(message.author.id);
  }


  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

  setTimeout(() => {
    cooldown.delete(message.author.id)
  }, cdseconds * 1000)

});


bot.login(tokenfile.token);