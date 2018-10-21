const Discord = require('discord.js');
const client = new Discord.Client();
const request = require('snekfetch');
const config = require('./botconfig.json');
const { prefix, token } = require('./botconfig.json');
const ms = require("ms");

client.on(`ready`, () => {
  console.log(`Public Dawn is online!`);
client.user.setActivity('Daybreak: Season 1');

});

client.on('message', async (message, member) => {

		if (message.content.toLowerCase().startsWith(`${prefix}ping`)) {
    let msgping1 = new Date();
    let clientping = new Date() - message.createdAt;
    let msgping2 = new Date() - msgping1;
    let pingembed = new Discord.RichEmbed()
       .setColor("#dcc2ea")
        .addField('🏓 Your Ping:', Math.floor(client.ping) + 'ms')
        .addField('🏓 Bot Ping:', Math.floor(clientping) + 'ms')
        .setTimestamp()
        .setFooter(`Ping Request By: ${message.author.tag}`);      
    message.channel.send(pingembed);
	}
	
	if (message.content.toLowerCase().startsWith(`${prefix}avatar`)) { 
      let player = message.mentions.members.first() || message.member
	   let user = player.user
    let avatarEmbed = new Discord.RichEmbed()
    .setAuthor(`${user.tag}'s Profile Picture`, `${user.displayAvatarURL}`)
    .setImage(user.displayAvatarURL)
    .setColor("#dcc2ea");
    return message.channel.send(avatarEmbed);
}
	
if (message.content.toLowerCase().startsWith(`${prefix}ban`)) {


if(!message.member.hasPermission("MANAGE_MESSAGES"))
return message.channel.send("You don't have the permissions to manage messages, you will not be able to do this command.");

	let args = message.content.slice(1).split(" ");		
	let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("You haven't selected/mentioned a user to ban.");
	    let bReason = args.slice(1).join(" ") || "None";
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don't have the permissions to manage messasges, you will not be able to do this command.");
     if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("This user can't be banned! They are either the same rank or higher then you.");
  
    let banEmbed = new Discord.RichEmbed()
    .setDescription("Ban Report")
    .setColor("#dcc2ea")
    .addField("Banned User", `${bUser} with ID ${bUser.id}`)
    .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Banned In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", bReason)
    .setThumbnail(bUser.user.displayAvatarURL)
    .setTimestamp();
  
    let banChannel = message.guild.channels.find(c => c.name === 'logging');
    if(!banChannel) return message.channel.send("I can't find logging channel.");
  
    message.guild.member(bUser).ban(bReason);
    banChannel.send(banEmbed);
  
    return message.channel.send(`${bUser} has just been hit by the ban-hammer!`)
	
}	


if (message.content.toLowerCase().startsWith(`${prefix}kick`)) {
	

if(!message.member.hasPermission("MANAGE_MESSAGES"))
return message.channel.send("You don't have the permissions to manage messages, you will not be able to do this command.");

let args = message.content.slice(1).split(" ");
let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
if(!kUser) return message.channel.send("You haven't selected/mentioned a user to kick.");
let kReason = args.slice(1).join(" ") || "None";
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don't have the permissions to manage messasges, you will not be able to do this command.");
if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("This user can't be kicked! They are either the same rank or higher then you.");

let kickEmbed = new Discord.RichEmbed()
.setDescription("Kick Report")
.setColor("#dcc2ea")
.addField("Kicked User", `${kUser} with ID ${kUser.id}`)
.addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
.addField("Kicked In", message.channel)
.addField("Time", message.createdAt)
.addField("Reason", kReason)
.setThumbnail(kUser.user.displayAvatarURL)
.setTimestamp();

let kickChannel = message.guild.channels.find(c => c.name === 'logging');
if(!kickChannel) return message.channel.send("I can't find logging channel.");

message.guild.member(kUser).kick(kReason);
kickChannel.send(kickEmbed);

return message.channel.send(`${kUser} has been kicked from the server!`)

}
	
	
if (message.content.toLowerCase().startsWith(`${prefix}userinfo`)) {

 let member = message.mentions.users.first() || message.author
            let player = message.mentions.members.first() || message.member
            let user = player.user
            let iicon = player.user.displayAvatarURL;
            let roles = message.mentions.members.first().roles.map(role => role).join(" ");
            let userEmbed = new Discord.RichEmbed()
            .setAuthor(`${user.username}'s Info`, user.displayAvatarURL)
            .setThumbnail(user.displayAvatarURL)
            .setColor('#c2c5ea')
            .addField('User ID', user.id, true)
            .addField('Current Tag', user.tag, true)
            .addField('Server Nickname', `${player.displayName}`, true) 
            .addField('Highest Member Role', `${player.highestRole.name}`, true)
            .addField('Roles', `${roles}`)
            .addField('Game/Playing', `${(user.presence.game && user.presence.game && user.presence.game.name) || 'None'}`, true)
            .addField('Status', user.presence.status, true)
            .addField('Bot', user.bot, true)
            .addField('Joined At:', `${player.joinedAt}`)
            .addField('Account Created On:', `${player.user.createdAt}`)
            .setThumbnail(iicon)
            .setTimestamp();
            message.channel.send(userEmbed)
	}
	
	
if (message.content.toLowerCase().startsWith(`${prefix}botinfo`)) {

    let player = message.mentions.members.first() || message.member
    let bicon = client.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setTitle("🤖 Bot Information")
    .setDescription("Information on WeatherDawn:")
    .setColor("#FFC0CB")
    .setThumbnail(bicon)
    .addField("Bot ID", client.user.id, true)
    .addField("Bot Tag", client.user.tag, true)
    .addField('Bot Nickname', `${player.displayName}`, true) 
    .addField("Serving", `${client.users.size} users`, true)
    .addField("Date Of Creation", client.user.createdAt.toLocaleDateString(), true)
    .addField("Uptime", moment.duration(client.uptime).format('d[d ]h[h ]m[m ]s[s]'), true)
    .setFooter("Created By @Dawn.Bots.INC", client.user.displayAvatarURL)
    .setTimestamp();
    return message.channel.send(botembed);
  }    
if (message.content.toLowerCase().startsWith(`${prefix}serverinfo`)) {
		
    let sicon = message.guild.iconURL;
    let server = message.guild.name;
    let serverembed = new Discord.RichEmbed()
    .setTitle("👑 Server Information")
    .setDescription(`Information on ${server}:`)
    .setColor("#FFC0CB")
    .addField('Server ID', message.guild.id, true)
    .addField('Server Name', message.guild.name, true)
    .addField('Humans', `${message.guild.members.filter(m => !m.user.bot).size}`, true)
    .addField('Bots', `${message.guild.members.filter(m => m.user.bot).size}`, true)
    .addField('Member Total', message.guild.memberCount, true)
    .addField('Role Total', message.guild.roles.size, true)
    .addField('Channel Total', message.guild.channels.size, true)
    .addField('Region', message.guild.region, true)
    .addField('Server Made', message.guild.createdAt.toLocaleDateString(), true)
    .addField('Server Owner', message.guild.owner, true)
    .setFooter(`${server}`, sicon)
    .setThumbnail(sicon) 
    .setTimestamp();
    message.channel.send(serverembed);
  }
	

if (message.content.toLowerCase().startsWith(`${prefix}addrole`)) {



if(!message.member.hasPermission("MANAGE_MESSAGES"))
return message.channel.send("You don't have the permissions to manage messages, you will not be able to do this command.");
	
let args = message.content.split(/ +/g).slice(1)
let aMember = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
 if(!aMember) return message.channel.send("You haven't selected/mentioned a user to give a role.");
let role = args.slice(1).join(" ") 
  if(!role) return message.channel.send("Which role might you want to add?");
let aRole = message.guild.roles.find(r => r.name === role)
  if (!aRole) return message.channel.send("That role doesn't exist or you aren't spelling the role's name right.");
  if(aMember.roles.has(aRole.id))
  return message.channel.send("The role you are trying to give, they already have.");
await aMember.addRole(aRole.id)
}
  try {
   let args = message.content.split(/ +/g).slice(1)
   let aMember = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let role = args.slice(1).join(" ") 
    let aRole = message.guild.roles.find(r => r.name === role)
    await aMember.send(`You've been given the ${aRole.name} role.`);
 }catch(e){
	let args = message.content.split(/ +/g).slice(1)
	 let role = args.slice(1).join(" ") 
	 let aMember = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	 let aRole = message.guild.roles.find(r => r.name === role);
	 return message.channel.send(`You've successfully given ${aMember} the ${aRole.name} role!`)
 } 




if (message.content.toLowerCase().startsWith(`${prefix}removerole`)) {



if(!message.member.hasPermission("MANAGE_MESSAGES"))
return message.channel.send("You don't have the permissions to manage messages, you will not be able to do this command.");
	
let args = message.content.split(/ +/g).slice(1)
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if (!rMember) return message.channel.send("You haven't selected/mentioned a user whose role you want to remove.");
  let role = args.join(" ").slice(22);
  if(!role) return message.channel.send("Which role might you want to remove?");
    let gRole = message.guild.roles.find(r => r.name === role)
  if (!gRole) return message.channel.send("That role doesn't exist or you aren't spelling the role's name right.");
  if(!rMember.roles.has(gRole.id)) 
return message.channel.send("The role you are trying to take away, they don't have.");
  await(rMember.removeRole(gRole.id));
}
  try{
    let args = message.content.split(/ +/g).slice(1)
      let role = args.join(" ").slice(22);
    let rMember = message.mentions.members.first() || message.guild.members.get(args[0])
    let gRole = message.guild.roles.find(r => r.name === role)
    await rMember.send(`The ${gRole.name} role has been removed from you!`)
 }catch(e){
	let args = message.content.split(/ +/g).slice(1)
  let role = args.join(" ").slice(22);
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
	 let gRole = message.guild.roles.find(r => r.name === role);
   return message.channel.send(`You've successfully removed ${rMember}'s ${gRole.name} role!`)
 }
	     if (message.content.toLowerCase().startsWith(`${prefix}serverinvite`)) {
      if (message.channel.type == "dm") return;

    message.channel.createInvite().then(a =>
    message.author.send(a.toString()))
    message.channel.send(`📩 Invite Sucessfully sent to your DMs. `)
    
  }
	
if (message.content.toLowerCase().startsWith(`${prefix}mute`)) {	
if(!message.member.hasPermission("MANAGE_MESSAGES"))
return message.channel.send("You don't have the permissions to manage messages, you will not be able to do this command.");
	let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
if(!tomute) return message.reply("You haven't selected/mentioned a user who you want to mute.");
if(tomute.hasPermission("MANAGE_MESSAGES"))
return message.reply("This user cannot be muted.");
let muterole = message.guild.roles.find(r => r.name === `muted`);
//start of role
if(!muterole){
  try{
  muterole = await message.guild.createRole({
    name: "muted",
    color: "#23272a",
    permission: []
  })
  message.guild.channels.forEach(async (channel, id) => {
    await channel.overwritePermissions(muterole, {
      SEND_MESSAGES: false,
      ADD_REACTIONS: false
    });
  });

  }catch(e){
    console.log(e.stack);
  }
}
//end of role
let mutetime = args[1];
if(!mutetime) return message.reply("You didn't put a time-limit!")

await(tomute.addRole(muterole.id));
message.channel.send(`<@${tomute.id}> just got themselves muted for ${ms(ms(mutetime))}`);

setTimeout(function(){
  tomute.removeRole(muterole.id)
  message.channel.send(`<@${tomute.id}> has been unmuted!`);
}, ms(mutetime));
}
});
	client.on('guildMemberAdd', (member) => {
	
  let guild = member.guild;
  let server = member.guild.name;
member.addRole(`496863657347645471`);
  let logging = guild.channels.find(c => c.name === 'logging');
  let gembed = new Discord.RichEmbed()
      .setTitle("User Enterance")
      .setColor("#c2c5ea")
      .setDescription(`Welcome ${member}, to **${server}**, hope you enjoy your stay.`)
      .setTimestamp();
  logging.send(gembed);
	      });

