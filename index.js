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
	.addField("Ping Speed", 'Pong! Your ping is `' + `${Date.now() - message.createdTimestamp}` + ' ms`')
	  message.channel.send(pingembed);

        }
        
            });     
client.login(process.env.BOT_TOKEN);
