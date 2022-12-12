"use strict";
const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("dogsorcats")
        .setDescription("Play the famous coin flipper game with me !"),
    async execute(interaction) {
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId('DoCDogs')
                .setLabel('🐶 Dogs')
                .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                .setCustomId('DoCCats')
                .setLabel('🐱 Cats')
                .setStyle(ButtonStyle.Secondary),
            );
        const optionEmbed = new EmbedBuilder()
            .setColor(0x00ffcb)
            .setTitle('Choose an Option')
        await interaction.reply({
            ephemeral: true,
            embeds: [optionEmbed],
            components: [row],
            fetchReply: true
        });
    },
};