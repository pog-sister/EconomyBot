const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./Data/config.json')


let prefix = config.prefix;
client.on('message', message => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase();
    
    try {
        let commandFile = require(`./commands/${command}.js`);
        commandFile.run(client, message, args, config)
    } catch (err) {
        return;
    }



})

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`)
    client.user.setActivity('economy', {type: 'PLAYING'})
})

client.login(config.token)
