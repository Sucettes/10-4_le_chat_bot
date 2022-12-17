"use strict";

require("dotenv").config();

const {Client, GatewayIntentBits, ActivityType} = require("discord.js");
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});
const commands = require("./commands/loadCommands");
const events = require("./events/loadEvents");
const {config} = require("dotenv");
const db = require("./models/dbSetup");

db.sequelize.sync().then(() => {});

client.on("ready", async () => {
    client.user.setPresence({
        activities: [{
            name: `Tom and Jerry!`,
            type: ActivityType.Watching,
        }],
        status: "dnd",
    });

    await commands.load(client);
    await events.load(client);
    console.info(`\x1b[94mLogged in as ${client.user.tag}!\x1b[0m`);
});

client.login(process.env.TOKEN)
    .catch(_ => console.error("\x1b[31mConnection failed !\x1b[0m"));
