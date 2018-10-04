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

  
  if (message.content ===(`${prefix}ping`)) {
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
  let logging = guild.channels.find(c => c.name === 'logging');
member.addRole(`496863657347645471`)
  let gembed = new Discord.RichEmbed()
      .setTitle("User Enterance")
      .setColor("#2387c3")
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
      .setColor("#2387c3")
      .setDescription(`Too bad that ${member} has decided to go, maybe one day you'll return to us. But for now,
au revoir.`)
      .setTimestamp(new Date())
  logging.send(gembed);
	      });
	
           
client.login(process.env.BOT_TOKEN);

