"use strict";

const fs = require("node:fs"); // is used to read the commands
const path = require("node:path");
const {Collection} = require("discord.js");

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
};