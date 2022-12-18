const {
    SlashCommandBuilder,
    PermissionFlagsBits
} = require('discord.js');
const embedMsg = require("../../component/embedMessages");

exports.command = {
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Select a member to timeout.')
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('The member to timeout')
                .setRequired(true))
        .addNumberOption(duration =>
            duration
                .setName('duration')
                .setDescription('Duration of the timeout in seconds')
                .setRequired(true))
        .addBooleanOption(reset =>
            reset
                .setName('reset')
                .setDescription('Remove the timeout of the member')
                .setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers),
    async execute(interaction) {
        const member = interaction.options.getMember('target');
        const duration = interaction.options.getNumber('duration');
        if (member) {
            if (interaction.options.getBoolean('reset') == true) {
                member.timeout(null).then(async () => {
                    await interaction.reply({ embeds: [await embedMsg.successMsg('', `${member.user.username}#${member.user.discriminator}'s timeout is now removed !`)] });
                }).catch(async (err) => {
                    if (err.status == 403) {
                        await interaction.reply({ embeds: [await embedMsg.errorMsg('', `You are not allowed to change the timeout status of this member !`)] });
                    } else {
                        await interaction.reply({ embeds: [await embedMsg.errorMsg('', `${member.user.username}#${member.user.discriminator} isn't timeout !`)] });
                    }
                });
            } else {
                member.timeout(duration * 1000).then(async () => {
                    await interaction.reply({ embeds: [await embedMsg.successMsg('', `${member.user.username}#${member.user.discriminator} is now timeout for ${duration} seconds !`)] });
                }).catch(async (err) => {
                    if (err.status == 403) {
                        await interaction.reply({ embeds: [await embedMsg.errorMsg('', `You are not allowed to change the timeout status of this member !`)] });
                    } else {
                        await interaction.reply({ embeds: [await embedMsg.errorMsg('', `${member.user.username}#${member.user.discriminator} is already timeout from the server !`)] });
                    }
                });
            }
        } else {
            await interaction.reply({ embeds: [await embedMsg.errorMsg('', `The user specified is not in the server`)] });
        }
    }
}