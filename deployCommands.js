"use strict";

const {REST, Routes} = require("discord.js");
require("dotenv").config();
const fs = require("node:fs");

const rest = new REST().setToken(process.env.TOKEN);

const deployCommands = () => {
    rest.put(Routes.applicationCommands(process.env.CLIENTID), {body: []})
        .then(() => console.log("\x1b[31mSuccessfully deleted all application commands.\x1b[0m"))
        .catch(console.error);

    const commands = [];

    const commandsDir = fs.readdirSync("./commands");

    commandsDir.forEach(dir => {
        if (dir !== "loadCommands.js") {
            const commandFiles = fs.readdirSync(`./commands/${dir}`).filter(file => file.endsWith(".js"));

            for (const file of commandFiles) {
                const command = require(`./commands/${dir}/${file}`).command;
                commands.push(command.data.toJSON());
            }
        }
    });

    rest.put(Routes.applicationCommands(process.env.CLIENTID), {body: commands})
        .then(() => console.log("Successfully updated all application commands."))
        .catch(console.error);
};

deployCommands();
