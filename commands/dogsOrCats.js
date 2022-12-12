"use strict";
const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,ButtonStyle
} = require("discord.js");


module.exports = {
    data: new SlashCommandBuilder()
        .setName("dogsorcats")
        .setDescription("Play the famous coin flipper game with me !"),
    async execute(interaction) {
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('dogs')
                    .setLabel('🐶 Dogs')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('cats')
                    .setLabel('🐱 Cats')
                    .setStyle(ButtonStyle.Secondary),
            );
        const optionEmbed = new EmbedBuilder()
            .setColor(0x00ffcb)
            .setTitle('Choose an Option')
        await interaction.reply({ ephemeral: true, embeds: [optionEmbed], components: [row],fetchReply: true });

        // client.on(Events.InteractionCreate, async i => {
        //     if (!i.isButton()) return;
        //     let num = Math.random();
        //     console.log(num);
        //     let randNum = Math.floor(num);
        //     console.log(randNum);
        //     if (randNum == 0 && i.customId === 'dogs' || randNum == 1 && i.customId === 'cats') {
        //         const resultEmbed = new EmbedBuilder()
        //             .setColor(0x90ff33)
        //             .setTitle('You won !')
        //             .setDescription(`Your choice: ${i.customId}`)
        //         await i.update({ embeds: [resultEmbed] });
        //     }
        //     else {
        //         const resultEmbed = new EmbedBuilder()
        //             .setColor(0xff0000)
        //             .setTitle('You lost !')
        //             .setDescription(`Your choice: ${i.customId}`)
        //         await i.update({ embeds: [resultEmbed] });
        //     }
        // });
    },

  
};