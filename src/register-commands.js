require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

const commands = [{
    name: 'hey',
    description: 'Replies with hey!',
}
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Registering application commands');
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands },
        );

        console.log("Successfully registered application commands.")
    } catch (error){
        console.error(`There was an error: ${error}`);
    }
})();
