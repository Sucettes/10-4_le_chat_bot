const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    EmbedBuilder
} = require('discord.js');

exports.command = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Select a member to kick from the server.')
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('The member to kick')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
    async execute(interaction) {
        const responseEmbed = new EmbedBuilder()
            .setColor(0x00ffcb)

        const member = interaction.options.getUser('target');
        interaction.guild.members.kick(member)
            .then(async () => {
                responseEmbed.setDescription(`${member.username}#${member.discriminator} has been kick from the server !`);
                await interaction.reply({ embeds: [responseEmbed] });
            }).catch(async (err) => {
                if (err.status == 403) {
                    responseEmbed.setDescription(`You are not allowed to kick this member !`);
                } else {
                    responseEmbed.setDescription(`${member.username}#${member.discriminator} is not on the server !`);
                }
                await interaction.reply({ embeds: [responseEmbed] });
            });
    }
}