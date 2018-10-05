const Discord = require('discord.js');
const client = new Discord.Client();
const request = require('snekfetch');
const config = require('./botconfig.json');
const { prefix, token } = require('./botconfig.json');

client.on(`ready`, () => {
  console.log(`I am super-ready!`);
client.user.setActivity('?');

});

client.on('message', async (message) => {

  
  if (message.content === `${prefix}ping`) {
	let pingembed = new Discord.RichEmbed()
	.setTitle("PONG!") 	 
	.setColor("#2387c3")
	.addField("Ping:", 'Pong! Your ping is `' + `${Date.now() - message.createdTimestamp}` + ' ms`')
	.setFooter(`Bot Version: 2.0.0, requested by ${message.author.tag}`)
	.setTimestamp(new Date());
	  message.channel.send(pingembed);
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

client.on('message', async (message, slice) => {
	
if (message.content === `${prefix}ban`) {
	
if(!message.member.hasPermission("MANAGE_MESSAGES"))
return message.reply("You don't have the permissions to manage messasges, you will not be able to do this command.");

	
		let args = message.content.slice(1).split(" ");
	let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("You haven't @selected/mentioned a user to ban.");
	let bReason = args.slice(1).join(" ") || "None";
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don't have the permissions to manage messasges, you will not be able to do this command.");
    if(bUser.hasPermission("MANAGEmessage.content._MESSAGES")) return message.channel.send("This user can't be banned! They are either the same rank or higher then you.");
  
    let banEmbed = new Discord.RichEmbed()
    .setDescription("Ban Report")
    .setColor("#000000")
    .addField("Banned User", `${bUser} with ID ${bUser.id}`)
    .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Banned In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", bReason)
    .setTimestamp(new Date());
  
    let banChannel = message.guild.channels.find(c => c.name === 'logs');
    if(!banChannel) return message.channel.send("I can't find logging channel.");
  
    message.guild.member(bUser).ban(bReason);
    banChannel.send(banEmbed);
  
    return message.channel.send(`${bUser} has been launched back out into space! BANNED!!!`)
	
}
		

});
          
client.login(process.env.BOT_TOKEN);
