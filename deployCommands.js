const {REST, Routes} = require("discord.js");
require("dotenv").config();
const fs = require("node:fs");

const rest = new REST().setToken(process.env.TOKEN);


const deployCommands = () => {
    rest.put(Routes.applicationCommands(process.env.CLIENTID), {body: []})
        .then(() => console.log("\x1b[31mSuccessfully deleted all application commands.\x1b[0m"))
        .catch(console.error);

    const commands = [];

    const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

    for (const file of commandFiles) {
        if (file !== "loadCommands.js") {
            const command = require(`./commands/${file}`);
            commands.push(command.data.toJSON());
        }
    }

    rest.put(Routes.applicationCommands(process.env.CLIENTID), {body: commands})
        .then(() => console.log("Successfully updated all application commands."))
        .catch(console.error);
};

deployCommands();