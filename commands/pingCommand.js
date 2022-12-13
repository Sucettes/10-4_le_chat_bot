"use strict";

const {SlashCommandBuilder} = require("discord.js");
const {EmbedBuilder} = require("discord.js");

exports.command = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with Pong!"),
    async execute(interaction) {
        const userLatency = (interaction.createdTimestamp - Date.now()) / 100;
        const pingEmbed = new EmbedBuilder()
            .setColor(0x00ffcb)
            .setTitle("Pong")
            .setDescription(`User latency : **${userLatency}**ms \n Bot latency :\xa0\xa0 **${interaction.client.ws.ping}**ms`);

        await interaction.reply({embeds: [pingEmbed]});
    },
};
