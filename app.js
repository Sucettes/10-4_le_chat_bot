"use strict";

require("dotenv").config();
const {Client, GatewayIntentBits} = require("discord.js");
const db = require("./models/dbSetup");
const client = new Client({intents: [GatewayIntentBits.Guilds]});
const commands = require("./commands/loadCommands");
const events = require("./events/loadEvents");

client.on("ready", async () => {
    await commands.load(client);
    await events.load(client);
    console.log(`\x1b[94mLogged in as ${client.user.tag}!\x1b[0m`);
});

client.login(process.env.TOKEN);
