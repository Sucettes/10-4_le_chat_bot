"use strict";

const {SlashCommandBuilder} = require("discord.js");
const embedMsg = require("../../component/embedMessages");

exports.command = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with Pong!"),
    async execute(interaction) {
        try {
            await interaction.reply({
                embeds: [
                    await embedMsg.infoMsg("Pong!", `Bot latency :\xa0\xa0 **${interaction.client.ws.ping}**ms`),
                ],
            });
        } catch (e) {
            console.error(e);
        }
    },
};