client.on('guildMemberRemove', (member) => {
	
  let guild = member.guild;
  let server = member.guild.name;
  let logging = guild.channels.find(c => c.name === 'logging');
  let gembed = new Discord.RichEmbed()
      .setTitle("User Departure")
      .setColor("#c2c5ea")
      .setDescription(`Too bad that ${member} has decided to go, maybe one day you'll return to us. But for now, au revoir.`)
      .setTimestamp()
  logging.send(gembed);
	      });

client.on('messageDelete', async (message) => {
    let logging = message.guild.channels.find(c => c.name === 'logging');
    const dembed = new Discord.RichEmbed()
        .setTitle("Message Deleted")
        .setColor("#dcc2ea")
        .setDescription(`A message sent by ${message.author} was deleted in ${message.channel}`)
        .addField("Message:", `${message.cleanContent}`)
        .setTimestamp();
    logging.send(dembed);
});

client.on("messageUpdate", function (oldMessage, newMessage, channel) {
    if (newMessage.channel.type == 'text' && newMessage.cleanContent != oldMessage.cleanContent) {
        let logging = newMessage.guild.channels.find(c => c.name === 'logging');
        const eembed = new Discord.RichEmbed()
            .setTitle("Message Edited")
            .setColor("#dcc2ea")
            .setDescription(`A message sent by ${newMessage.author} was edited in ${newMessage.channel}`)
            .addField(`Old message:`, `${oldMessage.cleanContent}`)
            .addField(`New Message:`, `${newMessage.cleanContent}`)
            .setTimestamp();
        logging.send(eembed);
    }
});

client.on("channelCreate", async (channel) => {
  let logging = channel.guild.channels.find(c => c.name === 'logging');
  const cembed = new Discord.RichEmbed()
      .setTitle("Channel Created")
      .setColor("#c2cfea")
      .setDescription(`A **${channel.type} channel**, by the name of **${channel.name}**, was just created!`)
      .setTimestamp();
  logging.send(cembed);
});

client.on("channelDelete", async (channel) => {
  let logging = channel.guild.channels.find(c => c.name === 'logging');
  const cembed = new Discord.RichEmbed()
      .setTitle("Channel Remove")
      .setColor("#c2cfea")
      .setDescription(`A **${channel.type} channel**, by the name of **${channel.name}**, was just deleted!`)
      .setTimestamp();
  logging.send(cembed);
});
	
client.login(process.env.BOT_TOKEN);
