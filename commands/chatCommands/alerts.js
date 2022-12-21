"use strict";

const {SlashCommandBuilder, PermissionFlagsBits} = require("discord.js");
const embedMsg = require("../../component/embedMessages");
const MsgPriority = require("../../includes/enums/MsgPriority").MsgPriority;


exports.command = {
    data: new SlashCommandBuilder()
        .setName("alert")
        .setDescription("Allows you to send a message that is more visible to others.")
        .addStringOption(option =>
            option.setName("priority")
                .setDescription("priority level")
                .setRequired(true)
                .addChoices(
                    {name: "important", value: MsgPriority.Important},
                    {name: "medium", value: MsgPriority.Medium},
                    {name: "low", value: MsgPriority.Low},
                    {name: "info", value: MsgPriority.Info},
                ),
        )
        .addStringOption(option =>
            option.setName("title")
                .setDescription("title")
                .setRequired(true))
        .addStringOption(option =>
            option.setName("content")
                .setDescription("Message to sent")
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.EmbedLinks),
    async execute(interaction) {
        try {
            const priority = interaction.options.data[0].value;
            const title = interaction.options.data[1].value;
            const description = interaction.options.data[2].value;
            const user = `${interaction.user.username}#${interaction.user.discriminator}`;

            await interaction.reply({
                embeds: [
                    await embedMsg.alertsMsg(priority, title, description, user),
                ],
            });
        } catch (e) {
            console.error(e);
        }
    },
};
