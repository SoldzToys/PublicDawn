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
if(guild.systemChannel){
	guild.systemChannel.send(new Discord.RichEmbed() 
	.setTitle("PONG!") 
  .setColor("#2387c3")
	.setDescription('Pong! Your ping is `' + `${Date.now() - message.createdTimestamp}` + ' ms`');
        }
        
            });     
client.login(process.env.BOT_TOKEN);
