"use strict";

const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
} = require("discord.js");

exports.command = {
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
},
exports.onChoiceClick = async (interaction) => {
    let winStreak = 1;
    let choice;
    if (interaction.message.embeds[0].title === 'You won !') {
        var streak = interaction.message.embeds[0].data.description.match(/Win streak : (\d+)/)[1];
        winStreak = Number(streak) + 1;
    }
    let randNum = Math.round(Math.random());
    if (interaction.customId === 'DoCCats') {
        choice = "Cats"
    } else {
        choice = "Dogs"
    }
    if (randNum == 0 && choice === 'Dogs' || randNum == 1 && choice === 'Cats') {
        const resultEmbed = new EmbedBuilder()
            .setColor(0x90ff33)
            .setTitle('You won !')
            .setDescription(`🔥 Win streak : ${winStreak} 🔥\nYour choice: ${choice}\nResult: ${choice}`)
        await interaction.update({
            embeds: [resultEmbed]
        });
    } else {
        let result;
        if (interaction.customId === 'DoCCats') {
            result = 'Dogs'
        } else {
            result = 'Cats'
        }
        const resultEmbed = new EmbedBuilder()
            .setColor(0xff0000)
            .setTitle('You lost !')
            .setDescription(`Your choice: ${choice}\nResult: ${result}`)
        await interaction.update({
            embeds: [resultEmbed]
        });
    }
}