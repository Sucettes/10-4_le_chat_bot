"use strict";

const {SlashCommandBuilder, EmbedBuilder} = require("discord.js");


exports.command = {
    data: new SlashCommandBuilder()
        .setName("random")
        .setDescription("Random generator (User, Number...)")
        .addStringOption(option =>
            option.setName("type")
                .setDescription("The type of random result")
                .setRequired(true)
                .addChoices(
                    {name: "Number", value: "NumberRandom"},
                    {name: "User", value: "UserRandom"},
                )),
    async execute(interaction) {
        // select the right type.
        switch (interaction.options.data[0].value) {
            case "NumberRandom":
                console.log("number")
                break;
            case "UserRandom":
                console.log("user")
                break;
        }
        await interaction.reply("Random command");
    },
};
