"use strict";

const {
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
} = require("discord.js");
const embedMsg = require("../../component/embedMessages");

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
        await interaction.reply({
            ephemeral: true,
            embeds: [await embedMsg.infoMsg('🐶 OR 🐱', "Choose an option")],
            components: [row],
            fetchReply: true
        });
    },
}
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
        await interaction.update({
            embeds: [await embedMsg.successMsg("You won !", `🔥 Win streak : ${winStreak} 🔥\nYour choice: ${choice}\nResult: ${choice}`)]
        });
    } else {
        let result;
        if (interaction.customId === 'DoCCats') {
            result = 'Dogs'
        } else {
            result = 'Cats'
        }
        await interaction.update({
            embeds: [await embedMsg.errorMsg("You lost !", `Your choice: ${choice}\nResult: ${result}`)]
        });
    }
}