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
client.on('guildMemberAdd', async member => {
  
  if (message.content ===(`${prefix}ping`)) {
	let pingembed = new Discord.RichEmbed()
	.setTitle("PONG!") 	 
	.setColor("#2387c3")
	.addField("Ping Speed", 'Pong! Your ping is `' + `${Date.now() - message.createdTimestamp}` + ' ms`')
	  message.channel.send(pingembed);

        }
	
  let guild = member.guild;
  let server = member.guild.name;
  member.addRole(`496801148607397890`);
  var logs = guild.channels.find(c => c.name === 'logs');
  if (!logs) return console.log("I can't find logs channel.")
  let gembed = new Discord.RichEmbed()
      .setTitle("Member Enterance")
      .setColor("#2387c3")
      .setDescription(`Welcome ${member}, to **${server}**, hope you enjoy your stay.`)
      .setTimestamp(new Date())
  logs.send(gembed);
	}
        
            });     
client.login(process.env.BOT_TOKEN);