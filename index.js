require('dotenv').config(); //requires env to get token.
const {Client, IntentsBitField} = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
})

client.on('ready', (c) => {
    console.log(`${c.user.tag} is online`);
});

//ping response to make sure bot is online
client.on('messageCreate', (message) => {
    console.log(message.content);
    //Prevents the bot from reading messages from bots
    if(message.author.bot) {
        return;
    }
    //if it reads the content it replys.
    if (message.content === 'ping') {
        message.reply('I hear you, PONG')
    }
})

client.login(process.env.TOKEN);