"use strict";

const fs = require("node:fs"); // is used to read the commands
const path = require("node:path");
const {
    Events,
    Collection,EmbedBuilder
} = require("discord.js");


exports.load = async (client) => {
    client.commands = new Collection();
    const commandsPath = path.join(__dirname);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

    for (const file of commandFiles) {
        if (file !== 'loadCommands.js') {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);

            // Set a new item in the Collection with the key as the command name and the value as the exported module
            if ("data" in command && "execute" in command) {
                client.commands.set(command.data.name, command);
            } else {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }
    }

    client.on(Events.InteractionCreate, async interaction => {
        if (!interaction.isChatInputCommand()) return;
        
        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        try {
            await command.execute(interaction, client);
        } catch (error) {
            console.error(error);
            await interaction.reply({
                content: "There was an error while executing this command!",
                ephemeral: true
            });
        }
    });

    client.on(Events.InteractionCreate, async i => {
        if (!i.isButton()) return;
        let winStreak = 1;
        if (i.message.embeds[0].title === 'You won !') {
            var streak = i.message.embeds[0].data.description.match(/Win streak : (\d+)/)[1];
            console.log(streak);
            winStreak = Number(streak) + 1;
        }
        let randNum = Math.round(Math.random());
        if (randNum == 0 && i.customId === 'dogs' || randNum == 1 && i.customId === 'cats') {
            const resultEmbed = new EmbedBuilder()
                .setColor(0x90ff33)
                .setTitle('You won !')
                .setDescription(`🔥 Win streak : ${winStreak} 🔥\nYour choice: ${i.customId}\nResult: ${i.customId}`)
            await i.update({ embeds: [resultEmbed] });
        }
        else {
            let result;
            if (i.customId === 'dogs') { result = 'cats' }
            else {result = 'dogs'}
            const resultEmbed = new EmbedBuilder()
                .setColor(0xff0000)
                .setTitle('You lost !')
                .setDescription(`Your choice: ${i.customId}\nResult: ${result}`)
            await i.update({ embeds: [resultEmbed] });
        }
    });
};