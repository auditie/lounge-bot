// Event listener that checks if the user joined the specific voice channel
client.on('voiceStateUpdate', async (oldState, newState) => {
    //Declares voice channel being watched for event listener
    const specificChannelId = '1174830637392334938'; //1174830637392334938 - ChannelID for test channel in personal server. Will update with one of the loungechannels after feature finished.

    // Check if the user joined the specific voice channel
    if (newState.channelId === specificChannelId) {
        const user = newState.member.user; // Get the user who joined the channel
        const guild = newState.guild; // Get the guild
        const originalChannel = guild.channels.cache.get(specificChannelId); // Fetch the original channel (channel being watched by the bot)

        // Create a new voice channel with the user's name
        const newVC = await guild.channels.create(`${user.username}'s VC`, {
            type: 'GUILD_VOICE', // Set channel type to GUILD_VOICE
            parent: '1174587455203188778', // Set the parent category ID for the channels 1174587455203188778 is personal test
        });

        // Create a new text channel with the user's name
        const newTextChat = await guild.channels.create(`${user.username}'s Chat`, {
            type: 'GUILD_TEXT', // Set channel type to GUILD_TEXT
            parent: '1174587455203188778', // Set the parent category ID for the channels 1174587455203188778 is personal test
        });

        // Send a welcome message with setup instructions to the text channel
        const setupMessage = await newTextChat.send('Welcome! Setup your channel.');
        await setupMessage.react('🔒'); // Add reaction to the message for interaction

        // Create a reaction collector to handle user reactions
        const filter = (reaction, user) => {
            return reaction.emoji.name === '🔒' && user.id === newState.id; // Filter for the lock reaction and the user
        };
        const collector = setupMessage.createReactionCollector({ filter, time: 60000 }); // Set a time limit of 60 seconds

        collector.on('collect', (reaction, user) => {
            // Handle collected reactions
            // Add logic for changing VC settings based on user input
        });

        collector.on('end', (collected) => {
            // Cleanup or additional handling when the reaction collection ends
        });

        collector.on('error', (error) => {
            // Handle potential errors with the reaction collector
            console.error(error);
        });

        // Function to check and delete channels if necessary
        const checkAndDelete = async () => {
            const usersInChannel = newVC.members;

            if (usersInChannel.size === 1 && usersInChannel.first().id === newState.id) {
                // If the owner leaves and no one else is in the channel, delete both channels
                await newVC.delete();
                await newTextChat.delete();
            } else {
                // Logic to handle ownership transfer or keeping track of the next eligible owner
            }
        };

        // Listen for voiceStateUpdate in the new voice channel to handle ownership changes
        newVC.on('voiceStateUpdate', checkAndDelete);
    }
});