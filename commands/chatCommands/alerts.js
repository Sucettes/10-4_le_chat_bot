"use strict";

const {SlashCommandBuilder, PermissionFlagsBits} = require("discord.js");
const embedMsg = require("../../component/embedMessages");
const MsgPriority = require("../../includes/enums/MsgPriority").MsgPriority;
const alertTxt = require("../../includes/txtContent/en/contentTxt.json").alerts;

exports.command = {
    data: new SlashCommandBuilder()
        .setName(alertTxt.alertCommandName)
        .setDescription(alertTxt.alertCommandDesc)
        .addStringOption(option =>
            option.setName(alertTxt.alertCommandPrioName)
                .setDescription(alertTxt.alertCommandPrioDesc)
                .setRequired(true)
                .addChoices(
                    {name: "important", value: MsgPriority.Important},
                    {name: "medium", value: MsgPriority.Medium},
                    {name: "low", value: MsgPriority.Low},
                    {name: "info", value: MsgPriority.Info},
                ),
        )
        .addStringOption(optTitle =>
            optTitle.setName(alertTxt.alertCommandOpt.titleName)
                .setDescription(alertTxt.alertCommandOpt.titleDesc)
                .setRequired(true))
        .addStringOption(optContent =>
            optContent.setName(alertTxt.alertCommandOpt.contentName)
                .setDescription(alertTxt.alertCommandOpt.contentDesc)
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
