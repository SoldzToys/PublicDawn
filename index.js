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
	.setTimestamp(new Date());
	  message.channel.send(pingembed);
  }
	
	

	
	  if (message.content.startsWith(`${prefix}avatar`)) { 
	   let user = message.mentions.users.first(); 
if(!user) return message.channel.send("You haven't selected/mentioned a user whose avatar you want to see."); 
    let avatarEmbed = new Discord.RichEmbed()
    .setAuthor(`${user.username}'s Profile Picture`)
    .setImage(user.displayAvatarURL)
    .setColor("#ea9b67")
    .setTimestamp(new Date());
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
      .setTimestamp(new Date())
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
      .setTimestamp(new Date())
  logging.send(gembed);
	      });

client.on('messageDelete', async (message) => {
    let logging = message.guild.channels.find(c => c.name === 'logging');
    const dembed = new Discord.RichEmbed()
        .setTitle("Message Deleted")
        .setColor("#dcc2ea")
        .setDescription(`A message sent by ${message.author} was deleted in ${message.channel}`)
        .addField("Message:", `${message.cleanContent}`)
        .setTimestamp(new Date());
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
            .setTimestamp(new Date())
        logging.send(eembed);
    }
});

client.on("channelCreate", async (channel) => {
  let logging = channel.guild.channels.find(c => c.name === 'logging');
  const cembed = new Discord.RichEmbed()
      .setTitle("Channel Created")
      .setColor("#c2cfea")
      .setDescription(`A **${channel.type} channel**, by the name of **${channel.name}**, was just created!`)
      .setTimestamp(new Date());
  logging.send(cembed);
});

client.on("channelDelete", async (channel) => {
  let logging = channel.guild.channels.find(c => c.name === 'logging');
  const cembed = new Discord.RichEmbed()
      .setTitle("Channel Remove")
      .setColor("#c2cfea")
      .setDescription(`A **${channel.type} channel**, by the name of **${channel.name}**, was just deleted!`)
      .setTimestamp(new Date())
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
    .setTimestamp(new Date());
  
    let banChannel = message.guild.channels.find(c => c.name === 'logging');
    if(!banChannel) return message.channel.send("I can't find logging channel.");
  
    message.guild.member(bUser).ban(bReason);
    banChannel.send(banEmbed);
  
    return message.channel.send(`${bUser} has just been hit by the ban-hammer!`)
	
}	

});

client.on('message', async (message) => {
	
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
.setTimestamp(new Date());

let kickChannel = message.guild.channels.find(c => c.name === 'logging');
if(!kickChannel) return message.channel.send("I can't find logging channel.");

message.guild.member(kUser).kick(kReason);
kickChannel.send(kickEmbed);

return message.channel.send(`${kUser} has been kicked from the server!`)

}
	
});
client.on('message', async (message) => {
	
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
            .addField('Created At:', `${player.user.createdAt}`)
            .setThumbnail(iicon)
            .setTimestamp(new Date());
            message.channel.send(userEmbed)
	}
            });

client.on('message', async (message) => {
	
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
    .setTimestamp(new Date());
    return message.channel.send(botembed);
  }
});

client.on('message', async (message) => {
	
	if (message.content.startsWith(`${prefix}serverinfo`)) {
		
    let sicon = message.guild.iconURL;
    let server = message.guild.name;
    let serverembed = new Discord.RichEmbed()
    .setTitle("Server Information")
    .setDescription(`Infomration on ${server}:`)
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
    .setTimestamp(new Date());
    message.channel.send(serverembed);
  }
});

client.on('message', async (message) => {
	
if (message.content.startsWith(`${prefix}addrole`)) {

let args = message.content.slice(1).split(" ");	
if(!message.member.hasPermission("MANAGE_MESSAGES"))
return message.channel.send("You don't have the permissions to manage messages, you will not be able to do this command.");
	

let rMember = message.mentions.members.first() || message.guild.members.get(args[0])
 if(!rMember) return message.channel.send("You haven't selected/mentioned a user to give a role.");
  let role = args.slice(1).join(" ") 
  if(!role) message.channel.send("Which role might you want to add?");
  let gRole = message.guild.roles.find(r => r.name === role);
  if (!gRole) return message.channel.send("I couldn't find them.");
  if(rMember.roles.has(gRole.id));
  return message.channel.send("They already have this role.");
await rMember.addRole(gRole.id)
}
  try{
    await rMember.send(`You've been given the ${gRole.name} role.`)
 }catch(e){
	 message.channel.send(`You've been given the <@${rMember.id}> ${gRole.name} role. Those DMs aren't opened though.`)
 }
});
	
client.login(process.env.BOT_TOKEN);
