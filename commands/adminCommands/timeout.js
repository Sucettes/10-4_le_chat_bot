const {
    SlashCommandBuilder,
    PermissionFlagsBits
} = require('discord.js');

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
        const responseEmbed = new EmbedBuilder()
            .setColor(0x00ffcb)

        const member = interaction.options.getMember('target');
        const duration = interaction.options.getNumber('duration');
        if (member) {
            if (interaction.options.getBoolean('reset') == true) {
                member.timeout(null).then(async () => {
                    responseEmbed.setDescription(`${member.user.username}#${member.user.discriminator}'s timeout is now removed !`);
                    await interaction.reply({ embeds: [responseEmbed] });
                }).catch(async (err) => {
                    if (err.status == 403) {
                        responseEmbed.setDescription(`You are not allowed to change the timeout status of this member !`);
                    } else {
                        responseEmbed.setDescription(`${member.user.username}#${member.user.discriminator} isn't timeout !`);
                    }
                    await interaction.reply({ embeds: [responseEmbed] });
                });
            } else {
                member.timeout(duration * 1000).then(async () => {
                    responseEmbed.setDescription(`${member.user.username}#${member.user.discriminator} is now timeout for ${duration} seconds !`);
                    await interaction.reply({ embeds: [responseEmbed] });
                }).catch(async (err) => {
                    if (err.status == 403) {
                        responseEmbed.setDescription(`You are not allowed to change the timeout status of this member !`);
                    } else {
                        responseEmbed.setDescription(`${member.user.username}#${member.user.discriminator} is already timeout from the server !`);
                    }
                    await interaction.reply({ embeds: [responseEmbed] });
                });
            }
        } else {
            responseEmbed.setDescription(`The user specified is not in the server`);
            await interaction.reply({ embeds: [responseEmbed] });
        }
    }
}