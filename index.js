const Discord = require('discord.js');
const client = new Discord.Client();
const request = require('snekfetch');
const config = require('./botconfig.json');
const { prefix, token } = require('./botconfig.json');

client.on(`ready`, () => {
  console.log(`I am super-ready!`);
client.user.setActivity('Before Daybreak: Season 1');

});

client.on('message', async (message, member) => {

if (message.content.startsWith(`${prefix}ping`)) {
	let pingembed = new Discord.RichEmbed()
	.setTitle("PONG!") 	 
	.setColor("#2387c3")
	.addField("Ping:", 'Pong! Your ping is `' + `${Date.now() - message.createdTimestamp}` + ' ms`')
	.setFooter(`Bot Version: 2.0.0, requested by ${message.author.tag}`)
	.setTimestamp();
	  message.channel.send(pingembed);
  }
	
	

	
	  if (message.content.startsWith(`${prefix}avatar`)) { 
	   let user = message.mentions.users.first(); 
if(!user) return message.channel.send("You haven't selected/mentioned a user whose avatar you want to see."); 
    let avatarEmbed = new Discord.RichEmbed()
    .setAuthor(`${user.username}'s Profile Picture`)
    .setImage(user.displayAvatarURL)
    .setColor("#ea9b67")
    .setTimestamp();
    message.channel.send(avatarEmbed);
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

client.on('message', async (message) => {

	
if (message.content.startsWith(`${prefix}ban`)) {

let args = message.content.slice(1).split(" ");
if(!message.member.hasPermission("MANAGE_MESSAGES"))
return message.channel.send("You don't have the permissions to manage messages, you will not be able to do this command.");

			
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


if (message.content.startsWith(`${prefix}kick`)) {
	
let args = message.content.slice(1).split(" ");
if(!message.member.hasPermission("MANAGE_MESSAGES"))
return message.channel.send("You don't have the permissions to manage messages, you will not be able to do this command.");
	
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
	
	
	if (message.content.startsWith(`${prefix}userinfo`)) {

 let member = message.mentions.users.first() || message.author
            let player = message.mentions.members.first() || message.member
            let user = message.mentions.users.first();
            let iicon = player.user.displayAvatarURL;
            let roles = message.mentions.members.first().roles.map(role => role).join(" ");
        if(!user) return message.channel.send("You haven't selected/mentioned a user whose info you want to see.");
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
	
	
	if (message.content.startsWith(`${prefix}botinfo`)) {

    let bicon = client.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setTitle("Bot Information")
    .setColor("#dcc2ea")
    .setThumbnail(bicon)
    .addField("Bot Name", client.user.username)
    .addField("Bot Tag", client.user.tag)
    .addField("Date Of Creation", client.user.createdAt.toLocaleString())
    .addField("Guilds", client.guilds.size)
    .addField("Users", client.users.size)
    .setTimestamp();
    return message.channel.send(botembed);
  }
	
	if (message.content.startsWith(`${prefix}serverinfo`)) {
		
    let sicon = message.guild.iconURL;
    let server = message.guild.name;
    let serverembed = new Discord.RichEmbed()
    .setTitle("Server Information")
    .setDescription(`Information on ${server}:`)
    .setThumbnail() 
    .setColor("#c2dbea")
    .addField('Guild ID', message.guild.id, true)
    .addField('Guild Name', message.guild.name, true)
    .addField('Guild Channel Total', message.guild.channels.size, true)
    .addField('Guild Member Total', message.guild.memberCount, true)
    .addField('Guild Role Total', message.guild.roles.size, true)
    .addField('Guild Region', message.guild.region, true)
    .addField('Date Of Server Creation', message.guild.createdAt.toLocaleDateString(), true)
    .addField('Guild Owner', message.guild.owner, true)
    .setThumbnail(sicon) 
    .setTimestamp();
    message.channel.send(serverembed);
  }

if (message.content.startsWith(`${prefix}addrole`)) {


let args = message.content.split(/ +/g).slice(1)
if(!message.member.hasPermission("MANAGE_MESSAGES"))
return message.channel.send("You don't have the permissions to manage messages, you will not be able to do this command.");
	

let aMember = message.mentions.members.first() || message.guild.members.get(args[0])
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
   let aMember = message.mentions.members.first() || message.guild.members.get(args[0])
    let role = args.slice(1).join(" ") 
    let aRole = message.guild.roles.find(r => r.name === role)
    await aMember.send(`You've been given the ${aRole.name} role.`);
 }catch(e){
	let args = message.content.split(/ +/g).slice(1)
	 let role = args.slice(1).join(" ") 
	 let aMember = message.mentions.members.first() || message.guild.members.get(args[0])
	 let aRole = message.guild.roles.find(r => r.name === role);
	 return message.channel.send(`You've successfully given ${aMember} the ${aRole.name} role!`)
 } 




if (message.content.startsWith(`${prefix}removerole`)) {


let args = message.content.split(/ +/g).slice(1)
if(!message.member.hasPermission("MANAGE_MESSAGES"))
return message.channel.send("You don't have the permissions to manage messages, you will not be able to do this command.");
	

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
});
	
client.login(process.env.BOT_TOKEN);
